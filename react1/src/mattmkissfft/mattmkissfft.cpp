#include <mattmkissfft.h>

#include <math.h>

#include <algorithm>

// This is android only, need to use an ifdef to make sure it
// only compiles for android...
#include <android/log.h>

MattmKissFFT::MattmKissFFT()
{
    logcount = 0;
}

MattmKissFFT::~MattmKissFFT()
{

}

void MattmKissFFT::getTunerInfo(float * input, int * freq, int sample, int len, int inSize, int freqSize)
{

    int * peaks = (int*)malloc(sizeof(int)*(inSize+2));
    float * peak_freqs = (float*)malloc(sizeof(float)*(inSize+2));

    kiss_fftr_cfg config = kiss_fftr_alloc(inSize, 0, 0, 0);
    kiss_fft_cpx *result = (kiss_fft_cpx *) malloc(sizeof(kiss_fft_cpx) * (inSize+2));
    kiss_fftr(config, input, result);

    // Store the peaks
    int peakcount = 0;
    float max_magnitude = 0.0f;
    float magnitude = 0.0f;
    float frequency = 0.0f;
    int max_index = 0;
    for (int i = 0; i < inSize / 2; i++)
    {
        if(i > 0 && i < inSize/2) {
            if(result[i-1].r < result[i].r && result[i].r < result[i+1].r) {
                // We've got a positive peak
                frequency = (float)i*(float)sample/(float)inSize;
                if(frequency > 16.45f && frequency < 661.0f)
                {
                    peaks[peakcount++] = i;
                    peak_freqs[peakcount++] = (float)i*(float)sample/(float)inSize;
                    magnitude  = (float)sqrt(result[i].r*result[i].r+result[i].i*result[i].i);
                    if(magnitude > max_magnitude) {
                        max_magnitude = magnitude;
                        max_index = i;
                    }
                }

            }
            else if(result[i-1].r > result[i].r && result[i].r > result[i+1].r) {
                // We've got a negative peak
                frequency = (float)i*(float)sample/(float)inSize;
                if(frequency > 16.45f && frequency < 661.0f)
                {
                    peaks[peakcount++] = i;
                    magnitude  = (float)sqrt(result[i].r*result[i].r+result[i].i*result[i].i);
                    peak_freqs[peakcount++] = (float)i*(float)sample/(float)inSize;
                    if(magnitude > max_magnitude) {
                        max_magnitude = magnitude;
                        max_index = i;
                    }
                }

            }
        }
    }

    float foundFreq = (float)max_index*(float)sample/(float)inSize;
    float closestFrequency = 0.0f;
    float noteLetter = 0;
    float box = 0.0f;
    int frequencies_index = 0;

    // First we need to find the closest note frequency to our found frequency
    for(int i = 0; i < NUM_FREQUENCIES; i++)
    {
        if(i < 1 || i > NUM_FREQUENCIES-1) continue;
        if(foundFreq < frequencies[i][0]) continue;
        else {
            // Check to see if the note before or after is the closest
            if(foundFreq - frequencies[i][0] > frequencies[i+1][0] - foundFreq) {
                noteLetter = frequencies[i+1][1];
                closestFrequency = frequencies[i+1][0];
                box = frequencies[i+1][2];
                frequencies_index = i;
                break;
            }
            else {
                noteLetter = frequencies[i][1];
                closestFrequency = frequencies[i][0];
                box = frequencies[i+1][2];
                frequencies_index = i;
                break;
            }
        }
    }

    // We know the current frequency, the current closest frequency and the
    // index into the frequencies array of the closest frequency.  We also
    // know the distance from the closest frequency to the current one.
    // Each time we go down one in the notes array we divide the distance
    // by 2 (and set tne new distance).  We then calculate the expected
    // fundamental by subtracting the new distance from the current notes
    // array element or add to it.  We then go through the peaks array
    // to see if that frequency is there (has to be almost exact if not
    // exact though noise needs to be factored in)
    float fundamental_freq = foundFreq;
    float old_fundamental = foundFreq;
    float topFreq = 0.0f;
    for(int i = (int)box-1; i >= 0; i--) {
        // Search the peaks array for the next lower harmonic
        for(int j = 0; j < peakcount; j++) {
            if(peak_freqs[j] > topFreq) continue;
            if(foundFreq/2 > peak_freqs[j]-0.5f && foundFreq < peak_freqs[j]+0.5f) {
                // Found a harmonic
                old_fundamental = fundamental_freq;
                fundamental_freq = peak_freqs[j];
                break;
            }
        }
        if(fundamental_freq == old_fundamental) break;

        if(i > 0) {
            foundFreq = foundFreq/2;
            frequencies_index = frequencies_index - 12;
            topFreq = foundFreq + 0.6f;
        }
    }

    // Now that we have the fundamental frequency we need to get the modifier
    // and direction.  First we'll need to move the note to the nearest full
    // note if it's a sharp.  After that we measure the distance between the
    // note and the one before (or after it).  Then we divide that into a
    // couple chunks and from that we can determine the modifier.  For the
    // direction -1 means left, anything else means right
    float direction = 0.0f;
    float modifier = 0.0f;
    if(noteLetter == 2 || noteLetter == 4 || noteLetter == 7 || noteLetter == 9 || noteLetter == 11) {
        if(foundFreq > frequencies[frequencies_index][0]) {
            noteLetter++;
            frequencies_index++;
            direction = -1.0f;
        } else {
            noteLetter--;
            frequencies_index--;
            direction = 1.0f;
        }
    } else {
        if(foundFreq > frequencies[frequencies_index][0]) direction = 1.0f;
        else direction = -1.0f;
    }

    float distance = 0.0f;


    //__android_log_print(ANDROID_LOG_ERROR, "MATTM TUNER","FF: %f, Old FF: %f", fundamentalFreq, foundFreqSaved);

    free(config);
    free(result);
    free(peaks);
}
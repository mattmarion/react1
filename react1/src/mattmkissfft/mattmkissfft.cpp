#include <mattmkissfft.h>

#include <math.h>

#include <algorithm>

// This is android only, need to use an ifdef to make sure it
// only compiles for android...
#include <android/log.h>

MattmKissFFT::MattmKissFFT()
{

}

MattmKissFFT::~MattmKissFFT()
{

}

void getTunerInfo(float * input, int * freq, int sample, int len, int inSize, int freqSize)
{

    float * output = new float[inSize+2];
    float * frequencies = new float[inSize+2];

    kiss_fftr_cfg config = kiss_fftr_alloc(inSize, 0, 0, 0);
    kiss_fft_cpx *result = (kiss_fft_cpx *) malloc(sizeof(kiss_fft_cpx) * inSize+2);
    kiss_fftr(config, input, result);

    for (int i = 0; i < (inSize+2) / 2; ++i) {
        output[i * 2] = result[i].r;
        output[i * 2 + 1] = result[i].i;
    }

    // Now that we have the fft results we need to find the peak frequencies
    float magnitude = 0.0f;
    float prevmag = 0.0f;
    int freq_count = 0;
    float max_freq = 0.0f;
    float max_magnitude = 0.0f;
    for(int magcnt = 0; magcnt < (sample+2)/2; magcnt++)
    {
        float re = output[2*magcnt];
        float im = output[2*magcnt+1];
        magnitude = (float)sqrt(re*re+im*im);

        __android_log_print(ANDROID_LOG_ERROR, "MATTM TUNER", "Magnitude: %f", magnitude);

        // This won't work.  The magnitude will be smaller all the way down each
        // wave so this only works on the way up
        // Need to be smart.  Grab the peak and then stop grabbing until the
        // the magnitude starts climbing again.
        if(magnitude < prevmag) {
            frequencies[freq_count++] = magcnt*sample/len;
            if(magnitude > max_magnitude) {
                max_magnitude = magnitude;
                max_freq = magcnt*sample/len;
            }
        }
        prevmag = magnitude;
    }

    // Now sort them.  What we're looking for is the lowest multiple of the
    // max frequency.  Sometimes we'll get a harmonic as the biggest peak but
    // what we want is the fundamental frequency

    // NOTE: We'll check within 0.1 of the / of the max_freq to get down to
    // the fundamental since the resolution isn't perfect...  Might have to
    // tweak that number
    std::sort(frequencies, frequencies + freq_count);

    free(frequencies);
    free(output);
    free(config);
    free(result);
}
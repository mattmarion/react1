package com.react1.tuner;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;

import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;

import android.util.Log;

import com.react1.tuner.TunerNativeBridge;

public class Tuner extends ReactContextBaseJavaModule {

	public static final String REACT_CLASS = "Tuner";

	private static final String[] notes = {
			"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
	};

	private static final int RECORDER_SAMPLERATE = 44100;
	private static final int RECORDER_SAMPLELENGTH = 11025;
	private static final int FFT_BUFFER_SIZE = 441000;

	private static final int RECORDER_CHANNELS = AudioFormat.CHANNEL_IN_MONO;
	private static final int RECORDER_AUDIO_ENCODING = AudioFormat.ENCODING_PCM_16BIT;

	private AudioRecord recorder = null;
	private boolean isRecording = false;

	private static String tunerModDirection;
	private static int tunerMod;
	private static String tunerNote;

	@Override
	public String getName() {
		return REACT_CLASS;
	}

	public Tuner(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@ReactMethod
	public void getTunerInfo(Callback errorCallback, Callback successCallback) {
		successCallback.invoke(tunerNote, tunerMod, tunerModDirection);
	}

	@ReactMethod
	public void startTuner() {
		TunerThread tunerThread = new TunerThread();

		int bufferSize = AudioRecord.getMinBufferSize(RECORDER_SAMPLERATE, RECORDER_CHANNELS, RECORDER_AUDIO_ENCODING);

		// Note here that we need to make sure that the buffer size conforms to:
		// audiobuffersize % (total bytes per channel: 1 for 8, 2 for 16bit) == 0
		// So for 11025 sample length we'll need an 11026 sized buffer...
		if(bufferSize < RECORDER_SAMPLELENGTH)
		{
			if(RECORDER_SAMPLELENGTH % 2 != 0) bufferSize = RECORDER_SAMPLELENGTH+1;
			else bufferSize = RECORDER_SAMPLELENGTH;
		}

		Log.e("MATTM ERROR", "buffersize is: " + bufferSize);

		recorder = new AudioRecord(MediaRecorder.AudioSource.MIC, RECORDER_SAMPLERATE, RECORDER_CHANNELS, RECORDER_AUDIO_ENCODING, bufferSize);

		recorder.startRecording();
		isRecording = true;

		tunerThread.start();
	}

	private class TunerThread extends Thread {

		public void run() {
			getTunerData();
		}

		private void getTunerData() {
			short sData[] = new short[RECORDER_SAMPLELENGTH];
			float fftData[] = new float[FFT_BUFFER_SIZE];
			int tunerData[] = new int[3];

			while (isRecording) {

				// Might be re-reading the data here, not sure
				// Depends how it works.  If the buffer is huge and I keep
				// reading from 0 then I'll always get the same data.  The
				// only way this will work is if the buffer is the right size
				// and I read the whole thing each time and each time I read
				// it it refills it with new data.

				// Also might want to start another thread here to do the fft processing.
				// Reason for that is that
				recorder.read(sData, 0, RECORDER_SAMPLELENGTH);

				for(int i = 0; i < RECORDER_SAMPLELENGTH; i++) {
					fftData[i] = (float)sData[i];
				}

				TunerNativeBridge.calculateTunerInfo(fftData, tunerData, RECORDER_SAMPLERATE, RECORDER_SAMPLELENGTH);

				tunerNote = notes[(int)tunerData[0]];
				tunerMod = (int)tunerData[1];
				if(tunerMod == 0 || tunerMod == 1) tunerModDirection = "none";
				else tunerModDirection = ((int)tunerData[2] == -1) ? "left" : "right";
			}

		}

	};

}
package com.react1.tuner;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;

import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;

import com.react1.tuner.TunerNativeBridge;

public class Tuner extends ReactContextBaseJavaModule {

	public static final String REACT_CLASS = "Tuner";

	private static final String[] notes = {
			"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
	};

	private static final int RECORDER_SAMPLERATE = 44100;
	private static final int RECORDER_SAMPLELENGTH = 22050;
	private static final int FFT_BUFFER_SIZE = 441000;

	private static final int RECORDER_CHANNELS = AudioFormat.CHANNEL_IN_MONO;
	private static final int RECORDER_AUDIO_ENCODING = AudioFormat.ENCODING_PCM_8BIT;

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

	private void startTuner() {
		TunerThread tunerThread = new TunerThread();

		int bufferSize = AudioRecord.getMinBufferSize(RECORDER_SAMPLERATE, RECORDER_CHANNELS, RECORDER_AUDIO_ENCODING);
		if(bufferSize < RECORDER_SAMPLELENGTH) bufferSize = RECORDER_SAMPLELENGTH;

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

	}

}
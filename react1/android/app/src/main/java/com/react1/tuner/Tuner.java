package com.react1.tuner;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;

public class Tuner extends ReactContextBaseJavaModule {

	public static final String REACT_CLASS = "Tuner";

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

	}

}
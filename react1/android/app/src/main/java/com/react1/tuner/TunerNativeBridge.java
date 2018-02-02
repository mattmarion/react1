package com.react1.tuner;

public class TunerNativeBridge {
    static {
        System.loadLibrary("Tuner");
    }

    public static native void calculateTunerInfo(float[] in, int[] out, int sample, int len);

}
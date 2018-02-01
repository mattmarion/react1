package com.react1.tuner;

public class TunerNativeBridge {
    static {
        System.loadLibrary("Tuner");
    }

    public static native void getTunerInfo(float[] in, float[] out, int sample, int len);

}
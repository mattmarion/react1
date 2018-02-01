#include <jni.h>

#include <mattmkissfft.h>

extern 'C' {

    MattmKissFFT fft;

	JNIEXPORT void JNICALL
	Java_com_react1_tuner_TunerNativeBridge_getTunerInfo(JNIEnv *env, jobject thiz, jfloatArray jInput, jfloatArray jOutput, jint jSample, jint jLen) {

	}

}
#include <jni.h>

#include <mattmkissfft.h>

extern 'C' {

    MattmKissFFT fft;

	JNIEXPORT void JNICALL
	Java_com_react1_tuner_TunerNativeBridge_calculateTunerInfo(JNIEnv *env, jobject thiz, jfloatArray jInput, jintArray jFreq, jint jSample, jint jLen) {

		jsize inSize = env->GetArrayLength(jInput);
		jsize freqSize = env->GetArrayLength(jFreq);

		float *input = env->GetFloatArrayElements(jInput, 0);
		jint *freq = env->GetIntArrayElements(jFreq, 0);

		fft.getTunerInfo(input, freq, jSample, jLen, inSize, freqSize);

		env->SetIntArrayRegion(jFreq, 0, freqSize, freq);
		env->ReleaseFloatArrayElements(jInput, input, 0);
		env->ReleaseIntArrayElements(jFreq, freq, 0);


	}

}
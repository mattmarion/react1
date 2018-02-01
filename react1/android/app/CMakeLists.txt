cmake_minimum_required(VERSION 3.4.1)

add_library( Tuner
             SHARED
             src/main/cpp/mattmkissfft/mattmkissfft.cpp
             src/main/cpp/mattmkissfft/kiss_fft130/kiss_fft.c
             src/main/cpp/mattmkissfft/kiss_fft130/tools/kiss_fftr.c
             src/main/cpp/android/mattmkissfft_android.cpp )

target_include_directories( Tuner
                            PRIVATE
                            src/main/cpp/mattmkissfft
                            src/main/cpp/mattmkissfft/kiss_fft130
                            src/main/cpp/mattmkissfft/kiss_fft130/tools )

find_library( log-lib
              log )

target_link_libraries( Tuner
                       ${log-lib} )
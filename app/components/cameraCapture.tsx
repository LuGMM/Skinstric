"use client";

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { FiCameraOff } from "react-icons/fi";

import TakePicture from "@/public/Group 40037.svg";
import Link from "next/link";
import { IoIosPlay } from "react-icons/io";
import axios from "axios";
import PreparingAnalysis from "./preparingAnalysis";
import { useRouter } from "next/navigation";

export default function CameraCapture() {
  const [picture, setPicture] = useState<any>(null);
  const [cameraPermission, setCameraPermission] = useState<string>("");

  const [isFetching, setIsFetching] = useState(false);
  const [success, setSuccess] = useState(true);

  const router = useRouter();

  const fetchApi = async () => {
    setIsFetching(true);
    const { data } = await axios.post(
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
      {
        image: picture,
      },
    );

    const pictureData = JSON.stringify(data.data);

    sessionStorage.setItem("userAnalysis", pictureData);

    setSuccess(data.success);

    if (success) {
      router.push("/analysis");
    } else {
      setIsFetching(false);
    }
  };

  async function checkCameraPermission() {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "camera",
      });
      console.log(permissionStatus.state);
      setCameraPermission(permissionStatus.state);

      // Listen for changes (e.g., if user Revokes permission in settings)
      permissionStatus.onchange = () => {
        setCameraPermission(permissionStatus.state);
      };
    } catch (error) {
      console.log("Permissions API not supported for camera in this browser.");
    }
  }

  function hideProceedBtn() {
    const nextBtn = document?.getElementById("proceed_btn");
    if (nextBtn) {
      nextBtn.style.opacity = "0";
      nextBtn.style.transform = "translateX(-8rem)";
      setTimeout(() => {
        nextBtn.style.display = "none";
      }, 500);
    }
  }

  function showProceedBtn() {
    const nextBtn = document?.getElementById("proceed_btn");
    if (nextBtn) {
      nextBtn.style.display = "flex";
      setTimeout(() => {
        nextBtn.style.opacity = "1";
        nextBtn.style.transform = "translateX(0)";
      }, 500);
    }
  }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef<Webcam>(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setPicture(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  useEffect(() => {}, [success, picture]);

  return (
    <>
      {isFetching ? (
        <PreparingAnalysis preparingTitle={"PREPARING YOUR ANALYSIS"} />
      ) : (
        <div className="absolute w-screen h-screen">
          {cameraPermission === "granted" ? (
            <div className="w-[100%] h-[100vh] flex items-center justify-center  relative bg-black">
              {picture ? (
                <>
                  <img
                    src={picture}
                    alt=""
                    className="w-full h-full  max-sm:h-[30%] max-md:w-[100%] max-md:h-[75%]"
                  />
                  <div className="absolute text-[#fcfcfc] flex flex-col gap-4 justify-center items-center top-20 text-sm     max-sm:top-[35%]">
                    GREAT SHOT!
                  </div>
                </>
              ) : (
                <>
                  <Webcam
                    className="w-full h-full"
                    audio={false}
                    height={720}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={1280}
                    videoConstraints={videoConstraints}
                  ></Webcam>
                  <button
                    onClick={() => {
                      capture();
                      showProceedBtn();
                    }}
                    className="absolute flex cursor-pointer right-8 text-white gap-4 group  max-sm:right-[45%]  max-sm:origin-center  max-sm:bottom-10 max-sm:z-100"
                  >
                    <div className="flex justify-center items-center  max-sm:[display:none]">
                      TAKE PICTURE
                    </div>
                    <img
                      src={TakePicture.src}
                      alt=""
                      className="group-hover:scale-110 transition-all duration-300 ease-in-out  "
                    />
                  </button>
                </>
              )}

              <div className="absolute text-[#fcfcfc] flex flex-col gap-4 justify-center items-center bottom-12 text-sm max-sm:bottom-[25%] max-sm:left-10">
                <div className="flex text-left items-center justify-center w-full">
                  TO GET BETTER RESULTS MAKE SURE TO HAVE
                </div>
                <div className="flex items-center justify-around w-full gap-2">
                  <div className="flex gap-2 items-center justify-center text-xs">
                    <div className="w-2 h-2 border-2 border-solid border-[#fcfcfc] rotate-45"></div>
                    NEUTRAL EXPRESSION
                  </div>
                  <div className="flex gap-2 items-center justify-center text-xs">
                    <div className="w-2 h-2 border-2 border-solid border-[#fcfcfc] rotate-45"></div>
                    FRONTAL POSE
                  </div>
                  <div className="flex gap-2 items-center justify-center text-xs">
                    <div className="w-2 h-2 border-2 border-solid border-[#fcfcfc] rotate-45"></div>
                    ADEQUATE LIGHTING
                  </div>
                </div>
              </div>

              <div className="absolute max-sm:left-0 max-sm:bottom-10 bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
                {picture ? (
                  <button
                    onClick={() => {
                      setPicture(null);
                      hideProceedBtn();
                    }}
                    className="group flex items-center gap-6 cursor-pointer "
                  >
                    <div className="w-[30px] h-[30px] border border-solid border-[#fcfcfc] rotate-45  group-hover:scale-110 duration-300 relative ">
                      <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1 text-[#fcfcfc]" />
                    </div>
                    <span className="text-sm font-semibold sm:block text-[#fcfcfc] max-[480px]:[display:none]">
                      BACK
                    </span>
                  </button>
                ) : (
                  <Link
                    href="/result"
                    className="group flex items-center gap-6   "
                  >
                    <div className="w-[30px] h-[30px] border border-solid border-[#fcfcfc] rotate-45  group-hover:scale-110 duration-300 relative">
                      <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1 text-[#fcfcfc]" />
                    </div>
                    <span className="text-sm font-semibold sm:block text-[#fcfcfc] max-[480px]:[display:none]">
                      BACK
                    </span>
                  </Link>
                )}

                <button
                  id="proceed_btn"
                  className="group flex items-center gap-6 opacity-1 duration-800 ease-in-out cursor-pointer "
                  style={{
                    opacity: "0",
                    transform: "translateX(-8rem)",
                    display: "none",
                  }}
                  onClick={() => {
                    fetchApi();
                  }}
                >
                  <span className="text-sm font-semibold sm:block text-[#fcfcfc] max-[480px]:[display:none]">
                    PROCEED
                  </span>
                  <div className="w-[30px] h-[30px] border border-solid border-[#fcfcfc] rotate-225  group-hover:scale-110 duration-300 relative">
                    <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1 text-[#fcfcfc]" />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-[100%] h-[100vh] flex items-center justify-center p-6 flex-col  ">
                <div className="w-1/2 flex items-center justify-center">
                  <FiCameraOff className="w-1/4 h-1/4" />
                </div>
                <div className="w-1/2  text-center mb-8 font-semibold text-lg">
                  Looks Like your camera isn't available. <br /> Please change
                  your settings to allow us access to your camera.
                </div>
                <div className="mb-4 text-sm">
                  Or if you'd prefer you can go back and add a photo from your
                  gallery by clicking the button bellow.
                </div>
                <Link
                  href="/result"
                  className="bg-black text-white p-3 hover:scale-105 transition-all ease-in-out duration-300 font-semibold"
                >
                  Go Back
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

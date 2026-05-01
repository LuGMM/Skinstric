"use client";

import Link from "next/link";
import { IoIosPlay } from "react-icons/io";
import LargeRectangle from "@/public/Rectangle 2780.svg";
import MediumRectangle from "@/public/Rectangle 2779.svg";
import SmallRectangle from "@/public/Rectangle 2778.svg";
import Shutter from "@/public/shutter-icon.svg";
import Vector from "@/public/Vector 1.svg";
import GallaryIcon from "@/public/gallery.svg";
import { useEffect, useState } from "react";
import PortraitPlaceholder from "@/public/Portrait_Placeholder.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import PreparingAnalysis from "../components/preparingAnalysis";

export default function Results() {
  const router = useRouter();

  const [overlay, setOverlay] = useState<HTMLElement | null>(null);
  const [accessTo, setAccessTo] = useState("");
  const [leftBtn, setLeftBtn] = useState<HTMLElement | null>(null);
  const [rightBtn, setRightBtn] = useState<HTMLElement | null>(null);
  const [picture, setPicture] = useState<any>();
  const [profilePic, setProfilePic] = useState<any>(null);
  const [inputPic, setInputPic] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [previewComponent, setPreviewComponent] = useState<HTMLElement | null>(
    null,
  );
  const [success, setSuccess] = useState(true);

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

  function hideButtons() {
    if (!leftBtn || !rightBtn) return;
    leftBtn.style.opacity = "0";
    rightBtn.style.opacity = "0";
    setTimeout(() => {
      rightBtn.style.display = "none";
      leftBtn.style.display = "none";
    }, 600);
  }

  function showPreview() {
    if (previewComponent) {
      previewComponent.style.display = "flex";
      setTimeout(() => {
        previewComponent.style.opacity = "1";
      }, 300);
    }
  }

  useEffect(() => {
    if (document) {
      const overlayElement = document.getElementById("allow_overlay");
      setOverlay(overlayElement);
      const leftSide = document.getElementById("cameraButton");
      setLeftBtn(leftSide);
      const rightSide = document.getElementById("galleryButton");
      setRightBtn(rightSide);
      const inputFileImg = document.getElementById("chosen-photo");
      setInputPic(inputFileImg);
      const profileImg = document.getElementById("profile-picture");
      setProfilePic(profileImg);
      const previewElement = document.getElementById("preview");
      setPreviewComponent(previewElement);

      const loadPage = document.getElementById("result");

      if (loadPage) {
        loadPage.style.opacity = "1";
      }
    }
  }, []);
  return (
    <>
      {isFetching ? (
        <PreparingAnalysis preparingTitle={"PREPARING YOUR ANALYSIS"} />
      ) : (
        <div
          id="result"
          className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center transition-all duration-800 ease-in-out"
          style={{ opacity: "0" }}
        >
          <div
            id="allow_overlay"
            className="absolute w-full min-h-screen z-1000 -top-20 flex items-center justify-center "
            style={{ display: "none" }}
          >
            <div
              onClick={() => {
                if (overlay) {
                  overlay.style.display = "none";
                  setAccessTo("");
                }
              }}
              className="absolute w-full h-full z-1000 opacity-100"
            ></div>
            <div className="  flex relative flex-col  bg-[#000000df] opacity-85  pt-2 ml-2 z-1010 text-white max-sm:mx-8  items-end  ">
              <p className="pb-10 font-bold tracking-wider border-b-1 pl-2 pr-2">
                ALLOW A.I. ACCESS TO YOUR {accessTo}?
              </p>
              <div className=" flex gap-4 ">
                {accessTo === "GALLERY" ? (
                  <>
                    <label
                      htmlFor="chosen-photo"
                      onClick={() => {
                        hideButtons();
                        showPreview();
                        if (overlay) {
                          overlay.style.display = "none";
                        }
                      }}
                      className=" p-2  hover:text-gray-500 cursor-pointer transition-all"
                    >
                      ALLOW
                    </label>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        console.log("Camera");

                        hideButtons();

                        if (overlay) {
                          overlay.style.display = "none";
                        }
                        router.push("/camera");
                      }}
                      className="p-2 hover:text-gray-500 cursor-pointer transition-all"
                    >
                      ALLOW
                    </button>
                  </>
                )}

                <button
                  onClick={() => {
                    if (overlay) {
                      overlay.style.display = "none";
                      setAccessTo("");
                    }
                  }}
                  className=" hover:text-gray-500 cursor-pointer p-2 rounded-2xl transition-all"
                >
                  DENY
                </button>
              </div>
            </div>
          </div>
          <div className="absolute top-2 left-9 md:left-8 text-left font-semibold text-xs md:text-sm">
            TO START ANALYSIS
          </div>
          <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0 justify-center max-md:-top-20">
            <div
              id="cameraButton"
              className="relative transition-all ease-in-out duration-500 md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center"
              style={{ display: "flex" }}
            >
              <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
              <img
                src={LargeRectangle.src}
                alt=""
                className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin [animation-duration:50s] rotate-200"
              />
              <img
                src={MediumRectangle.src}
                alt=""
                className="absolute w-[230px] h-[230px] md:w-[440px] md:h-[440px] animate-spin [animation-duration:70s] rotate-200"
              />
              <img
                src={SmallRectangle.src}
                alt=""
                className="absolute w-[190px] h-[190px] md:w-[405px] md:h-[405px] animate-spin [animation-duration:85s] rotate-200"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img
                  onClick={() => {
                    if (overlay) {
                      overlay.style.display = "flex";
                      setAccessTo("CAMERA");
                    }
                  }}
                  src={Shutter.src}
                  alt=""
                  className="rounded-full border-black border p-2 absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer "
                />
                <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
                  <div className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                    ALLOW A.I. <br /> TO SCAN YOUR FACE
                  </div>
                  <img
                    src={Vector.src}
                    alt=""
                    className="absolute hidden md:block md:right-[143px] md:top-[20px] p-1"
                  />
                </div>
              </div>
            </div>
            <div
              id="galleryButton"
              className="relative transition-all ease-in-out duration-500 md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100"
            >
              <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
              <img
                src={LargeRectangle.src}
                alt=""
                className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin [animation-duration:50s] rotate-200"
              />
              <img
                src={MediumRectangle.src}
                alt=""
                className="absolute w-[230px] h-[230px] md:w-[440px] md:h-[440px] animate-spin [animation-duration:70s] rotate-200"
              />
              <img
                src={SmallRectangle.src}
                alt=""
                className="absolute w-[190px] h-[190px] md:w-[405px] md:h-[405px] animate-spin [animation-duration:85s] rotate-200"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img
                  onClick={() => {
                    if (overlay) {
                      overlay.style.display = "flex";
                      setAccessTo("GALLERY");
                    }
                  }}
                  src={GallaryIcon.src}
                  alt=""
                  className="rounded-full border-black border p-2 absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer "
                />
                <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
                  <div className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                    ALLOW A.I. <br /> ACCESS TO GALLARY
                  </div>{" "}
                  <img
                    src={Vector.src}
                    alt=""
                    className="absolute hidden md:block md:left-[120px] md:bottom-[39px] p-1"
                  />
                </div>
              </div>
            </div>
            <div
              id="preview"
              className="absolute w-full h-full transition-all ease-in-out duration-500 flex flex-col items-center mt-12 md:mt-0 justify-center transition-opacity duration-300 opacity-100 bg-white max-sm:bottom-"
              style={{ display: "none", opacity: "0" }}
            >
              <div className="font-bold w-[270px] h-[270px] md:w-[482px] md:h-[482px] text-center ">
                PREVIEW
              </div>
              <img
                src={LargeRectangle.src}
                alt=""
                className="absolute w-[480px] h-[480px] sm:w-[762px] sm:h-[762px] animate-spin [animation-duration:50s] rotate-200"
              />
              <img
                src={MediumRectangle.src}
                alt=""
                className="absolute w-[400px] h-[400px] sm:w-[682px] sm:h-[682px] animate-spin [animation-duration:70s] rotate-200"
              />
              <img
                src={SmallRectangle.src}
                alt=""
                className="absolute w-[320px] h-[320px] sm:w-[602px] sm:h-[602px] animate-spin [animation-duration:85s] rotate-200"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center -top-10 max-sm:top-2 ">
                <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]  mb-3 ">
                  <img
                    className="w-full h-full object-contain bg-transparent "
                    src={PortraitPlaceholder.src}
                    alt=""
                    id="profile-picture"
                  />
                </div>

                <div className="text-sm text-gray-400 tracking-wider mb-1 max-sm:text-xs">
                  MAKE SURE THE CHOSEN IMAGE IS CLEAR
                </div>
                <div className="flex items-center rounded p-2 gap-1 ">
                  {picture ? (
                    <button
                      onClick={() => {
                        fetchApi();
                      }}
                      className="transition-all duration-400 ease-in-out scale-95 cursor-pointer bg-black p-2 rounded text-white font-bold text-[10px]  hover:bg-gray-600 hover:border-gray-600 hover:scale-100"
                    >
                      ACCEPT PHOTO
                    </button>
                  ) : (
                    <button
                      onClick={() => {}}
                      className="transition-all duration-400 ease-in-out scale-95 cursor-pointer bg-black p-2 rounded text-white font-bold text-[10px]  hover:bg-gray-600 hover:border-gray-600 hover:scale-100"
                    >
                      ACCEPT PHOTO
                    </button>
                  )}

                  <label
                    htmlFor="chosen-photo"
                    className="transition-all duration-400 ease-in-out scale-95 cursor-pointer border p-2 rounded font-bold text-[10px] hover:bg-gray-200 hover:border-gray-200 hover:scale-100"
                  >
                    CHANGE PHOTO
                  </label>
                  <input
                    onChange={() => {
                      if (profilePic) {
                        const pictureFile = inputPic?.files[0];
                        profilePic.src = URL.createObjectURL(pictureFile);

                        const reader = new FileReader();
                        reader.addEventListener("load", () => {
                          setPicture(reader.result);
                        });

                        reader.readAsDataURL(pictureFile);
                      }
                    }}
                    type="file"
                    id="chosen-photo"
                    accept="image/jpeg, image/png, imagel/jpg"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13  max-md:bottom-12">
            {accessTo === "" ? (
              <Link href="/testing" className="group flex items-center gap-6">
                <div className="w-[30px] h-[30px] border border-solid border-black rotate-45  group-hover:scale-110 duration-300 relative">
                  <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1" />
                </div>
                <span className="text-sm font-semibold sm:block">BACK</span>
              </Link>
            ) : (
              <Link
                href="/result"
                onClick={() => {
                  window.location.reload();
                }}
                className="group flex items-center gap-6"
              >
                <div className="w-[30px] h-[30px] border border-solid border-black rotate-45  group-hover:scale-110 duration-300 relative">
                  <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1" />
                </div>
                <span className="text-sm font-semibold sm:block">BACK</span>
              </Link>
            )}

            <Link
              id="next_btn"
              href="/result"
              className="group flex items-center gap-6 opacity-1 duration-800 ease-in-out "
              style={{ opacity: "0", transform: "translateX(-8rem)" }}
            >
              <span className="text-sm font-semibold sm:block">PROCEED</span>
              <div className="w-[30px] h-[30px] border border-solid border-black rotate-225  group-hover:scale-110 duration-300 relative">
                <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

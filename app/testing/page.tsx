"use client";

import LargeRectangle from "@/public/Rectangle 2780.svg";
import MediumRectangle from "@/public/Rectangle 2779.svg";
import SmallRectangle from "@/public/Rectangle 2778.svg";
import { IoIosPlay } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";

export default function Testing() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [isCalled, setIsCalled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [nextButton, setNextButton] = useState<HTMLElement | null>(null);
  const [error, setError] = useState("");

  function checkString(str: string) {
    return /^[A-Za-z\s]*$/.test(str);
  }

  const userData = {
    name: name,
    location: city,
  };

  const fetchApi = async () => {
    setIsProcessing(true);

    const { data } = await axios.post(
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
      userData,
    );
    setIsCalled(data.success);

    setTimeout(() => {
      setIsProcessing(false);

      if (nextButton) {
        nextButton.style.display = "flex";
        setTimeout(() => {
          nextButton.style.opacity = "1";
          nextButton.style.transform = "translateX(0rem)";
        }, 300);
      }
    }, 500);
  };

  useEffect(() => {
    if (document) {
      const nextBtn = document.getElementById("next_btn");
      if (nextBtn) {
        setNextButton(nextBtn);
        const loadPage = document.getElementById("testing");
        if (loadPage) {
          loadPage.style.opacity = "1";
        }
      }
    }
  }, []);

  return (
    <div
      id="testing"
      className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center transition-all duration-500 ease-in-out"
      style={{ opacity: "0" }}
    >
      <div className="font-semibold text-xs absolute top-16 left-9 text-left">
        TO START ANALYSIS
      </div>
      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
        {isProcessing ? (
          <div className="flex flex-col items-center gap-4 z-10">
            <div className="text-lg text-gray-400 tracking-wider uppercase mb-1">
              Processing
            </div>
            <Loader />
          </div>
        ) : (
          <>
            {isCalled ? (
              <div className="flex flex-col items-center gap-4 z-10">
                <div className="text-lg text-gray-500 tracking-wider uppercase mb-1">
                  Thank You!
                </div>
                <div className="text-lg text-gray-400">
                  {" "}
                  You may proceed to the next step.
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-400 tracking-wider mb-1">
                  CLICK TO TYPE
                </p>
                <form className="relative z-10">
                  {error ? (
                    <div className="flex flex-col items-center">
                      <p className="text-red-500 text-sm mb-2">{error}</p>
                    </div>
                  ) : null}

                  <input
                    id="city_input"
                    pattern="[A-Za-z/s]+"
                    className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
                    style={{ display: "none" }}
                    autoFocus
                    type="text"
                    name="city"
                    placeholder="Your City Name"
                    onChange={(event) => {
                      setCity(event.target.value);
                      if (event.target.value.length === 0) {
                        setError("");
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && name.length) {
                        if (city.length) {
                          if (checkString(city)) {
                            fetchApi();
                          } else
                            setError(
                              "Please enter a valid city without numbers or special characters",
                            );
                        } else {
                          setError("Please enter your city");
                        }
                      }
                    }}
                  />
                  <input
                    id="name_input"
                    pattern="[A-Za-z\s]+"
                    className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
                    autoFocus
                    type="text"
                    name="name"
                    placeholder="Introduce Yourself"
                    onChange={(event) => {
                      setName(event.target.value);
                      if (event.target.value.length === 0) {
                        setError("");
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        if (name.length) {
                          if (checkString(name)) {
                            setError("");
                            if (document) {
                              const nameInput =
                                document.getElementById("name_input");
                              const cityInput =
                                document.getElementById("city_input");
                              if (cityInput) {
                                cityInput.style.display = "block";
                                cityInput.focus();
                              }
                              if (nameInput) {
                                nameInput.style.display = "none";
                              }
                            }
                          } else {
                            setError(
                              "Please enter a valid name without numbers or special characters",
                            );
                          }
                        } else {
                          setError("Please enter your name.");
                        }
                      }
                    }}
                  />
                </form>
              </>
            )}
          </>
        )}
        <img
          src={LargeRectangle.src}
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin [animation-duration:50s] rotate-190"
        />
        <img
          src={MediumRectangle.src}
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] animate-spin [animation-duration:70s] rotate-190"
        />
        <img
          src={SmallRectangle.src}
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] animate-spin [animation-duration:85s] rotate-190"
        />
      </div>{" "}
      <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
        <Link href="/" className="group flex items-center gap-6">
          <div className="w-[30px] h-[30px] border border-solid border-black rotate-45  group-hover:scale-110 duration-300 relative">
            <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1" />
          </div>
          <span className="text-sm font-semibold sm:block">BACK</span>
        </Link>

        <Link
          id="next_btn"
          href="/result"
          className="group flex items-center gap-6 opacity-1 duration-800 ease-in-out "
          style={{
            opacity: "0",
            transform: "translateX(-8rem)",
            display: "none",
          }}
        >
          <span className="text-sm font-semibold sm:block">PROCEED</span>
          <div className="w-[30px] h-[30px] border border-solid border-black rotate-225  group-hover:scale-110 duration-300 relative">
            <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}

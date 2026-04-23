"use client";

import Link from "next/link";
import { useEffect } from "react";
import { IoIosPlay } from "react-icons/io";

export default function Home() {
  useEffect(() => {
    const left = document?.getElementById("left");
    const right = document?.getElementById("right");

    left?.addEventListener("mouseenter", () => {
      console.log("enter");
    });
    left?.addEventListener("mouseleave", () => {
      console.log("leave");
    });
    right?.addEventListener("mouseenter", () => {
      console.log("enter");
    });
    right?.addEventListener("mouseleave", () => {
      console.log("leave");
    });
  }, []);

  return (
    <div>
      <div className="max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
        <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[350px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[420px] h-[420px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-[60px] text-[#1A1B1C] lg:text-[100px] font-inter font-normal tracking-tighter leading-none">
              Sophisticated <br /> Skincare
            </h1>
          </div>
          <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground text-[#1a1b1c83]">
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>
          <div>
            <Link className="z-10 mt-4 lg:hidden" href="/">
              <div className="relative flex items-center gap-4 hover:scale-105 duration-300 font-bold text-[12px]">
                ENTER EXPERIENCE
                <div className="relative flex items-center justify-center w-[24px] h-[24px] border border-solid border-black rotate-315">
                  <IoIosPlay className=" scale-[0.75] hover:scale-100 duration-300 rotate-45 absolute bottom-1 right-1" />
                </div>
              </div>
            </Link>
            <div className="hidden lg:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width>=1920px)]:left-[calc(-33vw)] font-normal text-sm text-[#1A1B1C] space-y-3 ">
              <p>
                SKINSTRIC DEVELOPED AN A.I. THAT CREATES A
                <br />
                HIGHLY-PERSONALIZED ROUTINE TAILORED TO
                <br />
                WHAT YOUR SKIN NEEDS.
              </p>
            </div>
            <div className="hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-500 ease-in-out opacity-100">
              <div className="relative w-full h-full">
                <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0"></div>
                <div
                  id="left"
                  className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-not-allowed disabled:opacity-50 h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 [@media(width>=1920px)]:translate-x-1/20 px-3 py-1 "
                >
                  <div className="w-[30px] h-[30px] border border-solid border-black rotate-45  group-hover:scale-110 duration-300 relative">
                    <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1" />
                  </div>
                  DISCOVER A.I.
                </div>
              </div>
            </div>
            <div className="hidden lg:block fixed top-1/2 right-[calc(-53vw)] xl:right-[calc(-50vw)] -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-500 ease-in-out opacity-100">
              <div className="relative w-full h-full">
                <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 absolute inset-0"></div>
                <Link
                  id="right"
                  href="/testing"
                  className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5 xl:-translate-x-1/6 [@media(width>=1920px)]:-translate-x-1/20 px-3 py-1"
                >
                  TAKE TEST
                  <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 group-hover:scale-110 duration-300 relative">
                    <IoIosPlay className=" scale-100 hover:scale-130 duration-300 rotate-315 absolute top-1 right-1" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

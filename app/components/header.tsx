"use client";

import rightBracket from "@/public/Rectangle 2711.png";
import leftBracket from "@/public/Rectangle 2710.png";
import rightBracketLight from "@/public/Rectangle 2713.svg";
import leftBracketLight from "@/public/Rectangle 27112.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    <div className="flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-100">
      {path === "/camera/capture" ? (
        <div className="flex flex-row pt-1 scale-75 justify-center items-center">
          <Link
            href={"/"}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-white z-1000"
          >
            SKINSTRIC
          </Link>
          <img
            className="opacity-60 w-[5px] h-[17px] fill-white"
            src={leftBracketLight.src}
            width={5}
            height={19}
            loading="lazy"
            alt="left bracket"
          />
          <p className="text-white text-opacity-70  font-semibold text-sm ml-1.5 mr-1.5">
            <>ANALYSIS</>
          </p>
          <img
            className="opacity-60 w-[5px] h-[17px]"
            width={5}
            height={19}
            src={rightBracketLight.src}
            alt="right bracket"
          />
        </div>
      ) : (
        <>
          <div className="flex flex-row pt-1 scale-75 justify-center items-center">
            <Link
              href={"/"}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C] z-1000"
            >
              SKINSTRIC
            </Link>
            <img
              className="opacity-60 w-[5px] h-[17px]"
              src={leftBracket.src}
              width={5}
              height={19}
              loading="lazy"
              alt="left bracket"
            />
            <p className="text-[#1a1b1c83] text-opacity-70  font-semibold text-sm ml-1.5 mr-1.5">
              {path === "/" || path === "/result" || path === "/testing" ? (
                <>INTRO</>
              ) : (
                <>ANALYSIS</>
              )}
            </p>
            <img
              className="opacity-60 w-[5px] h-[17px]"
              width={5}
              height={19}
              src={rightBracket.src}
              alt="right bracket"
            />
          </div>
        </>
      )}

      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold  transition-colors  disabled:pointer-events-none text-primary-foreground shadow h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] ">
        Enter Code
      </button>
    </div>
  );
}

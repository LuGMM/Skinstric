"use client";

import Link from "next/link";
import { IoIosPlay } from "react-icons/io";

export default function Analysis() {
  const getApi = async () => {};
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
      <div className=" absolute top-16 left-9 text-left">
        <div className="text-xs mb-2 font-semibold ">A.I. ANALYSIS</div>
        <div className="text-xs">
          A.I. has estimated the following.
          <br /> Fix estimated information if needed.
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
        <div className="absolute top-10 left-1/2 -translate-x-[50%] -translate-y-1/2 flex items-center justify-center border-dotted border-2 rotate-45 border-[#a0a4ab92] w-[210px] h-[210px] md:w-[360px] md:h-[360px]">
          <div className="border-dotted border-2  border-[#a0a4abbc]  w-[190px] h-[190px] md:w-[330px] md:h-[330px] flex items-center justify-center">
            <div className="border-dotted border-2  border-[#A0A4AB]   w-[160px] h-[160px] md:w-[300px] md:h-[300px] flex items-center justify-center">
              <div className=" w-[75%] h-[75%]  flex flex-wrap ">
                <Link
                  href="/analysis/demographics"
                  className="flex items-center justify-center w-1/2 p-1 border-3 border-white bg-[#f3f3f4] hover:scale-105 hover:bg-[#e1e1e2] transition-all duration-300 ease-in-out cursor-pointer"
                >
                  <span className="-rotate-45 font-bold text-[10px]">
                    Demographics
                  </span>
                </Link>
                <div className="flex items-center justify-center w-1/2 p-1 border-3 border-white bg-[#f3f3f4] hover:bg-[#e1e1e2] transition-all duration-300 ease-in-out cursor-not-allowed">
                  <span className="-rotate-45 font-bold text-[10px]">
                    COSMETIC CONCERNS
                  </span>
                </div>
                <div className="flex items-center justify-center w-1/2 p-1 border-3 border-white bg-[#f3f3f4] hover:bg-[#e1e1e2] transition-all duration-300 ease-in-out cursor-not-allowed">
                  <span className="-rotate-45 font-bold text-[10px]">
                    SKIN TYPE DETAILS
                  </span>
                </div>
                <div className="flex items-center justify-center w-1/2 p-1 border-3 border-white bg-[#f3f3f4] hover:bg-[#e1e1e2] transition-all duration-300 ease-in-out cursor-not-allowed">
                  <span className="-rotate-45 font-bold text-[10px]">
                    WEATHER
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
        <Link href="/result" className="group flex items-center gap-6">
          <div className="w-[30px] h-[30px] border border-solid border-black rotate-45  group-hover:scale-110 duration-300 relative">
            <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1" />
          </div>
          <span className="text-sm font-semibold sm:block">BACK</span>
        </Link>

        <Link
          id="next_btn"
          href="/analysis/demographics"
          className="group flex items-center gap-6 duration-800 ease-in-out "
        >
          <span className="text-sm font-semibold sm:block">GET SUMMARY</span>
          <div className="w-[30px] h-[30px] border border-solid border-black rotate-225  group-hover:scale-110 duration-300 relative">
            <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosPlay } from "react-icons/io";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface MyData {
  key: string;
  percentValue: number;
}

export default function Demographics() {
  let userPhotoData: any = null;

  const [userPhotoDatas, setUserPhotoDatas] = useState();
  const [valuesBreakdownTitle, setValuesBreakdownTitle] = useState("RACE");
  const [raceData, setRaceData] = useState<MyData | undefined>();
  const [ageData, setAgeData] = useState<MyData | undefined>();
  const [sexData, setSexData] = useState<MyData | undefined>();

  const [valuesBreakdown, setValuesBreakdown] = useState<MyData[]>([]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [progressBarValue, setProgressBarValue] = useState("");

  function getBreakdownArray(valueBreakdown: any) {
    const list = Object.keys(valueBreakdown).map((key) => ({
      key: key,
      percentValue: changeToPrecentage(valueBreakdown[key]),
    }));

    return list;
  }

  function sortValuesBreakdown(array: Array<T>) {
    const sortedArray = array.sort((a, b) => b.percentValue - a.percentValue);
    return sortedArray;
  }

  function sortKeysBreakdown(array: Array<T>) {
    const sortedArray = array.sort((a, b) => {
      const startA = parseInt(a.key.split("-")[0]);
      const startB = parseInt(b.key.split("-")[0]);
      return startA - startB;
    });

    return sortedArray;
  }

  function changeToPrecentage(decimal: number) {
    const percentage = Math.round(decimal * 100);
    return percentage;
  }

  function getMaxValue(catagory: object) {
    if (catagory) {
      const maxValue = Object.entries(catagory).reduce((max, current) => {
        return current[1] > max[1] ? current : max;
      });
      const [key, value] = maxValue;
      const percentValue = changeToPrecentage(value);

      return { key, percentValue };
    }
  }

  useEffect(() => {
    const dataStr = sessionStorage.getItem("userAnalysis");
    if (dataStr) {
      userPhotoData = JSON.parse(dataStr);
    }

    setUserPhotoDatas(userPhotoData);

    if (userPhotoData) {
      const photoRace = userPhotoData.race;
      const photoAge = userPhotoData.age;
      const photoSex = userPhotoData.gender;

      const ageMax = getMaxValue(photoAge);
      const sexMax = getMaxValue(photoSex);
      const raceMax = getMaxValue(photoRace);
      setRaceData(raceMax);
      setSexData(sexMax);
      setAgeData(ageMax);

      setValuesBreakdown(sortValuesBreakdown(getBreakdownArray(photoRace)));

      setProgressBarValue(`${raceMax.percentValue}`);

      setSelectedId(raceMax.key);
    }
  }, []);

  return (
    <div
      id="demographic"
      className="h-screen md:h-[90vh] flex flex-col md:mt-5"
    >
      <div className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
        <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col relative items-center h-full ">
          <div className="flex flex-col justify-start w-full">
            <h2 className="text-base md:text-base font-semibold mb-1 leading-[24px]">
              A.I. ANALYSIS
            </h2>
            <h1 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
              DEMOGRAPHICS
            </h1>
            <h3>PREDICTED RACE & AGE</h3>
          </div>
          <div className="w-full flex flex-col  ">
            <div className="w-full h-full flex gap-4 mt-6 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
              <div className="bg-white-100 space-y-3 md:flex md:flex-col h-[62%] uppercase w-1/8 transition-all duration-500 ease-in-out">
                <div
                  onClick={() => {
                    setValuesBreakdownTitle("RACE");
                    setProgressBarValue(`${raceData?.percentValue}`);

                    if (userPhotoDatas) {
                      setValuesBreakdown(
                        sortValuesBreakdown(
                          getBreakdownArray(userPhotoDatas.race),
                        ),
                      );

                      console.log(valuesBreakdown);
                    }
                  }}
                  className={`p-3 cursor-pointer transition-all duration-300 ease-in-out  flex-1 flex flex-col justify-between bg-[#F3F3F4] hover:bg-[#e1e1e2] border-t demographics-titles`}
                  style={{
                    backgroundColor:
                      valuesBreakdownTitle === "RACE" ? "#1A1B1C" : "",
                    color: valuesBreakdownTitle === "RACE" ? "white" : "",
                  }}
                >
                  <div className="text-base font-semibold mb-8 ">
                    {raceData?.key}
                  </div>
                  <h4 className="text-base font-semibold mb-1">RACE</h4>
                </div>
                <div
                  onClick={() => {
                    setValuesBreakdownTitle("AGE");
                    setProgressBarValue(`${ageData?.percentValue}`);
                    setSelectedId(`${ageData?.key}`);

                    if (userPhotoDatas) {
                      setValuesBreakdown(
                        sortKeysBreakdown(
                          getBreakdownArray(userPhotoDatas.age),
                        ),
                      );
                      console.log(valuesBreakdown);
                    }
                  }}
                  className="p-3 cursor-pointer transition-all duration-300 ease-in-out  bg-[#F3F3F4] flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t"
                  style={{
                    backgroundColor:
                      valuesBreakdownTitle === "AGE" ? "#1A1B1C" : "",
                    color: valuesBreakdownTitle === "AGE" ? "white" : "",
                  }}
                >
                  <div className="text-base font-semibold mb-8 ">
                    {ageData?.key}
                  </div>
                  <h4 className="text-base font-semibold mb-1">AGE</h4>
                </div>
                <div
                  onClick={() => {
                    setValuesBreakdownTitle("SEX");
                    setProgressBarValue(`${sexData?.percentValue}`);
                    setSelectedId(`${sexData?.key}`);

                    if (userPhotoDatas) {
                      setValuesBreakdown(
                        sortValuesBreakdown(
                          getBreakdownArray(userPhotoDatas.gender),
                        ),
                      );
                    }
                  }}
                  className="p-3 cursor-pointer transition-all duration-300 ease-in-out  bg-[#F3F3F4] flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t"
                  style={{
                    backgroundColor:
                      valuesBreakdownTitle === "SEX" ? "#1A1B1C" : "",
                    color: valuesBreakdownTitle === "SEX" ? "white" : "",
                  }}
                >
                  <div className="text-base font-semibold mb-8">
                    {sexData?.key}
                  </div>
                  <h4 className="text-base font-semibold mb-1">SEX</h4>
                </div>
              </div>
              <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t w-5/8">
                <p className="hidden md:block md:absolute text-[40px] mb-2 left-7 top-4 first-letter:uppercase">
                  {valuesBreakdownTitle === "RACE" ? (
                    <>{raceData?.key}</>
                  ) : null}
                  {valuesBreakdownTitle === "AGE" ? <>{ageData?.key}</> : null}
                  {valuesBreakdownTitle === "SEX" ? <>{sexData?.key}</> : null}
                </p>
                <div className="relative md:absolute w-[40%] max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2 ">
                  <CircularProgressbar
                    value={progressBarValue}
                    text={`${progressBarValue}%`}
                    strokeWidth={2}
                    styles={buildStyles({
                      pathColor: "black",
                      textColor: "black",
                      textSize: "12px",
                      strokeLinecap: "butt",
                    })}
                  />
                </div>
              </div>
              <div className="bg-gray-100 md:border-t w-1/4">
                <div>
                  <div className="flex justify-between px-4 py-2 font-light items-end">
                    <h4 className="text-base leading-[24px] tracking-tight font-medium ">
                      {valuesBreakdownTitle}
                    </h4>
                    <h4>A.I. CONFIDENCE</h4>
                  </div>
                  {valuesBreakdown?.map((breakdown, index) => (
                    <div
                      key={breakdown.key}
                      onClick={() => {
                        setSelectedId(breakdown.key);
                        console.log(valuesBreakdown[index]);

                        if (valuesBreakdownTitle === "RACE") {
                          setRaceData(valuesBreakdown[index]);
                        } else if (valuesBreakdownTitle === "AGE") {
                          setAgeData(valuesBreakdown[index]);
                        } else {
                          setSexData(valuesBreakdown[index]);
                        }
                        setProgressBarValue(`${breakdown.percentValue}`);
                      }}
                      className="flex items-center py-2 justify-between font-[14px] hover:bg-[#E1E1E2] px-4 cursor-pointer "
                      style={{
                        backgroundColor:
                          selectedId === breakdown.key ? "black" : "",
                        color: selectedId === breakdown.key ? " white" : "",
                      }}
                    >
                      <div className="flex items-center gap-1 ">
                        <div className="w-[8px] h-[8px] border rotate-45 mr-2"></div>
                        <div className=" text-base leading-6 tracking-tight  first-letter:uppercase font-medium">
                          {breakdown.key}
                        </div>
                      </div>
                      <div>{breakdown.percentValue}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className=" pt-4  pb-6 bg-white sticky bottom-0 md:static md:bottom-0 mb-8 md:mb-16 w-full flex justify-between">
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
                <span className="text-sm font-semibold sm:block">
                  GET SUMMARY
                </span>
                <div className="w-[30px] h-[30px] border border-solid border-black rotate-225  group-hover:scale-110 duration-300 relative">
                  <IoIosPlay className=" scale-100 hover:scale-160 duration-300 rotate-135 absolute bottom-1 left-1" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

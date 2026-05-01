import Loader from "./loader";

export default function PreparingAnalysis({ preparingTitle }: any) {
  return (
    <div className="absolute w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="flex flex-col items-center justify-center">
          <div className="  text-lg text-gray-400 tracking-wider font-bold uppercase mb-3">
            {preparingTitle}
          </div>
          <Loader />
        </div>

        <div className=" animate-spin [animation-duration:50s] absolute left-1/2 -translate-x-[50%]  flex items-center justify-center border-dotted border-2 rotate-45 border-[#A0A4AB]  w-[160px] h-[160px] md:w-[300px] md:h-[300px] ">
          <div className="absolute animate-spin [animation-duration:70s] border-dotted border-2  border-[#a0a4abbc]  w-[190px] h-[190px] md:w-[330px] md:h-[330px] flex items-center justify-center">
            <div className=" absolute animate-spin [animation-duration:85s] border-dotted border-2  w-[210px] h-[210px] md:w-[360px] md:h-[360px] border-[#a0a4ab92]  flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

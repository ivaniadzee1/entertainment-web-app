"use client";
import Link from "next/link";


export default function Header({ img, img2, img3, img4 }:any) {
  return (
    <div className="flex flex-col items-center w-full lg:w-[96px] lg:h-screen h-[150px] bg-[#161D2F] lg:fixed lg:left-0 lg:top-0">
      <header className="flex items-center justify-between w-full h-[96px] lg:flex-col lg:h-full bg-[#161D2F]">
        <div className="lg:mt-[20px]">
          <img className="pt-[12px] pl-[16px] lg:pl-0 lg:pt-0 lg:mt-[10px]" src="/assets/img1.svg" alt="Logo" />
        </div>

        <div className="flex space-x-[30px] lg:flex-col lg:space-x-0 lg:space-y-[20px] lg:mt-[20px]">
          <Link href={'./home-page'}><img className="w-[20px] h-[20px] mt-[10px] md:w-[30px] md:h-[30px] lg:w-[30px] lg:h-[30px]" src={img} alt="Icon 1" /></Link>
          <Link href={'./movies'}><img className="w-[20px] h-[20px] mt-[10px] md:w-[30px] md:h-[30px] lg:w-[30px] lg:h-[30px]" src={img2} alt="Movies" /></Link>
          <Link href={'./tv-series'}><img className="w-[20px] h-[20px] mt-[10px] md:w-[30px] md:h-[30px] lg:w-[30px] lg:h-[30px]" src={img3} alt="TV" /></Link> 
          <Link href={'./marked'}><img className="w-[20px] h-[20px] mt-[10px] md:w-[30px] md:h-[30px] lg:w-[30px] lg:h-[30px]" src={img4} alt="Marked" /></Link>
        </div>

        <div className="lg:mb-[20px]">
          <img className="w-[60px] h-[62px] pt-[10px] pr-[16px] lg:pr-0 lg:pt-0 lg:mt-auto" src="/assets/men.svg" alt="Profile" />
        </div>
      </header>
    </div>
  );
}

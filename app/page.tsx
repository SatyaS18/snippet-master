import { CTASection } from "@/components/CTASection";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="poppins">
      <Navbar />
      <CTASection />
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="w-full md:w-3/6">
          <Features />
        </div>
        <div className="min-h-48 md:min-h-96 h-full w-[90%] md:w-3/6 relative">
          <Image
            className="!w-auto"
            src="/snippet-master.png"
            alt="Snippet Master"
            fill={true}
          />
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:absolute bottom-2 w-full text-center font-bold text-gray-800">
        Made by Satyakant Sahu
      </div>
    </div>
  );
}

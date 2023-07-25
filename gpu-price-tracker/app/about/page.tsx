import ThreeCanvas from "@/components/ThreeCanvas";
import styles from "./page.module.css";

export default function About() {
  return (
    <div>
      <div className="flex justify-center align-middle">
        <div className="absolute flex flex-col z-10 backdrop-blur-sm  bg-transparent mt-40 gap-4">
          <h1 className=" text-[40px] font-bold text-center ">
            Save Big with GPU Price Tracker!
          </h1>
          <h2 className=" text-[20px] font-bold text-center ">
            Join Now and Unlock the Best GPU Deals, Track Prices, and Maximize
            Savings!
          </h2>
          <div className=" border-white border-2 rounded-3xl mx-auto w-40 text-center p-2">
            Search
          </div>
        </div>
      </div>

      <div className="relative">
        <ThreeCanvas />
      </div>
    </div>
  );
}

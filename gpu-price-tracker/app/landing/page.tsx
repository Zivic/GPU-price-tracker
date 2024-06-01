"use client"
import "./landing.scss";
// import LocomotiveScroll from "locomotive-scroll";
import { useEffect } from "react";
export default function Landing() {

  useEffect(() => {
    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      // const locomotiveScroll = new Locomotive.LocomotiveScroll();
      const scroll = new Locomotive()
    }

    getLocomotive();
  }, []);
  // const locomotiveScroll = new LocomotiveScroll();
  // if (!window) throw new Error("Window not defined");
  return (
    <section className="">
      <div className="absolute flex w-full h-full z-10 justify-center items-center">
        <div className=" mb-96">
          <h1 className="font-kinetika">GPU PRICE TRACKER</h1>
        </div>
      </div>
      <div className="noiseOverlay">
        <video
          className="mouse-md opacity-40"
          loop={true}
          muted
          autoPlay
          playsInline
          // poster={}
          data-aos="zoom-in-down"
        >
          <source
            src={
              "https://res.cloudinary.com/dyudvhug1/video/upload/v1716148067/vlc-record-2024-05-18-15h48m58s-ROG_Strix_GeForce_RTX_2080_Ti_and_2080_Graphics_Cards_Victory_Redefined-_erj2nz.mp4"
            }
            type="video/mp4"
          />
        </video>
      </div>
      <div className=" h-screen flex">
        <div className=" text-8xl font-kinetika font-extrabold m-32 w-full">
          <h1> One stop design shop for your digital product 👋</h1>
        </div>
      </div>
      <div>
        <div className="text-sm font-kinetika leading-2 w-full">
          <h2 data-scroll data-scroll-speed="0.1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p data-scroll data-scroll-speed="0.8">
            😬
          </p>
        </div>
        <div>
          <div className=" w-48 h-48 bg-slate-500 rounded-lg"></div>
        </div>
      </div>
    </section>
  );
}

"use client";
import "./landing.scss";
// import LocomotiveScroll from "locomotive-scroll";
import { useLayoutEffect, useEffect, useRef } from "react";
export default function Landing() {
  const horizontalContainer = useRef(null);
  const verticalContainer = useRef(null);
  const sectionRef = useRef(null);
  const yo = useRef(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  // const locomotiveScroll = new LocomotiveScroll();
  // if (!window) throw new Error("Window not defined");
  return (
    <section ref={sectionRef} data-scroll-container>
      <div
        data-scroll
        data-scroll-speed="0.3"
        data-scroll-direction="horizontal"
      >
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
      </div>

      <div data-scroll-section className=" h-screen flex">
        <div className=" text-8xl font-kinetika font-extrabold m-32 w-full">
          <h1> One stop design shop for your digital product 👋</h1>
        </div>
      </div>
      <div>
        <div className=" h-screen  text-sm font-kinetika m-32 leading-normal w-full">
          <h2 data-scroll data-scroll-speed="0.4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p data-scroll data-scroll-speed="0.1">
            😬
          </p>
        </div>
      </div>

      <div
        ref={horizontalContainer}
        data-scroll-section
        className="horizontal-container h-screen flex "
      >
        <div ref={yo} className="flex m-32 w-full gap-20">
          <div
            data-scroll
            data-scroll-speed="0.3"
            data-scroll-direction="horizontal"
            className=" w-48 h-48 bg-slate-600 rounded-lg"
          ></div>
          <div
            data-scroll
            data-scroll-speed="0.4"
            data-scroll-direction="horizontal"
            className=" w-48 h-48 bg-slate-700 rounded-lg"
          ></div>
          <div
            data-scroll
            data-scroll-speed="0.8"
            data-scroll-direction="horizontal"
            className=" w-48 h-48 bg-slate-800 rounded-lg"
          ></div>
          <div>
            <div
              data-scroll
              data-scroll-speed="0.1"
              data-scroll-direction="horizontal"
              className=" w-48 h-48 bg-slate-900 rounded-lg"
            ></div>
            <div
              data-scroll
              data-scroll-speed="0.1"
              data-scroll-direction="horizontal"
              className=" w-48 h-48 bg-slate-600 rounded-lg"
            ></div>
            <div
              data-scroll
              data-scroll-speed="0.1"
              data-scroll-direction="horizontal"
              className=" w-48 h-48 bg-slate-700 rounded-lg"
            ></div>
            <div
              data-scroll
              data-scroll-speed="0.1"
              data-scroll-direction="horizontal"
              className=" w-48 h-48 bg-slate-800 rounded-lg"
            ></div>
            <div
              data-scroll
              data-scroll-speed="0.1"
              data-scroll-direction="horizontal"
              className=" w-48 h-48 bg-slate-900 rounded-lg"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

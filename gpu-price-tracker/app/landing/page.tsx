"use client";
import "./landing.scss";
// import LocomotiveScroll from "locomotive-scroll";
import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import LocomotiveScroll from "locomotive-scroll";

export default function Landing() {
  const horizontalContainer = useRef(null);
  const verticalContainer = useRef(null);
  const sectionRef = useRef(null);
  const yo = useRef(null);
  const scrollRef:any = useRef(null);
  let scroller: HTMLElement | null = null;

  const onScroll = ({ scroll, limit, velocity, direction, progress }) => {
    ScrollTrigger.update();
    console.log(scroll, limit, velocity, direction, progress);
    scrollRef.current = { scroll, limit, velocity, direction, progress };
  };

  useEffect(() => {
    scroller = document.documentElement;
    // let locomotiveScroll: any = null;
    gsap.registerPlugin(ScrollTrigger);

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll({
        scrollCallback: onScroll,
      });
      return locomotiveScroll;
    })().then((locomotiveScroll) => {
      // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
      ScrollTrigger.scrollerProxy(scroller, {
        scrollTop(value) {
          return arguments.length
            ? locomotiveScroll.scrollTo(value, {
                duration: 0,
                disableLerp: true,
              })
            : scrollRef?.current?.scroll?.instance?.scroll?.y || 0
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: scroller.style.transform ? "transform" : "fixed",
      });

      ScrollTrigger.defaults({
        scroller: scroller,
      });

      const horizontalSections = gsap.utils.toArray("section.horizontal");

      horizontalSections.forEach(function (sec, i) {
        var thisPinWrap = sec.querySelector(".pin-wrap");
        var thisAnimWrap = thisPinWrap.querySelector(".animation-wrap");

        var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

        gsap.fromTo(
          thisAnimWrap,
          {
            x: () =>
              thisAnimWrap.classList.contains("to-right") ? 0 : getToValue(),
          },
          {
            x: () =>
              thisAnimWrap.classList.contains("to-right") ? getToValue() : 0,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              scroller: scroller,
              start: "top top",
              end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
              pin: thisPinWrap,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              scrub: true,
              //markers: true
            },
          }
        );
      });

      // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
      ScrollTrigger.addEventListener("refresh", () =>
        locomotiveScroll.update()
      );

      // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
      ScrollTrigger.refresh();
    });
  }, []);

  // const locomotiveScroll = new LocomotiveScroll();
  // if (!window) throw new Error("Window not defined");
  return (
    <>
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

      <section className="horizontal">
        <div className="pin-wrap">
          <div className="animation-wrap to-right">
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
              ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
              dignissimos sunt ipsum repellendus totam optio distinctio. Laborum
              suscipit quia aperiam.
            </div>
            <div className="item">
              Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla
              impedit, dolores ullam hic commodi nobis nam. Dolorem expedita
              laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a
              quibusdam inventore!
            </div>
            <div className="item">
              Labore, unde amet! Alias delectus hic laboriosam et dolorum?
              Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
              nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa
              unde perspiciatis minima.
            </div>
            <div className="item">
              Quaerat error dolorem aspernatur magni dicta ut consequuntur
              maxime tempore. Animi odio eos quod culpa nulla consectetur?
              Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
              voluptate laboriosam, officiis at ea!
            </div>
            <div className="item">
              Rem nobis facere provident magni minima iste commodi aliquam
              harum? Facere error quos cumque perspiciatis voluptatibus deserunt
              maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias
              ipsam placeat voluptas!
            </div>
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
              sed dicta reiciendis, excepturi nisi perferendis, accusantium est
              suscipit tempora dolorum praesentium cupiditate doloribus non?
              Sint numquam recusandae dolore quis esse ea?
            </div>
            <div className="item">
              Temporibus cum dolor minima consequatur esse veritatis enim nemo
              cupiditate laborum doloribus reiciendis perferendis, quas fugit
              earum rerum, at beatae alias amet aspernatur dolorem dolore error
              commodi. Perspiciatis, reiciendis amet!
            </div>
            <div className="item">
              Vitae, tenetur beatae error corrupti odit expedita quisquam
              commodi ea aspernatur aliquid, eveniet reprehenderit sequi,
              similique maiores praesentium quam! Optio tenetur saepe unde
              voluptatem minus tempora maxime temporibus ducimus ullam!
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

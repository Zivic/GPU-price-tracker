"use client";
import "./landing.scss";
import { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Landing() {
  const [initialized, setInitialized] = useState(false);
  const scrollRef: any = useRef(null);
  let scroller: HTMLElement | null = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  const onScroll = ({ scroll, limit, velocity, direction, progress }) => {
    scrollRef.current = { scroll, limit, velocity, direction, progress };
    ScrollTrigger.update();
  };
  let locomotiveScroll = useRef(null);

  const initGSAP = () => {
    if (initialized && scroller.current && locomotiveScroll.current) {
      // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
      // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
      ScrollTrigger.scrollerProxy(scroller.current, {
        scrollTop(value) {
          return arguments.length
            ? locomotiveScroll.current.scrollTo(value, {
                duration: 0,
                disableLerp: true,
              })
            : scrollRef?.current?.scroll | 0;
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
        pinType: scroller.current.style.transform ? "transform" : "fixed",
      });

      ScrollTrigger.defaults({
        scroller: scroller.current,
      });

      // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
      ScrollTrigger.addEventListener("refresh", () =>
        locomotiveScroll.current.resize()
      );

      // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
      ScrollTrigger.refresh();

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
              scroller: scroller.current,
              start: "top top",
              end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
              pin: thisPinWrap,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              scrub: true,
              markers: true,
            },
          }
        );
      });
    }
  };
  useLayoutEffect(() => {
    scroller.current = document.querySelector("#scroller");
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      locomotiveScroll.current = new LocomotiveScroll({
        scrollCallback: onScroll,
      });
    })().then(() => {
      setInitialized(true);
    });
  }, []);

  useLayoutEffect(() => {
    initGSAP();
  }, [initialized, scroller]);

  return (
    <>
      <div id="scroller">
        <section className="main">
          <div>
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
        </section>

        <section className=" h-screen flex ">
          <div className="pin-wrap">
            <div className="animation-wrap to-right flex m-32 w-full gap-20">
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
        <section className="blank">
          <h1>ScrollTrigger and Locomotive-Scroll</h1>
          <p>...</p>
        </section>

        <section className="horizontal">
          <div className="pin-wrap">
            <div className="animation-wrap to-right">
              <div className="item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus, temporibus esse magni illum eos natus ipsum
                minus? Quis excepturi voluptates atque dolorum minus eligendi!
                Omnis minima magni recusandae ex dignissimos.
              </div>
              <div className="item">
                Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
                ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
                dignissimos sunt ipsum repellendus totam optio distinctio.
                Laborum suscipit quia aperiam.
              </div>
              <div className="item">
                Animi, porro molestias? Reiciendis dolor aspernatur ab quos
                nulla impedit, dolores ullam hic commodi nobis nam. Dolorem
                expedita laudantium dignissimos nobis a. Dolorem, unde quidem.
                Tempora et a quibusdam inventore!
              </div>
              <div className="item">
                Labore, unde amet! Alias delectus hic laboriosam et dolorum?
                Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
                nostrum, tempore modi quo praesentium aspernatur vero dolor,
                ipsa unde perspiciatis minima.
              </div>
              <div className="item">
                Quaerat error dolorem aspernatur magni dicta ut consequuntur
                maxime tempore. Animi odio eos quod culpa nulla consectetur?
                Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
                voluptate laboriosam, officiis at ea!
              </div>
              <div className="item">
                Rem nobis facere provident magni minima iste commodi aliquam
                harum? Facere error quos cumque perspiciatis voluptatibus
                deserunt maiores, fugiat sunt sit ab inventore natus saepe,
                eveniet alias ipsam placeat voluptas!
              </div>
              <div className="item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus, temporibus esse magni illum eos natus ipsum
                minus? Quis excepturi voluptates atque dolorum minus eligendi!
                Omnis minima magni recusandae ex dignissimos.
              </div>
              <div className="item">
                Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
                sed dicta reiciendis, excepturi nisi perferendis, accusantium
                est suscipit tempora dolorum praesentium cupiditate doloribus
                non? Sint numquam recusandae dolore quis esse ea?
              </div>
              <div className="item">
                Temporibus cum dolor minima consequatur esse veritatis enim nemo
                cupiditate laborum doloribus reiciendis perferendis, quas fugit
                earum rerum, at beatae alias amet aspernatur dolorem dolore
                error commodi. Perspiciatis, reiciendis amet!
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

        <section className="blank">
          <h1>Nothing to see here...</h1>
          <p>...</p>
        </section>

        <section className="horizontal">
          <div className="pin-wrap">
            <div className="animation-wrap to-left">
              <div className="item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus, temporibus esse magni illum eos natus ipsum
                minus? Quis excepturi voluptates atque dolorum minus eligendi!
                Omnis minima magni recusandae ex dignissimos.
              </div>
              <div className="item">
                Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
                ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
                dignissimos sunt ipsum repellendus totam optio distinctio.
                Laborum suscipit quia aperiam.
              </div>
              <div className="item">
                Animi, porro molestias? Reiciendis dolor aspernatur ab quos
                nulla impedit, dolores ullam hic commodi nobis nam. Dolorem
                expedita laudantium dignissimos nobis a. Dolorem, unde quidem.
                Tempora et a quibusdam inventore!
              </div>
              <div className="item">
                Labore, unde amet! Alias delectus hic laboriosam et dolorum?
                Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
                nostrum, tempore modi quo praesentium aspernatur vero dolor,
                ipsa unde perspiciatis minima.
              </div>
              <div className="item">
                Quaerat error dolorem aspernatur magni dicta ut consequuntur
                maxime tempore. Animi odio eos quod culpa nulla consectetur?
                Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
                voluptate laboriosam, officiis at ea!
              </div>
              <div className="item">
                Rem nobis facere provident magni minima iste commodi aliquam
                harum? Facere error quos cumque perspiciatis voluptatibus
                deserunt maiores, fugiat sunt sit ab inventore natus saepe,
                eveniet alias ipsam placeat voluptas!
              </div>
              <div className="item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus, temporibus esse magni illum eos natus ipsum
                minus? Quis excepturi voluptates atque dolorum minus eligendi!
                Omnis minima magni recusandae ex dignissimos.
              </div>
              <div className="item">
                Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
                sed dicta reiciendis, excepturi nisi perferendis, accusantium
                est suscipit tempora dolorum praesentium cupiditate doloribus
                non? Sint numquam recusandae dolore quis esse ea?
              </div>
              <div className="item">
                Temporibus cum dolor minima consequatur esse veritatis enim nemo
                cupiditate laborum doloribus reiciendis perferendis, quas fugit
                earum rerum, at beatae alias amet aspernatur dolorem dolore
                error commodi. Perspiciatis, reiciendis amet!
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

        <section className="blank">
          <h1>...scrollerProxy for the win...</h1>
          <p>...</p>
        </section>

        <section className="horizontal">
          <div className="pin-wrap">
            <div className="animation-wrap to-right">
              <div className="item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus, temporibus esse magni illum eos natus ipsum
                minus? Quis excepturi voluptates atque dolorum minus eligendi!
                Omnis minima magni recusandae ex dignissimos.
              </div>
              <div className="item">
                Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
                ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
                dignissimos sunt ipsum repellendus totam optio distinctio.
                Laborum suscipit quia aperiam.
              </div>
              <div className="item">
                Animi, porro molestias? Reiciendis dolor aspernatur ab quos
                nulla impedit, dolores ullam hic commodi nobis nam. Dolorem
                expedita laudantium dignissimos nobis a. Dolorem, unde quidem.
                Tempora et a quibusdam inventore!
              </div>
              <div className="item">
                Labore, unde amet! Alias delectus hic laboriosam et dolorum?
                Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
                nostrum, tempore modi quo praesentium aspernatur vero dolor,
                ipsa unde perspiciatis minima.
              </div>
              <div className="item">
                Quaerat error dolorem aspernatur magni dicta ut consequuntur
                maxime tempore. Animi odio eos quod culpa nulla consectetur?
                Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
                voluptate laboriosam, officiis at ea!
              </div>
              <div className="item">
                Rem nobis facere provident magni minima iste commodi aliquam
                harum? Facere error quos cumque perspiciatis voluptatibus
                deserunt maiores, fugiat sunt sit ab inventore natus saepe,
                eveniet alias ipsam placeat voluptas!
              </div>
              <div className="item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus, temporibus esse magni illum eos natus ipsum
                minus? Quis excepturi voluptates atque dolorum minus eligendi!
                Omnis minima magni recusandae ex dignissimos.
              </div>
              <div className="item">
                Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
                sed dicta reiciendis, excepturi nisi perferendis, accusantium
                est suscipit tempora dolorum praesentium cupiditate doloribus
                non? Sint numquam recusandae dolore quis esse ea?
              </div>
              <div className="item">
                Temporibus cum dolor minima consequatur esse veritatis enim nemo
                cupiditate laborum doloribus reiciendis perferendis, quas fugit
                earum rerum, at beatae alias amet aspernatur dolorem dolore
                error commodi. Perspiciatis, reiciendis amet!
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

        <section className="blank">
          <h1>...keep scrollin' scrollin' scrollin' scrollin'...</h1>
          <p>...</p>
        </section>

        <section className="horizontal">
          <div className="pin-wrap">
            <div className="animation-wrap to-left">
              <div className="item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus, temporibus esse magni illum eos natus ipsum
                minus? Quis excepturi voluptates atque dolorum minus eligendi!
                Omnis minima magni recusandae ex dignissimos.
              </div>
              <div className="item">
                Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
                ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
                dignissimos sunt ipsum repellendus totam optio distinctio.
                Laborum suscipit quia aperiam.
              </div>
              <div className="item">
                Animi, porro molestias? Reiciendis dolor aspernatur ab quos
                nulla impedit, dolores ullam hic commodi nobis nam. Dolorem
                expedita laudantium dignissimos nobis a. Dolorem, unde quidem.
                Tempora et a quibusdam inventore!
              </div>
              <div className="item">
                Labore, unde amet! Alias delectus hic laboriosam et dolorum?
                Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
                nostrum, tempore modi quo praesentium aspernatur vero dolor,
                ipsa unde perspiciatis minima.
              </div>
              <div className="item">
                Quaerat error dolorem aspernatur magni dicta ut consequuntur
                maxime tempore. Animi odio eos quod culpa nulla consectetur?
                Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
                voluptate laboriosam, officiis at ea!
              </div>
              <div className="item">
                Rem nobis facere provident magni minima iste commodi aliquam
                harum? Facere error quos cumque perspiciatis voluptatibus
                deserunt maiores, fugiat sunt sit ab inventore natus saepe,
                eveniet alias ipsam placeat voluptas!
              </div>
              <div className="item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus, temporibus esse magni illum eos natus ipsum
                minus? Quis excepturi voluptates atque dolorum minus eligendi!
                Omnis minima magni recusandae ex dignissimos.
              </div>
              <div className="item">
                Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
                sed dicta reiciendis, excepturi nisi perferendis, accusantium
                est suscipit tempora dolorum praesentium cupiditate doloribus
                non? Sint numquam recusandae dolore quis esse ea?
              </div>
              <div className="item">
                Temporibus cum dolor minima consequatur esse veritatis enim nemo
                cupiditate laborum doloribus reiciendis perferendis, quas fugit
                earum rerum, at beatae alias amet aspernatur dolorem dolore
                error commodi. Perspiciatis, reiciendis amet!
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

        <section className="blank">
          <h1>...lorem ipsum...</h1>
          <p>...</p>
        </section>

        <section className="horizontal">
          <div className="pin-wrap">
            <div className="animation-wrap to-left">
              <div className="item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus, temporibus esse magni illum eos natus ipsum
                minus? Quis excepturi voluptates atque dolorum minus eligendi!
                Omnis minima magni recusandae ex dignissimos.
              </div>
              <div className="item">
                Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
                ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
                dignissimos sunt ipsum repellendus totam optio distinctio.
                Laborum suscipit quia aperiam.
              </div>
              <div className="item">
                Animi, porro molestias? Reiciendis dolor aspernatur ab quos
                nulla impedit, dolores ullam hic commodi nobis nam. Dolorem
                expedita laudantium dignissimos nobis a. Dolorem, unde quidem.
                Tempora et a quibusdam inventore!
              </div>
              <div className="item">
                Labore, unde amet! Alias delectus hic laboriosam et dolorum?
                Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
                nostrum, tempore modi quo praesentium aspernatur vero dolor,
                ipsa unde perspiciatis minima.
              </div>
              <div className="item">
                Quaerat error dolorem aspernatur magni dicta ut consequuntur
                maxime tempore. Animi odio eos quod culpa nulla consectetur?
                Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
                voluptate laboriosam, officiis at ea!
              </div>
              <div className="item">
                Rem nobis facere provident magni minima iste commodi aliquam
                harum? Facere error quos cumque perspiciatis voluptatibus
                deserunt maiores, fugiat sunt sit ab inventore natus saepe,
                eveniet alias ipsam placeat voluptas!
              </div>
              <div className="item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus, temporibus esse magni illum eos natus ipsum
                minus? Quis excepturi voluptates atque dolorum minus eligendi!
                Omnis minima magni recusandae ex dignissimos.
              </div>
              <div className="item">
                Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
                sed dicta reiciendis, excepturi nisi perferendis, accusantium
                est suscipit tempora dolorum praesentium cupiditate doloribus
                non? Sint numquam recusandae dolore quis esse ea?
              </div>
              <div className="item">
                Temporibus cum dolor minima consequatur esse veritatis enim nemo
                cupiditate laborum doloribus reiciendis perferendis, quas fugit
                earum rerum, at beatae alias amet aspernatur dolorem dolore
                error commodi. Perspiciatis, reiciendis amet!
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

        <section className="blank">
          <h1>...what do you think?</h1>
          <p>...</p>
        </section>
      </div>
    </>
  );
}

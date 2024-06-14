"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollManufacturers from "@/components/ScrollManufacturers"
import "./landing.scss";
import { useEffect, useRef } from "react";
import useLocomotiveScroll from "@/hooks/useLocomotiveScroll";
export default function Landing() {
  useLocomotiveScroll();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      ".gsap-stagger > *",
      {
        opacity: 0.001,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        delay: 1,
        stagger: 0.8,
        duration:1,
      }
    );
  }, []);

  const handleInput = (e: KeyboardEvent) => {
    if(e.key == "Enter"){
      console.log(e.target.value);
      //TODO: redirect to browse page with search value
    }
  }

  return (
    <>
      <div id="scroller">
        <section className="main">
          <div>
            <div className="absolute flex w-full h-full z-10 justify-center items-center">
              <div
                className="gsap-stagger font-kinetika font-bold mb-96 mt-80 flex flex-col items-center"
              >
                <span>GPU</span>
                <span>PRICE</span>
                <span>TRACKER</span>
                <div className=" text-3xl mt-20">
                  <input onKeyUp={(e) => handleInput(e)} className="rounded-full py-4 px-8" placeholder="RTX 4090"></input>
                </div>
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

          <div data-scroll-section className=" h-screen flex flex-col">
            <div className=" text-8xl font-kinetika font-extrabold m-32 w-full">
              <h1> One stop design shop for your digital product 👋</h1>
            </div>
            <div>
            <ScrollManufacturers/>

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

        <section className="horizontal horizontal-container flex ">
          <div className="pin-wrap">
            <div className="animation-wrap to-right flex justify-center items-center overflow-hidden  gap-20">
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
                data-scroll-speed="0.5"
                data-scroll-direction="horizontal"
                className=" w-48 h-48 bg-slate-800 rounded-lg"
              ></div>
              <div
                data-scroll
                data-scroll-speed="0.6"
                data-scroll-direction="horizontal"
                className=" w-48 h-48 bg-slate-900 rounded-lg"
              ></div>
              <div
                data-scroll
                data-scroll-speed="0.5"
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
                data-scroll-speed="0.3"
                data-scroll-direction="horizontal"
                className=" w-48 h-48 bg-slate-800 rounded-lg"
              ></div>
              <div
                data-scroll
                data-scroll-speed="0.2"
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
                data-scroll-speed="0.05"
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
                data-scroll-speed="0.15"
                data-scroll-direction="horizontal"
                className=" w-48 h-48 bg-slate-900 rounded-lg"
              ></div>
              <div
                data-scroll
                data-scroll-speed="0.2"
                data-scroll-direction="horizontal"
                className=" w-48 h-48 bg-slate-600 rounded-lg"
              ></div>
              <div
                data-scroll
                data-scroll-speed="0.25"
                data-scroll-direction="horizontal"
                className=" w-48 h-48 bg-slate-700 rounded-lg"
              ></div>
              <div
                data-scroll
                data-scroll-speed="0.3"
                data-scroll-direction="horizontal"
                className=" w-48 h-48 bg-slate-800 rounded-lg"
              ></div>
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
                data-scroll-speed="0.5"
                data-scroll-direction="horizontal"
                className=" w-48 h-48 bg-slate-800 rounded-lg"
              ></div>
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
                data-scroll-speed="0.5"
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
        </section>
        {/* <section className="blank">
          <h1>ScrollTrigger and Locomotive-Scroll</h1>
          <p>...</p>
        </section> */}
        {/*
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
        </section> */}

        {/* <section className="blank">
          <h1>...keep scrollin scrollin scrollin scrollin...</h1>
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
        </section> */}
      </div>
    </>
  );
}

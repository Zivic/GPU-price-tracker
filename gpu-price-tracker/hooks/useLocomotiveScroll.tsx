import  {useState, useLayoutEffect, useRef} from "react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function useLocomotiveScroll() {
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
}
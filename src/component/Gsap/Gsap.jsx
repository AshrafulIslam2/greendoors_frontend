"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gsap = () => {
  const main = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const sections = self.selector(".section");
      sections.forEach((section) => {
        gsap.to(section.querySelector(".box"), {
          x: 500,
          rotation: 360,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
    }, main);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={main}>
      <section className="section">
        <div className="box"></div>
      </section>
      <section className="section">
        <div className="box"></div>
      </section>
      <section className="section">
        <div className="box"></div>
      </section>
    </div>
  );
};

export default Gsap;

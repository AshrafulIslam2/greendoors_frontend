"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModel } from "@/state/helper_slice/modelOpenSlice";
import { gsap } from "gsap";

const Model = () => {
  const isModelOpen = useSelector((state) => state.model.isModelOpen);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        dispatch(closeModel());
      },
    });

    tl.to(modalRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      },
      "<"
    );
  };

  useEffect(() => {
    if (isModelOpen) {
      gsap.set([overlayRef.current, modalRef.current], { opacity: 0, y: 100 });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      }).to(
        modalRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<"
      );
    }
  }, [isModelOpen]);

  return (
    <>
      {isModelOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <div
            ref={modalRef}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg z-50"
          >
            <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
            <p className="text-gray-700 mb-6">This is a modal content area.</p>
            <button
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={handleClose}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Model;

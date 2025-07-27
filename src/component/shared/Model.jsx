"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { closeModel } from "@/state/helper_slice/modelOpenSlice";
import gsap from "gsap";

const Model = ({ children, modelTitle }) => {
  const isModelOpen = useSelector((state) => state.model.isModelOpen);
  const dispatch = useDispatch();
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isModelOpen) {
      // Animate overlay fade in
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      // Animate modal scale in
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [isModelOpen]);

  const handleClose = () => {
    // Animate out, then close
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => dispatch(closeModel()),
        });
      },
    });
  };

  return (
    <>
      {isModelOpen && (
        <div
          ref={overlayRef}
          className="w-full bg-black/35 backdrop-blur-sm h-full fixed top-0 left-0 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            ref={modalRef}
            className="relative bg-white p-0 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: sticky for mobile */}
            <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-2 flex items-center justify-between rounded-t-lg border-b border-gray-400">
              <h1 className="text-lg font-semibold text-gray-800">
                {modelTitle || "Add Member"}
              </h1>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-black transition bg-gradient-to-tr from-red-500 to-red-700 p-1 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            {/* Scrollable content */}
            <div
              className="overflow-y-auto px-6 pb-6 pt-2"
              style={{ maxHeight: "calc(90vh - 56px)" }}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Model;

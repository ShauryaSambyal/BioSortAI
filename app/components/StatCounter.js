"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/**
 * Counts up to `value` once the number scrolls into view, driven by anime.js
 * animating a plain JS object (the most direct way to own the rendered text).
 */
export default function StatCounter({
  value,
  from = 0,
  decimals = 0,
  duration = 1900,
  delay = 0,
  prefix = "",
  suffix = "",
  className = "",
  /** Change this to replay the count-up (e.g. on every new prediction). */
  playKey,
  /** Skip the scroll trigger and animate as soon as the value changes. */
  immediate = false,
}) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const format = (input) => `${prefix}${input.toFixed(decimals)}${suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = format(value);
      return;
    }

    const counter = { current: from };
    node.textContent = format(from);

    const animation = { current: null };

    const run = () => {
      animation.current?.pause();
      counter.current = from;
      animation.current = animate(counter, {
        current: value,
        duration,
        delay,
        ease: "outExpo",
        onUpdate: () => {
          node.textContent = format(counter.current);
        },
        onComplete: () => {
          node.textContent = format(value);
        },
      });
    };

    if (immediate) {
      run();
      return () => animation.current?.pause();
    }

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      run();
    };

    // If the number is already on screen at mount (tall viewport, short page,
    // or the element sits above the fold) fire straight away. Otherwise the
    // counter would sit at its initial value until the user happened to scroll.
    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.height > 0 && rect.bottom > 0 && rect.top < viewportHeight) {
      start();
      return () => animation.current?.pause();
    }

    // Threshold 0 fires as soon as a single pixel is visible, which is far more
    // forgiving than a fractional threshold on a small inline element.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      animation.current?.pause();
    };
  }, [value, from, decimals, duration, delay, prefix, suffix, playKey, immediate]);

  return <span ref={nodeRef} className={`tabular ${className}`} />;
}

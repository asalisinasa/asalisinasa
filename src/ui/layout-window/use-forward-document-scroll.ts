"use client";

import { type RefObject, useEffect, useRef } from "react";

function isNodeInside(container: Element, target: EventTarget | null): boolean {
  return target instanceof Node && container.contains(target);
}

function normalizeWheelDelta(
  deltaY: number,
  deltaMode: number,
  pageHeight: number
): number {
  switch (deltaMode) {
    case WheelEvent.DOM_DELTA_LINE:
      return deltaY * 16;
    case WheelEvent.DOM_DELTA_PAGE:
      return deltaY * pageHeight;
    default:
      return deltaY;
  }
}

/**
 * Forwards document-level wheel and touch gestures into `scrollerRef` when the
 * gesture starts outside that element (e.g. page margins). Native scrolling
 * inside the scroller is left untouched.
 */
export function useForwardDocumentScroll(
  scrollerRef: RefObject<HTMLElement | null>
): void {
  const touchActiveRef = useRef(false);
  const lastTouchYRef = useRef(0);

  useEffect(() => {
    const getScroller = (): HTMLElement | null => scrollerRef.current;

    const onWheel = (event: WheelEvent): void => {
      const scroller = getScroller();
      if (!scroller || isNodeInside(scroller, event.target)) {
        return;
      }

      event.preventDefault();
      scroller.scrollTop += normalizeWheelDelta(
        event.deltaY,
        event.deltaMode,
        scroller.clientHeight
      );
    };

    const onTouchStart = (event: TouchEvent): void => {
      if (event.touches.length !== 1) {
        touchActiveRef.current = false;
        return;
      }

      const scroller = getScroller();
      const touch = event.touches.item(0);
      if (!scroller || !touch || isNodeInside(scroller, event.target)) {
        touchActiveRef.current = false;
        return;
      }

      touchActiveRef.current = true;
      lastTouchYRef.current = touch.clientY;
    };

    const onTouchMove = (event: TouchEvent): void => {
      if (!touchActiveRef.current || event.touches.length !== 1) {
        return;
      }

      const scroller = getScroller();
      const touch = event.touches.item(0);
      if (!scroller || !touch) {
        return;
      }

      const deltaY = lastTouchYRef.current - touch.clientY;
      lastTouchYRef.current = touch.clientY;
      event.preventDefault();
      scroller.scrollTop += deltaY;
    };

    const onTouchEnd = (): void => {
      touchActiveRef.current = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [scrollerRef]);
}

import { useRef, useState, useEffect } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function SeasonPicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  });
  const [isScrolledToStart, setIsScrolledToStart] = useState(true);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setIsScrolledToStart(scrollLeft === 0);
      setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth);
    };

    const scrollContainer = ref.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return (
    <div
      className={`${className} w-full h-auto gap-2 items-center justify-center`}
    >
      <div
        ref={ref}
        {...events}
        className="flex w-[85%] max-sm:w-full space-x-3 overflow-x-scroll scrollbar-hide"
      >
        {children}
      </div>
      <div
        className={`right-fade h-[3rem] translate-y-[-45px] w-12 pointer-events-none absolute bg-gradient-to-l to-[hsla(0,0%,98%,0.01)] from-[hsla(0,0%,98%)] dark:to-[hsla(0,0%,4%,0.01)] dark:from-[hsla(0,0%,4%)] from-10% right-[21rem] ${
          isScrolledToEnd ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      />
      <div
        className={`left-fade h-[3rem] translate-y-[-45px] w-12 pointer-events-none absolute bg-gradient-to-r to-[hsla(0,0%,98%,0.01)] from-[hsla(0,0%,98%)] dark:to-[hsla(0,0%,4%,0.01)] dark:from-[hsl(0,0%,4%)] to-50% ${
          isScrolledToStart ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      />
    </div>
  );
}

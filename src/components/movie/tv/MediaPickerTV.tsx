import { useRef, useState, useEffect } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function MediaPickerTV({
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
        className="flex w-[85%] max-sm:w-full space-x-3 overflow-x-scroll overflow-y-visible scrollbar-hide md:pl-[10px] md:pt-[10px] pl-[5px] pt-[5px]"
      >
        {children}
      </div>
      <div
        className={`h-[17rem] max-sm:h-[13rem] max-sm:translate-y-[-195px] translate-y-[-245px] translate-x-[635px] max-sm:translate-x-[345px] w-12 pointer-events-none absolute bg-gradient-to-l to-[hsla(0,0%,98%,0.01)] from-[hsla(0,0%,98%,1)] dark:to-[hsla(0,0%,4%,0.01)] dark:from-[hsla(0,0%,4%,1)] from-30% ${
          isScrolledToEnd ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      />
      <div
        className={`h-[17rem] max-sm:h-[13rem] max-sm:translate-y-[-195px] translate-y-[-245px] max-sm:translate-x-[-1px] w-12 pointer-events-none absolute bg-gradient-to-r to-[hsla(0,0%,98%,0.01)] from-[hsla(0,0%,98%,1)] dark:to-[hsla(0,0%,4%,0.01)] dark:from-[hsla(0,0%,4%,1)] to-50% ${
          isScrolledToStart ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      />
    </div>
  );
}

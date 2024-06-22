import Image from "next/image";
export const TypefaceLogo = () => {
  return (
    <>
      <Image
        priority={true}
        className="super-invert w-full hover:opacity-70 transition-opacity duration-300"
        src="/images/super-typeface-white.png"
        width={1440}
        height={201}
        alt="Superlist logo"
      />
    </>
  );
};

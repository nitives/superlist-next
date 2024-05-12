import Image from "next/image";
export const Logo1 = () => {
  return (
    <>
      <Image
        className="super-invert"
        src="/images/favicon-white.png"
        width={24}
        height={24}
        alt="Superlist logo"
      />
    </>
  );
};

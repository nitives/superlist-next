import Image from "next/image";
export const Logo1 = () => {
  return (
    <div className="super-invert">
      <Image
        className="hover:opacity-70 transition-opacity duration-300 "
        src="/images/favicon-white.png"
        width={24}
        height={24}
        alt="Superlist logo"
      />
    </div>
  );
};

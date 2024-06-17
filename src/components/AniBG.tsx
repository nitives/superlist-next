import Image from "next/image";
import darkTexture from "../../public/images/bg-dark-texture1.png";
import lightTexture from "../../public/images/bg-light-texture1.png";

export const AniBG = () => {
  return (
    <div className="mx-auto hidden justify-center items-center -z-10">
      <Image
        className="bg-texture texture-dark h-[30rem]"
        src={darkTexture}
        alt="Dark Mode Background Texture"
        width={3168}
        height={2448}
      />
      <Image
        className="bg-texture texture-light h-[30rem]"
        src={lightTexture}
        alt="Light Mode Background Texture"
        width={3168}
        height={2448}
      />
    </div>
  );
};

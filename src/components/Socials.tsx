import Image from "next/image";
import twitterIcon from "../../public/logos/x.svg";
import discordIcon from "../../public/logos/discord.svg";
import githubIcon from "../../public/logos/github.svg";

export const SocialIcons = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="site-grid">{children}</div>
    </>
  );
};

export const Socials = () => {
  return (
    <>
      <div className="hidden md:flex gap-3 items-center">
        <a target="_blank" href="https://discord.gg/ga2ENQvczq">
          <Image
            className="fill-social hover:opacity-70 transition-opacity duration-300"
            src={discordIcon}
            width={24}
            height={24}
            alt="Superlist's Discord Server"
          />
        </a>
        {/* <a target="_blank" href="https://twitter.com/nitves">
          <Image
            className="fill-social"
            src={twitterIcon}
            width={24}
            height={24}
            alt="X formally known as Twitter's Logo"
          />
        </a> */}
        <a target="_blank" href="https://github.com/nitives/Superlist">
          <Image
            className="fill-social hover:opacity-70 transition-opacity duration-300"
            src={githubIcon}
            width={24}
            height={24}
            alt="Superlist's GitHub Repository"
          />
        </a>
      </div>
    </>
  );
};

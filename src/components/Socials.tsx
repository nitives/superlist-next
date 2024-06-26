import Image from "next/image";
import twitterIcon from "../../public/logos/x.svg";
import discordIcon from "../../public/logos/discord.svg";
import githubIcon from "../../public/logos/github.svg";
import { FaDiscord } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

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
      <a target="_blank" href="https://discord.gg/ga2ENQvczq">
        <FaDiscord size={20} className="hover:opacity-70 transition-opacity duration-300" />
        <span className="sr-only">Superlist&apos;s Discord</span>
      </a>
      <a target="_blank" href="https://github.com/nitives/Superlist">
        <FaGithub size={20} className="hover:opacity-70 transition-opacity duration-300" />
        <span className="sr-only">Superlist&apos;s GitHub Repository</span>
      </a>
    </>
  );
};

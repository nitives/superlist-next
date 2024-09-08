import { CommitInfo } from "./CommitInfo";
import { TypefaceLogo } from "./branding";

export const Footer = ({ className }: { className: string }) => {
  return (
    <footer className={className}>
      <a href="/" className="flex footer-logo grayscale">
        <TypefaceLogo />
      </a>

      <div className="pt-8 content-start items-start flex flex-row flex-nowrap lg:gap-20 gap-12 h-min justify-start overflow-visible p-[0] relative w-full">
        <div className="content-start items-start flex flex-col flex-nowrap gap-4 h-min justify-center overflow-visible p-[0] relative w-min">
          <div className="font-bold outline-none flex flex-col justify-start flex-shrink-0">
            <p>Navigation</p>
          </div>
          <div className="footer-links">
            <a href="/archive/og/index.html" className="">
              OG
            </a>
          </div>
          <div className="footer-links">
            <a href="/downloads" className="">
              Downloads
            </a>
          </div>
          <div className="footer-links">
            <a href="/movies" className="">
              Movies
            </a>
          </div>
          <div className="footer-links">
            <a href="/pandabuy" className="">
              Pandabuy
            </a>
          </div>
        </div>
        <div className="content-start items-start flex flex-col flex-nowrap gap-4 h-min justify-center overflow-visible p-[0] relative w-min">
          <div className="font-bold outline-none flex flex-col justify-start flex-shrink-0">
            <p>Social</p>
          </div>
          <div className="footer-links"></div>
          <div className="footer-links">
            <a href="https://discord.gg/ga2ENQvczq">Discord</a>
          </div>
          <div className="footer-links">
            <a href="https://x.com/nitves">Twitter</a>
          </div>
        </div>
        <div className="hidden content-start items-start flex-col flex-nowrap gap-4 h-min justify-center overflow-visible p-[0] relative w-min">
          <div className="font-bold outline-none flex flex-col justify-start flex-shrink-0">
            <p>Support</p>
          </div>
          <div className="footer-links">
            <a href="/pandabuy" className="line-through">
              Websites
            </a>
          </div>
          <div className="footer-links">
            <a href="/pandabuy" className="line-through">
              Profiles
            </a>
          </div>
          <div className="footer-links">
            <a href="/pandabuy" className="line-through">
              Marketplace
            </a>
          </div>
        </div>
        <div className="content-start items-start flex flex-col flex-nowrap gap-4 h-min justify-center overflow-visible p-[0] relative w-min">
          <div className="font-bold outline-none flex flex-col justify-start flex-shrink-0">
            <p>Legal</p>
          </div>
          <div className="footer-links">
            <a href="/legal/privacy">Privacy</a>
          </div>
          <div className="footer-links">
            <a href="/legal/terms">Terms</a>
          </div>
          <div className="footer-links">
            <a href="/legal/cookies">Cookies</a>
          </div>
        </div>
      </div>
      <div className="pt-10 text-xs opacity-50">
        <p>
          © 2024 Superlist CC. All Rights Reserved. Made with ❤️ in Florida,
          United States.
        </p>
      </div>
      <CommitInfo className="text-xs ml-[1px]" />
    </footer>
  );
};

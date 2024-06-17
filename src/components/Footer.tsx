import { TypefaceLogo } from "./branding";

export const Footer = ({ className }: { className: string }) => {
  return (
    <footer className={className}>
      <a href="/" className="flex w-80 grayscale">
        <TypefaceLogo />
      </a>

      <div className="pt-8 content-start items-start flex flex-row flex-nowrap gap-20 h-min justify-start overflow-visible p-[0] relative w-full">
        <div className="content-start items-start flex flex-col flex-nowrap gap-4 h-min justify-center overflow-visible p-[0] relative w-min">
          <div className="font-mono font-bold outline-none flex flex-col justify-start flex-shrink-0">
            <p>Navigation</p>
          </div>
          <div className="footer-links">
            <a href="/og" className="">
              OG
            </a>
          </div>
          <div className="footer-links">
            <a href="/downloads" className="">
              Downloads
            </a>
          </div>
          <div className="footer-links">
            <a href="/movies" className="line-through">
              Movies
            </a>
          </div>
          <div className="footer-links">
            <a href="/pandabuy" className="line-through">
              Pandabuy
            </a>
          </div>
        </div>
        <div className="content-start items-start flex flex-col flex-nowrap gap-4 h-min justify-center overflow-visible p-[0] relative w-min">
          <div className="font-mono font-bold outline-none flex flex-col justify-start flex-shrink-0">
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
          <div className="font-mono font-bold outline-none flex flex-col justify-start flex-shrink-0">
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
          <div className="font-mono font-bold outline-none flex flex-col justify-start flex-shrink-0">
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
    </footer>
  );
};

{
  /* <div className="hidden content-start items-start flex flex-row flex-nowrap gap-20 h-min justify-start overflow-visible p-[0] relative w-full">
        <div className="content-start items-start flex flex-col flex-nowrap gap-4 h-min justify-start overflow-visible p-[0] relative w-full">
          <div className="framer-1j18gw5">
            <p className="framer-text">Navigation</p>
          </div>
          <div className="framer-1p523dq">
            <p className="framer-text">
              <a className="framer-text framer-styles-preset-10g127g" href="./">
                Websites
              </a>
            </p>
          </div>
          <div className="framer-1s4ap0v" data-o-authenticated="1">
            <p className="framer-text">
              <a
                className="framer-text framer-styles-preset-10g127g"
                href="./websites"
              >
                Websites
              </a>
            </p>
          </div>
          <div className="framer-1nibij3">
            <p className="framer-text">
              <a
                className="framer-text framer-styles-preset-10g127g"
                href="./profiles"
              >
                Profiles
              </a>
            </p>
          </div>
          <div className="framer-2jog73">
            <p className="framer-text">
              <a className="framer-text framer-styles-preset-10g127g" href="./">
                Marketplace
              </a>
            </p>
          </div>
        </div>
        <div className="content-start items-start flex flex-col flex-nowrap gap-4 h-min justify-start overflow-visible p-[0] relative w-full">
          <div className="framer-1xbcxpo">
            <p className="framer-text">Dark</p>
          </div>
          <div className="framer-1xuamo5">
            <p className="framer-text">
              <a
                className="framer-text framer-styles-preset-10g127g"
                href="./pricing"
              >
                Pricing
              </a>
            </p>
          </div>
          <div className="framer-ygwi0c">
            <p className="framer-text">
              <a
                className="framer-text framer-styles-preset-10g127g"
                href="https://twitter.com/joindarkdesign"
                target="_blank"
                rel="noopener"
              >
                Twitter/X
              </a>
            </p>
          </div>
        </div>
        <div className="content-start items-start flex flex-col flex-nowrap gap-4 h-min justify-start overflow-visible p-[0] relative w-full">
          <div className="framer-1per1gf">
            <p className="framer-text">Support</p>
          </div>
          <div className="framer-1w5ypru">
            <p className="framer-text">
              <a
                className="framer-text framer-styles-preset-10g127g"
                href="./pricing#faq"
              >
                FAQ
              </a>
            </p>
          </div>
          <div className="framer-1wxr1ca">
            <p className="framer-text">
              <a
                className="framer-text framer-styles-preset-10g127g"
                href="https://tally.so/r/wAv41e"
                target="_blank"
                rel="noopener"
              >
                Feedback
              </a>
            </p>
          </div>
          <div className="framer-zcd3z0">
            <p className="framer-text">
              <a
                className="framer-text framer-styles-preset-10g127g"
                href="mailto:hey@dark.design"
                target="_blank"
                rel="noopener"
              >
                Contact
              </a>
            </p>
          </div>
        </div>
        <div className="content-start items-start flex flex-col flex-nowrap gap-4 h-min justify-start overflow-visible p-[0] relative w-full">
          <div className="framer-1l89xjm">
            <p className="framer-text">Legal</p>
          </div>
          <div className="framer-mnxab0">
            <p className="framer-text">
              <a
                className="framer-text framer-styles-preset-10g127g"
                href="./legal/privacy"
              >
                Privacy
              </a>
            </p>
          </div>
          <div className="framer-1bynl9t">
            <p className="framer-text">
              <a
                className="framer-text framer-styles-preset-10g127g"
                href="./legal/terms"
              >
                Terms
              </a>
            </p>
          </div>
          <div className="framer-1in5bcd">
            <p className="framer-text">
              <a
                className="framer-text framer-styles-preset-10g127g"
                href="./legal/imprint"
              >
                Imprint
              </a>
            </p>
          </div>
        </div>
      </div> */
}

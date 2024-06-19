import { ChevronRightIcon } from "lucide-react";

export const Pill = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className: string;
  href: string;
}) => {
  return (
    <div className={className}>
      <a
        href={href}
        className="flex items-center h-7 backdrop-blur-md text-xs px-2 bg-foreground/10 border dark:border-foreground/[0.05] border-neutral-500/20 rounded-full whitespace-nowrap decoration-none cursor-pointer"
      >
        <p>{children}</p>
        <ChevronRightIcon className="size-4 relative left-[2px]" />
      </a>
    </div>
  );
};

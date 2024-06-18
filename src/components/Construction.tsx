import Image from "next/image";
import Link from "next/link";

export const Construction = ({ className }: { className: string }) => {
  return (
    <main className={className}>
      <div className="grid gap-1 items-center justify-center text-center h-56">
        <div className="flex justify-center">
          <Image
            alt="Construction symbol"
            src="/images/emojis/apple/construction.png"
            width={60}
            height={60}
          />
        </div>
        <div className="font-mono">
          <p>This page is still being worked on</p>
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out"
          >
            Return
          </Link>
        </div>
      </div>
    </main>
  );
};

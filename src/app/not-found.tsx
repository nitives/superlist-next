import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-2 pt-12">
      <div className="grid items-center justify-center text-center h-56">
        <div>
          <p className="leading-[20px]">
            <br /> &nbsp;&#x2571;|&#x3001;
            <br /> (˚ˎ 。7
            <br /> &nbsp;|&#x3001;˜〵
            <br />
            &nbsp; &nbsp;&nbsp;じしˍ,)&#x30CE;
          </p>
        </div>
        <div className="font-mono">
          <p>This page doesn&apos;t exist yet</p>
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out"
          >
            Return
          </Link>
        </div>
      </div>

      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4"></div>
    </main>
  );
}

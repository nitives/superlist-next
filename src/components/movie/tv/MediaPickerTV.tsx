export default function MediaPickerTV({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`${className} w-full h-auto gap-2 items-center justify-center`}
    >
      <div className="episodes-grid gap-2">
      {children}
      </div>
    </div>
  );
}

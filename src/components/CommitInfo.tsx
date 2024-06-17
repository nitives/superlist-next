export const CommitInfo = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <div className="inline-flex items-center justify-center gap-2">
        <span className="relative flex size-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400"></span>
          <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
        </span>
        <p className="-mr-1">Latest Commit -</p>
        <p>{process.env.NEXT_PUBLIC_COMMIT_HASH}</p>
      </div>
    </div>
  );
};

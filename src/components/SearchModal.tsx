export const SearchModal = ({
  children,
}: {
  children: React.ReactNode;
  open: boolean;
}) => {
  return (
    <div className="bg-black/50 fixed inset-0 z-10 flex justify-center items-center">
      <div className="p-4 bg-background/70 main-border rounded-xl shadow-lg w-[90%] max-w-[500px] h-[90%] max-h-[500px] overflow-hidden">
        <textarea className="bg-pink-600/50 w-full rounded-lg"></textarea>
      </div>
    </div>
  );
};

"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function MovieClient({
  children,
  movie,
}: {
  children: React.ReactNode;
  movie: any;
}) {
  const { id } = useParams();
  useEffect(() => {
    // console.log("ID:", id);
    // console.log("Movie:", movie);
  }, [id, movie]);

  return <div>{children}</div>;
}

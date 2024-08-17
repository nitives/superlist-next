import React from "react";

export const SafeView = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-6 pt-10">{children}</div>;
};

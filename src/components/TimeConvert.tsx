import React from "react";

interface TimeConvertProps {
  children: string;
}

export const TimeConvert: React.FC<TimeConvertProps> = ({ children }) => {
  const date = new Date(children);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return <span>{formattedDate}</span>;
};

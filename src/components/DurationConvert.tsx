import React from "react";

interface DurationConvertProps {
  duration: number | string;
}

const DurationConvert: React.FC<DurationConvertProps> = ({ duration }) => {
  const convertDuration = (minutes: number) => {
    if (isNaN(minutes) || minutes <= 0) {
      return "N/A";
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    } else {
      return `${mins}m`;
    }
  };

  const durationInMinutes =
    typeof duration === "string" ? parseInt(duration, 10) : duration;

  return <span>{convertDuration(durationInMinutes)}</span>;
};

export default DurationConvert;

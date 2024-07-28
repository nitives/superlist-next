import React from "react";

interface FullscreenOutProps extends React.SVGAttributes<SVGElement> {
  size?: number;
  color?: string;
}

const FullscreenOut: React.FC<FullscreenOutProps> = ({
  size = 24,
  color = "currentColor",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="86.43 30.55 95.17 97.46"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path d="M95.215 74.347h27.1c4.98 0 7.861-2.93 7.861-7.91v-27.05c0-2.54-1.904-4.542-4.492-4.542s-4.443 1.953-4.443 4.541v4.102l1.025 17.04-12.89-13.525-14.99-15.136c-.83-.88-1.954-1.319-3.126-1.319-2.783 0-4.834 1.856-4.834 4.59 0 1.27.489 2.49 1.367 3.37l15.04 15.038 13.525 12.842-17.041-.977h-4.102c-2.588 0-4.59 1.807-4.59 4.444 0 2.588 1.954 4.492 4.59 4.492Zm46.826 49.56c2.588 0 4.444-1.904 4.444-4.54v-4.64l-1.026-16.991 12.891 13.525 15.332 15.43c.83.879 1.904 1.318 3.125 1.318 2.734 0 4.785-1.855 4.785-4.59 0-1.27-.439-2.49-1.318-3.369l-15.381-15.38-13.574-12.842 17.09.976h4.638c2.588 0 4.59-1.807 4.59-4.394 0-2.637-1.953-4.493-4.59-4.493h-27.636c-4.98 0-7.862 2.881-7.862 7.862v27.588c0 2.587 1.856 4.54 4.492 4.54Z"></path>
  </svg>
);

export default FullscreenOut;
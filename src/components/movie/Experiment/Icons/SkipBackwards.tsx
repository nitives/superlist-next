import React from "react";

interface SkipBackwardsProps extends React.SVGAttributes<SVGElement> {
  size?: number;
  color?: string;
}

const SkipBackwards: React.FC<SkipBackwardsProps> = ({
  size = 24,
  color = "currentColor",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="84.21 19.76 99.61 109.08"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path d="M84.205 79.035c0 27.246 22.608 49.804 49.805 49.804 27.246 0 49.805-22.558 49.805-49.804 0-24.024-17.53-44.385-40.381-48.877v-6.934c0-3.467-2.393-4.395-5.03-2.49l-15.576 10.888c-2.246 1.563-2.295 3.907 0 5.518l15.528 10.938c2.685 1.953 5.078 1.025 5.078-2.49v-6.934c18.457 4.199 32.031 20.605 32.031 40.38 0 23.047-18.408 41.504-41.455 41.504-23.047 0-41.553-18.457-41.504-41.503.049-13.868 6.787-26.124 17.188-33.545 2.002-1.514 2.636-3.809 1.416-5.86-1.221-2.002-3.907-2.539-6.055-.879-12.549 9.131-20.85 23.877-20.85 40.284Zm61.866 20.556c8.105 0 13.427-7.666 13.427-19.385 0-11.816-5.322-19.58-13.427-19.58-8.106 0-13.428 7.764-13.428 19.58 0 11.72 5.322 19.385 13.428 19.385Zm-25.44-.586c1.904 0 3.125-1.318 3.125-3.369V64.923c0-2.392-1.27-3.906-3.467-3.906-1.318 0-2.246.44-4.052 1.611l-6.739 4.541c-1.074.782-1.611 1.66-1.611 2.832 0 1.612 1.27 2.979 2.832 2.979.928 0 1.367-.195 2.344-.879l4.54-3.32v26.855c0 2.002 1.173 3.37 3.028 3.37Zm25.44-5.322c-4.297 0-7.08-5.127-7.08-13.477 0-8.496 2.734-13.671 7.08-13.671 4.345 0 7.03 5.126 7.03 13.671 0 8.35-2.734 13.477-7.03 13.477Z"></path>
  </svg>
);

export default SkipBackwards;

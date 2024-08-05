export const MapMarkerAnimated = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path
          fill="none"
          stroke="currentColor"
          strokeDasharray={48}
          strokeDashoffset={48}
          strokeLinecap="round"
          strokeWidth={2}
          d="M12 20.5C12 20.5 6 13.5 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 13.5 12 20.5 12 20.5z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="48;0"
          ></animate>
        </path>
        <circle cx={12} cy={9} r={2.5} fillOpacity={0}>
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            begin="0.7s"
            dur="0.4s"
            values="0;1"
          ></animate>
        </circle>
      </g>
    </svg>
  );
};

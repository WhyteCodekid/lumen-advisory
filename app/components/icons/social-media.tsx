export const TwitterX = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}
    >
      <g fill="none">
        <g clipPath="url(#primeTwitter0)">
          <path
            fill="currentColor"
            d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
          ></path>
        </g>
        <defs>
          <clipPath id="primeTwitter0">
            <path fill="#fff" d="M0 0h14v14H0z"></path>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
};
export const TwitterAnimated = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.5 2h2.5L11 2h-2.5zM13 2h2.5L15.5 2h-2.5zM10.5 2h5v0h-5zM8.5 2h5v0h-5zM10 2h3.5L13.5 2h-3.5z"
      >
        <animate
          fill="freeze"
          attributeName="d"
          dur="0.8s"
          keyTimes="0;0.3;0.5;1"
          values="M8.5 2h2.5L11 2h-2.5zM13 2h2.5L15.5 2h-2.5zM10.5 2h5v0h-5zM8.5 2h5v0h-5zM10 2h3.5L13.5 2h-3.5z;M8.5 2h2.5L11 22h-2.5zM13 2h2.5L15.5 22h-2.5zM10.5 2h5v2h-5zM8.5 20h5v2h-5zM10 2h3.5L13.5 22h-3.5z;M8.5 2h2.5L11 22h-2.5zM13 2h2.5L15.5 22h-2.5zM10.5 2h5v2h-5zM8.5 20h5v2h-5zM10 2h3.5L13.5 22h-3.5z;M1 2h2.5L18.5 22h-2.5zM5.5 2h2.5L23 22h-2.5zM3 2h5v2h-5zM16 20h5v2h-5zM18.5 2h3.5L5 22h-3.5z"
        ></animate>
      </path>
    </svg>
  );
};
export const Facebook = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1536 1536"
      {...props}
    >
      <path
        fill="currentColor"
        d="M1248 0q119 0 203.5 84.5T1536 288v960q0 119-84.5 203.5T1248 1536h-188V941h199l30-232h-229V561q0-56 23.5-84t91.5-28l122-1V241q-63-9-178-9q-136 0-217.5 80T820 538vWeMm7E8ytSuG4XdEYq7ufs5Lx2zqXNq-119 0-203.5-84.5T0 1248V288Q0 169 84.5 84.5T288 0z"
      ></path>
    </svg>
  );
};
export const FacebookAnimated = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={4}
      >
        <path
          strokeDasharray={24}
          strokeDashoffset={24}
          d="M17 4L15 4C12.5 4 11 5.5 11 8V20"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.4s"
            values="24;0"
          ></animate>
        </path>
        <path strokeDasharray={12} strokeDashoffset={12} d="M8 12H15">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.5s"
            dur="0.2s"
            values="12;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
};
export const YoutubeAnimated = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillOpacity={0}
        stroke="currentColor"
        strokeDasharray={60}
        strokeDashoffset={60}
        strokeLinecap="round"
        strokeWidth={2}
        d="M12 5C21 5 21 5 21 12C21 19 21 19 12 19C3 19 3 19 3 12C3 5 3 5 12 5z"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.6s"
          values="60;0"
        ></animate>
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="0.6s"
          dur="0.15s"
          values="0;0.3"
        ></animate>
      </path>
      <path fill="currentColor" fillOpacity={0} d="M10 8.5L16 12L10 15.5z">
        <set attributeName="fill-opacity" begin="0.8s" to={1}></set>
        <animate
          fill="freeze"
          attributeName="d"
          begin="0.8s"
          dur="0.2s"
          values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z"
        ></animate>
      </path>
    </svg>
  );
};
export const InstagramAnimated = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={66}
          strokeDashoffset={66}
          d="M12 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="66;132"
          ></animate>
        </path>
        <path
          strokeDasharray={26}
          strokeDashoffset={26}
          d="M12 8C14.20914 8 16 9.79086 16 12C16 14.20914 14.20914 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.4s"
            values="26;0"
          ></animate>
        </path>
      </g>
      <circle cx={17} cy={7} r={1.5} fill="currentColor" fillOpacity={0}>
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="1.1s"
          dur="0.4s"
          values="0;1"
        ></animate>
      </circle>
    </svg>
  );
};

export const HeartDuotone = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <g fill="currentColor">
        <path
          d="M232 102c0 66-104 122-104 122S24 168 24 102a54 54 0 0 1 54-54c22.59 0 41.94 12.31 50 32c8.06-19.69 27.41-32 50-32a54 54 0 0 1 54 54"
          opacity={0.2}
        ></path>
        <path d="M178 40c-20.65 0-38.73 8.88-50 23.89C116.73 48.88 98.65 40 78 40a62.07 62.07 0 0 0-62 62c0 70 103.79 126.66 108.21 129a8 8 0 0 0 7.58 0C136.21 228.66 240 172 240 102a62.07 62.07 0 0 0-62-62m-50 174.8c-18.26-10.64-96-59.11-96-112.8a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8"></path>
      </g>
    </svg>
  );
};

export const ShareArrowDuotone = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <defs>
        <mask id="ipTShareTwo0">
          <path
            fill="#555"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="m26 4l18 18l-18 17V28C12 28 6 43 6 43c0-17 5-28 20-28z"
          ></path>
        </mask>
      </defs>
      <path
        fill="currentColor"
        d="M0 0h48v48H0z"
        mask="url(#ipTShareTwo0)"
      ></path>
    </svg>
  );
};

export const PrinterDuotone = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="currentColor" d="M8 5h8v3H8z" opacity={0.3}></path>
      <circle cx={18} cy={11.5} r={1} fill="currentColor"></circle>
      <path
        fill="currentColor"
        d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3M8 5h8v3H8zm8 14H8v-4h8zm4-4h-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1z"
      ></path>
      <path
        fill="currentColor"
        d="M6 13h12v2h2v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4h2zm12-2.5c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1"
        opacity={0.3}
      ></path>
    </svg>
  );
};

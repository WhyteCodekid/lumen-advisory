import { useNavigate } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate("/public");
    }, 1500);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <AnimatePresence>
      <motion.div className="h-screen w-full flex items-center justify-center flex-col gap-5">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="text-amber-500 text-4xl lg:text-7xl"
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: "timing", duration: 0.5 }}
        >
          <rect width={10} height={10} x={1} y={1} fill="currentColor" rx={1}>
            <animate
              id="svgSpinnersBlocksShuffle30"
              fill="freeze"
              attributeName="x"
              begin="0;svgSpinnersBlocksShuffle3b.end"
              dur="0.2s"
              values="1;13"
            ></animate>
            <animate
              id="svgSpinnersBlocksShuffle31"
              fill="freeze"
              attributeName="y"
              begin="svgSpinnersBlocksShuffle38.end"
              dur="0.2s"
              values="1;13"
            ></animate>
            <animate
              id="svgSpinnersBlocksShuffle32"
              fill="freeze"
              attributeName="x"
              begin="svgSpinnersBlocksShuffle39.end"
              dur="0.2s"
              values="13;1"
            ></animate>
            <animate
              id="svgSpinnersBlocksShuffle33"
              fill="freeze"
              attributeName="y"
              begin="svgSpinnersBlocksShuffle3a.end"
              dur="0.2s"
              values="13;1"
            ></animate>
          </rect>
          <rect width={10} height={10} x={1} y={13} fill="currentColor" rx={1}>
            <animate
              id="svgSpinnersBlocksShuffle34"
              fill="freeze"
              attributeName="y"
              begin="svgSpinnersBlocksShuffle30.end"
              dur="0.2s"
              values="13;1"
            ></animate>
            <animate
              id="svgSpinnersBlocksShuffle35"
              fill="freeze"
              attributeName="x"
              begin="svgSpinnersBlocksShuffle31.end"
              dur="0.2s"
              values="1;13"
            ></animate>
            <animate
              id="svgSpinnersBlocksShuffle36"
              fill="freeze"
              attributeName="y"
              begin="svgSpinnersBlocksShuffle32.end"
              dur="0.2s"
              values="1;13"
            ></animate>
            <animate
              id="svgSpinnersBlocksShuffle37"
              fill="freeze"
              attributeName="x"
              begin="svgSpinnersBlocksShuffle33.end"
              dur="0.2s"
              values="13;1"
            ></animate>
          </rect>
          <rect width={10} height={10} x={13} y={13} fill="currentColor" rx={1}>
            <animate
              id="svgSpinnersBlocksShuffle38"
              fill="freeze"
              attributeName="x"
              begin="svgSpinnersBlocksShuffle34.end"
              dur="0.2s"
              values="13;1"
            ></animate>
            <animate
              id="svgSpinnersBlocksShuffle39"
              fill="freeze"
              attributeName="y"
              begin="svgSpinnersBlocksShuffle35.end"
              dur="0.2s"
              values="13;1"
            ></animate>
            <animate
              id="svgSpinnersBlocksShuffle3a"
              fill="freeze"
              attributeName="x"
              begin="svgSpinnersBlocksShuffle36.end"
              dur="0.2s"
              values="1;13"
            ></animate>
            <animate
              id="svgSpinnersBlocksShuffle3b"
              fill="freeze"
              attributeName="y"
              begin="svgSpinnersBlocksShuffle37.end"
              dur="0.2s"
              values="1;13"
            ></animate>
          </rect>
        </motion.svg>

        {/* logo */}
        <motion.img
          src="https://lumen-advisory.com/wp-content/uploads/2024/07/Asset-19-2048x394.png"
          alt="logo"
          className="w-36 md:w-60 rounded-xl h-auto dark:bg-white px-4 py-2"
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5, type: "timing", duration: 0.5 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

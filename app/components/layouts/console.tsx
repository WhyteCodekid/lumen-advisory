import { useState, useEffect } from "react";
import Sidebar from "~/components/ui/sidebar";

export default function ConsoleLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [isFrosted, setIsFrosted] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 40) {
        console.log("isFrosted");
        setIsFrosted(true);
      } else {
        console.log("isFrosted");
        setIsFrosted(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen dark:bg-slate-950 bg-slate-300/30 gap-6">
      <Sidebar />

      {/* main page content */}
      <div className="flex-1 flex flex-col pt-2 gap-6 h-screen overflow-y-auto relative">
        <div className="border-b border-white/5 sticky top-0 py-3 flex items-center">
          <h3 className="font-montserrat font-bold text-xl">{title}</h3>
        </div>

        <div className="pr-4 flex-1">{children}</div>
      </div>
    </div>
  );
}

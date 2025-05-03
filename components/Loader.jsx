import React from "react";
import { Loader2 } from "lucide-react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-zinc-400 animate-fade-in">
      <Loader2 className="w-6 h-6 mb-2 animate-spin" />
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default Loader;

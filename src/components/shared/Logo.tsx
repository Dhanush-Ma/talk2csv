import React from "react";
import Talk2CsvLogo from "@/assets/talk2csv.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image priority src={Talk2CsvLogo} alt="talk2csv Logo" />
    </div>
  );
};

export default Logo;

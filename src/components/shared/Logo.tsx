import React from "react";
import Image from "next/image";
import LogoImg from "@/assets/logo.png";

const Logo = () => {
  return (
    <div className="">
      <Image src={LogoImg} alt="Logo" width={100} height={100} />
    </div>
  );
};

export default Logo;

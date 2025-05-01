import React from "react";
import Image from "next/image";
import LogoImg from "@/assets/logo.png";
import LogoTranparentImg from "@/assets/logo-transparent.png";

const Logo = ({
  transparent = false,
  className,
  width = 100,
  height = 100,
}: {
  className?: string;
  width?: number;
  height?: number;
  transparent?: boolean;
}) => {
  const logoSrc = transparent ? LogoTranparentImg : LogoImg;

  return (
    <div>
      <Image
        src={logoSrc}
        alt="Logo"
        width={width}
        height={height}
        className={className}
      />
    </div>
  );
};

export default Logo;

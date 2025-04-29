import { AppConfig } from "@/lib/config";
import React from "react";

const Copyright = () => {
  return (
    <div>
      <p>
        &copy; {new Date().getFullYear()} {AppConfig.name}. All rights reserved.
      </p>
    </div>
  );
};

export default Copyright;

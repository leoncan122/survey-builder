import React from "react";
import dynamic from "next/dynamic";

const CreatorComponent = dynamic(() => import("../components/Creator"), {
  ssr: false,
});

const Creator = () => {
    
  return (
    <div>
      <CreatorComponent />
    </div>
  );
};

export default Creator;

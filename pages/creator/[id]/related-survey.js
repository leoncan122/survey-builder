import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const CreatorComponent = dynamic(() => import("../../../components/CreatorRelated"), {
  ssr: false,
});

const Creator = () => {
const router = useRouter()
    
  return (
    <div>
      <CreatorComponent />
    </div>
  );
};

export default Creator;
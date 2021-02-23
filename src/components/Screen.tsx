import Image from "next/image";
import { memo } from "react";

export const Screen = memo(() => {
  return (
    <div className="bg-black flex p-4">
      <div className="bg-gray-900 flex justify-center items-center rounded-md w-full m-4">
        <Image src="/img/man.png" width="600px" height="400px" loading="lazy" />
      </div>
    </div>
  );
});

Screen.displayName = "Screen";

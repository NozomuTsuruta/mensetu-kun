import Image from "next/image";

export const Screen = () => {
  return (
    <div className="bg-black flex p-4">
      <div className="bg-gray-900 flex justify-center items-center rounded-md w-full m-4">
        <Image src="/img/man.png" width="600px" height="400px" loading="lazy" />
      </div>
    </div>
  );
};

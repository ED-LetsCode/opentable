"use client";
import errorImg from "../../../public/icons/error.png";
import Image from "next/image";

export default function error({ error }: { error: Error }) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorImg} alt="error" className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadow rounded text-center">
        <h3 className="text-3xl font-bold">Well, this is embarassing</h3>
        <p className="text-reg font-bold text-red-600">{error.message}</p>
      </div>
    </div>
  );
}

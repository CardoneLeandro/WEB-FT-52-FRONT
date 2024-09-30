import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import Link from "next/link";

function TeamPage() {
  return (
    <div className="p-2">
      <div>
        <h1>Desarrolladores del proyecto:</h1>

        <h2 className="font-bold">BackEnd</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          reprehenderit modi ducimus dolorum animi! Eum hic vitae deserunt quas
          dignissimos.
        </p>
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row gap-2 items-center ">
            <FaCircleUser className="w-10 h-10" />
            <h3>Lorem, ipsum.</h3>
            <Link href="https://github.com">ver perfil</Link>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <FaCircleUser className="w-10 h-10" />
            <h3>Lorem, ipsum.</h3>
            <Link href="https://github.com">ver perfil</Link>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <FaCircleUser className="w-10 h-10" />
            <h3>Lorem, ipsum.</h3>
            <Link href="https://github.com">ver perfil</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="font-bold">FrontEnd</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          reprehenderit modi ducimus dolorum animi! Eum hic vitae deserunt quas
          dignissimos.
        </p>
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row gap-2 items-center ">
            <FaCircleUser className="w-10 h-10" />
            <h3>Lorem, ipsum.</h3>
            <Link href="https://github.com">ver perfil</Link>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <FaCircleUser className="w-10 h-10" />
            <h3>Lorem, ipsum.</h3>
            <Link href="https://github.com">ver perfil</Link>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <FaCircleUser className="w-10 h-10" />
            <h3>Lorem, ipsum.</h3>
            <Link href="https://github.com">ver perfil</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;

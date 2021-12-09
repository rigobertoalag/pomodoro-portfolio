import { useState } from "react";
import Timer from "./Timer.jsx";
import Modal from "./Modal.jsx";

export default function Root() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-8 sm:w-full md:w-full lg:full flex flex-col items-center">
      <p className="font-bold text-3xl md:text-5xl ">Técnica pomodoro</p>
      <Timer />
      <button
        className="mb-4 text-blue-600 ring-2 p-2 text-sm rounded-lg shadow-md"
        onClick={() => setOpen(true)}
      >
        Mas información de Pomodoro
      </button>
      {open ? <Modal /> : null}
      <footer className="footer bg-white relative border-b-2 border-red-700 w-full">
        <div className="bg-red-500 w-full flex flex-row justify-center items-center py-2">
          <p className="text-white font-light text-sm">
            Coded by Rigoberto Alcantar
          </p>
        </div>
      </footer>
    </div>
  );
}

import { useState, useEffect } from "react";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Timer = () => {
  const [[minutes, seconds], setTime] = useState([24, 0]);
  const [isFocus, setIsFocus] = useState(true);
  const [begin, setBegin] = useState(false);
  const [pause, setPause] = useState(false);
  const [resume, setResume] = useState(false);
  const [isTest, setIsTest] = useState(false);

  const focusTime = () => {
    if (minutes === 0 && seconds === 0) {
      setTime([parseInt(5), parseInt(0)]);
      setIsFocus(false);
      setBegin(false);
    } else if (seconds === 0) {
      setTime([minutes - 1, 59]);
    } else {
      setTime([minutes, seconds - 1]);
    }
  };

  const breakTime = () => {
    if (minutes === 0 && seconds === 0) {
      setTime([parseInt(24), parseInt(0)]);
      setIsFocus(true);
      setBegin(false);
    } else if (seconds === 0) {
      setTime([minutes - 1, 59]);
    } else {
      setTime([minutes, seconds - 1]);
    }
  };

  const pauseTime = () => {
    setTime([parseInt(minutes), parseInt(seconds)]);
    setPause(true);
    setResume(true);
  };

  const resetTime = () => {
    setTime([parseInt(24), parseInt(0)]);
    setPause(false);
    setResume(false);
    setBegin(false);
  };

  const resumeTime = () => {
    setPause(false);
    setResume(false);
    setBegin(true);
  };

  const testTime = (i) => {
    if (i) {
      setTime([parseInt(0), parseInt(10)]);
      setIsTest(true);
      setIsFocus(true);
    } else {
      setTime([parseInt(24), parseInt(0)]);
      setIsTest(false);
      setIsFocus(false);
    }
  };

  useEffect(() => {
    if (pause) {
      const timerId = setInterval(() => pauseTime(), 1000);
      return () => clearInterval(timerId);
    } else {
      if (begin) {
        if (isFocus) {
          const timerId = setInterval(() => focusTime(), 1000);
          return () => clearInterval(timerId);
        } else {
          const timerId = setInterval(() => breakTime(), 1000);
          return () => clearInterval(timerId);
        }
      } else {
      }
    }
  });

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {begin ? (
        isFocus ? (
          <p className="text-xl text-red-500 font-bold">¡Tiempo de concentracion!</p>
        ) : (
          <p className="text-xl text-green-500 font-bold">Toma un respiro</p>
        )
      ) : null}
      <p className="text-8xl font-semibold">
        {minutes.toString().padStart(2, "0")} :{" "}
        {seconds.toString().padStart(2, "0")}
      </p>
      {isTest ? (
        <p className="text-sm font-extralight text-gray-500">
          Tiempo de prueba
        </p>
      ) : null}
      {!begin ? (
        <button
          className="bg-green-500 py-4 px-6 mt-10 text-white text-xl rounded-xl flex flex-row shadow-md"
          onClick={() => setBegin(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Iniciar
        </button>
      ) : !resume ? (
        <button
          className="bg-yellow-400 py-4 px-6 mt-10 text-black text-xl rounded-xl flex flex-row shadow-md"
          onClick={() => pauseTime()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Pausar
        </button>
      ) : (
        <div className="flex flex-row ">
          <button
            className="bg-green-300 py-5 px-4 mt-10 mr-4 text-black text-xl rounded-xl flex flex-row shadow-md"
            onClick={() => resumeTime()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Continuar
          </button>
          <button
            className="bg-red-500 py-5 px-4 mt-10 text-black text-xl rounded-xl flex flex-row shadow-md"
            onClick={() => resetTime()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
              />
            </svg>
            Reiniciar
          </button>
        </div>
      )}

      <Menu as="div" className="relative inline-block text-left mt-4 shadow-md">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Opciones
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => testTime(false)}
                  >
                    <p>Tiempo regular</p>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => testTime(true)}
                  >
                    <p>Tiempo de prueba</p>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Timer;

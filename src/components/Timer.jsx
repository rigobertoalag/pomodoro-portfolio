import { useState, useEffect } from "react";

const Timer = () => {
  const [[minutes, seconds], setTime] = useState([24, 0]);
  const [isFocus, setIsFocus] = useState(true);
  const [begin, setBegin] = useState(false);
  const [pause, setPause] = useState(false);
  const [resume, setResume] = useState(false);

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
    setPause(true)
    setResume(true)
  };

  const resetTime = () =>{
    setTime([parseInt(24), parseInt(0)]);
    setPause(false)
    setResume(false)
    setBegin(false)
  }

  const resumeTime = () =>{
    setPause(false)
    setResume(false)
    setBegin(true)
  }

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
      <p className="text-8xl font-semibold">
        {minutes.toString().padStart(2, "0")} :{" "}
        {seconds.toString().padStart(2, "0")}
      </p>
      {!begin ? (
        <button
          className="bg-green-500 py-4 px-6 mt-10 text-white text-xl rounded-xl flex flex-row"
          onClick={() => setBegin(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Inicar
        </button>
      ) : !resume ? (
        <button
          className="bg-yellow-400 py-4 px-6 mt-10 text-black text-xl rounded-xl flex flex-row"
          onClick={() => pauseTime()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Pausar
        </button>
      ) : (
        <div className="flex flex-row ">
          <button
            className="bg-green-300 py-5 px-4 mt-10 mr-4 text-black text-xl rounded-xl flex flex-row"
            onClick={() => resumeTime()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Continuar
          </button>
          <button
            className="bg-red-500 py-5 px-4 mt-10 text-black text-xl rounded-xl flex flex-row"
            onClick={() => resetTime()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
            Reiniciar
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;

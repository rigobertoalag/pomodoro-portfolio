import { useState, useEffect } from "react";

const Timer = () => {
  const [[minutes, seconds], setTime] = useState([0, 10]);
  const [isFocus, setIsFocus] = useState(true);
  const [begin, setBegin] = useState(false);
  const [pause, setPause] = useState(false);
  const [resume, setResume] = useState(false);

  const focusTime = () => {
    if (minutes === 0 && seconds === 0) {
      setTime([parseInt(0), parseInt(5)]);
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
      setTime([parseInt(0), parseInt(10)]);
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
        console.log("no ha iniciado");
      }
    }
  });

  return (
    <div>
      <p>
        {minutes.toString().padStart(2, "0")} :{" "}
        {seconds.toString().padStart(2, "0")}
      </p>
      {!begin ? (
        <button onClick={() => setBegin(true)}>Inicar</button>
      ) : !resume ? (
        <button onClick={() => (setPause(true), setResume(true))}>
          Pausar
        </button>
      ) : (
        <button
          onClick={() => (setPause(false), setResume(false), setBegin(true))}
        >
          Resume
        </button>
      )}
    </div>
  );
};

export default Timer;

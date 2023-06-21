import styles from "@/styles/Pomo.module.css";
import { HiPlay, HiPause } from "react-icons/hi";
import { useState, useEffect, useRef, useContext } from "react";
import { TaskContext } from "@/pages/_app";
export default function Timer(props) {
  const { timerSettings, action, activeTask } = useContext(TaskContext);
  const [seconds, setSeconds] = useState(props.time);
  let [pause, setPause] = useState(true);
  useEffect(() => {
    setSeconds(props.time);
  }, [props.time]);
  useEffect(() => {
    let interval;
    if (!pause) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds < 1 || pause) {
            if (prevSeconds < 1) {
              console.log("triggered");
              props.increment();
            }
            clearInterval(interval);
            return prevSeconds;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [pause]);

  return (
    <div>
      <h1>
        {Math.floor(seconds / 60) < 10
          ? `0${Math.floor(seconds / 60)}`
          : Math.floor(seconds / 60)}
        :{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </h1>
      <button
        disabled={seconds === 0 || activeTask === -1}
        onClick={() => setPause((prev) => !prev)}
      >
        {pause ? <HiPlay /> : <HiPause />}
      </button>
    </div>
  );
}

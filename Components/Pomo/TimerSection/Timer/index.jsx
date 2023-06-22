import styles from "@/styles/Pomo.module.css";
import { HiPlay, HiPause } from "react-icons/hi";
import { AiOutlineReload, AiFillCloseCircle } from "react-icons/ai";
import { useState, useEffect, useRef, useContext } from "react";
import { TaskContext } from "@/pages/_app";

export default function Timer(props) {
  const { timerSettings, action, activeTask } = useContext(TaskContext);
  const [seconds, setSeconds] = useState(props.time.time);
  let [pause, setPause] = useState(true);

  useEffect(() => {
    setSeconds(props.time.time);
    setPause(true);
  }, [props.time.time, props.time.section]);

  useEffect(() => {
    let interval;

    if (!pause) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1 || pause) {
            if (prevSeconds === 1) {
              props.increment();
            }
            clearInterval(interval);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [pause]);

  const buttonDisabled = seconds === 0 || activeTask === -1;
  const buttonColor = seconds === 0 || activeTask === -1 ? "#ccc" : "#f5ba13";

  return (
    <div>
      <h1>
        {Math.floor(seconds / 60) < 10
          ? `0${Math.floor(seconds / 60)}`
          : Math.floor(seconds / 60)}
        :{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </h1>
      <div className={styles.buttonsection}>
        <button
          onClick={() => action.setActiveTask(-1)}
          disabled={activeTask === -1}
          style={{ color: activeTask === -1 ? "#ccc" : "#f5ba13" }}
        >
          <AiFillCloseCircle />
        </button>
        <button
          disabled={buttonDisabled}
          onClick={() => setPause((prev) => !prev)}
          style={{ color: buttonColor }}
        >
          {pause ? <HiPlay /> : seconds === 0 ? <HiPlay /> : <HiPause />}
        </button>
        <button
          onClick={() => {
            setSeconds(props.time.time);
            setPause(true);
          }}
          disabled={activeTask === -1}
          style={{ color: activeTask === -1 ? "#ccc" : "#f5ba13" }}
        >
          <AiOutlineReload />
        </button>
      </div>
    </div>
  );
}

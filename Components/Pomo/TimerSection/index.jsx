import Timer from "./Timer";
import styles from "@/styles/Pomo.module.css";
import { useState, useContext } from "react";
import { TaskContext } from "@/pages/_app";
export default function TimerSection() {
  const { timerSettings, action } = useContext(TaskContext);
  const [activeButton, setActiveButton] = useState("pomodoro");
  let time;
  for (let i in timerSettings) {
    if (timerSettings[i].active) time = timerSettings[i]["time"];
  }
  const increment = () => {
    if (activeButton === "pomodoro") action.incrementTomato();
  };
  const handleClick = (e) => {
    e.preventDefault();
    setActiveButton(e.target.value);
    action.updateTimerStatus(e.target.value);
  };
  return (
    <div className={styles.timer}>
      <div className={styles.timernavbar}>
        <button
          onClick={handleClick}
          value="pomodoro"
          className={
            activeButton === "pomodoro"
              ? styles.activebutton
              : styles.inactivebutton
          }
        >
          Pomodoro
        </button>
        <button
          onClick={handleClick}
          value="shortBreak"
          className={
            activeButton === "shortBreak"
              ? styles.activebutton
              : styles.inactivebutton
          }
        >
          Short Break
        </button>
        <button
          onClick={handleClick}
          value="longBreak"
          className={
            activeButton === "longBreak"
              ? styles.activebutton
              : styles.inactivebutton
          }
        >
          Long Break
        </button>
      </div>
      <Timer
        time={{ time: time, section: activeButton }}
        increment={increment}
      />
    </div>
  );
}

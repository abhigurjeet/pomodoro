import Timer from "./Timer";
import styles from "@/styles/Pomo.module.css";
import { useState, useContext } from "react";
import { TaskContext } from "@/pages/_app";
export default function TimerSection() {
  const { timerSettings, action } = useContext(TaskContext);
  const [activeButton, setActiveButton] = useState("pomodoro");
  console.log("rendered Timer section");
  let time;
  for (let i in timerSettings) {
    if (timerSettings[i].active) time = timerSettings[i]["time"];
  }
  const increment = () => {
    action.incrementTomato();
  };
  const handleClick = (e) => {
    e.preventDefault();
    action.updateTimerStatus(e.target.value);
    setActiveButton(e.target.value);
  };
  return (
    <div className={styles.timer}>
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
      <Timer time={time} increment={increment} />
    </div>
  );
}

import "@/styles/globals.css";
import React from "react";
import { useState } from "react";
export const TaskContext = React.createContext();

export default function App({ Component, pageProps }) {
  const [taskData, setTaskData] = useState({
    taskList: [
      {
        title: "1st Task",
        description: "You wanna give up give up",
        dueDate: "2023-06-22",
        estTomato: 2312,
        tomato: 0,
        createDate: new Date("01-02-1998"),
        completedOn: new Date("06-18-2023"),
        taskStatus: "Completed",
      },
      {
        title: "2nd Task",
        description: "why tap go sleep",
        dueDate: "2023-06-22",
        estTomato: 23123,
        tomato: 0,
        createDate: new Date("01-02-1998"),
        completedOn: new Date("06-18-2023"),
        taskStatus: "Completed",
      },
    ],
    todayTomato: {
      count: 0,
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
    },
    weeklyTomato: [0, 0, 0, 0, 0, 3, 0],
    activeTask: -1,
    filters: {
      taskStat: "",
      sortdate: "",
      sortday: "",
    },
    timerSettings: {
      pomodoro: { time: 25 * 60, completed: false, active: true },
      shortBreak: { time: 5 * 60, completed: false, active: false },
      longBreak: { time: 15 * 60, completed: false, active: false },
    },
    action: {
      addtask: (item) => {
        setTaskData((prev) => ({
          ...prev,
          taskList: [...prev.taskList, item],
        }));
      },
      setActiveTask: (i, status) => {
        setTaskData((prev) => {
          let temp = [...prev.taskList];
          if (status === "Completed") {
            temp[prev.activeTask].taskStatus = "Completed";
            temp[prev.activeTask].completedOn = new Date();
            return { ...prev, activeTask: i };
          }
          if (i === -1) {
            if (prev.activeTask !== -1) {
              temp[prev.activeTask].taskStatus = "Not started";
            }
            return { ...prev, activeTask: i };
          }
          if (temp[i].taskStatus === "Not started")
            temp[i].taskStatus = "Started";
          else temp[i].taskStatus = "Not started";
          if (prev.activeTask !== -1) {
            temp[prev.activeTask].taskStatus = "Not started";
          }
          return { ...prev, activeTask: i };
        });
      },
      deleteTask: (i) => {
        setTaskData((prev) => {
          let temp = [...prev.taskList];
          temp.splice(i, 1);
          return { ...prev, taskList: temp };
        });
      },
      modifyFilter: (filterSettings) => {
        setTaskData((prev) => ({ ...prev, filters: filterSettings }));
      },
      incrementTomato: () => {
        setTaskData((prev) => {
          let diff = Math.floor(
            (new Date() - prev.todayTomato.date) / (24 * 60 * 60 * 1000)
          );
          let temp = [...prev.taskList],
            temp2 = { ...prev.todayTomato },
            temp3 = [...prev.weeklyTomato];
          if (diff === 0) {
            temp2.count = temp2.count + 1;
            temp3[0] = temp3[0] + 1;
          } else {
            temp2.date = new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate()
            );
            temp3.splice(6, 1);
            temp3.unshift(1);
            temp2.count = 1;
          }
          temp[prev.activeTask].tomato = temp[prev.activeTask].tomato + 1;
          return {
            ...prev,
            taskList: temp,
            todayTomato: temp2,
            weeklyTomato: temp3,
          };
        });
      },
      updateTimerStatus: (val) => {
        setTaskData((prev) => {
          let temp = JSON.parse(JSON.stringify(prev.timerSettings));
          temp.pomodoro.active = false;
          temp.shortBreak.active = false;
          temp.longBreak.active = false;
          val === "pomodoro"
            ? (temp.pomodoro.active = true)
            : val === "shortBreak"
            ? (temp.shortBreak.active = true)
            : (temp.longBreak.active = true);
          return { ...prev, timerSettings: temp };
        });
      },
    },
  });
  return (
    <TaskContext.Provider value={taskData}>
      <Component {...pageProps} />
    </TaskContext.Provider>
  );
}

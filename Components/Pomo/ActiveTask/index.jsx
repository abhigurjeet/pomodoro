import { useState, useContext } from "react";
import Link from "next/link";
import { TaskContext } from "@/pages/_app";
import { HiCheckCircle } from "react-icons/hi";
import styles from "@/styles/Pomo.module.css";
export default function ActiveTask() {
  const { activeTask, taskList, action } = useContext(TaskContext);
  const handleSubmit = (e) => {
    action.setActiveTask(-1, "Completed");
  };
  return (
    <div className={styles.taskitem}>
      {activeTask === -1 ? (
        <h1>Add a task to start Timer</h1>
      ) : (
        <>
          <div>
            <strong>{taskList[activeTask].title}</strong>
            <p>{taskList[activeTask].description}</p>
            <span>Due Date: {taskList[activeTask].dueDate}</span>
          </div>
          <div>
            <span>Tomato: {taskList[activeTask].tomato}</span>
            <Link href="/task">
              <button type="submit" onClick={handleSubmit}>
                <HiCheckCircle />
                Mark as Completed
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

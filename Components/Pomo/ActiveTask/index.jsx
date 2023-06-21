import { useState, useContext } from "react";
import Link from "next/link";
import { TaskContext } from "@/pages/_app";
import { HiCheckCircle } from "react-icons/hi";
import styles from "@/styles/Pomo.module.css";
export default function ActiveTask() {
  const { activeTask, taskList, action } = useContext(TaskContext);
  const [taskActive, setTaskActive] = useState(activeTask === -1);
  const handleSubmit = (e) => {
    action.setActiveTask(-1, "Completed");
    setTaskActive(-1);
  };
  return (
    <div className={styles.taskitem}>
      {taskActive ? (
        <h1>Add a task to start Timer</h1>
      ) : (
        <>
          <div>
            <strong>{taskList[activeTask].title}</strong>
            <p>{taskList[activeTask].description}</p>
            <span>Due Date: {taskList[activeTask].dueDate}</span>
          </div>
          <div>
            <p>Tomato: {taskList[activeTask].tomato}</p>
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

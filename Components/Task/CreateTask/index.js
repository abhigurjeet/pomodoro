import styles from "@/styles/Task.module.css";
import { useState, useContext } from "react";
import { TaskContext } from "@/pages/_app";
export default function CreateTask() {
  const { action } = useContext(TaskContext);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    dueDate: "",
    estTomato: "",
    tomato: 0,
    createDate: new Date(),
    completedOn: "",
    taskStatus: "Not started",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    action.addtask(taskDetails);
    setTaskDetails({
      title: "",
      description: "",
      dueDate: "",
      estTomato: "",
      tomato: 0,
      createDate: new Date(),
      completedOn: "",
      taskStatus: "Not started",
    });
  };
  const handleDetail = (e) => {
    switch (e.target.name) {
      case "title":
        setTaskDetails((prev) => {
          return { ...prev, title: e.target.value };
        });
        break;
      case "description":
        setTaskDetails((prev) => {
          return { ...prev, description: e.target.value };
        });
        break;
      case "dueDate":
        setTaskDetails((prev) => {
          return { ...prev, dueDate: e.target.value };
        });
        break;
      case "estTomato":
        setTaskDetails((prev) => {
          return { ...prev, estTomato: e.target.value };
        });
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.createtask}>
      <form>
        <input
          type="text"
          onChange={handleDetail}
          placeholder="Title"
          name="title"
          value={taskDetails.title}
        />
        <br />
        <input
          className={styles.description}
          type="text"
          onChange={handleDetail}
          placeholder="Description"
          name="description"
          value={taskDetails.description}
        />
        <br />
        <input
          type="date"
          onChange={handleDetail}
          name="dueDate"
          value={taskDetails.dueDate}
        />
        <br />
        <input
          type="number"
          onChange={handleDetail}
          name="estTomato"
          value={taskDetails.estTomato}
          placeholder="Est. tomatoes required"
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Create <br />
          task
        </button>
      </form>
    </div>
  );
}

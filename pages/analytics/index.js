import Navbar from "@/Components/NavBar/index";
import BarChart from "@/Components/Analytics/BarChart";
import Stats from "@/Components/Analytics/Stats";
import styles from "@/styles/Analytics.module.css";
export default function Analytics() {
  return (
    <div>
      <Navbar />
      <div className={styles.analytics}>
        <Stats />
        <BarChart />
      </div>
    </div>
  );
}

import Navbar from "@/Components/NavBar/index";
import TimerSection from "@/Components/Pomo/TimerSection";
import ActiveTask from "@/Components/Pomo/ActiveTask";
export default function Pomo() {
  console.log("rendered POMO");
  return (
    <div>
      <Navbar />
      <TimerSection />
      <ActiveTask />
    </div>
  );
}

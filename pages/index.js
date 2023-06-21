import Link from "next/link";
import Navbar from "../Components/NavBar/index";
export default function Home() {
  const logIdentifier = Math.random().toString(36).substring(7); // Generate a random identifier

  console.log(`rendered HOME (${logIdentifier})`); // Log the message with the unique identifier

  return (
    <div>
      <Navbar />
    </div>
  );
}

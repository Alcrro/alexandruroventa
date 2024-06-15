import AboutMe from "../components/home/aboutMe/AboutMe";
import Profile from "../components/home/profile/Profile";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div className="main">
      <Profile />
      <AboutMe />
    </div>
  );
}

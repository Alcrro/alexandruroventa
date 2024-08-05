import AboutMe from "../components/home/aboutMe/AboutMe";
import Profile from "../components/home/profile/Profile";

export default function Home() {
  return (
    <div className="main">
      <Profile />
      <AboutMe />
    </div>
  );
}

// import PageNav from "../components/PageNav";
import Sidebar from "../components/Sidebar";
import style from "./AppLayout.module.css";
import Map from "../components/Map";

export default function AppLayout() {
  return (
    <div className={style.app}>
      {/* <PageNav /> */}
      <Sidebar />
      <Map />
    </div>
  );
}

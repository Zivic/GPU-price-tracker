import CardList from "@/components/CardList";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Browse() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex justify-center px-40">
          {/* <h1>Browse window</h1> */}
          <CardList />
        </div>
      </div>
    </div>
  );
}

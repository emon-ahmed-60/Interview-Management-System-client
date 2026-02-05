import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Dashboard />
      </main>
      <Footer />
      <ToastContainer/>
    </div>
  );
}

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ApplicantForm from "./components/ApplicantForm";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="p-6 max-w-6xl mx-auto">
        <ApplicantForm/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

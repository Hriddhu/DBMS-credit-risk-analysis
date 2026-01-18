import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}
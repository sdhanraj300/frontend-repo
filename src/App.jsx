import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import img from "./assets/bg.png";
function App() {
  return (
    <div className="" style={{ backgroundImage: `url(${img})` }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

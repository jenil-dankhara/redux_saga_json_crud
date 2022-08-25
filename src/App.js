import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/addUser" element={<AddEditUser />} />
          <Route path="/editUser/:id" element={<AddEditUser />} />
          <Route path="/userInfo/:id" element={<UserInfo />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

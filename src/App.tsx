import './App.css';
import Login from './app/page/login/login';
import Home from './app/page/home/home';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

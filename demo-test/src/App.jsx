import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Admin from './Admin';
import UserDetailPage from "./UserDetailPage";
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="App">
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
          {/* Вы можете добавить домашнюю страницу, если нужно */}
          <Route path="/" element={<Login />} />
          <Route path="/user/:userEmail" element={<UserDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

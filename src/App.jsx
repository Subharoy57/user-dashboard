import React from "react"; 
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import AddUser from "./pages/AddUser";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="container header-inner">
          <h2 className="brand">User Dashboard</h2>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/add" className="btn btn-primary">Add User</Link>
          </nav>
        </div>
      </header>

      <main className="container main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/add" element={<AddUser />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
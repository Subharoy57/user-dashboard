import React from "react"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddUser.css";

function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    const newUser = { ...form, _id: Date.now().toString() };
    const existing = JSON.parse(localStorage.getItem("newUsers") || "[]");
    existing.unshift(newUser);
    localStorage.setItem("newUsers", JSON.stringify(existing));

    navigate("/");
  }

  return (
    <div className="form-wrap">
      <div className="form-card">
        <h3>Add New User</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <div style={{ textAlign: "right", marginTop: 10 }}>
            <button type="submit" className="btn-primary">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
import React from "react"; 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../services/api";
import "./Home.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [addedUsers, setAddedUsers] = useState(
    JSON.parse(localStorage.getItem("newUsers") || "[]")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (e) {
        console.error("Error fetching users", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const allUsers = [...addedUsers, ...users];

  const filtered = allUsers.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="search-row">
        <input
          className="input-search"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="muted">Loading users...</p>
      ) : (
        <>
          {filtered.length === 0 ? (
            <p className="muted">No users found.</p>
          ) : (
            <div className="grid-cards">
              {filtered.map((user) => (
                <div key={user.id || user._id} className="card">
                  <h4 className="card-title">{user.name}</h4>
                  <p className="card-sub">{user.email}</p>
                  <p className="card-sub">{user.phone}</p>
                  <p className="card-sub">{user.company?.name || user.company}</p>
                  <Link to={`/user/${user.id || user._id}`} className="link-details">View Details →</Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
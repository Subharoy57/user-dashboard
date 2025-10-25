import React from "react"; 
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../services/api";
import "./UserDetails.css";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [addedUsers] = useState(
    JSON.parse(localStorage.getItem("newUsers") || "[]")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUser = addedUsers.find(
      (u) => String(u._id) === id || String(u.id) === id
    );
    if (localUser) {
      setUser(localUser);
      setLoading(false);
      return;
    }

    async function loadUser() {
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (e) {
        console.error("Error loading user", e);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [id]);

  if (loading) return <p className="muted">Loading details...</p>;
  if (!user) return <p className="muted">User not found.</p>;

  return (
    <div className="detail-card">
      <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="detail-name">{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company?.name || user.company}</p>

      {user.address && (
        <div className="address">
          <h4>Address</h4>
          <p>{user.address.street}, {user.address.city} - {user.address.zipcode}</p>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
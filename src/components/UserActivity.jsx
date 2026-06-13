import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

export default function UserActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    const fetchActivity = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/activity`, {
          headers: { Authorization: token }
        });

        setActivities(res.data);
      } catch (err) {
        console.error("Error fetching activity:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, []);

  if (loading) return <p>Loading your activity...</p>;

  return (
    <div>
      <h2>Your Login/Logout Activity</h2>
      {activities.length === 0 ? (
        <p>No activity found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a) => {
              const isOffline = !a.isOnline; // if false → offline
              return (
                <tr key={a._id}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{new Date(a.lastLogin).toLocaleString()}</td>
                  <td>{a.lastLogout ? new Date(a.lastLogout).toLocaleString() : "-"}</td>
                  <td>{isOffline ? "❌ Offline" : "✅ Online"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

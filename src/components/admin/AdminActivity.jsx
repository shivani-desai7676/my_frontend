import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../config";

export default function AdminActivity({ type }) {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {

    try {

      const url =
        type === "history"
          ? `${API_URL}/api/admin/activity/history`
          : `${API_URL}/api/admin/activity/status`;

      const res = await axios.get(url);

      setData(res.data);

    } catch (err) {
      console.error("Error fetching activity:", err);
    }

  };


  const searchUsers = async (value) => {

    setSearch(value);

    if (value.length === 0) {
      setSuggestions([]);
      return;
    }

    try {

      const res = await axios.get(
        `${API_URL}/api/admin/search-users?q=${value}`
      );

      setSuggestions(res.data);

    } catch (err) {
      console.error("Search error:", err);
    }

  };

  // FILTER DATA AFTER SELECTING USER
  const filteredData = search
    ? data.filter((item) =>
        item.email.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <div>

      {/* SEARCH BAR */}
      <div style={{ marginBottom: "20px", position: "relative" }}>

        <input
          type="text"
          placeholder="Search user email..."
          value={search}
          onChange={(e) => searchUsers(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        {/* SUGGESTIONS */}
        {suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              background: "white",
              border: "1px solid #ccc",
              width: "300px",
              borderRadius: "6px",
              marginTop: "5px",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 10
            }}
          >

            {suggestions.map((user, index) => (

              <div
                key={index}
                onClick={() => {
                  setSearch(user.email);
                  setSuggestions([]);
                }}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee"
                }}
              >
                {user.email}
              </div>

            ))}

          </div>
        )}

      </div>

      {/* TABLE */}

      {filteredData.length === 0 ? (
        <p style={{ textAlign: "center" }}>No activity found</p>
      ) : (
        <table style={table}>

          <thead>
            <tr>
              <th>Email</th>
              {type === "history" && <th>Login Time</th>}
              {type === "history" && <th>Logout Time</th>}
              {type === "status" && <th>Status</th>}
            </tr>
          </thead>

          <tbody>

            {filteredData.map((item, i) => (

              <tr key={i}>

                <td>{item.email}</td>

                {type === "history" && (
                  <>
                    <td>{new Date(item.loginTime).toLocaleString()}</td>

                    <td>
                      {item.logoutTime
                        ? new Date(item.logoutTime).toLocaleString()
                        : "Still Online"}
                    </td>
                  </>
                )}

                {type === "status" && (

                  <td>
                    <span
                      style={{
                        color: item.isOnline ? "green" : "red",
                        fontWeight: "bold"
                      }}
                    >
                      {item.isOnline ? "● Online" : "● Offline"}
                    </span>
                  </td>

                )}

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white"
};

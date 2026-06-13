import { useEffect, useState } from "react";
import API_URL from "../../config";
export default function AdminFeedback() {

  const [feedback, setFeedback] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/api/admin/feedback`)
      .then(res => res.json())
      .then(data => setFeedback(data))
      .catch(err => console.log(err));

  }, []);

  return (

    <div>

      <h2>User Feedback</h2>

      {feedback.length === 0 ? (
        <p>No feedback available</p>
      ) : (

        <table style={{width:"100%",borderCollapse:"collapse"}}>

          <thead>

            <tr>
              <th style={th}>Username</th>
              <th style={th}>Email</th>
              <th style={th}>Rating</th>
              <th style={th}>Message</th>
            </tr>

          </thead>

          <tbody>

            {feedback.map((f,i)=>(
              <tr key={i}>
                <td style={td}>{f.username}</td>
                <td style={td}>{f.email}</td>
                <td style={td}>⭐ {f.rating}</td>
                <td style={td}>{f.message}</td>
              </tr>
            ))}

          </tbody>

        </table>

      )}

    </div>

  );
}

const th={
  border:"1px solid #ddd",
  padding:"10px",
  background:"#3b82f6",
  color:"white"
}

const td={
  border:"1px solid #ddd",
  padding:"10px"
}

import { useEffect, useState } from "react";
import API_URL from "../../config";
export default function AdminUserLinks() {

  const [links, setLinks] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/api/files/admin/share-links`)
      .then(res => res.json())
      .then(data => setLinks(data))
      .catch(err => {
        console.error(err);
        alert("Failed to load links");
      });

  }, []);

  return (
    <div>

      <h2>User Generated Share Links</h2>

      <table border="1" width="100%">

        <thead>
          <tr>
            <th>User Name</th>
            <th>File Name</th>
            <th>Generated Link</th>
            <th>Created Time</th>
            <th>Expiry Time</th>
          </tr>
        </thead>

        <tbody>

          {links.length === 0 ? (
            <tr>
              <td colSpan="5">No links generated</td>
            </tr>
          ) : (

            links.map((link, index) => (

              <tr key={index}>

                <td>
                  {link.fileId?.userId?.name || "Unknown"}
                </td>

                <td>
                  {link.fileId?.filename}
                </td>

                <td>
                  <a href={link.link} target="_blank" rel="noreferrer">
                    Open Link
                  </a>
                </td>

                <td>
                  {new Date(link.createdAt).toLocaleString()}
                </td>

                <td>
                  {new Date(link.expiresAt).toLocaleString()}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

import { useEffect, useState } from "react";
import API_URL from "../config";

export default function Dashboard({ setStep }) {

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const [tab, setTab] = useState("profile");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [generatedLink, setGeneratedLink] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStep("home");
    }
  }, [token, setStep]);

  useEffect(() => {
    if (tab === "files" || tab === "share") {
      fetchFiles();
    }
  }, [tab]);

  const fetchFiles = async () => {
    const userId = localStorage.getItem("userId");
    const res = await fetch(`${API_URL}/api/files/${userId}`);
    const data = await res.json();
    setFiles(data);
  };

  const handleFileUpload = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  // 50 MB Validation
  if (file.size > 50 * 1024 * 1024) {

    setUploadMessage("❌ Maximum file size allowed is 50 MB");

    setTimeout(() => {
      setUploadMessage("");
    }, 3000);

    return;
  }

  const userId = localStorage.getItem("userId");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  try {

    const response = await fetch(
      `${API_URL}/api/files/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (!response.ok) {

      setUploadMessage(data.message || "Upload failed ❌");

      setTimeout(() => {
        setUploadMessage("");
      }, 3000);

      return;
    }

    setUploadMessage("✅ File uploaded successfully");

    fetchFiles();

    setTimeout(() => {
      setUploadMessage("");
    }, 3000);

  } catch (err) {

    console.error(err);

    setUploadMessage("❌ File upload failed");

    setTimeout(() => {
      setUploadMessage("");
    }, 3000);
  }
};

  const deleteFile = async (fileId) => {
    try {
      await fetch(`${API_URL}/api/files/delete/${fileId}`, {
        method: "DELETE"
      });

      setFiles((prevFiles) => prevFiles.filter(file => file._id !== fileId));

    } catch (err) {
      console.error(err);
    }
  };

  const generateLink = async () => {
    if (!selectedFile) {
      alert("Please select a file ❗");
      return;
    }

    const res = await fetch(`${API_URL}/api/files/generate-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fileId: selectedFile
      })
    });

    const data = await res.json();
    setGeneratedLink(data.link);
  };

  const handleLogout = async () => {
    const userId = localStorage.getItem("userId");

    try {
      if (userId) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });
      }
    } catch (err) {
      console.error(err);
    }

    localStorage.clear();
    setStep("home");
  };

  return (
    <div style={container}>

      <div style={content}>

        <button style={backBtn} onClick={() => setStep("home")}>
          ⬅ Back to Home
        </button>

        {tab === "profile" && (
          <div>
            <h2>User Profile</h2>
            <div style={card}>
              <p><b>Email:</b> {email}</p>
            </div>
          </div>
        )}

        {tab === "files" && (
          <div>
            <h2>My Files</h2>

            <div style={card}>
              {uploadMessage && (
                <p style={{ color: "green", marginBottom: "10px" }}>
                  {uploadMessage}
                </p>
              )}

              {files.length === 0 ? (
                <p>No files uploaded</p>
              ) : (
                files.map((file) => (
                  <div key={file._id} style={fileRow}>

                    {/* LEFT */}
                    <div style={fileInfo}>
                      <span style={fileIcon}>📄</span>
                      <span style={fileName}>{file.filename}</span>
                    </div>

                    {/* RIGHT - SMALL DELETE BUTTON */}
                    <button
                      style={deleteBtn}
                      onClick={() => deleteFile(file._id)}
                      onMouseOver={(e) =>
                        (e.target.style.background = "#dc2626")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.background = "#ef4444")
                      }
                    >
                      Delete
                    </button>

                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {tab === "share" && (
          <div>
            <h2>Generate Share Link</h2>

            <div style={card}>
              {files.map((file) => (
                <div key={file._id} style={fileItem}>
                  <input
                    type="radio"
                    name="file"
                    onChange={() => setSelectedFile(file._id)}
                  />
                  &nbsp; {file.filename}
                </div>
              ))}

              <button style={generateBtn} onClick={generateLink}>
                🔗 Generate Link
              </button>

              {generatedLink && (
                <div style={{ marginTop: "15px" }}>
                  <p><b>Share Link:</b></p>

                  <input
                    value={generatedLink}
                    readOnly
                    style={inputBox}
                  />

                  <button
                    style={copyBtn}
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLink);
                      alert("Link copied ✅");
                    }}
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      <div style={sidebar}>
        <h3>Dashboard</h3>

        <button style={menuBtn} onClick={() => setTab("profile")}>
          Profile
        </button>

        <button style={menuBtn} onClick={() => setTab("files")}>
          My Files
        </button>

        <button style={menuBtn} onClick={() => setTab("share")}>
          Generate Link
        </button>

        <button
          style={uploadBtn}
          onClick={() => document.getElementById("fileInput").click()}
        >
          ➕ Upload File
        </button>

        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
}



const container = {
  display: "flex",
  minHeight: "100vh"
};

const content = {
  flex: 1,
  padding: "40px",
  background: "#f8fafc"
};

const sidebar = {
  width: "250px",
  background: "#1e293b",
  color: "white",
  padding: "20px"
};

const backBtn = {
  padding: "4px 10px",
  background: "#64748b",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginBottom: "15px",
  fontSize: "12px"
};

const menuBtn = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const uploadBtn = {
  ...menuBtn,
  background: "#10b981"
};

const logoutBtn = {
  ...menuBtn,
  background: "#ef4444"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

/* ✅ FIXED ROW */
const fileRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 15px",
  marginBottom: "10px",
  borderRadius: "8px",
  background: "#f1f5f9",
  gap: "10px"
};

const fileInfo = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flex: 1
};

const fileIcon = {
  fontSize: "18px"
};

const fileName = {
  fontSize: "14px",
  fontWeight: "500",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};

/* ✅ SMALL BUTTON (FIXED ISSUE) */
const deleteBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  width: "auto",
  flexShrink: 0
};

const fileItem = {
  marginBottom: "10px",
  padding: "8px",
  borderBottom: "1px solid #ddd"
};

const generateBtn = {
  marginTop: "15px",
  padding: "10px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const inputBox = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const copyBtn = {
  marginTop: "10px",
  padding: "8px",
  background: "#6366f1",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};
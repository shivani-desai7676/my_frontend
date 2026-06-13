import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-left">
          <h1>Sharing Files</h1>
          <p>Fast and secure file sharing platform.</p>

          <button
            onClick={() =>
              document
                .getElementById("about")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Started
          </button>
        </div>

        <div className="hero-right">
          <img
            src="/sharing.png"
            alt="file sharing"
          />
        </div>

      </section>


      {/* ABOUT SECTION */}
      <section id="about" className="about">

        <h2>About SnapShare</h2>

        <p>
          SnapShare is a modern and secure file sharing platform that allows
          users to upload files, generate shareable links, and send files
          instantly to anyone.
        </p>

        <div className="about-features">

          <div className="feature">
            <h3>⚡ Fast Upload</h3>
            <p>Upload files quickly and generate share links instantly.</p>
          </div>

          <div className="feature">
            <h3>🔒 Secure</h3>
            <p>Your files are stored securely with unique encrypted links.</p>
          </div>

          <div className="feature">
            <h3>🌍 Easy Sharing</h3>
            <p>Share files with anyone using a simple link.</p>
          </div>

        </div>

      </section>

    </div>
  );
}

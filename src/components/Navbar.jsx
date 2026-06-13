import "./Navbar.css";

export default function Navbar({ setStep }) {
  return (
    <nav className="navbar">
      <div className="logo">SaaS</div>

      <ul>
        <li onClick={() => setStep("home")}>Home</li>
        <li onClick={() => setStep("about")}>About</li>
        <li>Pricing</li>
        <li>Contact</li>
        <li className="download">Download</li>
      </ul>

    </nav>
  );
}

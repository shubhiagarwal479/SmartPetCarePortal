import { useState } from "react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue-deep:   #1a3a5c;
    --blue-mid:    #1e6fb5;
    --blue-light:  #4fa3e0;
    --blue-pale:   #e8f3fc;
    --blue-border: #b3d4f0;
    --white:       #ffffff;
    --off-white:   #f7fbff;
    --text-dark:   #0d2137;
    --text-mid:    #2e5a84;
    --text-muted:  #6b93b5;
    --success:     #1a7a4a;
    --success-bg:  #e6f7ee;
    --danger:      #c0392b;
    --danger-bg:   #fdf0ee;
    --shadow-sm:   0 2px 8px rgba(26,58,92,0.08);
    --shadow-md:   0 6px 24px rgba(26,58,92,0.12);
    --shadow-lg:   0 16px 48px rgba(26,58,92,0.16);
    --radius:      12px;
    --radius-lg:   20px;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--text-dark);
    min-height: 100vh;
  }

  h1, h2, h3 { font-family: 'Playfair Display', serif; }

  .navbar {
    position: sticky; top: 0; z-index: 100;
    background: var(--white);
    border-bottom: 2px solid var(--blue-border);
    padding: 0 2rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 68px;
    box-shadow: var(--shadow-sm);
  }
  .navbar-brand {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 700;
    color: var(--blue-deep); cursor: pointer;
  }
  .navbar-brand .paw { font-size: 1.6rem; }
  .nav-links { display: flex; align-items: center; gap: 0.25rem; }
  .nav-link {
    padding: 0.45rem 1rem; border-radius: 8px;
    color: var(--text-mid); font-weight: 500; font-size: 0.9rem;
    cursor: pointer; border: none; background: none;
    transition: background 0.2s, color 0.2s;
  }
  .nav-link:hover { background: var(--blue-pale); color: var(--blue-deep); }
  .nav-link.active { background: var(--blue-pale); color: var(--blue-mid); font-weight: 600; }

  .user-pill {
    display: flex; align-items: center; gap: 8px;
    background: var(--blue-pale); border: 1.5px solid var(--blue-border);
    border-radius: 999px; padding: 4px 14px 4px 6px;
    cursor: pointer; transition: box-shadow 0.2s;
  }
  .user-pill:hover { box-shadow: var(--shadow-sm); }
  .avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: linear-gradient(135deg, var(--blue-mid), var(--blue-deep));
    display: flex; align-items: center; justify-content: center;
    color: white; font-weight: 700; font-size: 0.85rem;
  }
  .user-pill span { font-size: 0.85rem; font-weight: 600; color: var(--blue-deep); }

  .btn-login-nav {
    padding: 0.45rem 1.2rem; border-radius: 8px;
    background: var(--blue-mid); color: white;
    border: none; font-weight: 600; font-size: 0.88rem;
    cursor: pointer; transition: background 0.2s, transform 0.1s;
  }
  .btn-login-nav:hover { background: var(--blue-deep); transform: translateY(-1px); }

  .page { min-height: calc(100vh - 68px); }

  .hero {
    background: linear-gradient(135deg, var(--blue-pale) 0%, #d0e9f8 50%, var(--blue-pale) 100%);
    border-bottom: 2px solid var(--blue-border);
    padding: 5rem 2rem 4rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(79,163,224,0.18), transparent 70%);
  }
  .hero-badge {
    display: inline-block; background: var(--blue-mid);
    color: white; padding: 0.3rem 1rem; border-radius: 999px;
    font-size: 0.78rem; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 1.2rem;
  }
  .hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); color: var(--blue-deep); line-height: 1.2; margin-bottom: 1rem; }
  .hero p { font-size: 1.1rem; color: var(--text-mid); max-width: 540px; margin: 0 auto 2rem; line-height: 1.7; }
  .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

  .btn-primary {
    background: var(--blue-mid); color: white;
    border: none; padding: 0.75rem 1.8rem; border-radius: var(--radius);
    font-size: 0.95rem; font-weight: 600; cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 14px rgba(30,111,181,0.3);
  }
  .btn-primary:hover { background: var(--blue-deep); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(30,111,181,0.35); }
  .btn-outline {
    background: transparent; color: var(--blue-mid);
    border: 2px solid var(--blue-mid); padding: 0.75rem 1.8rem; border-radius: var(--radius);
    font-size: 0.95rem; font-weight: 600; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-outline:hover { background: var(--blue-pale); transform: translateY(-2px); }
  .btn-sm { padding: 0.5rem 1.2rem; font-size: 0.85rem; }

  .section { padding: 4rem 2rem; max-width: 1100px; margin: 0 auto; }
  .section-title { text-align: center; font-size: 2rem; color: var(--blue-deep); margin-bottom: 0.5rem; }
  .section-sub { text-align: center; color: var(--text-muted); margin-bottom: 3rem; font-size: 1rem; }
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
  .feature-card {
    background: var(--white); border: 2px solid var(--blue-border);
    border-radius: var(--radius-lg); padding: 1.8rem 1.4rem;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    text-align: center;
  }
  .feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--blue-light); }
  .feature-icon { font-size: 2.2rem; margin-bottom: 1rem; }
  .feature-card h3 { color: var(--blue-deep); font-size: 1.05rem; margin-bottom: 0.5rem; font-family: 'DM Sans', sans-serif; font-weight: 600; }
  .feature-card p { color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; }

  .steps-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 1rem; }
  .step {
    flex: 1; min-width: 180px;
    border: 2px solid var(--blue-border); border-radius: var(--radius-lg);
    padding: 1.5rem 1.2rem; text-align: center;
    background: var(--off-white);
  }
  .step-num {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--blue-mid); color: white;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 1rem; margin: 0 auto 0.8rem;
  }
  .step h4 { color: var(--blue-deep); font-size: 0.95rem; margin-bottom: 0.4rem; }
  .step p { color: var(--text-muted); font-size: 0.83rem; line-height: 1.5; }

  .divider { height: 2px; background: var(--blue-border); margin: 0; }

  .form-page {
    min-height: calc(100vh - 68px);
    background: var(--off-white);
    display: flex; align-items: center; justify-content: center;
    padding: 3rem 1rem;
  }
  .form-card {
    background: var(--white); border: 2px solid var(--blue-border);
    border-radius: var(--radius-lg); padding: 2.5rem 2rem;
    width: 100%; max-width: 460px;
    box-shadow: var(--shadow-lg);
  }
  .form-card-title { font-size: 1.6rem; color: var(--blue-deep); margin-bottom: 0.4rem; text-align: center; }
  .form-card-sub { color: var(--text-muted); text-align: center; margin-bottom: 2rem; font-size: 0.9rem; }
  .form-icon { text-align: center; font-size: 2.8rem; margin-bottom: 1rem; }
  .form-group { margin-bottom: 1.2rem; }
  .form-label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-mid); margin-bottom: 0.45rem; }
  .form-input {
    width: 100%; padding: 0.75rem 1rem;
    border: 2px solid var(--blue-border); border-radius: var(--radius);
    font-size: 0.95rem; color: var(--text-dark);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'DM Sans', sans-serif; background: var(--white);
  }
  .form-input:focus { border-color: var(--blue-mid); box-shadow: 0 0 0 3px rgba(30,111,181,0.12); }
  .form-input.error { border-color: var(--danger); }
  .form-error { color: var(--danger); font-size: 0.8rem; margin-top: 0.3rem; }
  .form-select {
    width: 100%; padding: 0.75rem 1rem;
    border: 2px solid var(--blue-border); border-radius: var(--radius);
    font-size: 0.95rem; color: var(--text-dark);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'DM Sans', sans-serif; background: var(--white); cursor: pointer;
  }
  .form-select:focus { border-color: var(--blue-mid); box-shadow: 0 0 0 3px rgba(30,111,181,0.12); }
  .btn-full { width: 100%; }
  .form-divider { display: flex; align-items: center; gap: 0.75rem; margin: 1.2rem 0; color: var(--text-muted); font-size: 0.82rem; }
  .form-divider::before, .form-divider::after { content: ''; flex: 1; height: 1px; background: var(--blue-border); }

  .auth-tabs { display: flex; border: 2px solid var(--blue-border); border-radius: var(--radius); overflow: hidden; margin-bottom: 2rem; }
  .auth-tab {
    flex: 1; padding: 0.65rem; text-align: center;
    font-size: 0.9rem; font-weight: 600; cursor: pointer;
    transition: background 0.2s, color 0.2s; border: none;
    background: none; color: var(--text-muted);
  }
  .auth-tab.active { background: var(--blue-mid); color: white; }

  .detail-page { background: var(--off-white); min-height: calc(100vh - 68px); padding: 3rem 1rem; }
  .detail-container { max-width: 700px; margin: 0 auto; }
  .detail-header {
    background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    padding: 2rem; color: white; position: relative; overflow: hidden;
  }
  .detail-header::after {
    content: '🐾'; position: absolute; right: 2rem; top: 50%; transform: translateY(-50%);
    font-size: 4rem; opacity: 0.15;
  }
  .detail-header h2 { font-size: 1.5rem; margin-bottom: 0.3rem; }
  .detail-header p { opacity: 0.8; font-size: 0.88rem; }
  .status-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 0.3rem 0.9rem; border-radius: 999px; font-size: 0.78rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.5px; margin-top: 0.8rem;
  }
  .status-confirmed { background: rgba(255,255,255,0.2); color: white; border: 1.5px solid rgba(255,255,255,0.4); }
  .status-pending   { background: rgba(255,200,50,0.2);  color: #ffe082; border: 1.5px solid rgba(255,200,50,0.4); }
  .status-cancelled { background: rgba(220,80,80,0.2);   color: #ff8a80; border: 1.5px solid rgba(220,80,80,0.4); }
  .detail-body { background: white; border: 2px solid var(--blue-border); border-top: none; border-radius: 0 0 var(--radius-lg) var(--radius-lg); padding: 2rem; }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin-bottom: 1.5rem; }
  .detail-field-label { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.3rem; }
  .detail-field-value { font-size: 0.98rem; color: var(--text-dark); font-weight: 500; padding: 0.5rem 0.8rem; background: var(--off-white); border: 1.5px solid var(--blue-border); border-radius: 8px; }
  .detail-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px solid var(--blue-border); }

  .update-note {
    background: var(--blue-pale); border: 1.5px solid var(--blue-border);
    border-radius: var(--radius); padding: 0.9rem 1rem;
    font-size: 0.85rem; color: var(--text-mid); margin-bottom: 1.5rem;
  }

  .result-page {
    min-height: calc(100vh - 68px); background: var(--off-white);
    display: flex; align-items: center; justify-content: center; padding: 2rem;
  }
  .result-card {
    background: white; border-radius: var(--radius-lg);
    padding: 3rem 2.5rem; max-width: 480px; width: 100%;
    text-align: center; box-shadow: var(--shadow-lg);
  }
  .result-icon { font-size: 4rem; margin-bottom: 1.2rem; }
  .result-card.success { border: 2px solid #6fcf97; }
  .result-card.failure { border: 2px solid #eb5757; }
  .result-card h2 { font-size: 1.8rem; margin-bottom: 0.6rem; }
  .result-card.success h2 { color: var(--success); }
  .result-card.failure h2 { color: var(--danger); }
  .result-card p { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6; }
  .result-detail { background: var(--off-white); border-radius: var(--radius); padding: 1rem; margin-bottom: 1.5rem; text-align: left; }
  .result-detail-row { display: flex; justify-content: space-between; font-size: 0.87rem; padding: 0.3rem 0; border-bottom: 1px solid var(--blue-border); }
  .result-detail-row:last-child { border-bottom: none; }
  .result-detail-row span:first-child { color: var(--text-muted); }
  .result-detail-row span:last-child { font-weight: 600; color: var(--text-dark); }

  .profile-wrapper { position: relative; }
  .profile-dropdown {
    position: absolute; top: calc(100% + 10px); right: 0;
    background: white; border: 2px solid var(--blue-border);
    border-radius: var(--radius-lg); padding: 1.2rem;
    min-width: 220px; box-shadow: var(--shadow-lg); z-index: 200;
    animation: fadeDown 0.18s ease;
  }
  @keyframes fadeDown { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
  .profile-dropdown-header { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; }
  .avatar-lg {
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, var(--blue-mid), var(--blue-deep));
    display: flex; align-items: center; justify-content: center;
    color: white; font-weight: 700; font-size: 1.1rem;
  }
  .profile-dropdown-header h4 { font-size: 0.95rem; color: var(--blue-deep); margin-bottom: 0.1rem; }
  .profile-dropdown-header p { font-size: 0.78rem; color: var(--text-muted); }
  .profile-menu-item {
    display: flex; align-items: center; gap: 8px;
    padding: 0.6rem 0.6rem; border-radius: 8px;
    font-size: 0.87rem; color: var(--text-mid);
    cursor: pointer; transition: background 0.15s;
    border: none; background: none; width: 100%;
  }
  .profile-menu-item:hover { background: var(--blue-pale); color: var(--blue-deep); }
  .profile-divider { height: 1px; background: var(--blue-border); margin: 0.5rem 0; }
  .profile-menu-item.logout { color: var(--danger); }
  .profile-menu-item.logout:hover { background: var(--danger-bg); }

  .footer {
    background: var(--blue-deep); color: rgba(255,255,255,0.7);
    text-align: center; padding: 1.5rem; font-size: 0.83rem;
  }
  .footer strong { color: white; }

  @media (max-width: 600px) {
    .detail-grid { grid-template-columns: 1fr; }
    .form-card { padding: 1.8rem 1.2rem; }
    .nav-links .nav-link { padding: 0.4rem 0.6rem; font-size: 0.82rem; }
  }
`;

// ─── SAMPLE DATA ──────────────────────────────────────────────────────────────
const sampleRecords = [
  {
    visitId: "VIS001", ownerId: "OWN101",
    petName: "Buddy", petType: "Dog", breed: "Golden Retriever",
    ownerName: "Rahul Sharma", ownerPhone: "9876543210",
    visitDate: "2025-04-10", visitTime: "10:00 AM",
    serviceType: "Vaccination", vetName: "Dr. Priya Nair",
    status: "confirmed", notes: "Annual shots due"
  },
  {
    visitId: "VIS002", ownerId: "OWN102",
    petName: "Whiskers", petType: "Cat", breed: "Persian",
    ownerName: "Ananya Iyer", ownerPhone: "9123456780",
    visitDate: "2025-04-12", visitTime: "2:00 PM",
    serviceType: "Grooming", vetName: "Dr. Karan Mehta",
    status: "pending", notes: "Nail trim + bath"
  },
  {
    visitId: "VIS003", ownerId: "OWN103",
    petName: "Coco", petType: "Rabbit", breed: "Holland Lop",
    ownerName: "Meera Pillai", ownerPhone: "9988776655",
    visitDate: "2025-04-08", visitTime: "11:30 AM",
    serviceType: "Checkup", vetName: "Dr. Priya Nair",
    status: "cancelled", notes: "Cancelled by owner"
  }
];

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ currentPage, setPage, user, setUser }) {
  const [showProfile, setShowProfile] = useState(false);
  const navItems = [
    { id: "home",   label: "Home",   icon: "🏠" },
    { id: "search", label: "Search", icon: "🔍" },
    { id: "about",  label: "About",  icon: "ℹ️" },
  ];
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setPage("home")}>
        <span className="paw">🐾</span>
        PawCare <span style={{ color:"var(--blue-mid)", marginLeft:2 }}>Portal</span>
      </div>
      <div className="nav-links">
        {navItems.map(item => (
          <button key={item.id}
            className={`nav-link ${currentPage === item.id ? "active" : ""}`}
            onClick={() => setPage(item.id)}>
            {item.icon} {item.label}
          </button>
        ))}
      </div>
      <div>
        {user ? (
          <div className="profile-wrapper">
            <div className="user-pill" onClick={() => setShowProfile(v => !v)}>
              <div className="avatar">{user.name[0].toUpperCase()}</div>
              <span>{user.name.split(" ")[0]}</span>
              <span style={{ color:"var(--blue-mid)", fontSize:"0.7rem" }}>▾</span>
            </div>
            {showProfile && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <div className="avatar-lg">{user.name[0].toUpperCase()}</div>
                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="profile-divider" />
                <button className="profile-menu-item" onClick={() => { setPage("search"); setShowProfile(false); }}>🔍 Search Record</button>
                <button className="profile-menu-item" onClick={() => setShowProfile(false)}>👤 My Profile</button>
                <div className="profile-divider" />
                <button className="profile-menu-item logout" onClick={() => { setUser(null); setShowProfile(false); setPage("home"); }}>🚪 Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="btn-login-nav" onClick={() => setPage("auth")}>Login / Sign Up</button>
        )}
      </div>
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage, user }) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-badge">🐾 Smart Pet Care System</div>
        <h1>Validate &amp; Manage<br />Pet Care Visit Records</h1>
        <p>A smart, secure system to search, verify, and update your pet's care records with real-time status checks and business rule enforcement.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => setPage("search")}>🔍 Search a Record</button>
          {!user && <button className="btn-outline" onClick={() => setPage("auth")}>Create Account</button>}
        </div>
      </section>
      <div className="divider" />
      <section className="section">
        <h2 className="section-title">Why PawCare Portal?</h2>
        <p className="section-sub">Everything you need to manage pet visit records, in one place.</p>
        <div className="features-grid">
          {[
            { icon:"🔐", title:"Dual Verification",    desc:"Search using Visit ID and Owner ID for secure record access." },
            { icon:"📋", title:"Complete Details",      desc:"View full visit info including vet, service type, and status." },
            { icon:"✏️", title:"Controlled Updates",   desc:"Edit only permitted fields — only when booking is confirmed." },
            { icon:"✅", title:"Smart Validation",      desc:"Client-side and server-side checks ensure data accuracy." },
            { icon:"📱", title:"Responsive Design",     desc:"Works seamlessly on desktop, tablet, and mobile." },
            { icon:"🔔", title:"Status Alerts",         desc:"Instant success or failure feedback after every operation." },
          ].map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="divider" />
      <section className="section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">Simple 4-step process to access and update records.</p>
        <div className="steps-row">
          {[
            { n:1, title:"Enter IDs",        desc:"Provide Visit ID and Owner ID on the search form." },
            { n:2, title:"View Record",      desc:"System validates and displays complete visit details." },
            { n:3, title:"Check Status",     desc:"Update allowed only if booking status is confirmed." },
            { n:4, title:"Update & Confirm", desc:"Edit permitted fields and get success confirmation." },
          ].map(s => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
          <button className="btn-primary" onClick={() => setPage("search")}>Try It Now →</button>
        </div>
      </section>
      <footer className="footer">
        <strong>PawCare Portal</strong> — Smart Record Validation &amp; Update System · React + Node.js + MongoDB
      </footer>
    </div>
  );
}

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
function AuthPage({ setUser, setPage }) {
  const [tab,      setTab]    = useState("login");
  const [name,     setName]   = useState("");
  const [email,    setEmail]  = useState("");
  const [password, setPass]   = useState("");
  const [errors,   setErrors] = useState({});
  const [loading,  setLoading]= useState(false);

  const validate = () => {
    const e = {};
    if (tab === "signup" && !name.trim()) e.name = "Name is required";
    if (!email.includes("@"))            e.email = "Enter a valid email";
    if (password.length < 6)             e.password = "Minimum 6 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser({
        name:  tab === "signup" ? name : email.split("@")[0].replace(/[._]/g," ").replace(/\b\w/g, c => c.toUpperCase()),
        email
      });
      setPage("home");
    }, 900);
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-icon">🐾</div>
        <h2 className="form-card-title">PawCare Portal</h2>
        <p className="form-card-sub">{tab === "login" ? "Welcome back! Sign in to continue." : "Create your free account today."}</p>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab==="login"?"active":""}`}  onClick={() => { setTab("login");  setErrors({}); }}>Login</button>
          <button className={`auth-tab ${tab==="signup"?"active":""}`} onClick={() => { setTab("signup"); setErrors({}); }}>Sign Up</button>
        </div>
        {tab === "signup" && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className={`form-input ${errors.name?"error":""}`} placeholder="e.g. Rahul Sharma"
              value={name} onChange={e => setName(e.target.value)} />
            {errors.name && <div className="form-error">⚠ {errors.name}</div>}
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className={`form-input ${errors.email?"error":""}`} type="email" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)} />
          {errors.email && <div className="form-error">⚠ {errors.email}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className={`form-input ${errors.password?"error":""}`} type="password" placeholder="••••••••"
            value={password} onChange={e => setPass(e.target.value)} />
          {errors.password && <div className="form-error">⚠ {errors.password}</div>}
        </div>
        <button className="btn-primary btn-full" style={{ marginTop:"0.5rem", opacity:loading?0.7:1 }}
          onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait…" : tab === "login" ? "Login →" : "Create Account →"}
        </button>
        <div className="form-divider">or</div>
        <button className="btn-outline btn-full" onClick={() => {
          setUser({ name:"Demo User", email:"demo@pawcare.in" });
          setPage("home");
        }}>🎭 Use Demo Account</button>
      </div>
    </div>
  );
}

// ─── SEARCH PAGE ──────────────────────────────────────────────────────────────
function SearchPage({ setPage, setFoundRecord, user }) {
  const [visitId,  setVisitId]  = useState("");
  const [ownerId,  setOwnerId]  = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [notFound, setNotFound] = useState(false);

  const validate = () => {
    const e = {};
    if (!visitId.trim())  e.visitId = "Visit ID is required";
    else if (!/^VIS\d{3}$/i.test(visitId.trim())) e.visitId = "Format must be: VIS001";
    if (!ownerId.trim())  e.ownerId = "Owner ID is required";
    else if (!/^OWN\d{3}$/i.test(ownerId.trim())) e.ownerId = "Format must be: OWN101";
    return e;
  };

  const handleSearch = () => {
    setNotFound(false);
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      const record = sampleRecords.find(
        r => r.visitId.toLowerCase() === visitId.trim().toLowerCase() &&
             r.ownerId.toLowerCase() === ownerId.trim().toLowerCase()
      );
      setLoading(false);
      if (record) { setFoundRecord(record); setPage("details"); }
      else { setNotFound(true); }
    }, 800);
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-icon">🔍</div>
        <h2 className="form-card-title">Search Visit Record</h2>
        <p className="form-card-sub">Enter your Visit ID and Owner ID to retrieve the pet care visit record.</p>
        {!user && (
          <div className="update-note">
            ℹ️ Browsing as guest.&nbsp;
            <span style={{ color:"var(--blue-mid)", cursor:"pointer", fontWeight:600 }} onClick={() => setPage("auth")}>Login</span>
            &nbsp;for full access.
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Visit ID</label>
          <input className={`form-input ${errors.visitId?"error":""}`} placeholder="e.g. VIS001"
            value={visitId} onChange={e => { setVisitId(e.target.value); setErrors(v=>({...v,visitId:""})); }} />
          {errors.visitId && <div className="form-error">⚠ {errors.visitId}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Owner ID</label>
          <input className={`form-input ${errors.ownerId?"error":""}`} placeholder="e.g. OWN101"
            value={ownerId} onChange={e => { setOwnerId(e.target.value); setErrors(v=>({...v,ownerId:""})); }} />
          {errors.ownerId && <div className="form-error">⚠ {errors.ownerId}</div>}
        </div>
        {notFound && (
          <div style={{ background:"var(--danger-bg)", border:"1.5px solid #eb5757", borderRadius:"var(--radius)", padding:"0.8rem 1rem", marginBottom:"1rem", color:"var(--danger)", fontSize:"0.88rem" }}>
            ❌ No record found. Please check your Visit ID and Owner ID.
          </div>
        )}
        <button className="btn-primary btn-full" onClick={handleSearch} disabled={loading}
          style={{ opacity:loading?0.7:1 }}>
          {loading ? "Searching…" : "Search Record →"}
        </button>
        <div style={{ marginTop:"1.5rem", background:"var(--blue-pale)", borderRadius:"var(--radius)", padding:"1rem", fontSize:"0.82rem", color:"var(--text-mid)" }}>
          <strong>💡 Sample IDs to try:</strong><br />
          VIS001 + OWN101 (Confirmed) &nbsp;|&nbsp; VIS002 + OWN102 (Pending) &nbsp;|&nbsp; VIS003 + OWN103 (Cancelled)
        </div>
      </div>
    </div>
  );
}

// ─── DETAILS PAGE ─────────────────────────────────────────────────────────────
function DetailsPage({ record, setPage }) {
  if (!record) { setPage("search"); return null; }
  const statusClass = { confirmed:"status-confirmed", pending:"status-pending", cancelled:"status-cancelled" }[record.status];
  const statusIcon  = { confirmed:"✅", pending:"⏳", cancelled:"❌" }[record.status];
  const fields = [
    ["Pet Name",    record.petName],    ["Pet Type",    record.petType],
    ["Breed",       record.breed],      ["Owner Name",  record.ownerName],
    ["Owner Phone", record.ownerPhone], ["Visit Date",  record.visitDate],
    ["Visit Time",  record.visitTime],  ["Service",     record.serviceType],
    ["Vet Assigned",record.vetName],    ["Notes",       record.notes],
  ];
  return (
    <div className="detail-page">
      <div className="detail-container">
        <button className="btn-outline btn-sm" style={{ marginBottom:"1.2rem" }} onClick={() => setPage("search")}>← Back to Search</button>
        <div className="detail-header">
          <div style={{ fontSize:"0.78rem", opacity:0.7, marginBottom:"0.3rem" }}>VISIT ID: {record.visitId} · OWNER ID: {record.ownerId}</div>
          <h2>🐾 {record.petName}'s Visit Record</h2>
          <p>{record.ownerName} · {record.petType} ({record.breed})</p>
          <div className={`status-badge ${statusClass}`}>{statusIcon} {record.status.toUpperCase()}</div>
        </div>
        <div className="detail-body">
          <div className="detail-grid">
            {fields.map(([label, value]) => (
              <div key={label}>
                <div className="detail-field-label">{label}</div>
                <div className="detail-field-value">{value}</div>
              </div>
            ))}
          </div>
          {record.status !== "confirmed" && (
            <div style={{ background:"var(--danger-bg)", border:"1.5px solid #f5a9a3", borderRadius:"var(--radius)", padding:"0.85rem 1rem", fontSize:"0.88rem", color:"var(--danger)", marginBottom:"1rem" }}>
              ⚠️ Updates only allowed when status is <strong>Confirmed</strong>. Current: <strong>{record.status}</strong>.
            </div>
          )}
          <div className="detail-actions">
            <button className="btn-outline" onClick={() => setPage("search")}>← Search Again</button>
            <button className="btn-primary"
              disabled={record.status !== "confirmed"}
              style={{ opacity:record.status!=="confirmed"?0.5:1, cursor:record.status!=="confirmed"?"not-allowed":"pointer" }}
              onClick={() => setPage("update")}>
              ✏️ Update Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── UPDATE PAGE ──────────────────────────────────────────────────────────────
function UpdatePage({ record, setPage, setFoundRecord }) {
  if (!record || record.status !== "confirmed") { setPage("failure"); return null; }
  const [visitTime,   setVisitTime]   = useState(record.visitTime);
  const [serviceType, setServiceType] = useState(record.serviceType);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);

  const handleUpdate = () => {
    const e = {};
    if (!visitTime.trim())   e.visitTime   = "Visit time is required";
    if (!serviceType.trim()) e.serviceType = "Service type is required";
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFoundRecord({ ...record, visitTime, serviceType });
      setPage("success");
    }, 900);
  };

  return (
    <div className="form-page">
      <div className="form-card" style={{ maxWidth:500 }}>
        <div className="form-icon">✏️</div>
        <h2 className="form-card-title">Update Visit Record</h2>
        <p className="form-card-sub">Visit ID: <strong>{record.visitId}</strong> · {record.petName}</p>
        <div className="update-note">
          ℹ️ Only <strong>Visit Time</strong> and <strong>Service Type</strong> can be updated. Permitted because status is <span style={{ color:"var(--success)", fontWeight:600 }}>Confirmed ✅</span>
        </div>
        <div style={{ background:"var(--off-white)", border:"1.5px solid var(--blue-border)", borderRadius:"var(--radius)", padding:"0.8rem 1rem", marginBottom:"1.2rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem", fontSize:"0.85rem" }}>
            {[["Pet Name",record.petName],["Owner",record.ownerName],["Visit Date",record.visitDate],["Vet",record.vetName]].map(([k,v])=>(
              <div key={k}>
                <div style={{ color:"var(--text-muted)", fontSize:"0.73rem", marginBottom:"2px" }}>{k}</div>
                <div style={{ fontWeight:600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Visit Time ✏️</label>
          <input className={`form-input ${errors.visitTime?"error":""}`} placeholder="e.g. 10:00 AM"
            value={visitTime} onChange={e => setVisitTime(e.target.value)} />
          {errors.visitTime && <div className="form-error">⚠ {errors.visitTime}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Service Type ✏️</label>
          <select className="form-select" value={serviceType} onChange={e => setServiceType(e.target.value)}>
            {["Vaccination","Grooming","Checkup","Dental Cleaning","Surgery","Deworming"].map(s=>(
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div style={{ display:"flex", gap:"1rem", marginTop:"0.5rem" }}>
          <button className="btn-outline" style={{ flex:1 }} onClick={() => setPage("details")}>← Cancel</button>
          <button className="btn-primary" style={{ flex:1, opacity:loading?0.7:1 }} onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving…" : "Save Changes ✓"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SUCCESS PAGE ─────────────────────────────────────────────────────────────
function SuccessPage({ record, setPage }) {
  return (
    <div className="result-page">
      <div className="result-card success">
        <div className="result-icon">🎉</div>
        <h2>Update Successful!</h2>
        <p>The pet care visit record has been updated successfully. All changes have been saved to the database.</p>
        {record && (
          <div className="result-detail">
            {[["Visit ID",record.visitId],["Pet Name",record.petName],["New Visit Time",record.visitTime],["New Service",record.serviceType],["Status",record.status]].map(([k,v])=>(
              <div className="result-detail-row" key={k}><span>{k}</span><span>{v}</span></div>
            ))}
          </div>
        )}
        <div style={{ display:"flex", gap:"1rem" }}>
          <button className="btn-outline" style={{ flex:1 }} onClick={() => setPage("details")}>View Record</button>
          <button className="btn-primary"  style={{ flex:1 }} onClick={() => setPage("search")}>New Search</button>
        </div>
      </div>
    </div>
  );
}

// ─── FAILURE PAGE ─────────────────────────────────────────────────────────────
function FailurePage({ record, setPage }) {
  return (
    <div className="result-page">
      <div className="result-card failure">
        <div className="result-icon">🚫</div>
        <h2>Update Not Allowed</h2>
        <p>This record cannot be updated because the booking status does not permit modifications. Only <strong>Confirmed</strong> bookings can be edited.</p>
        {record && (
          <div className="result-detail">
            {[["Visit ID",record.visitId],["Pet Name",record.petName],["Current Status",record.status],["Reason","Status must be Confirmed"]].map(([k,v])=>(
              <div className="result-detail-row" key={k}>
                <span>{k}</span>
                <span style={k==="Current Status"?{color:"var(--danger)",fontWeight:700}:{}}>{v}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ display:"flex", gap:"1rem" }}>
          <button className="btn-outline" style={{ flex:1 }} onClick={() => setPage("details")}>← Back</button>
          <button className="btn-primary"  style={{ flex:1 }} onClick={() => setPage("search")}>New Search</button>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  return (
    <div className="page">
      <section className="hero" style={{ padding:"3.5rem 2rem 3rem" }}>
        <div className="hero-badge">About This System</div>
        <h1>Smart Record Validation<br />&amp; Update System</h1>
        <p>A full-stack case study for Pet Care Visit Management demonstrating smart validation and controlled data updates.</p>
      </section>
      <div className="divider" />
      <section className="section">
        <h2 className="section-title">Technology Stack</h2>
        <p className="section-sub">Modern full-stack technologies for a robust application.</p>
        <div className="features-grid">
          {[
            { icon:"⚛️", title:"React JS",           desc:"Component-based frontend with state management." },
            { icon:"🟩", title:"Node.js + Express",  desc:"RESTful API backend with session management." },
            { icon:"🍃", title:"MongoDB",             desc:"NoSQL database for flexible record collections." },
            { icon:"🔗", title:"RESTful APIs",        desc:"Clean endpoints for search, validate, and update." },
            { icon:"🛡️",title:"Validation",          desc:"JS client-side + exception handling server-side." },
            { icon:"🍪", title:"Sessions & Cookies", desc:"Secure user session handling for authenticated updates." },
          ].map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
          <button className="btn-primary" onClick={() => setPage("search")}>Try the System →</button>
        </div>
      </section>
      <footer className="footer">
        <strong>PawCare Portal</strong> — Smart Record Validation &amp; Update System · VIT Case Study
      </footer>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page,        setPage]        = useState("home");
  const [user,        setUser]        = useState(null);
  const [foundRecord, setFoundRecord] = useState(null);

  const renderPage = () => {
    switch (page) {
      case "home":    return <HomePage    setPage={setPage} user={user} />;
      case "auth":    return <AuthPage    setUser={setUser} setPage={setPage} />;
      case "search":  return <SearchPage  setPage={setPage} setFoundRecord={setFoundRecord} user={user} />;
      case "details": return <DetailsPage record={foundRecord} setPage={setPage} />;
      case "update":  return <UpdatePage  record={foundRecord} setPage={setPage} setFoundRecord={setFoundRecord} />;
      case "success": return <SuccessPage record={foundRecord} setPage={setPage} />;
      case "failure": return <FailurePage record={foundRecord} setPage={setPage} />;
      case "about":   return <AboutPage   setPage={setPage} />;
      default:        return <HomePage    setPage={setPage} user={user} />;
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <Navbar currentPage={page} setPage={setPage} user={user} setUser={setUser} />
      {renderPage()}
    </>
  );
}

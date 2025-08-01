import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../style/login.css";
// Same shared CSS

function Signin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    const newEntry = { username, email, age, phone, password };

    axios.post("https://grocesy.onrender.com/user/post", newEntry)
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message));

    setUsername("");
    setEmail("");
    setAge("");
    setPhone("");
    setPassword("");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="auth-input" type="text" placeholder="Username" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" type="email" placeholder="Email" required />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="auth-input" type="tel" placeholder="Phone Number" required />
          <input value={age} onChange={(e) => setAge(e.target.value)} className="auth-input" type="number" placeholder="Age" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" type="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
        <p className="toggle-link" onClick={() => navigate('/')}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Signin;


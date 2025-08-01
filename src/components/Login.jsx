import { useNavigate } from 'react-router-dom';
import "../style/login.css";
import { useState } from 'react';
import axios from 'axios';
// Shared CSS

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const enter = {
      email: email,
      password: password
    }
    axios.post("https://grocesy.onrender.com/getlogin", enter)
      .then((res) => {

        alert(res.data.message);
        localStorage.setItem("user", res.data.Data._id);

      })
      .catch(err => alert(err.message))
    setEmail("");
    setPassword("");
    navigate('/home')
  }




return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Login</h2>
      <form >
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" type="email" placeholder="Email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" type="password" placeholder="Password" required />
        <button type="submit" onClick={handleLogin} className="auth-btn" >Login</button>
      </form>
      <p className="toggle-link" onClick={() => navigate('/signin')}>
        Don't have an account? Sign In
      </p>
    </div>
  </div>
)

}
export default Login;


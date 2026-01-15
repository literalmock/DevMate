import { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("shivam01@gmail.com");
  const [password, setPassword] = useState("random123");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    axios.post('http://localhost:3000/auth/login', { email, password }, { withCredentials: true })
      .then(response => {
        console.log('Login successful:', response.data);
      })
      .catch(error => {
        console.error('Login error:', error);
      }); 
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">
          Sign in to continue to Devmate
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" onClick={handleSubmit} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;

import React, { useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authcontext/AuthContext";
import "../login/login.scss";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate()


  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await login(input);
      console.log(response);
      navigate(response.redirect);
    } catch(err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="box">
        <div className="card">
          <div className="left">
            <h2>Access your dashboard using credentials</h2>
            <div className="registered">
              <span>New user? Register </span>
              <Link to="/register">
                <button>Here</button>
              </Link>
            </div>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            {err && err}
              <button onClick={handleLogin}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

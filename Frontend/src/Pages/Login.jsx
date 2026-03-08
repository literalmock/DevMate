import { useEffect, useState } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [emailId,setEmailId] = useState('neha05@gmail.com')
    const [password,setPassword] = useState('random123')
    const [error, setError] = useState(' ');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user)
    
    const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    axios.post(import.meta.env.VITE_BASE_URL + '/auth/login', { email: emailId, password }, { withCredentials: true })
      .then(response => {
        console.log('Login successful:', response.data.message);
        dispatch(addUser(response.data.userdetail))
        navigate('/feed');
      })
      .catch(error => {
        console.error('Login error:', error?.response?.data || error.message);
        setError(error?.response?.data || 'Something went wrong');
      }); 
  };

// redirects user to feed it already logged in 
  const redirecttoFeed = () =>{
      if(user){
        navigate('/feed')
      }
  }
  useEffect(()=>{
    redirecttoFeed()
  },[redirecttoFeed])
    return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form>
            {/* Email */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <p className="text-red-500">{error}</p>

            {/* Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full" onClick={handleSubmit}>
                Login
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <a href="#" className="link link-primary">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
  
export default Login;
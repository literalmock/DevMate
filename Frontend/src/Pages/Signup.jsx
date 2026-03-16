import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const Signup = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(" ");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(" ");
		setSuccess("");

		axios
			.post(
				import.meta.env.VITE_BASE_URL + "/auth/signup",
				{ name, username, email, password },
				{ withCredentials: true }
			)
			.then((response) => {
				setSuccess(response?.data?.message || "User created successfully");
				setTimeout(() => {
					navigate("/login");
				}, 800);
			})
			.catch((err) => {
				setError(err?.response?.data?.message || err?.response?.data || "Something went wrong");
			});
	};

	return (
		<div className="bg-base-200 min-h-screen flex items-center justify-center">
			<div className="card w-96 bg-base-100 shadow-2xl">
				<div className="card-body">
					<h2 className="text-2xl font-bold text-center">Sign Up</h2>

					<form>
						<div className="form-control mt-4">
							<label className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								placeholder="Enter your name"
								className="input input-bordered"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>

						<div className="form-control mt-4">
							<label className="label">
								<span className="label-text">Username</span>
							</label>
							<input
								type="text"
								placeholder="Enter your username"
								className="input input-bordered"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>

						<div className="form-control mt-4">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="Enter your email"
								className="input input-bordered"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

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
						</div>

						<p className="text-red-500">{error}</p>
						{success && <p className="text-green-600">{success}</p>}

						<div className="form-control mt-6">
							<button className="btn btn-primary w-full" onClick={handleSubmit}>
								Create Account
							</button>
						</div>

						<p className="text-center mt-4 text-sm">
							Already have an account?{" "}
							<Link to="/login" className="link link-primary">
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;


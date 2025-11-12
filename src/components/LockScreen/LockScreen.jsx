import {  useState } from "react";
import "./LockScreen.css";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { useWindowContext } from "../../context/WindowContext";

const users = [
	{ id: 1, name: "Software", avatar: "" },
	{ id: 2, name: "Fashion", avatar: "" },
	{ id: 3, name: "About", avatar: "" },
];
const month = new Date().toDateString();
export default function LockScreen() {
	const navigate = useNavigate();
	const [selectedUser, setSelectedUser] = useState(null);

	const handleLogin = (e) => {
		e.preventDefault();
		

		navigate("/home");
	};


	return (
		<div className="macosx-bg">
			<div className="login-panel-container">
				<div className="login-panel">
					<p className="login-panel-title bit-font">Welcome </p>

					<hr className="login-panel-hr"></hr>

					<div className="user-icon-container">
						<div className="center">
							<span className="user-name orbit-font">Horatious Harris II</span>
						</div>
						<div className="center">
							<Link to="/home">
								<button className="login-button bit-font" onClick={handleLogin}>
									Enter
								</button>
							</Link>
						</div>
					</div>

					<hr className="login-panel-hr"></hr>
					<span className="system-info bit-font">{month}</span>
				</div>

				<div className="system-info bit-font">GeekOS X </div>
			</div>
		</div>
	);
}

import React, { useEffect, useState } from "react";
import "./LockScreen.css";
import logo from "../../images/redLogo.png";
import { UserIcon } from "../UserIcon/UserIcon";
import { Link } from "react-router";

const users = [
	{ id: 1, name: "Software", avatar: "/api/placeholder/80/80" },
	{ id: 2, name: "Fashion", avatar: "/api/placeholder/80/80" },
	{ id: 3, name: "Stalker", avatar: "/api/placeholder/80/80" },
];
const month = new Date().toDateString();
export default function LockScreen() {
	const [selectedUser, setSelectedUser] = useState(null);

	const handleLogin = () => {
		alert("Login successful!");
	};

	return (
		<div className="macosx-bg">
			<img src={logo} alt="Logo" className="macosx-bg-logo" draggable="false" />

			<div className="login-panel-container">
				<div className="login-panel">
					<div className="apple-logo-small">
						<img src={logo} alt="Apple Logo" width={80} height={80} priority />
					</div>

					<div className="user-icons-container">
						{users.map((user) => (
							<UserIcon
								key={user.id}
								name={user.name}
								avatar={user.avatar}
								isSelected={selectedUser === user.id}
								onClick={() => setSelectedUser(user.id)}
							/>
						))}
					</div>

					{selectedUser && (
						<div className="login-button-container">
							<Link to="/geekMedia/home">
								<button className="login-button">Login</button>
								
							</Link>
						</div>
					)}

					{!selectedUser && (
						<p className="select-user-text">Select a user to login</p>
					)}
				</div>

				<div className="system-info">
					Mac OS X 10.4 {month}
				
				</div>
			</div>
		</div>
	);
}

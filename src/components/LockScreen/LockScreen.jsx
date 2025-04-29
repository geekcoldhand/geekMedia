import React, { useEffect, useState } from "react";
import "./LockScreen.css";
import logo from "../../images/redLogo.png";
import { UserIcon } from "../UserIcon/UserIcon";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import softwareProjectData from "../../context/project_data";
import designerProjectData from "../../context/project_data";
import stalkerProjectData from "../../context/project_data";


const users = [
	{ id: 1, name: "Recruiter", avatar: "" },
	{ id: 2, name: "Designers", avatar: "" },
	{ id: 3, name: "Stalkers", avatar: "" },
];
const month = new Date().toDateString();
export default function LockScreen() {
	const navigate = useNavigate();
	const {user, setUser, setProjects} = useUserContext();
	const [selectedUser, setSelectedUser] = useState(null);

	const handleLogin = (e) => {
		e.preventDefault();
		setUser(selectedUser);
		switch (selectedUser) {
			case 1:
				setProjects(softwareProjectData);
				break;
			case 2:
				setProjects(designerProjectData);
				break;
			case 3:
				setProjects(stalkerProjectData);
				break;
			default:
				break;
		}
		
		console.log("user: ", user);
		navigate("/home");
	};
	useEffect(() => {
		console.log("user updated:", user);
	}, [user]);
	
	return (
		<div className="macosx-bg">
			{/* <img src={logo} alt="Logo" className="macosx-bg-logo" draggable="false" /> */}

			<div className="login-panel-container">
				<div className="login-panel">
					<div className="apple-logo-small">
						<img src={logo} alt="Apple Logo" width={80} priority />
					</div>
					<hr className="login-panel-hr"></hr>
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
							<Link to="/home">
								<button className="login-button" onClick={handleLogin}>Login</button>
							</Link>
						</div>
					)}
					<hr className="login-panel-hr"></hr>

					{!selectedUser && (
						<p className="select-user-text">Select a user to login</p>
					)}
				</div>

				<div className="system-info">Geek OS X 10.4 {month}</div>
			</div>
		</div>
	);
}

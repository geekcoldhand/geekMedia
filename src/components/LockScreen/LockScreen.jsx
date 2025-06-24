import React, { useEffect, useState } from "react";
import "./LockScreen.css";
import { UserIcon } from "../UserIcon/UserIcon";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import softwareProjectData from "../../context/project_data";
import designerProjectData from "../../context/fashion_designer_data";
import stalkerProjectData from "../../context/stalker_data";
import macLogo from "../../images/Icons/macLogo.png";


const users = [
	{ id: 1, name: "Software", avatar: "" },
	{ id: 2, name: "Design", avatar: "" },
	{ id: 3, name: "About Me", avatar: "" },
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
		
		
		navigate("/home");
	};
	useEffect(() => {
		
	}, [user]);
	
	return (
		<div className="macosx-bg">

			<div className="login-panel-container">
				<div className="login-panel">
					<p className="login-panel-title">Welcome! </p>
					<img src={macLogo} alt="" className="apple-logo-small" />
					<p className="login-panel-title">Choose a domain to learn more about Horatious</p>
				
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
						<p className="select-user-text">Horatious Harris II</p>
					)}
				</div>

				<div className="system-info">Geek OS X 10.4 {month}</div>
			</div>
		</div>
	);
}

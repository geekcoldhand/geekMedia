import { useEffect, useState } from "react";
import "./LockScreen.css";
import { UserIcon } from "../DesktopIcons/UserIcon";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/WindowContext";
import softwareProjectData from "../../data/project_data";
import designerProjectData from "../../data/fashion_designer_data";
import stalkerProjectData from "../../data/stalker_data";
import Logo from "../Logo/Logo";
const users = [
	{ id: 1, name: "Software", avatar: "" },
	{ id: 2, name: "Fashion", avatar: "" },
	{ id: 3, name: "About", avatar: "" },
];
const month = new Date().toDateString();
export default function LockScreen() {
	const navigate = useNavigate();
	const { user, setUser, setProjects } = useUserContext();
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
	useEffect(() => {}, [user]);

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

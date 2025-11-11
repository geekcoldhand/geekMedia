import React from "react";
import "./UserIcon.css";

export function UserIcon({ name, avatar, isSelected, onClick }) {
	return (
		<div
			className={`user-icon ${isSelected ? "selected" : ""}`}
			onClick={onClick}
		>

		</div>
	);
}

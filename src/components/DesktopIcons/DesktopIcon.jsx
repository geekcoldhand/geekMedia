import "./DesktopIcon.css";

export function UserIcon({ dragItemsRef, index, project }) {
	return (
		<div>
			<div
				key={index}
				className="draggable-item"
				ref={(el) => (dragItemsRef.current[index] = el)}
				style={{ position: "absolute" }}
			>
				<img
					src={project.image}
					alt={project.title || `Project ${index + 1}`}
					className="box project-image"
					data-link={project.link}
				/>
				{project.name && <div className="icon-title">{project.name}</div>}
			</div>
		</div>
	);
}

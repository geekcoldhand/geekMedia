
const Logo = ({ width, height }) => {
	if (!width) {
		width = "10rem";
	}
	if (!height) {
		height = "10rem";
	}
	return (
		<div style={{ width: `${width}`, height: `${height}` }}>
			<object
				data={`${process.env.PUBLIC_URL}/images/Logos/Atom.svg`}
				className="atom-logo"
				type="image/svg+xml"
			></object>
			
		</div>
	);
};
export default Logo;

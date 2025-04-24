import React, { useEffect } from "react";
import "./LockScreen.css";

export default function LockScreen(){
    const enter = document.getElementById("lock-screen");

    const handleUnlock = () => {
        if (!enter) return;
        enter?.classList.toggle("hidden");
    };

    useEffect(() => {
        handleUnlock();
    }, []);
    
	return (
		<div id="lock-screen" className="lock-screen-toggle">
			<h1>Locked</h1>
			<button onClick={handleUnlock}>Unlock</button>
		</div>
	);
};

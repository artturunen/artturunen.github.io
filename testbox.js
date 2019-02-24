var testBox = document.getElementById("box");


testBox.addEventListener("mouseover", change_color);
testBox.addEventListener("mouseout", change_color);

function change_color() {
	if(testBox.className ==="testBox"){
			testBox.className = "testBox_active";
	} else {
			testBox.className = "testBox";
	}
	
	
	}

document.addEventListener('DOMContentLoaded', function(){
	const container = document.querySelector('.container');
	const inputs = document.querySelectorAll('input');
	// to change cols value also change CSS variable 
	inputs[2].value = 32;
	inputs[1].value = "#333333";

	function drawGrid(cols) {
		for(let i = 0; i < cols; i++)
			for(let j = 0; j < cols; j++) {
				var box = document.createElement('div');
				box.classList.add('box');
				container.appendChild(box);
			}
	};
	
	function clearGrid() {
		document.querySelectorAll('.container *').forEach(box => box.remove());
		drawGrid(inputs[2].value);
		// after clearing to start working again
		document.querySelectorAll('.container *').forEach(box => 
			box.addEventListener('mouseover', changeColor));
	}

	function handleUpdate() {
		// preventing from weird values
		if (inputs[2].value < 1) inputs[2].value = 1; 
		if (inputs[2].value > 100) inputs[2].value = 100; 

		// changing CSS var and removing boxes to reate new ones
		document.documentElement.style.setProperty(`--${this.name}`, this.value);
		document.querySelectorAll('.container *').forEach(box => box.remove());
		drawGrid(this.value);
		
		// after clearing to start working again
		document.querySelectorAll('.container *').forEach(box => 
		box.addEventListener('mouseover', changeColor));
	}
	
	// function to color tiles
	function changeColor() {
		this.style.backgroundColor = inputs[1].value;
	}

	drawGrid(inputs[2].value);

	// runs once for first drawn grid
	document.querySelectorAll('.container *').forEach(box => 
		box.addEventListener('mouseover', changeColor));

	// changing grid everytime there is a new value in input
	inputs[0].addEventListener('click', clearGrid);
	inputs[2].addEventListener('change', handleUpdate);
	inputs[2].addEventListener('click', handleUpdate);

	const colorWrapper = document.getElementById('color-wrapper');
	colorWrapper.style.backgroundColor = inputs[1].value;
	inputs[1].addEventListener('change', function() {
		colorWrapper.style.backgroundColor = inputs[1].value;
	});

});
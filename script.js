document.addEventListener('DOMContentLoaded', function(){
	const container = document.querySelector('.container');
	const resetInput = document.querySelector('input[name="reset"]');
	const colorInput = document.querySelector('input[name="color"]');
	const numberInput = document.querySelector('input[name="number"]');
	// to change cols value also change CSS variable 
	colorInput.value = "#333333";
	numberInput.value = 32;

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
		drawGrid(numberInput.value);
		// after clearing to start working again
		document.querySelectorAll('.container *').forEach(box => 
			box.addEventListener('mouseover', changeColor));
	}

	function handleUpdate() {
		// preventing from weird values
		if (numberInput.value !== '') {
			if (numberInput.value < 1) numberInput.value = 1; 
			if (numberInput.value > 100) numberInput.value = 100; 
		}

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
		this.style.backgroundColor = colorInput.value;
	}
	// initial drawing
	drawGrid(numberInput.value);

	// runs once for first drawn grid
	document.querySelectorAll('.container *').forEach(box => 
		box.addEventListener('mouseover', changeColor));

	// changing grid everytime there is a new value in input
	resetInput.addEventListener('click', clearGrid);
	numberInput.addEventListener('change', handleUpdate);
	numberInput.addEventListener('keyup', handleUpdate);

	// color button appearance: changes when selecting different color
	const colorWrapper = document.getElementById('color-wrapper');
	colorWrapper.style.backgroundColor = colorInput.value;
	colorInput.addEventListener('change', function() {
		colorWrapper.style.backgroundColor = colorInput.value;
	});

});
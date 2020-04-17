function View() {
    this._root = document.querySelector('div#root');
}


const canvas = document.createElement('canvas');
canvas.setAttribute('class', 'canvas');
canvas.setAttribute('height', '500px');
canvas.setAttribute('width', '1000px');
root.append(canvas);

const inputDiv = document.createElement('div');
root.appendChild(inputDiv); 

const input = document.createElement('input');
input.setAttribute('id', 'color');
input.value = '#00000';
input.type = 'color';
inputDiv.appendChild(input); 

const rangeDiv = document.createElement('div');
root.appendChild(rangeDiv);

const range = document.createElement('input');
range.setAttribute('id', 'range');
range.type = 'range';
rangeDiv.appendChild(range);

let newColor = 'black';

document.getElementById('color').oninput = function () {
    newColor = this.value; 
    ctx.beginPath();
}

const ctx = canvas.getContext('2d');

let isPressed = false;

canvas.addEventListener('mousedown', () => {
    isPressed = true;
})

canvas.addEventListener('mouseup', () => {
    isPressed = false;
    ctx.beginPath();
})

ctx.lineWidth = 10*2;
canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 10, 0, 2*Math.PI);
        ctx.fillStyle = newColor;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
})
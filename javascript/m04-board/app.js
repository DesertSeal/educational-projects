const board = document.querySelector('#board');
const colors = ['#f3b3ab67', '#f3d69867', '#dbec8e67', '#22db4167', '#94cce667', '#5c6fe067', '#d63bdb67', '#b8122867', '#f3b3ab', '#f3d698', '#dbec8e', '#22db41', '#94cce6', '#5c6fe0', '#d63bdb', '#b81228',   '#b3ab67', '#d69867', '#ec8e67', '#db4167', '#cce667', '#6fe067', '#3bdb67', '#122867'];
const SQUARES_NUMBER = 1400;

for (let i=0; i < SQUARES_NUMBER; i++) {
    const square =  document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', () => setColor(square));
    square.addEventListener('mouseleave', () => removeColor(square));


    board.append(square);
}

function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d';
    element.style.boxShadow = `0 0 2px #000`;
}

function getRandomColor() {
    const index = Math.floor(Math.random()*colors.length);
    return colors[index];
}
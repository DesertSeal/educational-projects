const starBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#f3b3ab67', '#f3d69867', '#dbec8e67', '#22db4167', '#94cce667', '#5c6fe067', '#d63bdb67', '#b8122867', '#f3b3ab', '#f3d698', '#dbec8e', '#22db41', '#94cce6', '#5c6fe0', '#d63bdb', '#b81228',   '#b3ab67', '#d69867', '#ec8e67', '#db4167', '#cce667', '#6fe067', '#3bdb67', '#122867'];
let time = 0
let score = 0



starBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})


timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) current = `0${current}`
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const size = getRandomNumber(30, 200)
    const {width, height} = board.getBoundingClientRect()
    const color1 = getRandomColor()
    const color2 = getRandomColor()
    const color3 = getRandomColor()
    const color4 = getRandomColor()


    const deg = getRandomNumber(0, 360)


    const x = getRandomNumber(0,width - size)
    const y = getRandomNumber(0, height - size)

    const circle = document.createElement('div')
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top=`${y}px`
    circle.style.left=`${x}px`
    // circle.style.backgroundColor = color;
    // circle.style.background = `linear-gradient(${deg}deg, ${color1}, ${color2}, ${color3}, ${color4})`
    circle.style.background = `linear-gradient(${deg}deg, ${color1}, ${color2}, ${color3})`
    
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random()*colors.length);
    return colors[index];
}
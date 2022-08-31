let cardsDeck = []; //Колода 
let cardSide; // сторона (рядов, колонок)
let gameOver;
let cardIndex; //номер карты (в т.ч. сохранится в ID)
let firstOpenCard = {}; //для  сохранения и сравнения первой открытой карты
let secondOpenCard = {}; //для  сохранения и сравнения первой открытой карты
let flagCloseCard = false; //признак закрытия 2-ух карт при открытии следующей пары
let table;


function startScreen() {

    cardsDeck = []; //Колода 
    gameOver = 0;

    const divStart = document.createElement('div');
    const h1 = document.createElement('h1');
    const divNumberCards = document.createElement('div');
    const h2 = document.createElement('h2');
    const input = document.createElement('input');
    const button = document.createElement('button');




    h1.textContent = "Игра Найди пару";
    h2.textContent = "Укажите кол-во карточек по вертикали/горизонтали";

    input.type = "number";
    input.setAttribute('min', 2);
    input.setAttribute('max', 10);
    input.setAttribute('step', 2);

    input.value = 4;
    input.addEventListener('input', () => { button.disabled = input.value ? false : true; });

    button.textContent = "Начать игру";
    button.addEventListener("click", () => {
        cardSide = input.value;
        divStart.remove();
        runGame();
    })

    divNumberCards.classList.add("divNumberCards");
    divNumberCards.append(h2, input);

    divStart.append(h1, divNumberCards, button);
    console.log(h1);

    document.body.append(divStart);
}

function runGame() {
    cardIndex = 0;
    gameOver = 0;
    let firstOpenCard = {};

    table = document.createElement('table');
    document.body.append(table);

    //Сформируем колоду
    for (let a = 1; a <= cardSide ** 2 / 2; a++) cardsDeck.push(a, a);

    //Перетусуем
    cardsDeck = shuffle(cardsDeck);

    //Разложим
    cardIndex = 0;
    for (let i = 0; i < cardSide; i++) {
        const tr = document.createElement('tr');
        table.append(tr)
        for (let j = 0; j < cardSide; j++) {
            const currentCard = document.createElement('td');
            currentCard.id = cardIndex;
            currentCard.value = cardsDeck[cardIndex];
            currentCard.addEventListener("click", () => selectCardHandler(currentCard));
            tr.append(currentCard);
            cardIndex += 1;
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length,
        tempValue, randomIndex;


    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}

function selectCardHandler(currentCard) {
    if (flagCloseCard) {
        firstOpenCard.textContent = "";
        secondOpenCard.textContent = "";
        firstOpenCard.style.cursor = "pointer"
        secondOpenCard.style.cursor = "pointer"
        firstOpenCard = {};
        secondOpenCard = {};
        flagCloseCard = false;
    }
    if (!currentCard.textContent) { // если карти не открыта, то откроем
        currentCard.textContent = currentCard.value;
        currentCard.style.cursor = "default"
    } else {
        return
    }
    if (!firstOpenCard.textContent) { //если первая карта ранее не открывалась, то сохраним ее
        firstOpenCard = currentCard;
    } else { //если первая карта открывалась раннне, значит это вторая
        secondOpenCard = currentCard;
        if (secondOpenCard.value == firstOpenCard.value) { // сравним их и если совпало
            firstOpenCard.style.backgroundColor = "#88ff87";
            secondOpenCard.style.backgroundColor = "#88ff87";
            firstOpenCard = {};
            secondOpenCard = {};
            gameOver += 2;
            if (gameOver == cardSide ** 2) {
                playAgainQuestion()
            }
        } else {
            flagCloseCard = true;
        }
    }
}

function playAgainQuestion() {
    const playAgainForm = document.createElement('div');
    const playAgainText = document.createElement('h2');
    const playAgainButton = document.createElement('button');

    playAgainText.textContent = 'Игра окончена. Играем дальше?';

    playAgainButton.textContent = "Да";
    playAgainButton.addEventListener("click", () => {
        table.remove();
        playAgainForm.remove();
        startScreen();
    })

    playAgainButton.classList.add("divPlayAgainButton");
    playAgainForm.classList.add("divPlayAgainForm");

    playAgainForm.append(playAgainText, playAgainButton);
    document.body.append(playAgainForm);
}

startScreen();
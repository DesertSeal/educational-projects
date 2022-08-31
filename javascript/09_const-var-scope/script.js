function startScreen() {
    const div = document.createElement('div');
    const divNumberCards = document.createElement('div');
    const h2 = document.createElement('h2');
    const input = document.createElement('input');
    const button = document.createElement('button');

    function isInputEmpty() { button.disabled = input.value ? false : true; }
    // function changeScreen() {
    //   cardCount = 1 > input.value < 11 && input.value%2 == 0 ? input.value : 4;
    //   div.remove();
    //   runGame();
    // }

    h2.textContent = "Укажите кол-во карточек по вертикали/горизонтали";

    input.type = "number";
    input.setAttribute('min', 2);
    input.setAttribute('max', 5);

    input.value = 4;
    input.addEventListener('input', isInputEmpty);

    button.textContent = "Начать игру";
    // button.addEventListener("click", startGame)

    divNumberCards.classList.add("divNumberCards");
    divNumberCards.append(h2, input);

    div.append(divNumberCards, button);
    document.body.append(div);

}










startScreen();
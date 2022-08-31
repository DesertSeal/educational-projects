
let closeAdress = document.querySelector('.adress__close');
let adress = document.querySelector('.adress');

let searchTrigger = document.querySelector('.header__search');
let searchIcon= document.querySelector('.search__icon');
let searchInput = document.querySelector('.search__input');
let searchCloseIcon = document.querySelector('.search__close');
let searchForm = document.querySelector('.search');

let burger = document.querySelector('.burger');
let burgerClose = document.querySelector('.burger-close');
let menu = document.querySelector('.header__nav');


//ADRESS
closeAdress.addEventListener('click', function()  {
  adress.classList.remove('open')
});


// SEARCH

// Вешаем и ожидаем события

searchTrigger.addEventListener('click', function(e) {
  e.preventDefault();
  searchOpen();
})

searchCloseIcon.addEventListener('click', function(el) {
  el.preventDefault();
  searchClose();
})

// При введении данных добавляем класс для появления цвета активности
// searchInput.oninput = function() {
// searchInput.classList.add('write')
// }

const searchOpen = () => {
  searchTrigger.classList.add('opacity0');
  searchIcon.classList.add('active');
  searchInput.classList.add('active');
  searchForm.classList.add('active');
  searchCloseIcon.classList.add('active');
}
const searchClose = () => {
  searchTrigger.classList.remove('opacity0');
  searchInput.classList.remove('active');
  searchIcon.classList.remove('active');
  searchForm.classList.remove('active');
  searchCloseIcon.classList.remove('active');
}

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 27) {
    searchClose();
  }
})


window.addEventListener('click', e => {
  const target = e.target; 
  if (!target.closest('.search') && !target.closest('.header__search')
        && !target.closest('.burger'))  { 
    searchClose();
    menuClose();

  }
})


// MENU
burger.onclick = () => {
  menuOpen()
}

burgerClose.onclick = () => {
  menuClose();
}


const menuOpen = () => {
  menu.classList.add('open')
  burgerClose.classList.add('open')
  // burger.classList.add('open')
}
const menuClose = () => {
  menu.classList.remove('open')
  burgerClose.classList.remove('open')
}


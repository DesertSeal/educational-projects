// console.log('Победа')
// document.querySelector('.questions__items').style.backgroundColor = "green"
// document.querySelector('#text').classList.add('alert')
// document.querySelector('#text').classList.remove('alert')
// document.querySelector('#text').classList.toggle('alert')
//добавим класс каждому элементу .section-work__item
document.querySelectorAll('.section-work__item').forEach(function(element) {
        element.classList.add('alert')
    })
    //еще такой вариант
document.getElementsByTagName('p')
    //или же
document.getElementsById('text')
    // но тут получили не нод-лист, а коллекцию, с которой через forEach работать нельзя


//-------------------------------------------------------------------------------------------------
//---------С О Б Ы Т И Я --------------------------------------------------------------------------
//---------------------------------------(скрываем или выводим меню для БУРГЕРА)-------------------
// отработаем загрузку документа     
window.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#burger').addEventListener(click, function() {
            document.querySelector('#menu').classList.toggle('is-active')
        })
        //---------------------------------------(для строчки, по которой кликаем)--------------------------
    document.querySelectorAll('.text').forEach(function(element) {
        element.addEventListener('click', function(event) {
            event.target.classList.toggle('alert')
        })
    })

})
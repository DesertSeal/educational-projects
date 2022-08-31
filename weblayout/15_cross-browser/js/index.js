const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    loop: true,
    // пагинация
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    // навигация
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


    //effect: 'coverflow',
    //effect: 'slide',
    //effect: 'cube',

    // effect: 'fade',
    effect: 'flip',

});
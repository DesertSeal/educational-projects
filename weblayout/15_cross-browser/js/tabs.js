document.querySelectorAll('.section-work__link').forEach(function(workLink) {
    workLink.addEventListener('click', function(e) {
        const path = e.currentTarget.dataset.path;
        document.querySelectorAll('.section-work__link').forEach(function(btn) {
            btn.classList.remove('work__link--active')
        });
        e.currentTarget.classList.add('work__link--active');
        document.querySelectorAll('.h3-work').forEach(function(hWork) {
            hWork.classList.remove('work__step--active')
        });
        document.querySelectorAll('.p-work').forEach(function(pWork) {
            pWork.classList.remove('work__step--active')
        });
        document.querySelectorAll('.section-work__pict').forEach(function(swPict) {
            swPict.classList.remove('work__step--active')
        });



        document.querySelectorAll(`[data-target="${path}"]`).forEach(function(wsActive) {
            wsActive.classList.add('work__step--active');
        });
    });
});


document.querySelectorAll('.tabs-nav__btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(e) {
        const path = e.currentTarget.dataset.path;
        document.querySelectorAll('.tabs-nav__btn').forEach(function(btn) {
            btn.classList.remove('tabs-nav__btn--active')
        });
        e.currentTarget.classList.add('tabs-nav__btn--active');
        document.querySelectorAll('.tabs-item').forEach(function(tabsBtn) {
            tabsBtn.classList.remove('tabs-item--active')
        });
        document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active');
    });
});
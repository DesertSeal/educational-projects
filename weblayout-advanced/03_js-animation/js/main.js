gsap.from(".hero__title", {opacity:0,  y: 60, duration: 0.6, delay: 0.2});
gsap.from(".hero__btn", {opacity:0,  y: 60, duration: 0.6, delay: 0.2});
gsap.from(".hero__descr", {opacity:0, duration: 0.6, delay: 0.6});

gsap.from(".photos-wrap__img_1", {opacity:0, duration: 0.6, delay: 0.9});
gsap.from(".photos-wrap__img_2", {opacity:0, duration: 0.6, delay: 1.1});
gsap.from(".photos-wrap__img_3", {opacity:0, duration: 0.6, delay: 1.3});

gsap.from(".photos__author", {opacity:0, duration: 0.6, delay: 1.6});



var tl = gsap.timeline({ paused: true });
tl.addLabel("prb")
tl.add( gsap.fromTo(".menu__top", {opacity:0, y:-80}, {opacity:1, y:0, duration: 0.7}, "prb" ) );
tl.add( gsap.fromTo(".nav__list", {opacity:0, y:30}, {opacity:1, y:0, duration: 0.5}, "prb" ) );  
tl.add( gsap.fromTo(".main", {opacity:1}, {opacity:0, duration: 0.5}, "prb" ) );
tl.addLabel("prb2",)
tl.add( gsap.fromTo(".menu__right", {opacity:0, y:30}, {opacity:1, y:0, duration: 0.4}, 0.2 ) );
tl.add( gsap.fromTo(".social", {opacity:0, y:30}, {opacity:1, y:0, duration: 0.4}, 0.2 ) );  


document.querySelector(".burger").addEventListener('click', function(){
  console.log('тут')
  // document.querySelector(".menu").classList.add('menu--open');
  gsap.set(".menu", {display: "block"});
  tl.play();
  gsap.set(".main", {display: "none", delay:1 } );
})


document.querySelector(".close").addEventListener('click', function(){
  gsap.set(".main", {display: "block"});
  tl.reverse();
  gsap.set(".menu", {display: "none", delay:1 } );
})

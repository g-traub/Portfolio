const slider = document.querySelector('.slider__container');
const slides =  document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.projects__dot');
const allNode = document.querySelector('.projects__menu');
const menuScreen = document.querySelector('.menuScreen');
const menuCross = document.querySelector('.exit');
const body = document.querySelector('body');
const html = document.querySelector('html');

/* const render = num => {
  body.classList.remove('menu--open');
  html.classList.remove('menu--open');

  for (let slide of slides){
    slide.classList.remove('visible');
  }
  for (let dot of dots){
    dot.classList.remove('active');
  }
  slides[num].classList.add('visible');
  dots[num].classList.add('active');
}

const change = () => {
  let savedState = localStorage.getItem('savedState');
  switch (window.location.hash){
    case '#projects':
      if (!savedState){
        render(0);
        break;
      }
      else {
        render(savedState);
        break;
      }
    case '#alfred-slide':
    render(0);
    localStorage.setItem('savedState', 0);
    break;
    case '#umr-slide':
      render(1);
      localStorage.setItem('savedState', 1);
      break;
    case '#pacman-slide':
      render(2);
      localStorage.setItem('savedState', 2);
      break;
    case '#morty-slide':
      render(3);
      localStorage.setItem('savedState', 3);
      break;
    case '#nissin-slide':
      render(4);
      localStorage.setItem('savedState', 4);
      break;
    case '#socomptoir-slide':
      render(5);
      localStorage.setItem('savedState', 5);
      break;
    case '#about':
      if (!savedState){
        render(0);
        break;
      }
      else {
        render(savedState);
        break;
      }
    default:
        window.location.hash = '#alfred-slide';
      break;
  }
}

window.addEventListener('load', change);
window.addEventListener('hashchange', change); */

//Menu and close menu
allNode.addEventListener('click', () => {
  menuScreen.classList.add('visible');
  body.classList.add('menu--open');
  html.classList.add('menu--open');
})
menuCross.addEventListener('click', closeMenu); 


//Menu click events
const menuItems = document.querySelectorAll('.menuScreen nav div');
for(let item of menuItems){
  item.addEventListener('click', e => {
    closeMenu();
  })
}

function closeMenu () {
  menuScreen.classList.remove('visible');
  body.classList.remove('menu--open');
  html.classList.remove('menu--open');
}

//Slider manager

/* const sliderManager = new Hammer.Manager(slider);
sliderManager.add(new Hammer.Swipe({ threshold: 10, direction: 'DIRECTION_HORIZONTAL', velocity: 0.3}));
sliderManager.on('swipe', function(e) {
  console.log(e);
}); */
let canMove = true;
let position = 0;
slider.appendChild(slides[0].cloneNode(true));
const slideCount = slides.length+1;
/* let percentage = 0; */

for (let i=0 ; i<slides.length ; i++){
  const sliderHammer = new Hammer(slides[i]);
  sliderHammer.on('swiperight swipeleft tap', e => {
    if (e.type != 'tap'){
    /*   let idPrev = '';
      let idNext = ''; */
      
      switch (e.direction){
        case 2 : 
          console.log('left');
          next();
         /*  percentage-=100; */
          /* idNext = slides[i+1] ? slides[i+1].id : slides[0];
          console.log(idNext);
          window.location.hash = `#${idNext}`; */
          break;
        case 4 :
          console.log('right');
          previous();
         /*  percentage+=100; */
         /*  idPrev = slides[i-1] ? slides[i-1].id : slides[slides.length-1];
          console.log(idPrev);
          window.location.hash = `#${idPrev}`; */
          break;
      }
      console.log(slideCount);
      console.log(position);
    }
    /*   slider.style.transform = `translateX(${percentage}vw)`; */
    else{
      let name = slides[i].id.split('-')[0];
      window.location.pathname = `projects/${name}.html`;
    }
  })
}

function next(){
  if(canMove && position < slideCount-1) {
    moveTo(position + 1);
    // If the end is reached after the move
    if (position === slideCount-1) {
      setTimeout(function() {
        jumpTo(0); // Jump back to the start
      }, 300);
    }
  }
}
function previous() {
  if(canMove && position >= 0){
    if (position === 0) { // If we're at the start
      jumpTo(slideCount-1, function() { // Jump to the end
        moveTo(position - 1); // Then move to the previous slide
      });
    } else {
      moveTo(position - 1);
    }
  }
}
  
function moveTo(newPosition, jump) {
  if (!jump) { // Block the navigation for the duration of the transition (except when juming)
    canMove = false;
    setTimeout(function() {
      canMove = true;
    }, 300);
  }
  
  position = newPosition; // Update the position
  slider.style.transform = 'translateX(' + position * -100 + 'vw)'; // Update the style
};

function jumpTo(newPosition, callback) {
  window.requestAnimationFrame(function() { // Wait for the next frame
    slider.style.transition = 'none'; // Cancel transition
    moveTo(newPosition, true); // Jump to the new position

    window.requestAnimationFrame(function() { // Wait for the next frame
      slider.style.transition = 'transform 300ms'; // Reset transition
      
      if (callback) { // Call callback if any
        callback();
      }
    });
  });
}
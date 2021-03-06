const slider = document.querySelector('.slider__container');
const slides =  document.querySelectorAll('.slide');
const buttons = document.querySelectorAll('.button');
const dots = document.querySelectorAll('.projects__dot');
const allNode = document.querySelector('.circle__container');
const circleNode = document.querySelector('.circle__all');

const menuScreen = document.querySelector('.menuScreen');
const menuCross = document.querySelector('.exit');
const body = document.querySelector('body');
const html = document.querySelector('html');
let position = 0;

//desktop menu images
const images = document.querySelectorAll('.slide .slide__image');
let titleEl = document.querySelector('.active');

const activate = index => {
  let visibleEl = document.querySelector('.visible');
  visibleEl.classList.remove('visible');
  titleEl.classList.remove('active');
  let button = buttons[index];
  button.classList.add('active');
  titleEl = button;
  let image = images[index];
  image.classList.add('visible');
  position = index;
}

for (let button of buttons){
  button.addEventListener('click', e => {
    activate(e.currentTarget.id);
  })
}

//Menu and close menu
allNode.addEventListener('click', () => {
  console.log('clicked', circleNode);
  circleNode.classList.add('full');
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
  circleNode.classList.remove('full');
  menuScreen.classList.remove('visible');
  body.classList.remove('menu--open');
  html.classList.remove('menu--open');
}

//Slider manager
let canMove = true;

slider.appendChild(slides[0].cloneNode(true));
const secondAlf = document.querySelectorAll('.slider__alfred .slide__image')[1];
secondAlf.classList.remove('visible');
const slideCount = slides.length+1;
dots[position].classList.add('active');

for (let i=0 ; i<slides.length ; i++){
  const sliderHammer = new Hammer(slides[i]);
  sliderHammer.on('swiperight swipeleft tap', e => {
    if (e.type != 'tap'){
      switch (e.direction){
        case 2 : 
          next();
          break;
        case 4 :
          previous();
          break;
      }
    }
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
  dots[position] ? dots[position].classList.remove('active') : dots[0].classList.remove('active');
  if (!jump) { // Block the navigation for the duration of the transition (except when juming)
    canMove = false;
    setTimeout(function() {
      canMove = true;
    }, 300);
  }
  position = newPosition; // Update the position
  slider.style.transform = 'translateX(' + position * -100 + 'vw)'; // Update the style
  dots[position] ? dots[position].classList.add('active') : dots[0].classList.add('active');
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

//dots links
for(let dot of dots){
  dot.addEventListener('click', e => {
    moveTo(e.target.id);
  })
}

//Resize 
const resizingCheck = () => {
    if(window.matchMedia("(min-width:1000px)").matches) {
      console.log(position, typeof(position));
      for (let dot of dots){
        dot.classList.remove('active');
      }
      slider.style.transition = 'none';
      slider.style.transform = 'none';
      activate(parseInt(position));
    }
    else {
      jumpTo(position); 
    }
}
window.addEventListener('resize', resizingCheck);
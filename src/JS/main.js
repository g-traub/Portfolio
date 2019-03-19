const slides =  document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.projects__dot');
const allNode = document.querySelector('.projects__menu');
const menuScreen = document.querySelector('.menuScreen');
const menuCross = document.querySelector('.exit');
const body = document.querySelector('body');
const html = document.querySelector('html');

const render = num => {
  body.classList.remove('menu--open');
  html.classList.remove('menu--open');

  for (slide of slides){
    slide.classList.remove('visible');
  }
  for (dot of dots){
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
    case '#umr-slide':
      render(0);
      localStorage.setItem('savedState', 0);
      break;
    case '#pacman-slide':
      render(1);
      localStorage.setItem('savedState', 1);
      break;
    case '#morty-slide':
      render(2);
      localStorage.setItem('savedState', 2);
      break;
    case '#nissin-slide':
      render(3);
      localStorage.setItem('savedState', 3);
      break;
    case '#socomptoir-slide':
      render(4);
      localStorage.setItem('savedState', 4);
      break;
    case '#akira-slide':
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
        window.location.hash = '#umr-slide';
      break;
  }
}

window.addEventListener('load', change);
window.addEventListener('hashchange', change);

//Menu and close menu
allNode.addEventListener('click', () => {
  menuScreen.classList.add('visible');
  body.classList.add('menu--open');
  html.classList.add('menu--open');
})
menuCross.addEventListener('click', () => {
  menuScreen.classList.remove('visible');
  body.classList.remove('menu--open');
  html.classList.remove('menu--open');
}); 
//Lazy loading images and vids
document.addEventListener("DOMContentLoaded", yall);

//Handles nav title 
const nav = document.querySelector('.header__nav');
let reached = false;

const testPos = () => {
  let top = nav.getBoundingClientRect().top;
  if (top === 0){
    reached = true;
    nav.classList.add('reached');
  }
  else if (reached && top > 0){
    reached = false;
    nav.classList.remove('reached');
  }
  
  requestAnimationFrame(testPos);
}
requestAnimationFrame(testPos);

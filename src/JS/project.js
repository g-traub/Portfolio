const nav = document.querySelector('.header__nav');
let reached = false;

const testPos = () => {
  let top = nav.getBoundingClientRect().top;
  if (top === 0){
    console.log('top reached');
    reached = true;
    nav.classList.add('reached');
  }
  else if (reached && top > 0){
    console.log('remove');
    reached = false;
    nav.classList.remove('reached');
  }
  
  requestAnimationFrame(testPos);
}
requestAnimationFrame(testPos);
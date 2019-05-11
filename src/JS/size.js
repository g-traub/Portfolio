const iframe = document.querySelector('iframe');
const replacement = document.querySelector('.replacement');

const size = () => {
  let width = window.innerWidth;
  if (width>1200){
    replacement.classList.remove('displayed');
    iframe.classList.add('displayed');
  }
  else {
    iframe.classList.remove('displayed')
    replacement.classList.add('displayed');
  }
}
size();
window.onresize = size;
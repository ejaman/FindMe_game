const special = document.querySelector('.special');
special.addEventListener('click', (event) => {
  console.log(`rect: ${special.getBoundingClientRect()}`);
  console.log(`page x,y: ${event.pageX}, ${event.pageY}`);
  console.log(`client x,y: ${event.clientX}, ${event.clientY}`);
});

function by100() {
  scrollBy({top:100, left:0, behavior: "smooth"});
}
function to100() {
  scrollTo({top:100, behavior:"smooth"});
}
function intoSpecial() {
  // const loca = special.getBoundingClientRect().top;
  // scrollTo(0,loca);
  special.scrollIntoView({behavior:"smooth"});
}

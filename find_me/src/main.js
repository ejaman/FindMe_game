'use strict';

const gameGround = document.querySelector('.ground');
const groundRect = gameGround.getBoundingClientRect();
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const img_size = 160;

startBtn.addEventListener('click', () => {
  console.log('start');
  
  console.log(groundRect);
  play();
  showStopbtn();
})

// 게임이 실행되는 함수
function play (){
  gameGround.innerHTML = '';
  createImg('wally', 1, 'img/wally_c1.png');
  createImg('waldo', 2, 'img/wally_c2.png');
  createImg('cat', 3, 'img/cat.png');
}

// img를 만드는 함수
function createImg (className, num, path) {
  console.log('create img');  
  const x1 = 0;
  const y1 = 0;
  const x2 = groundRect.width -img_size;
  const y2 = groundRect.height -img_size;

  for(let i = 0; i < num; i++){
    const img = document.createElement('img');
    img.setAttribute('class', className);
    img.setAttribute('src', path);
    img.style.position = 'absolute'; 
    const x = randomPosition(x1, x2);
    const y = randomPosition(y1, y2);
    console.log(x1, y1);
    img.style.left =`${x}px`;
    img.style.top =`${y}px`;
    gameGround.appendChild(img);
  }

} 

function showStopbtn(){
  gameGround.scrollIntoView({behavior:"smooth", block: "center"});
  stopBtn.classList.remove('hide--stop');
}

 // position의 random을 계산해줄 함수
  function randomPosition(min, max){
    return Math.random() * (max-min) + min ;
  }
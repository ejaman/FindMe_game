'use strict';

const img_size = 160;
const wally_count = 1;
const waldo_count = 2;
const cat_count = 3;
const play_time = 10;


const gameGround = document.querySelector('.ground');
const groundRect = gameGround.getBoundingClientRect();
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const test = document.querySelector('.resume-btn');

const timerBoard = document.querySelector('.timer');
const scoreBoard = document.querySelector('.score');
const leftBoard = document.querySelector('.left');

const popUp = document.querySelector('.popup');
const msg = document.querySelector('.message');
const popuBtn = document.querySelector('.refresh');

let started = false;
let score = 0;
let timer = undefined;


startBtn.addEventListener('click', () => {
  console.log('start');
  Start();
});

gameGround.addEventListener('click',(event) => {
  const target = event.target;
  if(target.matches('.wally')){
    console.log('click wally');
    target.remove();
  } else if( target.matches('.waldo')){
    console.log('click waldo');
    target.remove();
  } else{
    // 게임이 멈추도록!
  }
});

stopBtn.addEventListener('click',() => {
  showPopup('다시 시작!');
  Stop();
  test.addEventListener('click', () => {
    showStopbtn();
    hidePopup();
    startTimer(stringToInt(timerBoard.innerHTML));
  })
});

popuBtn.addEventListener('click', () => {
  Start();
  hidePopup();
})

function Start(){
  play();
  showStopbtn();
  startTimer(play_time);
}

function Stop(){
  stopTimer();
}


// 타이머 
function startTimer(playtime){
  // let sec = play_time;
  timerBoard.innerHTML =`${playtime} 초`;
  timer = setInterval(() => {
    if(playtime <= 0){
      clearInterval(timer);
      showPopup();
      return;
    }
    timerText(--playtime);
  },1000);
}

function stringToInt(s){
  return parseInt(s);
}

function stopTimer(){
  clearInterval(timer);
}

function timerText(sec){
  // const time= sec % 60;
  timerBoard.innerHTML =`${sec}`;
}


// 게임이 실행되는 함수
function play (){
  gameGround.innerHTML = '';
  leftBoard.innerHTML = waldo_count + wally_count;
  scoreBoard.innerHTML = '0 점'
  createImg('cat', cat_count, 'img/cat.png');
  createImg('wally', wally_count, 'img/wally_c1.png');
  createImg('waldo', waldo_count, 'img/wally_c2.png');
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

// 게임이 시작하면서 stop 버튼을 보여줌
function showStopbtn(){
  gameGround.scrollIntoView({behavior:"smooth", block: "center"});
  stopBtn.classList.remove('hide--stop');
}

function showPopup(text){
  msg.innerHTML = text;
  popUp.classList.remove('popup--hide');
}
function hidePopup(){
  popUp.classList.add('popup--hide');
}

 // position의 random을 계산해줄 함수
  function randomPosition(min, max){
    return Math.random() * (max-min) + min ;
  }
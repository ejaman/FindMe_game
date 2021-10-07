'use strict';

const img_size = 160;
const wally_count = 1;
const waldo_count = 2;
const cat_count = 3;
const play_time = 5;

const gameGround = document.querySelector('.ground');
const groundRect = gameGround.getBoundingClientRect();
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const resume = document.querySelector('.resume-btn');

const timerBoard = document.querySelector('.timer');
const Unit = document.querySelector('.unit');
const scoreBoard = document.querySelector('.score');
const leftBoard = document.querySelector('.left');

const popUp = document.querySelector('.popup');
const msg = document.querySelector('.message');
const popuBtn = document.querySelector('.refresh');

let score = 0;
let timer = undefined;

// 시작 버튼
startBtn.addEventListener('click', () => {
  console.log('start');
  Start();
});
// 이미지 클릭
gameGround.addEventListener('click',(event) => {
  const target = event.target;
  if(target.matches('.wally') || target.matches('.waldo')){
    target.remove();
    score++;
    scoreText();
    if(score === waldo_count + wally_count){
      Finish(true);
    }
  } else if ( target.matches('.cat')){
    Finish(false);
  }
});
// 멈춤 버튼
stopBtn.addEventListener('click',() => {
  showPopup('다시 시작? 돌아가기?');
  Stop();
});

// 있는 자리에서 다시 시작
resume.addEventListener('click', () => {
  showStopbtn();
  hidePopup();
  startTimer(stringToInt(timerBoard.innerHTML));
})
// 처음부터 다시 시작
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

function Finish(win){
  if(win){
    showPopup('💃축하합니다🕺');
  }else{
    showPopup('💩재도전?💩')
  }
  stopTimer();
}

// 타이머 
function startTimer(playtime){
  showunit();
  timerBoard.innerHTML =`${playtime}`;
  timer = setInterval(() => {
    if(playtime <= 0){
      clearInterval(timer);
      showPopup('Time over!');
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
  timerBoard.innerHTML =`${sec}`;
}
function scoreText() {
  scoreBoard.innerHTML = `${score } 점`;
  leftBoard.innerHTML = `${waldo_count + wally_count - score}`
}

// 게임이 실행되는 함수
function play (){
  gameGround.innerHTML = '';
  score = 0;
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
  hideStopbtn();

}
function showunit(){
  Unit.classList.remove('hide--unit');
}
function hideStopbtn(){
  gameGround.scrollIntoView({behavior:"smooth", block: "center"});
  stopBtn.classList.add('hide--stop');
}
function hidePopup(){
  popUp.classList.add('popup--hide');
}

 // position의 random을 계산해줄 함수
  function randomPosition(min, max){
    return Math.random() * (max-min) + min ;
  }
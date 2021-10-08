'use strict';
const BG1 = new Audio('./sound/level1.mp3');
const win = new Audio('./sound/game_win.mp3');
const lose = new Audio('./sound/bug.mp3');
const dog = new Audio('./sound/dog.mp3');
const alert = new Audio('./sound/alert.wav');
const click = new Audio('./sound/carrot.mp3');

const img_size = 160;
const wally_count = 1;
const waldo_count = 1;
let dog_count = 1;
const play_time = 5;

const gameGround = document.querySelector('.ground');
const groundRect = gameGround.getBoundingClientRect();
const startBtn = document.querySelector('.start-btn');
const footerBtn = document.querySelector('.footer-btn');
const resumeBtn = document.querySelector('.resume-btn');

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
gameGround.addEventListener('click', onGroundClick);
// 멈춤 버튼
footerBtn.addEventListener('click',() => {
  if(footerBtn.innerHTML === 'stop'){
    showPopup('다시 시작? 돌아가기?');
    Stop();
  }else{
    gameGround.innerHTML = '';
    nextlevel();
  }

  Sound(click);
});

// 있는 자리에서 다시 시작
resumeBtn.addEventListener('click', () => {
  gameGround.addEventListener('click', onGroundClick);
  showFooterbtn('stop');
  hidePopup();
  startTimer(stringToInt(timerBoard.innerHTML));
})
// 처음부터 다시 시작
popuBtn.addEventListener('click', () => {
  gameGround.addEventListener('click', onGroundClick);
  Start();
  hidePopup();
  Sound(alert);
  
})

function Start(){
  play();
  Sound(BG1);
  showFooterbtn('stop');
  startTimer(play_time);
}

function Stop(){
  stopTimer();
  stopSound(BG1);
}

function Finish(win){
  if(win){
    showPopup('💃축하합니다🕺');
    showFooterbtn('level 2')
  }else{
    showPopup('💩재도전?💩')
  }
  stopTimer();
  gameGround.removeEventListener('click', onGroundClick);
}

function Sound(sound){
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound){
  sound.pause();
}

function onGroundClick(event) {
  const target = event.target;
  if(target.matches('.wally') || target.matches('.waldo')){
    target.remove();
    score++;
    scoreText();
    Sound(click);
    if(score === waldo_count + wally_count){
      Finish(true);
      stopSound(BG1);
      Sound(win);
    }
  } else if ( target.matches('.dog')){
    Finish(false);
    stopSound(BG1);
    Sound(dog);
  }
}

// 타이머 
function startTimer(playtime){
  showunit();
  Sound(BG1);
  timerBoard.innerHTML =`${playtime}`;
  timer = setInterval(() => {
    if(playtime <= 0){
      clearInterval(timer);
      showPopup('Time over!');
      stopSound(BG1);
      Sound(lose);
      gameGround.removeEventListener('click', onGroundClick);
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
  createImg('dog',dog_count, 'img/dog.png');
  createImg('wally', wally_count, 'img/wally_c1.png');
  createImg('waldo', waldo_count, 'img/wally_c2.png');
}

function nextlevel(){
  console.log('next level');  
  dog_count = dog_count + 5;
  Start();
  hidePopup();
  startTimer(); // 타이머 이상함 
  gameGround.addEventListener('click', onGroundClick);
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

// 게임이 시작하면서 아래의 버튼을 보여줌
function showFooterbtn(footertext){
  footerBtn.innerHTML = footertext;
  gameGround.scrollIntoView({behavior:"smooth", block: "center"});
  footerBtn.classList.remove('hide--footer');
}

function showPopup(text){
  msg.innerHTML = text;
  popUp.classList.remove('popup--hide');
  hideFooterbtn();
  if(text === '다시 시작? 돌아가기?'){
    showresumeBtn(true);
  }else{
    showresumeBtn(false);
  }
}
function hidePopup(){
  popUp.classList.add('popup--hide');
}
function showresumeBtn(show){
  if(show){
    resumeBtn.classList.remove('hide--resume');
  }else{
    resumeBtn.classList.add('hide--resume');
  }
}
function hideFooterbtn(){
  gameGround.scrollIntoView({behavior:"smooth", block: "center"});
  footerBtn.classList.add('hide--footer');
}
function showunit(){
  Unit.classList.remove('hide--unit');
}



 // position의 random을 계산해줄 함수
  function randomPosition(min, max){
    return Math.random() * (max-min) + min ;
  }



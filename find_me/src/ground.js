'use strict';
// ground 클릭, 이미지의 랜덤 포지션 담당
import * as sound from './sound.js';
const img_size = 160;

export const ItemType = Object.freeze({
  waldo: 'waldo',
  wally: 'wally',
  dog: 'dog',
  wiz: 'wiz'
});

export default class Ground{
  constructor(wally_count, waldo_count, obs_count){
    this.wally_count = wally_count;
    this.waldo_count = waldo_count;
    this.obs_count = obs_count;

    this.gameGround = document.querySelector('.ground');
    this.groundRect = this.gameGround.getBoundingClientRect();

    // 이미지 클릭
  this.gameGround.addEventListener('click', this.onGroundClick);
  }

// 게임이 실행되는 함수
play (){
  this.gameGround.innerHTML = '';
  this.createImg('dog', this.obs_count, 'img/dog.png');
  this.createImg('wiz', this.obs_count, 'img/wiz.png');
  this.createImg('wally', this.wally_count, 'img/wally_c1.png');
  this.createImg('waldo', this.waldo_count, 'img/wally_c2.png');
}
deleteEvent(){
  this.gameGround.removeEventListener('click', this.onGroundClick);
}
// 콜백 등록할 수 있도록
setClickListener(onItemClick) {
  this.onItemClick = onItemClick;
}
  // img를 만드는 함수
createImg (className, num, path) { 
  const x1 = 0;
  const y1 = 0;
  const x2 = this.groundRect.width -img_size;
  const y2 = this.groundRect.height -img_size;

  for(let i = 0; i < num; i++){
    const img = document.createElement('img');
    img.setAttribute('class', className);
    img.setAttribute('src', path);
    img.style.position = 'absolute'; 
    const x = randomPosition(x1, x2);
    const y = randomPosition(y1, y2);
    img.style.left =`${x}px`;
    img.style.top =`${y}px`;
    this.gameGround.appendChild(img);
  }
} 

onGroundClick = (event) => {
  const target = event.target;
  if(target.matches('.wally') || target.matches('.waldo')){
    sound.playClick();
    target.remove();
    this.onItemClick && this.onItemClick(ItemType.waldo);
  } else if ( target.matches('.dog')){
    sound.playDog();
    this.onItemClick && this.onItemClick(ItemType.dog);
  } else if (target.matches('.wiz')){
    sound.playLose();
    this.onItemClick && this.onItemClick(ItemType.wiz);
  }
}

}
 // position의 random을 계산해줄 함수
function randomPosition(min, max){
  return Math.random() * (max-min) + min ;
}

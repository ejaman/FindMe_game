'use strict';
// ground 클릭, 이미지의 랜덤 포지션 담당
const img_size = 160;

export const ItemType = Object.freeze({
  waldo: 'waldo',
  wally: 'wally',
  dog: 'dog'
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
  // score = 0;
  // leftBoard.innerHTML = waldo_count + wally_count;
  // scoreBoard.innerHTML = '0 점'
  this.createImg('dog',this.obs_count, 'img/dog.png');
  this.createImg('wally', this.wally_count, 'img/wally_c1.png');
  this.createImg('waldo', this.waldo_count, 'img/wally_c2.png');
}
// 콜백 등록할 수 있도록
setClickListener(onItemClick) {
  this.onItemClick = onItemClick;
}
  // img를 만드는 함수
createImg (className, num, path) {
  console.log('create img');  
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
    console.log(x1, y1);
    img.style.left =`${x}px`;
    img.style.top =`${y}px`;
    this.gameGround.appendChild(img);
  }
} 

onGroundClick = (event) => {
  const target = event.target;
  if(target.matches('.wally') || target.matches('.waldo')){
    target.remove();
    console.log('waldo!');
    this.onItemClick && this.onItemClick(ItemType.waldo);
    // score++;
    // scoreText();
    // sound.playClick();
    // if(score === waldo_count + wally_count){
    //   Finish(true);
    //   sound.stopBg();
    //   sound.playWin();
    // }
  } else if ( target.matches('.dog')){
    console.log('dog!')
    this.onItemClick && this.onItemClick(ItemType.dog);
    // Finish(false);
    // sound.stopBg();
    // sound.playDog();
  }
}

}
 // position의 random을 계산해줄 함수
function randomPosition(min, max){
  return Math.random() * (max-min) + min ;
}

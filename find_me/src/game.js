'use strict'; // 레벨 설정도 여기서!

import Ground from "./ground.js";
import { ItemType } from "./ground.js";


//bulider pattern
export default class GameBuilder {
  playtime(playtime) {
    this.playtime = this.playtime;
    return this;
  }

  wallycount(num) {
    this.wallycount = num;
    return this;
  }

  waldocount(num) {
    this.waldocount = num;
    return this;
  }

  obscount(num) {
    this.obscount = num;
    return this;
  }

  build(){
    return new Game(
      this.playtime,
      this.wallycount,
      this.waldocount,
      this.obscount
    );
  }
}


class Game{
  constructor(playtime, wallycount, waldocount, obscount){
    this.wally_count = wallycount;
    this.waldo_count = waldocount;
    this.obs_count = obscount;
    this.play_time =  playtime;

    this.startBtn = document.querySelector('.start-btn');
    this.footerBtn = document.querySelector('.footer-btn');
    this.timerBoard = document.querySelector('.timer');
  
    this.scoreBoard = document.querySelector('.score');
    this.leftBoard = document.querySelector('.left');  
    this.Unit = document.querySelector('.unit');
    // this.level = document.querySelector('p');

    // 시작 버튼
    this.startBtn.addEventListener('click', () => {
      console.log('start');
      this.Start();
    });
    // 멈춤 버튼
    this.footerBtn.addEventListener('click',() => {
      if(this.footerBtn.innerHTML === 'stop'){
        // popup.show('다시 시작? 돌아가기?');
        this.Stop();
      }else{
        // gameGround.innerHTML = '';
        //nextlevel?
      }
      // sound.playClick();
    });

    this.ground = new Ground(wallycount, waldocount, obscount);
    this.ground.setClickListener(this.onItemClick);

    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop){
    this.onGameStop = onGameStop;
  }

  Start(){
    // play();
    this.ground.play();
    // sound.playBg();
    this.showFooterbtn('stop');
    this.startTimer(this.play_time);
  }
  
  Stop(){
    this.stopTimer();
    // sound.stopBg();
    this.onGameStop && this.onGameStop(reason); 
  }

  onItemClick = (item) =>{
    if(item === ItemType.waldo){
      this.score++;
      this.timer_scoreText();
      if( this.score === this.waldo_count + this.wally_count){
        console.log('win');
        // this.stop(Reason.win);
      }
    }else if(item === ItemType.dog){
      console.log('lose');
      // this.stop(Reason.lose);
    }
  }


  Finish(win){
    if(win){
      // popup.show('💃축하합니다🕺');
      this.showFooterbtn('level 2')
    }else{
      // popup.show('💩재도전?💩');
    }
    this.stopTimer();
    this.ground.gameGround.removeEventListener('click', ground.onGroundClick);
    // gameGround.removeEventListener('click', onGroundClick);
  }
  
  startTimer(playtime){
    this.showunit();
    // sound.playBg();
    this.timerBoard.innerHTML =`${playtime}`;
    this.timer = setInterval(() => {
      if(playtime <= 0){
        clearInterval(timer);
        // popup.show('Time over!');// check!
        // sound.stopBg();
        // sound.playLose();
        this.ground.gameGround.removeEventListener('click', ground.onGroundClick);
        // gameGround.removeEventListener('click', onGroundClick);
        return;
      }
      this.timer_scoreText(--playtime);
    },1000);
  }
  // stringToInt(s){   =>ground????
  //   return parseInt(s);
  // }
  
  stopTimer(){
    clearInterval(this.timer);
  }

  timer_scoreText(sec) { 
    this.timerBoard.innerHTML =`${this.sec}`;
    this.scoreBoard.innerHTML = `${this.score } 점`;
    this.leftBoard.innerHTML = `${this.waldo_count + this.wally_count - this.score}`
  }
  
  // nextlevel(){
  //   console.log('next level');  
  //   obs_count = obs_count + 5;
  //   Start();
  //   popup.hide();
  //   startTimer(play_time); // 타임 오버 렉 걸림
  //   ground.gameGround.addEventListener('click', ground.onGroundClick);
  //   // gameGround.addEventListener('click', onGroundClick);
  // }
  
  // 게임이 시작하면서 아래의 버튼을 보여줌
  showFooterbtn(footertext){
    this.footerBtn.innerHTML = footertext;
    this.ground.gameGround.scrollIntoView({behavior:"smooth", block: "center"});
    this.footerBtn.classList.remove('hide--footer');
  }
  hideFooterbtn(){
    this.ground.gameGround.scrollIntoView({behavior:"smooth", block: "center"});
    this.footerBtn.classList.add('hide--footer');
  }
  showunit(){
    this.Unit.classList.remove('hide--unit');
  }

}
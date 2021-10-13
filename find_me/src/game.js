'use strict'; 
// 본 게임 실행, 레벨 설정도 여기서!

import * as sound from './sound.js';
import Ground,{ ItemType } from "./ground.js";
import PopUp from './popup.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  stop: 'stop',
  timeout : 'timeout'
});

//bulider pattern
export default class GameBuilder {
  playtime(time) {
    this.playtime = time;
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
      this.Start();
    });
    // 멈춤 버튼
    this.footerBtn.addEventListener('click',() => {
      sound.playClick();
      if(this.footerBtn.innerHTML === 'stop'){
        this.Stop(Reason.stop);
      }else if(this.footerBtn.innerHTML === 'level 2'){
        this.level2();
      }
    });

    this.ground = new Ground(wallycount, waldocount, obscount);
    this.pop = new PopUp();
    this.ground.setClickListener(this.onItemClick);
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop){
    this.onGameStop = onGameStop;
  }

  Start(){
    sound.playBg();
    this.ground.deleteEvent(false);
    this.ground.play();
    this.showFooterbtn('stop');
    this.startTimer(this.play_time);
    this.score = 0;
    this.scoreBoard.innerHTML = '0 점';
    this.leftBoard.innerHTML = this.waldo_count + this.wally_count;
  }
  // 잠시 멈춤
  reStart(){
    sound.playBg();
    this.startTimer(this.stringToInt(this.timerBoard.innerHTML));
    this.ground.deleteEvent(false);
  }   
  Stop(reason){
    sound.stopBg();
    this.stopTimer();
    this.ground.deleteEvent(true);
    this.onGameStop && this.onGameStop(reason); 
  }

  level2(){
  console.log('next level');  
  this.pop.hide();

  // 팝업이 안보여야함 ✅ 
  // 누르면 다시 시작되어야함 
  // 누르면 장애물과 윌리의 숫자가 늘어나야함
  // 누르면 이미지가 움직여야함
  // 누르면 버튼 메시지가 바뀌어야함
  }

  onItemClick = (item) =>{
    if(item === ItemType.waldo){
      this.score++;
      this.score_Text();
      if( this.score === this.waldo_count + this.wally_count){
        this.Stop(Reason.win);
        this.Finish(true);
        sound.stopBg();
      }
    }else if(item === ItemType.dog){
      sound.stopBg();
      this.Stop(Reason.lose);
      this.Finish(false);
    }else if(item === ItemType.wiz){
      sound.stopBg();
      this.Stop(Reason.lose);
      this.Finish(false);
    }
  }

  startTimer(playtime){
    this.showunit();
    this.timerBoard.innerHTML =`${playtime}`;
    this.timer = setInterval(() => {
      if(playtime <= 0){
        clearInterval(this.timer);
        this.Stop(Reason.timeout);
        this.ground.deleteEvent(true);
        this.hideFooterbtn();
        return;
      }
      this.timer_Text(--playtime);
    },1000);
  }
  
  // 멈추고 시작
  stringToInt(s){   
    return parseInt(s);
  }
  stopTimer(){
    clearInterval(this.timer);
  }

  timer_Text(sec) { 
    this.timerBoard.innerHTML =`${sec}`;
  }

  score_Text() { 
    this.scoreBoard.innerHTML = `${this.score} 점`;
    this.leftBoard.innerHTML = `${this.waldo_count + this.wally_count - this.score}`
  }
  
  Finish(win){
    this.ground.deleteEvent(true);
    this.hideFooterbtn();
    if(win){
      this.showFooterbtn('level 2')
    }else{
    }
    this.stopTimer();
  }

  // 게임이 시작하면서 아래의 버튼을 보여줌
  showFooterbtn(footertext){
    this.footerBtn.innerHTML = `${footertext}`;
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
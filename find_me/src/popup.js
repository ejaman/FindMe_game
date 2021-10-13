'use strict';
import Game from './game.js';

export default class PopUp {
  constructor(){
    this.popUp = document.querySelector('.popup');
    this.msg = document.querySelector('.message');
    this.popuBtn = document.querySelector('.refresh');
    this.resumeBtn = document.querySelector('.resume-btn');
    this.popuBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
    // 있는 자리에서 다시 시작
    this.resumeBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }
    // popup class를 쓰는 사람이 클릭 리스너를 등록할 수 있다
    setClickListener(onClick){
      this.onClick = onClick;
    }

    show(text){
      this.msg.innerHTML = text;
      this.popUp.classList.remove('popup--hide');

      hideFooterbtn();
      if(text === '다시 시작? 돌아가기?'){
        showresumeBtn(true);
      }else{
        showresumeBtn(false);
      }
    }
    hide(){
      this.popUp.classList.add('popup--hide');
    }

    showresumeBtn(show){
      if(this.show){
        this.resumeBtn.classList.remove('hide--resume');
      }else{
        this.resumeBtn.classList.add('hide--resume');
      }
    }
}
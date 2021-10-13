'use strict';

import PopUp from './popup.js';
import GameBuilder from './game.js';

import * as sound from './sound.js';
import { Reason } from './game.js';


// 어떤 값을 설정하는지 한 눈에 알아보기 쉬움
const playGame = new GameBuilder()
.playtime(3)
.wallycount(2)
.waldocount(1)
.obscount(5)
.build();

const popup = new PopUp();

playGame.setGameStopListener((reason) => {
  let message;
  switch(reason) {
    case Reason.stop:
      sound.playAlert();
      message = '다시 시작? 돌아가기?';
      break;
    case Reason.win:
      message = '💃축하합니다🕺';
      sound.playWin();
      break;
    case Reason.lose:
      message = '💩재도전?💩';
      break;
    case Reason.timeout:
      message = '⏰TimeOut!⏰';
      break;
    default:
      throw new Error('not valid reason');
  }
  popup.show(message);
});

popup.setClickListener(() => {
  playGame.Start();
});





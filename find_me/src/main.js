'use strict';

import PopUp from './popup.js';
import GameBuilder from './game.js';

import * as sound from './sound.js';


// 어떤 값을 설정하는지 한 눈에 알아보기 쉬움
const playGame = new GameBuilder()
.playtime(3)
.wallycount(2)
.waldocount(1)
.obscount(5)
.build();
const popup = new PopUp();





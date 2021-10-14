'use strict';
// 소리 담당
const Bg1 = new Audio('./sound/level1.mp3');
const Bg2 = new Audio('./sound/level2.mp3');
const Bg3 = new Audio('./sound/level3.mp3');
const win = new Audio('./sound/game_win.mp3');
const lose = new Audio('./sound/bug.mp3');
const dog = new Audio('./sound/dog.mp3');
const alert = new Audio('./sound/alert.wav');
const click = new Audio('./sound/carrot.mp3');
const time = new Audio('./sound/time.mp3');

export function playBg() {
  Sound(Bg1);
}
export function playBg2() {
  Sound(Bg2);
}
export function playBg3() {
  Sound(Bg3);
}
export function playWin() {
  Sound(win);
}
export function playLose() {
  Sound(lose);
}
export function playDog() {
  Sound(dog);
}
export function playAlert() {
  Sound(alert);
}
export function playClick() {
  Sound(click);
}
export function playTime() {
  Sound(time);
}
export function stopBg() {
  stopSound(Bg1);
  stopSound(Bg2);
  stopSound(Bg3);
}

function Sound(sound){
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound){
  sound.pause();
}
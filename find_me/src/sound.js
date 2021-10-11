'use strict';
// 소리 담당
const Bg1 = new Audio('./sound/level1.mp3');
const win = new Audio('./sound/game_win.mp3');
const lose = new Audio('./sound/bug.mp3');
const dog = new Audio('./sound/dog.mp3');
const alert = new Audio('./sound/alert.wav');
const click = new Audio('./sound/carrot.mp3');

export function playBg() {
  Sound(Bg1);
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
export function stopBg() {
  stopSound(Bg1);
}



function Sound(sound){
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound){
  sound.pause();
}
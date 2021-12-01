# where's wally game


<img width="1374" alt="스크린샷 2021-10-14 오후 11 37 06" src="https://user-images.githubusercontent.com/82802784/137339779-3a8ebe97-43bc-4ad9-bae6-cc726b68235f.png">

🔗링크: https://ejaman.github.io/FindMe_game/find_me/




1. 레벨 추가(add level)
+ 레벨 별 다른 배경음 추가(Add background sound for each level)
+ 레벨이 올라갈 수록 시간과 캐릭터 수가 증가(As the level goes up, the time and number of characters increase)
+ 홈 버튼 아래 레벨 표기(level is under the home button)

2. 팝업 버튼(popup btn)
: 게임 중에는 중지를 위해 stop버튼이 있지만 게임이 끝나면 버튼이 사라짐(Stop button is only visible during game)

3. 일시정지 버튼(Pause btn)
: 기존에는 다시 시작 버튼만 있었다면 멈춤 버튼을 추가해 사용자가 잠시 멈추었다가 다시 게임을 진행할 수 있게 만듦(by adding a pause button, the user can pause and resume the game)

4. 점수와 남은 캐릭터 수 모두 표기(Mark both the score and the remaining number)
: 기존에는 남은 수만 표기했다면 점수와 남은 수를 모두 표기함

5. 렉 해결(problem solve)
: 기존에는 게임이 완료되어 팝업이 뜨더라도 캐릭터를 누를 수 있고 또 그에 따라 게임 결과가 바뀌었다면 지금은 팝업이 뜨면 캐릭터를 클릭할 수 없게 만듦
(before: after the game was completed and a pop-up appeared, user still can click the character, and the game result changed accordingly, 
after: the pop-up appears and the character cannot be clicked.)
 
로고 옆 캐릭터에 깃허브 링크도 연결!
(You can view my GitHub by clicking the character next to find me!)
 
<br /><br /><br />
 
 ## 소감

 공부하는 김에 새로 만들어본거라 시간도 생각보다 오래걸렸고 어려웠지만 완성해서 뿌듯했다.<br />
 
 
 어려웠던 부분
 1. 일시 정지<br />
 시간을 어떻게 받아와야 할지 몰라서 고민하다 스코어 보드에 있는 남은 시간을 dom요소로 받아서 해결
 
 2. 넥스트 레벨<br />
 다음 레벨로 넘어갈 때 진짜 게임처럼 게임이 끝나면 다음 레벨로 넘어가는 버튼이 뜨고 누르면 바로 게임이 실행되도록 만들고 싶었음
 버튼은 간단하게 해결했지만 게임은 레벨별 play함수를 만들어서 해결해야 했음
 중복되는 부분이 많은것도 알고 지져분해보였지만 다른 방법을 몰라서 일단 구현함
 
 3. 캐릭터 추가<br />
 단순히 캐릭터를 추가하는건 어렵지 않았는데 클릭해야할 윌리 캐릭터를 추가하는게 어려웠음
 윌리를 추가해도 남은 윌리 수나 게임 기능에 반영되지 않는 문제가 생김
 레벨 별 다른 수의 윌리를 주고싶어 play 함수로 만들것을 시도해봤지만 실패해서 그냥 숫자를 더하는 방식으로 만듦
 
 
 <br /><br /><br />
## 참조
<img width="948" alt="136240911-1c140cba-004c-4294-808f-9b12db910a98" src="https://user-images.githubusercontent.com/82802784/137343165-efafcf4b-8599-4907-8c94-7d7650493704.png">

+  시간내에 벌레를 피해 당근을 다 뽑으면 이기는 게임 (win if you click all the carrots while avoiding the bugs)
+  당근 클릭시 당근이 사라지며 남은 당근 갯수가 내려감 (When you click the carrot, the carrot disappears and the number of remaining carrots decreases)
+  벌레를 클릭하거나 시간이 다되면 게임에서 지게 됨 (If you click the bug or run out of time, you lose the game)
+  중지 버튼을 통해 게임을 다시 시작할 수 있음 (If you want to start over click stop -> refresh button)
+  당근과 벌레의 위치는 무작위로 지정 (Items are randomly positioned)
+  버튼은 폰트어썸의 아이콘을 사용해서 만듦 (use fontawesome)


<br /><br /><br />
 
 <br /><br /><br />

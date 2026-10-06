let goals=0,attempts=0,score=0,locked=false;
const maxAttempts=5;
const ball=document.getElementById("ball");
const keeper=document.getElementById("keeper");
const result=document.getElementById("result");
const goalsText=document.getElementById("goals");
const attemptsText=document.getElementById("attempts");
const scoreText=document.getElementById("score");

const positions={left:"25%",center:"50%",right:"75%"};

function shoot(direction){
 if(locked||attempts>=maxAttempts)return;
 locked=true; attempts++;

 const dirs=["left","center","right"];
 const keeperDirection=dirs[Math.floor(Math.random()*3)];

 keeper.style.left=positions[keeperDirection];
 keeper.style.transform="translateX(-50%) rotate("+
   (keeperDirection==="left" ? "-25deg" : keeperDirection==="right" ? "25deg" : "0deg")+")";

 ball.style.left=positions[direction];
 ball.style.bottom=direction==="center"?"205px":"190px";

 setTimeout(()=>{
   if(direction===keeperDirection){
     result.textContent="🧤 ТОСУП КАЛДЫ!";
     score=Math.max(0,score-2);
   }else{
     goals++; score+=10;
     result.textContent="⚽ ГООООЛ! 🔥";
   }
   updateScore();
 },550);

 setTimeout(()=>{
   ball.style.left="50%"; ball.style.bottom="48px";
   keeper.style.left="50%"; keeper.style.transform="translateX(-50%)";
   if(attempts>=maxAttempts){
     result.textContent=`🏆 Оюн бүттү! ${goals}/5 гол | ${score} упай`;
   }else{
     result.textContent="Кийинки пенальтиге даяр!";
     locked=false;
   }
 },1300);
}

function updateScore(){
 goalsText.textContent=goals;
 attemptsText.textContent=attempts;
 scoreText.textContent=score;
}

function restartGame(){
 goals=0; attempts=0; score=0; locked=false;
 ball.style.left="50%"; ball.style.bottom="48px";
 keeper.style.left="50%"; keeper.style.transform="translateX(-50%)";
 result.textContent="Бурчту танда!";
 updateScore();
}
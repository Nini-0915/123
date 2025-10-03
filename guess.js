const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
const result = document.querySelector(".result");
const count = document.querySelector(".count");



let countNum =0;   //廣域變數
let randomNumber = Math.ceil(Math.random()*100);
console.log("觀察隨機的數字：", randomNumber);

function checkGuess() {
    countNum++;
    count.textContent = "猜測次數："+countNum;
    //guessField.focus();       //游標焦點預設在輸入欄位裡
    const userGuess = Number(guessField.value);  //取得欄位值，並轉為數字
    if  (  userGuess === randomNumber ) {
        result.textContent = "猜測結果：Congratulations!" ;
    }
    else if (userGuess < randomNumber ) {
        result.textContent = "猜測結果：數字太小!" ;
    }
    else if (userGuess > randomNumber ) {
        result.textContent = "猜測結果：數字太大!";
    }

}
guessSubmit.addEventListener("click", checkGuess);   //當按鈕被點擊，執行函式
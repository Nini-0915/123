const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
const result = document.querySelector(".result");
const count = document.querySelector(".count");
const guesses = document.querySelector(".guesses");
const restartBtn = document.querySelector(".restartBtn");

let countNum = 0;
let randomNumber = Math.ceil(Math.random() * 100);
console.log("觀察隨機的數字：", randomNumber)

function checkGuess() {
    countNum++;
    count.textContent = "猜測次數：" + countNum;

    const userGuess = Number(guessField.value);
    guesses.textContent += userGuess + " ";

    if (userGuess === randomNumber) {
        let comment = "";
        let textColor = "";

        if (countNum <= 3) {
            comment = "🎯 神準高手！";
            textColor = "#ffd700"; // 金色
        } else if (countNum <= 6) {
            comment = "👍 不錯的表現！";
            textColor = "#00bcd4"; // 藍綠色
        } else {
            comment = "😅 還可以，再加油！";
            textColor = "#ff9800"; // 橘色
        }

        result.textContent = "猜測結果：🎉 恭喜猜中！ " + comment;
        result.style.backgroundColor = "#4caf50";  // 綠色背景
        result.style.color = textColor;            // 評價文字顏色
        result.classList.add("success");

        alert("你猜中了！" + comment);
        setGameOver();
    }
    else if (userGuess < randomNumber) {
        result.textContent = "猜測結果：📉 數字太小!" ;
        result.style.backgroundColor = "#fff3cd";
        result.style.color = "#856404";
    }
    else {
        result.textContent = "猜測結果：📈 數字太大!";
        result.style.backgroundColor = "#fff3cd";
        result.style.color = "#856404";
    }

    if (countNum >= 10 && userGuess !== randomNumber) {
        result.textContent += " 🚫 遊戲結束！";
        result.style.backgroundColor = "#ffcdd2";
        result.style.color = "#c62828";
        alert("遊戲結束！");
        setGameOver();
    }

    guessField.value = "";
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
}

function initGame() {
    countNum = 0;
    randomNumber = Math.ceil(Math.random() * 100);
    console.log("新遊戲隨機數字：", randomNumber);

    count.textContent = "猜測次數：0";
    guesses.textContent = "歷史猜測：";
    result.textContent = "猜測結果：";
    result.style.backgroundColor = "#e0e0e0";
    result.style.color = "#333";
    result.classList.remove("success");

    guessField.disabled = false;
    guessSubmit.disabled = false;

    guessField.value = "";
    guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", initGame);
result.classList.add("success");

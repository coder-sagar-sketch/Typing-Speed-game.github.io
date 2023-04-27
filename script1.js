

const testWrapper = document.querySelector('.text-wrapper');
const testArea = document.querySelector('#textArea');
const origintext = document.querySelector('.text');
const resetbutton = document.querySelector('#reset');
const thetimer = document.querySelector('.timer');

let timer = [0, 0, 0, 0];
let interval;
let timerrunning = false;
let isTextMatched = false;

function leadingtime(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

//run the clock
function runtimer() {
  let currenttime = leadingtime(timer[0]) + ":" + leadingtime(timer[1]) + ":" + leadingtime(timer[2]);
  thetimer.innerHTML = currenttime;
  timer[3]++;
  timer[0] = Math.floor((timer[3] / 100) / 60);
  timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

  if (isTextMatched) {
    clearInterval(interval);
  }
}

//reset function
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerrunning = false;

  testArea.value = "";
  thetimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = 'green';
}

function spellcheck() {
  let textEntered = testArea.value;
  let origintextMatch = origintext.innerHTML.substring(0, textEntered.length);

  if (textEntered == origintext.innerHTML) {
    testWrapper.style.borderColor = 'orange';
    clearInterval(interval);
    isTextMatched = true;
  } else {
    if (textEntered == origintextMatch) {
      testWrapper.style.borderColor = 'green';
    } else {
      testWrapper.style.borderColor = 'red';
    }
  }
}

//start the timer

function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0) {
    timerrunning = true;
    interval = setInterval(runtimer, 10);
  }
}


//event listner

testArea.addEventListener('keypress', start, false);
testArea.addEventListener('keyup', spellcheck, false);
resetbutton.addEventListener('click', reset, false);



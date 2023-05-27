const start_btn = document.querySelector(".start_btn button");
const infor_box = document.querySelector(".infor_box");
const exit_btn = infor_box.querySelector(".buttons .quit");
const continue_btn = infor_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const next_btn = quiz_box.querySelector(".next_btn");
const option_list = document.querySelector(".option_list");
const time_line = quiz_box.querySelector(".time_line");
const result_box = document.querySelector(".result_box");
const restart_btn = result_box.querySelector(".buttons .restart");
const quit_btn = result_box.querySelector(".buttons .quit");


start_btn.onclick = () => {
  infor_box.classList.add("activeInfo");
  start_btn.style.display = "none";
};
exit_btn.onclick = () => {
  infor_box.classList.remove("activeInfo");
  start_btn.style.display = "block";
};

continue_btn.onclick = () => {
  next_btn.style.display = "none";
  infor_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestions();
  startTimer(timeDefault);
  startTimerLine(timeDefault)
};
next_btn.onclick = () => {
  next_btn.style.display = "none";
  clearInterval(timeID);
  clearInterval(timeline);
  if (ques_count < questions.length - 1) {
    ques_count++;
    showQuestions();
    startTimerLine(timeDefault);

    startTimer(timeDefault);
  } else {
    result_box.classList.add("activeResult");
    quiz_box.classList.remove("activeQuiz");
  }
};
let ques_count = 0;

function showQuestions() {
  const ques_text = document.querySelector(".ques_text");
  ques_text.innerHTML =
    "<span>" +
    Number(ques_count + 1) +
    ". " +
    questions[ ques_count ].question +
    "</span>";

  let option_tag = "";
  for (let i = 0; i < questions[ ques_count ].options.length; i++) {
    option_tag +=
      '<div class="option">' + questions[ ques_count ].options[ i ] + "</div>";
  }

  option_list.innerHTML = option_tag;
  const total_que = document.querySelector(".total_ques");
  total_que.innerHTML =
    "<span>" +
    Number(ques_count + 1) +
    " of " +
    questions.length +
    " questions " +
    "</span>";
  const option = option_list.querySelectorAll(".option");
  option.forEach((element) => {
    element.setAttribute("onclick", "optionSelected(this)");
  });
}

let tickIcon =
  '<div class="iconTick"><i class="ri-checkbox-circle-line"></i></div>';
let crossIcon =
  '<div class="iconCross"><i class="ri-close-circle-line"></i></div>';

function showCorrect(answer) {
  let useranswer = answer.textContent;
  let correctanswer = questions[ ques_count ].answer;
  answer.classList.add("correct");
  console.log("Answer is correct");
  answer.insertAdjacentHTML("beforeend", tickIcon);
}
function showIncorrect(answer) {
  let useranswer = answer.textContent;
  let correctanswer = questions[ ques_count ].answer;
  answer.classList.add("incorrect");
  answer.insertAdjacentHTML("beforeend", crossIcon);
  const alloption = option_list.children.length;
}
let userScore = 0;
function optionSelected(answer) {
  next_btn.style.display = "block";
  clearInterval(timeID);
  clearInterval(timeline);
  const alloption = option_list.children.length;
  let useranswer = answer.textContent;
  let correctanswer = questions[ ques_count ].answer;

  if (useranswer == correctanswer) {
    showCorrect(answer);
    userScore += 1;
    const score_text = result_box.querySelector(".score_text");
    score_text.innerHTML = "<span>" + 'You got ' + userScore + ' out of ' + questions.length + "</span>";
  } else {
    showIncorrect(answer);
    for (let i = 0; i < alloption; i++) {
      if (option_list.children[ i ].textContent == correctanswer) {
        showCorrect(option_list.children[ i ]);
      }
    }
  }
  disabled();

}

function disabled() {
  const alloption = option_list.children.length;
  for (let i = 0; i < alloption; i++) {
    option_list.children[ i ].classList.add("disabled");
  }
}
let timer = quiz_box.querySelector(".timer_sec");
let timeDefault = Number(timer.textContent);
let timeID;

function startTimer(time) {
  time = timeDefault;
  timer.textContent = time;
  timeID = setInterval(() => {
    time--;
    if (time == 0) {
      clearInterval(timeID);
      disabled();
      next_btn.style.display = "block";
      const alloption = option_list.children.length;
      for (let i = 0; i < alloption; i++) {
        let useranswer = option_list.children[ i ].textContent;
        let correctanswer = questions[ ques_count ].answer;
        if (option_list.children[ i ].textContent == correctanswer) {
          showCorrect(option_list.children[ i ]);
        }
      }
    }
    timer.textContent = time;
  }, 1000);
}
let timeline;
time_line.style.width = '100%';
function startTimerLine(time) {
  time = 100;
  time_line.style.width = time + '%';
  timeline = setInterval(() => {
    time -= (100 / timeDefault);
    if (time <= 0) {
      time = 0;
    }
    time_line.style.width = time + '%';

  }, 1000);
}

quit_btn.onclick = () => {
  window.location.reload();
}
restart_btn.onclick = () => {
  infor_box.classList.add("activeInfo");
  result_box.classList.remove("activeResult");
  userScore = 0;
  ques_count = 0;
}
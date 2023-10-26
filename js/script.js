"use strict";

import { DATA } from "./database.js"; 
import { modal } from "./modal.js";
import { shuffle } from "./shuffle.js";

let questionBlock = document.querySelector(".question");
let answersBlock = document.querySelector(".answers");
let scorer = document.querySelector(".scorer");

const deck = shuffle(DATA);
const wrongAnswers = [];
let counter = 0;

function initQuestion(counter) {
  let answers = [];
  
  for (let j = 0; j < deck[counter].answers.length; j++) {
    answers.push(deck[counter].answers[j]);
  }
  answers = shuffle(answers);
  questionBlock.innerHTML = deck[counter].question;

  function createAnswers () {
    for (let i = 0; i < answers.length; i++) {
      let answer = document.createElement("div");
      answer.classList.add("answer");
      answer.dataset.status = answers[i].status;
      answer.dataset.content = answers[i].name;
      answer.innerText = `${i + 1}. ${answers[i].name}`;
      answersBlock.append(answer);
    }
  }

  createAnswers()
  scorer.innerHTML = `${(counter + 1) + " / " + deck.length}`
  answersBlock.querySelectorAll(".answer").forEach(answer => {
    answer.addEventListener("click", function () {
      if (this.dataset.status === "true") {
        answer.style.backgroundColor = "#adff2f";
      } else {
        answer.style.backgroundColor = "#ff0000";
        wrongAnswers.push({
          "question": deck[counter].question,
          "selectedAnswer": answer.dataset.content,
          "correctAnswer": deck[counter].answers.find((answers) => answers.status).name
        });
      }
      setTimeout(
        () => {
          if(counter < deck.length - 1) {
            ++counter;
            initQuestion(counter);
          } else {
            modal(wrongAnswers);
          }
        }, 400
        )
        setTimeout(() => {
          document.querySelectorAll(".answer").forEach(answer => answer.remove());
        }, 300)
      })
  })
}

initQuestion(counter);
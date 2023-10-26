export const modal = wrongAnswers => {
  const modalBlock = document.createElement("div");
  modalBlock.className = "modal";
  const modalContent = document.createElement("div");
  modalContent.className = "modalContent";
  const btns = document.createElement("div");
  btns.className = "btns";

  modalBlock.append(modalContent);
  if(wrongAnswers.length) {
    for (let i = 0; i < wrongAnswers.length; i++) {
      let card = document.createElement("section");
      card.className = "card";
      card.innerHTML = `
        <h4>${i + 1}</h4>
        <div class="question">${wrongAnswers[i].question}</div>
        <div class="selected__answer">${wrongAnswers[i].selectedAnswer}</div>
        <div class="correct__answer">${wrongAnswers[i].correctAnswer}</div>
      `;
      modalContent.append(card);
    }
  } else {
    modalContent.innerText = "Everything is correct!"
  }
  modalContent.append(btns)
  btns.innerHTML = `
    <button class="btn" onClick={window.location.reload()}>Restart</button>
  `;
  document.body.prepend(modalBlock);
}
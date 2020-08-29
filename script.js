// INPUT FORM SELECTORS
const inputForm = document.querySelector(".input-fields__form");
const formDate = document.querySelector(".form__date");
const formTime = document.querySelector(".form__time");
const formInput = document.querySelector(".form__input");

//TIMER CONTAINER
const container = document.querySelector(".container");
const taskTemplate = document.querySelector("#timer__template");

let lists = [];

// INPUT FORM EVENT
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateString = formDate.value;
  const eventName = formInput.value;
  const time = formTime.value;
  formInput.value = "";
  let dateArray = [];
  dateArray = dateString.split("-");
  dateArray.push(...time.split(":"));
  const data = returnObjData(eventName, dateArray);
  lists.push(data);
  renderTimer();
});

const renderTimer = () => {
  clearContainer();
  lists.forEach((list) => {
    renderContainer(list);
  });
};

const renderContainer = (list) => {
  const timerContainer = document.importNode(taskTemplate.content, true);
  const daysContainer = timerContainer.querySelector(".days");
  const hoursContainer = timerContainer.querySelector(".hours");
  const minutesContainer = timerContainer.querySelector(".minutes");
  const secondsContainer = timerContainer.querySelector(".seconds");
  const eventElement = timerContainer.querySelector(".timer__event");
  const deleteBtn = timerContainer.querySelector(".delete__btn");
  const timerDatas = timerContainer.querySelector(".timer__data");
  deleteBtn.setAttribute("data-id", list.id);
  eventElement.innerText = list.name;
  container.appendChild(timerContainer);
  let futureTime = new Date(
    +list.date[0],
    +list.date[1] - 1,
    +list.date[2],
    +list.date[3],
    +list.date[4]
  ).getTime();
  const interval = setInterval(() => {
    let currentTime = new Date().getTime();
    let distance = futureTime - currentTime;
    // 1000 for ms
    // 60 for minutes and seconds
    // 24 for hours
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      timerDatas.innerHTML = "Event Finished";
      clearInterval(interval);
    }

    daysContainer.innerText = days;
    hoursContainer.innerText = hours;
    minutesContainer.innerText = minutes;
    secondsContainer.innerText = seconds;
  }, 1000);
};

const clearContainer = () => {
  container.innerHTML = "";
};

const returnObjData = (name, finalDate) => {
  return { id: Date.now().toString(), name: name, date: finalDate };
};

container.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete__btn")) {
    id = target.getAttribute("data-id");
    lists = lists.filter((list) => list.id !== id);
    renderTimer();
  }
});

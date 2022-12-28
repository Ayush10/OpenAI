import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent.length > 3) {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let i = 0;

  let interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const date = Date.now();
  const random = Math.random();
  const hexadecimalString = random.toString(16);

  return `id-${date}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return `
    <div class="wrapper ${isAi && "ai"}">
      <div class="chat">
        <div class="profile">
          <img src=${isAi ? bot : user} alt="${isAi ? "bot" : "user"}" />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
    `;
}

const handleSubmit = async (event) => {
  event.preventDefault();

  const data = new FormData(form);

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  // bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (event) => {
  //  check if the key pressed is enter and then submit the form
  if (event.key === "Enter") {
    handleSubmit(event);
  }
});

const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Boss...");
  } else if (hour >= 12 && hour < 17) {
    // Correcting the range of hour
    speak("Good Afternoon Master...");
  } else {
    speak("Good Evening Sir...");
  }
}

async function getData(prompt) {
  try {
    console.log("function called");
    const URL = `http://localhost:3000/gemini`;
    const reqData = {
      prompt,
    };
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(reqData),
    });
    const data = await res.json();

    return data;

    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("load", () => {
  speak("Initializing ALPHA..");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  content.textContent = "Listening....";
  recognition.start();
});

function takeCommand(message) {
  if (message.includes("hey") || message.includes("hello")) {
    speak("Hello Sir, How May I Help You?");
  } else if (message.includes("what about tampu")) {
    speak("sach a loda hearted person");
  } else if (message.includes("madam g") || message.includes("madam ji")) {
    speak("i cant say anything she is just oswm...");
  } else if (message.includes("what about guddu")) {
    speak("Chota hulk");
  } else if (message.includes("what about Gurpreet")) {
    speak("kya hi bolu isko.. do skip go for next question");
  } else if (message.includes("what about ritik")) {
    speak("bukha pandit");
  } else if (message.includes("what about mohit sir")) {
    speak(
      "would you like to say mohit sir C language teacher .........samjna thoda sa complex hai per teacher mast hai"
    );
  } else if (message.includes("what about joginder sir")) {
    speak(
      "would you like to say joginder sir multiple subjects teacher ....... friendly teacher hai and really owsm but have some problem about teaching i can't say more and hello Joginder sir"
    );
  } else if (message.includes("what about arvind sir")) {
    speak(
      "would you like to say arvind sir multiple subjects teacher ....... handling full stack programing subject is really a hard task soo big salute to arvind sir"
    );
  } else if (message.includes("open google")) {
    window.open("https://google.com", "_blank");
    speak("Opening Google...");
  } else if (message.includes("open youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("Opening Youtube...");
  } else if (message.includes("open facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("Opening Facebook...");
  } else if (
    message.includes("what is") ||
    message.includes("who is") ||
    message.includes("what are")
  ) {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText = "This is what i found on internet regarding " + message;
    speak(finalText);
  } else if (message.includes("wikipedia")) {
    window.open(
      `https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,
      "_blank"
    );
    const finalText = "This is what i found on wikipedia regarding " + message;
    speak(finalText);
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const finalText = time;
    speak(finalText);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    const finalText = date;
    speak(finalText);
  } else if (message.includes("calculator")) {
    window.open("Calculator:///");
    const finalText = "Opening Calculator ";
    speak(finalText);
  } else {
    getData("hi").then((message) => {
      speak(message.message);
      console.log(message.message);
    });
  }
}

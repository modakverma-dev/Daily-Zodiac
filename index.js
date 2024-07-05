const fetchHoroscopeData = async (sign) => {
  if (!sign) throw new Error("No sign provided");

  try {
    const response = await fetch(
      `http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    let regex =
      /\(c\) Kelli Fox, The Astrologer, http:\/\/new\.theastrologer\.com/g;
    const horoscope = data.horoscope;
    let result = horoscope.replace(regex, "");
    return result;
  } catch (error) {
    console.error(`Error fetching horoscope for ${sign}:`, error);
    return "";
  }
};
const list = [
  {
    sign: "aries",
    prediction: "",
    image: "./images/aries.png",
  },
  {
    sign: "taurus",
    prediction: "",
    image: "./images/taurus.png",
  },
  {
    sign: "leo",
    prediction: "",
    image: "./images/leo.png",
  },
  {
    sign: "virgo",
    prediction: "",
    image: "./images/virgo.png",
  },
  {
    sign: "cancer",
    prediction: "",
    image: "./images/cancer.png",
  },
  {
    sign: "libra",
    prediction: "",
    image: "./images/libra.png",
  },
  {
    sign: "aquarius",
    prediction: "",
    image: "./images/pisces.png",
  },
  {
    sign: "scorpio",
    prediction: "",
    image: "./images/scorpion.png",
  },
  {
    sign: "sagittarius",
    prediction: "",
    image: "./images/sagittarius.png",
  },
  {
    sign: "gemini",
    prediction: "",
    image: "./images/gemini.png",
  },
  {
    sign: "pisces",
    prediction: "",
    image: "./images/pisces.png",
  },
  {
    sign: "capricorn",
    prediction: "",
    image: "./images/capricorn.png",
  },
];

const updateHoroscopeData = async () => {
  try {
    for (let i = 0; i < list.length; i++) {
      const sign = list[i].sign.toLowerCase();
      const prediction = await fetchHoroscopeData(sign);
      list[i].prediction = prediction ? prediction : "";
    }
    updateSlider();
  } catch (error) {
    console.error("Error updating horoscope data:", error);
  }
};

const updateSlider = () => {
  const sliderElem = document.querySelector(".slider");
  sliderElem.style.setProperty("--quantity", list.length);
  sliderElem.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    const itemElem = document.createElement("div");
    const imageElem = document.createElement("img");
    imageElem.setAttribute("src", list[i]?.image);
    itemElem.classList.add("item");
    itemElem.style.setProperty("--position", i + 1);
    const headingElem = document.createElement("h1");
    const pElem = document.createElement("p");
    pElem.innerText = list[i]?.prediction;
    headingElem.innerText = list[i]?.sign;
    itemElem.appendChild(headingElem);
    itemElem.appendChild(imageElem);
    itemElem.appendChild(pElem);
    sliderElem.appendChild(itemElem);
  }
};

updateHoroscopeData();

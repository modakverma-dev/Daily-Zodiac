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
    const horoscope = data.horoscope;
    return horoscope;
  } catch (error) {
    console.error(`Error fetching horoscope for ${sign}:`, error);
    return "";
  }
};
const list = [
  {
    sign: "aries",
    prediction: "",
  },
  {
    sign: "taurus",
    prediction: "",
  },
  {
    sign: "leo",
    prediction: "",
  },
  {
    sign: "virgo",
    prediction: "",
  },
  {
    sign: "cancer",
    prediction: "",
  },
  {
    sign: "libra",
    prediction: "",
  },
  {
    sign: "aquarius",
    prediction: "",
  },
  {
    sign: "scorpio",
    prediction: "",
  },
  {
    sign: "sagittarius",
    prediction: "",
  },
  {
    sign: "gemini",
    prediction: "",
  },
  {
    sign: "pisces",
    prediction: "",
  },
  {
    sign: "capricorn",
    prediction: "",
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
    itemElem.classList.add("item");
    itemElem.style.setProperty("--position", i + 1);
    const headingElem = document.createElement("h1");
    const pElem = document.createElement("p");
    pElem.innerText = list[i]?.prediction;
    headingElem.innerText = list[i]?.sign;
    itemElem.appendChild(headingElem);
    itemElem.appendChild(pElem);
    sliderElem.appendChild(itemElem);
  }
};

updateHoroscopeData();

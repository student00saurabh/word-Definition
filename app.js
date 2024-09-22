let inp = document.querySelector("input");
let btn = document.querySelector("button");

let b2 = document.querySelector(".box2");
let b3 = document.querySelector(".box3");
let b4 = document.querySelector(".box4");

btn.addEventListener("click", async () => {
  let word = inp.value;
  let means = await getmeaning(word);
  console.log(means);
  for (mean of means) {
    allCall(mean);
  }
});

function allCall(mean) {
  let ms = mean.meanings;
  for (m of ms) {
    finalMeaning(m);
  }
  let ps = mean.phonetics;

  let voice = document.querySelector("audio");
  for (p of ps) {
    console.log("audio...", p.audio);
    voice.setAttribute("src", p.audio);
    b3.prepend(voice);
  }
}

function finalMeaning(m) {
  let ats = m.antonyms;
  console.log("Antonyms ", ats);
  let p1 = document.createElement("p");
  p1.innerText = `Antonyms: ${ats}`;
  b4.appendChild(p1);

  let defis = m.definitions;
  for (defi of defis) {
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let p4 = document.createElement("p");
    let p5 = document.createElement("p");

    console.log("Defi...", defi.definition);
    p3.innerText = `Definition: ${defi.definition}`;
    b4.appendChild(p3);

    console.log("Defi...", defi.example);
    p4.innerText = `Examples: ${defi.example}`;
    b4.appendChild(p4);
  }

  let parts = m.partOfSpeech;
  console.log("Parts of speech ", parts);
  let p6 = document.createElement("p");
  p6.innerText = `Parts of Speech: ${m.partOfSpeech}`;
  b3.appendChild(p6);

  let synos = m.synonyms;
  for (syno of synos) {
    console.log(" Synonyms ", syno);
    let p7 = document.createElement("p");
    p7.innerText = `Synonyms:-> ${syno}`;
    b3.appendChild(p7);
  }
}

let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function getmeaning(word) {
  try {
    let res = await axios.get(url + word);
    inp.value = " ";
    return res.data;
  } catch (e) {
    console.log("Error: ", e);
    return "Error !";
  }
}

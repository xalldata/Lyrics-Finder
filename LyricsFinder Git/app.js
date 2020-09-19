const form = document.getElementById("form");
const myInput = document.querySelector(".input");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("submitted");
  fetch("https://api.lyrics.ovh/suggest/" + myInput.value.trim())
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showData(data);

      console.log(data.data[0]);

      const boutonAll = document.querySelectorAll(".lyrics");

      boutonAll.forEach((bouton) => {
        bouton.addEventListener("click", function (e) {
          e.preventDefault();

          fetch(e.target.href)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              showLyrics(data);
              console.log(data.lyrics);
            });
        });
      });
    });
});

function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function showLyrics(data) {
  const sectionAll = document.querySelectorAll("section");

  sectionAll.forEach((section) => {
    removeAllChildren(section);
    body.removeChild(section);
  });

  var section = document.createElement("section");
  section.classList.add("section-new");

  var pLyrics = document.createElement("p");
  var myLyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  pLyrics.innerHTML = myLyrics;

  section.appendChild(pLyrics);

  body.appendChild(section);
}

const body = document.querySelector("body");

function showData(data) {
  const sectionAll = document.querySelectorAll("section");

  sectionAll.forEach((section) => {
    removeAllChildren(section);
    body.removeChild(section);
  });
  data.data.map((dat) => {
    var section = document.createElement("section");
    section.classList.add("section");

    var artist = document.createElement("h1");
    artist.classList.add("artist");

    var song = document.createElement("p");
    song.classList.add("song");
    artist.textContent = dat.artist.name + " -";
    song.textContent = " " + dat.title;

    var getLyrics = document.createElement("div");
    getLyrics.classList.add("get-lyrics");

    //Liens vers les paroles

    var lien = document.createElement("a");
    lien.href = `https://api.lyrics.ovh/v1/${dat.artist.name}/${dat.title}`;
    lien.classList.add("lyrics");
    lien.textContent = "Get the lyrics";

    getLyrics.appendChild(lien);

    var titlArtist = document.createElement("div");
    titlArtist.classList.add("title-artist");

    titlArtist.appendChild(artist);
    titlArtist.appendChild(song);

    section.appendChild(titlArtist);
    section.appendChild(getLyrics);

    body.appendChild(section);

    console.log("title :" + dat.title);
    console.log("artist :" + dat.artist.name);
  });
}

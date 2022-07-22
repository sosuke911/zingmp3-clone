const songs = [
  {
    name: "2AM",
    singer: "Justatee, Bigdaddy",
    path: "./assets/audio/song1.mp3",
    image: "./assets/img/song/song1.jpg",
    album: "Dù Anh Có Đứng Lại (Single)",
    time: "4:18",
  },
  {
    name: "Bâng Khuâng",
    singer: "Justatee",
    path: "./assets/audio/song2.mp3",
    image: "./assets/img/song/song2.jpg",
    album: "Bâng Khuâng (Single)",
    time: "4:20",
  },
  {
    name: "She Neva Knows",
    singer: "Justatee",
    path: "./assets/audio/song3.mp3",
    image: "./assets/img/song/song3.jpg",
    album: "She Neva Knows (Single)",
    time: "4:49",
  },
  {
    name: "Cuộc Gọi Cuối (Last Call)",
    singer: "Justatee",
    path: "./assets/audio/song4.mp3",
    image: "./assets/img/song/song4.jpg",
    album: "Cuộc Gọi Cuối (Last Call)",
    time: "4:36",
  },
  {
    name: "Crying Over You",
    singer: "Justatee, Binz",
    path: "./assets/audio/song5.mp3",
    image: "./assets/img/song/song5.jpg",
    album: "Crying Over You (Single)",
    time: "5:39",
  },
  {
    name: "Cơn Mưa Cuối",
    singer: "Justatee, Binz",
    path: "./assets/audio/song6.mp3",
    image: "./assets/img/song/song6.jpg",
    album: "Cơn Mưa Cuối (Single)",
    time: "5:28",
  },
];

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const songListEl = $(".song__list");

//render song
songs.forEach((song) => {
  const html = `
  <div class="song ">
                <div class="song__main">
                  <img class="song__img" src="${song.image}" alt="" />
                  <div>
                    <div class="song__name">
                      <h4>${song.name}</h4>
                    </div>
                    <div class="song__singer">${song.singer}</div>
                  </div>
                </div>
                <div class="song__album">${song.album}</div>
                <div class="song__time">${song.time}</div>
              </div>
  `;
  songListEl.insertAdjacentHTML("beforeend", html);
});
const songsEl = $$(".song");
const audio = $("audio");
const source = $("source");
songsEl[0].classList.add("song__playing");
audio.onpause = function () {
  $(".playlist__img img").classList.remove("spin");
};
audio.onplay = function () {
  $(".playlist__img img").classList.add("spin");
};
//render total songs and times
let totalMinutes = 0;
let totalSeconds = 0;
const totalEl = $(".song__total");
songs.forEach((song) => {
  let time = song.time.split(":");
  totalMinutes += +time[0];
  totalSeconds += +time[1];
});
totalMinutes = totalMinutes + Math.floor(totalSeconds / 60);
totalSeconds = totalSeconds - Math.floor(totalSeconds / 60) * 60;
totalEl.insertAdjacentHTML(
  "afterbegin",
  `<p>${songs.length} bài hát • ${totalMinutes} phút ${totalSeconds} giây</p>`
);
//render song current
const controlEl = $(".control");
function renderSongCurrent(song) {
  const html = `
    <div class="control__song">
          <div class="control__img">
            <img src="${song.image}" alt="" />
          </div>
          <div>
            <div class="control__name">${song.name}</div>
            <div class="control__singer">${song.singer}</div>
          </div>
          <div class="control__song-icon">
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
    `;
  controlEl.insertAdjacentHTML("afterbegin", html);
}

// play onclick music
let currentSong = 0;
for (let i = 0; i < songsEl.length; i++) {
  songsEl[i].addEventListener("click", function () {
    const html = `
    <div class="control__song">
          <div class="control__img">
            <img src="${songs[i].image}" alt="" />
          </div>
          <div>
            <div class="control__name">${songs[i].name}</div>
            <div class="control__singer">${songs[i].singer}</div>
          </div>
          <div class="control__song-icon">
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
    `;
    currentSong = i;

    $(".control__song").style.display = "none";
    source.src = `${songs[i].path}`;
    audio.load();
    audio.play();
    if ($(".song__playing")) {
      $(".song__playing").classList.remove("song__playing");
    }
    $(".playlist__img img").classList.add("spin");
    songsEl[i].classList.add("song__playing");
    controlEl.insertAdjacentHTML("afterbegin", html);
  });

  //next, previous buttons

  function nextSong() {
    if (currentSong == 5) {
      currentSong = 0;
    } else {
      currentSong = currentSong + 1;
    }
    $(".song__playing").classList.remove("song__playing");
    songsEl[currentSong].classList.add("song__playing");
    source.src = songs[currentSong].path;
    $(".control__song").style.display = "none";
    renderSongCurrent(songs[currentSong]);
    audio.load();
    audio.play();
  }

  function previousSong() {
    if (currentSong == 0) {
      currentSong = 5;
    } else {
      currentSong = currentSong - 1;
    }
    $(".song__playing").classList.remove("song__playing");
    songsEl[currentSong].classList.add("song__playing");
    source.src = songs[currentSong].path;
    $(".control__song").style.display = "none";
    renderSongCurrent(songs[currentSong]);
    audio.load();
    audio.play();
  }
}

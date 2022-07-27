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
  {
    name: "Real Love",
    singer: "Justatee, Kimmese",
    path: "./assets/audio/song7.mp3",
    image: "./assets/img/song/song7.jpg",
    album: "She Neva Knows (Single)",
    time: "3:36",
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
}
//next, previous buttons
function nextSong() {
  if (currentSong == songs.length - 1) {
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
    currentSong = songs.length - 1;
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
const repeatEl = $("#repeat");
repeatEl.addEventListener("click", function () {
  if (repeatEl.dataset.repeat == "true") {
    repeatEl.classList.remove("repeat");
    repeatEl.dataset.repeat = "false";
  } else if (repeatEl.dataset.repeat == "false") {
    repeatEl.classList.add("repeat");
    repeatEl.dataset.repeat = "true";
  }
});
const replayEl = $("#replay");
replayEl.addEventListener("click", function () {
  if (replayEl.dataset.replay == "true") {
    replayEl.classList.remove("replay");
    replayEl.dataset.replay = "false";
  } else if (replayEl.dataset.replay == "false") {
    replayEl.classList.add("replay");
    replayEl.dataset.replay = "true";
  }
});
//format time
function formatTime(sec_num) {
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

  hours = hours < 10 ? (hours > 0 ? "0" + hours : 0) : hours;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return (hours !== 0 ? hours + ":" : "") + minutes + ":" + seconds;
}

//set progress
function setProgress(e) {
  const width = e.offsetX;
  const progress = e.currentTarget;
  const progressBarWidth = (width / progress.clientWidth) * 100;
  let { duration } = audio;
  bar.style.width = `${progressBarWidth}%`;

  audio.currentTime = (width * duration) / progress.clientWidth;
}
const progressBar = document.querySelector(".progress-song");
progressBar.addEventListener("click", function (e) {
  console.log(e.currentTarget);
  setProgress(e);
  audio.play();
});

//progress bar
const bar = document.querySelector(".bar");
const currentTimeDisplay = document.querySelector(".current-time");
const durationTimeDisplay = document.querySelector(".duration-time");
function updateProgress() {
  durationTimeDisplay.textContent = songs[currentSong].time;
  const { currentTime, duration } = audio;
  const percentWidth = (currentTime / duration) * 100;
  bar.style.width = `${percentWidth}%`;

  const time = formatTime(currentTime);

  currentTimeDisplay.textContent = time;
}
if (!audio.ended) {
  setInterval(updateProgress, 1000);
}

// when audio ended
audio.onended = function () {
  if (replayEl.dataset.replay == "true") {
    source.src = songs[currentSong].path;
    audio.load();
    audio.play();
  } else {
    if (currentSong == songs.length - 1 && repeatEl.dataset.repeat == "false") {
    } else {
      nextSong();
    }
  }
};

//onclick pause/play btn
const changeBtn = document.querySelector("#change-btn");
changeBtn.addEventListener("click", function () {
  if (document.querySelector(".change.fa-play")) {
    changeBtn.classList.remove("fa-play");
    changeBtn.classList.add("fa-pause");
    audio.play();
  } else {
    changeBtn.classList.remove("fa-pause");
    changeBtn.classList.add("fa-play");
    audio.pause();
  }
});

//onpause/play
audio.onpause = function () {
  $(".playlist__img img").classList.remove("spin");
  changeBtn.classList.remove("fa-pause");
  changeBtn.classList.add("fa-play");
};
audio.onplay = function () {
  $(".playlist__img img").classList.add("spin");

  changeBtn.classList.remove("fa-play");
  changeBtn.classList.add("fa-pause");
};

//remove album in mobile
if ($(".sidebar").clientWidth < 740) {
  $$(".songs__header-item")[1].remove();
  const albumsEl = $$(".song__album");
  for (let album of albumsEl) {
    album.remove();
  }
}

// ---- volume ----
const volumeIcon = document.querySelector("#volume-icon");
audio.volume = 0.5;
volumeIcon.addEventListener("click", function () {
  if (document.querySelector(".volume.fa-volume-high")) {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-xmark");
    audio.volume = 0;
  } else {
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.add("fa-volume-high");
    audio.volume = 0.5;
  }
});
//set Volume
const progressVolume = document.querySelector(".progress-volume");
const barVolume = document.querySelector(".bar-volume");
function setVolume(e) {
  const width = e.offsetX;
  const progress = e.currentTarget;
  const progressBarWidth = (width / progress.clientWidth) * 100;
  barVolume.style.width = `${progressBarWidth}%`;

  audio.volume = width / progress.clientWidth;
}
progressVolume.addEventListener("click", function (e) {
  setVolume(e);
});

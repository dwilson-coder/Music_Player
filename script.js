const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');



// Music information
const songs = [{
    name: 'track-1',
    displayName: 'Funk Background ',
    artist: 'MountainFlow',
  },
  {
    name: 'track-2',
    displayName: 'Modern Classic',
    artist: 'CyrilNikitin',
  },
  {
    name: 'track-3',
    displayName: 'Set It Up',
    artist: 'Shane Ivers',
  },
  {
    name: 'track-4',
    displayName: 'Dirty Gertie ',
    artist: 'Shane Ivers',
  },
  {
    name: 'track-5',
    displayName: 'All That',
    artist: 'Benjamin Tissot (AKA Bensound) ',
  }
];

// Check if a song is playing
let isPlaying = false;


// Play song function
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play-circle', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();

}

// pause song function
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play-circle');
  playBtn.setAttribute('title', 'Play');
  music.pause();


}



// Event listeners; Play or Pause music
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Updates the DOM with details from music library
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

//Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }



  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}




// On load, select the first song
loadSong(songs[songIndex]);

// Update the Progress Bar and Time
function updateProgressBar(e) {
  if (isPlaying) {
    const {
      duration,
      currentTime
    } = e.srcElement;


    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);
    if (duration < 10) {
      durationSeconds = `0${durationSeconds}`;
    }


    // Delay switching duration element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set place on Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const {
    duration
  } = music;
  music.currentTime = (clickX / width) * duration;
}


// Event listener to control which song plays next
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

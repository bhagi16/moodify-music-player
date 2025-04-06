const audio = document.getElementById('audio');
const moodButtons = document.querySelectorAll('[data-mood]');
const quoteEl = document.getElementById('quote');
const emojiContainer = document.getElementById('emoji-container');
const themeToggle = document.getElementById('themeToggle');

const moodTracks = {
  happy: [
    'https://www.bensound.com/bensound-music/bensound-happyrock.mp3',
    'https://www.bensound.com/bensound-music/bensound-summer.mp3'
  ],
  sad: [
    'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
    'https://www.bensound.com/bensound-music/bensound-tomorrow.mp3'
  ],
  energetic: [
    'https://www.bensound.com/bensound-music/bensound-epic.mp3',
    'https://www.bensound.com/bensound-music/bensound-extremeaction.mp3'
  ],
  calm: [
    'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
    'https://www.bensound.com/bensound-music/bensound-love.mp3'
  ]
};

const moodQuotes = {
  happy: "Happiness is a direction, not a place.",
  sad: "Tears come from the heart and not from the brain.",
  energetic: "Energy and persistence conquer all things.",
  calm: "Peace begins with a smile."
};

const moodEmojis = {
  happy: "😊",
  sad: "💧",
  energetic: "🔥",
  calm: "🌙"
};

function createFloatingEmojis(mood) {
  emojiContainer.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.innerText = moodEmojis[mood];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.animationDuration = 3 + Math.random() * 2 + 's';
    emoji.style.fontSize = 16 + Math.random() * 24 + 'px';
    emojiContainer.appendChild(emoji);
  }
}

function speakMood(mood) {
  const msg = new SpeechSynthesisUtterance(`You selected ${mood}. Let's get started.`);
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.getAttribute('data-mood');
    document.body.className = mood;
    const tracks = moodTracks[mood];
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    audio.src = randomTrack;
    audio.play();
    quoteEl.textContent = moodQuotes[mood];
    createFloatingEmojis(mood);
    speakMood(mood);
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.innerHTML = document.body.classList.contains('dark') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

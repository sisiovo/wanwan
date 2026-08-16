// Wanwan Character Data
const wanwanData = {
  name: 'Wanwan',
  moods: ['happy', 'neutral', 'sad', 'angry', 'shy'],
  
  greetings: [
    '汪！看到你开心！',
    '主人回来啦！',
    '今天过得怎么样呀？',
    '我好想你！',
    '汪嘿嘿~'
  ],
  
  responses: {
    happy: ['好开心呀汪！', '嘿嘿~最喜欢主人了！', '今天也要开开心心的！', '汪呜~心情超好！'],
    neutral: ['嗯嗯，我在呢', '就这样待着也挺好', '主人今天怎么样？', '汪...发呆中'],
    sad: ['呜...不太开心', '想被摸摸头', '主人陪我好不好...', '汪...有点难过'],
    angry: ['哼！气死我了！', '你惹我生气！', '不理你了！', '汪！！'],
    shy: ['呜...被你看着好害羞', '不要这样看我...', '脸红了啦', '汪...不好意思']
  },
  
  questions: [
    '主人今天开心吗？',
    '你想和我玩什么？',
    '有想我的事情吗？',
    '要不要一起散步？',
    '你今天吃了吗？'
  ]
};

// Game State
let gameState = {
  mood: 'neutral',
  dialogueHistory: [],
  turnCount: 0,
  ending: null
};

// DOM Elements
const charImg = document.getElementById('char-img');
const dialogueBox = document.getElementById('dialogue-box');
const moodDisplay = document.getElementById('mood-display');
const moodBtns = document.querySelectorAll('.btn.mood');
const actionBtns = document.querySelectorAll('.btn.action');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  showDialogue(wanwanData.greetings[0]);
  updateMoodDisplay();
  setupEventListeners();
});

function setupEventListeners() {
  // Mood buttons
  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mood = btn.dataset.mood;
      changeMood(mood);
    });
  });
  
  // Action buttons
  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      performAction(action);
    });
  });
  
  // Character click
  charImg.addEventListener('click', () => {
    petWanwan();
  });
}

function changeMood(mood) {
  gameState.mood = mood;
  updateMoodDisplay();
  
  // Generate response based on mood
  setTimeout(() => {
    const responses = wanwanData.responses[mood];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    showDialogue(randomResponse);
    animateChar();
  }, 500);
}

function updateMoodDisplay() {
  const moodNames = {
    happy: '😊 开心',
    neutral: '😐 平静',
    sad: '😢 难过',
    angry: '😠 生气',
    shy: '😳 害羞'
  };
  moodDisplay.textContent = moodNames[gameState.mood] || '😐 平静';
}

function showDialogue(text) {
  dialogueBox.style.opacity = '0';
  
  setTimeout(() => {
    dialogueBox.textContent = text;
    dialogueBox.style.opacity = '1';
  }, 300);
}

function animateChar() {
  charImg.style.transform = 'scale(1.2)';
  setTimeout(() => {
    charImg.style.transform = 'scale(1)';
  }, 300);
}

function performAction(action) {
  gameState.turnCount++;
  
  switch(action) {
    case 'pet':
      petWanwan();
      break;
    case 'play':
      playWithWanwan();
      break;
    case 'feed':
      feedWanwan();
      break;
    case 'question':
      askQuestion();
      break;
    default:
      break;
  }
}

function petWanwan() {
  const phrases = [
    '汪！好舒服~',
    '嘿嘿...继续摸...',
    '好开心！',
    '主人最好了！'
  ];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  showDialogue(randomPhrase);
  changeMood('happy');
  animateChar();
}

function playWithWanwan() {
  const phrases = [
    '汪汪！追球球！',
    '来嘛来嘛一起玩！',
    '汪嘿嘿~',
    '这个好玩！'
  ];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  showDialogue(randomPhrase);
  changeMood('happy');
}

function feedWanwan() {
  const phrases = [
    '汪！好吃好吃！',
    '谢谢主人！',
    '好好吃~',
    '还要还要！'
  ];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  showDialogue(randomPhrase);
  changeMood('happy');
}

function askQuestion() {
  const question = wanwanData.questions[Math.floor(Math.random() * wanwanData.questions.length)];
  showDialogue(question);
}

// Check ending conditions
function checkEnding() {
  // Simple ending logic - could be expanded
  if (gameState.turnCount >= 10 && gameState.mood === 'happy') {
    showEnding('happy');
  }
}

function showEnding(endingType) {
  gameState.ending = endingType;
  const endings = {
    happy: '🎉 结局：永远的幸福！汪！',
    neutral: '📖 结局：平凡的日常',
    sad: '💔 结局：离别...',
    angry: '😤 结局：生气的气球',
    shy: '🌸 结局：羞涩的告白'
  };
  
  setTimeout(() => {
    showDialogue(endings[endingType] || endings.neutral);
  }, 1000);
}

// Auto-save game state
function saveGame() {
  localStorage.setItem('wanwan_save', JSON.stringify(gameState));
}

// Load game state
function loadGame() {
  const saved = localStorage.getItem('wanwan_save');
  if (saved) {
    gameState = JSON.parse(saved);
    updateMoodDisplay();
  }
}

// Expose for debugging
window.wanwanGame = {
  state: gameState,
  changeMood,
  showDialogue,
  saveGame,
  loadGame
};

console.log('Wanwan Game Loaded!');

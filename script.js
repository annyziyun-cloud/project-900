// === 1. 取得所有畫面與按鈕元素 ===
const startBtn = document.getElementById('start-btn');
const settingsBtn = document.getElementById('settings-btn');
const quitBtn = document.getElementById('quit-btn');

const titleScreen = document.getElementById('title-screen');
const prologueScreen = document.getElementById('prologue-screen');
const mapScreen = document.getElementById('map-screen'); // 地圖畫面
const level1Screen = document.getElementById('level-1-screen'); // 第一關畫面

const dialogText = document.getElementById('dialog-text');
const nextBtn = document.getElementById('prologue-next-btn');
const bgm = document.getElementById('bgm');

const level1Intro = document.getElementById('level-1-intro');
const quizContent = document.getElementById('quiz-content');
const startQuizBtn = document.getElementById('start-quiz-btn');

// === 2. 遊戲進度狀態管理 ===
let playerProgress = {
  level1: false,
  level2: false,
  level3: false
};

// 故事台詞
const prologueStory = "昂……✨ 勇者大人，你終於來到這裡啦！看你的表情……哼哼，你一定也是為了傳說中可愛老婆留下的 『900 天祕寶』而來的吧？接下來就由小精靈芸芸我帶領你，一起找尋那些被封存的時光碎片吧！";

// === 3. 開場選單邏輯 ===
// 點擊 Start Game
startBtn.addEventListener('click', () => {
  // 啟動翻唱 BGM
  bgm.play().catch(() => console.log("等待點擊播放"));
  
  // 切換畫面：隱藏標題，顯示序章
  titleScreen.classList.remove('active');
  titleScreen.classList.add('hidden');
  
  setTimeout(() => {
    titleScreen.style.display = 'none'; // 完全移除圖層，避免擋住點擊
    
    prologueScreen.style.display = 'flex'; // 確保為 flex 排版
    prologueScreen.classList.remove('hidden');
    prologueScreen.classList.add('active');
    
    typeWriter(prologueStory, 0);
  }, 800);
});

// Settings 點擊反饋
settingsBtn.addEventListener('click', () => {
  alert("⚙️ 設定：BGM 音量已自動調至最深情狀態，無法減弱！");
});

// Quit Game 趣味彩蛋
quitBtn.addEventListener('click', () => {
  alert("❌ 警告：老婆大人設定了不可退出！請乖乖通關領取祕寶～");
});

// === 4. 打字機特效邏輯 ===
function typeWriter(text, i) {
  if (i < text.length) {
    dialogText.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), 40);
  } else {
    nextBtn.classList.remove('hidden');
  }
}

// === 5. 地圖系統與關卡切換邏輯 ===
// 點擊「接受委託」，切換到地圖畫面
nextBtn.addEventListener('click', () => {
  prologueScreen.classList.remove('active');
  prologueScreen.classList.add('hidden');
  
  setTimeout(() => {
    prologueScreen.style.display = 'none';
    
    mapScreen.style.display = 'flex'; 
    mapScreen.classList.remove('hidden');
    mapScreen.classList.add('active');
    
    refreshMapStatus(); 
  }, 500); 
});

// 更新地圖節點與小精靈對話
function refreshMapStatus() {
  const mapDialogText = document.getElementById('map-dialog-text');
  
  if (playerProgress.level1) {
    document.getElementById('node-1').classList.replace('active', 'completed');
    document.getElementById('node-2').classList.replace('locked', 'active'); // 解鎖第二關
    mapDialogText.innerHTML = "恭喜你完成第一關！！！<br>你的記憶力真好，這些難題是只有真正的勇者可以解開的～我對你刮目相看唷！！！";
  }
  
  if (playerProgress.level2) {
    document.getElementById('node-2').classList.replace('active', 'completed');
    document.getElementById('node-3').classList.replace('locked', 'active'); // 解鎖第三關
    mapDialogText.innerHTML = "太厲害了，第二關也順利突破！<br>老婆留下的謎底就快揭曉了，繼續前往第三關吧！";
  }

  if (playerProgress.level3) {
    document.getElementById('node-3').classList.replace('active', 'completed');
    document.getElementById('node-treasure').classList.replace('locked', 'active'); // 解鎖寶藏
    mapDialogText.innerHTML = "所有的線索都解開了！勇者大人，快去領取屬於你的最終寶藏吧！✨";
  }
}

// 點擊關卡節點進入對應關卡
function startLevel(level) {
  mapScreen.classList.remove('active');
  mapScreen.classList.add('hidden');

  setTimeout(() => {
    mapScreen.style.display = 'none';
    
    if (level === 1) {
      level1Screen.style.display = 'flex';
      level1Screen.classList.remove('hidden');
      level1Screen.classList.add('active');
      currentQuestionIndex = 0;
      loadLevel1Quiz();
      // 這裡之後準備執行：loadLevel1Quiz();
    } else if (level === 2) {
      level2Screen.style.display = 'flex';
    level2Screen.classList.remove('hidden');
    level2Screen.classList.add('active');
    level2Intro.style.display = 'block';
    level2Content.style.display = 'none';
  }
  }, 500);
}

startQuizBtn.addEventListener('click', () => {
  level1Intro.style.display = 'none';
  quizContent.style.display = 'flex';
  loadLevel1Quiz(); // 開始載入第一題
});

// 闖關成功後，呼叫此函數回到地圖
function completeLevel(level) {
  if (level === 1) {
    playerProgress.level1 = true;
    level1Screen.classList.remove('active');
    level1Screen.classList.add('hidden');
  } else if (level === 2) {
    playerProgress.level2 = true;
    level2Screen.classList.remove('active');
    level2Screen.classList.add('hidden');
  } else if (level === 3) {
    playerProgress.level3 = true;
    // 預留給第三關的隱藏邏輯
  }
  
  setTimeout(() => {
    if (level === 1) level1Screen.style.display = 'none';
    if (level === 2) level2Screen.style.display = 'none';
    
    mapScreen.style.display = 'flex';
    mapScreen.classList.remove('hidden');
    mapScreen.classList.add('active');
    
    refreshMapStatus(); // 重新整理星星狀態與對話
  }, 500);
}

// 點擊最終寶藏
function claimTreasure() {
  alert("🎁 恭喜！即將開啟 900 天祕寶！");
}

// === 6. 第一關：選擇題題庫與邏輯 ===

// 題庫資料：請將 image 替換成你做好的圖片檔名
const level1QuizData = [
  {
    image: "assets/q1.png", 
    options: ["2024/3/30", "2024/4/4", "2024/4/11"],
    correctAnswerIndex: 0 // 正確答案是第幾個選項 (0 代表 A, 1 代表 B, 2 代表 C)
  },
  {
    image: "assets/q2.png",
    options: ["寶寶", "老婆", "小香豬"],
    correctAnswerIndex: 1 
  },
  {
    image: "assets/q3.png",
    options: ["慶祝老婆生日", "慶祝500天", "慶祝2周年"],
    correctAnswerIndex: 1 
  }
];

let currentQuestionIndex = 0; // 記錄目前答到第幾題

// 載入題目
function loadLevel1Quiz() {
  const currentQuiz = level1QuizData[currentQuestionIndex];
  
  // 更新左側圖片
  document.getElementById('question-image').src = currentQuiz.image;
  
  // 清空並重新生成右側選項按鈕
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = ''; 
  
  currentQuiz.options.forEach((optionText, index) => {
    const btn = document.createElement('button');
    // 套用既有的 pixel-btn 與新增的 option-btn 樣式
    btn.className = 'pixel-btn option-btn'; 
    btn.textContent = optionText;
    
    // 綁定點擊事件來對答案
    btn.onclick = () => checkAnswer(index, currentQuiz.correctAnswerIndex);
    
    optionsContainer.appendChild(btn);
  });
}

// 檢查答案
function checkAnswer(selectedIndex, correctIndex) {
  if (selectedIndex === correctIndex) {
    // 答對了
    alert("✨ 答對了！");
    currentQuestionIndex++; // 進入下一題
    
    if (currentQuestionIndex < level1QuizData.length) {
      loadLevel1Quiz(); // 載入下一題
    } else {
      // 3 題都答對了，完成第一關
      alert("🎉 恭喜通過記憶考驗！老婆的愛心線索解鎖了一部分！");
      completeLevel(1); // 呼叫之前寫好的函數，回到地圖
    }
  } else {
    // 答錯了
    alert("❌ 哎呀，記憶有點模糊囉？再試一次吧！");
  }
}

// === 7. 第二關：拖曳時間線邏輯 ===
const level2Screen = document.getElementById('level-2-screen');
const level2Intro = document.getElementById('level-2-intro');
const level2Content = document.getElementById('level-2-content');
const startLevel2Btn = document.getElementById('start-level-2-btn');
const checkLevel2Btn = document.getElementById('check-level-2-btn');

// 設定正確的時間線順序 (請根據你的真實故事修改這四個 data-id 的順序)
const correctTimelineOrder = ['item-hair', 'item-hk', 'item-army', 'item-japan'];

// 點擊開始排列
startLevel2Btn.addEventListener('click', () => {
  level2Intro.style.display = 'none';
  level2Content.style.display = 'flex';
});

// --- 拖曳引擎 (Drag and Drop API) ---
let draggedItem = null;

// 1. 監聽所有可拖曳圖片
document.querySelectorAll('.draggable-item').forEach(item => {
  item.addEventListener('dragstart', function() {
    draggedItem = this;
    setTimeout(() => this.style.opacity = '0.5', 0); // 拖曳時讓本體變半透明
  });

  item.addEventListener('dragend', function() {
    setTimeout(() => {
      this.style.opacity = '1';
      draggedItem = null;
    }, 0);
  });
});

// 2. 監聽所有放置區 (包含上方時間線框框 與 下方碎片池)
const dropZones = document.querySelectorAll('.timeline-slot, .draggables-pool');

dropZones.forEach(zone => {
  // 允許物件放進來
  zone.addEventListener('dragover', (e) => {
    e.preventDefault(); 
    if (zone.classList.contains('timeline-slot')) {
      zone.classList.add('drag-over');
    }
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('drag-over');
  });

  // 處理放開滑鼠時的動作
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    
    if (zone.classList.contains('timeline-slot')) {
      // 如果框框裡面已經有東西了，把舊的東西踢回碎片池
      const existingItem = zone.querySelector('.draggable-item');
      if (existingItem) {
        document.getElementById('draggables-pool').appendChild(existingItem);
      }
      zone.appendChild(draggedItem);
    } else {
      // 放回碎片池
      zone.appendChild(draggedItem);
    }
  });
});

// 3. 驗證答案
checkLevel2Btn.addEventListener('click', () => {
  const slots = document.querySelectorAll('.timeline-slot');
  let currentOrder = [];
  let isFull = true;

  slots.forEach(slot => {
    const item = slot.querySelector('.draggable-item');
    if (item) {
      currentOrder.push(item.getAttribute('data-id'));
    } else {
      isFull = false;
    }
  });

  // 檢查是否每個框框都放了圖片
  if (!isFull) {
    alert("📝 還有相片沒有排入時間線喔！");
    return;
  }

  // 比對陣列內容
  const isCorrect = currentOrder.every((val, index) => val === correctTimelineOrder[index]);

  if (isCorrect) {
    alert("✨ 太棒了！回憶完美無缺的串連在一起了！");
    completeLevel(2); // 回到地圖
  } else {
    alert("❌ 順序好像有點不對？再回憶一下經歷的先後順序吧！");
  }
});

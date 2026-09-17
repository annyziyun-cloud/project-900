const startBtn = document.getElementById('start-btn');
const settingsBtn = document.getElementById('settings-btn');
const quitBtn = document.getElementById('quit-btn');

const titleScreen = document.getElementById('title-screen');
const prologueScreen = document.getElementById('prologue-screen');
const dialogText = document.getElementById('dialog-text');
const nextBtn = document.getElementById('prologue-next-btn');
const bgm = document.getElementById('bgm');

// 故事台詞
const prologueStory = "呼哇……✨ 勇者大人，你終於來到這裡啦！看你的表情……哼哼，你一定也是為了傳說中『全世界最美麗的老婆大人』所留下的 900 天祕寶而來的吧？接下來就由小精靈我帶領你，一起喚醒那些被封存的時光碎片吧！";

// 點擊 Start Game
startBtn.addEventListener('click', () => {
  // 啟動翻唱 BGM
  bgm.play().catch(() => console.log("等待點擊播放"));
  
  // 切換畫面
  titleScreen.classList.remove('active');
  titleScreen.classList.add('hidden');
  
  setTimeout(() => {
    titleScreen.style.display = 'none';
    prologueScreen.classList.remove('hidden');
    prologueScreen.classList.add('active');
    typeWriter(prologueStory, 0);
  }, 800);
});

// 打字機特效
function typeWriter(text, i) {
  if (i < text.length) {
    dialogText.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), 40);
  } else {
    nextBtn.classList.remove('hidden');
  }
}

// Settings 點擊反饋
settingsBtn.addEventListener('click', () => {
  alert("⚙️ 設定：BGM 音量已自動調至最深情狀態，無法減弱！");
});

// Quit Game 趣味彩蛋
quitBtn.addEventListener('click', () => {
  alert("❌ 警告：老婆大人設定了不可退出！請乖乖通關領取祕寶～");
});

// 點擊接受委託
nextBtn.addEventListener('click', () => {
  alert("即將進入 Quest 1 回憶第一關！");
  // 這裡之後可以無縫切換到你的第一關題目畫面
});

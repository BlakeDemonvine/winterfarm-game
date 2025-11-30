const content = document.getElementById('content');
let data1 = {};
let data2 = {};

function showPage(input){
  // 清空內容
  content.innerHTML = "";

  // ---- 透過 JS 設定 content 的主要排版（只改 JS，不碰 CSS） ----
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'center';
  content.style.gap = '16px';
  content.style.padding = '20px';
  content.style.boxSizing = 'border-box';
  content.style.maxWidth = '1000px';
  content.style.margin = '0 auto';
  content.style.maxHeight = '100vh';    // 限制內容區塊不超出視窗高度
  content.style.overflowY = 'auto';     // 超出時捲動
  content.style.webkitOverflowScrolling = 'touch';

  function showLoading() {
    // --- 建立並插入 CSS ---
    let style = document.getElementById("spinner-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "spinner-style";
      style.textContent = `
        .spinner-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.7);
          z-index: 9999;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 6px solid #ccc;
          border-top-color: #3498db;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    // --- 建立 HTML 元素 ---
    const container = document.createElement("div");
    container.className = "spinner-container";

    const spinner = document.createElement("div");
    spinner.className = "spinner";

    container.appendChild(spinner);
    document.body.appendChild(container);

    // --- 1秒後移除 ---
    setTimeout(() => {
      container.remove();
    }, 1000);
  }
  showLoading();

  if(input === 'start'){
    let logoImg = document.createElement('img');
    logoImg.src = 'logo.jpg';
    content.appendChild(logoImg);
    // 透過 inline style 控制，避免整頁被撐開
    logoImg.style.width = '90%';
    logoImg.style.maxWidth = '420px';
    logoImg.style.height = 'auto';
    logoImg.style.display = 'block';
    logoImg.style.marginTop = '10px';

    let startBtn = document.createElement('button');
    startBtn.textContent = '創建角色';
    content.appendChild(startBtn);
    startBtn.classList.add('mainBtn');

    // 加強按鈕 inline style，確保在視窗中可見
    startBtn.style.padding = '12px 20px';
    startBtn.style.borderRadius = '10px';
    startBtn.style.border = 'none';
    startBtn.style.cursor = 'pointer';
    startBtn.style.margin = '12px 0 24px 0';

    startBtn.addEventListener('click', function() {
      setTimeout(() => {
        showPage('create character');
      }, 300);
    });
  }
  else if(input === 'create character'){
    function createDiv(player){
      let playerData = JSON.parse(localStorage.getItem(`player${player}`)) || {
        'icon' : 'fox.png',
        'name' : `玩家${player}`,
        'point' : 0,
      };

      let div = document.createElement('div');
      content.appendChild(div);

      // 改用 minHeight，避免用百分比高度把頁面撐開
      div.style.backgroundColor = '#f2f2eeff';
      div.style.width = '90%';
      div.style.maxWidth = '760px';
      div.style.minHeight = '160px';
      div.style.display = 'flex';
      div.style.flexDirection = 'column';
      div.style.alignItems = 'center';
      div.style.justifyContent = 'center';
      div.style.padding = '14px';
      div.style.borderRadius = '12px';
      div.style.boxSizing = 'border-box';
      div.style.marginBottom = '8px';
      div.style.gap = '8px';
      div.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)';

      let icon = document.createElement('img');
      div.appendChild(icon);
      icon.src = playerData['icon'];
      icon.style.width = '100px';
      icon.style.height = '100px';
      icon.style.objectFit = 'cover';
      icon.style.borderRadius = '50%';
      icon.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.3)';
      icon.style.transition = 'transform 0.3s ease, opacity 0.3s ease';  // 添加过渡效果
      icon.id = `icon${player}`;
      icon.style.cursor = 'pointer';
      icon.addEventListener('click', function() {
        // 注意：new URL(icon.src).pathname 在本地檔案可能會有不同行為，但保留原邏輯
        const currentSrc = new URL(icon.src, location.href).pathname;
        if (currentSrc.endsWith('ferret.png')) {
          icon.style.opacity = '0';
          setTimeout(() => {
            icon.src = 'fox.png';
            icon.style.opacity = '1';
          }, 100);
        }
        else {
          icon.style.opacity = '0';
          setTimeout(() => {
            icon.src = 'ferret.png';
            icon.style.opacity = '1';
          }, 100);
        }
      });

      let input = document.createElement('input');
      div.appendChild(input);
      input.id = `input${player}`;
      input.classList.add('mainInput');
      input.style.marginTop = '10px';
      input.style.textAlign = 'center';
      input.style.width = '80%';
      input.style.padding = '8px 10px';
      input.style.borderRadius = '8px';
      input.style.border = '1px solid #ddd';
      input.value = playerData['name'];

      let p = document.createElement('p');
      div.appendChild(p);
      p.textContent = `累積分數：${playerData['point']}`;
      p.style.marginTop = '10px';
    }

    createDiv(1);
    createDiv(2);

    // 把按鈕加在 content 裡（並加入 margin-bottom）
    let startBtn = document.createElement('button');
    startBtn.textContent = '確認';
    content.appendChild(startBtn);
    startBtn.classList.add('mainBtn');

    // inline style for visibility
    startBtn.style.padding = '12px 20px';
    startBtn.style.borderRadius = '10px';
    startBtn.style.border = 'none';
    startBtn.style.cursor = 'pointer';
    startBtn.style.margin = '12px 0 42px 0'; // 下方留較多空間，避免被瀏覽器工具列遮擋

    startBtn.addEventListener('click', function() {
      setTimeout(() => {
        showPage('lobby');
      }, 300);

      data1['name'] = document.getElementById('input1').value;
      data2['name'] = document.getElementById('input2').value;
      data1['point'] = localStorage.getItem('player1') ? JSON.parse(localStorage.getItem('player1'))['point'] : 0;
      data2['point'] = localStorage.getItem('player2') ? JSON.parse(localStorage.getItem('player2'))['point'] : 0;

      const currentSrc1 = new URL(document.getElementById('icon1').src, location.href).pathname;
      data1['icon'] =currentSrc1.split('/').pop();

      const currentSrc2 = new URL(document.getElementById('icon2').src, location.href).pathname;
      data2['icon'] = currentSrc2.split('/').pop();

      console.log(data1);
      console.log(data2);

      localStorage.setItem("player1", JSON.stringify(data1));
      localStorage.setItem("player2", JSON.stringify(data2));
    });
  }
  else if(input === 'lobby'){
    // 留空或依你需求再補
  }
}

//localStorage.removeItem('player1');
//localStorage.removeItem('player2');

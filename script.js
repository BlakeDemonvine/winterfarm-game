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
  //showLoading();

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
    //icon
    let iconDiv = document.createElement('div');
    content.appendChild(iconDiv);
    iconDiv.style.display = 'flex';
    iconDiv.style.justifyContent = 'space-around'; // 兩個 icon 對稱
    iconDiv.style.alignItems = 'center';
    //iconDiv.style.backgroundColor = 'red';
    iconDiv.style.width = '100%';
    iconDiv.style.height = '20%';

    const players = [
      { img: data1['icon'], name: data1['name'], score: data1['point'] },
      { img: data2['icon'], name: data2['name'], score: data2['point'] }
    ];

    for(let i = 0 ; i<players.length ; i++){
      let player = players[i];
      const playerDiv = document.createElement('div');
      playerDiv.style.display = 'flex';
      playerDiv.style.flexDirection = 'column'; // 圖片在上，文字在下
      playerDiv.style.alignItems = 'center';

      // 圓形圖片
      const img = document.createElement('img');
      img.src = player.img;
      img.style.width = '80px';
      img.style.height = '80px';
      img.style.borderRadius = '50%'; // 變圓
      img.style.objectFit = 'cover';
      img.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      playerDiv.appendChild(img);

      // 名字
      const nameP = document.createElement('p');
      nameP.innerText = player.name;
      nameP.style.margin = '4px 0 0 0';
      nameP.style.fontWeight = 'bold';
      playerDiv.appendChild(nameP);

      // 分數
      const scoreP = document.createElement('p');
      scoreP.innerText = `分數: ${player.score}`;
      scoreP.id = `score${i+1}`;
      scoreP.style.margin = '0';
      playerDiv.appendChild(scoreP);

      iconDiv.appendChild(playerDiv);
    }

    let buttonDiv = document.createElement('div');
    content.appendChild(buttonDiv);

    // 用 grid 排成 2x2
    buttonDiv.style.display = "grid";
    buttonDiv.style.gridTemplateColumns = "1fr 1fr";
    buttonDiv.style.gridTemplateRows = "1fr 1fr";
    buttonDiv.style.gap = "12px";  // 按鈕之間間距
    buttonDiv.style.width = "100%";
    buttonDiv.style.height = "50%";
    buttonDiv.style.boxSizing = "border-box";
    buttonDiv.style.padding = "16px";

    // 四個按鈕資訊
    const btnInfos = [
      { name: "隨機題目", iconUrl: "Random.png" },
      { name: "選定題目", iconUrl: "answer.png" },
      { name: "題目補充", iconUrl: "shared-vision.png" },
      { name: "分數更改", iconUrl: "reward.png" },
    ];

    btnInfos.forEach(info => {
      const btn = document.createElement('button');
      btn.style.display = "flex";
      btn.style.flexDirection = "column";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.style.padding = "12px";
      btn.style.border = "none";
      btn.style.borderRadius = "10px";
      btn.style.cursor = "pointer";
      btn.style.background = "#fff";
      btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
      
      // icon
      const img = document.createElement('img');
      img.src = info.iconUrl;
      img.style.width = "48px";
      img.style.height = "48px";
      img.style.marginBottom = "8px";
      btn.appendChild(img);

      // 名稱文字
      const txt = document.createElement('span');
      txt.innerText = info.name;
      txt.style.fontFamily = "Iansui, sans-serif";
      txt.style.fontSize = "16px";
      txt.style.color = "#333";
      btn.appendChild(txt);

      btn.addEventListener('click', () => {
        let currentQuestionIndex = 0;
        function nextQuestion() {
            currentQuestionIndex = Math.floor(Math.random() * questions.length);
            const questionText = document.getElementById('popup-question');
            if (questionText) questionText.innerText = questions[currentQuestionIndex];
        }

        if (document.getElementById('popup-container')) return;

        const overlay = document.createElement('div');
        overlay.id = 'popup-container';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.overflow = 'auto';
        overlay.style.zIndex = '1000';

        // popup 內容框
        const popup = document.createElement('div');
        popup.style.backgroundColor = '#fff';
        popup.style.borderRadius = '16px';
        popup.style.padding = '24px';
        popup.style.width = '320px';
        popup.style.textAlign = 'center';
        popup.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        popup.style.maxHeight = '80%';
        popup.style.overflow = 'auto';
        overlay.appendChild(popup);

        function playQuestion(question){
          const questionText = document.createElement('p');
          questionText.id = 'popup-question';
          questionText.style.fontSize = '20px';
          questionText.style.fontWeight = 'bold';
          questionText.style.marginBottom = '24px';
          questionText.innerText = questions[question];
          popup.appendChild(questionText);

          // 按鈕容器 2x2
          const btnContainer = document.createElement('div');
          btnContainer.style.display = 'grid';
          btnContainer.style.gridTemplateColumns = '1fr 1fr';
          btnContainer.style.gridGap = '12px';
          popup.appendChild(btnContainer);

          // 按鈕資料
          const btnInfos = [
            { text: '玩家1+1分', action: () => scoreChange(1,0) },
            { text: '玩家2+1分', action: () => scoreChange(0,1) },
            { text: '確認', action: () => overlay.remove() },
            { text: '下一題', action: () => nextQuestion() }
          ];

          btnInfos.forEach(info => {
            const btn = document.createElement('button');
            btn.innerText = info.text;
            btn.style.padding = '12px';
            btn.style.borderRadius = '8px';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';
            btn.style.background = '#f0c040';
            btn.style.fontWeight = 'bold';
            btn.addEventListener('click', info.action);
            btnContainer.appendChild(btn);
          });
        }

        // 題目文字
        if(info.name === '隨機題目'){
          playQuestion(Math.floor(Math.random() * questions.length));
        }
        else if(info.name === '選定題目'){
          for(let i = 0 ; i<questions.length ; i++){
            let div = document.createElement('div');
            popup.appendChild(div);
            div.style.width = '100%';
            div.style.height = '50px';
            div.style.marginBottom = '10px';
            div.style.backgroundColor = '#f5f5e9';
            div.style.padding = '5px';
            div.textContent = questions[i];

            div.addEventListener('click', function() {
              popup.innerHTML = '';
              playQuestion(i);
            });
          }
        }
        else if(info.name === '分數更改'){
          const btnContainer = document.createElement('div');
          btnContainer.style.display = 'grid';
          btnContainer.style.gridTemplateColumns = '1fr 1fr';
          btnContainer.style.gap = '10px';
          popup.appendChild(btnContainer);

          const btnInfos = [
            { text: '玩家1+1分', action: () => scoreChange(1,0) },
            { text: '玩家2+1分', action: () => scoreChange(0,1) },
            { text: '清除分數', action: () => scoreChange(0,0) },
            { text: '確認', action: () => overlay.remove() },
          ];

          btnInfos.forEach(info => {
            const btn = document.createElement('button');
            btn.innerText = info.text;
            btn.style.padding = '12px';
            btn.style.borderRadius = '8px';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';
            btn.style.background = '#f0c040';
            btn.style.fontWeight = 'bold';
            btn.addEventListener('click', info.action);
            btnContainer.appendChild(btn);
          });
        }   

        document.body.appendChild(overlay);
        if(info.name === '題目補充'){
          overlay.remove();
        }
      });

      buttonDiv.appendChild(btn);
    });


    //空白
    let blankDiv = document.createElement('div');
    content.appendChild(blankDiv);
    blankDiv.style.width = '100%';
    blankDiv.style.height = '15%';

    //footer
    const footer = document.createElement('div');
    footer.id = "dynamic-footer";

    footer.style.position = "fixed";
    footer.style.left = "0";
    footer.style.bottom = "0";
    footer.style.width = "100%";
    footer.style.height = "20%";
    footer.style.background = "linear-gradient(#eee6c9, #e9debf)";
    footer.style.color = "black";
    footer.style.display = "flex";
    footer.style.flexDirection = "column"; // 垂直排列
    footer.style.justifyContent = "center";
    footer.style.alignItems = "center";
    footer.style.fontFamily = "Iansui, sans-serif";
    footer.style.fontWeight = 'bold';
    footer.style.fontSize = '20px';
    footer.style.borderTopLeftRadius = "60% 40%";
    footer.style.borderTopRightRadius = "60% 40%";

    // 將文字放到 p 裡
    const scoreText = document.createElement('p');
    scoreText.id = 'gapId';
    scoreText.innerText = `分數差為: ${data2['point']-data1['point']}`;
    scoreText.style.margin = "0"; // 移除 p 的預設 margin
    footer.appendChild(scoreText);

    content.appendChild(footer);

    // 按鈕放在文字下方
    let startBtn = document.createElement('button');
    startBtn.textContent = '禮物轉盤';
    footer.appendChild(startBtn);
    startBtn.classList.add('mainBtn');

    // 按鈕樣式
    startBtn.style.padding = '12px 20px';
    startBtn.style.borderRadius = '10px';
    startBtn.style.border = 'none';
    startBtn.style.cursor = 'pointer';
    startBtn.style.margin = '12px 0 12px 0';

    startBtn.addEventListener('click', function() {
      setTimeout(() => {
        showPage('spinner');
      }, 300);
    });

  }
  else if(input === 'spinner'){
      // 建立遮罩
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.zIndex = '9999';
      content.appendChild(overlay);

      // 建立轉盤容器
      const spinnerContainer = document.createElement('div');
      spinnerContainer.style.width = '300px';
      spinnerContainer.style.height = '300px';
      spinnerContainer.style.borderRadius = '50%';
      spinnerContainer.style.border = '8px solid #f0c040';
      spinnerContainer.style.position = 'relative';
      spinnerContainer.style.overflow = 'hidden';
      spinnerContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
      overlay.appendChild(spinnerContainer);

      // 轉盤扇區數
      const prizes = ["銀狐娃娃", "Hello Kitty摺紙", "銘謝惠顧", "銘謝惠顧", "銘謝惠顧", "銘謝惠顧"];
      const sectorAngle = 360 / prizes.length;

      // 建立扇區
      prizes.forEach((text, i) => {
          const sector = document.createElement('div');
          sector.style.position = 'absolute';
          sector.style.width = '50%';
          sector.style.height = '50%';
          sector.style.top = '50%';
          sector.style.left = '50%';
          sector.style.transformOrigin = '0% 0%';
          sector.style.transform = `rotate(${i * sectorAngle}deg) skewY(${90 - sectorAngle}deg)`;
          sector.style.background = i % 2 === 0 ? '#ffcc80' : '#ffe0b2';
          sector.style.display = 'flex';
          sector.style.justifyContent = 'flex-end';
          sector.style.alignItems = 'center';
          sector.style.paddingRight = '10px';
          sector.style.boxSizing = 'border-box';

          const label = document.createElement('span');
          label.innerText = text;
          label.style.transform = `skewY(${-(90 - sectorAngle)}deg) rotate(${sectorAngle/2}deg)`;
          label.style.fontWeight = 'bold';
          label.style.fontSize = '14px';
          label.style.color = '#333';
          sector.appendChild(label);

          spinnerContainer.appendChild(sector);
      });

      // 建立指針
      const pointer = document.createElement('div');
      pointer.style.position = 'absolute';
      pointer.style.top = '-20px';
      pointer.style.left = '50%';
      pointer.style.width = '0';
      pointer.style.height = '0';
      pointer.style.borderLeft = '15px solid transparent';
      pointer.style.borderRight = '15px solid transparent';
      pointer.style.borderBottom = '30px solid red';
      pointer.style.transform = 'translateX(-50%)';
      overlay.appendChild(pointer);

      // 建立開始按鈕
      const startBtn = document.createElement('button');
      startBtn.innerText = "開始轉動!";
      startBtn.style.marginTop = '20px';
      startBtn.style.padding = '12px 20px';
      startBtn.style.borderRadius = '10px';
      startBtn.style.border = 'none';
      startBtn.style.cursor = 'pointer';
      startBtn.style.background = '#f0c040';
      startBtn.style.fontWeight = 'bold';
      overlay.appendChild(startBtn);

      startBtn.addEventListener('click', () => {
          const spins = 360 * 5 + Math.floor(Math.random() * 360); // 5圈 + 隨機角度
          spinnerContainer.style.transition = 'transform 3s cubic-bezier(0.33, 1, 0.68, 1)';
          spinnerContainer.style.transform = `rotate(${spins}deg)`;
          
          // 3秒後顯示抽到的獎品
          setTimeout(() => {
              const resultIndex = Math.floor(((spins % 360) / sectorAngle)) % prizes.length;
              alert(`恭喜你抽到: ${prizes[prizes.length - 1 - resultIndex]}!`);
              overlay.remove();
              showPage('lobby');
          }, 3000);
      });
  }

}

//localStorage.removeItem('player1');
//localStorage.removeItem('player2');

function loadCuteFont() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/npm/iansui@latest/dist/iansui.min.css";
  document.head.appendChild(link);
}

loadCuteFont();

function scoreChange(x,y){
  if(x===0 && y===0){
    data1['point'] = 0;
    localStorage.setItem("player1", JSON.stringify(data1));
    document.getElementById('score1').textContent = `分數: ${data1['point']}`;
    data2['point'] = 0;
    localStorage.setItem("player2", JSON.stringify(data2));
    document.getElementById('score2').textContent = `分數: ${data2['point']}`;
  }
  if(x!=0){
    data1['point']+=x;
    localStorage.setItem("player1", JSON.stringify(data1));
    document.getElementById('score1').textContent = `分數: ${data1['point']}`;
  }
  if(y!=0){
    data2['point']+=y;
    localStorage.setItem("player2", JSON.stringify(data2));
    document.getElementById('score2').textContent = `分數: ${data2['point']}`;
  }

  document.getElementById('gapId').innerText = `分數差為: ${data2['point']-data1['point']}`;
}

const questions = [
  "如果只能選一種食物當晚餐吃到死，你會選什麼？",
  "小時候你撒過最荒唐的一個謊是什麼？",
  "有沒有一次超糗的約會經驗可以分享？",
  "如果你可以偷看別人手機一天，你會偷誰的？想看什麼？",
  "你曾經暗戀過朋友還是公開追求過？結果如何？",
  "有沒有做過讓自己現在都會臉紅的事？講一件。",
  "你最想把哪個電影情節放進真實人生？是哪一幕？",
  "曾經有過一段完全不理性的衝動買買買紀錄嗎？買了什麼？",
  "你曾經為了某件事裝過很久的樣子（像是假裝會某技能）嗎？",
  "如果有人給你一張現金卡讓你做任一件瘋狂事，你會做什麼？",
  "你最想知道別人不敢問你的哪件事？",
  "小時候的夢想職業有多荒謬？（例如：宇宙泡泡工）",
  "你最尷尬的自拍是哪一張？發生了什麼事？",
  "有沒有做過一件會讓你被朋友取綽號的事？那綽號是？",
  "若可以把某段記憶刪掉，你會刪哪段（非致命）？為什麼？",
  "你做過最沒用但很開心的一件事情是什麼？",
  "如果要你公開一個秘密（小而 harmless），你會先說還是留著？",
  "有沒有偷偷追蹤過某個名人的社群？那個名人是誰？",
  "你願不願意當別人的真人 Google？最常被問什麼怪問題？",
  "你覺得自己最容易被哪種梗圖擊中笑點？（貼心、冷、噁）",
  "最讓你想立刻刪除某張照片的是哪一張？為什麼？",
  "如果可以重寫某天的對話，你會改哪段話？",
  "你會在公眾場合幹過最瘋的一件事是什麼？（不犯法）",
  "有沒有偷吃別人東西被抓包？結果怎樣？",
  "如果能問過去的自己一句話，你想問什麼？",
  "你最靠譜的謊話是怎麼編的？（工作場合也算）",
  "如果你要演偶像劇裡的反派，你會怎麼造型？",
  "你有沒有曾經誤會某人結果發現超尷尬？說說那次。",
  "你會不會在電梯裡唱歌？最常唱哪首？",
  "如果你必須每天講一個冷知識，你想講哪一類的？",
  "你最想在朋友面前嘗試但又怕丟臉的才藝是？",
  "曾經因為心血來潮跟陌生人搭訕嗎？結果如何？",
  "你會用什麼梗來形容你的戀愛史？（一句話）",
  "如果你能跟童年版自己講一件事，那會是鼓勵、警告還是吃甜點？",
  "你覺得哪一種外表的誤解最容易發生（看起來兇其實溫柔之類）？",
  "最讓你想立刻出國的衝動是哪一刻？去哪裡做什麼？",
  "你有沒有不小心把誰加到群組後發生的爆笑誤會？說來聽聽。",
  "如果要你在路上表演一小段，會選舞、唱還是魔術？表演什麼？",
  "有沒有一首歌每次一播你就會做出同一個動作？是什麼動作？",
  "你最想嘗試但又怕後悔的一件事是什麼？",
  "如果要你選一個代替名字，你會想叫什麼奇怪名字？",
  "你最會說的冷笑話是哪一個？（講來讓我笑笑）",
  "如果可以替某個名言換成你的版本，你會改哪一句？",
  "你有沒有曾經誤傳訊息給錯人？內容有多糗？",
  "遇到超尷尬靜默時你會做什麼技能救場？（講笑話、摸魚、唱歌）",
  "如果要辦一場奇怪主題派對，你會選什麼主題？穿什麼？",
  "你有過超級奇怪的收藏癖嗎？（例如：火車票、收據之類）",
  "最想跟哪個動漫或影視角色交換一天生活？為什麼？",
  "你會偷偷用誰的名字開 Instagram 假帳號（理想名單）？",
  "曾經做過最 spontaneous 的夜間行動是什麼？（像半夜開車去海邊）",
  "如果被發現你的秘密技能是唸某個口音，你會害羞還是驕傲？",
  "你做過最不合邏輯但超有趣的決定是什麼？",
  "有沒有哪句話你聽了超久還是覺得無敵中肯？說來聽聽。",
  "如果今天能把你的某個習慣變成商品，你會賣什麼？售價多少？",
  "你最想做的「一天假身份」是誰（例如：咖啡店老闆、吉他手）",
  "有沒有把別人的話曲解超大而鬧出笑話的時候？例子？",
  "如果你要為自己寫一首主題曲，副歌會唱什麼一句？",
  "你最想收到但又覺得超突兀的驚喜是什麼？",
  "有沒有一件你做了但完全不後悔的瘋事？講一下動機。",
  "最後：如果可以立刻問對方一個膽大的問題，你會問什麼？（先說不用回答也可以😉）",
  "有沒有學校／工作時期很想念的人或事？是什麼？",
  "你最喜歡的零食或小吃是什麼？有沒有推薦品牌或攤販？",
  "有沒有什麼時刻你覺得自己表現得很勇敢？",
  "你會怎麼處理不舒服但又不想衝突的情況？",
  "有沒有哪種嗜好是朋友們覺得你很奇特的？",
  "最喜歡的科技小玩意或生活用品是什麼？為什麼推薦？",
  "有沒有曾經一見鍾情（對某事物或想法）？那是什麼？",
  "你在朋友群裡通常擔任什麼樣的角色？搞笑的、計畫的還是安靜的？",
  "喜歡自己做決定還是讓別人帶路？為什麼？",
  "什麼事情會讓你覺得「這就是完美的一天」？",
  "你有沒有收藏東西的習慣？收藏的是什麼？",
  "喜歡看哪些類型的 YouTube 頻道或 Podcast？有無推薦？",
  "你覺得人生中最重要的技能是什麼？為什麼？",
  "有沒有一個人生小確幸是別人不知道但對你很重要？",
  "你會如何處理壓力很大的一週？有沒有固定方法？",
  "如果要寫一本自傳，書名會叫什麼？為什麼？",
  "你對未來五年有什麼小目標或大計畫嗎？願意分享嗎？",
  "最喜歡的一句歌詞或一句電影台詞是什麼？為什麼喜歡？",
  "你有沒有一個常常想要改掉但還沒做到的壞習慣？",
  "你最想念的一次家庭聚會是什麼樣子？有什麼特別回憶？",
  "喜歡用什麼方式紀念重要時刻（拍照、寫日記、聚餐）？",
  "有沒有讓你改變想法的爭論或討論？發生了什麼？",
  "你覺得理想的約會／見面會是怎樣的行程？",
  "有沒有什麼事讓你覺得時間過得特別快？那時候在做什麼？",
  "你相信直覺還是數據／理性比較多？有沒有典型例子？",
  "最想學會的一道家常菜或傳統料理是什麼？想怎麼做？",
  "有沒有一位老師或長輩對你影響很大？他／她教了你什麼？",
  "你平常會怎麼規劃假期？喜歡塞滿行程還是慢慢玩？",
  "如果要拍一部紀錄片，題材會選什麼？為什麼覺得重要？",
  "你覺得最浪漫的一件小事是什麼？（不一定要情侶）",
  "有沒有特別想去的音樂祭或文化活動？為什麼？",
  "你有沒有忍不住會做的小動作或口頭禪？朋友會笑你嗎？",
  "遇到分歧時你通常怎麼溝通？會先退一步還是堅持立場？",
  "你最想體驗的一種生活方式（例如：數位游牧、農夫生活）是什麼？",
  "有沒有做過最瘋狂的決定？當時為什麼會做？結果如何？",
  "你最怕別人問到但其實也想分享的尷尬事是什麼？（選擇性回答）",
  "喜歡晨跑還是夜跑？運動時你會聽什麼？",
  "如果只能帶三樣東西去無人島，你會帶什麼？為什麼？",
  "有沒有一句話是你希望朋友們記得你的？（想要被怎麼記住）",
  "最後一個——有什麼你一直想問別人但不好意思問的問題嗎？可以問我。"
];

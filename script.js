const content = document.getElementById('content');
let data1 = {};
let data2 = {};
function showPage(input){
  content.innerHTML = "";
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
    logoImg.style.width = '90%';

    //createMainBtn('創建角色');
    let startBtn = document.createElement('button');
    startBtn.textContent = '創建角色';
    content.appendChild(startBtn);
    startBtn.classList.add('mainBtn');

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
      div.style.backgroundColor = '#f2f2eeff';
      div.style.width = '90%';
      div.style.height = '40%';
      div.style.display = 'flex';
      div.style.flexDirection = 'column';
      div.style.alignItems = 'center';
      div.style.justifyContent = 'center';

      let icon = document.createElement('img');
      div.appendChild(icon);
      icon.src = playerData['icon'];
      icon.style.width = '100px';
      icon.style.borderRadius = '50%';
      icon.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.3)';
      icon.style.transition = 'transform 0.3s ease, opacity 0.3s ease';  // 添加过渡效果
      icon.id = `icon${player}`;
      icon.addEventListener('click', function() {
        const currentSrc = new URL(icon.src).pathname;
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
      input.value = playerData['name'];

      let p = document.createElement('p');
      div.appendChild(p);
      p.textContent = `累積分數：${playerData['point']}`;
      p.style.marginTop = '10px';
    }

    createDiv(1);
    createDiv(2);
    
    
    let startBtn = document.createElement('button');
    startBtn.textContent = '確認';
    content.appendChild(startBtn);
    startBtn.classList.add('mainBtn');

    startBtn.addEventListener('click', function() {
      setTimeout(() => {
        showPage('lobby');
      }, 300);
      
      data1['name'] = document.getElementById('input1').value;
      data2['name'] = document.getElementById('input2').value;
      data1['point'] = localStorage.getItem('player1') ? JSON.parse(localStorage.getItem('player1'))['point'] : 0;
      data2['point'] = localStorage.getItem('player2') ? JSON.parse(localStorage.getItem('player2'))['point'] : 0;

      const currentSrc1 = new URL(document.getElementById('icon1').src).pathname;
      data1['icon'] =currentSrc1.split('/').pop();

      const currentSrc2 = new URL(document.getElementById('icon2').src).pathname;
      data2['icon'] = currentSrc2.split('/').pop();

      console.log(data1);
      console.log(data2);

      localStorage.setItem("player1", JSON.stringify(data1));
      localStorage.setItem("player2", JSON.stringify(data2));
    });
  }
  else if(input === 'lobby'){

  }
}


//localStorage.removeItem('player1');
//localStorage.removeItem('player2');
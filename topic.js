// 遊戲狀態管理
class BasketballGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.questions = [];
        this.currentAnswer = '';
        this.isAnswered = false;
        
        this.initializeGame();
        this.bindEvents();
    }

    // 初始化遊戲
    initializeGame() {
        this.questions = [
            // 猜球員題目 - 選擇題形式
            {
                type: 'guess_player',
                image: 'James Edward Harden.jpg',
                question: '這位球員以招牌的後撤步三分球聞名，曾獲得MVP獎項，請問他是誰？',
                options: ['James Harden 詹姆斯·哈登', 'Stephen Curry 史蒂芬·柯瑞', 'Damian Lillard 達米恩·利拉德', 'Russell Westbrook 羅素·衛斯特布魯克'],
                answer: 0,
                correct: 'James Harden 詹姆斯·哈登'
            },
            {
                type: 'guess_player',
                image: 'Jimmy Butler.jpg',
                question: '這位球員以強硬的防守和關鍵時刻的表現著稱，曾帶領球隊進入總決賽，請問他是誰？',
                options: ['Jimmy Butler 吉米·巴特勒', 'Kawhi Leonard 科懷·倫納德', 'Paul George 保羅·喬治', 'Jayson Tatum 傑森·塔圖'],
                answer: 0,
                correct: 'Jimmy Butler 吉米·巴特勒'
            },
            {
                type: 'guess_player',
                image: 'Jordan Poole.jpg',
                question: '這位年輕球員以出色的投籃能力和關鍵時刻的表現聞名，曾幫助球隊奪冠，請問他是誰？',
                options: ['Jordan Poole 喬丹·普爾', 'Tyler Herro 泰勒·希羅', 'Anfernee Simons 安芬尼·西蒙斯', 'Cole Anthony 科爾·安東尼'],
                answer: 0,
                correct: 'Jordan Poole 喬丹·普爾'
            },
            {
                type: 'guess_player',
                image: 'Kyrie Andrew.jpg',
                question: '這位球員以華麗的運球技巧和關鍵時刻的投籃聞名，曾與LeBron James一起奪冠，請問他是誰？',
                options: ['Kyrie Irving 凱里·歐文', 'Damian Lillard 達米恩·利拉德', 'Kemba Walker 肯巴·沃克', 'John Wall 約翰·沃爾'],
                answer: 0,
                correct: 'Kyrie Irving 凱里·歐文'
            },
            {
                type: 'guess_player',
                image: 'LeBronJames.jpg',
                question: '這位球員被稱為「小皇帝」，是現役最偉大的球員之一，請問他是誰？',
                options: ['LeBron James 勒布朗·詹姆斯', 'Kevin Durant 凱文·杜蘭特', 'Giannis Antetokounmpo 揚尼斯·安戴托昆波', 'Luka Doncic 盧卡·東契奇'],
                answer: 0,
                correct: 'LeBron James 勒布朗·詹姆斯'
            },
            {
                type: 'guess_player',
                image: 'Lonzo Ball.jpg',
                question: '這位球員以出色的傳球視野和防守能力著稱，來自著名的Ball家族，請問他是誰？',
                options: ['Lonzo Ball 朗佐·鮑爾', 'LaMelo Ball 拉梅洛·鮑爾', 'Dejounte Murray 德章泰·穆雷', 'De\'Aaron Fox 迪阿隆·福克斯'],
                answer: 0,
                correct: 'Lonzo Ball 朗佐·鮑爾'
            },
            {
                type: 'guess_player',
                image: 'Nikola Jokić.jpg',
                question: '這位來自塞爾維亞的中鋒以全能表現著稱，綽號「小丑」，曾獲得MVP，請問他是誰？',
                options: ['Nikola Jokić 尼古拉·約基奇', 'Joel Embiid 喬爾·恩比德', 'Rudy Gobert 魯迪·戈貝爾', 'Bam Adebayo 巴姆·阿德巴約'],
                answer: 0,
                correct: 'Nikola Jokić 尼古拉·約基奇'
            },
            {
                type: 'guess_player',
                image: 'Paul Clifton.jpg',
                question: '這位球員以出色的控球技巧和關鍵時刻的表現著稱，曾多次入選全明星，請問他是誰？',
                options: ['Chris Paul 克里斯·保羅', 'Russell Westbrook 羅素·衛斯特布魯克', 'John Wall 約翰·沃爾', 'Kyle Lowry 凱爾·洛瑞'],
                answer: 0,
                correct: 'Chris Paul 克里斯·保羅'
            },
            
            // 規則題
            {
                type: 'rules',
                question: '一場NBA比賽正常時間分為幾節？每節幾分鐘？',
                options: ['4節，每節12分鐘', '4節，每節10分鐘', '2節，每節20分鐘', '3節，每節15分鐘'],
                answer: 0,
                correct: '4節，每節12分鐘'
            },
            {
                type: 'rules',
                question: '球員在比賽中最多可以犯規幾次就會被罰下？',
                options: ['6次', '5次', '7次', '4次'],
                answer: 0,
                correct: '6次'
            },
            {
                type: 'rules',
                question: '罰球一顆進球算幾分？',
                options: ['1分', '2分', '3分', '0分'],
                answer: 0,
                correct: '1分'
            },
            {
                type: 'rules',
                question: '如果一個球員持球走了太多步，這個規則違例叫什麼？',
                options: ['走步', '二次運球', '帶球撞人', '阻擋'],
                answer: 0,
                correct: '走步'
            },
            {
                type: 'rules',
                question: 'NBA三分線外投進一球算幾分？',
                options: ['3分', '2分', '4分', '5分'],
                answer: 0,
                correct: '3分'
            },
            {
                type: 'rules',
                question: 'NBA比賽若四節打完比分相同，會怎麼處理？',
                options: ['進入延長賽', '重新比賽', '看犯規次數', '平手結束'],
                answer: 0,
                correct: '進入延長賽'
            },
            {
                type: 'rules',
                question: '籃球比賽中，一隊進攻最多只能持球幾秒必須出手？',
                options: ['24秒', '30秒', '20秒', '15秒'],
                answer: 0,
                correct: '24秒'
            },
            {
                type: 'rules',
                question: 'NBA比賽中，一隊在場上最多有幾名球員同時上場？',
                options: ['5名', '6名', '7名', '4名'],
                answer: 0,
                correct: '5名'
            },
            {
                type: 'rules',
                question: '球員運球停下來後，能再繼續運球嗎？',
                options: ['不能，會判二次運球', '可以', '看裁判決定', '只能運一次'],
                answer: 0,
                correct: '不能，會判二次運球'
            },
            {
                type: 'rules',
                question: '籃球比賽中，什麼情況會判「24秒違例」？',
                options: ['進攻方24秒內未投籃', '防守方24秒內未搶到球', '比賽進行24秒', '球員持球24秒'],
                answer: 0,
                correct: '進攻方24秒內未投籃'
            },
            
            // 歷史/紀錄題
            {
                type: 'history_record',
                question: 'NBA史上拿過最多總冠軍的球隊是哪一隊？',
                options: ['波士頓塞爾提克', '洛杉磯湖人', '芝加哥公牛', '金州勇士'],
                answer: 0,
                correct: '波士頓塞爾提克'
            },
            {
                type: 'history_record',
                question: 'NBA單場得分紀錄最高的球員是誰？得了幾分？',
                options: ['Wilt Chamberlain，100分', 'Kobe Bryant，81分', 'Michael Jordan，69分', 'James Harden，61分'],
                answer: 0,
                correct: 'Wilt Chamberlain，100分'
            },
            {
                type: 'history_record',
                question: 'Michael Jordan一共拿過幾次NBA總冠軍？',
                options: ['6次', '5次', '7次', '4次'],
                answer: 0,
                correct: '6次'
            },
            {
                type: 'history_record',
                question: 'Kobe Bryant單場最高得分是多少分？',
                options: ['81分', '100分', '73分', '62分'],
                answer: 0,
                correct: '81分'
            },
            {
                type: 'history_record',
                question: 'LeBron James第一支效力的NBA球隊是哪一隊？',
                options: ['克里夫蘭騎士', '邁阿密熱火', '洛杉磯湖人', '波士頓塞爾提克'],
                answer: 0,
                correct: '克里夫蘭騎士'
            },
            {
                type: 'guess_player',
                image: 'Stephen Curry最擅長的投籃是什麼？.jpg',
                question: '這位球員最擅長的投籃是什麼？',
                options: ['三分球', '上籃', '罰球', '中距離'],
                answer: 0,
                correct: '三分球'
            },
            {
                type: 'guess_player',
                image: 'Yao Ming.jpg',
                question: '這位球員曾經效力哪一支NBA球隊？',
                options: ['休士頓火箭', '洛杉磯湖人', '芝加哥公牛', '紐約尼克'],
                answer: 0,
                correct: '休士頓火箭'
            },
            {
                type: 'history_record',
                question: '哪位球星有「希臘怪物」的綽號？',
                options: ['Giannis Antetokounmpo 揚尼斯·安戴托昆波', 'Luka Doncic 盧卡·東契奇', 'Nikola Jokić 尼古拉·約基奇', 'Joel Embiid 喬爾·恩比德'],
                answer: 0,
                correct: 'Giannis Antetokounmpo 揚尼斯·安戴托昆波'
            },
            {
                type: 'history_record',
                question: '哪支球隊的吉祥物是「公牛」？',
                options: ['芝加哥公牛', '波士頓塞爾提克', '多倫多暴龍', '夏洛特黃蜂'],
                answer: 0,
                correct: '芝加哥公牛'
            },
            {
                type: 'history_record',
                question: 'NBA年度冠軍系列賽叫什麼？',
                options: ['總決賽 (NBA Finals)', '季後賽', '冠軍賽', '決賽圈'],
                answer: 0,
                correct: '總決賽 (NBA Finals)'
            }
        ];
        
        this.shuffleQuestions();
        // 只選擇前5題
        this.questions = this.questions.slice(0, 5);
    }

    // 隨機打亂題目順序
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    // 綁定事件監聽器
    bindEvents() {
        // 檢查元素是否存在再綁定事件
        const startGameBtn = document.getElementById('startGame');
        if (startGameBtn) {
            startGameBtn.addEventListener('click', () => this.startGame());
        }
        
        const submitAnswerBtn = document.getElementById('submitAnswer');
        if (submitAnswerBtn) {
            submitAnswerBtn.addEventListener('click', () => this.submitAnswer());
        }
        
        const playAgainBtn = document.getElementById('playAgain');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => this.playAgain());
        }
        
        const backToHomeBtn = document.getElementById('backToHome');
        if (backToHomeBtn) {
            backToHomeBtn.addEventListener('click', () => this.backToHome());
        }
        
    }

    // 開始遊戲
    startGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.isAnswered = false;
        
        this.displayQuestion();
        this.updateScore();
        this.updateProgress();
    }

    // 顯示指定頁面
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }

    // 顯示當前題目
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionTypeEl = document.getElementById('questionType');
        const questionContentEl = document.getElementById('questionContent');
        const questionImageEl = document.getElementById('questionImage');
        const answerOptionsEl = document.getElementById('answerOptions');
        const inputContainerEl = document.getElementById('inputContainer');
        
        // 重置狀態
        answerOptionsEl.innerHTML = '';
        inputContainerEl.style.display = 'none';
        this.isAnswered = false;
        
        if (question.type === 'guess_player') {
            questionTypeEl.textContent = '猜球員題';
            questionContentEl.textContent = question.question;
            questionImageEl.innerHTML = `<img src="${question.image}" alt="球員照片">`;
            
            // 打亂選項順序並記錄正確答案的新位置
            const shuffledOptions = this.shuffleOptions(question.options, question.answer);
            
            // 顯示選擇題選項
            shuffledOptions.options.forEach((option, index) => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'option-btn';
                optionBtn.textContent = option;
                optionBtn.addEventListener('click', () => this.selectOption(index, optionBtn));
                answerOptionsEl.appendChild(optionBtn);
            });
            
            // 更新正確答案的索引
            question.shuffledAnswer = shuffledOptions.correctIndex;
        } else if (question.type === 'rules') {
            questionTypeEl.textContent = '規則題';
            questionContentEl.textContent = question.question;
            questionImageEl.innerHTML = '';
            
            // 打亂選項順序並記錄正確答案的新位置
            const shuffledOptions = this.shuffleOptions(question.options, question.answer);
            
            shuffledOptions.options.forEach((option, index) => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'option-btn';
                optionBtn.textContent = option;
                optionBtn.addEventListener('click', () => this.selectOption(index, optionBtn));
                answerOptionsEl.appendChild(optionBtn);
            });
            
            // 更新正確答案的索引
            question.shuffledAnswer = shuffledOptions.correctIndex;
        } else if (question.type === 'history_record') {
            questionTypeEl.textContent = '歷史/紀錄題';
            questionContentEl.textContent = question.question;
            questionImageEl.innerHTML = '';
            
            // 打亂選項順序並記錄正確答案的新位置
            const shuffledOptions = this.shuffleOptions(question.options, question.answer);
            
            shuffledOptions.options.forEach((option, index) => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'option-btn';
                optionBtn.textContent = option;
                optionBtn.addEventListener('click', () => this.selectOption(index, optionBtn));
                answerOptionsEl.appendChild(optionBtn);
            });
            
            // 更新正確答案的索引
            question.shuffledAnswer = shuffledOptions.correctIndex;
        }
        
        this.updateQuestionNumber();
    }
    
    // 打亂選項順序
    shuffleOptions(options, correctIndex) {
        // 創建包含選項和索引的陣列
        const indexedOptions = options.map((option, index) => ({
            option: option,
            isCorrect: index === correctIndex
        }));
        
        // 打亂陣列
        for (let i = indexedOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indexedOptions[i], indexedOptions[j]] = [indexedOptions[j], indexedOptions[i]];
        }
        
        // 找出正確答案的新位置
        const newCorrectIndex = indexedOptions.findIndex(item => item.isCorrect);
        const shuffledOptions = indexedOptions.map(item => item.option);
        
        return {
            options: shuffledOptions,
            correctIndex: newCorrectIndex
        };
    }

    // 選擇選項
    selectOption(index, button) {
        if (this.isAnswered) return;
        
        // 移除其他選項的選中狀態
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // 選中當前選項
        button.classList.add('selected');
        this.currentAnswer = index;
        
        // 自動提交答案
        setTimeout(() => {
            this.submitAnswer();
        }, 500);
    }

    // 提交答案
    submitAnswer() {
        if (this.isAnswered) return;
        
        const question = this.questions[this.currentQuestion];
        let isCorrect = false;
        
        // 使用打亂後的答案索引
        if (question.type === 'guess_player' || question.type === 'rules' || question.type === 'history_record') {
            isCorrect = this.currentAnswer === question.shuffledAnswer;
        }
        
        this.isAnswered = true;
        
        if (isCorrect) {
            this.score += 10;
            this.correctAnswers++;
            this.showFeedback('正確！', 'correct');
        } else {
            this.showFeedback(`錯誤！正確答案是：${question.correct}`, 'incorrect');
        }
        
        this.updateScore();
        this.showNextButton();
    }

    // 顯示反饋
    showFeedback(message, type) {
        const feedbackEl = document.createElement('div');
        feedbackEl.className = `feedback ${type}`;
        feedbackEl.textContent = message;
        feedbackEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${type === 'correct' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 1.2rem;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(feedbackEl);
        
        setTimeout(() => {
            document.body.removeChild(feedbackEl);
        }, 2000);
    }

    // 顯示下一題按鈕
    showNextButton() {
        // 如果還有下一題，自動進入下一題
        if (this.currentQuestion < this.questions.length - 1) {
            setTimeout(() => {
                this.nextQuestion();
            }, 2500);
        } else {
            // 5題答完，顯示結果頁面
            setTimeout(() => {
                this.showResultPage();
            }, 2500);
        }
    }

    // 下一題
    nextQuestion() {
        this.currentQuestion++;
        this.updateProgress();
        this.displayQuestion();
    }

    // 顯示結果頁面
    showResultPage() {
        this.showPage('resultPage');
        
        // 顯示答對題數
        document.getElementById('correctCount').textContent = this.correctAnswers;
        
        // 根據答對題數決定禮物
        let giftName = '';
        
        if (this.correctAnswers >= 4) {
            // 答對4題以上：麥香紅茶 + 嗨啾
            giftName = `🥤 麥香紅茶 + 🍬 ${this.correctAnswers} 顆嗨啾`;
        } else if (this.correctAnswers > 0) {
            // 答對1-3題：只有嗨啾
            giftName = `🍬 ${this.correctAnswers} 顆嗨啾`;
        } else {
            // 答對0題：鼓勵獎
            giftName = '💪 加油券（下次再挑戰！）';
        }
        
        document.getElementById('giftName').textContent = giftName;
    }

    // 再玩一次
    playAgain() {
        this.initializeGame();
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.isAnswered = false;
        
        this.showPage('gamePage');
        this.displayQuestion();
        this.updateScore();
        this.updateProgress();
    }

    // 回到首頁
    backToHome() {
        window.location.href = 'index.html';
    }


    // 更新分數
    updateScore() {
        document.getElementById('currentScore').textContent = this.score;
    }

    // 更新題目編號
    updateQuestionNumber() {
        document.getElementById('currentQuestion').textContent = this.currentQuestion + 1;
    }

    // 更新進度條
    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
    }
}

// 當頁面載入完成時初始化遊戲
document.addEventListener('DOMContentLoaded', () => {
    // 只在 topic.html 頁面初始化遊戲
    if (document.getElementById('gamePage')) {
        const game = new BasketballGame();
        game.startGame();
    }
});

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
                options: ['James Harden', 'Stephen Curry', 'Damian Lillard', 'Russell Westbrook'],
                answer: 0,
                correct: 'James Harden'
            },
            {
                type: 'guess_player',
                image: 'Jimmy Butler.jpg',
                question: '這位球員以強硬的防守和關鍵時刻的表現著稱，曾帶領球隊進入總決賽，請問他是誰？',
                options: ['Jimmy Butler', 'Kawhi Leonard', 'Paul George', 'Jayson Tatum'],
                answer: 0,
                correct: 'Jimmy Butler'
            },
            {
                type: 'guess_player',
                image: 'Jordan Poole.jpg',
                question: '這位年輕球員以出色的投籃能力和關鍵時刻的表現聞名，曾幫助球隊奪冠，請問他是誰？',
                options: ['Jordan Poole', 'Tyler Herro', 'Anfernee Simons', 'Cole Anthony'],
                answer: 0,
                correct: 'Jordan Poole'
            },
            {
                type: 'guess_player',
                image: 'Kyrie Andrew.jpg',
                question: '這位球員以華麗的運球技巧和關鍵時刻的投籃聞名，曾與LeBron James一起奪冠，請問他是誰？',
                options: ['Kyrie Irving', 'Damian Lillard', 'Kemba Walker', 'John Wall'],
                answer: 0,
                correct: 'Kyrie Irving'
            },
            {
                type: 'guess_player',
                image: 'LeBronJames.jpg',
                question: '這位球員被稱為「小皇帝」，是現役最偉大的球員之一，請問他是誰？',
                options: ['LeBron James', 'Kevin Durant', 'Giannis Antetokounmpo', 'Luka Doncic'],
                answer: 0,
                correct: 'LeBron James'
            },
            {
                type: 'guess_player',
                image: 'Lonzo Ball.jpg',
                question: '這位球員以出色的傳球視野和防守能力著稱，來自著名的Ball家族，請問他是誰？',
                options: ['Lonzo Ball', 'LaMelo Ball', 'Lonzo Ball', 'Lonzo Ball'],
                answer: 0,
                correct: 'Lonzo Ball'
            },
            {
                type: 'guess_player',
                image: 'Nikola Jokić.jpg',
                question: '這位來自塞爾維亞的中鋒以全能表現著稱，綽號「小丑」，曾獲得MVP，請問他是誰？',
                options: ['Nikola Jokić', 'Joel Embiid', 'Rudy Gobert', 'Bam Adebayo'],
                answer: 0,
                correct: 'Nikola Jokić'
            },
            {
                type: 'guess_player',
                image: 'Paul Clifton.jpg',
                question: '這位球員以出色的控球技巧和關鍵時刻的表現著稱，曾多次入選全明星，請問他是誰？',
                options: ['Chris Paul', 'Russell Westbrook', 'John Wall', 'Kyle Lowry'],
                answer: 0,
                correct: 'Chris Paul'
            }
        ];
        
        this.shuffleQuestions();
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
            
            // 顯示選擇題選項
            question.options.forEach((option, index) => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'option-btn';
                optionBtn.textContent = option;
                optionBtn.addEventListener('click', () => this.selectOption(index, optionBtn));
                answerOptionsEl.appendChild(optionBtn);
            });
        } else if (question.type === 'history_record') {
            questionTypeEl.textContent = '歷史/紀錄題';
            questionContentEl.textContent = question.question;
            questionImageEl.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'option-btn';
                optionBtn.textContent = option;
                optionBtn.addEventListener('click', () => this.selectOption(index, optionBtn));
                answerOptionsEl.appendChild(optionBtn);
            });
        }
        
        this.updateQuestionNumber();
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
        
        if (question.type === 'guess_player') {
            isCorrect = this.currentAnswer === question.answer;
        } else if (question.type === 'history_record') {
            isCorrect = this.currentAnswer === question.answer;
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
            // 5題答完，自動顯示結果
            setTimeout(() => {
                this.finishGame();
            }, 2500);
        }
    }

    // 下一題
    nextQuestion() {
        this.currentQuestion++;
        this.updateProgress();
        this.displayQuestion();
    }

    // 完成遊戲
    finishGame() {
        this.showPage('resultPage');
        this.displayResults();
    }

    // 顯示結果
    displayResults() {
        const finalScoreEl = document.getElementById('finalScore');
        const correctAnswersEl = document.getElementById('correctAnswers');
        const accuracyEl = document.getElementById('accuracy');
        const scoreMessageEl = document.getElementById('scoreMessage');
        
        finalScoreEl.textContent = this.score;
        correctAnswersEl.textContent = this.correctAnswers;
        
        const accuracy = (this.correctAnswers / this.questions.length) * 100;
        accuracyEl.textContent = `${accuracy.toFixed(0)}%`;
        
        // 根據分數顯示不同訊息
        let message = '';
        let messageClass = '';
        
        if (this.score >= 40) {
            message = '🏆 太棒了！你是真正的NBA專家！';
            messageClass = 'excellent';
        } else if (this.score >= 30) {
            message = '👍 表現不錯！繼續加油！';
            messageClass = 'good';
        } else if (this.score >= 20) {
            message = '📚 還有進步空間，多了解NBA吧！';
            messageClass = 'average';
        } else {
            message = '💪 沒關係，多練習就能進步！';
            messageClass = 'poor';
        }
        
        scoreMessageEl.textContent = message;
        scoreMessageEl.className = `score-message ${messageClass}`;
    }

    // 再玩一次
    playAgain() {
        this.initializeGame();
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

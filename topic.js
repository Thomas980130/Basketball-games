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
                options: ['Paul George保羅·喬治', 'Russell Westbrook 羅素·衛斯特布魯克', 'John Wall 約翰·沃爾', 'Kyle Lowry 凱爾·洛瑞'],
                answer: 0,
                correct: 'Paul George保羅·喬治'
            },
            {
                type: 'guess_player',
                image: 'Victor Wembanyama.jpg',
                question: '這位法國新秀身高超過7呎，被譽為「外星人」，擁有驚人的臂展和全能技巧，請問他是誰？',
                options: ['Victor Wembanyama 維克托·文班亞馬', 'Chet Holmgren 切特·霍姆格倫', 'Paolo Banchero 保羅·班凱羅', 'Jabari Smith Jr. 賈巴里·史密斯'],
                answer: 0,
                correct: 'Victor Wembanyama 維克托·文班亞馬'
            },
            {
                type: 'guess_player',
                image: 'zion.jpeg',
                question: '這位球員以爆發力驚人的扣籃和強壯體格聞名，是2019年選秀狀元，請問他是誰？',
                options: ['Zion Williamson 錫安·威廉森', 'Ja Morant 賈·莫蘭特', 'RJ Barrett RJ·巴雷特', 'Darius Garland 達里厄斯·加蘭'],
                answer: 0,
                correct: 'Zion Williamson 錫安·威廉森'
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
            {
                type: 'rules',
                question: 'NBA比賽中，進攻時球隊必須在幾秒內過半場？',
                options: ['8秒', '10秒', '12秒', '15秒'],
                answer: 0,
                correct: '8秒'
            },
            {
                type: 'rules',
                question: '「三秒違例」指的是什麼情況？',
                options: ['進攻球員在禁區停留超過3秒', '防守球員在禁區停留超過3秒', '球員持球超過3秒', '球員運球超過3秒'],
                answer: 0,
                correct: '進攻球員在禁區停留超過3秒'
            },
            {
                type: 'rules',
                question: '球員持球面對防守時，最多可以站立幾秒不能移動？',
                options: ['5秒', '3秒', '8秒', '10秒'],
                answer: 0,
                correct: '5秒'
            },
            {
                type: 'rules',
                question: '「背後運球」是什麼違例？',
                options: ['不是違例，是合法動作', '運球時手在球下方', '運球時球過肩', '運球時手在球後方'],
                answer: 0,
                correct: '不是違例，是合法動作'
            },
            {
                type: 'rules',
                question: '球員被犯規但仍投進球，這叫什麼？',
                options: ['And-1', '技術犯規', '惡意犯規', '進攻犯規'],
                answer: 0,
                correct: 'And-1'
            },
            {
                type: 'rules',
                question: '如果球在邊線或底線外觸地，這叫什麼？',
                options: ['出界', '違例', '犯規', '失誤'],
                answer: 0,
                correct: '出界'
            },
            {
                type: 'rules',
                question: 'NBA季後賽採取幾戰幾勝制？',
                options: ['7戰4勝', '5戰3勝', '3戰2勝', '9戰5勝'],
                answer: 0,
                correct: '7戰4勝'
            },
            {
                type: 'rules',
                question: '球員空中接球後落地再投籃，這算幾分？',
                options: ['2分', '3分', '1分', '不算分'],
                answer: 0,
                correct: '2分'
            },
            {
                type: 'rules',
                question: '當球隊犯規超過限制，對方可獲得幾次罰球？',
                options: ['2次', '1次', '3次', '4次'],
                answer: 0,
                correct: '2次'
            },
            {
                type: 'rules',
                question: '「跳球」通常發生在什麼情況？',
                options: ['比賽開始時', '爭球時', '技術犯規時', '惡意犯規時'],
                answer: 0,
                correct: '比賽開始時'
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
            },
            {
                type: 'history_record',
                question: 'NBA歷史上得分王是誰？總得分多少？',
                options: ['LeBron James 勒布朗·詹姆斯，超過38,000分', 'Kareem Abdul-Jabbar 卡里姆·阿卜杜勒·賈巴爾，38,387分', 'Kobe Bryant 科比·布萊恩特，33,643分', 'Michael Jordan 麥可·喬丹，32,292分'],
                answer: 0,
                correct: 'LeBron James 勒布朗·詹姆斯，超過38,000分'
            },
            {
                type: 'history_record',
                question: 'NBA史上最年輕的MVP球員是誰？',
                options: ['Derrick Rose 德里克·羅斯', 'LeBron James 勒布朗·詹姆斯', 'Magic Johnson 魔術強森', 'Kobe Bryant 科比·布萊恩特'],
                answer: 0,
                correct: 'Derrick Rose 德里克·羅斯'
            },
            {
                type: 'history_record',
                question: '哪位球星有「黑曼巴」的綽號？',
                options: ['Kobe Bryant 科比·布萊恩特', 'LeBron James 勒布朗·詹姆斯', 'Michael Jordan 麥可·喬丹', 'Allen Iverson 艾倫·艾佛森'],
                answer: 0,
                correct: 'Kobe Bryant 科比·布萊恩特'
            },
            {
                type: 'history_record',
                question: '哪位球星在季後賽拿下最多三分球？',
                options: ['Stephen Curry 史蒂芬·柯瑞', 'Ray Allen 雷·艾倫', 'Reggie Miller 雷吉·米勒', 'Klay Thompson 克萊·湯普森'],
                answer: 0,
                correct: 'Stephen Curry 史蒂芬·柯瑞'
            },
            {
                type: 'history_record',
                question: 'NBA總冠軍戒指最多的球員是誰？',
                options: ['Bill Russell 比爾·羅素，11枚', 'Sam Jones 山姆·瓊斯，10枚', 'Kobe Bryant 科比·布萊恩特，5枚', 'Michael Jordan 麥可·喬丹，6枚'],
                answer: 0,
                correct: 'Bill Russell 比爾·羅素，11枚'
            },
            {
                type: 'history_record',
                question: '哪位球員被稱為「閃電俠」？',
                options: ['Dwyane Wade 德韋恩·韋德', 'Russell Westbrook 羅素·衛斯特布魯克', 'John Wall 約翰·沃爾', 'Derrick Rose 德里克·羅斯'],
                answer: 0,
                correct: 'Dwyane Wade 德韋恩·韋德'
            },
            {
                type: 'history_record',
                question: '哪支球隊的吉祥物是「灰熊」？',
                options: ['曼菲斯灰熊', '明尼蘇達灰狼', '丹佛金塊', '猶他爵士'],
                answer: 0,
                correct: '曼菲斯灰熊'
            },
            {
                type: 'history_record',
                question: 'NBA單場三雙紀錄保持者是誰？',
                options: ['Russell Westbrook 羅素·衛斯特布魯克', 'Magic Johnson 魔術強森', 'LeBron James 勒布朗·詹姆斯', 'Jason Kidd 傑森·基德'],
                answer: 0,
                correct: 'Russell Westbrook 羅素·衛斯特布魯克'
            },
            {
                type: 'history_record',
                question: '哪位球員曾經效力湖人、熱火、騎士三隊都拿過總冠軍？',
                options: ['LeBron James 勒布朗·詹姆斯', 'Shaquille O\'Neal 俠客·歐尼爾', 'Dennis Rodman 丹尼斯·羅德曼', 'Gary Payton 蓋瑞·裴頓'],
                answer: 0,
                correct: 'LeBron James 勒布朗·詹姆斯'
            },
            {
                type: 'history_record',
                question: 'NBA最長連勝紀錄是哪支球隊創下的？',
                options: ['洛杉磯湖人（33連勝）', '波士頓塞爾提克（19連勝）', '金州勇士（24連勝）', '邁阿密熱火（27連勝）'],
                answer: 0,
                correct: '洛杉磯湖人（33連勝）'
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
        if (this.currentQuestion < 4) { // 0-3是前4題，4是第5題
            setTimeout(() => {
                this.nextQuestion();
            }, 2500);
        } else {
            // 第5題答完，顯示結果頁面
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
        // 隱藏遊戲頁面，顯示結果頁面
        document.getElementById('gamePage').classList.remove('active');
        document.getElementById('resultPage').classList.add('active');
        
        // 更新最終分數
        document.getElementById('finalScore').textContent = this.correctAnswers;
        
        // 根據答對題數決定禮物
        let giftItem = '';
        
        if (this.correctAnswers === 5) {
            // 答對5題：麥香紅茶 + 1顆嗨啾
            giftItem = '🥤 麥香紅茶 + 🍬 1 顆嗨啾';
        } else if (this.correctAnswers === 4) {
            // 答對4題：只有麥香紅茶
            giftItem = '🥤 麥香紅茶';
        } else if (this.correctAnswers >= 1 && this.correctAnswers <= 3) {
            // 答對1-3題：只有嗨啾（一題一顆）
            giftItem = `🍬 ${this.correctAnswers} 顆嗨啾`;
        } else {
            // 答對0題：什麼都沒有
            giftItem = '很可惜，沒有獲得獎品';
        }
        
        // 更新禮物內容
        document.getElementById('giftItem').textContent = giftItem;
        
        // 綁定按鈕事件
        document.getElementById('playAgain').onclick = () => this.playAgain();
        document.getElementById('backToHome').onclick = () => this.backToHome();
    }
    
    // 再玩一次
    playAgain() {
        // 重置遊戲狀態
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.selectedAnswer = null;
        
        // 重新開始遊戲
        this.init();
        
        // 切換回遊戲頁面
        document.getElementById('resultPage').classList.remove('active');
        document.getElementById('gamePage').classList.add('active');
    }
    
    // 回到首頁
    backToHome() {
        window.location.href = 'index.html';
    }



    // 更新分數
    updateScore() {
        document.getElementById('currentScore').textContent = this.correctAnswers;
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

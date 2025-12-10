class ConvenienceStoreGame {
    // 音声シミュレーション用の効果音システム
    playHorrorSound(type) {
        // Web Audio APIを使用して効果音をシミュレート
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        switch(type) {
            case 'flicker':
                this.createElectricSound(audioContext);
                break;
            case 'static':
                this.createStaticSound(audioContext);
                break;
            case 'footsteps':
                this.createFootstepsSound(audioContext);
                break;
            case 'whisper':
                this.createWhisperSound(audioContext);
                break;
            case 'scream':
                this.createScreamSound(audioContext);
                break;
            case 'heartbeat':
                this.createHeartbeatSound(audioContext);
                break;
            case 'door_creak':
                this.createDoorCreakSound(audioContext);
                break;
            case 'glass_break':
                this.createGlassBreakSound(audioContext);
                break;
        }
    }

    createElectricSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.5);
    }

    createStaticSound(ctx) {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();
        
        source.buffer = buffer;
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
        
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();
    }

    createFootstepsSound(ctx) {
        for (let i = 0; i < 5; i++) {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 80 + Math.random() * 40;
            
            gainNode.gain.setValueAtTime(0.4, ctx.currentTime + i * 0.4);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.4 + 0.2);
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.start(ctx.currentTime + i * 0.4);
            oscillator.stop(ctx.currentTime + i * 0.4 + 0.2);
        }
    }

    createWhisperSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, ctx.currentTime);
        
        filter.type = 'lowpass';
        filter.frequency.value = 300;
        
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 2);
    }

    createScreamSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.3);
        oscillator.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1);
        
        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 1);
    }

    createHeartbeatSound(ctx) {
        for (let i = 0; i < 3; i++) {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 60;
            
            gainNode.gain.setValueAtTime(0.6, ctx.currentTime + i * 0.8);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.8 + 0.3);
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.start(ctx.currentTime + i * 0.8);
            oscillator.stop(ctx.currentTime + i * 0.8 + 0.3);
        }
    }

    createDoorCreakSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1.5);
        
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 1.5);
    }

    createGlassBreakSound(ctx) {
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * Math.exp(-i / bufferSize * 10);
        }
        
        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        source.buffer = buffer;
        filter.type = 'highpass';
        filter.frequency.value = 2000;
        
        gainNode.gain.value = 0.5;
        
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();
    }

    // ホラー効果の初期化
    initHorrorEffects() {
        this.originalBgColor = document.body.style.background;
        this.horrorEventActive = false;
    }

    triggerHorrorEffect(type) {
        const gameScreen = this.screens.game;
        this.horrorEventActive = true;

        switch (type) {
            case 'flicker':
                this.flickerEffect(gameScreen);
                this.playHorrorSound('flicker');
                // 恐怖レベルが高いほど長く続く
                setTimeout(() => {
                    this.horrorEventActive = false;
                }, 3000 + (this.scaryLevel * 1000));
                return;
            case 'static':
                this.staticEffect(gameScreen);
                this.playHorrorSound('static');
                // 追加の効果音
                setTimeout(() => this.playHorrorSound('whisper'), 500);
                break;
            case 'bloodStain':
                this.bloodStainEffect();
                this.playHorrorSound('heartbeat');
                // 血の滴り効果も追加
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => this.bloodDripEffect(), i * 500);
                }
                break;
            case 'mirror':
                this.mirrorEffect();
                this.playHorrorSound('whisper');
                // 画面の揺れも追加
                this.screenShakeEffect();
                break;
            case 'timeDistortion':
                this.timeDistortionEffect();
                this.playHorrorSound('static');
                // 複数の効果音を組み合わせ
                setTimeout(() => this.playHorrorSound('heartbeat'), 1000);
                setTimeout(() => this.playHorrorSound('door_creak'), 2000);
                break;
            case 'finalPhase':
                this.finalPhaseEffect();
                this.playHorrorSound('scream');
                // 連続で効果音を再生
                setTimeout(() => this.playHorrorSound('heartbeat'), 1000);
                setTimeout(() => this.playHorrorSound('static'), 2000);
                setTimeout(() => this.playHorrorSound('scream'), 3000);
                break;
            case 'ultimateHorror':
                this.ultimateHorrorEffect();
                this.playHorrorSound('scream');
                setTimeout(() => this.playHorrorSound('heartbeat'), 1000);
                setTimeout(() => this.playHorrorSound('scream'), 2000);
                setTimeout(() => this.playHorrorSound('static'), 3000);
                // 画面の激しい揺れ
                this.screenShakeEffect();
                setTimeout(() => this.screenShakeEffect(), 1000);
                break;
            case 'general':
                this.generalHorrorEffect();
                this.playHorrorSound('footsteps');
                // ランダムに追加効果音
                if (Math.random() < 0.5) {
                    setTimeout(() => this.playHorrorSound('whisper'), 500);
                }
                break;
        }

        setTimeout(() => {
            this.horrorEventActive = false;
        }, 3000 + (this.scaryLevel * 500));
    }

    flickerEffect(element) {
        // 点滅効果を無効化 - 代わりに一度だけ暗くなる効果
        element.style.filter = 'brightness(0.8)';
        setTimeout(() => {
            element.style.filter = 'brightness(1)';
        }, 500);
    }

    staticEffect(element) {
        element.classList.add('static-effect');
        setTimeout(() => {
            element.classList.remove('static-effect');
        }, 3000);
    }

    bloodStainEffect() {
        document.body.classList.add('blood-effect');
        setTimeout(() => {
            document.body.classList.remove('blood-effect');
        }, 5000);
    }

    mirrorEffect() {
        const customer = this.gameElements.customer;
        customer.classList.add('mirror-effect');
        setTimeout(() => {
            customer.classList.remove('mirror-effect');
        }, 2000);
    }

    timeDistortionEffect() {
        this.gameElements.timeDisplay.classList.add('time-distortion');
        setTimeout(() => {
            this.gameElements.timeDisplay.classList.remove('time-distortion');
        }, 4000);
    }

    finalPhaseEffect() {
        document.body.classList.add('final-phase');
        this.gameElements.registerScreen.style.color = '#ff0000';
        setTimeout(() => {
            this.gameElements.registerScreen.style.color = '#00ff00';
        }, 6000);
    }

    ultimateHorrorEffect() {
        // 究極の恐怖演出（点滅を無効化）
        document.body.style.filter = 'brightness(0.7) contrast(150%) saturate(120%)';
        this.gameElements.customer.style.transform = 'scale(1.2)';
        this.gameElements.registerScreen.textContent = '助けて...助けて...助けて...';
        this.gameElements.registerScreen.style.color = '#ff0000';
        
        // 点滅を無効化 - 代わりに一度だけ効果を適用して徐々に戻す
        setTimeout(() => {
            document.body.style.filter = 'brightness(0.8) contrast(130%)';
            setTimeout(() => {
                document.body.style.filter = 'none';
                this.gameElements.customer.style.transform = 'scale(1) rotate(0deg)';
                this.gameElements.registerScreen.style.color = '#00ff00';
            }, 1000);
        }, 2000);
    }

    generalHorrorEffect() {
        const effects = ['brightness(0.5)', 'contrast(150%)', 'hue-rotate(180deg)', 'saturate(200%)'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        
        document.body.style.filter = randomEffect;
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 2000);
    }

    // 新しい環境恐怖効果
    subtleFlickerEffect() {
        // 点滅効果を無効化 - 代わりに一度だけ暗くなる効果
        const gameScreen = this.screens.game;
        gameScreen.style.filter = 'brightness(0.9)';
        setTimeout(() => {
            gameScreen.style.filter = 'brightness(1)';
        }, 300);
    }

    shadowMovementEffect() {
        const shadow = document.createElement('div');
        shadow.className = 'horror-shadow';
        shadow.style.cssText = `
            position: fixed;
            top: ${Math.random() * 50}%;
            left: ${Math.random() * 50}%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(0,0,0,0.8) 0%, transparent 70%);
            pointer-events: none;
            z-index: 999;
            animation: shadowMove 3s ease-out forwards;
        `;
        document.body.appendChild(shadow);
        
        setTimeout(() => {
            shadow.remove();
        }, 3000);
    }

    bloodDripEffect() {
        const drip = document.createElement('div');
        drip.className = 'blood-drip';
        drip.style.cssText = `
            position: fixed;
            top: 0;
            left: ${Math.random() * 100}%;
            width: 3px;
            height: 100vh;
            background: linear-gradient(to bottom, rgba(200,0,0,0.8), rgba(100,0,0,0.4));
            pointer-events: none;
            z-index: 998;
            animation: bloodDrip 2s ease-out forwards;
        `;
        document.body.appendChild(drip);
        
        setTimeout(() => {
            drip.remove();
        }, 2000);
    }

    screenShakeEffect() {
        const gameScreen = this.screens.game;
        let count = 0;
        const interval = setInterval(() => {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            gameScreen.style.transform = `translate(${x}px, ${y}px)`;
            count++;
            if (count > 10) {
                clearInterval(interval);
                gameScreen.style.transform = 'translate(0, 0)';
            }
        }, 50);
    }

    glitchEffect() {
        const gameScreen = this.screens.game;
        gameScreen.classList.add('glitch-effect');
        setTimeout(() => {
            gameScreen.classList.remove('glitch-effect');
        }, 500);
    }

    // 絵文字が浮かび上がる演出
    showEventEmoji(emoji, position = 'center', duration = 3000) {
        const emojiArea = this.gameElements.eventEmojiArea;
        if (!emojiArea) return;

        const emojiElement = document.createElement('div');
        emojiElement.className = 'event-emoji';
        emojiElement.textContent = emoji;
        
        // 位置を設定
        const positions = {
            'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
            'top-left': { top: '20%', left: '20%' },
            'top-right': { top: '20%', right: '20%' },
            'bottom-left': { bottom: '20%', left: '20%' },
            'bottom-right': { bottom: '20%', right: '20%' },
            'left': { top: '50%', left: '10%', transform: 'translateY(-50%)' },
            'right': { top: '50%', right: '10%', transform: 'translateY(-50%)' },
            'top': { top: '15%', left: '50%', transform: 'translateX(-50%)' },
            'bottom': { bottom: '15%', left: '50%', transform: 'translateX(-50%)' }
        };

        const pos = positions[position] || positions['center'];
        
        // 画面サイズに応じて絵文字サイズを調整
        const isMobile = window.innerWidth <= 768;
        const emojiSize = isMobile ? '3.5rem' : '5rem';
        
        Object.assign(emojiElement.style, {
            position: 'fixed',
            fontSize: emojiSize,
            zIndex: '1000',
            pointerEvents: 'none',
            animation: 'emojiFloat 3s ease-out forwards',
            ...pos
        });

        emojiArea.appendChild(emojiElement);

        setTimeout(() => {
            emojiElement.remove();
        }, duration);
    }

    // ゲーム状態管理
    constructor() {
        this.gameState = 'start';
        this.currentTime = 0;
        this.health = 100;
        this.sanity = 100;
        this.score = 0;
        this.events = [];
        this.currentCustomer = null;
        this.customerQueue = [];
        this.workQueue = [];
        this.isEventActive = false;

        this.timeMultiplier = 20;

        // ホラー要素の制御
        this.scaryLevel = 0;
        this.yamadaCounter = 0;
        this.mirrorEvents = 0;
        this.timeAnomalies = 0;
        this.bloodEvents = 0;
        this.ultimateHorrorCount = 0;
        this.finalPhase = false;
        this.ambientSoundInterval = null;
        this.lastAmbientSound = 0;
        
        // 特別イベントのフラグ
        this.strangeCustomersEvent = false;
        this.microwaveEvent = false;

        this.eventMessages = this.initEventMessages();
        this.customers = this.initCustomers();

        // ミッションシステム
        this.missions = [];
        this.completedMissions = [];
        this.workCounts = {
            register: 0,
            restock: 0,
            clean: 0,
            coffee: 0
        };
        this.customerCount = 0;
        this.missionPanelExpanded = true;

        this.initElements();
        this.bindEvents();
        this.startGameLoop();
        this.initHorrorEffects();
        this.initMissions();
    }

    initElements() {
        this.screens = {
            start: document.getElementById('startScreen'),
            game: document.getElementById('gameScreen'),
            end: document.getElementById('endScreen')
        };
        
        this.gameElements = {
            timeDisplay: document.getElementById('timeDisplay'),
            healthFill: document.getElementById('healthFill'),
            sanityFill: document.getElementById('sanityFill'),
            customer: document.getElementById('customer'),
            customerSpeech: document.getElementById('customerSpeech'),
            registerScreen: document.getElementById('registerScreen'),
            eventMessage: document.getElementById('eventMessage'),
            eventText: document.getElementById('eventText'),
            endTitle: document.getElementById('endTitle'),
            endMessage: document.getElementById('endMessage'),
            missionContent: document.getElementById('missionContent'),
            missionPanel: document.getElementById('missionPanel'),
            missionList: document.getElementById('missionList'),
            eventEmojiArea: document.getElementById('eventEmojiArea')
        };
        
        this.buttons = {
            start: document.getElementById('startBtn'),
            restart: document.getElementById('restartBtn'),
            eventOk: document.getElementById('eventOk'),
            workBtns: document.querySelectorAll('.work-btn'),
            missionToggle: document.getElementById('missionToggle')
        };

        this.audio = {
            bgm: document.getElementById('bgm'),
            sfx: document.getElementById('sfx')
        };
    }

    initEventMessages() {
        return {
            phase1: [
                "お客さんが来ました... 顔が見えませんね",
                "商品の補充が必要です\n棚の奥に赤い染みが...",
                "店内が汚れています\nこの汚れ... 血のような色ですね",
                "コーヒーを飲んで休憩を\n苦い... いつもより苦い...",
                "レジの音が変です\nピッ... ピッ... ピッ...",
                "電話が鳴っています\n出ても誰も話しません",
                "監視カメラの映像が乱れています\n誰かがこちらを見ています",
                "冷凍庫から音がします\nドンドンと... まるで中から叩いているような",
                "バックヤードのドアが少し開いています\n中は真っ暗です"
            ],
            phase2: [
                "客が同じ人ばかり来ます...\n全員同じ顔... 同じ服...",
                "監視カメラに映る影\nあなたの後ろに... 誰かいます",
                "店の電気が点滅しています\nS.O.S... S.O.S... S.O.S...",
                "外から足音が聞こえます\n窓を見ないでください",
                "商品が勝手に動いています\n棚から... 落ちて... 割れて...",
                "バックヤードのドアが開いています\n中から呼ぶ声が聞こえます",
                "レジの画面にメッセージが\n『助けて... 私を... 助けて...』",
                "店内の温度が急に下がりました\n息が白くなっています",
                "壁に手の跡が... 血のような赤い手の跡が...",
                "トイレから水の流れる音が\nでも... 誰も使っていません",
                "天井から何かが落ちてきました\n赤い... 液体が...",
                "店の入り口で人影がゆらゆらと\n入ってこようとしません"
            ],
            phase3: [
                "お客が消えません！\n何度レジを通しても... 消えない...",
                "鏡に映る自分が笑っています\nなぜ... 笑っているんですか？",
                "店内に血の跡が...\n足跡が... あなたの足跡です",
                "同僚のヤマダさんが来ました\nでも... ヤマダさんは昨日...",
                "時計が逆回りしています\n時間が... 戻っている...",
                "あなたの声が聞こえます\n『助けて... 誰か... 助けて...』",
                "もうすぐ夜明けです...\nでも... 本当に夜明けは来るのでしょうか？",
                "店の外に人だかりが...\n全員こちらを見ています\n全員... あなたの顔です",
                "冷凍庫の中に人がいます\n前のヤマダさんが... まだ働いています",
                "あなたの制服が血まみれです\nいつから... なぜ...",
                "店内に子供の笑い声が響いています\n子供なんていないのに...",
                "レジの下から手が伸びています\n冷たい... 青白い手が...",
                "監視カメラに映るのは空っぽの店\nあなたは... どこにいるのですか？",
                "外の街灯が一つずつ消えています\n闇が... 近づいています"
            ],
            yamada_events: [
                "新しい店長のヤマダです\n前のヤマダはどこに行ったのでしょうね？",
                "ヤマダという名前\n何人目のヤマダでしょうか？",
                "あなたもいずれヤマダになります\nみんな... ヤマダになるんです",
                "制服に名札が...\n『ヤマダ』と書いてあります\nいつから？",
                "この店の歴史を知っていますか？\nヤマダさんが... 100人以上...",
                "あなたの前にも後にも\nみんなヤマダという名前になるんです",
                "冷凍庫を見てみてください\n歴代のヤマダさんが眠っています"
            ],
            final_events: [
                "夜明けまであと30分...\nでも外はまだ真っ暗です",
                "時計の針が震えています\n7時を指すのを拒んでいます",
                "あなたの制服が変わっています\n名札に『ヤマダ』と...",
                "店の入り口から歌声が\n『♪深夜のコンビニ 永遠に♪』",
                "最後のお客様です\nそれは... 鏡の中のあなたでした",
                "外の世界が消えています\nコンビニだけが... 残っています",
                "あなたの記憶が曖昧になってきました\n本当の名前は... なんでしたっけ？"
            ],
            ultimate_horror: [
                "店内の全ての商品が血まみれです\n全て... 赤く染まっています",
                "天井から無数の目玉が見下ろしています\n全て... あなたを見つめています",
                "床が肉の塊で出来ています\nぐちゅぐちゅと... 音を立てています",
                "あなたの体が透けて見えます\n幽霊に... なってしまったのですか？",
                "店内に死体が散乱しています\n全て... ヤマダという名札をつけています",
                "壁から血が滴り落ちています\nまるで店全体が... 生きているようです",
                "あなたの影が勝手に動いています\n影があなたを見て笑っています",
                "レジスターが人間の歯で出来ています\n打つ度に... 悲鳴が聞こえます"
            ]
        };
    }

    initCustomers() {
        return {
            normal: [
                { sprite: "😊", speech: "こんばんは... 深夜のお仕事大変ですね", reaction: "ありがとう... また来ます" },
                { sprite: "🧑", speech: "いつもここで働いてるんですか？", reaction: "前のヤマダさんはどこに？" },
                { sprite: "👩", speech: "この店、昔から変わらないですね", reaction: "時間が止まったみたい..." },
                { sprite: "👴", speech: "若いのに深夜勤務とは... 気をつけなさい", reaction: "この店は危険だ..." },
                { sprite: "🧒", speech: "お母さんを探しています", reaction: "お母さんも... ヤマダになりました" }
            ],
            strange: [
                { sprite: "😐", speech: "...いつも同じ時間に来てます", reaction: "...いつも同じ商品を..." },
                { sprite: "🤔", speech: "この店のヤマダさん、何人いるんですか？", reaction: "みんなヤマダになるんです" },
                { sprite: "😟", speech: "あなた、鏡を見ましたか？", reaction: "鏡の中の自分... 笑ってませんか？" },
                { sprite: "👻", speech: "深夜3時は危険な時間...", reaction: "時間が... 逆に回り始めます" },
                { sprite: "🔴", speech: "監視カメラ、見てますか？", reaction: "映ってはいけない物が..." },
                { sprite: "⚫", speech: "バックヤードに入ってはいけません", reaction: "前のヤマダさんがまだ..." },
                { sprite: "😵", speech: "この店で働くと死にます", reaction: "私も... もう死んでいます" },
                { sprite: "👥", speech: "私たちは同じ人間です", reaction: "あなたも... 私になります" }
            ],
            scary: [
                { sprite: "😨", speech: "助けて... 私もヤマダになってしまう...", reaction: "逃げられない... 逃げられない..." },
                { sprite: "👤", speech: "ここから出られません... もう7年も...", reaction: "あなたも... 仲間になりますね" },
                { sprite: "🩸", speech: "血の匂いがしませんか？", reaction: "バックヤードから... ずっと..." },
                { sprite: "💀", speech: "夜明けは来ません... 永遠に深夜です", reaction: "時計を見てください... 逆回りを" },
                { sprite: "👁️", speech: "あなたを見てる目があります", reaction: "監視カメラの向こうから..." },
                { sprite: "🌑", speech: "外を見てはいけません", reaction: "あなたの顔をした人たちが..." },
                { sprite: "⚰️", speech: "前のヤマダさんを知ってますか？", reaction: "冷凍庫の中に..." },
                { sprite: "😈", speech: "制服の名札... 見てください", reaction: "いつの間に『ヤマダ』に..." },
                { sprite: "🔪", speech: "包丁を研いでいます", reaction: "次は... あなたの番です" },
                { sprite: "🕳️", speech: "地下に穴を掘りました", reaction: "あなたの分の穴を..." },
                { sprite: "🪦", speech: "墓石に名前を刻みます", reaction: "『ヤマダ』と刻まれています" },
                { sprite: "🧟", speech: "ゾンビになってしまいました", reaction: "あなたも... 仲間になって..." }
            ],
            yamada: [
                { sprite: "👨‍💼", speech: "新任のヤマダです... 何代目でしょうか？", reaction: "あなたが次のヤマダです" },
                { sprite: "🤵", speech: "ヤマダという名前... 呪われているんです", reaction: "みんなヤマダになるんです" },
                { sprite: "👔", speech: "この制服を着ると... ヤマダになるんです", reaction: "もう逃れられません" },
                { sprite: "🧑‍💼", speech: "100代目のヤマダです", reaction: "あなたは101代目ですね" }
            ],
            final_boss: [
                { sprite: "🪞", speech: "鏡の中から来ました... あなたです", reaction: "一緒にヤマダになりましょう" },
                { sprite: "⏰", speech: "時間は止まりました... 永遠の深夜です", reaction: "夜明けは来ません" },
                { sprite: "🔄", speech: "これは夢ではありません... 現実です", reaction: "ようこそ、ヤマダさん" },
                { sprite: "👥", speech: "私たちは全員あなたです", reaction: "分裂した魂の欠片です" }
            ],
            ultimate_boss: [
                { sprite: "💀👻", speech: "全てのヤマダの怨念です", reaction: "あなたも我々の一部になります" },
                { sprite: "🌑🩸", speech: "深夜の闇そのものです", reaction: "光は二度と戻りません" },
                { sprite: "⚰️💀", speech: "死んだヤマダたちの集合体です", reaction: "安らかに... 永遠に働きなさい" }
            ]
        };
    }

    bindEvents() {
        this.buttons.start.addEventListener('click', () => {
            this.startGame();
        });
        
        this.buttons.restart.addEventListener('click', () => {
            this.resetGame();
        });
        
        this.buttons.eventOk.addEventListener('click', () => {
            this.closeEvent();
        });
        
        this.buttons.workBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.performWork(e.target.dataset.work);
            });
        });

        this.buttons.missionToggle.addEventListener('click', () => {
            this.toggleMissionPanel();
        });
    }

    // ミッションシステムの初期化
    initMissions() {
        this.missions = [
            {
                id: 'register_5',
                title: 'レジ対応を5回行う',
                description: 'お客さんを5人対応しよう',
                type: 'work',
                target: 'register',
                targetCount: 5,
                currentCount: 0,
                reward: { health: 10, sanity: 10, score: 50 },
                completed: false
            },
            {
                id: 'restock_3',
                title: '商品補充を3回行う',
                description: '棚を補充して店を整えよう',
                type: 'work',
                target: 'restock',
                targetCount: 3,
                currentCount: 0,
                reward: { health: 5, sanity: 5, score: 30 },
                completed: false
            },
            {
                id: 'clean_2',
                title: '清掃を2回行う',
                description: '店内を清潔に保とう',
                type: 'work',
                target: 'clean',
                targetCount: 2,
                currentCount: 0,
                reward: { health: 5, sanity: 15, score: 40 },
                completed: false
            },
            {
                id: 'customer_10',
                title: 'お客さんを10人対応する',
                description: '多くのお客さんを対応しよう',
                type: 'customer',
                targetCount: 10,
                currentCount: 0,
                reward: { health: 15, sanity: 10, score: 100 },
                completed: false
            },
            {
                id: 'survive_3am',
                title: '午前3時まで生き残る',
                description: '魔の時間の始まりまで耐え抜け',
                type: 'time',
                targetTime: 180, // 3時間 = 180分
                reward: { health: 20, sanity: 20, score: 150 },
                completed: false
            },
            {
                id: 'survive_5am',
                title: '午前5時まで生き残る',
                description: '監視カメラの異常まで耐え抜け',
                type: 'time',
                targetTime: 300, // 5時間 = 300分
                reward: { health: 30, sanity: 30, score: 250 },
                completed: false
            },
            {
                id: 'health_50',
                title: '体力を50以上維持する',
                description: '体力を50以上保ち続けよう',
                type: 'stat',
                target: 'health',
                targetValue: 50,
                reward: { health: 10, sanity: 10, score: 80 },
                completed: false
            },
            {
                id: 'sanity_30',
                title: '正気度30以上で午前4時を迎える',
                description: '正気を保ちながら夜を越えよう',
                type: 'conditional',
                condition: { time: 240, sanity: 30 },
                reward: { health: 15, sanity: 25, score: 120 },
                completed: false
            }
        ];
        this.updateMissionDisplay();
    }

    // ミッションパネルの表示/非表示
    toggleMissionPanel() {
        this.missionPanelExpanded = !this.missionPanelExpanded;
        if (this.missionPanelExpanded) {
            this.gameElements.missionList.style.display = 'block';
            this.buttons.missionToggle.textContent = '▼';
        } else {
            this.gameElements.missionList.style.display = 'none';
            this.buttons.missionToggle.textContent = '▲';
        }
    }

    // ミッション表示の更新
    updateMissionDisplay() {
        const content = this.gameElements.missionContent;
        if (!content) return;

        const activeMissions = this.missions.filter(m => !m.completed);
        const completedCount = this.completedMissions.length;

        if (activeMissions.length === 0 && completedCount === 0) {
            content.innerHTML = '<div class="mission-item">ミッションがありません</div>';
            return;
        }

        let html = '';
        
        // アクティブなミッション
        activeMissions.forEach(mission => {
            const progress = this.getMissionProgress(mission);
            const progressPercent = Math.min(100, (progress.current / progress.target) * 100);
            
            html += `
                <div class="mission-item ${mission.completed ? 'completed' : ''}">
                    <div class="mission-title">${mission.title}</div>
                    <div class="mission-description">${mission.description}</div>
                    <div class="mission-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <span class="progress-text">${progress.current} / ${progress.target}</span>
                    </div>
                    ${mission.reward ? `<div class="mission-reward">報酬: 体力+${mission.reward.health || 0} 正気+${mission.reward.sanity || 0} スコア+${mission.reward.score || 0}</div>` : ''}
                </div>
            `;
        });

        // 完了したミッション数
        if (completedCount > 0) {
            html += `<div class="mission-summary">✅ 完了: ${completedCount} / ${this.missions.length}</div>`;
        }

        content.innerHTML = html;
    }

    // ミッションの進捗を取得
    getMissionProgress(mission) {
        switch(mission.type) {
            case 'work':
                return {
                    current: this.workCounts[mission.target] || 0,
                    target: mission.targetCount
                };
            case 'customer':
                return {
                    current: this.customerCount || 0,
                    target: mission.targetCount
                };
            case 'time':
                return {
                    current: this.currentTime,
                    target: mission.targetTime
                };
            case 'stat':
                return {
                    current: this[mission.target] || 0,
                    target: mission.targetValue
                };
            case 'conditional':
                return {
                    current: 0,
                    target: 1
                };
            default:
                return { current: 0, target: 1 };
        }
    }

    // ミッションのチェック
    checkMissions() {
        this.missions.forEach(mission => {
            if (mission.completed) return;

            let completed = false;

            switch(mission.type) {
                case 'work':
                    if (this.workCounts[mission.target] >= mission.targetCount) {
                        completed = true;
                    }
                    break;
                case 'customer':
                    if (this.customerCount >= mission.targetCount) {
                        completed = true;
                    }
                    break;
                case 'time':
                    if (this.currentTime >= mission.targetTime) {
                        completed = true;
                    }
                    break;
                case 'stat':
                    if (this[mission.target] >= mission.targetValue) {
                        completed = true;
                    }
                    break;
                case 'conditional':
                    const hours = Math.floor(this.currentTime / 60);
                    if (hours >= Math.floor(mission.condition.time / 60) && 
                        this.sanity >= mission.condition.sanity) {
                        completed = true;
                    }
                    break;
            }

            if (completed && !mission.completed) {
                this.completeMission(mission);
            }
        });
    }

    // ミッション達成
    completeMission(mission) {
        mission.completed = true;
        this.completedMissions.push(mission.id);

        // 報酬を適用
        if (mission.reward) {
            if (mission.reward.health) {
                this.health = Math.min(100, this.health + mission.reward.health);
            }
            if (mission.reward.sanity) {
                this.sanity = Math.min(100, this.sanity + mission.reward.sanity);
            }
            if (mission.reward.score) {
                this.score += mission.reward.score;
            }
        }

        // 達成通知
        this.showEvent(`🎉 ミッション達成！\n\n${mission.title}\n\n報酬を受け取りました！`);
        
        // 効果音
        this.playHorrorSound('heartbeat');
        
        this.updateDisplay();
        this.updateMissionDisplay();
    }

    startGame() {
        this.gameState = 'playing';
        this.showScreen('game');
        this.updateDisplay();
        this.updateMissionDisplay(); // ミッション表示を初期化
        this.audio.bgm.currentTime = 0;
        this.audio.bgm.play();
        this.scheduleRandomEvents();
        this.startAmbientHorrorSounds();
    }

    resetGame() {
        this.currentTime = 0;
        this.health = 100;
        this.sanity = 100;
        this.score = 0;
        this.scaryLevel = 0;
        this.yamadaCounter = 0;
        this.ultimateHorrorCount = 0;
        this.isEventActive = false;
        this.currentCustomer = null;
        this.finalPhase = false;
        this.strangeCustomersEvent = false;
        this.microwaveEvent = false;
        this.gameState = 'start';
        this.showScreen('start');
        this.gameElements.registerScreen.textContent = "ようこそ！";
        this.hideCustomer();
        
        // ミッションのリセット
        this.workCounts = {
            register: 0,
            restock: 0,
            clean: 0,
            coffee: 0
        };
        this.customerCount = 0;
        this.completedMissions = [];
        this.initMissions(); // ミッションを再初期化
        
        // スタイルリセット（background-imageは保持）
        const gameContainer = document.getElementById('gameContainer');
        document.body.style.background = '';
        document.body.style.backgroundImage = '';
        document.body.style.filter = '';
        document.body.className = '';
        document.body.classList.remove('power-outage');
        if (gameContainer) {
            gameContainer.style.backgroundImage = 'url("images/haikei.png")';
            gameContainer.style.filter = 'none';
        }
        this.screens.game.style.filter = '';
        this.screens.game.style.transform = '';

        // 環境音を停止
        if (this.ambientSoundInterval) {
            clearInterval(this.ambientSoundInterval);
            this.ambientSoundInterval = null;
        }

        this.audio.bgm.pause();
        this.audio.bgm.currentTime = 0;
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.add('hidden');
        });
        this.screens[screenName].classList.remove('hidden');
    }

    updateDisplay() {
        const hours = Math.floor(this.currentTime / 60);
        const minutes = this.currentTime % 60;
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        this.gameElements.timeDisplay.textContent = timeString;
        
        this.gameElements.healthFill.style.width = `${this.health}%`;
        this.gameElements.sanityFill.style.width = `${this.sanity}%`;
        
        // 体力が低い時の警告効果
        if (this.health < 30) {
            this.gameElements.healthFill.classList.add('critical-health');
            // 体力が非常に低い時は画面に赤いフィルター
            if (this.health < 15) {
                document.body.classList.add('critical-health-visual');
            } else {
                document.body.classList.remove('critical-health-visual');
            }
        } else {
            this.gameElements.healthFill.classList.remove('critical-health');
            document.body.classList.remove('critical-health-visual');
        }
        
        // 正気度が低い時の効果
        if (this.sanity < 30) {
            this.gameElements.sanityFill.style.background = 'linear-gradient(90deg, #9c27b0, #e91e63)';
            document.body.classList.add('low-sanity');
            // 正気度が非常に低い時はより激しい効果
            if (this.sanity < 15) {
                document.body.classList.add('extreme-insanity');
                // ランダムに効果音を再生
                if (Math.random() < 0.3) {
                    this.playHorrorSound('whisper');
                }
            } else {
                document.body.classList.remove('extreme-insanity');
            }
        } else {
            this.gameElements.sanityFill.style.background = 'linear-gradient(90deg, #5f27cd, #8854d0)';
            document.body.classList.remove('low-sanity');
            document.body.classList.remove('extreme-insanity');
        }
        
        // 恐怖レベルに応じた背景の変化
        this.updateHorrorBackground();
    }

    // 恐怖レベルに応じて背景を変化させる
    updateHorrorBackground() {
        const gameScreen = this.screens.game;
        const gameContainer = document.getElementById('gameContainer');
        
        // 背景画像の切り替え（停電時）
        if (this.scaryLevel >= 2) {
            gameContainer.style.backgroundImage = 'url("images/black haikei.png")';
            gameContainer.style.filter = 'brightness(0.7)';
        } else {
            gameContainer.style.backgroundImage = 'url("images/haikei.png")';
            gameContainer.style.filter = 'none';
        }
        
        if (this.scaryLevel === 0) {
            gameScreen.style.filter = 'none';
            document.body.classList.remove('horror-level-1', 'horror-level-2', 'horror-level-3', 'horror-level-4');
        } else if (this.scaryLevel === 1) {
            gameScreen.style.filter = 'brightness(0.9) contrast(110%)';
            document.body.classList.add('horror-level-1');
            document.body.classList.remove('horror-level-2', 'horror-level-3', 'horror-level-4');
        } else if (this.scaryLevel === 2) {
            gameScreen.style.filter = 'brightness(0.8) contrast(120%) saturate(110%)';
            document.body.classList.add('horror-level-2');
            document.body.classList.remove('horror-level-1', 'horror-level-3', 'horror-level-4');
            // レベル2からは定期的に画面が揺れる
            if (Math.random() < 0.1) {
                this.screenShakeEffect();
            }
        } else if (this.scaryLevel === 3) {
            gameScreen.style.filter = 'brightness(0.7) contrast(130%) saturate(120%) hue-rotate(5deg)';
            document.body.classList.add('horror-level-3');
            document.body.classList.remove('horror-level-1', 'horror-level-2', 'horror-level-4');
            // レベル3からはより頻繁に効果が発生
            if (Math.random() < 0.2) {
                this.screenShakeEffect();
            }
            if (Math.random() < 0.15) {
                this.bloodDripEffect();
            }
        } else if (this.scaryLevel >= 4) {
            gameScreen.style.filter = 'brightness(0.6) contrast(150%) saturate(130%) hue-rotate(10deg)';
            document.body.classList.add('horror-level-4');
            document.body.classList.remove('horror-level-1', 'horror-level-2', 'horror-level-3');
            // レベル4では常に何かが起こる
            if (Math.random() < 0.3) {
                this.screenShakeEffect();
            }
            if (Math.random() < 0.25) {
                this.bloodDripEffect();
            }
            if (Math.random() < 0.2) {
                this.shadowMovementEffect();
            }
            if (Math.random() < 0.15) {
                this.glitchEffect();
            }
        }
    }

    startGameLoop() {
        setInterval(() => {
            if (this.gameState === 'playing') {
                this.currentTime++;
                this.updateDisplay();
                this.checkGamePhase();
                this.applyHorrorDamage(); // 恐怖による体力減少
                this.triggerAmbientHorror(); // 環境恐怖効果
                this.checkMissions(); // ミッションのチェック
                this.checkGameEnd();
            }
        }, 10000 / this.timeMultiplier);
    }

    // 恐怖レベルに応じて体力と正気度を自動的に削る（バランス調整：大幅に緩和）
    applyHorrorDamage() {
        if (this.scaryLevel === 0) return;
        
        // 恐怖レベルに応じたダメージ（50%削減）
        const healthDamage = this.scaryLevel * 0.25; // レベル1: 0.25, レベル2: 0.5, レベル3: 0.75, レベル4: 1
        const sanityDamage = this.scaryLevel * 0.4; // レベル1: 0.4, レベル2: 0.8, レベル3: 1.2, レベル4: 1.6
        
        // 最終段階でもダメージ増加を緩和
        if (this.finalPhase) {
            this.health = Math.max(0, this.health - healthDamage * 1.2);
            this.sanity = Math.max(0, this.sanity - sanityDamage * 1.2);
        } else {
            this.health = Math.max(0, this.health - healthDamage);
            this.sanity = Math.max(0, this.sanity - sanityDamage);
        }
        
        // 正気度が低い時の追加ダメージを緩和
        if (this.sanity < 20) {
            this.health = Math.max(0, this.health - 0.15);
        }
        
        // 体力が低い時の追加ダメージを緩和
        if (this.health < 20) {
            this.sanity = Math.max(0, this.sanity - 0.2);
        }
        
        this.updateDisplay();
    }

    // 環境恐怖効果（ランダムに発生する恐怖演出）
    triggerAmbientHorror() {
        if (this.scaryLevel === 0 || this.horrorEventActive) return;
        
        // 恐怖レベルが高いほど頻繁に発生（頻度を下げる）
        const triggerChance = this.scaryLevel * 0.08; // レベル1: 8%, レベル2: 16%, レベル3: 24%, レベル4: 32%
        
        if (Math.random() < triggerChance) {
            const effects = [
                'subtleFlicker',
                'shadowMovement',
                'bloodDrip',
                'whisperSound',
                'heartbeatSound',
                'screenShake',
                'glitchEffect'
            ];
            
            const effect = effects[Math.floor(Math.random() * effects.length)];
            this.applyAmbientEffect(effect);
        }
    }

    // 環境効果の適用
    applyAmbientEffect(effectType) {
        switch(effectType) {
            case 'subtleFlicker':
                this.subtleFlickerEffect();
                break;
            case 'shadowMovement':
                this.shadowMovementEffect();
                break;
            case 'bloodDrip':
                this.bloodDripEffect();
                break;
            case 'whisperSound':
                this.playHorrorSound('whisper');
                break;
            case 'heartbeatSound':
                this.playHorrorSound('heartbeat');
                break;
            case 'screenShake':
                this.screenShakeEffect();
                break;
            case 'glitchEffect':
                this.glitchEffect();
                break;
        }
    }

    // 環境恐怖音の自動再生
    startAmbientHorrorSounds() {
        if (this.ambientSoundInterval) {
            clearInterval(this.ambientSoundInterval);
        }

        this.ambientSoundInterval = setInterval(() => {
            if (this.gameState !== 'playing' || this.scaryLevel === 0) return;
            
            const now = Date.now();
            // 効果音の間隔を恐怖レベルに応じて調整
            const minInterval = 10000 - (this.scaryLevel * 2000); // レベル1: 8秒, レベル4: 2秒
            if (now - this.lastAmbientSound < minInterval) return;

            // 恐怖レベルに応じた効果音の種類と頻度
            const soundChance = this.scaryLevel * 0.25; // レベル1: 25%, レベル4: 100%
            
            if (Math.random() < soundChance) {
                const sounds = this.getAmbientSoundsForLevel();
                const sound = sounds[Math.floor(Math.random() * sounds.length)];
                this.playHorrorSound(sound);
                this.lastAmbientSound = now;
            }
        }, 5000); // 5秒ごとにチェック
    }

    // 恐怖レベルに応じた効果音リストを取得
    getAmbientSoundsForLevel() {
        if (this.scaryLevel === 1) {
            return ['footsteps', 'whisper'];
        } else if (this.scaryLevel === 2) {
            return ['footsteps', 'whisper', 'heartbeat', 'door_creak'];
        } else if (this.scaryLevel === 3) {
            return ['heartbeat', 'whisper', 'door_creak', 'static', 'footsteps'];
        } else if (this.scaryLevel >= 4) {
            return ['heartbeat', 'scream', 'static', 'whisper', 'door_creak', 'glass_break'];
        }
        return [];
    }

    checkGamePhase() {
        const hours = Math.floor(this.currentTime / 60);
        const minutes = this.currentTime % 60;
        
        if (hours >= 3 && hours < 5 && this.scaryLevel === 0) {
            this.scaryLevel = 1;
            this.showEvent("午前3時になりました...\n\n『魔の時間』の始まりです\n店内の空気が重くなりました\n\n何かが... 始まります");
            this.triggerHorrorEffect('flicker');
            this.startAmbientHorrorSounds(); // 環境音を開始
        } else if (hours >= 5 && this.scaryLevel === 1) {
            this.scaryLevel = 2;
            this.showEvent("午前5時...\n\n監視カメラの映像が乱れています\n何かがあなたを見ています\n\n後ろを振り返らないでください");
            this.triggerHorrorEffect('static');
            // 複数の効果音を組み合わせ
            setTimeout(() => this.playHorrorSound('footsteps'), 1000);
            setTimeout(() => this.playHorrorSound('heartbeat'), 2000);
        } else if (hours >= 6 && this.scaryLevel === 2) {
            this.scaryLevel = 3;
            this.showEvent("午前6時...\n\n早朝が来ました\n\nあなたは正気を保てたでしょうか？\n\n結果発表へ...");
            // 6時になったらエンディングへ
            setTimeout(() => {
                this.checkGameEnd();
            }, 2000);
        }
        
        if (hours === 3 && minutes === 33) {
            this.triggerSpecialEvent('devil_time');
        } else if (hours === 4 && minutes === 44) {
            this.triggerSpecialEvent('death_time');
        } else if (hours === 6 && minutes === 66) {
            this.triggerSpecialEvent('time_bug');
        }
        
        // 特別イベント：奇妙な客が3人来店（午前2時頃、一度だけ）
        if (hours === 2 && minutes >= 0 && minutes <= 10 && !this.strangeCustomersEvent) {
            this.triggerStrangeCustomersEvent();
        }
        
        // 特別イベント：レンジが暴走（午前4時頃、一度だけ）
        if (hours === 4 && minutes >= 20 && minutes <= 30 && !this.microwaveEvent) {
            this.triggerMicrowaveEvent();
        }
    }
    
    // 奇妙な客が3人来店するイベント
    triggerStrangeCustomersEvent() {
        this.strangeCustomersEvent = true;
        
        this.showEvent("奇妙な客が\n3人同時に来店しました...\n\n全員同じ顔\n全員同じ服\n全員同じ動き\n\n『今日も... 同じ...』\n\n3人とも\n同じ商品を\n同じように選んでいます\n\n不気味です...");
        
        // 絵文字を3つ表示
        setTimeout(() => {
            this.showEventEmoji('👤', 'top-left', 3000);
        }, 500);
        setTimeout(() => {
            this.showEventEmoji('👤', 'center', 3000);
        }, 1000);
        setTimeout(() => {
            this.showEventEmoji('👤', 'top-right', 3000);
        }, 1500);
        
        // 効果音
        this.playHorrorSound('footsteps');
        setTimeout(() => this.playHorrorSound('whisper'), 1000);
        setTimeout(() => this.playHorrorSound('footsteps'), 2000);
        
        // ダメージ（緩和）
        this.health -= 5;
        this.sanity -= 10;
        this.updateDisplay();
        
        // 恐怖効果
        this.triggerHorrorEffect('general');
    }
    
    // レンジが暴走するイベント
    triggerMicrowaveEvent() {
        this.microwaveEvent = true;
        
        this.showEvent("レンジが\n勝手に動き始めました...\n\n『温めますか』\n『温めますか』\n『温めますか』\n\nエコーが響きます\n\n止まりません\n\nレンジの中には...\n\n焼肉弁当🍱\n\n2つ\n\nでも... 誰も\n温めようとしていないのに...");
        
        // 絵文字を表示
        this.showEventEmoji('🍱', 'center', 4000);
        setTimeout(() => {
            this.showEventEmoji('🍱', 'right', 4000);
        }, 500);
        this.showEventEmoji('🔥', 'left', 3000);
        
        // 効果音を連続再生（エコー効果）
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.playHorrorSound('static');
            }, i * 800);
        }
        
        // ダメージ（緩和）
        this.health -= 4;
        this.sanity -= 12;
        this.updateDisplay();
        
        // 恐怖効果
        this.triggerHorrorEffect('flicker');
        setTimeout(() => {
            this.triggerHorrorEffect('general');
        }, 2000);
    }

    triggerSpecialEvent(type) {
        let message = "";
        switch(type) {
            case 'devil_time':
                message = "午前3時33分...\n\n悪魔の時間です\n店内に硫黄の匂いが...\n\n地獄の扉が開きました";
                this.triggerHorrorEffect('ultimateHorror');
                this.sanity -= 10;
                break;
            case 'death_time':
                message = "午前4時44分...\n\n死の時間です\n冷凍庫から呻き声が...\n\n死者が蘇ります";
                this.triggerHorrorEffect('ultimateHorror');
                this.health -= 8;
                break;
            case 'time_bug':
                message = "時計がバグしています\n6時66分...\n\n時間が壊れました\n現実が崩壊しています";
                this.triggerHorrorEffect('ultimateHorror');
                this.sanity -= 12;
                break;
        }
        this.showEvent(message);
    }

    scheduleRandomEvents() {
        const scheduleNext = () => {
            if (this.gameState === 'playing') {
                // イベント間隔を長くする（30-60秒 → 45-90秒）
                const delay = (Math.random() * 45000 + 45000) / this.timeMultiplier;
                setTimeout(() => {
                    this.triggerRandomEvent();
                    scheduleNext();
                }, delay);
            }
        };
        scheduleNext();
    }

    triggerRandomEvent() {
        if (this.isEventActive) return;
        
        const eventType = Math.random();
        
        // お客さんの出現頻度を大幅に下げる（50% → 25%）
        if (eventType < 0.25) {
            this.spawnCustomer();
        } else if (eventType < 0.5) {
            this.triggerWorkEvent();
        } else if (eventType < 0.75) {
            this.triggerStoryEvent();
        } else {
            // 新しい恐怖イベント
            this.triggerNewHorrorEvent();
        }
    }

    // 新しい恐怖イベント
    triggerNewHorrorEvent() {
        const events = [
            {
                name: 'phone_call',
                message: "電話が鳴り続けています...\n\n受話器を取ると\n『あなたも... ヤマダになる...』\n\n声が聞こえます",
                emoji: '📱',
                position: 'top-right',
                health: -3,
                sanity: -5,
                sound: 'whisper'
            },
            {
                name: 'security_camera',
                message: "監視カメラの画面が...\n\nあなたの後ろに\n誰か立っています\n\n振り返ってはいけません",
                emoji: '📹',
                position: 'top-left',
                health: -2,
                sanity: -8,
                sound: 'footsteps'
            },
            {
                name: 'refrigerator',
                message: "冷凍庫のドアが\n勝手に開きました...\n\n中から冷たい息が...\n\n何かが動いています",
                emoji: '🧊',
                position: 'bottom-left',
                health: -4,
                sanity: -6,
                sound: 'door_creak'
            },
            {
                name: 'vending_machine',
                message: "自動販売機が\n勝手に動いています...\n\n商品が落ちてきます\nでも... 誰もいないのに...",
                emoji: '🥤',
                position: 'right',
                health: -2,
                sanity: -4,
                sound: 'glass_break'
            },
            {
                name: 'mirror_reflection',
                message: "鏡に映る自分が...\n\n笑っています\n\nでもあなたは\n笑っていません",
                emoji: '🪞',
                position: 'left',
                health: -3,
                sanity: -9,
                sound: 'whisper'
            },
            // 弟切草風の新しいイベント
            {
                name: 'auto_door',
                message: "誰もいないのに...\n\n自動ドアの開閉音が\n聞こえます\n\nピー... ガシャン...\n\n誰かが入ってきた？\nでも... 誰も見えない",
                emoji: '🚪',
                position: 'top',
                health: -2,
                sanity: -6,
                sound: 'door_creak'
            },
            {
                name: 'products_aligned',
                message: "商品棚を見ると...\n\n全ての商品が\n同じ方向を向いています\n\nさっきまで\nバラバラだったのに...\n\n誰かが... 整えた？",
                emoji: '📦',
                position: 'right',
                health: -2,
                sanity: -5,
                sound: 'footsteps'
            },
            {
                name: 'register_future_time',
                message: "レジの画面を見ると...\n\n現在の時刻ではなく\n明日の時刻が\n表示されています\n\n時間が... 進んでいる？\nそれとも...",
                emoji: '💻',
                position: 'center',
                health: -3,
                sanity: -8,
                sound: 'static'
            },
            {
                name: 'barcode_voice',
                message: "商品をスキャンすると...\n\n聞いたことのない\n女性の声で\n商品名が読み上げられます\n\n『...ヤマダ...』\n\nそんな商品名...",
                emoji: '📊',
                position: 'center',
                health: -2,
                sanity: -6,
                sound: 'whisper'
            },
            {
                name: 'parking_lot_voices',
                message: "駐車場から\n子どもの遊ぶ声が\n聞こえてきます\n\nでも... 誰もいないはず\n\n『かーごーしーてー』\n\n声が近づいてきます",
                emoji: '🚗',
                position: 'bottom',
                health: -3,
                sanity: -7,
                sound: 'whisper'
            },
            {
                name: 'expired_food_warm',
                message: "廃棄棚を見ると...\n\n期限切れの食品が\n微かに揺れています\n\n触ってみると...\n温かい\n\nでも... レンジは\n使っていないのに...",
                emoji: '🗑️',
                position: 'bottom-left',
                health: -3,
                sanity: -7,
                sound: 'heartbeat'
            },
            {
                name: 'camera_another_employee',
                message: "防犯カメラの映像を見ると...\n\n自分ではない\nもう一人の店員が\n常に立っています\n\n同じ制服を着て\n同じ名札...\n\n『ヤマダ』",
                emoji: '📹',
                position: 'top-left',
                health: -4,
                sanity: -10,
                sound: 'static'
            },
            {
                name: 'copier_prints',
                message: "コピー機の電源が\n勝手に入りました\n\n意味不明な文字や図形が\n連続で印刷され続けています\n\n『ヤマダヤマダヤマダ...』\n\n止まりません",
                emoji: '🖨️',
                position: 'right',
                health: -2,
                sanity: -6,
                sound: 'static'
            },
            {
                name: 'customer_in_eat_in',
                message: "トイレから戻ると...\n\n先ほどまで誰もいなかった\nイートインスペースに\n客が座っています\n\n静かに\nこちらを見つめています\n\nいつから...？",
                emoji: '🪑',
                position: 'bottom-right',
                health: -3,
                sanity: -8,
                sound: 'footsteps'
            },
            {
                name: 'radio_calls_name',
                message: "深夜のラジオから\n音楽が流れています\n\n次の瞬間...\n\n『...あなたの名前...』\n\n音楽が\nあなたの名前を呼ぶ声に\n変わりました\n\n誰が...？",
                emoji: '📻',
                position: 'top-right',
                health: -3,
                sanity: -9,
                sound: 'whisper'
            }
        ];

        const event = events[Math.floor(Math.random() * events.length)];
        
        // 絵文字を表示
        this.showEventEmoji(event.emoji, event.position, 3000);
        
        // 効果音
        if (event.sound) {
            this.playHorrorSound(event.sound);
        }
        
        // ダメージ
        this.health = Math.max(0, this.health + event.health);
        this.sanity = Math.max(0, this.sanity + event.sanity);
        
        // イベント表示
        this.showEvent(event.message);
        this.updateDisplay();
        
        // 恐怖レベルが高い時は追加効果
        if (this.scaryLevel >= 2) {
            this.triggerHorrorEffect('general');
        }
    }

    spawnCustomer() {
        if (this.currentCustomer) return;
        
        let customerPool;
        let specialEventChance = Math.random();
        
        if (this.scaryLevel >= 4 && specialEventChance < 0.2) {
            customerPool = this.customers.ultimate_boss;
        } else if (this.scaryLevel >= 3 && specialEventChance < 0.3) {
            if (this.yamadaCounter < 3 && specialEventChance < 0.15) {
                customerPool = this.customers.yamada;
                this.yamadaCounter++;
            } else if (this.finalPhase && specialEventChance < 0.1) {
                customerPool = this.customers.final_boss;
            } else {
                customerPool = this.customers.scary;
            }
        } else if (this.scaryLevel === 0) {
            customerPool = this.customers.normal;
        } else if (this.scaryLevel === 1) {
            customerPool = this.customers.strange;
        } else {
            customerPool = this.customers.scary;
        }
        
        const customer = customerPool[Math.floor(Math.random() * customerPool.length)];
        this.showCustomer(customer);
        
        // お客さんが来た時の絵文字（恐怖レベルが高い時のみ）
        if (this.scaryLevel >= 2) {
            this.showEventEmoji('👤', 'center', 2000);
        }
        
        if (this.scaryLevel >= 2) {
            this.sanity -= Math.floor(Math.random() * 8 + 3);
            this.sanity = Math.max(0, this.sanity);
            // 怖い客が来た時の効果音
            if (this.scaryLevel >= 3) {
                this.playHorrorSound('footsteps');
                setTimeout(() => this.playHorrorSound('whisper'), 500);
            } else {
                this.playHorrorSound('footsteps');
            }
        }
    }

    showCustomer(customer) {
        this.currentCustomer = customer;
        this.gameElements.customer.classList.remove('hidden');
        this.gameElements.customer.querySelector('.customer-sprite').textContent = customer.sprite;
        this.gameElements.customerSpeech.textContent = customer.speech;
        
        // 怖い客の特殊演出
        if (this.scaryLevel >= 2) {
            this.gameElements.customer.classList.add('customer-scary');
        }
        
        // コメント表示時間を短縮（12秒）
        setTimeout(() => {
            if (this.currentCustomer === customer) {
                this.hideCustomer();
            }
        }, 12000 / this.timeMultiplier);
    }

    hideCustomer() {
        this.gameElements.customer.classList.add('hidden');
        this.gameElements.customer.classList.remove('customer-scary');
        this.currentCustomer = null;
    }

    triggerWorkEvent() {
        const messages = this.getPhaseMessages();
        const message = messages[Math.floor(Math.random() * messages.length)];
        this.gameElements.registerScreen.textContent = message;
        
        // メッセージ表示時間も300％長く
        setTimeout(() => {
            this.gameElements.registerScreen.textContent = "お疲れ様です";
        }, 9000 / this.timeMultiplier);
    }

    triggerStoryEvent() {
        if (this.isEventActive) return;
        
        const messages = this.getPhaseMessages();
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        // メッセージ内容に応じて絵文字を表示
        if (message.includes('電話')) {
            this.showEventEmoji('📱', 'top-right', 3000);
        } else if (message.includes('監視カメラ')) {
            this.showEventEmoji('📹', 'top-left', 3000);
        } else if (message.includes('冷凍庫') || message.includes('バックヤード')) {
            this.showEventEmoji('🧊', 'bottom-left', 3000);
        } else if (message.includes('鏡')) {
            this.showEventEmoji('🪞', 'left', 3000);
        } else if (message.includes('コーヒー')) {
            this.showEventEmoji('☕️', 'center', 3000);
        } else if (message.includes('商品') || message.includes('棚')) {
            this.showEventEmoji('📦', 'right', 3000);
        } else if (message.includes('トイレ')) {
            this.showEventEmoji('🚽', 'bottom-right', 3000);
        } else if (message.includes('時計') || message.includes('時間')) {
            this.showEventEmoji('⏰', 'top', 3000);
        }
        
        this.showEvent(message);
    }

    getPhaseMessages() {
        if (this.scaryLevel === 0) {
            return this.eventMessages.phase1;
        } else if (this.scaryLevel === 1) {
            return this.eventMessages.phase2;
        } else if (this.scaryLevel >= 4) {
            return this.eventMessages.ultimate_horror;
        } else {
            return this.eventMessages.phase3;
        }
    }

    performWork(workType) {
        if (this.isEventActive) return;
        
        let healthChange = 0;
        let sanityChange = 0;
        let message = "";
        let horrorEvent = false;
        let ultimateHorror = false;
        
        switch (workType) {
            case 'register':
                if (this.currentCustomer) {
                    if (this.currentCustomer.sprite.includes("💀") || this.currentCustomer.sprite.includes("🌑")) {
                        // 究極恐怖ボス（ダメージ緩和）
                        healthChange = -20;
                        sanityChange = -25;
                        message = `${this.currentCustomer.reaction}\n\n店内が地獄に変わります\n血の海が足元に広がり\n天井から死体が降ってきます\n\nあなたはもう人間ではありません`;
                        ultimateHorror = true;
                        this.ultimateHorrorCount++;
                    } else if (this.currentCustomer.sprite === "👨‍💼" || this.currentCustomer.sprite === "🤵" || this.currentCustomer.sprite === "👔") {
                        healthChange = -10;
                        sanityChange = -15;
                        message = `${this.currentCustomer.reaction}\n\nあなたの制服の名札が変わっています...\n『ヤマダ』と書いてあります`;
                        horrorEvent = true;
                    } else {
                        healthChange = this.scaryLevel >= 2 ? -3 : 5;
                        sanityChange = this.scaryLevel >= 2 ? -5 : 10;
                        message = `${this.currentCustomer.reaction}`;
                        if (this.scaryLevel >= 2) {
                            message += "\n\n...なぜかゾクゾクします";
                        }
                    }
                    this.score += 10;
                    this.hideCustomer();
                } else {
                    message = "お客様がいません\n\nでも... レジの音が聞こえます\nピッ... ピッ... ピッ...";
                    sanityChange = this.scaryLevel >= 1 ? -5 : 5;
                }
                break;
                
            case 'restock':
                // 究極恐怖イベント追加
                if (this.scaryLevel >= 3 && Math.random() < 0.25) {
                    const ultimateMessages = this.eventMessages.ultimate_horror;
                    healthChange = -15;
                    sanityChange = -18;
                    message = "商品補充中...\n\n" + ultimateMessages[Math.floor(Math.random() * ultimateMessages.length)] + "\n\n商品が全て肉の塊に変わりました\nあなたの手も... 血まみれです";
                    ultimateHorror = true;
                    this.ultimateHorrorCount++;
                } else if (this.scaryLevel >= 2 && Math.random() < 0.3) {
                    sanityChange = -8;
                    message = "商品補充中...\n\n棚の奥に赤い染みが...\nこれは... 血？\n\n商品が勝手に落ちました";
                    horrorEvent = true;
                    this.bloodEvents++;
                } else {
                    healthChange = -3;
                    sanityChange = this.scaryLevel >= 1 ? 3 : 8;
                    message = "商品補充完了";
                    if (this.scaryLevel >= 1) {
                        message += "\n\n...誰かに見られている気がします";
                    }
                }
                this.score += 5;
                break;
                
            case 'clean':
                // 究極恐怖イベント追加
                if (this.scaryLevel >= 3 && Math.random() < 0.3) {
                    const ultimateMessages = this.eventMessages.ultimate_horror;
                    healthChange = -18;
                    sanityChange = -20;
                    message = "清掃中...\n\n" + ultimateMessages[Math.floor(Math.random() * ultimateMessages.length)] + "\n\nモップが人間の髪の毛で出来ています\n床から手が伸びてきます";
                    ultimateHorror = true;
                    this.ultimateHorrorCount++;
                } else if (this.scaryLevel >= 2 && Math.random() < 0.4) {
                    healthChange = -5;
                    sanityChange = -10;
                    message = "清掃中...\n\n床の汚れが血のように見えます\n拭いても拭いても...\n\nバックヤードから足音が...";
                    horrorEvent = true;
                    this.triggerHorrorEffect('bloodStain');
                } else {
                    healthChange = -5;
                    sanityChange = this.scaryLevel >= 1 ? 8 : 18;
                    message = "清掃完了";
                    if (this.scaryLevel >= 1) {
                        message += "\n\n掃除してるのに... なぜか汚れが増えてる？";
                    }
                }
                this.score += 8;
                break;
                
            case 'coffee':
                // コーヒーの絵文字を表示
                this.showEventEmoji('☕️', 'center', 2000);
                if (this.scaryLevel >= 3 && Math.random() < 0.2) {
                    healthChange = -5;
                    sanityChange = -8;
                    message = "コーヒーを飲みました\n\n苦い... いつもより苦い...\n底に何か沈んでいます\n\n赤い... 何かが...";
                    horrorEvent = true;
                } else {
                    // コーヒー休憩の回復量を大幅に増やす
                    healthChange = this.scaryLevel >= 2 ? 15 : 25;
                    sanityChange = this.scaryLevel >= 2 ? 20 : 30;
                    message = "コーヒーで一休み";
                    if (this.scaryLevel >= 1) {
                        message += "\n\n少し落ち着きましたが...\n誰かがこちらを見ています";
                    } else {
                        message += "\n元気が回復しました！";
                    }
                }
                break;
        }
        
        if (this.finalPhase) {
            healthChange = Math.floor(healthChange * 0.5);
            sanityChange = Math.floor(sanityChange * 0.3);
            if (!horrorEvent && !ultimateHorror && Math.random() < 0.5) {
                message += "\n\n時計が逆回りしています...\n時間が... 戻っている...";
                this.timeAnomalies++;
            }
        }
        
        this.health = Math.max(0, Math.min(100, this.health + healthChange));
        this.sanity = Math.max(0, Math.min(100, this.sanity + sanityChange));
        
        if (this.sanity <= 20) {
            message += "\n\n頭がクラクラします...\n現実と幻覚の境界が...\n曖昧になってきました...";
        }
        
        // 作業カウントを更新
        if (workType === 'register' && this.currentCustomer) {
            this.workCounts.register++;
            this.customerCount++;
        } else if (workType !== 'register') {
            this.workCounts[workType]++;
        }
        
        this.updateDisplay();
        this.updateMissionDisplay(); // ミッション表示を更新
        this.checkMissions(); // ミッションをチェック
        this.showEvent(message);
        
        if (ultimateHorror) {
            this.triggerHorrorEffect('ultimateHorror');
        } else if (horrorEvent) {
            this.triggerHorrorEffect('general');
        }
    }

    showEvent(message) {
        this.isEventActive = true;
        this.gameElements.eventText.textContent = message;
        this.gameElements.eventMessage.classList.remove('hidden');
        
        // ホラーイベントの場合は特殊スタイリング
        if (this.scaryLevel >= 2) {
            this.gameElements.eventMessage.classList.add('horror');
        }
    }

    closeEvent() {
        this.gameElements.eventMessage.classList.add('hidden');
        this.gameElements.eventMessage.classList.remove('horror');
        this.isEventActive = false;
    }

    checkGameEnd() {
        // 6時（360分）に到達した時のエンディング分岐（体力と正気度の残量で判定）
        if (this.currentTime >= 360) {
            const healthPercent = this.health;
            const sanityPercent = this.sanity;
            
            // 特殊エンディングの優先判定
            if (this.ultimateHorrorCount >= 5) {
                this.endGame('ultimate_nightmare_ending');
                return;
            }
            
            if (this.ultimateHorrorCount >= 3) {
                this.endGame('ultimate_horror_ending');
                return;
            }
            
            if (this.yamadaCounter >= 3 && this.bloodEvents >= 2 && this.timeAnomalies >= 3) {
                this.endGame('horror_ending');
                return;
            }
            
            if (this.yamadaCounter >= 3) {
                this.endGame('yamada_ending');
                return;
            }
            
            // 体力と正気度の残量でエンディング分岐
            if (healthPercent >= 80 && sanityPercent >= 80) {
                // 両方とも高め：最良エンディング
                this.endGame('perfect_ending');
            } else if (healthPercent >= 60 && sanityPercent >= 60) {
                // 両方とも中程度：良いエンディング
                this.endGame('good_ending');
            } else if (healthPercent >= 40 && sanityPercent >= 40) {
                // 両方とも低め：普通エンディング
                this.endGame('normal_ending');
            } else if (healthPercent < 30 || sanityPercent < 30) {
                // どちらかが非常に低い：悪いエンディング
                if (healthPercent < 20) {
                    this.endGame('exhausted_ending');
                } else if (sanityPercent < 20) {
                    this.endGame('broken_ending');
                } else {
                    this.endGame('bad_ending');
                }
            } else {
                // その他：普通エンディング
                this.endGame('normal_ending');
            }
            return;
        }
        
        // 途中で体力や正気度が0になった場合
        if (this.health <= 0) {
            this.endGame('death');
            return;
        }
        
        if (this.sanity <= 0) {
            this.endGame('insanity');
            return;
        }
    }

    endGame(reason) {
        this.gameState = 'end';
        
        // エンディング時は背景画像を無効化
        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer) {
            gameContainer.style.backgroundImage = 'none';
        }
        
        let title = "";
        let message = "";
        
        switch (reason) {
            case 'success':
                title = "🌅 普通のエンディング";
                message = `無事に夜勤を完了しました\nスコア: ${this.score}点\n\nでも... 明日もここで働くのですか？\nまた深夜に... 一人で...`;
                break;
                
            case 'true_ending':
                title = "✨ 真のエンディング";
                message = `恐怖に打ち勝ちました！\nスコア: ${this.score}点\n\n朝日が昇ります\n店の呪いが解けたようです\n\nあなたは生還者です\n二度とここで働く必要はありません`;
                break;
                
            case 'yamada_ending':
                title = "👨‍💼 ヤマダエンディング";
                message = `スコア: ${this.score}点\n\n気がつくと制服の名札が...\n『ヤマダ』と書き換わっています\n\nあなたは何代目のヤマダでしょうか？\n\n明日もここで働きます\n深夜に... 永遠に...`;
                document.body.style.background = 'linear-gradient(135deg, #000000, #1a0000)';
                document.body.style.backgroundImage = 'none';
                break;
                
            case 'horror_ending':
                title = "🩸 ホラーエンディング";
                message = `スコア: ${this.score}点\n\n全ての真実を知ってしまいました\n\n店の地下には...\n前のヤマダさんたちが...\n\nあなたも仲間入りです\n\n深夜のコンビニへ\nようこそ...`;
                document.body.style.background = 'linear-gradient(135deg, #330000, #660000)';
                document.body.style.backgroundImage = 'none';
                break;
                
            case 'ultimate_horror_ending':
                title = "💀🩸 究極ホラーエンディング";
                message = `スコア: ${this.score}点\n\n究極の恐怖を体験しました\n\n店は地獄の入り口でした\n血の海に沈む店舗\n天井から降り注ぐ死体\n\nあなたは悪魔の従者となり\n永遠に魂を集め続けます\n\n次の獲物を... 待っています`;
                document.body.style.background = 'linear-gradient(135deg, #660000, #990000, #330000)';
                document.body.style.backgroundImage = 'none';
                this.playHorrorSound('scream');
                break;
                
            case 'ultimate_nightmare_ending':
                title = "👹🔥 悪夢の極致エンディング";
                message = `スコア: ${this.score}点\n\n悪夢が現実となりました\n\n店全体が生きた肉塊となり\nあなたを消化しようとしています\n\n意識は残ったまま\n永遠に苦痛を味わい続けます\n\n助けを呼んでも...\n誰も来ません\n\nここは地獄の最下層\n絶望の淵です`;
                document.body.style.background = 'radial-gradient(circle, #990000, #660000, #330000, #000000)';
                document.body.style.backgroundImage = 'none';
                this.playHorrorSound('scream');
                setTimeout(() => this.playHorrorSound('heartbeat'), 2000);
                break;
                
            case 'death':
                title = "💀 死亡エンディング";
                message = `体力が尽きました...\nスコア: ${this.score}点\n\n店内で倒れたあなたを\n翌朝、新しいヤマダさんが発見します\n\n『また一人... 消えたな』\n\nそしてヤマダさんは\nあなたの制服を片付けます`;
                document.body.style.background = 'linear-gradient(135deg, #1a0000, #000000)';
                document.body.style.backgroundImage = 'none';
                break;
                
            case 'insanity':
                title = "🤪 狂気エンディング";
                message = `正気を失いました...\nスコア: ${this.score}点\n\n鏡の中の自分と会話しています\n『君も僕らの仲間だね』\n\nあなたは笑い続けています\n\n深夜のコンビニで\n永遠に...`;
                document.body.style.background = 'linear-gradient(135deg, #4a0080, #1a0040)';
                document.body.style.backgroundImage = 'none';
                document.body.style.backgroundImage = 'none';
                break;

            case 'perfect_ending':
                title = "🌅 完璧な結果";
                message = `体力: ${Math.round(this.health)}% 正気: ${Math.round(this.sanity)}%\nスコア: ${this.score}点\n\n6時早朝まで\n正気を保つことができました！\n\n朝日が昇り、店の外は\nいつもの日常が戻っています\n\nあなたは恐怖に打ち勝ち\n正常な状態で朝を迎えました\n\n見事な生還です`;
                document.body.style.background = 'linear-gradient(135deg, #ffd700, #ffa500, #ff6347)';
                document.body.style.backgroundImage = 'none';
                break;

            case 'good_ending':
                title = "🌄 良い結果";
                message = `体力: ${Math.round(this.health)}% 正気: ${Math.round(this.sanity)}%\nスコア: ${this.score}点\n\n6時早朝まで\n正気を保つことができました\n\n少し疲れはありますが\n朝日が昇っています\n\n店の外は普通の世界\nあなたは現実に戻りました\n\n無事に生還できました`;
                document.body.style.background = 'linear-gradient(135deg, #87ceeb, #ffa500)';
                document.body.style.backgroundImage = 'none';
                break;

            case 'normal_ending':
                title = "🌆 普通の結果";
                message = `体力: ${Math.round(this.health)}% 正気: ${Math.round(this.sanity)}%\nスコア: ${this.score}点\n\n6時早朝まで\nなんとか持ちこたえました\n\n疲れと不安が残っていますが\n朝は来ました\n\n外を見ると...\nまだ少し暗い気がします\n\nでも、これで終わりです\n...本当に？`;
                document.body.style.background = 'linear-gradient(135deg, #2c3e50, #34495e)';
                document.body.style.backgroundImage = 'none';
                break;

            case 'bad_ending':
                title = "🌑 悪い結果";
                message = `体力: ${Math.round(this.health)}% 正気: ${Math.round(this.sanity)}%\nスコア: ${this.score}点\n\n6時早朝まで\nなんとか持ちこたえましたが...\n\nあなたは疲れ果てています\n朝日は見えますが\n心は暗いままです\n\n店を出ても\n何かが後ろから\n見ている気がします\n\n正気を保てたか\n自信がありません`;
                document.body.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e)';
                document.body.style.backgroundImage = 'none';
                break;

            case 'exhausted_ending':
                title = "💤 疲労困憊の結果";
                message = `体力: ${Math.round(this.health)}% 正気: ${Math.round(this.sanity)}%\nスコア: ${this.score}点\n\n6時早朝まで\nなんとか持ちこたえましたが\nあなたは限界です\n\n体が重く\n動くのも辛い\n\n朝日が昇っても\nあなたの心には\n暗闇が残っています\n\n正気を保てたか\n分かりません`;
                document.body.style.background = 'linear-gradient(135deg, #1a0000, #000000)';
                break;

            case 'broken_ending':
                title = "🧠 精神崩壊の結果";
                message = `体力: ${Math.round(this.health)}% 正気: ${Math.round(this.sanity)}%\nスコア: ${this.score}点\n\n6時早朝まで\nなんとか持ちこたえましたが\nあなたの心は壊れています\n\n現実と幻覚の境界が\n曖昧になりました\n\n朝日を見ても\nそれが本当の朝なのか\n分かりません\n\n正気を保てたとは\n言えないかもしれません`;
                document.body.style.background = 'linear-gradient(135deg, #4a0080, #1a0040)';
                document.body.style.backgroundImage = 'none';
                break;
        }
        
        this.gameElements.endTitle.textContent = title;
        this.gameElements.endMessage.textContent = message;
        this.showScreen('end');
        
        if (reason.includes('ultimate') || reason === 'yamada_ending' || reason === 'horror_ending' || reason === 'insanity') {
            setTimeout(() => {
                this.finalHorrorEffect();
            }, 2000);
        }
    }

    finalHorrorEffect() {
        // 点滅効果を無効化 - 代わりに一度だけ効果を適用
        const endScreen = this.screens.end;
        endScreen.style.filter = 'invert(0.1) contrast(120%)';
        setTimeout(() => {
            endScreen.style.filter = 'invert(0)';
        }, 1000);
        
        this.playHorrorSound('static');
    }
}

// ゲーム開始
document.addEventListener('DOMContentLoaded', () => {
    // iOS対応：ダブルタップズームを防止
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // iOS対応：タッチイベントの改善
    document.addEventListener('touchstart', (e) => {
        // ボタン以外のタッチでスクロールを防止
        if (e.target.tagName !== 'BUTTON' && e.target.closest('button') === null) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // iOS対応：画面サイズの調整
    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });
    
    // iOS対応：100vhの修正
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        document.body.style.height = `${window.innerHeight}px`;
        window.addEventListener('resize', () => {
            document.body.style.height = `${window.innerHeight}px`;
        });
    }

    new ConvenienceStoreGame();
});

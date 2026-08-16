/**
 * Echo: نسخة الغد - Game Engine
 * Core Logic, Audio Synthesis, UI State Machine
 */

// --- Audio System (Web Audio API) ---
const AudioEngine = {
    ctx: null,
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    playTone(freq, type, duration, vol=0.1) {
        if(!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },
    click() { this.playTone(600, 'sine', 0.1); },
    success() { this.playTone(900, 'square', 0.2); setTimeout(()=>this.playTone(1200, 'square', 0.3), 100); },
    error() { this.playTone(200, 'sawtooth', 0.4, 0.2); },
    glitch() { this.playTone(100 + Math.random()*500, 'sawtooth', 0.1); },
    bossTick() { this.playTone(150, 'square', 0.05, 0.05); }
};

// --- Storage System ---
const Storage = {
    key: 'echo_game_data',
    load() {
        return JSON.parse(localStorage.getItem(this.key)) || { level: 1, xp: 0, titles: [], bestScore: 0, history: [] };
    },
    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }
};

// --- Game State & Logic ---
const Game = {
    profile: Storage.load(),
    state: {
        phase: 0, // 0:Intro, 1:Speed, 2:Memory, 3:Decision, 4:Boss
        speedTimes: [],
        memoryErrors: 0,
        decisionTimes: [],
        decisionErrors: 0,
        startTime: 0,
        aiSpeedMultiplier: 1.0,
        bossActive: false
    },
    ui: {
        intro: document.getElementById('screen-intro'),
        game: document.getElementById('screen-game'),
        result: document.getElementById('screen-result'),
        container: document.getElementById('game-container'),
        hudPhase: document.getElementById('hud-phase'),
        hudLevel: document.getElementById('hud-level'),
        hudXp: document.getElementById('hud-xp'),
        aiProgress: document.getElementById('ai-progress-container'),
        aiFill: document.getElementById('ai-progress-fill')
    },

    init() {
        this.updateHUD();
        document.getElementById('btn-start').addEventListener('click', () => this.startPhase1());
        document.getElementById('btn-restart').addEventListener('click', () => location.reload());
        document.getElementById('btn-share').addEventListener('click', () => this.shareResult());
    },

    switchScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
        AudioEngine.glitch();
    },

    updateHUD() {
        this.ui.hudLevel.innerText = this.profile.level;
        this.ui.hudXp.innerText = this.profile.xp;
    },

    clearContainer() {
        this.ui.container.innerHTML = '';
    },

    // Phase 1: Speed Test
    startPhase1() {
        AudioEngine.init();
        this.switchScreen(this.ui.game);
        this.ui.hudPhase.innerText = 'المرحلة 1: السرعة';
        this.state.speedTimes = [];
        this.runSpeedRound(0);
    },

    runSpeedRound(round) {
        this.clearContainer();
        if (round >= 5) {
            this.startPhase2();
            return;
        }
        
        setTimeout(() => {
            const dot = document.createElement('div');
            dot.className = 'target-dot';
            
            // Random position within container
            const maxX = this.ui.container.clientWidth - 50;
            const maxY = this.ui.container.clientHeight - 50;
            dot.style.left = `${Math.max(0, Math.random() * maxX)}px`;
            dot.style.top = `${Math.max(0, Math.random() * maxY)}px`;
            
            this.state.startTime = Date.now();
            
            dot.addEventListener('mousedown', () => {
                const rt = Date.now() - this.state.startTime;
                this.state.speedTimes.push(rt);
                AudioEngine.click();
                this.runSpeedRound(round + 1);
            });
            
            this.ui.container.appendChild(dot);
        }, 500 + Math.random() * 1000);
    },

    // Phase 2: Memory Test
    startPhase2() {
        this.ui.hudPhase.innerText = 'المرحلة 2: الذاكرة';
        this.clearContainer();
        this.state.memoryErrors = 0;
        
        const grid = document.createElement('div');
        grid.className = 'memory-grid';
        const tiles = [];
        
        for(let i=0; i<9; i++) {
            const tile = document.createElement('div');
            tile.className = 'memory-tile';
            tile.dataset.index = i;
            grid.appendChild(tile);
            tiles.push(tile);
        }
        this.ui.container.appendChild(grid);

        let sequence = [];
        for(let i=0; i<4; i++) sequence.push(Math.floor(Math.random() * 9));
        
        let playerSequence = [];
        
        // Play sequence
        let step = 0;
        const playSeq = setInterval(() => {
            if(step >= sequence.length) {
                clearInterval(playSeq);
                enableInput();
                return;
            }
            const idx = sequence[step];
            tiles[idx].classList.add('flash');
            AudioEngine.playTone(300 + (idx*50), 'sine', 0.2);
            setTimeout(() => tiles[idx].classList.remove('flash'), 400);
            step++;
        }, 800);

        const enableInput = () => {
            tiles.forEach(tile => {
                tile.addEventListener('mousedown', (e) => {
                    const idx = parseInt(e.target.dataset.index);
                    playerSequence.push(idx);
                    
                    if(sequence[playerSequence.length - 1] === idx) {
                        AudioEngine.playTone(300 + (idx*50), 'sine', 0.1);
                        e.target.style.background = 'var(--neon-cyan)';
                        setTimeout(() => e.target.style.background = '#111', 200);
                        
                        if(playerSequence.length === sequence.length) {
                            AudioEngine.success();
                            setTimeout(() => this.startPhase3(), 1000);
                        }
                    } else {
                        AudioEngine.error();
                        this.state.memoryErrors++;
                        e.target.style.background = 'var(--neon-red)';
                        setTimeout(() => {
                            e.target.style.background = '#111';
                            playerSequence = []; // Reset sequence for player to try again
                        }, 400);
                    }
                });
            });
        };
    },

    // Phase 3: Decision
    startPhase3() {
        this.ui.hudPhase.innerText = 'المرحلة 3: اتخاذ القرار';
        this.state.decisionTimes = [];
        this.state.decisionErrors = 0;
        this.runDecisionRound(0);
    },

    runDecisionRound(round) {
        this.clearContainer();
        if(round >= 5) {
            this.startBossPhase();
            return;
        }

        const colors = [
            { name: 'أحمر', val: 'var(--neon-red)' },
            { name: 'أزرق', val: 'var(--neon-cyan)' },
            { name: 'بنفسجي', val: 'var(--neon-purple)' }
        ];

        const textObj = colors[Math.floor(Math.random() * colors.length)];
        let colorObj = colors[Math.floor(Math.random() * colors.length)];
        
        const prompt = document.createElement('div');
        prompt.className = 'decision-prompt';
        prompt.innerText = textObj.name;
        prompt.style.color = colorObj.val;
        
        const optsContainer = document.createElement('div');
        optsContainer.className = 'decision-options';

        // Shuffle options
        let options = [...colors].sort(() => Math.random() - 0.5);

        this.state.startTime = Date.now();

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'neon-btn';
            btn.innerText = opt.name;
            btn.addEventListener('click', () => {
                const rt = Date.now() - this.state.startTime;
                this.state.decisionTimes.push(rt);
                
                // Rules: answer based on COLOR not TEXT
                if(opt.val === colorObj.val) {
                    AudioEngine.click();
                } else {
                    AudioEngine.error();
                    this.state.decisionErrors++;
                }
                this.runDecisionRound(round + 1);
            });
            optsContainer.appendChild(btn);
        });

        const helpText = document.createElement('p');
        helpText.innerText = "اختر لون النص، وليس الكلمة المكتوبة";
        helpText.style.marginBottom = "20px";

        this.ui.container.appendChild(helpText);
        this.ui.container.appendChild(prompt);
        this.ui.container.appendChild(optsContainer);
    },

    // Phase 4: Boss Fight (Future Self)
    startBossPhase() {
        this.ui.hudPhase.innerText = 'التهديد: النسخة المستقبلية';
        this.clearContainer();
        this.ui.aiProgress.classList.remove('hidden');
        AudioEngine.glitch();

        // Calculate AI strength based on player's average stats
        const avgSpeed = this.state.speedTimes.reduce((a,b)=>a+b,0) / 5;
        const speedMultiplier = this.state.memoryErrors > 0 ? 0.9 : 0.85; // AI is faster than player
        const aiDelay = avgSpeed * speedMultiplier; 

        let playerHits = 0;
        let aiProgress = 0;
        const targetHits = 10;
        this.state.bossActive = true;

        const info = document.createElement('h3');
        info.innerText = "دمر الأهداف قبل أن تكتمل نسختك!";
        info.style.marginBottom = '20px';
        info.style.color = 'var(--neon-red)';
        this.ui.container.appendChild(info);

        const spawnTarget = () => {
            if(!this.state.bossActive) return;
            const dot = document.createElement('div');
            dot.className = 'target-dot';
            dot.style.background = 'var(--neon-purple)';
            dot.style.boxShadow = '0 0 15px var(--neon-purple)';
            
            const maxX = this.ui.container.clientWidth - 50;
            const maxY = this.ui.container.clientHeight - 80;
            dot.style.left = `${Math.max(0, Math.random() * maxX)}px`;
            dot.style.top = `${Math.max(0, Math.random() * maxY + 30)}px`;
            
            dot.addEventListener('mousedown', () => {
                if(!this.state.bossActive) return;
                playerHits++;
                AudioEngine.click();
                dot.remove();
                if(playerHits >= targetHits) {
                    this.endGame(true, (100 - aiProgress).toFixed(1));
                } else {
                    spawnTarget();
                }
            });
            this.ui.container.appendChild(dot);
        };

        // AI Progress Loop
        const aiLoop = setInterval(() => {
            if(!this.state.bossActive) {
                clearInterval(aiLoop);
                return;
            }
            aiProgress += (100 / targetHits); // AI makes a move
            this.ui.aiFill.style.width = `${Math.min(100, aiProgress)}%`;
            AudioEngine.bossTick();

            if(aiProgress >= 100) {
                this.endGame(false, 0);
            }
        }, aiDelay);

        spawnTarget();
    },

    endGame(isWin, winPercent) {
        this.state.bossActive = false;
        this.ui.aiProgress.classList.add('hidden');
        
        if(isWin) AudioEngine.success();
        else AudioEngine.error();

        // Calculate Stats
        const avgSpeed = Math.round(this.state.speedTimes.reduce((a,b)=>a+b,0) / 5);
        const avgDec = Math.round(this.state.decisionTimes.reduce((a,b)=>a+b,0) / 5);
        
        let title = "الظل السريع";
        if(this.state.memoryErrors === 0 && avgDec < 1000) title = "العقل الاستراتيجي";
        if(avgSpeed < 300) title = "خوارزمية حية";
        if(!isWin) title = "النسخة القديمة";

        // Update Profile
        this.profile.xp += isWin ? 500 : 100;
        if(this.profile.xp >= this.profile.level * 1000) {
            this.profile.level++;
            this.profile.xp = 0;
        }
        this.profile.history.push({ date: Date.now(), win: isWin, percent: winPercent });
        Storage.save(this.profile);

        // Render Results
        const statsHtml = `
            <div class="stat-box ${avgSpeed > 500 ? 'weak' : ''}">
                <h4>زمن الاستجابة</h4>
                <p>${avgSpeed} ms</p>
            </div>
            <div class="stat-box ${this.state.memoryErrors > 0 ? 'weak' : ''}">
                <h4>أخطاء الذاكرة</h4>
                <p>${this.state.memoryErrors}</p>
            </div>
            <div class="stat-box ${this.state.decisionErrors > 0 ? 'weak' : ''}">
                <h4>أخطاء القرار</h4>
                <p>${this.state.decisionErrors}</p>
            </div>
            <div class="stat-box ${!isWin ? 'weak' : ''}">
                <h4>نتيجة المواجهة</h4>
                <p>${isWin ? `انتصار (${winPercent}%)` : 'هزيمة'}</p>
            </div>
        `;

        document.getElementById('result-stats').innerHTML = statsHtml;
        document.getElementById('final-title').innerText = title;
        
        this.state.finalShareText = isWin ? 
            `لقد هزمت نسختي المستقبلية بنسبة تفوق ${winPercent}% وحصلت على لقب [${title}] في لعبة Echo! هل يمكنك تحدي عقلك؟ 🧠🚀` : 
            `لقد هزمتني نسختي المستقبلية في لعبة Echo.. النظام يعرفني أكثر من نفسي! هل تجرؤ على التجربة؟ 👁️`;

        this.switchScreen(this.ui.result);
    },

    shareResult() {
        if (navigator.share) {
            navigator.share({
                title: 'Echo: نسخة الغد',
                text: this.state.finalShareText,
                url: window.location.href
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(this.state.finalShareText + " العب الآن: " + window.location.href);
            alert("تم نسخ النتيجة للحافظة! شاركها مع أصدقائك.");
        }
    }
};

window.onload = () => Game.init();

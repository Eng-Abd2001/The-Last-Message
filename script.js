/**
 * OUT OF FRAME - Core Game Engine
 * Senior Architecture, Pure Vanilla JS ES6+
 * (Cache-Busted & Bulletproof Version)
 */

const Translations = {
    ar: {
        start: 'ابدأ', continue: 'متابعة', chapters: 'الفصول', daily: 'لغز اليوم',
        endless: 'لا نهائي', stats: 'الإحصائيات', achievements: 'الإنجازات',
        settings: 'الإعدادات', credits: 'الحقوق', language: 'اللغة', back: 'عودة',
        hint: 'تلميح', pause: 'إيقاف مؤقت', resume: 'متابعة', quit: 'خروج',
        levelComplete: 'اكتمل المشهد', next: 'التالي', replay: 'إعادة', share: 'مشاركة',
        time: 'الوقت', moves: 'الحركات', sound: 'الصوت', motion: 'الحركة', reset: 'حذف التقدم',
        on: 'مفعل', off: 'معطل', high: 'عالي', low: 'منخفض',
        ch1: 'الغرفة', ch2: 'النقطة العمياء', ch3: 'المراقب', ch4: 'ذاكرة كاذبة', ch5: 'الملاحظ', ch6: 'خارج المشهد',
        locked: 'مغلق', level: 'مشهد', hint1: 'هل جربت النظر بعيداً؟', hint2: 'راقب تحركات الظلال', hint3: 'تحرك عندما لا تكون الشاشة موجهة',
        cameraHint: 'اسحب لتحريك الكاميرا، انقر للتحرك'
    },
    en: {
        start: 'START', continue: 'CONTINUE', chapters: 'CHAPTERS', daily: 'DAILY MYSTERY',
        endless: 'ENDLESS', stats: 'STATS', achievements: 'ACHIEVEMENTS',
        settings: 'SETTINGS', credits: 'CREDITS', language: 'LANGUAGE', back: 'BACK',
        hint: 'HINT', pause: 'PAUSE', resume: 'RESUME', quit: 'QUIT',
        levelComplete: 'SCENE COMPLETE', next: 'NEXT', replay: 'REPLAY', share: 'SHARE',
        time: 'Time', moves: 'Moves', sound: 'Sound', motion: 'Motion', reset: 'Reset Data',
        on: 'ON', off: 'OFF', high: 'HIGH', low: 'LOW',
        ch1: 'THE ROOM', ch2: 'BLIND SPOT', ch3: 'THE WATCHER', ch4: 'FALSE MEMORY', ch5: 'THE OBSERVER', ch6: 'OUT OF FRAME',
        locked: 'Locked', level: 'Level', hint1: 'Try looking away.', hint2: 'Watch the shadows.', hint3: 'Move when out of sight.',
        cameraHint: 'Drag to look, Tap to move'
    }
};

class StorageManager {
    constructor() {
        this.key = 'OutOfFrame_SaveData_v2';
        this.data = this.load();
    }
    load() {
        try {
            const saved = localStorage.getItem(this.key);
            return saved ? JSON.parse(saved) : this.defaultData();
        } catch(e) { return this.defaultData(); }
    }
    save() {
        try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch(e) {}
    }
    defaultData() {
        return {
            lang: 'ar', sound: true, motion: 'high', currentLevel: 1,
            levels: {}, achievements: [], stats: { solved: 0, totalTime: 0, hints: 0 }
        };
    }
    reset() { this.data = this.defaultData(); this.save(); }
}

class AudioManager {
    constructor(storage) {
        this.storage = storage;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.warn('Audio API disabled');
            this.ctx = { state: 'suspended', resume: () => {} };
        }
        this.enabled = storage.data.sound;
    }
    playTone(freq, type = 'sine', duration = 0.1, vol = 0.1) {
        if (!this.enabled || !this.ctx.createOscillator || this.ctx.state === 'suspended') return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type; osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(); osc.stop(this.ctx.currentTime + duration);
        } catch(e) {}
    }
    playClick() { this.playTone(400, 'square', 0.05, 0.05); }
    playMove() { this.playTone(200, 'sine', 0.1, 0.03); }
    playSuccess() { this.playTone(600, 'sine', 0.3, 0.1); setTimeout(()=>this.playTone(800, 'sine', 0.5, 0.1), 150); }
    playWhisper() { this.playTone(100, 'triangle', 1.0, 0.02); }
    resume() { if(this.ctx.resume && this.ctx.state === 'suspended') this.ctx.resume(); }
}

class LevelManager {
    static getChapters() {
        return [
            { id: 1, rule: 'invisibility', count: 10, nameKey: 'ch1' },
            { id: 2, rule: 'movement', count: 10, nameKey: 'ch2' },
            { id: 3, rule: 'gaze_trap', count: 10, nameKey: 'ch3' },
            { id: 4, rule: 'memory', count: 10, nameKey: 'ch4' },
            { id: 5, rule: 'observer', count: 10, nameKey: 'ch5' },
            { id: 6, rule: 'chaos', count: 10, nameKey: 'ch6' }
        ];
    }
    static generateLevel(levelIndex) {
        const chapterIdx = Math.floor((levelIndex - 1) / 10);
        const rule = this.getChapters()[chapterIdx].rule;
        const size = 6 + Math.floor(levelIndex / 15); 
        
        let entities = [];
        entities.push({ type: 'player', x: 1, y: 1 });
        entities.push({ type: 'exit', x: size - 2, y: size - 2 });
        
        for(let i=0; i<size * 1.5; i++) {
            let wx = 2 + (Math.floor(Math.sin(levelIndex * i) * (size-4)) + (size-4)) % (size-3);
            let wy = 2 + (Math.floor(Math.cos(levelIndex * i) * (size-4)) + (size-4)) % (size-3);
            if(wx === 1 && wy === 1) continue;
            
            let isQuantum = (i % 3 === 0);
            entities.push({
                type: isQuantum ? 'quantum_wall' : 'wall',
                x: wx, y: wy,
                state: 'solid',
                behavior: rule
            });
        }
        return { id: levelIndex, size, entities, rule, timeLimit: 30 + levelIndex * 5 };
    }
}

class GameEngine {
    constructor(canvas, uiManager) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ui = uiManager;
        this.state = 'idle'; 
        this.level = null;
        this.camera = { x: 0, y: 0, targetX: 0, targetY: 0, fov: 4 }; 
        this.player = { x: 0, y: 0 };
        this.gridSize = 0;
        this.cellSize = 50;
        this.moves = 0;
        this.startTime = 0;
        this.elapsed = 0;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.setupInputs();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.render();
    }
    
    loadLevel(levelData) {
        this.level = JSON.parse(JSON.stringify(levelData)); 
        this.gridSize = this.level.size;
        const p = this.level.entities.find(e => e.type === 'player');
        this.player = { x: p.x, y: p.y };
        this.cellSize = Math.min(this.canvas.width, this.canvas.height) / (this.gridSize + 2);
        this.camera.x = this.player.x; this.camera.y = this.player.y;
        this.camera.targetX = this.player.x; this.camera.targetY = this.player.y;
        this.moves = 0; this.startTime = Date.now(); this.state = 'playing';
        this.updateVisibility();
        this.loop();
    }
    
    setupInputs() {
        let isDragging = false;
        let lastX = 0, lastY = 0;
        const down = (e) => {
            if(this.state !== 'playing') return;
            isDragging = true;
            lastX = e.touches ? e.touches[0].clientX : e.clientX;
            lastY = e.touches ? e.touches[0].clientY : e.clientY;
        };
        const move = (e) => {
            if(!isDragging || this.state !== 'playing') return;
            let cx = e.touches ? e.touches[0].clientX : e.clientX;
            let cy = e.touches ? e.touches[0].clientY : e.clientY;
            let dx = (lastX - cx) / this.cellSize; let dy = (lastY - cy) / this.cellSize;
            this.camera.targetX += dx; this.camera.targetY += dy;
            this.camera.targetX = Math.max(-2, Math.min(this.gridSize + 1, this.camera.targetX));
            this.camera.targetY = Math.max(-2, Math.min(this.gridSize + 1, this.camera.targetY));
            lastX = cx; lastY = cy;
            this.updateVisibility();
        };
        const up = (e) => {
            if(isDragging) { isDragging = false; return; }
            if(this.state !== 'playing') return;
            let cx = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            let cy = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
            this.attemptMove(cx, cy);
        };
        this.canvas.addEventListener('mousedown', down); this.canvas.addEventListener('mousemove', move); this.canvas.addEventListener('mouseup', up);
        this.canvas.addEventListener('touchstart', down, {passive: true}); this.canvas.addEventListener('touchmove', move, {passive: true}); this.canvas.addEventListener('touchend', up);
    }
    
    attemptMove(screenX, screenY) {
        const offsetX = (this.canvas.width - this.gridSize * this.cellSize) / 2;
        const offsetY = (this.canvas.height - this.gridSize * this.cellSize) / 2;
        const gridX = Math.floor((screenX - offsetX + (this.camera.x - this.gridSize/2)*this.cellSize) / this.cellSize + this.gridSize/2);
        const gridY = Math.floor((screenY - offsetY + (this.camera.y - this.gridSize/2)*this.cellSize) / this.cellSize + this.gridSize/2);
        
        let dx = gridX - this.player.x; let dy = gridY - this.player.y;
        if (Math.abs(dx) + Math.abs(dy) === 1) {
            let obstacle = this.level.entities.find(e => e.x === gridX && e.y === gridY && e.type.includes('wall') && e.state === 'solid');
            if(!obstacle) {
                this.player.x = gridX; this.player.y = gridY;
                this.moves++; this.ui.audio.playMove();
                this.camera.targetX = this.player.x; this.camera.targetY = this.player.y;
                this.updateVisibility(); this.checkWin();
            }
        }
    }
    
    updateVisibility() {
        this.level.entities.forEach(e => {
            if (e.type === 'quantum_wall') {
                const dist = Math.hypot(e.x - this.camera.x, e.y - this.camera.y);
                const isVisible = dist < this.camera.fov;
                switch(e.behavior) {
                    case 'invisibility': e.state = isVisible ? 'solid' : 'hidden'; break;
                    case 'movement': e.state = isVisible ? 'hidden' : 'solid'; break;
                    case 'gaze_trap': e.state = (isVisible && dist < 2) ? 'solid' : 'hidden'; break;
                    default: e.state = isVisible ? 'solid' : 'hidden'; break;
                }
            }
        });
    }
    
    checkWin() {
        const exit = this.level.entities.find(e => e.type === 'exit');
        if (this.player.x === exit.x && this.player.y === exit.y) {
            this.state = 'complete';
            this.elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.ui.handleLevelComplete(this.moves, this.elapsed);
        }
    }
    
    loop() {
        if(this.state !== 'playing') return;
        requestAnimationFrame(() => this.loop());
        this.camera.x += (this.camera.targetX - this.camera.x) * 0.1;
        this.camera.y += (this.camera.targetY - this.camera.y) * 0.1;
        this.render();
    }
    
    render() {
        this.ctx.fillStyle = '#050507'; this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if(!this.level) return;
        
        this.ctx.save();
        const offsetX = this.canvas.width / 2 - this.camera.x * this.cellSize;
        const offsetY = this.canvas.height / 2 - this.camera.y * this.cellSize;
        this.ctx.translate(offsetX, offsetY);
        
        const rad = this.ctx.createRadialGradient(
            this.camera.x * this.cellSize + this.cellSize/2, this.camera.y * this.cellSize + this.cellSize/2, 0,
            this.camera.x * this.cellSize + this.cellSize/2, this.camera.y * this.cellSize + this.cellSize/2, this.camera.fov * this.cellSize
        );
        rad.addColorStop(0, 'rgba(255,255,255,0.05)'); rad.addColorStop(1, 'rgba(0,0,0,0)');
        this.ctx.fillStyle = rad; this.ctx.fillRect(-offsetX, -offsetY, this.canvas.width, this.canvas.height);

        this.level.entities.forEach(e => {
            if (e.type === 'player') return; 
            this.ctx.beginPath();
            this.ctx.rect(e.x * this.cellSize + 2, e.y * this.cellSize + 2, this.cellSize - 4, this.cellSize - 4);
            
            if (e.type === 'exit') {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; this.ctx.shadowBlur = 15; this.ctx.shadowColor = '#fff';
            } else if (e.type.includes('wall')) {
                if (e.state === 'solid') {
                    this.ctx.fillStyle = '#1a1a24'; this.ctx.strokeStyle = '#2e596b';
                    this.ctx.lineWidth = 1; this.ctx.stroke();
                } else {
                    this.ctx.strokeStyle = 'rgba(46, 89, 107, 0.2)'; this.ctx.lineWidth = 1;
                    this.ctx.stroke(); this.ctx.fillStyle = 'transparent';
                }
                this.ctx.shadowBlur = 0;
            }
            this.ctx.fill();
        });
        
        this.ctx.beginPath();
        this.ctx.arc(this.player.x * this.cellSize + this.cellSize/2, this.player.y * this.cellSize + this.cellSize/2, this.cellSize/4, 0, Math.PI*2);
        this.ctx.fillStyle = '#4a6b7c'; this.ctx.shadowBlur = 20; this.ctx.shadowColor = '#4a6b7c'; this.ctx.fill();
        this.ctx.restore();
    }
}

class UIManager {
    constructor() {
        this.storage = new StorageManager();
        this.audio = new AudioManager(this.storage);
        this.lang = this.storage.data.lang;
        document.documentElement.lang = this.lang;
        document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
        
        try {
            this.initDOM();
            this.bindEvents();
            this.engine = new GameEngine(document.getElementById('game-canvas'), this);
            setTimeout(() => this.showScreen('screen-splash'), 100);
        } catch (error) {
            console.error("Game Initialization Error:", error);
            alert("حدث خطأ أثناء تحميل اللعبة. الرجاء إعادة تحديث الصفحة.");
        }
    }
    
    initDOM() {
        this.screens = document.querySelectorAll('.screen');
        this.t = (key) => Translations[this.lang][key] || key;
        this.updateTexts();
    }
    
    updateTexts() {
        const setTxt = (id, txt) => { const el = document.getElementById(id); if(el) el.innerText = txt; };
        setTxt('btn-start', this.t('start')); setTxt('btn-continue', this.t('continue'));
        setTxt('btn-chapters', this.t('chapters')); setTxt('btn-daily', this.t('daily'));
        setTxt('btn-endless', this.t('endless')); setTxt('btn-stats', this.t('stats'));
        setTxt('btn-achievements', this.t('achievements')); setTxt('btn-settings', this.t('settings'));
        setTxt('btn-credits', this.t('credits')); setTxt('btn-lang', this.lang === 'ar' ? 'العربية' : 'English');
        setTxt('btn-sound', this.storage.data.sound ? this.t('on') : this.t('off'));
        setTxt('camera-hint', this.t('cameraHint'));
        
        const btnContinue = document.getElementById('btn-continue');
        if (btnContinue) {
            if (this.storage.data.currentLevel > 1) {
                btnContinue.disabled = false; btnContinue.classList.add('primary');
            } else {
                btnContinue.disabled = true; btnContinue.classList.remove('primary');
            }
        }
    }
    
    showScreen(id) {
        this.screens.forEach(s => {
            if (s.id !== id) {
                s.classList.remove('active');
                setTimeout(() => { if (!s.classList.contains('active')) s.classList.add('hidden'); }, 500);
            }
        });
        const target = document.getElementById(id);
        if (target) {
            target.classList.remove('hidden');
            setTimeout(() => target.classList.add('active'), 10);
        }
        if (id !== 'screen-splash' && this.audio) this.audio.playClick();
    }
    
    bindEvents() {
        const bind = (id, fn) => { const el = document.getElementById(id); if(el) el.onclick = fn; };
        
        bind('btn-start', () => { this.audio.resume(); this.showScreen('screen-menu'); });
        bind('btn-continue', () => this.startGame(this.storage.data.currentLevel));
        bind('btn-chapters', () => this.renderChapters());
        bind('btn-settings', () => this.showScreen('screen-settings'));
        bind('btn-credits', () => this.showScreen('screen-credits'));
        bind('btn-stats', () => this.renderStats());
        
        document.querySelectorAll('.btn-back').forEach(b => b.onclick = () => this.showScreen('screen-menu'));
        const btnBackChapters = document.querySelector('.btn-back-chapters');
        if(btnBackChapters) btnBackChapters.onclick = () => this.showScreen('screen-chapters');
        
        bind('btn-lang', () => {
            this.lang = this.lang === 'ar' ? 'en' : 'ar'; this.storage.data.lang = this.lang;
            this.storage.save(); document.documentElement.lang = this.lang;
            document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr'; this.updateTexts();
        });
        
        bind('btn-sound', () => {
            this.storage.data.sound = !this.storage.data.sound; this.audio.enabled = this.storage.data.sound;
            this.storage.save(); this.updateTexts();
        });
        
        bind('btn-reset-data', () => {
            if(confirm('Are you sure? This cannot be undone.')) { this.storage.reset(); window.location.reload(); }
        });

        bind('btn-pause', () => { this.engine.state = 'paused'; document.getElementById('pause-overlay').classList.remove('hidden'); });
        bind('btn-resume', () => { document.getElementById('pause-overlay').classList.add('hidden'); this.engine.state = 'playing'; });
        bind('btn-settings-ingame', () => { document.getElementById('pause-overlay').classList.add('hidden'); this.showScreen('screen-settings'); });
        bind('btn-quit', () => { document.getElementById('pause-overlay').classList.add('hidden'); this.showScreen('screen-menu'); });
        bind('btn-restart', () => this.startGame(this.engine.level.id));
        
        let currentHint = 1;
        bind('btn-hint', () => {
            document.getElementById('hint-overlay').classList.remove('hidden');
            document.getElementById('hint-text').innerText = this.t('hint1'); currentHint = 1;
        });
        bind('btn-close-hint', () => document.getElementById('hint-overlay').classList.add('hidden'));
        bind('btn-next-hint', () => {
            currentHint = currentHint >= 3 ? 1 : currentHint + 1;
            document.getElementById('hint-text').innerText = this.t('hint' + currentHint);
        });

        bind('btn-next-level', () => { document.getElementById('level-complete-overlay').classList.add('hidden'); this.startGame(this.engine.level.id + 1); });
        bind('btn-menu-complete', () => { document.getElementById('level-complete-overlay').classList.add('hidden'); this.showScreen('screen-menu'); });
        bind('btn-replay-level', () => { document.getElementById('level-complete-overlay').classList.add('hidden'); this.startGame(this.engine.level.id); });
        bind('btn-share', () => {
            const text = `OUT OF FRAME\nScene ${this.engine.level.id} Solved!\n⭐⭐⭐\nTime: ${this.engine.elapsed}s`;
            if (navigator.share) navigator.share({ text }); else navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
        });
    }
    
    renderChapters() {
        this.showScreen('screen-chapters');
        const container = document.getElementById('chapters-container'); container.innerHTML = '';
        LevelManager.getChapters().forEach((ch, idx) => {
            const div = document.createElement('div'); const startLevel = idx * 10 + 1;
            const isLocked = startLevel > this.storage.data.currentLevel;
            div.className = `card ${isLocked ? 'locked' : ''}`;
            div.innerHTML = `<h3>Chapter ${ch.id}</h3><p class="text-muted">${this.t(ch.nameKey)}</p><div class="mt-lg">${isLocked ? this.t('locked') : `${ch.count} Levels`}</div>`;
            if(!isLocked) div.onclick = () => this.renderLevels(ch.id);
            container.appendChild(div);
        });
    }
    
    renderLevels(chapterId) {
        this.showScreen('screen-levels');
        document.getElementById('current-chapter-title').innerText = `Chapter ${chapterId}`;
        const container = document.getElementById('levels-container'); container.innerHTML = '';
        const start = (chapterId - 1) * 10 + 1;
        for(let i = start; i < start + 10; i++) {
            const div = document.createElement('div'); const isLocked = i > this.storage.data.currentLevel;
            div.className = `card ${isLocked ? 'locked' : ''}`; div.innerHTML = `<h4>${i}</h4>`;
            if(!isLocked) {
                const stars = this.storage.data.levels[i]?.stars || 0;
                if(stars > 0) div.innerHTML += `<div class="stars">${'⭐'.repeat(stars)}</div>`;
                div.onclick = () => this.startGame(i);
            }
            container.appendChild(div);
        }
    }
    
    startGame(levelIndex) {
        if(levelIndex > 60) return; 
        document.getElementById('level-complete-overlay').classList.add('hidden');
        document.getElementById('pause-overlay').classList.add('hidden');
        this.showScreen('screen-game');
        document.getElementById('hud-level-info').innerText = `${this.t('level')} ${levelIndex}`;
        const levelData = LevelManager.generateLevel(levelIndex);
        this.engine.loadLevel(levelData);
        this.audio.playWhisper();
    }
    
    handleLevelComplete(moves, time) {
        this.audio.playSuccess();
        let stars = 3; if (time > this.engine.level.timeLimit) stars = 2; if (time > this.engine.level.timeLimit * 1.5) stars = 1;
        this.storage.data.stats.solved++; this.storage.data.stats.totalTime += time;
        this.storage.data.levels[this.engine.level.id] = { stars, time, moves };
        if (this.engine.level.id === this.storage.data.currentLevel) this.storage.data.currentLevel++;
        this.storage.save(); this.updateTexts();
        
        document.getElementById('stars-container').innerText = '⭐'.repeat(stars);
        document.getElementById('stat-time').innerText = `${this.t('time')}: ${time}s`;
        document.getElementById('stat-moves').innerText = `${this.t('moves')}: ${moves}`;
        document.getElementById('level-complete-overlay').classList.remove('hidden');
    }

    renderStats() {
        this.showScreen('screen-stats');
        const st = this.storage.data.stats;
        document.getElementById('stats-content').innerHTML = `<h3>Scenes Solved: ${st.solved}</h3><h3>Total Time: ${st.totalTime}s</h3><h3>Current Level: ${this.storage.data.currentLevel} / 60</h3>`;
    }
}

window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').catch(err => console.log('SW setup skipped', err));
    }
    window.gameUI = new UIManager();
};

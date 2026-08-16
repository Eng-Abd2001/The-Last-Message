// --- حالة اللعبة (State) ---
let gameState = {
    currentCaseId: 'case_01',
    collectedEvidence: [],
    level: 1
};

// --- عناصر الـ DOM ---
const screens = {
    loading: document.getElementById('loading-screen'),
    lock: document.getElementById('lock-screen'),
    home: document.getElementById('home-screen'),
    app: document.getElementById('app-container')
};
const appContent = document.getElementById('app-content');
const appTitle = document.getElementById('app-title');
const evidenceCounter = document.getElementById('evidence-count');

// --- التهيئة الأساسية ---
window.onload = () => {
    loadProgress();
    updateClock();
    setInterval(updateClock, 60000); // تحديث كل دقيقة
    
    // إخفاء التحميل
    setTimeout(() => {
        screens.loading.style.opacity = '0';
        setTimeout(() => screens.loading.style.display = 'none', 1000);
    }, 1500);

    updateUIStats();
};

// --- التخزين ---
function saveProgress() {
    localStorage.setItem('detectiveGameState', JSON.stringify(gameState));
    updateUIStats();
}

function loadProgress() {
    const saved = localStorage.getItem('detectiveGameState');
    if (saved) gameState = JSON.parse(saved);
}

function updateUIStats() {
    document.getElementById('player-level').innerText = gameState.level;
    evidenceCounter.innerText = gameState.collectedEvidence.length;
}

// --- الساعة ---
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').innerText = timeString;
    document.getElementById('lock-time').innerText = timeString;
}

// --- التنقل (Navigation) ---
document.querySelector('.swipe-up-text').addEventListener('click', () => {
    screens.lock.classList.remove('active');
    screens.lock.classList.add('hidden');
    screens.home.classList.remove('hidden');
    screens.home.classList.add('active');
});

document.getElementById('home-btn').addEventListener('click', () => {
    screens.app.classList.remove('active');
    screens.app.classList.add('hidden');
    screens.home.classList.remove('hidden');
    screens.home.classList.add('active');
});

// --- فتح التطبيقات ---
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const appName = icon.getAttribute('data-app');
        openApp(appName);
    });
});

function openApp(appName) {
    const caseData = GameCases[gameState.currentCaseId];
    appContent.innerHTML = ''; 
    
    screens.home.classList.remove('active');
    screens.home.classList.add('hidden');
    screens.app.classList.remove('hidden');
    screens.app.classList.add('active');

    const appTitles = {
        messages: 'الرسائل', gallery: 'الصور', notes: 'الملاحظات', 
        files: 'الملفات', calls: 'سجل المكالمات', browser: 'المتصفح', 
        contacts: 'جهات الاتصال', evidence: 'لوحة الأدلة', analysis: 'التحليل النهائي'
    };
    appTitle.innerText = appTitles[appName] || 'تطبيق';

    // مسارات التطبيقات
    if(appName === 'messages') renderMessages(caseData);
    if(appName === 'gallery') renderGallery(caseData);
    if(appName === 'notes') renderNotes(caseData);
    if(appName === 'files') renderFiles(caseData);
    if(appName === 'calls') renderCalls(caseData);
    if(appName === 'browser') renderBrowser(caseData);
    if(appName === 'contacts') renderContacts(caseData);
    if(appName === 'evidence') renderEvidence();
    if(appName === 'analysis') renderAnalysis(caseData);
}

// --- 1. الرسائل ---
function renderMessages(caseData) {
    caseData.appsData.messages.forEach(chat => {
        const char = caseData.characters[chat.contactId];
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div class="item-avatar">${char.avatar}</div>
            <div class="item-details">
                <h4>${char.name}</h4>
                <p>${chat.preview}</p>
            </div>
        `;
        div.onclick = () => renderChatThread(chat.thread, char.name);
        appContent.appendChild(div);
    });
}

function renderChatThread(thread, name) {
    appTitle.innerText = name;
    appContent.innerHTML = '';
    
    thread.forEach(msg => {
        const bubble = document.createElement('div');
        const isFound = gameState.collectedEvidence.includes(msg.clueId);
        bubble.className = `bubble ${msg.type} ${msg.isClue ? 'clue-target' : ''} ${isFound ? 'found' : ''}`;
        
        bubble.innerHTML = `
            <div>${msg.text}</div>
            <div class="bubble-time">${msg.time}</div>
        `;
        
        if (msg.isClue) {
            bubble.onclick = () => collectEvidence(msg.clueId, msg.clueDesc, bubble);
        }
        appContent.appendChild(bubble);
    });
}

// --- 2. معرض الصور ---
function renderGallery(caseData) {
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    
    caseData.appsData.gallery.forEach(img => {
        const thumb = document.createElement('div');
        thumb.className = 'gallery-thumb';
        thumb.style.background = img.visual;
        thumb.innerHTML = img.emoji;
        thumb.onclick = () => openImageViewer(img);
        grid.appendChild(thumb);
    });
    appContent.appendChild(grid);
}

function openImageViewer(imgData) {
    const viewer = document.getElementById('image-viewer');
    const frame = document.getElementById('image-frame');
    const caption = document.getElementById('image-caption');
    const btn = document.getElementById('extract-clue-btn');

    frame.style.background = imgData.visual;
    frame.innerHTML = imgData.emoji;
    caption.innerText = imgData.caption;

    if (imgData.hasClue && !gameState.collectedEvidence.includes(imgData.clueId)) {
        btn.classList.remove('hidden');
        btn.onclick = () => {
            collectEvidence(imgData.clueId, imgData.clueDesc, null);
            btn.classList.add('hidden');
        };
    } else {
        btn.classList.add('hidden');
    }

    viewer.classList.remove('hidden');
}

document.getElementById('close-image').onclick = () => {
    document.getElementById('image-viewer').classList.add('hidden');
};

// --- 3. الملاحظات ---
function renderNotes(caseData) {
    caseData.appsData.notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-card';
        div.innerHTML = `<h3 style="margin-bottom:10px; border-bottom:1px solid #ccc; padding-bottom:5px;">${note.title}</h3><p>${note.text.replace(/\n/g, '<br>')}</p>`;
        appContent.appendChild(div);
    });
}

// --- 4. الملفات ---
function renderFiles(caseData) {
    caseData.appsData.files.forEach(file => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div class="item-avatar" style="background:#2563eb;">${file.type === 'locked' ? '🔒' : '📄'}</div>
            <div class="item-details">
                <h4>${file.name}</h4>
                <p>${file.type === 'locked' ? 'مشفّر (يتطلب رقم سري)' : 'مفتوح'}</p>
            </div>
        `;
        div.onclick = () => {
            if (file.type === 'locked') {
                const pass = prompt('أدخل الرمز السري للملف:');
                if (pass === file.password) {
                    alert('تم فك التشفير بنجاح!');
                    file.type = 'open';
                    if (file.isClue) collectEvidence(file.clueId, file.clueDesc, null);
                    openApp('files'); // إعادة رسم الصفحة
                } else if (pass !== null) {
                    alert('الرمز خاطئ!');
                }
            } else {
                alert(file.content);
            }
        };
        appContent.appendChild(div);
    });
}

// --- 5. المكالمات ---
function renderCalls(caseData) {
    caseData.appsData.calls.forEach(call => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div class="item-avatar" style="background:${call.type === 'missed' ? '#ef4444' : '#10b981'};">📞</div>
            <div class="item-details">
                <h4>${call.name}</h4>
                <p>${call.time} | ${call.type === 'missed' ? 'فائتة' : 'مستلمة (' + call.duration + ')'}</p>
            </div>
        `;
        appContent.appendChild(div);
    });
}

// --- 6. المتصفح ---
function renderBrowser(caseData) {
    caseData.appsData.browser.forEach(site => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div class="item-avatar" style="background:#8b5cf6;">🌐</div>
            <div class="item-details">
                <h4 style="color:#a78bfa;">${site.title}</h4>
                <p>${site.url}</p>
            </div>
        `;
        appContent.appendChild(div);
    });
}

// --- 7. جهات الاتصال ---
function renderContacts(caseData) {
    Object.values(caseData.characters).forEach(char => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div class="item-avatar">${char.avatar}</div>
            <div class="item-details">
                <h4>${char.name}</h4>
                <p>${char.phone} <br><span style="font-size:11px; color:#64748b;">${char.relation}</span></p>
            </div>
        `;
        appContent.appendChild(div);
    });
}

// --- 8. لوحة الأدلة ---
function renderEvidence() {
    if (gameState.collectedEvidence.length === 0) {
        appContent.innerHTML = '<p style="text-align:center; margin-top:50px; color:#64748b;">لم تقم بجمع أي أدلة بعد.</p>';
        return;
    }

    // نستخرج بيانات الأدلة من الـ caseData باستخدام الـ IDs المحفوظة
    const caseData = GameCases[gameState.currentCaseId];
    
    // تجميع كل الأدلة الموجودة في اللعبة للبحث فيها
    let allClues = [];
    caseData.appsData.messages.forEach(c => c.thread.forEach(m => { if(m.isClue) allClues.push(m); }));
    caseData.appsData.gallery.forEach(img => { if(img.hasClue) allClues.push(img); });
    caseData.appsData.files.forEach(f => { if(f.isClue) allClues.push(f); });

    gameState.collectedEvidence.forEach(evId => {
        const clue = allClues.find(c => c.clueId === evId);
        const desc = clue ? clue.clueDesc : 'دليل محظور';

        const div = document.createElement('div');
        div.className = 'evidence-card';
        div.innerHTML = `<h4>دليل رقم: #${Math.floor(Math.random()*9000)+1000}</h4><p>${desc}</p>`;
        appContent.appendChild(div);
    });
}

// --- 9. التحليل والنهاية ---
function renderAnalysis(caseData) {
    appContent.innerHTML = `
        <div style="background:#334155; padding:15px; border-radius:10px; margin-bottom:20px; text-align:center;">
            <h3 style="color:#facc15; margin-bottom:10px;">إغلاق القضية</h3>
            <p style="font-size:13px; color:#cbd5e1;">بناءً على الأدلة (${gameState.collectedEvidence.length}/${caseData.requiredEvidence.length})، من هو المسؤول؟ اختر بعناية.</p>
        </div>
    `;
    
    caseData.suspects.forEach(suspect => {
        const btn = document.createElement('button');
        btn.className = 'suspect-btn';
        const charAvatar = caseData.characters[suspect.id].avatar;
        btn.innerHTML = `${charAvatar} اتهام: ${suspect.name}`;
        btn.onclick = () => handleEnding(suspect.id, caseData);
        appContent.appendChild(btn);
    });
}

// --- ميكانيكا اللعبة ---

function collectEvidence(clueId, desc, element) {
    if (!gameState.collectedEvidence.includes(clueId)) {
        gameState.collectedEvidence.push(clueId);
        saveProgress();

        if (element) element.classList.add('found');
        showNotification(desc);
    }
}

function showNotification(text) {
    const notif = document.getElementById('notification');
    document.getElementById('notif-desc').innerText = text;
    
    notif.classList.remove('hidden');
    notif.classList.add('show');
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

    setTimeout(() => { notif.classList.remove('show'); }, 4000);
}

function handleEnding(suspectId, caseData) {
    if (!confirm('هل أنت متأكد من قرارك؟ لا يمكن التراجع!')) return;

    let endingType = 'wrong';

    if (suspectId === 'boss') {
        const hasAllEvidence = caseData.requiredEvidence.every(ev => gameState.collectedEvidence.includes(ev));
        endingType = hasAllEvidence ? 'perfect' : 'partial';
    }

    const modal = document.getElementById('ending-modal');
    const titleObj = document.getElementById('ending-title');
    const descObj = document.getElementById('ending-desc');
    const finalEnding = caseData.endings[endingType];
    
    titleObj.innerText = finalEnding.title;
    titleObj.style.color = endingType === 'perfect' ? 'var(--success)' : (endingType === 'wrong' ? 'var(--danger)' : '#facc15');
    descObj.innerText = finalEnding.text;

    modal.classList.remove('hidden');
}

// إعادة اللعبة
document.getElementById('restart-btn').addEventListener('click', () => {
    localStorage.removeItem('detectiveGameState');
    window.location.reload();
});

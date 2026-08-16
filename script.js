let gameState = {
    currentCaseId: 'case_01',
    collectedEvidence: []
};

const screens = {
    loading: document.getElementById('loading-screen'),
    lock: document.getElementById('lock-screen'),
    home: document.getElementById('home-screen'),
    app: document.getElementById('app-container')
};
const appContent = document.getElementById('app-content');
const appTitle = document.getElementById('app-title');
const evidenceCounter = document.getElementById('evidence-count');

window.onload = () => {
    loadProgress();
    updateClock();
    setInterval(updateClock, 60000);
    
    setTimeout(() => {
        screens.loading.style.opacity = '0';
        setTimeout(() => screens.loading.style.display = 'none', 800);
    }, 1500);

    updateUIStats();
};

function saveProgress() {
    localStorage.setItem('detectiveStateNew', JSON.stringify(gameState));
    updateUIStats();
}

function loadProgress() {
    const saved = localStorage.getItem('detectiveStateNew');
    if (saved) gameState = JSON.parse(saved);
}

function updateUIStats() {
    evidenceCounter.innerText = gameState.collectedEvidence.length;
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').innerText = timeString;
    document.getElementById('lock-time').innerText = timeString;
}

// التنقل (السحب للأعلى للفتح)
document.getElementById('swipe-up-btn').addEventListener('click', () => {
    screens.lock.classList.remove('active');
    screens.lock.classList.add('hidden');
    screens.home.classList.remove('hidden');
    screens.home.classList.add('active');
});

// الخروج من التطبيق
function closeApp() {
    screens.app.classList.remove('active');
    screens.app.classList.add('hidden');
    setTimeout(() => {
        screens.home.classList.remove('hidden');
        screens.home.classList.add('active');
    }, 100);
}

document.getElementById('back-btn').addEventListener('click', closeApp);
document.getElementById('home-btn').addEventListener('click', closeApp);

// فتح التطبيقات
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

    const appTitles = { messages: 'الرسائل', gallery: 'الصور', notes: 'الملاحظات', files: 'الملفات', calls: 'المكالمات', browser: 'Safari', evidence: 'الأدلة', analysis: 'إصدار الحكم' };
    appTitle.innerText = appTitles[appName];

    if(appName === 'messages') renderMessages(caseData);
    if(appName === 'gallery') renderGallery(caseData);
    if(appName === 'notes') renderNotes(caseData);
    if(appName === 'files') renderFiles(caseData);
    if(appName === 'calls') renderCalls(caseData);
    if(appName === 'browser') renderBrowser(caseData);
    if(appName === 'evidence') renderEvidence(caseData);
    if(appName === 'analysis') renderAnalysis(caseData);
}

function renderMessages(caseData) {
    caseData.appsData.messages.forEach(chat => {
        const char = caseData.characters[chat.contactId];
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<div class="item-avatar">${char.avatar}</div><div class="item-details"><h4>${char.name}</h4><p>${chat.preview}</p></div>`;
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
        bubble.innerHTML = `<div>${msg.text}</div><div class="bubble-time">${msg.time}</div>`;
        if (msg.isClue) bubble.onclick = () => collectEvidence(msg.clueId, msg.clueDesc, bubble);
        appContent.appendChild(bubble);
    });
    // Scroll to bottom
    setTimeout(() => { appContent.scrollTop = appContent.scrollHeight; }, 50);
}

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
        btn.onclick = () => { collectEvidence(imgData.clueId, imgData.clueDesc, null); btn.classList.add('hidden'); };
    } else {
        btn.classList.add('hidden');
    }
    viewer.classList.remove('hidden');
}

document.getElementById('close-image').onclick = () => document.getElementById('image-viewer').classList.add('hidden');

function renderNotes(caseData) {
    caseData.appsData.notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-card';
        div.innerHTML = `<h3 style="margin-bottom:10px; color:#b45309;">${note.title}</h3><p>${note.text}</p>`;
        appContent.appendChild(div);
    });
}

function renderFiles(caseData) {
    caseData.appsData.files.forEach(file => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<div class="item-avatar" style="background:#2563eb;">${file.type === 'locked' ? '🔒' : '📄'}</div><div class="item-details"><h4>${file.name}</h4><p>${file.type === 'locked' ? 'مشفّر (يتطلب رمز)' : 'مفتوح'}</p></div>`;
        div.onclick = () => {
            if (file.type === 'locked') {
                const pass = prompt('أدخل الرمز السري للملف (4 أرقام):');
                if (pass === file.password) {
                    alert('تم فك التشفير بنجاح!');
                    file.type = 'open';
                    if (file.isClue) collectEvidence(file.clueId, file.clueDesc, null);
                    openApp('files'); 
                } else if (pass !== null) alert('الرمز خاطئ!');
            } else { alert(file.content); }
        };
        appContent.appendChild(div);
    });
}

function renderCalls(caseData) {
    caseData.appsData.calls.forEach(call => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<div class="item-avatar" style="background:${call.type === 'missed' ? '#dc2626' : '#16a34a'};">📞</div><div class="item-details"><h4>${call.name}</h4><p>${call.time} | ${call.type === 'missed' ? 'فائتة' : 'مستلمة'}</p></div>`;
        appContent.appendChild(div);
    });
}

function renderBrowser(caseData) {
    caseData.appsData.browser.forEach(site => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `<div class="item-avatar" style="background:#7c3aed;">🌐</div><div class="item-details"><h4 style="color:#c4b5fd;">${site.title}</h4><p style="font-size:11px;">${site.url}</p></div>`;
        appContent.appendChild(div);
    });
}

function renderEvidence(caseData) {
    if (gameState.collectedEvidence.length === 0) {
        appContent.innerHTML = '<p style="text-align:center; margin-top:50px; color:#64748b;">لا توجد أدلة. اقرأ الرسائل والصور بدقة.</p>';
        return;
    }
    let allClues = [];
    caseData.appsData.messages.forEach(c => c.thread.forEach(m => { if(m.isClue) allClues.push(m); }));
    caseData.appsData.gallery.forEach(img => { if(img.hasClue) allClues.push(img); });
    caseData.appsData.files.forEach(f => { if(f.isClue) allClues.push(f); });

    gameState.collectedEvidence.forEach(evId => {
        const clue = allClues.find(c => c.clueId === evId);
        const div = document.createElement('div');
        div.className = 'evidence-card';
        div.innerHTML = `<h4 style="color:#10b981; margin-bottom:5px;">دليل رقم: #${Math.floor(Math.random()*900)+100}</h4><p>${clue ? clue.clueDesc : ''}</p>`;
        appContent.appendChild(div);
    });
}

function renderAnalysis(caseData) {
    appContent.innerHTML = `
        <div style="background:#27272a; padding:20px; border-radius:15px; margin-bottom:20px; text-align:center;">
            <h3 style="color:#facc15; margin-bottom:10px;">إصدار الحكم</h3>
            <p style="font-size:14px; color:#cbd5e1; line-height:1.6;">الأدلة المجموعة: (${gameState.collectedEvidence.length}/${caseData.requiredEvidence.length}).<br>من هو الخائن الذي دسّ السم لنادر؟</p>
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
    if (!confirm('القرار نهائي ولن تتمكن من تغييره. هل أنت متأكد؟')) return;

    let endingType = 'wrong';
    // الحل الصحيح هو "رامي" (الصديق الخائن)
    if (suspectId === 'friend') {
        const hasAllEvidence = caseData.requiredEvidence.every(ev => gameState.collectedEvidence.includes(ev));
        endingType = hasAllEvidence ? 'perfect' : 'partial'; // إذا اختار رامي بس مجمعش الأدلة، تعتبر Partial
    } else if (suspectId === 'suspect') {
        endingType = 'partial'; // اختار الرأس المدبر بس نسي مين اللي حط السم
    }

    const modal = document.getElementById('ending-modal');
    document.getElementById('ending-title').innerText = caseData.endings[endingType].title;
    document.getElementById('ending-title').style.color = endingType === 'perfect' ? 'var(--success)' : (endingType === 'wrong' ? 'var(--danger)' : '#facc15');
    document.getElementById('ending-desc').innerText = caseData.endings[endingType].text;

    modal.classList.remove('hidden');
}

document.getElementById('restart-btn').addEventListener('click', () => {
    localStorage.removeItem('detectiveStateNew');
    window.location.reload();
});

// حالة اللعبة (Game State)
let gameState = {
    currentCaseId: 'case_01',
    collectedEvidence: [],
    level: 1,
    xp: 0
};

// عناصر DOM
const screens = {
    loading: document.getElementById('loading-screen'),
    lock: document.getElementById('lock-screen'),
    home: document.getElementById('home-screen'),
    app: document.getElementById('app-container')
};

const appContent = document.getElementById('app-content');
const appTitle = document.getElementById('app-title');

// التهيئة عند تحميل الصفحة
window.onload = () => {
    loadProgress();
    updateClock();
    setInterval(updateClock, 1000); // تحديث الساعة كل ثانية
    
    // إخفاء شاشة التحميل
    setTimeout(() => {
        screens.loading.style.opacity = '0';
        setTimeout(() => screens.loading.style.display = 'none', 1000);
    }, 1500);

    // تحديث إحصائيات اللاعب
    document.getElementById('player-level').innerText = gameState.level;
    document.getElementById('player-xp').innerText = gameState.xp;
};

// حفظ واسترجاع التقدم
function saveProgress() {
    localStorage.setItem('detectiveGameState', JSON.stringify(gameState));
}

function loadProgress() {
    const saved = localStorage.getItem('detectiveGameState');
    if (saved) {
        gameState = JSON.parse(saved);
    }
}

// الساعة
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').innerText = timeString;
    document.getElementById('lock-time').innerText = timeString;
}

// التنقل بين الشاشات
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

// فتح التطبيقات
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const appName = icon.getAttribute('data-app');
        openApp(appName);
    });
});

function openApp(appName) {
    const caseData = GameCases[gameState.currentCaseId];
    appContent.innerHTML = ''; // تفريغ المحتوى
    
    screens.home.classList.remove('active');
    screens.home.classList.add('hidden');
    screens.app.classList.remove('hidden');
    screens.app.classList.add('active');

    // توجيه التطبيق المفتوح
    switch (appName) {
        case 'messages':
            appTitle.innerText = 'الرسائل';
            renderMessages(caseData);
            break;
        case 'notes':
            appTitle.innerText = 'الملاحظات';
            renderNotes(caseData);
            break;
        case 'files':
            appTitle.innerText = 'الملفات';
            renderFiles(caseData);
            break;
        case 'calls':
            appTitle.innerText = 'المكالمات';
            renderCalls(caseData);
            break;
        case 'browser':
            appTitle.innerText = 'المتصفح';
            renderBrowser(caseData);
            break;
        case 'evidence':
            appTitle.innerText = 'لوحة الأدلة';
            renderEvidenceBoard();
            break;
        case 'analysis':
            appTitle.innerText = 'التحليل';
            renderAnalysis(caseData);
            break;
        default:
            appTitle.innerText = 'تطبيق';
            appContent.innerHTML = '<p style="text-align:center; margin-top:50px;">التطبيق قيد التطوير...</p>';
    }
}

// --- دوال رسم التطبيقات ---

function renderMessages(caseData) {
    const msgs = caseData.appsData.messages;
    msgs.forEach((chat, index) => {
        const char = caseData.characters[chat.contactId];
        const contactDiv = document.createElement('div');
        contactDiv.className = 'chat-contact unread';
        contactDiv.innerHTML = `
            <div class="chat-avatar">${char.avatar}</div>
            <div style="flex-grow: 1;">
                <h4 style="margin-bottom: 5px;">${char.name}</h4>
                <p style="font-size:12px; color:#aaa;">${chat.preview}</p>
            </div>
        `;
        contactDiv.onclick = () => renderChatThread(chat.thread, char.name);
        appContent.appendChild(contactDiv);
    });
}

function renderChatThread(thread, contactName) {
    appTitle.innerText = contactName;
    appContent.innerHTML = '';
    
    thread.forEach(msg => {
        const bubble = document.createElement('div');
        bubble.className = `bubble ${msg.type} ${msg.isClue ? 'is-clue' : ''}`;
        
        // تلوين الدليل إذا تم اكتشافه مسبقاً
        if (msg.isClue && gameState.collectedEvidence.includes(msg.clueId)) {
            bubble.classList.add('found');
        }

        bubble.innerHTML = `${msg.text} <div style="font-size:10px; margin-top:5px; opacity:0.6;">${msg.time}</div>`;
        
        if (msg.isClue) {
            bubble.onclick = () => collectEvidence(msg.clueId, msg.clueDesc, bubble);
        }
        
        appContent.appendChild(bubble);
    });
}

function renderNotes(caseData) {
    caseData.appsData.notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-item';
        noteDiv.innerHTML = `<h3>${note.title}</h3><hr style="border-color:#rgba(0,0,0,0.1); margin:10px 0;"><p>${note.text.replace(/\n/g, '<br>')}</p>`;
        appContent.appendChild(noteDiv);
    });
}

function renderFiles(caseData) {
    caseData.appsData.files.forEach(file => {
        const fileDiv = document.createElement('div');
        fileDiv.className = `file-item ${file.type === 'locked' ? 'locked' : ''}`;
        fileDiv.innerHTML = `
            <div class="file-icon">${file.type === 'locked' ? '🔒' : '📄'}</div>
            <div style="flex-grow:1;">
                <h4>${file.name}</h4>
                <p style="font-size:12px; color:#aaa;">${file.type === 'locked' ? 'محمي بكلمة مرور' : 'انقر للفتح'}</p>
            </div>
        `;

        fileDiv.onclick = () => {
            if (file.type === 'locked') {
                const pass = prompt('أدخل كلمة المرور (4 أرقام):');
                if (pass === file.password) {
                    alert('تم فتح الملف بنجاح!');
                    file.type = 'open'; // نفتح الملف محلياً في الذاكرة
                    renderFiles(caseData); // إعادة الرسم
                    
                    if (file.isClue) {
                        collectEvidence(file.clueId, file.clueDesc, null);
                    }
                } else if (pass !== null) {
                    alert('كلمة المرور خاطئة!');
                }
            } else {
                alert(file.content);
            }
        };
        appContent.appendChild(fileDiv);
    });
}

function renderCalls(caseData) {
    caseData.appsData.calls.forEach(call => {
        const callDiv = document.createElement('div');
        callDiv.className = 'chat-contact'; // إعادة استخدام الستايل
        callDiv.innerHTML = `
            <div class="chat-avatar" style="background: ${call.type === 'missed' ? '#ef4444' : '#10b981'}">
                ${call.type === 'missed' ? '❌' : '📞'}
            </div>
            <div style="flex-grow:1;">
                <h4>${call.name}</h4>
                <p style="font-size:12px; color:#aaa;">${call.time} | المدة: ${call.duration}</p>
            </div>
        `;
        appContent.appendChild(callDiv);
    });
}

function renderBrowser(caseData) {
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    caseData.appsData.browser.forEach(site => {
        const li = document.createElement('li');
        li.style.padding = '15px';
        li.style.background = '#222';
        li.style.marginBottom = '10px';
        li.style.borderRadius = '8px';
        li.innerHTML = `<h4 style="color:var(--accent);">${site.title}</h4><p style="font-size:12px; color:#aaa;">${site.url}</p>`;
        list.appendChild(li);
    });
    appContent.appendChild(list);
}

function renderEvidenceBoard() {
    if (gameState.collectedEvidence.length === 0) {
        appContent.innerHTML = '<p style="text-align:center; margin-top:50px; color:#888;">لم تقم بجمع أي أدلة بعد. ابحث جيداً في التطبيقات.</p>';
        return;
    }

    gameState.collectedEvidence.forEach(evId => {
        // البحث عن وصف الدليل من الـ State (تخزين مبسط للاسم)
        const evDiv = document.createElement('div');
        evDiv.className = 'evidence-item';
        evDiv.innerHTML = `<h4>دليل مكتشف 🔍</h4><p style="font-size:14px; margin-top:5px;">رمز الدليل: ${evId}</p>`;
        appContent.appendChild(evDiv);
    });
}

function renderAnalysis(caseData) {
    appContent.innerHTML = '<p style="margin-bottom:20px; font-size:14px;">من هو المسؤول عن اختفاء أحمد؟ (احذر: القرار نهائي!)</p>';
    
    caseData.suspects.forEach(suspect => {
        const btn = document.createElement('button');
        btn.className = 'suspect-btn';
        btn.innerText = suspect.name;
        btn.onclick = () => makeAccusation(suspect.id, caseData);
        appContent.appendChild(btn);
    });
}

// --- أنظمة اللعب (Gameplay Systems) ---

// جمع الأدلة
function collectEvidence(clueId, desc, element) {
    if (!gameState.collectedEvidence.includes(clueId)) {
        gameState.collectedEvidence.push(clueId);
        gameState.xp += 50;
        
        // ترقية المستوى
        if (gameState.xp >= 100) {
            gameState.level++;
            gameState.xp = 0;
            document.getElementById('player-level').innerText = gameState.level;
        }
        
        document.getElementById('player-xp').innerText = gameState.xp;
        saveProgress();

        if (element) {
            element.classList.add('found');
        }

        showNotification(desc);
    }
}

// إظهار إشعار الدليل
function showNotification(text) {
    const notif = document.getElementById('notification');
    document.getElementById('notif-desc').innerText = text;
    
    notif.classList.remove('hidden');
    notif.classList.add('show');

    // اهتزاز الهاتف (إذا كان مدعوماً في المتصفح)
    if (navigator.vibrate) navigator.vibrate(200);

    setTimeout(() => {
        notif.classList.remove('show');
    }, 4000);
}

// اتخاذ القرار وإنهاء القضية
function makeAccusation(suspectId, caseData) {
    const confirmAction = confirm('هل أنت متأكد من اتهام هذا الشخص؟');
    if (!confirmAction) return;

    const modal = document.getElementById('ending-modal');
    const titleObj = document.getElementById('ending-title');
    const descObj = document.getElementById('ending-desc');

    let endingType = 'mystery';

    if (suspectId === 'boss') {
        // التحقق من الأدلة الكافية
        const required = caseData.requiredEvidenceForPerfect;
        const hasAllEvidence = required.every(ev => gameState.collectedEvidence.includes(ev));
        
        if (hasAllEvidence) {
            endingType = 'perfect';
        } else {
            endingType = 'partial';
        }
    } else {
        endingType = 'wrong';
    }

    const finalEnding = caseData.endings[endingType];
    
    titleObj.innerText = finalEnding.title;
    titleObj.style.color = endingType === 'perfect' ? 'var(--success)' : (endingType === 'wrong' ? 'var(--danger)' : 'var(--accent)');
    descObj.innerText = finalEnding.text;

    modal.classList.remove('hidden');
}

// إعادة اللعبة
document.getElementById('restart-btn').addEventListener('click', () => {
    // تصفير التقدم
    gameState.collectedEvidence = [];
    saveProgress();
    window.location.reload();
});

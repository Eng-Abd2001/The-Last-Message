/**
 * The Last Argument - Mobile Logic
 * Optimized interactions and evidence chips mapping.
 */

// --- Game Data ---
const ALL_CASES = [
    {
        id: 1, title: "قضية الساعة", description: "سُرقت ساعة ذهبية، الشاهد يزعم هروب اللص من النافذة.", accused: "أحمد الموظف", victim: "المدير العام", location: "مكتب الإدارة",
        spots: [
            { id: "s1", x: 25, y: 35, ev: { id: "e1_1", name: "زجاج مكسور", desc: "زجاج متناثر بالخارج، الكسر تم من الداخل.", strength: "strong" } },
            { id: "s2", x: 65, y: 55, ev: { id: "e1_2", name: "إيصال", desc: "إيصال بتاريخ الجريمة للمتهم.", strength: "weak" } },
            { id: "s3", x: 85, y: 75, ev: { id: "e1_3", name: "قفل", desc: "الباب لم يُكسر.", strength: "weak" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الشاهد، ماذا رأيت؟" },
            { speaker: "witness", text: "رأيت المتهم يقفز من النافذة المحطمة من الخارج ليهرب." },
            { speaker: "action", type: "present", correctEv: "e1_1", failMsg: "هذا لا يثبت كذب الشاهد!", successMsg: "الزجاج بالخارج! النافذة كُسرت من الداخل، شهادتك ملفقة!" }
        ],
        finalArgument: { text: "من هو الجاني الحقيقي؟", options: [ { text: "المتهم كسرها من الداخل.", correct: false, resultText: "سُجن بريء." }, { text: "الشاهد اختلق القصة.", correct: true, resultText: "الشاهد هو السارق." } ] }
    },
    {
        id: 2, title: "سم الفنجان", description: "تسمم في المختبر، الضحية فقط من سقط رغم أن القهوة مشتركة.", accused: "مساعد المختبر", victim: "د. سامي", location: "المختبر",
        spots: [
            { id: "s1", x: 75, y: 25, ev: { id: "e2_1", name: "آلة قهوة", desc: "القهوة المركزية سليمة تماماً.", strength: "weak" } },
            { id: "s2", x: 35, y: 65, ev: { id: "e2_2", name: "الكوب", desc: "نظيف من الخارج وفيه سم بالداخل.", strength: "strong" } },
            { id: "s3", x: 15, y: 35, ev: { id: "e2_3", name: "دواء سكر", desc: "محليات خاصة بالضحية ملوثة بالسم.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "كيف تم التسميم إذا كانت القهوة سليمة؟" },
            { speaker: "witness", text: "المتهم وضع السم في الكوب مباشرة." },
            { speaker: "action", type: "present", correctEv: "e2_3", failMsg: "هذا لا يفسر طريقة التسميم החصرية.", successMsg: "السم كان في المحليات الخاصة بالضحية وليس الكوب مباشرة!" }
        ],
        finalArgument: { text: "من بدل الدواء؟", options: [ { text: "الضحية بالخطأ.", correct: false, resultText: "أُغلقت كحادث وأفلت الجاني." }, { text: "الصيدلي المسؤول.", correct: true, resultText: "تم القبض على الصيدلي." } ] }
    },
    {
        id: 3, title: "الغرفة المغلقة", description: "جثة بغرفة مغلقة من الداخل بالكامل.", accused: "صاحب الفندق", victim: "نزيل", location: "غرفة 404",
        spots: [
            { id: "s1", x: 50, y: 75, ev: { id: "e3_1", name: "قفل", desc: "يمكن قفله بخيط من الخارج.", strength: "strong" } },
            { id: "s2", x: 25, y: 35, ev: { id: "e3_2", name: "نافذة", desc: "مغلقة بالغبار منذ شهور.", strength: "weak" } },
            { id: "s3", x: 75, y: 65, ev: { id: "e3_3", name: "خيط", desc: "خيط صيد تحت الباب.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "يُعتقد أنه انتحار فالغرفة مغلقة من الداخل." },
            { speaker: "witness", text: "نعم، الباب كان مقفلاً والمفتاح بجيب الضحية." },
            { speaker: "action", type: "present", correctEv: "e3_3", failMsg: "دليل غير مقنع للباب المغلق.", successMsg: "الجاني سحب المفتاح بالخيط لقفل الباب من الخارج!" }
        ],
        finalArgument: { text: "كيف نثبت تورط صاحب الفندق؟", options: [ { text: "نسخة مفاتيح أخرى.", correct: false, resultText: "حجة تتناقض مع دليل الخيط." }, { text: "يمتلك خيوط الصيد لكونه صياداً.", correct: true, resultText: "تم الإيقاع به." } ] }
    },
    {
        id: 4, title: "الوصية المزيفة", description: "نزاع حول وصية بخط اليد.", accused: "الابن الأصغر", victim: "الأب", location: "القصر",
        spots: [
            { id: "s1", x: 45, y: 45, ev: { id: "e4_1", name: "الوصية", desc: "مكتوبة قبل 5 سنوات.", strength: "strong" } },
            { id: "s2", x: 65, y: 65, ev: { id: "e4_2", name: "قلم", desc: "حبر سائل أسود.", strength: "weak" } },
            { id: "s3", x: 80, y: 25, ev: { id: "e4_3", name: "تقرير", desc: "الضحية شُلت يده اليمنى قبل 6 سنوات.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الوصية كُتبت قبل 5 سنوات." },
            { speaker: "witness", text: "رأيته يكتبها بيده اليمنى شخصياً." },
            { speaker: "action", type: "present", correctEv: "e4_3", failMsg: "لا ينفي صحة الكتابة.", successMsg: "الضحية كان مشلول اليد اليمنى حينها!" }
        ],
        finalArgument: { text: "من زوّرها؟", options: [ { text: "المحامي الشاهد.", correct: true, resultText: "تم كشف التزوير." }, { text: "الابن الأصغر.", correct: false, resultText: "لا يجيد تقليد الخط." } ] }
    },
    {
        id: 5, title: "حادث الليل", description: "هروب بعد دهس بسيارة حمراء.", accused: "سائق متهور", victim: "عابر سبيل", location: "الشارع",
        spots: [
            { id: "s1", x: 35, y: 75, ev: { id: "e5_1", name: "طلاء", desc: "آثار طلاء أحمر بالشارع.", strength: "strong" } },
            { id: "s2", x: 75, y: 45, ev: { id: "e5_2", name: "صدمة", desc: "سيارة المتهم بها صدمة أمامية.", strength: "weak" } },
            { id: "s3", x: 55, y: 25, ev: { id: "e5_3", name: "كاميرا", desc: "السيارة الهاربة مصابيحها سليمة.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "سيارته حمراء وبها صدمة." },
            { speaker: "witness", text: "رأيت سيارته تصدم العابر ومصباحه تحطم." },
            { speaker: "action", type: "present", correctEv: "e5_3", failMsg: "لا يبرئ المتهم.", successMsg: "الكاميرا تثبت أن مصابيح السيارة الهاربة كانت سليمة!" }
        ],
        finalArgument: { text: "الصدمة بسيارة المتهم؟", options: [ { text: "صدمة قديمة.", correct: true, resultText: "تمت تبرئته." }, { text: "حطمها هو لاحقاً.", correct: false, resultText: "غير منطقي." } ] }
    },
    {
        id: 6, title: "الاختراق", description: "سرقة بيانات بحساب المبرمج.", accused: "علي", victim: "الشركة", location: "السيرفرات",
        spots: [
            { id: "s1", x: 50, y: 55, ev: { id: "e6_1", name: "السجل", desc: "تم الاختراق الساعة 2 صباحاً.", strength: "strong" } },
            { id: "s2", x: 85, y: 85, ev: { id: "e6_2", name: "البوابة", desc: "غادر المتهم الساعة 8 مساءً.", strength: "weak" } },
            { id: "s3", x: 25, y: 25, ev: { id: "e6_3", name: "الشبكة", desc: "الاختراق من الشبكة الداخلية حصراً.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "سُرقت البيانات بحسابه." },
            { speaker: "witness", text: "اخترقها من منزله عن بعد." },
            { speaker: "action", type: "present", correctEv: "e6_3", failMsg: "لم تنفِ التهمة.", successMsg: "الشبكة داخلية والمتهم لم يكن بالمبنى!" }
        ],
        finalArgument: { text: "الفاعل؟", options: [ { text: "المدير الفني.", correct: true, resultText: "استخدم حاسوبه بالداخل." }, { text: "فايروس.", correct: false, resultText: "خطأ." } ] }
    },
    {
        id: 7, title: "اللوحة", description: "سرقة لوحة وتوريط الحارس.", accused: "حارس", victim: "المتحف", location: "القاعة",
        spots: [
            { id: "s1", x: 50, y: 35, ev: { id: "e7_1", name: "إطار", desc: "مقطوع بآلة.", strength: "weak" } },
            { id: "s2", x: 25, y: 75, ev: { id: "e7_2", name: "إنذار", desc: "عُطل الساعة 11 م.", strength: "strong" } },
            { id: "s3", x: 85, y: 55, ev: { id: "e7_3", name: "وردية", desc: "وردية الحارس بدأت الساعة 12 ص.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الإنذار معطل والحارس مناوب." },
            { speaker: "witness", text: "سرقها منتصف الليل وعطل الإنذار." },
            { speaker: "action", type: "present", correctEv: "e7_2", failMsg: "غير كافٍ.", successMsg: "الإنذار عُطل قبل ورديته بساعة!" }
        ],
        finalArgument: { text: "المسؤول؟", options: [ { text: "المدير.", correct: true, resultText: "احتيال على التأمين." }, { text: "لص.", correct: false, resultText: "كيف عرف الرمز؟" } ] }
    },
    {
        id: 8, title: "المسرح", description: "مسدس حقيقي بالخطأ؟", accused: "البديل", victim: "البطل", location: "المسرح",
        spots: [
            { id: "s1", x: 50, y: 55, ev: { id: "e8_1", name: "المسدس", desc: "ثقيل وبرصاص حي.", strength: "strong" } },
            { id: "s2", x: 25, y: 45, ev: { id: "e8_2", name: "مزيف", desc: "خفيف وبلاستيك.", strength: "weak" } },
            { id: "s3", x: 80, y: 25, ev: { id: "e8_3", name: "فيديو", desc: "يتذمر من ثقل المسدس فجأة.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "المتهم ضغط الزناد." },
            { speaker: "witness", text: "كان يعلم أنه حقيقي وتعمد ذلك." },
            { speaker: "action", type: "present", correctEv: "e8_3", failMsg: "غير مقنع.", successMsg: "الفيديو يثبت تفاجؤه من الوزن!" }
        ],
        finalArgument: { text: "من بدله؟", options: [ { text: "الإكسسوارات.", correct: true, resultText: "المدير متورط." }, { text: "المخرج.", correct: false, resultText: "لا دافع." } ] }
    },
    {
        id: 9, title: "التوأم", description: "شهود يؤكدون رؤيته.", accused: "كريم الأعسر", victim: "المحل", location: "السوق",
        spots: [
            { id: "s1", x: 45, y: 65, ev: { id: "e9_1", name: "بصمات", desc: "بصمات يد يمنى فقط.", strength: "strong" } },
            { id: "s2", x: 75, y: 45, ev: { id: "e9_2", name: "الخزنة", desc: "لفت بقوة باليمنى.", strength: "strong" } },
            { id: "s3", x: 25, y: 85, ev: { id: "e9_3", name: "طبي", desc: "المتهم أعسر حصراً.", strength: "weak" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الشاهد رآك." },
            { speaker: "witness", text: "رأيته يكسرها بيده اليمنى." },
            { speaker: "action", type: "present", correctEv: "e9_3", failMsg: "البصمات لا تكفي.", successMsg: "المتهم أعسر، والسرقة باليمنى!" }
        ],
        finalArgument: { text: "من السارق؟", options: [ { text: "شبيه.", correct: false, resultText: "ضعيف." }, { text: "توأمه الأيمن.", correct: true, resultText: "تم القبض عليه." } ] }
    },
    {
        id: 10, title: "الفساد", description: "تهمة ملفقة.", accused: "صحفي", victim: "عمدة", location: "مكتبه",
        spots: [
            { id: "s1", x: 55, y: 55, ev: { id: "e10_1", name: "ظرف", desc: "فارغ لختم بنك أجنبي.", strength: "weak" } },
            { id: "s2", x: 35, y: 35, ev: { id: "e10_2", name: "تسجيل", desc: "العمدة يطلب رشوة.", strength: "strong" } },
            { id: "s3", x: 85, y: 85, ev: { id: "e10_3", name: "تذكرة", desc: "سفر للعمدة غداً.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "أنت متهم بتلفيق تهمة للعمدة." },
            { speaker: "witness", text: "لم أطلب أموالاً." },
            { speaker: "action", type: "present", correctEv: "e10_2", failMsg: "غير كافٍ.", successMsg: "لدي تسجيل صوتي يطلب فيه الرشوة!" }
        ],
        finalArgument: { text: "الكلمة الأخيرة", options: [ { text: "إبراز تذكرة هربه.", correct: true, resultText: "اعترف وطُهرت المدينة." }, { text: "توسل.", correct: false, resultText: "سُجنت." } ] }
    }
];

const ACHIEVEMENTS_DATA = [
    { id: "novice", title: "المبتدئ", desc: "حل أول قضية." },
    { id: "genius", title: "العبقري", desc: "جمع كل أدلة القضية." },
    { id: "flawless", title: "المحترف", desc: "كسب قضية بلا أخطاء." },
    { id: "legend", title: "الأسطورة", desc: "أنهى اللعبة." }
];

let state = {
    unlockedCases: 1, solvedCases: [], stats: { wins: 0, losses: 0, perfectCases: 0 }, achievements: [],
    currentCaseId: null, inventory: [], judgeConfidence: 100, courtStepIndex: 0, attemptsLeft: 3, perfectCurrentCase: true, isProcessingLogic: false
};
let finalTimerInterval = null;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let soundEnabled = true;

function playTone(freq, type, duration, vol) {
    if(!soundEnabled || audioCtx.state === 'suspended') return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type; osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + duration);
    } catch(e) {}
}

function playSound(type) {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    switch(type) {
        case 'click': playTone(500, 'sine', 0.1, 0.05); break;
        case 'evidence': playTone(700, 'sine', 0.15, 0.1); break;
        case 'success': playTone(523, 'triangle', 0.15, 0.1); setTimeout(()=>playTone(659, 'triangle', 0.15, 0.1), 150); break;
        case 'fail': playTone(150, 'sawtooth', 0.3, 0.15); break;
        case 'objection': playTone(800, 'square', 0.1, 0.2); break;
    }
}

document.getElementById('sound-toggle').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('sound-toggle');
    btn.innerHTML = soundEnabled ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>` : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
});

function saveGame() {
    try { localStorage.setItem('lastArgumentSave_Mobile', JSON.stringify({ unlockedCases: state.unlockedCases, solvedCases: state.solvedCases, stats: state.stats, achievements: state.achievements })); } catch(e) {}
}
function loadGame() {
    try {
        const saved = localStorage.getItem('lastArgumentSave_Mobile');
        if(saved) {
            const p = JSON.parse(saved);
            state.unlockedCases = p.unlockedCases || 1; state.solvedCases = p.solvedCases || []; state.stats = p.stats || { wins: 0, losses: 0, perfectCases: 0 }; state.achievements = p.achievements || [];
        }
    } catch(e) {}
}

function showScreen(id) {
    playSound('click');
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'cases-screen') renderCases();
    if(id === 'stats-screen') renderStats();
}

function showToast(msg, isError = false) {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = 'toast'; t.style.borderLeftColor = isError ? "var(--danger)" : "var(--gold)"; t.innerText = msg;
    container.appendChild(t);
    setTimeout(() => { t.style.animation = "slideDown 0.3s ease reverse forwards"; setTimeout(() => t.remove(), 300); }, 2500);
}

function grantAchievement(id) {
    if(state.achievements.includes(id)) return;
    state.achievements.push(id); saveGame(); playSound('success');
    const ach = ACHIEVEMENTS_DATA.find(a => a.id === id);
    const container = document.getElementById('achievement-container');
    const t = document.createElement('div');
    t.className = 'achievement-toast';
    t.innerHTML = `<div style="font-size:1.8rem;">🏆</div><div class="ach-text"><h4>إنجاز: ${ach.title}</h4><p>${ach.desc}</p></div>`;
    container.appendChild(t);
    setTimeout(() => { t.style.animation = "slideUp 0.4s ease reverse forwards"; setTimeout(() => t.remove(), 400); }, 3500);
}

function startGame() {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    showScreen('cases-screen');
}

function renderCases() {
    const container = document.getElementById('cases-container');
    container.innerHTML = '';
    ALL_CASES.forEach(c => {
        const isLocked = c.id > state.unlockedCases;
        const isSolved = state.solvedCases.includes(c.id);
        const card = document.createElement('div');
        card.className = `case-card ${isLocked ? 'locked' : ''}`;
        card.innerHTML = `<h3>القضية ${c.id}: ${c.title}</h3><p>${isLocked ? '🔒 مغلق' : c.description}</p>${isSolved ? '<span class="case-status">✓ محسومة</span>' : ''}`;
        if(!isLocked) card.onclick = () => startInvestigation(c.id);
        container.appendChild(card);
    });
}

function startInvestigation(caseId) {
    state.currentCaseId = caseId; state.inventory = []; state.perfectCurrentCase = true;
    const c = ALL_CASES.find(x => x.id === caseId);
    document.getElementById('inv-case-title').innerText = c.title;
    document.getElementById('to-court-btn').classList.add('hidden');
    updateInventoryUI();
    const area = document.getElementById('investigation-area');
    area.innerHTML = '';
    c.spots.forEach((spot, i) => {
        const el = document.createElement('div');
        el.className = 'spot-marker'; el.style.left = `${spot.x}%`; el.style.top = `${spot.y}%`; el.innerText = i + 1;
        el.onclick = () => collectEvidence(spot, el);
        area.appendChild(el);
    });
    showScreen('investigation-screen');
}

function collectEvidence(spot, el) {
    if(el.classList.contains('investigated')) return;
    playSound('evidence'); el.classList.add('investigated');
    state.inventory.push(spot.ev); updateInventoryUI();
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    if(state.inventory.length === c.spots.length) {
        document.getElementById('to-court-btn').classList.remove('hidden');
        showToast("اكتملت الأدلة!"); grantAchievement('genius');
    }
}

function updateInventoryUI() {
    document.getElementById('ev-count').innerText = state.inventory.length;
    const tray = document.getElementById('evidence-tray');
    tray.innerHTML = '';
    state.inventory.forEach(ev => {
        const div = document.createElement('div'); div.className = 'evidence-item';
        div.innerHTML = `<h4>${ev.name}</h4><p>${ev.desc}</p>`;
        tray.appendChild(div);
    });
}

function openFileModal() {
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    document.getElementById('modal-case-title').innerText = c.title;
    document.getElementById('modal-case-body').innerHTML = `<p>المتهم: <strong>${c.accused}</strong></p><p>الضحية: <strong>${c.victim}</strong></p><hr><p>${c.description}</p>`;
    document.getElementById('file-modal').style.display = 'flex';
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function goToCourt() {
    state.judgeConfidence = 100; state.courtStepIndex = 0; state.attemptsLeft = 3; state.isProcessingLogic = false;
    document.getElementById('dialogue-box').innerHTML = '';
    updateCourtUI(); renderCourtEvidence(); showScreen('court-screen'); processCourtDialogue();
}

function updateCourtUI() {
    document.getElementById('confidence-fill').style.width = `${state.judgeConfidence}%`;
    document.getElementById('confidence-fill').style.backgroundColor = state.judgeConfidence > 50 ? 'var(--success)' : 'var(--danger)';
    document.getElementById('court-attempts').innerText = state.attemptsLeft;
}

function renderCourtEvidence() {
    const tray = document.getElementById('court-evidence-tray');
    tray.innerHTML = '';
    state.inventory.forEach(ev => {
        const div = document.createElement('div'); div.className = 'ev-chip';
        div.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> ${ev.name}`;
        div.onclick = () => presentEvidence(ev);
        tray.appendChild(div);
    });
}

function appendChat(speakerClass, name, text) {
    const box = document.getElementById('dialogue-box');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${speakerClass}`;
    bubble.innerHTML = `<span class="speaker-name">${name}</span>${text}`;
    box.appendChild(bubble); box.scrollTop = box.scrollHeight;
}

function processCourtDialogue() {
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    const step = c.courtScript[state.courtStepIndex];
    const nextBtn = document.getElementById('next-dialogue-btn');
    const presentAction = document.getElementById('court-present-action');
    
    if(!step) { startFinalArgument(); return; }
    state.isProcessingLogic = false;
    if(step.type === 'present') {
        nextBtn.classList.add('hidden'); presentAction.classList.remove('hidden');
        appendChat('judge', 'القاضي', 'هل لديك دليل يكشف التناقض؟');
    } else {
        nextBtn.classList.remove('hidden'); presentAction.classList.add('hidden');
        const isJudge = step.speaker === 'judge';
        appendChat(isJudge ? 'judge' : 'witness', isJudge ? 'القاضي' : 'الشاهد', step.text);
        playSound('click');
    }
}

function nextCourtStep() {
    if(state.isProcessingLogic) return; state.isProcessingLogic = true;
    state.courtStepIndex++; processCourtDialogue();
}

function presentEvidence(ev) {
    if(state.isProcessingLogic) return; state.isProcessingLogic = true;
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    const step = c.courtScript[state.courtStepIndex];
    document.getElementById('court-present-action').classList.add('hidden');
    
    if(ev.id === step.correctEv) {
        playSound('objection'); appendChat('lawyer', 'أنت', `اعتراض! "${ev.name}": ${step.successMsg}`);
        setTimeout(() => { state.courtStepIndex++; processCourtDialogue(); }, 2500);
    } else {
        playSound('fail'); state.perfectCurrentCase = false; state.attemptsLeft--; state.judgeConfidence -= 34; updateCourtUI();
        appendChat('lawyer', 'أنت', `انظر إلى "${ev.name}"...`);
        setTimeout(() => {
            document.getElementById('dialogue-box').classList.add('shake-anim'); setTimeout(()=>document.getElementById('dialogue-box').classList.remove('shake-anim'), 400);
            appendChat('error', 'القاضي', step.failMsg);
            if(state.attemptsLeft <= 0) setTimeout(() => finishCase(false, "تم طردك من القاعة."), 2000);
            else setTimeout(() => { document.getElementById('court-present-action').classList.remove('hidden'); state.isProcessingLogic = false; }, 1500);
        }, 1000);
    }
}

function startFinalArgument() {
    if(finalTimerInterval) clearInterval(finalTimerInterval);
    playSound('objection'); const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    showScreen('final-argument-screen');
    const container = document.getElementById('argument-options'); container.innerHTML = '';
    c.finalArgument.options.forEach(opt => {
        const btn = document.createElement('button'); btn.className = 'arg-btn'; btn.innerText = opt.text;
        btn.onclick = () => { btn.disabled = true; if(finalTimerInterval) clearInterval(finalTimerInterval); finishCase(opt.correct, opt.resultText); };
        container.appendChild(btn);
    });
    let time = 30; const timerEl = document.getElementById('final-timer'); timerEl.innerText = time; timerEl.className = 'gold-text';
    finalTimerInterval = setInterval(() => {
        time--; timerEl.innerText = time;
        if(time <= 10) timerEl.className = 'alert-text'; if(time <= 5) playSound('click');
        if(time <= 0) { clearInterval(finalTimerInterval); finishCase(false, "انتهى الوقت!"); }
    }, 1000);
}

function finishCase(isWin, desc) {
    if(isWin) {
        playSound('success'); state.stats.wins++;
        if(!state.solvedCases.includes(state.currentCaseId)) {
            state.solvedCases.push(state.currentCaseId);
            if(state.unlockedCases === state.currentCaseId && state.unlockedCases < ALL_CASES.length) state.unlockedCases++;
        }
        grantAchievement('novice'); if(state.perfectCurrentCase) { state.stats.perfectCases++; grantAchievement('flawless'); }
        if(state.solvedCases.length === ALL_CASES.length) grantAchievement('legend');
    } else { playSound('fail'); state.stats.losses++; }
    saveGame();
    
    document.getElementById('result-title').innerText = isWin ? "براءة - محسومة" : "خسارة";
    document.getElementById('result-title').style.color = isWin ? "var(--success)" : "var(--danger)";
    document.getElementById('result-icon-container').innerHTML = isWin ? `<svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` : `<svg viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    document.getElementById('result-icon-container').style.borderColor = isWin ? "var(--success)" : "var(--danger)";
    document.getElementById('result-desc').innerText = desc;
    document.getElementById('result-stats-details').innerHTML = `<p>القضايا: <strong>${state.solvedCases.length}/${ALL_CASES.length}</strong></p><p>الأداء: <strong style="color:${isWin?'var(--success)':'var(--danger)'}">${state.perfectCurrentCase && isWin ? 'مثالي ⭐⭐⭐' : (isWin ? 'جيد ⭐⭐' : 'سيء ❌')}</strong></p>`;
    showScreen('result-screen');
}

function renderStats() {
    document.getElementById('stats-grid').innerHTML = `<div class="stat-box"><h3>${state.stats.wins}</h3><p>نجاح</p></div><div class="stat-box"><h3>${state.stats.losses}</h3><p>خسارة</p></div><div class="stat-box"><h3>${state.stats.perfectCases}</h3><p>مثالية</p></div><div class="stat-box"><h3>${Math.round((state.solvedCases.length / ALL_CASES.length) * 100)}%</h3><p>إنجاز</p></div>`;
    const achList = document.getElementById('achievements-list'); achList.innerHTML = '';
    ACHIEVEMENTS_DATA.forEach(a => {
        const unlocked = state.achievements.includes(a.id);
        achList.innerHTML += `<div class="ach-item ${unlocked ? 'unlocked' : ''}"><div class="ach-icon">🏆</div><div><h4 style="color:${unlocked?'var(--gold)':'#777'};">${a.title}</h4><p>${unlocked ? a.desc : '؟؟؟'}</p></div></div>`;
    });
    if(!navigator.share) document.getElementById('share-btn').style.display = 'none';
}

function shareStats() {
    if(navigator.share) navigator.share({ title: 'المحامي الأخير', text: `حليت ${state.solvedCases.length} قضايا في المحامي الأخير!`, url: window.location.href }).catch(()=>{});
}

window.onload = () => {
    loadGame();
    document.addEventListener('touchmove', function(e) { if(!e.target.closest('.scrollable-content') && !e.target.closest('.evidence-tray') && !e.target.closest('.modal-content')) e.preventDefault(); }, { passive: false });
};

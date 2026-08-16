/**
 * The Last Argument - Core Logic & Visuals Setup
 * Refactored to include programmatic graphic shapes and optimized interactions.
 */

// --- Game Data ---
const ALL_CASES = [
    {
        id: 1, title: "قضية الساعة المسروقة", description: "سُرقت ساعة ذهبية ثمينة من مكتب الضحية. الشاهد يدعي أنه رأى المتهم يهرب من النافذة.", accused: "أحمد (الموظف)", victim: "السيد محمود (المدير)", location: "مكتب الإدارة",
        spots: [
            { id: "s1", x: 25, y: 35, ev: { id: "e1_1", name: "زجاج مكسور", desc: "شظايا الزجاج متناثرة خارج المكتب، مما يعني أن الكسر تم من الداخل.", strength: "strong" } },
            { id: "s2", x: 65, y: 55, ev: { id: "e1_2", name: "إيصال قهوة", desc: "إيصال بتاريخ وقت الجريمة يحمل اسم المتهم.", strength: "weak" } },
            { id: "s3", x: 85, y: 75, ev: { id: "e1_3", name: "قفل سليم", desc: "الباب لم يُكسر.", strength: "weak" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الشاهد، أخبرنا ماذا رأيت ليلة الأمس بالتفصيل." },
            { speaker: "witness", text: "رأيت المتهم يقفز من النافذة المحطمة من الخارج ليهرب بالغنيمة الثمينة." },
            { speaker: "action", type: "present", correctEv: "e1_1", failMsg: "هذا الدليل لا يثبت كذب الشاهد بشأن اتجاه الكسر!", successMsg: "الزجاج متناثر بالخارج! هذا يعني أن النافذة كُسرت من الداخل، شهادتك ملفقة!" }
        ],
        finalArgument: { text: "استناداً لتناقض الشاهد، من هو الجاني الحقيقي؟", options: [ { text: "أحمد المتهم هو من كسرها من الداخل.", correct: false, resultText: "لقد أرسلت رجلاً بريئاً للسجن." }, { text: "الشاهد كسرها من الداخل واختلق القصة.", correct: true, resultText: "أحسنت! الشاهد هو السارق الحقيقي." } ] }
    },
    {
        id: 2, title: "السم في الفنجان", description: "تسمم كيميائي في المختبر. الجميع شربوا نفس القهوة ولكن الضحية فقط هو من سقط.", accused: "مساعد المختبر", victim: "د. سامي", location: "المختبر الكيميائي",
        spots: [
            { id: "s1", x: 75, y: 25, ev: { id: "e2_1", name: "بقايا القهوة", desc: "القهوة في الآلة سليمة ولا تحتوي على سم.", strength: "weak" } },
            { id: "s2", x: 35, y: 65, ev: { id: "e2_2", name: "كوب الضحية", desc: "الكوب نظيف من الخارج ولكنه يحتوي على آثار سم بالداخل.", strength: "strong" } },
            { id: "s3", x: 15, y: 35, ev: { id: "e2_3", name: "دواء السكر", desc: "علبة محليات صناعية تخص الضحية ملوثة بالسم.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "كيف تم تسميم الضحية إذا كانت القهوة المركزية سليمة؟" },
            { speaker: "witness", text: "لابد أن المتهم وضع السم في كوب الضحية أثناء صب القهوة له مباشرة." },
            { speaker: "action", type: "present", correctEv: "e2_3", failMsg: "هذا الدليل لا يفسر طريقة التسميم الحصرية للضحية.", successMsg: "السم لم يكن في الكوب مباشرة، بل في محليات السكر الخاصة بالضحية!" }
        ],
        finalArgument: { text: "من كان يملك القدرة على تبديل دواء السكر؟", options: [ { text: "الضحية نفسه بالخطأ.", correct: false, resultText: "استنتاج ضعيف، القضية أُغلقت كحادث عرضي وأفلت الجاني." }, { text: "صيدلي المختبر الذي يصرف الدواء.", correct: true, resultText: "تم القبض على الصيدلي. مرافعة ممتازة!" } ] }
    },
    {
        id: 3, title: "الغرفة المغلقة", description: "وجدت الضحية في غرفة مغلقة من الداخل بالكامل والمفتاح في جيبه.", accused: "صاحب الفندق", victim: "نزيل غريب", location: "غرفة الفندق 404",
        spots: [
            { id: "s1", x: 50, y: 75, ev: { id: "e3_1", name: "قفل الباب", desc: "قفل قديم يمكن إغلاقه من الخارج باستخدام خيط يسحب المفتاح.", strength: "strong" } },
            { id: "s2", x: 25, y: 35, ev: { id: "e3_2", name: "غبار كثيف", desc: "النافذة لم تفتح منذ شهور طويلة.", strength: "weak" } },
            { id: "s3", x: 75, y: 65, ev: { id: "e3_3", name: "خيط رفيع", desc: "قطعة من خيط صيد قوي وجدت تحت عقب الباب.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الادعاء يقول إنها حالة انتحار لأن الغرفة مغلقة من الداخل بالكامل." },
            { speaker: "witness", text: "نعم سيدي، الباب كان مقفلاً بإحكام والمفتاح في جيب الضحية." },
            { speaker: "action", type: "present", correctEv: "e3_3", failMsg: "الدليل الذي قدمته لا يفسر كيف تم إغلاق الباب من الخارج.", successMsg: "الجاني استخدم هذا الخيط لسحب المفتاح وقفل الباب من الخارج لإيهامنا بالانتحار!" }
        ],
        finalArgument: { text: "كيف تثبت تورط صاحب الفندق في هذه الخدعة؟", options: [ { text: "يمتلك نسخة مفاتيح أخرى.", correct: false, resultText: "لقد أثبت للتو أن المفتاح الأساسي استُخدم بالخيط! حجة متناقضة." }, { text: "هو الوحيد الذي يمتلك خيوط الصيد في الفندق لكونه صياداً محترفاً.", correct: true, resultText: "دقة ملاحظة مذهلة! تم الإيقاع بالقاتل." } ] }
    },
    {
        id: 4, title: "الوصية المزيفة", description: "نزاع حول وصية مليونير مكتوبة بخط اليد.", accused: "الابن الأصغر", victim: "الأب الثري", location: "قصر العائلة",
        spots: [
            { id: "s1", x: 45, y: 45, ev: { id: "e4_1", name: "الوصية", desc: "مكتوبة بقلم حبر جاف أزرق ومؤرخة قبل 5 سنوات.", strength: "strong" } },
            { id: "s2", x: 65, y: 65, ev: { id: "e4_2", name: "قلم حبر سائل", desc: "قلم الضحية المفضل، يستخدم حبراً سائلاً أسود.", strength: "weak" } },
            { id: "s3", x: 80, y: 25, ev: { id: "e4_3", name: "تقرير طبي", desc: "الضحية أصيب بالشلل التام في يده اليمنى قبل 6 سنوات.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الابن يدعي أن هذه الوصية كُتبت بخط والده قبل 5 سنوات." },
            { speaker: "witness", text: "نعم، رأيته يكتبها بيده اليمنى بوضوح ويسلمني إياها شخصياً." },
            { speaker: "action", type: "present", correctEv: "e4_3", failMsg: "هذا لا ينفي صحة الكتابة بشكل قاطع أمام المحكمة.", successMsg: "الضحية كان مشلول اليد اليمنى قبل 6 سنوات! من المستحيل أن يكتبها بيده اليمنى قبل 5 سنوات!" }
        ],
        finalArgument: { text: "إذن من قام بتزوير الوصية؟", options: [ { text: "الشاهد (المحامي) الذي زعم رؤيته.", correct: true, resultText: "تم كشف المحامي والابن الأصغر. براءة للمظلومين." }, { text: "الابن الأصغر كتبها بنفسه.", correct: false, resultText: "الابن لا يجيد تقليد الخط، المحامي هو المزور الفعلي." } ] }
    },
    {
        id: 5, title: "حادث منتصف الليل", description: "سيارة صدمت الضحية وهربت. المتهم يمتلك سيارة مطابقة للوصف.", accused: "سائق متهور", victim: "عابر سبيل", location: "الشارع المظلم",
        spots: [
            { id: "s1", x: 35, y: 75, ev: { id: "e5_1", name: "طلاء أحمر", desc: "آثار طلاء أحمر من السيارة الصادمة على عمود الإنارة.", strength: "strong" } },
            { id: "s2", x: 75, y: 45, ev: { id: "e5_2", name: "صدمة أمامية", desc: "سيارة المتهم (حمراء) بها صدمة من الأمام.", strength: "weak" } },
            { id: "s3", x: 55, y: 25, ev: { id: "e5_3", name: "تسجيل كاميرا", desc: "يظهر سيارة مسرعة بدون لوحات، والمصابيح الأمامية سليمة تماماً.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "السيارة حمراء وبها صدمة، الدليل يبدو واضحاً." },
            { speaker: "witness", text: "لقد رأيت سيارته تصطدم بعمود الإنارة ثم تهرب والمصباح الأمامي محطم بالكامل!" },
            { speaker: "action", type: "present", correctEv: "e5_3", failMsg: "الطلاء وحده لا يبرئ المتهم في هذه الحالة.", successMsg: "الكاميرا توضح أن مصابيح السيارة الصادمة كانت سليمة تماماً أثناء هربها! عكس شهادتك." }
        ],
        finalArgument: { text: "بماذا تفسر الصدمة الموجودة في سيارة المتهم؟", options: [ { text: "صدمة قديمة لا علاقة لها بالحادث.", correct: true, resultText: "تمت تبرئة المتهم بنجاح وإسقاط التهم." }, { text: "الشرطة حطمت سيارته للقبض عليه.", correct: false, resultText: "حجة سخيفة أغضبت القاضي." } ] }
    },
    {
        id: 6, title: "الاختراق الداخلي", description: "سرقة بيانات الشركة. التهمة موجهة للمبرمج.", accused: "علي", victim: "شركة تقنية", location: "غرفة السيرفرات",
        spots: [
            { id: "s1", x: 50, y: 55, ev: { id: "e6_1", name: "وقت الدخول", desc: "تم الاختراق الساعة 2 صباحاً من حساب علي.", strength: "strong" } },
            { id: "s2", x: 85, y: 85, ev: { id: "e6_2", name: "سجل البوابة", desc: "علي غادر المبنى الساعة 8 مساءً.", strength: "weak" } },
            { id: "s3", x: 25, y: 25, ev: { id: "e6_3", name: "سجل الشبكة", desc: "الاختراق تم من جهاز متصل بشبكة الشركة الداخلية حصراً.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "البيانات الحساسة سرقت باستخدام حساب المتهم." },
            { speaker: "witness", text: "من المؤكد أنه اخترقنا من منزله عبر الإنترنت المفتوح." },
            { speaker: "action", type: "present", correctEv: "e6_3", failMsg: "سجل البوابة لا ينفي إمكانية الاختراق عن بعد.", successMsg: "الاختراق تطلب اتصالاً بالشبكة الداخلية، والمتهم لم يكن في المبنى أصلاً!" }
        ],
        finalArgument: { text: "من هو الفاعل الحقيقي؟", options: [ { text: "شخص من داخل المبنى استخدم حاسوب علي.", correct: true, resultText: "تم القبض على المدير الفني الذي تواجد في المبنى." }, { text: "فيروس حاسوبي.", correct: false, resultText: "القاضي لم يقتنع بهذه النظرية التقنية." } ] }
    },
    {
        id: 7, title: "اللوحة المفقودة", description: "سرقة لوحة زيتيّة وتوجيه التهمة لحارس المتحف.", accused: "حارس ليلي", victim: "المتحف الوطني", location: "قاعة العرض",
        spots: [
            { id: "s1", x: 50, y: 35, ev: { id: "e7_1", name: "إطار فارغ", desc: "اللوحة قُطعت من الإطار بآلة حادة.", strength: "weak" } },
            { id: "s2", x: 25, y: 75, ev: { id: "e7_2", name: "سجل الإنذار", desc: "الإنذار تم تعطيله الساعة 11 مساءً بكلمة سر صحيحة.", strength: "strong" } },
            { id: "s3", x: 85, y: 55, ev: { id: "e7_3", name: "جدول الوردية", desc: "المتهم بدأ ورديته الساعة 12 منتصف الليل.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "نظام الإنذار عُطل، والحارس كان مناوباً في تلك الليلة." },
            { speaker: "witness", text: "لقد رأيته يطفئ الإنذار ويسرق اللوحة في منتصف الليل." },
            { speaker: "action", type: "present", correctEv: "e7_2", failMsg: "هذا الدليل لا ينفي التهمة عنه بشكل كامل.", successMsg: "الإنذار عُطل الساعة 11، أي قبل بدء وردية المتهم بساعة كاملة!" }
        ],
        finalArgument: { text: "السرقة حدثت قبل مجيء الحارس، من المسؤول؟", options: [ { text: "مدير المتحف نفسه لامتلاكه كلمة السر.", correct: true, resultText: "خطة احتيال على التأمين مكشوفة! أحسنت." }, { text: "لص محترف.", correct: false, resultText: "لكن اللص الخارجي لا يملك كلمة السر الصحيحة!" } ] }
    },
    {
        id: 8, title: "مسرح الجريمة", description: "مقتل ممثل على المسرح بمسدس حقيقي بدل المزيف.", accused: "الممثل البديل", victim: "البطل", location: "خشبة المسرح",
        spots: [
            { id: "s1", x: 50, y: 55, ev: { id: "e8_1", name: "مسدس حقيقي", desc: "وزنه ثقيل ومحشو برصاص حي.", strength: "strong" } },
            { id: "s2", x: 25, y: 45, ev: { id: "e8_2", name: "مسدس مزيف", desc: "وزنه خفيف جداً ومصنوع من البلاستيك.", strength: "weak" } },
            { id: "s3", x: 80, y: 25, ev: { id: "e8_3", name: "فيديو كواليس", desc: "المتهم يظهر وهو يحمل المسدس ويتذمر من ثقله المفاجئ.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "المتهم هو من ضغط الزناد أمام الجمهور." },
            { speaker: "witness", text: "المتهم كان يعلم أنه مسدس حقيقي وتعمد استخدامه لقتل البطل." },
            { speaker: "action", type: "present", correctEv: "e8_3", failMsg: "وزن المسدس وحده لا يثبت عدم علمه.", successMsg: "الفيديو يثبت تفاجؤ المتهم من وزن المسدس، مما يعني أنه لم يكن يعلم بتبديله!" }
        ],
        finalArgument: { text: "من بدّل المسدس الحقيقي بالمزيف؟", options: [ { text: "مسؤول الإكسسوارات.", correct: true, resultText: "إدانة مدير المسرح بتهمة الإهمال والقتل العمد." }, { text: "المخرج.", correct: false, resultText: "لا يوجد دافع واضح للمخرج." } ] }
    },
    {
        id: 9, title: "التوأم المتطابق", description: "جريمة سطو، شهود عيان يؤكدون رؤية المتهم.", accused: "كريم (أعسر)", victim: "محل مجوهرات", location: "السوق التجاري",
        spots: [
            { id: "s1", x: 45, y: 65, ev: { id: "e9_1", name: "بصمات", desc: "بصمات يد يمنى فقط على واجهة العرض.", strength: "strong" } },
            { id: "s2", x: 75, y: 45, ev: { id: "e9_2", name: "مقبض الخزنة", desc: "تم لفه بقوة باستخدام اليد اليمنى.", strength: "strong" } },
            { id: "s3", x: 25, y: 85, ev: { id: "e9_3", name: "تقرير طبي", desc: "المتهم كريم يستخدم يده اليسرى بشكل حصري (أعسر).", strength: "weak" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الشاهد يؤكد إصراراً أنه رآك تكسر الخزنة." },
            { speaker: "witness", text: "رأيته يفتح الخزنة بيده اليمنى بقوة ويسرق المال." },
            { speaker: "action", type: "present", correctEv: "e9_3", failMsg: "البصمات وحدها غير كافية لردع الشهادة.", successMsg: "المتهم أعسر ولا يستخدم يده اليمنى أبداً، بينما الجريمة نُفذت بيد يمنى حصرياً!" }
        ],
        finalArgument: { text: "من هو السارق الحقيقي الذي رآه الشاهد؟", options: [ { text: "شخص آخر يشبهه صدفة.", correct: false, resultText: "استنتاج ضعيف جداً." }, { text: "شقيقه التوأم (الأيمن).", correct: true, resultText: "تم كشف الخدعة والقبض على التوأم المتطابق!" } ] }
    },
    {
        id: 10, title: "الفساد الأخير", description: "عمدة المدينة متهم بتلقي رشاوي. المحكمة منحازة والجلسة حاسمة.", accused: "الصحفي الاستقصائي", victim: "العمدة", location: "مكتب العمدة",
        spots: [
            { id: "s1", x: 55, y: 55, ev: { id: "e10_1", name: "ظرف نقود", desc: "ظرف فارغ يحمل ختم بنك أجنبي.", strength: "weak" } },
            { id: "s2", x: 35, y: 35, ev: { id: "e10_2", name: "شريط صوتي", desc: "تسجيل للعمدة يطلب تحويل الأموال لحساب سويسري.", strength: "strong" } },
            { id: "s3", x: 85, y: 85, ev: { id: "e10_3", name: "تذكرة طيران", desc: "تذكرة سفر لسويسرا باسم العمدة بتاريخ الغد.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "أيها الصحفي، أنت متهم بتلفيق التهم للعمدة المحترم." },
            { speaker: "witness", text: "لم أطلب أي أموال في حياتي، هذا افتراء لتدمير سمعتي!" },
            { speaker: "action", type: "present", correctEv: "e10_2", failMsg: "التذكرة لا تثبت الرشوة بحد ذاتها.", successMsg: "لدي تسجيل حصري بصوت العمدة يثبت طلبه للرشوة وتحويلها لسويسرا!" }
        ],
        finalArgument: { text: "الكلمة الأخيرة للقاضي قبل النطق بالحكم...", options: [ { text: "إبراز التذكرة كدليل على نية الهرب.", correct: true, resultText: "انهار العمدة واعترف. لقد طهرت المدينة من الفساد! أنت المحامي الأخير." }, { text: "التوسل بالرحمة للمحكمة.", correct: false, resultText: "خسرت القضية وسُجن الصحفي، وانتصر الفساد." } ] }
    }
];

const ACHIEVEMENTS_DATA = [
    { id: "novice", title: "المحامي المبتدئ", desc: "تم حل أول قضية جنائية بنجاح." },
    { id: "genius", title: "المحقق العبقري", desc: "تم جمع جميع الأدلة المتاحة في قضية واحدة." },
    { id: "flawless", title: "قلب القضية", desc: "كسبت قضية في المحكمة بدون أي خطأ أو اعتراض فاشل." },
    { id: "legend", title: "المحامي الأخير", desc: "أكملت جميع ملفات القضايا العشرة وطهرت المدينة." }
];

// --- State Variables ---
let state = {
    unlockedCases: 1,
    solvedCases: [],
    stats: { wins: 0, losses: 0, perfectCases: 0 },
    achievements: [],
    
    currentCaseId: null,
    inventory: [],
    judgeConfidence: 100,
    courtStepIndex: 0,
    attemptsLeft: 3,
    perfectCurrentCase: true,
    isProcessingLogic: false
};
let finalTimerInterval = null;

// --- Audio System (Web Audio API) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let soundEnabled = true;

function playTone(freq, type, duration, vol) {
    if(!soundEnabled || audioCtx.state === 'suspended') return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch(e) {}
}

function playSound(type) {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    switch(type) {
        case 'click': playTone(500, 'sine', 0.1, 0.05); break;
        case 'evidence': playTone(700, 'sine', 0.15, 0.1); setTimeout(()=>playTone(900, 'sine', 0.2, 0.1), 100); break;
        case 'success': playTone(523.25, 'triangle', 0.15, 0.1); setTimeout(()=>playTone(659.25, 'triangle', 0.15, 0.1), 150); setTimeout(()=>playTone(783.99, 'triangle', 0.3, 0.1), 300); break;
        case 'fail': playTone(150, 'sawtooth', 0.3, 0.15); setTimeout(()=>playTone(100, 'sawtooth', 0.4, 0.15), 150); break;
        case 'objection': playTone(800, 'square', 0.1, 0.2); setTimeout(()=>playTone(400, 'sawtooth', 0.5, 0.2), 80); break;
    }
}

document.getElementById('sound-toggle').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('sound-toggle');
    if(soundEnabled) {
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    } else {
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
    }
});

// --- Storage ---
function saveGame() {
    try {
        localStorage.setItem('lastArgumentSave_v3', JSON.stringify({
            unlockedCases: state.unlockedCases,
            solvedCases: state.solvedCases,
            stats: state.stats,
            achievements: state.achievements
        }));
    } catch(e) { console.error("Storage error", e); }
}

function loadGame() {
    try {
        const saved = localStorage.getItem('lastArgumentSave_v3');
        if(saved) {
            const p = JSON.parse(saved);
            state.unlockedCases = p.unlockedCases || 1;
            state.solvedCases = p.solvedCases || [];
            state.stats = p.stats || { wins: 0, losses: 0, perfectCases: 0 };
            state.achievements = p.achievements || [];
        }
    } catch(e) {}
}

// --- Helpers ---
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
    t.className = 'toast';
    t.style.borderLeftColor = isError ? "var(--danger)" : "var(--gold)";
    t.innerText = msg;
    container.appendChild(t);
    setTimeout(() => {
        t.style.animation = "slideDown 0.3s ease reverse forwards";
        setTimeout(() => t.remove(), 300);
    }, 3000);
}

function grantAchievement(id) {
    if(state.achievements.includes(id)) return;
    state.achievements.push(id);
    saveGame();
    playSound('success');
    
    const ach = ACHIEVEMENTS_DATA.find(a => a.id === id);
    const container = document.getElementById('achievement-container');
    const t = document.createElement('div');
    t.className = 'achievement-toast';
    t.innerHTML = `
        <div class="ach-icon" style="font-size:2rem;">🏆</div>
        <div class="ach-text"><h4>إنجاز جديد: ${ach.title}</h4><p>${ach.desc}</p></div>
    `;
    container.appendChild(t);
    setTimeout(() => {
        t.style.animation = "slideUp 0.4s ease reverse forwards";
        setTimeout(() => t.remove(), 400);
    }, 4500);
}

function clearTimers() {
    if(finalTimerInterval) {
        clearInterval(finalTimerInterval);
        finalTimerInterval = null;
    }
}

// --- Screens Logic ---
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
        card.innerHTML = `
            <h3>الملف #${c.id}: ${c.title}</h3>
            <p>${isLocked ? '🔒 ملف مغلق السجل يتطلب فك القضايا السابقة' : c.description}</p>
            ${isSolved ? '<span class="case-status">✓ قضية محسومة</span>' : ''}
        `;
        if(!isLocked) card.onclick = () => startInvestigation(c.id);
        container.appendChild(card);
    });
}

// -- Investigation --
function startInvestigation(caseId) {
    state.currentCaseId = caseId;
    state.inventory = [];
    state.perfectCurrentCase = true;
    const c = ALL_CASES.find(x => x.id === caseId);
    
    document.getElementById('inv-case-title').innerText = c.title;
    document.getElementById('to-court-btn').classList.add('hidden');
    updateInventoryUI();
    
    const area = document.getElementById('investigation-area');
    area.innerHTML = '';
    
    c.spots.forEach((spot, index) => {
        const el = document.createElement('div');
        el.className = 'spot-marker';
        el.style.left = `${spot.x}%`;
        el.style.top = `${spot.y}%`;
        el.innerText = index + 1; // Numbering the evidence markers
        el.onclick = () => collectEvidence(spot, el);
        area.appendChild(el);
    });
    
    showScreen('investigation-screen');
    showToast("قم بمسح مسرح الجريمة وجمع الأدلة المرقمة.");
}

function collectEvidence(spot, el) {
    if(el.classList.contains('investigated')) return;
    playSound('evidence');
    el.classList.add('investigated');
    
    state.inventory.push(spot.ev);
    updateInventoryUI();
    
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    if(state.inventory.length === c.spots.length) {
        document.getElementById('to-court-btn').classList.remove('hidden');
        showToast("تم جمع كافة الأدلة بنجاح. المحكمة بانتظارك!");
        grantAchievement('genius');
    }
}

function updateInventoryUI() {
    document.getElementById('ev-count').innerText = state.inventory.length;
    const tray = document.getElementById('evidence-tray');
    tray.innerHTML = '';
    state.inventory.forEach(ev => {
        const div = document.createElement('div');
        div.className = 'evidence-item';
        div.innerHTML = `<h4>${ev.name}</h4><p>${ev.desc}</p>`;
        tray.appendChild(div);
    });
}

function openFileModal() {
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    document.getElementById('modal-case-title').innerText = c.title;
    document.getElementById('modal-case-body').innerHTML = `
        <p><strong>المتهم:</strong> ${c.accused}</p>
        <p><strong>الضحية:</strong> ${c.victim}</p>
        <p><strong>موقع الحادث:</strong> ${c.location}</p>
        <hr>
        <p>${c.description}</p>
    `;
    document.getElementById('file-modal').style.display = 'flex';
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// -- Courtroom --
function goToCourt() {
    state.judgeConfidence = 100;
    state.courtStepIndex = 0;
    state.attemptsLeft = 3;
    state.isProcessingLogic = false;
    document.getElementById('dialogue-box').innerHTML = '';
    
    updateCourtUI();
    renderCourtEvidence();
    showScreen('court-screen');
    processCourtDialogue();
}

function updateCourtUI() {
    const fill = document.getElementById('confidence-fill');
    fill.style.width = `${state.judgeConfidence}%`;
    fill.style.backgroundColor = state.judgeConfidence > 50 ? 'var(--success)' : 'var(--danger)';
    document.getElementById('court-attempts').innerText = state.attemptsLeft;
}

function renderCourtEvidence() {
    const tray = document.getElementById('court-evidence-tray');
    tray.innerHTML = '';
    state.inventory.forEach(ev => {
        const div = document.createElement('div');
        div.className = 'evidence-item';
        div.innerHTML = `<h4>${ev.name}</h4><p class="truncate">${ev.desc}</p>`;
        div.onclick = () => presentEvidence(ev);
        tray.appendChild(div);
    });
}

function appendChat(speakerClass, name, text) {
    const box = document.getElementById('dialogue-box');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${speakerClass}`;
    bubble.innerHTML = `<span class="speaker-name">${name}</span>${text}`;
    box.appendChild(bubble);
    box.scrollTop = box.scrollHeight;
}

function processCourtDialogue() {
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    const step = c.courtScript[state.courtStepIndex];
    
    const nextBtn = document.getElementById('next-dialogue-btn');
    const presentAction = document.getElementById('court-present-action');
    
    if(!step) {
        startFinalArgument();
        return;
    }
    
    state.isProcessingLogic = false;
    
    if(step.type === 'present') {
        nextBtn.classList.add('hidden');
        presentAction.classList.remove('hidden');
        appendChat('judge', 'سيادة القاضي', 'هل يمتلك الدفاع دليلاً ملموساً يكشف التناقض في هذه الشهادة؟');
    } else {
        nextBtn.classList.remove('hidden');
        presentAction.classList.add('hidden');
        
        const isJudge = step.speaker === 'judge';
        appendChat(isJudge ? 'judge' : 'witness', isJudge ? 'سيادة القاضي' : 'الشاهد', step.text);
        playSound('click');
    }
}

function nextCourtStep() {
    if(state.isProcessingLogic) return;
    state.isProcessingLogic = true;
    
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    const step = c.courtScript[state.courtStepIndex];
    
    if(step && step.type !== 'present') {
        state.courtStepIndex++;
        processCourtDialogue();
    }
}

function presentEvidence(ev) {
    if(state.isProcessingLogic) return;
    state.isProcessingLogic = true;
    
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    const step = c.courtScript[state.courtStepIndex];
    
    document.getElementById('court-present-action').classList.add('hidden');
    
    if(ev.id === step.correctEv) {
        playSound('objection');
        appendChat('lawyer', 'أنت (المحامي)', `اعتراض! الدليل "${ev.name}" يثبت العكس تماماً: ${step.successMsg}`);
        
        setTimeout(() => {
            state.courtStepIndex++;
            processCourtDialogue();
        }, 3500);
    } else {
        playSound('fail');
        state.perfectCurrentCase = false;
        state.attemptsLeft--;
        state.judgeConfidence -= 34;
        updateCourtUI();
        
        appendChat('lawyer', 'أنت (المحامي)', `سيدي القاضي، أرجو النظر إلى "${ev.name}"...`);
        
        setTimeout(() => {
            const box = document.getElementById('dialogue-box');
            box.classList.add('shake-anim');
            setTimeout(()=>box.classList.remove('shake-anim'), 500);
            
            appendChat('error', 'سيادة القاضي', step.failMsg + " خصم من ثقة المحكمة.");
            
            if(state.attemptsLeft <= 0) {
                setTimeout(() => finishCase(false, "تم طردك من القاعة وتغريمك بسبب تضليل المحكمة وتقديم أدلة غير مرتبطة. القضية خُسرت."), 2500);
            } else {
                setTimeout(() => {
                    document.getElementById('court-present-action').classList.remove('hidden');
                    state.isProcessingLogic = false;
                }, 2000);
            }
        }, 1200);
    }
}

// -- Final Argument --
function startFinalArgument() {
    clearTimers();
    playSound('objection');
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    showScreen('final-argument-screen');
    
    const container = document.getElementById('argument-options');
    container.innerHTML = '';
    
    c.finalArgument.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'arg-btn';
        btn.innerText = opt.text;
        btn.onclick = () => {
            btn.disabled = true;
            handleFinalChoice(opt);
        };
        container.appendChild(btn);
    });
    
    let time = 30;
    const timerEl = document.getElementById('final-timer');
    timerEl.innerText = time;
    timerEl.className = 'gold-text';
    
    finalTimerInterval = setInterval(() => {
        time--;
        timerEl.innerText = time;
        if(time <= 10) timerEl.className = 'alert-text';
        if(time <= 5) playSound('click');
        
        if(time <= 0) {
            clearTimers();
            finishCase(false, "انتهى الوقت المخصص للمرافعة! تم رفض طلبك والقضية غير محسومة.");
        }
    }, 1000);
}

function handleFinalChoice(opt) {
    clearTimers();
    finishCase(opt.correct, opt.resultText);
}

// -- Results --
function finishCase(isWin, desc) {
    clearTimers();
    if(isWin) {
        playSound('success');
        state.stats.wins++;
        if(!state.solvedCases.includes(state.currentCaseId)) {
            state.solvedCases.push(state.currentCaseId);
            if(state.unlockedCases === state.currentCaseId && state.unlockedCases < ALL_CASES.length) {
                state.unlockedCases++;
            }
        }
        grantAchievement('novice');
        if(state.perfectCurrentCase) {
            state.stats.perfectCases++;
            grantAchievement('flawless');
        }
        if(state.solvedCases.length === ALL_CASES.length) grantAchievement('legend');
    } else {
        playSound('fail');
        state.stats.losses++;
    }
    
    saveGame();
    
    const titleEl = document.getElementById('result-title');
    titleEl.innerText = isWin ? "القضية محسومة - براءة" : "خسارة القضية";
    titleEl.style.color = isWin ? "var(--success)" : "var(--danger)";
    
    const iconContainer = document.getElementById('result-icon-container');
    if(isWin) {
        iconContainer.style.borderColor = "var(--success)";
        iconContainer.innerHTML = `<svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="var(--success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else {
        iconContainer.style.borderColor = "var(--danger)";
        iconContainer.innerHTML = `<svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="var(--danger)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
    }
    
    document.getElementById('result-desc').innerText = desc;
    
    document.getElementById('result-stats-details').innerHTML = `
        <p><span>إجمالي القضايا المحلولة:</span> <strong class="gold-text">${state.solvedCases.length} / ${ALL_CASES.length}</strong></p>
        <p><span>تقييم الأداء:</span> <strong style="color:${isWin?'var(--success)':'var(--danger)'}">${state.perfectCurrentCase && isWin ? 'مثالي ⭐⭐⭐' : (isWin ? 'جيد ⭐⭐' : 'سيء ❌')}</strong></p>
    `;
    
    showScreen('result-screen');
}

// -- Stats --
function renderStats() {
    const total = ALL_CASES.length;
    const completion = Math.round((state.solvedCases.length / total) * 100);
    
    document.getElementById('stats-grid').innerHTML = `
        <div class="stat-box"><h3>${state.stats.wins}</h3><p>قضايا تم حلها</p></div>
        <div class="stat-box"><h3>${state.stats.losses}</h3><p>قضايا خاسرة</p></div>
        <div class="stat-box"><h3>${state.stats.perfectCases}</h3><p>مرافعات مثالية</p></div>
        <div class="stat-box"><h3>${completion}%</h3><p>نسبة الإنجاز</p></div>
    `;
    
    const achList = document.getElementById('achievements-list');
    achList.innerHTML = '';
    ACHIEVEMENTS_DATA.forEach(a => {
        const unlocked = state.achievements.includes(a.id);
        achList.innerHTML += `
            <div class="ach-item ${unlocked ? 'unlocked' : ''}">
                <div class="ach-icon">🏆</div>
                <div>
                    <h4 style="color:${unlocked?'var(--gold)':'var(--text-dim)'};">${a.title}</h4>
                    <p style="font-size:0.8rem; color:var(--text-dim);">${unlocked ? a.desc : 'غير مكتشف بعد...'}</p>
                </div>
            </div>
        `;
    });
    
    if(!navigator.share) document.getElementById('share-btn').style.display = 'none';
}

function shareStats() {
    if(navigator.share) {
        navigator.share({
            title: 'المحامي الأخير',
            text: `لعبت "المحامي الأخير"! قمت بحل ${state.solvedCases.length} قضايا ولدي ${state.stats.perfectCases} مرافعة مثالية. هل تملك الذكاء لكشف الحقيقة؟`,
            url: window.location.href
        }).catch(err => console.log('Share error', err));
    }
}

// --- Initialization ---
window.onload = () => {
    loadGame();
    // Prevent default touch behaviors that mess up games
    document.addEventListener('touchmove', function(e) { 
        if(!e.target.closest('.scrollable-content') && !e.target.closest('.evidence-tray')) {
            e.preventDefault(); 
        }
    }, { passive: false });
};

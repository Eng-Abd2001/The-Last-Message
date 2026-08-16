// --- Game Data & Cases ---
const ALL_CASES = [
    {
        id: 1,
        title: "قضية الساعة المسروقة",
        description: "سُرقت ساعة ذهبية ثمينة من مكتب الضحية. الشاهد يدعي أنه رأى المتهم يهرب من النافذة.",
        accused: "أحمد (الموظف)",
        victim: "السيد محمود (المدير)",
        location: "مكتب الإدارة",
        spots: [
            { id: "s1", name: "النافذة", x: 20, y: 30, icon: "🪟", ev: { id: "e1_1", name: "زجاج مكسور", desc: "شظايا الزجاج متناثرة خارج المكتب، مما يعني أن الكسر تم من الداخل.", strength: "strong" } },
            { id: "s2", name: "المكتب", x: 60, y: 50, icon: "🗄️", ev: { id: "e1_2", name: "إيصال قهوة", desc: "إيصال بتاريخ وقت الجريمة يحمل اسم المتهم.", strength: "weak" } },
            { id: "s3", name: "الباب", x: 80, y: 80, icon: "🚪", ev: { id: "e1_3", name: "قفل سليم", desc: "الباب لم يُكسر.", strength: "weak" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الشاهد، أخبرنا ماذا رأيت ليلة الأمس." },
            { speaker: "witness", text: "رأيت المتهم يقفز من النافذة المحطمة من الخارج ليهرب بالغنيمة." },
            { speaker: "action", type: "present", correctEv: "e1_1", failMsg: "هذا الدليل لا يثبت كذب الشاهد بشأن اتجاه الكسر!", successMsg: "لحظة! الزجاج متناثر بالخارج، مما يعني أن النافذة كُسرت من الداخل، الشاهد يكذب!" }
        ],
        finalArgument: {
            text: "استناداً لتناقض الشاهد، من هو الجاني الحقيقي؟",
            options: [
                { text: "أحمد المتهم هو من كسرها من الداخل.", correct: false, resultText: "لقد أرسلت رجلاً بريئاً للسجن." },
                { text: "الشاهد كسرها من الداخل واختلق القصة.", correct: true, resultText: "أحسنت! الشاهد هو السارق الحقيقي." }
            ]
        }
    },
    {
        id: 2,
        title: "السم في الفنجان",
        description: "تسمم كيميائي في المختبر. الجميع شربوا نفس القهوة ولكن الضحية فقط هو من سقط.",
        accused: "مساعد المختبر",
        victim: "د. سامي",
        location: "المختبر الكيميائي",
        spots: [
            { id: "s1", name: "آلة القهوة", x: 80, y: 20, icon: "☕", ev: { id: "e2_1", name: "بقايا القهوة", desc: "القهوة في الآلة سليمة ولا تحتوي على سم.", strength: "weak" } },
            { id: "s2", name: "مكتب الضحية", x: 30, y: 60, icon: "🔬", ev: { id: "e2_2", name: "كوب الضحية", desc: "الكوب نظيف تماماً من الخارج ولكنه يحتوي على آثار سم بالداخل.", strength: "strong" } },
            { id: "s3", name: "خزانة الأدوية", x: 10, y: 30, icon: "💊", ev: { id: "e2_3", name: "دواء السكر", desc: "علبة محليات صناعية تخص الضحية ملوثة بالسم.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "كيف تم تسميم الضحية إذا كانت القهوة سليمة؟" },
            { speaker: "witness", text: "لابد أن المتهم وضع السم في كوب الضحية أثناء صب القهوة له." },
            { speaker: "action", type: "present", correctEv: "e2_3", failMsg: "هذا لا يفسر طريقة التسميم الحصرية للضحية.", successMsg: "اعتراض! السم لم يكن في الكوب مباشرة، بل في محليات السكر الخاصة بالضحية!" }
        ],
        finalArgument: {
            text: "من كان يملك القدرة على تبديل دواء السكر؟",
            options: [
                { text: "الضحية نفسه بالخطأ.", correct: false, resultText: "استنتاج ضعيف، القضية أُغلقت كحادث عرضي وأفلت الجاني." },
                { text: "صيدلي المختبر الذي يصرف الدواء.", correct: true, resultText: "تم القبض على الصيدلي. مرافعة ممتازة!" }
            ]
        }
    },
    {
        id: 3,
        title: "الغرفة المغلقة",
        description: "وجدت الضحية في غرفة مغلقة من الداخل بالكامل والمفتاح في جيبه.",
        accused: "صاحب الفندق",
        victim: "نزيل غريب",
        location: "غرفة الفندق 404",
        spots: [
            { id: "s1", name: "الباب", x: 50, y: 80, icon: "🚪", ev: { id: "e3_1", name: "قفل الباب", desc: "قفل قديم يمكن إغلاقه من الخارج باستخدام خيط يسحب المفتاح.", strength: "strong" } },
            { id: "s2", name: "النافذة", x: 20, y: 30, icon: "🪟", ev: { id: "e3_2", name: "غبار كثيف", desc: "النافذة لم تفتح منذ شهور.", strength: "weak" } },
            { id: "s3", name: "الأرضية", x: 70, y: 70, icon: "🧶", ev: { id: "e3_3", name: "خيط رفيع", desc: "قطعة من خيط صيد قوي وجدت تحت عقب الباب.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الادعاء يقول إنها حالة انتحار لأن الغرفة مغلقة من الداخل." },
            { speaker: "witness", text: "نعم سيدي، الباب كان مقفلاً والمفتاح في جيب الضحية." },
            { speaker: "action", type: "present", correctEv: "e3_3", failMsg: "الدليل لا يفسر كيف تم إغلاق الباب من الخارج.", successMsg: "اعتراض! الجاني استخدم هذا الخيط لسحب المفتاح وقفل الباب من الخارج لإيهامنا بالانتحار!" }
        ],
        finalArgument: {
            text: "كيف تثبت تورط صاحب الفندق؟",
            options: [
                { text: "يمتلك نسخة مفاتيح أخرى.", correct: false, resultText: "لقد أثبت للتو أن المفتاح الأساسي استُخدم بالخيط!" },
                { text: "هو الوحيد الذي يمتلك خيوط الصيد في الفندق لكونه صياداً.", correct: true, resultText: "دقة ملاحظة مذهلة! تم الإيقاع بالقاتل." }
            ]
        }
    },
    {
        id: 4,
        title: "الوصية المزيفة",
        description: "نزاع حول وصية مليونير مكتوبة بخط اليد.",
        accused: "الابن الأصغر",
        victim: "الأب الثري",
        location: "قصر العائلة",
        spots: [
            { id: "s1", name: "المكتب", x: 40, y: 40, icon: "📜", ev: { id: "e4_1", name: "الوصية", desc: "مكتوبة بقلم حبر جاف أزرق ومؤرخة قبل 5 سنوات.", strength: "strong" } },
            { id: "s2", name: "الدرج", x: 60, y: 60, icon: "🖋️", ev: { id: "e4_2", name: "قلم حبر سائل", desc: "قلم الضحية المفضل، يستخدم حبراً سائلاً أسود.", strength: "weak" } },
            { id: "s3", name: "التقويم", x: 80, y: 20, icon: "📅", ev: { id: "e4_3", name: "تقرير طبي", desc: "الضحية أصيب بالشلل في يده اليمنى قبل 6 سنوات.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الابن يدعي أن هذه الوصية كُتبت بخط والده قبل 5 سنوات." },
            { speaker: "witness", text: "نعم، رأيته يكتبها بيده اليمنى ويسلمني إياها." },
            { speaker: "action", type: "present", correctEv: "e4_3", failMsg: "هذا لا ينفي صحة الكتابة بشكل قاطع.", successMsg: "اعتراض! الضحية كان مشلول اليد اليمنى قبل 6 سنوات، من المستحيل أن يكتبها بيده اليمنى قبل 5 سنوات!" }
        ],
        finalArgument: {
            text: "إذن من زور الوصية؟",
            options: [
                { text: "الشاهد (المحامي) الذي زعم رؤيته.", correct: true, resultText: "تم كشف المحامي والابن الأصغر. براءة للمظلومين." },
                { text: "الابن الأصغر كتبها بنفسه.", correct: false, resultText: "الابن لا يجيد تقليد الخط، المحامي هو المزور." }
            ]
        }
    },
    {
        id: 5,
        title: "حادث منتصف الليل",
        description: "سيارة صدمت الضحية وهربت. المتهم يمتلك سيارة مطابقة للوصف.",
        accused: "سائق متهور",
        victim: "عابر سبيل",
        location: "الشارع المظلم",
        spots: [
            { id: "s1", name: "موقع الحادث", x: 30, y: 70, icon: "🚗", ev: { id: "e5_1", name: "طلاء أحمر", desc: "آثار طلاء أحمر من السيارة الصادمة على عمود الإنارة.", strength: "strong" } },
            { id: "s2", name: "سيارة المتهم", x: 70, y: 40, icon: "🚙", ev: { id: "e5_2", name: "صدمة أمامية", desc: "سيارة المتهم (حمراء) بها صدمة من الأمام.", strength: "weak" } },
            { id: "s3", name: "كاميرا المراقبة", x: 50, y: 20, icon: "🎥", ev: { id: "e5_3", name: "تسجيل مشوش", desc: "يظهر سيارة مسرعة بدون لوحات، والمصابيح الأمامية سليمة.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "السيارة حمراء وبها صدمة، الدليل واضح." },
            { speaker: "witness", text: "لقد رأيت سيارته تصطدم بعمود الإنارة ثم تهرب والمصباح الأمامي محطم!" },
            { speaker: "action", type: "present", correctEv: "e5_3", failMsg: "الطلاء وحده لا يبرئ المتهم.", successMsg: "اعتراض! الكاميرا توضح أن مصابيح السيارة الصادمة كانت سليمة تماماً أثناء هربها، عكس شهادة الشاهد!" }
        ],
        finalArgument: {
            text: "بماذا تفسر الصدمة في سيارة المتهم؟",
            options: [
                { text: "صدمة قديمة لا علاقة لها بالحادث.", correct: true, resultText: "تمت تبرئة المتهم بنجاح." },
                { text: "الشرطة حطمت سيارته.", correct: false, resultText: "حجة سخيفة أغضبت القاضي." }
            ]
        }
    },
    // Adding 5 more cases with simplified logic to fit
    {
        id: 6, title: "الاختراق الداخلي", description: "سرقة بيانات الشركة. التهمة موجهة للمبرمج.", accused: "علي", victim: "شركة تقنية", location: "السيرفرات",
        spots: [
            { id: "s1", name: "السجل", x: 50, y: 50, icon: "💻", ev: { id: "e6_1", name: "وقت الدخول", desc: "تم الاختراق الساعة 2 صباحاً من حساب علي.", strength: "strong" } },
            { id: "s2", name: "بوابة الشركة", x: 80, y: 80, icon: "🚪", ev: { id: "e6_2", name: "سجل البوابة", desc: "علي غادر المبنى الساعة 8 مساءً.", strength: "weak" } },
            { id: "s3", name: "شبكة واي فاي", x: 20, y: 20, icon: "📶", ev: { id: "e6_3", name: "سجل الشبكة الداخلية", desc: "الاختراق تم من جهاز متصل بشبكة الشركة الداخلية حصراً.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "البيانات سرقت باستخدام حساب المتهم." },
            { speaker: "witness", text: "من المؤكد أنه اخترقنا من منزله عبر الإنترنت المفتوح." },
            { speaker: "action", type: "present", correctEv: "e6_3", failMsg: "سجل البوابة لا ينفي الاختراق عن بعد.", successMsg: "اعتراض! الاختراق تطلب اتصالاً بالشبكة الداخلية، والمتهم لم يكن في المبنى!" }
        ],
        finalArgument: { text: "من هو الفاعل؟", options: [{ text: "شخص من داخل المبنى استخدم حاسوب علي.", correct: true, resultText: "تم القبض على المدير الفني." }, { text: "فيروس حاسوبي.", correct: false, resultText: "القاضي لم يقتنع." }] }
    },
    {
        id: 7, title: "اللوحة المفقودة", description: "سرقة لوحة زيتيّة وتوجيه التهمة لحارس المتحف.", accused: "حارس ليلي", victim: "المتحف", location: "قاعة العرض",
        spots: [
            { id: "s1", name: "الجدار", x: 50, y: 30, icon: "🖼️", ev: { id: "e7_1", name: "إطار فارغ", desc: "اللوحة قُطعت من الإطار بآلة حادة.", strength: "weak" } },
            { id: "s2", name: "المنبه", x: 20, y: 70, icon: "🚨", ev: { id: "e7_2", name: "سجل الإنذار", desc: "الإنذار تم تعطيله الساعة 11 مساءً بكلمة سر صحيحة.", strength: "strong" } },
            { id: "s3", name: "جدول الحرس", x: 80, y: 50, icon: "📋", ev: { id: "e7_3", name: "وردية الحارس", desc: "المتهم بدأ ورديته الساعة 12 منتصف الليل.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الإنذار عُطل، والحارس كان مناوباً." },
            { speaker: "witness", text: "لقد رأيته يطفئ الإنذار ويسرق اللوحة في منتصف الليل." },
            { speaker: "action", type: "present", correctEv: "e7_2", failMsg: "هذا لا ينفي التهمة.", successMsg: "اعتراض! الإنذار عُطل الساعة 11، أي قبل بدء وردية المتهم بساعة كاملة!" }
        ],
        finalArgument: { text: "السرقة حدثت قبل مجيء الحارس، من المسؤول؟", options: [{ text: "مدير المتحف نفسه.", correct: true, resultText: "خطة احتيال على التأمين مكشوفة!" }, { text: "لص محترف.", correct: false, resultText: "لكنه استخدم كلمة السر الصحيحة!" }] }
    },
    {
        id: 8, title: "مسرح الجريمة", description: "مقتل ممثل على المسرح بمسدس حقيقي بدل المزيف.", accused: "الممثل البديل", victim: "البطل", location: "المسرح",
        spots: [
            { id: "s1", name: "المسدس", x: 50, y: 50, icon: "🔫", ev: { id: "e8_1", name: "المسدس الحقيقي", desc: "وزنه ثقيل ومحشو برصاص حي.", strength: "strong" } },
            { id: "s2", name: "خزانة الممتلكات", x: 20, y: 40, icon: "📦", ev: { id: "e8_2", name: "مسدس مزيف", desc: "وزنه خفيف جداً ومصنوع من البلاستيك.", strength: "weak" } },
            { id: "s3", name: "كاميرا الكواليس", x: 80, y: 20, icon: "📹", ev: { id: "e8_3", name: "فيديو", desc: "المتهم يظهر وهو يحمل المسدس ويتذمر من ثقله المفاجئ.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "المتهم هو من ضغط الزناد." },
            { speaker: "witness", text: "المتهم كان يعلم أنه مسدس حقيقي وتعمد استخدامه." },
            { speaker: "action", type: "present", correctEv: "e8_3", failMsg: "وزن المسدس لا يثبت عدم علمه.", successMsg: "اعتراض! الفيديو يثبت تفاجؤ المتهم من وزن المسدس، مما يعني أنه لم يكن يعلم بتبديله!" }
        ],
        finalArgument: { text: "من بدّل المسدس؟", options: [{ text: "مسؤول الإكسسوارات.", correct: true, resultText: "إدانة مدير المسرح بتهمة الإهمال والقتل العمد." }, { text: "المخرج.", correct: false, resultText: "لا يوجد دافع." }] }
    },
    {
        id: 9, title: "التوأم المتطابق", description: "جريمة سطو، شهود عيان يؤكدون رؤية المتهم.", accused: "كريم (أعسر)", victim: "محل مجوهرات", location: "السوق",
        spots: [
            { id: "s1", name: "الزجاج", x: 40, y: 60, icon: "🔍", ev: { id: "e9_1", name: "بصمات", desc: "بصمات يد يمنى فقط على واجهة العرض.", strength: "strong" } },
            { id: "s2", name: "الخزنة", x: 70, y: 40, icon: "🔒", ev: { id: "e9_2", name: "مقبض الخزنة", desc: "تم لفه بقوة باستخدام اليد اليمنى.", strength: "strong" } },
            { id: "s3", name: "الملف الطبي", x: 20, y: 80, icon: "📄", ev: { id: "e9_3", name: "تقرير طبي", desc: "المتهم كريم يستخدم يده اليسرى بشكل حصري (أعسر).", strength: "weak" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الشاهد يؤكد أنك من كسر الخزنة." },
            { speaker: "witness", text: "رأيته يفتح الخزنة بيده اليمنى بقوة ويسرق المال." },
            { speaker: "action", type: "present", correctEv: "e9_3", failMsg: "البصمات وحدها غير كافية.", successMsg: "اعتراض! المتهم أعسر ولا يستخدم يده اليمنى، بينما الجريمة نُفذت بيد يمنى حصرياً!" }
        ],
        finalArgument: { text: "من هو السارق الحقيقي؟", options: [{ text: "شخص آخر يشبهه.", correct: false, resultText: "استنتاج ضعيف." }, { text: "شقيقه التوأم (الأيمن).", correct: true, resultText: "تم كشف الخدعة والقبض على التوأم!" }] }
    },
    {
        id: 10, title: "الفساد الأخير", description: "عمدة المدينة متهم بتلقي رشاوي. الجلسة مغلقة والمحكمة منحازة.", accused: "الصحفي الاستقصائي", victim: "العمدة", location: "مكتب العمدة",
        spots: [
            { id: "s1", name: "درج العمدة", x: 50, y: 50, icon: "🗄️", ev: { id: "e10_1", name: "ظرف نقود", desc: "ظرف فارغ يحمل ختم بنك أجنبي.", strength: "weak" } },
            { id: "s2", name: "جهاز التسجيل", x: 30, y: 30, icon: "📼", ev: { id: "e10_2", name: "شريط صوتي", desc: "تسجيل للعمدة يطلب تحويل الأموال לחساب سويسري.", strength: "strong" } },
            { id: "s3", name: "سلة المهملات", x: 80, y: 80, icon: "🗑️", ev: { id: "e10_3", name: "تذكرة طيران", desc: "تذكرة سفر لسويسرا باسم العمدة بتارخ الغد.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "أيها الصحفي، أنت متهم بالتشهير وتلفيق التهم للعمدة المحترم." },
            { speaker: "witness", text: "لم أطلب أي أموال في حياتي، هذا افتراء!" },
            { speaker: "action", type: "present", correctEv: "e10_2", failMsg: "التذكرة لا تثبت الرشوة بحد ذاتها.", successMsg: "اعتراض! لدي تسجيل بصوت العمدة يثبت طلبه للرشوة وتحويلها لسويسرا!" }
        ],
        finalArgument: { text: "الكلمة الأخيرة للقاضي...", options: [{ text: "إبراز التذكرة كدليل على نية الهرب.", correct: true, resultText: "انهار العمدة واعترف. لقد طهرت المدينة من الفساد! أنت المحامي الأخير." }, { text: "التوسل بالرحمة.", correct: false, resultText: "خسرت القضية وسُجن الصحفي." }] }
    }
];

// --- Audio Engine (Web Audio API) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let soundEnabled = true;

function playTone(freq, type, duration, vol) {
    if(!soundEnabled || audioCtx.state === 'suspended') return;
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
}

function playSound(type) {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    switch(type) {
        case 'click': playTone(400, 'sine', 0.1, 0.1); break;
        case 'start': playTone(200, 'square', 0.3, 0.2); setTimeout(()=>playTone(300, 'square', 0.5, 0.2), 200); break;
        case 'evidence': playTone(600, 'sine', 0.2, 0.1); setTimeout(()=>playTone(800, 'sine', 0.3, 0.1), 100); break;
        case 'success': playTone(440, 'triangle', 0.2, 0.2); setTimeout(()=>playTone(554, 'triangle', 0.2, 0.2), 150); setTimeout(()=>playTone(659, 'triangle', 0.4, 0.2), 300); break;
        case 'fail': playTone(150, 'sawtooth', 0.4, 0.2); break;
        case 'objection': playTone(800, 'square', 0.1, 0.3); setTimeout(()=>playTone(400, 'sawtooth', 0.6, 0.3), 100); break;
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    document.getElementById('sound-toggle').innerText = soundEnabled ? "🔊" : "🔇";
}

// --- State Management ---
let state = {
    unlockedCases: 1,
    solvedCases: [],
    stats: { wins: 0, losses: 0, perfectCases: 0 },
    achievements: [],
    
    // Current Game
    currentCaseId: null,
    inventory: [],
    judgeConfidence: 100,
    courtStepIndex: 0,
    attemptsLeft: 3,
    finalTimerInterval: null,
    perfectCurrentCase: true
};

const ACHIEVEMENTS_DATA = [
    { id: "novice", title: "المحامي المبتدئ", desc: "حل أول قضية." },
    { id: "genius", title: "المحقق العبقري", desc: "اجمع كل الأدلة في قضية واحدة." },
    { id: "flawless", title: "قلب القضية", desc: "اربح قضية بدون أي خطأ في المحكمة." },
    { id: "legend", title: "المحامي الأخير", desc: "قم بحل جميع القضايا العشر." }
];

function saveGame() {
    localStorage.setItem('lastArgumentSave', JSON.stringify({
        unlockedCases: state.unlockedCases,
        solvedCases: state.solvedCases,
        stats: state.stats,
        achievements: state.achievements
    }));
}

function loadGame() {
    const saved = localStorage.getItem('lastArgumentSave');
    if(saved) {
        const p = JSON.parse(saved);
        state.unlockedCases = p.unlockedCases || 1;
        state.solvedCases = p.solvedCases || [];
        state.stats = p.stats || { wins: 0, losses: 0, perfectCases: 0 };
        state.achievements = p.achievements || [];
    }
}

// --- UI Helpers ---
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'cases-screen') renderCases();
    if(id === 'stats-screen') renderStats();
}

function showToast(msg, isError = false) {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = 'toast';
    t.style.borderColor = isError ? "var(--danger)" : "var(--gold)";
    t.innerText = msg;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3000);
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
    t.innerHTML = `<div class="ach-icon">🏆</div><div class="ach-text"><h4>إنجاز جديد: ${ach.title}</h4><p>${ach.desc}</p></div>`;
    container.appendChild(t);
    setTimeout(() => t.remove(), 5000);
}

// --- Screens Logic ---

// 1. Cases Screen
function renderCases() {
    const container = document.getElementById('cases-container');
    container.innerHTML = '';
    
    ALL_CASES.forEach((c, index) => {
        const isLocked = c.id > state.unlockedCases;
        const isSolved = state.solvedCases.includes(c.id);
        
        const card = document.createElement('div');
        card.className = `case-card ${isLocked ? 'locked' : ''}`;
        card.innerHTML = `
            <h3>القضية #${c.id}: ${c.title}</h3>
            <p>${isLocked ? '🔒 ملف مغلق' : c.description}</p>
            ${isSolved ? '<span class="case-status solved">✓ محسومة</span>' : ''}
        `;
        if(!isLocked) {
            card.onclick = () => { playSound('click'); startInvestigation(c.id); };
        }
        container.appendChild(card);
    });
}

// 2. Investigation Phase
function startInvestigation(caseId) {
    state.currentCaseId = caseId;
    state.inventory = [];
    state.perfectCurrentCase = true;
    const c = ALL_CASES.find(x => x.id === caseId);
    
    document.getElementById('inv-case-title').innerText = c.title;
    document.getElementById('to-court-btn').style.display = 'none';
    updateInventoryUI();
    
    const area = document.getElementById('investigation-area');
    area.innerHTML = '';
    
    c.spots.forEach(spot => {
        const el = document.createElement('div');
        el.className = 'spot';
        el.style.left = `${spot.x}%`;
        el.style.top = `${spot.y}%`;
        el.innerText = spot.icon;
        el.onclick = () => collectEvidence(spot, el);
        area.appendChild(el);
    });
    
    showScreen('investigation-screen');
    showToast("ابحث في مسرح الجريمة عن الأدلة.");
}

function collectEvidence(spot, el) {
    if(el.classList.contains('investigated')) return;
    playSound('evidence');
    el.classList.add('investigated');
    
    state.inventory.push(spot.ev);
    updateInventoryUI();
    showToast(`تم العثور على دليل: ${spot.ev.name}`);
    
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    if(state.inventory.length === c.spots.length) {
        document.getElementById('to-court-btn').style.display = 'block';
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
        <p><strong>الموقع:</strong> ${c.location}</p>
        <hr style="border-color:#444; margin:10px 0;">
        <p>${c.description}</p>
    `;
    document.getElementById('file-modal').style.display = 'flex';
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// 3. Courtroom Phase
function goToCourt() {
    playSound('click');
    state.judgeConfidence = 100;
    state.courtStepIndex = 0;
    state.attemptsLeft = 3;
    
    updateCourtUI();
    renderCourtEvidence();
    processCourtDialogue();
    showScreen('court-screen');
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
        const div = document.createElement('div');
        div.className = 'evidence-item';
        div.innerHTML = `<h4>${ev.name}</h4>`;
        div.onclick = () => presentEvidence(ev);
        tray.appendChild(div);
    });
}

function processCourtDialogue() {
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    const step = c.courtScript[state.courtStepIndex];
    const box = document.getElementById('dialogue-box');
    
    if(!step) {
        startFinalArgument();
        return;
    }
    
    document.getElementById('court-actions').style.display = step.type === 'present' ? 'flex' : 'none';
    
    if(step.type !== 'present') {
        const isJudge = step.speaker === 'judge';
        box.innerHTML = `<strong style="color: ${isJudge ? 'var(--gold)' : '#ccc'}">${isJudge ? 'القاضي' : 'الشاهد'}:</strong> <p>${step.text}</p>`;
        playSound('click');
    } else {
        box.innerHTML = `<strong class="gold-text">القاضي:</strong> <p>هل لديك دليل يكشف تناقض هذه الشهادة؟</p>`;
    }
}

function nextCourtStep() {
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    if(c.courtScript[state.courtStepIndex].type !== 'present') {
        state.courtStepIndex++;
        processCourtDialogue();
    }
}

function presentEvidence(ev) {
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    const step = c.courtScript[state.courtStepIndex];
    
    if(step.type !== 'present') return;
    
    if(ev.id === step.correctEv) {
        playSound('objection');
        showToast("اعتراض صحيح!", false);
        document.getElementById('dialogue-box').innerHTML = `<strong style="color:var(--success)">المحامي:</strong> <p>${step.successMsg}</p>`;
        document.getElementById('court-actions').style.display = 'none';
        
        setTimeout(() => {
            state.courtStepIndex++;
            processCourtDialogue();
        }, 3000);
    } else {
        playSound('fail');
        state.perfectCurrentCase = false;
        state.attemptsLeft--;
        state.judgeConfidence -= 34;
        updateCourtUI();
        
        document.getElementById('dialogue-box').classList.add('shake-element');
        setTimeout(() => document.getElementById('dialogue-box').classList.remove('shake-element'), 400);
        
        document.getElementById('dialogue-box').innerHTML = `<strong style="color:var(--danger)">القاضي:</strong> <p>${step.failMsg}</p>`;
        
        if(state.attemptsLeft <= 0) {
            finishCase(false, "تم طردك من القاعة بسبب إضاعة وقت المحكمة. القضية خُسرت.");
        } else {
            setTimeout(() => { processCourtDialogue(); }, 2000);
        }
    }
}

// 4. Final Argument Phase
function startFinalArgument() {
    playSound('objection');
    const c = ALL_CASES.find(x => x.id === state.currentCaseId);
    showScreen('final-argument-screen');
    
    const container = document.getElementById('argument-options');
    container.innerHTML = '';
    
    c.finalArgument.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'arg-btn';
        btn.innerText = opt.text;
        btn.onclick = () => handleFinalChoice(opt);
        container.appendChild(btn);
    });
    
    let time = 30;
    document.getElementById('final-timer').innerText = time;
    state.finalTimerInterval = setInterval(() => {
        time--;
        document.getElementById('final-timer').innerText = time;
        if(time <= 5) playSound('click');
        if(time <= 0) {
            clearInterval(state.finalTimerInterval);
            finishCase(false, "انتهى الوقت المخصص للمرافعة! القضية غير محسومة.");
        }
    }, 1000);
}

function handleFinalChoice(opt) {
    clearInterval(state.finalTimerInterval);
    finishCase(opt.correct, opt.resultText);
}

// 5. Results Phase
function finishCase(isWin, desc) {
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
        if(state.solvedCases.length === ALL_CASES.length) {
            grantAchievement('legend');
        }
    } else {
        playSound('fail');
        state.stats.losses++;
    }
    
    saveGame();
    
    document.getElementById('result-title').innerText = isWin ? "القضية محسومة - براءة" : "خسارة القضية";
    document.getElementById('result-title').style.color = isWin ? "var(--success)" : "var(--danger)";
    document.getElementById('result-desc').innerText = desc;
    
    document.getElementById('result-stats-details').innerHTML = `
        <p>القضايا المحلولة: ${state.solvedCases.length} / ${ALL_CASES.length}</p>
        <p>تقييم الأداء: ${state.perfectCurrentCase ? 'مثالي ⭐⭐⭐' : (isWin ? 'جيد ⭐⭐' : 'سيء ❌')}</p>
    `;
    
    showScreen('result-screen');
}

// 6. Stats Screen
function renderStats() {
    document.getElementById('stats-grid').innerHTML = `
        <div class="stat-box"><h3>${state.stats.wins}</h3><p>قضايا ناجحة</p></div>
        <div class="stat-box"><h3>${state.stats.losses}</h3><p>قضايا خاسرة</p></div>
        <div class="stat-box"><h3>${state.stats.perfectCases}</h3><p>مرافعات مثالية</p></div>
        <div class="stat-box"><h3>${Math.round((state.solvedCases.length / ALL_CASES.length) * 100)}%</h3><p>نسبة الإنجاز</p></div>
    `;
    
    const achList = document.getElementById('achievements-list');
    achList.innerHTML = '<h3>الإنجازات</h3>';
    ACHIEVEMENTS_DATA.forEach(a => {
        const unlocked = state.achievements.includes(a.id);
        achList.innerHTML += `
            <div class="ach-item ${unlocked ? 'unlocked' : ''}">
                <div class="ach-icon">🏆</div>
                <div>
                    <h4 style="color:${unlocked?'var(--gold)':'#555'}">${a.title}</h4>
                    <p style="font-size:0.8rem; color:#888">${unlocked ? a.desc : '؟؟؟'}</p>
                </div>
            </div>
        `;
    });
    
    if(!navigator.share) { document.getElementById('share-btn').style.display = 'none'; }
}

function shareStats() {
    if(navigator.share) {
        navigator.share({
            title: 'المحامي الأخير',
            text: `لعبت "المحامي الأخير"! قمت بحل ${state.solvedCases.length} قضايا، ولدي ${state.stats.perfectCases} مرافعة مثالية. هل يمكنك التغلب علي؟`,
            url: window.location.href
        }).catch(err => console.log('Share error', err));
    }
}

// --- Init Game ---
window.onload = () => {
    loadGame();
    // Start Audio context on first interaction
    document.body.addEventListener('click', () => {
        if(audioCtx.state === 'suspended') audioCtx.resume();
    }, {once:true});
};

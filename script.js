/**
 * The Last Argument - Premium Narrative & Manual Progression
 * Highly professional detective narrative with manual reading pace control.
 */

const ALL_CASES = [
    {
        id: 1, title: "الساعة الذهبية", description: "سُرقت ساعة ثمينة من مكتب الإدارة. الشاهد يزعم أن اللص كسر النافذة من الداخل ليهرب.", accused: "أحمد (موظف حسابات)", victim: "المدير العام", location: "مكتب الإدارة",
        spots: [
            { id: "s1", x: 25, y: 35, ev: { id: "e1_1", name: "شظايا الزجاج", desc: "الزجاج متناثر بالكامل داخل المكتب، مما يعني أن الكسر تم من الخارج للداخل.", strength: "strong" } },
            { id: "s2", x: 65, y: 55, ev: { id: "e1_2", name: "إيصال بنكي", desc: "إيصال يثبت تواجد المتهم في البنك وقت الجريمة.", strength: "weak" } },
            { id: "s3", x: 85, y: 75, ev: { id: "e1_3", name: "قفل الباب", desc: "الباب سليم ولم يتعرض لأي خدش أو كسر.", strength: "weak" } }
        ],
        courtScript: [
            { speaker: "judge", text: "لتبدأ الجلسة. أيها الشاهد، صف للمحكمة ما رأيته ليلة وقوع الجريمة." },
            { speaker: "witness", text: "سيدي القاضي، كنت أمر بجوار المكتب ليلاً، ورأيت المتهم يكسر زجاج النافذة من الداخل ويقفز هارباً بالساعة!" },
            { speaker: "judge", text: "شهادة صريحة. هل يملك الدفاع ما يدحض ادعاء هذا الشاهد العيان؟" },
            { speaker: "action", type: "present", correctEv: "e1_1", failMsg: "هذا الدليل لا يبطل شهادة العيان بشكل قاطع. المحكمة ترفض هذا التوجه.", successMsg: "إذا كان اللص قد كسر النافذة للهروب من الداخل، فلماذا تناثر الزجاج (داخل) المكتب؟ النافذة كُسرت من الخارج للتمويه، وشهادتك ملفقة بالكامل!" }
        ],
        finalArgument: { text: "بناءً على هذا التناقض الجذري، من هو الجاني الفعلي؟", options: [ { text: "المتهم هو من كسرها من الخارج للتمويه.", correct: false, resultText: "حجة ضعيفة. لقد أرسلت رجلاً بريئاً للسجن وأفلت الجاني." }, { text: "الشاهد نفسه كسرها من الخارج لاختلاق القصة.", correct: true, resultText: "استنتاج دقيق! الشاهد هو السارق وتم إلقاء القبض عليه." } ] }
    },
    {
        id: 2, title: "فنجان السم", description: "وفاة كيميائي بتسمم حاد. الجميع شربوا من نفس آلة القهوة المركزية، لكن الضحية فقط فارق الحياة.", accused: "مساعد المختبر", victim: "د. سامي (كبير الباحثين)", location: "المختبر الكيميائي",
        spots: [
            { id: "s1", x: 75, y: 25, ev: { id: "e2_1", name: "آلة القهوة", desc: "فحص المعمل الجنائي يثبت خلو القهوة المركزية من أي سموم.", strength: "weak" } },
            { id: "s2", x: 35, y: 65, ev: { id: "e2_2", name: "كوب الضحية", desc: "الكوب نظيف من الخارج، ويحتوي على بقايا قهوة مسممة من الداخل.", strength: "strong" } },
            { id: "s3", x: 15, y: 35, ev: { id: "e2_3", name: "دواء السكر", desc: "علبة محليات صناعية (مخصصة للضحية فقط) ملوثة بمركب سام مكثف.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الادعاء يزعم أن المتهم قام بتسميم الضحية. كيف حدث ذلك والقهوة سليمة؟" },
            { speaker: "witness", text: "الأمر بسيط يا سيدي، المتهم صب القهوة للضحية ودس السم في كوبه مباشرة قبل تقديمه." },
            { speaker: "judge", text: "دفاع، هل لديك اعتراض أو دليل ينفي هذه الآلية الجنائية؟" },
            { speaker: "action", type: "present", correctEv: "e2_3", failMsg: "هذا لا يفسر بالضرورة براءة موكلك من وضع السم.", successMsg: "المسألة أدق من ذلك! السم لم يوضع في الكوب، بل تم دسه في (المحليات الصناعية) التي يستخدمها الضحية حصراً، مما ينفي تهمة التسميم المباشر!" }
        ],
        finalArgument: { text: "إذاً، من هو الشخص الوحيد الذي يمتلك صلاحية تبديل الدواء؟", options: [ { text: "الضحية تناول السم بالخطأ.", correct: false, resultText: "المحكمة أغلقتها كحادثة عرضية، والقاتل الحقيقي أفلت." }, { text: "صيدلي المختبر المسؤول عن العهدة.", correct: true, resultText: "تم كشف الصيدلي وضبطه بمواد سامة مشابهة. مرافعة ممتازة!" } ] }
    },
    {
        id: 3, title: "الغرفة المغلقة", description: "عُثر على جثة في غرفة فندق مغلقة من الداخل بالكامل، والمفتاح داخل جيب الضحية.", accused: "صاحب الفندق", victim: "نزيل مجهول الهوية", location: "غرفة الفندق 404",
        spots: [
            { id: "s1", x: 50, y: 75, ev: { id: "e3_1", name: "قفل الباب", desc: "قفل ميكانيكي قديم يمكن التلاعب به وسحبه من الخارج.", strength: "strong" } },
            { id: "s2", x: 25, y: 35, ev: { id: "e3_2", name: "النافذة", desc: "حواف النافذة مغطاة بالغبار الكثيف، لم تُفتح منذ أشهر.", strength: "weak" } },
            { id: "s3", x: 75, y: 65, ev: { id: "e3_3", name: "خيط صيد", desc: "خيط صيد بحري رفيع وقوي جداً وُجد ملتفاً تحت عقب الباب.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الشرطة أغلقت المحضر على أنه انتحار مؤكد، فالغرفة مغلقة من الداخل." },
            { speaker: "witness", text: "بصفتي المحقق الأول، أؤكد أن الباب كان مقفلاً بإحكام، والمفتاح استخرجناه من جيب الضحية شخصياً." },
            { speaker: "judge", text: "دفاع، هل لديك دليل قاطع يحول هذه القضية من انتحار إلى جريمة قتل؟" },
            { speaker: "action", type: "present", correctEv: "e3_3", failMsg: "مجرد نظرية غير مدعومة بدليل فيزيائي صلب.", successMsg: "هذا الخيط هو دليل القتل! الجاني ربط المفتاح بخيط الصيد، سحبه من تحت الباب ليقفل القفل من الخارج، ثم أسقطه في جيب الضحية القريب من الباب لإيهامنا بالانتحار!" }
        ],
        finalArgument: { text: "استناداً لوسيلة الجريمة، كيف تثبت تورط صاحب الفندق؟", options: [ { text: "يمتلك نسخة مفاتيح رئيسية (Master Key).", correct: false, resultText: "حجة تتناقض مع استخدام الخيط المعقد! المحكمة رفضت ادعاءك." }, { text: "هو الوحيد الذي يمتلك خيوط صيد بحرية لكونه صياداً محترفاً.", correct: true, resultText: "تم ربط الأداة بمهنة المتهم، وانهار معترفاً بجريمته." } ] }
    },
    {
        id: 4, title: "سرقة القصيدة", description: "شاعر مخضرم ومغرور يتهم كاتباً شاباً بسرقة قصيدته 'سحر العيون'، والتي تصف التردد في مراسلة المحبوبة حتى رؤية عينيها.", accused: "الكاتب الشاب", victim: "الشاعر المخضرم", location: "اتحاد الأدباء",
        spots: [
            { id: "s1", x: 45, y: 45, ev: { id: "e4_1", name: "مسودة الشاب", desc: "مسودة ورقية بخط يد الشاب مليئة بالشطب والتعديلات اللغوية.", strength: "strong" } },
            { id: "s2", x: 65, y: 65, ev: { id: "e4_2", name: "سجل النشر", desc: "الشاعر نشر القصيدة في ديوانه الأخير المطبوع الأسبوع الماضي.", strength: "weak" } },
            { id: "s3", x: 80, y: 25, ev: { id: "e4_3", name: "نص القصيدة", desc: "القصيدة المزعومة كُتبت في الثمانينات وتتضمن عبارة: 'رنين رسالة هاتفي يوقظني'.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "المدعي يطالب بتعويض ضخم ويؤكد أن القصيدة من ديوانه القديم الذي كُتب في الثمانينات." },
            { speaker: "witness", text: "أجل، لقد كتبتها في صيف 1985 بخط يدي، وهذا الشاب السارق اقتبسها حرفياً في كتابه الجديد!" },
            { speaker: "judge", text: "هل هناك ما يثبت بطلان ادعاء هذا الشاعر المعروف؟" },
            { speaker: "action", type: "present", correctEv: "e4_3", failMsg: "المسودة لا تكفي لإثبات الأسبقية الزمنية أمام المحكمة.", successMsg: "كيف كتبت القصيدة في 1985 وهي تحتوي صراحة على جملة 'رنين رسالة هاتفي'؟ الهواتف المحمولة والرسائل النصية لم تكن موجودة حينها! أنت من سرقها من الشاب المعاصر!" }
        ],
        finalArgument: { text: "ما هو القرار النهائي للمحكمة في حق الشاعر؟", options: [ { text: "إدانته بتهمة التشهير والسرقة الفكرية.", correct: true, resultText: "استعاد الكاتب الشاب حقه، وفُضح الشاعر المغرور." }, { text: "تغريم الشاب لعدم كفاية الأدلة.", correct: false, resultText: "خسرت القضية لعدم ثقتك بأدلتك." } ] }
    },
    {
        id: 5, title: "حادث منتصف الليل", description: "حادث دهس وهروب مروع في شارع مظلم. المتهم يمتلك سيارة رياضية حمراء مطابقة لمواصفات السيارة الجانية.", accused: "سائق سيارة حمراء", victim: "عابر سبيل", location: "شارع رئيسي مظلم",
        spots: [
            { id: "s1", x: 35, y: 75, ev: { id: "e5_1", name: "بقايا الطلاء", desc: "آثار طلاء أحمر من السيارة الصادمة ملتصقة بعمود الإنارة.", strength: "strong" } },
            { id: "s2", x: 75, y: 45, ev: { id: "e5_2", name: "صدمة سيارة المتهم", desc: "سيارة المتهم (الحمراء) تعاني من انبعاج واضح في المصد الأمامي.", strength: "weak" } },
            { id: "s3", x: 55, y: 25, ev: { id: "e5_3", name: "تسجيل المراقبة", desc: "فيديو منخفض الدقة يُظهر سيارة هاربة بدون لوحات، ولكن مصابيحها الأمامية سليمة تماماً.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "النيابة تؤكد: السيارة حمراء وبها صدمة مطابقة، الدليل الفيزيائي يبدو قاطعاً." },
            { speaker: "witness", text: "أقسم لك سيدي، رأيت سيارته تصدم الضحية وعمود الإنارة بعنف، لدرجة أن مصباحه الأمامي الأيمن تحطم وتناثر بالكامل!" },
            { speaker: "judge", text: "الدفاع، هل لديك ما ينقض هذه الشهادة المباشرة؟" },
            { speaker: "action", type: "present", correctEv: "e5_3", failMsg: "الطلاء الأحمر موجود فعلاً، هذا لا يبرئ موكلك.", successMsg: "كاميرا المراقبة التقطت السيارة الهاربة للتو! دققوا في المقطع.. المصابيح الأمامية للسيارة الجانية سليمة وتعمل بكفاءة، عكس ادعاء الشاهد تماماً!" }
        ],
        finalArgument: { text: "إذاً، كيف يفسر الدفاع الانبعاج الموجود في سيارة المتهم؟", options: [ { text: "حادث مروري قديم وموثق لا علاقة له بالجريمة الحالية.", correct: true, resultText: "تمت مطابقة السجلات وتبرئة المتهم رسمياً." }, { text: "الشرطة تعمدت إتلاف سيارته لتوريطه.", correct: false, resultText: "اتهام خطير للشرطة بدون دليل، المحكمة ترفض وتدين موكلك." } ] }
    },
    {
        id: 6, title: "ثغرة النظام", description: "تم مسح قاعدة بيانات شركة تقنية كبرى بالكامل. المتهم هو مطور واجهات أمامية (Front-end Developer) يعمل في الشركة.", accused: "علي (مطور واجهات)", victim: "شركة تقنية", location: "غرفة الخوادم",
        spots: [
            { id: "s1", x: 50, y: 55, ev: { id: "e6_1", name: "سجل الخادم (Log)", desc: "سجل يوضح أن الهجوم نُفذ عبر سكريبت أتمتة معقد الساعة 2 صباحاً من حساب علي.", strength: "strong" } },
            { id: "s2", x: 85, y: 85, ev: { id: "e6_2", name: "بوابة الشركة", desc: "سجل البوابة الأمنية يؤكد مغادرة المتهم للمبنى الساعة 8 مساءً.", strength: "weak" } },
            { id: "s3", x: 25, y: 25, ev: { id: "e6_3", name: "الكود الخبيث", desc: "السكريبت المستخدم مكتوب ببيئة Node.js ويستخدم مكتبة Playwright المتقدمة للأتمتة.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الشركة تدعي أن الهجوم انطلق من حساب المتهم الشخصي." },
            { speaker: "witness", text: "بصفتي المدير التقني، أؤكد أن علي اخترقنا من منزله واستخدم حسابه لمسح البيانات حقداً علينا." },
            { speaker: "judge", text: "الدفاع، كيف تفسر وجود حساب موكلك في سجلات الهجوم؟" },
            { speaker: "action", type: "present", correctEv: "e6_3", failMsg: "غيابه عن المبنى لا يمنع الاختراق عن بُعد (Remote Access).", successMsg: "هذا السكريبت يتطلب احترافية عالية في بيئة Node.js ومكتبات الـ Backend مثل Playwright! موكلي مطور (واجهات أمامية) يتعامل مع HTML و CSS فقط، حساب موكلي تم اختراقه من محترف آخر داخل الشركة!" }
        ],
        finalArgument: { text: "من هو الشخص القادر على كتابة سكريبت أتمتة معقد كهذا داخل الشركة؟", options: [ { text: "المدير التقني (الشاهد) الذي يملك صلاحيات وخبرة الـ Backend.", correct: true, resultText: "تم كشف تورط المدير التقني في تدمير البيانات لإخفاء اختلاساته!" }, { text: "فيروس فدية مجهول المصدر.", correct: false, resultText: "القاضي يرفض تبرير 'الفيروسات المجهولة'. تمت إدانة المبرمج." } ] }
    },
    {
        id: 7, title: "لوحة المتحف", description: "سرقة لوحة زيتيّة نادرة من المتحف الوطني. تم العثور على الإطار فارغاً، وتم توجيه التهمة لحارس الأمن الليلي.", accused: "الحارس الليلي", victim: "إدارة المتحف الوطني", location: "قاعة العرض الرئيسية",
        spots: [
            { id: "s1", x: 50, y: 35, ev: { id: "e7_1", name: "الإطار المقطوع", desc: "اللوحة قُطعت من الإطار بحرفية عالية باستخدام مشرط جراحي.", strength: "weak" } },
            { id: "s2", x: 25, y: 75, ev: { id: "e7_2", name: "سجل نظام الإنذار", desc: "الإنذار المركزي تم تعطيله الساعة 11:00 مساءً باستخدام الرمز السري الإداري.", strength: "strong" } },
            { id: "s3", x: 85, y: 55, ev: { id: "e7_3", name: "جدول المناوبات", desc: "الجدول الرسمي يثبت أن مناوبة المتهم بدأت الساعة 12:00 منتصف الليل.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "نظام الإنذار المحيط باللوحة عُطل بالكامل، والحارس كان مناوباً وتغاضى عن الأمر." },
            { speaker: "witness", text: "أنا مدير المتحف، لقد رأيت الحارس بكاميرا الردهة وهو يقترب من اللوحة ويفصل الإنذار ليسرقها في منتصف الليل." },
            { speaker: "judge", text: "دفاع، هل هذا الاتهام المباشر من الإدارة صحيح؟" },
            { speaker: "action", type: "present", correctEv: "e7_2", failMsg: "طريقة قطع اللوحة لا تبرئ الحارس، يمكنه استخدام أي أداة.", successMsg: "كيف فصلها منتصف الليل وسجل النظام الرقمي يؤكد أن الإنذار عُطل الساعة 11:00 مساءً؟ أي قبل مجيء الحارس لورديته بساعة كاملة!" }
        ],
        finalArgument: { text: "بما أن السرقة حدثت قبل الوردية، من استخدم الرمز السري الإداري؟", options: [ { text: "مدير المتحف (الشاهد) لتدبير عملية احتيال للحصول على مبلغ التأمين.", correct: true, resultText: "انهار المدير واعترف بمكان اللوحة المخبأة. تم تبرئة الحارس." }, { text: "عصابة دولية محترفة للاختراقات.", correct: false, resultText: "العصابات لا تملك الرمز السري الإداري الداخلي. المحكمة غير مقتنعة." } ] }
    },
    {
        id: 8, title: "المدرب المقنع", description: "صانع محتوى رياضي (مدرب يرتدي قناعاً) يقدم نصائح عبر الفيديوهات القصيرة، تعرض لاعتداء مبرح من قبل مساعد التصوير بحجة الدفاع عن النفس.", accused: "مساعد التصوير", victim: "المدرب المقنع (صانع محتوى)", location: "صالة الألعاب الرياضية",
        spots: [
            { id: "s1", x: 50, y: 55, ev: { id: "e8_1", name: "وزن حديدي", desc: "دمبل بوزن 20 كجم عليه آثار دماء المدرب، استُخدم كأداة هجوم.", strength: "strong" } },
            { id: "s2", x: 25, y: 45, ev: { id: "e8_2", name: "كراسة التمارين", desc: "جدول تصوير اليوم يتضمن: تمرين ضغط، ثم ثبات بلانك (Plank) لمدة دقيقتين.", strength: "weak" } },
            { id: "s3", x: 80, y: 25, ev: { id: "e8_3", name: "المقطع الخام", desc: "مقطع فيديو غير ممنتج يُظهر المدرب في وضعية تمرين البلانك (Plank) ووجهه للأرض لحظة بدء الشجار.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "المتهم يدعي أنه ضرب المدرب بالوزن الحديدي دفاعاً عن النفس لأن المدرب ذو بنية عضلية ضخمة وهاجمه أولاً." },
            { speaker: "witness", text: "سيدي، المدرب وحش كاسر! التفت إليّ فجأة وحاول خنقي، فلم أجد سبيلاً سوى ضربه بالدمبل لأنجو بحياتي!" },
            { speaker: "judge", text: "هل يمتلك الدفاع دليلاً يثبت زيف ادعاء 'الدفاع عن النفس' المزعوم؟" },
            { speaker: "action", type: "present", correctEv: "e8_3", failMsg: "كون المدرب كان يصور كراسة التمارين لا ينفي أنه قد يغضب ويهاجم المساعد.", successMsg: "عذراً! المقطع الخام يثبت أن المدرب كان في وضعية 'البلانك' ووجهه للأرض، ويداه مقيدتان بالثبات لحظة تلقيه الضربة! لم يهاجمك أبداً، بل كان في أضعف وضعية دفاعية، وأنت غدرت به!" }
        ],
        finalArgument: { text: "ما هو الدافع الحقيقي لهذا الهجوم الغادر؟", options: [ { text: "سرقة معدات التصوير باهظة الثمن وحسابات القناة.", correct: true, resultText: "تم إثبات نية السرقة العمد وإدانة المساعد بأقصى عقوبة." }, { text: "خلاف على أسلوب أداء التمارين الرياضية.", correct: false, resultText: "دافع غير منطقي لجريمة شروع في القتل. خسرت القضية." } ] }
    },
    {
        id: 9, title: "التوأم المتطابق", description: "جريمة سطو على محل مجوهرات فاره. شهود العيان يؤكدون إصراراً رؤية المتهم بوضوح يكسر واجهة العرض.", accused: "كريم (المعروف بكونه أعسر)", victim: "صائغ مجوهرات", location: "السوق التجاري",
        spots: [
            { id: "s1", x: 45, y: 65, ev: { id: "e9_1", name: "بصمات زجاجية", desc: "بصمات أصابع واضحة ليد (يمنى) فقط تضغط بقوة على واجهة العرض المكسورة.", strength: "strong" } },
            { id: "s2", x: 75, y: 45, ev: { id: "e9_2", name: "مقبض الخزنة", desc: "المقبض تم لفه بعنف باتجاه عقارب الساعة باستخدام قوة يد يمنى.", strength: "strong" } },
            { id: "s3", x: 25, y: 85, ev: { id: "e9_3", name: "ملف طبي عسكري", desc: "تقرير يثبت أن المتهم كريم 'أعسر' كلياً، ويعاني من ضعف شديد في أعصاب يده اليمنى.", strength: "weak" } }
        ],
        courtScript: [
            { speaker: "judge", text: "الشاهد يؤكد رؤية المتهم بشكل لا يقبل الشك نظراً للإضاءة الجيدة في السوق." },
            { speaker: "witness", text: "أعرف وجهه جيداً! لقد رأيته يرفع المطرقة بيده اليمنى ويهشم الزجاج ثم يفتح الخزنة بقوة لا تُصدق." },
            { speaker: "judge", text: "الدفاع، الأدلة البصرية قوية. هل لديك ما يبطل هذا التعرف الإيجابي؟" },
            { speaker: "action", type: "present", correctEv: "e9_3", failMsg: "مجرد وجود بصمات ليد يمنى لا يبرئ المتهم، قد يكون استخدم كلتا يديه.", successMsg: "المتهم 'أعسر' كلياً وتقاريره العسكرية تثبت ضمور أعصاب يده اليمنى! من المستحيل فيزيائياً أن ينفذ جريمة تتطلب كل هذه القوة العضلية بيده اليمنى حصراً كما وصف الشاهد!" }
        ],
        finalArgument: { text: "إذا لم يكن كريم هو الجاني رغم تطابق الملامح، فمن يكون السارق؟", options: [ { text: "مجرد شخص عابر يشبهه في الملامح بالصدفة البحتة.", correct: false, resultText: "استنتاج ضعيف يعتمد على الصدفة، المحكمة غير مقتنعة." }, { text: "شقيقه التوأم المتطابق الذي يستخدم يده اليمنى (الأيمن).", correct: true, resultText: "تم استدعاء التوأم ومطابقة البصمات الجينية والإيقاع به!" } ] }
    },
    {
        id: 10, title: "الفساد الأخير", description: "عمدة المدينة الفاسد لفق تهمة تشهير ورشوة لصحفي استقصائي حر. هيئة المحكمة تبدو منحازة والعمدة يبتسم بثقة.", accused: "الصحفي الاستقصائي الحر", victim: "عمدة المدينة", location: "مكتب العمدة",
        spots: [
            { id: "s1", x: 55, y: 55, ev: { id: "e10_1", name: "ظرف مشبوه", desc: "ظرف فارغ يحمل ختم بنك دولي، تم العثور عليه في درج العمدة.", strength: "weak" } },
            { id: "s2", x: 35, y: 35, ev: { id: "e10_2", name: "تسجيل مسرب", desc: "شريط كاسيت مخفي يحتوي تسجيلاً للعمدة يهدد الصحفي ويطلب تحويل الأموال لحساب أجنبي.", strength: "strong" } },
            { id: "s3", x: 85, y: 85, ev: { id: "e10_3", name: "تذكرة طيران VIP", desc: "تذكرة سفر ذهاب بلا عودة إلى جنيف باسم العمدة، محجوزة فجر الغد.", strength: "strong" } }
        ],
        courtScript: [
            { speaker: "judge", text: "أيها الصحفي، أنت تقف متهماً بتهمة الخيانة وتلفيق الأكاذيب ضد السيد العمدة الموقر. الأدلة ضدك قاسية." },
            { speaker: "witness", text: "هذا الصحفي الحاقد حاول ابتزازي، ولما رفضت الخضوع له، قام بتأليف هذه الروايات لتدمير مسيرتي السياسية الناصعة." },
            { speaker: "judge", text: "الدفاع، هذه فرصتك الأخيرة. قدم دليلاً يقلب الموازين أو استعد لتلاوة الحكم المغلظ." },
            { speaker: "action", type: "present", correctEv: "e10_2", failMsg: "مجرد تذكرة طيران لا تثبت تهمة الفساد والرشوة، قد تكون رحلة عمل طبيعية للعمدة الموقر.", successMsg: "المسيرة الناصعة؟ تفضلوا بالاستماع لهذا الشريط السري... (يتم تشغيل الصوت) العمدة يطلب الرشوة بنفسه ويهدد الصحفي بتلفيق تهمة له إن لم يصمت!" }
        ],
        finalArgument: { text: "العمدة يرتجف ويدعي أن التسجيل مفبرك بالذكاء الاصطناعي. كيف نثبت للمحكمة إدانته ونيته المسبقة للهرب؟", options: [ { text: "تقديم (تذكرة الطيران) كدليل قاطع على نية الهروب ومغادرة البلاد الليلة هرباً من الفضيحة.", correct: true, resultText: "القاضي يصدر أمر قبض فوري ضد العمدة! لقد طهرت المدينة من الفساد، واستحققت لقب: المحامي الأخير." }, { text: "التوسل لهيئة المحلفين للنظر في النوايا الحسنة للصحفي.", correct: false, resultText: "هيئة المحلفين المنحازة لم تستجب لنداء العاطفة، وسُجن الصحفي البطل." } ] }
    }
];

const ACHIEVEMENTS_DATA = [
    { id: "novice", title: "مبتدئ المهنة", desc: "تم حل أول قضية استقصائية بنجاح." },
    { id: "genius", title: "عين الصقر", desc: "تم العثور على جميع الأدلة الجنائية في مسرح الجريمة." },
    { id: "flawless", title: "المحامي الماكر", desc: "كسبت المحاكمة دون تقديم أي اعتراض خاطئ أو تضليل للمحكمة." },
    { id: "legend", title: "المحامي الأخير", desc: "طهرت المدينة وأكملت جميع الملفات العشرة المعقدة." }
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
        case 'click': playTone(500, 'sine', 0.08, 0.03); break;
        case 'evidence': playTone(800, 'sine', 0.1, 0.05); setTimeout(()=>playTone(1200, 'sine', 0.15, 0.05), 80); break;
        case 'success': playTone(523, 'triangle', 0.15, 0.05); setTimeout(()=>playTone(659, 'triangle', 0.15, 0.05), 150); setTimeout(()=>playTone(783, 'triangle', 0.3, 0.05), 300); break;
        case 'fail': playTone(200, 'sawtooth', 0.2, 0.08); setTimeout(()=>playTone(150, 'sawtooth', 0.3, 0.08), 200); break;
        case 'objection': playTone(600, 'square', 0.1, 0.1); setTimeout(()=>playTone(400, 'sawtooth', 0.4, 0.1), 80); break;
    }
}

document.getElementById('sound-toggle').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('sound-toggle');
    btn.innerHTML = soundEnabled ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>` : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
});

function saveGame() {
    try { localStorage.setItem('lastArgument_Elite', JSON.stringify({ unlockedCases: state.unlockedCases, solvedCases: state.solvedCases, stats: state.stats, achievements: state.achievements })); } catch(e) {}
}
function loadGame() {
    try {
        const saved = localStorage.getItem('lastArgument_Elite');
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
    setTimeout(() => { t.style.animation = "slideDown 0.3s ease reverse forwards"; setTimeout(() => t.remove(), 300); }, 3500);
}

function grantAchievement(id) {
    if(state.achievements.includes(id)) return;
    state.achievements.push(id); saveGame(); playSound('success');
    const ach = ACHIEVEMENTS_DATA.find(a => a.id === id);
    const container = document.getElementById('achievement-container');
    const t = document.createElement('div');
    t.className = 'achievement-toast';
    t.innerHTML = `<div style="font-size:1.8rem; margin-left:10px;">🏆</div><div class="ach-text"><h4>إنجاز: ${ach.title}</h4><p>${ach.desc}</p></div>`;
    container.appendChild(t);
    setTimeout(() => { t.style.animation = "slideUp 0.4s ease reverse forwards"; setTimeout(() => t.remove(), 400); }, 4500);
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
        card.innerHTML = `<h3>ملف #${c.id}: ${c.title}</h3><p>${isLocked ? '🔒 الملف مشفر، يتطلب كفاءة أعلى (حل القضايا السابقة).' : c.description}</p>${isSolved ? '<span class="case-status">✓ قضية مغلقة</span>' : ''}`;
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
        showToast("اكتملت الأدلة! المحكمة بانتظارك."); grantAchievement('genius');
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
    document.getElementById('modal-case-body').innerHTML = `<p>المتهم: <strong>${c.accused}</strong></p><p>الضحية: <strong>${c.victim}</strong></p><p>مسرح الجريمة: <strong>${c.location}</strong></p><hr><p>${c.description}</p>`;
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
        div.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg> ${ev.name}`;
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
        appendChat('judge', 'سيادة القاضي', 'هل يمتلك الدفاع دليلاً قاطعاً يكشف التناقض الجنائي في هذه الشهادة؟');
    } else {
        nextBtn.classList.remove('hidden'); presentAction.classList.add('hidden');
        const isJudge = step.speaker === 'judge';
        appendChat(isJudge ? 'judge' : 'witness', isJudge ? 'سيادة القاضي' : 'الشاهد / الخصم', step.text);
        playSound('click');
        
        nextBtn.innerHTML = `<span>متابعة الاستجواب</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
        nextBtn.onclick = nextCourtStep;
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
    const nextBtn = document.getElementById('next-dialogue-btn');
    const box = document.getElementById('dialogue-box');
    
    if(ev.id === step.correctEv) {
        playSound('objection'); appendChat('lawyer', 'أنت (الدفاع)', `اعتراض! الدليل الجنائي "${ev.name}" يثبت العكس: ${step.successMsg}`);
        
        setTimeout(() => {
            nextBtn.innerHTML = `<span>متابعة الجلسة</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
            nextBtn.classList.remove('hidden');
            nextBtn.onclick = () => { state.courtStepIndex++; processCourtDialogue(); };
            state.isProcessingLogic = false;
            box.scrollTop = box.scrollHeight;
        }, 800);
        
    } else {
        playSound('fail'); state.perfectCurrentCase = false; state.attemptsLeft--; state.judgeConfidence -= 34; updateCourtUI();
        appendChat('lawyer', 'أنت (الدفاع)', `سيدي القاضي، أرجو التركيز على الدليل: "${ev.name}"...`);
        
        setTimeout(() => {
            box.classList.add('shake-anim'); setTimeout(()=>box.classList.remove('shake-anim'), 450);
            appendChat('error', 'سيادة القاضي', step.failMsg + " (خصم من ثقة المحكمة بتوجهك).");
            
            if(state.attemptsLeft <= 0) {
                setTimeout(() => finishCase(false, "تم طردك من القاعة بتهمة تضليل العدالة والقصور المهني."), 2000);
            } else {
                nextBtn.innerHTML = `<span>محاولة أخرى</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 1 0 2.13-5.85L21 8"></path></svg>`;
                nextBtn.classList.remove('hidden');
                nextBtn.onclick = () => {
                    nextBtn.classList.add('hidden');
                    document.getElementById('court-present-action').classList.remove('hidden');
                    box.scrollTop = box.scrollHeight;
                };
                state.isProcessingLogic = false;
                box.scrollTop = box.scrollHeight;
            }
        }, 1200);
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
        if(time <= 0) { clearInterval(finalTimerInterval); finishCase(false, "انتهت مهلة المرافعة! رُفضت دعواك لعدم الجاهزية."); }
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
    
    document.getElementById('result-title').innerText = isWin ? "نطق الحكم - براءة" : "نطق الحكم - إدانة الموكل";
    document.getElementById('result-title').style.color = isWin ? "var(--success)" : "var(--danger)";
    document.getElementById('result-icon-container').innerHTML = isWin ? `<svg viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` : `<svg viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    document.getElementById('result-icon-container').style.borderColor = isWin ? "var(--success)" : "var(--danger)";
    document.getElementById('result-desc').innerText = desc;
    document.getElementById('result-stats-details').innerHTML = `<p><span>الملفات المغلقة:</span> <strong>${state.solvedCases.length} / ${ALL_CASES.length}</strong></p><p><span>تقييم الأداء:</span> <strong style="color:${isWin?'var(--success)':'var(--danger)'}">${state.perfectCurrentCase && isWin ? 'كفاءة احترافية ⭐⭐⭐' : (isWin ? 'أداء مقبول ⭐⭐' : 'فشل مهني ❌')}</strong></p>`;
    showScreen('result-screen');
}

function renderStats() {
    document.getElementById('stats-grid').innerHTML = `<div class="stat-box"><h3>${state.stats.wins}</h3><p>قضايا تم كسبها</p></div><div class="stat-box"><h3>${state.stats.losses}</h3><p>قضايا خاسرة</p></div><div class="stat-box"><h3>${state.stats.perfectCases}</h3><p>مرافعات مثالية</p></div><div class="stat-box"><h3>${Math.round((state.solvedCases.length / ALL_CASES.length) * 100)}%</h3><p>معدل الإنجاز</p></div>`;
    const achList = document.getElementById('achievements-list'); achList.innerHTML = '';
    ACHIEVEMENTS_DATA.forEach(a => {
        const unlocked = state.achievements.includes(a.id);
        achList.innerHTML += `<div class="ach-item ${unlocked ? 'unlocked' : ''}"><div class="ach-icon">🏆</div><div><h4 style="color:${unlocked?'var(--gold)':'#777'};">${a.title}</h4><p>${unlocked ? a.desc : 'محجوب حتى يتم الاستحقاق...'}</p></div></div>`;
    });
    if(!navigator.share) document.getElementById('share-btn').style.display = 'none';
}

function shareStats() {
    if(navigator.share) navigator.share({ title: 'المحامي الأخير', text: `تمكنت من كسب ${state.solvedCases.length} قضية معقدة في أروقة المحامي الأخير! هل تجرؤ على كشف الحقيقة؟`, url: window.location.href }).catch(()=>{});
}

window.onload = () => {
    loadGame();
    document.addEventListener('touchmove', function(e) { if(!e.target.closest('.scrollable-content') && !e.target.closest('.evidence-tray') && !e.target.closest('.modal-content')) e.preventDefault(); }, { passive: false });
};

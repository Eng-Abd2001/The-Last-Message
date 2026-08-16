const GameCases = {
    case_01: {
        id: 'case_01',
        title: 'اختفاء أحمد',
        description: 'اختفى أحمد فجأة تاركاً هاتفه. اكتشف سره المظلم.',
        
        // الأدلة الأربعة اللازمة للحل الكامل (Perfect Ending)
        requiredEvidence: ['ev_boss_threat', 'ev_wife_hint', 'ev_secret_file', 'ev_car_plate'],
        
        characters: {
            wife: { name: 'سارة', phone: '+964 770 123 4567', relation: 'زوجة', avatar: '👩' },
            boss: { name: 'المدير محمود', phone: '+964 780 987 6543', relation: 'مدير الشركة', avatar: '👨‍💼' },
            colleague: { name: 'طارق', phone: '+964 750 111 2222', relation: 'زميل عمل', avatar: '👨‍💻' },
            unknown: { name: 'رقم مجهول', phone: 'غير معروف', relation: 'مجهول', avatar: '❓' }
        },

        appsData: {
            messages: [
                {
                    contactId: 'wife',
                    preview: 'لماذا لم تعد للمنزل حتى الآن؟',
                    thread: [
                        { type: 'received', text: 'أحمد، تأخرت جداً. العشاء برد.', time: '20:15' },
                        { type: 'sent', text: 'آسف يا سارة، وجدت شيئاً خطيراً في حسابات الشركة.', time: '20:20' },
                        { type: 'received', text: 'أرجوك لا تتدخل، محمود رجل خطير.', time: '20:25' },
                        { type: 'sent', text: 'سأقوم بضغط الملفات وحمايتها بكلمة سر. ستكون (سنة زواجنا).', time: '20:30', isClue: true, clueId: 'ev_wife_hint', clueDesc: 'تلميح لفك التشفير: سنة الزواج (ابحث في الملاحظات).' }
                    ]
                },
                {
                    contactId: 'boss',
                    preview: 'تعال فوراً.',
                    thread: [
                        { type: 'received', text: 'أحمد، هل كنت تعبث بملفات الربع الأخير؟', time: '21:00' },
                        { type: 'sent', text: 'سيدي، هناك نقص بقيمة مليون دولار غير مبرر.', time: '21:05' },
                        { type: 'received', text: 'إياك أن تتحدث لأحد. تعال إلى المستودع القديم الساعة 10 مساءً. وحدك!', time: '21:10', isClue: true, clueId: 'ev_boss_threat', clueDesc: 'رسالة تهديد ومكان لقاء سري.' }
                    ]
                }
            ],
            
            gallery: [
                { 
                    id: 'img1', 
                    title: 'صورة شخصية', 
                    visual: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', 
                    emoji: '🌅', 
                    caption: 'غروب الشمس في مدينتي.', 
                    hasClue: false 
                },
                { 
                    id: 'img2', 
                    title: 'سيارة مشبوهة', 
                    visual: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)', 
                    emoji: '🚘', 
                    caption: 'سيارة سوداء تقف أمام المستودع.. لوحة التسجيل: (ق م 7484).', 
                    hasClue: true, 
                    clueId: 'ev_car_plate', 
                    clueDesc: 'رقم لوحة سيارة المدير متواجدة في مسرح الجريمة.' 
                },
                { 
                    id: 'img3', 
                    title: 'مستند مصور', 
                    visual: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', 
                    emoji: '📄', 
                    caption: 'صورة لجدول أعمال فارغ.', 
                    hasClue: false 
                }
            ],

            notes: [
                { title: 'يوميات', text: 'تاريخ زواجي من سارة: 2018. أحلى يوم بحياتي.' },
                { title: 'قائمة التسوق', text: '- حليب\n- خبز\n- قهوة' }
            ],

            files: [
                { name: 'تقرير_المبيعات_2023.pdf', type: 'open', content: 'تقرير عادي لعام 2023. الأرباح مستقرة.' },
                { name: 'Backup_Secret.zip', type: 'locked', password: '2018', content: 'تم الفتح! الملف يحتوي على تحويلات بنكية سرية باسم (محمود).', isClue: true, clueId: 'ev_secret_file', clueDesc: 'دليل قاطع على اختلاس الأموال.' }
            ],

            calls: [
                { name: 'المدير محمود', type: 'missed', time: '21:45', duration: 'لم يرد' },
                { name: 'سارة', type: 'incoming', time: '19:30', duration: '5:23' }
            ],

            browser: [
                { title: 'كيفية الإبلاغ عن غسيل الأموال مجهول الهوية', url: 'www.legal-help.com/report' },
                { title: 'حجز تذاكر طيران رخيصة', url: 'www.cheap-flights.com' }
            ]
        },

        suspects: [
            { id: 'wife', name: 'سارة (الزوجة)' },
            { id: 'boss', name: 'محمود (المدير)' },
            { id: 'colleague', name: 'طارق (الزميل)' }
        ],

        endings: {
            perfect: {
                title: 'قضية محلولة بامتياز! 🌟',
                text: 'استخدمت التلميح (سنة الزواج) لفتح الملف السري، وعثرت على رسالة التهديد، ووجدت صورة سيارة المدير في المستودع. الشرطة داهمت المكان وتم القبض على المدير محمود وإنقاذ أحمد.'
            },
            partial: {
                title: 'إدانة غير مكتملة ⚠️',
                text: 'اتهمت المدير محمود لكنك لم تعثر على كافة الأدلة (الملف السري المحمي، أو صورة السيارة). محامي المدير استطاع إخراجه بكفالة لعدم كفاية الأدلة.'
            },
            wrong: {
                title: 'اتهام باطل ❌',
                text: 'لقد اتهمت الشخص الخطأ! استغل المجرم الحقيقي انشغال الشرطة وهرب خارج البلاد. تم تقييد القضية ضد مجهول.'
            }
        }
    }
};

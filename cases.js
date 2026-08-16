const GameCases = {
    case_01: {
        id: 'case_01',
        title: 'اختفاء أحمد',
        description: 'اختفى أحمد فجأة تاركاً هاتفه. اكتشف سره المظلم.',
        requiredEvidenceForPerfect: ['ev_boss_threat', 'ev_secret_file', 'ev_wife_fight'],
        
        characters: {
            boss: { name: 'المدير محمود', avatar: '👨‍💼' },
            wife: { name: 'سارة (زوجتي)', avatar: '👩' },
            colleague: { name: 'طارق', avatar: '👨‍💻' },
            unknown: { name: 'رقم مجهول', avatar: '❓' }
        },

        appsData: {
            messages: [
                {
                    contactId: 'wife',
                    preview: 'لماذا لم تعد للمنزل حتى الآن؟',
                    thread: [
                        { type: 'received', text: 'أحمد، تأخرت جداً. العشاء برد.', time: '20:15' },
                        { type: 'sent', text: 'آسف يا سارة، وجدت شيئاً غريباً في حسابات الشركة. يجب أن أتأكد منه.', time: '20:20' },
                        { type: 'received', text: 'أرجوك لا تتدخل في ما لا يعنيك، محمود رجل خطير.', time: '20:25' },
                        { type: 'sent', text: 'سأنسخ الملفات للقرص الصلب. سأضع كلمة مرور لها (سنة زواجنا).', time: '20:30', isClue: true, clueId: 'ev_wife_fight', clueDesc: 'تلميح لكلمة المرور: سنة الزواج' }
                    ]
                },
                {
                    contactId: 'boss',
                    preview: 'تعال فوراً.',
                    thread: [
                        { type: 'received', text: 'أحمد، هل كنت تعبث بملفات الربع الأخير؟', time: '21:00' },
                        { type: 'sent', text: 'سيدي، هناك نقص بقيمة مليون دولار غير مبرر.', time: '21:05' },
                        { type: 'received', text: 'تعال إلى المستودع القديم في المنطقة الصناعية الساعة 10 مساءً. وحدك.', time: '21:10', isClue: true, clueId: 'ev_boss_threat', clueDesc: 'رسالة تهديد ومكان لقاء سري مع المدير.' }
                    ]
                }
            ],
            notes: [
                { title: 'ملاحظة سريعة', text: 'تاريخ زواجي من سارة: 2018. أحلى يوم بحياتي.' },
                { title: 'أشياء يجب شراؤها', text: '- حليب\n- خبز\n- قهوة' }
            ],
            files: [
                { name: 'تقرير_المبيعات.pdf', type: 'open', content: 'تقرير عادي لعام 2023. لا شيء مثير للاهتمام.' },
                { name: 'حسابات_سرية.zip', type: 'locked', password: '2018', content: 'ملفات مسربة تثبت قيام (المدير محمود) بتحويل أموال الشركة لحساباته في الخارج.', isClue: true, clueId: 'ev_secret_file', clueDesc: 'دليل قاطع على اختلاس المدير محمود.' }
            ],
            calls: [
                { name: 'المدير محمود', type: 'missed', time: '21:45', duration: 'لم يرد' },
                { name: 'سارة (زوجتي)', type: 'incoming', time: '19:30', duration: '5:23' }
            ],
            browser: [
                { title: 'كيفية الإبلاغ عن غسيل الأموال مجهول الهوية', url: 'www.legal-help.com' },
                { title: 'رحلات طيران رخيصة غداً', url: 'www.flights.com' }
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
                text: 'جمعت كل الأدلة. كلمة السر (2018) كشفت ملف الاختلاس، ورسالة التهديد حددت المكان. الشرطة داهمت المستودع وأنقذت أحمد واعتقلت المدير محمود.'
            },
            partial: {
                title: 'إدانة غير مكتملة ⚠️',
                text: 'اتهمت المدير محمود لكنك لم تعثر على (الملف السري) المحمي بكلمة سر. أنكر المدير كل شيء لعدم كفاية الأدلة.'
            },
            wrong: {
                title: 'اتهام باطل ❌',
                text: 'لقد اتهمت الشخص الخطأ. استغل المجرم الحقيقي الوقت للهروب مع الأموال، وتم تقييد القضية ضد مجهول.'
            },
            mystery: {
                title: 'لغز لم يُحل ❓',
                text: 'لم تجمع أدلة كافية لاتخاذ قرار. ملف القضية سيُحفظ في الأرشيف.'
            }
        }
    }
};

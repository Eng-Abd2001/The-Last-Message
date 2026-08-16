const screens = document.querySelectorAll(".screen");

function showScreen(id) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}


// البيانات

const cases = [

{
    title: "قضية الساعة المفقودة",

    description:
    "اتهم رجل بسرقة ساعة ثمينة من منزل رجل أعمال. الشرطة وجدت الساعة داخل منزله، لكن هناك تفاصيل غير منطقية.",


    objects:[

        {
            name:"غرفة المنزل",
            evidence:
            "آثار أقدام قرب النافذة لا تطابق حذاء المتهم."
        },

        {
            name:"تقرير الشرطة",
            evidence:
            "وقت السرقة حسب التقرير: الساعة 10 مساءً."
        },

        {
            name:"كاميرا المراقبة",
            evidence:
            "الكاميرا توقفت عن العمل قبل السرقة بـ 15 دقيقة."
        },

        {
            name:"الساعة",
            evidence:
            "وجدت الساعة لكنها كانت نظيفة بشكل غريب بدون بصمات."
        }

    ],


    witness:{

        name:"حارس المنزل",

        statements:[

            {
                text:
                "رأيت المتهم بالقرب من المنزل ليلة الحادث.",
                correct:false
            },

            {
                text:
                "الكاميرا كانت تعمل طوال الليل.",
                correct:false
            },

            {
                text:
                "شخص آخر دخل المنزل قبل وصول الشرطة.",
                correct:true
            }

        ]

    },


    finals:[

        {
            text:
            "الساعة زرعت داخل المنزل لإدانة المتهم.",
            success:true
        },

        {
            text:
            "المتهم اعترف ضمنياً بالجريمة.",
            success:false
        },

        {
            text:
            "يجب الحكم عليه لأن الدليل موجود.",
            success:false
        }

    ]

},


{


title:"قضية الرسالة الغامضة",

description:
"متهم بإرسال رسالة تهديد. الشرطة تقول إن الرسالة خرجت من هاتفه، لكن الحقيقة مخفية.",


objects:[

{
name:"الهاتف",
evidence:
"الهاتف كان مع شخص آخر وقت إرسال الرسالة."
},

{
name:"الرسالة",
evidence:
"الرسالة كتبت بأسلوب مختلف عن أسلوب المتهم."
},

{
name:"الشاهد",
evidence:
"الشاهد سمع المتهم يتحدث عن المشكلة."
},

{
name:"السجل",
evidence:
"هناك اتصال مجهول قبل إرسال الرسالة."
}

],


witness:{

name:"صديق المتهم",

statements:[

{
text:
"المتهم كان غاضباً جداً ذلك اليوم.",
correct:false
},

{
text:
"أعطى هاتفه لشخص آخر لفترة قصيرة.",
correct:true
},

{
text:
"هو من كتب الرسالة بالتأكيد.",
correct:false
}

]

},


finals:[

{
text:
"وجود الهاتف لا يعني أن المتهم هو الكاتب.",
success:true
},

{
text:
"الغضب دليل كافٍ للإدانة.",
success:false
},

{
text:
"يجب تجاهل الأدلة الأخرى.",
success:false
}

]

}

];



let currentCase = 0;
let collectedEvidence = [];
let trust = 50;
let solved = 0;



const startBtn =
document.getElementById("start-btn");

const investigateBtn =
document.getElementById("investigate-btn");

const courtBtn =
document.getElementById("court-btn");

const finalBtn =
document.getElementById("final-btn");

const restartBtn =
document.getElementById("restart-btn");



startBtn.onclick = function(){

    loadCase();

    showScreen("case-screen");

};



function loadCase(){

    let data = cases[currentCase];

    document.getElementById("case-title").innerText =
    data.title;


    document.getElementById("case-description").innerText =
    data.description;


}



investigateBtn.onclick=function(){

    startInvestigation();

    showScreen("investigation-screen");

};



function startInvestigation(){

    collectedEvidence=[];

    let data=cases[currentCase];


    document.getElementById("investigation-text").innerText =
    "افحص الأماكن والأشياء وابحث عن التناقضات.";


    let container =
    document.getElementById("objects-container");


    container.innerHTML="";


    data.objects.forEach((obj,index)=>{


        let div=document.createElement("div");

        div.className="object";

        div.innerText=obj.name;


        div.onclick=function(){

            collectEvidence(index);

        };


        container.appendChild(div);


    });


}
function collectEvidence(index){

    let data = cases[currentCase];

    let evidence = data.objects[index].evidence;


    if(!collectedEvidence.includes(evidence)){

        collectedEvidence.push(evidence);


        let box =
        document.createElement("div");

        box.className="evidence-item";

        box.innerText=evidence;


        document
        .getElementById("evidence-list")
        .appendChild(box);


    }


    if(collectedEvidence.length >= 3){

        courtBtn.disabled=false;

    }

}



courtBtn.onclick=function(){

    loadCourt();

    showScreen("court-screen");

};



function loadCourt(){

    let data=cases[currentCase];


    document.getElementById("witness-name").innerText =
    data.witness.name;


    document.getElementById("witness-text").innerText =
    "استجوب الشاهد واختر الحجة المناسبة.";


    let box =
    document.getElementById("argument-options");


    box.innerHTML="";


    data.witness.statements.forEach(statement=>{


        let btn=document.createElement("button");


        btn.className="argument-btn";


        btn.innerText=statement.text;


        btn.onclick=function(){

            checkArgument(statement.correct,btn);

        };


        box.appendChild(btn);


    });


}



function checkArgument(correct,button){


    if(correct){

        trust+=20;

        document.getElementById("judge-message").innerText =
        "حجة قوية، يوجد تناقض في القضية.";

    }

    else{

        trust-=15;

        document.getElementById("judge-message").innerText =
        "هذه الحجة لم تقنع المحكمة.";

    }


    if(trust<0){

        trust=0;

    }


    if(trust>100){

        trust=100;

    }


    document.getElementById("trust-value").innerText =
    trust+"%";


    button.disabled=true;


    finalBtn.disabled=false;


}



finalBtn.onclick=function(){

    loadFinal();

    showScreen("final-screen");

};



function loadFinal(){

    let data=cases[currentCase];


    let container =
    document.getElementById("final-options");


    container.innerHTML="";


    data.finals.forEach(option=>{


        let btn=document.createElement("button");


        btn.className="final-choice";


        btn.innerText=option.text;


        btn.onclick=function(){

            finishCase(option.success);

        };


        container.appendChild(btn);


    });


}



function finishCase(success){


    showScreen("result-screen");


    let title =
    document.getElementById("result-title");


    let text =
    document.getElementById("result-text");



    if(success && trust>=50){


        title.innerText="تمت تبرئة المتهم";

        text.innerText=
        "اكتشفت الحقيقة وقدمت دليلاً قلب القضية.";

        solved++;


    }

    else{


        title.innerText="خسرت القضية";

        text.innerText=
        "لم تستطع إقناع المحكمة بالحقيقة.";


    }



    saveProgress();


    document.getElementById("solved-count").innerText =
    solved;


    let rate =
    Math.round((solved/(currentCase+1))*100);


    document.getElementById("success-rate").innerText =
    rate+"%";


}



function saveProgress(){

    localStorage.setItem(
        "lastArgumentSolved",
        solved
    );

}



function loadProgress(){

    let data =
    localStorage.getItem("lastArgumentSolved");


    if(data){

        solved=parseInt(data);

    }

}


restartBtn.onclick=function(){


    currentCase++;


    if(currentCase>=cases.length){

        currentCase=0;

    }


    trust=50;


    document.getElementById("trust-value").innerText="50%";


    document.getElementById("evidence-list").innerHTML="";


    courtBtn.disabled=true;

    finalBtn.disabled=true;


    loadCase();


    showScreen("case-screen");


};



loadProgress();
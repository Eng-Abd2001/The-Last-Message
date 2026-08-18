const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const LS="oof_save_v1";
const chapters=[
 ["THE ROOM","الغرفة","تعلم أن العالم لا يبقى كما تراه."],
 ["THE BLIND SPOT","النقطة العمياء","الأشياء تتغير عندما تخرج من نظرك."],
 ["THE WATCHER","المراقب","المراقبة نفسها أصبحت جزءاً من اللغز."],
 ["FALSE MEMORY","ذاكرة زائفة","هل تتذكر الغرفة كما كانت فعلاً؟"],
 ["THE OBSERVER","المراقِب","لم تعد أنت وحدك من يراقب."],
 ["OUT OF FRAME","خارج المشهد","كل ما تعلمته يعود ضدك."]
];
const levelNames=[
"الغرفة الهادئة","الساعة","الكرسي","النافذة","المفتاح","الباب","الصورة","النظرة الأولى","خارج الإطار","الصمت",
"النقطة العمياء","الكرسي الآخر","ما بعد الباب","الحركة","العودة","الممر","عين الغرفة","الدقيقة الناقصة","الظل","الاختفاء",
"المراقب","لا تلتفت","الوجه","المسافة","المرآة","المشهد الثاني","الصوت","الباب الذي يتذكر","الواقف","الخطأ",
"ذاكرة زائفة","الغرفة القديمة","الساعة المعكوسة","أثر","المكان نفسه","النافذة الأخرى","تكرار","ما نسيت","الكرسي الفارغ","الحقيقة الأولى",
"المراقِب","من ينظر؟","الغرفة الثالثة","الزائر","العدسة","خلفك","لا تثق","المشاهدة","الصورة الأخيرة","الصمت الثاني",
"خارج المشهد","القاعدة","الحد الفاصل","لا يوجد باب","ما تبقى","اللحظة","عين أخرى","العودة الأخيرة","المراقبة","النهاية"
];
let state=load(), current=0, viewX=0, viewY=0, drag=null, actionCount=0, watched={};
function defaults(){return{progress:0,done:[],stars:{},stats:{solved:0,attempts:0,hints:0,best:0},sound:true,motion:true,quality:"High",daily:{date:"",solved:false,score:null},ach:{}}}
function load(){try{return {...defaults(),...JSON.parse(localStorage.getItem(LS)||"{}")}}catch{return defaults()}}
function save(){try{localStorage.setItem(LS,JSON.stringify(state))}catch{}}
function show(id){$$(".screen").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active")}
function beep(freq=220,d=0.06){if(!state.sound)return;try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.frequency.value=freq;o.type="sine";g.gain.setValueAtTime(.035,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+d);o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+d)}catch{}}
function renderChapters(){const g=$("#chapterGrid");g.innerHTML="";chapters.forEach((c,i)=>{const unlocked=i===0||state.progress>=i*10;let done=state.done.filter(n=>n>=i*10&&n<(i+1)*10).length;const d=document.createElement("button");d.className="chapter"+(unlocked?"":" locked");d.innerHTML=`<b>${i+1}. ${c[1]}</b><small>${c[2]}</small><div class="progress"><i style="width:${done*10}%"></i></div>`;if(unlocked)d.onclick=()=>{renderLevels(i);show("levels")};g.appendChild(d)})}
function renderLevels(ci=0){$("#levelsTitle").textContent=`${chapters[ci][1]} — ${chapters[ci][0]}`;const g=$("#levelGrid");g.innerHTML="";for(let j=0;j<10;j++){let n=ci*10+j;let unlocked=n===0||state.done.includes(n-1)||n<=state.progress;const b=document.createElement("button");b.className="level "+(unlocked?"":"locked")+" "+(state.done.includes(n)?"done":"");b.innerHTML=`<b>${n+1}</b><small>${state.stars[n]||"☆☆☆"}</small>`;if(unlocked)b.onclick=()=>startLevel(n);g.appendChild(b)}}
function startLevel(n){current=n;actionCount=0;viewX=viewY=0;watched={};$("#gameLevel").textContent=String(n+1).padStart(2,"0");$("#gameChapter").textContent=chapters[Math.floor(n/10)][0];$("#levelHintText").textContent=hintFor(n,0);$("#levelHintText").classList.remove("show");$("#levelComplete").classList.remove("show");resetScene();show("game");beep(120,.08)}
function resetScene(){["figure","chair","key","door","painting","clock"].forEach(id=>$("#"+id).style.cssText="");$("#key").style.opacity="1";$("#door").style.transform="";$("#door").style.opacity="1";$("#figure").style.left="55%";$("#figure").style.opacity="1";$("#chair").style.left="43%";$("#painting").style.transform="";$("#clock").style.transform="";actionCount=0;updateCamera()}
function updateCamera(){const room=$("#scene .room");room.style.transform=`translate(calc(-50% + ${viewX}px),calc(-48% + ${viewY}px)) ${window.innerWidth<430?"scale(.58)":window.innerWidth<700?"scale(.72)":"scale(1)"}`;const angle=Math.abs(viewX)>110;watched.side=angle?"right":"center";applyRule()}
function applyRule(){const n=current;let away=Math.abs(viewX)>90;let stage=n%10;
 if(stage===1&&!away){$("#clock").style.transform="rotate(0deg)"} if(stage===1&&away){$("#clock").style.transform="rotate(55deg)";$("#figure").style.left="60%"}
 if(stage===2&&away){$("#chair").style.left="48%"} 
 if(stage===3&&away){$("#painting").style.transform="translateX(-55px)";$("#key").style.opacity=".25"}
 if(stage===4&&away){$("#key").style.opacity="1";$("#key").style.transform="translate(20px,-8px)"}
 if(stage===5&&away){$("#door").style.transform="translateX(70px)";$("#door").style.opacity=".45"}
 if(stage===6&&away){$("#painting").style.transform="rotate(4deg) translateX(-35px)"}
 if(stage===7&&away){$("#figure").style.left="67%";$("#figure").style.opacity=".72"}
 if(stage===8&&away){$("#figure").style.left="46%";$("#chair").style.left="54%";$("#clock").style.transform="rotate(180deg)"}
 if(stage===9&&away){$("#door").style.transform="scale(.85)";$("#key").style.transform="translate(45px,-10px)"}
 if(n>=10&&stage===0&&away){$("#chair").style.left="54%";$("#key").style.opacity=".35"}
 if(n>=20&&away){$("#figure").style.left=`${42+(n%4)*7}%`;$("#clock").style.transform=`rotate(${(n*37)%360}deg)`}
 if(n>=30&&away){$("#painting").style.transform=`translateX(${(n%3-1)*45}px) rotate(${n%2?4:-4}deg)`}
 if(n>=40&&away){$("#figure").style.opacity=n%3===0?".25":"1";$("#door").style.opacity=n%2?".5":"1"}
 if(n>=50&&away){$("#chair").style.left=`${38+(n%5)*4}%`;$("#key").style.transform=`translate(${20+(n%4)*18}px,-12px)`}}
function hintFor(n,l){const s=n%10;const a=[
"ابدأ بمراقبة الغرفة قبل لمس أي شيء.","جرّب أن تبتعد عن الساعة ثم عد إليها.","راقب الكرسي من جهتين مختلفتين.","هناك شيء يتغير عندما لا تنظر إليه.",
"المفتاح لا يتصرف بالطريقة التي تتوقعها.","الباب يحتاج منك أن تفهم متى يكون موجوداً.","الصورة ليست ثابتة كما تبدو.","راقب الشخصية، ثم انظر بعيداً.","العودة إلى المكان نفسه قد لا تعيدك إلى المشهد نفسه.","استخدم ما تعلمته عن الغياب."
];return a[s]}
function complete(){if(state.done.includes(current))return;state.done.push(current);state.progress=Math.max(state.progress,current+1);state.stats.solved++;state.stats.attempts+=Math.max(1,actionCount);let stars=actionCount<=2?"⭐⭐⭐":actionCount<=4?"⭐⭐":"⭐";state.stars[current]=stars;save();$("#stars").textContent=stars.replaceAll("⭐","★").padEnd(3,"☆");$("#completeText").textContent=`أنهيت المرحلة ${current+1} في ${actionCount} حركات.`;$("#completeTitle").textContent=current===59?"الحقيقة خارج الإطار":"اكتشفت الحقيقة";$("#nextBtn").style.display=current<59?"":"none";$("#levelComplete").classList.add("show");beep(660,.18);setTimeout(()=>beep(880,.16),100)}
function action(){actionCount++;state.stats.attempts++;save();const stage=current%10;if((stage===0&&actionCount>=3)||(stage===1&&actionCount>=3)||(stage>=2&&actionCount>=2)){complete()}}
function showHint(){state.stats.hints++;save();const el=$("#levelHintText");el.textContent=hintFor(current,1);el.classList.add("show");setTimeout(()=>el.classList.remove("show"),3500);beep(300,.1)}
function renderStats(){const s=state.stats;$("#statsGrid").innerHTML=[["المراحل المكتملة",s.solved],["المحاولات",s.attempts],["التلميحات",s.hints],["أفضل نتيجة",s.best||"—"]].map(x=>`<div class="stat"><b>${x[1]}</b><small>${x[0]}</small></div>`).join("");const ach=[["FIRST TRUTH","أكمل أول لغز",s.solved>=1],["NO HELP","أكمل لغزاً بدون تلميح",s.hints===0&&s.solved>0],["OBSERVER","أكمل 30 مرحلة",s.solved>=30],["OUT OF FRAME","أكمل اللعبة",s.solved>=60]];$("#achievementGrid").innerHTML=ach.map(x=>`<div class="achievement ${x[2]?"unlocked":""}">◆ ${x[0]} — ${x[1]}</div>`).join("")}
function daily(){const date=new Date().toISOString().slice(0,10);let seed=[...date].reduce((a,c)=>a+c.charCodeAt(0),0);let nums=[seed%9,(seed*3)%9,(seed*7)%9];let q=["أي تغيير حدث عندما خرجت عن مجال الرؤية؟","أي عنصر يتصرف وفق قاعدة المراقبة؟","ما الذي لا يمكن الوثوق بثباته؟"][seed%3];let opts=["الشيء الذي لا تراقبه","العنصر الأقرب دائماً","كل شيء ثابت","لا شيء يتغير"];$("#dailyIntro").textContent=`لغز اليوم — ${date}`;$("#dailyPuzzle").innerHTML=`<div class="daily-question">${q}</div><div class="daily-options">${opts.map((o,i)=>`<button data-i="${i}">${o}</button>`).join("")}</div>`;$("#dailyShare").disabled=true;$$(".daily-options button").forEach(b=>b.onclick=()=>{let ok=+b.dataset.i===0;$$(".daily-options button").forEach(x=>x.disabled=true);b.classList.add(ok?"correct":"wrong");state.daily={date,solved:true,score:ok?100:0};save();$("#dailyShare").disabled=false;beep(ok?700:160,.15);b.insertAdjacentHTML("afterend",`<div class="result">${ok?"✓ الحقيقة اكتُشفت":"✕ الإجابة ليست صحيحة — جرّب غداً."}</div>`)});}
$("#startBtn").onclick=()=>{show("menu");renderChapters();beep(440,.08)}
$("#continueBtn").onclick=()=>startLevel(Math.min(state.progress,59));
$("#chaptersBtn").onclick=()=>{renderChapters();show("chapters")};
$("#dailyBtn").onclick=()=>{daily();show("daily")};
$("#statsBtn").onclick=()=>{renderStats();show("stats")};
$("#settingsBtn").onclick=()=>show("settings");
$("#howBtn").onclick=()=>show("how");
$$("[data-close]").forEach(b=>b.onclick=()=>show("menu"));
$("#backGame").onclick=()=>{show("menu");renderChapters()};
$("#restartBtn").onclick=()=>{resetScene();beep(170,.06)};
$("#undoBtn").onclick=()=>{viewX=viewY=0;updateCamera();beep(220,.05)};
$("#hintBtn").onclick=showHint;
$("#nextBtn").onclick=()=>startLevel(current+1);
$("#replayBtn").onclick=()=>startLevel(current);
$("#soundToggle").onchange=e=>{state.sound=e.target.checked;save()};
$("#motionToggle").onchange=e=>{state.motion=e.target.checked;document.body.classList.toggle("reduced",!state.motion);save()};
$("#quality").onchange=e=>{state.quality=e.target.value;save()};
$("#resetBtn").onclick=()=>{if(confirm("سيتم حذف كل تقدمك. هل أنت متأكد؟")){state=defaults();save();location.reload()}};
$("#dailyShare").onclick=async()=>{const t=`OUT OF FRAME — لغز اليوم\\n${state.daily.score===100?"✓ تم الحل":"✕ لم يُحل"}\\nلعبة خارج المشهد`;try{if(navigator.share)await navigator.share({title:"OUT OF FRAME",text:t});else await navigator.clipboard.writeText(t)}catch{}};
window.addEventListener("keydown",e=>{if(!$("#game").classList.contains("active"))return;let dx=0,dy=0;if(["ArrowLeft","a","A"].includes(e.key))dx=-30;if(["ArrowRight","d","D"].includes(e.key))dx=30;if(["ArrowUp","w","W"].includes(e.key))dy=-20;if(["ArrowDown","s","S"].includes(e.key))dy=20;if(dx||dy){e.preventDefault();viewX=Math.max(-220,Math.min(220,viewX+dx));viewY=Math.max(-120,Math.min(120,viewY+dy));updateCamera();action()}});
$("#scene").addEventListener("pointerdown",e=>{if(!$("#game").classList.contains("active"))return;drag={x:e.clientX,y:e.clientY};$("#scene").setPointerCapture?.(e.pointerId)});
$("#scene").addEventListener("pointermove",e=>{if(!drag)return;let dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>4){viewX=Math.max(-220,Math.min(220,viewX+dx*.55));viewY=Math.max(-120,Math.min(120,viewY+dy*.35));drag={x:e.clientX,y:e.clientY};updateCamera()}});
["pointerup","pointercancel"].forEach(ev=>$("#scene").addEventListener(ev,()=>{if(drag){drag=null;action()}}));
$("#soundToggle").checked=state.sound;$("#motionToggle").checked=state.motion;$("#quality").value=state.quality;document.body.classList.toggle("reduced",!state.motion);
setTimeout(()=>{if($("#splash").classList.contains("active"))show("menu")},2400);

/* ================= the quiet before: Monday begins without Ekskyysmi ================= */
// An ordinary morning and an ordinary shadow on the floor. Then the human has a plan, and the shadow gets up.
function preludeSettle(){
  var g=G,Hm=g.human,M=g.morko;g.chap=null;g.tics=[];g.skippable=false;
  Hm.gone=false;Hm.x=Hm.xT=HOME;Hm.facing=1;Hm.back=false;Hm.face='neutral';Hm.sipT=0;g.noCup=false;g.mugFixed=true;
  M.asleep=true;M.wake=0;M.s=M.sT=0.3;M.mood='calm';if(g.fade>0.4)g.fade=0.4;g.clock=8*3600+52*60+40;
}
function skipIntro(){var i=Q.indexOf(preludeSettle);if(i<0||!G.skippable)return;Q=Q.slice(i);WAIT=null;run();}
function wake(){var g=G,M=g.morko;M.asleep=false;M.sT=1.35;M.mood='surprised';g.flash=0.3;g.shake=RM?0:0.25;g.anx=0.55;sfx('startle');}
function scPrelude(){return [
  function(){var g=G,Hm=g.human,M=g.morko;music('intro');g.skippable=true;g.hud=false;g.clock=8*3600+51*60+20;
    Hm.gone=true;Hm.x=Hm.xT=1010;Hm.facing=-1;g.noCup=true;g.mugFixed=false;M.asleep=true;M.wake=0;M.s=M.sT=0.3;
    g.chap={day:CHAPTERS[1].day,title:CHAPTERS[1].title,t:0};sfx('card');},
  {wait:2.8},
  function(){G.chap=null;G.fade=1;G.fadeRate=0.36;},
  addTic('Monday, 8:52. Nobody here yet.',190,62,{at:1.6,life:4.2,size:19}),
  {wait:4.4},
  function(){var Hm=G.human;Hm.gone=false;Hm.xT=815;},
  {wait:2.1},
  function(){G.human.back=true;sfx('drip');},
  addTic('drip.',898,246,{life:1.1}),addTic('drip.',898,246,{at:0.8,life:1.1}),addTic('drip.',898,246,{at:1.6,life:1.1}),
  {wait:1.0},function(){sfx('drip');},{wait:0.8},function(){sfx('drip');},{wait:0.8},
  function(){var g=G,Hm=g.human;g.noCup=false;Hm.back=false;Hm.facing=-1;Hm.xT=704;},
  {wait:1.3},
  function(){G.human.facing=1;},
  addTic('(that handle.)',764,276,{life:1.5}),
  {wait:1.5},
  function(){G.mugFixed=true;sfx('clink');},
  addTic('(better.)',764,276,{life:1.5}),
  {wait:1.5},
  function(){var Hm=G.human;Hm.facing=-1;Hm.xT=HOME;},
  {wait:2.4},
  function(){G.human.facing=1;},{wait:0.7},
  function(){G.human.sipT=1;},{wait:1.0},
  function(){var Hm=G.human;Hm.sipT=0;Hm.face='smile';},{wait:1.5},
  preludeSettle,
  ['H','Today I’m going to ask Sanna to lunch.'],
  set({plan:1}),{wait:0.9},
  wake,{wait:1.3},
  ['S','…Sorry. WHAT are we doing today?'],
  ['H','Asking Sanna to lunch.'],
  ['S','It was going so well. Coffee. Warm light. No people. We are exceptionally good at mornings.'],
  ['H','It’s coffee.'],
  set({s:1,mood:'calm'})
];}

/* ---------- Lab: Colleagues. Ekskyysmi gets an “oh. hi.” of its own. ---------- */
function selfHit(){var g=G;sfx('hit');g.pulse=0.55;g.shake=RM?0:0.45;g.lines=[];g.cur=null;g.flash=0.5;g.morko.sT=0.8;g.morko.mood='scared';g.morko.pose=null;g.anx=0.7;}
function labColleagues(){return labScene({set:'room',title:'Colleagues.',plan:'Let the humans talk.',clock:13*3600+10*60}).concat([
  function(){var g=G;g.cowA=true;g.ax=g.axT=780;g.aFace=-1;},
  ['N','After lunch. Your human and Sanna are talking about a printer. It is going fine.'],
  ['S','Going fine. Nothing to prevent. I could get used to—'],
  function(){G.zT=1;},{wait:1.5},
  ['Z','oh. hi.'],
  selfHit,{wait:1.3},
  ['S','Did you hear that.'],
  ['H','I’m talking to Sanna. What are you doing?'],
  ['S','Her shadow greeted me. “Oh.” Full stop. “Hi.”'],
  ['H','It said hi.'],
  ['S','With a FULL STOP. Nobody puts a full stop after “oh” unless they mean it.'],
  {choice:[
    {t:'Greet it back. Formally.',then:[['S','Good afternoon. Ekskyysmi. Rejection prevention, third floor.'],['Z','…I know. We share a wall.'],['S','It KNOWS. It’s been watching.'],['H','You share a wall.']]},
    {t:'Pretend to be a coat.',then:[pokka,{wait:1.3},['Z','…I can see your eyes.'],['S','Coats have buttons.'],free,set({mood:'worry'})]},
    {t:'Review the “oh”. Frame by frame.',then:[['S','Exhibit A. “Oh.” Flat. Like a door closing.'],['H','You do realise what you’re doing.'],['S','Thorough work.'],['H','Monday. You’re doing Monday. To yourself.']]}
  ]}
 ],outside({title:'WHAT THE HUMANS NOTICED',dur:'duration: 40 seconds',cap:'Nothing. They were talking about a printer.',anim:'text'}),[
  function(){var g=G;g.morko.sT=1;g.morko.mood='worry';g.anx=0.2;},
  ['S','Could you… say something to it? For me.'],
  ['H','You want ME to talk to her shadow.'],
  ['S','You’re good with people.'],
  ['H','Since when?'],
  ['S','Since I started watching you do it.'],
  {wait:1.1},
  ['H','…Thank you.'],
  ['S','Don’t make it a thing.'],
  ['Z','Sorry about the “oh”. I never know if you want to be spoken to. You always look so busy.'],
  set({mood:'surprised'}),
  ['S','I AM busy.'],
  ['Z','Me too. Constantly.'],
  set({mood:'care'}),
  ['S','…Tuesday. By the radiator. We could be busy near each other.'],
  ['Z','I’ll check my archive.'],
  function(){G.zT=0;}
 ]);}

/* ---------- Lab: Not now. The one that is real. ---------- */
function labNotNow(){return labScene({set:'office',title:'Not now.',plan:'Suggest one thing.',clock:14*3600+20*60,cowR:1}).concat([
  ['N','A meeting. Riitta has eleven things on her list. It shows.'],
  ['H','What if we moved the deadline to Thursday?'],
  ['R','Not now. Can we stay on topic?'],
  hit(0.7,'R'),{wait:1.3},
  ['S','THERE. That one was real. I didn’t even need the glass.'],
  {choice:[
    {t:'Apologise for having ideas.',then:[['H','I’m not apologising for a sentence.'],['S','It was a LONG sentence. It had a Thursday in it.']]},
    {t:'New policy: never suggest anything again.',then:[['S','Effective immediately. No ideas. No deadlines. No Thursdays.'],['H','You can’t ban Thursdays.']]},
    {t:'Put it on record: I am not exaggerating.',then:[['S','For once I’d like it noted that I added nothing.'],['H','Noted.']]}
  ]},
  ['H','Yeah. That one was a bit sharp.'],
  set({mood:'surprised'}),
  ['S','…You agree?'],
  ['H','She was short with me. It happened.']
 ],outside({title:'WHAT HAPPENED',dur:'duration: 4 seconds',cap:'Riitta was short with you. She has eleven things on her list. You are not one of them.',anim:'text'}),[
  calm,
  ['S','So I was right.'],
  ['H','That it happened. Yes.'],
  ['S','And the size?'],
  ['H','You had it at “career over”.'],
  ['S','I rounded up.'],
  ['H','It stung.'],
  ['S','For how long?'],
  ['H','About this long.'],
  {wait:1.8},
  ['H','There.'],
  ['S','That’s IT? I had a whole evening planned.'],
  ['S','She didn’t apologise.'],
  ['H','No.'],
  ['S','And we’re… fine?'],
  ['H','A bit stung. And fine.'],
  ['S','I don’t have a drawer for that.'],
  ['H','Make one.']
 ]);}

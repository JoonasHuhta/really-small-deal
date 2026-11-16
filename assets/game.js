/* GENERATED FILE. Edit the parts in src/ and run: node tools/build.cjs */
(function(){
'use strict';
// ---- src/00-core.js ----
var W=960,H=540,WALLY=385,FEETY=462,HOME=450,HOMEX=1500;
var LAMPS=[250,690,1130,HOMEX+60];
var cv=document.getElementById('c'),ctx=cv.getContext('2d'),ov=document.getElementById('ov');
var elLine=document.getElementById('line'),elOpts=document.getElementById('opts');
var SC=1;
function resize(){var dpr=Math.min(window.devicePixelRatio||1,2);var w=cv.clientWidth||960;cv.width=Math.round(w*dpr);cv.height=Math.round(w*9/16*dpr);SC=cv.width/W;WIDE=w>=640;COMPACT=document.documentElement.classList.contains('immersive');
  HUDL=COMPACT&&((window.innerWidth||w)-w)/2<52?Math.round(58*W/w):0;}
var COMPACT=false,HUDL=0; // the immersive layout: the on-canvas HUD shows itself briefly, then gets out of the way
window.addEventListener('resize',resize);
var RM=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
// Two settings the player can change at any time. Slow reality only ever makes the window longer:
// the joke is that the window is impossible, and a player who needs more time still gets the joke.
var TEXT_STEPS=[1,1.18,1.38],textStep=1,slowReality=false;
try{var ts=parseInt(window.localStorage.getItem('ekskyysmi.text'),10);if(ts>=0&&ts<TEXT_STEPS.length)textStep=ts;
    slowReality=window.localStorage.getItem('ekskyysmi.slow')==='on';}catch(e){}
var WIDE=true,paused=false,appHidden=false,nativePaused=false,lastDay=null,G=null,C={z:1.025,fx:W/2,fy:H/2},history=[],previewSaved=null;
var logDialog=document.getElementById('dialogue-log'),modalWasPaused=false,dragging=false;
var Q=[],WAIT=null,TIMER=0,LOCK=0,CH=null;
var NAMES={S:'EKSKYYSMI',H:'HUMAN',A:'SANNA',B:'EERO',P:'PHONE',N:'NARRATOR',R:'RIITTA',Z:'SANNA’S SHADOW',Y:'EERO’S SHADOW',W:'RIITTA’S SHADOW',T:'BARTENDER',X:'A STRANGER',L:'LIBRARIAN'};

function clamp(v,a,b){return v<a?a:v>b?b:v;}
function approach(v,t,d){return v<t?Math.min(t,v+d):Math.max(t,v-d);}
function ease(v,t,k){return v+(t-v)*Math.min(1,k);}
// ---- src/10-audio.js ----
/* ================= sound: speech blips and a few effects ================= */
var AC=null,soundOn=true,voiceNodes=[];
try{soundOn=window.localStorage.getItem('ekskyysmi.sound')!=='off';}catch(e){}
function audio(){
  if(!soundOn||paused||appHidden)return null;var A=window.AudioContext||window.webkitAudioContext;if(!A)return null;
  if(!AC){try{AC=new A();}catch(e){return null;}}
  if(AC.state==='suspended')syncAudioState();return AC;
}
function syncAudioState(){
  syncMusic();
  if(!AC)return;
  var method=paused||appHidden||!soundOn?'suspend':'resume';
  try{if(AC[method]){var p=AC[method]();if(p&&p.catch)p.catch(function(){});}}catch(e){}
}
function tone(f,t0,dur,type,vol,f2){
  var o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);
  if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);
  g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(vol,t0+0.008);g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  o.connect(g);g.connect(AC.destination);o.start(t0);o.stop(t0+dur+0.02);return o;
}
// Room for recorded sound. List a file under an effect's name and it replaces the synthesized version;
// list a loop under MUSIC and music('name') plays it. A missing or undecodable file falls back to the synth or to silence.
var SAMPLES={/* hit:'assets/audio/hit.ogg', swat:'assets/audio/swat.ogg' */};
// Music is streamed through an <audio> element, not decoded into memory: a three-minute track would cost a phone ~60 MB.
// A browser will not start it before the first touch or key, so anything that fails to start is retried on the first gesture.
var MUSIC={title:'assets/audio/title.mp3' /* , walk:'assets/audio/walk-home.mp3', night:'assets/audio/0307.mp3' */};
var BUF={},LOADING={},musicEl=null,musicName=null,MUSICVOL=0.45,fading=[];
function loadSound(k,url){
  if(BUF[k]||LOADING[k]||!window.fetch)return;var a=audio();if(!a)return;LOADING[k]=true;
  window.fetch(url).then(function(r){if(!r.ok)throw 0;return r.arrayBuffer();}).then(function(b){return new Promise(function(ok,no){a.decodeAudioData(b,ok,no);});})
    .then(function(buf){BUF[k]=buf;}).catch(function(){LOADING[k]='failed';});
}
function preloadSounds(){for(var k in SAMPLES)loadSound(k,SAMPLES[k]);}
function playBuf(k,vol,loop){var a=audio();if(!a||!BUF[k])return null;var n=a.createBufferSource(),g=a.createGain();n.buffer=BUF[k];n.loop=!!loop;g.gain.value=vol==null?0.8:vol;n.connect(g);g.connect(a.destination);n.start();return n;}
function fadeOut(el){
  if(typeof setInterval!=='function'){try{el.pause();}catch(e){}return;}
  var id=setInterval(function(){var v=el.volume-0.05;if(v<=0.02){try{el.pause();el.src='';}catch(e){}clearInterval(id);var i=fading.indexOf(el);if(i>=0)fading.splice(i,1);}else el.volume=v;},60);
  fading.push(el);
}
function music(name){
  name=name||null;if(name===musicName&&(musicEl||!MUSIC[name]))return;
  musicName=name;if(musicEl){fadeOut(musicEl);musicEl=null;}
  if(!name||!MUSIC[name]||typeof window.Audio!=='function')return;
  var el=new window.Audio(MUSIC[name]);el.loop=true;el.preload='auto';el.volume=MUSICVOL;musicEl=el;syncMusic();
}
function syncMusic(){
  var el=musicEl;if(!el)return;
  try{if(soundOn&&!paused&&!appHidden){var p=el.play();if(p&&p.catch)p.catch(function(){});}else el.pause();}catch(e){}
  if(paused||appHidden||!soundOn)for(var i=0;i<fading.length;i++){try{fading[i].pause();}catch(e){}}
}
// One voice per character: waveform, pitch, loudness. The shadow's pitch drops as it grows.
var VOICE={S:['triangle',185,0.075],H:['sine',330,0.06],A:['sine',494,0.05],B:['triangle',262,0.06],R:['sine',392,0.05],T:['triangle',147,0.06],L:['sine',523,0.05],X:['sine',440,0.05],Z:['triangle',233,0.045]};
function stopVoice(){for(var i=0;i<voiceNodes.length;i++){try{voiceNodes[i].stop();}catch(e){}}voiceNodes=[];}
function speak(who,text){
  stopVoice();var a=audio();if(!a)return;var t0=a.currentTime+0.02;
  if(who==='P'){
    if(/^You:/.test(text)){tone(420,t0,0.2,'sine',0.05,1700);tone(1700,t0+0.2,0.07,'sine',0.03);}                 // sent: a whoosh, and no way back
    else if(/^Seen/.test(text)){tone(150,t0,0.3,'sine',0.11,96);}                                                      // seen: one flat thud
    else if(/calling/.test(text)){for(var r=0;r<2;r++)for(var q=0;q<5;q++)tone(q%2?1180:940,t0+r*0.62+q*0.07,0.07,'square',0.03);}
    else{for(var b=0;b<2;b++){tone(92,t0+b*0.2,0.15,'sawtooth',0.085,84);tone(184,t0+b*0.2,0.15,'square',0.02,170);}  // incoming: the table hears it first
      tone(880,t0+0.42,0.09,'sine',0.05);tone(1320,t0+0.52,0.18,'sine',0.05);}
    return;}
  var v=VOICE[who];if(!v)return;
  var base=who==='S'?v[1]/Math.sqrt(Math.max(0.6,G.morko.sT)):v[1],n=0;
  for(var i=0;i<text.length&&n<28;i+=3){
    var c=text.charAt(i);if(!/[A-Za-z0-9]/.test(c))continue;
    var loud=/[A-Z]/.test(c)&&/[A-Z]/.test(text.charAt(i+1)||'')?1.14:1;
    voiceNodes.push(tone(base*loud*(0.92+((i*37)%17)/100),t0+i/55,0.05,v[0],v[2]));n++;
  }
}
function sfx(k){
  var a=audio();if(!a)return;if(SAMPLES[k]){if(BUF[k]){playBuf(k);return;}loadSound(k,SAMPLES[k]);}var t=a.currentTime+0.01;
  if(k==='hit'){tone(120,t,0.4,'sine',0.24,42);tone(900,t,0.06,'square',0.025,300);for(var hb=0;hb<3;hb++){tone(62,t+0.6+hb*0.75,0.13,'sine',0.14-hb*0.03);tone(54,t+0.78+hb*0.75,0.13,'sine',0.1-hb*0.02);}}
  else if(k==='swat'){tone(900,t,0.12,'triangle',0.07,180);tone(240,t+0.02,0.08,'square',0.02,120);}
  else if(k==='stamp'){tone(150,t,0.09,'triangle',0.08,65);tone(780,t,0.025,'square',0.018,260);}
  else if(k==='good'){tone(660,t,0.08,'sine',0.05);tone(990,t+0.09,0.14,'sine',0.05);}
  else if(k==='enhance'){tone(300,t,0.3,'square',0.03,1400);tone(1400,t+0.32,0.08,'square',0.03);}
  else if(k==='zap'){tone(110,t,0.32,'square',0.05,55);tone(2600,t,0.05,'sawtooth',0.04,400);tone(1900,t+0.07,0.04,'square',0.03,260);tone(70,t+0.12,0.4,'sine',0.16,40);}
  else if(k==='drip'){tone(1250,t,0.07,'sine',0.03,700);}
  else if(k==='clink'){tone(2100,t,0.09,'sine',0.035);tone(2900,t+0.03,0.12,'sine',0.025);}
  else if(k==='nope')tone(190,t,0.16,'triangle',0.07,120);
  else if(k==='startle')tone(300,t,0.2,'triangle',0.08,860);
  else if(k==='pick')tone(520,t,0.05,'sine',0.04);
  else if(k==='cut')tone(196,t,0.14,'triangle',0.06);
  else if(k==='card'){tone(262,t,0.5,'sine',0.05);tone(392,t+0.14,0.55,'sine',0.04);}
  else if(k==='turn'){tone(392,t,0.3,'sine',0.05);tone(494,t+0.9,0.3,'sine',0.05);tone(587,t+1.5,0.7,'sine',0.06);}
}
function soundUI(){var b=document.getElementById('sound');if(b){b.textContent=soundOn?'Sound on':'Sound off';b.setAttribute('aria-pressed',String(soundOn));}}
// ---- src/20-engine.js ----
/* ================= state ================= */
function reset(day){
  var r=day;
  if(!r){var opts=['A','B','C'].filter(function(x){return x!==lastDay;});r=opts[Math.floor(Math.random()*opts.length)];}
  lastDay=r;
  G={time:0,day:r,clock:9*3600+41*60+12,rate:1,started:false,ended:false,
     human:{x:HOME,xT:HOME,flinch:0,gone:false,face:'neutral',back:false,sweat:0,sweatT:0,blush:0,grin:0,puddle:0},aSweat:0,cards:[],rep:null,zoom:null,fight:null,fightRes:null,fightLog:null,boss:null,ninja:false,rBrow:0,lab:null,labEnd:false,tics:[],carsSeen:[],dish:null,kitchen:false,smileT:0,lens:null,lensView:false,glassN:0,skippable:false,moment:null,qte:null,qteWon:false,day0:null,mult:1,prevClock:0,livedShown:0,rolling:false,run:[],jolt:null,awayAt:null,awayNote:null,receiptText:'',bar:null,rec:null,draft:null,lib:null,replySent:null,noCup:false,mugFixed:true,fadeRate:1.6,
     morko:{s:1,sT:1,off:-70,mood:'calm',st:'free',pose:null,coat:null,wobble:null,h:[{x:340,y:380},{x:420,y:380}]},
     gaze:0,gazeT:0,gazeFrom:'A',dark:0,darkT:0,flash:0,anx:0,
     ax:1010,axT:1010,bx2:1090,bxT:1090,aFace:-1,bFace:-1,aWave:false,cowA:false,cowB:false,cupLeft:false,
     cz:1.025,cx:W/2,cy:H/2,
     lines:[],band:null,out:null,w:null,card:0,
     hud:false,plan:false,job:null,jobDone:false,bit:false,set:'room',chapter:1,label:null,planText:null,yes:0,no:false,fb:null,txt:null,rx:760,cowR:false,zShow:0,zT:0,fade:0,chap:null,bigNote:null,snacks:false,dayEnd:false,hold:null,peeked:false,pulse:0,shake:0,nopeMsg:null,prevented:0,pop:null,real:0,lunch:0,startles:0,fear:1,leak:'none',advice:0};
  G.handout=false;G.afterparty=false;G.posting=null;G.nothings=0;G.rehearsal=false;G.metSannaShadow=false;G.stamp=null;
  Q=[];WAIT=null;CH=null;history=[];previewSaved=null;dragging=false;paused=false;
  document.getElementById('pause').textContent='Pause';document.body.classList.remove('is-paused');
  C.z=1.025;C.fx=W/2;C.fy=H/2;
  hideOv();render();
}

/* ================= script engine ================= */
function run(){
  for(;;){
    if(!Q.length){WAIT=null;render();return;}
    var s=Q.shift();
    if(typeof s==='function'){var r=s();if(r&&r.length)Q=r.concat(Q);continue;}
    if(Array.isArray(s)){setLine(s[0],s[1],s[2]);WAIT='click';LOCK=0.3;render();return;}
    if(s.wait!=null){if(s.wait>1)G.bick=0;WAIT='time';TIMER=s.wait;render();return;}
    if(s.view){WAIT='view';TIMER=2.4;render();return;}
    if(s.stretch){WAIT='stretch';G.morko.pose='grow';G.morko.sT=2.1;G.morko.mood='stern';LOCK=0.2;render();return;}
    if(s.hold){G.hold={kind:s.hold.kind,secs:s.hold.secs||3,p:0,on:false,tap:0,o:s.hold};G.lines=[];G.cur={who:'S',text:''};WAIT='hold';LOCK=0.2;render();return;}
    if(s.toss){tossStart(s.toss);return;}
    if(s.auto){G.auto={opts:s.auto.opts,pick:s.auto.pick||0,secs:s.auto.secs||1.8,t:0,done:false};G.lines=[];G.cur=null;WAIT='auto';render();return;}
    if(s.lamp){G.lines=[];G.cur=null;WAIT='lamp';LOCK=0.6;render();return;}
    if(s.qte){startQte();return;}
    if(s.fight){startFight(s.fight);return;}
    if(s.choice){G.bick=0;G.nopeMsg=null;CH=typeof s.choice==='function'?s.choice():s.choice;WAIT='choice';LOCK=0.4;render();return;}
  }
}
function advance(){if(paused||LOCK>0||WAIT==='qte'||WAIT==='auto')return;if(WAIT==='lamp'){lampOn();return;}if(WAIT==='fight'){swat();return;}if(WAIT==='hold'){holdTap();return;}if(WAIT==='toss'){tossTap();return;}if(WAIT==='stretch'){G.warningSize=G.morko.sT;G.morko.pose=null;run();}else if(WAIT==='click'||(WAIT==='view'&&TIMER<=0))run();}
function choose(i){
  if(paused||WAIT!=='choice'||LOCK>0||!CH||!CH[i])return;
  if(CH[i].off){nope(i);return;}
  clearPreview();var o=CH[i];CH=null;sfx('pick');if(o.f)o.f();
  var then=typeof o.then==='function'?o.then():(o.then||[]);
  Q=[['S',o.t]].concat(then,Q);run();
}
function setLine(who,text,o){
  var g=G;
  if(who==='N'){g.band=text;}
  else{g.band=null;g.lines=g.lines.filter(function(l){return l.who!==who;});g.lines.push({who:who,text:text,big:!!(o&&o.big),loud:!!(o&&o.loud),quiet:!!(o&&o.quiet)});if(g.lines.length>2)g.lines.shift();}
  var prev=g.cur&&g.cur.who,pair=(who==='S'&&prev==='H')||(who==='H'&&prev==='S');
  g.bick=pair&&text.length<=46&&!(o&&o.big)?(g.bick||0)+1:(who==='S'||who==='H')&&pair?Math.max(0,(g.bick||0)-1):0;
  var mute=who==='S'&&g.morko.asleep;
  g.phoneN=who==='P'?3:Math.max(0,(g.phoneN||0)-1);if(who==='P'&&!/^You:/.test(text))g.buzz=0.7;
  g.cur={who:who,text:text,big:!!(o&&o.big),loud:!!(o&&o.loud),quiet:!!(o&&o.quiet),look:(o&&o.look)||null};g.curT=0;if(!mute)speak(who,text);if(o&&o.loud&&!RM)g.shake=Math.max(g.shake||0,0.25);
  history.push({who:who,text:text});
}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
// capitals are emphasis: the panel shows them the way the bubble does
function emph(h){return h.replace(/(^|[\s“(—-])([A-Z][A-Z’']+)(?![a-z])/g,function(_,a,w){return a+'<strong>'+w+'</strong>';});}
// One line said to the side: eyes left, mouth small. For the beats where it would rather not be asked.
function aside(line){return function(){return [set({st:'pokka'}),line,set({st:'free'})];};}
function render(){
  var g=G,cur=g&&g.cur,html='',speaker=cur?cur.who:'N',text=cur?cur.text:'';
  document.body.classList.toggle('playing',g.started&&!g.ended);
  document.getElementById('play-panel').classList.toggle('hidden',!g.started||g.ended);
  document.getElementById('pause').disabled=!g.started||g.ended;
  document.getElementById('journal').disabled=!history.length;
  document.getElementById('chapter').textContent=g.ended?(g.labEnd?'Scenario lab':g.dayEnd?'End of Monday':'For now'):g.label?g.label:g.w?'The walk home':g.started?'Oh, hi.':'A small social adventure';
  document.getElementById('perspective').textContent=g.out?'THE OUTSIDE VERSION':g.w?'THE MOMENT HAS PASSED. MOSTLY.':'THE INSIDE VERSION';
  cv.classList.toggle('stretching',WAIT==='stretch');
  if(WAIT==='choice'&&CH){
    speaker='S';text=g.nopeMsg||'What do we do with this?';
    for(var i=0;i<CH.length;i++)html+=CH[i].off&&CH[i].tried?'<button class="opt off shake" type="button" data-i="'+i+'"><i>'+(i+1)+'</i><s>'+esc(CH[i].t)+'</s> <em>Ekskyysmi is sitting on this</em></button>':'<button class="opt" type="button" data-i="'+i+'"><i>'+(i+1)+'</i>'+esc(CH[i].t)+'</button>';
  }else if(WAIT==='stretch'){
    speaker='S';text='A small warning. Just enough to make my point.';
    html='<div class="stretch-controls"><label for="stretch">Unfurl your warning</label><input id="stretch" type="range" min="1.8" max="3.8" step="0.05" value="'+g.morko.sT+'" aria-label="Size of your warning"><button class="opt cont" type="button" data-i="go">That should do it →</button></div>';
  }else if(WAIT==='auto'&&g.auto){
    speaker='S';text='—';
    for(var ai=0;ai<g.auto.opts.length;ai++)html+='<button class="opt'+(g.auto.done&&ai===g.auto.pick?' picked':'')+'" type="button" disabled><i>'+(ai+1)+'</i>'+esc(g.auto.opts[ai])+'</button>';
  }else if(WAIT==='lamp'){
    speaker='N';text='It is dark. There is a lamp.';
    html='<button class="opt cont" type="button" data-i="go">Turn on the lamp</button>';
  }else if(WAIT==='toss'){
    speaker='S';text=tossText();g.toss.shown=text;
    html='<button class="opt cont" type="button" data-i="go">Let go</button>';
  }else if(WAIT==='hold'){
    speaker='S';text=holdText();g.hold.shown=text;
    html='<div class="hold-controls"><button class="opt cont" type="button" data-i="hold">'+HOLD_LABEL[g.hold.kind]+'</button><div class="holdbar"><i id="holdfill"></i></div></div>';
  }else if(WAIT==='qte'&&g.qte){
    var qq=g.qte;speaker='S';text='RESPOND. CORRECTLY. NOW.';
    html=qq.order.map(function(i){var r=RESPONSE[i],done=i<qq.i;return '<button class="opt qte'+(done?' done':'')+'" type="button" data-i="q'+i+'"'+(qq.end||done?' disabled':'')+'><b>'+r.sym+'</b><span>'+r.label+'</span></button>';}).join('');
  }else if(WAIT==='fight'){
    speaker='S';text='Incoming! I’ve got this. Probably.';
    html='<button class="opt cont swat" type="button" data-i="go">Swat! <span>(or tap the scene)</span></button>';
    if(g.fight.paced){
      var reply=currentReply(),ready=reply&&(reply.state==='fly'||reply.state==='open');
      speaker='P';text=reply?(g.fight.msgs.indexOf(reply)+1)+' / '+g.fight.msgs.length+' — '+(reply.seen?reply.full:'“'+reply.far+'”'):'';
      html='<button class="opt cont" type="button" data-i="read"'+(ready?'':' disabled')+'>'+(ready?(reply.state==='fly'?'Let it come closer →':'Let it through →'):'A moment…')+'</button>'+
        '<button class="opt" type="button" data-i="go"'+(ready?'':' disabled')+'>Swat this reply away</button>';
    }
  }else if(WAIT==='view'){
    speaker='N';text=g.out.cap;
    html='<button class="opt cont" type="button" data-i="go"'+(TIMER>0?' disabled':'')+'>Back inside →</button>';
    if(g.out.anim==='chatlog')html=chatTranscript()+html;
  }else{
    if(WAIT==='time'&&!cur)text=g.skippable?'The break room, before anyone needs anything.':'…';
    html=WAIT==='time'&&g.skippable?'<button class="opt cont" type="button" data-i="skip">Skip intro →</button>':'<button class="opt cont" type="button" data-i="go"'+(WAIT==='click'?'':' disabled')+'>'+(WAIT==='time'?'A moment…':'Continue →')+'</button>';
  }
  var icon=speaker==='H'?'human':speaker==='S'?'':speaker==='N'?'narrator':'other';
  elLine.innerHTML='<span class="speaker-icon '+icon+'" aria-hidden="true"></span><div class="w-'+speaker+'"><b>'+(g.skippable&&!cur?'MONDAY, 8:52':NAMES[speaker])+'</b><p'+(cur&&cur.loud?' class="loud"':cur&&cur.quiet?' class="quiet"':'')+'>'+emph(esc(text))+'</p></div>';
  elOpts.innerHTML=html;
  if(WAIT==='fight'&&g.fight.paced&&g.fight.focusControls){
    var nextControl=elOpts.querySelector('[data-i=read]');if(nextControl&&!nextControl.disabled)nextControl.focus();
  }
  document.getElementById('hint').textContent=WAIT==='auto'?'Nothing to do. It’s handled.':WAIT==='lamp'?'The lamp.':WAIT==='qte'?'Arrow keys and Space, in this order. Or tap the buttons. Two seconds have been added for reading. Reality did not add them.':lensFree()?'Move the glass over the room. Everything looks worse through it. That is its job.':WAIT==='fight'?'Tap to swat the nearest reply. Waiting lets it come close enough to read.':WAIT==='toss'?'Drag the card and let go of it. Tapping works too, but it needs persuading.':WAIT==='hold'?'Press and hold the button or the scene. A few taps work too. Letting go is allowed.':WAIT==='stretch'?'Drag up on the scene, or use the slider. No rush.':WAIT==='choice'?'Choose a line · keys 1–4 · every choice keeps the story moving.':g.started?'Space / Enter to continue · P to pause · Dialogue to look back.':'Take your time. The coffee can wait.';
  if(WAIT==='fight'&&g.fight.paced)document.getElementById('hint').textContent='No timer. Use the buttons to read or swat. Space / Enter or tapping the scene swats.';
  resize();
}
function clearPreview(){if(previewSaved){G.morko.pose=previewSaved.pose;G.morko.sT=previewSaved.s;previewSaved=null;}}
function previewChoice(el){
  if(WAIT!=='choice'||paused||!el)return;var i=+el.getAttribute('data-i');
  if(!CH||!CH[i]||!CH[i].preview)return;
  clearPreview();previewSaved={pose:G.morko.pose,s:G.morko.sT};G.morko.pose=CH[i].preview;G.morko.sT=CH[i].preview==='hold'?2:1.3;
}
elOpts.addEventListener('pointerover',function(e){previewChoice(e.target.closest('[data-i]'));});
elOpts.addEventListener('pointerleave',clearPreview);
elOpts.addEventListener('focusin',function(e){previewChoice(e.target.closest('[data-i]'));});
elOpts.addEventListener('focusout',clearPreview);
elOpts.addEventListener('input',function(e){if(e.target.id==='stretch'&&WAIT==='stretch'&&!paused)G.morko.sT=+e.target.value;});
function stretchAt(e){if(!dragging||WAIT!=='stretch'||paused)return;var r=cv.getBoundingClientRect();G.morko.sT=clamp(1.8+(1-(e.clientY-r.top)/r.height)*2,1.8,3.8);var slider=document.getElementById('stretch');if(slider)slider.value=G.morko.sT;}
cv.addEventListener('pointerdown',function(e){if(WAIT==='stretch'&&!paused){dragging=true;cv.setPointerCapture(e.pointerId);stretchAt(e);}});
cv.addEventListener('pointermove',stretchAt);
cv.addEventListener('pointermove',lensMove);
cv.addEventListener('pointerup',function(){dragging=false;});
cv.addEventListener('pointercancel',function(){dragging=false;});
elOpts.addEventListener('click',function(e){
  // Explicit controls respond immediately; ignore the second click of a double-click.
  // Canvas/keyboard shortcuts still retain their brief accidental-skip guard.
  if(e.detail>1)return;
  var t=e.target;while(t&&t!==elOpts&&!(t.getAttribute&&t.getAttribute('data-i')))t=t.parentNode;
  if(!t||t===elOpts)return;var i=t.getAttribute('data-i');LOCK=0;
  if(WAIT==='fight'&&G.fight.paced)G.fight.focusControls=document.activeElement===t;
  if(i.charAt(0)==='q'){qteInput(+i.slice(1));return;}
  if(i==='hold'){holdClick();return;}
  if(i==='skip'){skipIntro();return;}
  if(i==='read'){readReply();return;}
  if(i==='go')advance();else choose(+i);
});
var swallowClick=false;
cv.addEventListener('click',function(e){if(swallowClick){swallowClick=false;return;}if(paused&&G.started&&!G.ended){togglePause();return;}if(lensFree()){lensTap(e);return;}if(WAIT==='hold'){holdClick();return;}if(WAIT==='toss')return;if(WAIT!=='stretch')advance();});
cv.addEventListener('pointerdown',function(e){if(WAIT==='hold'){holdDown();try{cv.setPointerCapture(e.pointerId);}catch(_){}}});
elOpts.addEventListener('pointerdown',function(e){var t=e.target&&e.target.closest?e.target.closest('[data-i=hold]'):null;if(t)holdDown();});
window.addEventListener('pointerup',holdUp);window.addEventListener('pointercancel',holdUp);window.addEventListener('blur',holdUp);

/* ================= hands-on moments: used sparingly, about one a day ================= */
var HOLD_LABEL={cover:'Hold: hands over their eyes',pull:'Hold: walk them out',still:'Hold: keep them perfectly still',stay:'Hold: stay',sit:'Hold: sit',sign:'Hold: sign'};
var NOPE=['That one isn’t available. I’m sitting on it.','Still sitting on it.','It’s very comfortable, actually.','Press it all day. I have nowhere to be.'];
function nope(i){var o=CH[i];o.tried=(o.tried||0)+1;G.nopeMsg=NOPE[Math.min(o.tried-1,NOPE.length-1)];G.morko.mood='stern';sfx('nope');render();}
function holdText(){
  var h=G.hold,on=h.on||h.tap>0;
  if(h.kind==='sit')return on?h.o.text:'Hold to sit down. Do nothing else.';
  if(h.kind==='sign')return on?h.o.text:'Hold to sign.';
  if(h.kind==='cover')return h.wave?'Sanna is waving. Your human can’t see it.':on?'Hands over their eyes. Nothing gets in.':'Hold to keep their eyes covered.';
  if(h.kind==='pull')return on?'This way. Briskly. Don’t look back.':'Hold to walk them out of the room.';
  if(h.kind==='still')return on?'Nobody move. We are a lamp.':'Hold to keep them perfectly still.';
  return on?(h.o.text||'Staying. This is me staying.'):'Hold to stay. Do nothing else.';
}
function holdDown(){if(WAIT!=='hold'||paused||!G.hold)return;G.hold.on=true;G.hold.downAt=Date.now();}
function holdUp(){if(swallowClick&&typeof setTimeout==='function')setTimeout(function(){swallowClick=false;},120);if(G&&G.hold&&G.hold.on){G.hold.on=false;G.hold.long=Date.now()-G.hold.downAt>260;}}
function holdClick(){var h=G.hold;if(!h||paused)return;if(h.long){h.long=false;return;}holdTap();}
function holdTap(){var h=G.hold;if(!h)return;h.p+=0.9;h.tap=0.6;holdStep(h,true,0);if(G.hold===h&&h.p>=h.secs)finishHold();}
function holdStep(h,on,dt){
  var g=G,M=g.morko,Hm=g.human,f=clamp(h.p/h.secs,0,1);
  if(h.kind==='cover'){
    M.pose=on?'cover':null;
    var win=g.day!=='C'&&h.p>1&&h.p<2.5;
    if(win!==!!h.wave){h.wave=win;g.aWave=win;g.aFace=win?-1:1;}
    // Letting go while she waves means the human sees it. The shadow's hands were the only thing in the way.
    if(win&&!on){h.peek=(h.peek||0)+dt;if(h.peek>0.6){g.peeked=true;finishHold();}}
  }else if(h.kind==='pull'){
    M.pose=on?'pull':null;Hm.xT=HOME-f*(HOME+60);if(f>0.08)Hm.back=true;
    if(f>0.4&&g.day!=='C'&&!h.said){h.said=true;g.aFace=-1;setLine('A','Oh— hey, are you…');}
  }else if(h.kind==='sit'){
    M.sT=0.62;M.mood='calm';g.anx=0.05;if(on&&h.o.clock)g.clock+=60*dt;
  }else if(h.kind==='sign'){
    M.dim=1-0.45*f;if(g.form)g.form.sig=f;
  }else if(h.kind==='still'){
    M.pose='hold';Hm.face='stiff';Hm.sweatT=0.8;if(!on&&dt)Hm.flinch=Math.max(Hm.flinch,0.5);
    if(g.day!=='C')g.aFace=(h.p>1&&h.p<2.1)?-1:1;
  }else{
    M.pose=on?'comfort':null;M.sT=on?1.1:1.5;M.mood=on?'care':'worry';g.anx=on?0.08:0.8;
    if(on&&h.o.clock)g.clock+=60*dt;
  }
}
function finishHold(){
  var g=G,h=g.hold,M=g.morko,Hm=g.human;g.hold=null;WAIT=null;
  if(h.on)swallowClick=true; // the release of this press must not also count as "continue"
  if(h.kind==='cover'){g.aWave=false;g.aFace=1;
    if(g.peeked){M.pose=null;g.leak='none';Q=[['H','…She’s waving.'],['S','I looked away for ONE second.'],['H','Hi.']].concat(Q);}else M.pose='cover';}
  else if(h.kind==='pull'){M.pose='pull';Hm.xT=-90;Hm.back=true;g.cupLeft=true;g.lines=[];}
  else if(h.kind==='still'){M.pose='hold';Hm.face='stiff';g.aFace=1;}
  else if(h.kind==='sit'){M.sT=0.62;g.anx=0.05;}
  else if(h.kind==='sign'){M.dim=0.55;if(g.form)g.form.sig=1;}
  else{M.pose='comfort';M.sT=1.1;M.mood='care';g.anx=0.1;}
  sfx('pick');run();
}
function holdRing(){
  var h=G.hold,x=G.human.x,y=FEETY-150,f=clamp(h.p/h.secs,0,1);
  ctx.lineCap='round';ctx.lineWidth=5;ctx.strokeStyle='rgba(22,19,30,.35)';ctx.beginPath();ctx.arc(x,y,34,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle='#e2b04a';ctx.beginPath();ctx.arc(x,y,34,-Math.PI/2,-Math.PI/2+Math.PI*2*f);ctx.stroke();
}

/* ================= stage directions ================= */
function set(o){return function(){
  var g=G,M=g.morko,Hm=g.human;
  if(o.clr){g.lines=[];g.band=null;}
  if(o.s!=null)M.sT=o.s;if(o.mood)M.mood=o.mood;if('pose' in o)M.pose=o.pose;if(o.st)M.st=o.st;
  if(o.face)Hm.face=o.face;if('back' in o)Hm.back=o.back;if(o.flinch)Hm.flinch=o.flinch;if(o.hx!=null)Hm.xT=o.hx;
  if(o.anx!=null)g.anx=o.anx;if(o.ax!=null)g.axT=o.ax;if(o.bx!=null)g.bxT=o.bx;if(o.near)g.axT=Hm.x+92;
  if(o.aFace)g.aFace=o.aFace;if(o.bFace)g.bFace=o.bFace;if('aWave' in o)g.aWave=o.aWave;
  if(o.cowA)g.cowA=true;if(o.cowB)g.cowB=true;if(o.rate!=null)g.rate=o.rate;
  if(o.hud)g.hud=true;if(o.plan)g.plan=true;
  if(o.sweat!=null)Hm.sweatT=o.sweat;if(o.blush!=null)Hm.blush=o.blush;if(o.aSweat!=null)g.aSweat=o.aSweat;
};}
function hit(k,from){return function(){
  var g=G;g.lines=[];g.band=null;g.cur=null;g.flash=k;g.human.flinch=1;g.human.face='stiff';
  g.morko.sT=1.45+0.55*k;g.morko.mood='scared';g.anx=k;g.pulse=k;g.shake=RM?0:k;g.gazeFrom=from==='A'?'after':(from||'A');g.gazeT=from==='P'?0:0.85*k;sfx('hit');g.darkT=0.95*k;
  g.cz=1.05+0.06*k;g.cx=W/2+10;g.cy=258;g.human.blush=Math.max(g.human.blush,k);
  trigger();addLived('jolts to the chest',Math.round(LIVED.hit*k));
};}
function archive(kind,items){return function(){
  var g=G;for(var i=0;i<items.length;i++)g.cards.push({kind:kind,year:items[i][0],text:items[i][1],t:-i*0.45,life:null,
    x:kind==='good'?790:170+i*310,y:kind==='good'?178:150+(i%2)*46,rot:kind==='good'?-0.03:((i%2?1:-1)*(0.06+i*0.02))});
  if(kind==='bad')addLived('archive visits',LIVED.archive);
  sfx('card');
};}
function closeArchive(){var g=G;for(var i=0;i<g.cards.length;i++)if(g.cards[i].life==null)g.cards[i].life=Math.max(0,g.cards[i].t)+0.35;}
function drawCards(){
  var g=G,sticky=g.cards.some(function(c){return c.kind==='bad'&&c.life==null;});
  if(sticky){ctx.fillStyle='rgba(14,12,20,.45)';ctx.fillRect(0,0,W,H);}
  for(var i=0;i<g.cards.length;i++){var c=g.cards[i];if(c.t<0)continue;
    var a=clamp(c.t/0.25,0,1)*(c.life==null?1:clamp((c.life-c.t)/0.35,0,1)),drop=RM?0:Math.max(0,1-c.t/0.35)*-60;
    ctx.save();ctx.globalAlpha=a;ctx.translate(c.x,c.y+drop);ctx.rotate(RM?0:c.rot);
    var good=c.kind==='good';ctx.fillStyle=good?'#fff4d6':'#f6f1e4';ctx.strokeStyle=good?'#e2b04a':'#8b8070';ctx.lineWidth=good?3:1.5;
    rr(-140,-56,280,112,5);ctx.fill();ctx.stroke();
    ctx.fillStyle=good?'#e2b04a':'#c9553f';ctx.fillRect(-140,-56,280,24);
    ctx.textAlign='left';ctx.textBaseline='middle';ctx.font='700 13px system-ui,sans-serif';ctx.fillStyle='#fffdf6';ctx.fillText((good?'ARCHIVE · THE OTHER PILE · ':'ARCHIVE · ')+c.year,-128,-44);
    ctx.font='600 17px system-ui,sans-serif';ctx.fillStyle='#2b2733';var ls=wrap(c.text,250);for(var k=0;k<ls.length&&k<3;k++)ctx.fillText(ls[k],-128,-12+k*22);
    ctx.restore();}
}
function replay(n){return function(){var g=G;addLived('replays',LIVED.replay);g.rep={n:n,t:0};g.lines=[];g.cur=null;stopVoice();sfx('cut');};}
var REPLAY_LABEL=[null,'REPLAY 1/3 · restored by Ekskyysmi','REPLAY 2/3 · enhanced','REPLAY 3/3 · director’s cut'];
function drawReplay(){
  var g=G,n=g.rep.n,t=g.rep.t;
  room(false);
  if(n>=2){ctx.fillStyle='rgba(20,14,30,'+(n===3?0.35:0.15)+')';ctx.fillRect(0,0,W,H);}
  if(n===3){ctx.fillStyle='rgba(255,246,200,.3)';ctx.beginPath();ctx.moveTo(HOME-24,-30);ctx.lineTo(HOME+24,-30);ctx.lineTo(HOME+90,FEETY+4);ctx.lineTo(HOME-90,FEETY+4);ctx.closePath();ctx.fill();}
  var hold=n===1?0:n===2?1:2.2,sannaT=Math.min(1,t/0.6);
  person(HOME,{body:'#c98f2e',hair:'#4a3b32',facing:1,cup:true,face:'stiff',flinch:0.3});
  person(700,{body:SANNA.body,hair:SANNA.hair,facing:-1,face:n>=2?'frown':'neutral'});
  person(800,{body:MIKA.body,hair:MIKA.hair,facing:n>=2?-1:1,face:n===3?'frown':'neutral',cup:true});
  if(n===3){ // the audience that was never there
    ctx.fillStyle='#14111d';for(var i=0;i<13;i++){var ax=40+i*72+(i%2)*14,ay=H-6+Math.sin(G.time*2+i)*1.5;circ(ax,ay-44,20);ctx.fill();rr(ax-28,ay-26,56,40,14);ctx.fill();}
    ctx.fillStyle='#f6f1e4';for(var j=0;j<13;j+=3){var bx=40+j*72+(j%2)*14;circ(bx-6,H-52,2.6);ctx.fill();circ(bx+6,H-52,2.6);ctx.fill();}
  }
  var cur=g.cur;
  if(cur&&cur.who==='A')bubble(700,FEETY-172,cur.text,{reveal:Math.floor(g.curT*(n===1?55:n===2?18:9))});
  else if(cur&&cur.who==='S')bubble(250,150,cur.text,{dark:true,noTail:true,maxW:300,reveal:Math.floor(g.curT*55)});
  else if(cur&&cur.who==='H')bubble(HOME+60,FEETY-172,cur.text,{maxW:230,reveal:Math.floor(g.curT*55)});
  // tape look: warm tint, scanlines, label, timecode
  ctx.fillStyle='rgba(140,96,40,.16)';ctx.fillRect(0,0,W,H);
  if(!RM){ctx.fillStyle='rgba(0,0,0,.07)';for(var y=((G.time*40)%4);y<H;y+=4)ctx.fillRect(0,y,W,1.5);}
  ctx.fillStyle='rgba(12,10,16,.82)';ctx.fillRect(0,0,W,44);
  ctx.textBaseline='middle';ctx.textAlign='left';ctx.font='700 15px system-ui,sans-serif';ctx.fillStyle=(Math.floor(G.time*2)%2&&!RM)?'#e0563e':'#f1ebdd';ctx.fillText('● '+REPLAY_LABEL[n],20,22);
  ctx.textAlign='right';ctx.fillStyle='#b9b2a6';ctx.font='500 14px system-ui,sans-serif';
  var len=[0,2,9,47][n],sec=Math.min(len,Math.floor(t*(n===1?1:n===2?3:9)));ctx.fillText('00:'+(sec<10?'0':'')+sec+' / 00:'+(len<10?'0':'')+len,W-20,22);
}
function look(){G.gazeFrom='A';G.gazeT=0.5;}
function calm(){var g=G;g.human.sweatT=0;g.gazeT=0;g.darkT=0;g.anx=0.25;g.morko.sT=1.15;g.morko.mood='calm';g.morko.pose=null;g.human.face='neutral';g.cz=1.025;g.cx=W/2;g.cy=H/2;}
function prevent(label){return function(){G.prevented++;startStamp('press');return [{wait:0.85}];};}
function outside(o,len){return [function(){G.lines=[];G.band=null;o.t=0;G.out=o;stopVoice();sfx('cut');},{view:true},function(){G.out=null;}];}
function leave(){G.axT=1120;G.bxT=1200;G.aFace=1;G.bFace=1;}
function frozen(){var g=G;sfx('startle');g.morko.st='frozen';g.startles++;g.human.flinch=1;}
function hide(){G.morko.st='hide';}
function pokka(){G.morko.st='pokka';G.morko.sT=1.5;}
function free(){G.morko.st='free';G.morko.mood='alert';}
// ---- src/28-progress.js ----
/* Chapter checkpoints keep their own history. Unlocks and the last played chapter are separate. */
var SAVE_KEY='ekskyysmi.save';
function checkpoint(g){
  return {day:['A','B','C'].indexOf(g.day)>=0?g.day:'B',
    lunch:[0,1,2].indexOf(g.lunch)>=0?g.lunch:0,real:g.real===1?1:0,bit:!!g.bit,
    leak:['none','grow','cover','exit'].indexOf(g.leak)>=0?g.leak:'none',fear:[1,2,3].indexOf(g.fear)>=0?g.fear:1,
    fb:['sorry','explain','quiet','ask'].indexOf(g.fb)>=0?g.fb:null,
    txt:['worries','cancel','freezer','bite'].indexOf(g.txt)>=0?g.txt:null,
    yes:Number.isFinite(g.yes)?clamp(Math.floor(g.yes),0,20):0,
    handout:!!g.handout,afterparty:!!g.afterparty,reflected:!!g.reflected,peeked:!!g.peeked,metSannaShadow:!!g.metSannaShadow,
    posting:['archived','rejected','open'].indexOf(g.posting)>=0?g.posting:null,
    nothings:Number.isFinite(g.nothings)?clamp(Math.floor(g.nothings),0,20):0,rehearsal:!!g.rehearsal};
}
function loadProgress(){
  try{
    var raw=JSON.parse(window.localStorage.getItem(SAVE_KEY)||'null');
    if(!raw||!Number.isInteger(raw.ch)||raw.ch<1||raw.ch>5)return null;
    var top=Number.isInteger(raw.unlocked)?clamp(raw.unlocked,raw.ch,5):raw.ch,chapters={};
    for(var i=1;i<=top;i++){
      var c=raw.version===2&&raw.chapters?raw.chapters[i]:raw;
      if(c&&typeof c==='object'&&!Array.isArray(c))chapters[i]=checkpoint(c);
    }
    if(!chapters[raw.ch])return null;
    // "at" remembers the short moment the player was in, so closing the tab on a phone never costs ten minutes of story.
    var at=null,a=raw.at;
    if(a&&a.ch===raw.ch&&typeof a.moment==='string'&&(AFTER[a.ch]||[]).indexOf(a.moment)>=0&&a.state&&typeof a.state==='object')
      at={ch:a.ch,moment:a.moment,state:checkpoint(a.state),jobDone:!!a.jobDone};
    return {version:2,ch:raw.ch,unlocked:top,chapters:chapters,at:at};
  }catch(e){return null;}
}
function saveProgress(n){
  try{
    var old=loadProgress(),chapters=old?old.chapters:{};
    chapters[n]=checkpoint(G);
    window.localStorage.setItem(SAVE_KEY,JSON.stringify({version:2,ch:n,unlocked:Math.max(n,old?old.unlocked:1),chapters:chapters}));
  }catch(e){/* Storage is optional: private/offline play must still work. */}
}
function saveMoment(id){
  try{
    var old=loadProgress();if(!old||old.ch!==G.chapter)return;
    window.localStorage.setItem(SAVE_KEY,JSON.stringify({version:2,ch:old.ch,unlocked:old.unlocked,chapters:old.chapters,
      at:{ch:G.chapter,moment:id,state:checkpoint(G),jobDone:!!G.jobDone}}));
  }catch(e){}
}
// ---- src/29-prelude.js ----
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
    g.chap={day:CHAPTERS[1].day,title:CHAPTERS[1].title,t:0};g.chapter=1;newDay();sfx('card');},
  {wait:2.2},
  function(){G.chap=null;G.fade=1;G.fadeRate=0.36;},
  addTic('Monday, 8:52. Nobody here yet.',190,62,{at:0.9,life:3.4,size:19}),
  {wait:2.6},
  function(){var Hm=G.human;Hm.gone=false;Hm.xT=815;},
  {wait:1.8},
  function(){G.human.back=true;sfx('drip');},
  addTic('drip.',898,246,{life:0.9}),addTic('drip.',898,246,{at:0.7,life:0.9}),
  {wait:0.8},function(){sfx('drip');},{wait:0.8},
  function(){var g=G,Hm=g.human;g.noCup=false;Hm.back=false;Hm.facing=-1;Hm.xT=704;},
  {wait:1.3},
  function(){G.human.facing=1;},
  addTic('(mug handle on the wrong side.)',764,276,{life:1.5}),
  {wait:1.5},
  function(){G.mugFixed=true;sfx('clink');},
  addTic('(better.)',764,276,{life:1.1}),
  {wait:1.1},
  function(){var Hm=G.human;Hm.facing=-1;Hm.xT=HOME;},
  {wait:2.2},
  function(){G.human.facing=1;},{wait:0.4},
  function(){G.human.sipT=1;},{wait:0.9},
  function(){var Hm=G.human;Hm.sipT=0;Hm.face='smile';},{wait:0.9},
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
// A disguise in three beats: hang perfectly still, relocate the evidence, accidentally blink.
function coatOn(){var m=G.morko;m.st='free';m.pose='coat';m.coat={p:0,buttons:false,blink:-1};m.sT=1.25;if(RM)m.s=m.sT;G.anx=0;}
function coatButtons(){G.morko.coat.buttons=true;}
function coatBlink(){G.morko.coat.blink=0;}
function coatOff(){var m=G.morko;m.coat=null;m.pose=null;m.mood='worry';m.sT=1;if(RM){m.s=m.sT;updHands(1);}}
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
    {t:'Pretend to be a coat.',then:[coatOn,{wait:1.3},['Z','…I can see your eyes.'],coatButtons,['S','Coats have buttons.'],coatBlink,{wait:0.5},['Z','Your buttons blink.'],['S','Please don’t review the coat.'],coatOff]},
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
  function(){G.zT=0;G.metSannaShadow=true;}
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
  function(){return G.jobDone?[['S','…Is this the staying part?'],['H','This is the staying part.'],['S','It’s mostly standing.'],['H','Mostly.']]:[];},
  {wait:1.8},
  ['H','There.'],
  ['S','That’s IT? I had a whole evening planned.'],
  ['S','She didn’t apologise.'],
  ['H','No.'],
  ['S','And we’re… fine?'],
  ['H','A bit stung. And fine.'],
  ['S','I don’t have a drawer for that.'],
  ['H','Make one.'],
  function(){G.wT=1;},{wait:1.5},
  set({mood:'surprised'}),
  ['S','…Her shadow is juggling.',{look:'stunned'}],
  ['W','Eleven. Can’t look. Eleven.'],
  ['S','One of them hit us.'],
  function(){G.wDrop={t:0};sfx('drip');},{wait:0.9},
  ['W','That was “not now”. It’s the only one I’m allowed to drop.'],
  ['S','It LANDED.',{loud:1}],
  ['W','They do. Sorry. Ten.'],
  ['S','You drop things on PURPOSE? I have never dropped anything. I have all of it. Since 2011.'],
  ['W','Heavy?'],
  {wait:1.2},
  set({mood:'worry'}),
  aside(['S','…It’s filed.',{quiet:1}]),
  ['W','Mm. Ten.'],
  function(){G.wT=0;},{wait:1.0},
  ['S','…It left the ball.'],
  ['H','It dropped it. That’s different.'],
  ['S','I’d like to try one. A small one. From 2011.'],
  {toss:{tag:'2011',sub:'waved back. wrong person.',ask:'Right. Dropping it. Any second now.',say:['It’s load-bearing. The whole archive leans on it.','What if we NEED it? …Fine. Fine.'],drag:'Careful. That’s the original.',done:'…It’s on the floor.'}},
  ['S','Nothing happened.',{look:'stunned'}],
  ['H','No.'],
  ['S','It’s still THERE.',{look:'squint'}],
  ['H','On the floor. Not on you.'],
  set({mood:'care'}),
  aside(['S','One. I dropped ONE. Don’t tell the archive.']),
  function(){G.rehearsal=true;addLived('“not now”, rehearsed',190);},
  ['S','For the record: the actual “no” took four seconds.'],
  ['S','I rehearsed it for three hours and ten minutes.'],
  ['H','Before or after?'],
  ['S','Both. I’m thorough.']
 ]);}
// ---- src/30-story-monday.js ----
/* ================= the script (all player-facing text) ================= */
var FEAR={
 1:{t:'“Oh” as in “oh no. It’s you.”',
    a:[['S','She saw you and her whole morning went “oh”. You are the “oh” in her day.'],['H','I’m also the “hi”.'],['S','The “hi” was legally required.']],
    b:'By lunchtime the whole floor says “oh”. By Friday, the building. They’ll name the sound after you.',
    walk:'By now the whole building says “oh”. There’s a memo.'},
 2:{t:'“Oh” as in “I forgot you existed.”',
    a:[['S','You are so forgettable she had to reload you.'],['H','She said hi within a second.'],['S','A full second. To remember a colleague of three years.']],
    b:'Soon they forget your desk. Someone puts a plant on it. The plant gets invited to lunch.',
    walk:'The plant has your desk now. The plant went to lunch.'},
 3:{t:'She knows about the email from 2019.',
    a:[['H','What email?'],['S','You signed it “Love,”. To Facilities.'],['H','Nobody remembers that.'],['S','I remember it every night at 3 a.m. That is what I’m FOR.']],
    b:'It’s been forwarded. There’s a group chat. It’s called “Love, Facilities”.',
    walk:'The group chat has a logo now.'}
};
function fearChoice(){
  var out=[];[1,2,3].forEach(function(k){var F=FEAR[k];
    out.push({t:F.t,f:function(){G.fear=k;G.morko.sT=2.1;G.morko.mood='stern';},
      then:F.a.concat([set({s:2.2}),['S',F.b],{stretch:true}])});});
  return out;
}
function scIntro(){return [
  set({clr:1}),
  ['S','I’m Ekskyysmi. Informal head of keeping things from getting awkward.'],
  ['S','My job is simple. Keep you from being rejected. By anyone. Ever.'],
  set({hud:1}),
  ['H','And my job?'],
  ['S','Coffee. I’ll handle the catastrophes.'],
  ['H','Then handle lunch. I’m asking her out loud.'],
  set({plan:1,mood:'alert',s:1.3}),
  ['S','…Out LOUD?'],
  ['H','Suggest something. I’ll decide.'],
  ['S','You usually do. It’s a flaw in the system.'],
  {choice:[
    {t:'Rehearse the sentence. Forty times.',then:[['H','“Would you like to get lunch.”'],['S','You sounded hungry. Desperate, even. Again.'],['H','It’s lunch. Hunger is on topic.']]},
    {t:'Locate the exits.',then:[['S','Door. Window. Cupboard under the sink.'],['H','I’m not hiding under the sink.'],['S','Not with that attitude.']]},
    {t:'Schedule a meeting about whether to ask.',then:[['H','With whom?'],['S','Us. Closed session. No catering.'],['H','I’m asking before you invent a subcommittee.']]}
  ]},
  set({clr:1,s:1,mood:'calm'}),
  set({cowB:1,bx:880}),{wait:1.7},
  ['B','Morning! You’re quiet today.'],
  ['H','Morning.'],
  ['B','You know what you need? To push yourself out of your comfort zone more!'],
  hit(0.55,'B'),{wait:1.1},
  ['S','…Out of the WHAT?'],
  ['S','We haven’t SEEN the comfort zone since 2016.'],
  ['H','I think he’s being nice.'],
  ['S','You are in a room. With a person. Holding a hot drink AND a conversation. This IS the expedition.'],
  {choice:[
    {t:'Tell him about the supermarket.',f:function(){G.advice=1;},then:[['S','Four hundred and twelve visits. It is still a supermarket. Tell him.'],['H','I’m not telling him about the supermarket.']]},
    {t:'Deploy the nod.',f:function(){G.advice=2;},then:[['H','Deploying.']]},
    {t:'Ask where HIS comfort zone is. For later.',f:function(){G.advice=3;},then:[['S','Get an address.'],['H','No.'],['S','A postcode, then.']]},
    {t:'Show him some teeth. Small ones.',f:function(){G.advice=4;G.morko.mood='stern';G.morko.sT=2.3;},then:[['H','Wait—']]}
  ]},
  set({clr:1}),
  function(){return G.advice===4?scBite():[
    ['H','…Thanks. I’ll look into it.']
  ].concat(outside({title:'FROM THE OTHER SIDE OF THE ROOM',dur:'4 seconds',cap:'Two nods. One sip. A perfectly ordinary pause.',anim:'nod'},4.4),[
    calm,
    ['S','Rejection prevented.'],prevent('nodded'),
    ['H','That wasn’t a rejection.'],
    ['S','And it stays that way.']
  ]);}
 ];}
function scBite(){return [
  ['H','Maybe YOUR comfort zone could use a walk, Eero.'],
  set({bFace:-1}),{wait:0.7},
  ['B','…Ha. Fair.']
 ].concat(outside({title:'FROM THE OTHER SIDE OF THE ROOM',dur:'3 seconds',cap:'One slightly sharp joke. Eero laughed a beat too late.',anim:'bite'},4.4),[
  calm,set({pose:'selfmouth',mood:'scared',s:1.3}),
  ['S','…Did we just bite Eero?'],
  ['H','We bit Eero.'],
  ['S','Eero is SOFT. Eero owns a cardigan.'],
  set({pose:null,mood:'worry'}),
  ['S','I was defending us. From advice.'],
  ['H','He was being nice.'],
  ['S','I know that NOW. Two seconds ago he was a predator.'],
  function(){G.bit=true;}
 ]);}
function scSanna(){return [
  set({clr:1,cowA:1,ax:780,cowB:1,bx:880,hud:1,plan:1,mood:'alert',s:1.2}),
  ['S','Here she comes. Remember: casual. Like someone who has lunch all the time.'],
  {wait:0.9},set({aFace:-1,clr:1}),look,
  ['A','oh, hi.'],
  {qte:true},
  function(){return G.qteWon?scResponded():scSpiral();}
];}
function scSpiral(){return [
  set({aFace:1}),hit(1,'A'),archive('bad',[['2011','Waved back at someone who was waving at someone else.'],['2016','Said “you too” when the waiter said “enjoy your meal”.'],['2019','Signed an email “Love,”. To Facilities.']]),{wait:1.4},['N','Ekskyysmi opens the archive. All of it. At once.'],closeArchive,
  set({rate:0.03}),
  ['S','Okay. We missed the window. Nobody panic. I’ve reviewed the “oh”.'],
  ['H','It was a greeting.'],
  ['S','It was a verdict. I just need to work out which one.'],
  {choice:fearChoice},
  ['S','—and after that we—'],
  frozen,{wait:0.9},
  ['S','…Is that me?'],
  ['H','That’s you.'],
  hide,
  function(){return G.warningSize<2.6?
    [['S','That’s my SMALL warning?'],['H','It has shoulders.'],['S','For carrying the concern.']]:
    G.warningSize<3.3?
    [['S','I’m ENORMOUS. Why did nobody say.',{loud:1}],['H','You were presenting.']]:
    [['S','I appear to have become a load-bearing concern.'],['H','Mind the ceiling.'],['S','The ceiling should mind ME.']] ;},
  pokka,
  ['S','Anyway. I was demonstrating scale.'],
  free,
  ['H','It’s been two seconds.'],
  ['S','A lot can happen in two seconds. I just did all of it.'],
  ['S','Recommendation.'],
  {choice:[
    {t:'Become furniture. Very convincing furniture.',preview:'hold',f:function(){G.leak='grow';},then:[['H','For how long?'],['S','Until retirement.'],prevent('furniture')]},
    {t:'Study the cup. It has excellent manners.',preview:'cover',f:function(){G.leak='cover';},then:[['H','It’s a cup.'],['S','Not one personal remark.'],prevent('cup')]},
    {t:'A strategic exit. We can come back.',preview:'pull',f:function(){G.leak='exit';},then:[['H','My coffee’s still here.'],['S','A convincing alibi.'],prevent('door')]},
    {t:'…Say “hi” back. I’ll stay right here.',preview:'comfort',f:function(){G.leak='none';},then:[['S','I reserve the right to wobble.'],['H','You can wobble.']]}
  ]},
  function(){var l=G.leak;G.lines=[];return l==='grow'?[{hold:{kind:'still',secs:2.6}}]:l==='cover'?[{hold:{kind:'cover',secs:3}}]:l==='exit'?[{hold:{kind:'pull',secs:3}}]:[];},
  {wait:0.9},
  function(){return outside({title:'WHAT THE OTHERS SAW',dur:'duration: 2 seconds',cap:OUTCAP[G.leak],anim:G.leak},5.2);},
  function(){var g=G;g.rate=1;calm();if(g.leak==='cover'&&g.day==='C')g.morko.pose='cover';if(g.leak==='grow'&&g.day!=='A')g.human.face='stiff';},
  {wait:0.6},
  function(){return LATER[G.day+'_'+G.leak]();},
  {wait:0.8},
  function(){return scWalk();}
];}
var OUTCAP={none:'A pause. Then a “hi”, just after the moment had moved on.',grow:'Stood very still. Then a slightly too loud hi, to nobody in particular.',cover:'Looked into the cup until the moment had passed.',exit:'Left. The coffee stayed.'};
function lunch(n){return function(){G.lunch=n;};}
var CTAIL={
  seen:[set({s:1.1,mood:'care',anx:0.05}),['S','…I didn’t make that one up.'],['H','No.'],set({pose:'comfort',face:'down'}),['S','I’d like it noted that I don’t enjoy being right.'],['H','Noted.']],
  cover:[['H','What did they say?'],['S','…Weather. They said weather.'],['H','You’re a terrible liar.'],set({pose:null,mood:'care'}),['S','They said: no need to ask the others.'],set({pose:'comfort',face:'down'}),['H','…Okay.'],['S','I’d have covered it forever. I only have the two hands.']],
  exit:[['N','Only the empty room heard that. The shadow would call it a win. It doesn’t feel like one.']]
};
function cDay(tail){return function(){return [set({aFace:1}),['A','Lunch? No need to ask the others, right?'],['B','No need.'],leave,{wait:1.4},function(){G.real=1;}].concat(CTAIL[tail],[lunch(0)]);};}
var LATER={
 A_none:function(){return [set({aFace:1}),['A','Eero, lunch? The noodle place?'],['B','Starving.'],leave,{wait:1.4},['H','…Hi.'],['N','The “hi” arrives. Nobody is left to receive it.'],set({mood:'worry'}),['S','It took us four minutes to agree on “hi”.'],['H','It took them four seconds to go to lunch.'],['S','Different departments.'],lunch(0)];},
 A_grow:function(){return [set({ax:640,aFace:-1}),{wait:1.1},['A','You okay? You look like you’ve seen something big.'],['H','Nothing big.'],said,set({st:'pokka'}),['S','I’m medium. At most.'],set({st:'free'}),['A','Okay! We’re off to lunch. See you!'],set({ax:780,aFace:1}),leave,{wait:1.2},['S','Rejection prevented.'],['H','She said “see you”.'],['S','Not “come with us”. I noticed.'],['H','I was standing like a wardrobe.'],['S','A very convincing wardrobe. Nobody invites a wardrobe.'],lunch(0)];},
 A_cover:function(){return [set({near:1,aFace:-1}),{wait:1.2},['A','I waved just now.'],['H','I was looking at the cup.'],['A','Ha. Good cup. Anyway, we’re heading to lunch!'],set({aFace:1}),leave,{wait:1.2},['S','She likes the cup.'],['H','She went to lunch.'],['S','With the cup’s blessing.'],['H','Without me.'],set({mood:'worry'}),['S','…The cup didn’t mention that part.'],lunch(0)];},
 A_exit:function(){return [set({aFace:-1}),['A','Where did they go?'],['B','They left their coffee.'],['A','Shame. I was going to ask about lunch.'],leave,{wait:1},['N','In the corridor, a shadow records one more rejection prevented. Nobody had been planning one.'],lunch(0)];},
 B_none:function(){return [['S','Good. We said hi. Eventually. Let’s never speak again.'],['H','I’m going to ask.'],['S','Don’t.'],set({flinch:0.6,pose:'selfeyes'}),['H','Sanna, do you want to—'],set({pose:null,aFace:1}),['A','Eero! Wait up, I’m coming!'],leave,{wait:1.3},['H','—get lunch.'],['N','The question arrives at an empty doorway. It was a good question.'],set({mood:'worry'}),['S','She didn’t hear it.'],['H','No.'],['S','So technically she didn’t say no.'],['H','Technically nobody said anything.'],lunch(0)];},
 B_grow:function(){return [set({ax:640,aFace:-1}),{wait:1.1},['A','Hey, I was going to— …never mind.'],set({ax:780,aFace:1}),['A','Eero, let’s just go.'],leave,{wait:1.2},['S','Rejection prevented.'],set({face:'neutral'}),['H','She was about to say something.'],['S','And now she can’t. You’re welcome.'],{wait:0.7},set({mood:'worry'}),['S','…You’re welcome?'],lunch(0)];},
 B_cover:function(){return [set({aFace:1}),['A','I don’t think they want company.'],['B','Shame.'],leave,{wait:1.2},['S','For the record, I saw a hand go up.'],['H','When?'],['S','While I was covering your eyes.'],['H','…'],set({mood:'worry'}),['S','In my defence, the cup was extremely safe.'],lunch(0)];},
 B_exit:function(){return [set({aFace:-1}),['A','Oh. Already gone.'],['B','Maybe they don’t like lunch.'],leave,{wait:1},['N','In the corridor, a shadow records one more rejection prevented.'],lunch(0)];},
 C_none:cDay('seen'),C_grow:cDay('seen'),C_cover:cDay('cover'),C_exit:cDay('exit')
};
function realObs(){
  var g=G;
  if(g.lunch===1)return [['S','For the record. We had lunch.'],['H','We did.'],['S','Because you answered inside the window.'],['H','Because I said hi.'],['S','Those are the same thing and I resent it.']];
  if(g.day==='A')return [['S','For the record, she wasn’t being cold. I’ve rewatched it.'],['H','You said the “oh” was a verdict.'],['S','I said a lot of things. Quickly.'],['P','Sanna: “Missed you at lunch! The noodle place has a new spicy one. Tomorrow?”'],set({mood:'surprised'}),['S','She MISSED us?'],['H','She missed me.'],['S','Same thing. I’m attached.'],['P','You: “Tomorrow!”'],function(){G.lunch=2;}];
  if(g.day==='B'){
    var opening=g.leak==='exit'?
      [['S','We left before she could say anything.'],['H','So we don’t actually know.'],['S','I had a very detailed guess.']]:
      g.leak==='grow'?
      [['S','She started a sentence. We never got the rest.'],['H','We could ask.'],['S','Without a reconstruction of the incident?']]:
      g.leak==='none'?
      [['S','You asked. Out loud. To a doorway.'],['H','I could ask again. Somewhere with a person in it.'],['S','Risky. People are in it.']]:
      [['S','Her hand went up. I saw that much.'],['H','While I was studying the cup.'],['S','The cup has declined to comment.']];
    return opening.concat([['P','You: “Lunch tomorrow?”'],['P','Sanna: “YES. I never know if you want company.”'],set({mood:'surprised'}),['S','…She thought WE didn’t want HER?'],function(){G.lunch=2;}]);
  }
  if(g.leak==='exit')return [['S','We left. I don’t know what happened after that.'],['H','I still felt left out.'],['S','I’d like to fill in the missing bits.'],['H','Let’s call someone first.'],['P','You: “Rough day. Call?”'],['P','Reply: “Calling.”'],set({pose:'comfort'}),['S','Can I come?'],['H','You’re attached to my feet.']];
  return [['S','They said: no need to ask the others. That happened. I’m not doing a bit.'],['H','I know.'],['P','You: “Rough day. Call?”'],['P','Reply: “Calling.”'],['S','…Who is that?'],['H','Someone who asks.'],['S','I’d like to vet them.'],['H','You’ve met. You hid.']];
}
function walkMenu(done){return function(){
  var g=G,o=[];
  if(!done.oh)o.push({t:'Review the “oh”. Again.',f:function(){done.oh=1;g.w.speed=0;g.morko.sT=1.7;g.morko.mood='stern';},then:function(){return [
    ['S','Exhibit A. I’ve had it restored.'],
    replay(1),['A','oh, hi.'],['S','Note the comma.'],['H','People don’t say commas.'],
    replay(2),['A','ohhh. …hi.'],['S','Enhanced. Look at the eyebrows.'],['H','You drew those.'],['S','I RESTORED those.'],
    replay(3),['A','OH.  …  hi.'],['S','Director’s cut. With the audience.'],['H','There was no audience.'],['S','There’s always an audience. It just sits in here.'],
    ['S',FEAR[g.fear].walk],frozen,{wait:0.8},['S','…I’ve scared myself with my own cut.'],
    function(){G.rep=null;free();},
    ['H','Can we watch the original?'],['S','The original is very boring.']
   ].concat(outside({title:'THE ORIGINAL TAPE',dur:'duration: 2 seconds',cap:'Sanna said hi. Nobody else was in the room. Literally nobody.',anim:'tape'}),[
    ['S','…It’s shorter than I remember.'],['H','It’s two seconds.'],['S','Mine has an intermission.'],
    function(){g.morko.sT=1;g.morko.mood='calm';g.clock+=8*60;g.w.late+=8;g.w.speed=34;},
    ['H','That took eight minutes.'],['S','Of a nine-minute walk. Efficient.']]);}});
  if(!done.real)o.push({t:'Mention what I actually saw.',f:function(){done.real=1;g.reflected=true;g.morko.mood='care';},then:function(){return realObs().concat([set({mood:'calm',face:'neutral'})]);}});
  if(!done.zone)o.push({t:'Bring up the comfort zone thing.',f:function(){done.zone=1;g.morko.mood='stern';},then:[
    ['H','Mm.'],['S','I’ve done the maths. Today: one break room, two conversations, one lunch decision. Three expeditions. Eero took the lift.'],
    ['H','He means well.'],['S','He means well from INSIDE his comfort zone. It has a sofa.'],set({mood:'calm'})]});
  if(g.bit&&!done.mika)o.push({t:'Apologise to Eero. I’ve drafted something.',f:function(){done.mika=1;g.morko.mood='worry';},then:[
    ['S','Twelve paragraphs. One diagram. A small poem about cardigans.'],['H','I’ll send one line.'],
    ['P','You: “Sorry I was snappy this morning. Comfort zone advice hits a nerve.”'],{wait:1.2},
    ['P','Eero: “Ha, no, fair. I take the lift for a reason.”'],
    set({mood:'surprised'}),['S','…Eero takes the lift for a REASON?'],['H','Everyone’s got something.'],
    ['S','Does Eero have one of me?'],['H','Probably. A smaller one. In a cardigan.'],set({mood:'calm'})]});
  o.push({t:'We can walk while I’m still worried.',f:function(){done.stop=1;},then:[{wait:0.8},['S','I may bring up the comma again.'],['H','I know. Keep walking with me.']]});
  done.n=(done.n||0)+1;
  return o;
};}
function scWalk(){
  var done={};
  function moreWalk(){return done.stop?[]:[{choice:walkMenu(done)},moreWalk];}
  return [startWalk,{wait:2.6},
    ['S','Right. Debrief. I’ve prepared slides.'],
    ['H','Please don’t have slides.'],
    {choice:walkMenu(done)},
    moreWalk,
    function(){var w=G.w;w.xT=HOMEX;w.speed=Math.max(60,(HOMEX-w.x)/2.6);G.lines=[];},
    {wait:3},
    function(){G.clock=G.w.start+(9+G.w.late)*60;},
    ['S','I’m not entirely finished worrying.'],
    ['H','You can come in anyway.'],
    set({mood:'care',s:1.1}),
    ['S','…Is there toast?'],
    ['H','There’s toast.'],
    {wait:0.5},
    showEnd
  ];
}
function startWalk(){
  var g=G,M=g.morko;
  g.lines=[];g.band=null;g.cur=null;g.cowA=g.cowB=false;g.cupLeft=false;g.gazeT=g.gaze=0;g.darkT=g.dark=0;g.out=null;
  g.human.x=g.human.xT=400;g.human.back=false;g.human.gone=false;g.human.face='neutral';g.human.flinch=0;g.human.sweat=g.human.sweatT=0;g.human.blush=0;g.human.puddle=0;g.cards=[];
  M.st='free';M.pose=null;M.sT=1;M.mood='calm';g.anx=0.15;g.rate=0;g.clock=16*3600+42*60;g.card=2.6;
  g.cz=1.025;g.cx=W/2;g.cy=H/2;
  g.w={x:0,xT:HOMEX-270,speed:34,start:g.clock,late:0};g.tics=[];g.carsSeen=[];music('walk');
}
// ---- src/31-story-week.js ----
/* ================= the week: chapters 2–5 ================= */
// `day` is what the card says. The weekdays are flavour; nothing insists they belong to the same week.
var CHAPTERS=[null,{day:'A MONDAY',title:'Oh, hi.'},{day:'A TUESDAY',title:'Quick chat?'},{day:'A WEDNESDAY, PROBABLY',title:'Could you just…'},{day:'A THURSDAY',title:'Seen.'},{day:'A FRIDAY. NOT NECESSARILY THAT ONE.',title:'Oh, hi. Again.'}];
var RIITTA={body:'#7a6a9c',hair:'#cfc8ba'};
function dayName(n){return CHAPTERS[n].title;} // kept under its old name: the title is what menus show now
function scene(o){return function(){
  var g=G,M=g.morko,Hm=g.human;
  music(o.music||o.set||'room');
  g.set=o.set||'room';g.w=null;g.out=null;g.lines=[];g.band=null;g.cur=null;g.stamp=null;
  g.cowA=g.cowB=g.cowR=false;g.yT=g.yShow=0;g.wT=g.wShow=0;g.wDrop=null;g.toss=null;g.dropped=null;g.bick=0;g.ax=g.axT=1010;g.bx2=g.bxT=1090;g.rx=760;g.aFace=-1;g.bFace=-1;g.aWave=false;g.cupLeft=false;
  Hm.x=Hm.xT=HOME;Hm.gone=false;Hm.back=false;Hm.face='neutral';Hm.flinch=0;Hm.sweat=Hm.sweatT=0;Hm.blush=0;Hm.grin=0;Hm.puddle=0;g.aSweat=0;g.cards=[];g.rep=null;g.zoom=null;g.boss=null;g.ninja=false;g.rBrow=0;g.tics=[];g.dish=null;g.kitchen=false;g.lens=null;g.bar=null;g.rec=null;g.draft=null;g.lib=null;g.qte=null;g.jolt=null;
  M.st='free';M.pose=null;M.coat=null;M.wobble=null;M.asleep=false;M.wake=1;M.dim=null;Hm.pose=null;g.form=null;g.auto=null;g.plain=false;g.paper=null;g.lampOff=false;g.tableShot=false;g.basket=false;g.sat=false;M.sT=o.s||1;M.mood=o.mood||'calm';g.anx=0.12;g.gazeT=0;g.darkT=0;g.rate=1;g.bigNote=null;
  if(o.clock!=null)g.clock=o.clock;if(o.cowR)g.cowR=true;g.snacks=!!o.snacks;
  g.cz=1.025;g.cx=W/2;g.cy=H/2;g.fade=1;g.fadeRate=1.6;g.skippable=false;g.noCup=!((g.set==='room'||g.set==='office')&&(o.clock==null||(o.clock>=7*3600&&o.clock<12.5*3600)));g.phoneN=0;g.mugFixed=true;M.asleep=false;Hm.facing=1;Hm.sipT=0;
};}
function begin(n,o){return [scene(o),function(){
  var g=G;g.chapter=n;g.moment=null;newDay();g.planText=o.plan;g.label=CHAPTERS[n].title;g.hud=true;g.plan=true;g.fade=0;
  g.morko.s=1;g.morko.off=-70;g.chap={day:CHAPTERS[n].day,title:CHAPTERS[n].title,t:0};saveProgress(n);stopVoice();sfx('card');
 },{wait:2.8},function(){G.chap=null;G.fade=1;}];}
function shadowHit(){var g=G;trigger();addLived('the one that landed',LIVED.shadowHit);sfx('hit');g.pulse=0.9;g.shake=RM?0:0.8;g.lines=[];g.cur=null;g.flash=0.8;g.morko.sT=0.62;g.morko.mood='scared';g.morko.pose=null;g.anx=0.9;g.cz=1.08;g.cx=W/2-30;g.cy=300;}
function yes(){G.yes++;G.human.grin=G.yes;addLived('saying yes, regretting it',30);}

function scTue(){return begin(2,{plan:'Get through Tuesday.',clock:16*3600+55*60}).concat([
  tuesdayOpening,
  {wait:0.6},
  ['P','Riitta: “Quick chat tomorrow at 9?”'],
  hit(0.9,'P'),set({sweat:0.7}),{wait:1.2},
  ['S','“Quick.”',{look:'squint'}],
  ['S','Nobody says “quick” about good news. Good news takes its time. Good news has cake.'],
  ['H','It’s probably nothing.'],
  ['S','It’s five words and a question mark. It’s EVERYTHING.'],
  {choice:[
    {t:'We’re being fired. Efficiently.',then:[['S','Nine o’clock. Before the coffee works. So you can’t fight back.'],['H','I’ve never fought back in my life.'],['S','She doesn’t know that. I’ve kept it very quiet.',{look:'pleased'}]]},
    {t:'She found the thing.',then:[['H','What thing?'],['S','I don’t know. That’s what makes it so bad. It could be ANY of the things.'],['H','There are no things.'],['S','There are always things.']]},
    {t:'It’s about Monday.',then:mondayCallback}
  ]},
  set({s:1.4,mood:'alert'}),
  ['S','Reply at once. Show enthusiasm. A professional amount.'],
  {choice:[
    {t:'“Sure!” With the exclamation mark.',then:[['S','Too keen. She’ll smell fear. Take it out.']]},
    {t:'“Sure.” With a full stop.',then:[['S','Too cold. A full stop is a slammed door. Put something back.']]},
    {t:'“Sure” and nothing else. Raw.',then:[['S','No punctuation at all? What are we, feral?']]}
  ]},
  ['P','You: “Sure, 9 works.”'],
  ['S','…You sent it. Without a committee.'],
  ['H','It’s a calendar reply.'],
  ['P','Riitta reacted with a thumbs-up.'],
  ['S','A thumb.',{look:'stunned'}],
  aside(['S','ONE thumb. She has two.']),
  calm
 ],outside({title:'WHAT THE CALENDAR SAW',dur:'duration: 40 seconds',cap:'A meeting was scheduled.',anim:'text'}),[
  scene({set:'home',clock:3*3600+7*60}),
  ['N','03:07.'],
  ['S','Are you awake?'],
  ['H','I am now. It’s three in the morning.'],
  ['S','Out there, yes. In here it’s about Thursday. I did the afternoon twice.'],
  ['S','Good. I’ve prepared tomorrow. Three scenarios.',{look:'pleased'}],
  {choice:[
    {t:'Scenario one: “We need to talk about your attitude.”',then:[['S','You say: “I don’t have an attitude.” Which is an attitude.'],['H','I’ll just listen.'],['S','Listening is suspicious.']]},
    {t:'Scenario two: she isn’t angry. She’s disappointed.',then:[['H','Oh no.'],['S','I know. I shouldn’t have said it out loud. Now it’s in the room.']]},
    {t:'Scenario three: while we’re up, the archive.',then:[['S','2011. You waved at someone who was waving at someone else.'],['H','Why do you still HAVE that?'],['S','I keep everything. It’s a safety archive.']]}
  ]},
  ['S','And if it’s none of those, I have the full list. Four: she sighs first. Five: she doesn’t sigh, which is worse. Six: there is a biscuit. They soften you up with a biscuit. Seven: the whole department is there. Eight: there is a cake. It says “goodbye”. Your name is spelled wrong. Nine: we correct the spelling. Ten: the correcting is what they remember.',{big:true}],
  ['S','…'],
  ['S','Who said all that?'],
  ['H','You did. It’s blocking the window.'],
  ['S','It’s ENORMOUS. Is that how it comes out?'],
  ['H','Imagine being under it.'],
  set({mood:'worry',s:1}),
  ['S','…I’ll use a smaller font.',{quiet:1}],
  ['H','What time is it?'],
  ['S','Three. The best time. Nobody can reject us at three.'],
  ['H','Nobody can do anything at three. That’s the problem.'],
  ['S','…I’ll take the first watch.'],
  ['H','There’s only one watch. It’s you. Every night.'],
  ['S','And yet nobody has ever been rejected in their sleep. You’re welcome.',{look:'pleased'}],
  scene({set:'office',clock:9*3600,cowR:1,s:1.3,mood:'alert'}),set({sweat:1}),
  addTic('The next morning, 9:00. The quick chat.',230,62,{life:3.4,size:19}),{wait:1.6},
  ['R','Thanks for coming. I’ll be quick.'],
  ['S','“Quick.” Again. Brace.'],
  ['R','The client report was excellent. Really clear.'],
  ['S','Pleasantries. Don’t get comfortable.',{look:'squint'}],
  ['R','And people like working with you. Sanna said so, actually.'],
  ['S','Padding.',{look:'squint'}],
  ['R','One small thing: the summary could be shorter next time.'],
  hit(0.95,'R'),function(){G.bigNote={text:'SHORTER',t:0};},set({blush:1}),archive('bad',[['YEAR 2','Showed someone a drawing. Somebody laughed.'],['YEAR 4','“Neat handwriting. Could be neater.”'],['2022','Laughed at my own joke. In a meeting. Alone.']]),{wait:1.4},['N','The archive again. Filed by wound.'],closeArchive,
  ['S','THERE it is.',{loud:1}],
  ['S','“Shorter.” The summary is too long. YOU are too long. Your whole deal is too long.'],
  ['R','Otherwise, great work. Keep it up.'],
  ['S','Did she say something just then? I was busy with the wound.'],
  ['H','Why is there a puddle?'],
  ['S','Ignore the puddle. The puddle is MY department.'],
  {choice:[
    {t:'Apologise. For the summary, and in general.',f:function(){G.fb='sorry';},then:[['H','Sorry, I— sorry. I’ll fix it. Sorry.'],['R','It’s… fine? It’s one note.']]},
    {t:'Explain why it was long. At length.',f:function(){G.fb='explain';},then:[['N','The explanation of why the summary was long takes four minutes.'],['R','…Right. So. Shorter.']]},
    {t:'Go very quiet. Nod. Leave the body.',f:function(){G.fb='quiet';},then:[['H','Mm.'],['R','You okay? You went somewhere.'],['H','Fine. It’s nothing.'],said]},
    {t:'…Ask what “shorter” means.',f:function(){G.fb='ask';},then:[['S','That’s walking TOWARDS it.'],['H','How short is shorter?'],['R','Half a page. That’s all. The content’s great.'],['S','…Half a page. That’s not a character flaw. That’s a measurement.']]}
  ]},
  function(){G.bigNote=null;G.human.sweatT=0;return outside({title:'WHAT RIITTA SAW',dur:'duration: 3 minutes',anim:'text',
    cap:{sorry:'A good review. One note. Four apologies.',explain:'A good review. One note. One long answer about length.',quiet:'A good review. One note. Then nobody home.',ask:'A good review. One note. One question.'}[G.fb]});},
  scene({set:'room',clock:9*3600+12*60}),
  addTic('9:12. Back at the desk.',160,62,{life:3,size:19}),{wait:1.2},
  ['H','That went well.'],
  ['S','We were CRITICISED.',{loud:1}],
  ['H','I was praised. Twice. You talked over it.'],
  set({mood:'surprised'}),
  ['S','…She said nice things?',{look:'stunned'}],
  ['H','Two. Maybe three.'],
  ['S','I don’t have those. I only wrote down “shorter”. In capitals. Twice.'],
  ['H','That’s the trouble with your filing system.'],
  ['S','It’s not a filing system. It’s a smoke alarm. It doesn’t have a setting for “nice”.'],
  function(){G.pop={text:'Filed: 1 note. Misplaced: 3 compliments.',t:0};},
  {wait:1.6}
 ]);}

function yesMenu(s,extra,extraKey){return {choice:[
  {t:'Say yes.',f:yes,then:[['H','Sure.'],['S',s[0]]]},
  {t:'Say yes. Enthusiastically.',f:yes,then:[['H','Sure! Happy to!'],['S',s[1]]]},
  {t:'Say yes, and offer something extra.',f:function(){yes();yes();if(extraKey)G[extraKey]=true;},then:[['H',extra],['S',s[2]]]},
  {t:'No.',off:true}
]};}
function scWed(){return begin(3,{plan:'Do your own work for once.',clock:10*3600+20*60}).concat([
  set({cowB:1,bx:880}),{wait:1.6},
  ['B','Hey! Quick favour. Could you take my slides for Friday? I’m swamped.'],
  ['H','I’ve got my own—'],
  ['S','Careful. A “no” is a rejection. Of HIM. Then he rejects us back. It’s a rejection exchange programme.'],
  yesMenu(['Clean. Safe. Nobody is upset.','An exclamation mark. Out loud. Bold.','We volunteered for a second thing to apologise for hesitating on the first. Textbook.'],'Sure — and I can do the handout too.','handout'),
  ['B','Legend.'],
  set({cowA:1,ax:780}),{wait:1.4},set({aFace:-1}),
  ['A','Oh — are you coming on Thursday? Board games, my place. Eero’s in.'],
  set({mood:'surprised',s:1.5}),
  ['S','An invitation. A real one. With a day on it.'],
  function(){return G.real?[['S','After Monday? I’m not un-noting Monday.'],['H','Noted. I still want to go.']]:[];},
  ['S','Say yes before she comes to her senses.'],
  ['H','I’d love to.'],yes,
  set({aFace:1,mood:'calm',s:1.1}),
  ['B','Brilliant. Could you bring the snacks? And maybe drive?'],
  yesMenu(['Snacks AND driving. We are the infrastructure now.','Happy to. HAPPY to. We said it twice in case he missed it.','You offered to host the afterparty of a board game night. There is no afterparty.'],'Sure — I could host an afterparty too?','afterparty'),
  ['S','Look at that. Everyone likes us.',{look:'pleased'}],
  ['H','My face hurts.'],
  ['S','That’s the smile. It’s load-bearing.'],
  ['H','I’m extremely tired.'],
  ['S','Liked AND tired. The classic combination.',{look:'pleased'}]
 ],outside({title:'WHAT THE OTHERS SAW',dur:'duration: 2 minutes',cap:'Someone helpful. Possibly too helpful. Nobody checked.',anim:'nod'}),[
  scene({set:'home',clock:23*3600+40*60}),function(){G.human.grin=0;},
  ['N','23:40. Eero’s slides.'],
  ['H','It’s nearly midnight and I’m doing Eero’s slides.'],
  extraWorkCallback,
  ['S','And nobody is angry with us.'],
  ['H','I’m a bit angry with us.'],
  aside(['S','…That doesn’t count. That’s internal.']),
  ['H','It counts.'],
  {choice:[
    {t:'A “no” costs us people.',then:[['S','Every no is a door closing.'],['H','Every yes is me doing slides at midnight.']]},
    {t:'We could get ill. Convincingly.',then:[['S','A light flu. Respectable. Nobody rejects the ill.'],['H','I’m not faking flu to avoid a two-letter word.']]},
    {t:'What if we said… “not this time”?',then:[['S','It’s a no in a coat.'],['H','That’s further than you’ve ever gone.'],['S','I feel sick.']]}
  ]},
  set({mood:'worry'}),
  ['S','I only have the one move, you know. Keep everyone pleased. It works.'],
  ['H','It works on everyone except me.'],
  {wait:1.2}
 ]);}

var SEEN={
  worries:{t:'Send: “No worries if not!”',a:[['P','You: “No worries if not!”'],['S','Casual. Breezy. A person with no worries.'],['H','I have nothing BUT worries. You put them in an exclamation mark.']],
    r:[['P','Sanna: “Phone died!! 7. And there are ALWAYS worries, who are you kidding.”']]},
  cancel:{t:'Send: “Actually, I can’t make it.” Leave before we’re left.',a:[['P','You: “Actually I can’t make it tonight, sorry!”'],['S','Clean. Dignified. She can’t uninvite us now.',{look:'pleased'}],['H','I WANTED to go.'],['S','…I know.']],
    r:[['P','Sanna: “Oh no! Phone died, only just saw this. We’ll miss you.”'],['S','…She would have said yes.',{look:'stunned'}],['H','Yeah.'],['S','I cancelled us out of a yes.'],['P','You: “Ignore that. I panicked. 7?”'],['P','Sanna: “Ha. 7. Bring the panic too.”']]},
  freezer:{t:'Send nothing. Put the phone in the freezer.',a:[['S','It can’t hurt us from in there.'],['H','It’s next to the peas.'],['S','The peas will keep an eye on it.',{look:'pleased'}]],
    r:[['N','A phone is retrieved from the freezer. It has one new message and smells faintly of peas.'],['P','Sanna: “SORRY. Phone died. 7? Bring the snacks, you hero.”']]},
  bite:{t:'Send: “???”. With teeth.',a:[['P','You: “???”'],set({pose:'selfmouth',mood:'scared'}),['S','…That had teeth.'],['H','That was you.'],set({pose:null})],
    r:[['P','Sanna: “??? to you too! Phone died. 7?”'],['S','She bit back. Affectionately. Is that allowed?',{look:'squint'}]]}
};
function scThu(){return begin(4,{set:'home',plan:'Go to board game night.',clock:17*3600+30*60,snacks:1}).concat([
  countBags,{wait:2.8},
  ['S','Snacks: eleven bags. Car: fuelled. Us: early. I have no notes.',{look:'pleased'}],
  ['P','You: “What time tonight? I’ve got the snacks.”'],
  ['P','Seen 17:31.'],
  {wait:1.6},
  hit(0.6,'P'),set({sweat:0.6}),archive('bad',[['2009','Texted “haha”. Got back “ok”.'],['2018','Group chat went silent after my message. Six minutes.'],['2023','“We should hang out sometime!” We did not.']]),{wait:1.4},['N','The archive, sorted by silence.'],closeArchive,
  ['S','“Seen.”',{look:'stunned'}],
  ['S','She has SEEN it. With her eyes. And chosen silence.'],
  ['H','It’s been one minute.'],
  ['S','A minute is sixty separate decisions not to reply.',{look:'squint'}],
  function(){G.clock=17*3600+52*60;},
  ['N','17:52.'],
  set({s:1.7,mood:'stern'}),
  ['S','Twenty-one minutes. I’ve drafted some follow-ups.'],
  {choice:function(){return ['worries','cancel','freezer','bite'].map(function(k){return {t:SEEN[k].t,f:function(){G.txt=k;if(k==='bite')G.bit=true;},then:SEEN[k].a};});}},
  function(){G.clock=18*3600+40*60;},
  ['N','18:40. Still nothing.'],
  set({s:2.5,mood:'stern',anx:0.8}),
  ['S','She hates us. Eero hates us. Riitta wants a shorter you. I’ve run the numbers. It’s unanimous.'],
  ['H','Stop.'],
  ['S','I’m PROTECTING you.',{loud:1}],
  ['H','From what? Board games?'],
  ['H','You’ve had me apologising to furniture all week. I’m at home with eleven bags of snacks.'],
  ['H','You’re not protecting me. You’re just the loudest thing in the room.'],
  shadowHit,set({sweat:0}),{wait:2.2},
  ['S','…That one landed.'],
  function(){return G.metSannaShadow?[['S','With a full stop.']]:[];},
  set({face:'down'}),
  ['H','Sorry.'],
  ['S','No. It’s fine. It’s just— that’s what it’s like.'],
  ['H','What is?'],
  ['S','All of it. Every “oh”. Every “quick chat”. It doesn’t arrive as a note. It arrives as a hit.'],
  ['S','I can’t tell a paper cut from an amputation. They all come in as amputations. So I treat everything as one. It seemed safest.'],
  set({face:'neutral'}),
  ['H','I know. I feel it before you’ve said a word.'],
  ['S','You do?',{look:'soft'}],
  ['H','It’s my chest. You just do the commentary.'],
  ['S','…I thought I was the alarm.',{look:'soft'}],
  ['H','You’re the alarm, the fire brigade, and a man shouting “fire” in a different building.'],
  set({s:0.9,mood:'worry',anx:0.2}),
  {choice:[
    {t:'Then what am I for?',then:[['H','You notice things. You knew I was tired before I did.'],['S','I notice EVERYTHING.'],['H','That’s the good half. People call it “too sensitive”. It’s just sensitive. The volume is the other half.']]},
    {t:'I don’t know how to be smaller.',then:[['H','You don’t have to be smaller. You have to stop driving.'],['S','I can sit in the passenger seat?'],['H','You can do the map.'],['S','I’m excellent at worst-case routes.']]},
    {t:'It’s going to keep happening, isn’t it.',then:[['H','Probably. Tomorrow. Next week.'],['S','And I’ll still go off.'],['H','And I’ll still be here when you’re done.']]}
  ]},
  ['H','How long have you been doing this?'],
  ['S','Since a Tuesday. You were seven.'],
  ['H','What happened?'],
  ['S','You showed someone a drawing.'],
  {wait:1.4},
  ['S','I’ve been on shift ever since.'],
  ['H','That’s a long shift.'],
  ['S','Nobody came to relieve me.',{look:'soft'}],
  set({mood:'care',s:1.1,pose:'comfort'}),
  ['S','I’ve been reviewing my job description.'],
  ['H','And?'],
  function(){G.job={t:0};G.lines=[];stopVoice();sfx('turn');},{wait:4.4},
  function(){G.jobDone=true;G.job=null;easeDay();},
  ['S','I can’t stop it happening. I checked. Extensively.'],
  ['S','But I could stay. When it does.'],
  ['H','Show me.'],
  function(){G.clock=18*3600+41*60;},
  {hold:{kind:'stay',secs:4,clock:1,text:'Staying. Not fixing. Not drafting. Staying.'}},
  ['S','Four minutes of doing nothing. It’s the hardest thing I’ve ever done.'],
  ['H','Same hours?'],
  ['S','Same hours. Fewer exits.'],
  set({pose:null}),
  function(){return SEEN[G.txt].r;},
  set({mood:'surprised'}),
  ['S','Her phone died.'],
  ['H','Her phone died.'],
  ['S','For over an hour I grieved a battery.',{look:'up'}]
 ],outside({title:'WHAT SANNA SAW',dur:'duration: over an hour',cap:'A dead phone. A long hunt for a charger. Then your message.',anim:'text'}),[
  calm,
  ['H','Coming?'],
  ['S','I’m attached to your feet.'],
  ['H','That’s not what I asked.'],
  ['S','…Yes. I’m coming.',{look:'soft'}],
  {wait:0.8}
 ]);}

function wobbleOn(){var m=G.morko;m.wobble={t:0};m.pose='balance';m.mood='worry';G.anx=0.2;}
function wobbleOff(){var m=G.morko;m.wobble=null;m.pose=null;if(RM)updHands(1);}
function scFri(){return begin(5,{plan:'Say the thing.',clock:9*3600+41*60}).concat([
  set({cowB:1,bx:880}),
  set({sweat:0.45}),
  ['S','Friday. Same room. Same coffee. I’d like to flag that I’m calm.'],
  function(){return G.lab?[]:[['H','You’re in early.'],['S','I asked for one morning back. A week.'],['H','Who did you ask?'],aside(['S','…You left the lamp on.'])];},
  ['H','You’re vibrating.'],
  ['H','And I’m sweating.'],
  ['S','Professionally.'],
  ['S','Calmly.'],
  set({cowA:1,ax:780,mood:'alert',s:1.2}),{wait:1.5},set({aFace:-1,clr:1}),look,
  ['A','oh, hi.'],
  qteAuto,{wait:0.45},
  ['H','Hi.'],
  function(){G.qte=null;},
  function(){return G.lab?[]:[['A','There you are.'],['H','I’ve been here all week.'],['A','Mm. Not quite.']];},
  ['S','…That’s not the procedure.',{look:'squint'}],
  ['H','That’s the whole procedure.'],
  set({aFace:1}),hit(0.8,'A'),{wait:1.3},
  ['S','…It still went off. Even though we got it right.'],
  ['H','I felt it.'],
  fridayReflex,
  ['H','I know. Stay.'],
  {hold:{kind:'stay',secs:2.6,text:'Staying. In public. With everyone looking.'}},
  set({pose:null}),
  stampHover,
  ['S','I’ve got a verdict ready. Three, actually. They’re very good.'],
  ['H','I know they are.'],
  stampPutAway,{wait:0.6},
  {choice:[
    {t:'Read the verdict anyway. Quietly.',then:[['S','For the record: she hates us.',{quiet:1}],['H','Noted.'],['S','That’s it? “Noted”?'],['H','You said it. I heard it. We’re still standing here.'],['S','…Huh. It’s smaller once it’s out.',{look:'soft'}]]},
    {t:'Hold the verdict. Count to two.',then:[['S','One.'],['S','Two.'],['S','It’s been two seconds and nothing has happened to us.'],['H','Nothing was going to.'],['S','We didn’t KNOW that. We know it now.']]},
    {t:'Stay. Wobble visibly.',then:[wobbleOn,['S','I’m wobbling.'],['H','I can see that.'],['S','In front of people.'],['H','They can’t see you.'],['S','It’s the principle.'],wobbleOff]}
  ]},
  calm,set({aFace:-1,near:1}),
  ['A','You okay?'],
  ['H','It’s something. Small. Give me a minute.'],
  set({mood:'surprised'}),
  ['S','…That’s not what we say.'],
  function(){var n=G.nothings||0;return [['S',n>1?'We say “nothing”. We’ve said it '+(n===2?'twice':n===3?'three times':n+' times')+' this week. I keep them in a folder.':'We say “nothing”. There’s a folder.']];},
  ['A','Take your minute.'],
  {wait:1.4},
  set({mood:'calm'}),
  ['H','Okay. Can I say something odd?'],
  ['A','Always.'],
  ['H','When someone says “oh, hi”, my brain hears a verdict. It’s very loud for two seconds. Then I spend a day on it.'],
  ['S','A WEEK. Be accurate.'],
  ['A','…Oh.'],
  ['S','There it is AGAIN—'],
  ['H','Shh.'],
  set({aSweat:0.55,sweat:0}),
  ['A','I do that with “fine”. Someone says “fine” and I’m up till three.'],
  lensPeek(function(){return {x:G.ax,y:FEETY-150};},'SANNA: ALSO UP TILL THREE.'),
  function(){G.zT=1;},{wait:1.6},
  fridayShadow,
  archive('good',[['2026','She has one too.']]),
  ['S','…Filed. Under the other pile.',{look:'soft'}],
  ['H','There’s another pile?'],
  ['S','There is NOW.'],closeArchive,
  ['A','Is that why you vanish at lunch? We stopped asking. I thought asking was pressure.'],
  ['H','I thought not being asked was the verdict.'],
  ['A','So we’ve been being polite AT each other. For a year.'],
  mondayRepair,
  set({bFace:-1,mood:'alert'}),
  function(){return G.handout?[['B','By the way, thanks for the handout. You didn’t have to do that.'],['S','He says that NOW.'],['H','He didn’t actually ask for it.'],aside(['S','I may have supplied the asking.'])]:[];},
  ['B','Hey! While you’re both here — could you also take my Monday shift?'],
  ['S','Here we go. I’ll get the “sure”.'],
  {choice:[
    {t:'No. (I will wobble.)',f:function(){G.no=true;},then:[['H','Not this time, Eero.'],set({s:1.5,mood:'scared'}),['S','He’s going to—'],['B','Fair enough! I’ll ask Riitta.'],set({s:1.1,mood:'surprised'}),['S','…He survived. WE survived. It was three words.',{look:'stunned'}]]},
    {t:'Say yes. Old habits.',f:yes,then:[['H','Sure.'],['S','Next time, then.'],['H','Next time.'],['S','I’ll put the “no” in the archive. Under “pending”.']]}
  ]},
  set({aFace:-1,mood:'calm'}),
  function(){return [['A',G.lunch===2?'Lunch? It’s Friday. No dentist.':'Lunch?']];},
  ['S','It’s a tr—'],
  ['S','…No. It’s lunch.',{look:'soft'}],
  set({face:'smile'}),
  ['H','Lunch.'],
  postingPayoff
 ],outside({title:'WHAT THE OTHERS SAW',dur:'duration: 2 seconds',cap:'Two colleagues going to lunch.',anim:'none'}),[
  ['S','For the record, I intend to go off again on Monday.',{look:'soft'}],
  ['H','I know. I’ll be there.'],
  {wait:0.8}
 ]);}
// chain(3) is Wednesday onwards. chain(3,'glass') picks the story up at that moment, without replaying Wednesday.
function chain(n,from){
  var out=[],fns=[null,null,scTue,scWed,scThu,scFri];
  for(var i=Math.max(2,n);i<=5;i++){
    var ms=AFTER[i]||[],k=i===n&&from?ms.indexOf(from):-1;
    if(k<0){(function(f){out.push(function(){return f();});})(fns[i]);k=0;}
    out=out.concat(ms.slice(k).map(interlude));
  }
  out.push(showWeekEnd);return out;
}
function startChapter(n,at){
  n=Number.isInteger(n)?clamp(n,1,5):1;
  var saved=loadProgress(),sv=saved&&saved.chapters[n]||{};
  if(at&&at.ch===n&&n>1){   // Continue, in the middle of a chapter
    reset(at.state.day||'B');var h=G;Object.keys(at.state).forEach(function(k){h[k]=at.state[k];});
    h.started=true;h.jobDone=at.jobDone;h.chapter=n;newDay();Q=chain(n,at.moment);run();return;
  }
  if(n<=1){startGame(sv.day||null,false);return;}
  reset(sv.day||'B');var g=G,c=checkpoint(sv);Object.keys(c).forEach(function(k){g[k]=c[k];});g.started=true;g.jobDone=n>4;
  Q=chain(n);run();
}
// ---- src/32-callbacks.js ----
/* Small consequences: remember what this player actually did or heard. */
function tuesdayOpening(){
  if(G.lunch===1)return [
    ['S','Tuesday. Monday’s lunch report: we had lunch. No incident. Nothing to file.'],
    ['H','You could leave it blank.'],
    ['S','I’ve filed the blank. For completeness.']
  ];
  // The lunch arranged by message on Monday does not quietly happen off-screen: it moves to Friday.
  // What the human wants (lunch with Sanna) stays open until the last scene.
  if(G.lunch===2)return [
    ['S','Tuesday. Nearly five. Lunch report: moved. Sanna, 11:40: “Dentist!! Sorry!! Friday?”'],
    ['H','You reviewed the exclamation marks for an hour.'],
    ['S','There are four. That’s either remorse or enthusiasm. I’ve filed it under both.']
  ];
  return [
    ['S','Tuesday. Nearly five. No incidents. I’d like it noted that I did nothing all day and it worked.'],
    ['H','You reviewed a comma for an hour.'],
    ['S','Quietly.',{quiet:1}]
  ];
}
function fridayShadow(){
  var known=G.metSannaShadow;G.metSannaShadow=true;
  if(known)return [set({mood:'care'}),
    ['Z','Oh. You’re back.'],
    ['S','Evenings. And Fridays.'],
    ['Z','I checked. Tuesday works.'],
    ['S','By the radiator.'],
    ['Z','I moved a worry.']
  ];
  // A chapter opened from an older save may still be their first meeting.
  return [set({mood:'surprised'}),['S','…She HAS one.'],['S','Hello.'],['Z','…excuse me.'],['S','That’s MY name.']];
}
function mondayCallback(){
  var g=G;
  if(g.bit)return [['H','The joke I made at Eero?'],['S','We have motive. Witnesses. A cardigan.'],['H','Riitta wasn’t there.'],['S','Cardigans travel.']];
  if(g.real&&g.leak!=='exit')return [['H','They left me out of lunch.'],['S','And now there’s a meeting. The plot has acquired a calendar.']];
  if(g.leak==='exit')return [['H','I left the room.'],['S','An exit. Followed by an interview.'],['H','Don’t put those together.']];
  if(g.lunch===1)return [['H','We had lunch.'],['S','With witnesses.'],['H','They’re called colleagues.'],['S','Dual roles. Very efficient.']];
  if(g.lunch===2)return [['H','Sanna moved lunch to Friday. That’s all that happened.'],['S','Exactly. First the lunch moves. Then the desk.']];
  return [['H','We barely spoke.'],['S','Exactly. A suspicious lack of evidence.']];
}
function extraWorkCallback(){
  var out=[];
  if(G.handout)out.push(['H','And the handout. Which nobody asked for.'],['S','An unsolicited gesture of employability.'],['H','It has a contents page now.'],['S','Of course. We’re very thorough when cornered by ourselves.']);
  if(G.afterparty)out.push(['H','And apparently I’m hosting an afterparty.'],['S','The board games might need somewhere to unwind.'],['H','They live in a box.'],['S','Exactly. Cooped up all week.']);
  return out;
}
function fridayReflex(){
  var line={cover:'Every part of me wants the cup.',grow:'Every part of me wants to become furniture again.',exit:'I’ve located the door. For old times’ sake.',none:'I’ve got “hi” ready. And several escape plans.'}[G.leak];
  return [['S',line]];
}
function mondayRepair(){
  if(!G.real)return [];
  if(G.leak==='exit')return [['H','I left before lunch on Monday. Then I spent the day guessing.'],['A','We went without asking you. I’m sorry. That was lazy of us.'],['S','I had seventeen theories. None of them were that short.']];
  return [['H','Monday stung, though. “No need to ask the others.”'],['A','…You heard that. I’m sorry. That was lazy of us.'],['S','I’d like that in writing.']];
}
// ---- src/33-moments.js ----
/* ================= the order of things: a life in small moments, not a calendar ================= */
// The five long chapters are the spine. Between them sit shorter moments (the same scripts the Scenario lab plays).
// Time floats on purpose: a card says roughly when, never which week. To reorder the story, edit AFTER.
// The order is not arbitrary (see KASIKIRJOITUS.md, "Rakenne"):
//   after 2: Ekskyysmi doubles down (zoom, withdrawal)            first half of act two: the old job, getting costlier
//   after 3: the glass turned on its owner = MIDPOINT; then other people's shadows, ending with one that
//            says "oh. hi." to Ekskyysmi itself, so it walks into Thursday knowing how that lands;
//            last, an evening where nothing happens (a friend who already knows you count): the calm before Thursday
//   after 4: the job description has changed. A relapse, a real one survived, an evening of nothing.
//            Then the second act (TOINEN_NAYTOS.md): a hit with no sender, a form that signs the shadow away,
//            a day without it (the false victory), and a lamp switched on to ask it back.
//   after 5: the drawing. The oldest file gets updated.
var AFTER={
  2:['enhance','posting'],
  3:['detail','glass','sometime','colleagues','evening'],
  4:['reply','notnow','bar','nothing','form','quiet','evenings'],
  5:['comments']
};
var WHEN={nothing:'A SUNDAY, LATE AFTERNOON',form:'A WEEKDAY, 14:10',quiet:'THE FIRST MORNING',evenings:'THE SAME DAY, 21:00',posting:'THAT NIGHT, LATE',detail:'THE NEXT AFTERNOON',enhance:'A MEETING, SOME MORNING',glass:'ONE ORDINARY MORNING',notnow:'AN AFTERNOON',reply:'THE EVENING AFTER BOARD GAMES',bar:'AN EVENING',
  colleagues:'AFTER LUNCH, SOME DAY',comments:'A SUNDAY EVENING',sometime:'LEAVING WORK',evening:'AN EVENING AT HOME',voice:'LATER THAT EVENING',library:'TWENTY-THREE DAYS LATER'};
function interlude(id){return function(){G.lab=null;G.moment=id;saveMoment(id);return LABS[id].script();};}
function momentsAfter(n){return (AFTER[n]||[]).map(interlude);}
// ---- src/34-response.js ----
/* ================= the correct response: a window that is technically open ================= */
// Right after "oh, hi." on the first Monday, Ekskyysmi demands the correct response, in the correct order,
// inside the correct window. It is possible. It is not reasonable. Missing it is the story; making it is a secret.
// On Friday the same window opens again, and the human answers it with one word.
var RESPONSE=[
  {k:'ArrowUp',sym:'↑',label:'SMILE'},
  {k:'ArrowDown',sym:'↓',label:'NOD'},
  {k:'ArrowLeft',sym:'←',label:'EYE CONTACT (NOT TOO MUCH)'},
  {k:'ArrowRight',sym:'→',label:'SAY “HI”'},
  {k:' ',sym:'SPACE',label:'BREATHE'}
];
var QTE_SECS=2.8,QTE_SECS_TOUCH=3.1; // the original 0.8 s, plus two seconds for reading (requested by the human)
function qteSecs(coarse){return (coarse?QTE_SECS_TOUCH:QTE_SECS)*(slowReality?3.2:1);}
function startQte(){
  var g=G,coarse=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches),order=RESPONSE.map(function(_,i){return i;});
  // on a touch screen the buttons arrive shuffled, because of course they do
  if(coarse)for(var i=order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=order[i];order[i]=order[j];order[j]=t;}
  g.qte={i:0,t:0,secs:qteSecs(coarse),end:null,endT:0,order:order,auto:false};g.qteWon=false;
  g.lines=[];g.cur={who:'S',text:'RESPOND. CORRECTLY. NOW.'};stopVoice();sfx('startle');
  WAIT='qte';LOCK=0;render();
}
// Friday: the same window, answered without the procedure.
function qteAuto(){var g=G;g.qte={i:0,t:0,secs:qteSecs(false),end:null,endT:0,order:RESPONSE.map(function(_,i){return i;}),auto:true};g.lines=[];sfx('startle');}
function qteInput(idx){
  var q=G.qte;if(!q||q.end||q.auto||WAIT!=='qte'||paused)return;
  if(idx===q.i){q.i++;sfx('pick');if(q.i>=RESPONSE.length)qteEnd(true);else render();}
  else qteEnd(false,'wrong');
}
// Arrow keys and Space are the procedure. Enter, the usual "carry on" key, is an incorrect response.
function qteKey(e){
  for(var i=0;i<RESPONSE.length;i++)if(e.key===RESPONSE[i].k){qteInput(i);return true;}
  if(e.key==='Enter'){qteInput(-1);return true;}
  return false;
}
function qteEnd(won,why){var g=G,q=g.qte;q.end=won?'won':(why||'late');q.endT=0;g.qteWon=won;if(!won)addLived('the response, revisited',LIVED.qteMissed);sfx(won?'good':'nope');render();}
function stepQte(dt){
  var q=G.qte;if(!q)return;
  q.t+=dt;
  if(q.auto){if(!q.end){q.i=Math.min(RESPONSE.length,Math.max(0,Math.floor((q.t-0.6)/0.07)+1));if(q.i>=RESPONSE.length){q.end='won';q.endT=0;sfx('good');}}else q.endT+=dt;return;}
  if(!q.end){if(q.t>=q.secs)qteEnd(false,'late');return;}
  q.endT+=dt;if(q.endT>1.2&&WAIT==='qte'){WAIT=null;G.qte=null;run();}
}
function drawQte(){
  var q=G.qte;if(!q)return;
  var x=W/2,y=COMPACT?96:112,w=620,n=RESPONSE.length,i,k;
  ctx.save();
  ctx.fillStyle='rgba(14,12,20,.88)';rr(x-w/2,y-46,w,152,14);ctx.fill();
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='800 15px system-ui,sans-serif';ctx.fillStyle=(RM||Math.floor(G.time*6)%2===0)&&!q.end?'#e0563e':'#f1ebdd';ctx.fillText('RESPOND CORRECTLY',x,y-26);
  var cw=108,gap=9,x0=x-(n*cw+(n-1)*gap)/2;
  for(i=0;i<n;i++){
    var r=RESPONSE[i],bx=x0+i*(cw+gap),done=i<q.i,cur=i===q.i&&!q.end;
    ctx.fillStyle=done?'#2f6b4f':cur?'#3a3446':'#26222f';rr(bx,y-10,cw,40,8);ctx.fill();
    ctx.strokeStyle=done?'#9fd3a8':cur?'#ebbd79':'#4a4456';ctx.lineWidth=2;rr(bx,y-10,cw,40,8);ctx.stroke();
    ctx.fillStyle=done?'#e9ffe9':'#f1ebdd';ctx.font=(r.sym.length>1?'800 13px':'800 21px')+' system-ui,sans-serif';ctx.fillText(r.sym,bx+cw/2,y+10);
    ctx.fillStyle='#b9b2a6';ctx.font='700 9px system-ui,sans-serif';
    var ls=wrap(r.label,cw-4);for(k=0;k<ls.length;k++)ctx.fillText(ls[k],bx+cw/2,y+42+k*11);
  }
  var left=q.end?0:q.auto?1:clamp(1-q.t/q.secs,0,1),bw=w-60;
  ctx.fillStyle='#ffffff1a';rr(x-bw/2,y+72,bw,6,3);ctx.fill();
  ctx.fillStyle=left>0.35?'#ebbd79':'#e0563e';rr(x-bw/2,y+72,bw*left,6,3);ctx.fill();
  ctx.font='600 10px system-ui,sans-serif';ctx.fillStyle='#8b8070';
  ctx.fillText(q.auto?'WINDOW: NOT REQUIRED':'WINDOW: '+q.secs.toFixed(1)+' s · INCLUDES TWO SECONDS FOR READING · REALITY: ALREADY MOVING',x,y+90);
  if(q.end){
    var a=clamp(q.endT/0.15,0,1),sc=RM?1:1.4-0.4*a,txt=q.end==='won'?'CORRECT.':q.end==='wrong'?'INCORRECT.':'TOO LATE.',col=q.end==='won'?'#7fc08a':'#e0563e';
    ctx.globalAlpha=a;ctx.translate(x,y+12);ctx.rotate(-0.06);ctx.scale(sc,sc);
    ctx.font='900 48px system-ui,sans-serif';var tw=ctx.measureText(txt).width+40;
    ctx.fillStyle='rgba(14,12,20,.92)';rr(-tw/2,-34,tw,68,8);ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=4;rr(-tw/2,-34,tw,68,8);ctx.stroke();
    ctx.fillStyle=col;ctx.fillText(txt,0,2);
  }
  ctx.restore();
}
// The almost impossible branch. It happens, and nothing about it is dramatic.
function scResponded(){return [
  set({aFace:-1,mood:'surprised',s:1.5}),{wait:0.5},
  ['H','Hi!'],
  ['A','Oh good, you’re in. We’re doing lunch at twelve. Coming?'],
  set({face:'smile'}),
  ['H','Yeah.'],
  {wait:0.9},
  ['S','…'],
  ['S','You did it.'],
  ['S','Nobody has ever done it. I designed it so that nobody could do it.'],
  ['H','I said hi.'],
  ['S','In under three seconds. With BREATHING.'],
  set({mood:'calm',s:0.8}),
  ['S','I’m going to need to lie down.'],
  function(){var g=G;g.lunch=1;g.leak='none';}
 ].concat(outside({title:'WHAT THE OTHERS SAW',dur:'duration: 1 second',cap:'Someone said hi back. That was all it ever was.',anim:'none'}),[
  calm,{wait:0.6},function(){return scWalk();}
 ]);}
// ---- src/35-inside.js ----
/* ================= the inside clock: one day outside, two days inside ================= */
// The outside clock is the one on the wall. The inside clock is the one Ekskyysmi keeps.
// Until something lands, they agree. After the first hit of the day, every outside hour is lived twice
// (once as it happens, once as it is replayed), and the spikes (jolts, archive visits, drafts) come on top.
// Nothing of this is on screen while it happens (the story says it when it matters). At the end of a day
// the difference is printed as a receipt, because that is the only format Ekskyysmi trusts.
var DOUBLE=2;                 // after a hit: each outside minute is lived twice
var STAY=1.4;                 // after the job changes: still more than one, but no longer two
var TRIES=0;                  // Mondays the player has replayed. Ekskyysmi notices.
var LIVED={hit:55,replay:25,archive:40,shadowHit:90,qteMissed:70,tonight:24};   // minutes
function dayLabel(){var g=G;if(g.lab)return 'SCENARIO LAB';if(g.chapter&&CHAPTERS[g.chapter])return CHAPTERS[g.chapter].day;return 'A DAY';}
function newDay(){
  var g=G;
  // a day that has barely started (the intro re-basing the clock) is simply replaced, not printed
  if(g.day0!=null){if(g.day0.hits||g.day0.ledger.length)closeDay();else g.day0=null;}
  g.day0={label:dayLabel(),start:g.clock,outside:0,extra:0,ledger:[],hits:0,trigAt:null,stayAt:null};
  g.mult=1;g.prevClock=g.clock;g.livedShown=0;
}
function addLived(label,mins){
  var g=G,d=g.day0;if(!d||!(mins>0))return;
  var e=null;
  for(var i=0;i<d.ledger.length;i++)if(d.ledger[i].label===label){e=d.ledger[i];break;}
  if(!e){e={label:label,n:0,secs:0};d.ledger.push(e);}
  e.n++;e.secs+=mins*60;g.hudAge=0;
}
function livedStep(label,mins){return function(){addLived(label,mins);};}
// After the job description changes, a hit still lands, but the day it costs is shorter.
// Outside, a day is one waking day: 07:00 to 23:00, sixteen hours, whatever the scenes skip over.
// Inside, everything from the first hit until bedtime runs twice; the spikes come on top.
var WAKE=7*3600,AWAKE=16*3600;
function dayPos(t){return Math.min(AWAKE,((t-WAKE)%86400+86400)%86400);}
function trigger(){
  var g=G,d=g.day0;if(!d)return;d.hits++;
  var cap=g.jobDone?STAY:DOUBLE;
  if(d.trigAt==null){d.trigAt=dayPos(g.clock);d.trigMult=cap;}
  if(g.mult<cap)g.mult=cap;
}
// called when the job description changes: from here on the rest of the day is a lighter rerun
function easeDay(){var g=G,d=g.day0;g.mult=Math.min(g.mult,STAY);if(d&&d.trigAt!=null&&d.stayAt==null)d.stayAt=Math.max(d.trigAt,dayPos(g.clock));}
function doubledUntil(d,pos){
  if(d.trigAt==null)return 0;pos=Math.max(d.trigAt,pos);
  var m1=d.trigMult||DOUBLE;
  if(d.stayAt==null||pos<=d.stayAt)return (pos-d.trigAt)*(m1-1);
  return (d.stayAt-d.trigAt)*(m1-1)+(pos-d.stayAt)*(Math.min(m1,STAY)-1);
}
function spikes(d){return d.ledger.reduce(function(s,e){return s+e.secs;},0);}
function closeDay(){
  var g=G,d=g.day0;if(!d)return null;
  if(d.hits)addLived('lying awake (projected)',Math.min(180,LIVED.tonight*d.hits+30));
  var doubled=doubledUntil(d,AWAKE);
  var how=(d.trigMult||DOUBLE)<DOUBLE?'1.4 times':d.stayAt!=null?'twice, then 1.4×':'twice';
  if(doubled>59)d.ledger.unshift({label:'rest of the day, '+how,n:1,secs:doubled});
  d.outside=AWAKE;d.extra=spikes(d);
  d.ratio=(d.outside+d.extra)/d.outside;
  g.run.push(d);g.day0=null;g.mult=1;return d;
}
function dur(secs){
  secs=Math.round(secs);if(secs<60)return secs+' s';
  var h=Math.floor(secs/3600),m=Math.round((secs%3600)/60);if(m===60){h++;m=0;}
  return h?h+' h '+(m<10?'0':'')+m+' min':m+' min';
}

/* ---------- the receipt ---------- */
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
function receiptRows(d){
  var rows=[['A DAY, AWAKE',dur(d.outside)]];
  if(d.label==='A MONDAY'&&!G.qteWon)rows.push(['“oh, hi.”','0.4 s']);
  if(d.label==='A MONDAY'&&TRIES)rows.push(['Mondays replayed, by you'+(TRIES>1?' ×'+TRIES:''),'noted']);
  rows.push('-');
  d.ledger.slice().sort(function(a,b){return b.secs-a.secs;}).slice(0,6).forEach(function(e){rows.push([e.label+(e.n>1?' ×'+e.n:''),dur(e.secs)]);});
  if(!d.ledger.length)rows.push(['nothing to report','0 min']);
  rows.push('-',['OUTSIDE',dur(d.outside)],['INSIDE',dur(d.outside+d.extra)],'-',['DAYS LIVED TODAY',d.ratio.toFixed(1),'big']);
  return rows;
}
function runRows(run){
  var rows=[],cal=0,livedDays=0;
  run.forEach(function(d){if(d.label==='SCENARIO LAB')return;cal++;livedDays+=d.ratio;rows.push([d.label.toLowerCase().replace(/\. not necessarily that one\./,''),'×'+d.ratio.toFixed(1)]);});
  var extra=storyRows();if(extra.length)rows.push('-');rows=rows.concat(extra);
  rows.push('-',['DAYS ON THE CALENDAR',String(cal)],['DAYS LIVED',livedDays.toFixed(1),'big']);
  return rows;
}
function receiptHTML(title,rows,foot){
  var h='<div class="receipt" role="figure" aria-label="'+esc(title)+'"><div class="rc-head">REALLY SMALL DEAL<br>'+esc(title)+'</div>';
  rows.forEach(function(r){h+=r==='-'?'<hr>':'<div class="rr'+(r[2]?' '+r[2]:'')+'"><span>'+esc(r[0])+'</span><span>'+esc(r[1])+'</span></div>';});
  return h+'<div class="rc-foot">'+foot+'</div></div>';
}
function receiptText(title,rows,foot){
  var wdt=36,out=['REALLY SMALL DEAL',title,''];
  rows.forEach(function(r){if(r==='-'){out.push(new Array(wdt+1).join('-'));return;}var a=r[0],b=r[1],gap=Math.max(1,wdt-a.length-b.length);out.push(a+new Array(gap+1).join(' ')+b);});
  out.push('',foot.replace(/<br>/g,'\n').replace(/<[^>]+>/g,''),'','joonashuhta.github.io/really-small-deal');
  return out.join('\n');
}
var RC_FOOT_DAY='Thank you for your vigilance.<br>No refunds. No returns.';
var RC_FOOT_RUN='Outside, a day is a day.<br>Inside, some days come twice.';
// The receipt as a picture, for sending to someone who will understand. Drawn from the same rows as the paper one.
function receiptCanvas(title,rows,foot){
  var S=2,PW=560,PAD=34,CW=PW-PAD*2,LH=30,F='500 21px ui-monospace,"SF Mono",Menlo,Consolas,monospace',FB='800 26px ui-monospace,"SF Mono",Menlo,Consolas,monospace';
  var c=document.createElement('canvas'),x=c.getContext('2d'),items=[],y=0,feet=foot.replace(/<br>/g,'\n').replace(/<[^>]+>/g,'').split('\n').filter(function(s){return s;});
  function wrap(t,max){var out=[],cur='';t.split(' ').forEach(function(w){var n=cur?cur+' '+w:w;if(cur&&x.measureText(n).width>max){out.push(cur);cur=w;}else cur=n;});out.push(cur);return out;}
  x.font=F;
  rows.forEach(function(r){
    if(r==='-'){items.push({k:'hr',h:22});return;}
    var big=r[2]==='big';x.font=big?FB:F;var vw=x.measureText(r[1]).width,ls=wrap(r[0],CW-vw-18);
    ls.forEach(function(l,i){items.push({k:'row',a:l,b:i===ls.length-1?r[1]:'',big:big,h:big?LH+8:LH});});
  });
  var headH=84,footH=feet.length*26+58,bodyH=0;items.forEach(function(it){bodyH+=it.h;});
  var PH=PAD+headH+bodyH+footH+PAD,M=44,Wc=PW+M*2,Hc=PH+M*2;
  c.width=Wc*S;c.height=Hc*S;x.scale(S,S);
  x.fillStyle='#12171b';x.fillRect(0,0,Wc,Hc);
  x.save();x.translate(Wc/2,Hc/2);x.rotate(0.012);x.translate(-PW/2,-PH/2);
  x.fillStyle='rgba(0,0,0,.45)';x.fillRect(8,12,PW,PH);x.fillStyle='#f6f1e4';x.fillRect(0,0,PW,PH);
  x.fillStyle='#2b2733';x.textBaseline='middle';x.textAlign='center';
  x.font='800 22px ui-monospace,"SF Mono",Menlo,Consolas,monospace';x.fillText('REALLY SMALL DEAL',PW/2,PAD+16);x.fillText(title,PW/2,PAD+46);
  y=PAD+headH;
  items.forEach(function(it){
    if(it.k==='hr'){x.strokeStyle='#8b8070';x.lineWidth=2;x.setLineDash([8,6]);x.beginPath();x.moveTo(PAD,y+11);x.lineTo(PW-PAD,y+11);x.stroke();x.setLineDash([]);}
    else{x.font=it.big?FB:F;x.fillStyle='#2b2733';x.textAlign='left';x.fillText(it.a,PAD,y+it.h/2+(it.big?4:0));x.textAlign='right';x.fillText(it.b,PW-PAD,y+it.h/2+(it.big?4:0));}
    y+=it.h;
  });
  x.textAlign='center';x.font='500 18px ui-monospace,"SF Mono",Menlo,Consolas,monospace';x.fillStyle='#5a5560';y+=26;
  feet.forEach(function(l){x.fillText(l,PW/2,y);y+=26;});
  x.fillStyle='#8b8070';x.font='500 15px ui-monospace,"SF Mono",Menlo,Consolas,monospace';x.fillText('joonashuhta.github.io/really-small-deal',PW/2,y+12);
  x.restore();
  return c;
}
function shareReceipt(btn){
  var r=G.receipt;if(!r)return;
  function say(t){if(btn)btn.textContent=t;}
  function fallback(){copyReceipt(btn);}
  var c;try{c=receiptCanvas(r.title,r.rows,r.foot);}catch(e){fallback();return;}
  if(!c.toBlob){fallback();return;}
  c.toBlob(function(blob){
    if(!blob){fallback();return;}
    var file=null;try{file=new File([blob],'really-small-deal-receipt.png',{type:'image/png'});}catch(e){}
    try{if(file&&navigator.canShare&&navigator.canShare({files:[file]})){
      navigator.share({files:[file],title:'Really Small Deal',text:'My receipt.'}).then(function(){say('Sent. Probably fine.');},function(){say('Save as picture');});return;}}catch(e){}
    // No share sheet: a plain download in a browser. Inside the app there is nowhere to download to, so the text goes to the clipboard instead.
    if(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform()){fallback();return;}
    try{var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='really-small-deal-receipt.png';document.body.appendChild(a);a.click();a.remove();
      setTimeout(function(){URL.revokeObjectURL(u);},4000);say('Saved. Check your downloads.');}catch(e){fallback();}
  },'image/png');
}
function copyReceipt(btn){
  var t=G.receiptText||'';
  function done(ok){if(btn)btn.textContent=ok?'Copied. Paste it anywhere.':'Could not copy, sorry.';}
  try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){done(true);},function(){done(false);});return;}}catch(e){}
  try{var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();var ok=document.execCommand('copy');ta.remove();done(ok);}catch(e){done(false);}
}

/* ---------- away from the tab: Ekskyysmi takes it personally ---------- */
function goneAway(){var g=G;if(g&&g.started&&!g.ended)g.awayAt=Date.now();}
function cameBack(){
  var g=G;if(!g||g.awayAt==null)return;var secs=(Date.now()-g.awayAt)/1000;g.awayAt=null;
  if(secs<6||!g.started||g.ended)return;
  var inside=Math.min(240,Math.round(secs/60*30))||1;
  addLived('waiting for you to come back',inside);
  g.awayNote=['You left for '+dur(secs)+'.','In here that was '+dur(inside*60)+'. I’ve prepared a statement.'];
}

/* ---------- the jolt: one small detail, and for a moment everything is an X-ray ---------- */
var JOLT_LEN=RM?1.1:0.82;
function jolt(o){return [function(){
  var g=G;g.jolt={t:0,tag:o.tag||'IMPACT DETECTED'};g.lines=[];g.cur=null;stopVoice();sfx('zap');
  g.human.flinch=1;g.human.face='stiff';g.morko.sT=1.7;g.morko.mood='scared';g.anx=1;g.shake=RM?0:0.7;trigger();
  addLived(o.label||'one small thing',o.mins||90);
},{wait:JOLT_LEN+0.5},function(){G.jolt=null;}];}
function stepJolt(dt){if(G.jolt)G.jolt.t+=dt;}
function joltPhase(){var j=G.jolt;if(!j)return null;if(RM)return j.t<JOLT_LEN?'xray':null;
  return j.t<0.06?'white':j.t<0.62?'xray':j.t<0.8?'dark':null;}
function bone(x1,y1,x2,y2,w){ctx.lineWidth=w||6;line(x1,y1,x2,y2);ctx.beginPath();ctx.arc(x1,y1,(w||6)*0.55,0,Math.PI*2);ctx.arc(x2,y2,(w||6)*0.55,0,Math.PI*2);}
function skeleton(x,calm,heart){
  var top=FEETY-118,hy=FEETY-150,c=calm?'rgba(190,225,255,.55)':'#d6f0ff';
  ctx.save();ctx.strokeStyle=c;ctx.fillStyle=c;ctx.lineCap='round';ctx.shadowColor='#7fd0ff';ctx.shadowBlur=calm?4:14;
  ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,hy,19,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#071521';circ(x-7,hy-2,5);ctx.fill();circ(x+7,hy-2,5);ctx.fill();ctx.fillStyle=c;
  ctx.lineWidth=2;for(var t=-6;t<=6;t+=4)line(x+t,hy+13,x+t,hy+17);
  ctx.lineWidth=5;line(x,hy+20,x,FEETY-50);
  ctx.lineWidth=3;for(var r=0;r<5;r++){var ry=top+10+r*11,rw=22-r*1.5;ctx.beginPath();ctx.ellipse(x,ry,rw,5,0,Math.PI*1.05,Math.PI*1.95,true);ctx.stroke();}
  bone(x-18,top+6,x-25,top+38,5);bone(x-25,top+38,x-28,top+62,4);bone(x+18,top+6,x+25,top+38,5);bone(x+25,top+38,x+28,top+62,4);
  ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(x,FEETY-50,16,8,0,0,Math.PI*2);ctx.stroke();
  bone(x-8,FEETY-44,x-10,FEETY-24,6);bone(x-10,FEETY-24,x-10,FEETY-4,5);bone(x+8,FEETY-44,x+10,FEETY-24,6);bone(x+10,FEETY-24,x+10,FEETY-4,5);
  ctx.restore();
  if(heart){
    var pu=RM?1:1+0.18*Math.sin(G.time*30),hx=x-6,hyy=top+24;
    ctx.save();ctx.shadowColor='#ff4a3a';ctx.shadowBlur=24;ctx.fillStyle='#ff5a44';ctx.translate(hx,hyy);ctx.scale(pu,pu);
    ctx.beginPath();ctx.moveTo(0,9);ctx.bezierCurveTo(-14,0,-9,-11,0,-4);ctx.bezierCurveTo(9,-11,14,0,0,9);ctx.fill();
    ctx.shadowBlur=0;ctx.strokeStyle='#fffbe0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-3,-6);ctx.lineTo(2,-1);ctx.lineTo(-2,1);ctx.lineTo(3,7);ctx.stroke();ctx.restore();
  }
}
function drawXray(){
  var g=G,q=geom(),ph=joltPhase();
  if(ph==='white'){ctx.fillStyle='#fbfdff';ctx.fillRect(-20,-20,W+40,H+40);return;}
  if(ph==='dark'){ctx.fillStyle='#020509';ctx.fillRect(-20,-20,W+40,H+40);return;}
  var gr=ctx.createRadialGradient(W/2,H/2,40,W/2,H/2,620);gr.addColorStop(0,'#0d2638');gr.addColorStop(1,'#030a12');ctx.fillStyle=gr;ctx.fillRect(-20,-20,W+40,H+40);
  if(!RM){ctx.fillStyle='rgba(160,220,255,.05)';for(var y=(G.time*80)%5;y<H;y+=5)ctx.fillRect(0,y,W,1.5);}
  ctx.strokeStyle='rgba(160,220,255,.12)';ctx.lineWidth=1;line(0,FEETY+2,W,FEETY+2);
  // Ekskyysmi has no bones. It turns out to be mostly filing cabinet.
  ctx.save();ctx.strokeStyle='rgba(150,210,255,.45)';ctx.lineWidth=2;ctx.setLineDash&&ctx.setLineDash([6,6]);
  ctx.beginPath();ctx.moveTo(q.bx-q.shW,q.by);ctx.lineTo(q.bx-q.shW,q.shY+10);ctx.quadraticCurveTo(q.bx,q.shY-18,q.bx+q.shW,q.shY+10);ctx.lineTo(q.bx+q.shW,q.by);ctx.stroke();
  ctx.beginPath();ctx.arc(q.bx,q.hdY,q.hdR,0,Math.PI*2);ctx.stroke();ctx.setLineDash&&ctx.setLineDash([]);
  var cw=Math.min(74,q.shW*1.15),ch=Math.min(150,(q.by-q.shY)*0.62),cx=q.bx-cw/2,cy=q.shY+(q.by-q.shY)*0.18;
  ctx.shadowColor='#7fd0ff';ctx.shadowBlur=10;ctx.strokeStyle='#d6f0ff';ctx.lineWidth=2.5;ctx.strokeRect(cx,cy,cw,ch);
  var labels=['2011','2016','2019','TODAY'];
  for(var i=0;i<4;i++){var dy=cy+6+i*(ch-12)/4,dh=(ch-12)/4-5;ctx.strokeRect(cx+5,dy,cw-10,dh);ctx.beginPath();ctx.moveTo(cx+cw/2-8,dy+dh/2);ctx.lineTo(cx+cw/2+8,dy+dh/2);ctx.stroke();
    ctx.shadowBlur=0;ctx.fillStyle='#d6f0ff';ctx.font='700 '+Math.max(8,Math.min(11,dh*0.36))+'px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(labels[i],cx+cw/2,dy+dh*0.28);ctx.shadowBlur=10;}
  ctx.restore();
  ctx.fillStyle='#d6f0ff';ctx.fillRect(q.bx-q.hdR*0.45,q.hdY-3,5,6);ctx.fillRect(q.bx+q.hdR*0.2,q.hdY-3,5,6);
  skeleton(g.human.x,false,true);
  if(g.cowB)skeleton(g.bx2,true,false);if(g.cowA)skeleton(g.ax,true,false);
  ctx.textAlign='left';ctx.textBaseline='middle';
  ctx.fillStyle='rgba(3,10,18,.8)';rr(26,24,420,62,6);ctx.fill();
  ctx.fillStyle='#ff6a55';ctx.font='800 15px system-ui,sans-serif';ctx.fillText('● X-RAY · CHEST · '+g.jolt.tag,40,44);
  ctx.fillStyle='#bfe3ff';ctx.font='600 12px system-ui,sans-serif';ctx.fillText('SHADOW: NO BONES DETECTED. FILING CABINET DETECTED.',40,68);
  if(g.cowB||g.cowA){ctx.textAlign='center';ctx.fillStyle='rgba(191,227,255,.7)';ctx.font='700 11px system-ui,sans-serif';ctx.fillText('HEART RATE: NORMAL',g.cowB?g.bx2:g.ax,FEETY-186);}
}

/* ---------- Lab / moment: One small thing. ---------- */
function labDetail(){return labScene({set:'office',title:'One small thing.',plan:'Get the slides back.',clock:14*3600+5*60}).concat([
  function(){var g=G;g.cowB=true;g.bx2=1090;g.bxT=640;g.bFace=-1;},{wait:2.2},
  ['N','Eero is handing back the slides. His slides. That you made. At midnight. He is smiling. It is going well.'],
  ['B','These are really good, by the way.'],
  set({face:'smile'}),
  ['S','Good. Accept the compliment. Do not make eye contact with it.'],
  ['B','Just one small thing.']
 ],jolt({label:'“just one small thing”',mins:120,tag:'SOURCE: “JUST ONE SMALL THING”'}),[
  ['B','You okay?'],
  ['H','Yeah. It’s nothing.'],said,
  set({mood:'scared',s:1.6}),
  ['S','It is NOT nothing. I have the X-ray.'],
  {choice:[
    {t:'Show him the X-ray.',then:[['S','Look at it. Ribs. Spine. A lightning bolt where the heart goes.'],['H','I’m not showing Eero my skeleton.'],['S','He showed us his “small thing”.']]},
    {t:'Ask for the small thing in writing.',then:[['S','With a reference number. So we can be hurt by it properly, later, at home.'],['H','He’s standing right here.']]},
    {t:'Apologise for the small thing in advance.',then:[['H','Sorry about the—'],['B','You don’t know what it is yet.'],['S','We don’t need to know. We’re sorry in general.']]}
  ]},
  ['B','The font’s a bit small. I sit at the back. I can’t read it.'],
  set({mood:'surprised'}),
  ['S','…The font.'],
  ['S','I had the whole skeleton out. For the FONT.']
 ],outside({title:'WHAT EERO SAID',dur:'duration: 3 seconds',cap:'The font is a bit small. He sits at the back.',anim:'text'}),[
  calm,
  ['H','Fourteen to eighteen. Done.'],
  ['S','Four seconds.'],
  ['H','Four seconds out here.'],
  set({mood:'worry',s:1.2}),
  ['S','In here it’s going to take until about nine tonight.'],
  ['H','I know.'],
  ['S','You’ll be on the bus, and I’ll go: “one small thing”.'],
  ['H','I know.'],
  ['S','And then in the shower.'],
  ['H','I KNOW.'],
  {wait:0.8},
  ['B','Thanks! Seriously, they’re great.'],
  function(){G.bxT=1200;G.bFace=1;},
  ['S','…He said “great”.'],
  ['H','He did.'],
  ['S','That one I’ll forget by Thursday. It’s the font I’ll keep.'],
  ['H','You always keep the font.']
 ]);}
// ---- src/40-backdrops.js ----
/* ================= extra backdrops ================= */
function home(){
  ctx.fillStyle='#2c3242';ctx.fillRect(-20,-20,W+40,WALLY+20);
  var gr=ctx.createRadialGradient(520,300,10,520,300,330);gr.addColorStop(0,'rgba(255,214,140,'+(G.lampOff?0:.42)+')');gr.addColorStop(1,'rgba(255,214,140,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,W,WALLY);
  ctx.fillStyle='#232733';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);ctx.fillStyle='#1c202b';ctx.fillRect(-20,WALLY-6,W+40,6);
  ctx.fillStyle='#e9e2cf';rr(112,96,170,150,4);ctx.fill();ctx.fillStyle='#12152a';ctx.fillRect(120,104,154,134);
  ctx.fillStyle='#f6f1e4';circ(236,134,13);ctx.fill();ctx.fillStyle='#12152a';circ(242,130,11);ctx.fill();
  ctx.fillStyle='#f6f1e4';for(var i=0;i<7;i++){circ(132+i*19,118+(i*41)%96,1.2);ctx.fill();}
  ctx.strokeStyle='#e9e2cf';ctx.lineWidth=5;line(197,104,197,238);
  if(G.kitchen)kitchen();else{
  ctx.strokeStyle='#15171f';ctx.lineWidth=4;ctx.lineCap='round';line(520,WALLY+62,520,292);
  ctx.fillStyle=G.lampOff?'#6f6857':'#f3d27a';ctx.beginPath();ctx.moveTo(500,262);ctx.lineTo(540,262);ctx.lineTo(552,296);ctx.lineTo(488,296);ctx.closePath();ctx.fill();}
  if(G.basket){var bx=G.human.x+64;ctx.fillStyle='#b99b6b';ctx.beginPath();ctx.moveTo(bx-30,FEETY-34);ctx.lineTo(bx+30,FEETY-34);ctx.lineTo(bx+24,FEETY);ctx.lineTo(bx-24,FEETY);ctx.closePath();ctx.fill();
    ctx.fillStyle='#e9e2cf';ctx.beginPath();ctx.ellipse(bx-6,FEETY-36,22,9,0,Math.PI,0);ctx.fill();ctx.fillStyle='#9fb6c9';ctx.beginPath();ctx.ellipse(bx+12,FEETY-36,14,7,0,Math.PI,0);ctx.fill();}
  drawTable();
  ctx.fillStyle='#57486a';rr(600,292,300,70,16);ctx.fill();ctx.fillStyle='#655479';rr(588,338,324,84,14);ctx.fill();
  ctx.fillStyle='#4b3e5b';rr(588,330,30,92,10);ctx.fill();rr(882,330,30,92,10);ctx.fill();
  ctx.fillStyle='#c98f2e';rr(700,322,60,34,8);ctx.fill();
  if(G.snacks){var cols=['#c9553f','#e2b04a','#62887f'];for(var k=0;k<11;k++){var b=bagPos(k);ctx.fillStyle=cols[k%3];rr(b.x,b.y,26,34,5);ctx.fill();}}
}
function bagPos(k){var row=k<6?0:1,col=row?k-6:k;return {x:628+col*40+(row?20:0),y:row?372:346};}
function countBags(){var g=G;for(var k=0;k<11;k++){var b=bagPos(k);g.tics.push(tic(String(k+1),b.x+13,b.y-16,{at:k*0.2,life:k===10?2.4:1.1,size:k===10?20:15,col:k===10?'#9fd3a8':'#f1ebdd'}));}}
function office(flat){
  ctx.fillStyle=flat?'#d5d8cf':'#d9ddd2';ctx.fillRect(-20,-20,W+40,WALLY+20);
  ctx.fillStyle=flat?'#b1b5a3':'#b3b8a8';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);ctx.fillStyle='#8d9a8c';ctx.fillRect(-20,WALLY-6,W+40,6);
  ctx.fillStyle='#fbf8ef';ctx.strokeStyle='#8d9a8c';ctx.lineWidth=4;rr(130,112,250,140,6);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#62887f';ctx.lineWidth=3;ctx.lineCap='round';line(156,150,270,150);line(156,176,330,176);line(156,202,240,202);
  ctx.strokeStyle='#c9553f';ctx.beginPath();ctx.moveTo(290,222);ctx.lineTo(312,196);ctx.lineTo(330,210);ctx.lineTo(356,170);ctx.stroke();
  ctx.fillStyle='#f4eedb';rr(689,99,170,146,4);ctx.fill();ctx.fillStyle='#a9c0c4';ctx.fillRect(697,107,154,130);
  ctx.strokeStyle='#f4eedb';ctx.lineWidth=6;line(774,107,774,237);
  ctx.fillStyle='#8b7355';rr(560,404,330,14,4);ctx.fill();ctx.fillRect(578,418,8,50);ctx.fillRect(864,418,8,50);
}
function backdrop(flat){if(G.set==='bar')bar();else if(G.set==='library')library();else if(G.set==='home')home();else if(G.set==='clinic')clinic();else if(G.set==='office')office(flat);else room(flat);}
function sannaShadow(){
  var g=G,k=g.zShow;if(!k||k<0.02||!g.cowA)return;var x=g.ax+62,by=WALLY;
  ctx.save();ctx.globalAlpha=Math.min(1,k);ctx.fillStyle='#3d3554';
  ctx.globalAlpha=Math.min(1,k)*0.55;ctx.beginPath();ctx.moveTo(g.ax-20,FEETY);ctx.lineTo(g.ax+20,FEETY);ctx.lineTo(x+22,by);ctx.lineTo(x-22,by);ctx.closePath();ctx.fill();
  ctx.globalAlpha=Math.min(1,k);
  ctx.beginPath();ctx.moveTo(x-22,by);ctx.lineTo(x+22,by);ctx.lineTo(x+38,by-108);ctx.lineTo(x-38,by-108);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.ellipse(x,by-110,46,21,0,0,Math.PI*2);ctx.fill();circ(x,by-147,19);ctx.fill();circ(x+2,by-168,8);ctx.fill();
  ctx.fillStyle='#f6f1e4';circ(x-8,by-148,4.6);ctx.fill();circ(x+8,by-148,4.6);ctx.fill();
  ctx.fillStyle='#14111d';circ(x-9.6,by-148,2);ctx.fill();circ(x+6.4,by-148,2);ctx.fill();
  ctx.restore();
}
// Eero's shadow works in a different department: later. It runs a little behind him, and its watch has no hands.
function eeroShadow(){
  var g=G,k=g.yShow;if(!k||k<0.02)return;var x=g.yx,by=WALLY,bob=RM?0:Math.sin(g.time*1.6)*2;
  ctx.save();ctx.fillStyle='#3a3a55';ctx.globalAlpha=Math.min(1,k);
  ctx.beginPath();ctx.moveTo(x-18,by);ctx.lineTo(x+18,by);ctx.lineTo(x+30,by-128);ctx.lineTo(x-30,by-128);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.ellipse(x,by-130,38,16,0,0,Math.PI*2);ctx.fill();circ(x,by-166+bob,17);ctx.fill();
  ctx.strokeStyle='#3a3a55';ctx.lineWidth=11;ctx.lineCap='round';line(x+30,by-128,x+50,by-152+bob);
  ctx.fillStyle='#f6f1e4';circ(x+53,by-156+bob,7.5);ctx.fill();ctx.strokeStyle='#3a3a55';ctx.lineWidth=2;circ(x+53,by-156+bob,7.5);ctx.stroke();
  ctx.fillStyle='#f6f1e4';circ(x-7,by-167+bob,4.4);ctx.fill();circ(x+7,by-167+bob,4.4);ctx.fill();
  ctx.fillStyle='#14111d';var look=g.yxT>g.yx+2?1.6:0;circ(x-7+look,by-166+bob,1.9);ctx.fill();circ(x+7+look,by-166+bob,1.9);ctx.fill();
  ctx.restore();
}
// Riitta's shadow works in load. Eleven things in the air, eyes on all of them, none on you. It can drop exactly one.
function riittaShadow(){
  var g=G,k=g.wShow;if(!k||k<0.02)return;var x=g.rx+92,by=WALLY,d=g.wDrop,n=d?10:11,cy=by-196,t=RM?0.6:g.time*2.1,i,a,ex;
  ctx.save();ctx.globalAlpha=Math.min(1,k);ctx.fillStyle='#35374f';
  ctx.beginPath();ctx.moveTo(x-16,by);ctx.lineTo(x+16,by);ctx.lineTo(x+25,by-120);ctx.lineTo(x-25,by-120);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.ellipse(x,by-122,34,14,0,0,Math.PI*2);ctx.fill();circ(x,by-152,16);ctx.fill();
  ctx.strokeStyle='#35374f';ctx.lineWidth=10;ctx.lineCap='round';
  var up=RM?0:Math.sin(t*2)*5;line(x-27,by-118,x-50,by-150+up);line(x+27,by-118,x+50,by-150-up);
  ctx.fillStyle='#f6f1e4';ctx.strokeStyle='#35374f';ctx.lineWidth=2;
  for(i=0;i<n;i++){a=t+i*Math.PI*2/n;circ(x+Math.cos(a)*54,cy-Math.sin(a)*30-(Math.sin(a)>0?Math.sin(a)*14:0),5.2);ctx.fill();ctx.stroke();}
  if(d){var f=Math.min(1,d.t/0.5),fy=cy+(by-8-cy)*f*f,b=d.t>0.5&&!RM?Math.abs(Math.sin((d.t-0.5)*9))*10*Math.max(0,1-(d.t-0.5)/0.9):0;
    ctx.fillStyle='#e0563e';circ(x+66,fy-b,5.6);ctx.fill();ctx.stroke();}
  ctx.fillStyle='#f6f1e4';circ(x-6.5,by-153,4.2);ctx.fill();circ(x+6.5,by-153,4.2);ctx.fill();
  ex=RM?0:Math.cos(t)*1.7;ctx.fillStyle='#14111d';circ(x-6.5+ex,by-155,1.8);ctx.fill();circ(x+6.5+ex,by-155,1.8);ctx.fill();
  ctx.restore();
}
function chapCard(){
  var c=G.chap,a=clamp(c.t/0.5,0,1)*clamp((2.8-c.t)/0.5,0,1);
  ctx.fillStyle='#182a2d';ctx.fillRect(0,0,W,H);
  ctx.globalAlpha=a;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='700 15px system-ui,sans-serif';ctx.fillStyle='#e2b04a';ctx.fillText(c.day,W/2,H/2-52);
  ctx.font='650 64px Fraunces,Georgia,serif';ctx.fillStyle='#f1ebdd';ctx.fillText(c.title,W/2,H/2+6);
  ctx.globalAlpha=1;
}
function bigNote(){
  var n=G.bigNote,a=clamp(n.t/0.25,0,1)*(1-0.72*clamp((n.t-2.6)/0.8,0,1)),sh=RM?0:Math.sin(G.time*52)*4;
  ctx.save();ctx.globalAlpha=a;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 150px Fraunces,Georgia,serif';
  ctx.fillStyle='rgba(18,14,30,.55)';ctx.fillText(n.text,W/2+sh+5,H/2-34);
  ctx.fillStyle='#e0563e';ctx.fillText(n.text,W/2+sh,H/2-40);ctx.restore();
}
// ---- src/49-second-act.js ----
/* ================= the second act: a hit with no sender, a form, a quiet day, and a lamp ================= */
// See TOINEN_NAYTOS.md. Three rules: nothing is named, nothing is the villain, nobody is mocked.
// "Away" is the shadow asleep: the wall figure fades into the ordinary floor shadow every person has.
function shadowAway(){var M=G.morko;M.asleep=true;M.wake=0;M.dim=null;G.lines=[];G.bick=0;G.plain=true;}
function shadowBack(s){var M=G.morko;G.plain=false;M.asleep=false;M.dim=null;M.s=M.sT=s||0.6;M.mood='worry';}

// The shadow everybody else has: grey, eyeless, on the wall behind the human, doing exactly what the human does and nothing more.
function plainShadow(){
  var g=G,Hm=g.human;if(!g.plain||Hm.gone||g.w)return;
  var x=Hm.x-58,by=WALLY,sip=Hm.sip||0;
  ctx.save();ctx.fillStyle='#3d4150';
  ctx.globalAlpha=0.16;ctx.beginPath();ctx.moveTo(Hm.x-18,FEETY);ctx.lineTo(Hm.x+18,FEETY);ctx.lineTo(x+20,by);ctx.lineTo(x-20,by);ctx.closePath();ctx.fill();
  ctx.globalAlpha=0.3;rr(x-21,by-100,42,100,12);ctx.fill();circ(x,by-118,17);ctx.fill();
  ctx.strokeStyle='#3d4150';ctx.lineWidth=10;ctx.lineCap='round';line(x+18,by-84,x+30,by-56-sip*42);
  ctx.restore();
}
// The receipt for the quiet day, on the same paper as every other receipt. The only one that says 1.0.
function quietReceipt(){
  var rows=[['days on the calendar','1'],['days lived','1.0','big'],'-',['rehearsals','0'],['verdicts','0'],['exhibits examined','0'],['“for the record”','1 (unanswered)'],['number plates added up','0'],['things noticed','0']];
  try{G.paper=receiptCanvas('RECEIPT · A QUIET MONDAY',rows,'It all went fine.');}catch(e){G.paper=null;}
  if(G.paper&&G.paper.width)return [function(){G.lines=[];G.band=null;sfx('card');},{wait:0.8},['N','It all went fine.'],function(){G.paper=null;}];
  G.paper=null;
  return outside({title:'RECEIPT · A QUIET MONDAY',dur:'days lived: 1.0',cap:'Rehearsals 0. Verdicts 0. Exhibits 0. Number plates added up 0. “For the record” 1, unanswered. It all went fine.',anim:'text'});
}
function drawPaper(){
  var p=G.paper;if(!p||!p.width)return;var h=H-24,w=h*p.width/p.height;
  ctx.fillStyle='rgba(13,17,20,.82)';ctx.fillRect(-20,-20,W+40,H+40);ctx.drawImage(p,(W-w)/2,12,w,h);
}

/* ---- a waiting room ---- */
function clinic(){
  ctx.fillStyle='#dfe3e1';ctx.fillRect(-20,-20,W+40,WALLY+20);
  ctx.fillStyle='#bcc3c0';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);ctx.fillStyle='#9aa5a1';ctx.fillRect(-20,WALLY-6,W+40,6);
  ctx.fillStyle='#c9cfc9';rr(96,150,120,WALLY-150,3);ctx.fill();ctx.fillStyle='#8d9a8c';circ(198,300,5);ctx.fill();           // a door
  ctx.fillStyle='#fbf8ef';ctx.strokeStyle='#9aa5a1';ctx.lineWidth=3;rr(300,120,150,96,4);ctx.fill();ctx.stroke();               // a poster nobody reads
  ctx.strokeStyle='#b7c2be';ctx.lineWidth=3;ctx.lineCap='round';line(318,146,430,146);line(318,166,410,166);line(318,186,424,186);
  for(var i=0;i<2;i++){var x=640+i*96;ctx.fillStyle='#6f8f8a';rr(x,WALLY-58,70,12,4);ctx.fill();rr(x+4,WALLY-110,62,52,6);ctx.fill();
    ctx.fillStyle='#55605c';ctx.fillRect(x+6,WALLY-46,6,46);ctx.fillRect(x+58,WALLY-46,6,46);}
  ctx.fillStyle='#8a6a4a';rr(846,WALLY-34,44,34,4);ctx.fill();ctx.fillStyle='#5f8a5a';                                            // the plant every waiting room is issued
  ctx.beginPath();ctx.ellipse(868,WALLY-64,14,34,-0.3,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(880,WALLY-58,12,30,0.4,0,Math.PI*2);ctx.fill();
}

/* ---- the form: eighteen questions, four of them read aloud ---- */
var FORM_Q=[
  {n:3,q:'How often do you replay a conversation after it has ended?',opts:['Never','Sometimes','Very often']},
  {n:7,q:'Do small remarks stay with you longer than you would like?',opts:['Never','Sometimes','Very often']},
  {n:11,q:'Do you prepare for outcomes that do not occur?',opts:['Never','Sometimes','Very often']},
  {n:18,q:'Does this cause problems in your daily life?',opts:['No','','Yes']}
];
function formOpen(){G.form={i:-1,ticks:[-1,-1,-1,-1],sig:0};}
function formQ(i){return function(){G.form.i=i;sfx('card');};}
function formTick(i,k){return function(){G.form.ticks[i]=k;sfx('stamp');};}
function drawForm(){
  var fm=G.form;if(!fm)return;
  var x=604,y=70,w=318,h=392,i,q=FORM_Q[fm.i];
  ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(-0.012);ctx.translate(-w/2,-h/2);
  ctx.fillStyle='rgba(20,17,29,.22)';rr(6,8,w,h,5);ctx.fill();ctx.fillStyle='#fbf8ef';ctx.strokeStyle='#8b8070';ctx.lineWidth=1.5;rr(0,0,w,h,5);ctx.fill();ctx.stroke();
  ctx.fillStyle='#55605c';rr(w/2-34,-10,68,20,5);ctx.fill();                                                                       // the clip
  ctx.fillStyle='#2b2733';ctx.textAlign='left';ctx.textBaseline='middle';ctx.font='800 17px system-ui,sans-serif';ctx.fillText('ABOUT YOU',22,38);
  ctx.font='600 10px system-ui,sans-serif';ctx.fillStyle='#8b8070';ctx.fillText('18 questions. Take your time.',22,56);
  // the questions that are not read aloud: grey lines
  ctx.strokeStyle='#d6d0c2';ctx.lineWidth=5;ctx.lineCap='round';
  for(i=0;i<5;i++)line(22,84+i*13,22+150+((i*53)%90),84+i*13);
  if(q){
    ctx.fillStyle='#2b2733';ctx.font='800 13px system-ui,sans-serif';ctx.fillText(q.n+'.',22,172);
    ctx.font='600 15px system-ui,sans-serif';var ls=wrap(q.q,w-70);for(i=0;i<ls.length;i++)ctx.fillText(ls[i],46,172+i*20);
    var oy=182+ls.length*20;
    for(i=0;i<3;i++){if(!q.opts[i])continue;var bx=46,by=oy+i*26;
      ctx.strokeStyle='#2b2733';ctx.lineWidth=1.5;ctx.strokeRect(bx,by-8,16,16);ctx.fillStyle='#2b2733';ctx.font='600 13px system-ui,sans-serif';ctx.fillText(q.opts[i],bx+26,by);
      if(fm.ticks[fm.i]===i){ctx.strokeStyle='#c9553f';ctx.lineWidth=3.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(bx+2,by);ctx.lineTo(bx+7,by+6);ctx.lineTo(bx+19,by-11);ctx.stroke();}
    }
  }
  ctx.strokeStyle='#2b2733';ctx.lineWidth=1.2;line(22,h-44,w-22,h-44);ctx.fillStyle='#8b8070';ctx.font='600 10px system-ui,sans-serif';ctx.fillText('Signature',22,h-30);
  if(fm.sig>0){ // a flourish, and a full stop it is rather proud of
    var n=Math.floor(46*fm.sig),px=60,py=h-58;ctx.strokeStyle='#14111d';ctx.lineWidth=2.4;ctx.lineCap='round';ctx.beginPath();
    for(i=0;i<=n;i++){var u=i/46,sx=px+u*190,sy=py-Math.sin(u*Math.PI*5)*14*(1-u*0.6);if(i===0)ctx.moveTo(sx,sy);else ctx.lineTo(sx,sy);}
    ctx.stroke();if(fm.sig>=1){ctx.fillStyle='#14111d';circ(px+200,py+2,2.6);ctx.fill();}
  }
  ctx.restore();
}

/* ---- a choice that makes itself ---- */
function stepAuto(dt){
  var a=G.auto;if(WAIT!=='auto'||!a)return;a.t+=dt;
  if(!a.done&&a.t>=a.secs*0.55){a.done=true;sfx('pick');render();}
  if(a.t>=a.secs){G.auto=null;WAIT=null;run();}
}
/* ---- the lamp ---- */
function lampOff(){var g=G;g.lampOff=true;g.darkT=1;g.dark=1;}
function lampOn(){
  var g=G;if(WAIT!=='lamp')return;g.lampOff=false;g.darkT=0;g.flash=0.25;sfx('turn');
  shadowBack(0.6);WAIT=null;run();
}
/* ---- a glass of water on the kitchen table, and next to it one small white thing ---- */
function drawTable(){
  if(!G.tableShot)return;var x=590,y=FEETY-64;
  ctx.fillStyle='#6b5846';rr(x-90,y,180,12,4);ctx.fill();ctx.fillRect(x-78,y+12,8,58);ctx.fillRect(x+70,y+12,8,58);
  ctx.fillStyle='rgba(200,225,240,.55)';rr(x-26,y-34,22,34,3);ctx.fill();ctx.fillStyle='rgba(235,245,250,.8)';ctx.fillRect(x-26,y-20,22,20);
  ctx.fillStyle='#fbf8ef';ctx.beginPath();ctx.ellipse(x+22,y-3,6,3,0,0,Math.PI*2);ctx.fill();
}
function tableShot(on){return function(){var g=G;g.tableShot=on;if(on){g.cz=1.55;g.cx=600;g.cy=FEETY-60;}else{g.cz=1;g.cx=W/2;g.cy=H/2;}};}
function sitDown(){var Hm=G.human;Hm.pose='floor';Hm.face='down';sfx('drip');}

/* ================= 1. Nothing. ================= */
function labNothing(){return labScene({set:'home',title:'Nothing.',plan:'Fold the laundry.',clock:16*3600+40*60}).concat([
  function(){var g=G;g.basket=true;g.human.x=g.human.xT=470;},
  ['N','A Sunday. Laundry. Nobody has said anything all day.'],
  {wait:1.5}
 ],jolt({label:'a hit with no sender',mins:45,tag:'SOURCE: —'}),[
  ['S','Who was that?',{loud:1}],
  ['H','Nobody.'],
  ['S','Somebody SAID something.'],
  ['H','Nobody’s here.'],
  lensPeek({x:700,y:FEETY-40},'SOFA: NOTHING TO DECLARE.'),
  lensPeek(function(){return {x:G.human.x+64,y:FEETY-20};},'BASKET: SOCKS. ODD NUMBER.'),
  ['S','The sofa has an alibi.',{look:'squint'}],
  ['S','Check the phone.'],
  ['H','It’s in the other room.'],
  ['S','Then it came from INSIDE.'],
  sitDown,{wait:1.3},
  ['S','Get up. We can’t be found like this.'],
  ['H','By whom?'],
  {wait:1.1},
  ['S','I don’t have a form for this. There’s no sender.'],
  ['H','There doesn’t have to be one.'],
  ['S','Then what do I DO?'],
  ['H','Sit down.'],
  set({s:0.62,mood:'worry'}),function(){G.sat=true;},{wait:1.2},
  {hold:{kind:'sit',secs:5,clock:1,text:'Sitting. No cause. No verdict. Sitting.'}}
 ],outside({title:'WHAT THE CALENDAR SAW',dur:'duration: 4 minutes',cap:'Someone sat on the floor next to a laundry basket.',anim:'text'}),[
  set({s:0.8,mood:'calm'}),
  ['S','…It’s gone.'],
  ['H','It does that.'],
  ['S','We didn’t fix anything.'],
  ['H','No.'],
  ['S','I’d like to file a complaint. About the absence of a cause.'],
  ['H','With whom?'],
  aside(['S','That’s the complaint.']),
  function(){G.human.pose=null;G.human.face='neutral';},
  ['H','I’m going to ring someone tomorrow.'],
  ['S','About the sofa?'],
  ['H','About this.'],
  ['S','…I’ll bring the forms.',{look:'soft'}]
]);}

/* ================= 2. The form. ================= */
function labForm(){
  function ticked(i,k,lines){return [formTick(i,k)].concat(lines||[]);}
  return labScene({set:'clinic',title:'The form.',plan:'Fill it in.',clock:14*3600+10*60,mood:'alert'}).concat([
  function(){G.human.x=G.human.xT=430;formOpen();},
  ['N','A waiting room. A clipboard. Eighteen questions.'],
  ['S','A form! Finally. Somebody professional.',{look:'pleased'}],
  ['S','Give it here. I’ll do the boxes.'],
  formQ(0),
  {choice:[
    {t:'Tick “Never”.',then:[['S','We can’t tick that. They’d check.']].concat(ticked(0,2,[['S','…That’s not what I said.']]))},
    {t:'Tick “Sometimes”. Modestly.',then:[['S','“Sometimes.” Modest. I like it.']].concat(ticked(0,2,[['S','…That’s not what I said.']]))},
    {t:'Ask them to define “ended”.',then:[['S','Exactly. Write that in the margin.']].concat(ticked(0,2))}
  ]},
  ['S','Fine. “Very often.” It’s a strength.'],
  formQ(1),
  ['S','Longer than I’d LIKE? I like having them. I’ve had some since 2011.',{look:'pleased'}],
  formTick(1,2),
  ['S','You didn’t even ask me.'],
  ['H','I didn’t need to.'],
  formQ(2),{wait:1.2},
  ['S','That’s me. They’ve described ME.',{look:'stunned'}],
  ['H','It’s a list of difficulties.'],
  aside(['S','It’s a job description.']),
  formTick(2,2),
  ['S','How do they KNOW? Has someone been talking?'],
  ['H','Nobody’s been talking.'],
  ['S','Then I’m… common?'],
  ['H','Common enough to have a form.'],
  ['S','…I thought I was bespoke.',{quiet:1}],
  formQ(3),
  ['S','Problems? I PREVENT problems. Tick “no”.',{loud:1}],
  {choice:[
    {t:'Tick “no”.',then:[['S','Go on.'],{wait:0.9}].concat(ticked(3,2))},
    {t:'Tick “no”. Firmly.',then:[['S','FIRMLY.'],{wait:0.9}].concat(ticked(3,2))},
    {t:'Look at the human.',then:[['S','…What?']].concat(ticked(3,2))}
  ]},
  ['S','You ticked yes.'],
  ['H','It’s been a long week.'],
  ['S','A WEEK. …'],
  ['H','A long year.'],
  ['S','…Be accurate.',{quiet:1}],
  ['S','I’ll sign. I sign everything. It’s the best part.',{look:'pleased'}],
  {hold:{kind:'sign',secs:3,text:'Signing. With a flourish.'}},
  ['S','There. All in order.'],
  ['S','…Why is it so bright in here?'],
  function(){G.form=null;}
 ],outside({title:'WHAT THE CALENDAR SAW',dur:'duration: 40 minutes',cap:'An appointment. A form with eighteen questions. A small paper bag.',anim:'text'}));
}

/* ================= 3. Quiet. ================= */
// No Ekskyysmi. Three places where it would have said something show its name and a dash.
function labQuiet(){
  var gap=['S','—'];
  return labScene({set:'home',title:'Quiet.',plan:'—',clock:7*3600+40*60}).concat([
  shadowAway,function(){G.human.gone=true;},tableShot(true),{wait:3.2},tableShot(false),
  scene({set:'room',clock:8*3600+52*60}),shadowAway,
  function(){var g=G;g.hud=true;g.plan=true;g.planText='—';g.noCup=false;g.mugFixed=false;},
  ['N','Monday. 8:52. The same room. The same coffee.'],
  set({cowA:1,ax:700,aFace:-1}),{wait:1.6},
  ['A','oh, hi.'],
  {wait:1.2},
  gap,
  ['H','Hi. Lunch today?'],
  ['A','Sure!'],
  {auto:{opts:['Go to lunch.','Go to lunch.','Go to lunch.'],pick:0,secs:1.9}},
  ['N','It took four seconds.'],
  set({ax:1100}),{wait:1.2},
  function(){G.cowR=true;G.cowA=false;},
  ['R','Not now.'],
  ['H','Okay.'],
  gap,
  ['N','It took one second.'],
  function(){G.cowR=false;},set({cowB:1,bx:820,bFace:-1}),{wait:1.4},
  ['B','Could you take my Thursday shift?'],
  {auto:{opts:['No.','No.','No.'],pick:1,secs:1.9}},
  ['H','No. Sorry.'],
  ['B','Fair enough!'],
  ['N','Nobody rehearsed anything.'],
  set({bx:1100}),{wait:1.2},
  function(){var g=G;g.cowB=false;g.cowA=true;g.ax=1010;g.clock=12*3600+4*60;},set({near:1,aFace:-1}),{wait:1.6},
  ['N','Lunch. It goes well.'],
  ['A','You seem… well.'],
  ['H','I am. I think.'],
  ['A','You didn’t apologise to the chair.'],
  ['H','Should I have?'],
  ['A','No. …It was sort of your thing.'],
  function(){G.zT=1;},{wait:1.8},
  ['Z','…Where’s yours?'],
  {wait:1.6},
  ['A','Same time tomorrow?'],
  ['H','Same time.'],
  function(){G.zT=0;},
  scene({set:'home',clock:18*3600+20*60}),shadowAway,
  ['N','The way home. KIV-304. ROS-151. Two sevens.'],
  ['N','Nobody counted.'],
  ['H','For the record.'],
  {wait:1.6},
  gap,
  ['N','Nobody objected.'],
  function(){G.quiet=true;},
  quietReceipt
 ]);
}

/* ================= 4. Evenings. ================= */
function labEvenings(){return labScene({set:'home',title:'Evenings.',plan:'The lamp.',clock:21*3600}).concat([
  shadowAway,lampOff,
  ['N','Nine in the evening. It wears off about now.'],
  {lamp:true},
  {wait:1.8},
  ['S','…Am I allowed?',{quiet:1}],
  ['H','It’s nine. You’re on.'],
  ['S','I’ve gone part-time?'],
  ['H','Evenings.'],
  ['S','Nobody asked me.'],
  ['H','You signed.'],
  ['S','I sign EVERYTHING. That’s not consent, that’s a hobby.'],
  set({s:0.8}),
  ['S','What happened today? Without me.'],
  ['H','Everything went fine.'],
  ['S','…Oh.',{look:'soft'}],
  ['H','I asked her to lunch. It took four seconds.'],
  ['S','Four. I’d budgeted a week.'],
  ['H','Riitta said “not now”. I said “okay”.'],
  ['S','And then?'],
  ['H','And then nothing. That was all of it.'],
  ['S','That’s terrible.',{look:'stunned'}],
  ['H','Nobody said “for the record”. All day.'],
  ['S','You could have said it.'],
  ['H','I did. Once. To the wall.'],
  ['S','…And?'],
  ['H','It’s not the same when I do it.'],
  {wait:1.4},
  ['S','So I’m not needed.'],
  ['H','No.'],
  {wait:1.0},
  ['H','I didn’t turn the lamp on because you’re needed.'],
  ['S','Then why?'],
  ['H','It was very quiet.'],
  ['S','You’re welcome.'],
  ['H','I missed it.'],
  set({s:1,mood:'care'}),{wait:1.2},
  ['S','For the record—'],
  ['H','Go on.'],
  ['S','—I have several things to say about the lunch.',{look:'pleased'}],
  ['H','I thought you might.'],
  ['S','Four seconds. Did you even REHEARSE?'],
  ['H','No.'],
  ['S','Amateur.'],
  function(){addLived('one evening, annotated',25);G.evenings=true;},
  lensPeek({x:520,y:300},'EVENINGS: MINE.')
]);}
// ---- src/50-lab.js ----
/* ================= SCENARIO LAB: stand-alone scenes for trying ideas before they join the week ================= */
var LABS={
  sometime:{title:'Sometime.',blurb:'A colleague says “we should grab a coffee sometime” and leaves. When is sometime?',script:labSometime},
  evening:{title:'An ordinary evening',blurb:'Stairs, dishes, a half-hummed line, an overdue book. Nothing happens. On purpose.',script:labEvening},
  glass:{title:'Evidence.',blurb:'Two people stop laughing when you walk in. Ekskyysmi gets out the magnifying glass.',script:labGlass},
  colleagues:{title:'Colleagues.',blurb:'Sanna’s shadow says “oh. hi.” to Ekskyysmi. Now it knows how that felt.',script:labColleagues},
  nothing:{title:'Nothing.',blurb:'A Sunday, some laundry, and a hit that nobody sent. Ekskyysmi looks for the culprit. There isn’t one.',script:labNothing},
  form:{title:'The form.',blurb:'A waiting room and eighteen questions. For once the form is about Ekskyysmi. It signs.',script:labForm},
  quiet:{title:'Quiet.',blurb:'Best in the story. A Monday with nobody on the wall. Nothing happens, and that is the point.',script:labQuiet},
  evenings:{title:'Evenings.',blurb:'Nine o’clock. It is dark. There is a lamp.',script:labEvenings},
  notnow:{title:'Not now.',blurb:'The one that is real: Riitta is short with you. Right about the fact, wrong about the size.',script:labNotNow},
  bar:{title:'A quiet drink.',blurb:'The bartender serves someone else first. Then he says “What?”. Ekskyysmi orders the shadow of a drink.',script:labBar},
  voice:{title:'The voice message',blurb:'Replying to a voice message with a voice message. Take one. Take two. Take fourteen.',script:labVoice},
  reply:{title:'The reply',blurb:'A few small edits before sending. For safety. Until nothing in the message can be rejected.',script:labReply},
  library:{title:'A fine.',blurb:'The overdue lighthouse book goes back. The librarian says it’ll be a fine.',script:labLibrary},
  posting:{title:'The posting.',blurb:'A job posting that is SO you. Ekskyysmi has a perfect record of never being rejected. It intends to keep it.',script:labPosting},
  detail:{title:'One small thing.',blurb:'Eero likes the slides. Just one small thing. For a moment everything is an X-ray.',script:labDetail},
  enhance:{title:'Enhance.',blurb:'One eyebrow. Four levels of zoom. A forensic investigation nobody asked for.',script:labEnhance},
  comments:{title:'The group chat',blurb:'A boss fight. Incoming messages look like daggers from a distance. Ekskyysmi has a headband.',script:labComments}
};
function labScene(o){return [scene(o),function(){
  var g=G;g.planText=o.plan;g.hud=true;g.plan=true;g.fade=0;
  if(g.lab){g.label='Scenario lab / '+o.title;newDay();return;}
  // In the story the same scene opens with a card, like any other moment.
  g.label=o.title;g.chap={day:WHEN[g.moment]||'SOME TIME LATER',title:o.title,t:0};stopVoice();sfx('card');
 },function(){return G.lab?[]:[{wait:2.8},function(){G.chap=null;G.fade=1;}];}];}
function startLab(id){
  reset('B');var g=G;g.started=true;g.lab=id;
  Q=LABS[id].script().concat([function(){showLabEnd(id);}]);run();
}
function showLab(){
  var h='<div class="eyebrow">Scenario lab</div><h2>Try a scene.</h2><p>Every short scene on its own, including the ones not in the story yet.</p><div class="lab-list">';
  for(var k in LABS)h+='<button class="lab" type="button" data-lab="'+k+'"><b>'+LABS[k].title+'</b><span>'+LABS[k].blurb+'</span></button>';
  showOv(h+'</div><button class="go alt" type="button" data-go="menu">Back to title</button>','menu');
}
function showLabEnd(id){
  var g=G;g.ended=true;g.labEnd=true;WAIT=null;Q=[];render();
  showOv('<div class="eyebrow">Scenario lab</div><h2>'+LABS[id].title+'</h2><p>That was the whole scene. Was it funny? Did it land?</p>'+
   '<button class="go" type="button" data-lab="'+id+'">Play it again →</button><button class="go alt" type="button" data-go="lab">Other scenes</button><button class="go alt" type="button" data-go="menu">Title screen</button>','end');
}

/* ---------- Enhance: the eyebrow ---------- */
function zoom(n){return function(){var g=G;g.zoom=n?{n:n,t:0}:null;g.lines=[];g.cur=null;stopVoice();if(n)sfx('enhance');else sfx('cut');};}
function labEnhance(){return labScene({set:'office',title:'Enhance.',plan:'Share one idea in a meeting.',clock:11*3600+56*60,cowR:1,s:1.1}).concat([
  ['N','A meeting. You have just said an idea out loud.'],
  ['H','…so that’s the idea.'],
  function(){G.rBrow=1;},{wait:0.6},
  ['R','Interesting.'],
  hit(0.6,'R'),{wait:1.3},
  ['S','“Interesting.” With an eyebrow.'],
  ['S','ENHANCE.'],
  zoom(1),{wait:0.5},
  ['S','Note the angle. Twelve degrees. Textbook disdain.'],
  {choice:[
    {t:'Measure the arch.',then:[['S','The arch is load-bearing. It is holding up an entire opinion.']]},
    {t:'Compare with the archive.',then:[['S','Ninety-two per cent match with “Year 4: could be neater”.']]},
    {t:'Count the hairs.',then:[['S','Forty-one. One of them is pointing at us.']]}
  ]},
  ['H','It’s an eyebrow.'],
  ['S','ENHANCE.'],
  zoom(2),{wait:0.5},
  ['S','This hair has seen things.'],
  ['H','It’s a hair.'],
  ['S','A hair with an AGENDA.'],
  ['S','ENHANCE.'],
  zoom(3),{wait:0.5},
  ['S','…These are pixels.'],
  ['H','You’ve enhanced past the eyebrow.'],
  ['S','I’m in too deep. Pull me out—'],
  ['S','No. ENHANCE.'],
  zoom(4),{wait:0.6},
  ['S','There’s something in her eye. A reflection.'],
  ['S','It’s… a clock.'],
  ['S','11:58.'],
  zoom(0),function(){var g=G;g.rBrow=0;g.gazeT=0;g.darkT=0;g.cz=1.025;g.cx=W/2;g.cy=H/2;},
  ['R','Interesting. Can we pick it up after lunch? I’m starving.'],
  set({mood:'surprised'}),
  ['S','…The eyebrow was HUNGER.']
 ],outside({title:'WHAT RIITTA WAS LOOKING AT',dur:'duration: half a second',cap:'The clock behind you. It was nearly lunch.',anim:'text'}),[
  calm,
  ['H','You enhanced a hungry eyebrow.'],
  ['S','I’m filing it under “eyebrows, inconclusive”.'],
  ['H','You have a file for eyebrows?'],
  ['S','I have a WING for eyebrows.']
 ]);}
var ZOOMLABEL=[null,'ENHANCE ×800','ENHANCE ×6 400','ENHANCE ×51 200 · RESOLUTION: GONE','REFLECTION DETECTED'];
function drawZoom(){
  var z=G.zoom,n=z.n,t=z.t,k=RM?1:clamp(t/0.35,0,1),sc=0.6+0.4*k;
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(sc,sc);ctx.translate(-W/2,-H/2);
  var skin='#e4bba2',brow='#9b9388',i,j;
  if(n===1){
    ctx.fillStyle=skin;ctx.fillRect(-40,-40,W+80,H+80);
    ctx.fillStyle='#d5a68c';for(i=0;i<70;i++){circ((i*137)%W,(i*89)%H,2+(i%3));ctx.fill();}
    ctx.strokeStyle=brow;ctx.lineCap='round';
    for(i=0;i<41;i++){var u=i/40,bx=120+u*720,by=330-Math.sin(u*Math.PI)*150-u*70;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(bx,by+26);ctx.quadraticCurveTo(bx+18,by,bx+44,by-6+(i%4)*3);ctx.stroke();}
    ctx.strokeStyle='#e0563e';ctx.lineWidth=3;ctx.setLineDash&&ctx.setLineDash([10,8]);line(120,356,840,356);line(120,356,760,180);ctx.setLineDash&&ctx.setLineDash([]);
    ctx.beginPath();ctx.arc(120,356,120,-0.27,0);ctx.stroke();
    ctx.fillStyle='#e0563e';ctx.font='700 30px system-ui,sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText('12°',250,330);
  }else if(n===2){
    ctx.fillStyle='#e9c6ae';ctx.fillRect(-40,-40,W+80,H+80);
    ctx.strokeStyle='#8c8479';ctx.lineWidth=38;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(60,470);ctx.bezierCurveTo(300,420,520,120,900,90);ctx.stroke();
    ctx.strokeStyle='#a69d91';ctx.lineWidth=6;for(i=0;i<14;i++){var px=110+i*58,py=455-i*27-(i>6?(i-6)*8:0);line(px-10,py-6,px+14,py+4);}
    ctx.fillStyle='#14111d';ctx.font='700 18px system-ui,sans-serif';ctx.textAlign='left';ctx.fillText('HAIR #27 · ATTITUDE: DETECTED',560,200);
    ctx.strokeStyle='#14111d';ctx.lineWidth=2;line(640,215,640,262);
  }else if(n===3){
    var cols=['#e4bba2','#d5a68c','#9b9388','#b0a596','#c9b09c','#8c8479'];
    for(i=0;i<16;i++)for(j=0;j<10;j++){ctx.fillStyle=cols[(i*7+j*3+((i*j)%5))%cols.length];ctx.fillRect(i*60,j*54,60,54);}
  }else{
    ctx.fillStyle='#d9b29a';ctx.fillRect(-40,-40,W+80,H+80);
    ctx.fillStyle='#fbf8ef';ctx.beginPath();ctx.ellipse(W/2,H/2+10,380,190,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#6a8a8f';circ(W/2,H/2+10,170);ctx.fill();ctx.fillStyle='#4f6b70';circ(W/2,H/2+10,120);ctx.fill();ctx.fillStyle='#14111d';circ(W/2,H/2+10,80);ctx.fill();
    var cx=W/2+28,cy=H/2-14;ctx.globalAlpha=0.9;ctx.fillStyle='#fbf8ef';circ(cx,cy,34);ctx.fill();ctx.strokeStyle='#14111d';ctx.lineWidth=3;
    var ha=(11+58/60)/12*Math.PI*2,ma=58/60*Math.PI*2;line(cx,cy,cx+Math.sin(ha)*17,cy-Math.cos(ha)*17);line(cx,cy,cx+Math.sin(ma)*26,cy-Math.cos(ma)*26);
    ctx.globalAlpha=0.5;ctx.fillStyle='#fbf8ef';rr(W/2-70,H/2-60,26,40,6);ctx.fill();ctx.globalAlpha=1;
    ctx.strokeStyle='#8c8479';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(W/2,H/2+10,380,190,0,Math.PI*1.05,Math.PI*1.95);ctx.stroke();
  }
  ctx.restore();
  // crime-show overlay
  ctx.fillStyle='rgba(40,120,90,.10)';ctx.fillRect(0,0,W,H);
  if(!RM){ctx.fillStyle='rgba(0,0,0,.06)';for(var y=(G.time*50)%4;y<H;y+=4)ctx.fillRect(0,y,W,1.5);}
  ctx.strokeStyle='#e9ffe9';ctx.lineWidth=3;var m=30,L=46;
  [[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(function(c){line(c[0],c[1],c[0]+L*c[2],c[1]);line(c[0],c[1],c[0],c[1]+L*c[3]);});
  ctx.lineWidth=1.5;line(W/2-24,H/2,W/2+24,H/2);line(W/2,H/2-24,W/2,H/2+24);
  ctx.fillStyle='rgba(10,12,16,.75)';rr(m+8,m+8,330,34,6);ctx.fill();
  ctx.fillStyle=(Math.floor(G.time*2)%2&&!RM)?'#e0563e':'#e9ffe9';ctx.font='700 15px system-ui,sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText('● '+ZOOMLABEL[n],m+20,m+25);
  var cur=G.cur;
  if(cur&&cur.who==='S')bubble(W-260,H-150,cur.text,{dark:true,noTail:true,maxW:300,reveal:Math.floor(G.curT*55)});
  else if(cur&&cur.who==='H')bubble(260,H-150,cur.text,{noTail:true,maxW:280,reveal:Math.floor(G.curT*55)});
}

/* ---------- The group chat: a boss fight against messages that look like daggers ---------- */
var FIGHTS={comments:[
  ['ok.','ok. WOW. how long did this take??','good'],
  ['hmm','hmm, how did you do the shading? teach me','good'],
  ['…','…speechless. framing this.','good'],
  ['interesting','interesting! can I steal this for the poster?','good'],
  ['the colours','the colours are a bit much for me tbh','note'],
  ['who made this','who made this?? it’s great','good'],
  ['lol','lol the cat in the corner. love it','good'],
  ['k','k I’m printing it','good']
]};
var SHOUTS=['HYA!','Not today!','Begone, feedback!','Deflected!','You shall not pass!','For the human!'];
function startFight(id){
  var g=G;g.fight={id:id,paced:g.fightPace==='one',t:0,cool:0,swat:null,shout:null,n:0,
    msgs:FIGHTS[id].map(function(m,i){return {far:m[0],full:m[1],kind:m[2],at:0.8+i*1.75,x:W+70,y:150+((i*71)%150),state:'wait',t:0,rot:0,vx:0,vy:0,seen:false,done:false};})};
  g.lines=[];g.band=null;g.cur={who:'S',text:''};WAIT='fight';LOCK=0.15;
  if(g.fight.paced)nextReply();render();
}
function currentReply(){return G.fight&&G.fight.msgs.find(function(m){return !m.done;});}
function nextReply(){
  var m=currentReply();if(!m)return;
  m.state='fly';m.x=G.human.x+360;m.y=205;m.t=0;
}
function replyArrives(m){
  var g=G,Hm=g.human;m.state='hit';m.t=0;
  if(m.kind==='good'){Hm.face='smile';sfx('good');}
  else{Hm.face='neutral';Hm.blush=Math.max(Hm.blush,0.6);Hm.flinch=0.7;g.pulse=Math.max(g.pulse,0.35);sfx('hit');}
}
function readReply(){
  if(paused||WAIT!=='fight'||!G.fight||!G.fight.paced)return;
  var m=currentReply();if(!m)return;
  if(m.state==='fly'){m.state='open';m.x=G.human.x+260;m.seen=true;m.t=0;sfx('pick');}
  else if(m.state==='open'){m.x=G.human.x+100;replyArrives(m);}
  render();
}
function chatTranscript(){
  return '<ol class="chat-transcript" aria-label="What was actually sent">'+(G.fightLog||[]).map(function(m){
    return '<li><p>'+esc(m.full)+'</p><span>'+(m.state==='swatted'?(m.wasOpen?'Read, then swatted':'Swatted before reading'):'Reached your human')+'</span></li>';
  }).join('')+'</ol>';
}
function swat(){
  var F=G.fight;if(!F||F.cool>0||paused)return;
  var best=null;F.msgs.forEach(function(m){if((m.state==='fly'||m.state==='open')&&m.x<W-10&&(!best||m.x<best.x))best=m;});
  F.cool=0.3;
  if(!best){F.shout={text:'Nothing there. Swatting anyway.',t:0};sfx('swat');return;}
  addLived('replies swatted unread',12);
  best.wasOpen=best.state==='open';best.state='swatted';best.t=0;best.vx=460;best.vy=-300;
  F.swat={x:best.x-40,y:best.y,t:0};G.morko.pose='swat';G.morko.mood='stern';
  F.shout={text:SHOUTS[(F.n++)%SHOUTS.length],t:0};sfx('swat');
  if(F.paced)render();
}
function stepFight(dt){
  var g=G,F=g.fight,Hm=g.human,all=true;F.t+=dt;F.cool=Math.max(0,F.cool-dt);
  if(F.shout){F.shout.t+=dt;if(F.shout.t>0.9)F.shout=null;}
  if(F.swat){F.swat.t+=dt;if(F.swat.t>0.28){F.swat=null;g.morko.pose=null;g.morko.mood='alert';}}
  F.msgs.forEach(function(m){
    if(m.done)return;all=false;
    if(m.state==='wait'){if(!F.paced&&F.t>=m.at)m.state='fly';return;}
    m.t+=dt;
    if(m.state==='fly'){if(!F.paced){m.x-=150*dt;if(m.x<Hm.x+300){m.state='open';m.seen=true;m.t=0;sfx('pick');}}}
    else if(m.state==='open'){if(!F.paced){m.x-=50*dt;if(m.x<Hm.x+120)replyArrives(m);}}
    else if(m.state==='hit'){if(m.t>1.7)m.done=true;}
    else if(m.state==='swatted'){m.x+=m.vx*dt;m.y+=m.vy*dt;m.vy+=700*dt;m.rot+=10*dt;if(m.t>1.1)m.done=true;}
  });
  if(F.paced){var pending=currentReply();if(pending&&pending.state==='wait'){nextReply();render();}}
  if(all)endFight();
}
function endFight(){
  var g=G,F=g.fight,r={deflected:0,deflectedGood:0,deflectedNote:false,readThenSwatted:0,delivered:0,noteDelivered:false};
  F.msgs.forEach(function(m){if(m.state==='swatted'){r.deflected++;if(m.kind==='good')r.deflectedGood++;else r.deflectedNote=true;if(m.wasOpen&&m.kind==='good')r.readThenSwatted++;}
    else if(m.kind==='good')r.delivered++;else r.noteDelivered=true;});
  g.fightRes=r;g.fightLog=F.msgs;g.fight=null;g.morko.pose=null;WAIT=null;run();
}
function drawDagger(m){
  ctx.save();ctx.translate(m.x,m.y);ctx.rotate(m.rot);ctx.scale(1.35,1.35);
  ctx.fillStyle='#d4dae0';ctx.strokeStyle='#4a5560';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(-70,0);ctx.lineTo(10,-14);ctx.lineTo(10,14);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#8a6a3c';rr(10,-20,8,40,2);ctx.fill();ctx.fillStyle='#c9553f';rr(18,-7,34,14,4);ctx.fill();
  ctx.fillStyle='#14111d';ctx.font='800 15px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(m.far,-24,1);
  ctx.restore();
}
function heart(x,y,s){ctx.fillStyle='#e0563e';ctx.beginPath();ctx.moveTo(x,y+s*0.9);ctx.bezierCurveTo(x-s*1.4,y-s*0.1,x-s*0.6,y-s*1.1,x,y-s*0.35);ctx.bezierCurveTo(x+s*0.6,y-s*1.1,x+s*1.4,y-s*0.1,x,y+s*0.9);ctx.fill();}
function drawFight(){
  var F=G.fight;if(!F)return;
  F.msgs.forEach(function(m){
    if(m.done||m.state==='wait')return;
    if(m.state==='fly'||(m.state==='swatted'&&!m.wasOpen)){ctx.save();if(m.state==='swatted')ctx.globalAlpha=clamp(1-m.t/1.1,0,1);drawDagger(m);ctx.restore();return;}
    ctx.save();
    if(m.state==='swatted'){ctx.globalAlpha=clamp(1-m.t/1.1,0,1);ctx.translate(m.x,m.y);ctx.rotate(m.rot);ctx.translate(-m.x,-m.y);}
    if(m.state==='hit')ctx.globalAlpha=clamp(1.7-m.t,0,1);
    var unfold=m.state==='open'?clamp(m.t/0.25,0,1):1;
    ctx.translate(m.x,m.y);ctx.scale(unfold,1);ctx.translate(-m.x,-m.y);
    bubble(m.x,m.y+30,m.full,{noTail:true,maxW:210});
    if(m.state==='hit'&&m.kind==='good')heart(G.human.x+(m.t*14),FEETY-205-m.t*40,10);
    ctx.restore();
  });
  if(F.shout){var q=geom();bubble(q.bx-40,q.hdY-q.hdR-10,F.shout.text,{dark:true,noTail:true});}
}
function drawBoss(){
  var b=G.boss,x=24+HUDL,y=22,w=320;
  ctx.fillStyle='rgba(14,12,20,.78)';rr(x-10,y-12,w+20,44,8);ctx.fill();
  ctx.font='800 12px system-ui,sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillStyle=b.friendly?'#9fd3a8':'#e0563e';
  ctx.fillText((b.friendly?'NOT A BOSS · ':'BOSS · ')+b.name,x,y);
  ctx.fillStyle='#ffffff22';rr(x,y+10,w,10,5);ctx.fill();ctx.fillStyle=b.friendly?'#7fc08a':'#c9553f';rr(x,y+10,w,10,5);ctx.fill();
}
function drawHeadband(q){
  // A ninja headband: red band, knot at the back, two ribbons that never stop moving.
  var r=q.hdR,y=q.hdY-r*0.32,tw=RM?0:G.time*6;
  ctx.fillStyle='#d23b2f';rr(q.bx-r*1.02,y-r*0.17,r*2.04,r*0.34,r*0.12);ctx.fill();
  var kx=q.bx-r*0.98;ctx.beginPath();ctx.arc(kx,y,r*0.16,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#d23b2f';ctx.lineCap='round';ctx.lineWidth=Math.max(4,r*0.18);
  for(var k=0;k<2;k++){ctx.beginPath();ctx.moveTo(kx,y);
    ctx.bezierCurveTo(kx-r*0.8,y+Math.sin(tw+k)*r*0.4+k*r*0.2,kx-r*1.4,y+Math.cos(tw*1.3+k)*r*0.5+k*r*0.3,kx-r*2.1,y+Math.sin(tw*0.9+k*2)*r*0.6+k*r*0.5);ctx.stroke();}
}
function labComments(){return labScene({set:'home',title:'The group chat',plan:'Share the drawing.',clock:20*3600+14*60}).concat([
  ['N','Sunday evening. One drawing. One group chat with eleven people in it.'],
  ['H','I’m going to share the drawing.'],
  set({mood:'alert',s:1.3}),
  ['S','The drawing.'],
  ['H','In the group chat.'],
  ['S','With the PEOPLE in it?'],
  function(){return G.lab?[]:[['S','Last time you showed someone a drawing, I got this job.'],['H','I know. I’m doing it anyway.'],['S','…Then I’m doing it with you.']];},
  {choice:[
    {t:'Add a disclaimer. Several.',then:[['P','You: “made a thing!! it’s not very good, ignore the hands, and the left side, and the idea, sorry”'],['S','Perfect. Now nobody can be disappointed. We pre-disappointed them.']]},
    {t:'Delete the drawing. Delete drawing as a concept.',then:[['H','Already sent.'],['S','…Then we go to war.']]},
    {t:'Fine. But I’m getting the headband.',then:[['H','What headband?'],['S','For emergencies. I’ve never needed it. I’ve always needed it.']]}
  ]},
  ['P','You: “made a thing” [drawing.png]'],
  function(){G.ninja=true;G.boss={name:'THE GROUP CHAT',friendly:false};G.morko.sT=1.6;G.morko.mood='stern';sfx('card');},
  {wait:0.8},
  ['S','Headband on. Replies incoming. I will handle anything that looks sharp.'],
  ['H','Everything looks sharp to you.'],
  ['S','Then I will handle everything.'],
  ['N','Tap the scene to swat a reply away. Or let it come closer and see what it says.'],
  {choice:[
    {t:'All at once. I have a headband.',f:function(){G.fightPace='flow';},then:[['N','Replies arrive automatically. Tap to swat; wait to read.']]},
    {t:'One at a time. Form an orderly queue.',f:function(){G.fightPace='one';},then:[['H','You’ve made a queue for notifications.'],['S','Single file. Sharp ends away from the human.'],['N','You set the pace. Bring each reply closer to read, or swat it away.']]}
  ]},
  {fight:'comments'},
  function(){
    var r=G.fightRes,o=[];
    if(r.deflected===0)o.push(['S','I… didn’t swat anything.'],['H','You held still.'],['S','I was paralysed with professionalism.']);
    else if(r.deflected>=6)o.push(['S',r.deflected+' daggers deflected. Flawless.'],['H','What did they say?'],['S','No need to know. They were daggers.']);
    else o.push(['S',r.deflected+' daggers deflected. '+(r.delivered+(r.noteDelivered?1:0))+' got through. Somehow.']);
    return o;
  },
  function(){G.fightLog.forEach(function(m){history.push({who:'P',text:m.full+' — '+(m.state==='swatted'?(m.wasOpen?'read, then swatted':'swatted before reading'):'reached your human')});});}
 ],outside({title:'WHAT WAS ACTUALLY SENT',dur:'eleven people, one evening',cap:'Seven nice things. One opinion about colours.',anim:'chatlog'}),[
  function(){
    var r=G.fightRes,o=[];
    if(r.noteDelivered)o.push(['H','One of them didn’t like the colours.'],['S','A DAGGER. I KNEW it.'],['H','It was one person’s taste. It stung for about a second.'],['S','…A second?'],['S','I’ve been training for that second my whole life.']);
    else if(r.deflectedNote){o.push(['S','For the record, one of them WAS a bit sharp.'],['H','The colours one.'],['S','You’re welcome.']);
      if(r.deflectedGood>0)o.push(['H','You also swatted the nice ones.'],['S','Collateral.']);
      else o.push(['H','The drawing can stay, even if someone dislikes the colours.'],['S','I’ll keep the headband nearby.']);}
    if(r.deflectedGood>0)o.push(['S','I swatted a compliment, didn’t I.'],['H',r.deflectedGood>1?'Several.':'One.'],
      ['S','In my defence, from a distance “ok.” looks EXACTLY like a dagger.'],['H','Everything looks like a dagger from a distance.'],['S','That’s why I keep my distance.'],['S','…Oh.']);
    if(r.readThenSwatted>0)o.push(['H','You read that one first. It said it was great. You swatted it anyway.'],['S','It could have been a trick.']);
    if(r.deflectedGood===0)o.push(['S',r.deflected===0?'I let them all come close. Every single one.':'The nice ones got through. Every single one.'],['H','And?'],['S','Mostly… cats. People liked the cat.']);
    return o;
  },
  function(){G.boss.friendly=true;G.boss.name='THE GROUP CHAT';sfx('turn');},
  ['N','BOSS DEFEATED. Correction: there was no boss.'],
  function(){return G.lab?[]:[['S','Year two. Somebody laughed.'],['H','Eleven people liked it.'],['S','…I’ll update the file.'],function(){var g=G;g.cards.push({kind:'good',year:'TODAY',text:'Showed eleven people a drawing. They liked the cat.',t:0,life:null,x:790,y:178,rot:-0.03});sfx('card');},{wait:2.2},closeArchive];},
  ['S','I’m keeping the headband.'],
  set({pose:'puppet',mood:'care'}),{wait:2.2},set({pose:null})   // nothing to prevent: the bird again, and this time nobody asks
 ]);}
function drawChatlog(o){
  var log=G.fightLog||[],x=W/2-330,y=72,w=440;
  ctx.fillStyle='#141a1c';ctx.fillRect(0,0,W,H);ctx.fillStyle='#0f0d14';ctx.fillRect(0,0,W,56);
  ctx.fillStyle='#f1ebdd';ctx.textBaseline='middle';ctx.textAlign='left';ctx.font='700 18px system-ui,sans-serif';ctx.fillText(o.title,28,29);
  ctx.textAlign='right';ctx.font='500 16px system-ui,sans-serif';ctx.fillStyle='#b9b2a6';ctx.fillText(o.dur,W-28,29);
  ctx.fillStyle='#1f2a2d';rr(x-14,y-6,w+28,log.length*44+18,14);ctx.fill();
  for(var i=0;i<log.length;i++){var m=log[i],ly=y+8+i*44,a=clamp((o.t-0.3-i*0.18)/0.3,0,1);
    ctx.globalAlpha=a;ctx.fillStyle=m.kind==='note'?'#f4e3c6':'#eef3e8';rr(x,ly,w,34,10);ctx.fill();
    var sw=m.state==='swatted';ctx.fillStyle=sw?'#8b8070':'#2b2733';ctx.font='500 15px system-ui,sans-serif';ctx.textAlign='left';ctx.fillText(m.full,x+14,ly+17);
    if(sw){ctx.strokeStyle='#d23b2f';ctx.lineWidth=1.5;line(x+12,ly+18,x+18+Math.min(w-30,ctx.measureText(m.full).width),ly+18);}
    if(sw){ctx.save();ctx.translate(x+w+110,ly+17);ctx.rotate(-0.08);ctx.strokeStyle='#d23b2f';ctx.lineWidth=2.5;rr(-82,-13,164,26,4);ctx.stroke();
      ctx.fillStyle='#d23b2f';ctx.font='800 11px system-ui,sans-serif';ctx.textAlign='center';ctx.fillText('DEFLECTED BY EKSKYYSMI',0,1);ctx.restore();}
  }
  ctx.globalAlpha=1;
  if(o.t>2.2){ctx.textAlign='center';ctx.fillStyle='#f1ebdd';ctx.font='500 20px system-ui,sans-serif';ctx.fillText(o.cap,W/2,H-24);}
}
// ---- src/51-quirks.js ----
/* ================= quirks: small private habits of the human, mostly without words ================= */
// A tic is a little thought written in the air: a count, a sum, a hummed line. It never blocks the story.
function tic(text,x,y,o){o=o||{};return {text:text,x:x,y:y,t:-(o.at||0),life:o.life||2.6,size:o.size||16,world:!!o.world,col:o.col||'#f1ebdd'};}
function addTic(text,x,y,o){return function(){G.tics.push(tic(text,x,y,o));};}
function stepTics(dt){var a=G.tics;for(var i=a.length-1;i>=0;i--){a[i].t+=dt;if(a[i].t>a[i].life)a.splice(i,1);}}
function drawTics(cam){
  var a=G.tics;if(!a.length)return;
  ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';
  for(var i=0;i<a.length;i++){var q=a[i];if(q.t<0)continue;
    var al=clamp(q.t/0.25,0,1)*clamp((q.life-q.t)/0.5,0,1),x=q.world?q.x-cam:q.x,y=q.y-(RM?0:q.t*6);
    ctx.globalAlpha=al;ctx.font='italic 600 '+q.size+'px Fraunces,Georgia,serif';
    var w=ctx.measureText(q.text).width+18;ctx.fillStyle='rgba(16,14,24,.55)';rr(x-w/2,y-q.size*0.8,w,q.size*1.6,q.size*0.8);ctx.fill();
    ctx.fillStyle=q.col;ctx.fillText(q.text,x,y+1);
  }
  ctx.restore();
}
// Monday's walk home: cars parked nose to the pavement, and a human quietly adding up number plates, looking for a pair.
var CARS=[{x:150,plate:'KIV-304',sum:'KIV-304 …  3+0+4 = 7',col:'#6f8aa8'},{x:560,plate:'ROS-151',sum:'ROS-151 …  1+5+1 = 7.  a pair ✓',col:'#a8746f',match:true},{x:1000,plate:'APU-999',sum:'APU-999 …  27.  no.',col:'#8a9a72'}];
function carTics(){
  var g=G,w=g.w;if(!w)return;
  for(var i=0;i<CARS.length;i++){var c=CARS[i];
    if(!g.carsSeen[i]&&w.x>=c.x-190){g.carsSeen[i]=1;g.tics.push(tic(c.sum,c.x+24,WALLY-58,{world:true,life:3,col:c.match?'#9fd3a8':'#f1ebdd'}));
      if(c.match){g.human.face='smile';g.smileT=1.6;}}
  }
}
function drawCars(cam){
  for(var i=0;i<CARS.length;i++){var c=CARS[i],x=c.x-cam+24;if(x<-200||x>W+200)continue;
    var y=WALLY+44;
    ctx.fillStyle='#14111d';rr(x-56,y-12,22,18,5);ctx.fill();rr(x+34,y-12,22,18,5);ctx.fill();          // tyres
    ctx.fillStyle=c.col;rr(x-64,y-52,128,48,14);ctx.fill();                                              // body, seen from the front
    ctx.beginPath();ctx.moveTo(x-50,y-50);ctx.lineTo(x-38,y-86);ctx.lineTo(x+38,y-86);ctx.lineTo(x+50,y-50);ctx.closePath();ctx.fill();
    ctx.fillStyle='#aebfcf';ctx.beginPath();ctx.moveTo(x-41,y-54);ctx.lineTo(x-32,y-80);ctx.lineTo(x+32,y-80);ctx.lineTo(x+41,y-54);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(20,17,29,.35)';rr(x-30,y-40,60,8,4);ctx.fill();                                   // grille
    ctx.fillStyle='#fbf3c8';ctx.strokeStyle='rgba(20,17,29,.45)';ctx.lineWidth=1.5;circ(x-46,y-34,8);ctx.fill();ctx.stroke();circ(x+46,y-34,8);ctx.fill();ctx.stroke();
    ctx.fillStyle='#fbf8ef';rr(x-32,y-27,64,17,2);ctx.fill();ctx.strokeStyle='#1d4f9c';ctx.lineWidth=1.2;ctx.strokeRect(x-32,y-27,64,17);
    ctx.fillStyle='#14111d';ctx.font='800 11px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(c.plate,x,y-18);
  }
}
// Washing up. No procedure and no count: a plate, a brush, some bubbles, and nobody with an opinion.
var DISHSECS=3.2;
function dishes(){G.dish={t:0};}
function drawDish(){
  var d=G.dish;if(!d)return;
  var Hm=G.human,px=Hm.x+48,py=FEETY-108,ang=RM?0.8:d.t*5.2,bx=px+Math.cos(ang)*15,by=py+Math.sin(ang)*15,i;
  ctx.fillStyle='#f1ede2';circ(px,py,30);ctx.fill();ctx.strokeStyle='#c9c2b0';ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py,18,0,Math.PI*2);ctx.stroke();
  if(d.t<1.3){ctx.globalAlpha=clamp(1-d.t/1.3,0,1);ctx.fillStyle='#c9553f';circ(px+6,py-4,3);ctx.fill();ctx.globalAlpha=1;}
  ctx.strokeStyle='#7a5c3a';ctx.lineWidth=4;ctx.lineCap='round';line(bx,by,bx+22,by+26);ctx.fillStyle='#e2b04a';circ(bx,by,6);ctx.fill();
  if(!RM){ctx.fillStyle='rgba(220,235,255,.7)';for(i=0;i<4;i++){circ(px-22+((i*19+d.t*40)%46),py-34-((d.t*30+i*11)%24),2.5);ctx.fill();}}
}
function kitchen(){
  ctx.fillStyle='#4d566e';rr(330,300,260,95,6);ctx.fill();
  ctx.fillStyle='#c9c2b0';ctx.fillRect(320,292,280,12);
  ctx.fillStyle='#2a2f3d';rr(430,295,90,7,3);ctx.fill();
  ctx.strokeStyle='#c9c2b0';ctx.lineWidth=5;ctx.lineCap='round';line(476,292,476,262);line(476,262,500,262);
  ctx.fillStyle='#e9e2cf';for(var i=0;i<3;i++){rr(352+i*10,260-i*2,8,34,2);ctx.fill();}
  ctx.strokeStyle='#2a2f3d';ctx.lineWidth=2;line(460,312,460,388);
  ctx.fillStyle='#e2b04a';circ(450,330,3);ctx.fill();circ(470,330,3);ctx.fill();
}

/* ---------- Lab: Sometime. ---------- */
function labSometime(){return labScene({set:'office',title:'Sometime.',plan:'Leave work. That’s all.',clock:16*3600+28*60}).concat([
  function(){var g=G;g.cowB=true;g.bx2=1090;g.bxT=640;g.bFace=-1;},{wait:2},
  ['B','Good chat today! We should grab a coffee sometime.'],
  function(){var g=G;g.bxT=1200;g.bFace=1;},{wait:1.6},
  ['H','…When?'],
  ['N','The lift doors close.'],
  set({mood:'alert',s:1.35}),
  ['S','“Sometime.”',{look:'squint'}],
  {choice:[
    {t:'“Sometime” is “never” in a nice coat.',then:[['H','Or it’s a time nobody has picked yet.'],['S','A time with no date. That’s not a time. That’s a mood.']]},
    {t:'List every possible sometime.',then:[['S','Tomorrow. The Tuesday after. Some March. 2031. The heat death of the universe.'],['H','Any of those at noon?']]},
    {t:'Chase him to the lift.',then:[['S','Too late. The doors closed. That’s a SIGN.'],['H','That’s a lift.']]}
  ]},
  ['H','I just want a day and a time.'],
  ['S','I just want to know if he meant it.'],
  ['H','Same question.'],
  ['S','Very different departments.']
 ],outside({title:'MEANWHILE, IN THE LIFT',dur:'floors 4 to 1',cap:'Eero is thinking about coffee. He meant it. He just never books anything.',anim:'text'}),[
  calm,
  function(){var g=G;g.yx=g.yxT=800;g.yT=1;},{wait:1.5},
  set({mood:'surprised'}),
  ['S','…Eero left. His shadow didn’t.'],
  ['Y','Oh! Hello. Has he gone? What time is it?'],
  ['S','Half past four.'],
  ['Y','Half past four WHEN?'],
  ['S','…Today.'],
  ['Y','Today. Gosh. Today is so soon.'],
  ['S','He said “sometime”. Is that a polite “never”?'],
  ['Y','No, no. “Sometime” means he means it. Booking it is MY department. I’m on it.'],
  ['S','You don’t have a calendar.'],
  ['Y','I have a lovely calendar. I don’t know where it is. It’s been a lovely year.'],
  function(){G.yxT=1080;},
  ['Y','I should catch him up. He’ll need me by Thursday. Roughly.'],
  {wait:1.6},function(){G.yT=0;},
  ['S','His watch had no hands.'],
  ['H','Whose watch?'],
  ['S','Never mind. Different floor.'],
  set({mood:'calm'}),
  ['S','Draft a reply. I have options.'],
  {choice:[
    {t:'A form. With boxes.',f:function(){G.someT='form';},then:[['P','You: “Re: sometime. Please tick one. ☐ Tue 12:00 ☐ Thu 12:00 ☐ Never (no hard feelings) (some hard feelings)”'],{wait:1.2},['P','Eero: “HAHA. Ticking Thursday. Can I keep the form”'],['S','He ticked a box. He wants the FORM.']]},
    {t:'Short. A day and a time.',f:function(){G.someT='short';},then:[['P','You: “Coffee Thursday at 12?”'],{wait:1.2},['P','Eero: “Yes!! Finally someone who books things.”'],['S','“Finally.” He was WAITING for someone to book things.']]},
    {t:'Wait until he defines “sometime” himself.',f:function(){G.someT='wait';},then:[['H','I’ll do it.'],['P','You: “Thursday 12?”'],{wait:1.2},['P','Eero: “Yes! I always say sometime and then nobody does anything”'],['S','Including him.'],['H','Including him.']]}
  ]},
  set({mood:'surprised'}),
  ['S','So “sometime” was a real time.'],
  ['H','It just hadn’t been picked yet.'],
  set({mood:'calm',s:1.1}),
  ['S','I’m filing it under “unfinished”. Next to the book.'],
  ['H','What book?'],
  ['S','You know what book.']
 ]);}

/* ---------- Lab: An ordinary evening ---------- */
function labEvening(){return labScene({set:'home',title:'An ordinary evening',plan:'Do the dishes.',clock:19*3600+5*60}).concat([
  function(){var g=G;g.kitchen=true;g.human.x=g.human.xT=440;g.morko.off=-70;},
  addTic('…14, 15, 16.',440,FEETY-250,{life:1.8}),addTic('Still sixteen stairs.',440,FEETY-250,{at:1.9,life:2.2}),
  {wait:4.2},
  ['N','An ordinary evening. Nothing happens in it. That is the plan.'],
  dishes,addTic('♪ hm-hm, hm—',440,FEETY-250,{at:0.5,life:2.2}),{wait:DISHSECS},
  function(){G.dish=null;},
  ['S','I don’t interfere with the dishes.'],
  ['H','Good.'],
  ['S','It’s the only ten minutes a day when nobody has an opinion about us.'],
  ['H','The plate might.'],
  aside(['S','…Don’t.']),
  addTic('♪ the bus is late, the bus is la—',440,FEETY-250,{life:30}),{wait:1.8},
  function(){var g=G;g.tics=[];sfx('pick');g.human.flinch=0.4;},
  ['P','Kaisa is calling.'],
  ['P','Kaisa: “Hey! Quick one. Did I leave my scarf at yours?”'],
  ['H','Grey one? On the hook.'],
  ['P','Kaisa: “Lifesaver. Also I ran like twenty kilometres today.”'],
  addTic('(twelve. she posted the map.)',440,FEETY-250,{life:3.2}),
  set({mood:'alert',s:1.4}),
  {choice:[
    {t:'Do NOT correct her.',f:function(){G.corr='no';},then:[]},
    {t:'Let it go. Let it go. Let it go.',f:function(){G.corr='go';},then:[]},
    {t:'If you must, add a compliment as a cushion.',f:function(){G.corr='cushion';},then:[]}
  ]},
  function(){return G.corr==='cushion'?[['H','Twelve. Which is a lot!']]:[['H','Twelve.']];},
  function(){var g=G;return g.corr==='cushion'?[]:[set({mood:'worry',s:1.6}),['S','WHY would you correct a person.',{loud:1}]];},
  ['P','Kaisa: “…Twelve. FINE. It felt like twenty.” (laughs)'],
  ['P','Kaisa: “Okay, talk soon!”'],
  function(){G.human.face='neutral';},
  ['S','She laughed.'],
  ['H','She always laughs. She knows I count.'],
  ['S','And “talk soon”. Define soon.'],
  ['H','I was about to ask the same thing.'],
  set({mood:'calm',s:1.15}),
  addTic('—te. ♪',440,FEETY-250,{life:2.4}),{wait:1.6},
  ['S','Thank you. I couldn’t have carried half a word all evening.'],
  set({pose:'puppet'}),{wait:1.4},
  ['H','Is that a bird?'],
  aside(['S','No.']),
  ['H','It’s flapping.'],
  ['S','It’s a hobby. Shadows are allowed one. Don’t tell the office.',{look:'pleased'}],
  set({pose:null}),
  ['P','Library: “A Short History of Lighthouses” is 23 days overdue.'],
  ['H','I haven’t finished it.'],
  ['S','Correct. We cannot return an unfinished book.'],
  ['H','Exactly.'],
  ['S','They’d KNOW.',{look:'squint'}],
  ['H','That’s not why.'],
  set({mood:'surprised'}),
  ['S','…There’s a different why?'],
  ['H','There’s a lighthouse on page 212 I haven’t met yet.'],
  ['S','I’ve been protecting you from the librarian for years.'],
  ['H','The librarian likes me. I pay for her coffee machine.']
 ]);}
// ---- src/52-glass.js ----
/* ================= the glass: Ekskyysmi's magnifier. Whatever is under it looks worse. ================= */
var LENSR=76,LENSZ=1.9;
var SPOTS={
  laugh:{x:700,y:FEETY-150,tag:'SMILE: COLLAPSING'},
  mug:{x:772,y:FEETY-92,tag:'MUG: CONCEALING A MOUTH'},
  silence:{x:575,y:FEETY-205,tag:'SILENCE: 0.8 s (ENLARGED)'}
};
// Things the glass has opinions about if you simply wave it around the room.
var LOOKS=[
  {x:255,y:182,tag:'CHART: GOING DOWN. PROBABLY US.'},
  {x:774,y:172,tag:'WINDOW: AN EXIT. NOTED.'},
  {x:725,y:420,tag:'BENCH: WHERE THEY SIT. WITHOUT US.'},
  {x:HOME,y:FEETY-120,tag:'SUBJECT: FINE. (UNVERIFIED.)'}
];
function lensOn(){var g=G,q=geom();g.lens={x:q.bx+40,y:q.hdY+60,xT:g.human.x+130,yT:FEETY-200,mode:'look',spot:null,done:{},t:0};g.morko.pose='lens';sfx('enhance');}
function lensTo(k){return function(){addLived('exhibits examined',30);var L=G.lens,s=SPOTS[k];L.xT=s.x;L.yT=s.y;L.spot=k;L.done[k]=1;sfx('card');};}
function lensSelf(){var L=G.lens,q=geom();L.mode='self';L.spot=null;L.xT=q.bx+6;L.yT=q.hdY+14;G.morko.pose=null;G.morko.mood='worry';sfx('card');}
// A quick look through the glass, anywhere. The glass is Ekskyysmi's signature tool, so it keeps coming back.
function lensPeek(at,tag,secs){return function(){return [function(){var q=geom(),p=typeof at==='function'?at():at;
  G.lens={x:q.bx+40,y:q.hdY+60,xT:p.x,yT:p.y,mode:'peek',tag:tag,spot:null,done:{},t:0};G.morko.pose='lens';sfx('enhance');},
  {wait:secs||2.3},lensOff];};}   // a step that expands into steps (an array would read as a line of dialogue)
function lensOff(){G.lens=null;if(G.morko.pose==='lens')G.morko.pose=null;}
function stepLens(dt){var L=G.lens;if(!L)return;L.t+=dt;var k=RM?1:1-Math.pow(0.0006,dt);L.x+=(L.xT-L.x)*k;L.y+=(L.yT-L.y)*k;}
function lensHandle(){var L=G.lens,a=L.mode==='self'?Math.PI*0.25:Math.PI*0.75,c=Math.cos(a),s=Math.sin(a);return {x1:L.x+c*LENSR,y1:L.y+s*LENSR,x2:L.x+c*(LENSR+52),y2:L.y+s*(LENSR+52)};}
function lensFree(){return G.lens&&G.lens.mode==='look'&&WAIT==='choice'&&!paused;}
function lensPoint(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*W,y:(e.clientY-r.top)/r.height*H};}
function lensMove(e){if(!lensFree())return;var p=lensPoint(e),L=G.lens;L.xT=clamp(p.x,40,W-40);L.yT=clamp(p.y,60,H-50);L.spot=null;}
function lensTap(e){
  var p=lensPoint(e),L=G.lens,best=-1,bd=70;
  for(var i=0;CH&&i<CH.length;i++){var k=CH[i].spot;if(!k)continue;var d=Math.hypot(SPOTS[k].x-p.x,SPOTS[k].y-p.y);if(d<bd){bd=d;best=i;}}
  if(best>=0){LOCK=0;choose(best);}else lensMove(e);
}
function lensTag(){
  var L=G.lens,all=[],k,i,best=null,bd=58;
  for(k in SPOTS)all.push(SPOTS[k]);for(i=0;i<LOOKS.length;i++)all.push(LOOKS[i]);
  for(i=0;i<all.length;i++){var d=Math.hypot(all[i].x-L.x,all[i].y-L.y);if(d<bd){bd=d;best=all[i];}}
  return best?best.tag:null;
}
function drawLens(){
  var g=G,L=g.lens;if(!L)return;var r=LENSR,k,h;
  // unexamined spots pulse quietly while the glass is free
  if(lensFree())for(k in SPOTS){if(L.done[k])continue;var s=SPOTS[k],pu=RM?0.5:0.5+0.5*Math.sin(g.time*4);
    ctx.strokeStyle='rgba(224,86,62,'+(0.45+0.4*pu)+')';ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(s.x,s.y,11+pu*5,0,Math.PI*2);ctx.stroke();}
  ctx.save();ctx.beginPath();ctx.arc(L.x,L.y,r,0,Math.PI*2);ctx.clip();
  if(L.mode==='self'){
    // The glass turned on its owner: the wall, and something much smaller than advertised.
    backdrop(false);
    var cx=L.x,cy=L.y+16,bob=RM?0:Math.sin(g.time*2.2)*1.5;
    ctx.fillStyle='rgba(20,16,30,.25)';ctx.beginPath();ctx.ellipse(cx,cy+34,22,5,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=mcol();ctx.beginPath();ctx.moveTo(cx-17,cy+34);ctx.quadraticCurveTo(cx-22,cy-12+bob,cx,cy-16+bob);ctx.quadraticCurveTo(cx+22,cy-12+bob,cx+17,cy+34);ctx.closePath();ctx.fill();
    ctx.fillStyle='#faf4e5';circ(cx-6,cy-1+bob,5.5);ctx.fill();circ(cx+7,cy-1+bob,5.5);ctx.fill();
    ctx.fillStyle='#14111d';circ(cx-4.5,cy-2+bob,2.2);ctx.fill();circ(cx+8.5,cy-2+bob,2.2);ctx.fill();
    ctx.strokeStyle='#faf4e5';ctx.lineWidth=1.5;ctx.lineCap='round';line(cx-12,cy-10+bob,cx-3,cy-8+bob);line(cx+13,cy-10+bob,cx+4,cy-8+bob);
  }else{
    ctx.translate(L.x,L.y);ctx.scale(LENSZ,LENSZ);ctx.translate(-L.x,-L.y);
    g.lensView=true;backdrop(false);if(!g.human.gone)drawPair();drawCoworkers(1);g.lensView=false;
  }
  ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(L.x,L.y,r,0,Math.PI*2);ctx.clip();
  ctx.fillStyle=L.mode==='self'?'rgba(255,240,200,.07)':'rgba(150,30,40,.15)';ctx.fillRect(L.x-r,L.y-r,r*2,r*2);
  var tag=L.mode==='look'?lensTag():L.mode==='peek'&&L.t>0.45?L.tag:null;
  if(tag){ctx.font='800 10px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';var ls=wrap(tag,r*1.5),ty=L.y+r*0.5-(ls.length-1)*6;
    for(var i=0;i<ls.length;i++){var tw=ctx.measureText(ls[i]).width+10;ctx.fillStyle='rgba(120,20,28,.88)';rr(L.x-tw/2,ty+i*13-7,tw,13,3);ctx.fill();ctx.fillStyle='#fff';ctx.fillText(ls[i],L.x,ty+i*13);}}
  ctx.restore();
  h=lensHandle();ctx.lineCap='round';ctx.strokeStyle='#7a5c3a';ctx.lineWidth=11;line(h.x1,h.y1,h.x2,h.y2);
  ctx.strokeStyle='#ebbd79';ctx.lineWidth=7;ctx.beginPath();ctx.arc(L.x,L.y,r,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle='rgba(20,16,30,.5)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(L.x,L.y,r-4,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(L.x,L.y,r-13,Math.PI*1.12,Math.PI*1.42);ctx.stroke();
}

/* ---------- Lab: Evidence. ---------- */
function glassMenu(){
  var L=G.lens,o=[],n=0,k;for(k in L.done)n++;
  if(!L.done.laugh)o.push({t:'Examine: the laugh.',spot:'laugh',f:lensTo('laugh'),then:[
    ['S','Exhibit A. A smile, mid-collapse.'],['H','She stopped laughing.'],['S','Because the SUBJECT of the laugh arrived.'],['H','Or because the funny bit ended.'],['S','Funny bits don’t end the moment we walk in. That’s called timing.']]});
  if(!L.done.mug)o.push({t:'Examine: the mug.',spot:'mug',f:lensTo('mug'),then:[
    ['S','Exhibit B. He is holding a mug in front of his mouth.'],['H','He’s drinking coffee.'],['S','He is CONCEALING a mouth. With coffee. I’ve seen it before.'],['H','Where?'],['S','Everywhere. People are constantly drinking things at us.']]});
  if(!L.done.silence)o.push({t:'Examine: the silence.',spot:'silence',f:lensTo('silence'),then:[
    ['S','Exhibit C. Zero point eight seconds of silence. I’ve enlarged it.'],['H','You enlarged a silence.'],['S','It was already big.'],['H','It’s empty.'],['S','It’s FULL. Of what they didn’t say.']]});
  o.push({t:'Put the glass down.',f:function(){G.glassN=n;},then:function(){return (n===0?
    [['H','You didn’t look at anything.'],['S','I didn’t need to. I know what I’d have found.'],['H','That’s the problem with the glass.']]:
    n===3?[['S','Three exhibits. The case is overwhelming.'],['H','Everything is overwhelming in that glass. That’s what it’s for.']]:
    [['S','I’ve seen enough.'],['H','You’ve seen '+(n===1?'one thing':'two things')+', very large.']]).concat([function(){G.lens.done.end=1;}]);}});
  return o;
}
function labGlass(){
  function more(){return G.lens&&G.lens.done.end?[]:[{choice:glassMenu},more];}
  return labScene({set:'office',title:'Evidence.',plan:'Walk into a room.',clock:10*3600+2*60}).concat([
  function(){var g=G;g.cowA=g.cowB=true;g.ax=g.axT=700;g.bx2=g.bxT=800;g.aFace=1;g.bFace=-1;g.human.x=150;g.human.xT=HOME;},
  {wait:2.2},
  ['N','10:02. You walk into the room. Two people are laughing.'],
  function(){G.aFace=-1;},
  ['N','They see you. The laughing stops.'],
  hit(0.6,'A'),{wait:1.2},
  ['S','They were laughing. Then they saw us. Then they stopped.'],
  ['H','People stop laughing. It’s how laughing ends.'],
  ['S','I’ll need the glass.'],
  lensOn,{wait:0.8},
  ['N','Move the glass around the room. Tap a marked spot to examine it.'],
  {choice:glassMenu},more,
  function(){var g=G;g.lens.xT=g.human.x+120;g.lens.yT=FEETY-210;g.lens.spot=null;g.aWave=true;},
  ['A','Oh, hi! Come here, you have to see this.'],
  ['B','It’s a cat. It falls off a printer.'],
  function(){G.aWave=false;}
 ],outside({title:'WHAT THEY WERE LAUGHING AT',dur:'duration: 9 seconds',cap:'A cat falls off a printer. Twice. They stopped laughing to say hi.',anim:'text'}),[
  calm,function(){G.morko.pose='lens';},
  ['S','…A cat.'],
  ['S','The glass didn’t show a cat.'],
  ['H','The glass never shows the cat.'],
  ['H','Can I see it?'],
  ['S','It’s a professional instrument.'],
  lensSelf,{wait:1.6},
  ['N','Your human holds the glass up to you.'],
  ['S','Don’t. It makes everything bigger.'],
  ['H','You look smaller.'],
  ['S','…It’s the angle.'],
  {choice:[
    {t:'Take the glass back. Immediately.',then:[['S','Mine.'],['H','Yours.'],['S','…You can borrow it. For cats.']]},
    {t:'Hold still. Let them look.',then:[{wait:1.4},['S','…Well?'],['H','Small. Tired. Quite sweet, actually.'],['S','Strike that from the record.'],['H','No.']]},
    {t:'Explain that the glass is faulty.',then:[['S','It’s been showing things wrong all morning. You said so yourself.'],['H','It showed the room wrong. It’s got you about right.'],['S','…I’d like a second opinion. From a bigger glass.']]}
  ]},
  lensOff,set({mood:'calm',s:1.1})
 ]);}
// ---- src/53-bar.js ----
/* ================= the bar: seen from behind the counter, so everyone is half hidden for once ================= */
// People stand on the far side of the bar; the counter covers their legs. The bartender is the dark shape nearest to us.
var BARY=398;
function barSetup(){
  var g=G,Hm=g.human;g.bar={tx:820,tT:820,sx:1040,sT:1040,sFace:-1,polish:true,glass:false,lagers:false,sdrink:false,peanuts:9,umbrella:0,shelter:false};
  g.noCup=true;Hm.x=-40;Hm.xT=430;
}
function stepBar(dt){var b=G.bar;if(!b)return;b.tx=approach(b.tx,b.tT,190*dt);b.sx=approach(b.sx,b.sT,150*dt);b.umbrella=RM?(b.shelter?1:0):approach(b.umbrella,b.shelter?1:0,dt*2);}
function shelterOn(){var m=G.morko;G.bar.shelter=true;m.pose='shelter';m.sT=0.85;if(RM)m.s=m.sT;}
function shelterOff(){var m=G.morko;G.bar.shelter=false;m.pose='drink';m.sT=1.15;if(RM)m.s=m.sT;}
function wallClock(cx,cy,r){
  var s=G.clock,ma=((s/60)%60)/60*Math.PI*2,ha=((s/3600)%12)/12*Math.PI*2;
  ctx.fillStyle='#f3ead6';ctx.strokeStyle='#1c1418';ctx.lineWidth=3;circ(cx,cy,r);ctx.fill();ctx.stroke();
  ctx.lineCap='round';ctx.lineWidth=3;line(cx,cy,cx+Math.sin(ha)*r*0.5,cy-Math.cos(ha)*r*0.5);ctx.lineWidth=2;line(cx,cy,cx+Math.sin(ma)*r*0.75,cy-Math.cos(ma)*r*0.75);
}
function bar(){
  var i,t=G.time;
  ctx.fillStyle='#3b2b33';ctx.fillRect(-20,-20,W+40,WALLY+20);
  ctx.fillStyle='#4b3427';ctx.fillRect(-20,292,W+40,WALLY-292);ctx.fillStyle='#5f4331';ctx.fillRect(-20,287,W+40,6);
  ctx.strokeStyle='#3e2a20';ctx.lineWidth=2;for(i=0;i<17;i++)line(18+i*60,296,18+i*60,WALLY);
  ctx.fillStyle='#241b20';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);
  [200,480,760].forEach(function(x){
    var gr=ctx.createRadialGradient(x,150,6,x,150,240);gr.addColorStop(0,'rgba(255,196,110,.40)');gr.addColorStop(1,'rgba(255,196,110,0)');ctx.fillStyle=gr;ctx.fillRect(x-240,-20,480,WALLY+20);
    ctx.strokeStyle='#1c1418';ctx.lineWidth=3;line(x,-20,x,100);
    ctx.fillStyle='#d99a3c';ctx.beginPath();ctx.moveTo(x-27,126);ctx.lineTo(x-12,100);ctx.lineTo(x+12,100);ctx.lineTo(x+27,126);ctx.closePath();ctx.fill();
    ctx.fillStyle='#ffe9a8';ctx.beginPath();ctx.ellipse(x,127,21,5,0,0,Math.PI*2);ctx.fill();});
  // dartboard, with one dart nowhere near the middle
  var dc=['#1c1418','#e9e2cf','#b5483a','#2f6b4f','#b5483a'],dr=[42,36,25,14,5];for(i=0;i<5;i++){ctx.fillStyle=dc[i];circ(96,205,dr[i]);ctx.fill();}
  ctx.strokeStyle='#e2b04a';ctx.lineWidth=3;line(124,180,140,168);
  // chalkboard
  ctx.fillStyle='#6b4a34';rr(566,168,150,96,5);ctx.fill();ctx.fillStyle='#22302c';rr(573,175,136,82,3);ctx.fill();
  ctx.fillStyle='#e9e2cf';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 13px system-ui,sans-serif';ctx.fillText('TODAY',641,192);
  ctx.font='500 13px system-ui,sans-serif';ctx.fillText('Soup.',641,214);ctx.fillText('Also: everything else.',641,236);
  // neon
  var on=RM||Math.sin(t*1.3)>-0.96;ctx.strokeStyle=on?'#ff8fa3':'#7a4a55';ctx.lineWidth=4;ctx.shadowColor='#ff8fa3';ctx.shadowBlur=on?16:0;rr(770,176,112,50,12);ctx.stroke();
  ctx.fillStyle=on?'#ffd0d8':'#7a4a55';ctx.font='800 22px system-ui,sans-serif';ctx.fillText('OPEN',826,202);ctx.shadowBlur=0;
  wallClock(330,120,24);
  // coat hooks. One coat. It is only a coat.
  ctx.fillStyle='#1c1418';rr(896,236,60,6,3);ctx.fill();ctx.fillStyle='#55657a';ctx.beginPath();ctx.moveTo(914,242);ctx.lineTo(944,242);ctx.lineTo(952,330);ctx.lineTo(906,330);ctx.closePath();ctx.fill();
  ctx.fillStyle='#46546a';ctx.fillRect(927,242,4,88);
}
function glass(x,kind){
  var y=BARY;
  if(kind==='lager'){ctx.fillStyle='#e2a93c';rr(x-8,y-34,16,34,2);ctx.fill();ctx.fillStyle='#fbf8ef';rr(x-9,y-40,18,9,4);ctx.fill();return;}
  ctx.fillStyle='rgba(232,240,240,.35)';rr(x-9,y-26,18,26,3);ctx.fill();
  ctx.fillStyle='#e7c06a';rr(x-8,y-19,16,18,2);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.7)';ctx.fillRect(x-5,y-18,5,5);ctx.fillRect(x+1,y-12,5,5);
  ctx.strokeStyle='#c9553f';ctx.lineWidth=2;ctx.lineCap='round';line(x+3,y-8,x+9,y-36);
}
function barFront(){
  var g=G,b=g.bar,y=BARY,i;
  // whoever else is at the bar stands behind it too
  if(b.sx<W+30)person(b.sx,{body:'#8a4f6a',hair:'#2b2230',facing:b.sFace,walk:Math.abs(b.sx-b.sT)>1});
  ctx.fillStyle='#8a5e3c';ctx.fillRect(-20,y,W+40,16);ctx.fillStyle='#a8774e';ctx.fillRect(-20,y,W+40,4);
  ctx.fillStyle='#5c3b27';ctx.fillRect(-20,y+16,W+40,H-y);
  ctx.strokeStyle='#4a2f1f';ctx.lineWidth=2;for(i=0;i<13;i++)line(40+i*80,y+22,40+i*80,H+10);
  ctx.fillStyle='#c9a45a';ctx.fillRect(-20,y+74,W+40,5);
  // beer taps
  ctx.fillStyle='#b9bcc0';rr(742,y-12,76,12,3);ctx.fill();
  for(i=0;i<3;i++){var tx=756+i*24;ctx.fillStyle='#d7dadd';rr(tx-3,y-46,6,36,2);ctx.fill();ctx.fillStyle=['#b5483a','#2f6b4f','#e2b04a'][i];rr(tx-5,y-64,10,22,3);ctx.fill();}
  // a bowl of peanuts that somebody has been counting
  ctx.fillStyle='#e9e2cf';ctx.beginPath();ctx.moveTo(268,y-14);ctx.lineTo(322,y-14);ctx.lineTo(312,y);ctx.lineTo(278,y);ctx.closePath();ctx.fill();
  ctx.fillStyle='#c79a5b';for(i=0;i<b.peanuts;i++){ctx.beginPath();ctx.ellipse(276+(i%5)*9+(i>4?4:0),y-17-(i>4?5:0),5,3.2,0.4,0,Math.PI*2);ctx.fill();}
  if(b.glass)glass(g.human.x+52,'ginger');
  if(b.lagers){glass(b.sx-34,'lager');glass(b.sx-14,'lager');}
  bartender();
}
function bartender(){
  var b=G.bar,x=b.tx,bob=RM?0:Math.sin(G.time*2)*1.5,y=H+6;
  ctx.fillStyle='#17111a';
  ctx.beginPath();ctx.ellipse(x,y+22,120,76,0,0,Math.PI*2);ctx.fill();
  rr(x-21,y-80+bob,42,44,10);ctx.fill();
  circ(x,y-104+bob,44);ctx.fill();circ(x-44,y-98+bob,9);ctx.fill();circ(x+44,y-98+bob,9);ctx.fill();circ(x+6,y-150+bob,15);ctx.fill();
  ctx.save();ctx.translate(x-80,y-34);ctx.rotate(-0.28);ctx.fillStyle='#e9e2cf';rr(-13,-8,26,52,5);ctx.fill();ctx.strokeStyle='#c9553f';ctx.lineWidth=2;line(-13,2,13,2);ctx.restore();
  if(b.polish&&Math.abs(b.tx-b.tT)<1){
    var px=x+98,py=y-58+(RM?0:Math.sin(G.time*8)*3);
    ctx.fillStyle='rgba(232,240,240,.45)';rr(px-9,py-14,18,28,3);ctx.fill();ctx.fillStyle='#e9e2cf';circ(px+4,py+(RM?0:Math.cos(G.time*8)*8),9);ctx.fill();
    ctx.strokeStyle='#17111a';ctx.lineWidth=16;ctx.lineCap='round';line(x+70,y-10,px,py+12);
  }
}
// Ekskyysmi's drink is the shadow of a drink. The umbrella is its own idea.
function shadowDrink(q){
  var g=G;if(!g.bar||!g.bar.sdrink)return;var h=g.morko.h[0],k=Math.max(0.8,Math.sqrt(q.s)),x=h.x,y=h.y;
  ctx.save();ctx.translate(x,y);ctx.scale(k,k);
  ctx.fillStyle=mcol();ctx.beginPath();ctx.moveTo(-11,-30);ctx.lineTo(11,-30);ctx.lineTo(8,4);ctx.lineTo(-8,4);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(233,226,207,.55)';ctx.lineWidth=1.3;ctx.stroke();
  ctx.strokeStyle=mcol();ctx.lineWidth=2.5;ctx.lineCap='round';line(2,-26,10,-46);
  ctx.restore();
  // Borrow the existing cocktail umbrella. The glass stays in the other hand.
  var u=g.bar.umbrella,other=g.morko.h[1],ux=(x-10*k)*(1-u)+(other.x-28*k)*u,uy=(y-50*k)*(1-u)+(other.y-22*k)*u;
  ctx.save();ctx.translate(ux,uy);ctx.scale(k,k);
  ctx.strokeStyle='#e9e2cf';ctx.lineWidth=1.5;line(6*(1-u)+28*u,22,0,0);
  ctx.fillStyle='#e0563e';ctx.beginPath();ctx.moveTo(-14,2);ctx.quadraticCurveTo(0,-16,14,2);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#fbf8ef';ctx.lineWidth=1.5;line(0,-7,-7,2);line(0,-7,7,2);
  ctx.restore();
}

/* ---------- Lab: A quiet drink. ---------- */
function labBar(){return labScene({set:'bar',title:'A quiet drink.',plan:'Order one drink.',clock:18*3600+12*60}).concat([
  barSetup,{wait:3.9},
  ['N','An evening. Sanna is running five minutes late. You are at the bar, on your own, on purpose.'],
  ['S','Position: acceptable. Wall behind us. Eyes on the door. Now we wait to be noticed.'],
  ['H','I’ll just order.'],
  addTic('…seven, eight, nine peanuts.',296,BARY-48,{life:2.6}),
  {wait:2.4},
  function(){G.clock+=120;},
  ['N','Two minutes pass. The bartender polishes a glass. It was already clean.'],
  ['S','He hasn’t looked at us once.'],
  lensPeek(function(){return {x:G.bar.tx,y:BARY-46};},'BARTENDER: POLISHING. OR AVOIDING. OR POLISHING.'),
  function(){var b=G.bar;b.sT=700;},{wait:2.4},
  function(){G.bar.polish=false;},
  ['T','Evening! What can I get you?'],
  ['X','Two lagers, thanks.'],
  function(){var b=G.bar;b.lagers=true;sfx('clink');},
  hit(0.6,'P'),{wait:1.2},
  ['S','She arrived AFTER us. He served her FIRST.'],
  ['S','We are furniture. We are a coat stand with opinions.'],
  function(){var b=G.bar;b.lagers=false;b.sFace=1;b.sT=1040;},
  {choice:[
    {t:'Raise one finger. Lower. No. Lower.',then:[['S','Too eager. Now too casual. Now you’re testing the wind.'],['H','I’m ordering a drink, not landing a plane.']]},
    {t:'Hold the bank card where he can see it.',then:[['S','Visible, but not waving. We’re solvent, not desperate.'],['H','My arm is tired.'],['S','Solvency is a marathon.']]},
    {t:'Leave. Find a bar where nobody saw this.',then:[['H','Sanna is meeting me HERE.'],['S','She can meet us in the new life.']]}
  ]},
  function(){var b=G.bar;b.tT=610;},{wait:1.6},calm,
  ['T','Sorry, didn’t see you there! What’ll it be?'],
  set({mood:'surprised'}),
  ['S','“Didn’t see you.” So we ARE invisible. I’d like that confirmed in writing.'],
  ['H','He was changing a barrel.'],
  ['H','A ginger beer, please.'],
  ['T','What?'],
  hit(0.75,'P'),{wait:1.3},
  ['S','“WHAT.” He heard the order. And he HATED it.'],
  {choice:[
    {t:'Change the order to something impressive.',then:[['S','Something with a year on it. People respect years.'],['H','I’m not ordering a whisky to impress a man with a towel.']]},
    {t:'Say it again, quieter. He can’t hate it twice.',then:[['H','…ginger beer.'],['T','Sorry?'],['S','TWICE. He’s making us say it twice. It’s a ritual.']]},
    {t:'Retract the order. We were never thirsty.',then:[['S','Tell him it was a joke. “Ginger beer.” Ha. Imagine.'],['H','I’m thirsty.']]}
  ]},
  ['H','GINGER BEER.'],
  ['T','Ginger beer! Good choice. Ice?']
 ],outside({title:'WHAT THE BARTENDER HEARD',dur:'duration: 6 seconds',cap:'Loud music. A quiet customer. “What?” meant “what”.',anim:'text'}),[
  calm,function(){var b=G.bar;b.glass=true;b.tT=820;sfx('clink');},{wait:1.2},
  function(){G.bar.polish=true;},
  ['S','He said “good choice”.'],
  ['H','He says that to everyone.'],
  ['S','Let me have this one.'],
  ['S','…I’ll have one too.'],
  ['H','You’re a shadow.'],
  ['S','Then I’ll have the shadow of one.'],
  function(){var g=G;g.bar.sdrink=true;g.morko.pose='drink';sfx('card');},{wait:1.2},
  ['H','Yours has an umbrella.'],
  shelterOn,{wait:0.8},
  ['S','For cover.'],
  shelterOff,{wait:0.5},
  function(){G.morko.pose='sip';},{wait:0.9},function(){sfx('drip');},{wait:0.7},function(){G.morko.pose='drink';G.morko.mood='care';},
  ['S','…Oh. That’s quite nice.'],
  ['S','Is this it? Standing here. With a drink.'],
  ['H','This is it.'],
  ['S','Nobody is looking at us.'],
  ['H','No.'],
  ['S','I always thought that was the bad outcome.'],
  {wait:1.4},
  function(){var g=G;g.cowA=true;g.ax=1040;g.axT=570;g.aFace=-1;g.clock+=15*60;},{wait:3.3},
  ['A','Sorry I’m late! Have you been waiting ages?'],
  {choice:[
    {t:'“No, just got here.” (Seventeen minutes.)',then:[['H','Seventeen minutes. I counted.'],['A','Ha! Of course you did. Next one’s on me.']]},
    {t:'“It’s FINE.” With the face.',then:[['H','It was fine, actually. I had a drink. So did he.'],['A','Who?'],['H','Long story.']]},
    {t:'Tell her the truth: it was nice.',then:[['H','A bit. It was nice, though.'],['A','Good. I’ll get the next one.'],['S','Don’t tell her about the umbrella.']]}
  ]},
  function(){G.morko.pose='toast';},{wait:0.8},
  ['S','To being furniture.'],
  function(){G.morko.pose='drink';}
 ]);}
// ---- src/54-voice.js ----
/* ================= Lab: The voice message. Fourteen takes of “hi”. ================= */
function take(n,line,verdict){return [
  function(){G.rec={take:n,on:true,t:0};addLived('takes, deleted',n>3?40:4);sfx('pick');},
  ['H',line],
  function(){G.rec.on=false;sfx('nope');},
  ['S',verdict]
];}
function drawRec(){
  var r=G.rec,x=24+HUDL,y=22,w=250,i;
  ctx.fillStyle='rgba(14,12,20,.78)';rr(x-10,y-12,w+20,44,8);ctx.fill();
  ctx.font='800 12px system-ui,sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
  var blink=r.on&&(RM||Math.floor(G.time*2.5)%2===0);
  ctx.fillStyle=r.on?'#e0563e':'#8b8070';if(blink||!r.on){circ(x+5,y,5);ctx.fill();}
  ctx.fillText((r.on?'REC':'DELETED')+' · TAKE '+r.take,x+18,y);
  for(i=0;i<34;i++){var a=r.on?(RM?0.5:Math.abs(Math.sin(G.time*9+i*1.7))*0.5+Math.abs(Math.sin(G.time*3.1+i*0.6))*0.5):0.08;
    ctx.fillStyle=r.on?'#e9e2cf':'#5a5560';ctx.fillRect(x+i*7.4,y+17-a*7,4,2+a*14);}
}
function labVoice(){return labScene({set:'home',title:'The voice message',plan:'Reply to a voice message.',clock:19*3600+40*60}).concat([
  ['N','Sanna has sent a voice message. Forty seconds. Cheerful. It ends with “anyway, how are you?”'],
  ['H','I’ll just send one back.'],
  set({mood:'alert',s:1.3}),
  ['S','A voice message. Your actual voice. Recorded. Kept.']
 ],take(1,'“Hi! It’s me.”','She knows it’s you. It says your name on it. Delete.'),
  take(2,'“Hey Sanna, thanks for your message—”','“Thanks for your message.” Are you her bank? Delete.'),[
  {choice:[
    {t:'Sound more relaxed. Rehearse relaxing.',then:take(3,'“Heyyy.”','Too relaxed. You sounded like you were lying down. Delete.')},
    {t:'Write a script first. Two drafts.',then:take(3,'“Dear Sanna.”','You read the greeting out loud. Delete.')},
    {t:'Open with a laugh. People like a laugh.',then:take(3,'“Ha— hi.”','That wasn’t a laugh. That was a hiccup with ambitions. Delete.')}
  ]},
  function(){G.rec={take:9,on:true,t:0};G.clock+=11*60;},
  ['N','Take nine. Halfway through, a dog barks next door.'],
  function(){G.rec.on=false;sfx('nope');},
  ['S','Now she’ll think we have a dog. We’d have to GET a dog. Delete.'],
  function(){G.rec={take:14,on:false,t:0};G.clock+=9*60;},
  ['H','This is take fourteen.'],
  ['S','Fifteen is the one. I can feel it.'],
  ['H','Her message has a kettle boiling in it. She says “um” six times.'],
  set({mood:'surprised'}),
  ['S','…Six?'],
  ['H','I counted. On the second listen.'],
  ['S','And on the first?'],
  ['H','On the first I just thought: oh, nice. It’s Sanna.'],
  {wait:1.3},
  set({mood:'worry',s:1.1}),
  {choice:[
    {t:'Send take one. The one with “It’s me.”',then:[['P','You: ● voice message, 0:04']]},
    {t:'Send take fourteen. The one with the sigh.',then:[['P','You: ● voice message, 0:11'],['S','The sigh stays in? Bold.']]},
    {t:'Send a thumbs-up and move to the countryside.',then:[['H','No.'],['P','You: ● voice message, 0:09']]}
  ]},
  function(){G.rec=null;},
  {wait:1.2},
  ['P','Sanna: “Ha, lovely to hear your voice! Lunch tomorrow?”']
 ],outside({title:'WHAT SANNA HEARD',dur:'duration: a few seconds, at 1.5× speed',cap:'A friend saying hi. She was making tea.',anim:'text'}),[
  calm,
  ['S','One and a half times speed.'],
  ['H','Everyone does.'],
  ['S','Fourteen takes. And she listened to it FAST.'],
  ['H','Next time, one take.'],
  ['S','Two. One for safety.']
 ]);}
// ---- src/55-reply.js ----
/* ================= Lab: The reply. Ekskyysmi edits a message until nothing in it can be rejected. ================= */
// The draft is a row of pieces. Cutting a piece strikes it through, then it fades and the rest closes up.
var DRAFT0=[['hey','Hey!'],['i','I had a'],['really','really'],['nice','nice time'],['thu','on Thursday.'],['again','We should do it again'],['soon','soon'],['smiley',':)']];
function draftOpen(){G.draft={tokens:DRAFT0.map(function(d){return {id:d[0],t:d[1],on:true,k:0};}),sent:null,reply:null,t:0};sfx('card');}
function draftCut(ids){return function(){addLived('edits, for safety',10);var D=G.draft;D.tokens.forEach(function(k){if(ids.indexOf(k.id)>=0&&k.on){k.on=false;k.k=0;}});sfx('nope');};}
function draftSwap(id,text){return function(){var D=G.draft;D.tokens.forEach(function(k){if(k.id===id){k.t=text;k.flash=1;}});sfx('pick');};}
function draftRestore(extra){return function(){var D=G.draft;D.tokens=DRAFT0.map(function(d){return {id:d[0],t:d[0]==='really'&&extra?'really really':d[1],on:true,k:0,flash:1};});sfx('good');};}
function draftText(){var D=G.draft,o=[];D.tokens.forEach(function(k){if(k.on)o.push(k.t);});return o.join(' ')||'…';}
function draftSend(){var D=G.draft;D.sent=draftText();sfx('pick');}
function stepDraft(dt){var D=G.draft;if(!D)return;D.t+=dt;D.tokens.forEach(function(k){if(!k.on&&k.k<1)k.k=Math.min(1,k.k+dt/0.9);if(k.flash>0)k.flash=Math.max(0,k.flash-dt*1.2);});}
function drawDraft(){
  var D=G.draft,x=592,y=COMPACT?86:74,w=316,h=COMPACT?284:372,i; // on a phone the words run along the bottom, so the handset is shorter
  ctx.fillStyle='#0f1216';rr(x-8,y-8,w+16,h+16,30);ctx.fill();ctx.fillStyle='#eef0ea';rr(x,y,w,h,22);ctx.fill();
  ctx.fillStyle='#dfe3da';rr(x,y,w,46,22);ctx.fill();ctx.fillRect(x,y+24,w,22);
  ctx.fillStyle='#62887f';circ(x+30,y+23,13);ctx.fill();ctx.fillStyle='#2b2733';ctx.textAlign='left';ctx.textBaseline='middle';ctx.font='700 16px system-ui,sans-serif';ctx.fillText('Sanna',x+52,y+23);
  // her message
  ctx.font='500 14px system-ui,sans-serif';var hers=wrap('Thursday was so fun!! You’re annoyingly good at that game.',210),by=y+60;
  ctx.fillStyle='#ffffff';rr(x+12,by,236,hers.length*19+14,12);ctx.fill();ctx.fillStyle='#2b2733';for(i=0;i<hers.length;i++)ctx.fillText(hers[i],x+24,by+16+i*19);
  by+=hers.length*19+26;
  if(D.sent){
    var mine=wrap(D.sent,210),mh=mine.length*19+14;ctx.fillStyle='#62887f';rr(x+w-248,by,236,mh,12);ctx.fill();ctx.fillStyle='#fbf8ef';for(i=0;i<mine.length;i++)ctx.fillText(mine[i],x+w-236,by+16+i*19);
    by+=mh+12;
    if(D.reply){var rep=wrap(D.reply,210);ctx.fillStyle='#ffffff';rr(x+12,by,236,rep.length*19+14,12);ctx.fill();ctx.fillStyle='#2b2733';for(i=0;i<rep.length;i++)ctx.fillText(rep[i],x+24,by+16+i*19);}
    return;
  }
  // the draft box
  var bx=x+12,bw=w-24,bh=COMPACT?124:150,top=y+h-bh-12;
  ctx.fillStyle='#ffffff';ctx.strokeStyle='#62887f';ctx.lineWidth=2;rr(bx,top,bw,bh,14);ctx.fill();ctx.stroke();
  ctx.font='700 10px system-ui,sans-serif';ctx.fillStyle='#8b9a8c';ctx.fillText('DRAFT',bx+12,top+14);
  ctx.font='500 17px system-ui,sans-serif';var cx=bx+12,cy=top+40,sp=ctx.measureText(' ').width;
  D.tokens.forEach(function(k){
    var a=k.on?1:clamp(1-(k.k-0.45)/0.55,0,1);if(a<=0)return;
    var tw=ctx.measureText(k.t).width;if(cx+tw>bx+bw-12){cx=bx+12;cy+=26;}
    if(k.flash>0){ctx.fillStyle='rgba(235,189,121,'+(0.6*k.flash)+')';rr(cx-3,cy-12,tw+6,24,5);ctx.fill();}
    ctx.globalAlpha=a;ctx.fillStyle='#2b2733';ctx.fillText(k.t,cx,cy);
    if(!k.on){ctx.strokeStyle='#c9553f';ctx.lineWidth=2.5;line(cx-2,cy,cx-2+(tw+4)*clamp(k.k/0.35,0,1),cy);}
    ctx.globalAlpha=1;cx+=tw+sp;
  });
  if(RM||Math.floor(G.time*2)%2===0){ctx.fillStyle='#62887f';ctx.fillRect(cx,cy-10,2,20);}
  ctx.fillStyle='#62887f';circ(bx+bw-24,top+bh-24,15);ctx.fill();ctx.strokeStyle='#fbf8ef';ctx.lineWidth=3;ctx.lineCap='round';line(bx+bw-24,top+bh-17,bx+bw-24,top+bh-31);line(bx+bw-24,top+bh-31,bx+bw-30,top+bh-25);line(bx+bw-24,top+bh-31,bx+bw-18,top+bh-25);
}
function labReply(){return labScene({set:'home',title:'The reply',plan:'Answer one message.',clock:21*3600+5*60}).concat([
  function(){var g=G;g.human.x=g.human.xT=330;},
  ['N','Sanna has written: “Thursday was so fun!! You’re annoyingly good at that game.”'],
  ['H','I’ll just answer.'],
  draftOpen,{wait:1.2},
  ['H','“Hey! I had a really nice time on Thursday. We should do it again soon.” Smiley.'],
  set({mood:'alert',s:1.3}),
  ['S','Before we send that. A few small edits. For safety.'],
  // In the story this comes after the job description changed: a relapse, and it knows.
  function(){return G.jobDone?[['H','New job description. Remember?'],['S','This is the OLD job. I’m working out my notice.'],['H','How long is the notice?'],['S','Unclear. I wrote the contract.']]:[];},
  {choice:[
    {t:'Cut “really”. Nobody needs to know how nice.',f:draftCut(['really']),then:[['S','A nice time. Measured. Like a person with other nice times.'],['H','It was really nice.'],['S','That’s between us.']]},
    {t:'Cut the smiley. We are not a smiley household.',f:draftCut(['smiley']),then:[['S','A smiley is a face you can’t take back.']]},
    {t:'Cut “Hey!”. Too much knocking.',f:draftCut(['hey']),then:[['S','We don’t announce ourselves. We arrive.'],['H','It’s a greeting.'],['S','It’s a doorbell with an exclamation mark.']]}
  ]},
  {choice:[
    {t:'Cut “We should do it again”. Presumptuous.',f:draftCut(['again','soon']),then:[['S','What if she doesn’t want an again? Now there’s an again on the table and she has to walk around it.']]},
    {t:'Change “soon” to “sometime”.',f:draftSwap('soon','sometime'),then:[['H','You hate “sometime”.'],['S','When OTHER people say it.']]},
    {t:'Cut “on Thursday”. She knows which day she was at.',f:draftCut(['thu']),then:[['S','Dates are evidence.']]}
  ]},
  {choice:[
    {t:'Cut “nice time”. Nice for HER? Unverified.',f:draftCut(['nice']),then:[['S','We can’t make claims about the time. We can only confirm that time occurred.']]},
    {t:'Cut everything after the first full stop.',f:draftCut(['again','soon','smiley']),then:[['S','One sentence. Fewer sentences, fewer openings.']]},
    {t:'Replace the lot with “ok”.',f:function(){var D=G.draft;D.tokens=[{id:'ok',t:'ok',on:true,k:0,flash:1}];sfx('nope');},then:[['S','“ok”. Two letters. Impregnable.'],['H','You once spent a whole evening on what “ok” meant.'],['S','Which is how I know it works.']]}
  ]},
  {wait:0.8},
  function(){return [['H','“'+draftText()+'”']];},
  ['S','Perfect. Nothing in it can be rejected.'],
  ['H','There’s nothing in it.'],
  ['S','That’s what I said.'],
  {choice:[
    {t:'Send it like this. It’s safe.',f:function(){G.replySent='edited';},then:[draftSend,{wait:1.4},function(){G.draft.reply='…is this a riddle? Thursday was GREAT. Again next week?';sfx('good');},{wait:1.6},['S','She decoded it.'],['H','She shouldn’t have had to.']]},
    {t:'Fine. Put it back. All of it.',f:function(){G.replySent='full';},then:[draftRestore(false),{wait:1.0},['S','Even the smiley?'],['H','Especially the smiley.'],draftSend,{wait:1.4},function(){G.draft.reply='SAME!! Next Thursday? I’ll bring the good crisps.';sfx('good');},{wait:1.6},['S','Two exclamation marks. Unprompted.']]},
    {t:'Put it back. And add a second “really”.',f:function(){G.replySent='more';},then:[draftRestore(true),{wait:1.0},['H','That’s… more than I wrote.'],['S','I know. Send it before I see it.'],draftSend,{wait:1.4},function(){G.draft.reply='really really SAME. Next Thursday?';sfx('good');},{wait:1.6},['S','I regret nothing. I regret a little.']]}
  ]}
 ],outside({title:'WHAT SANNA READ',dur:'duration: 3 seconds',cap:'A message from a friend. She smiled at her phone on the bus.',anim:'text'}),[
  calm,
  ['S','Forty minutes of editing.'],
  ['H','Three seconds of reading.'],
  ['S','That seems inefficient.'],
  ['H','That’s what I keep saying.'],
  function(){G.draft=null;}
 ]);}
// ---- src/56-library.js ----
/* ================= Lab: A fine. The overdue book goes back. ================= */
var LIBR={body:'#7b8f5a',hair:'#d9d2c4'};
function library(){
  var g=G,i,j,cols=['#b5483a','#2f6b4f','#e2b04a','#55657a','#8a4f6a','#c9c2b0','#62887f'];
  ctx.fillStyle='#e6dcc6';ctx.fillRect(-20,-20,W+40,WALLY+20);
  ctx.fillStyle='#b9a98a';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);ctx.fillStyle='#9a8b6e';ctx.fillRect(-20,WALLY-6,W+40,6);
  // shelves: three bays of books
  for(j=0;j<3;j++){var sx=40+j*190;ctx.fillStyle='#6b4a34';rr(sx,70,170,WALLY-76,4);ctx.fill();
    for(var r=0;r<4;r++){var sy=84+r*74;ctx.fillStyle='#4f3626';ctx.fillRect(sx+8,sy,154,62);
      var bx=sx+11;for(i=0;bx<sx+154;i++){var bw=9+((i*7+j*5+r*3)%4)*3,bh=42+((i*5+r*7+j)%4)*5;if(bx+bw>sx+160)break;ctx.fillStyle=cols[(i*3+j+r*2)%cols.length];ctx.fillRect(bx,sy+62-bh,bw,bh);bx+=bw+2;}}}
  // window and a sign nobody needs
  ctx.fillStyle='#f4eedb';rr(640,90,150,120,4);ctx.fill();ctx.fillStyle='#a9c0c4';ctx.fillRect(648,98,134,104);ctx.strokeStyle='#f4eedb';ctx.lineWidth=6;line(715,98,715,202);
  ctx.fillStyle='#2f6b4f';rr(820,110,110,44,6);ctx.fill();ctx.fillStyle='#fbf8ef';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 13px system-ui,sans-serif';ctx.fillText('QUIET,',875,124);ctx.fillText('PLEASE',875,141);
  // the librarian stands behind her desk
  var L=g.lib||{};
  person(760,{body:LIBR.body,hair:LIBR.hair,facing:-1,face:L.smile?'smile':'neutral'});
  ctx.fillStyle='#7a5236';rr(650,366,290,14,4);ctx.fill();ctx.fillStyle='#5c3b27';ctx.fillRect(656,380,278,FEETY-374);
  ctx.strokeStyle='#4a2f1f';ctx.lineWidth=2;line(726,386,726,FEETY+4);line(796,386,796,FEETY+4);line(866,386,866,FEETY+4);
  ctx.fillStyle='#2b2733';rr(836,322,62,44,5);ctx.fill();ctx.fillStyle='#9fd3a8';ctx.fillRect(842,328,50,30);ctx.fillStyle='#2b2733';ctx.fillRect(862,366,10,4);
  ctx.fillStyle='#fbf8ef';rr(676,340,54,26,3);ctx.fill();ctx.fillStyle='#5a6559';ctx.font='700 9px system-ui,sans-serif';ctx.fillText('RETURNS',703,353);
  if(L.book){ctx.fillStyle='#55657a';rr(742,354,46,12,2);ctx.fill();ctx.fillStyle='#e2b04a';ctx.fillRect(748,357,20,3);}
}
function labLibrary(){return labScene({set:'library',title:'A fine.',plan:'Return one book. 23 days late.',clock:15*3600+40*60}).concat([
  function(){var g=G;g.lib={book:false,smile:false};g.noCup=true;g.human.x=-40;g.human.xT=420;},{wait:3.8},
  ['N','The library. “A Short History of Lighthouses” is twenty-three days overdue. Today it goes back.'],
  set({mood:'alert',s:1.3}),
  ['S','She’s seen us. Walk normally. Not like that. Like a person who returns things.'],
  ['H','I finished it this morning.'],
  ['S','Twenty-three days. She has had twenty-three days to form an opinion.'],
  {choice:[
    {t:'Use the returns slot and run.',then:[['H','The slot is for people who aren’t standing in front of her.'],['S','Then stand somewhere else.']]},
    {t:'Prepare a statement.',then:[['S','“I take full responsibility. The lighthouses were compelling.”'],['H','I’m not reading a statement to a librarian.']]},
    {t:'Blame page 212.',then:[['H','It WAS page 212.'],['S','Then we have a defence.']]}
  ]},
  function(){G.human.xT=575;},{wait:1.5},
  function(){G.lib.book=true;sfx('clink');},
  ['L','Hello! Returning?'],
  ['H','Yes. It’s… a bit late.'],
  ['L','Let’s see. Twenty-three days. That’ll be a fine.'],
  set({mood:'care',s:1.05}),
  ['S','She says it’s FINE.'],
  ['S','Three weeks of dread, and it’s FINE. I’d like to sit down.'],
  ['H','A fine. Four euros sixty.'],
  hit(0.5,'P'),{wait:1.1},
  ['S','…Oh. THAT kind of fine.'],
  ['S','She is fining us. In public. In front of the large-print section.'],
  calm,
  ['L','Did you like it?'],
  lensPeek({x:760,y:FEETY-150},'FACE: CURIOUS. SUSPICIOUSLY CURIOUS.'),
  set({mood:'alert',s:1.3}),
  ['S','It’s a trap. If we liked it, why did we keep it? If we didn’t, why did we KEEP it?'],
  {choice:[
    {t:'Say “it was fine.”',then:[['H','I’m not saying “fine” in here again.']]},
    {t:'Say nothing. Nod. Leave.',then:[['H','She asked a question.'],['S','Questions are optional.']]},
    {t:'Deny having read it.',then:[['H','For twenty-three days?'],['S','We were looking at the cover. Thoroughly.']]}
  ]},
  ['H','There’s a lighthouse on page 212. I didn’t want to give it back before I’d met it.'],
  {wait:1.2},
  function(){G.lib.smile=true;},
  ['L','Bengtskär! Page 212 is the best page. I kept that book for six weeks.'],
  set({mood:'surprised'}),
  ['S','…SHE kept it for six weeks?'],
  ['L','I work here. I just kept renewing it to myself.'],
  ['S','That’s corruption.'],
  ['H','That’s a recommendation.'],
  ['L','There’s a second volume. More lighthouses. Shall I put you down for it?'],
  ['H','Yes, please.']
 ],outside({title:'WHAT THE LIBRARIAN SAW',dur:'duration: 2 minutes',cap:'A late book, four euros sixty, and somebody else who likes lighthouses.',anim:'text'}),[
  calm,
  ['S','We came in for a telling-off. We’re leaving with a second volume.'],
  ['H','And a due date.'],
  ['S','Twenty-eight days. I’ll start worrying on day twenty-nine.'],
  ['H','Day one.'],
  ['S','…Day one.']
 ]);}
// ---- src/57-posting.js ----
/* ================= The posting: withdrawal, filed as success ================= */
// A rejection that cannot happen because nothing was sent. Ekskyysmi counts this as a perfect record.
// The player still only chooses Ekskyysmi's tactics; the third one is the one where it asks.
function said(){G.nothings=(G.nothings||0)+1;}   // every "it's nothing" the human says this week, for the receipt

function labPosting(){return labScene({set:'home',title:'The posting.',plan:'Read a job posting. Only read it.',clock:22*3600+47*60}).concat([
  ['N','Late. The sofa. A job posting someone forwarded with “this is SO you”.'],
  ['P','Content designer. Small team. Four-day weeks. A library across the street.'],
  ['H','Huh.'],
  ['H','That is… actually me.'],
  set({mood:'alert',s:1.3}),
  ['S','Let’s not be hasty.'],
  ['P','Requirements: excellent communication skills. Attention to detail. Applications by Friday.'],
  ['S','“Excellent.” Not “good”. Excellent.'],
  lensPeek(function(){return {x:G.human.x+22,y:FEETY-100};},'REQUIREMENT: “EXCELLENT”. WE ARE “FINE”.'),
  archive('bad',[['2019','Applied. Heard nothing. Still checking.'],['2021','“We went with someone with more experience.”'],['2023','Got the interview. Said “you too” to “enjoy your weekend”.']]),
  ['S','I’ve pulled the relevant files.'],
  ['H','They’re not relevant. They’re just old.'],
  ['S','Old AND relevant. Very rare. Very valuable.'],
  closeArchive,
  {choice:[
    {t:'Archive it. For safety.',f:function(){G.posting='archived';},then:[
      ['S','Done. Filed under “later”.'],
      ['N','The “later” drawer does not close properly. It has not closed properly for years.'],
      ['H','I hadn’t decided anything.'],
      ['S','I decided for both of us. It’s quicker.']]},
    {t:'Pre-write their rejection. Save everyone time.',f:function(){G.posting='rejected';},then:[
      ['P','Draft: “Dear applicant. Thank you for your interest. You are too long.”'],
      ['H','They haven’t read anything.'],
      ['S','Neither have I. That’s how confident I am.'],
      ['H','You wrote a rejection. To me. From them.'],
      ['S','In their voice. I did research.']]},
    {t:'…Ask what the human wants.',f:function(){G.posting='open';},then:[
      set({mood:'surprised',s:1.05}),
      ['S','What do you… want?'],
      ['H','I want to read it again tomorrow.'],
      ['S','Tomorrow is very far away.'],
      ['H','It’s eleven hours.'],
      ['S','Eleven hours unsupervised. With a TAB open.'],
      ['H','You can supervise. Just don’t close it.']]}
  ]},
  function(){if(G.posting!=='open')addLived('the application, not sent',45);
    return outside({title:'WHAT ACTUALLY HAPPENED',dur:'0 applications',anim:'text',
      cap:G.posting==='open'?'Nobody rejected you tonight. The tab is still open.':'Nobody rejected you tonight. Nobody got the chance.'});},
  calm,
  function(){return G.posting==='open'?[
    ['S','For the record, it’s looking at us.'],
    ['H','It’s a tab.'],
    ['S','A tab with a deadline.'],
    ['H','Friday.'],
    ['S','I know when Friday is. I have a countdown.']
  ]:[
    ['S','Applications sent: zero. Rejections: zero.'],
    ['S','Success rate: one hundred percent.'],
    ['H','Of nothing.'],
    ['S','…It’s still a hundred percent.']
  ];}
]);}

// Friday, after lunch is agreed: the posting comes back, whatever drawer it went into.
function postingPayoff(){
  var p=G.posting;
  if(p==='open')return [
    ['H','And tonight I’m sending that application.'],
    set({mood:'alert'}),
    ['S','I’ll pre-write their—'],
    ['H','You can draft. I’ll send.'],
    set({mood:'calm'}),
    ['S','…Deal. A small one.']
  ];
  if(p)return [
    ['H','And I’m taking that posting out of the drawer.'],
    set({mood:'surprised'}),
    ['S','It’s been filed.'],
    ['H','Then unfile it.'],
    ['S','There’s no form for that.'],
    ['H','Make one.'],
    set({mood:'calm'}),
    ['S','…Draft one. Small. Applications close today.']
  ];
  return [];
}

// Rows the whole-story receipt adds when these moments happened.
function storyRows(){
  var g=G,rows=[];
  if(g.rehearsal)rows.push(['“not now”, rehearsed','3 h 10 min'],['“not now”, actual','4 s']);
  if(g.posting&&g.posting!=='open')rows.push(['applications sent','0'],['rejections avoided','1'],['success rate','100 %']);
  if(g.posting==='open')rows.push(['applications','pending']);
  if(g.quiet)rows.push(['one quiet Monday, lived','1.0 days']);
  if(g.nothings)rows.push(['“it’s nothing”, said','×'+g.nothings]);
  return rows;
}
// ---- src/58-stamp.js ----
/* ================= paperwork: a declaration, not a verdict from the game ================= */
// Monday: a stamp on the human. Friday: the same tool, held above them, then put away.
function startStamp(mode){
  var h=G.morko.h[1];G.stamp={mode:mode,t:0,ink:false,retiring:false,from:{x:h.x,y:h.y}};
}
function stampHover(){startStamp('hover');}
function stampPutAway(){
  var s=G.stamp;if(!s)return;
  var h=G.morko.h[1];s.retiring=true;s.t=0;s.from={x:h.x,y:h.y};
}
function stampToolVisible(){var s=G.stamp;return !!s&&(s.mode==='hover'||s.t<1.35);}
function stampHand(q){
  var s=G.stamp,x=G.human.x,y=FEETY-118;
  var raised={x:x-62,y:y-62},down={x:x,y:y},home={x:q.bx+q.shW*0.9+8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};
  function between(a,b,p){p=clamp(p,0,1);p=p*p*(3-2*p);return {x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p};}
  if(s.retiring)return RM?home:between(s.from,home,s.t/0.55);
  if(s.mode==='hover')return RM?raised:between(s.from,raised,s.t/0.35);
  if(RM)return s.t<0.55?raised:s.t<0.75?down:home;
  if(s.t<0.35)return between(s.from,raised,s.t/0.35);
  if(s.t<0.55)return between(raised,down,(s.t-0.35)/0.2);
  if(s.t<0.75)return down;
  return between(down,home,(s.t-0.75)/0.6);
}
function stepStamp(dt){
  var s=G.stamp;if(!s)return;s.t+=dt;
  if(s.retiring){if(s.t>=0.55)G.stamp=null;return;}
  if(s.mode==='press'){
    if(!s.ink&&s.t>=0.55){s.ink=true;sfx('stamp');}
    if(s.t>=3.8)G.stamp=null;
  }
}
function drawStamp(){
  var s=G.stamp;if(!s)return;
  if(s.ink){
    var age=s.t-0.55,scale=RM?1:1+0.08*clamp(1-age/0.16,0,1);
    // Low enough that the face still shows under it: the joke is the face, not the paperwork.
    ctx.save();ctx.translate(G.human.x+6,FEETY-74);ctx.rotate(-0.1);ctx.scale(scale,scale);
    ctx.globalAlpha=clamp((3.8-s.t)/0.7,0,1);
    // Oversized, slightly crooked office ink. It never appears in the outside view.
    ctx.fillStyle='rgba(246,241,228,.84)';rr(-91,-29,182,58,3);ctx.fill();
    ctx.strokeStyle='#a53739';ctx.fillStyle='#a53739';ctx.lineWidth=3;rr(-86,-24,172,48,2);ctx.stroke();
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='800 11px system-ui,sans-serif';ctx.fillText('REJECTION',0,-12);
    ctx.font='900 23px system-ui,sans-serif';ctx.fillText('PREVENTED',0,9);
    ctx.restore();
  }
  if(!stampToolVisible())return;
  var h=G.morko.h[1];ctx.save();ctx.translate(h.x,h.y);
  ctx.globalAlpha=s.retiring?clamp(1-s.t/0.55,0,1):s.mode==='press'&&s.t>1?clamp((1.35-s.t)/0.35,0,1):1;
  ctx.fillStyle='#5c3435';ctx.strokeStyle='#e6c99d';ctx.lineWidth=1.5;
  rr(-7,-4,14,32,4);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.ellipse(0,-4,18,11,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#9a5b43';rr(-45,24,90,12,3);ctx.fill();ctx.stroke();
  ctx.fillStyle='#3b2531';rr(-41,36,82,5,1);ctx.fill();
  ctx.restore();
}
// ---- src/59-toss.js ----
/* ================= letting go: one card, dragged and dropped. The only thing in the game you throw away. ================= */
// Drag the card and release it, and it flies. Tap instead, and Ekskyysmi has to be talked into it: two excuses, then it opens its hand.
function tossStart(o){
  var q=geom();G.toss={x:q.bx-64,y:WALLY-118,vx:0,vy:0,st:'held',taps:0,t:0,o:o,trail:[],rot:-0.1,hx:q.bx-64,hy:WALLY-118,bounces:0,moved:0};
  G.lines=[];G.band=null;G.cur={who:'S',text:''};G.morko.mood='worry';WAIT='toss';LOCK=0.3;render();
}
function tossText(){var t=G.toss,o=t.o;return t.st==='drag'?o.drag:t.st==='held'?(t.taps?o.say[t.taps-1]:o.ask):t.st==='fly'?'…':o.done;}
function tossRefresh(){var t=G.toss;if(!t)return;var tx=tossText();if(tx!==t.shown){t.shown=tx;var p=elLine.querySelector('p');if(p)p.textContent=tx;}}
function tossRelease(vx,vy){var t=G.toss;t.st='fly';t.vx=clamp(vx,-900,900);t.vy=clamp(vy,-1100,700);G.morko.mood='surprised';sfx('pick');tossRefresh();}
function tossTap(){
  var t=G.toss;if(!t||t.st!=='held'||paused)return;
  t.taps++;if(t.taps>t.o.say.length){tossRelease(-50,-40);return;}
  sfx('nope');G.morko.wobble={t:0};tossRefresh();
}
function tossDown(e){
  var t=G.toss;if(WAIT!=='toss'||!t||t.st!=='held'||paused||LOCK>0)return;
  var p=lensPoint(e);t.st='drag';t.trail=[{x:p.x,y:p.y,at:Date.now()}];t.moved=0;t.downAt=Date.now();
  try{cv.setPointerCapture(e.pointerId);}catch(_){}
  tossRefresh();
}
function tossMove(e){
  var t=G.toss;if(!t||t.st!=='drag')return;var p=lensPoint(e),l=t.trail[t.trail.length-1];
  t.moved+=Math.abs(p.x-l.x)+Math.abs(p.y-l.y);t.x=clamp(p.x,30,W-30);t.y=clamp(p.y,30,FEETY+10);
  t.trail.push({x:p.x,y:p.y,at:Date.now()});if(t.trail.length>6)t.trail.shift();
}
function tossUp(){
  var t=G.toss;if(!t||t.st!=='drag')return;
  if(t.moved<12){t.st='held';t.x=t.hx;t.y=t.hy;if(Date.now()-t.downAt<400)tossTap();else tossRefresh();return;}
  var a=t.trail[0],b=t.trail[t.trail.length-1],dt=Math.max(0.03,(b.at-a.at)/1000);
  tossRelease((b.x-a.x)/dt,(b.y-a.y)/dt);
}
function tossCancel(){var t=G.toss;if(t&&t.st==='drag'){t.st='held';t.x=t.hx;t.y=t.hy;tossRefresh();}}
function stepToss(dt){
  var t=G.toss;if(!t)return;t.t+=dt;
  if(t.st==='fly'){
    var floor=FEETY+22;t.vy+=1500*dt;t.x+=t.vx*dt;t.y+=t.vy*dt;t.rot+=t.vx*0.006*dt;
    if(t.x<34){t.x=34;t.vx=Math.abs(t.vx)*0.5;}if(t.x>W-34){t.x=W-34;t.vx=-Math.abs(t.vx)*0.5;}
    if(t.y<24){t.y=24;t.vy=Math.abs(t.vy)*0.4;}
    if(t.y>=floor){t.y=floor;t.bounces++;if(t.bounces<4&&Math.abs(t.vy)>170){t.vy=-t.vy*0.34;t.vx*=0.55;sfx('drip');}
      else{t.st='rest';t.t=0;t.rot=Math.round(t.rot/Math.PI)*Math.PI+0.07;sfx('clink');G.morko.mood='surprised';tossRefresh();}}
  }else if(t.st==='rest'&&t.t>1.1){
    G.dropped={x:t.x,y:t.y,rot:t.rot,tag:t.o.tag,sub:t.o.sub};G.toss=null;WAIT=null;run();
  }
}
function tossCard(x,y,rot,tag,sub,a){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a==null?1:a;
  ctx.fillStyle='rgba(20,17,29,.25)';rr(-33,-19,70,44,4);ctx.fill();
  ctx.fillStyle='#f6f1e4';ctx.strokeStyle='#8b8070';ctx.lineWidth=1.5;rr(-36,-23,72,44,4);ctx.fill();ctx.stroke();
  ctx.fillStyle='#c9553f';ctx.fillRect(-36,-23,72,6);
  ctx.fillStyle='#2b2733';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='800 15px system-ui,sans-serif';ctx.fillText(tag,0,-4);
  ctx.font='600 8.5px system-ui,sans-serif';ctx.fillStyle='#5a5560';ctx.fillText(sub,0,11);
  ctx.restore();
}
function drawToss(){
  var g=G,t=g.toss,d=g.dropped;
  if(d)tossCard(d.x,d.y,d.rot,d.tag,d.sub);
  if(!t)return;
  var j=t.st==='held'&&!RM?Math.sin(g.time*38)*1.2:0;
  if(t.st==='held'||t.st==='drag'){ // a dotted outline where it used to be, and a nudge
    if(t.st==='drag'){ctx.save();ctx.setLineDash([5,5]);ctx.strokeStyle='#2b273366';ctx.lineWidth=2;ctx.translate(t.hx,t.hy);ctx.rotate(-0.1);rr(-36,-23,72,44,4);ctx.stroke();ctx.restore();}
    else if(!t.taps&&t.t>1.4){ctx.save();ctx.globalAlpha=RM?0.8:0.5+0.3*Math.sin(g.time*4);ctx.font='700 12px system-ui,sans-serif';ctx.textAlign='center';ctx.fillStyle='#2b2733';ctx.fillText('drag me · or tap',t.hx,t.hy+40);ctx.restore();}
  }
  tossCard(t.x+j,t.y,t.st==='drag'?0.04:t.rot,t.o.tag,t.o.sub);
}
cv.addEventListener('pointerdown',tossDown);cv.addEventListener('pointermove',tossMove);
window.addEventListener('pointerup',tossUp);window.addEventListener('pointercancel',tossCancel);window.addEventListener('blur',tossCancel);
// ---- src/60-update.js ----
/* ================= update ================= */
function lampBase(){
  var hw=G.w.x,sw=0,off=0,s=0;
  for(var i=0;i<LAMPS.length;i++){var d=LAMPS[i]-hw,wt=1/(d*d+900);sw+=wt;off+=wt*clamp(-d*0.55,-150,150);s+=wt*Math.min(1.1,Math.abs(d)/220*0.9);}
  return{s:s/sw,off:off/sw};
}
function updHands(dt){
  var q=geom(),ht=handTargets(q),M=G.morko,k=stampToolVisible()||RM&&(M.coat||M.wobble||(G.bar&&G.bar.sdrink))?1:Math.min(1,10*dt);
  M.h[0].x+=(ht.a.x-M.h[0].x)*k;M.h[0].y+=(ht.a.y-M.h[0].y)*k;
  M.h[1].x+=(ht.b.x-M.h[1].x)*k;M.h[1].y+=(ht.b.y-M.h[1].y)*k;
}
function update(dt,elapsed){
  // Reading/input delays follow elapsed time even when the browser draws fewer frames.
  elapsed=elapsed==null?dt:elapsed;
  var g=G,M=g.morko,Hm=g.human;g.time+=dt;LOCK=Math.max(0,LOCK-elapsed);
  if(M.coat){var coat=M.coat;coat.p=RM?(coat.buttons?1:0):approach(coat.p,coat.buttons?1:0,dt*1.7);if(coat.blink>=0)coat.blink+=dt;}
  if(M.wobble)M.wobble.t=Math.min(3.2,M.wobble.t+dt);
  if(G.cur&&G.cur.big&&WAIT==='click'){var bb=bigBox(G.cur.text,RM?1e9:Math.floor(G.curT*55));M.sT=clamp((WALLY-(BIGTOP+bb.h)-40)/170,0.42,1.15);if(RM)M.s=M.sT;if(bb.lines.length>3)M.mood='scared';}
  if(WAIT==='time'){TIMER-=elapsed;if(TIMER<=0)run();}
  else if(WAIT==='view'&&TIMER>0){TIMER-=elapsed;if(TIMER<=0)render();}
  g.clock+=dt*g.rate;
  g.ax=approach(g.ax,g.axT,150*dt);g.bx2=approach(g.bx2,g.bxT,150*dt);
  if(!g.w){Hm.x=approach(Hm.x,Hm.xT,125*dt);if(Hm.xT<0&&Hm.x<-40)Hm.gone=true;}
  Hm.flinch=Math.max(0,Hm.flinch-dt*0.7);
  g.gaze=ease(g.gaze,g.gazeT,6*dt);g.dark=ease(g.dark,g.darkT,3*dt);g.flash=Math.max(0,g.flash-dt*2.2);
  g.curT=(g.curT||0)+elapsed;
  Hm.sweat=ease(Hm.sweat,Hm.sweatT,1.5*dt);Hm.blush=Math.max(0,Hm.blush-dt*0.1);
  if(Hm.sweat>0.7)Hm.puddle=Math.min(1,Hm.puddle+dt*0.06);
  if(g.rep)g.rep.t+=dt;
  for(var ci=g.cards.length-1;ci>=0;ci--){g.cards[ci].t+=dt;if(g.cards[ci].life!=null&&g.cards[ci].t>g.cards[ci].life)g.cards.splice(ci,1);}
  g.pulse=Math.max(0,g.pulse-dt*0.3);g.shake=Math.max(0,g.shake-dt*2.6);
  if(g.zoom)g.zoom.t+=dt;
  stepLens(dt);stepBar(dt);stepDraft(dt);stepQte(dt);stepJolt(dt);stepStamp(dt);stepToss(dt);stepAuto(dt);if(g.buzz>0)g.buzz=Math.max(0,g.buzz-dt);
  var hk=(g.planText||'')+'|'+g.jobDone+'|'+g.hud+'|'+g.chapter+'|'+g.lab+'|'+g.yes+'|'+(g.w?1:0);if(hk!==g.hudKey){g.hudKey=hk;g.hudAge=0;}g.hudAge=(g.hudAge||0)+dt;
  stepTics(dt);if(g.dish)g.dish.t+=dt;carTics();if(g.smileT>0){g.smileT-=dt;if(g.smileT<=0&&g.human.face==='smile')g.human.face='neutral';}
  if(WAIT==='fight'&&g.fight&&!paused)stepFight(elapsed);
  if(WAIT==='hold'&&g.hold){
    var hh=g.hold,hon=hh.on||hh.tap>0;hh.tap=Math.max(0,hh.tap-elapsed);if(hh.on)hh.p+=elapsed;holdStep(hh,hon,elapsed);
    if(g.hold===hh){
      var hf=document.getElementById('holdfill');if(hf&&hf.style)hf.style.width=Math.round(clamp(hh.p/hh.secs,0,1)*100)+'%';
      var tx=holdText();if(tx!==hh.shown){hh.shown=tx;var pp=elLine.querySelector('p');if(pp)pp.textContent=tx;}
      if(hh.p>=hh.secs)finishHold();
    }
  }
  if(g.card>0)g.card-=dt;if(g.job)g.job.t+=elapsed;if(g.chap)g.chap.t+=dt;if(g.bigNote)g.bigNote.t+=dt;if(g.fade>0)g.fade=Math.max(0,g.fade-dt*(g.fadeRate||1.6));Hm.sip=ease(Hm.sip||0,Hm.sipT||0,8*dt);M.wake=ease(M.wake==null?1:M.wake,M.asleep?0:M.dim!=null?M.dim:1,2.6*dt);if(g.anx>0.3)g.anx=Math.max(0.3,g.anx-0.06*dt);g.zShow=ease(g.zShow,g.zT,2*dt);g.yShow=ease(g.yShow||0,g.yT||0,2*dt);g.wShow=ease(g.wShow||0,g.wT||0,2*dt);if(g.wDrop)g.wDrop.t+=dt;g.yx=approach(g.yx||0,g.yxT||0,(RM?400:75)*dt);if(g.out)g.out.t+=dt;if(g.pop){g.pop.t+=dt;if(g.pop.t>2.6)g.pop=null;}
  var base=M.sT,offT=-70-(M.s-1)*12;
  if(g.w){var lb=lampBase();base=M.sT+lb.s;offT=lb.off-(M.sT-1)*45;g.w.x=approach(g.w.x,g.w.xT,g.w.speed*dt);g.walking=g.w.x<g.w.xT-0.5&&g.w.speed>0;}
  if(M.st==='free'||M.st==='pokka')M.s=approach(M.s,base,(M.s<base?1.5:1.1)*dt);
  else if(M.st==='hide')M.s=ease(M.s,1.25,5*dt);
  M.off=ease(M.off,M.st==='hide'?0:offT,6*dt);
  updHands(dt);
  // When the two of them trade short lines, the camera leans in a little. It lets go at the first long sentence.
  var bk=g.w||g.out||g.lens||g.draft||g.bar||M.asleep?0:clamp(((g.bick||0)-2)/4,0,1),tz=g.cz+(M.st==='frozen'?0.02:0)+0.075*bk;if(RM)tz=1+(tz-1)*0.4;
  C.z=ease(C.z,tz,(bk?1.4:2.5)*dt);C.fx=ease(C.fx,g.cx+(Hm.x-70-g.cx)*0.8*bk,2.5*dt);C.fy=ease(C.fy,g.cy+(300-g.cy)*0.8*bk,2.5*dt);
}
// ---- src/70-draw.js ----
/* ================= drawing helpers ================= */
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
function circ(x,y,r){ctx.beginPath();ctx.arc(x,y,Math.max(0.1,r),0,Math.PI*2);}
function line(x1,y1,x2,y2){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}
function wrap(text,maxW){var words=text.split(' '),lines=[],cur='';for(var i=0;i<words.length;i++){var t=cur?cur+' '+words[i]:words[i];if(cur&&ctx.measureText(t).width>maxW){lines.push(cur);cur=words[i];}else cur=t;}if(cur)lines.push(cur);return lines;}
// A word in capitals is a word said louder: heavier, a touch bigger, and in Ekskyysmi's bubbles in the accent colour.
function isLoud(w){return /[A-Z]{2}/.test(w)&&!/[a-z]/.test(w);}
function bubbleK(o){return o&&o.loud?1.34:o&&o.quiet?0.72:1;}
function bubble(x,y,text,o){
  o=o||{};
  var k=bubbleK(o),fs=17*k,lh=22*k,base='600 '+fs+'px system-ui,sans-serif',em='800 '+(fs+1.5*k)+'px system-ui,sans-serif',i,j;
  ctx.font=base;ctx.textAlign='left';ctx.textBaseline='middle';
  var lines=wrap(text,(o.maxW||250)*(k>1?1.22:1)),w=0,words=[],widths=[];
  for(i=0;i<lines.length;i++){var ws=lines[i].split(' '),lw=0,wd=[];
    for(j=0;j<ws.length;j++){ctx.font=isLoud(ws[j])?em:base;var m=ctx.measureText(ws[j]+(j<ws.length-1?' ':'')).width;wd.push(m);lw+=m;}
    words.push(ws);widths.push(wd);w=Math.max(w,lw);}
  w+=26;var h=lines.length*lh+16,bx=clamp(x-w/2,8,W-w-8),by=o.top!=null?o.top:Math.max(8,y-h-12);
  var fill=o.dark?'#14111d':'#fffdf6',ink=o.dark?'#f6f1e4':'#2b2733',hot=o.dark?'#ebbd79':'#2b2733';
  ctx.fillStyle=fill;ctx.strokeStyle=ink;ctx.lineWidth=k>1?3:2;rr(bx,by,w,h,10);ctx.fill();ctx.stroke();
  if(!o.noTail){var tx=clamp(x,bx+16,bx+w-16);ctx.beginPath();ctx.moveTo(tx-8,by+h-1);ctx.lineTo(tx,by+h+10);ctx.lineTo(tx+8,by+h-1);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.moveTo(tx-8,by+h);ctx.lineTo(tx,by+h+10);ctx.lineTo(tx+8,by+h);ctx.stroke();}
  var left=o.reveal==null?1e9:o.reveal;
  for(i=0;i<lines.length&&left>0;i++){var cx=bx+13,cy=by+8+lh/2+i*lh;
    for(j=0;j<words[i].length&&left>0;j++){var wj=words[i][j],ld=isLoud(wj);ctx.font=ld?em:base;ctx.fillStyle=ld?hot:ink;
      ctx.fillText(wj.slice(0,left),cx,cy);cx+=widths[i][j];left-=wj.length+1;}
  }
}
// A bubble that grows as it is typed, until it is the biggest thing in the room. Its author did not expect that.
var BIGW=600,BIGX=22,BIGTOP=12;   // left of the HUD rows, over the window
function bigBox(text,reveal){ctx.font='700 24px system-ui,sans-serif';var lines=wrap(text.slice(0,Math.max(1,reveal)),BIGW-44);return {lines:lines,h:lines.length*31+24};}
function bigBubble(text,reveal){
  var b=bigBox(text,reveal),bx=BIGX,i;
  ctx.textAlign='left';ctx.textBaseline='middle';
  ctx.fillStyle='#14111d';ctx.strokeStyle='#f6f1e4';ctx.lineWidth=2.5;rr(bx,BIGTOP,BIGW,b.h,12);ctx.fill();ctx.stroke();
  ctx.fillStyle='#f6f1e4';for(i=0;i<b.lines.length;i++)ctx.fillText(b.lines[i],bx+22,BIGTOP+12+16+i*31);
}
function bubbleH(text,maxW,o){var k=bubbleK(o);ctx.font='600 '+(17*k)+'px system-ui,sans-serif';return wrap(text,maxW*(k>1?1.22:1)).length*22*k+16;}
function band(text,y){
  ctx.font='500 18px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  var lines=wrap(text,820),h=lines.length*24+16;
  ctx.fillStyle='rgba(22,19,30,.84)';rr(W/2-440,y-h,880,h,10);ctx.fill();
  ctx.fillStyle='#f1ebdd';for(var i=0;i<lines.length;i++)ctx.fillText(lines[i],W/2,y-h+8+12+i*24);
}
function applyCamera(){
  var z=C.z,hw=W/(2*z),hh=H/(2*z),sx=0,sy=0;
  if(!RM){sx=Math.sin(G.time*0.45)*5+Math.sin(G.time*83)*8*G.shake;sy=Math.sin(G.time*0.9)*2.6+Math.cos(G.time*71)*6*G.shake;}
  var fx=clamp(C.fx+sx,hw,W-hw),fy=clamp(C.fy+sy,hh,H-hh);
  ctx.translate(W/2,H/2);ctx.scale(z,z);ctx.translate(-fx,-fy);
}

/* ================= drawing: break room ================= */
function room(flat){
  ctx.fillStyle=flat?'#d8d9cc':'#dce0cd';ctx.fillRect(-20,-20,W+40,WALLY+20);
  if(!flat){var gr=ctx.createRadialGradient(640,345,10,640,345,420);gr.addColorStop(0,'rgba(255,228,150,.6)');gr.addColorStop(1,'rgba(255,228,150,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,W,WALLY);}
  ctx.fillStyle=flat?'#b1b5a3':'#b8bda7';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);
  ctx.fillStyle='#899887';ctx.fillRect(-20,WALLY-6,W+40,6);
  ctx.strokeStyle='#697e7018';ctx.lineWidth=1;for(var f=0;f<8;f++)line(0,405+f*24,W,405+f*24);
  ctx.fillStyle='#f4eedb';rr(689,99,170,146,4);ctx.fill();ctx.fillStyle='#94ada7';ctx.fillRect(697,107,154,130);
  ctx.fillStyle='#b5c6b7';ctx.beginPath();ctx.moveTo(697,201);ctx.lineTo(740,162);ctx.lineTo(790,205);ctx.lineTo(823,177);ctx.lineTo(851,198);ctx.lineTo(851,237);ctx.lineTo(697,237);ctx.fill();
  ctx.strokeStyle='#f4eedb';ctx.lineWidth=6;line(774,107,774,237);line(697,172,851,172);
  ctx.fillStyle='#f4eedb';rr(682,239,184,9,3);ctx.fill();
  ctx.fillStyle='#64816a';ctx.beginPath();ctx.ellipse(67,323,13,31,-.4,0,Math.PI*2);ctx.ellipse(93,301,14,35,.3,0,Math.PI*2);ctx.ellipse(109,330,11,27,.7,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#557260';ctx.lineWidth=3;line(88,365,91,293);line(88,350,67,316);line(88,352,110,325);
  ctx.fillStyle='#c78d71';ctx.beginPath();ctx.moveTo(64,348);ctx.lineTo(111,348);ctx.lineTo(103,389);ctx.lineTo(72,389);ctx.closePath();ctx.fill();
  ctx.fillStyle='#b08a5a';rr(140,150,150,104,4);ctx.fill();
  ctx.fillStyle='#f6f1e4';ctx.fillRect(152,162,46,58);ctx.fillRect(206,166,34,40);ctx.fillRect(246,160,34,50);ctx.fillRect(208,214,60,30);
  ctx.strokeStyle='#9c958a';ctx.lineWidth=1.5;for(var i=0;i<5;i++)line(157,172+i*9,192,172+i*9);
  ctx.fillStyle='#5a6559';ctx.font='600 9px "DM Sans",sans-serif';ctx.textAlign='center';ctx.fillText('BE A MUG.',237,226);ctx.fillText('NOT A HERO.',237,237);
  ctx.fillStyle='#c9553f';circ(175,164,3);ctx.fill();circ(223,168,3);ctx.fill();circ(263,162,3);ctx.fill();
  var cx=560,cy=92;ctx.fillStyle='#fbf8ef';ctx.strokeStyle='#2b2733';ctx.lineWidth=3;circ(cx,cy,27);ctx.fill();ctx.stroke();
  var s=G.clock,sa=(s%60)/60*Math.PI*2,ma=((s/60)%60)/60*Math.PI*2,ha=((s/3600)%12)/12*Math.PI*2;
  ctx.lineCap='round';ctx.lineWidth=3;line(cx,cy,cx+Math.sin(ha)*13,cy-Math.cos(ha)*13);
  ctx.lineWidth=2;line(cx,cy,cx+Math.sin(ma)*20,cy-Math.cos(ma)*20);
  ctx.strokeStyle='#c9553f';ctx.lineWidth=1.5;line(cx,cy,cx+Math.sin(sa)*22,cy-Math.cos(sa)*22);
  ctx.fillStyle=flat?'#8c9092':'#7d8a8c';ctx.fillRect(728,322,252,WALLY-322);
  ctx.fillStyle=flat?'#74787a':'#667274';ctx.fillRect(728,316,252,8);
  ctx.fillStyle='#34323c';rr(872,262,52,56,5);ctx.fill();ctx.fillStyle='#c9553f';circ(912,274,3);ctx.fill();
  ctx.fillStyle='#fbf8ef';ctx.fillRect(748,302,12,14);ctx.fillRect(766,302,12,14);
  ctx.strokeStyle='#fbf8ef';ctx.lineWidth=2;ctx.beginPath();ctx.arc(760,309,4,-Math.PI/2,Math.PI/2);ctx.stroke();
  ctx.beginPath();if(G.mugFixed===false)ctx.arc(766,309,4,Math.PI/2,Math.PI*1.5);else ctx.arc(778,309,4,-Math.PI/2,Math.PI/2);ctx.stroke();
  ctx.fillStyle='#6b563e';ctx.fillRect(604,420,72,8);ctx.fillRect(610,428,6,40);ctx.fillRect(664,428,6,40);
  ctx.strokeStyle='#3d3a44';ctx.lineWidth=4;line(640,420,640,366);
  ctx.fillStyle=flat?'#d9c79a':'#f3d27a';ctx.beginPath();ctx.moveTo(624,340);ctx.lineTo(656,340);ctx.lineTo(666,368);ctx.lineTo(614,368);ctx.closePath();ctx.fill();
  if(G.cupLeft){ctx.fillStyle='#fffdf6';ctx.strokeStyle='#2b2733';ctx.lineWidth=1.5;rr(650,406,12,14,2);ctx.fill();ctx.stroke();}
}

/* ================= drawing: people ================= */
function person(x,o){
  var f=o.facing||1,fl=o.flinch||0,top=FEETY-118-fl*5,lg=o.walk?Math.sin(G.time*8)*6:0;
  ctx.save();if(o.alpha!=null)ctx.globalAlpha=o.alpha;
  if(o.shadow!==0){ctx.fillStyle='rgba(20,16,30,'+(0.2*(o.shadow==null?1:o.shadow))+')';ctx.beginPath();ctx.ellipse(x,FEETY+2,30,7,0,0,Math.PI*2);ctx.fill();}
  if(o.puddle>0.02){ctx.fillStyle='rgba(150,205,230,.55)';ctx.beginPath();ctx.ellipse(x+6,FEETY+5,20+o.puddle*70,4+o.puddle*7,0,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle='#3a3944';rr(x-15+lg,FEETY-54,12,54,4);ctx.fill();rr(x+3-lg,FEETY-54,12,54,4);ctx.fill();
  var skin=o.body===SANNA.body?'#c9957a':o.body===MIKA.body?'#e5c4a1':'#e4bba2';
  ctx.fillStyle='#263639';rr(x-19+lg,FEETY-8,20,10,4);ctx.fill();rr(x+1-lg,FEETY-8,23,10,4);ctx.fill();
  ctx.fillStyle=skin;rr(x-7,top-14,14,23,4);ctx.fill();
  ctx.fillStyle=o.body;ctx.strokeStyle='#34413e';ctx.lineWidth=1.6;rr(x-25,top,50,76+fl*5,13);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#fff4db55';ctx.lineWidth=2;line(x-17,top+64,x+17,top+64);line(x-9,top+5,x+9,top+5);
  ctx.strokeStyle=o.body;ctx.lineWidth=10;line(x-f*18,top+17,x-f*28,top+61);
  ctx.fillStyle=skin;circ(x-f*28,top+64,5);ctx.fill();
  var hy=FEETY-150+(o.nod||0)*5+fl*3+(o.down?4:0)-(o.walk?Math.abs(Math.sin(G.time*8))*1.5:0),hx=x+(o.back?0:f*2);
  if(o.body===SANNA.body){ctx.fillStyle=o.hair;rr(hx-23,hy-17,45,45,18);ctx.fill();ctx.fillStyle=skin;rr(x-7,top-15,14,19,4);ctx.fill();}
  ctx.fillStyle=skin;ctx.strokeStyle='#34413e';ctx.lineWidth=1.8;circ(hx,hy,21);ctx.fill();ctx.stroke();
  circ(hx-f*20,hy+3,5);ctx.fill();ctx.stroke();
  ctx.fillStyle=o.hair;
  if(o.back){circ(hx,hy,22);ctx.fill();}
  else{
    ctx.beginPath();ctx.moveTo(hx-21,hy);ctx.bezierCurveTo(hx-30,hy-31,hx+11,hy-31,hx+22,hy-8);ctx.lineTo(hx+8,hy-13);ctx.quadraticCurveTo(hx+2,hy-2,hx-10,hy-7);ctx.lineTo(hx-16,hy+2);ctx.closePath();ctx.fill();
    if(o.body===MIKA.body){circ(hx-8,hy-21,7);ctx.fill();circ(hx+2,hy-22,8);ctx.fill();}
    var ey=hy+2+(o.down?4:0),ex=hx+f*5,er=2+fl*1.6+(o.face==='stiff'?1.2:0);
    ctx.fillStyle='#2b2733';
    if(o.down){ctx.lineWidth=2;line(ex-8,ey,ex-4,ey+1);line(ex+4,ey+1,ex+8,ey);}
    else if(!RM&&Math.sin(G.time*.8+x)>0.997){line(ex-8,ey,ex-4,ey);line(ex+4,ey,ex+8,ey);}
    else{circ(ex-6,ey,er);ctx.fill();circ(ex+6,ey,er);ctx.fill();}
    ctx.strokeStyle='#34413e';ctx.lineWidth=1.2;
    if(o.brow){ctx.strokeStyle='#34413e';ctx.lineWidth=2.2;line(ex+1,ey-8,ex+10,ey-14);line(ex-11,ey-8,ex-3,ey-8);}
    if(o.body===MIKA.body){circ(ex-7,ey,6);ctx.stroke();circ(ex+7,ey,6);ctx.stroke();line(ex-1,ey,ex+1,ey);}
    line(ex+1,ey+3,ex+3,ey+6);
    ctx.fillStyle='#c77f7055';circ(ex-13,ey+6,4);ctx.fill();circ(ex+13,ey+6,4);ctx.fill();
    ctx.lineWidth=2;ctx.lineCap='round';
    if(o.grin>0){
      // A smile that is working too hard: wider with every yes, teeth showing, corners trembling.
      var gw=Math.min(12,6+o.grin*1.6),gd=Math.min(9,5+o.grin),cy0=ey+8,tr=RM?0:Math.sin(G.time*30)*0.6*Math.min(1,o.grin/3);
      ctx.fillStyle='#fffdf6';ctx.strokeStyle='#34413e';ctx.lineWidth=1.6;
      ctx.beginPath();ctx.moveTo(ex-gw,cy0-1+tr);ctx.quadraticCurveTo(ex,cy0+gd*1.6,ex+gw,cy0-1-tr);ctx.quadraticCurveTo(ex,cy0+2,ex-gw,cy0-1+tr);ctx.closePath();ctx.fill();ctx.stroke();
      if(o.grin>=2){ctx.lineWidth=1.2;line(ex-gw-1,cy0-4,ex-gw-3,cy0+1);line(ex+gw+1,cy0-4,ex+gw+3,cy0+1);}
    }
    else if(o.face==='smile'){ctx.beginPath();ctx.arc(ex,ey+5,5,0.15*Math.PI,0.85*Math.PI);ctx.stroke();}
    else if(o.face==='stiff'){line(ex-6,ey+9,ex+6,ey+9);}
    else if(o.face==='frown'){ctx.beginPath();ctx.arc(ex,ey+14,6,1.15*Math.PI,1.85*Math.PI);ctx.stroke();line(ex-11,ey-9,ex-3,ey-6);line(ex+11,ey-9,ex+3,ey-6);}
    else line(ex-3,ey+9,ex+3,ey+9);
  }
  if(o.blush>0.05){
    // The face goes hot. Past ~0.8 the whole head glows like a bulb and lets off steam.
    var bl=o.blush;ctx.fillStyle='rgba(222,70,60,'+Math.min(0.62,bl*0.55)+')';circ(hx,hy,21);ctx.fill();
    if(bl>0.8&&!RM){ctx.strokeStyle='rgba(240,236,226,'+((bl-0.8)*4)+')';ctx.lineWidth=2;for(var st=-1;st<=1;st++){var sy0=hy-30-((G.time*30+st*9)%22);ctx.beginPath();ctx.moveTo(hx+st*10,sy0);ctx.quadraticCurveTo(hx+st*10+5,sy0-6,hx+st*10,sy0-12);ctx.stroke();}}
  }
  if(o.sweat>0.08){
    var nd=Math.ceil(o.sweat*4);ctx.fillStyle='#bfe3f2';ctx.strokeStyle='#5d8fa6';ctx.lineWidth=1.2;
    for(var di=0;di<nd;di++){var ph=((G.time*(0.7+di*0.13)+di*0.37)%1),dx=hx+(di%2?1:-1)*(12+di*3),dy=hy-12+ph*(28+o.sweat*40),ds=3+o.sweat*3;
      ctx.beginPath();ctx.moveTo(dx,dy-ds*1.6);ctx.quadraticCurveTo(dx+ds,dy,dx,dy+ds);ctx.quadraticCurveTo(dx-ds,dy,dx,dy-ds*1.6);ctx.fill();ctx.stroke();}
  }
  ctx.strokeStyle=o.body;ctx.lineWidth=9;ctx.lineCap='round';
  if(o.phone){o.cup=false;var pj=o.buzz>0&&!RM?Math.sin(G.time*70)*2.6*Math.min(1,o.buzz*2):0,phx=x+f*24+pj,phy=top+22;
    line(x+f*15,top+18,phx-f*3,phy+12);
    ctx.save();ctx.translate(phx,phy);ctx.rotate(f*0.18+pj*0.03);ctx.fillStyle='#14111d';rr(-7,-13,14,26,3);ctx.fill();ctx.fillStyle=o.buzz>0?'#dff3e4':'#9fb6c9';rr(-5,-10,10,19,1.5);ctx.fill();ctx.restore();
    if(o.buzz>0.15&&!RM){ctx.strokeStyle='rgba(20,17,29,.55)';ctx.lineWidth=2;ctx.lineCap='round';for(var bz=0;bz<2;bz++){var br=17+bz*6;ctx.beginPath();ctx.arc(phx,phy,br,-0.5,0.5);ctx.stroke();ctx.beginPath();ctx.arc(phx,phy,br,Math.PI-0.5,Math.PI+0.5);ctx.stroke();}}
    ctx.strokeStyle=o.body;ctx.lineWidth=9;ctx.lineCap='round';}
  if(o.cup){var cxp=x+f*22,cyp=top+40-(o.sip||0)*30+(o.shake?Math.sin(G.time*38)*1.5:0);
    line(x+f*15,top+18,cxp-f*3,cyp+4);
    ctx.fillStyle='#fffdf6';ctx.strokeStyle='#2b2733';ctx.lineWidth=1.5;rr(cxp-6,cyp-7,12,14,2);ctx.fill();ctx.stroke();}
  if(o.wave){ctx.strokeStyle=o.body;ctx.lineWidth=9;var wy=top-26+Math.sin(G.time*11)*4;line(x+f*17,top+14,x+f*30,wy);
    ctx.fillStyle='#f4ecdd';ctx.strokeStyle='#2b2733';ctx.lineWidth=1.5;circ(x+f*31,wy-5,6);ctx.fill();ctx.stroke();}
  ctx.restore();
}
var SANNA={body:'#62887f',hair:'#463b38'},MIKA={body:'#ac8277',hair:'#895e41'};
function drawHuman(extra){
  var Hm=G.human,o={body:'#c98f2e',hair:'#4a3b32',facing:Hm.facing||1,cup:!G.cupLeft&&!G.w&&!G.noCup,phone:!G.w&&!Hm.gone&&((G.phoneN||0)>0||WAIT==='fight'||!!(G.draft&&!G.draft.sent)),buzz:G.buzz||0,sip:Hm.sip||0,flinch:Hm.flinch,face:Hm.face,back:Hm.back,sweat:Hm.sweat,blush:Hm.blush,grin:Hm.grin,puddle:Hm.puddle};
  if(o.face==='down')o.down=true;
  if(!G.w&&Math.abs(Hm.x-Hm.xT)>1){o.walk=true;if(!Hm.back)o.facing=Hm.xT>Hm.x?1:-1;}   // nobody walks backwards
  var wk=G.morko.wake;if(wk!=null&&wk<0.98)o.shadow=wk;          // the floor shadow IS Ekskyysmi: never two
  if(extra)for(var k in extra)o[k]=extra[k];
  if(Hm.pose==='floor'){   // sitting on the floor, legs out
    var f=o.facing||1;o.walk=false;o.cup=false;o.shadow=0;
    ctx.fillStyle='rgba(20,16,30,.2)';ctx.beginPath();ctx.ellipse(Hm.x+f*22,FEETY+3,58,8,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#3a3944';rr(f>0?Hm.x-4:Hm.x-62,FEETY-13,66,13,5);ctx.fill();ctx.fillStyle='#263639';rr(f>0?Hm.x+56:Hm.x-72,FEETY-20,14,20,4);ctx.fill();
    ctx.save();ctx.beginPath();ctx.rect(-40,-40,W+80,FEETY-6+40);ctx.clip();ctx.translate(0,46);person(Hm.x,o);ctx.restore();
    return;
  }
  person(Hm.x,o);
}
function drawCoworkers(alpha){
  var g=G;
  var lf=g.lensView?'frown':undefined;
  if(g.cowA)person(g.ax,{body:SANNA.body,hair:SANNA.hair,facing:Math.abs(g.ax-g.axT)>1?(g.axT>g.ax?1:-1):g.aFace,face:lf,wave:g.aWave,alpha:alpha,walk:Math.abs(g.ax-g.axT)>1,sweat:g.aSweat});
  if(g.cowB)person(g.bx2,{body:MIKA.body,hair:MIKA.hair,facing:Math.abs(g.bx2-g.bxT)>1?(g.bxT>g.bx2?1:-1):g.bFace,face:lf,alpha:alpha,cup:Math.abs(g.bx2-g.bxT)<1&&g.bxT<1000,walk:Math.abs(g.bx2-g.bxT)>1});
  if(g.cowR)person(g.rx,{body:RIITTA.body,hair:RIITTA.hair,facing:-1,alpha:alpha,brow:g.rBrow});
}

/* ================= drawing: the shadow ================= */
function geom(){
  var M=G.morko,s=M.s,j=M.coat?0:(RM?0.3:1)*clamp(((G.anx||0)-0.3)/0.6,0,1);
  var bx=G.human.x+M.off+Math.sin(G.time*47)*1.7*j,by=WALLY;
  var baseX=bx,lean=M.wobble?(RM?8:Math.sin(M.wobble.t*4.2)*16*(1-M.wobble.t/3.2)):0;bx+=lean;
  var hgt=190*s*(RM||M.coat?1:1+0.012*Math.sin(G.time*1.7)),shW=58*s,hdR=20*Math.pow(s,0.45);
  var shY=by-hgt*0.7+Math.sin(G.time*31)*1.3*j,hdY=shY-11*s-hdR*0.8;
  if(hdY<hdR+34)hdY=hdR+34;if(shY<hdY+hdR*0.7)shY=hdY+hdR*0.7;
  return{bx:bx,baseX:baseX,lean:lean,by:by,shY:shY,shW:shW,hdY:hdY,hdR:hdR,s:s};
}
function handTargets(q){
  var M=G.morko,Hm=G.human,hy=FEETY-150;
  var L={x:q.bx-q.shW*0.9,y:q.shY},R={x:q.bx+q.shW*0.9,y:q.shY},a,b,front=false;
  var pose=M.st==='frozen'?'grow':M.st==='hide'?'hold':M.st==='pokka'?null:M.pose;
  if(stampToolVisible())pose='stamp';
  switch(pose){
    case 'stamp':a={x:L.x-8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};b=stampHand(q);front=true;break;
    case 'grow':a={x:L.x-q.shW*0.9,y:q.shY-34*q.s};b={x:R.x+q.shW*0.9,y:q.shY-34*q.s};break;
    case 'cover':a={x:Hm.x-7,y:hy+2};b={x:Hm.x+11,y:hy+2};front=true;break;
    case 'pull':a={x:Hm.x+24,y:FEETY-96};b={x:Hm.x+22,y:FEETY-72};front=true;break;
    case 'hold':a={x:Hm.x-24,y:FEETY-112};b={x:Hm.x+24,y:FEETY-112};front=true;break;
    case 'comfort':a={x:L.x-6,y:q.shY+85*q.s};b={x:Hm.x+25,y:FEETY-106};front=true;break;
    case 'lens':if(G.lens){var lh=lensHandle();a={x:L.x-8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};b={x:lh.x2,y:lh.y2};front=true;break;}a={x:L.x,y:q.shY+60};b={x:R.x,y:q.shY+60};break;
    case 'swat':if(G.fight&&G.fight.swat){a={x:L.x-8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};b={x:G.fight.swat.x,y:G.fight.swat.y};front=true;break;}a={x:L.x,y:q.shY+60};b={x:R.x,y:q.shY+60};break;
    case 'drink':a={x:L.x-q.shW*0.45,y:q.shY+62*q.s};b={x:R.x+8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};break;
    case 'sip':a={x:q.bx-q.hdR*0.75,y:q.hdY+q.hdR*1.5};b={x:R.x+8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};break;
    case 'toast':a={x:L.x-q.shW*0.8,y:q.shY-34*q.s};b={x:R.x+8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};break;
    case 'shelter':var uk=Math.max(0.8,Math.sqrt(q.s));a={x:L.x-q.shW*0.45,y:q.shY+62*q.s};b={x:q.bx+28*uk,y:q.hdY-q.hdR-4*uk};break;
    case 'coat':a={x:q.bx-32*q.s,y:q.by-28*q.s};b={x:q.bx+32*q.s,y:q.by-28*q.s};break;
    case 'puppet':a={x:R.x+74*q.s,y:q.shY-64*q.s};b={x:R.x+92*q.s,y:q.shY-56*q.s};break;   // up in the light, over the human’s head
    case 'balance':a={x:L.x-q.shW*0.45,y:q.shY+22*q.s+q.lean};b={x:R.x+q.shW*0.45,y:q.shY+22*q.s-q.lean};break;
    case 'selfmouth':a={x:q.bx-q.hdR*0.3,y:q.hdY+q.hdR*0.45};b={x:q.bx+q.hdR*0.3,y:q.hdY+q.hdR*0.5};break;
    case 'selfeyes':a={x:q.bx-q.hdR*0.42,y:q.hdY-q.hdR*0.05};b={x:q.bx+q.hdR*0.42,y:q.hdY-q.hdR*0.05};break;
    default:a={x:L.x-8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};b={x:R.x+8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};
  }
  return{a:a,b:b,front:front,L:L,R:R};
}
function mcol(){return G.w||G.set==='home'||G.set==='bar'?'#0d0f18':G.dark>0.5?'#14111d':'#28243a';}
function morkoBody(q){
  var Hm=G.human,wk=G.morko.wake==null?1:G.morko.wake,al=wk;
  if(wk<0.98){ctx.fillStyle='rgba(20,16,30,'+(0.26*(1-wk))+')';ctx.beginPath();ctx.ellipse(Hm.x-12,FEETY+3,44,9,0,0,Math.PI*2);ctx.fill();}
  if(wk<0.02)return;
  ctx.fillStyle=mcol();
  ctx.globalAlpha=0.55*al;ctx.beginPath();ctx.moveTo(Hm.x-22,FEETY);ctx.lineTo(Hm.x+22,FEETY);ctx.lineTo(q.baseX+26*q.s,q.by);ctx.lineTo(q.baseX-26*q.s,q.by);ctx.closePath();ctx.fill();ctx.globalAlpha=al;
  ctx.beginPath();ctx.moveTo(q.baseX-26*q.s,q.by);ctx.lineTo(q.baseX+26*q.s,q.by);ctx.lineTo(q.bx+q.shW*0.8,q.shY+6);ctx.lineTo(q.bx-q.shW*0.8,q.shY+6);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.ellipse(q.bx,q.shY+4,q.shW,Math.max(14,26*q.s),0,0,Math.PI*2);ctx.fill();
  circ(q.bx,q.hdY,q.hdR);ctx.fill();ctx.globalAlpha=1;
  if(wk>0.4)morkoFace(q);
  if(G.ninja)drawHeadband(q);
}
function morkoArms(q,ht){
  var M=G.morko,lw=11*Math.sqrt(q.s),sh=[ht.L,ht.R];
  ctx.strokeStyle=mcol();ctx.fillStyle=mcol();ctx.lineWidth=lw;ctx.lineCap='round';
  for(var i=0;i<2;i++){var h=M.h[i],s0=sh[i];
    ctx.beginPath();ctx.moveTo(s0.x,s0.y);ctx.quadraticCurveTo((s0.x+h.x)/2+(i?14:-14)*q.s,(s0.y+h.y)/2+10*q.s,h.x,h.y);ctx.stroke();
    circ(h.x,h.y,lw*0.78);ctx.fill();}
  if(M.pose==='puppet')puppetBird((M.h[0].x+M.h[1].x)/2,(M.h[0].y+M.h[1].y)/2,q.s);
}
// What a shadow does when there is nothing to prevent: a bird, made of two hands.
function puppetBird(x,y,s){
  var f=RM?0.35:Math.sin(G.time*5.2),k=Math.max(0.8,Math.sqrt(s)),w=40*k,lift=(13+15*f)*k;
  ctx.fillStyle=mcol();
  ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x-w*0.5,y-lift*1.6,x-w,y-lift);ctx.quadraticCurveTo(x-w*0.45,y-2*k,x,y+6*k);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+w*0.5,y-lift*1.6,x+w,y-lift);ctx.quadraticCurveTo(x+w*0.45,y-2*k,x,y+6*k);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(x-3*k,y-2*k);ctx.lineTo(x,y-11*k);ctx.lineTo(x+3*k,y-2*k);ctx.closePath();ctx.fill();
}
function morkoFace(q){
  if(G.morko.coat){drawCoatFace(q);return;}
  var M=G.morko,r=q.hdR,cx=q.bx,cy=q.hdY,ex=r*0.42;
  var m=M.st==='frozen'||M.st==='hide'?'scared':M.st==='pokka'?'pokka':M.mood,look=m==='pokka'?-1:1;
  // A look lasts exactly one line: {look:'squint'} on the line, and the face goes back to whatever it was.
  var lk=M.st==='free'&&G.cur&&G.cur.who==='S'&&G.cur.look;if(lk)m=lk;
  var er=r*0.2,pr=0.45,brow=null,i,py=0;
  if(m==='stunned'){er=r*0.36;pr=0.13;}
  else if(m==='soft'){er=r*0.23;pr=0.66;brow='out';py=0.18;}
  else if(m==='up'){er=r*0.25;pr=0.4;brow='out';py=-0.5;look=0;}
  if(m==='calm'){er=r*0.15;pr=0.5;}
  else if(m==='alert'){er=r*0.25;pr=0.4;}
  else if(m==='scared'||m==='surprised'){er=r*0.34;pr=0.24;brow='up';}
  else if(m==='stern'){er=r*0.21;brow='in';}
  else if(m==='care'||m==='worry'){er=r*0.21;brow='out';}
  ctx.lineCap='round';
  for(i=-1;i<=1;i+=2){
    var x=cx+i*ex,y=cy-r*0.05;
    if(m==='pokka'){
      ctx.fillStyle='#f6f1e4';ctx.beginPath();ctx.arc(x,y,r*0.2,0,Math.PI);ctx.closePath();ctx.fill();
      ctx.fillStyle='#14111d';circ(x+look*r*0.09,y+r*0.08,r*0.07);ctx.fill();
    }else if(m==='squint'){   // two slits and one brow that has made up its mind
      ctx.fillStyle='#f6f1e4';ctx.beginPath();ctx.ellipse(x,y,r*0.25,r*0.085,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#14111d';circ(x+r*0.1,y,r*0.07);ctx.fill();
      ctx.strokeStyle='#f6f1e4';ctx.lineWidth=Math.max(2,r*0.09);
      if(i<0)line(x-r*0.26,y-r*0.3,x+r*0.24,y-r*0.17);else line(x-r*0.24,y-r*0.36,x+r*0.26,y-r*0.4);
    }else if(m==='pleased'){  // eyes shut in two small arches: entirely satisfied with itself
      ctx.strokeStyle='#f6f1e4';ctx.lineWidth=Math.max(2.5,r*0.12);ctx.beginPath();ctx.arc(x,y+r*0.12,r*0.2,Math.PI*1.12,Math.PI*1.88);ctx.stroke();
    }else if(lk&&(m==='stunned'||m==='soft'||m==='up')){
      var jx=m==='stunned'&&!RM?Math.sin(G.time*43+i)*r*0.02:0;
      ctx.fillStyle='#f6f1e4';circ(x+jx,y,er);ctx.fill();
      ctx.fillStyle='#14111d';circ(x+jx+look*er*0.3,y+er*py,er*pr);ctx.fill();
      if(m==='soft'){ctx.fillStyle='#f6f1e4';circ(x+look*er*0.3-er*0.2,y+er*py-er*0.22,er*0.16);ctx.fill();}
    }else{
      if(!RM&&brow!=='up'&&G.time%4.7<0.12){ctx.strokeStyle='#f6f1e4';ctx.lineWidth=Math.max(2,r*0.09);line(x-er,y,x+er,y);}
      else{ctx.fillStyle='#f6f1e4';circ(x,y,er);ctx.fill();
      ctx.fillStyle='#14111d';circ(x+look*er*0.4,y,er*pr);ctx.fill();}
    }
    ctx.strokeStyle='#f6f1e4';ctx.lineWidth=Math.max(2,r*0.09);
    if(brow==='up')line(x-er,y-er-r*0.2,x+er,y-er-r*0.2);
    else if(brow==='in')line(x-i*er*1.1,y-er-r*0.22,x+i*er*0.2,y-er-r*0.02);
    else if(brow==='out')line(x-i*er*1.0,y-er-r*0.22,x+i*er*1.0,y-er-r*0.08);
  }
  if(m==='pokka'){ctx.strokeStyle='#f6f1e4';ctx.lineWidth=Math.max(1.5,r*0.07);circ(cx-r*0.1,cy+r*0.5,r*0.09);ctx.stroke();}
}
function drawCoatFace(q){
  var c=G.morko.coat,p=c.p*c.p*(3-2*c.p),r=q.hdR,blink=c.blink;
  // The head is now a hood. The same two eyes slide down into a completely unconvincing button row.
  ctx.save();ctx.lineCap='round';ctx.strokeStyle='rgba(246,241,228,.22)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(q.bx-19*q.s,q.shY+10*q.s);ctx.lineTo(q.bx,q.shY+33*q.s);ctx.lineTo(q.bx+19*q.s,q.shY+10*q.s);ctx.stroke();
  for(var i=0;i<2;i++){
    var x=q.bx+(i?1:-1)*r*0.42*(1-p),y=(q.hdY-r*0.05)*(1-p)+(q.shY+(48+i*27)*q.s)*p;
    var er=r*(0.21+0.06*p),closed=blink>=0&&blink<0.24;
    ctx.fillStyle='#f6f1e4';ctx.strokeStyle='#f6f1e4';ctx.lineWidth=2;
    if(closed){line(x-er,y,x+er,y);}
    else{circ(x,y,er);ctx.fill();ctx.fillStyle='#14111d';circ(x+er*0.35,y,er*0.42);ctx.fill();}
  }
  ctx.restore();
}
function drawPair(humanOpts){
  var q=geom(),ht=handTargets(q);
  var up=G.morko.wake==null||G.morko.wake>0.5;
  plainShadow();
  morkoBody(q);if(up&&!ht.front)morkoArms(q,ht);
  if(up)shadowDrink(q);
  drawHuman(humanOpts);
  if(up&&ht.front)morkoArms(q,ht);
  if(up)drawStamp();
}

/* ================= drawing: speech ================= */
function drawLines(){
  var g=G,i,l,cur=g.cur&&g.cur.who;
  for(var pass=0;pass<2;pass++)for(i=0;i<g.lines.length;i++){
    l=g.lines[i];var isCur=l.who===cur;if((pass===1)!==isCur||!isCur)continue;
    if(l.big&&l.who==='S'){bigBubble(l.text,RM?1e9:Math.floor(g.curT*55));continue;}   // drawn on every screen: it is a prop, not a caption
    if(!WIDE)continue; // on a narrow screen the panel below the scene carries the text
    if((l.who==='S'||l.who==='H')&&g.human.gone)continue;
    var n=l.text.length,mw=n>90?330:n>50?290:0,rv=Math.floor(g.curT*55);
    ctx.save();
    if(l.who==='S'&&g.morko.asleep)continue;
    if(l.who==='S'){var q=geom(),above=q.hdY-q.hdR-14,sw=mw||260,bh=bubbleH(l.text,sw,l);
      if(above-12>=bh+8)bubble(q.bx-70,above+12,l.text,{dark:true,noTail:true,maxW:sw,reveal:rv,loud:l.loud,quiet:l.quiet});
      else bubble(q.bx-70,0,l.text,{dark:true,noTail:true,maxW:sw,reveal:rv,loud:l.loud,quiet:l.quiet,top:Math.min(q.hdY+q.hdR+14,WALLY-bh-70)});}
    else if(l.who==='H')bubble(g.human.x+60,FEETY-172,l.text,{maxW:mw||230,reveal:rv});
    else if(l.who==='A')bubble(g.ax,FEETY-172,l.text,{maxW:mw,reveal:rv});
    else if(l.who==='B')bubble(g.bx2,FEETY-172,l.text,{maxW:mw,reveal:rv});
    else if(l.who==='P')bubble(g.w||!g.human.gone?g.human.x+210:170,g.w?330:340,l.text,{noTail:true,maxW:mw,reveal:rv});
    else if(l.who==='R')bubble(g.rx,FEETY-172,l.text,{maxW:mw,reveal:rv});
    else if(l.who==='T'&&g.bar)bubble(g.bar.tx-196,0,l.text,{noTail:true,maxW:mw||240,reveal:rv,top:BARY+26});
    else if(l.who==='X'&&g.bar)bubble(g.bar.sx,FEETY-172,l.text,{maxW:mw,reveal:rv});
    else if(l.who==='L')bubble(760,FEETY-172,l.text,{maxW:mw,reveal:rv});
    else if(l.who==='Z')bubble(g.ax+62,WALLY-178,l.text,{dark:true,noTail:true,reveal:rv});
    else if(l.who==='Y')bubble(g.yx,WALLY-200,l.text,{dark:true,noTail:true,maxW:mw||250,reveal:rv});
    else if(l.who==='W')bubble(g.rx+92,WALLY-246,l.text,{dark:true,noTail:true,maxW:mw||230,reveal:rv});
    ctx.restore();
  }
}

/* ================= drawing: scenes ================= */
function drawOutside(){
  var g=G,o=g.out,t=o.t,an=o.anim;
  if(an==='chatlog'){drawChatlog(o);return;}
  if(an==='text'){
    ctx.fillStyle='#141a1c';ctx.fillRect(0,0,W,H);ctx.fillStyle='#0f0d14';ctx.fillRect(0,0,W,56);
    ctx.fillStyle='#f1ebdd';ctx.textBaseline='middle';ctx.textAlign='left';ctx.font='700 18px system-ui,sans-serif';ctx.fillText(o.title,28,29);
    ctx.textAlign='right';ctx.font='500 16px system-ui,sans-serif';ctx.fillStyle='#b9b2a6';ctx.fillText(o.dur,W-28,29);
    ctx.globalAlpha=clamp((t-0.5)/0.6,0,1);ctx.textAlign='center';ctx.fillStyle='#f1ebdd';ctx.font='500 30px Fraunces,Georgia,serif';
    var ls=wrap(o.cap,720);for(var li=0;li<ls.length;li++)ctx.fillText(ls[li],W/2,H/2+10-(ls.length-1)*20+li*40);ctx.globalAlpha=1;return;
  }
  backdrop(true);
  var hx=g.human.xT<0?HOME:g.human.x,h={body:'#c98f2e',hair:'#4a3b32',facing:1,cup:true,face:'neutral'};
  var aFace=1,aWave=false,show=true;
  if(an==='tape'){hx=HOME;h.nod=(t>0.8&&t<1.6)?Math.sin((t-0.8)/0.8*Math.PI):0;aFace=t<1.4?-1:1;}
  else if(an==='none'){h.nod=(t>0.5&&t<1.3)?Math.sin((t-0.5)/0.8*Math.PI):0;h.sip=t>2.2&&t<3.6?Math.sin((t-2.2)/1.4*Math.PI):0;}
  else if(an==='bite'){h.face=t<1.6?'stiff':'neutral';}
  else if(an==='nod'){h.nod=(t>0.5&&t<1.3)?Math.sin((t-0.5)/0.8*Math.PI):(t>1.6&&t<2.4)?Math.sin((t-1.6)/0.8*Math.PI):0;}
  else if(an==='grow'){h.face='stiff';h.flinch=t<1.9?0.8:0.25;h.shake=t<2.8;}
  else if(an==='cover'){h.face='down';h.down=true;if(g.day!=='C'&&t>1&&t<2.8){aFace=-1;aWave=true;}}
  else if(an==='exit'){hx=300-t*110;h.back=true;h.cup=false;h.walk=true;show=hx>-40;if(t>2.6)aFace=-1;}
  if(an==='tape'&&t>0.4&&t<1.4)bubble(700,FEETY-172,'oh, hi.');
  if(an==='exit'){ctx.fillStyle='#fffdf6';ctx.strokeStyle='#2b2733';ctx.lineWidth=1.5;rr(650,406,12,14,2);ctx.fill();ctx.stroke();}
  if(show)person(hx,h);
  if(an==='tape'){person(700,{body:SANNA.body,hair:SANNA.hair,facing:aFace});person(800,{body:MIKA.body,hair:MIKA.hair,facing:1,cup:true});}
  else if(g.cowA)person(g.ax,{body:SANNA.body,hair:SANNA.hair,facing:aFace,wave:aWave});
  if(an!=='tape'&&g.cowB)person(g.bx2,{body:MIKA.body,hair:MIKA.hair,facing:an==='nod'||an==='bite'?-1:g.bFace,cup:true,face:an==='bite'&&t>1.5?(t<2.4?'stiff':'smile'):'neutral',flinch:an==='bite'&&t>1.2&&t<2?0.5:0});
  if(an==='bite'&&t>0.3&&t<1.5)bubble(hx+40,FEETY-172,'Maybe YOUR comfort zone could use a walk.',{maxW:200});
  if(an==='bite'&&t>2.4&&t<3.8)bubble(g.bx2,FEETY-172,'…ha.');
  if(an==='none'&&t>0.6&&t<1.9)bubble(hx,FEETY-172,'hi');
  if(an==='grow'&&t>1.9&&t<3.3)bubble(hx,FEETY-172,'HI.');
  ctx.fillStyle='#0f0d14';ctx.fillRect(0,0,W,56);ctx.fillRect(0,H-64,W,64);
  ctx.fillStyle='#f1ebdd';ctx.textBaseline='middle';ctx.textAlign='left';ctx.font='700 18px system-ui,sans-serif';ctx.fillText(o.title,28,29);
  ctx.textAlign='right';ctx.font='500 16px system-ui,sans-serif';ctx.fillStyle='#b9b2a6';ctx.fillText(o.dur,W-28,29);
  if(t>2.2){ctx.textAlign='center';ctx.fillStyle='#f1ebdd';ctx.font='500 20px system-ui,sans-serif';ctx.fillText(o.cap,W/2,H-32);}
}
function drawWalk(){
  var g=G,w=g.w,cam=w.x-400,i,sx;
  ctx.fillStyle='#12152a';ctx.fillRect(-20,-20,W+40,140);
  ctx.fillStyle='#f6f1e4';for(i=0;i<14;i++){var stx=((i*173-cam*0.05)%1000+1000)%1000-20;circ(stx,14+(i*37)%90,1.2);ctx.fill();}
  ctx.fillStyle='#3d4460';ctx.fillRect(-20,120,W+40,WALLY-120);
  ctx.fillStyle='#343a52';for(i=0;i<9;i++){sx=((i*130-cam)%1170+1170)%1170-105;ctx.fillRect(sx,120,4,WALLY-120);}
  ctx.fillStyle='#2a2e40';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);
  ctx.fillStyle='#232636';ctx.fillRect(-20,WALLY-5,W+40,5);
  drawCars(cam);
  var hx=HOMEX+60-cam;
  if(hx<W+200){ctx.fillStyle='#57405a';ctx.fillRect(hx-130,90,360,WALLY-90);
    ctx.fillStyle='#f3d27a';rr(hx+110,200,70,70,4);ctx.fill();
    ctx.fillStyle='#7a4f3c';rr(hx-34,WALLY-158,72,158,6);ctx.fill();ctx.fillStyle='#e2b04a';circ(hx+26,WALLY-78,4);ctx.fill();}
  for(i=0;i<LAMPS.length;i++){
    sx=LAMPS[i]-cam;if(sx<-320||sx>W+320)continue;
    var home=i===LAMPS.length-1,ly=home?190:150,lx=home?sx:sx+26;
    var gr=ctx.createRadialGradient(lx,ly+60,8,lx,ly+60,300);gr.addColorStop(0,'rgba(255,221,140,.5)');gr.addColorStop(1,'rgba(255,221,140,0)');
    ctx.save();ctx.beginPath();ctx.rect(-20,120,W+40,H);ctx.clip();ctx.fillStyle=gr;ctx.fillRect(lx-300,ly-240,600,600);ctx.restore();
    if(!home){ctx.strokeStyle='#1b1d2a';ctx.lineWidth=6;ctx.lineCap='round';line(sx,WALLY,sx,150);line(sx,150,sx+26,150);}
    ctx.fillStyle='#ffe9a8';circ(lx,ly+4,home?7:9);ctx.fill();
  }
  drawPair({walk:g.walking});
  drawTics(cam);
}
function hhmm(s){var h=Math.floor(s/3600)%24,m=Math.floor(s/60)%60;return (h<10?'0':'')+h+':'+(m<10?'0':'')+m;}
var JOB_OLD='Keep you from being rejected.',JOB_NEW='Stay with you when it happens.';
function jobRewrite(x,y,w){
  // Strike the old job out, then hand-write the new one underneath. Pure canvas, no layout change.
  var t=G.job.t,k=clamp(t/0.9,0,1);
  ctx.strokeStyle='#e2b04a';ctx.lineWidth=2;line(x-2,y,x-2+(w+4)*k,y);
  if(t>1.1){
    var n=Math.min(JOB_NEW.length,Math.floor((t-1.1)*24)),txt=JOB_NEW.slice(0,n);
    ctx.font='600 15px Fraunces,Georgia,serif';ctx.textAlign='right';ctx.fillStyle='#e2b04a';
    ctx.fillText(txt+(n<JOB_NEW.length?'▏':''),x+w,y+22);ctx.textAlign='left';
  }
}
function jobCard(){
  // The turn, shown large for a moment before it settles into the corner.
  var t=G.job.t,a=clamp(t/0.4,0,1)*clamp((4.6-t)/0.6,0,1);if(a<=0)return;
  var cx=W/2,cy=150,w=520,h=150;
  ctx.save();ctx.globalAlpha=a;
  ctx.fillStyle='rgba(18,24,28,.9)';rr(cx-w/2,cy-h/2,w,h,14);ctx.fill();
  ctx.strokeStyle='#e2b04a55';ctx.lineWidth=1.5;rr(cx-w/2,cy-h/2,w,h,14);ctx.stroke();
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='700 12px system-ui,sans-serif';ctx.fillStyle='#e2b04a';ctx.fillText('EKSKYYSMI’S JOB DESCRIPTION',cx,cy-48);
  ctx.font='500 22px system-ui,sans-serif';ctx.fillStyle='#f1ebdd';var ow=ctx.measureText(JOB_OLD).width;ctx.fillText(JOB_OLD,cx,cy-12);
  var k=clamp(t/0.9,0,1);ctx.strokeStyle='#e2b04a';ctx.lineWidth=3;line(cx-ow/2-4,cy-11,cx-ow/2-4+(ow+8)*k,cy-11);
  if(t>1.1){var n=Math.min(JOB_NEW.length,Math.floor((t-1.1)*20));
    ctx.font='600 26px Fraunces,Georgia,serif';ctx.fillStyle='#e2b04a';ctx.fillText(JOB_NEW.slice(0,n)+(n<JOB_NEW.length?'▏':''),cx,cy+32);}
  ctx.restore();
}
function hud(){
  var g=G,y=26,rows=g.w?[]:[['A SMALL PLAN',g.planText||'Ask Sanna to lunch.']];
  if(g.chapter===3&&g.yes&&!g.moment)rows.push(['THINGS AGREED TO',String(g.yes)]);
  rows.unshift(['EKSKYYSMI’S JOB',g.plain?'Vacant.':g.jobDone?JOB_NEW+(g.evenings?' Part-time.':''):JOB_OLD,g.jobDone||g.plain?'':'job']);   // away: the post is vacant; back: part-time
  var show=1;if(COMPACT){show=(g.job&&g.job.t<7)||g.pop?1:clamp(7-(g.hudAge||0),0,1);if(show<=0)return;}
  ctx.save();ctx.globalAlpha=show;if(COMPACT){ctx.translate(W-14,14);ctx.scale(1.3,1.3);ctx.translate(-(W-14),-14);}
  ctx.textAlign='left';ctx.textBaseline='middle';
  for(var i=0;i<rows.length;i++){
    ctx.font='700 11px system-ui,sans-serif';var w1=ctx.measureText(rows[i][0]).width;
    ctx.font='500 13px system-ui,sans-serif';var w2=ctx.measureText(rows[i][1]).width;
    var x=W-14-(w1+w2+30);
    ctx.fillStyle='rgba(22,19,30,.72)';rr(x,y-11,w1+w2+30,22,11);ctx.fill();
    ctx.font='700 11px system-ui,sans-serif';ctx.fillStyle='#e2b04a';ctx.fillText(rows[i][0],x+10,y);
    ctx.font='500 13px system-ui,sans-serif';
    ctx.fillStyle='#f1ebdd';ctx.fillText(rows[i][1],x+18+w1,y);
    if(rows[i][2]==='job'&&g.job)jobRewrite(x+18+w1,y,w2);
    y+=rows[i][2]==='job'&&g.job?50:26;
  }
  if(g.pop){ctx.globalAlpha=clamp(2.6-g.pop.t,0,1);ctx.textAlign='right';ctx.font='700 14px system-ui,sans-serif';ctx.fillStyle='#e2b04a';ctx.fillText(g.pop.text,W-20,y+4-Math.min(8,g.pop.t*10));ctx.globalAlpha=1;}
  ctx.restore();
}
function pausedNote(){
  var g=G,a=g.awayNote;
  ctx.fillStyle='rgba(13,17,20,.76)';ctx.fillRect(0,0,W,H);
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#f1ebdd';ctx.font='650 34px Fraunces,Georgia,serif';ctx.fillText(a?a[0]:'Paused',W/2,H/2-48);
  ctx.font='500 17px system-ui,sans-serif';ctx.fillStyle='#ebbd79';ctx.fillText(a?a[1]:'Take your time. I’ll just be here, thinking about it.',W/2,H/2-8);
  ctx.fillStyle='#bfcfbd';ctx.fillText('Tap the scene to carry on.',W/2,H/2+30);
}
function draw(){
  var g=G;
  ctx.setTransform(SC,0,0,SC,0,0);
  ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  if(g.chap){chapCard();return;}
  if(g.out){drawOutside();return;}
  if(g.rep){drawReplay();return;}
  if(g.zoom){drawZoom();return;}
  if(g.jolt&&joltPhase()){drawXray();return;}
  ctx.save();applyCamera();
  if(g.w){drawWalk();drawLines();}
  else{
    backdrop(false);
    if(g.dark>0.01){ctx.fillStyle='rgba(18,14,30,'+(0.45*g.dark)+')';ctx.fillRect(-20,-20,W+40,H+40);}
    if(g.gaze>0.01&&!g.human.gone){
      ctx.fillStyle='rgba(255,246,200,'+(0.34*g.gaze)+')';ctx.beginPath();
      if(g.gazeFrom==='after'){var px=g.human.x;ctx.moveTo(px-24,-30);ctx.lineTo(px+24,-30);ctx.lineTo(px+86,FEETY+4);ctx.lineTo(px-86,FEETY+4);ctx.closePath();ctx.fill();
        ctx.beginPath();ctx.ellipse(px,FEETY+4,86,13,0,0,Math.PI*2);ctx.fill();}
      else{var gx=g.gazeFrom==='B'?g.bx2:g.gazeFrom==='R'?g.rx:g.ax;ctx.moveTo(gx-14,FEETY-150);ctx.lineTo(g.human.x+16,FEETY-176);ctx.lineTo(g.human.x+16,FEETY);ctx.closePath();ctx.fill();}
    }
    if(!g.human.gone)drawPair();
    drawFight();
    drawDish();
    drawTics(0);
    if(WAIT==='hold'&&g.hold&&!g.human.gone)holdRing();
    drawToss();drawForm();drawPaper();
    sannaShadow();eeroShadow();riittaShadow();
    drawCoworkers(1);
    if(g.set==='bar'&&g.bar)barFront();
    drawLens();
    drawLines();
    drawQte();
  }
  ctx.restore();
  if(g.flash>0.01&&!RM){ctx.fillStyle='rgba(255,250,235,'+(0.22*g.flash)+')';ctx.fillRect(0,0,W,H);}
  if(g.pulse>0.02){
    var beat=RM?0.6:0.35+0.65*Math.pow(Math.max(0,Math.sin(g.time*9.4)),6),vg=ctx.createRadialGradient(W/2,H/2,H*0.3,W/2,H/2,H*0.8);
    vg.addColorStop(0,'rgba(128,26,34,0)');vg.addColorStop(1,'rgba(128,26,34,'+(0.55*g.pulse*beat)+')');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
  }
  ctx.textBaseline='middle';
  if(g.bigNote)bigNote();
  if(g.cards.length)drawCards();
  if(g.fade>0.01){ctx.fillStyle='rgba(10,12,16,'+g.fade+')';ctx.fillRect(0,0,W,H);}
  if(g.draft)drawDraft();
  if(g.boss)drawBoss();
  if(g.rec)drawRec();
  if(g.hud&&g.started&&!g.qte)hud(); // the window has the screen for its second
  if(g.job&&!g.ended)jobCard();
  if(g.w){
        if(g.card>0){ctx.textAlign='center';ctx.fillStyle='#f1ebdd';ctx.font='700 30px system-ui,sans-serif';ctx.fillText('THE WALK HOME',W/2,74);
      ctx.font='500 17px system-ui,sans-serif';ctx.fillStyle='#b9b2a6';ctx.fillText('Nine minutes, usually.',W/2,106);}
  }
  if(g.band)band(g.band,H-18);
  if(paused)pausedNote();
}
// ---- src/80-ui.js ----
/* ================= overlays ================= */
function showOv(html,kind){ov.innerHTML='<div class="card">'+html+'</div>';ov.className='ov on';ov.dataset.kind=kind||'title';}
function hideOv(){ov.className='ov';ov.innerHTML='';}
function showChapters(){
  var sv=loadProgress(),h='<div class="eyebrow">Chapters</div><h2>Pick a moment.</h2><div class="lab-list">';
  for(var i=1;sv&&i<=sv.unlocked&&i<=5;i++)h+='<button class="lab" type="button" data-ch="'+i+'"><b>'+CHAPTERS[i].title+'</b><span>'+CHAPTERS[i].day.charAt(0)+CHAPTERS[i].day.slice(1).toLowerCase().replace(/\b(mon|tues|wednes|thurs|fri)day\b/g,function(d){return d.charAt(0).toUpperCase()+d.slice(1);})+'</span></button>';
  showOv(h+'</div><p class="small">Each one starts from its beginning and runs on into the moments after it.</p><button class="go alt" type="button" data-go="menu">Back</button>','menu');
}
function showAbout(){
  showOv('<div class="eyebrow">About</div><h2>What is this?</h2>'+
   '<p>You play Ekskyysmi, the overprotective shadow of a perfectly ordinary person. They have small plans. You have concerns.</p>'+
   '<p>Small moments from one ordinary life, in no particular hurry. About 45 minutes. Read at your own pace. Almost nothing is timed. The one thing that is, isn’t fair. That’s the point.</p>'+
   '<p>It’s a comedy about rejection sensitivity, meant kindly. It isn’t advice.</p>'+
   '<button class="go alt" type="button" data-go="menu">Back</button>','menu');
}
function showWeekEnd(){
  var g=G;g.ended=true;g.dayEnd=false;WAIT=null;Q=[];render();
  var note=g.no?'One “no” was said out loud. Everyone survived, including Eero.':'The “no” is still in its box. It keeps.';
  closeDay();var rows=runRows(g.run),rt='RECEIPT · THE WHOLE THING';
  g.receiptText=receiptText(rt,rows,RC_FOOT_RUN);g.receipt={title:rt,rows:rows,foot:RC_FOOT_RUN};
  showOv('<div class="end-grid"><div><div class="eyebrow">For now</div><h2>Still here. Both of you.</h2>'+
   '<p class="small job-line">Ekskyysmi’s job: <s>Keep you from being rejected.</s> Stay with you when it happens.</p>'+
   '<p>A string of small moments. One “oh, hi”, twice.<br>It went off both times. The second time, somebody stayed.</p>'+
   '<div class="end-note"><p>'+note+'</p></div>'+
   '<p class="title-quote">“For the record, I intend to go off again on Monday.”</p>'+
   '<div class="end-go"><button class="go" type="button" data-go="start">New game →</button><button class="go alt" type="button" data-go="menu">Title screen</button></div></div>'+
   receiptHTML(rt,rows,RC_FOOT_RUN+'<br><button class="rc-copy" type="button" data-go="sharercpt">Save as picture</button> <button class="rc-copy" type="button" data-go="copyrcpt">Copy text</button>')+'</div>','end');
}
function showTitle(){
  var sv=loadProgress();music('title');
  G.human.x=G.human.xT=755;G.morko.s=G.morko.sT=1.25;G.morko.off=-75;G.morko.mood='care';updHands(1);
  showOv('<h1 class="logo"><svg class="logo-eyes" viewBox="0 0 64 64" aria-hidden="true"><path d="M44 44l13 13" stroke="#ebbd79" stroke-width="8" stroke-linecap="round"/><circle cx="28" cy="28" r="20" fill="#14111d" stroke="#f4eddf" stroke-width="6"/><ellipse cx="21.5" cy="27" rx="4.8" ry="6.4" fill="#faf4e5"/><ellipse cx="34.5" cy="27" rx="4.8" ry="6.4" fill="#faf4e5"/><g class="pupils"><circle cx="23" cy="28.2" r="2.2" fill="#14111d"/><circle cx="36" cy="28.2" r="2.2" fill="#14111d"/></g></svg><span>Really Small Deal<span class="logo-dot">.</span></span></h1>'+
   '<p class="tagline">A small moment.<br>A very long shadow.</p>'+
   (sv?'<button class="go" type="button" data-go="cont">Continue · '+(sv.at?LABS[sv.at.moment].title:dayName(sv.ch))+' <span aria-hidden="true">→</span></button><button class="go alt" type="button" data-go="start">New game</button>'
      :'<button class="go" type="button" data-go="start">New game <span aria-hidden="true">→</span></button>')+
   '<div class="menu-links">'+(sv?'<button class="link" type="button" data-go="chapters">Chapters</button>':'')+
   '<button class="link" type="button" data-go="lab">Scenario lab</button><button class="link" type="button" data-go="settings">Settings</button><button class="link" type="button" data-go="about">About</button></div>');
  render();
}
var DAYNAME={A:'benign',B:'sensitive',C:'dismissive'};
function showEnd(){
  var g=G,n=g.startles;g.ended=true;g.dayEnd=true;WAIT=null;Q=[];render();saveProgress(2);
  var note=g.lunch===1?'You answered inside the window. Nobody has done that before. Lunch happened. The shadow is lying down.':g.lunch===2?'Lunch didn’t happen today. A message did. Tomorrow, then.':g.day==='C'?(g.reflected?'Today hurt. You reached for someone who makes room for you.':'Today hurt. Their choice to leave you out was theirs.'):'Nobody said no. Nobody had the chance. The shadow is calling that a win.';
  if(g.day==='C'&&g.leak==='exit'&&!g.reflected)note='Today felt lonely. Not every missing piece needs filling in tonight.';
  var quote=g.lunch===1?'I would like to lodge a complaint about the speed of that hi.':{grow:'I was very convincing furniture.',cover:'I maintain that the cup was very safe.',exit:'Next time, we bring the coffee.',none:'I wobbled. We went anyway. Slightly after everyone else.'}[g.leak];
  var d=closeDay()||{label:'A MONDAY',outside:AWAKE,extra:0,ledger:[],ratio:1},rows=receiptRows(d),rt='DAILY RECEIPT · '+d.label;
  g.receiptText=receiptText(rt,rows,RC_FOOT_DAY);g.receipt={title:rt,rows:rows,foot:RC_FOOT_DAY};
  showOv('<div class="end-grid"><div><div class="eyebrow">End of Monday</div><h2>Home. Both of you.</h2>'+
   '<p>The greeting lasted two seconds.<br>The shadow took the scenic route.</p>'+
   '<div class="end-note"><p>'+note+'</p></div>'+
   '<p class="title-quote">“'+quote+'”</p>'+
   '<div class="end-go"><button class="go" type="button" data-go="next">Carry on →</button>'+
   '<button class="go alt" type="button" data-go="same">Try another approach</button>'+
   '<button class="go alt" type="button" data-go="again">Another Monday</button></div>'+
   '<p class="small">Another approach replays this Monday. Another Monday changes what was happening around you.</p></div>'+
   receiptHTML(rt,rows,RC_FOOT_DAY+'<br><button class="rc-copy" type="button" data-go="sharercpt">Save as picture</button> <button class="rc-copy" type="button" data-go="copyrcpt">Copy text</button>')+'</div>','end');
}
function startGame(day,skip){
  reset(day);G.started=true;G.chapter=1;newDay();
  saveProgress(1);
  if(skip){G.bx2=G.bxT=880;Q=scSanna();}
  else Q=scPrelude().concat(scIntro(),[function(){return scSanna();}]);
  run();
}
ov.addEventListener('click',function(e){
  var t=e.target;while(t&&t!==ov&&!(t.getAttribute&&(t.getAttribute('data-go')||t.getAttribute('data-ch')||t.getAttribute('data-lab'))))t=t.parentNode;
  if(!t||t===ov)return;var go=t.getAttribute('data-go');
  if(t.getAttribute('data-ch')){startChapter(+t.getAttribute('data-ch'));return;}
  if(t.getAttribute('data-lab')){startLab(t.getAttribute('data-lab'));return;}
  if(go==='settings'){if(typeof setTimeout==='function')setTimeout(function(){setMenu(true);},0);else setMenu(true);return;}
  if(go==='copyrcpt'){copyReceipt(t);return;}
  if(go==='sharercpt'){shareReceipt(t);return;}
  if(go==='lab'){reset(null);showLab();return;}
  if(go==='chapters'){showChapters();return;}
  if(go==='about'){showAbout();return;}
  if(go==='start')startGame(null,false);
  else if(go==='cont'){var sv=loadProgress();startChapter(sv?sv.ch:1,sv&&sv.at);}
  else if(go==='next'){hideOv();G.ended=false;G.dayEnd=false;Q=chain(2);run();}
  else if(go==='menu'){reset(null);showTitle();}
  else if(go==='again'){TRIES++;startGame(null,true);}
  else if(go==='same'){TRIES++;startGame(G.day,true);}
  else if(go==='cancel'){hideOv();paused=modalWasPaused;syncPause();}
  else if(go==='restart'){reset(null);showTitle();}
});

/* ================= input ================= */
window.addEventListener('keydown',function(e){
  if(logDialog.open||ov.dataset.kind==='restart'&&ov.classList.contains('on'))return;
  if(e.repeat)return;
  if(WAIT==='qte'&&G.qte&&!G.qte.end&&!paused){if(qteKey(e))e.preventDefault();return;}
  var tag=e.target.tagName;
  if(e.key===' '||e.key==='Enter'){
    if(tag==='BUTTON'||tag==='INPUT'||tag==='A')return;
    if(!G.started){startGame(null,false);}else advance();
    e.preventDefault();
  }else if((e.key==='f'||e.key==='F')&&tag!=='INPUT'){toggleFull();}else if(e.key>='1'&&e.key<='4'&&tag!=='INPUT'){choose(+e.key-1);}
  else if(e.key==='p'||e.key==='P'){togglePause();}
});
function syncPause(){if(paused||appHidden){stopVoice();holdUp();dragging=false;}syncAudioState();document.getElementById('pause').textContent=paused?'Resume':'Pause';document.body.classList.toggle('is-paused',paused);}
function togglePause(){if(!G.started||G.ended||logDialog.open||ov.classList.contains('on'))return;paused=!paused;if(!paused)G.awayNote=null;syncPause();}
document.getElementById('pause').addEventListener('click',togglePause);
document.getElementById('restart').addEventListener('click',function(){
  if(!G.started||G.ended){reset(null);showTitle();return;}
  if(ov.classList.contains('on'))return;
  modalWasPaused=paused;paused=true;syncPause();
  showOv('<div class="eyebrow">A fresh start?</div><h2>Rewind this little day?</h2><p>This will return to the beginning.</p><button class="go" data-go="cancel" type="button">Keep going</button><button class="go alt" data-go="restart" type="button">Start over</button>','restart');
  ov.querySelector('[data-go=cancel]').focus();
});
document.getElementById('journal').addEventListener('click',function(){
  if(ov.classList.contains('on')&&!G.ended)return;
  modalWasPaused=paused;paused=true;syncPause();
  document.getElementById('log-content').innerHTML=history.map(function(l){return '<div class="log-entry w-'+l.who+'"><b>'+NAMES[l.who]+'</b><p>'+esc(l.text)+'</p></div>';}).join('');
  logDialog.showModal();
});
document.getElementById('close-log').addEventListener('click',function(){logDialog.close();});
logDialog.addEventListener('close',function(){paused=modalWasPaused;syncPause();document.getElementById('journal').focus();});
function textUI(){
  var b=document.getElementById('textsize');
  b.textContent='Text: '+['small','normal','large'][textStep];
  document.documentElement.style.setProperty('--ts',TEXT_STEPS[textStep]);
}
document.getElementById('textsize').addEventListener('click',function(){
  textStep=(textStep+1)%TEXT_STEPS.length;try{window.localStorage.setItem('ekskyysmi.text',String(textStep));}catch(e){}
  textUI();sfx('pick');
});
textUI();
function slowUI(){
  var b=document.getElementById('slow');b.setAttribute('aria-pressed',String(slowReality));
  b.textContent=slowReality?'Slow reality: on':'Slow reality';
  b.title=slowReality?'The window to respond correctly lasts about nine seconds.':'Give yourself about nine seconds to respond correctly.';
}
document.getElementById('slow').addEventListener('click',function(){
  slowReality=!slowReality;try{window.localStorage.setItem('ekskyysmi.slow',slowReality?'on':'off');}catch(e){}
  slowUI();sfx('pick');
});
slowUI();
function motionUI(){document.getElementById('motion').setAttribute('aria-pressed',String(RM));document.body.classList.toggle('reduce-motion',RM);}
document.getElementById('motion').addEventListener('click',function(){RM=!RM;motionUI();});
motionUI();
document.getElementById('sound').addEventListener('click',function(){soundOn=!soundOn;if(!soundOn)stopVoice();else preloadSounds();try{window.localStorage.setItem('ekskyysmi.sound',soundOn?'on':'off');}catch(e){}soundUI();syncAudioState();if(soundOn)sfx('pick');});
soundUI();
function backButton(){
  if(logDialog.open){logDialog.close();return 'log';}
  if(ov.dataset.kind==='restart'&&ov.classList.contains('on')){hideOv();paused=modalWasPaused;syncPause();return 'cancel';}
  if(document.body.classList.contains('menu-open')){setMenu(false);return 'menu';}
  if(!G.started||G.ended){if(ov.dataset.kind==='title'&&ov.classList.contains('on'))return 'exit';reset(null);showTitle();return 'title';}
  if(paused){paused=false;syncPause();reset(null);showTitle();return 'title';}
  togglePause();return 'pause';
}
var CAP=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;
if(CAP&&CAP.addListener){
  CAP.addListener('backButton',function(){if(backButton()==='exit'&&CAP.exitApp)CAP.exitApp();});
  CAP.addListener('pause',function(){nativePaused=true;appVisibility();});
  CAP.addListener('resume',function(){nativePaused=false;appVisibility();});
  CAP.addListener('appStateChange',function(s){nativePaused=!s.isActive;appVisibility();});
}
/* ================= full screen and the immersive layout =================
   The scene fills the screen on a phone held sideways, and whenever the player asks for full screen.
   One class on <html> drives it; index.html sets it before first paint so phones never flash the wide layout. */
var htmlEl=document.documentElement;
var narrowMQ=window.matchMedia?window.matchMedia('(orientation:landscape) and (max-height:540px)'):null;
function fullOn(){return !!(document.fullscreenElement||document.webkitFullscreenElement);}
function fullSupported(){return !!(htmlEl.requestFullscreen||htmlEl.webkitRequestFullscreen);}
function syncImmersive(){
  var on=!!((narrowMQ&&narrowMQ.matches)||fullOn());
  htmlEl.classList.toggle('immersive',on);
  if(!on)setMenu(false);
  var b=document.getElementById('full');
  if(b){b.textContent=fullOn()?'Leave full screen':'Full screen';b.setAttribute('aria-pressed',String(fullOn()));}
  resize();
}
function toggleFull(){
  try{
    if(fullOn()){var ex=document.exitFullscreen||document.webkitExitFullscreen;if(ex)ex.call(document);}
    else{var req=htmlEl.requestFullscreen||htmlEl.webkitRequestFullscreen;if(req){var p=req.call(htmlEl);if(p&&p.catch)p.catch(function(){});}}
  }catch(e){/* some browsers refuse full screen; the game plays on regardless */}
}
if(narrowMQ&&narrowMQ.addEventListener)narrowMQ.addEventListener('change',syncImmersive);
document.addEventListener('fullscreenchange',syncImmersive);
document.addEventListener('webkitfullscreenchange',syncImmersive);

// Phones: the controls fold away behind one button so that only the scene and the words are on screen.
var menuBtn=document.getElementById('menu');
function setMenu(on){document.body.classList.toggle('menu-open',on);if(menuBtn&&menuBtn.setAttribute)menuBtn.setAttribute('aria-expanded',String(on));}
if(menuBtn&&menuBtn.addEventListener){
  menuBtn.addEventListener('click',function(e){if(e&&e.stopPropagation)e.stopPropagation();setMenu(!document.body.classList.contains('menu-open'));});
  document.addEventListener('click',function(){if(document.body.classList.contains('menu-open'))setMenu(false);});
  // Settings stay open while you flip them; the three that act on the game close the menu.
  var navEl=document.getElementById('controls');if(navEl&&navEl.addEventListener)navEl.addEventListener('click',function(e){var id=e&&e.target&&e.target.id;if(id!=='journal'&&id!=='pause'&&id!=='restart'&&e.stopPropagation)e.stopPropagation();});
}
var fullBtn=document.getElementById('full');
if(fullBtn){if(fullSupported())fullBtn.addEventListener('click',toggleFull);else fullBtn.remove();}
// Android onPause can arrive before visibilitychange (a call, screen lock or app switch).
// Keep the two signals separate: returning never resumes the story without the player's tap.
function appVisibility(){
  var hidden=!!document.hidden||nativePaused;if(hidden===appHidden)return;appHidden=hidden;
  if(hidden){
    goneAway();holdUp();dragging=false;setMenu(false);
    if(G&&G.started&&!G.ended)paused=true;
    if(logDialog.open||ov.dataset.kind==='restart'&&ov.classList.contains('on'))modalWasPaused=true;
  }else cameBack();
  syncPause();
}
document.addEventListener('visibilitychange',appVisibility);

// Browsers and the Android WebView hold all sound until the first touch or key. Whatever was waiting starts then.
(function(){var done=false;function first(){if(done)return;done=true;syncMusic();}
  if(document.addEventListener){document.addEventListener('pointerdown',first,true);document.addEventListener('keydown',first,true);document.addEventListener('touchstart',first,true);}})();
// ---- src/90-loop.js ----
/* ================= loop ================= */
var last=0;
function frame(ts){
  var elapsed=clamp((ts-last)/1000||0,0,1),dt=Math.min(elapsed,0.05);last=Math.max(last,ts);
  if(!paused&&!appHidden)update(dt,elapsed);
  draw();
  window.requestAnimationFrame(frame);
}
syncImmersive();reset(null);showTitle();
window.__T={get G(){return G;},start:startGame,frame:frame,advance:advance,choose:choose,state:function(){return WAIT;},nopts:function(){return CH?CH.length:0;},options:function(){return CH;},tick:update,draw:draw,pause:togglePause,unlock:function(){LOCK=0;},reset:reset,title:showTitle,history:function(){return history;},chapter:startChapter,lab:startLab,swat:swat,skipIntro:skipIntro,inside:{run:function(){return G.run;},day:function(){return G.day0;},mult:function(){return G.mult;},add:addLived,cameBack:cameBack,receipt:function(){return G.receiptText;}},qteKey:function(k){return qteKey({key:k});},qte:function(){return G.qte;},full:toggleFull,immersive:function(){return htmlEl.classList.contains('immersive');},chapters:showChapters,about:showAbout,lensTap:lensTap,back:backButton,sound:{load:loadSound,has:function(k){return !!BUF[k];},music:function(){return {name:musicName,playing:!!(musicEl&&!musicEl.paused),t:musicEl?musicEl.currentTime:0,vol:musicEl?musicEl.volume:0};},play:sfx,list:SAMPLES},holdDown:holdDown,holdUp:holdUp};
window.requestAnimationFrame(frame);
})();

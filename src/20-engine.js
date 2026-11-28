/* ================= state ================= */
// 0.99.56: the Monday is drawn when a new game starts. The first Monday a device ever sees is A or B: C, where the
// human really is left out, waits for a replay, when the game has already shown that it is kind. The last Monday is
// remembered across visits, so the next new game is always a different one.
var MONDAY_KEY='ekskyysmi.monday';
function pickMonday(){var last=lastDay;if(!last)try{last=window.localStorage.getItem(MONDAY_KEY);}catch(e){}
  if(['A','B','C'].indexOf(last)<0)last=null;
  var opts=(last?['A','B','C']:['A','B']).filter(function(x){return x!==last;});return opts[Math.floor(Math.random()*opts.length)];}
function rememberMonday(d){lastDay=d;try{window.localStorage.setItem(MONDAY_KEY,d);}catch(e){}}
function reset(day){
  if(G&&G.epi){G.epi=null;if(musicName==='epilogue')music(null);}try{document.body.classList.remove('epi-on');}catch(e){}   // leaving the epilogue early
  var r=day;
  if(!r)r=['A','B','C'][Math.floor(Math.random()*3)];   // the title and the menus reset too; the Monday you play is drawn in startGame()
  G={time:0,day:r,clock:9*3600+41*60+12,rate:1,started:false,ended:false,
     human:{x:HOME,xT:HOME,flinch:0,gone:false,face:'neutral',back:false,sweat:0,sweatT:0,blush:0,grin:0,puddle:0},aSweat:0,cards:[],rep:null,zoom:null,fight:null,fightRes:null,fightLog:null,boss:null,ninja:false,rBrow:0,lab:null,labEnd:false,tics:[],carsSeen:[],dish:null,kitchen:false,smileT:0,lens:null,lensView:false,glassN:0,skippable:false,moment:null,qte:null,qteWon:false,day0:null,mult:1,prevClock:0,livedShown:0,rolling:false,run:[],jolt:null,awayAt:null,awayNote:null,receiptText:'',bar:null,rec:null,draft:null,lib:null,replySent:null,noCup:false,mugFixed:true,fadeRate:1.6,
     morko:{s:1,sT:1,off:-70,mood:'calm',st:'free',pose:null,coat:null,wobble:null,h:[{x:340,y:380},{x:420,y:380}]},
     gaze:0,gazeT:0,gazeFrom:'A',dark:0,darkT:0,flash:0,anx:0,
     ax:1010,axT:1010,bx2:1090,bxT:1090,aFace:-1,bFace:-1,aWave:false,cowA:false,cowB:false,cupLeft:false,
     cz:1.025,cx:W/2,cy:H/2,
     lines:[],band:null,out:null,w:null,card:0,
     hud:false,plan:false,job:null,jobDone:false,bit:false,set:'room',chapter:1,label:null,planText:null,yes:0,no:false,fb:null,txt:null,rx:760,cowR:false,zShow:0,zT:0,fade:0,chap:null,bigNote:null,snacks:false,dayEnd:false,hold:null,peeked:false,pulse:0,shake:0,nopeMsg:null,prevented:0,pop:null,real:0,lunch:0,startles:0,fear:1,leak:'none',advice:0,warningSize:null,monWarning:null,friWarning:null,dealWho:null};   // 0.99.48: a new week starts without last week's alarm sizes
  G.handout=false;G.afterparty=false;G.sips=0;G.files=0;G.bigSip=null;G.fineSent=false;G.applied=false;G.posting=null;G.nothings=0;G.rehearsal=false;G.metSannaShadow=false;G.coatNo=false;G.kept=[];G.methods={};G.endSeen=false;G.stamp=null;
  G.choiceWho='S';G.finalFrame=false;G.barStory=null;G.quietDrawing=false;
  Q=[];WAIT=null;CH=null;history=[];previewSaved=null;dragging=false;paused=false;
  document.getElementById('pause').textContent=tr('Pause');document.body.classList.remove('is-paused');
  C.z=1.025;C.fx=W/2;C.fy=H/2;
  hideOv();render();
}

/* ================= script engine ================= */
// A message from someone else is typed before it arrives: three dots, a breath, then the words (Joonas 20.11.).
// Not for your own messages, notifications, or right after scripted dots (Thursday's “seen” has its own).
function incoming(s){if(s[0]!=='P'||s.typed||G.lab==='epilogue')return false;var t=s[1]||'';
  if(G.dotsAt!=null&&G.time-G.dotsAt<1.2)return false;
  return /^(?!You\b)(?!Library\b)[A-Z][A-Za-z’ ]{0,20}: “/.test(t)||/^Reply: /.test(t);}
function run(){
  for(;;){
    if(!Q.length){WAIT=null;render();return;}
    var s=Q.shift();
    if(typeof s==='function'){var r=s();if(r&&r.length)Q=r.concat(Q);continue;}
    if(Array.isArray(s)&&incoming(s)){var c=s.slice();c.typed=1;Q=[function(){G.dots={t:0};G.lines=G.lines.filter(function(l){return l.who!=='P';});sfx('pop');},{wait:RM?0.9:1.4},function(){G.dots=null;G.dotsAt=G.time;},c].concat(Q);continue;}
    if(Array.isArray(s)){setLine(s[0],s[1],s[2]);WAIT='click';LOCK=0.3;render();return;}
    if(s.wait!=null){if(s.wait>1)G.bick=0;WAIT='time';TIMER=s.wait;render();return;}
    if(s.view){WAIT='view';TIMER=2.4;render();return;}
    if(s.stretch){WAIT='stretch';G.morko.pose='grow';G.morko.sT=2.1;G.morko.mood='stern';LOCK=0.2;render();return;}
    if(s.hold){G.hold={kind:s.hold.kind,secs:s.hold.secs||3,p:0,on:false,tap:0,o:s.hold};G.lines=[];G.cur={who:'S',text:''};WAIT='hold';LOCK=0.2;render();return;}
    if(s.toss){tossStart(s.toss);return;}
    if(s.auto){G.auto={opts:s.auto.opts,pick:s.auto.pick||0,secs:s.auto.secs||1.8,t:0,done:false};G.lines=[];G.cur=null;WAIT='auto';render();return;}
    if(s.lamp){G.lines=[];G.cur=null;WAIT='lamp';LOCK=0.6;render();return;}
    if(s.still){G.lines=[];G.cur=null;G.band=null;WAIT='click';LOCK=0.6;render();return;}
    if(s.qte){startQte();return;}
    if(s.fight){startFight(s.fight);return;}
    if(s.choice){G.bick=0;G.nopeMsg=null;G.choiceWho=s.who||'S';G.choiceAsk=s.ask||null;CH=typeof s.choice==='function'?s.choice():s.choice;WAIT='choice';LOCK=0.4;render();return;}
  }
}
// advance: on a part card an early click shows the whole card; the next click goes on.
function advance(){if(paused||LOCK>0||WAIT==='qte'||WAIT==='auto')return;if(G.chap&&G.chap.part&&G.chap.t<PARTWAIT){G.chap.t=PARTWAIT;G.snap=null;render();return;}if(WAIT==='lamp'){lampOn();return;}if(WAIT==='fight'){swat();return;}if(WAIT==='hold'){holdTap();return;}if(WAIT==='toss'){tossTap();return;}if(WAIT==='stretch'){G.warningSize=G.morko.sT;G.morko.pose=null;run();}else if(WAIT==='click'||(WAIT==='view'&&TIMER<=0))run();}
function choose(i){
  if(paused||WAIT!=='choice'||LOCK>0||!CH||!CH[i])return;
  if(CH[i].off){nope(i);return;}
  clearPreview();var o=CH[i];CH=null;sfx('pick');if(o.f)o.f();if((G.choiceWho||'S')==='S')G.firstPick=true;
  if(o.m){var mm=G.methods||(G.methods={});mm[o.m]=(mm[o.m]||0)+1;}
  if(o.filed)G.pop={text:'Ekskyysmi filed that.',t:0};   // only on choices that come back later: the parody of “X will remember that”   // Ekskyysmi’s methods, for the week’s receipt
  var then=typeof o.then==='function'?o.then():(o.then||[]);
  Q=(o.hush||o.echo===false?[]:[[G.choiceWho||'S',o.t]]).concat(then,Q);run();   // echo:false: the option's own next line asks it (0.99.44)
}
// 0.99.54 (Joonas 28.11.: “skip seen nappi on minusta myös täysin turha, se pois”): Skip seen is gone; its stored list goes too
try{window.localStorage.removeItem('ekskyysmi.seen');}catch(e){}
function setLine(who,text,o){
  var g=G,en=text;text=tr(text);   // 0.89: Finnish pilot
  if(who==='N'){g.band=text;}
  else{g.band=null;g.lines=g.lines.filter(function(l){return l.who!==who;});g.lines.push({who:who,text:text,big:!!(o&&o.big),loud:!!(o&&o.loud),quiet:!!(o&&o.quiet)});if(g.lines.length>2)g.lines.shift();}
  var prev=g.cur&&g.cur.who,pair=(who==='S'&&prev==='H')||(who==='H'&&prev==='S');
  g.bick=pair&&text.length<=46&&!(o&&o.big)?(g.bick||0)+1:(who==='S'||who==='H')&&pair?Math.max(0,(g.bick||0)-1):0;
  var mute=who==='S'&&g.morko.asleep;
  g.phoneN=who==='P'?3:Math.max(0,(g.phoneN||0)-1);if(who==='P'&&!/^You:/.test(en))g.buzz=0.7;
  g.cur={who:who,text:text,big:!!(o&&o.big),loud:!!(o&&o.loud),quiet:!!(o&&o.quiet),look:(o&&o.look)||null};g.curT=0;if(!mute){speak(who,text,o,en);if(who!=='N'&&!(o&&o.big))sfx(who==='S'?'popS':'pop');}if(o&&o.loud&&!RM)g.shake=Math.max(g.shake||0,0.25);
  history.push({who:who,text:text});
}
// How many characters of a line are showing after t seconds. A full stop is a breath, an ellipsis is a longer one.
function revealCount(text,t,l){
  var cps=l&&l.quiet?30:l&&l.loud?85:55,i=0,c,n=text.length;
  for(;i<n;i++){t-=1/cps;if(t<0)return i;c=text.charAt(i);
    if(c==='…')t-=0.34;else if((c==='.'||c==='?'||c==='!')&&text.charAt(i+1)===' ')t-=0.24;else if(c===','||c===';')t-=0.1;else if(c==='—')t-=0.18;}
  return n;
}
function revealing(){var c=G.cur;return !RM&&WAIT==='click'&&c&&c.who!=='N'&&!c.big&&revealCount(c.text,G.curT||0,c)<c.text.length;}
// What a tap does: finish the sentence first, then move on. (The test driver calls advance() directly.)
function userAdvance(){if(revealing()){G.curT=99;return;}advance();}
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
  document.getElementById('chapter').textContent=g.ended?(g.labEnd?(DEVLAB?'Scenario lab':'Moments'):g.dayEnd?'End of Monday':'For now'):g.started?(g.lab?'':['','I · ','II · ','III · '][storyPart()])+tr(g.chap&&g.chap.part?g.chap.title:g.label|| (g.w?'The walk home':'Oh, hi.')):tr('A small social adventure');
  document.getElementById('perspective').textContent=tr(g.chap&&g.chap.part?g.chap.day:g.finalFrame?'FOR NOW':g.out&&!g.out.inside?'THE OUTSIDE VERSION':g.w?'THE MOMENT HAS PASSED. MOSTLY.':'THE INSIDE VERSION');
  cv.classList.toggle('stretching',WAIT==='stretch');
  cv.setAttribute('aria-label',g.chap&&g.chap.part?g.chap.day+'. '+g.chap.title:g.finalFrame?'The human is asleep. A lamp stays on. Ekskyysmi makes a bird with its hands.':'A human and a very large shadow');
  if(WAIT==='choice'&&CH){
    speaker=g.choiceWho||'S';text=g.nopeMsg||g.choiceAsk||(speaker==='H'?'Ekskyysmi is asleep. The human has the floor.':g.chapter===1&&!g.lab&&!g.firstPick?'You’re Ekskyysmi. Pick what I say.':'What do we do with this?');   // the very first choice says who the player is
    if(g.form&&g.form.i>=0){speaker='N';text=FORM_Q[g.form.i].q;}
    for(var i=0;i<CH.length;i++)html+=CH[i].hush&&CH[i].off?'<button class="opt off hush'+(CH[i].tried?' shake':'')+'" type="button" data-i="'+i+'"><i>'+(i+1)+'</i><span>'+esc(tr(CH[i].t))+' <em>'+tr('Not a setting. Yet.')+'</em></span></button>':CH[i].hush?'<button class="opt hush open" type="button" data-i="'+i+'"><i>'+(i+1)+'</i>'+esc(tr(CH[i].t))+'</button>':CH[i].off&&CH[i].note?'<button class="opt off'+(CH[i].tried?' shake':'')+'" type="button" data-i="'+i+'"><i>'+(i+1)+'</i><s>'+esc(tr(CH[i].t))+'</s> <em>'+esc(tr(CH[i].note))+'</em></button>':CH[i].off&&CH[i].tried?'<button class="opt off shake" type="button" data-i="'+i+'"><i>'+(i+1)+'</i><s>'+esc(tr(CH[i].t))+'</s> <em>Ekskyysmi is sitting on this</em></button>':'<button class="opt" type="button" data-i="'+i+'"><i>'+(i+1)+'</i>'+esc(tr(CH[i].t))+'</button>';
  }else if(WAIT==='stretch'){
    speaker='S';text='A small warning. Just enough to make my point.';
    html='<div class="stretch-controls"><label for="stretch">'+tr('Unfurl your warning')+'</label><input id="stretch" type="range" min="1.8" max="3.8" step="0.05" value="'+g.morko.sT+'" aria-label="'+tr('Size of your warning')+'"><button class="opt cont" type="button" data-i="go">'+tr('That should do it →')+'</button></div>';
  }else if(WAIT==='auto'&&g.auto){
    speaker='H';text='Already decided.';
    for(var ai=0;ai<g.auto.opts.length;ai++)html+='<button class="opt'+(g.auto.done&&ai===g.auto.pick?' picked':'')+'" type="button" disabled><i>'+(ai+1)+'</i>'+esc(tr(g.auto.opts[ai]))+'</button>';
  }else if(WAIT==='lamp'){
    speaker='N';text='It is dark. There is a lamp.';
    html='<button class="opt cont" type="button" data-i="go">'+tr('Turn on the lamp')+'</button>';
  }else if(WAIT==='toss'){
    speaker='S';text=tossText();g.toss.shown=text;
    html='<button class="opt cont" type="button" data-i="go">'+tr('Let go')+'</button>';
  }else if(WAIT==='hold'){
    speaker='S';text=holdText();g.hold.shown=text;
    html='<div class="hold-controls"><button class="opt cont" type="button" data-i="hold">'+tr(HOLD_LABEL[g.hold.kind])+'</button><div class="holdbar"><i id="holdfill"></i></div></div>';
  }else if(WAIT==='qte'&&g.qte){
    var qq=g.qte;speaker='S';text=tr('RESPOND. CORRECTLY. NOW.');
    html=qq.order.map(function(i){var r=RESPONSE[i],done=i<qq.i;return '<button class="opt qte'+(done?' done':'')+'" type="button" data-i="q'+i+'"'+(qq.end||done?' disabled':'')+'><b>'+tr(r.sym)+'</b><span>'+tr(r.label)+'</span></button>';}).join('');
  }else if(WAIT==='fight'){
    speaker='S';text='Incoming! I’ve got this. Probably.';
    html='<button class="opt cont swat" type="button" data-i="go">'+tr('Swat!')+' <span>'+tr('(or tap the scene)')+'</span></button>';
    if(g.fight.paced){
      var reply=currentReply(),ready=reply&&(reply.state==='fly'||reply.state==='open');
      speaker='P';text=reply?(g.fight.msgs.indexOf(reply)+1)+' / '+g.fight.msgs.length+' — '+(reply.seen?reply.full:'“'+reply.far+'”'):'';
      html='<button class="opt cont" type="button" data-i="read"'+(ready?'':' disabled')+'>'+tr(ready?(reply.state==='fly'?'Let it come closer →':'Let it through →'):'A moment…')+'</button>'+
        '<button class="opt" type="button" data-i="go"'+(ready?'':' disabled')+'>'+tr('Swat this reply away')+'</button>';
    }
  }else if(WAIT==='view'){
    speaker='N';text=g.out.cap;
    html='<button class="opt cont" type="button" data-i="go"'+(TIMER>0?' disabled':'')+'>'+tr('Back inside →')+'</button>';
    if(g.out.anim==='chatlog')html=chatTranscript()+html;
  }else{
    if(WAIT==='time'&&!cur)text=g.skippable?'':'…';   // the intro speaks through its own caption (top left); the panel only offers Skip
    html=WAIT==='time'&&g.skippable?'<button class="opt cont" type="button" data-i="skip">'+tr('Skip intro →')+'</button>':'<button class="opt cont" type="button" data-i="go"'+(WAIT==='click'?'':' disabled')+'>'+tr(WAIT==='time'?'A moment…':'Continue →')+'</button>';
  }
  if(g.chap&&g.chap.part)html='<button class="opt cont late" type="button" data-i="go">'+tr('Begin '+g.chap.day.toLowerCase()+' →')+'</button>';
  if(g.finalFrame){speaker='N';text='';html='<button class="opt cont" type="button" data-i="go">'+tr('The week, itemised →')+'</button>';}   // 0.97: says where it goes (the epilogue)
  text=tr(text);   // 0.89: prompts, hold texts, captions
  var icon=speaker==='H'?'human':speaker==='S'?'':speaker==='N'?'narrator':'other';
  // Narration is unlabelled and in italics, as in most narrative games: a voice, not a character. Screen readers still hear “Narrator”.
  var label=speaker==='N'?'<b class="sr">'+tr(NAMES.N)+'</b>':'<b>'+tr(NAMES[speaker])+'</b>';
  elLine.innerHTML='<span class="speaker-icon '+icon+'" aria-hidden="true"></span><div class="w-'+speaker+'">'+label+'<p'+(cur&&cur.loud?' class="loud"':cur&&cur.quiet?' class="quiet"':'')+'>'+emph(esc(text))+'</p></div>';
  if(g.finalFrame||g.chap&&g.chap.part)elLine.innerHTML='';   // the part card carries its own caption
  // Said once, not twice: when the line is already readable in a bubble (or on the outside card), the panel keeps it
  // only for screen readers. Bigger text, a small scene, or the "Text below" setting brings the panel text back.
  elLine.classList.toggle('echo',!textBelow&&(g.out&&!g.out.inside?(g.out.anim==='text'||!COMPACT):WAIT==='click'&&!!cur&&lineInBubble(cur)));
  elOpts.innerHTML=html;
  elOpts.classList.toggle('who-S',WAIT==='choice'&&(g.choiceWho||'S')==='S');elOpts.classList.toggle('who-H',WAIT==='choice'&&g.choiceWho==='H');
  for(var nn=2;nn<=5;nn++)elOpts.classList.toggle('n'+nn,WAIT==='choice'&&!!CH&&CH.length===nn);   // column count without :has (older Android web views)   // whose words these are, in their colour
  if(WAIT==='fight'&&g.fight.paced&&g.fight.focusControls){
    var nextControl=elOpts.querySelector('[data-i=read]');if(nextControl&&!nextControl.disabled)nextControl.focus();
  }
  document.getElementById('hint').textContent=WAIT==='auto'?'Nothing to do. It’s handled.':WAIT==='lamp'?'The lamp.':WAIT==='qte'?'Arrow keys and Space, in this order. Or tap the buttons. Two seconds have been added for reading. Reality did not add them.':lensFree()?'Move the glass over the room. Everything looks worse through it. That is its job.':WAIT==='fight'?'Tap to swat the nearest reply. Waiting lets it come close enough to read.':WAIT==='toss'?'Drag the card and let go of it. Tapping works too, but it needs persuading.':WAIT==='hold'?'Press and hold the button or the scene. A few taps work too. Letting go is allowed.':WAIT==='stretch'?'Drag up on the scene, or use the slider. No rush.':WAIT==='choice'?'Choose a line · keys 1–4 · every choice keeps the story moving.':g.started?'Space / Enter to continue · P to pause · Dialogue to look back.':'Take your time. The coffee can wait.';
  if(WAIT==='fight'&&g.fight.paced)document.getElementById('hint').textContent='No timer. Use the buttons to read or swat. Space / Enter or tapping the scene swats.';
  if(g.chap&&g.chap.part)document.getElementById('hint').textContent='A place to pause. Continue when you’re ready.';
  if(g.finalFrame)document.getElementById('hint').textContent='Stay a little, if you like.';
  else if(WAIT==='click'&&hotOn())document.getElementById('hint').textContent='Space / Enter to continue · P to pause · Dialogue to look back · Things in the room can be tapped.';   // a whole line, not a joined one: it has to translate
  if(WAIT==='auto')document.getElementById('hint').textContent='The human can answer without checking with Ekskyysmi.';
  var hintEl=document.getElementById('hint');hintEl.textContent=tr(hintEl.textContent);
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
  if(i==='go')userAdvance();else choose(+i);
});
var swallowClick=false;
cv.addEventListener('click',function(e){if(G&&G.epi&&!paused){epiTap();return;}if(swallowClick){swallowClick=false;return;}if(paused&&G.started&&!G.ended){togglePause();return;}if(lensFree()){lensTap(e);return;}if(WAIT==='hold'){holdClick();return;}if(WAIT==='toss')return;if(hotTap(e))return;if(WAIT!=='stretch')userAdvance();});
cv.addEventListener('pointerdown',function(e){if(WAIT==='hold'){holdDown();try{cv.setPointerCapture(e.pointerId);}catch(_){}}});
elOpts.addEventListener('pointerdown',function(e){var t=e.target&&e.target.closest?e.target.closest('[data-i=hold]'):null;if(t)holdDown();});
window.addEventListener('pointerup',holdUp);window.addEventListener('pointercancel',holdUp);window.addEventListener('blur',holdUp);

/* ================= hands-on moments: used sparingly, about one a day ================= */
var HOLD_LABEL={rewind:'Hold: rewind',cover:'Hold: cover the eyes',pull:'Hold: walk out',still:'Hold: keep perfectly still',stay:'Hold: stay',sit:'Hold: sit',sign:'Hold: sign',ski:'Hold: ski',bird:'Hold: make the bird'};
var NOPE=['That one isn’t available. I’m sitting on it.','Still sitting on it.','It’s very comfortable, actually.','Press it all day. I have nowhere to be.'];
// “(Say nothing.)” is on the menu all week and greyed out until Thursday rewrites the job: the arc, shown in the interface.
// hush(then) opens it, hush() keeps it shut. It is always the last option.
var HUSHNOPE=['That isn’t a setting.','Silence is how they get you.','I don’t have that button. I looked.','Somebody has to talk. It’s always been me.'];
function hush(then){return then?{t:'(Say nothing.)',hush:1,m:'hush',then:[['S','…',{quiet:1}]].concat(then)}:{t:'(Say nothing.)',hush:1,off:true};}
var textBelow=false;try{textBelow=window.localStorage.getItem('ekskyysmi.below')==='on';}catch(e){}
function lineInBubble(l){var g=G;
  var width=cv.clientWidth||0;
  var compact=document.documentElement.classList.contains('immersive');
  if(textBelow)return false;
  if(textStep>1)return false;   // the player asked for large text: the panel reads better than a bubble
  if(l.who==='N')return width>=740&&!!g.band&&!compact;   // the narrator's band stays on wide, windowed screens
  if(width<(compact?480:520))return false;   // a small landscape scene has room for a readable bubble
  if(l.big&&l.who==='S')return true;
  if((l.who==='S'&&!g.night||l.who==='H')&&g.human.gone)return false;if(l.who==='S'&&g.morko.asleep)return false;
  if(l.who==='T')return !!g.bar;
  if(l.who==='X')return !!g.bar||!!(g.bus&&(g.set==='busstop'||g.set==='bus'));   // the bar stranger, or the colleague at the bus stop
  return 'SHABPRLZYW'.indexOf(l.who)>=0;}
function nope(i){var o=CH[i],L=o.hush?HUSHNOPE:NOPE;o.tried=(o.tried||0)+1;G.nopeMsg=o.note||L[Math.min(o.tried-1,L.length-1)];G.morko.mood='stern';sfx('nope');render();}
function holdText(){
  var h=G.hold,on=h.on||h.tap>0;
  if(h.kind==='rewind')return on?'Back… back… to the end of it.':'Rewind. Just the last bit.';
  if(h.kind==='sit')return on?h.o.text:'Hold to sit down. Do nothing else.';
  if(h.kind==='sign')return on?h.o.text:'Hold to sign.';
  if(h.kind==='ski')return on?'Kick. Glide. Kick. Glide.':'Hold to ski to the door.';
  if(h.kind==='bird')return on?(h.o.text||'Flap. Flap.'):'Hold to make the bird.';
  if(h.kind==='cover')return h.wave?'Sanna is waving. Your human can’t see it.':on?'Hands over the eyes. Nothing gets in.':'Hold to keep the eyes covered.';
  if(h.kind==='pull')return on?'This way. Briskly. Don’t look back.':'Hold to walk out of the room.';
  if(h.kind==='still')return on?'Nobody move. We are a lamp.':'Hold to keep perfectly still.';
  return on?(h.o.text||'Staying. This is me staying.'):'Hold to stay. Do nothing else.';
}
function holdDown(){if(WAIT!=='hold'||paused||!G.hold)return;G.hold.on=true;G.hold.downAt=Date.now();}
function holdUp(){if(swallowClick&&typeof setTimeout==='function')setTimeout(function(){swallowClick=false;},120);if(G&&G.hold&&G.hold.on){G.hold.on=false;G.hold.long=Date.now()-G.hold.downAt>260;}}
function holdClick(){var h=G.hold;if(!h||paused)return;if(h.long){h.long=false;return;}holdTap();}
function holdTap(){var h=G.hold;if(!h)return;h.p+=0.9;h.tap=0.6;holdStep(h,true,0);if(G.hold===h&&h.p>=h.secs)finishHold();}
function holdStep(h,on,dt){
  var g=G,M=g.morko,Hm=g.human,f=clamp(h.p/h.secs,0,1);
  if(h.kind==='rewind'){
    if(g.tape)g.tape.rw=on;if(on&&!h.snd){h.snd=1;sfx('rewind');}M.mood='alert';
  }else if(h.kind==='cover'){
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
    if(g.form)g.form.sig=f;
  }else if(h.kind==='ski'){   // Snow indoors.: the human glides to the door; on the snow the shadow turns blue
    Hm.xT=h.o.from+(h.o.to-h.o.from)*f;M.pose=null;M.mood=on?'alert':'worry';if(g.dream)g.dream.blueT=f;
  }else if(h.kind==='bird'){   // By the radiator (0.99.47): the player makes the bird; let go and the hands drop
    M.pose=on?'puppet':null;M.mood='care';if(on&&!h.snd){h.snd=1;sfx('flutter');}if(!on)h.snd=0;
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
  if(h.kind==='rewind'){if(g.tape)g.tape.rw=false;}   // 0.95: its own branch (0.94 fell through to the comforting arm below)
  else if(h.kind==='cover'){g.aWave=false;g.aFace=1;
    if(g.peeked){M.pose=null;g.leak='none';Q=[['H','…She’s waving.'],['S','I looked away for ONE second.'],['H','Hi.']].concat(Q);}else M.pose='cover';}
  else if(h.kind==='pull'){M.pose='pull';Hm.xT=-90;Hm.back=true;g.cupLeft=true;g.lines=[];}
  else if(h.kind==='still'){M.pose='hold';Hm.face='stiff';g.aFace=1;}
  else if(h.kind==='sit'){M.sT=0.62;g.anx=0.05;}
  else if(h.kind==='sign'){if(g.form)g.form.sig=1;}
  else if(h.kind==='ski'){Hm.xT=h.o.to;M.pose=null;if(g.dream)g.dream.blueT=1;}
  else if(h.kind==='bird'){M.pose='puppet';}
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
  if(o.s!=null){var ds=o.s-M.sT;   // 0.86: a big change in size is heard; at most once a second and a half, never on top of a hit, never in the epilogue (its song)
    if(Math.abs(ds)>=0.35&&!g.epi&&g.time-(g.sizeSfxT==null?-9:g.sizeSfxT)>1.5&&g.time-(g.hitT==null?-9:g.hitT)>0.8){g.sizeSfxT=g.time;sfx(ds>0?'grow':'shrink');}
    M.sT=o.s;}
  if(o.mood)M.mood=o.mood;if('pose' in o)M.pose=o.pose;if(o.st)M.st=o.st;
  if(o.face)Hm.face=o.face;if('back' in o)Hm.back=o.back;if(o.flinch)Hm.flinch=o.flinch;if(o.hx!=null)Hm.xT=o.hx;
  if(o.anx!=null)g.anx=o.anx;if(o.ax!=null)g.axT=o.ax;if(o.bx!=null)g.bxT=o.bx;if(o.near)g.axT=Hm.x+92;
  if(o.aFace)g.aFace=o.aFace;if(o.bFace)g.bFace=o.bFace;if('aWave' in o)g.aWave=o.aWave;
  if(o.cowA)g.cowA=true;if(o.cowB)g.cowB=true;if(o.rate!=null)g.rate=o.rate;
  if(o.hud)g.hud=true;if(o.plan)g.plan=true;
  if(o.sweat!=null)Hm.sweatT=o.sweat;if(o.blush!=null)Hm.blush=o.blush;if(o.aSweat!=null)g.aSweat=o.aSweat;
};}
function hit(k,from){return function(){
  var g=G;g.lines=[];g.band=null;g.cur=null;g.flash=k;g.human.flinch=1;g.human.face='stiff';
  g.hitT=g.time;g.morko.sT=1.45+0.55*k;g.morko.mood='scared';g.anx=k;g.pulse=k;g.shake=RM?0:k;g.gazeFrom=from==='A'?'after':(from||'A');g.gazeT=from==='P'?0:0.85*k;sfx('hit');g.darkT=0.95*k;
  g.camRate=null;if(!hitFrame(k,from)){g.cz=1.05+0.06*k;g.cx=W/2+10;g.cy=258;}g.human.blush=Math.max(g.human.blush,k);
  trigger();addLived('jolts to the chest',Math.round(LIVED.hit*k));
};}
function archive(kind,items){return function(){
  var g=G;for(var i=0;i<items.length;i++)g.cards.push({kind:kind,year:tr(items[i][0]),text:tr(items[i][1]),t:-i*0.45,life:null,
    x:kind==='good'?790:170+i*310,y:kind==='good'?178:150+(i%2)*46,rot:kind==='good'?-0.03:((i%2?1:-1)*(0.06+i*0.02))});
  if(kind==='bad'){addLived('archive visits',LIVED.archive);g.files=(g.files||0)+items.length;}   // old files reopened, for the receipt
  if(kind!=='bad')sfx('card');   // red cards make their own bang as each one lands (update loop)
};}
// The other drawer. All week Ekskyysmi files the good things it calls irrelevant. Nobody sees where. (TYOSUUNNITELMA.md, section 2)
function keep(id){return function(){var k=G.kept||(G.kept=[]);if(k.indexOf(id)<0)k.push(id);};}
var KEPT={hi:['MONDAY','She said hi first.'],compliments:['TUESDAY','Three compliments. Not misplaced. Filed here.'],
  eero:['WEDNESDAY','Eero hates presenting. Kept. Not posted.'],library:['PAGE 212','Someone else loves lighthouses too.'],
  asked:['FRIDAY','She was going to ask. That Monday.'],askedYes:['FRIDAY','She was glad she asked.'],drawing:['YEAR 2','The drawing. Before anyone laughed.']};
function openDrawer(){var g=G,ids=(g.kept||[]).filter(function(k){return KEPT[k];}).concat(['drawing']).slice(0,6);g.cards=[];
  for(var i=0;i<ids.length;i++){var c=KEPT[ids[i]];g.cards.push({kind:'good',year:c[0],text:c[1],t:-0.4-i*0.75,life:null,x:i%2?795:165,y:115+Math.floor(i/2)*125,rot:(i%2?1:-1)*0.025});}   // two side columns: the middle stays free for the two of them
  g.drawer=true;sfx('card');}
function closeArchive(){var g=G;g.drawer=false;for(var i=0;i<g.cards.length;i++)if(g.cards[i].life==null)g.cards[i].life=Math.max(0,g.cards[i].t)+0.35;}
function drawCards(){
  var g=G,sticky=g.cards.some(function(c){return c.kind==='bad'&&c.life==null;});
  if(sticky){ctx.fillStyle='rgba(14,12,20,.45)';ctx.fillRect(0,0,W,H);}
  for(var i=0;i<g.cards.length;i++){var c=g.cards[i];if(c.t<0)continue;
    var a=clamp(c.t/0.25,0,1)*(c.life==null?1:clamp((c.life-c.t)/0.35,0,1)),drop=RM?0:Math.max(0,1-c.t/0.35)*-60;
    ctx.save();ctx.globalAlpha=a;ctx.translate(c.x,c.y+drop);ctx.rotate(RM?0:c.rot);
    var good=c.kind==='good';ctx.fillStyle=good?'#fff4d6':'#f6f1e4';ctx.strokeStyle=good?'#e2b04a':'#8b8070';ctx.lineWidth=good?3:1.5;
    rr(-140,-56,280,112,5);ctx.fill();ctx.stroke();
    ctx.fillStyle=good?'#e2b04a':'#c9553f';ctx.fillRect(-140,-56,280,24);
    ctx.textAlign='left';ctx.textBaseline='middle';ctx.font='700 13px system-ui,sans-serif';ctx.fillStyle='#fffdf6';ctx.fillText(tr(good?'ARCHIVE · THE OTHER PILE · ':'ARCHIVE · ')+tr(c.year),-128,-44);
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
function calm(){var g=G;g.human.sweatT=0;g.gazeT=0;g.darkT=0;g.anx=0.25;g.morko.sT=1.15;g.morko.mood='calm';g.morko.pose=null;g.human.face='neutral';g.cz=1.025;g.cx=W/2;g.cy=H/2;g.camRate=null;g.hidS=null;}
function prevent(label,quiet){return function(){G.prevented++;if(quiet)return [];startStamp('press');return [{wait:0.85}];};}   // quiet: counted, not stamped (one stamp on Monday is the joke, two is a lecture)
function outside(o,len){return [function(){G.lines=[];G.band=null;o.t=0;G.out=LANG!=='en'?{title:tr(o.title),dur:tr(o.dur),cap:tr(o.cap),anim:o.anim,t:0}:o;stopVoice();sfx('cut');},{view:true},function(){G.out=null;}];}
function leave(){G.axT=1120;G.bxT=1200;G.aFace=1;G.bFace=1;}
function frozen(){var g=G;sfx('startle');g.morko.st='frozen';g.startles++;g.human.flinch=1;}
function hide(){G.morko.st='hide';}
function pokka(){G.morko.st='pokka';G.morko.sT=1.5;}
function free(){G.morko.st='free';G.morko.mood='alert';}

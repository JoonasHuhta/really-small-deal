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
    if(s.qte){startQte();return;}
    if(s.fight){startFight(s.fight);return;}
    if(s.choice){G.bick=0;G.nopeMsg=null;CH=typeof s.choice==='function'?s.choice():s.choice;WAIT='choice';LOCK=0.4;render();return;}
  }
}
function advance(){if(paused||LOCK>0||WAIT==='qte')return;if(WAIT==='fight'){swat();return;}if(WAIT==='hold'){holdTap();return;}if(WAIT==='toss'){tossTap();return;}if(WAIT==='stretch'){G.warningSize=G.morko.sT;G.morko.pose=null;run();}else if(WAIT==='click'||(WAIT==='view'&&TIMER<=0))run();}
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
  g.phoneN=who==='P'?3:Math.max(0,(g.phoneN||0)-1);if(who==='P'&&!/^You:/.test(text))g.buzz=0.7;
  g.cur={who:who,text:text,big:!!(o&&o.big),loud:!!(o&&o.loud),quiet:!!(o&&o.quiet),look:(o&&o.look)||null};g.curT=0;speak(who,text);if(o&&o.loud&&!RM)g.shake=Math.max(g.shake||0,0.25);
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
  document.getElementById('hint').textContent=WAIT==='qte'?'Arrow keys and Space, in this order. Or tap the buttons. Two seconds have been added for reading. Reality did not add them.':lensFree()?'Move the glass over the room. Everything looks worse through it. That is its job.':WAIT==='fight'?'Tap to swat the nearest reply. Waiting lets it come close enough to read.':WAIT==='toss'?'Drag the card and let go of it. Tapping works too, but it needs persuading.':WAIT==='hold'?'Press and hold the button or the scene. A few taps work too. Letting go is allowed.':WAIT==='stretch'?'Drag up on the scene, or use the slider. No rush.':WAIT==='choice'?'Choose a line · keys 1–4 · every choice keeps the story moving.':g.started?'Space / Enter to continue · P to pause · Dialogue to look back.':'Take your time. The coffee can wait.';
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
var HOLD_LABEL={cover:'Hold: hands over their eyes',pull:'Hold: walk them out',still:'Hold: keep them perfectly still',stay:'Hold: stay'};
var NOPE=['That one isn’t available. I’m sitting on it.','Still sitting on it.','It’s very comfortable, actually.','Press it all day. I have nowhere to be.'];
function nope(i){var o=CH[i];o.tried=(o.tried||0)+1;G.nopeMsg=NOPE[Math.min(o.tried-1,NOPE.length-1)];G.morko.mood='stern';sfx('nope');render();}
function holdText(){
  var h=G.hold,on=h.on||h.tap>0;
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

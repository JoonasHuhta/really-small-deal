/* ================= overlays ================= */
function showOv(html,kind){ov.innerHTML='<div class="card">'+html+'</div>';ov.className='ov on';ov.dataset.kind=kind||'title';}
function hideOv(){ov.className='ov';ov.innerHTML='';}
function showChapters(){
  var sv=loadProgress(),h='<div class="eyebrow">Chapters</div><h2>Pick a moment.</h2><div class="lab-list">';
  for(var i=1;sv&&i<=sv.unlocked&&i<=5;i++)h+='<button class="lab" type="button" data-ch="'+i+'"><b>'+CHAPTERS[i].title+'</b><span>'+CHAPTERS[i].day.charAt(0)+CHAPTERS[i].day.slice(1).toLowerCase().replace(/\b(mon|tues|wednes|thurs|fri)day\b/g,function(d){return d.charAt(0).toUpperCase()+d.slice(1);})+'</span></button>';
  showOv(h+'</div><p class="small">Each one starts from its beginning and runs on into the moments after it.</p><button class="go alt" type="button" data-go="menu">Back</button>','menu');
}
// The version is already in the page: index.html asks for game.js?v=<version>.
function gameVersion(){var e=document.querySelector&&document.querySelector('script[src*="game.js"]'),m=e&&e.src&&/[?&]v=([^&]+)/.exec(e.src);return m?' '+m[1]:'';}
function showAbout(){
  showOv('<div class="eyebrow">About</div><h2>What is this?</h2>'+
   '<p>You play Ekskyysmi, the overprotective shadow of a perfectly ordinary human. The human has one small plan: ask Sanna from work to lunch. You have concerns.</p>'+
   '<p>About 45 minutes. Read at your own pace: almost nothing is timed. The one thing that is, is unfair on purpose. Conversations don’t wait either.</p>'+
   '<p>It’s a comedy about rejection sensitivity, meant kindly. It isn’t advice.</p>'+
   '<p class="small">Alpha'+gameVersion()+', still changing. Made by Joonas Huhta (MoshBitSurfers).</p>'+
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
   '<button class="link" type="button" data-go="moments">Moments</button>'+(DEVLAB?'<button class="link" type="button" data-go="lab">Scenario lab</button>':'')+'<button class="link" type="button" data-go="settings">Settings</button><button class="link" type="button" data-go="about">About</button></div>');
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
  var snap=null;try{if(cv.width&&document.createElement){snap=document.createElement('canvas');snap.width=cv.width;snap.height=cv.height;var sc=snap.getContext&&snap.getContext('2d');if(sc)sc.drawImage(cv,0,0);else snap=null;}}catch(e){snap=null;}   // the title picture, to fade from
  reset(day);G.snap=snap;G.started=true;G.chapter=1;newDay();
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
  if(go==='moments'){reset(null);showMoments();return;}
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
    if(!G.started){startGame(null,false);}else userAdvance();
    e.preventDefault();
  }else if((e.key==='f'||e.key==='F')&&tag!=='INPUT'){toggleFull();}else if(e.key>='1'&&e.key<='4'&&tag!=='INPUT'){choose(+e.key-1);}
  else if(e.key==='p'||e.key==='P'){togglePause();}
});
function syncPause(){if(paused||appHidden){stopVoice();holdUp();dragging=false;}syncAudioState();syncWake();document.getElementById('pause').textContent=paused?'Resume':'Pause';document.body.classList.toggle('is-paused',paused);}
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
function belowUI(){var b=document.getElementById('below');if(b)b.setAttribute('aria-pressed',String(textBelow));}
(function(){var b=document.getElementById('below');if(!b)return;b.addEventListener('click',function(){
  textBelow=!textBelow;try{window.localStorage.setItem('ekskyysmi.below',textBelow?'on':'off');}catch(e){}belowUI();render();sfx('pick');});belowUI();})();
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
function setMenu(on){if(on!==document.body.classList.contains('menu-open'))sfx(on?'menuOn':'menuOff');document.body.classList.toggle('menu-open',on);if(menuBtn&&menuBtn.setAttribute)menuBtn.setAttribute('aria-expanded',String(on));}
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
(function(){var done=false;function first(){if(done)return;done=true;firstTouch=true;if(musicEl&&musicEl.preload==='none')musicEl.preload='auto';syncMusic();}
  if(document.addEventListener){document.addEventListener('pointerdown',first,true);document.addEventListener('keydown',first,true);document.addEventListener('touchstart',first,true);}})();

// The screen stays on while someone is reading. In a browser this is the Wake Lock API: held while a story is running,
// unpaused and visible, and let go after five minutes without a touch, so a phone left on the table can still sleep.
// The Android app keeps the screen on natively (GameApp.java): its WebView has no wake lock.
var wakeLock=null,wakeAsking=false,lastInput=Date.now();
function wantAwake(){return !!(G&&G.started&&!G.ended&&!paused&&!appHidden&&Date.now()-lastInput<300000);}
function syncWake(){
  var nav=window.navigator;if(!nav||!nav.wakeLock||typeof nav.wakeLock.request!=='function')return;
  if(wantAwake()){
    if(wakeLock||wakeAsking)return;wakeAsking=true;
    nav.wakeLock.request('screen').then(function(l){wakeAsking=false;wakeLock=l;l.addEventListener&&l.addEventListener('release',function(){if(wakeLock===l)wakeLock=null;});if(!wantAwake())syncWake();})
      .catch(function(){wakeAsking=false;});
  }else if(wakeLock){var l=wakeLock;wakeLock=null;try{l.release();}catch(e){}}
}
if(document.addEventListener){['pointerdown','keydown','touchstart'].forEach(function(t){document.addEventListener(t,function(){lastInput=Date.now();if(typeof setTimeout==='function')setTimeout(syncWake,0);else syncWake();},true);});   // after the game has handled the touch
  document.addEventListener('visibilitychange',function(){if(typeof setTimeout==='function')setTimeout(syncWake,0);else syncWake();});}
if(typeof setInterval==='function')setInterval(syncWake,15000);

// Every ordinary button answers with a small tick. Story choices and the menu have their own sounds.
if(document.addEventListener)document.addEventListener('click',function(e){
  var b=e&&e.target&&e.target.closest&&e.target.closest('button');
  if(!b||b.id==='menu'||b.id==='sound'||b.classList.contains('opt')||b.disabled)return;sfx('ui');
},true);

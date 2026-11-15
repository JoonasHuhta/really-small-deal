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
   '<p>Small moments from one ordinary life, in no particular hurry. About 45 minutes. Read at your own pace. Nothing is timed.</p>'+
   '<p>It’s a comedy about rejection sensitivity, meant kindly. It isn’t advice.</p>'+
   '<button class="go alt" type="button" data-go="menu">Back</button>','menu');
}
function showWeekEnd(){
  var g=G;g.ended=true;g.dayEnd=false;WAIT=null;Q=[];render();
  var note=g.no?'One “no” was said out loud. Everyone survived, including Eero.':'The “no” is still in its box. It keeps.';
  showOv('<div class="eyebrow">For now</div><h2>Still here. Both of you.</h2>'+
   '<p class="small job-line">Ekskyysmi’s job: <s>Keep you from being rejected.</s> Stay with you when it happens.</p>'+
   '<p>A string of small moments. One “oh, hi”, twice.<br>It went off both times. The second time, somebody stayed.</p>'+
   '<div class="end-note"><p>'+note+'</p></div>'+
   '<p class="title-quote">“For the record, I intend to go off again on Monday.”</p>'+
   '<button class="go" type="button" data-go="start">New game →</button><button class="go alt" type="button" data-go="menu">Title screen</button>','end');
}
function showTitle(){
  var sv=loadProgress();
  G.human.x=G.human.xT=755;G.morko.s=G.morko.sT=1.25;G.morko.off=-75;G.morko.mood='care';updHands(1);
  showOv('<h1 class="logo"><svg class="logo-eyes" viewBox="0 0 64 64" aria-hidden="true"><path d="M44 44l13 13" stroke="#ebbd79" stroke-width="8" stroke-linecap="round"/><circle cx="28" cy="28" r="20" fill="#14111d" stroke="#f4eddf" stroke-width="6"/><ellipse cx="21.5" cy="27" rx="4.8" ry="6.4" fill="#faf4e5"/><ellipse cx="34.5" cy="27" rx="4.8" ry="6.4" fill="#faf4e5"/><g class="pupils"><circle cx="23" cy="28.2" r="2.2" fill="#14111d"/><circle cx="36" cy="28.2" r="2.2" fill="#14111d"/></g></svg><span>Really Small Deal<span class="logo-dot">.</span></span></h1>'+
   '<p class="tagline">A small moment.<br>A very long shadow.</p>'+
   (sv?'<button class="go" type="button" data-go="cont">Continue · '+dayName(sv.ch)+' <span aria-hidden="true">→</span></button><button class="go alt" type="button" data-go="start">New game</button>'
      :'<button class="go" type="button" data-go="start">New game <span aria-hidden="true">→</span></button>')+
   '<div class="menu-links">'+(sv?'<button class="link" type="button" data-go="chapters">Chapters</button>':'')+
   '<button class="link" type="button" data-go="lab">Scenario lab</button><button class="link" type="button" data-go="about">About</button></div>');
  render();
}
var DAYNAME={A:'benign',B:'sensitive',C:'dismissive'};
function showEnd(){
  var g=G,n=g.startles;g.ended=true;g.dayEnd=true;WAIT=null;Q=[];render();saveProgress(2);
  var note=g.lunch===1?'Lunch happened. So did the worrying. Both fitted into the same day.':g.lunch===2?'A message sent. Lunch tomorrow. The shadow is reviewing the menu.':g.day==='C'?(g.reflected?'Today hurt. You reached for someone who makes room for you.':'Today hurt. Their choice to leave you out was theirs.'):'The invitation stayed unspoken. The story can still continue tomorrow.';
  if(g.day==='C'&&g.leak==='exit'&&!g.reflected)note='Today felt lonely. Not every missing piece needs filling in tonight.';
  var quote={grow:'I was very convincing furniture.',cover:'I maintain that the cup was very safe.',exit:'Next time, we bring the coffee.',none:'I wobbled. We went anyway.'}[g.leak];
  showOv('<div class="eyebrow">End of Monday</div><h2>Home. Both of you.</h2>'+
   '<p>The greeting lasted two seconds.<br>The shadow took the scenic route.</p>'+
   '<div class="end-note"><p>'+note+'</p></div>'+
   '<p class="title-quote">“'+quote+'”</p>'+
   '<button class="go" type="button" data-go="next">Carry on →</button>'+
   '<button class="go alt" type="button" data-go="same">Try another approach</button>'+
   '<button class="go alt" type="button" data-go="again">Another Monday</button>'+
   '<p class="small">Another approach replays this Monday. Another Monday changes what was happening around you.</p>','end');
}
function startGame(day,skip){
  reset(day);G.started=true;
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
  if(go==='lab'){reset(null);showLab();return;}
  if(go==='chapters'){showChapters();return;}
  if(go==='about'){showAbout();return;}
  if(go==='start')startGame(null,false);
  else if(go==='cont'){var sv=loadProgress();startChapter(sv?sv.ch:1);}
  else if(go==='next'){hideOv();G.ended=false;G.dayEnd=false;Q=chain(2);run();}
  else if(go==='menu'){reset(null);showTitle();}
  else if(go==='again')startGame(null,true);
  else if(go==='same')startGame(G.day,true);
  else if(go==='cancel'){hideOv();paused=modalWasPaused;syncPause();}
  else if(go==='restart'){reset(null);showTitle();}
});

/* ================= input ================= */
window.addEventListener('keydown',function(e){
  if(logDialog.open||ov.dataset.kind==='restart'&&ov.classList.contains('on'))return;
  if(e.repeat)return;
  var tag=e.target.tagName;
  if(e.key===' '||e.key==='Enter'){
    if(tag==='BUTTON'||tag==='INPUT'||tag==='A')return;
    if(!G.started){startGame(null,false);}else advance();
    e.preventDefault();
  }else if(e.key>='1'&&e.key<='4'&&tag!=='INPUT'){choose(+e.key-1);}
  else if(e.key==='p'||e.key==='P'){togglePause();}
});
function syncPause(){if(paused)stopVoice();document.getElementById('pause').textContent=paused?'Resume':'Pause';document.body.classList.toggle('is-paused',paused);}
function togglePause(){if(!G.started||G.ended||logDialog.open||ov.classList.contains('on'))return;paused=!paused;syncPause();}
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
  document.getElementById('log-content').innerHTML=history.map(function(l){return '<div class="log-entry"><b>'+NAMES[l.who]+'</b><p>'+esc(l.text)+'</p></div>';}).join('');
  logDialog.showModal();
});
document.getElementById('close-log').addEventListener('click',function(){logDialog.close();});
logDialog.addEventListener('close',function(){paused=modalWasPaused;syncPause();document.getElementById('journal').focus();});
function motionUI(){document.getElementById('motion').setAttribute('aria-pressed',String(RM));document.body.classList.toggle('reduce-motion',RM);}
document.getElementById('motion').addEventListener('click',function(){RM=!RM;motionUI();});
motionUI();
document.getElementById('sound').addEventListener('click',function(){soundOn=!soundOn;if(!soundOn){stopVoice();var mn=musicName;music(null);musicName=mn;}else{preloadSounds();var mn2=musicName;musicName=null;music(mn2);}try{window.localStorage.setItem('ekskyysmi.sound',soundOn?'on':'off');}catch(e){}soundUI();if(soundOn)sfx('pick');});
soundUI();
function backButton(){
  if(logDialog.open){logDialog.close();return 'log';}
  if(!G.started||G.ended){if(ov.innerHTML.indexOf('data-go="start"')>=0)return 'exit';reset(null);showTitle();return 'title';}
  if(paused){paused=false;syncPause();reset(null);showTitle();return 'title';}
  togglePause();return 'pause';
}
var CAP=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;
if(CAP&&CAP.addListener)CAP.addListener('backButton',function(){if(backButton()==='exit'&&CAP.exitApp)CAP.exitApp();});
// Phones: the controls fold away behind one button so that only the scene and the words are on screen.
var menuBtn=document.getElementById('menu');
function setMenu(on){document.body.classList.toggle('menu-open',on);if(menuBtn&&menuBtn.setAttribute)menuBtn.setAttribute('aria-expanded',String(on));}
if(menuBtn&&menuBtn.addEventListener){
  menuBtn.addEventListener('click',function(e){if(e&&e.stopPropagation)e.stopPropagation();setMenu(!document.body.classList.contains('menu-open'));});
  document.addEventListener('click',function(){if(document.body.classList.contains('menu-open'))setMenu(false);});
}
document.addEventListener('visibilitychange',function(){if(document.hidden&&!paused)togglePause();});

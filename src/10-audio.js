/* ================= sound: speech blips and a few effects ================= */
var AC=null,BUS=null,SFXGAIN=1.3,soundOn=true,voiceNodes=[];   // effects and voices a notch louder than before, so the music stays underneath
try{soundOn=window.localStorage.getItem('ekskyysmi.sound')!=='off';}catch(e){}
function audio(){
  if(!soundOn||paused||appHidden)return null;var A=window.AudioContext||window.webkitAudioContext;if(!A)return null;
  if(!AC){try{AC=new A();BUS=AC.createGain();BUS.gain.value=SFXGAIN;BUS.connect(AC.destination);}catch(e){return null;}}
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
  o.connect(g);g.connect(BUS||AC.destination);o.start(t0);o.stop(t0+dur+0.02);return o;
}
// Room for recorded sound. List a file under an effect's name and it replaces the synthesized version;
// list a loop under MUSIC and music('name') plays it. A missing or undecodable file falls back to the synth or to silence.
var SAMPLES={/* hit:'assets/audio/hit.ogg', swat:'assets/audio/swat.ogg' */};
// Music is streamed through an <audio> element, not decoded into memory: a three-minute track would cost a phone ~60 MB.
// A browser will not start it before the first touch or key, so anything that fails to start is retried on the first gesture.
var MUSIC={title:'assets/audio/title.mp3' /* , walk:'assets/audio/walk-home.mp3', night:'assets/audio/0307.mp3' */};   // Monday’s track was tried (0.43) and removed (0.50): the first scene plays without music
var firstTouch=false,BUF={},LOADING={},musicEl=null,musicName=null,MUSICVOL=0.45,fading=[];
// Scene music is background: well under the voices. It fades in, and steps aside for a moment when something lands.
var MUSICVOLS={},MUSICFADEIN={},musicLvl=1,talkLvl=1,talkT=null,rampId=null;   // monday.mp3 is mastered at -24 LUFS, ~10 dB under the title track
function musicTarget(){return (MUSICVOLS[musicName]!=null?MUSICVOLS[musicName]:MUSICVOL)*musicLvl*talkLvl;}
// While anyone talks, the music steps back, and returns a moment after the last syllable.
function talkDuck(secs){if(!musicEl||typeof setTimeout!=='function')return;talkLvl=0.4;rampMusic(0.25);
  if(talkT)clearTimeout(talkT);talkT=setTimeout(function(){talkT=null;talkLvl=1;rampMusic(1.4);},secs*1000+450);}
function rampMusic(secs){
  var el=musicEl;if(!el)return;if(typeof setInterval!=='function'){el.volume=musicTarget();return;}
  if(rampId)clearInterval(rampId);var step=Math.max(0.004,musicTarget()/Math.max(1,secs*16));
  rampId=setInterval(function(){if(el!==musicEl){clearInterval(rampId);rampId=null;return;}var t=musicTarget(),v=el.volume;
    if(Math.abs(v-t)<=step){el.volume=t;clearInterval(rampId);rampId=null;}else el.volume=v<t?v+step:v-step;},60);
}
// The music ducks under a hit and comes back by itself.
function duckMusic(){if(!musicEl)return;musicLvl=0.3;if(musicEl)musicEl.volume=Math.min(musicEl.volume,musicTarget());
  if(typeof setTimeout==='function')setTimeout(function(){musicLvl=1;rampMusic(2.5);},1400);}
function loadSound(k,url){
  if(BUF[k]||LOADING[k]||!window.fetch)return;var a=audio();if(!a)return;LOADING[k]=true;
  window.fetch(url).then(function(r){if(!r.ok)throw 0;return r.arrayBuffer();}).then(function(b){return new Promise(function(ok,no){a.decodeAudioData(b,ok,no);});})
    .then(function(buf){BUF[k]=buf;}).catch(function(){LOADING[k]='failed';});
}
function preloadSounds(){for(var k in SAMPLES)loadSound(k,SAMPLES[k]);}
function playBuf(k,vol,loop){var a=audio();if(!a||!BUF[k])return null;var n=a.createBufferSource(),g=a.createGain();n.buffer=BUF[k];n.loop=!!loop;g.gain.value=vol==null?0.8:vol;n.connect(g);g.connect(BUS||a.destination);n.start();return n;}
function fadeOut(el){
  if(typeof setInterval!=='function'){try{el.pause();}catch(e){}return;}
  var id=setInterval(function(){var v=el.volume-0.05;if(v<=0.02){try{el.pause();el.src='';}catch(e){}clearInterval(id);var i=fading.indexOf(el);if(i>=0)fading.splice(i,1);}else el.volume=v;},60);
  fading.push(el);
}
function music(name){
  name=name||null;if(name===musicName&&(musicEl||!MUSIC[name]))return;
  musicName=name;if(musicEl){fadeOut(musicEl);musicEl=null;}
  if(!name||!MUSIC[name]||typeof window.Audio!=='function')return;
  var el=new window.Audio(MUSIC[name]);el.loop=true;el.preload=firstTouch?'auto':'none';musicLvl=1;musicEl=el;
  var fin=MUSICFADEIN[name];el.volume=fin?0:musicTarget();syncMusic();if(fin)rampMusic(fin);
}
function syncMusic(){
  var el=musicEl;if(!el)return;
  try{if(soundOn&&!paused&&!appHidden){var p=el.play();if(p&&p.catch)p.catch(function(){});}else el.pause();}catch(e){}
  if(paused||appHidden||!soundOn)for(var i=0;i<fading.length;i++){try{fading[i].pause();}catch(e){}}
}
// One voice per character: waveform, pitch, loudness. The shadow's pitch drops as it grows.
var VOICE={S:['triangle',185,0.075],H:['sine',330,0.06],A:['sine',494,0.05],B:['triangle',262,0.06],R:['sine',392,0.05],T:['triangle',147,0.06],L:['sine',523,0.05],X:['sine',440,0.05],Z:['triangle',233,0.045]};
function stopVoice(){for(var i=0;i<voiceNodes.length;i++){try{voiceNodes[i].stop();}catch(e){}}voiceNodes=[];}
function speak(who,text,o){
  stopVoice();var a=audio();if(!a)return;var t0=a.currentTime+0.02;
  if(who==='P'){
    if(/^You:/.test(text)){tone(420,t0,0.2,'sine',0.05,1700);tone(1700,t0+0.2,0.07,'sine',0.03);}                 // sent: a whoosh, and no way back
    else if(/^Seen/.test(text)){tone(150,t0,0.3,'sine',0.11,96);}                                                      // seen: one flat thud
    else if(/calling/.test(text)){for(var r=0;r<2;r++)for(var q=0;q<5;q++)tone(q%2?1180:940,t0+r*0.62+q*0.07,0.07,'square',0.03);}
    else{for(var b=0;b<2;b++){tone(92,t0+b*0.2,0.15,'sawtooth',0.085,84);tone(184,t0+b*0.2,0.15,'square',0.02,170);}  // incoming: the table hears it first
      tone(880,t0+0.42,0.09,'sine',0.05);tone(1320,t0+0.52,0.18,'sine',0.05);}
    return;}
  var v=VOICE[who];if(!v)return;
  // The voice follows the text exactly: same letters per second and the same pauses as revealCount (src/20-engine.js),
  // so it lasts to the last word. One syllable every third letter, at most 90.
  var base=who==='S'?v[1]/Math.sqrt(Math.max(0.6,G.morko.sT)):v[1],n=0,cps=o&&o.quiet?30:o&&o.loud?85:55,at=0,last=0;
  for(var i=0;i<text.length&&n<90;i++){
    var c=text.charAt(i);at+=1/cps;
    if(i%3===0&&/[A-Za-z0-9]/.test(c)){
      var loud=/[A-Z]/.test(c)&&/[A-Z]/.test(text.charAt(i+1)||'')?1.14:1;
      voiceNodes.push(tone(base*loud*(0.92+((i*37)%17)/100),t0+at,0.05,v[0],v[2]));n++;last=at;}
    if(c==='…')at+=0.34;else if((c==='.'||c==='?'||c==='!')&&text.charAt(i+1)===' ')at+=0.24;else if(c===','||c===';')at+=0.1;else if(c==='—')at+=0.18;
  }
  if(n)talkDuck(last+0.05);
}
function sfx(k){
  var a=audio();if(!a)return;if(SAMPLES[k]){if(BUF[k]){playBuf(k);return;}loadSound(k,SAMPLES[k]);}var t=a.currentTime+0.01;
  if(k==='hit'){duckMusic();tone(120,t,0.4,'sine',0.24,42);tone(900,t,0.06,'square',0.025,300);for(var hb=0;hb<3;hb++){tone(62,t+0.6+hb*0.75,0.13,'sine',0.14-hb*0.03);tone(54,t+0.78+hb*0.75,0.13,'sine',0.1-hb*0.02);}}
  else if(k==='rewind'){for(var rw=0;rw<7;rw++)tone(1500-rw*120,t+rw*0.045,0.04,'square',0.016,1700-rw*120);tone(90,t+0.36,0.12,'sine',0.06);}
  else if(k==='car'){tone(70,t,1.6,'sawtooth',0.02,140);tone(140,t+0.7,0.9,'sine',0.03,60);}
  else if(k==='pop'){tone(380,t,0.05,'sine',0.035,720);}
  else if(k==='popS'){tone(170,t,0.07,'sine',0.05,310);}
  else if(k==='dotsOff'){tone(560,t,0.09,'sine',0.03,260);}
  else if(k==='ui'){tone(1250,t,0.025,'triangle',0.022);}
  else if(k==='menuOn'){tone(520,t,0.05,'sine',0.035);tone(780,t+0.05,0.07,'sine',0.035);}
  else if(k==='menuOff'){tone(780,t,0.05,'sine',0.03);tone(520,t+0.05,0.07,'sine',0.03);}
  else if(k==='swat'){tone(900,t,0.12,'triangle',0.07,180);tone(240,t+0.02,0.08,'square',0.02,120);}
  else if(k==='stamp'){tone(150,t,0.09,'triangle',0.08,65);tone(780,t,0.025,'square',0.018,260);}
  else if(k==='siren'){for(var si=0;si<4;si++){tone(880,t+si*0.36,0.17,'square',0.022,700);tone(620,t+si*0.36+0.18,0.17,'square',0.022,780);}}   // a small, slightly ridiculous alarm
  else if(k==='clap'){tone(2400,t,0.03,'square',0.05,600);tone(180,t,0.06,'triangle',0.06,90);}
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

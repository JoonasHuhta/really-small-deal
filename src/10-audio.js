/* ================= sound: speech blips and a few effects ================= */
var AC=null,soundOn=true,voiceNodes=[];
try{soundOn=window.localStorage.getItem('ekskyysmi.sound')!=='off';}catch(e){}
function audio(){
  if(!soundOn||paused||appHidden)return null;var A=window.AudioContext||window.webkitAudioContext;if(!A)return null;
  if(!AC){try{AC=new A();}catch(e){return null;}}
  if(AC.state==='suspended')syncAudioState();return AC;
}
function syncAudioState(){
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
var MUSIC={/* walk:'assets/audio/walk-home.ogg', night:'assets/audio/0307.ogg' */};
var BUF={},LOADING={},musicNode=null,musicName=null,MUSICVOL=0.35;
function loadSound(k,url){
  if(BUF[k]||LOADING[k]||!window.fetch)return;var a=audio();if(!a)return;LOADING[k]=true;
  window.fetch(url).then(function(r){if(!r.ok)throw 0;return r.arrayBuffer();}).then(function(b){return new Promise(function(ok,no){a.decodeAudioData(b,ok,no);});})
    .then(function(buf){BUF[k]=buf;if(musicName&&'music:'+musicName===k)music(musicName);}).catch(function(){LOADING[k]='failed';});
}
function preloadSounds(){var k;for(k in SAMPLES)loadSound(k,SAMPLES[k]);for(k in MUSIC)loadSound('music:'+k,MUSIC[k]);}
function playBuf(k,vol,loop){var a=audio();if(!a||!BUF[k])return null;var n=a.createBufferSource(),g=a.createGain();n.buffer=BUF[k];n.loop=!!loop;g.gain.value=vol==null?0.8:vol;n.connect(g);g.connect(a.destination);n.start();return n;}
function music(name){
  if(musicNode&&musicName===name)return;if(musicNode){try{musicNode.stop();}catch(e){}musicNode=null;}
  musicName=name||null;if(!name||!MUSIC[name]||!soundOn)return;
  if(BUF['music:'+name])musicNode=playBuf('music:'+name,MUSICVOL,true);else loadSound('music:'+name,MUSIC[name]);
}
// One voice per character: waveform, pitch, loudness. The shadow's pitch drops as it grows.
var VOICE={S:['triangle',185,0.075],H:['sine',330,0.06],A:['sine',494,0.05],B:['triangle',262,0.06],R:['sine',392,0.05],T:['triangle',147,0.06],L:['sine',523,0.05],X:['sine',440,0.05],Z:['triangle',233,0.045]};
function stopVoice(){for(var i=0;i<voiceNodes.length;i++){try{voiceNodes[i].stop();}catch(e){}}voiceNodes=[];}
function speak(who,text){
  stopVoice();var a=audio();if(!a)return;var t0=a.currentTime+0.02;
  if(who==='P'){tone(880,t0,0.09,'sine',0.05);tone(1320,t0+0.1,0.16,'sine',0.05);return;}
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

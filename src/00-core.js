var W=960,H=540,WALLY=385,FEETY=462,HOME=450,HOMEX=1500;
var LAMPS=[250,690,1130,HOMEX+60];
var cv=document.getElementById('c'),ctx=cv.getContext('2d'),ov=document.getElementById('ov');
// 0.99.39: every word painted on the canvas goes through the dictionary (src/15-fi.js trQ), and is measured as painted, so a
// longer language lays out by its own widths. Until now 250 painted strings (signs, receipts, tags, captions) stayed English.
function i18nCtx(c){if(!c||typeof c.fillText!=='function'||c.i18n===true)return c;var ft=c.fillText,st=c.strokeText,mt=c.measureText;c.i18n=true;
  c.fillText=function(t,x,y,w){t=trQ(t);return w==null?ft.call(c,t,x,y):ft.call(c,t,x,y,w);};
  if(typeof st==='function')c.strokeText=function(t,x,y,w){t=trQ(t);return w==null?st.call(c,t,x,y):st.call(c,t,x,y,w);};
  if(typeof mt==='function')c.measureText=function(t){return mt.call(c,trQ(t));};return c;}
i18nCtx(ctx);   // and the receipt picture's own canvas (35-inside.js)
var elLine=document.getElementById('line'),elOpts=document.getElementById('opts');
var SC=1;
function resize(){var dpr=Math.min(window.devicePixelRatio||1,2);var w=cv.clientWidth||960;cv.width=Math.round(w*dpr);cv.height=Math.round(w*9/16*dpr);SC=cv.width/W;WIDE=w>=520;COMPACT=document.documentElement.classList.contains('immersive');
  var panel=document.getElementById('play-panel'),cr=cv.getBoundingClientRect(),pr=panel.getBoundingClientRect();
  var menu=document.getElementById('menu');
  HUDL=COMPACT&&menu.offsetWidth?Math.max(0,Math.ceil((menu.getBoundingClientRect().right-cr.left)*W/w)):0;
  SCENE_BOTTOM=COMPACT&&G&&G.started&&!G.ended?clamp((pr.top-cr.top)*W/w,120,H):H;
}
var COMPACT=false,HUDL=0,SCENE_BOTTOM=540; // visible space above the reading panel, in canvas units
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
// 0.99.24: the new Moments (59-*.js) register their own rooms, per-frame steps and front layers here, so a scene being tried
// does not have to be wired into the engine, the update loop and the draw order one by one.
var SETS={},MSTEP=[],MFRONT=[];
var NAMES={S:'EKSKYYSMI',H:'HUMAN',A:'SANNA',B:'EERO',P:'PHONE',N:'NARRATOR',R:'RIITTA',Z:'SANNA’S SHADOW',Y:'EERO’S SHADOW',W:'RIITTA’S SHADOW',T:'BARTENDER',X:'A STRANGER',L:'LIBRARIAN'};

function clamp(v,a,b){return v<a?a:v>b?b:v;}
function approach(v,t,d){return v<t?Math.min(t,v+d):Math.max(t,v-d);}
function ease(v,t,k){return v+(t-v)*Math.min(1,k);}

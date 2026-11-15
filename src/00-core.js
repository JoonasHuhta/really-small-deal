var W=960,H=540,WALLY=385,FEETY=462,HOME=450,HOMEX=1500;
var LAMPS=[250,690,1130,HOMEX+60];
var cv=document.getElementById('c'),ctx=cv.getContext('2d'),ov=document.getElementById('ov');
var elLine=document.getElementById('line'),elOpts=document.getElementById('opts');
var SC=1;
function resize(){var dpr=Math.min(window.devicePixelRatio||1,2);var w=cv.clientWidth||960;cv.width=Math.round(w*dpr);cv.height=Math.round(w*9/16*dpr);SC=cv.width/W;WIDE=w>=640;COMPACT=!!(window.matchMedia&&window.matchMedia('(orientation:landscape) and (max-height:540px)').matches);
  HUDL=COMPACT&&((window.innerWidth||w)-w)/2<52?Math.round(58*W/w):0;}
var COMPACT=false,HUDL=0; // a phone held sideways: the on-canvas HUD shows itself briefly, then gets out of the way
window.addEventListener('resize',resize);
var RM=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
var WIDE=true,paused=false,lastDay=null,G=null,C={z:1.025,fx:W/2,fy:H/2},history=[],previewSaved=null;
var logDialog=document.getElementById('dialogue-log'),modalWasPaused=false,dragging=false;
var Q=[],WAIT=null,TIMER=0,LOCK=0,CH=null;
var NAMES={S:'EKSKYYSMI',H:'HUMAN',A:'SANNA',B:'EERO',P:'PHONE',N:'A MOMENT LATER',R:'RIITTA',Z:'SANNA’S SHADOW',T:'BARTENDER',X:'A STRANGER',L:'LIBRARIAN'};

function clamp(v,a,b){return v<a?a:v>b?b:v;}
function approach(v,t,d){return v<t?Math.min(t,v+d):Math.max(t,v-d);}
function ease(v,t,k){return v+(t-v)*Math.min(1,k);}

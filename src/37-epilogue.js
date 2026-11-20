/* ================= the closing montage, first sketch (T10, lab only, no music yet) ================= */
// TYOSUUNNITELMA section 6. Instead of credits: short, soft flashes from the week, cross-faded, each with one receipt line.
// No advice, no statistics about anyone but these two. The timings are a guess (about 5.5 s a shot); when the song arrives,
// EPI.at becomes beat times and the montage follows audio.currentTime instead of {wait} steps.
// The look: the game's own scenes, slightly blurred and warmed, like a memory of the week rather than a replay.
var EPI=[
  {set:'home',clock:21*3600,s:0.9,mood:'calm',hx:470,cap:'THE WEEK, ITEMISED',secs:6},
  {set:'room',clock:12*3600,s:0.8,mood:'calm',hx:420,a:560,face:'smile',cap:'LUNCHES ........................ 1'},
  {set:'office',clock:10*3600,s:0.75,mood:'pleased',hx:250,b:520,bFace:-1,cap:'SLIDES, PRESENTED ...... 1 (EERO)'},
  {set:'office',clock:9*3600+15*60,s:0.85,mood:'calm',hx:420,r:600,cap:'SUMMARY ........... HALF A PAGE'},
  {set:'room',clock:16*3600,s:1.4,mood:'stern',hx:470,cap:'WORST CASES ................ 0 *',note:'* prepared: plenty'},
  {set:'library',clock:15*3600,s:0.8,mood:'calm',hx:430,cap:'LATE FEES ................. €4.60'},
  {set:'home',clock:20*3600,s:1.0,mood:'calm',hx:470,face:'smile',cap:'DRAWINGS SHARED ............... 1',note:'accounts closed: 0'},
  {set:'room',clock:12*3600+40*60,s:0.8,mood:'calm',hx:400,a:520,face:'smile',cap:'COMPLIMENTS, FILED CORRECTLY ... 3'},
  {set:'home',clock:23*3600,s:0.9,mood:'care',hx:470,cap:'Made by Joonas Huhta (MoshBitSurfers)',credit:true,secs:7}
];
function epiSnap(){try{var c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;c.getContext('2d').drawImage(cv,0,0);return c;}catch(e){return null;}}
function epiShot(o){return function(){
  var snap=G.epi&&G.epi.started?epiSnap():null;
  scene({set:o.set,clock:o.clock})();
  var g=G,M=g.morko,Hm=g.human;g.fade=0;g.hud=false;g.plan=false;
  Hm.x=Hm.xT=o.hx||HOME;if(o.face)Hm.face=o.face;
  M.s=M.sT=o.s||1;M.mood=o.mood||'calm';
  if(o.a){g.cowA=true;g.ax=g.axT=o.a;g.aFace=-1;}
  if(o.b){g.cowB=true;g.bx2=g.bxT=o.b;g.bFace=o.bFace||-1;}
  if(o.r){g.cowR=true;g.rx=o.r;}
  // a slow push towards the people in the shot, a few percent over the whole shot: alive, not busy. Less motion: still.
  C.z=1.025;C.fx=W/2;C.fy=H/2;
  if(!RM){var fx=o.a?(Hm.x+o.a)/2:o.b?(Hm.x+o.b)/2:o.r?(Hm.x+o.r)/2:Hm.x-30;g.cz=o.z||1.12;g.cx=fx;g.cy=H/2+20;g.camRate=0.16;}
  g.epi.started=true;g.epi.snap=snap;g.epi.x=snap?1:0;g.epi.o=o;g.epi.ct=0;
  if(!snap){g.fade=1;g.fadeRate=0.8;}
};}
function stepEpi(dt){var e=G.epi;if(!e)return;e.ct+=dt;if(e.x>0)e.x=Math.max(0,e.x-dt/(RM?2.2:1.3));}
// No canvas blur filter: it is slow on phones and in software rendering (the montage ran at a fifth of its speed).
// The softness comes from a haze layer in drawEpi instead.
function epiFilterOn(){}
function drawEpi(){
  var e=G.epi;if(!e)return;
  // a warm wash, a little haze: the week as remembered
  var gr=ctx.createRadialGradient(W/2,H*0.45,H*0.2,W/2,H/2,H*0.9);gr.addColorStop(0,'rgba(255,224,170,0.10)');gr.addColorStop(1,'rgba(30,22,40,0.55)');
  ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(236,226,206,0.10)';ctx.fillRect(0,0,W,H);
  if(e.snap&&e.x>0){ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=e.x;ctx.drawImage(e.snap,0,0);ctx.restore();ctx.setTransform(SC,0,0,SC,0,0);}
  var o=e.o;if(!o||!o.cap)return;
  var a=clamp((e.ct-0.8)/0.6,0,1)*clamp(((o.secs||5.5)-0.3-e.ct)/0.5,0,1);if(a<=0)return;
  ctx.save();ctx.globalAlpha=a;ctx.textBaseline='middle';
  if(o.credit){ctx.textAlign='center';ctx.font='500 22px Fraunces,Georgia,serif';ctx.fillStyle='#f4eddf';ctx.fillText(o.cap,W/2,H-58);ctx.restore();return;}
  ctx.font='600 15px "DM Mono",ui-monospace,Menlo,monospace';ctx.textAlign='left';
  var w=Math.max(ctx.measureText(o.cap).width,o.note?ctx.measureText(o.note).width:0)+36,h=o.note?62:42,x=W/2-w/2,y=H-34-h;
  ctx.translate(W/2,y+h/2);ctx.rotate(-0.012);ctx.translate(-W/2,-(y+h/2));
  ctx.fillStyle='rgba(244,237,223,0.94)';ctx.fillRect(x,y,w,h);
  ctx.fillStyle='rgba(244,237,223,0.94)';for(var i=0;i<w;i+=8){ctx.beginPath();ctx.moveTo(x+i,y+h);ctx.lineTo(x+i+4,y+h+5);ctx.lineTo(x+i+8,y+h);ctx.fill();}   // torn edge
  ctx.fillStyle='#2b2733';ctx.fillText(o.cap,x+18,y+21);
  if(o.note){ctx.font='500 12px "DM Mono",ui-monospace,Menlo,monospace';ctx.fillStyle='#6b6470';ctx.fillText(o.note,x+18,y+44);}
  ctx.restore();
}
function labEpilogue(){
  var steps=[function(){G.epi={started:false,x:0,ct:0,snap:null,o:null};G.lines=[];}];
  EPI.forEach(function(o){steps.push(epiShot(o),{wait:o.secs||5.5});});
  steps.push(function(){G.epi=null;G.fade=1;G.fadeRate=0.5;},{wait:1.2});
  return labScene({set:'home',title:'Epilogue, first sketch.',plan:'',clock:21*3600}).concat(steps);
}

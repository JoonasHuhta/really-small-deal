/* ================= the closing montage, first sketch (T10, lab only, no music yet) ================= */
// TYOSUUNNITELMA section 6. Instead of credits: short, soft flashes from the week, cross-faded, each with one receipt line.
// No advice, no statistics about anyone but these two. The timings are a guess (about 5.5 s a shot); when the song arrives,
// EPI.at becomes beat times and the montage follows audio.currentTime instead of {wait} steps.
// The look: the game's own scenes, slightly blurred and warmed, like a memory of the week rather than a replay.
// Each shot: a scene, and one receipt row (label and value kept apart so they translate; the dots are drawn).
// The last rows are the player's own week (Ekskyysmi's methods), then the line the whole receipt mechanic was for:
// one day lived inside, one day outside. Safe at last, said as bookkeeping.
// Peanuts-credits rules: every shot is composed (its own framing and camera move), and Ekskyysmi does one small,
// purposeful thing in each. Close-ups for the intimate ones, wide for the jokes that need the room.
// cam: [z, x, y] at the start and the end of the shot; the camera eases between them (Less motion: the end framing, still).
// pose: Ekskyysmi's arms (see morkoArms). at: little things that happen during the shot, [seconds, function].
function epiHa(dx,dy){return function(){var g=G,q=geom();g.tics.push(tic(Math.random()<0.5?'ha':'HA',(g.human.x+q.bx)/2+dx,q.hdY+20+dy,{life:1.5,size:15+Math.random()*5}));};}
function epiLens(x,y,tag){return function(){var q=geom();G.lens={x:q.bx+40,y:q.hdY+60,xT:x,yT:y,mode:'peek',tag:tag,spot:null,done:{},t:0};G.morko.pose='lens';};}
var EPI=[
  {set:'home',clock:21*3600,s:0.9,mood:'calm',hx:470,cam:[1.5,200,190, 1.08,470,280],secs:6.5,title:'THE WEEK, ITEMISED'},
  {set:'room',clock:12*3600,s:0.8,mood:'calm',hx:420,a:560,wave:1,face:'smile',cam:[1.45,490,262, 1.6,490,262],
    at:[[1.8,epiLens(555,330,'FACE: FRIENDLY. RE-CHECKING.')]],l:'LUNCHES',v:'1'},
  {set:'office',clock:10*3600,s:0.75,mood:'worry',hx:250,b:560,pose:'selfeyes',cam:[1.15,420,270, 1.3,400,265],
    l:'SLIDES, PRESENTED',v:'1 (EERO)',note:'he was good. he still hates it.'},
  {set:'office',clock:9*3600+15*60,s:0.85,mood:'calm',hx:420,r:600,pose:'shoulder',cam:[1.6,450,290, 1.72,440,285],
    l:'SUMMARY',v:'HALF A PAGE',note:'thumbs received: 1 (of 2)'},
  {set:'room',clock:16*3600,s:1.9,mood:'stern',hx:470,pose:'grow',cam:[1.0,480,270, 1.05,480,280],
    at:[[2.6,function(){var M=G.morko;M.sT=0.8;M.pose=null;M.mood='surprised';}]],l:'WORST CASES THAT HAPPENED',v:'0',
    note:function(){var n=(G.methods||{}).worst;return n?fmtN('prepared: {n}',n):'prepared: plenty';}},
  // invented, not in the story: they look at each other and high-five. The first try misses (too keen); the second lands.
  {set:'room',clock:16*3600+2*60,s:0.95,mood:'pleased',hx:500,face:'smile',facing:-1,reach:1,pose:'five',five:{dx:30,dy:-38},cam:[1.45,455,262, 1.55,450,258],
    at:[[1.5,function(){G.five={dx:0,dy:0};}],[1.9,function(){var g=G;g.tics.push(tic('CLAP.',g.human.x-34,FEETY-232,{life:1.4,size:17}));sfx('pick');g.shake=RM?0:0.15;}]],
    l:'NOS, SAID OUT LOUD',v:function(){return G.endSeen&&!G.no?'0':'1';},note:function(){return G.endSeen&&!G.no?'next time, then.':'wobbling: allowed';}},
  {set:'bar',clock:21*3600+30*60,s:1.0,mood:'calm',hx:430,bar:1,cam:[1.7,420,250, 1.8,410,245],
    l:'UMBRELLA STORIES, TOLD',v:'1',note:'classified: not any more'},
  // invented: the story again, at home, and they cannot stop. Laughing until it leaks.
  {set:'home',clock:22*3600+20*60,s:1.05,mood:'pleased',hx:500,face:'laugh',facing:-1,cam:[1.7,450,250, 1.8,450,248],
    at:[[0.9,epiHa(-60,0)],[1.5,epiHa(40,-20)],[2.2,epiHa(-90,-30)],[3.0,epiHa(30,-40)]],
    l:'THE UMBRELLA STORY, AGAIN',v:'×4',note:'still classified. still funny.'},
  {set:'library',clock:15*3600,s:0.8,mood:'calm',hx:430,cam:[1.2,470,270, 1.35,450,262],
    at:[[1.4,epiLens(560,300,'PAGE 212. NOBODY HAS DIED YET.')]],l:'LATE FEES',v:'€4.60',note:'lighthouses: a shared interest'},
  {set:'room',clock:12*3600+5*60,s:0.85,mood:'calm',hx:400,a:540,z:1,pose:'toast',cam:[1.1,470,270, 1.25,470,262],
    l:'OTHER PEOPLE’S SHADOWS',v:'ALSO ON SHIFT'},
  {set:'home',clock:20*3600,s:1.0,mood:'calm',hx:470,face:'smile',pose:'hug',off:0,cam:[1.85,470,320, 1.7,470,312],
    l:'DRAWINGS SHARED',v:'1',note:'accounts closed: 0'},
  {set:'home',clock:22*3600,s:0.95,mood:'calm',hx:470,mine:1,pose:'selfmouth',cam:[1.55,450,250, 1.65,445,245]},
  {set:'home',clock:23*3600,s:0.75,mood:'calm',hx:470,sitting:1,cam:[1.8,450,380, 1.12,470,300],secs:7.5,
    l:'DAYS LIVED TODAY',v:'1.0',note:'inside and outside, the same day. first time this week.'},
  {set:'home',clock:23*3600+1,s:0.9,mood:'calm',hx:470,pose:'puppet',cam:[1.08,470,280, 1.0,480,270],secs:6.5,credit:'Made by Joonas Huhta (MoshBitSurfers)'}
];
// The player's own top methods, as rows. In the lab (or a week with no choices) the shot is skipped.
var MINE={worst:'WORST CASES, PREPARED',draft:'SCRIPTS, DRAFTED',please:'YESES, UNMEANT',hide:'EXITS, TAKEN',stay:'TIMES WE STAYED',hush:'SILENCES, KEPT'};
function mineRows(){var m=G.methods||{};return Object.keys(MINE).filter(function(k){return m[k]>0;}).sort(function(a,b){return m[b]-m[a];}).slice(0,3).map(function(k){return {l:MINE[k],v:'×'+m[k]};});}
function epiSnap(){try{var c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;c.getContext('2d').drawImage(cv,0,0);return c;}catch(e){return null;}}
function epiShot(o){return function(){
  var snap=G.epi&&G.epi.started?epiSnap():null;
  scene({set:o.set,clock:o.clock})();
  var g=G,M=g.morko,Hm=g.human;g.fade=0;g.hud=false;g.plan=false;
  if(o.bar){barSetup();var b=g.bar;b.sdrink=true;b.shelter=true;b.umbrella=1;}
  Hm.x=Hm.xT=o.hx||HOME;if(o.face)Hm.face=o.face;if(o.sitting)Hm.pose='floor';
  if(o.facing)Hm.facing=o.facing;if(o.reach)Hm.reach={x:Hm.x-34,y:FEETY-196};if(o.five)g.five={dx:o.five.dx,dy:o.five.dy};
  M.s=M.sT=o.s||1;M.mood=o.mood||'calm';M.pose=o.bar?'shelter':o.sitting?'sit':o.pose||null;
  if(o.a){g.cowA=true;g.ax=g.axT=o.a;g.aFace=-1;g.aWave=!!o.wave;if(o.z){g.zT=1;g.zShow=0.2;}}
  if(o.b){g.cowB=true;g.bx2=g.bxT=o.b;g.bFace=-1;}
  if(o.r){g.cowR=true;g.rx=o.r;}
  // composed framing: start, and drift to the end over the shot. Less motion: the end framing, no drift.
  var c=o.cam||[1.025,W/2,H/2,1.06,W/2,H/2];
  if(RM){C.z=c[3];C.fx=c[4];C.fy=c[5];}else{C.z=c[0];C.fx=c[1];C.fy=c[2];}
  g.cz=c[3];g.cx=c[4];g.cy=c[5];g.camRate=RM?40:1.4/(o.secs||5.5);
  g.epi.rows=o.mine?mineRows():null;g.epi.at=(o.at||[]).slice();
  g.epi.started=true;g.epi.snap=snap;g.epi.x=snap?1:0;g.epi.o=o;g.epi.ct=0;
  if(!snap){g.fade=1;g.fadeRate=0.8;}
};}
function stepEpi(dt){var e=G.epi;if(!e)return;e.ct+=dt;
  while(e.at&&e.at.length&&e.at[0][0]<=e.ct)e.at.shift()[1]();if(e.x>0)e.x=Math.max(0,e.x-dt/(RM?2.2:1.3));}
// No canvas blur filter: it is slow on phones and in software rendering (the montage ran at a fifth of its speed).
// The softness comes from a haze layer in drawEpi instead.
function epiFilterOn(){}
function drawEpi(){
  var e=G.epi;if(!e)return;
  // a warm wash, a little haze: the week as remembered
  var gr=ctx.createRadialGradient(W/2,H*0.45,H*0.2,W/2,H/2,H*0.9);gr.addColorStop(0,'rgba(255,224,170,0.10)');gr.addColorStop(1,'rgba(30,22,40,0.55)');
  ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(236,226,206,0.10)';ctx.fillRect(0,0,W,H);
  if(e.snap&&e.x>0){ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=e.x;ctx.drawImage(e.snap,0,0);ctx.restore();ctx.setTransform(SC,0,0,SC,0,0);}
  var o=e.o;if(!o)return;
  var rows=o.mine?(e.rows||[]):o.l?[{l:o.l,v:o.v}]:[];
  if(!rows.length&&!o.title&&!o.credit)return;
  var a=clamp((e.ct-0.8)/0.6,0,1)*clamp(((o.secs||5.5)-0.3-e.ct)/0.5,0,1);if(a<=0)return;
  ctx.save();ctx.globalAlpha=a;ctx.textBaseline='middle';
  if(o.credit){ctx.textAlign='center';ctx.font='500 22px Fraunces,Georgia,serif';ctx.fillStyle='#f4eddf';ctx.fillText(o.credit,W/2,H-58);ctx.restore();return;}
  var note=typeof o.note==='function'?o.note():o.note,mono='"DM Mono",ui-monospace,Menlo,monospace';
  ctx.font='500 12px '+mono;var w=Math.max(380,note?ctx.measureText(note).width+40:0),lh=24,h=24+(o.title?1:rows.length)*lh+(note?18:0),x=W/2-w/2,y=H-30-h;
  ctx.translate(W/2,y+h/2);ctx.rotate(-0.012);ctx.translate(-W/2,-(y+h/2));
  ctx.fillStyle='rgba(244,237,223,0.94)';ctx.fillRect(x,y,w,h);
  for(var i=0;i<w;i+=8){ctx.beginPath();ctx.moveTo(x+i,y+h);ctx.lineTo(x+i+4,y+h+5);ctx.lineTo(x+i+8,y+h);ctx.fill();}   // torn edge
  ctx.fillStyle='#2b2733';
  if(o.title){ctx.font='700 15px '+mono;ctx.textAlign='center';ctx.fillText(o.title,W/2,y+12+lh/2);}
  else rows.forEach(function(r,i){var yy=y+12+lh/2+i*lh;ctx.font='600 14px '+mono;ctx.textAlign='left';ctx.fillText(r.l,x+18,yy);
    var val=typeof r.v==='function'?r.v():r.v;var lw=ctx.measureText(r.l).width;ctx.textAlign='right';ctx.fillText(val,x+w-18,yy);var vw=ctx.measureText(val).width;
    ctx.fillStyle='#8c8590';for(var d=x+18+lw+8;d<x+w-18-vw-8;d+=7)ctx.fillRect(d,yy+4,2,2);ctx.fillStyle='#2b2733';});
  if(note){ctx.font='500 12px '+mono;ctx.textAlign='left';ctx.fillStyle='#6b6470';ctx.fillText(note,x+18,y+h-14);}
  ctx.restore();
}
function labEpilogue(){
  var steps=[function(){G.epi={started:false,x:0,ct:0,snap:null,o:null};G.lines=[];}];
  EPI.forEach(function(o){if(o.mine)steps.push(function(){return mineRows().length?[epiShot(o),{wait:o.secs||5.5}]:[];});else steps.push(epiShot(o),{wait:o.secs||5.5});});
  steps.push(function(){G.epi=null;G.fade=1;G.fadeRate=0.5;},{wait:1.2});
  return labScene({set:'home',title:'Epilogue, first sketch.',plan:'',clock:21*3600}).concat(steps);
}

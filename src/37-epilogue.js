/* ================= the closing montage, first sketch (T10, lab only, no music yet) ================= */
// TYOSUUNNITELMA section 6. Instead of credits: short, soft flashes from the week, cross-faded, each with one receipt line.
// No advice, no statistics about anyone but these two. The timings are a guess (about 5.5 s a shot); when the song arrives,
// EPI.at becomes beat times and the montage follows audio.currentTime instead of {wait} steps.
// The look: the game's own scenes, slightly blurred and warmed, like a memory of the week rather than a replay.
// Each shot: a scene, and one receipt row (label and value kept apart so they translate; the dots are drawn).
// The last rows are the player's own week (Ekskyysmi's methods), then the line the whole receipt mechanic was for:
// one day lived inside, one day outside. Safe at last, said as bookkeeping.
// Montage grammar (TYOSUUNNITELMA 6, Joonas 20.11.: “not a slideshow zoom”). What made the first sketch flat was sameness:
// every shot the same length, the same crossfade, the same slow push. Rules now:
//  - rhythm: shot lengths vary (a flash of 1.5 s next to a held 7 s); it speeds up in the middle and slows down at the end
//  - cuts: 'fade' for tender, 'hard' for comedy, 'smash' for a contrast (quiet to alarm); not every shot fades
//  - camera: most shots are locked off (still). A move must mean something: a slow pull back to let go, a sudden punch-in on a gag
//  - one in-shot reversal (alarm → nothing happened), one fumble (the high five misses), one flash (the laughing)
// cam: [z, x, y] start and end; equal = still. at: [seconds, function] beats inside a shot.
function epiHa(dx,dy){return function(){var g=G,q=geom();g.tics.push(tic(Math.random()<0.5?'ha':'HA',(g.human.x+q.bx)/2+dx,q.hdY+20+dy,{life:1.2,size:15+Math.random()*5}));};}
function epiLens(x,y,tag,honest){return function(){var q=geom();G.lens={x:q.bx+40,y:q.hdY+60,xT:x,yT:y,mode:'peek',tag:tag,spot:null,done:{},t:0,honest:!!honest};G.morko.pose='lens';};}
function epiStamp(){return function(){var g=G;g.selfStamps=(g.selfStamps||0)+1;sfx('stamp');g.shake=RM?0:0.06;};}
function epiPunch(z,x,y){return function(){if(RM)return;C.z=z;C.fx=x;C.fy=y;var g=G;g.cz=z;g.cx=x;g.cy=y;sfx('cut');};}   // a snap zoom: the comedy kind
function epiShake(k){return function(){G.shake=RM?0:k;};}
// The lift (epilogue only): a small metal room, two people, two shadows, no room for either shadow.
function epiLift(){
  ctx.fillStyle='#8f969b';ctx.fillRect(-20,-20,W+40,WALLY+20);ctx.fillStyle='#7c8388';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);
  ctx.fillStyle='#a3aaae';ctx.fillRect(250,60,460,WALLY-60);ctx.strokeStyle='#6f767b';ctx.lineWidth=3;line(480,60,480,WALLY);ctx.strokeRect(250,60,460,WALLY-60);
  ctx.strokeStyle='#5e6569';ctx.lineWidth=5;line(270,300,690,300);   // the handrail
  ctx.fillStyle='#2b2f33';rr(722,140,46,90,6);ctx.fill();ctx.fillStyle='#e8b04a';ctx.font='700 22px system-ui,sans-serif';ctx.textAlign='center';ctx.fillText('3',745,178);
  ctx.beginPath();ctx.moveTo(745,196);ctx.lineTo(737,208);ctx.lineTo(753,208);ctx.closePath();ctx.fill();
}
function epiDraft(t){return function(){var g=G;g.lines=[{who:'P',text:t}];g.cur={who:'P',text:t};g.curT=99;};}
function epiWorld(o,e){   // things drawn in the room, under the camera: the shadow umbrella, the dark with four eyes
  if(!o.umbrella&&!e.dark)return;
  ctx.save();applyCamera();var Hm=G.human,q=geom();
  if(o.umbrella){var ux=Hm.x,uy=FEETY-238;ctx.fillStyle=mcol();ctx.beginPath();ctx.moveTo(ux-62,uy+14);ctx.quadraticCurveTo(ux,uy-46,ux+62,uy+14);
    for(var k=0;k<4;k++)ctx.quadraticCurveTo(ux+62-k*31-15.5,uy+4,ux+62-(k+1)*31,uy+14);ctx.fill();ctx.strokeStyle=mcol();ctx.lineWidth=4;line(ux,uy+10,ux,uy+52);}
  if(e.dark>0.01){ctx.restore();ctx.save();ctx.fillStyle='rgba(6,6,10,'+(0.96*e.dark)+')';ctx.fillRect(0,0,W,H);}
  ctx.restore();
}
// drawn after the haze, so the four eyes stay bright in the dark
function epiEyes(e){if(!(e.dark>0.01))return;var Hm=G.human,q=geom();ctx.save();applyCamera();ctx.fillStyle='#f6f1e4';ctx.globalAlpha=e.dark;
  var bl=(G.time%2.2)<0.12?0.15:1,ey=q.hdY;ctx.beginPath();ctx.ellipse(q.bx-7,ey,5,5*bl,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(q.bx+7,ey,5,5*bl,0,0,Math.PI*2);ctx.fill();
  var hb=((G.time+0.7)%2.6)<0.12?0.15:1,hx=Hm.x+(Hm.facing||1)*5,hy=FEETY-148;ctx.beginPath();ctx.ellipse(hx-6,hy,3.6,3.6*hb,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(hx+6,hy,3.6,3.6*hb,0,0,Math.PI*2);ctx.fill();
  ctx.restore();}
function epiRain(){if(RM)return;ctx.save();ctx.strokeStyle='rgba(200,215,235,0.45)';ctx.lineWidth=1.4;var t=G.time;
  for(var i=0;i<110;i++){var x=(i*97.3+t*60)%(W+40)-20,y=(i*53.7+t*520)%(H+40)-20;line(x,y,x-5,y+16);}ctx.restore();}
var EPI=[
  {cut:'fade',set:'home',clock:21*3600,s:0.9,mood:'calm',hx:470,cam:[1.45,200,190, 1.08,470,280],secs:5,title:'THE WEEK, ITEMISED'},
  {cut:'hard',set:'room',clock:12*3600,s:0.8,mood:'calm',hx:420,a:560,wave:1,face:'smile',cam:[1.45,490,262, 1.45,490,262],secs:4.2,
    at:[[0.9,epiLens(555,330,'FACE: FRIENDLY. RE-CHECKING.',1)],[2.6,epiPunch(2.4,560,300)]],l:'LUNCHES',v:'1'},
  {cut:'hard',set:'office',clock:10*3600,s:0.75,mood:'worry',hx:250,b:560,pose:'selfeyes',cam:[1.2,410,268, 1.2,410,268],secs:3,
    l:'SLIDES, PRESENTED',v:'1 (EERO)',note:'he was good. he still hates it.'},
  // smash: the alarm. Red, shaking, enormous, a siren. Then nothing happens, and the shadow deflates mid-shot.
  {cut:'smash',set:'room',clock:16*3600,s:2.3,mood:'scared',hx:470,pose:'grow',alarm:1,cam:[1.0,480,270, 1.0,480,270],secs:4.4,
    at:[[1.9,function(){var g=G,M=g.morko;g.pulse=0;g.shake=0;M.sT=0.8;M.pose=null;M.mood='surprised';}]],
    l:'WORST CASES THAT HAPPENED',v:'0',note:function(){var n=(G.methods||{}).worst;return n?fmtN('prepared: {n}',n):'prepared: plenty';}},
  {cut:'hard',set:'room',clock:16*3600+2*60,s:0.95,mood:'pleased',hx:500,face:'smile',facing:-1,reach:1,pose:'five',five:{dx:30,dy:-38},cam:[1.45,455,262, 1.45,455,262],secs:3.4,
    at:[[1.3,function(){G.five={dx:0,dy:0};}],[1.65,function(){var g=G;g.tics.push(tic('CLAP.',g.human.x-34,FEETY-232,{life:1.3,size:17}));sfx('clap');g.shake=RM?0:0.18;}]],
    l:'NOS, SAID OUT LOUD',v:function(){return G.endSeen&&!G.no?'0':'1';},note:function(){return G.endSeen&&!G.no?'next time, then.':'wobbling: allowed';}},
  // invented: rain, and Ekskyysmi holds an umbrella over the human. It is a shadow umbrella. The rain goes straight through.
  {cut:'hard',walk:1,s:0.45,mood:'pleased',pose:'five',five:{dx:34,dy:8},umbrella:1,rain:1,off:-190,cam:[1.3,430,300, 1.3,430,300],secs:3.6,
    at:[[1.8,function(){var g=G;g.human.sweat=1;g.human.face='stiff';}],[2.7,function(){G.human.face='smile';}]],
    l:'UMBRELLAS, HELD',v:'1',note:'effective: no. appreciated: yes.'},
  {cut:'fade',set:'bar',clock:21*3600+30*60,s:1.0,mood:'calm',hx:430,bar:1,cam:[1.75,420,250, 1.75,420,250],secs:3.4,
    l:'UMBRELLA STORIES, TOLD',v:'1',note:'classified: not any more'},
  // invented: the walk home after the bar. One kerb, two falls. Neither of them makes it a verdict.
  {cut:'hard',walk:1,s:1.0,mood:'calm',cam:[1.35,430,335, 1.35,430,335],secs:3.8,
    at:[[1.0,function(){var g=G;g.w.speed=0;g.human.pose='floor';g.human.face='surprised';g.shake=RM?0:0.3;sfx('hit');g.tics.push(tic('oof.',g.human.x+40,FEETY-90,{life:1.4,size:15}));}],
        [1.35,function(){var g=G,M=g.morko;M.pose='sit';M.mood='surprised';g.tics.push(tic('OOF.',g.human.x-90,FEETY-170,{life:1.4,size:17}));sfx('drip');}],
        [2.4,function(){G.human.face='laugh';G.morko.mood='pleased';}]],
    l:'KERBS, SURVIVED',v:'0 OF 2',note:'falls: one each. verdicts: none.'},
  // a flash, no caption: the story again at home, and they cannot stop laughing
  {cut:'hard',set:'home',clock:22*3600+20*60,s:1.05,mood:'pleased',hx:500,face:'laugh',facing:-1,cam:[1.85,455,250, 1.85,455,250],secs:1.6,
    at:[[0.2,epiHa(-60,0)],[0.6,epiHa(40,-20)],[1.0,epiHa(-90,-30)]]},
  {cut:'hard',set:'library',clock:15*3600,s:0.8,mood:'calm',hx:430,cam:[1.25,460,266, 1.25,460,266],secs:4,
    at:[[0.8,epiLens(560,300,'PAGE 212. NOBODY HAS DIED YET.')]],l:'LATE FEES',v:'€4.60',note:'lighthouses: a shared interest'},
  // invented: the lift. Eero, the human, and two shadows trying very hard not to touch.
  {cut:'hard',set:'lift',clock:8*3600+55*60,s:0.72,mood:'worry',hx:420,b:540,bFace:-1,eeroShadow:470,cam:[1.5,470,262, 1.5,470,262],secs:3.2,
    at:[[1.6,function(){G.morko.sT=0.66;G.tics.push(tic('(sorry.)',360,170,{life:1.3,size:14}));}]],
    l:'LIFTS, SHARED',v:'1',note:'shadows touching: 0 (narrowly)'},
  // invented: Ekskyysmi has been stamping itself. Ten times. The human looks; it looks back.
  {cut:'hard',set:'home',clock:19*3600,s:1.15,mood:'surprised',hx:520,facing:-1,face:'stiff',cam:[1.45,440,250, 1.45,440,250],secs:3.6,
    at:[[0.2,epiStamp()],[0.42,epiStamp()],[0.62,epiStamp()],[0.8,epiStamp()],[0.96,epiStamp()],[1.1,epiStamp()],[1.22,epiStamp()],[1.33,epiStamp()],[1.43,epiStamp()],[1.52,epiStamp()],
        [2.2,function(){G.morko.mood='worry';G.human.face='smile';}]],
    l:'REJECTIONS, SELF-ISSUED',v:'10',note:'all of them overturned on appeal.'},
  // invented: a long careful draft; the human deletes it and sends two characters. Ekskyysmi faints.
  {cut:'hard',set:'home',clock:21*3600+10*60,s:1.05,mood:'alert',hx:430,cam:[1.3,520,270, 1.3,520,270],secs:3.6,
    at:[[0.15,epiDraft('Hi!! Just checking you’re okay, not that you aren’t, sorry if this is weird, totally fine if not, no worries, ignore this')],
        [1.5,epiDraft('ok 👍')],[1.55,function(){sfx('pop');}],
        [2.1,function(){var g=G,M=g.morko;M.sT=0.32;M.mood='surprised';g.human.face='smile';g.tics.push(tic('thud.',g.human.x-70,FEETY-60,{life:1.3,size:15}));sfx('drip');}]],
    l:'DRAFTS, DELETED',v:'1',note:'sent instead: ok 👍'},
  // smash: the group photo. A flash, everyone smiling, and one enormous shadow that was not invited.
  {cut:'smash',set:'room',clock:17*3600,s:1.9,mood:'pleased',hx:360,a:460,b:560,r:660,pose:'grow',flash:1,cam:[1.15,500,265, 1.15,500,265],secs:2.4,
    l:'GROUP PHOTOS',v:'1',note:'shadows in shot: 1 (uninvited)'},
  // invented: the lamp goes out. Two pairs of eyes in the dark, side by side. Nobody panics. The lamp comes back.
  {cut:'fade',set:'home',clock:22*3600+40*60,s:0.95,mood:'calm',hx:470,facing:-1,cam:[1.45,450,250, 1.45,450,250],secs:3.6,
    at:[[0.7,function(){var g=G;g.lampOff=true;g.epi.darkT=1;sfx('turn');}],[2.6,function(){var g=G;g.lampOff=false;g.epi.darkT=0;sfx('turn');}]],
    l:'POWER CUTS',v:'1',note:'eyes in the dark: four. panic: none.'},
  {cut:'fade',set:'home',clock:20*3600,s:1.0,mood:'calm',hx:470,face:'smile',pose:'hug',off:0,cam:[1.9,470,320, 1.55,470,305],secs:5,
    l:'DRAWINGS SHARED',v:'1',note:'accounts closed: 0'},
  {cut:'hard',set:'home',clock:22*3600,s:0.95,mood:'calm',hx:470,mine:1,pose:'selfmouth',cam:[1.55,450,250, 1.55,450,250],secs:3.4},
  {cut:'fade',set:'home',clock:23*3600,s:0.95,mood:'calm',hx:520,sitting:1,cam:[1.8,450,380, 1.05,475,290],secs:7,
    l:'DAYS LIVED TODAY',v:'1.0',note:'inside and outside, the same day. first time this week.'},
  {cut:'fade',set:'home',clock:23*3600+1,s:0.9,mood:'calm',hx:470,pose:'puppet',cam:[1.05,475,290, 1.05,475,290],secs:6,credit:'Made by Joonas Huhta (MoshBitSurfers)'}
];
// The player's own top methods, as rows. In the lab (or a week with no choices) the shot is skipped.
var MINE={worst:'WORST CASES, PREPARED',draft:'SCRIPTS, DRAFTED',please:'YESES, UNMEANT',hide:'EXITS, TAKEN',stay:'TIMES WE STAYED',hush:'SILENCES, KEPT'};
function mineRows(){var m=G.methods||{};return Object.keys(MINE).filter(function(k){return m[k]>0;}).sort(function(a,b){return m[b]-m[a];}).slice(0,3).map(function(k){return {l:MINE[k],v:'×'+m[k]};});}
function epiSnap(){try{var c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;c.getContext('2d').drawImage(cv,0,0);return c;}catch(e){return null;}}
function epiShot(o){return function(){
  var snap=G.epi&&G.epi.started&&(o.cut||'fade')==='fade'?epiSnap():null;   // hard and smash cuts have no crossfade
  if(o.walk){scene({set:'room',clock:23*3600})();startWalk();G.card=0;G.w.x=520;G.w.speed=o.umbrella?0:34;G.clock=23*3600+40*60;}
  else scene({set:o.set,clock:o.clock})();
  var g=G,M=g.morko,Hm=g.human;g.fade=0;g.hud=false;g.plan=false;
  if(o.bar){barSetup();var b=g.bar;b.sdrink=true;b.shelter=true;b.umbrella=1;}
  Hm.x=Hm.xT=o.hx||HOME;if(o.face)Hm.face=o.face;if(o.sitting)Hm.pose='floor';
  if(o.facing)Hm.facing=o.facing;if(o.reach)Hm.reach={x:Hm.x-34,y:FEETY-196};if(o.five)g.five={dx:o.five.dx,dy:o.five.dy};
  M.s=M.sT=o.s||1;M.mood=o.mood||'calm';M.pose=o.bar?'shelter':o.sitting?'sit':o.pose||null;
  if(o.a){g.cowA=true;g.ax=g.axT=o.a;g.aFace=-1;g.aWave=!!o.wave;if(o.z){g.zT=1;g.zShow=0.2;}}
  if(o.b){g.cowB=true;g.bx2=g.bxT=o.b;g.bFace=o.r?1:-1;}
  if(o.bFace)g.bFace=o.bFace;if(o.eeroShadow){g.yx=g.yxT=o.eeroShadow;g.yShow=g.yT=1;}
  g.epi.dark=0;g.epi.darkT=0;
  if(o.r){g.cowR=true;g.rx=o.r;}
  // composed framing: start, and drift to the end over the shot. Less motion: the end framing, no drift.
  var c=o.cam||[1.025,W/2,H/2,1.06,W/2,H/2];
  if(RM){C.z=c[3];C.fx=c[4];C.fy=c[5];}else{C.z=c[0];C.fx=c[1];C.fy=c[2];}
  g.cz=c[3];g.cx=c[4];g.cy=c[5];g.camRate=RM?40:1.4/(o.secs||5.5);
  g.epi.rows=o.mine?mineRows():null;g.epi.at=(o.at||[]).slice();
  g.epi.started=true;g.epi.snap=snap;g.epi.x=snap?1:0;g.epi.o=o;g.epi.ct=0;
  if(o.flash){g.flash=1;sfx('clap');}
  if(o.alarm){g.pulse=RM?0.5:0.95;g.shake=RM?0:0.45;sfx('siren');}
  if(o.cut==='smash'||o.cut==='hard'){g.fade=0;if(o.cut==='smash'){g.flash=1;sfx('cut');}}
  else if(!snap){g.fade=1;g.fadeRate=0.8;}
};}
function stepEpi(dt){var e=G.epi;if(!e)return;e.ct+=dt;e.dark=approach(e.dark||0,e.darkT||0,(RM?3:2.4)*dt);
  while(e.at&&e.at.length&&e.at[0][0]<=e.ct)e.at.shift()[1]();if(e.x>0)e.x=Math.max(0,e.x-dt/(RM?2.2:1.3));}
// No canvas blur filter: it is slow on phones and in software rendering (the montage ran at a fifth of its speed).
// The softness comes from a haze layer in drawEpi instead.
function epiFilterOn(){}
function drawEpi(){
  var e=G.epi;if(!e)return;
  if(e.o){epiWorld(e.o,e);if(e.o.rain)epiRain();}
  // a warm wash, a little haze: the week as remembered
  var gr=ctx.createRadialGradient(W/2,H*0.45,H*0.2,W/2,H/2,H*0.9);gr.addColorStop(0,'rgba(255,224,170,0.10)');gr.addColorStop(1,'rgba(30,22,40,0.55)');
  ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(236,226,206,0.10)';ctx.fillRect(0,0,W,H);
  epiEyes(e);
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

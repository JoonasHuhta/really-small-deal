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
function epiSweat(){return function(){var g=G,q=geom();g.tics.push(tic('💧',q.bx+(Math.random()<0.5?-1:1)*(q.hdR+6),q.hdY-6,{life:0.9,size:13}));};}
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
  if(!o.umbrella&&!o.drive&&!o.zone&&!e.dark)return;
  ctx.save();applyCamera();var Hm=G.human,q=geom();
  if(o.drive){var cx0=Hm.x-16,cy0=FEETY+8,bob=RM?0:Math.sin(G.time*22)*1.2;ctx.translate(0,bob);
    ctx.fillStyle='#14111d';circ(cx0-62,cy0-6,15);ctx.fill();circ(cx0+66,cy0-6,15);ctx.fill();ctx.fillStyle='#55657a';circ(cx0-62,cy0-6,6);ctx.fill();circ(cx0+66,cy0-6,6);ctx.fill();
    ctx.fillStyle='#62887f';rr(cx0-104,cy0-62,208,48,12);ctx.fill();
    ctx.beginPath();ctx.moveTo(cx0-66,cy0-60);ctx.lineTo(cx0-46,cy0-150);ctx.lineTo(cx0+46,cy0-150);ctx.lineTo(cx0+76,cy0-60);ctx.closePath();
    ctx.moveTo(cx0-56,cy0-62);ctx.lineTo(cx0-40,cy0-142);ctx.lineTo(cx0+40,cy0-142);ctx.lineTo(cx0+66,cy0-62);ctx.closePath();ctx.fill('evenodd');   // the window is a hole: the driver shows
    ctx.fillStyle='rgba(174,191,207,0.22)';ctx.beginPath();ctx.moveTo(cx0-56,cy0-62);ctx.lineTo(cx0-40,cy0-142);ctx.lineTo(cx0+40,cy0-142);ctx.lineTo(cx0+66,cy0-62);ctx.closePath();ctx.fill();
    ctx.fillStyle='#fbf3c8';circ(cx0+98,cy0-44,6);ctx.fill();ctx.fillStyle='#c9553f';rr(cx0-106,cy0-50,6,10,2);ctx.fill();
    if(!RM){ctx.strokeStyle='rgba(240,236,226,.35)';ctx.lineWidth=2;for(var sl=0;sl<4;sl++){var sy=cy0-80+sl*16,sx=cx0-130-((G.time*300+sl*40)%60);line(sx,sy,sx-30,sy);}}   // speed lines
    ctx.translate(0,-bob);}
  if(o.zone){ctx.strokeStyle='rgba(246,241,228,.8)';ctx.lineWidth=3;ctx.setLineDash([10,8]);ctx.beginPath();ctx.ellipse(o.hx||470,FEETY+8,90,18,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);}   // a chalk circle, drawn by the shadow, for the shadow
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
    at:[[1.2,function(){var g=G;g.human.sweat=1;g.human.wet=true;g.human.face='stiff';}],[2.7,function(){G.human.face='smile';}]],
    l:'UMBRELLAS, HELD',v:'1',note:'effective: no. appreciated: yes.'},
  {cut:'fade',set:'bar',clock:21*3600+30*60,s:1.0,mood:'calm',hx:430,bar:1,cam:[1.75,420,250, 1.75,420,250],secs:3.4,
    l:'UMBRELLA STORIES, TOLD',v:'1',note:'classified: not any more'},
  // invented: the ride home, in two close-ups (a wide shot stretched the floor shadow between them): the driver, then the runner.
  {cut:'hard',walk:1,drive:1,s:0.5,mood:'alert',off:-300,cam:[2.9,436,360, 3.0,436,360]},
  {cut:'hard',walk:1,drive:1,s:0.5,mood:'alert',off:-300,follow:'S',cam:[3.2,200,230, 3.3,200,230],
    at:[[0.15,epiSweat()],[0.45,epiSweat()],[0.75,epiSweat()],[1.05,epiSweat()],[1.35,epiSweat()]],
    l:'RIDES HOME',v:'1',note:'one in the car. one running behind.'},
  // a flash, no caption: the story again at home, and they cannot stop laughing
  {cut:'hard',set:'home',clock:22*3600+20*60,s:1.05,mood:'pleased',hx:500,face:'laugh',facing:-1,cam:[1.85,455,250, 1.85,455,250],secs:1.6,
    at:[[0.2,epiHa(-60,0)],[0.6,epiHa(40,-20)],[1.0,epiHa(-90,-30)]]},
  {cut:'hard',set:'library',clock:15*3600,s:0.8,mood:'calm',hx:430,cam:[1.25,460,266, 1.25,460,266],secs:4,
    at:[[0.8,epiLens(560,300,'PAGE 212. NOBODY HAS DIED YET.')]],l:'LATE FEES',v:'€4.60',note:'lighthouses: a shared interest'},
  // The posting (#19): the application goes. Ekskyysmi drafts four pages; the human sends three lines. (Replaced the lift, 21.11.)
  {cut:'hard',set:'home',clock:22*3600+47*60,s:1.15,mood:'alert',hx:470,cam:[1.4,500,262, 1.5,500,258],secs:3.4,
    at:[[0.1,epiDraft('Ekskyysmi’s draft: page 4 of 4. “…and in conclusion, sorry.”')],
        [1.9,epiDraft('Sent: three lines. No apology.')],[1.95,function(){sfx('pop');var M=G.morko;M.mood='surprised';M.sT=0.8;}]],
    l:'APPLICATIONS, SENT',v:'1',note:'drafted by one. sent by the other.'},
  // invented: Ekskyysmi has been stamping itself. Ten times. The human looks; it looks back.
  {cut:'hard',set:'home',clock:19*3600,s:1.15,mood:'surprised',hx:520,facing:-1,face:'stiff',cam:[1.45,440,250, 1.45,440,250],secs:3.6,
    at:[[0.2,epiStamp()],[0.42,epiStamp()],[0.62,epiStamp()],[0.8,epiStamp()],[0.96,epiStamp()],[1.1,epiStamp()],[1.22,epiStamp()],[1.33,epiStamp()],[1.43,epiStamp()],[1.52,epiStamp()],
        [2.2,function(){G.morko.mood='worry';G.human.face='smile';}]],
    l:'REJECTIONS, SELF-ISSUED',v:'10',note:'all of them overturned on appeal.'},
  // invented: a long careful draft; the human deletes it and sends two characters. Ekskyysmi faints.
  {cut:'hard',set:'home',clock:21*3600+10*60,s:1.05,mood:'alert',hx:430,cam:[1.3,520,270, 1.3,520,270],secs:3.6,
    at:[[0.1,epiDraft('Hi!! Just checking you’re okay, not that you aren’t, sorry if this is weird, totally fine if not, no worries, ignore this')],
        [2.5,epiDraft('ok 👍')],[2.55,function(){sfx('pop');}],
        [3.1,function(){var g=G,M=g.morko;M.sT=0.32;M.mood='surprised';g.human.face='smile';g.tics.push(tic('thud.',g.human.x-70,FEETY-60,{life:1.3,size:15}));sfx('drip');}]],
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
    l:'DAYS LIVED TODAY',v:'1.0',note:'inside and outside, the same day. a first.'},
  {cut:'fade',set:'home',clock:23*3600+1,s:0.9,mood:'calm',hx:470,pose:'puppet',cam:[1.05,475,290, 1.05,475,290],secs:6,credit:'Made by Joonas Huhta (MoshBitSurfers)'}
];
// The player's own top methods, as rows. In the lab (or a week with no choices) the shot is skipped.
var MINE={worst:'WORST CASES, PREPARED',draft:'SCRIPTS, DRAFTED',please:'YESES, UNMEANT',hide:'EXITS, TAKEN',stay:'TIMES WE STAYED',hush:'SILENCES, KEPT'};
function mineRows(){var m=G.methods||{};return Object.keys(MINE).filter(function(k){return m[k]>0;}).sort(function(a,b){return m[b]-m[a];}).slice(0,3).map(function(k){return {l:MINE[k],v:'×'+m[k]};});}
function epiSnap(){try{var c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;c.getContext('2d').drawImage(cv,0,0);return c;}catch(e){return null;}}
function epiShot(o){return function(){
  var snap=G.epi&&G.epi.started&&(o.cut||'fade')==='fade'?epiSnap():null;   // hard and smash cuts have no crossfade
  if(o.walk){scene({set:'room',clock:23*3600})();startWalk();G.card=0;G.w.x=520;G.w.speed=o.umbrella?0:o.drive?150:34;G.w.xT=o.drive?99999:G.w.xT;G.clock=23*3600+40*60;}
  else scene({set:o.set,clock:o.clock})();
  var g=G,M=g.morko,Hm=g.human;g.fade=0;g.hud=false;g.plan=false;
  if(o.bar){barSetup();var b=g.bar;b.sdrink=true;b.shelter=true;b.umbrella=1;}
  Hm.x=Hm.xT=o.hx||HOME;if(o.face)Hm.face=o.face;if(o.sitting||o.drive)Hm.pose='floor';
  if(o.facing)Hm.facing=o.facing;if(o.reach)Hm.reach={x:Hm.x-34,y:FEETY-196};if(o.five)g.five={dx:o.five.dx,dy:o.five.dy};
  M.s=M.sT=o.s||1;M.mood=o.mood||'calm';M.pose=o.bar?'shelter':o.sitting?'sit':o.pose||null;
  if(o.a){g.cowA=true;g.ax=g.axT=o.a;g.aFace=-1;g.aWave=!!o.wave;if(o.z){g.zT=1;g.zShow=0.2;}}
  if(o.b){g.cowB=true;g.bx2=g.bxT=o.b;g.bFace=o.r?1:-1;}
  if(o.bFace)g.bFace=o.bFace;if(o.eeroShadow){g.yx=g.yxT=o.eeroShadow;g.yShow=g.yT=1;}
  g.ninja=!!o.ninja;
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
function stepEpi(dt){var e=G.epi;if(!e)return;e.ct+=dt;
  if(e.o&&e.o.follow==='S'){var q=geom();G.cx=q.bx;G.cy=q.hdY+60;G.camRate=RM?40:6;}   // keep the running shadow in frame
  // The montage is cut to the song, so its clock follows the music. But the clock never runs backwards: if the song
  // restarts under us (an Android WebView back from the background, a reloaded element), the music is put back where
  // the pictures are, instead of the pictures waiting a minute for the music (Joonas 21.11.: "music plays, nothing moves").
  var el=musicEl,prev=e.clock||0,live=el&&musicName==='epilogue'&&!el.paused&&el.currentTime>0;
  if(live&&el.currentTime<prev-0.5){try{el.currentTime=prev;}catch(_){}e.clock=prev+dt;}
  else e.clock=live?Math.max(prev,el.currentTime):prev+dt;e.dark=approach(e.dark||0,e.darkT||0,(RM?3:2.4)*dt);
  while(e.at&&e.at.length&&e.at[0][0]<=e.ct)e.at.shift()[1]();if(e.x>0)e.x=Math.max(0,e.x-dt/(RM?2.2:1.3));}
// No canvas blur filter: it is slow on phones and in software rendering (the montage ran at a fifth of its speed).
// The softness comes from a haze layer in drawEpi instead.
function epiFilterOn(){}
function drawEpi(){
  var e=G.epi;if(!e)return;
  if(e.theEnd){ctx.fillStyle='#0d1114';ctx.fillRect(0,0,W,H);var a=clamp(e.clock/0.8,0,1);ctx.globalAlpha=a;ctx.fillStyle='#f4eddf';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.font='500 54px Fraunces,Georgia,serif';ctx.fillText('The End.',W/2,H/2-8);ctx.font='500 17px system-ui,sans-serif';ctx.fillStyle='#b9b2a6';ctx.fillText('(of the week)',W/2,H/2+40);ctx.globalAlpha=1;return;}
  epiSkipHint(e);
  if(e.o){epiWorld(e.o,e);if(e.o.rain)epiRain();}
  // a warm wash, a little haze: the week as remembered
  var gr=ctx.createRadialGradient(W/2,H*0.45,H*0.2,W/2,H/2,H*0.9);gr.addColorStop(0,'rgba(255,224,170,0.10)');gr.addColorStop(1,'rgba(30,22,40,0.55)');
  ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(236,226,206,0.10)';ctx.fillRect(0,0,W,H);
  epiEyes(e);
  if(e.snap&&e.x>0){ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=e.x;ctx.drawImage(e.snap,0,0);ctx.restore();ctx.setTransform(SC,0,0,SC,0,0);}
  var o=e.o;if(!o)return;
  if(o.form)epiForm(e);
  if(o.roll){epiRoll(e);return;}
  if(o.noCap)return;
  var rows=o.mine?(e.rows||[]):o.l?[{l:o.l,v:o.v}]:[];
  if(!rows.length&&!o.title&&!o.credit)return;
  var lead=Math.min(0.8,(o.secs||5.5)*0.12),a=clamp((e.ct-lead)/0.4,0,1)*clamp(((o.secs||5.5)-0.15-e.ct)/0.35,0,1);if(a<=0)return;   // short shots: caption early and held to the cut
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
// ---------- timed to the song (Safe At Last, 2:55, ~108 BPM) ----------
// Bar starts found by beat tracking (librosa) and kept here, so cuts land on bars. Without sound the same clock runs on time.
var EPIBARS=[0.12,2.37,4.62,6.97,9.31,11.56,13.82,16.04,18.30,20.55,22.99,25.24,27.68,30.12,32.37,34.62,36.87,39.13,41.54,43.79,46.05,48.30,50.55,52.80,55.05,57.28,59.54,61.97,64.23,66.48,68.73,70.96,73.21,75.46,77.72,79.95,82.20,84.45,86.70,88.96,91.18,93.25,95.50,97.76,100.01,102.26,104.49,106.74,108.99,111.22,113.45,115.73,117.96,120.19,122.46,124.71,127.13,129.38,131.63,133.86,136.12,138.37,140.60,142.85,145.08,147.33,149.58,151.81,154.06,156.32,158.55,160.80,163.03];
var EPISONG=175.2,EPILAST=169.4;
function barT0(n){return n<EPIBARS.length?EPIBARS[n]:EPIBARS[EPIBARS.length-1]+(n-EPIBARS.length+1)*2.25;}
function barT(n){var i=Math.floor(n),f=n-i;return f?barT0(i)+(barT0(i+1)-barT0(i))*f:barT0(i);}   // half bars for the fast cuts
function epiClock(){var e=G.epi;return e?(e.skip?1e9:e.clock||0):1e9;}
function epiAt(t){return function step(){return epiClock()>=t-0.03?[]:[{wait:0.04},step];};}
// Part A: the montage (31 bars). B: the receipt rolls while they sit on the floor (the song's quieter middle).
// C: the last chorus: one bar each, no captions, faster. D: the bird and the credit, held to the last note.
var EPIA=[2,2,2,2,2,2,1,0.5,1,1,2,1.5,2,2,1,2,2,1,3];   // still 32 bars: the car is half a bar, the application one and a half
// Twelve bars after the receipt, all new: Ekskyysmi in its headband, and two places from part two seen from another angle.
function epiTic(t,x,y,o){return function(){G.tics.push(tic(t,x,y,o||{life:1.6,size:18}));};}
var EPIN=[
  {bars:1,cut:'smash',set:'home',clock:20*3600,s:1.25,mood:'stern',hx:560,ninja:1,pose:'five',five:{dx:20,dy:-60},cam:[1.5,420,250, 1.6,410,245],
    at:[[0.5,epiTic('HI-YA.',300,150)]]},
  // The form, page 3 (Joonas 21.11.: questions and scribbled answers, and Ekskyysmi signs). No diagnosis, no advice.
  {bars:3,cut:'hard',set:'clinic',clock:14*3600+10*60,s:1.3,mood:'worry',hx:330,cam:[1.15,480,262, 1.2,480,262],form:1,
    at:[[2.2,function(){G.morko.sT=1.6;G.morko.mood='scared';}],[3.6,function(){G.morko.sT=1.1;G.morko.mood='alert';}],[5.4,function(){G.morko.mood='pleased';G.morko.sT=1.25;sfx('stamp');}]]},
  {bars:1,cut:'hard',set:'home',clock:22*3600,s:0.42,mood:'alert',hx:330,ninja:1,off:190,cam:[1.7,520,240, 1.7,520,240],
    at:[[0.6,epiTic('(stealth.)',560,150,{life:1.4,size:15})]]},
  {bars:2,cut:'hard',set:'clinic',clock:9*3600+5*60,s:1.2,mood:'scared',hx:470,face:'stiff',cam:[1.45,450,250, 1.45,450,250],
    at:[[0.6,epiTic('SMALL SCRATCH.',520,170,{life:1.8,size:18})],[1.7,function(){var g=G,M=g.morko;M.sT=0.32;M.mood='surprised';g.human.face='smile';g.tics.push(tic('thud.',g.human.x-80,FEETY-60,{life:1.6,size:15}));}],
        [2.8,epiTic('brave things nobody saw: +1',300,120,{life:1.8,size:15})]]},
  {bars:2,cut:'hard',set:'home',clock:9*3600,s:1.3,mood:'stern',hx:470,ninja:1,pose:'five',five:{dx:60,dy:-30},cam:[1.35,470,255, 1.45,480,250],
    at:[[0.1,epiDraft('Riitta: “Quick chat?”')],[1.5,epiTic('CHOP.',560,210)],[1.8,epiDraft('Riitta: “Quick chat? Good news, actually.”')],[2.9,function(){var M=G.morko;M.mood='surprised';M.sT=0.9;}]]},
  {bars:2,cut:'hard',set:'room',clock:16*3600,s:0.95,mood:'worry',hx:430,zone:1,cam:[1.3,480,290, 1.3,480,290],
    at:[[0.4,epiTic('COMFORT ZONE',430,440,{life:3.6,size:15})],[1.3,function(){G.human.xT=G.human.x+120;G.morko.sT=1.25;G.morko.mood='alert';}],[2.6,function(){G.morko.sT=0.95;G.morko.mood='pleased';G.tics.push(tic('one step out. filed.',300,190,{life:1.8,size:15}));}]]},
  {bars:2,cut:'fade',set:'home',clock:21*3600,s:1.0,mood:'pleased',hx:470,face:'smile',ninja:1,pose:'shoulder',cam:[1.6,460,280, 1.45,465,285],
    at:[[1.0,epiTic('TEAM.',560,170,{life:2.4,size:18})]]}
];
var EPIC=['LUNCHES'];   // kept for older saves of the lab; the chorus is now EPIN
function epiCopy(o,extra){var c={},k;for(k in o)c[k]=o[k];for(k in extra)c[k]=extra[k];return c;}
function epiFind(l){for(var i=0;i<EPI.length;i++)if(l==='laugh'?EPI[i].face==='laugh':EPI[i].l===l)return EPI[i];return null;}
// The whole receipt, rolling up like credits: every row of the week, the player's methods, the total, the maker.
function epiRollRows(){var r=[{h:'REALLY SMALL DEAL'},{h:'RECEIPT · THE WHOLE THING'},{gap:1}];
  EPI.forEach(function(o){if(!o.l)return;r.push({l:o.l,v:o.v});var n=typeof o.note==='function'?o.note():o.note;if(n)r.push({n:n});});
  var g=G,m=g.methods||{},imagined=(m.worst||0)+(g.files||0);
  r.push({gap:1},{h:'DAMAGE REPORT'},{l:'CRITICISM, ACTUAL',v:'1'},{n:'“shorter.” it was real. it was one word.'});
  if(imagined)r.push({l:'CRITICISM, IMAGINED',v:String(imagined)},{n:'all of it rehearsed. some of it twice.'});
  if(g.files)r.push({l:'OLD FILES, REOPENED',v:String(g.files)},{n:'the oldest one: year 2. a drawing.'});
  if(g.sips)r.push({l:'SIPS LOST',v:String(g.sips)},{n:g.bigSip?'the biggest: '+g.bigSip.t+' (−'+g.bigSip.n+')':'one at a time.'});
  if(g.mugMended)r.push({l:'MUGS BROKEN',v:'1'},{n:'repaired: gold.'});
  if(g.fineSent)r.push({l:'“FINE.”S SENT',v:'1'},{n:'repaired on a friday. in person.'});
  var mine=mineRows();if(mine.length){r.push({gap:1},{h:'EKSKYYSMI’S METHODS'});mine.forEach(function(m){r.push(m);});}
  // What it felt like from inside: time, effort and bravery nobody else could see. No diagnosis, no advice: bookkeeping.
  r.push({gap:1},{h:'WHAT IT FELT LIKE'});epiInsideRows().forEach(function(x){r.push(x);});
  r.push({gap:1},{l:'SUBTOTAL',v:'ONE WEEK'},{l:'DISCOUNTS',v:'NONE NEEDED'},{l:'TOTAL',v:'LIVED ONCE'},{gap:1},{h:'Made by Joonas Huhta'},{h:'MoshBitSurfers'},{gap:1},
    {n:'thank you for coming.'},{n:'no reply needed.'},{n:'(really.)'},{gap:1},{n:'ekskyysmi: finnish for “excuse me”.'});
  return r;}
function epiInsideRows(){
  var g=G,run=(g.run||[]).filter(function(d){return d.label!=='SCENARIO LAB';}),lived=0,cal=run.length,top=null;
  run.forEach(function(d){lived+=d.ratio;(d.ledger||[]).forEach(function(x){if(!top||x.secs>top.secs)top=x;});});
  // The inside of the week: senses first, then the head, then other people. One row each, no advice.
  var r=[{l:'TIME OUTSIDE THE COMFORT ZONE',v:'ALL OF IT'},{n:'source: eero.'},
    {l:'COLLAR LABEL, FELT',v:'ALL DAY'},{l:'CHEWING, NEXT TO ME',v:'DEAFENING'},{l:'PERFUME, IN THE LIFT',v:'ALL THE AIR'},
    {l:'TABS OPEN, IN HEAD',v:'37'}];
  if(top)r.push({l:'LONGEST REPLAY',v:dur(top.secs)},{n:top.label});else r.push({l:'“OH, HI.”, REPLAYED',v:'×41'});
  r.push({l:'“DO THEY STILL LIKE ME?”',v:'×23'},{n:'answer so far: yes.'},
    {l:'FACE HELD UP',v:'MOST DAYS'},{l:'RECOVERY AFTER ONE LUNCH',v:'ONE EVENING'},
    {l:'BRAVE THINGS NOBODY SAW',v:String(Math.max(3,(g.methods||{}).stay||0))},{n:'seen by: one shadow.'});
  if(cal)r.push({l:'DAYS ON THE CALENDAR',v:String(cal)},{l:'DAYS LIVED INSIDE',v:lived.toFixed(1)});
  return r;}
function epiRoll(e){
  if(!e.rows2)e.rows2=epiRollRows();var rows=e.rows2,lh=24,w=350,x=W-w-36,h=rows.length*lh+40,dur=e.o.secs||60,k=clamp(e.ct/dur,0,1);
  var y=H+10-k*(h+H*0.55),mono='"DM Mono",ui-monospace,Menlo,monospace';
  ctx.save();ctx.globalAlpha=clamp(e.ct/1.2,0,1);ctx.fillStyle='rgba(244,237,223,0.95)';ctx.fillRect(x,y,w,h);
  ctx.textBaseline='middle';rows.forEach(function(r,i){var yy=y+24+i*lh;if(yy<-20||yy>H+20)return;
    if(r.h){ctx.font='700 14px '+mono;ctx.textAlign='center';ctx.fillStyle='#2b2733';ctx.fillText(r.h,x+w/2,yy);}
    else if(r.n){ctx.font='500 11px '+mono;ctx.textAlign='left';ctx.fillStyle='#6b6470';ctx.fillText(r.n,x+16,yy);}
    else if(r.l){var val=typeof r.v==='function'?r.v():r.v;ctx.font='600 12.5px '+mono;ctx.textAlign='left';ctx.fillStyle='#2b2733';ctx.fillText(r.l,x+16,yy);ctx.textAlign='right';ctx.fillText(val,x+w-16,yy);
      var lw=ctx.measureText(r.l).width;ctx.textAlign='left';var vw=ctx.measureText(val).width;ctx.fillStyle='#8c8590';for(var d=x+16+lw+6;d<x+w-16-vw-6;d+=7)ctx.fillRect(d,yy+4,2,2);}});
  ctx.restore();
}
// The epilogue is a film: the panel and the hint line under the scene go away (on a phone they were an unreadable bar).
var EPIFORM=[[0.3,'q','7. How do you usually take criticism?'],[1.0,'a','personally.'],
  [2.0,'q','12. Do you replay conversations afterwards?'],[2.7,'a','only the ones that happened.'],
  [3.8,'q','18. Anything else we should know?'],[4.5,'a','it was a FULL STOP.'],[5.4,'sig','Ekskyysmi']];
function epiForm(e){var t=e.ct,x=560,y=58,w=360,h=300,mono='"DM Mono",ui-monospace,Menlo,monospace',hand='"Segoe Print","Bradley Hand","Comic Sans MS",cursive';
  ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(0.018);ctx.translate(-(x+w/2),-(y+h/2));
  ctx.fillStyle='rgba(0,0,0,.22)';ctx.fillRect(x+6,y+8,w,h);ctx.fillStyle='#f4eddf';ctx.fillRect(x,y,w,h);
  ctx.fillStyle='#2b2733';ctx.textAlign='left';ctx.textBaseline='middle';ctx.font='700 12px '+mono;ctx.fillText('FORM · PAGE 3 OF 9',x+18,y+22);
  ctx.fillStyle='#c9c0ad';ctx.fillRect(x+18,y+34,w-36,1);var yy=y+58;
  EPIFORM.forEach(function(r){if(t<r[0])return;var a=clamp((t-r[0])/0.3,0,1);ctx.globalAlpha=a;
    if(r[1]==='q'){ctx.fillStyle='#2b2733';ctx.font='500 13px '+mono;ctx.fillText(r[2],x+18,yy);yy+=26;}
    else if(r[1]==='a'){ctx.fillStyle='#24408f';ctx.font='italic 600 17px '+hand;ctx.fillText(r[2],x+34,yy);yy+=34;}
    else{ctx.fillStyle='#c9c0ad';ctx.fillRect(x+18,y+h-48,w-36,1);ctx.fillStyle='#24408f';ctx.font='italic 700 24px '+hand;ctx.fillText(r[2],x+30,y+h-62);
      ctx.fillStyle='#6b6470';ctx.font='500 11px '+mono;ctx.fillText('signature (the shadow)',x+18,y+h-34);}
    ctx.globalAlpha=1;});
  ctx.restore();}
function epiChrome(on){try{document.body.classList.toggle('epi-on',on);}catch(e){}}
// Skip: the first tap asks, a second tap within 2.5 s jumps to the black at the end.
function epiTap(){var e=G.epi;if(!e)return false;if(e.ask!=null&&G.time-e.ask<2.5){e.skip=true;music(null);return true;}e.ask=G.time;return true;}
function epiSkipHint(e){if(e.ask==null||G.time-e.ask>2.5||e.skip)return;ctx.save();ctx.globalAlpha=clamp(2.5-(G.time-e.ask),0,1)*0.85;ctx.fillStyle='rgba(13,17,20,.6)';rr(W-196,14,182,30,15);ctx.fill();
  ctx.fillStyle='#f4eddf';ctx.font='600 13px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Tap again to skip',W-105,29);ctx.restore();}
function labEpilogue(){
  var steps=[function(){G.epi={started:false,x:0,ct:0,snap:null,o:null,clock:0};G.lines=[];music('epilogue');epiChrome(true);}];
  var shots=EPI.slice(0,EPIA.length),b=1;
  steps.push(function(){var g=G;g.epi.theEnd=true;g.fade=0;g.hud=false;g.plan=false;g.lines=[];g.cur=null;g.band=null;});   // bar 0: “The End.” on black, over the song's quiet first bar
  steps.push(epiAt(barT(1)),function(){G.epi.theEnd=false;});
  shots.forEach(function(o,i){
    var b0=b,n=EPIA[i];b+=n;
    steps.push(epiAt(barT(b0)));
    if(o.mine)steps.push(function(){return mineRows().length?[epiShot(epiCopy(o,{secs:barT(b0+n)-barT(b0)}))]:[];});   // no methods: the previous shot holds
    else steps.push(epiShot(epiCopy(o,{secs:barT(b0+n)-barT(b0)})));
  });
  var rollStart=b,rollEnd=59;
  steps.push(epiAt(barT(rollStart)),epiShot({cut:'fade',set:'home',clock:23*3600+20*60,s:0.95,mood:'calm',hx:330,sitting:1,roll:1,
    cam:[1.3,360,300, 1.1,430,285],secs:barT(rollEnd)-barT(rollStart),
    at:[[barT(49)-barT(rollStart),function(){var M=G.morko;M.pose='puppet';G.morko.sT=0.9;G.human.pose=null;}],[barT(55)-barT(rollStart),function(){G.morko.pose='sit';G.human.pose='floor';}]]}));
  // After the receipt: things nobody has seen yet (Joonas 20.11.: no repeats). The headband years, the waiting room, the small scratch.
  var nb=rollEnd;EPIN.forEach(function(o){var b0=nb,n=o.bars||1;nb+=n;
    steps.push(epiAt(barT(b0)),epiShot(epiCopy(o,{noCap:1,secs:barT(b0+n)-barT(b0)})));});
  var cred=EPI[EPI.length-1],cb=nb;
  // the band stops at 169.4 s (onset analysis); the fade starts on that last hit and is black before the ring-out ends.
  steps.push(epiAt(barT(cb)),epiShot(epiCopy(cred,{secs:EPILAST-barT(cb)})),epiAt(EPILAST),function(){G.fade=0;G.fadeRate=-1/2.8;},epiAt(EPISONG),
    function(){G.epi=null;G.lines=[];G.cur=null;G.band=null;G.fade=1;G.fadeRate=0.0001;music(null);},{wait:0.8});
  return labScene({set:'home',title:'The week, itemised.',plan:'',clock:21*3600}).concat(steps);
}

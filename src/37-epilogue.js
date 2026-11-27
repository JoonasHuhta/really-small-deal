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
function epiLens(x,y,tag,honest){return function(){var q=geom();epiSay('S',tag);G.lens={x:q.bx+40,y:q.hdY+60,xT:x,yT:y,mode:'peek',tag:tag,spot:null,done:{},t:0,honest:!!honest};G.morko.pose='lens';};}
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
function epiDraft(t){return function(){var g=G,s=tr(t);epiSay('P',s);g.lines=[{who:'P',text:s}];g.cur={who:'P',text:s};g.curT=99;};}
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
// 0.99.34 (Joonas 27.11.: "much shorter cuts in many places, skiing, the bus stop, the bus, all kinds of doing, not just
// standing in the middle of a room; Ekskyysmi sometimes in close-up, pulling faces or doing its own thing"). Part A is now
// 23 shots in the same 24 bars (was 19), out of the flat: a bus, a canteen, a bus stop, the snow room, a lift. The shots of
// the trial Moments are parts of the week nobody was shown, like the umbrella: no caption depends on a choice made there.
// 0.99.40 (Joonas 27.11.: "hard to follow the receipts and read the texts when the background keeps changing"): part A is 16
// shots of a bar and a half (3.4 s), each long enough to read its caption. The uncaptioned gags (the ride home, the posting, the
// stamps, the deleted draft, the group photo) left the picture: their rows are on the roll (EPIROWS). The laughing flash went:
// the laugh is the montage's last shot, once.
var EPI=[
  // the opening title rides the bus: the town going by in the windows, the only moving background in the game
  {cut:'fade',set:'bus',clock:16*3600+32*60,s:0.85,mood:'calm',hx:460,bus:{x:1010},cam:[1.25,480,282, 1.05,480,272],title:'THE WEEK, ITEMISED'},
  {cut:'hard',set:'room',clock:12*3600,s:0.8,mood:'calm',hx:420,a:560,wave:1,face:'smile',cam:[1.45,490,262, 1.45,490,262],
    at:[[0.45,epiLens(555,330,'FACE: FRIENDLY. RE-CHECKING.',1)],[1.55,epiPunch(2.4,560,300)]],l:'FRIDAY LUNCHES',v:'1'},
  // Plus one.: the table grows between the other two, and carries the human away down it
  {cut:'hard',set:'canteen',clock:12*3600+20*60,s:0.8,mood:'alert',hx:370,plus:1,a:600,b:710,cam:[1.12,470,262, 1.12,470,262],
    at:[[0.35,function(){plusSlide(3)();var M=G.morko;M.sT=0.6;M.mood='worry';}]],l:'TABLES, LENGTHENED',v:'1',note:'final length: a short train.'},
  {cut:'hard',set:'office',clock:10*3600,s:0.75,mood:'worry',hx:250,b:560,pose:'selfeyes',cam:[1.2,410,268, 1.2,410,268],
    l:'SLIDES, PRESENTED',v:'1 (EERO)',note:'he was good. he still hates it.'},
  // smash: the alarm. Red, shaking, enormous, a siren. Then nothing happens, and the shadow deflates mid-shot.
  {cut:'smash',set:'room',clock:16*3600,s:2.3,mood:'scared',hx:470,pose:'grow',alarm:1,cam:[1.0,480,270, 1.0,480,270],
    at:[[1.7,function(){var g=G,M=g.morko;g.pulse=0;g.shake=0;M.sT=0.8;M.pose=null;M.mood='surprised';}]],
    l:'WORST CASES THAT HAPPENED',v:'0',note:function(){var n=(G.methods||{}).worst;return n?fmtN('prepared: {n}',n):'prepared: plenty';}},
  // Bus stop.: four polite metres, headlights, and he waves for both of them
  {cut:'hard',set:'busstop',clock:16*3600+31*60,s:1.3,mood:'alert',hx:150,bus:{x:540},cam:[1.1,380,262, 1.1,380,262],
    at:[[0.2,function(){G.bus.lightsT=1;sfx('car');}],[1.0,function(){G.bus.wave=true;var M=G.morko;M.mood='surprised';M.sT=1.05;}]],
    l:'BUSES, WAVED DOWN',v:'1',note:'by him. for both of us.'},
  // One step out of the comfort zone (0.99.42: from the after-part, in place of a fifth bus; Jari's name is on the roll). The shadow
  // grows, then settles: it came too. It always does; it is a shadow.
  {cut:'hard',set:'room',clock:16*3600,s:0.95,mood:'worry',hx:215,zone:1,cam:[1,480,270, 1,480,270],   // at the left: the chalk circle clear of the caption
    at:[[0.25,epiTic('COMFORT ZONE',215,440,{life:3,size:15})],[0.9,function(){G.human.xT=G.human.x+120;G.morko.sT=1.25;G.morko.mood='alert';}],[2.0,function(){G.morko.sT=0.95;G.morko.mood='pleased';}]],
    l:'COMFORT ZONES, LEFT',v:'1 STEP',note:'shadow: came along.'},
  {cut:'hard',set:'room',clock:16*3600+2*60,s:1.2,mood:'pleased',hx:500,face:'smile',pose:'journal',cam:[1.75,420,280,2.05,420,275],
    at:[[0,function(){G.journal={at:G.time};}],[1.2,function(){G.journal.shutAt=G.time;sfx('stamp');}]],
    l:'NOS, SAID OUT LOUD',v:function(){return String((G.quiet?1:0)+(G.no?1:0));},note:function(){return !G.no?'next time, then.':'wobbling: allowed';}},   // 0.92: the quiet Monday’s “No. Sorry.” counts too (Codex),
  // invented: rain, and Ekskyysmi holds an umbrella over the human. It is a shadow umbrella. The rain goes straight through.
  {cut:'hard',walk:1,s:0.45,mood:'pleased',pose:'five',five:{dx:34,dy:8},umbrella:1,rain:1,off:-190,cam:[1.3,430,300, 1.3,430,300],
    at:[[0.9,function(){var g=G;g.human.sweat=1;g.human.wet=true;g.human.face='stiff';}],[2.3,function(){G.human.face='smile';}]],
    l:'UMBRELLAS, HELD',v:'1',note:'effective: no. appreciated: yes.'},
  // Snow indoors. (#16b): skiing across the living room, into the light of the open door. Out there the shadow is blue.
  {cut:'fade',set:'dream',clock:3*3600+40*60,s:1.0,mood:'surprised',hx:300,dream:{door:1,blue:1},cam:[1.05,500,270, 1.15,560,262],
    at:[[0.15,function(){G.human.xT=DREAMDOOR.x-54;}],[2.2,function(){G.morko.mood='pleased';}]],
    l:'SUMMERS, VISITED',v:'1 (ON SKIS)',note:'shadow colour, discovered: blue.'},
  {cut:'hard',set:'library',clock:15*3600,s:0.8,mood:'calm',hx:430,cam:[1.25,460,266, 1.25,460,266],
    at:[[0.35,epiLens(560,300,'PAGE 212. NOBODY HAS DIED YET.')]],l:'LATE FEES',v:'€4.60',note:'lighthouses: a shared interest'},
  // The lift. (0.99.25 Moment): after you; no, after YOU; the doors close on the floor they wanted, and the lift goes back down
  {cut:'hard',set:'lift',clock:8*3600+55*60,s:0.85,mood:'surprised',hx:330,b:470,eeroShadow:548,lift:{floor:3,up:false},cam:[1.3,450,250, 1.3,450,250],
    at:[[1.2,function(){G.morko.mood='worry';}]],l:'FLOORS, MISSED',v:'1',note:'after you. no, after YOU.'},
  // The call. (0.99.29 Moment): fourteen branches written, one used
  {cut:'hard',set:'home',clock:18*3600+56*60,s:1.2,mood:'alert',hx:470,call:1,cam:[1.15,560,240, 1.15,560,240],
    at:[[0.9,function(){G.call.off=true;sfx('nope');var M=G.morko;M.mood='scared';M.sT=1.5;}]],l:'PHONE CALLS, MADE',v:'1',note:'branches written: 14. used: 1.'},
  // Ekskyysmi's own thing, in close-up: the lens, turned on whoever is watching
  {cut:'hard',set:'home',clock:22*3600+35*60,s:1.2,mood:'alert',hx:540,closeup:{z:1.9,dx:40},noCap:1,
    at:[[0.1,function(){var q=geom();epiLens(q.bx+120,q.hdY+40,'AUDIENCE: STILL HERE.')();}],[1.5,function(){G.epi.look='squint';}]]},
  {cut:'hard',set:'home',clock:22*3600,s:0.95,mood:'calm',hx:470,mine:1,pose:'selfmouth',cam:[1.55,450,250, 1.55,450,250]},
  {cut:'fade',set:'home',clock:23*3600,s:0.95,mood:'calm',hx:520,sitting:1,cam:[1.8,450,380, 1.05,475,290],
    l:'EVENING PLANS',v:'SIT HERE',note:'both signatures on file.'},   // the quiet Monday was the first (Codex),
  // 0.77 (Codex review): the last card before the radiator promises it; “The End.” and a maker credit here made players stop one
  // scene early. The maker is in the roll. 0.99.34 (Joonas: "what does the appointment at the end mean?"): “One appointment
  // outstanding.” read as the clinic's appointment from The form. It is the shadows' meeting on Tuesday, and now it says so.
  // 0.99.40: the two of them sitting, quiet; the bird has had its long turn under the receipt’s fanfare
  {cut:'fade',set:'home',clock:23*3600+1,s:0.9,mood:'calm',hx:470,sitting:1,cam:[1.05,475,290, 1.05,475,290],credit:['Still open: one meeting. Tuesday, by the radiator.','Ekskyysmi and Sanna’s shadow.']}
  // 0.99.40 (Joonas 27.11.: "I don't understand the radiator ending"): “Outstanding” reads as “excellent” to a Finn, and the card
  // never said whose meeting it was. The shadows agreed on it in Colleagues. (#8) and on Friday (#22); By the radiator. (#25) is next.
];
// The rows that are on the roll only (ALSO ON FILE): things the week did that the pictures do not show.
var EPIROWS=[
  {l:'NAMES, LEARNED',v:'1 (JARI)',note:'ours: drowned out by LIBRARY.'},
  {l:'UMBRELLA STORIES, TOLD',v:'1',note:'classified: not any more'},
  {l:'RIDES HOME',v:'1',note:'one in the car. one running behind.'},
  {l:'APPLICATIONS, SENT',v:'1',note:'drafted by one. sent by the other.'},
  {l:'REJECTIONS, SELF-ISSUED',v:'10',note:'all of them overturned on appeal.'},
  {l:'DRAFTS, DELETED',v:'1',note:'sent instead: ok 👍'},
  {l:'GROUP PHOTOS',v:'1',note:'shadows in shot: 1 (uninvited)'},
  {l:'STREETLAMPS, PASSED',v:'9',note:'sizes: all of them.'}
];
// The player's own top methods, as rows. In the lab (or a week with no choices) the shot is skipped.
var MINE={worst:'WORST CASES, PREPARED',draft:'SCRIPTS, DRAFTED',please:'YESES, UNMEANT',hide:'EXITS, TAKEN',stay:'TIMES WE STAYED',hush:'SILENCES, KEPT'};
function mineRows(){var m=G.methods||{};return Object.keys(MINE).filter(function(k){return m[k]>0;}).sort(function(a,b){return m[b]-m[a];}).slice(0,3).map(function(k){return {l:MINE[k],v:'×'+m[k]};});}
function epiSnap(){try{var c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;c.getContext('2d').drawImage(cv,0,0);return c;}catch(e){return null;}}
// 0.79 (Codex review: the receipt and the captions were only pixels): everything the epilogue writes on the screen also goes
// into Dialogue (Menu → Dialogue), to be read at your own pace, and to a screen reader through a hidden live region.
function epiSay(who,text,quiet){text=trQ(text);history.push({who:who,text:text});if(!quiet)try{var el=document.getElementById('epi-sr');if(el)el.textContent=text;}catch(e){}}
function epiTell(o){
  if(o.title)epiSay('N',tr(o.title));
  if(o.l&&!o.noCap){var note=typeof o.note==='function'?o.note():o.note,val=typeof o.v==='function'?o.v():o.v;epiSay('N',tr(o.l)+': '+trQ(String(val))+(note?' — '+tr(note):''));}   // 0.92: a counted value was read out as its source code
  if(o.mine)mineRows().forEach(function(m,i){epiSay('N',tr(m.l)+': '+trQ(String(m.v)),i>0);});
  if(o.form){epiSay('N',tr('FORM · PAGE 3 OF 9'));EPIFORM.forEach(function(r){epiSay(r[1]==='q'?'N':'S',r[1]==='sig'?tr('Signed: Ekskyysmi'):tr(r[2]),true);});}
  if(o.roll){epiSay('N',tr('The receipt for the whole week. Every line is here in Dialogue.'));var rows=epiRollRows();
    for(var i=0;i<rows.length;i++){var r=rows[i];if(r.h)epiSay('N',tr(r.h),true);
      else if(r.l){var v=typeof r.v==='function'?r.v():r.v,n=rows[i+1]&&rows[i+1].n;epiSay('N',tr(r.l)+': '+trQ(String(v))+(n?' — '+tr(n):''),true);if(n)i++;}
      else if(r.n)epiSay('N',tr(r.n),true);}}
  if(o.credit){var cr=[].concat(o.credit);cr.forEach(function(c){epiSay('N',c,true);});
    try{var sr=document.getElementById('epi-sr');if(sr)sr.textContent=cr.map(function(c){return trQ(c);}).join(' ');}catch(_){}}
}
function epiShot(o){return function(){
  epiTell(o);
  var snap=G.epi&&G.epi.started&&(o.cut||'fade')==='fade'?epiSnap():null;   // hard and smash cuts have no crossfade
  if(o.walk){scene({set:'room',clock:23*3600})();startWalk();G.card=0;G.w.x=520;G.w.speed=o.umbrella?0:o.drive?150:o.speed||34;G.w.xT=o.drive?99999:G.w.xT;G.clock=23*3600+40*60;}
  else scene({set:o.set,clock:o.clock})();
  var g=G,M=g.morko,Hm=g.human;g.fade=0;g.hud=false;g.plan=false;
  if(o.bar){barSetup();var b=g.bar;b.sdrink=true;b.shelter=true;b.umbrella=1;}
  Hm.x=Hm.xT=o.hx||HOME;if(o.face)Hm.face=o.face;if(o.sitting||o.drive)Hm.pose='floor';
  if(o.facing)Hm.facing=o.facing;if(o.reach)Hm.reach={x:Hm.x+Hm.facing*38,y:FEETY-150};if(o.five)g.five={dx:o.five.dx,dy:o.five.dy};
  M.s=M.sT=o.s||1;M.mood=o.mood||'calm';M.pose=o.bar?'shelter':o.sitting?'sit':o.pose||null;
  if(o.a){g.cowA=true;g.ax=g.axT=o.a;g.aFace=-1;g.aWave=!!o.wave;if(o.z){g.zT=1;g.zShow=0.2;}}
  if(o.b){g.cowB=true;g.bx2=g.bxT=o.b;g.bFace=o.r?1:-1;}
  if(o.bFace)g.bFace=o.bFace;if(o.eeroShadow){g.yx=g.yxT=o.eeroShadow;g.yShow=g.yT=1;}
  g.ninja=!!o.ninja;M.hat=o.hat||null;
  // 0.99.34 (Joonas 27.11.: shorter cuts, more going on, skiing, the bus stop, the bus, Ekskyysmi doing its own thing)
  g.epi.look=o.look||null;
  if(o.dream){g.dream={door:o.dream.door,doorT:o.dream.door,blue:o.dream.blue||0,blueT:o.dream.blue||0,skis:o.dream.skis!==false,melt:0};g.noCup=true;}
  g.bus=o.bus?{x:o.bus.x,xT:o.bus.x,wave:!!o.bus.wave,lights:o.bus.lights||0,lightsT:o.bus.lights||0,tape:!!o.bus.tape,dist:'polite',announce:0}:null;
  g.lift=o.lift?{floor:o.lift.floor,up:o.lift.up!==false,ding:0,doors:o.lift.doors||0,doorsT:o.lift.doors||0}:null;
  g.plus=o.plus!=null?{hx:[470,370,270,170][o.plus],n:o.plus}:null;if(g.plus)Hm.x=Hm.xT=g.plus.hx;
  g.santa=o.santa?{open:true}:null;g.call=o.call?{script:true,live:true,off:false}:null;
  if(o.set==='busstop'||o.set==='bus'||o.set==='dream'||o.set==='party')g.noCup=true;
  if(o.meadow)g.epi.meadowO={stretch:G.time};   // Snow indoors.' meadow, drawn whole by drawMeadow (70-draw.js routes it)
  g.epi.dark=0;g.epi.darkT=0;
  if(o.r){g.cowR=true;g.rx=o.r;}
  if(!o.walk)M.off=o.off!=null?o.off:-70-(M.s-1)*12;   // a cut puts the shadow where it belongs at once: it no longer slides into place
  // composed framing: start, and drift to the end over the shot. Less motion: the end framing, no drift.
  var c=o.cam||[1.025,W/2,H/2,1.06,W/2,H/2];
  if(o.closeup){var q=geom(),cy=q.hdY+16*M.s,cx=q.bx+(o.closeup.dx||0)/o.closeup.z;c=[o.closeup.z,cx,cy, o.closeup.z*1.05,cx,cy];}   // the face, wherever the shadow is
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
    ctx.font='500 54px Fraunces,Georgia,serif';ctx.fillText('That was the week.',W/2,H/2-8,W-80);ctx.font='500 17px system-ui,sans-serif';ctx.fillStyle='#b9b2a6';ctx.fillText('(Ekskyysmi kept the receipts)',W/2,H/2+40,W-80);ctx.globalAlpha=1;return;}
  epiSkipHint(e);
  if(e.o){epiWorld(e.o,e);if(e.o.rain)epiRain();}
  // a warm wash, a little haze: the week as remembered
  var gr=ctx.createRadialGradient(W/2,H*0.45,H*0.2,W/2,H/2,H*0.9);gr.addColorStop(0,'rgba(255,224,170,0.10)');gr.addColorStop(1,'rgba(30,22,40,0.55)');
  ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(236,226,206,0.10)';ctx.fillRect(0,0,W,H);
  epiEyes(e);
  if(e.snap&&e.x>0){ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=e.x;ctx.drawImage(e.snap,0,0);ctx.restore();ctx.setTransform(SC,0,0,SC,0,0);}
  var o=e.o;if(!o)return;
  if(o.form)epiForm(e);
  if(e.roll)epiRoll(e);
  if(e.roll||o.noCap)return;
  var rows=o.mine?(e.rows||[]):o.l?[{l:o.l,v:o.v}]:[];
  if(!rows.length&&!o.title&&!o.credit)return;
  var lead=Math.min(0.8,(o.secs||5.5)*0.12),a=clamp((e.ct-lead)/0.4,0,1)*clamp(((o.secs||5.5)-0.15-e.ct)/0.35,0,1);if(a<=0)return;   // short shots: caption early and held to the cut
  ctx.save();ctx.globalAlpha=a;ctx.textBaseline='middle';
  if(o.credit){var cr=[].concat(o.credit),cy=H-(cr.length>1?76:58);ctx.textAlign='center';ctx.font='500 22px Fraunces,Georgia,serif';ctx.fillStyle='#f4eddf';ctx.fillText(cr[0],W/2,cy,W-60);
    if(cr[1]){ctx.font='italic 400 18px Fraunces,Georgia,serif';ctx.fillStyle='#d8cdb8';ctx.fillText(cr[1],W/2,cy+30,W-60);}   // who: a quieter second line
    ctx.restore();return;}
  var note=typeof o.note==='function'?o.note():o.note,mono='"DM Mono",ui-monospace,Menlo,monospace';
  ctx.font='500 12px '+mono;var w=Math.max(380,note?ctx.measureText(note).width+40:0),lh=24;
  if(!o.title){ctx.font='600 14px '+mono;rows.forEach(function(r){var v=typeof r.v==='function'?r.v():r.v;w=Math.max(w,ctx.measureText(r.l).width+ctx.measureText(String(v)).width+70);});}
  w=Math.min(w,W-40);var h=24+(o.title?1:rows.length)*lh+(note?18:0),x=W/2-w/2,y=H-30-h;
  ctx.translate(W/2,y+h/2);ctx.rotate(-0.012);ctx.translate(-W/2,-(y+h/2));
  ctx.fillStyle='rgba(244,237,223,0.94)';ctx.fillRect(x,y,w,h);
  for(var i=0;i<w;i+=8){ctx.beginPath();ctx.moveTo(x+i,y+h);ctx.lineTo(x+i+4,y+h+5);ctx.lineTo(x+i+8,y+h);ctx.fill();}   // torn edge
  ctx.fillStyle='#2b2733';
  if(o.title){ctx.font='700 15px '+mono;ctx.textAlign='center';ctx.fillText(o.title,W/2,y+12+lh/2,w-24);}
  else rows.forEach(function(r,i){var yy=y+12+lh/2+i*lh;ctx.font='600 14px '+mono;ctx.textAlign='left';ctx.fillText(r.l,x+18,yy,w*0.62);
    var val=typeof r.v==='function'?r.v():r.v;var lw=ctx.measureText(r.l).width;ctx.textAlign='right';ctx.fillText(val,x+w-18,yy);var vw=ctx.measureText(val).width;
    ctx.fillStyle='#8c8590';for(var d=x+18+lw+8;d<x+w-18-vw-8;d+=7)ctx.fillRect(d,yy+4,2,2);ctx.fillStyle='#2b2733';});
  if(note){ctx.font='500 12px '+mono;ctx.textAlign='left';ctx.fillStyle='#6b6470';ctx.fillText(note,x+18,y+h-14,w-36);}
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
var EPIA=[1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5];   // 0.99.40: 16 shots of 1.5 bars (0.99.34 had 23, most a bar or less: too fast to read)
// Part B (0.99.34): the receipt rolls up on the right over the song's quiet middle, and the week goes on beside it, on the left.
// Until 0.99.33 it was one shot of the two sitting on the floor for 58 seconds. Now ten shots, none of them with a caption
// (the roll is the caption), and the sitting comes last, under the credits. A row here goes into the roll's ALSO ON FILE.
// epiL: frame a subject at world x on the left of the picture, clear of the roll.
function epiL(x,y,z,z2){z2=z2||z;return [z,x+220/z,y, z2,x+220/z2,y];}
// 0.99.40 (Joonas 27.11.): beside the long receipt the picture may change, but not all the time: eight shots of three to nine bars,
// and the bird (“it can go on for a long time”) carries the receipt's last part, its total and the credits, on the song's fanfare.
var ROLLSTART=25,ROLLFANFARE=54,ROLLEND=59;   // bar 54 ≈ 2:02.5 and bar 59 ≈ 2:13.9: the end of the receipt lands on the fanfare
var EPIB=[
  // Ekskyysmi reads its own receipt: the eyes go right, to the roll
  {bars:3,cut:'fade',set:'home',clock:23*3600+5*60,s:1.15,mood:'calm',hx:420,closeup:{z:2.3,dx:100},
    at:[[1.6,function(){G.epi.look='stunned';}],[3.8,function(){G.epi.look='soft';}],[5.6,function(){G.epi.look=null;G.morko.mood='pleased';}]]},
  {bars:4,cut:'fade',set:'dream',clock:3*3600+35*60,s:1.05,mood:'alert',hx:520,facing:-1,dream:{door:0,blue:0},cam:[1.25,580,262, 1.3,590,262],
    at:[[0.3,function(){G.human.xT=400;}],[2.2,catchFlake],[3.8,function(){G.morko.pose=null;G.epi.look='soft';}],[5.4,function(){G.epi.look=null;G.human.xT=470;}],[7.0,catchFlake]],
    l:'SNOWFLAKES, FILED',v:'2',note:'the file: wet, empty. a favourite.'},
  {bars:4,cut:'fade',set:'busstop',clock:16*3600+27*60,s:0.95,mood:'alert',hx:190,bus:{x:520},cam:[1,480,270, 1,480,270],
    at:[[1.4,function(){G.bus.xT=485;G.morko.sT=1.35;G.morko.mood='scared';}],[3.0,function(){G.human.xT=158;}],[4.0,function(){G.morko.sT=0.95;G.morko.mood='calm';}],
        [5.6,function(){G.bus.xT=470;G.morko.sT=1.3;G.morko.mood='alert';}],[7.0,function(){G.human.xT=140;}],[8.0,function(){G.morko.sT=0.95;G.morko.mood='pleased';}]],
    l:'DISTANCES, KEPT',v:'4 M',note:'give or take 0.3. both ways.'},
  {bars:4,cut:'fade',set:'bus',clock:16*3600+38*60,s:0.7,mood:'surprised',hx:430,bus:{x:570},cam:[1.44,583,240, 1.44,583,240],
    at:[[1.2,function(){G.epi.look='stunned';}],[3.0,function(){var g=G;g.epi.look=null;g.morko.mood='pleased';g.human.face='smile';}],[5.4,function(){G.bus.announce=2.6;}]],
    l:'POLES, SHARED',v:'1',note:'hands at the same height. (married.)'},
  // invented: the lamp goes out. Two pairs of eyes in the dark, side by side. Nobody panics. The lamp comes back.
  {bars:3,cut:'fade',set:'home',clock:22*3600+40*60,s:0.95,mood:'calm',hx:330,facing:-1,cam:epiL(290,250,1.45),
    at:[[0.9,function(){var g=G;g.lampOff=true;g.epi.darkT=1;sfx('turn');}],[4.8,function(){var g=G;g.lampOff=false;g.epi.darkT=0;sfx('turn');}]],
    l:'POWER CUTS',v:'1',note:'eyes in the dark: four. panic: none.'},
  {bars:3,cut:'fade',set:'party',clock:16*3600+50*60,s:0.9,mood:'pleased',hx:360,r:500,santa:1,hat:'party',pose:'toast',cam:[1.4,520,250, 1.4,520,250],
    at:[[2.4,function(){var M=G.morko;M.pose=null;M.sT=1.05;}],[4.2,function(){G.epi.look='soft';}]],l:'SOCKS, GIVEN',v:'1 PAIR',note:'cold since september: handled.'},
  {bars:4,cut:'fade',set:'home',clock:20*3600,s:1.0,mood:'calm',hx:330,face:'smile',pose:'hug',off:0,cam:epiL(330,320,1.75,1.5),
    l:'DRAWINGS SHARED',v:'1',note:'legs: five. accounts closed: 0.'},
  // the bird: from bar 50 to the end of the receipt, through the fanfare. The human watches it, then sits down to watch it.
  {bars:9,cut:'fade',set:'home',clock:23*3600+20*60,s:0.95,mood:'pleased',hx:300,cam:epiL(250,290,1.25,1.12),
    at:[[0.2,function(){var M=G.morko;M.pose='puppet';M.sT=0.95;G.human.face='smile';}],[7.0,function(){G.human.pose='floor';}],[12.5,function(){G.morko.sT=1.1;}]]}
];
// Part C: after the receipt, things nobody has seen yet (Joonas 20.11.: no repeats), cut faster (27.11.): the headband years,
// the waiting room, the small scratch, three faces, and the long shadow in the summer grass.
function epiTic(t,x,y,o){return function(){G.tics.push(tic(t,x,y,o||{life:1.6,size:18}));};}
// 0.99.40: after the receipt (it ends on the fanfare at 2:14) about 28 seconds to the last card: the form, the application sent,
// the X-ray (0.99.42: wide, then the archive close; the comfort zone moved to the opening), four faces in four hats, the meadow
// and the laugh, once.
var XRAYCAM=[2.0,413,236, 2.15,413,240];   // the filing cabinet in Ekskyysmi's chest, framed (0.99.42)
var EPIN=[
  // The form, page 3 (Joonas 21.11.: questions and scribbled answers, and Ekskyysmi signs). No diagnosis, no advice.
  {bars:3,cut:'hard',set:'clinic',clock:14*3600+10*60,s:1.3,mood:'worry',hx:330,cam:[1.15,480,262, 1.2,480,262],form:1,
    at:[[1.5,function(){G.morko.sT=1.6;G.morko.mood='scared';}],[2.7,function(){G.morko.sT=1.1;G.morko.mood='alert';}],[3.9,function(){G.morko.mood='pleased';G.morko.sT=1.25;}],[4.9,function(){sfx('stamp');}]]},
  // The posting (#19) pays off here, after the form: Ekskyysmi drafts four pages; the human sends three lines. (0.99.40: moved
  // from the opening montage, where it went by in two seconds; the small scratch made room. Its row, BRAVE THINGS, is on the roll.)
  {bars:1.5,cut:'hard',set:'home',clock:22*3600+47*60,s:1.15,mood:'alert',hx:470,cam:[1.4,500,262, 1.5,500,258],
    at:[[0.05,epiDraft('Page four: “…in conclusion, sorry.”')],
        [1.6,epiDraft('Sent: three lines. No apology.')],[1.65,function(){sfx('pop');var M=G.morko;M.mood='surprised';M.sT=0.8;}]]},
  // Ekskyysmi's X-ray (0.99.9; back in 0.99.42, Joonas 27.11.: "keep the X-ray, and linger: from far, then a cut to a close-up,
  // so you really see it is the archive filing system"). Wide: the office in X-ray, the lightning heart, Eero's calm skeleton. Close:
  // the cabinet. TODAY opens, the week's receipt goes in, it closes. The archive is still there after a good week; it has this in it.
  {bars:1.25,cut:'hard',set:'office',hx:490,b:680,s:1.6,xray:'END OF WEEK',cam:[1,480,270,1,480,270]},
  {bars:1.75,cut:'hard',set:'office',hx:490,b:680,s:1.6,xray:'END OF WEEK',file:1,cam:XRAYCAM},
  // Faces and hats in one (0.99.42; the faces 0.99.34, Joonas: "Ekskyysmi in close-up, pulling faces"; the hats 0.99.9, one from
  // each of their Moments): the same face, a little closer on every beat, a new look and a new hat each time. Four cuts, not seven.
  {bars:0.375,cut:'hard',set:'home',clock:21*3600,hx:470,s:1.1,mood:'calm',look:'squint',hat:'chef',closeup:{z:2.0,dx:0}},
  {bars:0.375,cut:'hard',set:'home',clock:21*3600,hx:470,s:1.1,mood:'calm',look:'stunned',hat:'pirate',closeup:{z:2.2,dx:0}},
  {bars:0.375,cut:'hard',set:'home',clock:21*3600,hx:470,s:1.1,mood:'calm',look:'soft',hat:'detective',closeup:{z:2.4,dx:0}},
  {bars:0.375,cut:'hard',set:'home',clock:21*3600,hx:470,s:1.1,mood:'pleased',hat:'party',closeup:{z:2.55,dx:0}},
  // Snow indoors., through the door: midnight in July, and the shadow forty metres long in the grass
  {bars:1.5,cut:'fade',meadow:1,cam:[1.0,480,270, 1.05,460,270]},
  {bars:2,cut:'fade',set:'home',clock:21*3600,hx:470,s:1,mood:'pleased',face:'laugh',pose:'shoulder',cam:[1.55,440,265,1.35,455,285],
    at:[[0.5,epiHa(-28,-6)],[0.9,epiHa(35,0)],[2.6,function(){G.human.face='smile';G.morko.mood='care';}]]}
];
var EPIC=['LUNCHES'];   // kept for older saves of the lab; the chorus is now EPIN
function epiCopy(o,extra){var c={},k;for(k in o)c[k]=o[k];for(k in extra)c[k]=extra[k];return c;}
function epiFind(l){for(var i=0;i<EPI.length;i++)if(l==='laugh'?EPI[i].face==='laugh':EPI[i].l===l)return EPI[i];return null;}
// The whole receipt, rolling up like credits: every row of the week, the player's methods, the total, the maker.
function epiRollRows(){var r=[{h:'REALLY SMALL DEAL'},{h:'RECEIPT · CONTINUED'},{gap:1}];
  if(G.lab==='epilogue')r.push({n:'preview: one example playthrough.'});
  // 0.99.34: the captions have itemised their rows already; the roll carries the ones nobody has read yet
  r.push({h:'ALSO ON FILE'});EPIROWS.concat(EPIB).forEach(function(o){if(!o.l)return;   // 0.99.40: the roll-only rows, then the ones beside it
  r.push({l:o.l,v:o.v});var n=typeof o.note==='function'?o.note():o.note;if(n)r.push({n:n});});
  var g=G;
  r.push({gap:1},{h:'DAMAGE REPORT'},{l:'RIITTA’S EDIT',v:'1 WORD'},{n:'“Shorter.”'});
  // 0.92 (Codex humour round): CRITICISM, IMAGINED is gone. It counted the old files, which were real, and without them it only
  // repeated the worst cases already on the receipt (WORST CASES THAT HAPPENED · 0 · prepared: n). “ACTUAL” still answers all of those.
  if(g.files)r.push({l:'OLD FILES, REOPENED',v:String(g.files)},{n:'the oldest one: year 2. a drawing.'});
  if(g.sips)r.push({l:'SIPS LOST',v:String(g.sips)},{n:g.bigSip?'the biggest: '+g.bigSip.t+' (−'+g.bigSip.n+')':'one at a time.'});
  if(g.mugMended)r.push({l:'MUGS BROKEN',v:'1'},{n:'repaired: gold.'});
  if(g.fineSent)r.push({l:'“FINE.”S SENT',v:'1'},{n:'repaired on a friday. in person.'});
  var mine=mineRows();if(mine.length){r.push({gap:1},{h:'EKSKYYSMI’S METHODS'});mine.forEach(function(m){r.push(m);});}
  // What it felt like from inside: time, effort and bravery nobody else could see. No diagnosis, no advice: bookkeeping.
  r.push({gap:1},{h:'WHAT IT FELT LIKE'});epiInsideRows().forEach(function(x){r.push(x);});
  r.push({gap:1},{l:'SUBTOTAL',v:'ONE FILED WEEK'},{l:'DISCOUNTS',v:'NONE NEEDED'},{l:'TOTAL',v:'LIVED ONCE'},{gap:1},{h:'Made by Joonas Huhta'},{h:'MoshBitSurfers'},{gap:1},
    {n:'thank you for coming.'},{n:'no reply needed.'},{n:'(really.)'},{gap:1},{n:'ekskyysmi: finnish for “excuse me”.'});
  return r;}
function epiInsideRows(){
  // Friday is still open while the epilogue rolls: count it, as the receipt after the radiator will (Codex review, 0.77)
  var g=G,run=(g.run||[]).concat(g.day0?[g.day0]:[]).filter(function(d){return d.label!=='SCENARIO LAB';}),lived=0,cal=run.length,top=null;
  run.forEach(function(d){lived+=dayRatio(d);(d.ledger||[]).forEach(function(x){if(!top||x.secs>top.secs)top=x;});});
  // The inside of the week: senses first, then the head, then other people. One row each, no advice.
  var r=[{l:'TIME OUTSIDE THE COMFORT ZONE',v:'ALL OF IT'},{n:'source: eero.'},
    {l:'COLLAR LABEL, FELT',v:'ALL DAY'},{l:'CHEWING, NEXT TO ME',v:'DEAFENING'},{l:'SPEAKERPHONE, OPEN OFFICE',v:'SINCE NINE'},   // Wednesday’s, from the story (0.92)
    {l:'TABS OPEN, IN HEAD',v:'37'}];
  if(g.lab==='epilogue'){cal=5;lived=10.4;top={secs:14*3600+7*60,label:'rest of the day, twice'};}
  if(top)r.push({l:'LARGEST TIME ENTRY',v:dur(top.secs)},{n:top.label});
  r.push(
    {l:'“DO THEY STILL LIKE ME?”',v:'×23'},{n:'answer so far: yes.'},
    {l:'FACE HELD UP',v:'MOST DAYS'},{l:'RECOVERY AFTER ONE LUNCH',v:'ONE EVENING'},
    {l:'BRAVE THINGS NOBODY SAW',v:'ON FILE'},{n:'seen by: one shadow.'},
    {l:'SHIFTS COVERED',v:'1'},{n:'covered by: another shadow.'});   // 0.92: “Nobody came to relieve me.” (Thursday) → the night shift (#20)
  if(cal)r.push({l:'WEEKDAYS FILED',v:String(cal)},{l:'DAYS LIVED INSIDE',v:lived.toFixed(1)});
  return r;}
function epiRoll(e){
  if(!e.rows2)e.rows2=epiRollRows();
  var rows=e.rows2,lh=24,w=350,x=W-w-36,h=rows.length*lh+40,r=e.roll,t=epiClock()-r.t0,dur=r.t1-r.t0,D=h+H*0.55,trav;
  // 0.99.40 (Joonas 27.11.: "the best part of the song starts at about 2:02, with the fanfare; the end of the receipt goes there"):
  // the rows up to SUBTOTAL scroll in until bar ROLLFANFARE, and the last part (subtotal, total, the credits) on the fanfare.
  var ai=0;for(var q=0;q<rows.length;q++)if(rows[q].l==='SUBTOTAL'){ai=q;break;}
  var tA=(r.tA||r.t1)-r.t0,firstD=Math.min(D,(ai?ai*lh+40:D)+30);
  trav=t<tA?firstD*clamp(t/tA,0,1):firstD+(D-firstD)*clamp((t-tA)/Math.max(0.1,dur-tA),0,1);
  var y=H+10-trav,mono='"DM Mono",ui-monospace,Menlo,monospace';
  ctx.save();ctx.globalAlpha=clamp(t/1.2,0,1)*clamp((dur-t)/1.2,0,1);ctx.fillStyle='rgba(244,237,223,0.95)';ctx.fillRect(x,y,w,h);
  ctx.textBaseline='middle';rows.forEach(function(r,i){var yy=y+24+i*lh;if(yy<-20||yy>H+20)return;
    if(r.h){ctx.font='700 14px '+mono;ctx.textAlign='center';ctx.fillStyle='#2b2733';ctx.fillText(r.h,x+w/2,yy,w-24);}
    else if(r.n){ctx.font='500 11px '+mono;ctx.textAlign='left';ctx.fillStyle='#6b6470';ctx.fillText(r.n,x+16,yy,w-32);}
    else if(r.l){var val=String(typeof r.v==='function'?r.v():r.v);ctx.font='600 12.5px '+mono;ctx.fillStyle='#2b2733';   // 0.99.39: a longer language squeezes the label, never over its value
      var vw=Math.min(ctx.measureText(val).width,w*0.45),room=w-32-vw-12,lw=Math.min(ctx.measureText(r.l).width,room);
      ctx.textAlign='left';ctx.fillText(r.l,x+16,yy,room);ctx.textAlign='right';ctx.fillText(val,x+w-16,yy,w*0.45);
      ctx.textAlign='left';ctx.fillStyle='#8c8590';for(var d=x+16+lw+6;d<x+w-16-vw-6;d+=7)ctx.fillRect(d,yy+4,2,2);}});
  ctx.restore();
}
// The epilogue is a film: the panel and the hint line under the scene go away (on a phone they were an unreadable bar).
var EPIFORM=[[0.1,'q','7. How do you usually take criticism?'],[1.1,'a','personally.'],
  [2.4,'q','12. Do you replay conversations afterwards?'],[3.5,'a','only the ones that happened.'],[4.8,'sig','Ekskyysmi']];   // 0.99.34: three bars, not four
function epiForm(e){var t=e.ct,x=500,y=50,w=435,h=325,mono='"DM Mono",ui-monospace,Menlo,monospace',hand='"Segoe Print","Bradley Hand","Comic Sans MS",cursive';
  ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(0.018);ctx.translate(-(x+w/2),-(y+h/2));
  ctx.fillStyle='rgba(0,0,0,.22)';ctx.fillRect(x+6,y+8,w,h);ctx.fillStyle='#f4eddf';ctx.fillRect(x,y,w,h);
  ctx.fillStyle='#2b2733';ctx.textAlign='left';ctx.textBaseline='middle';ctx.font='700 12px '+mono;ctx.fillText('FORM · PAGE 3 OF 9',x+18,y+22,w-36);
  ctx.fillStyle='#c9c0ad';ctx.fillRect(x+18,y+34,w-36,1);var yy=y+58;
  EPIFORM.forEach(function(r){if(t<r[0])return;var a=clamp((t-r[0])/0.3,0,1);ctx.globalAlpha=a;
    if(r[1]==='q'){ctx.fillStyle='#2b2733';ctx.font='500 16px '+mono;wrapText(r[2],w-36).forEach(function(l){ctx.fillText(l,x+18,yy);yy+=21;});yy+=11;}
    else if(r[1]==='a'){ctx.fillStyle='#24408f';ctx.font='italic 600 21px '+hand;wrapText(r[2],w-52).forEach(function(l){ctx.fillText(l,x+34,yy);yy+=27;});yy+=16;}
    else{ctx.fillStyle='#c9c0ad';ctx.fillRect(x+18,y+h-48,w-36,1);ctx.fillStyle='#24408f';ctx.font='italic 700 24px '+hand;ctx.fillText(r[2],x+30,y+h-62);
      ctx.fillStyle='#6b6470';ctx.font='500 11px '+mono;ctx.fillText('signature (the shadow)',x+18,y+h-34);}
    ctx.globalAlpha=1;});
  ctx.restore();}
function epiChrome(on){try{document.body.classList.toggle('epi-on',on);resize();}catch(e){}}   // 0.82: the layout changes size on the desktop, so the canvas does too
// Skip: the first tap asks, a second tap within 2.5 s jumps to the black at the end.
function epiTap(){var e=G.epi;if(!e)return false;if(e.ask!=null&&G.time-e.ask<2.5){e.skip=true;music(null);return true;}e.ask=G.time;return true;}
function epiSkipHint(e){if(e.ask==null||G.time-e.ask>2.5||e.skip)return;ctx.save();ctx.globalAlpha=clamp(2.5-(G.time-e.ask),0,1)*0.85;ctx.fillStyle='rgba(13,17,20,.6)';rr(W-356,14,342,30,15);ctx.fill();
  ctx.fillStyle='#f4eddf';ctx.font='600 13px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Tap again to skip. Every line is in Dialogue.',W-185,29);ctx.restore();}
// Standalone screenings have no preceding chapters. These figures come from the
// Monday B / first available choices test run. Only the disposable lab state is used.
function previewReceipt(g){
  g.no=g.quiet=g.mugMended=g.fineSent=true;
  g.files=14;g.sips=13;g.bigSip={t:'“oh, hi.”',n:2};
  g.methods={draft:2,worst:6,hide:3,stay:3,please:5};
}
function labEpilogue(){
  var steps=[function(){if(G.lab==='epilogue')previewReceipt(G);G.epi={started:false,x:0,ct:0,snap:null,o:null,clock:0};G.lines=[];music('epilogue');epiChrome(true);}];
  var shots=EPI.slice(0,EPIA.length),b=1;
  steps.push(function(){var g=G;epiSay('N','That was the week. (Ekskyysmi kept the receipts)');g.epi.theEnd=true;g.fade=0;g.hud=false;g.plan=false;g.lines=[];g.cur=null;g.band=null;});   // bar 0: “That was the week.” on black (the first shot's title is “THE WEEK, ITEMISED”, so the card does not repeat it), over the song's quiet first bar (until 0.76 it said “The End.”, and players believed it)
  steps.push(epiAt(barT(1)),function(){G.epi.theEnd=false;});
  shots.forEach(function(o,i){
    var b0=b,n=EPIA[i];b+=n;
    steps.push(epiAt(barT(b0)));
    if(o.mine)steps.push(function(){return [epiShot(epiCopy(o,{mine:mineRows().length>0,pose:'selfmouth',cam:[1.7,420,260,2.1,405,240],secs:barT(b0+n)-barT(b0)}))];});   // no methods: the previous shot holds
    else steps.push(epiShot(epiCopy(o,{secs:barT(b0+n)-barT(b0)})));
  });
  var rollStart=b,rollEnd=ROLLEND;   // b is ROLLSTART: part A is 24 bars
  steps.push(epiAt(barT(rollStart)),function(){G.epi.roll={t0:barT(rollStart),tA:barT(ROLLFANFARE),t1:barT(rollEnd)};epiTell({roll:1});});
  var rb=rollStart;EPIB.forEach(function(o){var b0=rb,n=o.bars||1;rb+=n;
    steps.push(epiAt(barT(b0)),epiShot(epiCopy(o,{noCap:1,secs:barT(b0+n)-barT(b0)})));});
  steps.push(epiAt(barT(rollEnd)),function(){G.epi.roll=null;});
  // After the receipt: things nobody has seen yet (Joonas 20.11.: no repeats). The headband years, the waiting room, the small scratch.
  var nb=rollEnd;EPIN.forEach(function(o){var b0=nb,n=o.bars||1;nb+=n;
    steps.push(epiAt(barT(b0)),epiShot(epiCopy(o,{noCap:1,secs:barT(b0+n)-barT(b0)})));});
  var cred=EPI[EPI.length-1],cb=nb;
  // the band stops at 169.4 s (onset analysis); the fade starts on that last hit and is black before the ring-out ends.
  steps.push(epiAt(barT(cb)),epiShot(epiCopy(cred,{secs:EPILAST-barT(cb)})),epiAt(EPILAST),function(){G.fade=0;G.fadeRate=-1/2.8;},epiAt(EPISONG),
    function(){G.epi=null;G.lines=[];G.cur=null;G.band=null;G.fade=1;G.fadeRate=0.0001;music(null);},{wait:0.8});
  return labScene({set:'home',title:'The week, itemised.',plan:'',clock:21*3600}).concat(steps);
}

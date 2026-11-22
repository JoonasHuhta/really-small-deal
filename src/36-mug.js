/* ================= The mug (VISIO.md, V1 prototype) =================
   The human's coffee mug is how much of them is left today. Social load and the senses drain it; quiet refills it.
   No numbers on screen: only the level of coffee. An empty mug wakes the ugly side: Ekskyysmi goes spiky,
   answers get short, the soft option is locked. The size of Ekskyysmi is still feeling; the mug is capacity. */
var MUGMAX=5;
// v: the real level. shown: what is drawn (drops at once, rises slowly). ghost: the part just lost, flickering out (Joonas 20.11.).
// vis: the mug fades in when it matters and out when the scene wants to breathe. spiky: the monster edge, only where a scene asks for it.
function mugOn(v,floor){return function(){var lv=v==null?MUGMAX:v;G.mug={floor:floor==null?1:floor,v:lv,shown:lv,t:0,slosh:0,last:null,ghost:null,vis:0,seen:0,spiky:false,shards:null,broken:false,mended:!!G.mugMended};};}
function mugOff(){G.mug=null;G.deal=null;}
function mugQuiet(on){return function(){G.mugQuiet=!!on;};}          // a scene for the atmosphere: the mug steps out unless something happens to it
function mugSpiky(on){return function(){if(G.mug)G.mug.spiky=!!on;};}
function mugEmpty(){return !!(G.mug&&G.mug.v<=1);}
function drain(n,label){return function(){var m=G.mug;if(!m||m.broken)return;var from=m.shown,before=m.v;m.v=Math.max(Math.min(m.v,m.floor==null?0:m.floor),m.v-n);   // a day can scrape the bottom, only Thursday goes through it
  // the label counts what the mug really lost (not the drawn level, which may still be filling): at a day's floor the cost is written down, not taken. Wednesday's yeses are paid on Thursday.
  var lost=before-m.v;m.shown=m.v;m.ghost={from:Math.max(from,m.v),to:m.v,t:0};m.slosh=1;m.seen=0;m.last={text:lost>0?tr(label):tr(label)+tr(' (on the tab)'),t:0,minus:true,n:lost};sfx('sipOut');G.sips=(G.sips||0)+lost;if(lost>0&&(!G.bigSip||lost>G.bigSip.n))G.bigSip={t:label,n:lost};};}   // for the receipt's damage report
function refill(n,label){return function(){var m=G.mug;if(!m||m.broken)return;var before=m.v;m.v=Math.min(MUGMAX,m.v+n);m.slosh=0.6;m.seen=0;m.last={text:tr(label),t:0,minus:false,n:m.v-before};sfx('pourIn');};}
// The meltdown: the last drain on an empty mug breaks it. Shards fly; the mug stays broken until it is glued.
function mugBreak(label){return function(){var m=G.mug;if(!m)return;m.v=0;m.shown=0;m.broken=true;m.seen=0;m.ghost=null;m.last={text:label||'',t:0,minus:true};
  m.shards=[];for(var i=0;i<11;i++)m.shards.push({x:0,y:0,vx:(i%2?1:-1)*(60+((i*53)%160)),vy:-160-((i*71)%170),r:((i*37)%10)/10*6,va:((i%3)-1)*9,t:0});
  G.shake=RM?0:1;G.pulse=1;sfx('crack');sfx('shatter');};}
// Glued with gold, because it was the only glue in the drawer. The seams stay for the rest of the game.
function mugMend(v){return function(){var m=G.mug;if(!m)return;m.broken=false;m.mended=true;G.mugMended=true;m.shards=null;m.v=v||1;m.shown=0;m.seen=0;m.last={text:tr('glued. gold seams.'),t:0,minus:false};m.gleam=0;sfx('glue');};}   // 0.86: the gold catches the light once
function stepMug(dt){var m=G.mug;if(!m)return;m.t+=dt;m.seen+=dt;if(m.gleam!=null){m.gleam+=dt;if(m.gleam>1.8)m.gleam=null;}
  if(m.shown<m.v)m.shown=Math.min(m.v,m.shown+dt*1.6);
  m.slosh=Math.max(0,m.slosh-dt*0.9);if(m.last){m.last.t+=dt;if(m.last.t>3.4)m.last=null;}
  if(m.ghost){m.ghost.t+=dt;if(m.ghost.t>1.3)m.ghost=null;}
  if(m.shards)m.shards.forEach(function(sh){sh.t+=dt;sh.x+=sh.vx*dt;sh.y+=sh.vy*dt;sh.vy+=620*dt;sh.r+=sh.va*dt;});
  var want=!G.mugQuiet||m.seen<4||m.v<=1||m.broken?1:0;m.vis+=(want-m.vis)*Math.min(1,dt*(want?4:1.2));
  if(G.deal)G.deal.t+=dt;}

// The mug sits under the HUD pills, top right. A real mug: handle, steam while there is something to steam.
// Joonas 21.11.: Ekskyysmi gets tired. A night that says so gives it eye bags, heavy lids and a mutter
// (0.81, Joonas: "a bit too often": no longer on every low mug in daylight, only the three nights: Tuesday 03:07, after the replays in Rewind, Wednesday 23:15):
// the week, looping, half a word at a time. Size is still feeling; this is only the face.
var MUMBLES={1:['…oh, hi…','…with a full stop…','…was it the comma…','…mm.'],2:['…quick chat…','…nine o’clock…','…shorter…','…mm.'],
  3:['…could you just…','…yes…','…yes. yes…','…slides…'],4:['…seen…','…17:31…','…eleven bags…','…mm.'],5:['…oh, hi. again…','…mm.']};
function mumbleLine(){var g=G,M=g.morko,l=(!g.moment&&MUMBLES[g.chapter])||['…mm.','…filed…','…where was I…','…define soon…'];M.mumI=(M.mumI||0)+1;return l[M.mumI%l.length];}
function stepShadowLife(dt){var g=G,M=g.morko;if(!M)return;var want=g.tiredForce?1:0;
  if(M.asleep||g.plain||g.epi)want=0;M.tired=(M.tired||0)+(want-(M.tired||0))*Math.min(1,dt*1.4);
  if(M.mumble){M.mumble.t+=dt;if(M.mumble.t>3)M.mumble=null;}
  var talking=g.cur&&g.cur.who==='S';
  if(M.tired>0.6&&!M.mumble&&M.st==='free'&&!talking&&!g.out&&!g.zoom){M.mumT=(M.mumT||0)+dt;if(M.mumT>5.5){M.mumT=0;M.mumble={text:mumbleLine(),t:0};}}
  else if(talking&&M.mumble)M.mumble=null;
  var n=g.note;if(n){n.a+=((n.aT==null?1:n.aT)-n.a)*Math.min(1,dt*3);n.off+=((n.offT==null?n.off:n.offT)-n.off)*Math.min(1,dt*2.5);}}
// The cat (VISIO 6): a sticky note on the wall at home. Four legs on Monday, five on the quiet day, on the wall behind Ekskyysmi in the evenings.
function drawCatNote(){var g=G,n=g.note;if(!n||g.set!=='home'||n.a<0.02)return;
  var x,y;if(n.on==='shadow'){var q=geom();x=q.bx+n.off;y=q.shY+30;}else{x=668;y=236;}   // on the wall above the sofa: clear of the lamp (520) and the window
  var s=COMPACT?1.4:1.18;ctx.save();ctx.globalAlpha*=n.a;ctx.translate(x,y);ctx.rotate(-0.07);ctx.scale(s,s);
  ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(-19,-17,40,40);ctx.fillStyle='#f2d46b';ctx.fillRect(-21,-20,40,40);
  ctx.strokeStyle='#3b3242';ctx.fillStyle='#3b3242';ctx.lineWidth=1.6;ctx.lineCap='round';
  ctx.beginPath();ctx.ellipse(-3,3,10,5.5,0,0,Math.PI*2);ctx.stroke();                 // body
  circ(9,-4,4.6);ctx.stroke();                                                            // head
  ctx.beginPath();ctx.moveTo(6,-8);ctx.lineTo(6.5,-12);ctx.lineTo(9,-8.6);ctx.moveTo(10,-8.6);ctx.lineTo(12.5,-12);ctx.lineTo(12.6,-7.4);ctx.stroke();   // ears
  ctx.beginPath();ctx.moveTo(-13,2);ctx.quadraticCurveTo(-19,-4,-15,-10);ctx.stroke();      // tail
  var k=n.legs||4;for(var i=0;i<k;i++){var lx=-10+i*(17/(k-1));line(lx,7.5,lx-0.6,14);}     // legs: four, then five
  ctx.restore();}
function mugGlint(cx,cy,r){if(r<0.5)return;ctx.beginPath();ctx.moveTo(cx,cy-r);ctx.quadraticCurveTo(cx,cy,cx+r,cy);ctx.quadraticCurveTo(cx,cy,cx,cy+r);ctx.quadraticCurveTo(cx,cy,cx-r,cy);ctx.quadraticCurveTo(cx,cy,cx,cy-r);ctx.fill();}
function drawMug(){
  var m=G.mug;if(!m||G.out||G.epi||m.vis<0.02)return;
  var x=W-64,y=COMPACT?156:116,w=40,h=44,lvl=clamp(m.shown/MUGMAX,0,1),wob=RM?0:Math.sin(m.t*9)*3*m.slosh,i;
  ctx.save();ctx.setTransform(SC,0,0,SC,0,0);ctx.globalAlpha=m.vis;
  ctx.fillStyle='rgba(22,19,30,.55)';rr(x-12,y-12,w+34,h+24,12);ctx.fill();
  if(!m.broken){
    ctx.strokeStyle='#f1ebdd';ctx.lineWidth=4;ctx.beginPath();ctx.arc(x+w+2,y+h*0.45,10,-Math.PI/2,Math.PI/2);ctx.stroke();   // handle
    ctx.fillStyle='#f1ebdd';rr(x,y,w,h,6);ctx.fill();
    ctx.save();ctx.beginPath();rr(x+4,y+4,w-8,h-8,4);ctx.clip();
    var inner=h-8,top=y+4+inner*(1-lvl);
    if(m.ghost&&!RM){   // the lost sip lingers for a moment, flickering, then it is gone
      var gt=m.ghost.t,fl=gt<0.9?(Math.sin(gt*38)>0?0.75:0.25)*(1-gt/1.3):clamp(1-(gt-0.9)/0.4,0,1)*0.3,gtop=y+4+inner*(1-clamp(m.ghost.from/MUGMAX,0,1));
      ctx.fillStyle='rgba(224,120,90,'+fl+')';ctx.fillRect(x,gtop,w,top-gtop);}
    ctx.fillStyle=lvl<0.25?'#7a3b2a':'#6b4428';ctx.beginPath();ctx.moveTo(x,top+wob);ctx.quadraticCurveTo(x+w/2,top-wob,x+w,top+wob);ctx.lineTo(x+w,y+h);ctx.lineTo(x,y+h);ctx.closePath();ctx.fill();
    ctx.restore();
    if(m.mended){ctx.strokeStyle='#d9a93a';ctx.lineWidth=2;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x+8,y);ctx.lineTo(x+14,y+12);ctx.lineTo(x+11,y+22);ctx.lineTo(x+19,y+33);ctx.lineTo(x+16,y+h);ctx.stroke();
      ctx.beginPath();ctx.moveTo(x+w,y+18);ctx.lineTo(x+28,y+24);ctx.lineTo(x+31,y+30);ctx.stroke();   // kintsugi
      if(m.gleam!=null){var gk=m.gleam,ga=Math.sin(Math.PI*clamp(gk/1.8,0,1));   // 0.86: the seams light up, and two glints, the second a beat later
        ctx.strokeStyle='rgba(255,226,140,'+(0.9*ga)+')';ctx.lineWidth=3.5;ctx.beginPath();ctx.moveTo(x+8,y);ctx.lineTo(x+14,y+12);ctx.lineTo(x+11,y+22);ctx.lineTo(x+19,y+33);ctx.lineTo(x+16,y+h);ctx.stroke();
        ctx.fillStyle='rgba(255,240,190,'+ga+')';mugGlint(x+14,y+12,12*ga);var gb=Math.sin(Math.PI*clamp((gk-0.3)/1.5,0,1));ctx.fillStyle='rgba(255,240,190,'+gb+')';mugGlint(x+31,y+30,9*gb);}}
    if(lvl>0.55&&!RM){ctx.strokeStyle='rgba(241,235,221,.45)';ctx.lineWidth=2;for(i=0;i<2;i++){var sx=x+12+i*14,ph=m.t*2+i;ctx.beginPath();ctx.moveTo(sx,y-4);ctx.quadraticCurveTo(sx+Math.sin(ph)*5,y-12,sx,y-20);ctx.stroke();}}
  }else{   // broken: the base and two halves, coffee on the floor
    ctx.fillStyle='#f1ebdd';ctx.beginPath();ctx.moveTo(x,y+h*0.45);ctx.lineTo(x+12,y+h*0.6);ctx.lineTo(x+7,y+h*0.75);ctx.lineTo(x+18,y+h*0.85);ctx.lineTo(x+w-6,y+h*0.62);ctx.lineTo(x+w,y+h*0.7);ctx.lineTo(x+w,y+h);ctx.lineTo(x,y+h);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(107,68,40,.8)';ctx.beginPath();ctx.ellipse(x+w/2,y+h+8,30,5,0,0,Math.PI*2);ctx.fill();}
  if(m.shards){ctx.fillStyle='#f1ebdd';m.shards.forEach(function(sh){if(sh.t>1.6)return;ctx.save();ctx.globalAlpha=m.vis*clamp(1.6-sh.t,0,1);ctx.translate(x+w/2+sh.x,y+h/2+sh.y);ctx.rotate(sh.r);ctx.beginPath();ctx.moveTo(-5,-3);ctx.lineTo(6,-1);ctx.lineTo(1,6);ctx.closePath();ctx.fill();ctx.restore();});}
  // Joonas 21.11.: a refill reads as clearly as a hit: a green +1 and the reason, a red −2 and the reason.
  if(m.last&&m.last.text){var a=clamp(1-(m.last.t-2.6)/0.8,0,1),lt=(m.last.n>0?(m.last.minus?'−':'+')+m.last.n+'  ':'')+m.last.text;
    ctx.globalAlpha=a*m.vis;ctx.font='700 13px system-ui,sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';
    var lw=ctx.measureText(lt).width+18,ly=y+h/2-Math.min(m.last.t,2.6)*5;ctx.fillStyle='rgba(22,19,30,.82)';rr(x-18-lw+9,ly-12,lw,24,12);ctx.fill();   // readable over a bright window
    ctx.fillStyle=m.last.minus?'#ff8f7d':'#86e39a';ctx.fillText(lt,x-18,ly);}
  ctx.restore();
}

// Empty mug, and only where the scene asks for it: Ekskyysmi's outline grows spikes. Same size, different edges.
function morkoSpikes(q){
  if(!mugEmpty()||!G.mug.spiky)return;var s=q.s,n=9,i,a,r=q.hdR;ctx.fillStyle=mcol();
  for(i=0;i<n;i++){a=Math.PI*(1.08+0.84*i/(n-1));var px=q.bx+Math.cos(a)*r,py=q.hdY+Math.sin(a)*r,len=(9+((i*7)%5))*Math.min(1.4,s),tx=q.bx+Math.cos(a)*(r+len),ty=q.hdY+Math.sin(a)*(r+len),nx=-Math.sin(a)*4,ny=Math.cos(a)*4;
    ctx.beginPath();ctx.moveTo(px+nx,py+ny);ctx.lineTo(tx,ty);ctx.lineTo(px-nx,py-ny);ctx.closePath();ctx.fill();}
  for(i=0;i<7;i++){var sx=q.bx-q.shW*0.95+i*(q.shW*1.9/6),sy=q.shY+2;ctx.beginPath();ctx.moveTo(sx-5,sy+4);ctx.lineTo(sx+2,sy-10*Math.min(1.4,s));ctx.lineTo(sx+7,sy+4);ctx.closePath();ctx.fill();}
}

/* ---------- Hats (Joonas 20.11.): the shadow of a hat, only when the moment has earned one ----------
   Silhouettes in the shadow's own colour: a shadow can only wear the shadow of a hat. */
function hat(kind){return function(){G.morko.hat=kind||null;};}
function drawHat(q){
  var k=G.morko.hat;if(!k||G.ninja)return;var r=q.hdR,x=q.bx,y=q.hdY,s=Math.max(0.6,r/20);
  // drawn twice: a pale rim first (so a dark hat still reads against a dark wall at night), then the shadow-coloured hat on top
  for(var pass=0;pass<2;pass++){ctx.save();ctx.translate(x,y-r*0.72);ctx.scale(s,s);
  if(pass===0){ctx.fillStyle='rgba(241,235,221,.28)';ctx.scale(1.08,1.08);ctx.translate(0,1);}else ctx.fillStyle=mcol();
  if(k==='party'){ctx.beginPath();ctx.moveTo(-15,4);ctx.lineTo(15,4);ctx.lineTo(2,-44);ctx.closePath();ctx.fill();circ(2,-46,6);ctx.fill();
    if(pass){ctx.fillStyle='rgba(241,235,221,.22)';circ(-3,-8,2.5);ctx.fill();circ(6,-20,2.5);ctx.fill();circ(0,-32,2);ctx.fill();}}
  else if(k==='chef'){rr(-17,-14,34,16,3);ctx.fill();circ(-12,-22,11);ctx.fill();circ(0,-28,13);ctx.fill();circ(12,-22,11);ctx.fill();}
  else if(k==='pirate'){ctx.beginPath();ctx.moveTo(-30,0);ctx.quadraticCurveTo(-18,-8,-14,-26);ctx.quadraticCurveTo(0,-34,14,-26);ctx.quadraticCurveTo(18,-8,30,0);ctx.quadraticCurveTo(0,-8,-30,0);ctx.fill();
    if(pass){ctx.strokeStyle='rgba(241,235,221,.35)';ctx.lineWidth=2;circ(0,-16,4);ctx.stroke();line(-5,-9,5,-9);}}
  else if(k==='detective'){ctx.beginPath();ctx.ellipse(0,-6,24,7,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(0,-14,17,13,0,Math.PI,0);ctx.fill();rr(-16,-14,32,8,2);ctx.fill();
    ctx.beginPath();ctx.moveTo(-14,-6);ctx.lineTo(-22,6);ctx.lineTo(-10,-2);ctx.fill();ctx.beginPath();ctx.moveTo(14,-6);ctx.lineTo(22,6);ctx.lineTo(10,-2);ctx.fill();}
  ctx.restore();}
}

// A deal is a paper slip in Ekskyysmi's handwriting: what you get now, what it costs later. It is about the mug, never about Ekskyysmi's size.
function dealOffer(now,later){return function(){G.deal={now:now,later:later,t:0,state:'offer'};sfx('card');};}
function dealSign(ok){return function(){if(G.deal){G.deal.state=ok?'signed':'declined';G.deal.t=0;sfx(ok?'stamp':'nope');}};}
function drawDeal(){
  var d=G.deal;if(!d||G.out)return;var out=d.state!=='offer'?clamp((d.t-1.4)/0.5,0,1):0;if(out>=1){G.deal=null;return;}
  var w=318,h=112,x=W-w-24,y=COMPACT?220:178;   // under the mug, clear of the speech bubbles on the left
  ctx.save();ctx.setTransform(SC,0,0,SC,0,0);ctx.globalAlpha=1-out;ctx.translate(x+w/2,y+h/2);ctx.rotate(-0.03+(d.state==='declined'?out*0.3:0));ctx.translate(-w/2,-h/2);
  ctx.fillStyle='rgba(20,17,29,.25)';rr(5,6,w,h,4);ctx.fill();ctx.fillStyle='#fbf8ef';rr(0,0,w,h,4);ctx.fill();
  ctx.fillStyle='#2b2733';ctx.textAlign='left';ctx.textBaseline='middle';ctx.font='800 13px "Courier New",monospace';ctx.fillText('A REALLY SMALL DEAL',14,20);
  ctx.font='600 11.5px system-ui,sans-serif';ctx.fillStyle='#2f6b4a';ctx.fillText('NOW: '+d.now,14,48);ctx.fillStyle='#8a3b30';ctx.fillText('LATER: '+d.later,14,72);
  ctx.font='italic 600 10px system-ui,sans-serif';ctx.fillStyle='#8b8070';ctx.fillText('signed: ___________  witnessed: E.',14,98);
  if(d.state!=='offer'){ctx.save();ctx.translate(w-62,h-34);ctx.rotate(-0.25);ctx.strokeStyle=d.state==='signed'?'#c9553f':'#55605c';ctx.fillStyle=ctx.strokeStyle;ctx.lineWidth=3;rr(-44,-15,88,30,5);ctx.stroke();
    ctx.font='900 15px system-ui,sans-serif';ctx.textAlign='center';ctx.fillText(d.state==='signed'?'DEAL':'NO DEAL',0,1);ctx.restore();}
  ctx.restore();
}

/* ---------- WIP: A Tuesday, with a mug ---------- */
function labMug(){return labScene({set:'room',title:'A Tuesday, with a mug.',plan:'Get through Tuesday.',clock:8*3600+40*60}).concat([
  mugOn(),
  ['N','A test day. The mug is how much of you there is today. It starts full.'],
  ['S','A full mug. Nobody touches the mug. I will guard it with my life.',{look:'pleased'}],
  ['H','This label has been scratching my neck since eight.',{quiet:1}],
  drain(1,'the label'),
  ['S','One sip gone. To a LABEL.'],
  set({cowB:1,bx:700,bFace:-1}),
  ['B','Morning! Carrot?'],
  addTic('crunch.',690,FEETY-215,{life:1.4}),addTic('crunch.',700,FEETY-200,{at:0.7,life:1.4}),
  drain(1,'chewing, next to us'),
  ['S','He is eating a carrot. Next to our EAR.'],
  {choice:[
    {t:'Say “No thanks” and move one step away.',m:'stay'},
    {t:'Take a carrot. Fight fire with fire.',m:'hide',then:[['S','Now WE are chewing. I hate it here.']]},
    {t:'Become furniture until he finishes.',m:'hide',then:[['S','Furniture doesn’t hear carrots.'],['H','Furniture hears everything.']]}
  ]},
  ['B','See you at lunch? Sanna’s coming too.'],
  function(){G.bxT=1200;G.bFace=1;},
  hat('pirate'),dealOffer('no lunch. a quiet hour at the desk.','Sanna has asked twice. She may stop asking.'),
  ['S','Parley.',{look:'pleased'}],
  ['S','I’ve drawn up a small deal. You eat at your desk. I get you a quiet hour. The mug stays where it is.'],
  ['S','It’s a good deal. I wrote it.'],
  {choice:function(){return dealOptions(true);}},
  scene({set:'office',clock:13*3600+58*60}),
  ['N','The lift up to Riitta. Somebody’s perfume. All of it.'],
  drain(1,'perfume, in the lift'),
  ['S','There is no air left in the lift. Someone has worn ALL of it.'],
  function(){var m=G.mug;if(m&&m.v>1){m.v=1;m.slosh=1;m.last={text:'the afternoon',t:0,minus:true};}},   // the prototype lands on an empty mug on every path, so the meeting can be tested
  ['N','Two o’clock. Riitta’s “quick chat”.'],
  function(){G.cowR=true;},
  mugSpiky(true),
  ['R','Good work on the report. One thing: could the summary be shorter?'],
  ['S','Shorter. SHORTER. I’ll give her shorter.',{look:'stern'}],
  {choice:[
    {t:'Say: “Fine.”',m:'draft',then:[['H','Fine.'],['R','…Okay?']]},
    {t:'Say: “k.”',m:'draft',then:[['H','k.'],['R','…Okay then.']]},
    {t:'Say nothing. Loudly.',m:'hide',then:[{wait:1.2},['R','…I’ll send you notes.']]},
    {t:'Breathe, then: “Sure, I can trim it.”',off:true,note:'Not enough mug for that.'}
  ]},
  ['S','That wasn’t us. That was the mug.'],
  ['H','It was us. With an empty mug.'],
  ['S','…I’ll draft an apology. A small one. Tomorrow. When there is coffee.',{quiet:1}],
  scene({set:'home',clock:19*3600+20*60}),
  mugSpiky(false),mugQuiet(true),
  ['N','Evening. Nobody needs anything.'],
  {wait:1.0},refill(1,'the lamp'),{wait:1.4},refill(1,'nobody talking'),{wait:1.2},
  function(){return G.lunchSkipped?[['N','A message from Sanna: “Missed you at lunch! Tomorrow?”'],['S','She asked a third time.'],['H','Then the deal was cheap today.'],['S','Today.',{quiet:1}]]:
    [['N','A message from Sanna: “Thanks for lunch. Same tomorrow?”'],['S','The sip came back.'],['H','Some sips do.'],refill(1,'Sanna, “same tomorrow?”')];},
  ['S','Mug: half. That’s enough for tomorrow. Probably.'],
  ['H','Probably is fine.'],
  mugOff
 ]);}

// VISIO kierros 3 A / V21: a deal is argued with the mug. The question is who is talking: the mug (a fair limit) or the door (fear).
// Asked once; the answer depends on the real level, and either way both options stay open. Nothing is punished.
function dealOptions(canAsk){
  var o=[{t:'Take the deal. Save the mug.',m:'hide',f:function(){G.lunchSkipped=1;},then:[dealSign(true),hat(null),refill(1,'a quiet hour'),['S','Signed. Witnessed. Filed.'],['H','…She did ask twice.'],['S','That’s a LATER problem. Later is a different department.']]},
    {t:'No deal. Lunch with Sanna.',m:'stay',f:function(){G.lunchSkipped=0;},then:[dealSign(false),hat(null),drain(1,'lunch, worth it'),['S','That will cost a sip.'],['H','Then it costs a sip.'],['S','…Was it worth it?',{quiet:1}],['H','Ask me after.']]}];
  if(canAsk)o.push({t:'Ask: is that the mug talking, or the door?',m:'stay',hush:true,then:function(){
    var low=G.mug&&G.mug.v<=2;
    return [['H','Is that the mug talking, or the door?']].concat(low?[['S','…The mug. Honestly. It’s low.',{quiet:1}],['H','Then it’s a fair deal.'],['S','I do write fair ones. Occasionally.']]:
      [{wait:0.8},['S','…The door.',{quiet:1}],['H','Thought so.'],['S','The mug was a very convenient witness.']]).concat([{choice:function(){return dealOptions(false);}}]);}});
  return o;
}

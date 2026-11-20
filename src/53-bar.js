/* ================= the bar: seen from behind the counter, so everyone is half hidden for once ================= */
// People stand on the far side of the bar; the counter covers their legs. The bartender is the dark shape nearest to us.
var BARY=398;
function barSetup(){
  var g=G,Hm=g.human;g.bar={tx:820,tT:820,sx:1040,sT:1040,sFace:-1,polish:true,glass:false,lagers:false,sdrink:false,peanuts:9,umbrella:0,shelter:false};
  g.noCup=true;Hm.x=-40;Hm.xT=430;
}
function stepBar(dt){var b=G.bar;if(!b)return;b.tx=approach(b.tx,b.tT,190*dt);b.sx=approach(b.sx,b.sT,150*dt);b.umbrella=RM?(b.shelter?1:0):approach(b.umbrella,b.shelter?1:0,dt*2);}
function shelterOn(){var m=G.morko;G.bar.shelter=true;m.pose='shelter';m.sT=0.85;if(RM)m.s=m.sT;}
function shelterOff(){var m=G.morko;G.bar.shelter=false;m.pose='drink';m.sT=1.15;if(RM)m.s=m.sT;}
function wallClock(cx,cy,r){
  var s=G.clock,ma=((s/60)%60)/60*Math.PI*2,ha=((s/3600)%12)/12*Math.PI*2;
  ctx.fillStyle='#f3ead6';ctx.strokeStyle='#1c1418';ctx.lineWidth=3;circ(cx,cy,r);ctx.fill();ctx.stroke();
  ctx.lineCap='round';ctx.lineWidth=3;line(cx,cy,cx+Math.sin(ha)*r*0.5,cy-Math.cos(ha)*r*0.5);ctx.lineWidth=2;line(cx,cy,cx+Math.sin(ma)*r*0.75,cy-Math.cos(ma)*r*0.75);
}
function bar(){
  var i,t=G.time;
  ctx.fillStyle='#3b2b33';ctx.fillRect(-20,-20,W+40,WALLY+20);
  ctx.fillStyle='#4b3427';ctx.fillRect(-20,292,W+40,WALLY-292);ctx.fillStyle='#5f4331';ctx.fillRect(-20,287,W+40,6);
  ctx.strokeStyle='#3e2a20';ctx.lineWidth=2;for(i=0;i<17;i++)line(18+i*60,296,18+i*60,WALLY);
  ctx.fillStyle='#241b20';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);
  [200,480,760].forEach(function(x){
    var gr=ctx.createRadialGradient(x,150,6,x,150,240);gr.addColorStop(0,'rgba(255,196,110,.40)');gr.addColorStop(1,'rgba(255,196,110,0)');ctx.fillStyle=gr;ctx.fillRect(x-240,-20,480,WALLY+20);
    ctx.strokeStyle='#1c1418';ctx.lineWidth=3;line(x,-20,x,100);
    ctx.fillStyle='#d99a3c';ctx.beginPath();ctx.moveTo(x-27,126);ctx.lineTo(x-12,100);ctx.lineTo(x+12,100);ctx.lineTo(x+27,126);ctx.closePath();ctx.fill();
    ctx.fillStyle='#ffe9a8';ctx.beginPath();ctx.ellipse(x,127,21,5,0,0,Math.PI*2);ctx.fill();});
  // dartboard, with one dart nowhere near the middle
  var dc=['#1c1418','#e9e2cf','#b5483a','#2f6b4f','#b5483a'],dr=[42,36,25,14,5];for(i=0;i<5;i++){ctx.fillStyle=dc[i];circ(96,205,dr[i]);ctx.fill();}
  ctx.strokeStyle='#e2b04a';ctx.lineWidth=3;line(124,180,140,168);
  // chalkboard
  ctx.fillStyle='#6b4a34';rr(566,168,150,96,5);ctx.fill();ctx.fillStyle='#22302c';rr(573,175,136,82,3);ctx.fill();
  ctx.fillStyle='#e9e2cf';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 13px system-ui,sans-serif';ctx.fillText('TODAY',641,192);
  ctx.font='500 13px system-ui,sans-serif';ctx.fillText('Soup.',641,214);ctx.fillText('Also: everything else.',641,236);
  // neon
  var on=RM||Math.sin(t*1.3)>-0.96;ctx.strokeStyle=on?'#ff8fa3':'#7a4a55';ctx.lineWidth=4;ctx.shadowColor='#ff8fa3';ctx.shadowBlur=on?16:0;rr(770,176,112,50,12);ctx.stroke();
  ctx.fillStyle=on?'#ffd0d8':'#7a4a55';ctx.font='800 22px system-ui,sans-serif';ctx.fillText('OPEN',826,202);ctx.shadowBlur=0;
  wallClock(330,120,24);
  // coat hooks. One coat. It is only a coat.
  ctx.fillStyle='#1c1418';rr(896,236,60,6,3);ctx.fill();ctx.fillStyle='#55657a';ctx.beginPath();ctx.moveTo(914,242);ctx.lineTo(944,242);ctx.lineTo(952,330);ctx.lineTo(906,330);ctx.closePath();ctx.fill();
  ctx.fillStyle='#46546a';ctx.fillRect(927,242,4,88);
}
function glass(x,kind){
  var y=BARY;
  if(kind==='lager'){ctx.fillStyle='#e2a93c';rr(x-8,y-34,16,34,2);ctx.fill();ctx.fillStyle='#fbf8ef';rr(x-9,y-40,18,9,4);ctx.fill();return;}
  ctx.fillStyle='rgba(232,240,240,.35)';rr(x-9,y-26,18,26,3);ctx.fill();
  ctx.fillStyle='#e7c06a';rr(x-8,y-19,16,18,2);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.7)';ctx.fillRect(x-5,y-18,5,5);ctx.fillRect(x+1,y-12,5,5);
  ctx.strokeStyle='#c9553f';ctx.lineWidth=2;ctx.lineCap='round';line(x+3,y-8,x+9,y-36);
}
function barFront(){
  var g=G,b=g.bar,y=BARY,i;
  // whoever else is at the bar stands behind it too
  if(b.sx<W+30)person(b.sx,{body:'#8a4f6a',hair:'#2b2230',facing:b.sFace,walk:Math.abs(b.sx-b.sT)>1});
  ctx.fillStyle='#8a5e3c';ctx.fillRect(-20,y,W+40,16);ctx.fillStyle='#a8774e';ctx.fillRect(-20,y,W+40,4);
  ctx.fillStyle='#5c3b27';ctx.fillRect(-20,y+16,W+40,H-y);
  ctx.strokeStyle='#4a2f1f';ctx.lineWidth=2;for(i=0;i<13;i++)line(40+i*80,y+22,40+i*80,H+10);
  ctx.fillStyle='#c9a45a';ctx.fillRect(-20,y+74,W+40,5);
  // beer taps
  ctx.fillStyle='#b9bcc0';rr(742,y-12,76,12,3);ctx.fill();
  for(i=0;i<3;i++){var tx=756+i*24;ctx.fillStyle='#d7dadd';rr(tx-3,y-46,6,36,2);ctx.fill();ctx.fillStyle=['#b5483a','#2f6b4f','#e2b04a'][i];rr(tx-5,y-64,10,22,3);ctx.fill();}
  // a bowl of peanuts that somebody has been counting
  ctx.fillStyle='#e9e2cf';ctx.beginPath();ctx.moveTo(268,y-14);ctx.lineTo(322,y-14);ctx.lineTo(312,y);ctx.lineTo(278,y);ctx.closePath();ctx.fill();
  ctx.fillStyle='#c79a5b';for(i=0;i<b.peanuts;i++){ctx.beginPath();ctx.ellipse(276+(i%5)*9+(i>4?4:0),y-17-(i>4?5:0),5,3.2,0.4,0,Math.PI*2);ctx.fill();}
  if(b.glass)glass(g.human.x+52,'ginger');
  if(b.lagers){glass(b.sx-34,'lager');glass(b.sx-14,'lager');}
  bartender();
}
function bartender(){
  var b=G.bar,x=b.tx,bob=RM?0:Math.sin(G.time*2)*1.5,y=H+6;
  ctx.fillStyle='#17111a';
  ctx.beginPath();ctx.ellipse(x,y+22,120,76,0,0,Math.PI*2);ctx.fill();
  rr(x-21,y-80+bob,42,44,10);ctx.fill();
  circ(x,y-104+bob,44);ctx.fill();circ(x-44,y-98+bob,9);ctx.fill();circ(x+44,y-98+bob,9);ctx.fill();circ(x+6,y-150+bob,15);ctx.fill();
  ctx.save();ctx.translate(x-80,y-34);ctx.rotate(-0.28);ctx.fillStyle='#e9e2cf';rr(-13,-8,26,52,5);ctx.fill();ctx.strokeStyle='#c9553f';ctx.lineWidth=2;line(-13,2,13,2);ctx.restore();
  if(b.polish&&Math.abs(b.tx-b.tT)<1){
    var px=x+98,py=y-58+(RM?0:Math.sin(G.time*8)*3);
    ctx.fillStyle='rgba(232,240,240,.45)';rr(px-9,py-14,18,28,3);ctx.fill();ctx.fillStyle='#e9e2cf';circ(px+4,py+(RM?0:Math.cos(G.time*8)*8),9);ctx.fill();
    ctx.strokeStyle='#17111a';ctx.lineWidth=16;ctx.lineCap='round';line(x+70,y-10,px,py+12);
  }
}
// Ekskyysmi's drink is the shadow of a drink. The umbrella is its own idea.
function shadowDrink(q){
  var g=G;if(!g.bar||!g.bar.sdrink)return;var h=g.morko.h[0],k=Math.max(0.8,Math.sqrt(q.s)),x=h.x,y=h.y;
  ctx.save();ctx.translate(x,y);ctx.scale(k,k);
  ctx.fillStyle=mcol();ctx.beginPath();ctx.moveTo(-11,-30);ctx.lineTo(11,-30);ctx.lineTo(8,4);ctx.lineTo(-8,4);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(233,226,207,.55)';ctx.lineWidth=1.3;ctx.stroke();
  ctx.strokeStyle=mcol();ctx.lineWidth=2.5;ctx.lineCap='round';line(2,-26,10,-46);
  ctx.restore();
  // Borrow the existing cocktail umbrella. The glass stays in the other hand.
  var u=g.bar.umbrella,other=g.morko.h[1],ux=(x-10*k)*(1-u)+(other.x-28*k)*u,uy=(y-50*k)*(1-u)+(other.y-22*k)*u;
  ctx.save();ctx.translate(ux,uy);ctx.scale(k,k);
  ctx.strokeStyle='#e9e2cf';ctx.lineWidth=1.5;line(6*(1-u)+28*u,22,0,0);
  ctx.fillStyle='#e0563e';ctx.beginPath();ctx.moveTo(-14,2);ctx.quadraticCurveTo(0,-16,14,2);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#fbf8ef';ctx.lineWidth=1.5;line(0,-7,-7,2);line(0,-7,7,2);
  ctx.restore();
}

/* ---------- Lab: A quiet drink. ---------- */
function labBar(){return labScene({set:'bar',title:'A quiet drink.',plan:'Order one drink.',clock:18*3600+12*60}).concat([
  barSetup,{wait:3.9},
  ['N','An evening. Sanna is running five minutes late. You are at the bar, on your own, on purpose.'],
  ['S','Position: acceptable. Wall behind us. Eyes on the door. Now we wait to be noticed.'],
  ['H','I’ll just order.'],
  addTic('…seven, eight, nine peanuts.',296,BARY-48,{life:2.6}),
  {wait:2.4},
  function(){G.clock+=120;},
  ['N','Two minutes pass. The bartender polishes a glass. It was already clean.'],
  ['S','He hasn’t looked at us once.'],
  lensPeek(function(){return {x:G.bar.tx,y:BARY-46};},'BARTENDER: POLISHING. OR AVOIDING. OR POLISHING.'),
  function(){var b=G.bar;b.sT=700;},{wait:2.4},
  function(){G.bar.polish=false;},
  ['X','Excuse me?'],
  ['S','Yes?'],   // its name is “excuse me”. Nobody explains this. Ever.
  {wait:0.7},
  ['T','Evening! What can I get you?'],
  ['X','Two lagers, thanks.'],
  function(){var b=G.bar;b.lagers=true;sfx('clink');},
  hit(0.6,'P'),{wait:1.2},
  ['S','She arrived AFTER us. He served her FIRST.'],
  ['S','We are furniture. We are a coat stand with opinions.'],
  function(){var b=G.bar;b.lagers=false;b.sFace=1;b.sT=1040;},
  {choice:[
    {t:'Raise one finger. Lower. No. Lower.',then:[['S','Too eager. Now too casual. Now you’re testing the wind.'],['H','I’m ordering a drink, not landing a plane.']]},
    {t:'Hold the bank card where he can see it.',then:[['S','Visible, but not waving. We’re solvent, not desperate.'],['H','My arm is tired.'],['S','Solvency is a marathon.']]},
    {t:'Leave. Find a bar where nobody saw this.',then:[['H','Sanna is meeting me HERE.'],['S','She can meet us in the new life.']]}
  ]},
  function(){var b=G.bar;b.tT=610;},{wait:1.6},calm,
  ['T','Sorry, didn’t see you there! What’ll it be?'],
  set({mood:'surprised'}),
  ['S','“Didn’t see you.” So we ARE invisible. I’d like that confirmed in writing.'],
  ['H','He missed me. I still want the drink.'],
  ['H','A ginger beer, please.'],
  ['T','What?'],
  hit(0.75,'P'),{wait:1.3},
  ['S','“WHAT.” He heard the order. And he HATED it.'],
  {choice:[
    {t:'Change the order to something impressive.',then:[['S','Something with a year on it. People respect years.'],['H','I’m not ordering a whisky to impress a man with a towel.']]},
    {t:'Say it again, quieter. He can’t hate it twice.',then:[['H','…ginger beer.'],['T','Sorry?'],['S','TWICE. He’s making us say it twice. It’s a ritual.']]},
    {t:'Retract the order. We were never thirsty.',then:[['S','Tell him it was a joke. “Ginger beer.” Ha. Imagine.'],['H','I’m thirsty.']]}
  ]},
  ['H','GINGER BEER.'],
  ['T','Ginger beer! Good choice. Ice?']
 ],outside({title:'WHAT THE BARTENDER HEARD',dur:'duration: 6 seconds',cap:'Loud music. A quiet customer. “What?” meant “what”.',anim:'text'}),[
  calm,function(){var b=G.bar;b.glass=true;b.tT=820;sfx('clink');},{wait:1.2},
  function(){G.bar.polish=true;},
  ['S','He said “good choice”.'],
  ['H','He says that to everyone.'],
  ['S','Let me have this one.'],
  ['S','…I’ll have one too.'],
  ['H','You’re a shadow.'],
  ['S','Then I’ll have the shadow of one.'],
  function(){var g=G;g.bar.sdrink=true;g.morko.pose='drink';sfx('card');},{wait:1.2},
  ['H','Yours has an umbrella.'],
  shelterOn,{wait:0.8},
  ['S','For cover.'],
  shelterOff,{wait:0.5},
  function(){G.morko.pose='sip';},{wait:0.9},function(){sfx('drip');},{wait:0.7},function(){G.morko.pose='drink';G.morko.mood='care';},
  ['S','…Oh. That’s quite nice.'],
  ['S','Is this it? Standing here. With a drink.'],
  ['H','This is it.'],
  ['S','Nobody is looking at us.'],
  ['H','No.'],
  ['S','I always thought that was the bad outcome.'],
  {wait:1.4},
  function(){var g=G;g.cowA=true;g.ax=1040;g.axT=570;g.aFace=-1;g.clock+=15*60;},{wait:3.3},
  ['A','Sorry I’m late! Have you been waiting ages?'],
  {choice:[
    {t:'“No, just got here.” (Seventeen minutes.)',then:[['H','Seventeen minutes. I counted.'],['A','Ha! Of course you did. Next one’s on me.']]},
    {t:'“It’s FINE.” With the face.',then:[['H','It’s fine.'],['A','I did text.'],['H','I know. I got a bit stranded.'],['A','Next time I’ll text before I’m already late.']]},
    {t:'Tell her the truth: it was nice.',then:[['H','A bit. It was nice, though.'],['A','Good. I’ll get the next one.'],['S','Don’t tell her about the umbrella.']]}
  ]},
  function(){G.morko.pose='toast';},{wait:0.8},
  ['S','To being furniture.'],
  function(){G.morko.pose='drink';},
  {wait:1.2},
  // Later. Tired, and the shadow off duty: the filter goes with it. The evening goes very well. The bill comes in the morning.
  function(){G.clock=22*3600+40*60;},
  ['N','22:40. Three hours in. Ekskyysmi has had the shadow of one drink.'],
  set({mood:'calm',s:0.9}),
  ['S','I’m just resting my eyes. Keep an eye on… everything.',{quiet:1}],
  function(){G.morko.pose=null;shadowAway();},function(){G.tics.push(tic('z',G.human.x-70,WALLY-150,{life:2.2}));},{wait:1.6},
  ['N','Ekskyysmi is off duty. Nobody is reviewing anything.'],
  {who:'H',choice:[
    {t:'Tell her about the umbrella.',f:function(){G.barStory='umbrella';},then:[['H','Can I tell you something odd? My shadow had a drink.'],['A','Your shadow.'],['H','With an umbrella. For cover.']]},
    {t:'Tell her about the umbrella. With your arms.',f:function(){G.barStory='arms';},then:[['H','Okay. So. My shadow. Had a DRINK.'],['A','With what arms?'],['H','These arms. And an umbrella. For cover.']]},
    {t:'Tell her everything. Starting in 2011.',f:function(){G.barStory='2011';},then:[['H','In 2011 I waved at someone who was waving at someone else.'],['A','No!'],['H','And tonight my shadow had a drink. With an umbrella.']]}
  ]},
  ['A','That’s the best thing I’ve heard all week.'],
  ['T','Here’s the menu, if you want food.'],
  ['H','Thanks, you too.'],
  {wait:0.8},
  ['A','“You too”!'],
  ['H','I say it to menus. It’s a whole thing.'],
  ['A','Same time next week?'],
  ['H','I haven’t checked—'],
  ['A','Right. Forget I asked.'],
  ['H','The calendar. I haven’t checked the calendar.'],
  ['A','Oh. I was halfway out of the building.'],
  ['H','Yes. Obviously. YES.'],
  ['N','Sanna laughed eight times. Somebody from the next table joined in. Nobody rehearsed anything.'],
  function(){var b=G.bar;G.barWas=b?{sdrink:b.sdrink,glass:b.glass}:null;},{wait:1.2}
 ],[
  scene({set:'home',clock:7*3600+10*60}),
  function(){var M=G.morko;M.wake=0;M.asleep=false;M.s=M.sT=0.35;G.human.face='neutral';},{wait:1.1},
  set({s:1.6,mood:'scared'}),
  ['S','…What happened.'],
  ['S','I was off duty. The bill came anyway.'],
  hit(0.7,'after'),
  ['S','You said “you too” to a MENU.'],
  ['H','She laughed.'],
  ['S','You told her about the UMBRELLA. That was classified.'],
  ['H','She laughed at that too.'],
  ['S','You said “obviously”. Loudly. With your arms.'],
  function(){G.pie={t:0};G.lines=[];G.hudWas=G.hud;G.hud=false;sfx('card');},{wait:1.8},
  ['H','Look at the green one.'],
  ['S','That’s just the background.',{look:'squint'}],
  ['H','I know it’s most of the picture. I still want to apologise.'],
  ['S','I’m a shadow. I don’t do colour. I do the dot.'],
  {choice:[
    {t:'Make the dot smaller.',then:[['S','I can’t. I’ve laminated it.']]},
    {t:'Ask Sanna.',then:[function(){G.pie=null;G.hud=G.hudWas;},['P','You: “Sorry about last night. Was I weird?”'],{wait:1.2},['P','Sanna: “You were GREAT. Same time next week. Bring the umbrella story.”'],
      ['S','…She wants the umbrella story.',{look:'stunned'}],['H','She wants the umbrella story.'],['S','It’s still classified.',{look:'pleased'}]]},
    {t:'Leave the dot where it is.',then:[['H','It can stay. It’s small.'],['S','It’s the size of a menu.'],['H','Menus are small.'],aside(['S','…Fine. It can stay. Under supervision.'])]}
  ]},
  function(){if(G.pie){G.pie=null;G.hud=G.hudWas;}addLived('one good evening, audited',150);},
  set({s:1.1,mood:'care'}),
  ['S','Next time I’m staying awake.'],
  ['H','Next time you’re having two.'],
  ['S','…Of the shadow ones.']
 ]);}
// The morning after, the way it looks from the inside: a big green evening, one small red dot, and how it feels.
function drawPie(){
  var p=G.pie;if(!p)return;var k=Math.min(1,p.t/0.5),r=84*k,cy=172,lx=250,rx=710;
  ctx.save();ctx.setTransform(SC,0,0,SC,0,0);ctx.fillStyle='rgba(13,17,20,.6)';ctx.fillRect(-20,-20,W+40,H+40);
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#f6f1e4';ctx.font='700 18px system-ui,sans-serif';
  ctx.fillText('HOW THE EVENING WENT',lx,52);ctx.fillText('HOW IT FEELS',rx,52);
  ctx.lineWidth=4;ctx.strokeStyle='#14111d';
  ctx.fillStyle='#4fb3a6';circ(lx,cy,r);ctx.fill();ctx.stroke();ctx.fillStyle='#e46a52';circ(rx,cy,r);ctx.fill();ctx.stroke();
  if(k>=1){
    ctx.fillStyle='#e46a52';circ(lx-38,cy+70,8);ctx.fill();ctx.lineWidth=2.5;ctx.stroke();
    ctx.fillStyle='#14111d';ctx.font='700 16px system-ui,sans-serif';ctx.fillText('Sanna laughed ×8',lx,cy-10);ctx.font='600 12px system-ui,sans-serif';ctx.fillText('someone joined in',lx,cy+12);
    ctx.fillStyle='#f6f1e4';ctx.font='600 12px system-ui,sans-serif';ctx.fillText('“you too” (to a menu)',lx-38,cy+108);
    ctx.strokeStyle='#f6f1e4';ctx.lineWidth=1.5;line(lx-38,cy+78,lx-38,cy+96);
    ctx.fillStyle='#14111d';ctx.font='800 18px system-ui,sans-serif';ctx.fillText('everything',rx,cy-11);ctx.fillText('is ruined',rx,cy+12);
  }
  ctx.restore();
}


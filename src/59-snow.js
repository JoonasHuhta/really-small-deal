/* ================= Snow indoors. (Moment, 0.99.23): a dream after a long Thursday ================= */
// Joonas 26.11., the painting that matters to him: a skier in a snowy room, a door open to summer. "Time and place can be
// something else entirely; you can ski out in nature and still be at home." Script first: TARINAKARTTA.md, section 7.
// The snow is the week's small things: Ekskyysmi tries to file them, and every one is unique and melts. Shadows on snow are
// blue, so for once the shadow has a colour. Behind the door the sun does not set: the shadow stays, lying down in the grass.
// The outside version does not undo the dream: a sofa, a window open a crack, a little November on the sill.
var DREAMDOOR={x:812,w:72,top:168};   // on the right: the shadow falls to the human's left, so it follows behind and never covers the summer
function dreamOn(){var g=G;g.dream={door:0,doorT:0,blue:0,blueT:0,skis:true,melt:0};g.noCup=true;g.human.x=g.human.xT=400;}
function stepDream(dt){var d=G.dream;if(!d)return;d.door=ease(d.door,d.doorT,(RM?6:1.1)*dt);d.blue=ease(d.blue,d.blueT,1.4*dt);if(d.melt>0)d.melt=Math.max(0,d.melt-dt);}
function dreamBlue(){var d=G.dream,k=clamp(d.blue,0,1),a=[13,15,24],b=[63,84,136];
  return 'rgb('+a.map(function(v,i){return Math.round(v+(b[i]-v)*k);}).join(',')+')';}
function dreamInLight(x,y){var d=G.dream,dx=x-520,dy=(y-300)*1.3;
  if(dx*dx+dy*dy<95*95)return true;                                                   // the lamp keeps a little warm
  if(d&&d.door>0.2&&x>DREAMDOOR.x-6&&x<DREAMDOOR.x+DREAMDOOR.w+6&&y>DREAMDOOR.top-6)return true;   // summer, through the door
  return false;}
function dreamRoom(){
  var g=G,d=g.dream||{door:0,blue:0},i;
  ctx.fillStyle='#2a3245';ctx.fillRect(-20,-20,W+40,WALLY+20);
  var gr=ctx.createRadialGradient(520,300,10,520,300,330);gr.addColorStop(0,'rgba(255,214,140,.38)');gr.addColorStop(1,'rgba(255,214,140,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,W,WALLY);
  // the same window as at home: night, the moon
  ctx.fillStyle='#e9e2cf';rr(112,96,170,150,4);ctx.fill();ctx.fillStyle='#12152a';ctx.fillRect(120,104,154,134);sky(120,104,154,134,true);
  ctx.fillStyle='#f6f1e4';circ(236,134,13);ctx.fill();ctx.fillStyle='#12152a';circ(242,130,11);ctx.fill();
  ctx.strokeStyle='#e9e2cf';ctx.lineWidth=5;line(197,104,197,238);
  ctx.fillStyle='#f1f4f8';rr(108,240,178,9,4);ctx.fill();   // snow on the sill, inside
  // the door, and what is behind it
  var dx=DREAMDOOR.x,dw=DREAMDOOR.w,dt=DREAMDOOR.top,dh=WALLY-dt,o=clamp(d.door,0,1);
  ctx.fillStyle='#1d2231';ctx.fillRect(dx-6,dt-6,dw+12,dh+6);
  if(o>0.01){
    var sk=ctx.createLinearGradient(0,dt,0,WALLY);sk.addColorStop(0,'#8fc7e6');sk.addColorStop(0.55,'#e8f1d6');sk.addColorStop(0.56,'#7fae5e');sk.addColorStop(1,'#5d8f46');
    ctx.fillStyle=sk;ctx.fillRect(dx,dt,dw,dh);
    ctx.fillStyle='#fff3c4';circ(dx+dw-20,dt+30,9);ctx.fill();                       // a sun, low, staying
    ctx.fillStyle='#7db3cf';ctx.fillRect(dx,dt+dh*0.62,dw,6);                          // a lake
    ctx.fillStyle='rgba(255,236,170,'+(0.25*o)+')';ctx.beginPath();ctx.moveTo(dx,WALLY);ctx.lineTo(dx+dw,WALLY);ctx.lineTo(dx+dw+40,H);ctx.lineTo(dx-170,H);ctx.closePath();ctx.fill();
  }else{ctx.fillStyle='#3a4258';ctx.fillRect(dx,dt,dw,dh);}
  // the door leaf swings into the room
  var lw=dw*(1-0.78*o);ctx.fillStyle='#454e66';ctx.beginPath();ctx.moveTo(dx,dt);ctx.lineTo(dx+lw,dt+10*o);ctx.lineTo(dx+lw,WALLY+6*o);ctx.lineTo(dx,WALLY);ctx.closePath();ctx.fill();
  ctx.fillStyle='#c9b48c';ctx.fillRect(dx+lw-11,dt+dh*0.5,7,3);
  // a snowed floor, bare under the lamp, green at the threshold once the door is open
  var fl=ctx.createLinearGradient(0,WALLY,0,H);fl.addColorStop(0,'#cfd8e3');fl.addColorStop(1,'#eef2f6');ctx.fillStyle=fl;ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);
  ctx.fillStyle='#e6ebf1';for(i=0;i<7;i++){ctx.beginPath();ctx.ellipse(40+i*150,WALLY+4,70,9,0,Math.PI,0);ctx.fill();}
  ctx.fillStyle='rgba(96,102,118,.55)';ctx.beginPath();ctx.ellipse(520,WALLY+44,64,15,0,0,Math.PI*2);ctx.fill();   // wet floor: the lamp melts it
  if(o>0.05){ctx.fillStyle='rgba(110,160,80,'+(0.8*o)+')';ctx.beginPath();ctx.ellipse(dx+dw/2-14,WALLY+10,60*o,10,0,0,Math.PI*2);ctx.fill();}
  // a fir in the corner, as one does, indoors, apparently
  var fx=46,fy=WALLY+28;ctx.fillStyle='#5b3d2a';ctx.fillRect(fx-5,fy-22,10,22);
  for(i=0;i<3;i++){var tw=62-i*14,ty=fy-22-i*38;ctx.fillStyle='#29473a';ctx.beginPath();ctx.moveTo(fx-tw,ty);ctx.lineTo(fx+tw,ty);ctx.lineTo(fx,ty-62);ctx.closePath();ctx.fill();
    ctx.fillStyle='#eef2f6';ctx.beginPath();ctx.moveTo(fx-tw*0.55,ty-26);ctx.lineTo(fx+tw*0.5,ty-30);ctx.lineTo(fx,ty-62);ctx.closePath();ctx.fill();}
  // the lamp itself is drawn by homeLamp, in front of the shadow, as at home
  drawDreamSnow(0.75,0);
  if(d.skis)drawSkis();
}
// Skis and poles under the human, drawn before the human so the feet stand on them.
function drawSkis(){
  var Hm=G.human,x=Hm.x,f=Math.abs(Hm.xT-x)>1?(Hm.xT<x?-1:1):(Hm.facing||1),y=FEETY+3,k;
  ctx.strokeStyle='#14111d';ctx.lineWidth=2.5;ctx.lineCap='round';
  var sw=G.walking||Math.abs(Hm.xT-x)>1?Math.sin(G.time*5)*10:0;
  line(x-6,FEETY-86,x-(26+sw)*f,y);line(x+6,FEETY-86,x-(10-sw)*f,y+2);   // poles, planted behind
  for(k=0;k<2;k++){var yy=y+k*4,a=x-58*f,b=x+58*f;
    ctx.strokeStyle=k?'#9e3a28':'#c04a33';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(a,yy);ctx.lineTo(b,yy);ctx.quadraticCurveTo(b+12*f,yy,b+16*f,yy-11);ctx.stroke();}
}
var DSNOW=[];for(var dsn=0;dsn<70;dsn++)DSNOW.push({x:snowRnd(dsn+701)*W,y:snowRnd(dsn+801)*H,r:1.4+snowRnd(dsn+901)*1.8,v:12+snowRnd(dsn+1001)*14,ph:snowRnd(dsn+1101)*6.3});
// back: most of the flakes, behind the pair; front: a few, nearer and bigger, and never over the words (drawn before them)
function drawDreamSnow(alpha,front){
  if(RM&&front)return;var t=RM?0:G.time,i,f,x,y,n=front?14:DSNOW.length;
  for(i=0;i<n;i++){f=DSNOW[i];y=(f.y+f.v*t)%(H+10)-5;x=f.x+Math.sin(t*0.4+f.ph)*12;x=((x%W)+W)%W;
    if(dreamInLight(x,y))continue;
    ctx.fillStyle='rgba(244,247,250,'+(front?0.85:alpha)+')';circ(x,y,f.r*(front?1.6:1));ctx.fill();}
}
function drawDreamFront(){if(G.set==='dream')drawDreamSnow(0,1);}
// A flake that Ekskyysmi has just filed, melting between its hands.
function drawMelt(q){var d=G.dream;if(!d||d.melt<=0)return;var k=d.melt/1.4,x=q.bx,y=q.shY+40*q.s;
  ctx.fillStyle='rgba(244,247,250,'+k+')';circ(x,y,6*k+2);ctx.fill();ctx.fillStyle='rgba(160,190,220,'+(1-k)*0.9+')';circ(x,y+10*(1-k),2.6);ctx.fill();}
// Through the door, full screen: July, midnight, a sun that stays up, and the shadow lying forty metres long in the grass.
// Kept above the phone's reading panel (the horizon is high), so the picture is whole on every screen.
function drawMeadow(o){
  var t=RM?0:G.time,i,len=0.32+0.68*(o.stretch!=null?clamp((G.time-o.stretch)/2.4,0,1):0);
  var sk=ctx.createLinearGradient(0,0,0,210);sk.addColorStop(0,'#86aed0');sk.addColorStop(0.7,'#f2d9a4');sk.addColorStop(1,'#f6c67c');ctx.fillStyle=sk;ctx.fillRect(0,0,W,212);
  var sg=ctx.createRadialGradient(812,168,6,812,168,170);sg.addColorStop(0,'rgba(255,244,205,.9)');sg.addColorStop(1,'rgba(255,244,205,0)');ctx.fillStyle=sg;ctx.fillRect(560,0,400,260);
  ctx.fillStyle='#fff3cf';circ(812,168,20);ctx.fill();                                   // 00:00, and up
  ctx.fillStyle='#2f4a3a';ctx.beginPath();ctx.moveTo(0,212);for(i=0;i<=48;i++){ctx.lineTo(i*20,196-((i*37)%11)*1.6-(i%3?0:9));}ctx.lineTo(W,214);ctx.lineTo(0,214);ctx.closePath();ctx.fill();
  ctx.fillStyle='#8fb7cc';ctx.fillRect(0,212,W,16);ctx.fillStyle='rgba(255,226,150,.75)';ctx.fillRect(786,214,52,3);ctx.fillRect(796,220,32,3);
  var gm=ctx.createLinearGradient(0,228,0,H);gm.addColorStop(0,'#94b35e');gm.addColorStop(1,'#5b873c');ctx.fillStyle=gm;ctx.fillRect(0,228,W,H-228);
  ctx.strokeStyle='#4f7a34';ctx.lineWidth=2;ctx.lineCap='round';
  for(i=0;i<70;i++){var gx=snowRnd(i+1601)*W,gy=240+snowRnd(i+1701)*(H-250),sw=Math.sin(t*1.3+i)*1.5;line(gx,gy,gx+sw-2,gy-6);line(gx+3,gy,gx+3+sw,gy-8);}
  for(i=0;i<26;i++){ctx.fillStyle=i%3?'#f6f1e4':'#f3d27a';circ(snowRnd(i+1801)*W,246+snowRnd(i+1901)*(H-260),2.2);ctx.fill();}
  // the long shadow, from the human's feet towards the left, away from the sun; the head at the far end, eyes on the sky
  var fx=744,fy=338,ex=fx-140-560*len,ey=fy+16,hw=10+16*len;
  ctx.fillStyle='#29324a';ctx.beginPath();ctx.moveTo(fx-6,fy-3);ctx.lineTo(fx+6,fy+4);
  ctx.quadraticCurveTo(ex+70,ey+hw*0.9,ex+24,ey+hw);ctx.lineTo(ex+24,ey-hw);ctx.quadraticCurveTo(ex+70,ey-hw*0.7,fx-6,fy-3);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.ellipse(ex+24,ey,14,hw,0,0,Math.PI*2);ctx.fill();                 // round shoulders, joined to the head
  ctx.strokeStyle='#29324a';ctx.lineWidth=8;ctx.lineCap='round';                   // arms out in the grass
  ctx.beginPath();ctx.moveTo(ex+30,ey-hw*0.6);ctx.quadraticCurveTo(ex+38,ey-hw*1.6,ex+52,ey-hw*2.1);ctx.stroke();
  ctx.beginPath();ctx.moveTo(ex+30,ey+hw*0.6);ctx.quadraticCurveTo(ex+40,ey+hw*1.5,ex+56,ey+hw*1.9);ctx.stroke();
  ctx.beginPath();ctx.ellipse(ex+6,ey,19,15,0,0,Math.PI*2);ctx.fill();ctx.fillRect(ex+6,ey-9,18,18);   // the head, on the shoulders
  var blink=!RM&&(t%5.3)<0.12,wide=G.cur&&G.cur.who==='S'&&G.cur.look==='stunned'?1.3:1;
  ctx.fillStyle='#f6f1e4';ctx.beginPath();ctx.ellipse(ex-1,ey-2,4*wide,blink?0.6:5*wide,0,0,Math.PI*2);ctx.ellipse(ex+12,ey-2,4*wide,blink?0.6:5*wide,0,0,Math.PI*2);ctx.fill();
  if(!blink){ctx.fillStyle='#14111d';circ(ex,ey-5,1.9);ctx.fill();circ(ex+13,ey-5,1.9);ctx.fill();}   // looking up, at a sky that stays light
  // the human, small and far, the skis stuck upright in the grass beside them
  ctx.strokeStyle='#c04a33';ctx.lineWidth=4;line(fx+34,fy+2,fx+30,fy-70);line(fx+42,fy+3,fx+40,fy-68);
  ctx.save();ctx.translate(fx,fy);ctx.scale(0.62,0.62);ctx.translate(-fx,-FEETY);person(fx,{body:'#c98f2e',hair:'#4a3b32',facing:-1,shadow:0});ctx.restore();
  ctx.fillStyle='rgba(20,22,30,.72)';rr(14,14,64,26,6);ctx.fill();ctx.fillStyle='#f3d27a';ctx.font='700 14px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('00:00',46,27);
}
function catchFlake(){var g=G;if(g.dream)g.dream.melt=1.4;g.morko.pose='hold';sfx('pick');}
function labSnow(){return labScene({set:'dream',title:'Snow indoors.',plan:'Get to the door.',clock:3*3600+30*60}).concat([
  dreamOn,
  ['N','After a long Thursday. It is snowing in the living room.'],
  set({mood:'surprised',s:1.1}),
  ['S','It’s snowing. Indoors. Is that allowed?'],
  ['H','It’s a dream.'],
  ['S','How do you know?'],
  ['H','I’m wearing skis. In the living room.'],
  ['S','You did buy them.'],
  ['H','In 2014.'],
  ['S','I have them filed under “plans”.',{look:'squint'}],
  set({mood:'alert'}),
  ['S','Hold on. All this needs filing.'],
  catchFlake,{wait:1.2},
  ['S','This one is unique.'],
  catchFlake,{wait:1},
  ['S','So is this one. They’re ALL unique. There’s no system.'],
  ['H','They melt anyway.'],
  set({pose:null}),
  ['S','…I filed one and it melted. The file is wet.'],
  function(){G.dream.doorT=1;sfx('turn');},{wait:1.6},
  ['N','At the far end of the room a door has opened. Behind it, summer.'],
  set({mood:'alert',s:1.45}),
  ['S','No.'],
  ['H','It’s summer.'],
  ['S','Summer is exposed. Nobody wears a coat. Everyone can see everything.'],
  ['H','You can come.'],
  {choice:[
    {t:'There is an avalanche risk. In the living room.',m:'worst',then:[
      ['H','It’s flat.'],
      ['S','It’s flat NOW.']]},
    {t:'Wait under the duvet until spring.',m:'hide',then:[
      ['H','The door is already summer.'],
      ['S','Then it skipped spring. I don’t trust a season that skips.']]},
    {t:'Fine. Ski. I’ll come.',m:'stay',then:[
      ['S','Point of order: shadows can’t ski.'],
      ['H','You’re about to find out.']]}
  ]},
  ['H','I’m going.'],
  {hold:{kind:'ski',secs:3.2,from:400,to:DREAMDOOR.x-54}},
  set({mood:'surprised',s:1}),
  ['S','…I’m blue.'],
  ['H','Shadows on snow are blue.'],
  ['S','Since WHEN?'],
  ['H','Always. Ask anyone who paints.'],
  ['S','Nobody told me I had a colour.',{look:'soft'}],
  function(){var g=G;g.out={anim:'meadow',inside:true,t:0,title:'',dur:'',cap:''};g.lines=[];g.band=null;g.cur=null;sfx('turn');},{wait:1.2},
  ['N','Through the door: a meadow, a lake, and a sun that will not set tonight.'],
  ['S','It won’t set?'],
  ['H','Not in July. Not up here.'],
  set({mood:'worry',s:1.2}),
  ['S','Then I don’t get a night off.'],
  ['H','You get a long one. Look.'],
  function(){G.out.stretch=G.time;sfx('grow');},{wait:2.6},
  ['S','…At midnight I’m forty metres long.',{look:'stunned'}],
  ['H','Lying down. In the grass.'],
  set({mood:'calm',s:0.9}),
  ['S','Lying down in the grass. On duty.'],
  ['H','On duty.'],
  {wait:1.4},function(){G.out=null;}
 ],outside({title:'WHAT WAS ACTUALLY THERE',dur:'duration: one night',cap:'A sofa. A blanket. The window open a crack, and a little November on the sill.',anim:'text'}),[
  scene({set:'home',clock:7*3600+10*60}),function(){var g=G;g.dream=null;g.noCup=true;},calm,
  ['N','Morning. A little water on the windowsill.'],
  ['H','I dreamt I skied through the living room.'],
  ['S','I was there. I was blue.'],
  ['H','You were.'],
  ['S','I tried to file the snow.'],
  ['H','How did it go?'],
  ['S','It melted. Every one. No two alike, and then none at all.'],
  ['H','Sounds like a good night.'],
  set({s:1,mood:'calm'}),
  ['S','It was. I’m keeping the file. It’s wet and it’s empty.'],
  ['S','It’s my favourite.']
 ]);}
SETS.dream=dreamRoom;MSTEP.push(stepDream);MFRONT.push(drawDreamFront);

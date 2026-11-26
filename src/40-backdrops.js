/* ================= extra backdrops ================= */
function home(){
  ctx.fillStyle='#2c3242';ctx.fillRect(-20,-20,W+40,WALLY+20);
  var glx=G.bed?690:520,gr=ctx.createRadialGradient(glx,300,10,glx,300,330);gr.addColorStop(0,'rgba(255,214,140,'+(G.lampOff?0:.42)+')');gr.addColorStop(1,'rgba(255,214,140,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,W,WALLY);if(!G.lampOff&&!G.kitchen)dust(G.bed?690:520,250);
  ctx.fillStyle='#232733';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);ctx.fillStyle='#1c202b';ctx.fillRect(-20,WALLY-6,W+40,6);
  ctx.fillStyle='#e9e2cf';rr(112,96,170,150,4);ctx.fill();ctx.fillStyle='#12152a';ctx.fillRect(120,104,154,134);sky(120,104,154,134,true);
  ctx.fillStyle='#f6f1e4';circ(236,134,13);ctx.fill();ctx.fillStyle='#12152a';circ(242,130,11);ctx.fill();
  ctx.fillStyle='#f6f1e4';for(var i=0;i<7;i++){circ(132+i*19,118+(i*41)%96,1.2);ctx.fill();}
  ctx.strokeStyle='#e9e2cf';ctx.lineWidth=5;line(197,104,197,238);
  if(G.kitchen)kitchen();   // the floor lamp is drawn later (homeLamp): it stands in the room, in front of the shadow on the wall
  if(G.basket){var bx=G.human.x+64;if(Math.abs(bx-520)<70)bx=G.human.x-78;   // never under the lamp (Joonas 20.11.)
    ctx.fillStyle='#b99b6b';ctx.beginPath();ctx.moveTo(bx-30,FEETY-34);ctx.lineTo(bx+30,FEETY-34);ctx.lineTo(bx+24,FEETY);ctx.lineTo(bx-24,FEETY);ctx.closePath();ctx.fill();
    ctx.fillStyle='#e9e2cf';ctx.beginPath();ctx.ellipse(bx-6,FEETY-36,22,9,0,Math.PI,0);ctx.fill();ctx.fillStyle='#9fb6c9';ctx.beginPath();ctx.ellipse(bx+12,FEETY-36,14,7,0,Math.PI,0);ctx.fill();}
  drawTable();drawBed();
  if(!G.bed&&!G.kitchen){   // at night the bed takes the floor; in the kitchen there is no sofa
  ctx.fillStyle='#57486a';rr(600,292,300,70,16);ctx.fill();ctx.fillStyle='#655479';rr(588,338,324,84,14);ctx.fill();
  ctx.fillStyle='#4b3e5b';rr(588,330,30,92,10);ctx.fill();rr(882,330,30,92,10);ctx.fill();
  ctx.fillStyle='#c98f2e';rr(700,322,60,34,8);ctx.fill();
  // 0.82: someone has mended this sofa (one trace of use per object, Codex visual review 22.11.)
  ctx.save();ctx.translate(828,372);ctx.rotate(-0.06);ctx.fillStyle='#76668c';ctx.fillRect(-17,-12,34,24);
  ctx.strokeStyle='#3f3350';ctx.lineWidth=1.6;ctx.setLineDash([4,3]);ctx.strokeRect(-14,-9,28,18);ctx.setLineDash([]);ctx.restore();}
  if(G.snacks){var cols=['#c9553f','#e2b04a','#62887f'];for(var k=G.torn?1:0;k<11;k++){var b=bagPos(k);ctx.fillStyle=cols[k%3];rr(b.x,b.y,26,34,5);ctx.fill();}}
}
function homeLamp(){
  if(G.set!=='home'&&G.set!=='dream'||G.kitchen||G.w)return;   // 0.99.23: the dream has the same lamp
  var lx=G.bed?690:520;   // at night the bed takes the middle of the room: the lamp stands at its foot, not on it
  ctx.strokeStyle='#15171f';ctx.lineWidth=4;ctx.lineCap='round';line(lx,WALLY+62,lx,292);
  ctx.fillStyle=G.lampOff?'#6f6857':'#f3d27a';ctx.beginPath();ctx.moveTo(lx-20,262);ctx.lineTo(lx+20,262);ctx.lineTo(lx+32,296);ctx.lineTo(lx-32,296);ctx.closePath();ctx.fill();
}
function bagPos(k){var row=k<6?0:1,col=row?k-6:k;return {x:628+col*40+(row?20:0),y:row?372:346};}
function countBags(){var g=G;for(var k=0;k<11;k++){var b=bagPos(k);g.tics.push(tic(String(k+1),b.x+13,b.y-16,{at:k*0.2,life:k===10?2.4:1.1,size:k===10?20:15,col:k===10?'#9fd3a8':'#f1ebdd'}));}}
function office(flat){
  ctx.fillStyle=flat?'#d5d8cf':'#d9ddd2';ctx.fillRect(-20,-20,W+40,WALLY+20);
  ctx.fillStyle=flat?'#b1b5a3':'#b3b8a8';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);ctx.fillStyle='#8d9a8c';ctx.fillRect(-20,WALLY-6,W+40,6);
  ctx.fillStyle='#fbf8ef';ctx.strokeStyle='#8d9a8c';ctx.lineWidth=4;rr(130,112,250,140,6);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#62887f';ctx.lineWidth=3;ctx.lineCap='round';line(156,150,270,150);line(156,176,330,176);line(156,202,240,202);
  ctx.strokeStyle='#c9553f';ctx.beginPath();ctx.moveTo(290,222);ctx.lineTo(312,196);ctx.lineTo(330,210);ctx.lineTo(356,170);ctx.stroke();
  ctx.fillStyle='#f4eedb';rr(689,99,170,146,4);ctx.fill();ctx.fillStyle='#a9c0c4';ctx.fillRect(697,107,154,130);sky(697,107,154,130,false);
  ctx.strokeStyle='#f4eedb';ctx.lineWidth=6;line(774,107,774,237);
  ctx.fillStyle='#8b7355';rr(560,404,330,14,4);ctx.fill();ctx.fillRect(578,418,8,50);ctx.fillRect(864,418,8,50);
}
function backdrop(flat){G.roomFront=null;if(G.set==='bar')bar();else if(G.set==='library')library();else if(G.set==='home')home();else if(SETS[G.set])SETS[G.set]();else if(G.set==='clinic')clinic();else if(G.set==='lift')epiLift();else if(G.set==='office')office(flat);else{room(flat,true);G.roomFront=flat;}}
function sannaShadow(){
  var g=G,k=g.zShow;if(!k||k<0.02||!g.cowA)return;var x=g.ax+62,by=WALLY;
  ctx.save();ctx.globalAlpha=Math.min(1,k);ctx.fillStyle='#3d3554';
  ctx.globalAlpha=Math.min(1,k)*0.55;ctx.beginPath();ctx.moveTo(g.ax-20,FEETY);ctx.lineTo(g.ax+20,FEETY);ctx.lineTo(x+22,by);ctx.lineTo(x-22,by);ctx.closePath();ctx.fill();
  ctx.globalAlpha=Math.min(1,k);
  ctx.beginPath();ctx.moveTo(x-22,by);ctx.lineTo(x+22,by);ctx.lineTo(x+38,by-108);ctx.lineTo(x-38,by-108);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.ellipse(x,by-110,46,21,0,0,Math.PI*2);ctx.fill();circ(x,by-147,19);ctx.fill();circ(x+2,by-168,8);ctx.fill();
  ctx.fillStyle='#f6f1e4';circ(x-8,by-148,4.6);ctx.fill();circ(x+8,by-148,4.6);ctx.fill();
  ctx.fillStyle='#14111d';circ(x-9.6,by-148,2);ctx.fill();circ(x+6.4,by-148,2);ctx.fill();
  ctx.restore();
}
// Eero's shadow works in a different department: later. It runs a little behind him, and its watch has no hands.
function eeroShadow(){
  var g=G,k=g.yShow;if(!k||k<0.02)return;var x=g.yx,by=WALLY,bob=RM?0:Math.sin(g.time*1.6)*2;
  ctx.save();ctx.fillStyle='#3a3a55';ctx.globalAlpha=Math.min(1,k);
  ctx.beginPath();ctx.moveTo(x-18,by);ctx.lineTo(x+18,by);ctx.lineTo(x+30,by-128);ctx.lineTo(x-30,by-128);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.ellipse(x,by-130,38,16,0,0,Math.PI*2);ctx.fill();circ(x,by-166+bob,17);ctx.fill();
  ctx.strokeStyle='#3a3a55';ctx.lineWidth=11;ctx.lineCap='round';line(x+30,by-128,x+50,by-152+bob);
  ctx.fillStyle='#f6f1e4';circ(x+53,by-156+bob,7.5);ctx.fill();ctx.strokeStyle='#3a3a55';ctx.lineWidth=2;circ(x+53,by-156+bob,7.5);ctx.stroke();
  ctx.fillStyle='#f6f1e4';circ(x-7,by-167+bob,4.4);ctx.fill();circ(x+7,by-167+bob,4.4);ctx.fill();
  ctx.fillStyle='#14111d';var look=g.yxT>g.yx+2?1.6:0;circ(x-7+look,by-166+bob,1.9);ctx.fill();circ(x+7+look,by-166+bob,1.9);ctx.fill();
  ctx.restore();
}
// Riitta's shadow works in load. Eleven things in the air, eyes on all of them, none on you. It can drop exactly one.
function riittaShadow(){
  var g=G,k=g.wShow;if(!k||k<0.02)return;var x=g.rx+92,by=WALLY,d=g.wDrop,n=d?10:11,cy=by-196,t=RM?0.6:g.time*2.1,i,a,ex;
  ctx.save();ctx.globalAlpha=Math.min(1,k);ctx.fillStyle='#35374f';
  ctx.beginPath();ctx.moveTo(x-16,by);ctx.lineTo(x+16,by);ctx.lineTo(x+25,by-120);ctx.lineTo(x-25,by-120);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.ellipse(x,by-122,34,14,0,0,Math.PI*2);ctx.fill();circ(x,by-152,16);ctx.fill();
  ctx.strokeStyle='#35374f';ctx.lineWidth=10;ctx.lineCap='round';
  var up=RM?0:Math.sin(t*2)*5;line(x-27,by-118,x-50,by-150+up);line(x+27,by-118,x+50,by-150-up);
  ctx.fillStyle='#f6f1e4';ctx.strokeStyle='#35374f';ctx.lineWidth=2;
  for(i=0;i<n;i++){a=t+i*Math.PI*2/n;circ(x+Math.cos(a)*54,cy-Math.sin(a)*30-(Math.sin(a)>0?Math.sin(a)*14:0),5.2);ctx.fill();ctx.stroke();}
  if(d){var f=Math.min(1,d.t/0.5),fy=cy+(by-8-cy)*f*f,b=d.t>0.5&&!RM?Math.abs(Math.sin((d.t-0.5)*9))*10*Math.max(0,1-(d.t-0.5)/0.9):0;
    ctx.fillStyle='#e0563e';circ(x+66,fy-b,5.6);ctx.fill();ctx.stroke();}
  ctx.fillStyle='#f6f1e4';circ(x-6.5,by-153,4.2);ctx.fill();circ(x+6.5,by-153,4.2);ctx.fill();
  ex=RM?0:Math.cos(t)*1.7;ctx.fillStyle='#14111d';circ(x-6.5+ex,by-155,1.8);ctx.fill();circ(x+6.5+ex,by-155,1.8);ctx.fill();
  ctx.restore();
}
// A part card is a breath, not a cut: the last picture darkens, then PART, the title and the caption arrive one at a time.
// The caption lives on the card itself, so nothing is read twice; the button arrives last (CSS .late, input waits PARTWAIT).
var PARTWAIT=2.4;
function partCardDraw(c){
  var t=c.t,cy=COMPACT?H*0.32:H/2,k=RM?3:1;
  if(G.snap&&t<0.8){try{var sw=G.snap.width,sh=G.snap.height,f=Math.max(cv.width/sw,cv.height/sh);ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(G.snap,(cv.width-sw*f)/2,(cv.height-sh*f)/2,sw*f,sh*f);ctx.restore();}catch(e){}}
  else G.snap=null;
  ctx.fillStyle='rgba(24,42,45,'+clamp(t*k/0.7,0,1)+')';ctx.fillRect(0,0,W,H);
  var a1=clamp((t*k-0.5)/0.6,0,1),a2=clamp((t*k-0.9)/0.7,0,1),a3=clamp((t*k-1.8)/0.8,0,1);
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.globalAlpha=a1;ctx.font='700 18px system-ui,sans-serif';ctx.fillStyle='#e2b04a';ctx.fillText(tr(c.day),W/2,cy-58);
  ctx.globalAlpha=a2;ctx.font='650 64px Fraunces,Georgia,serif';ctx.fillStyle='#f1ebdd';ctx.fillText(tr(c.title),W/2,cy+(RM?0:(1-a2)*10));
  if(c.caption){ctx.globalAlpha=a3;ctx.font='italic 400 23px Fraunces,Georgia,serif';ctx.fillStyle='#c9c2b2';ctx.fillText(tr(c.caption),W/2,cy+64);}
  ctx.globalAlpha=1;
}
function chapCard(){
  if(G.chap.part){partCardDraw(G.chap);return;}
  var c=G.chap,a=clamp(c.t/0.5,0,1)*(c.part?1:clamp((2.8-c.t)/0.5,0,1)),cy=COMPACT?H*0.32:H/2;
  ctx.fillStyle='#182a2d';ctx.fillRect(0,0,W,H);
  ctx.globalAlpha=a;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='700 18px system-ui,sans-serif';ctx.fillStyle='#e2b04a';ctx.fillText(tr(c.day),W/2,cy-52);
  ctx.font='650 64px Fraunces,Georgia,serif';ctx.fillStyle='#f1ebdd';ctx.fillText(tr(c.title),W/2,cy+6);
  ctx.globalAlpha=1;
}
// Direction B (TARINAKARTTA §8, 21.11.): a moment is a window into the same life, not a new day. Its card is lighter:
// the scene stays visible under a veil, the time floats in small letters, the title is smaller and set in italics.
function momentCard(){
  var c=G.chap,a=clamp(c.t/0.4,0,1)*clamp((2.4-c.t)/0.45,0,1),cy=COMPACT?H*0.34:H/2;
  ctx.save();ctx.setTransform(SC,0,0,SC,0,0);ctx.fillStyle='rgba(14,22,25,'+(0.8*Math.max(a,0.35))+')';ctx.fillRect(0,0,W,H);
  ctx.globalAlpha=a;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='600 '+(COMPACT?17:14)+'px system-ui,sans-serif';ctx.fillStyle='#c9b48a';ctx.fillText(tr(c.day),W/2,cy-36);
  ctx.fillStyle='rgba(226,176,74,.55)';ctx.fillRect(W/2-22,cy-18,44,2);
  ctx.font='italic 600 '+(COMPACT?50:44)+'px Fraunces,Georgia,serif';ctx.fillStyle='#f1ebdd';ctx.fillText(tr(c.title),W/2,cy+18);
  ctx.restore();}
function bigNote(){
  var n=G.bigNote,settle=clamp((n.t-2.6)/0.8,0,1);
  var a=clamp(n.t/0.25,0,1)*(1-0.72*settle),sh=RM?0:Math.sin(G.time*52)*4*(1-settle);
  ctx.save();ctx.globalAlpha=a;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 150px Fraunces,Georgia,serif';
  ctx.fillStyle='rgba(18,14,30,.55)';ctx.fillText(n.text,W/2+sh+5,H/2-34);
  ctx.fillStyle='#e0563e';ctx.fillText(n.text,W/2+sh,H/2-40);ctx.restore();
}

/* ================= a little life (Joonas 20.11.: the world felt static) =================
   Through windows: now and then a bird by day, a plane's light or a shooting star by night. In lamp light: dust.
   All of it is clocked by G.time, so it is the same on every replay, and Less motion turns it off. */
// 0.85 (Joonas: "far too often, and always the same"): a bird now and then, not every seven seconds; some passes are empty,
// some have two birds, speeds differ. At night a plane only sometimes, a shooting star rarely. The hash no longer creeps by a fixed step.
function skyHash(k,x){var v=Math.sin(k*12.9898+x*78.233)*43758.5453;return v-Math.floor(v);}
function sky(x,y,w,h,night){
  if(RM||!G.time)return;var t=G.time+x*0.37;
  ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
  if(!night){
    var P=11,k=Math.floor(t/P),ph=t-k*P,r=skyHash(k,x),dur=2.6+skyHash(k+7,x)*1.9;
    if(r<0.3&&ph<dur){var u=ph/dur,dir=skyHash(k+3,x)>0.5?1:-1,bx=dir>0?x-20+(w+40)*u:x+w+20-(w+40)*u,by=y+18+skyHash(k+5,x)*(h*0.55)+Math.sin(ph*3)*4,fl=Math.sin(G.time*14)*4;
      ctx.strokeStyle='rgba(40,46,52,.75)';ctx.lineWidth=1.8;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(bx-7,by-fl);ctx.lineTo(bx,by);ctx.lineTo(bx+7,by-fl);ctx.stroke();
      if(r<0.1){var b2=bx-dir*16;ctx.beginPath();ctx.moveTo(b2-6,by+7+fl);ctx.lineTo(b2,by+9);ctx.lineTo(b2+6,by+7+fl);ctx.stroke();}}
  }else{
    var P2=26,k2=Math.floor(t/P2),ph2=t-k2*P2;
    if(skyHash(k2,x+3)<0.3){var px=x-30+ph2*9,py=y+22+((x*7)%30);if(Math.sin(G.time*5)>0.6){ctx.fillStyle='rgba(255,90,80,.9)';circ(px,py,1.6);ctx.fill();}
      ctx.fillStyle='rgba(255,255,255,.55)';circ(px+4,py,1.1);ctx.fill();}
    var P3=9.5,k3=Math.floor(t/P3),ph3=t-k3*P3;
    if(skyHash(k3,x+11)>0.92&&ph3<0.7){var sx=x+w*0.85-ph3*w*1.1,sy=y+10+ph3*h*0.5;var g2=ctx.createLinearGradient(sx,sy,sx+26,sy-12);g2.addColorStop(0,'rgba(255,255,255,'+(0.9-ph3)+')');g2.addColorStop(1,'rgba(255,255,255,0)');
      ctx.strokeStyle=g2;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+26,sy-12);ctx.stroke();}
  }
  ctx.restore();
}
function dust(cx,cy){
  if(RM||!G.time)return;ctx.fillStyle='rgba(255,236,190,.55)';
  for(var i=0;i<9;i++){var a=i*2.39,rad=40+((i*53)%120),u=G.time*(0.05+i*0.008)+a;
    circ(cx+Math.cos(u)*rad,cy-30+Math.sin(u*1.3)*rad*0.5-((G.time*4+i*17)%60)*0.4,1+((i*3)%2)*0.6);ctx.fill();}
}

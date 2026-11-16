/* ================= drawing helpers ================= */
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
function circ(x,y,r){ctx.beginPath();ctx.arc(x,y,Math.max(0.1,r),0,Math.PI*2);}
function line(x1,y1,x2,y2){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}
function wrap(text,maxW){var words=text.split(' '),lines=[],cur='';for(var i=0;i<words.length;i++){var t=cur?cur+' '+words[i]:words[i];if(cur&&ctx.measureText(t).width>maxW){lines.push(cur);cur=words[i];}else cur=t;}if(cur)lines.push(cur);return lines;}
// A word in capitals is a word said louder: heavier, a touch bigger, and in Ekskyysmi's bubbles in the accent colour.
function isLoud(w){return /[A-Z]{2}/.test(w)&&!/[a-z]/.test(w);}
function bubbleK(o){return o&&o.loud?1.34:o&&o.quiet?0.72:1;}
function bubble(x,y,text,o){
  o=o||{};
  var k=bubbleK(o),fs=17*k,lh=22*k,base='600 '+fs+'px system-ui,sans-serif',em='800 '+(fs+1.5*k)+'px system-ui,sans-serif',i,j;
  ctx.font=base;ctx.textAlign='left';ctx.textBaseline='middle';
  var lines=wrap(text,(o.maxW||250)*(k>1?1.22:1)),w=0,words=[],widths=[];
  for(i=0;i<lines.length;i++){var ws=lines[i].split(' '),lw=0,wd=[];
    for(j=0;j<ws.length;j++){ctx.font=isLoud(ws[j])?em:base;var m=ctx.measureText(ws[j]+(j<ws.length-1?' ':'')).width;wd.push(m);lw+=m;}
    words.push(ws);widths.push(wd);w=Math.max(w,lw);}
  w+=26;var h=lines.length*lh+16,bx=clamp(x-w/2,8,W-w-8),by=o.top!=null?o.top:Math.max(8,y-h-12);
  var fill=o.dark?'#14111d':'#fffdf6',ink=o.dark?'#f6f1e4':'#2b2733',hot=o.dark?'#ebbd79':'#2b2733';
  ctx.fillStyle=fill;ctx.strokeStyle=ink;ctx.lineWidth=k>1?3:2;rr(bx,by,w,h,10);ctx.fill();ctx.stroke();
  if(!o.noTail){var tx=clamp(x,bx+16,bx+w-16);ctx.beginPath();ctx.moveTo(tx-8,by+h-1);ctx.lineTo(tx,by+h+10);ctx.lineTo(tx+8,by+h-1);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.moveTo(tx-8,by+h);ctx.lineTo(tx,by+h+10);ctx.lineTo(tx+8,by+h);ctx.stroke();}
  var left=o.reveal==null?1e9:o.reveal;
  for(i=0;i<lines.length&&left>0;i++){var cx=bx+13,cy=by+8+lh/2+i*lh;
    for(j=0;j<words[i].length&&left>0;j++){var wj=words[i][j],ld=isLoud(wj);ctx.font=ld?em:base;ctx.fillStyle=ld?hot:ink;
      ctx.fillText(wj.slice(0,left),cx,cy);cx+=widths[i][j];left-=wj.length+1;}
  }
}
// A bubble that grows as it is typed, until it is the biggest thing in the room. Its author did not expect that.
var BIGW=600,BIGX=22,BIGTOP=12;   // left of the HUD rows, over the window
function bigBox(text,reveal){ctx.font='700 24px system-ui,sans-serif';var lines=wrap(text.slice(0,Math.max(1,reveal)),BIGW-44);return {lines:lines,h:lines.length*31+24};}
function bigBubble(text,reveal){
  var b=bigBox(text,reveal),bx=BIGX,i;
  ctx.textAlign='left';ctx.textBaseline='middle';
  ctx.fillStyle='#14111d';ctx.strokeStyle='#f6f1e4';ctx.lineWidth=2.5;rr(bx,BIGTOP,BIGW,b.h,12);ctx.fill();ctx.stroke();
  ctx.fillStyle='#f6f1e4';for(i=0;i<b.lines.length;i++)ctx.fillText(b.lines[i],bx+22,BIGTOP+12+16+i*31);
}
function bubbleH(text,maxW,o){var k=bubbleK(o);ctx.font='600 '+(17*k)+'px system-ui,sans-serif';return wrap(text,maxW*(k>1?1.22:1)).length*22*k+16;}
function band(text,y){
  ctx.font='500 18px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  var lines=wrap(text,820),h=lines.length*24+16;
  ctx.fillStyle='rgba(22,19,30,.84)';rr(W/2-440,y-h,880,h,10);ctx.fill();
  ctx.fillStyle='#f1ebdd';for(var i=0;i<lines.length;i++)ctx.fillText(lines[i],W/2,y-h+8+12+i*24);
}
function applyCamera(){
  var z=C.z,hw=W/(2*z),hh=H/(2*z),sx=0,sy=0;
  if(!RM){sx=Math.sin(G.time*0.45)*5+Math.sin(G.time*83)*8*G.shake;sy=Math.sin(G.time*0.9)*2.6+Math.cos(G.time*71)*6*G.shake;}
  var fx=clamp(C.fx+sx,hw,W-hw),fy=clamp(C.fy+sy,hh,H-hh);
  ctx.translate(W/2,H/2);ctx.scale(z,z);ctx.translate(-fx,-fy);
}

/* ================= drawing: break room ================= */
function room(flat){
  ctx.fillStyle=flat?'#d8d9cc':'#dce0cd';ctx.fillRect(-20,-20,W+40,WALLY+20);
  if(!flat){var gr=ctx.createRadialGradient(640,345,10,640,345,420);gr.addColorStop(0,'rgba(255,228,150,.6)');gr.addColorStop(1,'rgba(255,228,150,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,W,WALLY);}
  ctx.fillStyle=flat?'#b1b5a3':'#b8bda7';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);
  ctx.fillStyle='#899887';ctx.fillRect(-20,WALLY-6,W+40,6);
  ctx.strokeStyle='#697e7018';ctx.lineWidth=1;for(var f=0;f<8;f++)line(0,405+f*24,W,405+f*24);
  ctx.fillStyle='#f4eedb';rr(689,99,170,146,4);ctx.fill();ctx.fillStyle='#94ada7';ctx.fillRect(697,107,154,130);
  ctx.fillStyle='#b5c6b7';ctx.beginPath();ctx.moveTo(697,201);ctx.lineTo(740,162);ctx.lineTo(790,205);ctx.lineTo(823,177);ctx.lineTo(851,198);ctx.lineTo(851,237);ctx.lineTo(697,237);ctx.fill();
  ctx.strokeStyle='#f4eedb';ctx.lineWidth=6;line(774,107,774,237);line(697,172,851,172);
  ctx.fillStyle='#f4eedb';rr(682,239,184,9,3);ctx.fill();
  ctx.fillStyle='#64816a';ctx.beginPath();ctx.ellipse(67,323,13,31,-.4,0,Math.PI*2);ctx.ellipse(93,301,14,35,.3,0,Math.PI*2);ctx.ellipse(109,330,11,27,.7,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#557260';ctx.lineWidth=3;line(88,365,91,293);line(88,350,67,316);line(88,352,110,325);
  ctx.fillStyle='#c78d71';ctx.beginPath();ctx.moveTo(64,348);ctx.lineTo(111,348);ctx.lineTo(103,389);ctx.lineTo(72,389);ctx.closePath();ctx.fill();
  ctx.fillStyle='#b08a5a';rr(140,150,150,104,4);ctx.fill();
  ctx.fillStyle='#f6f1e4';ctx.fillRect(152,162,46,58);ctx.fillRect(206,166,34,40);ctx.fillRect(246,160,34,50);ctx.fillRect(208,214,60,30);
  ctx.strokeStyle='#9c958a';ctx.lineWidth=1.5;for(var i=0;i<5;i++)line(157,172+i*9,192,172+i*9);
  ctx.fillStyle='#5a6559';ctx.font='600 9px "DM Sans",sans-serif';ctx.textAlign='center';ctx.fillText('BE A MUG.',237,226);ctx.fillText('NOT A HERO.',237,237);
  ctx.fillStyle='#c9553f';circ(175,164,3);ctx.fill();circ(223,168,3);ctx.fill();circ(263,162,3);ctx.fill();
  var cx=560,cy=92;ctx.fillStyle='#fbf8ef';ctx.strokeStyle='#2b2733';ctx.lineWidth=3;circ(cx,cy,27);ctx.fill();ctx.stroke();
  var s=G.clock,sa=(s%60)/60*Math.PI*2,ma=((s/60)%60)/60*Math.PI*2,ha=((s/3600)%12)/12*Math.PI*2;
  ctx.lineCap='round';ctx.lineWidth=3;line(cx,cy,cx+Math.sin(ha)*13,cy-Math.cos(ha)*13);
  ctx.lineWidth=2;line(cx,cy,cx+Math.sin(ma)*20,cy-Math.cos(ma)*20);
  ctx.strokeStyle='#c9553f';ctx.lineWidth=1.5;line(cx,cy,cx+Math.sin(sa)*22,cy-Math.cos(sa)*22);
  ctx.fillStyle=flat?'#8c9092':'#7d8a8c';ctx.fillRect(728,322,252,WALLY-322);
  ctx.fillStyle=flat?'#74787a':'#667274';ctx.fillRect(728,316,252,8);
  ctx.fillStyle='#34323c';rr(872,262,52,56,5);ctx.fill();ctx.fillStyle='#c9553f';circ(912,274,3);ctx.fill();
  ctx.fillStyle='#fbf8ef';ctx.fillRect(748,302,12,14);ctx.fillRect(766,302,12,14);
  ctx.strokeStyle='#fbf8ef';ctx.lineWidth=2;ctx.beginPath();ctx.arc(760,309,4,-Math.PI/2,Math.PI/2);ctx.stroke();
  ctx.beginPath();if(G.mugFixed===false)ctx.arc(766,309,4,Math.PI/2,Math.PI*1.5);else ctx.arc(778,309,4,-Math.PI/2,Math.PI/2);ctx.stroke();
  ctx.fillStyle='#6b563e';ctx.fillRect(604,420,72,8);ctx.fillRect(610,428,6,40);ctx.fillRect(664,428,6,40);
  ctx.strokeStyle='#3d3a44';ctx.lineWidth=4;line(640,420,640,366);
  ctx.fillStyle=flat?'#d9c79a':'#f3d27a';ctx.beginPath();ctx.moveTo(624,340);ctx.lineTo(656,340);ctx.lineTo(666,368);ctx.lineTo(614,368);ctx.closePath();ctx.fill();
  if(G.cupLeft){ctx.fillStyle='#fffdf6';ctx.strokeStyle='#2b2733';ctx.lineWidth=1.5;rr(650,406,12,14,2);ctx.fill();ctx.stroke();}
}

/* ================= drawing: people ================= */
function person(x,o){
  var f=o.facing||1,fl=o.flinch||0,top=FEETY-118-fl*5,lg=o.walk?Math.sin(G.time*8)*6:0;
  ctx.save();if(o.alpha!=null)ctx.globalAlpha=o.alpha;
  if(o.shadow!==0){ctx.fillStyle='rgba(20,16,30,'+(0.2*(o.shadow==null?1:o.shadow))+')';ctx.beginPath();ctx.ellipse(x,FEETY+2,30,7,0,0,Math.PI*2);ctx.fill();}
  if(o.puddle>0.02){ctx.fillStyle='rgba(150,205,230,.55)';ctx.beginPath();ctx.ellipse(x+6,FEETY+5,20+o.puddle*70,4+o.puddle*7,0,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle='#3a3944';rr(x-15+lg,FEETY-54,12,54,4);ctx.fill();rr(x+3-lg,FEETY-54,12,54,4);ctx.fill();
  var skin=o.body===SANNA.body?'#c9957a':o.body===MIKA.body?'#e5c4a1':'#e4bba2';
  ctx.fillStyle='#263639';rr(x-19+lg,FEETY-8,20,10,4);ctx.fill();rr(x+1-lg,FEETY-8,23,10,4);ctx.fill();
  ctx.fillStyle=skin;rr(x-7,top-14,14,23,4);ctx.fill();
  ctx.fillStyle=o.body;ctx.strokeStyle='#34413e';ctx.lineWidth=1.6;rr(x-25,top,50,76+fl*5,13);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#fff4db55';ctx.lineWidth=2;line(x-17,top+64,x+17,top+64);line(x-9,top+5,x+9,top+5);
  ctx.strokeStyle=o.body;ctx.lineWidth=10;line(x-f*18,top+17,x-f*28,top+61);
  ctx.fillStyle=skin;circ(x-f*28,top+64,5);ctx.fill();
  var hy=FEETY-150+(o.nod||0)*5+fl*3+(o.down?4:0)-(o.walk?Math.abs(Math.sin(G.time*8))*1.5:0),hx=x+(o.back?0:f*2);
  if(o.body===SANNA.body){ctx.fillStyle=o.hair;rr(hx-23,hy-17,45,45,18);ctx.fill();ctx.fillStyle=skin;rr(x-7,top-15,14,19,4);ctx.fill();}
  ctx.fillStyle=skin;ctx.strokeStyle='#34413e';ctx.lineWidth=1.8;circ(hx,hy,21);ctx.fill();ctx.stroke();
  circ(hx-f*20,hy+3,5);ctx.fill();ctx.stroke();
  ctx.fillStyle=o.hair;
  if(o.back){circ(hx,hy,22);ctx.fill();}
  else{
    ctx.beginPath();ctx.moveTo(hx-21,hy);ctx.bezierCurveTo(hx-30,hy-31,hx+11,hy-31,hx+22,hy-8);ctx.lineTo(hx+8,hy-13);ctx.quadraticCurveTo(hx+2,hy-2,hx-10,hy-7);ctx.lineTo(hx-16,hy+2);ctx.closePath();ctx.fill();
    if(o.body===MIKA.body){circ(hx-8,hy-21,7);ctx.fill();circ(hx+2,hy-22,8);ctx.fill();}
    var ey=hy+2+(o.down?4:0),ex=hx+f*5,er=2+fl*1.6+(o.face==='stiff'?1.2:0);
    ctx.fillStyle='#2b2733';
    if(o.down){ctx.lineWidth=2;line(ex-8,ey,ex-4,ey+1);line(ex+4,ey+1,ex+8,ey);}
    else if(!RM&&Math.sin(G.time*.8+x)>0.997){line(ex-8,ey,ex-4,ey);line(ex+4,ey,ex+8,ey);}
    else{circ(ex-6,ey,er);ctx.fill();circ(ex+6,ey,er);ctx.fill();}
    ctx.strokeStyle='#34413e';ctx.lineWidth=1.2;
    if(o.brow){ctx.strokeStyle='#34413e';ctx.lineWidth=2.2;line(ex+1,ey-8,ex+10,ey-14);line(ex-11,ey-8,ex-3,ey-8);}
    if(o.body===MIKA.body){circ(ex-7,ey,6);ctx.stroke();circ(ex+7,ey,6);ctx.stroke();line(ex-1,ey,ex+1,ey);}
    line(ex+1,ey+3,ex+3,ey+6);
    ctx.fillStyle='#c77f7055';circ(ex-13,ey+6,4);ctx.fill();circ(ex+13,ey+6,4);ctx.fill();
    ctx.lineWidth=2;ctx.lineCap='round';
    if(o.grin>0){
      // A smile that is working too hard: wider with every yes, teeth showing, corners trembling.
      var gw=Math.min(12,6+o.grin*1.6),gd=Math.min(9,5+o.grin),cy0=ey+8,tr=RM?0:Math.sin(G.time*30)*0.6*Math.min(1,o.grin/3);
      ctx.fillStyle='#fffdf6';ctx.strokeStyle='#34413e';ctx.lineWidth=1.6;
      ctx.beginPath();ctx.moveTo(ex-gw,cy0-1+tr);ctx.quadraticCurveTo(ex,cy0+gd*1.6,ex+gw,cy0-1-tr);ctx.quadraticCurveTo(ex,cy0+2,ex-gw,cy0-1+tr);ctx.closePath();ctx.fill();ctx.stroke();
      if(o.grin>=2){ctx.lineWidth=1.2;line(ex-gw-1,cy0-4,ex-gw-3,cy0+1);line(ex+gw+1,cy0-4,ex+gw+3,cy0+1);}
    }
    else if(o.face==='smile'){ctx.beginPath();ctx.arc(ex,ey+5,5,0.15*Math.PI,0.85*Math.PI);ctx.stroke();}
    else if(o.face==='stiff'){line(ex-6,ey+9,ex+6,ey+9);}
    else if(o.face==='frown'){ctx.beginPath();ctx.arc(ex,ey+14,6,1.15*Math.PI,1.85*Math.PI);ctx.stroke();line(ex-11,ey-9,ex-3,ey-6);line(ex+11,ey-9,ex+3,ey-6);}
    else line(ex-3,ey+9,ex+3,ey+9);
  }
  if(o.blush>0.05){
    // The face goes hot. Past ~0.8 the whole head glows like a bulb and lets off steam.
    var bl=o.blush;ctx.fillStyle='rgba(222,70,60,'+Math.min(0.62,bl*0.55)+')';circ(hx,hy,21);ctx.fill();
    if(bl>0.8&&!RM){ctx.strokeStyle='rgba(240,236,226,'+((bl-0.8)*4)+')';ctx.lineWidth=2;for(var st=-1;st<=1;st++){var sy0=hy-30-((G.time*30+st*9)%22);ctx.beginPath();ctx.moveTo(hx+st*10,sy0);ctx.quadraticCurveTo(hx+st*10+5,sy0-6,hx+st*10,sy0-12);ctx.stroke();}}
  }
  if(o.sweat>0.08){
    var nd=Math.ceil(o.sweat*4);ctx.fillStyle='#bfe3f2';ctx.strokeStyle='#5d8fa6';ctx.lineWidth=1.2;
    for(var di=0;di<nd;di++){var ph=((G.time*(0.7+di*0.13)+di*0.37)%1),dx=hx+(di%2?1:-1)*(12+di*3),dy=hy-12+ph*(28+o.sweat*40),ds=3+o.sweat*3;
      ctx.beginPath();ctx.moveTo(dx,dy-ds*1.6);ctx.quadraticCurveTo(dx+ds,dy,dx,dy+ds);ctx.quadraticCurveTo(dx-ds,dy,dx,dy-ds*1.6);ctx.fill();ctx.stroke();}
  }
  ctx.strokeStyle=o.body;ctx.lineWidth=9;ctx.lineCap='round';
  if(o.phone){o.cup=false;var pj=o.buzz>0&&!RM?Math.sin(G.time*70)*2.6*Math.min(1,o.buzz*2):0,phx=x+f*24+pj,phy=top+22;
    line(x+f*15,top+18,phx-f*3,phy+12);
    ctx.save();ctx.translate(phx,phy);ctx.rotate(f*0.18+pj*0.03);ctx.fillStyle='#14111d';rr(-7,-13,14,26,3);ctx.fill();ctx.fillStyle=o.buzz>0?'#dff3e4':'#9fb6c9';rr(-5,-10,10,19,1.5);ctx.fill();ctx.restore();
    if(o.buzz>0.15&&!RM){ctx.strokeStyle='rgba(20,17,29,.55)';ctx.lineWidth=2;ctx.lineCap='round';for(var bz=0;bz<2;bz++){var br=17+bz*6;ctx.beginPath();ctx.arc(phx,phy,br,-0.5,0.5);ctx.stroke();ctx.beginPath();ctx.arc(phx,phy,br,Math.PI-0.5,Math.PI+0.5);ctx.stroke();}}
    ctx.strokeStyle=o.body;ctx.lineWidth=9;ctx.lineCap='round';}
  if(o.cup){var cxp=x+f*22,cyp=top+40-(o.sip||0)*30+(o.shake?Math.sin(G.time*38)*1.5:0);
    line(x+f*15,top+18,cxp-f*3,cyp+4);
    ctx.fillStyle='#fffdf6';ctx.strokeStyle='#2b2733';ctx.lineWidth=1.5;rr(cxp-6,cyp-7,12,14,2);ctx.fill();ctx.stroke();}
  if(o.wave){ctx.strokeStyle=o.body;ctx.lineWidth=9;var wy=top-26+Math.sin(G.time*11)*4;line(x+f*17,top+14,x+f*30,wy);
    ctx.fillStyle='#f4ecdd';ctx.strokeStyle='#2b2733';ctx.lineWidth=1.5;circ(x+f*31,wy-5,6);ctx.fill();ctx.stroke();}
  ctx.restore();
}
var SANNA={body:'#62887f',hair:'#463b38'},MIKA={body:'#ac8277',hair:'#895e41'};
function drawHuman(extra){
  var Hm=G.human,o={body:'#c98f2e',hair:'#4a3b32',facing:Hm.facing||1,cup:!G.cupLeft&&!G.w&&!G.noCup,phone:!G.w&&!Hm.gone&&((G.phoneN||0)>0||WAIT==='fight'||!!(G.draft&&!G.draft.sent)),buzz:G.buzz||0,sip:Hm.sip||0,flinch:Hm.flinch,face:Hm.face,back:Hm.back,sweat:Hm.sweat,blush:Hm.blush,grin:Hm.grin,puddle:Hm.puddle};
  if(o.face==='down')o.down=true;
  if(!G.w&&Math.abs(Hm.x-Hm.xT)>1){o.walk=true;if(!Hm.back)o.facing=Hm.xT>Hm.x?1:-1;}   // nobody walks backwards
  var wk=G.morko.wake;if(wk!=null&&wk<0.98)o.shadow=wk;          // the floor shadow IS Ekskyysmi: never two
  if(extra)for(var k in extra)o[k]=extra[k];
  if(Hm.pose==='floor'){   // sitting on the floor, legs out
    var f=o.facing||1;o.walk=false;o.cup=false;o.shadow=0;
    ctx.fillStyle='rgba(20,16,30,.2)';ctx.beginPath();ctx.ellipse(Hm.x+f*22,FEETY+3,58,8,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#3a3944';rr(f>0?Hm.x-4:Hm.x-62,FEETY-13,66,13,5);ctx.fill();ctx.fillStyle='#263639';rr(f>0?Hm.x+56:Hm.x-72,FEETY-20,14,20,4);ctx.fill();
    ctx.save();ctx.beginPath();ctx.rect(-40,-40,W+80,FEETY-6+40);ctx.clip();ctx.translate(0,46);person(Hm.x,o);ctx.restore();
    return;
  }
  person(Hm.x,o);
}
function drawCoworkers(alpha){
  var g=G;
  var lf=g.lensView?'frown':undefined;
  if(g.cowA)person(g.ax,{body:SANNA.body,hair:SANNA.hair,facing:Math.abs(g.ax-g.axT)>1?(g.axT>g.ax?1:-1):g.aFace,face:lf,wave:g.aWave,alpha:alpha,walk:Math.abs(g.ax-g.axT)>1,sweat:g.aSweat});
  if(g.cowB)person(g.bx2,{body:MIKA.body,hair:MIKA.hair,facing:Math.abs(g.bx2-g.bxT)>1?(g.bxT>g.bx2?1:-1):g.bFace,face:lf,alpha:alpha,cup:Math.abs(g.bx2-g.bxT)<1&&g.bxT<1000,walk:Math.abs(g.bx2-g.bxT)>1});
  if(g.cowR)person(g.rx,{body:RIITTA.body,hair:RIITTA.hair,facing:-1,alpha:alpha,brow:g.rBrow});
}

/* ================= drawing: the shadow ================= */
function geom(){
  var M=G.morko,s=M.s,j=M.coat?0:(RM?0.3:1)*clamp(((G.anx||0)-0.3)/0.6,0,1);
  var bx=G.human.x+M.off+Math.sin(G.time*47)*1.7*j,by=WALLY;
  var baseX=bx,lean=M.wobble?(RM?8:Math.sin(M.wobble.t*4.2)*16*(1-M.wobble.t/3.2)):0;bx+=lean;
  var hgt=190*s*(RM||M.coat?1:1+0.012*Math.sin(G.time*1.7)),shW=58*s,hdR=20*Math.pow(s,0.45);
  var shY=by-hgt*0.7+Math.sin(G.time*31)*1.3*j,hdY=shY-11*s-hdR*0.8;
  if(hdY<hdR+34)hdY=hdR+34;if(shY<hdY+hdR*0.7)shY=hdY+hdR*0.7;
  return{bx:bx,baseX:baseX,lean:lean,by:by,shY:shY,shW:shW,hdY:hdY,hdR:hdR,s:s};
}
function handTargets(q){
  var M=G.morko,Hm=G.human,hy=FEETY-150;
  var L={x:q.bx-q.shW*0.9,y:q.shY},R={x:q.bx+q.shW*0.9,y:q.shY},a,b,front=false;
  var pose=M.st==='frozen'?'grow':M.st==='hide'?'hold':M.st==='pokka'?null:M.pose;
  if(stampToolVisible())pose='stamp';
  switch(pose){
    case 'stamp':a={x:L.x-8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};b=stampHand(q);front=true;break;
    case 'grow':a={x:L.x-q.shW*0.9,y:q.shY-34*q.s};b={x:R.x+q.shW*0.9,y:q.shY-34*q.s};break;
    case 'cover':a={x:Hm.x-7,y:hy+2};b={x:Hm.x+11,y:hy+2};front=true;break;
    case 'pull':a={x:Hm.x+24,y:FEETY-96};b={x:Hm.x+22,y:FEETY-72};front=true;break;
    case 'hold':a={x:Hm.x-24,y:FEETY-112};b={x:Hm.x+24,y:FEETY-112};front=true;break;
    case 'comfort':a={x:L.x-6,y:q.shY+85*q.s};b={x:Hm.x+25,y:FEETY-106};front=true;break;
    case 'lens':if(G.lens){var lh=lensHandle();a={x:L.x-8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};b={x:lh.x2,y:lh.y2};front=true;break;}a={x:L.x,y:q.shY+60};b={x:R.x,y:q.shY+60};break;
    case 'swat':if(G.fight&&G.fight.swat){a={x:L.x-8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};b={x:G.fight.swat.x,y:G.fight.swat.y};front=true;break;}a={x:L.x,y:q.shY+60};b={x:R.x,y:q.shY+60};break;
    case 'drink':a={x:L.x-q.shW*0.45,y:q.shY+62*q.s};b={x:R.x+8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};break;
    case 'sip':a={x:q.bx-q.hdR*0.75,y:q.hdY+q.hdR*1.5};b={x:R.x+8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};break;
    case 'toast':a={x:L.x-q.shW*0.8,y:q.shY-34*q.s};b={x:R.x+8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};break;
    case 'shelter':var uk=Math.max(0.8,Math.sqrt(q.s));a={x:L.x-q.shW*0.45,y:q.shY+62*q.s};b={x:q.bx+28*uk,y:q.hdY-q.hdR-4*uk};break;
    case 'coat':a={x:q.bx-32*q.s,y:q.by-28*q.s};b={x:q.bx+32*q.s,y:q.by-28*q.s};break;
    case 'puppet':a={x:R.x+74*q.s,y:q.shY-64*q.s};b={x:R.x+92*q.s,y:q.shY-56*q.s};break;   // up in the light, over the human’s head
    case 'balance':a={x:L.x-q.shW*0.45,y:q.shY+22*q.s+q.lean};b={x:R.x+q.shW*0.45,y:q.shY+22*q.s-q.lean};break;
    case 'selfmouth':a={x:q.bx-q.hdR*0.3,y:q.hdY+q.hdR*0.45};b={x:q.bx+q.hdR*0.3,y:q.hdY+q.hdR*0.5};break;
    case 'selfeyes':a={x:q.bx-q.hdR*0.42,y:q.hdY-q.hdR*0.05};b={x:q.bx+q.hdR*0.42,y:q.hdY-q.hdR*0.05};break;
    default:a={x:L.x-8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};b={x:R.x+8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};
  }
  return{a:a,b:b,front:front,L:L,R:R};
}
function mcol(){return G.w||G.set==='home'||G.set==='bar'?'#0d0f18':G.dark>0.5?'#14111d':'#28243a';}
function morkoBody(q){
  var Hm=G.human,wk=G.morko.wake==null?1:G.morko.wake,al=wk;
  if(wk<0.98){ctx.fillStyle='rgba(20,16,30,'+(0.26*(1-wk))+')';ctx.beginPath();ctx.ellipse(Hm.x-12,FEETY+3,44,9,0,0,Math.PI*2);ctx.fill();}
  if(wk<0.02)return;
  ctx.fillStyle=mcol();
  ctx.globalAlpha=0.55*al;ctx.beginPath();ctx.moveTo(Hm.x-22,FEETY);ctx.lineTo(Hm.x+22,FEETY);ctx.lineTo(q.baseX+26*q.s,q.by);ctx.lineTo(q.baseX-26*q.s,q.by);ctx.closePath();ctx.fill();ctx.globalAlpha=al;
  ctx.beginPath();ctx.moveTo(q.baseX-26*q.s,q.by);ctx.lineTo(q.baseX+26*q.s,q.by);ctx.lineTo(q.bx+q.shW*0.8,q.shY+6);ctx.lineTo(q.bx-q.shW*0.8,q.shY+6);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.ellipse(q.bx,q.shY+4,q.shW,Math.max(14,26*q.s),0,0,Math.PI*2);ctx.fill();
  circ(q.bx,q.hdY,q.hdR);ctx.fill();ctx.globalAlpha=1;
  if(wk>0.4)morkoFace(q);
  if(G.ninja)drawHeadband(q);
}
function morkoArms(q,ht){
  var M=G.morko,lw=11*Math.sqrt(q.s),sh=[ht.L,ht.R];
  ctx.strokeStyle=mcol();ctx.fillStyle=mcol();ctx.lineWidth=lw;ctx.lineCap='round';
  for(var i=0;i<2;i++){var h=M.h[i],s0=sh[i];
    ctx.beginPath();ctx.moveTo(s0.x,s0.y);ctx.quadraticCurveTo((s0.x+h.x)/2+(i?14:-14)*q.s,(s0.y+h.y)/2+10*q.s,h.x,h.y);ctx.stroke();
    circ(h.x,h.y,lw*0.78);ctx.fill();}
  if(M.pose==='puppet')puppetBird((M.h[0].x+M.h[1].x)/2,(M.h[0].y+M.h[1].y)/2,q.s);
}
// What a shadow does when there is nothing to prevent: a bird, made of two hands.
function puppetBird(x,y,s){
  var f=RM?0.35:Math.sin(G.time*5.2),k=Math.max(0.8,Math.sqrt(s)),w=40*k,lift=(13+15*f)*k;
  ctx.fillStyle=mcol();
  ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x-w*0.5,y-lift*1.6,x-w,y-lift);ctx.quadraticCurveTo(x-w*0.45,y-2*k,x,y+6*k);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+w*0.5,y-lift*1.6,x+w,y-lift);ctx.quadraticCurveTo(x+w*0.45,y-2*k,x,y+6*k);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(x-3*k,y-2*k);ctx.lineTo(x,y-11*k);ctx.lineTo(x+3*k,y-2*k);ctx.closePath();ctx.fill();
}
function morkoFace(q){
  if(G.morko.coat){drawCoatFace(q);return;}
  var M=G.morko,r=q.hdR,cx=q.bx,cy=q.hdY,ex=r*0.42;
  var m=M.st==='frozen'||M.st==='hide'?'scared':M.st==='pokka'?'pokka':M.mood,look=m==='pokka'?-1:1;
  // A look lasts exactly one line: {look:'squint'} on the line, and the face goes back to whatever it was.
  var lk=M.st==='free'&&G.cur&&G.cur.who==='S'&&G.cur.look;if(lk)m=lk;
  var er=r*0.2,pr=0.45,brow=null,i,py=0;
  if(m==='stunned'){er=r*0.36;pr=0.13;}
  else if(m==='soft'){er=r*0.23;pr=0.66;brow='out';py=0.18;}
  else if(m==='up'){er=r*0.25;pr=0.4;brow='out';py=-0.5;look=0;}
  if(m==='calm'){er=r*0.15;pr=0.5;}
  else if(m==='alert'){er=r*0.25;pr=0.4;}
  else if(m==='scared'||m==='surprised'){er=r*0.34;pr=0.24;brow='up';}
  else if(m==='stern'){er=r*0.21;brow='in';}
  else if(m==='care'||m==='worry'){er=r*0.21;brow='out';}
  ctx.lineCap='round';
  for(i=-1;i<=1;i+=2){
    var x=cx+i*ex,y=cy-r*0.05;
    if(m==='pokka'){
      ctx.fillStyle='#f6f1e4';ctx.beginPath();ctx.arc(x,y,r*0.2,0,Math.PI);ctx.closePath();ctx.fill();
      ctx.fillStyle='#14111d';circ(x+look*r*0.09,y+r*0.08,r*0.07);ctx.fill();
    }else if(m==='squint'){   // two slits and one brow that has made up its mind
      ctx.fillStyle='#f6f1e4';ctx.beginPath();ctx.ellipse(x,y,r*0.25,r*0.085,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#14111d';circ(x+r*0.1,y,r*0.07);ctx.fill();
      ctx.strokeStyle='#f6f1e4';ctx.lineWidth=Math.max(2,r*0.09);
      if(i<0)line(x-r*0.26,y-r*0.3,x+r*0.24,y-r*0.17);else line(x-r*0.24,y-r*0.36,x+r*0.26,y-r*0.4);
    }else if(m==='pleased'){  // eyes shut in two small arches: entirely satisfied with itself
      ctx.strokeStyle='#f6f1e4';ctx.lineWidth=Math.max(2.5,r*0.12);ctx.beginPath();ctx.arc(x,y+r*0.12,r*0.2,Math.PI*1.12,Math.PI*1.88);ctx.stroke();
    }else if(lk&&(m==='stunned'||m==='soft'||m==='up')){
      var jx=m==='stunned'&&!RM?Math.sin(G.time*43+i)*r*0.02:0;
      ctx.fillStyle='#f6f1e4';circ(x+jx,y,er);ctx.fill();
      ctx.fillStyle='#14111d';circ(x+jx+look*er*0.3,y+er*py,er*pr);ctx.fill();
      if(m==='soft'){ctx.fillStyle='#f6f1e4';circ(x+look*er*0.3-er*0.2,y+er*py-er*0.22,er*0.16);ctx.fill();}
    }else{
      if(!RM&&brow!=='up'&&G.time%4.7<0.12){ctx.strokeStyle='#f6f1e4';ctx.lineWidth=Math.max(2,r*0.09);line(x-er,y,x+er,y);}
      else{ctx.fillStyle='#f6f1e4';circ(x,y,er);ctx.fill();
      ctx.fillStyle='#14111d';circ(x+look*er*0.4,y,er*pr);ctx.fill();}
    }
    ctx.strokeStyle='#f6f1e4';ctx.lineWidth=Math.max(2,r*0.09);
    if(brow==='up')line(x-er,y-er-r*0.2,x+er,y-er-r*0.2);
    else if(brow==='in')line(x-i*er*1.1,y-er-r*0.22,x+i*er*0.2,y-er-r*0.02);
    else if(brow==='out')line(x-i*er*1.0,y-er-r*0.22,x+i*er*1.0,y-er-r*0.08);
  }
  if(m==='pokka'){ctx.strokeStyle='#f6f1e4';ctx.lineWidth=Math.max(1.5,r*0.07);circ(cx-r*0.1,cy+r*0.5,r*0.09);ctx.stroke();}
}
function drawCoatFace(q){
  var c=G.morko.coat,p=c.p*c.p*(3-2*c.p),r=q.hdR,blink=c.blink;
  // The head is now a hood. The same two eyes slide down into a completely unconvincing button row.
  ctx.save();ctx.lineCap='round';ctx.strokeStyle='rgba(246,241,228,.22)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(q.bx-19*q.s,q.shY+10*q.s);ctx.lineTo(q.bx,q.shY+33*q.s);ctx.lineTo(q.bx+19*q.s,q.shY+10*q.s);ctx.stroke();
  for(var i=0;i<2;i++){
    var x=q.bx+(i?1:-1)*r*0.42*(1-p),y=(q.hdY-r*0.05)*(1-p)+(q.shY+(48+i*27)*q.s)*p;
    var er=r*(0.21+0.06*p),closed=blink>=0&&blink<0.24;
    ctx.fillStyle='#f6f1e4';ctx.strokeStyle='#f6f1e4';ctx.lineWidth=2;
    if(closed){line(x-er,y,x+er,y);}
    else{circ(x,y,er);ctx.fill();ctx.fillStyle='#14111d';circ(x+er*0.35,y,er*0.42);ctx.fill();}
  }
  ctx.restore();
}
function drawPair(humanOpts){
  var q=geom(),ht=handTargets(q);
  var up=G.morko.wake==null||G.morko.wake>0.5;
  morkoBody(q);if(up&&!ht.front)morkoArms(q,ht);
  if(up)shadowDrink(q);
  drawHuman(humanOpts);
  if(up&&ht.front)morkoArms(q,ht);
  if(up)drawStamp();
}

/* ================= drawing: speech ================= */
function drawLines(){
  var g=G,i,l,cur=g.cur&&g.cur.who;
  for(var pass=0;pass<2;pass++)for(i=0;i<g.lines.length;i++){
    l=g.lines[i];var isCur=l.who===cur;if((pass===1)!==isCur||!isCur)continue;
    if(l.big&&l.who==='S'){bigBubble(l.text,RM?1e9:Math.floor(g.curT*55));continue;}   // drawn on every screen: it is a prop, not a caption
    if(!WIDE)continue; // on a narrow screen the panel below the scene carries the text
    if((l.who==='S'||l.who==='H')&&g.human.gone)continue;
    var n=l.text.length,mw=n>90?330:n>50?290:0,rv=Math.floor(g.curT*55);
    ctx.save();
    if(l.who==='S'&&g.morko.asleep)continue;
    if(l.who==='S'){var q=geom(),above=q.hdY-q.hdR-14,sw=mw||260,bh=bubbleH(l.text,sw,l);
      if(above-12>=bh+8)bubble(q.bx-70,above+12,l.text,{dark:true,noTail:true,maxW:sw,reveal:rv,loud:l.loud,quiet:l.quiet});
      else bubble(q.bx-70,0,l.text,{dark:true,noTail:true,maxW:sw,reveal:rv,loud:l.loud,quiet:l.quiet,top:Math.min(q.hdY+q.hdR+14,WALLY-bh-70)});}
    else if(l.who==='H')bubble(g.human.x+60,FEETY-172,l.text,{maxW:mw||230,reveal:rv});
    else if(l.who==='A')bubble(g.ax,FEETY-172,l.text,{maxW:mw,reveal:rv});
    else if(l.who==='B')bubble(g.bx2,FEETY-172,l.text,{maxW:mw,reveal:rv});
    else if(l.who==='P')bubble(g.w||!g.human.gone?g.human.x+210:170,g.w?330:340,l.text,{noTail:true,maxW:mw,reveal:rv});
    else if(l.who==='R')bubble(g.rx,FEETY-172,l.text,{maxW:mw,reveal:rv});
    else if(l.who==='T'&&g.bar)bubble(g.bar.tx-196,0,l.text,{noTail:true,maxW:mw||240,reveal:rv,top:BARY+26});
    else if(l.who==='X'&&g.bar)bubble(g.bar.sx,FEETY-172,l.text,{maxW:mw,reveal:rv});
    else if(l.who==='L')bubble(760,FEETY-172,l.text,{maxW:mw,reveal:rv});
    else if(l.who==='Z')bubble(g.ax+62,WALLY-178,l.text,{dark:true,noTail:true,reveal:rv});
    else if(l.who==='Y')bubble(g.yx,WALLY-200,l.text,{dark:true,noTail:true,maxW:mw||250,reveal:rv});
    else if(l.who==='W')bubble(g.rx+92,WALLY-246,l.text,{dark:true,noTail:true,maxW:mw||230,reveal:rv});
    ctx.restore();
  }
}

/* ================= drawing: scenes ================= */
function drawOutside(){
  var g=G,o=g.out,t=o.t,an=o.anim;
  if(an==='chatlog'){drawChatlog(o);return;}
  if(an==='text'){
    ctx.fillStyle='#141a1c';ctx.fillRect(0,0,W,H);ctx.fillStyle='#0f0d14';ctx.fillRect(0,0,W,56);
    ctx.fillStyle='#f1ebdd';ctx.textBaseline='middle';ctx.textAlign='left';ctx.font='700 18px system-ui,sans-serif';ctx.fillText(o.title,28,29);
    ctx.textAlign='right';ctx.font='500 16px system-ui,sans-serif';ctx.fillStyle='#b9b2a6';ctx.fillText(o.dur,W-28,29);
    ctx.globalAlpha=clamp((t-0.5)/0.6,0,1);ctx.textAlign='center';ctx.fillStyle='#f1ebdd';ctx.font='500 30px Fraunces,Georgia,serif';
    var ls=wrap(o.cap,720);for(var li=0;li<ls.length;li++)ctx.fillText(ls[li],W/2,H/2+10-(ls.length-1)*20+li*40);ctx.globalAlpha=1;return;
  }
  backdrop(true);
  var hx=g.human.xT<0?HOME:g.human.x,h={body:'#c98f2e',hair:'#4a3b32',facing:1,cup:true,face:'neutral'};
  var aFace=1,aWave=false,show=true;
  if(an==='tape'){hx=HOME;h.nod=(t>0.8&&t<1.6)?Math.sin((t-0.8)/0.8*Math.PI):0;aFace=t<1.4?-1:1;}
  else if(an==='none'){h.nod=(t>0.5&&t<1.3)?Math.sin((t-0.5)/0.8*Math.PI):0;h.sip=t>2.2&&t<3.6?Math.sin((t-2.2)/1.4*Math.PI):0;}
  else if(an==='bite'){h.face=t<1.6?'stiff':'neutral';}
  else if(an==='nod'){h.nod=(t>0.5&&t<1.3)?Math.sin((t-0.5)/0.8*Math.PI):(t>1.6&&t<2.4)?Math.sin((t-1.6)/0.8*Math.PI):0;}
  else if(an==='grow'){h.face='stiff';h.flinch=t<1.9?0.8:0.25;h.shake=t<2.8;}
  else if(an==='cover'){h.face='down';h.down=true;if(g.day!=='C'&&t>1&&t<2.8){aFace=-1;aWave=true;}}
  else if(an==='exit'){hx=300-t*110;h.back=true;h.cup=false;h.walk=true;show=hx>-40;if(t>2.6)aFace=-1;}
  if(an==='tape'&&t>0.4&&t<1.4)bubble(700,FEETY-172,'oh, hi.');
  if(an==='exit'){ctx.fillStyle='#fffdf6';ctx.strokeStyle='#2b2733';ctx.lineWidth=1.5;rr(650,406,12,14,2);ctx.fill();ctx.stroke();}
  if(show)person(hx,h);
  if(an==='tape'){person(700,{body:SANNA.body,hair:SANNA.hair,facing:aFace});person(800,{body:MIKA.body,hair:MIKA.hair,facing:1,cup:true});}
  else if(g.cowA)person(g.ax,{body:SANNA.body,hair:SANNA.hair,facing:aFace,wave:aWave});
  if(an!=='tape'&&g.cowB)person(g.bx2,{body:MIKA.body,hair:MIKA.hair,facing:an==='nod'||an==='bite'?-1:g.bFace,cup:true,face:an==='bite'&&t>1.5?(t<2.4?'stiff':'smile'):'neutral',flinch:an==='bite'&&t>1.2&&t<2?0.5:0});
  if(an==='bite'&&t>0.3&&t<1.5)bubble(hx+40,FEETY-172,'Maybe YOUR comfort zone could use a walk.',{maxW:200});
  if(an==='bite'&&t>2.4&&t<3.8)bubble(g.bx2,FEETY-172,'…ha.');
  if(an==='none'&&t>0.6&&t<1.9)bubble(hx,FEETY-172,'hi');
  if(an==='grow'&&t>1.9&&t<3.3)bubble(hx,FEETY-172,'HI.');
  ctx.fillStyle='#0f0d14';ctx.fillRect(0,0,W,56);ctx.fillRect(0,H-64,W,64);
  ctx.fillStyle='#f1ebdd';ctx.textBaseline='middle';ctx.textAlign='left';ctx.font='700 18px system-ui,sans-serif';ctx.fillText(o.title,28,29);
  ctx.textAlign='right';ctx.font='500 16px system-ui,sans-serif';ctx.fillStyle='#b9b2a6';ctx.fillText(o.dur,W-28,29);
  if(t>2.2){ctx.textAlign='center';ctx.fillStyle='#f1ebdd';ctx.font='500 20px system-ui,sans-serif';ctx.fillText(o.cap,W/2,H-32);}
}
function drawWalk(){
  var g=G,w=g.w,cam=w.x-400,i,sx;
  ctx.fillStyle='#12152a';ctx.fillRect(-20,-20,W+40,140);
  ctx.fillStyle='#f6f1e4';for(i=0;i<14;i++){var stx=((i*173-cam*0.05)%1000+1000)%1000-20;circ(stx,14+(i*37)%90,1.2);ctx.fill();}
  ctx.fillStyle='#3d4460';ctx.fillRect(-20,120,W+40,WALLY-120);
  ctx.fillStyle='#343a52';for(i=0;i<9;i++){sx=((i*130-cam)%1170+1170)%1170-105;ctx.fillRect(sx,120,4,WALLY-120);}
  ctx.fillStyle='#2a2e40';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);
  ctx.fillStyle='#232636';ctx.fillRect(-20,WALLY-5,W+40,5);
  drawCars(cam);
  var hx=HOMEX+60-cam;
  if(hx<W+200){ctx.fillStyle='#57405a';ctx.fillRect(hx-130,90,360,WALLY-90);
    ctx.fillStyle='#f3d27a';rr(hx+110,200,70,70,4);ctx.fill();
    ctx.fillStyle='#7a4f3c';rr(hx-34,WALLY-158,72,158,6);ctx.fill();ctx.fillStyle='#e2b04a';circ(hx+26,WALLY-78,4);ctx.fill();}
  for(i=0;i<LAMPS.length;i++){
    sx=LAMPS[i]-cam;if(sx<-320||sx>W+320)continue;
    var home=i===LAMPS.length-1,ly=home?190:150,lx=home?sx:sx+26;
    var gr=ctx.createRadialGradient(lx,ly+60,8,lx,ly+60,300);gr.addColorStop(0,'rgba(255,221,140,.5)');gr.addColorStop(1,'rgba(255,221,140,0)');
    ctx.save();ctx.beginPath();ctx.rect(-20,120,W+40,H);ctx.clip();ctx.fillStyle=gr;ctx.fillRect(lx-300,ly-240,600,600);ctx.restore();
    if(!home){ctx.strokeStyle='#1b1d2a';ctx.lineWidth=6;ctx.lineCap='round';line(sx,WALLY,sx,150);line(sx,150,sx+26,150);}
    ctx.fillStyle='#ffe9a8';circ(lx,ly+4,home?7:9);ctx.fill();
  }
  drawPair({walk:g.walking});
  drawTics(cam);
}
function hhmm(s){var h=Math.floor(s/3600)%24,m=Math.floor(s/60)%60;return (h<10?'0':'')+h+':'+(m<10?'0':'')+m;}
var JOB_OLD='Keep you from being rejected.',JOB_NEW='Stay with you when it happens.';
function jobRewrite(x,y,w){
  // Strike the old job out, then hand-write the new one underneath. Pure canvas, no layout change.
  var t=G.job.t,k=clamp(t/0.9,0,1);
  ctx.strokeStyle='#e2b04a';ctx.lineWidth=2;line(x-2,y,x-2+(w+4)*k,y);
  if(t>1.1){
    var n=Math.min(JOB_NEW.length,Math.floor((t-1.1)*24)),txt=JOB_NEW.slice(0,n);
    ctx.font='600 15px Fraunces,Georgia,serif';ctx.textAlign='right';ctx.fillStyle='#e2b04a';
    ctx.fillText(txt+(n<JOB_NEW.length?'▏':''),x+w,y+22);ctx.textAlign='left';
  }
}
function jobCard(){
  // The turn, shown large for a moment before it settles into the corner.
  var t=G.job.t,a=clamp(t/0.4,0,1)*clamp((4.6-t)/0.6,0,1);if(a<=0)return;
  var cx=W/2,cy=150,w=520,h=150;
  ctx.save();ctx.globalAlpha=a;
  ctx.fillStyle='rgba(18,24,28,.9)';rr(cx-w/2,cy-h/2,w,h,14);ctx.fill();
  ctx.strokeStyle='#e2b04a55';ctx.lineWidth=1.5;rr(cx-w/2,cy-h/2,w,h,14);ctx.stroke();
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='700 12px system-ui,sans-serif';ctx.fillStyle='#e2b04a';ctx.fillText('EKSKYYSMI’S JOB DESCRIPTION',cx,cy-48);
  ctx.font='500 22px system-ui,sans-serif';ctx.fillStyle='#f1ebdd';var ow=ctx.measureText(JOB_OLD).width;ctx.fillText(JOB_OLD,cx,cy-12);
  var k=clamp(t/0.9,0,1);ctx.strokeStyle='#e2b04a';ctx.lineWidth=3;line(cx-ow/2-4,cy-11,cx-ow/2-4+(ow+8)*k,cy-11);
  if(t>1.1){var n=Math.min(JOB_NEW.length,Math.floor((t-1.1)*20));
    ctx.font='600 26px Fraunces,Georgia,serif';ctx.fillStyle='#e2b04a';ctx.fillText(JOB_NEW.slice(0,n)+(n<JOB_NEW.length?'▏':''),cx,cy+32);}
  ctx.restore();
}
function hud(){
  var g=G,y=26,rows=g.w?[]:[['A SMALL PLAN',g.planText||'Ask Sanna to lunch.']];
  if(g.chapter===3&&g.yes&&!g.moment)rows.push(['THINGS AGREED TO',String(g.yes)]);
  rows.unshift(['EKSKYYSMI’S JOB',g.jobDone?JOB_NEW:JOB_OLD,g.jobDone?'':'job']);
  var show=1;if(COMPACT){show=(g.job&&g.job.t<7)||g.pop?1:clamp(7-(g.hudAge||0),0,1);if(show<=0)return;}
  ctx.save();ctx.globalAlpha=show;if(COMPACT){ctx.translate(W-14,14);ctx.scale(1.3,1.3);ctx.translate(-(W-14),-14);}
  ctx.textAlign='left';ctx.textBaseline='middle';
  for(var i=0;i<rows.length;i++){
    ctx.font='700 11px system-ui,sans-serif';var w1=ctx.measureText(rows[i][0]).width;
    ctx.font='500 13px system-ui,sans-serif';var w2=ctx.measureText(rows[i][1]).width;
    var x=W-14-(w1+w2+30);
    ctx.fillStyle='rgba(22,19,30,.72)';rr(x,y-11,w1+w2+30,22,11);ctx.fill();
    ctx.font='700 11px system-ui,sans-serif';ctx.fillStyle='#e2b04a';ctx.fillText(rows[i][0],x+10,y);
    ctx.font='500 13px system-ui,sans-serif';
    ctx.fillStyle='#f1ebdd';ctx.fillText(rows[i][1],x+18+w1,y);
    if(rows[i][2]==='job'&&g.job)jobRewrite(x+18+w1,y,w2);
    y+=rows[i][2]==='job'&&g.job?50:26;
  }
  if(g.pop){ctx.globalAlpha=clamp(2.6-g.pop.t,0,1);ctx.textAlign='right';ctx.font='700 14px system-ui,sans-serif';ctx.fillStyle='#e2b04a';ctx.fillText(g.pop.text,W-20,y+4-Math.min(8,g.pop.t*10));ctx.globalAlpha=1;}
  ctx.restore();
}
function pausedNote(){
  var g=G,a=g.awayNote;
  ctx.fillStyle='rgba(13,17,20,.76)';ctx.fillRect(0,0,W,H);
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#f1ebdd';ctx.font='650 34px Fraunces,Georgia,serif';ctx.fillText(a?a[0]:'Paused',W/2,H/2-48);
  ctx.font='500 17px system-ui,sans-serif';ctx.fillStyle='#ebbd79';ctx.fillText(a?a[1]:'Take your time. I’ll just be here, thinking about it.',W/2,H/2-8);
  ctx.fillStyle='#bfcfbd';ctx.fillText('Tap the scene to carry on.',W/2,H/2+30);
}
function draw(){
  var g=G;
  ctx.setTransform(SC,0,0,SC,0,0);
  ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  if(g.chap){chapCard();return;}
  if(g.out){drawOutside();return;}
  if(g.rep){drawReplay();return;}
  if(g.zoom){drawZoom();return;}
  if(g.jolt&&joltPhase()){drawXray();return;}
  ctx.save();applyCamera();
  if(g.w){drawWalk();drawLines();}
  else{
    backdrop(false);
    if(g.dark>0.01){ctx.fillStyle='rgba(18,14,30,'+(0.45*g.dark)+')';ctx.fillRect(-20,-20,W+40,H+40);}
    if(g.gaze>0.01&&!g.human.gone){
      ctx.fillStyle='rgba(255,246,200,'+(0.34*g.gaze)+')';ctx.beginPath();
      if(g.gazeFrom==='after'){var px=g.human.x;ctx.moveTo(px-24,-30);ctx.lineTo(px+24,-30);ctx.lineTo(px+86,FEETY+4);ctx.lineTo(px-86,FEETY+4);ctx.closePath();ctx.fill();
        ctx.beginPath();ctx.ellipse(px,FEETY+4,86,13,0,0,Math.PI*2);ctx.fill();}
      else{var gx=g.gazeFrom==='B'?g.bx2:g.gazeFrom==='R'?g.rx:g.ax;ctx.moveTo(gx-14,FEETY-150);ctx.lineTo(g.human.x+16,FEETY-176);ctx.lineTo(g.human.x+16,FEETY);ctx.closePath();ctx.fill();}
    }
    if(!g.human.gone)drawPair();
    drawFight();
    drawDish();
    drawTics(0);
    if(WAIT==='hold'&&g.hold&&!g.human.gone)holdRing();
    drawToss();drawForm();
    sannaShadow();eeroShadow();riittaShadow();
    drawCoworkers(1);
    if(g.set==='bar'&&g.bar)barFront();
    drawLens();
    drawLines();
    drawQte();
  }
  ctx.restore();
  if(g.flash>0.01&&!RM){ctx.fillStyle='rgba(255,250,235,'+(0.22*g.flash)+')';ctx.fillRect(0,0,W,H);}
  if(g.pulse>0.02){
    var beat=RM?0.6:0.35+0.65*Math.pow(Math.max(0,Math.sin(g.time*9.4)),6),vg=ctx.createRadialGradient(W/2,H/2,H*0.3,W/2,H/2,H*0.8);
    vg.addColorStop(0,'rgba(128,26,34,0)');vg.addColorStop(1,'rgba(128,26,34,'+(0.55*g.pulse*beat)+')');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
  }
  ctx.textBaseline='middle';
  if(g.bigNote)bigNote();
  if(g.cards.length)drawCards();
  if(g.fade>0.01){ctx.fillStyle='rgba(10,12,16,'+g.fade+')';ctx.fillRect(0,0,W,H);}
  if(g.draft)drawDraft();
  if(g.boss)drawBoss();
  if(g.rec)drawRec();
  if(g.hud&&g.started&&!g.qte)hud(); // the window has the screen for its second
  if(g.job&&!g.ended)jobCard();
  if(g.w){
        if(g.card>0){ctx.textAlign='center';ctx.fillStyle='#f1ebdd';ctx.font='700 30px system-ui,sans-serif';ctx.fillText('THE WALK HOME',W/2,74);
      ctx.font='500 17px system-ui,sans-serif';ctx.fillStyle='#b9b2a6';ctx.fillText('Nine minutes, usually.',W/2,106);}
  }
  if(g.band)band(g.band,H-18);
  if(paused)pausedNote();
}

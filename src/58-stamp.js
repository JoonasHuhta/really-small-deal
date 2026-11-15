/* ================= paperwork: a declaration, not a verdict from the game ================= */
// Monday: a stamp on the human. Friday: the same tool, held above them, then put away.
function startStamp(mode){
  var h=G.morko.h[1];G.stamp={mode:mode,t:0,ink:false,retiring:false,from:{x:h.x,y:h.y}};
}
function stampHover(){startStamp('hover');}
function stampPutAway(){
  var s=G.stamp;if(!s)return;
  var h=G.morko.h[1];s.retiring=true;s.t=0;s.from={x:h.x,y:h.y};
}
function stampToolVisible(){var s=G.stamp;return !!s&&(s.mode==='hover'||s.t<1.35);}
function stampHand(q){
  var s=G.stamp,x=G.human.x,y=FEETY-118;
  var raised={x:x-62,y:y-62},down={x:x,y:y},home={x:q.bx+q.shW*0.9+8*q.s,y:Math.min(WALLY-8,q.shY+95*q.s)};
  function between(a,b,p){p=clamp(p,0,1);p=p*p*(3-2*p);return {x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p};}
  if(s.retiring)return RM?home:between(s.from,home,s.t/0.55);
  if(s.mode==='hover')return RM?raised:between(s.from,raised,s.t/0.35);
  if(RM)return s.t<0.55?raised:s.t<0.75?down:home;
  if(s.t<0.35)return between(s.from,raised,s.t/0.35);
  if(s.t<0.55)return between(raised,down,(s.t-0.35)/0.2);
  if(s.t<0.75)return down;
  return between(down,home,(s.t-0.75)/0.6);
}
function stepStamp(dt){
  var s=G.stamp;if(!s)return;s.t+=dt;
  if(s.retiring){if(s.t>=0.55)G.stamp=null;return;}
  if(s.mode==='press'){
    if(!s.ink&&s.t>=0.55){s.ink=true;sfx('stamp');}
    if(s.t>=3.8)G.stamp=null;
  }
}
function drawStamp(){
  var s=G.stamp;if(!s)return;
  if(s.ink){
    var age=s.t-0.55,scale=RM?1:1+0.08*clamp(1-age/0.16,0,1);
    // Low enough that the face still shows under it: the joke is the face, not the paperwork.
    ctx.save();ctx.translate(G.human.x+6,FEETY-74);ctx.rotate(-0.1);ctx.scale(scale,scale);
    ctx.globalAlpha=clamp((3.8-s.t)/0.7,0,1);
    // Oversized, slightly crooked office ink. It never appears in the outside view.
    ctx.fillStyle='rgba(246,241,228,.84)';rr(-91,-29,182,58,3);ctx.fill();
    ctx.strokeStyle='#a53739';ctx.fillStyle='#a53739';ctx.lineWidth=3;rr(-86,-24,172,48,2);ctx.stroke();
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='800 11px system-ui,sans-serif';ctx.fillText('REJECTION',0,-12);
    ctx.font='900 23px system-ui,sans-serif';ctx.fillText('PREVENTED',0,9);
    ctx.restore();
  }
  if(!stampToolVisible())return;
  var h=G.morko.h[1];ctx.save();ctx.translate(h.x,h.y);
  ctx.globalAlpha=s.retiring?clamp(1-s.t/0.55,0,1):s.mode==='press'&&s.t>1?clamp((1.35-s.t)/0.35,0,1):1;
  ctx.fillStyle='#5c3435';ctx.strokeStyle='#e6c99d';ctx.lineWidth=1.5;
  rr(-7,-4,14,32,4);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.ellipse(0,-4,18,11,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#9a5b43';rr(-45,24,90,12,3);ctx.fill();ctx.stroke();
  ctx.fillStyle='#3b2531';rr(-41,36,82,5,1);ctx.fill();
  ctx.restore();
}

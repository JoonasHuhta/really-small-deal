/* ================= letting go: one card, dragged and dropped. The only thing in the game you throw away. ================= */
// Drag the card and release it, and it flies. Tap instead, and Ekskyysmi has to be talked into it: two excuses, then it opens its hand.
function tossStart(o){
  var q=geom();G.toss={x:q.bx-64,y:WALLY-118,vx:0,vy:0,st:'held',taps:0,t:0,o:o,trail:[],rot:-0.1,hx:q.bx-64,hy:WALLY-118,bounces:0,moved:0};
  G.lines=[];G.band=null;G.cur={who:'S',text:''};G.morko.mood='worry';WAIT='toss';LOCK=0.3;render();
}
function tossText(){var t=G.toss,o=t.o;return t.st==='drag'?o.drag:t.st==='held'?(t.taps?o.say[t.taps-1]:o.ask):t.st==='fly'?'…':o.done;}
function tossRefresh(){var t=G.toss;if(!t)return;var tx=tossText();if(tx!==t.shown){t.shown=tx;var p=elLine.querySelector('p');if(p)p.textContent=tx;}}
function tossRelease(vx,vy){var t=G.toss;t.st='fly';t.vx=clamp(vx,-900,900);t.vy=clamp(vy,-1100,700);G.morko.mood='surprised';sfx('pick');tossRefresh();}
function tossTap(){
  var t=G.toss;if(!t||t.st!=='held'||paused)return;
  t.taps++;if(t.taps>t.o.say.length){tossRelease(-50,-40);return;}
  sfx('nope');G.morko.wobble={t:0};tossRefresh();
}
function tossDown(e){
  var t=G.toss;if(WAIT!=='toss'||!t||t.st!=='held'||paused||LOCK>0)return;
  var p=lensPoint(e);t.st='drag';t.trail=[{x:p.x,y:p.y,at:Date.now()}];t.moved=0;t.downAt=Date.now();
  try{cv.setPointerCapture(e.pointerId);}catch(_){}
  tossRefresh();
}
function tossMove(e){
  var t=G.toss;if(!t||t.st!=='drag')return;var p=lensPoint(e),l=t.trail[t.trail.length-1];
  t.moved+=Math.abs(p.x-l.x)+Math.abs(p.y-l.y);t.x=clamp(p.x,30,W-30);t.y=clamp(p.y,30,FEETY+10);
  t.trail.push({x:p.x,y:p.y,at:Date.now()});if(t.trail.length>6)t.trail.shift();
}
function tossUp(){
  var t=G.toss;if(!t||t.st!=='drag')return;
  if(t.moved<12){t.st='held';t.x=t.hx;t.y=t.hy;if(Date.now()-t.downAt<400)tossTap();else tossRefresh();return;}
  var a=t.trail[0],b=t.trail[t.trail.length-1],dt=Math.max(0.03,(b.at-a.at)/1000);
  tossRelease((b.x-a.x)/dt,(b.y-a.y)/dt);
}
function tossCancel(){var t=G.toss;if(t&&t.st==='drag'){t.st='held';t.x=t.hx;t.y=t.hy;tossRefresh();}}
function stepToss(dt){
  var t=G.toss;if(!t)return;t.t+=dt;
  if(t.st==='fly'){
    var floor=FEETY+22;t.vy+=1500*dt;t.x+=t.vx*dt;t.y+=t.vy*dt;t.rot+=t.vx*0.006*dt;
    if(t.x<34){t.x=34;t.vx=Math.abs(t.vx)*0.5;}if(t.x>W-34){t.x=W-34;t.vx=-Math.abs(t.vx)*0.5;}
    if(t.y<24){t.y=24;t.vy=Math.abs(t.vy)*0.4;}
    if(t.y>=floor){t.y=floor;t.bounces++;if(t.bounces<4&&Math.abs(t.vy)>170){t.vy=-t.vy*0.34;t.vx*=0.55;sfx('drip');}
      else{t.st='rest';t.t=0;t.rot=Math.round(t.rot/Math.PI)*Math.PI+0.07;sfx('clink');G.morko.mood='surprised';tossRefresh();}}
  }else if(t.st==='rest'&&t.t>1.1){
    G.dropped={x:t.x,y:t.y,rot:t.rot,tag:t.o.tag,sub:t.o.sub};G.toss=null;WAIT=null;run();
  }
}
function tossCard(x,y,rot,tag,sub,a){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a==null?1:a;
  ctx.fillStyle='rgba(20,17,29,.25)';rr(-33,-19,70,44,4);ctx.fill();
  ctx.fillStyle='#f6f1e4';ctx.strokeStyle='#8b8070';ctx.lineWidth=1.5;rr(-36,-23,72,44,4);ctx.fill();ctx.stroke();
  ctx.fillStyle='#c9553f';ctx.fillRect(-36,-23,72,6);
  ctx.fillStyle='#2b2733';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='800 15px system-ui,sans-serif';ctx.fillText(tag,0,-4);
  ctx.font='600 8.5px system-ui,sans-serif';ctx.fillStyle='#5a5560';ctx.fillText(sub,0,11);
  ctx.restore();
}
function drawToss(){
  var g=G,t=g.toss,d=g.dropped;
  if(d)tossCard(d.x,d.y,d.rot,d.tag,d.sub);
  if(!t)return;
  var j=t.st==='held'&&!RM?Math.sin(g.time*38)*1.2:0;
  if(t.st==='held'||t.st==='drag'){ // a dotted outline where it used to be, and a nudge
    if(t.st==='drag'){ctx.save();ctx.setLineDash([5,5]);ctx.strokeStyle='#2b273366';ctx.lineWidth=2;ctx.translate(t.hx,t.hy);ctx.rotate(-0.1);rr(-36,-23,72,44,4);ctx.stroke();ctx.restore();}
    else if(!t.taps&&t.t>1.4){ctx.save();ctx.globalAlpha=RM?0.8:0.5+0.3*Math.sin(g.time*4);ctx.font='700 12px system-ui,sans-serif';ctx.textAlign='center';ctx.fillStyle='#2b2733';ctx.fillText('drag me · or tap',t.hx,t.hy+40);ctx.restore();}
  }
  tossCard(t.x+j,t.y,t.st==='drag'?0.04:t.rot,t.o.tag,t.o.sub);
}
cv.addEventListener('pointerdown',tossDown);cv.addEventListener('pointermove',tossMove);
window.addEventListener('pointerup',tossUp);window.addEventListener('pointercancel',tossCancel);window.addEventListener('blur',tossCancel);

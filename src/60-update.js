/* ================= update ================= */
function lampBase(){
  var hw=G.w.x,sw=0,off=0,s=0;
  for(var i=0;i<LAMPS.length;i++){var d=LAMPS[i]-hw,wt=1/(d*d+900);sw+=wt;off+=wt*clamp(-d*0.55,-150,150);s+=wt*Math.min(1.1,Math.abs(d)/220*0.9);}
  return{s:s/sw,off:off/sw};
}
function updHands(dt){
  var q=geom(),ht=handTargets(q),M=G.morko,k=RM&&(M.coat||M.wobble||(G.bar&&G.bar.sdrink))?1:Math.min(1,10*dt);
  M.h[0].x+=(ht.a.x-M.h[0].x)*k;M.h[0].y+=(ht.a.y-M.h[0].y)*k;
  M.h[1].x+=(ht.b.x-M.h[1].x)*k;M.h[1].y+=(ht.b.y-M.h[1].y)*k;
}
function update(dt,elapsed){
  // Reading/input delays follow elapsed time even when the browser draws fewer frames.
  elapsed=elapsed==null?dt:elapsed;
  var g=G,M=g.morko,Hm=g.human;g.time+=dt;LOCK=Math.max(0,LOCK-elapsed);
  if(M.coat){var coat=M.coat;coat.p=RM?(coat.buttons?1:0):approach(coat.p,coat.buttons?1:0,dt*1.7);if(coat.blink>=0)coat.blink+=dt;}
  if(M.wobble)M.wobble.t=Math.min(3.2,M.wobble.t+dt);
  if(G.cur&&G.cur.big&&WAIT==='click'){var bb=bigBox(G.cur.text,RM?1e9:Math.floor(G.curT*55));M.sT=clamp((WALLY-(BIGTOP+bb.h)-40)/170,0.42,1.15);if(RM)M.s=M.sT;if(bb.lines.length>3)M.mood='scared';}
  if(WAIT==='time'){TIMER-=elapsed;if(TIMER<=0)run();}
  else if(WAIT==='view'&&TIMER>0){TIMER-=elapsed;if(TIMER<=0)render();}
  g.clock+=dt*g.rate;
  g.ax=approach(g.ax,g.axT,150*dt);g.bx2=approach(g.bx2,g.bxT,150*dt);
  if(!g.w){Hm.x=approach(Hm.x,Hm.xT,125*dt);if(Hm.xT<0&&Hm.x<-40)Hm.gone=true;}
  Hm.flinch=Math.max(0,Hm.flinch-dt*0.7);
  g.gaze=ease(g.gaze,g.gazeT,6*dt);g.dark=ease(g.dark,g.darkT,3*dt);g.flash=Math.max(0,g.flash-dt*2.2);
  g.curT=(g.curT||0)+elapsed;
  Hm.sweat=ease(Hm.sweat,Hm.sweatT,1.5*dt);Hm.blush=Math.max(0,Hm.blush-dt*0.1);
  if(Hm.sweat>0.7)Hm.puddle=Math.min(1,Hm.puddle+dt*0.06);
  if(g.rep)g.rep.t+=dt;
  for(var ci=g.cards.length-1;ci>=0;ci--){g.cards[ci].t+=dt;if(g.cards[ci].life!=null&&g.cards[ci].t>g.cards[ci].life)g.cards.splice(ci,1);}
  g.pulse=Math.max(0,g.pulse-dt*0.3);g.shake=Math.max(0,g.shake-dt*2.6);
  if(g.zoom)g.zoom.t+=dt;
  stepLens(dt);stepBar(dt);stepDraft(dt);stepQte(dt);stepJolt(dt);
  var hk=(g.planText||'')+'|'+g.jobDone+'|'+g.hud+'|'+g.chapter+'|'+g.lab+'|'+g.yes+'|'+(g.w?1:0);if(hk!==g.hudKey){g.hudKey=hk;g.hudAge=0;}g.hudAge=(g.hudAge||0)+dt;
  stepTics(dt);if(g.dish)g.dish.t+=dt;carTics();if(g.smileT>0){g.smileT-=dt;if(g.smileT<=0&&g.human.face==='smile')g.human.face='neutral';}
  if(WAIT==='fight'&&g.fight&&!paused)stepFight(elapsed);
  if(WAIT==='hold'&&g.hold){
    var hh=g.hold,hon=hh.on||hh.tap>0;hh.tap=Math.max(0,hh.tap-elapsed);if(hh.on)hh.p+=elapsed;holdStep(hh,hon,elapsed);
    if(g.hold===hh){
      var hf=document.getElementById('holdfill');if(hf&&hf.style)hf.style.width=Math.round(clamp(hh.p/hh.secs,0,1)*100)+'%';
      var tx=holdText();if(tx!==hh.shown){hh.shown=tx;var pp=elLine.querySelector('p');if(pp)pp.textContent=tx;}
      if(hh.p>=hh.secs)finishHold();
    }
  }
  if(g.card>0)g.card-=dt;if(g.job)g.job.t+=elapsed;if(g.chap)g.chap.t+=dt;if(g.bigNote)g.bigNote.t+=dt;if(g.fade>0)g.fade=Math.max(0,g.fade-dt*(g.fadeRate||1.6));Hm.sip=ease(Hm.sip||0,Hm.sipT||0,8*dt);M.wake=ease(M.wake==null?1:M.wake,M.asleep?0:1,2.6*dt);if(g.anx>0.3)g.anx=Math.max(0.3,g.anx-0.06*dt);g.zShow=ease(g.zShow,g.zT,2*dt);g.yShow=ease(g.yShow||0,g.yT||0,2*dt);g.yx=approach(g.yx||0,g.yxT||0,(RM?400:75)*dt);if(g.out)g.out.t+=dt;if(g.pop){g.pop.t+=dt;if(g.pop.t>2.6)g.pop=null;}
  var base=M.sT,offT=-70-(M.s-1)*12;
  if(g.w){var lb=lampBase();base=M.sT+lb.s;offT=lb.off-(M.sT-1)*45;g.w.x=approach(g.w.x,g.w.xT,g.w.speed*dt);g.walking=g.w.x<g.w.xT-0.5&&g.w.speed>0;}
  if(M.st==='free'||M.st==='pokka')M.s=approach(M.s,base,(M.s<base?1.5:1.1)*dt);
  else if(M.st==='hide')M.s=ease(M.s,1.25,5*dt);
  M.off=ease(M.off,M.st==='hide'?0:offT,6*dt);
  updHands(dt);
  var tz=g.cz+(M.st==='frozen'?0.02:0);if(RM)tz=1+(tz-1)*0.4;
  C.z=ease(C.z,tz,2.5*dt);C.fx=ease(C.fx,g.cx,2.5*dt);C.fy=ease(C.fy,g.cy,2.5*dt);
}

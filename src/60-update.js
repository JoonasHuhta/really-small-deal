/* ================= update ================= */
function lampBase(){
  var hw=G.w.x,sw=0,off=0,s=0;
  for(var i=0;i<LAMPS.length;i++){var d=LAMPS[i]-hw,wt=1/(d*d+900);sw+=wt;off+=wt*clamp(-d*0.55,-150,150);s+=wt*Math.min(1.1,Math.abs(d)/220*0.9);}
  return{s:s/sw,off:off/sw};
}
function updHands(dt){
  var q=geom(),ht=handTargets(q),M=G.morko,k=stampToolVisible()||RM&&(M.coat||M.wobble||(G.bar&&G.bar.sdrink))?1:Math.min(1,10*dt);
  M.h[0].x+=(ht.a.x-M.h[0].x)*k;M.h[0].y+=(ht.a.y-M.h[0].y)*k;
  M.h[1].x+=(ht.b.x-M.h[1].x)*k;M.h[1].y+=(ht.b.y-M.h[1].y)*k;
}
function update(dt,elapsed){
  // Reading/input delays follow elapsed time even when the browser draws fewer frames.
  elapsed=elapsed==null?dt:elapsed;
  var g=G,M=g.morko,Hm=g.human;g.time+=dt;LOCK=Math.max(0,LOCK-elapsed);
  if(M.coat){var coat=M.coat;coat.p=RM?(coat.buttons?1:0):approach(coat.p,coat.buttons?1:0,dt*1.7);if(coat.blink>=0)coat.blink+=dt;}
  if(M.wobble)M.wobble.t=Math.min(3.2,M.wobble.t+dt);
  if(G.cur&&G.cur.big&&WAIT==='click'){var bb=bigBox(G.cur.text,RM?1e9:revealCount(G.cur.text,G.curT,G.cur));M.sT=clamp((WALLY-(BIGTOP+bb.h)-40)/170,0.42,1.15);if(RM)M.s=M.sT;if(bb.lines.length>3)M.mood='scared';}
  if(WAIT==='time'){TIMER-=elapsed;if(TIMER<=0)run();}
  else if(WAIT==='view'&&TIMER>0){TIMER-=elapsed;if(TIMER<=0)render();}
  g.clock+=dt*g.rate;
  g.ax=approach(g.ax,g.axT,150*dt);g.bx2=approach(g.bx2,g.bxT,150*dt);if(g.rxT!=null)g.rx=approach(g.rx,g.rxT,130*dt);
  if(!g.w){Hm.x=approach(Hm.x,Hm.xT,125*dt);if(Hm.xT<0&&Hm.x<-40)Hm.gone=true;}
  Hm.flinch=Math.max(0,Hm.flinch-dt*0.7);
  g.gaze=ease(g.gaze,g.gazeT,6*dt);g.dark=ease(g.dark,g.darkT,3*dt);g.flash=Math.max(0,g.flash-dt*2.2);
  g.curT=(g.curT||0)+elapsed;
  Hm.sweat=ease(Hm.sweat,Hm.sweatT,1.5*dt);Hm.blush=Math.max(0,Hm.blush-dt*0.1);
  if(Hm.sweat>0.7)Hm.puddle=Math.min(1,Hm.puddle+dt*0.06);
  if(g.rep)g.rep.t+=dt;
  if(g.dots)g.dots.t+=dt;if(g.tape)g.tape.t+=dt;if(g.pie)g.pie.t+=dt;
  if(g.night){g.night.t+=dt;if(g.night.car!=null){g.night.car+=dt;if(g.night.car>1.9)g.night.car=null;}}
  for(var ci=g.cards.length-1;ci>=0;ci--){var c0=g.cards[ci].t;g.cards[ci].t+=dt;if(g.cards[ci].kind==='bad'&&c0<0&&g.cards[ci].t>=0)sfx('slam');   // each red card lands with a bang
    if(g.cards[ci].life!=null&&g.cards[ci].t>g.cards[ci].life)g.cards.splice(ci,1);}
  g.pulse=Math.max(0,g.pulse-dt*0.3);g.shake=Math.max(0,g.shake-dt*2.6);
  if(g.zoom)g.zoom.t+=dt;
  stepLens(dt);stepBar(dt);stepDraft(dt);stepQte(dt);stepJolt(dt);stepStamp(dt);stepToss(dt);stepAuto(dt);stepDream(dt);if(g.buzz>0)g.buzz=Math.max(0,g.buzz-dt);
  var hk=(g.planText||'')+'|'+g.jobDone+'|'+g.hud+'|'+g.chapter+'|'+g.lab+'|'+g.yes+'|'+(g.w?1:0);if(hk!==g.hudKey){g.hudKey=hk;g.hudAge=0;}g.hudAge=(g.hudAge||0)+dt;
  stepFeet();stepMug(dt);stepShadowLife(dt);  stepTics(dt);stepHot(dt);stepEpi(dt);if(g.dish)g.dish.t+=dt;carTics();if(g.smileT>0){g.smileT-=dt;if(g.smileT<=0&&g.human.face==='smile')g.human.face='neutral';}
  if(WAIT==='fight'&&g.fight&&!paused)stepFight(elapsed);
  if(WAIT==='hold'&&g.hold){
    var hh=g.hold,hon=hh.on||hh.tap>0;hh.tap=Math.max(0,hh.tap-elapsed);if(hh.on)hh.p+=elapsed;holdStep(hh,hon,elapsed);
    if(g.hold===hh){
      var hf=document.getElementById('holdfill');if(hf&&hf.style)hf.style.width=Math.round(clamp(hh.p/hh.secs,0,1)*100)+'%';
      var tx=holdText();if(tx!==hh.shown){hh.shown=tx;var pp=elLine.querySelector('p');if(pp)pp.textContent=tx;}
      if(hh.p>=hh.secs)finishHold();
    }
  }
  if(g.card>0)g.card-=dt;if(g.job)g.job.t+=elapsed;if(g.chap)g.chap.t+=dt;g.stampT=(g.stampT||0)+dt;if(g.bigNote)g.bigNote.t+=dt;if(g.fade>0)g.fade=Math.max(0,g.fade-dt*(g.fadeRate||1.6));Hm.sip=ease(Hm.sip||0,Hm.sipT||0,8*dt);titleIdle(dt);M.wake=ease(M.wake==null?1:M.wake,M.asleep?0:M.dim!=null?M.dim:1,2.6*dt);if(g.anx>0.3)g.anx=Math.max(0.3,g.anx-0.06*dt);g.zShow=ease(g.zShow,g.zT,2*dt);g.yShow=ease(g.yShow||0,g.yT||0,2*dt);g.wShow=ease(g.wShow||0,g.wT||0,2*dt);if(g.wDrop)g.wDrop.t+=dt;g.yx=approach(g.yx||0,g.yxT||0,(RM?400:75)*dt);if(g.out)g.out.t+=dt;if(g.pop){g.pop.t+=dt;if(g.pop.t>2.6)g.pop=null;}
  var base=M.sT,offT=-70-(M.s-1)*12;
  if(g.w){var lb=lampBase();base=M.sT+lb.s;offT=lb.off-(M.sT-1)*45;g.w.x=approach(g.w.x,g.w.xT,g.w.speed*dt);g.walking=g.w.x<g.w.xT-0.5&&g.w.speed>0;offT-=gapStep(dt);}
  if(M.st==='free'||M.st==='pokka')M.s=approach(M.s,base,(M.s<base?1.5:1.1)*dt);
  else if(M.st==='hide')M.s=ease(M.s,1.25,5*dt);
  if(g.epi&&g.epi.o&&g.epi.o.off!=null)offT=g.epi.o.off;   // the montage can place the shadow (a hug needs it centred)
  M.off=ease(M.off,M.st==='hide'?0:offT,6*dt);
  // Spring lag (TYOSUUNNITELMA 7.1): the feet stay on the human, the shoulders trail a little and settle with one small sway.
  // It takes away the crank look on the walk home. Less motion: no lag, no sway. A jump (new scene) snaps.
  var spT=Hm.x+M.off,sdt=Math.min(dt,0.05);
  if(!M.sp||RM||Math.abs(M.sp.x-spT)>160)M.sp={x:spT,v:0};
  else{M.sp.v+=((spT-M.sp.x)*38-M.sp.v*7)*sdt;M.sp.x+=M.sp.v*sdt;}
  updHands(dt);
  // When the two of them trade short lines, the camera leans in a little. It lets go at the first long sentence.
  var bk=g.w||g.out||g.lens||g.draft||g.bar||M.asleep?0:clamp(((g.bick||0)-2)/4,0,1),tz=g.cz+(M.st==='frozen'?0.02:0)+0.075*bk;if(RM)tz=1+(tz-1)*0.4;
  var cr=g.camRate||2.5;C.z=ease(C.z,tz,(bk?1.4:cr)*dt);C.fx=ease(C.fx,g.cx+(Hm.x-70-g.cx)*0.8*bk,cr*dt);C.fy=ease(C.fy,g.cy+(300-g.cy)*0.8*bk,cr*dt);
}

// The title screen, left alone: every so often the human has a sip. Nothing else.
// Only before the game starts, and never with Less motion.
function titleIdle(dt){
  var g=G,Hm=g.human;
  if(g.started||Hm.gone||g.lab){if(g.idleT){g.idleT=0;Hm.sipT=0;}return;}
  if(g.set==='room')g.mugFixed=false;   // on the title the mug handle hides behind the human's head (and it is Monday's wrong side)
  if(RM)return;
  var t=(g.idleT=(g.idleT||0)+dt)%11;
  Hm.sipT=t>4&&t<5.4?1:0;
}

// Footsteps follow the legs: one step each time the leg swing (sin(time*8) in person()) changes sides.
function stepFeet(){var g=G,Hm=g.human;if(!Hm||g.epi||g.out)return;
  var walking=g.w?!!g.walking:(!Hm.gone&&Math.abs(Hm.x-Hm.xT)>1&&Hm.pose!=='floor');
  var side=Math.sin(g.time*8)>0;if(walking&&g.stepSide!=null&&side!==g.stepSide)sfx(side?'step':'step2');g.stepSide=side;}

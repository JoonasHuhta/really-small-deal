/* ================= the inside clock: one day outside, two days inside ================= */
// The outside clock is the one on the wall. The inside clock is the one Ekskyysmi keeps.
// Until something lands, they agree. After the first hit of the day, every outside hour is lived twice
// (once as it happens, once as it is replayed), and the spikes (jolts, archive visits, drafts) come on top.
// Nothing of this is on screen while it happens (the story says it when it matters). At the end of a day
// the difference is printed as a receipt, because that is the only format Ekskyysmi trusts.
var DOUBLE=2;                 // after a hit: each outside minute is lived twice
var STAY=1.4;                 // after the job changes: still more than one, but no longer two
var TRIES=0;                  // Mondays the player has replayed. Ekskyysmi notices.
var LIVED={hit:55,replay:25,archive:40,shadowHit:90,qteMissed:70,tonight:24};   // minutes
function dayLabel(){var g=G;if(g.lab)return 'SCENARIO LAB';if(g.chapter&&CHAPTERS[g.chapter])return CHAPTERS[g.chapter].day;return 'A DAY';}
function newDay(){
  var g=G;
  // a day that has barely started (the intro re-basing the clock) is simply replaced, not printed
  if(g.day0!=null){if(g.day0.hits||g.day0.ledger.length)closeDay();else g.day0=null;}
  g.day0={label:dayLabel(),start:g.clock,outside:0,extra:0,ledger:[],hits:0,trigAt:null,stayAt:null};
  g.mult=1;g.prevClock=g.clock;g.livedShown=0;
}
function addLived(label,mins){
  var g=G,d=g.day0;if(!d||!(mins>0))return;
  var e=null;
  for(var i=0;i<d.ledger.length;i++)if(d.ledger[i].label===label){e=d.ledger[i];break;}
  if(!e){e={label:label,n:0,secs:0};d.ledger.push(e);}
  e.n++;e.secs+=mins*60;g.hudAge=0;
}
function livedStep(label,mins){return function(){addLived(label,mins);};}
// After the job description changes, a hit still lands, but the day it costs is shorter.
// Outside, a day is one waking day: 07:00 to 23:00, sixteen hours, whatever the scenes skip over.
// Inside, everything from the first hit until bedtime runs twice; the spikes come on top.
var WAKE=7*3600,AWAKE=16*3600;
function dayPos(t){return Math.min(AWAKE,((t-WAKE)%86400+86400)%86400);}
function trigger(){
  var g=G,d=g.day0;if(!d)return;d.hits++;
  var cap=g.jobDone?STAY:DOUBLE;
  if(d.trigAt==null){d.trigAt=dayPos(g.clock);d.trigMult=cap;}
  if(g.mult<cap)g.mult=cap;
}
// called when the job description changes: from here on the rest of the day is a lighter rerun
function easeDay(){var g=G,d=g.day0;g.mult=Math.min(g.mult,STAY);if(d&&d.trigAt!=null&&d.stayAt==null)d.stayAt=Math.max(d.trigAt,dayPos(g.clock));}
function doubledUntil(d,pos){
  if(d.trigAt==null)return 0;pos=Math.max(d.trigAt,pos);
  var m1=d.trigMult||DOUBLE;
  if(d.stayAt==null||pos<=d.stayAt)return (pos-d.trigAt)*(m1-1);
  return (d.stayAt-d.trigAt)*(m1-1)+(pos-d.stayAt)*(Math.min(m1,STAY)-1);
}
function spikes(d){return d.ledger.reduce(function(s,e){return s+e.secs;},0);}
function closeDay(){
  var g=G,d=g.day0;if(!d)return null;
  if(d.hits)addLived('lying awake (projected)',Math.min(180,LIVED.tonight*d.hits+30));
  var doubled=doubledUntil(d,AWAKE);
  var how=(d.trigMult||DOUBLE)<DOUBLE?'1.4 times':d.stayAt!=null?'twice, then 1.4×':'twice';
  if(doubled>59)d.ledger.unshift({label:'rest of the day, '+how,n:1,secs:doubled});
  d.outside=AWAKE;d.extra=spikes(d);
  d.ratio=(d.outside+d.extra)/d.outside;
  g.run.push(d);g.day0=null;g.mult=1;return d;
}
// What closeDay would print for a day still open, without closing it. The epilogue rolls before Friday is over (0.77).
function dayRatio(d){
  if(!d)return 1;if(Number.isFinite(d.ratio))return d.ratio;
  var dbl=doubledUntil(d,AWAKE),extra=spikes(d)+(d.hits?Math.min(180,LIVED.tonight*d.hits+30)*60:0)+(dbl>59?dbl:0);
  return (AWAKE+extra)/AWAKE;
}
function dur(secs){
  secs=Math.round(secs);if(secs<60)return secs+' s';
  var h=Math.floor(secs/3600),m=Math.round((secs%3600)/60);if(m===60){h++;m=0;}
  return h?h+' h '+(m<10?'0':'')+m+' min':m+' min';
}

/* ---------- the receipt ---------- */
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
function receiptRows(d){
  var rows=[['A DAY, AWAKE',dur(d.outside)]];
  if(d.label==='A MONDAY'&&!G.qteWon)rows.push(['“oh, hi.”','0.4 s']);
  if(d.label==='A MONDAY'&&TRIES)rows.push(['Mondays replayed, by you'+(TRIES>1?' ×'+TRIES:''),'noted']);
  rows.push('-');
  d.ledger.slice().sort(function(a,b){return b.secs-a.secs;}).slice(0,6).forEach(function(e){rows.push([e.label+(e.n>1?' ×'+e.n:''),dur(e.secs)]);});
  if(!d.ledger.length)rows.push(['nothing to report','0 min']);
  rows.push('-',['OUTSIDE',dur(d.outside)],['INSIDE',dur(d.outside+d.extra)],'-',['DAYS LIVED TODAY',d.ratio.toFixed(1),'big']);
  return rows;
}
function runRows(run){
  var rows=[],cal=0,livedDays=0;
  run.forEach(function(d){if(d.label==='SCENARIO LAB')return;cal++;livedDays+=d.ratio;rows.push([d.label.toLowerCase().replace(/\. not necessarily that one\./,''),'×'+d.ratio.toFixed(1)]);});
  var extra=storyRows();if(extra.length)rows.push('-');rows=rows.concat(extra);
  rows.push('-',['DAYS ON THE CALENDAR',String(cal)],['DAYS LIVED',livedDays.toFixed(1),'big']);
  return rows;
}
function receiptHTML(title,rows,foot){
  var h='<div class="receipt" role="figure" aria-label="'+esc(title)+'"><div class="rc-head">REALLY SMALL DEAL<br>'+esc(title)+'</div>';
  rows.forEach(function(r){h+=r==='-'?'<hr>':'<div class="rr'+(r[2]?' '+r[2]:'')+'"><span>'+esc(r[0])+'</span><span>'+esc(r[1])+'</span></div>';});
  return h+'<div class="rc-foot">'+foot+'</div></div>';
}
function receiptText(title,rows,foot){
  var wdt=36,out=['REALLY SMALL DEAL',title,''];
  rows.forEach(function(r){if(r==='-'){out.push(new Array(wdt+1).join('-'));return;}var a=r[0],b=r[1],gap=Math.max(1,wdt-a.length-b.length);out.push(a+new Array(gap+1).join(' ')+b);});
  out.push('',foot.replace(/<br>/g,'\n').replace(/<[^>]+>/g,''),'','joonashuhta.github.io/really-small-deal');
  return out.join('\n');
}
var RC_FOOT_DAY='Thank you for your vigilance.<br>No refunds. No returns.';
var RC_FOOT_RUN='Outside, a day is a day.<br>Inside, some days come twice.';
// The receipt as a picture, for sending to someone who will understand. Drawn from the same rows as the paper one.
function receiptCanvas(title,rows,foot,inWorld){
  var S=2,PW=560,PAD=34,CW=PW-PAD*2,LH=30,F='500 21px ui-monospace,"SF Mono",Menlo,Consolas,monospace',FB='800 26px ui-monospace,"SF Mono",Menlo,Consolas,monospace';
  var c=document.createElement('canvas'),x=c.getContext('2d'),items=[],y=0,feet=foot.replace(/<br>/g,'\n').replace(/<[^>]+>/g,'').split('\n').filter(function(s){return s;});
  function wrap(t,max){var out=[],cur='';t.split(' ').forEach(function(w){var n=cur?cur+' '+w:w;if(cur&&x.measureText(n).width>max){out.push(cur);cur=w;}else cur=n;});out.push(cur);return out;}
  x.font=F;
  rows.forEach(function(r){
    if(r==='-'){items.push({k:'hr',h:22});return;}
    var big=r[2]==='big';x.font=big?FB:F;var vw=x.measureText(r[1]).width,ls=wrap(r[0],CW-vw-18);
    ls.forEach(function(l,i){items.push({k:'row',a:l,b:i===ls.length-1?r[1]:'',big:big,h:big?LH+8:LH});});
  });
  var headH=84,footH=feet.length*26+(inWorld?30:58),bodyH=0;items.forEach(function(it){bodyH+=it.h;});
  var PH=PAD+headH+bodyH+footH+PAD,M=44,Wc=PW+M*2,Hc=PH+M*2;
  c.width=Wc*S;c.height=Hc*S;x.scale(S,S);
  x.fillStyle='#12171b';x.fillRect(0,0,Wc,Hc);
  x.save();x.translate(Wc/2,Hc/2);x.rotate(0.012);x.translate(-PW/2,-PH/2);
  x.fillStyle='rgba(0,0,0,.45)';x.fillRect(8,12,PW,PH);x.fillStyle='#f6f1e4';x.fillRect(0,0,PW,PH);
  x.fillStyle='#2b2733';x.textBaseline='middle';x.textAlign='center';
  x.font='800 22px ui-monospace,"SF Mono",Menlo,Consolas,monospace';x.fillText('REALLY SMALL DEAL',PW/2,PAD+16);x.fillText(title,PW/2,PAD+46);
  y=PAD+headH;
  items.forEach(function(it){
    if(it.k==='hr'){x.strokeStyle='#8b8070';x.lineWidth=2;x.setLineDash([8,6]);x.beginPath();x.moveTo(PAD,y+11);x.lineTo(PW-PAD,y+11);x.stroke();x.setLineDash([]);}
    else{x.font=it.big?FB:F;x.fillStyle='#2b2733';x.textAlign='left';x.fillText(it.a,PAD,y+it.h/2+(it.big?4:0));x.textAlign='right';x.fillText(it.b,PW-PAD,y+it.h/2+(it.big?4:0));}
    y+=it.h;
  });
  x.textAlign='center';x.font='500 18px ui-monospace,"SF Mono",Menlo,Consolas,monospace';x.fillStyle='#5a5560';y+=26;
  feet.forEach(function(l){x.fillText(l,PW/2,y);y+=26;});
  if(!inWorld){x.fillStyle='#8b8070';x.font='500 15px ui-monospace,"SF Mono",Menlo,Consolas,monospace';x.fillText('joonashuhta.github.io/really-small-deal',PW/2,y+12);}   // 0.97: not on paper inside the story (Codex)
  x.restore();
  return c;
}
function shareReceipt(btn){
  var r=G.receipt;if(!r)return;
  function say(t){if(btn)btn.textContent=t;}
  function fallback(){copyReceipt(btn);}
  var c;try{c=receiptCanvas(r.title,r.rows,r.foot);}catch(e){fallback();return;}
  if(!c.toBlob){fallback();return;}
  c.toBlob(function(blob){
    if(!blob){fallback();return;}
    var file=null;try{file=new File([blob],'really-small-deal-receipt.png',{type:'image/png'});}catch(e){}
    try{if(file&&navigator.canShare&&navigator.canShare({files:[file]})){
      navigator.share({files:[file],title:'Really Small Deal',text:'My receipt.'}).then(function(){say('Sent. Probably fine.');},function(){say('Save as picture');});return;}}catch(e){}
    // No share sheet: a plain download in a browser. Inside the app there is nowhere to download to, so the text goes to the clipboard instead.
    if(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform()){fallback();return;}
    try{var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='really-small-deal-receipt.png';document.body.appendChild(a);a.click();a.remove();
      setTimeout(function(){URL.revokeObjectURL(u);},4000);say('Saved. Check your downloads.');}catch(e){fallback();}
  },'image/png');
}
function copyReceipt(btn){
  var t=G.receiptText||'';
  function done(ok){if(btn)btn.textContent=ok?'Copied. Paste it anywhere.':'Could not copy, sorry.';}
  try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){done(true);},function(){done(false);});return;}}catch(e){}
  try{var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();var ok=document.execCommand('copy');ta.remove();done(ok);}catch(e){done(false);}
}

/* ---------- away from the tab: Ekskyysmi takes it personally ---------- */
function goneAway(){var g=G;if(g&&g.started&&!g.ended)g.awayAt=Date.now();}
function cameBack(){
  var g=G;if(!g||g.awayAt==null)return;var secs=(Date.now()-g.awayAt)/1000;g.awayAt=null;
  if(secs<6||!g.started||g.ended)return;
  var inside=Math.min(240,Math.round(secs/60*30))||1;
  addLived('waiting for you to come back',inside);
  g.awayNote=[tr('You left for {a}.').replace('{a}',dur(secs)),tr('In here that was {a}. I’ve prepared a statement.').replace('{a}',dur(inside*60))];
}

/* ---------- the jolt: one small detail, and for a moment everything is an X-ray ---------- */
var JOLT_LEN=RM?1.1:0.82;
function jolt(o){return [function(){
  var g=G;g.jolt={t:0,tag:o.tag||'IMPACT DETECTED'};g.lines=[];g.cur=null;stopVoice();sfx('zap');
  g.human.flinch=1;g.human.face='stiff';g.morko.sT=1.7;g.morko.mood='scared';g.anx=1;g.shake=RM?0:0.7;trigger();
  addLived(o.label||'one small thing',o.mins||90);
},{wait:JOLT_LEN+0.5},function(){G.jolt=null;}];}
function stepJolt(dt){if(G.jolt)G.jolt.t+=dt;}
function joltPhase(){var j=G.jolt;if(!j)return null;if(RM)return j.t<JOLT_LEN?'xray':null;
  return j.t<0.06?'white':j.t<0.62?'xray':j.t<0.8?'dark':null;}
function bone(x1,y1,x2,y2,w){ctx.lineWidth=w||6;line(x1,y1,x2,y2);ctx.beginPath();ctx.arc(x1,y1,(w||6)*0.55,0,Math.PI*2);ctx.arc(x2,y2,(w||6)*0.55,0,Math.PI*2);}
function skeleton(x,calm,heart){
  var top=FEETY-118,hy=FEETY-150,c=calm?'rgba(190,225,255,.55)':'#d6f0ff';
  ctx.save();ctx.strokeStyle=c;ctx.fillStyle=c;ctx.lineCap='round';ctx.shadowColor='#7fd0ff';ctx.shadowBlur=calm?4:14;
  ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,hy,19,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#071521';circ(x-7,hy-2,5);ctx.fill();circ(x+7,hy-2,5);ctx.fill();ctx.fillStyle=c;
  ctx.lineWidth=2;for(var t=-6;t<=6;t+=4)line(x+t,hy+13,x+t,hy+17);
  ctx.lineWidth=5;line(x,hy+20,x,FEETY-50);
  ctx.lineWidth=3;for(var r=0;r<5;r++){var ry=top+10+r*11,rw=22-r*1.5;ctx.beginPath();ctx.ellipse(x,ry,rw,5,0,Math.PI*1.05,Math.PI*1.95,true);ctx.stroke();}
  bone(x-18,top+6,x-25,top+38,5);bone(x-25,top+38,x-28,top+62,4);bone(x+18,top+6,x+25,top+38,5);bone(x+25,top+38,x+28,top+62,4);
  ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(x,FEETY-50,16,8,0,0,Math.PI*2);ctx.stroke();
  bone(x-8,FEETY-44,x-10,FEETY-24,6);bone(x-10,FEETY-24,x-10,FEETY-4,5);bone(x+8,FEETY-44,x+10,FEETY-24,6);bone(x+10,FEETY-24,x+10,FEETY-4,5);
  ctx.restore();
  if(heart){
    var pu=RM?1:1+0.18*Math.sin(G.time*30),hx=x-6,hyy=top+24;
    ctx.save();ctx.shadowColor='#ff4a3a';ctx.shadowBlur=24;ctx.fillStyle='#ff5a44';ctx.translate(hx,hyy);ctx.scale(pu,pu);
    ctx.beginPath();ctx.moveTo(0,9);ctx.bezierCurveTo(-14,0,-9,-11,0,-4);ctx.bezierCurveTo(9,-11,14,0,0,9);ctx.fill();
    ctx.shadowBlur=0;ctx.strokeStyle='#fffbe0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-3,-6);ctx.lineTo(2,-1);ctx.lineTo(-2,1);ctx.lineTo(3,7);ctx.stroke();ctx.restore();
  }
}
function drawXray(){
  var g=G,q=geom(),ph=joltPhase();
  if(ph==='white'){ctx.fillStyle='#fbfdff';ctx.fillRect(-20,-20,W+40,H+40);return;}
  if(ph==='dark'){ctx.fillStyle='#020509';ctx.fillRect(-20,-20,W+40,H+40);return;}
  var gr=ctx.createRadialGradient(W/2,H/2,40,W/2,H/2,620);gr.addColorStop(0,'#0d2638');gr.addColorStop(1,'#030a12');ctx.fillStyle=gr;ctx.fillRect(-20,-20,W+40,H+40);
  if(!RM){ctx.fillStyle='rgba(160,220,255,.05)';for(var y=(G.time*80)%5;y<H;y+=5)ctx.fillRect(0,y,W,1.5);}
  ctx.strokeStyle='rgba(160,220,255,.12)';ctx.lineWidth=1;line(0,FEETY+2,W,FEETY+2);
  // Ekskyysmi has no bones. It turns out to be mostly filing cabinet.
  ctx.save();ctx.strokeStyle='rgba(150,210,255,.45)';ctx.lineWidth=2;ctx.setLineDash&&ctx.setLineDash([6,6]);
  ctx.beginPath();ctx.moveTo(q.bx-q.shW,q.by);ctx.lineTo(q.bx-q.shW,q.shY+10);ctx.quadraticCurveTo(q.bx,q.shY-18,q.bx+q.shW,q.shY+10);ctx.lineTo(q.bx+q.shW,q.by);ctx.stroke();
  ctx.beginPath();ctx.arc(q.bx,q.hdY,q.hdR,0,Math.PI*2);ctx.stroke();ctx.setLineDash&&ctx.setLineDash([]);
  var cw=Math.min(74,q.shW*1.15),ch=Math.min(150,(q.by-q.shY)*0.62),cx=q.bx-cw/2,cy=q.shY+(q.by-q.shY)*0.18;
  ctx.shadowColor='#7fd0ff';ctx.shadowBlur=10;ctx.strokeStyle='#d6f0ff';ctx.lineWidth=2.5;ctx.strokeRect(cx,cy,cw,ch);
  var labels=['2011','2016','2019','TODAY'];
  for(var i=0;i<4;i++){var dy=cy+6+i*(ch-12)/4,dh=(ch-12)/4-5;ctx.strokeRect(cx+5,dy,cw-10,dh);ctx.beginPath();ctx.moveTo(cx+cw/2-8,dy+dh/2);ctx.lineTo(cx+cw/2+8,dy+dh/2);ctx.stroke();
    ctx.shadowBlur=0;ctx.fillStyle='#d6f0ff';ctx.font='700 '+Math.max(8,Math.min(11,dh*0.36))+'px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(tr(labels[i]),cx+cw/2,dy+dh*0.28);ctx.shadowBlur=10;}
  ctx.restore();
  ctx.fillStyle='#d6f0ff';ctx.fillRect(q.bx-q.hdR*0.45,q.hdY-3,5,6);ctx.fillRect(q.bx+q.hdR*0.2,q.hdY-3,5,6);
  skeleton(g.human.x,false,true);
  if(g.cowB)skeleton(g.bx2,true,false);if(g.cowA)skeleton(g.ax,true,false);
  ctx.textAlign='left';ctx.textBaseline='middle';
  ctx.fillStyle='rgba(3,10,18,.8)';rr(26,24,420,62,6);ctx.fill();
  ctx.fillStyle='#ff6a55';ctx.font='800 15px system-ui,sans-serif';ctx.fillText(tr('● X-RAY · CHEST · ')+tr(g.jolt.tag),40,44);
  ctx.fillStyle='#bfe3ff';ctx.font='600 12px system-ui,sans-serif';ctx.fillText(tr('SHADOW: NO BONES DETECTED. FILING CABINET DETECTED.'),40,68);
  if(g.cowB||g.cowA){ctx.textAlign='center';ctx.fillStyle='rgba(191,227,255,.7)';ctx.font='700 11px system-ui,sans-serif';ctx.fillText(tr('HEART RATE: NORMAL'),g.cowB?g.bx2:g.ax,FEETY-186);}
}

/* ---------- Lab / moment: One small thing. ---------- */
function labDetail(){return labScene({set:'office',title:'One small thing.',plan:'Get the slides back.',clock:14*3600+5*60}).concat([
  function(){var g=G;g.cowB=true;g.bx2=1090;g.bxT=640;g.bFace=-1;},{wait:2.2},
  ['N','Eero is handing back the slides. His slides. That you made. At midnight. He is smiling. It is going well.'],
  ['B','These are really good, by the way.'],
  set({face:'smile'}),
  ['S','Good. Accept the compliment. Do not make eye contact with it.'],
  ['B','Just one small thing.']
 ],jolt({label:'“just one small thing”',mins:120,tag:'SOURCE: “JUST ONE SMALL THING”'}),[
  ['B','You okay?'],
  ['H','Yeah. It’s nothing.'],said,
  set({mood:'scared',s:1.6}),
  ['S','It is NOT nothing. I have the X-ray.'],
  {choice:[
    {t:'Show him the X-ray.',then:[['S','Look at it. Ribs. Spine. A lightning bolt where the heart goes.'],['H','I’m not showing Eero my skeleton.'],['S','He showed us his “small thing”.']]},
    {t:'Ask for the small thing in writing.',then:[['S','With a reference number. So we can be hurt by it properly, later, at home.'],['H','He’s standing right here.']]},
    {t:'Apologise for the small thing in advance.',then:[['H','Sorry about the—'],['B','You don’t know what it is yet.'],['S','We don’t need to know. We’re sorry in general.']]}
  ]},
  ['B','The font’s a bit small. I sit at the back. I can’t read it.'],
  set({mood:'surprised'}),
  ['S','…The font.'],
  ['S','I had the whole skeleton out. For the FONT.']
 ],outside({title:'WHAT EERO SAID',dur:'duration: 3 seconds',cap:'The font is a bit small. He sits at the back.',anim:'text'}),[
  calm,
  ['H','Fourteen to eighteen. Done.'],
  ['S','Four seconds.'],
  ['H','Four seconds out here.'],
  set({mood:'worry',s:1.2}),
  ['S','In here it’s going to take until about nine tonight.'],
  ['H','I know.'],
  ['S','You’ll be on the bus, and I’ll go: “one small thing”.'],
  ['H','I know.'],
  ['S','And then in the shower.'],
  ['H','I KNOW.'],
  {wait:0.8},
  ['B','Thanks! Seriously, they’re great.'],
  function(){G.bxT=1200;G.bFace=1;},
  ['S','…He said “great”.'],
  ['H','He did.'],
  ['S','That one I’ll forget by Thursday. It’s the font I’ll keep.'],
  ['H','You always keep the font.']
 ]);}

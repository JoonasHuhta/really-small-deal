/* ================= the glass: Ekskyysmi's magnifier. Whatever is under it looks worse. ================= */
var LENSR=76,LENSZ=1.9;
var SPOTS={
  laugh:{x:700,y:FEETY-150,tag:'SMILE: COLLAPSING'},
  mug:{x:772,y:FEETY-92,tag:'MUG: CONCEALING A MOUTH'},
  silence:{x:575,y:FEETY-205,tag:'SILENCE: 0.8 s (ENLARGED)'}
};
// Things the glass has opinions about if you simply wave it around the room.
var LOOKS=[
  {x:255,y:182,tag:'CHART: GOING DOWN. PROBABLY US.'},
  {x:774,y:172,tag:'WINDOW: AN EXIT. NOTED.'},
  {x:725,y:420,tag:'BENCH: WHERE THEY SIT. WITHOUT US.'},
  {x:HOME,y:FEETY-120,tag:'SUBJECT: FINE. (UNVERIFIED.)'}
];
function lensOn(){var g=G,q=geom();g.lens={x:q.bx+40,y:q.hdY+60,xT:g.human.x+120,yT:FEETY-300,mode:'look',spot:null,done:{},t:0};g.morko.pose='lens';sfx('enhance');}
function lensTo(k){return function(){addLived('exhibits examined',30);var L=G.lens,s=SPOTS[k];L.xT=s.x;L.yT=s.y;L.spot=k;L.done[k]=1;sfx('card');};}
function lensSelf(){var L=G.lens,q=geom();L.mode='self';L.spot=null;L.xT=q.bx+6;L.yT=q.hdY+14;G.morko.pose=null;G.morko.mood='worry';sfx('card');}
// A quick look through the glass, anywhere. The glass is Ekskyysmi's signature tool, so it keeps coming back.
function lensPeek(at,tag,secs){return function(){return [function(){var q=geom(),p=typeof at==='function'?at():at;
  G.lens={x:q.bx+40,y:q.hdY+60,xT:p.x,yT:p.y,mode:'peek',tag:tag,spot:null,done:{},t:0};G.morko.pose='lens';sfx('enhance');},
  {wait:secs||2.3},lensOff];};}   // a step that expands into steps (an array would read as a line of dialogue)
function lensOff(){G.lens=null;if(G.morko.pose==='lens')G.morko.pose=null;}
function stepLens(dt){var L=G.lens;if(!L)return;L.t+=dt;var k=RM?1:1-Math.pow(0.0006,dt);L.x+=(L.xT-L.x)*k;L.y+=(L.yT-L.y)*k;}
function lensHandle(){var L=G.lens,a=L.mode==='self'?Math.PI*0.25:Math.PI*0.75,c=Math.cos(a),s=Math.sin(a);return {x1:L.x+c*LENSR,y1:L.y+s*LENSR,x2:L.x+c*(LENSR+52),y2:L.y+s*(LENSR+52)};}
function lensFree(){return G.lens&&G.lens.mode==='look'&&WAIT==='choice'&&!paused;}
function lensPoint(e){var r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*W,y:(e.clientY-r.top)/r.height*H};}
function lensMove(e){if(!lensFree())return;var p=lensPoint(e),L=G.lens;L.xT=clamp(p.x,40,W-40);L.yT=clamp(p.y,60,H-50);L.spot=null;}
function lensTap(e){
  var p=lensPoint(e),L=G.lens,best=-1,bd=70;
  for(var i=0;CH&&i<CH.length;i++){var k=CH[i].spot;if(!k)continue;var d=Math.hypot(SPOTS[k].x-p.x,SPOTS[k].y-p.y);if(d<bd){bd=d;best=i;}}
  if(best>=0){LOCK=0;choose(best);}else lensMove(e);
}
function lensTag(){
  var L=G.lens,all=[],k,i,best=null,bd=58;
  for(k in SPOTS)all.push(SPOTS[k]);for(i=0;i<LOOKS.length;i++)all.push(LOOKS[i]);
  for(i=0;i<all.length;i++){var d=Math.hypot(all[i].x-L.x,all[i].y-L.y);if(d<bd){bd=d;best=all[i];}}
  return best?best.tag:null;
}
function drawLens(){
  var g=G,L=g.lens;if(!L)return;var r=LENSR,k,h;
  // unexamined spots pulse quietly while the glass is free
  // Each spot carries the same number and name as its option in the list (Joonas 20.11.: it was unclear where to tap).
  if(lensFree())for(var ci=0;CH&&ci<CH.length;ci++){k=CH[ci].spot;if(!k||L.done[k])continue;var s=SPOTS[k],pu=RM?0.5:0.5+0.5*Math.sin(g.time*4);
    ctx.strokeStyle='rgba(224,86,62,'+(0.55+0.4*pu)+')';ctx.lineWidth=3;ctx.beginPath();ctx.arc(s.x,s.y,17+pu*6,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle='#c9553f';circ(s.x,s.y,12);ctx.fill();ctx.fillStyle='#fff';ctx.font='800 14px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(ci+1),s.x,s.y+1);
    var nm=k==='laugh'?'the laugh':k==='mug'?'the mug':'the silence';ctx.font='700 12px system-ui,sans-serif';var nw=ctx.measureText(nm).width+12;
    ctx.fillStyle='rgba(120,20,28,.88)';rr(s.x-nw/2,s.y+26,nw,18,4);ctx.fill();ctx.fillStyle='#fff';ctx.fillText(nm,s.x,s.y+35);}
  ctx.save();ctx.beginPath();ctx.arc(L.x,L.y,r,0,Math.PI*2);ctx.clip();
  if(L.mode==='self'){
    // The glass turned on its owner: the wall, and something much smaller than advertised.
    backdrop(false);
    var cx=L.x,cy=L.y+16,bob=RM?0:Math.sin(g.time*2.2)*1.5;
    ctx.fillStyle='rgba(20,16,30,.25)';ctx.beginPath();ctx.ellipse(cx,cy+34,22,5,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=mcol();ctx.beginPath();ctx.moveTo(cx-17,cy+34);ctx.quadraticCurveTo(cx-22,cy-12+bob,cx,cy-16+bob);ctx.quadraticCurveTo(cx+22,cy-12+bob,cx+17,cy+34);ctx.closePath();ctx.fill();
    ctx.fillStyle='#faf4e5';circ(cx-6,cy-1+bob,5.5);ctx.fill();circ(cx+7,cy-1+bob,5.5);ctx.fill();
    ctx.fillStyle='#14111d';circ(cx-4.5,cy-2+bob,2.2);ctx.fill();circ(cx+8.5,cy-2+bob,2.2);ctx.fill();
    ctx.strokeStyle='#faf4e5';ctx.lineWidth=1.5;ctx.lineCap='round';line(cx-12,cy-10+bob,cx-3,cy-8+bob);line(cx+13,cy-10+bob,cx+4,cy-8+bob);
  }else{
    ctx.translate(L.x,L.y);ctx.scale(LENSZ,LENSZ);ctx.translate(-L.x,-L.y);
    g.lensView=true;backdrop(false);if(!g.human.gone)drawPair();drawCoworkers(1);g.lensView=false;
  }
  ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(L.x,L.y,r,0,Math.PI*2);ctx.clip();
  ctx.fillStyle=L.mode==='self'?'rgba(255,240,200,.07)':'rgba(150,30,40,.15)';ctx.fillRect(L.x-r,L.y-r,r*2,r*2);
  var tag=L.mode==='look'?lensTag():L.mode==='peek'&&L.t>0.45?L.tag:null;
  if(tag){ctx.font='800 10px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';var ls=wrap(tag,r*1.5),ty=L.y+r*0.5-(ls.length-1)*6;
    for(var i=0;i<ls.length;i++){var tw=ctx.measureText(ls[i]).width+10;ctx.fillStyle='rgba(120,20,28,.88)';rr(L.x-tw/2,ty+i*13-7,tw,13,3);ctx.fill();ctx.fillStyle='#fff';ctx.fillText(ls[i],L.x,ty+i*13);}}
  ctx.restore();
  h=lensHandle();ctx.lineCap='round';ctx.strokeStyle='#7a5c3a';ctx.lineWidth=11;line(h.x1,h.y1,h.x2,h.y2);
  ctx.strokeStyle='#ebbd79';ctx.lineWidth=7;ctx.beginPath();ctx.arc(L.x,L.y,r,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle='rgba(20,16,30,.5)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(L.x,L.y,r-4,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(L.x,L.y,r-13,Math.PI*1.12,Math.PI*1.42);ctx.stroke();
}

/* ---------- Lab: Evidence. ---------- */
function glassMenu(){
  var L=G.lens,o=[],n=0,k;for(k in L.done)n++;
  if(!L.done.laugh)o.push({t:'Examine: the laugh.',spot:'laugh',f:lensTo('laugh'),then:[
    ['S','Exhibit A. A smile, mid-collapse.'],['H','She stopped laughing.'],['S','Because the SUBJECT of the laugh arrived.'],['H','Or because the funny bit ended.'],['S','Funny bits don’t end the moment we walk in. That’s called timing.']]});
  if(!L.done.mug)o.push({t:'Examine: the mug.',spot:'mug',f:lensTo('mug'),then:[
    ['S','Exhibit B. He is holding a mug in front of his mouth.'],['H','He’s drinking coffee.'],['S','He is CONCEALING a mouth. With coffee. I’ve seen it before.'],['H','Where?'],['S','Everywhere. People are constantly drinking things at us.']]});
  if(!L.done.silence)o.push({t:'Examine: the silence.',spot:'silence',f:lensTo('silence'),then:[
    ['S','Exhibit C. Zero point eight seconds of silence. I’ve enlarged it.'],['H','You enlarged a silence.'],['S','It was already big.'],['H','It’s empty.'],['S','It’s FULL. Of what they didn’t say.']]});
  o.push({t:'Put the glass down.',f:function(){G.glassN=n;},then:function(){return (n===0?
    [['H','You didn’t look at anything.'],['S','I didn’t need to. I know what I’d have found.'],['H','That’s the problem with the glass.']]:
    n===3?[['S','Three exhibits. The case is overwhelming.'],['H','Everything is overwhelming in that glass. That’s what it’s for.']]:
    [['S','I’ve seen enough.'],['H','You’ve seen '+(n===1?'one thing':'two things')+', very large.']]).concat([function(){G.lens.done.end=1;}]);}});
  return o;
}
function labGlass(){
  function more(){return G.lens&&G.lens.done.end?[]:[{choice:glassMenu},more];}
  return labScene({set:'office',title:'Evidence.',plan:'Walk into a room.',clock:10*3600+2*60}).concat([
  function(){var g=G;g.cowA=g.cowB=true;g.ax=g.axT=700;g.bx2=g.bxT=800;g.aFace=1;g.bFace=-1;g.human.x=150;g.human.xT=HOME;},
  {wait:2.2},
  ['N','10:02. You walk into the room. Two people are laughing.'],
  function(){G.aFace=-1;},
  ['N','They see you. The laughing stops.'],
  hit(0.6,'A'),{wait:1.2},
  ['S','They were laughing. Then they saw us. Then they stopped.'],
  ['H','People stop laughing. It’s how laughing ends.'],
  ['S','I’ll need the glass. And the hat.'],
  hat('detective'),lensOn,{wait:0.8},
  ['N','Move the glass around the room. Tap a numbered circle, or pick from the list.'],
  {choice:glassMenu},more,
  function(){var g=G;g.lens.xT=g.human.x+120;g.lens.yT=FEETY-210;g.lens.spot=null;g.aWave=true;},
  ['A','Oh, hi! Come here, you have to see this.'],
  ['B','It’s a cat. It falls off a printer.'],
  function(){G.aWave=false;}
 ],outside({title:'WHAT THEY WERE LAUGHING AT',dur:'duration: 9 seconds',cap:'A cat falls off a printer. Twice. They stopped laughing to say hi.',anim:'text'}),[
  calm,function(){G.morko.pose='lens';},
  ['S','…A cat.'],
  ['S','The glass didn’t show a cat.'],
  hat(null),
  ['H','The glass never shows the cat.'],
  ['H','Can I see it?'],
  ['S','It’s a professional instrument.'],
  lensSelf,{wait:1.6},
  ['N','Your human holds the glass up to you.'],
  ['S','Don’t. It makes everything bigger.'],
  ['H','You look smaller.'],
  ['S','…It’s the angle.'],
  {choice:[
    {t:'Take the glass back. Immediately.',then:[['S','Mine.'],['H','Yours.'],['S','…You can borrow it. For cats.']]},
    {t:'Hold still. Let them look.',then:[{wait:1.4},['S','…Well?'],['H','Small. Tired. Quite sweet, actually.'],['S','Strike that from the record.'],['H','No.']]},
    {t:'Explain that the glass is faulty.',then:[['S','It’s been showing things wrong all morning. You said so yourself.'],['H','It showed the room wrong. It’s got you about right.'],['S','…I’d like a second opinion. From a bigger glass.']]}
  ]},
  lensOff,set({mood:'calm',s:1.1})
 ]);}

/* ================= the correct response: a window that is technically open ================= */
// Right after "oh, hi." on the first Monday, Ekskyysmi demands the correct response, in the correct order,
// inside the correct window. It is possible. It is not reasonable. Missing it is the story; making it is a secret.
// On Friday the same window opens again, and the human answers it with one word.
var RESPONSE=[
  {k:'ArrowUp',sym:'↑',label:'SMILE'},
  {k:'ArrowDown',sym:'↓',label:'NOD'},
  {k:'ArrowLeft',sym:'←',label:'EYE CONTACT (NOT TOO MUCH)'},
  {k:'ArrowRight',sym:'→',label:'SAY “HI”'},
  {k:' ',sym:'SPACE',label:'BREATHE'}
];
var QTE_SECS=2.8,QTE_SECS_TOUCH=3.1; // the original 0.8 s, plus two seconds for reading (requested by the human)
function qteSecs(coarse){return (coarse?QTE_SECS_TOUCH:QTE_SECS)*(slowReality?3.2:1);}
function startQte(){
  var g=G,coarse=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches),order=RESPONSE.map(function(_,i){return i;});
  // on a touch screen the buttons arrive shuffled, because of course they do
  if(coarse)for(var i=order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=order[i];order[i]=order[j];order[j]=t;}
  g.qte={i:0,t:0,secs:qteSecs(coarse),end:null,endT:0,order:order,auto:false};g.qteWon=false;
  g.lines=[];g.cur={who:'S',text:tr('RESPOND. CORRECTLY. NOW.')};stopVoice();sfx('startle');
  WAIT='qte';LOCK=0;render();
}
// Friday: the same window, answered without the procedure.
function qteAuto(){var g=G;g.qte={i:0,t:0,secs:qteSecs(false),end:null,endT:0,order:RESPONSE.map(function(_,i){return i;}),auto:true};g.lines=[];sfx('startle');}
function qteInput(idx){
  var q=G.qte;if(!q||q.end||q.auto||WAIT!=='qte'||paused)return;
  if(idx===q.i){q.i++;sfx('pick');if(q.i>=RESPONSE.length)qteEnd(true);else render();}
  else qteEnd(false,'wrong');
}
// Arrow keys and Space are the procedure. Enter, the usual "carry on" key, is an incorrect response.
function qteKey(e){
  for(var i=0;i<RESPONSE.length;i++)if(e.key===RESPONSE[i].k){qteInput(i);return true;}
  if(e.key==='Enter'){qteInput(-1);return true;}
  return false;
}
function qteEnd(won,why){var g=G,q=g.qte;q.end=won?'won':(why||'late');q.endT=0;g.qteWon=won;if(!won)addLived('the response, revisited',LIVED.qteMissed);sfx(won?'good':'nope');render();}
function stepQte(dt){
  var q=G.qte;if(!q)return;
  q.t+=dt;
  if(q.auto){if(!q.end){q.i=Math.min(RESPONSE.length,Math.max(0,Math.floor((q.t-0.6)/0.07)+1));if(q.i>=RESPONSE.length){q.end='won';q.endT=0;sfx('good');}}else q.endT+=dt;return;}
  if(!q.end){if(q.t>=q.secs)qteEnd(false,'late');return;}
  q.endT+=dt;if(q.endT>1.2&&WAIT==='qte'){WAIT=null;G.qte=null;run();}
}
function drawQte(){
  var q=G.qte;if(!q)return;
  var x=W/2,y=COMPACT?96:112,w=620,n=RESPONSE.length,i,k;
  ctx.save();
  ctx.fillStyle='rgba(14,12,20,.88)';rr(x-w/2,y-46,w,152,14);ctx.fill();
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='800 15px system-ui,sans-serif';ctx.fillStyle=(RM||Math.floor(G.time*6)%2===0)&&!q.end?'#e0563e':'#f1ebdd';ctx.fillText(tr('RESPOND CORRECTLY'),x,y-26);
  var cw=108,gap=9,x0=x-(n*cw+(n-1)*gap)/2;
  for(i=0;i<n;i++){
    var r=RESPONSE[i],bx=x0+i*(cw+gap),done=i<q.i,cur=i===q.i&&!q.end;
    ctx.fillStyle=done?'#2f6b4f':cur?'#3a3446':'#26222f';rr(bx,y-10,cw,40,8);ctx.fill();
    ctx.strokeStyle=done?'#9fd3a8':cur?'#ebbd79':'#4a4456';ctx.lineWidth=2;rr(bx,y-10,cw,40,8);ctx.stroke();
    ctx.fillStyle=done?'#e9ffe9':'#f1ebdd';ctx.font=(r.sym.length>1?'800 13px':'800 21px')+' system-ui,sans-serif';ctx.fillText(r.sym,bx+cw/2,y+10);
    ctx.fillStyle='#b9b2a6';ctx.font='700 9px system-ui,sans-serif';
    var ls=wrap(tr(r.label),cw-4);for(k=0;k<ls.length;k++)ctx.fillText(ls[k],bx+cw/2,y+42+k*11);
  }
  var left=q.end?0:q.auto?1:clamp(1-q.t/q.secs,0,1),bw=w-60;
  ctx.fillStyle='#ffffff1a';rr(x-bw/2,y+72,bw,6,3);ctx.fill();
  ctx.fillStyle=left>0.35?'#ebbd79':'#e0563e';rr(x-bw/2,y+72,bw*left,6,3);ctx.fill();
  ctx.font='600 10px system-ui,sans-serif';ctx.fillStyle='#8b8070';
  var secs=q.secs.toFixed(1);if(loc().dec===',')secs=secs.replace('.',',');
  ctx.fillText(q.auto?tr('WINDOW: NOT REQUIRED'):tr('WINDOW: {s} s · INCLUDES TWO SECONDS FOR READING · REALITY: ALREADY MOVING').replace('{s}',secs),x,y+90);
  if(q.end){
    var a=clamp(q.endT/0.15,0,1),sc=RM?1:1.4-0.4*a,txt=tr(q.end==='won'?'CORRECT.':q.end==='wrong'?'INCORRECT.':'TOO LATE.'),col=q.end==='won'?'#7fc08a':'#e0563e';
    ctx.globalAlpha=a;ctx.translate(x,y+12);ctx.rotate(-0.06);ctx.scale(sc,sc);
    ctx.font='900 48px system-ui,sans-serif';var tw=ctx.measureText(txt).width+40;
    ctx.fillStyle='rgba(14,12,20,.92)';rr(-tw/2,-34,tw,68,8);ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=4;rr(-tw/2,-34,tw,68,8);ctx.stroke();
    ctx.fillStyle=col;ctx.fillText(txt,0,2);
  }
  ctx.restore();
}
// The almost impossible branch. It happens, and nothing about it is dramatic.
function scResponded(){return [
  set({aFace:-1,mood:'surprised',s:1.5}),{wait:0.5},
  ['H','Hi!'],
  ['A','Oh good, you’re in. We’re doing lunch at twelve. Coming?'],
  set({face:'smile'}),
  ['H','Yeah.'],
  {wait:0.9},
  ['S','…'],
  ['S','You did it.'],
  ['S','Nobody has ever done it. I designed it so that nobody could do it.'],
  ['H','I said hi.'],
  ['S','In under three seconds. With BREATHING.'],
  set({mood:'calm',s:0.8}),
  ['S','I’m going to need to lie down.'],
  function(){var g=G;g.lunch=1;g.leak='none';}
 ].concat(outside({title:'WHAT THE OTHERS SAW',dur:'duration: 1 second',cap:'Someone said hi back. That was all it ever was.',anim:'none'}),[
  calm,{wait:0.6},function(){return scWalk();}
 ]);}

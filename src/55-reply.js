/* ================= Lab: The reply. Ekskyysmi edits a message until nothing in it can be rejected. ================= */
// The draft is a row of pieces. Cutting a piece strikes it through, then it fades and the rest closes up.
var DRAFT0=[['hey','Hey!'],['i','I had a'],['really','really'],['nice','nice time'],['thu','on Thursday.'],['again','We should do it again'],['soon','soon'],['smiley',':)']];
function draftOpen(){G.draft={tokens:DRAFT0.map(function(d){return {id:d[0],t:d[1],on:true,k:0};}),sent:null,reply:null,t:0};sfx('card');}
function draftCut(ids){return function(){var D=G.draft;D.tokens.forEach(function(k){if(ids.indexOf(k.id)>=0&&k.on){k.on=false;k.k=0;}});sfx('nope');};}
function draftSwap(id,text){return function(){var D=G.draft;D.tokens.forEach(function(k){if(k.id===id){k.t=text;k.flash=1;}});sfx('pick');};}
function draftRestore(extra){return function(){var D=G.draft;D.tokens=DRAFT0.map(function(d){return {id:d[0],t:d[0]==='really'&&extra?'really really':d[1],on:true,k:0,flash:1};});sfx('good');};}
function draftText(){var D=G.draft,o=[];D.tokens.forEach(function(k){if(k.on)o.push(k.t);});return o.join(' ')||'…';}
function draftSend(){var D=G.draft;D.sent=draftText();sfx('pick');}
function stepDraft(dt){var D=G.draft;if(!D)return;D.t+=dt;D.tokens.forEach(function(k){if(!k.on&&k.k<1)k.k=Math.min(1,k.k+dt/0.9);if(k.flash>0)k.flash=Math.max(0,k.flash-dt*1.2);});}
function drawDraft(){
  var D=G.draft,x=592,y=COMPACT?86:74,w=316,h=COMPACT?284:372,i; // on a phone the words run along the bottom, so the handset is shorter
  ctx.fillStyle='#0f1216';rr(x-8,y-8,w+16,h+16,30);ctx.fill();ctx.fillStyle='#eef0ea';rr(x,y,w,h,22);ctx.fill();
  ctx.fillStyle='#dfe3da';rr(x,y,w,46,22);ctx.fill();ctx.fillRect(x,y+24,w,22);
  ctx.fillStyle='#62887f';circ(x+30,y+23,13);ctx.fill();ctx.fillStyle='#2b2733';ctx.textAlign='left';ctx.textBaseline='middle';ctx.font='700 16px system-ui,sans-serif';ctx.fillText('Sanna',x+52,y+23);
  // her message
  ctx.font='500 14px system-ui,sans-serif';var hers=wrap('Thursday was so fun!! You’re annoyingly good at that game.',210),by=y+60;
  ctx.fillStyle='#ffffff';rr(x+12,by,236,hers.length*19+14,12);ctx.fill();ctx.fillStyle='#2b2733';for(i=0;i<hers.length;i++)ctx.fillText(hers[i],x+24,by+16+i*19);
  by+=hers.length*19+26;
  if(D.sent){
    var mine=wrap(D.sent,210),mh=mine.length*19+14;ctx.fillStyle='#62887f';rr(x+w-248,by,236,mh,12);ctx.fill();ctx.fillStyle='#fbf8ef';for(i=0;i<mine.length;i++)ctx.fillText(mine[i],x+w-236,by+16+i*19);
    by+=mh+12;
    if(D.reply){var rep=wrap(D.reply,210);ctx.fillStyle='#ffffff';rr(x+12,by,236,rep.length*19+14,12);ctx.fill();ctx.fillStyle='#2b2733';for(i=0;i<rep.length;i++)ctx.fillText(rep[i],x+24,by+16+i*19);}
    return;
  }
  // the draft box
  var bx=x+12,bw=w-24,bh=COMPACT?124:150,top=y+h-bh-12;
  ctx.fillStyle='#ffffff';ctx.strokeStyle='#62887f';ctx.lineWidth=2;rr(bx,top,bw,bh,14);ctx.fill();ctx.stroke();
  ctx.font='700 10px system-ui,sans-serif';ctx.fillStyle='#8b9a8c';ctx.fillText('DRAFT',bx+12,top+14);
  ctx.font='500 17px system-ui,sans-serif';var cx=bx+12,cy=top+40,sp=ctx.measureText(' ').width;
  D.tokens.forEach(function(k){
    var a=k.on?1:clamp(1-(k.k-0.45)/0.55,0,1);if(a<=0)return;
    var tw=ctx.measureText(k.t).width;if(cx+tw>bx+bw-12){cx=bx+12;cy+=26;}
    if(k.flash>0){ctx.fillStyle='rgba(235,189,121,'+(0.6*k.flash)+')';rr(cx-3,cy-12,tw+6,24,5);ctx.fill();}
    ctx.globalAlpha=a;ctx.fillStyle='#2b2733';ctx.fillText(k.t,cx,cy);
    if(!k.on){ctx.strokeStyle='#c9553f';ctx.lineWidth=2.5;line(cx-2,cy,cx-2+(tw+4)*clamp(k.k/0.35,0,1),cy);}
    ctx.globalAlpha=1;cx+=tw+sp;
  });
  if(RM||Math.floor(G.time*2)%2===0){ctx.fillStyle='#62887f';ctx.fillRect(cx,cy-10,2,20);}
  ctx.fillStyle='#62887f';circ(bx+bw-24,top+bh-24,15);ctx.fill();ctx.strokeStyle='#fbf8ef';ctx.lineWidth=3;ctx.lineCap='round';line(bx+bw-24,top+bh-17,bx+bw-24,top+bh-31);line(bx+bw-24,top+bh-31,bx+bw-30,top+bh-25);line(bx+bw-24,top+bh-31,bx+bw-18,top+bh-25);
}
function labReply(){return labScene({set:'home',title:'The reply',plan:'Answer one message.',clock:21*3600+5*60}).concat([
  function(){var g=G;g.human.x=g.human.xT=330;},
  ['N','Sanna has written: “Thursday was so fun!! You’re annoyingly good at that game.”'],
  ['H','I’ll just answer.'],
  draftOpen,{wait:1.2},
  ['H','“Hey! I had a really nice time on Thursday. We should do it again soon.” Smiley.'],
  set({mood:'alert',s:1.3}),
  ['S','Before we send that. A few small edits. For safety.'],
  {choice:[
    {t:'Cut “really”. Nobody needs to know how nice.',f:draftCut(['really']),then:[['S','A nice time. Measured. Like a person with other nice times.'],['H','It was really nice.'],['S','That’s between us.']]},
    {t:'Cut the smiley. We are not a smiley household.',f:draftCut(['smiley']),then:[['S','A smiley is a face you can’t take back.']]},
    {t:'Cut “Hey!”. Too much knocking.',f:draftCut(['hey']),then:[['S','We don’t announce ourselves. We arrive.'],['H','It’s a greeting.'],['S','It’s a doorbell with an exclamation mark.']]}
  ]},
  {choice:[
    {t:'Cut “We should do it again”. Presumptuous.',f:draftCut(['again','soon']),then:[['S','What if she doesn’t want an again? Now there’s an again on the table and she has to walk around it.']]},
    {t:'Change “soon” to “sometime”.',f:draftSwap('soon','sometime'),then:[['H','You hate “sometime”.'],['S','When OTHER people say it.']]},
    {t:'Cut “on Thursday”. She knows which day she was at.',f:draftCut(['thu']),then:[['S','Dates are evidence.']]}
  ]},
  {choice:[
    {t:'Cut “nice time”. Nice for HER? Unverified.',f:draftCut(['nice']),then:[['S','We can’t make claims about the time. We can only confirm that time occurred.']]},
    {t:'Cut everything after the first full stop.',f:draftCut(['again','soon','smiley']),then:[['S','One sentence. Fewer sentences, fewer openings.']]},
    {t:'Replace the lot with “ok”.',f:function(){var D=G.draft;D.tokens=[{id:'ok',t:'ok',on:true,k:0,flash:1}];sfx('nope');},then:[['S','“ok”. Two letters. Impregnable.'],['H','You once spent a whole evening on what “ok” meant.'],['S','Which is how I know it works.']]}
  ]},
  {wait:0.8},
  function(){return [['H','“'+draftText()+'”']];},
  ['S','Perfect. Nothing in it can be rejected.'],
  ['H','There’s nothing in it.'],
  ['S','That’s what I said.'],
  {choice:[
    {t:'Send it like this. It’s safe.',f:function(){G.replySent='edited';},then:[draftSend,{wait:1.4},function(){G.draft.reply='…is this a riddle? Thursday was GREAT. Again next week?';sfx('good');},{wait:1.6},['S','She decoded it.'],['H','She shouldn’t have had to.']]},
    {t:'Fine. Put it back. All of it.',f:function(){G.replySent='full';},then:[draftRestore(false),{wait:1.0},['S','Even the smiley?'],['H','Especially the smiley.'],draftSend,{wait:1.4},function(){G.draft.reply='SAME!! Next Thursday? I’ll bring the good crisps.';sfx('good');},{wait:1.6},['S','Two exclamation marks. Unprompted.']]},
    {t:'Put it back. And add a second “really”.',f:function(){G.replySent='more';},then:[draftRestore(true),{wait:1.0},['H','That’s… more than I wrote.'],['S','I know. Send it before I see it.'],draftSend,{wait:1.4},function(){G.draft.reply='really really SAME. Next Thursday?';sfx('good');},{wait:1.6},['S','I regret nothing. I regret a little.']]}
  ]}
 ],outside({title:'WHAT SANNA READ',dur:'duration: 3 seconds',cap:'A message from a friend. She smiled at her phone on the bus.',anim:'text'}),[
  calm,
  ['S','Forty minutes of editing.'],
  ['H','Three seconds of reading.'],
  ['S','That seems inefficient.'],
  ['H','That’s what I keep saying.'],
  function(){G.draft=null;}
 ]);}

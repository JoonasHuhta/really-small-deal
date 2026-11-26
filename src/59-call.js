/* ================= The call. (Moment, 0.99.30): one haircut, booked by phone ================= */
// The opposite of The reply: no edits, no drafts, a live voice. Ekskyysmi writes a script with fourteen branches (the paper is
// readable: six lines, large); the real call takes forty-one seconds and leaves the script, twice. The human's first words are
// "sorry to bother you", which is more or less Ekskyysmi's name. The receptionist finds that funny, warmly.
// It ends the way calls end here: several byes each, which the choice that makes itself handles.
function drawCallScript(){
  var g=G,c=g.call;if(!c||!c.script||g.set!=='home'||g.out)return;
  ctx.save();ctx.translate(752,170);ctx.rotate(0.025);
  var w=250,h=170;ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(-w/2+5,-h/2+6,w,h);
  ctx.fillStyle='#f6f1e4';ctx.fillRect(-w/2,-h/2,w,h);ctx.fillStyle='#c9553f';circ(0,-h/2+6,4);ctx.fill();
  ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillStyle='#2b2733';ctx.font='800 16px system-ui,sans-serif';ctx.fillText(tr('SCRIPT · VERSION 14'),-w/2+14,-h/2+24);
  var L=['1. Hello. Sorry to bother you.','2. One haircut, please.','2a. If busy: apologise, hang up.','2b. If “your name?”: say it.','14c. If she laughs: ———'];
  ctx.font='600 15px system-ui,sans-serif';
  for(var i=0;i<L.length;i++){ctx.fillStyle=i===4?'#c9553f':'#3a3744';ctx.fillText(tr(L[i]),-w/2+14,-h/2+54+i*24);}
  if(c.off){ctx.strokeStyle='#c9553f';ctx.lineWidth=4;ctx.lineCap='round';line(-w/2+8,h/2-10,w/2-8,-h/2+38);}   // off script
  ctx.restore();
}
function stepCall(){var g=G;if(g.call&&g.call.live&&g.set==='home')g.phoneN=Math.max(g.phoneN||0,2);}   // the phone stays in hand for the whole call
MFRONT.push(drawCallScript);MSTEP.push(stepCall);
function labCall(){return labScene({set:'home',title:'The call.',plan:'Book one haircut.',clock:18*3600+55*60}).concat([
  function(){var g=G;g.call={script:false,live:false,off:false};g.noCup=true;},
  ['N','18:55. The salon closes at seven. The hair has reached the eyes. They only take calls.'],   // evening: the room at home is always lamp-lit
  set({mood:'alert',s:1.3}),
  ['S','Only calls. No form. No app. A live human voice.',{look:'stunned'}],
  ['S','I’ve written a script.'],
  function(){G.call.script=true;sfx('card');},{wait:0.8},
  ['S','Fourteen branches. If she’s busy. If she’s annoyed. If she says “and your name?”.'],
  ['H','What’s 14c?'],
  ['S','Don’t worry about 14c.'],
  function(){var g=G;g.call.live=true;g.buzz=0.6;sfx('pop');},
  ['N','It rings.'],
  {choice:[
    {t:'Hang up before anyone answers.',m:'hide',then:[
      ['S','Hung up. Safe. We can try again tomorrow. Or in March.'],
      function(){G.buzz=0.9;sfx('pop');},{wait:0.8},
      ['N','The phone rings. It is the salon. Calling back.'],
      set({mood:'scared',s:1.6}),
      ['S','They’re calling BACK. That’s an escalation.']]},
    {t:'Let it ring. Hold the script.',m:'stay',then:[
      ['S','Steady. Line one. Line one. Line one.']]},
    {t:'Read the whole script once more. Faster.',m:'worst',then:[
      ['S','Hello-sorry-to-bother-you-one-haircut-if-busy-apologise-if—']]}
  ]},
  ['P','“Hair by Hanna, good morning!”'],
  ['H','Hi— sorry to bother you—'],
  ['P','“Bother me? This is the bothering phone. Go ahead!”'],
  set({mood:'surprised',s:1.1}),
  ['S','She’s not in the script.'],
  ['H','One haircut, please.'],
  ['P','“Same as last time?”'],
  function(){G.call.off=true;sfx('nope');},
  set({mood:'scared',s:1.5}),
  ['S','There’s no branch for “same as last time”! Was last time good? Does she REMEMBER us?'],
  {choice:[
    {t:'“Yes. Same.” Trust the past.',m:'stay',then:[
      ['H','Yes. Same.'],
      ['P','“Lovely. Bit off the top, leave the ears.”'],
      ['S','She remembers our EARS.']]},
    {t:'“Something different.” Become a new person.',m:'worst',then:[
      ['H','Something different.'],
      ['P','“Ooh. How different?”'],
      ['S','We don’t know! We were never meant to get this far!'],
      ['H','…A bit shorter.'],
      ['P','“Bold. I love it.”']]},
    {t:'“Whatever’s easiest for you.”',m:'please',then:[
      ['H','Whatever’s easiest for you.'],
      ['P','“Easiest for me is you telling me. Same as last time it is.”']]}
  ]},
  ['P','“Thursday at four?”'],
  ['H','Yes. Thank you.'],
  ['P','“See you then! Bye-bye-bye-bye.”'],
  set({mood:'alert',s:1.2}),
  ['S','Four byes. How many do we send back?'],
  {auto:{opts:['Bye.','Bye-bye.','Bye-bye-bye-bye.'],pick:2,secs:1.9}},
  ['H','Bye-bye-bye-bye.'],
  function(){var g=G;g.call.live=false;g.phoneN=0;}
 ],outside({title:'WHAT THE CALL WAS',dur:'duration: 41 seconds',cap:'One haircut, Thursday at four. Nobody was bothered. Eight byes in total, which is normal here.',anim:'text'}),[
  calm,
  ['S','Forty-one seconds. I wrote fourteen branches.'],
  ['H','You used one.'],
  ['S','Line one. “Sorry to bother you.”'],
  ['H','She liked that one.'],
  ['S','…That sentence is my whole job.',{look:'soft'}],
  ['H','I know.'],
  function(){G.call.script=false;},
  ['S','Filing the script. Branch 14c, still unused.'],
  ['H','Good.']
 ]);}

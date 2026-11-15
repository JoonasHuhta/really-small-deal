/* ================= Lab: The voice message. Fourteen takes of “hi”. ================= */
function take(n,line,verdict){return [
  function(){G.rec={take:n,on:true,t:0};addLived('takes, deleted',n>3?40:4);sfx('pick');},
  ['H',line],
  function(){G.rec.on=false;sfx('nope');},
  ['S',verdict]
];}
function drawRec(){
  var r=G.rec,x=24+HUDL,y=22,w=250,i;
  ctx.fillStyle='rgba(14,12,20,.78)';rr(x-10,y-12,w+20,44,8);ctx.fill();
  ctx.font='800 12px system-ui,sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
  var blink=r.on&&(RM||Math.floor(G.time*2.5)%2===0);
  ctx.fillStyle=r.on?'#e0563e':'#8b8070';if(blink||!r.on){circ(x+5,y,5);ctx.fill();}
  ctx.fillText((r.on?'REC':'DELETED')+' · TAKE '+r.take,x+18,y);
  for(i=0;i<34;i++){var a=r.on?(RM?0.5:Math.abs(Math.sin(G.time*9+i*1.7))*0.5+Math.abs(Math.sin(G.time*3.1+i*0.6))*0.5):0.08;
    ctx.fillStyle=r.on?'#e9e2cf':'#5a5560';ctx.fillRect(x+i*7.4,y+17-a*7,4,2+a*14);}
}
function labVoice(){return labScene({set:'home',title:'The voice message',plan:'Reply to a voice message.',clock:19*3600+40*60}).concat([
  ['N','Sanna has sent a voice message. Forty seconds. Cheerful. It ends with “anyway, how are you?”'],
  ['H','I’ll just send one back.'],
  set({mood:'alert',s:1.3}),
  ['S','A voice message. Your actual voice. Recorded. Kept.']
 ],take(1,'“Hi! It’s me.”','She knows it’s you. It says your name on it. Delete.'),
  take(2,'“Hey Sanna, thanks for your message—”','“Thanks for your message.” Are you her bank? Delete.'),[
  {choice:[
    {t:'Sound more relaxed. Rehearse relaxing.',then:take(3,'“Heyyy.”','Too relaxed. You sounded like you were lying down. Delete.')},
    {t:'Write a script first. Two drafts.',then:take(3,'“Dear Sanna.”','You read the greeting out loud. Delete.')},
    {t:'Open with a laugh. People like a laugh.',then:take(3,'“Ha— hi.”','That wasn’t a laugh. That was a hiccup with ambitions. Delete.')}
  ]},
  function(){G.rec={take:9,on:true,t:0};G.clock+=11*60;},
  ['N','Take nine. Halfway through, a dog barks next door.'],
  function(){G.rec.on=false;sfx('nope');},
  ['S','Now she’ll think we have a dog. We’d have to GET a dog. Delete.'],
  function(){G.rec={take:14,on:false,t:0};G.clock+=9*60;},
  ['H','This is take fourteen.'],
  ['S','Fifteen is the one. I can feel it.'],
  ['H','Her message has a kettle boiling in it. She says “um” six times.'],
  set({mood:'surprised'}),
  ['S','…Six?'],
  ['H','I counted. On the second listen.'],
  ['S','And on the first?'],
  ['H','On the first I just thought: oh, nice. It’s Sanna.'],
  {wait:1.3},
  set({mood:'worry',s:1.1}),
  {choice:[
    {t:'Send take one. The one with “It’s me.”',then:[['P','You: ● voice message, 0:04']]},
    {t:'Send take fourteen. The one with the sigh.',then:[['P','You: ● voice message, 0:11'],['S','The sigh stays in? Bold.']]},
    {t:'Send a thumbs-up and move to the countryside.',then:[['H','No.'],['P','You: ● voice message, 0:09']]}
  ]},
  function(){G.rec=null;},
  {wait:1.2},
  ['P','Sanna: “Ha, lovely to hear your voice! Lunch tomorrow?”']
 ],outside({title:'WHAT SANNA HEARD',dur:'duration: a few seconds, at 1.5× speed',cap:'A friend saying hi. She was making tea.',anim:'text'}),[
  calm,
  ['S','One and a half times speed.'],
  ['H','Everyone does.'],
  ['S','Fourteen takes. And she listened to it FAST.'],
  ['H','Next time, one take.'],
  ['S','Two. One for safety.']
 ]);}

/* ================= Secret Santa. and Leaving. (Moments, 0.99.30): the office Christmas party ================= */
// 0.99.37 (Joonas 27.11.): Secret Santa. joins the story after the library (#15b), A FRIDAY, LATE NOVEMBER: a Finnish office
// party is in November, and Snow indoors. two scenes later has "a little November on the sill". Not now. (#11) comes first,
// so the shadow's “only allowed to drop one. On purpose.” is a callback the player has seen. Leaving. stays a Moment.
// Two moments on one evening, like Quiet. and Evenings.
// Secret Santa.: a present is a piece of you, opened in public. You drew Riitta. Her face says nothing ("Socks."), and then
// one of the eleven things her shadow juggles falls on its own (in Not now. it may drop only one, on purpose: this one
// falls by itself). She has been cold since September. Riitta gets one human line, in her own short way.
// Leaving.: the two ways out of a party, and the fear under both: that leaving interrupts, and that nobody notices. Someone does.
function partyRoom(){
  room(false,true);
  ctx.strokeStyle='#6f7d6c';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-10,54);ctx.quadraticCurveTo(W/2,104,W+10,54);ctx.stroke();   // bunting
  var cols=['#c9553f','#e2b04a','#62887f','#f4eedb'];
  for(var i=0;i<17;i++){var u=i/16,x=-10+u*(W+20),y=54+(1-Math.pow(2*u-1,2))*25;ctx.fillStyle=cols[i%4];ctx.beginPath();ctx.moveTo(x-11,y);ctx.lineTo(x+11,y);ctx.lineTo(x,y+20);ctx.closePath();ctx.fill();}
}
SETS.party=partyRoom;
// the present, in Riitta's hands: wrapped, then a pair of grey wool socks
// 0.99.40 (Joonas 27.11.: "a hand under the socks, so she holds them"): while the present is out, Riitta's arm comes forward
// and her hand is under it (person() reach, elbow down by her side). The present is drawn after her, over her fingers.
function santaHand(){var g=G,s=g.santa;if(!s||g.set!=='party'||g.out||!g.cowR||Math.abs(g.rx-(g.rxT==null?g.rx:g.rxT))>2)return null;
  return {x:g.rx-(s.open?35:32),y:FEETY-(s.open?83:77),ex:g.rx-21,ey:FEETY-64};}
function drawSanta(){
  var g=G,s=g.santa;if(!santaHand())return;
  var x=g.rx-34,y=FEETY-92;
  if(!s.open){ctx.fillStyle='#c9553f';rr(x-15,y-12,30,24,3);ctx.fill();ctx.fillStyle='#e2b04a';ctx.fillRect(x-2,y-12,4,24);ctx.fillRect(x-15,y-2,30,4);
    ctx.beginPath();ctx.ellipse(x-5,y-15,6,3.5,-0.5,0,Math.PI*2);ctx.ellipse(x+5,y-15,6,3.5,0.5,0,Math.PI*2);ctx.fill();return;}
  // 0.99.40 (Joonas 27.11.: "the socks look odd in her hand; one sock, or the two close together"): a pair as it comes from
  // the shop, one sock just behind the other, feet the same way (out, toward the two of them), held together by a paper band.
  var sock=function(sx,sy,col,rib){ctx.fillStyle=col;rr(sx,sy,10,23,3);ctx.fill();rr(sx-7,sy+16,17,8,4);ctx.fill();
    ctx.fillStyle=rib;for(var j=0;j<3;j++)ctx.fillRect(sx+2+j*3,sy+1,1.2,5);};
  sock(x-4,y-19,'#80868d','#9196a0');sock(x-8,y-15,'#9aa0a6','#b3b8be');
  ctx.fillStyle='#c9553f';ctx.fillRect(x-9,y-6,16,5);ctx.fillStyle='#e2b04a';ctx.fillRect(x-9,y-4.5,16,1.2);
}
MFRONT.push(drawSanta);
function labSanta(){return labScene({set:'party',title:'Secret Santa.',plan:'Give one present.',clock:16*3600+40*60}).concat([
  function(){var g=G;g.santa={open:false};g.noCup=true;g.cowA=true;g.ax=g.axT=800;g.aFace=-1;g.cowB=true;g.bx2=g.bxT=880;g.bFace=-1;},
  hat('party'),
  ['N','The office Christmas party. Secret Santa. Ten-euro limit. You drew Riitta.'],
  set({mood:'alert',s:1.3}),
  ['S','Riitta. Of all the names in the hat.'],
  ['H','It was a bowl.'],
  ['S','Of all the names in the BOWL.'],
  ['S','The present is wrapped. The card is not written. The card is where they get you.'],
  {choice:[
    {t:'“Merry Christmas! No pressure to like it.”',m:'please',f:function(){G.santa.card='please';},then:[
      ['S','A disclaimer. Legally sound. Emotionally airtight.']]},
    {t:'“Merry Christmas. Receipt inside.”',m:'worst',f:function(){G.santa.card='receipt';},then:[
      ['S','If she returns it, it was our idea first.']]},
    {t:'“Merry Christmas.”',m:'stay',f:function(){G.santa.card='plain';},then:[
      ['S','Two words. No armour. Brave. Horrifying.']]}
  ]},
  function(){var g=G;g.cowR=true;g.rx=1010;g.rxT=640;g.rPhone=false;},
  riittaArrives,
  ['N','Riitta opens it. In front of everyone. Slowly.'],
  function(){G.santa.open=true;sfx('flutter');},{wait:0.9},
  lensHold(function(){return {x:G.rx,y:FEETY-170};},'MOUTH: LEVEL. VERDICT: PENDING.'),{wait:1.6},lensOff,
  ['R','Socks.'],
  set({mood:'scared',s:1.6}),
  ['S','“Socks.” With a FULL STOP.',{loud:1}],
  function(){G.wT=1;},{wait:1.4},
  ['S','…Her shadow is juggling. Eleven things. None of them is her face.'],
  function(){G.wDrop={t:0};sfx('drip');},{wait:1},
  set({mood:'surprised',s:1.1}),
  ['W','Oh. That one fell on its own.'],
  ['S','I thought you were only allowed to drop one. On purpose.'],
  ['W','I am. This was her feet.'],
  ['R','I’ve been cold since September.'],
  {wait:0.8},
  ['R','Thank you. Really.']
 ],outside({title:'WHAT RIITTA THOUGHT',dur:'duration: one sock',cap:'Wool. Somebody noticed I am always cold. I have no idea how to say that at a party.',anim:'text'}),[
  calm,
  ['H','She liked them.'],
  ['S','She said “socks”.'],
  ['H','That’s how she says she likes them.'],
  function(){var c=G.santa.card;return [['S',c==='receipt'?'And the receipt?':c==='please'?'And the disclaimer?':'And the card?']].concat(
    c==='receipt'?[['H','She put it in her pocket. With the socks.']]:c==='please'?[['H','She read it twice. I think it made her laugh.']]:[['H','She kept it.']]);},
  ['S','…I’m going to need a Riitta dictionary.'],
  ['H','Two words so far.'],
  ['S','“Socks.” “Really.” It’s a start.'],
  hat(null)
 ]);}
function labLeaving(){return labScene({set:'party',title:'Leaving.',plan:'Go home.',clock:21*3600+40*60}).concat([
  function(){var g=G;g.leave={way:null};g.noCup=true;g.human.x=g.human.xT=HOME;g.cowA=true;g.ax=g.axT=620;g.aFace=1;g.cowB=true;g.bx2=g.bxT=740;g.bFace=-1;g.cowR=true;g.rx=g.rxT=860;},
  hat('party'),
  ['N','21:40. The party is still going. You are done.'],
  set({mood:'alert',s:1.2}),
  ['S','There are two ways out of a party.'],
  ['S','Say goodbye to everyone, and interrupt eleven conversations.'],
  ['S','Or leave without a word, and find out nobody noticed.'],
  set({mood:'worry',s:1.4}),
  ['S','The second one is worse. I’ve checked.'],
  {choice:[
    {t:'Goodbye to everyone. Individually.',m:'please',f:function(){G.leave.way='all';},then:[
      ['H','Bye, Eero.'],
      ['B','Oh! Bye!'],
      ['H','Bye, Riitta.'],
      ['R','Mm. Bye.'],
      ['N','Four goodbyes later, Eero is somehow in front of you again.'],
      ['H','…Bye, Eero.'],
      ['B','Bye again!'],
      ['S','Twice. We’ve said goodbye to Eero twice. He’ll remember that.']]},
    {t:'One wave to the whole room.',m:'stay',f:function(){G.leave.way='wave';},then:[
      ['N','You wave to the room in general.'],
      ['S','A wave to a room is a wave to nobody. Nobody can wave back to a room.']]},
    {t:'Leave without a word. Briskly.',m:'hide',f:function(){G.leave.way='quiet';},then:[
      {hold:{kind:'pull',secs:2.6}}]}
  ]},
  function(){G.human.xT=-90;G.human.back=true;},{wait:1.4},
  scene({set:'busstop',clock:21*3600+47*60}),
  function(){var g=G;g.human.x=g.human.xT=380;g.noCup=true;},hat('party'),
  ['N','Outside. Sleet. The bus stop. The party, faintly, through a window.'],
  set({mood:'worry',s:1.2}),
  ['S','Nobody has called after us. So nobody noticed. I have that in writing.'],
  ['H','You have it in nothing.'],
  function(){var g=G;g.phoneN=4;g.buzz=0.9;},
  function(){var w=G.leave.way;return [['P',w==='all'?'Sanna: “You said bye to Eero twice, I counted. Get home safe x”':w==='wave'?'Sanna: “Saw your wave! Get home safe x”':'Sanna: “Did you just leave?? Missed you already. Get home safe x”']];},
  set({mood:'surprised',s:0.9}),
  ['S','…Somebody noticed.',{look:'soft'}],
  ['S','That’s the nicest thing that’s ever been reported to me.']
 ],outside({title:'WHAT THE PARTY NOTICED',dur:'duration: one minute',cap:'Someone went home at 21:40. Sanna noticed at 21:41.',anim:'text'}),[
  calm,
  ['H','You’re still wearing the hat.'],
  ['S','I was going to wear it home. In case anyone else missed us.'],
  hat(null),
  ['S','…Fine. Hat off. Party over. It was a good party.']
 ]);}

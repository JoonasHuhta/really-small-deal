/* ================= Plus one. (Moment, 0.99.24): a third person joins lunch ================= */
// From the RSD book review (26.11.): when a third person joins, someone can drop out of the conversation without anybody
// doing anything wrong. Inside, the table grows longer with every line between the other two and the human slides down it.
// Size stays the shadow's job (the human never shrinks); the table is the feeling. Outside: a table for four, nobody moved.
// Sanna notices on her own (her depth), and Eero has his own version of the same thing: he fills the gaps the human measures.
function canteen(){room(false,true);}   // the break room at lunch, without the lamp table in front: the long table is the furniture here
function plusSlide(n){return function(){var g=G;g.plus.hx=[470,370,270,170][n];g.plus.n=n;if(n)sfx('grow');};}
function stepPlus(dt){var g=G,p=g.plus;if(!p||g.set!=='canteen')return;var Hm=g.human;Hm.x=ease(Hm.x,p.hx,(RM?6:1.5)*dt);Hm.xT=Hm.x;}   // no steps: the table carries the human away
function drawPlusTable(){
  var g=G,p=g.plus;if(!p||g.set!=='canteen'||g.out)return;
  var l=g.human.x-50,r=(g.cowB&&Math.abs(g.bx2-g.bxT)<2?Math.max(g.ax,g.bx2):g.ax)+50,y=FEETY-74,i;
  ctx.fillStyle='#7a5c3e';var legs=Math.max(2,Math.round((r-l)/240)+1);
  for(i=0;i<legs;i++){var lx=l+12+(r-l-24)*i/(legs-1);ctx.fillRect(lx-4,y+10,8,FEETY-y-10);}   // a longer table, more legs
  ctx.fillStyle='#a07a52';rr(l,y,r-l,12,3);ctx.fill();ctx.fillStyle='#8a6845';ctx.fillRect(l+3,y+10,r-l-6,4);
  var bowls=[g.human.x,g.ax].concat(g.cowB&&Math.abs(g.bx2-g.bxT)<2?[g.bx2]:[]);
  for(i=0;i<bowls.length;i++){ctx.fillStyle='#fffdf6';ctx.beginPath();ctx.ellipse(bowls[i]+6,y-2,16,6,0,Math.PI,0);ctx.fill();ctx.fillStyle='#d9b25a';ctx.beginPath();ctx.ellipse(bowls[i]+6,y-5,12,2.5,0,0,Math.PI*2);ctx.fill();}
}
SETS.canteen=canteen;MSTEP.push(stepPlus);MFRONT.push(drawPlusTable);
function labPlusOne(){return labScene({set:'canteen',title:'Plus one.',plan:'Have lunch with Sanna.',clock:12*3600+6*60}).concat([
  function(){var g=G;g.plus={hx:470,n:0};g.human.x=g.human.xT=470;g.cowA=true;g.ax=g.axT=600;g.aFace=-1;},
  ['N','12:06. Lunch with Sanna. A table for two, which is the best size of table.'],
  ['A','I got the last two chairs. Strategic.'],
  ['H','Very.'],
  set({mood:'calm',s:0.8}),
  ['S','This is going well. I have nothing to add. That’s how well.',{look:'pleased'}],
  set({cowB:1,bx:710,bFace:-1}),{wait:1.6},
  ['B','Mind if I join? Every other table is full of Accounts.'],
  ['A','Of course! Pull up a chair.'],
  plusSlide(1),set({mood:'alert',s:1}),{wait:1},
  ['N','Eero pulls up a chair. The table becomes slightly longer than tables become.'],
  function(){G.aFace=1;},
  ['B','Did you see the finale?'],
  ['A','DON’T. I watched it twice.'],
  ['B','The DOG.'],
  ['A','The DOG!'],
  plusSlide(2),set({mood:'worry',s:1.25}),{wait:0.9},
  ['S','We haven’t seen it. We’re out.',{quiet:1}],
  ['H','I can listen.'],
  ['B','And the brother, with the boat—'],
  ['A','With the BOAT. I know.'],
  ['S','A gap. There. After “boat”.'],
  {choice:[
    {t:'Jump in: “What boat?”',m:'stay',then:[
      ['H','What bo—'],
      ['B','—and then the LIGHTHOUSE!'],
      ['S','Overlap. He won. He didn’t know it was a race.']]},
    {t:'Too small. Wait for a better gap.',m:'hide',then:[
      ['S','That gap was the size of a comma. We need a full stop. Ideally a paragraph.']]},
    {t:'Laugh along. Slightly late.',m:'please',then:[
      ['H','Ha.'],
      ['S','One second after everyone. That second is now on file.']]}
  ]},
  plusSlide(3),set({s:1.5}),{wait:1},
  ['N','The table is now roughly the length of a short train.'],
  ['S','At this rate we’ll be having lunch in the corridor.'],
  function(){G.aFace=-1;},{wait:1},
  ['A','You went quiet. Good quiet?'],
  set({mood:'surprised',s:1.1}),
  ['S','She saw. From all the way down there.'],
  {choice:[
    {t:'“Good quiet.” Smile. A small fib.',m:'hide',then:[
      ['H','Good quiet.'],
      ['A','Hm. I’ll ask again after the dog.'],
      ['S','She booked a follow-up.']]},
    {t:'“I haven’t seen it.”',m:'stay',then:[
      ['H','I haven’t seen it.'],
      ['A','Oh! Then we stop. Eero. No more.'],
      ['B','I was only going to say the dog lives.'],
      ['A','EERO.']]},
    {t:'“I’ve been counting the gaps.”',m:'worst',then:[
      ['H','I’ve been counting the gaps.'],
      ['A','How many?'],
      ['H','Four. All closed.'],
      ['A','Next one’s yours. I’ll hold it open.']]}
  ]},
  plusSlide(0),set({mood:'calm',s:0.9}),{wait:1.2},
  ['B','Sorry. I talk too much when there’s three. Two, I’m fine. Three, I panic and fill it.'],
  ['H','I go quiet.'],
  ['B','Between us that’s about right.'],
  ['A','Between the two of you, that’s one excellent conversationalist.']
 ],outside({title:'WHAT IT LOOKED LIKE',dur:'duration: one lunch',cap:'Three people at a table for four. Two talking, one listening. Nobody moved. Nobody meant anything by it.',anim:'text'}),[
  calm,
  ['S','It was a normal table, wasn’t it.'],
  ['H','It was.'],
  ['S','It felt like a train.'],
  ['H','It did.'],
  ['S','He was filling the gaps. I was measuring them.'],
  ['H','Same department?'],
  ['S','…Same building. Different floors.']
 ]);}

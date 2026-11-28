/* ================= The bag. (lab clone of Thursday 18:40, TYOSUUNNITELMA 11) ================= */
// The question it tests: does Thursday's turn land harder when it has a physical trigger?
// A whole day of holding the face, then the really small deal that breaks is not even social. It is a bag.
// The human turns on the shadow. The explosion is shown from outside (the neighbour), never from inside.
// Comedy before and after, none during. Ekskyysmi never agrees with the self-hatred, and offers no fix.
// “(Say nothing.)” is on the menu and still greyed out: this is before Thursday rewrites the job.
function spill(){crumbs();sfx('hit');}
// 0.99.67: the crisps burst out of the bag in the human's hands and land on the floor, where they stay. Before this they were
// drawn as tics (the captions that drift upwards), so for a minute every crisp floated slowly to the ceiling.
function crumbs(){var g=G,from={x:g.human.x+16,y:FEETY-66};g.torn=true;for(var k=0;k<16;k++)g.tics.push(tic('',from.x-60+Math.random()*260,FEETY-2+Math.random()*12,{at:k*0.03,life:600,size:9+Math.random()*5,col:k%3?'#e2b04a':'#c9553f',from:from,spin:k*1.3}));}
function labBag(){return labScene({set:'home',title:'The bag.',plan:'Eat something. Then the evening.',clock:18*3600+39*60,snacks:1}).concat([
  function(){var g=G;g.torn=false;g.human.grin=3;g.human.x=g.human.xT=560;g.morko.sT=1.2;},
  ['N','18:39. Home. The face from work is still on.'],
  ['S','Day report: five yeses. One “no worries!”. A smile, held for nine hours.',{look:'pleased'}],
  ['S','No incidents. I’d call that a clean shift.'],
  ['H','My face is still doing it.'],
  ['S','Leave it on. We might see someone.'],
  ['H','I’m in my kitchen.'],
  ['S','Exactly. Anyone could look in.'],
  ['H','I just want to eat one thing.'],
  lensPeek({x:641,y:363},'BAG: “EASY OPEN”.'),
  ['S','It says easy. That’s a promise. In writing.',{look:'squint'}],
  ['N','The bag does not open.'],
  ['S','Advice incoming. I have three approaches.'],
  {choice:[
    {t:'From the top. Confidently. Like you belong.',then:[['N','The top stretches. It does not open.'],['S','It can smell hesitation.']]},
    {t:'Teeth. Nobody is watching.',then:[['H','You said anyone could look in.'],['S','…From the top, then.'],['N','The bag does not open.']]},
    {t:'Scissors. Like a professional.',then:[['H','They’re in the other room.'],['S','Then the bag wins by forfeit. Unacceptable.'],['N','The bag does not open.']]}
  ]},
  set({mood:'alert',s:1.5}),
  ['S','Pull harder. But calmly. Harder AND calmer.'],
  ['H','I am pulling.',{quiet:1}],
  ['S','Pull like someone who has never once been told the summary is too long.'],
  {wait:0.5},
  spill,hit(1,'P'),set({sweat:0.8}),
  ['N','The bag opens. All of it. Everywhere.'],
  ['S','Okay. Okay. Floor crisps are still crisps, technically, if we—'],
  ['H','Stop.',{loud:1}],
  ['S','I’m HELPING. I have a whole plan for the floor.',{loud:1}],
  ['H','You’ve helped ALL DAY. Every yes was you. This face is you.',{loud:1}],
  shadowHit,{wait:1.6},
  ['H','Why am I LIKE this.'],
  set({mood:'worry',s:0.9}),
  ['S','…',{quiet:1}],
  {choice:[
    {t:'Defend myself. Calmly. With a list.',then:[['S','In fairness, point one—'],['H','I SAID STOP.',{loud:1}]]},
    {t:'Fix it. Fetch a bowl. Fetch a plan.',then:[['S','There’s a bowl in the—'],['H','I don’t want a BOWL.',{loud:1}]]},
    hush()
  ]}
 ],outside({title:'WHAT THE NEIGHBOUR HEARD',dur:'duration: under a minute',cap:'A cupboard door. Twice. Then nothing.',anim:'text'}),[
  scene({set:'home',clock:18*3600+46*60,snacks:1}),
  function(){var g=G;g.torn=true;g.human.grin=0;g.human.x=g.human.xT=560;g.morko.sT=0.9;g.morko.mood='worry';},
  ['N','18:46. Crisps on the floor. The face has stopped.'],
  {hold:{kind:'stay',secs:4,text:'Staying. Both of you. Nobody fixing anything.'}},
  ['H','…Sorry.'],
  ['H','I wasn’t shouting at the bag.'],
  ['S','I know. I was there all day.',{quiet:1}],
  {wait:1.2},
  ['H','I hate that I’m like this.'],
  ['S','I don’t.',{quiet:1}],
  {wait:1.6},
  ['S','…The bag won, though.',{look:'up'}],
  ['H','The bag won.'],
  {wait:0.8}
 ]);}

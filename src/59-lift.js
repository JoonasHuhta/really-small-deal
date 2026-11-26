/* ================= The lift. (Moment, 0.99.25): three floors with Eero, and his shadow ================= */
// Monday (#2): "Eero takes the lift for a REASON?" – "Everyone's got something." – "Does Eero have one of me?" – "Probably.
// A smaller one. In a cardigan." Sometime.: his shadow runs on a watch with no hands. The epilogue already has this lift.
// Here the two humans say one word each and the two shadows talk. Eero's reason is a preference, told by his shadow, never a
// condition: on the stairs people come the other way and you have to decide; in a lift everyone faces the doors.
// Riitta gets on for one floor (her shadow juggles eleven things, none of them you). Then two polite people miss their floor.
function liftFloor(n,up){return function(){var g=G;g.lift.floor=n;g.lift.up=up;g.lift.ding=0.6;sfx('ui');};}
function stepLift(dt){var l=G.lift;if(!l||G.set!=='lift')return;if(l.ding>0)l.ding=Math.max(0,l.ding-dt);l.doors=ease(l.doors||0,l.doorsT||0,(RM?8:2.6)*dt);}
function liftDoors(on){return function(){G.lift.doorsT=on?1:0;sfx(on?'ui':'turn');};}
// 0.99.27: the doors at the back actually open, onto a corridor with the floor painted on the wall, and close again.
// The same room as the epilogue's lift: without a Moment's lift state it is drawn exactly as before.
function liftRoom(){
  epiLift();var l=G.lift;if(!l||G.epi)return;var o=clamp(l.doors||0,0,1);if(o<0.01)return;
  var top=60,bot=WALLY,gap=230*o;
  ctx.fillStyle='#d8dccf';ctx.fillRect(250,top,460,bot-top);ctx.fillStyle='#b8bda7';ctx.fillRect(250,bot-40,460,40);
  ctx.fillStyle='#c9cfbf';ctx.fillRect(250,bot-46,460,6);
  ctx.fillStyle='#6f7f73';ctx.font='800 64px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(l.floor),480,150);
  ctx.fillStyle='#64816a';ctx.beginPath();ctx.ellipse(612,bot-74,12,26,-.3,0,Math.PI*2);ctx.ellipse(630,bot-82,12,28,.3,0,Math.PI*2);ctx.fill();ctx.fillStyle='#c78d71';ctx.fillRect(606,bot-56,30,16);   // a plant, as every floor has
  ctx.fillStyle='#a3aaae';ctx.fillRect(250,top,230-gap,bot-top);ctx.fillRect(480+gap,top,230-gap,bot-top);
  ctx.strokeStyle='#6f767b';ctx.lineWidth=3;ctx.strokeRect(250,top,460,bot-top);line(480-gap,top,480-gap,bot);line(480+gap,top,480+gap,bot);
  ctx.strokeStyle='#5e6569';ctx.lineWidth=5;line(270,300,690,300);   // the handrail, as before
}
SETS.lift=liftRoom;
function drawLiftPanel(){
  var g=G,l=g.lift;if(!l||g.set!=='lift'||g.out)return;
  ctx.fillStyle='#2b2f33';rr(722,140,46,90,6);ctx.fill();
  ctx.fillStyle=l.ding>0?'#fff0c0':'#e8b04a';ctx.font='700 22px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.fillText(String(l.floor),745,178);
  ctx.beginPath();if(l.up){ctx.moveTo(745,196);ctx.lineTo(737,208);ctx.lineTo(753,208);}else{ctx.moveTo(745,208);ctx.lineTo(737,196);ctx.lineTo(753,196);}ctx.closePath();ctx.fill();
}
MSTEP.push(stepLift);MFRONT.push(drawLiftPanel);
function labLift(){return labScene({set:'lift',title:'The lift.',plan:'Get to the fourth floor.',clock:8*3600+51*60}).concat([
  function(){var g=G;g.lift={floor:1,up:true,ding:0,doors:0,doorsT:0};g.noCup=true;g.human.x=g.human.xT=330;g.cowB=true;g.bx2=g.bxT=470;g.bFace=1;},
  ['N','8:51. The lift. Eero. Three floors of each other.'],
  ['B','Morning.'],
  ['H','Morning.'],
  ['N','That was the conversation. It is complete.'],
  set({mood:'calm',s:0.9}),
  function(){var g=G;g.yx=g.yxT=548;g.yT=1;},{wait:1.4},
  ['S','…Is that his shadow?',{look:'squint'}],
  ['Y','Morning! Lovely lift. Is it Tuesday?'],
  ['S','Thursday.'],
  ['Y','Already? Gosh. Where does it go.'],
  ['S','Can I ask you something? Professionally.'],
  {choice:[
    {t:'Ask: it’s people, isn’t it. It’s always people.',m:'worst',then:[
      ['Y','Oh, he likes people. One at a time. Facing the same way.']]},
    {t:'Don’t ask. Stand very still until floor four.',m:'hide',then:[
      {wait:1.2},
      ['Y','You were going to ask. Your eyes are very loud.']]},
    {t:'Ask nicely. Shadow to shadow.',m:'stay',then:[
      ['S','Why does he take the lift?'],
      ['Y','Nobody’s asked me that before. How nice.']]}
  ]},
  ['Y','The stairs have people on them. Coming the other way. You have to pick a side, and say something, or not say something.'],
  ['Y','In a lift, everybody faces the doors. Nobody has to decide anything.'],
  set({mood:'surprised'}),
  ['S','…That’s a very good reason.'],
  ['Y','I know. He likes the lift. I came up with the reason later.'],
  liftFloor(2,true),liftDoors(true),{wait:0.9},
  function(){var g=G;g.cowR=true;g.rx=1010;g.rxT=610;g.rPhone=false;},
  ['N','Floor 2. The doors open. Riitta.'],
  riittaArrives,liftDoors(false),
  set({s:0.55,mood:'worry'}),
  function(){G.wT=1;},
  ['R','Morning.'],
  ['H','Morning.'],
  ['B','Morning.'],
  ['N','Three people. Three shadows. Everyone faces the doors.'],
  ['Y','She has eleven things.',{quiet:1}],
  ['S','I can see them.',{quiet:1}],
  ['Y','None of them are us.',{quiet:1}],
  ['S','…That’s weirdly relaxing.',{quiet:1}],
  liftFloor(3,true),liftDoors(true),{wait:0.7},
  ['R','This is me.'],
  function(){var g=G;g.rxT=1100;g.wT=0;},{wait:1.2},
  function(){G.cowR=false;},liftDoors(false),{wait:0.6},
  set({s:0.9,mood:'calm'}),
  ['Y','He likes you, you know.'],
  ['S','Who?'],
  ['Y','Eero. He says you’re easy to be quiet with.'],
  ['S','Quiet is… a compliment?',{look:'stunned'}],
  ['Y','In here it’s the best one.'],
  archive('good',[['THE LIFT','Easy to be quiet with.']]),{wait:2.2},closeArchive,
  liftFloor(4,true),liftDoors(true),{wait:0.9},
  ['B','This is us.'],
  ['H','After you.'],
  ['B','No, no. After you.'],
  {choice:[
    {t:'Step out. Decisively.',then:[
      ['H','Right.'],
      ['B','Right.'],
      ['S','Both at once. The doors took that as a no.']]},
    {t:'Wait for him to go first.',then:[
      ['S','He’s waiting for us to go first.'],
      ['S','This could take years.']]},
    {t:'Say “after you” again. Warmer.',then:[
      ['H','After you.'],
      ['B','No, really, after YOU.'],
      ['S','He matched our warmth. It’s a stand-off.']]}
  ]},
  liftDoors(false),{wait:1},
  ['N','The doors close. The lift, which has seen this before, goes back down.'],
  liftFloor(3,false),{wait:0.4},
  ['Y','Lovely. More lift.']
 ],outside({title:'WHAT IT LOOKED LIKE',dur:'duration: 40 seconds',cap:'Two colleagues in a lift. One “morning” each. They missed their floor being polite.',anim:'text'}),[
  calm,
  ['S','We missed our floor.'],
  ['H','We did.'],
  ['S','Being polite.'],
  ['H','Both of us.'],
  ['Y','Same time tomorrow?'],
  ['S','Is it Tuesday?'],
  ['Y','No idea. Lovely.']
 ]);}

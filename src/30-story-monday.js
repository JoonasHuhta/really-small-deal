/* ================= the script (all player-facing text) ================= */
var FEAR={
 1:{t:'“Oh” as in “oh no. It’s you.”',m:'worst',
    a:[['S','She saw you and her whole morning went “oh”. You are the “oh” in her day.'],['H','I’m also the “hi”.'],['S','The “hi” was legally required.']],
    b:'By lunchtime the whole floor says “oh”. By Friday, the building. They’ll name the sound after you.',
    walk:'By now the whole building says “oh”. There’s a memo.'},
 2:{t:'“Oh” as in “I forgot you existed.”',m:'worst',
    a:[['S','You are so forgettable she had to reload you.'],['H','She said hi within a second.'],['S','A full second. To remember a colleague of three years.']],
    b:'Soon they forget your desk. Someone puts a plant on it. The plant gets invited to lunch.',
    walk:'The plant has your desk now. The plant went to lunch.'},
 3:{t:'She knows about the email from 2019.',m:'worst',
    a:[['H','What email?'],['S','You signed it “Love,”. To Facilities.'],['H','Nobody remembers that.'],['S','I remember it every night at 3 a.m. That is what I’m FOR.']],
    b:'It’s been forwarded. There’s a group chat. It’s called “Love, Facilities”.',
    walk:'The group chat has a logo now.'}
};
function fearChoice(){
  var out=[];[1,2,3].forEach(function(k){var F=FEAR[k];
    out.push({t:F.t,m:'worst',filed:1,f:function(){G.fear=k;G.morko.sT=2.1;G.morko.mood='stern';},
      then:F.a.concat([set({s:2.2}),['S',F.b],{stretch:true}])});});
  return out;
}
function scIntro(){return [
  set({clr:1}),
  // Said to the human, not to the player: they have known each other since a Tuesday when the human was seven.
  // The introduction is a morning ritual (a formality, and formalities are how nothing goes wrong); the player overhears it.
  ['S','Ekskyysmi. Informal head of keeping things from getting awkward. Reporting for duty.'],
  ['H','You don’t have to introduce yourself every morning. You live on my wall.'],
  ['S','It’s a formality. Formalities are how nothing goes wrong.'],
  ['S','My job is simple. Keep you from being rejected. By anyone. Ever.'],
  set({hud:1}),
  ['H','And my job?'],
  ['S','Coffee. I’ll handle the catastrophes.'],
  ['H','Then handle lunch. I’m asking her out loud.'],
  set({plan:1,mood:'alert',s:1.3}),
  ['S','…Out LOUD?'],
  ['H','Suggest something. I’ll decide.'],
  ['S','You usually do. It’s a flaw in the system.'],
  {choice:[
    {t:'Rehearse the sentence. Forty times.',m:'draft',then:[['H','“Would you like to get lunch.”'],['S','You sounded hungry. Desperate, even. Again.'],['H','It’s lunch. Hunger is on topic.']]},
    {t:'Locate the exits.',m:'hide',then:[['S','Door. Window. Cupboard under the sink.'],['H','I’m not hiding under the sink.'],['S','Not with that attitude.']]},
    {t:'Schedule a meeting about whether to ask.',m:'draft',then:[['H','With whom?'],['S','Us. Closed session. No catering.'],['H','I’m asking before you invent a subcommittee.']]}
  ]},
  set({clr:1,s:1,mood:'calm'}),
  set({cowB:1,bx:880}),{wait:1.7},
  ['B','Morning! You’re quiet today.'],
  ['H','Morning.'],
  ['B','You know what you need? To push yourself out of your comfort zone more!'],
  hit(0.55,'B'),{wait:1.1},
  ['S','…Out of the WHAT?'],
  ['S','We haven’t SEEN the comfort zone since 2016.'],
  ['H','I think he’s being nice.'],
  ['S','You are in a room. With a person. Holding a hot drink AND a conversation. This IS the expedition.'],
  {choice:[
    {t:'Tell him about the supermarket.',f:function(){G.advice=1;},then:[['S','Four hundred and twelve visits. It is still a supermarket. Tell him.'],['H','I’m not telling him about the supermarket.']]},
    {t:'Deploy the nod.',m:'please',f:function(){G.advice=2;},then:[['H','Deploying.']]},
    {t:'Ask where HIS comfort zone is. For later.',f:function(){G.advice=3;},then:[['S','Get an address.'],['H','No.'],['S','A postcode, then.']]},
    {t:'Show him some teeth. Small ones.',f:function(){G.advice=4;G.morko.mood='stern';G.morko.sT=2.3;},then:[['H','Wait—']]}
  ]},
  set({clr:1}),
  function(){return G.advice===4?scBite():[
    ['H','…Thanks. I’ll look into it.'],
    // The human’s own clumsiness, with no help from the wall: not everything is Ekskyysmi. Friday catches it (scFri).
    ['B','Enjoy the coffee!'],
    ['H','You too.'],
    {wait:0.7},
    ['S','He doesn’t HAVE a coffee.'],
    ['H','I know.'],
    ['S','I didn’t do that one. That was all you.',{look:'squint'}]
  ].concat(outside({title:'FROM THE OTHER SIDE OF THE ROOM',dur:'4 seconds',cap:'Two nods. One sip. One “you too”. A perfectly ordinary pause.',anim:'nod'},4.4),[
    calm,
    ['S','Rejection prevented.'],prevent('nodded'),
    ['H','That wasn’t a rejection.'],
    ['S','And it stays that way.']
  ]);}
 ];}
function scBite(){return [
  ['H','Maybe YOUR comfort zone could use a walk, Eero.'],
  set({bFace:-1}),{wait:0.7},
  ['B','…Ha. Fair.']
 ].concat(outside({title:'FROM THE OTHER SIDE OF THE ROOM',dur:'3 seconds',cap:'One slightly sharp joke. Eero laughed a beat too late.',anim:'bite'},4.4),[
  calm,set({pose:'selfmouth',mood:'scared',s:1.3}),
  ['S','…Did we just bite Eero?'],
  ['H','We bit Eero.'],
  ['S','Eero is SOFT. Eero owns a cardigan.'],
  set({pose:null,mood:'worry'}),
  ['S','I was defending us. From advice.'],
  ['H','He was being nice.'],
  ['S','I know that NOW. Two seconds ago he was a predator.'],
  function(){G.bit=true;}
 ]);}
function scSanna(){return [
  set({clr:1,cowA:1,ax:780,cowB:1,bx:880,hud:1,plan:1,mood:'alert',s:1.2}),
  ['S','Here she comes. Remember: casual. Like someone who has lunch all the time.'],
  {wait:0.9},set({aFace:-1,clr:1}),look,
  ['A','oh, hi.'],
  {qte:true},
  function(){return G.qteWon?scResponded():scSpiral();}
];}
function scSpiral(){return [
  set({aFace:1}),hit(1,'A'),archive('bad',[['2011','Waved back at someone who was waving at someone else.'],['2016','Said “you too” when the waiter said “enjoy your meal”.'],['2019','Signed an email “Love,”. To Facilities.']]),{wait:1.4},['N','Ekskyysmi opens the archive. All of it. At once.'],closeArchive,
  set({rate:0.03}),
  ['S','Okay. We missed the window. Nobody panic. I’ve reviewed the “oh”.'],
  ['H','It was a greeting.'],
  ['S','It was a verdict. I just need to work out which one.'],
  {choice:fearChoice},
  ['S','—and after that we—'],
  frozen,{wait:0.9},
  ['S','…Is that me?'],
  ['H','That’s you.'],
  hide,
  function(){return G.warningSize<2.6?
    [['S','That’s my SMALL warning?'],['H','It has shoulders.'],['S','For carrying the concern.']]:
    G.warningSize<3.3?
    [['S','I’m ENORMOUS. Why did nobody say.',{loud:1}],['H','You were presenting.']]:
    [['S','I appear to have become a load-bearing concern.'],['H','Mind the ceiling.'],['S','The ceiling should mind ME.']] ;},
  pokka,
  ['S','Anyway. I was demonstrating scale.'],
  free,
  ['H','It’s been two seconds.'],
  ['S','A lot can happen in two seconds. I just did all of it.'],
  ['S','Recommendation.'],
  {choice:[
    {t:'Become furniture. Very convincing furniture.',filed:1,m:'hide',preview:'hold',f:function(){G.leak='grow';},then:[['H','For how long?'],['S','Until retirement.'],prevent('furniture',1)]},
    {t:'Study the cup. It has excellent manners.',filed:1,m:'hide',preview:'cover',f:function(){G.leak='cover';},then:[['H','It’s a cup.'],['S','Not one personal remark.'],prevent('cup',1)]},
    {t:'A strategic exit. We can come back.',filed:1,m:'hide',preview:'pull',f:function(){G.leak='exit';},then:[['H','My coffee’s still here.'],['S','A convincing alibi.'],prevent('door',1)]},
    {t:'…Say “hi” back. I’ll stay right here.',filed:1,m:'stay',preview:'comfort',f:function(){G.leak='none';},then:[['S','I reserve the right to wobble.'],['H','You can wobble.']]}
  ]},
  function(){var l=G.leak;G.lines=[];return l==='grow'?[{hold:{kind:'still',secs:2.6}}]:l==='cover'?[{hold:{kind:'cover',secs:3}}]:l==='exit'?[{hold:{kind:'pull',secs:3}}]:[];},
  {wait:0.9},
  function(){return outside({title:'WHAT THE OTHERS SAW',dur:'duration: 2 seconds',cap:OUTCAP[G.leak],anim:G.leak},5.2);},
  function(){var g=G;g.rate=1;calm();if(g.leak==='cover'&&g.day==='C')g.morko.pose='cover';if(g.leak==='grow'&&g.day!=='A')g.human.face='stiff';},
  {wait:0.6},
  function(){return LATER[G.day+'_'+G.leak]();},
  {wait:0.8},
  function(){return scWalk();}
];}
var OUTCAP={none:'A pause. Then a “hi”, just after the moment had moved on.',grow:'Stood very still. Then a slightly too loud hi, to nobody in particular.',cover:'Looked into the cup until the moment had passed.',exit:'Left. The coffee stayed.'};
function lunch(n){return function(){G.lunch=n;};}
var CTAIL={
  seen:[set({s:1.1,mood:'care',anx:0.05}),['S','…I didn’t make that one up.'],['H','No.'],set({pose:'comfort',face:'down'}),['S','I’d like it noted that I don’t enjoy being right.'],['H','Noted.']],
  cover:[['H','What did they say?'],['S','…Weather. They said weather.'],['H','You’re a terrible liar.'],set({pose:null,mood:'care'}),['S','They said: no need to ask the others.'],set({pose:'comfort',face:'down'}),['H','…Okay.'],['S','I’d have covered it forever. I only have the two hands.']],
  exit:[['N','Only the empty room heard that. The shadow would call it a win. It doesn’t feel like one.']]
};
function cDay(tail){return function(){return [set({aFace:1}),['A','Lunch? No need to ask the others, right?'],['B','No need.'],leave,{wait:1.4},function(){G.real=1;}].concat(CTAIL[tail],[lunch(0)]);};}
var LATER={
 A_none:function(){return [set({aFace:1}),['A','Eero, lunch? The noodle place?'],['B','Starving.'],leave,{wait:1.4},['H','…Hi.'],['N','The “hi” arrives. Nobody is left to receive it.'],set({mood:'worry'}),['S','It took us four minutes to agree on “hi”.'],['H','It took them four seconds to go to lunch.'],['S','Different departments.'],lunch(0)];},
 A_grow:function(){return [set({ax:640,aFace:-1}),{wait:1.1},['A','You okay? You look like you’ve seen something big.'],['H','Nothing big.'],said,set({st:'pokka'}),['S','I’m medium. At most.'],set({st:'free'}),['A','Okay! We’re off to lunch. See you!'],set({ax:780,aFace:1}),leave,{wait:1.2},['S','Rejection prevented.'],['H','She said “see you”.'],['S','Not “come with us”. I noticed.'],['H','I was standing like a wardrobe.'],['S','A very convincing wardrobe. Nobody invites a wardrobe.'],lunch(0)];},
 A_cover:function(){return [set({near:1,aFace:-1}),{wait:1.2},['A','I waved just now.'],['H','I was looking at the cup.'],['A','Ha. Good cup. Anyway, we’re heading to lunch!'],set({aFace:1}),leave,{wait:1.2},['S','She likes the cup.'],['H','She went to lunch.'],['S','With the cup’s blessing.'],['H','Without me.'],set({mood:'worry'}),['S','…The cup didn’t mention that part.'],lunch(0)];},
 A_exit:function(){return [set({aFace:-1}),['A','Oh. Gone?'],['B','Left the coffee, though.'],['A','Shame. I was going to ask about lunch.'],leave,{wait:1},['N','In the corridor, a shadow records one more rejection prevented. Nobody had been planning one.'],lunch(0)];},
 B_none:function(){return [['S','Good. We said hi. Eventually. Let’s never speak again.'],['H','I’m going to ask.'],['S','Don’t.'],set({flinch:0.6,pose:'selfeyes'}),['H','Sanna, do you want to—'],set({pose:null,aFace:1}),['A','Eero! Wait up, I’m coming!'],leave,{wait:1.3},['H','—get lunch.'],['N','The question arrives at an empty doorway. It was a good question.'],set({mood:'worry'}),['S','She didn’t hear it.'],['H','No.'],['S','So technically she didn’t say no.'],['H','Technically nobody said anything.'],lunch(0)];},
 B_grow:function(){return [set({ax:640,aFace:-1}),{wait:1.1},['A','Hey, I was going to— …never mind.'],set({ax:780,aFace:1}),['A','Eero, let’s just go.'],leave,{wait:1.2},['S','Rejection prevented.'],set({face:'neutral'}),['H','She was about to say something.'],['S','And now she can’t. You’re welcome.'],{wait:0.7},set({mood:'worry'}),['S','…You’re welcome?'],lunch(0)];},
 B_cover:function(){return [set({aFace:1}),['A','Looks busy. Maybe another day.'],['B','Shame.'],leave,{wait:1.2},['S','For the record, I saw a hand go up.'],['H','When?'],['S','While I was covering your eyes.'],['H','…'],set({mood:'worry'}),['S','In my defence, the cup was extremely safe.'],lunch(0)];},
 B_exit:function(){return [set({aFace:-1}),['A','Oh. Already gone.'],['B','Maybe not a lunch person.'],leave,{wait:1},['N','In the corridor, a shadow records one more rejection prevented.'],lunch(0)];},
 C_none:cDay('seen'),C_grow:cDay('seen'),C_cover:cDay('cover'),C_exit:cDay('exit')
};
function realObs(){
  var g=G;
  if(g.lunch===1)return [['S','For the record. We had lunch.'],['H','We did.'],['S','Because you answered inside the window.'],['H','Because I said hi.'],['S','Those are the same thing and I resent it.']];
  if(g.day==='A')return [['S','For the record, she wasn’t being cold. I’ve rewatched it.'],['H','You said the “oh” was a verdict.'],['S','I said a lot of things. Quickly.'],['P','Sanna: “Missed you at lunch! The noodle place has a new spicy one. Tomorrow?”'],set({mood:'surprised'}),['S','She MISSED us?'],['H','She missed me.'],['S','Same thing. I’m attached.'],['P','You: “Tomorrow!”'],function(){G.lunch=2;}];
  if(g.day==='B'){
    var opening=g.leak==='exit'?
      [['S','We left before she could say anything.'],['H','So we don’t actually know.'],['S','I had a very detailed guess.']]:
      g.leak==='grow'?
      [['S','She started a sentence. We never got the rest.'],['H','We could ask.'],['S','Without a reconstruction of the incident?']]:
      g.leak==='none'?
      [['S','You asked. Out loud. To a doorway.'],['H','I could ask again. Somewhere with a person in it.'],['S','Risky. People are in it.']]:
      [['S','Her hand went up. I saw that much.'],['H','While I was studying the cup.'],['S','The cup has declined to comment.']];
    return opening.concat([['P','You: “Lunch tomorrow?”'],['P','Sanna: “YES. I never know if you want company.”'],set({mood:'surprised'}),['S','…She thought WE didn’t want HER?'],function(){G.lunch=2;}]);
  }
  if(g.leak==='exit')return [['S','We left. I don’t know what happened after that.'],['H','I still felt left out.'],['S','I’d like to fill in the missing bits.'],['H','Let’s call someone first.'],['P','You: “Rough day. Call?”'],['P','Reply: “Calling.”'],set({pose:'comfort'}),['S','Can I come?'],['H','You’re attached to my feet.']];
  return [['S','They said: no need to ask the others. That happened. I’m not doing a bit.'],['H','I know.'],['P','You: “Rough day. Call?”'],['P','Reply: “Calling.”'],['S','…Who is that?'],['H','Someone who asks.'],['S','I’d like to vet them.'],['H','You’ve met. You hid.']];
}
function walkMenu(done){return function(){
  var g=G,o=[];
  if(!done.oh)o.push({t:'Review the “oh”. Again.',m:'worst',f:function(){done.oh=1;g.w.speed=0;g.morko.sT=1.7;g.morko.mood='stern';},then:function(){return [
    ['S','Exhibit A. I’ve had it restored.'],
    replay(1),['A','oh, hi.'],['S','Note the comma.'],['H','People don’t say commas.'],
    replay(2),['A','ohhh. …hi.'],['S','Enhanced. Look at the eyebrows.'],['H','You drew those.'],['S','I RESTORED those.'],
    replay(3),['A','OH.  …  hi.'],['S','Director’s cut. With the audience.'],['H','There was no audience.'],['S','There’s always an audience. It just sits in here.'],
    ['S',FEAR[g.fear].walk],frozen,{wait:0.8},['S','…I’ve scared myself with my own cut.'],
    function(){G.rep=null;free();},
    ['H','Can we watch the original?'],['S','The original is very boring.']
   ].concat(outside({title:'THE ORIGINAL TAPE',dur:'duration: 2 seconds',cap:'Sanna said hi. Nobody else was in the room. Literally nobody.',anim:'tape'}),[
    ['S','…It’s shorter than I remember.'],['H','It’s two seconds.'],['S','Mine has an intermission.'],
    function(){g.morko.sT=1;g.morko.mood='calm';g.clock+=8*60;g.w.late+=8;g.w.speed=34;},
    ['H','That took eight minutes.'],['S','Of a nine-minute walk. Efficient.']]);}});
  if(!done.real)o.push({t:'Mention what I actually saw.',m:'stay',f:function(){done.real=1;g.reflected=true;g.morko.mood='care';},then:function(){return realObs().concat([set({mood:'calm',face:'neutral'})]);}});
  if(!done.zone)o.push({t:'Bring up the comfort zone thing.',f:function(){done.zone=1;g.morko.mood='stern';},then:[
    ['H','Mm.'],['S','I’ve done the maths. Today: one break room, two conversations, one lunch decision. Three expeditions. Eero took the lift.'],
    ['H','He means well.'],['S','He means well from INSIDE his comfort zone. It has a sofa.'],set({mood:'calm'})]});
  if(g.bit&&!done.mika)o.push({t:'Apologise to Eero. I’ve drafted something.',m:'draft',f:function(){done.mika=1;g.morko.mood='worry';},then:[
    ['S','Twelve paragraphs. One diagram. A small poem about cardigans.'],['H','I’ll send one line.'],
    ['P','You: “Sorry I was snappy this morning. Comfort zone advice hits a nerve.”'],{wait:1.2},
    ['P','Eero: “Ha, no, fair. I take the lift for a reason.”'],
    set({mood:'surprised'}),['S','…Eero takes the lift for a REASON?'],['H','Everyone’s got something.'],
    ['S','Does Eero have one of me?'],['H','Probably. A smaller one. In a cardigan.'],set({mood:'calm'})]});
  o.push({t:'We can walk while I’m still worried.',m:'stay',f:function(){done.stop=1;},then:[{wait:0.8},['S','I may bring up the comma again.'],['H','I know. Keep walking with me.']]});
  done.n=(done.n||0)+1;
  return o;
};}
function scWalk(){
  var done={};
  function moreWalk(){return done.stop?[]:[{choice:walkMenu(done)},moreWalk];}
  return [startWalk,oneLampGap,{wait:2.6},
    ['S','Right. Debrief. I’ve prepared slides.'],
    ['H','Please don’t have slides.'],
    ['S','Two. Slide one: the full stop.'],
    ['S','Slide two: she said hi first. Irrelevant. Filed.',{quiet:1}],
    keep('hi'),
    {choice:walkMenu(done)},
    moreWalk,
    function(){var w=G.w;w.xT=HOMEX;w.speed=Math.max(60,(HOMEX-w.x)/2.6);G.lines=[];},
    {wait:3},
    function(){G.clock=G.w.start+(9+G.w.late)*60;},
    ['S','I’m not entirely finished worrying.'],
    ['H','You can come in anyway.'],
    set({mood:'care',s:1.1}),
    ['S','…Is there toast?'],
    ['H','There’s toast.'],
    {wait:0.5},
    showEnd
  ];
}
function startWalk(){
  var g=G,M=g.morko;
  g.lines=[];g.band=null;g.cur=null;g.cowA=g.cowB=false;g.cupLeft=false;g.gazeT=g.gaze=0;g.darkT=g.dark=0;g.out=null;
  g.human.x=g.human.xT=400;g.human.back=false;g.human.gone=false;g.human.face='neutral';g.human.flinch=0;g.human.sweat=g.human.sweatT=0;g.human.blush=0;g.human.puddle=0;g.cards=[];
  M.st='free';M.pose=null;M.sT=1;M.mood='calm';g.anx=0.15;g.rate=0;g.clock=16*3600+42*60;g.card=2.6;
  g.cz=1.025;g.cx=W/2;g.cy=H/2;
  g.w={x:0,xT:HOMEX-270,speed:34,start:g.clock,late:0};g.tics=[];g.carsSeen=[];music('walk');
}

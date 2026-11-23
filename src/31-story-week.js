/* ================= the week: chapters 2–5 ================= */
// `day` is what the card says. The weekdays are flavour; nothing insists they belong to the same week.
var CHAPTERS=[null,{day:'A MONDAY',title:'Oh, hi.',wd:'MONDAY'},{day:'A TUESDAY',title:'Quick chat?',wd:'TUESDAY',music:'tuesday'},{day:'A WEDNESDAY',title:'Could you just…',wd:'WEDNESDAY'},{day:'A THURSDAY',card:'THURSDAY, 17:30',title:'Seen.',wd:'THURSDAY'},{day:'A FRIDAY. NOT NECESSARILY THAT ONE.',title:'Oh, hi. Again.',wd:'FRIDAY'}];
// The day stamp (top left): the weekday and the clock, so a cut to the next morning reads as one (Joonas 20.11.).
var WEEK=['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
function nextDay(d){var i=WEEK.indexOf(d);return i<0?null:WEEK[(i+1)%7];}
var RIITTA={body:'#7a6a9c',hair:'#cfc8ba'};
function dayName(n){return CHAPTERS[n].title;} // kept under its old name: the title is what menus show now
function scene(o){return function(){
  var g=G,M=g.morko,Hm=g.human;if(!g.epi)epiChrome(false);   // the panel comes back with the next real scene
  music(o.music||g.chapMusic||o.set||'room');   // a chapter with its own song keeps it across its scenes
  if(o.day!==undefined)g.dayTag=o.day;else if(o.clock!=null&&g.clock!=null&&o.clock<g.clock-3600)g.dayTag=nextDay(g.dayTag);   // past midnight: the next day
  g.stampT=0;
  g.set=o.set||'room';g.w=null;g.out=null;g.lines=[];g.band=null;g.cur=null;g.stamp=null;g.finalFrame=false;g.choiceWho='S';g.chap=null;
  g.cowA=g.cowB=g.cowR=false;g.zT=g.zShow=0;g.yT=g.yShow=0;g.wT=g.wShow=0;g.wDrop=null;g.toss=null;g.dropped=null;g.bick=0;g.ax=g.axT=1010;g.bx2=g.bxT=1090;g.rx=760;g.rxT=null;g.rPhone=false;g.aFace=-1;g.bFace=-1;g.aWave=false;g.cupLeft=false;
  Hm.x=Hm.xT=HOME;Hm.gone=false;Hm.back=false;Hm.face='neutral';Hm.flinch=0;Hm.sweat=Hm.sweatT=0;Hm.blush=0;Hm.grin=0;Hm.puddle=0;g.aSweat=0;g.cards=[];g.rep=null;g.zoom=null;g.boss=null;g.ninja=false;g.rBrow=0;g.tics=[];g.dish=null;g.kitchen=false;g.lens=null;g.bar=null;g.rec=null;g.draft=null;g.lib=null;g.qte=null;g.jolt=null;
  M.st='free';M.pose=null;M.coat=null;M.wobble=null;M.asleep=false;M.wake=1;M.dim=null;Hm.pose=null;Hm.reach=null;Hm.wet=false;g.five=null;g.ninja=false;g.morko.hat=null;g.journal=null;g.mugQuiet=false;g.tiredForce=0;g.note=null;g.selfStamps=0;g.form=null;g.auto=null;g.dots=null;g.tape=null;g.mugFx=null;g.cctv=null;g.drawer=false;g.camRate=null;g.hidS=null;g.night=null;g.bed=false;g.dawn=0;g.pie=null;g.plain=false;g.paper=null;g.lampOff=false;g.tableShot=false;g.basket=false;g.sat=false;M.sT=o.s||1;M.mood=o.mood||'calm';g.anx=0.12;g.gazeT=0;g.darkT=0;g.rate=1;g.bigNote=null;
  if(o.clock!=null)g.clock=o.clock;if(o.cowR)g.cowR=true;g.snacks=!!o.snacks;g.torn=false;g.gapWalk=false;g.gapOnce=false;
  g.cz=1.025;g.cx=W/2;g.cy=H/2;g.fade=1;g.fadeRate=1.6;g.skippable=false;g.noCup=!((g.set==='room'||g.set==='office')&&(o.clock==null||(o.clock>=7*3600&&o.clock<12.5*3600)));g.phoneN=0;g.mugFixed=true;M.asleep=false;Hm.facing=1;Hm.sipT=0;
};}
function begin(n,o){return [function(){G.chapMusic=CHAPTERS[n].music||null;},scene(o),function(){
  var g=G;g.dayTag=CHAPTERS[n].wd;g.stampT=0;g.chapter=n;g.moment=null;if(!g.day0||g.day0.label!==CHAPTERS[n].day)newDay();g.planText=o.plan;g.label=CHAPTERS[n].title;g.hud=true;g.plan=true;g.fade=0;
  g.morko.s=1;g.morko.off=-70;g.chap={day:CHAPTERS[n].card||CHAPTERS[n].day,title:CHAPTERS[n].title,t:0};saveProgress(n);stopVoice();sfx('card');
 },function(){return n===5?partCard(3):[{wait:2.8}];},function(){G.chap=null;G.fade=1;}];}
// Ekskyysmi's tell: whenever it says it is fine and is not, it shrinks a little, then grows back.
function fib(){var M=G.morko;M.s=Math.max(0.3,M.s-0.07);}
function shadowHit(){var g=G;trigger();addLived('the one that landed',LIVED.shadowHit);sfx('hit');g.pulse=0.9;g.shake=RM?0:0.8;g.lines=[];g.cur=null;g.flash=0.8;g.morko.sT=0.62;g.morko.mood='scared';g.morko.pose=null;g.anx=0.9;g.cz=1.08;g.cx=W/2-30;g.cy=300;}
function yes(){G.yes++;G.human.grin=G.yes;addLived('saying yes, regretting it',30);if(G.mug)drain(1,'saying yes')();}   // every yes costs a sip, down to the last one: only Thursday gets to empty the mug (VISIO V22)

function riittaArrives(){var g=G;return Math.abs(g.rx-g.rxT)>2?[{wait:0.1},riittaArrives]:[];}   // the phone comes out when she has stopped walking
function scTue(){return begin(2,{plan:'Get through Tuesday.',clock:16*3600+55*60}).concat([
  mugOn(4),
  tuesdayOpening,
  // 0.80 (TARINAKARTTA §6, open hole 2): Riitta is seen before she is a message. Busy, not cruel: eleven things, none of them you.
  // 0.94 (Joonas, twice: "why does she appear with a phone, and then vanish?"): she walks in, types where she stands (the dots
  // are over HER phone, three metres from yours) and is gone before the message lands. Busy, not cruel. "She WAS right there."
  function(){var g=G;g.cowR=true;g.rx=1010;g.rxT=830;g.rPhone=false;},
  ['N','Riitta, at the coffee machine. Eleven things on her mind. All of them today.'],
  riittaArrives,function(){G.rPhone=true;},{wait:0.6},
  function(){G.dots={t:0,at:'R'};sfx('pop');},{wait:1.6},
  function(){var g=G;g.dots=null;g.dotsAt=g.time;g.rxT=1090;sfx('dotsOff');},
  ['P','Riitta: “Quick chat tomorrow at 9?”'],
  hit(0.9,'P'),drain(2,'“quick chat?”'),set({sweat:0.7}),{wait:1.2},
  ['S','“Quick.”',{look:'squint'}],
  ['S','Nobody says “quick” about good news. Good news takes its time. Good news has cake.'],
  ['S','And she was RIGHT THERE. Three metres away. She chose to WRITE it.'],
  ['H','It’s probably nothing.'],
  ['S','It’s five words and a question mark. It’s EVERYTHING.'],
  {choice:[
    {t:'We’re being fired. Efficiently.',m:'worst',then:[['S','Nine o’clock. Before the coffee works. So you can’t fight back.'],['H','I’ve never fought back in my life.'],['S','She doesn’t know that. I’ve kept it very quiet.',{look:'pleased'}]]},
    {t:'She found the thing.',m:'worst',then:[['H','What thing?'],['S','I don’t know. That’s what makes it so bad. It could be ANY of the things.'],['H','There are no things.'],['S','There are always things.']]},
    {t:'It’s about Monday.',m:'worst',then:mondayCallback}
  ]},
  set({s:1.4,mood:'alert'}),
  ['S','Reply at once. Show enthusiasm. A professional amount.'],
  {choice:[
    {t:'“Sure!” With the exclamation mark.',m:'draft',then:[['S','Too keen. She’ll smell fear. Take it out.']]},
    {t:'“Sure.” With a full stop.',m:'draft',then:[['S','Too cold. A full stop is a slammed door. Put something back.']]},
    {t:'“Sure” and nothing else. Raw.',m:'draft',then:[['S','No punctuation at all? What are we, feral?']]}
  ]},
  ['P','You: “Sure, 9 works.”'],
  ['S','…You sent it. Without a committee.'],
  ['H','It’s a calendar reply.'],
  ['P','Riitta reacted with a thumbs-up.'],
  ['S','A thumb.',{look:'stunned'}],
  aside(['S','ONE thumb. She has two.']),
  calm,{wait:0.9}
 ]);}

function wedMorning(){return [
  mugOn(2),function(){G.chapMusic='tuesday';music(G.chapMusic);G.tiredForce=1;},
  ['N','03:07.'],
  ['S','Are you awake?'],
  ['H','I am now. It’s three in the morning.'],
  ['S','Out there, yes. In here it’s about Thursday. I did the afternoon twice.'],
  ['S','Good. I’ve prepared your nine o’clock. Three scenarios.',{look:'pleased'}],
  {choice:[
    {t:'Scenario one: “We need to talk about your attitude.”',m:'worst',then:[['S','You say: “I don’t have an attitude.” Which is an attitude.'],['H','I’ll just listen.'],['S','Listening is suspicious.']]},
    {t:'Scenario two: she isn’t angry. She’s disappointed.',m:'worst',then:[['H','Oh no.'],['S','I know. I shouldn’t have said it out loud. Now it’s in the room.']]},
    {t:'Scenario three: while we’re up, the archive.',m:'worst',then:[['S','2011. You waved at someone who was waving at someone else.'],['H','Why do you still HAVE that?'],['S','I keep everything. It’s a safety archive.']]},
    hush()
  ]},
  ['S','And if it’s none of those, I have the full list. Four: she sighs first. Five: she doesn’t sigh, which is worse. Six: there is a biscuit. They soften you up with a biscuit. Seven: the whole department is there. Eight: there is a cake. It says “goodbye”. Your name is spelled wrong. Nine: we correct the spelling. Ten: the correcting is what they remember.',{big:true}],
  ['S','…'],
  ['S','Who said all that?'],
  ['H','You did. It’s blocking the window.'],
  ['S','It’s ENORMOUS. Is that how it comes out?'],
  ['H','Imagine being under it.'],
  set({mood:'worry',s:1}),
  ['S','…I’ll use a smaller font.',{quiet:1}],
  ['H','What time is it?'],
  ['S','Three. The best time. Nobody can reject us at three.'],
  ['H','Nobody can do anything at three. That’s the problem.'],
  shot('push',{who:'H',z:1.3}),['S','…I’ll take the first watch.'],
  ['H','There’s only one watch. It’s you. Every night.'],
  ['S','And yet nobody has ever been rejected in their sleep. You’re welcome.',{look:'pleased'}],
  scene({set:'office',clock:9*3600,cowR:1,s:1.3,mood:'alert'}),set({sweat:1}),
  addTic('The quick chat.',190,62,{life:3.4,size:19}),{wait:1.6},
  refill(1,'some sleep'),
  ['H','This label has been scratching my neck since eight.',{quiet:1}],drain(1,'the label'),
  ['S','One crisis at a time. …Two crises.'],
  ['H','Can you just… handle this one?',{quiet:1}],
  ['S','Full authority?'],
  ['S','I have waited my whole life for that sentence.',{look:'pleased'}],
  shot('two',{who:'R',z:1.35}),['R','Thanks for coming. I’ll be quick.'],
  ['S','“Quick.” Again. Brace.'],
  ['R','The client report was excellent. Really clear.'],
  ['S','Pleasantries. Don’t get comfortable.',{look:'squint'}],
  ['R','And people like working with you. Sanna said so, actually.'],
  ['S','Padding.',{look:'squint'}],
  ['R','One small thing: the summary could be shorter next time.'],
  hit(0.95,'R'),drain(2,'“shorter”'),function(){G.bigNote={text:'SHORTER',t:0};},set({blush:1}),archive('bad',[['YEAR 2','Showed someone a drawing. Somebody laughed.'],['YEAR 4','“Neat handwriting. Could be neater.”'],['2022','Laughed at my own joke. In a meeting. Alone.']]),{wait:1.4},['N','The archive again. Filed by wound.'],closeArchive,
  ['S','THERE it is.',{loud:1}],
  ['S','“Shorter.” The summary is too long. YOU are too long. Your whole deal is too long.'],
  ['R','Otherwise, great work. Keep it up.'],
  ['S','Did she say something just then? I was busy with the wound.'],
  ['H','Why is there a puddle?'],
  ['S','Ignore the puddle. The puddle is MY department.'],
  {choice:[
    {t:'Apologise. For the summary, and in general.',m:'please',f:function(){G.fb='sorry';},then:[['H','Sorry, I— sorry. I’ll fix it. Sorry.'],['R','It’s… fine? It’s one note.']]},
    {t:'Explain why it was long. At length.',m:'please',f:function(){G.fb='explain';},then:[['N','The explanation of why the summary was long takes four minutes.'],['R','…Right. So. Shorter.']]},
    {t:'Go very quiet. Nod. Leave the body.',m:'hide',f:function(){G.fb='quiet';},then:[['H','Mm.'],['R','You okay? You went somewhere.'],['H','Fine. It’s nothing.'],said]},
    {t:'…Ask what “shorter” means.',m:'stay',f:function(){G.fb='ask';},then:[['S','That’s walking TOWARDS it.'],['H','How short is shorter?'],['R','Half a page. That’s all. The content’s great.'],['S','…Half a page. That’s not a character flaw. That’s a measurement.']]}
  ]},
  function(){G.bigNote=null;G.human.sweatT=0;return outside({title:'WHAT RIITTA SAW',dur:'duration: 3 minutes',anim:'text',
    cap:{sorry:'A good review. One note. Four apologies.',explain:'A good review. One note. One long answer about length.',quiet:'A good review. One note. Then nobody home.',ask:'A good review. One note. One question.'}[G.fb]});},
  scene({set:'room',clock:9*3600+12*60}),
  addTic('Back at the desk.',160,62,{life:3,size:19}),{wait:1.2},
  ['H','That went well.'],
  ['S','We were CRITICISED.',{loud:1}],
  ['H','I was praised. Twice. You talked over it.'],
  ['S','You asked me to handle it.'],
  ['H','…I did.'],
  set({mood:'surprised'}),
  shot('close',{who:'S'}),['S','…She said nice things?',{look:'stunned'}],
  ['H','Two. Maybe three.'],shot('wide'),
  ['S','I don’t have those. I only wrote down “shorter”. In capitals. Twice.'],
  ['H','That’s the trouble with your filing system.'],
  ['S','It’s not a filing system. It’s a smoke alarm. It doesn’t have a setting for “nice”.'],
  function(){G.pop={text:'Filed: 1 note. Misplaced: 3 compliments.',t:0};},keep('compliments'),
  refill(1,'three compliments, found'),
  {wait:1.6},
  ['S','…Look at that stapler.',{look:'up'}],
  ['H','What about it?'],
  ['S','Reliable. Closed-mouthed. It has never once said “oh, hi.”'],
  ['S','I’d like it on the team.'],
  ['H','It’s the office stapler. It’s on everyone’s team.'],
  ['S','…Anyway. Doom.'],
  {wait:0.6}
 ];}

function yesMenu(s,extra,extraKey){return {choice:[
  {t:'Say yes.',m:'please',f:yes,then:[['H','Sure.'],['S',s[0]]]},
  {t:'Say yes. Enthusiastically.',m:'please',f:yes,then:[['H','Sure! Happy to!'],['S',s[1]]]},
  {t:'Say yes, and offer something extra.',m:'please',filed:1,f:function(){yes();yes();if(extraKey)G[extraKey]=true;},then:[['H',extra],['S',s[2]]]},
  {t:'No.',off:true}
]};}
function scWed(){
  // Older saves already chose a response to Riitta before reaching this chapter.
  var reviewed=!!G.fb,work={plan:'Do your own work for once.',clock:10*3600+20*60};
  var steps=begin(3,reviewed?work:{set:'home',plan:'Get some sleep.',clock:3*3600+7*60});
  if(!reviewed)steps=steps.concat(wedMorning(),[function(){G.chapMusic=null;},scene(work),function(){G.planText=work.plan;}]);
  return steps.concat([
  // The coffee break after the review ends at two sips. From here the floor is two until Thursday.
  mugOn(2,2),
  ['N','An hour of your own work. Headphones on. Nobody needed anything.'],refill(1,'an hour, headphones on'),
  // VISIO V4: the senses take from the mug too. An open office, a speakerphone, since nine.
  ['N','Then the headphones die. Someone is on speakerphone. Has been since nine.'],drain(1,'speakerphone'),
  ['S','He has said “can you hear me now” forty times. We can. We all can.'],
  set({cowB:1,bx:880}),{wait:1.6},
  ['B','Hey! Quick favour. Could you take my slides for Friday? I’m swamped.'],
  ['H','I’ve got my own—'],
  ['S','Careful. A “no” is a rejection. Of HIM. Then he rejects us back. It’s a rejection exchange programme.'],
  yesMenu(['Clean. Safe. Nobody is upset.','An exclamation mark. Out loud. Bold.','We volunteered for a second thing to apologise for hesitating on the first. Textbook.'],'Sure — and I can do the handout too.','handout'),
  ['B','Legend.'],
  // EKSKYYSMI.md, link 4: the coat is masking. A whole day of yes, disguised as something nobody rejects.
  ['S','Coat on. Nobody rejects a coat.'],coatOn,{wait:0.9},coatButtons,
  shot('close',{who:'B'}),['B','Honestly? I hate presenting. You’re good at it.'],keep('eero'),
  ['S','…He’s afraid of slides.',{quiet:1}],
  shot('wide'),['S','I’m not saying I respect him more. I’m saying I’ve opened a file.'],
  set({cowA:1,ax:780}),{wait:1.4},set({aFace:-1}),
  shot('two',{who:'A'}),['A','Oh — are you coming on Thursday? Board games, my place. Eero’s in.'],
  set({mood:'surprised',s:1.5}),
  ['S','An invitation. A real one. With a day on it.'],
  function(){return G.real?[['S','After Monday? I’m not un-noting Monday.'],['H','Noted. I still want to go.']]:[];},
  ['S','Say yes before she comes to her senses.'],
  ['H','I’d love to.'],yes,shot('wide'),
  set({aFace:1,mood:'calm',s:1.1}),
  ['B','Brilliant. Could you bring the snacks? And maybe drive?'],
  {choice:[
    {t:'Say yes.',m:'please',f:yes,then:[
      ['H','Sure. I can pick you up.'],
      ['S','Snacks AND driving. We are the infrastructure now.']
    ]},
    {t:'Offer the snacks. Leave the lift out of it.',m:'please',then:[
      aside(['S','“I can bring the crisps.” Stop there.',{quiet:1}]),
      ['H','I can bring the crisps.'],
      {wait:1.1},
      ['H','I’m driving past yours anyway.'],
      ['B','Oh! Could you pick me up?'],
      ['H','…Yeah.'],yes
    ]},
    {t:'Say yes, and offer something extra.',m:'please',filed:1,f:function(){yes();yes();G.afterparty=true;},then:[
      ['H','Sure. I’ll pick you up. I could host an afterparty too?'],
      ['S','You offered to host the afterparty of a board game night. There is no afterparty.']
    ]},
    {t:'No.',off:true}
  ]},
  ['S','Look at that. Everyone likes us.',{look:'pleased'}],
  ['H','My face hurts.'],
  ['S','That’s the smile. It’s load-bearing.'],
  ['H','I’m extremely tired.'],
  ['S','Liked AND tired. The classic combination.',{look:'pleased'}]
 ],outside({title:'WHAT THE OTHERS SAW',dur:'duration: 2 minutes',cap:'Someone helpful. Possibly too helpful. Nobody checked.',anim:'nod'}),[
  scene({set:'home',clock:23*3600+15*60}),function(){G.human.grin=0;G.tiredForce=1;},
  ['N','23:15. Eero’s slides.'],
  ['S','Coat’s off. Nobody’s looking.',{quiet:1}],
  ['H','It’s nearly midnight and I’m doing Eero’s slides.'],
  extraWorkCallback,
  ['S','And nobody is angry with us.'],
  ['H','I’m a bit angry with us.'],
  aside(['S','…That doesn’t count. That’s internal.']),
  ['H','It counts.'],
  {choice:[
    {t:'A “no” costs us people.',m:'worst',then:[['S','Every no is a door closing.'],['H','Every yes is me doing slides at midnight.']]},
    {t:'We could get ill. Convincingly.',m:'hide',then:[['S','A light flu. Respectable. Nobody rejects the ill.'],['H','I’m not faking flu to avoid a two-letter word.']]},
    {t:'What if we said… “not this time”?',filed:1,m:'stay',f:function(){G.coatNo=true;},then:[['S','It’s a no in a coat.'],['H','That’s further than you’ve ever gone.'],['S','I feel sick.']]},
    hush()
  ]},
  set({mood:'worry'}),
  shot('push',{who:'H',z:1.28}),['S','I only have the one move, you know. Keep everyone pleased. It works.'],
  ['H','It works on everyone except me.'],
  {wait:1.2},
  function(){G.clock=12*60;G.dayTag='THURSDAY';newDay(CHAPTERS[4].day);G.stampT=0;},   // past midnight: the stamp says so too
  ['N','00:12. The slides are done. The email is written: “Slides for Eero’s talk. He hates presenting, lol. Don’t tell him I said.”'],
  set({mood:'alert',s:1.35}),shot('wide',{rate:9}),
  ['S','Stop. That is going to ALL STAFF.',{loud:1}],
  ['H','It’s going to Eero.'],
  ['S','Eero. Riitta. Sanna. The printer man. Someone called “Board”.'],
  ['H','…Oh no.'],
  ['S','And “he hates presenting” is HIS. We don’t post other people’s files.'],
  ['P','You: (to Eero) “Done. Good luck Friday.”'],
  set({mood:'calm',s:1.1}),
  ['H','…Thank you.'],
  ['S','I do have one useful setting.',{look:'pleased'}],
  ['S','It is just very rarely this one.',{quiet:1}],
  ['H','You look tired.'],
  ['S','I’m not tired. I’m load-bearing.',{quiet:1}],
  {wait:0.8},
  // Joonas 21.11.: the human is not only on the receiving end. A day of yes for everyone else, and the one person who matters
  // gets what is left: "Fine." With a full stop. Ekskyysmi is asleep and files nothing. Sanna's "fine" thread (Night shift,
  // Friday) now has a sender, and Friday repairs it in the human's own words.
  function(){var M=G.morko;M.asleep=true;M.wake=0;M.mood='calm';M.pose=null;},   // asleep = back in the floor shadow (the bar's language)
  function(){var x=G.human.x;G.tics.push(tic('z',x-70,WALLY-150,{life:2.4}));G.tics.push(tic('z',x-58,WALLY-172,{at:0.8,life:2.4}));},
  function(){G.clock=19*60;},['N','00:19. Ekskyysmi has dozed off.'],
  {wait:0.8},
  ['P','Sanna: “Still up?? Game night at mine! You don’t have to bring anything.”'],
  ['P','You: “Fine.”'],drain(1,'“Fine.”'),function(){G.fineSent=true;},
  {wait:1.4},
  ['P','Sanna: “Oh. Okay!”'],
  ['N','The phone goes face down. Nothing gets filed.'],
  {wait:0.8}
 ]);}

var SEEN={
  worries:{t:'Send: “No worries if not!”',m:'please',a:[['P','You: “No worries if not!”'],['S','Casual. Breezy. A person with no worries.'],['H','I have nothing BUT worries. You put them in an exclamation mark.']],
    r:[['P','Sanna: “Phone died!! 7. And there are ALWAYS worries, who are you kidding.”']]},
  cancel:{t:'Send: “Actually, I can’t make it.” Leave before we’re left.',m:'hide',a:[['P','You: “Actually I can’t make it tonight, sorry!”'],['S','Clean. Dignified. She can’t uninvite us now.',{look:'pleased'}],['H','I WANTED to go.'],['S','…I know.']],
    r:[['P','Sanna: “Oh no! Phone died, only just saw this. We’ll miss you.”'],['S','…She would have said yes.',{look:'stunned'}],['H','Yeah.'],['S','I cancelled us out of a yes.'],['P','You: “Ignore that. I panicked. 7?”'],['P','Sanna: “Ha. 7. Bring the panic too.”']]},
  freezer:{t:'Send nothing. Put the phone in the freezer.',m:'hide',a:[['S','It can’t hurt us from in there.'],['H','It’s next to the peas.'],['S','The peas will keep an eye on it.',{look:'pleased'}]],
    r:[['N','A phone is retrieved from the freezer. It has one new message and smells faintly of peas.'],['P','Sanna: “SORRY. Phone died. 7? Bring the snacks, you hero.”']]},
  bite:{t:'Send: “???”. With teeth.',m:'worst',a:[['P','You: “???”'],set({pose:'selfmouth',mood:'scared'}),['S','…That had teeth.'],['H','That was you.'],set({pose:null})],
    r:[['P','Sanna: “??? to you too! Phone died. 7?”'],['S','She bit back. Affectionately. Is that allowed?',{look:'squint'}]]}
};
function scThu(){return begin(4,{set:'home',plan:'Go to board game night.',clock:17*3600+30*60,snacks:1}).concat([
  mugOn(3,0),hat('party'),countBags,{wait:2.8},
  ['S','Snacks: eleven bags. Car: fuelled. Eero: pick up on the way. Hat: festive. I have no notes.',{look:'pleased'}],
  ['P','You: “What time tonight? I’ve got the snacks.”'],
  ['P','Seen 17:31.'],
  {wait:1.0},typingDots(2.4),
  hit(0.6,'P'),drain(1,'seen. no reply.'),set({sweat:0.6}),archive('bad',[['2009','Texted “haha”. Got back “ok”.'],['2018','Group chat went silent after my message. Six minutes.'],['2023','“We should hang out sometime!” We did not.']]),{wait:1.4},['N','The archive, sorted by silence.'],closeArchive,
  ['S','“Seen.”',{look:'stunned'}],
  ['S','She has SEEN it. With her eyes. And chosen silence.'],
  ['S','And she TYPED. I saw the dots. Then she UN-typed.',{look:'stunned'}],
  ['H','Maybe she sneezed.'],
  ['S','For two seconds? Nobody sneezes in paragraphs.'],
  ['H','It’s been one minute.'],
  ['S','A minute is sixty separate decisions not to reply.',{look:'squint'}],
  function(){G.clock=17*3600+52*60;},
  ['N','17:52.'],
  set({s:1.7,mood:'stern'}),
  ['S','Twenty-one minutes. Everyone has seen it. Everyone has—'],
  addTic('(a moth.)',610,170,{life:1.6}),
  ['S','…is that a moth?',{look:'up'}],
  {wait:1.1},
  ['S','WHERE WAS I.',{loud:1}],
  ['H','Twenty-one minutes.'],
  ['S','TWENTY-ONE MINUTES. Thank you. I’ve drafted some follow-ups.'],
  {choice:function(){return ['worries','cancel','freezer','bite'].map(function(k){return {t:SEEN[k].t,m:SEEN[k].m,filed:1,f:function(){G.txt=k;if(k==='bite')G.bit=true;},then:SEEN[k].a};});}},
  function(){G.clock=18*3600+40*60;},
  ['N','18:40. Still nothing.'],drain(1,'an hour of nothing'),
  set({s:2.5,mood:'stern',anx:0.8}),
  ['S','She hates us. Eero hates us. Riitta wants a shorter you. I’ve run the numbers. It’s unanimous.'],
  // The turn has a physical trigger (lab clone “The bag.”, 0.47): a whole week of holding the face, then a bag that won’t open.
  ['H','I’m going to eat something.',{quiet:1}],
  ['S','Good. Fuel. We’ll need it for the list.'],
  {wait:0.9},crumbs,hit(0.9,'P'),
  ['N','EASY OPEN. All of it. Everywhere.'],
  ['S','Floor crisps are still crisps, if we—'],
  // The meltdown (Joonas 20.11.: meltdowns are real). The last sip goes, the mug breaks, the hat flies. Alone at home, at the shadow, never at a person.
  mugBreak('the bag. the last sip.'),hat(null),addTic('(the party hat.)',300,150,{life:1.8}),set({face:'stiff',flinch:1,mood:'surprised'}),
  ['H','STOP! STOP IT! ALL OF IT!',{loud:1,big:1}],
  ['S','I’m PROTECTING you.',{loud:1}],
  ['H','From WHAT? BOARD GAMES?',{loud:1}],
  weekBill,
  ['H','I’m at home with ten bags of snacks and one on the FLOOR.',{loud:1}],
  {wait:1.2},
  ['H','You’re not protecting me. You’re just the loudest thing in the room.'],
  shadowHit,set({sweat:0}),{wait:2.2},
  ['S','…That one landed.'],
  function(){return G.metSannaShadow?[['S','With a full stop.']]:[];},
  {wait:1.5},   // KATSAUS 3: room to think after the hardest line
  set({face:'down'}),
  ['H','Sorry.'],
  fib,
  ['S','No. It’s fine. It’s just— that’s what it’s like.'],
  ['H','What is?'],
  shot('push',{who:'S',z:1.3,rate:0.25}),['S','All of it. Every “oh”. Every “quick chat”. It doesn’t arrive as a note. It arrives as a hit.'],
  ['S','I can’t tell a paper cut from an amputation. They all come in as amputations. So I treat everything as one. It seemed safest.'],
  set({face:'neutral'}),
  ['H','I know. I feel it before you’ve said a word.'],
  ['S','You do?',{look:'soft'}],
  ['H','It’s my chest. You just do the commentary.'],
  ['S','…I thought I was the alarm.',{look:'soft'}],
  ['H','You’re the alarm, the fire brigade, and a man shouting “fire” in a different building.'],
  set({s:0.9,mood:'worry',anx:0.2}),
  {choice:[
    {t:'Then what am I for?',then:[['H','You notice things. You knew I was tired before I did.'],['S','I notice EVERYTHING.'],['H','That’s the good half. People call it “too sensitive”. It’s just sensitive. The volume is the other half.']]},
    {t:'I don’t know how to be smaller.',then:[['H','You don’t have to be smaller. You have to stop driving.'],['S','I can sit in the passenger seat?'],['H','You can do the map.'],['S','I’m excellent at worst-case routes.']]},
    {t:'It’s going to keep happening, isn’t it.',then:[['H','Probably. Tomorrow. Next week.'],['S','And I’ll still go off.'],['H','And I’ll still be here when you’re done.']]}
  ]},
  ['H','How long have you been doing this?'],
  ['S','Since a Tuesday. You were seven.'],
  ['H','What happened?'],
  ['S','You showed someone a drawing.'],
  {wait:1.4},
  ['S','I’ve been on shift ever since.'],
  ['H','That’s a long shift.'],
  ['S','Nobody came to relieve me.',{look:'soft'}],
  set({mood:'care',s:1.1,pose:'comfort'}),shot('wide',{rate:0.8}),
  ['S','I’ve been reviewing my job description.'],
  ['H','And?'],
  function(){G.job={t:0};G.lines=[];stopVoice();sfx('turn');},{wait:4.4},
  function(){G.jobDone=true;G.job=null;easeDay();},
  ['S','I can’t stop it happening. I checked. Extensively.'],
  ['S','But I could stay. When it does.'],
  ['H','Show me.'],
  function(){G.clock=18*3600+41*60;},
  {hold:{kind:'stay',secs:4,clock:1,text:'Staying. Not fixing. Not drafting. Staying.'}},
  ['S','Four minutes of doing nothing. It’s the hardest thing I’ve ever done.'],
  ['H','Same hours?'],
  ['S','Same hours. Fewer exits.'],
  set({pose:null}),
  ['N','The pieces. Glue. Gold, because it was the only glue in the drawer.'],mugMend(1),
  ['S','It’s got seams now.',{quiet:1}],['H','It holds coffee.'],
  function(){return SEEN[G.txt].r;},
  set({mood:'surprised'}),
  ['S','Her phone died.'],
  ['H','Her phone died.'],refill(1,'her phone died'),
  ['S','For over an hour I grieved a battery.',{look:'up'}]
 ],outside({title:'WHAT SANNA SAW',dur:'duration: over an hour',cap:'A dead phone. A long hunt for a charger. Then your message.',anim:'text'}),[
  calm,
  ['H','Coming?'],
  ['S','I’m attached to your feet.'],
  ['H','That’s not what I asked.'],
  ['S','…Yes. I’m coming.',{look:'soft'}],
  {wait:0.8},mugOff   // the mug sits out the rest of the week for now (VISIO V3 continues scene by scene); the gold seams are remembered
 ]);}

// Thursday reads the player’s own week back: the method chosen most often, as one whole sentence (translators get whole lines).
var BILL={worst:'You’ve prepared {n} worst cases this week. None of them happened.',
  draft:'You’ve written {n} scripts this week. I didn’t say one of them.',
  please:'You’ve said yes for me {n} times this week. I meant maybe one.',
  hide:'You’ve taken me out of {n} rooms this week. I wanted to stay in most of them.'};
function fmtN(t,n){return t.replace('{n}',String(n));}
function weekBill(){var m=G.methods||{},best=null;['hide','please','worst','draft'].forEach(function(k){if((m[k]||0)>=3&&(!best||m[k]>m[best]))best=k;});
  return [['H',best?fmtN(BILL[best],m[best]):'You’ve had me apologising to furniture all week.']];}
function wobbleOn(){var m=G.morko;m.wobble={t:0};m.pose='balance';m.mood='worry';G.anx=0.2;}
function wobbleOff(){var m=G.morko;m.wobble=null;m.pose=null;if(RM)updHands(1);}
function scFri(){return begin(5,{plan:'Say the thing.',clock:9*3600+41*60}).concat([
  function(){G.mugMended=true;},mugOn(4),
  set({cowB:1,bx:880}),
  set({sweat:0.45}),
  ['S','Friday. Same room. Same coffee. I’d like to flag that I’m calm.'],
  function(){return G.lab?[]:[['H','You’ve brought the whole archive.'],['S','Just the travel edition.'],aside(['S','It has wheels.'])];},
  ['H','You’re vibrating.'],
  ['H','And I’m sweating.'],
  ['S','Professionally.'],
  ['S','Calmly.'],
  set({cowA:1,ax:780,mood:'alert',s:1.2}),{wait:1.5},set({aFace:-1,clr:1}),look,
  ['A','oh, hi.'],
  qteAuto,{wait:0.45},
  ['H','Hi.'],
  function(){G.qte=null;},
  function(){return G.barStory?[['A',G.barStory==='2011'?'I waved at the wrong person yesterday. Thought of you.':G.barStory==='arms'?'I tried to tell Eero the umbrella story. I needed more arms.':'I saw a tiny umbrella yesterday. Thought of you.'],['H','Oh no.'],['A','In a good way.']]:[];},
  ['S','…That’s not the procedure.',{look:'squint'}],
  ['H','It came out before yours.'],
  set({aFace:1}),hit(0.8,'A'),drain(1,'it still went off'),{wait:1.3},
  ['S','…It still went off. Even though we got it right.'],
  ['H','I felt it.'],
  fridayReflex,
  ['H','I know. Stay.'],
  {hold:{kind:'stay',secs:2.6,text:'Staying. In public. With everyone looking.'}},
  set({pose:null}),
  stampHover,
  ['S','I’ve got a verdict ready. Three, actually. They’re very good.'],
  ['H','I know they are.'],
  stampPutAway,{wait:0.6},
  {choice:[
    {t:'Read the verdict anyway. Quietly.',m:'worst',then:[['S','For the record: she hates us.',{quiet:1}],['H','Noted.'],['S','That’s it? “Noted”?'],['H','You said it. I heard it. We’re still standing here.'],['S','…Huh. It’s smaller once it’s out.',{look:'soft'}],{wait:1.5}]},
    {t:'Hold the verdict. Count to two.',m:'stay',then:[['S','One.'],['S','Two.'],['S','It’s been two seconds and nothing has happened to us.'],['H','I wasn’t sure either.'],['S','I’ll keep the counting finger ready.']]},
    {t:'Stay. Wobble visibly.',m:'stay',then:[wobbleOn,['S','I’m wobbling.'],['H','I can see that.'],['S','In front of people.'],['H','They can’t see you.'],['S','It’s the principle.'],wobbleOff]},
    hush([{wait:1.4},['H','…Did you just not say anything?'],['S','I’m trying it.',{quiet:1}],['S','I can hear the printer. Has it always been this loud?']])
  ]},
  calm,set({aFace:-1,near:1}),
  ['A','You okay?'],
  {choice:[   // Friday ran 37 lines without the player: Ekskyysmi gets a say in the answer (the human still decides)
    {t:'Suggest “nothing”. We have a folder for it.',m:'hide',f:function(){G.friSmall=0;}},   // 0.97 (Codex): a suggestion, since the human answers for themself
    {t:'Suggest it’s something. A small something.',m:'stay',f:function(){G.friSmall=1;}}
  ]},
  ['H','It’s something. Small. Give me a minute.'],
  set({mood:'surprised'}),
  function(){var n=G.nothings||0;return G.friSmall?[['S','…I suggested that. Out loud. On purpose.',{look:'stunned'}],['S','Don’t tell the folder.']]:
    [['S','…That’s not what we say.'],['S',n>1?'We say “nothing”. We’ve said it '+(n===2?'twice':n===3?'three times':n+' times')+' this week. I keep them in a folder.':'We say “nothing”. There’s a folder.']];},
  ['A','Take your minute.'],
  {wait:1.4},
  set({mood:'calm'}),
  ['H','Okay. Can I say something odd?'],
  ['A','Go on.'],
  ['H','When someone says “oh, hi”, my brain hears a verdict. It’s very loud for two seconds. Then I spend a day on it.'],
  ['S','A WEEK. Be accurate.'],
  ['A','…Oh.'],
  ['S','There it is AGAIN—'],
  ['H','Shh.'],
  set({aSweat:0.55,sweat:0}),
  ['A','I do that with “fine”. Someone says “fine” and I’m up till three.'],
  lensPeek(function(){return {x:G.ax,y:FEETY-150};},'SANNA: ALSO UP TILL THREE.'),
  {wait:1.0},
  ['H','…I said “fine” to you once. The night before board games.'],
  ['A','You did. Full stop and everything.'],
  ['S','We did WHAT?',{look:'stunned'}],
  ['H','You were asleep. That one was all me.'],
  ['H','I had nothing left that night. It wasn’t about you.'],
  ['A','…I was up till three.'],
  ['H','I know. Sorry.'],
  ['A','Okay.',{quiet:1}],
  ['A','Thanks for saying it.'],
  {wait:1.0},   // 0.84: her answer gets a moment before anyone explains it; the second gloss (“I file every ’oh’ we get…”) is gone (Codex 22.11.)
  aside(['S','That was a real sorry. Not one of mine.',{quiet:1}]),
  function(){G.zT=1;},{wait:1.6},
  fridayShadow,
  archive('good',[['2026','She told me herself.']]),
  ['S','…Filed. Under the other pile.',{look:'soft'}],
  ['H','There’s another pile?'],
  fib,['S','It’s new.'],closeArchive,
  shot('two',{who:'A',hide:1}),
  ['A','Is that why you used to vanish at lunch? We stopped asking. I thought asking was pressure.'],
  ['H','I thought not being asked was the verdict.'],
  function(){var g=G;   // 0.97 (Codex): she did ask, on the route where the human answered in time; and after a real exclusion her apology says it better
    if(g.lunch===1)return [['A','I’m glad I asked you on Monday.'],keep('askedYes'),shot('crash'),aside(['S','I was against it. For three seconds.'])];
    if(g.real)return [];
    return [['A','I was going to ask you on Monday. You looked busy.'],keep('asked'),shot('crash'),aside(['S','Looking busy was my idea.'])];},
  ['A','So we’ve been being polite AT each other. For a year.'],
  ['S','She says “fine” carefully. Like it might break. Tell her.',{quiet:1}],
  ['H','For the record: when I say “fine”, it’s the good kind.'],
  ['A','…The good kind. Noted.'],
  shot('wide'),
  mondayRepair,
  set({bFace:-1,mood:'alert'}),
  function(){return G.handout?[['B','By the way, thanks for the handout. You didn’t have to do that.'],['S','He says that NOW.'],['H','He didn’t actually ask for it.'],aside(['S','I may have supplied the asking.'])]:[];},
  ['B','Hey! While you’re both here — could you also take my Monday shift?'],
  ['S','Here we go. I’ll get the “sure”.'],
  {choice:[
    {t:'No. (I will wobble.)',m:'stay',f:function(){G.no=true;},then:[function(){return G.coatNo?[['H','It’s a no in a coat, Eero. Not this time.'],['B','…What coat?'],aside(['S','My words. Out in the world.'])]:[['H','Not this time, Eero.']];},set({s:1.5,mood:'scared'}),['S','He’s going to—'],
      // 0.84 (Codex 22.11.): until now this "no" was free ("Oh. Right. I’ll ask Riitta."). A liked person does a slightly unfair thing:
      // he has promised the shift already. Ekskyysmi is right that it gets awkward; the player decides what it does with that; the human keeps the no either way.
      ['B','Oh. I told Riitta you probably could.'],
      ['H','Oh.'],
      set({s:1.9,mood:'scared'}),
      {choice:[
        {t:'Take it back. Quick. Say you can.',m:'please',then:[['S','Say you can. It’s one Monday. It’s ONE Monday.'],['H','…No. It’s still no.',{quiet:1}]]},
        {t:'Say nothing. Stand next to them.',m:'stay',then:[{wait:1.2},['S','I’m standing here. Not fixing it.',{quiet:1}]]}
      ]},
      ['B','…Okay. I’ll tell her.'],
      set({s:1.1,mood:'surprised'}),
      ['S','That was awkward. I was right about that one.'],
      ['H','You were.'],
      ['S','…I’m staying anyway.',{look:'soft'}]]},
    {t:'Say yes. Old habits.',m:'please',f:yes,then:[['H','Sure.'],['S','Next time, then.'],['H','Next time.'],['S','I’ll put the “no” in the archive. Under “pending”.']]}
  ]},
  set({aFace:-1,mood:'calm'}),
  // 0.84 (Codex 22.11.): why lunch with Sanna. She knows the soup they both like; the human's "oh" for once means what it sounds like.
  function(){return G.lunch===2?[['A','It’s Friday. No dentist.'],['A','Soup? The one with too much dill.']]:[['A','Soup? The one with too much dill.']];},
  ['H','Oh, good. That one.'],
  ['S','It’s a tr—'],
  ['S','…No. It’s lunch.',{look:'soft'}],
  set({face:'smile'}),
  ['H','Lunch.'],
  ['B','Enjoy your lunch!'],
  ['H','You t—'],{wait:0.5},
  ['H','…Thanks, Eero.'],
  aside(['S','Caught it. Mid-air.',{look:'pleased'}]),
  postingPayoff
 ],outside({title:'WHAT THE OTHERS SAW',dur:'duration: 2 seconds',cap:'Two colleagues going to lunch.',anim:'none'}),[
  ['S','For the record, I intend to go off again on Monday.',{look:'soft'}],
  ['H','I know. I’ll be there.'],
  {wait:0.8}
 ]);}
// chain(3) is Wednesday onwards. chain(3,'glass') picks the story up at that moment, without replaying Wednesday.
function chain(n,from){
  var out=[],fns=[null,null,scTue,scWed,scThu,scFri];
  for(var i=Math.max(2,n);i<=5;i++){
    var ms=AFTER[i]||[],k=i===n&&from?ms.indexOf(from):-1;
    if(k<0){(function(f){out.push(function(){return f();});})(fns[i]);k=0;}
    out=out.concat(ms.slice(k).map(interlude));
  }
  out.push(showWeekEnd);return out;
}
function startChapter(n,at){
  n=Number.isInteger(n)?clamp(n,1,5):1;hotReset();
  var saved=loadProgress(),sv=saved&&saved.chapters[n]||{};
  if(at&&at.ch===n&&n>1){   // Continue, in the middle of a chapter
    reset(at.state.day||'B');var h=G;Object.keys(at.state).forEach(function(k){h[k]=at.state[k];});
    h.started=true;h.jobDone=at.jobDone;h.chapter=n;
    // the day in progress comes back with the save; a fresh one only if the save is older than 0.77
    if(h.day0){h.mult=h.day0.trigAt!=null?Math.min(h.day0.trigMult||DOUBLE,h.jobDone?STAY:DOUBLE):1;h.prevClock=h.clock;h.livedShown=0;}else newDay();
    Q=chain(n,at.moment);run();return;
  }
  if(n<=1){startGame(sv.day||null,false);return;}
  reset(sv.day||'B');var g=G,c=checkpoint(sv);Object.keys(c).forEach(function(k){g[k]=c[k];});g.started=true;g.jobDone=n>4;
  Q=chain(n);run();
}

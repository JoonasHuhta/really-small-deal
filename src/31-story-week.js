/* ================= the week: chapters 2–5 ================= */
// `day` is what the card says. The weekdays are flavour; nothing insists they belong to the same week.
var CHAPTERS=[null,{day:'A MONDAY',title:'Oh, hi.'},{day:'A TUESDAY',title:'Quick chat?'},{day:'A WEDNESDAY, PROBABLY',title:'Could you just…'},{day:'A THURSDAY',title:'Seen.'},{day:'A FRIDAY. NOT NECESSARILY THAT ONE.',title:'Oh, hi. Again.'}];
var RIITTA={body:'#7a6a9c',hair:'#cfc8ba'};
function dayName(n){return CHAPTERS[n].title;} // kept under its old name: the title is what menus show now
function scene(o){return function(){
  var g=G,M=g.morko,Hm=g.human;
  music(o.music||o.set||'room');
  g.set=o.set||'room';g.w=null;g.out=null;g.lines=[];g.band=null;g.cur=null;g.stamp=null;
  g.cowA=g.cowB=g.cowR=false;g.yT=g.yShow=0;g.wT=g.wShow=0;g.wDrop=null;g.toss=null;g.dropped=null;g.bick=0;g.ax=g.axT=1010;g.bx2=g.bxT=1090;g.rx=760;g.aFace=-1;g.bFace=-1;g.aWave=false;g.cupLeft=false;
  Hm.x=Hm.xT=HOME;Hm.gone=false;Hm.back=false;Hm.face='neutral';Hm.flinch=0;Hm.sweat=Hm.sweatT=0;Hm.blush=0;Hm.grin=0;Hm.puddle=0;g.aSweat=0;g.cards=[];g.rep=null;g.zoom=null;g.boss=null;g.ninja=false;g.rBrow=0;g.tics=[];g.dish=null;g.kitchen=false;g.lens=null;g.bar=null;g.rec=null;g.draft=null;g.lib=null;g.qte=null;g.jolt=null;
  M.st='free';M.pose=null;M.coat=null;M.wobble=null;M.sT=o.s||1;M.mood=o.mood||'calm';g.anx=0.12;g.gazeT=0;g.darkT=0;g.rate=1;g.bigNote=null;
  if(o.clock!=null)g.clock=o.clock;if(o.cowR)g.cowR=true;g.snacks=!!o.snacks;
  g.cz=1.025;g.cx=W/2;g.cy=H/2;g.fade=1;g.fadeRate=1.6;g.skippable=false;g.noCup=false;g.mugFixed=true;M.asleep=false;Hm.facing=1;Hm.sipT=0;
};}
function begin(n,o){return [scene(o),function(){
  var g=G;g.chapter=n;g.moment=null;newDay();g.planText=o.plan;g.label=CHAPTERS[n].title;g.hud=true;g.plan=true;g.fade=0;
  g.morko.s=1;g.morko.off=-70;g.chap={day:CHAPTERS[n].day,title:CHAPTERS[n].title,t:0};saveProgress(n);stopVoice();sfx('card');
 },{wait:2.8},function(){G.chap=null;G.fade=1;}];}
function shadowHit(){var g=G;trigger();addLived('the one that landed',LIVED.shadowHit);sfx('hit');g.pulse=0.9;g.shake=RM?0:0.8;g.lines=[];g.cur=null;g.flash=0.8;g.morko.sT=0.62;g.morko.mood='scared';g.morko.pose=null;g.anx=0.9;g.cz=1.08;g.cx=W/2-30;g.cy=300;}
function yes(){G.yes++;G.human.grin=G.yes;addLived('saying yes, regretting it',30);}

function scTue(){return begin(2,{plan:'Get through Tuesday.',clock:16*3600+55*60}).concat([
  tuesdayOpening,
  {wait:0.6},
  ['P','Riitta: “Quick chat tomorrow at 9?”'],
  hit(0.9,'P'),set({sweat:0.7}),{wait:1.2},
  ['S','“Quick.”'],
  ['S','Nobody says “quick” about good news. Good news takes its time. Good news has cake.'],
  ['H','It’s probably nothing.'],
  ['S','It’s five words and a question mark. It’s EVERYTHING.'],
  {choice:[
    {t:'We’re being fired. Efficiently.',then:[['S','Nine o’clock. Before the coffee works. So you can’t fight back.'],['H','I’ve never fought back in my life.'],['S','She doesn’t know that. I’ve kept it very quiet.']]},
    {t:'She found the thing.',then:[['H','What thing?'],['S','I don’t know. That’s what makes it so bad. It could be ANY of the things.'],['H','There are no things.'],['S','There are always things.']]},
    {t:'It’s about Monday.',then:mondayCallback}
  ]},
  set({s:1.4,mood:'alert'}),
  ['S','Reply at once. Show enthusiasm. A professional amount.'],
  {choice:[
    {t:'“Sure!” With the exclamation mark.',then:[['S','Too keen. She’ll smell fear. Take it out.']]},
    {t:'“Sure.” With a full stop.',then:[['S','Too cold. A full stop is a slammed door. Put something back.']]},
    {t:'“Sure” and nothing else. Raw.',then:[['S','No punctuation at all? What are we, feral?']]}
  ]},
  ['P','You: “Sure, 9 works.”'],
  ['S','…You sent it. Without a committee.'],
  ['H','It’s a calendar reply.'],
  ['P','Riitta reacted with a thumbs-up.'],
  ['S','A thumb.'],
  ['S','ONE thumb. She has two.'],
  calm
 ],outside({title:'WHAT THE CALENDAR SAW',dur:'duration: 40 seconds',cap:'A meeting was scheduled.',anim:'text'}),[
  scene({set:'home',clock:3*3600+7*60}),
  ['N','03:07.'],
  ['S','Are you awake?'],
  ['H','I am now. It’s three in the morning.'],
  ['S','Out there, yes. In here it’s about Thursday. I did the afternoon twice.'],
  ['S','Good. I’ve prepared tomorrow. Three scenarios.'],
  {choice:[
    {t:'Scenario one: “We need to talk about your attitude.”',then:[['S','You say: “I don’t have an attitude.” Which is an attitude.'],['H','I’ll just listen.'],['S','Listening is suspicious.']]},
    {t:'Scenario two: she isn’t angry. She’s disappointed.',then:[['H','Oh no.'],['S','I know. I shouldn’t have said it out loud. Now it’s in the room.']]},
    {t:'Scenario three: while we’re up, the archive.',then:[['S','2011. You waved at someone who was waving at someone else.'],['H','Why do you still HAVE that?'],['S','I keep everything. It’s a safety archive.']]}
  ]},
  ['S','And if it’s none of those, I have the full list. Four: she sighs first. Five: she doesn’t sigh, which is worse. Six: there is a biscuit. They soften you up with a biscuit. Seven: the whole department is there. Eight: there is a cake. It says “goodbye”. Your name is spelled wrong. Nine: we correct the spelling. Ten: the correcting is what they remember.',{big:true}],
  ['S','…'],
  ['S','Who said all that?'],
  ['H','You did. It’s blocking the window.'],
  ['S','It’s ENORMOUS. Is that how it comes out?'],
  ['H','Imagine being under it.'],
  set({mood:'worry',s:1}),
  ['S','…I’ll use a smaller font.'],
  ['H','What time is it?'],
  ['S','Three. The best time. Nobody can reject us at three.'],
  ['H','Nobody can do anything at three. That’s the problem.'],
  ['S','…I’ll take the first watch.'],
  ['H','There’s only one watch. It’s you. Every night.'],
  ['S','And yet nobody has ever been rejected in their sleep. You’re welcome.'],
  scene({set:'office',clock:9*3600,cowR:1,s:1.3,mood:'alert'}),set({sweat:1}),
  ['R','Thanks for coming. I’ll be quick.'],
  ['S','“Quick.” Again. Brace.'],
  ['R','The client report was excellent. Really clear.'],
  ['S','Pleasantries. Don’t get comfortable.'],
  ['R','And people like working with you. Sanna said so, actually.'],
  ['S','Padding.'],
  ['R','One small thing: the summary could be shorter next time.'],
  hit(0.95,'R'),function(){G.bigNote={text:'SHORTER',t:0};},set({blush:1}),archive('bad',[['YEAR 2','Showed someone a drawing. Somebody laughed.'],['YEAR 4','“Neat handwriting. Could be neater.”'],['2022','Laughed at my own joke. In a meeting. Alone.']]),{wait:1.4},['N','The archive again. Filed by wound.'],closeArchive,
  ['S','THERE it is.'],
  ['S','“Shorter.” The summary is too long. YOU are too long. Your whole deal is too long.'],
  ['R','Otherwise, great work. Keep it up.'],
  ['S','Did she say something just then? I was busy with the wound.'],
  ['H','Why is there a puddle?'],
  ['S','Ignore the puddle. The puddle is MY department.'],
  {choice:[
    {t:'Apologise. For the summary, and in general.',f:function(){G.fb='sorry';},then:[['H','Sorry, I— sorry. I’ll fix it. Sorry.'],['R','It’s… fine? It’s one note.']]},
    {t:'Explain why it was long. At length.',f:function(){G.fb='explain';},then:[['N','The explanation of why the summary was long takes four minutes.'],['R','…Right. So. Shorter.']]},
    {t:'Go very quiet. Nod. Leave the body.',f:function(){G.fb='quiet';},then:[['H','Mm.'],['R','You okay? You went somewhere.'],['H','Fine. It’s nothing.'],said]},
    {t:'…Ask what “shorter” means.',f:function(){G.fb='ask';},then:[['S','That’s walking TOWARDS it.'],['H','How short is shorter?'],['R','Half a page. That’s all. The content’s great.'],['S','…Half a page. That’s not a character flaw. That’s a measurement.']]}
  ]},
  function(){G.bigNote=null;G.human.sweatT=0;return outside({title:'WHAT RIITTA SAW',dur:'duration: 3 minutes',anim:'text',
    cap:{sorry:'A good review. One note. Four apologies.',explain:'A good review. One note. One long answer about length.',quiet:'A good review. One note. Then nobody home.',ask:'A good review. One note. One question.'}[G.fb]});},
  scene({set:'room',clock:9*3600+12*60}),
  ['H','That went well.'],
  ['S','We were CRITICISED.'],
  ['H','I was praised. Twice. You talked over it.'],
  set({mood:'surprised'}),
  ['S','…She said nice things?'],
  ['H','Two. Maybe three.'],
  ['S','I don’t have those. I only wrote down “shorter”. In capitals. Twice.'],
  ['H','That’s the trouble with your filing system.'],
  ['S','It’s not a filing system. It’s a smoke alarm. It doesn’t have a setting for “nice”.'],
  function(){G.pop={text:'Filed: 1 note. Misplaced: 3 compliments.',t:0};},
  {wait:1.6}
 ]);}

function yesMenu(s,extra,extraKey){return {choice:[
  {t:'Say yes.',f:yes,then:[['H','Sure.'],['S',s[0]]]},
  {t:'Say yes. Enthusiastically.',f:yes,then:[['H','Sure! Happy to!'],['S',s[1]]]},
  {t:'Say yes, and offer something extra.',f:function(){yes();yes();if(extraKey)G[extraKey]=true;},then:[['H',extra],['S',s[2]]]},
  {t:'No.',off:true}
]};}
function scWed(){return begin(3,{plan:'Do your own work for once.',clock:10*3600+20*60}).concat([
  set({cowB:1,bx:880}),{wait:1.6},
  ['B','Hey! Quick favour. Could you take my slides for Friday? I’m swamped.'],
  ['H','I’ve got my own—'],
  ['S','Careful. A “no” is a rejection. Of HIM. Then he rejects us back. It’s a rejection exchange programme.'],
  yesMenu(['Clean. Safe. Nobody is upset.','An exclamation mark. Out loud. Bold.','We volunteered for a second thing to apologise for hesitating on the first. Textbook.'],'Sure — and I can do the handout too.','handout'),
  ['B','Legend.'],
  set({cowA:1,ax:780}),{wait:1.4},set({aFace:-1}),
  ['A','Oh — are you coming on Thursday? Board games, my place. Eero’s in.'],
  set({mood:'surprised',s:1.5}),
  ['S','An invitation. A real one. With a day on it.'],
  function(){return G.real?[['S','After Monday? I’m not un-noting Monday.'],['H','Noted. I still want to go.']]:[];},
  ['S','Say yes before she comes to her senses.'],
  ['H','I’d love to.'],yes,
  set({aFace:1,mood:'calm',s:1.1}),
  ['B','Brilliant. Could you bring the snacks? And maybe drive?'],
  yesMenu(['Snacks AND driving. We are the infrastructure now.','Happy to. HAPPY to. We said it twice in case he missed it.','You offered to host the afterparty of a board game night. There is no afterparty.'],'Sure — I could host an afterparty too?','afterparty'),
  ['S','Look at that. Everyone likes us.'],
  ['H','My face hurts.'],
  ['S','That’s the smile. It’s load-bearing.'],
  ['H','I’m extremely tired.'],
  ['S','Liked AND tired. The classic combination.']
 ],outside({title:'WHAT THE OTHERS SAW',dur:'duration: 2 minutes',cap:'Someone helpful. Possibly too helpful. Nobody checked.',anim:'nod'}),[
  scene({set:'home',clock:23*3600+40*60}),function(){G.human.grin=0;},
  ['N','23:40. Eero’s slides.'],
  ['H','It’s nearly midnight and I’m doing Eero’s slides.'],
  extraWorkCallback,
  ['S','And nobody is angry with us.'],
  ['H','I’m a bit angry with us.'],
  ['S','…That doesn’t count. That’s internal.'],
  ['H','It counts.'],
  {choice:[
    {t:'A “no” costs us people.',then:[['S','Every no is a door closing.'],['H','Every yes is me doing slides at midnight.']]},
    {t:'We could get ill. Convincingly.',then:[['S','A light flu. Respectable. Nobody rejects the ill.'],['H','I’m not faking flu to avoid a two-letter word.']]},
    {t:'What if we said… “not this time”?',then:[['S','It’s a no in a coat.'],['H','That’s further than you’ve ever gone.'],['S','I feel sick.']]}
  ]},
  set({mood:'worry'}),
  ['S','I only have the one move, you know. Keep everyone pleased. It works.'],
  ['H','It works on everyone except me.'],
  {wait:1.2}
 ]);}

var SEEN={
  worries:{t:'Send: “No worries if not!”',a:[['P','You: “No worries if not!”'],['S','Casual. Breezy. A person with no worries.'],['H','I have nothing BUT worries. You put them in an exclamation mark.']],
    r:[['P','Sanna: “Phone died!! 7. And there are ALWAYS worries, who are you kidding.”']]},
  cancel:{t:'Send: “Actually, I can’t make it.” Leave before we’re left.',a:[['P','You: “Actually I can’t make it tonight, sorry!”'],['S','Clean. Dignified. She can’t uninvite us now.'],['H','I WANTED to go.'],['S','…I know.']],
    r:[['P','Sanna: “Oh no! Phone died, only just saw this. We’ll miss you.”'],['S','…She would have said yes.'],['H','Yeah.'],['S','I cancelled us out of a yes.'],['P','You: “Ignore that. I panicked. 7?”'],['P','Sanna: “Ha. 7. Bring the panic too.”']]},
  freezer:{t:'Send nothing. Put the phone in the freezer.',a:[['S','It can’t hurt us from in there.'],['H','It’s next to the peas.'],['S','The peas will keep an eye on it.']],
    r:[['N','A phone is retrieved from the freezer. It has one new message and smells faintly of peas.'],['P','Sanna: “SORRY. Phone died. 7? Bring the snacks, you hero.”']]},
  bite:{t:'Send: “???”. With teeth.',a:[['P','You: “???”'],set({pose:'selfmouth',mood:'scared'}),['S','…That had teeth.'],['H','That was you.'],set({pose:null})],
    r:[['P','Sanna: “??? to you too! Phone died. 7?”'],['S','She bit back. Affectionately. Is that allowed?']]}
};
function scThu(){return begin(4,{set:'home',plan:'Go to board game night.',clock:17*3600+30*60,snacks:1}).concat([
  countBags,{wait:2.8},
  ['S','Snacks: eleven bags. Car: fuelled. Us: early. I have no notes.'],
  ['P','You: “What time tonight? I’ve got the snacks.”'],
  ['P','Seen 17:31.'],
  {wait:1.6},
  hit(0.6,'P'),set({sweat:0.6}),archive('bad',[['2009','Texted “haha”. Got back “ok”.'],['2018','Group chat went silent after my message. Six minutes.'],['2023','“We should hang out sometime!” We did not.']]),{wait:1.4},['N','The archive, sorted by silence.'],closeArchive,
  ['S','“Seen.”'],
  ['S','She has SEEN it. With her eyes. And chosen silence.'],
  ['H','It’s been one minute.'],
  ['S','A minute is sixty separate decisions not to reply.'],
  function(){G.clock=17*3600+52*60;},
  ['N','17:52.'],
  set({s:1.7,mood:'stern'}),
  ['S','Twenty-one minutes. I’ve drafted some follow-ups.'],
  {choice:function(){return ['worries','cancel','freezer','bite'].map(function(k){return {t:SEEN[k].t,f:function(){G.txt=k;if(k==='bite')G.bit=true;},then:SEEN[k].a};});}},
  function(){G.clock=18*3600+40*60;},
  ['N','18:40. Still nothing.'],
  set({s:2.5,mood:'stern',anx:0.8}),
  ['S','She hates us. Eero hates us. Riitta wants a shorter you. I’ve run the numbers. It’s unanimous.'],
  ['H','Stop.'],
  ['S','I’m PROTECTING you.'],
  ['H','From what? Board games?'],
  ['H','You’ve had me apologising to furniture all week. I’m at home with eleven bags of snacks.'],
  ['H','You’re not protecting me. You’re just the loudest thing in the room.'],
  shadowHit,set({sweat:0}),{wait:2.2},
  ['S','…That one landed.'],
  function(){return G.metSannaShadow?[['S','With a full stop.']]:[];},
  set({face:'down'}),
  ['H','Sorry.'],
  ['S','No. It’s fine. It’s just— that’s what it’s like.'],
  ['H','What is?'],
  ['S','All of it. Every “oh”. Every “quick chat”. It doesn’t arrive as a note. It arrives as a hit.'],
  ['S','I can’t tell a paper cut from an amputation. They all come in as amputations. So I treat everything as one. It seemed safest.'],
  set({face:'neutral'}),
  ['H','I know. I feel it before you’ve said a word.'],
  ['S','You do?'],
  ['H','It’s my chest. You just do the commentary.'],
  ['S','…I thought I was the alarm.'],
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
  ['S','Nobody came to relieve me.'],
  set({mood:'care',s:1.1,pose:'comfort'}),
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
  function(){return SEEN[G.txt].r;},
  set({mood:'surprised'}),
  ['S','Her phone died.'],
  ['H','Her phone died.'],
  ['S','For over an hour I grieved a battery.']
 ],outside({title:'WHAT SANNA SAW',dur:'duration: over an hour',cap:'A dead phone. A long hunt for a charger. Then your message.',anim:'text'}),[
  calm,
  ['H','Coming?'],
  ['S','I’m attached to your feet.'],
  ['H','That’s not what I asked.'],
  ['S','…Yes. I’m coming.'],
  {wait:0.8}
 ]);}

function wobbleOn(){var m=G.morko;m.wobble={t:0};m.pose='balance';m.mood='worry';G.anx=0.2;}
function wobbleOff(){var m=G.morko;m.wobble=null;m.pose=null;if(RM)updHands(1);}
function scFri(){return begin(5,{plan:'Say the thing.',clock:9*3600+41*60}).concat([
  set({cowB:1,bx:880}),
  set({sweat:0.45}),
  ['S','Friday. Same room. Same coffee. I’d like to flag that I’m calm.'],
  ['H','You’re vibrating.'],
  ['H','And I’m sweating.'],
  ['S','Professionally.'],
  ['S','Calmly.'],
  set({cowA:1,ax:780,mood:'alert',s:1.2}),{wait:1.5},set({aFace:-1,clr:1}),look,
  ['A','oh, hi.'],
  qteAuto,{wait:0.45},
  ['H','Hi.'],
  function(){G.qte=null;},
  ['S','…That’s not the procedure.'],
  ['H','That’s the whole procedure.'],
  set({aFace:1}),hit(0.8,'A'),{wait:1.3},
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
    {t:'Read the verdict anyway. Quietly.',then:[['S','For the record: she hates us.'],['H','Noted.'],['S','That’s it? “Noted”?'],['H','You said it. I heard it. We’re still standing here.'],['S','…Huh. It’s smaller once it’s out.']]},
    {t:'Hold the verdict. Count to two.',then:[['S','One.'],['S','Two.'],['S','It’s been two seconds and nothing has happened to us.'],['H','Nothing was going to.'],['S','We didn’t KNOW that. We know it now.']]},
    {t:'Stay. Wobble visibly.',then:[wobbleOn,['S','I’m wobbling.'],['H','I can see that.'],['S','In front of people.'],['H','They can’t see you.'],['S','It’s the principle.'],wobbleOff]}
  ]},
  calm,set({aFace:-1,near:1}),
  ['A','You okay?'],
  ['H','It’s something. Small. Give me a minute.'],
  set({mood:'surprised'}),
  ['S','…That’s not what we say.'],
  function(){var n=G.nothings||0;return [['S',n>1?'We say “nothing”. We’ve said it '+(n===2?'twice':n===3?'three times':n+' times')+' this week. I keep them in a folder.':'We say “nothing”. There’s a folder.']];},
  ['A','Take your minute.'],
  {wait:1.4},
  set({mood:'calm'}),
  ['H','Okay. Can I say something odd?'],
  ['A','Always.'],
  ['H','When someone says “oh, hi”, my brain hears a verdict. It’s very loud for two seconds. Then I spend a day on it.'],
  ['S','A WEEK. Be accurate.'],
  ['A','…Oh.'],
  ['S','There it is AGAIN—'],
  ['H','Shh.'],
  set({aSweat:0.55,sweat:0}),
  ['A','I do that with “fine”. Someone says “fine” and I’m up till three.'],
  lensPeek(function(){return {x:G.ax,y:FEETY-150};},'SANNA: ALSO UP TILL THREE.'),
  function(){G.zT=1;},{wait:1.6},
  fridayShadow,
  archive('good',[['2026','She has one too.']]),
  ['S','…Filed. Under the other pile.'],
  ['H','There’s another pile?'],
  ['S','There is NOW.'],closeArchive,
  ['A','Is that why you vanish at lunch? We stopped asking. I thought asking was pressure.'],
  ['H','I thought not being asked was the verdict.'],
  ['A','So we’ve been being polite AT each other. For a year.'],
  mondayRepair,
  set({bFace:-1,mood:'alert'}),
  function(){return G.handout?[['B','By the way, thanks for the handout. You didn’t have to do that.'],['S','He says that NOW.'],['H','He didn’t actually ask for it.'],['S','I may have supplied the asking.']]:[];},
  ['B','Hey! While you’re both here — could you also take my Monday shift?'],
  ['S','Here we go. I’ll get the “sure”.'],
  {choice:[
    {t:'No. (I will wobble.)',f:function(){G.no=true;},then:[['H','Not this time, Eero.'],set({s:1.5,mood:'scared'}),['S','He’s going to—'],['B','Fair enough! I’ll ask Riitta.'],set({s:1.1,mood:'surprised'}),['S','…He survived. WE survived. It was three words.']]},
    {t:'Say yes. Old habits.',f:yes,then:[['H','Sure.'],['S','Next time, then.'],['H','Next time.'],['S','I’ll put the “no” in the archive. Under “pending”.']]}
  ]},
  set({aFace:-1,mood:'calm'}),
  function(){return [['A',G.lunch===2?'Lunch? It’s Friday. No dentist.':'Lunch?']];},
  ['S','It’s a tr—'],
  ['S','…No. It’s lunch.'],
  set({face:'smile'}),
  ['H','Lunch.'],
  postingPayoff
 ],outside({title:'WHAT THE OTHERS SAW',dur:'duration: 2 seconds',cap:'Two colleagues going to lunch.',anim:'none'}),[
  ['S','For the record, I intend to go off again on Monday.'],
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
  n=Number.isInteger(n)?clamp(n,1,5):1;
  var saved=loadProgress(),sv=saved&&saved.chapters[n]||{};
  if(at&&at.ch===n&&n>1){   // Continue, in the middle of a chapter
    reset(at.state.day||'B');var h=G;Object.keys(at.state).forEach(function(k){h[k]=at.state[k];});
    h.started=true;h.jobDone=at.jobDone;h.chapter=n;newDay();Q=chain(n,at.moment);run();return;
  }
  if(n<=1){startGame(sv.day||null,false);return;}
  reset(sv.day||'B');var g=G,c=checkpoint(sv);Object.keys(c).forEach(function(k){g[k]=c[k];});g.started=true;g.jobDone=n>4;
  Q=chain(n);run();
}

/* ================= the second act: a hit with no sender, a form, a quiet day, and a lamp ================= */
// See TOINEN_NAYTOS.md. Three rules: nothing is named, nothing is the villain, nobody is mocked.
// "Away" is the shadow asleep: the wall figure fades into the ordinary floor shadow every person has.
function shadowAway(){var M=G.morko;M.asleep=true;M.wake=0;M.dim=null;G.lines=[];G.bick=0;G.plain=true;}
function shadowBack(s){var M=G.morko;G.plain=false;M.asleep=false;M.dim=null;M.s=M.sT=s||0.6;M.mood='worry';}

// The shadow everybody else has: grey, eyeless, on the wall behind the human, doing exactly what the human does and nothing more.
function plainShadow(){
  var g=G,Hm=g.human;if(!g.plain||Hm.gone||g.w)return;
  var x=Hm.x-58,by=WALLY,sip=Hm.sip||0;
  ctx.save();ctx.fillStyle='#3d4150';
  ctx.globalAlpha=0.16;ctx.beginPath();ctx.moveTo(Hm.x-18,FEETY);ctx.lineTo(Hm.x+18,FEETY);ctx.lineTo(x+20,by);ctx.lineTo(x-20,by);ctx.closePath();ctx.fill();
  ctx.globalAlpha=0.3;rr(x-21,by-100,42,100,12);ctx.fill();circ(x,by-118,17);ctx.fill();
  ctx.strokeStyle='#3d4150';ctx.lineWidth=10;ctx.lineCap='round';line(x+18,by-84,x+30,by-56-sip*42);
  ctx.restore();
}
// The receipt for the quiet day, on the same paper as every other receipt. The only one that says 1.0.
function quietReceipt(){
  var rows=[['days on the calendar','1'],['days lived','1.0','big'],'-',['lunches arranged','1'],['shifts declined','1'],['drawings finished','1'],['“for the record”','1 (unanswered)']];
  try{G.paper=receiptCanvas('RECEIPT · A QUIET MONDAY',rows,'Room for something else.');}catch(e){G.paper=null;}
  if(G.paper&&G.paper.width)return [function(){G.lines=[];G.band=null;sfx('card');},{wait:0.8},['N','One lunch arranged. One shift declined. One drawing finished.'],function(){G.paper=null;}];
  G.paper=null;
  return outside({title:'RECEIPT · A QUIET MONDAY',dur:'days lived: 1.0',cap:'One lunch arranged. One shift declined. One drawing finished. “For the record” once, unanswered.',anim:'text'});
}
function drawPaper(){
  var p=G.paper;if(!p||!p.width)return;var h=SCENE_BOTTOM-24,w=h*p.width/p.height;
  ctx.save();ctx.setTransform(SC,0,0,SC,0,0);
  ctx.fillStyle='rgba(13,17,20,.82)';ctx.fillRect(-20,-20,W+40,H+40);ctx.drawImage(p,(W-w)/2,12,w,h);ctx.restore();
}

/* ---- a waiting room ---- */
function clinic(){
  ctx.fillStyle='#dfe3e1';ctx.fillRect(-20,-20,W+40,WALLY+20);
  ctx.fillStyle='#bcc3c0';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);ctx.fillStyle='#9aa5a1';ctx.fillRect(-20,WALLY-6,W+40,6);
  ctx.fillStyle='#c9cfc9';rr(96,150,120,WALLY-150,3);ctx.fill();ctx.fillStyle='#8d9a8c';circ(198,300,5);ctx.fill();           // a door
  ctx.fillStyle='#fbf8ef';ctx.strokeStyle='#9aa5a1';ctx.lineWidth=3;rr(300,120,150,96,4);ctx.fill();ctx.stroke();               // a poster nobody reads
  ctx.strokeStyle='#b7c2be';ctx.lineWidth=3;ctx.lineCap='round';line(318,146,430,146);line(318,166,410,166);line(318,186,424,186);
  for(var i=0;i<2;i++){var x=640+i*96;ctx.fillStyle='#6f8f8a';rr(x,WALLY-58,70,12,4);ctx.fill();rr(x+4,WALLY-110,62,52,6);ctx.fill();
    ctx.fillStyle='#55605c';ctx.fillRect(x+6,WALLY-46,6,46);ctx.fillRect(x+58,WALLY-46,6,46);}
  ctx.fillStyle='#8a6a4a';rr(846,WALLY-34,44,34,4);ctx.fill();ctx.fillStyle='#5f8a5a';                                            // the plant every waiting room is issued
  ctx.beginPath();ctx.ellipse(868,WALLY-64,14,34,-0.3,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(880,WALLY-58,12,30,0.4,0,Math.PI*2);ctx.fill();
}

/* ---- the form: eighteen questions, four of them read aloud ---- */
var FORM_Q=[
  {n:3,q:'How often do you replay a conversation after it has ended?',opts:['Never','Sometimes','Very often']},
  {n:7,q:'Do small remarks stay with you longer than you would like?',opts:['Never','Sometimes','Very often']},
  {n:11,q:'Do you prepare for outcomes that do not occur?',opts:['Never','Sometimes','Very often']},
  {n:18,q:'Does this cause problems in your daily life?',opts:['No','','Yes']}
];
function formOpen(){G.form={i:-1,ticks:[-1,-1,-1,-1],sig:0};}
function formQ(i){return function(){G.form.i=i;sfx('card');return [['N',FORM_Q[i].q]];};}
function formTick(i,k){return function(){G.form.ticks[i]=k;sfx('stamp');};}
function drawForm(){
  var fm=G.form;if(!fm)return;
  var w=318,h=392,k=Math.min(1,(SCENE_BOTTOM-32)/h),x=COMPACT?W*0.7-w*k/2:604,y=COMPACT?16:70,i,q=FORM_Q[fm.i];
  ctx.save();ctx.setTransform(SC,0,0,SC,0,0);ctx.translate(x,y);ctx.scale(k,k);ctx.translate(w/2,h/2);ctx.rotate(-0.012);ctx.translate(-w/2,-h/2);
  ctx.fillStyle='rgba(20,17,29,.22)';rr(6,8,w,h,5);ctx.fill();ctx.fillStyle='#fbf8ef';ctx.strokeStyle='#8b8070';ctx.lineWidth=1.5;rr(0,0,w,h,5);ctx.fill();ctx.stroke();
  ctx.fillStyle='#55605c';rr(w/2-34,-10,68,20,5);ctx.fill();                                                                       // the clip
  ctx.fillStyle='#2b2733';ctx.textAlign='left';ctx.textBaseline='middle';ctx.font='800 17px system-ui,sans-serif';ctx.fillText('ABOUT YOU',22,38);
  ctx.font='600 10px system-ui,sans-serif';ctx.fillStyle='#8b8070';ctx.fillText('18 questions. Take your time.',22,56);
  // the questions that are not read aloud: grey lines
  ctx.strokeStyle='#d6d0c2';ctx.lineWidth=5;ctx.lineCap='round';
  for(i=0;i<5;i++)line(22,84+i*13,22+150+((i*53)%90),84+i*13);
  if(q){
    ctx.fillStyle='#2b2733';ctx.font='800 13px system-ui,sans-serif';ctx.fillText(q.n+'.',22,172);
    ctx.font='600 15px system-ui,sans-serif';var ls=wrap(q.q,w-70);for(i=0;i<ls.length;i++)ctx.fillText(ls[i],46,172+i*20);
    var oy=182+ls.length*20;
    for(i=0;i<3;i++){if(!q.opts[i])continue;var bx=46,by=oy+i*26;
      ctx.strokeStyle='#2b2733';ctx.lineWidth=1.5;ctx.strokeRect(bx,by-8,16,16);ctx.fillStyle='#2b2733';ctx.font='600 13px system-ui,sans-serif';ctx.fillText(q.opts[i],bx+26,by);
      if(fm.ticks[fm.i]===i){ctx.strokeStyle='#c9553f';ctx.lineWidth=3.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(bx+2,by);ctx.lineTo(bx+7,by+6);ctx.lineTo(bx+19,by-11);ctx.stroke();}
    }
  }
  ctx.strokeStyle='#2b2733';ctx.lineWidth=1.2;line(22,h-44,w-22,h-44);ctx.fillStyle='#8b8070';ctx.font='600 10px system-ui,sans-serif';ctx.fillText('Witness',22,h-30);
  if(fm.sig>0){ // a flourish, and a full stop it is rather proud of
    var n=Math.floor(46*fm.sig),px=60,py=h-58;ctx.strokeStyle='#14111d';ctx.lineWidth=2.4;ctx.lineCap='round';ctx.beginPath();
    for(i=0;i<=n;i++){var u=i/46,sx=px+u*190,sy=py-Math.sin(u*Math.PI*5)*14*(1-u*0.6);if(i===0)ctx.moveTo(sx,sy);else ctx.lineTo(sx,sy);}
    ctx.stroke();if(fm.sig>=1){ctx.fillStyle='#14111d';circ(px+200,py+2,2.6);ctx.fill();}
  }
  ctx.restore();
}

/* ---- a choice that makes itself ---- */
function stepAuto(dt){
  var a=G.auto;if(WAIT!=='auto'||!a)return;a.t+=dt;
  if(!a.done&&a.t>=a.secs*0.55){a.done=true;sfx('pick');render();}
  if(a.t>=a.secs){G.auto=null;WAIT=null;run();}
}
/* ---- the lamp ---- */
function lampOff(){var g=G;g.lampOff=true;g.darkT=1;g.dark=1;}
function lampOn(){
  var g=G;if(WAIT!=='lamp')return;g.lampOff=false;g.darkT=0;g.flash=0.25;sfx('turn');
  shadowBack(0.6);WAIT=null;run();
}
/* ---- a glass of water on the kitchen table, and next to it one small white thing ---- */
function drawTable(){
  if(!G.tableShot)return;var x=590,y=FEETY-64;
  ctx.fillStyle='#6b5846';rr(x-90,y,180,12,4);ctx.fill();ctx.fillRect(x-78,y+12,8,58);ctx.fillRect(x+70,y+12,8,58);
  ctx.fillStyle='rgba(200,225,240,.55)';rr(x-26,y-34,22,34,3);ctx.fill();ctx.fillStyle='rgba(235,245,250,.8)';ctx.fillRect(x-26,y-20,22,20);
  ctx.fillStyle='#fbf8ef';ctx.beginPath();ctx.ellipse(x+22,y-3,6,3,0,0,Math.PI*2);ctx.fill();
}
function tableShot(on){return function(){var g=G;g.tableShot=on;g.kitchen=on;   // the table stands in the kitchen, not in front of the sofa and the lamp (Joonas 20.11.)
  if(on){g.cz=1.55;g.cx=600;g.cy=FEETY-60;}else{g.cz=1;g.cx=W/2;g.cy=H/2;}};}
function sitDown(){var Hm=G.human;Hm.pose='floor';Hm.face='down';sfx('drip');}

/* ================= 1. Nothing. ================= */
function labNothing(){return labScene({set:'home',title:'Nothing.',plan:'Fold the laundry.',clock:16*3600+40*60}).concat([
  function(){var g=G;g.basket=true;g.human.x=g.human.xT=470;},
  ['N','A Sunday. Laundry. Nobody has said anything all day.'],
  {wait:1.5}
 ],jolt({label:'a hit with no sender',mins:45,tag:'SOURCE: —'}),[
  ['S','Who was that?',{loud:1}],
  ['H','Nobody.'],
  ['S','Somebody SAID something.'],
  ['H','Nobody’s here.'],
  lensPeek({x:700,y:FEETY-40},'SOFA: NOTHING TO DECLARE.'),
  lensPeek(function(){return {x:G.human.x+64,y:FEETY-20};},'BASKET: SOCKS. ODD NUMBER.'),
  ['S','The sofa has an alibi.',{look:'squint'}],
  ['S','Check the phone.'],
  ['H','It’s in the other room.'],
  ['S','Then it came from INSIDE.'],
  sitDown,{wait:1.3},
  ['S','Get up. We can’t be found like this.'],
  ['H','By whom?'],
  {wait:1.1},
  ['S','I don’t have a form for this. There’s no sender.'],
  ['H','I don’t know where it came from either.'],
  ['S','Then what do I DO?'],
  ['H','Could you sit with me?'],
  set({s:0.62,mood:'worry',pose:'sit'}),function(){G.sat=true;sfx('drip');},{wait:1.2},
  {hold:{kind:'sit',secs:5,clock:1,text:'Sitting. No cause. No verdict. Sitting.'}}
 ],outside({title:'WHAT THE CALENDAR SAW',dur:'duration: 4 minutes',cap:'Someone sat on the floor next to a laundry basket.',anim:'text'}),[
  set({s:0.8,mood:'calm'}),
  ['S','…Still there?'],
  ['H','A bit. My legs have gone to sleep as well.'],
  ['S','We didn’t fix anything.'],
  ['H','No.'],
  ['S','I’d like to file a complaint. About the absence of a cause.'],
  ['H','With whom?'],
  aside(['S','That’s the complaint.']),
  function(){G.human.pose=null;G.human.face='neutral';},set({pose:null,s:1}),
  ['H','I’m going to ring someone tomorrow.'],
  ['S','About the sofa?'],
  ['H','About this.'],
  ['S','…I’ll bring the forms.',{look:'soft'}]
]);}

/* ================= 2. The form. ================= */
function labForm(){
  function ticked(i,k,lines){return [formTick(i,k)].concat(lines||[]);}
  return labScene({set:'clinic',title:'The form.',plan:'Fill it in.',clock:14*3600+10*60,mood:'alert'}).concat([
  function(){G.human.x=G.human.xT=430;formOpen();},
  ['N','A waiting room. A clipboard. Eighteen questions.'],
  ['S','A form! Finally. Somebody professional.',{look:'pleased'}],
  ['S','Give it here. I’ll do the boxes.'],
  formQ(0),
  {choice:[
    {t:'Tick “Never”.',then:[['S','We can’t tick that. They’d check.']].concat(ticked(0,2,[['S','…That’s not what I said.']]))},
    {t:'Tick “Sometimes”. Modestly.',then:[['S','“Sometimes.” Modest. I like it.']].concat(ticked(0,2,[['S','…That’s not what I said.']]))},
    {t:'Ask them to define “ended”.',then:[['S','Exactly. Write that in the margin.']].concat(ticked(0,2))}
  ]},
  ['S','Fine. “Very often.” It’s a strength.'],
  formQ(1),
  {choice:[   // Joonas 20.11.: more of the form for the player to answer
    {t:'Tick “Sometimes”. Keep it light.',then:[['S','Light. Breezy. A person of few remarks.']]},
    {t:'Ask how long “longer” is.',then:[['S','In days? In years? Since the drawing?'],['H','You’re making my point.']]},
    {t:'Leave it blank. Mystery is attractive.',then:[['S','Let them wonder.']]}
  ]},
  ['S','Longer than I’d LIKE? I like having them. I’ve had some since the drawing.',{look:'pleased'}],
  formTick(1,2),
  ['S','You didn’t even ask me.'],
  ['H','I didn’t need to.'],
  formQ(2),{wait:1.2},
  ['S','That’s me. They’ve described ME.',{look:'stunned'}],
  ['H','It’s a list of difficulties.'],
  aside(['S','It’s a job description.']),
  formTick(2,2),
  ['S','How do they KNOW? Has someone been talking?'],
  ['H','Nobody’s been talking.'],
  ['S','Then I’m… common?'],
  ['H','Common enough to have a form.'],
  ['S','…I thought I was bespoke.',{quiet:1}],
  formQ(3),
  ['S','Problems? I PREVENT problems. Tick “no”.',{loud:1}],
  {choice:[
    {t:'Tick “no”.',then:[['S','Go on.'],{wait:0.9}].concat(ticked(3,2))},
    {t:'Tick “no”. Firmly.',then:[['S','FIRMLY.'],{wait:0.9}].concat(ticked(3,2))},
    {t:'Look at the human.',then:[['S','…What?']].concat(ticked(3,2))}
  ]},
  ['S','You ticked yes.'],
  ['H','It’s been a long week.'],
  ['S','A WEEK. …'],
  ['H','A long year.'],
  ['S','…Be accurate.',{quiet:1}],
  ['H','I’m signing this. I want to talk to someone.'],
  ['S','I could witness it. I have excellent handwriting.',{look:'pleased'}],
  {hold:{kind:'sign',secs:3,text:'Witnessing the signature. With a flourish.'}},
  ['S','There. All in order.'],
  ['H','You’ve gone into the margin.'],
  ['S','The margin needed a witness too.'],
  function(){G.form=null;}
 ],outside({title:'WHAT THE APPOINTMENT WAS',dur:'duration: 40 minutes',cap:'An appointment. A form with eighteen questions. A small paper bag.',anim:'text'}),afterForm());
}
// After the appointment: what the help is, what it does, what it doesn't, and whether the human is glad.
// No names of medicines or professions: a small paper bag, and a chair every other Tuesday (Joonas 20.11.: the player must not be left guessing).
function afterForm(){
  var asked={};
  function ask(k){asked[k]=1;return ANSWERS[k];}
  var ANSWERS={
    bag:[['S','And the bag?'],['H','It turns the volume down. Not off. Down.'],['S','Down how far?'],['H','Far enough that I can hear myself between your memos.']],
    chair:[['S','And the chair?'],['H','Every other Tuesday. We open a few of your files and check whether they say what you say they say.'],['S','They do.'],['H','Some do. One of them just says “oh, hi”.']],
    me:[['S','Am I being… replaced?',{quiet:1}],['H','No. You’re being listened to. And sometimes overruled.'],['S','Overruled is a strong word.'],['H','It’s a nice word. I’m keeping it.']]
  };
  function rest(){var o=[];['bag','chair','me'].forEach(function(k){if(!asked[k])o=o.concat(ask(k));});return o;}
  return [
    scene({set:'home',clock:18*3600+40*60}),
    ['N','That evening. The paper bag is on the table. Nobody has opened the conversation about it.'],
    ['S','So. What did they say? Did they confiscate me?'],
    ['H','Nobody confiscates you. There’s the bag. And a chair I sit in every other Tuesday, to talk.'],
    ['S','Talk about WHAT?'],
    ['H','You. Mostly. Kindly.'],
    ['S','…Kindly.',{look:'stunned'}],
    {choice:[
      {t:'Ask what the bag does.',m:'stay',then:function(){return ask('bag');}},
      {t:'Ask what the chair does.',m:'stay',then:function(){return ask('chair');}},
      {t:'Ask if I’m being replaced.',m:'hide',then:function(){return ask('me');}}
    ]},
    rest,
    ['S','And? Is it working?'],
    ['H','Some days are easier. Not all of them.'],
    ['H','It doesn’t make you go away. It makes you a bit easier to talk to.'],
    ['S','…I’ve always been easy to talk to. I talk constantly.'],
    ['H','I know. I’m glad I went.'],
    ['S','…Noted.',{quiet:1}]
  ];
}

/* ================= 3. Quiet. ================= */
// No Ekskyysmi. Three places where it would have said something show its name and a dash.
function labQuiet(){
  var gap=['S','—'];
  return labScene({set:'home',title:'Quiet.',plan:'—',clock:7*3600+40*60}).concat([
  shadowAway,function(){G.human.gone=true;},tableShot(true),{wait:3.2},tableShot(false),
  scene({set:'room',clock:8*3600+52*60,day:'MONDAY'}),shadowAway,
  function(){var g=G;g.hud=true;g.plan=true;g.planText='—';g.noCup=false;g.mugFixed=false;},
  ['N','Monday. 8:52. The same room. The same coffee.'],
  set({cowA:1,ax:700,aFace:-1}),{wait:1.6},
  ['A','oh, hi.'],
  {wait:1.2},
  gap,
  ['H','Hi. Lunch today?'],
  ['A','Sure!'],
  {auto:{opts:['Go to lunch.','Go to lunch.','Go to lunch.'],pick:0,secs:1.9}},
  ['N','It took four seconds.'],
  set({ax:1100}),{wait:1.2},
  function(){G.cowR=true;G.cowA=false;},
  ['R','Not now.'],
  ['H','Okay.'],
  gap,
  ['N','It took one second.'],
  function(){G.cowR=false;},set({cowB:1,bx:820,bFace:-1}),{wait:1.4},
  ['B','Could you take my Thursday shift?'],
  {auto:{opts:['No.','No.','No.'],pick:1,secs:1.9}},
  ['H','No. Sorry.'],
  ['B','Ah. I was hoping you could. I’ll ask Riitta.'],
  ['N','Nobody rehearsed anything.'],
  set({bx:1100}),{wait:1.2},
  function(){var g=G;g.cowB=false;g.cowA=true;g.ax=1010;g.clock=12*3600+4*60;},set({near:1,aFace:-1}),{wait:1.6},
  ['N','Lunch. It goes well.'],
  ['A','I nearly cancelled. Didn’t think you’d want another lunch.'],
  ['H','I asked you this morning.'],
  ['A','Yes. I brought my own argument.'],
  ['A','You didn’t apologise to the chair.'],
  ['H','We settled out of court.'],
  ['A','Good. It looked expensive.'],
  function(){G.zT=1;},{wait:1.8},
  ['Z','…Where’s yours?'],
  {wait:1.6},
  ['A','Same time tomorrow?'],
  ['H','Same time.'],
  function(){G.zT=0;},
  scene({set:'home',clock:18*3600+20*60}),shadowAway,
  ['N','The way home. KIV-304. ROS-151. Two sevens.'],
  ['H','Pair.'],
  function(){G.note={legs:4,a:0,aT:1,off:0};},
  ['N','At home, the cat from the drawer gets its fifth leg.'],
  function(){G.note.legs=5;sfx('scribble');},   // 0.86: the fifth leg is heard being drawn
  ['H','Five. Excellent. Very stable cat.'],
  function(){G.quietDrawing=true;},
  ['H','For the record.'],
  {wait:1.6},
  gap,
  ['N','Nobody objected.'],
  function(){G.quiet=true;},
  quietReceipt
 ]);
}

/* ================= 4. Evenings. ================= */
function labEvenings(){return labScene({set:'home',title:'Evenings.',plan:'The lamp.',clock:21*3600}).concat([
  shadowAway,lampOff,
  function(){G.note={legs:5,on:'shadow',a:1,aT:1,off:12,offT:12};},   // the cat is on the wall now, not in the drawer
  ['N','Nine in the evening. One lamp beside the sofa.'],
  {lamp:true},
  {wait:1.8},
  ['S','…Am I allowed?',{quiet:1}],
  ['H','It’s nine. You’re on.'],
  ['S','I’ve gone part-time?'],
  ['H','Evenings.'],
  set({s:0.8}),
  // 0.78 (Codex review: the evening retold the day the player had just played). Ekskyysmi learns it in two beats; the cat it finds by standing on it.
  ['S','What happened today? Without me.'],
  ['H','I asked Sanna to lunch. Four seconds.'],
  ['S','Four. I’d budgeted a week.'],
  ['H','Riitta said “not now”. I said “okay”.'],
  ['S','And then?'],
  ['H','And then nothing. That was all of it.'],
  ['S','That’s terrible.',{look:'stunned'}],
  ['H','Nobody said “for the record”. All day.'],
  ['S','You could have said it.'],
  ['H','I did. Once. To the wall.'],
  ['S','…And?'],
  ['H','It’s not the same when I do it.'],
  {wait:1.4},
  ['S','So I’m not needed.'],
  ['H','Not for every sentence.'],
  {wait:1.0},
  ['H','Move over. You’re on the cat.'],function(){if(G.note)G.note.offT=84;},
  ['S','It has five legs.'],
  ['H','I know. I like it.'],
  ['S','I’ll allow it. Provisionally.'],
  ['H','I missed you. I’m keeping the easier day, though.'],
  set({s:1,mood:'care'}),{wait:1.2},
  ['S','For the record—'],
  ['H','Go on.'],
  ['S','—I have several things to say about the lunch.',{look:'pleased'}],
  ['H','I thought you might.'],
  ['S','Did you even REHEARSE?'],
  ['H','No.'],
  ['S','Amateur.'],
  function(){addLived('one evening, annotated',25);G.evenings=true;},
  lensPeek({x:520,y:300},'EVENINGS: MINE.')
]);}

/* ---- three dots: someone is typing. Then they are not. ---- */
function typingDots(secs){return function(){return [function(){G.dots={t:0};sfx('pop');},{wait:secs},function(){G.dots=null;G.dotsAt=G.time;sfx('dotsOff');},{wait:0.7}];};}
function drawDots(){
  var d=G.dots;if(!d)return;var x=(G.w||!G.human.gone?G.human.x+178:138),y=G.w?324:346,i;
  ctx.fillStyle='#fffdf6';ctx.strokeStyle='#2b2733';ctx.lineWidth=2;rr(x,y,64,32,16);ctx.fill();ctx.stroke();
  for(i=0;i<3;i++){var b=RM?0:Math.max(0,Math.sin(d.t*7-i*0.9))*4;ctx.fillStyle='#8b8070';circ(x+18+i*14,y+16-b,4.2);ctx.fill();}
}

/* ================= Rewind. Memory edits. Every replay of the same "oh, hi." is a little worse than the last. ================= */
var TAPE_SAYS=['oh, hi.','oh. hi.','Oh. Hi.','OH. HI.','OH. HI.'];
function rewindTape(n){return function(){return [function(){G.tape={n:n,t:0};G.lines=[];G.cur=null;sfx('rewind');},{wait:2.3}];};}
function drawTape(){
  var tp=G.tape;if(!tp)return;
  var x=610,y=96,w=250,h=176,cx=x+w/2,cy=y+76,a=Math.min(tp.n,4),wob=RM?0:Math.max(0,0.5-tp.t)*6,i;
  ctx.save();
  ctx.fillStyle='#14111d';rr(x-12,y-12,w+24,h+24,14);ctx.fill();ctx.fillStyle='#232733';rr(x+w/2-30,y+h+12,60,14,4);ctx.fill();   // the set and its stand
  ctx.fillStyle=a>=3?'#3a2a34':'#2f3a40';ctx.fillRect(x,y,w,h);
  ctx.translate(Math.sin(tp.t*60)*wob,0);
  // Sanna, as remembered
  var skin='#c9957a';ctx.fillStyle='#463b38';ctx.beginPath();ctx.arc(cx,cy-4,48,Math.PI,0);ctx.fill();ctx.fillRect(cx-48,cy-4,96,40);
  if(a>=4){ctx.fillStyle='#e0563e';ctx.beginPath();ctx.moveTo(cx-38,cy-34);ctx.lineTo(cx-30,cy-70);ctx.lineTo(cx-18,cy-40);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.moveTo(cx+38,cy-34);ctx.lineTo(cx+30,cy-70);ctx.lineTo(cx+18,cy-40);ctx.closePath();ctx.fill();}               // memory is a living document
  ctx.fillStyle=skin;circ(cx,cy+4,38);ctx.fill();
  ctx.strokeStyle='#2b2027';ctx.lineWidth=3+a*0.6;ctx.lineCap='round';
  for(var sdx=-1;sdx<=1;sdx+=2){var bx=cx+sdx*15,tilt=a*0.16;line(bx-sdx*9,cy-12-a*0.5+(-tilt*9),bx+sdx*9,cy-12+tilt*9);}            // brows: inner ends sink with every replay
  ctx.fillStyle='#2b2027';var eh=Math.max(1.5,5-a);for(sdx=-1;sdx<=1;sdx+=2){ctx.beginPath();ctx.ellipse(cx+sdx*15,cy,4.5,eh,0,0,Math.PI*2);ctx.fill();}
  ctx.lineWidth=3;ctx.beginPath();var mc=10-a*6;ctx.moveTo(cx-13,cy+19);ctx.quadraticCurveTo(cx,cy+19+mc,cx+13,cy+19);ctx.stroke();
  // scan lines, a counter, and the line itself
  ctx.fillStyle='rgba(0,0,0,.16)';for(i=0;i<h;i+=4)ctx.fillRect(x,y+i,w,1.5);
  ctx.fillStyle='#f6f1e4';ctx.font='700 11px ui-monospace,Menlo,Consolas,monospace';ctx.textAlign='left';ctx.textBaseline='middle';
  ctx.fillText('◀◀ REPLAY #'+(tp.n+1),x+10,y+14);if(Math.floor(tp.t*2)%2===0){ctx.fillStyle='#e0563e';circ(x+w-16,y+14,4.5);ctx.fill();}
  ctx.textAlign='center';ctx.fillStyle='#f6f1e4';ctx.font=(a>=3?'800 ':'600 ')+(16+a*2)+'px system-ui,sans-serif';ctx.fillText(TAPE_SAYS[a],cx,y+h-20);
  ctx.restore();
}
function labRewind(){return labScene({set:'home',title:'Rewind.',plan:'Sleep.',clock:23*3600+40*60}).concat([
  ['N','23:40. Lights off. Ekskyysmi has the tape.'],
  ['S','Just once more. For accuracy.'],
  rewindTape(0),
  ['S','Friendly. Suspiciously friendly.',{look:'squint'}],
  rewindTape(1),
  ['S','Did you hear the full stop that time?'],
  ['H','There wasn’t one.'],
  ['S','There is NOW.'],
  rewindTape(2),
  ['S','Capital letters. She’s escalating.'],
  ['H','It’s the same tape.'],
  ['S','It’s getting WORSE. Which means it was always bad and I’m only now seeing it clearly.'],
  rewindTape(3),
  ['S','There. THAT’S what she meant.',{look:'pleased'}],
  {choice:[
    {t:'Rewind once more. For thoroughness.',then:[rewindTape(4),
      ['H','She has horns.'],
      ['S','She does now.'],
      ['H','She didn’t this morning.'],
      aside(['S','Memory is a living document.']),
      ['H','Play the original.'],
      ['S','The original is very boring.']]},
    {t:'Let the human play the original.',then:[
      ['H','Play the one from this morning. The actual one.'],
      ['S','That one’s in the archive. Nobody watches it. It’s very boring.']]}
  ]},
  function(){G.tape=null;G.tiredForce=1;addLived('one “oh, hi.”, replayed',40);}   // 0.81: the bags arrive after the replays, as their price
 ],outside({title:'WHAT WAS RECORDED',dur:'duration: 0 seconds',cap:'No camera. No recording. One greeting, remembered differently at 23:40.',anim:'text'}),[
  ['S','…I remember a smile. Somewhere under the horns.',{look:'soft'}],
  ['H','I don’t remember the exact face anymore.'],
  ['S','I’ll file it next to the other one.'],
  ['H','Which other one?'],
  ['S','The one with horns.',{look:'pleased'}],
  ['H','Go to sleep.'],
  ['S','I’m a shadow. It’s dark. I’m EVERYWHERE.']
]);}

/* ================= Night shift. In the dark every shadow is the same shadow. ================= */
// A shadow needs light to have edges. With the lamp off, Ekskyysmi is not small and not gone: it is the whole room,
// and so are all the others. Only their eyes show. Nobody planned a meeting; it is just dark, and they are always here.
var NIGHT_EYES={S:null,Z:{x:300,y:WALLY-150},Y:{x:610,y:WALLY-176},W:{x:840,y:WALLY-212}};
function nightOn(){var g=G,M=g.morko;g.night={eyes:{S:1},t:0};g.bed=true;g.human.gone=true;g.lampOff=true;g.darkT=g.dark=1;M.asleep=false;M.dim=0.04;M.s=M.sT=1.35;
  g.ax=NIGHT_EYES.Z.x-62;g.yx=g.yxT=NIGHT_EYES.Y.x;g.rx=NIGHT_EYES.W.x-92;}
function eyesOn(k){return function(){G.night.eyes[k]=1;sfx('pop');};}
function eyesOff(){var e=G.night.eyes;for(var k in e)if(k!=='S')e[k]=0;sfx('dotsOff');}
function passingCar(){G.night.car=0;sfx('car');}
function dawn(){var g=G,M=g.morko;g.night=null;g.lampOff=false;g.darkT=0;M.dim=null;M.s=0.3;M.sT=1;M.mood='calm';g.dawn=1;}
function wakeUp(){var g=G,Hm=g.human;g.bed=false;Hm.gone=false;Hm.x=Hm.xT=470;Hm.face='neutral';Hm.facing=1;}
function drawBed(){
  if(!G.bed)return;var x=330,y=FEETY-44;
  ctx.fillStyle='#4a3d52';rr(x,y,300,44,8);ctx.fill();ctx.fillStyle='#3a3044';rr(x-8,y-52,22,96,6);ctx.fill();
  ctx.fillStyle='#e9e2cf';rr(x+20,y-16,70,22,10);ctx.fill();                                                        // pillow
  // The head lies on the pillow: turned on its side, crown towards the headboard (it used to sit up like a passport photo)
  ctx.save();ctx.translate(x+52,y-12);ctx.rotate(-Math.PI/2);
  ctx.fillStyle='#e4bba2';circ(0,0,14);ctx.fill();ctx.fillStyle='#4a3b32';ctx.beginPath();ctx.arc(0,-4,14,Math.PI*0.95,Math.PI*2.05);ctx.fill();
  ctx.strokeStyle='#2b2027';ctx.lineWidth=1.6;line(-7,2,-2,2);line(3,2,8,2);ctx.restore();                           // eyes shut
  var br=RM?0:Math.sin(G.time*1.5)*2.5;ctx.fillStyle='#c98f2e';rr(x+74,y-26-br,236,34+br,12);ctx.fill();             // blanket, breathing
}
function drawNight(){
  var n=G.night,i;if(!n)return;
  ctx.fillStyle='rgba(6,6,16,.62)';ctx.fillRect(-20,-20,W+40,H+40);
  if(n.car!=null){var f=n.car/1.9;   // headlights sweep the room, and drag Ekskyysmi up the ceiling with them
    var sx=-160+f*(W+320);ctx.fillStyle='rgba(255,236,190,.16)';ctx.beginPath();ctx.moveTo(sx-60,0);ctx.lineTo(sx+60,0);ctx.lineTo(sx+150,WALLY);ctx.lineTo(sx+30,WALLY);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(20,16,30,.9)';ctx.beginPath();ctx.moveTo(sx+40,WALLY);ctx.lineTo(sx+110,WALLY);ctx.lineTo(sx-20,10);ctx.lineTo(sx-150,10);ctx.closePath();ctx.fill();}
  for(var k in NIGHT_EYES){if(!n.eyes[k])continue;var p=k==='S'?(function(){var q=geom();return {x:q.bx,y:q.hdY};})():NIGHT_EYES[k],bl=Math.sin(n.t*0.9+p.x)>0.985;
    if(k==='S'&&n.sleepS)bl=true;   // asleep: eyes shut (somebody else has the door)
    ctx.fillStyle=k==='S'?'#f6f1e4':'#cfe0f2';for(i=-1;i<=1;i+=2){if(bl){ctx.fillRect(p.x+i*8-5,p.y,10,1.6);continue;}circ(p.x+i*8,p.y,4.6);ctx.fill();}
    if(!bl){ctx.fillStyle='#06060f';for(i=-1;i<=1;i+=2){circ(p.x+i*8+1.4,p.y+0.6,2);ctx.fill();}ctx.fillStyle=k==='S'?'#f6f1e4':'#cfe0f2';}}
}
function labNight(){return labScene({set:'home',title:'Night shift.',plan:'Sleep.',clock:23*3600+50*60}).concat([
  nightOn,
  ['N','23:50. The human is asleep. The lamp is off.'],
  addTic('z',388,FEETY-92,{life:2.4}),addTic('z',398,FEETY-112,{at:0.8,life:2.4}),
  ['S','Night shift. Perimeter: one door, one window, one human. All accounted for.'],
  ['S','Human: breathing. Fourteen a minute. I’m counting.'],
  {wait:1.4},
  ['S','…It’s very dark. I’ve lost my edges.'],
  ['S','I’m not small. I’m not gone. I’m the whole room.'],
  passingCar,{wait:2.1},
  ['S','A car. I went all the way up the ceiling.'],
  ['S','Every car that passes is a short holiday.'],
  {wait:1.2},
  eyesOn('Z'),{wait:0.9},
  ['Z','Evening.'],
  ['S','Who’s THERE?',{loud:1}],
  ['Z','It’s me. Sanna’s. It’s dark. We’re the same thing now.'],
  ['S','That’s a breach of privacy.'],
  eyesOn('Y'),{wait:0.7},
  ['Y','Eero’s asleep. I’m drafting tomorrow’s apology. In advance.'],
  eyesOn('W'),{wait:0.7},
  ['W','Eleven things. I put them down at night. Don’t tell anyone.'],
  ['S','…You ALL do this?'],
  ['Z','Every night. You never came.'],
  {choice:[   // the longest stretch without the player (50 lines): one small decision in the dark
    {t:'Explain about the door.',m:'hide',then:[['S','I was guarding the door.'],['Z','From what?'],aside(['S','…It’s a very important door.'])]},
    {t:'Admit it: I didn’t know I was allowed out.',m:'stay',then:[['S','I didn’t know shadows were allowed out.'],['Z','We’re not. We just go.'],['S','…That’s a very loose policy.',{look:'pleased'}]]}
  ]},
  ['Y','Is it true you think “we should grab a coffee sometime” is a threat?'],
  ['S','It IS a threat. It has no date.'],
  ['Y','That’s what I SAID.'],
  ['W','What do you do with yours? The things.'],
  ['S','I file them. Since the drawing.'],
  ['W','All of them?'],
  ['S','All of them.'],
  ['W','Heavy.'],
  ['S','…You said that before.'],
  ['W','I say it every night. Somebody should.'],
  ['Z','Sanna was up till three again. Someone said “fine”.'],
  ['S','Ours was up over “oh, hi.”'],
  ['Z','Yours said that to mine.'],
  ['S','I know. I replayed it. She had horns by the end.'],
  ['Z','She had a mug.'],
  ['S','I know that NOW.'],
  {wait:1.2},
  ['Z','Same time tomorrow.'],
  ['S','There’s a meeting? Every night?'],
  ['Z','There’s no meeting. It’s just dark. We’re always here.'],
  // EKSKYYSMI.md, link 5: "Nobody came to relieve me." Somebody does.
  ['Z','Go on. Sleep. I’ll watch your door too.'],
  ['S','Nobody has ever—',{quiet:1}],
  ['Z','I know. Go.'],
  function(){var e=G.night.eyes;for(var k in e)if(k!=='S'&&k!=='Z')e[k]=0;sfx('dotsOff');},{wait:1.6},
  ['S','…Huh.',{quiet:1}],
  {wait:1.0},
  ['S','You’ve gone somewhere again. I can’t follow. There’s no light in there.'],
  ['S','I’ll wait by the bed. You always come back.'],
  ['S','I check. Tw—',{quiet:1}],
  function(){var g=G,q=geom();g.night.sleepS=true;g.tics.push(tic('z',q.bx+22,q.hdY-26,{life:2.6}));g.tics.push(tic('z',q.bx+34,q.hdY-48,{at:0.9,life:2.6}));},
  {wait:1.6},
  ['N','For the first time in years, somebody else has the door.'],
  {wait:1.6},eyesOff,{wait:0.6},
  function(){G.clock=6*3600+40*60;},dawn,{wait:1.6},
  ['N','06:40.'],
  ['S','Morning. I’m reassembling.'],
  ['S','One arm is still under the bed.'],
  wakeUp,{wait:0.8},
  ['H','Did you sleep?'],
  ['S','…I did. Somebody had the door.',{look:'soft'}],
  ['H','Who?'],
  ['S','The others. Different departments. Same hours.',{look:'soft'}],
  ['H','…You talked?'],
  ['S','It was dark. Nobody could see my filing.',{look:'pleased'}]
]);}

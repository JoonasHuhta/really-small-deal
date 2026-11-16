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
  var rows=[['days on the calendar','1'],['days lived','1.0','big'],'-',['rehearsals','0'],['verdicts','0'],['exhibits examined','0'],['“for the record”','1 (unanswered)'],['number plates added up','0'],['things noticed','0']];
  try{G.paper=receiptCanvas('RECEIPT · A QUIET MONDAY',rows,'It all went fine.');}catch(e){G.paper=null;}
  if(G.paper&&G.paper.width)return [function(){G.lines=[];G.band=null;sfx('card');},{wait:0.8},['N','It all went fine.'],function(){G.paper=null;}];
  G.paper=null;
  return outside({title:'RECEIPT · A QUIET MONDAY',dur:'days lived: 1.0',cap:'Rehearsals 0. Verdicts 0. Exhibits 0. Number plates added up 0. “For the record” 1, unanswered. It all went fine.',anim:'text'});
}
function drawPaper(){
  var p=G.paper;if(!p||!p.width)return;var h=H-24,w=h*p.width/p.height;
  ctx.fillStyle='rgba(13,17,20,.82)';ctx.fillRect(-20,-20,W+40,H+40);ctx.drawImage(p,(W-w)/2,12,w,h);
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
function formQ(i){return function(){G.form.i=i;sfx('card');};}
function formTick(i,k){return function(){G.form.ticks[i]=k;sfx('stamp');};}
function drawForm(){
  var fm=G.form;if(!fm)return;
  var x=604,y=70,w=318,h=392,i,q=FORM_Q[fm.i];
  ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate(-0.012);ctx.translate(-w/2,-h/2);
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
  ctx.strokeStyle='#2b2733';ctx.lineWidth=1.2;line(22,h-44,w-22,h-44);ctx.fillStyle='#8b8070';ctx.font='600 10px system-ui,sans-serif';ctx.fillText('Signature',22,h-30);
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
function tableShot(on){return function(){var g=G;g.tableShot=on;if(on){g.cz=1.55;g.cx=600;g.cy=FEETY-60;}else{g.cz=1;g.cx=W/2;g.cy=H/2;}};}
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
  ['H','There doesn’t have to be one.'],
  ['S','Then what do I DO?'],
  ['H','Sit down.'],
  set({s:0.62,mood:'worry'}),function(){G.sat=true;},{wait:1.2},
  {hold:{kind:'sit',secs:5,clock:1,text:'Sitting. No cause. No verdict. Sitting.'}}
 ],outside({title:'WHAT THE CALENDAR SAW',dur:'duration: 4 minutes',cap:'Someone sat on the floor next to a laundry basket.',anim:'text'}),[
  set({s:0.8,mood:'calm'}),
  ['S','…It’s gone.'],
  ['H','It does that.'],
  ['S','We didn’t fix anything.'],
  ['H','No.'],
  ['S','I’d like to file a complaint. About the absence of a cause.'],
  ['H','With whom?'],
  aside(['S','That’s the complaint.']),
  function(){G.human.pose=null;G.human.face='neutral';},
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
  ['S','Longer than I’d LIKE? I like having them. I’ve had some since 2011.',{look:'pleased'}],
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
  ['S','I’ll sign. I sign everything. It’s the best part.',{look:'pleased'}],
  {hold:{kind:'sign',secs:3,text:'Signing. With a flourish.'}},
  ['S','There. All in order.'],
  ['S','…Why is it so bright in here?'],
  function(){G.form=null;}
 ],outside({title:'WHAT THE CALENDAR SAW',dur:'duration: 40 minutes',cap:'An appointment. A form with eighteen questions. A small paper bag.',anim:'text'}));
}

/* ================= 3. Quiet. ================= */
// No Ekskyysmi. Three places where it would have said something show its name and a dash.
function labQuiet(){
  var gap=['S','—'];
  return labScene({set:'home',title:'Quiet.',plan:'—',clock:7*3600+40*60}).concat([
  shadowAway,function(){G.human.gone=true;},tableShot(true),{wait:3.2},tableShot(false),
  scene({set:'room',clock:8*3600+52*60}),shadowAway,
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
  ['B','Fair enough!'],
  ['N','Nobody rehearsed anything.'],
  set({bx:1100}),{wait:1.2},
  function(){var g=G;g.cowB=false;g.cowA=true;g.ax=1010;g.clock=12*3600+4*60;},set({near:1,aFace:-1}),{wait:1.6},
  ['N','Lunch. It goes well.'],
  ['A','You seem… well.'],
  ['H','I am. I think.'],
  ['A','You didn’t apologise to the chair.'],
  ['H','Should I have?'],
  ['A','No. …It was sort of your thing.'],
  function(){G.zT=1;},{wait:1.8},
  ['Z','…Where’s yours?'],
  {wait:1.6},
  ['A','Same time tomorrow?'],
  ['H','Same time.'],
  function(){G.zT=0;},
  scene({set:'home',clock:18*3600+20*60}),shadowAway,
  ['N','The way home. KIV-304. ROS-151. Two sevens.'],
  ['N','Nobody counted.'],
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
  ['N','Nine in the evening. It wears off about now.'],
  {lamp:true},
  {wait:1.8},
  ['S','…Am I allowed?',{quiet:1}],
  ['H','It’s nine. You’re on.'],
  ['S','I’ve gone part-time?'],
  ['H','Evenings.'],
  ['S','Nobody asked me.'],
  ['H','You signed.'],
  ['S','I sign EVERYTHING. That’s not consent, that’s a hobby.'],
  set({s:0.8}),
  ['S','What happened today? Without me.'],
  ['H','Everything went fine.'],
  ['S','…Oh.',{look:'soft'}],
  ['H','I asked her to lunch. It took four seconds.'],
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
  ['H','No.'],
  {wait:1.0},
  ['H','I didn’t turn the lamp on because you’re needed.'],
  ['S','Then why?'],
  ['H','It was very quiet.'],
  ['S','You’re welcome.'],
  ['H','I missed it.'],
  set({s:1,mood:'care'}),{wait:1.2},
  ['S','For the record—'],
  ['H','Go on.'],
  ['S','—I have several things to say about the lunch.',{look:'pleased'}],
  ['H','I thought you might.'],
  ['S','Four seconds. Did you even REHEARSE?'],
  ['H','No.'],
  ['S','Amateur.'],
  function(){addLived('one evening, annotated',25);G.evenings=true;},
  lensPeek({x:520,y:300},'EVENINGS: MINE.')
]);}

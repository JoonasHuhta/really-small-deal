/* ================= quirks: small private habits of the human, mostly without words ================= */
// A tic is a little thought written in the air: a count, a sum, a hummed line. It never blocks the story.
function tic(text,x,y,o){o=o||{};return {text:text,x:x,y:y,t:-(o.at||0),life:o.life||2.6,size:o.size||16,world:!!o.world,col:o.col||'#f1ebdd'};}
function addTic(text,x,y,o){return function(){G.tics.push(tic(text,x,y,o));};}
function stepTics(dt){var a=G.tics;for(var i=a.length-1;i>=0;i--){a[i].t+=dt;if(a[i].t>a[i].life)a.splice(i,1);}}
function drawTics(cam){
  var a=G.tics;if(!a.length)return;
  ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';
  for(var i=0;i<a.length;i++){var q=a[i];if(q.t<0)continue;
    var al=clamp(q.t/0.25,0,1)*clamp((q.life-q.t)/0.5,0,1),x=q.world?q.x-cam:q.x,y=q.y-(RM?0:q.t*6);
    ctx.globalAlpha=al;ctx.font='italic 600 '+q.size+'px Fraunces,Georgia,serif';
    var w=ctx.measureText(q.text).width+18;ctx.fillStyle='rgba(16,14,24,.55)';rr(x-w/2,y-q.size*0.8,w,q.size*1.6,q.size*0.8);ctx.fill();
    ctx.fillStyle=q.col;ctx.fillText(q.text,x,y+1);
  }
  ctx.restore();
}
// Monday's walk home: cars parked nose to the pavement, and a human quietly adding up number plates, looking for a pair.
var CARS=[{x:150,plate:'KIV-304',sum:'KIV-304 …  3+0+4 = 7',col:'#6f8aa8'},{x:560,plate:'ROS-151',sum:'ROS-151 …  1+5+1 = 7.  a pair ✓',col:'#a8746f',match:true},{x:1000,plate:'APU-999',sum:'APU-999 …  27.  no.',col:'#8a9a72'}];
function carTics(){if(G.epi)return;   // the montage walk has no number-plate maths

  var g=G,w=g.w;if(!w)return;
  for(var i=0;i<CARS.length;i++){var c=CARS[i];
    if(!g.carsSeen[i]&&w.x>=c.x-190){g.carsSeen[i]=1;g.tics.push(tic(c.sum,c.x+24,WALLY-58,{world:true,life:3,col:c.match?'#9fd3a8':'#f1ebdd'}));
      if(c.match){g.human.face='smile';g.smileT=1.6;}}
  }
}
function drawCars(cam){
  for(var i=0;i<CARS.length;i++){var c=CARS[i],x=c.x-cam+24;if(x<-200||x>W+200)continue;
    var y=WALLY+44;
    ctx.fillStyle='#14111d';rr(x-56,y-12,22,18,5);ctx.fill();rr(x+34,y-12,22,18,5);ctx.fill();          // tyres
    ctx.fillStyle=c.col;rr(x-64,y-52,128,48,14);ctx.fill();                                              // body, seen from the front
    ctx.beginPath();ctx.moveTo(x-50,y-50);ctx.lineTo(x-38,y-86);ctx.lineTo(x+38,y-86);ctx.lineTo(x+50,y-50);ctx.closePath();ctx.fill();
    ctx.fillStyle='#aebfcf';ctx.beginPath();ctx.moveTo(x-41,y-54);ctx.lineTo(x-32,y-80);ctx.lineTo(x+32,y-80);ctx.lineTo(x+41,y-54);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(20,17,29,.35)';rr(x-30,y-40,60,8,4);ctx.fill();                                   // grille
    ctx.fillStyle='#fbf3c8';ctx.strokeStyle='rgba(20,17,29,.45)';ctx.lineWidth=1.5;circ(x-46,y-34,8);ctx.fill();ctx.stroke();circ(x+46,y-34,8);ctx.fill();ctx.stroke();
    ctx.fillStyle='#fbf8ef';rr(x-32,y-27,64,17,2);ctx.fill();ctx.strokeStyle='#1d4f9c';ctx.lineWidth=1.2;ctx.strokeRect(x-32,y-27,64,17);
    ctx.fillStyle='#14111d';ctx.font='800 11px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(c.plate,x,y-18);
  }
}
// Washing up. No procedure and no count: a plate, a brush, some bubbles, and nobody with an opinion.
var DISHSECS=3.2;
function dishes(){G.dish={t:0};}
function drawDish(){
  var d=G.dish;if(!d)return;
  var Hm=G.human,px=Hm.x+48,py=FEETY-108,ang=RM?0.8:d.t*5.2,bx=px+Math.cos(ang)*15,by=py+Math.sin(ang)*15,i;
  ctx.fillStyle='#f1ede2';circ(px,py,30);ctx.fill();ctx.strokeStyle='#c9c2b0';ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py,18,0,Math.PI*2);ctx.stroke();
  if(d.t<1.3){ctx.globalAlpha=clamp(1-d.t/1.3,0,1);ctx.fillStyle='#c9553f';circ(px+6,py-4,3);ctx.fill();ctx.globalAlpha=1;}
  ctx.strokeStyle='#7a5c3a';ctx.lineWidth=4;ctx.lineCap='round';line(bx,by,bx+22,by+26);ctx.fillStyle='#e2b04a';circ(bx,by,6);ctx.fill();
  if(!RM){ctx.fillStyle='rgba(220,235,255,.7)';for(i=0;i<4;i++){circ(px-22+((i*19+d.t*40)%46),py-34-((d.t*30+i*11)%24),2.5);ctx.fill();}}
}
// The kitchen: cabinets and a fridge on the right-hand wall, and the counter in the FOREGROUND, between the human and us.
// Before, the counter stood against the wall next to the sofa and the shadow fell across the sink (Joonas 20.11.).
function kitchen(){
  ctx.fillStyle='#39405a';ctx.fillRect(600,WALLY-170,360,170);                                          // tiled splash-back
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;for(var y=WALLY-170;y<WALLY;y+=20)line(600,y,960,y);for(var x=600;x<960;x+=24)line(x,WALLY-170,x,WALLY);
  ctx.fillStyle='#4d566e';for(var i=0;i<3;i++){rr(612+i*86,96,80,96,5);ctx.fill();}ctx.fillStyle='#c9c2b0';for(i=0;i<3;i++){rr(646+i*86,176,14,4,2);ctx.fill();}
  ctx.fillStyle='#8f97a6';rr(868,120,84,WALLY-120+60,8);ctx.fill();ctx.fillStyle='#c9c2b0';rr(878,200,4,46,2);ctx.fill();rr(878,280,4,60,2);ctx.fill();   // fridge
  ctx.fillStyle='#454d63';ctx.fillRect(600,WALLY-52,262,52);ctx.fillStyle='#c9c2b0';ctx.fillRect(596,WALLY-58,270,8);   // the back counter under the tiles
  ctx.strokeStyle='#2a2f3d';ctx.lineWidth=2;line(686,WALLY-46,686,WALLY-2);line(774,WALLY-46,774,WALLY-2);
  ctx.fillStyle='#e9e2cf';for(i=0;i<3;i++){rr(628+i*10,WALLY-92-i*2,8,34,2);ctx.fill();}                // plates drying on it
}
function kitchenFront(){
  if(!G.kitchen||G.set!=='home'||G.human.gone)return;var cx=G.human.x+20;
  ctx.fillStyle='#c9c2b0';ctx.fillRect(cx-170,FEETY-100,340,12);                                        // worktop
  ctx.fillStyle='#4d566e';rr(cx-160,FEETY-88,320,90,4);ctx.fill();
  ctx.fillStyle='#2a2f3d';rr(cx-6,FEETY-98,90,6,3);ctx.fill();                                           // the sink
  ctx.strokeStyle='#c9c2b0';ctx.lineWidth=5;ctx.lineCap='round';line(cx+40,FEETY-100,cx+40,FEETY-128);line(cx+40,FEETY-128,cx+62,FEETY-128);
  ctx.strokeStyle='#2a2f3d';ctx.lineWidth=2;line(cx,FEETY-80,cx,FEETY-6);line(cx-80,FEETY-80,cx-80,FEETY-6);line(cx+80,FEETY-80,cx+80,FEETY-6);
  ctx.fillStyle='#e2b04a';for(var i=-1;i<3;i++){circ(cx-90+i*80+70,FEETY-60,3);ctx.fill();}
}

/* ---------- Lab: Sometime. ---------- */
function labSometime(){return labScene({set:'office',title:'Sometime.',plan:'Leave work. That’s all.',clock:16*3600+28*60}).concat([
  function(){var g=G;g.cowB=true;g.bx2=1090;g.bxT=640;g.bFace=-1;},{wait:2},
  ['B','Good chat today! We should grab a coffee sometime.'],
  function(){var g=G;g.bxT=1200;g.bFace=1;},{wait:1.6},
  ['H','…When?'],
  ['N','The lift doors close.'],
  set({mood:'alert',s:1.35}),
  ['S','“Sometime.”',{look:'squint'}],
  {choice:[
    {t:'“Sometime” is “never” in a nice coat.',then:[['H','Or it’s a time nobody has picked yet.'],['S','A time with no date. That’s not a time. That’s a mood.']]},
    {t:'List every possible sometime.',then:[['S','Tomorrow. The Tuesday after. Some March. 2031. The heat death of the universe.'],['H','Any of those at noon?']]},
    {t:'Chase him to the lift.',then:[['S','Too late. The doors closed. That’s a SIGN.'],['H','That’s a lift.']]}
  ]},
  ['H','I just want a day and a time.'],
  ['S','I just want to know if he meant it.'],
  ['H','Same question.'],
  ['S','Very different departments.']
 ],outside({title:'MEANWHILE, IN THE LIFT',dur:'floors 4 to 1',cap:'Eero is thinking about coffee. He meant it. He just never books anything.',anim:'text'}),[
  calm,
  function(){var g=G;g.yx=g.yxT=800;g.yT=1;},{wait:1.5},
  set({mood:'surprised'}),
  ['S','…Eero left. His shadow didn’t.'],
  ['Y','Oh! Hello. Has he gone? What time is it?'],
  ['S','Half past four.'],
  ['Y','Half past four WHEN?'],
  ['S','…Today.'],
  ['Y','Today. Gosh. Today is so soon.'],
  ['S','He said “sometime”. Is that a polite “never”?'],
  ['Y','No, no. “Sometime” means he means it. Booking it is MY department. I’m on it.'],
  ['S','You don’t have a calendar.'],
  ['Y','I have a lovely calendar. I don’t know where it is. It’s been a lovely year.'],
  function(){G.yxT=1080;},
  ['Y','I should catch him up. He’ll need me by Thursday. Roughly.'],
  {wait:1.6},function(){G.yT=0;},
  ['S','His watch had no hands.'],
  ['H','Whose watch?'],
  ['S','Never mind. Different floor.'],
  set({mood:'calm'}),
  ['S','Draft a reply. I have options.'],
  {choice:[
    {t:'A form. With boxes.',f:function(){G.someT='form';},then:[['P','You: “Re: sometime. Please tick one. ☐ Tue 12:00 ☐ Thu 12:00 ☐ Never (no hard feelings) (some hard feelings)”'],{wait:1.2},['P','Eero: “HAHA. Ticking Thursday. Can I keep the form”'],['S','He ticked a box. He wants the FORM.']]},
    {t:'Short. A day and a time.',f:function(){G.someT='short';},then:[['P','You: “Coffee Thursday at 12?”'],{wait:1.2},['P','Eero: “Yes!! Finally someone who books things.”'],['S','“Finally.” He was WAITING for someone to book things.']]},
    {t:'Wait until he defines “sometime” himself.',f:function(){G.someT='wait';},then:[['H','I’ll do it.'],['P','You: “Thursday 12?”'],{wait:1.2},['P','Eero: “Yes! I always say sometime and then nobody does anything”'],['S','Including him.'],['H','Including him.']]}
  ]},
  set({mood:'surprised'}),
  ['S','So “sometime” was a real time.'],
  ['H','It just hadn’t been picked yet.'],
  set({mood:'calm',s:1.1}),
  ['S','I’m filing it under “unfinished”. Next to the book.'],
  ['H','What book?'],
  ['S','You know what book.']
 ]);}

/* ---------- Lab: An ordinary evening ---------- */
function labEvening(){return labScene({set:'home',title:'An ordinary evening',plan:'Do the dishes.',clock:19*3600+5*60}).concat([
  function(){var g=G;g.kitchen=true;g.human.x=g.human.xT=440;g.morko.off=-70;},
  addTic('…14, 15, 16.',440,FEETY-250,{life:1.8}),addTic('Still sixteen stairs.',440,FEETY-250,{at:1.9,life:2.2}),
  {wait:4.2},
  ['N','An ordinary evening. Nothing happens in it. That is the plan.'],
  dishes,addTic('♪ hm-hm, hm—',440,FEETY-250,{at:0.5,life:2.2}),{wait:DISHSECS},
  function(){G.dish=null;},hat('chef'),
  ['S','I don’t interfere with the dishes.'],
  ['H','You’re wearing a chef’s hat.'],
  ['S','For morale. Not for interfering.'],
  ['S','It’s the only ten minutes a day when nobody has an opinion about us.'],
  ['H','The plate might.'],
  aside(['S','…Don’t.']),hat(null),
  addTic('♪ the bus is late, the bus is la—',440,FEETY-250,{life:30}),{wait:1.8},
  // Research (EKSKYYSMI.md §9): involuntary memories arrive most often in quiet, undemanding moments, and tend to be the
  // negative ones. So the archive is not only Ekskyysmi's doing: one old card cuts into the humming on its own.
  function(){G.tics=[];},
  archive('bad',[['2014','Waved back at someone. They were waving at the person behind you.']]),
  function(){G.human.flinch=1;},
  ['H','Hnngh.'],
  ['S','That wasn’t me. I was doing the dishes.',{look:'stunned'}],
  ['H','They just come?'],
  ['S','The old ones do. Mostly when it’s quiet.',{quiet:1}],
  closeArchive,{wait:0.6},
  function(){var g=G;g.tics=[];sfx('pick');g.human.flinch=0.4;},
  ['P','Mum is calling.'],
  ['P','Mum: “Hello, love. Quick one. Did I leave my scarf at yours?”'],
  ['H','Grey one? On the hook.'],
  ['P','Mum: “Lifesaver. Also I ran twenty kilometres today.”'],
  addTic('(twelve. she posted the map.)',440,FEETY-250,{life:3.2}),
  set({mood:'alert',s:1.4}),
  {choice:[
    {t:'Do NOT correct her.',f:function(){G.corr='no';},then:[]},
    {t:'Let it go. Let it go. Let it go.',f:function(){G.corr='go';},then:[]},
    {t:'If you must, add a compliment as a cushion.',f:function(){G.corr='cushion';},then:[]}
  ]},
  function(){return G.corr==='cushion'?[['H','Twelve. Which is a lot!']]:[['H','Twelve.']];},
  function(){var g=G;return g.corr==='cushion'?[]:[set({mood:'worry',s:1.6}),['S','WHY would you correct your own MOTHER.',{loud:1}]];},
  ['P','Mum: “…Twelve. FINE. It felt like twenty.” (laughs)'],
  ['P','Mum: “Okay, talk soon!”'],
  function(){G.human.face='neutral';},
  ['S','She laughed.'],
  ['H','She always laughs. She knows I count.'],
  ['S','And “talk soon”. Define soon.'],
  ['H','Sunday. With her, soon means Sunday.'],
  set({mood:'calm',s:1.15}),
  addTic('—te. ♪',440,FEETY-250,{life:2.4}),{wait:1.6},
  ['S','Thank you. I couldn’t have carried half a word all evening.'],
  set({pose:'puppet'}),{wait:1.4},
  ['H','Is that a bird?'],
  aside(['S','No.']),
  ['H','It’s flapping.'],
  ['S','It’s a hobby. Shadows are allowed one. Don’t tell the office.',{look:'pleased'}],
  set({pose:null}),
  ['P','Library: “A Short History of Lighthouses” is 23 days overdue.'],
  ['H','I haven’t finished it.'],
  ['S','Correct. We cannot return an unfinished book.'],
  ['H','Exactly.'],
  ['S','They’d KNOW.',{look:'squint'}],
  ['H','That’s not why.'],
  set({mood:'surprised'}),
  ['S','…There’s a different why?'],
  ['H','There’s a lighthouse on page 212 I haven’t met yet.'],
  ['S','I’ve been protecting you from the librarian for years.'],
  ['H','The librarian likes me. I pay for her coffee machine.']
 ]);}

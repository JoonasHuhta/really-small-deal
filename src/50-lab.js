/* ================= SCENARIO LAB: stand-alone scenes for trying ideas before they join the week ================= */
var LABS={
  sometime:{title:'Sometime.',blurb:'A colleague says “we should grab a coffee sometime” and leaves. When is sometime?',script:labSometime},
  evening:{title:'An ordinary evening',blurb:'Stairs, dishes, a half-hummed line, an overdue book. Nothing happens. On purpose.',script:labEvening},
  glass:{title:'Evidence.',blurb:'Two people stop laughing when you walk in. Ekskyysmi gets out the magnifying glass.',script:labGlass},
  colleagues:{title:'Colleagues.',blurb:'Sanna’s shadow says “oh. hi.” to Ekskyysmi. Now it knows how that felt.',script:labColleagues},
  epilogue:{title:'The week, itemised.',blurb:'The epilogue: the week in flashes to the song, then the whole receipt. Tap twice to skip.',script:labEpilogue},
  lampgap:{title:'Lamp gap.',blurb:'Test clone of the walk home. Between the street lamps, the shadow falls behind.',script:labLampGap},
  bag:{title:'The bag.',blurb:'Test clone of Thursday 18:40. A whole day of holding the face, then a bag that will not open.',script:labBag},
  night:{title:'Night shift.',blurb:'The human is asleep and the lamp is off. In the dark every shadow is the same shadow.',script:labNight},
  rewind:{title:'Rewind.',blurb:'23:40. Ekskyysmi replays one “oh, hi.” Every replay is a little worse than the last.',script:labRewind},
  nothing:{title:'Nothing.',blurb:'A Sunday, some laundry, and a hit that nobody sent. Ekskyysmi looks for the culprit. There isn’t one.',script:labNothing},
  form:{title:'The form.',blurb:'A waiting room and eighteen questions. For once the form is about Ekskyysmi. It signs.',script:labForm},
  quiet:{title:'Quiet.',blurb:'Best in the story. A Monday with nobody on the wall. Nothing happens, and that is the point.',script:labQuiet},
  evenings:{title:'Evenings.',blurb:'Nine o’clock. It is dark. There is a lamp.',script:labEvenings},
  notnow:{title:'Not now.',blurb:'The one that is real: Riitta is short with you. Right about the fact, wrong about the size.',script:labNotNow},
  bar:{title:'A quiet drink.',blurb:'The bartender serves someone else first. Then he says “What?”. Ekskyysmi orders the shadow of a drink.',script:labBar},
  voice:{title:'The voice message',blurb:'Replying to a voice message with a voice message. Take one. Take two. Take fourteen.',script:labVoice},
  reply:{title:'The reply',blurb:'A few small edits before sending. For safety. Until nothing in the message can be rejected.',script:labReply},
  library:{title:'A fine.',blurb:'The overdue lighthouse book goes back. The librarian says it’ll be a fine.',script:labLibrary},
  posting:{title:'The posting.',blurb:'A job posting that is SO you. Ekskyysmi has a perfect record of never being rejected. It intends to keep it.',script:labPosting},
  detail:{title:'One small thing.',blurb:'Eero likes the slides. Just one small thing. For a moment everything is an X-ray.',script:labDetail},
  radiator:{title:'By the radiator.',blurb:'The next Tuesday. Ekskyysmi has a meeting with Sanna’s shadow. Three topics prepared. All of them weather.',script:labRadiator},
  footage:{title:'Footage.',blurb:'A nice chat with Sanna. Ekskyysmi switches to the corner camera. It only points one way.',script:labFootage},
  enhance:{title:'Enhance.',blurb:'One eyebrow. Four levels of zoom. A forensic investigation nobody asked for.',script:labEnhance},
  mug:{title:'A Tuesday, with a mug.',blurb:'Prototype (VISIO V1): the mug is how much of you there is today. The senses drain it, quiet refills it, and an empty mug makes a monster.',script:labMug},
  comments:{title:'The group chat',blurb:'A boss fight. Incoming messages look like daggers from a distance. Ekskyysmi has a headband.',script:labComments},
  kickoff:{title:'Kick-off.',blurb:'The phone buzzes and the chest goes. Ekskyysmi does the commentary. It was in the archive. It missed the kick-off.',script:labKickoff},
  snow:{title:'Snow indoors.',blurb:'A Sunday night. It snows in the living room. A door opens to summer. Ekskyysmi turns out to have a colour.',script:labSnow},
  plusone:{title:'Plus one.',blurb:'Lunch with Sanna. Eero joins. With every line between them the table gets a little longer.',script:labPlusOne},
  lift:{title:'The lift.',blurb:'Three floors with Eero. The humans say “morning”. The shadows talk. Eero’s has a reason, and a watch with no hands.',script:labLift},
  busstop:{title:'Bus stop.',blurb:'A colleague from the third floor. Two years of “hi”, name unknown. Ekskyysmi measures the distance in metres. Then one pole on the bus.',script:labBusStop},
  santa:{title:'Secret Santa.',blurb:'The office Christmas party. You drew Riitta. She opens your present in front of everyone and says one word.',script:labSanta},
  leaving:{title:'Leaving.',blurb:'Two ways out of a party: interrupt eleven conversations, or find out nobody noticed. Ekskyysmi is wearing a paper hat.',script:labLeaving},
  call:{title:'The call.',blurb:'One haircut, by phone. A script with fourteen branches. A receptionist who isn’t in any of them.',script:labCall}
};
function labScene(o){return [breath,function(){G.chapMusic=null;G.cSnap=G.lab||NOCARD[G.moment]?null:cardSnap();},scene(o),function(){
  var g=G;g.dayTag=g.moment&&WHEN[g.moment]?WHEN[g.moment].replace(/,\s*\d\d?:\d\d$/,''):null;g.stampT=0;if(!g.lab||g.lab!=='mug')g.mug=null;g.deal=null;   // a moment starts without the last chapter's mug; it brings its own if it needs one
  g.planText=o.plan;g.hud=true;g.plan=true;g.fade=0;
  if(g.lab){g.label=(DEVLAB?'Scenario lab / ':'Moments / ')+o.title;newDay();return;}
  // In the story the same scene opens with a card, like any other moment.
  g.label=o.title;if(NOCARD[g.moment]){g.fade=1;return;}   // continues the moment before it, without a new card
  g.chap={day:WHEN[g.moment]||'SOME TIME LATER',title:o.title,t:0,moment:true,snap:g.cSnap||null};g.cSnap=null;stopVoice();sfx('card');
 },function(){return G.lab||NOCARD[G.moment]?[]:[{wait:2.4},function(){G.chap=null;}];}];}   // 0.99.35: the veil has lifted already; the old G.fade=1 here dipped the scene to black a second time
function startLab(id){hotReset();
  reset('B');var g=G;g.started=true;g.lab=id;
  Q=LABS[id].script().concat([function(){showLabEnd(id);}]);run();
}
// Moments (TYOSUUNNITELMA.md section 4): for players. Extras are named by the situation, so someone can find the one that
// hurts right now; they open after the first day, because Monday teaches the language. Story moments appear once played,
// so the ending is never spoiled. The full Scenario lab is a development tool: index.html?lab.
// 0.99.32 (Joonas 26.11.: "in the test version I'd like access to every scene"): Settings › Unlock all (testing). Remembered on
// this device. Every chapter in Chapters, every scene in Moments (the story's, the extras, those being tried, the sketches).
var TESTING=false;try{TESTING=window.localStorage.getItem('ekskyysmi.test')==='on';}catch(e){}
var DEVLAB=(function(){try{return /[?&]lab\b/.test(window.location.search||'');}catch(e){return false;}})();
var EXTRAS=['detail','sometime','reply','voice','footage'];   // the posting is in the story now
// 0.99.22 (Joonas 26.11.: "let's make scenes into Moments and try all kinds of things"): new scenes start here, outside the story,
// under their own heading so a tester knows they are being tried. Whether one joins the week is decided later, with Joonas.
var TRYING=['kickoff','plusone','lift','busstop','leaving','call'];   // Snow indoors. joined the story (0.99.31), Secret Santa. after the library (0.99.37)
var SITUATION={santa:'Your present, opened in front of everyone.',leaving:'Going home from a party: say goodbye, or slip out.',call:'Booking something by phone. A live voice.',busstop:'A colleague at the bus stop whose name you never learned.',lift:'A lift with a colleague. Three floors. Nothing to say.',plusone:'Lunch for two, then a third person joins and you drop out.',kickoff:'The phone buzzes. The chest goes before anyone has read anything.',detail:'One small thing in a good review.',sometime:'“We should grab a coffee sometime.”',reply:'A short reply, edited until it says nothing.',
  voice:'Answering a voice message. Take fourteen.',posting:'A job ad that is so you. Not applying. Just in case.',footage:'Watching yourself instead of the conversation.'};
function momentButton(k,line){return '<button class="lab" type="button" data-lab="'+k+'"><b>'+tr(LABS[k].title)+'</b><span>'+tr(line)+'</span></button>';}   // 0.99.39: the menus translate too
// Alpha only: sketches waiting for a decision are reachable without ?lab (the artifact and the app can’t take a URL flag).
var WIP=['epilogue','mug'];
function wipList(shown){if(!DEVLAB&&!TESTING)return '';var list=WIP.slice();
  if(TESTING&&shown)for(var k in LABS)if(list.indexOf(k)<0)list.push(k);   // testing: every scene not listed above, the test clones included, once
  var h='<div class="eyebrow">'+tr(TESTING?'Work in progress and test clones':'Work in progress')+'</div><div class="lab-list">',n=0;
  for(var i=0;i<list.length;i++)if(LABS[list[i]]&&!(shown&&shown[list[i]])){n++;h+=momentButton(list[i],LABS[list[i]].blurb);}
  return n?h+'</div>':'';}
function showMoments(){
  var sv=loadProgress(),top=TESTING?5:sv?sv.unlocked||1:1,h='<div class="eyebrow">'+tr('Moments')+'</div>';
  if(top<2){showOv(h+'<h2>'+tr('Not yet.')+'</h2><p>'+tr('More moments open after the first day.')+'</p>'+wipList()+'<button class="go alt" type="button" data-go="menu">'+tr('Back to title')+'</button>','menu');return;}
  h+='<h2>'+tr('Play a moment.')+'</h2><p>'+tr('On its own, outside the story.')+'</p><div class="eyebrow">'+tr('Situations')+'</div><div class="lab-list">';
  var shown={};function add(k,line){if(!LABS[k]||shown[k])return '';shown[k]=1;return momentButton(k,line);}
  for(var i=0;i<EXTRAS.length;i++)h+=add(EXTRAS[i],SITUATION[EXTRAS[i]]);
  h+='</div><div class="eyebrow">'+tr('New. Being tried')+'</div><div class="lab-list">';
  for(i=0;i<TRYING.length;i++)h+=add(TRYING[i],SITUATION[TRYING[i]]);
  h+='</div><div class="eyebrow">'+tr('From the story')+'</div><div class="lab-list">';
  var last=TESTING||sv&&sv.done?5:top-1;
  for(var c=1;c<=last;c++)for(var j=0;AFTER[c]&&j<AFTER[c].length;j++){var id=AFTER[c][j];h+=add(id,LABS[id]&&LABS[id].blurb);}
  showOv(h+'</div>'+wipList(shown)+'<button class="go alt" type="button" data-go="menu">'+tr('Back to title')+'</button>','menu');
}
function showLab(){
  var h='<div class="eyebrow">Scenario lab</div><h2>Try a scene.</h2><p>Every short scene on its own, including the ones not in the story yet.</p><div class="lab-list">';
  for(var k in LABS)h+='<button class="lab" type="button" data-lab="'+k+'"><b>'+LABS[k].title+'</b><span>'+LABS[k].blurb+'</span></button>';
  showOv(h+'</div><button class="go alt" type="button" data-go="menu">Back to title</button>','menu');
}
function showLabEnd(id){
  var g=G;g.ended=true;g.labEnd=true;WAIT=null;Q=[];epiChrome(false);render();
  showOv('<div class="eyebrow">'+tr(DEVLAB?'Scenario lab':'Moments')+'</div><h2>'+tr(LABS[id].title)+'</h2><p>'+tr(DEVLAB?'That was the whole scene. Was it funny? Did it land?':'That was the whole moment.')+'</p>'+
   '<button class="go" type="button" data-lab="'+id+'">'+tr('Play it again →')+'</button><button class="go alt" type="button" data-go="'+(DEVLAB?'lab':'moments')+'">'+tr('Other moments')+'</button><button class="go alt" type="button" data-go="menu">'+tr('Title screen')+'</button>','end');
}

/* ---------- Enhance: the eyebrow ---------- */
function zoom(n){return function(){var g=G;g.zoom=n?{n:n,t:0}:null;g.lines=[];g.cur=null;stopVoice();if(n)sfx('enhance');else sfx('cut');};}
function labEnhance(){return labScene({set:'office',title:'Enhance.',plan:'Share one idea in a meeting.',clock:17*3600+56*60,cowR:1,s:1.1}).concat([
  ['N','A meeting. You have just said an idea out loud.'],
  ['H','…so that’s the idea.'],
  function(){G.rBrow=1;},{wait:0.6},
  ['R','Interesting.'],
  hit(0.6,'R'),{wait:1.3},
  ['S','“Interesting.” With an eyebrow.'],
  // 0.90: an investigation gets the hat and the glass (Joonas 22.11.: "the glass is the best"); a quick look gets the glass only
  hat('detective'),lensHold(function(){return {x:G.rx,y:FEETY-170};},'EYEBROW: UP. OPINION: PENDING.'),{wait:1.5},
  ['S','ENHANCE.'],
  lensOff,zoom(1),{wait:0.5},
  ['S','Note the angle. Twelve degrees. Textbook disdain.'],
  {choice:[
    {t:'Measure the arch.',then:[['S','The arch is load-bearing. It is holding up an entire opinion.']]},
    {t:'Compare with the archive.',then:[['S','Ninety-two per cent match with “Year 4: could be neater”.']]},
    {t:'Count the hairs.',then:[['S','Forty-one. One of them is pointing at us.']]}
  ]},
  ['H','It’s an eyebrow.'],
  ['S','ENHANCE.'],
  zoom(2),{wait:0.5},
  ['S','This hair has seen things.'],
  ['H','It’s a hair.'],
  ['S','A hair with an AGENDA.'],
  ['S','ENHANCE.'],
  zoom(3),{wait:0.5},
  ['S','…These are pixels.'],
  ['H','You’ve enhanced past the eyebrow.'],
  ['S','I’m in too deep. Pull me out—'],
  ['S','No. ENHANCE.'],
  zoom(4),{wait:0.6},
  ['S','There’s something in her eye. A reflection.'],
  ['S','It’s… a clock.'],
  ['S','17:58.'],
  zoom(0),function(){var g=G;g.rBrow=0;g.gazeT=0;g.darkT=0;g.cz=1.025;g.cx=W/2;g.cy=H/2;},
  ['R','Interesting. Can we pick it up tomorrow? I missed lunch.'],
  set({mood:'surprised'}),
  ['S','…The eyebrow was HUNGER.']
 ],outside({title:'WHAT RIITTA WAS LOOKING AT',dur:'duration: half a second',cap:'The clock behind you. Nearly six. She missed lunch.',anim:'text'}),[
  calm,
  ['H','You enhanced a hungry eyebrow.'],
  // 0.96 (Joonas: it talks about filing all game long; once, let the filing be seen). A red journal and an absurdly large quill.
  // Only here, where the filing is the punchline. The archive cards elsewhere stay as they are: this is the field notebook.
  function(){var g=G;g.journal={at:g.time};g.morko.pose='journal';sfx('scribble');},
  ['S','I’m filing it under “eyebrows, inconclusive”.'],
  ['H','You have a file for eyebrows?'],
  function(){var g=G;if(g.journal)g.journal.shutAt=g.time;sfx('card');},{wait:0.5},
  ['S','I have a WING for eyebrows.'],
  function(){var g=G;g.journal=null;if(g.morko.pose==='journal')g.morko.pose=null;},hat(null)   // the case is closed, so the hat comes off
 ]);}
var ZOOMLABEL=[null,'ENHANCE ×800','ENHANCE ×6 400','ENHANCE ×51 200 · RESOLUTION: GONE','REFLECTION DETECTED'];
function drawZoom(){
  var z=G.zoom,n=z.n,t=z.t,k=RM?1:clamp(t/0.35,0,1),sc=0.6+0.4*k;
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(sc,sc);ctx.translate(-W/2,-H/2);
  var skin='#e4bba2',brow='#9b9388',i,j;
  if(n===1){
    ctx.fillStyle=skin;ctx.fillRect(-40,-40,W+80,H+80);
    ctx.fillStyle='#d5a68c';for(i=0;i<70;i++){circ((i*137)%W,(i*89)%H,2+(i%3));ctx.fill();}
    ctx.strokeStyle=brow;ctx.lineCap='round';
    for(i=0;i<41;i++){var u=i/40,bx=120+u*720,by=330-Math.sin(u*Math.PI)*150-u*70;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(bx,by+26);ctx.quadraticCurveTo(bx+18,by,bx+44,by-6+(i%4)*3);ctx.stroke();}
    ctx.strokeStyle='#e0563e';ctx.lineWidth=3;ctx.setLineDash&&ctx.setLineDash([10,8]);line(120,356,840,356);line(120,356,760,180);ctx.setLineDash&&ctx.setLineDash([]);
    ctx.beginPath();ctx.arc(120,356,120,-0.27,0);ctx.stroke();
    ctx.fillStyle='#e0563e';ctx.font='700 30px system-ui,sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText('12°',250,330);
  }else if(n===2){
    ctx.fillStyle='#e9c6ae';ctx.fillRect(-40,-40,W+80,H+80);
    ctx.strokeStyle='#8c8479';ctx.lineWidth=38;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(60,470);ctx.bezierCurveTo(300,420,520,120,900,90);ctx.stroke();
    ctx.strokeStyle='#a69d91';ctx.lineWidth=6;for(i=0;i<14;i++){var px=110+i*58,py=455-i*27-(i>6?(i-6)*8:0);line(px-10,py-6,px+14,py+4);}
    ctx.fillStyle='#14111d';ctx.font='700 18px system-ui,sans-serif';ctx.textAlign='left';ctx.fillText('HAIR #27 · ATTITUDE: DETECTED',560,200);
    ctx.strokeStyle='#14111d';ctx.lineWidth=2;line(640,215,640,262);
  }else if(n===3){
    var cols=['#e4bba2','#d5a68c','#9b9388','#b0a596','#c9b09c','#8c8479'];
    for(i=0;i<16;i++)for(j=0;j<10;j++){ctx.fillStyle=cols[(i*7+j*3+((i*j)%5))%cols.length];ctx.fillRect(i*60,j*54,60,54);}
  }else{
    ctx.fillStyle='#d9b29a';ctx.fillRect(-40,-40,W+80,H+80);
    ctx.fillStyle='#fbf8ef';ctx.beginPath();ctx.ellipse(W/2,H/2+10,380,190,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#6a8a8f';circ(W/2,H/2+10,170);ctx.fill();ctx.fillStyle='#4f6b70';circ(W/2,H/2+10,120);ctx.fill();ctx.fillStyle='#14111d';circ(W/2,H/2+10,80);ctx.fill();
    var cx=W/2+28,cy=H/2-14;ctx.globalAlpha=0.9;ctx.fillStyle='#fbf8ef';circ(cx,cy,34);ctx.fill();ctx.strokeStyle='#14111d';ctx.lineWidth=3;
    var ha=(5+58/60)/12*Math.PI*2,ma=58/60*Math.PI*2;line(cx,cy,cx+Math.sin(ha)*17,cy-Math.cos(ha)*17);line(cx,cy,cx+Math.sin(ma)*26,cy-Math.cos(ma)*26);
    ctx.globalAlpha=0.5;ctx.fillStyle='#fbf8ef';rr(W/2-70,H/2-60,26,40,6);ctx.fill();ctx.globalAlpha=1;
    ctx.strokeStyle='#8c8479';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(W/2,H/2+10,380,190,0,Math.PI*1.05,Math.PI*1.95);ctx.stroke();
  }
  ctx.restore();
  // crime-show overlay
  ctx.fillStyle='rgba(40,120,90,.10)';ctx.fillRect(0,0,W,H);
  if(!RM){ctx.fillStyle='rgba(0,0,0,.06)';for(var y=(G.time*50)%4;y<H;y+=4)ctx.fillRect(0,y,W,1.5);}
  ctx.strokeStyle='#e9ffe9';ctx.lineWidth=3;var m=30,L=46;
  [[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(function(c){line(c[0],c[1],c[0]+L*c[2],c[1]);line(c[0],c[1],c[0],c[1]+L*c[3]);});
  ctx.lineWidth=1.5;line(W/2-24,H/2,W/2+24,H/2);line(W/2,H/2-24,W/2,H/2+24);
  ctx.fillStyle='rgba(10,12,16,.75)';rr(m+8,m+8,330,34,6);ctx.fill();
  ctx.fillStyle=(Math.floor(G.time*2)%2&&!RM)?'#e0563e':'#e9ffe9';ctx.font='700 15px system-ui,sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText('● '+ZOOMLABEL[n],m+20,m+25);
  var cur=G.cur;
  if(cur&&cur.who==='S')bubble(W-260,H-150,cur.text,{dark:true,noTail:true,maxW:300,reveal:Math.floor(G.curT*55)});
  else if(cur&&cur.who==='H')bubble(260,H-150,cur.text,{noTail:true,maxW:280,reveal:Math.floor(G.curT*55)});
}

/* ---------- The group chat: a boss fight against messages that look like daggers ---------- */
var FIGHTS={comments:[
  ['ok.','ok. WOW. how long did this take??','good'],
  ['hmm','hmm, how did you do the shading? teach me','good'],
  ['…','…speechless. framing this.','good'],
  ['interesting','interesting! can I steal this for the poster?','good'],
  ['the colours','the colours are a bit much for me tbh','note'],
  ['who made this','who made this?? it’s great','good'],
  ['lol','lol the cat in the corner. love it','good'],
  ['k','k I’m printing it','good']
]};
var SHOUTS=['HYA!','Not today!','Begone, feedback!','Deflected!','You shall not pass!','For the human!'];
function startFight(id){
  var g=G;g.fight={id:id,paced:g.fightPace==='one',t:0,cool:0,swat:null,shout:null,n:0,
    msgs:FIGHTS[id].map(function(m,i){return {far:m[0],full:m[1],kind:m[2],at:0.8+i*1.75,x:W+70,y:150+((i*71)%150),state:'wait',t:0,rot:0,vx:0,vy:0,seen:false,done:false};})};
  g.lines=[];g.band=null;g.cur={who:'S',text:''};WAIT='fight';LOCK=0.15;
  if(g.fight.paced)nextReply();render();
}
function currentReply(){return G.fight&&G.fight.msgs.find(function(m){return !m.done;});}
function nextReply(){
  var m=currentReply();if(!m)return;
  m.state='fly';m.x=Math.min(W+60,G.human.x+520);m.y=205;m.t=0;
}
function replyArrives(m){
  var g=G,Hm=g.human;m.state='hit';m.t=0;
  if(m.kind==='good'){Hm.face='smile';sfx('good');}
  else{Hm.face='neutral';Hm.blush=Math.max(Hm.blush,0.6);Hm.flinch=0.7;g.pulse=Math.max(g.pulse,0.35);sfx('hit');}
}
function readReply(){
  if(paused||WAIT!=='fight'||!G.fight||!G.fight.paced)return;
  var m=currentReply();if(!m)return;
  if(m.state==='fly'){m.state='open';m.x=G.human.x+260;m.seen=true;m.t=0;sfx('pick');}
  else if(m.state==='open'){m.x=G.human.x+100;replyArrives(m);}
  render();
}
function chatTranscript(){
  return '<ol class="chat-transcript" aria-label="'+tr('What was actually sent')+'">'+(G.fightLog||[]).map(function(m){
    return '<li><p>'+esc(tr(m.full))+'</p><span>'+tr(m.state==='swatted'?(m.wasOpen?'Read, then swatted':'Swatted before reading'):'Reached your human')+'</span></li>';
  }).join('')+'</ol>';
}
function swat(){
  var F=G.fight;if(!F||F.cool>0||paused)return;
  var best=null;F.msgs.forEach(function(m){if((m.state==='fly'||m.state==='open')&&m.x<W-10&&(!best||m.x<best.x))best=m;});
  F.cool=0.3;
  if(!best){F.shout={text:'Nothing there. Swatting anyway.',t:0};sfx('swat');return;}
  addLived('replies swatted unread',12);
  best.wasOpen=best.state==='open';best.state='swatted';best.t=0;best.vx=460;best.vy=-300;
  F.swat={x:best.x-40,y:best.y,t:0};G.morko.pose='swat';G.morko.mood='stern';
  F.shout={text:SHOUTS[(F.n++)%SHOUTS.length],t:0};sfx('swat');
  if(F.paced)render();
}
function stepFight(dt){
  var g=G,F=g.fight,Hm=g.human,all=true;F.t+=dt;F.cool=Math.max(0,F.cool-dt);
  if(F.shout){F.shout.t+=dt;if(F.shout.t>0.9)F.shout=null;}
  if(F.swat){F.swat.t+=dt;if(F.swat.t>0.28){F.swat=null;g.morko.pose=null;g.morko.mood='alert';}}
  F.msgs.forEach(function(m){
    if(m.done)return;all=false;
    if(m.state==='wait'){if(!F.paced&&F.t>=m.at)m.state='fly';return;}
    m.t+=dt;
    // One at a time still moves (Joonas 20.11.: the fight was better when the daggers really came at you); it is just slower and single file.
    var sp=F.paced?0.55:1;
    if(m.state==='fly'){m.x-=150*sp*dt;if(m.x<Hm.x+300){m.state='open';m.seen=true;m.t=0;sfx('pick');}}
    else if(m.state==='open'){if(!F.paced){m.x-=50*dt;if(m.x<Hm.x+120)replyArrives(m);}}   // an opened reply waits for its reader in single file
    else if(m.state==='hit'){if(m.t>1.7)m.done=true;}
    else if(m.state==='swatted'){m.x+=m.vx*dt;m.y+=m.vy*dt;m.vy+=700*dt;m.rot+=10*dt;if(m.t>1.1)m.done=true;}
  });
  if(F.paced){var pending=currentReply();if(pending&&pending.state==='wait'){nextReply();render();}}
  if(all)endFight();
}
function endFight(){
  var g=G,F=g.fight,r={deflected:0,deflectedGood:0,deflectedNote:false,readThenSwatted:0,delivered:0,noteDelivered:false};
  F.msgs.forEach(function(m){if(m.state==='swatted'){r.deflected++;if(m.kind==='good')r.deflectedGood++;else r.deflectedNote=true;if(m.wasOpen&&m.kind==='good')r.readThenSwatted++;}
    else if(m.kind==='good')r.delivered++;else r.noteDelivered=true;});
  g.fightRes=r;g.fightLog=F.msgs;g.fight=null;g.morko.pose=null;WAIT=null;run();
}
function drawDagger(m){
  ctx.save();ctx.translate(m.x,m.y);ctx.rotate(m.rot);ctx.scale(1.35,1.35);
  ctx.fillStyle='#d4dae0';ctx.strokeStyle='#4a5560';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(-70,0);ctx.lineTo(10,-14);ctx.lineTo(10,14);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#8a6a3c';rr(10,-20,8,40,2);ctx.fill();ctx.fillStyle='#c9553f';rr(18,-7,34,14,4);ctx.fill();
  ctx.fillStyle='#14111d';ctx.font='800 15px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(m.far,-24,1);
  ctx.restore();
}
function heart(x,y,s){ctx.fillStyle='#e0563e';ctx.beginPath();ctx.moveTo(x,y+s*0.9);ctx.bezierCurveTo(x-s*1.4,y-s*0.1,x-s*0.6,y-s*1.1,x,y-s*0.35);ctx.bezierCurveTo(x+s*0.6,y-s*1.1,x+s*1.4,y-s*0.1,x,y+s*0.9);ctx.fill();}
function drawFight(){
  var F=G.fight;if(!F)return;
  F.msgs.forEach(function(m){
    if(m.done||m.state==='wait')return;
    if(m.state==='fly'||(m.state==='swatted'&&!m.wasOpen)){ctx.save();if(m.state==='swatted')ctx.globalAlpha=clamp(1-m.t/1.1,0,1);drawDagger(m);ctx.restore();return;}
    ctx.save();
    if(m.state==='swatted'){ctx.globalAlpha=clamp(1-m.t/1.1,0,1);ctx.translate(m.x,m.y);ctx.rotate(m.rot);ctx.translate(-m.x,-m.y);}
    if(m.state==='hit')ctx.globalAlpha=clamp(1.7-m.t,0,1);
    var unfold=m.state==='open'?clamp(m.t/0.25,0,1):1;
    ctx.translate(m.x,m.y);ctx.scale(unfold,1);ctx.translate(-m.x,-m.y);
    bubble(m.x,m.y+30,m.full,{noTail:true,maxW:210});
    if(m.state==='hit'&&m.kind==='good')heart(G.human.x+(m.t*14),FEETY-205-m.t*40,10);
    ctx.restore();
  });
  if(F.shout){var q=geom();bubble(q.bx-40,q.hdY-q.hdR-10,F.shout.text,{dark:true,noTail:true});}
}
function drawBoss(){
  var b=G.boss,x=24+HUDL,y=22,w=320;
  ctx.fillStyle='rgba(14,12,20,.78)';rr(x-10,y-12,w+20,44,8);ctx.fill();
  ctx.font='800 12px system-ui,sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillStyle=b.friendly?'#9fd3a8':'#e0563e';
  ctx.fillText((b.friendly?'NOT A BOSS · ':'BOSS · ')+b.name,x,y);
  ctx.fillStyle='#ffffff22';rr(x,y+10,w,10,5);ctx.fill();ctx.fillStyle=b.friendly?'#7fc08a':'#c9553f';rr(x,y+10,w,10,5);ctx.fill();
}
function drawHeadband(q){
  // A ninja headband: red band, knot at the back, two ribbons that never stop moving.
  var r=q.hdR,y=q.hdY-r*0.32,tw=RM?0:G.time*6;
  ctx.fillStyle='#d23b2f';rr(q.bx-r*1.02,y-r*0.17,r*2.04,r*0.34,r*0.12);ctx.fill();
  var kx=q.bx-r*0.98;ctx.beginPath();ctx.arc(kx,y,r*0.16,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#d23b2f';ctx.lineCap='round';ctx.lineWidth=Math.max(4,r*0.18);
  for(var k=0;k<2;k++){ctx.beginPath();ctx.moveTo(kx,y);
    ctx.bezierCurveTo(kx-r*0.8,y+Math.sin(tw+k)*r*0.4+k*r*0.2,kx-r*1.4,y+Math.cos(tw*1.3+k)*r*0.5+k*r*0.3,kx-r*2.1,y+Math.sin(tw*0.9+k*2)*r*0.6+k*r*0.5);ctx.stroke();}
}
function labComments(){return labScene({set:'home',title:'The group chat',plan:'Share the drawing.',clock:20*3600+14*60}).concat([
  function(){if(!G.lab){G.mugMended=true;mugOn(3)();G.mugQuiet=true;}},   // in the story: the mended mug, half full, in the background until something happens
  ['N','Sunday evening. One drawing. One group chat with eleven people in it.'],
  ['H','I’m going to share the drawing.'],
  function(){return G.quietDrawing?[['S','The five-legged cat.'],['H','Finished it on Monday. I still like it.']]:[];},
  set({mood:'alert',s:1.3}),
  ['S','The drawing.'],
  ['H','In the group chat.'],
  ['S','With the PEOPLE in it?'],
  function(){return G.lab?[]:[['S','Last time you showed someone a drawing, I got this job.'],['H','I know. I’m doing it anyway.'],['S','…Then I’m doing it with you.']];},
  {choice:[
    {t:'Explain the fifth leg. For the record.',then:[['S','Say the fifth leg is intentional.'],['H','It is intentional.'],['S','Good. We have a statement.']]},
    {t:'Delete the drawing. Delete drawing as a concept.',then:[['H','Already sent.'],['S','…Then we go to war.']]},
    {t:'Fine. But I’m getting the headband.',then:[['H','What headband?'],['S','For emergencies. I’ve never needed it. I’ve always needed it.']]},
    hush([{wait:1.4},['H','…No disclaimer?'],['S','I’m saying nothing. At a very high volume.',{quiet:1}],{wait:0.8},['S','…I’m still getting the headband.']])
  ]},
  ['P','You: “made a thing” [drawing.png]'],
  function(){G.ninja=true;G.boss={name:'THE GROUP CHAT',friendly:false};G.morko.sT=1.6;G.morko.mood='stern';sfx('card');},
  {wait:0.8},
  ['S','More light. More of me.',{quiet:1}],   // 0.99.45 (review D4): a shadow is made of light; being seen costs a bigger one. Said once, here
  ['H','I know. I want the light.'],
  ['S','Headband on. Replies incoming. I will handle anything that looks sharp.'],
  ['H','Everything looks sharp to you.'],
  ['S','Then I will handle everything.'],
  ['N','Tap the scene to swat a reply away. Or let it come closer and see what it says.'],
  {choice:[
    {t:'All at once. I have a headband.',f:function(){G.fightPace='flow';},then:[['N','Replies arrive automatically. Tap to swat; wait to read.']]},
    {t:'One at a time. Form an orderly queue.',f:function(){G.fightPace='one';},then:[['H','You’ve made a queue for notifications.'],['S','Single file. Sharp ends away from the human.'],['N','You set the pace. Bring each reply closer to read, or swat it away.']]}
  ]},
  {fight:'comments'},
  function(){
    var r=G.fightRes,o=[];
    if(r.deflected===0)o.push(['S','I… didn’t swat anything.'],['H','You held still.'],['S','I was paralysed with professionalism.']);
    else if(r.deflected>=6)o.push(['S',r.deflected+' daggers deflected. Flawless.'],['H','What did they say?'],['S','No need to know. They were daggers.']);
    else o.push(['S',r.deflected+' daggers deflected. '+(r.delivered+(r.noteDelivered?1:0))+' got through. Somehow.']);
    return o;
  },
  function(){G.fightLog.forEach(function(m){history.push({who:'P',text:m.full+' — '+(m.state==='swatted'?(m.wasOpen?'read, then swatted':'swatted before reading'):'reached your human')});});}
 ],outside({title:'WHAT THE OTHERS WROTE',dur:'duration: one evening, eleven people',cap:'Seven nice things. One opinion about colours.',anim:'chatlog'}),[
  function(){
    var r=G.fightRes,o=[];
    if(r.noteDelivered)o.push(['H','One of them didn’t like the colours.'],['S','A DAGGER. I KNEW it.'],['H','It stings. I keep looking at that one.'],['S','Shall I get the headband tighter?'],['H','I’m leaving the drawing up.'],['S','…Then I’ll loosen it. One notch.']);
    else if(r.deflectedNote){o.push(['S','For the record, one of them WAS a bit sharp.'],['H','The colours one.'],['S','You’re welcome.']);
      if(r.deflectedGood>0)o.push(['H','You also swatted the nice ones.'],['S','Collateral.']);
      else o.push(['H','The drawing can stay, even if someone dislikes the colours.'],['S','I’ll keep the headband nearby.']);}
    if(r.deflectedGood>0)o.push(['S','I swatted a compliment, didn’t I.'],['H',r.deflectedGood>1?'Several.':'One.'],
      ['S','In my defence, from a distance “ok.” looks EXACTLY like a dagger.'],['H','Everything looks like a dagger from a distance.'],['S','That’s why I keep my distance.'],['S','…Oh.']);
    if(r.readThenSwatted>0)o.push(['H','You read that one first. It said it was great. You swatted it anyway.'],['S','It could have been a trick.']);
    if(r.deflectedGood===0)o.push(['S',r.deflected===0?'I let them all come close. Every single one.':'The nice ones got through. Every single one.'],['H','And?'],['S','Mostly… cats. People liked the cat.']);
    return o;
  },
  function(){G.boss.friendly=true;G.boss.name='THE GROUP CHAT';sfx('turn');},
  ['N','BOSS DEFEATED. Correction: there was no boss.'],
  function(){return G.lab?[]:[['S','Year two. Somebody laughed.'],['H','This time I left it up.'],['S','…I’ll update the file.'],function(){var g=G;g.cards.push({kind:'good',year:'TODAY',text:'Shared a drawing. Left it up.',t:0,life:null,x:790,y:178,rot:-0.03});sfx('card');},{wait:2.2},closeArchive].concat(drawerReveal());},
  nightlightEnding   // the lamp and the bird share the final image; the reader decides when to leave
 ]);}
// The other drawer (TYOSUUNNITELMA.md, section 2). It does not change what Ekskyysmi did. It changes what it kept.
function drawerReveal(){return [
  ['H','There’s a drawer with no label.'],
  fib,
  ['S','Nothing. Admin.'],
  ['H','You just got smaller.'],
  {wait:0.9},
  openDrawer,{wait:5.2},
  ['H','You kept these?'],
  ['S','I keep everything. It’s the job.'],
  {wait:0.8},
  ['S','I just never opened this one in front of you.'],
  ['H','Why not?'],
  ['S','It’s the one people could take away.',{quiet:1}],
  {wait:1.4},closeArchive,
  ['H','Can we leave it open?'],
  ['S','…Draught risk.'],
  ['S','A crack. Leave it open a crack.',{look:'soft'}]
 ];}
function drawChatlog(o){
  var log=G.fightLog||[],x=W/2-330,y=72,w=440;
  ctx.fillStyle='#141a1c';ctx.fillRect(0,0,W,H);ctx.fillStyle='#0f0d14';ctx.fillRect(0,0,W,56);
  ctx.fillStyle='#f1ebdd';ctx.textBaseline='middle';ctx.textAlign='left';ctx.font='700 18px system-ui,sans-serif';ctx.fillText(o.title,28,29);
  ctx.textAlign='right';ctx.font='500 16px system-ui,sans-serif';ctx.fillStyle='#b9b2a6';ctx.fillText(o.dur,W-28,29);
  ctx.fillStyle='#1f2a2d';rr(x-14,y-6,w+28,log.length*44+18,14);ctx.fill();
  for(var i=0;i<log.length;i++){var m=log[i],ly=y+8+i*44,a=clamp((o.t-0.3-i*0.18)/0.3,0,1);
    ctx.globalAlpha=a;ctx.fillStyle=m.kind==='note'?'#f4e3c6':'#eef3e8';rr(x,ly,w,34,10);ctx.fill();
    var sw=m.state==='swatted';ctx.fillStyle=sw?'#8b8070':'#2b2733';ctx.font='500 15px system-ui,sans-serif';ctx.textAlign='left';ctx.fillText(m.full,x+14,ly+17);
    if(sw){ctx.strokeStyle='#d23b2f';ctx.lineWidth=1.5;line(x+12,ly+18,x+18+Math.min(w-30,ctx.measureText(m.full).width),ly+18);}
    if(sw){ctx.save();ctx.translate(x+w+110,ly+17);ctx.rotate(-0.08);ctx.strokeStyle='#d23b2f';ctx.lineWidth=2.5;rr(-82,-13,164,26,4);ctx.stroke();
      ctx.fillStyle='#d23b2f';ctx.font='800 11px system-ui,sans-serif';ctx.textAlign='center';ctx.fillText('DEFLECTED BY EKSKYYSMI',0,1);ctx.restore();}
  }
  ctx.globalAlpha=1;
  if(o.t>2.2){ctx.textAlign='center';ctx.fillStyle='#f1ebdd';ctx.font='500 20px system-ui,sans-serif';ctx.fillText(o.cap,W/2,H-24);}
}

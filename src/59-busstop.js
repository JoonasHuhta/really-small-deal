/* ================= Bus stop. (Moment, 0.99.26): the first of Joonas's Finnish nightmares ================= */
// Joonas 26.11.: "the distance at a bus stop". A colleague from the third floor, said hi twice in two years, name unknown.
// Ekskyysmi measures the distance in metres (one metre is an assault, four is the national distance, behind the glass is
// hiding in a glass box). Here you wave at the bus or it doesn't stop, and waving is asking. He waves for both of you.
// On the bus there is one pole. Then he says it first: he doesn't know your name either. The human's name is drowned out by
// the next-stop announcement, so the game still never says it.
var BUSSPOT={near:440,polite:150,glass:720};
function busOn(){var g=G;g.bus={x:1010,xT:1010,wave:false,lights:0,lightsT:0,tape:false,dist:null,announce:0};g.noCup=true;g.human.x=g.human.xT=300;}
function busStand(where){return function(){var g=G;g.bus.dist=where;g.bus.tape=false;g.human.xT=BUSSPOT[where];};}
function stepBus(dt){var b=G.bus;if(!b||(G.set!=='busstop'&&G.set!=='bus'))return;
  if(Math.abs(b.x-b.xT)>1)b.x=approach(b.x,b.xT,95*dt);b.lights=ease(b.lights,b.lightsT,1.2*dt);if(b.announce>0)b.announce=Math.max(0,b.announce-dt);}
function busStop(){
  var g=G,b=g.bus||{},i,t=RM?0:g.time;
  var sk=ctx.createLinearGradient(0,0,0,WALLY);sk.addColorStop(0,'#161e2b');sk.addColorStop(1,'#26324a');ctx.fillStyle=sk;ctx.fillRect(-20,-20,W+40,WALLY+20);
  // the building across the pavement: the wall the shadow lands on
  ctx.fillStyle='#454b59';ctx.fillRect(-20,70,W+40,WALLY-70);ctx.fillStyle='#3b404d';ctx.fillRect(-20,70,W+40,8);
  for(i=0;i<6;i++){var wx=40+i*160;ctx.fillStyle=(i*7)%3?'#2a2f3a':'#d9b86a';ctx.fillRect(wx,110,56,70);ctx.fillStyle='#2a2f3a';ctx.fillRect(wx+26,110,4,70);}
  // a street lamp
  ctx.strokeStyle='#1b1d24';ctx.lineWidth=6;line(110,FEETY,110,40);line(110,42,150,42);
  var lg=ctx.createRadialGradient(150,60,4,150,60,190);lg.addColorStop(0,'rgba(255,214,140,.45)');lg.addColorStop(1,'rgba(255,214,140,0)');ctx.fillStyle=lg;ctx.fillRect(0,0,380,WALLY);
  ctx.fillStyle='#ffe3a0';circ(150,48,8);ctx.fill();
  // pavement, a snowbank, the road
  ctx.fillStyle='#6d717b';ctx.fillRect(-20,WALLY,W+40,FEETY-WALLY+24);ctx.fillStyle='#e7ecf1';ctx.beginPath();ctx.ellipse(470,FEETY+30,560,18,0,Math.PI,0);ctx.fill();
  ctx.fillStyle='#22252c';ctx.fillRect(-20,FEETY+30,W+40,H-FEETY);
  // the shelter: glass, a roof, a bench, the timetable post with its number
  ctx.fillStyle='#1d2129';ctx.fillRect(612,200,8,FEETY-200);ctx.fillRect(812,200,8,FEETY-200);ctx.fillRect(600,192,232,12);
  ctx.fillStyle='rgba(170,205,230,.18)';ctx.fillRect(620,204,192,FEETY-220);ctx.fillStyle='#5a4a3a';ctx.fillRect(650,FEETY-62,140,10);
  ctx.strokeStyle='#1d2129';ctx.lineWidth=5;line(575,FEETY,575,190);ctx.fillStyle='#e9e2cf';rr(552,150,46,46,6);ctx.fill();
  ctx.fillStyle='#24427a';ctx.font='800 26px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('3',575,174);
  // headlights, coming
  if(b.lights>0.02){var hg=ctx.createRadialGradient(W+40,FEETY-40,10,W+40,FEETY-40,520);hg.addColorStop(0,'rgba(255,248,215,'+(0.75*b.lights)+')');hg.addColorStop(1,'rgba(255,248,215,0)');ctx.fillStyle=hg;ctx.fillRect(0,0,W,H);}
  // a little sleet
  ctx.fillStyle='rgba(235,240,245,.5)';for(i=0;i<36;i++){var fx=((snowRnd(i+1301)*W+Math.sin(t*0.5+i)*8)%W+W)%W,fy=(snowRnd(i+1401)*H+t*(20+snowRnd(i+1501)*14))%H;circ(fx,fy,1.3);ctx.fill();}
}
function busInside(){
  var g=G,b=g.bus||{},i,t=RM?0:g.time;
  ctx.fillStyle='#c4ccd1';ctx.fillRect(-20,-20,W+40,WALLY+20);
  ctx.fillStyle='#141a26';ctx.fillRect(-20,110,W+40,150);                         // the windows: dark, and the town going by
  for(i=0;i<9;i++){var lx=((i*173-t*240)%(W+200)+W+200)%(W+200)-100;ctx.fillStyle='rgba(255,214,140,.8)';circ(lx,150+(i%3)*30,3+(i%2));ctx.fill();}
  ctx.fillStyle='#aab4bb';for(i=0;i<6;i++)ctx.fillRect(i*170+80,110,10,150);
  ctx.fillStyle='#2f4f7f';for(i=0;i<5;i++){rr(40+i*190,290,120,70,10);ctx.fill();}       // seat backs, all taken
  ctx.fillStyle='#3a3e46';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);
  ctx.strokeStyle='#e2b04a';ctx.lineWidth=7;ctx.lineCap='round';line(500,20,500,FEETY);   // the pole
  ctx.strokeStyle='#6b7177';ctx.lineWidth=3;line(300,20,300,78);ctx.beginPath();ctx.arc(300,92,14,0,Math.PI*2);ctx.stroke();   // a strap, two metres away
  ctx.fillStyle='#14161b';rr(330,26,300,40,6);ctx.fill();
  ctx.fillStyle=b.announce>0&&(RM||Math.floor(g.time*3)%2)?'#ffcf5a':'#c9953a';ctx.font='700 18px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(b.announce>0?'NEXT STOP: LIBRARY':'3 · CITY CENTRE',480,46);
}
// the colleague, and the measuring marks on the pavement while Ekskyysmi chooses a distance
function drawBusFront(){
  var g=G,b=g.bus;if(!b||(g.set!=='busstop'&&g.set!=='bus')||g.out)return;
  if(b.tape&&g.set==='busstop'){
    ctx.font='700 13px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    var ty=COMPACT?Math.min(FEETY+12,SCENE_BOTTOM-34):FEETY+12;   // on a phone the reading panel covers the pavement: the marks sit just above it
    [[BUSSPOT.near,'1 m · ASSAULT'],[BUSSPOT.polite,'4 m · POLITE'],[BUSSPOT.glass,'BEHIND GLASS · NOT HERE']].forEach(function(m){
      ctx.strokeStyle='#e2b04a';ctx.lineWidth=2;ctx.setLineDash&&ctx.setLineDash([6,5]);line(m[0],ty-4,m[0],ty-18);ctx.setLineDash&&ctx.setLineDash([]);
      var w=ctx.measureText(m[1]).width+14;ctx.fillStyle='rgba(20,17,29,.8)';rr(m[0]-w/2,ty,w,20,5);ctx.fill();ctx.fillStyle='#f3d27a';ctx.fillText(m[1],m[0],ty+10);});
  }
  if(b.x<W+60)person(b.x,{body:'#5b6f8c',hair:'#2f2a26',facing:Math.abs(b.x-b.xT)>1?(b.xT>b.x?1:-1):-1,walk:Math.abs(b.x-b.xT)>1,wave:b.wave});
}
SETS.busstop=busStop;SETS.bus=busInside;MSTEP.push(stepBus);MFRONT.push(drawBusFront);
function busClosing(){var d=G.bus&&G.bus.dist;return [['S',d==='polite'?'Four metres was correct.':d==='near'?'One metre was too close. He didn’t mind.':'The glass was see-through. He saw us anyway.']];}   // 0.99.27: “for the record” is the week’s thread (paid off in Quiet.), so the new moments mostly leave it alone
function labBusStop(){return labScene({set:'busstop',title:'Bus stop.',plan:'Wait for the bus.',clock:16*3600+22*60}).concat([
  busOn,
  ['N','16:22. Dark already. The bus is in nine minutes. The stop is empty.'],
  set({mood:'calm',s:0.8}),
  ['S','An empty stop. Nine minutes. This is the dream.',{look:'pleased'}],
  function(){G.bus.xT=540;},{wait:2.6},
  ['N','Someone from the third floor arrives. You have said hi in the kitchen. Twice.'],
  set({mood:'alert',s:1.3}),
  ['S','We know him. Kitchen. Twice. Name: unknown.'],
  ['H','It’s been two years.'],
  ['S','Too late to ask. Asking now would be a confession.'],
  function(){G.bus.tape=true;},
  ['S','We need a distance.'],
  {choice:[
    {t:'One metre. Friendly.',m:'worst',f:busStand('near'),then:[
      ['S','Too close. He can hear our coat.'],
      ['H','Coats don’t make noise.'],
      ['S','Ours does. It rustles with intent.']]},
    {t:'Four metres. The national distance.',m:'stay',f:busStand('polite'),then:[
      ['S','Four metres. Recognised by the state.'],
      ['H','Is it?'],
      ['S','It should be.']]},
    {t:'Behind the shelter. We’re not here.',m:'hide',f:busStand('glass'),then:[
      ['H','The shelter is made of glass.'],
      ['S','Then we’re a very quiet exhibit.']]}
  ]},
  ['N','Nobody says anything for six minutes. By local standards it is very pleasant.'],
  function(){G.bus.lightsT=1;sfx('car');},{wait:1.2},
  ['N','Headlights. Here you wave at the bus, or it doesn’t stop.'],
  set({mood:'scared',s:1.5}),
  ['S','If we wave and it doesn’t stop, we waved at a bus that rejected us. In front of HIM.'],
  function(){G.bus.wave=true;},{wait:1.3},
  ['N','He waves. The bus stops for both of you.'],
  set({mood:'surprised',s:1}),
  ['S','He asked for both of us. We didn’t even have to.',{look:'soft'}],
  scene({set:'bus',clock:16*3600+32*60}),
  function(){var g=G;g.bus.wave=false;g.bus.lights=g.bus.lightsT=0;g.bus.x=g.bus.xT=570;g.human.x=g.human.xT=430;g.noCup=true;},
  ['N','Inside, there is room to stand in exactly one place. By the same pole.'],
  set({mood:'alert',s:1.2}),
  ['S','One pole. Two hands. Whose goes higher?'],
  ['S','There is a protocol. Higher hand: senior. Lower hand: guest. Same height: married.'],
  {choice:[
    {t:'Hold it lower. Defer.',m:'please',then:[
      ['H','I’m fine.'],
      ['S','You’re holding a bus by its ankle.']]},
    {t:'Hold the strap. Avoid the pole entirely.',m:'hide',then:[
      ['S','The strap is two metres away. We are now leaning at forty degrees.'],
      ['H','It’s fine.'],
      ['S','It’s structural.']]},
    {t:'Just hold it. Wherever the hand goes.',m:'stay',then:[
      ['N','The hands end up at the same height.'],
      ['S','…Married.',{look:'stunned'}]]}
  ]},
  ['X','Sorry. This is awful. I don’t know your name.'],
  set({mood:'surprised',s:0.9}),
  ['S','HE doesn’t know OUR name?'],
  ['H','I don’t know yours.'],
  ['X','Two years.'],
  ['H','Two years.'],
  function(){var g=G;g.human.grin=1;},
  ['N','They both laugh. It lets a lot of air out of a bus.'],
  ['X','Jari.'],
  ['H','I’m—'],
  function(){G.bus.announce=2.6;sfx('ui');},{wait:0.4},
  ['N','The next stop is announced over the top of it. LIBRARY.'],
  ['X','Nice to meet you properly.'],
  ['S','…He didn’t hear it. Nobody heard it.'],
  ['H','He heard enough.']
 ],outside({title:'WHAT IT LOOKED LIKE',dur:'duration: 31 minutes',cap:'Two colleagues waited for a bus, then rode it together. One of them learned a name.',anim:'text'}),[
  calm,
  busClosing,
  ['H','And the pole?'],
  ['S','The pole was not my department.'],
  ['S','Jari. I’ve filed him under J. Two years late.'],
  ['H','Do you have a J?'],
  ['S','I do now.']
 ]);}

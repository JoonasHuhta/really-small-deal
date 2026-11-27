/* Three breaths in one story. These cards wait for the reader, not the animation. */
// 0.99.35 (Joonas 27.11.: "look at the transitions between scenes: is the fade enough, room to breathe"). Before a card the
// last words go and the picture holds for a beat; then the card dissolves in over that picture instead of cutting to black.
// Not after the receipt overlay (the overlay was the beat) and not in a Moment played on its own (no card there).
var CARDCOL='24,42,45';   // the card's teal, as rgb for the fades on both sides of it
function breath(){var g=G;if(g.lab||g.fromOv||!g.started||!(g.cur||(g.lines&&g.lines.length)))return [];g.lines=[];g.cur=null;g.band=null;g.breath=true;return [{wait:0.45},function(){G.breath=false;}];}   // g.breath: still the old picture
function cardSnap(){var g=G;if(g.fromOv){g.fromOv=false;return null;}return typeof epiSnap==='function'?epiSnap():null;}
function drawSnap(s,a){if(!s||a<=0)return;try{ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=a;ctx.drawImage(s,0,0,cv.width,cv.height);ctx.restore();}catch(e){}}
var PARTS=[null,
  {day:'PART ONE',title:'Better safe.',caption:'A Monday. One small plan.'},
  {day:'PART TWO',title:'A little room.',caption:'Later. Some things take more than a week.'},
  {day:'PART THREE',title:'Still here.',caption:'A Friday. Not necessarily that one.'}
];
function partCard(n){return [breath,function(){
  var p=PARTS[n],g=G;if(!g.snap)g.snap=cardSnap();g.chap={day:p.day,title:p.title,caption:p.caption,t:0,part:n};g.lines=[];g.cur=null;g.band=null;
  stopVoice();sfx('card');
},['N',PARTS[n].caption],function(){G.chap=null;G.band=null;G.cur=null;G.lines=[];}];}   // no words left: what follows dissolves from the card, without a beat of the old scene
function storyPart(){
  var g=G;if(g.chap&&g.chap.part)return g.chap.part;
  if(g.chapter>=5)return 3;
  // Part two is every moment from Nothing. on, read from the story order, so a moved moment cannot fall back into part one (Codex review, 0.77)
  var a=AFTER[4]||[],i=a.indexOf(g.moment);
  return g.chapter===4&&i>=0&&i>=a.indexOf('nothing')?2:1;
}
// The last image belongs to the existing group-chat scene, not to an extra chapter.
function nightlightEnding(){return [scene({set:'home',clock:23*3600+10*60}),function(){
  var g=G;g.hud=false;g.plan=false;g.bed=true;g.human.gone=true;g.human.x=g.human.xT=690;
  g.lampOff=false;g.morko.s=g.morko.sT=0.9;g.morko.pose='puppet';g.morko.mood='care';
  g.finalFrame=true;g.endSeen=true;g.fade=1;g.fadeRate=0.65;g.cz=1;g.cx=W/2;g.cy=H/2;
}, {still:true}];}

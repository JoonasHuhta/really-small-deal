/* Three breaths in one story. These cards wait for the reader, not the animation. */
var PARTS=[null,
  {day:'PART ONE',title:'Better safe.',caption:'A Monday. One small plan.'},
  {day:'PART TWO',title:'A little room.',caption:'Later. Some things take more than a week.'},
  {day:'PART THREE',title:'Still here.',caption:'A Friday. Not necessarily that one.'}
];
function partCard(n){return [function(){
  var p=PARTS[n],g=G;g.chap={day:p.day,title:p.title,t:0,part:n};g.lines=[];g.cur=null;g.band=null;
  stopVoice();sfx('card');
},['N',PARTS[n].caption],function(){G.chap=null;G.band=null;G.cur=null;}];}
function storyPart(){
  if(G.chapter>=5)return 3;
  return G.chapter===4&&['nothing','form','quiet','evenings','night'].indexOf(G.moment)>=0?2:1;
}
// The last image belongs to the existing group-chat scene, not to an extra chapter.
function nightlightEnding(){return [scene({set:'home',clock:23*3600+10*60}),function(){
  var g=G;g.hud=false;g.plan=false;g.bed=true;g.human.gone=true;g.human.x=g.human.xT=690;
  g.lampOff=false;g.morko.s=g.morko.sT=0.9;g.morko.pose='puppet';g.morko.mood='care';
  g.finalFrame=true;g.endSeen=true;g.fade=1;g.fadeRate=0.65;g.cz=1;g.cx=W/2;g.cy=H/2;
}, {still:true}];}

/* ================= things in the room answer back ================= */
// Tap an object and Ekskyysmi has an opinion about it (TYOSUUNNITELMA 11: the player can touch the world, not only Continue).
// Rules: never blocks the story. Only while a line or a choice is waiting. Small radii, high on the walls where possible.
// Each object has a few lines and then goes quiet; a second tap while a remark is still showing just continues the story.
// Monday stays clean: it teaches the language. One object glints now and then, so the idea is findable without a tutorial.
var HOT={
  room:[
    {id:'clock',x:560,y:92,r:32,l:['The clock. On time, every second. Show-off.','Nobody has ever asked the clock for a quick chat.','I check it so the human doesn’t have to. The human checks it anyway.']},
    {id:'board',x:215,y:200,r:58,l:['“Be a mug. Not a hero.” Somebody laminated a threat.','Four hundred readings. It still won’t say which mug.','Pinned at every corner. Nothing on it can fall. I respect that.']},
    {id:'plant',x:88,y:325,r:40,l:['Watered by nobody. Thriving. Suspicious.','It leans towards the window. Very needy. I see you, plant.','If it dies, they’ll ask who looked at it last.']},
    {id:'mugs',x:765,y:308,r:24,l:['One of these is the human’s. Nobody knows which. Including the human.','Which mug you take says everything about you. I have a spreadsheet.']},
    {id:'machine',x:898,y:288,r:32,l:['The coffee machine sighs when it’s done. I take that personally.','Red light. Either ready or furious. Same light.']},
    {id:'hills',x:774,y:170,r:70,l:['Hills. Nobody on them has said anything to us. Good hills.','Very far away. That’s their best quality.']}
  ],
  office:[
    {id:'chart',x:255,y:182,r:80,l:['A line going up, then down, then up. I relate.','Nobody has explained this chart. I assume it’s about us.','The red line had a hard week too.']},
    {id:'glass',x:774,y:172,r:70,l:['Blue sky. In a meeting room. Insensitive.','It’s a window. It could be watching us. I’m just saying it COULD.']}
  ],
  home:[
    {id:'moon',x:236,y:134,r:34,l:['The moon. Up all night, alone, keeping watch. Colleague.','Half of it is missing and nobody asks it why.','It has never once replied to anyone. Enviable.']},
    {id:'lamp',x:520,y:279,r:32,l:['The lamp. Our best colleague.','It makes me bigger. I never asked. It just believes in me.','Off, I’d be everywhere. On, I’m just here. It’s a kindness, really.']},
    {id:'window',x:150,y:200,r:34,l:['Somebody across the street can see in. Statistically. Wave? No. Don’t.','The curtains are open. We are basically on television.']}
  ]
};
var hotUsed={},hotLast=null,hotGlint=null,hotNext=8;
function hotOn(){var g=G;return g.started&&!g.ended&&!paused&&(g.lab||g.chapter>1)&&(WAIT==='click'||WAIT==='choice')&&!g.out&&!g.chap&&!g.w&&!g.cctv&&!g.lens&&!g.finalFrame&&!g.job&&!g.epi&&!!HOT[g.set];}
function hotWorld(e){var p=lensPoint(e),z=C.z,hw=W/(2*z),hh=H/(2*z),fx=clamp(C.fx,hw,W-hw),fy=clamp(C.fy,hh,H-hh);return {x:(p.x-W/2)/z+fx,y:(p.y-H/2)/z+fy};}
function hotAt(e){if(!hotOn())return null;var p=hotWorld(e),a=HOT[G.set];
  for(var i=0;i<a.length;i++){var h=a[i];if(G.set==='home'&&h.id==='lamp'&&G.kitchen)continue;if(Math.hypot(h.x-p.x,h.y-p.y)<h.r)return h;}return null;}
function hotTap(e){var h=hotAt(e);if(!h)return false;
  var key=G.set+'.'+h.id,n=hotUsed[key]||0;
  if(n>=h.l.length)return false;                                   // said everything: the tap is just a tap again
  if(hotLast&&hotLast.key===key&&G.time-hotLast.at<1.6)return false; // tapping again quickly means “go on”
  hotUsed[key]=n+1;hotLast={key:key,at:G.time};hotGlint=null;
  var ty=h.y-h.r-14;if(ty<130)ty=h.y+h.r+18;   // high objects speak below themselves, clear of the job and plan tags
  G.tics.push(tic(h.l[n],clamp(h.x,170,W-170),ty,{life:3.4,size:15}));
  sfx('pick');return true;}
function hotHover(e){try{cv.style.cursor=hotAt(e)?'pointer':'';}catch(_){}}
function stepHot(dt){
  if(!hotOn()){hotGlint=null;return;}
  if(hotGlint){hotGlint.t+=dt;if(hotGlint.t>0.9)hotGlint=null;return;}
  hotNext-=dt;if(hotNext>0||RM)return;hotNext=13+Math.random()*6;
  var a=HOT[G.set].filter(function(h){return (hotUsed[G.set+'.'+h.id]||0)<h.l.length;});
  if(a.length)hotGlint={h:a[Math.floor(Math.random()*a.length)],t:0};
}
function drawHotGlint(){var q=hotGlint;if(!q)return;var k=q.t/0.9,al=Math.sin(k*Math.PI)*0.5;
  ctx.save();ctx.strokeStyle='rgba(255,236,190,'+al+')';ctx.lineWidth=2;circ(q.h.x,q.h.y,Math.min(q.h.r,30)*(0.6+k*0.5));ctx.stroke();ctx.restore();}
function hotReset(){hotUsed={};hotLast=null;hotGlint=null;hotNext=8;}
cv.addEventListener('pointermove',hotHover);

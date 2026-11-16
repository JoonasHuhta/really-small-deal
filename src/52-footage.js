/* ================= Footage: the corner camera only points one way ================= */
// Self-focused attention as a picture. Ekskyysmi switches to "security footage" of the human: grey, grainy, timestamped,
// and framed so tightly that the other person is out of shot. Her laugh happens off camera. The camera cannot pan.
// Footage has no sound, so no bubbles while it runs: the words are in the reading panel.
function cctvOn(){var g=G;g.cctv={t:0};g.cz=1.75;g.cx=g.human.x-24;g.cy=300;g.lines=[];g.cur=null;stopVoice();sfx('cut');}
function cctvOff(){var g=G;g.cctv=null;g.cz=1.025;g.cx=W/2;g.cy=H/2;sfx('cut');}
function drawCctv(){
  var g=G,c=g.cctv,i;c.t+=1/60;
  ctx.save();
  ctx.globalCompositeOperation='saturation';ctx.fillStyle='#808080';ctx.fillRect(0,0,W,H);     // all colour out: it is evidence now
  ctx.globalCompositeOperation='multiply';ctx.fillStyle='#c9d2c0';ctx.fillRect(0,0,W,H);        // the green of every office camera
  ctx.globalCompositeOperation='source-over';
  ctx.fillStyle='rgba(0,0,0,.13)';for(i=0;i<H;i+=4)ctx.fillRect(0,i,W,1);                       // scan lines
  if(!RM){ctx.fillStyle='rgba(255,255,255,.05)';var y=(g.time*70)%H;ctx.fillRect(0,y,W,18);     // the roll bar
    for(i=0;i<70;i++){ctx.fillStyle=i%2?'rgba(255,255,255,.08)':'rgba(0,0,0,.1)';ctx.fillRect(Math.random()*W,Math.random()*H,2,2);}}
  var vg=ctx.createRadialGradient(W/2,H/2,H*0.35,W/2,H/2,H*0.85);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.45)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(235,240,230,.8)';ctx.lineWidth=3;var m=26,L=34;                            // viewfinder corners
  [[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(function(p){ctx.beginPath();ctx.moveTo(p[0],p[1]+L*p[3]);ctx.lineTo(p[0],p[1]);ctx.lineTo(p[0]+L*p[2],p[1]);ctx.stroke();});
  ctx.font='700 15px ui-monospace,Menlo,Consolas,monospace';ctx.textBaseline='middle';ctx.textAlign='left';ctx.fillStyle='rgba(235,240,230,.9)';
  if(RM||Math.floor(g.time*2)%2===0){ctx.fillStyle='#e0563e';circ(m+22,m+26,6);ctx.fill();}
  ctx.fillStyle='rgba(235,240,230,.9)';ctx.fillText('REC   CAM 2 · BREAK ROOM · POINTED AT: US',m+36,m+26);
  var s=Math.floor(g.clock||0),hh=Math.floor(s/3600)%24,mm=Math.floor(s/60)%60,ss=s%60;
  ctx.textAlign='right';ctx.fillText(('0'+hh).slice(-2)+':'+('0'+mm).slice(-2)+':'+('0'+ss).slice(-2),W-m-12,H-m-22);
  ctx.restore();
}
function labFootage(){return labScene({set:'room',title:'Footage.',plan:'Have a normal chat with Sanna.',clock:12*3600+41*60}).concat([
  function(){var g=G;g.cowA=true;g.ax=g.axT=760;g.aFace=-1;},
  ['N','The break room. Sanna is telling a story about a pigeon and a sandwich. It is going well.'],
  ['A','…and it just TOOK it. Looked me right in the eye.'],
  ['H','Ha!'],
  set({mood:'alert'}),
  ['S','That laugh was one point four seconds long. Switching to the corner camera.'],
  cctvOn,{wait:1.1},
  ['S','Camera two. Live footage of us.'],
  ['H','Why is it black and white?'],
  ['S','It’s security footage. It’s supposed to look like evidence.'],
  ['S','Exhibit one. The hands. They don’t know where to go.'],
  {choice:[
    {t:'Put the hands in the pockets.',then:[['S','Now we look like we’re hiding something.'],['H','We are. Hands.']]},
    {t:'Replay the laugh.',then:[['S','One point four seconds. A normal laugh is one. Ours had an encore.'],['H','It was a funny pigeon.']]},
    {t:'Turn the camera to Sanna.',then:[['S','It doesn’t turn that way.'],['H','What?'],['S','It’s a security camera. It points at us. That is what it’s FOR.']]}
  ]},
  ['H','So what is Sanna doing?'],
  ['S','Unknown. We were busy watching us.'],
  cctvOff
 ],outside({title:'WHAT SANNA WAS DOING',dur:'duration: four minutes',cap:'Laughing. At the pigeon, and with you. Out of shot.',anim:'text'}),[
  calm,
  ['A','Same time tomorrow? I have a worse pigeon story.'],
  ['H','…Yes. Please.'],
  ['S','I’ll need the footage from HER camera.'],
  ['H','She doesn’t have a camera.'],
  function(){G.zT=1;},{wait:1.4},
  ['Z','I have one. It points at her.'],
  set({mood:'surprised'}),
  ['S','…Two cameras.'],
  ['S','And nobody filming the conversation.',{quiet:1}]
 ]);}

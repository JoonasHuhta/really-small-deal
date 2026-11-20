/* ================= Lamp gap. (T7, lab clone of the walk home) ================= */
// TYOSUUNNITELMA 7.2. Not a rule (“light decides the size”, rejected), one joke in one place:
// between street lamps the wall shadow fades and falls behind, then sprints to catch up under the next lamp.
// Underneath it is an RSD thing said once and lightly: losing sight of someone feels like losing them.
function until(fn){return function step(){return fn()?[]:[{wait:0.3},step];};}
function gapStep(dt){
  var g=G,M=g.morko;if(!g.gapWalk||!g.w)return 0;
  var dmin=1e9;for(var i=0;i<LAMPS.length;i++)dmin=Math.min(dmin,Math.abs(LAMPS[i]-g.w.x));
  var gap=clamp((dmin-90)/110,0,1);
  g.gapA=approach(g.gapA==null?1:g.gapA,1-0.62*gap,1.6*dt);
  if(gap>0.6&&g.walking){g.gapLag=approach(g.gapLag||0,150,(RM?150:20)*dt);g.gapArmed=true;}
  else if(gap<0.3){
    if(g.gapArmed&&(g.gapLag||0)>50){g.gapArmed=false;g.gapCaught=(g.gapCaught||0)+1;
      var q=geom();g.tics.push(tic(g.gapCaught===1?'Wait. WAIT. Lamp gap.':'Coming. COMING.',clamp(q.bx,150,W-150),Math.max(70,q.hdY-q.hdR-26),{life:2.2,size:17}));sfx('pick');}
    g.gapLag=approach(g.gapLag||0,0,(RM?400:240)*dt);
  }
  return g.gapLag||0;
}
function labLampGap(){return labScene({set:'room',title:'Lamp gap.',plan:'Walk home.',clock:16*3600+42*60}).concat([
  startWalk,function(){var g=G;g.gapWalk=true;g.gapLag=0;g.gapA=1;g.gapCaught=0;g.gapArmed=false;},{wait:2.4},
  ['S','Home. Straight line. Nothing can happen on a straight line.'],
  ['H','You say that every time.'],
  until(function(){return G.gapCaught>=1;}),
  ['H','Where did you go?'],
  ['S','There was a gap. Between the lamps. I lost you.'],
  ['H','I was right here.'],
  ['S','YOU were. I was in a gap. Very different experience.'],
  until(function(){return G.gapCaught>=2;}),
  ['S','Again. They space them out on purpose.'],
  ['H','They’re streetlights.'],
  ['S','Streetlights with a gap policy.',{look:'squint'}],
  until(function(){return !G.walking&&G.w&&G.w.x>=G.w.xT-1;}),
  ['S','…Home. I only lost you twice.'],
  ['H','You never lost me. You just couldn’t see me for a bit.'],
  ['S','…That’s the same thing.',{quiet:1}],
  ['H','It really isn’t.'],
  {wait:0.8}
 ]);}

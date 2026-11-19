/* ================= the camera has a grammar, not one move ================= */
// TYOSUUNNITELMA.md section 5. A step: shot(type, {who, z, rate, hide}).
//   wide   the default room (1.025)
//   two    the human and one other person, close (z≈1.5). hide:1 sends Ekskyysmi down behind the human's back
//   close  one face (z≈1.9)
//   push   a slow creep in, for a spiral (rate ≈0.35)
//   crash  Ekskyysmi shoves back into the frame (after a two-shot with hide:1)
// One special shot per beat, then back to wide. Monday keeps the old single move: it teaches the language.
// Less motion: every move is a cut.
function camX(who){var g=G;return who==='A'?g.ax:who==='B'?g.bx2:who==='R'?g.rx:g.human.x;}
function shot(type,o){o=o||{};return function(){
  var g=G,M=g.morko,x=camX(o.who||'A'),rate=function(r){return RM?40:r;};
  if(type==='wide'){g.cz=1.025;g.cx=W/2;g.cy=H/2;g.camRate=rate(1.8);if(g.hidS!=null){M.sT=g.hidS;g.hidS=null;}return;}
  if(typeof x!=='number')x=g.human.x;
  if(type==='two'){g.cz=o.z||1.5;g.cx=(g.human.x+x)/2;g.cy=268;g.camRate=rate(o.rate||1.6);
    if(o.hide&&g.hidS==null){g.hidS=M.sT;M.sT=0.35;}}
  else if(type==='close'){g.cz=o.z||1.9;g.cx=x;g.cy=248;g.camRate=rate(o.rate||2);}
  else if(type==='push'){g.cz=o.z||1.22;g.cx=x;g.cy=272;g.camRate=rate(o.rate||0.35);}
  else if(type==='crash'){var back=Math.max(g.hidS!=null?g.hidS:M.sT,1.15);g.hidS=null;M.sT=back;M.s=back*0.86;g.shake=RM?0:0.25;sfx('cut');}
};}
// A hit frames whoever caused it, and goes deeper as the week goes on (Monday keeps the centred move).
function hitFrame(k,from){
  var g=G;if(g.chapter<=1||g.lab&&!from)return false;
  if(from==='P'){g.cz=1.16+0.1*k;g.cx=g.human.x+20;g.cy=272;return true;}
  var sx=camX(from||'A');if(typeof sx!=='number')return false;
  g.cz=1.1+0.1*k;g.cx=g.human.x+(sx-g.human.x)*0.62;g.cy=262;return true;
}

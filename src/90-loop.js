/* ================= loop ================= */
var last=0;
function frame(ts){
  var elapsed=clamp((ts-last)/1000||0,0,1),dt=Math.min(elapsed,0.05);last=Math.max(last,ts);
  if(!paused&&!appHidden)update(dt,elapsed);
  draw();
  window.requestAnimationFrame(frame);
}
syncImmersive();reset(null);showTitle();
window.__T={get G(){return G;},start:startGame,frame:frame,advance:advance,choose:choose,state:function(){return WAIT;},nopts:function(){return CH?CH.length:0;},options:function(){return CH;},tick:update,draw:draw,pause:togglePause,unlock:function(){LOCK=0;},reset:reset,title:showTitle,history:function(){return history;},chapter:startChapter,lab:startLab,swat:swat,skipIntro:skipIntro,inside:{run:function(){return G.run;},day:function(){return G.day0;},mult:function(){return G.mult;},add:addLived,cameBack:cameBack,receipt:function(){return G.receiptText;}},qteKey:function(k){return qteKey({key:k});},qte:function(){return G.qte;},full:toggleFull,immersive:function(){return htmlEl.classList.contains('immersive');},chapters:showChapters,hotScreen:function(x,y){var r=cv.getBoundingClientRect(),z=C.z,hw=W/(2*z),hh=H/(2*z),fx=clamp(C.fx,hw,W-hw),fy=clamp(C.fy,hh,H-hh);return [r.left+((x-fx)*z+W/2)/W*r.width,r.top+((y-fy)*z+H/2)/H*r.height];},labList:showLab,moments:showMoments,about:showAbout,lensTap:lensTap,back:backButton,lang:function(v){LANG=v;try{document.documentElement.lang=v;}catch(e){}},fiMiss:function(){return FIMISS;},fiDict:function(){return FI;},sound:{load:loadSound,has:function(k){return !!BUF[k];},music:function(){return {name:musicName,playing:!!(musicEl&&!musicEl.paused),t:musicEl?musicEl.currentTime:0,vol:musicEl?musicEl.volume:0};},seek:function(t){if(musicEl)musicEl.currentTime=t;},play:sfx,list:SAMPLES},holdDown:holdDown,holdUp:holdUp};
window.requestAnimationFrame(frame);

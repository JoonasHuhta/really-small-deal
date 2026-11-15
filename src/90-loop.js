/* ================= loop ================= */
var last=0;
function frame(ts){
  var elapsed=clamp((ts-last)/1000||0,0,1),dt=Math.min(elapsed,0.05);last=Math.max(last,ts);
  if(!paused)update(dt,elapsed);
  draw();
  window.requestAnimationFrame(frame);
}
resize();reset(null);showTitle();
window.__T={get G(){return G;},start:startGame,frame:frame,advance:advance,choose:choose,state:function(){return WAIT;},nopts:function(){return CH?CH.length:0;},options:function(){return CH;},tick:update,draw:draw,pause:togglePause,unlock:function(){LOCK=0;},reset:reset,title:showTitle,history:function(){return history;},chapter:startChapter,lab:startLab,swat:swat,skipIntro:skipIntro,chapters:showChapters,about:showAbout,lensTap:lensTap,back:backButton,sound:{load:loadSound,has:function(k){return !!BUF[k];},play:sfx,list:SAMPLES},holdDown:holdDown,holdUp:holdUp};
window.requestAnimationFrame(frame);

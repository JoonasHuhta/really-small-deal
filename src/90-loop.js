/* ================= loop ================= */
var last=0;
function frame(ts){
  var elapsed=clamp((ts-last)/1000||0,0,1),dt=Math.min(elapsed,0.05);last=Math.max(last,ts);
  if(!paused&&!appHidden)update(dt,elapsed);
  draw();
  window.requestAnimationFrame(frame);
}
syncImmersive();reset(null);showTitle();
if(window.location&&new URLSearchParams(window.location.search).get('preview')==='epilogue'){
  showOv('<div class="eyebrow">Really Small Deal</div><h2>The week, itemised.</h2><button class="go" type="button" data-lab="epilogue">Watch epilogue ▶</button><button class="go alt" type="button" data-go="menu">Main menu</button>','menu');
}
window.__T={get G(){return G;},start:startGame,frame:frame,advance:advance,choose:choose,state:function(){return WAIT;},nopts:function(){return CH?CH.length:0;},options:function(){return CH;},tick:update,draw:draw,pause:togglePause,unlock:function(){LOCK=0;},reset:reset,title:showTitle,history:function(){return history;},chapter:startChapter,lab:startLab,swat:swat,skipIntro:skipIntro,inside:{run:function(){return G.run;},day:function(){return G.day0;},mult:function(){return G.mult;},add:addLived,cameBack:cameBack,receipt:function(){return G.receiptText;}},qteKey:function(k){return qteKey({key:k});},qte:function(){return G.qte;},full:toggleFull,immersive:function(){return htmlEl.classList.contains('immersive');},chapters:showChapters,hotScreen:function(x,y){var r=cv.getBoundingClientRect(),z=C.z,hw=W/(2*z),hh=H/(2*z),fx=clamp(C.fx,hw,W-hw),fy=clamp(C.fy,hh,H-hh);return [r.left+((x-fx)*z+W/2)/W*r.width,r.top+((y-fy)*z+H/2)/H*r.height];},labList:showLab,moments:showMoments,about:showAbout,lensTap:lensTap,back:backButton,tr:function(s){return tr(s);},trQ:function(s){return trQ(s);},dict:function(l){return DICT[l]||(DICT[l]={});},lang:function(v){LANG=v;try{document.documentElement.lang=v;}catch(e){}try{chromeText();if(!G.started&&ov.querySelector('h1.logo'))showOv(titleHTML(loadProgress()));}catch(e){}},fiMiss:function(){return FIMISS;},fiDict:function(){return FI;},music:function(){return musicName;},sound:{load:loadSound,has:function(k){return !!BUF[k];},music:function(){return {name:musicName,playing:!!(musicEl&&!musicEl.paused),t:musicEl?musicEl.currentTime:0,vol:musicEl?musicEl.volume:0};},seek:function(t){if(musicEl)musicEl.currentTime=t;},play:sfx,list:SAMPLES},holdDown:holdDown,holdUp:holdUp};
window.requestAnimationFrame(frame);

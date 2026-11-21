// Every narrator line that starts with a time ("00:19. ...") must match the day stamp on screen (21.11.2026).
// The stamp made the clock visible, so a line that says one time while the corner says another is a bug.
const assert=require('assert');
const {T,element,fire}=require('./harness.cjs')();
T.start('B',false);let seen=0,checked=0;const bad=[];
const hm=c=>String(Math.floor(c/3600)%24).padStart(2,'0')+':'+String(Math.floor(c%3600/60)).padStart(2,'0');
for(let i=0;i<200000;i++){T.unlock();const h=T.history();
 while(seen<h.length){const l=h[seen++];const m=/^(\d{1,2})[:.](\d\d)\b/.exec(l.text);
  if(m&&l.who==='N'){checked++;const want=+m[1]*60+ +m[2],have=Math.floor(T.G.clock/60)%1440;
   if(Math.abs(want-have)>3)bad.push((T.G.moment||'ch'+T.G.chapter)+' says '+m[0]+', the stamp shows '+hm(T.G.clock)+': '+l.text.slice(0,50));}}
 const s=T.state();if(s==null&&!T.G.dayEnd&&T.G.moment==='radiator')break;   // By the radiator. comes after the last image
 if(s==='choice')T.choose(T.options().findIndex(o=>!o.off));
 else if(s==='click'){T.tick(2);T.advance();}
 else if(s==='hold'){T.holdDown();T.tick(0.05);}
 else if(s==null&&T.G.dayEnd)fire(element('ov'),'click',{target:{getAttribute(k){return k==='data-go'?'next':null;}}});
 else{T.advance();T.tick(0.5);}}
assert.ok(T.G.moment==='radiator','the story reached its last scene (stopped in '+(T.G.moment||'ch'+T.G.chapter)+', state '+T.state()+')');
assert.equal(bad.length,0,'a narrator line names a time the stamp does not show:\n'+bad.join('\n'));
console.log('PASS: every narrator time matches the day stamp ('+checked+' timed lines in the whole story).');

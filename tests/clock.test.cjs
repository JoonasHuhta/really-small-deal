// Every narrator line that starts with a time ("00:19. ...") must match the day stamp on screen (21.11.2026).
// The stamp made the clock visible, so a line that says one time while the corner says another is a bug.
const assert=require('assert');
const {T,element,fire}=require('./harness.cjs')();
T.start('B',false);let seen=0,checked=0;const bad=[];
const week=[];let previous=null;
const hm=c=>String(Math.floor(c/3600)%24).padStart(2,'0')+':'+String(Math.floor(c%3600/60)).padStart(2,'0');
for(let i=0;i<200000;i++){T.unlock();const h=T.history();
 const g=T.G,key=g.moment||'ch'+g.chapter;
 if(['glass','colleagues','evening'].includes(key))assert.equal(g.day0.label,'A THURSDAY');
 if(key!==previous){week.push([key,g.dayTag,hm(g.clock)]);previous=key;}
 while(seen<h.length){const l=h[seen++];const m=/^(\d{1,2})[:.](\d\d)\b/.exec(l.text);
  if(l.who==='R'&&l.text.startsWith('One small thing: the summary')){
   assert.equal(g.dayTag,'WEDNESDAY');
   assert.equal(g.day0.label,'A WEDNESDAY','the review is filed under Wednesday');
  }
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
assert.deepStrictEqual(week.slice(1,9),[
 ['ch2','TUESDAY','16:55'],['enhance','TUESDAY, ONE LAST MEETING','17:56'],
 ['rewind','LATE TUESDAY','23:40'],['ch3','WEDNESDAY','03:07'],
 ['glass','THURSDAY MORNING','10:02'],['colleagues','THURSDAY, AFTER LUNCH','13:10'],
 ['evening','THURSDAY, AFTER WORK','17:05'],['ch4','THURSDAY','17:30']
],'the weekday transitions run forwards through game night');
const lines=T.history();
assert.ok(lines.some(l=>l.who==='H'&&l.text==='Hi, Eero.'),'HUMAN greets Eero by name');
const sannaIntro=lines.findIndex(l=>l.text.startsWith('Here comes Sanna.')),sannaGreeting=lines.findIndex(l=>l.who==='A'&&l.text==='oh, hi.');
assert.ok(sannaIntro>=0&&sannaIntro<sannaGreeting,'Sanna is named before her greeting');
console.log('PASS: every narrator time matches the day stamp ('+checked+' timed lines in the whole story).');

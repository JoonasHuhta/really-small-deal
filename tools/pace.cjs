// Deterministic reading estimate, not a prediction of a person's play time.
const assert=require('node:assert/strict');
const makeHarness=require('../tests/harness.cjs');
const WPM=230,DT=0.05;
const {T,element,fire}=makeHarness();
const rows=new Map();
const words=t=>(t.match(/\S+/g)||[]).length;
const read=t=>words(t)*60/WPM;
T.start('B',false);
let steps=0;
while(!(T.G.ended&&!T.G.dayEnd)&&steps++<200000){
  const g=T.G,key=g.chap&&g.chap.part?'part'+g.chap.part:g.moment||'chapter'+g.chapter;
  if(!rows.has(key))rows.set(key,{scene:key,lines:0,words:0,seconds:0});
  const row=rows.get(key),state=T.state();T.unlock();
  if(state==='click'){
    if(g.cur){row.lines++;row.words+=words(g.cur.text);row.seconds+=read(g.cur.text);}
    row.seconds+=0.6;T.advance();
  }else if(state==='choice'){
    row.seconds+=4;T.choose(T.options().findIndex(o=>!o.off));
  }else if(state==='view'){
    row.words+=words(g.out.cap);row.seconds+=Math.max(2.4,read(g.out.cap))+0.6;
    T.tick(3);T.unlock();T.advance();
  }else if(state==='stretch'||state==='lamp'){
    row.seconds+=2;T.advance();
  }else if(state==='hold'){
    T.holdDown();row.seconds+=DT;T.tick(DT);
  }else if(['time','auto','qte','fight','toss'].includes(state)){
    if(state==='toss')T.advance();
    row.seconds+=DT;T.tick(DT);
  }else if(g.dayEnd){
    row.seconds+=4;fire(element('ov'),'click',{target:{getAttribute(k){return k==='data-go'?'next':null}}});
  }else throw Error('Pace driver stalled: '+state);
}
assert.ok(T.G.ended&&!T.G.dayEnd,'pace route reaches the end');
assert.equal([...rows.keys()].filter(k=>k.startsWith('chapter')).length,5);
// every moment listed in AFTER is reached once (counted from the source, so reordering does not break the tool)
const afterSrc=require('node:fs').readFileSync(require('node:path').join(__dirname,'..','src','33-moments.js'),'utf8').split('var AFTER={')[1].split('};')[0];
const listed=[...afterSrc.matchAll(/'(\w+)'/g)].length;
assert.equal([...rows.keys()].filter(k=>!k.startsWith('chapter')&&!k.startsWith('part')).length,listed);
const list=[...rows.values()],total=list.reduce((s,r)=>s+r.seconds,0);
const stamp=s=>Math.floor(Math.round(s)/60)+':'+String(Math.round(s)%60).padStart(2,'0');
if(process.argv.includes('--json'))console.log(JSON.stringify({route:'Monday B, first available choices, automatic replies',wpm:WPM,seconds:total,rows:list},null,2));
else{
  console.log('Estimate: Monday B, first available choices, automatic replies.');
  console.log('230 words/min + 0.6 s per line, choices 4 s; scripted waits and holds.');
  console.log('Outside captions included; optional pauses, rereading and journal excluded.');
  console.table(list.map(r=>({scene:r.scene,lines:r.lines,words:r.words,estimate:stamp(r.seconds)})));
  console.log('TOTAL '+stamp(total)+' ('+list.reduce((s,r)=>s+r.words,0)+' words). Playtest before making cuts.');
}

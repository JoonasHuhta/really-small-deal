// The Finnish pilot (0.89): Monday, from the first line to the end-of-day receipt, in Finnish.
// 1. Every route through Monday (a covering sample: each day, each first and second pick, a won and a missed response)
//    shows no English line in Finnish mode. tr() records every English string it had no Finnish for.
// 2. The dictionary keeps what the code depends on: leading/trailing spaces, <br>, {placeholders}, a leading “…”,
//    “Name:” message prefixes, and Finnish quotation marks (” ”), never English ones.
// 3. English stays English: a Monday in English records nothing and shows no Finnish.
const assert=require('assert');
const makeHarness=require('./harness.cjs');
const KEYS=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '];
function monday(lang,day,picks,win){
  const a=makeHarness();a.T.lang(lang);a.T.start(day,false);let ci=0;const seen=[];
  for(let j=0;j<20000;j++){const g=a.T.G,s=a.T.state();a.T.draw();
    if(g.cur&&g.cur.text&&seen[seen.length-1]!==g.cur.text)seen.push(g.cur.text);
    if(g.chapter>1||g.ended||g.dayEnd)break;a.T.unlock();
    if(s==='choice'){const os=a.T.options(),ok=os.map((o,i)=>i).filter(i=>!os[i].off);a.T.choose(ok[Math.min(picks[ci%picks.length],ok.length-1)]);ci++;}
    else if(s==='qte'&&win){const q=a.T.qte();if(q&&!q.end&&q.i<5)a.T.qteKey(KEYS[q.i]);a.T.tick(.05);}
    else if(s==='click'||s==='stretch'||s==='lamp')a.T.advance();
    else if(s==='hold'){a.T.holdDown();a.T.tick(.12);}
    else if(s==='view'){a.T.tick(3);a.T.unlock();a.T.advance();}
    else if(['qte','auto','time','fight','toss'].includes(s)){if(s==='toss')a.T.advance();a.T.tick(.12);}
    else throw Error('stalled: '+s);}
  assert.ok(a.T.G.dayEnd,'Monday should reach its end screen ('+lang+' '+day+' '+picks+')');
  return {miss:a.T.fiMiss(),seen,end:a.element('ov').innerHTML,dict:a.T.fiDict()};
}
// 1. Finnish Monday: nothing left in English
const missing={};let routes=0,dict=null;
for(const day of ['A','B','C'])for(let p0=0;p0<4;p0++)for(let p1=0;p1<4;p1++){
  const r=monday('fi',day,[p0,p1,(p0+p1)%4],(p0+p1)%2===0);routes++;dict=r.dict;
  for(const k of Object.keys(r.miss))missing[k]=(missing[k]||0)+1;
  assert.ok(/Maanantai on ohi/.test(r.end),'the end of Monday is in Finnish');
}
assert.deepStrictEqual(Object.keys(missing),[],'Finnish Monday still shows English:\n'+Object.keys(missing).join('\n'));
// 2. the dictionary keeps what the code depends on
const bad=[];
for(const [en,fi] of Object.entries(dict)){
  const why=[];
  if(/^\s/.test(en)!==/^\s/.test(fi)||/\s$/.test(en)!==/\s$/.test(fi))why.push('spaces at the ends');
  if((en.match(/<br>/g)||[]).length!==(fi.match(/<br>/g)||[]).length)why.push('<br>');
  if((en.match(/\{\w+\}/g)||[]).join()!==(fi.match(/\{\w+\}/g)||[]).join())why.push('placeholder');
  if(en.startsWith('…')&&!fi.startsWith('…'))why.push('leading …');
  if(/^[A-Z][a-z]+: [“"]/.test(en)&&!/^\S+: ”/.test(fi))why.push('message prefix');
  if(/[“]/.test(fi))why.push('English quotation mark');
  const qe=(en.match(/[“”]/g)||[]).length,qf=(fi.match(/”/g)||[]).length;if(qf<qe||qf%2)why.push('quotation marks');   // Finnish may quote a little more (”moi”), never less
  if(why.length)bad.push(JSON.stringify(en)+' → '+JSON.stringify(fi)+': '+why.join(', '));
}
assert.deepStrictEqual(bad,[],'dictionary entries break the code:\n'+bad.join('\n'));
// 3. English stays English
for(const day of ['A','B','C']){const r=monday('en',day,[0,1,2],day==='B');
  assert.strictEqual(Object.keys(r.miss).length,0,'English mode records nothing');   // (the object comes from the game's own context)
  assert.ok(r.seen.includes('Today I’m going to ask Sanna to lunch.')&&!r.seen.some(t=>/Pyydämme|Sannaa/.test(t)),'English Monday is English');
  assert.ok(/End of Monday/.test(r.end));}
console.log('PASS Finnish pilot: '+routes+' Monday routes without English, '+Object.keys(dict).length+' dictionary entries keep their structure, English unchanged');

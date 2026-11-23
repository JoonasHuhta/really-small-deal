// The mug's balance across the week (VISIO V22): full on Monday morning, only Thursday empties and breaks it,
// Friday's mug is the mended one, and no other chapter drops below one sip on any route.
const assert=require('assert');
const makeHarness=require('./harness.cjs');
for(const route of ['A','B','C']){for(const pick of [0,1,2]){
const {T,element,fire}=makeHarness();T.start(route,false);let steps=0;const per={};let afterReview=null,atWork=null;
while(!(T.G.ended&&!T.G.dayEnd)&&steps++<300000){const g=T.G,key=g.moment||'ch'+g.chapter;const st=T.state();T.unlock();
 if(g.mug){const p=per[key]||(per[key]={min:9,max:-1,end:null,start:g.mug.v});p.min=Math.min(p.min,g.mug.v);p.max=Math.max(p.max,g.mug.v);p.end=g.mug.v;if(g.mug.broken)p.broke=1;}
 if(key==='ch3'&&g.mug&&g.clock>=9*3600+12*60&&g.clock<10*3600)afterReview=g.mug.v;
 if(key==='ch3'&&g.mug&&g.clock>=10*3600+20*60&&g.clock<11*3600&&atWork===null)atWork=g.mug.v;
 if(st==='click')T.advance();else if(st==='choice'){const os=T.options();const al=os.map((o,i)=>i).filter(i=>!os[i].off);T.choose(al[Math.min(pick,al.length-1)]);}
 else if(st==='view'){T.tick(3);T.unlock();T.advance();}else if(st==='stretch'||st==='lamp')T.advance();else if(st==='hold'){T.holdDown();T.tick(0.05);}
 else if(['time','auto','qte','fight','toss'].includes(st)){if(st==='toss')T.advance();T.tick(0.05);}
 else if(g.dayEnd)fire(element('ov'),'click',{target:{getAttribute(k){return k==='data-go'?'next':null}}});}
assert.equal(per.ch1&&per.ch1.max,5,'Monday starts with a full mug');
assert.ok(per.ch1.min<=1&&per.ch1.end>=3,'Monday dips nearly empty and home fills it again');
for(const k in per){if(k==='ch4'){assert.ok(per[k].broke,'Thursday breaks the mug');continue;}assert.ok(per[k].min>=1,k+' must not empty the mug ('+route+pick+')');assert.ok(!per[k].broke,k+' must not break the mug');}
assert.equal(per.ch3.start,per.ch2.end,'Wednesday’s night carries Tuesday’s balance ('+route+pick+')');
assert.equal(afterReview,2,'the compliments refill one sip after the review');
assert.equal(atWork,afterReview,'the work vignette starts with the same mug as the review left');
assert.ok(T.G.mugMended,'the gold seams are remembered');}}
console.log('PASS: the mug across the week (9 routes): Monday dips and refills, Wednesday follows on from the Tuesday meeting, only Thursday breaks it, mended after.');

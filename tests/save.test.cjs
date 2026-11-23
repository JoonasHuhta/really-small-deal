// Continue must not rewrite the player's week (Codex review of 0.76, finding A).
// One run is played straight to the end; a second starts from the checkpoint saved at the radiator and uses Continue.
// Both must end with the same receipt and the same last note. The epilogue's own receipt must count the same days.
const assert=require('assert');
const makeHarness=require('./harness.cjs');
function drive(x,pick,watch){const {T,element,fire}=x;
 for(let j=0;j<300000;j++){const g=T.G,s=T.state();if(g.ended&&!g.dayEnd)return;T.unlock();if(watch)watch(g,x);
  if(s==='click'||s==='stretch'||s==='lamp')T.advance();
  else if(s==='choice'){const os=T.options(),ok=os.map((o,i)=>i).filter(i=>!os[i].off);T.choose(ok[Math.min(pick,ok.length-1)]);}
  else if(s==='hold'){T.holdDown();T.tick(.12);}
  else if(s==='view'){T.tick(3);T.unlock();T.advance();}
  else if(['qte','auto','time','fight','toss'].includes(s)){if(s==='toss')T.advance();if(s==='fight'&&g.fight&&g.fight.paced)T.swat();T.tick(.12);}
  else if(g.dayEnd)fire(element('ov'),'click',{target:{getAttribute:k=>k==='data-go'?'next':null}});
  else throw Error('stalled: '+s);}
 throw Error('did not end');}
const note=x=>(x.element('ov').innerHTML.match(/One “no” was said[^<]+|The “no” is still[^<]+/u)||[''])[0];
const days=rc=>(rc.match(/WEEKDAYS FILED\s+(\d+)/)||[])[1];
for(const pick of [0,1]){
 const a=makeHarness();a.T.start('B',false);let saved=null,rewindSave=null,roll=null,prev=null;
 drive(a,pick,(g,x)=>{if(g.moment!==prev){prev=g.moment;if(g.moment==='radiator')saved=x.savedItems.get('ekskyysmi.save');
  if(g.moment==='rewind')rewindSave=x.savedItems.get('ekskyysmi.save');}
  if(g.epi&&!roll){x.T.draw();if(g.epi.rows2)roll=g.epi.rows2;}});
 assert.ok(saved,'a checkpoint exists at the radiator');assert.ok(roll,'the epilogue receipt rolled');
 const endA=a.T.inside.receipt(),noteA=note(a);
 const b=makeHarness();b.savedItems.set('ekskyysmi.save',saved);b.T.title();
 b.fire(b.element('ov'),'click',{target:{getAttribute:k=>k==='data-go'?'cont':null}});
 assert.equal(b.T.G.moment,'radiator','Continue opens the radiator');
 drive(b,pick);
 const endB=b.T.inside.receipt();
 assert.equal(endB,endA,'Continue from the radiator ends with the same receipt as playing straight through (pick '+pick+')');
 assert.equal(note(b),noteA,'…and the same last note about the “no”');
 const rolled=roll.find(r=>r.l==='WEEKDAYS FILED');
 assert.ok(rolled&&rolled.v===days(endA),'the epilogue and the last receipt count the same days ('+(rolled&&rolled.v)+' vs '+days(endA)+')');
 assert.equal(roll.find(r=>r.l==='DAYS LIVED INSIDE').v,endA.match(/DAYS LIVED\s+([\d.]+)/)[1],'inside totals agree across receipts');
 assert.equal(days(endA),'5','Monday to Friday: five days on the calendar');
 if(pick===0){
  assert.ok(rewindSave,'a checkpoint exists before the relocated review');
  const c=makeHarness();c.savedItems.set('ekskyysmi.save',rewindSave);c.T.title();
  c.fire(c.element('ov'),'click',{target:{getAttribute:k=>k==='data-go'?'cont':null}});
  assert.equal(c.T.G.moment,'rewind');
  drive(c,pick);
  const reviews=h=>h.T.history().filter(l=>l.who==='R'&&l.text.startsWith('One small thing: the summary')).length;
  assert.equal(reviews(c),1,'resuming on Tuesday still plays the Wednesday review once');
  assert.equal(c.T.inside.receipt(),endA,'resuming before the review keeps the final receipt');
  const legacy=JSON.parse(rewindSave);
  legacy.at.state.fb='ask'; // before 0.99.5 the review was already completed at this checkpoint
  const d=makeHarness();d.savedItems.set('ekskyysmi.save',JSON.stringify(legacy));d.T.title();
  d.fire(d.element('ov'),'click',{target:{getAttribute:k=>k==='data-go'?'cont':null}});
  drive(d,pick);
  assert.equal(reviews(d),0,'an older save skips the review it has already played');
  assert.equal(days(d.T.inside.receipt()),'5');
 }
 // 0.79: everything the epilogue writes on screen can be read again in Dialogue (and reaches a screen reader)
 {const h=a.T.history().map(x=>x.text);
  for(const want of ['That was the week. (Ekskyysmi kept the receipts)','Sent: three lines. No apology.','7. How do you usually take criticism?','personally.','Signed: Ekskyysmi','One appointment outstanding.'])assert.ok(h.includes(want),'Dialogue is missing an epilogue line: '+want);
  assert.ok(h.some(t=>/^WEEKDAYS FILED: 5$/.test(t)),'the rolling receipt is in Dialogue, row by row');
  assert.ok(h.includes('RIITTA’S EDIT: 1 WORD — “Shorter.”'),'the receipt keeps Riitta’s edit and its note');
  // 0.92: a counted value is read as its number, never as code; the quiet Monday's “No. Sorry.” counts with Friday's answer
  assert.ok(!h.some(t=>/function\s*\(|=>|undefined|\[object/.test(t)),'an epilogue line in Dialogue shows code: '+h.find(t=>/function\s*\(|=>|undefined|\[object/.test(t)));
  const nos=h.filter(t=>/^NOS, SAID OUT LOUD: /.test(t));
  assert.ok(nos.length&&nos.every(t=>t===(a.T.G.no?'NOS, SAID OUT LOUD: 2 — wobbling: allowed':'NOS, SAID OUT LOUD: 1 — next time, then.')),'the nos said out loud: '+nos.join(' | '));}
 if(a.T.G.posting){assert.ok(roll.some(r=>r.l==='APPLICATIONS, SENT'&&r.v==='1'));assert.match(endA,/applications sent, friday\s+1/,'the last receipt agrees with the epilogue about the application');}
}
console.log('PASS: Continue keeps the week (two routes): same receipt, same last note, the epilogue and the end count the same five days, one application sent; the epilogue’s words are in Dialogue.');

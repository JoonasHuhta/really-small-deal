// Music stays where it was placed (0.91). One full story is played; the song playing is read at every step.
// - Every song the game names exists in assets/audio (or the app build would leave it out silently).
// - Tuesday's song plays in chapter 2 only; Quiet Arpeggios in Quiet. and Evenings. only, started once and carried
//   across both (the same day); the epilogue's song only in the epilogue. Monday and the moments in between stay without music.
const assert=require('assert'),fs=require('fs'),path=require('path');
const harness=require('./harness.cjs');
const root=path.resolve(__dirname,'..');
const table=(fs.readFileSync(path.join(root,'src/10-audio.js'),'utf8').match(/var MUSIC=\{[^\n]*\};/)||[''])[0].replace(/\/\*[\s\S]*?\*\//g,'');   // songs tried and dropped stay in a comment
const files=[...table.matchAll(/'(assets\/audio\/[\w-]+\.mp3)'/g)].map(m=>m[1]);
assert.ok(files.length>=4,'MUSIC table not found');
for(const f of files)assert.ok(fs.existsSync(path.join(root,f)),'missing audio file: '+f);
const H=harness(),T=H.T;T.start('B',false);
const where={},starts={};let last=null;
for(let j=0;j<400000;j++){const g=T.G,s=T.state();if(g.ended&&!g.dayEnd)break;T.unlock();
  const m=T.music(),at=g.moment||'chapter'+g.chapter;
  if(m!==last){starts[m]=(starts[m]||0)+1;last=m;}
  (where[m]=where[m]||new Set()).add(at);
  if(s==='click'||s==='stretch'||s==='lamp')T.advance();
  else if(s==='choice'){const os=T.options(),ok=os.map((o,i)=>i).filter(i=>!os[i].off);T.choose(ok[0]);}
  else if(s==='hold'){T.holdDown();T.tick(.12);}
  else if(s==='view'){T.tick(3);T.unlock();T.advance();}
  else if(['qte','auto','time','fight','toss'].includes(s)){if(s==='toss')T.advance();if(s==='fight'&&g.fight&&g.fight.paced)T.swat();T.tick(.12);}
  else if(g.dayEnd)H.fire(H.element('ov'),'click',{target:{getAttribute:k=>k==='data-go'?'next':null}});
  else throw Error('stalled: '+s);}
const list=k=>[...(where[k]||[])].sort().join(', ');
assert.strictEqual(list('tuesday'),'chapter2, chapter3','Ordinary Evening follows Riitta’s message through the review: '+list('tuesday'));
assert.strictEqual(list('quiet'),'evenings, quiet','Quiet Arpeggios: '+list('quiet'));
assert.strictEqual(starts.quiet,1,'Quiet Arpeggios should start once and carry on into Evenings, started '+starts.quiet+'×');
assert.strictEqual(list('epilogue'),'epilogue','the epilogue’s song: '+list('epilogue'));
console.log('PASS: music in its places ('+files.length+' songs on disk; Ordinary Evening in the message and review, Quiet Arpeggios across Quiet. and Evenings. without a restart, the epilogue’s song in the epilogue)');

'use strict';
// Every moment in LABS, played to its end on three choice paths (first, middle, last), with drawing.
// Catches: a crash, a scene that never ends, an empty or broken line, an unknown speaker.
// Only lines waiting for a click are checked: hold / toss / fight steps keep an empty line on purpose.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const harness=require('./harness.cjs');
const root=path.resolve(__dirname,'..');
const src=fs.readFileSync(path.join(root,'src/50-lab.js'),'utf8').split('var LABS={')[1].split('\n};')[0];
const ids=[...src.matchAll(/^\s+(\w+):\{title/gm)].map(m=>m[1]);
assert.ok(ids.length>=10,'LABS was not found in src/50-lab.js');
const SPEAKERS='SHABPRNZYWTXL';
const problems=[];let runs=0,lines=0;
// Hats (0.90, Joonas: "are the hats where they belong?"): each moment that has a costume still puts it on, and nothing ends wearing one.
const HATS={glass:['detective'],enhance:['detective'],evening:['chef'],mug:['pirate'],epilogue:['chef','party','pirate','detective']},worn={};
for(const id of ids){
  for(const pick of ['first','middle','last']){
    const H=harness(),T=H.T,seen=new Set();runs++;let ended=false;
    try{
      T.lab(id);
      for(let guard=0;guard<6000;guard++){
        T.unlock();const st=T.state(),c=T.G.cur;if(T.G.morko.hat)(worn[id]=worn[id]||new Set()).add(T.G.morko.hat);
        if(c&&st==='click'){const k=c.who+'|'+c.text;if(!seen.has(k)){seen.add(k);lines++;
          if(typeof c.text!=='string'||!c.text.trim()||/undefined|NaN|\[object/.test(c.text))problems.push(`${id} (${pick}): broken line from ${c.who}: ${JSON.stringify(c.text)}`);
          if(!SPEAKERS.includes(c.who))problems.push(`${id} (${pick}): unknown speaker ${c.who}`);}}
        T.draw();
        if(st==='click')T.advance();
        else if(st==='choice'){const open=T.options().map((o,i)=>o.off?-1:i).filter(i=>i>=0);T.choose(pick==='first'?open[0]:pick==='last'?open[open.length-1]:open[Math.floor(open.length/2)]);}
        else if(st==='view'){T.tick(1);T.advance();}
        else if(st==='fight'){if(T.G.fight&&T.G.fight.paced)T.swat();T.tick(0.3);}
        else if(st==='stretch'||st==='hold'||st==='lamp'||st==='toss'){T.advance();T.tick(0.4);}
        else if(st==='qte')T.tick(0.5);
        else if(st===null){if(H.document.getElementById('ov').classList.contains('on')||guard>5){ended=true;break;}T.tick(0.1);}
        else T.tick(0.2);
        T.tick(0.05);
      }
      if(T.G.morko.hat)problems.push(`${id} (${pick}): ends wearing the ${T.G.morko.hat} hat`);
      if(T.G.lens)problems.push(`${id} (${pick}): ends holding the glass`);
      if(!ended)problems.push(`${id} (${pick}): never reached its end; stuck in state ${T.state()} at ${JSON.stringify(T.G.cur&&T.G.cur.text)}`);
    }catch(e){problems.push(`${id} (${pick}): crashed: ${e&&e.stack?e.stack.split('\n').slice(0,3).join(' | '):e}`);}
  }
}
for(const [id,hats] of Object.entries(HATS))for(const h of hats)if(!(worn[id]&&worn[id].has(h)))problems.push(`${id}: the ${h} hat never went on`);
for(const [id,s] of Object.entries(worn))for(const h of s)if(!HATS[id]?.includes(h))problems.push(`${id}: wears the ${h} hat, which belongs elsewhere`);
// 0.99.27: "for the record" is the week's thread, paid off in Quiet. ("Nobody said 'for the record'. All day."). The moments
// being tried may use it once between them, or the payoff wears thin.
const trySrc=fs.readdirSync(path.join(root,'src')).filter(f=>/^59-/.test(f)).map(f=>fs.readFileSync(path.join(root,'src',f),'utf8').replace(/\/\/[^\n]*/g,'')).join('\n');
const ftr=(trySrc.match(/for the record/gi)||[]).length;
if(ftr>1)problems.push(`the moments being tried say "for the record" ${ftr} times (at most once: it belongs to the week)`);
assert.deepEqual(problems,[],'\n'+problems.join('\n'));
console.log(`PASS: ${ids.length} moments × 3 choice paths (${runs} runs, ${lines} distinct lines), no crashes, stalls or broken lines; hats where they belong.`);

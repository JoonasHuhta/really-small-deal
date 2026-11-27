'use strict';
// Translation readiness (0.99.39, Joonas 27.11.: "soon we translate into different languages; make sure everything scales").
// 1. In the pseudo-language every translated letter is accented. Play a week and every Moment in it: any plain English word
//    left in a line, a choice, a card, an outside view, the panel, an overlay, a menu or on the canvas skipped translation.
// 2. Numbers: a dictionary entry with {n} translates a string with any numbers in it, with the language's decimal mark.
// 3. The canvas translates quietly: a piece of a line is not a missing entry. English stays English.
const fs=require('fs'),path=require('path'),assert=require('assert');
const harness=require('./harness.cjs');
const root=path.resolve(__dirname,'..');
const plain=s=>String(s).replace(/<[^>]*>/g,' ').replace(/&[a-z]+;/g,' ').replace(/(?:^|\s)(?:You|[A-Z][a-z]+): (?=[“(●])/g,' ').match(/[A-Za-z]{2,}/g);
const leaks=new Map();
function check(s,where){if(typeof s!=='string')return;const m=plain(s);if(m){const k=s.slice(0,90);if(!leaks.has(k))leaks.set(k,where+': '+m.slice(0,4).join(' '));}}
function watch(H,where){const g=H.T.G;check(g.cur&&g.cur.text,where+' line');if(H.T.state()==='choice')for(const o of H.T.options())check(H.T.tr(o.t),where+' choice');
  if(g.out)for(const k of ['title','dur','cap'])check(g.out[k],where+' outside');if(g.chap)for(const k of ['day','title','caption'])check(g.chap[k]&&H.T.tr(g.chap[k]),where+' card');
  for(const id of ['line','opts','ov'])check(H.element(id).innerHTML,where+' #'+id);
  for(const t of H.painted())check(t,where+' canvas');H.startPaint();}
// a week
{const H=harness(),{T,element,fire}=H;T.lang('xx');H.startPaint();T.start('B',false);
 for(let j=0;j<400000;j++){const g=T.G,s=T.state();if(g.ended&&!g.dayEnd)break;T.unlock();if(j%2===0){T.draw();watch(H,g.moment||'chapter '+g.chapter);}
  if(s==='click'||s==='stretch'||s==='lamp')T.advance();
  else if(s==='choice'){const os=T.options(),ok=os.map((o,i)=>i).filter(i=>!os[i].off);T.choose(ok[Math.min(1,ok.length-1)]);}
  else if(s==='hold'){T.holdDown();T.tick(.12);}
  else if(s==='view'){T.tick(1);T.draw();watch(H,'view');T.tick(2);T.unlock();T.advance();}
  else if(['qte','auto','time','fight','toss'].includes(s)){if(s==='toss')T.advance();if(s==='fight'&&g.fight&&g.fight.paced)T.swat();T.tick(.12);}
  else if(g.dayEnd){watch(H,'day end');fire(element('ov'),'click',{target:{getAttribute:k=>k==='data-go'?'next':null}});}
  else T.tick(.12);}
 watch(H,'week end');}
// every Moment
const labs=fs.readFileSync(path.join(root,'src/50-lab.js'),'utf8').split('var LABS={')[1].split('\n};')[0];
for(const id of [...labs.matchAll(/^\s+(\w+):\{title/gm)].map(m=>m[1])){const H=harness(),T=H.T;T.lang('xx');H.startPaint();T.lab(id);
  for(let guard=0;guard<9000;guard++){T.unlock();const st=T.state();T.draw();watch(H,id);
    if(st==='click')T.advance();else if(st==='choice'){const o=T.options().map((x,i)=>x.off?-1:i).filter(i=>i>=0);T.choose(o[0]);}
    else if(st==='view'){T.tick(1);T.draw();watch(H,id);T.advance();}else if(st==='fight'){if(T.G.fight&&T.G.fight.paced)T.swat();T.tick(0.3);}
    else if(['stretch','hold','lamp','toss'].includes(st)){T.advance();T.tick(0.4);}
    else if(st===null){if(H.document.getElementById('ov').classList.contains('on')||guard>5)break;T.tick(0.1);}else T.tick(0.2);T.tick(0.05);}
  watch(H,id+' end');}
// the menus
{const H=harness(),{T,element,fire}=H;T.lang('xx');T.title();watch(H,'title');
 for(const go of ['chapters','menu','moments','menu','about','menu']){fire(element('ov'),'click',{target:{getAttribute:k=>k==='data-go'?go:null}});watch(H,'menu '+go);}}
assert.deepStrictEqual([...leaks].map(([k,v])=>v+' ← '+k),[],'English that skips translation (the pseudo-language should have accented it)');
// numbers as templates, decimal marks, quiet canvas, English untouched
{const H=harness(),T=H.T,d=T.dict('fi');d['TEST TAKE {n} OF {n}']='KOE {n}/{n}';d['WAIT {n} s']='ODOTA {n} s';T.lang('fi');
 assert.equal(T.tr('TEST TAKE 3 OF 9'),'KOE 3/9','a {n} entry translates any numbers');
 assert.equal(T.tr('WAIT 2.5 s'),'ODOTA 2,5 s','Finnish takes a decimal comma');
 const before=Object.keys(T.fiMiss()).length;assert.equal(T.trQ('a piece of some line'),'a piece of some line');assert.equal(Object.keys(T.fiMiss()).length,before,'the canvas must not file pieces of lines as missing');
 T.lang('en');assert.equal(T.tr('TEST TAKE 3 OF 9'),'TEST TAKE 3 OF 9','English stays English');}
console.log('PASS: translation readiness: a week and every Moment in the pseudo-language leave no English in lines, choices, cards, outside views, the panel, overlays, menus or the canvas; {n} templates; decimal marks; quiet canvas');

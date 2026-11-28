// Every string a player can see, collected by playing the game (0.99.39, for translators).
//   node tools/strings.cjs        → i18n/strings.tsv: the English key, what it is, who says it, where it is first seen
//   node tools/strings.cjs fi     → also i18n/missing-fi.tsv: the keys that language has no entry for yet
// Plays the week eighteen times (each Monday, four picks, a mixed path, a won window), every Moment on three choice paths, and the menus, in a language with an empty dictionary, so
// tr() records every string it is asked for. Canvas text is recorded as it is painted. Pieces of a line (word wrap, typing)
// are left out. A string whose number changes between runs is listed once, as a template with {n}.
'use strict';
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const harness=require('../tests/harness.cjs');
const lang=process.argv[2]||null;
const seen=new Map();   // key -> {kind, who, where, n}
// Painted words that stay as they are in every language (Joonas 27.11.: the office poster "can be just a picture")
const KEEP=new Set(['BE A MUG.','NOT A HERO.']);
let dict=null;
function note(s,kind,who,where){if(typeof s!=='string'||!/[A-Za-z]/.test(s))return;const e=seen.get(s);
  if(e){e.n++;if(e.kind==='canvas'&&kind!=='canvas'){e.kind=kind;e.who=who;}return;}seen.set(s,{kind,who,where,n:1});}
function fresh(){const H=harness();const canvas=[];H.ctx.fillText=function(t){if(typeof t==='string')canvas.push(t);};
  H.T.lang('zz');if(!dict&&lang)dict=H.T.fiDict&&lang==='fi'?H.T.fiDict():{};return {H,canvas};}
function step(H,canvas,where,last){const g=H.T.G;
  if(g.cur&&g.cur!==last.cur){last.cur=g.cur;note(g.cur.text,'line',g.cur.who,where());}
  if(H.T.state()==='choice'&&H.T.options()!==last.opts){last.opts=H.T.options();for(const o of last.opts)note(o.t,'choice','',where());}
  if(g.out&&g.out!==last.out){last.out=g.out;for(const k of ['title','dur','cap'])note(g.out[k],'outside','',where());}
  if(g.chap&&g.chap!==last.chap){last.chap=g.chap;for(const k of ['day','title','caption'])note(g.chap[k],'card','',where());}
  if(canvas.length){for(const t of canvas)note(t,'canvas','',where());canvas.length=0;}}
function harvest(H,where){for(const k of Object.keys(H.T.fiMiss()))note(k,'ui','',where);}
// 1. the week: each Monday (A, B, C) with each first-to-fourth pick, a mixed path, and a won response window (0.99.68:
//    three Monday-B weeks missed every Monday-A and -C line and everything after a won window)
const WEEKS=[];for(const day of ['A','B','C']){for(const pick of [0,1,2,3])WEEKS.push({day,pick});WEEKS.push({day,pick:-1});WEEKS.push({day,pick:0,win:true});}
for(const run of WEEKS){const pick=run.pick;let ci=0;const {H,canvas}=fresh(),{T,element,fire}=H,last={};T.start(run.day,false);
  const where=()=>T.G.moment||('chapter '+T.G.chapter);
  for(let j=0;j<400000;j++){const g=T.G,s=T.state();if(g.ended&&!g.dayEnd)break;T.unlock();if(j%2===0)T.draw();step(H,canvas,where,last);
    if(s==='click'||s==='stretch'||s==='lamp')T.advance();
    else if(s==='choice'){const os=T.options(),ok=os.map((o,i)=>i).filter(i=>!os[i].off);const p=pick<0?(ci*7+run.day.charCodeAt(0))%4:pick;ci++;T.choose(ok[Math.min(p,ok.length-1)]);}
    else if(s==='hold'){T.holdDown();T.tick(.12);}
    else if(s==='qte'&&run.win){const q=T.qte();if(q&&!q.end&&q.t>=0&&q.i<5)T.qteKey(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '][q.i]);T.tick(.05);}
    else if(s==='view'){T.tick(1);T.draw();step(H,canvas,where,last);T.tick(2);T.unlock();T.advance();}
    else if(['qte','auto','time','fight','toss'].includes(s)){if(s==='toss')T.advance();if(s==='fight'&&g.fight&&g.fight.paced)T.swat();T.tick(.12);}
    else if(g.dayEnd){harvest(H,where());fire(element('ov'),'click',{target:{getAttribute:k=>k==='data-go'?'next':null}});}
    else T.tick(.12);}
  harvest(H,'week end');}
// 2. every Moment, three paths
const labs=fs.readFileSync(path.join(root,'src/50-lab.js'),'utf8').split('var LABS={')[1].split('\n};')[0];
for(const id of [...labs.matchAll(/^\s+(\w+):\{title/gm)].map(m=>m[1]))for(const pick of [0,1,2]){
  const {H,canvas}=fresh(),T=H.T,last={};T.lab(id);const where=()=>id;
  for(let guard=0;guard<9000;guard++){T.unlock();const st=T.state();T.draw();step(H,canvas,where,last);
    if(st==='click')T.advance();else if(st==='choice'){const o=T.options().map((x,i)=>x.off?-1:i).filter(i=>i>=0);T.choose(o[Math.min(pick,o.length-1)]);}
    else if(st==='view'){T.tick(1);T.draw();step(H,canvas,where,last);T.advance();}else if(st==='fight'){if(T.G.fight&&T.G.fight.paced)T.swat();T.tick(0.3);}
    else if(['stretch','hold','lamp','toss'].includes(st)){T.advance();T.tick(0.4);}
    else if(st===null){if(H.document.getElementById('ov').classList.contains('on')||guard>5)break;T.tick(0.1);}else T.tick(0.2);T.tick(0.05);}
  harvest(H,id);}
// 3. the menus
{const {H}=fresh(),{T,element,fire}=H;T.title();for(const go of ['chapters','menu','moments','menu','settings','menu','about','menu'])
  fire(element('ov'),'click',{target:{getAttribute:k=>k==='data-go'?go:null}});harvest(H,'menus');}
// pieces of lines are not strings of their own
const whole=[...seen].filter(([k,v])=>v.kind!=='canvas').map(([k])=>k).join('\n');
const rows=[];const tmpl=new Map();
for(const [k,v] of seen){
  if(v.kind==='canvas'){const t=k.replace(/▏$/,'').trim();if(!t||whole.includes(t))continue;
    const parts=t.split(/\s+·\s+|\s{2,}/).filter(Boolean);if(parts.length>1&&parts.every(p=>whole.includes(p)||/^[\d:.,€% ×+-]+$/.test(p)))continue;}
  if(/\d/.test(k)){const key=k.replace(/\d+(?:[.,]\d+)?/g,'{n}');if(!tmpl.has(key)){tmpl.set(key,[]);rows.push(key);}tmpl.get(key).push([k,v]);continue;}
  rows.push([k,v.kind,v.who,v.where,KEEP.has(k)?'not translated: a picture (the office poster)':'']);}
for(let i=0;i<rows.length;i++)if(typeof rows[i]==='string'){const list=tmpl.get(rows[i]),v=list[0][1];
  rows[i]=list.length>1?[rows[i],v.kind,v.who,v.where,'template: '+list.slice(0,3).map(x=>x[0]).join(' | ')]:[list[0][0],v.kind,v.who,v.where,'has a number'];}
// rows stay in the order they were first seen: the story in play order, then the Moments, then the menus
const esc=s=>String(s).replace(/\t/g,' ').replace(/\n/g,'\\n');
fs.mkdirSync(path.join(root,'i18n'),{recursive:true});
fs.writeFileSync(path.join(root,'i18n/strings.tsv'),'english\tkind\twho\tfirst seen\tnote\n'+rows.map(r=>r.map(esc).join('\t')).join('\n')+'\n');
const words=rows.reduce((a,r)=>a+r[0].split(/\s+/).filter(Boolean).length,0),by={};for(const r of rows)by[r[1]]=(by[r[1]]||0)+1;
console.log('i18n/strings.tsv: '+rows.length+' strings, '+words+' words ('+Object.entries(by).map(([k,v])=>k+' '+v).join(', ')+')');
if(lang){const d=dict||{},miss=rows.filter(r=>!d[r[0]]&&!KEEP.has(r[0]));
  fs.writeFileSync(path.join(root,'i18n/missing-'+lang+'.tsv'),'english\tkind\twho\tfirst seen\tnote\n'+miss.map(r=>r.map(esc).join('\t')).join('\n')+'\n');
  console.log('i18n/missing-'+lang+'.tsv: '+miss.length+' of '+rows.length+' have no '+lang+' entry yet');}

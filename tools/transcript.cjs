// Prints what a player reads: every line, every choice offered (the picked one marked >>), outside views and hands-on steps.
// Use it to read a changed scene on more than one route before committing (SYVATARKASTUS.md §11).
//
//   node tools/transcript.cjs                      the whole story: Monday B, first available choices
//   node tools/transcript.cjs --pick 1 --day C     always the second available choice, the dismissive Monday
//   node tools/transcript.cjs --pick rotate        a different choice at each menu (first, second, third, ...)
//   node tools/transcript.cjs --lab radiator       one Moment on its own (any id in LABS, src/50-lab.js)
//   node tools/transcript.cjs --out tx.txt         write to a file instead of the screen
//
// Choices only: holds, the size slider and the other hands-on steps are completed the way the tests complete them.
const fs=require('node:fs'),path=require('node:path');
const make=require(path.join(__dirname,'..','tests','harness.cjs'));
const arg=(k,d)=>{const i=process.argv.indexOf(k);return i>=0&&process.argv[i+1]!==undefined?process.argv[i+1]:d;};
const pick=arg('--pick','0'),day=arg('--day','B'),lab=arg('--lab',null),out=arg('--out',null);
const {T,element,fire}=make();
if(lab)T.lab(lab);else T.start(day,false);
const lines=[];let last='',seen=0,n=0,step=0;
const scene=()=>{const g=T.G;return g.moment?'MOMENT '+g.moment:'CHAPTER '+g.chapter;};
const flush=()=>{const h=T.history();for(;seen<h.length;seen++){const x=h[seen];lines.push((x.who||'?')+': '+String(x.text).replace(/\n/g,' / '));}};
const choose=live=>pick==='rotate'?live[n%live.length]:live[(+pick||0)%live.length];
while(step++<20000){
  T.unlock();T.draw();
  if(!lab){const s=scene();if(s!==last){flush();lines.push('','=== '+s+' ===');last=s;}}
  const st=T.state();
  if(lab&&(T.G.ended||(st===null&&!T.G.lab)))break;
  if(!lab&&T.G.ended&&!T.G.dayEnd)break;
  switch(st){
    case 'click':T.advance();break;
    case 'time':T.tick(6);break;
    case 'view':{flush();const o=T.G.out;if(o)lines.push('[OUTSIDE] '+(o.title||'')+' | '+(o.dur||'')+' | '+(o.cap||''));T.advance();T.tick(6);T.advance();break;}
    case 'choice':{flush();const o=T.options(),live=o.map((x,i)=>x.off?-1:i).filter(i=>i>=0),i=choose(live);
      lines.push('[CHOICE] '+o.map((x,k)=>(k===i?'>>':'  ')+(x.off?'(locked) ':'')+x.t).join(' || '));n++;T.choose(i);break;}
    case 'hold':{const h=T.G.hold;if(h&&!h.logged){h.logged=1;flush();lines.push('[HOLD '+h.kind+']');}T.advance();break;}
    case 'stretch':flush();lines.push('[SIZE SLIDER]');T.advance();break;
    case 'toss':T.advance();T.tick(0.4);break;
    case 'lamp':flush();lines.push('[LAMP]');T.advance();break;
    case 'auto':T.tick(3);break;
    case 'qte':T.tick(1);break;
    case 'fight':if(T.G.fight.paced){T.swat();T.tick(0.6);}else T.tick(0.25);break;
    case null:
      if(T.G.dayEnd){flush();lines.push('[END OF DAY]');fire(element('ov'),'click',{target:{getAttribute(k){return k==='data-go'?'next':null;}}});break;}
      if(lab){T.tick(0.5);break;}
      throw new Error('stalled at '+scene());
    default:throw new Error('stalled: '+st);
  }
}
flush();
const text=lines.join('\n')+'\n';
if(out){fs.writeFileSync(out,text);console.log(out+': '+lines.length+' lines, '+n+' choices');}else process.stdout.write(text);

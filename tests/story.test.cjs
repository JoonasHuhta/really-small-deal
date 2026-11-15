// Runs the real story engine with a small DOM/canvas stand-in. No browser package required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
assert.ok(require('../tools/build.cjs').fresh(),'assets/game.js is out of date: run node tools/build.cjs');
const gradient = {addColorStop(){}};
const ctx = new Proxy({}, {get(o,k){
  if(k==='measureText') return t=>({width:t.length*8});
  if(k==='createLinearGradient'||k==='createRadialGradient') return ()=>gradient;
  return o[k] ?? (()=>{});
}, set(o,k,v){o[k]=v;return true;}});
const els = new Map();
function element(id){
  if(els.has(id))return els.get(id);
  const classes=new Set();
  const el={id,tagName:'DIV',dataset:{},style:{},events:{},clientWidth:960,innerHTML:'',textContent:'',open:false,remove(){},
    classList:{add(x){classes.add(x)},remove(x){classes.delete(x)},contains(x){return classes.has(x)},toggle(x,v){v??=!classes.has(x);v?classes.add(x):classes.delete(x)}},
    addEventListener(k,f){(this.events[k]??=[]).push(f)},setAttribute(k,v){this[k]=v},getAttribute(k){return this[k]},
    getContext(){return ctx},getBoundingClientRect(){return{top:0,left:0,width:960,height:540}},setPointerCapture(){},
    querySelector(){return element('focus')},focus(){},showModal(){this.open=true},close(){this.open=false;fire(this,'close',{})}};
  els.set(id,el);return el;
}
function fire(el,event,payload){for(const fn of el.events[event]??[])fn(payload)}
const document={getElementById:element,body:element('body'),documentElement:Object.assign(element('html'),{requestFullscreen(){}}),hidden:false,events:{},addEventListener(k,f){(this.events[k]??=[]).push(f)}};
const savedItems=new Map();
const window={localStorage:{getItem(k){return savedItems.get(k)??null},setItem(k,v){savedItems.set(k,String(v))}},devicePixelRatio:1,events:{},matchMedia(q){const narrow=/max-height/.test(q);return{get matches(){return narrow?!!window.__narrow:false},addEventListener(){},addListener(){}}},requestAnimationFrame(){},addEventListener(k,f){(this.events[k]??=[]).push(f)}};
const sandbox={window,document,console,Math};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/game.js'),'utf8'),sandbox);
const T=window.__T;
const routes=['grow','cover','exit','none'];
let runs=0,views=0,stretches=0,holds=0;
for(const day of ['A','B','C'])for(let fear=0;fear<3;fear++)for(let route=0;route<4;route++)for(let walk=0;walk<5;walk++){
  T.start(day,false);
  let step=0;
  while(!T.G.ended&&step++<350){
    T.unlock();T.draw();
    switch(T.state()){
      case 'click':T.advance();break;
      case 'time':T.tick(6);break;
      case 'qte':T.advance();T.tick(1);break; // clicking does nothing; the window simply closes
      case 'hold':T.advance();holds++;break;
      case 'view':{
        const outside=T.G.out;
        T.advance();assert.equal(T.G.out,outside,'cutaway must finish its minimum animation');
        T.tick(6);assert.equal(T.state(),'view','cutaway must wait for the reader');
        T.advance();views++;break;
      }
      case 'stretch':{
        const value=1.8+(route/3)*2;
        fire(element('opts'),'input',{target:{id:'stretch',value:String(value)}});
        assert.equal(T.G.morko.sT,value);
        T.tick(2);T.draw();T.advance();stretches++;break;
      }
      case 'choice':{
        const opts=T.options();
        let index=0;
        if(opts[0].t.startsWith('“Oh”'))index=fear;
        else if(opts[0].preview)index=route;
        else if(T.G.w){
          const target=walk===0?'Mention what':walk===1?'Review the':walk===2?'Bring up':'We can walk';
          index=opts.findIndex(x=>x.t.startsWith(target));
          if(index<0)index=opts.findIndex(x=>x.t.startsWith('We can walk'));
          if(walk===4)index=0; // Discuss every remaining topic, then deliberately head home.
        }else index=route%opts.length;
        assert.ok(index>=0);T.choose(index);break;
      }
      default:throw new Error('Story stalled: '+T.state());
    }
  }
  assert.ok(T.G.ended,`No ending: ${day}/${route}/${fear}/${walk}`);
  assert.equal(T.G.leak,routes[route]);
  assert.equal(T.G.fear,fear+1);
  assert.ok(T.history().length>20);
  // Every path misses the window and nobody goes to lunch. The walk home is where the human can still send one message.
  assert.equal(T.G.qteWon,false);
  if(day!=='C')assert.equal(T.G.lunch,(walk===0||walk===4)?2:0);
  const transcript=T.history().map(x=>x.text).join('\n');
  assert.match(transcript,/We missed the window/);assert.doesNotMatch(transcript,/Nobody has ever done it/);
  if(walk===4){
    assert.match(transcript,/Exhibit A/);
    assert.match(transcript,/Director’s cut/);assert.match(transcript,/shorter than I remember/);assert.equal(T.G.rep,null,'the replay must close');
    assert.match(transcript,/Eero took the lift/);
    assert.equal(T.G.reflected,true,'all three walk topics must remain reachable');
    assert.match(transcript,/Keep walking with me/);
  }
  // The name explains itself; the shadow can bite; the job description does NOT turn on Monday.
  assert.doesNotMatch(transcript,/named after/,'the name is not explained');
  assert.equal(T.G.dayEnd,true);assert.equal(T.G.jobDone,false);
  if(route===3){assert.equal(T.G.bit,true);assert.match(transcript,/Did we just bite Eero/);if(walk===4)assert.match(transcript,/I take the lift for a reason/);}
  else{assert.equal(T.G.bit,false);assert.doesNotMatch(transcript,/bite Eero/);}
  assert.match(element('ov').innerHTML,/Carry on/);
  assert.equal(T.G.human.sweatT,0,'no sweating on the walk home');assert.ok(!T.G.cards.some(c=>c.life==null),'the archive closes');assert.match(transcript,/opens the archive/);
  if(day==='C'&&route===2&&(walk===0||walk===4)){
    assert.match(transcript,/I don’t know what happened after that/);
    assert.doesNotMatch(transcript,/They said: no need to ask the others/);
  }
  assert.match(transcript,route<2?/That’s my SMALL warning/:route===2?/I’m ENORMOUS/:/load-bearing concern/);
  if(day==='C'){assert.equal(T.G.lunch,0);assert.equal(T.G.real,1);}
  assert.match(element('ov').innerHTML,/Try another approach/);
  assert.doesNotMatch(element('ov').innerHTML,/For the designer|Rejections prevented:/);
  runs++;
}
// The whole week: Monday through Friday on every kind of Monday, with rotating choices.
function playOn(pick){
  let step=0;
  while(!(T.G.ended&&!T.G.dayEnd)&&step++<9000){
    T.unlock();T.draw();
    switch(T.state()){
      case 'click':T.advance();break;
      case 'time':T.tick(6);break;
      case 'view':T.advance();T.tick(6);T.advance();break;
      case 'stretch':T.advance();break;
      case 'hold':T.advance();break;
      case 'fight':if(T.G.fight.paced){T.swat();T.tick(0.6);}else T.tick(0.25);break;
      case 'qte':T.tick(1);break; // the story now runs through the short moments too
      case 'choice':{
        const opts=T.options(),live=opts.map((o,i)=>o.off?-1:i).filter(i=>i>=0);
        const off=opts.findIndex(o=>o.off);
        if(off>=0){const before=T.history().length;T.choose(off);assert.equal(T.state(),'choice','an unavailable option must not be choosable');assert.equal(T.history().length,before);}
        T.choose(live[pick(opts)%live.length]);break;
      }
      case null:
        if(T.G.dayEnd){fire(element('ov'),'click',{target:{getAttribute(k){return k==='data-go'?'next':null}}});break;}
        throw new Error('Week stalled');
      default:throw new Error('Week stalled: '+T.state());
    }
  }
  assert.ok(T.G.ended&&!T.G.dayEnd,'week must reach Friday’s end');
}
let weeks=0;
for(const day of ['A','B','C'])for(let v=0;v<4;v++){
  T.start(day,false);let n=0;
  playOn(()=>v+(n++));
  const tr=T.history().map(x=>x.text).join('\n');
  assert.equal(T.G.chapter,5);assert.equal(T.G.jobDone,true);
  assert.equal(T.G.human.grin,0,'the grin wears off by the evening');
  for(const must of [/Quick chat tomorrow at 9/,/smoke alarm/,/rejection exchange programme/,/Seen 17:31/,/paper cut from an amputation/,/reviewing my job description/,/Her phone died/,/She HAS one/,/That’s MY name/,/Under the other pile/,/The puddle is MY department/,/I intend to go off again on Monday/])assert.match(tr,must);
  assert.ok(T.G.yes>=3,'Wednesday cannot be refused');
  // The short moments are part of the story now, in order, each behind its own card and never labelled as lab scenes.
  for(const must of [/The eyebrow was HUNGER/,/falls off a printer/,/I rounded up/,/Nothing in it can be rejected/,/I always thought that was the bad outcome/,/busy near each other/,/I’m keeping the headband/])assert.match(tr,must);
  assert.ok(tr.indexOf('The eyebrow was HUNGER')<tr.indexOf('rejection exchange programme'),'the eyebrow comes before the favours');
  assert.ok(tr.indexOf('Seen 17:31')<tr.indexOf('Nothing in it can be rejected'),'the reply comes after board game night');
  assert.equal(T.G.moment,'comments');assert.equal(T.G.lab,null);
  assert.ok(['sorry','explain','quiet','ask'].includes(T.G.fb));assert.ok(['worries','cancel','freezer','bite'].includes(T.G.txt));
  if(T.G.txt==='cancel')assert.match(tr,/Ignore that\. I panicked/);
  if(day==='C')assert.match(tr,/That was lazy of us/);else assert.doesNotMatch(tr,/That was lazy of us/);
  if(day==='C'&&T.G.leak==='exit'){
    assert.match(tr,/I left before lunch on Monday/);
    assert.doesNotMatch(tr,/Monday stung, though/,'the human cannot quote an unheard conversation');
  }
  assert.equal(tr.includes('An unsolicited gesture of employability.'),T.G.handout);
  assert.equal(tr.includes('The board games might need somewhere to unwind.'),T.G.afterparty);
  assert.equal(tr.includes('By the way, thanks for the handout.'),T.G.handout);
  assert.match(element('ov').innerHTML,/Still here\. Both of you/);
  weeks++;
}
// Chapter select starts mid-week and still reaches the end; Friday can be started with the new job in place.
for(const ch of [2,3,4,5]){T.chapter(ch);assert.equal(T.G.jobDone,ch>4);let n=0;playOn(()=>n++);assert.equal(T.G.chapter,5);}
// Checkpoints remember each chapter's history, independently of replay order and unlocks.
const saveKey='ekskyysmi.save';
const checkpointFixture={version:2,ch:5,unlocked:5,chapters:{
  1:{day:'A'},
  3:{day:'A',lunch:1,leak:'cover',fear:2,fb:'ask',yes:0},
  4:{day:'B',lunch:2,leak:'grow',yes:5,handout:true,afterparty:true,fb:'explain'},
  5:{day:'C',real:1,leak:'exit',fear:3,yes:5,handout:true,afterparty:true,txt:'cancel',fb:'explain',lunch:0,bit:false,peeked:false,reflected:false}
}};
savedItems.set(saveKey,JSON.stringify(checkpointFixture));
T.chapter(3);
assert.equal(T.G.day,'A');assert.equal(T.G.fb,'ask');assert.equal(T.G.handout,false);
let saved=JSON.parse(savedItems.get(saveKey));
assert.equal(saved.ch,3,'continue follows the chapter actually selected');assert.equal(saved.unlocked,5);
assert.deepEqual(saved.chapters[5],checkpointFixture.chapters[5],'replaying an earlier chapter must preserve later histories');
T.title();assert.match(element('ov').innerHTML,/Continue · Could you just…/);assert.match(element('ov').innerHTML,/data-go="chapters"/);assert.doesNotMatch(element('ov').innerHTML,/data-ch=/,'the title screen stays small');
T.chapters();assert.match(element('ov').innerHTML,/data-ch="5"/);assert.match(element('ov').innerHTML,/Oh, hi\. Again\./);assert.match(element('ov').innerHTML,/Not necessarily that one/i);T.about();assert.match(element('ov').innerHTML,/You play Ekskyysmi/);T.title();
T.chapter(4);assert.equal(T.G.day,'B');assert.equal(T.G.yes,5);assert.equal(T.G.afterparty,true);
T.chapter(5);assert.equal(T.G.leak,'exit');assert.equal(T.G.real,1);assert.equal(T.G.txt,'cancel');assert.equal(T.G.handout,true);
const fridayStart=savedItems.get(saveKey);playOn(()=>1);
assert.equal(savedItems.get(saveKey),fridayStart,'finishing Friday must not overwrite its starting checkpoint with end-of-day choices');
assert.doesNotMatch(T.history().map(x=>x.text).join('\n'),/Monday stung, though/);
T.start('A',false);saved=JSON.parse(savedItems.get(saveKey));assert.equal(saved.ch,1);assert.equal(saved.unlocked,5);
T.chapter(5);assert.equal(T.G.day,'C','a new Monday must not rewrite a previous Friday');
T.chapter(1);assert.equal(T.G.day,'A','replaying Monday keeps the saved kind of Monday');
// Legacy saves migrate when next written; bad or unavailable storage never blocks play.
savedItems.set(saveKey,JSON.stringify({ch:4,day:'C',real:1,lunch:0,leak:'exit',fear:3}));
T.chapter(4);assert.equal(T.G.day,'C');assert.equal(T.G.real,1);
saved=JSON.parse(savedItems.get(saveKey));assert.equal(saved.version,2);assert.equal(saved.unlocked,4);
for(const corrupt of ['{','null','[]','{"ch":99}','{"ch":"Friday"}','{"version":2,"ch":4,"chapters":{}}']){
  savedItems.set(saveKey,corrupt);T.reset();T.title();assert.doesNotMatch(element('ov').innerHTML,/data-go="cont"/);
}
const storage=window.localStorage;window.localStorage={getItem(){throw Error('Unavailable')},setItem(){throw Error('Unavailable')}};
T.start();T.title();assert.match(element('ov').innerHTML,/New game/);window.localStorage=storage;
savedItems.delete(saveKey);
// Hands-on moments: holding covers the human's eyes; letting go while Sanna waves lets the human see it.
function toHold(day){T.start(day,true);let st=0;while(T.state()!=='hold'&&st++<200){T.unlock();const s=T.state();if(s==='click')T.advance();else if(s==='time'||s==='qte')T.tick(6);else if(s==='stretch')T.advance();else if(s==='choice'){const o=T.options();T.choose(o[0].preview?1:0);}}assert.equal(T.state(),'hold');assert.equal(T.G.hold.kind,'cover');}
toHold('B');T.holdDown();T.tick(0.5);T.tick(0.5);T.tick(0.3);assert.equal(T.G.aWave,true,'Sanna waves while the eyes are covered');
T.holdUp();T.tick(0.35);T.tick(0.35);assert.equal(T.G.peeked,true);assert.equal(T.G.leak,'none');assert.match(T.G.cur.text,/She’s waving/);
toHold('B');T.holdDown();for(let i=0;i<8;i++)T.tick(0.5);assert.equal(T.G.peeked,false);assert.equal(T.G.leak,'cover');assert.notEqual(T.state(),'hold');
toHold('C');T.holdDown();T.tick(0.5);T.tick(0.5);T.tick(0.3);assert.equal(T.G.aWave,false,'nobody waves on the dismissive day');T.holdUp();T.tick(0.5);T.tick(0.5);assert.equal(T.G.peeked,false);
assert.ok(holds>0);
// Scenario lab: each scene plays to its own end; the boss fight reacts to how the player swats.
function playLab(id,mode){
  T.lab(id);let st=0;
  while(!T.G.labEnd&&st++<6000){
    T.unlock();T.draw();
    switch(T.state()){
      case 'click':T.advance();break;
      case 'time':T.tick(6);break;
      case 'view':T.advance();T.tick(6);T.advance();break;
      case 'choice':T.choose(mode&&mode.indexOf('paced')===0&&T.options().some(o=>o.t.startsWith('One at a time.'))?1:0);break;
      case 'fight':
        if(mode&&mode.indexOf('paced')===0){
          const m=T.G.fight.msgs.find(x=>!x.done);
          if(m&&(m.state==='fly'||m.state==='open')){
            const state=m.state,position=m.x;T.tick(30);
            assert.equal(m.state,state,'paced replies must wait for the reader');assert.equal(m.x,position);
            const before=T.G.fight.t;T.pause();T.frame(900000+st*1000);assert.equal(T.G.fight.t,before,'pause freezes the fight');T.pause();
            const action=mode==='paced-all'||(m.state==='open'&&(mode==='paced-read-swat'||(mode==='paced-note'&&m.kind==='note')))?'go':'read';
            fire(element('opts'),'click',{detail:1,target:{getAttribute(k){return k==='data-i'?action:null}}});
          }else T.tick(0.2);
        }
        else if(mode==='all'){T.swat();T.tick(0.1);T.tick(0.1);T.tick(0.1);}
        else if(mode==='read'){const m=T.G.fight.msgs.find(x=>x.state==='open'&&x.t>0.3);if(m)T.swat();T.tick(0.1);}
        else T.tick(0.2);
        break;
      default:throw new Error('Lab stalled: '+T.state());
    }
  }
  assert.ok(T.G.labEnd,'lab scene must end');assert.match(element('ov').innerHTML,/Play it again/);
  return T.history().map(x=>x.text).join('\n');
}
let tr=playLab('enhance');
assert.match(tr,/ENHANCE/);assert.match(tr,/The eyebrow was HUNGER/);assert.match(tr,/WING for eyebrows/);assert.equal(T.G.zoom,null);
tr=playLab('sometime');
assert.match(tr,/grab a coffee sometime/);assert.match(tr,/hadn’t been picked yet/);assert.equal(T.G.someT,'form');
tr=playLab('evening');
assert.match(tr,/plate procedure/);assert.match(tr,/She knows I count/);assert.match(tr,/page 212/);assert.match(tr,/WHY would you correct/);assert.equal(T.G.dish,null);
tr=playLab('glass');
assert.match(tr,/I’ll need the glass/);assert.match(tr,/Exhibit A/);assert.match(tr,/falls off a printer/);assert.match(tr,/You look smaller/);assert.equal(T.G.lens,null);
assert.doesNotMatch(T.history().map(x=>x.who+x.text).join(' '),/YOUR HUMAN/);
tr=playLab('bar');
assert.match(tr,/coat stand with opinions/);assert.match(tr,/GINGER BEER\./);assert.match(tr,/the shadow of one/);assert.match(tr,/I always thought that was the bad outcome/);assert.match(tr,/To being furniture/);
assert.equal(T.G.bar.sdrink,true);assert.equal(T.G.bar.glass,true);
T.chapter(2);assert.equal(T.G.bar,null,'the bar does not follow you to work');
tr=playLab('voice');
assert.match(tr,/Are you her bank/);assert.match(tr,/take fourteen/);assert.match(tr,/oh, nice\. It’s Sanna/);assert.match(tr,/One for safety/);assert.equal(T.G.rec,null);
tr=playLab('reply');
assert.match(tr,/A few small edits\. For safety\./);assert.match(tr,/“Hey! I had a on Thursday\. :\)”/,'three first-option cuts leave a message with nothing in it');
assert.match(tr,/She decoded it/);assert.equal(T.G.replySent,'edited');assert.equal(T.G.draft,null);
tr=playLab('library');
assert.match(tr,/That’ll be a fine/);assert.match(tr,/THAT kind of fine/);assert.match(tr,/Bengtskär/);assert.match(tr,/Day one/);assert.equal(T.G.lib.book,true);
T.chapter(2);assert.equal(T.G.lib,null);assert.equal(T.G.draft,null);
tr=playLab('colleagues');
assert.match(tr,/oh\. hi\./);assert.match(tr,/Since I started watching you do it/);assert.match(tr,/busy near each other/);assert.equal(T.G.zT,0);
tr=playLab('notnow');
assert.match(tr,/That one was real/);assert.match(tr,/I rounded up/);assert.match(tr,/A bit stung\. And fine\./);
// The quiet opening: an ordinary shadow until the human has a plan. It can be skipped.
T.start();assert.equal(T.G.morko.asleep,true);assert.equal(T.G.human.gone,true);assert.equal(T.G.skippable,true);
T.tick(3);T.tick(5);assert.equal(T.G.human.gone,false,'the human walks in');
T.skipIntro();assert.equal(T.state(),'click');assert.equal(T.G.skippable,false);assert.equal(T.G.human.x,450);assert.equal(T.G.morko.asleep,true);
assert.match(T.history().map(x=>x.text).join(' '),/ask Sanna to lunch/);
T.unlock();T.advance();T.tick(2);T.tick(2);T.tick(2);assert.equal(T.G.morko.asleep,false,'the plan wakes the shadow');
assert.match(T.history().map(x=>x.text).join(' '),/WHAT are we doing today/);
tr=playLab('comments','none');
assert.equal(T.G.fightRes.deflected,0);assert.equal(T.G.fightRes.noteDelivered,true);
assert.match(tr,/didn’t swat anything/);assert.match(tr,/stung for about a second/);assert.match(tr,/Mostly… cats/);assert.doesNotMatch(tr,/EXACTLY like a dagger/);
tr=playLab('comments','all');
assert.ok(T.G.fightRes.deflected>=6,'swatting everything deflects most replies');assert.match(tr,/EXACTLY like a dagger/);assert.equal(T.G.boss.friendly,true);
tr=playLab('comments','read');
assert.ok(T.G.fightRes.readThenSwatted>0);assert.match(tr,/You read that one first/);
for(const mode of ['paced-none','paced-all','paced-read-swat','paced-note']){
  tr=playLab('comments',mode);
  assert.equal(T.G.fightLog.length,8);assert.equal(T.G.fightRes.deflected+T.G.fightRes.delivered+(T.G.fightRes.noteDelivered?1:0),8);
  assert.equal(T.history().filter(x=>x.who==='P'&&/ — (read, then swatted|swatted before reading|reached your human)$/.test(x.text)).length,8,'all replies remain in dialogue history');
  if(mode==='paced-none')assert.equal(T.G.fightRes.deflected,0);
  if(mode==='paced-all')assert.equal(T.G.fightRes.deflected,8);
  if(mode==='paced-read-swat')assert.equal(T.G.fightRes.readThenSwatted,7);
  if(mode==='paced-note'){
    assert.equal(T.G.fightRes.deflected,1);assert.equal(T.G.fightRes.deflectedGood,0);
    assert.doesNotMatch(tr,/You also swatted the nice ones/);assert.doesNotMatch(tr,/I let them all come close/);
  }
}
// Android back button: playing -> pause, paused -> title, title -> leave the app.
T.title();assert.equal(T.back(),'exit');
T.start();assert.equal(T.back(),'pause');assert.equal(T.back(),'title');assert.equal(T.G.started,false);
T.lab('enhance');assert.equal(T.back(),'pause');assert.equal(T.back(),'title');
// Recorded sound is optional: nothing is listed yet, and asking for an unknown effect is harmless.
assert.equal(Object.keys(T.sound.list).length,0);T.sound.play('hit');assert.equal(T.sound.has('hit'),false);
// The correct response: a window under a second long, right after "oh, hi.".
function toWindow(day){T.start(day,true);let n=0;while(T.state()!=='qte'&&n++<200){T.unlock();if(T.state()==='click')T.advance();else T.tick(1);}assert.equal(T.state(),'qte','Monday reaches the window');}
// 1. Doing nothing: too late, and the spiral begins.
toWindow('A');T.advance();assert.equal(T.state(),'qte','clicking does not skip the window');
T.tick(0.5);assert.equal(T.G.qte.end,null,'still open at half a second');T.tick(0.4);assert.equal(T.G.qte.end,'late');
T.tick(1.3);assert.notEqual(T.state(),'qte');assert.equal(T.G.qteWon,false);
// 2. The wrong key, or Enter out of habit: incorrect.
toWindow('B');T.qteKey('ArrowDown');assert.equal(T.G.qte.end,'wrong');
toWindow('B');T.qteKey('Enter');assert.equal(T.G.qte.end,'wrong','Enter is not part of the procedure');
// 3. The procedure, in order, in time: the secret branch. Lunch happens, and nobody panics.
toWindow('C');for(const k of ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ']){T.tick(0.1);T.qteKey(k);}
assert.equal(T.G.qte.end,'won');T.tick(1.3);assert.equal(T.G.qteWon,true);
{let n=0;while(!T.G.ended&&n++<400){T.unlock();T.draw();const st=T.state();
  if(st==='click')T.advance();else if(st==='time')T.tick(6);else if(st==='view'){T.advance();T.tick(6);T.advance();}
  else if(st==='choice'){const o=T.options();const i=o.findIndex(x=>x.t.startsWith('Mention what'));T.choose(i>=0?i:o.findIndex(x=>x.t.startsWith('We can walk')));}
  else throw new Error('secret branch stalled: '+st);}}
{const tr=T.history().map(x=>x.text).join('\n');
 assert.match(tr,/Nobody has ever done it/);assert.match(tr,/Those are the same thing and I resent it/);assert.doesNotMatch(tr,/Nobody panic/);
 assert.equal(T.G.lunch,1);assert.equal(T.G.real,0,'even on the dismissive Monday, answering in time means lunch');
 assert.match(element('ov').innerHTML,/complaint about the speed/);}
// 4. Friday: the same window opens, and one word answers all of it.
T.chapter(5);{let n=0;while(n++<120){T.unlock();const st=T.state();if(T.G.qte&&T.G.qte.auto)break;if(st==='click')T.advance();else T.tick(1);}}
assert.ok(T.G.qte&&T.G.qte.auto,'Friday opens the window again');T.tick(0.3);T.tick(0.3);T.tick(0.3);T.tick(0.3);
assert.equal(T.G.qte.end,'won');assert.equal(T.G.qte.i,5);
// Full screen and the immersive layout: one class on <html>, driven by the media query and by the fullscreen state.
assert.equal(T.immersive(),false);
assert.equal(element('full').textContent,'Full screen');
document.fullscreenElement=element('html');fire(document,'fullscreenchange',{});
assert.equal(T.immersive(),true,'full screen uses the immersive layout');
assert.equal(element('full').textContent,'Leave full screen');
document.fullscreenElement=null;fire(document,'fullscreenchange',{});
assert.equal(T.immersive(),false,'leaving full screen restores the wide layout');
assert.equal(element('full').textContent,'Full screen');
window.__narrow=true;fire(document,'fullscreenchange',{});
assert.equal(T.immersive(),true,'a phone held sideways uses the same layout without full screen');
window.__narrow=false;fire(document,'fullscreenchange',{});
assert.equal(T.immersive(),false);
// Sound toggle works without an audio device, and the scene bubble types out the whole line, never a placeholder.
fire(element('sound'),'click',{});assert.equal(element('sound').textContent,'Sound off');
fire(element('sound'),'click',{});assert.equal(element('sound').textContent,'Sound on');
assert.doesNotMatch(fs.readFileSync(path.join(root,'assets/game.js'),'utf8'),/length>65\?'…'/);
// Pause, modal lifecycle, keyboard focus, reset and repeated choices.
const pastWake=()=>{T.skipIntro();T.unlock();T.advance();T.tick(2);T.tick(2);T.tick(2);T.unlock();};
T.start('B',false);pastWake();
T.pause();const before=T.G.time;T.frame(1000);assert.equal(T.G.time,before);T.pause();
const firstLine=T.G.cur.text;
fire(window,'keydown',{key:'Enter',target:{tagName:'BUTTON'},preventDefault(){throw Error('Native button event was intercepted')}});
assert.equal(T.G.cur.text,firstLine);
// An explicit button responds even during the shortcut debounce window.
const goTarget={getAttribute(k){return k==='data-i'?'go':null}};
fire(element('opts'),'click',{target:goTarget,detail:1});
assert.notEqual(T.G.cur.text,firstLine);
const secondLine=T.G.cur.text;
fire(element('opts'),'click',{target:goTarget,detail:2});
assert.equal(T.G.cur.text,secondLine,'double-click must not skip the next line');
fire(element('journal'),'click',{});assert.equal(element('dialogue-log').open,true);
fire(element('close-log'),'click',{});assert.equal(element('dialogue-log').open,false);
T.pause();fire(element('journal'),'click',{});fire(element('close-log'),'click',{});
const stillPaused=T.G.time;T.frame(2000);assert.equal(T.G.time,stillPaused);
T.start('A',true);assert.equal(element('pause').textContent,'Pause');
T.reset();T.title();assert.match(element('ov').innerHTML,/Really Small Deal/);assert.doesNotMatch(element('ov').innerHTML,/<p>/,'no paragraphs of explanation on the title screen');
assert.ok(element('play-panel').classList.contains('hidden'));
T.start('A',false);pastWake();
const throttledLine=T.G.cur.text;
T.tick(0.05,0.5);T.advance();
assert.notEqual(T.G.cur.text,throttledLine,'shortcut delay must not depend on animation frame rate');
// Direct file entry must resolve all resources locally, including font licenses.
for(const file of ['assets/game.css','assets/game.js','assets/icon.svg','assets/fonts/Fraunces.ttf','assets/fonts/DMSans.ttf','assets/fonts/Fraunces-OFL.txt','assets/fonts/DMSans-OFL.txt'])assert.ok(fs.statSync(path.join(root,file)).size>0,file);
console.log(`PASS: the correct response (4 ways); 11 lab scenes (13 runs, including four paced chat strategies), quiet opening; ${weeks} full weeks and 4 chapter starts; ${runs} complete Monday paths, ${views} reader-paced cutaways, ${stretches} size interactions; pause, journal, keyboard, reset and local assets.`);

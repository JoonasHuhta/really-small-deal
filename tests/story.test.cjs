// Runs the real story engine with a small DOM/canvas stand-in. No browser package required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
assert.ok(require('../tools/build.cjs').fresh(),'assets/game.js is out of date: run node tools/build.cjs');
const {T,window,document,element,fire,savedItems,nativeListeners,nativeState,ctx}=require('./harness.cjs')();
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
      case 'toss':T.advance();T.tick(0.4);break;
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
  assert.match(element('ov').innerHTML,/DAYS LIVED TODAY/);assert.match(element('ov').innerHTML,/A DAY, AWAKE/);
  {const d=T.inside.run().at(-1);assert.equal(d.label,'A MONDAY');assert.ok(d.ratio>1.6&&d.ratio<2.8,'a missed Monday is lived about twice: '+d.ratio);
   assert.match(T.inside.receipt(),/DAYS LIVED TODAY/);assert.match(T.inside.receipt(),/“oh, hi\.”\s+0\.4 s/);}
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
      case 'toss':T.advance();T.tick(0.4);break;
      case 'auto':T.tick(3);break;
      case 'lamp':T.advance();break;
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
  for(const must of [/Quick chat tomorrow at 9/,/smoke alarm/,/rejection exchange programme/,/Seen 17:31/,/paper cut from an amputation/,/reviewing my job description/,/Her phone died/,/I checked\. Tuesday works/,/I moved a worry/,/Under the other pile/,/The puddle is MY department/,/I intend to go off again on Monday/])assert.match(tr,must);
  assert.doesNotMatch(tr,/She HAS one|That’s MY name/,'the shadows already met before Friday');
  assert.doesNotMatch(tr,/I’ve filed the blank/,'a missed Monday does not get the secret lunch callback');
  assert.equal(T.G.metSannaShadow,true);assert.equal(T.G.morko.wobble,null);
  assert.ok(T.G.yes>=3,'Wednesday cannot be refused');
  // Two clocks: five days on the calendar, more than that lived, and Friday costs less than Monday.
  {const days=T.inside.run().filter(d=>d.label!=='SCENARIO LAB');assert.equal(days.length,5,days.map(d=>d.label).join());
   assert.ok(days[0].ratio>days[4].ratio,'Friday is lighter than Monday');assert.ok(days.every(d=>d.ratio>=1));
   assert.match(element('ov').innerHTML,/DAYS ON THE CALENDAR/);assert.match(T.inside.receipt(),/DAYS ON THE CALENDAR\s+5/);
   assert.match(days[4].ledger[0].label,/1\.4 times/);}
  // The short moments are part of the story now, in order, each behind its own card and never labelled as lab scenes.
  for(const must of [/You showed someone a drawing/,/Last time you showed someone a drawing/,/This time I left it up/,/The eyebrow was HUNGER/,/falls off a printer/,/I rounded up/,/Bengtskär/,/she said hi first/,/It’s the one people could take away/,/A crack\. Leave it open a crack/,/I always thought that was the bad outcome/,/busy near each other/,/I’m keeping the headband/])assert.match(tr,must);
  assert.ok(tr.indexOf('The eyebrow was HUNGER')<tr.indexOf('rejection exchange programme'),'the eyebrow comes before the favours');
  assert.ok(tr.indexOf('Seen 17:31')<tr.indexOf('Bengtskär'),'the library comes after board game night');
  assert.ok(tr.indexOf('…I’ll update the file')<tr.indexOf('It’s the one people could take away'),'the other drawer opens after the oldest file is updated');
  assert.ok(T.G.kept.includes('hi')&&T.G.kept.includes('compliments')&&T.G.kept.includes('eero')&&T.G.kept.includes('library'),'the week fills the other drawer');
  // Structure: the shadow that says "oh. hi." to Ekskyysmi comes before Thursday, so Thursday's line lands on something;
  // everything after Thursday is the new job being tried out, starting with a relapse that knows it is one.
  assert.ok(tr.indexOf('busy near each other')<tr.indexOf('Seen 17:31'),'Colleagues. comes before board game night');
  assert.ok(tr.indexOf('busy near each other')<tr.indexOf('She knows I count')&&tr.indexOf('She knows I count')<tr.indexOf('Seen 17:31'),'the quiet evening is the calm before Thursday');
  assert.equal(T.G.kitchen,false,'the kitchen does not follow the story around');
  // What the human wants stays open until the last scene: a lunch arranged on Monday moves to Friday.
  if(T.G.lunch===2){assert.match(tr,/Dentist!! Sorry!! Friday\?/);assert.match(tr,/It’s Friday\. No dentist\./);}else assert.doesNotMatch(tr,/No dentist/);
  assert.ok(tr.indexOf('That one landed')<tr.lastIndexOf('With a full stop.')&&tr.lastIndexOf('With a full stop.')<tr.indexOf('You showed someone a drawing'),'Thursday’s hit remembers the full stop');
  assert.ok(tr.indexOf('Same hours. Fewer exits')<tr.indexOf('I’m working out my notice'),'the relapse comes after the new job');
  assert.ok(tr.indexOf('I’m working out my notice')<tr.indexOf('This is the staying part')&&tr.indexOf('This is the staying part')<tr.indexOf('I always thought that was the bad outcome'));
  assert.ok(tr.indexOf('You look smaller')>tr.indexOf('rejection exchange programme')&&tr.indexOf('You look smaller')<tr.indexOf('Her shadow greeted me'),'the glass turns inward after Wednesday and before the shadows meet; pace is reported separately');
  assert.equal(T.G.moment,'radiator','the week ends on the next Tuesday, after the final image');assert.equal(T.G.lab,null);
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
  assert.equal(JSON.parse(savedItems.get('ekskyysmi.save')).done,true,'the ending is remembered for the Moments menu');
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
  5:{day:'C',real:1,leak:'exit',fear:3,yes:5,handout:true,afterparty:true,txt:'cancel',fb:'explain',lunch:0,bit:false,peeked:false,reflected:false,metSannaShadow:true,posting:'open',nothings:2,rehearsal:true,barStory:'arms',quietDrawing:true,coatNo:true,kept:['hi','eero']}
}};
savedItems.set(saveKey,JSON.stringify(checkpointFixture));
T.chapter(3);
assert.equal(T.G.day,'A');assert.equal(T.G.fb,'ask');assert.equal(T.G.handout,false);
let saved=JSON.parse(savedItems.get(saveKey));
assert.equal(saved.ch,3,'continue follows the chapter actually selected');assert.equal(saved.unlocked,5);
assert.deepEqual(saved.chapters[5],checkpointFixture.chapters[5],'replaying an earlier chapter must preserve later histories');
T.title();assert.match(element('ov').innerHTML,/Continue · Could you just…/);assert.match(element('ov').innerHTML,/data-go="chapters"/);assert.doesNotMatch(element('ov').innerHTML,/data-ch=/,'the title screen stays small');
T.chapters();assert.match(element('ov').innerHTML,/data-ch="5"/);assert.match(element('ov').innerHTML,/Oh, hi\. Again\./);assert.match(element('ov').innerHTML,/Not necessarily that one/i);T.about();assert.match(element('ov').innerHTML,/You play Ekskyysmi/);T.title();
// Moments menu: extras by situation after Monday, story moments once seen, the last day's only after the ending. The full lab is ?lab only.
{const keep=savedItems.get(saveKey);
 T.title();assert.match(element('ov').innerHTML,/data-go="moments"/);assert.doesNotMatch(element('ov').innerHTML,/data-go="lab"/);
 T.moments();let h=element('ov').innerHTML;assert.match(h,/data-lab="sometime"/);assert.match(h,/data-lab="glass"/);assert.match(h,/data-lab="library"/);
 assert.doesNotMatch(h,/data-lab="radiator"|data-lab="comments"/,'the ending stays hidden until it has been played');
 const done=JSON.parse(keep);done.done=true;savedItems.set(saveKey,JSON.stringify(done));T.moments();assert.match(element('ov').innerHTML,/data-lab="radiator"/);
 savedItems.set(saveKey,JSON.stringify({version:2,ch:1,unlocked:1,chapters:{1:{}}}));T.moments();assert.match(element('ov').innerHTML,/Not yet\./);
 savedItems.set(saveKey,keep);}
T.chapter(4);assert.equal(T.G.day,'B');assert.equal(T.G.yes,5);assert.equal(T.G.afterparty,true);
T.chapter(5);assert.equal(T.G.leak,'exit');assert.equal(T.G.real,1);assert.equal(T.G.txt,'cancel');assert.equal(T.G.handout,true);
assert.equal(T.G.metSannaShadow,true,'Friday restores the earlier meeting');assert.equal(T.G.posting,'open');assert.equal(T.G.nothings,2);
{T.history().length=0;playOn(()=>0);const ft=T.history().map(x=>x.text).join('\n');
 assert.match(ft,/It’s something\. Small\. Give me a minute\./);assert.match(ft,/We’ve said it twice this week/);assert.match(ft,/You can draft\. I’ll send\./);
 const rc=T.inside.receipt();assert.match(rc,/applications\s+pending/);assert.match(rc,/“it’s nothing”, said\s+×2/);assert.match(rc,/“not now”, actual\s+4 s/);}
const fridayStart=savedItems.get(saveKey);playOn(()=>1);
assert.equal(savedItems.get(saveKey),fridayStart,'finishing Friday must not overwrite its starting checkpoint with end-of-day choices');
assert.doesNotMatch(T.history().map(x=>x.text).join('\n'),/Monday stung, though/);
assert.match(T.history().map(x=>x.text).join('\n'),/I checked\. Tuesday works/);
T.start('A',false);saved=JSON.parse(savedItems.get(saveKey));assert.equal(saved.ch,1);assert.equal(saved.unlocked,5);
T.chapter(5);assert.equal(T.G.day,'C','a new Monday must not rewrite a previous Friday');
T.chapter(1);assert.equal(T.G.day,'A','replaying Monday keeps the saved kind of Monday');
// Two settings a reader may need: bigger text, and a response window that is survivable.
{const t=element('textsize'),w=element('slow'),html=document.documentElement;
 assert.equal(t.textContent,'Text: normal');assert.ok(html.style.props['--ts']>1,'the default is one step up from the smallest');
 fire(t,'click',{});assert.equal(t.textContent,'Text: large');assert.ok(html.style.props['--ts']>1.2);
 assert.equal(savedItems.get('ekskyysmi.text'),'2');
 fire(t,'click',{});fire(t,'click',{});assert.equal(t.textContent,'Text: normal','the size cycles back round');
 const plain=(()=>{T.start('B',true);let n=0;while(T.state()!=='qte'&&n++<2000){T.unlock();if(T.state()==='click')T.advance();else if(T.state()==='choice')T.choose(0);else T.tick(0.2);}return T.G.qte.secs;})();
 fire(w,'click',{});assert.equal(w.textContent,'Slow reality: on');assert.equal(savedItems.get('ekskyysmi.slow'),'on');
 const slow=(()=>{T.start('B',true);let n=0;while(T.state()!=='qte'&&n++<2000){T.unlock();if(T.state()==='click')T.advance();else if(T.state()==='choice')T.choose(0);else T.tick(0.2);}return T.G.qte.secs;})();
 assert.ok(slow>plain*2.5&&slow>8,'slow reality is long enough to read the options: '+slow);
 // It is still the same joke: the window can be missed, and missing it is still the story.
 T.tick(slow+0.5);assert.equal(T.G.qteWon,false);assert.ok(T.G.qte.end!=null||T.state()!=='qte');
 fire(w,'click',{});assert.equal(w.textContent,'Slow reality');}

// Closing the tab in the middle of a chapter: Continue picks the story up at that moment, with its history.
function stepUntil(done){let n=0;while(!done()&&n++<6000){T.unlock();T.draw();const st=T.state();
  if(st==='click')T.advance();else if(st==='view'){T.advance();T.tick(6);T.advance();}else if(st==='stretch'||st==='hold')T.advance();
  else if(st==='toss'){T.advance();T.tick(.4);}
  else if(st==='choice')T.choose(T.options().findIndex(o=>!o.off));else T.tick(1);}assert.ok(done(),'reached');}
T.chapter(3);stepUntil(()=>T.G.moment==='colleagues'&&T.state()==='click');
{const yes=T.G.yes;assert.ok(yes>=3);saved=JSON.parse(savedItems.get(saveKey));
 assert.equal(saved.ch,3);assert.equal(saved.at.moment,'colleagues');assert.equal(saved.at.state.yes,yes);
 T.reset();T.title();assert.match(element('ov').innerHTML,/Continue · Colleagues\./);
 fire(element('ov'),'click',{target:{getAttribute(k){return k==='data-go'?'cont':null}}});
 assert.equal(T.G.chapter,3);assert.equal(T.G.yes,yes,'the week so far comes back');assert.equal(T.G.jobDone,false);
 stepUntil(()=>T.G.moment==='colleagues'&&T.state()==='click');
 playOn(()=>0);const rt=T.history().map(x=>x.text).join('\n');
 assert.doesNotMatch(rt,/rejection exchange programme|falls off a printer/,'nothing before the moment is replayed');
 assert.match(rt,/Her shadow greeted me/);assert.match(rt,/busy near each other/);assert.match(rt,/Seen 17:31/);assert.match(rt,/I’ll update the file/);
 // A resume point from a different chapter, or for a moment that no longer exists, is ignored rather than trusted.
 const raw=JSON.parse(savedItems.get(saveKey));raw.at.moment='deleted-scene';savedItems.set(saveKey,JSON.stringify(raw));
 T.reset();T.title();assert.match(element('ov').innerHTML,/Continue · For now|Continue · /);assert.doesNotMatch(element('ov').innerHTML,/undefined/);
 raw.at={ch:2,moment:'enhance',state:{}};savedItems.set(saveKey,JSON.stringify(raw));T.reset();T.title();assert.doesNotMatch(element('ov').innerHTML,/Continue · Enhance/);}
savedItems.set(saveKey,JSON.stringify(checkpointFixture));
// Legacy saves migrate when next written; bad or unavailable storage never blocks play.
savedItems.set(saveKey,JSON.stringify({ch:4,day:'C',real:1,lunch:0,leak:'exit',fear:3}));
T.chapter(4);assert.equal(T.G.day,'C');assert.equal(T.G.real,1);
saved=JSON.parse(savedItems.get(saveKey));assert.equal(saved.version,2);assert.equal(saved.unlocked,4);
assert.equal(T.G.metSannaShadow,false,'old saves do not invent a meeting');
T.chapter(5);playOn(()=>0);
assert.match(T.history().map(x=>x.text).join('\n'),/She HAS one/,'Friday still introduces the shadow when the earlier meeting is unknown');
assert.doesNotMatch(T.history().map(x=>x.text).join('\n'),/I checked\. Tuesday works/);
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
let seenAuto=0,seenChoice=0;
function playLab(id,mode){
  T.lab(id);let st=0;
  while(!T.G.labEnd&&st++<6000){
    T.unlock();T.draw();
    switch(T.state()){
      case 'click':T.advance();break;
      case 'time':T.tick(6);break;
      case 'toss':T.advance();T.tick(0.4);break;
      case 'auto':seenAuto++;T.tick(3);break;
      case 'lamp':T.advance();break;
      case 'view':T.advance();T.tick(6);T.advance();break;
      case 'choice':seenChoice++;T.choose(typeof mode==='number'?mode:(mode==='coat'&&T.options().some(o=>o.t==='Pretend to be a coat.'))||(mode&&mode.indexOf('paced')===0&&T.options().some(o=>o.t.startsWith('One at a time.')))?1:0);break;
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
      case 'hold':T.advance();break;
      default:throw new Error('Lab stalled: '+T.state());
    }
  }
  assert.ok(T.G.labEnd,'lab scene must end');assert.match(element('ov').innerHTML,/Play it again/);
  return T.history().map(x=>x.who+': '+x.text).join('\n');
}
// Rewind: memory edits itself. Both endings reach the original tape.
{
  let tr0=playLab('rewind',0);assert.match(tr0,/Memory is a living document/);assert.match(tr0,/The one with horns/);assert.equal(T.G.tape,null);
  tr0=playLab('rewind',1);assert.match(tr0,/The actual one/);assert.doesNotMatch(tr0,/She has horns/);assert.match(tr0,/I’m EVERYWHERE/);
}
// Night shift: the other shadows, in the dark, and a morning.
{
  const tn=playLab('night');
  assert.match(tn,/Z: It’s me\. Sanna’s/);assert.match(tn,/W: Heavy\./);assert.match(tn,/One arm is still under the bed/);assert.match(tn,/Different departments. Same hours/);
  assert.equal(T.G.night,null);assert.equal(T.G.human.gone,false,'the human gets up in the morning');
}
// ---- the second act (TOINEN_NAYTOS.md) ----
{
  let t2=playLab('nothing');
  assert.match(t2,/The sofa has an alibi/);assert.match(t2,/That’s the complaint/);assert.ok(T.G.sat,'Ekskyysmi sits down, for the first time');
  for(const pick of [0,1,2]){
    t2=playLab('form',pick);
    assert.match(t2,/You ticked yes/);assert.match(t2,/All in order/);assert.match(t2,/It’s a job description/);
  }
  seenAuto=0;seenChoice=0;t2=playLab('quiet');
  assert.equal(seenChoice,0,'nobody to ask: no choices in the quiet day');assert.equal(seenAuto,2,'two choices make themselves');
  const sLines=t2.split('\n').filter(l=>l.startsWith('S: '));
  assert.ok(sLines.length===3&&sLines.every(l=>l==='S: —'),'Ekskyysmi says nothing all day: '+sLines.join(' | '));
  assert.match(t2,/Where’s yours\?/);assert.match(t2,/Nobody objected/);assert.ok(T.G.morko.asleep,'still away when the quiet day ends');
  t2=playLab('evenings');
  assert.match(t2,/Am I allowed\?/);assert.match(t2,/I missed you/);assert.equal(T.G.morko.asleep,false,'the lamp brings it back');assert.equal(T.G.lampOff,false);
}
// The second act sits between Thursday's moments and Friday, in this order.
assert.match(require('fs').readFileSync(require('path').join(__dirname,'..','src','33-moments.js'),'utf8'),/4:\['notnow','bar','nothing','form','quiet','library','evenings','night'\]/);
// Nothing in the game names a condition, a drug or a profession. The player works it out, or does not.
{
  const fs2=require('fs'),path2=require('path'),dir=path2.join(__dirname,'..','src');
  const bad=/\b(adhd|autis\w*|medicat\w*|pills?|diagnos\w*|doctors?|therap\w*|prescri\w*|hospital\w*)\b/i;
  for(const f of fs2.readdirSync(dir)){
    const src=fs2.readFileSync(path2.join(dir,f),'utf8'),re=/\[\s*'[SHABRPNZYWTXL]'\s*,\s*'((?:[^'\\]|\\.)*)'|(?:cap|title|dur|t|blurb|tag|text)\s*:\s*'((?:[^'\\]|\\.)*)'/g;let m;
    while((m=re.exec(src))){const line=m[1]||m[2]||'';assert.ok(!bad.test(line),'forbidden word in '+f+': '+line);}
  }
}
let tr=playLab('enhance');
assert.match(tr,/ENHANCE/);assert.match(tr,/The eyebrow was HUNGER/);assert.match(tr,/WING for eyebrows/);assert.equal(T.G.zoom,null);
// The bubble that gets out of hand (Tuesday, 03:07), and what a shadow does when there is nothing to prevent.
T.chapter(2);stepUntil(()=>T.G.cur&&T.G.cur.big);
{const before=1.15;for(let i=0;i<12;i++)T.tick(1);T.draw();
 assert.ok(T.G.morko.sT<1&&T.G.morko.sT<before,'Ekskyysmi shrinks under its own bubble: '+T.G.morko.sT);assert.equal(T.G.morko.mood,'scared');
 T.unlock();T.advance();T.unlock();T.advance();assert.equal(T.G.cur.text,'Who said all that?');assert.equal(T.G.cur.big,false);
 stepUntil(()=>T.G.cur&&T.G.cur.text==='…I’ll use a smaller font.');assert.equal(T.G.morko.sT,1);}
T.lab('evening');stepUntil(()=>T.G.morko.pose==='puppet');T.draw();stepUntil(()=>T.G.cur&&/Shadows are allowed one/.test(T.G.cur.text));
T.unlock();T.advance();assert.notEqual(T.G.morko.pose,'puppet','the bird is put away');
tr=playLab('sometime');
assert.match(tr,/grab a coffee sometime/);assert.match(tr,/hadn’t been picked yet/);assert.equal(T.G.someT,'form');
assert.match(tr,/Half past four WHEN/);assert.match(tr,/Booking it is MY department/);assert.match(tr,/His watch had no hands/);assert.equal(T.G.yT,0,'Eero’s shadow leaves to catch him up');
for(const id of ['posting','bar','library']){playLab(id);assert.equal(T.G.lens,null,'the glass goes back in the pocket: '+id);}
tr=playLab('evening');
assert.match(tr,/The plate might/);assert.doesNotMatch(tr,/procedure/);assert.match(tr,/She knows I count/);assert.match(tr,/page 212/);assert.match(tr,/WHY would you correct/);assert.equal(T.G.dish,null);
tr=playLab('glass');
assert.match(tr,/I’ll need the glass/);assert.match(tr,/Exhibit A/);assert.match(tr,/falls off a printer/);assert.match(tr,/You look smaller/);assert.equal(T.G.lens,null);
assert.doesNotMatch(T.history().map(x=>x.who+x.text).join(' '),/YOUR HUMAN/);
tr=playLab('bar');
assert.match(tr,/coat stand with opinions/);assert.match(tr,/GINGER BEER\./);assert.match(tr,/the shadow of one/);assert.match(tr,/I always thought that was the bad outcome/);assert.match(tr,/To being furniture/);
assert.ok(T.G.barWas&&T.G.barWas.sdrink&&T.G.barWas.glass,'the shadow had its drink before it dozed off');
assert.match(tr,/I was off duty\. The bill came anyway/);assert.match(tr,/Thanks, you too/);assert.match(tr,/That’s just the background/);assert.equal(T.G.pie,null);assert.equal(T.G.morko.asleep,false);
T.chapter(2);assert.equal(T.G.bar,null,'the bar does not follow you to work');
tr=playLab('voice');
assert.match(tr,/Are you her bank/);assert.match(tr,/take fourteen/);assert.match(tr,/oh, nice\. It’s Sanna/);assert.match(tr,/One for safety/);assert.equal(T.G.rec,null);
tr=playLab('detail');
assert.match(tr,/Just one small thing/);assert.match(tr,/I have the X-ray/);assert.match(tr,/The font’s a bit small/);assert.match(tr,/You always keep the font/);
assert.equal(T.G.jolt,null,'the X-ray is over when the scene is');
// Leaving the tab is noticed, and filed.
T.lab('detail');T.G.awayAt=Date.now()-120000;T.inside.cameBack();
assert.match(T.G.awayNote[0],/You left for 2 min/);assert.match(T.G.awayNote[1],/In here that was 1 h 00 min/);
assert.ok(T.inside.day().ledger.some(e=>e.label==='waiting for you to come back'));
T.G.awayAt=Date.now()-2000;T.G.awayNote=null;T.inside.cameBack();assert.equal(T.G.awayNote,null,'a glance away is not a departure');
// The posting: withdrawal filed as a perfect record. Three tactics; the third one asks.
function playPosting(k){T.lab('posting');let st=0;
  while(!T.G.labEnd&&st++<3000){T.unlock();T.draw();const w=T.state();
    if(w==='click')T.advance();else if(w==='view'){T.advance();T.tick(6);T.advance();}else if(w==='choice')T.choose(k);else T.tick(0.5);}
  assert.ok(T.G.labEnd);return T.history().map(x=>x.text).join('\n');}
tr=playPosting(0);assert.equal(T.G.posting,'archived');assert.match(tr,/Filed under “later”/);assert.match(tr,/Success rate: one hundred percent/);
assert.ok(T.inside.day().ledger.some(e=>e.label==='the application, not sent'));
tr=playPosting(1);assert.equal(T.G.posting,'rejected');assert.match(tr,/You are too long/);
tr=playPosting(2);assert.equal(T.G.posting,'open');assert.match(tr,/Just don’t close it/);assert.doesNotMatch(tr,/one hundred percent/);
assert.ok(!T.inside.day().ledger.some(e=>e.label==='the application, not sent'),'an open tab costs nothing extra');
// Not now: the rehearsal is longer than the no.
tr=playLab('notnow');assert.match(tr,/the actual “no” took four seconds/);assert.match(tr,/only one I’m allowed to drop/);assert.match(tr,/Heavy\?/);assert.ok(tr.indexOf('Heavy?')<tr.indexOf('took four seconds'));assert.equal(T.G.wT,0);assert.match(tr,/I dropped ONE/);assert.ok(T.G.dropped&&T.G.dropped.tag==='2011','the 2011 card ends up on the floor');assert.match(tr,/three hours and ten minutes/);assert.equal(T.G.rehearsal,true);
tr=playLab('reply');
assert.match(tr,/A few small edits\. For safety\./);assert.match(tr,/“Hey! I had a on Thursday\. :\)”/,'three first-option cuts leave a message with nothing in it');
assert.match(tr,/She decoded it/);assert.equal(T.G.replySent,'edited');assert.equal(T.G.draft,null);
tr=playLab('library');
assert.match(tr,/That’ll be a fine/);assert.match(tr,/THAT kind of fine/);assert.match(tr,/Bengtskär/);assert.match(tr,/Day one/);assert.equal(T.G.lib.book,true);
T.chapter(2);assert.equal(T.G.lib,null);assert.equal(T.G.draft,null);
tr=playLab('colleagues');
assert.match(tr,/oh\. hi\./);assert.match(tr,/Since I started watching you do it/);assert.match(tr,/busy near each other/);assert.equal(T.G.zT,0);
assert.equal(T.G.metSannaShadow,true);
tr=playLab('colleagues','coat');
assert.match(tr,/Your buttons blink/);assert.match(tr,/Please don’t review the coat/);assert.equal(T.G.morko.coat,null,'the disguise ends before the honest conversation');assert.equal(T.G.morko.pose,null);
// Both physical gags remain readable when motion is reduced, pause with the game, and cannot leak into a new chapter.
function labUntil(text){
  for(let i=0;i<200;i++){
    if(T.G.cur&&T.G.cur.text===text)return;
    T.unlock();const s=T.state();
    if(s==='click')T.advance();else if(s==='time'||s==='view')T.tick(6);
    else if(s==='hold')T.advance();
    else if(s==='choice')T.choose(T.options().some(o=>o.t==='Pretend to be a coat.')?1:T.options().some(o=>o.t==='Stay. Wobble visibly.')?2:0);
    else throw Error('Unexpected state before gag: '+s);
    if(s==='view'){T.unlock();T.advance();}
  }
  assert.fail('Did not reach: '+text);
}
for(const less of [false,true]){
  if(less)fire(element('motion'),'click',{});
  T.start('A',false);T.skipIntro();labUntil('Rejection prevented.');
  const declared=T.G.prevented;T.unlock();T.advance();
  assert.equal(T.G.stamp.mode,'press');assert.equal(T.G.stamp.ink,false);
  T.tick(0.3);T.draw();assert.equal(T.G.stamp.ink,false,'the ink waits for contact');
  const stampAt=T.G.stamp.t;T.pause();T.frame(30000000);assert.equal(T.G.stamp.t,stampAt);T.pause();
  T.tick(0.26);T.draw();assert.equal(T.G.stamp.ink,true);assert.equal(T.G.prevented,declared+1);
  T.tick(4);T.draw();assert.equal(T.G.stamp,null,'the mark fades without waiting for another click');
  T.chapter(5);labUntil('I’ve got a verdict ready. Three, actually. They’re very good.');
  assert.equal(T.G.stamp.mode,'hover');const fridayDeclared=T.G.prevented;
  T.tick(30);T.draw();assert.equal(T.G.stamp.ink,false,'reading slowly never completes the abandoned stamp');
  T.unlock();T.advance();assert.equal(T.G.cur.text,'I know they are.');T.unlock();T.advance();
  assert.equal(T.G.stamp.retiring,true);T.tick(0.6);T.draw();assert.equal(T.G.stamp,null);
  assert.equal(T.state(),'choice');assert.equal(T.G.prevented,fridayDeclared,'putting the stamp away makes no prevention claim');
  T.chapter(5);labUntil('I’ve got a verdict ready. Three, actually. They’re very good.');
  T.chapter(2);assert.equal(T.G.stamp,null,'a chapter change clears the raised stamp');
  T.lab('colleagues');labUntil('Coats have buttons.');T.tick(0.1);T.draw();
  assert.equal(T.G.morko.pose,'coat');assert.equal(T.G.morko.coat.p===1,less,'reduced motion shows the buttons immediately');
  const at=T.G.morko.coat.p;T.pause();T.frame(10000000);assert.equal(T.G.morko.coat.p,at);T.pause();
  T.tick(1);T.draw();assert.equal(T.G.morko.coat.p,1);
  T.chapter(2);assert.equal(T.G.morko.coat,null,'chapter changes clear the coat');
  T.lab('bar');labUntil('For cover.');T.tick(1);T.draw();
  assert.equal(T.G.bar.shelter,true);assert.equal(T.G.bar.umbrella,1);assert.equal(T.G.morko.pose,'shelter');
  T.unlock();T.advance();T.tick(0.25);T.draw();assert.equal(T.G.bar.umbrella===0,less,'reduced motion returns the umbrella without a sweep');
  T.tick(1);T.draw();assert.equal(T.G.bar.umbrella,0);
  T.chapter(2);assert.equal(T.G.bar,null);assert.equal(T.G.morko.pose,null);
  T.chapter(5);labUntil('I’m wobbling.');T.tick(0.2);T.draw();
  assert.equal(T.G.morko.pose,'balance');
  const wobbleAt=T.G.morko.wobble.t;T.pause();T.frame(20000000);assert.equal(T.G.morko.wobble.t,wobbleAt,'pause freezes the balancing act');T.pause();
  T.tick(10);T.draw();assert.equal(T.G.morko.wobble.t,3.2,'the wobble settles instead of looping while the player reads');
  labUntil('It’s the principle.');T.unlock();T.advance();assert.equal(T.G.morko.wobble,null);assert.equal(T.G.morko.pose,null);
  T.chapter(5);labUntil('I’m wobbling.');T.chapter(2);assert.equal(T.G.morko.wobble,null,'a chapter change clears a wobble in progress');
  if(less)fire(element('motion'),'click',{});
}
tr=playLab('notnow');
assert.match(tr,/That one was real/);assert.match(tr,/I rounded up/);assert.match(tr,/A bit stung\. And fine\./);
// The quiet opening: an ordinary shadow until the human has a plan. It can be skipped.
T.start();assert.equal(T.G.morko.asleep,true);assert.equal(T.G.human.gone,true);assert.equal(T.G.skippable,true);
assert.equal(T.G.chap.part,1);T.tick(30);assert.equal(T.state(),'click','part card waits for the reader');T.unlock();T.advance();T.tick(3);T.tick(5);assert.equal(T.G.human.gone,false,'the human walks in');
T.skipIntro();assert.equal(T.state(),'click');assert.equal(T.G.skippable,false);assert.equal(T.G.human.x,450);assert.equal(T.G.morko.asleep,true);
assert.match(T.history().map(x=>x.text).join(' '),/ask Sanna to lunch/);
T.unlock();T.advance();T.tick(2);T.tick(2);T.tick(2);assert.equal(T.G.morko.asleep,false,'the plan wakes the shadow');
assert.match(T.history().map(x=>x.text).join(' '),/WHAT are we doing today/);
tr=playLab('comments','none');
assert.equal(T.G.fightRes.deflected,0);assert.equal(T.G.fightRes.noteDelivered,true);
assert.match(tr,/didn’t swat anything/);assert.match(tr,/It stings. I keep looking/);assert.match(tr,/Mostly… cats/);assert.doesNotMatch(tr,/EXACTLY like a dagger/);
tr=playLab('comments','all');
assert.ok(T.G.fightRes.deflected>=6,'swatting everything deflects most replies');assert.match(tr,/EXACTLY like a dagger/);assert.equal(T.G.finalFrame,true);assert.equal(T.G.boss,null,'the boss does not follow us to bed');
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
// Native and browser lifecycle events can arrive twice, and in either order.
assert.deepEqual(Object.keys(nativeListeners).sort(),['appStateChange','backButton','pause','resume']);
T.start('B',true);
fire(element('menu'),'click',{stopPropagation(){}});assert.equal(T.back(),'menu');assert.equal(T.G.started,true);
fire(element('restart'),'click',{});assert.equal(T.back(),'cancel');assert.equal(element('pause').textContent,'Pause');assert.equal(T.G.started,true);
fire(element('journal'),'click',{});assert.equal(T.back(),'log');assert.equal(element('pause').textContent,'Pause');
T.reset();T.title();const exitsBefore=nativeState.exits;nativeListeners.backButton();assert.equal(nativeState.exits,exitsBefore+1);
toHold('B');T.holdDown();T.tick(0.3);const heldAt=T.G.hold.p;
nativeListeners.pause();const awayAt=T.G.awayAt;assert.equal(T.G.hold.on,false);
assert.equal(element('pause').textContent,'Resume');T.frame(31000000);assert.equal(T.G.hold.p,heldAt);
document.hidden=true;fire(document,'visibilitychange',{});nativeListeners.appStateChange({isActive:false});assert.equal(T.G.awayAt,awayAt,'duplicate background signals must not reset the away timer');
nativeListeners.resume();assert.equal(T.G.awayAt,awayAt,'still hidden in the DOM');
document.hidden=false;fire(document,'visibilitychange',{});assert.equal(T.G.awayAt,null);
assert.equal(element('pause').textContent,'Resume','foregrounding requires an explicit resume');
T.pause();assert.equal(T.G.hold.on,false,'returning does not restore a held finger');
T.start('B',true);fire(element('journal'),'click',{});nativeListeners.pause();nativeListeners.resume();T.back();
assert.equal(element('pause').textContent,'Resume','closing a journal after an interruption must not resume');
T.start('B',true);fire(element('restart'),'click',{});nativeListeners.pause();nativeListeners.resume();T.back();
assert.equal(element('pause').textContent,'Resume','cancelling restart after an interruption must not resume');
// A real AudioContext has independent playback even if requestAnimationFrame stops.
let testAudio;
window.AudioContext=function(){
  testAudio=this;this.state='running';this.currentTime=0;this.destination={};
  this.resume=()=>{this.state='running';return Promise.resolve()};
  this.suspend=()=>{this.state='suspended';return Promise.resolve()};
  const param={setValueAtTime(){},exponentialRampToValueAtTime(){}};
  this.createOscillator=()=>({frequency:param,connect(){},start(){},stop(){}});
  this.createGain=()=>({gain:param,connect(){}});
};
T.start('A',true);T.sound.play('hit');assert.equal(testAudio.state,'running');
nativeListeners.pause();assert.equal(testAudio.state,'suspended');T.sound.play('hit');assert.equal(testAudio.state,'suspended');
nativeListeners.resume();assert.equal(testAudio.state,'suspended');T.pause();assert.equal(testAudio.state,'running');
fire(element('sound'),'click',{});assert.equal(testAudio.state,'suspended');fire(element('sound'),'click',{});assert.equal(testAudio.state,'running');
T.reset();T.title();
assert.equal(Object.keys(T.sound.list).length,0);T.sound.play('hit');assert.equal(T.sound.has('hit'),false);
// Replaying Monday is noticed on the next receipt.
function toDayEnd(){let n=0;while(!T.G.dayEnd&&n++<3000){T.unlock();T.draw();const st=T.state();
  if(st==='click')T.advance();else if(st==='time'||st==='qte')T.tick(6);else if(st==='view'){T.advance();T.tick(6);T.advance();}
  else if(st==='stretch'||st==='hold')T.advance();else if(st==='choice')T.choose(T.options().findIndex(o=>!o.off));else T.tick(1);}
  assert.ok(T.G.dayEnd,'Monday reaches its receipt');}
T.start('B',true);toDayEnd();
fire(element('ov'),'click',{target:{getAttribute(k){return k==='data-go'?'same':null}}});toDayEnd();
assert.match(T.inside.receipt(),/Mondays replayed, by you\s+noted/);
fire(element('ov'),'click',{target:{getAttribute(k){return k==='data-go'?'again':null}}});toDayEnd();
assert.match(T.inside.receipt(),/Mondays replayed, by you ×2\s+noted/);
// The correct response: a window of 2.8 seconds (0.8 plus two for reading), right after "oh, hi.".
function toWindow(day){T.start(day,true);let n=0;while(T.state()!=='qte'&&n++<200){T.unlock();if(T.state()==='click')T.advance();else T.tick(1);}assert.equal(T.state(),'qte','Monday reaches the window');}
// 1. Doing nothing: too late, and the spiral begins.
toWindow('A');T.advance();assert.equal(T.state(),'qte','clicking does not skip the window');
T.tick(2.5);assert.equal(T.G.qte.end,null,'still open after two and a half seconds: time to read');T.tick(0.4);assert.equal(T.G.qte.end,'late');
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
 assert.match(element('ov').innerHTML,/complaint about the speed/);
 {const d=T.inside.run().at(-1);assert.ok(d.ratio<1.2,'answering in time keeps the day almost a day: '+d.ratio);assert.equal(d.hits,0);}
 assert.doesNotMatch(T.inside.receipt(),/oh, hi\./,'the secret Monday has no 0.4 seconds on it');}
fire(element('ov'),'click',{target:{getAttribute(k){return k==='data-go'?'next':null}}});
labUntil('I’ve filed the blank. For completeness.');
assert.match(T.history().map(x=>x.text).join('\n'),/Monday’s lunch report: we had lunch/);
T.chapter(2);labUntil('I’ve filed the blank. For completeness.');
assert.equal(T.G.lunch,1,'continuing from Tuesday remembers the successful Monday');
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
// Part cards are real reading stops. Pausing and resuming must not swallow them.
for(const part of [1,2,3]){
  if(part===1)T.start('B',false);else if(part===3)T.chapter(5);else{T.chapter(4);stepUntil(()=>T.G.chap&&T.G.chap.part===2);}
  assert.equal(T.G.chap.part,part);assert.equal(T.state(),'click');
  const caption=T.G.cur.text;T.tick(60);T.draw();assert.equal(T.G.cur.text,caption);assert.equal(T.G.chap.part,part);
  const t=T.G.chap.t;T.pause();T.frame(90000000);assert.equal(T.G.chap.t,t);T.pause();
  T.unlock();T.advance();assert.ok(!T.G.chap||!T.G.chap.part,'continue leaves the part card');
}
// The two replay effects have different state and cannot overwrite one another.
T.start('B',true);stepUntil(()=>T.G.w&&T.state()==='choice');
T.unlock();T.choose(T.options().findIndex(o=>o.t.startsWith('Review the')));
stepUntil(()=>T.G.rep);assert.equal(T.G.tape,undefined,'Monday uses its own replay effect');
T.lab('rewind');stepUntil(()=>T.G.tape);assert.equal(T.G.rep,null,'Rewind uses the TV tape');
// Drawing must never advance animations: the render loop still draws while paused.
for(const name of ['dots','tape','pie','night']){
  T.chapter(2);T.G[name]=name==='night'?{t:0,car:.2,eyes:{S:1}}:name==='tape'?{t:0,n:1}:{t:0};
  const before=JSON.stringify(T.G[name]);T.pause();T.frame(91000000);T.draw();T.draw();
  assert.equal(JSON.stringify(T.G[name]),before,name+' must freeze while paused');T.pause();
  T.tick(.2);assert.ok(T.G[name].t>0);T.chapter(3);assert.equal(T.G[name],null,name+' clears on a new scene');
}
// The witness signature does not erase the shadow; the form question is also in the reading panel.
T.lab('quiet');stepUntil(()=>T.G.cur&&T.G.cur.who==='S'&&T.G.cur.text==='—');
{let depth=0;const save=ctx.save,restore=ctx.restore;ctx.save=()=>depth++;ctx.restore=()=>depth--;
 for(let i=0;i<120;i++)T.draw();assert.equal(depth,0,'silent shadow bubbles must not leak the canvas stack');ctx.save=save;ctx.restore=restore;}
T.lab('form');stepUntil(()=>T.state()==='choice');assert.match(element('line').innerHTML,/How often do you replay/);
stepUntil(()=>T.state()==='hold');T.holdDown();T.tick(1.5);T.holdUp();assert.ok(T.G.form.sig>=.5);assert.equal(T.G.morko.dim,null);
for(const pick of [0,1,2]){const bt=playLab('bar',pick);assert.match(bt,/I haven’t checked the calendar/);assert.equal(T.G.barStory,['umbrella','arms','2011'][pick]);}
T.chapter(4);stepUntil(()=>T.G.moment==='bar'&&T.state()==='choice'&&T.G.choiceWho==='H');
assert.match(element('line').innerHTML,/human has the floor/);T.unlock();T.choose(2);assert.equal(T.G.cur.who,'H');
stepUntil(()=>T.G.chap&&T.G.chap.part===2);
assert.equal(JSON.parse(savedItems.get(saveKey)).at.state.barStory,'2011');
T.reset();T.title();fire(element('ov'),'click',{target:{getAttribute(k){return k==='data-go'?'cont':null}}});
assert.equal(T.G.chap.part,2);assert.equal(T.G.barStory,'2011');playOn(()=>0);
const revised=T.history().map(l=>l.text).join('\n');
assert.match(revised,/I waved at the wrong person yesterday/);assert.match(revised,/Finished it on Monday. I still like it/);
assert.match(revised,/I missed you. I’m keeping the easier day/);assert.doesNotMatch(revised,/It wears off about now|Mm. Not quite|Eleven people liked it/);
assert.equal(T.G.endSeen,true,'the lamp-and-bird image was reached');assert.ok(revised.indexOf('Tuesday works')>revised.lastIndexOf('I’m keeping the headband'),'the radiator comes after the final image');
playLab('comments');assert.equal(T.G.finalFrame,true);assert.equal(T.G.bed,true);assert.equal(T.G.lampOff,false);assert.equal(T.G.morko.pose,'puppet');assert.equal(T.G.zShow,0);
T.chapter(2);assert.equal(T.G.finalFrame,false);assert.equal(T.G.bed,false);assert.equal(T.G.morko.pose,null);
console.log(`PASS: ${runs} Monday paths; ${weeks} full weeks; chapter and moment resumes; all three bar stories; part cards; distinct replays; form signature; quiet-day payoff; nightlight ending; paused animations; phone controls, audio and local assets. Cutaways: ${views}; size interactions: ${stretches}.`);

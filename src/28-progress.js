/* Chapter checkpoints keep their own history. Unlocks and the last played chapter are separate. */
var SAVE_KEY='ekskyysmi.save';
var METHODS=['worst','draft','please','hide','stay','hush'];
function cleanMethods(m){var o={};METHODS.forEach(function(k){var v=m&&m[k];if(Number.isFinite(v)&&v>0)o[k]=clamp(Math.floor(v),0,99);});return o;}
function alarmSize(v){return Number.isFinite(v)?clamp(v,1.8,3.8):null;}
function checkpoint(g){
  return {day:['A','B','C'].indexOf(g.day)>=0?g.day:'B',
    lunch:[0,1,2].indexOf(g.lunch)>=0?g.lunch:0,real:g.real===1?1:0,bit:!!g.bit,
    leak:['none','grow','cover','exit'].indexOf(g.leak)>=0?g.leak:'none',fear:[1,2,3].indexOf(g.fear)>=0?g.fear:1,
    fb:['sorry','explain','quiet','ask'].indexOf(g.fb)>=0?g.fb:null,
    txt:['worries','cancel','freezer','bite'].indexOf(g.txt)>=0?g.txt:null,
    yes:Number.isFinite(g.yes)?clamp(Math.floor(g.yes),0,20):0,
    handout:!!g.handout,afterparty:!!g.afterparty,reflected:!!g.reflected,peeked:!!g.peeked,metSannaShadow:!!g.metSannaShadow,
    posting:['archived','rejected','open'].indexOf(g.posting)>=0?g.posting:null,
    nothings:Number.isFinite(g.nothings)?clamp(Math.floor(g.nothings),0,20):0,rehearsal:!!g.rehearsal,
    barStory:['umbrella','arms','2011'].indexOf(g.barStory)>=0?g.barStory:null,quietDrawing:!!g.quietDrawing,coatNo:!!g.coatNo,fineSent:!!g.fineSent,
    sips:Number.isFinite(g.sips)?clamp(Math.floor(g.sips),0,99):0,files:Number.isFinite(g.files)?clamp(Math.floor(g.files),0,99):0,
    bigSip:g.bigSip&&typeof g.bigSip.t==='string'?{t:g.bigSip.t.slice(0,40),n:clamp(Math.floor(g.bigSip.n)||0,0,5)}:null,methods:cleanMethods(g.methods),kept:Array.isArray(g.kept)?g.kept.filter(function(k){return typeof k==='string'&&KEPT[k];}).slice(0,12):[],
    // 0.77 (Codex review): what the end screens read. Without these, Continue rewrote the week: five days became one, Friday's "no" went back in its box.
    no:!!g.no,quiet:!!g.quiet,mugMended:!!g.mugMended,applied:!!g.applied,
    // 0.99.48: the alarm sizes the player chose on Monday and Friday, for Friday's comparison and the receipt
    warningSize:alarmSize(g.warningSize),monWarning:alarmSize(g.monWarning),friWarning:alarmSize(g.friWarning),
    run:Array.isArray(g.run)?g.run.map(cleanDay).filter(Boolean).slice(0,40):[],day0:cleanDay(g.day0)};
}
// A lived day, as the receipts need it (35-inside.js). Storage can be old or edited, so every field is checked.
function cleanDay(d){
  if(!d||typeof d!=='object'||typeof d.label!=='string')return null;
  function n(v,hi){return Number.isFinite(v)?clamp(v,0,hi):0;}
  var o={label:d.label.slice(0,80),start:n(d.start,864000),outside:n(d.outside,864000),extra:n(d.extra,8640000),hits:Math.floor(n(d.hits,999)),
    trigAt:Number.isFinite(d.trigAt)?d.trigAt:null,stayAt:Number.isFinite(d.stayAt)?d.stayAt:null,
    ledger:Array.isArray(d.ledger)?d.ledger.filter(function(e){return e&&typeof e.label==='string';}).slice(0,40).map(function(e){return {label:e.label.slice(0,80),n:Math.floor(n(e.n,999)),secs:n(e.secs,8640000)};}):[]};
  if(Number.isFinite(d.trigMult))o.trigMult=clamp(d.trigMult,1,2);
  if(Number.isFinite(d.ratio))o.ratio=clamp(d.ratio,0,99);
  return o;
}
function loadProgress(){
  try{
    var raw=JSON.parse(window.localStorage.getItem(SAVE_KEY)||'null');
    if(!raw||!Number.isInteger(raw.ch)||raw.ch<1||raw.ch>5)return null;
    var top=Number.isInteger(raw.unlocked)?clamp(raw.unlocked,raw.ch,5):raw.ch,chapters={};
    for(var i=1;i<=top;i++){
      var c=raw.version===2&&raw.chapters?raw.chapters[i]:raw;
      if(c&&typeof c==='object'&&!Array.isArray(c))chapters[i]=checkpoint(c);
    }
    if(!chapters[raw.ch])return null;
    // "at" remembers the short moment the player was in, so closing the tab on a phone never costs ten minutes of story.
    var at=null,a=raw.at;
    if(a&&a.ch===raw.ch&&typeof a.moment==='string'&&(AFTER[a.ch]||[]).indexOf(a.moment)>=0&&a.state&&typeof a.state==='object')
      at={ch:a.ch,moment:a.moment,state:checkpoint(a.state),jobDone:!!a.jobDone};
    return {version:2,ch:raw.ch,unlocked:top,chapters:chapters,at:at,done:raw.done===true,fin:raw.fin===true};
  }catch(e){return null;}
}
function saveProgress(n){
  try{
    var old=loadProgress(),chapters=old?old.chapters:{};
    chapters[n]=checkpoint(G);
    window.localStorage.setItem(SAVE_KEY,JSON.stringify({version:2,ch:n,unlocked:Math.max(n,old?old.unlocked:1),chapters:chapters,done:!!(old&&old.done)}));
  }catch(e){/* Storage is optional: private/offline play must still work. */}
}
// The whole story has been seen once: the Moments menu may then show the last day's moments too.
// The run is over (0.97: called at the final receipt, after the radiator, not at the group chat's last image). done = finished once
// (the ending's moments stay open); fin = THIS run is finished, so the title offers no Continue into the scene just played.
function saveDone(){
  try{var raw=JSON.parse(window.localStorage.getItem(SAVE_KEY)||'null');if(!raw||typeof raw!=='object')return;raw.done=true;raw.fin=true;delete raw.at;window.localStorage.setItem(SAVE_KEY,JSON.stringify(raw));}catch(e){}
}
function saveMoment(id){
  try{
    var old=loadProgress();if(!old||old.ch!==G.chapter)return;
    window.localStorage.setItem(SAVE_KEY,JSON.stringify({version:2,ch:old.ch,unlocked:old.unlocked,chapters:old.chapters,done:old.done,
      at:{ch:G.chapter,moment:id,state:checkpoint(G),jobDone:!!G.jobDone}}));
  }catch(e){}
}

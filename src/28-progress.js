/* Chapter checkpoints keep their own history. Unlocks and the last played chapter are separate. */
var SAVE_KEY='ekskyysmi.save';
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
    barStory:['umbrella','arms','2011'].indexOf(g.barStory)>=0?g.barStory:null,quietDrawing:!!g.quietDrawing,coatNo:!!g.coatNo,kept:Array.isArray(g.kept)?g.kept.filter(function(k){return typeof k==='string'&&KEPT[k];}).slice(0,12):[]};
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
    return {version:2,ch:raw.ch,unlocked:top,chapters:chapters,at:at};
  }catch(e){return null;}
}
function saveProgress(n){
  try{
    var old=loadProgress(),chapters=old?old.chapters:{};
    chapters[n]=checkpoint(G);
    window.localStorage.setItem(SAVE_KEY,JSON.stringify({version:2,ch:n,unlocked:Math.max(n,old?old.unlocked:1),chapters:chapters}));
  }catch(e){/* Storage is optional: private/offline play must still work. */}
}
function saveMoment(id){
  try{
    var old=loadProgress();if(!old||old.ch!==G.chapter)return;
    window.localStorage.setItem(SAVE_KEY,JSON.stringify({version:2,ch:old.ch,unlocked:old.unlocked,chapters:old.chapters,
      at:{ch:G.chapter,moment:id,state:checkpoint(G),jobDone:!!G.jobDone}}));
  }catch(e){}
}

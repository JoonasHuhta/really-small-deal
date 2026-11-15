/* ================= the order of things: a life in small moments, not a calendar ================= */
// The five long chapters are the spine. Between them sit shorter moments (the same scripts the Scenario lab plays).
// Time floats on purpose: a card says roughly when, never which week. To reorder the story, edit AFTER.
var AFTER={
  2:['enhance'],
  3:['glass','notnow'],
  4:['reply','bar','colleagues'],
  5:['comments']
};
var WHEN={enhance:'A MEETING, SOME MORNING',glass:'ONE ORDINARY MORNING',notnow:'AN AFTERNOON',reply:'AFTERWARDS',bar:'AN EVENING',
  colleagues:'AFTER LUNCH, SOME DAY',comments:'A SUNDAY EVENING',sometime:'LEAVING WORK',evening:'AN ORDINARY EVENING',voice:'LATER THAT EVENING',library:'TWENTY-THREE DAYS LATER'};
function interlude(id){return function(){G.lab=null;G.moment=id;return LABS[id].script();};}
function momentsAfter(n){return (AFTER[n]||[]).map(interlude);}

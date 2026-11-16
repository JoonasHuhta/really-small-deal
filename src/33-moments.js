/* ================= the order of things: a life in small moments, not a calendar ================= */
// The five long chapters are the spine. Between them sit shorter moments (the same scripts the Scenario lab plays).
// Time floats on purpose: a card says roughly when, never which week. To reorder the story, edit AFTER.
// The order is not arbitrary (see KASIKIRJOITUS.md, "Rakenne"):
//   after 2: Ekskyysmi doubles down (zoom, a replay that edits itself, withdrawal)            first half of act two: the old job, getting costlier
//   after 3: the glass turned on its owner = MIDPOINT; then other people's shadows, ending with one that
//            says "oh. hi." to Ekskyysmi itself, so it walks into Thursday knowing how that lands;
//            last, an evening where nothing happens (a friend who already knows you count): the calm before Thursday
//   after 4: the job description has changed. A relapse, a real one survived, an evening of nothing.
//            Then the second act (TOINEN_NAYTOS.md): a hit with no sender, a form that signs the shadow away,
//            a day without it (the false victory), and a lamp switched on to ask it back.
//            That night, in the dark, it learns that every shadow in town does the same job.
//   after 5: the drawing. The oldest file gets updated.
var AFTER={
  2:['enhance','rewind','posting'],
  3:['detail','glass','sometime','colleagues','evening'],
  4:['reply','notnow','bar','nothing','form','quiet','evenings','night'],
  5:['comments']
};
var WHEN={night:'THAT NIGHT',rewind:'THAT NIGHT, 23:40',nothing:'A SUNDAY, LATE AFTERNOON',form:'A WEEKDAY, 14:10',quiet:'THE FIRST MORNING',evenings:'THE SAME DAY, 21:00',posting:'THAT NIGHT, LATE',detail:'THE NEXT AFTERNOON',enhance:'A MEETING, SOME MORNING',glass:'ONE ORDINARY MORNING',notnow:'AN AFTERNOON',reply:'THE EVENING AFTER BOARD GAMES',bar:'AN EVENING',
  colleagues:'AFTER LUNCH, SOME DAY',comments:'A SUNDAY EVENING',sometime:'LEAVING WORK',evening:'AN EVENING AT HOME',voice:'LATER THAT EVENING',library:'TWENTY-THREE DAYS LATER'};
function interlude(id){return function(){G.lab=null;G.moment=id;saveMoment(id);return LABS[id].script();};}
function momentsAfter(n){return (AFTER[n]||[]).map(interlude);}

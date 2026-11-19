/* ================= the order of things: a life in small moments, not a calendar ================= */
// The five long chapters are the spine. Between them sit shorter moments (the same scripts the Scenario lab plays).
// Time floats on purpose: a card says roughly when, never which week. To reorder the story, edit AFTER.
// The order is not arbitrary (see KASIKIRJOITUS.md, "Rakenne"):
//   after 2: Ekskyysmi doubles down (zoom, a replay that edits itself, withdrawal)            first half of act two: the old job, getting costlier
//   after 3: the glass turned on its owner = MIDPOINT; then other people's shadows, ending with one that
//            says "oh. hi." to Ekskyysmi itself, so it walks into Thursday knowing how that lands;
//            last, an evening where nothing happens (a friend who already knows you count): the calm before Thursday
//   after 4: the job description has changed. A relapse, a real one survived, an evening of nothing.
//            Then part two (TOINEN_NAYTOS.md): a hit with no sender, asking for help,
//            a genuinely easier day, and a lamp with room for a quieter companion.
//            That night, in the dark, it learns that every shadow in town does the same job.
//   after 5: the drawing. The oldest file gets updated.
var AFTER={
  2:['enhance','rewind'],
  3:['glass','colleagues','evening'],
  4:['notnow','bar','nothing','form','quiet','library','evenings','night'],
  5:['comments','radiator']   // after the final image: the next Tuesday, by the radiator
};
// Extras, not in the story (TYOSUUNNITELMA.md section 4): posting, detail, sometime, reply, voice, footage.
var WHEN={night:'THAT NIGHT',rewind:'THAT NIGHT, 23:40',nothing:'A SUNDAY, LATE AFTERNOON',form:'A WEEKDAY, 14:10',quiet:'THE FIRST MORNING',evenings:'THE SAME DAY, 21:00',posting:'THAT NIGHT, LATE',detail:'THE NEXT AFTERNOON',enhance:'A MEETING, SOME MORNING',glass:'ONE ORDINARY MORNING',notnow:'AN AFTERNOON',reply:'THE EVENING AFTER BOARD GAMES',bar:'AN EVENING',
  colleagues:'AFTER LUNCH, SOME DAY',comments:'A SUNDAY EVENING',sometime:'LEAVING WORK',evening:'AN EVENING AT HOME',voice:'LATER THAT EVENING',library:'TWENTY-THREE DAYS LATER',radiator:'THE NEXT TUESDAY'};
// Moments that continue the one before them: Night shift is the same evening as Evenings (TYOSUUNNITELMA.md T3).
var NOCARD={night:1};
function interlude(id){return function(){G.lab=null;G.moment=id;saveMoment(id);return (id==='nothing'?partCard(2):[]).concat(LABS[id].script());};}
function momentsAfter(n){return (AFTER[n]||[]).map(interlude);}

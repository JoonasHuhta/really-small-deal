/* ================= the order of things: a life in small moments, not a calendar ================= */
// The five long chapters are the spine. Between them sit shorter moments (the same scripts the Scenario lab plays).
// Time floats on purpose: a card says roughly when, never which week. To reorder the story, edit AFTER.
// The order is not arbitrary (see KASIKIRJOITUS.md, "Rakenne"):
//   after 2: Ekskyysmi doubles down (zoom, a replay that edits itself, withdrawal)            first half of act two: the old job, getting costlier
//   after 3: the glass turned on its owner = MIDPOINT; then other people's shadows, ending with one that
//            says "oh. hi." to Ekskyysmi itself, so it walks into Thursday knowing how that lands;
//            last, an evening where nothing happens (a friend who already knows you count): the calm before Thursday
//   after 4: the job description has changed. A relapse, a real one survived, an evening of nothing.
//            Then part two (TOINEN_NAYTOS.md): a hit with no sender, a seven-week debt paid in person (the library), asking for help,
//            a genuinely easier day, and a lamp with room for a quieter companion.
//            That night, in the dark, it learns that every shadow in town does the same job.
//   after 5: the drawing. The oldest file gets updated.
var AFTER={
  2:['enhance','rewind'],
  3:['glass','colleagues','evening'],
  4:['notnow','bar','nothing','library','form','snow','quiet','evenings','posting','night'],   // the library before the form (21.11.): Evenings is THE SAME DAY as Quiet.
     // Snow indoors. (0.99.31, Joonas 26.11.: "what the game really needs"): the night after the form. The form says the shadow is
     // common; the dream says it has a colour. It learns to lie down on duty, and the next morning (Quiet.) the wall is empty.
     // The posting (21.11., Joonas: into the story): the first evening of the part-time job, 22:47, between Evenings and the night.
  5:['comments','epilogue','radiator']   // after the final image: the next Tuesday, by the radiator
};
// Extras, not in the story (TYOSUUNNITELMA.md section 4): detail, sometime, reply, voice, footage. (The posting joined the story 21.11.)
var WHEN={snow:'A SUNDAY NIGHT',night:'THAT NIGHT',rewind:'LATE TUESDAY, 23:40',nothing:'A SUNDAY, LATE AFTERNOON',form:'A WEEKDAY, 14:10',quiet:'MONDAY MORNING',evenings:'THE SAME DAY, 21:00',posting:'LATER THAT EVENING',detail:'THE NEXT AFTERNOON',enhance:'TUESDAY, ONE LAST MEETING',glass:'THURSDAY MORNING',notnow:'A LATER AFTERNOON',reply:'THE EVENING AFTER BOARD GAMES',bar:'THAT EVENING',
  colleagues:'THURSDAY, AFTER LUNCH',comments:'A SUNDAY EVENING',sometime:'LEAVING WORK',evening:'THURSDAY, AFTER WORK',voice:'LATER THAT EVENING',library:'A SATURDAY, WEEKS LATER',radiator:'THE NEXT TUESDAY'};
// Moments that continue the one before them: Night shift is the same evening as Evenings (TYOSUUNNITELMA.md T3).
var NOCARD={epilogue:1};   // the night has its own card since The posting sits between Evenings and the night   // the epilogue follows the last image straight away (it opens on its own card, “That was the week.”)
function interlude(id){return function(){G.lab=null;G.moment=id;
  // Pre-0.99.6 checkpoints in these Thursday scenes still have Wednesday's ledger open.
  if(G.chapter===3&&AFTER[3].indexOf(id)>=0&&G.day0&&G.day0.label!==CHAPTERS[4].day)newDay(CHAPTERS[4].day);
  saveMoment(id);return (id==='nothing'?partCard(2):[]).concat(LABS[id].script());};}
function momentsAfter(n){return (AFTER[n]||[]).map(interlude);}

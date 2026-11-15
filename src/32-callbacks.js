/* Small consequences: remember what this player actually did or heard. */
function mondayCallback(){
  var g=G;
  if(g.bit)return [['H','The joke I made at Eero?'],['S','We have motive. Witnesses. A cardigan.'],['H','Riitta wasn’t there.'],['S','Cardigans travel.']];
  if(g.real&&g.leak!=='exit')return [['H','They left me out of lunch.'],['S','And now there’s a meeting. The plot has acquired a calendar.']];
  if(g.leak==='exit')return [['H','I left the room.'],['S','An exit. Followed by an interview.'],['H','Don’t put those together.']];
  if(g.lunch)return [['H','We had lunch.'],['S','With witnesses.'],['H','They’re called colleagues.'],['S','Dual roles. Very efficient.']];
  return [['H','We barely spoke.'],['S','Exactly. A suspicious lack of evidence.']];
}
function extraWorkCallback(){
  var out=[];
  if(G.handout)out.push(['H','And the handout. Which nobody asked for.'],['S','An unsolicited gesture of employability.'],['H','It has a contents page now.'],['S','Of course. We’re very thorough when cornered by ourselves.']);
  if(G.afterparty)out.push(['H','And apparently I’m hosting an afterparty.'],['S','The board games might need somewhere to unwind.'],['H','They live in a box.'],['S','Exactly. Cooped up all week.']);
  return out;
}
function fridayReflex(){
  var line={cover:'Every part of me wants the cup.',grow:'Every part of me wants to become furniture again.',exit:'I’ve located the door. For old times’ sake.',none:'I’ve got “hi” ready. And several escape plans.'}[G.leak];
  return [['S',line]];
}
function mondayRepair(){
  if(!G.real)return [];
  if(G.leak==='exit')return [['H','I left before lunch on Monday. Then I spent the day guessing.'],['A','We went without asking you. I’m sorry. That was lazy of us.'],['S','I had seventeen theories. None of them were that short.']];
  return [['H','Monday stung, though. “No need to ask the others.”'],['A','…You heard that. I’m sorry. That was lazy of us.'],['S','I’d like that in writing.']];
}

/* Small consequences: remember what this player actually did or heard. */
function tuesdayOpening(){
  if(G.lunch===1)return [
    ['S','Tuesday. Monday’s lunch report: we had lunch. No incident. Nothing to file.'],
    ['H','You could leave it blank.'],
    ['S','I’ve filed the blank. For completeness.']
  ];
  // The lunch arranged by message on Monday does not quietly happen off-screen: it moves to Friday.
  // What the human wants (lunch with Sanna) stays open until the last scene.
  if(G.lunch===2)return [
    ['S','Tuesday. Nearly five. Lunch report: moved. Sanna, 11:40: “Dentist!! Sorry!! Friday?”'],
    ['H','You reviewed the exclamation marks for an hour.'],
    ['S','There are four. That’s either remorse or enthusiasm. I’ve filed it under both.']
  ];
  return [
    ['S','Tuesday. Nearly five. No incidents. I’d like it noted that I did nothing all day and it worked.'],
    ['H','You reviewed a comma for an hour.'],
    ['S','Quietly.',{quiet:1}]
  ];
}
function fridayShadow(){
  var known=G.metSannaShadow;G.metSannaShadow=true;
  if(known)return [set({mood:'care'}),
    ['Z','Oh. Daylight. You look smaller.'],
    ['S','Evenings. Nights. And Fridays.'],
    ['Z','I checked. Tuesday works.'],
    ['S','By the radiator.'],
    ['Z','I moved a worry.']
  ];
  // A chapter opened from an older save may still be their first meeting.
  return [set({mood:'surprised'}),['S','…She HAS one.'],['S','Hello.'],['Z','oh. hi.'],['S','…Noted.']];   // the name joke lives in the bar now, and it is never explained
}
function mondayCallback(){
  var g=G;
  if(g.bit)return [['H','The joke I made at Eero?'],['S','We have motive. Witnesses. A cardigan.'],['H','Riitta wasn’t there.'],['S','Cardigans travel.']];
  if(g.real&&g.leak!=='exit')return [['H','They left me out of lunch.'],['S','And now there’s a meeting. The plot has acquired a calendar.']];
  if(g.leak==='exit')return [['H','I left the room.'],['S','An exit. Followed by an interview.'],['H','Don’t put those together.']];
  if(g.lunch===1)return [['H','We had lunch.'],['S','With witnesses.'],['H','They’re called colleagues.'],['S','Dual roles. Very efficient.']];
  if(g.lunch===2)return [['H','Sanna moved lunch to Friday. That’s all that happened.'],['S','Exactly. First the lunch moves. Then the desk.']];
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
  // 0.97 (Codex): the apology is taken, and Monday still feels like Monday. No new quarrel, no commentary.
  if(G.leak==='exit')return [['H','I left before lunch on Monday. Then I spent the day guessing.'],['A','We went without asking you. I’m sorry. That was lazy of us.'],['S','I had seventeen theories. None of them were that short.'],['H','Thanks. Monday still stung.'],['A','Yeah.']];
  return [['H','Monday stung, though. “No need to ask the others.”'],['A','…You heard that. I’m sorry. That was lazy of us.'],['S','I’d like that in writing.'],['H','Thanks. It still stings a bit.'],['A','Yeah.']];
}

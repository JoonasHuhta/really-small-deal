/* ================= Kick-off. (Moment, 0.99.22): the chest goes before anyone has read anything ================= */
// Joonas 26.11. (the RSD book: body first, story after). The core line of #10 is "It's my chest. You just do the commentary."
// Here the match kicks off without the commentator: the phone buzzes while Ekskyysmi is in the archive, the chest goes, and the
// shadow arrives late and has to commentate backwards. The message is cake. The chest is slower to hear that than anyone.
// Not advice: nobody explains anything, they wait together, and the chest comes down when it comes down.
function labKickoff(){
  var empty=['S','—'];   // the wall is empty: the line is the gap (as in Quiet.)
  return labScene({set:'office',title:'Kick-off.',plan:'Read one message.',clock:10*3600+12*60}).concat([
  shadowAway,
  ['N','10:12. A quiet desk. Ekskyysmi is in the archive, re-alphabetising 2011.'],
  function(){var g=G;g.phoneN=4;g.buzz=0.9;sfx('pop');},{wait:0.45},
  hit(0.85,'P'),{wait:1.3},
  ['N','The phone buzzes. The chest goes. Nobody has read anything yet.'],
  ['H','…Hello?'],
  empty,
  function(){shadowBack(0.5);sfx('step');},{wait:0.9},
  ['S','Sorry— sorry. I was in the archive. Did I miss anything?',{look:'stunned'}],
  ['H','The chest went.'],
  set({s:0.75,mood:'alert'}),
  ['S','WITHOUT me? I do the commentary!'],
  ['H','It didn’t wait.'],
  ['S','Look at it. Full alarm. Cold hands. The stomach has left the building.'],
  ['S','And no commentary. Just noise. That’s not a match. That’s a riot.'],
  ['H','So commentate.'],
  ['S','I missed the kick-off! I’ll have to do it backwards.'],
  {choice:[
    {t:'It was Riitta. “Quick chat?” Again.',m:'worst',then:[
      set({s:1.5,mood:'scared'}),
      ['H','You haven’t read it.'],
      ['S','I’m reading the CHEST. The chest says Riitta.'],
      ['S','Look how well it fits. Like a glove. A cold glove.']]},
    {t:'Turn it face down. Unread, it can’t have happened.',m:'hide',then:[
      ['H','The chest says it already happened.'],
      ['S','The chest is not a reliable witness. It goes off at doorbells.'],
      ['H','And at the microwave.'],
      ['S','The microwave knows what it did.']]},
    {t:'Interview the chest. In its own words.',m:'stay',then:[
      ['S','Chest. In your own words. What happened?'],
      {wait:1.1},
      ['S','…It says “buzz”.'],
      ['H','That’s it?'],
      ['S','One word. And it’s sticking to it.']]}
  ]},
  ['H','I’m reading it.'],
  ['P','Sanna: “CAKE in the kitchen. Nobody knows whose birthday. Come anyway.”'],
  set({mood:'surprised',s:0.8}),
  ['S','…Cake.'],
  ['H','Nobody knows whose birthday.'],
  ['S','Then nobody can be left out of it.',{look:'pleased'}]
 ],outside({title:'WHAT IT LOOKED LIKE',dur:'duration: 0.4 seconds',cap:'A phone buzzed. Someone at a desk glanced at it. That was all.',anim:'glance'}),[
  calm,
  // The chest has not had the news. It comes down slower than the story does.
  function(){var g=G;g.pulse=0.5;g.anx=0.65;g.human.sweatT=0.45;g.human.face='stiff';g.morko.sT=0.9;g.morko.mood='worry';},
  ['H','It’s cake.'],
  ['S','The chest doesn’t know that yet.'],
  ['H','Tell it.'],
  {choice:[
    {t:'A memo. Formal.',then:[
      ['S','To: the chest. From: management. Re: cake. Stand down.',{look:'squint'}],
      {wait:0.9},
      ['S','…It doesn’t read memos.']]},
    {t:'Shout it. CAKE.',then:[
      ['S','CAKE!',{loud:1}],
      function(){G.pulse=0.7;},
      ['H','Now it’s up again.'],
      ['S','It heard the volume. Not the word.']]},
    {t:'Wait with it.',m:'stay',then:[
      ['S','Fine. We wait. I’m good at waiting. I wait for replies professionally.']]}
  ]},
  {hold:{kind:'stay',secs:2.6,text:'Staying until the chest catches up.'}},
  function(){var g=G;g.pulse=0;g.anx=0.15;g.human.sweatT=0;g.human.face='neutral';g.morko.sT=1;g.morko.mood='calm';g.morko.pose=null;},
  ['N','Ninety seconds later the chest gets the memo. It does not apologise.'],
  ['S','For the record: the chest kicked off, and I came in at half-time.'],
  ['H','And?'],
  ['S','And the score was cake.'],
  ['H','Coming?'],
  ['S','To the kitchen? Where the people are?',{look:'stunned'}],
  ['H','Where the cake is.'],
  function(){var g=G;g.human.xT=1060;},{wait:0.8},
  ['S','…Fine. I’ll commentate the cake.']
 ]);}

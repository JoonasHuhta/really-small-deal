/* ================= By the radiator: the rejection expert has something to lose ================= */
// On Friday the two shadows agree on Tuesdays, by the radiator. This is the next Tuesday.
// The roles swap: the human coaches, Ekskyysmi gets Eero's advice, and nothing it prepared survives the word "hi".
function labRadiator(){return labScene({set:'room',title:'By the radiator.',plan:'Make tea. That’s all.',clock:16*3600+50*60}).concat([
  function(){var g=G;g.cowA=true;g.ax=g.axT=780;g.aFace=-1;},
  ['N','The next Tuesday, nearly five. The kettle is on. Sanna is waiting for it too.'],
  set({mood:'alert'}),
  ['S','Don’t look at the radiator.'],
  ['H','Why would I look at the radiator?'],
  ['S','No reason. Tuesdays. Nearly five. Some shadows meet there. Professionally.'],
  ['H','…You have a date.'],
  ['S','I have a MEETING. I’ve prepared three topics and a fallback weather.',{look:'pleased'}],
  ['H','Go on, then. The topics.'],
  ['S','One. Walls. Two. Other walls. Three—'],
  ['S','…Three was the weather. I’ve used the fallback already.',{quiet:1}],
  {choice:[
    {t:'Have you tried leaving your comfort zone?',then:[['S','Don’t you DARE.',{loud:1}],['H','Eero says it works.'],['S','Eero has never met a radiator in his life.']]},
    {t:'Just say hi.',then:[['S','“Just say hi.” As if it’s nothing.'],['H','It is nothing.'],['S','It is a WHOLE WORD.']]},
    {t:'What if she doesn’t come?',then:[['S','Then it’s a radiator. I’ve spent time with worse.'],['H','You’re doing my voice.'],['S','I learned from the best. Unfortunately.']]}
  ]},
  function(){G.zT=1;},{wait:1.6},
  ['Z','Hi.'],
  set({mood:'surprised',s:1.2}),
  ['S','I’ve been meaning to— the weather is— I like your—'],
  ['S','Hi.',{quiet:1}],
  ['Z','I like your edges.'],
  ['S','…I like your radiator.'],
  ['Z','It’s the building’s.'],
  ['S','I KNOW. Yes. The building has excellent taste.'],
  {wait:0.9},
  ['A','Kettle’s done!'],
  function(){G.zT=0;}
 ],outside({title:'WHAT THE HUMANS SAW',dur:'duration: 6 seconds',cap:'Two people waiting for a kettle.',anim:'text'}),[
  calm,
  ['S','That went terribly.'],
  ['H','She said she likes your edges.'],
  ['S','She said it with a FULL STOP.'],
  ['H','You told her you like her radiator.'],
  ['S','I panicked. It was the nearest thing.'],
  ['H','Same time next week?'],
  ['S','…Tuesday works.',{look:'soft'}]
 ]);}

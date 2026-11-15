/* ================= Lab: A fine. The overdue book goes back. ================= */
var LIBR={body:'#7b8f5a',hair:'#d9d2c4'};
function library(){
  var g=G,i,j,cols=['#b5483a','#2f6b4f','#e2b04a','#55657a','#8a4f6a','#c9c2b0','#62887f'];
  ctx.fillStyle='#e6dcc6';ctx.fillRect(-20,-20,W+40,WALLY+20);
  ctx.fillStyle='#b9a98a';ctx.fillRect(-20,WALLY,W+40,H-WALLY+20);ctx.fillStyle='#9a8b6e';ctx.fillRect(-20,WALLY-6,W+40,6);
  // shelves: three bays of books
  for(j=0;j<3;j++){var sx=40+j*190;ctx.fillStyle='#6b4a34';rr(sx,70,170,WALLY-76,4);ctx.fill();
    for(var r=0;r<4;r++){var sy=84+r*74;ctx.fillStyle='#4f3626';ctx.fillRect(sx+8,sy,154,62);
      var bx=sx+11;for(i=0;bx<sx+154;i++){var bw=9+((i*7+j*5+r*3)%4)*3,bh=42+((i*5+r*7+j)%4)*5;if(bx+bw>sx+160)break;ctx.fillStyle=cols[(i*3+j+r*2)%cols.length];ctx.fillRect(bx,sy+62-bh,bw,bh);bx+=bw+2;}}}
  // window and a sign nobody needs
  ctx.fillStyle='#f4eedb';rr(640,90,150,120,4);ctx.fill();ctx.fillStyle='#a9c0c4';ctx.fillRect(648,98,134,104);ctx.strokeStyle='#f4eedb';ctx.lineWidth=6;line(715,98,715,202);
  ctx.fillStyle='#2f6b4f';rr(820,110,110,44,6);ctx.fill();ctx.fillStyle='#fbf8ef';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 13px system-ui,sans-serif';ctx.fillText('QUIET,',875,124);ctx.fillText('PLEASE',875,141);
  // the librarian stands behind her desk
  var L=g.lib||{};
  person(760,{body:LIBR.body,hair:LIBR.hair,facing:-1,face:L.smile?'smile':'neutral'});
  ctx.fillStyle='#7a5236';rr(650,366,290,14,4);ctx.fill();ctx.fillStyle='#5c3b27';ctx.fillRect(656,380,278,FEETY-374);
  ctx.strokeStyle='#4a2f1f';ctx.lineWidth=2;line(726,386,726,FEETY+4);line(796,386,796,FEETY+4);line(866,386,866,FEETY+4);
  ctx.fillStyle='#2b2733';rr(836,322,62,44,5);ctx.fill();ctx.fillStyle='#9fd3a8';ctx.fillRect(842,328,50,30);ctx.fillStyle='#2b2733';ctx.fillRect(862,366,10,4);
  ctx.fillStyle='#fbf8ef';rr(676,340,54,26,3);ctx.fill();ctx.fillStyle='#5a6559';ctx.font='700 9px system-ui,sans-serif';ctx.fillText('RETURNS',703,353);
  if(L.book){ctx.fillStyle='#55657a';rr(742,354,46,12,2);ctx.fill();ctx.fillStyle='#e2b04a';ctx.fillRect(748,357,20,3);}
}
function labLibrary(){return labScene({set:'library',title:'A fine.',plan:'Return one book. 23 days late.',clock:15*3600+40*60}).concat([
  function(){var g=G;g.lib={book:false,smile:false};g.noCup=true;g.human.x=-40;g.human.xT=420;},{wait:3.8},
  ['N','The library. “A Short History of Lighthouses” is twenty-three days overdue. Today it goes back.'],
  set({mood:'alert',s:1.3}),
  ['S','She’s seen us. Walk normally. Not like that. Like a person who returns things.'],
  ['H','I finished it this morning.'],
  ['S','Twenty-three days. She has had twenty-three days to form an opinion.'],
  {choice:[
    {t:'Use the returns slot and run.',then:[['H','The slot is for people who aren’t standing in front of her.'],['S','Then stand somewhere else.']]},
    {t:'Prepare a statement.',then:[['S','“I take full responsibility. The lighthouses were compelling.”'],['H','I’m not reading a statement to a librarian.']]},
    {t:'Blame page 212.',then:[['H','It WAS page 212.'],['S','Then we have a defence.']]}
  ]},
  function(){G.human.xT=575;},{wait:1.5},
  function(){G.lib.book=true;sfx('clink');},
  ['L','Hello! Returning?'],
  ['H','Yes. It’s… a bit late.'],
  ['L','Let’s see. Twenty-three days. That’ll be a fine.'],
  set({mood:'care',s:1.05}),
  ['S','She says it’s FINE.'],
  ['S','Three weeks of dread, and it’s FINE. I’d like to sit down.'],
  ['H','A fine. Four euros sixty.'],
  hit(0.5,'P'),{wait:1.1},
  ['S','…Oh. THAT kind of fine.'],
  ['S','She is fining us. In public. In front of the large-print section.'],
  calm,
  ['L','Did you like it?'],
  lensPeek({x:760,y:FEETY-150},'FACE: CURIOUS. SUSPICIOUSLY CURIOUS.'),
  set({mood:'alert',s:1.3}),
  ['S','It’s a trap. If we liked it, why did we keep it? If we didn’t, why did we KEEP it?'],
  {choice:[
    {t:'Say “it was fine.”',then:[['H','I’m not saying “fine” in here again.']]},
    {t:'Say nothing. Nod. Leave.',then:[['H','She asked a question.'],['S','Questions are optional.']]},
    {t:'Deny having read it.',then:[['H','For twenty-three days?'],['S','We were looking at the cover. Thoroughly.']]}
  ]},
  ['H','There’s a lighthouse on page 212. I didn’t want to give it back before I’d met it.'],
  {wait:1.2},
  function(){G.lib.smile=true;},
  ['L','Bengtskär! Page 212 is the best page. I kept that book for six weeks.'],
  set({mood:'surprised'}),
  ['S','…SHE kept it for six weeks?'],
  ['L','I work here. I just kept renewing it to myself.'],
  ['S','That’s corruption.'],
  ['H','That’s a recommendation.'],
  ['L','There’s a second volume. More lighthouses. Shall I put you down for it?'],
  ['H','Yes, please.']
 ],outside({title:'WHAT THE LIBRARIAN SAW',dur:'duration: 2 minutes',cap:'A late book, four euros sixty, and somebody else who likes lighthouses.',anim:'text'}),[
  calm,
  ['S','We came in for a telling-off. We’re leaving with a second volume.'],
  ['H','And a due date.'],
  ['S','Twenty-eight days. I’ll start worrying on day twenty-nine.'],
  ['H','Day one.'],
  ['S','…Day one.']
 ]);}

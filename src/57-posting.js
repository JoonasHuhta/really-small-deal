/* ================= The posting: withdrawal, filed as success ================= */
// A rejection that cannot happen because nothing was sent. Ekskyysmi counts this as a perfect record.
// The player still only chooses Ekskyysmi's tactics; the third one is the one where it asks.
function said(){G.nothings=(G.nothings||0)+1;}   // every "it's nothing" the human says this week, for the receipt

function labPosting(){return labScene({set:'home',title:'The posting.',plan:'Read a job posting. Only read it.',clock:22*3600+47*60}).concat([
  ['N','Late. The sofa. A job posting someone forwarded with “this is SO you”.'],
  ['P','Content designer. Small team. Four-day weeks. A library across the street.'],
  ['H','Huh.'],
  ['H','That is… actually me.'],
  set({mood:'alert',s:1.3}),
  ['S','Let’s not be hasty.'],
  ['P','Requirements: excellent communication skills. Attention to detail. Applications by Friday.'],
  ['S','“Excellent.” Not “good”. Excellent.'],
  lensPeek(function(){return {x:G.human.x+22,y:FEETY-100};},'REQUIREMENT: “EXCELLENT”. WE ARE “FINE”.'),
  archive('bad',[['2019','Applied. Heard nothing. Still checking.'],['2021','“We went with someone with more experience.”'],['2023','Got the interview. Said “you too” to “enjoy your weekend”.']]),
  ['S','I’ve pulled the relevant files.'],
  ['H','They’re not relevant. They’re just old.'],
  ['S','Old AND relevant. Very rare. Very valuable.'],
  closeArchive,
  {choice:[
    {t:'Archive it. For safety.',filed:1,f:function(){G.posting='archived';},then:[
      ['S','Done. Filed under “later”.'],
      ['N','The “later” drawer does not close properly. It has not closed properly for years.'],
      ['H','I hadn’t decided anything.'],
      ['S','I decided for both of us. It’s quicker.']]},
    {t:'Pre-write their rejection. Save everyone time.',filed:1,f:function(){G.posting='rejected';},then:[
      ['P','Draft: “Dear applicant. Thank you for your interest. You are too long.”'],
      ['H','They haven’t read anything.'],
      ['S','Neither have I. That’s how confident I am.'],
      ['H','You wrote a rejection. To me. From them.'],
      ['S','In their voice. I did research.']]},
    {t:'…Ask what the human wants.',filed:1,f:function(){G.posting='open';},then:[
      set({mood:'surprised',s:1.05}),
      ['S','What do you… want?'],
      ['H','I want to read it again tomorrow.'],
      ['S','Tomorrow is very far away.'],
      ['H','It’s eleven hours.'],
      ['S','Eleven hours unsupervised. With a TAB open.'],
      ['H','You can supervise. Just don’t close it.']]}
  ]},
  function(){if(G.posting!=='open')addLived('the application, not sent',45);
    return outside({title:'WHAT ACTUALLY HAPPENED',dur:'0 applications',anim:'text',
      cap:G.posting==='open'?'Nobody rejected you tonight. The tab is still open.':'Nobody rejected you tonight. Nobody got the chance.'});},
  calm,
  function(){return G.posting==='open'?[
    ['S','For the record, it’s looking at us.'],
    ['H','It’s a tab.'],
    ['S','A tab with a deadline.'],
    ['H','Friday.'],
    ['S','I know when Friday is. I have a countdown.']
  ]:[
    ['S','Applications sent: zero. Rejections: zero.'],
    ['S','Success rate: one hundred percent.'],
    ['H','Of nothing.'],
    ['S','…It’s still a hundred percent.']
  ];}
]);}

// Friday, after lunch is agreed: the posting comes back, whatever drawer it went into.
function postingPayoff(){
  var p=G.posting;
  if(p==='open')return [
    ['H','And tonight I’m sending that application.'],
    set({mood:'alert'}),
    ['S','I’ll pre-write their—'],
    ['H','You can draft. I’ll send.'],
    set({mood:'calm'}),
    ['S','…Deal. A small one.']
  ];
  if(p)return [
    ['H','And I’m taking that posting out of the drawer.'],
    set({mood:'surprised'}),
    ['S','It’s been filed.'],
    ['H','Then unfile it.'],
    ['S','There’s no form for that.'],
    ['H','Make one.'],
    set({mood:'calm'}),
    ['S','…Draft one. Small. Applications close today.']
  ];
  return [];
}

// Rows the whole-story receipt adds when these moments happened.
function storyRows(){
  var g=G,rows=[];
  if(g.rehearsal)rows.push(['“not now”, rehearsed','3 h 10 min'],['“not now”, actual','4 s']);
  if(g.posting&&g.posting!=='open')rows.push(['applications sent','0 (yet)'],['rejections avoided','1'],['success rate','100 %']);
  if(g.posting==='open')rows.push(['applications','pending']);
  if(g.quiet)rows.push(['one quiet Monday, lived','1.0 days']);
  if(g.nothings)rows.push(['“it’s nothing”, said','×'+g.nothings]);
  // Ekskyysmi’s methods this week: what the player chose, counted. The choices were the joke; this is the bill.
  var M=g.methods||{},ML={worst:'worst cases, prepared',draft:'scripts, drafted',please:'people, pleased',hide:'exits, taken',stay:'times we stayed',hush:'silences, kept'};
  var mk=Object.keys(ML).filter(function(k){return M[k]>0;}).sort(function(a,b){return M[b]-M[a];});
  if(mk.length){rows.push('-',['EKSKYYSMI’S METHODS','']);mk.forEach(function(k){rows.push([ML[k],'×'+M[k]]);});}
  return rows;
}

// Finnish, a pilot (0.89, Joonas 22.11.: "I'd like to try the first scene in Finnish").
// The English line is the key; a line without a Finnish one stays English, so the pilot can cover Monday only.
// Lines are whole sentences (KAANNOS.md): nothing is assembled from pieces. The dictionary itself is FI (16-fi-monday.js).
// 0.99.39 (Joonas 27.11.: "soon we translate into different languages, make sure everything scales"):
// - one dictionary per language in DICT (Finnish is DICT.fi = FI); a new language is a new file that fills DICT.<code>.
// - LOC: what changes besides words (decimal mark, quotation marks).
// - a number inside a string can be a template: “DELETED · TAKE {n}” translates “DELETED · TAKE 14” (numbers go back in order).
// - the canvas paints through trQ (00-core.js): signs, receipts, tags and captions translate like lines, quietly.
// - LANG 'xx' is a pseudo-language for layout tests (Settings, testing mode): every string accented and 40 % longer.
var FI={},FIV={},FIMISS={},DICT={fi:FI};
var LOC={en:{dec:'.',q:['“','”']},fi:{dec:',',q:['”','”']},sv:{dec:',',q:['”','”']},xx:{dec:',',q:['«','»']}};
function loc(){return LOC[LANG]||LOC.en;}
var NUMRX=/\d+(?:[.,]\d+)?/g;
function trNum(s,d){var nums=s.match(NUMRX);if(!nums)return null;var t=d[s.replace(NUMRX,'{n}')];if(!t)return null;var i=0,dec=loc().dec;
  return t.replace(/\{n\}/g,function(){var v=nums[i++];return v==null?'':dec===','?v.replace('.',','):v;});}
function trLook(s){var d=DICT[LANG];if(!d)return null;return d[s]||trNum(s,d);}
function tr(s){
  if(typeof LANG==='undefined'||LANG==='en'||typeof s!=='string'||!s)return s;
  if(LANG==='xx')return pseudo(s);
  var t=trLook(s);if(t)return t;
  if(!(LANG==='fi'&&FIV[s])&&/[A-Za-z]/.test(s))FIMISS[s]=(FIMISS[s]||0)+1;   // the tests read this: what the language still shows in English (0.99.68: a Finnish value counts as Finnish only in Finnish, so the harvest keeps names like SANNA)
  return s;
}
// Quiet: for the canvas. A piece of a line that is already translated (word wrap, typing) is not a missing entry.
function trQ(s){if(typeof LANG==='undefined'||LANG==='en'||typeof s!=='string'||!s||!/[A-Za-z]/.test(s))return s;
  if(LANG==='xx')return pseudo(s);var t=trLook(s);return t||s;}
function fiIndex(){FIV={};for(var k in FI)if(Object.prototype.hasOwnProperty.call(FI,k))FIV[FI[k]]=1;}
// Pseudo-language: accented letters (does the font have them?) and 40 % more length (does the layout?). Placeholders, tags,
// a leading “Name:” of a message and anything already pseudo stay as they are.
var PSEUDO={a:'á',b:'ƀ',c:'ç',d:'đ',e:'é',f:'ƒ',g:'ğ',h:'ĥ',i:'í',j:'ĵ',k:'ķ',l:'ĺ',m:'ɱ',n:'ñ',o:'ö',p:'þ',q:'ʠ',r:'ŕ',s:'š',t:'ţ',u:'ü',v:'ṽ',w:'ŵ',x:'ẋ',y:'ý',z:'ž',
  A:'Å',B:'Ɓ',C:'Ç',D:'Đ',E:'É',F:'Ƒ',G:'Ğ',H:'Ĥ',I:'Í',J:'Ĵ',K:'Ķ',L:'Ĺ',M:'Ṁ',N:'Ñ',O:'Ö',P:'Þ',Q:'Ǫ',R:'Ŕ',S:'Š',T:'Ţ',U:'Ü',V:'Ṽ',W:'Ŵ',X:'Ẋ',Y:'Ý',Z:'Ž'};
function pseudo(s){if(!/[A-Za-z]/.test(s))return s;var m=/^((?:You|[A-Z][a-z]+): )(?=[“(●])/.exec(s),head=m?m[1]:'',body=s.slice(head.length);
  var out=body.replace(/(<[^>]*>|\{\w+\})|([A-Za-z])/g,function(all,keep,ch){return keep||PSEUDO[ch]||ch;});
  var letters=(body.match(/[A-Za-z]/g)||[]).length,pad=Math.round(letters*0.4),words=[];
  while(pad>0){var w=Math.min(pad,6);words.push('ẋẋẋẋẋẋ'.slice(0,w));pad-=w+1;}
  return head+out+(words.length?' '+words.join(' '):'');}
// A receipt row: its label in Finnish (a “ ×3” count stays as it is), the value as it is unless it is words.
function trRow(r){if(!Array.isArray(r))return r;var m=/^(.*?)( ×\d+)?$/.exec(r[0]),v=r[1];if(LANG!=='en'&&typeof v==='string')v=/[A-Za-z]/.test(v)?tr(v):loc().dec===','?v.replace(/(\d)\.(\d)/g,'$1,$2'):v;return [tr(m[1])+(m[2]||''),v].concat(r.slice(2));}   // 0.99.39: a value with words and numbers ('14 h 07 min') is a {n} template

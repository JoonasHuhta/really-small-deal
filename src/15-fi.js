// Finnish, a pilot (0.89, Joonas 22.11.: "I'd like to try the first scene in Finnish").
// The English line is the key; a line without a Finnish one stays English, so the pilot can cover Monday only.
// Lines are whole sentences (KAANNOS.md): nothing is assembled from pieces. The dictionary itself is FI (16-fi-monday.js).
var FI={},FIV={},FIMISS={};
function tr(s){
  if(typeof LANG==='undefined'||LANG!=='fi'||typeof s!=='string'||!s)return s;
  var t=FI[s];if(t)return t;
  if(!FIV[s]&&/[A-Za-z]/.test(s))FIMISS[s]=(FIMISS[s]||0)+1;   // the tests read this: what the pilot still shows in English
  return s;
}
function fiIndex(){FIV={};for(var k in FI)if(Object.prototype.hasOwnProperty.call(FI,k))FIV[FI[k]]=1;}
// A receipt row: its label in Finnish (a “ ×3” count stays as it is), the value as it is unless it is words.
function trRow(r){if(!Array.isArray(r))return r;var m=/^(.*?)( ×\d+)?$/.exec(r[0]),v=r[1];if(LANG==='fi'&&typeof v==='string')v=/[a-z]{3}/.test(v)&&!/\d/.test(v)?tr(v):v.replace(/(\d)\.(\d)/g,'$1,$2');return [tr(m[1])+(m[2]||''),v].concat(r.slice(2));}

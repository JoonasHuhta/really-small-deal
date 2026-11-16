// Joins src/*.js (in file-name order) into assets/game.js, the single file index.html loads.
// Usage: node tools/build.cjs          writes assets/game.js
//        node tools/build.cjs --check  exits 1 if assets/game.js is out of date
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),srcDir=path.join(root,'src'),out=path.join(root,'assets','game.js');
const HEAD="/* GENERATED FILE. Edit the parts in src/ and run: node tools/build.cjs */\n(function(){\n'use strict';\n";
const TAIL="})();\n";
function bundle(){
  const files=fs.readdirSync(srcDir).filter(f=>/^\d\d-.*\.js$/.test(f)).sort();
  if(!files.length)throw new Error('No source files in src/');
  return HEAD+files.map(f=>'// ---- src/'+f+' ----\n'+fs.readFileSync(path.join(srcDir,f),'utf8').replace(/\r\n/g,'\n').replace(/\n*$/,'\n')).join('')+TAIL;
}
// index.html asks for game.js and game.css with ?v=<package version>, so a browser that cached the last version
// fetches the new one instead of mixing an old game with a new page (GitHub Pages caches for ten minutes).
const indexPath=path.join(root,'index.html');
function version(){return JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version;}
function stamped(html){const v=version();return html.replace(/assets\/game\.js(\?v=[^"']*)?/,'assets/game.js?v='+v).replace(/assets\/game\.css(\?v=[^"']*)?/,'assets/game.css?v='+v);}
function indexFresh(){const h=fs.readFileSync(indexPath,'utf8');return h===stamped(h);}
function fresh(){return fs.existsSync(out)&&fs.readFileSync(out,'utf8').replace(/\r\n/g,'\n')===bundle()&&indexFresh();}
function build(){fs.writeFileSync(out,bundle());const h=fs.readFileSync(indexPath,'utf8');if(h!==stamped(h))fs.writeFileSync(indexPath,stamped(h));return out;}
module.exports={bundle,fresh,build};
if(require.main===module){
  if(process.argv.includes('--check')){if(!fresh()){console.error('assets/game.js or the version stamp in index.html is out of date. Run: node tools/build.cjs');process.exit(1);}console.log('assets/game.js is up to date.');}
  else{build();console.log('Built assets/game.js from src/ ('+fs.readdirSync(srcDir).filter(f=>/^\d\d-.*\.js$/.test(f)).length+' parts).');}
}

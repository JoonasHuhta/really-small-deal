// Copies exactly what the game needs into www/, the folder Capacitor packs into the Android app.
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),out=path.join(root,'www');
if(path.relative(root,path.resolve(out))!=='www')throw new Error('Unsafe output directory');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const f of ['index.html','manifest.webmanifest','webview-error.html'])fs.copyFileSync(path.join(root,f),path.join(out,f));
// assets/branding holds large source artwork (logo, store icon). The game does not load it, so it stays out of the app.
// Audio goes in only if game.js names it: a track that was tried and dropped (monday.mp3) can sit in the folder without growing the app.
const gameJs=fs.readFileSync(path.join(root,'assets','game.js'),'utf8');
const used=src=>path.basename(path.dirname(src))!=='audio'||gameJs.includes('assets/audio/'+path.basename(src));
fs.cpSync(path.join(root,'assets'),path.join(out,'assets'),{recursive:true,filter:src=>path.basename(src)!=='branding'&&path.basename(src)!=='share.png'&&used(src)});   // share.png is the link-preview card for the web
let n=0;(function count(d){for(const e of fs.readdirSync(d,{withFileTypes:true}))e.isDirectory()?count(path.join(d,e.name)):n++;})(out);
console.log('www/ ready: '+n+' files.');

// Copies exactly what the game needs into www/, the folder Capacitor packs into the Android app.
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),out=path.join(root,'www');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const f of ['index.html','manifest.webmanifest'])fs.copyFileSync(path.join(root,f),path.join(out,f));
// assets/branding holds large source artwork (logo, store icon). The game does not load it, so it stays out of the app.
fs.cpSync(path.join(root,'assets'),path.join(out,'assets'),{recursive:true,filter:src=>path.basename(src)!=='branding'});
let n=0;(function count(d){for(const e of fs.readdirSync(d,{withFileTypes:true}))e.isDirectory()?count(path.join(d,e.name)):n++;})(out);
console.log('www/ ready: '+n+' files.');

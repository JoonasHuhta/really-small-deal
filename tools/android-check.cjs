// Verify the actual assets that Capacitor will package, not just the source folder.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),web=path.join(root,'www'),native=path.join(root,'android','app','src','main');
const packed=path.join(native,'assets','public'),config=require('../capacitor.config.json');
assert.ok(require('./build.cjs').fresh(),'Run npm run android:sync: game bundle is stale');
assert.ok(fs.existsSync(packed),'Run npm run android:init first');
assert.ok(!config.server?.url,'APK must load bundled files, not a development server');
let count=0;
function compare(dir,rel=''){
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const name=path.join(rel,e.name),file=path.join(dir,e.name);
    if(e.isDirectory())compare(file,name);
    else{assert.ok(fs.readFileSync(file).equals(fs.readFileSync(path.join(packed,name))),`Stale native file: ${name}`);count++;}
  }
}
compare(web);
for(const name of ['index.html','manifest.webmanifest','webview-error.html','assets/game.js','assets/game.css']){
  assert.ok(fs.readFileSync(path.join(root,name)).equals(fs.readFileSync(path.join(web,name))),`Stale www file: ${name}`);
}
function local(ref,base){
  if(/^(data:|#)/.test(ref))return;
  assert.ok(!/^(https?:)?\/\//.test(ref),`Remote runtime dependency: ${ref}`);
  assert.ok(fs.statSync(path.resolve(base,ref.split(/[?#]/)[0])).size>0,`Missing resource: ${ref}`);
}
const html=fs.readFileSync(path.join(packed,'index.html'),'utf8');
for(const m of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)=["']([^"']+)/g))local(m[1],packed);
const css=fs.readFileSync(path.join(packed,'assets','game.css'),'utf8');
for(const m of css.matchAll(/url\(["']?([^)'"\s]+)/g))local(m[1],path.join(packed,'assets'));
const manifest=JSON.parse(fs.readFileSync(path.join(packed,'manifest.webmanifest')));
for(const icon of manifest.icons)local(icon.src,packed);
assert.ok(fs.existsSync(path.join(packed,config.server.errorPath)),'WebView help must work offline');
const plugins=JSON.parse(fs.readFileSync(path.join(native,'assets','capacitor.plugins.json')));
assert.ok(plugins.some(p=>p.pkg==='@capacitor/app'),'App plugin missing: back/pause will not work');
assert.ok(plugins.some(p=>p.pkg==='@capacitor/filesystem')&&plugins.some(p=>p.pkg==='@capacitor/share'),'Filesystem/Share plugins missing: the receipt picture falls back to text (run npm ci, then npm run android:sync)');
assert.match(fs.readFileSync(path.join(native,'AndroidManifest.xml'),'utf8'),/androidx\.core\.content\.FileProvider/,'No FileProvider: the receipt picture cannot be shared (run tools/android-patch.cjs)');
assert.match(fs.readFileSync(path.join(native,'res','xml','file_paths.xml'),'utf8'),/<cache-path\b/,'file_paths.xml has no cache path: the receipt picture cannot be shared');
assert.deepEqual(JSON.parse(fs.readFileSync(path.join(native,'assets','capacitor.config.json'))),config,'Capacitor config is stale');
assert.match(fs.readFileSync(path.join(native,'AndroidManifest.xml'),'utf8'),/android:screenOrientation="sensorLandscape"/);
assert.match(fs.readFileSync(path.join(native,'AndroidManifest.xml'),'utf8'),/<application\b[^>]*android:name="\.GameApp"/,'Whole-screen mode is not registered');
assert.ok(fs.existsSync(path.join(native,'java',...config.appId.split('.'),'GameApp.java')),'GameApp.java is missing');
assert.match(fs.readFileSync(path.join(native,'java',...config.appId.split('.'),'GameApp.java'),'utf8'),/FLAG_KEEP_SCREEN_ON/,'The screen would go dark mid-game: run tools/android-patch.cjs');
assert.equal(config.android.adjustMarginsForEdgeToEdge,'disable','The page handles its own safe areas');
const gradle=fs.readFileSync(path.join(root,'android','app','build.gradle'),'utf8');
assert.ok(gradle.includes('versionName "'+require('../package.json').version+'"'),'APK version is stale');
console.log(`PASS: ${count} bundled files match; local fonts/icons, offline entry, App, Filesystem and Share plugins, receipt FileProvider, landscape, whole-screen mode, screen kept on and version checked.`);

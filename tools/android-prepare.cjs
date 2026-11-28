// Reusable: never delete or recreate an existing native project.
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const cap=require.resolve('@capacitor/cli/bin/capacitor');
const run=(file,args)=>execFileSync(process.execPath,[file,...args],{cwd:root,stdio:'inherit'});
const created=!fs.existsSync(path.join(root,'android'));
if(created)run(cap,['add','android']);
run(cap,['sync','android']);
// 0.99.59: the icons are generated again whenever their sources in resources/ are newer than the native project's copy,
// so a new icon reaches the APK through build-apk without a separate step. icon-only.png is the legacy (pre-Android 8) icon.
const made=path.join(root,'android','app','src','main','res','mipmap-xxxhdpi','ic_launcher_foreground.png');
const mtime=f=>{try{return fs.statSync(f).mtimeMs;}catch(e){return 0;}};
const sources=['icon-only.png','icon-foreground.png','icon-background.png'].map(f=>mtime(path.join(root,'resources',f)));
if(created||Math.max(...sources)>mtime(made)){
  const assets=path.join(root,'node_modules','@capacitor','assets','bin','capacitor-assets');
  run(assets,['generate','--android','--assetPath','resources','--iconBackgroundColor','#202830','--splashBackgroundColor','#12171b']);
}
run(path.join(__dirname,'android-patch.cjs'),[]);

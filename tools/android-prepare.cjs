// Reusable: never delete or recreate an existing native project.
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const cap=require.resolve('@capacitor/cli/bin/capacitor');
const run=(file,args)=>execFileSync(process.execPath,[file,...args],{cwd:root,stdio:'inherit'});
const created=!fs.existsSync(path.join(root,'android'));
if(created)run(cap,['add','android']);
run(cap,['sync','android']);
run(path.join(__dirname,'android-patch.cjs'),[]);
if(created){
  const assets=path.join(root,'node_modules','@capacitor','assets','bin','capacitor-assets');
  run(assets,['generate','--android','--assetPath','resources','--iconBackgroundColor','#202830','--splashBackgroundColor','#12171b']);
}

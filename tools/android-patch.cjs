// Run after `npx cap add android` (npm run android:init does it for you). Safe to run again.
// 1. Locks the app to landscape.  2. Hides the status bar.
const fs=require('fs'),path=require('path');
const app=path.join(__dirname,'..','android','app','src','main');
if(!fs.existsSync(app)){console.error('No android/ folder yet. Run: npm run android:init');process.exit(1);}
const mf=path.join(app,'AndroidManifest.xml');let m=fs.readFileSync(mf,'utf8');
if(!/android:screenOrientation=/.test(m)){
  if(!/<activity\b/.test(m))throw new Error('No <activity> in AndroidManifest.xml');
  m=m.replace(/<activity\b/,'<activity\n            android:screenOrientation="sensorLandscape"');fs.writeFileSync(mf,m);console.log('AndroidManifest.xml: landscape lock added.');
}else console.log('AndroidManifest.xml: orientation already set.');
const st=path.join(app,'res','values','styles.xml');let s=fs.readFileSync(st,'utf8');
if(!/android:windowFullscreen/.test(s)){
  const re=/(<style name="AppTheme\.NoActionBar"[^>]*>)/;
  if(!re.test(s))throw new Error('AppTheme.NoActionBar not found in styles.xml');
  s=s.replace(re,'$1\n        <item name="android:windowFullscreen">true</item>');fs.writeFileSync(st,s);console.log('styles.xml: status bar hidden.');
}else console.log('styles.xml: fullscreen already set.');
// Android version follows package.json, so APK updates can be distinguished on a phone.
const pkg=require('../package.json'),version=pkg.version.split('.').map(Number);
if(version.length!==3||version.some(n=>!Number.isInteger(n)||n<0||n>=1000))throw new Error('Invalid app version');
const code=version[0]*1000000+version[1]*1000+version[2];
const gradle=path.join(app,'..','..','build.gradle');
let g=fs.readFileSync(gradle,'utf8');
g=g.replace(/versionCode\s+\d+/,'versionCode '+code).replace(/versionName\s+"[^"]+"/,'versionName "'+pkg.version+'"');
fs.writeFileSync(gradle,g);

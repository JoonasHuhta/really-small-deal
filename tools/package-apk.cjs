// Only called after a successful Gradle build. Keep a clearly versioned copy for phone testing.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),version=require('../package.json').version;
if(!/^\d+\.\d+\.\d+$/.test(version))throw Error('Invalid version');
const source=path.join(root,'android/app/build/outputs/apk/debug/app-debug.apk');
const metadata=JSON.parse(fs.readFileSync(path.join(path.dirname(source),'output-metadata.json')));
if(!metadata.elements.some(e=>e.versionName===version))throw Error('APK version differs from package.json. Build again.');
const out=path.join(root,'dist');fs.mkdirSync(out,{recursive:true});
const target=path.join(out,'Really-Small-Deal-'+version+'-debug.apk');
fs.copyFileSync(source,target);
const hash=crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex');
fs.writeFileSync(target+'.sha256',hash+'  '+path.basename(target)+'\n');
console.log('APK: '+target+'\nSHA-256: '+hash);

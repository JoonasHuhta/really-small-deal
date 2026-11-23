// Run after `npx cap add android` (npm run android:init does it for you). Safe to run again.
// 1. Locks the app to landscape.  2. Hides the status bar.  3. Uses the whole screen (GameApp.java).
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
// 3. The whole screen. Hides the navigation bar as well as the status bar, and lets the window run under the camera cutout,
//    so no strip is left at the side in landscape. Done from an Application class, so MainActivity is never edited.
//    It also keeps the screen on while the game is in front: nobody wants the phone to go dark mid-sentence.
const appId=require('../capacitor.config.json').appId,pkgDir=path.join(app,'java',...appId.split('.'));
const gameApp=`package ${appId};

import android.app.Activity;
import android.app.Application;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewTreeObserver;
import android.view.Window;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import java.util.WeakHashMap;

/** Written by tools/android-patch.cjs. Edit it there, not here. */
public class GameApp extends Application {
    private static final WeakHashMap<Activity, Boolean> WATCHED = new WeakHashMap<>();

    @Override
    public void onCreate() {
        super.onCreate();
        registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
            @Override public void onActivityCreated(Activity a, Bundle b) {}
            @Override public void onActivityStarted(Activity a) {}
            @Override public void onActivityResumed(final Activity a) {
                fill(a);
                if (WATCHED.put(a, Boolean.TRUE) == null) {
                    a.getWindow().getDecorView().getViewTreeObserver().addOnWindowFocusChangeListener(
                        new ViewTreeObserver.OnWindowFocusChangeListener() {
                            @Override public void onWindowFocusChanged(boolean hasFocus) { if (hasFocus) fill(a); }
                        });
                }
            }
            @Override public void onActivityPaused(Activity a) {}
            @Override public void onActivityStopped(Activity a) {}
            @Override public void onActivitySaveInstanceState(Activity a, Bundle b) {}
            @Override public void onActivityDestroyed(Activity a) {}
        });
    }

    static void fill(Activity a) {
        Window w = a.getWindow();
        if (w == null) return;
        View decor = w.getDecorView();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            WindowManager.LayoutParams lp = w.getAttributes();
            if (lp.layoutInDisplayCutoutMode != WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES) {
                lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
                w.setAttributes(lp);
            }
        }
        w.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);   // only while this window is visible; Android drops it in the background
        decor.setBackgroundColor(Color.parseColor("#0d1114"));
        WindowCompat.setDecorFitsSystemWindows(w, false);
        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(w, decor);
        c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
        c.hide(WindowInsetsCompat.Type.systemBars());
    }
}
`;
if(!fs.existsSync(pkgDir))throw new Error('Java package folder not found: '+pkgDir);
const ga=path.join(pkgDir,'GameApp.java');
if(!fs.existsSync(ga)||fs.readFileSync(ga,'utf8')!==gameApp){fs.writeFileSync(ga,gameApp);console.log('GameApp.java: whole-screen mode written.');}
else console.log('GameApp.java: already up to date.');
m=fs.readFileSync(mf,'utf8');
const appTag=m.match(/<application\b[^>]*>/);
if(!appTag)throw new Error('No <application> in AndroidManifest.xml');
if(!/android:name=/.test(appTag[0])){
  m=m.replace(/<application\b/,'<application\n        android:name=".GameApp"');fs.writeFileSync(mf,m);console.log('AndroidManifest.xml: GameApp registered.');
}else if(/android:name="\.GameApp"/.test(appTag[0]))console.log('AndroidManifest.xml: GameApp already registered.');
else console.warn('AndroidManifest.xml: <application> already has another android:name. Whole-screen mode NOT installed; call GameApp.fill(this) from that class.');
// Android version follows package.json, so APK updates can be distinguished on a phone.
const pkg=require('../package.json'),version=pkg.version.split('.').map(Number);
if(version.length!==3||version.some(n=>!Number.isInteger(n)||n<0||n>=1000))throw new Error('Invalid app version');
const code=version[0]*1000000+version[1]*1000+version[2];
const gradle=path.join(app,'..','..','build.gradle');
let g=fs.readFileSync(gradle,'utf8');
g=g.replace(/versionCode\s+\d+/,'versionCode '+code).replace(/versionName\s+"[^"]+"/,'versionName "'+pkg.version+'"');
fs.writeFileSync(gradle,g);
// Keep the magnifier legible under Android launcher masks. The source artwork
// already includes clear space around the handle and lens.
const adaptiveIcon = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background" />
    <foreground>
        <inset android:drawable="@mipmap/ic_launcher_foreground" android:inset="10%" />
    </foreground>
</adaptive-icon>
`;
for(const file of ['ic_launcher.xml','ic_launcher_round.xml']){
  fs.writeFileSync(path.join(app,'res','mipmap-anydpi-v26',file),adaptiveIcon);
}

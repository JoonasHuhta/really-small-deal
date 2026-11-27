// Shared DOM/canvas stand-in for story regressions and the deterministic pace estimate.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
module.exports=function makeHarness(){
const gradient = {addColorStop(){}};
let painted=null;   // 0.99.39: what reaches the canvas, when a test asks (startPaint)
const ctx = new Proxy({}, {get(o,k){
  if(k==='measureText') return t=>({width:t.length*8});
  if((k==='fillText'||k==='strokeText')&&!(k in o)) return t=>{if(painted&&typeof t==='string')painted.push(t);};
  if(k==='createLinearGradient'||k==='createRadialGradient') return ()=>gradient;
  return o[k] ?? (()=>{});
}, set(o,k,v){o[k]=v;return true;}});
const els = new Map();
function element(id){
  if(els.has(id))return els.get(id);
  const classes=new Set();
  const el={id,tagName:'DIV',dataset:{},style:{},events:{},clientWidth:960,innerHTML:'',textContent:'',open:false,remove(){},
    classList:{add(x){classes.add(x)},remove(x){classes.delete(x)},contains(x){return classes.has(x)},toggle(x,v){v??=!classes.has(x);v?classes.add(x):classes.delete(x)}},
    addEventListener(k,f){(this.events[k]??=[]).push(f)},setAttribute(k,v){this[k]=v},getAttribute(k){return this[k]},
    getContext(){return ctx},getBoundingClientRect(){return{top:0,left:0,width:960,height:540}},setPointerCapture(){},
    style:{props:{},setProperty(k,v){this.props[k]=v}},
    querySelector(){return element('focus')},focus(){},showModal(){this.open=true},close(){this.open=false;fire(this,'close',{})}};
  Object.defineProperty(el,'className',{get(){return [...classes].join(' ')},set(value){classes.clear();for(const c of value.split(/\s+/))if(c)classes.add(c)}});
  els.set(id,el);return el;
}
function fire(el,event,payload){for(const fn of el.events[event]??[])fn(payload)}
const document={getElementById:element,body:element('body'),documentElement:Object.assign(element('html'),{requestFullscreen(){}}),hidden:false,events:{},addEventListener(k,f){(this.events[k]??=[]).push(f)}};
const savedItems=new Map();
const window={localStorage:{getItem(k){return savedItems.get(k)??null},setItem(k,v){savedItems.set(k,String(v))}},devicePixelRatio:1,events:{},matchMedia(q){const narrow=/max-height/.test(q);return{get matches(){return narrow?!!window.__narrow:false},addEventListener(){},addListener(){}}},requestAnimationFrame(){},addEventListener(k,f){(this.events[k]??=[]).push(f)}};
const nativeListeners={};const nativeState={exits:0};
window.Capacitor={Plugins:{App:{addListener(k,f){nativeListeners[k]=f;},exitApp(){nativeState.exits++;}}}};
const sandbox={window,document,console,Math};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/game.js'),'utf8'),sandbox);
const T=window.__T;
return {T,window,document,element,fire,savedItems,nativeListeners,nativeState,ctx,startPaint(){painted=[];},painted(){return painted||[];}};
};

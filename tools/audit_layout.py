# Phone layout audit: opens the game at five landscape phone sizes in many states, reports overflow, off-screen or
# too-small buttons and JS errors, and saves a screenshot of every state to tools/audit-shots/ (not in git).
# Needs Python 3 + Playwright:  pip install playwright && playwright install chromium
# Run from the repo root:       python tools/audit_layout.py            (all states)
#                               python tools/audit_layout.py bar quiet  (only these states)
# CHROME=/path/to/chrome uses that browser instead of Playwright's own Chromium.
import asyncio,json,sys,os,pathlib
from playwright.async_api import async_playwright
SIZES=[(640,360),(740,360),(844,390),(915,412),(1024,480)]
SAVE=json.dumps({"version":2,"ch":3,"unlocked":5,"chapters":{str(i):{"day":"B"} for i in range(1,6)}})
DRIVE='''([target,pick])=>{const T=__T;window.requestAnimationFrame=()=>0;window.__ts=(window.__ts||performance.now()+1e6);let g=0;
 const ok=()=>{const s=T.state(); if(target==='choice4')return s==='choice'&&T.nopts()>=4; if(target==='longline')return s==='click'&&T.G.cur&&T.G.cur.text.length>95; if(target==='paced')return s==='fight'&&T.G.fight.paced&&T.G.fight.t>0.5; if(target==='flow')return s==='fight'&&!T.G.fight.paced&&T.G.fight.t>4; if(target==='chatlog')return s==='view'&&T.G.out&&T.G.out.anim==='chatlog'&&T.G.out.t>2; if(target==='ended')return T.G.ended; return s===target;};
 while(g++<30000&&!ok()){window.__ts+=33;T.frame(window.__ts);const s=T.state();
  if(s==='click'||(s==='view'&&T.G.out&&T.G.out.t>2.6)){T.unlock();T.advance();}
  else if(s==='choice'){T.unlock();T.choose(Math.min(pick,T.nopts()-1));}
  else if(s==='stretch'){T.unlock();T.advance();}
  else if(s==='hold'){T.holdDown();}
  else if(s==='fight'&&target!=='paced'&&target!=='flow'&&g%7===0){T.unlock();T.swat();}
  if(T.G.ended&&target!=='ended')break;}
 for(let i=0;i<6;i++){window.__ts+=33;T.frame(window.__ts);}
 return ok();}'''
CHECK='''()=>{const vw=innerWidth,vh=innerHeight,out=[];const de=document.documentElement;
 if(de.scrollHeight>vh+1||de.scrollWidth>vw+1)out.push('page scrolls '+de.scrollWidth+'x'+de.scrollHeight);
 const pp=document.querySelector('#play-panel');if(pp&&getComputedStyle(pp).display!=='none'&&pp.scrollHeight>pp.clientHeight+1)out.push('panel overflows by '+(pp.scrollHeight-pp.clientHeight));
 const ov=document.querySelector('#ov');/* long lists (Moments, Scenario lab) are meant to scroll; it must start at the top */if(ov.classList.contains('on')&&ov.scrollTop>1)out.push('overlay opens scrolled');if(ov.classList.contains('on')&&!ov.querySelector('.lab-list .lab:nth-child(7)')&&ov.scrollHeight>ov.clientHeight+1)out.push('overlay scrolls by '+(ov.scrollHeight-ov.clientHeight));
 const vis=e=>{const r=e.getBoundingClientRect(),cs=getComputedStyle(e);return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&cs.display!=='none';};
 document.querySelectorAll('button').forEach(b=>{if(!vis(b))return;let p=b;while(p){if(p.tagName==='DIALOG'&&!p.open)return;p=p.parentElement;}const r=b.getBoundingClientRect();const name=(b.textContent||b.id).trim().slice(0,22);
   const inScroll=b.closest('#ov')||b.closest('.chat-transcript')||b.closest('dialog');
   if(!inScroll&&(r.left<-1||r.top<-1||r.right>vw+1||r.bottom>vh+1))out.push('off-screen: '+name+' '+Math.round(r.right)+','+Math.round(r.bottom));
   if(r.height<43)out.push('small target '+Math.round(r.height)+'px: '+name);});
 const cv=document.querySelector('#c').getBoundingClientRect();if(cv.right>vw+1||cv.bottom>vh+1||cv.width<300)out.push('canvas '+Math.round(cv.width)+'x'+Math.round(cv.height));
 const nav=[...document.querySelectorAll('nav button')].filter(vis).map(b=>b.getBoundingClientRect());
 for(let i=1;i<nav.length;i++){const a=nav[i-1],b=nav[i];const sameRow=b.top<a.bottom-1&&b.bottom>a.top+1;if(sameRow&&b.left<a.right-1)out.push('nav buttons overlap');}
 return out;}'''
FI="(()=>{const l=document.getElementById('lang');l.value='fi';l.dispatchEvent(new Event('change'));})()"   # the real menu path
STATES=[
 ('title',None,None,0),('title-save',None,None,0),('about',"__T.about()",None,0),('chapters',"__T.chapters()",None,0),('lab-list',"__T.labList()",None,0),('moments',"localStorage.setItem('ekskyysmi.save',JSON.stringify({version:2,ch:5,unlocked:5,chapters:{1:{},2:{},3:{},4:{},5:{}}}));__T.moments()",None,0),
 ('intro-skip',"__T.start()",'time',0),('longline',"__T.start('B',true)",'longline',0),('choice',"__T.start('B',true)",'choice',0),('stretch',"__T.start('B',true)",'stretch',0),('hold',"__T.start('B',true)",'hold',1),
 ('choice4',"__T.chapter(3)",'choice4',0),('fight-flow',"__T.lab('comments')",'flow',0),('fight-paced',"__T.lab('comments')",'paced',1),('chatlog',"__T.lab('comments')",'chatlog',1),
 ('glass',"__T.lab('glass')",'choice',0),('bar',"__T.lab('bar')",'choice',0),('lab-end',"__T.lab('enhance')",'ended',0),('monday-end',"__T.start('B',true)",'ended',0),
 ('paused',"__T.start('B',true)",'choice',0),('restart-confirm',"__T.start('B',true)",'choice',0),('journal',"__T.start('B',true)",'choice',0),('menu-open',"__T.start('B',true)",'choice',0),('voice',"__T.lab('voice')",'click',0),('quiet',"__T.lab('quiet')",'auto',0),('form',"__T.lab('form')",'choice',0),('night',"__T.lab('night')",'click',0),('rewind',"__T.lab('rewind')",'choice',0),('week-end',"__T.chapter(5)",'ended',0),
 # 0.89: the Finnish pilot (Monday). Finnish lines run longer, so the same Monday states again in Finnish.
 ('fi-longline',FI+";__T.start('B',true)",'longline',0),('fi-choice',FI+";__T.start('B',true)",'choice',0),('fi-qte',FI+";__T.start('B',true)",'qte',0),
 ('fi-hold',FI+";__T.start('B',true)",'hold',1),('fi-monday-end',FI+";__T.start('B',true)",'ended',0),('fi-intro',FI+";__T.start()",'time',0),('fi-title',FI,None,0),('fi-menu',FI+";__T.start('B',true)",'choice',0)]
async def main():
    only=sys.argv[1:] 
    async with async_playwright() as p:
        kw={'args':['--no-sandbox','--allow-file-access-from-files']}
        if os.environ.get('CHROME'):kw['executable_path']=os.environ['CHROME']
        b=await p.chromium.launch(**kw)
        for (w,h) in SIZES:
            for name,setup,target,pick in STATES:
                if only and name not in only: continue
                ctx=await b.new_context(viewport={'width':w,'height':h},device_scale_factor=2,has_touch=True,is_mobile=True)
                pg=await ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
                await pg.goto(INDEX)
                if name in('title-save','chapters'):
                    await pg.evaluate("s=>localStorage.setItem('ekskyysmi.save',s)",SAVE); await pg.reload()
                await pg.wait_for_timeout(250)
                if setup: await pg.evaluate(setup)
                ok=True
                if target: ok=await pg.evaluate(DRIVE,[target,pick])
                if name in('menu-open','fi-menu'): await pg.tap('#menu')
                if name=='paused':
                    await pg.tap('#menu'); await pg.tap('#pause')
                if name=='restart-confirm':
                    await pg.tap('#menu'); await pg.tap('#restart')
                if name=='journal':
                    await pg.tap('#menu'); await pg.tap('#journal')
                await pg.wait_for_timeout(150)
                issues=await pg.evaluate(CHECK)
                if not ok: issues.append('STATE NOT REACHED')
                if errs: issues.append('JS: '+errs[0][:80])
                if issues or (w,h) in((740,360),): 
                    if issues: print(f'{w}x{h} {name}: '+' | '.join(issues))
                await pg.screenshot(path=str(OUT/f'{w}_{name}.png'))
                await ctx.close()
        await b.close()
ROOT=pathlib.Path(__file__).resolve().parent.parent
INDEX=(ROOT/'index.html').as_uri()
OUT=ROOT/'tools'/'audit-shots'
OUT.mkdir(exist_ok=True)
asyncio.run(main())

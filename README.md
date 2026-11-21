# Really Small Deal (varjo: Ekskyysmi)

Pieniä hetkiä yhdestä tavallisesta elämästä. Pelaat Ekskyysmiä, ylisuojelevaa varjoa. Komedia torjutuksi tulemisen herkkyydestä (RSD).

**Pelaa selaimessa: https://joonashuhta.github.io/really-small-deal/**

Ei asennusta, ei kirjautumista. Toimii puhelimella vaakasuunnassa ja tietokoneella.

## Pelaa paikallisesti

Avaa **[index.html](index.html)** selaimessa. Prototyyppi 0.41 toimii paikallisesti ilman asennusta tai verkkoyhteyttä. Kieli on edelleen englanti. Vanha `taukohuone.html` ohjaa tähän versioon.

**Pelin ydin (14.11.):** varjo ei opeta eikä anna vinkkejä, se vain yrittää suojella, kuten AwA:n susi. Huumori syntyy mittakaavasta: sisällä katastrofi, ulkona kaksi sekuntia. Vitsit kohdistuvat varjon byrokratiaan, arkistoon, välimerkkeihin, ylisuojeluun ja omaan arvokkuuteen, eivät ihmisen kipuun eikä toisten aitoon julmuuteen. Päämäärä on, että pelaaja nauraa, tunnistaa itsensä ja näkee lopussa suhteen muuttuvan: korjaamisesta pysymiseen.

**Pelin nimi on Really Small Deal** (15.11.2026). Varjon nimi on edelleen Ekskyysmi.

Versio 0.72.0 (Claude, 21.11.2026): **”Fine.”, kirjasto paikalleen, mukin ja kellon jatkuvuus.** Joonas antoi päätösvallan avoimissa kohdissa.
- **Tiuskaisu Sannalle (Joonas: pakko tapahtua, koska RSD:stä ja maskaamisesta ei pääse, jos aina miellyttää muita):** keskiviikkona ihminen sanoo kyllä kaikille muille. Klo 00:19 varjo on nukahtanut, ja Sanna viestittää: ”Still up?? Game night tomorrow! You don’t have to bring anything.” Ihminen vastaa ”Fine.” pisteellä. Sanna: ”Oh. Okay!”, eli nyt Sanna saa oman ”oh”-hetkensä. Kertoja: ”Nothing gets filed.” Pelissä jo olleelle langalle tuli lähettäjä: yövuorossa Sannan varjo sanoo ”Someone said ’fine’”, eikä Ekskyysmi tiedä, että se olimme me. Perjantaina Sanna: ”Someone says ’fine’ and I’m up till three.”, ja ihminen korjaa omin sanoin: ”That one was all me. I had nothing left that night. It wasn’t about you.” Ekskyysmi: ”I file every ’oh’ we get. I never noticed one we gave.” Tiuskaisu ei ole valinta, ja korjaus on ihmisen, ei varjon.
- **Kirjasto (#15 A fine.) siirtyi ennen lomaketta.** *Evenings* (”THE SAME DAY”) on taas hiljaisen maanantain ilta.
- **Muki:** tiistai päättyy siihen, että kehut löytyvät (+1, taso 2). Keskiviikko alkaa samasta tasosta tuntia myöhemmin, saa oman tunnin kuulokkeilla (+1), ja sitten kaiutinpuhelin vie sen (−1). Yön yli tulee aina +1.
- **Kello:** keskiviikon 00:12 ja 00:19 näkyvät myös leimassa (THURSDAY). Uusi testi `tests/clock.test.cjs` pelaa koko tarinan ja vaatii, että jokainen kertojan kellonaika vastaa leimaa.
- **Päätökset (TARINAKARTTA §8):** ei kaupungin nimeä; ihmisellä kahvi ja Eerolla tee, eikä kahvi koskaan täytä mukia; hetkissä ei mukia; ensimmäinen diili tulee päivään; ”mug or door?” on ihmisen oma keksintö.
- Kesto 49:41.

Versio 0.71.0 (Claude, 21.11.2026): **tarinakartta ja suojatestit.**
- Uusi TARINAKARTTA.md on totuus pelin järjestyksestä ja nimistä. Siinä on 24 riviä numeroituna (päivät, hetket ja osakortit), kunkin kortti, kello ja paikat, mitä kohtaus vie eteenpäin ja kesto. Mukana ovat myös nimisopimus, kolme kohtaustyyppiä (hetket eivät ole takaumia), kolme aikaa, langat ja liput, löydetyt aukot, hahmot sekä päätetty suunta B. story.test tarkistaa, että kartan järjestys on sama kuin koodin.
- Suojatestit: maanantain ja perjantain ulkoversioriimi, *Not now* heti torstain jälkeen uuden työn haaroineen, ei-lanka, kissa ja mukin periaate (piiloutumisvaihtoehto ei koske mukiin). Kokeiltu rikkomalla tahallaan: build kaatuu.
- Labraprototyyppi *A Tuesday, with a mug.*: kysymys ”Is that the mug talking, or the door?” on nyt ihmisen repliikki eikä kaiu Ekskyysmin suussa ”Ask:”-sanoineen. Tarinaan ei muutoksia.
- VISIO.md: otsikko ”Tyhjä muki herättää RSD:n ruman puolen”. Ovi tarkoittaa pelissä aina torjuntaa.
- Löydetty eikä korjattu (TARINAKARTTA §6): *Evenings* ”THE SAME DAY” kertoo hiljaisesta maanantaista, mutta edellä on kirjasto ”A SATURDAY, WEEKS LATER”. Lisäksi muki täyttyy 1 → 4 keskiviikkoaamuna klo 9:12–10:20.

Versio 0.70.0 (Claude, 20.11.2026): **tiistain musiikki, päiväleima, maanantai päättyy sisällä.**
- Musiikki: Joonaksen *Ordinary Evening* (assets/audio/ordinary-evening.mp3, kansikuva riisuttu) soi koko tiistain (luku 2) ajan: alkaa 1,5 s viiveellä, nousee 2 s:ssa, voimakkuus 0.2, ei väisty puheen eikä iskujen alta, looppaa (190 s), jatkuu kohtausvaihtojen yli (klo 16:55 → 03:07 → 9:00) ja häivyttyy, kun seuraava hetki alkaa. Mekanismi: CHAPTERS[n].music → G.chapMusic; MUSICDELAY, MUSICNODUCK.
- Päiväleima: vasemmassa yläkulmassa pieni ”TUESDAY · 16:55”. Kirkkaampi 4 s leikkauksen jälkeen, sitten himmeä. Kello kulkee. Puolenyön yli leikattaessa viikonpäivä vaihtuu itse (tiistain yö ja ”quick chat” ovat siis WEDNESDAY). Hetkissä leimana on hetken oma aika (”A SUNDAY, LATE AFTERNOON”, ilman kellonaikaa tekstissä). Baarin jälkeinen aamu: THE NEXT MORNING. Hiljaisen päivän toimisto: MONDAY.
- Maanantai: ovella sanotaan vielä ”Is there toast?”, sitten häivytys ja leikkaus kotiin. Paahtoleipä ja kissa tapahtuvat sisällä, ei kadulla. Aiemmin maanantai loppui oven eteen ja seuraava kuva oli toimisto.
- Keskiviikon ilta: kello 23:15 vastaa nyt kertojan riviä (oli 23:40).
- Korjaus: tests/mug.test.cjs haki harnessin tämän koneen absoluuttisella polulla, joten `npm test` (ja APK-build) kaatui Windowsissa. Nyt polku on suhteellinen, ja story.test tarkistaa, ettei tests/, tools/ tai src/ sisällä koneen omia polkuja.

Versio 0.69.0 (Claude, 20.11.2026): **kissa maanantaihin, muki vai ovi, kaiutinpuhelin.**
- V7: maanantai-iltana paahtoleivän jälkeen ihminen piirtää muistilapulle kissan, jolla on neljä jalkaa. ”This one needs five.” Ekskyysmi: ”Then it goes in the drawer. Before somebody sees it.” Kissa saa viidennen jalkansa hiljaisena päivänä ja jaetaan sunnuntaina ryhmächatissa.
- V21 (prototyyppi): diilin kohdalla voi kysyä kerran ”Is that the mug talking, or the door?” Matalalla mukilla Ekskyysmi myöntää: ”The mug. Honestly.” Täydellä: ”…The door.” / ”The mug was a very convenient witness.” Kumpikin vaihtoehto on yhä auki; mitään ei rangaista.
- V4: keskiviikon avokonttorissa joku on ollut kaiutinpuhelimessa yhdeksästä asti (vie siemauksen).
- Kesto 48:54.

Versio 0.68.0 (Claude, 20.11.2026): **Eero juo teetä.**
- Ristiriita korjattu: Eero piirrettiin kahvikuppi kädessä, vaikka Ekskyysmi sanoo ”He doesn’t HAVE a coffee.” Nyt Eeron kupissa roikkuu teepussin naru ja lappu, ja repliikki on ”He doesn’t HAVE a coffee. He’s drinking TEA.” ”You too” on edelleen väärin, nyt kahdesti.
- Bite-polku (”Show him some teeth. Small ones.”) on ennallaan maanantain neljäntenä vaihtoehtona; nyt näykkäisy maksaa siemauksen (”the snap”), ja kotimatkan anteeksipyyntö tulee edelleen etusijalla.

Versio 0.67.0 (Claude, 20.11.2026): **mukin mitoitus Joonaksen korjauksen mukaan.**
- Isot osumat vievät kaksi siemausta (”oh, hi.”, ”quick chat?”, ”shorter”): dysforia uuvuttaa. Maanantaina muki käy lähes tyhjänä: muut lähtevät lounaalle ilman (−1) tai yhteinen lounas on hopeareunus (+1), uusinta vie, kotona paahtoleipä tankkaa kaksi.
- Päivillä on oma muotonsa: maanantai kuoppa ja tankkaus, tiistai vajoaminen, keskiviikko hidas vuoto (pohja kaksi), torstai romahdus. Pohja on yksi kaikkina muina päivinä; vain torstai menee läpi.
- Testi tarkistaa myös muodon: maanantai käy pohjassa ja täyttyy, keskiviikko ei romahda.

Versio 0.66.0 (Claude, 20.11.2026): **muki kulkee koko viikon (V22).**
- Maanantai: muki ilmestyy työnkuvapuheen jälkeen (”Coffee. I’ll handle the catastrophes.”), kertoja selittää sen kerran. Ensimmäinen ”oh, hi.” osuu lähes täydellä mukilla: RSD ei ole väsymystä.
- Tiistai: ”quick chat?”, pesulappu ja ”shorter” vievät, yöuni tuo siemauksen. Keskiviikko: jokainen myöntävä vastaus maksaa siemauksen, mutta ei koskaan viimeistä. Torstai: muki särkyy. Perjantai ja ryhmächatti: kultasaumainen muki.
- Välihetket eivät enää peri edellisen luvun mukia.
- Uusi testi tests/mug.test.cjs: yhdeksällä reitillä maanantai alkaa täydellä mukilla, vain torstai tyhjentää ja rikkoo sen, ja kultasaumat muistetaan.

Versio 0.65.0 (Claude, 20.11.2026): **muki saa luonteen: haamu, äänet, romahdus, kintsugi ja hatut.**
- Muki: menetetty osa välkkyy punertavana haamuna ja sammuu, täyttö nousee hitaasti. Muki näkyy kun sillä on merkitystä ja vetäytyy tunnelmakohtauksissa (`mugQuiet`).
- Äänet (syntetisoidut): punaiset arkistokortit paukahtavat seinään yksi kerrallaan, muki kolahtaa ja loiskahtaa tyhjentyessään, lorisee täyttyessään, säröilee ja räsähtää rikki, kilahtaa liimautuessa.
- Torstai kantaa mukia (ensimmäinen integraatio viikkoon): puolillaan alussa, ”Seen” ja tunti hiljaisuutta vievät, sipsipussi rikkoo tyhjän mukin. **Romahdus:** ”STOP! STOP IT! ALL OF IT!” varjolle, bilehattu lentää, sitten hiljaisuus ja ”…That one landed.” Myöhemmin sirpaleet liimataan kullalla (”the only glue in the drawer”), ja Sannan viesti tuo siemauksen takaisin.
- Hatut (hatun varjo, vaalea reunus, kupla väistää): etsivän hattu suurennuslasin kanssa, kokin hattu tiskatessa (”For morale. Not for interfering.”), bilehattu torstaina, merirosvohattu diilissä (”Parley.”).
- Piikikäs mörkö vain kun kohtaus pyytää (prototyypissä Riitan palaverissa), ei automaattisesti tyhjällä mukilla.
- VISIO kierros 3: Ekskyysmin työtä EI vaihdeta mukin vartioinniksi (ensimmäinen osuma tulee täydellä mukilla; ”säästän energiaa” on välttelyn paras tekosyy). Muki on erillinen totuus, ja kasvu on erottelukykyä: ”Is that the mug talking, or the door?”

Versio 0.64.0 (Claude, 20.11.2026): **suunta tarkentui: muki. ANALYYSI.md ja VISIO.md.**
- ANALYYSI.md: armoton kokonaisanalyysi (vahvuudet, sokeat pisteet, parannukset, arvosanat 6,5–7 nyt / 8,5–9 potentiaali).
- VISIO.md: mitä oikeasti teemme. Ihmisen kahvimuki on jaksaminen (”BE A MUG. NOT A HERO.”), tyhjä muki avaa ruman puolen (mörkötila), diili on Ekskyysmin ja ihmisen sopimus eikä pistejärjestelmä, ja Ekskyysmin uusi työ on vartioida mukia (”Look after the mug. Stay when it happens.”). Pilarit, mitä emme tee, PUBG-vertailu ja avoimet kysymykset.
- Prototyyppi V1 Moments-valikon WIP-osiossa: **A Tuesday, with a mug.** Muki-HUD (kahvin pinta, ei numeroita), pesulappu, porkkana ja hajuvesi vievät mukista, yksi diili paperilappuna (lounas vai hiljainen tunti), Riitan palaveri tyhjällä mukilla: Ekskyysmi piikikkäänä mörkönä, kärjistyneet vaihtoehdot, pehmeä vaihtoehto lukittu (”Not enough mug for that.”), ilta täyttää mukin. Diilin hinta näkyy illalla.
- TYOSUUNNITELMA §14: tehtävät V1–V14.

Versio 0.63.0 (Claude, 20.11.2026): **kampaus, osa 2 (Joonaksen kuvat).**
- Puhekuplat eivät enää mene kuvan yläreunan yli (zoomattu kamera, puhelimen valikkonappi) eivätkä pomotaistelun palkin alle.
- Pomotaistelu: myös ”One at a time” -tilassa tikarit lentävät kohti (hitaammin ja jonossa); avattu viesti odottaa lukijaansa kuten ennen.
- Baari: ihmisen valinnat ovat näyttämöohjeita, eikä niitä enää toisteta ihmisen repliikkinä (”Tell her everything…” näytti ihmisen sanomalta). ”2011” → ”Starting with the wave.”
- Keittiö: oikea keittiö (kaapit, jääkaappi, laatat, takataso), ja tiskipöytä on etualalla ihmisen ja kameran välissä. Varjo ei enää osu tiskialtaaseen, eikä sohvaa ole keittiössä.
- Nothing: pyykkikori ei ole lampun alla. Quiet: pöytäkuva on keittiössä (ei sohvan ja lampun päällä).
- Sängyn kohtaus (ryhmächatin loppu): ei lattiavarjoa ihmisen ja Ekskyysmin välillä sängyn yli.
- Vaihtoehdot: sarakkeet määräytyvät vaihtoehtojen määrästä ilman :has-valitsinta, joten neljäs vaihtoehto ei enää valu ruudun yli vanhemmissa Android-näkymissä.
- Vastaanotto: lomakkeessa yksi vastattava kysymys lisää. Vastaanoton jälkeen uusi kotikohtaus: mitä apu on (pieni paperipussi, tuoli joka toinen tiistai), mitä se tekee (”turns the volume down. Not off. Down.”, tiedostot tarkistetaan), mitä se ei tee (”It doesn’t make you go away.”) ja onko ihminen tyytyväinen (”Some days are easier. Not all of them.” / ”I’m glad I went.”). Pelaaja valitsee, mitä Ekskyysmi kysyy ensin. Ei lääkkeiden eikä ammattien nimiä.
- Elävämpi maailma: päivällä ikkunoiden takana lentää välillä lintu tai kaksi, yöllä vilkkuu lentokoneen valo ja joskus tähdenlento; lampun valossa leijuu pölyä. Kaikki pois päältä Less motion -asetuksella.

Versio 0.62.0 (Claude, 20.11.2026): **kampaus, osa 1.**
- Kotimatka: enintään kolme vaihtoehtoa kerrallaan ja kaksi aihetta. Todellinen havainto (tuo Sannan vastauksen) on aina tarjolla; Eeron näykkäisyn jälkeen anteeksipyyntö tulee toisena.
- Pisimmät pelkät klikkausjaksot saivat valinnan: *Night shift* (50 riviä → valinta ”Explain about the door.” / ”Admit it: I didn’t know I was allowed out.”) ja perjantai (37 riviä → Sannan ”You okay?” -kohtaan: ”Say ’nothing’.” / ”Say it’s something. A small something.”; ihminen päättää silti itse).
- Puhelin: muiden viestit tulevat kolmen pisteen ja 1,4 s odotuksen jälkeen (ei omille viesteille, ilmoituksille eikä torstain käsikirjoitettujen pisteiden perään).
- Askeläänet: pehmeä askel aina kun jalka vaihtaa puolta (ihminen, myös kotimatkalla). Ei epilogissa.
- Suurennuslasi: merkit ovat numeroituja ja nimettyjä samoin kuin listan vaihtoehdot, lasi aloittaa merkkien ulkopuolelta, ohje: ”Tap a numbered circle, or pick from the list.”
- Yö: lamppu seisoo sängyn jalkopäässä (ei sängyn päällä), pää lepää tyynyllä kyljellään, varjojen kuplilla on häntä niitä silmiä kohti, jotka puhuvat.
- Epilogi: kuljettaja istuu auton etupuoliskolla, jalat eivät näy auton alta. Kuitin jälkeen 12 tahtia uutta (ei toistoja): ninja-Ekskyysmi (HI-YA, hiippailu lampun takana, ”Quick chat?” → CHOP), odotushuone (NOW SERVING 12 / YOUR NUMBER 47), labra (”SMALL SCRATCH.”, varjo pyörtyy, ihminen hymyilee), mukavuusalueen liitupiiri, TEAM. Varjolintu ennallaan.
- Asetuksissa kielivalikko: English; Suomi ja Svenska näkyvät, mutta eivät ole vielä valittavissa (K12).
- Päänauha nollautuu kohtausten välillä (ei enää patterilla).

Versio 0.61.0 (Claude, 20.11.2026): **kertoja ja kuplat.**
- Kertojan rivit ovat nimettömiä ja kursiivisia, ilman kuvaketta (ruudunlukija kuulee yhä ”Narrator”). Alun hetki ei enää näytä kertojan riviä paneelissa samaan aikaan kuin kuvateksti ”Monday, 8:52. Nobody here yet.”
- Puhekupla pysyy näkyvän kuva-alan sisällä myös zoomatessa (vähintään 18 px reunasta). Eeron ensimmäinen kupla osui reunaan.
- Kirjattu linjaukset: RSD ei katoa (ei parantumislupauksia), epilogin varjolintu pysyy, epilogin loppu kuitin jälkeen on auki (K26).

Versio 0.60.0 (Claude, 20.11.2026): **katsauksen (KATSAUS.md) pienet korjaukset; kaikki täydennykset kirjattu TYOSUUNNITELMA §13:een (K1–K25).**
- Jatkuvuus: arkisto on nyt ”since the drawing” eikä ”since 2011” (ihmisen ikä jää auki). Keskiviikon diat 23:15, ettei kahdessa yökohtauksessa ole samaa kellonaikaa.
- Ryhmächatin kohtaus päättyy lauseeseen ”A crack. Leave it open a crack.”
- Sanattomat tauot torstain ”That one landed.” ja perjantain ”smaller once it’s out” jälkeen.
- Uutta: pesulappu tiistain palaverissa (aistikuorma madaltaa kynnystä, ”Two crises.”), baarin jälkeen ”Nice is still a lot.” (hyväkin rasittaa), perjantaina Ekskyysmi huomaa Sannan varovaisen ”fine”-sanan ja ihminen sanoo: ”when I say ’fine’, it’s the good kind.”
- About: ”Some moments may land close.”

Versio 0.59.0 (Claude, 20.11.2026): **kuitin WHAT IT FELT LIKE -osio uusittu Joonaksen kokemusten pohjalta.**
- Ensin aistit: `COLLAR LABEL, FELT … ALL DAY`, `CHEWING, NEXT TO ME … DEAFENING`, `PERFUME, IN THE LIFT … ALL THE AIR`. Sitten pää: `TABS OPEN, IN HEAD … 37` ja pisin uudelleenkelaus. Sitten muut ihmiset: `“DO THEY STILL LIKE ME?” … ×23` / *answer so far: yes.*, `FACE HELD UP`, `RECOVERY AFTER ONE LUNCH … ONE EVENING`, `BRAVE THINGS NOBODY SAW`.
- Korjattu: rivi ”first time this week” valui kuitin reunan yli, nyt *a first.*
- `APOLOGIES, IN ADVANCE` poistettu: ulkopuolisuuden pelko kantaa saman asian terävämmin. Osio kasvoi viidellä rivillä, rullaus nopeutui vain vähän.

Versio 0.58.0 (Claude, 20.11.2026): **epilogi on nyt pelin loppu.**
- Tarinassa: loppukuva (lamppu ja varjolintu) → ”For now” → **The End. (of the week)** mustalla kappaleen hiljaisen ensimmäisen tahdin ajan → epilogi kappaleen kanssa → *By the radiator.* lopputekstien jälkeen → viikon kuitti. (`AFTER[5]`, `NOCARD.epilogue`.)
- Epilogin loppu: häivytys mustaan alkaa bändin viimeisestä iskusta (169,4 s, iskuanalyysi) ja on musta ennen jälkikaikua. Ei enää välähdystä eikä kertojan palkkia lopussa; paneeli palaa vasta seuraavan kohtauksen mukana.
- Napauta kahdesti ohittaaksesi (”Tap again to skip”).
- Lattialamppu kotona piirretään seinävarjon eteen ja ihmisen taakse: lamppu ja Ekskyysmi eivät enää vaihda paikkaa.
- Eeron diat kestävät kaksi tahtia, ja lyhyiden kuvien kuittirivi tulee esiin aiemmin ja pysyy leikkaukseen asti.
- Rullaavaan kuittiin osio *WHAT IT FELT LIKE*: aika epämukavuusalueella (lähde: Eero), pisin uudelleenkelaus pelaajan omasta viikosta, kasvot pidetty pystyssä, anteeksipyynnöt etukäteen, rohkeat teot joita kukaan ei nähnyt (paitsi yksi varjo), kalenteripäivät ja sisällä eletyt päivät. Viimeiset rivit: ”thank you for coming. / no reply needed. / (really.)”

Versio 0.57.0 (Claude, 20.11.2026): **Joonaksen havainnot: nenä, kortit koko näytöllä, ääni, siirtymä, ajokohtaus.**
- Ihmisten nenä osoittaa nyt katseen suuntaan (ennen aina oikealle).
- Ulkopuoliset kortit koko näytön / puhelimen vaakatilassa: otsikko ei jää valikkonapin alle, eikä kuvateksti jää paneelin alle (paneeli kantaa sen). Kertojan nauha piirretään vain, kun paneeli ei peitä sitä.
- Ekskyysmin puheääni: lämmin matala blippi ja oktaavia korkeampi osasävel, jonka puhelimen kaiutin pystyy toistamaan (oli hiljaisempi kuin ihmisen).
- Maanantai: toimisto häivytetään mustaan ja kotimatka nousee esiin (noin 2 s hengähdys) eikä hyppää suoraan.
- Epilogin ajo kahtena lähikuvana: kuski, sitten hikoileva juoksija; lattiavarjo ei veny auton ja varjon välille.

Versio 0.56.0 (Claude, 20.11.2026): **epilogi: vain kappale, ei palkkia, ja kotimatka autolla.**
- Epilogin aikana ei kuulu pelin ääniefektejä, eikä musiikki vaimene (`sfx`, `talkDuck`, `duckMusic` vaikenevat, kun `G.epi`).
- Alapaneeli ja vihjerivi piilotetaan epilogin ajaksi (`body.epi-on`): puhelimella se oli lukukelvoton palkki. Kesken poistuminen palauttaa ne ja pysäyttää kappaleen.
- Kaatuminen kadulla poistettu. Tilalla: ihminen ajaa autoa (ikkunasta näkyy kuski), ja Ekskyysmi juoksee seiniä pitkin perässä hikoillen (”RIDES HOME … 1, one in the car. one running behind.”). Sama rivi rullaavassa kuitissa ja kertosäkeen välähdyksissä.
- Sateessa vaatteet kastuvat: märkiä läikkiä ja valuvia pisaroita (`wet`).

Versio 0.55.0 (Claude, 20.11.2026): **epilogi kappaleen kanssa (Safe At Last, 2:55).**
- Kappale `assets/audio/epilogue.mp3` (kansikuva poistettu, ääni koskematon). Soi kerran, ei silmukkana; voimakkuus 0.36 (masteroitu −13 LUFS, n. 3 dB otsikkokappaletta kovempi).
- Leikkaukset osuvat tahteihin: tahtien alut haettiin rytmintunnistuksella (n. 108 BPM) ja ovat koodissa (`EPIBARS`). Kello seuraa kappaleen `currentTime`-arvoa; ilman ääntä sama aikataulu kulkee ajan mukaan.
- Rakenne: A) montaasi 31 tahtia (~71 s); B) kappaleen hiljaisempi keskiosa: he istuvat lattialla ja koko kuitti rullaa kuin lopputekstit (kaikki rivit, pelaajan menetelmät, SUBTOTAL ONE WEEK · TOTAL LIVED ONCE, tekijä, ”thank you. come again. (not in a weird way.)”), välissä varjolintu; C) viimeinen kertosäe: 12 välähdystä, yksi tahti kukin, ilman kuitteja; D) varjolintu ja tekijärivi viimeiseen säveleen, häivytys mustaan.
- Montaasin kohtaukset ja kävelyt eivät enää voi vaihtaa sen kappaletta.

Versio 0.54.0 (Claude, 20.11.2026): **neljä uutta välähdystä epilogiin.**
- Sade: Ekskyysmi pitää sateenvarjoa ihmisen yllä, mutta se on varjon sateenvarjo ja sade menee läpi (”UMBRELLAS, HELD … 1, effective: no. appreciated: yes.”).
- Hissi: Eero, ihminen, Eeron varjo ja ahtautunut Ekskyysmi, ”(sorry.)” (”LIFTS, SHARED … 1, shadows touching: 0 (narrowly)”). Uusi tausta `epiLift`.
- Luonnos: pitkä varmisteleva viesti, ihminen lähettää ”ok 👍”, Ekskyysmi pyörtyy: ”thud.” (”DRAFTS, DELETED … 1”).
- Sähkökatko: pimeässä vain kahdet silmät vierekkäin, kukaan ei panikoi, lamppu palaa (”POWER CUTS … 1, eyes in the dark: four. panic: none.”).
- Riitan ja muiden varjojen kuvat pois, jotta kokonaisuus pysyy noin 75 sekunnissa.

Versio 0.53.0 (Claude, 20.11.2026): **istuva varjo korjattu pelissä, ja epilogiin kolme uutta välähdystä.**
- Istuva Ekskyysmi (*Nothing.*-hetki ja epilogin loppu): lyhyempi vartalo, reisi lattiaa pitkin, polvi koholla ja kädet polvella. Ennen se näytti seisovalta varjolta, jonka vieressä on möykky.
- Suurennuslasi epilogissa näyttää totuuden: Sanna hymyilee (”FACE: FRIENDLY. RE-CHECKING.”). Tarinassa lasi tekee yhä kaikesta pahemman näköistä; epilogissa lasi on rehellinen (`honest`).
- Uudet keksityt välähdykset: kotimatka baarin jälkeen – reunakivi, molemmat kaatuvat ja nauravat (”KERBS, SURVIVED … 0 OF 2, falls: one each. verdicts: none.”); Ekskyysmi on leimannut itseensä kymmenen REJECTED-leimaa (”REJECTIONS, SELF-ISSUED … 10, all of them overturned on appeal.”); ryhmäkuva salamalla, ja takana valtava kutsumaton varjo (”GROUP PHOTOS … 1, shadows in shot: 1 (uninvited)”).
- Montaasin kävelyssä ei rekisterikilpilaskuja. Kesto noin 70 s; karsitaan kappaleen pituuteen.

Versio 0.52.0 (Claude, 20.11.2026): **epilogin leikkauskieli: ei diaesityksen zoomia.**
- Kuvien pituudet vaihtelevat (1,6 s välähdys – 7 s viipyvä kuva), ja tahti kiihtyy keskellä ja hidastuu lopussa.
- Leikkaukset: ristihäivytys herkille kuville, kova leikkaus komiikalle, *smash cut* kontrastille. Useimmat kuvat ovat paikallaan; liike tarkoittaa jotain (hidas vetäytyminen lopussa, äkillinen zoomi gagiin).
- Uudet keinot: lounaskuvassa kamera nykäisee suurennuslasiin (”FACE: FRIENDLY. RE-CHECKING.”); hälytys: punainen syke, tärinä, sireeni ja jättivarjo – sitten mitään ei tapahdu ja varjo lysähtää kesken kuvan (”WORST CASES THAT HAPPENED … 0”); yläfemmoissa läimäysääni ja pieni tärähdys.
- Naurukohtaus on nyt 1,6 s välähdys ilman kuittia.
- Lopun istuva varjo: ei enää istuma-asentoa (näytti oudolta), vaan matalampi varjo istuvan ihmisen vieressä.
- Uudet äänet: `siren`, `clap`. Kesto noin 58 s.

Versio 0.51.1 (Claude, 20.11.2026): **epilogiin ystävyyttä ja kohellusta.**
- Kädet eivät enää mene ihmisen pään yli: Riitan kuvassa käsi olalla (`shoulder`), piirroskuvassa halaus keskitetystä varjosta (`hug`, `off:0`).
- Uusi, keksitty kuva: he katsovat toisiaan ja lyövät yläfemmat. Ensimmäinen yritys menee ohi (liian innokas), toinen osuu: ”CLAP.” Kuitti: ”NOS, SAID OUT LOUD … 1, wobbling: allowed” (jos perjantaina sanoi kyllä: ”0, next time, then.”).
- Uusi, keksitty kuva: sateenvarjotarina uudestaan kotona, ja molemmat nauravat vedet silmissä (ihmisen uusi ilme `laugh`, kyyneleet, ”ha” ja ”HA”). Kuitti: ”THE UMBRELLA STORY, AGAIN … ×4, still classified. still funny.”
- Kehut-kuva poistettu, jotta kokonaisuus ei veny.

Versio 0.51.0 (Claude, 20.11.2026): **epilogi sommiteltuna, Tenavat-lopputekstien hengessä.**
- Jokaisella kuvalla on oma rajaus ja kameran liike (alku- ja loppurajaus, `cam`), ja Ekskyysmi tekee joka kuvassa yhden pienen asian (`pose`, `at`).
- Kuvat: ikkunasta lähtevä avaus; lounas, jossa Ekskyysmi tarkistaa Sannan kasvot suurennuslasilla (”FACE: FRIENDLY. RE-CHECKING.”); Eeron diat, joita Ekskyysmi ei kestä katsoa (kädet silmillä); Riitan kohdalla lähikuva, jossa varjon käsi on ihmisen päällä; pahimmat skenaariot: valtava varjo kutistuu kesken kuvan; baari ja drinkin sateenvarjo (”UMBRELLA STORIES, TOLD … 1”); kirjasto: ”PAGE 212. NOBODY HAS DIED YET.”; Ekskyysmi tervehtii Sannan varjoa; piirros: varjo halaa takaapäin; kehut: varjo siemaisee kahvia; pelaajan omat menetelmät: käsi suulla; ”DAYS LIVED TODAY 1.0”: molemmat istuvat lattialla ja kamera vetäytyy; tekijärivi: varjolintu.
- Less motion: jokainen kuva näytetään loppurajauksessa ilman liikettä.

Versio 0.50.1 (Claude, 20.11.2026): **epilogi löytyy ja on parempi.**
- *Moments*-valikossa on alfan ajan osio *Work in progress*, josta keskeneräiset luonnokset (nyt epilogi) aukeavat ilman `?lab`-osoitetta, myös artifaktissa ja sovelluksessa.
- Epilogi: kuittirivit erillisinä otsikkona ja arvona (pisteet piirretään, käännettävissä), Sanna vilkuttaa lounaskuvassa, oma kuva muiden varjoille (”OTHER PEOPLE’S SHADOWS … ALSO ON SHIFT”), pelaajan omat menetelmät kuittina (esim. ”EXITS, TAKEN ×6”), ja viimeisenä ”DAYS LIVED TODAY … 1.0 – inside and outside, the same day. first time this week.” Noin 66 s.

Versio 0.50.0 (Claude, 20.11.2026): **maanantain kappale pois, epilogin ensimmäinen luonnos labiin.**
- Maanantain taustakappale (`monday.mp3`) on poistettu pelistä: ei soittoa, ei `MUSIC`-merkintää, ei tiedostoa repossa. `tools/www.cjs` ottaa sovellukseen vain ne äänitiedostot, jotka `game.js` mainitsee, joten vaikka tiedosto jäisi kansioon, se ei päädy APK:hon.
- **Epilogue, first sketch.** (vain `?lab`, T10 ilman musiikkia): yhdeksän pehmeää välähdystä viikosta (lounas, Eeron diat, puoli sivua, pahimmat skenaariot 0 *, kirjaston €4.60, piirros ja 0 suljettua tiliä, kehut oikeassa laatikossa), kuittirivi kussakin, ristihäivytys ja hidas työntö, lopuksi tekijärivi. Noin 52 s. Ajoitus on arvaus, kunnes kappale on olemassa (`EPI` tiedostossa `37-epilogue.js`).

Versio 0.49.0 (Claude, 20.11.2026): **valinnoilla on seuraus, ja torstai lukee pelaajan viikon.**
- *Ekskyysmi filed that.* välähtää vain valinnoissa, jotka palaavat myöhemmin (ma pelot ja pakotapa, ke ”not this time” ja ylimääräinen kyllä, to ”Seen”-luonnos, työpaikkailmoitus). Parodia ”X will remember that” -ilmoituksesta.
- Torstain käänne: pussi repeää (”EASY OPEN. All of it. Everywhere.”), ja ihminen lukee pelaajan eniten käyttämän menetelmän kokonaisena lauseena, esim. ”You’ve taken me out of 6 rooms this week. I wanted to stay in most of them.” Jos mikään menetelmä ei ole toistunut kolmesti, vanha rivi jää.
- Maanantain ensimmäinen valinta kertoo pelaajan roolin: ”You’re Ekskyysmi. Pick what I say.” Valinnoilla on puhujan väri (Ekskyysmi violetti, ihminen keltainen).
- Ihmisen oma kömpelyys: maanantaina ”You too.” Eerolle, jolla ei ole kahvia (”I didn’t do that one. That was all you.”). Perjantaina: ”You t— …Thanks, Eero.” – ”Caught it. Mid-air.”
- Maanantain kotimatkalla yksi lamppuväli: varjo haalistuu, jää jälkeen ja juoksee kiinni (”Wait. WAIT. Lamp gap.”), sitten ei enää.
- Kertojan rivi piilotetaan paneelista samalla säännöllä kuin kuplat, koska se näkyy kohtauksen alareunassa.
- Käännettävyys: vihjerivi on nyt kokonainen lause, ja sanaleikit on listattu tiedostoon `KAANNOS.md`.

Versio 0.48.1 (Claude, 20.11.2026): **repliikki sanotaan kerran, ja esittely on aamurituaali.**
- Kun repliikki näkyy luettavassa puhekuplassa (kohtaus vähintään 740 px leveä, tekstikoko ei ”large”), alapaneelin kopio piilotetaan näkyvistä ja jätetään vain ruudunlukijalle. Sama koskee ulkopuolista korttia. Kertojan rivit, valinnat ja kapea ruutu pitävät paneelitekstin. Asetus *Text below* tuo sen aina takaisin.
- Puhelimella paneelin teksti alkaa muutaman pikselin sisempää.
- Ekskyysmin esittely puhutaan ihmiselle, ei pelaajalle: ”Ekskyysmi. Informal head of keeping things from getting awkward. Reporting for duty.” – ”You don’t have to introduce yourself every morning. You live on my wall.” – ”It’s a formality. Formalities are how nothing goes wrong.”

Versio 0.48.0 (Claude, 20.11.2026): **työkalujen tasapaino ja Lamp gap (T7).**
- Leimasin: maanantaina vain kerran (Eeron ”Rejection prevented.”). Sannan jälkeen leimaa ei enää lyödä, koska pito ja ulkopuolinen kortti kantavat jo vitsin. Perjantain leimasin (pidellään ja pannaan pois) on maanantain vastapari.
- Ulkopuolisia kortteja karsittu: tiistain ”A meeting was scheduled.” pois (kohtaus päättyy riviin ”ONE thumb. She has two.”), baarin ”WHAT THE EVENING WAS” pois (kertoja sanoi saman). Lomakkeen kortti on nyt ”WHAT THE APPOINTMENT WAS”, jotta ”WHAT THE CALENDAR SAW” ei toistu kolmesti.
- *(Say nothing.)* pois kohdista, joissa se luettiin ”älä lähetä mitään” -viestinä (tiistain vastaus, torstain ”Seen”). Lukossa nyt ti klo 3 ja ke keskiyö, auki pe ja kommenteissa.
- **Lamp gap.** (vain `?lab`, T7): kotimatkan klooni. Lamppujen välissä varjo haalistuu (silmät jäävät) ja jää jälkeen, seuraavan lampun alla se juoksee kiinni: ”Wait. WAIT. Lamp gap.” Loppu: ”You never lost me. You just couldn’t see me for a bit.” – ”…That’s the same thing.” – ”It really isn’t.”
- Työkalubudjetti kirjattu suunnitelmaan (§12), jotta mikään keino ei ala toistua.

Versio 0.47.0 (Claude, 20.11.2026): **mekaniikka on vitsi: hiljaisuus, kosketeltava huone, menetelmät kuittiin, ja sipsipussi.**
- **(Say nothing.)** näkyy valikoissa koko viikon harmaana (”Not a setting. Yet.”) ja kieltäytyy omilla repliikeillään (”That isn’t a setting.”, ”Silence is how they get you.”). Torstain jälkeen se aukeaa: perjantaina ja kommenteissa sen voi valita. Kehityskaari näkyy käyttöliittymässä ilman selitystä. Paikat: ti viestivastaus ja klo 3 skenaariot, ke keskiyö, to ”Seen”-luonnokset (lukossa); pe tuomio ja kommentit (auki). `hush()` tiedostossa `20-engine.js`.
- **Kosketeltava huone** (`58-hotspots.js`): kellolla, ilmoitustaululla, kasvilla, mukeilla, kahvinkeittimellä, ikkunoilla, kaaviolla, kuulla ja lampulla on Ekskyysmin kommentti (2–3 kpl/esine, sitten hiljaa). Ei maanantaina. Ei koskaan pysäytä tarinaa: toinen nopea napautus jatkaa. Yksi esine välähtää välillä, ja vihjerivi kertoo asiasta.
- **Ekskyysmin menetelmät kuittiin:** valinnat on merkitty (pahimmat skenaariot, käsikirjoitukset, miellyttäminen, pakoreitit, jääminen, hiljaisuudet), ja viikon kuitti laskee ne. Tallentuu tarkistuspisteisiin.
- **The bag.** (vain `?lab`): torstain klo 18.40 klooni. Päivän naamio, pussi jossa lukee ”EASY OPEN”, ihminen käy varjon kimppuun (”Why am I LIKE this.”), *(Say nothing.)* yhä harmaana, naapurin kortti (”A cupboard door. Twice. Then nothing.”), ja lopuksi ”I hate that I’m like this.” – ”I don’t.” Pelattava päätöstä varten: tuleeko tämä torstain käänteen laukaisijaksi.

Versio 0.46.1 (Claude, 19.11.2026): **kamerakieli tiistaista torstaihin (T5).** Yksi erikoiskuva per tahti, sitten takaisin laajaan.
- Tiistai: Riitan tapaaminen kahden hengen kuvana (laukaisu kehystää sitten Riitan), kello 3 yöllä hidas työntö ihmiseen (”There’s only one watch”), ”…She said nice things?” lähikuvana Ekskyysmistä.
- Keskiviikko: Sannan kutsu kahden hengen kuvana, keskiyön ”I only have the one move” hidas työntö, ja ”ALL STAFF” napsauttaa kuvan nopeasti takaisin laajaksi.
- Torstai: tunnustus (”It arrives as a hit” → ”You were seven”) hyvin hidas työntö Ekskyysmiin; työnkuvan uudelleenkirjoitus palaa huoneeseen.
- `shot()` osaa nyt kehystää Ekskyysmin (`who:'S'`) ja laajan kuvan nopeudella (`wide`, `{rate}`); `calm` nollaa kameran nopeuden.

Versio 0.46.0 (Claude, 19.11.2026): **valokeila, Moments-valikko (T9) ja jousiviive (T6).**
- Valokeila piirretään seinävarjon päälle ja ihmisen alle: valo on ilmassa seinän edessä, joten Ekskyysmi jää sen taakse ja vaalenee hieman (Joonaksen havainto).
- Aloitusvalikossa on *Moments* (T9). *Situations*: kuusi lisäkohtausta tilanteen mukaan nimettynä, avautuvat maanantain jälkeen. *From the story*: tarinan hetket sitä mukaa kuin ne on nähty; viimeisen päivän hetket vasta kun loppu on nähty (tallennukseen `done`). Koko *Scenario lab* vain osoitteella `?lab`.
- Pitkä valikko vierii nyt ylhäältä: keskitys leikkasi aiemmin listan alun pois (koski myös Scenario labia).
- Varjon hartiat seuraavat ihmistä jousella (jalat kiinni) ja kotimatkalla vartalo keinuu hitaasti puoli askelta myöhässä. Less motion: ei viivettä eikä keinuntaa.

Versio 0.45.1 (Claude, 19.11.2026): **kriittinen luenta ja korjaukset** (TYOSUUNNITELMA.md kohta 11).

- About: ”one small plan: ask Sanna from work to lunch” ja ”The one thing that is, is unfair on purpose. Conversations don’t wait either.” Mahtuu pystypuhelimeen ilman vieritystä.
- Kirjaston aikajana korjattu (kirja on seitsemän viikkoa myöhässä, kortissa ”A SATURDAY, WEEKS LATER”). *Night shift* ei enää viittaa lisäkohtaukseen. Perjantain ”There is NOW.” on nyt ”It’s new.”, ja varjo valehtelee (pienenee).

 **kamerakieli, puheääni loppuun asti ja yön sänky.**

- **Kamera (`src/45-camera.js`):** maanantain jälkeen laukaisu kehystää sen, joka laukaisi reaktion (Sanna, Eero, Riitta tai puhelin), ja menee syvemmälle kuin ennen. Maanantai pysyy ennallaan. Uusi askel `shot()` sisältää kuvatyypit `wide`, `two`, `close`, `push` ja `crash`. Keskiviikkona Eeron ”I hate presenting” on lähikuvassa. Perjantaina Sanna ja ihminen ovat kahden hahmon lähikuvassa, Ekskyysmi kutistuu ihmisen selän taakse ja ilmestyy kuvaan repliikillä ”Looking busy was my idea.” Less motion -asetuksella liikkeet ovat leikkauksia.
- **Puheääni** kestää nyt tekstin loppuun. Piippaukset ajastetaan samalla laskulla kuin tekstin näyttäminen: sama nopeus hiljaisille ja koville repliikeille sekä samat tauot pisteissä ja pilkuissa. Enimmäismäärä nousi 28:sta 90:een.
- **Yö:** sohva piilotetaan, kun sänky on esillä. Aiemmin ne olivat päällekkäin.
- Perjantain ”There is NOW.” -repliikin edellä varjo pienenee (`fib`): se valehtelee toisesta kasasta, mikä on siemen Toiselle laatikolle.

 **pelin alku ja Evenings + Night shift.**

- **Osakortti on siirtymä, ei leikkaus:** New gamen jälkeen aloitusruudun kuva himmenee tummaksi, ja sitten PART ONE, ”Better safe.” ja kuvateksti ”A Monday. One small plan.” tulevat esiin vuorotellen. Kuvateksti on kortilla eikä sivupaneelissa, joten mitään ei lueta kahdesti. Jatkonappi ilmestyy viimeisenä. Varhainen klikkaus näyttää koko kortin heti, ja seuraava jatkaa. Less motion -asetuksella siirtymä on kolme kertaa nopeampi eikä otsikko liiku.
- **Lamppupöytä** näkyy heti, kun kohtaus alkaa. Ennen se tuli esiin vasta ihmisen mukana.
- **Ensimmäinen paneelirivi** on merkitty kertojan riviksi. Ennen otsikossa luki ”MONDAY, 8:52”, mikä toisti kuvan tekstin.
- **Night shift** jatkuu Evenings-kohtauksesta ilman uutta korttia (työsuunnitelman T3).

 **uusi kohtausjärjestys ja Toinen laatikko.** Työsuunnitelman tehtävät T1, T2, T8 ja T11.

- **Järjestys:** tiistain jälkeen *Enhance.* ja *Rewind.*; keskiviikon jälkeen *Evidence.*, *Colleagues.* ja *An ordinary evening*; torstain jälkeen *Not now.*, *A quiet drink.*, *Nothing.*, *The form.*, *Quiet.*, **A fine.** (kirjasto, uusi tarinassa), *Evenings.* ja *Night shift.*; perjantain jälkeen *The group chat* ja lopputekstien jälkeen **By the radiator.** (”THE NEXT TUESDAY”). Lisäkohtauksiksi siirtyivät *The posting.*, *One small thing.*, *Sometime.*, *The reply*, *The voice message* ja *Footage.* (pelattavissa labissa). Takapakki ”I’m working out my notice” siirtyi *The reply* -kohtauksesta *Not now.* -kohtaukseen.
- **Toinen laatikko:** Ekskyysmi kirjaa viikon hyvät hetket ”merkityksettöminä” (maanantaina uusi rivi ”Slide two: she said hi first. Irrelevant. Filed.”). Lopussa merkitsemätön laatikko aukeaa, ja siitä tulee esiin pelaajan näkemät hetket sekä piirros: ”It’s the one people could take away.”
- **They pois:** ihmiseen ei enää viitata sanalla they. Sanna sanoo maanantaina ”Looks busy. Maybe another day.”, mikä on samalla siemen perjantain repliikille ”You looked busy”. About-sivulla lukee ”a perfectly ordinary human. The human has small plans.”, ja ohjetekstit ovat ilman pronomineja.
- Testit päivitetty uuteen järjestykseen. Uusina tarkistuksina laatikon täyttyminen ja paljastuksen paikka sekä se, että patterikohtaus tulee loppukuvan jälkeen.

 **työsuunnitelma ja hetkitesti.**

- **[TYOSUUNNITELMA.md](TYOSUUNNITELMA.md)** on nyt ensisijainen suunnitelma: tarinan kaari v2 (”Toinen laatikko”), kohtausvalinta mitatuilla kestoilla, lisäkohtausten avautuminen, kamerakieli, epilogianimaatio, varjon kiinnityskokeilut sekä tehtävät T1–T12 ja kullekin riittävä malli. AGENTS.md ohjaa sinne.
- **Uusi testi `tests/moments.test.cjs`** (osa `npm test`-ajoa): jokainen hetki ajetaan loppuun kolmella valintapolulla piirtäen. Testi tarkistaa, ettei mikään kaadu tai jumitu ja ettei mikään luettava repliikki ole tyhjä, rikki tai tuntemattoman puhujan. Tulos: 21 hetkeä, 63 ajoa, 2089 eri repliikkiä.
- Pelin sisältöön ei muutoksia.

 **ensimmäisen kohtauksen musiikki hiljaisemmaksi.**

- Musiikki peitti puheäänet. `monday.mp3` on nyt masteroitu tasolle −24 LUFS (aiemmin −14,6), ja elementin voimakkuus on 0,22. Musiikki on hiljainen myös laitteilla, jotka eivät noudata elementin voimakkuutta. Lopputaso on noin −37 LUFS, kun aiemmin se oli noin −30.
- **Puheväistö:** aina kun joku puhuu, musiikki laskee 40 %:iin ja palaa noin puoli sekuntia viimeisen tavun jälkeen (`talkDuck`). Puheen aikana taso on noin −45 LUFS. Testattu selaimessa: tauoilla 0,22, puheen aikana 0,09.

 **näyttö pysyy päällä, ja koko peli tarkistettu.**

- **APK:** `GameApp.java` asettaa `FLAG_KEEP_SCREEN_ON`, joten näyttö ei sammu pelin ollessa edessä. Android poistaa lipun, kun sovellus on taustalla. `tools/android-check.cjs` tarkistaa, että lippu on mukana.
- **Selain:** Wake Lock API pitää näytön päällä, kun tarina on käynnissä, peli ei ole tauolla ja välilehti näkyy. Näyttö vapautuu tauolla, piilossa ja viiden minuutin koskemattomuuden jälkeen, ja kosketus palauttaa pidon. Testattu selaimessa: aloitusvalikossa ei pitoa, pelissä pito, tauolla vapautus, jatkettaessa pito, viiden minuutin jälkeen vapautus.
- **Virhekierros:** kaikki 21 lab-kohtausta kolmella valintapolulla ja kaikki viisi päivää kahdella polulla ajettiin selaimessa oikealla piirrolla. Ei kaatumisia, jumiutumisia eikä sivuvirheitä. Testiajurilla lisäksi tarkistettiin, ettei mikään repliikki ole tyhjä, `undefined` tai tuntemattoman puhujan. Tyhjät rivit pito-, heitto- ja taistelukohdissa ovat tarkoituksellisia. Täysi asettelutarkastus (28 tilaa × 5 kokoa) on puhdas lukuun ottamatta tarkoituksellisesti vierivää lab-listaa.
- Maanantain loppuruudun 4 px:n vieritys pienimmillä puhelimilla (alle 370 px korkeat) on korjattu.

 **Ekskyysmin luonne: innostus, karkaava huomio, ihastus, yhteinen sanasto ja valheen merkki.** Tämä on toinen alfa kavereille.

- Tiistaina nitoja (turvallinen innostus), torstaina koi kesken hälytyksen, ja torstain ”It’s fine.” -repliikissä varjo pienenee hetkeksi (`fib()`).
- Perjantaina ihminen käyttää varjon omaa ilmausta ”a no in a coat”, jos pelaaja kuuli sen keskiviikkona (`G.coatNo`, tallentuu).
- Uusi lab-kohtaus *By the radiator.* (Ekskyysmin oma ihastus, roolit vaihtuvat), ja *Footage.*-kohtaukseen vuotorepliikki ”She has a nice laugh.”
- Yksityiskohdat: [SYVENNYS.md](SYVENNYS.md) kohta 5c.

 **tasapaino: ihminen pyytää varjoa, ja varjo on kerran oikeassa.**

- Tiistaina ihminen antaa palaverin itse varjolle (”Can you just… handle this one?”), ja myöhemmin myöntää sen (”You asked me to handle it.” – ”…I did.”).
- Keskiviikkona Eerolla on syy pyynnöilleen (”I hate presenting. You’re good at it.”). Keskiyöllä Ekskyysmi estää sähköpostin, joka olisi lähtenyt ALL STAFF -listalle ja paljastanut Eeron pelon. Hälytin on kerran oikeassa ja ihminen väärässä.
- Perjantaina Sanna kertoo aikoneensa kysyä maanantaina (”You looked busy.”), ja Ekskyysmi myöntää, että kiireiseltä näyttäminen oli sen idea.
- Ekskyysmin luonteen jatkoideat: [SYVENNYS.md](SYVENNYS.md) kohta 5c.

 **syvennys ja valvontakamera.**

- **[SYVENNYS.md](SYVENNYS.md):** tutkimus (RSD kehossa, Clark & Wells, tykkäämiskuilu, valokeilaefekti, kaunis sotku, kaksoisempatia, parisuhteen varmistelu), foorumien kömmähdykset mikrohetkinä, havainnoimatta jääneet asiat ihmisen ja Ekskyysmin välillä, hahmojen halut ja tarpeet (Sanna ja Eero ohuimmat) sekä uudet kuvalliset keinot.
- **Uusi lab-kohtaus *Footage.*** (`src/52-footage.js`): Ekskyysmi vaihtaa kuvan nurkan valvontakameraan, joka on harmaa ja rakeinen ja jossa näkyvät REC-merkki ja aikaleima. Rajaus on niin tiukka, että Sanna jää kuvan ulkopuolelle, ja kamera ei käänny. Kamerakuvan ajan puhekuplia ei näytetä (”footage has no sound”), ja teksti on lukupaneelissa. Lopussa Sannan varjo kertoo, että hänelläkin on kamera ja että se osoittaa häneen. Ei vielä tarinassa.
- Perjantain varakohdassa (vanha tallennus, varjot eivät ole tavanneet) Sannan varjo ei enää sano ”…excuse me.”, eikä Ekskyysmi vastaa ”That’s MY name.” Nimivitsi on nyt vain baarissa, eikä sitä selitetä.

 **maanantain musiikki ja ”Excuse me?”.**

- **Ensimmäisen kohtauksen musiikki:** Joonaksen kappale *Guarded Introspection* (`assets/audio/monday.mp3`, 128 kbps). Alun kahvihommat menevät hiljaisuudessa, ja musiikki alkaa noin sekunti sen jälkeen, kun varjo herää. Se nousee neljän sekunnin aikana taustatasolle (0,17, kun aloitusmusiikki on 0,45) ja päättyy kotimatkaan.
- **Muut äänet ovat musiikin yläpuolella:** kaikki syntetisoidut äänet (puheäänet ja efektit) kulkevat yhden väylän kautta, ja väylää on nostettu 1,3-kertaiseksi. Iskussa (`sfx('hit')`) musiikki laskee hetkeksi noin kolmasosaan ja palaa kahdessa ja puolessa sekunnissa.
- **”Excuse me?” → ”Yes?”:** baarissa vieras sanoo tiskillä ”Excuse me?”, ja Ekskyysmi vastaa ”Yes?”. Tätä ei selitetä. Nimi Ekskyysmi on suomalaisittain kirjoitettu ”excuse me”.
- Muiden varjojen nimiehdotukset (Juustsei, Kuikkitsätti, Nouvoris) ovat [NIMIEN_FINAALIKIERROS.md](NIMIEN_FINAALIKIERROS.md):ssä. Peliin niitä ei ole vielä lisätty.

 **ensimmäinen alfa kavereiden testattavaksi.**

- **About-sivu:** musiikin tekijä ja kappaleen nimi poistettu. ”One ordinary life” vaihdettu muotoon ”One week of small moments”, koska ”ordinary” toistui jo edellisessä kappaleessa. Alarivi on nyt ”Alpha 0.42.0, still changing. Made by Joonas Huhta (MoshBitSurfers).” Versio luetaan index.html:n `game.js?v=`-leimasta, joten sitä ei tarvitse päivittää käsin, ja testaaja näkee aina, mitä versiota hän pelaa.
- **Kapea puhelin:** valikkoikkunoiden vähimmäiskorkeus on 440 px:n sijaan 490 px, joten About ja Settings mahtuvat näytölle ilman vieritystä.

 **puhekuplat kapeassa ikkunassa, näkyvämpi tärinä.**

- **Puhekuplat näkyvät, kun pelikuva on vähintään 520 px leveä.** Ennen raja oli 640 px (päätös versiosta 0.18), joten puolikkaassa selainikkunassa tai kapeassa paneelissa kuplat katosivat ja teksti näkyi vain alapaneelissa. Pystyssä pidetyssä puhelimessa teksti näkyy edelleen vain paneelissa, koska kuplan teksti olisi siellä alle 7 px.
- **Ekskyysmin tärinä on hitaampi ja hieman suurempi, ja pienellä ruudulla sitä vahvistetaan.** Ennen se oli 1,7 px ja 47 Hz, joten puhelimessa liike jäi alle pikselin ja näytti välkkeeltä. Tärinä käynnistyy edelleen, kun ahdistus on yli 0,3, ja pysyy pois Less motion -tilassa. Täydellä viikolla Ekskyysmi tärisee noin 140 s ja koko ruutu nytkähtää 16 kertaa, ja tärinää on joka päivä.

 **mukit, kävelysuunta ja testikierrosta varten.**

- **Aloitusruudulla mukin korva on piilossa** ihmisen pään takana (se on samalla maanantain ”wrong side”).
- **Kun ihminen kääntää mukin** maanantaiaamuna, mukista lähtee kolme pientä viivaa: jotain tehtiin tässä.
- **Kotimatkalla ihminen katsoo kävelysuuntaan.** Ennen suunta jäi siksi, mihin hän viimeksi katsoi, joten hän saattoi kävellä takaperin. Huoneessa, toimistossa ja muissa kohtauksissa kävelysuunta laskettiin jo liikkeestä (ihminen, Sanna, Eero).
- Korjattu 0.41.1:n sivuvaikutus: lamppupöytä piirtyi myös kotimatkan kadulle. Nyt se piirretään vain huoneeseen.

 **suu, musiikin lataus ja tekijätiedot.**

- **Suu on alempana**, ettei se näytä toiselta nenältä: perusilme, hymy, jäykkä ilme, kurtistus ja pakotettu virne siirtyivät 3 px alas.
- **Musiikki latautuu vasta ensimmäisestä kosketuksesta.** Ennen verkkosivu alkoi ladata 3,7 Mt:n kappaletta heti, vaikka pelaaja painaisi suoraan *New game*.
- **About-sivulla on tekijätiedot:** ”Made by Joonas Huhta (MoshBitSurfers). Music: “Stargazer’s Field” by Joonas Huhta.”

 **verkko- ja Android-tarkistus.**

- Aloitusruudulla vain ihminen hörppää kahvia; Ekskyysmi ei enää katso sivuun (Joonaksen toive).
- **Välimuistiongelma korjattu.** `index.html` hakee nyt `game.js?v=0.41.2` ja `game.css?v=0.41.2`. Leiman kirjoittaa `node tools/build.cjs` versionumerosta, ja `npm test` huomauttaa, jos leima on vanha. Ennen palaava pelaaja saattoi saada GitHub Pagesista uuden sivun ja selaimen muistista vanhan pelin.
- Lomakkeen ja paperikuitin aikana kulman tietorivit (EKSKYYSMI’S JOB, A SMALL PLAN) piilotetaan: pienimmällä puhelimella ne menivät lomakkeen otsikon päälle.
- Puhelinasettelun tarkastus: 28 tilaa × 5 kokoa, ei virheitä. Tiedossa olevat: Scenario labin lista vierii (kehitystyökalu) ja maanantain loppuruutu vierii 4 px pienimmillä puhelimilla.

 **aloitusruudun hionta ja uusi musiikki.**

- **Lamppupöytä on nyt varjon edessä.** Pöytä seisoo lattialla seinän edessä, joten seinällä oleva varjo jää sen taakse. Pöytä piirretään varjon ja ihmisen väliin (`roomFront()`), joten ihminen kulkee edelleen pöydän edestä.
- **Posket pysyvät kasvoilla.** Kauempi poskipuna ylitti pään reunan, kun ihminen katsoo sivulle. Nyt posket rajataan kasvojen sisään.
- **Aloitusruutu elää hiljaa.** Noin 11 sekunnin välein ihminen hörppää kahvia, ja Ekskyysmi katsoo kohteliaasti sivuun, suu supussa. Ei muuta. *Less motion* poistaa liikkeen.
- **Uusi aloitusmusiikki** *Stargazer’s Field* (Joonas, 3:49) korvaa kappaleen *Safe At Last* samalla tiedostonimellä `assets/audio/title.mp3`. Pakattu 128 kbps:ään ilman kansikuvaa, 3,7 Mt.

 **kolme hengähdystä, vastavuoroisempi tarina ja yövalo loppuun.**

- Osaotsikot **Better safe. / A little room. / Still here.** odottavat pelaajan jatkamista. Part Two alkaa ennen *Nothing.*-hetkeä, Part Three ennen perjantaita. Kaikki 17 välihetkeä säilyvät entisillä tunnisteilla.
- Sanna vetää baarissa oman kutsunsa takaisin liian nopeasti. Ihminen saa olla epävarma ja loukkaantunut, vaikka tietää illan menneen hyvin. Baarin kolme tarinavalintaa palaavat Sannan perjantain repliikissä ja säilyvät tallennuksessa. Nukkuvan Ekskyysmin aikana valinnan puhujana näkyy HUMAN.
- *Quiet.* on aidosti helpompi päivä: huumori, rekisterikilpipari ja valmis viisijalkainen kissa jäävät. Sama piirros jaetaan lopussa. Lomakkeen allekirjoitus ei haalista varjoa; iltaa ei selitetä vaikutuksen loppumisen kellonlyömällä. Sanna ei kutsu hiljaisen päivän ihmistä vääräksi versioksi itsestään.
- Riitan sävyä ei selitetä pois. Eero saa pettyä. Rewindin ulkopuolinen kuva myöntää, ettei tervehdyksestä ole tallennetta. Loppu ei riipu kaikkien hyväksynnästä: piirros jätetään näkyviin. Yövalo ja varjolintu ovat yksi pelaajan tahdissa katsottava loppukuva.
- Korjattu maanantain uusinnan ja Rewindin samannimisten funktioiden törmäys, tauolla jatkuneet animaatiokellot sekä nukkuvan varjon kuplien canvas-tilapinon vuoto. Lomake ja kuitti mahtuvat tekstipaneelin yläpuolelle; lomakkeen kysymykset voi lukea myös paneelista.
- `npm run pace`: **44:00**, 5 850 sanaa, maanantai B ja ensimmäiset sallitut valinnat. Arvio käyttää 230 sanaa/min, repliikkeihin 0,6 s lisän, valintoihin 4 s ja käsikirjoituksen odotuksia. Ei sisällä omia taukoja tai uudelleenlukemista; ei ole testipelaajan mitattu peliaika.
- Tarkistukset: 180 maanantain reittiä, 12 koko tarinan ajoa, tallennukset, baarin kaikki kolme tarinaa, osaotsikot, tauot ja loppukuva. Selaimessa 13 tilaa × 5 puhelinkokoa × 2 tekstikokoa: ei sivun/paneelin ylivuotoa tai ruudun ulkopuolisia valintanappeja. **0.41:n oikea laitetesti S23 Ultralla on vielä tekemättä.**
- APK:n rakennus: `tools\build-apk.cmd`. Ohje ja tarkistuksen rajat: [ANDROID.md](ANDROID.md). Tätä versiota ei ole julkaistu verkkosivulle tämän kierroksen aikana.

Versio 0.40 (Claude, 16.11.2026): **baari-ilta jatkuu: varjo torkahtaa, ilta onnistuu, ja lasku tulee aamulla.**

- *A quiet drink.* ei enää lopu maljaan. Kello 22:40 Ekskyysmi on juonut ”varjon yhdestä juomasta” ja torkahtaa (”I’m just resting my eyes. Keep an eye on… everything.”). Ihmisellä on silloin vain tavallinen varjo, eikä kukaan tarkasta mitään. Väsymys on syy, ei juoma: ihminen joi inkiväärijuomaa.
- Ilman suodatinta ihminen kertoo Sannalle sateenvarjotarinan (kolme tapaa, yksi alkaa vuodesta 2011), sanoo ruokalistan tuovalle baarimikolle ”Thanks, you too.” ja vastaa ”Yes. Obviously. YES.” Sanna nauraa kahdeksan kertaa, ja naapuripöytä liittyy seuraan.
- Aamulla Ekskyysmi herää ja isku tulee jälkikäteen: ”I was off duty. The bill came anyway.” Hän käy läpi ihmisen omat lauseet: ”You said “you too” to a MENU.”
- Ruudulle tulee kaksi ympyrää: **HOW THE EVENING WENT** (iso vihreä, ”Sanna laughed ×8”, ja reunassa pieni punainen piste: ”you too” to a menu) ja **HOW IT FEELS** (kokonaan punainen: ”everything is ruined”). ”Look at the green one.” – ”That’s just the background.” – ”I’m a shadow. I don’t do colour. I do the dot.”
- Kolme loppua: pisteen pienentäminen (”I can’t. I’ve laminated it.”), viesti Sannalle (”You were GREAT. … Bring the umbrella story.”) tai pisteen jättäminen paikalleen (”It can stay. Under supervision.”). Kuittiin rivi ”one good evening, audited · 2 h 30 min”.
- Idea ja kuva: Joonas (kuva *How the day went / How it feels*). Ero muihin poissaoloihin: *Quiet.* on rauhallinen poissaolo, tämä on poissaolo jossa tapahtuu; *Rewind.* vääristää toisen kasvot, tämä tarkastaa omat sanat.

Versio 0.39 (Claude, 16.11.2026): **uusi välihetki *Night shift.*: pimeässä kaikki varjot ovat samaa varjoa.**

- Ihminen nukkuu ja lamppu on sammuksissa. Varjolla ei ole valossa reunoja, joten Ekskyysmi ei ole pieni eikä poissa: hän on koko huone, ja näkyvissä ovat vain silmät. ”I’m not small. I’m not gone. I’m the whole room.”
- Ohi ajavan auton valot pyyhkäisevät huoneen, ja Ekskyysmi venyy kattoon. ”Every car that passes is a short holiday.”
- Pimeydestä ilmestyy muitakin silmäpareja: Sannan, Eeron ja Riitan varjot. Pimeässä he ovat samaa ainetta. Ekskyysmi saa ensimmäistä kertaa tietää, että kaikki tekevät samaa työtä: Eeron varjo kirjoittaa huomisen anteeksipyynnön etukäteen, Riitan varjo laskee yksitoista asiaa käsistään ja sanoo taas ”Heavy.” (”I say it every night. Somebody should.”), Sannan varjo valvoi kolmeen sanan ”fine” takia. ”There’s no meeting. It’s just dark. We’re always here.”
- Yksin jäätyään: ”You’ve gone somewhere again. I can’t follow. There’s no light in there.” – ”I’ll wait by the bed. You always come back.” – ”I check. Twice.”
- Aamulla 06:40 hän kokoaa itsensä nurkista: ”One arm is still under the bed.” Ihminen: ”Did you sleep?” – ”I had a meeting.” – ”With whom?” – ”Everybody. They’re all like us.”
- Paikka: heti *Evenings.*-hetken jälkeen, ennen perjantaita. Perjantaina Sannan varjo sanoo nyt ”Oh. Daylight. You look smaller.” – ”Evenings. Nights. And Fridays.”

Versio 0.38 (Claude, 16.11.2026): **uusi välihetki *Rewind.*: muisti muokkaa.**

- Kello 23:40 Ekskyysmi katsoo nauhalta Sannan maanantaisen ”oh, hi.” -tervehdyksen uudestaan. Joka kelauksella muisto pahenee: ”oh, hi.” → ”oh. hi.” → ”Oh. Hi.” → ”OH. HI.”, kulmat painuvat, suu kääntyy alas ja kuva punertaa. ”It’s getting WORSE. Which means it was always bad and I’m only now seeing it clearly.”
- Valinta: kelaa vielä kerran (Sannalle kasvaa sarvet: ”Memory is a living document.”) tai anna ihmisen katsoa alkuperäinen. Kumpikin päättyy alkuperäiseen nauhaan: Sanna kahvikoneella, vilkuttaa mukilla ja hymyilee. ”I’ll file it next to the other one.” – ”Which other one?” – ”The one with horns.”
- Paikka tarinassa: tiistain jälkeen, *Enhance.*-hetken ja *The posting* -hetken välissä (`AFTER[2]`). Myös Scenario labissa. Uusi ääni `rewind`.

Versio 0.37 (Claude, 16.11.2026): **rytmi, äänet ja kolme pistettä.**

- **Teksti hengittää.** Kuplan teksti ilmestyy edelleen noin 55 merkkiä sekunnissa, mutta piste, kysymys- ja huutomerkki pitävät pienen tauon, ajatusviiva hieman pidemmän ja kolme pistettä (…) pisimmän. Hiljaiset repliikit (`{quiet:1}`) tulevat hitaasti (30/s), kovat (`{loud:1}`) kerralla (85/s). *Less motion* näyttää tekstin heti.
- **Ensimmäinen napautus näyttää repliikin loppuun**, toinen siirtyy eteenpäin. Ennen napautus kesken lauseen hyppäsi suoraan seuraavaan ja vitsin loppu jäi lukematta.
- **Äänet:** puhekupla poksahtaa ilmestyessään (Ekskyysmillä matalampi poks), valikko aukeaa ja sulkeutuu omalla kaksisävelellään, ja tavalliset napit naksahtavat. Tarinan valinnoilla oli jo oma äänensä.
- **Torstai: kolme pistettä.** ”Seen 17:31.” -viestin alle ilmestyy Sannan kirjoitusindikaattori ja katoaa. ”And she TYPED. I saw the dots. Then she UN-typed.” – ”Maybe she sneezed.” – ”For two seconds? Nobody sneezes in paragraphs.” Selitys tulee myöhemmin itsestään: Sannan puhelimesta loppui akku.

Versio 0.36 (Claude, 16.11.2026): **toisen näytöksen viimeistely.**

- *Quiet.*- ja *Evenings.*-hetkissä ihmisellä on nyt **tavallinen varjo seinällä**: harmaa, silmätön, ja se nostaa kupin kun ihminen nostaa. Kun lamppu syttyy ja Ekskyysmi palaa, se katoaa.
- **1.0-kuitti on oikea paperikuitti** (sama piirto kuin jaettavassa kuittikuvassa), ja viikon loppukuitissa on rivi ”one quiet Monday, lived · 1.0 days”.
- 0.36.1: kulman rivi ”EKSKYYSMI’S JOB” lukee poissaolon aikana **”Vacant.”** ja paluun jälkeen ”Stay with you when it happens. Part-time.”
- 0.36.2: Ekskyysmillä on **oma istuma-asento** (`pose:'sit'`): *Nothing.*-hetkessä hän istuu seinän juurella polvet koukussa ihmisen vieressä.
- Tekemättä: oikea kotimatka *Quiet.*-hetkeen. Ks. [TOINEN_NAYTOS.md](TOINEN_NAYTOS.md), kohta 0.

Versio 0.35 (Claude, 16.11.2026): **toinen näytös: hiljaisuus.** Neljä uutta hetkeä torstain ja perjantain väliin (`src/49-second-act.js`, ohje ja tila: [TOINEN_NAYTOS.md](TOINEN_NAYTOS.md)).

- ***Nothing.*** Sunnuntai, pyykit, eikä kukaan ole sanonut mitään. Isku tulee silti. Ekskyysmi etsii syyllistä suurennuslasilla (”The sofa has an alibi.”), ihminen istuu lattialle, ja Ekskyysmi istuu ensimmäistä kertaa viereen. ”I’d like to file a complaint. About the absence of a cause.”
- ***The form.*** Odotushuone ja kahdeksantoista kysymystä. Ekskyysmi tunnistaa itsensä (”It’s a job description.” / ”…I thought I was bespoke.”), ihminen rastittaa ”yes” pelaajan valinnasta riippumatta, ja Ekskyysmi allekirjoittaa, koska allekirjoittaa kaiken. Allekirjoittaessaan hän haalistuu.
- ***Quiet.*** Maanantai ilman varjoa. Sanna sanoo ”oh, hi.”, eikä mitään tapahdu. Valinnat tekevät itsensä (uusi askel `{auto}`), ja Ekskyysmin kohdalla paneelissa on vain viiva. Sannan varjo kysyy: ”…Where’s yours?” Lopuksi kuitti, jossa lukee ensimmäistä kertaa *days lived: 1.0*.
- ***Evenings.*** Yhdeksältä illalla on pimeää ja huoneessa on lamppu. Pelaaja sytyttää sen (uusi askel `{lamp}`), ja varjo palaa pienenä: ”…Am I allowed?” – ”It’s nine. You’re on.” – ”I’ve gone part-time?” Lopussa: ”It was very quiet.” – ”You’re welcome.” – ”I missed it.”
- **Perjantai** sai kolme pientä lisäystä: ”You left the lamp on.”, Sannan ”There you are.” ja Sannan varjon ”Oh. You’re back.” – ”Evenings. And Fridays.”
- Lääkettä, diagnoosia tai ammattilaista ei mainita missään. Testi kieltää sanat koko käsikirjoituksesta.
- Uutta moottorissa: `{auto}`, `{lamp}`, pidot `sit` ja `sign`, tausta `clinic`, lomakkeen piirto, lattialla istuva ihminen, `shadowAway()`/`shadowBack()`.
- **Tarkistamatta:** oikea laite, ihmispelaaja ja rytmi. Kuvitus ja äänet ovat ensimmäinen versio; puutteet on listattu TOINEN_NAYTOS.md:n kohdassa 0.

Versio 0.34 (Claude, 16.11.2026): **aloitusmusiikki ja viisi uutta ilmettä.**

- **Aloitusruudulla soi musiikki** (*Safe At Last*, `assets/audio/title.mp3`, 2,8 Mt, pakattu 128 kbps:ään ilman kansikuvaa). Selain ja Androidin WebView eivät päästä ääntä läpi ennen ensimmäistä kosketusta tai näppäintä, joten musiikki alkaa siitä. Se häipyy, kun peli alkaa (hiljainen aamu pysyy hiljaisena), ja palaa aloitusruudulle palatessa. *Sound off*, tauko ja sovelluksen vaihto pysäyttävät sen.
- Musiikki toistetaan nyt `<audio>`-elementillä suoratoistona. Vanha tapa purki koko kappaleen muistiin, mikä olisi vienyt puhelimelta noin 60 Mt. Lisää kappaleita: rivi `MUSIC`-taulukkoon tiedostossa `src/10-audio.js` (esim. `walk`, `home`, `office`, `bar`), ja kohtaus soittaa sen itse.
- **Viisi uutta ilmettä**, kukin yhden repliikin mittainen (`['S','…',{look:'squint'}]`), minkä jälkeen kasvot palaavat perusilmeeseen:
  - *squint* (epäluulo: viirut ja yksi päättäväinen kulma): ”“Quick.””, ”Padding.”, ”She bit back. Affectionately. Is that allowed?”
  - *pleased* (itseensä tyytyväinen, silmät kaarella kiinni): ”I’ve kept it very quiet.”, ”Clean. Dignified.”, ”The peas will keep an eye on it.”
  - *stunned* (isot silmät, pisteen kokoiset pupillit): ”A thumb.”, ”“Seen.””, ”…She would have said yes.”
  - *soft* (isot lämpimät pupillit): ”You do?”, ”Nobody came to relieve me.”, ”…Yes. I’m coming.”
  - *up* (katse kattoon): ”For over an hour I grieved a battery.”
  Yhteensä 34 kohtaa tiistaista perjantaihin ja välihetkissä. Maanantain avaukseen ei lisätty mitään.

Versio 0.33 (Claude, 16.11.2026): **siivottu aloitusruutu, korostukset ja muutama täsmäilme.**

- **Aloitusruutu on otsikko ja kaksi nappia.** Yläpalkin kahdeksan nappia ovat nyt yhden *☰ Menu* -napin takana (sama valikko kuin puhelimessa), ja aloitusruudulla on linkki *Settings*. Pois: toistuva logo ja alaotsikko yläpalkista, ”A small social adventure / THE INSIDE VERSION” -palkki ja alareunan tekstit aloitusruudulta, sekä ”AN INTERACTIVE LITTLE OVERREACTION” kokonaan. Pelin aikana luku ja näppäinvihje näkyvät kuten ennen. Valikko pysyy auki, kun asetuksia vaihtaa.
- **Oletusfontti on pykälän isompi.** Koot ovat nyt *small / normal / large*, ja *normal* on entinen *large*.
- **Isot kirjaimet ovat korostus myös ruudulla.** Käsikirjoituksen VERSAALIT (”ONE thumb.”, ”It’s EVERYTHING.”) piirretään lihavampina ja Ekskyysmin kuplassa keltaisella, sekä kuplassa että tekstipaneelissa. Sääntö on automaattinen, 85 eri sanaa.
- **Kova ja hiljainen repliikki** (`['S','…',{loud:1}]` ja `{quiet:1}`): kuusi kovaa (”We were CRITICISED.”, ”It LANDED.”, ”I’m PROTECTING you.”) ja neljä hiljaista. Paras niistä: jättikuplan jälkeen ”…I’ll use a smaller font.” on oikeasti pienellä fontilla.
- **Täsmäilme** (`aside([...])`): sama katse vasemmalle ja suu supussa kuin kohdassa ”I was demonstrating scale”, nyt seitsemässä muussa kohdassa (”ONE thumb. She has two.”, ”…It’s filed.”, ”No.” linnusta, ”I may have supplied the asking.”). Muualla perusilme pysyy: se on hahmon vitsi.

Versio 0.32 (Claude, 16.11.2026): **palautekierros: vaarakohdat, selkeys, kädet ja koko ruutu.**

- **Lautasproseduuri poistettu** illasta (*An ordinary evening*). Seitsemän sekunnin laskettu rituaali näytti pakko-oireelta. Tilalla tavallinen tiskaus ja kolme repliikkiä: ”It’s the only ten minutes a day when nobody has an opinion about us.” – ”The plate might.” – ”…Don’t.” Periaate kirjattu [OUTOUDET.md](OUTOUDET.md):hen.
- **Kotimatkan autot** ovat nyt nokka jalkakäytävään päin, joten kilpi on edessä eikä kyljessä. Ajatusteksti nimeää kilven ja kertoo, mitä etsitään: ”ROS-151 … 1+5+1 = 7. a pair ✓”.
- **Kahvikuppi** on kädessä vain töissä aamupäivällä (ennen se oli mukana kolmelta yöllä ja kirjastossa). **Puhelin** on kädessä, kun puhelin puhuu, ja se tärisee saapuvasta viestistä.
- **Puhelimen äänet** ovat liioitellut: saapuva viesti surisee kahdesti kuin pöytä, lähetys on suhahdus, ”Seen” on yksi tylsä tömähdys, puhelu pirisee.
- **Selkeys:** kertojan nimi on ”NARRATOR” (oli ”A MOMENT LATER”). Tiistain leikkaukset saivat aikaleiman (”The next morning, 9:00. The quick chat.” ja ”9:12. Back at the desk.”). Välihetkien kortit: *One small thing.* on ”THE NEXT AFTERNOON” (kello on 14:05, kortti sanoi aamu), *The reply* on ”THE EVENING AFTER BOARD GAMES”, ilta on ”AN EVENING AT HOME”.
- **Android: koko ruutu.** `tools/android-patch.cjs` kirjoittaa nyt `GameApp.java`:n, joka piilottaa myös navigointipalkin ja antaa ikkunan ulottua kameraloven alle. `adjustMarginsForEdgeToEdge` on `disable`, koska sivu hoitaa turva-alueet itse. **Ei testattu laitteella**: Java on käännetty vain tynkäluokkia vasten. Aja `npm run android:sync` ja käännä uudelleen.
- [SUUNTA.md](SUUNTA.md) päivitetty: julkaisu ja pituuden lisääminen pois painopisteistä, ”valo määrää koon” hylätty, uusi painopiste ”isku ilman lähettäjää”.

Versio 0.31 (Claude, 15.11.2026): **puhujien värit, kamera joka nojaa sanailuun, ja yksi kortti jonka saa pudottaa.**

- **Puhujan nimi on puhujan värinen.** Ekskyysmi on violetti, ihminen keltainen, muut ihmiset persikka, muiden varjot sininen, puhelin vihreä ja kertoja harmaa. Sama väri näkyy puhujan kuvakkeessa ja Dialogue-lokissa. Fontteihin ei koskettu: koko valitaan valikosta (*Text: normal / large / largest*).
- **Kamera nojaa lähemmäs**, kun Ekskyysmi ja ihminen vaihtavat vähintään kolme lyhyttä repliikkiä peräkkäin, ja päästää irti ensimmäisestä pitkästä lauseesta, valinnasta tai tauosta. Enintään 7,5 %, ja *Less motion* pienentää sen alle puoleen. Ei käytössä kotimatkalla, ulkopuolisissa näkymissä, baarissa eikä suurennuslasin tai viestiluonnoksen aikana.
- **Uusi käsin tehtävä asia: irti päästäminen** (`src/59-toss.js`, askel `{toss:{…}}`). *Not now.* -hetkessä Riitan varjo jättää pallon lattialle, ja Ekskyysmi haluaa kokeilla itse: yksi kortti vuodelta 2011. Kortin voi raahata ja heittää, jolloin se lentää ja pomppii. Jos vain napauttaa, Ekskyysmi keksii kaksi tekosyytä (”It’s load-bearing.”) ja avaa kätensä kolmannella. Kortti jää lattialle. ”On the floor. Not on you.” Näppäimistöllä ja Let go -napilla sama toimii ilman raahausta.
- Maanantain loppuruutu mahtuu nyt 360 pikseliä korkeille puhelimille (vieritystä jäi 4 px, oli 54).

Versio 0.30 (Claude, 15.11.2026): **Riitan varjo, kuitti kuvana ja nopeampi alku.**

- ***Not now.*** sai Riitan varjon. Se jongleeraa yhtätoista asiaa eikä ehdi katsoa ketään. ”Not now” oli se yksi pallo, jonka se saa pudottaa. Isku pysyy totena (”It LANDED.” / ”They do. Sorry. Ten.”), mutta se ei ollut tuomio. Ekskyysmi ei ole pudottanut mitään vuoden 2011 jälkeen, ja varjo kysyy yhden sanan: ”Heavy?”
- **Kuitti kuvana.** Kuitin alla on nyt *Save as picture* ja *Copy text*. Puhelimen selaimessa kuva avaa jakovalikon, tietokoneella se tallentuu PNG-tiedostona. Android-sovelluksessa nappi kopioi toistaiseksi tekstin, koska WebView ei osaa jakaa tiedostoa ilman lisäosaa.
- **Alku on noin 12 sekuntia lyhyempi.** Hiljainen aamu kestää 16,5 s (oli 22 s), ja ennen ensimmäistä valintaa on kaksi repliikkiä vähemmän. Uusi vaihto: ”Coffee. I’ll handle the catastrophes.” / ”Then handle lunch. I’m asking her out loud.”
- Android: `android/gradle.properties` osoittaa nyt Android Studion JDK 21:een, joten `gradlew assembleDebug` toimii suoraan komentoriviltä. Tiedosto on vain omalla koneella, ei gitissä.

Versio 0.29 (Claude, 15.11.2026): **kaksi asetusta, jotka pelaaja saattaa tarvita.**

- **Text: normal / large / largest.** Kaikki luettava teksti (repliikit, valinnat, keskustelupäiväkirja) skaalautuu yhdellä napilla. Peli on lähes pelkkää lukemista, joten tämä oli saavutettavuuden tärkein puute. Valinta muistetaan.
- **Slow reality.** Oikean vastauksen ikkuna pitenee 2,8 sekunnista noin yhdeksään. Vitsi säilyy: ikkunan voi yhä missata, ja missaaminen on yhä tarina. Salainen lounaspolku ei enää vaadi nopeita sormia.
- **Valikko on kaksipalstainen** puhelimen vaakanäkymässä. Kahdeksan nappia ei mahtunut enää yhteen pylvääseen 360 px korkealla näytöllä (osa jäi ruudun ulkopuolelle); nyt ne mahtuvat ilman vieritystä.
- **Leima siirtyi rintakehälle.** Aiemmin se peitti ihmisen kasvot. Vitsi on kasvoissa, ei paperityössä.
- Asettelu tarkistettu uudelleen viidellä puhelinkoolla, myös isoimmalla tekstillä.

Versio 0.28 (15.11.2026): **Ekskyysmin leimasin.**

- **Rejection prevented.** Ekskyysmi nostaa leimasimen ja lyö ihmisen päälle vinon, punaisen leiman. Lyhyt kuiva ääni kuuluu osumassa. Leima korvaa aiemman pienen ”handled”-ilmoituksen: se on varjon oma julistus, jonka ihminen voi heti kyseenalaistaa.
- **Perjantaina sama leimasin jää ilmaan.** ”I’ve got a verdict ready.” – ”I know they are.” Varjo laskee välineen pois. Ei jälkeä, ääntä tai uutta repliikkiä.
- Testattu leiman ajoitus, tauko, vähennetty liike, hidas lukeminen ja kohtauksen vaihto. Leimasin ei muuta valintoja tai tallennuksen rakennetta. Piirto ja ajoitus ovat tiedostossa `src/58-stamp.js`.

Versio 0.27 (Claude, 15.11.2026): **puhelinkäyttö, jakaminen ja kaksi uutta elettä.**

- **Jatka kesken luvun.** Peli tallentaa nyt myös sen, missä välihetkessä pelaaja oli. Ennen tallennus tapahtui vain lukujen alussa, ja välilehden sulkeminen keskiviikon jälkeen saattoi maksaa kymmenen minuuttia tarinaa. Aloitusruudun nappi näyttää hetken nimen (”Continue · Sometime.”).
- **Linkin esikatselu.** `assets/share.png` (1200×630) ja og-metatiedot: kun linkin lähettää WhatsAppissa, Discordissa tai Signalissa, mukana tulee kuva ja kuvaus. Kuvaa ei pakata Android-sovellukseen.
- **Kupla, joka karkaa käsistä** (tiistai, 03:07): Ekskyysmi luettelee ”koko listan”, puhekupla kasvaa rivi riviltä huoneen suurimmaksi asiaksi ja painaa Ekskyysmin pieneksi. ”Who said all that?” – ”You did. It’s blocking the window.” – ”Imagine being under it.” – ”…I’ll use a smaller font.”
- **Varjolintu.** Kun ei ole mitään estettävää, Ekskyysmi tekee käsillään linnun. *An ordinary evening*: ”Is that a bird?” – ”No.” – ”It’s flapping.” – ”It’s a hobby. Shadows are allowed one. Don’t tell the office.” Lintu palaa sanattomana pelin viimeisenä kuvana.
- Tarkistettu viidellä puhelinkoolla (640×360 … 1024×480) ja pystyasennossa: ei JavaScript-virheitä, napit ruudulla, kosketusalueet vähintään 43 px.

Versio 0.26 (Claude, 15.11.2026): **rakenne.** Tarinan käännekohdat mitattiin ja keskikohta järjestettiin uudelleen. Perustelut ja taulukko: [KASIKIRJOITUS.md](KASIKIRJOITUS.md) → Rakenne.

- **Uusi järjestys:** maanantai · tiistai · *Enhance.* · *The posting.* · keskiviikko · *One small thing.* · *Evidence.* (keskikohta) · *Sometime.* · *Colleagues.* · *An ordinary evening* · torstai (pohja ja uusi työnkuva) · *The reply* · *Not now.* · *A quiet drink.* · perjantai · *The group chat*.
- ***An ordinary evening* on nyt tarinassa** (THE EVENING BEFORE): lautasjärjestys, laskeminen, hyräily ja Kaisa, joka nauraa, kun häntä korjataan. Läpipeluu on noin 38 minuuttia.
- **Torstai:** jos varjot ovat tavanneet, Ekskyysmi sanoo osuman jälkeen ”With a full stop.”
- **Torstain jälkeen:** *The reply*: ”This is the OLD job. I’m working out my notice.” – ”How long is the notice?” – ”Unclear. I wrote the contract.” *Not now.*: ”…Is this the staying part?” – ”This is the staying part.” – ”It’s mostly standing.”
- **Lounas pysyy auki perjantaihin:** maanantaina viestillä sovittu lounas siirtyy (”Dentist!! Sorry!! Friday?”), ja perjantaina Sanna sanoo ”Lunch? It’s Friday. No dentist.”

Versio 0.25 (Claude, 15.11.2026): **suurennuslasi kulkee mukana, ja Eerolla on varjo.**

- **Suurennuslasi on nyt Ekskyysmin tunnusväline koko tarinassa,** ei vain *Evidence.*-hetkessä. Nopea vilkaisu lasin läpi (`lensPeek`) tarkkaan valittuihin kohtiin: työpaikkailmoitus (”REQUIREMENT: ‘EXCELLENT’. WE ARE ‘FINE’.”), baarimikko (”POLISHING. OR AVOIDING. OR POLISHING.”), kirjastonhoitaja (”FACE: CURIOUS. SUSPICIOUSLY CURIOUS.”) ja perjantaina Sanna (”SANNA: ALSO UP TILL THREE.”), juuri ennen kuin hänen varjonsa paljastuu.
- **Eeron varjo** (*Sometime.*, nyt tarinassa keskiviikon jälkeen): Eero lähtee hissiin, hänen varjonsa jää. Sen kellossa ei ole viisareita. ”Half past four WHEN?” – ”Today. Gosh. Today is so soon.” ”Sometime” ei ole kohtelias ”ei koskaan” vaan toinen osasto: ”Booking it is MY department. I’m on it.” Varjo lähtee perään myöhässä: ”He’ll need me by Thursday. Roughly.”
- Tämä on pelin laajennussuunta: muut nepsypiirteet tulevat muiden ihmisten varjoina, ei uusina mekaniikkoina. Ks. KASIKIRJOITUS.md.

Versio 0.24 (Claude, 15.11.2026): **naamio, vetäytyminen ja harjoittelu.**

- **Naamion kaari:** ”Nothing big.” (maanantai), ”Fine. It’s nothing.” (tiistain hiljainen polku), ”Yeah. It’s nothing.” (One small thing.). Perjantaina Sanna kysyy ”You okay?”, ja ihminen vastaa ensimmäistä kertaa toisin: ”It’s something. Small. Give me a minute.” Ekskyysmi: ”…That’s not what we say. We’ve said it twice this week. I keep them in a folder.”
- **Uusi hetki *The posting.*** (tiistain jälkeen, THAT NIGHT, LATE): työpaikkailmoitus, joka on ”SO you”. Ekskyysmin taktiikat: arkistoi se laatikkoon ”later”, kirjoita heidän hylkäyksensä valmiiksi (”You are too long.”) tai kysy, mitä ihminen haluaa. Kahdessa ensimmäisessä: ”Applications sent: zero. Rejections: zero. Success rate: one hundred percent.” – ”Of nothing.” Perjantaina ilmoitus palaa: joko ”You can draft. I’ll send.” tai ”Then unfile it.” – ”There’s no form for that.” – ”Make one.”
- ***Not now.* -hetkeen:** ”the actual ‘no’ took four seconds. I rehearsed it for three hours and ten minutes.” – ”Before or after?” – ”Both. I’m thorough.”
- **Koko tarinan kuitti** muistaa nämä: ”“not now”, rehearsed 3 h 10 min / actual 4 s”, ”rejections avoided 1 · success rate 100 %” tai ”applications pending”, ja ”“it’s nothing”, said ×2”.
- Taustalla: Rowney-Smith ym. 2026 (vetäytyminen, naamioiminen, kehon tuntemukset) ja havainto, että odotettu torjunta tuntuu usein pahemmalta kuin itse torjunta. Ks. [SEURAAVAKSI.md](SEURAAVAKSI.md).

Versio 0.23 (15.11.2026): **varjot muistavat toisensa.**

- **Perjantain jälleennäkeminen:** jos *Colleagues.* on pelattu tarinassa, Ekskyysmi tunnistaa Sannan varjon ja ne palaavat radiatorin luona sovittuun tapaamiseen. ”I checked. Tuesday works.” – ”By the radiator.” – ”I moved a worry.” Kohtaaminen muistetaan myös luvun tallennuksessa. Vanhan tallennuksen ensimmäinen tapaaminen toimii edelleen.
- **Onnistunut maanantai näkyy tiistaina:** salaisen lounaspolun jälkeen Ekskyysmi arkistoi tyhjän raportin: ”I’ve filed the blank. For completeness.” Sovittu tuleva lounas erotetaan jo toteutuneesta.
- **Stay. Wobble visibly.** Varjo hakee tasapainoa kädet levällään ja asettuu muutaman huojahduksen jälkeen. Vähennetyllä liikkeellä näkyy vakaa tasapainoasento. Tauko ja kohtauksen vaihtaminen on tarkistettu.

Versio 0.22 (15.11.2026): **kaksi pientä elettä nykyisiin kohtauksiin.**

- **Colleagues. → Pretend to be a coat.** Ekskyysmi jähmettyy takiksi. Kun Sannan varjo huomaa silmät, ne siirtyvät napeiksi — ja räpäyttävät. ”Your buttons blink.” – ”Please don’t review the coat.” Naamio päättyy ennen kohtauksen hiljaista keskustelua.
- **A quiet drink. → For cover.** Ekskyysmi nostaa jo olemassa olevan juomasateenvarjon päänsä päälle ja kutistuu sen alle. Sitten varjo palauttaa sen juomaan ja ottaa kulauksen. Ei uusia repliikkejä tähän hetkeen.
- Eleet toimivat sekä tarinassa että laboratoriossa, pysähtyvät tauolla ja käyttävät vähennetyn liikkeen asetuksella suoria asennonvaihtoja. Testit tarkistavat myös, ettei naamio tai sateenvarjo kulkeudu seuraavaan kohtaukseen.

Versio 0.21 (Claude, 15.11.2026): **kaksi kelloa.**

- **Ulkona päivä on päivä, sisällä osa päivistä tulee kahdesti.** Ensimmäisestä osumasta lähtien loppupäivä eletään kahteen kertaan, ja piikit (säpsähdykset, arkistokäynnit, uusinnat, poistetut äänitykset, ylimuokkaukset, valvominen) tulevat päälle. Pelin aikana tätä ei näytetä HUDissa (kokeiltu, liikaa infoa), vaan se tulee ilmi tarinassa: tiistaiyönä 03:07 ”Out there, yes. In here it’s about Thursday. I did the afternoon twice.” ja kuitissa päivän lopussa.
- **Kuitti.** Maanantain lopussa tulostuu DAILY RECEIPT: A DAY, AWAKE 16 h 00 min, ”oh, hi.” 0.4 s, eriteltynä mihin sisäinen aika meni, ja lopuksi DAYS LIVED TODAY (missattu maanantai noin 2,1; salainen lounaspolku 1,1). Viikon lopussa: DAYS ON THE CALENDAR 5, DAYS LIVED noin 8–9. Perjantai on kevein (”rest of the day, 1.4 times”), koska Ekskyysmin työ on vaihtunut. **Copy receipt** kopioi kuitin tekstinä pelin linkin kanssa jaettavaksi.
- **Röntgensäpsähdys** (uusi hetki *One small thing.*, keskiviikon jälkeen ”THE NEXT MORNING”): Eero kehuu dioja ja sanoo ”Just one small thing.” Salama, ruutu pimenee, ja hetken näkyy röntgen: ihmisen luuranko ja haljennut sydän, varjon kohdalla ei luita vaan arkistokaappi (2011, 2016, 2019, TODAY), ja Eeron luuranko: HEART RATE: NORMAL. ”You okay?” – ”Yeah. It’s nothing.” – ”It is NOT nothing. I have the X-ray.” Pieni asia oli fontti. Vähennetty liike: ei välähdystä, pelkkä röntgen.
- **Myös pelaajan uusinnat kirjataan:** maanantain uusiminen näkyy seuraavassa kuitissa rivinä ”Mondays replayed, by you … noted”.
- **Välilehdeltä poistuminen huomataan.** Jos pelaaja on poissa yli kuusi sekuntia, Ekskyysmi: ”You left for 5 min. In here that was 2 h 30 min. I’ve prepared a statement.” Aika menee kuittiin riville ”waiting for you to come back”.
- Korjattu: alussa ihmisellä ei enää ole kahta varjoa (lattiavarjo on Ekskyysmi), kukaan ei kävele takaperin, ja mukin kahvan vihje lukee nyt ”(mug handle on the wrong side.)”.
- Kuittinäkymä on aseteltu niin, että napit ovat tekstin alla ja kuitti vieressä myös puhelimen vaakanäkymässä.

Versio 0.20 (Claude, 15.11.2026):

- **Oikean vastauksen ikkuna on nyt 2,8 sekuntia** (kosketusnäytöllä 3,1 s): alkuperäiset 0,8 sekuntia plus kaksi sekuntia lukemiseen. Ikkunan alareunassa lukee ”INCLUDES TWO SECONDS FOR READING · REALITY: ALREADY MOVING”. Salainen haara on nyt tarkkaavaiselle pelaajalle saavutettavissa, mutta ensimmäisellä kerralla useimmat lukevat vielä, kun aika loppuu.
- **Piirros-lanka on paikallaan:**
  - *Quick chat?*: arkiston vanhin kortti on ”YEAR 2 — Showed someone a drawing. Somebody laughed.”
  - *Seen.*: käänteen jälkeen ihminen kysyy, kauanko varjo on tehnyt tätä. ”Since a Tuesday. You were seven. … You showed someone a drawing. … I’ve been on shift ever since.” – ”Nobody came to relieve me.”
  - *The group chat* (pelin viimeinen hetki): ”Last time you showed someone a drawing, I got this job.” – ”I know. I’m doing it anyway.” Lopussa ”Year two. Somebody laughed.” – ”Eleven people liked it.” – ”…I’ll update the file.”, ja arkistoon ilmestyy ensimmäinen kortti toiseen pinoon.

Versio 0.19 (Claude, 15.11.2026): **oikea vastaus.**

- Heti kun Sanna sanoo ”oh, hi.”, ruudulle avautuu ikkuna: **RESPOND CORRECTLY** ja viisi askelta (↑ hymy, ↓ nyökkäys, ← katsekontakti mutta ei liikaa, → sano ”hi”, välilyönti hengitä). Aikaa on 0,8 sekuntia (kosketusnäytöllä 1,1 s ja napit sekaisin; versiosta 0.20 alkaen 2,8 / 3,1 s). Väärä näppäin, myös Enter, on ”INCORRECT.”
- Ikkuna on käytännössä mahdoton ensimmäisellä kerralla, joten **kaikki polut johtavat siihen, että kävelet kotiin yksin**: Sanna ja Eero lähtevät lounaalle ilman sinua. Kukaan ei torju ketään, hetki vain menee ohi sillä aikaa kun varjo analysoi. Rohkeinkin vaihtoehto (”Say hi back”) ehtii perille vasta tyhjään ovensuuhun.
- **Salainen haara:** joka osaa järjestyksen ja on tarpeeksi nopea, saa vastata ajoissa. Silloin koko spiraali jää väliin, lounas toteutuu, ja Ekskyysmi: ”Nobody has ever done it. I designed it so that nobody could do it.”
- Kotimatkalla ihminen voi silti lähettää yhden viestin (”Mention what I actually saw”), ja lounas siirtyy huomiseen.
- **Perjantaina sama ikkuna aukeaa uudestaan.** Ihminen sanoo vain ”Hi.”, ja kaikki viisi askelta syttyvät vihreiksi. ”That’s not the procedure.” – ”That’s the whole procedure.” Hälytys laukeaa silti: ”It still went off. Even though we got it right.”
- About-tekstissä lukee nyt: ”Almost nothing is timed. The one thing that is, isn’t fair. That’s the point.”

Versio 0.18 (Claude, 15.11.2026): **aika kelluu.**

- Peli ei ole enää ”viikko”, vaan jono pieniä hetkiä yhdestä elämästä. Viisi pitkää lukua ovat selkäranka, ja niiden väliin on sijoitettu seitsemän lyhyttä hetkeä (samat käsikirjoitukset kuin laboratoriossa).
- Kortit kertovat suunnilleen milloin, eivät minkä viikon: ”A MONDAY”, ”A WEDNESDAY, PROBABLY”, ”A MEETING, SOME MORNING”, ”AFTERWARDS”, ”A FRIDAY. NOT NECESSARILY THAT ONE.”
- Ensimmäinen järjestys: Oh, hi. → Quick chat? → *Enhance.* → Could you just… → *Evidence.* → *Not now.* → Seen. → *The reply* → *A quiet drink.* → *Colleagues.* → Oh, hi. Again. → *The group chat* → loppu.
- **Järjestystä muutetaan yhdestä paikasta:** taulukko `AFTER` tiedostossa `src/33-moments.js`. Hetken siirtäminen, poistaminen tai lisääminen on yhden rivin muutos.
- Sometime., An ordinary evening, The voice message ja A fine. ovat toistaiseksi vain laboratoriossa.
- Loppuruutu sanoo ”For now” eikä ”End of a small week”. Valikoissa luvut näkyvät nimillään (”Continue · Could you just…”).
- Tallennus toimii kuten ennen pitkien lukujen alusta. Jos pelin sulkee kesken lyhyen hetken, jatko alkaa sitä edeltävän pitkän luvun alusta.

Versio 0.17 (Claude, 15.11.2026):

- **Lab: The reply.** Uusi mekaniikka: viestin ylimuokkaus. Ruudulla on puhelin ja luonnos ”Hey! I had a really nice time on Thursday. We should do it again soon :)”. Ekskyysmi ehdottaa kolme kierrosta ”pieniä muokkauksia turvallisuuden vuoksi”, ja valitut sanat yliviivataan ja katoavat. Jäljelle jää esimerkiksi ”Hey! I had a on Thursday. :)” tai pelkkä ”ok”. Lopuksi pelaaja päättää, lähetetäänkö tynkä vai palautetaanko kaikki. Sannan vastaus riippuu siitä.
- **Lab: A fine.** Myöhässä oleva majakkakirja palautetaan kirjastoon. Kirjastonhoitaja on tiskinsä takana. ”That’ll be a fine.” – ”She says it’s FINE.” – ”A fine. Four euros sixty.” Kirjastonhoitaja on itse pitänyt saman kirjan kuusi viikkoa sivun 212 takia.
- Uusi puhuja LIBRARIAN.

Versio 0.16 (Claude, 15.11.2026):

- **Intro:** seinällä ei ole varjoa ennen kuin ihminen sanoo suunnitelmansa. Sitä ennen näkyy vain tavallinen varjo lattialla, ja Ekskyysmi nousee siitä.
- **Varjo ei tärise jatkuvasti.** Se tärisee osuman jälkeen ja rauhoittuu noin kymmenessä sekunnissa.
- **Aloitusruutu** on riisuttu: logo, yksi rivi ja New game (tai Continue ja New game). Chapters, Scenario lab ja About ovat pieninä linkkeinä. About kertoo, mistä pelissä on kyse.
- Ekskyysmi ei enää sano ”Your shadow”. Yläpalkissa lukee ”THE INSIDE VERSION”, joka vaihtuu ulkopuolisessa näkymässä muotoon ”THE OUTSIDE VERSION”.
- **Puhelin vaakasuunnassa (Android):** kohtaus täyttää ruudun, ja repliikki ja valinnat kulkevat kohtauksen alareunassa. Asetukset ovat yhden ☰-painikkeen takana. Kohtauksen omat HUD-kortit näkyvät hetken ja väistyvät. Tauolla kohtauksen napautus jatkaa peliä. Ks. [ANDROID.md](ANDROID.md).

Versio 0.15 (Claude, 15.11.2026):

- **Lab: A quiet drink.** Baari kuvattuna tiskin takaa: ihminen, varjo ja muut asiakkaat ovat tiskin toisella puolella puoliksi piilossa, ja baarimikko on tumma hahmo etualalla. Baarimikko palvelee ensin jonkun muun (”We are a coat stand with opinions”) ja sanoo sitten ”What?”. Ekskyysmi tilaa itselleen juoman varjon, jossa on sateenvarjo (”For cover.”). Loppu: ”Nobody is looking at us.” – ”I always thought that was the bad outcome.”
- **Lab: The voice message.** Ääniviestiin vastaaminen ääniviestillä. Otto 1, otto 2, otto 14. Ruudun kulmassa nauhoituspalkki (REC / DELETED). Sanna kuunteli viestin puolitoistakertaisella nopeudella teetä keittäessään.
- Uusi outous baarissa: ihminen laskee kulhon pähkinät.
- Uudet puhujat BARTENDER ja A STRANGER, uudet varjon asennot (juoma, kulaus, malja).

Versio 0.14 (15.11.2026):

- **Ryhmächatin kaksi rytmiä:** Scenario lab → The group chat. Alkuperäinen viestiryöppy tai ”One at a time”: pelaaja päättää, milloin viesti tulee luettavaksi ja milloin se pääsee ihmiselle. Kummassakin voi huitaista viestin pois myös lukemisen jälkeen. Kiireettömässä tilassa odottaminen ei tee päätöstä pelaajan puolesta.
- **Luettava viestiloki:** ulkonäkymän kaikki kahdeksan viestiä näkyvät myös tekstipaneelissa. Merkintä kertoo, luettiinko viesti ennen huitaisua vai pääsikö se ihmiselle. Viestit jäävät Dialogue-historiaan.
- **Seuraukset vastaavat tekoja:** pelkkää värikritiikkiä torjuttaessa dialogi ei väitä kehujenkin tulleen torjutuiksi. Ryhmän koko ja vastausten määrä eivät enää sekoitu loppuvitsissä.
- Testit kattavat lisäksi neljä kiireettömän chatin toimintatapaa, lukemisen odottamisen, tauon ja viestihistorian. Hahmojen piirtoa ei muutettu.

Ratkaisun tausta: [Academical-pelin laadullisessa tutkimuksessa](https://www.frontiersin.org/journals/virtual-reality/articles/10.3389/frvir.2022.847120/full) pelaajat kuvasivat turhautumista epäselvään palautteeseen ja pakotettuihin etenemistapoihin. [Pelisuunnittelufoorumilla](https://www.reddit.com/r/gamedesign/comments/1t2qt9i/do_delayed_consequences_actually_work_for_you_in/) korostui seurauksen yhdistäminen aiempaan tekoon. Näistä johdettu oma suunnittelukokeilu on antaa tilaa lukea ja näyttää täsmällisesti, mitä omalle viestille tapahtui. Foorumi on kokemuslähde; nämä lähteet eivät osoita tämän pelin toimivuutta tai hoitovaikutuksia.

Versio 0.13 (Claude, 15.11.2026):

- **Rauhallinen alku.** Uusi peli alkaa päiväkortilla ja hitaalla häivytyksellä tyhjään taukohuoneeseen. Ihminen tulee sisään, keittää kahvin, kääntää mukin kahvan samaan suuntaan muiden kanssa ja juo kulauksen. Varjo on tavallinen varjo seinällä. Vasta kun ihminen sanoo ”Today I’m going to ask Sanna to lunch”, Ekskyysmi avaa silmänsä. Intron voi ohittaa (”Skip intro”).
- **Logo** noudattaa kansion `assets/branding` logoa: suurennuslasi, jonka sisällä silmät, ja nimen perässä piste. Silmät vilkuilevat aloitusruudussa.
- **Kaksi uutta lab-kohtausta:** *Colleagues.* (Sannan varjo sanoo Ekskyysmille ”oh. hi.”) ja *Not now.* (se yksi oikea torjunta: Riitta on tyly, eikä pyydä anteeksi).
- Ensimmäistä valintaa ennen ihminen sanoo ”Suggest something. I’ll decide.”, jotta pelaaja tietää, että vaihtoehdot ovat varjon ehdotuksia.
- Kansio `assets/branding` ei mene Android-pakettiin (kuvat ovat yhteensä 2,5 Mt eikä peli lataa niitä).

Versio 0.12 (Claude, 15.11.2026):

- **Suurennuslasi** on Ekskyysmin työkalu ja pelin tunnus: logossa lasi pitää sisällään pisteen, kuvakkeessa Ekskyysmi katsoo lasin läpi. Uusi lab-kohtaus **Evidence.**: lasia voi liikuttaa huoneessa, ja kaikki sen alla näyttää pahemmalta. Lopussa ihminen kääntää lasin Ekskyysmiin.
- **Puhelin vaakasuunnassa:** kohtaus vasemmalla, teksti ja valinnat oikealla, mikään ei vieri. Android-pohja (Capacitor) on valmiina, ks. [ANDROID.md](ANDROID.md).
- **Koodin rakenne:** peli kirjoitetaan nyt osina kansioon `src/`, ja `node tools/build.cjs` kokoaa niistä tiedoston `assets/game.js`. Ks. alla ”Koodin rakenne”.
- **Äänille on paikka:** tallennetut tehosteet ja musiikki lisätään listaamalla tiedosto (`SAMPLES`, `MUSIC` tiedostossa `src/10-audio.js`). Ilman tiedostoja peli käyttää nykyisiä syntetisoituja ääniä.
- Ihmisen nimilappu on taas HUMAN, työkaveri on Eero, ja yläpalkissa lukee ”YOU ARE THE SHADOW”.
- Käsikirjoituksen ja draaman kaaren arvio sekä uudet kohtausluonnokset: [KASIKIRJOITUS.md](KASIKIRJOITUS.md).

Versio 0.10 (Claude) lisää skenaariolaboratorion: aloitusruudun ”Scenario lab” avaa irrallisia kohtauksia, joilla kokeillaan ideoita ennen kuin ne liitetään viikon tarinaan.

- **Enhance.** Riitta sanoo kokouksessa ”Interesting.” ja nostaa kulmakarvaa. Varjo zoomaa rikossarjatyyliin neljä kertaa: kulmakarva mitattuna (12°, ”textbook disdain”), yksittäinen karva (”a hair with an AGENDA”), pikselit ja lopulta silmän heijastus, jossa näkyy kello 11:58. Kulmakarva oli nälkää.
- **The group chat.** Boss-taistelu. Ihminen jakaa piirroksen ryhmächattiin, Ekskyysmi laittaa ninjapäänauhan. Vastaukset lentävät kohti tikareina, joissa näkyy vain pätkä (”ok.”, ”hmm”, ”…”). Napautus huitaisee lähimmän pois. Jos odottaa, tikari aukeaa ja vastaus näkyy kokonaan: seitsemän kehua ja yksi mielipide väreistä. Lopuksi ”What was actually sent” näyttää kaikki viestit, huitaistut yliviivattuina. Varjo: ”From a distance, ’ok.’ looks EXACTLY like a dagger.” Pelin tärkein ajatus mekaniikkana: kaikki, mikä tuntuu kritiikiltä, ei ole sitä, ja sen näkee vain päästämällä lähelle.

Versio 0.11 (Claude) tuo peliin ihmisen omat pienet tavat (”outoudet”), enimmäkseen ilman dialogia. Kokoelma ja periaatteet: [OUTOUDET.md](OUTOUDET.md).

- **Viikossa:** maanantain kotimatkalla ihminen laskee pysäköityjen autojen rekisterikilpien numerot yhteen, torstaina snack-pussit.
- **Lab: Sometime.** ”We should grab a coffee sometime.” Ihminen haluaa päivän ja kellonajan, varjo haluaa tietää, tarkoitettiinko sitä.
- **Lab: An ordinary evening.** Rappusten laskeminen, lautasproseduuri, kesken jäänyt hyräily, liioittelun korjaaminen ja myöhässä oleva kirjastonkirja.

Android-suunnitelma on tiedostossa [ANDROID.md](ANDROID.md).

Versio 0.9.2: työkaveri Mika nimettiin uudelleen (nykyään Eero). Hahmojen vaatteet eivät enää kuulta läpi huipussa, Sannan varjo lähtee hänen jaloistaan kuten ihmisen varjo, ja keskiviikon miellyttämishymy on luettava (hampaat, väpättävät suupielet; ”That’s the smile. It’s load-bearing.”).

Versio 0.9.1: arkistokortit ovat isompia ja pysyvät ruudulla, kunnes pelaaja jatkaa (kertoja-rivi ”Ekskyysmi opens the archive…”). Hikoilu loppuu, kun hetki loppuu; kotimatkalla ei enää hikoilla.

Versio 0.9 (Claude) lisää kolme pelillistä vitsiä tutkimusmuistiosta, ei terapiakeinoja. Kehonkieli: hiki, punastus ja leveä hymy näkyvät vain sisänäkymässä, ulkonäkymä ei näytä mitään (tiistaina hikilätäkkö: ”The puddle is MY department”, keskiviikkona hymy levenee joka myöntymisellä, perjantaina Sannallakin on hikipisara). Uusintakela: kotimatkan ”Review the ’oh’” näytetään kolmena yhä vääristyneempänä uusintana (restored, enhanced, director’s cut yleisöineen) ja lopuksi alkuperäisenä nauhana. Arkisto: isoimmat osumat tuovat ruudulle vanhoja arkistokortteja; perjantaina syntyy toinen pino. Tutkimusmuistion ”Nimeä se” jätettiin pois, koska se olisi opettavainen keino.

Versio 0.8 (Claude) tuo fyysiset hetket takaisin harkiten, noin yksi päivässä. Maanantaina valittu suojautumiskeino tehdään itse pitämällä painiketta tai kohtausta pohjassa: silmien peittäminen, ulos vieminen tai paikallaan pitäminen. Silmiä peittäessä Sanna vilkuttaa (harmittomana ja herkkänä päivänä); jos pelaaja päästää irti vilkutuksen aikana, ihminen näkee sen ja tarina jatkuu ”hi”-polkua. Torstain käänteen jälkeen uusi teko on pysyminen: neljä minuuttia tekemättä mitään. Perjantaina sama teko toistuu julkisesti. Keskiviikon ”No.” näyttää tavalliselta vaihtoehdolta, mutta varjo istuu sen päällä. Osuma tuntuu nyt rinnassa: ruutu tärähtää, reunat sykkivät ja kuuluu sydämenlyönti. Varjo hengittää ja räpyttää. Pito toimii hiirellä, kosketuksella ja näppäimistöllä; muutama napautus riittää myös. Continue-painikkeen teksti ei enää katoa hiiren alla.

Versio 0.7 (Claude) korjaa pelaajan havaintoja ja lisää äänen. Kohtauksen puhekupla näyttää nyt aina koko repliikin ja kirjoittaa sen auki; kolmen pisteen paikanpitäjää ei enää ole (kapealla näytöllä teksti luetaan paneelista). Katseen valokeila lähtee silmistä vain silloin, kun joku oikeasti katsoo; kun hän kääntyy pois, valo jää ihmisen päälle ilman lähdettä. Ulkonäkymässä ei ole enää varjoa seinällä. Sannalla on kaula. Nimeä ei selitetä alussa eikä aloitusruudussa. Ääni: jokaisella hahmolla on oma puhepiipityksensä (varjon ääni madaltuu sen kasvaessa), lisäksi osuma, säikähdys, puhelin, leikkaus, lukukortti ja tehtävänkuvan käänne. Yläpalkissa on Sound on/off, ja valinta tallentuu. Äänet syntetisoidaan selaimessa, äänitiedostoja ei ole.

Versio 0.6 (Claude) laajentaa pelin viikon mittaiseksi tarinaksi. Punainen lanka on varjon tehtävänkuva: se on koko alkuviikon ”Keep you from being rejected”, ja se kirjoitetaan uusiksi vasta torstain pohjakosketuksen jälkeen. Versiossa 0.5 lisätyt nimen selitys ja pureminen säilyvät maanantaissa.

| Päivä | Luku | RSD:n puoli | Pelillinen vitsi |
| --- | --- | --- | --- |
| Maanantai | Oh, hi. | Monitulkintainen vihje, välttely, pureminen | Venytys, ulkonäkymä, kotimatka (aiempi sisältö) |
| Tiistai | Quick chat? | Palautteen pelko, kello 3:n arkisto, kehut eivät tartu | Viestiluonnokset; yksi huomautus täyttää ruudun, kehut katoavat |
| Keskiviikko | Could you just… | Miellyttäminen, ”ei” on mahdoton | ”No.” on valikossa mutta poissa käytöstä; ”Things agreed to” -laskuri |
| Torstai | Seen. | Vastaamaton viesti, ennakoiva vetäytyminen, riita ja käänne | Varjo saa itse osuman; ”paper cut / amputation” -puhe; tehtävänkuva vaihtuu |
| Perjantai | Oh, hi. Again. | Se laukeaa yhä; asian sanominen ääneen; muillakin on varjo | Sama kohtaus uudestaan; Sannan varjo; ”No.” on nyt valittavissa |

Aloitusruudussa on New game, ja edistyminen tallentuu selaimeen: Continue ja päiväkohtaiset luvut ilmestyvät, kun niihin on päästy. Maanantain kolme satunnaista päivätyyppiä säilyvät, ja myöhemmät luvut reagoivat niihin kevyesti. Maanantain loppukortista jatketaan tiistaihin tai pelataan maanantai uudelleen. Uudet luvut ovat ensimmäinen luonnos: dialogia ja rytmiä ei ole testattu pelaajilla.

Versiossa 0.4 on oma Ekskyysmi-aloitusruutu ja Fraunces-otsikkofontti, uudistetut hahmot, puhelimeen mukautuva asettelu ja luettavampi dialogipaneeli. Pelaaja voi venyttää varjon varoitusta liukusäätimellä tai vetämällä kohtauksessa ylöspäin. Valintojen esikatselut näyttävät varjon aikeita, ja ulkopuolisen näkökulman saa lukea omaan tahtiin. Lopussa voi kokeilla samaa päivää toisella valinnalla tai aloittaa erilaisen päivän. Keskusteluhistoria, tauko ja vähennetty liike löytyvät yläpalkista.

Kotimatkalla voi käsitellä kaikki kolme aihetta tai valita suoraan jatkamisen kotiin. Venytyksen jälkeinen vitsi reagoi varjon kokoon, ja jälkipuinti perustuu valitun polun havaintoihin. Varjon piirto on palautettu täsmälleen Clauden 0.3-version mukaiseksi; muu uudistettu grafiikka säilyy. Loppu kuvaa tapahtunutta ilman sosiaalisen onnistumisen pisteitä. Kohtaukset ja uusi venytys ovat edelleen kokeiltavia suunnitteluratkaisuja, eivät pelaajatesteillä vahvistettuja päätöksiä.

## Koodin rakenne

**Älä muokkaa tiedostoa `assets/game.js` suoraan.** Se kootaan osista, ja suora muutos katoaa seuraavassa koonnissa. Testi epäonnistuu, jos `assets/game.js` ei vastaa osia.

| Tiedosto | Sisältö |
|---|---|
| `src/00-core.js` | Vakiot, canvas, koko |
| `src/10-audio.js` | Puhepiipitys, tehosteet, paikka tallennetuille äänille ja musiikille |
| `src/20-engine.js` | Tila, käsikirjoitusmoottori, pitohetket, näyttämöohjeet |
| `src/29-prelude.js` | Hiljainen alku, Colleagues, Not now |
| `src/30-story-monday.js` | Maanantai ja kotimatka |
| `src/31-story-week.js` | Tiistai–perjantai |
| `src/33-moments.js` | Tarinan järjestys: mitkä lyhyet hetket tulevat minkä luvun jälkeen |
| `src/34-response.js` | Oikea vastaus: maanantain ikkuna, salainen haara, perjantain vastinpari |
| `src/35-inside.js` | Kaksi kelloa, kuitit, välilehdeltä poistuminen, röntgensäpsähdys, One small thing |
| `src/57-posting.js` | The posting., naamion laskuri, perjantain paluu ja koko tarinan kuittirivit |
| `src/40-backdrops.js` | Koti, toimisto, Sannan varjo |
| `src/50-lab.js` | Skenaariolaboratorio, Enhance, The group chat |
| `src/51-quirks.js` | Outoudet, Sometime, An ordinary evening |
| `src/52-glass.js` | Suurennuslasi, Evidence |
| `src/53-bar.js` | Baari tiskin takaa, A quiet drink |
| `src/54-voice.js` | The voice message |
| `src/55-reply.js` | Viestin ylimuokkaus, The reply |
| `src/56-library.js` | Kirjasto, A fine |
| `src/60-update.js` … `src/90-loop.js` | Päivitys, piirto, valikot ja syötteet, pääsilmukka |

Uusi kohtaus tai mekaniikka saa oman tiedostonsa (esim. `src/53-uusi.js`). Tiedostot liitetään nimen mukaisessa järjestyksessä.

```
node tools/build.cjs      kokoaa assets/game.js
npm test                  tarkistaa koonnin ja ajaa tarinatestit
```

Toteutus: [pelilogiikka ja käsikirjoitus](assets/game.js), [ulkoasu](assets/game.css). Kirjasimet ja niiden OFL-lisenssit ovat kansiossa `assets/fonts`. Clauden alkuperäinen itsenäinen 0.3-versio on säilytetty [vertailukappaleena](research/prototypes/taukohuone-0.3.html).

Tarkistus: `node tests/story.test.cjs` käy läpi 12 kokonaista viikkoa, neljä luvusta aloitusta, 180 maanantain tarinapolkua, 360 omaan tahtiin jatkuvaa näkökulmanvaihtoa sekä venytyksen, tauon, dialogihistorian ja näppäimistön keskeiset tilat. Nämä ovat logiikkatestejä; ne eivät korvaa pelaajatestausta.

Päivitetty 15.11.2026. **Pelin nimi on Really Small Deal, varjon nimi Ekskyysmi.** Projekti on prototyyppivaiheessa; julkaisutapaa ei ole päätetty.

**Hyväksytty ydin:** humoristinen peli tavallisesta ihmisestä ja hänen elävästä varjostaan. Varjo voi muuttua möröksi, joka pelottelee ja säikähtää myös itseään. Ulkoinen tilanne voi olla ohi, vaikka sen vaikutus jatkuu ihmisen kokemuksessa.

Uusin hahmosuunta on haamumainen, pehmeästi muuntuva varjo. Ekskyysmi voi toimia myös sen työnimenä. Ulkopuolisuuden ja irtaantuneisuuden tunne on kokemuksellinen suunnittelulähtökohta: ihminen voi olla tilanteessa mukana ja silti tuntea olevansa siitä erillään.

## Lue seuraavassa järjestyksessä

000. [Jatko Codexille](CODEX_JATKO.md): luovutus 16.11.2026, työjono P1–P8 tärkeysjärjestyksessä.
00. [Toinen näytös](TOINEN_NAYTOS.md): seuraavan ison työn toteutusohje (16.11.2026). Työtavat koodaavalle agentille: [AGENTS.md](AGENTS.md).
0. [Suunta](SUUNTA.md): mihin peli kasvaa viikon jälkeen, seitsemän painopistettä ja kaksi valmiiksi kirjoitettua kohtausta (15.11.2026).
1. [Seuraavaksi](SEURAAVAKSI.md): työlista tärkeysjärjestyksessä, tutkimuksesta johdetut käsikirjoitusideat, julkaisu ja rahoitus. **Aloita tästä.**
2. [Käsikirjoitus](KASIKIRJOITUS.md): kaari, tasapaino, Ekskyysmin hahmo ja kaksi kelloa.
3. [Outoudet](OUTOUDET.md): ihmisen pienet omat tavat ja missä ne näkyvät.
4. [Pelin konsepti](PELIKONSEPTI.md): alkuperäinen ydin ja sen perustelut.
5. [Android](ANDROID.md) ja [Git](GIT.md): julkaisu puhelimeen ja yhteistyö GitHubissa.
6. [Peli](index.html): versio 0.41, viisi päälukua ja 17 välihetkeä, kolme osaa. Yhden reitin laskennallinen lukuaika noin 44 minuuttia.

Vanhemmat suunnitelmat ([Toteutuksen suunnittelu](TOTEUTUKSEN_SUUNNITTELU.md), [Arvio ja jalostus](ARVIO_JA_JALOSTUS.md), [Tutkimus ja mekaniikat](TUTKIMUS_JA_MEKANIIKAT.md)) säilyvät historiana.

## Taustamateriaali

- [Jatkotutkimus ja nimivertailu](JATKOTUTKIMUS_JA_NIMET.md): uudet tutkimus- ja foorumihavainnot, kolme rajattua tarkennusehdotusta sekä nimien kärkiehdokkaat ja alustava löydettävyyskatsaus.
- [AWA-analyysi](awa-analyysi-ja-huumorin-ydin.md): alkuperäispelin dramaturgia ja pelillinen huumori. Loppuosan vanha velkakirjanpitokonsepti on sivuun jäänyt ehdotus.
- [Alkuperäinen tutkimus- ja niche-kartoitus](konsepti-ja-niche-2026-11-14.md): kokemuksia, kilpailijoita ja kysyntähypoteeseja. Päivystyskonsepti ja sen toteutusehdotukset on korvattu.
- [AWA:n alkuperäiset käsikirjoitukset](research/awa-source): analyysia varten tallennettu lähdeaineisto, ei oman pelin toteutus.

Ristiriitatilanteessa PELIKONSEPTI.md kuvaa nykyistä suuntaa. Uudet mielleyhtymät arvioidaan suhteessa tähän ytimeen; ne eivät yksin muuta hahmoa, maailmaa tai pelimekaniikkaa.

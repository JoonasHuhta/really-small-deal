# Syvätarkastus 27.11.2026 (versio 0.99.43)

Joonaksen pyyntö: analysoi peli kunnolla, ja korjataan sitten ehdotusten mukaan. Tarkastus kattaa RSD:n kuvauksen, huumorin, sujuvuuden, sen onko Ekskyysmistä otettu kaikki irti, dialogipuiden ja haarojen yhteispelin sekä puuttuvat mekaniikat. Kevyemmät mallit voivat toteuttaa §8:n tehtävät yksi kerrallaan. Jokaisessa tehtävässä kerrotaan, missä tiedostossa työ on ja milloin se on valmis.

**Tila 27.11.2026 klo 17.47:** Joonas hyväksyi kaikki ehdotukset (”olen kaikesta samaa mieltä”). Myös päätöstä odottaneet tehtävät ovat nyt hyväksyttyjä. Toteutusjärjestys on §11:ssä ja valmis kehote toteuttavalle mallille §12:ssa.

**Tila 27.11.2026 klo 20.55: toteutettu 0.99.44–0.99.52.** Kaikki §8:n tehtävät on tehty §11:n järjestyksessä, ja jokainen versio on GitHubissa, C:\RSD:ssä ja artefaktissa (yksityiskohdat TARINAKARTTA.md:n versiolokissa). Poikkeamat ohjeesta, koska koodi oli totuus:
- **D5:** laatikko on kaapin *vasemmalla* puolella, koska oikealla ihmisen pääkallo peittää sen kummassakin epilogin röntgenkuvassa.
- **T8:** Auto etenee myös hiljaisesta kuvasta (`{still}`, lyhin lukuaika 1,4 s), ja iso repliikki odottaa, kunnes se on kokonaan seinällä. Ilman tätä Auto pysähtyi sunnuntain ryhmächatin jälkeen.
- **T9:** kelaus ohittaa myös nähtyjen rivien väliset tauot (`{wait}`), muuten se pysähtyisi lähes jokaisen rivin jälkeen. Vertailu tehdään vain siihen, mitä oli nähty ennen tämän pelikerran alkua, joten ensimmäisellä kerralla nappia ei näy edes kahdesti sanotulle repliikille.
- **T10:** uusien liitännäisten vuoksi `tools\build-apk.cmd` ajaa `npm ci`:n, jos `@capacitor/share` puuttuu, ja `android-patch.cjs` / `android-check.cjs` huolehtivat FileProviderista.
- **Lisäksi 0.99.47:** löytyi bugi, joka ei ollut listalla. 0.99.35:n kommentilta puuttui rivinvaihto, ja päivityssilmukan rivin loppu ei ajanut: Ekskyysmi oli näkymätön pelin alussa heräämisensä jälkeen, eivätkä Sannan, Eeron ja Riitan varjot tulleet näkyviin. Korjattu ja testattu.
- **Avoinna:** T10:n puhelintesti (ANDROID.md).

**Lyhyesti**

1. **Peli on hyvässä kunnossa.** Käsikirjoitus on pelin vahvin osa: tiivis, hauska ja RSD:n suhteen tarkka. Haarat pysyvät koossa, ja testit pelaavat ne kaikki läpi.
2. **Suurin mekaniikan aukko: muki ei vaikuta mihinkään.** Muki näyttää hinnan, mutta tarinassa yksikään valinta ei riipu mukista. VISIOn kasvutaito *”Is that the mug talking, or the door?”* on vain labran prototyypissä.
3. **Ekskyysmin oma luova teko ei ole pelaajan teko.** Lintu on Ekskyysmin kaaren huipennus (#25), mutta pelaaja vain katsoo sitä. Pitosysteemi on jo olemassa, joten pelaajasta voi tehdä linnun tekijän pienellä työllä.
4. **Pieniä säröjä:** perjantain ”on Monday” sekoittuu *Quiet*-kohtauksen maanantaihin, epilogi näyttää metodit kahdesti ja About lupaa 50 minuuttia, vaikka mittari sanoo 55. Röntgenin sydän oli väärällä puolella, ja se on korjattu (0.99.43).
5. **Sujuvuus:** läpipeluussa on noin 1 200 riviä, eli napautus noin kolmen sekunnin välein. Automaattinen eteneminen ja jo nähdyn ohitus helpottaisivat erityisesti puhelimella ja uusintapeluussa.

---

## 0. Miten tarkastin

- Pelasin koko tarinan testivaljaissa neljällä valintalinjalla ja kaikilla kolmella maanantailla (A, B, C). Luin yhden reitin koko transkriptin rivi riviltä (1 387 riviä) ja muista reiteistä erot.
- Ajoin tarinan ulkopuoliset hetket erikseen ja luin ne: *Sometime*, *One small thing*, *The reply*, *The voice message*, *Footage* ja kokeilussa olevat kuusi.
- Mittasin repliikkimäärät puhujittain, isot kirjaimet, tauot, latistavat vastaukset, toistuvat rivit, asetettujen ja luettujen tilamuuttujien suhteen sekä rytmin (`npm run pace`).
- Luin TARINAKARTTA.md:n, EKSKYYSMI.md:n, VISIO.md:n ja AGENTS.md:n ja tarkistin jokaisen alla esitetyn väitteen koodista.

**Ei tarkistettu:** pelikokemusta oikealla puhelimella, koska kaikki tämä on mitattu koneella. Rytmiluvut ovat arvioita.

---

## 1. Kokonaisarvio

| Alue | Arvio | Perustelu |
|---|---|---|
| RSD:n kuvaus | Erinomainen | Kaikki keskeiset piirteet ovat mukana, ja ne näytetään tilanteina eikä selityksinä (§2). |
| Huumori | Erinomainen | Ääni on johdonmukainen ja rauhoittuu mitattavasti osa osalta (§3). |
| Haarat ja langat | Vahva | Kolme maanantaita, takaisinkytkennät ja testit pitävät haarat koossa. Löytyi kaksi pientä säröä (§6). |
| Sujuvuus | Hyvä | Tekemistä on monipuolisesti, mutta napautuksia on paljon eikä automaattista etenemistä ole (§4). |
| Ekskyysmi | Vahva, ei loppuun käytetty | Ilmaisukeinoja on paljon, mutta pelaaja ei tee yhtäkään Ekskyysmin omaa luovaa tekoa (§5). |
| Mekaniikka | Yksi selvä aukko | Muki on mittari ilman päätöksiä (§7). |

---

## 2. RSD

### 2.1 Mikä on kohdallaan

| Piirre | Missä se näkyy |
|---|---|
| Ylivalppaus sävylle ja välimerkeille | ”oh, hi.” ja piste (#2), ”Quick.” (#3), ”Seen 17:31” ja kirjoituspisteet (#10) |
| Katastrofointi | Kello 03:07 lista, joka kasvaa ikkunan peittäväksi (#6), ”Rejection prevented.” |
| Märehtiminen | Maanantain uusinta kotimatkalla, *Rewind* (#5), ”in the shower” (*One small thing*, Moment) |
| Muistin vinouma | ”I only wrote down ’shorter’. In capitals. Twice.” (#6) ja toinen laatikko, johon hyvät asiat kätketään (#23) |
| Miellyttäminen ja maskaaminen | Keskiviikon kyllät ja takki (#6) |
| Ennakoiva torjunta | ”Leave before we’re left.” (#10), valmiiksi kirjoitettu hylkäys (#19) |
| Tunne kehossa | ”It’s my chest. You just do the commentary.” (#10), röntgen |
| Suhteettomuus | Ulkoversiot (WHAT THE OTHERS SAW ja muut, 22 kpl läpipeluussa): sisällä viikko, ulkona kaksi sekuntia |
| Oikea torjunta, jonka kestää | *Not now.* (#11), maanantai C (”no need to ask the others”) |
| Säätelyn pettäminen | ”Fine.” Sannalle (#6), romahdus (#10), korjaus kasvokkain (#22) |
| Jälkikrapula | ”Lying on the floor. All day.” (#12), kuitin *RECOVERY AFTER ONE LUNCH* |
| Avun hakeminen nimeämättä | *Nothing.* → puhelu → lomake, pussi ja tuoli (#14, #16). ”It doesn’t make you go away.” |
| Kasvu on pysymistä, ei katoamista | ”It still went off. Even though we got it right.” (#22) |

Peli ei nimeä mitään, ei neuvo eikä anna alkoholin korjata mitään. Sisältösääntöjen sanaseula ei löytänyt pelitekstistä yhtään rikettä.

### 2.2 Mitä jää ohueksi (ei vaadi isoja lisäyksiä)

- **Hyväksynnän ylilyönti.** RSD:hen kuuluu usein myös voimakas helpotus tai riemu, kun joku on lämmin. Ekskyysmi reagoi lämpöön lähinnä epäluulolla (”She MISSED us?”). Yksi riemun ylilyönti riittäisi, esimerkiksi kirjastossa (#15), kun kirjastonhoitaja paljastuu majakkojen ystäväksi: Ekskyysmi alkaa heti suunnitella yhteistä majakkamatkaa. (tehtävä D7)
- **Odottaminen avun äärellä.** #14 lupaa ”I’m going to ring someone tomorrow.”, ja lomake (#16) tulee kahden kohtauksen jälkeen. Väli on realistinen, mutta peli ei sano sitä ääneen (tehtävä D6).

Lisää RSD-kulmia ei tarvita. Tämä on samaa mieltä EKSKYYSMI.md §9:n kanssa: ”Lisäys korvaa, ei kasaa.”

---

## 3. Huumori

### 3.1 Mittaukset (yksi läpipeluu, reitti A, ensimmäiset valinnat)

| Mitta | Tulos |
|---|---|
| Repliikit puhujittain | Ekskyysmi 580 (47 %), ihminen 352, kertoja 143, Sanna 42, puhelin 30, Sannan varjo 25, Eero 14, Riitta 13 |
| Sanoja | noin 7 500, keskimäärin 6 sanaa riviä kohden |
| Ekskyysmin rivit isoin kirjaimin | osa 1: 18 % → osa 2: 15 % → osa 3: 13 % |
| Ekskyysmin rivit, jotka alkavat tauolla (…) | 11 % → 16 % → 18 % |
| Ihmisen latistavat vastaukset (”It’s a hair.”) | 27 kpl, 8 % ihmisen riveistä |
| ”For the record” | 9 kertaa (lanka, tarkoituksellinen) |

**Tärkein havainto:** Ekskyysmin ääni rauhoittuu mitattavasti. Isot kirjaimet vähenevät ja tauot lisääntyvät osa osalta. Kaari näkyy siis tekstin rytmissä eikä vain siinä, mitä sanotaan. Tätä ei pidä ”korjata” tasaamalla.

### 3.2 Vahvuudet

- **Väärä mittakaava, oikea havainto** toimii läpi pelin, ja Ekskyysmi saa olla oikeassa (”That was awkward. I was right about that one.”).
- **Takaisinkytkennät palkitsevat:** ”The original is very boring.”, cardigan, ”you too” ruokalistalle, tilli ja ”oh, good”, ”Tuesday works.”
- **Sivuhahmot ovat hauskoja vähällä:** äiti (”It felt like twenty.”), kirjastonhoitajan ”corruption”, Riitan varjon ”Heavy?”, Eeron varjon ”Today is so soon.” (*Sometime*, Moment)
- **Vakava rivi saa olla vakava:** ”Nobody came to relieve me.” ja ”It’s the one people could take away.” eivät saa vitsiä perään.

### 3.3 Riskit

- **Kaava ”Ekskyysmi paisuttaa, ihminen latistaa”** on vitsimoottori, mutta mitattuna se ei ole ylikäytetty (8 %). Ei toimenpidettä.
- **Isot kirjaimet** ovat Ekskyysmin tavaramerkki, ja niiden väheneminen on kaari. Kun uusia rivejä kirjoitetaan, sääntö pysyy: kirjailijan painotus, ei huuto.
- **Baari (#12):** ”Ekskyysmi has had the shadow of one drink.” ja ”off duty” voivat lukeutua humalavitsiksi, vaikka juoma on inkiväärioluen varjo. AGENTS.md:n mukaan suodattimen pudottaa väsymys. Yksi sana selventäisi (tehtävä T7).

---

## 4. Pelattavuus ja sujuvuus

### 4.1 Rytmi (`npm run pace`: 55:35)

- **Osa 1** kestää noin 30 min. Pisimmät kohtaukset ovat maanantai (5:41), keskiviikko (5:33) ja baari (4:09).
- **Osa 2** kestää noin 15 min lyhyinä hetkinä ja **osa 3** noin 11 min (perjantai, ryhmächat, epilogi ja patteri). TARINAKARTAN yhteenveto oli jäänyt jälkeen (osa 2 noin 10 min, osa 3 noin 9 min), ja se on päivitetty 0.99.43:ssa.
- Läpipeluussa on 42–47 valintaa (noin 70 s välein) ja 22 ulkoversiota. Käsin tehtäviä asioita on 14 lajia, joista yksi reitti näkee noin 12:
  - kahdeksan pitoa: rewind, cover, pull, still, stay, sit, sign ja ski (cover, pull ja still riippuvat maanantain reitistä)
  - koko-liukusäädin
  - pallon pudotus
  - ”vastaa oikein” -ikkuna
  - lamppu
  - suurennuslasi
  - viestien huitominen

  Vaihtelu on hyvää, ja ”noin yksi päivässä” -periaate pitää.

### 4.2 Kitkakohdat

1. **Napautuksia on noin 1 200 läpipeluussa,** eli yksi noin kolmen sekunnin välein. Automaattista etenemistä ei ole. Pace-työkalu laskee jo lukunopeuden (230 sanaa/min + 0,6 s riviltä), joten saman kaavan voi antaa pelille asetukseksi (tehtävä T8).
2. **Uusintapeluu:** maanantaita on kolme (A, B, C), ja luvut ja hetket voi pelata uudelleen. Jo nähtyä ei voi ohittaa (tehtävä T9).
3. **Valinnan kaiku:** valittu vaihtoehto tulee Ekskyysmin kuplana, joka pitää napauttaa pois. Useimmiten se toimii, koska Ekskyysmi ehdottaa ihmiselle. Lomakeillassa se tuottaa kaksoisrivin: ”Ask what the bag does.” → ”And the bag?” (tehtävä T6).
4. **About lupaa ”About 50 minutes”,** mutta mittari sanoo 55:35 (tehtävä T4).

---

## 5. Ekskyysmi: onko kaikki otettu irti?

### 5.1 Käytössä

Koko on tunne (liukusäädin #2), ilmeet ja yhden repliikin erikoisilmeet, hatut (säästeliäästi, sääntö pitää), takki, suurennuslasi (ja kerran ihmisen kädessä), journaali (kerran), punaiset kortit ja toinen laatikko, otsapanta (#23), lintu, yö (”I’ve lost my edges”), sininen lumella, 40 metriä kesäyössä, uni, osa-aikatyö, muiden varjot ja röntgen.

Tämä on runsas ja kurinalainen kokonaisuus. Mikään keino ei kulu toistossa: journaali ja ihmisen kädessä oleva suurennuslasi nähdään kumpikin kerran.

### 5.2 Mikä jää käyttämättä

1. **Lintu on Ekskyysmin oma piirustus, mutta pelaaja ei tee sitä.** Ekskyysmi syntyi naurusta piirustukselle (#10), ja patterilla (#25) se näyttää oman taiteensa, eikä kukaan naura. Juuri siinä pelaajan pitäisi olla tekijä. Pito (”Hold: make the bird”) tekisi pelaajasta linnun tekijän ja antaisi haavan sulkeutumiselle käden (tehtävä D2).
2. **Valo.** Raamatun ydinsymboli on, että varjo syntyy valosta: näkyväksi tuleminen maksaa varjon. Pelissä se näkyy (”Oh. Daylight. You look smaller.”, yö, kesäyö), mutta sitä ei sanota kertaakaan. Paras paikka on #23: piirros jaetaan, puhelimen valo nousee kasvoille ja varjo kasvaa seinällä. Yksi repliikkipari riittää (tehtävä D4).
3. **Toinen laatikko röntgenissä.** Epilogin arkistokaapissa on vain vanhat vuodet ja TODAY. Pieni nimetön laatikko raollaan olisi suora jatko #23:n repliikille ”Leave it open a crack.” ja vastaisi raamatun §8:n kysymykseen hyvän arkiston näkymisestä (tehtävä D5).
4. **Koko kalibroinnin välineenä.** Liukusäädin käytetään kerran. Perjantain ”oh, hi” on sama hälytys, joten pelaajan voisi antaa säätää koon uudestaan. Vastaus olisi ”Big is allowed. Stay.” ja kuittiin tulisi kalibrointirivi (tehtävä D3).

---

## 6. Dialogipuut ja haarat

### 6.1 Varmistettu

- Haarat pysyvät koossa kolmella maanantailla ja kaikilla neljällä reitillä:
  - maanantai A: Sanna ei ollut kylmä
  - maanantai B: Sanna luuli, ettei ihminen halua seuraa
  - maanantai C: oikea ulossulkeminen
- Takaisinkytkennät kuuluvat oikeille reiteille:
  - `tuesdayOpening`, `mondayCallback`, `mondayRepair`, `fridayReflex`, `fridayShadow`
  - lounaan tila: lounas toteutui, siirtyi perjantaihin tai jäi
  - puraisu (`bit`)
  - vuoto (`leak`)
- Testit pelaavat 180 maanantaireittiä, 12 kokonaista viikkoa ja 33 hetkeä kolmella valintalinjalla, ja ne vartioivat järjestyksen, kellot, mukin ja tallennuksen.
- Tilamuuttujista vain kahta kirjoitetaan mutta ei koskaan lueta: `G.catStarted` ja `g.dawn`. Ne ovat vaarattomia (tehtävä T5). `G.sat` näyttää samalta, mutta tarinatesti lukee sen, joten se jää.
- Toistuvat rivit samassa läpipeluussa ovat tarkoituksellisia (”Rejection prevented.”, ”The original is very boring.”), lukuun ottamatta epilogin metodeja (alla).

### 6.2 Löydetyt säröt

1. **Perjantain ”Monday”.** #17 *Quiet* on saman viikon maanantai kuin perjantai, sillä *The posting* sanoo ”Applications by Friday”. Silloin ihminen kysyy Sannaa lounaalle, he syövät, ja Sanna sanoo ”Same time tomorrow?”. Perjantaina (#22) Sanna kuitenkin sanoo ”I was going to ask you on Monday. You looked busy.” ja ”So we’ve been being polite AT each other. For a year.” Koodin tarkoitus on viikon 1 maanantai, sillä reitillä `lunch===1` sanotaan ”I’m glad I asked you on Monday.” Pelaaja voi silti kuulla sen tuoreimpana maanantaina. Korjaus on muutama sana (tehtävä T3).
2. **Epilogin metodit kahdesti.** Alkumontaasin metodikuva näyttää *WORST CASES, PREPARED ×7* jne., ja kuittirulla toistaa saman lohkon (*EKSKYYSMI’S METHODS*, `epiRollRows`). Rulla on sääntönsä mukaan tarkoitettu riveille, joita ”nobody has read yet” (tehtävä T2).

---

## 7. Mekaniikan aukot ja uudet ideat

### 7.1 Muki ilman päätöksiä (suurin aukko)

Muki laskee kyllistä (−1 kukin), uusinnasta ja muusta kuormasta, ja se täyttyy ihmisistä ja levosta. Päivän pohja estää kuitenkin putoamisen läpi, ja tarinassa yksikään valinta ei riipu mukin tasosta:
- `mugEmpty()` vaikuttaa vain piikkien piirtämiseen.
- Ainoat lukitut vaihtoehdot ovat keskiviikon ”No.” (kahdesti) ja ”(Say nothing.)” torstaihin asti, eivätkä ne liity mukiin.

VISIO lupaa enemmän: pilari 3 (”Yksi resurssi: muki”), ydinkysymys ”onko tämä mukini arvoinen?” ja kierroksen 3 kasvutaito ”Is that the mug talking, or the door?”. Diili on valmiina koodissa (`dealOffer`, `dealSign`, `dealOptions`, `src/36-mug.js`), mutta vain labran prototyypissä *A Tuesday, with a mug.* TARINAKARTTA §8 jätti auki: ”Ensimmäinen oikea diili tulee päivään… Paikka päätetään, kun diili kirjoitetaan.” Ehdotus on tehtävä D1.

### 7.2 Muut ideat, joita ei ole vielä pöydällä

- **Kuitti kuvana puuttuu vain APK:sta.** Selaimessa päivän ja viikon kuitissa on jo napit *Save as picture* ja *Copy text* (`shareReceipt`, `copyReceipt`, `src/35-inside.js`): puhelimen selaimessa kuva lähtee jakovalikkoon, koneella se latautuu. Sovelluksen sisällä kuvaa ei voi ladata minnekään, joten nappi kopioi vain tekstin. Viikon kuitti on pelin tunnistettavin kuva (*DAYS LIVED INSIDE 10.4*, *YESES, UNMEANT ×6*), ja pelaajat vertailevat tuloksia mielellään, joten se kannattaa saada jaettavaksi myös APK:sta (tehtävä T10).
- **Automaattinen eteneminen ja ohitus** (tehtävät T8 ja T9, §4).
- **Kokeiluhetket tarinaan, jos tilaa tulee:** vahvin on *Leaving.* (pelko siitä, ettei lähtöä huomata, ja ”The second one is worse. I’ve checked.”). Joonas on päättänyt pitää sen Momenttina, joten tämä on vain muistutus.

---

## 8. Tehtävälista (hyväksytty 27.11.)

**Merkinnät.** *Malli* tarkoittaa suositeltua tasoa:
- **kevyt:** selvä tehtävä, testit kertovat onnistumisen
- **keski:** useampi tiedosto tai uusi asetus
- **korkea:** koskee lankoja, mukia tai rakennetta

Repliikit on kirjoitettu valmiiksi. Ne käytetään sellaisinaan: toteuttaja ei keksi uusia, vaan kysyy, jos repliikki ei sovi koodiin. Versiot ja tarkistukset ovat §11:ssä.

### P1 – korjaukset (pieni riski)

**T1. Röntgenin sydän oikealle puolelle.** ✅ Tehty 0.99.43. Luuranko on kasvot katsojaan päin, joten ihmisen vasen puoli on kuvassa oikealla (`skeleton()`, `src/35-inside.js`).

**T2. Epilogin metodit vain kerran.**
- **Missä:** `epiRollRows()`, `src/37-epilogue.js`. Poista rivi, joka lisää lohkon `EKSKYYSMI’S METHODS` (`var mine=mineRows();if(mine.length){…}`), koska alkumontaasin metodikuva (`mine:1`) näyttää samat rivit.
- **Valmis kun:** epilogin transkriptissä *WORST CASES, PREPARED* näkyy vain kerran. Viikon lopun kuitti (`storyRows`, `src/57-posting.js`) näyttää metodit edelleen, ja testi `EKSKYYSMI’S METHODS` (`tests/story.test.cjs`) koskee sitä.
- **Malli:** kevyt.

**T3. Perjantain maanantai yksiselitteiseksi.**
- **Missä:** `src/31-story-week.js` (perjantain lounaskohta, funktio heti repliikin ”I thought not being asked was the verdict.” jälkeen) ja `KEPT` (`src/20-engine.js`).
  - ”I was going to ask you on Monday. You looked busy.” → ”I was going to ask you that Monday. You looked busy.”
  - ”I’m glad I asked you on Monday.” → ”I’m glad I asked you that Monday.”
  - ”So we’ve been being polite AT each other. For a year.” → ”So we were being polite AT each other. For a year.”
  - `KEPT.asked`: ”She was going to ask on Monday.” → ”She was going to ask. That Monday.”
- **Valmis kun:** testit menevät läpi, ja transkriptissä (`--pick 0` ja `--pick rotate --day C`) perjantai lukeutuu luontevasti.
- **Langat:** §5 *Lounas Sannan kanssa*.
- **Malli:** kevyt.

**T4. About-sivun kesto.**
- **Missä:** `showAbout()`, `src/80-ui.js`: ”About 50 minutes.” → ”About an hour.” Suomenkielistä vastinetta ei vielä ole.
- **Malli:** kevyt.

**T5. Kuolleet tilamuuttujat pois.**
- **Missä:** `G.catStarted` (`src/30-story-monday.js`) ja `g.dawn` (`dawn()`, `src/49-second-act.js`) sekä `g.dawn`-nollaus `scene()`:ssä (`src/31-story-week.js`). Funktio `dawn()` jää, vain kenttä lähtee. **`G.sat` jää**, koska `tests/story.test.cjs` lukee sen (”Ekskyysmi sits down, for the first time”).
- **Valmis kun:** `grep` ei löydä kenttiä ja testit menevät läpi.
- **Malli:** kevyt.

**T6. Lomakeillan kaksoisrivi.**
- **Mitä:** valittu vaihtoehto puhutaan ensin Ekskyysmin kuplana, ja heti perään tulee itse kysymys (”Ask what the bag does.” → ”And the bag?”). Vaihtoehdolle tulee lippu, joka jättää kaiun pois. Silloin kuuluu vain kysymys, ja hiljainen ”Am I being… replaced?” säilyy.
- **Missä:** `choose()`, `src/20-engine.js`: `Q=(o.hush?[]:[[G.choiceWho||'S',o.t]])` → `Q=(o.hush||o.echo===false?[]:[[G.choiceWho||'S',o.t]])`. `afterForm()`, `src/49-second-act.js`: lisää `echo:false` kolmeen vaihtoehtoon.
- **Valmis kun:** kaikilla kolmella valinnalla mikään kysymys ei toistu peräkkäin, ja testit menevät läpi.
- **Malli:** kevyt.

**T7. Baarin humalavivahde pois.**
- **Missä:** `src/53-bar.js`: ”22:40. Same bar. Ekskyysmi has had the shadow of one drink.” → ”22:40. Same bar. Ekskyysmi has had the shadow of one ginger beer, and a very long day.”
- **Malli:** kevyt.

### P2 – repliikit kohtauksiin (ei järjestysmuutoksia)

**D7. Riemun ylilyönti kirjastossa (#15).**
- **Mitä:** RSD:n toinen puoli: lämpö tuntuu yhtä suurelta kuin torjunta. Ekskyysmi rakentaa hetkessä ystävyyden, ihminen kalibroi, ja heti perään tulee eräpäivähuoli.
- **Missä:** `src/56-library.js`, ulkoversion *WHAT THE LIBRARIAN SAW* ja `calm`-askeleen jälkeen, ennen riviä ”We came in for a telling-off. We’re leaving with a second volume.”
- **Repliikit:**
  ```
  ['S','Somebody else likes lighthouses.',{look:'up'}],
  ['S','That’s a friendship. I’ve planned the trip. Bengtskär. Two thermoses.'],
  ['H','She reserved me a book.'],
  ['S','…Separate boats, then. We’ll wave.'],
  ```
- **Langat:** §5 *Myöhässä oleva kirja*. `keep('library')` ei muutu.
- **Valmis kun:** `node tools/transcript.cjs --lab library` näyttää rivit oikeassa kohdassa, ja testit menevät läpi.
- **Malli:** kevyt.

**D4. Valo = näkyvyys (#23).**
- **Mitä:** raamatun ydinsymboli (varjo syntyy valosta, eli näkyväksi tuleminen maksaa varjon) sanotaan kerran. Kun piirros lähtee, varjo kasvaa jo nyt (`G.morko.sT=1.6`).
- **Missä:** `labComments()`, `src/50-lab.js`, heti `['P','You: “made a thing” [drawing.png]']` -rivin, sitä seuraavan funktion ja `{wait:0.8}`:n jälkeen, ennen riviä ”Headband on. Replies incoming…”.
- **Repliikit:**
  ```
  ['S','More light. More of me.',{quiet:1}],
  ['H','I know. I want the light.'],
  ```
- **Lisäksi:** EKSKYYSMI.md §3 *Varjo syntyy valosta* saa lauseen ”Sanotaan pelissä kerran: #23, kun piirros lähtee (0.99.45).”
- **Malli:** kevyt.

**D6. Odotusaika lomakkeeseen (#16).**
- **Mitä:** #14 lupaa ”I’m going to ring someone tomorrow.” Lomake on sen lanka, ja välissä ovat kirjasto ja pikkujoulut. Yksi kertojan rivi tekee välistä merkityksellisen. Rivi on tosiasia, ei kannanotto.
- **Missä:** `src/49-second-act.js`: `['N','A waiting room. A clipboard. Eighteen questions.']` → kaksi riviä:
  ```
  ['N','A waiting room. Five weeks after the phone call.'],
  ['N','A clipboard. Eighteen questions.'],
  ```
- **Valmis kun:** testit menevät läpi. Kellotesti hyväksyy rivin, koska siinä ei ole kellonaikaa.
- **Malli:** kevyt.

### P3 – kuva ja mekaniikka

**D5. Toinen laatikko röntgenissä.**
- **Mitä:** epilogin röntgenissä arkistokaapin vieressä on pieni nimetön laatikko raollaan ja lämpimässä valossa. Se on #23:n ”Leave it open a crack.” kuvana.
- **Missä:** `drawXray()`, `src/35-inside.js`. Piirrä vain, kun `g.epi&&g.epi.o&&g.epi.o.xray` (epilogin kaksi röntgenkuvaa, ei *One small thing*- eikä *Kick-off*-hetken röntgentä). Kaapin piirtämisen jälkeen:
  - laatikko kaapin oikean alakulman viereen (noin 30 × 18 px, `cx+cw+8`, `cy+ch-26`) samalla röntgenviivalla
  - etulevy 3 px ulospäin
  - yläreunaan ohut lämmin rako (`#ffd98a`, kevyt hehku)
  - ei tekstiä
- **Valmis kun:** epilogin röntgenin yleiskuvassa ja lähikuvassa laatikko näkyy, ja muut röntgenit ovat ennallaan. EKSKYYSMI.md §8 *Hyvä arkisto* saa merkinnän ”Näkyy epilogin röntgenissä (0.99.46).”
- **Malli:** kevyt.

**D2. Lintu pelaajan tekona (#25).**
- **Mitä:** pelaaja tekee linnun pitämällä, ja kun Sannan varjo sanoo ”Do it again.”, pelaaja tekee sen uudestaan. Haava sulkeutuu pelaajan kädellä.
- **Missä:**
  - `HOLD_LABEL` (`src/20-engine.js`): lisää `bird:'Hold: make the bird'`.
  - `holdText()`: `if(h.kind==='bird')return on?(h.o.text||'Flap. Flap.'):'Hold to make the bird.';`
  - `holdStep()`: `else if(h.kind==='bird'){M.pose=on?'puppet':null;M.mood='care';if(on&&!h.snd){h.snd=1;sfx('flutter');}if(!on)h.snd=0;}`
  - `finishHold()`: `else if(h.kind==='bird'){M.pose='puppet';}`
  - `labRadiator()` (`src/52-radiator.js`): vaihda `{wait:0.8},set({pose:'puppet',mood:'care'}),function(){sfx('flutter');},{wait:1.6},` muotoon `{wait:0.8},set({mood:'care'}),{hold:{kind:'bird',secs:2.2,text:'Two hands. One bird. Nobody laughing.'}},`
  - `labRadiator()`: vaihda `function(){sfx('flutter');},   // 0.86: and it does` ja `{wait:1.4},set({pose:null}),` muotoon `{hold:{kind:'bird',secs:1.6,text:'Again. Because she asked.'}},{wait:0.6},set({pose:null}),`
- **Valmis kun:**
  - testit ja hetkitesti menevät läpi
  - napautus (`holdTap`) kelpaa pidon sijaan, kuten muissakin pidoissa
  - TARINAKARTAN rivi #25 kertoo, että pelaaja tekee linnun
- **Malli:** keski.

**D3. Koko-liukusäädin perjantaina (#22).**
- **Mitä:** perjantain ”oh, hi” on sama hälytys. Pelaaja avaa varoituksen kuten maanantaina, mikä tahansa koko kelpaa, ja ihminen pysyy. Kuitti vertaa kokoja.
- **Missä:** `scFri()`, `src/31-story-week.js`. Rivien ”…It still went off. Even though we got it right.” ja ”I felt it.” jälkeen ja ennen `fridayReflex`-askelta:
  ```
  function(){G.monWarning=G.warningSize;},
  {stretch:true},
  function(){var a=G.monWarning,b=G.warningSize;G.friWarning=b;
    if(!a)return [['S','Full size. Still here.'],['H','Big is allowed.']];
    return b>=a-0.05?[['S','Monday size. I checked.'],['H','Big is allowed.']]:
      [['S','A bit smaller than Monday. Don’t read into it.'],['H','Big would have been allowed too.']];},
  ```
- **Kuitti:** `storyRows()` (`src/57-posting.js`), ennen metodilohkoa:
  ```
  if(g.friWarning){if(g.monWarning)rows.push(['alarm size, monday','×'+g.monWarning.toFixed(1)]);
    rows.push(['alarm size, friday','×'+g.friWarning.toFixed(1)],['stayed anyway','friday']);}
  ```
- **Tallennus ja nollaus:** `checkpoint()` (`src/28-progress.js`) saa kentät `warningSize`, `monWarning` ja `friWarning`. Jokainen on joko luku väliltä 1,8–3,8 (`clamp`) tai `null`. `reset()` (`src/20-engine.js`) nollaa samat kolme, jotta uusi peli samassa istunnossa ei peri edellisen kokoja.
- **Testien päivitys** (kuivaharjoitus löysi molemmat):
  - `tests/story.test.cjs`, `checkpointFixture`, luku 5: lisää `warningSize:null,monWarning:null,friWarning:null` (muuten tarkistus ”replaying an earlier chapter must preserve later histories” kaatuu)
  - `tests/story.test.cjs`, `labUntil()`: haara `else if(s==='hold')T.advance();` → `else if(s==='hold'||s==='stretch')T.advance();` (muuten perjantain kulku pysähtyy liukusäätimeen)
- **Valmis kun:** testit (myös jatkotesti `save.test.cjs`) menevät läpi, ja viikon kuitissa näkyvät koot.
- **Malli:** keski.

**D1. Perjantain diili: ”Is that the mug talking, or the door?” (#22).**
- **Mitä:** muki saa ensimmäisen päätöksen. Rehellinen vastaus riippuu mukin oikeasta tasosta: perjantai alkaa neljästä, hälytys vie yhden, ja Eerolle sanottu ”Say yes. Old habits.” vie toisen. Jos muki on 2 tai alle, vastaus on ”The mug”, ja ihminen tekee kompromissin. Muuten vastaus on ”The door”. Lounas tapahtuu aina, eikä mitään rangaista (pilari 4).
- **Missä:** `scFri()`, `src/31-story-week.js`, Sannan keittokysymyksen (funktio, joka palauttaa ”Soup? The one with too much dill.”) jälkeen ja ennen riviä ”Oh, good. That one.”:
  ```
  set({mood:'alert'}),
  dealOffer('skip lunch. a quiet hour at the desk.','it’s friday. she asked first.'),
  ['S','Before you answer. I’ve drawn up a small deal.'],
  ['S','Skip lunch. A quiet hour at the desk. The mug gets a rest.'],
  {choice:[
    {t:'The mug needs it. Sign here.',m:'hide',then:function(){return mugOrDoor('H');}},
    {t:'Ask myself first: the mug, or the door?',m:'stay',echo:false,then:function(){return mugOrDoor('S');}},   // echo:false (T6): the question itself is the line
    {t:'Tear it up. It’s soup.',m:'stay',then:[dealSign(false),function(){G.dealWho='torn';},
      ['S','Torn. Along the dotted line. I added a dotted line.']]}
  ]},
  ['A','…Soup?'],
  ```
  ja uusi funktio samaan tiedostoon:
  ```
  function mugOrDoor(who){
    var low=!!(G.mug&&G.mug.v<=2),q=who==='H'?['H','Is that the mug talking, or the door?']:['S','Is that the mug talking… or the door?',{quiet:1}];
    if(low)return [q,['S','…The mug. Honestly. It’s low.',{quiet:1}],['H','Then soup. No dessert. Back in forty minutes.'],
      function(){if(G.deal)G.deal.now='soup. no dessert. back in forty.';},dealSign(true),function(){G.dealWho='mug';},
      ['S','A fair deal. I do write those. Occasionally.']];
    return [q,{wait:0.8},['S','…The door.',{quiet:1}],['H','Thought so.'],dealSign(false),function(){G.dealWho='door';},
      ['S','The mug was a very convenient witness.']];
  }
  ```
- **Kuitti:** `storyRows()`: `if(g.dealWho)rows.push(['deals, offered','1'],['who was talking',{door:'the door',mug:'the mug',torn:'nobody. torn.'}[g.dealWho]]);`
- **Tallennus ja nollaus:**
  - `checkpoint()` saa kentän `dealWho` (`'door'`, `'mug'`, `'torn'` tai `null`), ja `tests/story.test.cjs`:n `checkpointFixture` (luku 5) saa `dealWho:null`
  - `reset()` (`src/20-engine.js`) nollaa `G.dealWho`
  - `scene()` (`src/31-story-week.js`) nollaa `g.deal=null` (AGENTS.md: piirtävä kenttä nollataan kohtauksen vaihtuessa)
- **Valmis kun:**
  - testit menevät läpi
  - transkriptissä molemmat vastaukset näkyvät: `--pick 0` (Eerolle ”No.”) antaa ”The door”, ja reitti, jolla Eerolle sanotaan ”Say yes. Old habits.”, antaa ”The mug”
  - mukitesti hyväksyy perjantain
  - TARINAKARTAN rivi #22 ja §5:n *Muki*-lanka mainitsevat diilin, ja §8:n avoin kohta ”Ensimmäinen oikea diili” on merkitty tehdyksi
- **Malli:** korkea.

### P4 – sujuvuus

**T8. Asetus ”Auto: reading pace”.**
- **Mitä:** repliikki etenee itsestään lukuajan jälkeen.
  - Lukuaika: `max(1.4, sanat/200*60 + 0.9)` sekuntia. Se on hieman väljempi kuin `tools/pace.cjs`.
  - Ajastin käy vain, kun `WAIT==='click'`, rivi on kokonaan näkyvissä (`!revealing()`) eikä peli ole pausella tai Dialogue-loki auki.
- **Ei koske:** valintoja, pitoja, ulkoversioita (`view`), koko-liukusäädintä, ”vastaa oikein” -ikkunaa, pallon pudotusta, lamppua eikä viestien huitomista. Ne odottavat aina pelaajaa.
- **Missä:**
  - painike valikkoon *Slow realityn* tapaan (`index.html` `id="auto"`, `src/80-ui.js`), localStorage-avain `ekskyysmi.auto`
  - painikkeen tekstit ”Auto: off” ja ”Auto: reading pace” käännettäviksi
  - ajastin päivityssilmukkaan (`src/60-update.js` tai `src/20-engine.js`)
- **Valmis kun:**
  - asetus päällä viikko etenee testivaljaissa pelkillä `T.tick()`-kutsuilla 'click'-tilassa
  - mikään ulkoversio ei ohitu ennen minimiaikaansa
  - `python tools/audit_layout.py` näyttää valikon ehjänä viidellä puhelinkoolla
- **Malli:** keski.

**T9. ”Skip seen” uusintoihin.**
- **Mitä:** nähdyt rivit muistetaan avaimella `puhuja|englanninkielinen teksti`, tiivistettynä (esim. djb2, base36), localStorageen `ekskyysmi.seen` (enintään noin 5 000 avainta). Jos nykyinen rivi on nähty, näkyy nappi ”Skip seen ›”. Se kelaa eteenpäin niin kauan kuin rivit ovat nähtyjä ja `WAIT==='click'`. Kelaus pysähtyy:
  - näkemättömään riviin
  - valintaan, pitoon tai ulkoversioon
  - kohtauksen korttiin
  - mihin tahansa muuhun kuin 'click'-tilaan
- **Missä:** `src/20-engine.js`, `src/80-ui.js`, `assets/game.css`.
- **Valmis kun:**
  - ensimmäisellä pelikerralla nappia ei näy
  - toisella maanantailla nappi vie ensimmäiseen uuteen riviin tai valintaan
  - testit ja asettelutarkistus menevät läpi
- **Malli:** keski.

**T10. Kuitti kuvana myös APK:ssa.**
- **Mitä:** selaimessa *Save as picture* toimii jo (`shareReceipt()`, `src/35-inside.js`). APK:ssa sama nappi tallentaa PNG:n sovelluksen välimuistiin ja avaa Androidin jakovalikon. Jos jokin vaihe epäonnistuu, nappi kopioi tekstin kuten nyt.
- **Missä:**
  - riippuvuudet `@capacitor/filesystem` ja `@capacitor/share` (`npm i`, sitten `npm run android:sync`)
  - `shareReceipt()`: natiivissa `Capacitor.Plugins.Filesystem.writeFile({path:'really-small-deal-receipt.png',data:base64,directory:'CACHE'})` ja sitten `Capacitor.Plugins.Share.share({files:[uri],title:'Really Small Deal',text:'My receipt.'})`
  - mahdolliset natiivimuutokset `tools/android-patch.cjs`:n kautta (AGENTS.md)
- **Valmis kun:**
  - selain toimii kuten ennen
  - testit menevät läpi
  - Joonas on rakentanut APK:n (`cd /d C:\RSD`, `tools\build-apk.cmd`) ja todennut jakovalikon puhelimessa. Tämä on ainoa tehtävä, joka vaatii laitetestin: tee se viimeisenä ja pyydä testi.
- **Malli:** keski.

---

## 9. Mitä ei kannata tehdä

- **Ei lisää hetkiä tarinaan.** Peli kestää jo 55 min, ja osa 1 on 30 min.
- **Ei mittareita tai numeroita kesken pelin.** Muki ja kuitti riittävät.
- **Muki ei saa lukita kaikkea.** Yksi diili riittää, ja se kertoo enemmän kuin kymmenen harmaata nappia.
- **Ei sanallista RSD-selitystä.** Peli näyttää.
- **Isoja kirjaimia ei tasata.** Niiden väheneminen on kaari (§3.1).

---

## 10. Maksimiasetus ja kevyemmät mallit

Liitetty teksti pitää pääosin. Tämän pelin kohdalla jako kannattaa tehdä näin:

**Korkea tai maksimi:**
- tämänkaltaiset tarkastukset
- muutokset, jotka koskevat TARINAKARTTA §5:n lankoja (lounas, ”Fine.”, muki, patteri)
- tallennus ja jatkaminen
- bugit, jotka ilmenevät vain tietyllä reitillä

**Kevyt:**
- §8:n P1- ja P2-tehtävät
- piirtäminen ja asettelu
- yksittäiset käännökset
- tekstien hienosäätö, kun lanka ei muutu

**Kirjoittamisesta olen osittain eri mieltä.** Vitsin ensimmäinen versio syntyy parhaiten nopeasti. Sen tarkistaminen, mihin lankoihin se koskee, hyötyy syvästä päättelystä. Siksi §8:n repliikit on kirjoitettu ja tarkistettu valmiiksi, ja toteuttaja käyttää niitä sellaisinaan.

---

## 11. Toteutusjärjestys ja tarkistus

Yksi rakennemuutos per versio (AGENTS.md). Pienet korjaukset ja repliikit kulkevat ryhmissä, mekaniikat yksitellen.

**Kuivaharjoitus 27.11.:** T2–T7, D1–D4, D6 ja D7 kokeiltiin erillisessä kopiossa juuri näin kirjoitettuina. Kaikki yhdeksän testiä menivät läpi kahden testipäivityksen jälkeen (kirjattu D3:een), ja transkriptit lukeutuivat luontevasti. Perjantain diili antoi ”The door” reitillä, jolla Eerolle sanottiin ei, ja ”The mug” reitillä, jolla sanottiin ”Say yes. Old habits.”. Kokeilua ei julkaistu, joten toteuttaja tekee muutokset itse. T5:stä kokeilu karsi `G.sat`:n pois, koska testi lukee sen.

| Versio | Tehtävät | Mitä muuttuu |
|---|---|---|
| 0.99.44 | T2, T3, T4, T5, T6, T7 | korjauksia, ei rakennetta |
| 0.99.45 | D7, D4, D6 | repliikkejä kohtauksiin, järjestys ennallaan |
| 0.99.46 | D5 | kuva epilogin röntgenissä |
| 0.99.47 | D2 | uusi pito patterilla |
| 0.99.48 | D3 | perjantain koko-liukusäädin ja kuittirivit |
| 0.99.49 | D1 | perjantain diili ja kuittirivit |
| 0.99.50 | T8 | asetus: automaattinen eteneminen |
| 0.99.51 | T9 | asetus: nähdyn ohitus |
| 0.99.52 | T10 | APK:n kuittikuva (vaatii Joonaksen laitetestin) |

**Ennen ensimmäistä versiota:**
- Hae GitHubin `main`.
- Jos C:\RSD on käytettävissä, vertaa sitä repoon. Jos Codex tai Joonas on muuttanut jompaakumpaa, tuo muutokset ensin.

**Jokaisessa versiossa:**
1. Tee vain sen version tehtävät. Repliikit ovat §8:ssa valmiina, joten käytä niitä sellaisinaan.
2. Muokkaa vain `src/`-tiedostoja, työkaluja, testejä ja dokumentteja. `assets/game.js` syntyy komennolla `node tools/build.cjs`, eikä sitä muokata käsin.
3. Aja `npm test`: kaikkien yhdeksän pitää mennä läpi.
   - Älä heikennä testiä läpäistäksesi sitä.
   - Jos testi lainaa muuttunutta riviä, päivitä se samassa muutoksessa ja kerro miksi.
4. Lue muuttunut kohta transkriptistä vähintään kahdella reitillä:
   - `node tools/transcript.cjs --out a.txt`
   - `node tools/transcript.cjs --pick rotate --day C --out b.txt`
   - hetken muutoksessa myös `node tools/transcript.cjs --lab <id>`

   Tarkista, ettei mikään rivi toistu peräkkäin ja että kohta lukeutuu luontevasti.
5. Aja `npm run pace` (kirjaa muutos) ja `npm run strings`.
6. Nosta versio `package.json`- ja `package-lock.json`-tiedostoissa, ja aja sitten `node tools/build.cjs`. Build päivittää `index.html`:n versioleimat, joita ei muokata käsin. Lopuksi `node tools/build.cjs --check` menee läpi.
7. TARINAKARTTA.md:
   - versiolokiin rivi suomeksi tiedoston alkuun, perusteluna Joonaksen sanat (”Joonas 27.11.: …”)
   - kartan rivi ja §5:n langat, jos sisältö tai kesto muuttuu
   - EKSKYYSMI.md, kun §8 niin sanoo
8. Commit (englanniksi, kuten aiemmat) ja push `main`iin. GitHub Pages päivittyy itsestään.
   - C:\RSD:n pitää olla sen jälkeen tavu tavulta sama kuin repo.
   - Jos käytössä on artefaktityökalu, julkaise `index.html` ja `assets/game.js` (ja `assets/game.css`, jos se muuttui) artefaktiin `0c43ad47-5a53-4ea3-af39-f8c5500fa7c6`.

**Pysähdy ja kysy Joonakselta vain, jos:**
- muutos vaatisi kohtausten järjestyksen muuttamista tai langan katkaisemista
- testi ei mene läpi ilman tarinamuutosta, jota §8 ei kuvaa
- §8:n koodiohje ei vastaa koodia niin, että pienin korjaus muuttaisi tarinaa
- T10 on valmis laitetestiin

Muissa tapauksissa jatka seuraavaan versioon.

**Lopuksi raportoi Joonakselle suomeksi:**
- tehdyt versiot
- mitä jäi tekemättä ja miksi
- mitä ei voitu tarkistaa oikealla laitteella
- APK-ohje: `cd /d C:\RSD`, sitten `tools\build-apk.cmd`

---

## 12. Kehote toteuttavalle mallille

Kopioi tämä sellaisenaan uuden istunnon alkuun:

> Toteutat Really Small Deal -pelin syvätarkastuksen tehtävälistan. Joonas hyväksyi kaikki ehdotukset 27.11.2026, joten päätöksiä ei tarvitse odottaa.
>
> Lue ensin AGENTS.md, SYVATARKASTUS.md (erityisesti §8 ja §11), TARINAKARTTA.md §5 sekä EKSKYYSMI.md §7. Koodi on aina totuus: jos dokumentti ja koodi eroavat, usko koodia ja kerro erosta.
>
> Tee versiot 0.99.44–0.99.52 §11:n järjestyksessä ja tarkistuksin. Repliikit ovat §8:ssa valmiina. Käytä niitä sellaisinaan, äläkä kirjoita uusia vitsejä tai rivejä. Pelin teksti on englantia, dokumentit suomea. Älä lisää, siirrä tai poista kohtauksia. Erikoisilme kestää yhden repliikin. Ei neuvoja, diagnooseja, lääkkeitä eikä ammatteja.
>
> Jokaisen version jälkeen kaikkien yhdeksän testin pitää mennä läpi, muutos pitää lukea transkriptistä kahdella reitillä, ja commit menee GitHubiin. C:\RSD:n pitää olla sama kuin repo, ja artefakti päivitetään, jos työkalu on käytössä.
>
> Pysähdy vain §11:n pysähtymissääntöjen kohdalla. Muuten jatka seuraavaan versioon. Lopuksi raportoi suomeksi, mitä tehtiin, mitä jäi ja mitä ei voitu tarkistaa oikealla laitteella.

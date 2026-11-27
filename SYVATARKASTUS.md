# Syvätarkastus 27.11.2026 (versio 0.99.43)

Joonaksen pyyntö: analysoi peli kunnolla, ja korjataan sitten ehdotusten mukaan. Tarkastus kattaa RSD:n kuvauksen, huumorin, sujuvuuden, sen onko Ekskyysmistä otettu kaikki irti, dialogipuiden ja haarojen yhteispelin sekä puuttuvat mekaniikat. Kevyemmät mallit voivat toteuttaa §8:n tehtävät yksi kerrallaan. Jokaisessa tehtävässä kerrotaan, missä tiedostossa työ on, milloin se on valmis ja tarvitaanko ensin Joonaksen päätös.

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

- **Hyväksynnän ylilyönti.** RSD:hen kuuluu usein myös voimakas helpotus tai riemu, kun joku on lämmin. Ekskyysmi reagoi lämpöön lähinnä epäluulolla (”She MISSED us?”). Yksi riemun ylilyönti riittäisi, esimerkiksi kirjastossa (#15), kun kirjastonhoitaja paljastuu majakkojen ystäväksi: Ekskyysmi alkaa heti suunnitella yhteistä majakkamatkaa.
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
- Tilamuuttujista vain kolmea kirjoitetaan mutta ei koskaan lueta: `G.catStarted`, `G.sat` ja `g.dawn`. Ne ovat vaarattomia (tehtävä T5).
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

- **Jaettava kuitti.** Viikon kuitti on pelin tunnistettavin kuva (*DAYS LIVED INSIDE 10.4*, *YESES, UNMEANT ×6*), ja jokaisella pelaajalla se on omanlaisensa. Nappi ”Share receipt” tekisi siitä kuvan (puhelimessa jakovalikko, koneella lataus). Pelaajat vertailevat tuloksia mielellään, ja kuitti toimisi pelin markkinointina ilman yhtäkään mainoslausetta (tehtävä T10).
- **Automaattinen eteneminen ja ohitus** (tehtävät T8 ja T9, §4).
- **Kokeiluhetket tarinaan, jos tilaa tulee:** vahvin on *Leaving.* (pelko siitä, ettei lähtöä huomata, ja ”The second one is worse. I’ve checked.”). Joonas on päättänyt pitää sen Momenttina, joten tämä on vain muistutus.

---

## 8. Tehtävälista

**Merkinnät.** *Malli* tarkoittaa suositeltua tasoa:
- **kevyt:** selvä tehtävä, testit kertovat onnistumisen
- **keski:** useampi tiedosto tai uusi asetus
- **korkea:** koskee lankoja, mukia tai rakennetta

*Päätös* kertoo, tarvitaanko Joonaksen hyväksyntä ennen työtä. Jokaisen tehtävän jälkeen tehdään samat asiat:
1. `npm test`
2. versio (`package.json`)
3. TARINAKARTTA.md:n versiomerkintä
4. synkronointi

### P1 – korjaukset (ei päätöstä, pieni riski)

**T1. Röntgenin sydän oikealle puolelle.** ✅ Tehty 0.99.43. Luuranko on kasvot katsojaan päin, joten ihmisen vasen puoli on kuvassa oikealla (`skeleton()`, `src/35-inside.js`).

**T2. Epilogin metodit vain kerran.**
- **Missä:** `epiRollRows()`, `src/37-epilogue.js`. Poista rivi, joka lisää lohkon `EKSKYYSMI’S METHODS`, koska alkumontaasin metodikuva (`mine:1`) näyttää samat rivit.
- **Valmis kun:** epilogin Dialogue-loki sisältää *WORST CASES, PREPARED* vain kerran. Viikon lopun kuitti (`showWeekEnd`) näyttää metodit edelleen, ja testi `EKSKYYSMI’S METHODS` koskee sitä.
- **Malli:** kevyt.

**T3. Perjantain maanantai yksiselitteiseksi.**
- **Missä:** `src/31-story-week.js` (perjantain lounaskohta) ja `KEPT` (`src/20-engine.js`).
  - ”I was going to ask you on Monday. You looked busy.” → ”I was going to ask you that Monday. You looked busy.”
  - ”I’m glad I asked you on Monday.” → ”I’m glad I asked you that Monday.”
  - ”So we’ve been being polite AT each other. For a year.” → ”So we were being polite AT each other. For a year.”
  - `KEPT.asked`: ”She was going to ask on Monday.” → ”She was going to ask. That Monday.”
- **Valmis kun:** `npm test` menee läpi (tarkista, ettei testi lainaa vanhaa riviä) ja `npm run strings` on ajettu. Jos suomennos on jo tehty, päivitä se.
- **Langat:** §5 *Lounas Sannan kanssa*.
- **Malli:** kevyt.

**T4. About-sivun kesto.**
- **Missä:** `showAbout()`, `src/80-ui.js`: ”About 50 minutes.” → ”About an hour.” Päivitä myös suomenkielinen vastine, jos sellainen on.
- **Malli:** kevyt.

**T5. Kuolleet tilamuuttujat pois.**
- **Missä:** `G.catStarted` (`src/30-story-monday.js`), `G.sat` (`src/49-second-act.js`) ja `g.dawn` (`dawn()`, `src/49-second-act.js`) sekä niiden nollaukset `scene()`:ssä (`src/31-story-week.js`).
- **Valmis kun:** `grep` ei löydä niitä ja testit menevät läpi.
- **Malli:** kevyt.

**T6. Lomakeillan kaksoisrivi.**
- **Mitä:** valittu vaihtoehto puhutaan ensin Ekskyysmin kuplana, ja heti perään tulee itse kysymys (”Ask what the bag does.” → ”And the bag?”). Valinnalle tarvitaan lippu, joka jättää kaiun pois, jolloin vain kysymys kuuluu ja hiljainen ”Am I being… replaced?” säilyy.
- **Missä:** `choose()`, `src/20-engine.js`: `Q=(o.hush?[]:…)` → `Q=(o.hush||o.echo===false?[]:…)`. `afterForm()`, `src/49-second-act.js`: lisää `echo:false` kolmeen vaihtoehtoon.
- **Valmis kun:** jokaisella kolmella reitillä mikään kysymys ei toistu peräkkäin, ja hush-testit menevät läpi.
- **Malli:** kevyt.

**T7. Baarin humalavivahde pois.**
- **Missä:** `src/53-bar.js`: ”22:40. Same bar. Ekskyysmi has had the shadow of one drink.” → ”22:40. Same bar. Ekskyysmi has had the shadow of one ginger beer, and a very long day.”
- **Päätös:** Joonas, koska kyse on sävystä.
- **Malli:** kevyt.

### P2 – sujuvuus (ei tarinamuutoksia)

**T8. Asetus ”Auto: reading pace”.**
- **Mitä:** repliikki etenee itsestään lukuajan jälkeen (sanat / 230 per min + 0,6 s, kuten `tools/pace.cjs`).
- **Ei koske:** valintoja, pitoja, ulkoversioita, koko-liukusäädintä, ”vastaa oikein” -ikkunaa eikä viestien huitomista. Ne odottavat aina pelaajaa.
- **Missä:**
  - asetus valikkoon kuten *Slow reality* (`src/80-ui.js`) ja localStorage-avain
  - ajastin `advance()`:n rinnalle (`src/20-engine.js`)
- **Valmis kun:** asetus päällä viikko etenee testivaljaissa ilman napautuksia (valinnat valitaan), eikä mikään ulkoversio ohitu ennen minimiaikaansa.
- **Malli:** keski.

**T9. ”Skip seen” uusintoihin.**
- **Mitä:** nähdyt rivit muistetaan tunnisteella localStorageen. Nappi kelaa seuraavaan näkemättömään riviin tai valintaan.
- **Missä:** `src/20-engine.js`, `src/80-ui.js`
- **Valmis kun:** toinen maanantai kelautuu ensimmäiseen uuteen riviin tai valintaan.
- **Malli:** keski.

**T10. Jaettava kuitti.**
- **Mitä:** viikon lopun kuitista (`showWeekEnd`) tehdään PNG canvasilla ja jaetaan Web Share -rajapinnalla tai ladataan. APK:ssa käytetään Capacitorin Share-liitännäistä (`tools/android-patch.cjs`).
- **Päätös:** Joonas, koska tämä on ominaisuuden laajuus.
- **Malli:** keski.

### P3 – suunnittelu (Joonaksen päätös ensin)

**D1. Yksi oikea diili tarinaan: ”Is that the mug talking, or the door?”**
- **Ehdotus:** perjantai (#22) ennen lounasta. Ekskyysmi tarjoaa diilin paperilappuna: ”Skip lunch. A quiet hour. Deal?” Muki on perjantaina hyvä, joten rehellinen vastaus on ”…The door.” Kasvu näkyy pelaajan omana erottelukykynä, ei repliikkinä.
- **Toinen vaihtoehto:** keskiviikko kello 23.15, jolloin muki on aidosti matala ja vastaus on ”The mug.” (lepo on oikea raja). Kaksi diiliä näyttäisi molemmat vastaukset, mikä on VISIOn idea.
- **Missä:** valmiit `dealOffer`, `dealSign` ja `dealOptions` (`src/36-mug.js`), kohtaukseen `src/31-story-week.js`.
- **Langat:** muki (§5), lounas ja perjantain rytmi. Kumpikaan vastaus ei saa estää lounasta, eikä mitään rangaista (pilari 4).
- **Valmis kun:**
  - mukitesti päivitetty
  - perjantain järjestys TARINAKARTTAan
  - kuittiin rivi *DEALS: 1 — the door, recognised.*
- **Malli:** korkea.

**D2. Lintu pelaajan tekona.**
- **Mitä:** uusi pito ”Hold: make the bird” patterilla (#25) juuri ennen kuin Sannan varjo kysyy ”…Is that a bird?”. Pelaaja pitää, ja lintu lentää niin kauan kuin pito kestää.
- **Missä:** `HOLD_LABEL`, `holdText`, `holdStep` ja `finishHold` (`src/20-engine.js`; AGENTS.md: uusi pito tarvitsee haaran kaikkiin kolmeen) sekä `labRadiator` (`src/52-radiator.js`). Asento `puppet` on valmiina.
- **Valmis kun:** testit ja hetkitesti menevät läpi ja pito toimii hiirellä ja kosketuksella.
- **Malli:** keski.

**D3. Koko-liukusäädin perjantaina.**
- **Mitä:** perjantain ”oh, hi” on sama hälytys. Pelaaja säätää koon kuten maanantaina. Mikä tahansa koko kelpaa, ja ihminen vastaa ”Big is allowed. Stay.” Kuittiin tulee rivi *ALARM SIZE: MONDAY ×a · FRIDAY ×b — stayed: friday.*
- **Missä:** perjantain alku (`src/31-story-week.js`). Askel `{stretch:true}` on valmiina (maanantai, `src/30-story-monday.js`), ja liukusäätimen pienin arvo 1,8 on jo iso, mikä sopii repliikkiin.
- **Malli:** keski.

**D4. Valo = näkyvyys, yksi repliikkipari.**
- **Mitä:** #23, kun piirros lähtee. Esimerkiksi: S: ”More light. More of me.” – H: ”I know. I want the light.”
- **Missä:** `src/49-second-act.js` (ryhmächat).
- **Malli:** kevyt (teksti), mutta päätös on Joonaksen.

**D5. Toinen laatikko röntgenissä.**
- **Mitä:** epilogin arkistokaapin lähikuvaan pieni nimetön laatikko raolleen ja lämpimämmällä hehkulla (`drawXray`, `src/35-inside.js`; vain `o.file`).
- **Malli:** kevyt.

**D6. Odotusaika lomakkeeseen.**
- **Mitä:** #16:n alkuun kertojan rivi ”A waiting room. Five weeks after the phone call.” Puhelusta tulee lanka, ja väli saa merkityksen. Ei terveydenhuollon arvostelua, pelkkä tosiasia.
- **Malli:** kevyt, mutta päätös on Joonaksen.

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
- §8:n P1-tehtävät
- piirtäminen ja asettelu
- yksittäiset käännökset
- tekstien hienosäätö, kun lanka ei muutu

**Kirjoittamisesta olen osittain eri mieltä.** Vitsin ensimmäinen versio syntyy parhaiten nopeasti. Sen tarkistaminen, mihin lankoihin se koskee, hyötyy syvästä päättelystä. Paras tapa on luonnostella kevyesti ja tarkistaa raskaasti.

**Ohje kevyemmälle mallille (kopioi tehtävän eteen):**
> Lue AGENTS.md ja tämän tiedoston tehtävä §8 / [ID]. Pelin koodia muokataan vain src/-kansiossa (ei assets/game.js:ää käsin). Ennen tekstimuutosta katso TARINAKARTTA.md §5 langat. Tee vain tämä tehtävä. Aja `node tools/build.cjs` ja `npm test`; kaikkien yhdeksän pitää mennä läpi. Nosta versio package.jsonissa ja kirjaa yksi rivi TARINAKARTTA.md:n versiolokiin. Kerro lopuksi, mitä et pystynyt tarkistamaan oikealla laitteella.

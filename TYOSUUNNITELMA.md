# Työsuunnitelma: tarinan kaari, kohtausvalinta ja työnjako

19.11.2026 · Claude (Opus) · pohjana versio 0.43.3, päivitetty 0.44.0. **Tämä on ensisijainen suunnitelma.**

> **Tila 0.44.0 (19.11.):** ✔ T1 (Joonas: ”jalosta suunnitelman mukaan”), ✔ T2 (uusi järjestys, kirjasto tarinaan, *The reply* ja muut lisäkohtauksiksi; takapakkirivi ”I’m working out my notice” siirretty *Not now.* -kohtaukseen), ✔ T8 (Toinen laatikko: siemenet ja paljastus), ✔ T11 (*By the radiator.* lopputekstien jälkeen). Seuraavaksi T3, T12 (pelaajatesti), T4, T6, T9. T10 odottaa lopun kappaletta.

> **Tila 0.44.1 (19.11.):** ✔ T3 (*Night shift* jatkuu *Evenings*-kohtauksesta ilman korttia, `NOCARD` tiedostossa `33-moments.js`). Lisäksi pelin aloitus: osakortti on rauhallinen siirtymä (aloitusruudun kuva himmenee, PART, otsikko ja kuvateksti tulevat esiin vuorotellen, nappi viimeisenä, sivupaneeli tyhjä), ja lamppupöytä piirretään ennen kuin ihminen saapuu. Seuraavaksi T12 (pelaajatesti), sitten T4, T6 ja T9.

> **Tila 0.45.0 (19.11.):** ✔ T4 (ydin): `src/45-camera.js` sisältää `shot('wide'|'two'|'close'|'push'|'crash', {who, z, rate, hide})`, ja maanantain jälkeen laukaisut kehystävät laukaisijan ja menevät syvemmälle (`hitFrame`). Less motion -asetuksella liikkeet ovat leikkauksia. T5 aloitettu: keskiviikkona Eeron syy on lähikuvassa, ja perjantaina Sanna ja ihminen ovat kahden hahmon lähikuvassa ilman varjoa, kunnes Ekskyysmi ilmestyy kuvaan repliikillä ”Looking busy was my idea.” Lisäksi Toisen laatikon siemen: perjantain ”There is NOW.” -repliikin edellä on `fib` (varjo valehtelee). Korjattu: yöllä sänky ja sohva olivat päällekkäin (sohva piilotetaan, kun sänky on esillä), ja puheääni loppui pitkissä repliikeissä ennen tekstiä (ääni ajastetaan nyt samalla laskulla kuin tekstin näyttäminen, `speak`). Seuraavaksi T5:n jatko (kaksi tai kolme kuvaa per päivä ti–to), T6 ja T9. Se korvaa CODEX_JATKO.md:n työjonon (P1–P8) järjestyksen. Vanhat dokumentit ovat taustaa.

> **Tila 0.46.0 (19.11.):** ✔ T9: aloitusvalikon *Moments* (Situations + From the story, `showMoments` tiedostossa `50-lab.js`, tallennuksen `done` merkitään loppukuvassa), Scenario lab vain `?lab`. ✔ T6 (ensiversio): jousiviive hartioissa (`M.sp`, `60-update.js`) ja kävelykeinunta (`geom`, `70-draw.js`); Joonas arvioi kotimatkalla. Korjattu: valokeila varjon päälle, pitkät valikot vierivät ylhäältä. Seuraavaksi T5 (kamerakieli ti–to), T7 (lamppuvälit), T12.

> **Tila 0.46.1 (19.11.):** ✔ T5: kamerakieli ti–to (2–3 kuvaa per päivä, ks. README 0.46.1). Joonas katsoo pelaten. Seuraavaksi T7 (lamppuvälit, lab-klooni) ja T12 (pelaajatesti); T10 odottaa kappaletta.

> **Tila 0.47.0 (20.11.):** ✔ Interaktiivisuus (§11): *(Say nothing.)* -kaari, kosketeltava huone, menetelmät kuittiin. 🧪 *The bag.* odottaa Joonaksen päätöstä: jos toimii, siirretään torstain klo 18.40 laukaisijaksi (pussi ennen riviä ”You’re just the loudest thing in the room”), ei uutena kohtauksena. Huom. Vantage Point -käänne: uusi minä ei saa olla parempi naamio, vaan siitä riisutaan pala. Seuraavaksi T7, T12.

> **Tila 0.48.0 (20.11.):** ✔ T7: *Lamp gap.* lab-kloonina (`52-lamps.js`). ✔ Työkalujen tasapaino (§12). 🧪 Joonas päättää: *The bag.* torstaihin, *Lamp gap.* maanantain kotimatkaan (yksi lamppuväli, ei kolmea). Seuraavaksi T12 (pelaajatesti), sitten T10 kun kappale on valmis.

> **Tila 0.49.0 (20.11.):** ✔ Pussi torstain laukaisijana ja viikon menetelmät käänteessä. ✔ Yksi lamppuväli maanantaihin. ✔ ”Filed.”-merkintä, ensimmäisen valinnan selkeys, ihmisen oma ”You too.” ja perjantain vastapari. Seuraavaksi T12 (pelaajatesti) ja APK:n tarkistus; sitten neljän lopun rakenne ja sisältöhuomautus (§9.1).

> **Tila 0.50.0 (20.11.):** Maanantain kappale poistettu (Joonaksen päätös: ei sovi). 🧪 T10:n ensimmäinen luonnos labissa ilman musiikkia (`37-epilogue.js`); Joonas arvioi, voiko siitä jalostaa oman kokonaisuutensa. Huom. canvasin blur-suodin hylättiin: liian hidas puhelimella.

Tavoite: tarinan kaari toimii, kohtaukset on valittu, ja työ etenee pieninä, valmiiksi määriteltyinä tehtävinä, jotka halvempi malli (Sonnet tai Codex) voi tehdä. Opus tarvitaan vain tarinapäätöksiin ja uuteen dialogiin.

---

> **20.11.2026:** syväluotaava katsaus (rytmi, kaari, uskottavuus, tutkimus, kielet) on tiedostossa **KATSAUS.md**. Sen kohta 12 on ehdotettu työjärjestys; Joonas päättää isot sisältömuutokset (8 ja 10).

## 1. Missä ollaan (mitattu)

`npm run pace` 19.11.: koko tarina **45:14**, 6048 sanaa, viisi päivää ja 17 välikohtausta. Lisäksi neljä kohtausta on vain labissa (voice, library, radiator, footage).

| Osa | Kesto | Huomio |
|---|---|---|
| Ma → To | ~25:30 (56 %) | Torstain käänne osuu 56 %:iin. Hyvä. |
| To → Pe (kahdeksan välikohtausta) | ~15:00 | **Rakenteen suurin ongelma.** Käänteen jälkeen kahdeksan hetkeä peräkkäin, ja perjantai alkaa vasta 91 %:ssa. |
| Pe + epilogi | ~5:00 | Ratkaisu jää lyhyeksi ja nopeaksi. |

Joonaksen arvio: maanantai ja baari ovat hulvattomia. Kaikkien kohtausten ei tarvitse olla, koska osa rakentaa huippukohtia.

---

## 2. Tarinan kaari v2: ”Toinen laatikko”

### Joonaksen idea (19.11.)

Ekskyysmi ei ole vain ylisuojelija. Lopussa paljastuu, että se on koko ajan myös rakentanut jotain: säilyttänyt, järjestellyt ja kasvattanut herkkyyttä, joka auttaa ymmärtämään muita. Kyse on *Vantage Point* -tyyppisestä paljastuksesta: pelaaja luuli näkevänsä yhden asian, mutta tapahtui muutakin. Tarina on matka kohti minuutta, jonka ihminen lopulta hyväksyy.

### Arvio

Idea on hyvä ja sopii peliin, mutta siinä on yksi vaara. Jos paljastus kertoo, että varjo oli salaa hyvä koko ajan, se mitätöi kaiken aiemman: ylisuojelusta tulisi jälkikäteen oikeutettua, ja viesti muuttuisi muotoon ”kipu oli kasvun hinta”. Peli on luvannut olla neuvomatta, eikä tämä ole totta RSD:stä.

**Ratkaisu: paljastus ei muuta sitä, mitä varjo teki. Se muuttaa sen, mitä varjo *säilytti*.** Ekskyysmi ei osaa heittää mitään pois, koska se on sen työ. Pelaaja näkee koko pelin ajan torjuntojen laatikon. Varjo on kuitenkin koko ajan pannut toiseen, merkitsemättömään laatikkoon kaiken hyvän, minkä se oli ”hukannut”. Samassa laatikossa on myös se, mitä se on huomannut muista ihmisistä. Sama herkkyys, joka satuttaa, on herkkyys, joka huomaa toiset. Tämä vastaa Joonaksen kirjettä: *”näet värähdykset muiden sanojen takana… kun et opi jotain, opit tietämättäsi aina jotain muuta.”*

### Siemenet ovat jo pelissä

Paljastus toimii vain, jos se on istutettu. Suurin osa siemenistä on jo valmiina:

| Päivä | Siemen | Tila |
|---|---|---|
| Ma | Kotimatkan debriefissä yksi kohta ohitetaan nopeasti: ”Item four: she waved. Irrelevant. Filed.” | **uusi rivi** |
| Ti | ”Filed: 1 note. **Misplaced: 3 compliments.**” | on jo |
| Ke | Eero: ”I hate presenting.” → Ekskyysmi: ”I’ve opened a file.” Keskiyöllä tieto suojaa Eeroa. | on jo (ensimmäinen kerta, kun toista laatikkoa käytetään) |
| To | Piirros: ”Since a Tuesday. You were seven.” | on jo |
| Osa 2 | *Quiet.* Kun varjo vaikenee, ihminen saa piirroksen valmiiksi (`quietDrawing`). | on jo |
| Osa 2 | *A fine.* (kirjasto, majakat, sivu 212): odottamaton yhteys | **siirretään tarinaan** (kohta 3) |
| Pe | Sanna: ”I was going to ask you on Monday.” | on jo |

### Toteutus 0.44.0

- `keep(id)` kirjaa hyvän hetken `G.kept`-listaan (tallentuu). Kohdat: maanantain kotimatkan ”Slide two: she said hi first. Irrelevant. Filed.” (`hi`), tiistain ”Misplaced: 3 compliments” (`compliments`), Eeron ”I hate presenting” (`eero`), kirjaston sivu 212 (`library`) ja Sannan ”I was going to ask you on Monday” (`asked`).
- *The group chat* -kohtauksessa vanhimman kortin päivityksen jälkeen ihminen huomaa merkitsemättömän laatikon. Ekskyysmi valehtelee (`fib`), ja laatikko aukeaa. Kortit tulevat esiin vain niistä hetkistä, jotka pelaaja näki, ja viimeisenä tulee aina piirros. Kortit ovat kahdessa sivupalstassa, ja puhekuplat piirretään niiden päälle (`g.drawer`).
- Loppurepliikit: ”It’s the one people could take away.” → ”Can we leave it open?” → ”…Draught risk. A crack. Leave it open a crack.”

### Paljastus, alkuperäinen luonnos (uusi kohtaus perjantain jälkeen, ennen *The group chat* -kohtausta tai sen sisällä)

Luonnos. Lopullinen teksti tehdään Opuksella ja Joonaksen hyväksynnällä.

1. Arkistossa Ekskyysmi on päivittämässä vanhinta korttia (tämä on jo pelissä). Ihminen huomaa toisen laatikon, jossa ei ole nimilappua.
2. H: ”What’s in that one?” – S: ”Nothing. Admin.” `fib()` (varjo pienenee, eli se valehtelee).
3. Laatikko aukeaa. **REPLAY · OTHER ANGLE**: neljästä kuuteen kolmen sekunnin välähdystä aiemmista kohtauksista samasta kuvasta, mutta nyt näkyy, mitä varjo teki kuvan reunalla. Se nostaa kortin, sujauttaa sen laatikkoon ja katsoo, ettei kukaan huomaa. Välähdykset: Sannan vilkutus, kolme kehua, Eeron ”you’re good at it”, sivu 212, ”she has a nice laugh” ja piirros.
4. H: ”You kept these?” – S: ”I keep everything. It’s the job.” – tauko – S: ”I just never opened this one in front of you.” – H: ”Why?” – S: **”It’s the one they could take away.”**
5. Viimeinen rivi on se, joka on jo pelissä: vanhin kortti päivitetään (”…I’ll update the file.”).

Repliikki ”It’s the one they could take away.” on RSD:n ydin: hyvää on vaikein näyttää, koska sen menettäminen sattuu eniten. Se ei ole neuvo. Se on havainto.

### Kirjeestä kuviksi (ei tekstiä peliin)

Kirjettä ei lainata peliin, koska peli ei saarnaa. Kolme sen kuvaa kelpaa kuvallisiksi keinoiksi:

- **Tyhjä kori:** muut poimivat sanoja ilmasta kuin omenoita, ihmisen kori on tyhjä. Tästä tulee keskustelun nopeuden kuva: sanat leijuvat, ja ihminen ehtii aina myöhässä.
- **Nauru kaikuna:** ihmisen nauru tulee puoli sekuntia muiden jälkeen. Pieni ääniefekti, ei repliikkiä.
- **Radio:** Ekskyysmi etsii oikeaa taajuutta kohinan keskeltä. Tämä sopii *Night shift* -kohtaukseen.

---

## 3. Kohtausvalinta (ehdotus pelaajatestiin)

Säännöt: pääpolku kestää noin 45 minuuttia, toinen näytös on enintään noin 14 minuuttia, ja jokaisella kohtauksella on rooli kaaressa. Pois jäävät kohtaukset eivät katoa, vaan siirtyvät **lisäkohtauksiksi** (kohta 4).

| Kohta | Kohtaukset | Kesto | Rooli |
|---|---|---|---|
| **Osa 1 *Better safe.*** | Ma (+ uusi siemen) | 5:15 | esittely, ”oh, hi.” |
| | Ti → *Enhance.* → *Rewind.* | 6:00 | palaute, kulmakarva, jälkipuinti |
| | Ke → *Evidence.* (midpoint) → *Colleagues.* → *An ordinary evening* | 6:50 | lasi käännetään omistajaansa, varjojen oma ”oh. hi.”, tyyntä |
| | To | 3:12 | käänne |
| **Osa 2 *A little room.*** | *Not now.* → *A quiet drink.* | 6:00 | oikea torjunta, baari (huippu) |
| | *Nothing.* → *The form.* → *Quiet.* | 4:00 | lähettäjätön isku, avun pyytäminen, hiljaisuus |
| | ***A fine.*** (kirjasto, **siirto labista**) | ~1:30 | odottamaton yhteys, kaksoisempatia |
| | *Evenings.* + *Night shift.* **yhdistettynä** | ~2:30 | lamppu, ja pimeässä kaikki varjot ovat samaa varjoa |
| **Osa 3 *Still here.*** | Pe | 2:51 | ratkaisu |
| | **Toinen laatikko** (uusi) | ~1:30 | paljastus |
| | *The group chat* | 2:04 | piirros jaetaan, boss-taistelu |
| | **Epilogianimaatio** (kohta 6) | ~1:30 | Safe at last |
| | *By the radiator.* | ~1:30 | **lopputekstien jälkeinen kohtaus** (”the next Tuesday”) |

**Lisäkohtauksiksi:** *The posting.*, *One small thing.* (toistaa tiistain palauteteeman), *Sometime.*, *The reply* (sama teema kuin ääniviestissä), *The voice message*, *Footage.* (paikka ratkaistaan testissä: se kilpailee *Evidence.*-kohtauksen kanssa samasta ”todisteteemasta”).

Toisessa näytöksessä on kahdeksan hetken sijaan seitsemän, ja *The reply* korvautuu kirjastolla, joka tuo puuttuvan odottamattoman yhteyden. Ennen kuin `AFTER`-järjestystä muutetaan, Joonas hyväksyy taulukon (tehtävä **T1**).

---

## 4. Lisäkohtaukset ja niiden avautuminen

Kysymys: avautuvatko lisäkohtaukset vasta, kun pääpeli on pelattu? Entä pelaaja, jota kiinnostaa juuri se, mikä hänen elämässään nyt sattuu?

**Ehdotus:**
- **Tarinan omat hetket** avautuvat valikkoon sitä mukaa kuin ne on nähty. Kaari suojataan: kukaan ei näe paljastusta ennen tarinaa.
- **Lisäkohtaukset** avautuvat heti maanantain jälkeen. Maanantai opettaa pelin kielen (kaksi kelloa, ulkopuolinen versio, kuitti), eikä sitä ilman muu toimi.
- Valikko nimetään tilanteen mukaan, ei kohtauksen nimen mukaan: ”The message that wasn’t answered”, ”Feedback at work”, ”When nobody did anything”. Silloin RSD:n kanssa elävä löytää oman kipukohtansa.
- **Scenario lab** pysyy kehitystyökaluna. Julkaisuversiossa se aukeaa vain osoitteella `?lab`.

---

## 5. Kamera: kuvakieli, ei yksi kaava

**Havainto (Joonas, pitää paikkansa):** jokainen laukaisu zoomaa samalla tavalla (`trigger()`: `cz=1.05+0.06k`, aina kuvan keskelle). Ensimmäisessä kohtauksessa toisto ei haittaa, myöhemmin se tylsistyy.

**Kuvatyypit** (uusi tiedosto `src/45-camera.js` ja askelfunktio `shot(type, opts)`):

| Tyyppi | Mitä | Milloin |
|---|---|---|
| `wide` | nykyinen perus (1.025) | oletus |
| `two` | kaksi hahmoa lähikuvassa (z≈1.55), Ekskyysmi rajautuu pois | kahdenkeskinen hetki, esim. Sanna ja ihminen |
| `close` | yhden hahmon kasvot (z≈2.0) | reaktio, joka kantaa yksin |
| `insert` | esine: puhelin, muki, kulmakarva | Enhance-tyylinen yksityiskohta |
| `push` | hidas zoomaus (1.0→1.25) yhden repliikin ajan | kierre, kun Ekskyysmi paisuttelee |
| `crash` | `two`- tai `close`-kuvassa Ekskyysmi ahtautuu kuvan reunasta ja kuiskaa ihmisen korvaan (pieni kupla, `quiet`) | **Joonaksen idea**: ihminen ja Sanna juttelevat lähikuvassa, varjo ei näy hetkeen, sitten se änkeää kuvaan |

**Säännöt:**
- Laukaisun zoomaus kohdistuu laukaisijaan (kuka sanoi), ei kuvan keskelle.
- Yksi erikoiskuva per tahti, sitten takaisin `wide`-kuvaan.
- Maanantai pysyy nykyisellään, koska se opettaa kielen.
- Less motion -asetuksella liikkeet korvataan leikkauksilla.

---

## 6. Epilogianimaatio lopputekstien tilalle

Toteutettavissa. Kahdeksasta kahteentoista välähdystä, kukin 5–10 sekuntia, piirretään pelin omilla hahmoilla aloitusruudun tyylillä: pehmeä liukuväri, osin läpinäkyvä, ei täysin tarkka. Kuvat vaihtuvat ristihäivytyksellä kappaleen iskujen tahdissa. Esimerkkejä: ihminen ja Ekskyysmi kippistävät (inkivääriolut ja varjon oma juoma), lounas Sannan kanssa, sivu 212, piirros ryhmächatissa, päänauha, patteri ja lamppu.

- **Tekstit:** ei RSD-neuvoja eikä tilastoja. Tilalle kuittirivejä takaisinviittauksina: ”Lunches: 1 · Accounts closed: 0 · Files updated: 1”. Viimeisenä yksi rivi: Made by Joonas Huhta (MoshBitSurfers).
- **Joonakselta tarvitaan:** kappaleen tiedosto ja tempo (BPM) tai iskujen ajat. Jos *Cosmic Loneliness* on tämä kappale, lähetä se.
- **Tekniikka:** aikajana `[{t, draw, caption}]` synkronoidaan `audio.currentTime`-arvoon. Less motion -asetuksella häivytykset ovat hitaampia.
- **Leikkauskieli (0.52, Joonaksen palaute):** ei tasaista Ken Burns -zoomia joka kuvassa. Vaihtele kuvien pituutta, käytä kovaa leikkausta komiikkaan ja ristihäivytystä herkkiin kohtiin, pidä useimmat kuvat paikallaan ja käytä liikettä vain merkityksen kanssa (äkillinen zoomi gagiin, hidas vetäytyminen lopussa). Yksi kontrasti (hälytys → ei mitään), yksi kohellus (ohi menevä yläfemma), yksi välähdys (nauru). Luonnos: `37-epilogue.js`, Moments → Work in progress.

---

### Epilogin kappaleen luonne (Joonaksen kysymys 19.11.)

Suositus: **ei puhdas pianobiisi eikä iloinen hitti, vaan sama wonky lo-fi -perhe, joka alkaa hiljaa ja lämpenee.** Peli on tähän asti ollut deadpan-lämmin. Tunteellinen pianokappale kääntyisi tuutulauluksi tai saarnaksi (sama ongelma kuin aiemmissa kokeiluissa), ja täysin iloinen kappale veisi viimeisen hiljaisen kuvan (lamppu ja varjolintu) ja Toisen laatikon herkkyyden. Montaasissa on kuitenkin hauskoja kuvia, joten se tarvitsee liikettä.

Rakenne: noin 10 s pelkkää Wurlitzeria tai pianoa (lamppukuva), sitten bändi tulee mukaan (basso, kitara, kevyt rytmi), ja montaasi alkaa iskusta. Kahden nuotin aihe nousee lopussa ylöspäin, kuten pääteemassa on suunniteltu. Lopetus on pidetty sointu, jonka jälkeen tulee *By the radiator.* -kohtaus.

## 7. Varjon kiinnitys: kokeilu, ei muutos

**Havainto:** kotimatkalla seinävarjo seuraa ihmistä kuin veturin kampi.

Kaksi erillistä kokeilua kloonikohtauksina labissa. Mitään olemassa olevaa ei muuteta ennen vertailua.

1. **Jousiviive (halpa, todennäköisesti parannus kaikkialle):** varjon vartalo seuraa ihmistä pienellä viiveellä ja keinunnalla, jalat pysyvät kiinni. Mekaaninen kampi poistuu.
2. **Katuvalojen välit (lab-klooni kotimatkasta):** lamppujen välissä seinävarjo haalistuu ja jää jälkeen, ja Ekskyysmi juoksee kiinni seuraavan lampun alla: ”Wait. WAIT. Lamp gap.” Tämä ei ole sääntö ”valo päättää koon” (Joonas hylkäsi sen), vaan yksi vitsi yhdessä paikassa.

---

## 8. Tehtävät

Jokaisessa tehtävässä: muokkaa vain `src/`-tiedostoja, aja `npm test` (story ja moments) ja `audit_layout.py` niille tiloille, joihin muutos vaikuttaa, sekä päivitä README:n versiomerkintä. **Malli** kertoo, mikä riittää: *S* = Sonnet tai Codex (määritelty toteutus), *O* = Opus (tarina- tai suunnittelupäätös, uusi dialogi).

| ID | Tehtävä | Malli | Tiedostot | Valmis kun |
|---|---|---|---|---|
| ✔ **T1** | Joonas hyväksyy kohtausvalinnan (kohta 3) | Joonas | – | hyväksytty 19.11. |
| ✔ **T2** | `AFTER`-järjestys hyväksytyn taulukon mukaan, kirjasto tarinaan, `WHEN`-kortit | S | `33-moments.js` | tehty 0.44.0 |
| ✔ **T3** | *Evenings.* + *Night shift.* yhdeksi hetkeksi | S | `33-moments.js` (`NOCARD`), `50-lab.js` | tehty 0.44.1: ei korttia välissä, käsikirjoitukset ennallaan |
| ✔ **T4** | Kamera: `shot()` ja kuvatyypit, `crash`, Less motion = leikkaus | S | `45-camera.js`, `60-update.js` (`camRate`), `20-engine.js` (`hitFrame`) | tehty 0.45.0 (`insert` hoidetaan edelleen Enhance-zoomilla) |
| ✔ **T5** | Kamerakieli tarinaan: kaksi tai kolme kohtaa per päivä ti–pe (`two` + `crash` Sannan kanssa perjantaina) | O suunnittelee, S toteuttaa | tarinatiedostot | Joonas katsoo pelaten |
| ✔ **T6** | Jousiviive varjon vartaloon (kohta 7.1) | S | `70-draw.js`, `60-update.js` | kotimatkan kuvakaappaus: ei kampivaikutelmaa, Less motion ilman keinuntaa |
| ✔ **T7** | Lab-klooni: katuvalojen välit (kohta 7.2) | S | uusi `52-lamps.js` | vertailu Joonakselle |
| ✔ **T8** | Toinen laatikko: siemenrivi maanantaihin ja paljastuskohtaus (kohta 2) | **O** | `keep()`, `KEPT`, `openDrawer()` (`20-engine.js`), `drawerReveal()` (`50-lab.js`) | tehty 0.44.0. Joonas arvioi pelaten. Välähdyskuvat (REPLAY · OTHER ANGLE) ovat jatkoidea: nyt paljastus tehdään korteilla. |
| ✔ **T9** | Lisäkohtausvalikko tilanteen mukaan nimettynä, avautuu maanantain jälkeen, lab vain `?lab` (kohta 4) | S | `80-ui.js`, `28-progress.js` | tallennustesti: avautuminen säilyy |
| **T10** | Epilogianimaatio (kohta 6) | S (moottori), O (välähdysten valinta) | uusi `37-epilogue.js` | Joonaksen kappale, tahdistus testattu selaimessa |
| ✔ **T11** | *By the radiator.* lopputekstien jälkeen | S | `33-moments.js` | tehty 0.44.0 (kortti ”THE NEXT TUESDAY”) |
| **T12** | Pelaajatesti 2 (kohta 9) | Joonas | – | vastaukset kirjattu tähän |

**Järjestys:** T1 → T2 → T3 → T12 (testi) → T8 → T4 → T5 → T6 → T9 → T10 → T11. T7 voidaan tehdä milloin tahansa. Tarina ennen kameraa: kamerakieli valitaan kohtauksiin, jotka jäävät peliin.

---

## 9. Muuta tärkeää, mitä ei ole vielä ajateltu

1. **Sisältöhuomautus.** Aihe voi osua kipeästi. Yksi hiljainen rivi About-sivulle tai ennen New gamea: ”This is a comedy about rejection sensitivity. Some moments may land close.” Ei neuvoja.
2. **Tallennusten yhteensopivuus.** Kun `AFTER` muuttuu (T2), vanhat tallennukset voivat osoittaa hetkeen, jota ei enää ole tarinassa. Tallennus käyttää hetkien tunnisteita, mikä on hyvä, mutta T2:een kuuluu testi: vanha tallennus, josta hetki on poistettu, jatkaa seuraavasta olemassa olevasta.
3. **Dokumenttien määrä.** Juuressa on 18 markdown-tiedostoa. Halvempi malli lukee väärän. Siksi tämä tiedosto on ensisijainen, ja AGENTS.md ohjaa tänne. Vanhat dokumentit voi myöhemmin siirtää kansioon `docs/arkisto/` (oma tehtävä, ei kiireellinen).
4. **Kohtausten metatiedot.** LABS-merkintöihin lisätään `act`, `role` ja `situation` (T9 tarvitsee ne valikkoon), jolloin järjestys ja valikko pysyvät samassa paikassa.
5. **Musiikkirekisteri.** Kohtausmusiikki lisätään `MUSIC`- ja `MUSICVOLS`-taulukoihin (`src/10-audio.js`). Kappale masteroidaan tasolle −24 LUFS (`ffmpeg -af loudnorm=I=-24:TP=-3`), jolloin puheväistö toimii automaattisesti.
6. **Lokalisointi myöhemmin.** Uudessa koodissa repliikkejä ei rakenneta yhdistelemällä merkkijonoja. Muuten suomenkielinen versio vaatisi uudelleenkirjoitusta.
7. **Pelaajatestin kysymykset (T12):** missä nauroit, missä tunnistit itsesi, mikä tuntui saarnalta, missä kohdassa halusit lopettaa ja yllättikö loppu. Kesto mitataan: kirjaa jokaisen testaajan aika per osa.
8. **Laitetesti jokaisesta APK:sta:** näyttö ei sammu, musiikki ei peitä puhetta, ääni toimii ensimmäisestä kosketuksesta ja vaakanäkymässä ei ole reunaa.

---

## 11. Kriittinen luenta 19.11. (koko viikko tekstinä, 929 riviä, versio 0.45.0)

**Lupaus ja lunastus.** Alku lupaa kaksi asiaa: ihminen haluaa pyytää Sannaa lounaalle, ja Ekskyysmi lupaa, ettei torjuntaa tule ”By anyone. Ever.” Molemmat lunastetaan. Torstain käänne (”the loudest thing in the room”) ja uusi työnkuva (”I could stay”), hiljaisen päivän lounas ilman varjoa, perjantain lounas varjon kanssa ja Toinen laatikko vastaavat kumpaankin. Kaari on selvä ja ymmärrettävä.

**Korjattu 0.45.1:**
- Kirjaston aikajana oli ristiriidassa: tavallisena iltana (osa 1) kirja on 23 päivää myöhässä, ja kirjastossa (osa 2, viikkoja myöhemmin) se oli edelleen 23 päivää myöhässä ja kortissa luki ”23 days later”. Nyt kirja on seitsemän viikkoa myöhässä, ja kortissa lukee ”A SATURDAY, WEEKS LATER”.
- *Night shift* viittasi *Sometime.*-kohtaukseen, joka on nyt lisäkohtaus. Repliikki on nyt itsenäinen (”we should grab a coffee sometime”).
- ”There is NOW.” oli kahdesti, *Rewind*-kohtauksessa ja perjantaina. Perjantaina varjo vastaa nyt ”It’s new.” ja pienenee (`fib`), eli valehtelee. Toinen laatikko lunastaa valheen.
- About lupasi ”one week”, vaikka tarina jatkuu viikon yli, eikä se kertonut ihmisen tavoitetta. Nyt siinä lukee ”one small plan: ask Sanna from work to lunch”, ja yksi epäreilu ajastus selitetään yhdellä lauseella: ”Conversations don’t wait either.”

**Avoimet havainnot (ratkaistaan pelaajatestillä):**
1. **Lopussa on neljä päätöstä peräkkäin:** Toinen laatikko, ”I’m keeping the headband”, lamppukuva ja *By the radiator*. Tämä voi tuntua siltä, että loppu ei lopu. Jos testaajat herpaantuvat, karsi ensin päänauharivi, sitten patterikohtaus lisäkohtauksiin.
2. **Haluttu lounas toteutuu kahdesti:** ensin hiljaisena päivänä ilman varjoa, sitten perjantaina varjon kanssa. Tämä on temaattisesti oikein, koska hyväksyminen ei tarkoita varjon poistamista. Pelaaja ei ehkä huomaa eroa, koska perjantai ei sano sitä. Mahdollinen lisärivi perjantain loppuun on harkittava tarkkaan, koska ”Lunch.” on hyvä viimeinen sana.
3. **Dialogilaatikko leveällä näytöllä:** repliikki näkyy kahdesti, kuplassa ja paneelissa, ja kertojan rivi myös kuvan alanauhassa. Kupla on ensisijainen ja paneeli lokiluonteinen. Ehdotus kokeiltavaksi: kun kupla on näkyvissä, paneelin teksti himmennetään vähän, jolloin silmä tietää, kumpaa lukea. Ei toteutettu ilman testiä, koska Joonas on aiemmin hämmentynyt juuri kuplan ja paneelin suhteesta.
4. **Eeron varjo Y** laatii yöllä anteeksipyyntöjä etukäteen, eli se on ahdistunut. Kohdan 4 (SYVENNYS.md) ehdotus rennosta Juustsei-varjosta on tämän kanssa ristiriidassa. Päätettävä ennen nimien lisäämistä.
5. **Vahvimmat vitsit** (säilytä rytmi, älä lisää väliin): maanantain ”Rejection prevented. / That wasn’t a rejection. / And it stays that way.”, *Enhance* (”The eyebrow was HUNGER.”), baarin ”a coat stand with opinions” ja ”the shadow of one”, torstain ”a man shouting ’fire’ in a different building”.

## 10. Työtavat (kaikille malleille)

- Lue ensin AGENTS.md ja sitten tämä tiedosto.
- `npm test` ajaa nyt kaksi testiä: koko tarinan kaikki reitit (`story.test.cjs`) ja **jokaisen hetken kolmella valintapolulla piirtäen** (`moments.test.cjs`). Molempien pitää olla vihreinä ennen committia.
- Uusi `G.`-kenttä, joka piirtää jotain, nollataan `scene()`-funktiossa.
- C:\RSD ja git pidetään samassa tilassa. Codex voi muokata C:\RSD:tä ilman gittiä, joten tarkista muutosajat ennen päälle kirjoittamista.
- Kun tehtävä on valmis, merkitse se tähän tiedostoon (✔ ja versio) ja kerro, mitä ei testattu oikealla laitteella.

---

## 12. Työkalubudjetti (20.11.)

Ekskyysmin keinot ovat vitsejä vain niin kauan kuin ne ovat harvinaisia. Ennen kuin lisäät keinon kohtaukseen, tarkista tämä taulukko. Laskuri: `npm test` ei valvo tätä, joten katso `grep` tai pyydä analyysi.

| Keino | Budjetti | Nyt |
|---|---|---|
| Ulkopuolinen kortti (WHAT X SAW) | enintään 1 per kohtaus; joka päivässä ainakin yksi kohtaus ilman korttia; sama otsikko enintään 2 kertaa | n. 20 tarinassa (karsittu 22:sta) |
| Leimasin | maanantai (lyönti) ja perjantai (pidellään, pannaan pois). Ei muualla. | 1 + 1 |
| *(Say nothing.)* | lukossa ti klo 3 ja ke keskiyö, auki pe ja kommenteissa. Ei viestivalinnoissa (sekoittuu ”älä lähetä”). | 2 + 2 |
| Suurennuslasi | omat kohtauksensa (glass, nothing, library, evenings) + yksi kurkistus muualla per päivä | |
| Arkisto (vanhat muistot) | enintään 1 per päivä | |
| Kamera: erikoiskuva | 2–3 per päivä, sitten aina takaisin laajaan | |
| Kosketeltavat esineet | 2–3 riviä per esine, sitten hiljaa; ei maanantaina | |
| Iso varjo (s ≥ 1.6) | spiraalin huipulla, ei keskustelun pohjana | |
| Erikoisilme (look) | yksi repliikki | |

Sääntö: jos kohtauksessa on jo pito tai minipeli, sen jälkeen ei tarvita sekä korttia että leimaa. Yksi alleviivaus riittää.

---

## 13. Katsauksen täydennykset (Joonas hyväksyi kaikki 20.11.2026)

Perustelut ovat tiedostossa KATSAUS.md (kohta suluissa). Jokainen uusi kohtaus tarkistetaan työkalubudjettia (§12) vasten. Peli ei mainitse tutkimuksia eikä neuvo: ilmiö näytetään.

| ID | Tehtävä | Koko | Tila |
|---|---|---|---|
| ✔ **K1** | ”since 2011” → ”since the drawing” (3 kohtaa; 2011 jää yksittäisen muiston vuodeksi). Keskiviikon diat 23:40 → 23:15. | S | 0.60.0 |
| ✔ **K2** | Ryhmächatin kohtaus päättyy lauseeseen ”A crack. Leave it open a crack.” (päänauharivi pois). Loppunäytön kuitti jää jaettavaksi versioksi (kuva/teksti), epilogin kuitti on elokuvaversio. | S | 0.60.0 |
| ✔ **K3** | Sanattomat tauot: torstain ”That one landed.” jälkeen ja perjantain ”smaller once it’s out” jälkeen (piirustusrivin jälkeen tauko oli jo). | S | 0.60.0 |
| **K4** | Ulkopuolinen kortti, jossa varjon puuttuminen sanotaan ääneen (illusion of transparency). Havainto: kortit eivät koskaan piirrä varjoa, eli sääntö on jo kuvassa. Tarvitaan vain yksi kohta, jossa Ekskyysmi huomaa sen: ”…I’ve been doing all this for an audience of none?” Paras paikka: maanantain ”WHAT THE OTHERS SAW” venytyksen jälkeen, kun varjo oli seinän kokoinen. | S–M | |
| ✔ **K5** | Havaitseminen huolenpitona: perjantaina Ekskyysmi huomaa Sannan varovaisen ”fine”-sanan, ihminen: ”For the record: when I say ’fine’, it’s the good kind.” | S | 0.60.0 |
| ✔ **K6a** | Palautuminen: baarin loppuun ”Nice is still a lot.” | S | 0.60.0 |
| ✔ **K6b** | Aistit 1/3: pesulappu tiistain palaverissa (”One crisis at a time. …Two crises.”). | S | 0.60.0 |
| **K6c** | Aistit 2/3: maiskutus perjantain lounaalla tai lounaskohtauksessa; Ekskyysmin huomio pirstoutuu kesken Sannan lauseen. Kynnysajatus: ”The cup was full before she said anything. She just added a drop.” | S | |
| **K6d** | Aistit 3/3: hajuvesi hississä (hissi on vain epilogissa; joko uusi pieni hetki tai epilogin hissikuvan rivi). | S–M | |
| **K7** | *Rewind* lisäkohtaukseksi tai sen paras aines (”Memory is a living document.”, sarvet) tiistain klo 3 -kohtaukseen. Ratkaisee suurennusten toiston ja kaksi yörumina-kohtausta peräkkäin. | M | |
| **K8** | *The reply*: impulsiivinen puolustusviesti (”FINE. Have fun without me.” lähtee ennen kuin pelaaja ehtii estää), häpeä, peruutuspaniikki, yhden rivin anteeksipyyntö. Piikikäs ääriviiva Ekskyysmille. RSD:n ruma puoli. | M | |
| **K9** | Monta valoa, monta varjoa: baarin värivaloissa Ekskyysmi hajoaa 3–4 varjoksi, jotka puhuvat yhtä aikaa (”TABS OPEN, IN HEAD” kuvana). | M | |
| **K10** | *The ball*: oikea ulkopuolelle jääminen ilman käännettä. Lounaspöytä, mökkireissu, jolle ihmistä ei kutsuttu; keskustelu pallona (`toss`), kortti ei käännä (”They planned it in a car. You weren’t in the car.”). Pelaaja voi heittää pallon itse (”How was it?”). Paikka: toisen osan loppupuoli. Antaa toiselle osalle jännitteen. | L | |
| **K11** | *Stay* hyvässä hetkessä: viimeinen pito on kauniissa hetkessä, ei kurjassa (hyvien hetkien pelko, toinen laatikko). | M | |
| **K12** | Merkkijonotaulukko en/fi/sv ennen uutta sisältöä: rivitunnisteet, `lang/*.json`, avaintesti, `audit_layout` kielikohtaisesti, myös kankaalle piirretty teksti (kuitti, leimat, kortit). | L | |
| **K13** | Toinen laatikko näkyviin toisessa osassa (Ekskyysmi istuu laatikon päällä *Night shiftissä*). | S | |
| **K14** | Yksi suurennus käännetään: totuus on *parempi* kuin Ekskyysmi kuvitteli, ei vain arkinen. | S–M | |
| **K15** | Ihminen vähemmän terapeutti: yksi oivallus Ekskyysmille itselleen tai Sannan varjolle; tarkista ”That’s the good half…” pelaajatestissä. | S | |
| **K16** | ADHD-tekstuuri: ihminen keskeyttää palaverissa innostuneena → Ekskyysmille materiaalia koko illaksi (impulsiivisuus ja RSD yhtenä silmukkana). | S–M | |
| **K17** | Ekskyysmin valo-ideat: ilta-aurinko venyttää ilman pelkoa (”I’m not scared. It’s just five o’clock.”); kädet kohtaavat vain varjoina, kun ihminen nostaa kätensä. | M | |
| **K18** | Nimen vitsi: ”Excuse me.” / ”…That’s my name.” / ”I know. It suits you.” (patteri tai About). | S | |
| **K19** | *Night shift* -vuorovaikutus: auton valo pyyhkii huoneen, pelaaja pitelee varjoa valossa (”a short holiday”). | M | |
| **K20** | Ekskyysmin paikan vahvistus: ”You’re still on the wall. That doesn’t change.” | S | |
| **K21** | Pelaajatesti molemmille yleisöille (tunnistaminen / ymmärrys), kysymys NT-pelaajalle: ”Mitä ymmärsit, mitä et ennen ymmärtänyt?” Lisää §9.7:n kysymyksiin. | Joonas | |
| **K22** | Saavutettavuus: tekstikoko, tekstin nopeus; aikarajoitettujen kohtien epäonnistuminen ei saa näyttää pelaajan virheeltä. | M | |
| ✔ **K23** | Sisältöhuomautus About-sivulle (§9.1): ”Some moments may land close.” | S | 0.60.0 |
| ✔ **K24** | Lokalisointimuistiinpanot KAANNOS.md:hen: ”You too” → ”Kiitos, samoin.” (hyvää ruokahalua), ”oh, hi.” → ”ai, moi.” / ”jaha, hej.”, kirjaston ”fine” kirjoitetaan uudelleen. | S | 0.60.0 |
| **K25** | Koulupaketti (myöhemmin): samat ilmiöt yläkoulun arjessa (parien valinta, luokan chat, ”voitko jäädä tunnin jälkeen”). Vain muistiin. | – | idea |

**Järjestys:** K4 → K6c → K13 → K18 → K20 → K23 → K24 (pienet) → K7 → K14 → K15 (tarina) → K8 → K10 → K9 → K11 (isot, yksi kerrallaan, pelaajatesti välissä) → K12 ennen kuin sisältöä lisätään paljon.

### 13.1 Joonaksen linjaukset 20.11.2026 (illalla)

- **Peruslinja: RSD ei katoa.** Siitä ei päästä eroon. Sen vaikutusvaltaa voi oppia ymmärtämään ja hallitsemaan, ja siihen auttaa armollisuus itseä kohtaan. Mikään kohtaus, kortti tai kuitin rivi ei saa vihjata parantumiseen. Nykyinen loppu on linjassa: ”For the record, I intend to go off again on Monday.” / ”I know. I’ll be there.” Tarkista jokainen uusi loppu tätä vasten. Hiljainen päivä (Quiet) on yksi helpompi päivä, ei uusi elämä.
- **Epilogin varjolintu pysyy.** Ekskyysmin lintuleikki osuu musiikkiin juuri oikein. Älä siirrä tahtia (bar 49) äläkä poista.
- **K26 Epilogin loppu kuitin jälkeen (auki, ei kiire):** jotain, mitä ei ole vielä nähty. Joonaksen idea: Ekskyysmin ninjailu. Ei toistoa aiemmista kuvista. Epilogin ei tarvitse olla valmis vielä.
- ✔ **K27 Kertoja (0.61.0):** kertojan rivit ovat nimettömiä ja kursiivisia, ilman kuvaketta (ruudunlukija kuulee yhä ”Narrator”). Alun tyhjä hetki ei enää näytä kertojan riviä paneelissa, vaan alku puhuu omalla kuvatekstillään. Peleissä yleinen tapa: kertoja on ääni, ei hahmo; aika ja paikka näytetään hetkellisenä kuvatekstinä.
- ✔ **K28 Puhekuplat kameran sisällä (0.61.0):** kupla pysyy näkyvän kuva-alan sisällä myös zoomatessa, vähintään 18 px reunasta (Eeron ensimmäinen kupla osui reunaan).

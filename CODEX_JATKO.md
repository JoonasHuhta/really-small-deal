# Jatko Codexille

16.11.2026 · Claude → Codex · versio 0.40.0. Tämä on luovutusdokumentti: missä peli on, miten sitä työstetään, ja mitä seuraavaksi tehdään, tärkeysjärjestyksessä. Lue sen jälkeen [AGENTS.md](AGENTS.md) (työtavat ja kirjoitussäännöt). Pelin tekstit ovat englantia, dokumentit suomea.

**Päätökset 16.11. (Joonas):** (1) ei karsita vielä: mitä enemmän materiaalia on pelattavana, sitä paremmin testipelaajat ja Joonas näkevät, mikä kaareen kuuluu; (2) toinen näytös saa lyhyen osa-otsikon; (3) Scenario lab on vain kehitystyökalu, eikä sitä lukita: valmis peli on kohtauspohjainen ja etenee kronologisesti kuten *Night in the Woods*; (4) yövalo ensin, *A compliment.* myöhemmin. Yksityiskohdat kohdassa 5.

**Tärkein periaate:** Joonas on linjannut, että julkaisua ei nyt mietitä eikä pituutta lisätä keinotekoisesti. Työ on tarinan, Ekskyysmin reaktioiden ja selkeyden hiomista. Jokaiseen uuteen ideaan suhtaudutaan kriittisesti: sulautuuko se kaareen, toistaako se jotain jo tehtyä, ja raskauttaako se rytmiä.

## 1. Tarina nyt

Viisi lukua ja niiden välissä lyhyet hetket (järjestys: `src/33-moments.js`, `AFTER`).

| Kohta | Sisältö | Rooli kaaressa |
|---|---|---|
| Luku 1 *Oh, hi.* (maanantai) | ”oh, hi.”, vastausikkuna, kotimatka | laukaisin ja hälytin esitellään |
| Luku 2 *Quick chat?* (tiistai) | palaveri, 03:07, jättikupla | vanha työ, yhä kalliimpi |
| *Enhance.* · ***Rewind.*** · *The posting* | zoomaus kulmakarvaan · muisto pahenee joka kelauksella · hakematta jättäminen | Ekskyysmi tuplaa panoksensa |
| Luku 3 *Could you just…* (keskiviikko) | miellyttäminen, naamio | |
| *One small thing.* · *Evidence.* · *Sometime.* · *Colleagues* · *An ordinary evening* | suurennuslasi kääntyy omistajaansa (keskipiste), muiden varjot, tiskausilta | |
| Luku 4 *Seen.* (torstai) | ”Seen 17:31.”, kolme pistettä, pohja, **”I could stay.”** | Ekskyysmi hyväksyy ihmisen iskut |
| *The reply* · *Not now.* · *A quiet drink.* | uusiutuminen, Riitan varjo, **baari-ilta ja aamun lasku** | |
| ***Nothing.*** · ***The form.*** · ***Quiet.*** · ***Evenings.*** · ***Night shift.*** | toinen näytös: isku ilman lähettäjää, lomake, päivä ilman varjoa, lamppu, yövuoro | ihminen hyväksyy Ekskyysmin; kumpikaan ei ole yksin |
| Luku 5 *Oh, hi. Again.* (perjantai) | sama huone, sama kahvi, Sanna, ”no” Eerolle | todiste molemmista |
| *The group chat* | kommenttimyrsky | |

Koko teksti on lähdekoodissa. Lyhyt yhteenveto jokaisesta versiosta: [README.md](README.md). Toisen näytöksen säännöt: [TOINEN_NAYTOS.md](TOINEN_NAYTOS.md). Linja ja ideavarasto: [SUUNTA.md](SUUNTA.md).

## 2. Työkalut

```
node tools/build.cjs            kokoaa src/*.js → assets/game.js (älä koskaan muokkaa game.js:ää käsin)
npm test                        tarkistaa koonnin ja pelaa kaikki reitit läpi (tests/story.test.cjs)
python tools/audit_layout.py    puhelinasettelun tarkastus viidellä koolla, kuvat kansioon tools/audit-shots/
python tools/audit_layout.py quiet form bar     vain nämä tilat
npm run android:sync            pelin ja musiikin vienti Android-projektiin + tarkistukset
```

`audit_layout.py` tarvitsee Pythonin ja Playwrightin (`pip install playwright`, `playwright install chromium`). Testiajuri ja tarkastus käyttävät pelin testirajapintaa `window.__T` (`src/90-loop.js`): `T.lab(id)`, `T.chapter(n)`, `T.state()`, `T.advance()`, `T.choose(i)`, `T.tick(s)`, `T.draw()`.

## 3. Työjono, tärkeysjärjestyksessä

### P1. Laitetesti (Joonas tekee, Codex korjaa)

Mitään alla olevista ei ole kokeiltu oikealla puhelimella:

- [ ] **Koko ruutu** (`GameApp.java`, kirjoitetaan `tools/android-patch.cjs`:stä). Jääkö reunaan kaistale? Jos käännös kaatuu, virhe on todennäköisesti AndroidX-importeissa.
- [ ] **Aloitusmusiikki** alkaa ensimmäisestä kosketuksesta ja häipyy, kun peli alkaa. Pysähtyykö se, kun sovelluksen vaihtaa tai ruudun lukitsee?
- [ ] **Äänten voimakkuus**: kuplien poksahdus (`pop`, `popS`), valikko (`menuOn`, `menuOff`), napit (`ui`), `rewind`, `car`. Kaikki on syntetisoitu eikä kukaan ole kuullut niitä.
- [ ] **Tekstin rytmi**: tuntuvatko välimerkkitauot luontevilta, ja näyttääkö ensimmäinen napautus repliikin loppuun?
- [ ] **Toisen näytöksen rytmi**: kantaako *Quiet.* hiljaisuuden vai pitkästyttääkö se?

### P2. Rytmimittari ja karsinta

Torstain ja perjantain välissä on nyt yhdeksän hetkeä. Ennen yhtään uutta hetkeä tarvitaan mittari.

**Tehtävä:** `tools/pace.cjs`. Käytä samaa DOM-tynkää kuin `tests/story.test.cjs`, pelaa tarina läpi ja laske jokaiselle luvulle ja hetkelle arvioitu kesto: repliikit lukunopeudella 230 sanaa/min + 0,6 s per napautus, `{wait}`-askeleet sellaisenaan, pidot niiden `secs`-arvolla, valinnat 4 s. Tulosta taulukko (hetki, repliikkejä, arvioitu kesto) ja kokonaisaika. Lisää `package.json`:iin `"pace": "node tools/pace.cjs"`.

Mittari tehdään nyt, mutta **karsintaa ei tehdä vielä** (päätös 16.11.): materiaalia kerätään ja testipelataan ensin. Mittarin tulos kirjataan README:hen, jotta karsintapäätös voidaan myöhemmin tehdä numeroiden ja testipelaajien palautteen pohjalta. Mahdolliset ehdokkaat sitten: *The reply* ja *Nothing.*-hetken lyhentäminen.

### P3. Toisen näytöksen viimeistely

1. **Osa-otsikko (päätetty).** Ennen *Nothing.*-hetkeä oma kortti samalla tyylillä kuin lukukortti (`chapCard`). Lyhyt ja vähäeleinen: ”PART TWO” ja alle ”QUIET.” tai pelkkä ”QUIET.”. Ei mitään, mikä vihjaa lääkkeeseen tai diagnoosiin. Nyt toinen näytös on piilossa luvun 4 jälkihetkissä, eikä pelaaja tunne siirtymää.
2. **Lomake jää puhelimella paneelin alle.** 740×360-koossa tekstipaneeli peittää lomakkeen alareunan, jossa allekirjoitusviiva on. Allekirjoitus on hetken tärkein kuva. Korjaus: kun `html.immersive` (paneeli kankaan päällä), piirrä lomake pienempänä ja ylempänä (`drawForm` tiedostossa `src/49-second-act.js`). Tarkista `python tools/audit_layout.py form`.
3. **Kotimatka *Quiet.*-hetkeen.** Nyt kaksi kertojan riviä. Oikea kävelykohtaus samoilla autoilla kuin maanantaina (`CARS` tiedostossa `src/51-quirks.js`), mutta ajatustekstiä ei tule eikä ihminen hymyile parin kohdalla. Se on hetken paras kuva, jos se toimii.
4. **Scenario lab on kehitystyökalu (päätetty).** Labia ei lukita, koska se on vain kehitystä ja testausta varten. Valmis peli on kohtauspohjainen ja etenee kronologisesti (vrt. *Night in the Woods*). Labin piilottaminen valmiista pelistä on julkaisutehtävä (P8), ei nyt.
5. **Toisen näytöksen äänet.** Lomakkeen rastit käyttävät leimasinääntä, ja lamppu käyttää `turn`-ääntä. Lampun naksahdus ja kynän rahina olisivat parempia (ks. P5).

### P4. Kankaan teksti puhelimella

Kankaalle piirretty teksti skaalautuu ruudun mukana. Tarkista puhelinkoossa (640×360 on pienin) seuraavien luettavuus ja korjaa tarvittaessa koko tai sijainti: lomake (`drawForm`), nauha (`drawTape`), piirakat (`drawPie` tiedostossa `src/53-bar.js`), paperikuitti (`drawPaper`), yövuoron silmät ja kuplat (`drawNight`), muistilaput ja ajatustekstit. Kapealla ruudulla kuplia ei piirretä ollenkaan (`WIDE`), ja paneeli kantaa repliikit. Jos kankaalla on tekstiä, joka on juonen kannalta tärkeä (esim. ”OH. HI.”, ”everything is ruined”), sen pitää näkyä myös paneelissa kertojan rivinä tai olla riittävän iso.

### P5. Äänet ja musiikki (Joonas äänittää, Codex kytkee)

**Tehosteet** vaihtuvat lisäämällä tiedoston `SAMPLES`-taulukkoon tiedostossa `src/10-audio.js` samalla nimellä. Nykyiset nimet:

`hit` (isku rintaan) · `zap` (röntgen) · `startle` · `card` (lukukortti) · `cut` (ulkopuolinen versio) · `turn` (sivu / lamppu) · `pick` (valinta) · `nope` · `good` · `stamp` · `swat` · `drip` · `clink` · `enhance` · `rewind` · `car` · `pop` (kupla) · `popS` (Ekskyysmin kupla) · `dotsOff` · `ui` (nappi) · `menuOn` · `menuOff`

Puhelimen äänet ovat `speak()`-funktiossa (`P`-puhuja: saapuva viesti, lähetetty, ”Seen”, puhelu).

**Musiikki** on kytketty kohtauksiin taustan nimellä: `scene()` kutsuu `music(o.music||o.set)`. Kun `MUSIC`-taulukkoon lisää rivin, kaikki sen taustan kohtaukset soittavat sitä. Nimet: `title` (on jo), `intro`, `room`, `office`, `home`, `bar`, `library`, `clinic`. Huom: *Quiet.*-hetkessä pitää olla hiljaista, ja *Nothing.*-hetkessä ei musiikkia pidon aikana (TOINEN_NAYTOS.md, sääntö 4.1).

### P6. Tarina: seuraavat ehdokkaat (vain Joonaksen hyväksynnällä)

Jokainen on uusi laukaisin samaan kaavaan, ei uusi järjestelmä. Lyhyet luonnokset: [SUUNTA.md](SUUNTA.md) kohdat 5c ja 7.

1. **Yövalo loppukuvana (päätetty, ensin).** Viimeisen hetken jälkeen yksi kuva: ihminen jättää pienen valon päälle, ei suojaksi varjolta vaan jotta varjolla olisi paikka olla. Sitoo lampun (*Evenings.*) ja yövuoron (*Night shift.*) loppuun ilman uutta repliikkiä.
2. ***A compliment.*** (myöhemmin) Kehu menee perille, ja Ekskyysmi käsittelee sen samalla koneistolla kuin iskun: tutkii, arkistoi, käy katsomassa neljäkymmentä kertaa. Paras käyttämätön suoni. Valmis luonnos SUUNTA.md:ssä.
3. **Tauko on sisältöä.** Ihminen pitää keskustelussa tarkoituksella tauon, ja ruudulle ilmestyy laskuri ”pause: 1.4 s”. Pelaajan ainoa tehtävä on pitää nappia. Sopisi perjantaihin, jos sinne mahtuu.
4. **Suihkuväittely, myöhästynyt isku, anteeksipyyntölaskuri:** ideavarastossa. Älä toteuta kaikkia: valitse korkeintaan yksi, ja vain jos rytmimittari sallii.

### P7. Tekninen velka

- **Haarojen kattavuus.** `playLab` valitsee oletuksena ensimmäisen vaihtoehdon. Toisen näytöksen hetkillä ja baari-illan aamulla on kolme loppua, ja vain osa on testattu. `playLab(id, n)` hyväksyy valinnan numeron.
- **Labin lista on pitkä.** Puhelimella lista vierii yli 400 px (`audit_layout.py lab-list`). Ryhmittele luvuittain tai tee siitä kaksipalstainen.
- **Tallennukset.** `chain(n, from)` jatkaa hetken tunnisteen mukaan, joten uusien hetkien lisääminen `AFTER`-listaan ei riko vanhoja tallennuksia. Hetken **poistaminen** tai **uudelleennimeäminen** rikkoo: jos karsit, lisää `startChapter`-funktioon paluu luvun alkuun, kun tunnistetta ei löydy.
- **Tila, joka pitää nollata.** Jokainen uusi `G.`-kenttä, joka piirtää jotain (`G.tape`, `G.pie`, `G.night`…), pitää nollata `scene()`-funktiossa (`src/31-story-week.js`), muuten se vuotaa seuraavaan kohtaukseen.

### P8. Julkaisu (ei nyt)

Joonaksen linjaus: ei nyt. Kun aika tulee: Scenario labin ja testirajapinnan piilotus valmiista pelistä (esim. näkyviin vain `?dev=1`-osoitteella), allekirjoitettu AAB, Play Consolen suljettu testi (henkilökohtainen kehittäjätili vaatii 12 testaajaa 14 päivän ajan), itch.io-sivu selainversiolle. Ohjeet: [ANDROID.md](ANDROID.md).

## 4. Säännöt, joista ei tingitä

Kaikki ovat myös [AGENTS.md](AGENTS.md):ssä. Tärkeimmät:

- **Ei diagnoosia, lääkettä eikä ammattilaista nimeltä.** Testi kieltää sanat (`adhd`, `autis`, `medicat`, `pill`, `diagnos`, `doctor`, `therap`, `prescri`, `hospital`).
- **Lääke ei ole roisto, eikä lopettaminen ole onnellinen loppu.** Peli ei kerro, mitä ihminen tekee.
- **Tapa on mieltymys, ei pakko.** Pakko-oireelta näyttävä rituaali poistettiin 0.32 (ks. [OUTOUDET.md](OUTOUDET.md)).
- **Alkoholi ei ole ratkaisu.** Baari-illassa väsymys pudottaa suodattimen; ihminen juo inkiväärijuomaa.
- **Perusilme on vitsi**, täsmäilme (`{look:…}`, `aside`) kestää yhden repliikin.
- **Yksi käsin tehtävä asia hetkeä kohden**, ja sen pitää tarkoittaa jotain.
- **Ei paranemista.** ”For the record, I intend to go off again on Monday.” on pelin lämpimin lause.

## 5. Päätökset (Joonas, 16.11.2026)

1. **Karsinta:** ei vielä. Materiaalia kerätään ja testipelataan ensin, koska mitä enemmän on koettavana, sitä paremmin näkee, mikä draaman kaareen kuuluu ja mikä ei. Rytmimittari (P2) tehdään silti, jotta päätös voidaan myöhemmin tehdä numeroiden pohjalta.
2. **Osa-otsikko toiselle näytökselle:** kyllä, lyhyt ja vähäeleinen (P3.1).
3. **Scenario lab:** vain kehitystyökalu, ei lukitusta. Valmis peli on kohtauspohjainen ja etenee kronologisesti kuten *Night in the Woods*. Labin piilotus kuuluu julkaisuun (P8).
4. **Järjestys:** yövalo ensin, *A compliment.* myöhemmin (P6).

# Käännöshuomiot (suomi, ruotsi, muut kielet)

Peli on englanniksi. Tähän listataan rivit, jotka eivät käänny sanasta sanaan, jotta kääntäjä tietää etsiä vastineen eikä käännöstä. Koodin sääntö: repliikkejä ei koota paloista. Luvut tulevat paikkamerkillä `{n}` (`fmtN`, `31-story-week.js`).

## Työtapa (0.99.39): näin peli käännetään

1. **Lista.** `npm run strings` pelaa pelin läpi (kolme viikkoa, jokainen Moment kolmella polulla, valikot) ja kirjoittaa tiedostoon `i18n/strings.tsv` jokaisen tekstin, jonka pelaaja voi nähdä, siinä järjestyksessä kuin ne tulevat vastaan. Sarakkeet: englanninkielinen rivi (avain), laji (`line` repliikki, `choice` valinta, `card` kortti, `outside` ulkoversio, `ui` valikot ja kuitit, `canvas` kuvaan piirretty teksti), puhuja (S Ekskyysmi, H ihminen, A Sanna, B Eero, R Riitta, N kertoja, P puhelin…), kohtaus ja huomio. 27.11.: noin 2 770 riviä, noin 15 800 sanaa.
2. **Uusi kieli** on yksi tiedosto `src/17-<kieli>.js`, joka täyttää `DICT.<kieli>`-sanakirjan samaan tapaan kuin `src/16-fi-monday.js` täyttää suomen. Lisäksi `LOC`-rivi (desimaalimerkki, lainausmerkit) tiedostoon `src/15-fi.js` ja `option` kielivalikkoon (`index.html`).
3. **Mitä puuttuu:** `node tools/strings.cjs fi` kirjoittaa tiedostoon `i18n/missing-fi.tsv` ne rivit, joilla ei vielä ole suomennosta.
4. **Mahtuuko:** Settings › *Unlock all (testing)* → Language › *Pseudo (layout test)*. Jokainen kirjain korostetaan ja teksti on 40 % pidempi, joten näkee heti, mikä ei mahdu ja mikä jäi kääntymättä. `tests/i18n.test.cjs` tekee saman automaattisesti.
5. **Luvut:** jos rivissä on luku, joka vaihtelee, käännetään malli: `DELETED · TAKE {n}` → `POISTETTU · OTTO {n}`. Luvut palaavat järjestyksessä, ja desimaalipilkku tulee `LOC`-asetuksesta (`0.4 s` → `0,4 s`). Valuutta samoin: `€{n}` → `{n} €`.
6. **Kuvaan piirretyt tekstit** (kyltit, kuitit, lappuset, kuvatekstit) kääntyvät samasta sanakirjasta. Kyltti puristaa liian pitkän sanan mahtumaan, ja kuitin pitkä nimike kapenee arvonsa vierellä, joten lyhyt käännös on silti parempi. Ohjeelliset pituudet: kuitin rivin nimike noin 28 merkkiä, kylttiteksti noin 16, kortin otsikko noin 30. Seinäkyltit (kirjasto, baarin liitutaulu) piirretään käännettyinä kuviksi (`stillText`), joten kieltä vaihdettaessa kuva tehdään uudestaan. Toimiston juliste *BE A MUG. NOT A HERO.* ei käänny.

## Sanaleikit ja idiomit

| Rivi | Missä | Mikä pitää säilyä |
|---|---|---|
| “It’s a no in a coat.” | ke keskiyö, pe | kielto naamioituna kohteliaaksi; ”takki” palaa perjantaina (”What coat?”) |
| “Streetlights with a gap policy.” | Lamp gap | byrokratiasana arkiesineelle |
| “Lamp gap.” | ma kotimatka | lyhyt, kuin liikennemerkki |
| “BE A MUG. NOT A HERO.” | ilmoitustaulu (kuva, 0.99.40) | **Ei käännetä** (Joonas 27.11.: ”saa olla ihan kuva”). Juliste piirretään kuvana, ja se jää englanniksi kaikilla kielillä. ”Mug” on sekä muki että hölmö, ja muki on pelin jaksamisen mittari. |
| “Informal head of keeping things from getting awkward.” | ma esittely | leikkititteli |
| “You too.” / “You t— …Thanks, Eero.” | ma, pe | kohteliaisuusrefleksi; vastine on oltava yhtä automaattinen (fi: ”Samoin.”) |
| “Nobody sneezes in paragraphs.” | to | |
| “That’s the smile. It’s load-bearing.” | ke | rakennusala-sana |
| “A thumb. ONE thumb. She has two.” | ti | 👍-reaktio |
| “I’ll use a smaller font.” | ti klo 3 | iso puhekupla peittää ikkunan |
| “EASY OPEN.” | to, The bag | pakkausteksti |
| “Ekskyysmi filed that.” | valinnat | parodia ”X will remember that” -ilmoituksesta |
| “(Say nothing.)” / “Not a setting. Yet.” | valinnat | ”setting” = asetus |
| “Riitta. Of all the names in the hat.” / “It was a bowl.” | *Secret Santa.* | idiomi ”names in a hat” kirjaimellisesti oikaistuna; suomeksi esim. ”kaikista hatun nimistä” → ”Se oli kulho.” |
| “Socks.” / “With a FULL STOP.” / “Thank you. Really.” | *Secret Santa.* | Riitan kaksi sanaa ovat koko hänen äänensä: lyhyt, piste perään. Ekskyysmin ”Riitta-sanakirja” laskee ne (”Two words so far.”) |
| “Merry Christmas! No pressure to like it.” | *Secret Santa.* | pikkujoulut ovat marraskuussa (kortti A FRIDAY, LATE NOVEMBER); joulutoivotus kuuluu tilanteeseen |
| “Offer the snacks. Leave the lift out of it.” | ke | ”lift” = kyyti autolla (brittienglanti), ei hissi |
| “Year two.” / “Year 4: could be neater.” | ryhmächat, *Enhance.* | brittiläinen kouluvuosi: Year 2 = 7-vuotias (”You were seven.”). Käytä oman maan luokka-astetta (fi: 1. luokka) |
| “A fine.” / “She says it’s FINE.” / “Fine.” | kirjasto, ke, pe | ”fine” kulkee läpi viikon: Sannalle lähetetty ”Fine.” (ke) → ”I do that with ‘fine’” (pe) → kirjaston sakko. Katso *Lokalisointi* alla |
| “NAMES, LEARNED · 1 (JARI)” / “ours: drowned out by LIBRARY.” | epilogi | bussikuulutus peittää ihmisen nimen; kylttiin ja riviin sama pysäkin nimi |
| “hands at the same height. (married.)” | epilogin rulla | bussin tanko: kädet samalla korkeudella näyttävät pariskunnalta |
| “after you. no, after YOU.” | epilogi | kohteliaisuussilmukka hississä |
| “AUDIENCE: STILL HERE.” | epilogi | Ekskyysmi tutkii suurennuslasilla katsojaa |
| “Still open: one meeting. Tuesday, by the radiator.” + “Ekskyysmi and Sanna’s shadow.” | epilogin viimeinen kortti, kaksi riviä | **tapaaminen, ei vastaanottoaika** (lomakkeella on ”An appointment.”). Toinen rivi kertoo, kenen tapaaminen. Lupaa patterikohtauksen. Ei sanaa ”outstanding” (0.99.41: luettiin ”erinomaiseksi”). |
| “ekskyysmi: finnish for ‘excuse me’” | rullan viimeinen rivi | suomeksi vitsi on toisin päin: keksi oma viimeinen rivi (esim. nimen alkuperä tai ”ekskyysmi: suomeksi anteeksi”) |

## Rakenteet, joissa on luku

`BILL` (`31-story-week.js`): ”You’ve taken me out of {n} rooms this week…” Kääntäjä saa koko lauseen; monikko tarvitsee ehkä oman muodon luvulle 1 (nykyään luku on aina vähintään 3).

## Epilogin kuitti: WHAT IT FELT LIKE (0.59)
- Rivit ovat kuitin kieltä: lyhyt nimike vasemmalle, arvo oikealle, ei verbejä. Kaksi riviä mahtuu noin 42 merkkiin yhteensä.
- Aistirivit (`COLLAR LABEL, FELT`, `CHEWING, NEXT TO ME`, `PERFUME, IN THE LIFT`) ovat konkreettisia tarkoituksella: älä yleistä ”aistikuormitukseksi”.
- `“DO THEY STILL LIKE ME?” … ×23` / *answer so far: yes.*: lainausmerkit kuuluvat ajatukseen, ja ”so far” jättää pelon todeksi mutta vastauksen myönteiseksi.

## Lokalisointi, ei käännös (KATSAUS.md §10)
- **”You too”** (Eerolle, menulle): suomeksi tilanne on valmiina kansallisena noloutena. Tarjoilija: ”Hyvää ruokahalua!” → ”Kiitos, samoin.” Käytä tätä, älä käännä sanatarkasti. Ruotsiksi: ”Smaklig måltid!” → ”Tack, detsamma.”
- **”oh, hi.”** → ”ai, moi.” / ruotsiksi ”jaha, hej.” Piste säilyy, koska vitsi on pisteessä.
- **Kirjaston ”fine”** (sakko / ihan ok) ei käänny. Kirjoita uudelleen: esim. suomeksi Ekskyysmi kuulee ”maksu” → ”maksaa itsensä?” tai rakentaa vitsi ”myöhästymismaksu”-sanan pituuden ympärille. Säilytä rakenne: pelko → odottamaton arkinen merkitys → helpotus → uusi pikkupelko (”In public. In front of the large-print section.”).
- **Ekskyysmi**: nimi on suomalaisittain kirjoitettu ”excuse me”. Suomeksi merkitys aukeaa heti, älä selitä. Ruotsiksi nimi pysyy; tarvittaessa yksi vihjerivi (TYOSUUNNITELMA K18).
- **”For the record”** on Ekskyysmin tunnuslause ja toistuu (myös ihmisen suussa perjantaina ja hiljaisena päivänä). Valitse yksi vakiokäännös (”Pöytäkirjaan:” / ”Till protokollet:”) ja pidä se kaikkialla.
- **”since the drawing”**: ei vuosilukua. Älä lisää.

## Suomenkielinen kokeilu: maanantai (0.89)
- **Tekniikka:** englanninkielinen rivi on avain. `tr(rivi)` (`src/15-fi.js`) palauttaa suomennoksen tai, jos sitä ei ole, englannin. Suomennokset: `src/16-fi-monday.js`. Uuden päivän kääntäminen = uusi tiedosto `src/17-fi-<päivä>.js` samaan muotoon.
- **Puuttuvien keruu:** suomeksi pelattaessa `tr()` kirjaa jokaisen englanniksi jääneen rivin (`__T.fiMiss()`). Aja reitit suomeksi, kerää lista, käännä, aja uudelleen, kunnes lista on tyhjä. `tests/fi.test.cjs` vaatii maanantailta tyhjän listan.
- **Kokonaiset lauseet:** jos koodi liimaa rivin palasista, palaset saavat oman avaimen ({paikkamerkki} lukuja varten: `'WINDOW: {s} s · …'`, `'You left for {a}.'`). Älä käännä lauseenpuolikkaita erikseen.
- **Mitä koodi tarvitsee rivistä:** `<br>` pysyy, `{paikkamerkit}` pysyvät, alun ”…” pysyy, ”Sanna: ”…””-muotoinen viesti alkaa nimellä ja kaksoispisteellä (”You:” → ”Sinä:”), välilyönti rivin alussa pysyy (” (on the tab)” → ” (piikkiin)”). Testi tarkistaa nämä.
- **Ääni ja ajastus** käyttävät englanninkielistä riviä (esim. lähetetyn viestin ”You:”-suhahdus), joten ne toimivat samoin kummallakin kielellä.
- **Ratkaisuja, joihin voi palata:** ”Become furniture” → ”Muutu huonekaluksi”; ”Lamp gap.” → ”Lamppujen väli.”; ”Please don’t have slides.” → ”Älä vain sano, että teit kalvoja.” (jotta ”Kaksi.” toimii vastauksena); ”YEAR 2” → ”2. LUOKKA”; ”BE A MUG. NOT A HERO.” → ”OLE MUKI. ÄLÄ SANKARI.”; ”comfort zone” → ”mukavuusalue”; ”the snap” → ”tiuskaisu”.
- **RSD:lle ei ole vakiintunutta suomenkielistä termiä.** Yhteisöt käyttävät lyhennettä sellaisenaan; kuvailevia ehdotuksia ovat ”torjuntaherkkyys” ja ”hylkäämisherkkyys”. Peli ei nimeä RSD:tä tekstissä, joten käännöksen ei tarvitse ratkaista tätä.

## Päätös 22.11.2026: englanti ensin, käännökset sen jälkeen (Joonas)
- **Englanti on punainen lanka.** Se tehdään valmiiksi vitseineen ja kohtauksineen ennen kuin käännöksiin käytetään aikaa. Suomenkielinen maanantai (0.89) jää kokeiluksi: se todisti, että tekniikka toimii. Tekstiä ei hiota ennen kuin englanti on lukittu.
- **Ei sanasta sanaan.** Kokeilun suomi on paikoin tönkköä, koska se seuraa englantia liian tarkasti. Lopullinen suomi (ja ruotsi) saa revitellä omalla tavallaan: oma vitsi saa korvata käännetyn, kunhan kohtauksen rakenne ja tunne säilyvät (vrt. *Lokalisointi, ei käännös* yllä). Kun englanti on valmis, suomi kirjoitetaan rivi riviltä uudelleen, eikä kokeilun tekstiä vain korjailla.
- **Suomenkielisen version nimiehdokkaat** (Joonas, molemmissa säilyy RSD):
  - *Raskaansarjan sisäinen draama.* Englanninkielinen nimi on ulkoa katsottuna (pieni juttu), tämä sisältä katsottuna (raskaansarja). Nimet ovat toistensa peilikuvat, kuten pelin kaksi kelloa. Raskaansarja sopii varjoon, joka kasvaa hartioita myöten. Varo: ”draama” voi kuulostaa samalta kuin ”älä draamaile”, jota RSD-ihminen on kuullut tarpeeksi. ”Sisäinen” pitää sen omana kokemuksena eikä esityksenä.
  - *Rauhattoman sielun dialogi.* Osuva (koko peli on dialogi ihmisen ja varjon välillä), mutta kuulostaa runokokoelmalta. Komedia ei näy nimestä.
  - *Rajallisen sosiaalisuuden dilemma.* Kuulostaa Ekskyysmin oman muistion otsikolta, mikä on hyvä asia. Se kuitenkin nimeää jaksamisen (muki), ei torjunnan pelkoa (varjo). Siksi pelin voisi lukea introverttiudesta tai sosiaalisesta akusta kertovaksi, vaikka ihminen haluaa seuraa ja välttelee vain torjuntaa (Sanna: ”I never know if you want company.”). Pelin sisältä sille löytyisi hyvä paikka, esimerkiksi arkiston kansion tai kuitin otsikkona.
  - **Mielensäpahoittaja-ajatus (Joonas 22.11.).** Kyrön hahmon nimi on hahmotyypin nimi, ja meillä on jo sellainen: **Ekskyysmi**. Suomalainen tunnistaa sanasta heti anteeksipyytelevän ja kömpelön tyypin, joka yrittää englantia. Ehdotus: suomeksi peli on nimeltään *Ekskyysmi* ja englanniksi *Really Small Deal*. Lyhenne voi elää alaotsikossa: *Ekskyysmi – raskaansarjan sisäinen draama*. Muita ehdokkaita: *Varmuuden vuoksi.* (varjon motto ja maanantain ensimmäinen ”Better safe.”) ja *Ai, moi.* Sanaa ”mielensäpahoittaja” ei käytetä nimessä eikä markkinoinnissa, koska se on Kyrön hahmon nimi. Jos arvostelija tekee vertauksen itse, parempaa palautetta tuskin voi saada.
  - **Mitä Mielensäpahoittaja-perinne antaa suomennokselle:** monologin, jossa pieni asia paisuu periaatteelliseksi täysin vakavalla äänellä, ja jäykkyyden, jonka alla on hellyys. Ero on peilikuva: Mielensäpahoittaja pahoittaa mielensä maailmasta, Ekskyysmi pelkää, että maailma pahoittaa mielensä meistä. Kummallakin on arkisto. Toiselle se todistaa, että ennen oli paremmin, toiselle (2009, 2016, 2019), että nytkin menee pieleen. Suomenkielinen Ekskyysmi saa puhua tällä suomalaisella äänellä eikä käännetyllä englannilla.
  - Suomen kielessä otsikoissa on iso alkukirjain vain ensimmäisessä sanassa. Lyhenne RSD näkyy silti, jos logo korostaa sanojen alkukirjaimia.

# Käännöshuomiot (suomi, ruotsi, muut kielet)

Peli on englanniksi. Tähän listataan rivit, jotka eivät käänny sanasta sanaan, jotta kääntäjä tietää etsiä vastineen eikä käännöstä. Koodin sääntö: repliikkejä ei koota paloista. Luvut tulevat paikkamerkillä `{n}` (`fmtN`, `31-story-week.js`).

## Työtapa (0.99.39): näin peli käännetään

1. **Lista.** `npm run strings` pelaa pelin läpi (kolme viikkoa, jokainen Moment kolmella polulla, valikot) ja kirjoittaa tiedostoon `i18n/strings.tsv` jokaisen tekstin, jonka pelaaja voi nähdä, siinä järjestyksessä kuin ne tulevat vastaan. Sarakkeet: englanninkielinen rivi (avain), laji (`line` repliikki, `choice` valinta, `card` kortti, `outside` ulkoversio, `ui` valikot ja kuitit, `canvas` kuvaan piirretty teksti), puhuja (S Ekskyysmi, H ihminen, A Sanna, B Eero, R Riitta, N kertoja, P puhelin…), kohtaus ja huomio. 27.11.: noin 2 770 riviä, noin 15 800 sanaa.
2. **Uusi kieli** on yksi tiedosto `src/17-<kieli>.js`, joka täyttää `DICT.<kieli>`-sanakirjan samaan tapaan kuin `src/16-fi-monday.js` täyttää suomen. Lisäksi `LOC`-rivi (desimaalimerkki, lainausmerkit) tiedostoon `src/15-fi.js` ja `option` kielivalikkoon (`index.html`).
3. **Mitä puuttuu:** `node tools/strings.cjs fi` kirjoittaa tiedostoon `i18n/missing-fi.tsv` ne rivit, joilla ei vielä ole suomennosta.
4. **Mahtuuko:** Settings › *Unlock all (testing)* → Language › *Pseudo (layout test)*. Jokainen kirjain korostetaan ja teksti on 40 % pidempi, joten näkee heti, mikä ei mahdu ja mikä jäi kääntymättä. `tests/i18n.test.cjs` tekee saman automaattisesti.
5. **Luvut:** jos rivissä on luku, joka vaihtelee, käännetään malli: `DELETED · TAKE {n}` → `POISTETTU · OTTO {n}`. Luvut palaavat järjestyksessä, ja desimaalipilkku tulee `LOC`-asetuksesta (`0.4 s` → `0,4 s`). Valuutta samoin: `€{n}` → `{n} €`.
6. **Kuvaan piirretyt tekstit** (kyltit, kuitit, lappuset, kuvatekstit) kääntyvät samasta sanakirjasta. Kyltti puristaa liian pitkän sanan mahtumaan, ja kuitin pitkä nimike kapenee arvonsa vierellä, joten lyhyt käännös on silti parempi. Ohjeelliset pituudet: kuitin rivin nimike noin 28 merkkiä, kylttiteksti noin 16, kortin otsikko noin 30.

## Sanaleikit ja idiomit

| Rivi | Missä | Mikä pitää säilyä |
|---|---|---|
| “It’s a no in a coat.” | ke keskiyö, pe | kielto naamioituna kohteliaaksi; ”takki” palaa perjantaina (”What coat?”) |
| “Streetlights with a gap policy.” | Lamp gap | byrokratiasana arkiesineelle |
| “Lamp gap.” | ma kotimatka | lyhyt, kuin liikennemerkki |
| “BE A MUG. NOT A HERO.” | ilmoitustaulu (piirretty kuva) | ”mug” = muki ja hölmö; kuvassa, vaatii piirron vaihdon |
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
| “Outstanding: one meeting. Tuesday, by the radiator.” | epilogin viimeinen kortti | **tapaaminen, ei vastaanottoaika** (lomakkeella on ”An appointment.”); lupaa patterikohtauksen |
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

## Suomennos 2.0 (0.99.68–, Joonas 28.11.: ”aloitat suomennoksesta, pidä lystiä ja jatka, tarkistan suomen itse myöhemmin”)
Englanti on lukittu, joten suomi kirjoitetaan nyt kokonaan, osa kerrallaan: maanantai ja valikot (0.99.68), tiistai ja keskiviikko, torstai ja baari, osa kaksi, perjantai ja loppu, sitten kokeiluhetket. Kokeilun 0.89 maanantai kirjoitettiin uudelleen.
- **Äänet.** Ekskyysmi puhuu virkakieltä täysin vakavalla äänellä (Mielensäpahoittaja-perinne): pöytäkirja, arkisto, toimenpide, alivaliokunta; lyhyitä iskulauseita; huuto isoilla kirjaimilla. Ihminen puhuu arkista, kuivaa kirjakieltä (ei mä/sä-kirjoitusta). Sanna on lämmin ja vähän epävarma, Eero innokas valmentaja, Riitta lyhyt, piste perään. Kertoja: lyhyt preesens.
- **Vakiot.** ”oh, hi.” → ”ai, moi.” · ”You too.” → ”Samoin.” · ”For the record” → ”Pöytäkirjaan:” · ”Ekskyysmi filed that.” → ”Ekskyysmi arkistoi tämän.” · rejection → torjunta · ”Keep you from being rejected.” → ”Varjella sinua torjunnalta.” (varjo/varjella) · ”Quick chat?” → ”Ehditkö hetken?” · ”Seen.” → ”Nähty.” · ”Lamp gap.” → ”Lamppujen väli.” · comfort zone → mukavuusalue · ”I’m attached.” → ”Olen kiinnittynyt.” · ”YEAR 2” → ”2. LUOKKA”.
- **Ajat** kertojan riveillä suomalaisittain pisteellä (18.40.). Kellotaulu HUDissa ei muutu.
- **Tiistai ja keskiviikko (0.99.69).** Riitan ”Quick chat?” on ”Ehditkö hetken?”, ja varjo tarttuu sanaan *hetki* (”Kukaan ei pyydä ”hetkeä” hyville uutisille.”, ”Tämä vie vain hetken.” → ””Hetken.” Taas.”). ENHANCE → SUURENNA (lukema SUURENNOS ×800), REWIND → KELAUS, REPLAY → UUSINTA, load-bearing → kantava rakenne, (on the tab) → (piikkiin), saying yes → myöntyminen (kuitissa MYÖNTYMISIÄ), keskiviikkoyön ”Fine.” → ”Selvä.”. Arkiston kortti ”Siisti käsiala. Voisi olla siistimpi.” ja Suurenna-hetken ”4. luokka: voisi olla siistimpi” viittaavat toisiinsa, joten ne käännetään yhdessä. ”It’s a no in a coat.” → ”Se on ”ei” takki päällä.”; ”two-letter word” toimii suomessakin (*ei*).
- **Torstai (0.99.71).** ”Seen.” → ”Nähty.” (viesti ”Nähty 17.31.”); ”No worries if not!” → ”Ei huolta, jos ei sovi!”, jotta Sannan ”huolia on AINA” osuu; ”Send: “???”. With teeth.” → ”Hampaat irvessä.”; the glass → suurennuslasi, sitten lasi; Exhibit A/B/C → Todiste A/B/C; job description → toimenkuva (EKSKYYSMIN TOIMENKUVA); ”Stay with you when it happens.” → ”Pysyä kanssasi, kun se tapahtuu.” (sama infinitiivi kuin ”Varjella sinua torjunnalta.”); ”the passenger seat” → pelkääjän paikka; ”too sensitive” → ”liiallinen herkkyys”, ”It’s just sensitive.” → ”Se on vain herkkyyttä.”; Mum → Äiti. Viikon tilinpäätös (”You’ve prepared {n} worst cases…”) on neljä kokonaista lausetta mallina {n}.
- **Ei nyt. ja baari (0.99.72).** Baarin tuntematon sanoo ”Ekskyysmi?”, ja varjo vastaa ”Niin?”: suomessa nimi on sama kuin arkinen *ekskyysmi*, joten vitsi toimii sellaisenaan. Ginger beer → inkiväärilimsa (ei olutta: alkoholi ei ole ratkaisu missään kohtaa). Cocktail umbrella → pieni sateenvarjo (*sateenvarjo* sisältää varjon). ”Thanks, you too.” → ”Kiitos, samoin.”. A quiet drink. → Yksi juoma. Riitan varjo jongleeraa (”Se OSUI.” – ”Niin ne osuvat.”).
- **Toinen osa, alku (0.99.73).** Kirjaston *fine*-vitsi on kirjoitettu uudelleen sanalla **sujut**: kirjastonhoitaja sanoo ”Tehdään meistä sujut.”, varjo kuulee sovinnon (”olemme SUJUT”), ja ihminen tarkentaa: ”Rahassa. Neljä euroa kuusikymmentä.” – ”…Ai. SILLÄ tavalla sujut.” Hetken nimi A fine. → Sujut., ja valinta ”Say “it was fine.”” → ”Sano: ”Se oli ihan sujuva.”” (”En sano täällä enää ”sujua” missään muodossa.”). Kirjan ”If we liked it, why did we keep it?” toimii suomeksi sellaisenaan, koska *pitää* on sekä tykätä että säilyttää. Office Christmas party → pikkujoulut, Secret Santa → salainen joulupukki. Lomake-hetkessä suomikaan ei nimeä ammattia, lääkettä eikä diagnoosia: odotushuone, vastaanottoaika, pieni paperipussi ja tuoli joka toinen tiistai. Overruled → äänestetään kumoon.
- **Toinen osa, loppu (0.99.74).** Varjot puhuvat ihmisistään sanoilla *omasi / omani* (”Sinun omasi sanoi sen minun omalleni.”); keskiviikon ”Fine.” on suomessa ”Selvä.”, joten Sannan varjon ”Joku sanoi ”selvä”.” pitää langan Perjantaihin. ”We should grab a coffee sometime” → ”Mennään joskus kahville” (myös Hetket-valikon Joskus.). ”Point of order” → työjärjestyspuheenvuoro. Arkistokortin ”Said “you too” to “enjoy your weekend”.” on suomeksi ”Vastasi ”samoin” toivotukseen ”onnea”.”, koska ”samoin” hyvään viikonloppuun on suomessa aivan oikein. Hetket-valikon nimet ja kuvaukset on käännetty kaikille hetkille, myös niille, joiden sisältö tulee myöhemmissä osissa.
- **Pituus.** Kun repliikin pituus on itse vitsi (kello kolmen valtava lista), suomi tiivistetään enintään englannin rivimäärään. Englannin pituus on mitoitettu ruutuun.
- **Työtapa.** `node tools/strings.cjs fi` pelaa nyt viikon 18 kertaa (jokainen maanantai, neljä valintalinjaa, sekalinja ja voitettu vastausikkuna); kolme maanantai-B-viikkoa jätti aiemmin maanantait A ja C pois. Suomenkielinen arvo lasketaan suomeksi vain suomessa, joten nimet kuten SANNA eivät enää putoa listalta.

# Tarinakartta – Really Small Deal

**Tämä tiedosto on totuus pelin järjestyksestä ja nimistä.** Kun puhumme kohtauksesta, käytämme tämän kartan numeroa ja kortin otsikkoa, esimerkiksi *#9 An ordinary evening*. Jos järjestys koodissa muuttuu, tämä tiedosto päivitetään samassa muutoksessa. `tests/story.test.cjs` tarkistaa, että alla olevan taulukon järjestys on sama kuin koodin (`src/33-moments.js`, `AFTER`). Jos ne eroavat, build kaatuu.

Laadittu 21.11.2026 versiosta 0.71.0, päivitetty versioon 0.73.0 suoraan koodista: järjestys, kortit, kellonajat, paikat ja kestot (`npm run pace`). Kohta ”Mitä vie eteenpäin” on käsin kirjoitettu.

---

## 1. Miten puhutaan

- **Kohtaus** on yksi rivi tässä kartassa: päivä (luku) tai hetki. Siihen viitataan numerolla ja otsikolla: *#3 Tuesday*, *#17 A fine.*
- **Kuva** on paikan tai kellonajan vaihdos kohtauksen sisällä, esimerkiksi *#3 Tuesday, kuva 2: yö 03:07*. Koodissa kuvaa kutsutaan nimellä `scene()`, joten koodin ”scene” ≠ meidän ”kohtaus”.
- **Koodi-id** (viimeinen sarake) on vain teknistä viittausta varten.
- **Tarina ei käy koskaan labrassa.** Tarinan hetket rakennetaan funktiolla `labScene`, koska samat kohtaukset voi pelata myös Moments-valikosta. Se on pelkkä nimi. Labrassa on lisäksi prototyyppejä, jotka eivät ole tarinassa (kohta 7).

### Nimet, jotka menevät helposti sekaisin

| Älä sekoita | Mikä on mikä |
|---|---|
| *#9 An ordinary evening* · *#18 Evenings* · *#19 Night shift* · kappale **Ordinary Evening** | Osan 1 ilta (tiskit, Kaisa) · Osan 2 ilta (osa-aikatyö) · Osan 2 yö · Joonaksen kappale, joka soi **#3 Tuesday** -kohtauksessa |
| *#14 Nothing.* · `nothings` · perjantain valinta ”Say ’nothing’” | Osan 2 sunnuntai · laskuri siitä, montako kertaa ihminen sanoi ”nothing” · perjantain vaihtoehto |
| *#16 Quiet.* · *#12 A quiet drink.* · `mugQuiet` | Hiljainen päivä ilman varjoa · baari · mukin häivytys, kun mitään ei tapahdu |
| Luku 5 = *#21 Friday* | Perjantai on Osassa 3, eikä se välttämättä ole saman viikon perjantai (”Not necessarily that one.”) |
| Kortin otsikko ≠ koodi-id | glass = *Evidence.*, bar = *A quiet drink.*, library = *A fine.*, comments = *The group chat*, epilogue = *The week, itemised.* |

---

## 2. Kolme kohtaustyyppiä

| Tyyppi | Mikä se on | Mitä vie | Muki |
|---|---|---|---|
| **PÄIVÄ** (luku 1–5) | Nimetty arkipäivä, kortissa viikonpäivä (”A TUESDAY”) | **Ulkoista tarinaa:** lounas Sannan kanssa, quick chat, kyllät, ”Seen.”, perjantai | On |
| **HETKI** | Lyhyt kohtaus saman elämän sisältä. Aika kelluu tarkoituksella: kortti kertoo suunnilleen milloin, ei koskaan mikä viikko | **Sisäistä tarinaa.** Sääntö (KASIKIRJOITUS.md): jokaisen hetken pitää liikuttaa vähintään yhtä näistä: **(1) suojelun hinta ihmiselle, (2) Ekskyysmin epäilys omasta työstään, (3) muiden ihmisten sisäinen elämä** | Ei |
| **OSAKORTTI** | PART ONE / TWO / THREE | Rytmi ja ajan hyppy | – |

**Hetket eivät ole takaumia.** Kaikki tapahtuvat nykyhetkessä. Pelin ainoat oikeat muistot ovat punaiset arkistokortit (”YEAR 2: Showed someone a drawing…”), *#5 Rewind* -kohtauksen nauha ja torstain alkuperä (”Since a Tuesday. You were seven.”).

---

## 3. Kolme aikaa

1. **Kello** (päiväleima vasemmalla ylhäällä): mitä kello on kohtauksessa. Päivissä näkyy viikonpäivä, ja puolenyön jälkeen se vaihtuu itse.
2. **Järjestys:** missä järjestyksessä kohtaukset pelataan (taulukko alla).
3. **Eletty aika** (kuitti, ”DAYS LIVED TODAY 2.1”): RSD:n kanssa samaan päivään mahtuu kaksi. Eletty aika ei liikuta kelloa (KASIKIRJOITUS.md, ”Kaksi kelloa”).

---

## 4. Kartta

<!-- KARTTA ALKAA -->
| # | Kohtaus (kortin otsikko) | Tyyppi | Kortti sanoo | Kello ja paikat (kuvat) | Mitä vie eteenpäin | Kesto | id |
|---|---|---|---|---|---|---|---|
| 1 | *Better safe.* | OSAKORTTI | PART ONE · ”A Monday. One small plan.” | – | Avaa Osan 1 | 0:04 | `part1` |
| 2 | **Monday** – *Oh, hi.* | PÄIVÄ | A MONDAY | 08:51 taukotila (herätys, kahvi, ”oh, hi.”, Eero, lounas) → 16:42 kotimatka → 17:24 koti (paahtoleipä, kissa) → päivän kuitti | **Halu syntyy:** lounas Sannan kanssa. Valhe: ”My job is simple.” **Kissa ja haamu istutetaan:** neljäjalkainen kissa näkyy lapulla sohvan yläpuolella. ”Five gets laughed at.” ”We have a file on drawings.” Punainen kortti YEAR 2 näkyy ensimmäisen kerran. Lappu menee laatikkoon. | 5:34 | `chapter1` |
| 3 | **Tuesday** – *Quick chat?* | PÄIVÄ | A TUESDAY | 16:55 taukotila (”No incidents”, Riitan viesti) → 03:07 koti, yö → 09:00 toimisto, palaveri (keskiviikko!) → 09:12 taukotila | Aito osuma: ”Shorter.” Haamu istutetaan arkistokorttina. Kehut löytyvät myöhässä (muki +1). **Musiikki: Ordinary Evening.** | 3:54 | `chapter2` |
| 4 | *Enhance.* | HETKI | A MEETING, SOME MORNING | 11:56 toimisto | (1) Ekskyysmi tuplaa: zoom yhteen kulmakarvaan | 1:03 | `enhance` |
| 5 | *Rewind.* | HETKI | THAT NIGHT, 23:40 | 23:40 koti | (1) Uusinta muokkaa itseään joka kerta | 1:09 | `rewind` |
| 6 | **Wednesday** – *Could you just…* | PÄIVÄ | A WEDNESDAY, PROBABLY | 10:20 taukotila/avokonttori (oma tunti, kaiutinpuhelin, pyynnöt) → 23:15 koti (Eeron kalvot) → 00:12–00:19 (THURSDAY): varjo nukahtaa, Sannan viesti | Kyllä kaikkeen, ja hinta kasvaa. Valittavissa ensimmäinen ”no in a coat”. **Ihminen vastaa Sannalle ”Fine.”**, ja varjo nukkuu, joten kukaan ei huomaa. | 2:37 | `chapter3` |
| 7 | *Evidence.* | HETKI | ONE ORDINARY MORNING | 10:02 toimisto | (2) **Keskikohta:** ihminen kääntää suurennuslasin Ekskyysmiin | 2:03 | `glass` |
| 8 | *Colleagues.* | HETKI | AFTER LUNCH, SOME DAY | 13:10 taukotila | (3)+(2) Sannan varjo sanoo Ekskyysmille ”oh. hi.” Nyt se tietää, miltä se tuntuu. Patteri-treffit sovitaan. | 1:12 | `colleagues` |
| 9 | *An ordinary evening* | HETKI | AN EVENING AT HOME | 19:05 koti | (3) Ihmissuhde, joka jo toimii: **äiti** soittaa ja nauraa, kun häntä korjataan (turvallinen nauru, YEAR 2:n vastakohta). Tyyni ennen myrskyä. Myöhässä oleva kirja istutetaan. | 1:35 | `evening` |
| 10 | **Thursday** – *Seen.* | PÄIVÄ | A THURSDAY | 17:30 koti (bilehattu, ”Seen.”) → 18:40 → pussi, romahdus, muki hajoaa → kultaliima | **Pohja.** Alkuperä paljastuu, ja työnkuva vaihtuu: ”Stay with you when it happens.” Sannan puhelin oli kuollut. | 3:37 | `chapter4` |
| 11 | *Not now.* | HETKI | AN AFTERNOON | 14:20 toimisto | (2) **Uusi työ koetuksella:** aito torjunta, ”This is the staying part.” Toimii vain torstain jälkeen. | 2:10 | `notnow` |
| 12 | *A quiet drink.* | HETKI | AN EVENING | 18:12 baari → 07:10 koti, THE NEXT MORNING | (1)+(3) Baarissa yksin, Sanna myöhässä. Baaritarina menee perjantaihin. | 4:04 | `bar` |
| 13 | *A little room.* | OSAKORTTI | PART TWO · ”Later. Some things take more than a week.” | – | Aikahyppy viikkoihin | 0:05 | `part2` |
| 14 | *Nothing.* | HETKI | A SUNDAY, LATE AFTERNOON | 16:40 koti | (1) Isku ilman lähettäjää | 1:10 | `nothing` |
| 15 | *A fine.* | HETKI | A SATURDAY, WEEKS LATER | 15:40 kirjasto | (1)+(3) Seitsemän viikon pelko. Kirjastonhoitajan lämpö. Majakka, sivu 212. | 1:49 | `library` |
| 16 | *The form.* | HETKI | A WEEKDAY, 14:10 | 14:10 klinikka → 18:40 koti, ”that evening” | (2) Avun hakeminen. Ekskyysmi löytää itsensä lomakkeesta (”I thought I was bespoke.”). Pussi ja tuoli. | 2:46 | `form` |
| 17 | *Quiet.* | HETKI | THE FIRST MORNING | 07:40 koti → 08:52 taukotila (MONDAY) → 18:20 kotimatka | (2) Helpompi päivä, varjo poissa (*Vacant.*). Kissa valmistuu. ”No. Sorry.” | 1:18 | `quiet` |
| 18 | *Evenings.* | HETKI | THE SAME DAY, 21:00 | 21:00 koti | (2) Osa-aikatyö: ”Not for every sentence.” Sama päivä kuin *#17 Quiet.* | 1:20 | `evenings` |
| 19 | *Night shift.* | HETKI (ei korttia, jatkaa edellistä) | – | 23:50 koti, pimeä | (3) Pimeässä kaikki varjot tekevät saman työn. Ekskyysmi ei ole koskaan jättänyt ovea. | 2:07 | `night` |
| 20 | *Still here.* | OSAKORTTI | PART THREE · ”A Friday. Not necessarily that one.” | – | Avaa Osan 3 | 0:04 | `part3` |
| 21 | **Friday** – *Oh, hi. Again.* | PÄIVÄ | A FRIDAY. NOT NECESSARILY THAT ONE. | 09:41 taukotila → lounas | **Huipennus ja ratkaisu.** Hälytys soi silti, ja pysytään. Sanna kertoo itse (”up till three”), ja **ihminen korjaa keskiviikon ”Fine.” omin sanoin.** ”Lunch.” | 3:25 | `chapter5` |
| 22 | *The group chat* | HETKI | A SUNDAY EVENING | 20:14 koti | Piirustus jaetaan (boss fight). Vanhin arkistokortti päivitetään (”This time I left it up.” / ”…I’ll update the file.”). Hyvä arkisto jätetään raolleen (”Leave it open a crack.”). Muki korjattuna. | 2:31 | `comments` |
| 23 | *The week, itemised.* | EPILOGI (ei korttia) | – | montaasi + koko viikon kuitti | Viikko välähdyksinä musiikkiin, sitten koko viikon kuitti. **Musiikki.** | 2:56 | `epilogue` |
| 24 | *By the radiator.* | HETKI | THE NEXT TUESDAY | 16:50 taukotila | Seuraava tiistai: varjojen tapaaminen. Loppu jää auki. | 1:11 | `radiator` |
<!-- KARTTA LOPPUU -->

Yhteensä noin 49:46: Osa 1 noin 30 min, Osa 2 noin 10,5 min, Osa 3 noin 9 min.

---

## 5. Langat: mikä kytkeytyy mihin

Ennen kuin muutat yhtäkään riviä, katso tästä, mitkä muut rivit langan päässä ovat.

| Lanka | Istutetaan | Käytetään | Lippu |
|---|---|---|---|
| Lounas Sannan kanssa (halu) | #2: onnistuu ikkunassa = 1, sovitaan viestillä = 2, muuten 0 | #2 kuitti; #3 avaus haarautuu kolmeen; #21 ”It’s Friday. No dentist.” (jos 2) | `lunch` |
| ”oh, hi.” -reaktio | #2 (stay/grow/cover/exit) | #2 ulkoversio ja kuitti, #3 takauma, #21 refleksi | `leak` |
| Maanantain ja perjantain ulkoversioriimi | #2 WHAT THE OTHERS SAW, 2 seconds | #21 sama otsikko ja kesto, kuvateksti lattea. **Kasvu ilman sanoja, ei saa rikkoa.** | – |
| Puraisu | #2 Eero (valinta) | #2 kotimatkan anteeksipyyntö, #3 takauma. #10 ”???” asettaa saman lipun (piilevä riski). | `bit` |
| Kyllät ja ei-lanka | #6 kyllät (−1 muki per kyllä), ”no in a coat”, lisätehtävät | #6 HUD-laskuri; #17 ”No. Sorry.”; #21 ”It’s a no in a coat, Eero.” ja Eeron kiitos monisteesta | `yes`, `coatNo`, `handout`, `afterparty` |
| Sannan varjo | #8 | #10 ”With a full stop.”; #19 yövuoro; #21 tuttu varjo (haara); #24 patteri | `metSannaShadow` |
| Työnkuva | #10 uusi työ | #11 ”This is the OLD job…” / ”staying part”; #17 *Vacant.*; #18 *Part-time*; HUD | `jobDone`, `plain`, `evenings` |
| Kissa (= piirustuslanka) | #2 lappu sohvan yläpuolella, neljä jalkaa: ”Five gets laughed at.” + YEAR 2 -kortti, lappu laatikkoon | #17 sama lappu takaisin, viides jalka · #18 lappu seinällä, Ekskyysmi seisoo sen päällä: ”Move over. You’re on the cat.” · #22 jaetaan | `note` (näkyvä lappu), `quietDrawing` (`catStarted` asetetaan, mutta sitä ei vielä lueta) |
| Haamu (piirustus, 7 v) | #2 arkistokortti ”YEAR 2” kissan kohdalla, #3 uudelleen ”Shorter”-hetkellä | #10 ”Since a Tuesday. You were seven.”; #22 tiedosto päivitetään | – |
| Myöhässä oleva kirja | #9 | #15 palautus | – |
| Baaritarina | #12 (umbrella/arms/2011) | #21 | `barStory` |
| Patteri | #8 ”Tuesday. By the radiator.” | #21 ”I checked. Tuesday works.”; #24 | – |
| Muki | #2 alkaa täynnä (5 → pohja 1 → 3) | #3 4 → 1, kehut +1 → loppuu 2 · #6 jatkaa samasta aamusta 2, oma tunti +1, kaiutin −1, lattia 2 · #10 3 → 0, hajoaa ja liimataan · #21 korjattu · #22 korjattu ja hiljainen. Yön yli +1 (ma→ti, ke→to). **Hetkissä ei mukia.** | `mug`, `mugMended` |
| ”Fine.” (tiuskaisu Sannalle) | #6 00:19: ihminen vastaa ”Fine.”, Sanna: ”Oh. Okay!” Varjo nukkuu. Muki merkitsee: −1 ”“Fine.”” | #19 Sannan varjo: ”Someone said ’fine’.” (varjo ei tiedä, että se olimme me) · #21 Sanna: ”Someone says ’fine’ and I’m up till three.” → ihminen korjaa: ”That one was all me.” · ”I never noticed one we gave.” | – |
| Väsymys (Joonas 21.11.) | Muki ≤ 1 tai kohtaus päättää: #3 yö 03:07, #5 Rewind, #6 23:15–00:19 (”I’m not tired. I’m load-bearing.”) | Ekskyysmille raskaat luomet ja silmäpussit sekä mumina päivän sanoista (”…quick chat…”, ”…yes. yes…”). Pelko avaa silmät. Koko pysyy tunteena. | `tiredForce`, `morko.tired` |
| Musiikki | #1 alkuvalikko | #3 Ordinary Evening, #23 epilogi | – |

**Mukin periaate:** muki liikkuu maailmasta, ei valinnoista. Valinta koskee mukiin vain kun se kuluttaa (jokainen kyllä −1, tiuskaisu −1) tai diilissä, jossa vaihtokauppa näkyy. Piiloutuminen ei koske mukiin missään. Testi vartioi tätä.

---

## 6. Löydetyt aukot

**Korjattu versiossa 0.72.0:**
- ~~#18 Evenings ”THE SAME DAY” kirjaston jälkeen.~~ *A fine.* siirtyi kohdan #14 *Nothing.* jälkeen (nyt #15). *Evenings* on taas saman päivän ilta kuin *Quiet.*
- ~~Muki 1 → 4 keskiviikkoaamuna.~~ Tiistai päättyy kehuihin (+1, taso 2), ja keskiviikko jatkaa samasta tasosta. Mukitesti vartioi tätä.
- ~~Keskiviikon kertoja sanoi ”00:12”, mutta leimassa luki 23:15.~~ Kello siirtyy nyt kertojan mukana, ja puolenyön jälkeen leima näyttää THURSDAY. Uusi `tests/clock.test.cjs` tarkistaa koko tarinasta, että jokainen kertojan kellonaika vastaa leimaa.

**Auki:**
1. **Päivä ja hetki alkavat samannäköisellä kortilla.** Ratkaisu on suunta B (kohta 8).
2. **Riitta näkyy ensimmäisen kerran vasta viestinä** kohtauksessa #3. Hänet voisi istuttaa yhdellä rivillä #3:n avaukseen haarojen jälkeen.
3. **KASIKIRJOITUS.md:n rakennetaulukko (0.26) on vanhentunut.** Järjestyksessä tämä kartta on voimassa.

## 7. Hahmot

| Koodi | Hahmo | Kuka |
|---|---|---|
| S | **Ekskyysmi** (pelaaja) | Ihmisen varjo, ylisuojeleva. Työ: ”Keep you from being rejected.” → ”Stay with you when it happens.” |
| H | **Ihminen** | Nimetön. Kuiva ja kärsivällinen. Paahtoleipä, viisijalkainen kissa. |
| A | **Sanna** | Kollega, ”oh, hi.” Lounas, lautapelit, baari. Valvoo itsekin kolmeen. |
| B | **Eero** | Kollega: mukavuusalueneuvot, tee, hissi, pelkää esityksiä. |
| R | **Riitta** | Esihenkilö: ”Quick chat?”, ”Shorter.”, ”Not now.” Yksitoista asiaa listalla. |
| P | Puhelin | Viestit kirjoituspisteineen. **Äiti** (”Mum”) soittaa kohtauksessa #9 (ennen versiota 0.73 ystävä Kaisa). |
| Z / Y / W | Sannan, Eeron ja Riitan varjot | #8, #19, #21, #24 |
| T / L / X | Baarimikko / kirjastonhoitaja / tuntematon | #12 / #15 / satunnaisesti |
| N | Kertoja | Nimetön kursiivi |

**Eivät tarinassa** (Moments-valikossa ensimmäisen päivän jälkeen): *Sometime.*, *One small thing.*, *The reply*, *The voice message*, *Footage.*, *The posting.* **Vain labrassa:** testikloonit (*Lamp gap.*, *The bag.*) ja prototyyppi *A Tuesday, with a mug.* (merirosvohattu, diili, ”mug or door?”).

---

## 8. Päätetty ja auki

**Päätetty 21.11.2026: suunta B.** Peli ei ole kirjaimellisesti yksi viikko. Aika saa kellua, mutta päivät ja hetket erottuvat toisistaan:
- Päivä pitää nykyisen kortin ja viikonpäivän päiväleimassa.
- Hetki saa oman, kevyemmän korttinsa. Päiväleima näyttää hetkessä kellonajan ja kelluvan ajan (esimerkiksi ”AN EVENING AT HOME”).
- **Toteutus odottaa:** hetkikortin ulkoasu ja mahdollinen yhteinen ilmaus (esimerkiksi ”SOMETIME THIS WEEK” Osassa 1, ”LATER” Osassa 2). Ei ”FLASHBACK”, koska hetket eivät ole takaumia.

**Päätetty 21.11.2026** (Joonas antoi päätösvallan, perustelut ovat README.md:n versiossa 0.72.0):
- **Kaupungin nimi:** ei nimeä. Paikat ovat tuttuja ilman nimeäkin (Joonas).
- **Tiuskaisu Sannalle:** tapahtuu aina (Joonas). Toteutettu ”Fine.” -lankana: #6 → #19 → #21.
- **Kahvi vai tee:** ihmisellä kahvi, Eerolla tee. Kahvi ei koskaan täytä mukia, vaan täytöt tulevat ihmisistä, levosta ja kodista.
- **Muki hetkissä:** ei mukia. Muki kuuluu päiviin, joten pelaajan jo oppima sääntö pysyy.
- **Ensimmäinen oikea diili:** tulee päivään, koska diili tarvitsee mukin. Paikka päätetään, kun diili kirjoitetaan.
- **”Mug or door?”:** ihmisen oma keksintö, omin sanoin. Se ei tule vastaanotolta, jottei peli näytä tekniikkaa.

## 9. Muutoksen tarkistuslista

1. Etsi kartasta rivi tai rivit ja kohdan 5 langat, joihin muutos koskee.
2. Jos järjestys muuttuu, päivitä taulukko samassa muutoksessa. Testi vaatii sen.
3. Kun muutos on tehty: `npm test` (sisältää järjestys- ja suojatestit), kulkujälki (kello, päivä ja paikka kuva kuvalta), mukijälki ja `npm run pace`.
4. Päivitä kesto ja ”Mitä vie eteenpäin”, jos ne muuttuvat.
5. Yksi rakennemuutos per versio.

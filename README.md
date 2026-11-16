# Really Small Deal (varjo: Ekskyysmi)

Pieniä hetkiä yhdestä tavallisesta elämästä. Pelaat Ekskyysmiä, ylisuojelevaa varjoa. Komedia torjutuksi tulemisen herkkyydestä (RSD).

**Pelaa selaimessa: https://joonashuhta.github.io/really-small-deal/**

Ei asennusta, ei kirjautumista. Toimii puhelimella vaakasuunnassa ja tietokoneella.

## Pelaa paikallisesti

Avaa **[index.html](index.html)** selaimessa. Prototyyppi 0.28 toimii paikallisesti ilman asennusta tai verkkoyhteyttä. Kieli on edelleen englanti. Vanha `taukohuone.html` ohjaa tähän versioon.

**Pelin ydin (14.11.):** varjo ei opeta eikä anna vinkkejä, se vain yrittää suojella, kuten AwA:n susi. Huumori syntyy mittakaavasta: sisällä katastrofi, ulkona kaksi sekuntia. Vitsit kohdistuvat varjon byrokratiaan, arkistoon, välimerkkeihin, ylisuojeluun ja omaan arvokkuuteen, eivät ihmisen kipuun eikä toisten aitoon julmuuteen. Päämäärä on, että pelaaja nauraa, tunnistaa itsensä ja näkee lopussa suhteen muuttuvan: korjaamisesta pysymiseen.

**Pelin nimi on Really Small Deal** (15.11.2026). Varjon nimi on edelleen Ekskyysmi.

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

00. [Toinen näytös](TOINEN_NAYTOS.md): seuraavan ison työn toteutusohje (16.11.2026). Työtavat koodaavalle agentille: [AGENTS.md](AGENTS.md).
0. [Suunta](SUUNTA.md): mihin peli kasvaa viikon jälkeen, seitsemän painopistettä ja kaksi valmiiksi kirjoitettua kohtausta (15.11.2026).
1. [Seuraavaksi](SEURAAVAKSI.md): työlista tärkeysjärjestyksessä, tutkimuksesta johdetut käsikirjoitusideat, julkaisu ja rahoitus. **Aloita tästä.**
2. [Käsikirjoitus](KASIKIRJOITUS.md): kaari, tasapaino, Ekskyysmin hahmo ja kaksi kelloa.
3. [Outoudet](OUTOUDET.md): ihmisen pienet omat tavat ja missä ne näkyvät.
4. [Pelin konsepti](PELIKONSEPTI.md): alkuperäinen ydin ja sen perustelut.
5. [Android](ANDROID.md) ja [Git](GIT.md): julkaisu puhelimeen ja yhteistyö GitHubissa.
6. [Peli](index.html): versio 0.34, viisi päivää ja yksitoista välihetkeä, läpipeluu noin 38 minuuttia.

Vanhemmat suunnitelmat ([Toteutuksen suunnittelu](TOTEUTUKSEN_SUUNNITTELU.md), [Arvio ja jalostus](ARVIO_JA_JALOSTUS.md), [Tutkimus ja mekaniikat](TUTKIMUS_JA_MEKANIIKAT.md)) säilyvät historiana.

## Taustamateriaali

- [Jatkotutkimus ja nimivertailu](JATKOTUTKIMUS_JA_NIMET.md): uudet tutkimus- ja foorumihavainnot, kolme rajattua tarkennusehdotusta sekä nimien kärkiehdokkaat ja alustava löydettävyyskatsaus.
- [AWA-analyysi](awa-analyysi-ja-huumorin-ydin.md): alkuperäispelin dramaturgia ja pelillinen huumori. Loppuosan vanha velkakirjanpitokonsepti on sivuun jäänyt ehdotus.
- [Alkuperäinen tutkimus- ja niche-kartoitus](konsepti-ja-niche-2026-11-14.md): kokemuksia, kilpailijoita ja kysyntähypoteeseja. Päivystyskonsepti ja sen toteutusehdotukset on korvattu.
- [AWA:n alkuperäiset käsikirjoitukset](research/awa-source): analyysia varten tallennettu lähdeaineisto, ei oman pelin toteutus.

Ristiriitatilanteessa PELIKONSEPTI.md kuvaa nykyistä suuntaa. Uudet mielleyhtymät arvioidaan suhteessa tähän ytimeen; ne eivät yksin muuta hahmoa, maailmaa tai pelimekaniikkaa.

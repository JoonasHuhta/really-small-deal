# Really Small Deal (varjo: Ekskyysmi)

Pieniä hetkiä yhdestä tavallisesta elämästä. Pelaat Ekskyysmiä, ylisuojelevaa varjoa. Komedia torjutuksi tulemisen herkkyydestä (RSD).

**Pelaa selaimessa: https://joonashuhta.github.io/really-small-deal/**

Ei asennusta, ei kirjautumista. Toimii puhelimella vaakasuunnassa ja tietokoneella.

## Pelaa paikallisesti

Avaa **[index.html](index.html)** selaimessa. Prototyyppi 0.18 toimii paikallisesti ilman asennusta tai verkkoyhteyttä. Kieli on edelleen englanti. Vanha `taukohuone.html` ohjaa tähän versioon.

**Pelin ydin (14.11.):** varjo ei opeta eikä anna vinkkejä, se vain yrittää suojella, kuten AwA:n susi. Huumori syntyy mittakaavasta: sisällä katastrofi, ulkona kaksi sekuntia. Vitsit kohdistuvat varjon byrokratiaan, arkistoon, välimerkkeihin, ylisuojeluun ja omaan arvokkuuteen, eivät ihmisen kipuun eikä toisten aitoon julmuuteen. Päämäärä on, että pelaaja nauraa, tunnistaa itsensä ja näkee lopussa suhteen muuttuvan: korjaamisesta pysymiseen.

**Pelin nimi on Really Small Deal** (15.11.2026). Varjon nimi on edelleen Ekskyysmi.

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

1. [Pelin konsepti](PELIKONSEPTI.md) — ensisijainen suunnittelupohja: hahmot, maailman säännöt, huumori, perustelut ja avoimet päätökset.
2. [Toteutuksen suunnittelu](TOTEUTUKSEN_SUUNNITTELU.md) — seuraavien kokeiden rajaus ja toteutustapojen alustava vertailu. Sisältää ehdotuksia, ei lukittua toteutussuunnitelmaa.

3. [Arvio ja jalostus](ARVIO_JA_JALOSTUS.md) — ulkopuolinen arvio konseptista ja ehdotus pelaajan teoksi. Ei hyväksytty päätös.
4. [Ekskyysmi-prototyyppi](index.html) — versio 0.9: noin 25 minuutin selainpeli, viisi päivää. Varjo puhuu, pelaaja valitsee sen repliikit ja kokeilee varoituksen fyysistä kokoa. Kohtaukset: aamubriiffi, mukavuusalueneuvo, ”oh, hi”, ulkopuolinen näkökulma, hetkeä myöhemmin ja kotimatka. Ei vielä testattu pelaajilla.

## Taustamateriaali

- [Jatkotutkimus ja nimivertailu](JATKOTUTKIMUS_JA_NIMET.md): uudet tutkimus- ja foorumihavainnot, kolme rajattua tarkennusehdotusta sekä nimien kärkiehdokkaat ja alustava löydettävyyskatsaus.
- [AWA-analyysi](awa-analyysi-ja-huumorin-ydin.md): alkuperäispelin dramaturgia ja pelillinen huumori. Loppuosan vanha velkakirjanpitokonsepti on sivuun jäänyt ehdotus.
- [Alkuperäinen tutkimus- ja niche-kartoitus](konsepti-ja-niche-2026-11-14.md): kokemuksia, kilpailijoita ja kysyntähypoteeseja. Päivystyskonsepti ja sen toteutusehdotukset on korvattu.
- [AWA:n alkuperäiset käsikirjoitukset](research/awa-source): analyysia varten tallennettu lähdeaineisto, ei oman pelin toteutus.

Ristiriitatilanteessa PELIKONSEPTI.md kuvaa nykyistä suuntaa. Uudet mielleyhtymät arvioidaan suhteessa tähän ytimeen; ne eivät yksin muuta hahmoa, maailmaa tai pelimekaniikkaa.

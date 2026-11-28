# Pelikokemus 28.11.2026 (versio 0.99.54)

Joonaksen pyyntö 28.11.: koodi on punnittu ja testattu, nyt pelikokemus. Kolme kierrosta: ensimmäiset viisi minuuttia, tunnekartta koko läpipeluusta sekä emotionaalinen turvallisuus, betatestaajan ohje ja kauppakuvaus. ”Mieti mikä näistä on oleellista tehdä ja edetään sinun visiosi mukaan.”

**Miten tein**
- **Ensimmäiset minuutit** pelasin niin kuin pelaaja ne kokee: nimiruutu, New game, osakortti, alku ja maanantai. Katsoin ne kuvina pöytäkoneella (1280 × 800) ja puhelimella (844 × 390) ja tein aikajanan lukutahdilla (230 sanaa/min + 0,6 s riviltä, valinta 4 s). Ohjeen mukaan en avannut TARINAKARTTA.md:tä, EKSKYYSMI.md:tä enkä VISIO.md:tä. Tunnen pelin koodista, joten en ole aidosti ensikertalainen; siksi pidin kiinni siitä, mitä ruudulla näkyy, ja merkitsin jokaiseen havaintoon ajan.
- **Tunnekartan** pohjana on koko tarinan transkripti reitillä `--pick 0` (maanantai B, 1 365 riviä) sekä kohtauskohtainen mittaus: kesto, hiljaisuuden osuus, soiko musiikki ja mitä pelaaja tekee.
- **Valinnat:** kokeilin jokaisen vaihtoehdon jokaisessa valintakohdassa kaikilla kolmella maanantailla ja yhdellä sekareitillä. Valintakohtia on 49 ja vaihtoehtojen kokeiluja 576. Lisäksi pelasin vastausikkunan oikein kaikilla kolmella maanantailla: lounas järjestyy, eikä uusia valintoja tule.
- **Aikaleimat** ovat lukutahtimallin arvioita, eivät mittaus oikeasta pelaajasta. Oikea pelaaja on hitaampi tai nopeampi, mutta järjestys ja välit pitävät.

**Lyhyesti**
1. **Ensimmäinen minuutti rakentaa väärän mallin, ja se korjataan nopeasti.** Pelaaja näkee ensin ihmisen, ihmisen suunnitelman ja HUD-rivin ”Keep you from being rejected.” Vasta 1:02 paneeli sanoo ”You’re Ekskyysmi. Pick what I say.” Hetken samassa ruudussa on kaksi eri ”you”:ta.
2. **Nimiruutu lupaa tunnelman mutta ei roolia, huumoria eikä tekemistä.** Taglinen lupaus lunastuu kirjaimellisesti 2:52, kun pelaaja itse venyttää varjon pitkäksi.
3. **Ensimmäinen nauru noin 1:55, ensimmäinen tunne 2:14.** ”He doesn’t HAVE a coffee. He’s drinking TEA.” ja sitten ”oh, hi.” sekä vastausikkuna, joka on tehty mahdottomaksi. Ikkuna on pelin vahvin hetki ja samalla toiseksi todennäköisin lopettamiskohta.
4. **Tunnekaari on ehjä.** Torstai on kivun huippu, perjantai ja kommentit ratkaisun huippu, ja loppu laskeutuu turvallisesti. Rytmin riskit ovat toistuva ”suurenna ja tulkitse väärin” -vitsi osassa 1, neljä peräkkäistä tasaista kohtausta osassa 2 ja kolme ”tämä oli loppu” -hetkeä ennen patteria.
5. **Mitään ei rangaista.** Yksikään vaihtoehto 49 valintakohdassa ei johda huonompaan loppuun. Lähimpänä ovat torstain huuto (pelaaja on se, jota huudetaan) ja maanantain rohkea valinta, joka ei muuta maanantaita. Sisältövaroitus kannattaa nostaa Aboutista ensimmäiselle kortille yhdellä lauseella pelin omalla äänellä.

---

## 1. Ensimmäiset viisi minuuttia

### Aikajana (maanantai A, lukutahdilla)

| Aika | Mitä pelaaja näkee ja tekee |
|---|---|
| ennen | Nimiruutu: logo (suurennuslasi, jossa on silmät), *Really Small Deal.*, *A small moment. A very long shadow.* Kuvassa pieni ihminen seisoo avoimen oven valokiilassa muki kädessä, ja takana on kohtuuttoman iso, huolestunut varjo. Nappi *New game →*, linkit Settings, Full screen ja About. Nimiruudun kappale soi. |
| 0:00 | Kortti *PART ONE – Better safe.* ja *A Monday. One small plan.* Kortti odottaa klikkausta (*Begin part one*). Musiikki loppuu, ja koko maanantai on ilman musiikkia. |
| 0:01–0:18 | Lähes sanaton alku: ”Nobody here yet.”, ihminen tulee, kahvinkeitin tippuu, ”(mug handle on the wrong side.)”, ”(better.)”, siemaus, hymy. Varjo nukkuu lattialla pienenä. Paneelissa on nappi *Skip intro →*. |
| 0:18 | H: ”Today I’m going to ask Sanna to lunch.” HUDiin tulee *A SMALL PLAN – Ask Sanna to lunch.* |
| 0:23 | Varjo herää säpsähtäen: ”…Sorry. WHAT are we doing today?” |
| 0:32 | ”Ekskyysmi. Informal head of keeping things from getting awkward. Reporting for duty.” |
| 0:43 | ”My job is simple. Keep you from being rejected. By anyone. Ever.” HUDiin tulee *EKSKYYSMI’S JOB – Keep you from being rejected.* |
| 0:50 | Muki ilmestyy oikeaan yläkulmaan: ”The mug is how much of you there is today. It starts full.” |
| 0:58 | H: ”Suggest something. I’ll decide.” S: ”You usually do. It’s a flaw in the system.” |
| 1:02 | Ensimmäinen valinta. Paneelissa: EKSKYYSMI, ”You’re Ekskyysmi. Pick what I say.” |
| 1:17–1:57 | Eero ja mukavuusalue (muki −1), toinen valinta, ”You too.” teetä juovalle. |
| 2:00 | Ensimmäinen ulkoversio: WHAT THE OTHERS SAW, 4 sekuntia. Varjoa ei näy. |
| 2:14 | Sanna: ”oh, hi.” Punainen RESPOND. CORRECTLY. NOW. ja ikkuna, jossa pitää painaa viisi näppäintä oikeassa järjestyksessä 2,8 sekunnissa (kosketusnäytöllä 3,1 s, napit sekaisin). Muki −2, arkisto aukeaa. |
| 2:33 | Kolmas valinta: mitä ”oh” tarkoitti. |
| 2:52 | Koko-liukusäädin: pelaaja venyttää varoituksen itse. |
| 3:13–3:24 | Neljäs valinta (*Recommendation.*), pito *Become furniture*, ulkoversio. |
| 3:30–3:47 | Sanna ja Eero lähtevät lounaalle ilman ihmistä. |
| 3:50–5:25 | Toimisto häivytetään, ja purku käydään kotimatkalla: kalvot, viesti (A: ”Missed you at lunch!… Tomorrow?”), kaksi valintaa, kertaus ”Exhibit A… restored… director’s cut” ja ulkoversio THE ORIGINAL TAPE. |
| 5:28–5:49 | Koti, paahtoleipä ja kissan piirros: ”Five gets laughed at.” – ”…Drawer. For now.” |
| noin 5:55 | *End of Monday*, päivän kuitti ja *On to Tuesday →*. |

Kahvihuone on näyttämönä noin 3:50 asti, loput kotimatkalla ja kotona.

### 1. Lupaus

Nimiruutu lupaa tunnelman: pieni ihminen, kohtuuttoman iso varjo, lämmin valo ja rauhallinen kirjasintyyli. Nimi *Really Small Deal* on vitsi, mutta tagline ja kuva ovat haikeita. Ensisilmäys lupaa siis enemmän surumielistä kertomusta kuin komediaa.

30 sekunnissa pelaaja ymmärtää, että peli kertoo ihmisestä ja hänen varjostaan ja että varjo on hahmo, koska sillä on silmät. Hän ei ymmärrä kolmea asiaa:
- että hän pelaa varjoa
- että peli on hauska
- mitä häneltä odotetaan (valintoja, noin tunti)

Kaikki kolme lukevat About-sivulla ja jaetun linkin esikatselussa (”You play the overprotective shadow of someone who just heard ’oh, hi.’ A funny game about taking small things very, very seriously.”), mutta eivät nimiruudussa.

*A small moment. A very long shadow.* ei ole liian kryptinen. Se on tarkka, ja sen merkitys aukeaa itsestään: ”oh, hi” 2:14 on pieni hetki, ja 2:52 pelaaja vetää varjon itse pitkäksi. Se lupaa kuitenkin tunnelmaa eikä peliä. Se ei kerro, kenen silmin katsotaan, eikä että tässä nauretaan. Kauppasivun kautta tuleva pelaaja saa nämä kuvauksesta; suoraan linkistä tai puhelimelta tuleva saa ne vasta pelatessaan.

New gamen jälkeen tulee toinen lupaus, kortti *Better safe. A Monday. One small plan.* Se lupaa jaksoittaista, rauhallista kertomusta, ja 18 sekunnin lähes sanaton alku vahvistaa sitä: tässä katsotaan tavallista aamua.

### 2. Rooli

Pelaaja näkee ensin ihmisen. Ihminen tulee ruutuun, keittää kahvin, korjaa mukin kahvan ja sanoo suunnitelmansa, ja HUD kirjoittaa sen pelaajalle: *A SMALL PLAN – Ask Sanna to lunch.* Kaikki tämä rakentaa mallin ”minä olen tämä ihminen”.

Varjo herää 0:23, esittäytyy 0:32 ja kertoo työnsä 0:43. HUD kirjoittaa senkin: *EKSKYYSMI’S JOB – Keep you from being rejected.* HUDin ”you” tarkoittaa ihmistä, mutta pelaaja lukee sen itseensä. Väärä malli siis vahvistuu juuri ennen kuin se korjataan.

Korjaus tulee 1:02: paneelin puhuja on EKSKYYSMI ja teksti *You’re Ekskyysmi. Pick what I say.* Rooli selviää siis minuutissa eikä kolmessa, eikä väärä malli ehdi kovettua. Hetken samassa ruudussa on kuitenkin kaksi eri ”you”:ta: HUDin ”you” on ihminen ja paneelin ”You’re” on pelaaja. Tarkka lukija pysähtyy siihen.

Pöytäkoneen ikkunatilassa otsikkorivillä lukee THE INSIDE VERSION, mikä auttaa. Puhelimella otsikkoriviä ei ole. Malli asettuu toisessa valinnassa 1:36, jossa vaihtoehdot ovat selvästi Ekskyysmin omia (”Ask where HIS comfort zone is. For later.”) ja kun pelaaja valitsee ensimmäisen, ihminen kieltäytyy (”I’m not telling him about the supermarket.”). Ensimmäinen ulkoversio 2:00 sinetöi sen: muiden silmissä varjoa ei ole.

### 3. Ensimmäinen valinta

1:02, kolme vaihtoehtoa: *Rehearse the sentence. Forty times.*, *Locate the exits.* ja *Schedule a meeting about whether to ask.*

Se opettaa valintojen logiikan ilman ohjetta, koska juuri ennen sitä ihminen sanoo säännön ääneen: ”Suggest something. I’ll decide.” Valittu rivi kuuluu Ekskyysmin kuplana, ja ihminen vastaa siihen: sanoo lauseen ääneen, ei mene pesualtaan alle, ei perusta alivaliokuntaa. Pelaaja näkee heti, että valinta on ehdotus, jonka ihminen ottaa tai jättää.

Kaikki kolme vaihtoehtoa ovat välttelyä tai ylivalmistelua. Se opettaa toisenkin asian: Ekskyysmillä on vain suojelevia työkaluja, ja vitsi on itse valikossa. Rohkea vaihtoehto (”…Say ’hi’ back. I’ll stay right here.”) tulee ensimmäisen kerran neljännessä valinnassa 3:13, ja sielläkin viimeisenä.

Pöytäkoneella alareunassa lukee lisäksi ”every choice keeps the story moving”. Puhelimella tätä riviä ei näy.

### 4. Ensimmäinen nauru

Hymyjä tulee heti ensimmäisistä repliikeistä:
- 0:26 ”It was going so well. Coffee. Warm light. No people. We are exceptionally good at mornings.”
- 0:36 ”You don’t have to introduce yourself every morning. You live on my wall.”
- 0:48 ”Coffee. I’ll handle the catastrophes.”

Lähes sanattomassa alussa on yksi pieni hymy, mukin kahva.

Todennäköisin ääneen naurettu kohta on 1:52–1:57. Eero toivottaa ”Enjoy the coffee!”, ihminen vastaa ”You too.”, ja Ekskyysmi: ”He doesn’t HAVE a coffee. He’s drinking TEA.” – ”I didn’t do that one. That was all you.” Kömmähdys on kaikille tuttu, ja vitsi kääntyy: tällä kertaa kömpelö oli ihminen. Vähän ennen sitä 1:26 ”We haven’t SEEN the comfort zone since 2016.” naurattaa niitä, jotka ovat saaneet saman neuvon.

Se on tarpeeksi aikaisin kertomuspelille: hymy alle kymmenessä sekunnissa ensimmäisestä repliikistä ja nauru ennen kahta minuuttia.

### 5. Ensimmäinen tunne

2:14 ”oh, hi.” Ääni, tärähdys, punainen RESPOND. CORRECTLY. NOW. ja ikkuna, joka on tehty mahdottomaksi. Näppäimistöllä etenevä pelaaja on kaksi minuuttia painanut välilyöntiä tai Enteriä, kuten sivun alalaita neuvoo. Nyt Enter on väärä vastaus ja välilyönti vasta viides askel, joten tottumuksesta painettu näppäin hylätään heti. Puhelimella napit ovat eri järjestyksessä kuin ikkunan ohje.

Tunne on säikähdys ja hätä, ja heti perään myötähäpeä: arkisto aukeaa (2011 vilkutus ihmiselle, joka vilkutti jollekulle toiselle, 2016 ”you too” tarjoilijalle). Pelaaja ei katso ihmisen jäätymistä vaan jäätyy itse. RSD:tä tunteville tämä on tunnistamisen hetki.

Toinen tunne tulee 3:36, kun Sanna ja Eero lähtevät lounaalle: pettymys ja ulkopuolisuus.
- **A:** ”Okay! We’re off to lunch. See you!”
- **B:** ”Hey, I was going to— …never mind.”
- **C:** ”Lunch? No need to ask the others, right?”, eli aito torjunta.

### 6. Muki

Muki ilmestyy 0:50, ja kertoja selittää sen heti: ”The mug is how much of you there is today. It starts full.” Ensimmäinen muutos 1:24 tulee syyn kanssa (−1 *comfort-zone advice*), samoin toinen 2:19 (−2 *”oh, hi.”*). Pelaaja ymmärtää, mitä muki mittaa, koska se sanotaan ja jokaisella muutoksella on syy. Moni tunnistaa siitä ”sosiaalisen akun”.

Hän ei ymmärrä, mitä mukilla tehdään, koska maanantaina ei tehdä mitään. Muki on mittari, jota katsotaan, ei resurssi, jota hoidetaan. Ensimmäinen päätös, joka riippuu mukista, tulee perjantaina noin 50 minuutin päästä. Lisäksi HUDiin ilmestyy kolme asiaa 30 sekunnin sisällä (suunnitelma 0:20, työ 0:47, muki 0:50), ja vastausikkunan, liukusäätimen ja pidon aikana muki jää huomion ulkopuolelle.

### 7. Poistumiskynnys

Kolme kohtaa, todennäköisimmästä alkaen:

1. **Purku 3:56–5:15 ja päivän loppu noin 5:55.**
   - Aamun kysymys, eli pyytääkö ihminen Sannan lounaalle, ratkeaa 3:36. Sen jälkeen tulee puolitoista minuuttia käsittelyä, ja siitä 40 sekuntia on samaa vitsiä neljänä versiona (”Exhibit A… restored… enhanced… director’s cut”).
   - Kertausta ei voi välttää. Jos pelaaja valitsee *We can walk while I’m still worried* tai *Bring up the comfort zone thing*, Ekskyysmi sanoo ”Wait. Before the door.”, ihminen sanoo ”No.”, ja kertaus tulee silti.
   - Pelaaja, joka ei ole vielä kiintynyt, ajattelee tässä ”ymmärsin jo”. Heti perään tulee luonteva taukopaikka: maanantain kuitti ja *On to Tuesday →*. Se on hyvä lopetuskohta, mutta myös todennäköisin paikka, jossa ensimmäinen pelikerta loppuu eikä jatku.
2. **Vastausikkuna 2:15.** Pelaaja ei tiedä, että ikkuna on tahallaan epäreilu, koska se lukee vain Aboutissa. Joku luulee tehneensä virheen, joku luulee peliä rikki, joku kokee tulleensa huijatuksi. Seuraava repliikki kehystää sen heti (”Okay. We missed the window. Nobody panic.”), ja useimmille se on pelin muistettavin hetki. Pelaajalle, joka ei pelaa paljon, se on ensimmäinen epäonnistuminen ilman varoitusta.
3. **Lukeminen ennen tekemistä 0:00–1:02.** Kortin klikkaus, 18 sekuntia lähes sanatonta alkua ja 16 repliikkiä ennen ensimmäistä valintaa. Pöytäkoneen ikkunatilassa oikea paneeli on tyhjä, kun repliikki on kuplassa, ja Continue on alhaalla oikealla. Puhelimella jokainen repliikki näkyy kahdesti, kuplassa ja alapalkissa, joten luettavaa on tuplasti. *Skip intro →* houkuttelee ohittamaan juuri sen tavallisen aamun, jota vasten maanantai mitataan.

Kysymys 7 kysyy myös, mitä voi tehdä. Ohje käski olla ehdottamatta muutoksia tässä osiossa, joten ehdotukset ovat erikseen kohdassa 6.

### 8. Vertailu

| Peli | Mitä pelaaja odottaa | Täyttyykö vai rikkoutuuko |
|---|---|---|
| **Celeste** | Varjominä (Badeline) on ensin vastustaja ja lopuksi liittolainen. Vaikeaa mutta reilua haastetta. | **Teema täyttyy ja kääntyy:** tässä pelataan varjoa, ja peli alkaa siitä, mihin Celeste päättyy (varjo saa jäädä). **Haaste rikkoutuu:** ainoa ajastettu kohta on tahallaan epäreilu, mikä on Celesten reiluuden vastakohta. |
| **Omori** | Synkkä käänne, syyllisyys, kauhu, salaisuus. | **Rikkoutuu tarkoituksella.** Käännettä ei tule, mikään ei ole salaisuus, eikä peli rankaise. Omorin pelaaja odottaa torstaina ”nyt se tulee” ja saa myötätuntoa. Osalle se on helpotus, osalle liian pehmeää. |
| **Gris** | Vähän sanoja, kuvaa ja musiikkia, suru ilman selitystä. | **Rikkoutuu.** Sanoja on noin 7 500 ja repliikki tulee noin kolmen sekunnin välein. Grisiä muistuttavat vain lähes sanaton alku, lumiuni ja epilogin montaasi. |
| **Night in the Woods** | Paljon hauskaa dialogia, haikeutta, mielenterveyttä arjen keskellä, ystäviä. | **Lähinnä täyttyy.** Huumorin ja haikeuden sävy on sama. Ero on mittakaava: yksi ihminen, toimisto, viikko, ei kaupunkia eikä tutkittavaa. NITW:n pelaaja on todennäköisin kohdeyleisö. |

Lähin lajitoveri listan ulkopuolelta on *Adventures with Anxiety!*, jossa myös pelataan ahdistusta eikä ihmistä. Sen pelannut ymmärtää roolin heti.

---

## 2. Tunnekartta koko läpipeluusta (`--pick 0`, maanantai B)

**Lukuohje.** Intensiteetti (1–5) on arvioni pelaajalle, joka tunnistaa aiheen itsestään. Muille kipeät kohdat ovat noin pykälän matalampia ja hauskat samat. Hiljaisuus on se osuus kohtauksen kestosta, jona ei lueta repliikkiä (tauot, ulkoversiot, pidot). **Huokaus** merkitsee hengähdyshetkeä.

| # | Kohtaus | Kesto | Tunne | Int. | Muutos | Huomiot |
|---|---|---|---|---|---|---|
| — | Kortti PART ONE | | | | | |
| 1 | Ma *Oh, hi.* | 5:41 | huvitus → säikähdys → myötähäpeä → pettymys → lämpö | 4 | iso kaari | Tihein mekaniikka: 6 valintaa, ikkuna, liukusäädin, pito, 3 ulkoversiota. **Huokaus** lopussa: kotimatka, paahtoleipä, kissa. Hiljaisuus 19 %. |
| 2 | Ti *Quick chat?* | 1:15 | huvittunut ennakkokauhu (”We’re being fired. Efficiently.”) | 2 | tasainen | Ensimmäinen musiikki (Ordinary Evening). |
| 3 | *enhance* | 1:05 | absurdi nauru | 2 | jännite purkautuu nälkään | Sama rakenne kuin maanantain kertaus: suurenna, tulkitse väärin, viaton syy. |
| 4 | *rewind* | 1:14 | öinen märehtiminen, levottomuus | 3 | hiljenee: ”I don’t remember the exact face anymore.” | Hiljaisuus 33 %. |
| 5 | Ke *Could you just…* | 5:33 | kasautuva paine: 03:07-lista, ”shorter”, lukitut ei:t, väsymys, kiukku itseen | 4 | nousee, loppu pahaenteinen (”Nothing gets filed.”) | Rivejä eniten (116), hiljaisuutta 8 %. Hengähdykset ovat nitoja ja Ekskyysmin pelastama sähköposti. Ordinary Evening soi 03:07:stä nitojaan asti. |
| 6 | *glass* | 2:03 | leikkisä vainoharha → helpotus (kissavideo) → hellyys (”You look smaller.”) | 2 | purkautuu | Neljäs ”suurenna ja tulkitse väärin”. |
| 7 | *colleagues* | 1:12 | ujo lämpö (Sannan varjo) | 2 | hälytys → yhteys | Istuttaa patterilangan. |
| 8 | *evening* | 1:44 | kotoisa tyyneys, äidin puhelu | 1 | tasainen, yksi pisto (”Hnngh.”) | **Huokaus.** Pelin rauhallisin kohta ennen huippua. |
| 9 | To *Seen.* | 3:38 | odotuksen ahdistus → räjähdys → suru ja myötätunto → helpotus | 5 | suurin kaari | Pelaajaa (Ekskyysmiä) huudetaan. **Huokaus** kohtauksen sisällä: pito ”stay”, kultainen muki, ”Phone died!!”. |
| 10 | *notnow* | 2:12 | aito pisto → hyväksyntä, keveys | 3 | ”A bit stung. And fine.” | Ensimmäinen todellinen torjunta huipun jälkeen, harjoituksena. |
| 11 | *bar* | 4:11 | näkymättömyys → rauha (”Nobody is looking at us. … I always thought that was the bad outcome.”) → ilo → jälkipyörittely (”Nice is still a lot.”) | 3 | kyllä | **Huokaus:** sateenvarjodrinkki. Pitkä, viisi valintaa. |
| — | Kortti PART TWO | | | | | |
| 12 | *nothing* | 1:10 | tyhjyys ilman syytä, hiljainen suru → päätös | 4 | istuminen, toivo | Osa 2 alkaa raskaimmalla kohtauksellaan. Hiljaisuus 32 %. |
| 13 | *library* | 1:58 | helpotus, lämmin huvitus, riemun ylilyönti | 2 | kauhu purkautuu | **Huokaus.** |
| 14 | *santa* | 1:17 | jännitys → liikutus (”I’ve been cold since September.”) | 3 | kyllä | |
| 15 | *form* | 2:47 | haavoittuvuus ja toivo | 3 | kiertely → rehellisyys → helpotus | Puhutuin kohtaus (hiljaisuus 7 %). ”A long year.” on vahva. |
| 16 | *snow* | 2:00 | ihmetys, kauneus (”Nobody told me I had a colour.”) | 2 | hiljainen nousu | **Huokaus.** Uni ilman musiikkia. |
| 17 | *quiet* | 1:21 | tyyneys ja outo poissaolo | 2 | tasainen | Hiljaisin kohtaus (35 %), Quiet Arpeggios. **Huokaus.** |
| 18 | *evenings* | 1:09 | jälleennäkemisen lämpö | 2 | tasainen | **Huokaus.** |
| 19 | *posting* | 0:52 | haikea välttely, kuiva huumori | 2 | tasainen | |
| 20 | *night* | 2:23 | yksinäisyys → kuuluminen → liikutus (”I’ll watch your door too.”) | 4 | kyllä | Osan 2 huippu, myönteinen. |
| — | Kortti PART THREE | | | | | |
| 21 | Pe *Oh, hi. Again.* | 4:21 | jännitys → rohkeus → läheisyys → anteeksianto → pieni voitto | 4 | kyllä | Tarinan ratkaisu. Toistaa maanantain rakenteen tahallaan. Luonteva loppukuva: ”Two colleagues going to lunch.” |
| 22 | *comments* | 2:33 | pelko → sekava (seitsemän kivaa, yksi mielipide väreistä) → hellyys (nimetön laatikko) | 4 | kyllä | Ekskyysmin oman kaaren huippu: piirros, josta kaikki alkoi. Päättyy ”That was the week.” |
| 23 | Epilogi | 2:56 | nostalgia, kiitollisuus | 3 | nousee musiikin mukana | **Huokaus** (ei tekemistä). Lopputekstit: ”thank you for coming.” |
| 24 | *radiator* | 1:30 | hermostunut huvitus → hiljainen ilo → sulkeutuminen | 3 | kyllä | Tekstien jälkeen. Viimeinen tunne. |

Läpipeluu kestää lukutahdilla 56:18.

### Rytmiongelmat

1. **Sama tunne samalla tasolla peräkkäin**
   - **Snow → quiet → evenings → posting** (2, 2, 2, 2, yhteensä noin 5:20) on pelin pisin tasainen jakso. Kaikki neljä ovat lempeitä ja hyviä, mutta mikään kysymys ei vedä eteenpäin ennen yötä. Tämä on osan 2 suurin riski.
   - **Glass → colleagues → evening** (2, 2, 1, noin 5 min) keskiviikon jälkeen on tarkoituksellinen laakso ennen torstaita, mutta pitkä.
   - **Sama mekanismi toistuu useammin kuin sama tunne.** ”Suurenna, tulkitse väärin, viaton syy” on osassa 1 neljästi noin 15 peliminuutin sisällä: maanantain kertaus, enhance, rewind ja glass. Enhance ja glass ovat sävyltäänkin samat (2, vitsi purkautuu viattomaan syyhyn: nälkä, kissavideo).
2. **Huippu ilman laskua? Ei.** Torstai (5) laskeutuu kohtauksen sisällä: tunnustus, pito, jonka aikana kello kulkee neljä minuuttia, kultainen muki ja ”Phone died!!”. Seuraava kohtaus alkaa tosin heti uudella pistolla (”Not now.”), mutta se on kirjoitettu harjoitukseksi eikä uudeksi iskuksi. Maanantain isku (4) laskeutuu kotiin ja kissaan, ja *nothing* (4) kirjastoon.
3. **Antikliimaksi? Ei**, vaikka kivun huippuun ei enää palata, ja se on oikein. Huippu vaihtaa lajia: torstai on kivun huippu, perjantai ratkaisun ja kommentit Ekskyysmin oman haavan huippu (kumpikin 4). Riski on toisaalla, **liian monessa lopussa**:
   - Perjantain viimeinen ulkoversio (”Two colleagues going to lunch.”) on täydellinen loppukuva.
   - Sen jälkeen tulee vielä seitsemän minuuttia, ja niissä kolme ”tämä oli tässä” -signaalia: ”That was the week.”, lopputekstit ja ”thank you for coming.” Vasta sitten tulee patteri.
   - Pelaaja, joka sulkee pelin lopputekstien aikana, ei näe patteria eikä tee lintua.

### Hiljaisuuden kartta

- **Musiikki on poikkeus, hiljaisuus sääntö.** Musiikkia soi noin 9,5 minuuttia 56 minuutista:
  - nimiruutu
  - tiistai ja keskiviikon alku (Ordinary Evening, noin 4 min)
  - *Quiet.* ja *Evenings.* (Quiet Arpeggios, noin 2,5 min)
  - epilogi (noin 3 min)

  Kaikki muu on ääniefektejä ja puhepiippauksia. Siksi musiikki merkitsee aina jotain, ja pitkät jaksot (maanantai, torstai, baari, perjantai) nojaavat kokonaan tekstin rytmiin.
- **Hiljaisimmat kohtaukset** (tauot, ulkoversiot, pidot): *quiet* 35 %, *rewind* 33 %, *nothing* 32 %, *comments* 25 % ja *santa* 22 %. **Puhutuimmat:** *form* 7 %, keskiviikko 8 %, perjantai 9 % ja *glass* 10 %.
- **Sijoittelu on enimmäkseen oikea:** hiljainen seuraa äänekästä (enhance → rewind, baari → nothing, form → snow). Poikkeus on keskiviikko: lähes viisi ja puoli minuuttia, hiljaisuutta vain 8 %, ja heti perään tulee puhuttu glass (10 %). Torstain tärkein hiljaisuus on pito ”stay”, ja se on oikeassa paikassa heti huudon jälkeen.
- **Osa 2 on pelin ilmavin.** Siinä ovat kaksi hiljaisinta kohtausta ja Quiet Arpeggios. Se ei ole liian puhuttu; sen riski on tasaisuus. Poikkeuksia ovat *form* (pelin puhutuin) ja *night* (55 riviä).

### Viimeinen tunne

Patterilla pelaaja hymyilee hermostuneelle Ekskyysmille (”I’ve prepared three topics and a fallback weather.”, ”I like your edges.” – ”…I like your radiator.”), tekee itse linnun pitämällä, eikä kukaan naura. Viimeiset rivit ovat ”It was a Tuesday, you know. The drawing.” – ”I know.” – ”Now it’s also the radiator.” Tunne on hiljainen ilo ja pieni pala kurkussa: vanha haava saa uuden muiston päälleen. Sen jälkeen loppuruutu: *Still here. Both of you.*, työnkuva yliviivattuna (*Keep you from being rejected.* → *Stay with you when it happens.*) ja ”For the record, I intend to go off again on Monday.”

**Se on oikea tunne tälle pelille:** pieni, lämmin ja rehellinen. RSD ei katoa, mutta joku jää. Tarina tuntuu kokonaiselta, koska alkuhaava (piirros, tiistai) suljetaan samassa kohtauksessa. Kaipaamaan voi jäädä kahta asiaa:
- ihmisen omaa viimeistä hetkeä, koska patteri on Ekskyysmin kohtaus ja ihmisen kaari päättyy perjantaina
- itse patteria, jos pelaaja sulkee pelin lopputekstien aikana

---

## 3. Emotionaalinen turvallisuus

### Kohtaukset, jotka voivat osua

| Kohtaus | Mikä voi osua | Laskeutuminen |
|---|---|---|
| Ma ”oh, hi.” 2:14 | Äkillinen aikapaine, pakotettu epäonnistuminen, vanhat nolot muistot | Purku vitseillä, illan viesti (A, B), kotiin ja kissaan |
| Ma C 3:30 (arvotaan joka kolmannelle) | Aito ulossulkeminen: ”No need to ask the others, right?” | Ekskyysmi on rehellinen (”I’m not doing a bit.”), ihminen soittaa ystävälle, päivän loppu ”Today hurt. Their choice to leave you out was theirs.” |
| *rewind* | Öinen märehtiminen, muisto vääristyy | Pehmeä loppu, uni |
| Ke | Kritiikki kehujen keskellä (”shorter”), lätäkkö, ei:tä ei voi sanoa, ”Fine.” | Nitoja ja sähköpostin pelastus. Seuraava kohtaus purkaa (kissavideo). |
| *glass* | Nauru loppuu, kun astut huoneeseen | Kissavideo |
| To | Viesti nähty eikä vastausta, ihminen huutaa, lapsuuden nolaus (piirros, seitsemänvuotiaana) | Tunnustus, pito, kultainen muki, ”Phone died!!” |
| *notnow* | Riitan tyly ”Not now.” palaverissa | ”A bit stung. And fine.” ja jongleerauspallot |
| *bar* | Näkymättömyys ja jälkipyörittely | Sanna nauroi; ”Nice is still a lot.” |
| *nothing* | Alakulo ilman syytä | Vierellä istuminen, päätös soittaa |
| *form* | Kysymykset, jotka voi lukea itseensä; ”A long year.” | Pussi ja tuoli: ”It doesn’t make you go away.” |
| *night* | Yksinäisyys yöllä | Muut varjot |
| *comments* | Oman työn jakaminen, yksi mielipide väreistä | ”Mostly… cats.” ja nimetön laatikko |

Laskeutumistilaa on joka kohdassa, ja yleensä samassa kohtauksessa. Kaksi kohtaa ansaitsee erityistä huomiota betatestissä:
- **Torstain huuto** on pelin todennäköisin todellinen laukaisija: läheinen huutaa, ja pelaaja on se, jota huudetaan. Myötätunto tulee nopeasti, mutta RSD-pelaajaan kritiikki voi osua ennen kuin lohtu ehtii.
- **Maanantai C ensimmäisellä pelikerralla.** Maanantai arvotaan, joten joka kolmas uusi pelaaja kokee aidon torjunnan neljännellä minuutilla, ennen kuin peli on ehtinyt ansaita luottamusta.

### Onko lopetus turvallinen?

On. Viimeiset seitsemän minuuttia ovat lämpimiä, viimeinen kohtaus on kevyt, ja loppuruutu on rehellinen ja ystävällinen. Peli ei jätä pelaajaa yksin vaikean tunteen kanssa. Ainoa terävä reuna on kuitti (DAYS LIVED INSIDE: 10.4, ”DO THEY STILL LIKE ME?”: ×23), mutta sekin on kehystetty lempeästi (”answer so far: yes.”).

### Sisältövaroitus

**Kyllä, kevyt.** About-sivulla on jo oikeat sanat (”Some moments may land close: being left out, an old embarrassment at 3 a.m., a message left on ’Seen.’, a bad night at home.”), mutta harva avaa Aboutia ennen New gamea.
- **Missä:** vain uuden pelin ensimmäisellä kortilla (PART ONE), kortin alalaidassa. Ei erillistä ruutua eikä vahvistusta; sama klikkaus aloittaa pelin. Ei näytetä jatkettaessa.
- **Miten:** pelin omalla äänellä. Ei sanoja ”trigger”, ”warning” tai ”mental health”, ei punaista väriä.
- **Teksti:** *A comedy about wanting company, and being scared to ask. Some moments may land close: being left out, 3 a.m., “Seen.” It saves as you go.*

### ”Mitään ei rangaista”

**Yksikään vaihtoehto ei johda huonompaan loppuun eikä sulje pois myöhempää sisältöä.** Kaikki haarat yhtyvät noin kymmenen rivin sisällä, epäonnistumistilaa ei ole, eikä tyhjä muki lopeta peliä. Lähimmät kohdat:

1. **Lukitut vaihtoehdot keskiviikkona** (*No.* kahdesti, *(Say nothing.)* kahdesti) kieltäytyvät vitsillä: ”That one isn’t available. I’m sitting on it.”, ”That isn’t a setting.” Se ei ole rangaistus vaan RSD:n kuva, ja palkinto tulee perjantaina, kun molemmat aukeavat. Pelaaja, joka ei huomaa yhteyttä, voi kokea pelin vievän valinnan.
2. **Rohkea valinta maanantaina** (*…Say ”hi” back. I’ll stay right here.*) ei muuta maanantaita:
   - A: ”The ’hi’ arrives. Nobody is left to receive it.”
   - B: ”The question arrives at an empty doorway. It was a good question.”
   - C: torjunta

   Teksti kehuu rohkeutta, mutta tulos on sama kuin piiloutumisessa. Tämä on pelin viesti (et hallitse lopputulosta), mutta ensimmäisellä viidellä minuutilla se voi tuntua siltä, ettei rohkeus kannata. Ainoa tapa saada lounas maanantaina on onnistua mahdottomassa ikkunassa.
3. **Torstain huuto** (”You’re not protecting me. You’re just the loudest thing in the room.”) osuu Ekskyysmiin eli pelaajaan, vaikka pelaaja valitsi vain sen, mitä valikossa oli. Se ei riipu yhdestäkään valinnasta. Ihminen pyytää heti anteeksi (”Sorry.”) ja ottaa tunteen omakseen: ”I know. I feel it before you’ve said a word.” – ”It’s my chest. You just do the commentary.”
4. **Pakotettu kertaus maanantaina** (kohta 7): valinta ”kävellään” ei pidä, koska märehtiminen ei kysy lupaa. Hahmolle se on totta, mutta pelaajalle jää tunne, ettei valinnalla ollut väliä.
5. **Mukin kulutus.** Vain kaksi vaihtoehtoa maksaa oman siemauksensa: Eeron puraisu (*Show him some teeth. Small ones.*) ja perjantain *Say yes. Old habits.* Torstain viestikohdassa jokainen neljästä vaihtoehdosta maksaa saman siemauksen, joten hinta on päivän eikä valinnan. Muki ei ole pisteet, mutta pelaaja voi lukea sen niin.
6. **Ihminen ohittaa ehdotuksen usein** (”I’m not telling him about the supermarket.”, ”You sent it. Without a committee.”, ”…No. It’s still no.”, ”Already sent.”). Se on pelin ydin eikä rangaistus, mutta hallintaa haluava pelaaja voi kokea valintansa merkityksettömiksi.

**Hyvin hoidettuja kohtia:**
- Keskiviikon ”Fine.” lähtee, kun Ekskyysmi nukkuu, ja perjantaina ihminen ottaa sen itselleen: ”You were asleep. That one was all me.”
- Torstain *Actually, I can’t make it* korjaantuu: ”I cancelled us out of a yes.” → ”Ignore that. I panicked. 7?”
- Perjantain *Say yes. Old habits.* saa lempeän vastauksen: ”Next time, then.”

### Maanantai C

C on pelin rehellisin reitti:
- Pelko toteutuu: ”No need to ask the others, right?”
- Ekskyysmi oli oikeassa eikä nauti siitä: ”I’d like it noted that I don’t enjoy being right.”
- Purku ei vitsaile: ”That happened. I’m not doing a bit.”
- Ihminen soittaa jollekulle, joka kysyy, ja päivä päättyy: ”Today hurt. You reached for someone who makes room for you.”

RSD-pelaajalle se voi olla vahvistavin reitti, koska se sanoo, ettei kaikki ole omassa päässä. Se on yhtä arvokas kuin A ja B, mutta raskaampi, eikä pelaaja valitse sitä, koska maanantai arvotaan. Muu viikko on sama kuin A:lla ja B:llä, ja perjantain selitys (”We stopped asking. I thought asking was pressure.”) sopii siihenkin. Ainoa kysymys on, kuuluuko C ensimmäiselle pelikerralle.

---

## 4. Betatestaajan ohje (englanniksi, testaajalle sellaisenaan)

> **Really Small Deal – playtest notes**
>
> Thank you for testing. This is an early version of a story game, about an hour long. You play Ekskyysmi, the overprotective shadow of an ordinary person, through one week of small social moments. It’s a comedy about wanting company and being scared to ask. Meant kindly; not advice.
>
> **Before you start**
> - Play in one or two sittings, the way you’d normally play. A phone held sideways or a computer both work. Sound is optional.
> - It saves as you go. You can pause (P, or the menu) or stop at any time.
> - Some moments may land close: being left out, an old embarrassment at 3 a.m., a message left on “Seen.” If something feels like too much, stop. Where you stopped is useful to us, and you don’t owe us the rest.
>
> **What we’d like you to notice**
> - Where you laughed, and where you felt something else.
> - Where you got bored, skimmed or wanted to stop, and why.
> - When you understood who you are in the game.
> - Whether any choice felt wrong, pointless or like a punishment.
> - The mug in the corner: did you notice it, and did it mean anything?
> - How the ending felt.
>
> **What not to test**
> - Bugs, typos and technical things, unless the game stops you from going on. Then just tell us where.
> - Don’t replay to find other routes before you’ve answered the questions below. Your first time through is the one thing we can’t get back.
>
> **How to tell us**
> - When something happens, note the day and time in the top-left corner (for example MONDAY · 08:52), or just name the scene. One line is enough.
> - Tell us what you felt, not what we should change. “I felt X when Y” is perfect.
>
> **After you finish (or stop)**
> 1. In one sentence, what is this game about?
> 2. When did you realise you were playing the shadow, not the human? (straight away / at the first choice / later / not sure)
> 3. Where did you laugh first, and where most?
> 4. Was there a moment you wanted to stop? Where, and what made you go on (or not)?
> 5. Did anything land too close? Did the game give you enough room afterwards? (skip this if you’d rather not say)
> 6. Did any choice feel wrong, pointless or like a punishment? Which one?
> 7. What did you feel at the very end, in a word or two?
> 8. How would you describe it to a friend in one sentence?
>
> Optional: your device, roughly how long you played, and how familiar the feeling of rejection is to you (not at all / a bit / very).

Lomakkeen kysymykset vastaavat tämän dokumentin epävarmimpia kohtia: kysymys 2 roolia (kohta 1.2), 3 naurua (1.4), 4 poistumiskynnystä (1.7 ja liian monet loput), 5 turvallisuutta, 6 lupausta ”mitään ei rangaista” ja 7 viimeistä tunnetta. Kysymys 8 tuottaa kauppakuvauksen lauseen oikeilta pelaajilta.

---

## 5. Kauppakuvaus, yksi lause ja tagit (englanniksi)

**Steam / itch.io (137 sanaa)**

> You play Ekskyysmi, the overprotective shadow of a perfectly ordinary human.
>
> The human has one small plan: ask Sanna from work to lunch. You have concerns. Thousands of them, filed by year.
>
> Every “oh, hi” is a verdict. Every “quick chat?” is a firing. Every unanswered message is a door closing. You suggest; the human decides. Somewhere between the panic and the paperwork, the two of you find out what a shadow is actually for.
>
> Really Small Deal is a comedy about rejection sensitivity: wanting company, and being scared to ask.
>
> - A story of about an hour, told through choices and small hands-on moments
> - The inside version, then what everyone else actually saw
> - One fragile mug, one magnifying glass, no villains
> - Meant kindly. Not advice.
>
> Some moments may land close: being left out, 3 a.m. embarrassment, “Seen.”

**Lause, jonka pelaaja sanoo kaverille**

> ”It’s like playing the voice in your head that panics over ’oh, hi’ – I laughed the whole time, and then it got me at a radiator.”

**Kolme tagia:** Comedy · Interactive Fiction · Mental Health. itch.io:ssa kaikki kolme ovat valmiita tageja. Steamin tageista en löytänyt Mental Healthia, joten siellä kolmas olisi Wholesome: se kertoo saman lupauksen (ei rangaista, ei konnia) ilman aihetta. Psychological on aiheeltaan lähempänä, mutta sen alla on paljon kauhua.

---

## 6. Mitä tekisin ensin

Tämä osio on erillään kohdasta 1, jonka ohje kielsi muutosehdotukset. Järjestys on minun näkemykseni siitä, mikä on oleellista: ensin pienet, turvalliset korjaukset ensimmäiseen minuuttiin, sitten betatesti, ja vasta sen tulosten perusteella rakenne. Kaikki odottavat Joonaksen hyväksyntää.

**Nyt (pieniä, ei tarinamuutoksia)**
1. **Työ-pilleri vasta ensimmäisen valinnan jälkeen.** Teksti säilyy (*Keep you from being rejected.*), mutta pilleri ilmestyy vasta, kun paneeli on sanonut ”You’re Ekskyysmi.” Silloin pelaaja lukee ”you”:n oikein ihmiseksi, ja loppuruudun yliviivaus toimii kuten ennen. Korjaa kahden ”you”:n ristiriidan (kohta 1.2).
2. **Rooli nimiruutuun yhdellä rivillä** taglinen alle: *You play the shadow.* Tagline säilyy. Pelaaja tietää roolin ennen New gamea, ja jaetun linkin lupaus näkyy myös itse pelissä (kohta 1.1).
3. **Sisältövaroitus ensimmäiselle kortille** kohdan 3 tekstillä.
4. **Kysymys Joonakselle:** saako ensimmäinen pelikerta olla maanantai C, vai arvotaanko ensimmäisellä kerralla A tai B ja C vasta uusinnoissa? Kumpikin on perusteltu: C on rehellisin, mutta raskain ensivaikutelma.

**Päätökset ja tehdyt muutokset 28.11.**
- **Työ-pilleri:** Joonas: ”työpilleri on ok”. Pilleri jää ennalleen.
- **Roolirivi nimiruutuun:** ei. Joonas: rooli selviää alussa riittävän aikaisin ilman alleviivausta, ja pelaaja on tavallaan sekä ihminen että varjo.
- **Sisältövaroitus:** About-sivu riittää. Ensimmäiseen korttiin ei lisätä mitään.
- **Maanantai C:** tehty 0.99.56. Laitteen ensimmäinen maanantai on A tai B, ja C tulee uusinnoissa.
- **Lisäksi tehty:**
  - 0.99.55: vastausikkuna alkaa 0,35 sekunnin säikähdyksellä, joten tuplapainallus ei enää hylkää sitä näkymättä (kohta 1.5).
  - 0.99.57: puhelimella repliikki luetaan kerran, alapalkista, ja kuvassa on pieni puhujamerkki (kohta 1.7).
  - 0.99.58: nimiruudussa on sanaton vitsi. Joku kulkee käytävällä, Ekskyysmi säikähtää ja teeskentelee, ettei nähnyt mitään. Huumori näkyy siis ilman sanoja (kohta 1.1).
  - 0.99.59: uusi kuvake. Silmille tuli huolestuneet kulmat, ja taustana on nimiruudun seinä ja oven valojuova.
- **Epilogi:** katsottu kokonaan kuvina tietokoneen ja puhelimen koossa. Muutettavaa ei löytynyt: kuitti on puhelimellakin luettava, ja loppukortti lupaa patterin.

**Betatestin jälkeen, vain jos data niin sanoo**
5. **Osan 1 keskikohta.** Jos testaajat hyppivät tiistaista torstaihin tai sanovat ”sama vitsi”, *enhance* ja *glass* ovat ehdokkaat yhdistää tai siirtää Momenteiksi.
6. **Osan 2 tasainen jakso** (snow → posting). Jos testaajat sanovat ”hidas”, jakso tarvitsee jotain, mikä vetää kohti yötä.
7. **Loppujen määrä.** Jos testaajat lopettavat lopputekstien aikana eivätkä näe patteria, patterin paikka harkitaan uudelleen.
8. **Pakotettu kertaus ja vastausikkuna pidetään**, ellei beta näytä, että niihin lopetetaan. Kumpikin on hahmolle totta ja pelin muistettavimpia hetkiä.

Kohdat 5–7 ovat isoja muutoksia. Ilman oikeita pelaajia ne olisivat arvauksia, ja juuri siksi betaohjeen kysymykset 3, 4 ja 7 mittaavat niitä.

# Seuraavaksi: mitä kannattaa tehdä ja missä järjestyksessä

15.11.2026 · Claude. Tämä tiedosto korvaa [TOTEUTUKSEN_SUUNNITTELU.md](TOTEUTUKSEN_SUUNNITTELU.md):n työlistana. Lista on järjestetty sen mukaan, mikä vaikuttaa eniten siihen, että peli toimii ja että siitä kerrotaan eteenpäin.

## Missä ollaan (0.27)

- **Peli:** viisi päivää (Oh, hi · Quick chat? · Could you just… · Seen. · For now) ja niiden välissä yksitoista lyhyttä hetkeä. Yksi läpipeluu kestää lukutahdissa noin 38 minuuttia. Selainpeli toimii myös puhelimella vaakasuunnassa. Android-kuori on valmiina, mutta sitä ei ole julkaistu.
- **Rakenne on mitattu ja järjestetty** (Weilandin käännekohdat, Trubyn perusaskeleet): ks. [KASIKIRJOITUS.md](KASIKIRJOITUS.md) → Rakenne.
- **Kantavat ideat:** varjon byrokratia ja ylisuojelu, *oikea vastaus* (mahdoton ikkuna), kaksi kelloa ja kuitti, röntgen, suurennuslasi, muiden ihmisten varjot ja kaari korjaamisesta pysymiseen.
- **Vain labrassa:** *The voice message* ja *A fine.*
- **Ensimmäinen pelaajapalaute:** ”hauska ja deep samalla”, ”kuin Disco Elysium casual-yleisölle”. Laajempi testi on yhä tekemättä.

## 1. Nyt: pelaajatesti ennen uusia ominaisuuksia

Viisi ihmistä riittää: kaksi tai kolme, jotka tunnistavat RSD:n itsestään, ja kaksi, jotka eivät tunnista. Jokainen pelaa maanantain ilman ohjeita. Sinä vain katsot ja kirjoitat ylös:

- missä kohtaa ensimmäinen naurahdus tulee (tavoite: ennen kahta minuuttia)
- missä kohtaa he lakkaavat lukemasta ja alkavat painaa eteenpäin
- ymmärtävätkö he oikean vastauksen ikkunan vitsiksi vai kokevatko sen epäreiluksi
- mitä he sanovat kuitista (luku 2.1)

Lopuksi kysy kaksi kysymystä: ”Kenelle näyttäisit tämän?” ja ”Mikä kohta jäi mieleen?”. Jos vastaus jälkimmäiseen on röntgen tai kuitti, jakaminen toimii.

## 2. Ensimmäiset 90 sekuntia

Täysi intro kestää lukutahdissa mitattuna noin 2 min 20 s ennen oikean vastauksen ikkunaa. Jaettu linkki avataan usein puhelimella kesken muun tekemisen, joten tavoite on noin 75 sekuntia. Lyhennettävää on hiljaisen alun sekunneissa ja aamubriiffin repliikeissä. Itse ideaan ei tarvitse koskea.

## 3. Käsikirjoitus: mitä tutkimus antaa (lähteet alla)

Uusin laadullinen tutkimus (Rowney-Smith ym., PLOS ONE 2026) nimeää ADHD:n hylkäysherkkyydestä kolme teemaa: **vetäytyminen, naamioiminen ja kehon tuntemukset**. Kokemus voi kestää tunneista viikkoihin ja nousta pintaan vuosia myöhemmin. Toisen tutkimuksen mukaan **odotettu torjunta tuntui monesta pahemmalta kuin itse torjunta**. Kaikki tämä sopii pelin logiikkaan, ja osa on jo pelissä:

| Teema | Pelissä nyt | Mitä puuttuu (ehdotus) |
|---|---|---|
| Kehon tuntemukset | Röntgen, säpsähdykset, hikilätäkkö | Riittää. Ei lisää. |
| Naamioiminen | ”Yeah. It’s nothing.” | ✅ **Tehty 0.24.** **Kaari:** sama repliikki toistuu viikon aikana, ja perjantaina ihminen sanoo: ”It’s something. Small. Give me a minute.” Pieni, mutta se on naamion laskeminen ilman terapiapuhetta. |
| Vetäytyminen | Maanantain kotimatka yksin | ✅ **Tehty 0.24.** **Uusi hetki *The posting.*:** ihminen katsoo työpaikkailmoitusta, Ekskyysmi arkistoi sen. Kuittiin: ”applications not sent: 1 · rejections avoided: 1 · success rate: 100 %”. |
| Odotus pahempi kuin itse asia | Kolme skenaariota klo 03:07 | ✅ **Tehty 0.24** (repliikkinä ja koko tarinan kuitissa). ***Not now.*-kuittiin** kaksi riviä: ”rehearsal 3 h 10 min” ja ”the actual no 4 s”. |
| Ympäristö ratkaisee (Sandland 2025) | Sanna, Eero | **Yksi hetki, jossa joku on täysin yksiselitteinen** (”This is not a criticism. It’s a font.”). Ekskyysmillä ei ole lomaketta yksiselitteiselle viestille. |

Ääni pysyy samana: varjo on absurdi, ihmiset ovat rauhallisia, eikä peli opeta.

**Varo:** RSD ei ole diagnoosi, ja termiä on kritisoitu myös tutkimuksessa (van Asselt 2026). Pelin sivulla ja About-ruudussa kannattaa puhua kokemuksesta (”rejection sensitivity”), ei diagnoosista, eikä esittää kliinisiä väitteitä.

## 4. Pienet tarinakorjaukset

1. ~~**Salainen lounas jättää jäljen viikkoon.**~~ Tehty 0.23 (Codex): ”I’ve filed the blank. For completeness.” Samassa versiossa perjantaina varjot muistavat toisensa.
2. **Labrahetkien paikat:** ~~*Sometime.*~~ (0.25) ja ~~*An ordinary evening*~~ (0.26) ovat tarinassa. Jäljellä: *The voice message* torstai-iltaan ja *A fine.* (”twenty-three days later”) aivan loppuun ennen kuittia. *An ordinary evening* on rauhallinen hengähdys. Se sopii keskiviikon jälkeen, tai sen voi jättää pelkäksi labrahetkeksi.
3. ~~**Kuittiin rivi ”the actual no”**~~ Tehty 0.24.

## 4a. Rakenteen avoimet kohdat

1. **Salainen lounaspolku** tarvitsee loppuviikolle oman kysymyksensä (”pystyykö sen toistamaan?”).
2. ***A fine.*** jälkikohtaukseksi kuitin jälkeen.

## 4b. Laajennus muiden varjoina

Seuraava: **Riitan varjo** *Not now.* -hetkeen (jongleeraa yhtätoista asiaa, ”Not now” oli pudonnut pallo). Perustelut ja säännöt: [KASIKIRJOITUS.md](KASIKIRJOITUS.md) → Laajennus: muiden varjot.

## 5. Ennen julkaisua

1. **Ääni-identiteetti:** kuittikirjoittimen rätinä, matala ”thunk” röntgenissä, toimiston huminaa ja yksi lyhyt teema. Paikat ovat valmiina (`SAMPLES`, `MUSIC`).
2. **Saavutettavuus:** asetus *Slow reality*, joka pidentää oikean vastauksen ikkunan noin kymmeneen sekuntiin. Vitsi säilyy, mutta salainen haara ei vaadi nopeita sormia. Tekstin nopeus. Vähennetty liike on jo tehty.
3. **itch.io-sivu:** selainversio upotettuna, kansikuvana röntgen, ensimmäisenä kuvana kuitti, 10 sekunnin GIF röntgenistä ja lyhyt kuvaus. Selaimessa pelattavat pelit saavat itch.io:ssa selvästi enemmän pelikertoja kuin ladattavat, mutta näkyvyys tulee lähes kokonaan omista jaoista, devlogeista ja jameista.
4. **Jamit ja tapahtumat:** *Psyche Game Jam* (huhti–toukokuu, mielenterveysaiheinen, keskeneräiset pelit sallittu). **Huom:** säännön mukaan peliä ei saa olla julkaistu muualla, ja GitHub Pages voi tulkita julkaisuksi, joten se kannattaa tarkistaa järjestäjältä. *Global Game Jam / Finnish Game Jam* on 23.–25.1.2027, mutta se on uutta peliä varten eikä tätä.
5. **Rahoitus (jos MoshBitSurfersilla on Y-tunnus):** AVEKin demotuki (DigiDemo/CreaDemo). Vuoden 2026 haku oli 18.6.–21.9., ja omaa rahoitusta tarvitaan vähintään 20 %. Seuraava kierros kannattaa tarkistaa keväällä 2027.

## 6. Tekninen tarkistuslista: netti ja Android

Kunnossa (tarkistettu 0.27): vaakanäkymä ja turva-alueet puhelimella, pystyasento, Androidin takaisin-nappi, tauko kun sovellus menee taustalle, äänen käynnistys ensimmäisestä kosketuksesta, vähennetty liike, näppäimistö, ruudunlukijan teksti, jatkaminen kesken luvun, linkin esikatselukuva.

Tekemättä, tärkeysjärjestyksessä:

1. **Oikea laite.** Kaikki tähän asti on testattu emuloidussa selaimessa. Yksi läpipeluu oikealla Android-puhelimella (selain ja Capacitor-sovellus) ja yhdellä iPhonella: äänet, kosketus suurennuslasissa ja venytyksessä, akun lämpeneminen.
2. **Tekstin koko ja nopeus.** Peli on lähes pelkkää lukemista. Asetus isommalle tekstille ja *Slow reality* (pidempi vastausikkuna) ovat saavutettavuuden kaksi tärkeintä.
3. **Kieli.** Vitsit nojaavat englantiin (”fine”, ”sometime”, ”excuse me”). Suomennos on uudelleenkirjoitus, ei käännös, ja repliikit ovat koodin seassa. Jos suomi halutaan, tekstit pitää ensin irrottaa omaan tiedostoonsa.
4. **Offline selaimessa.** Android-sovellus toimii ilman verkkoa, selainversio ei. Pieni service worker korjaisi sen, mutta se kannattaa lisätä vasta, kun versiot eivät enää vaihdu päivittäin (vanha versio jää helposti välimuistiin).
5. **Emme tiedä, missä pelaajat lopettavat.** Analytiikkaa ei ole. Yksityisyyden kannalta se on hyvä, kehityksen kannalta sokea piste. Pelaajatesti (kohta 1) korvaa tämän toistaiseksi.
6. **Google Play.** Sisältöluokitus, tietoturvalomake (peli ei kerää mitään) ja tietosuojasivu. Jos kehittäjätili on henkilötili, joka on luotu 13.11.2023 jälkeen, ennen julkaisua vaaditaan suljettu testi 12 testaajalla 14 päivän ajan. Vanhemmat tilit ja organisaatiotilit on vapautettu.
7. **Kuitti kuvana.** Copy receipt kopioi tekstin. Kuva (canvas → PNG, Web Share API) leviäisi paremmin.

## Mitä ei kannata tehdä

- Lisää HUD-infoa (kokeiltu kellon kanssa, oli liikaa).
- Selviytymisvinkkejä tai terapiakieltä.
- Peliä tästä pidemmäksi. Kokonaisuus on nyt noin 38 minuuttia. Uusi hetki tulee mukaan vain, jos jokin vanha lähtee tai se liikuttaa kaarta (ks. välihetkien sääntö).
- Diagnoosisanastoa pelin sisällä.

## Lähteet

- Rowney-Smith, Sutton, Quadt & Eccles (2026): [The lived experience of rejection sensitivity in ADHD](https://pmc.ncbi.nlm.nih.gov/articles/PMC12822938/), PLOS ONE. Ks. myös [BSMS:n tiedote](https://www.bsms.ac.uk/about/news/2026/it-hurts-in-your-body-new-bsms-research-explores-rejection-sensitivity-in-adhd.aspx).
- [Psychology Today: RSD, the actual research](https://www.psychologytoday.com/us/blog/if-i-be-waspish/202604/rejection-sensitivity-dysphoria-the-actual-research) (tutkimuksen tila; Sandland 2025)
- [LifeStance: odotettu torjunta](https://lifestance.com/blog/rejection-sensitive-dysphoria-adhd/)
- [Early Years TV: termin kritiikki](https://www.earlyyears.tv/?p=541282) (van Asselt 2026)
- [Cinevva: itch.io-pelikerrat 2026](https://app.cinevva.com/guides/get-more-plays-itch-io)
- [Psyche Game Jam 2026](https://itch.io/jam/psyche-game-jam-2026)
- [Global Game Jam 2027](https://www.pocketgamer.biz/events/global-game-jam-2027/)
- [AVEK CreaDemo/DigiDemo](https://kopiosto.fi/en/AVEK/funding/avek-grants-and-support-guidelines/creademo-digidemo/)

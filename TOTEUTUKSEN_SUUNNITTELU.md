# Toteutuksen suunnittelu

14.11.2026 · Ehdotus seuraavan työvaiheen pohjaksi

[Pelin konsepti](PELIKONSEPTI.md) määrittää hyväksytyn ytimen. Tämä tiedosto ei lukitse pelimekaniikkaa, alustaa tai tekniikkaa. Peliä ei ole vielä toteutettu tai testattu pelaajilla.

## 1. Ensimmäinen ratkaistava asia

**Mitä pelaaja tekee toistuvasti, ja miten sama teko muuttaa ihmisen ja varjon suhdetta?**

”2D-seikkailu”, ”RPG” ja ”kuvaseikkailu” ovat pelimuotoja. ”Mörkö säikähtää itseään” on hahmon reaktio. Kumpikaan ei vielä yksin määritä pelattavaa toimintaa.

Ennen kohtauksia päätetään pieni kokeiltava kokonaisuus: pelaajan rooli, yksi selkeä tavoite, korkeintaan pari toimintoa ja niiden näkyvät seuraukset. Toiminnan pitää tuntua mielekkäältä myös ennen sen symbolisen merkityksen selittämistä.

## 2. Kaksi nykyisestä konseptista johdettua koetta

| Koe | Mitä selvitetään | Milloin suunta ei kanna |
| --- | --- | --- |
| Ihmisen ja varjon eri tahti | Pelaaja ohjaa etenemistä tai sijoittumista. Varjo voi jäädä kiinni aiempaan tai reagoida ennakoiden. Voiko näiden suhde tuottaa ymmärrettävää tekemistä, yhteistoimintaa ja komiikkaa? | Varjo on pelkkä hidaste, odottaminen ratkaisee kaiken tai kokemus muuttuu ärsyttäväksi saattotehtäväksi. |
| Varoitus ja sen jälki | Pelaaja käyttää varjon varoitus- tai suojatoimintoa. Se muuttaa tilannetta, ja mörkö voi reagoida omaan aikaansaannokseensa. Voiko teolla olla ymmärrettävä hyöty ja samalla yllättävä seuraus? | Kaikki teot ovat vääriä, paras ratkaisu on olla pelaamatta tai säpsähdys on vain sama toistuva animaatio. |

Nämä ovat vaihtoehtoisia lähtöjä, eivät päätös yhdistää kaksi järjestelmää. Valitaan ensimmäiseen kokeeseen vain toinen. Ohjaus ihmisen, varjon tai molempien kautta ratkaistaan tämän kokeen osana.

Reaktio voi alkaa myös ilman pelaajan tekemää virhettä. Ulkoinen tilanne ja hahmon kokemus säilyvät erillisinä: pelaajan ei tarvitse opetella pitämään kaikkea uhkaa kuviteltuna.

[Jatkotutkimuksesta](JATKOTUTKIMUS_JA_NIMET.md) johdettu kokeilukysymys: voiko pelaaja edetä mielekkäästi myös silloin, kun varjo on yhä levoton? Ihmisen ja varjon eri tahdin kokeessa täydellinen synkronointi ei saa automaattisesti tarkoittaa ainoaa onnistumista. Varoituskokeessa voimakas reaktio ei saa yksin tarkoittaa huonoa valintaa.

## 3. Toteutusmuotojen alustava vertailu

| Muoto | Miksi sopisi | Mitä se vaatii tai rajaa |
| --- | --- | --- |
| Yhden näkymän animoitu 2D-kokeilu | Hahmosuhde, ajoitus, koko, katse ja pelaajan teko voidaan testata pienellä kokonaisuudella. | Varsinainen toistuva toiminta pitää keksiä; pelkkä katsottava animaatio ei osoita pelin toimivuutta. |
| Pienistä huoneista koostuva 2D-seikkailu | Liikkuminen, etäisyys, tutkiminen ja tutut paikat voivat olla osa mekaniikkaa. | Liikkumisen ja ympäristöjen on tuotettava merkitystä. Niiden määrä kasvattaa tekemistä nopeasti. |
| Animoitu kuvaseikkailu, jossa on tekstivalintoja | Sopii ilmeisiin, dialogiin, rytmiin ja henkilökohtaisesti merkityksellisiin valintoihin. | Voi ajautua terapiakyselyksi tai valmiiksi kirjoitettujen vitsien katseluksi, jos pelaajan teko ei muuta tilannetta. |

Alustava suositus on yhden näkymän animoitu kokeilu. Sen tarkoitus on ratkaista toiminta ja hahmosuhde, ei päättää koko pelin genreä. RPG:n kartta, inventaario, taistelu ja kehityspisteet eivät tässä vaiheessa vastaa tunnistettuun tarpeeseen.

Selain on perusteltu ensikokeen jakeluhypoteesi helpon kokeilemisen vuoksi. Lopullinen selain-, työpöytä- tai mobiilitoteutus on avoin. Moottoria tai kirjastoa vertaillaan vasta, kun ohjaus, animaatiotarve ja tavoitealustat ovat selvillä. Valitun tekniikan ajantasaiset rajoitteet tarkistetaan silloin.

## 4. Pienimmän hyödyllisen prototyypin rajaus

- Yksi selkeä näkymä ja kaksi alustavaa mutta ilmeikästä hahmoa.
- Yksi tavoite ja valitun kokeen toiminnot; lyhyt ohje riittää alkuun.
- Varjolle kolme tunnistettavaa olemusta: mukana kulkeva, varoittava ja itse säikähtänyt.
- Yksi ulkoinen ärsyke sekä mahdollisuus nähdä oman toiminnan seuraus ja kokeilla uudelleen.
- Hiljainen tai rauhallinen vaihe, jotta hahmosuhde näkyy myös reaktion ulkopuolella.
- Tauko ja uudelleenkäynnistys. Olennaisen palautteen pitää välittyä ilman ääntä; voimakkuutta ja liikettä voidaan säätää tarpeen mukaan.

Ensikoe ei tarvitse kokonaista tarinaa, talvimaailmaa, lopullista hahmotaidetta, nimeä, logoa, kirjautumista, tekoälykeskustelua tai moninpeliä. Kohtauksia ja tuotannon sisältömäärää ei johdeta vanhoista konseptimuistioista.

## 5. Mitä kokeesta pitää oppia

| Havainto | Käytännön arviointi |
| --- | --- |
| Yhteys ymmärretään. | Pelaaja pystyy kuvaamaan, miksi varjo kuuluu tähän ihmiseen ja mitä hänen tekonsa muutti. |
| Huumori syntyy toiminnasta. | Pelaaja löytää huvittavan seurauksen tai haluaa kokeilla uudelleen ilman jatkuvaa vitsitekstiä. |
| Mörkö tuntuu hahmolta. | Sitä kohtaan syntyy muutakin kuin halu poistaa hidaste; motiivista tai tunteesta saa kiinni. |
| Pelaajalla on vaikutusta. | Tekeminen tuottaa luettavia eroja. Odottaminen tai yhden oikean vastauksen arvaaminen ei yksin kanna peliä. |
| Kokemus ei syyllistä. | Vaikea reaktio ei näyttäydy vain huonona pelaamisena. Ihmisen kaipuu ja ulkoinen todellisuus säilyvät näkyvissä. |
| Eteneminen erottuu tunnetilasta. | Pelaaja tunnistaa mielekkään vaikutuksensa myös silloin, kun varjo ei rauhoitu välittömästi. |
| Pieni kokonaisuus kantaa. | Kiinnostus kohdistuu toimintaan ja hahmosuhteeseen, ei vain lupaukseen tulevasta tarinasta. |

Nämä ovat laadullisia arviointikysymyksiä, eivät vaikuttavuustutkimus tai jo saavutettuja tuloksia. Kokemusta tuntevan pelaajan ja aihetta vähemmän tuntevan pelaajan palautetta tarvitaan eri asioiden ymmärtämiseen.

## 6. Etenemisjärjestys

1. Valitaan kokeen pelaajarooli, tavoite ja toiminnot.
2. Tehdään hahmon siluetti- ja liiketutkimus vain kokeen tarpeisiin.
3. Valitaan pieni toteutustapa ja rakennetaan rajattu prototyyppi.
4. Arvioidaan tekeminen, luettavuus, huumori ja kuormitus; muutetaan tarvittaessa mekaniikkaa.
5. Kirjoitetaan toimivan mekaniikan ympärille ensimmäinen kokonainen kohtaus.
6. Päätetään laajempi pelimuoto, sisältömäärä ja tuotantotekniikka näytön perusteella.

Seuraava keskustelu koskee kohtaa 1. Kumpaakaan mekaanista koetta ei ole vielä valittu pelin lopulliseksi toimintatavaksi.

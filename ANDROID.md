# Really Small Deal Androidille

15.11.2026 · Claude. Päivitetty versiossa 0.16.

## Tilanne

**Asettelu puhelimella (versiosta 0.16):**
- Kohtaus täyttää ruudun korkeuden. Repliikki ja valinnat ovat kohtauksen alareunassa läpikuultavalla kaistalla, eivät kohtauksen ulkopuolella.
- Vasemmassa yläkulmassa on yksi ☰-painike, jonka takana ovat Sound, Less motion, Dialogue, Pause ja Restart.
- Kohtauksen HUD-kortit (Ekskyysmin työ, suunnitelma) näkyvät noin seitsemän sekuntia kohtauksen alussa ja aina kun ne muuttuvat.
- Tauolla ruudussa lukee ”Paused”, ja kohtauksen napautus jatkaa.

**Tarkistettu selaimen kosketusemulaatiolla** ko'oilla 640×360, 740×360, 844×390, 915×412 ja 1024×480, yhteensä 24 tilaa per koko: aloitusruutu tallennuksella ja ilman, About, Chapters, lab-lista, intro, pitkä repliikki, kolmen ja neljän vaihtoehdon valinnat, venytys, pito, molemmat chattitaistelut, viestiloki, suurennuslasi, baari, ääniviesti, valikko auki, tauko, uudelleenaloituksen varmistus, dialogiloki ja kolme loppuruutua. Tarkistus etsi vierivää sivua, ruudun ulkopuolelle jääviä painikkeita ja alle 43 pikselin kosketuskohteita. Jäljelle jäi yksi tarkoituksellinen: lab-lista vierii, koska kohtauksia on yhdeksän.

**Tiedossa oleva kompromissi:** valintojen aikana kaista peittää kohtauksen alimman kolmanneksen, eli hahmojen jalat ja baarikohtauksessa tiskin. Kaista on läpikuultava, ja tavallisen repliikin aikana se on matala.

**Capacitor-pohja:** `npm install`, `npm run android:init`, `npm run android:sync` ja kuvakkeiden generointi on ajettu Linux-koneella nykyisellä koodilla. Android-projekti syntyy, peli kopioituu siihen, ja vaakalukitus ja tilapalkin piilotus lisätään.

**Ei vielä tehty:**
- Sovellusta ei ole käännetty APK:ksi eikä ajettu puhelimessa tai emulaattorissa. Minulla ei ole Android SDK:ta, joten oikean laitteen WebView, lovet ja takaisin-painike ovat testaamatta.
- Navigointipalkin piilotus (immersive-tila).

## Näin saat sen puhelimeen

Tarvitset Node.js:n (20 tai uudempi) ja Android Studion. Capacitor 7 vaatii muistaakseni JDK 21:n, joka tulee uuden Android Studion mukana. Tarkista vaatimukset Capacitorin ohjeesta, jos käännös valittaa.

```
cd C:\RSD
npm install
npm run android:init
npm run android:icons
npm run android:open
```

`android:open` avaa projektin Android Studiossa. Sieltä Run asentaa pelin puhelimeen tai emulaattoriin.

Kun peliä on muutettu:

```
npm run android:sync
```

Se kokoaa pelin, kopioi sen kansioon `www/` ja päivittää Android-projektin.

## Päätettävä ennen ensimmäistä Play-latausta

- **Sovelluksen tunniste.** Laitoin paikalle `com.moshbitsurfers.reallysmalldeal` tiedostoon `capacitor.config.json`. Tunnistetta ei voi vaihtaa julkaisun jälkeen, joten vaihda se ennen kuin ajat `android:init`, jos haluat toisen.
- **Kuvake.** `resources/logo.png` on Ekskyysmi suurennuslasin läpi. `android:icons` tekee siitä kaikki koot.

## Mitä kansioihin syntyy

| Kansio | Mikä | Versionhallintaan? |
|---|---|---|
| `node_modules/` | Capacitor | Ei |
| `www/` | Pelin kopio pakkausta varten, syntyy joka kerta uudestaan | Ei |
| `android/` | Android Studio -projekti | Kyllä, paitsi käännöskansiot |

## Seuraavat askeleet laitetestin jälkeen

1. Katso oikealla puhelimella, ovatko tekstit ja painikkeet sopivan kokoisia. Säädöt ovat tiedoston `assets/game.css` lopussa (”phones held sideways”).
2. Navigointipalkin piilotus, jos se häiritsee.
3. Kohtauksen omat tekstit (puhekuplat, boss-taistelun viestit, zoomin tekstit) ovat puhelimella pieniä. Repliikit luetaan alareunan kaistalta, mutta kohtauksen sisäiset tekstit kannattaa suurentaa, kun nähdään, miltä ne näyttävät laitteella.
4. Play Consolen sisäinen testiraita.

## Vaihtoehto ilman Android Studiota

Pelissä on nyt myös `manifest.webmanifest` (koko ruutu, vaakasuunta). Jos peli on jossain https-osoitteessa, sen voi lisätä Chromesta puhelimen aloitusnäytölle. Tätä en ole testannut.

## Lisäys 0.27

- `assets/share.png` on verkkoversion linkkikuva. `tools/www.cjs` jättää sen pois sovelluksesta.
- Peli tallentaa nyt myös välihetken (`at` tallennuksessa), joten sovelluksen sulkeminen kesken luvun ei palauta luvun alkuun.
- Julkaisun tarkistuslista (laitetesti, Play-lomakkeet, 12 testaajan sääntö uusille henkilötileille): [SEURAAVAKSI.md](SEURAAVAKSI.md) → Tekninen tarkistuslista.

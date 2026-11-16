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
- ~~Navigointipalkin piilotus (immersive-tila).~~ Tehty 0.32, ks. alla ”Koko ruutu”. Laitetesti puuttuu.

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

## Lisäys 0.28–0.29

- `npm run android:sync` tekee nyt kaiken: `www/`, Capacitorin synkronoinnin, `tools/android-patch.cjs`-korjaukset ja `tools/android-check.cjs`-tarkistuksen. Olemassa olevaa `android/`-kansiota ei koskaan poisteta.
- `npm run android:check` vertaa APK:hon paketoidut tiedostot lähteisiin ja tarkistaa, ettei peli lataa mitään verkosta, että offline-virhesivu on mukana, että App-liitännäinen on paketissa ja että versionumero vastaa `package.json`:ia.
- Sovelluksen `versionCode` ja `versionName` tulevat automaattisesti `package.json`:ista, joten puhelimessa näkee, mikä versio on asennettuna.
- `webview-error.html` näkyy, jos laitteen WebView on liian vanha (vaatimus 108).
- Valikko on kaksipalstainen vaakanäytöllä: kahdeksan nappia ei mahtunut yhteen pylvääseen 360 px korkealla näytöllä.

## Sovelluksen kuvake ja aloitusruutu

Lähdekuvat ovat `resources/`-kansiossa ja ne ovat gitissä, joten kuvake säilyy, vaikka `android/`-kansio tehtäisiin uudelleen:

| Tiedosto | Koko | Mihin |
|---|---|---|
| `icon-foreground.png` | 1024×1024, läpinäkyvä | Adaptiivisen kuvakkeen etuala. Android rajaa ympyräksi tai neliöksi, joten kuva on keskellä noin 55 %:n kokoisena. |
| `icon-background.png` | 1024×1024 | Taustaväri `#1d242e`. |
| `icon.png` | 1024×1024 | Vanhempien Androidien neliökuvake. |
| `splash.png`, `splash-dark.png` | 2732×2732 | Aloitusruutu. |

Kuvakkeen vaihtaminen: korvaa nämä tiedostot ja aja `npm run android:icons`. Se kirjoittaa kaikki koot `android/app/src/main/res/`-kansioon. Älä muokkaa `res/`-kansion tiedostoja käsin, koska komento ylikirjoittaa ne.

**Huom:** `android/`-kansio ei ole gitissä, vaan se syntyy koneella komennolla `npm run android:sync`. Siksi kaikki kuvakkeeseen liittyvä kannattaa tehdä `resources/`-kansion kautta eikä suoraan Android Studiossa.

## Koko ruutu (0.32)

Ensimmäisessä puhelintestissä ruudun laitaan jäi täyttämätön kaistale. Syy oli navigointipalkki ja kameraloven alue, joihin sovellus ei ulottunut.

Korjaus on `tools/android-patch.cjs`:ssä, eli se tulee voimaan komennolla `npm run android:sync`:

- Kirjoittaa tiedoston `android/app/src/main/java/com/moshbitsurfers/reallysmalldeal/GameApp.java`. Se piilottaa tila- ja navigointipalkin (pyyhkäisy reunasta tuo ne hetkeksi takaisin), sallii ikkunan kameraloven alle ja värjää taustan pelin tummalla (#0d1114).
- Lisää `AndroidManifest.xml`:n `<application>`-tagiin `android:name=".GameApp"`.
- `MainActivity.java`:han ei kosketa.
- `capacitor.config.json`: `adjustMarginsForEdgeToEdge` on nyt `disable`. Sivu jättää itse tilaa lovelle (`env(safe-area-inset-left)`), joten Capacitorin ei pidä lisätä marginaaleja päälle.

Komennot:

```
cd C:\RSD
npm run android:sync
cd android
.\gradlew.bat assembleDebug
```

**Testaamatta laitteella.** Jos käännös kaatuu `GameApp.java`:han tai kaistale on yhä näkyvissä, kerro virhe tai ota kuvakaappaus: kaistaleen väri kertoo, kumpi kerros sen piirtää (musta = ikkuna, tumma harmaa = sivun tausta).

## Uusi APK (0.34)

```
cd C:\RSD
npm run android:sync
cd android
.\gradlew.bat assembleDebug
```

`android:sync` kopioi pelin ja musiikin (`assets/audio/title.mp3`) sovellukseen, kirjoittaa koko ruudun tilan (`GameApp.java`) ja tarkistaa, että paketti on ajan tasalla. APK syntyy kansioon `android\app\build\outputs\apk\debug\app-debug.apk` ja kasvaa noin 2,8 Mt musiikin verran.

Puhelimeen: `"C:\Users\jvker\AppData\Local\Android\Sdk\platform-tools\adb.exe" install -r app\build\outputs\apk\debug\app-debug.apk`

Musiikki alkaa aloitusruudulla ensimmäisestä kosketuksesta. Se on WebView’n sääntö, eikä sitä voi kiertää sivun puolelta.

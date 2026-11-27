# Really Small Deal Androidille

16.11.2026 · versio 0.41.0 · paikallinen testipaketti Samsung Galaxy S23 Ultraa varten.

## Valmis APK

`C:\RSD\dist\Really-Small-Deal-0.41.0-debug.apk`

Kopioi APK Driveen, lataa puhelimeen ja avaa ladattu tiedosto. Tämä on debug-allekirjoitettu testiversio. Android Studion avaamista ei tarvita valmiin APK:n asentamiseen. Jos puhelin ilmoittaa allekirjoitusristiriidasta, älä poista aiempaa asennusta sokkona: sen mukana katoaisi paikallinen pelitallennus. Selvitetään silloin asennetun version allekirjoitus.

## Seuraavan APK:n teko CMD:ssä

```bat
cd /d C:\RSD
tools\build-apk.cmd
```

Komento kokoaa pelin, ajaa testit, synkronoi Capacitorin, ajaa `assembleDebug lintDebug` ja tekee versionumerolla nimetyn kopion `dist`-kansioon. Se pysähtyy virheeseen. APK:n vieressä on SHA-256-tarkistussumma. Olemassa olevaa Android-projektia ei poisteta.

Rakennus käyttää tämän koneen Android Studion Javaa: `C:\Program Files\Android\Android Studio\jbr` (JDK 21). Node-vaatimus on vähintään 22.18. Riippuvuuksien tarkat versiot ovat `package-lock.json`:ssa; ensimmäisellä ajolla puuttuvat paketit asennetaan komennolla `npm ci`.

**0.99.52: kuitti kuvana.** Sovellus käyttää nyt kahta uutta Capacitor-liitännäistä, `@capacitor/filesystem` ja `@capacitor/share`. Ensimmäinen `tools\build-apk.cmd` 0.99.52:n jälkeen ajaa itse `npm ci`:n, koska `node_modules\@capacitor\share` puuttuu. `android-patch.cjs` varmistaa FileProviderin ja välimuistipolun (`res/xml/file_paths.xml`), ja `android-check.cjs` pysäyttää rakennuksen, jos liitännäiset tai FileProvider puuttuvat. **Puhelintesti:** pelaa maanantai loppuun (tai mikä tahansa päivä), paina kuitin alla *Save as picture*. Androidin jakovalikon pitää aueta kuitin kuvan kanssa. Jos valikon sulkee, napin teksti palaa ennalleen. Jos jokin vaihe epäonnistuu, nappi kopioi tekstin kuten ennen (*Copied. Paste it anywhere.*).

Vastaavat vaiheet käsin:

```bat
cd /d C:\RSD
node tools\build.cjs
npm test
npm run android:sync
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
cd android
gradlew.bat assembleDebug lintDebug
cd ..
node tools\package-apk.cjs
```

Jos teet vaiheet käsin, jatka seuraavaan vain edellisen onnistuttua. Alkuperäinen Gradlen tulos on `android\app\build\outputs\apk\debug\app-debug.apk`. Android Studiossa avattava kansio on `C:\RSD\android`; sen saa auki myös komennolla `npm run android:open`.

## Tarkistettu 0.41:ssä

- `npm test`: 180 maanantain reittiä, 12 koko tarinan ajoa, tallennus/jatkaminen, kolme baaritarinaa, osaotsikot, loppukuva, tauot, äänen elinkaari ja napit.
- Selaimessa 13 muuttuneen/tärkeän tilan asettelu ko'oilla 640×360, 740×360, 844×390, 915×412 ja 1024×480, normaalilla ja suurella tekstillä. Yhteensä 130 tarkistusta. Ei sivun/paneelin ylivuotoa, ulkopuolisia valintanappeja tai alle 43 px painikkeita tarkistetuissa tiloissa. Lomake, allekirjoitus, osaotsikko ja loppukuva tarkistettiin myös kuvasta.
- Android-projektin 13 pelitiedostoa vastaavat lähdettä. Fontit, otsikkomusiikki, kuvat ja peli pakataan mukaan; kehityspalvelimen osoitetta ei ole sovelluksessa. `tools/visual-review.html` jää paketin ulkopuolelle.
- `assembleDebug` ja `lintDebug` onnistuvat: sovelluksen lint-raportissa 0 virhettä, 20 varoitusta. Varoitukset eivät estä testipaketin rakentamista.
- Valmiin APK:n ZIP-sisältö tarkistettu: kaikki 13 pelitiedostoa vastaavat `www/`:tä, App-liitännäinen on mukana eikä kehityssivua ole paketissa. `aapt`: 0.41.0 / versionCode 41000, minSdk 23, targetSdk 35. `apksigner verify`: v1- ja v2-allekirjoitukset kelpaavat. Koko 10 869 852 tavua.
- SHA-256: `a1b5f835d241c0ea77d993f9c8bfc70017aebf1a30de1fa76b7732bd313cc9fb` (myös APK:n vieressä olevassa `.sha256`-tiedostossa).

**0.41:tä ei ole pelattu oikealla Android-puhelimella eikä iPhonella.** Selaimen kokotesti ei varmista Samsungin WebView'tä, kameralovea, äänenvoimakkuutta tai fyysisiä kosketuksia. Tässä kierroksessa ei tehty 0.41:n emulaattoriläpipeluuta.

## Joonaksen S23 Ultra -kokeilu

1. Aloita uusi peli. Tuntuuko Part One selkeältä, ja toimiiko yhden kosketuksen tekstin paljastus?
2. Kokeile valikosta **Text: large**, **Less motion** ja tauko. Paina pitkään pitokohtauksessa, kokeile myös useita napautuksia.
3. Käy toisessa sovelluksessa ja palaa. Äänen pitää hiljentyä taustalla, paluun ja Androidin takaisin-eleen toimia hallitusti.
4. Sulje peli välihetken aikana ja avaa uudelleen. **Continue** palaa kyseisen hetken alkuun, ei täsmälleen viimeiseen repliikkiin.
5. Pelaa loppuun lentotilassa. Kiinnitä huomiota Part Two -siirtymään, lomakkeen allekirjoitukseen, Quiet.-hetken tunnelmaan sekä loppukuvan tilaan.

Jos löytyy vika, hyödylliset tiedot ovat kohtauksen nimi, viimeinen näkyvä repliikki, valittu tekstikoko ja Android-versio. Tarinan palaute on yhtä tärkeää: missä naurahdit, missä teki mieli ohittaa tekstiä, ja miltä helpompi päivä tuntui.

## Projektin ylläpito

- Pelikoodi: `src/NN-name.js` → `node tools/build.cjs` → `assets/game.js`.
- `npm run android:sync` tekee `www/`:n, Capacitor-synkronoinnin, natiivikorjaukset ja tarkistuksen. `npm run android:check` vertaa projektin pakattavia tiedostoja; se ei yksin todista valmiin APK:n sisältöä.
- Natiivimuutokset tehdään `tools/android-patch.cjs`:ään. `GameApp.java` piilottaa järjestelmäpalkit ja sallii kameraloven alueen käytön. Vaakasuuntana on `sensorLandscape`, WebView-minimi 108. Reunan pyyhkäisy saa tuoda järjestelmäpalkit esiin.
- Kuvakkeiden lähteet ovat `resources/`:ssa. `npm run android:icons` generoi Androidin koot. Kuvakkeita ei tässä kierroksessa vaihdettu.
- Julkaisun allekirjoitettu AAB ja Play Console eivät kuulu tähän testikierrokseen.

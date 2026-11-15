# Really Small Deal GitHubiin

15.11.2026 · Claude. Peli on pelkkää HTML:ää, CSS:ää ja JavaScriptiä ilman käännösvaihetta, joten GitHub Pages voi tarjoilla sen sellaisenaan. Kaverisi saa suoran linkin.

En voinut luoda repoa puolestasi (istunnollani ei ole siihen oikeutta), mutta kaikki muu on valmiina. Alla olevat komennot vievät noin minuutin.

## 1. Luo repo ja työnnä koodi

Avaa pääte kansiossa `C:\RSD`.

```
git init -b main
git add .
git commit -m "Really Small Deal 0.18"
```

Jos sinulla on GitHub CLI:

```
gh repo create really-small-deal --public --source=. --remote=origin --push
```

Jos ei, luo tyhjä repo osoitteessa https://github.com/new nimellä `really-small-deal` (älä lisää README:tä tai .gitignorea, ne ovat jo kansiossa) ja aja sitten:

```
git remote add origin https://github.com/JoonasHuhta/really-small-deal.git
git push -u origin main
```

## 2. Kytke GitHub Pages päälle

Repossa: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, kansio `/ (root)` → Save.**

Noin minuutin kuluttua peli on osoitteessa:

```
https://joonashuhta.github.io/really-small-deal/
```

Tämä on linkki, jonka annat kaverillesi. Se toimii puhelimella ja tietokoneella, eikä vaadi kirjautumista. Tarkistin, että peli toimii alikansiosta tarjoiltuna: kaikki polut ovat suhteellisia, fontit latautuvat eikä yksikään pyyntö epäonnistu.

## 3. Myöhemmät päivitykset

```
git add -A
git commit -m "Mitä muuttui"
git push
```

Pages päivittyy itsestään noin minuutissa. Muista ajaa `node tools/build.cjs` ennen committia, jos olet muokannut kansiota `src/`. `npm test` tarkistaa sen puolestasi.

## Mitä repoon ei mene

`.gitignore` jättää pois:

- `node_modules/`, `www/` ja Androidin käännöskansiot (syntyvät komennoista)
- **`research/awa-source/`** — nämä ovat Adventures with Anxiety -pelin käsikirjoituksesta tehtyjä muistiinpanoja. Ne ovat toisen tekijän tekstiä, joten ne pysyvät koneellasi eivätkä mene julkiseen repoon. Muu `research/`-kansio (omat prototyypit ja kuvakaappaukset) menee mukaan.

## Lisenssi

Repossa ei ole lisenssitiedostoa, joten oletuksena kaikki oikeudet jäävät sinulle eikä kukaan saa käyttää koodia uudelleen. Tämä on järkevä oletus keskeneräiselle pelille. Jos haluat myöhemmin sallia uudelleenkäytön, lisää `LICENSE`-tiedosto.

Fontit Fraunces ja DM Sans ovat Open Font Licensen alaisia, ja niiden lisenssitekstit ovat mukana kansiossa `assets/fonts`. Ne saa jakaa näin.

## Jos haluat myöhemmin piilottaa muistiinpanot

Valitsit yhden julkisen repon, jossa on kaikki. Jos suunnittelumuistiinpanot alkavat tuntua liian avoimilta, sama kuvio kuin aukeama-projektissasi toimii tässäkin: tämä repo yksityiseksi ja erillinen julkinen repo, johon kopioidaan vain `npm run www` -komennon tuottama `www/`-kansio. Se on 880 kt ja sisältää vain pelattavan version.

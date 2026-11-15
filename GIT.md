# Really Small Deal GitHubissa

15.11.2026 · Claude.

## Valmista

- **Repo:** https://github.com/JoonasHuhta/really-small-deal (julkinen)
- **Peli selaimessa:** https://joonashuhta.github.io/really-small-deal/

Tämä on linkki, jonka annat kaverillesi. Se toimii puhelimella ja tietokoneella eikä vaadi kirjautumista. Avasin sivun ja aloitin pelin: intro pyörii, fontit latautuvat eikä konsolissa ole virheitä.

Repossa on 60 tiedostoa, noin 4 Mt: peli, lähdeosat, testit, työkalut, Android-pohja ja suunnitteludokumentit.

## Yhdistä oma kansiosi repoon

Tämä on tärkeä askel. Työnsin koodin omasta kopiostani, joten `C:\RSD` ei ole vielä git-repo. Aja siellä kerran:

```
git init -b main
git remote add origin https://github.com/JoonasHuhta/really-small-deal.git
git fetch origin
git reset --mixed origin/main
git status
```

`git reset --mixed` ei koske tiedostoihisi: se vain kertoo gitille, että kansiosi vastaa repon tilaa. `git status` näyttää sen jälkeen, jos jokin eroaa. Tämän jälkeen `C:\RSD` on normaali työkopio, ja sekä sinä, Codex että minä muokkaamme samaa repoa.

## Päivitykset

```
git add -A
git commit -m "Mitä muuttui"
git push
```

Pages päivittyy itsestään noin minuutissa. Aja `npm test` ennen committia: se tarkistaa myös, että `assets/game.js` vastaa kansiota `src/`.

## Mitä repoon ei mene

`.gitignore` jättää pois:

- `node_modules/`, `www/` ja Androidin käännöskansiot (syntyvät komennoista)
- **`research/awa-source/`** — nämä ovat muistiinpanoja Adventures with Anxiety -pelin käsikirjoituksesta. Ne ovat toisen tekijän tekstiä, joten ne pysyvät koneellasi eivätkä mene julkiseen repoon. Muu `research/`-kansio (omat prototyypit ja kuvakaappaukset) on mukana.

## Lisenssi

Repossa ei ole lisenssitiedostoa, joten oletuksena kaikki oikeudet jäävät sinulle eikä kukaan saa käyttää koodia uudelleen. Tämä on järkevä oletus keskeneräiselle pelille. Jos haluat myöhemmin sallia uudelleenkäytön, lisää `LICENSE`-tiedosto.

Fontit Fraunces ja DM Sans ovat Open Font Licensen alaisia, ja niiden lisenssitekstit ovat mukana kansiossa `assets/fonts`. Ne saa jakaa näin.

## Jos muistiinpanot alkavat tuntua liian avoimilta

Valitsit yhden julkisen repon, jossa on kaikki. Sama kuvio kuin aukeama-projektissasi toimii tässäkin: tämä repo yksityiseksi ja erillinen julkinen repo, johon kopioidaan vain `npm run www` -komennon tuottama `www/`-kansio. Se on 880 kt ja sisältää vain pelattavan version.

## Kaverille

> Pieni peli selaimessa, noin 45 minuuttia: https://joonashuhta.github.io/really-small-deal/
>
> Pelaat varjoa, joka yrittää suojella ihmistään torjutuksi tulemiselta. Se on huono siinä. Kerro missä kohtaa naurahdit ja missä kohtaa et.

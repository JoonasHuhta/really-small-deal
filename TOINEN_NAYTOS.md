# Toinen näytös: hiljaisuus. Toteutusohje

16.11.2026 · päätetty (Joonas + Claude) · kirjoitettu niin, että Codex tai kuka tahansa voi toteuttaa tämän ilman aiempaa keskustelua. Lue ensin [AGENTS.md](AGENTS.md) (työtavat) ja [SUUNTA.md](SUUNTA.md) (linja). Pelin tekstit ovat englantia, dokumentit suomea.

## 0. Tila: ensimmäinen versio pelissä (0.35–0.36, Claude 16.11.2026)

Kaikki neljä hetkeä, järjestys, perjantain kolme muutosta ja testit 1–6 ovat pelissä (`src/49-second-act.js`). Pelattavissa tarinassa ja Scenario labissa. **Ei pelattu oikealla laitteella eikä kenenkään muun kuin testiajurin toimesta.**

Poikkeamat tästä ohjeesta, ja mitä jäi tekemättä (seuraavalle tekijälle):

| Ohjeessa | Toteutettu | Jäljellä |
|---|---|---|
| `G.morko.away`, `alpha` | Poissaolo on `M.asleep=true` (seinähahmo sulaa tavalliseksi lattiavarjoksi, sama mekaniikka kuin pelin alussa). Haalistuminen allekirjoittaessa on `M.dim`. Apurit `shadowAway()`, `shadowBack(s)`. | – |
| tavallinen varjo seinällä, joka toistaa asennon | tehty 0.36: `plainShadow()`, lippu `G.plain` | – |
| `morko.pose='sit'` | tehty 0.36.2: reidet ja polvet `morkoBody`-funktiossa | – |
| kotimatka autoineen *Quiet.*-hetkessä | kertojan kaksi riviä | oikea kävelykohtaus ilman summia |
| paperikuitti 1.0 | tehty 0.36: `quietReceipt()` piirtää paperin, ja viikon kuitissa on oma rivi | – |
| lampun napautus lampun kohdalta | napautus mihin tahansa ruudulla tai nappi *Turn on the lamp* | – |
| Q3:n kolmas vaihtoehto | ”Ask them to define “ended”.” | – |

Kuvitus on ensimmäinen versio: odotushuone, lomake, pyykkikori, lattialla istuva ihminen ja keittiön pöytä ovat yksinkertaisia. Äänet käyttävät vanhoja tehosteita.

## 1. Mitä tehdään ja miksi

Tarinasta puuttuu jakso **ilman Ekskyysmiä**. Nyt kaari on loiva: torstai-ilta on pohja ja perjantai sovinto. Lisätään neljä lyhyttä hetkeä torstain ja perjantain väliin:

1. ***Nothing.*** Isku ilman lähettäjää. Ihminen istuu lattialle. Ei ole mitään, mitä vastaan suojella.
2. ***The form.*** Vastaanotto. Ekskyysmi täyttää lomakkeen, joka kertoo ensimmäistä kertaa hänestä, ja allekirjoittaa oman poissaolonsa tietämättään.
3. ***Quiet.*** Päivä ilman varjoa. Kaikki onnistuu. Jotain puuttuu. (Valevoitto.)
4. ***Evenings.*** Ihminen sytyttää lampun. Varjo palaa, pienenä ja epävarmana. ”I’ve gone part-time.”

Kaksoiskaari: **torstaina Ekskyysmi hyväksyy ihmisen iskut** (”I could stay”, on jo pelissä). ***Evenings*-hetkessä ihminen hyväksyy Ekskyysmin** (sytyttää lampun). Perjantai on todiste molemmista.

> Korjaus aiempaan keskusteluun: ”I could stay” on torstain luvussa (`scThu`), ei perjantaissa, ja kolme torstain jälkeistä hetkeä (*The reply*, *Not now.*, *A quiet drink.*) nojaa siihen. Sitä **ei siirretä**. Uusi näytös ei toista lausetta vaan vastaa siihen toiselta puolelta.

## 2. Kolme sääntöä, joista ei tingitä

1. **Lääkettä ei nimetä, diagnoosia ei sanota, sairaalaa ei näytetä.** Sanat *ADHD, autism, medication, pill, diagnosis, doctor, therapy, prescription* eivät esiinny pelin tekstissä (testi varmistaa). On lomake, yksi pieni valkoinen esine keittiön pöydällä ja katsojan oma päättely.
2. **Lääke ei ole roisto, eikä lopettaminen ole onnellinen loppu.** Hiljaisuus on aidosti helpotus (kuitissa lukee 1.0) *ja* jotain puuttuu. Peli ei kerro, mitä ihminen tekee asialle. Varjo palaa iltaisin, kun vaikutus hiipuu, ja ihminen kutsuu hänet sytyttämällä lampun. Kukaan ei sano, kumpi on parempi.
3. **Ei pilkkaa oireesta, ei neuvoja.** Lomakkeen kysymykset ovat keksittyjä. Älä kopioi oikeiden seulontalomakkeiden (ASRS, AQ tms.) sanamuotoja.

## 3. Uusi järjestys

Muutos on yksi rivi tiedostossa `src/33-moments.js`:

```js
4:['reply','notnow','bar','nothing','form','quiet','evenings'],
```

| Kohta | Hetki | Tila |
|---|---|---|
| luku 4 | *Seen.* (torstai): ”I could stay.” | ennallaan |
| | *The reply*, *Not now.*, *A quiet drink.* | ennallaan |
| **uusi** | ***Nothing.*** | pohja |
| **uusi** | ***The form.*** | käänne |
| **uusi** | ***Quiet.*** | valevoitto |
| **uusi** | ***Evenings.*** | paluu |
| luku 5 | *Oh, hi. Again.* (perjantai) | kolme pientä muutosta, ks. 4.5 |
| | *The group chat* | ennallaan |

Lukujen numerot (1–5) eivät muutu, joten tallennukset pysyvät ehjinä. Hetket ovat samaa tyyppiä kuin nykyiset välihetket: `LABS`-merkintä, `labScene(...)`, `WHEN`-aikamerkintä, ja ne näkyvät myös Scenario labissa.

`WHEN`-merkinnät: `nothing:'A SUNDAY, LATE AFTERNOON'`, `form:'A WEEKDAY, 14:10'`, `quiet:'THE FIRST MORNING'`, `evenings:'THE SAME DAY, 21:00'`.

## 4. Hetket

Merkinnät: `S` Ekskyysmi, `H` ihminen, `A` Sanna, `Z` Sannan varjo, `N` kertoja. Repliikit ovat lopullista tekstiä, ellei toisin sanota. Ilmeet ja korostukset: `{look:'…'}`, `{loud:1}`, `{quiet:1}`, `aside([...])`.

### 4.1 Nothing.

**Tarkoitus:** RSD ei ole aina hylkäämistä. Joskus aivot päättävät, että nyt sattuu, eikä kukaan ole sanonut mitään. Ekskyysmin koko ammattitaito on etsiä syyllinen, ja nyt syyllistä ei ole.

**Lavastus:** `labScene({set:'home',clock:16*3600+40*60,title:'Nothing.',plan:'Fold the laundry.'})`. Ihminen kantaa pyykkikoria. Ei puhelinta (`G.phoneN=0`), ei muita ihmisiä.

**Käsikirjoitus:**

```
N: A Sunday. Laundry. Nobody has said anything all day.
[1,5 s hiljaisuutta. Sitten täysi isku: jolt(...) + hit, sama röntgen kuin muualla. Ei laukaisinta.]
S: Who was that?                          {loud:1}
H: Nobody.
S: Somebody SAID something.
H: Nobody’s here.
[lensPeek sohvaan: tag “SOFA: NOTHING TO DECLARE.”]
[lensPeek pyykkikoriin: tag “BASKET: SOCKS. ODD NUMBER.”]
S: The sofa has an alibi.                 {look:'squint'}
S: Check the phone.
H: It’s in the other room.
S: Then it came from INSIDE.
[Ihminen laskee korin ja istuu lattialle. Uusi asento: human.pose='floor' (istuu, polvet koukussa, selkä sohvaa vasten).]
S: Get up. We can’t be found like this.
H: By whom?
S: …
S: I don’t have a form for this. There’s no sender.
H: There doesn’t have to be one.
S: Then what do I DO?
H: Sit down.
[Ekskyysmi istuu. Ensimmäistä kertaa pelissä. Uusi asento: morko.pose='sit'. Istuessaan hän on yllättävän pieni (s≈0.8).]
{hold:{kind:'still',secs:5,clock:1,text:'Sitting. No cause. No verdict. Sitting.'}}
outside({title:'WHAT THE CALENDAR SAW',dur:'duration: 4 minutes',cap:'Someone sat on the floor next to a laundry basket.',anim:'text'})
S: …It’s gone.
H: It does that.
S: We didn’t fix anything.
H: No.
S: I’d like to file a complaint. About the absence of a cause.
H: With whom?
S: That’s the complaint.                  aside
H: I’m going to ring someone tomorrow.
S: About the sofa?
H: About this.
S: …I’ll bring the forms.                 {look:'soft'}
```

**Kuitti:** `addLived('a hit with no sender',45)`.

**Vaarakohta:** pelin haavoittuvin kohtaus. Vitsi ei koskaan kohdistu lattialla istuvaan ihmiseen. Ei musiikkia, ei ruudun tärinää pidon aikana.

### 4.2 The form.

**Tarkoitus:** Ekskyysmi rakastaa lomakkeita. Tämä on ensimmäinen, joka kuvaa hänet. Hän on imarreltu, sitten epävarma, ja allekirjoittaa, koska allekirjoittaa kaiken.

**Lavastus:** uusi tausta `set:'clinic'`: odotushuone, kaksi tuolia, kasvi, ovi, ei ihmisiä näkyvissä, ei ristejä eikä valkoisia takkeja. Kello 14:10. Lomake piirretään paperina ruudun oikeaan laitaan samalla tavalla kuin viestiluonnos (`drawDraft`) tai kuitti: otsikko ”ABOUT YOU”, 18 numeroitua riviä, joista neljä luetaan.

**Vuorovaikutus:** jokaisessa kysymyksessä on `choice`, jossa on kolme ruutua. Pelaaja valitsee, mutta ihminen rastittaa sen, minkä itse tietää todeksi. Viimeisessä kohdassa `hold` on allekirjoitus.

**Käsikirjoitus:**

```
N: A waiting room. A clipboard. Eighteen questions.
S: A form! Finally. Somebody professional.   {look:'pleased'}
S: Give it here. I’ll do the boxes.

[Q3 paperilla: “How often do you replay a conversation after it has ended?”]
  > Never.            S: We can’t tick that. They’d check.
  > Sometimes.        S: “Sometimes.” Modest. I like it.   H: [rastittaa “Very often”]   S: …That’s not what I said.
  > Define “ended”.   S: Exactly. Write that in the margin.   H: [rastittaa “Very often”]
S: Fine. “Very often.” It’s a strength.

[Q7: “Do small remarks stay with you longer than you would like?”]
S: Longer than I’d LIKE? I like having them. I’ve had some since 2011.   {look:'pleased'}
H: [rastittaa]
S: You didn’t even ask me.
H: I didn’t need to.

[Q11: “Do you prepare for outcomes that do not occur?”]
S: …
S: That’s me. They’ve described ME.          {look:'stunned'}
H: It’s a list of difficulties.
S: It’s a job description.                    aside
S: How do they KNOW? Has someone been talking?
H: Nobody’s been talking.
S: Then I’m… common?
H: Common enough to have a form.
S: …I thought I was bespoke.                  {quiet:1}

[Q18: “Does this cause problems in your daily life?”]
S: Problems? I PREVENT problems. Tick “no”.   {loud:1}
  > Tick “no”.        [ihminen ei liikuta kynää]   S: Go on.   H: [rastittaa “yes”]
  > Tick “no”. Firmly. [sama]
  > Look at him.      S: …What?   H: [rastittaa “yes”]
S: You ticked yes.
H: It’s been a long week.
S: A WEEK. …
H: A long year.
S: …Be accurate.                              {quiet:1}

[Paperin alareuna: viiva ja sana “Signature”.]
S: I’ll sign. I sign everything. It’s the best part.   {look:'pleased'}
{hold:{kind:'sign',secs:3,text:'Signing.'}}
[Pidon aikana Ekskyysmi piirtää allekirjoituksen (koukeroinen “E.”) ja haalistuu samalla: alpha 1 → 0.55. Hän ei huomaa.]
S: There. All in order.
S: …Why is it so bright in here?
outside({title:'WHAT THE CALENDAR SAW',dur:'duration: 40 minutes',cap:'An appointment. A form with eighteen questions. A small paper bag.',anim:'text'})
```

**Uutta moottoriin:** `hold`-laji `'sign'` (sama mekaniikka kuin `'still'`, eri piirros), tausta `clinic`, lomakkeen piirto (`G.form={q:…,ticks:[…]}`), `G.morko.alpha`.

### 4.3 Quiet.

**Tarkoitus:** valevoitto. Kaikki on oikeasti helpompaa. Pelaaja huomaa itse, mitä puuttuu: häntä itseään ei tarvita.

**Lavastus ja säännöt koko hetken ajan:**

- `G.morko.away=true`: Ekskyysmiä ei piirretä, hänellä ei ole kuplaa, eikä `S`-rivejä ole yhtään.
- Ihmisellä on **tavallinen varjo**: harmaa, silmätön siluetti seinällä, joka toistaa ihmisen asennon täsmälleen. Kun ihminen nostaa kupin, se nostaa kupin.
- Ensimmäinen kuva: keittiön pöytä (`set:'home'`, kello 7:40), lasi vettä ja sen vieressä yksi pieni valkoinen esine. Ei tekstiä. 2,5 s. Sitten toimisto, sama huone ja sama kahvi kuin maanantaina (`clock:8*3600+52*60`).
- **Pelaajalla ei ole ketään, jota pelata.** Uusi askel `{auto:{opts:[…],pick:n,secs:1.8}}`: valintalaatikko aukeaa kuten aina, mutta napit ovat harmaita, ja valinta tehdään itsestään ennen kuin pelaaja ehtii. Vihjerivi: ”Nothing to do. It’s handled.” Pelaajan ainoa toiminto on Continue.
- Ei iskuja, ei röntgeniä, ei kameran nojausta (`G.bick=0`), ei korostuksia. Musiikki: ei mitään.
- Puhujan paneeli näyttää Ekskyysmin värisen tyhjän rivin kolmessa kohdassa, joissa hän olisi sanonut jotain: nimi ”EKSKYYSMI” ja teksti ”—”. Kuplaa ei piirretä.

**Käsikirjoitus:**

```
N: Monday. 8:52. The same room. The same coffee.
[ihminen kävelee sisään. Kupin korva on väärinpäin. Hän ei käännä sitä.]
A: oh, hi.
[ei iskua. 1,2 s.]
S: —
H: Hi. Lunch today?
A: Sure!
{auto:{opts:['Go to lunch.','Go to lunch.','Go to lunch.'],pick:0,secs:1.8}}
N: It took four seconds.

[Riitta kulkee ohi.]
R: Not now.
H: Okay.
S: —
N: It took one second.

[Eero.]
B: Could you take my Thursday shift?
{auto:{opts:['No.','No.','No.'],pick:1,secs:1.8}}
H: No. Sorry.
B: Fair enough!
N: Nobody rehearsed anything.

[Lounas. Sanna ja ihminen pöydässä. Keskustelu sujuu.]
A: You seem… well.
H: I am. I think.
A: You didn’t apologise to the chair.
H: Should I have?
A: No. …It was sort of your thing.
[Sannan varjo ilmestyy seinälle (G.zT=1). Se katsoo ihmisen varjoa, joka on vain varjo. Sitten se katsoo ympärilleen.]
Z: …Where’s yours?
[Kukaan ei vastaa. Ihminen ei kuule sitä. Sannan varjo jää katsomaan tyhjää kohtaa seinässä.]
A: Same time tomorrow?
H: Same time.

[Kotimatka. Sama katu, samat autot.]
[tic: “KIV-304” … “ROS-151”. Ei summia. Ihminen ei pysähdy.]
N: Two sevens. Nobody counted.

[Koti. Ilta. Ihminen seisoo keskellä huonetta. Katsoo seinää.]
H: For the record.
[1,5 s.]
H: …
N: Nobody objected.
```

**Kuitti (hetken lopussa, sama paperi kuin maanantain kuitti):**

```
RECEIPT · A QUIET MONDAY
days on the calendar        1
days lived                1.0
------------------------------
rehearsals                  0
verdicts                    0
exhibits examined           0
“for the record”            1   (unanswered)
number plates added up      0
things noticed              0
------------------------------
It all went fine.
```

Tämä on pelin ainoa kuitti, jossa lukee 1.0. Toteutus: `G.mult=1` koko hetken ajan eikä yhtään `addLived`-kutsua. Tarkista, että `closeDay()`/`receiptRows()` tulostaa kuitin myös päivästä, jossa ei ole iskuja (nyt lähes tyhjä päivä korvataan, ks. `newDay()` tiedostossa `src/35-inside.js`).

### 4.4 Evenings.

**Tarkoitus:** ihmisen puolikas kaksoiskaaresta. Hän ei valitse hiljaisuuden ja varjon välillä. Hän sytyttää lampun.

**Lavastus:** `set:'home'`, kello 21:00, huone hämärä (lamppu sammuksissa, vain ikkunan valo). `G.morko.away=true` alussa.

**Vuorovaikutus:** pelin merkityksellisin nappi. Ruudulla on lamppu ja vihje ”The lamp.” Pelaaja napauttaa lamppua tai painaa nappia *Turn on the lamp*. Mitään muuta ei voi tehdä, eikä mikään kiirehdi. (Näppäimistö: välilyönti.)

**Käsikirjoitus:**

```
N: Nine in the evening. It wears off about now.
[Pelaaja sytyttää lampun. Valo leviää. Seinälle piirtyy ensin ihmisen tavallinen varjo, sitten sen viereen pieni, tuttu, epävarma hahmo (s=0.6, mood 'worry').]
S: …Am I allowed?                              {quiet:1}
H: It’s nine. You’re on.
S: I’ve gone part-time?
H: Evenings.
S: Nobody asked me.
H: You signed.
S: I sign EVERYTHING. That’s not consent, that’s a hobby.
[hän kasvaa hieman: s=0.8]
S: What happened today? Without me.
H: Everything went fine.
S: …Oh.                                         {look:'soft'}
H: I asked her to lunch. It took four seconds.
S: Four. I’d budgeted a week.
H: Riitta said “not now”. I said “okay”.
S: And then?
H: And then nothing. That was all of it.
S: That’s terrible.                             {look:'stunned'}
H: Nobody said “for the record”. All day.
S: You could have said it.
H: I did. Once. To the wall.
S: …And?
H: It’s not the same when I do it.
[1,4 s]
S: So I’m not needed.
H: No.
S: …
H: I didn’t turn the lamp on because you’re needed.
S: Then why?
H: It was very quiet.
S: You’re welcome.
H: I missed it.
[hän kasvaa tavalliseen kokoon: s=1]
S: For the record—
H: Go on.
S: —I have several things to say about the lunch.   {look:'pleased'}
H: I thought you might.
S: Four seconds. Did you even REHEARSE?
H: No.
S: Amateur.
[lensPeek pöydälle: tag “EVENINGS: MINE.”]
```

**Kuitti:** `addLived('one evening, annotated',25)`. Lopuksi `easeDay()` on jo voimassa torstailta.

### 4.5 Perjantain kolme muutosta (`scFri`, `src/31-story-week.js`)

1. **Alku.** Nykyinen ensimmäinen rivi säilyy, ja sen jälkeen lisätään:
   ```
   S: Friday. Same room. Same coffee. I’d like to flag that I’m calm.
   H: You’re in early.
   S: I asked for one morning back. A week.
   H: Who did you ask?
   S: …You left the lamp on.                   aside
   H: You’re vibrating.
   ```
   Peli ei kerro, ottiko ihminen sinä aamuna mitään. Lamppu on vastaus.
2. **Sanna.** Rivin ”A: You okay?” jälkeen, ennen ihmisen vastausta:
   ```
   A: There you are.
   H: I’ve been here all week.
   A: Mm. Not quite.
   ```
3. **Sannan varjo.** Kohdassa, jossa `fridayShadow` jo näkyy, sen ensimmäiseksi repliikiksi:
   ```
   Z: Oh. You’re back.
   S: Evenings. And Fridays.
   ```

Muuta perjantaista ei muuteta. Loppurepliikki ”For the record, I intend to go off again on Monday.” / ”I know. I’ll be there.” saa nyt toisen merkityksen itsestään.

## 5. Moottorimuutokset koottuna

| Mitä | Missä | Huomio |
|---|---|---|
| `G.morko.away` | `src/70-draw.js` (`morkoBody`, `morkoArms`, `morkoFace`, S-kupla), `src/60-update.js` | kun tosi: ei piirretä, ei kuplaa, ei kameran nojausta. Nollataan `scene()`-funktiossa. |
| `G.morko.alpha` | sama | 0–1, käytetään allekirjoituksessa ja paluussa |
| tavallinen varjo | `src/40-backdrops.js`, uusi `plainShadow()` | piirretään kun `away`; toistaa ihmisen asennon, ei silmiä |
| asennot `human.pose='floor'`, `morko.pose='sit'` | `src/70-draw.js` | |
| askel `{auto:{opts,pick,secs}}` | `src/20-engine.js` (`run`, `render`) | harmaat napit, valinta itsestään, vihjerivi |
| `hold`-laji `'sign'` | `src/20-engine.js`, `src/70-draw.js` | |
| lampun napautus | uusi askel `{lamp:true}` tai `hold` | `WAIT='lamp'`, canvas-napautus lampun kohdalla tai paneelin nappi |
| tausta `clinic`, lomake `G.form` | `src/40-backdrops.js`, `src/70-draw.js` | |
| tyhjä S-rivi `['S','—']` hetkessä *Quiet.* | `src/20-engine.js` | paneeliin kyllä, kuplaa ei |
| neljä skriptiä | uusi tiedosto `src/49-second-act.js` | Rakennus hyväksyy vain muotoa `NN-nimi.js` olevat tiedostot. Funktiot nostetaan (hoisting), joten järjestyksellä ei ole väliä, kunhan tiedosto ei aja mitään ladattaessa. |
| `LABS`-merkinnät ja `WHEN` | `src/50-lab.js`, `src/33-moments.js` | |

## 6. Testit (`tests/story.test.cjs`)

Lisää ja pidä vihreänä (`npm test`):

1. `playLab('nothing')`: sisältää ”The sofa has an alibi.”, päättyy ilman virhettä, `T.G.morko.pose==='sit'` jossain vaiheessa.
2. `playLab('form')`: kaikilla kolmella valinnalla Q18 päätyy ihmisen rastiin ”yes”; loppu sisältää ”All in order.”
3. `playLab('quiet')`: **yhtään S-riviä, jonka teksti ei ole ”—”**, ei yhtään `hit`-kutsua, kuitissa ”days lived” 1.0, `T.state()` ei koskaan ole `'choice'` (vain `'auto'`).
4. `playLab('evenings')`: `T.G.morko.away===false` lopussa, sisältää ”I missed it.”
5. Koko viikko: järjestys `notnow < nothing < form < quiet < evenings < 'Friday. Same room.'`.
6. **Kielletyt sanat:** koko käsikirjoituksen transkriptissa ei esiinny (kirjainkoosta välittämättä) `adhd`, `autis`, `medicat`, `pill`, `diagnos`, `doctor`, `therap`, `prescri`.
7. Vanhat testit ennallaan, erityisesti tallennuksen jatkaminen kesken luvun.

Testiajuriin (`playLab` ja kaksi muuta silmukkaa) uudet tilat: `case 'auto': T.tick(3); break;` ja `case 'lamp': T.advance(); break;`.

## 7. Työjärjestys (yksi commit per kohta, testit vihreinä joka välissä)

1. Moottori: `away`, `alpha`, `plainShadow`, asennot. Ei vielä käsikirjoitusta.
2. *Nothing.* + testi 1.
3. *The form.* (tausta, lomake, `sign`) + testi 2.
4. `{auto}` + *Quiet.* + kuitti 1.0 + testi 3.
5. Lamppu + *Evenings.* + testi 4.
6. `AFTER`-rivi, perjantain kolme muutosta, testit 5 ja 6.
7. Kuvakaappaustarkistus: jokainen hetki 960×540 ja puhelinkoossa 740×360.
8. Dokumentit: `README.md` (versiomerkintä 0.35), `KASIKIRJOITUS.md` (Rakenne-taulukko), `SUUNTA.md` (5b → tehty), `SEURAAVAKSI.md`.

Arvio pituudesta: 3 + 4 + 4 + 3 = noin 14 minuuttia lisää.

## 8. Avoimet kohdat (päätä toteuttaessa, kirjaa ratkaisu tähän)

- *Quiet.*: näytetäänkö kuitti heti hetken lopussa vai vasta viikon lopun kuitissa omana rivinään? Ehdotus: molemmat.
- *The form.*: riittääkö neljä kysymystä? Jos kohtaus tuntuu pitkältä, Q7 on ensimmäinen karsittava.
- Tarvitaanko Scenario labiin varoitus, että *Quiet.* on tarkoitettu pelattavaksi tarinan osana? Ehdotus: blurb ”Best in the story. Nothing happens, and that is the point.”

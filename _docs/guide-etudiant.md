---
title: "Guide étudiant"
description: "Créer ton site, le remplir et le faire vivre toute l'année, étape par étape."
section: "Guides"
nav_order: 1
---

Ce guide t'accompagne **à chaque étape**, de la création de ton site jusqu'à sa mise à jour en fin d'année.
Il suit la même logique que l'atelier [Méthodologie de projet](https://doc.makerspace-amiens.fr/workshops/methodologie-de-projet/) : on documente **au fil de l'eau**, pas la veille du rendu.

## 1. Comprendre comment marche ton site

- Tu écris des fichiers **Markdown** (`.md`) et quelques fichiers de **données** (`.yml`).
- **GitHub Pages** transforme automatiquement ces fichiers en site web avec **Jekyll**, à chaque modification.
- L'apparence (couleurs, menus, cartes, radar…) vient du **thème MakerSpace**, appelé par une ligne de `_config.yml`. Tu n'as **pas** de HTML ni de CSS à écrire.

```
_config.yml          ← ton identité + réglages (étape 3)
index.md             ← page d'accueil
about.md             ← « Qui suis-je »
_data/cv.yml         ← ton CV
_data/competences.yml← tes compétences (radar)
_data/navigation.yml ← menu du haut
_projets/            ← 1 fichier = 1 projet (carte)
_posts/              ← 1 fichier = 1 news / entrée de journal
_docs/               ← 1 fichier = 1 page de documentation
assets/              ← images, CV PDF, modèles 3D, fichiers KiCad
```

**Le front matter** : chaque page commence par un bloc entre `---` qui contient ses réglages (titre, date, compétences…). Le texte de la page vient en dessous.

```markdown
---
title: "Mon titre"
competences: [C2, C3]
---

Le contenu de la page, en Markdown.
```

> Besoin d'un rappel de syntaxe ? Voir le tutoriel [Syntaxe Markdown](https://doc.makerspace-amiens.fr/workshops/methodologie-de-projet/tutorials/syntaxe-markdown/).

---

## 2. Créer ton site à partir du modèle

1. Connecte-toi à [GitHub](https://github.com) (crée un compte si besoin, avec un pseudo professionnel : il apparaîtra dans l'adresse de ton site).
2. Ouvre le dépôt modèle : **`Makerspace-Amiens/portfolio-template`**.
3. Clique sur **Use this template → Create a new repository**.
4. Nomme le dépôt :
   - **`pseudo.github.io`** (recommandé) → ton site sera à `https://pseudo.github.io/`
   - ou un autre nom, par exemple `portfolio` → ton site sera à `https://pseudo.github.io/portfolio/`
5. Laisse le dépôt **Public**, puis **Create repository**.
6. Active le site : **Settings → Pages → Build and deployment → Source : Deploy from a branch**, branche **`main`**, dossier **`/ (root)`**, puis **Save**.
7. Attends 1 à 2 minutes. L'onglet **Actions** montre la construction (rond orange = en cours, coche verte = OK, croix rouge = erreur → voir [Dépannage](#12-dépannage)).
8. L'adresse de ton site s'affiche en haut de **Settings → Pages**. Ajoute-la dans la description du dépôt (roue dentée à droite de « About »).

---

## 3. Personnaliser ton identité (`_config.yml`)

Ouvre `_config.yml` sur GitHub (icône crayon ✏️) et modifie :

| Champ | Quoi mettre |
|---|---|
| `title` | Ton prénom et nom |
| `description` | Une phrase qui te résume (utilisée par les moteurs de recherche) |
| `url` | `https://pseudo.github.io` avec **ton** pseudo |
| `baseurl` | `""` si ton dépôt s'appelle `pseudo.github.io`, sinon `"/nom-du-depot"` |
| `author.name`, `bio`, `formation`, `localisation` | Tes informations |
| `author.avatar` | Chemin de ta photo (dépose-la dans `assets/images/`, ex. `/assets/images/photo.jpg`) |
| `author.links` | Tes liens (GitHub, LinkedIn, mail…). Icônes au choix sur [lucide.dev/icons](https://lucide.dev/icons/) |

⚠️ **Ne modifie pas** les blocs `remote_theme`, `plugins`, `collections` et `defaults`, sauf consigne de l'enseignant.

**Déposer une image** : dans le dossier `assets/images/`, clique sur **Add file → Upload files**. Utilise des noms **sans espaces ni accents** (`photo-profil.jpg`). Réduis les photos à ~1600 px de large maximum.

Valide avec **Commit changes**, avec un message clair (« Personnalisation de l'identité »).

---

## 4. Remplir « Qui suis-je » et ton CV

- **`about.md`** : ton texte de présentation libre (parcours, motivations, projet professionnel).
- **`_data/cv.yml`** : formation, expériences, engagements, langues, outils, centres d'intérêt. Chaque section est une liste d'éléments :

```yaml
sections:
  - titre: "Expériences"
    icon: briefcase
    elements:
      - periode: "Été 2026"
        titre: "Stage technicien"
        organisme: "Entreprise X"
        lieu: "Amiens"
        description: |
          - Ce que j'ai fait
          - Ce que j'ai appris
```

- **CV en PDF** : dépose `cv.pdf` dans `assets/cv/`. Le bouton « Télécharger mon CV » apparaît automatiquement. Si tu n'en veux pas, supprime la ligne `pdf:`.

---

## 5. Ajouter un projet

1. Dans `_projets/`, **Add file → Create new file**.
2. Nomme-le `nom-du-projet.md` (minuscules, tirets, sans accents).
3. Copie ce modèle et complète-le :

```markdown
---
title: "Nom du projet"
description: "Une phrase qui donne envie de cliquer."
date: 2026-11-15
image: /assets/images/mon-projet.jpg   # image de la carte (16:9 idéalement)
icon: bot                              # icône si pas d'image (lucide.dev/icons)
statut: "En cours"                     # En cours / Terminé / En pause
cadre: "Projet I1 — MakerSpace"
equipe: "4 personnes"
tags: [robotique, électronique]        # servent aux filtres de la page Projets
competences: [C2, C3]                  # ids de _data/competences.yml
liens:
  - label: "Dépôt GitHub"
    url: "https://github.com/..."
    icon: github
---

## Contexte
## Mon rôle
## Démarche
## Résultats
## Ce que j'en retiens
```

La carte apparaît automatiquement sur la page **Projets** et, si c'est l'un des 3 plus récents, sur l'**accueil**. Une table des matières est générée à droite à partir de tes titres `##` et `###` (pour la retirer : `toc: false`).

> 💡 Si ton projet a déjà son propre site de documentation (repo issu de *Méthodologie de projet*), ta page projet en fait la **synthèse** et ajoute un lien vers lui dans `liens`.

**Conseil** : la section **« Mon rôle »** est la plus importante. C'est elle qui justifie les compétences que tu associes au projet.

---

## 6. Enrichir tes pages

Toutes ces briques s'utilisent dans n'importe quelle page. La page [Boîte à outils du site]({{ '/docs/boite-a-outils/' | relative_url }}) montre chacune en action.

| Besoin | Code à copier | Outil (doc officielle) |
|---|---|---|
| Encadré | `{% raw %}{% include encadre.html type="astuce" titre="Astuce" texte="..." %}{% endraw %}` | [Bulma — notification](https://bulma.io/documentation/elements/notification/) |
| Icône | `{% raw %}{% include icone.html nom="cpu" %}{% endraw %}` | [Lucide](https://lucide.dev/icons/) |
| Graphique simple | `{% raw %}{% include chart.html type="bar" titre="..." labels="A,B,C" valeurs="1,2,3" legende="..." %}{% endraw %}` | [Chart.js](https://www.chartjs.org/docs/latest/) |
| Graphique multi-séries | `{% raw %}{% include chart.html type="line" donnees="mesures" %}{% endraw %}` + `_data/mesures.yml` | [Chart.js — structures de données](https://www.chartjs.org/docs/latest/general/data-structures.html) |
| Diagramme | bloc de code ` ```mermaid ` | [Mermaid](https://mermaid.js.org/intro/) |
| Modèle 3D | `{% raw %}{% include modele3d.html src="/assets/modeles/piece.glb" titre="..." %}{% endraw %}` | [model-viewer](https://modelviewer.dev/docs/) |
| Schéma / PCB KiCad | `{% raw %}{% include kicanvas.html src="/assets/kicad/carte.kicad_sch" %}{% endraw %}` | [KiCanvas](https://kicanvas.org/) |
| Vidéo | `{% raw %}{% include video.html youtube="ID" %}{% endraw %}` | — |

### Détails utiles

- **Graphiques** : types possibles `bar`, `line`, `pie`, `doughnut`, `radar`, `scatter`, `polarArea`. Option `hauteur=400`. Si tu mets **deux graphiques sur la même page avec le même titre**, ajoute `id="graph2"` à l'un d'eux.
- **Données multi-séries** (`_data/mesures.yml`) :
  ```yaml
  labels: ["3 V", "5 V", "7 V"]
  datasets:
    - label: "Moteur A"
      data: [40, 85, 120]
    - label: "Moteur B"
      data: [35, 80, 125]
  ```
- **Modèles 3D** : model-viewer lit le format **glTF / GLB**, pas le STL ni le STEP. Pour convertir :
  - depuis **Blender** (libre) : *Fichier → Importer STL* puis *Exporter → glTF 2.0 (.glb)* ;
  - depuis **Fusion 360 / Onshape** : export OBJ ou STL, puis conversion dans Blender ;
  - garde des fichiers légers (< 10 Mo) : simplifie le maillage si besoin (modificateur *Decimate* dans Blender).
- **KiCad** : dépose les fichiers `.kicad_sch` et/ou `.kicad_pcb` (KiCad 6 ou plus récent) dans `assets/kicad/`. Pour afficher schéma **et** PCB dans le même cadre : `src="…sch" src2="…pcb"`.
- **Images en Markdown** : `![Description](/assets/images/photo.jpg)`. Si ton site a un `baseurl`, écris plutôt `{% raw %}![Description]({{ '/assets/images/photo.jpg' | relative_url }}){% endraw %}`.

---

## 7. Publier une news ou un journal de bord

1. Dans `_posts/`, crée un fichier nommé **`AAAA-MM-JJ-titre-court.md`** (la date dans le nom est **obligatoire**).
2. Contenu :

```markdown
---
title: "Journal de bord — semaine 3"
description: "Résumé en une phrase."
categories: [journal]          # ou [news]
competences: [C4]              # optionnel : l'article devient une preuve
toc: true                      # optionnel : table des matières à droite
---

## Ce qui a été fait
## Problèmes rencontrés
## Prochaine étape
```

⚠️ Un article daté **dans le futur** ne s'affiche pas avant cette date.

**Rythme conseillé** : une entrée de journal par séance de projet, 10 minutes en fin de séance. C'est la méthode du [journal de bord](https://doc.makerspace-amiens.fr/workshops/methodologie-de-projet/tutorials/journal-de-bord/).

---

## 8. Écrire une page de documentation

Les docs servent à ranger tes tutoriels, fiches techniques et notes : ce que tu as appris et que tu veux pouvoir retrouver ou transmettre.

```markdown
---
title: "Calibrer une imprimante 3D"
description: "Fiche pratique."
section: "Fabrication"     # groupe dans le menu de gauche
nav_order: 20              # ordre dans le menu (plus petit = plus haut)
competences: [C3]          # optionnel
---

## Étape 1
### Détail
```

- Le **menu de gauche** liste toutes les docs, groupées par `section` et triées par `nav_order`.
- La **table des matières** (TOC) à droite est construite automatiquement à partir des titres `##` et `###`. Pour la masquer : `toc: false`.
- Les boutons **précédent / suivant** en bas de page suivent l'ordre `nav_order`.

---

## 9. Renseigner tes compétences

C'est le cœur de la démarche compétence : montrer **où tu en es** et **le prouver**.

Tout se passe dans **`_data/competences.yml`** :

```yaml
competences:
  - id: C3                       # fourni par l'équipe pédagogique, ne pas changer
    nom: "Prototyper et fabriquer"
    court: "Prototypage"         # libellé du radar
    description: "..."
    niveau: 2                    # TON niveau actuel (0 à niveau_max)
    objectif: 3                  # niveau visé (fourni ou fixé avec ton tuteur)
    justification: |
      Pourquoi je m'attribue ce niveau, en m'appuyant sur des faits.
    autres_preuves:              # preuves hors du site (stage, certification…)
      - titre: "Certification sécurité MakerSpace"
        lien: "https://..."
        description: "Formé à la découpeuse laser."
        icon: shield-check
```

**Les preuves automatiques** : chaque projet, article ou doc qui contient `competences: [C3]` dans son front matter apparaît sous la compétence C3. Tu n'as rien d'autre à faire.

**Le radar** se dessine tout seul (trait plein = niveau actuel, pointillés = niveau visé). Cliquer sur un point fait défiler jusqu'à la compétence.

### Bien justifier un niveau

Une bonne justification répond à trois questions :

1. **Qu'ai-je fait ?** Une situation concrète, avec ton rôle personnel.
2. **Comment ?** Les méthodes, outils, choix que tu as faits toi-même.
3. **Qu'est-ce que ça montre ?** Le lien avec le niveau visé, et ce qu'il te reste à travailler.

❌ « Je sais faire de la CAO. »
✅ « J'ai conçu seul le châssis du robot dans Fusion 360 (3 itérations, voir le projet). Je maîtrise les esquisses contraintes et les assemblages ; je dois progresser sur la mise en plan. »

**Sois honnête** : un niveau 1 bien justifié vaut mieux qu'un niveau 4 sans preuve. Le radar doit **progresser** au fil de l'année, c'est ça qu'on regarde.

---

## 10. Travailler en local (optionnel)

Modifier sur GitHub suffit. Pour voir le rendu avant de publier et travailler plus vite :

1. Clone ton dépôt avec **GitHub Desktop** et ouvre-le dans **VS Code** (voir [Git, GitHub Desktop et VSCode](https://doc.makerspace-amiens.fr/workshops/methodologie-de-projet/tutorials/git-github-desktop-vscode/)).
2. Installe Ruby et Jekyll en suivant [Construire son site Jekyll en local](https://doc.makerspace-amiens.fr/workshops/methodologie-de-projet/tutorials/construire-site-local/).
3. Dans le dossier du dépôt :
   ```bash
   bundle install
   bundle exec jekyll serve --livereload
   ```
4. Ouvre <http://localhost:4000> (ajoute ton `baseurl` si tu en as un). La page se recharge à chaque sauvegarde.
5. Quand c'est bon : **commit** puis **push** depuis GitHub Desktop.

---

## 11. Faire vivre ton site toute l'année

| Moment | Ce que tu fais |
|---|---|
| **Séance 1** | Créer le site (partie 2), identité (3), photo, premier article « Bienvenue » |
| **Semaine 2-3** | « Qui suis-je » et CV (4), premier positionnement sur les compétences (9) |
| **Chaque séance de projet** | Une entrée de journal de bord (7), 10 minutes |
| **À chaque jalon de projet** | Mettre à jour la page projet (5), ajouter résultats, photos, graphiques (6) |
| **Quand tu apprends un savoir-faire** | Une page de doc (8) |
| **Avant chaque évaluation** | Relire les compétences : niveau, justification, preuves à jour (9) |
| **Fin d'année** | Statut des projets à « Terminé », CV PDF à jour, bilan dans un article |
| **Avant une candidature (stage, alternance)** | Relecture complète, lien du site dans ton CV et sur LinkedIn |

### Bonnes pratiques

- Des **messages de commit** explicites : « Ajout du projet robot », pas « update ».
- **Relis-toi** : ton site est public, c'est une vitrine professionnelle.
- **Droit à l'image et propriété intellectuelle** : pas de photo d'une personne sans son accord, pas de contenu confidentiel d'entreprise, cite tes sources et les auteurs des images. Voir [Comprendre la propriété intellectuelle de son projet](https://doc.makerspace-amiens.fr/docs/how-to-guides/propriete-intellectuelle-projet/).
- **Supprime** les contenus d'exemple (projet, article et doc d'exemple) quand tu as les tiens.

---

## 12. Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| Croix rouge dans **Actions** | Erreur de syntaxe YAML (front matter ou `_data`) | Ouvre le détail de l'erreur : le nom du fichier et la ligne sont indiqués. Vérifie l'indentation (2 espaces) et les guillemets |
| Le site s'affiche sans style, liens cassés | `baseurl` mal réglé | `""` pour `pseudo.github.io`, sinon `"/nom-du-depot"` |
| Mon article n'apparaît pas | Nom de fichier sans date, ou date future | `AAAA-MM-JJ-titre.md` et date ≤ aujourd'hui |
| Mon projet n'apparaît pas | Fichier hors de `_projets/` ou front matter absent | Le fichier doit commencer par `---` |
| Image absente | Chemin ou nom incorrect (majuscules, espaces) | Les chemins sont **sensibles à la casse**. Évite espaces et accents |
| Une compétence n'a pas de preuve | Id mal écrit | `competences: [C3]`, exactement comme dans `competences.yml` |
| Le modèle 3D ne s'affiche pas | Fichier STL/STEP ou trop lourd | Convertir en `.glb`, alléger |
| Le KiCad ne s'affiche pas | Ancien format (KiCad 5) | Ouvrir et réenregistrer dans KiCad 6+ |
| Mes modifications ne se voient pas | Construction en cours ou cache | Attendre la coche verte, puis **Ctrl+F5** |
| Caractères `:` dans un titre cassent tout | YAML interprète `:` | Mettre le titre entre guillemets : `title: "Robot : version 2"` |

Toujours bloqué·e ? Ouvre une *issue* sur ton dépôt avec une capture d'écran de l'erreur, et préviens l'équipe MakerSpace.

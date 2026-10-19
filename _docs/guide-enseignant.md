---
title: "Guide enseignant"
description: "Mise en place du dispositif, déroulé pédagogique et maintenance du thème."
section: "Guides"
nav_order: 2
---

Ce guide décrit la mise en place du dispositif **« Construis ton site »** par l'équipe MakerSpace, puis son suivi au fil de l'année.

## Architecture

```
github.com/Makerspace-Amiens/
├── portfolio-theme      ← le thème (layouts, includes, CSS, JS) — maintenu par l'équipe
│                           + ce site de documentation et de démonstration (GitHub Pages)
└── portfolio-template   ← le dépôt modèle « Use this template » — contenu minimal à remplir

github.com/<etudiant>/
└── <etudiant>.github.io ← créé depuis le template, appelle le thème via remote_theme
```

Le site étudiant ne contient **que du contenu** (Markdown + YAML). Toute l'apparence vient du thème, téléchargé par GitHub Pages à chaque construction. GitHub Pages en mode « Deploy from a branch » suffit : **pas de GitHub Actions personnalisée, pas de Ruby à installer** pour les étudiants.

Le dépôt `portfolio-theme` est aussi un site Jekyll complet : sa racine contient, à côté des fichiers du thème, un `_config.yml`, des données (`_data`) et des pages (guides, boîte à outils, projet, articles et compétences d'exemple). GitHub Pages le publie à l'adresse <https://makerspace-amiens.github.io/portfolio-theme/>. Ce site construit avec les fichiers du thème présents à côté de lui : **la démo reflète toujours le code exact du thème**, et une même branche permet de modifier le thème, sa documentation et sa démo.

Un `remote_theme` ne transmet aux sites étudiants que `_layouts`, `_includes`, `_sass` et `assets`. Le reste du dépôt (pages, `_data`, `_config.yml`, `demo/`) ne les atteint jamais. Les images de la documentation vont donc dans `demo/images/`, **jamais dans `assets/`**, sinon elles seraient copiées dans chaque site étudiant.

Le template, lui, reste volontairement minimal et change peu : un exemple de chaque type de contenu et un lien vers ce site.

## 1. Mise en place initiale (une fois)

### 1.1 Publier le thème

1. Créer le dépôt **public** `Makerspace-Amiens/portfolio-theme` et y pousser la branche `main`.
2. Activer Pages : *Settings → Pages → Deploy from a branch → `main` / `(root)`*. La documentation et la démo sont en ligne à <https://makerspace-amiens.github.io/portfolio-theme/>.
3. Vérifier le site : accueil, projets, compétences (radar), blog, docs (TOC + menu), boîte à outils (graphiques, 3D, Mermaid).
4. Créer un tag et une release :
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
   Puis *Releases → Draft a new release* sur ce tag, avec une courte note de version.

### 1.2 Publier le template

1. Créer le dépôt **public** `Makerspace-Amiens/portfolio-template` et y pousser la branche `main`.
2. **Settings → General → cocher « Template repository »**.
3. Pas besoin d'activer Pages sur ce dépôt : la démonstration est le site du thème.

### 1.3 Adapter le référentiel de compétences

Dans `_data/competences.yml` du template (et, pour garder une démo cohérente, dans celui du thème), remplacer le référentiel d'exemple par le **référentiel officiel de la formation** :

- garder des `id` stables (`C1`, `C2`… ou les codes officiels) : les étudiants les utilisent dans leurs projets ;
- renseigner `nom`, `court` (libellé radar, < 20 caractères), `description` ;
- fixer `niveau_max` et les libellés `niveaux` cohérents avec la grille d'évaluation ;
- pré-remplir `objectif` si le niveau visé en fin d'I1 est commun à tous ;
- laisser `niveau: 0` et `justification` vides pour les étudiants (ou garder l'exemple comme illustration la première année).

Un radar reste lisible jusqu'à ~8-10 compétences. Au-delà, regrouper par blocs ou ne montrer que les compétences travaillées en I1.

### 1.4 Ajouter le parcours au site de doc

Créer un atelier sur doc.makerspace-amiens.fr, sur le modèle de *Méthodologie de projet*, qui reprend les parties du [guide étudiant]({{ '/docs/guide-etudiant/' | relative_url }}) sous forme de tutoriels (1 partie ≈ 1 tutoriel). Les tutoriels 1, 2, 4, 7 et 8 de *Méthodologie de projet* peuvent être réutilisés tels quels (création de repo, Git, Markdown, édition GitHub, build local).

## 2. Déroulé pédagogique suggéré

| Séance | Contenu | Livrable |
|---|---|---|
| 1 | Pourquoi un portfolio ? Démo du [site exemple]({{ '/' | relative_url }}). Création du site, activation Pages, identité | URL du site déposée sur Moodle |
| 2 | Markdown, « Qui suis-je », CV. Premier article | Page about + CV |
| 3 | La démarche compétence : lire le référentiel, se positionner, justifier | `competences.yml` renseigné (niveau initial) |
| 4 | Documenter un projet : page projet, médias (graphiques, 3D, KiCad, Mermaid) | 1 projet complet |
| 5 | Docs et journal de bord, liens avec les projets en cours | 1 doc + 2 entrées de journal |
| Suivi | Mise à jour au fil des projets de l'année | Radar mis à jour avant chaque évaluation |

**Évaluation possible** : qualité des justifications (faits, rôle personnel, recul), cohérence niveau ↔ preuves, régularité du journal de bord, qualité rédactionnelle et respect de la propriété intellectuelle. L'esthétique n'est pas un critère : le thème est commun.

**Collecter les URL** : un formulaire ou une feuille partagée (Nom, promo, URL du site, URL du dépôt). L'historique des commits GitHub permet de vérifier la régularité du travail.

## 3. Maintenance du thème

### Faire évoluer le thème

1. Travailler sur une branche (`git switch -c ajout-galerie`).
2. Tester en local, à la racine du dépôt du thème : `bundle install` une fois, puis `bundle exec jekyll serve` et ouvrir <http://localhost:4000/portfolio-theme/>. La démo utilise directement les fichiers modifiés.
3. Mettre à jour la documentation et la démo dans la même branche (exemple dans la boîte à outils, guide étudiant…).
4. Pour essayer la branche sur un vrai site étudiant avant publication : `remote_theme: Makerspace-Amiens/portfolio-theme@ajout-galerie` (une branche fonctionne comme un tag).
5. Fusionner dans `main` (le site de doc se met à jour), puis taguer.

### Versionnage (SemVer)

| Changement | Version | Impact étudiants |
|---|---|---|
| Correction de bug, ajustement CSS | `v1.0.1` | Aucun : à annoncer, migration facultative |
| Nouvel include, nouvelle option | `v1.1.0` | Aucun : nouvelles possibilités |
| Renommage d'un include, d'un champ de front matter, d'un fichier `_data` | `v2.0.0` | **Migration nécessaire** : rédiger une note dans la Release |

Les étudiants restent sur la version écrite dans leur `_config.yml`. Pour migrer : modifier `@v1.0.0` en `@v1.1.0`, commit, c'est tout. Éviter les changements de version majeure en cours d'année scolaire.

> On peut aussi faire pointer les étudiants sur `remote_theme: Makerspace-Amiens/portfolio-theme` sans version : ils suivent alors `main` automatiquement. Plus simple, mais une erreur poussée sur `main` casse **tous** les sites. À réserver si l'équipe teste systématiquement avant de fusionner.

### Mettre à jour une bibliothèque

Les versions de Bulma, Lucide, Chart.js, model-viewer et Mermaid sont figées dans `_includes/head.html` et `_layouts/default.html`. Pour en changer, modifier le numéro de version dans l'URL jsDelivr, tester la démo, publier une version mineure. KiCanvas est chargé depuis kicanvas.org (pas de version figée disponible : surveiller les évolutions du projet, encore en développement actif).

### Ajouter une brique

Créer `_includes/ma-brique.html`, documenter son usage en commentaire en tête du fichier, ajouter un exemple dans `_docs/boite-a-outils.md` (dans ce dépôt) et une ligne dans le tableau de la partie 6 du guide étudiant. Si la brique a besoin d'un script externe, l'ajouter dans `default.html` sous condition (`{% raw %}{% if content contains '...' %}{% endraw %}`) pour ne pas alourdir les autres pages.

## 4. Structure des données (référence)

### Front matter — projet (`_projets/*.md`)

| Champ | Type | Rôle |
|---|---|---|
| `title`, `description` | texte | Titre et accroche (carte + hero) |
| `date` | AAAA-MM-JJ | Tri et affichage |
| `image` | chemin | Image de carte et d'en-tête |
| `icon` | nom Lucide | Si pas d'image |
| `statut`, `cadre`, `equipe` | texte | Badges |
| `tags` | liste | Filtres de la page Projets |
| `competences` | liste d'ids | Preuves automatiques |
| `liens` | liste `{label, url, icon}` | Boutons |
| `toc` | booléen | `false` masque la table des matières |

### Front matter — article (`_posts/AAAA-MM-JJ-*.md`)

`title`, `description`, `categories`, `competences`, `image`, `toc: true` (TOC désactivée par défaut).

### Front matter — doc (`_docs/*.md`)

`title`, `description`, `section` (groupe du menu), `nav_order`, `competences`, `toc: false`.

### Fichiers `_data`

| Fichier | Rôle |
|---|---|
| `competences.yml` | Référentiel, niveaux, positionnement, justifications |
| `cv.yml` | Sections de CV, langues, outils, intérêts, PDF |
| `navigation.yml` | Menu du haut |
| `*.yml` libres | Données de graphiques (`donnees="nom"`) |

## 5. Outils open source intégrés

| Outil | Licence | Rôle dans le thème | Documentation |
|---|---|---|---|
| Jekyll | MIT | Génération du site | https://jekyllrb.com/docs/ |
| GitHub Pages | service GitHub | Hébergement gratuit | https://docs.github.com/fr/pages |
| jekyll-remote-theme | MIT | Chargement du thème | https://github.com/benbalter/jekyll-remote-theme |
| Bulma | MIT | Framework CSS | https://bulma.io/documentation/ |
| Lucide | ISC | Icônes | https://lucide.dev/icons/ |
| Chart.js | MIT | Graphiques et radar compétences | https://www.chartjs.org/docs/latest/ |
| Mermaid | MIT | Diagrammes en texte | https://mermaid.js.org/intro/ |
| model-viewer | Apache 2.0 | Modèles 3D glTF/GLB | https://modelviewer.dev/docs/ |
| KiCanvas | MIT | Schémas et PCB KiCad | https://kicanvas.org/ |
| Rouge | MIT | Coloration syntaxique du code | https://rouge.jneen.net/ |

Seul l'hébergement (GitHub) n'est pas libre. Le site étant du Jekyll standard, il peut être migré vers GitLab Pages, Codeberg Pages ou un serveur de l'école si besoin (il faudra alors installer le thème via `jekyll-remote-theme` dans le pipeline de build).

## 6. Points de vigilance

- **RGPD / image** : rappeler que le site est public. Un étudiant peut ne pas mettre de photo, utiliser un pseudo, ou passer son dépôt en privé en fin de formation (GitHub Pages sur dépôt privé nécessite un compte payant ou GitHub Education, que les étudiants peuvent obtenir gratuitement).
- **Confidentialité** : pas de documents d'entreprise de stage sans accord.
- **Icônes de marques** : Lucide a déprécié ses logos de marques (`github`, `linkedin`). Ils fonctionnent dans la version figée du thème ; si une future version les supprime, utiliser `code` / `briefcase` ou ajouter Simple Icons (CC0) au thème.
- **KiCanvas** est en développement actif : vérifier l'affichage en début d'année.

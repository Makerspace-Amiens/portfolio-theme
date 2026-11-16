# Maintenance du thème

Ce document s'adresse à l'équipe qui maintient le thème **« Construis ton site »** : architecture, publication, évolution du thème et contrat de données avec les sites étudiants. Il n'est pas publié sur le site de documentation (exclu dans `_config.yml`).

Le déroulé pédagogique et l'animation des séances sont dans l'atelier [Portfolio de l'ingénieur](https://doc.makerspace-amiens.fr/workshops/portfolio-ingenieur/) du site du MakerSpace.

## Architecture

```
github.com/Makerspace-Amiens/
├── portfolio-theme      ← le thème (layouts, includes, CSS, JS) — maintenu par l'équipe
│                           + ce site de documentation et de démonstration (GitHub Pages)
└── portfolio-template   ← le dépôt modèle « Use this template » — contenu minimal à remplir

github.com/<etudiant>/
└── <etudiant>.github.io ← créé depuis le template, appelle le thème via remote_theme
```

Le site étudiant ne contient **que du contenu** (Markdown + YAML). Toute l'apparence vient du thème, téléchargé par GitHub Pages à chaque construction. L'étudiant peut choisir une couleur dans `_config.yml` et, s'il le souhaite, ajouter du CSS ou remplacer un fichier du thème (partie 10 du guide étudiant) ; ce n'est jamais nécessaire. GitHub Pages en mode « Deploy from a branch » suffit : **pas de GitHub Actions personnalisée, pas de Ruby à installer** pour les étudiants.

Le dépôt `portfolio-theme` est aussi un site Jekyll complet : sa racine contient, à côté des fichiers du thème, un `_config.yml`, des données (`_data`) et des pages (guides, boîte à outils, projet et articles d'exemple). GitHub Pages le publie à l'adresse <https://makerspace-amiens.fr/portfolio-theme/>. Ce site construit avec les fichiers du thème présents à côté de lui : **la démo reflète toujours le code exact du thème**, et une même branche permet de modifier le thème, sa documentation et sa démo.

Un `remote_theme` ne transmet aux sites étudiants que `_layouts`, `_includes`, `_sass` et `assets`. Le reste du dépôt (pages, `_data`, `_config.yml`, `demo/`) ne les atteint jamais. Les images de la documentation vont donc dans `demo/images/`, **jamais dans `assets/`**, sinon elles seraient copiées dans chaque site étudiant.

Le template, lui, reste volontairement minimal et change peu : un exemple de chaque type de contenu et un lien vers ce site.

## 1. Mise en place initiale (faite le 2026-11-16)

À refaire seulement si les dépôts sont recréés.

### 1.1 Publier le thème

1. Créer le dépôt **public** `Makerspace-Amiens/portfolio-theme` et y pousser la branche `main`.
2. Activer Pages : *Settings → Pages → Deploy from a branch → `main` / `(root)`*. La documentation et la démo sont en ligne à <https://makerspace-amiens.fr/portfolio-theme/>.
3. Vérifier le site : accueil, projets, blog, docs (TOC + menu), boîte à outils (graphiques, 3D, Mermaid).
4. Créer un tag daté (voir [Versionnage](#versionnage-par-date)) et une release :
   ```bash
   git tag -a v26.11.16-01 -m "Version 26.11.16-01"
   git push origin v26.11.16-01
   ```
   Puis *Releases → Draft a new release* sur ce tag, avec une courte note de version.

### 1.2 Publier le template

1. Créer le dépôt **public** `Makerspace-Amiens/portfolio-template` et y pousser la branche `main`.
2. **Settings → General → cocher « Template repository »**.
3. Pas besoin d'activer Pages sur ce dépôt : la démonstration est le site du thème.

### 1.3 Démarche compétence (en attente)

Le positionnement sur un référentiel de compétences (radar, niveaux, justifications, preuves automatiques) est **mis de côté** tant que le référentiel et son usage ne sont pas fixés. Rien ne s'en affiche dans le template ni dans la démo.

- Le code reste dans le thème, en sommeil : `_layouts/competences.html`, `_includes/competences-liees.html`, le bouton « Mes compétences » de l'accueil. Il ne s'active que si le site contient un `_data/competences.yml`.
- L'état complet (données d'exemple, page, partie du guide étudiant, champs `competences:` des exemples) est conservé dans la branche `archive/competences` des deux dépôts.
- Pour le réactiver : repartir de cette branche, remplacer le référentiel d'exemple par le référentiel officiel (ids stables, libellés courts de moins de 20 caractères, 8 à 10 compétences au plus pour un radar lisible), puis remettre la page, la partie du guide et les exemples.

## 2. Maintenance du thème

### Faire évoluer le thème

1. Travailler sur une branche (`git switch -c ajout-galerie`).
2. Tester en local, à la racine du dépôt du thème : `bundle install` une fois, puis `bundle exec jekyll serve` et ouvrir <http://localhost:4000/portfolio-theme/>. La démo utilise directement les fichiers modifiés.
3. Mettre à jour la documentation et la démo dans la même branche (exemple dans la boîte à outils, guide étudiant…).
4. Pour essayer la branche sur un vrai site étudiant avant publication : `remote_theme: Makerspace-Amiens/portfolio-theme@ajout-galerie` (une branche fonctionne comme un tag).
5. Fusionner dans `main` (le site de doc se met à jour), puis taguer.

### Versionnage par date

Chaque version publiée porte un tag **`vAA.MM.JJ-NN`** : année, mois et jour de la publication sur deux chiffres, puis le numéro de la version du jour, à partir de `01`. Exemples : `v26.11.16-01`, puis `v26.11.16-02` si une seconde version sort le même jour. L'ordre alphabétique des tags est ainsi l'ordre chronologique.

Le numéro ne dit pas si une mise à jour est sans risque : c'est la note de la Release qui le précise.

| Changement | Note de Release | Impact étudiants |
|---|---|---|
| Correction de bug, ajustement CSS | Liste des corrections | Aucun : à annoncer, migration facultative |
| Nouvel include, nouvelle option | Liste des nouveautés | Aucun : nouvelles possibilités |
| Renommage d'un include, d'un champ de front matter, d'un fichier `_data` | Commence par **Migration nécessaire**, puis décrit chaque modification à faire | Le site peut casser tant que l'étudiant n'a pas migré |

Les étudiants restent sur la version écrite dans leur `_config.yml`. Pour migrer : remplacer par exemple `@v26.11.16-02` par `@v27.01.12-01`, commit, c'est tout. Éviter les changements cassants en cours d'année scolaire.

> On peut aussi faire pointer les étudiants sur `remote_theme: Makerspace-Amiens/portfolio-theme` sans version : ils suivent alors `main` automatiquement. Plus simple, mais une erreur poussée sur `main` casse **tous** les sites. À réserver si l'équipe teste systématiquement avant de fusionner.

### Mettre à jour une bibliothèque

Les versions de Bulma, Lucide, Chart.js, model-viewer et Mermaid sont figées dans `_includes/head.html` et `_layouts/default.html`. Pour en changer, modifier le numéro de version dans l'URL jsDelivr, tester la démo, publier une version mineure. KiCanvas est chargé depuis kicanvas.org (pas de version figée disponible : surveiller les évolutions du projet, encore en développement actif).

### Ajouter une brique

Créer `_includes/ma-brique.html`, documenter son usage en commentaire en tête du fichier, ajouter un exemple dans `_docs/boite-a-outils.md` (dans ce dépôt) et une ligne dans le tableau de la partie 6 du guide étudiant. Si la brique a besoin d'un script externe, l'ajouter dans `default.html` sous condition (`{% raw %}{% if content contains '...' %}{% endraw %}`) pour ne pas alourdir les autres pages.

## 3. Structure des données (référence)

### Front matter — projet (`_projets/*.md`)

| Champ | Type | Rôle |
|---|---|---|
| `title`, `description` | texte | Titre et accroche (carte + hero) |
| `date` | AAAA-MM-JJ | Tri et affichage |
| `image` | chemin | Image de carte et d'en-tête |
| `icon` | nom Lucide | Si pas d'image |
| `statut`, `cadre`, `equipe` | texte | Badges |
| `tags` | liste | Filtres de la page Projets |
| `liens` | liste `{label, url, icon}` | Boutons |
| `toc` | booléen | `false` masque la table des matières |

### Front matter — article (`_posts/AAAA-MM-JJ-*.md`)

`title`, `description`, `categories`, `image`, `toc: true` (TOC désactivée par défaut).

### Front matter — doc (`_docs/*.md`)

`title`, `description`, `section` (groupe du menu), `nav_order`, `toc: false`.

### Fichiers `_data`

| Fichier | Rôle |
|---|---|
| `cv.yml` | Sections de CV, langues, outils, intérêts, PDF |
| `navigation.yml` | Menu du haut |
| `*.yml` libres | Données de graphiques (`donnees="nom"`) |

### Personnalisation (contrat avec les sites étudiants)

Comme les champs de données, ces points ne se renomment pas sans une Release « Migration nécessaire » :

- l'option `couleur` de `_config.yml` et les noms de la palette (`rouge`, `bleu`, `vert`, `violet`, `orange`, `turquoise`, `rose`, `gris`), ainsi que l'ancienne option `theme_color` ;
- le chemin `assets/css/perso.css`, chargé après `theme.css` s'il existe dans le dépôt de l'étudiant ;
- les variables CSS documentées : `--mks-primary`, `--mks-primary-text`, `--mks-surface`, `--mks-dark`, `--mks-radius`.

Pour ajouter une teinte à la palette : un bloc `html[data-couleur="…"]` dans `assets/css/theme.css` (vérifier les contrastes : liens ≥ 4,5:1 sur fond blanc, texte des boutons blanc ou foncé selon la teinte), une ligne dans le `case` de `_includes/head.html` (couleur de la barre du navigateur mobile), puis la mettre à jour dans la partie 10 du guide étudiant, le README et le commentaire de `couleur` dans le `_config.yml` du template.

Les étudiants qui remplacent un layout ou un include (niveau 3) ne reçoivent plus les corrections de ce fichier : en cas de bug signalé après une mise à jour du thème, demander d'abord s'ils ont des fichiers dans `_layouts/` ou `_includes/`.

## 4. Outils open source intégrés

| Outil | Licence | Rôle dans le thème | Documentation |
|---|---|---|---|
| Jekyll | MIT | Génération du site | https://jekyllrb.com/docs/ |
| GitHub Pages | service GitHub | Hébergement gratuit | https://docs.github.com/fr/pages |
| jekyll-remote-theme | MIT | Chargement du thème | https://github.com/benbalter/jekyll-remote-theme |
| Bulma | MIT | Framework CSS | https://bulma.io/documentation/ |
| Lucide | ISC | Icônes | https://lucide.dev/icons/ |
| Chart.js | MIT | Graphiques (et radar des compétences, en attente) | https://www.chartjs.org/docs/latest/ |
| Mermaid | MIT | Diagrammes en texte | https://mermaid.js.org/intro/ |
| model-viewer | Apache 2.0 | Modèles 3D glTF/GLB | https://modelviewer.dev/docs/ |
| KiCanvas | MIT | Schémas et PCB KiCad | https://kicanvas.org/ |
| Rouge | MIT | Coloration syntaxique du code | https://rouge.jneen.net/ |

Seul l'hébergement (GitHub) n'est pas libre. Le site étant du Jekyll standard, il peut être migré vers GitLab Pages, Codeberg Pages ou un serveur de l'école si besoin (il faudra alors installer le thème via `jekyll-remote-theme` dans le pipeline de build).

## 5. Points de vigilance

- **RGPD / image** : rappeler que le site est public. Un étudiant peut ne pas mettre de photo, utiliser un pseudo, ou passer son dépôt en privé en fin de formation (GitHub Pages sur dépôt privé nécessite un compte payant ou GitHub Education, que les étudiants peuvent obtenir gratuitement).
- **Confidentialité** : pas de documents d'entreprise de stage sans accord.
- **Icônes de marques** : Lucide a déprécié ses logos de marques (`github`, `linkedin`). Ils fonctionnent dans la version figée du thème ; si une future version les supprime, utiliser `code` / `briefcase` ou ajouter Simple Icons (CC0) au thème.
- **KiCanvas** est en développement actif : vérifier l'affichage en début d'année.

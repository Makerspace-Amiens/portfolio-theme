# portfolio-theme — Thème Jekyll MakerSpace UniLaSalle Amiens

Thème Jekyll distribué en `remote_theme` pour le cours **« Construis ton site »** (I1).
Les étudiants ne forkent **pas** ce dépôt : ils utilisent le dépôt [`portfolio-template`](https://github.com/Makerspace-Amiens/portfolio-template), qui appelle ce thème.

📖 **Documentation et démonstration : <https://makerspace-amiens.github.io/portfolio-theme/>**

## Un dépôt, deux rôles

Ce dépôt contient le **thème** et, à côté, le **site de documentation et de démonstration** qui l'utilise. GitHub Pages publie la branche `main` (racine).

| Dossier / fichier | Rôle | Transmis aux sites étudiants ? |
|---|---|---|
| `_layouts/`, `_includes/`, `assets/` | Le thème | ✅ oui, via `remote_theme` |
| `_config.yml`, `_data/`, pages `.md` | Site de doc et de démo | ❌ non |
| `_docs/` | Guides étudiant et enseignant, boîte à outils | ❌ non |
| `_projets/`, `_posts/` | Contenus d'exemple de la démo | ❌ non |
| `demo/images/` | Images de la démo et de la doc (**jamais dans `assets/`**) | ❌ non |

La démo est construite avec les fichiers du thème présents dans le dépôt : elle montre toujours le code exact, et une même branche permet de modifier le thème, sa doc et sa démo.

## Utilisation (côté site étudiant)

```yaml
# _config.yml
remote_theme: Makerspace-Amiens/portfolio-theme@v1.0.0
plugins:
  - jekyll-remote-theme
  - jekyll-feed
```

## Contenu du thème

| Élément | Rôle |
|---|---|
| `_layouts/default.html` | Squelette HTML, charge Bulma, Lucide et (uniquement si la page en a besoin) Chart.js, model-viewer, KiCanvas, Mermaid |
| `_layouts/home.html` | Accueil : hero, texte libre, 3 derniers projets, 3 dernières news |
| `_layouts/about.html` | Qui suis-je + CV (données `_data/cv.yml`) |
| `_layouts/projets.html` / `projet.html` | Grille de cartes filtrable / page projet avec TOC |
| `_layouts/blog.html` / `post.html` | Liste des news / article |
| `_layouts/doc.html` | Documentation : menu latéral + contenu + TOC |
| `_layouts/competences.html` | Radar des compétences + justifications + preuves automatiques |
| `_layouts/page.html` | Page simple |
| `_includes/chart.html` | Graphique Chart.js |
| `_includes/kicanvas.html` | Schéma / PCB KiCad interactif |
| `_includes/modele3d.html` | Modèle 3D (.glb) interactif |
| `_includes/icone.html` | Icône Lucide |
| `_includes/encadre.html` | Encadré info / astuce / attention |
| `_includes/video.html` | Vidéo YouTube (nocookie), PeerTube ou fichier |
| `_includes/toc.html` | Table des matières (générée en JS depuis les h2/h3) |

## Outils open source utilisés

| Outil | Licence | Usage | Documentation |
|---|---|---|---|
| [Jekyll](https://jekyllrb.com/) | MIT | Générateur de site statique | https://jekyllrb.com/docs/ |
| [Bulma](https://bulma.io/) | MIT | Framework CSS | https://bulma.io/documentation/ |
| [Lucide](https://lucide.dev/) | ISC | Icônes | https://lucide.dev/icons/ |
| [Chart.js](https://www.chartjs.org/) | MIT | Graphiques + radar compétences | https://www.chartjs.org/docs/latest/ |
| [KiCanvas](https://kicanvas.org/) | MIT | Visualisation KiCad dans le navigateur | https://github.com/theacodes/kicanvas |
| [model-viewer](https://modelviewer.dev/) | Apache 2.0 | Modèles 3D glTF/GLB | https://modelviewer.dev/docs/ |
| [Mermaid](https://mermaid.js.org/) | MIT | Diagrammes en texte | https://mermaid.js.org/intro/ |

Toutes les bibliothèques sont chargées depuis le CDN jsDelivr (sauf KiCanvas, depuis kicanvas.org), avec des **versions figées** dans `default.html`.

## Maintenance (équipe MakerSpace)

1. Développer sur une branche, tester en local à la racine de ce dépôt : `bundle install` puis `bundle exec jekyll serve`, et ouvrir <http://localhost:4000/portfolio-theme/>.
2. Mettre à jour la doc et la démo dans la même branche.
3. Fusionner dans `main` (le site de doc se met à jour), puis **créer un tag** (`v1.1.0`) et une *Release* GitHub.
4. Les étudiants restent sur leur version tant qu'ils ne changent pas `@vX.Y.Z` dans leur `_config.yml`.
5. Changement cassant (renommage d'include, de champ de front matter) → version majeure (`v2.0.0`) + note de migration dans la Release.

Voir le [guide enseignant](https://makerspace-amiens.github.io/portfolio-theme/docs/guide-enseignant/).

## Licence

MIT — libre de réutilisation et de modification.

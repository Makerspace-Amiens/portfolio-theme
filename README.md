# portfolio-theme — Thème Jekyll MakerSpace UniLaSalle Amiens

Thème Jekyll distribué en `remote_theme` pour le cours **« Construis ton site »** (I1).
Les étudiants ne forkent **pas** ce dépôt : ils utilisent le dépôt [`portfolio-template`](https://github.com/Makerspace-Amiens/portfolio-template), qui appelle ce thème.

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

1. Développer sur une branche, tester avec le dépôt template en local (`remote_theme` pointant sur la branche, ou `theme:` + `bundle exec jekyll serve`).
2. Fusionner dans `main`, puis **créer un tag** (`v1.1.0`) et une *Release* GitHub.
3. Les étudiants restent sur leur version tant qu'ils ne changent pas `@vX.Y.Z` dans leur `_config.yml`.
4. Changement cassant (renommage d'include, de champ de front matter) → version majeure (`v2.0.0`) + note de migration dans la Release.

Voir le guide complet dans le dépôt template : `GUIDE-ENSEIGNANT.md`.

## Licence

MIT — libre de réutilisation et de modification.

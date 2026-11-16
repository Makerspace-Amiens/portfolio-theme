---
title: "Boîte à outils du site"
description: "Toutes les briques disponibles pour enrichir tes pages, avec un exemple pour chacune."
section: "Prise en main"
nav_order: 5
---

Copie-colle les exemples ci-dessous dans n'importe quelle page (projet, article, doc).
Chaque outil est **open source** ; le lien renvoie à sa documentation officielle.

## Encadrés

{% raw %}`{% include encadre.html type="info" titre="À savoir" texte="Du **Markdown** ici." %}`{% endraw %}

{% include encadre.html type="info" titre="À savoir" texte="Types possibles : `info`, `astuce`, `succes`, `attention`, `danger`." %}

## Icônes — [Lucide](https://lucide.dev/icons/)

{% raw %}`{% include icone.html nom="cpu" %}`{% endraw %} → {% include icone.html nom="cpu" %} {% include icone.html nom="printer" %} {% include icone.html nom="zap" couleur="#ef2e31" %} {% include icone.html nom="cog" taille=32 %}

Cherche le nom d'une icône sur [lucide.dev/icons](https://lucide.dev/icons/).

## Graphiques — [Chart.js](https://www.chartjs.org/docs/latest/)

{% raw %}`{% include chart.html type="bar" titre="Mesures" labels="A,B,C" valeurs="12,19,7" legende="Valeur" %}`{% endraw %}

{% include chart.html type="bar" titre="Temps d'impression par pièce (min)" labels="Châssis,Support,Roue,Capot" valeurs="95,40,25,60" legende="Minutes" %}

Pour plusieurs séries, place les données dans `_data/mesures.yml` (voir le guide, partie 6) puis :
{% raw %}`{% include chart.html type="line" donnees="mesures" titre="Essais" %}`{% endraw %}

{% include chart.html type="line" donnees="mesures" titre="Essais moteur : vitesse selon la tension" %}

## Diagrammes — [Mermaid](https://mermaid.js.org/intro/)

Écris simplement un bloc de code avec le langage `mermaid` :

```mermaid
flowchart TD
  A[Besoin] --> B[Cahier des charges]
  B --> C[Conception]
  C --> D[Prototype]
  D --> E{Tests OK ?}
  E -- non --> C
  E -- oui --> F[Documentation]
```

## Modèles 3D — [model-viewer](https://modelviewer.dev/docs/)

{% raw %}`{% include modele3d.html src="/assets/modeles/piece.glb" titre="Ma pièce" %}`{% endraw %}

{% include modele3d.html src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" titre="Modèle d'exemple (glTF)" hauteur=350 %}

## Électronique KiCad — [KiCanvas](https://kicanvas.org/)

{% raw %}`{% include kicanvas.html src="/assets/kicad/ma-carte.kicad_sch" %}`{% endraw %}

{% include encadre.html type="astuce" texte="Dépose tes fichiers `.kicad_sch` / `.kicad_pcb` dans `assets/kicad/` puis décommente un include. KiCanvas lit les fichiers **KiCad 6 et plus récents**." %}

## Vidéos

{% raw %}`{% include video.html youtube="IDENTIFIANT" titre="Démo" %}`{% endraw %} ou `fichier="/assets/videos/demo.mp4"`.

## Code

```cpp
void loop() {
  int capteur = analogRead(A0);
  Serial.println(capteur);
}
```

## Couleur du site

Pas d'include ici : la couleur se règle pour tout le site, d'une ligne dans `_config.yml`.

```yaml
couleur: bleu          # rouge, bleu, vert, violet, orange, turquoise, rose, gris
couleur: "#0057b8"     # ou un code libre, entre guillemets
```

Palette complète, feuille de style personnelle (`assets/css/perso.css`) et remplacement d'un morceau du thème : voir la [partie 10 du guide étudiant]({{ '/docs/guide-etudiant/' | relative_url }}#10-personnaliser-lapparence-optionnel).

## Tableaux

| Composant | Quantité | Prix |
|---|---|---|
| ESP32 | 1 | 8 € |
| Moteur N20 | 2 | 6 € |

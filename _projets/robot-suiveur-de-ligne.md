---
title: "Robot suiveur de ligne"
description: "Un petit robot autonome qui suit une ligne noire, conçu et fabriqué au MakerSpace."
date: 2026-10-10
image: /demo/images/projet-exemple.svg     # image de la carte (format 16:9 conseillé)
icon: bot                                    # icône si pas d'image : https://lucide.dev/icons/
statut: "En cours"                           # En cours / Terminé / En pause…
cadre: "Projet I1 — MakerSpace"
equipe: "4 personnes"
tags: [robotique, électronique, impression 3D]
competences: [C1, C2, C3]                    # identifiants de _data/competences.yml
liens:
  - label: "Dépôt GitHub"
    url: "https://github.com/pseudo/robot-suiveur"
    icon: github
---

## Contexte

Pourquoi ce projet ? Dans quel cadre (cours, club, perso) ? Quel était le besoin ?

## Mon rôle

Ce que **j'ai** fait personnellement dans l'équipe (c'est ce qui justifie tes compétences).

## Démarche

### Cahier des charges

| Exigence | Critère | Validation |
|---|---|---|
| Suivre la ligne | écart < 1 cm | test sur piste |
| Autonomie | > 20 min | chronomètre |

### Architecture

```mermaid
flowchart LR
  C[Capteurs IR] --> M[ESP32]
  M --> D[Driver moteurs] --> R[Roues]
  B[Batterie] --> M
```

### Conception mécanique

{% include modele3d.html src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" titre="Exemple de modèle 3D (remplace par ta pièce .glb)" %}

## Résultats

{% include chart.html type="line" titre="Écart à la ligne selon la vitesse" labels="10,20,30,40,50" valeurs="0.2,0.4,0.7,1.3,2.5" legende="Écart (cm)" %}

## Ce que j'en retiens

Difficultés rencontrées, ce que je ferais différemment, ce que j'ai appris.

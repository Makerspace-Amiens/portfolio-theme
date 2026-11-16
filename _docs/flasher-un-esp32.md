---
title: "Flasher un ESP32 avec l'IDE Arduino"
description: "Exemple de fiche technique : installer la carte et téléverser un premier programme."
section: "Électronique"
nav_order: 10
---

## Prérequis

- IDE Arduino 2.x
- Câble USB **data** (pas seulement charge)

## Installer le support ESP32

1. Ouvrir *Fichier → Préférences*.
2. Ajouter l'URL du gestionnaire de cartes Espressif.
3. Installer **esp32 by Espressif Systems** depuis le gestionnaire de cartes.

## Téléverser

```cpp
void setup() { pinMode(2, OUTPUT); }
void loop() { digitalWrite(2, !digitalRead(2)); delay(500); }
```

{% include encadre.html type="attention" titre="Ça ne téléverse pas ?" texte="Maintenir le bouton **BOOT** au début du téléversement." %}

## Pour aller plus loin

Les sections h2/h3 de cette page alimentent automatiquement la table des matières à droite.

# Analyse de sensibilité — écart 50 vs 90 km/h, Nissan Note, aller-retour

Toutes les lignes répondent à la même question : **si je faisais varier ce paramètre de ±25 %, est-ce que la différence simulée entre 50 et 90 km/h serait modifiée ?** L'élasticité ε = 0 signifie que l'écart est insensible au paramètre, ε = 1 signifie un passe-plat linéaire (typique d'un facteur multiplicatif), |ε| ≫ 1 signifie que l'écart est fragile.

Configuration : véhicule Nissan Note, sens « round », 50 km/h vs 90 km/h, démarrage à froid 60 s.

## Écarts de référence (paramètres au nominal)

| Grandeur | Δ(90 − 50) | Unité |
|---|---:|---|
| Carburant | 0.091 | L |
| Temps | -0.588 | min |
| CO2 | 0.202 | kg |
| PM10 total | 11.283 | mg |
| PM2,5 total | 6.320 | mg |
| Énergie freins | 0.229 | kWh |
| Distance moteur saturé | 0.000 | km |

## Élasticités ε = (ΔΔ/Δ_base) / (Δp/p_base)

| Paramètre | Nominal | Carburant | Temps | CO2 | PM10 total | PM2,5 total | Énergie freins | Distance moteur saturé |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| η_indicated | 0.4000 | -1.44 | 0.00 | -1.44 | -0.37 | -0.66 | 0.00 | 0.00 |
| η_dt | 0.8500 | -1.40 | -0.06 | -1.40 | -0.32 | -0.58 | 0.02 | 0.00 |
| k_idle (g/s/L cyl) | 0.2100 | -0.35 | 0.00 | -0.35 | -0.07 | -0.13 | 0.00 | 0.00 |
| PCI essence | 31.8200 | -1.44 | 0.00 | -1.44 | -0.37 | -0.66 | 0.00 | 0.00 |
| v_ref Crr(v) | 100.0000 | -0.01 | 0.01 | -0.01 | -0.00 | -0.01 | -0.00 | 0.00 |
| k_eb (N·s·m⁻¹·L⁻¹) | 10.0000 | 0.00 | 0.00 | 0.00 | -0.18 | -0.13 | -0.25 | 0.00 |
| k_brake (g TSP/MJ) | 0.0102 | 0.00 | 0.00 | 0.00 | 0.73 | 0.52 | 0.00 | 0.00 |
| k_tyre (g TSP/km) | 0.0107 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| k_road (g TSP/km) | 0.0150 | 0.00 | 0.00 | 0.00 | -0.00 | -0.00 | 0.00 | 0.00 |
| P_max | 65000.0000 | 0.01 | -0.06 | 0.01 | 0.04 | 0.06 | 0.02 | 0.00 |
| v_Pmax | 30.0000 | 0.01 | 0.04 | 0.01 | -0.02 | -0.04 | -0.00 | 0.00 |
| a_comfort | 1.5000 | 1.19 | -1.01 | 1.19 | 1.20 | 1.20 | 1.20 | 0.00 |
| T_cs | 60.0000 | 0.03 | 0.00 | 0.03 | 0.12 | 0.22 | 0.00 | 0.00 |
| facteur PM échappement | 25.0000 | 0.00 | 0.00 | 0.00 | 0.27 | 0.48 | 0.00 | 0.00 |

## Lecture rapide

Pour chaque grandeur on liste les paramètres dont |ε| > 0,5, classés par sensibilité décroissante.

### ΔCarburant
- **η_indicated** : ε = -1.44 (↑ paramètre → ↓ écart)
- **PCI essence** : ε = -1.44 (↑ paramètre → ↓ écart)
- **η_dt** : ε = -1.40 (↑ paramètre → ↓ écart)
- **a_comfort** : ε = 1.19 (↑ paramètre → ↑ écart)

### ΔTemps
- **a_comfort** : ε = -1.01 (↑ paramètre → ↓ écart)

### ΔCO2
- **η_indicated** : ε = -1.44 (↑ paramètre → ↓ écart)
- **PCI essence** : ε = -1.44 (↑ paramètre → ↓ écart)
- **η_dt** : ε = -1.40 (↑ paramètre → ↓ écart)
- **a_comfort** : ε = 1.19 (↑ paramètre → ↑ écart)

### ΔPM10 total
- **a_comfort** : ε = 1.20 (↑ paramètre → ↑ écart)
- **k_brake (g TSP/MJ)** : ε = 0.73 (↑ paramètre → ↑ écart)

### ΔPM2,5 total
- **a_comfort** : ε = 1.20 (↑ paramètre → ↑ écart)
- **PCI essence** : ε = -0.66 (↑ paramètre → ↓ écart)
- **η_indicated** : ε = -0.66 (↑ paramètre → ↓ écart)
- **η_dt** : ε = -0.58 (↑ paramètre → ↓ écart)
- **k_brake (g TSP/MJ)** : ε = 0.52 (↑ paramètre → ↑ écart)

### ΔÉnergie freins
- **a_comfort** : ε = 1.20 (↑ paramètre → ↑ écart)

### ΔDistance moteur saturé
- robuste : aucune élasticité ≥ 0,5 dans la plage ±25 %.

## Inversions de signe

Une inversion de signe entre p_low et p_high (ou par rapport au nominal) compromet l'usage comparatif.

- aucune inversion de signe détectée sur les ±25 %. Toutes les conclusions du simulateur (ranking 50 vs 90 km/h) sont préservées.

## Distance « moteur saturé » par véhicule

Le diagnostic n'est pas activé pour la Nissan Note ; il l'est pour les profils plus lourds, ce qui justifie son intérêt en présence d'une montée soutenue.

| Véhicule | 50 km/h (km) | 90 km/h (km) | Δ (km) |
|---|---:|---:|---:|
| Nissan Note | 0.157 | 0.157 | 0.000 |
| BMW X5 4.8is | 0.000 | 0.000 | 0.000 |
| Dodge Ram 1500 | 0.000 | 0.000 | 0.000 |

## Méthode

1. Pour chaque paramètre, deux simulations sont relancées : une à `p × 0,75` et une à `p × 1,25`.
2. Pour chaque grandeur Δ_X = X_90 − X_50, on calcule l'élasticité normalisée définie en tête.
3. La distance « moteur saturé » est presque toujours dégénérée à zéro pour la Note (le moteur tient sa vitesse partout) et n'est donc pas un test discriminant ici.

Reproduire : `node sensitivity.js` à la racine du dépôt.

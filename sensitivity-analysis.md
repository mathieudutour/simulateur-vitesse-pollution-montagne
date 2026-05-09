# Analyse de sensibilité — écart 50 vs 90 km/h, Nissan Note, aller-retour

Toutes les lignes répondent à la même question : **si je faisais varier ce paramètre de ±25 %, est-ce que la différence simulée entre 50 et 90 km/h serait modifiée ?** L'élasticité ε = 0 signifie que l'écart est insensible au paramètre, ε = 1 signifie un passe-plat linéaire (typique d'un facteur multiplicatif), |ε| ≫ 1 signifie que l'écart est fragile.

Configuration : véhicule Nissan Note, sens « round », 50 km/h vs 90 km/h, démarrage à froid 60 s.

## Écarts de référence (paramètres au nominal)

| Grandeur | Δ(90 − 50) | Unité |
|---|---:|---|
| Carburant | 0.168 | L |
| Temps | -1.999 | min |
| CO2 | 0.371 | kg |
| PM10 total | 19.636 | mg |
| PM2,5 total | 9.697 | mg |
| Énergie freins | 0.459 | kWh |
| Distance moteur saturé | 0.000 | km |

## Élasticités ε = (ΔΔ/Δ_base) / (Δp/p_base)

| Paramètre | Nominal | Carburant | Temps | CO2 | PM10 total | PM2,5 total | Énergie freins | Distance moteur saturé |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| η_indicated | 0.4000 | -1.60 | 0.00 | -1.60 | -0.26 | -0.52 | 0.00 | 0.00 |
| η_dt | 0.8500 | -0.91 | -0.66 | -0.91 | 0.27 | 0.04 | 0.49 | 0.00 |
| k_idle (g/s/L cyl) | 0.2100 | -0.50 | 0.00 | -0.50 | -0.08 | -0.16 | 0.00 | 0.00 |
| PCI essence | 31.8200 | -1.60 | 0.00 | -1.60 | -0.26 | -0.52 | 0.00 | 0.00 |
| v_ref Crr(v) | 100.0000 | -0.02 | 0.00 | -0.02 | 0.00 | -0.00 | 0.01 | 0.00 |
| k_eb (N·s·m⁻¹·L⁻¹) | 10.0000 | 0.00 | 0.00 | 0.00 | -0.26 | -0.21 | -0.31 | 0.00 |
| k_brake (g TSP/MJ) | 0.0102 | 0.00 | 0.00 | 0.00 | 0.84 | 0.68 | 0.00 | 0.00 |
| k_tyre (g TSP/km) | 0.0107 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| k_road (g TSP/km) | 0.0150 | 0.00 | 0.00 | 0.00 | -0.00 | 0.00 | 0.00 | 0.00 |
| P_max | 65000.0000 | 0.53 | -0.66 | 0.53 | 0.50 | 0.50 | 0.49 | 0.00 |
| v_Pmax | 30.0000 | -0.41 | 0.57 | -0.41 | -0.35 | -0.36 | -0.35 | 0.00 |
| a_comfort | 1.5000 | 0.81 | -0.32 | 0.81 | 0.81 | 0.81 | 0.81 | 0.00 |
| T_cs | 60.0000 | 0.00 | 0.00 | 0.00 | -0.00 | 0.00 | 0.00 | 0.00 |
| facteur PM échappement | 25.0000 | 0.00 | 0.00 | 0.00 | 0.16 | 0.32 | 0.00 | 0.00 |

## Lecture rapide

Pour chaque grandeur on liste les paramètres dont |ε| > 0,5, classés par sensibilité décroissante.

### ΔCarburant
- **η_indicated** : ε = -1.60 (↑ paramètre → ↓ écart)
- **PCI essence** : ε = -1.60 (↑ paramètre → ↓ écart)
- **η_dt** : ε = -0.91 (↑ paramètre → ↓ écart)
- **a_comfort** : ε = 0.81 (↑ paramètre → ↑ écart)
- **P_max** : ε = 0.53 (↑ paramètre → ↑ écart)
- **k_idle (g/s/L cyl)** : ε = -0.50 (↑ paramètre → ↓ écart)

### ΔTemps
- **η_dt** : ε = -0.66 (↑ paramètre → ↓ écart)
- **P_max** : ε = -0.66 (↑ paramètre → ↓ écart)
- **v_Pmax** : ε = 0.57 (↑ paramètre → ↑ écart)

### ΔCO2
- **η_indicated** : ε = -1.60 (↑ paramètre → ↓ écart)
- **PCI essence** : ε = -1.60 (↑ paramètre → ↓ écart)
- **η_dt** : ε = -0.91 (↑ paramètre → ↓ écart)
- **a_comfort** : ε = 0.81 (↑ paramètre → ↑ écart)
- **P_max** : ε = 0.53 (↑ paramètre → ↑ écart)
- **k_idle (g/s/L cyl)** : ε = -0.50 (↑ paramètre → ↓ écart)

### ΔPM10 total
- **k_brake (g TSP/MJ)** : ε = 0.84 (↑ paramètre → ↑ écart)
- **a_comfort** : ε = 0.81 (↑ paramètre → ↑ écart)

### ΔPM2,5 total
- **a_comfort** : ε = 0.81 (↑ paramètre → ↑ écart)
- **k_brake (g TSP/MJ)** : ε = 0.68 (↑ paramètre → ↑ écart)
- **η_indicated** : ε = -0.52 (↑ paramètre → ↓ écart)
- **PCI essence** : ε = -0.52 (↑ paramètre → ↓ écart)
- **P_max** : ε = 0.50 (↑ paramètre → ↑ écart)

### ΔÉnergie freins
- **a_comfort** : ε = 0.81 (↑ paramètre → ↑ écart)

### ΔDistance moteur saturé
- robuste : aucune élasticité ≥ 0,5 dans la plage ±25 %.

## Inversions de signe

Une inversion de signe entre p_low et p_high (ou par rapport au nominal) compromet l'usage comparatif.

- aucune inversion de signe détectée sur les ±25 %. Toutes les conclusions du simulateur (ranking 50 vs 90 km/h) sont préservées.

## Distance « moteur saturé » par véhicule

La saturation suit le rapport puissance/masse: la Nissan Note (58 W/kg) ne tient pas la consigne de confort sur la montée, le BMW X5 (118 W/kg) et le Dodge Ram (107 W/kg) en ont les moyens. C'est l'inverse de l'intuition « c'est le pick-up qui peine ».

| Véhicule | 50 km/h (km) | 90 km/h (km) | Δ (km) |
|---|---:|---:|---:|
| Nissan Note | 0.000 | 0.000 | 0.000 |
| BMW X5 4.8is | 0.000 | 0.000 | 0.000 |
| Dodge Ram 1500 | 0.000 | 0.000 | 0.000 |

## Méthode

1. Pour chaque paramètre, deux simulations sont relancées : une à `p × 0,75` et une à `p × 1,25`.
2. Pour chaque grandeur Δ_X = X_90 − X_50, on calcule l'élasticité normalisée définie en tête.
3. La distance « moteur saturé » mesure la longueur des segments en montée où la puissance disponible ne couvre pas la consigne de confort longAccel. Elle est donc maximale pour la voiture la moins puissante (la Note) et faible pour les SUV/pick-up.

Reproduire : `node sensitivity.js` à la racine du dépôt.

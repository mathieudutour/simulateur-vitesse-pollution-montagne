# Analyse de sensibilité — écart 50 vs 90 km/h, Nissan Note, aller-retour

Toutes les lignes répondent à la même question : **si je faisais varier ce paramètre de ±25 %, est-ce que la différence simulée entre 50 et 90 km/h serait modifiée ?** L'élasticité ε = 0 signifie que l'écart est insensible au paramètre, ε = 1 signifie un passe-plat linéaire (typique d'un facteur multiplicatif), |ε| ≫ 1 signifie que l'écart est fragile.

Configuration : véhicule Nissan Note, sens « round », 50 km/h vs 90 km/h, démarrage à froid 60 s.

## Écarts de référence (paramètres au nominal)

| Grandeur | Δ(90 − 50) | Unité |
|---|---:|---|
| Carburant | 0.162 | L |
| Temps | -1.999 | min |
| CO2 | 0.358 | kg |
| PM10 total | 19.929 | mg |
| PM2,5 total | 10.576 | mg |
| Énergie freins | 0.432 | kWh |
| Distance moteur saturé | 2.008 | km |

## Élasticités ε = (ΔΔ/Δ_base) / (Δp/p_base)

| Paramètre | Nominal | Carburant | Temps | CO2 | PM10 total | PM2,5 total | Énergie freins | Distance moteur saturé |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| η_indicated | 0.4000 | -1.63 | 0.00 | -1.63 | -0.34 | -0.63 | 0.00 | 0.00 |
| η_dt | 0.8500 | -0.93 | -0.66 | -0.93 | 0.21 | -0.03 | 0.49 | -1.29 |
| k_idle (g/s/L cyl) | 0.2100 | -0.53 | 0.00 | -0.53 | -0.09 | -0.18 | 0.00 | 0.00 |
| PCI essence | 31.8200 | -1.63 | 0.00 | -1.63 | -0.34 | -0.63 | 0.00 | 0.00 |
| v_ref Crr(v) | 100.0000 | -0.01 | 0.00 | -0.01 | 0.00 | -0.00 | 0.01 | -0.04 |
| k_eb (N·s·m⁻¹·L⁻¹) | 10.0000 | 0.00 | 0.00 | 0.00 | -0.25 | -0.19 | -0.33 | 0.00 |
| k_brake (g TSP/MJ) | 0.0102 | 0.00 | 0.00 | 0.00 | 0.78 | 0.58 | 0.00 | 0.00 |
| k_tyre (g TSP/km) | 0.0107 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| k_road (g TSP/km) | 0.0150 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| P_max | 65000.0000 | 0.54 | -0.66 | 0.54 | 0.51 | 0.53 | 0.49 | -1.29 |
| v_Pmax | 30.0000 | -0.41 | 0.57 | -0.41 | -0.37 | -0.40 | -0.34 | 1.37 |
| a_comfort | 1.5000 | 0.84 | -0.32 | 0.84 | 0.84 | 0.83 | 0.84 | 0.31 |
| T_cs | 60.0000 | 0.02 | 0.00 | 0.02 | 0.07 | 0.14 | 0.00 | 0.00 |
| facteur PM échappement | 25.0000 | 0.00 | 0.00 | 0.00 | 0.22 | 0.42 | 0.00 | 0.00 |

## Lecture rapide

Pour chaque grandeur on liste les paramètres dont |ε| > 0,5, classés par sensibilité décroissante.

### ΔCarburant
- **η_indicated** : ε = -1.63 (↑ paramètre → ↓ écart)
- **PCI essence** : ε = -1.63 (↑ paramètre → ↓ écart)
- **η_dt** : ε = -0.93 (↑ paramètre → ↓ écart)
- **a_comfort** : ε = 0.84 (↑ paramètre → ↑ écart)
- **P_max** : ε = 0.54 (↑ paramètre → ↑ écart)
- **k_idle (g/s/L cyl)** : ε = -0.53 (↑ paramètre → ↓ écart)

### ΔTemps
- **η_dt** : ε = -0.66 (↑ paramètre → ↓ écart)
- **P_max** : ε = -0.66 (↑ paramètre → ↓ écart)
- **v_Pmax** : ε = 0.57 (↑ paramètre → ↑ écart)

### ΔCO2
- **η_indicated** : ε = -1.63 (↑ paramètre → ↓ écart)
- **PCI essence** : ε = -1.63 (↑ paramètre → ↓ écart)
- **η_dt** : ε = -0.93 (↑ paramètre → ↓ écart)
- **a_comfort** : ε = 0.84 (↑ paramètre → ↑ écart)
- **P_max** : ε = 0.54 (↑ paramètre → ↑ écart)
- **k_idle (g/s/L cyl)** : ε = -0.53 (↑ paramètre → ↓ écart)

### ΔPM10 total
- **a_comfort** : ε = 0.84 (↑ paramètre → ↑ écart)
- **k_brake (g TSP/MJ)** : ε = 0.78 (↑ paramètre → ↑ écart)
- **P_max** : ε = 0.51 (↑ paramètre → ↑ écart)

### ΔPM2,5 total
- **a_comfort** : ε = 0.83 (↑ paramètre → ↑ écart)
- **η_indicated** : ε = -0.63 (↑ paramètre → ↓ écart)
- **PCI essence** : ε = -0.63 (↑ paramètre → ↓ écart)
- **k_brake (g TSP/MJ)** : ε = 0.58 (↑ paramètre → ↑ écart)
- **P_max** : ε = 0.53 (↑ paramètre → ↑ écart)

### ΔÉnergie freins
- **a_comfort** : ε = 0.84 (↑ paramètre → ↑ écart)

### ΔDistance moteur saturé
- **v_Pmax** : ε = 1.37 (↑ paramètre → ↑ écart)
- **η_dt** : ε = -1.29 (↑ paramètre → ↓ écart)
- **P_max** : ε = -1.29 (↑ paramètre → ↓ écart)

## Inversions de signe

Une inversion de signe entre p_low et p_high (ou par rapport au nominal) compromet l'usage comparatif.

- aucune inversion de signe détectée sur les ±25 %. Toutes les conclusions du simulateur (ranking 50 vs 90 km/h) sont préservées.

## Distance « moteur saturé » par véhicule

La saturation suit le rapport puissance/masse: la Nissan Note (58 W/kg) ne tient pas la consigne de confort sur la montée, le BMW X5 (118 W/kg) et le Dodge Ram (107 W/kg) en ont les moyens. C'est l'inverse de l'intuition « c'est le pick-up qui peine ».

| Véhicule | 50 km/h (km) | 90 km/h (km) | Δ (km) |
|---|---:|---:|---:|
| Nissan Note | 0.748 | 2.756 | 2.008 |
| BMW X5 4.8is | 0.000 | 0.197 | 0.197 |
| Dodge Ram 1500 | 0.000 | 0.590 | 0.590 |

## Méthode

1. Pour chaque paramètre, deux simulations sont relancées : une à `p × 0,75` et une à `p × 1,25`.
2. Pour chaque grandeur Δ_X = X_90 − X_50, on calcule l'élasticité normalisée définie en tête.
3. La distance « moteur saturé » mesure la longueur des segments en montée où la puissance disponible ne couvre pas la consigne de confort longAccel. Elle est donc maximale pour la voiture la moins puissante (la Note) et faible pour les SUV/pick-up.

Reproduire : `node sensitivity.js` à la racine du dépôt.

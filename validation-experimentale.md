# Protocole expérimental de validation du simulateur

L'objectif n'est pas de calibrer chaque coefficient en valeur absolue, mais
de vérifier que le modèle reproduit correctement **les écarts entre deux
vitesses de croisière** sur le trajet Super U Passy ↔ Maison médicale du
Plateau d'Assy. Si un véhicule donné consomme `Δ_mes` litres de plus à
90 km/h qu'à 50 km/h, on veut que le simulateur prédise un `Δ_sim` du
même signe, du même ordre de grandeur, et idéalement compatible avec
`Δ_mes` à la précision des mesures.

Toutes les analyses sont donc **appariées** (même véhicule, même
conducteur, même journée si possible) pour que les biais systématiques
absolus s'éliminent.

## 1. Hypothèses préenregistrées

À déposer dans un dépôt horodaté (commit signé sur la branche, ou OSF)
**avant** la première sortie. Cela évite l'ajustement post-hoc des seuils.

**H1 — Carburant.** Δ_carburant (90 → 50 km/h) sur l'aller-retour est
positif et compris entre +0,15 et +0,40 L pour la Nissan Note, et entre
+0,30 et +0,80 L pour les profils SUV / pick-up.

**H2 — Temps.** Δ_temps (90 → 50 km/h) est négatif et compris entre
−5 et −9 minutes sur l'aller-retour, indépendamment du véhicule.

**H3 — Énergie de freinage.** Δ_E_frein (90 → 50 km/h) est positif
(plus d'énergie à dissiper à la vitesse haute). Le rapport
Δ_E_frein(SUV) / Δ_E_frein(Note) est supérieur à 1,5 (l'effet masse
amplifie l'écart).

**H4 — Distance "moteur saturé"** est nulle pour la Note à 50 km/h, et
strictement positive pour le pick-up à 90 km/h en montée.

Les hypothèses H1–H3 portent sur des **différences appariées**, pas sur
les valeurs absolues. Le simulateur peut être systématiquement
optimiste de 10–15 % sur les valeurs brutes et toujours valider H1–H4.

## 2. Variables

| Type | Variable | Mesure |
|---|---|---|
| Indépendante | Vitesse cible de croisière | 50 km/h vs 90 km/h |
| Indépendante | Véhicule | Note / X5 / Ram |
| Indépendante | Sens | montée / descente / aller-retour |
| Contrôlée | Conducteur | un seul, formé au régulateur |
| Contrôlée | Pneus, pression | mesurée au départ, ré-ajustée à 2,4 bar |
| Contrôlée | Carburant | SP95-E10, plein effectué au Super U Passy |
| Contrôlée | Charge utile | conducteur seul, pas de bagage |
| Contrôlée | Climatisation | éteinte |
| Contrôlée | Pluie | exclue (annulation au-delà de 2 mm/h) |
| Mesurée (réponse) | Carburant consommé | méthode "plein-à-plein" |
| Mesurée (réponse) | Temps de parcours | trace GPS 1 Hz |
| Mesurée (réponse) | Profil de vitesse | trace GPS 1 Hz |
| Mesurée (réponse) | Énergie de freinage (proxy) | température disque IR avant/après |
| Mesurée (réponse) | PM échappement | optionnel, PEMS portable si accès |

## 3. Plan d'expérience

Un plan **2×2 intra-sujet répété** par véhicule et par sens.

- 2 niveaux de vitesse cible : 50, 90 km/h.
- 2 sens (la donnée d'aller-retour est obtenue par sommation).
- N = 6 répétitions par condition, soit 24 trajets simples par véhicule
  (12 aller-retours).
- Ordre des conditions **randomisé** sur la journée pour éviter qu'une
  condition coïncide systématiquement avec un état moteur ou un trafic
  donné. Tirage par bloc latin équilibré.
- Au moins **2 jours** par véhicule, séparés d'une semaine, pour
  contrôler la dérive météo.

Pour le démarrage à froid (curseur "Avancé" du simulateur), on prévoit
en plus deux jours dédiés où chaque trajet **commence moteur froid**
(arrêt > 8 h). Les autres jours, le moteur est volontairement chauffé
en boucle locale 5 minutes avant la première mesure pour annuler
l'effet froid.

Total minimum : 24 trajets par véhicule × 3 véhicules = 72 trajets
chaud + 24 trajets froid = **96 trajets**.

## 4. Matériel

- Smartphone GPS avec application loggant à 1 Hz (GPSLogger ou
  équivalent), positionné sur le tableau de bord.
- Manomètre de pression de pneus, contrôle au départ et au retour.
- Thermomètre IR (gamme 0–500 °C) pour la température des disques de
  frein (avant le départ, dès l'arrêt complet à l'arrivée).
- Carnet papier pour relever : odomètre, niveau jauge, météo, heure,
  vent ressenti.
- (Optionnel) PEMS portable (AVL M.O.V.E, Horiba OBS-ONE) pour les PM
  échappement. Si non disponible, l'hypothèse PM échappement reste
  non validée par cette campagne.

## 5. Procédure de mesure

### 5.1 Avant chaque trajet
1. Plein **à ras** au pistolet automatique du Super U, deuxième clic du
   pistolet, à la même pompe si possible.
2. Photo de la jauge à carburant et du compteur kilométrique.
3. Pression des pneus relevée et ajustée à 2,4 bar à froid.
4. Température des disques avant lue à l'IR (3 points par disque,
   moyenne).
5. Démarrage du log GPS 1 Hz.

### 5.2 Pendant le trajet
- Régulateur de vitesse engagé sur la consigne dès que la limite légale
  le permet (50 km/h ou 90 km/h selon la condition).
- En descente, le conducteur **ne freine pas** sauf nécessité de
  sécurité (limite, virage), pour reproduire le comportement
  "roue libre" du modèle.
- En cas d'événement non maîtrisable (camion devant, animal, bouchon),
  noter l'heure et le km, et marquer le trajet pour exclusion ex post.

### 5.3 Après chaque trajet
1. Re-plein **à ras**, même pompe, même mode pistolet.
2. Δ_carburant = volume re-injecté (lu sur la pompe à 0,01 L près).
3. Photo finale jauge, compteur.
4. Température des disques arrière dès l'arrêt (≤ 60 s).
5. Export du log GPS, archivage avec ID de condition.

## 6. Analyse statistique

### 6.1 Mesure principale (par véhicule, par sens)

Pour chaque paire de trajets (50 km/h, 90 km/h) du même jour :

```
Δ_mes_i = X_90,i − X_50,i
Δ_sim_i = X_sim,90,i − X_sim,50,i
```

où *X* est la quantité d'intérêt (carburant, temps, vitesse moyenne,
énergie de freinage proxy).

### 6.2 Tests

1. **Test d'orientation (signe).** Test du signe sur `Δ_mes − Δ_sim`,
   bilatéral. Refus de H0 = "signe de l'écart simulé incorrect".
2. **Test d'amplitude.** Test t apparié sur `Δ_mes / Δ_sim` ou
   équivalent log-ratio. Cible : intervalle de confiance 90 %
   contenant 1,0.
3. **Régression appariée**. `Δ_mes = α + β · Δ_sim + ε`. Validation
   complète si β ∈ [0,7 ; 1,4] et α non significativement différent
   de 0.
4. **Distance moteur saturé** : test exact (la prédiction est binaire :
   0 km vs > 0 km). Comparée à la perte de vitesse mesurée pendant la
   montée la plus raide (km 6.4 → 6.6, pente locale ~10 %).

### 6.3 Bootstrap

Compte tenu des N modestes (6 par condition), faire un bootstrap par
permutation des paires pour les IC à 90 % et 95 %, plutôt que de
s'appuyer sur la normalité de Student.

## 7. Critères de validation

Le modèle est **considéré validé** si, pour la **majorité** des couples
(véhicule, sens) :

- H1, H2, H3 sont confirmées à 90 %.
- La régression appariée fuel et temps a β ∈ [0,7 ; 1,4].
- Aucun signe d'effet d'amplitude n'est rejeté.

Le modèle est **considéré falsifié** sur un point précis si :

- Le **signe** de `Δ_mes` diffère du signe de `Δ_sim` (par véhicule et
  par sens), de manière statistiquement significative.
- Le rapport `Δ_mes / Δ_sim` sort de [0,3 ; 3] systématiquement.

Une falsification partielle (par ex. PM hors échappement non
validable, ou démarrage à froid sous-prédit) **n'invalide pas
l'usage comparatif** du simulateur, mais déclenche une révision du
coefficient correspondant et un re-commit, suivi d'une seconde
campagne ciblée.

## 8. Limites

- Pas de mesure directe de PM hors échappement sans matériel de
  laboratoire. La validation porte essentiellement sur le carburant,
  le temps, le profil de vitesse et l'énergie de freinage proxy.
- La météo varie d'un jour à l'autre (température, vent) ; le plan
  réplique chaque condition sur deux jours pour amortir.
- Trafic non contrôlable. Les trajets perturbés sont exclus a priori.
- Le PEMS, s'il est disponible, ajoute son propre biais de mesure
  (tubing, dilution) ; la comparaison reste interne (90 km/h vs
  50 km/h, mêmes biais).
- Le démarrage à froid est l'écart le plus difficile à mesurer
  proprement avec la méthode plein-à-plein (effet sur 1 km en début
  de trajet ; signal noyé dans la dispersion). Considérer plutôt un
  enregistreur OBD-II du débit instantané (PID 5E) pour cette
  question.

## 9. Calendrier indicatif

| Semaine | Action |
|---|---|
| S1 | Préenregistrement des hypothèses, achat manomètre / IR / OBD |
| S2 | Pilotes (2 trajets par condition pour caler la procédure) |
| S3–S5 | 96 trajets sur 6 jours (2 par véhicule), conditions chaudes |
| S6 | 24 trajets froids (2 jours dédiés) |
| S7 | Saisie, nettoyage, exclusions documentées |
| S8 | Analyse statistique, bootstrap, rapport |
| S9 | Re-commit éventuel, seconde campagne ciblée si nécessaire |

## 10. Sortie attendue

- Un fichier `mesures.csv` (1 ligne / trajet) versionné dans le dépôt.
- Un notebook d'analyse reproductible (Python ou R) générant les
  tableaux et figures du paragraphe Résultats du futur article.
- Un rapport en français, court, avec les écarts simulé–mesuré pour
  chaque variable, condition par condition.

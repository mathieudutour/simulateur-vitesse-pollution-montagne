# Simulateur vitesse, carburant et particules

Prototype web autonome pour explorer l'effet de la vitesse sur la consommation d'essence,
les émissions de CO2 et les particules hors échappement sur un profil de route de montagne:
Super U Passy -> maison médicale du Plateau d'Assy par les départementales.
Le trajet peut être simulé en montée, en descente ou en aller-retour.

Ouvrir `index.html` dans un navigateur. Aucune dépendance n'est requise.

Le modèle est volontairement transparent:

- les forces longitudinales viennent d'un bilan physique véhicule-route, avec
  résistance au roulement croissant en (v/100 m/s)^2 (calibration ISO 28580) et
  densité de l'air corrigée par l'altitude;
- le véhicule part et arrive à l'arrêt (Super U, maison médicale) et s'arrête au
  point de retournement en aller-retour;
- l'accélération est plafonnée par la puissance moteur disponible (P_max x rendement
  de transmission), donc un véhicule lourd ne peut pas suivre la même rampe qu'une
  citadine en montée;
- les profils véhicules remplacent les réglages techniques: Nissan Note 2013,
  BMW X5 4.8is 2004, Dodge Ram 1500 SLT/TRX4 2007;
- le profil de vitesse est plafonné par les limites OSM taguées, par 50 km/h en ville,
  et par une hypothèse 90 km/h hors ville quand aucun `maxspeed` n'est tagué;
- en descente, la vitesse A/B n'impose pas un freinage permanent: le véhicule roule en
  roue libre au-dessus de la consigne et freine seulement pour une limite ou un virage;
- le carburant suit une droite de Willans: l'énergie aux roues est divisée par le rendement
  de transmission (0,85) puis par le rendement indiqué (0,40), et un débit de ralenti
  dépendant de la cylindrée s'ajoute hors coupure d'injection (DFCO);
- le coût carburant multiplie les litres simulés par le prix SP95-E10 déclaré dans le flux
  officiel prix-carburants.gouv.fr pour le Super U Passy;
- les particules pneus et chaussée utilisent les facteurs EMEP/EEA mis à l'échelle par
  la masse; les particules de freinage proviennent directement de l'énergie de
  plaquettes (Hagino 2016, ~10 mg PM10/MJ) après soustraction de la part dissipée par
  le freinage moteur (proportionnel à la cylindrée et à la vitesse);
- les PM totaux ajoutent un facteur PM échappement essence proportionnel à la masse de
  carburant brûlée (EMEP/EEA Tier 3, ~25 mg/kg de SP95-E10); PM2,5 n'est pas additionné
  au PM10 car il en est une fraction;
- les facteurs pneus et chaussée sont mis à l'échelle par la masse du véhicule, pas réduits
  par la vitesse;
- la spatialisation des PM freinage suit l'énergie dissipée aux plaquettes sur chaque
  segment.

Les sources et les limites sont affichées dans la section "Formules, constantes et sources".

## Limites assumées

- **Démarrage à froid pro-rata.** Le surcoût carburant et la pénalité PM échappement
  sont étalés uniformément sur les premières `coldStart` secondes du trajet. Cela
  reproduit correctement les *totaux* d'un trajet, pas la distribution *spatiale* des
  PM échappement (la vraie courbe d'amorçage du catalyseur est exponentielle, pas
  linéaire). Les cartes PM hors échappement, elles, sont bien spatialisées par
  l'énergie de plaquettes locale.
- **Frein moteur k × cylindrée × vitesse.** Approximation linéaire à un seul rapport
  de boîte; convenable pour de la vulgarisation et pour les comparaisons entre
  véhicules sur le *même* trajet, faible pour de la précision scientifique
  (un rétrogradage en descente change l'ordre de grandeur).
- **Facteurs PM hors échappement.** Les coefficients EMEP/EEA et la calibration
  Hagino sont défendables pour des comparaisons relatives mais portent des
  incertitudes de ±50 % à ±100 % selon le composé. À privilégier en *delta*
  entre scénarios plutôt qu'en valeur absolue.
- **Conduite déterministe, pas observée.** Le profil de vitesse représente un
  conducteur idéal qui suit le régulateur, ne fait jamais d'écart, freine au seuil
  de confort exact. Les essais terrain (cf. `validation-experimentale.md`)
  exposent l'écart à la conduite réelle.
- **Aller-retour = un démarrage à froid unique.** Hypothèse d'un trajet continu
  avec un bref arrêt à la maison médicale (moteur reste chaud). Pour modéliser
  deux démarrages distincts (par ex. trajet du matin + trajet de l'après-midi),
  cocher l'option "Aller-retour = deux trajets séparés" dans Avancé.
- **Pas de vent ni de météo.** Le calcul aérodynamique suppose une atmosphère
  immobile et la résistance au roulement une route sèche. Un vent de face de
  5 m/s ajoute environ 16 % à la traînée à 70 km/h ; la pluie réduit
  l'adhérence brique-pneu mais augmente peu Crr. Le simulateur n'est pas valide
  par jour de fort vent ou route mouillée / enneigée.
- **Pas d'épuisement de freins.** Le pas en arrière ne plafonne pas la
  décélération autrement que par le confort + g sin(theta) ; aucune fatigue
  thermique des disques / plaquettes n'est modélisée. Pour un col plus long ou
  plus pentu que celui-ci, la fatigue de freinage devient un phénomène réel
  (test du tunnel du Mont-Blanc, descente du Galibier, etc.).
- **Pas de limite de grip.** La force de traction disponible est plafonnée par
  la puissance moteur, jamais par l'adhérence des roues motrices. Sur asphalte
  sec et nos trois véhicules en charge ordinaire le grip n'est jamais
  contraignant ; sur neige / verglas (μ ≈ 0,2) le X5 et le Ram dépasseraient
  leur limite d'adhérence avant leur limite de puissance.

Numériquement, l'aller-retour égale la somme montée + descente sur les grandeurs
purement cinématiques (temps, énergie de freinage) ; il diffère légèrement sur
le carburant et les PM échappement à cause du décompte unique du démarrage à
froid décrit ci-dessus.

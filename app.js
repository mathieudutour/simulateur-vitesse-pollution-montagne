const SOURCES = [
  {
    id: "OSM",
    title: "OpenStreetMap / Overpass API",
    url: "https://overpass-api.de/",
    note: "Géométrie de route et tags maxspeed assemblés depuis les voies OSM ref D 39, D 43 et D 13.",
  },
  {
    id: "OTD",
    title: "Open Topo Data, EU-DEM 25 m",
    url: "https://www.opentopodata.org/",
    note: "Altitudes interrogées sur le jeu européen eudem25m, source EEA.",
  },
  {
    id: "FUELPRICE",
    title: "Prix-carburants.gouv.fr, flux instantané",
    url: "https://www.prix-carburants.gouv.fr/rubrique/opendata/",
    note: "Flux instantané consulté le 06/05/2026; la station 74190003, Super U Passy, y déclare SP95-E10/E10 = 1,989 €/L depuis le 25/03/2026 09:38:14. La page station Super U affiche le même prix.",
  },
  {
    id: "DYN",
    title: "Liu, Feng & Li, Energies 2017",
    url: "https://www.mdpi.com/1996-1073/10/5/700",
    note: "Modèle longitudinal: inertie, roulement, traînée aérodynamique et pente.",
  },
  {
    id: "AUTOEVO",
    title: "AutoEvolution, Nissan Note 2013 specifications",
    url: "https://www.autoevolution.com/cars/nissan-note-2013.html",
    note: "Masse et Cd du Nissan Note 2013 utilisés pour le profil citadine.",
  },
  {
    id: "CARSPECTOR",
    title: "Carspector, Nissan Note frontal area",
    url: "https://carspector.com/car/nissan/044571/",
    note: "Surface frontale estimée du Nissan Note.",
  },
  {
    id: "X5_SPEC",
    title: "Carspector, BMW X5 4.8is 2004",
    url: "https://carspector.com/car/BMW/007152/?u=us",
    note: "Masse, Cd et surface frontale du profil SUV BMW X5 4.8is.",
  },
  {
    id: "RAM_SPEC",
    title: "CarSpecs, Dodge Ram 1500 SLT/TRX4 2007",
    url: "https://www.carspecs.us/cars/2007/dodge/ram-1500/19239",
    note: "Masse et Cd du profil pick-up Dodge Ram 1500 SLT/TRX4 4x4 Quad Cab.",
  },
  {
    id: "RAM_AREA",
    title: "Carspector, Dodge Ram 1500 2007 frontal area",
    url: "https://carspector.com/car/Dodge/028593/",
    note: "Surface frontale estimée pour un Dodge Ram 1500 2007.",
  },
  {
    id: "NHTSA",
    title: "NHTSA CAFE technical support document, reference vehicles",
    url: "https://www.nhtsa.gov/sites/nhtsa.gov/files/2021-08/CAFE-NHTSA-2127-AM34-TSD-Complete-web.pdf",
    note: "Coefficient de résistance au roulement Crr=0,009 repris pour les profils véhicules.",
  },
  {
    id: "MICHELIN_CRR",
    title: "Michelin, Tire rolling resistance and fuel economy",
    url: "https://www.michelin.com/en/innovation/tire-environment/tire-rolling-resistance/",
    note: "Le coefficient de résistance au roulement augmente avec la vitesse. Approximation utilisée: Crr(v) = Crr0 (1 + (v/100 m/s)^2), calibrée pour reproduire le rapport ISO 28580 / Michelin Crr(130 km/h)/Crr(50 km/h) ~1,10. v_ref = 100 m/s -> ratio 1,13 à 130 km/h, 1,04 à 50 km/h.",
  },
  {
    id: "BEDDOWS",
    title: "Beddows & Harrison, Atmospheric Environment 2021",
    url: "https://research.birmingham.ac.uk/en/publications/pmsub10sub-and-pmsub25sub-emission-factors-for-non-exhaust-partic",
    note: "Dépendance des émissions hors échappement à la masse du véhicule.",
  },
  {
    id: "ISA",
    title: "International Standard Atmosphere, Cambridge Engineering",
    url: "https://www-mdp.eng.cam.ac.uk/web/library/enginfo/aerothermal_dvd_only/aero/atmos/",
    note: "Densité de l'air au niveau mer et accélération standard de la pesanteur.",
  },
  {
    id: "ISA_DENSITY",
    title: "ICAO Standard Atmosphere, barometric form",
    url: "https://www.icao.int/environmental-protection/Documents/Publications/Doc%207488.pdf",
    note: "Forme troposphérique rho(h) = rho0 (1 - L h)^4,2559 utilisée pour corriger la densité de l'air aux altitudes 578-1039 m du parcours.",
  },
  {
    id: "NAP15",
    title: "National Academies, SI gasoline engines, 2015",
    url: "https://www.nationalacademies.org/read/21744/chapter/4",
    note: "Rendement thermique au frein typique autour de 22 % en conditions FTP; rendement indiqué de l'ordre de 38-40 %.",
  },
  {
    id: "WILLANS",
    title: "Guzzella & Sciarretta, Vehicle Propulsion Systems, 3rd ed., ch. 2",
    url: "https://link.springer.com/book/10.1007/978-3-642-35913-2",
    note: "Droite de Willans: P_carburant = (P_roue / eta_transmission + P_idle) / eta_indique; capture la dépendance charge du rendement effectif.",
  },
  {
    id: "EPA_DRIVELINE",
    title: "An & Stodolsky, ANL/ESD-43, vehicle driveline efficiency",
    url: "https://www.osti.gov/biblio/664251",
    note: "Rendement de transmission boîte manuelle / pont autour de 0,85 (boîte automatique 0,80-0,82) repris pour la chaîne de traction.",
  },
  {
    id: "IDLE_FUEL",
    title: "Argonne / SAE 2014-01-1147, gasoline idle fuel rate",
    url: "https://www.sae.org/publications/technical-papers/content/2014-01-1147/",
    note: "Consommation au ralenti d'un moteur essence 1,4-1,6 L environ 0,30 g/s; sert de plancher de carburant et de base pour le scaling cylindrée.",
  },
  {
    id: "DOE",
    title: "U.S. DOE AFDC Fuel Properties",
    url: "https://afdc.energy.gov/fuels/properties?fuels=GS%2CME",
    note: "Pouvoir calorifique inférieur de l'essence/E10: 112114 à 116090 Btu/gal.",
  },
  {
    id: "EPA",
    title: "U.S. EPA GHG Equivalencies",
    url: "https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references",
    note: "Facteur 8887 g CO2 par gallon d'essence consommé (référence pure essence).",
  },
  {
    id: "ADEME_E10",
    title: "ADEME Base Carbone, SP95-E10 (combustion)",
    url: "https://base-carbone.ademe.fr/",
    note: "Facteur d'émission combustion SP95-E10 ~2,21 kg CO2/L; reflète la fraction bioéthanol et la densité moindre du mélange.",
  },
  {
    id: "EMEP_TIER3",
    title: "EMEP/EEA Guidebook 2023, road transport, Tier 3 fuel-based",
    url: "https://www.eea.europa.eu/en/analysis/publications/emep-eea-guidebook-2023/part-b-sectoral-guidance-chapters/1-energy/1-a-combustion/1-a-3-b-i",
    note: "Approche Tier 3 par masse de carburant: PM échappement ~25 mg par kg d'essence brûlée pour un Euro 5 SI, calibré pour reproduire le facteur 1,4 mg/km à 56 g/km de carburant.",
  },
  {
    id: "EMEP_EURO_TIERS",
    title: "EMEP/EEA Guidebook 2023, gasoline LDV PM by Euro class",
    url: "https://www.eea.europa.eu/en/analysis/publications/emep-eea-guidebook-2023/part-b-sectoral-guidance-chapters/1-energy/1-a-combustion/1-a-3-b-i/view",
    note: "Les facteurs PM échappement essence dépendent fortement de la norme: Euro 5/6 SI ~25 mg/kg, Euro 4 / Tier 2 SI ~90 mg/kg, Euro 3 SI ~120 mg/kg.",
  },
  {
    id: "EMEP",
    title: "EMEP/EEA Guidebook 2023, tyre and brake wear, update 2025",
    url: "https://www.eea.europa.eu/en/analysis/publications/emep-eea-guidebook-2023/part-b-sectoral-guidance-chapters/1-energy/1-a-combustion/1-a-3-b-vi",
    note: "Facteurs TSP et fractions PM10/PM2,5 pour pneus, freins et chaussée.",
  },
  {
    id: "EMEP_EXHAUST",
    title: "EMEP/EEA Guidebook 2023, road transport exhaust, update 2025",
    url: "https://www.eea.europa.eu/en/analysis/publications/emep-eea-guidebook-2023/part-b-sectoral-guidance-chapters/1-energy/1-a-combustion/1-a-3-b-i",
    note: "Facteur PM échappement essence Euro 5 pris à 0,0014 g/km; PM échappement assimilé à PM2,5 et PM10.",
  },
  {
    id: "CURVE",
    title: "FHWA Speed Concepts, horizontal curves",
    url: "https://highways.dot.gov/safety/speed-management/speed-concepts-informational-guide/chapter-4-engineering-and-technical",
    note: "Facteur de frottement latéral utilisé comme proxy de l'accélération latérale non compensée.",
  },
  {
    id: "COMFORT",
    title: "Transportation Research Part F, deceleration comfort, 2025",
    url: "https://www.sciencedirect.com/science/article/pii/S1369847825002372",
    note: "Essais passagers: décélérations de -1,5 à -2,5 m/s2 perçues comme confortables et sûres.",
  },
  {
    id: "COLD_START",
    title: "Weilenmann, Favez & Alvarez, Atmospheric Environment 2009",
    url: "https://doi.org/10.1016/j.atmosenv.2009.01.005",
    note: "Surconsommation et surémissions au démarrage à froid d'un véhicule essence: ~+30 % carburant et environ x7 PM échappement durant l'amorçage du catalyseur (60-90 s).",
  },
  {
    id: "BRAKE",
    title: "Xu et al., Journal of Hazardous Materials, 2022",
    url: "https://pubmed.ncbi.nlm.nih.gov/35413517/",
    note: "Les pertes d'énergie cinétique peuvent paramétrer les variations de particules de freinage.",
  },
  {
    id: "HAGINO",
    title: "Hagino, Atmospheric Environment, 2016",
    url: "https://doi.org/10.1016/j.atmosenv.2016.02.014",
    note: "Mesures sur banc dynamométrique: ~10 mg PM10 par MJ d'énergie dissipée aux plaquettes (calibrage TSP=10 mg/MJ utilisé ici).",
  },
  {
    id: "EU_POWER",
    title: "UTAC / constructeurs, puissances homologuées",
    url: "https://www.auto-data.net/",
    note: "Puissance maxi des trois profils: Nissan Note 1.4 16v ~65 kW, BMW X5 4.8is ~268 kW, Dodge Ram 1500 5.7 Hemi ~254 kW.",
  },
  {
    id: "ENGINE_BRAKE",
    title: "Heywood, Internal Combustion Engine Fundamentals, ch. 13",
    url: "https://www.mheducation.com/highered/product/internal-combustion-engine-fundamentals-2e-heywood/M9781260116106.html",
    note: "Couple de freinage moteur (FMEP+pompage) approché par une force lineaire en vitesse et en cylindrée; calibré à environ 0,3 m/s2 de décélération supplémentaire pour une 1,4 L à 90 km/h.",
  },
  {
    id: "ROT_INERTIA",
    title: "Genta & Morello, The Automotive Chassis vol. 2, ch. 5",
    url: "https://link.springer.com/book/10.1007/978-1-4020-8675-5",
    note: "Inertie des roues + transmission ajoutée à la masse effective via un facteur lambda ~0,04 (Genta & Morello). m_eff = m (1 + lambda) pour les calculs d'inertie longitudinale.",
  },
  {
    id: "TORQUE_CURVE",
    title: "Heywood, Internal Combustion Engine Fundamentals, ch. 2-3",
    url: "https://www.mheducation.com/highered/product/internal-combustion-engine-fundamentals-2e-heywood/M9781260116106.html",
    note: "Approche couple constant en dessous de la vitesse de puissance maxi puis puissance constante au-delà: F_dispo = P_max x eta_dt / max(v, v_Pmax). v_Pmax ~30 m/s pour une voiture particulière en rapport optimal.",
  },
  {
    id: "SAE_J1349",
    title: "SAE J1349, naturally aspirated engine power correction",
    url: "https://www.sae.org/standards/content/j1349_201109/",
    note: "Correction de puissance pour un moteur atmosphérique en altitude: P(h) ~ P_0 x rho(h) / rho_0; ~10 % de perte au Plateau d'Assy (1039 m).",
  },
];

const ROUTE = {
  distanceM: 10235.1,
  osrmDistanceM: 10235.1,
  pointsUphill: [
    [0, 45.919231, 6.70447, 578.134],
    [0.2326, 45.919475, 6.70713, 581.447],
    [0.4652, 45.920241, 6.709928, 585.694],
    [0.6978, 45.921001, 6.712728, 587.934],
    [0.9305, 45.922543, 6.712967, 587.307],
    [1.1631, 45.924459, 6.711872, 589.966],
    [1.3957, 45.923781, 6.709136, 604.972],
    [1.6283, 45.924551, 6.710395, 612.919],
    [1.8609, 45.924635, 6.708924, 626.791],
    [2.0935, 45.924318, 6.705996, 641.118],
    [2.3262, 45.923851, 6.703125, 648.805],
    [2.5588, 45.924034, 6.700336, 666.428],
    [2.7914, 45.923746, 6.697471, 672.586],
    [3.024, 45.92434, 6.694885, 685.219],
    [3.2566, 45.923897, 6.692054, 689.506],
    [3.4892, 45.9236, 6.689158, 696.367],
    [3.7219, 45.923556, 6.686203, 700.393],
    [3.9545, 45.924432, 6.686535, 714.577],
    [4.1871, 45.925052, 6.687584, 726.822],
    [4.4197, 45.925743, 6.685386, 753.191],
    [4.6523, 45.925028, 6.682624, 763.165],
    [4.8849, 45.925012, 6.679659, 781.977],
    [5.1176, 45.925979, 6.680234, 801.863],
    [5.3502, 45.92686, 6.682898, 813.406],
    [5.5828, 45.928176, 6.685114, 829.929],
    [5.8154, 45.929359, 6.686142, 851.352],
    [6.048, 45.929259, 6.683388, 861.881],
    [6.2806, 45.92847, 6.681038, 876.619],
    [6.5133, 45.928623, 6.679945, 891.221],
    [6.7459, 45.930057, 6.68205, 897.352],
    [6.9785, 45.931992, 6.682246, 938.612],
    [7.2111, 45.931319, 6.680331, 942.751],
    [7.4437, 45.931481, 6.678202, 956.736],
    [7.6763, 45.932474, 6.680505, 973.184],
    [7.909, 45.933889, 6.682698, 994.065],
    [8.1416, 45.933117, 6.684687, 982.599],
    [8.3742, 45.933756, 6.687041, 1003.682],
    [8.6068, 45.934769, 6.689512, 1018.993],
    [8.8394, 45.935483, 6.692284, 1025.197],
    [9.072, 45.936303, 6.694538, 1034.565],
    [9.3047, 45.936206, 6.697536, 1035.517],
    [9.5373, 45.936112, 6.700528, 1038.738],
    [9.7699, 45.936715, 6.703385, 1035.032],
    [10.0025, 45.937831, 6.705891, 1020.526],
    [10.2351, 45.939486, 6.707455, 1019.914],
  ],
  curvesUphill: [
    { km: 0.29, angleDeg: 122, radiusM: 185 },
    { km: 0.72, angleDeg: 100, radiusM: 131 },
    { km: 1.16, angleDeg: 114, radiusM: 155 },
    { km: 1.45, angleDeg: 177, radiusM: 71 },
    { km: 1.69, angleDeg: 179, radiusM: 57 },
    { km: 2.96, angleDeg: 153, radiusM: 102 },
    { km: 3.77, angleDeg: 177, radiusM: 52 },
    { km: 4.03, angleDeg: 168, radiusM: 81 },
    { km: 4.22, angleDeg: 175, radiusM: 78 },
    { km: 4.98, angleDeg: 146, radiusM: 74 },
    { km: 5.78, angleDeg: 169, radiusM: 74 },
    { km: 6.02, angleDeg: 77, radiusM: 154 },
    { km: 6.44, angleDeg: 174, radiusM: 25 },
    { km: 6.73, angleDeg: 81, radiusM: 104 },
    { km: 7.02, angleDeg: 175, radiusM: 74 },
    { km: 7.37, angleDeg: 139, radiusM: 103 },
    { km: 8.01, angleDeg: 145, radiusM: 89 },
    { km: 8.2, angleDeg: 134, radiusM: 81 },
    { km: 8.99, angleDeg: 65, radiusM: 217 },
  ],
  speedLimitsUphill: [
    {
      startKm: 0,
      endKm: 0.2,
      kmh: 50,
      label: "Avenue de Marlioz",
      note: "maxspeed=50 dans OSM",
    },
    {
      startKm: 0.2,
      endKm: 0.78,
      kmh: 30,
      label: "Avenue de Marlioz / Pont de l'Ugine",
      note: "maxspeed=30 dans OSM",
    },
    {
      startKm: 0.78,
      endKm: 1.25,
      kmh: 50,
      label: "Sortie de Passy",
      note: "50 km/h par défaut en agglomération quand OSM ne tague pas maxspeed",
    },
    {
      startKm: 1.25,
      endKm: 3.45,
      kmh: 90,
      label: "Hors ville",
      note: "Hypothèse 90 km/h sur les tronçons hors agglomération sans maxspeed OSM",
    },
    {
      startKm: 3.45,
      endKm: 4.35,
      kmh: 50,
      label: "Chef-lieu de Passy",
      note: "50 km/h en agglomération autour de la Place de la Mairie / D13",
    },
    {
      startKm: 4.35,
      endKm: 9.05,
      kmh: 90,
      label: "Hors ville",
      note: "Hypothèse 90 km/h sur les tronçons hors agglomération sans maxspeed OSM",
    },
    {
      startKm: 9.05,
      endKm: 10.2351,
      kmh: 50,
      label: "Plateau d'Assy",
      note: "50 km/h par défaut en agglomération quand OSM ne tague pas maxspeed",
    },
  ],
  mapPointsUphill: [
    [45.919231, 6.70447],
    [45.919318, 6.706562],
    [45.919733, 6.708081],
    [45.920202, 6.709777],
    [45.920586, 6.711247],
    [45.920821, 6.712104],
    [45.921242, 6.713434],
    [45.921605, 6.713616],
    [45.923308, 6.712534],
    [45.924399, 6.711999],
    [45.924471, 6.71169],
    [45.923893, 6.710237],
    [45.923801, 6.708709],
    [45.924202, 6.708629],
    [45.92453, 6.70955],
    [45.924534, 6.710588],
    [45.92487, 6.7109],
    [45.924998, 6.710217],
    [45.924619, 6.708752],
    [45.924354, 6.707168],
    [45.924289, 6.705443],
    [45.924051, 6.703766],
    [45.923773, 6.702532],
    [45.924191, 6.70102],
    [45.92375, 6.699721],
    [45.923772, 6.698106],
    [45.923853, 6.697262],
    [45.924075, 6.69715],
    [45.924375, 6.695888],
    [45.924427, 6.694291],
    [45.924091, 6.693293],
    [45.923982, 6.691049],
    [45.923443, 6.688313],
    [45.923542, 6.686704],
    [45.923614, 6.686019],
    [45.923946, 6.685984],
    [45.92404, 6.686957],
    [45.924238, 6.687219],
    [45.924463, 6.685994],
    [45.924621, 6.685725],
    [45.92482, 6.685923],
    [45.925028, 6.687537],
    [45.925351, 6.687696],
    [45.925685, 6.686963],
    [45.925743, 6.685377],
    [45.925269, 6.684141],
    [45.925043, 6.682713],
    [45.924993, 6.681387],
    [45.925004, 6.679997],
    [45.925023, 6.678871],
    [45.925263, 6.678761],
    [45.925647, 6.679597],
    [45.92638, 6.681965],
    [45.927498, 6.683607],
    [45.927886, 6.684761],
    [45.928512, 6.685386],
    [45.928921, 6.685984],
    [45.929069, 6.686662],
    [45.929344, 6.686283],
    [45.929549, 6.684745],
    [45.929625, 6.684013],
    [45.929258, 6.683387],
    [45.928566, 6.682759],
    [45.928463, 6.681654],
    [45.928362, 6.680397],
    [45.928059, 6.679623],
    [45.928116, 6.679318],
    [45.928332, 6.679287],
    [45.92862, 6.679941],
    [45.929444, 6.681],
    [45.929804, 6.681841],
    [45.930044, 6.682046],
    [45.930489, 6.681883],
    [45.931646, 6.681804],
    [45.932088, 6.682382],
    [45.932282, 6.682199],
    [45.931537, 6.680962],
    [45.931, 6.679139],
    [45.930948, 6.678248],
    [45.931208, 6.678144],
    [45.931815, 6.678257],
    [45.932104, 6.678776],
    [45.932226, 6.679284],
    [45.932766, 6.681094],
    [45.933813, 6.682537],
    [45.934067, 6.683717],
    [45.93373, 6.684529],
    [45.93323, 6.684552],
    [45.933125, 6.68522],
    [45.933003, 6.686337],
    [45.93387, 6.687117],
    [45.934376, 6.688135],
    [45.934778, 6.689826],
    [45.935349, 6.692121],
    [45.935992, 6.692653],
    [45.936451, 6.6935],
    [45.936296, 6.694189],
    [45.936315, 6.696039],
    [45.936243, 6.697116],
    [45.936063, 6.700074],
    [45.936282, 6.701859],
    [45.93717, 6.704806],
    [45.93869, 6.706483],
    [45.939436, 6.707098],
    [45.939486, 6.707455],
  ],
};

const DEFAULTS = {
  direction: "round",
  vehicleId: "note",
  speedA: 90,
  speedB: 50,
  latAccel: 1.47,
  longAccel: 1.5,
  coldStart: 60,
  payload: 75,        // single driver mass; added on top of curb mass
  parkingIdle: 30,    // s of engine-on idle at each v=0 anchor (departure, arrival, turnaround)
  fuelPrice: 1.989,   // user-overrideable; default = SP95-E10 Super U Passy 25/03/2026
  twoTrips: false,    // round trip = two separate trips (engine cools at turnaround)
};

const CONSTANTS = {
  g: 9.80665,
  // ISA troposphere: rho(h) = rho0 (1 - L h)^4,2559. See ISA, ISA_DENSITY.
  rho0: 1.225,
  isaLapse: 2.2557e-5,
  isaExp: 4.2559,
  gasolineLhvMJPerL: 31.82,
  gasolineDensityKgPerL: 0.745,
  fuelPriceEurPerL: 1.989,
  // SP95-E10 combustion factor (ADEME Base Carbone). Le facteur EPA 8887 g/gal vise
  // l'essence pure et surestime ~6 % le CO2 par litre de E10. See ADEME_E10.
  co2KgPerL: 2.21,
  // Tier 3 EMEP par masse de carburant: les émissions PM échappement suivent le
  // débit de carburant plutôt que la distance. Le facteur exact dépend de la norme et
  // est porté par chaque profil véhicule. See EMEP_TIER3, EMEP_EURO_TIERS.
  // Willans-line: traction part of fuel = (P_wheel / eta_dt) / eta_indicated.
  // eta_brake ~22 % (NAP15) emerges from eta_indicated x mech / (mech + idle), so the
  // legacy flat-22 % value is preserved at the calibration point but degrades at low
  // load and improves near peak BMEP. See WILLANS, NAP15, EPA_DRIVELINE.
  indicatedEfficiency: 0.40,
  drivetrainEfficiency: 0.85,
  // Idle fuel scales with displacement; 0,21 g/s/L tracks Argonne data for warm SI.
  // See IDLE_FUEL.
  idleFuelGPerSPerL: 0.21,
  // Below this speed, deceleration fuel-cut (DFCO) is disabled and idle fuel still flows.
  dfcoMinKmh: 25,
  tyreTspGKm: 0.0107,
  // Brake wear scales with friction-brake work (post engine-brake split). Calibrated
  // from Hagino 2016 dynamometer data: ~10 mg PM10/MJ pad work; converted to TSP via
  // PM10/TSP=0,98 below. See HAGINO, BRAKE.
  brakeTspGPerMJ: 0.0102,
  roadTspGKm: 0.015,
  // Engine-brake force F_eb = k * cylindree[L] * v[m/s]. k calibré pour donner ~0,3 m/s2
  // de décélération supplémentaire à 25 m/s sur la 1,4 L de la Note. See ENGINE_BRAKE.
  engineBrakeNPerLPerMps: 10,
  // Speed-dependent rolling resistance: Crr(v) = Crr0 (1 + (v / v_ref)^2). v_ref calibré
  // pour reproduire le ratio ISO 28580 / Michelin: Crr(130 km/h) / Crr(50 km/h) ~1,10.
  // See MICHELIN_CRR.
  crrSpeedRefMps: 100,
  // Rotational inertia of wheels and driveline as fraction of vehicle mass. Adds ~4 %
  // to the effective inertia for accelerations and decelerations. See ROT_INERTIA.
  rotInertiaLambda: 0.04,
  tyrePM10: 0.6,
  tyrePM25: 0.42,
  brakePM10: 0.98,
  brakePM25: 0.39,
  roadPM10: 0.5,
  roadPM25: 0.27,
  urbanSpeedKmh: 50,
  ruralSpeedKmh: 90,
};

const VEHICLES = {
  note: {
    label: "Nissan Note",
    subtitle: "citadine essence compacte",
    mass: 1118,
    cd: 0.3,
    area: 2.25,
    crr: 0.009,
    displacementL: 1.4,
    maxPowerW: 65000,
    pmaxSpeedMps: 30,
    euroTier: "Euro 5",
    exhaustPmMgPerKgFuel: 25,
    sources: ["AUTOEVO", "CARSPECTOR", "NHTSA", "NAP15", "WILLANS", "EPA_DRIVELINE", "EU_POWER", "TORQUE_CURVE", "SAE_J1349", "EMEP_EURO_TIERS", "PHOTO_NOTE"],
  },
  suv: {
    label: "BMW X5 4.8is",
    subtitle: "SUV essence 2004",
    mass: 2275,
    cd: 0.38,
    area: 2.74,
    crr: 0.009,
    displacementL: 4.8,
    maxPowerW: 268000,
    pmaxSpeedMps: 35,
    euroTier: "Euro 3",
    exhaustPmMgPerKgFuel: 120,
    sources: ["X5_SPEC", "NHTSA", "NAP15", "WILLANS", "EPA_DRIVELINE", "EU_POWER", "TORQUE_CURVE", "SAE_J1349", "EMEP_EURO_TIERS", "PHOTO_X5"],
  },
  pickup: {
    label: "Dodge Ram 1500",
    subtitle: "SLT/TRX4 4x4 Quad Cab 2007",
    mass: 2366,
    cd: 0.53,
    area: 3.31,
    crr: 0.009,
    displacementL: 5.7,
    maxPowerW: 254000,
    pmaxSpeedMps: 35,
    euroTier: "Tier 2 Bin 5",
    exhaustPmMgPerKgFuel: 90,
    sources: ["RAM_SPEC", "RAM_AREA", "NHTSA", "NAP15", "WILLANS", "EPA_DRIVELINE", "EU_POWER", "TORQUE_CURVE", "SAE_J1349", "EMEP_EURO_TIERS", "PHOTO_RAM"],
  },
};

const LEDGER = [
  ["Points de départ et arrivée", "Super U Passy -> Maison médicale du Plateau d'Assy", ["SUPERU", "MED"]],
  ["Distance routière", "10,2351 km, géométrie OSM D39 / D43 / D13 / D43", ["OSM"]],
  ["Altitudes", "45 points EU-DEM 25 m, 578,1 à 1038,7 m", ["OTD"]],
  ["Virages", "Rayons déduits de la géométrie OSM; v = sqrt(a_lateral x R); cap maintenu sur la longueur d'arc R x angle", ["OSM", "CURVE"]],
  ["Limites de vitesse", "maxspeed OSM quand tagué; 50 km/h en ville; hypothèse 90 km/h hors ville", ["OSM", "LEGIFRANCE", "LEGIFRANCE_R4132"]],
  ["Profil de vitesse montée", "v = min(v_curseur, v_limite, v_virage); accélération bornée par min(confort, F_dispo/m - F_resist) avec F_dispo = P_max(rho) x eta_dt / max(v, v_Pmax); freinage borné par confort + g sin(theta)", ["OSM", "LEGIFRANCE", "LEGIFRANCE_R4132", "CURVE", "COMFORT", "EU_POWER", "TORQUE_CURVE", "SAE_J1349"]],
  ["Descente en roue libre", "au-delà de v_curseur, pas de freinage tant que v < min(v_limite, v_virage)", ["DYN", "LEGIFRANCE", "LEGIFRANCE_R4132", "CURVE", "COMFORT"]],
  ["Bilan des forces", "F = m (1 + lambda) a + Crr(v) m g cos(theta) + 0,5 rho(h) Cd A v2 + m g sin(theta); Crr(v) = Crr0 (1 + (v/100)^2); inertie rotative lambda = 0,04; intégrales aero et roulement utilisent <v2> = (v_a2 + v_b2)/2", ["DYN", "MICHELIN_CRR", "ROT_INERTIA"]],
  ["Conditions aux limites", "Vitesse nulle au départ (Super U), à l'arrivée (maison médicale) et au point de retournement (aller-retour)", []],
  ["Cinématique freinage", "v2 = v0 2 + 2 a s", ["DYN", "COMFORT"]],
  ["Véhicule Nissan Note", "m=1118 kg; Cd=0,30; A=2,25 m2; Crr=0,009; cyl. 1,4 L", ["AUTOEVO", "CARSPECTOR", "NHTSA", "NAP15"]],
  ["Véhicule BMW X5 4.8is", "m=2275 kg; Cd=0,38; A=2,74 m2; Crr=0,009; cyl. 4,8 L", ["X5_SPEC", "NHTSA", "NAP15"]],
  ["Véhicule Dodge Ram 1500", "m=2366 kg; Cd=0,53; A=3,31 m2; Crr=0,009; cyl. 5,7 L", ["RAM_SPEC", "RAM_AREA", "NHTSA", "NAP15"]],
  ["Carburant moteur", "Carburant = (E_roue / 0,85 / 0,40) / PCI + 0,21 g/s/L cylindrée x t_DFCO_off; intégré par segment", ["WILLANS", "EPA_DRIVELINE", "IDLE_FUEL", "NAP15", "DOE"]],
  ["Charge utile", "Masse effective = masse à vide véhicule + charge utile (curseur Avancé, défaut 75 kg = un conducteur)", ["AUTOEVO", "X5_SPEC", "RAM_SPEC"]],
  ["Ralenti à l'arrêt", "Curseur Avancé: temps de ralenti par point d'arrêt (départ, arrivée, demi-tour aller-retour). Ajoute du carburant ralenti et du temps, sans travail mécanique", ["IDLE_FUEL"]],
  ["Démarrage à froid", "Budget +30 % carburant et x7 PM échappement, intégré sur la fenêtre coldStart (le carburant est compté au régime instantané, pas pro rata du temps); un seul démarrage par simulation (un aller-retour continu garde le moteur chaud); curseur dans Avancé, désactivable à 0", ["EMEP_EXHAUST", "COLD_START"]],
  ["Profil aller-retour", "Aller-retour = montée à plafond ferme (identique au sens 'up') + descente en roue libre; un seul démarrage à froid", ["DYN", "COMFORT", "COLD_START"]],
  ["Air et gravité", "rho(h) = 1,225 (1 - 2,2557e-5 h)^4,2559 kg/m3; g = 9,80665 m/s2", ["ISA", "ISA_DENSITY"]],
  ["Essence", "PCI = 31,82 MJ/L, dérivé de 112114-116090 Btu/gal", ["DOE"]],
  ["Prix essence Super U", "SP95-E10 = 1,989 €/L; flux consulté le 06/05/2026, dernier relevé station du 25/03/2026 09:38", ["FUELPRICE", "SUPERU"]],
  ["CO2 essence E10", "2,21 kg CO2/L SP95-E10 (ADEME Base Carbone, combustion TtW)", ["ADEME_E10"]],
  ["Pneus", "TSP = 0,0107 g/km x m/m_Note; PM10/TSP = 0,60; PM2,5/TSP = 0,42", ["EMEP", "BEDDOWS"]],
  ["Freins", "TSP = 0,0102 g/MJ x energie_plaquettes (post freinage moteur); PM10/TSP = 0,98; PM2,5/TSP = 0,39", ["HAGINO", "BRAKE", "EMEP"]],
  ["Chaussée", "TSP = 0,0150 g/km x m/m_Note; PM10/TSP = 0,50; PM2,5/TSP = 0,27", ["EMEP", "BEDDOWS"]],
  ["PM échappement essence", "PM = facteur véhicule x masse de carburant; 25 mg/kg (Note Euro 5), 90 mg/kg (Ram Tier 2), 120 mg/kg (X5 Euro 3); ajouté à PM10 total et PM2,5 total", ["EMEP_EXHAUST", "EMEP_TIER3", "EMEP_EURO_TIERS"]],
  ["Freinage moteur", "F_eb = 10 N.s/(m.L) x cylindrée x v; soustrait du freinage avant calcul des PM", ["ENGINE_BRAKE"]],
  ["Spatialisation freins", "PM frein local proportionnelle a l'energie de plaquettes du segment (apres freinage moteur)", ["HAGINO", "BRAKE"]],
];

const els = {};
let state = { ...DEFAULTS };

if (typeof document !== "undefined") document.addEventListener("DOMContentLoaded", () => {
  [
    "speedA",
    "speedB",
    "latAccel",
    "longAccel",
    "coldStart",
    "payload",
    "parkingIdle",
    "fuelPrice",
  ].forEach((id) => {
    els[id] = document.getElementById(id);
    els[`${id}Out`] = document.getElementById(`${id}Out`);
    els[id].addEventListener("input", () => {
      state[id] = Number(els[id].value);
      update();
    });
  });

  const twoTripsEl = document.getElementById("twoTrips");
  if (twoTripsEl) {
    twoTripsEl.checked = state.twoTrips;
    twoTripsEl.addEventListener("change", () => {
      state.twoTrips = twoTripsEl.checked;
      update();
    });
  }

  document.querySelectorAll("[data-vehicle]").forEach((button) => {
    button.addEventListener("click", () => {
      state.vehicleId = button.dataset.vehicle;
      document.querySelectorAll("[data-vehicle]").forEach((b) => b.classList.remove("is-active"));
      button.classList.add("is-active");
      update();
    });
  });

  document.querySelectorAll("[data-direction]").forEach((button) => {
    button.addEventListener("click", () => {
      state.direction = button.dataset.direction;
      document.querySelectorAll("[data-direction]").forEach((b) => b.classList.remove("is-active"));
      button.classList.add("is-active");
      update();
    });
  });

  document.getElementById("resetButton").addEventListener("click", () => {
    state = { ...DEFAULTS };
    Object.entries(DEFAULTS).forEach(([key, value]) => {
      if (els[key]) els[key].value = value;
    });
    if (twoTripsEl) twoTripsEl.checked = state.twoTrips;
    document.querySelectorAll("[data-direction]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.direction === state.direction);
    });
    document.querySelectorAll("[data-vehicle]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.vehicle === state.vehicleId);
    });
    update();
  });

  initVehicleTooltips();
  renderSources();
  update();
});

function update() {
  syncOutputs();
  const route = getDirectionalRoute(state.direction);
  const params = getParams();
  const scenarioA = simulate(state.speedA, params, route);
  const scenarioB = simulate(state.speedB, params, route);
  renderRouteFacts(route);
  renderMetrics(scenarioA, scenarioB);
  renderBreakdown(scenarioA, scenarioB);
  drawProfile(route, scenarioA, scenarioB);
  drawMap(route);
}

function syncOutputs() {
  const fr = new Intl.NumberFormat("fr-FR");
  document.getElementById("speedAOut").textContent = `${fr.format(state.speedA)} km/h`;
  document.getElementById("speedBOut").textContent = `${fr.format(state.speedB)} km/h`;
  document.getElementById("latOut").textContent = `${state.latAccel.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} m/s2`;
  document.getElementById("longOut").textContent = `${state.longAccel.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} m/s2`;
  document.getElementById("coldStartOut").textContent = `${fr.format(state.coldStart)} s`;
  document.getElementById("payloadOut").textContent = `${fr.format(state.payload)} kg`;
  document.getElementById("parkingIdleOut").textContent = `${fr.format(state.parkingIdle)} s`;
  document.getElementById("fuelPriceOut").textContent = `${state.fuelPrice.toLocaleString("fr-FR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} €/L`;
}

function getParams() {
  const vehicle = VEHICLES[state.vehicleId] || VEHICLES.note;
  return {
    // Effective mass = curb + payload. Affects every mass-scaled output (climb work,
    // brake work, tyre/road PM via massScale).
    mass: vehicle.mass + state.payload,
    curbMass: vehicle.mass,
    cd: vehicle.cd,
    area: vehicle.area,
    crr: vehicle.crr,
    displacementL: vehicle.displacementL,
    exhaustPmMgPerKgFuel: vehicle.exhaustPmMgPerKgFuel,
    maxPowerW: vehicle.maxPowerW,
    pmaxSpeedMps: vehicle.pmaxSpeedMps,
    latAccel: state.latAccel,
    longAccel: state.longAccel,
    coldStartSeconds: state.coldStart,
    parkingIdleSeconds: state.parkingIdle,
    fuelPriceEurPerL: state.fuelPrice,
    twoTrips: state.twoTrips,
  };
}

function initVehicleTooltips() {
  document.querySelectorAll("[data-vehicle]").forEach((button) => {
    const vehicle = VEHICLES[button.dataset.vehicle];
    if (!vehicle) return;

    const specs = [
      ["Masse", fmt(vehicle.mass, 0, " kg")],
      ["Cd", fmt(vehicle.cd, 2, "")],
      ["Surface", fmt(vehicle.area, 2, " m2")],
      ["Crr", fmt(vehicle.crr, 3, "")],
      ["Cylindrée", fmt(vehicle.displacementL, 1, " L")],
      ["Puissance", fmt(vehicle.maxPowerW / 1000, 0, " kW")],
      ["Norme", `${vehicle.euroTier} (${fmt(vehicle.exhaustPmMgPerKgFuel, 0, " mg PM/kg")})`],
      ["Sources", vehicle.sources.join(" / ")],
    ];
    const tooltipId = `vehicle-tooltip-${button.dataset.vehicle}`;
    const tooltip = document.createElement("span");
    tooltip.className = "vehicle-tooltip";
    tooltip.id = tooltipId;
    tooltip.setAttribute("role", "tooltip");
    tooltip.innerHTML = specs
      .map(([label, value]) => `
        <span class="${label === "Sources" ? "is-source" : ""}">
          <em>${label}</em>
          <strong>${value}</strong>
        </span>
      `)
      .join("");

    button.appendChild(tooltip);
    button.setAttribute("aria-describedby", tooltipId);
    button.setAttribute(
      "aria-label",
      `${vehicle.label}, ${vehicle.subtitle}. ${specs.map(([label, value]) => `${label}: ${value}`).join("; ")}`,
    );
  });
}


function getDirectionalRoute(direction) {
  const totalKm = ROUTE.distanceM / 1000;
  const uphillPoints = ROUTE.pointsUphill.map(([km, lat, lon, elev]) => ({ km, lat, lon, elev }));
  const downhillPoints = ROUTE.pointsUphill
    .map(([km, lat, lon, elev]) => ({ km: totalKm - km, lat, lon, elev }))
    .sort((a, b) => a.km - b.km);
  const uphillCurves = ROUTE.curvesUphill.map((curve) => ({ ...curve }));
  const downhillCurves = ROUTE.curvesUphill
    .map((curve) => ({ ...curve, km: totalKm - curve.km }))
    .sort((a, b) => a.km - b.km);
  const uphillSpeedLimits = ROUTE.speedLimitsUphill.map((limit) => ({ ...limit }));
  const downhillSpeedLimits = reverseSpeedLimits(ROUTE.speedLimitsUphill, totalKm);
  const uphillMapPoints = ROUTE.mapPointsUphill.map(([lat, lon]) => ({ lat, lon }));

  if (direction === "up") {
    return {
      direction,
      label: "Super U Passy -> Maison médicale du Plateau d'Assy",
      distanceM: ROUTE.distanceM,
      points: uphillPoints,
      curves: uphillCurves,
      speedLimits: uphillSpeedLimits,
      mapPoints: uphillMapPoints,
    };
  }

  if (direction === "round") {
    return {
      direction,
      label: "Aller-retour Super U Passy <-> Maison médicale du Plateau d'Assy",
      distanceM: ROUTE.distanceM * 2,
      points: [
        ...uphillPoints,
        ...downhillPoints.slice(1).map((point) => ({ ...point, km: totalKm + point.km })),
      ],
      curves: [
        ...uphillCurves,
        ...downhillCurves.map((curve) => ({ ...curve, km: totalKm + curve.km })),
      ].sort((a, b) => a.km - b.km),
      speedLimits: [
        ...uphillSpeedLimits,
        ...downhillSpeedLimits.map((limit) => ({
          ...limit,
          startKm: totalKm + limit.startKm,
          endKm: totalKm + limit.endKm,
        })),
      ],
      mapPoints: [
        ...uphillMapPoints,
        ...uphillMapPoints.slice(0, -1).reverse(),
      ],
      turnMapIndex: uphillMapPoints.length - 1,
    };
  }

  return {
    direction,
    label: "Maison médicale du Plateau d'Assy -> Super U Passy",
    distanceM: ROUTE.distanceM,
    points: downhillPoints,
    curves: downhillCurves,
    speedLimits: downhillSpeedLimits,
    mapPoints: uphillMapPoints.reverse(),
  };
}

function reverseSpeedLimits(limits, totalKm) {
  return limits
    .map((limit) => ({
      ...limit,
      startKm: totalKm - limit.endKm,
      endKm: totalKm - limit.startKm,
    }))
    .sort((a, b) => a.startKm - b.startKm);
}

function buildSpeedProfile(targetKmh, params, route, n) {
  const targetMps = kmhToMps(targetKmh);
  const minSpeed = kmhToMps(5);
  const oneWayM = ROUTE.distanceM;
  // Hard cap means the cruise slider is enforced as an upper bound during the climb;
  // soft cap (the descent coasting profile) lets the car coast above it. A round trip
  // is climb-then-descent, so the climb half (m < oneWayM) is hard-capped, the descent
  // half is soft-capped — same physics as picking "up" then "down" separately.
  const isHardCapAt = (m) => (
    route.direction === "up"
    || (route.direction === "round" && m <= oneWayM)
  );
  const points = [];

  for (let i = 0; i <= n; i += 1) {
    const m = (route.distanceM * i) / n;
    const km = m / 1000;
    const speedLimitMps = kmhToMps(speedLimitAt(route, km));
    let speedMps = isHardCapAt(m) ? Math.min(targetMps, speedLimitMps) : speedLimitMps;

    route.curves.forEach((curve) => {
      const curveM = curve.km * 1000;
      const curveSpeedLimitMps = kmhToMps(speedLimitAt(route, curve.km));
      const curveCap = Math.min(
        isHardCapAt(curveM) ? targetMps : Number.POSITIVE_INFINITY,
        curveSpeedLimitMps,
        Math.sqrt(params.latAccel * curve.radiusM),
      );
      // The curve-cap holds across the full arc length R x angle, not just at the apex,
      // so a fast vehicle cannot exceed it while still inside the bend. See CURVE.
      const arcLengthM = curve.radiusM * Math.abs(curve.angleDeg) * (Math.PI / 180);
      const halfArcM = arcLengthM / 2;
      if (m >= curveM - halfArcM && m <= curveM + halfArcM) {
        speedMps = Math.min(speedMps, curveCap);
        return;
      }
      // Approach lookahead before the curve; departure (after curveM + halfArc) is handled
      // by the forward pass with engine-power-limited acceleration. Effective decel is
      // gravity-aided uphill and gravity-opposed downhill; clamp >= 0.5 m/s2 so very
      // steep slopes still allow a stop. See COMFORT.
      if (m > curveM) return;
      const approachStartM = curveM - halfArcM;
      const elevHere = interpolateElevation(route.points, km);
      const elevCurve = interpolateElevation(route.points, curve.km);
      const slopeTheta = Math.atan2(elevCurve - elevHere, Math.max(approachStartM - m, 0.1));
      const decel = Math.max(0.5, params.longAccel + CONSTANTS.g * Math.sin(slopeTheta));
      const approachLimit = Math.sqrt(curveCap * curveCap + 2 * decel * (approachStartM - m));
      speedMps = Math.min(speedMps, approachLimit);
    });

    points.push({
      km,
      m,
      elev: interpolateElevation(route.points, km),
      speedMps: Math.max(minSpeed, speedMps),
      limitKmh: speedLimitAt(route, km),
    });
  }

  // Vehicle starts at the Super U car park, ends at the maison médicale, and (round trip)
  // halts at the turnaround. Anchoring v=0 here lets the kinematic passes ramp the speeds
  // to and from rest with the launch fuel and brake events the cruise-only model missed.
  points[0].speedMps = 0;
  points[points.length - 1].speedMps = 0;
  if (route.direction === "round") {
    points[findIndexNearestM(points, ROUTE.distanceM)].speedMps = 0;
  }

  // Forward pass: accel is min(comfort, engine-limited at this slope and speed). Heavy
  // vehicles cannot match the comfort target uphill at high v. See EU_POWER.
  // powerLimitedM accumulates ds for segments where the engine cap actually lowered the
  // next speed: poweredAccel < comfort AND the resulting cap is below what the curve
  // / limit / slider had already set. A car cruising under a tight curve cap with low
  // demand is therefore not flagged.
  //
  // We run forward then backward, then forward once more (Gauss-Seidel sweep): the
  // backward pass can lower v_i, which means the previous forward result for v_{i+1}
  // may no longer be reachable from the new v_i. Re-running forward enforces kinematic
  // consistency. The diagnostic powerLimitedM is taken from the final forward pass.
  const runForwardPass = () => {
    let limited = 0;
    for (let i = 1; i < points.length; i += 1) {
      const a = points[i - 1];
      const b = points[i];
      const ds = b.m - a.m;
      const theta = Math.atan2(b.elev - a.elev, Math.max(ds, 0.1));
      const rho = airDensity((a.elev + b.elev) / 2);
      const aPowered = poweredAccel(params, a.speedMps, theta, rho);
      const accelEff = Math.min(params.longAccel, aPowered);
      const accelLimit = Math.sqrt(Math.max(0, a.speedMps * a.speedMps + 2 * accelEff * ds));
      const cappedSpeed = Math.max(minSpeed, accelLimit);
      if (aPowered < params.longAccel && cappedSpeed < points[i].speedMps - 1e-6) {
        limited += ds;
      }
      points[i].speedMps = Math.min(points[i].speedMps, cappedSpeed);
    }
    return limited;
  };

  runForwardPass();

  // Backward pass: comfort decel adjusted for slope (uphill braking is gravity-aided,
  // downhill is gravity-opposed). Clamp >= 0.5 m/s2 to keep stops feasible on steep grades.
  for (let i = points.length - 2; i >= 0; i -= 1) {
    const a = points[i];
    const b = points[i + 1];
    const ds = b.m - a.m;
    const theta = Math.atan2(b.elev - a.elev, Math.max(ds, 0.1));
    const decelEff = Math.max(0.5, params.longAccel + CONSTANTS.g * Math.sin(theta));
    const brakeLimit = Math.sqrt(b.speedMps * b.speedMps + 2 * decelEff * ds);
    points[i].speedMps = Math.min(points[i].speedMps, brakeLimit);
  }

  // Second forward pass: enforces engine-cap kinematic consistency after the backward
  // pass possibly lowered some v_i. Final powerLimitedM comes from this pass.
  const powerLimitedM = runForwardPass();

  if (route.direction === "up") return { points, powerLimitedM };

  // Descent or round trip: apply the coasting profile only to the descent half. For a
  // round trip, the uphill leg stays under the hard cap from isHardCapAt above — same
  // physics as picking the dedicated "up" direction. The descent leg starts at the
  // turnaround point, where the speed was anchored to 0 above.
  const coastStartIdx = route.direction === "round"
    ? findIndexNearestM(points, ROUTE.distanceM)
    : 0;
  const coastedPoints = applyCoastingDescentProfile(points, targetMps, params, coastStartIdx);
  return { points: coastedPoints, powerLimitedM };
}

function findIndexNearestM(points, targetM) {
  let nearest = 0;
  for (let i = 1; i < points.length; i += 1) {
    if (Math.abs(points[i].m - targetM) < Math.abs(points[nearest].m - targetM)) nearest = i;
  }
  return nearest;
}

// On a descent the cruise slider acts as a soft cap: the car coasts above it but powers
// up to it when coasting drag would slow the car below. Curve and limit caps were already
// pre-applied by the backward pass in buildSpeedProfile, so the Math.min below preserves
// them — do not "fix" by removing the clamp. See DYN.
//
// For round trips, startIdx points at the turnaround; the uphill half keeps the hard-cap
// result from the forward pass (same physics as a one-way "up" trip).
function applyCoastingDescentProfile(capPoints, targetMps, params, startIdx) {
  const minSpeed = kmhToMps(5);
  const points = capPoints.map((point) => ({ ...point }));

  for (let i = startIdx + 1; i < points.length; i += 1) {
    const previous = points[i - 1];
    const point = points[i];
    const ds = point.m - previous.m;
    const dsForSlope = Math.max(ds, 0.1);
    const theta = Math.atan2(point.elev - previous.elev, dsForSlope);
    const rho = airDensity((previous.elev + point.elev) / 2);
    const freeAccel = coastingAcceleration(previous.speedMps, previous, point, params);
    const freeSpeed = Math.sqrt(Math.max(minSpeed * minSpeed, previous.speedMps * previous.speedMps + 2 * freeAccel * ds));
    let nextSpeed = freeSpeed;

    if (freeSpeed < targetMps) {
      // Powered ramp toward the cruise target, capped by what the engine can deliver at
      // this slope and speed. Without this cap a heavy SUV would accelerate uphill at the
      // comfort target in round-trip mode. See EU_POWER.
      const aPowered = poweredAccel(params, previous.speedMps, theta, rho);
      const aEff = Math.max(0, Math.min(params.longAccel, aPowered));
      const poweredSpeed = Math.sqrt(previous.speedMps * previous.speedMps + 2 * aEff * ds);
      nextSpeed = Math.max(freeSpeed, Math.min(targetMps, poweredSpeed));
    }

    point.speedMps = Math.min(point.speedMps, Math.max(minSpeed, nextSpeed));
  }

  return points;
}

// Instantaneous coasting deceleration at speedMps on the slope between a and b.
// Note: this evaluates aero and rolling at the *point* speed, while simulate() integrates
// work over space using the spatial mean <v^2> = (v_a^2 + v_b^2) / 2. Both are correct
// for what they compute (instantaneous decel here vs. integrated work there); the
// asymmetry is intentional. See DYN, MICHELIN_CRR.
function coastingAcceleration(speedMps, a, b, params) {
  const ds = Math.max(b.m - a.m, 0.1);
  const dh = b.elev - a.elev;
  const theta = Math.atan2(dh, ds);
  const speed = Math.max(speedMps, kmhToMps(3));
  const rho = airDensity((a.elev + b.elev) / 2);
  const fRoll = effectiveCrr(params.crr, speed) * params.mass * CONSTANTS.g * Math.cos(theta);
  const fAero = 0.5 * rho * params.cd * params.area * speed * speed;
  const fGrade = params.mass * CONSTANTS.g * Math.sin(theta);
  return -(fRoll + fAero + fGrade) / params.mass;
}

// Maximum forward acceleration the powertrain can deliver at speed v on slope theta.
// Force model: constant maximum torque below v_Pmax, constant power above. This avoids
// the unphysical infinite force that P_max/v would imply at v -> 0. The peak power is
// also derated by air density (naturally aspirated engines lose ~1 %/100 m). The comfort
// accel from the slider is then clamped by this so heavy SUVs cannot accelerate uphill
// at the same rate as the Note. See EU_POWER, EPA_DRIVELINE, TORQUE_CURVE, SAE_J1349.
function poweredAccel(params, speedMps, theta, rho) {
  const v = Math.max(speedMps, kmhToMps(5));
  const fRoll = effectiveCrr(params.crr, v) * params.mass * CONSTANTS.g * Math.cos(theta);
  const fAero = 0.5 * rho * params.cd * params.area * v * v;
  const fGrade = params.mass * CONSTANTS.g * Math.sin(theta);
  const pAvail = params.maxPowerW * CONSTANTS.drivetrainEfficiency * (rho / CONSTANTS.rho0);
  const fAvail = pAvail / Math.max(params.pmaxSpeedMps || 30, v);
  return (fAvail - fRoll - fAero - fGrade) / params.mass;
}

function speedLimitAt(route, km) {
  const segment = route.speedLimits?.find((limit) => (
    km >= limit.startKm - 1e-6 && km <= limit.endKm + 1e-6
  ));
  return segment ? segment.kmh : CONSTANTS.ruralSpeedKmh;
}

function simulate(targetKmh, params, route) {
  // Segment count proportional to route length so a round trip uses the same ds as a
  // one-way trip (~39 m). Otherwise n = 260 forced round trips into 79 m segments and
  // accumulated discretization error: round trip stopped equaling up + down.
  const distanceM = route.distanceM;
  const n = Math.max(2, Math.round(distanceM / 39.4));
  const profile = buildSpeedProfile(targetKmh, params, route, n);
  const points = profile.points;
  // Diagnostic: distance over which the forward pass actually lowered the next speed
  // because the engine cap (poweredAccel < comfort) was tighter than the curve / limit /
  // slider cap. Cars cruising under a tight curve cap with low demand are not flagged.
  // See EU_POWER, TORQUE_CURVE.
  const powerLimitedDistanceM = profile.powerLimitedM;

  let tractionJ = 0;
  let brakeJ = 0;        // friction-brake (pad) work only, after engine-brake share is removed
  let engineBrakeJ = 0;  // diagnostic: energy dissipated in the engine while coasting
  let aeroJ = 0;
  let rollJ = 0;
  let climbJ = 0;
  let inertiaJ = 0;
  let timeS = 0;
  // Per-segment fuel is accumulated directly so the cold-start window can integrate the
  // *actual* fuel rate during the launch (which is 3-5x the trip mean) rather than a
  // time pro-rata of the trip-mean rate. The pro-rata version under-counted cold-start
  // surcharge by ~5x for trips longer than a few minutes. See WILLANS, COLD_START.
  let warmFuelL = 0;
  let coldWindowFuelL = 0;
  // The "deux trajets séparés" toggle doubles the cold window for round trips: the
  // engine cools at the turnaround, so the descent leg gets its own catalyst light-off.
  // The doubling is applied to the *single* window length so it still integrates the
  // launch's high fuel rate correctly (there's no second "launch" — just a longer cold
  // window — but for trip totals the two are interchangeable).
  const tripCountForColdStart = (route.direction === "round" && params.twoTrips) ? 2 : 1;
  const coldEndS = tripCountForColdStart * (params.coldStartSeconds || 0);
  const fuelDensityKgL = CONSTANTS.gasolineDensityKgPerL;
  const idleRateLPerS = (CONSTANTS.idleFuelGPerSPerL * params.displacementL) / (fuelDensityKgL * 1000);
  const fuelLhvJ = CONSTANTS.gasolineLhvMJPerL * 1e6;
  const fuelDivisor = CONSTANTS.drivetrainEfficiency * CONSTANTS.indicatedEfficiency * fuelLhvJ;
  let idleSecondsS = 0;
  const brakeBySegment = [];

  for (let i = 0; i < n; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    const ds = b.m - a.m;
    const dh = b.elev - a.elev;
    const theta = Math.atan2(dh, ds);
    const vAvg = Math.max((a.speedMps + b.speedMps) / 2, kmhToMps(3));
    const acc = (b.speedMps * b.speedMps - a.speedMps * a.speedMps) / (2 * ds);

    // For aero and the v^2 part of Crr(v), integrate over space: the spatial mean of v^2
    // for constant-accel kinematics is (v_a^2 + v_b^2) / 2, NOT vAvg^2 (Jensen's
    // inequality - the launch segment is otherwise undercounted by 2x).
    const vSqMean = (a.speedMps * a.speedMps + b.speedMps * b.speedMps) / 2;
    const rho = airDensity((a.elev + b.elev) / 2);
    const crrV = params.crr * (1 + vSqMean / (CONSTANTS.crrSpeedRefMps * CONSTANTS.crrSpeedRefMps));
    const fRoll = crrV * params.mass * CONSTANTS.g * Math.cos(theta);
    const fAero = 0.5 * rho * params.cd * params.area * vSqMean;
    const fGrade = params.mass * CONSTANTS.g * Math.sin(theta);
    // Rotational inertia of wheels + driveline acts like extra translational mass during
    // acceleration. See ROT_INERTIA.
    const fInertia = params.mass * (1 + CONSTANTS.rotInertiaLambda) * acc;
    const fWheel = fRoll + fAero + fGrade + fInertia;
    const dt = ds / vAvg;

    // When wheels pull (fWheel > 0), engine drives the car. When wheels overrun the engine
    // (fWheel < 0), some of the deceleration is absorbed by the engine itself (pumping +
    // FMEP) and only the residual feeds the friction brakes. See ENGINE_BRAKE.
    const fEngineBrake = CONSTANTS.engineBrakeNPerLPerMps * params.displacementL * vAvg;
    const overrun = Math.max(-fWheel, 0);
    const fEngineAbsorbed = Math.min(overrun, fEngineBrake);
    const fFrictionBrake = overrun - fEngineAbsorbed;

    tractionJ += Math.max(fWheel, 0) * ds;
    brakeJ += fFrictionBrake * ds;
    engineBrakeJ += fEngineAbsorbed * ds;
    aeroJ += fAero * ds;
    rollJ += fRoll * ds;
    climbJ += Math.max(fGrade, 0) * ds;
    inertiaJ += Math.max(fInertia, 0) * ds;

    // Per-segment Willans-line fuel: traction work / (eta_dt * eta_ind * Hu) plus idle
    // when not in DFCO. See WILLANS, IDLE_FUEL.
    const segTractionFuelL = (Math.max(fWheel, 0) * ds) / fuelDivisor;
    const segIdleFuelL = (fWheel > 0 || vAvg < kmhToMps(CONSTANTS.dfcoMinKmh))
      ? idleRateLPerS * dt
      : 0;
    const segFuelL = segTractionFuelL + segIdleFuelL;
    warmFuelL += segFuelL;
    if (timeS < coldEndS) {
      // The cold window may span only part of this segment.
      const fracInWindow = Math.min(1, (coldEndS - timeS) / Math.max(dt, 1e-9));
      coldWindowFuelL += segFuelL * fracInWindow;
    }
    timeS += dt;
    if (fWheel > 0 || vAvg < kmhToMps(CONSTANTS.dfcoMinKmh)) {
      idleSecondsS += dt;
    }
    brakeBySegment.push({
      km: (a.km + b.km) / 2,
      energyJ: fFrictionBrake * ds,
    });
  }

  // Parking idle: engine on at v=0 anchors. One-way trip = 2 anchors (departure +
  // arrival), round trip = 3 anchors (departure + turnaround + arrival). Adds idle
  // fuel and time but no kinematic work. See IDLE_FUEL.
  const idleAnchorCount = route.direction === "round" ? 3 : 2;
  const parkingIdleS = idleAnchorCount * (params.parkingIdleSeconds || 0);
  const parkingIdleFuelL = idleRateLPerS * parkingIdleS;
  warmFuelL += parkingIdleFuelL;
  // Parking idle is treated as occurring before / after the trip; it is included in the
  // cold window only to the extent that coldEndS exceeds the moving time.
  if (timeS < coldEndS) {
    const remainingCold = Math.min(parkingIdleS, coldEndS - timeS);
    coldWindowFuelL += idleRateLPerS * remainingCold;
  }
  timeS += parkingIdleS;
  idleSecondsS += parkingIdleS;

  // Cold-start surcharge: during the cold window the engine burns +30 % more fuel and
  // the catalyst lets through ~7x exhaust PM. coldFractionByFuel is the share of warm
  // fuel actually burned during the first coldStartSeconds, so the launch (high
  // instantaneous fuel rate) gets the right weight - unlike the previous time pro-rata.
  // See COLD_START.
  const coldFractionByFuel = warmFuelL > 0 ? coldWindowFuelL / warmFuelL : 0;
  const coldStartFuelL = coldWindowFuelL * 0.30;
  const fuelL = warmFuelL + coldStartFuelL;
  const fuelPriceEurPerL = (params.fuelPriceEurPerL ?? CONSTANTS.fuelPriceEurPerL);
  const fuelCostEur = fuelL * fuelPriceEurPerL;
  const distanceKm = distanceM / 1000;
  const avgKmh = (distanceKm / (timeS / 3600));
  const massScale = params.mass / VEHICLES.note.mass;
  // Tyre and road wear keep the EMEP/Beddows mass-scaled km factors; brake wear is now
  // tied to the friction-brake work computed above (HAGINO), which already encodes mass,
  // speed and grade through brakeJ.
  const tyreTsp = distanceKm * CONSTANTS.tyreTspGKm * massScale;
  const brakeTsp = (brakeJ / 1e6) * CONSTANTS.brakeTspGPerMJ;
  const roadTsp = distanceKm * CONSTANTS.roadTspGKm * massScale;
  const pm10G =
    tyreTsp * CONSTANTS.tyrePM10 +
    brakeTsp * CONSTANTS.brakePM10 +
    roadTsp * CONSTANTS.roadPM10;
  const pm25G =
    tyreTsp * CONSTANTS.tyrePM25 +
    brakeTsp * CONSTANTS.brakePM25 +
    roadTsp * CONSTANTS.roadPM25;
  // Tier 3 EMEP: PM échappement proportionnel à la masse de carburant brûlée. Pendant
  // la fenêtre démarrage à froid, le catalyseur n'est pas amorcé, donc *toute* la fuel
  // brûlée durant ces secondes (baseline + surconsommation +30 %) émet ~7x plus de PM.
  // Ne pondérer que la surconsommation par 7x (le bug initial) sous-évaluerait le total
  // de ~20 %. See EMEP_TIER3, COLD_START.
  const warmFuelKg = warmFuelL * CONSTANTS.gasolineDensityKgPerL;
  const coldMultiplier = (1 - coldFractionByFuel) + coldFractionByFuel * 1.30 * 7;
  const exhaustPmMg = warmFuelKg * params.exhaustPmMgPerKgFuel * coldMultiplier;

  // Each segment's PM10 = energy_J x 1e-6 x brakeTspGPerMJ x brakePM10 (and similarly
  // PM2.5). Equivalent to (energy / total) x total but avoids the divide-by-zero guard.
  // See HAGINO.
  const brakeTotalPm10Mg = brakeTsp * CONSTANTS.brakePM10 * 1000;
  const brakeTotalPm25Mg = brakeTsp * CONSTANTS.brakePM25 * 1000;
  const brakePmHotspots = brakeBySegment.map((row) => {
    const tspMg = (row.energyJ / 1e6) * CONSTANTS.brakeTspGPerMJ * 1000;
    return {
      km: row.km,
      mg: tspMg * CONSTANTS.brakePM10,        // PM10, kept as `mg` for hotspot map back-compat
      pm10Mg: tspMg * CONSTANTS.brakePM10,
      pm25Mg: tspMg * CONSTANTS.brakePM25,
    };
  });

  return {
    targetKmh,
    points,
    distanceKm,
    timeMin: timeS / 60,
    avgKmh,
    fuelL,
    fuelCostEur,
    fuelLPer100: (fuelL / distanceKm) * 100,
    co2Kg: fuelL * CONSTANTS.co2KgPerL,
    tractionKWh: tractionJ / 3.6e6,
    brakeKWh: brakeJ / 3.6e6,
    engineBrakeKWh: engineBrakeJ / 3.6e6,
    aeroKWh: aeroJ / 3.6e6,
    rollKWh: rollJ / 3.6e6,
    climbKWh: climbJ / 3.6e6,
    inertiaKWh: inertiaJ / 3.6e6,
    pm10Mg: pm10G * 1000,
    pm25Mg: pm25G * 1000,
    exhaustPmMg,
    totalPm10Mg: pm10G * 1000 + exhaustPmMg,
    totalPm25Mg: pm25G * 1000 + exhaustPmMg,
    tyrePm10Mg: tyreTsp * CONSTANTS.tyrePM10 * 1000,
    brakePm10Mg: brakeTotalPm10Mg,
    brakePm25Mg: brakeTotalPm25Mg,
    roadPm10Mg: roadTsp * CONSTANTS.roadPM10 * 1000,
    brakePmHotspots,
    powerLimitedKm: powerLimitedDistanceM / 1000,
  };
}

function interpolateElevation(points, km) {
  if (km <= points[0].km) return points[0].elev;
  const last = points[points.length - 1];
  if (km >= last.km) return last.elev;
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    if (km >= a.km && km <= b.km) {
      const t = (km - a.km) / (b.km - a.km);
      return a.elev + (b.elev - a.elev) * t;
    }
  }
  return last.elev;
}

function kmhToMps(kmh) {
  return kmh / 3.6;
}

// ISA troposphere: ~10 % air-density drop between Passy (578 m) and Plateau d'Assy (1039 m).
// See ISA_DENSITY.
function airDensity(elevM) {
  return CONSTANTS.rho0 * Math.pow(1 - CONSTANTS.isaLapse * elevM, CONSTANTS.isaExp);
}

// Crr grows quadratically with speed: Crr(v) = Crr0 (1 + (v/v_ref)^2) with
// v_ref = crrSpeedRefMps. See MICHELIN_CRR.
function effectiveCrr(crr0, speedMps) {
  const r = speedMps / CONSTANTS.crrSpeedRefMps;
  return crr0 * (1 + r * r);
}

function renderRouteFacts(route) {
  const elevation = summarizeElevation(route.points);
  const oneWayDelta = Math.abs(
    ROUTE.pointsUphill[ROUTE.pointsUphill.length - 1][3] - ROUTE.pointsUphill[0][3],
  );
  const climbLabel = route.direction === "round"
    ? `+${fmt(oneWayDelta, 0, " m")} / -${fmt(oneWayDelta, 0, " m")}`
    : `${elevation.delta >= 0 ? "+" : ""}${fmt(elevation.delta, 0, " m")}`;
  const elevationFact = route.direction === "round"
    ? `+${fmt(oneWayDelta, 0, " m")} / -${fmt(oneWayDelta, 0, " m")}`
    : `${elevation.delta >= 0 ? "+" : ""}${fmt(elevation.delta, 0, " m")}`;

  document.getElementById("routeDistance").textContent = fmt(route.distanceM / 1000, 2, " km");
  document.getElementById("routeClimb").textContent = climbLabel;
  document.getElementById("routeFacts").innerHTML = [
    ["Trajet", route.label],
    ["Distance", fmt(route.distanceM / 1000, 2, " km")],
    ["Dénivelé", elevationFact],
    ["Limites", summarizeSpeedLimits(route)],
    ["Virages", `${route.curves.length} détectés`],
  ]
    .map(([label, value]) => `<div class="fact"><strong>${value}</strong><span>${label}</span></div>`)
    .join("");
}

function summarizeElevation(points) {
  let climb = 0;
  let descent = 0;

  for (let i = 1; i < points.length; i += 1) {
    const delta = points[i].elev - points[i - 1].elev;
    if (delta >= 0) climb += delta;
    else descent += Math.abs(delta);
  }

  return {
    delta: points[points.length - 1].elev - points[0].elev,
    climb,
    descent,
  };
}

function summarizeSpeedLimits(route) {
  const values = [...new Set(route.speedLimits.map((limit) => limit.kmh))].sort((a, b) => a - b);
  return values.length === 1 ? fmt(values[0], 0, " km/h") : `${values.map((value) => fmt(value, 0)).join("-")} km/h`;
}

function renderMetrics(a, b) {
  const vehicleRefs = getVehicleCalculationSources();
  const speedRefs = ["OSM", "LEGIFRANCE", "LEGIFRANCE_R4132"];
  const rows = [
    ["Carburant", "fuelL", " L", 2, true, ["DYN", "OTD", "CURVE", "COMFORT", "NAP15", "DOE", ...speedRefs, ...vehicleRefs], "Bilan longitudinal, rendement moteur et PCI essence.", "percent", "compact"],
    [`Coût carburant <small>${fmt(state.fuelPrice, 3, " €/L")}</small>`, "fuelCostEur", " €", 2, true, ["FUELPRICE", "DYN", "DOE", "NAP15", ...speedRefs, ...vehicleRefs], "Litres simulés multipliés par le prix essence (curseur Avancé; défaut SP95-E10 Super U Passy 25/03/2026).", "absolute", "compact"],
    ["Consommation", "fuelLPer100", " L/100 km", 1, true, ["DYN", "OTD", "NAP15", "DOE", ...speedRefs, ...vehicleRefs], "Carburant simulé rapporté à la distance routière."],
    ["CO2 échappement", "co2Kg", " kg", 2, true, ["DYN", "DOE", "EPA", "NAP15", ...speedRefs, ...vehicleRefs], "Litres d'essence multipliés par le facteur CO2 essence."],
    ["PM10 total", "totalPm10Mg", " mg", 0, true, ["EMEP", "EMEP_EXHAUST", "BEDDOWS", "BRAKE", ...speedRefs, ...vehicleRefs], "PM10 hors échappement + PM échappement essence, assimilé à PM10."],
    ["PM2,5 total", "totalPm25Mg", " mg", 0, true, ["EMEP", "EMEP_EXHAUST", "BEDDOWS", "BRAKE", ...speedRefs, ...vehicleRefs], "PM2,5 hors échappement + PM échappement essence."],
    ["PM10 hors échappement", "pm10Mg", " mg", 0, true, ["EMEP", "BEDDOWS", "BRAKE", ...speedRefs, ...vehicleRefs], "Facteurs pneus, freins et chaussée modulés par masse, limites de vitesse et freinage."],
    ["PM2,5 hors échappement", "pm25Mg", " mg", 0, true, ["EMEP", "BEDDOWS", "BRAKE", ...speedRefs, ...vehicleRefs], "Fractions PM2,5 appliquées aux émissions hors échappement."],
    ["Temps", "timeMin", " min", 1, true, ["OSM", "LEGIFRANCE", "CURVE", "COMFORT"], "Distance segmentée divisée par le profil de vitesse plafonné par les limites locales.", "absolute"],
    ["Vitesse moyenne", "avgKmh", " km/h", 1, false, ["OSM", "LEGIFRANCE", "CURVE", "COMFORT"], "Distance routière divisée par le temps simulé."],
    ["Distance moteur saturé", "powerLimitedKm", " km", 2, true, ["EU_POWER", "TORQUE_CURVE", "SAE_J1349", ...vehicleRefs], "Distance sur laquelle le moteur ne peut pas tenir la consigne de confort (poweredAccel < longAccel); diagnostic des montées soutenues.", "absolute"],
  ];

  document.getElementById("metrics").innerHTML = rows
    .map(([label, key, unit, digits, lowerIsBetter, refs, note, deltaMode, density], index) => metricTemplate(label, a, b, key, unit, digits, lowerIsBetter, refs, note, index, deltaMode, density))
    .join("");
}

function metricTemplate(label, a, b, key, unit, digits, lowerIsBetter, refs, note, index, deltaMode = "percent", density = "") {
  const delta = b[key] - a[key];
  const pct = a[key] === 0 ? 0 : (delta / a[key]) * 100;
  const worse = lowerIsBetter ? delta > 0 : delta < 0;
  const sign = delta > 0 ? "+" : "";
  const deltaLabel = deltaMode === "absolute"
    ? `${sign}${fmt(delta, digits, unit)}`
    : `${sign}${fmt(pct, 0, " %")}`;
  const tooltipId = `metric-source-${index}`;
  return `
    <article class="metric ${density ? `metric-${density}` : ""}" tabindex="0" aria-describedby="${tooltipId}">
      <div class="metric-head">
        <span>${label}</span>
        <span class="delta ${worse ? "is-worse" : ""}">${deltaLabel}</span>
      </div>
      <div class="metric-values">
        <div><strong>${fmt(a[key], digits, unit)}</strong><span>A ${fmt(a.targetKmh, 0, " km/h")}</span></div>
        <div><strong>${fmt(b[key], digits, unit)}</strong><span>B ${fmt(b.targetKmh, 0, " km/h")}</span></div>
      </div>
      ${metricSourceTooltip(tooltipId, note, refs)}
    </article>
  `;
}

function getVehicleCalculationSources() {
  const vehicle = VEHICLES[state.vehicleId] || VEHICLES.note;
  return vehicle.sources.filter((ref) => !ref.startsWith("PHOTO_"));
}

function metricSourceTooltip(id, note, refs) {
  const sourceById = Object.fromEntries(SOURCES.map((source) => [source.id, source]));
  const uniqueRefs = [...new Set(refs)];

  return `
    <div class="metric-tooltip" id="${id}" role="tooltip">
      <strong>Sources de calcul</strong>
      <p>${note}</p>
      <div>
        ${uniqueRefs.map((ref) => {
          const source = sourceById[ref];
          return `<span><b>${ref}</b><small>${source ? source.title : "Source documentée"}</small></span>`;
        }).join("")}
      </div>
    </div>
  `;
}

function renderBreakdown(a, b) {
  const energyA = a.aeroKWh + a.rollKWh + a.climbKWh + a.inertiaKWh;
  const energyB = b.aeroKWh + b.rollKWh + b.climbKWh + b.inertiaKWh;
  const maxEnergy = Math.max(energyA, energyB, 0.01);
  const maxBrake = Math.max(a.brakeKWh, b.brakeKWh, 0.01);
  const pmRows = [
    ["Pneus", a.tyrePm10Mg, b.tyrePm10Mg],
    ["Freins", a.brakePm10Mg, b.brakePm10Mg],
    ["Chaussée", a.roadPm10Mg, b.roadPm10Mg],
  ];
  const maxPm = Math.max(...pmRows.flatMap(([, valueA, valueB]) => [valueA, valueB]), 1);
  document.getElementById("breakdown").innerHTML = `
    <section class="breakdown-section">
      <div class="breakdown-title">
        <span>PM10 hors échappement</span>
        <small>mg</small>
      </div>
      <div class="vertical-chart pm-chart">
        ${pmRows.map(([label, valueA, valueB]) => `
          <div class="bar-pair">
            ${verticalBar(`A ${fmt(a.targetKmh, 0, " km/h")}`, valueA, maxPm, " mg", 0, "a")}
            ${verticalBar(`B ${fmt(b.targetKmh, 0, " km/h")}`, valueB, maxPm, " mg", 0, "b")}
            <strong>${label}</strong>
          </div>
        `).join("")}
      </div>
    </section>

    <details class="advanced-breakdown">
      <summary>Avancé</summary>
      <section class="breakdown-section">
        <div class="breakdown-title">
          <span>Énergie positive aux roues</span>
          <small>kWh</small>
        </div>
        <div class="vertical-chart energy-chart">
          ${verticalBar(`A ${fmt(a.targetKmh, 0, " km/h")}`, energyA, maxEnergy, " kWh", 2, "a")}
          ${verticalBar(`B ${fmt(b.targetKmh, 0, " km/h")}`, energyB, maxEnergy, " kWh", 2, "b")}
        </div>
      </section>
      <section class="breakdown-section">
        <div class="breakdown-title">
          <span>Énergie freinée</span>
          <small>kWh</small>
        </div>
        <div class="vertical-chart energy-chart">
          ${verticalBar(`A ${fmt(a.targetKmh, 0, " km/h")}`, a.brakeKWh, maxBrake, " kWh", 2, "a")}
          ${verticalBar(`B ${fmt(b.targetKmh, 0, " km/h")}`, b.brakeKWh, maxBrake, " kWh", 2, "b")}
        </div>
      </section>
    </details>
  `;
}

function verticalBar(label, value, max, unit, digits, scenario) {
  const height = Math.max(4, Math.min(100, (value / max) * 100));
  return `
    <div class="vertical-bar scenario-${scenario}">
      <span>${fmt(value, digits, unit)}</span>
      <div class="vertical-track">
        <div class="vertical-fill" style="height:${height}%"></div>
      </div>
      <em>${label}</em>
    </div>
  `;
}

function drawProfile(route, a, b) {
  const canvas = document.getElementById("profileCanvas");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * ratio);
  canvas.height = Math.floor(rect.height * ratio);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const width = rect.width;
  const height = rect.height;
  const pad = { top: 28, right: 58, bottom: 44, left: 56 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const allElev = route.points.map((p) => p.elev);
  const minElev = Math.floor((Math.min(...allElev) - 20) / 20) * 20;
  const maxElev = Math.ceil((Math.max(...allElev) + 20) / 20) * 20;
  const maxSpeed = Math.max(state.speedA, state.speedB, 90);
  const totalKm = route.distanceM / 1000;

  const x = (km) => pad.left + (km / totalKm) * innerW;
  const yElev = (elev) => pad.top + (1 - (elev - minElev) / (maxElev - minElev)) * innerH;
  const ySpeed = (mps) => pad.top + (1 - (mps * 3.6) / maxSpeed) * innerH;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#4a5565";
  ctx.font = "12px Inter, system-ui, sans-serif";
  for (let i = 0; i <= 4; i += 1) {
    const yy = pad.top + (i / 4) * innerH;
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(width - pad.right, yy);
    ctx.stroke();
    const elev = maxElev - ((maxElev - minElev) * i) / 4;
    ctx.fillText(`${Math.round(elev)} m`, 8, yy + 4);
    const speed = Math.round(maxSpeed - (maxSpeed * i) / 4);
    ctx.fillText(`${speed}`, width - 36, yy + 4);
  }

  const hotspotMax = Math.max(...b.brakePmHotspots.map((p) => p.mg), 0.001);
  b.brakePmHotspots.forEach((p) => {
    const alpha = Math.min(0.48, p.mg / hotspotMax);
    if (alpha <= 0.02) return;
    ctx.fillStyle = `rgba(228, 0, 20, ${alpha})`;
    ctx.fillRect(x(p.km) - 1.5, pad.top, 3, innerH);
  });

  ctx.beginPath();
  route.points.forEach((point, index) => {
    const xx = x(point.km);
    const yy = yElev(point.elev);
    if (index === 0) ctx.moveTo(xx, yy);
    else ctx.lineTo(xx, yy);
  });
  ctx.lineTo(x(totalKm), pad.top + innerH);
  ctx.lineTo(x(0), pad.top + innerH);
  ctx.closePath();
  ctx.fillStyle = "rgba(58, 171, 59, 0.11)";
  ctx.fill();

  drawLine(ctx, route.points, (p) => x(p.km), (p) => yElev(p.elev), "#4a5565", 2);
  ctx.save();
  ctx.setLineDash([6, 5]);
  drawLine(ctx, speedLimitLinePoints(route), (p) => x(p.km), (p) => ySpeed(kmhToMps(p.kmh)), "#6a7282", 2);
  ctx.restore();
  drawLine(ctx, a.points, (p) => x(p.km), (p) => ySpeed(p.speedMps), "#3aab3b", 3);
  drawLine(ctx, b.points, (p) => x(p.km), (p) => ySpeed(p.speedMps), "#1d6ab2", 3);

  route.curves.forEach((curve) => {
    const xx = x(curve.km);
    ctx.strokeStyle = "rgba(237, 178, 0, 0.82)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(xx, pad.top + innerH - 12);
    ctx.lineTo(xx, pad.top + innerH + 6);
    ctx.stroke();
    ctx.fillStyle = "#edb200";
    ctx.beginPath();
    ctx.arc(xx, pad.top + innerH - 14, Math.max(3, Math.min(7, curve.angleDeg / 26)), 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.strokeStyle = "#d1d5db";
  ctx.lineWidth = 1;
  ctx.strokeRect(pad.left, pad.top, innerW, innerH);
  ctx.fillStyle = "#4a5565";
  ctx.fillText("distance", pad.left + innerW / 2 - 22, height - 14);
  ctx.fillText("km/h", width - 36, pad.top - 8);
}

function speedLimitLinePoints(route) {
  const totalKm = route.distanceM / 1000;
  return route.speedLimits.flatMap((limit) => [
    { km: Math.max(0, Math.min(totalKm, limit.startKm)), kmh: limit.kmh },
    { km: Math.max(0, Math.min(totalKm, limit.endKm)), kmh: limit.kmh },
  ]);
}

function drawMap(route) {
  const map = document.getElementById("mapView");
  const rect = map.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  if (!width || !height) return;

  const points = route.mapPoints;
  const zoom = chooseTileZoom(points, width, height);
  const projected = points.map((p) => projectTilePoint(p.lat, p.lon, zoom));
  const minX = Math.min(...projected.map((p) => p.x));
  const maxX = Math.max(...projected.map((p) => p.x));
  const minY = Math.min(...projected.map((p) => p.y));
  const maxY = Math.max(...projected.map((p) => p.y));
  const center = {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2,
  };
  const origin = {
    x: center.x - width / 2,
    y: center.y - height / 2,
  };
  const xy = (p) => ({
    x: p.x - origin.x,
    y: p.y - origin.y,
  });

  const tileLayer = renderTileLayer(origin, width, height, zoom);
  const path = projected.map((point) => {
    const pos = xy(point);
    return `${pos.x.toFixed(1)},${pos.y.toFixed(1)}`;
  }).join(" ");
  const speedPaths = renderSpeedLimitMapSegments(route, projected, xy);
  const arrows = renderMapArrows(projected, xy);
  const curves = route.curves.map((curve) => {
    const point = pointAtRouteFraction(projected, curve.km / (route.distanceM / 1000));
    const pos = xy(point);
    const radius = Math.max(8, Math.min(18, curve.angleDeg / 8));
    return `
      <circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="${radius.toFixed(1)}" fill="rgba(237, 178, 0, 0.2)"></circle>
      <circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="4" fill="#edb200"></circle>
    `;
  }).join("");
  const start = xy(projected[0]);
  const end = xy(projected[projected.length - 1]);
  const turn = Number.isInteger(route.turnMapIndex) ? xy(projected[route.turnMapIndex]) : null;
  const endpoints = route.direction === "round"
    ? `
      ${renderEndpointSvg(start, "Départ / arrivée", "#3aab3b", 12, -13)}
      ${turn ? renderEndpointSvg(turn, "Demi-tour", "#edb200", 12, 22) : ""}
    `
    : `
      ${renderEndpointSvg(start, "Départ", "#3aab3b", 12, -13)}
      ${renderEndpointSvg(end, "Arrivée", "#edb200", 12, 22)}
    `;

  map.innerHTML = `
    ${tileLayer}
    <svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <polyline points="${path}" fill="none" stroke="rgba(10,10,10,0.24)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"></polyline>
      <polyline points="${path}" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${speedPaths}
      ${arrows}
      ${curves}
      ${endpoints}
      <text x="${width - 32}" y="28" fill="#4a5565" font-size="12" font-weight="800">N</text>
      <path d="M${width - 28} 55 L${width - 28} 34 M${width - 28} 34 L${width - 34} 43 M${width - 28} 34 L${width - 22} 43" fill="none" stroke="#4a5565" stroke-width="2" stroke-linecap="round"></path>
    </svg>
    <div class="map-attribution">
      <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>
    </div>
    ${renderSpeedLimitMapLegend(route)}
  `;
}

function renderSpeedLimitMapSegments(route, projected, xy) {
  const totalKm = route.distanceM / 1000;
  return route.speedLimits.map((limit) => {
    const segmentPoints = projectedRouteSegmentPoints(
      projected,
      Math.max(0, limit.startKm / totalKm),
      Math.min(1, limit.endKm / totalKm),
    );
    const points = segmentPoints.map((point) => {
      const pos = xy(point);
      return `${pos.x.toFixed(1)},${pos.y.toFixed(1)}`;
    }).join(" ");

    return `
      <polyline points="${points}" fill="none" stroke="${speedLimitColor(limit.kmh)}" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"></polyline>
    `;
  }).join("");
}

function renderSpeedLimitMapLegend(route) {
  const limits = [...new Set(route.speedLimits.map((limit) => limit.kmh))].sort((a, b) => a - b);
  return `
    <div class="map-speed-legend" aria-hidden="true">
      ${limits.map((kmh) => `
        <span><i style="background:${speedLimitColor(kmh)}"></i>${fmt(kmh, 0, " km/h")}</span>
      `).join("")}
    </div>
  `;
}

function chooseTileZoom(points, width, height) {
  const padding = 8;
  for (let zoom = 17; zoom >= 12; zoom -= 1) {
    const projected = points.map((p) => projectTilePoint(p.lat, p.lon, zoom));
    const minX = Math.min(...projected.map((p) => p.x));
    const maxX = Math.max(...projected.map((p) => p.x));
    const minY = Math.min(...projected.map((p) => p.y));
    const maxY = Math.max(...projected.map((p) => p.y));
    if (maxX - minX <= width - padding * 2 && maxY - minY <= height - padding * 2) {
      return zoom;
    }
  }
  return 12;
}

function projectTilePoint(lat, lon, zoom) {
  const tileSize = 256;
  const scale = tileSize * 2 ** zoom;
  const latRad = (lat * Math.PI) / 180;
  return {
    x: ((lon + 180) / 360) * scale,
    y: ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * scale,
  };
}

function renderTileLayer(origin, width, height, zoom) {
  const tileSize = 256;
  const maxTile = 2 ** zoom;
  const startX = Math.floor(origin.x / tileSize);
  const endX = Math.floor((origin.x + width) / tileSize);
  const startY = Math.floor(origin.y / tileSize);
  const endY = Math.floor((origin.y + height) / tileSize);
  const tiles = [];
  for (let x = startX; x <= endX; x += 1) {
    for (let y = startY; y <= endY; y += 1) {
      if (y < 0 || y >= maxTile) continue;
      const wrappedX = ((x % maxTile) + maxTile) % maxTile;
      const left = Math.round(x * tileSize - origin.x);
      const top = Math.round(y * tileSize - origin.y);
      tiles.push(
        `<img src="https://tile.openstreetmap.org/${zoom}/${wrappedX}/${y}.png" alt="" decoding="async" referrerpolicy="no-referrer" style="left:${left}px;top:${top}px">`,
      );
    }
  }
  return tiles.join("");
}

function renderMapArrows(projected, xy) {
  const stops = [0.28, 0.52, 0.76];
  return stops.map((fraction) => {
    const current = pointAtRouteFraction(projected, fraction);
    const ahead = pointAtRouteFraction(projected, Math.min(0.99, fraction + 0.018));
    const a = xy(current);
    const b = xy(ahead);
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    return `
      <g transform="translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${angle.toFixed(1)})" opacity="0.72">
        <path d="M7 0 L-5 -5 L-2 0 L-5 5 Z" fill="#0a0a0a"></path>
      </g>
    `;
  }).join("");
}

function projectedRouteSegmentPoints(projected, startFraction, endFraction) {
  const measures = projectedRouteMeasures(projected);
  const totalLength = measures[measures.length - 1];
  const startLength = totalLength * Math.max(0, Math.min(1, startFraction));
  const endLength = totalLength * Math.max(0, Math.min(1, endFraction));
  const segment = [
    pointAtRouteLength(projected, measures, startLength),
    ...projected.filter((_, index) => measures[index] > startLength && measures[index] < endLength),
    pointAtRouteLength(projected, measures, endLength),
  ];

  return segment.filter((point, index) => (
    index === 0 || Math.hypot(point.x - segment[index - 1].x, point.y - segment[index - 1].y) > 0.1
  ));
}

function renderEndpointSvg(point, label, color, dx, dy) {
  return `
    <circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="7" fill="#ffffff"></circle>
    <circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="5.2" fill="${color}"></circle>
    <text x="${(point.x + dx).toFixed(1)}" y="${(point.y + dy).toFixed(1)}" fill="#0a0a0a" font-size="12" font-weight="800" paint-order="stroke" stroke="#ffffff" stroke-width="3">${label}</text>
  `;
}

function pointAtRouteFraction(projected, fraction) {
  const lengths = projectedRouteMeasures(projected);
  return pointAtRouteLength(
    projected,
    lengths,
    lengths[lengths.length - 1] * Math.max(0, Math.min(1, fraction)),
  );
}

function projectedRouteMeasures(projected) {
  const lengths = [0];
  for (let i = 1; i < projected.length; i += 1) {
    const prev = projected[i - 1];
    const current = projected[i];
    const d = Math.hypot(current.x - prev.x, current.y - prev.y);
    lengths[i] = lengths[i - 1] + d;
  }
  return lengths;
}

function pointAtRouteLength(projected, lengths, target) {
  for (let i = 1; i < lengths.length; i += 1) {
    if (lengths[i] >= target) {
      const a = projected[i - 1];
      const b = projected[i];
      const t = (target - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1);
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
      };
    }
  }
  return projected[projected.length - 1];
}

function speedLimitColor(kmh) {
  if (kmh <= 30) return "#e40014";
  if (kmh <= 50) return "#edb200";
  return "#3aab3b";
}

function drawLine(ctx, points, getX, getY, color, lineWidth) {
  ctx.beginPath();
  points.forEach((point, index) => {
    const xx = getX(point);
    const yy = getY(point);
    if (index === 0) ctx.moveTo(xx, yy);
    else ctx.lineTo(xx, yy);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
}

function renderSources() {
  const sourceById = Object.fromEntries(SOURCES.map((source) => [source.id, source]));
  document.getElementById("ledgerRows").innerHTML = LEDGER.map(
    ([element, value, refs]) => `
      <tr>
        <td>${element}</td>
        <td>${value}</td>
        <td>${refs.map((ref) => `<span class="source-chip">${ref}</span>`).join("")}</td>
      </tr>
    `,
  ).join("");

  document.getElementById("sourceList").innerHTML = SOURCES.map(
    (source) => `
      <article class="source-card" id="source-${source.id}">
        <strong>${source.id} - ${source.title}</strong>
        <a href="${source.url}" target="_blank" rel="noreferrer">${source.url}</a>
        <p>${source.note}</p>
      </article>
    `,
  ).join("");

  document.querySelectorAll(".source-chip").forEach((chip) => {
    const source = sourceById[chip.textContent.trim()];
    if (source) chip.title = source.title;
  });
}

function fmt(value, digits = 0, suffix = "") {
  return `${Number(value).toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}${suffix}`;
}

// Node-only export shim so the model can be driven by sensitivity.js without a browser.
// `typeof module` is undefined in the browser; this block is therefore inert there.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CONSTANTS,
    VEHICLES,
    ROUTE,
    simulate,
    getDirectionalRoute,
    buildSpeedProfile,
    poweredAccel,
    coastingAcceleration,
    airDensity,
    effectiveCrr,
  };
}

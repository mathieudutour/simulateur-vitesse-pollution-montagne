const SOURCES = [
  {
    id: "OSM",
    title: "OpenStreetMap / Overpass API",
    url: "https://overpass-api.de/",
    note: "Géométrie de route et tags maxspeed assemblés depuis les voies OSM ref D 39, D 43 et D 13.",
  },
  {
    id: "LEGIFRANCE",
    title: "Code de la route, article R413-3",
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028436430",
    note: "En agglomération, la vitesse des véhicules est limitée à 50 km/h, sauf signalisation différente.",
  },
  {
    id: "LEGIFRANCE_R4132",
    title: "Code de la route, article R413-2",
    url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000042240048/2022-01-26",
    note: "Hors agglomération, le code encadre les vitesses maximales; le 90 km/h est utilisé ici comme hypothèse de parcours hors ville.",
  },
  {
    id: "OSMTILES",
    title: "OpenStreetMap tile server and attribution",
    url: "https://operations.osmfoundation.org/policies/tiles/",
    note: "Fond de carte via tile.openstreetmap.org avec attribution visible.",
  },
  {
    id: "OTD",
    title: "Open Topo Data, EU-DEM 25 m",
    url: "https://www.opentopodata.org/",
    note: "Altitudes interrogées sur le jeu européen eudem25m, source EEA.",
  },
  {
    id: "SUPERU",
    title: "Magasins U, Super U Passy",
    url: "https://www.magasins-u.com/magasin/superu-passy",
    note: "Adresse du point de départ: 91 avenue de Marlioz, 74190 Passy.",
  },
  {
    id: "FUELPRICE",
    title: "Prix-carburants.gouv.fr, flux instantané",
    url: "https://www.prix-carburants.gouv.fr/rubrique/opendata/",
    note: "Flux instantané consulté le 06/05/2026; la station 74190003, Super U Passy, y déclare SP95-E10/E10 = 1,989 €/L depuis le 25/03/2026 09:38:14. La page station Super U affiche le même prix.",
  },
  {
    id: "MED",
    title: "Ville de Passy, Maison médicale du Plateau d'Assy",
    url: "https://www.ville-passy-mont-blanc.fr/maison-medicale-du-plateau-dassy-passy/",
    note: "Adresse du point d'arrivée: 50 place Théophile Vallet, 74190 Passy.",
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
    id: "NAP15",
    title: "National Academies, SI gasoline engines, 2015",
    url: "https://www.nationalacademies.org/read/21744/chapter/4",
    note: "Rendement thermique au frein typique autour de 22 % en conditions FTP.",
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
    note: "Facteur 8887 g CO2 par gallon d'essence consommé.",
  },
  {
    id: "EMEP",
    title: "EMEP/EEA Guidebook 2023, tyre and brake wear, update 2025",
    url: "https://www.eea.europa.eu/en/analysis/publications/emep-eea-guidebook-2023/part-b-sectoral-guidance-chapters/1-energy/1-a-combustion/1-a-3-b-vi",
    note: "Facteurs TSP et fractions PM10/PM2,5 pour pneus, freins et chaussée.",
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
    id: "BRAKE",
    title: "Xu et al., Journal of Hazardous Materials, 2022",
    url: "https://pubmed.ncbi.nlm.nih.gov/35413517/",
    note: "Les pertes d'énergie cinétique peuvent paramétrer les variations de particules de freinage.",
  },
  {
    id: "PHOTO_NOTE",
    title: "Wikimedia Commons, Nissan Note 2013",
    url: "https://commons.wikimedia.org/wiki/File:Nissan_Note_2013_(E12)_(cropped).jpg",
    note: "Photo du Nissan Note, licence Creative Commons.",
  },
  {
    id: "PHOTO_X5",
    title: "Wikimedia Commons, BMW X5 2004-2006",
    url: "https://commons.wikimedia.org/wiki/File:BMW-X5.jpg",
    note: "Photo du BMW X5, domaine public selon la fiche Commons.",
  },
  {
    id: "PHOTO_RAM",
    title: "Wikimedia Commons, Dodge Ram 1500 SLT 2007",
    url: "https://commons.wikimedia.org/wiki/File:Dodge_Ram_1500_SLT_2007_(14335882789).jpg",
    note: "Photo du Dodge Ram 1500, licence Creative Commons.",
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
};

const CONSTANTS = {
  g: 9.80665,
  rho: 1.225,
  gasolineLhvMJPerL: 31.82,
  fuelPriceEurPerL: 1.989,
  co2KgPerL: 8.887 / 3.785411784,
  tyreTspGKm: 0.0107,
  brakeTspGKm: 0.0142,
  roadTspGKm: 0.015,
  tyrePM10: 0.6,
  tyrePM25: 0.42,
  brakePM10: 0.98,
  brakePM25: 0.39,
  roadPM10: 0.5,
  roadPM25: 0.27,
  pmMinKmh: 25,
  pmReferenceKmh: 45,
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
    efficiency: 0.22,
    sources: ["AUTOEVO", "CARSPECTOR", "NHTSA", "NAP15", "PHOTO_NOTE"],
  },
  suv: {
    label: "BMW X5 4.8is",
    subtitle: "SUV essence 2004",
    mass: 2275,
    cd: 0.38,
    area: 2.74,
    crr: 0.009,
    efficiency: 0.22,
    sources: ["X5_SPEC", "NHTSA", "NAP15", "PHOTO_X5"],
  },
  pickup: {
    label: "Dodge Ram 1500",
    subtitle: "SLT/TRX4 4x4 Quad Cab 2007",
    mass: 2366,
    cd: 0.53,
    area: 3.31,
    crr: 0.009,
    efficiency: 0.22,
    sources: ["RAM_SPEC", "RAM_AREA", "NHTSA", "NAP15", "PHOTO_RAM"],
  },
};

const LEDGER = [
  ["Points de départ et arrivée", "Super U Passy -> Maison médicale du Plateau d'Assy", ["SUPERU", "MED"]],
  ["Distance routière", "10,2351 km, géométrie OSM D39 / D43 / D13 / D43", ["OSM"]],
  ["Fond de carte", "Tuiles https://tile.openstreetmap.org/{z}/{x}/{y}.png", ["OSMTILES"]],
  ["Altitudes", "45 points EU-DEM 25 m, 578,1 à 1038,7 m", ["OTD"]],
  ["Virages", "Rayons déduits de la géométrie OSM; v = sqrt(a_lateral x R)", ["OSM", "CURVE"]],
  ["Limites de vitesse", "maxspeed OSM quand tagué; 50 km/h en ville; hypothèse 90 km/h hors ville", ["OSM", "LEGIFRANCE", "LEGIFRANCE_R4132"]],
  ["Profil de vitesse montée", "v = min(v_curseur, v_limite, v_virage), avec approche freinage/accélération", ["OSM", "LEGIFRANCE", "LEGIFRANCE_R4132", "CURVE", "COMFORT"]],
  ["Descente en roue libre", "au-delà de v_curseur, pas de freinage tant que v < min(v_limite, v_virage)", ["DYN", "LEGIFRANCE", "LEGIFRANCE_R4132", "CURVE", "COMFORT"]],
  ["Bilan des forces", "F = m a + Crr m g cos(theta) + 0,5 rho Cd A v2 + m g sin(theta)", ["DYN"]],
  ["Cinématique freinage", "v2 = v0 2 + 2 a s", ["DYN", "COMFORT"]],
  ["Véhicule Nissan Note", "m=1118 kg; Cd=0,30; A=2,25 m2; Crr=0,009; eta=22 %", ["AUTOEVO", "CARSPECTOR", "NHTSA", "NAP15"]],
  ["Véhicule BMW X5 4.8is", "m=2275 kg; Cd=0,38; A=2,74 m2; Crr=0,009; eta=22 %", ["X5_SPEC", "NHTSA", "NAP15"]],
  ["Véhicule Dodge Ram 1500", "m=2366 kg; Cd=0,53; A=3,31 m2; Crr=0,009; eta=22 %", ["RAM_SPEC", "RAM_AREA", "NHTSA", "NAP15"]],
  ["Photos véhicules", "Images du sélecteur, licence indiquée sur chaque fiche Commons", ["PHOTO_NOTE", "PHOTO_X5", "PHOTO_RAM"]],
  ["Air et gravité", "rho = 1,225 kg/m3; g = 9,80665 m/s2", ["ISA"]],
  ["Essence", "PCI = 31,82 MJ/L, dérivé de 112114-116090 Btu/gal", ["DOE"]],
  ["Prix essence Super U", "SP95-E10 = 1,989 €/L; flux consulté le 06/05/2026, dernier relevé station du 25/03/2026 09:38", ["FUELPRICE", "SUPERU"]],
  ["CO2 essence", "8887 g CO2/gal = 2,35 kg CO2/L", ["EPA"]],
  ["Pneus", "TSP = 0,0107 g/km x m/m_Note; PM10/TSP = 0,60; PM2,5/TSP = 0,42", ["EMEP", "BEDDOWS"]],
  ["Freins", "TSP = 0,0142 g/km x m/m_Note x max(1, max_25..V(Efrein + Ecin_perdue)/(Efrein_45 + Ecin_perdue_45)); PM10/TSP = 0,98; PM2,5/TSP = 0,39", ["EMEP", "BRAKE", "BEDDOWS"]],
  ["Chaussée", "TSP = 0,0150 g/km x m/m_Note; PM10/TSP = 0,50; PM2,5/TSP = 0,27", ["EMEP", "BEDDOWS"]],
  ["Spatialisation freins", "Part de PM freinage proportionnelle à l'énergie dissipée localement", ["BRAKE", "EMEP"]],
];

const els = {};
let state = { ...DEFAULTS };

document.addEventListener("DOMContentLoaded", () => {
  [
    "speedA",
    "speedB",
    "latAccel",
    "longAccel",
  ].forEach((id) => {
    els[id] = document.getElementById(id);
    els[`${id}Out`] = document.getElementById(`${id}Out`);
    els[id].addEventListener("input", () => {
      state[id] = Number(els[id].value);
      update();
    });
  });

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
}

function getParams() {
  const vehicle = VEHICLES[state.vehicleId] || VEHICLES.note;
  return {
    mass: vehicle.mass,
    cd: vehicle.cd,
    area: vehicle.area,
    crr: vehicle.crr,
    efficiency: vehicle.efficiency,
    latAccel: state.latAccel,
    longAccel: state.longAccel,
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
      ["Rendement", fmt(vehicle.efficiency * 100, 0, " %")],
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
  const cruiseIsHardCap = route.direction === "up";
  const points = [];

  for (let i = 0; i <= n; i += 1) {
    const m = (route.distanceM * i) / n;
    const km = m / 1000;
    const speedLimitMps = kmhToMps(speedLimitAt(route, km));
    let speedMps = cruiseIsHardCap ? Math.min(targetMps, speedLimitMps) : speedLimitMps;

    route.curves.forEach((curve) => {
      const curveM = curve.km * 1000;
      const curveSpeedLimitMps = kmhToMps(speedLimitAt(route, curve.km));
      const curveCap = Math.min(
        cruiseIsHardCap ? targetMps : Number.POSITIVE_INFINITY,
        curveSpeedLimitMps,
        Math.sqrt(params.latAccel * curve.radiusM),
      );
      const gap = Math.abs(curveM - m);
      const approachLimit = Math.sqrt(curveCap * curveCap + 2 * params.longAccel * gap);
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

  for (let i = 1; i < points.length; i += 1) {
    const ds = points[i].m - points[i - 1].m;
    const accelLimit = Math.sqrt(points[i - 1].speedMps * points[i - 1].speedMps + 2 * params.longAccel * ds);
    points[i].speedMps = Math.min(points[i].speedMps, accelLimit);
  }

  for (let i = points.length - 2; i >= 0; i -= 1) {
    const ds = points[i + 1].m - points[i].m;
    const brakeLimit = Math.sqrt(points[i + 1].speedMps * points[i + 1].speedMps + 2 * params.longAccel * ds);
    points[i].speedMps = Math.min(points[i].speedMps, brakeLimit);
  }

  if (!cruiseIsHardCap) {
    return applyCoastingDescentProfile(points, targetMps, params);
  }

  return points;
}

function applyCoastingDescentProfile(capPoints, targetMps, params) {
  const minSpeed = kmhToMps(5);
  const points = capPoints.map((point) => ({ ...point }));
  points[0].speedMps = Math.min(points[0].speedMps, Math.max(minSpeed, targetMps));

  for (let i = 1; i < points.length; i += 1) {
    const previous = points[i - 1];
    const point = points[i];
    const ds = point.m - previous.m;
    const freeAccel = coastingAcceleration(previous.speedMps, previous, point, params);
    const freeSpeed = Math.sqrt(Math.max(minSpeed * minSpeed, previous.speedMps * previous.speedMps + 2 * freeAccel * ds));
    let nextSpeed = freeSpeed;

    if (freeSpeed < targetMps) {
      const poweredSpeed = Math.sqrt(previous.speedMps * previous.speedMps + 2 * params.longAccel * ds);
      nextSpeed = Math.max(freeSpeed, Math.min(targetMps, poweredSpeed));
    }

    point.speedMps = Math.min(point.speedMps, Math.max(minSpeed, nextSpeed));
  }

  return points;
}

function coastingAcceleration(speedMps, a, b, params) {
  const ds = Math.max(b.m - a.m, 0.1);
  const dh = b.elev - a.elev;
  const theta = Math.atan2(dh, ds);
  const speed = Math.max(speedMps, kmhToMps(3));
  const fRoll = params.crr * params.mass * CONSTANTS.g * Math.cos(theta);
  const fAero = 0.5 * CONSTANTS.rho * params.cd * params.area * speed * speed;
  const fGrade = params.mass * CONSTANTS.g * Math.sin(theta);
  return -(fRoll + fAero + fGrade) / params.mass;
}

function speedLimitAt(route, km) {
  const segment = route.speedLimits?.find((limit) => (
    km >= limit.startKm - 1e-6 && km <= limit.endKm + 1e-6
  ));
  return segment ? segment.kmh : CONSTANTS.ruralSpeedKmh;
}

function simulate(targetKmh, params, route) {
  const n = 260;
  const distanceM = route.distanceM;
  const points = buildSpeedProfile(targetKmh, params, route, n);

  let tractionJ = 0;
  let brakeJ = 0;
  let aeroJ = 0;
  let rollJ = 0;
  let climbJ = 0;
  let inertiaJ = 0;
  let decelJ = 0;
  let timeS = 0;
  const brakeBySegment = [];

  for (let i = 0; i < n; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    const ds = b.m - a.m;
    const dh = b.elev - a.elev;
    const theta = Math.atan2(dh, ds);
    const vAvg = Math.max((a.speedMps + b.speedMps) / 2, kmhToMps(3));
    const acc = (b.speedMps * b.speedMps - a.speedMps * a.speedMps) / (2 * ds);

    const fRoll = params.crr * params.mass * CONSTANTS.g * Math.cos(theta);
    const fAero = 0.5 * CONSTANTS.rho * params.cd * params.area * vAvg * vAvg;
    const fGrade = params.mass * CONSTANTS.g * Math.sin(theta);
    const fInertia = params.mass * acc;
    const fWheel = fRoll + fAero + fGrade + fInertia;

    tractionJ += Math.max(fWheel, 0) * ds;
    brakeJ += Math.max(-fWheel, 0) * ds;
    aeroJ += fAero * ds;
    rollJ += fRoll * ds;
    climbJ += Math.max(fGrade, 0) * ds;
    inertiaJ += Math.max(fInertia, 0) * ds;
    decelJ += Math.max(-fInertia, 0) * ds;
    timeS += ds / vAvg;
    brakeBySegment.push({
      km: (a.km + b.km) / 2,
      energyJ: Math.max(-fWheel, 0) * ds,
    });
  }

  const fuelEnergyJ = tractionJ / Math.max(params.efficiency, 0.01);
  const fuelL = fuelEnergyJ / (CONSTANTS.gasolineLhvMJPerL * 1e6);
  const fuelCostEur = fuelL * CONSTANTS.fuelPriceEurPerL;
  const distanceKm = distanceM / 1000;
  const avgKmh = (distanceKm / (timeS / 3600));
  const massScale = params.mass / VEHICLES.note.mass;
  const brakeDemandJ = brakeJ + decelJ;
  const brakeEnergyMultiplier = estimateBrakeDemandMultiplier(targetKmh, params, route, brakeDemandJ);
  const tyreTsp = distanceKm * CONSTANTS.tyreTspGKm * massScale;
  const brakeTsp = distanceKm * CONSTANTS.brakeTspGKm * massScale * brakeEnergyMultiplier;
  const roadTsp = distanceKm * CONSTANTS.roadTspGKm * massScale;
  const pm10G =
    tyreTsp * CONSTANTS.tyrePM10 +
    brakeTsp * CONSTANTS.brakePM10 +
    roadTsp * CONSTANTS.roadPM10;
  const pm25G =
    tyreTsp * CONSTANTS.tyrePM25 +
    brakeTsp * CONSTANTS.brakePM25 +
    roadTsp * CONSTANTS.roadPM25;

  const brakeTotalPm10Mg = brakeTsp * CONSTANTS.brakePM10 * 1000;
  const brakeEnergySum = brakeBySegment.reduce((sum, row) => sum + row.energyJ, 0);
  const brakePmHotspots = brakeBySegment.map((row) => ({
    km: row.km,
    mg: brakeEnergySum > 0 ? (row.energyJ / brakeEnergySum) * brakeTotalPm10Mg : 0,
  }));

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
    aeroKWh: aeroJ / 3.6e6,
    rollKWh: rollJ / 3.6e6,
    climbKWh: climbJ / 3.6e6,
    inertiaKWh: inertiaJ / 3.6e6,
    pm10Mg: pm10G * 1000,
    pm25Mg: pm25G * 1000,
    tyrePm10Mg: tyreTsp * CONSTANTS.tyrePM10 * 1000,
    brakePm10Mg: brakeTotalPm10Mg,
    roadPm10Mg: roadTsp * CONSTANTS.roadPM10 * 1000,
    brakeEnergyMultiplier,
    brakePmHotspots,
  };
}

function estimateBrakeDemandMultiplier(targetKmh, params, route, currentDemandJ) {
  const referenceDemandJ = estimateBrakeDemandOnly(CONSTANTS.pmReferenceKmh, params, route);
  if (referenceDemandJ <= 1000) return 1;

  let peakDemandJ = Math.max(referenceDemandJ, currentDemandJ);
  const firstSpeed = CONSTANTS.pmMinKmh;
  const lastSpeed = Math.max(firstSpeed, Math.ceil(targetKmh));

  for (let speed = firstSpeed; speed <= lastSpeed; speed += 1) {
    peakDemandJ = Math.max(peakDemandJ, estimateBrakeDemandOnly(speed, params, route));
  }

  return Math.max(1, peakDemandJ / referenceDemandJ);
}

function estimateBrakeDemandOnly(targetKmh, params, route) {
  const n = 260;
  const points = buildSpeedProfile(targetKmh, params, route, n);

  let brakeJ = 0;
  let decelJ = 0;
  for (let i = 0; i < n; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    const ds = b.m - a.m;
    const dh = b.elev - a.elev;
    const theta = Math.atan2(dh, ds);
    const vAvg = Math.max((a.speedMps + b.speedMps) / 2, kmhToMps(3));
    const acc = (b.speedMps * b.speedMps - a.speedMps * a.speedMps) / (2 * ds);
    const fRoll = params.crr * params.mass * CONSTANTS.g * Math.cos(theta);
    const fAero = 0.5 * CONSTANTS.rho * params.cd * params.area * vAvg * vAvg;
    const fGrade = params.mass * CONSTANTS.g * Math.sin(theta);
    const fInertia = params.mass * acc;
    brakeJ += Math.max(-(fRoll + fAero + fGrade + fInertia), 0) * ds;
    decelJ += Math.max(-fInertia, 0) * ds;
  }

  return brakeJ + decelJ;
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
    [`Coût carburant <small>${fmt(CONSTANTS.fuelPriceEurPerL, 3, " €/L")}</small>`, "fuelCostEur", " €", 2, true, ["FUELPRICE", "DYN", "DOE", "NAP15", ...speedRefs, ...vehicleRefs], "Litres simulés multipliés par le prix SP95-E10 déclaré pour Super U Passy.", "absolute", "compact"],
    ["Consommation", "fuelLPer100", " L/100 km", 1, true, ["DYN", "OTD", "NAP15", "DOE", ...speedRefs, ...vehicleRefs], "Carburant simulé rapporté à la distance routière."],
    ["CO2 échappement", "co2Kg", " kg", 2, true, ["DYN", "DOE", "EPA", "NAP15", ...speedRefs, ...vehicleRefs], "Litres d'essence multipliés par le facteur CO2 essence."],
    ["PM10 hors échappement", "pm10Mg", " mg", 0, true, ["EMEP", "BEDDOWS", "BRAKE", ...speedRefs, ...vehicleRefs], "Facteurs pneus, freins et chaussée modulés par masse, limites de vitesse et freinage."],
    ["PM2,5 hors échappement", "pm25Mg", " mg", 0, true, ["EMEP", "BEDDOWS", "BRAKE", ...speedRefs, ...vehicleRefs], "Fractions PM2,5 appliquées aux émissions hors échappement."],
    ["Temps", "timeMin", " min", 1, true, ["OSM", "LEGIFRANCE", "CURVE", "COMFORT"], "Distance segmentée divisée par le profil de vitesse plafonné par les limites locales.", "absolute"],
    ["Vitesse moyenne", "avgKmh", " km/h", 1, false, ["OSM", "LEGIFRANCE", "CURVE", "COMFORT"], "Distance routière divisée par le temps simulé."],
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
  ctx.fillStyle = "#fbf8f1";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#e0d8ca";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#7a827d";
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
    ctx.fillStyle = `rgba(181, 72, 63, ${alpha})`;
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
  ctx.fillStyle = "rgba(47, 125, 99, 0.12)";
  ctx.fill();

  drawLine(ctx, route.points, (p) => x(p.km), (p) => yElev(p.elev), "#51635b", 2);
  ctx.save();
  ctx.setLineDash([6, 5]);
  drawLine(ctx, speedLimitLinePoints(route), (p) => x(p.km), (p) => ySpeed(kmhToMps(p.kmh)), "#81786c", 2);
  ctx.restore();
  drawLine(ctx, a.points, (p) => x(p.km), (p) => ySpeed(p.speedMps), "#2f7d63", 3);
  drawLine(ctx, b.points, (p) => x(p.km), (p) => ySpeed(p.speedMps), "#246f9e", 3);

  route.curves.forEach((curve) => {
    const xx = x(curve.km);
    ctx.strokeStyle = "rgba(180, 107, 32, 0.7)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(xx, pad.top + innerH - 12);
    ctx.lineTo(xx, pad.top + innerH + 6);
    ctx.stroke();
    ctx.fillStyle = "#b46b20";
    ctx.beginPath();
    ctx.arc(xx, pad.top + innerH - 14, Math.max(3, Math.min(7, curve.angleDeg / 26)), 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.strokeStyle = "#bdb4a6";
  ctx.lineWidth = 1;
  ctx.strokeRect(pad.left, pad.top, innerW, innerH);
  ctx.fillStyle = "#59635e";
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
      <circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="${radius.toFixed(1)}" fill="rgba(180, 107, 32, 0.2)"></circle>
      <circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="4" fill="#b46b20"></circle>
    `;
  }).join("");
  const start = xy(projected[0]);
  const end = xy(projected[projected.length - 1]);
  const turn = Number.isInteger(route.turnMapIndex) ? xy(projected[route.turnMapIndex]) : null;
  const endpoints = route.direction === "round"
    ? `
      ${renderEndpointSvg(start, "Départ / arrivée", "#2f7d63", 12, -13)}
      ${turn ? renderEndpointSvg(turn, "Demi-tour", "#b46b20", 12, 22) : ""}
    `
    : `
      ${renderEndpointSvg(start, "Départ", "#2f7d63", 12, -13)}
      ${renderEndpointSvg(end, "Arrivée", "#b46b20", 12, 22)}
    `;

  map.innerHTML = `
    ${tileLayer}
    <svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <polyline points="${path}" fill="none" stroke="rgba(29,37,34,0.32)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"></polyline>
      <polyline points="${path}" fill="none" stroke="#fffdf8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${speedPaths}
      ${arrows}
      ${curves}
      ${endpoints}
      <text x="${width - 32}" y="28" fill="#59635e" font-size="12" font-weight="800">N</text>
      <path d="M${width - 28} 55 L${width - 28} 34 M${width - 28} 34 L${width - 34} 43 M${width - 28} 34 L${width - 22} 43" fill="none" stroke="#59635e" stroke-width="2" stroke-linecap="round"></path>
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
        <path d="M7 0 L-5 -5 L-2 0 L-5 5 Z" fill="#1d2522"></path>
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
    <circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="7" fill="#fffdf8"></circle>
    <circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="5.2" fill="${color}"></circle>
    <text x="${(point.x + dx).toFixed(1)}" y="${(point.y + dy).toFixed(1)}" fill="#1d2522" font-size="12" font-weight="800" paint-order="stroke" stroke="#fffdf8" stroke-width="3">${label}</text>
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
  if (kmh <= 30) return "#b5483f";
  if (kmh <= 50) return "#b46b20";
  return "#2f7d63";
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

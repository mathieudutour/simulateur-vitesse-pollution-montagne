# Simulateur vitesse, carburant et particules

Prototype web autonome pour explorer l'effet de la vitesse sur la consommation d'essence,
les émissions de CO2 et les particules hors échappement sur un profil de route de montagne:
Super U Passy -> maison médicale du Plateau d'Assy par les départementales.
Le trajet peut être simulé en montée, en descente ou en aller-retour.

Ouvrir `index.html` dans un navigateur. Aucune dépendance n'est requise.

Le modèle est volontairement transparent:

- les forces longitudinales viennent d'un bilan physique véhicule-route;
- les profils véhicules remplacent les réglages techniques: Nissan Note 2013,
  BMW X5 4.8is 2004, Dodge Ram 1500 SLT/TRX4 2007;
- le profil de vitesse est plafonné par les limites OSM taguées et par une hypothèse
  50 km/h en agglomération quand aucun `maxspeed` n'est tagué;
- le carburant est dérivé de l'énergie positive aux roues, du rendement moteur et du PCI de
  l'essence;
- les particules pneus, freins et chaussée utilisent les facteurs EMEP/EEA;
- les facteurs pneus et chaussée sont mis à l'échelle par la masse du véhicule, pas réduits
  par la vitesse;
- le freinage est modulé par une demande de freinage monotone, avec spatialisation locale
  selon l'énergie dissipée sur les segments.

Les sources et les limites sont affichées dans la section "Formules, constantes et sources".

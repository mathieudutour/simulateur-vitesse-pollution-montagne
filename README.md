# Simulateur vitesse, carburant et particules

Prototype web autonome pour explorer l'effet de la vitesse sur la consommation d'essence,
les emissions de CO2 et les particules hors echappement sur un profil de route de montagne:
Super U Passy -> maison medicale du Plateau d'Assy par les departementales.
Le trajet peut etre simule en montee, en descente ou en aller-retour.

Ouvrir `index.html` dans un navigateur. Aucune dependance n'est requise.

Le modele est volontairement transparent:

- les forces longitudinales viennent d'un bilan physique vehicule-route;
- les profils vehicules remplacent les reglages techniques: Nissan Note 2013,
  BMW X5 4.8is 2004, Dodge Ram 1500 SLT/TRX4 2007;
- le carburant est derive de l'energie positive aux roues, du rendement moteur et du PCI de
  l'essence;
- les particules pneus, freins et chaussee utilisent les facteurs EMEP/EEA;
- les facteurs pneus et chaussee sont mis a l'echelle par la masse du vehicule, pas reduits
  par la vitesse;
- le freinage est module par une demande de freinage monotone, avec spatialisation locale
  selon l'energie dissipee sur les segments.

Les sources et les limites sont affichees dans la section "Formules, constantes et sources".

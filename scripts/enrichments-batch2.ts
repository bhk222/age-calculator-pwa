/**
 * BATCH 2 - Enrichissements massifs supplémentaires
 * 
 * Copiez ce contenu dans scripts/enhanceDatabase.ts
 * pour enrichir ~100 lésions supplémentaires
 */

export const enrichmentsBatch2 = {
  // ============================================
  // MEMBRES SUPÉRIEURS - ÉPAULE
  // ============================================

  "Raideur de l'épaule (propulsion, abduction, rotation) (Main Dominante)": {
    rateCriteria: {
      low: "Limitation modérée (amplitude > 120° en antépulsion, > 90° en abduction).",
      medium: "Limitation importante (amplitude 60-120° en antépulsion, 45-90° en abduction), gêne pour porter la main au-dessus de l'horizontale.",
      high: "Raideur sévère (amplitude < 60° en antépulsion, < 45° en abduction), bras collé au corps, impossibilité d'atteindre la tête ou la bouche."
    },
    description: "Limitation de mobilité de l'épaule dans tous les plans"
  },

  "Raideur de l'épaule (propulsion, abduction, rotation) (Main Non Dominante)": {
    rateCriteria: {
      low: "Limitation modérée peu gênante pour aide.",
      medium: "Limitation importante réduisant l'aide bimanuelle.",
      high: "Raideur sévère même pour bras non dominant."
    },
    description: "Limitation de mobilité de l'épaule côté non dominant"
  },

  "Ankylose épaule - Épaule collée au corps (Main Dominante)": {
    rateCriteria: {
      low: "Ankylose en position défavorable avec mobilité du coude conservée.",
      medium: "Ankylose complète limitant fortement l'utilisation du membre.",
      high: "Ankylose avec atrophie et troubles vasculo-nerveux associés."
    },
    description: "Blocage complet de l'épaule en adduction, bras le long du corps"
  },

  "Ankylose épaule - Épaule collée au corps (Main Non Dominante)": {
    rateCriteria: {
      low: "Ankylose en adduction, gêne importante.",
      medium: "Ankylose avec troubles trophiques.",
      high: "Ankylose avec complications majeures."
    }
  },

  "Ankylose épaule - Bras en abduction à 45° (Main Dominante)": {
    rateCriteria: {
      low: "Ankylose en abduction modérée (45°), position relativement fonctionnelle.",
      high: "Ankylose à 45° avec troubles associés ou atrophie."
    },
    description: "Blocage de l'épaule avec bras écarté à 45° du corps"
  },

  "Ankylose épaule - Bras en abduction à 45° (Main Non Dominante)": {
    rateCriteria: {
      low: "Position acceptable mais gênante.",
      high: "Gêne majeure avec troubles associés."
    }
  },

  "Ankylose épaule - Bras en abduction à 90° (position horizontale) (Main Dominante)": {
    rateCriteria: {
      low: "Ankylose en position horizontale, très gênante pour activités quotidiennes.",
      medium: "Impossibilité de rapprocher le bras du corps, gêne majeure pour habillage et sommeil.",
      high: "Ankylose à 90° avec atrophie importante et troubles circulatoires."
    },
    description: "Blocage avec bras maintenu à l'horizontale"
  },

  "Ankylose épaule - Bras en abduction à 90° (position horizontale) (Main Non Dominante)": {
    rateCriteria: {
      low: "Position très gênante même pour bras non dominant.",
      high: "Handicap majeur dans vie quotidienne."
    }
  },

  "Fracture Omoplate (selon variété et désordres articulaires)": {
    rateCriteria: {
      low: "Fracture du corps de l'omoplate consolidée sans trouble articulaire (10-15%).",
      medium: "Fracture du col ou de la glène avec raideur d'épaule modérée (20-35%).",
      high: "Fracture complexe avec atteinte gléno-humérale, raideur sévère ou pseudarthrose (40-50%)."
    },
    description: "Séquelles de fracture de l'omoplate selon localisation et complications"
  },

  "Fracture Clavicule - Consolidation": {
    rateCriteria: {
      low: "Consolidation anatomique sans cal vicieux.",
      high: "Consolidation avec cal vicieux ou pseudarthrose douloureuse."
    },
    description: "Fracture de la clavicule bien consolidée"
  },

  "Fracture Clavicule - Pseudarthrose (non consolidation)": {
    rateCriteria: {
      low: "Pseudarthrose peu douloureuse, épaule stable.",
      medium: "Pseudarthrose mobile douloureuse.",
      high: "Pseudarthrose avec troubles neurologiques (plexus brachial)."
    },
    description: "Non consolidation de la fracture de clavicule"
  },

  "Luxation récidivante de l'épaule": {
    rateCriteria: {
      low: "Luxations occasionnelles (< 1/an), stabilité partielle.",
      medium: "Luxations fréquentes (> 3/an), appréhension permanente.",
      high: "Luxations très fréquentes avec atrophie musculaire et limitation importante."
    },
    description: "Instabilité chronique de l'épaule avec luxations répétées"
  },

  // ============================================
  // MEMBRES INFÉRIEURS - HANCHE
  // ============================================

  "Raideur hanche - Limitation modérée des mouvements": {
    rateCriteria: {
      low: "Limitation de 25-50% de l'amplitude (flexion > 90°, abduction > 30°).",
      medium: "Limitation de 50-75% (flexion 45-90°, abduction 15-30°).",
      high: "Limitation > 75%, quasi-ankylose (flexion < 45°, abduction < 15°)."
    },
    description: "Raideur partielle de la hanche avec mobilité conservée"
  },

  "Ankylose hanche - En extension et adduction (jambe collée)": {
    rateCriteria: {
      low: "Ankylose en rectitude, marche possible avec boiterie.",
      medium: "Ankylose en adduction modérée, démarche dandinante.",
      high: "Ankylose en adduction marquée, raccourcissement et atrophie importante."
    },
    description: "Blocage de la hanche en position défavorable"
  },

  "Ankylose hanche - En bonne position (légère flexion, abduction, rotation externe)": {
    rateCriteria: {
      low: "Ankylose en position fonctionnelle permettant marche et station assise.",
      medium: "Ankylose rigide nécessitant adaptations importantes.",
      high: "Ankylose avec troubles rachidiens compensateurs."
    },
    description: "Blocage en position relativement favorable"
  },

  "Ankylose hanche - Attitude vicieuse (flexion excessive, rotation interne)": {
    rateCriteria: {
      low: "Position vicieuse modérée.",
      medium: "Flexion > 30° ou rotation interne importante.",
      high: "Position très défavorable avec répercussions rachidiennes majeures."
    },
    description: "Blocage en position inadéquate pour la marche"
  },

  "Luxation hanche non réduite ou arthrose post-traumatique": {
    rateCriteria: {
      low: "Arthrose débutante avec douleurs d'effort.",
      medium: "Arthrose évoluée, boiterie importante, périmètre de marche réduit.",
      high: "Arthrose sévère ou luxation irréductible, marche très limitée ou impossible."
    },
    description: "Séquelles graves de traumatisme de hanche"
  },

  "Fracture col du fémur - Consolidation en bonne position": {
    rateCriteria: {
      low: "Consolidation anatomique avec mobilité satisfaisante.",
      medium: "Consolidation avec raideur et boiterie modérées.",
      high: "Consolidation en cal vicieux avec raccourcissement."
    },
    description: "Fracture du col fémoral bien consolidée"
  },

  "Fracture col du fémur - Pseudarthrose ou nécrose de la tête": {
    rateCriteria: {
      low: "Pseudarthrose stable avec mobilité conservée.",
      medium: "Nécrose partielle avec arthrose secondaire.",
      high: "Pseudarthrose instable ou nécrose complète nécessitant prothèse."
    },
    description: "Complications graves de fracture du col fémoral"
  },

  // ============================================
  // MEMBRES INFÉRIEURS - GENOU
  // ============================================

  "Raideur genou - Mobilité conservée de 135° à 90°": {
    rateCriteria: {
      low: "Limitation modérée, amplitude fonctionnelle de 45° conservée.",
      high: "Raideur avec douleurs limitant la marche."
    },
    description: "Limitation légère de la flexion du genou"
  },

  "Raideur genou - Mobilité conservée de 110° à 90°": {
    rateCriteria: {
      low: "Amplitude très réduite (20°) mais en secteur utile.",
      medium: "Quasi-ankylose en flexion à 90°.",
      high: "Raideur sévère avec douleurs et instabilité."
    },
    description: "Limitation importante en position assise"
  },

  "Raideur genou - Flexion limitée à 90° (déficit d'extension)": {
    rateCriteria: {
      low: "Flexum léger (< 20°) compensé par cheville.",
      medium: "Flexum modéré (20-40°), boiterie importante.",
      high: "Flexum sévère (> 40°), marche très perturbée."
    },
    description: "Impossibilité d'étendre complètement le genou"
  },

  "Ankylose genou - En extension complète (180°)": {
    rateCriteria: {
      low: "Ankylose en rectitude, marche possible avec jambe raide.",
      medium: "Ankylose rigide gênant station assise et conduite.",
      high: "Ankylose avec troubles rachidiens compensateurs."
    },
    description: "Blocage du genou en position tendue"
  },

  "Ankylose genou - En légère flexion (165-170°)": {
    rateCriteria: {
      low: "Flexum léger (10-15°), relativement bien toléré.",
      medium: "Ankylose avec démarche en flexum.",
      high: "Flexum avec troubles importants et atrophie."
    },
    description: "Blocage avec genou légèrement fléchi"
  },

  "Ankylose genou - À angle droit (90°)": {
    rateCriteria: {
      low: "Ankylose à 90°, marche impossible sans aide.",
      medium: "Ankylose à 90° avec atrophie marquée.",
      high: "Ankylose à 90° avec complications vasculo-nerveuses."
    },
    description: "Blocage du genou à 90°, position très handicapante"
  },

  "Instabilité ligamentaire genou (laxité LCA, LCP, latérale)": {
    rateCriteria: {
      low: "Laxité modérée compensée par muscles, dérobements occasionnels.",
      medium: "Laxité importante, dérobements fréquents, limitation activités.",
      high: "Laxité majeure multi-ligamentaire, genou instable en permanence."
    },
    description: "Laxité ligamentaire du genou après entorse ou rupture"
  },

  "Fracture extrémité inférieure fémur": {
    rateCriteria: {
      low: "Consolidation anatomique sans raideur.",
      medium: "Cal vicieux avec raideur modérée du genou.",
      high: "Cal vicieux important avec arthrose et limitation sévère."
    },
    description: "Fracture au-dessus du genou (condyles fémoraux)"
  },

  "Fracture extrémité supérieure tibia (plateaux tibiaux)": {
    rateCriteria: {
      low: "Consolidation satisfaisante avec mobilité conservée.",
      medium: "Cal vicieux avec enfoncement articulaire et raideur.",
      high: "Fracture complexe avec arthrose post-traumatique sévère."
    },
    description: "Fracture des plateaux tibiaux sous le genou"
  },

  "Fracture rotule": {
    rateCriteria: {
      low: "Consolidation anatomique de fracture simple.",
      medium: "Cal vicieux ou patellectomie partielle avec raideur.",
      high: "Patellectomie totale ou pseudarthrose douloureuse."
    },
    description: "Fracture de la rotule (os devant le genou)"
  },

  "Lésion méniscale post-traumatique": {
    rateCriteria: {
      low: "Méniscectomie partielle, genou stable.",
      medium: "Méniscectomie totale avec début d'arthrose.",
      high: "Lésion méniscale avec instabilité et arthrose évoluée."
    },
    description: "Séquelles de lésion du ménisque interne ou externe"
  },

  // ============================================
  // MEMBRES INFÉRIEURS - JAMBE/TIBIA
  // ============================================

  "Fracture diaphysaire tibia isolé (péroné intact)": {
    rateCriteria: {
      low: "Consolidation anatomique sans raccourcissement.",
      medium: "Cal vicieux modéré avec désaxation < 10°.",
      high: "Cal vicieux important, raccourcissement > 2cm ou pseudarthrose."
    },
    description: "Fracture de la jambe limitée au tibia"
  },

  "Fracture diaphysaire tibia et péroné": {
    rateCriteria: {
      low: "Consolidation satisfaisante des deux os.",
      medium: "Cal vicieux avec troubles rotatoires ou raccourcissement 1-3cm.",
      high: "Cal vicieux majeur, raccourcissement > 3cm, pseudarthrose, ou troubles vasculo-nerveux."
    },
    description: "Fracture simultanée des deux os de jambe"
  },

  "Pseudarthrose tibia": {
    rateCriteria: {
      low: "Pseudarthrose stable avec possibilité d'appui partiel.",
      medium: "Pseudarthrose mobile nécessitant orthèse.",
      high: "Pseudarthrose très instable avec troubles trophiques et infection."
    },
    description: "Non consolidation de fracture du tibia"
  },

  "Fracture de l'astragale": {
    rateCriteria: {
      low: "Fracture simple consolidée sans nécrose (5-10%).",
      medium: "Fracture avec raideur de cheville et sub-talienne (15-25%).",
      high: "Nécrose ou arthrose sévère, pied très raide et douloureux (30-40%)."
    },
    description: "Fracture de l'os clé de la cheville (astragale/talus)"
  },

  "Fracture du corps du calcanéum": {
    rateCriteria: {
      low: "Fracture sans enfoncement articulaire important (12-20%).",
      medium: "Enfoncement avec élargissement du talon et troubles d'appui (25-35%).",
      high: "Fracture comminutive avec arthrose sous-talienne sévère et pied plat douloureux (40-50%)."
    },
    description: "Fracture de l'os du talon avec séquelles variables"
  },

  // ============================================
  // RACHIS CERVICAL
  // ============================================

  "Entorse cervicale bénigne": {
    rateCriteria: {
      low: "Raideur légère sans douleur permanente.",
      medium: "Raideur avec cervicalgies d'effort.",
      high: "Raideur importante avec névralgie cervico-brachiale."
    },
    description: "Séquelles d'entorse cervicale (whiplash)"
  },

  "Fracture vertèbre cervicale - Consolidation stable": {
    rateCriteria: {
      low: "Consolidation anatomique avec mobilité conservée.",
      medium: "Consolidation avec raideur segmentaire et douleurs.",
      high: "Consolidation en cal vicieux avec troubles neurologiques."
    },
    description: "Fracture du rachis cervical consolidée"
  },

  "Fracture vertèbre cervicale - Instabilité résiduelle": {
    rateCriteria: {
      low: "Instabilité mineure nécessitant surveillance.",
      medium: "Instabilité modérée avec limitation importante.",
      high: "Instabilité sévère avec menace médullaire, nécessitant arthrodèse."
    },
    description: "Fracture cervicale avec séquelles d'instabilité"
  },

  // ============================================
  // RACHIS DORSO-LOMBAIRE
  // ============================================

  "Fracture vertèbre dorsale ou lombaire - Tassement < 25%": {
    rateCriteria: {
      low: "Tassement minime sans douleur chronique.",
      medium: "Tassement avec raideur et dorsalgies d'effort.",
      high: "Tassement avec dorsalgies chroniques et limitation fonctionnelle."
    },
    description: "Tassement vertébral léger"
  },

  "Fracture vertèbre dorsale ou lombaire - Tassement 25-50%": {
    rateCriteria: {
      low: "Tassement modéré avec douleurs occasionnelles.",
      medium: "Tassement avec raideur importante et douleurs fréquentes.",
      high: "Tassement avec cyphose et douleurs chroniques."
    },
    description: "Tassement vertébral important"
  },

  "Fracture vertèbre dorsale ou lombaire - Tassement > 50%": {
    rateCriteria: {
      low: "Tassement sévère avec déformation visible.",
      medium: "Tassement majeur avec cyphose angulaire importante.",
      high: "Tassement très sévère avec troubles neurologiques et/ou respiratoires."
    },
    description: "Tassement vertébral majeur"
  },

  "Fracture du sacrum": {
    rateCriteria: {
      low: "Fracture consolidée avec douleurs résiduelles mineures.",
      medium: "Consolidation avec sacralgie importante et troubles de posture.",
      high: "Fracture complexe avec atteinte nerveuse (racines sacrées)."
    },
    description: "Fracture de l'os sacré à la base du rachis"
  },

  "Fracture du coccyx": {
    rateCriteria: {
      low: "Gêne mineure en position assise.",
      medium: "Douleurs importantes en position assise (coccygodynie).",
      high: "Coccygodynie sévère invalidante nécessitant coccygectomie."
    },
    description: "Fracture du coccyx avec douleurs séquellaires"
  },

  // ============================================
  // BASSIN
  // ============================================

  "Fracture du bassin - Simple sans déplacement": {
    rateCriteria: {
      low: "Consolidation sans séquelle fonctionnelle.",
      medium: "Consolidation avec douleurs d'effort.",
      high: "Séquelles douloureuses chroniques."
    },
    description: "Fracture pelvienne stable bien consolidée"
  },

  "Fracture du bassin - Complexe avec déplacement": {
    rateCriteria: {
      low: "Consolidation avec troubles mineurs de la statique pelvienne.",
      medium: "Cal vicieux avec boiterie et troubles urologiques/gynécologiques mineurs.",
      high: "Séquelles graves: instabilité pelvienne, troubles sphinctériens, dysfonction sexuelle."
    },
    description: "Fracture pelvienne grave avec complications"
  },

  "Disjonction symphyse pubienne": {
    rateCriteria: {
      low: "Disjonction minime cicatrisée.",
      medium: "Disjonction importante avec douleurs à la marche.",
      high: "Instabilité pubienne chronique invalidante."
    },
    description: "Séparation des os pubiens à l'avant du bassin"
  },

};

console.log('✅ Batch 2 créé:', Object.keys(enrichmentsBatch2).length, 'enrichissements');

# 🔧 Système de Gestion des Tarifs - SynAgency

## Comment changer les pourcentages facilement

### Méthode 1: Interface d'administration (Recommandée)
1. Ouvrez le fichier `admin-pricing.html` dans votre navigateur
2. Entrez le nouveau pourcentage (entre 20% et 60%)
3. Cliquez sur "Mettre à jour le tarif"
4. Le changement sera visible immédiatement sur le site principal

### Méthode 2: Console du navigateur
Sur le site principal (index.html), ouvrez la console (F12) et tapez:
```javascript
changePricing(45); // Pour mettre 45%
changePricing(50); // Pour mettre 50%
changePricing(35); // Pour mettre 35%
```

### Méthode 3: Modification directe du code
Dans le fichier `style.css`, changez les variables CSS:
```css
:root {
    --pricing-percentage: 45; /* Nouveau pourcentage */
    --pricing-display: "45%"; /* Affichage */
}
```

### Vérifier le tarif actuel
```javascript
getCurrentPricing(); // Retourne le pourcentage actuel
```

## 📝 Notes importantes

- **Persistance**: Les tarifs sont sauvegardés dans le navigateur
- **Valeur par défaut**: 40% si aucune valeur n'est définie
- **Limites recommandées**: Entre 20% et 60%
- **Mise à jour**: Les changements sont visibles immédiatement

## 🎯 Utilisation recommandée

Pour des ajustements fréquents, utilisez l'interface d'administration (`admin-pricing.html`) qui offre:
- Interface graphique simple
- Boutons rapides pour les valeurs communes
- Validation automatique
- Sauvegarde automatique
- Instructions intégrées

## 🔒 Sécurité

Le fichier `admin-pricing.html` peut être:
- Supprimé après configuration
- Protégé par mot de passe si nécessaire
- Renommé pour plus de discrétion

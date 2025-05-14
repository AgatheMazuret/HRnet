# HRnet React

Ce projet est une migration d'une bibliothèque jQuery vers une application React moderne, utilisant TypeScript et Vite.

## Structure du projet

```
hrnet-react/
├── app/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── router.tsx
│   │   └── vite-env.d.ts
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── modules/
│   └── modal/
│       ├── src/
│       │   └── index.tsx
│       └── package.json
├── package.json
└── pnpm-workspace.yaml
```

## Prérequis

- Node.js >= 18
- PNPM (gestionnaire de paquets)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/AgatheMazuret/HRnet.git
   cd hrnet-react
   ```

2. Installez les dépendances :
   ```bash
   pnpm install
   ```

## Scripts disponibles

Depuis le dossier `app/`, vous pouvez exécuter les scripts suivants :

- **Démarrer le serveur de développement :**
  ```bash
  pnpm dev
  ```

- **Construire le projet pour la production :**
  ```bash
  pnpm build
  ```

- **Prévisualiser la version de production :**
  ```bash
  pnpm preview
  ```

- **Linter le code :**
  ```bash
  pnpm lint
  ```

## Fonctionnalités

- **Formulaire d'employés :** Permet d'ajouter de nouveaux employés via le composant [`SaveEmployee`](app/src/components/save-employee.tsx).
- **Liste des employés :** Affiche les employés enregistrés localement.
- **Modal personnalisée :** Utilise la bibliothèque [`@agathemazuret/hrnet-react-modal`](modules/modal/package.json).

## Technologies utilisées

- **React 19** : Framework pour construire l'interface utilisateur.
- **TypeScript** : Superset de JavaScript pour un typage statique.
- **Vite** : Outil de build rapide.
- **Tailwind CSS** : Framework CSS utilitaire.
- **React Router** : Gestion des routes.

## Contribution

1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
3. Faites vos modifications et validez-les :
   ```bash
   git commit -m "Ajout de ma fonctionnalité"
   ```
4. Poussez vos modifications :
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
5. Créez une Pull Request.

## Licence

Ce projet est sous licence ISC. Consultez le fichier [LICENSE](LICENSE) pour plus d'informations.
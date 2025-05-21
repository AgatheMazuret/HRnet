# HRnet React

Ce projet est une migration d'une application jQuery vers une application moderne utilisant React, TypeScript et Vite. Il s'agit d'un outil de gestion des employés (HRnet) permettant d'ajouter, de lister et de gérer les employés d'une entreprise.

## Fonctionnalités principales

- Ajout d'un nouvel employé via un formulaire interactif
- Affichage de la liste des employés avec tri et recherche
- Utilisation de composants réutilisables et d'une architecture modulaire
- Gestion d'état avec React
- Utilisation de TypeScript pour la sécurité de typage
- Interface moderne et responsive

## Prérequis

- Node.js >= 18
- pnpm (recommandé) ou npm/yarn

## Installation

1. Clone le dépôt :
   ```sh
   git clone <url-du-repo>
   cd hrnet-react/app
   ```
2. Installe les dépendances :
   ```sh
   pnpm install
   # ou npm install
   ```

## Démarrage du projet

Pour lancer l'application en mode développement :

```sh
pnpm dev
# ou npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173).

## Structure du projet

```
app/
 ├── public/           # Fichiers statiques
 ├── src/              # Code source principal
 │   ├── components/   # Composants React
 │   ├── assets/       # Images et ressources
 │   ├── index.tsx     # Point d'entrée React
 │   └── ...
 ├── modules/          # Modules réutilisables (ex: modal)
 ├── package.json      # Dépendances et scripts
 └── ...
```

## Scripts disponibles

- `pnpm dev` : Démarre le serveur de développement
- `pnpm build` : Génère la version de production
- `pnpm preview` : Prévisualise la build de production
- `pnpm lint` : Analyse le code avec ESLint

## Linting et bonnes pratiques

Le projet utilise ESLint avec des règles adaptées à TypeScript et React. Pour vérifier la qualité du code :

```sh
pnpm lint
```

## Contribution

Les contributions sont les bienvenues ! Merci de créer une issue ou une pull request pour toute suggestion ou amélioration.

## Licence

Ce projet est sous licence MIT.

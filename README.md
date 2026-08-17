# AP Care Web

Application e-commerce web AP Care, construite avec Next.js 16, React 19 et Tailwind CSS.

## Démarrage local

L’API Spring Boot et PostgreSQL doivent être démarrés avant le frontend :

```bash
cp .env.example .env.local
npm install
npm run dev
```

L’application est disponible sur `http://localhost:3000`. `AP_CARE_API_URL` pointe par défaut vers `http://localhost:8080`.

## Parcours disponible

- catalogue, recherche, catégories et fiches produit ;
- inscription, connexion et session renouvelable ;
- panier invité persistant ;
- checkout authentifié et création de commande idempotente ;
- paiement Djomy avec Orange Money, MTN MoMo ou carte.

En local, l’API utilise un fournisseur de paiement simulé : le bouton Djomy confirme immédiatement la commande sans débiter d’argent. Les identifiants Djomy ne sont jamais exposés au navigateur.

## Vérifications

```bash
npm run lint
npx tsc --noEmit
npm run build -- --webpack
```

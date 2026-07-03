# TimeTravel Agency — Webapp Interactive

Webapp immersive et premium pour une agence de voyage temporel fictive, entièrement conçue et développée à l'aide de l'IA générative.

## 🛠️ Stack Technique
- **Framework :** Next.js 15 (App Router) & React 19
- **Styling :** Tailwind CSS (Dark mode natif, Glassmorphism)
- **Animations :** Framer Motion
- **Icônes :** React Icons (FontAwesome)
- **Intelligence Artificielle :** API Mistral AI (modèle `mistral-small-latest`)
- **Langage :** TypeScript

## ✨ Features Implémentées
- **Landing Page Interactive :** Design SaaS haut de gamme, composants "glassmorphism", vidéos de fond immersives et indicateurs de scroll animés.
- **Galerie des Époques :** 3 destinations temporelles détaillées (Paris 1889, Crétacé -65M, Florence 1504) avec informations pratiques et niveaux de risque.
- **Chatbot IA "Assistant Temporel" :** Un widget de chat intégré avec réponses en streaming (SSE), doté d'une personnalité immersive et connaissant les tarifs exacts des voyages.
- **Quiz IA "Mon époque idéale" :** Modale interactive à 4 questions analysées en temps réel par Mistral AI pour recommander une destination personnalisée avec une explication sur-mesure.
- **Système de Réservation Automatisé :** Formulaire de réservation global avec pré-sélection intelligente de la destination, validation automatisée des dates (voyage dans le futur obligatoire) et simulation d'envoi chiffré.

## 🤖 Outils IA Utilisés (Transparence)
- **Code & Architecture :** Antigravity IDE (Gemini 3.1 Pro) en Pair-Programming
- **Chatbot & Recommandations Quiz :** Mistral Small via API (Traitement NLP et génération de texte)
- **Visuels & Vidéos :** Fournis par l'utilisateur (Générés avec des IA telles que Midjourney / Runway)

## 🚀 Instructions d'installation

1. **Cloner le projet** ou télécharger les fichiers sources.
2. **Installer les dépendances :**
   ```bash
   npm install
   ```
3. **Configurer les variables d'environnement :**
   Créez un fichier `.env.local` à la racine du projet et ajoutez votre clé API Mistral :
   ```env
   MISTRAL_API_KEY=votre_cle_api_ici
   ```
4. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
5. **Explorer le temps :**
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📄 Crédits & Licence
- **Projet pédagogique - M1/M2 Digital & IA**
- Tous les visuels, vidéos et textes sont créés dans un cadre purement fictif.

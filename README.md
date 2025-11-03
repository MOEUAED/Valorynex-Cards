# 🎓 Valorynex-Cards

**Valorynex-Cards** est une application web interactive d’apprentissage basée sur des **flashcards** et des **quiz dynamiques**.  
Elle permet de **créer, réviser et tester ses connaissances** de manière simple, rapide et ludique.

---

## 🧭 Sommaire
- [🚀 Fonctionnalités](#-fonctionnalités)
- [🎨 Interface utilisateur](#-interface-utilisateur)
- [🗂️ Structure du projet](#️-structure-du-projet)
- [⚙️ Installation et exécution](#️-installation-et-exécution)
- [📘 Exemple de fichier JSON](#-exemple-de-fichier-json)
- [🧠 Technologies utilisées](#-technologies-utilisées)
- [👤 Auteur](#-auteur)
- [💡 Améliorations futures](#-améliorations-futures)

---

## 🚀 Fonctionnalités

### 🧠 Flashcards
- Création de **collections de cartes** personnalisées.  
- Ajout et suppression de **questions / réponses**.  
- Navigation intuitive (suivant / précédent).  
- Effet **flip** animé pour révéler la réponse.  
- **Sauvegarde automatique** des cartes via `localStorage`.  

### 🧩 Quiz
- Quiz générés depuis le fichier `assets/data/quizzes.json`.  
- Prise en charge de deux types de questions :
  - `text` → réponse à écrire.
  - `true_false` → question de type “Vrai ou Faux”.  
- Affichage instantané du **score** et des **corrections**.  
- Enregistrement du **meilleur score** localement.  

### 💾 Sauvegarde locale
- Les données (flashcards, scores, progression) sont stockées dans `localStorage`.  
- Aucune base de données externe n’est nécessaire.  

---

## 🎨 Interface utilisateur

- Design moderne et minimaliste conçu avec **Tailwind CSS**.  
- Palette de couleurs cohérente :
  - 🩵 **Bleu clair (#93C5FD)** — douceur et apprentissage  
  - 💙 **Bleu indigo (#2563EB)** — confiance et stabilité  
  - 💚 **Vert émeraude (#10B981)** — réussite et motivation  
- Entièrement **responsive** (mobile, tablette, desktop).  
- Animations douces au survol et au clic.  

---

## 🗂️ Structure du projet


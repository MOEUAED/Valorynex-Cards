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
```text
Valorynex-Cards/
│
├── index.html # Page d’accueil (landing page) 
│
├── /assets
│ ├── /src
│ │ └── output.css # Fichier CSS généré par Tailwind
│ ├── /js
│ │ ├── flashcards.js # Logique JS pour les flashcards
│ │ └── quiz.js # Logique JS pour les quiz
│ └── /data
│ └── quizzes.json # Données des quiz
│ ├── /html
│ │ └── flashcards.html # Page de création et gestion des flashcards
│ │ └── quiz.html # Page de quiz
|
└── README.md
```
## Installer Tailwind CSS (si tu veux modifier le style)

npm install
npx tailwindcss -i ./assets/src/input.css -o ./assets/src/output.css --watch

## Lancer le projet

Ouvre le fichier index.html avec un serveur local (ex : Live Server sur VS Code).

Ou déploie le projet sur GitHub Pages, Netlify ou Vercel.

## 📘 Exemple de fichier JSON

Fichier : assets/data/quizzes.json

```json
[
  {
    "id": "quiz-html",
    "collectionId": "html-basics",
    "title": "Quiz HTML - niveau débutant",
    "questions": [
      {
        "id": "q1",
        "type": "text",
        "question": "Que signifie HTML ?",
        "acceptedAnswers": [
          "Hyper Text Markup Language",
          "Hypertext Markup Language"
        ]
      },
      {
        "id": "q2",
        "type": "true_false",
        "question": "La balise <div> est sémantique.",
        "correct": false
      }
    ]
  }
]
```

## 🧠 Technologies utilisées

# Technologie	Rôle

# HTML5	
  Structure des pages
# CSS3 / Tailwind CSS	
  Style et mise en page responsive
# JavaScript (Vanilla)	
  Logique de gestion (flashcards + quiz)
# LocalStorage	
  Sauvegarde locale des données
# JSON	
  Format des données des quiz

## 👤 Auteur

👨‍💻 Mouad Ziyani
Projet : Valorynex-Cards
📅 Début : 03/11/2025
🕔 Date limite : 14/11/2025 - 17h00
📍 Réalisé dans le cadre d’un projet de développement web.

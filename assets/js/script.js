// Elements
const quizCountEl = document.getElementById('quiz-count');
const collectionForm = document.getElementById('collectionForm');
const cardForm = document.getElementById('cardForm');
const collectionTitleInput = document.getElementById('collectionTitle');
const collectionSelect = document.getElementById('collectionSelect');
const collectionsContainer = document.getElementById('collectionsContainer');
const cardSection = document.getElementById('cardSection');
const cardSectionTitle = document.getElementById('cardSectionTitle');
const cardContainer = document.getElementById('cardContainer');
const backButton = document.getElementById('backButton');

fetch('assets/data/collections.json')
.then(response => response.json())
.then(data => {
    quizCountEl.textContent = data.length;
    })
    .catch(err => {
        console.error('Failed to load collections:', err);
        quizCountEl.textContent = 0;
        });
        
        
        

let collections = {};
let currentIndex = 0;
let currentCollection = null;

// Load collections from JSON + localStorage
async function loadCollections() {
  try {
    // Fetch initial collections from JSON
    const res = await fetch('assets/data/collections.json');
    const initialData = await res.json();

    // Load saved collections from localStorage
    const savedData = JSON.parse(localStorage.getItem('cards_collections')) || [];

    // Merge JSON + localStorage
    collections = {};
    [...initialData, ...savedData].forEach(c => {
      collections[c.title] = c.cards || [];
    });

    updateCollectionSelect();
    renderCollections();
    updateCollectionCount();
  } catch (err) {
    console.error('Failed to load collections:', err);
  }
}

// Save collections to localStorage
function saveCollections() {
  const dataToSave = Object.entries(collections).map(([title, cards]) => ({ title, cards }));
  localStorage.setItem('cards_collections', JSON.stringify(dataToSave));
  updateCollectionCount();
}

// Update the collection dropdown
function updateCollectionSelect() {
  collectionSelect.innerHTML = '<option value="">-- Choisir une collection --</option>';
  for (const name in collections) {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    collectionSelect.appendChild(opt);
  }
}

// Render all collections
function renderCollections() {
  collectionsContainer.innerHTML = '';
  for (const [name, cards] of Object.entries(collections)) {
    const div = document.createElement('div');
    div.className = 'p-4 bg-purple-50 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition cursor-pointer';
    div.innerHTML = `
      <h4 class="text-lg font-semibold text-purple-700 mb-1">${name}</h4>
      <p class="text-sm text-gray-600">${cards.length} carte${cards.length > 1 ? 's' : ''}</p>
    `;
    div.addEventListener('click', () => {
      currentCollection = name;
      currentIndex = 0;
      showCards(name);
    });
    collectionsContainer.appendChild(div);
  }
}

// Show card
function showCards(name) {
  const cards = collections[name];
  if (!cards || cards.length === 0) {
    cardSection.classList.add('hidden');
    return;
  }

  cardSection.classList.remove('hidden');
  cardSectionTitle.textContent = `${name} (${cards.length} cartes)`;

  const c = cards[currentIndex];
  cardContainer.innerHTML = `
    <div class="flip-card w-full cursor-pointer">
      <div class="flip-inner">
        <div class="flip-front">Question ${currentIndex + 1} : ${c.question}</div>
        <div class="flip-back">${c.answer}</div>
      </div>
    </div>
  `;

  const flipCard = cardContainer.querySelector('.flip-card');
  flipCard.addEventListener('click', () => flipCard.classList.toggle('flipped'));
}

// Navigation buttons
document.getElementById('nextCard').addEventListener('click', () => {
  if (!currentCollection) return;
  const cards = collections[currentCollection];
  currentIndex = (currentIndex + 1) % cards.length;
  showCards(currentCollection);
});

document.getElementById('prevCard').addEventListener('click', () => {
  if (!currentCollection) return;
  const cards = collections[currentCollection];
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  showCards(currentCollection);
});

backButton.addEventListener('click', () => {
  cardSection.classList.add('hidden');
});

// Create new collection
collectionForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = collectionTitleInput.value.trim();
  if (!title) return alert("Veuillez entrer un titre de collection.");
  if (collections[title]) return alert("Cette collection existe déjà !");
  collections[title] = [];
  collectionTitleInput.value = '';
  updateCollectionSelect();
  renderCollections();
  saveCollections();
});

// Add new card
cardForm.addEventListener('submit', e => {
  e.preventDefault();
  const collectionName = collectionSelect.value;
  const question = document.getElementById('questionInput').value.trim();
  const answer = document.getElementById('answerInput').value.trim();
  if (!collectionName) return alert("Veuillez choisir une collection.");
  if (!question || !answer) return alert("Veuillez remplir la question et la réponse.");
  collections[collectionName].push({ question, answer });
  document.getElementById('questionInput').value = '';
  document.getElementById('answerInput').value = '';
  renderCollections();
  showCards(collectionName);
  saveCollections();
});

// Clear all collections
document.getElementById('clearStorageBtn').addEventListener('click', () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer toutes vos collections ?")) {
    localStorage.clear();
    collections = {};
    renderCollections();
    updateCollectionSelect();
    cardSection.classList.add('hidden');
    updateCollectionCount();
    alert("Toutes les données ont été supprimées");
  }
});

// Update collection count for homepage
function updateCollectionCount() {
  const quizCountEl = document.getElementById('quiz-count');
  if (quizCountEl) {
    quizCountEl.textContent = Object.keys(collections).length;
  }
}

window.addEventListener('load', loadCollections);

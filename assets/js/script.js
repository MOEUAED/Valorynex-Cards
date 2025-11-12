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
const clearBtn = document.getElementById('clearStorageBtn');

let collections = {};   
let currentIndex = 0;
let currentCollection = null;

function loadCollections() {
  const saved = JSON.parse(localStorage.getItem('cards_collections')) || [];

  collections = {};
  saved.forEach(c => {
    collections[c.title] = c.cards || [];
  });

  updateCollectionSelect();
  renderCollections();
  updateCollectionCount();
}

function saveCollections() {
  const dataToSave = Object.entries(collections).map(([title, cards]) => ({
    title,
    cards
  }));

  localStorage.setItem('cards_collections', JSON.stringify(dataToSave));
  updateCollectionCount();
}

function updateCollectionSelect() {
  collectionSelect.innerHTML = '<option value="">-- Choisir une collection --</option>';
  for (const name in collections) {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    collectionSelect.appendChild(opt);
  }
}

function renderCollections() {
  collectionsContainer.innerHTML = '';
  for (const [name, cards] of Object.entries(collections)) {
    const div = document.createElement('div');
    div.className = 'p-4 bg-[#3a3a3a] rounded-xl border border-[#4a4a4a] hover:shadow-lg transition cursor-pointer';
    div.innerHTML = `
      <h4 class="text-lg font-semibold text-[#c49b63] mb-1">${name}</h4>
      <p class="text-sm text-[#d1d1d1]">${cards.length} carte${cards.length > 1 ? 's' : ''}</p>
    `;
    div.addEventListener('click', () => {
      currentCollection = name;
      currentIndex = 0;
      showCards(name);
    });
    collectionsContainer.appendChild(div);
  }
}
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
    <div class="flip-card w-full cursor-pointer text-[#1f1f1f]">
      <div class="flip-inner">
        <div class="flip-front bg-[#c49b63] p-6 rounded-xl font-semibold">Question ${currentIndex + 1} : ${c.question}</div>
        <div class="flip-back bg-[#e0b77c] p-6 rounded-xl font-semibold">${c.answer}</div>
      </div>
    </div>
  `;

  const flipCard = cardContainer.querySelector('.flip-card');
  flipCard.addEventListener('click', () => flipCard.classList.toggle('flipped'));
}

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
clearBtn.addEventListener('click', () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer toutes vos collections ?")) {
    localStorage.removeItem('cards_collections');
    collections = {};
    renderCollections();
    updateCollectionSelect();
    cardSection.classList.add('hidden');
    updateCollectionCount();
    alert("Toutes les données ont été supprimées.");
  }
});

function updateCollectionCount() {
  if (quizCountEl) {
    quizCountEl.textContent = Object.keys(collections).length;
  }
}

window.addEventListener('load', loadCollections);

const quizList = document.getElementById("quizList");
    const startBtn = document.getElementById("startQuizBtn");
    const quizArea = document.getElementById("quizArea");
    const quizTitle = document.getElementById("quizTitle");
    const questionText = document.getElementById("questionText");
    const answerArea = document.getElementById("answerArea");
    const nextBtn = document.getElementById("nextBtn");
    const resultArea = document.getElementById("resultArea");
    const scoreText = document.getElementById("scoreText");
    const retryBtn = document.getElementById("retryBtn");

    let quizzes = [];
    let currentQuiz = null;
    let currentIndex = 0;
    let score = 0;

    // Load quiz data
    fetch("../data/quizzes.json")
      .then(res => res.json())
      .then(data => {
        quizzes = data;
        quizzes.forEach(q => {
          const option = document.createElement("option");
          option.value = q.id;
          option.textContent = q.title;
          quizList.appendChild(option);
        });
      });

    startBtn.addEventListener("click", () => {
      const selectedId = quizList.value;
      if (!selectedId) return alert("Veuillez choisir un quiz !");
      currentQuiz = quizzes.find(q => q.id === selectedId);
      currentIndex = 0;
      score = 0;
      document.getElementById("quizSelector").classList.add("hidden");
      quizArea.classList.remove("hidden");
      loadQuestion();
    });

    function loadQuestion() {
      const question = currentQuiz.questions[currentIndex];
      quizTitle.textContent = currentQuiz.title;
      questionText.textContent = question.question;
      answerArea.innerHTML = "";

      if (question.type === "text") {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Votre réponse...";
        input.className = "bg-[#2c2c2c] border border-[#3a3a3a] rounded-lg px-4 py-2 text-[#f5f5f5] outline-none focus:ring-2 focus:ring-[#c49b63]";
        answerArea.appendChild(input);

        const submit = document.createElement("button");
        submit.textContent = "Valider";
        submit.className = "px-6 py-2 rounded-lg bg-[#c49b63] text-[#1f1f1f] font-semibold hover:bg-[#e0b77c] transition";
        answerArea.appendChild(submit);

        submit.onclick = () => {
          const userAnswer = input.value.trim().toLowerCase();
          const correct = question.acceptedAnswers.some(ans => ans.toLowerCase() === userAnswer);
          if (correct) score++;
          nextBtn.classList.remove("hidden");
          answerArea.innerHTML += `<p class="mt-4 ${correct ? 'text-green-400' : 'text-red-400'}">${correct ? '✅ Correct !' : '❌ Incorrect'}</p>`;
          submit.disabled = true;
        };
      } else if (question.type === "true_false") {
        ["Vrai", "Faux"].forEach(choice => {
          const btn = document.createElement("button");
          btn.textContent = choice;
          btn.className = "px-6 py-2 rounded-lg bg-[#c49b63] text-[#1f1f1f] font-semibold hover:bg-[#e0b77c] transition";
          btn.onclick = () => {
            const isTrue = choice === "Vrai";
            const correct = isTrue === question.correct;
            if (correct) score++;
            answerArea.innerHTML += `<p class="mt-4 ${correct ? 'text-green-400' : 'text-red-400'}">${correct ? '✅ Correct !' : '❌ Incorrect'}</p>`;
            nextBtn.classList.remove("hidden");
          };
          answerArea.appendChild(btn);
        });
      }
    }

    nextBtn.addEventListener("click", () => {
      currentIndex++;
      if (currentIndex < currentQuiz.questions.length) {
        nextBtn.classList.add("hidden");
        loadQuestion();
      } else {
        showResult();
      }
    });

    function showResult() {
      quizArea.classList.add("hidden");
      resultArea.classList.remove("hidden");
      scoreText.textContent = `Votre score : ${score} / ${currentQuiz.questions.length}`;
      localStorage.setItem("best_score_" + currentQuiz.id, Math.max(score, localStorage.getItem("best_score_" + currentQuiz.id) || 0));
    }

    retryBtn.addEventListener("click", () => {
      resultArea.classList.add("hidden");
      document.getElementById("quizSelector").classList.remove("hidden");
    });
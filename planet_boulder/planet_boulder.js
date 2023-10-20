let analyzeTextState = 0;
let analyzeTextInterval;

function animateAnalyzingText() {
    const btn = document.getElementById('analyzeBtn');
    const states = [
        "Scannen",
        "Scannen.",
        "Scannen..",
        "Scannen...",
    ];
    btn.textContent = states[analyzeTextState];
    analyzeTextState = (analyzeTextState + 1) % states.length;
}

function animateAnalyzedText() {
    const btn = document.getElementById('analyzeBtn');
    const states = ["Geslaag", "Geslaag!"];
    btn.textContent = states[analyzeTextState];
    analyzeTextState = (analyzeTextState + 1) % states.length;
}

function animateToAnalyzeText() {
    const btn = document.getElementById('analyzeBtn');
    const states = ["Analyzeer", "> Analyzeer <", ">> Analyzeer <<", ">>> Analyzeer <<<", ">> Analyzeer <<", "> Analyzeer <"];
    btn.textContent = states[analyzeTextState];
    analyzeTextState = (analyzeTextState + 1) % states.length;
}

const images = [
    'img/boulder1.png',
    'img/boulder2.png',
    'img/boulder3.png',
    'img/boulder4.png',
    'img/boulder5.png',
    'img/boulder6.png',
    'img/boulder7.png',
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('analyzeBtn').addEventListener('click', async function() {
    clearInterval(analyzeTextInterval);
    
    const btn = this;
    btn.disabled = true;

    analyzeTextInterval = setInterval(animateAnalyzingText, 500);

	typePhrase();

    const rect = btn.getBoundingClientRect();

    const scanSound = document.getElementById('scanSound');
    scanSound.currentTime = 0;
    scanSound.play();

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 100; i++) {
            const img = document.createElement('img');
            img.src = images[Math.floor(Math.random() * images.length)];
            img.classList.add('flying-image');

            img.style.top = `${rect.top + rect.height/2 - 25}px`;
            img.style.left = `${rect.left + rect.width/2 - 25}px`;

            document.body.appendChild(img);

            const randomX = (Math.random() - 0.5) * 2 * window.innerWidth;
            const randomY = (Math.random() - 0.5) * 2 * window.innerHeight;

            setTimeout(() => {
                img.style.transform = `translate(${randomX}px, ${randomY}px)`;
                img.style.opacity = 0;
            }, 50);
        }
        await sleep(2000);
    }

	await sleep(2000);
	
    const completeSound = document.getElementById('completeSound');
    completeSound.currentTime = 0;
    completeSound.play();

    clearInterval(analyzeTextInterval);
    analyzeTextState = 0;
    analyzeTextInterval = setInterval(animateAnalyzedText, 500);

    await sleep(2000);

    stopDots = true;

    concludePhrases = [
		"\n",
        "Analyse van materialen van Planet Boulder voltooid...\n",
        "Gevonden materialen zijn perfect voor klimgrepen...\n",
        "Dankzij jouw hulp zijn de klimgrepen nu veiliger en sterker...\n",
        "Alle boulderhallen wereldwijd zijn gered...\n",
        "Je bent de held van de boulderwereld!\n"
    ];
    currentPhrase = 0;

	const hackingTextElement = document.getElementById('hacking-text');
	const conclusionTextElement = document.getElementById('conclusion-text');
    const textLogoElement = document.getElementById('text-logo');
    
	btn.style.opacity = '0';
	hackingTextElement.style.opacity = '0';
	conclusionTextElement.style.opacity = '0';
	textLogoElement.style.opacity = '0';

	setTimeout(() => {
		btn.style.display = 'none';
		hackingTextElement.style.display = 'none';
		conclusionTextElement.style.display = 'none';
        textLogoElement.style.display = 'none';
	}, 3000);

	await sleep(1000);

	setTimeout(() => {
		const bigImage = document.createElement('img');
		bigImage.id = 'bigImage';
		bigImage.src = 'img/check.gif';
		document.body.appendChild(bigImage);
	
		setTimeout(() => {
			bigImage.style.opacity = '1';
		}, 50);
	
	}, 2000);
	
});

const hackingPhrases = [
    "Inloggen op Boulderhal Krachtstof mainframe...\n",
    "Toegang verkrijgen tot geheime planeetgegevens...\n",
    "Verbinding maken met Planet Boulder...\n",
    "Scannen van planeetoppervlak...\n",
    "Zoeken naar onbekende materialen...\n",
    "Encryptieprotocollen detecteren...\n",
    "Bypassing beveiligingslagen...\n",
    "Toegang krijgen tot geheime materiaaldatabases...\n",
    "Beginnen met voorlopige materiaalanalyse...\n",
    "Datastromen onderscheppen...\n",
    "Materialen verzamelen voor verdere analyse...\n",
    "Data uploaden van handscanner...\n",
    "Voorbereiden voor diepte-analyse...\n",
];

let currentPhrase = 0;
let currentChar = 0;

function typePhrase() {
    const hackingTextElement = document.getElementById('hacking-text');

    if (currentChar < hackingPhrases[currentPhrase].length) {
        hackingTextElement.setAttribute('data-content', hackingTextElement.getAttribute('data-content') + hackingPhrases[currentPhrase][currentChar]);
        hackingTextElement.classList.add('green-gradient-text');

        const typeSound = document.getElementById('typeSound');
        typeSound.currentTime = 0;
        typeSound.play();

        currentChar++;
        setTimeout(typePhrase, Math.random() * 10 + 5);
    } else {
        currentChar = 0;
        currentPhrase++;
        if (currentPhrase < hackingPhrases.length) {
            setTimeout(typePhrase, 100);
        } else {
            typeDots();
        }
    }
}

let dotCount = 0;
let direction = 1;

function typeDots() {
    if (dotCount < 5 && direction === 1) {
        document.getElementById('hacking-text').textContent += '.';
        dotCount++;
        if (dotCount === 5) {
            direction = -1;
        }
    } else if (dotCount > 0 && direction === -1) {
        const currentText = document.getElementById('hacking-text').textContent;
        document.getElementById('hacking-text').textContent = currentText.slice(0, -1);
        dotCount--;
        if (dotCount === 0) {
            direction = 1;
        }
    }

    setTimeout(typeDots, 50);
}

function typeConclusion() {
    const conclusionTextElement = document.getElementById('conclusion-text');

    if (currentChar < concludePhrases[currentPhrase].length) {
        conclusionTextElement.setAttribute('data-content', conclusionTextElement.getAttribute('data-content') + concludePhrases[currentPhrase][currentChar]);
        conclusionTextElement.classList.add('orange-gradient-text');
        
        const typeSound = document.getElementById('typeSound');
        typeSound.currentTime = 0; 
        typeSound.play();

        currentChar++;
        setTimeout(typeConclusion, Math.random() * 10 + 5);
    } else {
        currentChar = 0;
        currentPhrase++;
        if (currentPhrase < concludePhrases.length) {
            setTimeout(typeConclusion, 100);
        }
    }
}

analyzeTextInterval = setInterval(animateToAnalyzeText, 500);

const logo = document.getElementById('logo');
logo.addEventListener('click', function() {
    window.location.href = "planet_boulder.html";
});

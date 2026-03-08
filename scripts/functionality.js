const createLevel = (arr) => {
    const Levels = arr.map(el => `<span class="btn rounded-2xl">${el}</span>`);
    return (Levels.join(' '));
}


const loadAllCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => displayAllCards(json.data));
}


const displayAllCards = (allCard) => {
    const allCardContainer = document.getElementById("all-card-container");
    allCardContainer.innerHTML = "";
    const color1 = "border-t-4 border-green-500";
    const color2 = "border-t-4 border-purple-500";
    const img1 = "assets/open-Status.png";
    const img2 = "assets/closed-Status.png";


    for (let card of allCard) {
        const status = card.status;
        let color = "";
        let img = "";

        if (status == "open") {
            color = color1;
            img = img1;
        }
        else {
            color = color2;
            img = img2;
        }

        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div onclick="loadCardDetails(${card.id})" class="card bg-white p-7 ${color} space-y-2">
                        <div class="flex justify-between">
                            <img src="${img}" alt="">
                            <p class="btn rounded-2xl bg-red-400">${card.priority}</p>
                        </div>

                        <div class="space-y-2">
                            <h2 class="font-bold text-xl">${card.title}</h2>
                            <p class="text-gray-700">${card.description}</p>
                        </div>

                        <div class="flex flex-wrap items-center gap-2">
                            ${createLevel(card.labels)}
                        </div>

                        <hr class="-mx-5 my-5 border-gray-200">
                        <div>
                            <p>${card.author}</p>
                            <p>${new Date(card.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
        `;

        allCardContainer.append(cardDiv);

        const clone = cardDiv.cloneNode(true);
        if (status == "open") {
            addOpenCard(clone);
        }
        else {
            addClosedCard(clone);
        }

    }
}

const addOpenCard = (card) => {
    const openCardContainer = document.getElementById('open-container');
    openCardContainer.append(card);
}
const addClosedCard = (card) => {
    const closeCardContainer = document.getElementById('close-container');
    closeCardContainer.append(card);
}

loadAllCards();


const updateCount = (id) => {
    const container = document.getElementById(id);
    const totalCards = container.children.length;

    const update = document.getElementById('issue-no');
    update.innerText = totalCards;
}

const switchTab = (id, id1) => {
    let all = document.getElementById('all-card-container');
    let open = document.getElementById('open-container');
    let closed = document.getElementById('close-container');
    let search = document.getElementById('search-container');
    let show = document.getElementById(id);


    all.classList.add('hidden');
    open.classList.add('hidden');
    closed.classList.add('hidden');
    search.classList.add('hidden');

    show.classList.remove('hidden');

    all = document.getElementById('all-btn');
    open = document.getElementById('open-btn');
    closed = document.getElementById('close-btn');
    show = document.getElementById(id1);
    all.classList.remove('btn-primary');
    open.classList.remove('btn-primary');
    closed.classList.remove('btn-primary');

    show.classList.add('btn-primary');

    updateCount(id);
}


document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const input = searchInput.value;
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${input}`;

    fetch(url)
        .then(res => res.json())
        .then(json => showSearchCard(json.data));
});

const showSearchCard = (allCard) => {
    const allCardContainer = document.getElementById("search-container");
    allCardContainer.innerHTML = "";
    const color1 = "border-t-4 border-green-500";
    const color2 = "border-t-4 border-purple-500";
    const img1 = "assets/open-Status.png";
    const img2 = "assets/closed-Status.png";


    for (let card of allCard) {
        const status = card.status;
        let color = "";
        let img = "";

        if (status == "open") {
            color = color1;
            img = img1;
        }
        else {
            color = color2;
            img = img2;
        }

        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div onclick="loadCardDetails(${card.id})" class="card bg-white p-7 ${color} space-y-2">
        <div class="flex justify-between">
        <img src="${img}" alt="">
        <p class="btn rounded-2xl">${card.priority}</p>
        </div>
        
        <div class="space-y-2">
        <h2 class="font-bold text-xl">${card.title}</h2>
        <p class="text-gray-700">${card.description}</p>
        </div>
        
        <div class="flex flex-wrap items-center gap-2">
        ${createLevel(card.labels)}
        </div>
        
        <hr class="-mx-5 my-5 border-gray-200">
        <div>
        <p>${card.author}</p>
        <p>${new Date(card.createdAt).toLocaleDateString()}</p>
        </div>
        </div>
        `;

        allCardContainer.append(cardDiv);
    }
    switchTab('search-container', 'all-btn');
}


const loadCardDetails = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(json => displayCardDetails(json.data))
}

const displayCardDetails = (card) => {
    const modalDetails = document.getElementById('details-container');
    modalDetails.innerHTML = `
    <div class="p-8 space-y-3">
                        <h2 class="text-2xl font-bold">${card.title}</h2>
                        <p class="text-gray-600"> <span class="btn rounded-2xl bg-green-300">${card.status}</span> . Opened by ${card.author} .
                            ${new Date(card.createdAt).toLocaleDateString()}</p>

                        <div>
                            ${createLevel(card.labels)}
                        </div>

                        <p class="text-gray-600">${card.description}</p>

                        <div class="bg-gray-200 rounded-xl p-6 flex justify-between items-center mt-4">
                            <div>
                                <p class="text-gray-500 text-sm">Assignee:</p>
                                <p class="font-semibold text-lg">${card.author} </p>
                            </div>

                            <div class="text-right">
                                <p class="text-gray-500 text-sm">Priority:</p>
                                <span class="btn text-base font-bold px-4 py-1 rounded-full bg-red-400">
                                    ${card.priority}
                                </span>
                            </div>

                        </div>
                    </div>
    `;


    document.getElementById('my_modal_5').showModal();

}

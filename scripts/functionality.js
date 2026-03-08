const createLevel = (arr) => {
    const Levels = arr.map(el =>`<span class="btn rounded-2xl">${el}</span>`);
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
        <div class="card bg-white p-7 ${color} space-y-2">
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
                            <p>${card.createdAt}</p>
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


const updateCount=(id)=>{
    const container=document.getElementById(id);
    const totalCards = container.children.length;

    const update =document.getElementById('issue-no');
    update.innerText=totalCards;
}

const switchTab = (id, id1) => {
    let all = document.getElementById('all-card-container');
    let open = document.getElementById('open-container');
    let closed = document.getElementById('close-container');
    let show = document.getElementById(id);


    all.classList.add('hidden');
    open.classList.add('hidden');
    closed.classList.add('hidden');

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


document.getElementById('search-btn').addEventListener('click',()=>{
    const searchInput = document.getElementById('search-input');
    const input= searchInput.value;
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${input}`;

    fetch(url)
    .then(res=>res.json())
    .then(json=>console.log(json.data));
});


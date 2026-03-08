const loadAllCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => displayAllCards(json.data));
}

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

const displayAllCards = (allCard) => {
    const allCardContainer = document.getElementById("all-card-container");
    allCard.innerHTML = "";
    const color1="border-t-4 border-green-500";
    const color2="border-t-4 border-purple-500";
    const img1="assets/open-Status.png";
    const img2="assets/closed- Status.png";

    
    for (let card of allCard) {
        const status=card.status;
        const color="";
        const img="";

        if(status=="open"){
            color=color1;
            img=img1;
        }
        else{
            color=color2;
            img=img2;
        }

        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="card bg-white p-7 ${color} space-y-2">
                        <div class="flex justify-between">
                            <img src=${img} alt="">
                            <p class="btn rounded-2xl">${card.priority}</p>
                        </div>

                        <div class="space-y-2">
                            <h2 class="font-bold text-xl">${card.title}</h2>
                            <p class="text-gray-700">${card.description}</p>
                        </div>

                        <div class="flex flex-wrap items-center">
                            <span class="btn rounded-2xl">Level</span>
                            <span class="btn rounded-2xl">Level</span>
                        </div>

                        <hr class="-mx-5 my-5 border-gray-200">
                        <div>
                            <p>${card.author}</p>
                            <p>${card.createdAt}</p>
                        </div>
                    </div>
        `;

        allCardContainer.append(cardDiv);
    }
}

loadAllCards();
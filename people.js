//  Selectors
const lister = document.querySelector("main");
const popup = document.querySelector("aside");
const peopleLoader = document.querySelector("#home");
const menLoader = document.querySelector("#loadMen");
const womenLoader = document.querySelector("#loadWomen");

//  Functions
const hidePopup = (event) => {
    event.preventDefault();
    popup.innerHTML = "";
    popup.classList.remove("show");
};

const showPopup = (data) => {
    const name = `${data.name.title} ${data.name.first} ${data.name.last}`;
    const address = [
        `${data.location.street.number} ${data.location.street.name}`,
        data.location.city,
        data.location.state,
        data.location.country,
    ]
        .filter((x) => !!x)
        .join(", ");
    const phone = [data.phone, data.cell].filter((x) => !!x).join(" / ");

    popup.innerHTML = `
            <div class="popup">
                <div class="details">
                    <img src="${data.picture.large}" alt="Picture of ${name}">
                    <p>Hello, I am</p>
                    <p>${name}</p>
                </div>
                <dl>
                    <dt>Address:</dt> <dd>${address}</dd>
                    <dt>Phone:</dt> <dd>${phone}</dd>
                    <dt>Email:</dt> <dd>${data.email}</dd>
                </dl>
            </div>
        `;

    const close = document.createElement("button");
    close.innerHTML = "&times;";
    close.addEventListener("click", hidePopup);

    popup.classList.add("show");
    popup.querySelector(".popup").insertAdjacentElement("afterbegin", close);
};

const buildCard = (data, target) => {
    let output = document.createElement("div");
    output.classList.add("card");

    let image = document.createElement("img");
    image.src = data.picture.medium;
    output.appendChild(image);

    let p = document.createElement("p");
    p.innerText = `Hello, I am `;

    let span = document.createElement("span");
    span.innerText = `${data.name.title} ${data.name.first} ${data.name.last}`;

    p.appendChild(span);
    output.appendChild(p);

    target.appendChild(output);

    [image, p].forEach((elem) =>
        elem.addEventListener("click", (event) => {
            event.preventDefault();
            showPopup(data);
        })
    );
};

const loadPeople = async (gender = null, count = 20) => {
    const request = await fetch(
        `https://randomuser.me/api/?results=${count}&gender=${gender}`
    );
    const data = await request.json();
    if (request.ok) {
        return data.results;
    }
};

const load = (gender = null) => {
    lister.innerHTML = "";
    loadPeople(gender).then((ppl) =>
        ppl.forEach((person) => buildCard(person, lister))
    );
};

//  Events
peopleLoader.addEventListener("click", (e) => {
    e.preventDefault();
    load();
});

menLoader.addEventListener("click", (e) => {
    e.preventDefault();
    load("male");
});

womenLoader.addEventListener("click", (e) => {
    e.preventDefault();
    load("female");
});

cont init = () => {
    load();

    document.body.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            hidePopup(e);
        }
    });
}

// init();

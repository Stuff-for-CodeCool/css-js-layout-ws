const lister = document.querySelector("main");
const popup = document.querySelector("aside");
const home = document.querySelector("#home");
const men = document.querySelector("#loadMen");
const women = document.querySelector("#loadWomen");

const loadPeople = async (gender, count) => {
    const request = await fetch(
        `https://randomuser.me/api/?results=${count}&gender=${gender}`
    );
    const data = await request.json();

    if (request.ok) {
        return data.results;
    }
};

const buildCard = (data, target) => {
    target.innerHTML =
        target.innerHTML +
        `
            <div class="card">
                <img src="${data.picture.medium}">
                <p>Hello, I am <span>${data.name.title} ${data.name.first} ${data.name.last}</span></p>
            </div>
        `;

    target.querySelectorAll("img, p").forEach((el) => {
        el.addEventListener("click", (evt) => {
            evt.preventDefault();
            showPopup(data);
        });
    });
    // let output = document.createElement("div");
    // output.classList.add("card");

    // let image = document.createElement("img");
    // image.src = data.picture.medium;
    // image.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     showPopup(data);
    // });
    // output.appendChild(image);

    // let p = document.createElement("p");
    // p.innerText = "Hello, I am ";

    // let span = document.createElement("span");
    // span.innerText = `${data.name.title} ${data.name.first} ${data.name.last}`;

    // p.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     showPopup(data);
    // });

    // p.appendChild(span);
    // output.appendChild(p);

    // target.appendChild(output);
};

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
    console.log(name, address, phone);

    popup.innerHTML = `
<div class="popup">

    <div class="details">
        <img src="${data.picture.large}" alt="Picture of ${name}">
        <p>Hello, I am</p>
        <p>${name}</p>
    </div>
    <dl>
        <dt>Address:</dt>
        <dd>${address}</dd>
        <dt>Phone:</dt>
        <dd>${phone}</dd>
        <dt>Email:</dt>
        <dd>${data.email}</dd>
    </dl>
</div>
`;

    const close = document.createElement("button");
    close.innerHTML = "&times;";
    close.addEventListener("click", hidePopup);

    popup.classList.add("show");
    popup.querySelector(".popup").insertAdjacentElement("afterbegin", close);
};

const load = (gender = "", count = 20) => {
    lister.innerHTML = "";
    loadPeople(gender, count).then((people) => {
        people.forEach((person) => buildCard(person, lister));
    });
};

load();
home.addEventListener("click", (event) => {
    event.preventDefault();
    load();
});

men.addEventListener("click", (event) => {
    event.preventDefault();
    load("male", 400);
});

women.addEventListener("click", (event) => {
    event.preventDefault();
    load("female");
});

document.body.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
        hidePopup(event);
    }
});

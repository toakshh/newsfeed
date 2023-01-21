let ID = () => Math.random().toString(36).slice(2, 11);
// console.log(ID)

let getAccordian = (title, id, index) => {
  // console.log("first", id)
  return `
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading-${id}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${id}" aria-expanded="true" aria-controls="collapse-${id}">
                ${title}
            </button>
        </h2>
        <div id="collapse-${id}"  aria-labelledby="heading-${id}" data-bs-parent="#accordionParent">
            <div class="accordion-body">
                
            </div>
        </div>
    </div>
    `;
};
let getCarouselOuter = (id, innerId) => {
  return `
    <div id="carouselControls-${id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" id="${innerId}"></div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls-${id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselControls-${id}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `;
};
let createCarouselItem = (id, active) => {
  return `
    <div class="carousel-item ${active ? "active" : ""}" id= ${id}></div>
    `;
};
let createCard = (item) => {
  return `
    <div class="card">
        <img src="${item.enclosure.link}" class="card-img-top" alt="image">
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${item.author}</h6>
            <p class="card-subtitle text-secondary">${item.pubDate}</p>
            <p class="card-text">${item.description}</p>
            <a href="${item.link}" class="stretched-link" target="_blank"></a>
        </div>
  </div>
    `;
};

let addContent = async () => {
  magazines.forEach(async (magazine, i) => {
    let res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(magazine)}`
    );

    let data = await res.json();
    // console.log(data,i)

    // console.log(data.feed.title)
    let accordionId = ID();
    let accItem = getAccordian(data.feed.title, accordionId, i);
    // console.log(accItem)
    document.getElementById("accordion-parent").innerHTML += accItem;
    //to unhide and hide accordion components
    if (i == 0) {
      document
        .getElementById(`collapse-${accordionId}`)
        .setAttribute("class", "accordion-collapse collapse show");
    } else {
      document
        .getElementById(`collapse-${accordionId}`)
        .setAttribute("class", "accordion-collapse collapse");
    }
    let carouselId = ID();
    let carouselInnedId = ID();
    const carouselItems = getCarouselOuter(carouselId, carouselInnedId);
    document.getElementById(`collapse-${accordionId}`).innerHTML =
      carouselItems;

    // const items = data.items;
    data.items.forEach((item, j) => {
      //create carouselitem
      const card = createCard(item);
      console.log("card", card);

      //generate carousel
      const carouselItemId = ID();
      const carouselItem = createCarouselItem(carouselItemId, j === 0);
      // console.log(carouselItem)

      //appending...
      document.getElementById(carouselInnedId).innerHTML += carouselItem;

      //append card
      document.getElementById(carouselItemId).innerHTML += card;
    });
  });
};
addContent();

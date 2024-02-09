let searchInput = document.getElementById("searchInput");
let searchResultsId = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendResult(item) {
    let {
        title,
        link,
        description
    } = item;
    //creating div container Element
    spinner.classList.add("d-none");
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("result-item");

    let titleElement = document.createElement("a");
    titleElement.href = link;
    titleElement.textContent = title;
    titleElement.target = "_blank";
    titleElement.classList.add("result-title");
    itemContainer.appendChild(titleElement);
    //creating break Element 
    let linkBreakEl = document.createElement("br");
    itemContainer.appendChild(linkBreakEl);
    //creating url Element
    let urlElement = document.createElement("a");
    urlElement.textContent = link;
    urlElement.target = "_blank";
    urlElement.href = link;
    urlElement.classList.add("result-url");
    itemContainer.appendChild(urlElement);
    let linkBreakE2 = document.createElement("br");
    itemContainer.appendChild(linkBreakE2);
    //creating description Element
    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("link-description");
    itemContainer.appendChild(descriptionElement);

    searchResultsId.appendChild(itemContainer);

}

function getResultPage(searchResults) {
    for (let item of searchResults) {
        createAndAppendResult(item);
    }
}

function getDeatils(event) {
    if (event.key === "Enter") {
        searchResultsId.textContent = "";
        spinner.classList.remove("d-none");
        let searchInputValue = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let option = {
            method: "GET"
        };
        fetch(url, option)
            .then(function(response) {
                return response.json();
            })
            .then(function(jasonData) {
                let {
                    search_results
                } = jasonData;

                getResultPage(search_results);
              
            });
    }
}
searchInput.addEventListener("keydown", getDeatils);
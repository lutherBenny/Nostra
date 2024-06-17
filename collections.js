import { products } from "./products.js";

document.addEventListener("DOMContentLoaded", function () {
    // Hide the offer bar
    var offerBar = document.querySelector(".offer-bar");
    document.getElementById("offer-close").addEventListener("click", function () {
        offerBar.style.display = "none";
    });

    // Side Navbar Toggle
    var sideNavMenu = document.querySelector(".navbar-menu-toggle");
    var sideNavbar = document.querySelector(".side-navbar");
    sideNavMenu.addEventListener("click", function () {
        sideNavbar.style.marginLeft = "0px";
    });

    document.getElementById("side-navbar-close").addEventListener("click", function () {
        sideNavbar.style.marginLeft = "-60%";
    });

    // Render Products
    var container = document.querySelector(".products");
    renderProducts(products);

    // Filter Handling
    var filterList = [];

    var tags = document.querySelectorAll('input[name="tags"]');
    tags.forEach((tag) => {
        tag.addEventListener("change", (e) => {
            if (e.target.checked) {
                filterList.push(e.target.value);
            } else {
                filterList = filterList.filter((item) => item !== e.target.value);
            }
            update();
        });
    });

    // Search Handling
    var searchInput = document.querySelector(".navbar-search input[type='search']");
    searchInput.addEventListener("keyup", function () {
        update();
    });

    function update() {
        var productList = document.querySelectorAll(".product");
        productList.forEach((product) => {
            var tagsElement = product.querySelector("tags");
            var tagsArray = tagsElement.textContent.split(",");
            var showProduct = true;

            // Filter check
            filterList.forEach((filter) => {
                if (!tagsArray.includes(filter)) {
                    showProduct = false;
                }
            });

            // Search check
            var searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm && product.textContent.toLowerCase().indexOf(searchTerm) === -1) {
                showProduct = false;
            }

            if (showProduct) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }

    function renderProducts(products) {
        products.forEach((product) => {
            var createItem = document.createElement("div");
            createItem.classList.add("product");
            createItem.innerHTML = ` <img style="width: 20vw;" src="${product.src}">
                <h1>${product.name}</h1>
                <p>₹${product.price}</p>
                <tags style="visibility:hidden;">${product.tags.join()}</tags>`;

            container.appendChild(createItem);
        });
    }
});

window.onload = loadData();
function loadData() {
    runBlockA();
    loadLatestProduct();
    loadLatestProductFunction();
    runBlockC();
}

// Block A : Slideshow contains Brand list & Advertisement slide
function runBlockA() {

    // Render brand lists
    function loadBrandList() {
        const box = document.querySelector(".slideshow__brand-box");
        for (let i = 0; i < brandData.length; i++) {
            let list = '<li class="slideshow__brand-list">' +
                '<a class="slideshow__brand-link link" href="' + brandData[i].link + '">' + brandData[i].name + '</a>' +
                ' </li>';
            box.innerHTML += list;
        }
    }

    // Render slideshow images and numbers
    function loadSlideshow() {
        const box = document.querySelector(".slideshow__slide-box");
        const counter = document.querySelector(".slideshow__slide-counter");
        for (let i = 0; i < advertisement.length; i++) {
            let item = '<div class="slideshow__slide-item">';
            let number = '<div class="slideshow__slide-number" data-index="' + i + '">' + (i + 1) + '</div>';
            if (i == 0) {
                item = '<div class="slideshow__slide-item active">';
                number = '<div class="slideshow__slide-number active" data-index="' + i + '">' + (i + 1) + '</div>';
            }
            item += '<img draggable="false" src="' + advertisement[i].image + '" alt="' + advertisement[i].name + '" data-index="' + i + '">' +
                '</div>';
            box.innerHTML += item;
            counter.innerHTML += number;
        }
    }

    // Drag slidehow and number
    function dragSlideshow() {
        // Get all slideshow images
        const items = document.querySelectorAll(".slideshow__slide-item");

        if (items.length > 1) {
            let downedX = 0;
            let movedX = 0;

            const slide = document.querySelector("#slideshow-slide-box");
            const counter = document.querySelector("#slideshow-slide-counter");
            const numbers = document.querySelectorAll(".slideshow__slide-number");

            let running = setInterval(function () { findSlideIndex(1) }, 5000);

            slide.addEventListener("mousedown", downSlide);
            slide.addEventListener("mouseup", upSlide);

            counter.addEventListener("mouseenter", function () { clearInterval(running); });
            counter.addEventListener("mouseleave", function () { running = setInterval(function () { findSlideIndex(1) }, 5000); });

            for (let i = 0; i < numbers.length; i++) {
                numbers[i].addEventListener("click", findNumberIndex);
            }

            function downSlide(e) {
                e = e || window.event;
                downedX = e.clientX;
                clearInterval(running);
                slide.addEventListener("mouseleave", upSlide);
            }

            function upSlide(e) {
                e = e || window.event;
                movedX = e.clientX;
                if (downedX < movedX) {
                    findSlideIndex(-1);
                } else if (downedX > movedX) {
                    findSlideIndex(1);
                }
                slide.removeEventListener("mouseleave", upSlide);
                running = setInterval(function () { findSlideIndex(1) }, 5000);
            }

            function findSlideIndex(n) {
                let index = 0;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].classList.contains("active")) {
                        index = i;
                        break;
                    }
                }
                if (n == -1) {
                    index = index - 1 < 0 ? items.length - 1 : index - 1;
                } else {
                    index = index + 1 > items.length - 1 ? 0 : index + 1;
                }
                changeIndex(index);
            }

            function findNumberIndex(e) {
                e = e || window.event;
                let index = e.currentTarget.dataset.index;
                changeIndex(index);
            }

            function changeIndex(index) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].classList.contains("active")) {
                        items[i].classList.remove("active");
                        numbers[i].classList.remove("active");
                        break;
                    }
                }
                items[index].classList.add("active");
                numbers[index].classList.add("active");
            }

            running;
        }
    }

    loadBrandList();
    loadSlideshow();
    dragSlideshow();
}

function loadLatestProduct() {
    const roller = document.querySelector(".product__roller");
    const quantity = 5;
    const size = document.querySelector(".product__body").offsetWidth / quantity;
    const stringSize = ' style="width: ' + size + 'px;"';
    roller.style.width = 100 + "%";
    if (latestProduct.length > quantity) {
        roller.style.width = size * latestProduct.length + "px";
        const header = document.querySelector(".product__header");
        const buttonBox = '<div class="product__button-box">' +
            '<div class="text product__button-left">' +
            '<i class="fas fa-chevron-left"></i>' +
            '</div>' +
            '<div class="text product__button-right">' +
            '<i class="fas fa-chevron-right"></i>' +
            '</div>' +
            '</div>';
        header.innerHTML += buttonBox;
    }

    for (let i = 0; i < latestProduct.length; i++) {
        const item = product[latestProduct[i]];
        // Render product box data from template.js
        roller.innerHTML += loadProductBoxData(item, stringSize);
    }
}

function loadLatestProductFunction() {
    let downedX = 0;
    let originX = 0;
    let rollerX = 0;

    const header = document.querySelector("#product-header");
    const roller = document.querySelector("#product-roller");
    const body = document.querySelector("#product-body");
    const buttonLeft = header.querySelector(".product__button-left");
    const buttonRight = header.querySelector(".product__button-right");

    let min = 0;
    let max = -(roller.offsetWidth - body.offsetWidth);

    body.addEventListener("mousedown", downBody);
    body.addEventListener("mouseup", upBody);

    buttonLeft.addEventListener("click", function () {
        let size = roller.querySelector(".product-box").offsetWidth;
        rollerX += size;
        resizeRoller(1)
    });

    buttonRight.addEventListener("click", function () {
        let size = roller.querySelector(".product-box").offsetWidth;
        rollerX -= size;
        resizeRoller(-1)
    });

    function downBody(e) {
        e = e || window.event;
        downedX = e.clientX - roller.offsetLeft;
        originX = rollerX;
        roller.addEventListener("mousemove", dragRoller);
    }

    function upBody(e) {
        roller.removeEventListener("mousemove", dragRoller);
        body.removeEventListener("mouseleave", upBody);
        let uppedX = e.clientX - roller.offsetLeft;
        if (uppedX < downedX && uppedX - downedX < -30) {
            resizeRoller(-1);
        } else if (downedX < uppedX && downedX - uppedX < -30) {
            resizeRoller(1);
        } else {
            resizeRoller(0);
        }
        const boxes = roller.querySelectorAll(".product-box");
        for (let i = 0; i < boxes.length; i++) {
            const links = boxes[i].querySelectorAll("a");
            for (let i = 0; i < links.length; i++) {
                links[i].style.pointerEvents = "";
            }
        }
    }

    function dragRoller(e) {
        e = e || window.event;
        body.addEventListener("mouseleave", upBody);
        let movedX = e.clientX - roller.offsetLeft - downedX;
        rollerX = originX + movedX;
        if (rollerX < (min + 200) && rollerX > (max - 200)) {
            if (rollerX > min || rollerX < max) {
                roller.addEventListener("transitionend", endRollerTransition);
                roller.style.transition = "transform 800ms linear";
            }
            roller.style.transform = "translateX(" + rollerX + "px)";
        }
        const boxes = roller.querySelectorAll(".product-box");
        for (let i = 0; i < boxes.length; i++) {
            const links = boxes[i].querySelectorAll("a");
            for (let i = 0; i < links.length; i++) {
                links[i].style.pointerEvents = "none";
            }
        }
    }

    function resizeRoller(n) {
        let size = roller.querySelector(".product-box").offsetWidth;
        roller.addEventListener("transitionend", endRollerTransition);
        roller.style.transition = "transform 400ms linear";
        if (n < 0) {
            rollerX = rollerX > max ? Math.floor(rollerX / size) * size : max;
        } else if (n > 0) {
            rollerX = rollerX < min ? Math.ceil(rollerX / size) * size : min;
        } else {
            rollerX = Math.round(rollerX / size) * size;
        }
        roller.style.transform = "translateX(" + rollerX + "px)";
    }

    function endRollerTransition() {
        roller.style.transition = "";
        roller.removeEventListener("transitionend", endRollerTransition);
    }
}

// Block C : Phone by brands
function runBlockC() {

    // Render select form
    function loadSelectForm() {
        const filter = document.querySelector(".product__filter");
        let filterForm = '<form class="product__filter-form" action="">' +
            '<select class="product__filter-select" name="">';
        for (let i = 0; i < brandData.length; i++) {
            if (i == 0) {
                filterForm += '<option value="">All</option>';
            }
            filterForm += '<option value="' + brandData[i].name + '">' + brandData[i].name + '</option>';
        }
        filterForm += '</select>' +
            '</form>';
        filter.innerHTML = filterForm;
    }

    // Render product boxes
    function loadProductBox(brand) {
        const layout = document.querySelector(".product__layout");
        // Create array and add products to array by brand name
        let brandProduct = [];
        for (let i = 0; i < product.length && brandProduct.length < 10; i++) {
            if (brand == "") {
                brandProduct.push(product[i]);
            } else if (product[i].brand == brand) {
                brandProduct.push(product[i]);
            }
        }
        // Clear layout
        layout.innerHTML = "";
        // Create product box and append to layout
        for (let i = 0; i < brandProduct.length; i++) {
            const item = brandProduct[i];
            // Render product box data from template.js
            layout.innerHTML += loadProductBoxData(item, "");
        }
    }

    // Filter product by brand
    function filterByBrand() {
        const filterSelect = document.querySelector(".product__filter-select");

        filterSelect.addEventListener("change", changeBrand);

        function changeBrand(e) {
            e = e || window.event;
            const value = e.currentTarget.value;
            loadProductBox(value);
        }
    }

    loadSelectForm();
    loadProductBox("");
    filterByBrand();
}


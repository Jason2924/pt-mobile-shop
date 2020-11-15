window.onload = loadData();

function loadData() {
    loadMenuData();
    loadShopData();
    loadSocialData();
}

function loadMenuData() {
    const menuBox = document.querySelector(".header__menu");
    let result = '<ul class="header__menu-parent">';
    for (let i = 0; i < menu.length; i++) {
        const p = menu[i];
        result += createParentMenu(p);
    }
    result += '</ul>';
    menuBox.innerHTML = result;

    // Render parent menu
    function createParentMenu(p) {
        let result = '<li class="header__menu-parent-list">' +
            '<a class="header__menu-parent-link link link--color-white link--capitalize" href="' + p.link + '">' +
            '<span>' + p.name + '</span>';
        if (p.child != null) {
            result += '<i class="header__menu-parent-arrow fas fa-caret-down"></i>' +
                '</a>' +
                '<ul class="header__menu-child">' +
                '<div class="header__menu-child-box">';
            for (let i = 0; i < p.child.length; i++) {
                const c = p.child[i];
                result += createChildMenu(c);
            }
            result += '</div>' +
                '</ul>';
        }
        else {
            result += '</a>';
        }
        result += '</li>';
        return result;
    }

    // Render child menu
    function createChildMenu(c) {
        let result = '<li class="header__menu-child-list">' +
            '<a class="header__menu-child-link link link--capitalize" href="' + c.link + '">' +
            '<span>' + c.name + '</span>';
        if (c.child != null) {
            result += '<i class="header__menu-child-arrow fas fa-caret-right"></i>' +
                '</a>' +
                '<ul class="header__menu-grandchild">' +
                '<div class="header__menu-grandchild-box">';
            for (let i = 0; i < c.child.length; i++) {
                const g = c.child[i];
                result += createGrandMenu(g);
            }
            result += '</div>' +
                '</ul>';
        }
        else {
            result += '</a>';
        }
        result += '</li>';
        return result;
    }

    // Render grandchild menu
    function createGrandMenu(g) {
        let result = '<li class="header__menu-grandchild-list">' +
            '<a class="header__menu-grandchild-link link link--capitalize" href="' + g.link + '">' +
            '<span>' + g.name + '</span>' +
            '</a>' +
            '</li>';
        return result;
    }
}

function loadShopData() {
    const shopName = document.querySelectorAll(".shop-name");
    const shopLogo = document.querySelectorAll(".shop-logo");
    const shopAddress = document.querySelectorAll(".shop-address");
    const shopPhone = document.querySelectorAll(".shop-phone");
    const shopEmail = document.querySelectorAll(".shop-email");
    for (let i = 0; i < shopName.length; i++) {
        shopName[i].href = "index.html";
        shopName[i].innerText = shop.name;
    }
    for (let i = 0; i < shopLogo.length; i++) {
        shopLogo[i].src = shop.logo;
        shopLogo[i].alt = shop.name;
    }
    for (let i = 0; i < shopAddress.length; i++) {
        shopAddress[i].href = shop.address.link;
        shopAddress[i].innerText = shop.address.name;
    }
    for (let i = 0; i < shopPhone.length; i++) {
        shopPhone[i].href = "tel:" + shop.phone;
        shopPhone[i].innerText = shop.phone;
    }
    for (let i = 0; i < shopEmail.length; i++) {
        shopEmail[i].href = "emailto:" + shop.email;
        shopEmail[i].innerText = shop.email;
    }
}

function loadSocialData() {
    const socialFacebook = document.querySelectorAll(".social-facebook");
    const socialinterest = document.querySelectorAll(".social-pinterest");
    const socialTwitter = document.querySelectorAll(".social-twitter");
    const socialInstagram = document.querySelectorAll(".social-instagram");
    const socialYoutube = document.querySelectorAll(".social-youtube");
    for (let i = 0; i < socialFacebook.length; i++) {
        socialFacebook[i].href = social.facebook;
        socialFacebook[i].title = "Facebook";
        socialFacebook[i].innerHTML = '<i class="fab fa-facebook-f"></i>';
    }
    for (let i = 0; i < socialinterest.length; i++) {
        socialinterest[i].href = social.pinterest;
        socialinterest[i].title = "Pinterest";
        socialinterest[i].innerHTML = '<i class="fab fa-pinterest-p"></i>';
    }
    for (let i = 0; i < socialTwitter.length; i++) {
        socialTwitter[i].href = social.twitter;
        socialTwitter[i].title = "Twitter";
        socialTwitter[i].innerHTML = '<i class="fab fa-twitter"></i>';
    }
    for (let i = 0; i < socialInstagram.length; i++) {
        socialInstagram[i].href = social.instagram;
        socialInstagram[i].title = "Instagram";
        socialInstagram[i].innerHTML = '<i class="fab fa-instagram"></i>';
    }
    for (let i = 0; i < socialYoutube.length; i++) {
        socialYoutube[i].href = social.youtube;
        socialYoutube[i].title = "Youtube";
        socialYoutube[i].innerHTML = '<i class="fab fa-youtube"></i>';
    }
}

function loadProductBoxData(item, size) {
    let box = '<div class="product-box"' + size + '>' +
        '<div class="product-box__box">' +
        '<div class="product-box__information">';
    // Display label discount or has sold out
    if (item.quantity == 0 || item.discount != null) {
        let status = item.quantity == 0 ? "SOLD" : item.discount + "%";
        box += '<div class="product-box__status">' +
            '<span class="product-box__status-box text--color-white">' + status + '</span>' +
            '</div>';
    }
    box += '<div class="product-box__image">' +
        '<a draggable="false" href="#">' +
        '<img draggable="false" src="' + item.image + '" alt="' + item.name + '">' +
        '</a>' +
        '</div>' +
        '<div class="product-box__content">' +
        '<div>' +
        '<a draggable="false" class="product-box__link" href="#">' + item.name + '</a>' +
        '</div>' +
        '<div class="product-box__price">';
    // Get price by condition
    if (item.price != null) {
        if (item.discount == null) {
            box += '<span>' + item.price + '<span class="product-box__currency">USD</span></span>';
        } else {
            box += '<span>' + (item.price - (item.price * item.discount / 100)) + '<span class="product-box__currency">USD</span></span>' +
                '<small><del>' + item.price + '<span class="product-box__currency">USD</span></del></small>';
        }
    } else {
        box += '<span>Updating</span>';
    }
    box += "</div>";
    // Displey description
    if (item.description != null) {
        box += '<div class="product-box__description text-overflow text-overflow--two">' + item.description + '</div>';
    }
    box += '</div>' +
        '</div>' +
        '<div class="product-box__action">' +
        '<a draggable="false" class="product-box__action-link" href="#" title="View details">' +
        '<i class="fas fa-link"></i>' +
        '</a>';
    // Show add to cart button
    if (item.quantity > 0 && item.price != null) {
        box += '<a draggable="false" class="product-box__action-link" href="#" title="Add to cart">' +
            '<i class="fas fa-cart-plus"></i>' +
            '</a>';
    }
    box += '</div>' +
        '</div>' +
        '</div>';
    return box;
}
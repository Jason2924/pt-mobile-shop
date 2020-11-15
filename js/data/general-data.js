const shop = {
    name: "PT Mobile Shop",
    logo: "img/logo.png",
    address: {
        name: "220 Tran Hung Dao Street, Ward 10, District 5, Ho Chi Minh City",
        link: "#"
    },
    phone: "0908473268",
    email: "mobile-shop@gmail.com",
};

const social = {
    facebook: "#",
    pinterest: "#",
    twitter: "#",
    instagram: "#",
    youtube: "#",
}

const menu = [{
    name: "home",
    link: "index.html",
    child: null,
}, {
    name: "phones",
    link: "phones.html",
    child: null,
}, {
    name: "accessories",
    link: "accessories.html",
    child: [{
        name: "headphones",
        link: "headphones.html",
        child: null,
    }, {
        name: "chargers",
        link: "chargers.html",
        child: null,
    }, {
        name: "batteries",
        link: "batteries.html",
        child: null,
    }],
}, {
    name: "blogs",
    link: "javascript:;",
    child: [{
        name: "about us",
        link: "about.html",
        child: null,
    }, {
        name: "contact us",
        link: "contact.html",
        child: null,
    }, {
        name: "news",
        link: "news.html",
        child: [{
            name: "product reviews",
            link: "reviews.html",
            child: null,
        }, {
            name: "general knowledges",
            link: "knowledges.html",
            child: null,
        }],
    }],
}];
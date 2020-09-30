// Set stuff from config
function setConfig() {
    document.getElementById("userQuantity").value = defaultUserLength;
    document.getElementById("domainQuantity").value = defaultDomainLength;
    domains.forEach(addSelectOption);

    // Put buttons for local storage if enabled in the config
    if (activateLocalStorage) {
        document.getElementById("localStorageButtons").innerHTML = "<button onclick=\"saveDefaults()\">Save defaults</button> <button onclick=\"localStorage.clear()\">Remove local data</button>";
    }
}

// Add domains to drop down menu
function addSelectOption(item) {
    let x;
    let option;
    x = document.getElementById("domain")
    option = document.createElement("option");
    option.text = item;
    x.add(option);
    x.value = defaultDomain;
} 


// Code for copy button
let clipboard = new ClipboardJS(".btn");
clipboard.on('success', function(e) {
    console.log(e);
});
clipboard.on('error', function(e) {
    console.log(e);
});


// Save current form data to local storage
function saveDefaults() {
    // Get form values
    let userQuantity = document.getElementById("userQuantity").value;
    let domainQuantity = document.getElementById("domainQuantity").value;
    let domain = document.getElementById("domain").value;

    localStorage.setItem("userQuantity", userQuantity);
    localStorage.setItem("domainQuantity", domainQuantity);
    localStorage.setItem("defaultDomain", domain);
}

// Load defaults from local storage if exist
function loadDefaults() {
    if (!(localStorage.getItem("userQuantity") === null)) {
        let defaultDomain;
        let select;
        document.getElementById("userQuantity").value = localStorage.getItem("userQuantity");
        document.getElementById("domainQuantity").value = localStorage.getItem("domainQuantity");
        defaultDomain = localStorage.getItem("defaultDomain");
        if (domains.includes(defaultDomain) || defaultDomain === "random") {
            select = document.getElementById("domain");
            select.value = localStorage.getItem("defaultDomain");
        }
    }
}


// Return a random string of x length
function makeId(length) {
    let result           = '';
    let characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// Generate and return a new email address based on field values
function generateEmail() {
    // Get form values
    let userQuantity = document.getElementById("userQuantity").value;
    let domainQuantity = document.getElementById("domainQuantity").value;
    let domain = document.getElementById("domain").value;

    // Declare variables
    let userStr;
    let domainStr;
    let emailStr;


    // 
    // Create domain
    // 

    // Select a random domain if this is chosen
    if (domain === "random") {
        do {
            domain = domains[Math.floor(Math.random() * domains.length)];
        }
        while (excludeInRandomDomain.includes(domain))
    }

    // If domain does not support random sub domain or random domain length is 0
    if (noRandomSubDomains.includes(domain) || domainQuantity < 1) {
        domainStr = domain;
    }

    // If it does support random sub domain
    else {
        domainStr = makeId(domainQuantity) + "." + domain;
    }


    // 
    // Create user (the part before the @)
    // 

    //  If chosen domain requires a username
    if (domain in usernameDomains) {
        userStr = usernameDomains[domain] + "+" + makeId(userQuantity);
    }

    // If not, just use a random string as the username
    else {
        userStr = makeId(userQuantity);
    }


    // 
    // Assemble email address
    // 

    emailStr = userStr + "@" + domainStr;

    return emailStr;
}


// Generate new email and update page
function newAddress() {
    document.getElementById("email").innerHTML = generateEmail();
}

// Add domains to drop down menu
const addSelectOption = (item) => {
    const domainDropdown = document.getElementById('domain');
    const option = document.createElement('option');
    option.text = item;
    domainDropdown.add(option);
    domainDropdown.value = defaultDomain;
};

// Save current selected domain to local storage
const saveDefaults = () => {
    const domain = document.getElementById('domain').value;
    localStorage.setItem('defaultDomain', domain);
};

// Load defaults from local storage if exist
const loadDefaults = () => {
    const defaultDomain = localStorage.getItem('defaultDomain');
    if (domains.includes(defaultDomain) || defaultDomain === 'random') {
        document.getElementById('domain').value = defaultDomain;
    }
};

// Generate and return a new email address based on field values
const generateEmail = () => {
    // Get form domain
    let domain = document.getElementById('domain').value;

    // Select a random domain if this is chosen
    if (domain === 'random') {
        do {
            domain = domains[Math.floor(Math.random() * domains.length)];
        } while (excludeInRandomDomain.includes(domain));
    }

    // If selected domain requires a username/plus addressing
    let localpart;
    if (domain in plusAddressingDomains) {
        localpart = `${plusAddressingDomains[domain]}+${crypto.randomUUID()}`;
    } else {
        localpart = crypto.randomUUID();
    }

    return `${localpart}@${domain}`;
};

// Generate new email and update page
const newAddress = () =>
    (document.getElementById('email').textContent = generateEmail());

// Copy current email
const copyEmail = () =>
    navigator.clipboard.writeText(document.getElementById('email').textContent);

window.onload = () => {
    domains.forEach(addSelectOption);

    if (activateLocalStorage) {
        document.getElementById('localStorageButtons').innerHTML =
            '<button onclick="saveDefaults()">Save defaults</button><button onclick="localStorage.clear()">Remove local data</button>';
        loadDefaults();
    }

    newAddress();
};

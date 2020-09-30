// Put all your domains here
let domains = [
    "integer.com",
    "enim.net",
    "neque.dev",
    "volutpat.co.uk",
    "etiam.ac.us",
    "tincidunt.org",
]

// The default selected domain. Put "random" for default to random domain
let defaultDomain = "enim.net"

// Domains, that does not support sub domains
let noRandomSubDomains = [
    "tincidunt.org",
]

// Domains that must use a specific user name. Ie: twilight+xxxxxx@tincidunt.org
let usernameDomains = {
    "tincidunt.org": "twilight",
}

// Domains to be excluded from random domain
let excludeInRandomDomain = [
    "tincidunt.org",
]

// The default length of the random part before the @
let defaultUserLength = 20;

// The default length of the randomized sub domain
let defaultDomainLength = 20;

// Choose if the buttons to save to local storage should be available
let activateLocalStorage = true;

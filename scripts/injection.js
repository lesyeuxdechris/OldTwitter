let pages = [
    {
        name: "home",
        paths: ["/", "/home"],
        activeMenu: "home"
    },
    {
        name: "notifications",
        paths: ["/notifications", "/notifications/mentions"],
        activeMenu: "notifications"
    },
    {
        name: "settings",
        paths: ["/old/settings"]
    },
    {
        name: "search",
        paths: ["/search"]
    },
    {
        name: "bookmarks",
        paths: ["/i/bookmarks"],
        activeMenu: "pin-bookmarks"
    },
    {
        name: "lists",
        paths: [/^\/i\/lists\/\d+(\/members|\/followers|)$/]
    },
    {
        name: "topics",
        paths: [/^\/i\/topics\/\d+$/]
    },
    {
        name: "history",
        paths: ["/old/history"]
    },
    {
        name: "itl",
        paths: ["/i/timeline"]
    },
    {
        name: "tweet",
        paths: [/^\/[A-z-0-9-_]{1,15}\/status\/\d{2,32}(|\/likes|\/retweets|\/retweets\/with_comments|)$/]
    },
    {
        name: "profile",
        paths: [/^\/[A-z-0-9-_]{1,15}(\/with_replies|\/media|\/likes|\/following|\/followers|\/followers_you_follow|\/lists|)$/g],
        exclude: ["/home", "/notifications", "/messages", "/settings", "/explore", "/login", "/register", "/logout", "/search"]
    },
    {
        name: "unfollows",
        paths: ["/old/unfollows/followers", "/old/unfollows/following"]
    }
];

let realPath = location.pathname;
let hrefUrl = location.href;
if (realPath.endsWith("/") && realPath !== "/") {
    location.replace(realPath.slice(0, -1));
}
if(location.hash.startsWith('#!/')) {
    location.replace(location.hash.slice(2));
}
if(realPath === '/') {
    location.replace('/home');
}

if (realPath.startsWith("/i/user/")) {
    let id = realPath.split("/i/user/")[1];
    if (id.endsWith("/")) id = id.slice(0, -1);
    API.user.get(id, true).then(user => {
        if (user.error) {
            return;
        }
        location.replace("/" + user.screen_name);
    });
}
if (realPath === '/intent/user') {
    let id = location.search.split('user_id=')[1];
    API.user.get(id, true).then(user => {
        if (user.error) {
            return;
        }
        location.replace("/" + user.screen_name);
    });
}
if (realPath.startsWith('/i/web/status/')) {
    let id = location.pathname.split('/i/web/status/')[1];
    API.tweet.get(id).then(tweet => {
        if (tweet.error) {
            return;
        }
        location.replace("/" + tweet.user.screen_name + "/status/" + tweet.id_str);
    });
}
if(realPath.startsWith('/i/redirect')) {
    let search = new URLSearchParams(location.search);
    let url = search.get('url');
    location.replace(url);
}
if(/^\/direct_messages\/create\/[A-z-0-9-_]{1,15}$/.test(realPath)) {
    location.href = `https://twitter.com/${realPath.split("/direct_messages/create/")[1]}#dm`;
}
if(/^\/hashtag\/(.*?)/.test(realPath)) {
    let hashtag = realPath.split("/hashtag/").slice(1).join("/hashtag/");
    location.replace(`https://twitter.com/search?q=%23${hashtag}`);
}
if(/^\/[A-z-0-9-_]{1,15}\/status\/\d{5,32}\/(photo|video)\/\d+$/.test(realPath)) {
    let path = realPath.split("/photo/")[0].split("/video/")[0];
    location.replace(path);
}
if(realPath === '/messages') {
    location.replace('/home#dm');
}
if(realPath === '/compose/tweet') {
    location.replace('/home');
}
if(realPath === '/intent/tweet' || realPath === '/share') {
    location.replace('/home#' + location.search);
}
if(realPath === '/intent/follow') {
    let screen_name = location.search.split('screen_name=')[1].split('&')[0];
    location.replace(`/${screen_name}`);
}
if (
    !hrefUrl.includes('newtwitter=true') &&
    (
        realPath.startsWith('/i/flow/') ||
        realPath.startsWith('/i/premium_sign_up/') ||
        realPath.startsWith('/i/events/') ||
        realPath.startsWith('/i/spaces/') ||
        realPath.startsWith('/i/oauth2') ||
        realPath.startsWith('/account') ||
        realPath.startsWith('/settings') ||
        /^\/[A-z-0-9-_]{1,15}\/status\/\d{5,32}\/analytics$/.test(realPath)
    )
) {
    let url = new URL(hrefUrl)
    url.searchParams.set('newtwitter', 'true');
    location.replace(url);
}
const LANGUAGES = ["en", "ru", "uk", "fr", "pt_BR", "es", "el", "ro", "tl", "lv", "he", "ne", "nl", "ja", "tr", "it", "ar", "th", "ko", "pl", "vi", "zh_CN", "zh_TW", "cs", "de", "ca", "sv", "bg"];
const TRANSLATORS = {
    "ru": ["dimden", "https://dimden.dev/"],
    "uk": ["dimden", "https://dimden.dev/"],
    "fr": [
        ["Aurore C.", "https://asuure.com/"],
        ["zdimension", "https://twitter.com/zdimension_"],
        ["Pikatchoum", "https://twitter.com/applitom45"],
        ["adriend", "https://twitter.com/_adriend_"]
    ],
    "pt_BR": [
        ["kigi", "https://twitter.com/kigidere"],
        ["guko", "https://twitter.com/gukodev"]
    ],
    "es": [
        ["Ruchi", "https://twitter.com/anbulansia"],
        ["gaelcoral", "https://twitter.com/gaelcoral"],
        ["hue", "https://twitter.com/huey1116"],
        ["elderreka", "https://twitter.com/elderreka"]
    ],
    "el": ["VasilisTheChu", "https://pikachu.systems/"],
    "ro": [
        ["Skyrina", "https://skyrina.dev/"],
        ["AlexSem", "https://twitter.com/AlexSem5399"]
    ],
    "tl": ["Eurasian", "https://twitter.com/NotPROxV"],
    "lv": ["yourfriend", "https://3.141.lv/"],
    "he": [
        ["ugh"],
        ["kriterin", "https://twitter.com/kriterin"]
    ],
    "ne": ["DimeDead", "https://dimedead.neocities.org/"],
    "nl": ["Puka1611"],
    "ja": [
        ["Chazuru", "https://twitter.com/AIWMD"],
        ["Nyankodasu", "https://github.com/Nyankodasu"]
    ],
    "tr": [
        ["KayrabCebll", "https://steamcommunity.com/id/KayrabCebll"],
        ["YordemEren", "https://twitter.com/YordemEren"]
    ],
    "it": [
        ["krek", "https://twitter.com/CactusInc420"],
        ["Francesco", "https://twitter.com/FrancescoRosi27"]
    ],
    "ar": ["Yours Truly,", "https://twitter.com/schrotheneko"],
    "th": ["0.21%BloodAlcohol", "https://github.com/Silberweich"],
    "ko": [
        ["Nyankodasu", "https://github.com/Nyankodasu"],
        ["한예림", "https://twitter.com/han_eirin"]
    ],
    "pl": [
        ["lele"],
        ["nomi", "https://twitter.com/nomisigns"]
    ],
    "vi": ["btmxh", "https://github.com/btmxh"],
    "zh_CN": [
        ["am1006", "https://github.com/am1006"],
        ["CarimoWuling", "https://twitter.com/carimowuling"]
    ],
    "zh_TW": [
        ["olivertzeng", "https://twitter.com/olivertzeng"],
        ["cirx1e", "https://github.com/cirx1e"]
    ],
    "cs": ["Menal"],
    "de": ["basti564", "https://twitter.com/basti564"],
    "ca": ["elmees21", "https://twitter.com/elmees21"],
    "sv": ["actuallyaridan", "https://twitter.com/actuallyaridan"],
    "bg": ["Scarlett7447", "https://twitter.com/Scarlett7447"],
};
let LOC = {};
let LOC_EN = {};

if(!LANGUAGES.includes(LANGUAGE)) {
    LANGUAGE = LANGUAGE.split("_")[0];
    if(!LANGUAGES.includes(LANGUAGE)) {
        LANGUAGE = "en";
    }
}

function isDark() {
    if(vars.systemDarkMode) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    let date = new Date();
    let hours = date.getHours();
    return hours < 9 || hours >= 19;
}
let customCSS, profileCSS = false;

async function openDatabase() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("CustomCSSDatabase", 1);

        request.onerror = function(event) {
            reject('Database error: ' + event.target.errorCode);
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        // Only runs if the database was just created (like on first run)
        request.onupgradeneeded = function(event) {
            let db = event.target.result;
            db.createObjectStore("cssStore", { keyPath: "id" });
        };
    });
}

async function readCSSFromDB() {
    let db = await openDatabase();
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(["cssStore"]);
        let objectStore = transaction.objectStore("cssStore");
        let request = objectStore.get("customCSS");

        request.onerror = function(event) {
            reject("Error reading CSS");
        };

        request.onsuccess = function(event) {
            if (request.result) {
                resolve(request.result.css);
            } else {
                resolve('');
            }
        };
    });
}

async function writeCSSToDB(cssData) {
    let db = await openDatabase();
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(["cssStore"], "readwrite");
        let store = transaction.objectStore("cssStore");
        let request = store.put({ id: "customCSS", css: cssData });

        request.onerror = function(event) {
            reject("Error writing CSS to DB");
        };

        request.onsuccess = function(event) {
            resolve();
        };
    });
}

async function updateCustomCSS() {
    let data = await new Promise(resolve => {
        chrome.storage.sync.get(['customCSS'], data => {
            resolve(data);
        });
    });

    if(data.customCSS) {
        writeCSSToDB(data.customCSS)
        chrome.storage.sync.remove('customCSS');
    }
    data.customCSS = await readCSSFromDB();
    
    if(profileCSS) return;
    
    if(customCSS) customCSS.remove();
    
    customCSS = document.createElement('style');
    customCSS.id = 'oldtwitter-custom-css';
    customCSS.innerHTML = data.customCSS;
    
    if(document.head) {
        document.head.appendChild(customCSS);
    } else {
        let int = setInterval(() => {
            if(document.head) {
                clearInterval(int);
                document.head.appendChild(customCSS);
            }
        }, 100);
    }
}

async function updateCustomCSSVariables() {
    let root = document.querySelector(":root");
    let data = await new Promise(resolve => {
        chrome.storage.sync.get(['customCSSVariables'], data => {
            resolve(data);
        });
    });
    root.style.setProperty('--font', vars.font);
    root.style.setProperty('--tweet-font', vars.tweetFont);
    if(vars.modernUI){
        root.style.setProperty('--icon-font', `"edgeicons", "RosettaIcons"`);
    }
    if(data.customCSSVariables) {
        let csv = parseVariables(data.customCSSVariables);
        for(let i in csv) {
            root.style.setProperty(i, csv[i]);
        }
    }
}

function getThemeVariables(enabled) {
    let theme;
    if(enabled) {
        if(vars.pitchBlack) {
            // Pitch black theme
            theme = `
                --background-color: #000000;
                --dark-background-color: #000000;
                --darker-background-color: #000000;
                --almost-black: #d4e3ed;
                --border: #222222;
                --darker-gray: #c9c9c9;
                --lil-darker-gray: #8394a1;
                --light-gray: #8394a1;
                --default-text-color: white;
                --new-tweet-over: rgb(0 0 0 / 92%);
                --input-background: #090a0a;
                --active-message: #0c0d0e;
                --more-color: #a088ff;
                --choice-bg: rgb(25 28 30);
                --list-actions-bg: #19212b;
                --menu-bg: rgb(16 19 22 / 98%);
            `;
        } else {
            // Dark theme
            theme = `
                --background-color: #1b2836;
                --dark-background-color: #171f2a;
                --darker-background-color: #141d26;
                --almost-black: #d4e3ed;
            `;
            if(vars.modernUI){  //2018 Style
                theme += `--border: #141d26;`
            } else {            //2015 Style
                theme += `--border: #2c3c52;`
            }
            theme += `
                --darker-gray: #c9c9c9;
                --lil-darker-gray: #8394a1;
                --light-gray: #8394a1;
                --default-text-color: white;
                --new-tweet-over: rgba(27, 40, 54, 0.92);
                --input-background: #15202a;
                --active-message: #141d26;
                --more-color: #a088ff;
                --choice-bg: rgb(44 62 71);
                --list-actions-bg: #19212b;
                --menu-bg: rgba(34,46,60,0.98);
            `
        }
    } else {
        // Light theme
        theme = `
            --background-color: white;
            --dark-background-color: #f5f8fa;
            `;
        if(vars.modernUI){  //2018 Style
            theme += `--darker-background-color: #e1e8ed;`
        } else {            //2015 Style
            theme += `--darker-background-color: #f5f8fa;`
        }
            theme += `
            --almost-black: #292f33;
            --border: #e1e8ed;
            --darker-gray: #66757f;
            --lil-darker-gray: #6a7d8c;
            --light-gray: #8899a6;
            --default-text-color: black;
            --new-tweet-over: rgba(255, 255, 255, 0.92);
            --input-background: white;
            --active-message: #ebf7ff;
            --more-color: #30F;
            --choice-bg: rgb(207, 217, 222);
            --list-actions-bg: #efefef;
            --menu-bg: rgba(255,255,255,0.98);
        `;
    }

    return theme;
}
function parseVariables(vars) {
    let obj = {};
    let styles = vars.split('\n').map(i => i.trim()).filter(i => i).map(i => i.split(':')).filter(i => i.length === 2);
    styles.forEach(style => {
        if(style[1].endsWith(";")) style[1] = style[1].slice(0, -1);
        obj[style[0].trim()] = style[1].trim();
    });
    return obj;
}

async function switchDarkMode(enabled) {
    let root = document.querySelector(":root");
    let theme = getThemeVariables(enabled);
    let themeVars = parseVariables(theme);
    for(let i in themeVars) {
        root.style.setProperty(i, themeVars[i]);
    }
    await updateCustomCSSVariables();

    if(document.body) {
        document.body.classList.toggle('body-dark', enabled);
        document.body.classList.toggle('body-pitch-black', enabled && vars.pitchBlack);        
        document.body.classList.toggle('body-light', !enabled);
    } else {
        let int = setInterval(() => {
            if(document.body) {
                clearInterval(int);
                document.body.classList.toggle('body-dark', enabled);
                document.body.classList.toggle('body-pitch-black', enabled && vars.pitchBlack);        
                document.body.classList.toggle('body-light', !enabled);
            }
        }, 100);
    }
}

let page = realPath === "" ? pages[0] : pages.find(p => (!p.exclude || !p.exclude.includes(realPath)) && (p.paths.includes(realPath) || p.paths.find(r => r instanceof RegExp && r.test(realPath))));
(async () => {
    if (!page) return;

    // wait for variables
    if(!vars) {
        await varsPromise;
    }
    if(vars.darkMode || (vars.timeMode && isDark())) {
        isDarkModeEnabled = true;
        switchDarkMode(true);
    }
    if(vars.systemDarkMode) {
        var matchMediaDark = window.matchMedia('(prefers-color-scheme: dark)');
        var matchMediaLight = window.matchMedia('(prefers-color-scheme: light)');

        matchMediaDark.addEventListener('change', e => {
            if(e.matches && vars.systemDarkMode) {
                switchDarkMode(true);
            }
        });
        matchMediaLight.addEventListener('change', e => {
            if(e.matches && vars.systemDarkMode) {
                switchDarkMode(false);
            }
        });
    }
    
    // disable twitters service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (const registration of registrations) {
                registration.unregister()
            }
        });
        // clear cache of service worker
        if(window.caches) window.caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    return window.caches.delete(key);
                }),
            );
        });
    }

    // default variables
    if(typeof(vars.darkMode) !== 'boolean' && document.body) {
        let bg = document.body.style.backgroundColor;
        let isDark = bg === 'rgb(21, 32, 43)' || bg === 'rgb(0, 0, 0)';
        vars.darkMode = isDark;
        chrome.storage.sync.set({
            darkMode: isDark
        }, () => {});
        let pitchBlack = bg === 'rgb(0, 0, 0)';
        vars.pitchBlack = pitchBlack;
        chrome.storage.sync.set({
            pitchBlack: pitchBlack
        }, () => {});
    }
    if(!vars.displaySensitiveContentMoved) {
        API.account.getSettings().then(settings => {
            vars.displaySensitiveContent = settings.display_sensitive_media;
            chrome.storage.sync.set({
                displaySensitiveContentMoved: true,
                displaySensitiveContent: settings.display_sensitive_media
            }, () => {});
        });
    }
    if(typeof(vars.language) !== 'string') {
        chrome.storage.sync.set({
            language: LANGUAGE
        }, () => {});
    } else {
        LANGUAGE = LANGUAGES.includes(vars.language) ? vars.language : "en";
    }

    let [LOC_DATA, LOC_EN_DATA, html, css, header_html, header_css] = await Promise.all([
        fetch(chrome.runtime.getURL(`_locales/${LANGUAGE}/messages.json`)).then(response => response.json()),
        fetch(chrome.runtime.getURL(`_locales/en/messages.json`)).then(response => response.json()),
        fetch(chrome.runtime.getURL(`layouts/${page.name}/index.html`)).then(response => response.text()),
        fetch(chrome.runtime.getURL(`layouts/${page.name}/style.css`)).then(response => response.text()),
        fetch(chrome.runtime.getURL(`layouts/header/index.html`)).then(response => response.text()),
        fetch(chrome.runtime.getURL(`layouts/header/style.css`)).then(response => response.text())
    ]);
    LOC = LOC_DATA; LOC_EN = LOC_EN_DATA;
    LOC_EN.extension_id = {message: chrome.runtime.id};

    // internationalization
    for(let i in LOC_EN) {
        if(!LOC[i]) {
            LOC[i] = LOC_EN[i];
        }
    }
    let msgs = html.match(/__MSG_(\w+)__/g);
    if (msgs) {
        for (let i = 0; i < msgs.length; i++) {
            let m = msgs[i].slice(6, -2);
            if(LOC[m]) html = replaceAll(html, msgs[i], LOC[m].message);
        }
    }
    msgs = header_html.match(/__MSG_(\w+)__/g);
    if (msgs) {
        for (let i = 0; i < msgs.length; i++) {
            let m = msgs[i].slice(6, -2);
            if(LOC[m]) header_html = replaceAll(header_html, msgs[i], LOC[m].message);
        }
    }

    let body = document.querySelector('body[style^="background"]');
    if(body) {
        body.remove();
    } else {
        let cleared = false;
        let removeInt = setInterval(() => {
            let body = document.querySelector('body[style^="background"]');
            if(body) {
                clearInterval(removeInt);
                cleared = true;
                body.remove();
            };
        }, 25);
        setTimeout(() => {
            if(!cleared) clearInterval(removeInt);
        }, 5000);
    };

    if(vars.extensionCompatibilityMode) {
        html = html.replace("fake-react-root", "react-root");
    }

    document.documentElement.innerHTML = html;
    document.body.classList.add('body-old-ui');

    blockingObserver.disconnect();

    document.getElementsByTagName('header')[0].innerHTML = header_html;
    if (page.activeMenu) {
        let el = document.getElementById(page.activeMenu);
        el.classList.add("menu-active");
    }
    let version = document.getElementById('oldtwitter-version');
    if (version) {
        version.innerText = chrome.runtime.getManifest().version;
    }
    let version2 = document.getElementById('oldtwitter-version-left');
    if (version2) {
        version2.innerText = chrome.runtime.getManifest().version;
    }

    let style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
    let header_style = document.createElement("style");
    header_style.innerHTML = header_css;
    document.head.appendChild(header_style);

    let icon = document.createElement("link");
    icon.href = chrome.runtime.getURL(`images/logo32${vars.useNewIcon ? '_new' : ''}.png`);
    icon.rel = "icon";
    icon.id = "site-icon";
    document.head.appendChild(icon);

    history.scrollRestoration = 'manual';

    chrome.runtime.sendMessage({
        action: "inject",
        data: [
            "libraries/twemoji.min.js",
            (page.name === 'settings' ? 'libraries/parseCssColor.js' : ''),
            (page.name === 'settings' ? 'libraries/coloris.min.js' : ''),
            "libraries/twitter-text.js",
            "layouts/header/script.js",
            `layouts/${page.name}/script.js`,
            "scripts/tweetviewer.js",
            "libraries/gif.js",
            "libraries/viewer.min.js",
            "libraries/custom-elements.min.js",
            "libraries/emojipicker.js",
            "libraries/tinytoast.js",
            "libraries/iframeNavigation.js",
        ].filter(i => i)
    });
})();


function getFirstEmoji(str) {
    const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
    const match = str.match(emojiRegex);
    return match ? match[0] : null;
}

function emojifyFavicon() {
    console.log("Emojifying....");
    const emoji = getFirstEmoji(document.title);

    // No emoji in the title, nothing to do.
    if (!emoji) {
        return;
    }
    console.log("🔄 Favmoji extension: Setting favicon to ", emoji);
    // Create a new favicon link.
    const faviconURL = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

    const favicon = document.createElement("link");
    favicon.setAttribute("rel", "icon");
    favicon.type = "image/x-icon";
    favicon.href = faviconURL;

    // Remove existing favicon links.
    const links = document.head.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
    if (links[i].getAttribute("rel").match(/^(shortcut )?icon$/i)) {
        document.head.removeChild(links[i]);
    }
    }

    // Append the new favicon.
    document.head.appendChild(favicon);
}

// Set up observer for 
new MutationObserver(function(mutations) {
    console.log(mutations[0].target.nodeValue);
    emojifyFavicon();
}).observe(
    document.querySelector('title'),
    { subtree: true, characterData: true, childList: true }
);

emojifyFavicon();


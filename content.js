
// Get the first emoji from a string, accounting for ZWJ, modifiers, and flags.
function getFirstEmoji(str) {
    const modifiers = '(\\p{EMod}+|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})';
    const optionalModifiers = modifiers + '?';
    const pieces = [
        // Regional Indicator Symbol (flags)
        "\\p{RI}\\p{RI}",
        // Emoji_Presentation excludes numerals, so modifiers are optional
        "\\p{Emoji_Presentation}" + optionalModifiers + "(\\p{Join_Control}\\p{Emoji}" + optionalModifiers + ")*",
        // Emoji includes numerals, so only allow those if they are followed by modifiers
        // to avoid counting "2" as an emoji
        "\\p{Emoji}" + modifiers,
    ]
    const regexpUnicodeModified = new RegExp(pieces.join("|"), "gu");
    const match = str.match(regexpUnicodeModified);

    return match ?  match[0] : "";
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


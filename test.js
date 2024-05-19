
// Get the first emoji from a string, accounting for ZWJ, modifiers, and flags.
// NB: this is copy-pasted from content.js to avoid bothering with imports
function getFirstEmoji(str) {
    const modifiers = '(\\p{EMod}+|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?';
    const pieces = [
        // Regional Indicator Symbol (flags)
        "\\p{RI}\\p{RI}",
        // Emoji character + ZWJ
        "\\p{Emoji}" + modifiers + "(\\u{200D}\\p{Emoji}" + modifiers + ")+",
        // Emoji character w/o ZWJ
        "\\p{Emoji}" + modifiers,
    ]
    const regexpUnicodeModified = new RegExp(pieces.join("|"), "gu");
    const match = str.match(regexpUnicodeModified);

    return match ?  match[0] : "";
}

const tests = [
    ["Hello", ""],
    ["Hello 🌎", "🌎"],
    ["Hello 🌎🌍🌏", "🌎"],
    // duplicate
    ["Hello 😁😁", "😁"],
    // ZWJ
    ["👨‍👩‍👧‍👦 ZWJ Example #1", "👨‍👩‍👧‍👦"],
    // Skin tone
    ["👍🏿 Skin Tone Example #1", "👍🏿"],
    // Flag
    ["🇺🇸 Flag Example #1", "🇺🇸"],
    ["🏴󠁧󠁢󠁥󠁮󠁧󠁿 Flag Example #2", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"],
    // Keycap
    ["1️⃣ Keycap Example #1", "1️⃣"],
    ["⚖️ Scales Example #1", "⚖️"],
    ["🚀 rocket", "🚀"],
]

for (let i = 0; i < tests.length; i++) {
    const [input, want] = tests[i];
    const got = getFirstEmoji(input);
    const result = got === want ? "✅ PASS" : "🛑 FAIL";
    console.log(`${result} "${input}" -> "${want}": ${got}`);
}
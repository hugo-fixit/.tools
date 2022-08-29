// ==UserScript==
// @name         code-type-map-fetcher
// @namespace    https://github.com/hugo-fixit/.tools
// @version      0.2
// @description  Get code-type-map from the list of Chroma highlighting languages
// @author       Lruihao (https://lruihao.cn)
// @match        https://gohugo.io/content-management/syntax-highlighting/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gohugo.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const container = document.querySelector('dl');
    const codes = container.querySelectorAll('dd');
    const types = container.querySelectorAll('dt');
    const codeTypeMap = {};

    // Fetch origin map and Split duplicate code
    for (let i = 0; i < codes.length; i++) {
        const code = codes[i].innerText.replace(/([+.#])/g,'\\$1');
        const type = types[i].innerText;
        if (!code) {
            continue;
        }
        if (code.includes(', ')) {
            const codeSplit = code.split(', ');
            for (const c of codeSplit) {
                codeTypeMap[c] = type;
            }
            continue;
        }
        codeTypeMap[code] = type;
    }

    // Print and cope to _maps/_code-type.scss
    console.log(JSON.stringify(codeTypeMap));
})();

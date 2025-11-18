// ==UserScript==
// @name         JavDB Custom Enhancement
// @namespace    https://github.com/lmly9193/userscripts
// @version      1.0.1
// @author       lmly9193
// @description  增加該網站的自訂義功能
// @license      MIT
// @icon         https://javdb.com/favicon-32x32.png
// @match        https://javdb.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/lmly9193/userscripts/main/custom-enhancement.user.js
// @updateURL    https://raw.githubusercontent.com/lmly9193/userscripts/main/custom-enhancement.user.js
// ==/UserScript==

(function () {
    'use strict';

    function createMovieLinksPanel(query) {
        const panelBlock = document.createElement('div');
        panelBlock.className = 'panel-block';
        panelBlock.innerHTML = `
            <div class="columns">
                <div class="column">
                    <div class="buttons are-small review-buttons">
                        <a class="button is-warning is-outlined" href="es://${query}">在電腦搜尋</a>
                    </div>
                </div>
            </div>`;
        return panelBlock;
    }

    function createSearchAllButtonColumn(query) {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'column';
        columnDiv.innerHTML = `<p><a class="button is-warning" style="display: block" href="es://regex%3A${encodeURIComponent(query)}">在電腦搜尋全部</a></p>`;
        return columnDiv;
    }

    /**
     * Entry Point
     */
    const pathname = location.pathname;

    // https://example.com/v/*
    if (pathname.startsWith('/v/')) {
        const cpElement = document.querySelector('.copy-to-clipboard');
        const vid = cpElement?.dataset.clipboardText ?? null;
        const moviePanelInfo = document.querySelector('.movie-panel-info');
        if (vid && moviePanelInfo) {
            const newPanel = createMovieLinksPanel(vid);
            moviePanelInfo.appendChild(newPanel);
        }
        return;
    }

    // https://example.com/actors/*
    if (pathname.startsWith('/actors/')) {
        const els = document.querySelectorAll('.movie-list .video-title > strong');
        const uids = Array.from(els).map(el => el.textContent);
        const query = uids.join('|');
        const sectionAddition = document.querySelector('.section-addition');
        if (sectionAddition) {
            const columns = sectionAddition.closest('.columns');
            const newColumn = createSearchAllButtonColumn(query);
            columns.appendChild(newColumn);
        }
        return;
    }

})();

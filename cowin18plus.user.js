// ==UserScript==
// @name         CoWin: Hide all 45+ vaccination sites. Only show 18+
// @namespace    http://www.jacobsingh.name/show-only-18-appointments-in-cowin-indian-vaccination-registration-site
// @version      0.1
// @description  Hide all 45+ vaccination sites. Only show 18+
// @author       You
// @match        https://www.cowin.gov.in/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Probably could remove this, but it makes the element mutation finder code easier.
    var $ = jQuery;

    function onElementInserted(containerSelector, elementSelector, callback) {

    var onMutationsObserved = function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                var elements = $(mutation.addedNodes).find(elementSelector);
                for (var i = 0, len = elements.length; i < len; i++) {
                    callback(elements[i]);
                }
            }
        });
    };

    var target = $(containerSelector)[0];
    var config = { childList: true, subtree: true };
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(onMutationsObserved);
    observer.observe(target, config);

}

onElementInserted('body', '.age-limit', function(element) {
    if (element.innerText != "Age 18+") { element.closest('div.row').style.display = "none"}
});

})();

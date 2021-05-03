// ==UserScript==
// @name         CoWin: Hide all 45+ vaccination sites. Only show 18+
// @namespace    http://www.jacobsingh.name/show-only-18-appointments-in-cowin-indian-vaccination-registration-site
// @version      0.1
// @description  Hide all 45+ vaccination sites. Only show 18+
// @author       You
// @match        https://www.cowin.gov.in/*
// @match        https://selfregistration.cowin.gov.in/appointment
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
    if (element.innerText != "Age 18+") {
        console.log('hiding');
        if(element.closest('div.row')) {
            element.closest('div.row').style.display = "none";
        }
        console.log(element.closest('div.mat-list-item'));
        // for the authenticated list which uses different HTML
        element.closest('div.mat-list-item-content').parentNode.style.display = "none";
    }
});

})();

// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function savePage(url, description) {
  chrome.storage.local.get(['urls'], function(object) {
    let urls = object.urls || {};
    urls[url] = description;
    chrome.storage.local.set({urls: urls});
  })
}

let D_KEY = 68;
document.body.addEventListener('keydown', (e) => {
    if (e.keyCode == D_KEY && e.shiftKey && e.altKey) {
      let description = prompt(document.location.href, document.title);
      if (description) {
        savePage(document.location.href, description);
      }
    }
  }
);

document.body.addEventListener('click', (e) => {
  if (e.shiftKey && e.altKey) {
    e.preventDefault();
    e.stopPropagation();
    let a_element = e.target.closest('a');
    let description = prompt(a_element.href, a_element.innerHTML);
    if (description) {
      savePage(a_element.href, description);
    }
    // TODO send this to the popup
    // TODO open popup (don't think I can for chrome.. but I could make some other popup thing.. like bearings..)
  } else if (e.metaKey && e.altKey) {
    e.preventDefault();
    e.stopPropagation();
    let a_element = e.target.closest('a');
    savePage(a_element.href, a_element.innerHTML);
  }
}, true);

// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function displayUrls() {
  chrome.storage.local.get(['urls'], function(object) {
    let pageList = document.getElementById('displayUrls');
    let workflowy_text = "";
    if (object.urls) {
      Object.keys(object.urls).forEach(key => {
          workflowy_text += key + '\n';
          let desc = object.urls[key];
          if (desc.length > 0) {
            workflowy_text += '\t' + object.urls[key] + '\n';
          }
      });
    }
    document.getElementById('workflowy_text').value = workflowy_text;
  });
}

displayUrls();

document.getElementById('clearList').onclick = function() {
  chrome.storage.local.clear();
}

'use strict';

(function (self) {
    var ports = new Set();
    self.onconnect = function (e) {
        if ((e === null || e === void 0 ? void 0 : e.source) && e.source instanceof MessagePort) {
            var port = e.source;
            ports.add(port);
            port.addEventListener('message', function (ev) {
                var data = ev.data;
                ports.forEach(function (p) {
                    p.postMessage(data);
                });
            }, false);
            port.start();
        }
    };
    self.onerror = function (e) {
        console.error(e);
    };
})(self);
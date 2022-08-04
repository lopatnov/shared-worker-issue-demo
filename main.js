function makeBlobSharedWorker(text) {
  var blob;
  try {
    blob = new Blob([text], { type: "application/javascript" });
  } catch (e) {
    // Backwards-compatibility
    let blobBuilderClass =
      BlobBuilder ||
      WebKitBlobBuilder ||
      MozBlobBuilder;
    let blobBuilder = new blobBuilderClass();
    blobBuilder.append(text);
    blob = blobBuilder.getBlob();
  }
  const url = window.URL || window.webkitURL;
  const blobUrl = url.createObjectURL(blob);
  worker = new SharedWorker(blobUrl);
  return worker;
}

$(function () {
  $.get("./worker-sample.js", function (workerText) {
    $("#workerText").val(workerText);
    M.textareaAutoResize($('#workerText'));
    $("label[for='workerText']").addClass("active");
  });

  $("#executeWorker").click(function () {
    var workerText = $("#workerText").val();
    var worker = makeBlobSharedWorker(workerText);
    worker.port.start();
    worker.port.onmessage = function(e) {
      console.log('Received from Shared Worker:', e);
      $("#messages").append(JSON.stringify(e.data));
    }
    var number = Math.floor(Math.random() * 10000);
    var msg = `Random number: ${number}`;
    console.log('Sending message:', msg);
    worker.port.postMessage(msg);
  });
});

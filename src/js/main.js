/* Quagga.js */

var _scannerIsRunning = false;
var _cam = document.querySelector('#scanner-container');
var _scanSucceeded = false;

function cam() {
	if (_scannerIsRunning) {
		_scannerIsRunning = false;
		_scanSucceeded = false;
		Quagga.stop();
	} else {
		_scannerIsRunning = true;
		startScanner();
	}
}

function startScanner() {
	Quagga.init({
		inputStream: {
			name: "Live",
			type: "LiveStream",
			target: _cam,
			constraints: {
				width: 1280,
				height: 720,
				facingMode: "environment"
			},
		},
		decoder: {
			readers: [
				"code_128_reader"
			],
			debug: {
				showCanvas: true,
				showPatches: true,
				showFoundPatches: true,
				showSkeleton: true,
				showLabels: true,
				showPatchLabels: true,
				showRemainingPatchLabels: true,
				boxFromPatches: {
					showTransformed: true,
					showTransformedBox: true,
					showBB: true
				}
			}
		},

	}, function (err) {
		if (err) {
			console.log(err);
			return
		}

		Quagga.start();
		_scannerIsRunning = true;
	});

	Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;

		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "#ffffff", lineWidth: 2 });
				});
			}

			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#ffffff", lineWidth: 2 });
			}

			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: '#ffffff', lineWidth: 3 });
			}
		}
	});

	Quagga.onDetected(function (result) {
		if (!_scanSucceeded) {
			alert("바코드 인식 완료!");
		}
		_scanSucceeded = true;
		UDTbarcode.barcode.value = result.codeResult.code;
	});
}
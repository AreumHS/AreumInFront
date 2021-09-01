/* Disabling Enter */

window.addEventListener('keydown', function (e) {
	if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
		if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
			e.preventDefault(); return false;
		}
	}
}, true);

/* Quagga.js */

var _scannerIsRunning = false;
var _cam = document.querySelector('#scanner-container');
var _scanSucceeded = false;

function cam() {
	if (_scannerIsRunning) {
		_scannerIsRunning = false;
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
		uma.barcode.value = result.codeResult.code;
	});
}

var page = 0;

function render() {
	if (page == 0) {
		document.getElementById('list1').style.display = 'flex';
		document.getElementById('list2').style.display = 'none';
		document.getElementById('list3').style.display = 'none';
		document.getElementById('list4').style.display = 'none';
	}

	if (page == 1) {
		document.getElementById('list1').style.display = 'none';
		document.getElementById('list2').style.display = 'flex';
		document.getElementById('list3').style.display = 'none';
		document.getElementById('list4').style.display = 'none';
	}

	if (page == 2) {
		document.getElementById('list1').style.display = 'none';
		document.getElementById('list2').style.display = 'none';
		document.getElementById('list3').style.display = 'flex';
		document.getElementById('list4').style.display = 'none';
	}

	if (page == 3) {
		document.getElementById('list1').style.display = 'none';
		document.getElementById('list2').style.display = 'none';
		document.getElementById('list3').style.display = 'none';
		document.getElementById('list4').style.display = 'flex';
	}
}

function next() {
	page++;
	if (page == 4) page = 0;
	render();
}

function prev() {
	page--;
	if (page == -1) page = 3;
	render();
}

function debug() {
	console.log(uma.chkcode.value);
	console.log(uma.barcode.value);
	console.log(uma.id.value);
	console.log(uma.email.value);
	console.log(uma.pw.value);
	console.log(uma.pw2.value);
	console.log(uma.pid.value);
	console.log(uma.name.value);
}
/*
1 엉클
2 훠쿵 x
3 오지
4 얌샘
5 불쌈
6 떡불
7 도노
8 스카 x
*/

var udt = false;
var xypos = [
	[36.51299, 127.24517],
	[36.51185, 127.24884],
	[36.51221, 127.24930],
	[36.51175, 127.24313],
	[36.51212, 127.24307],
	[36.51199, 127.24957],
	[36.51226, 127.24889],
	[36.51225, 127.24884],
	[36.51152, 127.24367]
];
var container = document.getElementById('map');

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function mapinit() {
	udt = true;
	var options = {
		center: new kakao.maps.LatLng(xypos[0][0], xypos[0][1]),
		level: 4,
		draggable: false,
		scrollwheel: false,

	};

	var map = new kakao.maps.Map(container, options);
	var mk = [];

	for (var i = 0; i < 8; i++) {
		if (i == 1 || i == 7) continue;
		mk.push(new kakao.maps.Marker({
			position: new kakao.maps.LatLng(xypos[i + 1][0], xypos[i + 1][1]),
			map: map
		}));
	}

	//map.setDraggable(false);
	map.setZoomable(false);
}

function update(shopid) {
	var xpos = xypos[shopid][0];
	var ypos = xypos[shopid][1];
	var options = {
		center: new kakao.maps.LatLng(xpos, ypos),
		level: 2
	};

	var map = new kakao.maps.Map(container, options);

	var marker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(xpos, ypos),
		map: map
	});

	map.setDraggable(false);
	map.setZoomable(false);
}

var listStatus = [];
var markerOnNow = 0;

for (var i = 0; i < 100; i++) {
	listStatus.push(false);
}

function toggleList(num) {
	var listId, contentId, height;

	for (var i = 0; i < 100; i++) {
		if (listStatus[i] && i != num) {
			listId = 'li' + i;
			contentId = '#lc' + i;
			height = '50px';

			listStatus[i] = false;
			document.getElementById(listId).style.height = height;
			document.getElementById(listId).classList.remove('bg-colored');
		}
	}

	listId = 'li' + num;
	contentId = '#lc' + num;
	height = String(document.querySelector(contentId).clientHeight + 50) + 'px';

	if (listStatus[num]) {
		listStatus[num] = false;
		document.getElementById(listId).style.height = '50px';
		document.getElementById(listId).classList.remove('bg-colored');
		mapinit();
	} else {
		listStatus[num] = true;
		document.getElementById(listId).style.height = height;
		document.getElementById(listId).classList.add('bg-colored');
		update(num);
	}
}
'use strict';

function init() {
	var viewer = document.getElementById('calendar');
	var calendar = new FullCalendar.Calendar(viewer, {
		initialView: 'dayGridMonth',
		height: "100%",
		locale: 'ko',
		windowResizeDelay: 10,
		buttonText: {
			today: '처음으로'
		},
		events: [
			{
				title: '여름방학',
				start: '2021-07-16',
				end: '2021-08-12',
				backgroundColor: '#28a745',
				borderColor: 'rgba(0, 0, 0, 0)'
			}, {
				title: '2학기 중간고사',
				start: '2021-10-13',
				end: '2021-10-19',
				backgroundColor: '#ffc107',
				borderColor: 'rgba(0, 0, 0, 0)'
			}, {
				title: '개학',
				start: '2021-08-12',
				backgroundColor: '#dc3545',
				borderColor: 'rgba(0, 0, 0, 0)'
			}, {
				title: '추석연휴',
				start: '2021-09-18',
				end: '2021-09-23',
				backgroundColor: '#28a745',
				borderColor: 'rgba(0, 0, 0, 0)'
			}, {
				title: '11월 모의고사 (고3)',
				start: '2021-10-12',
				backgroundColor: '#dc3545',
				borderColor: 'rgba(0, 0, 0, 0)'
			}, {
				title: '원격수업',
				start: '2021-11-11',
				end: '2021-11-18',
				backgroundColor: '#ffc107',
				borderColor: 'rgba(0, 0, 0, 0)'
			}, {
				title: '대수능',
				start: '2021-11-18',
				backgroundColor: '#dc3545',
				borderColor: 'rgba(0, 0, 0, 0)'
			}, {
				title: '11월 모의고사 (고1, 고2)',
				start: '2021-11-24',
				backgroundColor: '#dc3545',
				borderColor: 'rgba(0, 0, 0, 0)'
			}, {
				title: '2학기 기말고사',
				start: '2021-12-07',
				end: '2021-12-11',
				backgroundColor: '#ffc107',
				borderColor: 'rgba(0, 0, 0, 0)'
			}, {
				title: '성탄절',
				start: '2021-12-25',
				backgroundColor: '#28a745',
				borderColor: 'rgba(0, 0, 0, 0)'
			}, {
				title: '겨울방학',
				start: '2021-12-31',
				end: '2022-01-27',
				backgroundColor: '#28a745',
				borderColor: 'rgba(0, 0, 0, 0)'
			}
		]
	});
	calendar.render();
}

function getElementByXpath(path) {
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function makestyle() {
	var border1 = document.getElementsByClassName('fc-scrollgrid')[0];
	border1.style.borderTopLeftRadius = '8px';
	border1.style.borderTopRightRadius = '8px';
	border1.style.borderBottomLeftRadius = '8px';
	//    console.log(border1);

	var border2 = getElementByXpath('//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/table[1]/thead[1]/tr[1]/td[1]');
	border2.style.borderTopRightRadius = '8px';
	//    console.log(border2);

	var border3 = getElementByXpath('//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/table[1]/tbody[1]/tr[1]/td[1]');
	border3.style.borderBottomLeftRadius = '8px';
	border3.style.borderBottomRightRadius = '8px';
	//    console.log(border3);

	var btn1 = getElementByXpath('//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/button[1]');
	btn1.style.borderRadius = '8px';
	btn1.className += ' btn-reset';
	//    console.log(btn1);

	var btn2 = getElementByXpath('//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/button[1]');
	btn2.style.borderTopLeftRadius = '8px';
	btn2.style.borderBottomLeftRadius = '8px';
	//    console.log(btn2);

	var btn3 = getElementByXpath('//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/button[2]');
	btn3.style.borderTopRightRadius = '8px';
	btn3.style.borderBottomRightRadius = '8px';
	//    console.log(btn3);

	var title = getElementByXpath('//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/h2[1]');
	title.className += ' YMtitle';
	//    console.log(title);
}
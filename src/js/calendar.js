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
                title: '방학',
                start: '2021-07-16',
                end: '2021-08-12',
                backgroundColor: '#28a745',
                borderColor: 'rgba(0, 0, 0, 0)'
            },
            {
                title: 'ㅇㅇ',
                start: '2021-08-10',
                end: '2021-08-31',
                backgroundColor: '#ffc107',
                borderColor: 'rgba(0, 0, 0, 0)'
            },
            {
                title: '개학',
                start: '2021-08-12',
                backgroundColor: '#dc3545',
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
//    console.log(btn1);

    var btn2 = getElementByXpath('//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/button[1]');
    btn2.style.borderTopLeftRadius = '8px';
    btn2.style.borderBottomLeftRadius = '8px';
//    console.log(btn2);

    var btn3 = getElementByXpath('//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/button[2]');
    btn3.style.borderTopRightRadius = '8px';
    btn3.style.borderBottomRightRadius = '8px';
//    console.log(btn3);
}
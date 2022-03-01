//  function dataParse(item) {


//      return obj;
//  }


/**
 * Считываем загруженне данные из колонок и сохраняем в localStorage
 * 
 */
function saveInLocalStorage() {
    let itemsLeftCol = document.querySelectorAll('.friends-all__list li'),
        itemsRightCol = document.querySelectorAll('.friends-filter__list li'),
        leftCol = [],
        rightCol = [];
    console.log('left - ' + itemsLeftCol);
    console.log('right - ' + itemsRightCol);

    itemsLeftCol.forEach(item => {
        let obj = {},
            friendsName = item.querySelector('.friends__name').innerText.split(' '),
            friendsImg = item.querySelector('.friends__img').getAttribute('src');

        obj.first_name = friendsName[0];
        obj.last_name = friendsName[1];
        obj.photo_100 = friendsImg;

        leftCol.push(obj);
    });

    itemsRightCol.forEach(item => {
        let obj = {},
            friendsName = item.querySelector('.friends__name').innerText.split(' '),
            friendsImg = item.querySelector('.friends__img').getAttribute('src');

        obj.first_name = friendsName[0];
        obj.last_name = friendsName[1];
        obj.photo_100 = friendsImg;
        rightCol.push(obj);
    });

    localStorage.leftColData = JSON.stringify(leftCol);
    localStorage.rightColData = JSON.stringify(rightCol);
}

export {
    saveInLocalStorage
}
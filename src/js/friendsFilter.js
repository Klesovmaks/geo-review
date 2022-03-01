/**
 * Функции сравнения строк
 * 
 * @param {string} full 
 * @param {string} chunk 
 * @returns 
 */
function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) >= 0) {
        return true;
    }

    return false;
}


/**
 * Фильтрация списка
 * 
 * @param {object} list - список, который фильтруем 
 * @param {string} input - значение поля
 */
function filterList(list, value) {
    let listFriends = list.querySelectorAll('.friends__item'),
        listFriendsLength = listFriends.length;

    if (value === '') {
        for (let i = 0; i < listFriendsLength; ++i) {
            listFriends[i].style.display = 'flex';
        }
    } else {
        for (let i = 0; i < listFriendsLength; ++i) {
            listFriends[i].style.display = 'none';
            let friendsName = listFriends[i].querySelector('.friends__name').innerHTML;

            if (isMatching(friendsName, value)) {
                listFriends[i].style.display = 'flex';
            }
        }
    }
}

/**
 * Обработка ввода значений в поля для фильтрации
 * фильтрация друзей между списками по нажатию на кнопку
 * 
 */
function filter() {
    let inputFilterColLeft = document.querySelector('#filter-left'),
        inputFilterColRight = document.querySelector('#filter-right'),
        listColLeft = document.querySelector('.js-leftList'),
        listColRight = document.querySelector('.js-rightList');

    inputFilterColLeft.addEventListener('keyup', () => {
        filterList(listColLeft, inputFilterColLeft.value);
    });

    inputFilterColRight.addEventListener('keyup', () => {
        filterList(listColRight, inputFilterColRight.value);
    });

    listColLeft.addEventListener('click', (e) => {
        let target = e.target;
        //debugger;
        if (target.closest('.btn-plus')) {
            let item = target.closest('li'),
                itemSvg = item.querySelector('.btn-plus');
            itemSvg.classList.remove('btn-plus');
            itemSvg.classList.add('btn-close');

            listColRight.appendChild(item);
        }
    });

    listColRight.addEventListener('click', (e) => {
        let target = e.target;
        //debugger;
        if (target.closest('.btn-close')) {
            let item = target.closest('li'),
                itemSvg = item.querySelector('.btn-close');
            itemSvg.classList.remove('btn-close');
            itemSvg.classList.add('btn-plus');

            listColLeft.appendChild(item);
        }
    });
}

export {
    isMatching,
    filterList,
    filter
}
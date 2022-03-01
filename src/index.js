
import { filter } from './js/friendsFilter';
import { dnd, toggleIcon } from './js/dnd';
import { saveInLocalStorage } from './js/saveInLocalStorage';
const template = require('./list.hbs');

function api(method, params) {
    return new Promise((resolve, reject) => {
        VK.api(method, params, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg));
            } else {
                resolve(data.response)
            }
        });
    });
}

// авторизация
const promise = new Promise((resolve, reject) => {
    VK.init({
        apiId: 6202233
    });

    VK.Auth.login(data => {
        if (data.session) {
            resolve(data);
        } else {
            reject(new Error('Не удалось авторизоваться'));
        }
    });
});

promise
// склоняем имя пользователя
    .then(() => {
        return api('users.get', { v: 5.81, name_case: 'gen' });
    })
    .then((data) => {
        const [user] = data;

        return api('friends.get', { v: 5.81, fields: 'first_name, last_name, photo_100' });
    })
    .then((data) => {
        console.log(data);
        let leftList = document.querySelector('#leftList'),
            rightList = document.querySelector('#rightList'),
            saveBtn = document.querySelector("#save"),
            friendsList = template({ list: data.items });


        if (localStorage.rightColData) {
            let itemLength = JSON.parse(localStorage.rightColData).length;

            leftList.innerHTML = template({ list: JSON.parse(localStorage.leftColData) });
            rightList.innerHTML = template({ list: JSON.parse(localStorage.rightColData) });

            let liItem = document.querySelectorAll('.friends-filter__list li');
            console.log(liItem);
            for (let i = 0; i < itemLength; ++i) {
                toggleIcon(liItem[i]);
            }
        } else {
            leftList.innerHTML = friendsList;
        }

        dnd();
        filter();

        saveBtn.addEventListener('click', () => {
            localStorage.clear();
            saveInLocalStorage();
            alert('Данные сохранены!');
        });



    })
    .catch(e => {
        alert('Ошибка ' + e.message);
    })
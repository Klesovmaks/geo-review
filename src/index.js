import render from './templates/list.hbs'

let list = document.querySelector('#list')

const promise = new Promise((resolve, reject) => {
    VK.init({
        apiId: 6202233
    })
    VK.Auth.login(data => {
        if (data.session) {
            resolve(data)
        }
        else {
            reject(new Error('Не удалось авторизоваться'))
        }
    })
})

function api(method, params) {
    return new Promise((resolve, reject) => {
        VK.api(method, params, data => {
            if (!data.error) {
                resolve(data.response)
            } else {
                reject(new Error(data.error))
            }
        })
    })
}

promise
    .then(() => {
        return api('users.get', {v: 5.81, name_case: 'gen'})
    })
    .then(data => {
        return api('friends.get', {v: 5.81, fields: 'photo_50, first_name, last_name'})
    })
    .then(data => {
        console.log(data)
        let friendsList = render({ list: data.items })
        
        list.innerHTML = friendsList
    })
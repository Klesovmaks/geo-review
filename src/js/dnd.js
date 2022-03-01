    /**
     * Меняем иконку (добавить/удалить) при переносе элемента в другую колонку.
     * 
     * @param {object} element 
     * @returns 
     */
    function toggleIcon(element) {
        let iconPlus = element.querySelector('.btn-plus'),
            iconClose = element.querySelector('.btn-close');

        if (iconPlus) {
            iconPlus.classList.remove('btn-plus');
            iconPlus.classList.add('btn-close');

            return iconPlus;
        }

        if (iconClose) {
            iconClose.classList.remove('btn-close');
            iconClose.classList.add('btn-plus');

            return iconClose;
        }
    }


    /**
     * Функция Drag & Drop с помощью HTML5 API
     * 
     */
    function dnd() {
        let inputFilterColLeft = document.querySelector('#filter-left'),
            inputFilterColRight = document.querySelector('#filter-right'),
            listColLeft = document.querySelector('.js-leftList'),
            listColRight = document.querySelector('.js-rightList'),
            list = document.querySelectorAll('.dragList'),
            dragElement;


        function dragStart(e) {
            let target = e.target;
            toggleIcon(target);
            // console.log('dragStart');

            if (target.tagName === 'li') {
                dragElement = target;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', target.outerHTML);
            } else {
                target = e.target.closest('li');

                dragElement = target;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', target.outerHTML);
            }

            // let toogleIcon = dragElement.querySelector('.btn-plus');
            // if (toogleIcon) {
            //     toogleIcon.classList.remove('btn-plus');
            //     toogleIcon.classList.add('btn-close');
            // }
        }

        function dragEnter(ev) {
            // console.log('dragEnter');
            ev.preventDefault();
            return true;
        }

        function dragOver(ev) {
            // console.log('dragOver');
            ev.preventDefault();
        }

        function drop(e) {
            //debugger;


            if (dragElement != e.target || e.target != dragElement.parentElement) {
                console.log(e.target);

                dragElement.outerHTML = '';
                e.target.closest('ul').innerHTML += e.dataTransfer.getData('text/html');

            }
        }

        list.forEach(item => {
            item.addEventListener('dragstart', dragStart, false);
            item.addEventListener('dragenter', dragEnter, false);
            item.addEventListener('dragover', dragOver, false);
            item.addEventListener('drop', drop, false)
        });
    }

    export {
        dnd,
        toggleIcon
    }
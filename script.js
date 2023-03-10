// HTML elements ->

const title = document.querySelector(".title-container h1");
const taskTitle = document.querySelector(".task-container h2");
const taskDesc = document.querySelector(".task-container p");

const toggleButton = document.querySelector('.toggle-button');
const arrow = document.querySelector('.toggle-button img');
const slider = document.querySelector('.slider');
const sliderTitle = document.querySelector('.slider-content h3');
const taskContainer = document.querySelector('.tasks');

const noticeBoard = document.querySelector('.notice-board');
const closeNoticeBoard = document.querySelector('.close-notice-board');

closeNoticeBoard.onclick = () => noticeBoard.classList.add('close');

// fetching JSON data ->

fetch('/db.json')
    .then(response => response.json())
    .then(json => {

        const data = json[0].tasks[0];

        title.textContent = json[0].title;
        taskTitle.textContent = data.task_title;
        taskDesc.textContent = data.task_description;

        let toggle = false;
        
        sliderTitle.textContent = data.task_title;
        data.assets.map(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.asset_title;
            taskContainer.append(listItem);
        });

        toggleButton.onclick = () => {
            if(toggle) {
                toggle = false;
                arrow.classList.remove('spin');
                slider.classList.remove('active');
            } else {
                toggle = true;
                arrow.classList.add('spin');
                slider.classList.add('active');
            };
        };

    })
    .catch(error => console.log(error));
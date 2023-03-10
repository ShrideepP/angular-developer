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

const assetTemplate = document.querySelector('[data-asset-template]');
const assetContainer = document.querySelector('.asset-container');

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
        
        data.assets.forEach(item => {

            const asset = assetTemplate.content.cloneNode(true).children[0];
            const assetTitle = asset.querySelector('[data-asset-title]');
            const assetDesc = asset.querySelector('[data-asset-desc]');
            const assetContent = asset.querySelector('[data-asset-content]');

            assetTitle.textContent = item.asset_title;
            assetDesc.innerHTML = ' <b>Description: </b>' + item.asset_description;

            if(item.asset_content !== ' ') {
                assetContent.innerHTML = `<iframe width="100%" height="315" src="${item.asset_content.trim()}" title="Technological Project Management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
            } else {
                assetContent.textContent = 'Asset content is empty';
            };

            assetContainer.append(asset);

        });

    })
    .catch(error => console.log(error));
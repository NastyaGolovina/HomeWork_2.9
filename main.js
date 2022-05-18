const liName = document.getElementById('name');
const liId = document.getElementById('id');
const liLogin = document.getElementById('login');
const userInfo = document.querySelector('.user-info');
const image = document.querySelector('.image');
const userDetails = document.querySelector('.user-details');
const errorMessage = document.querySelector('.error-message');
const buttonGet = document.getElementById('btn-get');
const message = document.getElementById('message');
const documentation_url = document.getElementById('documentation_url');

function populateUserInfo(name, id, login , url) {
    liName.innerText = `Name: ${name}` ;
    liId.innerText = `Id: ${id}`;
    liLogin.innerText = `Login: ${login}`
    image.innerHTML = `<img src="${url}" alt="Error" >`;
}

function populateErrorInfo(msg , url) {
    message.innerText = `Message: ${msg} `;
    documentation_url.innerHTML = `<p>Documentation URL:</p><a href="${url}">${url}</a>`  ;
}

function funcButtonClose() {
    image.className = 'hidden';
    userInfo.className = 'hidden';
}

function runAPI(event) {
    event.preventDefault();
    let inputValue = document.getElementById('user-login').value;
    console.log(inputValue)
    const request = fetch(`https://api.github.com/users/${inputValue}`);
    request
        .then((response) => {
            console.log(response);
            return response.json();

        })
        .then((result) => {
            console.log(result);
            image.className = 'image';
            userInfo.className = 'user-info';
            if (result.name !== undefined && result.id !== undefined && result.login !== undefined ) {
                errorMessage.className = 'hidden';
                populateUserInfo(result.name, result.id, result.login , result.avatar_url);
                userDetails.className = 'show' ;
            } else {
                userDetails.className = 'hidden';
                image.innerHTML = '<img src="https://robocraft.ru/files/ROS/intro/google-404-index.png" alt="Error" >';
                errorMessage.className = 'show' ;
                populateErrorInfo(result.message , result.documentation_url);

            }
        });
    document.getElementById('user-login').value = '';
}

buttonGet.addEventListener("click", runAPI);
document.addEventListener('click', event => {
    if (event.target.dataset.buttonType === 'clicked') {
        funcButtonClose()
    }
})



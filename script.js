const form = document.querySelector('form');
const userInput = document.querySelector('input');
const userInfoCard = document.querySelector('#userInfo');

form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        let userName = userInput.value;
        let user = await getGithubUser(userName);
        console.log(user.name);
        userInfoCard.style.display = 'flex';
        userInfoCard.innerHTML = `
            <img src="${user.avatar_url}" alt="">
            <div class="text">
                <h2>${user.name}</h2>
                <h3>${user.bio}</h3>
                <br>
                <p>${user.location}</p>
                <br>
                <p>Подписчики: ${user.followers}</p>
                <p>Подписки: ${user.following}</p>
                <a href="${user.html_url}">Открыть профиль</a>
            </div>
        `
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
})

async function getGithubUser(userName) {
    let response = await fetch(`https://api.github.com/users/${userName}`);
    let data = await response.json();

    return data;
}
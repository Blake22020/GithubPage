'use strict'

const form = document.querySelector('form');
const userInput = document.querySelector('input');
const userInfoCard = document.querySelector('#userInfo');

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('username')) {
        userInput.value = localStorage.getItem('username');
    }
})

form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        let userName = userInput.value;
        let user = await getGithubUser(userName);
        console.log(user.name);
        localStorage.setItem('username', userName);
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

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

function animateText(el) {
    const finalText = el.dataset.text || el.textContent;
    el.dataset.text = finalText;

    const progress = [];
    const delays = [];

    for (let i = 0; i < finalText.length; i++) {
        progress[i] = 0;
        delays[i] = Math.random() * 40; 
    }

    function randomChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    function tick() {
        let done = true;
        let result = "";

        for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === " ") {
            result += " ";
            continue;
        }

        if (progress[i] < delays[i]) {
            progress[i]++;
            result += randomChar();
            done = false;
        } else {
            result += finalText[i];
        }
        }

        el.textContent = result;

        if (!done) requestAnimationFrame(tick);
    }

    tick();
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    return (
        rect.top < vh * 0.6 &&
        rect.bottom > 0
    );
}

const elements = document.querySelectorAll(".glitch-text");

function onScroll() {
    elements.forEach(el => {
        if (el.dataset.animated) return;

        if (isInViewport(el)) {
            el.dataset.animated = "true";
            animateText(el);
        }
    });
}

window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);


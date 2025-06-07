
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')
const input = document.querySelector('[type="number"]')
const radio = [...document.querySelectorAll('[name="state"]')]

form.addEventListener('submit', handlFunction)
form.addEventListener('input', inputFunction)


function handlFunction(event) {
    event.preventDefault()
    for (let i of radio) {
        if (i.checked) {
            const promise = new Promise((resolve, reject) => {
                const delay = localStorage.getItem('key')
                setTimeout(() => {
                    if (i.value === "fulfilled") { resolve(delay) }
                    if (i.value === "rejected") { reject(delay) }
                }, delay)
            })
            promise
                .then((delay) => {
                    console.log(`✅ Fulfilled promise in ${delay}ms`)
                    iziToast.show({
                        message: `✅ Fulfilled promise in ${delay}ms`,
                        backgroundColor: ' #59a10d',
                        imageWidth: 383,
                        messageColor: '#ffffff',
                        position: 'topRight'

                        });
                })
                .catch((delay) => {
                    console.log(`❌ Rejected promise in ${delay}ms`)
                    iziToast.show({
                        message: `❌ Rejected promise in ${delay}ms`,
                        backgroundColor: ' #ef4040',
                        imageWidth: 383,
                        messageColor: '#ffffff',
                        position: 'topRight'

                    });
                })
        }
    }
    form.reset()
    localStorage.removeItem('key')
}

function inputFunction() {
    localStorage.setItem('key', input.value)
}

console.log(form.children)
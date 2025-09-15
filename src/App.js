import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, remove, push, onValue } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-345fe-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const signInDataInDB = ref(database, "signin-data");

const inputEl = document.getElementById("input-el");
const addToCartBtn = document.getElementById("addToCart-btn");
const signInBtn = document.getElementById("signin-btn");
const ulEl = document.getElementById("ul-el");
const emailEl = document.getElementById("email-el");
const modalOverlay = document.getElementById("modalOverlay");
const submitBtn = document.getElementById("submit-btn");
const formEL = document.getElementById("form-el");
const password = document.getElementById("password");

let hasSignedIn = false;
let signedInUser = null;

onValue(signInDataInDB, (snapshot) => {
    if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        for (let i = 0; i < data.length; i++) {
            emailEl.textContent = `You are now signed in as: ${data[i].emailValue}`;
        }
        signInBtn.textContent = "LOG OUT";
        hasSignedIn = true;
    } else {
        emailEl.textContent = "You are no longer signed in!";
        hasSignedIn = false;
        submitBtn.disabled = false;
    }
});

signInBtn.addEventListener("click", () => {
    let signedInFunction;

    if (hasSignedIn === false) {
        signedInFunction = () => {
            modalOverlay.style.display = "inline";

            submitBtn.addEventListener("click", () => {
                let email = document.getElementById("email").value;
                let password = document.getElementById("password").value;

                if (validator.isEmail(email) && validator.isStrongPassword(password)) {
                    signedInUser = {
                        emailValue: email,
                        passwordValue: password
                    };
                    push(signInDataInDB, signedInUser);
                    submitBtn.disabled = true;
                } else {
                    console.log("Incorrect email or password!");
                }

                setTimeout(() => {
                    modalOverlay.style.display = "none";
                }, 2000);
            });

            formEL.addEventListener("submit", (e) => {
                e.preventDefault();
            });
        };
    } else {
        signedInFunction = () => {
            const passWordAnswer = prompt("Enter your password to log out!");

            if (signedInUser && passWordAnswer === signedInUser.passwordValue) {
                remove(signInDataInDB);
                console.log("Logout successful");
            } else {
                alert("Incorrect password!");
            }
        };
    }

    signedInFunction();
});

console.log(signInDataInDB);
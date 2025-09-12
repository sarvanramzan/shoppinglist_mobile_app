import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, remove, push, onValue } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-345fe-default-rtdb.firebaseio.com/"
}

console.log(validator)

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

signInBtn.addEventListener("click", ()=> {
    let signedInFunction;
    if(hasSignedIn) {
        signedInFunction = ()=> {
            console.log("true");
        }
    } else {
        signedInFunction = ()=> {
            modalOverlay.style.display = "inline";
            submitBtn.addEventListener("click", ()=> {
                formEL.addEventListener("submit", (e)=> {
                    e.preventDefault();
                    let email = document.getElementById("email").value;
                    let password = document.getElementById("password").value;
                    if(validator.isEmail(email) && validator.isStrongPassword(password)) {
                        let users = [
                            {
                                emailValue: email,
                                passwordValue: password
                            }
                        ]
                        push(signInDataInDB, users);
                        // email = "";
                        // password = "";
                        users = [];
                        console.log(users)
                    } else {
                        console.log("incorrect");
                    }
                    setTimeout(() => {
                        modalOverlay.style.display = "none";
                    }, 2000);
                })
            })
        }
    }
    signedInFunction();
})

console.log(signInDataInDB)
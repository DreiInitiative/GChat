import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, deleteUser } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDN4x98y4fKOdRGw1ElN0HrJey2en7xoHA",
  authDomain: "gchat-dc433.firebaseapp.com",
  databaseURL: "https://gchat-dc433-default-rtdb.firebaseio.com",
  projectId: "gchat-dc433",
  storageBucket: "gchat-dc433.appspot.com",
  messagingSenderId: "1004699720793",
  appId: "1:1004699720793:web:09b1e2efe344ff08676548",
  measurementId: "G-PSJG10XPH3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

let emailEdit = document.getElementById("email");
let passwordEdit = document.getElementById("password");
let passworConfirmdEdit = document.getElementById("passwordConfirm");
let errorLabel = document.getElementById("errorLabel");
var deleteAvailable = true;

let deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", () => {
    if (deleteAvailable) {
        if (emailEdit.value != "") {
            if (passwordEdit.value != "") {
                if (passwordEdit.value == passworConfirmdEdit.value) {
                    console.log("Test", "StartProcess");
                    deleteAvailable = false;
                    errorLabel.textContent = "Wait";
                    var email = emailEdit.value;
                    var password = passwordEdit.value;
                    signInWithEmailAndPassword(auth, email, password)
                        .then(function(userCredential) {
                            errorLabel.textContent = "Wait..";
                            var user = userCredential.user;
                            console.log("User Loged Susseful", user);

                            deleteUser(auth.currentUser).then(() => {
                                errorLabel.textContent = "Account Deleted!!";
                                deleteAvailable = true;
                            }).catch((error) => {
                                errorLabel.textContent = "Error: " + error.code;
                                deleteAvailable = true;
                            });
                        }).catch(function(error) {
                            switch (error.code) {
                                case "auth/user-not-found":
                                    errorLabel.textContent = "User not found";
                                    break;

                                case "auth/wrong-password":
                                    errorLabel.textContent = "Wrong Password";
                                    break;

                                case "network-request-failed":
                                    errorLabel.textContent = "Network Request Failed";
                                    break;

                                default:
                                    errorLabel.textContent = error.code;
                                    break;
                            }
                            deleteAvailable = true;
                        });
                } else if (passworConfirmdEdit.value == "") {
                    errorLabel.textContent = "Confirm your Password";
                } else {
                    errorLabel.textContent = "Check your Password";
                }
            } else {
                errorLabel.textContent = "Set your Password";
            }
        } else {
            errorLabel.textContent = "Set your Email";
        }
    }
});

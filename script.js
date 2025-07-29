import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB7RqRuStzh6bC5_SF9chcThtH_0oaZ-8g",
    authDomain: "chatty-2b88b.firebaseapp.com",
    databaseURL: "https://chatty-2b88b-default-rtdb.firebaseio.com",
    projectId: "chatty-2b88b",
    storageBucket: "chatty-2b88b.firebasestorage.app",
    messagingSenderId: "381256217090",
    appId: "1:381256217090:web:4d705d205a3f0e16cbed1b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const authContainer = document.getElementById('auth-container');
    const enrollmentContainer = document.getElementById('enrollment-container');
    const dashboardContainer = document.getElementById('dashboard-container');

    // Event Listeners
    document.getElementById('show-enrollment').addEventListener('click', () => {
        authContainer.classList.add('hidden');
        enrollmentContainer.classList.remove('hidden');
    });

    document.getElementById('show-login').addEventListener('click', () => {
        enrollmentContainer.classList.add('hidden');
        authContainer.classList.remove('hidden');
    });

    document.getElementById('enrollment-form').addEventListener('submit', handleEnrollment);
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    // Other functionalities...
    initThemeSwitcher();
    initLanguageSwitcher();
    initFeedbackModal();
});

function handleEnrollment(e) {
    e.preventDefault();
    const name = document.getElementById('enroll-name').value;
    // ... get other form values
    const requestId = `req_${Date.now()}`;

    set(ref(db, 'enrollmentRequests/' + requestId), {
        name: name,
        // ... set other values
        status: 'pending'
    }).then(() => {
        alert('Enrollment request submitted successfully!');
        e.target.reset();
    }).catch(error => {
        console.error("Error submitting enrollment: ", error);
        alert('An error occurred. Please try again.');
    });
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    get(child(ref(db), `students`)).then((snapshot) => {
        if (snapshot.exists()) {
            let userFound = false;
            snapshot.forEach(studentSnap => {
                const student = studentSnap.val();
                if (student.profile.email === email && student.profile.password === password) {
                    userFound = true;
                    localStorage.setItem('studentId', studentSnap.key);
                    showDashboard(student);
                }
            });
            if (!userFound) {
                alert('Invalid credentials!');
            }
        } else {
            alert('No student data found.');
        }
    }).catch(error => {
        console.error(error);
    });
}

function showDashboard(studentData) {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('enrollment-container').classList.add('hidden');
    document.getElementById('dashboard-container').classList.remove('hidden');

    document.getElementById('student-name').textContent = studentData.profile.name;
    // ... populate dashboard with data
}

function handleLogout() {
    localStorage.removeItem('studentId');
    document.getElementById('dashboard-container').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
}

function initThemeSwitcher() {
    // Theme switcher logic
}
function initLanguageSwitcher() {
    // Language switcher logic
}
function initFeedbackModal() {
    // Feedback modal logic
}
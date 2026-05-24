// USER CLASS
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

// USER MANAGEMENT CLASS
class UserManagement {
    constructor() {
        //Load existing users from localStorage, or initialize empty array
        this.users = JSON.parse(localStorage.getItem('userDB')) || [];
    }

    //Add user end simulate persistent database
    addUser(name, email) {
        //Validation check
        if (!name.trim() || !email.trim()) {
            alert("Todos los campos son obligatorios");
            return false;
        }

        const newUser = new User(name, email);
        this.users.push(newUser);
        this.saveOnLocalStorage();
        return true;
    }

    //Save on localStorage
    saveOnLocalStorage() {
        localStorage.setItem('userDB', JSON.stringify(this.users));
    }

    //Get all users
    getUsers() {
        return this.users;
    }
}

//EXECUTION
//Initialize simulated dataBase
const manager = new UserManagement();

//DOM elements
const form = document.getElementById('addUserForm');
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const userList = document.getElementById('usersList');
const btnUpload = document.getElementById('btn-uploadUsers');

//Function to render users list
function renderList() {
    userList.innerHTML = '';

    const list = manager.getUsers();

    list.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}

//Event add user
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = inputName.value;
    const email = inputEmail.value;

    const exit = manager.addUser(name, email);

    if (exit) {
        //Clear inputs
        form.reset();
        //Update list visually
        renderList();
    }
});

//Event button upload users
btnUpload.addEventListener('click', () => {
    renderList();
});
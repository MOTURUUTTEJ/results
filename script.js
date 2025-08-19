// JS for login form (optional: basic validation or demo alert)
// Demo: Simple localStorage-based auth for demo only
// Predefined users (for demo)
const demoUsers = [
  { username: 'hod', password: 'hod123', role: 'hod' },
  { username: 'staff', password: 'staff123', role: 'staff' }
];

// Save demo users to localStorage if not present
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(demoUsers));
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const main = document.querySelector('main');

  // Add Create Account link
  let createLink = document.createElement('a');
  createLink.href = '#';
  createLink.textContent = 'Create Account';
  createLink.className = 'text-xs text-blue-700 underline text-center mt-2';
  form.appendChild(createLink);

  createLink.addEventListener('click', function(e) {
    e.preventDefault();
    showCreateAccountForm();
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = form.querySelector('input[type="text"]').value.trim();
    const password = form.querySelector('input[type="password"]').value;
    const role = form.querySelector('input[name="loginAs"]:checked').value;
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password && u.role === role);
    if (user) {
      // Success: redirect to dashboard
      window.location.href = 'anoter_codes/dashboard.html';
    } else {
      alert('Unauthorized: Invalid credentials or role.');
    }
  });

  function showCreateAccountForm() {
    main.innerHTML = `
      <form class="bg-yellow-100 p-6 w-[320px] flex flex-col gap-3 border border-yellow-300 mx-auto" style="font-family: serif;">
        <h2 class="text-center font-semibold text-sm mb-1">Create Account</h2>
        <input class="border border-gray-300 text-xs px-2 py-1" placeholder="Enter username" type="text" required />
        <input class="border border-gray-300 text-xs px-2 py-1" placeholder="Enter password" type="password" required />
        <input class="border border-gray-300 text-xs px-2 py-1" placeholder="Enter your name" type="text" required />
        <input class="border border-gray-300 text-xs px-2 py-1" placeholder="Enter email" type="email" required />
        <div class="text-xs font-semibold mb-2 text-center">
          Register As:
          <label class="inline-flex items-center ml-2">
            <input class="form-radio text-gray-700" name="registerAs" type="radio" value="hod" required />
            <span class="ml-1">HOD</span>
          </label>
          <label class="inline-flex items-center ml-2">
            <input class="form-radio text-gray-700" name="registerAs" type="radio" value="staff" required />
            <span class="ml-1">Staff</span>
          </label>
        </div>
        <button class="bg-[#5c4329] text-white text-xs font-semibold py-1 mt-1" type="submit">Create Account</button>
        <a href="#" class="text-xs text-blue-700 underline text-center mt-2" id="backToLogin">Back to Login</a>
      </form>
    `;
    const createForm = main.querySelector('form');
    createForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = createForm.querySelector('input[type="text"]').value.trim();
      const password = createForm.querySelector('input[type="password"]').value;
      const name = createForm.querySelector('input[placeholder="Enter your name"]').value.trim();
      const email = createForm.querySelector('input[type="email"]').value.trim();
      const role = createForm.querySelector('input[name="registerAs"]:checked').value;
      if (!username || !password || !name || !email || !role) {
        alert('Please fill all fields.');
        return;
      }
      // Check if username exists
      if (getUsers().some(u => u.username === username)) {
        alert('Username already exists.');
        return;
      }
      saveUser({ username, password, name, email, role });
      alert('Account created! You can now login.');
      window.location.reload();
    });
    main.querySelector('#backToLogin').addEventListener('click', function(e) {
      e.preventDefault();
      window.location.reload();
    });
  }
});


document.getElementById('registerForm').addEventListener('submit', function(event) {
event.preventDefault();
const email = document.getElementById('email').value;

emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
to_email: email
})
.then(function(response) {
alert('Письмо отправлено! Проверьте вашу почту.');
}, function(error) {
console.error('Ошибка при отправке письма:', error);
alert('Произошла ошибка при отправке письма.');
});

window.location.href = 'https://ttserafim1.github.io/login-/';
});

// Добавление фиолетового следа за курсором
document.addEventListener('mousemove', function(event) {
const trail = document.createElement('div');
trail.className = 'trail';
trail.style.left = `${event.pageX}px`;
trail.style.top = `${event.pageY}px`;
document.body.appendChild(trail);
setTimeout(() => {
trail.remove();
}, 1000); // Удаление следа через 1 секунду
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
event.preventDefault();
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

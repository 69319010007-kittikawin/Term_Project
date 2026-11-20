document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

    // Toast Notification Class
    class Toast {
        constructor() {
            this.container = document.getElementById('toast-container');
        }

        show(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            // Icon based on type
            const icon = type === 'success' ? '✓' : '✕';
            
            toast.innerHTML = `
                <div style="font-weight: bold; color: var(--${type}-color)">${icon}</div>
                <div>${message}</div>
            `;
            
            this.container.appendChild(toast);
            
            // Trigger animation
            setTimeout(() => toast.classList.add('show'), 10);
            
            // Remove after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300); // Wait for transition to finish
            }, 3000);
        }
    }

    const toastNotifier = new Toast();

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // ป้องกันหน้าเว็บรีเฟรช

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // 1. Loading State (ป้องกันการกดซ้ำ)
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        spinner.style.display = 'block';

        // 2. Simulate API Call / Firebase Auth (จำลองการโหลด 1.5 วินาที)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Basic Validation Example (สามารถปรับเป็นการเช็คกับ Firebase จริงได้)
            if (email && password.length >= 6) {
                toastNotifier.show('Login successful! Redirecting...', 'success');
                // window.location.href = 'dashboard.html'; // ลิงก์ไปหน้าถัดไป
            } else {
                throw new Error('Invalid credentials. Password must be at least 6 characters.');
            }
        } catch (error) {
            toastNotifier.show(error.message, 'error');
            // รีเซ็ตรหัสผ่านถ้าผิด
            document.getElementById('password').value = '';
        } finally {
            // 3. Reset Button State
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            spinner.style.display = 'none';
        }
    });
});
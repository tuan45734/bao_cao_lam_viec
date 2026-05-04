// login.js - Xử lý đăng nhập và phân quyền

// Danh sách tài khoản
const USERS = {
    'KV1ADZ': { role: 'KV1', name: 'Quản lý KV1' },
    'KV2ZAC': { role: 'KV2', name: 'Quản lý KV2' },
    'KV3CCC': { role: 'KV3', name: 'Quản lý KV3' },
    'KV4YXY': { role: 'KV4', name: 'Quản lý KV4' },
    'KV5XXZ': { role: 'KV5', name: 'Quản lý KV5' },
    'KV6XBC': { role: 'KV6', name: 'Quản lý KV6' },
    'ancungbatuyet99': { role: 'ADMIN', name: 'Quản trị viên' }
};

// Key lưu trữ session
const SESSION_KEY = 'baocao_loggedin_user';
const USER_AREA_KEY = 'baocao_user_area';
const USER_NAME_KEY = 'baocao_user_name';

// Kiểm tra đăng nhập
function isLoggedIn() {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
}

// Lấy khu vực của user đang đăng nhập
function getUserArea() {
    return sessionStorage.getItem(USER_AREA_KEY);
}

// Lấy tên user
function getUserName() {
    return sessionStorage.getItem(USER_NAME_KEY);
}

// Kiểm tra user có phải admin không
function isAdmin() {
    return getUserArea() === 'ADMIN';
}

// Đăng nhập
function login(masukata) {
    const ma = masukata.trim().toUpperCase();
    
    if (USERS[ma]) {
        const user = USERS[ma];
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem(USER_AREA_KEY, user.role);
        sessionStorage.setItem(USER_NAME_KEY, user.name);
        return { success: true, role: user.role, name: user.name };
    }
    
    return { success: false, message: 'Mã đăng nhập không hợp lệ!' };
}

// Đăng xuất
function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(USER_AREA_KEY);
    sessionStorage.removeItem(USER_NAME_KEY);
    window.location.reload();
}

// Hiển thị form đăng nhập (KHÔNG có gợi ý)
function showLoginModal() {
    // Tạo modal nếu chưa có
    let modal = document.getElementById('loginModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'loginModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 28px; padding: 32px; width: 360px; max-width: 90%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); text-align: center;">
                <div style="background: linear-gradient(135deg, #ff5b5b 0%, #ff7300 100%); width: 65px; height: 65px; border-radius: 35px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <span style="font-size: 32px;">🔐</span>
                </div>
                <h2 style="color: #1e293b; margin-bottom: 8px;">ĐĂNG NHẬP</h2>
                <p style="color: #64748b; font-size: 13px; margin-bottom: 28px;">Vui lòng nhập mã được cấp</p>
                
                <div style="margin-bottom: 24px; text-align: left;">
                    <label style="display: block; font-size: 12px; font-weight: 600; color: #334155; margin-bottom: 6px;">MÃ ĐĂNG NHẬP</label>
                    <input type="password" id="loginCode" placeholder="••••••" autocomplete="off" style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 16px; font-size: 16px; letter-spacing: 2px; transition: all 0.2s;">
                </div>
                
                <button id="loginBtn" style="width: 100%; padding: 14px; background: linear-gradient(135deg, #ff5b5b 0%, #ff7300 100%); color: white; border: none; border-radius: 40px; font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.2s;">ĐĂNG NHẬP</button>
                
                <div id="loginError" style="color: #e74c3c; font-size: 13px; margin-top: 16px;"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const loginBtn = document.getElementById('loginBtn');
        const loginCode = document.getElementById('loginCode');
        
        loginBtn.addEventListener('click', () => {
            const code = loginCode.value;
            const result = login(code);
            
            if (result.success) {
                modal.style.display = 'none';
                initAppAfterLogin();
            } else {
                const errorDiv = document.getElementById('loginError');
                errorDiv.textContent = result.message;
                loginCode.style.borderColor = '#e74c3c';
                loginCode.value = '';
                loginCode.focus();
            }
        });
        
        loginCode.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                loginBtn.click();
            }
        });
        
        loginCode.addEventListener('input', () => {
            loginCode.style.borderColor = '#e2e8f0';
            document.getElementById('loginError').textContent = '';
        });
        
        // Focus vào ô nhập
        loginCode.focus();
    }
    
    modal.style.display = 'flex';
}

// Tạo header user info
function createUserHeader() {
    const userName = getUserName();
    const userArea = getUserArea();
    
    const userInfoDiv = document.createElement('div');
    userInfoDiv.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(255,255,255,0.15);
        padding: 6px 16px;
        border-radius: 40px;
        position: absolute;
        top: 20px;
        right: 30px;
    `;
    
    userInfoDiv.innerHTML = `
        <span style="font-size: 13px;">👋 ${userName}</span>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 30px; font-size: 11px; font-weight: bold;">${userArea === 'ADMIN' ? '👑 ADMIN' : userArea}</span>
        <button id="logoutHeaderBtn" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">🚪</button>
    `;
    
    const logoutBtn = userInfoDiv.querySelector('#logoutHeaderBtn');
    logoutBtn.addEventListener('click', logout);
    
    return userInfoDiv;
}

// Khởi tạo app sau khi đăng nhập (KHÔNG tự động tìm kiếm)
function initAppAfterLogin() {
    // Thêm user info vào header
    const header = document.querySelector('.header');
    if (header && !document.querySelector('.user-info')) {
        const userInfo = createUserHeader();
        userInfo.classList.add('user-info');
        header.style.position = 'relative';
        header.appendChild(userInfo);
    }
    
    // Ẩn tab Tổng quan nếu không phải admin
    if (!isAdmin()) {
        const overviewTab = document.querySelector('.tab-btn[data-tab="overview"]');
        if (overviewTab) {
            overviewTab.style.display = 'none';
        }
        // Nếu đang ở tab overview, chuyển về detail
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab && activeTab.getAttribute('data-tab') === 'overview') {
            const detailTab = document.querySelector('.tab-btn[data-tab="detail"]');
            if (detailTab) {
                detailTab.click();
            }
        }
    }
    
    // Áp dụng filter khu vực cho bộ lọc nếu không phải admin
    if (!isAdmin()) {
        const areaFilter = document.getElementById('areaFilter');
        if (areaFilter) {
            const userArea = getUserArea();
            // Chỉ giữ lại khu vực của user
            Array.from(areaFilter.options).forEach(option => {
                if (option.value !== 'all' && option.value !== userArea) {
                    option.remove();
                }
            });
            // Chọn khu vực của user nếu có
            if (userArea && areaFilter.querySelector(`option[value="${userArea}"]`)) {
                areaFilter.value = userArea;
            }
            // Disable select khu vực
            areaFilter.disabled = true;
            areaFilter.style.opacity = '0.7';
            areaFilter.title = 'Bạn chỉ có quyền xem khu vực này';
        }
    }
    
    // KHÔNG tự động load báo cáo - chỉ hiển thị thông báo
    document.getElementById('detailContent').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Vui lòng chọn khoảng thời gian và nhấn "Xem báo cáo"</p>
        </div>
    `;
    
    if (!isAdmin()) {
        document.getElementById('overviewContent').innerHTML = `
            <div class="loading">
                <p>📊 Chỉ quản trị viên mới có quyền xem biểu đồ tổng quan</p>
            </div>
        `;
    } else {
        document.getElementById('overviewContent').innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Vui lòng chọn khoảng thời gian và nhấn "Xem báo cáo"</p>
            </div>
        `;
    }
}

// Kiểm tra session khi load trang
function checkSessionAndInit() {
    if (isLoggedIn()) {
        initAppAfterLogin();
    } else {
        showLoginModal();
    }
}
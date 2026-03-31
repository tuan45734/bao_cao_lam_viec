// API Configuration
const API_CONFIG = {
    baseUrl: 'https://openapi.mobiwork.vn/OpenAPI/V1',
    auth: 'Basic NjlhZTZlNmM4YTY0NjVmNDFlNTNhZmI0OjFuYzFnc3J1N2p2Ym10eTdncGV5NWk='
};

// Khu vực mapping
const AREA_MAPPING = [
    ['NPP Bảo Lâm', 'KV1'], ['NPP Công Giang', 'KV1'], ['NPP Cường Thịnh', 'KV1'],
    ['NPP Đức Nam Tiến', 'KV1'], ['NPP Dũng Cúc', 'KV1'], ['NPP Lâm Hạ', 'KV1'],
    ['NPP Long Liên', 'KV1'], ['NPP Nguyên Vũ', 'KV1'], ['NPP Thảo Nam', 'KV1'],
    ['NPP Tuấn Huê', 'KV1'], ['NPP Tuấn Yến', 'KV1'], ['NPP Vũ Tấm', 'KV1'],
    ['NPP Duy Anh', 'KV2'], ['NPP Hoa Việt', 'KV2'], ['NPP Hùng Huệ', 'KV2'],
    ['NPP Long Châm', 'KV2'], ['NPP Ngọc Kiên', 'KV2'], ['NPP Ngọc Thêu', 'KV2'],
    ['NPP Phong Hiền', 'KV2'], ['NPP Phúc Thịnh', 'KV2'], ['NPP Phương Đông', 'KV2'],
    ['NPP Thành Lụa', 'KV2'], ['NPP Tuấn Huyền', 'KV2'], ['NPP Bảo Cường', 'KV3'],
    ['NPP Hikoji', 'KV3'], ['NPP Long Hải', 'KV3'], ['NPP Tân Hoa', 'KV3'],
    ['NPP Tây Đô', 'KV3'], ['NPP Thắng Lợi', 'KV3'], ['NPP Thành Hân', 'KV3'],
    ['NPP Tiến Thịnh', 'KV3'], ['NPP Ánh Thu', 'KV4'], ['NPP Đức Oanh', 'KV4'],
    ['NPP Dương Minh', 'KV4'], ['NPP Dũng Béo', 'KV4'], ['NPP Hưng Thịnh', 'KV4'],
    ['NPP Ngọc Phúc', 'KV4'], ['NPP Nguyễn Đình Hân', 'KV4'], ['NPP Tân Thuý', 'KV4'],
    ['NPP Thăng Hương', 'KV4'], ['NPP Thảo Thắng', 'KV4'], ['NPP Tùng Phương', 'KV4'],
    ['NPP Anh Đức', 'KV5'], ['NPP Hải Hằng', 'KV5'], ['NPP Hiền Cường', 'KV5'],
    ['NPP Hoàng Minh', 'KV5'], ['NPP Oanh Định', 'KV5'], ['NPP Sơn Lâm', 'KV5'],
    ['NPP Thái Hoà', 'KV5'], ['NPP Thảo Xuân', 'KV5'], ['NPP Tiên Lan', 'KV5'],
    ['NPP Tuấn Vân', 'KV5'], ['NPP Vũ Đức Nam', 'KV5'], ['NPP Anh Minh HT', 'KV6'],
    ['NPP Hà Thanh', 'KV6'], ['NPP Hồng Đức', 'KV6'], ['NPP Linh Trang', 'KV6'],
    ['NPP Mạnh Hà 1', 'KV6'], ['NPP Mạnh Hà 2', 'KV6'], ['NPP Minh Châu', 'KV6'],
    ['NPP Minh Lộc', 'KV6'], ['NPP Nhung Tùng', 'KV6'], ['NPP Phương Hà', 'KV6'],
    ['NPP Tân Bích An', 'KV6'], ['NPP Thanh Bình', 'KV6'], ['NPP Thành Thanh', 'KV6'],
    ['NPP Thông Thơm', 'KV6'], ['NPP Trường Hằng', 'KV6']
];

// Data storage
let employeesData = [];
let timesheetData = [];
let visitData = [];
let reportData = [];

// Chart instances
let charts = {};

// Delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Update progress bar
function updateProgress(percent, text) {
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (percent === 0) {
        progressContainer.style.display = 'block';
    } else if (percent >= 100) {
        setTimeout(() => {
            progressContainer.style.display = 'none';
        }, 500);
    }
    
    progressBar.style.width = `${percent}%`;
    progressText.textContent = text;
}

// Hàm lấy khu vực từ mã đơn vị
function getArea(maDonVi) {
    const found = AREA_MAPPING.find(item => item[0] === maDonVi);
    return found ? found[1] : 'Chưa phân loại';
}

// Hàm kiểm tra chấm công đạt chuẩn
function checkAttendance(checkinTime, checkoutTime) {
    let checkinStatus = false;
    let checkoutStatus = false;
    
    if (checkinTime && checkinTime !== '') {
        const [hours, minutes] = checkinTime.split(':').map(Number);
        const timeValue = hours * 60 + minutes;
        checkinStatus = timeValue < 8 * 60 + 1;
    }
    
    if (checkoutTime && checkoutTime !== '') {
        const [hours, minutes] = checkoutTime.split(':').map(Number);
        const timeValue = hours * 60 + minutes;
        checkoutStatus = timeValue > 16 * 60 + 59;
    }
    
    return { checkinStatus, checkoutStatus, isFull: checkinStatus && checkoutStatus };
}

// Gọi API lấy danh sách nhân viên
async function fetchEmployees() {
    try {
        updateProgress(10, 'Đang lấy danh sách nhân viên...');
        await delay(2000);
        
        const response = await fetch(`${API_CONFIG.baseUrl}/Sale`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': API_CONFIG.auth
            }
        });
        const data = await response.json();
        
        if (data.status) {
            employeesData = data.data;
            updateProgress(30, `Đã lấy ${employeesData.length} nhân viên`);
            return employeesData;
        }
        throw new Error(data.message);
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}

// Gọi API lấy dữ liệu chấm công
async function fetchTimesheet(fromDate, toDate) {
    try {
        updateProgress(40, 'Đang lấy dữ liệu chấm công...');
        await delay(2000);
        
        const url = `${API_CONFIG.baseUrl}/TimesheetData?tu_ngay=${encodeURIComponent(formatDate(fromDate))}&den_ngay=${encodeURIComponent(formatDate(toDate))}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': API_CONFIG.auth
            }
        });
        const data = await response.json();
        
        if (data.status) {
            timesheetData = data.data;
            updateProgress(60, `Đã lấy dữ liệu chấm công của ${timesheetData.length} nhân viên`);
            return timesheetData;
        }
        throw new Error(data.message);
    } catch (error) {
        console.error('Error fetching timesheet:', error);
        throw error;
    }
}

// Gọi API lấy dữ liệu viếng thăm
async function fetchVisit(fromDate, toDate) {
    try {
        updateProgress(70, 'Đang lấy dữ liệu viếng thăm...');
        await delay(2000);
        
        const url = `${API_CONFIG.baseUrl}/VisitData?tu_ngay=${encodeURIComponent(formatDate(fromDate))}&den_ngay=${encodeURIComponent(formatDate(toDate))}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': API_CONFIG.auth
            }
        });
        const data = await response.json();
        
        if (data.status) {
            visitData = data.data;
            updateProgress(90, `Đã lấy dữ liệu viếng thăm của ${visitData.length} nhân viên`);
            return visitData;
        }
        throw new Error(data.message);
    } catch (error) {
        console.error('Error fetching visit:', error);
        throw error;
    }
}

// Format date dd/mm/yyyy
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// Xử lý dữ liệu báo cáo
function processReport() {
    const employeeMap = new Map();
    employeesData.forEach(emp => {
        employeeMap.set(emp.ma, {
            ma: emp.ma,
            ten: emp.ten,
            maDonVi: emp.ma_don_vi,
            chucDanh: emp.chuc_danh,
            soDienThoai: emp.so_dien_thoai,
            area: getArea(emp.ma_don_vi)
        });
    });

    // Xử lý chấm công
    const attendanceMap = new Map();
    timesheetData.forEach(record => {
        const maNV = record.ma_nhan_vien;
        if (!attendanceMap.has(maNV)) {
            attendanceMap.set(maNV, { days: 0, fullDays: 0, details: [] });
        }
        
        let checkin = '', checkout = '';
        for (let i = 1; i <= 31; i++) {
            const dayData = record[i];
            if (dayData && dayData.data_cc) {
                const dataCC = dayData.data_cc;
                const checkinRecord = dataCC.find(c => c.loai === 'Vào');
                const checkoutRecord = dataCC.find(c => c.loai === 'Ra');
                if (checkinRecord && checkinRecord.thoi_gian) checkin = checkinRecord.thoi_gian;
                if (checkoutRecord && checkoutRecord.thoi_gian) checkout = checkoutRecord.thoi_gian;
                
                if (checkin || checkout) {
                    const result = checkAttendance(checkin, checkout);
                    attendanceMap.get(maNV).days++;
                    if (result.isFull) attendanceMap.get(maNV).fullDays++;
                    attendanceMap.get(maNV).details.push({
                        date: dayData.ngay,
                        checkin,
                        checkout,
                        status: result.isFull
                    });
                }
            }
        }
    });

    // Xử lý viếng thăm
    const visitMap = new Map();
    visitData.forEach(record => {
        const maNV = record.ma_nv;
        if (!visitMap.has(maNV)) {
            visitMap.set(maNV, { totalVisits: 0, visits: [] });
        }
        const visitCount = record.thoi_gian_vt ? record.thoi_gian_vt.length : 0;
        visitMap.get(maNV).totalVisits += visitCount;
        if (record.thoi_gian_vt) {
            visitMap.get(maNV).visits.push(...record.thoi_gian_vt);
        }
    });

    // Tổng hợp báo cáo
    reportData = [];
    for (const [maNV, emp] of employeeMap) {
        const attendance = attendanceMap.get(maNV) || { days: 0, fullDays: 0 };
        const visit = visitMap.get(maNV) || { totalVisits: 0 };
        
        const attendanceRate = attendance.days > 0 ? (attendance.fullDays / attendance.days * 100) : 0;
        const visitPass = visit.totalVisits >= 20;
        
        reportData.push({
            maNV: emp.ma,
            tenNV: emp.ten,
            area: emp.area,
            maDonVi: emp.maDonVi,
            chucDanh: emp.chucDanh,
            soDienThoai: emp.soDienThoai,
            totalDays: attendance.days,
            fullAttendanceDays: attendance.fullDays,
            attendanceRate: attendanceRate.toFixed(1),
            attendanceStatus: attendanceRate >= 80 ? 'Đạt' : 'Chưa đạt',
            totalVisits: visit.totalVisits,
            visitStatus: visitPass ? 'Đạt' : 'Chưa đạt',
            overallStatus: (attendanceRate >= 80 && visitPass) ? 'Hoàn thành' : 'Chưa hoàn thành',
            attendanceDetails: attendance.details,
            visitDetails: visit.visits
        });
    }
    
    updateProgress(100, 'Hoàn tất xử lý dữ liệu!');
    return reportData;
}

// Lọc dữ liệu
function filterData() {
    const area = document.getElementById('areaFilter').value;
    const employee = document.getElementById('employeeFilter').value;
    
    return reportData.filter(emp => {
        if (area !== 'all' && emp.area !== area) return false;
        if (employee !== 'all' && emp.maNV !== employee) return false;
        return true;
    });
}

// Hàm tạo biểu đồ
function createCharts(filteredData) {
    // Xóa các biểu đồ cũ
    Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
    });
    charts = {};

    // 1. Biểu đồ tròn: Tỷ lệ hoàn thành công việc
    const completedCount = filteredData.filter(e => e.overallStatus === 'Hoàn thành').length;
    const incompleteCount = filteredData.length - completedCount;
    
    const ctx1 = document.getElementById('completionChart')?.getContext('2d');
    if (ctx1) {
        charts.completion = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['Hoàn thành', 'Chưa hoàn thành'],
                datasets: [{
                    data: [completedCount, incompleteCount],
                    backgroundColor: ['#38ef7d', '#f5576c'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw} (${((ctx.raw/filteredData.length)*100).toFixed(1)}%)` } }
                }
            }
        });
    }

    // 2. Biểu đồ cột: Số lượng nhân viên theo khu vực
    const areaStats = {};
    filteredData.forEach(emp => {
        areaStats[emp.area] = (areaStats[emp.area] || 0) + 1;
    });
    
    const ctx2 = document.getElementById('areaChart')?.getContext('2d');
    if (ctx2) {
        charts.area = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: Object.keys(areaStats),
                datasets: [{
                    label: 'Số lượng nhân viên',
                    data: Object.values(areaStats),
                    backgroundColor: 'rgba(102, 126, 234, 0.7)',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } }
            }
        });
    }

    // 3. Biểu đồ đường: Tỷ lệ chấm công và viếng thăm
    const top10 = filteredData.slice(0, 10);
    const ctx3 = document.getElementById('performanceChart')?.getContext('2d');
    if (ctx3) {
        charts.performance = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: top10.map(e => e.tenNV.length > 15 ? e.tenNV.substring(0, 12) + '...' : e.tenNV),
                datasets: [
                    {
                        label: 'Tỷ lệ chấm công (%)',
                        data: top10.map(e => parseFloat(e.attendanceRate)),
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Số lượt viếng thăm',
                        data: top10.map(e => e.totalVisits),
                        borderColor: '#f5576c',
                        backgroundColor: 'rgba(245, 87, 108, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { tooltip: { mode: 'index', intersect: false } }
            }
        });
    }

    // 4. Biểu đồ radar: Đánh giá toàn diện các khu vực
    const areaPerformance = {};
    Object.keys(areaStats).forEach(area => {
        const employeesInArea = filteredData.filter(e => e.area === area);
        const avgAttendance = employeesInArea.reduce((sum, e) => sum + parseFloat(e.attendanceRate), 0) / employeesInArea.length;
        const avgVisits = employeesInArea.reduce((sum, e) => sum + e.totalVisits, 0) / employeesInArea.length;
        areaPerformance[area] = { attendance: avgAttendance, visits: Math.min(avgVisits, 100) };
    });
    
    const ctx4 = document.getElementById('radarChart')?.getContext('2d');
    if (ctx4) {
        charts.radar = new Chart(ctx4, {
            type: 'radar',
            data: {
                labels: Object.keys(areaPerformance),
                datasets: [
                    {
                        label: 'Tỷ lệ chấm công (%)',
                        data: Object.values(areaPerformance).map(v => v.attendance),
                        backgroundColor: 'rgba(102, 126, 234, 0.2)',
                        borderColor: '#667eea'
                    },
                    {
                        label: 'Hiệu suất viếng thăm',
                        data: Object.values(areaPerformance).map(v => v.visits),
                        backgroundColor: 'rgba(56, 239, 125, 0.2)',
                        borderColor: '#38ef7d'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { r: { beginAtZero: true, max: 100 } }
            }
        });
    }

    // 5. Biểu đồ phân tán: Tương quan giữa chấm công và viếng thăm
    const scatterData = filteredData.map(e => ({
        x: parseFloat(e.attendanceRate),
        y: e.totalVisits,
        label: e.tenNV
    }));
    
    const ctx5 = document.getElementById('scatterChart')?.getContext('2d');
    if (ctx5) {
        charts.scatter = new Chart(ctx5, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Nhân viên',
                    data: scatterData,
                    backgroundColor: '#764ba2',
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { title: { display: true, text: 'Tỷ lệ chấm công (%)' }, min: 0, max: 100 },
                    y: { title: { display: true, text: 'Số lượt viếng thăm' } }
                },
                plugins: {
                    tooltip: { callbacks: { label: (ctx) => `${ctx.raw.label}: CC ${ctx.raw.x}%, VT ${ctx.raw.y}` } }
                }
            }
        });
    }

    // 6. Biểu đồ thanh ngang: Top nhân viên viếng thăm nhiều nhất
    const topVisitors = [...filteredData].sort((a, b) => b.totalVisits - a.totalVisits).slice(0, 8);
    const ctx6 = document.getElementById('horizontalBarChart')?.getContext('2d');
    if (ctx6) {
        charts.horizontalBar = new Chart(ctx6, {
            type: 'bar',
            data: {
                labels: topVisitors.map(e => e.tenNV.length > 12 ? e.tenNV.substring(0, 10) + '...' : e.tenNV),
                datasets: [{
                    label: 'Số lượt viếng thăm',
                    data: topVisitors.map(e => e.totalVisits),
                    backgroundColor: 'rgba(79, 172, 254, 0.7)',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: { legend: { position: 'top' } }
            }
        });
    }
}

// Render tab tổng quan với biểu đồ
function renderOverview() {
    const filtered = filterData();
    const totalEmployees = filtered.length;
    const completed = filtered.filter(r => r.overallStatus === 'Hoàn thành').length;
    const avgAttendance = filtered.reduce((sum, r) => sum + parseFloat(r.attendanceRate), 0) / totalEmployees;
    const totalVisits = filtered.reduce((sum, r) => sum + r.totalVisits, 0);
    const avgVisits = totalVisits / totalEmployees;
    
    let html = `
        <div class="stats-grid">
            <div class="stat-card">
                <h3>📊 Tổng nhân viên</h3>
                <div class="value">${totalEmployees}</div>
                <div class="sub-value">người</div>
            </div>
            <div class="stat-card success">
                <h3>✅ Hoàn thành chỉ tiêu</h3>
                <div class="value">${completed}</div>
                <div class="sub-value">${totalEmployees > 0 ? ((completed/totalEmployees)*100).toFixed(1) : 0}%</div>
            </div>
            <div class="stat-card info">
                <h3>📈 Tỷ lệ chấm công TB</h3>
                <div class="value">${totalEmployees > 0 ? avgAttendance.toFixed(1) : 0}%</div>
                <div class="sub-value">Vào <8:01, Ra >16:59</div>
            </div>
            <div class="stat-card warning">
                <h3>🏪 Lượt viếng thăm TB</h3>
                <div class="value">${avgVisits.toFixed(1)}</div>
                <div class="sub-value">Chuẩn: ≥20/ngày</div>
            </div>
        </div>
        
        <div class="dashboard-grid">
            <div class="chart-card">
                <h3>🎯 Tỷ lệ hoàn thành công việc</h3>
                <div class="chart-container">
                    <canvas id="completionChart"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <h3>📍 Phân bố nhân viên theo khu vực</h3>
                <div class="chart-container">
                    <canvas id="areaChart"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <h3>📈 Top 10 nhân viên: Chấm công vs Viếng thăm</h3>
                <div class="chart-container">
                    <canvas id="performanceChart"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <h3>🔄 Đánh giá toàn diện theo khu vực</h3>
                <div class="chart-container">
                    <canvas id="radarChart"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <h3>⚡ Tương quan: Chấm công - Viếng thăm</h3>
                <div class="chart-container">
                    <canvas id="scatterChart"></canvas>
                </div>
                <div style="font-size:12px; color:#666; text-align:center;">Mỗi điểm là 1 nhân viên</div>
            </div>
            
            <div class="chart-card">
                <h3>🏆 Top nhân viên viếng thăm nhiều nhất</h3>
                <div class="chart-container">
                    <canvas id="horizontalBarChart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('overviewContent').innerHTML = html;
    
    // Tạo biểu đồ sau khi DOM đã được cập nhật
    setTimeout(() => {
        createCharts(filtered);
    }, 100);
}

// Render tab chi tiết
function renderDetail() {
    const filtered = filterData();
    
    let html = `
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã NV</th>
                        <th>Họ tên</th>
                        <th>Khu vực</th>
                        <th>Đơn vị</th>
                        <th>Chức danh</th>
                        <th>Chi tiết chấm công</th>
                        <th>Trạng thái CC</th>
                        <th>Số lượt VT</th>
                        <th>Danh sách khách VT</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    filtered.forEach((emp, idx) => {
        let attendanceDetail = '';
        if (emp.attendanceDetails && emp.attendanceDetails.length > 0) {
            emp.attendanceDetails.forEach(att => {
                const date = new Date(att.date).toLocaleDateString('vi-VN');
                attendanceDetail += `<div style="font-size:11px; margin:2px 0; border-bottom:1px solid #f0f0f0">
                    ${date}: ${att.checkin || '--'} → ${att.checkout || '--'}
                    ${att.status ? '<span class="badge badge-success">✓</span>' : '<span class="badge badge-danger">✗</span>'}
                </div>`;
            });
        } else {
            attendanceDetail = 'Không có dữ liệu';
        }
        
        let visitList = '';
        if (emp.visitDetails && emp.visitDetails.length > 0) {
            const uniqueVisits = emp.visitDetails.slice(0, 10);
            uniqueVisits.forEach(v => {
                visitList += `<div class="visit-item">🏪 ${v.ten_kh} (${v.checkin} - ${v.checkout})</div>`;
            });
            if (emp.visitDetails.length > 10) {
                visitList += `<div style="font-size:11px; color:#666;">... và ${emp.visitDetails.length - 10} khách khác</div>`;
            }
        } else {
            visitList = 'Không có dữ liệu';
        }
        
        html += `
            <tr>
                <td>${idx + 1}</td>
                <td>${emp.maNV}</td>
                <td>${emp.tenNV}</td>
                <td><span class="area-badge">${emp.area}</span></td>
                <td>${emp.maDonVi || '-'}</td>
                <td>${emp.chucDanh || '-'}</td>
                <td style="max-width:200px">
                    <div style="max-height:150px; overflow-y:auto;">
                        ${attendanceDetail}
                    </div>
                </td>
                <td>${emp.attendanceStatus === 'Đạt' ? 
                    '<span class="badge badge-success">Đạt</span>' : 
                    '<span class="badge badge-danger">Chưa đạt</span>'}
                    <br><small>(${emp.fullAttendanceDays}/${emp.totalDays} ngày)</small>
                </td>
                <td>
                    ${emp.totalVisits} lượt<br>
                    <span class="badge ${emp.visitStatus === 'Đạt' ? 'badge-success' : 'badge-danger'}">
                        ${emp.visitStatus === 'Đạt' ? '✓ Đạt chuẩn (≥20)' : '✗ Chưa đạt chuẩn'}
                    </span>
                </td>
                <td style="max-width:300px">
                    <div class="visit-list" style="max-height:200px; overflow-y:auto;">
                        ${visitList}
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += `</tbody></table></div>`;
    document.getElementById('detailContent').innerHTML = html;
}

// Load toàn bộ dữ liệu
async function loadData() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const loadBtn = document.querySelector('.btn-primary');
    
    loadBtn.disabled = true;
    loadBtn.textContent = '⏳ Đang tải...';
    
    document.getElementById('overviewContent').innerHTML = '<div class="loading"><div class="spinner"></div><p>Đang tải dữ liệu...</p></div>';
    document.getElementById('detailContent').innerHTML = '<div class="loading"><div class="spinner"></div><p>Đang tải dữ liệu...</p></div>';
    
    try {
        await fetchEmployees();
        await fetchTimesheet(fromDate, toDate);
        await fetchVisit(fromDate, toDate);
        
        processReport();
        
        const areaSelect = document.getElementById('areaFilter');
        const employeeSelect = document.getElementById('employeeFilter');
        
        const areas = [...new Set(reportData.map(r => r.area))];
        areaSelect.innerHTML = '<option value="all">Tất cả</option>' + 
            areas.map(a => `<option value="${a}">${a}</option>`).join('');
        
        employeeSelect.innerHTML = '<option value="all">Tất cả</option>' + 
            reportData.map(e => `<option value="${e.maNV}">${e.tenNV} (${e.maNV})</option>`).join('');
        
        renderOverview();
        renderDetail();
    } catch (error) {
        const errorHtml = `<div class="error">
            <strong>❌ Lỗi tải dữ liệu:</strong><br>
            ${error.message}<br>
            Vui lòng kiểm tra kết nối và thử lại.
        </div>`;
        document.getElementById('overviewContent').innerHTML = errorHtml;
        document.getElementById('detailContent').innerHTML = errorHtml;
    } finally {
        loadBtn.disabled = false;
        loadBtn.textContent = '🔍 Xem báo cáo';
    }
}

// Chuyển tab
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tab === 'overview') {
        document.querySelector('.tab-btn:first-child').classList.add('active');
        document.getElementById('overviewTab').classList.add('active');
        // Resize charts khi chuyển tab
        setTimeout(() => {
            Object.values(charts).forEach(chart => {
                if (chart) chart.resize();
            });
        }, 100);
    } else {
        document.querySelector('.tab-btn:last-child').classList.add('active');
        document.getElementById('detailTab').classList.add('active');
    }
}

// Xuất Excel
function exportExcel() {
    const filtered = filterData();
    let csv = "STT,Mã NV,Họ tên,Khu vực,Đơn vị,Chức danh,Số ngày làm,Chấm công chuẩn,Tỷ lệ CC,Số lượt VT,Trạng thái VT,Kết luận\n";
    
    filtered.forEach((emp, idx) => {
        csv += `"${idx+1}","${emp.maNV}","${emp.tenNV}","${emp.area}","${emp.maDonVi || ''}","${emp.chucDanh || ''}",${emp.totalDays},${emp.fullAttendanceDays},${emp.attendanceRate}%,${emp.totalVisits},${emp.visitStatus},${emp.overallStatus}\n`;
    });
    
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", `baocao_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Xuất biểu đồ dưới dạng ảnh
async function exportChart() {
    const canvasElements = document.querySelectorAll('canvas');
    if (canvasElements.length === 0) {
        alert('Không có biểu đồ để xuất!');
        return;
    }
    
    const html2canvas = (await import('https://cdn.skypack.dev/html2canvas')).default;
    const element = document.getElementById('overviewContent');
    
    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false
        });
        
        const link = document.createElement('a');
        link.download = `bieu_do_${new Date().toISOString().slice(0,10)}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        alert('Đã xuất biểu đồ thành công!');
    } catch (error) {
        console.error('Export error:', error);
        alert('Có lỗi khi xuất biểu đồ!');
    }
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentDate').innerText = new Date().toLocaleString('vi-VN');
    
    window.loadData = loadData;
    window.switchTab = switchTab;
    window.exportExcel = exportExcel;
    window.exportChart = exportChart;
    
    document.getElementById('areaFilter').addEventListener('change', () => {
        if (reportData.length > 0) {
            renderOverview();
            renderDetail();
        }
    });
    document.getElementById('employeeFilter').addEventListener('change', () => {
        if (reportData.length > 0) {
            renderOverview();
            renderDetail();
        }
    });
});
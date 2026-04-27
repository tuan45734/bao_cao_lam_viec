// main.js - File chính khởi tạo và điều khiển

// Data storage
let employeesData = [];
let timesheetData = [];
let reportData = [];
Chart.register(ChartDataLabels);
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
    ['NPP Ngọc Phúc', 'KV4'], ['NPP Nguyễn Đình Hân', 'KV4'], ['NPP Tân Thúy', 'KV4'],
    ['NPP Thăng Hương', 'KV4'], ['NPP Thảo Thắng', 'KV4'], ['NPP Tùng Phương', 'KV4'],
    ['NPP Đồng Lợi', 'KV5'], ['NPP Hải Hằng', 'KV5'], ['NPP Hiền Cường', 'KV5'],
    ['NPP Hoàng Minh', 'KV5'], ['NPP Oanh Định', 'KV5'], ['NPP Sơn Lâm', 'KV5'],
    ['NPP Thái Hoà', 'KV5'], ['NPP Thảo Xuân', 'KV5'], ['NPP Duy Khoa', 'KV5'],
    ['NPP Tuấn Vân', 'KV5'], ['NPP Vũ Đức Nam', 'KV5'], ['NPP Anh Minh HT', 'KV6'],
    ['NPP Hà Thanh', 'KV6'], ['NPP Hồng Đức', 'KV6'], ['NPP Linh Trang', 'KV6'],
    ['NPP Mạnh Hà 1', 'KV6'], ['NPP Mạnh Hà 2', 'KV6'], ['NPP Minh Châu', 'KV6'],
    ['NPP Minh Lộc', 'KV6'], ['NPP Nhung Tùng', 'KV6'], ['NPP Phương Hà', 'KV6'],
    ['NPP Tân Bích An', 'KV6'], ['NPP Thanh Bình', 'KV6'], ['NPP Thành Thanh', 'KV6'],
    ['NPP Thông Thơm', 'KV6'], ['NPP Trường Hằng', 'KV6'],
    ['KV1', 'KV1'], ['KV2', 'KV2'], ['KV3', 'KV3'], ['KV4', 'KV4'], ['KV5', 'KV5'], ['KV6', 'KV6']
];

// ==================== HÀM TIỆN ÍCH ====================
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

function getArea(maDonVi) {
    const found = AREA_MAPPING.find(item => item[0] === maDonVi);
    if (found) return found[1];
    if (maDonVi && maDonVi.startsWith('KV')) return maDonVi;
    return null;
}

function getDayOfWeek(dateStr) {
    const date = new Date(dateStr);
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return days[date.getDay()];
}

function normalizeDate(dateInput) {
    if (!dateInput) return null;
    if (dateInput instanceof Date) {
        return dateInput.toISOString().split('T')[0];
    }
    const dateStr = String(dateInput);
    if (dateStr.includes('T')) {
        return dateStr.split('T')[0];
    }
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return dateStr;
    }
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateStr;
}

function formatDateWithWeekday(dateInput) {
    const normalized = normalizeDate(dateInput);
    if (!normalized) return 'Ngày không hợp lệ';
    const date = new Date(normalized);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const weekday = getDayOfWeek(normalized);
    return `${day}/${month} - ${weekday}`;
}

function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

function hasFullAttendance(checkin, checkout) {
    return (checkin && checkin !== '') && (checkout && checkout !== '');
}

function hasAnyAttendance(checkin, checkout) {
    return (checkin && checkin !== '') || (checkout && checkout !== '');
}

function getEmployeeType(maNV) {
    if (maNV && maNV.length === 2 && maNV.startsWith('A')) {
        return { type: '2chars', group: 'normal', priority: 1 };
    }
    if (maNV && maNV.length === 4 && maNV.startsWith('A')) {
        return { type: '4chars', group: 'normal', priority: 2 };
    }
    if (maNV && maNV.startsWith('KEY')) {
        return { type: 'KEY', group: 'key', priority: 3 };
    }
    if (maNV && maNV.includes('.') && maNV.length >= 7) {
        return { type: '7chars', group: 'key', priority: 4 };
    }
    return { type: 'default', group: 'normal', priority: 5 };
}

function getVisitStandard(maNV) {
    if (maNV && maNV.length === 2 && maNV.startsWith('A')) return 0;
    if (maNV && maNV.length === 4 && maNV.startsWith('A')) return 5;
    if (maNV && maNV.startsWith('KEY')) return 8;
    if (maNV && maNV.includes('.') && maNV.length >= 7) return 20;
    return 0;
}

function getAllDatesInRange(fromDate, toDate) {
    const dates = [];
    const start = new Date(fromDate);
    const end = new Date(toDate);
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
}

function checkAttendanceErrorWithLevel(checkinTime, checkoutTime, errorCount, group, hasFull) {
    if (!hasFull) {
        return { hasError: false, penalty: 0, colorClass: 'no-attendance', isLate: false, isEarly: false };
    }
    
    let isLate = false;
    let isEarly = false;
    
    if (checkinTime && checkinTime !== '') {
        const [hours, minutes] = checkinTime.split(':').map(Number);
        const timeValue = hours * 60 + minutes;
        isLate = timeValue > 8 * 60 + 5;
    }
    
    if (checkoutTime && checkoutTime !== '') {
        const [hours, minutes] = checkoutTime.split(':').map(Number);
        const timeValue = hours * 60 + minutes;
        isEarly = timeValue < 17 * 60;
    }
    
    const hasError = isLate || isEarly;
    
    let penalty = 0;
    let colorClass = '';
    
    if (hasError) {
        if (group === 'key') {
            if (errorCount === 1) {
                penalty = 0;
                colorClass = 'warning';
            } else if (errorCount === 2) {
                penalty = 0.5;
                colorClass = 'warning-level2';
            } else {
                penalty = 1;
                colorClass = 'danger';
            }
        } else {
            if (errorCount === 1) {
                penalty = 0;
                colorClass = 'warning';
            } else {
                penalty = 1;
                colorClass = 'danger';
            }
        }
    } else {
        colorClass = 'success';
    }
    
    return { hasError, penalty, colorClass, isLate, isEarly };
}

function checkVisitDailyError(visitCount, standard, errorCount, hasFullAttendance) {
    if (!hasFullAttendance) {
        return { penalty: 0, colorClass: 'no-attendance' };
    }
    
    const isUnderStandard = visitCount < standard;
    
    let penalty = 0;
    let colorClass = '';
    
    if (isUnderStandard) {
        if (errorCount === 1) {
            penalty = 0;
            colorClass = 'warning';
        } else if (errorCount === 2) {
            penalty = 0.5;
            colorClass = 'warning-level2';
        } else {
            penalty = 1;
            colorClass = 'danger';
        }
    } else {
        colorClass = 'success';
    }
    
    return { penalty, colorClass };
}

function checkVisitMonthlyError(visitsByDate, attendanceByDate, standard, requiredDays) {
    let achievedDays = 0;
    const dailyResults = [];
    
    for (const [date, visit] of visitsByDate) {
        const att = attendanceByDate.get(date);
        const hasFullAttendanceOnDate = att && att.hasFullAttendance === true;
        const isAchieved = visit.count >= standard;
        
        const isValidAchieved = hasFullAttendanceOnDate && isAchieved;
        if (isValidAchieved) {
            achievedDays++;
        }
        
        let penalty = 0;
        let colorClass = '';
        
        if (!hasFullAttendanceOnDate) {
            penalty = 0;
            colorClass = 'no-attendance';
        } else if (isAchieved) {
            penalty = 0;
            colorClass = 'success';
        } else {
            penalty = 0;
            colorClass = 'danger';
        }
        
        dailyResults.push({
            date: date,
            count: visit.count,
            hasFullAttendance: hasFullAttendanceOnDate,
            isAchieved: isAchieved,
            penalty: penalty,
            colorClass: colorClass
        });
    }
    
    const missingDays = Math.max(0, requiredDays - achievedDays);
    const notAchievedWithFullAttendance = dailyResults.filter(d => d.hasFullAttendance && !d.isAchieved);
    notAchievedWithFullAttendance.sort((a, b) => a.count - b.count);
    
    for (let i = 0; i < Math.min(missingDays, notAchievedWithFullAttendance.length); i++) {
        notAchievedWithFullAttendance[i].penalty = 1;
        notAchievedWithFullAttendance[i].colorClass = 'danger';
    }
    
    return { dailyResults, missingDays, totalPenalty: missingDays };
}

function getVisitsFromHardcoded(maNV, fromDate, toDate) {
    const visitRecord = HARDCODED_VISITS.find(v => v.ma_nhan_vien === maNV);
    if (!visitRecord) return new Map();
    
    const visitsByDate = new Map();
    const start = new Date(fromDate);
    const end = new Date(toDate);
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const visits = visitRecord[dateStr] || 0;
        visitsByDate.set(dateStr, { date: dateStr, count: visits });
    }
    
    return visitsByDate;
}

// ==================== API CALLS ====================
async function fetchEmployees() {
    try {
        updateProgress(10, 'Đang lấy danh sách nhân viên...');
        await delay(1000);
        
        const response = await fetch(`${API_CONFIG.baseUrl}/Sale`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': API_CONFIG.auth
            }
        });
        const data = await response.json();
        
        if (data.status) {
            employeesData = data.data.filter(emp => {
                const ma = emp.ma || '';
                const maDonVi = emp.ma_don_vi || '';
                const area = getArea(maDonVi);
                const isValidMa = (ma.startsWith('A') || ma.startsWith('KEY')) 
                    && !ma.startsWith('AD') 
                    && !ma.startsWith('TH');
                return isValidMa && area !== null;
            });
            updateProgress(30, `Đã lấy ${employeesData.length} nhân viên`);
            return employeesData;
        }
        throw new Error(data.message);
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}

async function fetchTimesheet(fromDate, toDate) {
    try {
        updateProgress(40, 'Đang lấy dữ liệu chấm công...');
        await delay(1000);
        
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

// ==================== XỬ LÝ DỮ LIỆU ====================
function processReport() {
    const employeeMap = new Map();
    employeesData.forEach(emp => {
        const area = getArea(emp.ma_don_vi);
        if (area !== null) {
            employeeMap.set(emp.ma, {
                ma: emp.ma,
                ten: emp.ten,
                maDonVi: emp.ma_don_vi,
                chucDanh: emp.chuc_danh,
                soDienThoai: emp.so_dien_thoai,
                area: area
            });
        }
    });

    const attendanceMap = new Map();
    timesheetData.forEach(record => {
        const maNV = record.ma_nhan_vien;
        if (!attendanceMap.has(maNV)) {
            attendanceMap.set(maNV, { days: new Map(), errorCount: 0 });
        }
        
        for (let i = 1; i <= 31; i++) {
            const dayData = record[i];
            if (dayData && dayData.ngay) {
                const rawDate = dayData.ngay;
                let dateKey = normalizeDate(rawDate);
                if (!dateKey) continue;
                
                const dataCC = dayData.data_cc || [];
                const checkinRecord = dataCC.find(c => c.loai === 'Vào');
                const checkoutRecord = dataCC.find(c => c.loai === 'Ra');
                let checkin = '', checkout = '';
                if (checkinRecord && checkinRecord.thoi_gian) checkin = checkinRecord.thoi_gian;
                if (checkoutRecord && checkoutRecord.thoi_gian) checkout = checkoutRecord.thoi_gian;
                
                const hasFull = hasFullAttendance(checkin, checkout);
                const hasAny = hasAnyAttendance(checkin, checkout);
                const empType = getEmployeeType(maNV);
                
                let result = { hasError: false, penalty: 0, colorClass: 'no-attendance', isLate: false, isEarly: false };
                
                if (hasFull) {
                    const currentErrorCount = attendanceMap.get(maNV).errorCount + 1;
                    result = checkAttendanceErrorWithLevel(checkin, checkout, currentErrorCount, empType.group, true);
                    if (result.hasError) {
                        attendanceMap.get(maNV).errorCount++;
                    }
                }
                
                attendanceMap.get(maNV).days.set(dateKey, {
                    date: rawDate,
                    normalizedDate: dateKey,
                    checkin,
                    checkout,
                    penalty: result.penalty,
                    colorClass: result.colorClass,
                    isLate: result.isLate,
                    isEarly: result.isEarly,
                    hasAnyAttendance: hasAny,
                    hasFullAttendance: hasFull
                });
            }
        }
    });

    reportData = [];
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const allDates = getAllDatesInRange(fromDate, toDate);
    
    for (const [maNV, emp] of employeeMap) {
        const attendance = attendanceMap.get(maNV) || { days: new Map(), errorCount: 0 };
        const visitsByDate = getVisitsFromHardcoded(maNV, fromDate, toDate);
        const empType = getEmployeeType(maNV);
        const visitStandard = getVisitStandard(maNV);
        
        const attendanceByDate = new Map();
        for (const [date, day] of attendance.days) {
            const d = new Date(date);
            if (d >= startDate && d <= endDate) {
                attendanceByDate.set(date, day);
            }
        }
        
        let processedVisits = [];
        let visitTotalPenalty = 0;
        
        if (empType.group === 'key' && visitStandard > 0) {
            let errorCount = 0;
            for (const date of allDates) {
                const visit = visitsByDate.get(date) || { count: 0 };
                const att = attendanceByDate.get(date);
                const hasFullAttendanceOnDate = att && att.hasFullAttendance === true;
                const currentErrorCount = errorCount + 1;
                const result = checkVisitDailyError(visit.count, visitStandard, currentErrorCount, hasFullAttendanceOnDate);
                
                if (hasFullAttendanceOnDate && visit.count < visitStandard) {
                    errorCount++;
                }
                
                processedVisits.push({
                    date: date,
                    count: visit.count,
                    penalty: result.penalty,
                    colorClass: result.colorClass
                });
                visitTotalPenalty += result.penalty;
            }
        } 
        else if (empType.type === '4chars' && visitStandard > 0) {
            const monthlyResult = checkVisitMonthlyError(visitsByDate, attendanceByDate, visitStandard, 12);
            const resultMap = new Map();
            for (const r of monthlyResult.dailyResults) {
                resultMap.set(r.date, r);
            }
            for (const date of allDates) {
                const existing = resultMap.get(date);
                if (existing) {
                    processedVisits.push(existing);
                } else {
                    processedVisits.push({
                        date: date,
                        count: 0,
                        penalty: 0,
                        colorClass: 'no-attendance',
                        hasFullAttendance: false
                    });
                }
            }
            visitTotalPenalty = monthlyResult.totalPenalty;
        }
        else {
            for (const date of allDates) {
                const visit = visitsByDate.get(date) || { count: 0 };
                const att = attendanceByDate.get(date);
                const hasFullAttendanceOnDate = att && att.hasFullAttendance === true;
                processedVisits.push({
                    date: date,
                    count: visit.count,
                    penalty: 0,
                    colorClass: hasFullAttendanceOnDate ? 'success' : 'no-attendance'
                });
            }
        }
        
        processedVisits.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        let totalWork = 0;
        const dailyWork = [];
        
        for (const date of allDates) {
            const att = attendanceByDate.get(date);
            const vis = processedVisits.find(v => v.date === date);
            
            const hasFull = att && att.hasFullAttendance === true;
            
            let attPenalty = 0;
            let visitPenalty = 0;
            let dayWork = 0;
            
            if (hasFull) {
                attPenalty = att ? att.penalty : 0;
                visitPenalty = vis ? vis.penalty : 0;
                dayWork = 1 - attPenalty - visitPenalty;
                dayWork = Math.max(0, dayWork);
            }
            
            totalWork += dayWork;
            
            dailyWork.push({
                date,
                workValue: dayWork,
                attPenalty,
                visitPenalty,
                hasFullAttendance: hasFull
            });
        }
        
        const attendanceDetails = [];
        for (const date of allDates) {
            const att = attendanceByDate.get(date);
            if (att) {
                attendanceDetails.push(att);
            } else {
                attendanceDetails.push({
                    date: new Date(date),
                    normalizedDate: date,
                    checkin: '',
                    checkout: '',
                    penalty: 0,
                    colorClass: 'no-attendance',
                    isLate: false,
                    isEarly: false,
                    hasAnyAttendance: false,
                    hasFullAttendance: false
                });
            }
        }
        
        reportData.push({
            maNV: emp.ma,
            tenNV: emp.ten,
            area: emp.area,
            maDonVi: emp.maDonVi,
            chucDanh: emp.chucDanh,
            empType: empType,
            attendanceDetails: attendanceDetails,
            visitDetails: processedVisits,
            dailyWork: dailyWork,
            totalWork: totalWork.toFixed(1)
        });
    }
    
    updateProgress(100, 'Hoàn tất xử lý dữ liệu!');
    return reportData;
}

// Export Excel function
function exportExcelReport() {
    const filtered = getFilteredData();
    
    if (!filtered || filtered.length === 0) {
        alert('Không có dữ liệu để xuất. Vui lòng nhấn "Xem báo cáo" trước khi xuất Excel.');
        return;
    }
    
    const groupedByKV = {};
    filtered.forEach(emp => {
        if (!groupedByKV[emp.area]) {
            groupedByKV[emp.area] = {};
        }
        if (!groupedByKV[emp.area][emp.maDonVi]) {
            groupedByKV[emp.area][emp.maDonVi] = [];
        }
        groupedByKV[emp.area][emp.maDonVi].push(emp);
    });
    
    exportSummaryFile(groupedByKV);
    exportDetailFile(groupedByKV);
}

function exportSummaryFile(groupedByKV) {
    const sortedKV = Object.keys(groupedByKV).sort();
    
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Báo cáo tổng hợp</title>
        <style>
            * { font-family: 'Segoe UI', Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #aaa; padding: 8px; vertical-align: top; }
            th { background: #4472C4; color: white; font-weight: bold; text-align: center; }
            .kv-row td { background: #D9E1F2 !important; font-weight: bold; }
            .npp-row td { background: #E9E9E9 !important; font-weight: bold; }
            .stt-cell { text-align: center; vertical-align: middle; }
            .number-cell { text-align: center; }
        </style>
    </head>
    <body>
        <h2>📊 BÁO CÁO TỔNG HỢP CHẤM CÔNG & VIẾNG THĂM</h2>
        <p>Ngày xuất: ${new Date().toLocaleString('vi-VN')}</p>
        <p>Khoảng thời gian: ${document.getElementById('fromDate').value} → ${document.getElementById('toDate').value}</p>
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã NV</th>
                    <th>Họ tên</th>
                    <th>Chức vụ</th>
                    <th>Số ngày chấm công</th>
                    <th>Vào muộn/<br>Ra sớm</th>
                    <th>Quên chấm công</th>
                    <th>Viếng thăm<br>không đủ</th>
                    <th>Tổng công</th>
                    <th>Ghi chú</th>
                </tr>
            </thead>
            <tbody>`;
    
    for (const kv of sortedKV) {
        html += `<tr class="kv-row"><td colspan="10"><strong>🏢 KHU VỰC: ${kv}</strong></td></tr>`;
        
        const npps = groupedByKV[kv];
        const sortedNPP = Object.keys(npps).sort();
        
        for (const npp of sortedNPP) {
            html += `<tr class="npp-row"><td colspan="10"><strong>📌 ${npp}</strong></td></tr>`;
            
            const employees = npps[npp];
            let nppStt = 1;
            
            for (const emp of employees) {
                const workingDaysCount = getWorkingDaysCount(emp);
                
                let lateEarlyCount = 0;
                if (emp.attendanceDetails) {
                    emp.attendanceDetails.forEach(att => {
                        if (att.hasFullAttendance && (att.isLate || att.isEarly)) {
                            lateEarlyCount++;
                        }
                    });
                }
                
                let missingAttendanceCount = 0;
                if (emp.attendanceDetails) {
                    emp.attendanceDetails.forEach(att => {
                        if (att.hasAnyAttendance && !att.hasFullAttendance) {
                            missingAttendanceCount++;
                        }
                    });
                }
                
                let insufficientVisitCount = 0;
                if (emp.visitDetails && emp.attendanceDetails) {
                    const attendanceMap = new Map();
                    emp.attendanceDetails.forEach(att => {
                        const dateKey = att.normalizedDate || att.date;
                        attendanceMap.set(dateKey, att);
                    });
                    
                    emp.visitDetails.forEach(visit => {
                        const att = attendanceMap.get(visit.date);
                        const hasFull = att && att.hasFullAttendance === true;
                        if (hasFull && visit.colorClass !== 'success') {
                            insufficientVisitCount++;
                        }
                    });
                }
                
                html += `
                    <tr>
                        <td class="stt-cell">${nppStt}</td>
                        <td>${emp.maNV}</td>
                        <td>${emp.tenNV}</td>
                        <td>${emp.chucDanh || ''}</td>
                        <td class="number-cell"><strong>${workingDaysCount}</strong></td>
                        <td class="number-cell">${lateEarlyCount}</td>
                        <td class="number-cell">${missingAttendanceCount}</td>
                        <td class="number-cell">${insufficientVisitCount}</td>
                        <td class="number-cell"><strong>${emp.totalWork}</strong></td>
                        <td></td>
                    </tr>
                `;
                nppStt++;
            }
        }
    }
    
    html += `
            </tbody>
        </table>
    </body>
    </html>`;
    
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `baocao_tonghop_${new Date().toISOString().slice(0,10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function exportDetailFile(groupedByKV) {
    const sortedKV = Object.keys(groupedByKV).sort();
    
    function getTextColor(colorClass) {
        switch(colorClass) {
            case 'success': return '#006100';
            case 'warning': return '#B8860B';
            case 'warning-level2': return '#FF6600';
            case 'danger': return '#CC0000';
            case 'no-attendance': return '#999999';
            default: return '#000000';
        }
    }
    
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Báo cáo chi tiết</title>
        <style>
            * { font-family: 'Segoe UI', Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #aaa; padding: 6px; vertical-align: top; }
            th { background: #4472C4; color: white; font-weight: bold; text-align: center; }
            .kv-row td { background: #D9E1F2 !important; font-weight: bold; }
            .npp-row td { background: #E9E9E9 !important; font-weight: bold; }
            .stt-cell { text-align: center; vertical-align: middle; font-weight: bold; }
            .total-cell { text-align: center; vertical-align: middle; font-weight: bold; }
            .line-row { display: block; padding: 2px 4px; margin: 1px 0; }
        </style>
    </head>
    <body>
        <h2>📋 BÁO CÁO CHI TIẾT CHẤM CÔNG & VIẾNG THĂM</h2>
        <p>Ngày xuất: ${new Date().toLocaleString('vi-VN')}</p>
        <p>Khoảng thời gian: ${document.getElementById('fromDate').value} → ${document.getElementById('toDate').value}</p>
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã NV</th>
                    <th>Họ tên</th>
                    <th>Chi tiết chấm công</th>
                    <th>Chi tiết viếng thăm</th>
                    <th>Công chi tiết</th>
                    <th>Tổng công</th>
                </tr>
            </thead>
            <tbody>`;
    
    for (const kv of sortedKV) {
        html += `<tr class="kv-row"><td colspan="7"><strong>🏢 KHU VỰC: ${kv}</strong></td></tr>`;
        
        const npps = groupedByKV[kv];
        const sortedNPP = Object.keys(npps).sort();
        
        for (const npp of sortedNPP) {
            html += `<tr class="npp-row"><td colspan="7"><strong>📌 ${npp}</strong></td></tr>`;
            
            const employees = npps[npp];
            let nppStt = 1;
            
            for (const emp of employees) {
                let attendanceHtml = '';
                if (emp.attendanceDetails && emp.attendanceDetails.length > 0) {
                    emp.attendanceDetails.forEach(att => {
                        const displayDate = formatDateWithWeekday(att.normalizedDate || att.date);
                        let textColor = '';
                        let text = '';
                        
                        if (att.hasFullAttendance) {
                            textColor = getTextColor(att.colorClass);
                            text = `${displayDate}: ${att.checkin || '--'} → ${att.checkout || '--'}`;
                        } else if (att.hasAnyAttendance) {
                            textColor = '#999999';
                            text = `${displayDate}: Lỗi chấm công (${att.checkin || '--'} → ${att.checkout || '--'})`;
                        } else {
                            textColor = '#999999';
                            text = `${displayDate}: Không chấm công`;
                        }
                        attendanceHtml += `<div class="line-row" style="color: ${textColor};">${text}</div>`;
                    });
                } else {
                    attendanceHtml = '<div>Không có dữ liệu</div>';
                }
                
                let visitHtml = '';
                if (emp.visitDetails && emp.visitDetails.length > 0) {
                    emp.visitDetails.forEach(visit => {
                        const displayDate = formatDateWithWeekday(visit.date);
                        let textColor = getTextColor(visit.colorClass);
                        visitHtml += `<div class="line-row" style="color: ${textColor};">${displayDate}: ${visit.count} lượt</div>`;
                    });
                } else {
                    visitHtml = '<div>Không có dữ liệu</div>';
                }
                
                let workHtml = '';
                if (emp.dailyWork && emp.dailyWork.length > 0) {
                    emp.dailyWork.forEach(day => {
                        const displayDate = formatDateWithWeekday(day.date);
                        let textColor = '';
                        if (!day.hasFullAttendance) {
                            textColor = '#999999';
                        } else if (day.workValue < 1) {
                            textColor = '#CC0000';
                        } else {
                            textColor = '#006100';
                        }
                        workHtml += `<div class="line-row" style="color: ${textColor};">${displayDate}: ${day.workValue}</div>`;
                    });
                }
                
                html += `
                    <tr>
                        <td class="stt-cell">${nppStt}</td>
                        <td>${emp.maNV}</td>
                        <td>${emp.tenNV}</td>
                        <td style="vertical-align:top;">${attendanceHtml}</td>
                        <td style="vertical-align:top;">${visitHtml}</td>
                        <td style="vertical-align:top;">${workHtml}</td>
                        <td class="total-cell"><strong>${emp.totalWork}</strong></td>
                    </tr>
                `;
                nppStt++;
            }
        }
    }
    
    html += `
            </tbody>
        </table>
    </body>
    </html>`;
    
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `baocao_chitiet_${new Date().toISOString().slice(0,10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function getWorkingDaysCount(emp) {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const allDates = getAllDatesInRange(fromDate, toDate);
    
    let workingDaysCount = 0;
    
    for (const date of allDates) {
        const attendance = emp.attendanceDetails?.find(att => {
            const attDate = att.normalizedDate || att.date;
            return attDate === date;
        });
        
        const hasAttendance = attendance && (attendance.hasAnyAttendance === true || attendance.hasFullAttendance === true);
        
        const visit = emp.visitDetails?.find(v => v.date === date);
        const hasVisit = visit && visit.count > 0;
        
        if (hasAttendance || hasVisit) {
            workingDaysCount++;
        }
    }
    
    return workingDaysCount;
}

// ==================== KHỞI TẠO ====================
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentDate').innerText = new Date().toLocaleString('vi-VN');
    
    document.getElementById('loadReportBtn').addEventListener('click', async () => {
        const fromDate = document.getElementById('fromDate').value;
        const toDate = document.getElementById('toDate').value;
        const loadBtn = document.getElementById('loadReportBtn');
        
        loadBtn.disabled = true;
        loadBtn.textContent = '⏳ Đang tải...';
        
        document.getElementById('detailContent').innerHTML = '<div class="loading"><div class="spinner"></div><p>Đang tải dữ liệu...</p></div>';
        document.getElementById('overviewContent').innerHTML = '<div class="loading"><div class="spinner"></div><p>Đang tải dữ liệu...</p></div>';
        
        try {
            await fetchEmployees();
            await fetchTimesheet(fromDate, toDate);
            processReport();
            
            // Cập nhật filters
            initFilters();
            
            // Render các tab
            renderDetail();
            renderOverview();
        } catch (error) {
            const errorHtml = `<div class="error"><strong>❌ Lỗi tải dữ liệu:</strong><br>${error.message}<br>Vui lòng kiểm tra kết nối và thử lại.</div>`;
            document.getElementById('detailContent').innerHTML = errorHtml;
            document.getElementById('overviewContent').innerHTML = errorHtml;
        } finally {
            loadBtn.disabled = false;
            loadBtn.textContent = '🔍 Xem báo cáo';
        }
    });
    
    document.getElementById('exportExcelBtn').addEventListener('click', exportExcelReport);
    
    // Chuyển tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`${tabId}Tab`).style.display = 'block';
            
            if (tabId === 'overview' && reportData && reportData.length > 0) {
                renderOverview();
            }
        });
    });
});
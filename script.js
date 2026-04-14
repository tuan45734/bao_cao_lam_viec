// script.js
// API Configuration
const API_CONFIG = {
    baseUrl: 'https://openapi.mobiwork.vn/OpenAPI/V1',
    auth: 'Basic NjlhZTZlNmM4YTY0NjVmNDFlNTNhZmI0OjFuYzFnc3J1N2p2Ym10eTdncGV5NWk='
};

// Khu vực mapping - ĐÃ THÊM MAPPING KV TRỰC TIẾP
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
    ['NPP Đồng Lợi', 'KV5'],['NPP Anh Đức', 'KV5'], ['NPP Hải Hằng', 'KV5'], ['NPP Hiền Cường', 'KV5'],
    ['NPP Hoàng Minh', 'KV5'], ['NPP Oanh Định', 'KV5'], ['NPP Sơn Lâm', 'KV5'],
    ['NPP Thái Hoà', 'KV5'], ['NPP Thảo Xuân', 'KV5'], ['NPP Tiên Lan', 'KV5'],
    ['NPP Tuấn Vân', 'KV5'], ['NPP Vũ Đức Nam', 'KV5'], ['NPP Anh Minh HT', 'KV6'],
    ['NPP Hà Thanh', 'KV6'], ['NPP Hồng Đức', 'KV6'], ['NPP Linh Trang', 'KV6'],
    ['NPP Mạnh Hà 1', 'KV6'], ['NPP Mạnh Hà 2', 'KV6'], ['NPP Minh Châu', 'KV6'],
    ['NPP Minh Lộc', 'KV6'], ['NPP Nhung Tùng', 'KV6'], ['NPP Phương Hà', 'KV6'],
    ['NPP Tân Bích An', 'KV6'], ['NPP Thanh Bình', 'KV6'], ['NPP Thành Thanh', 'KV6'],
    ['NPP Thông Thơm', 'KV6'], ['NPP Trường Hằng', 'KV6'],
    
    // ===== THÊM MAPPING CHO KV TRỰC TIẾP (cho nhân viên mã 2 ký tự) =====
    ['KV1', 'KV1'], ['KV2', 'KV2'], ['KV3', 'KV3'], ['KV4', 'KV4'], ['KV5', 'KV5'], ['KV6', 'KV6']
];

// Data storage
let employeesData = [];
let timesheetData = [];
let reportData = [];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    // Tìm theo tên NPP
    const found = AREA_MAPPING.find(item => item[0] === maDonVi);
    if (found) return found[1];
    
    // Nếu maDonVi là KV trực tiếp (VD: KV1, KV2...)
    if (maDonVi && maDonVi.startsWith('KV')) {
        return maDonVi;
    }
    
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

function hasFullAttendance(checkin, checkout) {
    return (checkin && checkin !== '') && (checkout && checkout !== '');
}

function hasAnyAttendance(checkin, checkout) {
    return (checkin && checkin !== '') || (checkout && checkout !== '');
}

function getEmployeeType(maNV) {
    // Mã 2 ký tự (A3, A4, A5...)
    if (maNV && maNV.length === 2 && maNV.startsWith('A')) {
        return { type: '2chars', group: 'normal', priority: 1 };
    }
    // Mã 4 ký tự (A201, A212...)
    if (maNV && maNV.length === 4 && maNV.startsWith('A')) {
        return { type: '4chars', group: 'normal', priority: 2 };
    }
    // Mã KEY
    if (maNV && maNV.startsWith('KEY')) {
        return { type: 'KEY', group: 'key', priority: 3 };
    }
    // Mã 7 ký tự có dấu chấm
    if (maNV && maNV.includes('.') && maNV.length >= 7) {
        return { type: '7chars', group: 'key', priority: 4 };
    }
    return { type: 'default', group: 'normal', priority: 5 };
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
                colorClass = 'warning';      // giữ nguyên
            } else if (errorCount === 2) {
                penalty = 0.5;
                colorClass = 'warning-level2'; // giữ nguyên
            } else {
                penalty = 1;
                colorClass = 'danger';        // giữ nguyên
            }
        } else {
            if (errorCount === 1) {
                penalty = 0;
                colorClass = 'warning';      // giữ nguyên
            } else {
                penalty = 1;
                colorClass = 'danger';        // giữ nguyên
            }
        }
    } else {
        colorClass = 'success';               // giữ nguyên
    }
    
    return { hasError, penalty, colorClass, isLate, isEarly };
}

function getVisitStandard(maNV) {
    if (maNV && maNV.length === 2 && maNV.startsWith('A')) return 0;
    if (maNV && maNV.length === 4 && maNV.startsWith('A')) return 5;
    if (maNV && maNV.startsWith('KEY')) return 8;
    if (maNV && maNV.includes('.') && maNV.length >= 7) return 20;
    return 0;
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

function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
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

function getAllDatesInRange(fromDate, toDate) {
    const dates = [];
    const start = new Date(fromDate);
    const end = new Date(toDate);
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
}

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
                let currentErrorCount = attendanceMap.get(maNV).errorCount;
                
                if (hasFull) {
                    currentErrorCount = attendanceMap.get(maNV).errorCount + 1;
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

function filterData() {
    const area = document.getElementById('areaFilter').value;
    const employee = document.getElementById('employeeFilter').value;
    
    return reportData.filter(emp => {
        if (area !== 'all' && emp.area !== area) return false;
        if (employee !== 'all' && emp.maNV !== employee) return false;
        return true;
    });
}

function sortEmployeesByPriority(employees) {
    return employees.sort((a, b) => {
        const priorityA = a.empType.priority || 5;
        const priorityB = b.empType.priority || 5;
        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }
        return a.maNV.localeCompare(b.maNV);
    });
}

function renderDetail() {
    const filtered = filterData();
    
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
    
    let html = `<div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã NV</th>
                    <th>Họ tên</th>
                    <th>Chi tiết chấm công</th>
                    <th>Chi tiết viếng thăm</th>
                    <th>Tổng công</th>
                </tr>
            </thead>
            <tbody>`;
    
    let stt = 0;
    const sortedKV = Object.keys(groupedByKV).sort();
    
    for (const kv of sortedKV) {
        html += `<tr class="group-row"><td colspan="6"><strong>🏢 KHU VỰC: ${kv}</strong></td></tr>`;
        
        const npps = groupedByKV[kv];
        const sortedNPP = Object.keys(npps).sort();
        
        for (const npp of sortedNPP) {
            html += `<tr class="group-row" style="background:#f5f5f5;"><td colspan="6"><strong>📌 ${npp}</strong></td></tr>`;
            
            const employees = sortEmployeesByPriority(npps[npp]);
            
            for (const emp of employees) {
                stt++;
                
                let attendanceHtml = '';
                if (emp.attendanceDetails && emp.attendanceDetails.length > 0) {
                    emp.attendanceDetails.forEach(att => {
                        const displayDate = formatDateWithWeekday(att.normalizedDate || att.date);
                        if (att.hasFullAttendance) {
                            const timeStr = `${att.checkin || '--'} → ${att.checkout || '--'}`;
                            attendanceHtml += `<div class="attendance-item ${att.colorClass}">
                                ${displayDate}: ${timeStr}
                            </div>`;
                        } else if (att.hasAnyAttendance) {
                            attendanceHtml += `<div class="attendance-item no-attendance">
                                ${displayDate}: Thiếu chấm công (${att.checkin || '--'} → ${att.checkout || '--'})
                            </div>`;
                        } else {
                            attendanceHtml += `<div class="attendance-item no-attendance">
                                ${displayDate}: Không chấm công
                            </div>`;
                        }
                    });
                } else {
                    attendanceHtml = '<div>Không có dữ liệu</div>';
                }
                
                let visitHtml = '';
                if (emp.visitDetails && emp.visitDetails.length > 0) {
                    emp.visitDetails.forEach(visit => {
                        const displayDate = formatDateWithWeekday(visit.date);
                        if (visit.colorClass === 'no-attendance') {
                            visitHtml += `<div class="visit-item no-attendance" style="background:#f0f0f0; color:#999;">
                                ${displayDate}: ${visit.count} lượt
                            </div>`;
                        } else {
                            visitHtml += `<div class="visit-item ${visit.colorClass}">
                                ${displayDate}: ${visit.count} lượt
                            </div>`;
                        }
                    });
                } else {
                    visitHtml = '<div>Không có dữ liệu</div>';
                }
                
                let dailyWorkHtml = '';
                if (emp.dailyWork && emp.dailyWork.length > 0) {
                    emp.dailyWork.forEach(day => {
                        const displayDate = formatDateWithWeekday(day.date);
                        dailyWorkHtml += `<div class="visit-item" style="font-size:11px; margin:2px 0;">
                            ${displayDate}: ${day.workValue} công
                        </div>`;
                    });
                }
                
                html += `
                    <tr>
                        <td>${stt}</td>
                        <td>${emp.maNV}</td>
                        <td>${emp.tenNV}<br><span class="area-badge">${emp.area}</span></td>
                        <td style="max-width:250px">
                            <div style="max-height:200px; overflow-y:auto;">
                                ${attendanceHtml}
                            </div>
                        </td>
                        <td style="max-width:250px">
                            <div style="max-height:200px; overflow-y:auto;">
                                ${visitHtml}
                            </div>
                        </td>
                        <td style="min-width:150px">
                            <div style="max-height:150px; overflow-y:auto;">
                                ${dailyWorkHtml}
                            </div>
                            <div class="total-work-footer">
                                <strong> Tổng: ${emp.totalWork} công</strong>
                            </div>
                        </td>
                    </tr>
                `;
            }
        }
    }
    
    html += `</tbody>
        </table>
    </div>`;
    
    document.getElementById('detailContent').innerHTML = html;
}

async function loadData() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const loadBtn = document.getElementById('loadReportBtn');
    
    loadBtn.disabled = true;
    loadBtn.textContent = '⏳ Đang tải...';
    
    document.getElementById('detailContent').innerHTML = '<div class="loading"><div class="spinner"></div><p>Đang tải dữ liệu...</p></div>';
    
    try {
        await fetchEmployees();
        await fetchTimesheet(fromDate, toDate);
        
        processReport();
        
        // ===== THÊM DÒNG NÀY ĐỂ GÁN DỮ LIỆU RA GLOBAL =====
        window.reportData = reportData;
        // ================================================
        
        const areaSelect = document.getElementById('areaFilter');
        const employeeSelect = document.getElementById('employeeFilter');
        
        const areas = [...new Set(reportData.map(r => r.area))];
        areaSelect.innerHTML = '<option value="all">Tất cả</option>' + 
            areas.map(a => `<option value="${a}">${a}</option>`).join('');
        
        employeeSelect.innerHTML = '<option value="all">Tất cả</option>' + 
            reportData.map(e => `<option value="${e.maNV}">${e.tenNV} (${e.maNV})</option>`).join('');
        
        renderDetail();
    } catch (error) {
        const errorHtml = `<div class="error">
            <strong>❌ Lỗi tải dữ liệu:</strong><br>
            ${error.message}<br>
            Vui lòng kiểm tra kết nối và thử lại.
        </div>`;
        document.getElementById('detailContent').innerHTML = errorHtml;
    } finally {
        loadBtn.disabled = false;
        loadBtn.textContent = '🔍 Xem báo cáo';
    }
}

// Hàm xuất Excel - đã sửa xuống dòng
window.exportExcelFunction = function() {
    const filtered = filterData();
    
    // Sử dụng \n để xuống dòng trong Excel (khi mở bằng Excel sẽ tự xuống dòng)
    let csv = "STT,Mã NV,Họ tên,Khu vực,Đơn vị,Chi tiết chấm công,Chi tiết viếng thăm,Tổng công\n";
    
    filtered.forEach((emp, idx) => {
        // Gộp chi tiết chấm công - mỗi ngày xuống dòng
        let attendanceLines = [];
        emp.attendanceDetails.forEach(att => {
            const displayDate = formatDateWithWeekday(att.normalizedDate || att.date);
            if (att.hasFullAttendance) {
                attendanceLines.push(`${displayDate}: ${att.checkin || '--'}→${att.checkout || '--'}`);
            } else if (att.hasAnyAttendance) {
                attendanceLines.push(`${displayDate}: Thiếu chấm công`);
            } else {
                attendanceLines.push(`${displayDate}: Không chấm công`);
            }
        });
        let attendanceStr = attendanceLines.join('\n'); // Xuống dòng bằng \n
        
        // Gộp chi tiết viếng thăm - mỗi ngày xuống dòng
        let visitLines = [];
        emp.visitDetails.forEach(visit => {
            const displayDate = formatDateWithWeekday(visit.date);
            visitLines.push(`${displayDate}: ${visit.count} lượt`);
        });
        let visitStr = visitLines.join('\n'); // Xuống dòng bằng \n
        
        // Thêm dấu ngoặc kép để Excel giữ nguyên xuống dòng
        csv += `"${idx+1}","${emp.maNV}","${emp.tenNV}","${emp.area}","${emp.maDonVi || ''}","${attendanceStr}","${visitStr}",${emp.totalWork}\n`;
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
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentDate').innerText = new Date().toLocaleString('vi-VN');
    
    document.getElementById('loadReportBtn').addEventListener('click', loadData);
    document.getElementById('exportExcelBtn').addEventListener('click', () => {
        if (window.exportExcelFunction) {
            window.exportExcelFunction();
        }
    });
    
    document.getElementById('areaFilter').addEventListener('change', () => {
        if (reportData.length > 0) {
            renderDetail();
        }
    });
    document.getElementById('employeeFilter').addEventListener('change', () => {
        if (reportData.length > 0) {
            renderDetail();
        }
    });
});
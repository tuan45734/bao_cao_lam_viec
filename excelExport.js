// excelExport.js - Xuất 2 file riêng: Tổng hợp và Chi tiết

function exportExcelReport() {
    const filtered = window.reportData;
    
    if (!filtered || filtered.length === 0) {
        alert('Không có dữ liệu để xuất. Vui lòng nhấn "Xem báo cáo" trước khi xuất Excel.');
        return;
    }
    
    console.log('Đang xuất Excel với', filtered.length, 'nhân viên');
    
    // Nhóm dữ liệu theo KV và NPP
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
    
    // Xuất file TỔNG HỢP
    exportSummaryFile(groupedByKV);
    
    // Xuất file CHI TIẾT
    exportDetailFile(groupedByKV);
}

// Xuất file TỔNG HỢP
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
                    <th>Vào muộn/<br>Ra sớm</th>
                    <th>Thiếu chấm công</th>
                    <th>Viếng thăm<br>không đủ</th>
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
                // Tính số ngày vào muộn hoặc ra sớm
                let lateEarlyCount = 0;
                if (emp.attendanceDetails) {
                    emp.attendanceDetails.forEach(att => {
                        if (att.hasFullAttendance && (att.isLate || att.isEarly)) {
                            lateEarlyCount++;
                        }
                    });
                }
                
                // Tính số ngày thiếu chấm công
                let missingAttendanceCount = 0;
                if (emp.attendanceDetails) {
                    emp.attendanceDetails.forEach(att => {
                        if (att.hasAnyAttendance && !att.hasFullAttendance) {
                            missingAttendanceCount++;
                        }
                    });
                }
                
                // Tính số ngày viếng thăm không đủ
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
                
                let totalDisplay = parseFloat(emp.totalWork).toString();
                
                html += `
                    <tr>
                        <td class="stt-cell">${nppStt}</td>
                        <td>${emp.maNV}</td>
                        <td>${emp.tenNV}</td>
                        <td class="number-cell">${lateEarlyCount}</td>
                        <td class="number-cell">${missingAttendanceCount}</td>
                        <td class="number-cell">${insufficientVisitCount}</td>
                        <td class="number-cell"><strong>${totalDisplay}</strong></td>
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

// Xuất file CHI TIẾT
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
                // Chi tiết chấm công
                let attendanceHtml = '';
                if (emp.attendanceDetails && emp.attendanceDetails.length > 0) {
                    emp.attendanceDetails.forEach(att => {
                        const displayDate = formatDateForExcel(att.normalizedDate || att.date);
                        let textColor = '';
                        let text = '';
                        
                        if (att.hasFullAttendance) {
                            textColor = getTextColor(att.colorClass);
                            text = `${displayDate}: ${att.checkin || '--'} → ${att.checkout || '--'}`;
                        } else if (att.hasAnyAttendance) {
                            textColor = '#999999';
                            text = `${displayDate}: Thiếu chấm công (${att.checkin || '--'} → ${att.checkout || '--'})`;
                        } else {
                            textColor = '#999999';
                            text = `${displayDate}: Không chấm công`;
                        }
                        attendanceHtml += `<div class="line-row" style="color: ${textColor};">${text}</div>`;
                    });
                } else {
                    attendanceHtml = '<div>Không có dữ liệu</div>';
                }
                
                // Chi tiết viếng thăm
                let visitHtml = '';
                if (emp.visitDetails && emp.visitDetails.length > 0) {
                    emp.visitDetails.forEach(visit => {
                        const displayDate = formatDateForExcel(visit.date);
                        let colorClass = visit.colorClass || 'success';
                        let textColor = getTextColor(colorClass);
                        visitHtml += `<div class="line-row" style="color: ${textColor};">${displayDate}: ${visit.count} lượt</div>`;
                    });
                } else {
                    visitHtml = '<div>Không có dữ liệu</div>';
                }
                
                // Công chi tiết
                let workHtml = '';
                if (emp.dailyWork && emp.dailyWork.length > 0) {
                    emp.dailyWork.forEach(day => {
                        const displayDate = formatDateForExcel(day.date);
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
                
                let totalDisplay = parseFloat(emp.totalWork).toString();
                
                html += `
                    <tr>
                        <td class="stt-cell">${nppStt}</td>
                        <td>${emp.maNV}</td>
                        <td>${emp.tenNV}</td>
                        <td style="vertical-align:top;">${attendanceHtml}</td>
                        <td style="vertical-align:top;">${visitHtml}</td>
                        <td style="vertical-align:top;">${workHtml}</td>
                        <td class="total-cell"><strong>${totalDisplay}</strong></td>
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

function formatDateForExcel(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const weekday = days[date.getDay()];
    return `${day}/${month} - ${weekday}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('exportExcelBtn');
    if (exportBtn) {
        const newBtn = exportBtn.cloneNode(true);
        exportBtn.parentNode.replaceChild(newBtn, exportBtn);
        newBtn.addEventListener('click', exportExcelReport);
    }
});
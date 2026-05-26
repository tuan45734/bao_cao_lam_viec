// detailTab.js - Hiển thị bảng chi tiết

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
    const filtered = getFilteredData();
    
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
                    <th>Công chi tiết</th>
                    <th>Tổng công</th>
                    <th>Doanh số</th>
                </tr>
            </thead>
            <tbody>`;
    
    let stt = 0;
    const sortedKV = Object.keys(groupedByKV).sort();
    
    for (const kv of sortedKV) {
        html += `<tr class="group-row"><td colspan="8"><strong>🏢 KHU VỰC: ${kv}</strong></td></tr>`;
        
        const npps = groupedByKV[kv];
        const sortedNPP = Object.keys(npps).sort();
        
        for (const npp of sortedNPP) {
            html += `<tr class="group-row" style="background:#f5f5f5;"><td colspan="8"><strong>📌 ${npp}</strong></td></tr>`;
            
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
                        let workClass = '';
                        if (day.workValue === 0) workClass = 'no-attendance';
                        else if (day.workValue < 1) workClass = 'warning';
                        else workClass = 'success';
                        dailyWorkHtml += `<div class="attendance-item ${workClass}" style="text-align:center;">
                            ${displayDate}: <strong>${day.workValue}</strong> công
                        </div>`;
                    });
                } else {
                    dailyWorkHtml = '<div>Không có dữ liệu</div>';
                }
                
                const totalHtml = `<div class="total-work-footer" style="text-align:center; background:#e8f5e9; padding:12px; border-radius:8px;">
                    <strong style="font-size:20px; color:#e67e22;">${emp.totalWork}</strong>
                    <div style="font-size:11px;">công</div>
                </div>`;
                
                let kpiHtml = '';
                if (emp.kpi) {
                    const formatNum = (n) => {
                        if (n >= 1000000000) return (n / 1000000000).toFixed(1) + ' tỷ';
                        if (n >= 1000000) return (n / 1000000).toFixed(1) + ' tr';
                        if (n >= 1000) return (n / 1000).toFixed(1) + ' k';
                        return n.toLocaleString('vi-VN');
                    };
                    kpiHtml = `<div style="text-align:center;">
                        <div style="padding:4px 8px; margin:2px 0; background:#e3f2fd; border-radius:4px;">
                            <div style="font-size:11px; color:#1565c0;">KH</div>
                            <strong style="font-size:13px;">${formatNum(emp.kpi.kh)}</strong>
                        </div>
                        <div style="padding:4px 8px; margin:2px 0; background:#e8f5e9; border-radius:4px;">
                            <div style="font-size:11px; color:#2e7d32;">TH</div>
                            <strong style="font-size:13px;">${formatNum(emp.kpi.th)}</strong>
                        </div>
                        <div style="padding:4px 8px; margin:2px 0; background:${emp.kpi.tl >= 100 ? '#e8f5e9' : emp.kpi.tl >= 80 ? '#fff8e1' : '#ffebee'} ; border-radius:4px;">
                            <div style="font-size:11px; color:${emp.kpi.tl >= 100 ? '#2e7d32' : emp.kpi.tl >= 80 ? '#f57f17' : '#c62828'};">TL</div>
                            <strong style="font-size:13px; color:${emp.kpi.tl >= 100 ? '#2e7d32' : emp.kpi.tl >= 80 ? '#f57f17' : '#c62828'};">${emp.kpi.tl}%</strong>
                        </div>
                    </div>`;
                } else {
                    kpiHtml = `<div style="text-align:center; color:#999; padding:8px;">Không có KPI</div>`;
                }
                
                html += `
                    <tr>
                        <td style="vertical-align:top;">${stt}</td>
                        <td style="vertical-align:top;">${emp.maNV}</td>
                        <td style="vertical-align:top;">${emp.tenNV}<br><span class="area-badge">${emp.area}</span></td>
                        <td style="vertical-align:top;">${attendanceHtml}</td>
                        <td style="vertical-align:top;">${visitHtml}</td>
                        <td style="vertical-align:top;">${dailyWorkHtml}</td>
                        <td style="vertical-align:top; text-align:center;">${totalHtml}</td>
                        <td style="vertical-align:top; text-align:center;">${kpiHtml}</td>
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
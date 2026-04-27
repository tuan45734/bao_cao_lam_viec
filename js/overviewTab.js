// overviewTab.js - Hiển thị biểu đồ với hover (tooltip giữa màn hình)

let chart1, chart2;
let hoverTimeout = null;
let currentModal = null;

// Tạo modal hiển thị ở giữa màn hình
function createCenterModal() {
    let modal = document.getElementById('center-chart-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'center-chart-modal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 16px;
            min-width: 350px;
            max-width: 500px;
            max-height: 70%;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 2000;
            font-family: 'Segoe UI', Arial, sans-serif;
        `;
        
        modal.innerHTML = `
            <div style="padding: 16px 20px; background: linear-gradient(135deg, #ff5b5b 0%, #ff7300 100%); color: white; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0;">
                <h3 id="modalTitle" style="margin:0; font-size:16px;">📋 Chi tiết vi phạm</h3>
                <button id="centerModalCloseBtn" style="background:none; border:none; color:white; font-size:24px; cursor:pointer; line-height:1;">&times;</button>
            </div>
            <div id="modalBody" style="padding: 11px 11px;">
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeModal = () => {
            modal.style.display = 'none';
        };
        document.getElementById('centerModalCloseBtn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    return modal;
}

// Hiển thị modal ở giữa màn hình
function showCenterModal(title, violations) {
    const modal = createCenterModal();
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.innerHTML = title;
    
    if (!violations || violations.length === 0) {
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 30px; color: #27ae60;">
                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                <div style="font-size: 16px;">Không có vi phạm trong khu vực này</div>
            </div>
        `;
        modal.style.display = 'block';
        return;
    }
    
    // Tính tổng
    const totalCount = violations.reduce((sum, v) => sum + v.count, 0);
    
    let html = `
        <div style="margin-bottom: 16px; background: #f8f9fa;  border-radius: 10px; text-align: center;">
            <span style="font-size: 20px; font-weight: bold; color: #e74c3c;">${totalCount}</span>
            <span style="color: #666;"> tổng số lần vi phạm</span>
        </div>
        <div style="max-height: 800px; overflow-y: auto;">
    `;
    
    violations.forEach((v, idx) => {
        html += `
            <div style=" border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <span style="font-weight:400;font-size: 12px; color:#ff7300;">${v.npp || ''}</span>
                    
                    <span style="font-size: 12px;">${v.tenNV}(${v.maNV})</span>
                </div>
                <div>
                    <span style="background: #ffe6e5; color: #e74c3c; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 12px;">${v.count} </span>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    modalBody.innerHTML = html;
    modal.style.display = 'block';
}

function hideCenterModal() {
    const modal = document.getElementById('center-chart-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ==================== THỐNG KÊ CHẤM CÔNG (Tất cả nhân viên) ====================

function calculateLateEarlyStatsAll() {
    const areas = [...new Set(reportData.map(r => r.area))].sort();
    const result = {};
    
    areas.forEach(area => {
        const employeesInArea = reportData.filter(emp => emp.area === area);
        
        let totalLateEarlyCount = 0;
        let peopleWithLateEarly = new Set();
        const violationList = [];
        
        employeesInArea.forEach(emp => {
            let empViolationCount = 0;
            emp.attendanceDetails.forEach(att => {
                if (att.isLate || att.isEarly) {
                    totalLateEarlyCount++;
                    empViolationCount++;
                }
            });
            if (empViolationCount > 0) {
                peopleWithLateEarly.add(emp.maNV);
                violationList.push({
                    maNV: emp.maNV,
                    tenNV: emp.tenNV,
                    npp: emp.maDonVi,
                    count: empViolationCount
                });
            }
        });
        
        violationList.sort((a, b) => b.count - a.count);
        
        result[area] = {
            totalLateEarlyCount: totalLateEarlyCount,
            peopleWithLateEarlyCount: peopleWithLateEarly.size,
            violationList: violationList
        };
    });
    
    return result;
}

// ==================== THỐNG KÊ VIẾNG THĂM (Chỉ nhân viên 7 ký tự và KEY) ====================

function getVisitEmployees() {
    return reportData.filter(emp => {
        const ma = emp.maNV;
        return (ma.includes('.') && ma.length >= 7) || ma.startsWith('KEY');
    });
}

function calculateVisitStatsByArea() {
    const visitEmployees = getVisitEmployees();
    const areas = [...new Set(visitEmployees.map(r => r.area))].sort();
    const result = {};
    
    areas.forEach(area => {
        const employeesInArea = visitEmployees.filter(emp => emp.area === area);
        
        let totalNotEnoughVisits = 0;
        let peopleWithNotEnough = new Set();
        const violationList = [];
        
        employeesInArea.forEach(emp => {
            const standard = getVisitStandard(emp.maNV);
            let empViolationCount = 0;
            
            emp.visitDetails.forEach((visit, idx) => {
                const att = emp.attendanceDetails[idx];
                const hasFull = att && att.hasFullAttendance === true;
                if (hasFull && visit.count < standard) {
                    totalNotEnoughVisits++;
                    empViolationCount++;
                }
            });
            
            if (empViolationCount > 0) {
                peopleWithNotEnough.add(emp.maNV);
                violationList.push({
                    maNV: emp.maNV,
                    tenNV: emp.tenNV,
                    npp: emp.maDonVi,
                    count: empViolationCount
                });
            }
        });
        
        violationList.sort((a, b) => b.count - a.count);
        
        result[area] = {
            totalNotEnoughVisits: totalNotEnoughVisits,
            notEnoughPeopleCount: peopleWithNotEnough.size,
            violationList: violationList,
            totalEmployees: employeesInArea.length
        };
    });
    
    return result;
}

function getMaxValue(data) {
    if (!data || data.length === 0) return 5;
    const max = Math.max(...data);
    return Math.ceil(max + 0.3);
}

// ==================== RENDER BIỂU ĐỒ ====================

function renderOverview() {
    if (!reportData || reportData.length === 0) {
        document.getElementById('overviewContent').innerHTML = '<div class="loading"><p>Chưa có dữ liệu. Vui lòng nhấn "Xem báo cáo".</p></div>';
        return;
    }
    
    const lateEarlyStats = calculateLateEarlyStatsAll();
    const visitStats = calculateVisitStatsByArea();
    
    const areas = [...new Set([...Object.keys(lateEarlyStats), ...Object.keys(visitStats)])].sort();
    
    const lateEarlyCounts = areas.map(a => lateEarlyStats[a]?.totalLateEarlyCount || 0);
    const peopleLateEarly = areas.map(a => lateEarlyStats[a]?.peopleWithLateEarlyCount || 0);
    const visitCounts = areas.map(a => visitStats[a]?.totalNotEnoughVisits || 0);
    const peopleVisit = areas.map(a => visitStats[a]?.notEnoughPeopleCount || 0);
    
    // Tách riêng tooltip data cho từng biểu đồ
    const lateEarlyTooltipData = {};
    const visitTooltipData = {};
    
    areas.forEach(area => {
        lateEarlyTooltipData[area] = {
            lateEarlyViolations: lateEarlyStats[area]?.violationList || []
        };
        visitTooltipData[area] = {
            visitViolations: visitStats[area]?.violationList || []
        };
    });
    
    const maxLateEarly = getMaxValue([...lateEarlyCounts, ...peopleLateEarly]);
    const maxVisit = getMaxValue([...visitCounts, ...peopleVisit]);
    
    let html = `
        <div class="chart-container">
            <h3>Thống kê CHẤM CÔNG theo KHU VỰC</h3>
            
            <div class="chart-box" style="width:100%;">
                <canvas id="chartLateEarly"></canvas>
            </div>
        </div>
        
        <div class="chart-container">
            <h3>Thống kê VIẾNG THĂM theo KHU VỰC</h3>
            
            <div class="chart-box" style="width:100%;">
                <canvas id="chartVisit"></canvas>
            </div>
        </div>
    `;
    
    document.getElementById('overviewContent').innerHTML = html;
    
    renderChartLateEarly(areas, lateEarlyCounts, peopleLateEarly, maxLateEarly, lateEarlyTooltipData);
    renderChartVisit(areas, visitCounts, peopleVisit, maxVisit, visitTooltipData);
}

// Plugin hover cho từng biểu đồ (hiển thị modal giữa màn hình)
function createHoverPlugin(tooltipData, type) {
    return {
        id: `hoverPlugin_${type}`,
        afterEvent(chart, args, options) {
            const event = args.event;
            if (event.type === 'mousemove') {
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
                
                const activePoints = chart.getActiveElements();
                if (activePoints && activePoints.length > 0) {
                    const datasetIndex = activePoints[0].datasetIndex;
                    const dataIndex = activePoints[0].index;
                    const label = chart.data.labels[dataIndex];
                    
                    if (tooltipData && tooltipData[label]) {
                        const info = tooltipData[label];
                        let title = '';
                        let violations = [];
                        
                        if (type === 'lateearly') {
                            if (datasetIndex === 0) {
                                title = `📊 ${label} - Số lần vào muộn/về sớm`;
                                violations = info.lateEarlyViolations || [];
                            } else if (datasetIndex === 1) {
                                title = `👥 ${label} - Số người vào muộn/về sớm`;
                                violations = info.lateEarlyViolations || [];
                            }
                        } else if (type === 'visit') {
                            if (datasetIndex === 0) {
                                title = `📊 ${label} - Số lần viếng thăm không đủ`;
                                violations = info.visitViolations || [];
                            } else if (datasetIndex === 1) {
                                title = `👥 ${label} - Số người viếng thăm không đủ`;
                                violations = info.visitViolations || [];
                            }
                        }
                        
                        if (title) {
                            hoverTimeout = setTimeout(() => {
                                showCenterModal(title, violations);
                            }, 300);
                            return;
                        }
                    }
                }
            } else if (event.type === 'mouseout') {
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
                // Không ẩn modal ngay khi rời chuột, để user đọc xong tự đóng
                // hideCenterModal();
            }
        }
    };
}

function renderChartLateEarly(areas, counts, people, maxValue, tooltipData) {
    if (chart1) {
        chart1.destroy();
    }
    
    const ctx = document.getElementById('chartLateEarly').getContext('2d');
    chart1 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: areas,
            datasets: [
                { 
                    label: '📊 Số lần vào muộn/về sớm', 
                    data: counts, 
                    backgroundColor: '#ff6b6b', 
                    borderRadius: 8,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                },
                { 
                    label: '👥 Số người vào muộn/về sớm', 
                    data: people, 
                    backgroundColor: '#ffa502', 
                    borderRadius: 8,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { 
                    position: 'top',
                    labels: { font: { size: 13 } }
                },
                tooltip: { enabled: false },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    offset: 4,
                    color: '#333',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    borderRadius: 4,
                    padding: { left: 4, right: 4, top: 2, bottom: 2 },
                    font: { weight: 'bold', size: 12 },
                    formatter: (value) => value > 0 ? value : ''
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxValue,
                    ticks: { stepSize: 1 },
                    title: {
                        display: true,
                        text: 'Số lần / Số người',
                        font: { size: 12 }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Khu vực',
                        font: { size: 12 }
                    }
                }
            },
            onClick: () => {
                // Đóng modal khi click vào biểu đồ
                hideCenterModal();
            }
        },
        plugins: [createHoverPlugin(tooltipData, 'lateearly')]
    });
}

function renderChartVisit(areas, counts, people, maxValue, tooltipData) {
    if (chart2) {
        chart2.destroy();
    }
    
    const ctx = document.getElementById('chartVisit').getContext('2d');
    chart2 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: areas,
            datasets: [
                { 
                    label: '📊 Số lần viếng thăm KHÔNG ĐỦ', 
                    data: counts, 
                    backgroundColor: '#ff4757', 
                    borderRadius: 8,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                },
                { 
                    label: '👥 Số người viếng thăm KHÔNG ĐỦ', 
                    data: people, 
                    backgroundColor: '#ff6b6b', 
                    borderRadius: 8,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { 
                    position: 'top',
                    labels: { font: { size: 13 } }
                },
                tooltip: { enabled: false },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    offset: 4,
                    color: '#333',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    borderRadius: 4,
                    padding: { left: 4, right: 4, top: 2, bottom: 2 },
                    font: { weight: 'bold', size: 12 },
                    formatter: (value) => value > 0 ? value : ''
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxValue,
                    ticks: { stepSize: 1 },
                    title: {
                        display: true,
                        text: 'Số lần / Số người',
                        font: { size: 12 }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Khu vực',
                        font: { size: 12 }
                    }
                }
            },
            onClick: () => {
                hideCenterModal();
            }
        },
        plugins: [createHoverPlugin(tooltipData, 'visit')]
    });
}
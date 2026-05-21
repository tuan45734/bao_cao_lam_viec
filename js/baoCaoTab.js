// baoCaoTab.js - Tab Báo cáo (Admin only)

let baoCaoCharts = [];

const shadowPlugin = {
    id: 'shadow3d',
    afterDraw(chart) {
        const ctx = chart.ctx;
        chart.getDatasetMeta(0).data.forEach((bar, index) => {
            if (bar.hidden) return;
            const dataset = chart.data.datasets[0];
            const baseY = chart.scales.y.getPixelForValue(0);
            const barX = bar.x;
            const barY = bar.y;
            const barW = bar.width;

            ctx.save();
            const alpha = 0.15;
            ctx.fillStyle = `rgba(0,0,0,${alpha})`;
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            const r = 6;
            ctx.beginPath();
            ctx.moveTo(barX - barW / 2 + r, barY);
            ctx.lineTo(barX + barW / 2 - r, barY);
            ctx.quadraticCurveTo(barX + barW / 2, barY, barX + barW / 2, barY + r);
            ctx.lineTo(barX + barW / 2, baseY);
            ctx.lineTo(barX - barW / 2, baseY);
            ctx.lineTo(barX - barW / 2, barY + r);
            ctx.quadraticCurveTo(barX - barW / 2, barY, barX - barW / 2 + r, barY);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        });
    }
};

function getEmployeeGroup(maNV) {
    if (!maNV) return 'NV';
    const len = maNV.length;
    if (len <= 3) return 'ASM';
    if (len === 4) return 'GS';
    return 'NV';
}

function getWeekNumber(d) {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function groupDatesByWeek(dates) {
    const weeks = {};
    dates.forEach(date => {
        const wn = getWeekNumber(date);
        if (!weeks[wn]) weeks[wn] = [];
        weeks[wn].push(date);
    });
    return weeks;
}

function formatDateShort(date) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}`;
}

function getMaxValueArr(data) {
    if (!data || data.length === 0) return 5;
    const max = Math.max(...data);
    return Math.ceil(max * 1.1) || 5;
}

function getBaoCaoFilteredData(group, area, npp) {
    let data = group === 'ALL' ? reportData : reportData.filter(emp => getEmployeeGroup(emp.maNV) === group);
    if (area !== 'all') data = data.filter(emp => emp.area === area);
    if (npp !== 'all') data = data.filter(emp => emp.maDonVi === npp);
    return data;
}

function calculateGroupWeeklyStats(group, area, npp) {
    const filtered = getBaoCaoFilteredData(group, area, npp);
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const allDates = getAllDatesInRange(fromDate, toDate);
    const weeks = groupDatesByWeek(allDates);
    const weekNums = Object.keys(weeks).sort();

    return weekNums.map((wn, idx) => {
        const dates = weeks[wn];
        const dateObjs = dates.map(d => new Date(d));
        const minDate = new Date(Math.min(...dateObjs));
        const maxDate = new Date(Math.max(...dateObjs));

        let lateEarlyCount = 0, peopleLateEarly = 0, insuffVisitCount = 0, peopleInsuffVisit = 0;

        filtered.forEach(emp => {
            let empLateEarly = 0, empInsuff = 0;
            emp.attendanceDetails.forEach(att => {
                if (dates.includes(att.normalizedDate)) {
                    if (att.isLate || att.isEarly) empLateEarly++;
                }
            });
            emp.visitDetails.forEach(visit => {
                if (dates.includes(visit.date)) {
                    if ((visit.colorClass === 'danger' || visit.colorClass === 'warning' || visit.colorClass === 'warning-level2') && visit.penalty > 0) {
                        empInsuff++;
                    }
                }
            });
            lateEarlyCount += empLateEarly;
            if (empLateEarly > 0) peopleLateEarly++;
            insuffVisitCount += empInsuff;
            if (empInsuff > 0) peopleInsuffVisit++;
        });

        return {
            weekLabel: `Tuần ${idx + 1}`,
            fullLabel: `Tuần ${idx + 1}\n(${formatDateShort(minDate)}-${formatDateShort(maxDate)})`,
            lateEarlyCount,
            peopleLateEarly,
            insuffVisitCount,
            peopleInsuffVisit
        };
    });
}

function renderGroupChart(group, canvasId, groupName) {
    const area = document.getElementById('baocaoAreaFilter').value;
    const npp = document.getElementById('baocaoNppFilter').value;
    const weekStats = calculateGroupWeeklyStats(group, area, npp);
    const hasVisit = group === 'ALL' || group === 'NV';

    const weekLabels = weekStats.map(w => w.fullLabel);

    const palettes = {
        ALL: [
            { fill: '#4facfe', border: '#2d7dd2' },
            { fill: '#ff6b6b', border: '#cc4040' },
            { fill: '#a29bfe', border: '#7c6fe0' },
            { fill: '#ffa502', border: '#cc8400' }
        ],
        ASM: [
            { fill: '#00b894', border: '#009874' },
            { fill: '#55efc4', border: '#2dbe96' }
        ],
        GS: [
            { fill: '#6c5ce7', border: '#4a3db5' },
            { fill: '#a29bfe', border: '#7c6fe0' }
        ],
        NV: [
            { fill: '#636e72', border: '#4a5356' },
            { fill: '#b2bec3', border: '#8a9499' },
            { fill: '#dfe6e9', border: '#b0b8bc' },
            { fill: '#fd79a8', border: '#d4537e' }
        ]
    };
    const p = palettes[group] || palettes.NV;

    const datasets = [
        {
            label: 'Số lần vào muộn/về sớm',
            data: weekStats.map(w => w.lateEarlyCount),
            backgroundColor: p[0].fill,
            borderColor: p[0].border,
            borderWidth: 2,
            borderRadius: 6,
            barPercentage: 0.2,
            categoryPercentage: 0.7
        },
        {
            label: 'Số người vào muộn/về sớm',
            data: weekStats.map(w => w.peopleLateEarly),
            backgroundColor: p[1].fill,
            borderColor: p[1].border,
            borderWidth: 2,
            borderRadius: 6,
            barPercentage: 0.2,
            categoryPercentage: 0.7
        }
    ];

    if (hasVisit) {
        datasets.push({
            label: 'Số lần viếng thăm không đủ',
            data: weekStats.map(w => w.insuffVisitCount),
            backgroundColor: p[2].fill,
            borderColor: p[2].border,
            borderWidth: 2,
            borderRadius: 6,
            barPercentage: 0.2,
            categoryPercentage: 0.7
        });
        datasets.push({
            label: 'Số người viếng thăm không đủ',
            data: weekStats.map(w => w.peopleInsuffVisit),
            backgroundColor: p[3].fill,
            borderColor: p[3].border,
            borderWidth: 2,
            borderRadius: 6,
            barPercentage: 0.2,
            categoryPercentage: 0.7
        });
    }

    const maxVal = getMaxValueArr(datasets.flatMap(d => d.data));

    const ctx = document.getElementById(canvasId).getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: { labels: weekLabels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { size: 11, weight: 'bold' },
                        padding: 16,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { size: 12, weight: 'bold' },
                    bodyFont: { size: 11 },
                    cornerRadius: 8,
                    padding: 10
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    offset: 3,
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 4,
                    padding: { left: 5, right: 5, top: 2, bottom: 2 },
                    font: { weight: 'bold', size: 10 },
                    formatter: (value) => value > 0 ? value : ''
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxVal,
                    ticks: { stepSize: 1, font: { size: 11 } },
                    grid: { color: 'rgba(0,0,0,0.06)' }
                },
                x: {
                    ticks: { font: { size: 9, weight: 'bold' } },
                    grid: { display: false }
                }
            }
        },
        plugins: [shadowPlugin]
    });
    baoCaoCharts.push(chart);

    const tableId = 'table_' + canvasId;
    const tableContainer = document.getElementById(tableId);
    if (tableContainer) {
        tableContainer.innerHTML = generateWeekTableHTML(weekStats, hasVisit);
    }
}

function generateWeekTableHTML(weekStats, hasVisit) {
    const metrics = [
        { label: 'Số lần vào muộn/về sớm', key: 'lateEarlyCount' },
        { label: 'Số người vào muộn/về sớm', key: 'peopleLateEarly' }
    ];
    if (hasVisit) {
        metrics.push(
            { label: 'Số lần viếng thăm không đủ', key: 'insuffVisitCount' },
            { label: 'Số người viếng thăm không đủ', key: 'peopleInsuffVisit' }
        );
    }

    const weekCount = weekStats.length;
    if (weekCount === 0) return '';

    let html = '<table class="baocao-week-table"><thead><tr><th>Chỉ tiêu</th>';
    weekStats.forEach((w, i) => {
        html += `<th>${w.weekLabel}</th>`;
        if (i < weekCount - 1) html += '<th>+/-</th>';
    });
    html += '<th>Tổng</th></tr></thead><tbody>';

    metrics.forEach(m => {
        html += `<tr><td><strong>${m.label}</strong></td>`;
        const values = weekStats.map(w => w[m.key]);
        let total = 0;
        values.forEach(v => { total += v; });

        values.forEach((v, i) => {
            html += `<td class="num">${v}</td>`;
            if (i < weekCount - 1) {
                const diff = values[i + 1] - v;
                if (diff > 0) {
                    html += `<td class="num up">+${diff} ↑</td>`;
                } else if (diff < 0) {
                    html += `<td class="num down">${diff} ↓</td>`;
                } else {
                    html += `<td class="num same">0</td>`;
                }
            }
        });
        html += `<td class="num total">${total}</td></tr>`;
    });

    html += '</tbody></table>';
    return html;
}

function initBaoCaoFilters() {
    const areaSelect = document.getElementById('baocaoAreaFilter');
    const nppSelect = document.getElementById('baocaoNppFilter');

    const areas = [...new Set(reportData.map(r => r.area))].sort();
    areaSelect.innerHTML = '<option value="all">Tất cả khu vực</option>' +
        areas.map(a => `<option value="${a}">${a}</option>`).join('');

    const updateNpp = () => {
        const area = areaSelect.value;
        let npps = area === 'all'
            ? [...new Set(reportData.map(r => r.maDonVi))]
            : [...new Set(reportData.filter(r => r.area === area).map(r => r.maDonVi))];
        nppSelect.innerHTML = '<option value="all">Tất cả NPP</option>' +
            npps.sort().map(n => `<option value="${n}">${n}</option>`).join('');
    };

    areaSelect.addEventListener('change', () => { updateNpp(); renderBaoCaoCharts(); });
    nppSelect.addEventListener('change', () => { renderBaoCaoCharts(); });

    updateNpp();
}

function renderBaoCaoCharts() {
    baoCaoCharts.forEach(c => { if (c) c.destroy(); });
    baoCaoCharts = [];
    renderGroupChart('ALL', 'chartTotal', 'Tổng hợp');
    renderGroupChart('ASM', 'chartASM', 'ASM');
    renderGroupChart('GS', 'chartGS', 'GS');
    renderGroupChart('NV', 'chartNV', 'NV');
}

function renderBaoCao() {
    if (!reportData || reportData.length === 0) {
        document.getElementById('baoCaoContent').innerHTML = '<div class="loading"><p>Chưa có dữ liệu. Vui lòng nhấn "Xem báo cáo".</p></div>';
        return;
    }

    baoCaoCharts.forEach(c => { if (c) c.destroy(); });
    baoCaoCharts = [];

    const areas = [...new Set(reportData.map(r => r.area))].sort();

    let html = `
        <div class="filter-kv">
            <label>🏢 Khu vực</label>
            <select id="baocaoAreaFilter">
                <option value="all">Tất cả khu vực</option>
                ${areas.map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
            <label>🏪 NPP</label>
            <select id="baocaoNppFilter">
                <option value="all">Tất cả NPP</option>
            </select>
        </div>

        <div class="chart-container">
            <h3> Tổng hợp tất cả nhân viên</h3>
            <div class="chart-box">
                <canvas id="chartTotal"></canvas>
            </div>
            <div class="table-wrapper" id="table_chartTotal"></div>
        </div>

        <div class="chart-container">
            <h3> ASM (Mã 2-3 ký tự)</h3>
            <div class="chart-box">
                <canvas id="chartASM"></canvas>
            </div>
            <div class="table-wrapper" id="table_chartASM"></div>
        </div>

        <div class="chart-container">
            <h3> GS (Mã 4 ký tự)</h3>
            <div class="chart-box">
                <canvas id="chartGS"></canvas>
            </div>
            <div class="table-wrapper" id="table_chartGS"></div>
        </div>

        <div class="chart-container">
            <h3> NV (Mã còn lại)</h3>
            <div class="chart-box">
                <canvas id="chartNV"></canvas>
            </div>
            <div class="table-wrapper" id="table_chartNV"></div>
        </div>
    `;

    document.getElementById('baoCaoContent').innerHTML = html;

    initBaoCaoFilters();
    renderBaoCaoCharts();
}

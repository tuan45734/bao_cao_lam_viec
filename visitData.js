// visitData.js - Dữ liệu viếng thăm từ API WorkEffective (DMS)

const VISIT_API_CONFIG = {
    baseUrl: 'https://dms.mobiwork.vn:3016/DSummaryReport/WorkEffective',
    orgid: '67eb9cf392d9028035624d91',
    auth: 'Basic YWRtaW41QGFjYnQuY29tOmFjZjY4MTljNmNiZjJlMGZkNGE2Njg5MjQ5NjAzODFi'
};

let VISIT_RECORDS = [];

function pad2(n) {
    return String(n).padStart(2, '0');
}

function buildWorkEffectiveUrl(year, month, fromDay, toDay) {
    const params = new URLSearchParams({
        orgid: VISIT_API_CONFIG.orgid,
        group: '',
        groupName: '',
        year: String(year),
        month: pad2(month),
        assignTo: '',
        eeName: '',
        fromday: pad2(fromDay),
        today: pad2(toDay),
        productID: '',
        allowManagerSale: 'yes',
        allowManagerAcc: 'yes',
        allowParent: 'yes'
    });
    return `${VISIT_API_CONFIG.baseUrl}?${params.toString()}`;
}

function getMonthsInRange(fromDate, toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const months = [];
    let cursor = new Date(start.getFullYear(), start.getMonth(), 1);

    while (cursor <= end) {
        const year = cursor.getFullYear();
        const month = cursor.getMonth() + 1;
        const lastDay = new Date(year, month, 0).getDate();

        const fromDay = (year === start.getFullYear() && cursor.getMonth() === start.getMonth())
            ? start.getDate() : 1;
        const toDay = (year === end.getFullYear() && cursor.getMonth() === end.getMonth())
            ? end.getDate() : lastDay;

        months.push({ year, month, fromDay, toDay });
        cursor.setMonth(cursor.getMonth() + 1);
    }
    return months;
}

function transformWorkEffectiveResponse(apiData, year, month, fromDay, toDay) {
    const recordsMap = new Map();
    const groups = apiData?.result?.nhom_BH || [];

    for (const group of groups) {
        for (const nv of (group.nv || [])) {
            const code = (nv.code || '').trim();
            if (!code) continue;

            const key = code.toUpperCase();
            if (!recordsMap.has(key)) {
                recordsMap.set(key, { ma_nhan_vien: code });
            }
            const record = recordsMap.get(key);

            for (let day = fromDay; day <= toDay; day++) {
                const dayData = nv.data?.[String(day)];
                const vts = Number(dayData?.VTS) || 0;
                const vtc = Number(dayData?.VTC) || 0;
                const dateKey = `${year}-${pad2(month)}-${pad2(day)}`;
                record[dateKey] = vts + vtc;
            }
        }
    }

    return recordsMap;
}

function mergeVisitRecords(targetMap, sourceMap) {
    for (const [key, record] of sourceMap) {
        if (!targetMap.has(key)) {
            targetMap.set(key, { ...record });
            continue;
        }
        const existing = targetMap.get(key);
        for (const [field, value] of Object.entries(record)) {
            if (field !== 'ma_nhan_vien') {
                existing[field] = value;
            }
        }
    }
}

async function fetchVisitData(fromDate, toDate) {
    const months = getMonthsInRange(fromDate, toDate);
    const allRecords = new Map();

    for (const { year, month, fromDay, toDay } of months) {
        const url = buildWorkEffectiveUrl(year, month, fromDay, toDay);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: VISIT_API_CONFIG.auth
            }
        });

        if (!response.ok) {
            throw new Error(`Lỗi API viếng thăm: HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!data?.result) {
            throw new Error(data?.message || 'API viếng thăm không trả về dữ liệu');
        }

        const monthRecords = transformWorkEffectiveResponse(data, year, month, fromDay, toDay);
        mergeVisitRecords(allRecords, monthRecords);
    }

    VISIT_RECORDS = Array.from(allRecords.values());
    return VISIT_RECORDS;
}

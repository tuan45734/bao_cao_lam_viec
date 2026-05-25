// filters.js - Quản lý bộ lọc (cập nhật thêm phân quyền)

const FILTER_REGION_AREAS = {
    north: ['KV1', 'KV2', 'KV3', 'KV4', 'KV5', 'KV6'],
    central: ['KV7'],
    south: []
};

function normalizeFilterRegion(region) {
    return ['all', 'north', 'central', 'south'].includes(region) ? region : 'all';
}

function getFilterAreaRegion(area) {
    if (!area) return null;
    if (FILTER_REGION_AREAS.north.includes(area)) return 'north';
    if (FILTER_REGION_AREAS.central.includes(area)) return 'central';
    if (FILTER_REGION_AREAS.south.includes(area)) return 'south';
    return null;
}

function getFilterAreasForRegion(region, allAreas) {
    const normalizedRegion = normalizeFilterRegion(region);
    if (normalizedRegion === 'all') return allAreas;
    return allAreas.filter(area => (FILTER_REGION_AREAS[normalizedRegion] || []).includes(area));
}

function getFilteredData() {
    const region = document.getElementById('regionFilter').value;
    const area = document.getElementById('areaFilter').value;
    const npp = document.getElementById('nppFilter').value;
    const employee = document.getElementById('employeeFilter').value;
    
    let filtered = reportData;
    
    // Áp dụng filter miền/khu vực với phân quyền
    if (!isAdmin()) {
        const userArea = getUserArea();
        if (userArea) {
            filtered = filtered.filter(emp => emp.area === userArea);
        }
    } else {
        const normalizedRegion = normalizeFilterRegion(region);
        if (normalizedRegion !== 'all') {
            filtered = filtered.filter(emp => getFilterAreaRegion(emp.area) === normalizedRegion);
        }
        if (area !== 'all') {
            filtered = filtered.filter(emp => emp.area === area);
        }
    }
    
    if (npp !== 'all') {
        filtered = filtered.filter(emp => emp.maDonVi === npp);
    }
    if (employee !== 'all') {
        filtered = filtered.filter(emp => emp.maNV === employee);
    }
    
    return filtered;
}

function initFilters() {
    const regionSelect = document.getElementById('regionFilter');
    const areaSelect = document.getElementById('areaFilter');
    const nppSelect = document.getElementById('nppFilter');
    const employeeSelect = document.getElementById('employeeFilter');
    
    // Lấy danh sách khu vực dựa trên quyền
    let allAreas = [...new Set(reportData.map(r => r.area))];
    
    if (!isAdmin()) {
        const userArea = getUserArea();
        if (userArea) {
            allAreas = allAreas.filter(area => area === userArea);
        }
    }

    const updateAreaFilter = () => {
        if (!isAdmin()) {
            const userArea = getUserArea();
            areaSelect.innerHTML = '<option value="all">Tất cả</option>' + allAreas.sort().map(a => `<option value="${a}">${a}</option>`).join('');
            areaSelect.disabled = true;
            areaSelect.style.opacity = '0.7';
            areaSelect.title = 'Bạn chỉ có quyền xem khu vực của mình';
            if (userArea) {
                areaSelect.value = userArea;
            }
            return;
        }

        const region = normalizeFilterRegion(regionSelect.value);
        const filteredAreas = getFilterAreasForRegion(region, allAreas);
        areaSelect.innerHTML = '<option value="all">Tất cả</option>' + filteredAreas.sort().map(a => `<option value="${a}">${a}</option>`).join('');
        areaSelect.disabled = false;
        areaSelect.style.opacity = '1';
        areaSelect.title = '';

        if (filteredAreas.length === 0) {
            areaSelect.value = 'all';
            areaSelect.disabled = true;
            areaSelect.title = 'Không có khu vực trong miền đã chọn';
            return;
        }

        if (!filteredAreas.includes(areaSelect.value)) {
            areaSelect.value = 'all';
        }
    };
    
    const updateNppFilter = () => {
        let effectiveArea = areaSelect.value;
        const region = normalizeFilterRegion(regionSelect.value);
        
        if (!isAdmin() && getUserArea()) {
            effectiveArea = getUserArea();
        }
        
        let npps = [];
        if (!isAdmin()) {
            npps = [...new Set(reportData.filter(r => r.area === effectiveArea).map(r => r.maDonVi))];
        } else {
            let scope = reportData;
            if (region !== 'all') {
                scope = scope.filter(r => getFilterAreaRegion(r.area) === region);
            }
            if (effectiveArea !== 'all') {
                scope = scope.filter(r => r.area === effectiveArea);
            }
            npps = [...new Set(scope.map(r => r.maDonVi))];
        }
        
        if (npps.length === 0) {
            nppSelect.innerHTML = '<option value="all">Không có</option>';
            nppSelect.value = 'all';
            nppSelect.disabled = true;
            updateEmployeeFilter();
            return;
        }

        nppSelect.disabled = false;
        nppSelect.innerHTML = '<option value="all">Tất cả</option>' + npps.sort().map(n => `<option value="${n}">${n}</option>`).join('');
        if (!npps.includes(nppSelect.value)) {
            nppSelect.value = 'all';
        }
        
        updateEmployeeFilter();
    };
    
    const updateEmployeeFilter = () => {
        let effectiveArea = areaSelect.value;
        const region = normalizeFilterRegion(regionSelect.value);
        
        if (!isAdmin() && getUserArea()) {
            effectiveArea = getUserArea();
        }
        
        const selectedNpp = nppSelect.value;
        
        let employees = reportData;
        if (!isAdmin()) {
            employees = employees.filter(e => e.area === effectiveArea);
        } else {
            if (region !== 'all') {
                employees = employees.filter(e => getFilterAreaRegion(e.area) === region);
            }
            if (effectiveArea !== 'all') {
                employees = employees.filter(e => e.area === effectiveArea);
            }
        }
        if (selectedNpp !== 'all') {
            employees = employees.filter(e => e.maDonVi === selectedNpp);
        }
        
        employeeSelect.innerHTML = '<option value="all">Tất cả</option>' + 
            employees.map(e => `<option value="${e.maNV}">${e.tenNV} (${e.maNV})</option>`).join('');
    };

    const syncRegionState = () => {
        if (!isAdmin()) {
            const userArea = getUserArea();
            const userRegion = getFilterAreaRegion(userArea);
            regionSelect.value = userRegion || 'all';
            regionSelect.disabled = true;
            regionSelect.style.opacity = '0.7';
            regionSelect.title = userRegion ? 'Bạn chỉ có quyền xem miền tương ứng với khu vực của mình' : 'Bạn chỉ có quyền xem dữ liệu của mình';
            return;
        }

        regionSelect.disabled = false;
        regionSelect.style.opacity = '1';
        regionSelect.title = '';
    };
    
    areaSelect.addEventListener('change', () => {
        updateNppFilter();
        renderDetail();
        if (isAdmin()) {
            renderOverview();
        }
    });

    regionSelect.addEventListener('change', () => {
        updateAreaFilter();
        updateNppFilter();
        renderDetail();
        if (isAdmin()) {
            renderOverview();
        }
    });
    
    nppSelect.addEventListener('change', () => {
        updateEmployeeFilter();
        renderDetail();
        if (isAdmin()) {
            renderOverview();
        }
    });
    
    employeeSelect.addEventListener('change', () => {
        renderDetail();
        if (isAdmin()) {
            renderOverview();
        }
    });
    
    syncRegionState();
    updateAreaFilter();
    updateNppFilter();
}

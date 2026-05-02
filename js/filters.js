// filters.js - Quản lý bộ lọc (cập nhật thêm phân quyền)

function getFilteredData() {
    const area = document.getElementById('areaFilter').value;
    const npp = document.getElementById('nppFilter').value;
    const employee = document.getElementById('employeeFilter').value;
    
    let filtered = reportData;
    
    // Áp dụng filter khu vực với phân quyền
    if (!isAdmin()) {
        const userArea = getUserArea();
        if (userArea) {
            filtered = filtered.filter(emp => emp.area === userArea);
        }
    } else {
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
    
    areaSelect.innerHTML = '<option value="all">Tất cả</option>' + allAreas.sort().map(a => `<option value="${a}">${a}</option>`).join('');
    
    // Nếu không phải admin, disable select khu vực
    if (!isAdmin() && allAreas.length === 1) {
        areaSelect.disabled = true;
        areaSelect.value = allAreas[0];
        areaSelect.style.opacity = '0.7';
        areaSelect.title = 'Bạn chỉ có quyền xem khu vực này';
    } else if (!isAdmin()) {
        areaSelect.disabled = true;
        areaSelect.style.opacity = '0.7';
        areaSelect.title = 'Bạn chỉ có quyền xem khu vực của mình';
        if (allAreas.length > 0) {
            areaSelect.value = allAreas[0];
        }
    } else {
        areaSelect.disabled = false;
        areaSelect.style.opacity = '1';
        areaSelect.title = '';
    }
    
    const updateNppFilter = () => {
        let effectiveArea = areaSelect.value;
        
        if (!isAdmin() && getUserArea()) {
            effectiveArea = getUserArea();
        }
        
        let npps = [];
        if (effectiveArea === 'all') {
            npps = [...new Set(reportData.map(r => r.maDonVi))];
        } else {
            npps = [...new Set(reportData.filter(r => r.area === effectiveArea).map(r => r.maDonVi))];
        }
        
        nppSelect.innerHTML = '<option value="all">Tất cả</option>' + npps.sort().map(n => `<option value="${n}">${n}</option>`).join('');
        
        updateEmployeeFilter();
    };
    
    const updateEmployeeFilter = () => {
        let effectiveArea = areaSelect.value;
        
        if (!isAdmin() && getUserArea()) {
            effectiveArea = getUserArea();
        }
        
        const selectedNpp = nppSelect.value;
        
        let employees = reportData;
        if (effectiveArea !== 'all') {
            employees = employees.filter(e => e.area === effectiveArea);
        }
        if (selectedNpp !== 'all') {
            employees = employees.filter(e => e.maDonVi === selectedNpp);
        }
        
        employeeSelect.innerHTML = '<option value="all">Tất cả</option>' + 
            employees.map(e => `<option value="${e.maNV}">${e.tenNV} (${e.maNV})</option>`).join('');
    };
    
    areaSelect.addEventListener('change', () => {
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
    
    updateNppFilter();
}
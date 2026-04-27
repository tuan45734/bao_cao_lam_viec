// filters.js - Quản lý bộ lọc

function getFilteredData() {
    const area = document.getElementById('areaFilter').value;
    const npp = document.getElementById('nppFilter').value;
    const employee = document.getElementById('employeeFilter').value;
    
    let filtered = reportData;
    
    if (area !== 'all') {
        filtered = filtered.filter(emp => emp.area === area);
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
    
    const areas = [...new Set(reportData.map(r => r.area))];
    areaSelect.innerHTML = '<option value="all">Tất cả</option>' + areas.map(a => `<option value="${a}">${a}</option>`).join('');
    
    const updateNppFilter = () => {
        const selectedArea = areaSelect.value;
        let npps = [];
        if (selectedArea === 'all') {
            npps = [...new Set(reportData.map(r => r.maDonVi))];
        } else {
            npps = [...new Set(reportData.filter(r => r.area === selectedArea).map(r => r.maDonVi))];
        }
        nppSelect.innerHTML = '<option value="all">Tất cả</option>' + npps.sort().map(n => `<option value="${n}">${n}</option>`).join('');
        
        // Cập nhật employee filter khi đổi khu vực/NPP
        updateEmployeeFilter();
    };
    
    const updateEmployeeFilter = () => {
        const selectedArea = areaSelect.value;
        const selectedNpp = nppSelect.value;
        
        let employees = reportData;
        if (selectedArea !== 'all') {
            employees = employees.filter(e => e.area === selectedArea);
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
        renderOverview();
    });
    
    nppSelect.addEventListener('change', () => {
        updateEmployeeFilter();
        renderDetail();
        renderOverview();
    });
    
    employeeSelect.addEventListener('change', () => {
        renderDetail();
        renderOverview();
    });
    
    updateNppFilter();
}
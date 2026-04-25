// excelExport.js - Xuất 2 file riêng: Tổng hợp và Chi tiết (đã thêm cột thông tin nhân viên và số ngày chấm công)

// Dữ liệu nhân viên bổ sung
const EMPLOYEE_EXTRA_DATA =[
 {   "ma": "PP1",   "ma_nhan_vien": "A1",   "chuc_vu": "ASM",   "ngay_bat_dau": "01/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP10",   "ma_nhan_vien": "A104",   "chuc_vu": "GS",   "ngay_bat_dau": "19/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP11",   "ma_nhan_vien": "A104.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "19/03/2025",   "ngay_ket_thuc": "02/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP686",   "ma_nhan_vien": "A104.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "21/11/2025",   "ngay_ket_thuc": "09/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP13",   "ma_nhan_vien": "A104.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "04/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP305",   "ma_nhan_vien": "A104.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP488",   "ma_nhan_vien": "A104.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP12",   "ma_nhan_vien": "A104.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "12/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP914",   "ma_nhan_vien": "A104.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP37",   "ma_nhan_vien": "A202.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/05/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP766",   "ma_nhan_vien": "TH202.01",   "chuc_vu": "NV \n Tổng hợp",   "ngay_bat_dau": "16/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "Tính lương nhân viên tổng hợp" },
 {   "ma": "PP601",   "ma_nhan_vien": "A201",   "chuc_vu": "GS",   "ngay_bat_dau": "10/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP635",   "ma_nhan_vien": "A201.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP413",   "ma_nhan_vien": "A201.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP872",   "ma_nhan_vien": "A201.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP834",   "ma_nhan_vien": "A201.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP418",   "ma_nhan_vien": "A210",   "chuc_vu": "GS",   "ngay_bat_dau": "11/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP419",   "ma_nhan_vien": "A210.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP420",   "ma_nhan_vien": "A210.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP550",   "ma_nhan_vien": "A210.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "20/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP719",   "ma_nhan_vien": "A210.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP720",   "ma_nhan_vien": "A210.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "19/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP201",   "ma_nhan_vien": "A204",   "chuc_vu": "GS",   "ngay_bat_dau": "01/06/2025",   "ngay_ket_thuc": "16/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP922",   "ma_nhan_vien": "A111",   "chuc_vu": "GSBH",   "ngay_bat_dau": "14/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP688",   "ma_nhan_vien": "A204.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP884",   "ma_nhan_vien": "A204.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP885",   "ma_nhan_vien": "A204.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP886",   "ma_nhan_vien": "A204.11",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP4",   "ma_nhan_vien": "A102",   "chuc_vu": "GS",   "ngay_bat_dau": "14/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP788",   "ma_nhan_vien": "A102.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP284",   "ma_nhan_vien": "A102.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP7",   "ma_nhan_vien": "A102.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "14/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP747",   "ma_nhan_vien": "A102.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP765",   "ma_nhan_vien": "A102.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "20/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP871",   "ma_nhan_vien": "A102.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "L1: 22/03/2026\nL2: 06/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP833",   "ma_nhan_vien": "A102.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP558",   "ma_nhan_vien": "A105",   "chuc_vu": "GS",   "ngay_bat_dau": "24/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP489",   "ma_nhan_vien": "A105.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP237",   "ma_nhan_vien": "A105.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP366",   "ma_nhan_vien": "A105.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP598",   "ma_nhan_vien": "A105.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP835",   "ma_nhan_vien": "A105.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/03/2026",   "ngay_ket_thuc": "18/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP938",   "ma_nhan_vien": "A105.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "21/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "",   "ma_nhan_vien": "",   "chuc_vu": "",   "ngay_bat_dau": "",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP495",   "ma_nhan_vien": "A208",   "chuc_vu": "GS",   "ngay_bat_dau": "28/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP249",   "ma_nhan_vien": "A208.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP317",   "ma_nhan_vien": "A208.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP589",   "ma_nhan_vien": "A208.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP636",   "ma_nhan_vien": "A208.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "31/10/2025",   "ngay_ket_thuc": "07/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP837",   "ma_nhan_vien": "A208.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP687",   "ma_nhan_vien": "A205",   "chuc_vu": "GS",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP44",   "ma_nhan_vien": "A205.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "24/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP199",   "ma_nhan_vien": "A205.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP540",   "ma_nhan_vien": "A205.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP787",   "ma_nhan_vien": "A205.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP701",   "ma_nhan_vien": "A205.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP796",   "ma_nhan_vien": "A212",   "chuc_vu": "GS",   "ngay_bat_dau": "21/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP161",   "ma_nhan_vien": "A203.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/05/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP696",   "ma_nhan_vien": "A203.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP797",   "ma_nhan_vien": "A203.11",   "chuc_vu": "NVBH",   "ngay_bat_dau": "24/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP882",   "ma_nhan_vien": "A212.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "27/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP604",   "ma_nhan_vien": "A213",   "chuc_vu": "GS",   "ngay_bat_dau": "20/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP606",   "ma_nhan_vien": "A203.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "21/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP605",   "ma_nhan_vien": "A203.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "21/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP699",   "ma_nhan_vien": "A203.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "08/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP915",   "ma_nhan_vien": "A213.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP484",   "ma_nhan_vien": "A101",   "chuc_vu": "GS",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP519",   "ma_nhan_vien": "A101.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP486",   "ma_nhan_vien": "A101.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP811",   "ma_nhan_vien": "A101.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP913",   "ma_nhan_vien": "A101.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP561",   "ma_nhan_vien": "A2",   "chuc_vu": "ASM",   "ngay_bat_dau": "01/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP91",   "ma_nhan_vien": "A408",   "chuc_vu": "GS",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP702",   "ma_nhan_vien": "A408.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "08/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP93",   "ma_nhan_vien": "A408.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP94",   "ma_nhan_vien": "A408.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP357",   "ma_nhan_vien": "A411",   "chuc_vu": "GS",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP360",   "ma_nhan_vien": "A411.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP358",   "ma_nhan_vien": "A411.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP359",   "ma_nhan_vien": "KEY411.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP361",   "ma_nhan_vien": "A411.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP512",   "ma_nhan_vien": "KEY411.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP665",   "ma_nhan_vien": "A411.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "11/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP689",   "ma_nhan_vien": "A411.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP769",   "ma_nhan_vien": "A411.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "12/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP770",   "ma_nhan_vien": "A411.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP781",   "ma_nhan_vien": "A411.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "26/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP89",   "ma_nhan_vien": "A407",   "chuc_vu": "GS",   "ngay_bat_dau": "01/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP96",   "ma_nhan_vien": "A407.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP98",   "ma_nhan_vien": "A407.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP887",   "ma_nhan_vien": "A407.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP563",   "ma_nhan_vien": "A207",   "chuc_vu": "GS",   "ngay_bat_dau": "01/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP319",   "ma_nhan_vien": "A207.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP280",   "ma_nhan_vien": "A207.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "23/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP320",   "ma_nhan_vien": "A207.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP742",   "ma_nhan_vien": "A207.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP204",   "ma_nhan_vien": "A409",   "chuc_vu": "GS",   "ngay_bat_dau": "02/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP206",   "ma_nhan_vien": "A409.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP207",   "ma_nhan_vien": "KEY409.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP690",   "ma_nhan_vien": "A409.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP839",   "ma_nhan_vien": "A409.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP861",   "ma_nhan_vien": "A409.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "18/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP326",   "ma_nhan_vien": "A404",   "chuc_vu": "GS",   "ngay_bat_dau": "08/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP508",   "ma_nhan_vien": "A404.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP328",   "ma_nhan_vien": "A404.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "14/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP862",   "ma_nhan_vien": "A404.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP628",   "ma_nhan_vien": "A404.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/11/2025",   "ngay_ket_thuc": "17/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP738",   "ma_nhan_vien": "A404.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "05/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP798",   "ma_nhan_vien": "A216",   "chuc_vu": "GS",   "ngay_bat_dau": "21/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP104",   "ma_nhan_vien": "KEY404.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP767",   "ma_nhan_vien": "A216.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "20/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP740",   "ma_nhan_vien": "A216.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "L1:05/01/2026\nL2: 25/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP841",   "ma_nhan_vien": "A216.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP789",   "ma_nhan_vien": "A217",   "chuc_vu": "GS",   "ngay_bat_dau": "04/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP743",   "ma_nhan_vien": "A214.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "05/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP664",   "ma_nhan_vien": "A214.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "19/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP768",   "ma_nhan_vien": "A214.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP840",   "ma_nhan_vien": "A214.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/03/2026",   "ngay_ket_thuc": "13/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP923",   "ma_nhan_vien": "A217.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "14/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP373",   "ma_nhan_vien": "A209",   "chuc_vu": "GS",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP498",   "ma_nhan_vien": "A211.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP497",   "ma_nhan_vien": "A211.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP638",   "ma_nhan_vien": "A211.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP786",   "ma_nhan_vien": "A211.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "27/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP939",   "ma_nhan_vien": "A211.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "21/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP829",   "ma_nhan_vien": "A218",   "chuc_vu": "GS",   "ngay_bat_dau": "02/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP423",   "ma_nhan_vien": "A209.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "21/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP551",   "ma_nhan_vien": "A209.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "22/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP623",   "ma_nhan_vien": "A209.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "27/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP802",   "ma_nhan_vien": "A209.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "26/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP45",   "ma_nhan_vien": "A206",   "chuc_vu": "GS",   "ngay_bat_dau": "06/05/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP170",   "ma_nhan_vien": "A206.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/05/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP171",   "ma_nhan_vien": "A206.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "14/05/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP761",   "ma_nhan_vien": "A206.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "12/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP697",   "ma_nhan_vien": "A206.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP256",   "ma_nhan_vien": "A4",   "chuc_vu": "ASM",   "ngay_bat_dau": "16/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP190",   "ma_nhan_vien": "A410",   "chuc_vu": "GS",   "ngay_bat_dau": "15/05/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP191",   "ma_nhan_vien": "A410.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "15/05/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP491",   "ma_nhan_vien": "A410.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP715",   "ma_nhan_vien": "KEY410.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "08/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP492",   "ma_nhan_vien": "A410.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP527",   "ma_nhan_vien": "A410.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "15/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP735",   "ma_nhan_vien": "A410.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP883",   "ma_nhan_vien": "A410.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP751",   "ma_nhan_vien": "A702",   "chuc_vu": "GS",   "ngay_bat_dau": "06/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP756",   "ma_nhan_vien": "A702.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP725",   "ma_nhan_vien": "A702.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP819",   "ma_nhan_vien": "A702.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP892",   "ma_nhan_vien": "A702.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP616",   "ma_nhan_vien": "A701",   "chuc_vu": "GS",   "ngay_bat_dau": "13/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP724",   "ma_nhan_vien": "A109.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP654",   "ma_nhan_vien": "A109.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "14/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP694",   "ma_nhan_vien": "A109.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "26/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP809",   "ma_nhan_vien": "A109.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "25/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP842",   "ma_nhan_vien": "A109.12",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/03/2026",   "ngay_ket_thuc": "10/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP888",   "ma_nhan_vien": "A701.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP924",   "ma_nhan_vien": "A701.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP647",   "ma_nhan_vien": "A703",   "chuc_vu": "GS",   "ngay_bat_dau": "01/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP649",   "ma_nhan_vien": "A703.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "12/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP757",   "ma_nhan_vien": "A703.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "12/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP810",   "ma_nhan_vien": "A703.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "27/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP843",   "ma_nhan_vien": "A703.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP821",   "ma_nhan_vien": "KEY703.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "L1:01/03/2026\n L2:23/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP306",   "ma_nhan_vien": "A406",   "chuc_vu": "GS",   "ngay_bat_dau": "04/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP873",   "ma_nhan_vien": "A406.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "25/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP308",   "ma_nhan_vien": "A406.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP315",   "ma_nhan_vien": "A406.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP493",   "ma_nhan_vien": "A406.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP863",   "ma_nhan_vien": "A406.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP112",   "ma_nhan_vien": "A402",   "chuc_vu": "GS",   "ngay_bat_dau": "15/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP620",   "ma_nhan_vien": "A402.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "23/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP889",   "ma_nhan_vien": "A402.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "07/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "Thử việc dưới 7 ngày không tính công" },
 {   "ma": "PP890",   "ma_nhan_vien": "A402.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "06/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "Thử việc dưới 7 ngày không tính công" },
 {   "ma": "PP916",   "ma_nhan_vien": "A402.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP365",   "ma_nhan_vien": "A401",   "chuc_vu": "GS",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP363",   "ma_nhan_vien": "KEY401.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP733",   "ma_nhan_vien": "A401.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP714",   "ma_nhan_vien": "A401.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP578",   "ma_nhan_vien": "A401.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP759",   "ma_nhan_vien": "A401.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP820",   "ma_nhan_vien": "A401.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP651",   "ma_nhan_vien": "A704",   "chuc_vu": "GS",   "ngay_bat_dau": "11/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP652",   "ma_nhan_vien": "A701.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "08/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP695",   "ma_nhan_vien": "A701.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "23/11/2025",   "ngay_ket_thuc": "01/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP619",   "ma_nhan_vien": "A701.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "25/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP716",   "ma_nhan_vien": "A701.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP874",   "ma_nhan_vien": "A701.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP891",   "ma_nhan_vien": "A704.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP557",   "ma_nhan_vien": "A7",   "chuc_vu": "ASM",   "ngay_bat_dau": "24/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP381",   "ma_nhan_vien": "A310",   "chuc_vu": "GS",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP400",   "ma_nhan_vien": "A310.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "04/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP595",   "ma_nhan_vien": "A310.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP624",   "ma_nhan_vien": "A310.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "27/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP670",   "ma_nhan_vien": "A310.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "12/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP851",   "ma_nhan_vien": "A310.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP807",   "ma_nhan_vien": "A310.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "25/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP378",   "ma_nhan_vien": "A309",   "chuc_vu": "GS",   "ngay_bat_dau": "29/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP379",   "ma_nhan_vien": "A309.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "04/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP380",   "ma_nhan_vien": "A309.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "04/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP456",   "ma_nhan_vien": "A309.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "18/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP547",   "ma_nhan_vien": "A309.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "29/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP753",   "ma_nhan_vien": "A309.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP806",   "ma_nhan_vien": "A309.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "28/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP630",   "ma_nhan_vien": "A311",   "chuc_vu": "GS",   "ngay_bat_dau": "01/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP588",   "ma_nhan_vien": "A311.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/10/2025",   "ngay_ket_thuc": "14/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP476",   "ma_nhan_vien": "A310.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "04/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP762",   "ma_nhan_vien": "A311.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "14/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP828",   "ma_nhan_vien": "A311.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP302",   "ma_nhan_vien": "A403",   "chuc_vu": "GS",   "ngay_bat_dau": "01/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP875",   "ma_nhan_vien": "A403.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "23/03/2026",   "ngay_ket_thuc": "07/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP332",   "ma_nhan_vien": "A403.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "14/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP278",   "ma_nhan_vien": "A403.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP542",   "ma_nhan_vien": "A403.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP921",   "ma_nhan_vien": "A403.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP20",   "ma_nhan_vien": "A106",   "chuc_vu": "GS",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP23",   "ma_nhan_vien": "A106.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "12/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP22",   "ma_nhan_vien": "A106.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP209",   "ma_nhan_vien": "A106.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP434",   "ma_nhan_vien": "A106.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP600",   "ma_nhan_vien": "A106.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP846",   "ma_nhan_vien": "A106.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP439",   "ma_nhan_vien": "A302",   "chuc_vu": "GS",   "ngay_bat_dau": "11/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP441",   "ma_nhan_vien": "A302.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "18/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP726",   "ma_nhan_vien": "A302.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "30/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP385",   "ma_nhan_vien": "A302.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP704",   "ma_nhan_vien": "A302.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP805",   "ma_nhan_vien": "A302.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "28/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP692",   "ma_nhan_vien": "A313",   "chuc_vu": "GS",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP263",   "ma_nhan_vien": "A306.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP771",   "ma_nhan_vien": "A306.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "19/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP799",   "ma_nhan_vien": "A306.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "21/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP847",   "ma_nhan_vien": "A306.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP475",   "ma_nhan_vien": "A413",   "chuc_vu": "GS",   "ngay_bat_dau": "26/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP471",   "ma_nhan_vien": "A301.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "21/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP668",   "ma_nhan_vien": "A413.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/11/2025",   "ngay_ket_thuc": "03/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP722",   "ma_nhan_vien": "A413.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "22/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP804",   "ma_nhan_vien": "A413.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "28/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP865",   "ma_nhan_vien": "A413.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "18/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP918",   "ma_nhan_vien": "A413.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP919",   "ma_nhan_vien": "A413.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP49",   "ma_nhan_vien": "A301",   "chuc_vu": "GS",   "ngay_bat_dau": "11/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP848",   "ma_nhan_vien": "A301.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/03/2026",   "ngay_ket_thuc": "03/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP211",   "ma_nhan_vien": "A301.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/01/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP213",   "ma_nhan_vien": "A301.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP548",   "ma_nhan_vien": "A301.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "26/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP532",   "ma_nhan_vien": "A301.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "11/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP666",   "ma_nhan_vien": "A301.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP691",   "ma_nhan_vien": "A301.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "23/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP803",   "ma_nhan_vien": "A301.11",   "chuc_vu": "NVBH",   "ngay_bat_dau": "25/02/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP850",   "ma_nhan_vien": "A301.13",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/03/2026",   "ngay_ket_thuc": "09/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP917",   "ma_nhan_vien": "A301.15",   "chuc_vu": "NVBH",   "ngay_bat_dau": "04/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP926",   "ma_nhan_vien": "A301.16",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP239",   "ma_nhan_vien": "A107",   "chuc_vu": "GS",   "ngay_bat_dau": "16/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP24",   "ma_nhan_vien": "A107.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP25",   "ma_nhan_vien": "A107.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP499",   "ma_nhan_vien": "A107.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "05/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP407",   "ma_nhan_vien": "A107.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "05/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP698",   "ma_nhan_vien": "A107.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP760",   "ma_nhan_vien": "A110",   "chuc_vu": "GS",   "ngay_bat_dau": "L1:12/01/2026\nL2:16/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP748",   "ma_nhan_vien": "A107.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP893",   "ma_nhan_vien": "A110.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP925",   "ma_nhan_vien": "A110.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "",   "ma_nhan_vien": "A110.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "23/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP852",   "ma_nhan_vien": "A8",   "chuc_vu": "ASM",   "ngay_bat_dau": "10/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP729",   "ma_nhan_vien": "A314",   "chuc_vu": "GS",   "ngay_bat_dau": "02/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP73",   "ma_nhan_vien": "A304.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/05/2025",   "ngay_ket_thuc": "04/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP730",   "ma_nhan_vien": "A304.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "05/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP894",   "ma_nhan_vien": "A314.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "14/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP927",   "ma_nhan_vien": "A314.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/04/2026",   "ngay_ket_thuc": "15/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "Thử việc dưới 7 ngày không tính công" },
 {   "ma": "PP928",   "ma_nhan_vien": "A314.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP937",   "ma_nhan_vien": "A314.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "20/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP254",   "ma_nhan_vien": "A307",   "chuc_vu": "GS",   "ngay_bat_dau": "18/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP401",   "ma_nhan_vien": "A304.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP582",   "ma_nhan_vien": "A304.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/10/2025",   "ngay_ket_thuc": "09/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP323",   "ma_nhan_vien": "A304.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "15/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP644",   "ma_nhan_vien": "A307.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP674",   "ma_nhan_vien": "A307.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP755",   "ma_nhan_vien": "A307.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP929",   "ma_nhan_vien": "A307.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP815",   "ma_nhan_vien": "A304",   "chuc_vu": "GS",   "ngay_bat_dau": "28/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP552",   "ma_nhan_vien": "A304.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "22/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP68",   "ma_nhan_vien": "A304.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP900",   "ma_nhan_vien": "A304.15",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP29",   "ma_nhan_vien": "A108",   "chuc_vu": "GS",   "ngay_bat_dau": "09/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP30",   "ma_nhan_vien": "A108.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP31",   "ma_nhan_vien": "A108.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP32",   "ma_nhan_vien": "A108.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP569",   "ma_nhan_vien": "A108.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP570",   "ma_nhan_vien": "A108.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP826",   "ma_nhan_vien": "A108.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP402",   "ma_nhan_vien": "A412",   "chuc_vu": "GS",   "ngay_bat_dau": "04/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP435",   "ma_nhan_vien": "A412.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "11/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP693",   "ma_nhan_vien": "A412.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "24/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP678",   "ma_nhan_vien": "A412.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/11/2025",   "ngay_ket_thuc": "09/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP876",   "ma_nhan_vien": "A412.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP895",   "ma_nhan_vien": "A412.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP901",   "ma_nhan_vien": "A412.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP904",   "ma_nhan_vien": "A412.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP501",   "ma_nhan_vien": "A305",   "chuc_vu": "GS",   "ngay_bat_dau": "05/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP82",   "ma_nhan_vien": "A305.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "18/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP764",   "ma_nhan_vien": "A305.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "14/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP676",   "ma_nhan_vien": "A305.12",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP897",   "ma_nhan_vien": "A315.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/1026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP932",   "ma_nhan_vien": "A315.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "11/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP530",   "ma_nhan_vien": "A305.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "15/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP867",   "ma_nhan_vien": "A305.15",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/03/2026",   "ngay_ket_thuc": "20/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP931",   "ma_nhan_vien": "A305.16",   "chuc_vu": "NVBH",   "ngay_bat_dau": "14/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP583",   "ma_nhan_vien": "A308",   "chuc_vu": "GS",   "ngay_bat_dau": "04/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP607",   "ma_nhan_vien": "A305.09",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP608",   "ma_nhan_vien": "A308.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "20/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP675",   "ma_nhan_vien": "A308.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "17/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP902",   "ma_nhan_vien": "A308.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP903",   "ma_nhan_vien": "A308.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP866",   "ma_nhan_vien": "A318",   "chuc_vu": "GS",   "ngay_bat_dau": "17/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP428",   "ma_nhan_vien": "A308.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "05/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP553",   "ma_nhan_vien": "A308.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "22/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP877",   "ma_nhan_vien": "A318.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "23/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP896",   "ma_nhan_vien": "A318.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP346",   "ma_nhan_vien": "A312",   "chuc_vu": "GS",   "ngay_bat_dau": "23/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP510",   "ma_nhan_vien": "A303.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP661",   "ma_nhan_vien": "A303.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "20/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP347",   "ma_nhan_vien": "A303.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "15/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP509",   "ma_nhan_vien": "A303.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP706",   "ma_nhan_vien": "A312.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "04/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP868",   "ma_nhan_vien": "A316",   "chuc_vu": "GS",   "ngay_bat_dau": "16/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP853",   "ma_nhan_vien": "A303.11",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP878",   "ma_nhan_vien": "A303.12",   "chuc_vu": "NVBH",   "ngay_bat_dau": "23/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP879",   "ma_nhan_vien": "A316.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "26/03/2026",   "ngay_ket_thuc": "06/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP898",   "ma_nhan_vien": "A316.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "04/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "Thử việc dưới 7 ngày không tính công" },
 {   "ma": "PP905",   "ma_nhan_vien": "A316.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "06/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "Thử việc dưới 7 ngày không tính công" },
 {   "ma": "PP906",   "ma_nhan_vien": "A316.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP933",   "ma_nhan_vien": "A316.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "11/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP936",   "ma_nhan_vien": "A316.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "20/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP351",   "ma_nhan_vien": "A5",   "chuc_vu": "ASM",   "ngay_bat_dau": "29/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP793",   "ma_nhan_vien": "A516",   "chuc_vu": "GS",   "ngay_bat_dau": "06/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP679",   "ma_nhan_vien": "A501.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP855",   "ma_nhan_vien": "A502.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP129",   "ma_nhan_vien": "A502.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP225",   "ma_nhan_vien": "A502.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP709",   "ma_nhan_vien": "A502.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP934",   "ma_nhan_vien": "A516.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP816",   "ma_nhan_vien": "A501",   "chuc_vu": "GS",   "ngay_bat_dau": "01/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP708",   "ma_nhan_vien": "A502.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP443",   "ma_nhan_vien": "A502.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP854",   "ma_nhan_vien": "A501.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "04/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP126",   "ma_nhan_vien": "A503",   "chuc_vu": "GS",   "ngay_bat_dau": "10/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP134",   "ma_nhan_vien": "A503.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/03/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP227",   "ma_nhan_vien": "A503.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "31/05/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP808",   "ma_nhan_vien": "A503.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP513",   "ma_nhan_vien": "A503.11",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP899",   "ma_nhan_vien": "A503.12",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP267",   "ma_nhan_vien": "A508",   "chuc_vu": "GS",   "ngay_bat_dau": "17/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP282",   "ma_nhan_vien": "A508.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP333",   "ma_nhan_vien": "A508.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "10/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP503",   "ma_nhan_vien": "A508.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "08/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP817",   "ma_nhan_vien": "A508.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP228",   "ma_nhan_vien": "A503.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "09/04/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP281",   "ma_nhan_vien": "A508.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP479",   "ma_nhan_vien": "A515",   "chuc_vu": "GS",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP303",   "ma_nhan_vien": "A503.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP611",   "ma_nhan_vien": "A503.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP269",   "ma_nhan_vien": "A503.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP270",   "ma_nhan_vien": "A503.10",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP778",   "ma_nhan_vien": "A503.12",   "chuc_vu": "NVBH",   "ngay_bat_dau": "20/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP880",   "ma_nhan_vien": "A503.16",   "chuc_vu": "NVBH",   "ngay_bat_dau": "25/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP178",   "ma_nhan_vien": "A507",   "chuc_vu": "GS",   "ngay_bat_dau": "15/05/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP727",   "ma_nhan_vien": "A510.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "29/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP780",   "ma_nhan_vien": "A510.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP273",   "ma_nhan_vien": "A507.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP272",   "ma_nhan_vien": "A507.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "16/06/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP792",   "ma_nhan_vien": "A507.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "04/02/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP574",   "ma_nhan_vien": "A509",   "chuc_vu": "GS",   "ngay_bat_dau": "02/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP575",   "ma_nhan_vien": "A509.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "Nghỉ nằm viện từ ngày 06/04/2026 đến hết tháng 04/2026" },
 {   "ma": "PP683",   "ma_nhan_vien": "A509.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP684",   "ma_nhan_vien": "A509.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "18/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP825",   "ma_nhan_vien": "A509.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP341",   "ma_nhan_vien": "A512",   "chuc_vu": "GS",   "ngay_bat_dau": "19/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP342",   "ma_nhan_vien": "A505.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "19/07/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP573",   "ma_nhan_vien": "A512.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP614",   "ma_nhan_vien": "A512.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP911",   "ma_nhan_vien": "A512.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP912",   "ma_nhan_vien": "A512.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP580",   "ma_nhan_vien": "A514",   "chuc_vu": "GS",   "ngay_bat_dau": "04/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP482",   "ma_nhan_vien": "A511.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP389",   "ma_nhan_vien": "A511.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP857",   "ma_nhan_vien": "A518.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "11/03/2026",   "ngay_ket_thuc": "01/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP481",   "ma_nhan_vien": "A504.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "03/09/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP710",   "ma_nhan_vien": "A504.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "04/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP613",   "ma_nhan_vien": "A504.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "13/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP910",   "ma_nhan_vien": "A504.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP645",   "ma_nhan_vien": "A506",   "chuc_vu": "GS",   "ngay_bat_dau": "01/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP610",   "ma_nhan_vien": "A505.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "22/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP625",   "ma_nhan_vien": "A506.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "22/10/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP732",   "ma_nhan_vien": "A506.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "02/01/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP824",   "ma_nhan_vien": "A506.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP908",   "ma_nhan_vien": "A506.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "06/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "Thử việc dưới 7 ngày không tính công" },
 {   "ma": "PP909",   "ma_nhan_vien": "A506.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/04/2026",   "ngay_ket_thuc": "15/04/2026",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "Thử việc dưới 7 ngày không tính công" },
 {   "ma": "PP935",   "ma_nhan_vien": "A506.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "18/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP446",   "ma_nhan_vien": "A513",   "chuc_vu": "GS",   "ngay_bat_dau": "12/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP711",   "ma_nhan_vien": "A513.02",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/12/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP448",   "ma_nhan_vien": "A513.04",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/08/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP680",   "ma_nhan_vien": "A513.06",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP856",   "ma_nhan_vien": "A513.07",   "chuc_vu": "NVBH",   "ngay_bat_dau": "05/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP907",   "ma_nhan_vien": "A513.08",   "chuc_vu": "NVBH",   "ngay_bat_dau": "01/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP859",   "ma_nhan_vien": "A519",   "chuc_vu": "GS",   "ngay_bat_dau": "10/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP681",   "ma_nhan_vien": "A512.05",   "chuc_vu": "NVBH",   "ngay_bat_dau": "06/11/2025",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP860",   "ma_nhan_vien": "A519.01",   "chuc_vu": "NVBH",   "ngay_bat_dau": "12/03/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "PP920",   "ma_nhan_vien": "A519.03",   "chuc_vu": "NVBH",   "ngay_bat_dau": "07/04/2026",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "",   "ma_nhan_vien": "",   "chuc_vu": "",   "ngay_bat_dau": "",   "ngay_ket_thuc": "",   "phat_bao_cao": 0,   "phat_cham_anh": "0",   "phat_dong_phuc_khac": 0,   "ghi_chu": "" },
 {   "ma": "",   "ma_nhan_vien": "",   "chuc_vu": "",   "ngay_bat_dau": "",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "",   "ma_nhan_vien": "",   "chuc_vu": "",   "ngay_bat_dau": "",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "",   "phat_dong_phuc_khac": null,   "ghi_chu": "" },
 {   "ma": "",   "ma_nhan_vien": "",   "chuc_vu": "",   "ngay_bat_dau": "ASM",   "ngay_ket_thuc": "",   "phat_bao_cao": null,   "phat_cham_anh": "Duyệt",   "phat_dong_phuc_khac": null,   "ghi_chu": "" }
];

// Hàm lấy thông tin bổ sung của nhân viên theo mã NV
function getEmployeeExtraInfo(maNV) {
    const found = EMPLOYEE_EXTRA_DATA.find(emp => emp.ma_nhan_vien === maNV);
    if (found) {
        return {
            ma: found.ma || '',
            chucVu: found.chuc_vu || '',
            ngayBatDau: found.ngay_bat_dau || '',
            ngayKetThuc: found.ngay_ket_thuc || '',
            phat_bao_cao: found.phat_bao_cao || '',
            phat_cham_anh: found.phat_cham_anh || '',
            dong_phuc_khac: found.dong_phuc_khac || '',
            ghiChu: found.ghi_chu || ''
        };
    }
    return { ma: '', chucVu: '', ngayBatDau: '', ngayKetThuc: '', phat_bao_cao: '', phat_cham_anh: '', dong_phuc_khac: '', ghiChu: '' };
}

// Hàm tính số ngày có chấm công (vào hoặc ra) hoặc có viếng thăm > 0
function getWorkingDaysCount(emp) {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const allDates = getAllDatesInRange(fromDate, toDate);
    
    let workingDaysCount = 0;
    
    for (const date of allDates) {
        // Kiểm tra có chấm công không (có checkin hoặc checkout)
        const attendance = emp.attendanceDetails?.find(att => {
            const attDate = att.normalizedDate || att.date;
            return attDate === date;
        });
        
        const hasAttendance = attendance && (attendance.hasAnyAttendance === true || attendance.hasFullAttendance === true);
        
        // Kiểm tra có viếng thăm > 0 không
        const visit = emp.visitDetails?.find(v => v.date === date);
        const hasVisit = visit && visit.count > 0;
        
        if (hasAttendance || hasVisit) {
            workingDaysCount++;
        }
    }
    
    return workingDaysCount;
}

// Hàm lấy tất cả ngày trong khoảng
function getAllDatesInRange(fromDate, toDate) {
    const dates = [];
    const start = new Date(fromDate);
    const end = new Date(toDate);
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
}

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

// Xuất file TỔNG HỢP (đã thêm cột: Số ngày chấm công)
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
                    <th>Mã NV DMS</th>
                    <th>Họ tên</th>
                    <th>Chức vụ</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Số ngày chấm công</th>
                    <th>Vào muộn/<br>Ra sớm</th>
                    <th>Quên chấm công</th>
                    <th>Viếng thăm<br>không đủ</th>
                    <th>Tổng công</th>
                    <th>PHẠT KO GỬI/GỬI MUỘN BC (Giám sát)</th>
                    <th>PHẠT NV chấm ảnh sai</th>
                    <th>Chấm mặc áo đồng phục khác</th>
                    <th>Ghi chú</th>
                </tr>
            </thead>
            <tbody>`;
    
    for (const kv of sortedKV) {
        html += `<tr class="kv-row"><td colspan="16"><strong>🏢 KHU VỰC: ${kv}</strong></td></tr>`;
        
        const npps = groupedByKV[kv];
        const sortedNPP = Object.keys(npps).sort();
        
        for (const npp of sortedNPP) {
            html += `<tr class="npp-row"><td colspan="16"><strong>📌 ${npp}</strong></td></tr>`;
            
            const employees = npps[npp];
            let nppStt = 1;
            
            for (const emp of employees) {
                // Lấy thông tin bổ sung
                const extraInfo = getEmployeeExtraInfo(emp.maNV);
                
                // Tính số ngày chấm công (có chấm công hoặc viếng thăm > 0)
                const workingDaysCount = getWorkingDaysCount(emp);
                
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
                        <td>${extraInfo.ma}</td>
                        <td>${emp.maNV}</td>
                        <td>${emp.tenNV}</td>
                        <td>${extraInfo.chucVu}</td>
                        <td>${extraInfo.ngayBatDau}</td>
                        <td>${extraInfo.ngayKetThuc}</td>
                        <td class="number-cell"><strong>${workingDaysCount}</strong></td>
                        <td class="number-cell">${lateEarlyCount}</td>
                        <td class="number-cell">${missingAttendanceCount}</td>
                        <td class="number-cell">${insufficientVisitCount}</td>
                        <td class="number-cell"><strong>${totalDisplay}</strong></td>
                        <td>${extraInfo.phat_bao_cao}</td>
                        <td>${extraInfo.phat_cham_anh}</td>
                        <td>${extraInfo.dong_phuc_khac}</td>
                        <td>${extraInfo.ghiChu}</td>
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

// Xuất file CHI TIẾT (giữ nguyên)
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
// chatbot.js - AI Chatbot với Google Gemini API

const CHATBOT_API_KEY = 'chatbot_gemini_key';

function getChatbotApiKey() {
    return sessionStorage.getItem(CHATBOT_API_KEY) || '';
}

function saveChatbotApiKey(key) {
    sessionStorage.setItem(CHATBOT_API_KEY, key);
}

function buildReportContext() {
    if (!reportData || reportData.length === 0) return 'Chưa có dữ liệu báo cáo.';

    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const totalEmp = reportData.length;

    const areas = {};
    reportData.forEach(emp => {
        if (!areas[emp.area]) areas[emp.area] = { count: 0, lateEarly: 0, peopleLateEarly: new Set(), insuffVisit: 0, peopleInsuffVisit: new Set() };
        const a = areas[emp.area];
        a.count++;
        emp.attendanceDetails.forEach(att => {
            if (att.isLate || att.isEarly) {
                a.lateEarly++;
                a.peopleLateEarly.add(emp.maNV);
            }
        });
        emp.visitDetails.forEach(visit => {
            if ((visit.colorClass === 'danger' || visit.colorClass === 'warning' || visit.colorClass === 'warning-level2') && visit.penalty > 0) {
                a.insuffVisit++;
                a.peopleInsuffVisit.add(emp.maNV);
            }
        });
    });

    const groups = { ASM: 0, GS: 0, NV: 0 };
    reportData.forEach(emp => {
        const len = (emp.maNV || '').length;
        if (len <= 3) groups.ASM++;
        else if (len === 4) groups.GS++;
        else groups.NV++;
    });

    let areaSummary = '';
    Object.keys(areas).sort().forEach(area => {
        const a = areas[area];
        areaSummary += `- ${area}: ${a.count} NV, ${a.lateEarly} lần vào muộn/về sớm (${a.peopleLateEarly.size} người), ${a.insuffVisit} lần viếng thăm không đủ (${a.peopleInsuffVisit.size} người)\n`;
    });

    return `Dữ liệu báo cáo từ ${fromDate} đến ${toDate}:
- Tổng số nhân viên: ${totalEmp}
- ASM (mã 2-3 ký tự): ${groups.ASM}
- GS (mã 4 ký tự): ${groups.GS}
- NV (mã còn lại): ${groups.NV}

Theo khu vực:
${areaSummary}

Hãy trả lời bằng tiếng Việt, phân tích chi tiết và đưa ra đánh giá.`;
}

async function callGeminiAPI(apiKey, message) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';
    const context = buildReportContext();

    const body = {
        contents: [{
            parts: [{
                text: `Bạn là chuyên gia phân tích dữ liệu báo cáo công việc. Dưới đây là dữ liệu:\n\n${context}\n\nCâu hỏi: ${message}\n\nPhân tích chi tiết và đưa ra đánh giá, nhận xét.`
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Lỗi API: ${response.status} - ${err}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi.';
    return text;
}

function addChatMessage(text, isUser) {
    const container = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.className = `chat-msg ${isUser ? 'user' : 'ai'}`;
    div.innerHTML = `<div class="msg-text">${text.replace(/\n/g, '<br>')}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showChatLoading() {
    const container = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg ai';
    div.id = 'chat-loading';
    div.innerHTML = '<div class="msg-text"><span class="chat-dot">.</span><span class="chat-dot">.</span><span class="chat-dot">.</span></div>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function hideChatLoading() {
    const el = document.getElementById('chat-loading');
    if (el) el.remove();
}

async function handleChatSend() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (!message) return;

    const apiKey = getChatbotApiKey();
    if (!apiKey) {
        addChatMessage('⚠️ Vui lòng nhập Google AI API Key ở ô phía trên trước!', false);
        return;
    }

    addChatMessage(message, true);
    input.value = '';
    showChatLoading();

    try {
        const reply = await callGeminiAPI(apiKey, message);
        hideChatLoading();
        addChatMessage(reply, false);
    } catch (err) {
        hideChatLoading();
        addChatMessage(`❌ Lỗi: ${err.message}`, false);
    }
}

function initChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const panel = document.getElementById('chatbot-panel');
    const close = document.getElementById('chatbot-close');
    const send = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const keyInput = document.getElementById('chatbot-api-key');
    const saveKey = document.getElementById('chatbot-save-key');

    const savedKey = getChatbotApiKey();
    if (savedKey) {
        keyInput.value = savedKey;
    }

    toggle.addEventListener('click', () => {
        panel.classList.toggle('open');
    });

    close.addEventListener('click', () => {
        panel.classList.remove('open');
    });

    saveKey.addEventListener('click', () => {
        const key = keyInput.value.trim();
        if (key) {
            saveChatbotApiKey(key);
            addChatMessage('✅ Đã lưu API Key thành công!', false);
        } else {
            alert('Vui lòng nhập API Key.');
        }
    });

    send.addEventListener('click', handleChatSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSend();
    });
}

document.addEventListener('DOMContentLoaded', initChatbot);

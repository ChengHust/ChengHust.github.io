let alerts = [
  { level: "high", icon: "!", title: "计量偏差疑似超限", site: "城南变电站 · #2 主变高压侧", time: "8 分钟前", score: "98%", suggestion: "建议核查 CT 变比配置并进行现场校验" },
  { level: "high", icon: "ϟ", title: "三相电流不平衡", site: "高新园区开闭所 · 10kV Ⅱ段", time: "23 分钟前", score: "94%", suggestion: "A 相电流持续偏高，建议检查接线与负载分配" },
  { level: "medium", icon: "⌁", title: "采集数据连续缺失", site: "滨江商业中心 · 集中器 #03", time: "45 分钟前", score: "91%", suggestion: "通信信号强度低于阈值，建议远程重启后观察" },
  { level: "low", icon: "◇", title: "时钟偏差超过阈值", site: "东郊充电站 · 表计 EM-2048", time: "1 小时前", score: "87%", suggestion: "建议下发广播校时任务" },
];
let devices = [
  ["EM-1024 · 三相智能电表", "城南变电站", "关口表", "72", "异常", "1 分钟前"],
  ["EM-2048 · 三相智能电表", "东郊充电站", "结算表", "89", "关注", "刚刚"],
  ["DC-003 · 数据集中器", "滨江商业中心", "集中器", "81", "关注", "12 分钟前"],
  ["EM-3107 · 三相智能电表", "高新园区开闭所", "关口表", "96", "正常", "刚刚"],
  ["EM-4201 · 单相智能电表", "西湖居民区", "用户表", "98", "正常", "刚刚"],
  ["TC-0902 · 组合互感器", "北城工业园", "互感器", "94", "正常", "3 分钟前"],
];
let orders = {
  "待处理": [
    ["WO-20260703-018", "城南站 #2 主变计量偏差核查", "高优先级", "今天 09:30"],
    ["WO-20260703-016", "集中器 DC-003 通信恢复", "中优先级", "今天 10:00"],
  ],
  "处理中": [
    ["WO-20260702-042", "10kV Ⅱ段三相不平衡检查", "高优先级", "王工 · 进度 60%"],
    ["WO-20260702-037", "东郊站电表批量校时", "低优先级", "李工 · 进度 35%"],
  ],
  "已完成": [
    ["WO-20260702-028", "西湖小区采集成功率恢复", "已闭环", "昨天 17:42"],
    ["WO-20260701-063", "北城园区互感器温升检查", "已闭环", "7月2日 15:20"],
  ],
};
let knowledge = [
  ["▤", "电能计量装置技术管理规程", "涵盖装置配置、验收、运行维护与故障处理标准。", "DL/T 448-2016 · 已同步"],
  ["⌁", "计量偏差诊断案例集", "沉淀 132 个典型案例，包括变比错误、接线异常与谐波影响。", "132 个案例 · 更新于 2 天前"],
  ["◇", "采集通信故障处置手册", "覆盖 HPLC、4G 与专网通信链路的排查步骤。", "V3.2 · 已审核"],
  ["△", "异常用电识别规则库", "包括电流不平衡、反向电量、失压失流等 36 类规则。", "36 条规则 · 持续优化"],
  ["▣", "现场作业安全规程", "计量现场作业风险辨识、工作票与安全措施要求。", "2026 版 · 强制引用"],
  ["✦", "专家运维经验库", "来自 18 位计量专家的诊断路径与复盘结论。", "387 条经验 · Agent 可检索"],
];
let regions = {
  "上海": { health: "96.8", devices: "286", online: "99.6%", alerts: "0", orders: "2", rank: "1 / 8", status: "整体运行稳定", coords: [31.2304, 121.4737], level: "normal" },
  "苏州": { health: "95.7", devices: "214", online: "99.1%", alerts: "1", orders: "1", rank: "2 / 8", status: "1 项低风险告警待确认", coords: [31.2989, 120.5853], level: "normal" },
  "南京": { health: "91.2", devices: "178", online: "98.4%", alerts: "2", orders: "3", rank: "6 / 8", status: "存在采集通信异常", coords: [32.0603, 118.7969], level: "warning" },
  "杭州": { health: "94.9", devices: "196", online: "99.3%", alerts: "0", orders: "1", rank: "3 / 8", status: "整体运行稳定", coords: [30.2741, 120.1551], level: "normal" },
  "宁波": { health: "86.3", devices: "143", online: "97.8%", alerts: "2", orders: "4", rank: "8 / 8", status: "存在高优先级计量偏差", coords: [29.8683, 121.5440], level: "danger" },
  "合肥": { health: "93.8", devices: "112", online: "98.9%", alerts: "0", orders: "1", rank: "4 / 8", status: "整体运行稳定", coords: [31.8206, 117.2272], level: "normal" },
  "徐州": { health: "90.6", devices: "79", online: "98.1%", alerts: "1", orders: "2", rank: "7 / 8", status: "三相不平衡需持续观察", coords: [34.2044, 117.2858], level: "warning" },
  "温州": { health: "93.1", devices: "61", online: "99.0%", alerts: "0", orders: "0", rank: "5 / 8", status: "整体运行稳定", coords: [27.9939, 120.6994], level: "normal" },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const levelLabel = { high: "高风险", medium: "中风险", low: "低风险" };

function render() {
  $("#today").textContent = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "long" }).format(new Date());
  $("#alertList").innerHTML = alerts.slice(0, 3).map(alertRow).join("");
  $("#alertBoard").innerHTML = alerts.map(a => `${alertRow(a, true)}`).join("");
  $("#deviceTable").innerHTML = devices.map((d) => {
    const cls = d[4] === "正常" ? "ok" : d[4] === "关注" ? "warn" : "bad";
    return `<tr><td><strong>${d[0]}</strong><small>编号 ${d[0].split(" · ")[0]}</small></td><td>${d[1]}</td><td>${d[2]}</td><td><span class="score">${d[3]}%</span></td><td><span class="badge ${cls}">${d[4]}</span></td><td>${d[5]}</td></tr>`;
  }).join("");
  $("#kanban").innerHTML = Object.entries(orders).map(([group, cards]) => `<div><h3>${group}<span>${cards.length}</span></h3>${cards.map(c => `<article class="order-card"><em>${c[0]}</em><h4>${c[1]}</h4><p>${c[2]}</p><footer><span>计量运维组</span><span>${c[3]}</span></footer></article>`).join("")}</div>`).join("");
  $("#knowledgeGrid").innerHTML = knowledge.map(k => `<article><i>${k[0]}</i><h3>${k[1]}</h3><p>${k[2]}</p><footer>${k[3]}</footer></article>`).join("");
}
function alertRow(a, expanded = false) {
  return `<div class="alert-row"><span class="severity ${a.level}">${a.icon}</span><div class="alert-info"><strong>${a.title}</strong><p>${a.site}</p><span>${a.time} · ${levelLabel[a.level]}</span></div>${expanded ? `<div class="alert-suggestion">${a.suggestion}</div>` : ""}<div class="alert-score"><strong>${a.score}</strong><span>Agent 置信度</span></div></div>`;
}
function switchPage(id) {
  $$(".page").forEach(p => p.classList.toggle("active", p.id === id));
  $$(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.section === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function openAgent(prompt) {
  $("#agentDrawer").classList.add("open");
  $("#drawerBackdrop").classList.add("open");
  if (prompt) askAgent(prompt);
}
function closeAgent() {
  $("#agentDrawer").classList.remove("open");
  $("#drawerBackdrop").classList.remove("open");
}
async function askAgent(query) {
  if (!query.trim()) return;
  const convo = $("#conversation");
  convo.insertAdjacentHTML("beforeend", `<div class="message user"><div>${escapeHtml(query)}</div></div>`);
  $("#reasoning").classList.remove("hidden");
  convo.scrollTop = convo.scrollHeight;
  try {
    const answer = hasBackend()
      ? (await apiRequest("/agent/messages", {
          method: "POST",
          body: JSON.stringify({ query }),
        })).data.answer
      : localAgentReply(query);
    await new Promise(resolve => setTimeout(resolve, 500));
    $("#reasoning").classList.add("hidden");
    convo.insertAdjacentHTML("beforeend", `<div class="message assistant"><span>✦</span><div>${answer}</div></div>`);
    convo.scrollTop = convo.scrollHeight;
  } catch (error) {
    $("#reasoning").classList.add("hidden");
    convo.insertAdjacentHTML("beforeend", `<div class="message assistant"><span>!</span><div>Agent 服务暂时不可用，请稍后重试。</div></div>`);
    toast(error.message);
  }
}
function localAgentReply(query) {
  if (query.includes("城南") || query.includes("计量偏差")) return `已完成关联分析。该电表近 6 小时二次侧电流与主变负荷曲线的偏差由 <strong>0.4% 升至 2.8%</strong>，超过预警阈值。<div class="steps"><p>① 核对 CT 变比参数</p><p>② 检查 A 相二次回路</p><p>③ 使用标准表现场校验</p></div>综合判断：CT 变比配置或二次回路异常的可能性为 <strong>98%</strong>。`;
  if (query.includes("巡检")) return `已生成今日计划：<div class="steps"><p>09:30 城南变电站 — 计量偏差核查</p><p>11:00 高新园区 — 三相不平衡检查</p><p>14:30 滨江商业中心 — 通信恢复</p></div>`;
  if (query.includes("线损")) return "当前 4 个台区线损率偏离基线，其中城南站 10kV 城商线偏差最大（+2.1%），建议优先排查关口表和 CT 变比。";
  if (query.includes("离线")) return "当前未发现完全离线设备。集中器 DC-003 已连续 12 分钟未上送数据，建议先执行远程重启。";
  return "演示数据中暂未发现新的高风险模式。你可以指定站点、设备编号或时间范围继续分析。";
}
function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}
function toast(message) {
  $("#toast p").textContent = message;
  $("#toast").classList.add("show");
  setTimeout(() => $("#toast").classList.remove("show"), 2200);
}
function selectRegion(name) {
  const region = regions[name];
  if (!region) return;
  $("#regionName").textContent = name;
  $("#regionHealth").innerHTML = `${region.health}<small>%</small>`;
  $("#regionDevices").textContent = region.devices;
  $("#regionOnline").textContent = region.online;
  $("#regionAlerts").textContent = region.alerts;
  $("#regionOrders").textContent = region.orders;
  $("#regionRank").textContent = region.rank;
  $("#regionStatus").textContent = region.status;
}
function initRegionMap() {
  if (!window.L) {
    $("#mapLoading").textContent = "地图服务暂时无法加载";
    return;
  }
  const map = L.map("regionMap", { zoomControl: true, attributionControl: true, minZoom: 5, maxZoom: 12 }).setView([31.05, 119.8], 6);
  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);
  tiles.once("tileload", () => $("#mapLoading")?.remove());
  tiles.once("tileerror", () => {
    $("#mapLoading").textContent = "底图瓦片加载失败，请检查网络";
  });
  Object.entries(regions).forEach(([name, region]) => {
    const color = region.level === "danger" ? "#e75f58" : region.level === "warning" ? "#e0a13a" : "#168e79";
    const marker = L.circleMarker(region.coords, {
      radius: region.level === "danger" ? 10 : 8,
      color: "#fff",
      weight: 2,
      fillColor: color,
      fillOpacity: .95,
      className: `meter-marker ${region.level}`,
    }).addTo(map);
    marker.bindTooltip(`<strong>${name}</strong><br>健康度 ${region.health}% · 告警 ${region.alerts} 项`, { direction: "top", offset: [0, -8] });
    marker.on("click", () => selectRegion(name));
  });
  L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${window.METER_MIND_CONFIG.API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error?.message || `请求失败（${response.status}）`);
  return payload;
}
function hasBackend() {
  return Boolean(window.METER_MIND_CONFIG?.API_BASE_URL);
}
async function bootstrap() {
  if (hasBackend()) {
    try {
      const response = await apiRequest("/dashboard");
      ({ alerts, devices, orders, knowledge, regions } = response.data);
    } catch (error) {
      toast(`后端连接失败，当前显示缓存数据：${error.message}`);
    }
  }
  render();
  initRegionMap();
  $$(".nav-item").forEach(btn => btn.addEventListener("click", () => switchPage(btn.dataset.section)));
  $$("[data-section-link]").forEach(btn => btn.addEventListener("click", () => switchPage(btn.dataset.sectionLink)));
  $$("[data-prompt]").forEach(btn => btn.addEventListener("click", () => openAgent(btn.dataset.prompt)));
  $("#agentForm").addEventListener("submit", e => { e.preventDefault(); const v = $("#agentQuery").value; $("#agentQuery").value = ""; openAgent(v); });
  $("#drawerForm").addEventListener("submit", e => { e.preventDefault(); const v = $("#drawerInput").value; $("#drawerInput").value = ""; askAgent(v); });
  $("#closeDrawer").addEventListener("click", closeAgent);
  $("#drawerBackdrop").addEventListener("click", closeAgent);
  $("#newTask").addEventListener("click", () => { switchPage("orders"); toast("已创建一条智能巡检草稿"); });
  $("#searchButton").addEventListener("click", () => { $("#agentQuery").focus(); toast("输入设备、站点或问题即可搜索"); });
  $("#viewRegion").addEventListener("click", () => { switchPage("devices"); toast(`已筛选${$("#regionName").textContent}区域设备`); });
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault(); switchPage("cockpit"); $("#agentQuery").focus();
    }
    if (e.key === "Escape") closeAgent();
  });
}
bootstrap();

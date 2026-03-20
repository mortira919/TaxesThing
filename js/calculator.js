let people = [];
let personId = 0;

function updateTaxOptions() {
  const country  = document.getElementById('calc-country').value;
  const regimes  = getTaxRegimes(country);
  const sel      = document.getElementById('global-tax');
  const prev     = sel.value;

  sel.innerHTML = regimes.map(r =>
    `<option value="${r.id}" ${r.id === prev ? 'selected' : ''}>${r.label}</option>`
  ).join('');

  updateTaxDesc();
  recalc();
}

function updateTaxDesc() {
  const country = document.getElementById('calc-country').value;
  const regId   = document.getElementById('global-tax').value;
  const regimes = getTaxRegimes(country);
  const regime  = regimes.find(r => r.id === regId);
  document.getElementById('tax-desc').textContent = regime?.desc || '';
}

function toggleIpOwner() {
  const isSingle = document.getElementById('single-ip-mode').value === 'single';
  const row = document.getElementById('ip-owner-row');
  if (row) row.style.display = isSingle ? 'flex' : 'none';
  refreshIpOwnerSelect();
}

function refreshIpOwnerSelect() {
  const sel = document.getElementById('ip-owner-select');
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = people.map((p, i) =>
    `<option value="${p.id}" ${String(p.id) === String(prev) ? 'selected' : ''}>
      ${p.name || `Участник ${i + 1}`}
    </option>`
  ).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('global-tax').addEventListener('change', () => {
    updateTaxDesc();
    recalc();
  });

  updateTaxOptions();
  addPerson();
  addPerson();
});

function addPerson() {
  const id = ++personId;
  const usedPercent = people.reduce((s, p) => s + (p.percent || 0), 0);
  const defaultPercent = Math.max(0, 100 - usedPercent);

  people.push({ id, name: '', percent: defaultPercent });
  renderPeople();
  refreshIpOwnerSelect();
  recalc();
}

function removePerson(id) {
  people = people.filter(p => p.id !== id);
  renderPeople();
  refreshIpOwnerSelect();
  recalc();
}

function renderPeople() {
  const container = document.getElementById('people-list');
  container.innerHTML = people.map((p, i) => `
    <div class="person-row" id="person-row-${p.id}">
      <div class="person-num">${i + 1}</div>
      <div class="field">
        <label>Имя / Участник</label>
        <input
          type="text"
          value="${p.name}"
          placeholder="Иван Иванов"
          oninput="updatePerson(${p.id}, 'name', this.value); refreshIpOwnerSelect(); recalc()"
        />
      </div>
      <div class="field field--percent">
        <label>Доля %</label>
        <div class="percent-input-wrap">
          <input
            type="number"
            value="${p.percent}"
            min="0" max="100" step="1"
            oninput="updatePerson(${p.id}, 'percent', +this.value); recalc()"
          />
          <span class="percent-sign">%</span>
        </div>
      </div>
      ${people.length > 1
        ? `<button class="remove-btn" onclick="removePerson(${p.id})" title="Удалить">✕</button>`
        : '<div style="width:36px"></div>'
      }
    </div>
  `).join('');
}

function updatePerson(id, field, value) {
  const p = people.find(p => p.id === id);
  if (p) p[field] = value;
}

// Основной расчёт
function recalc() {
  const total    = parseFloat(document.getElementById('total-amount').value) || 0;
  const currency = document.getElementById('calc-currency').value;
  const country  = document.getElementById('calc-country').value;
  const regId    = document.getElementById('global-tax').value;
  const isSingle = document.getElementById('single-ip-mode')?.value === 'single';

  const usedPercent = people.reduce((s, p) => s + (parseFloat(p.percent) || 0), 0);
  const warn = document.getElementById('percent-warning');

  if (people.length > 0 && Math.abs(usedPercent - 100) > 0.01) {
    const diff = 100 - usedPercent;
    warn.textContent = `⚠ Сумма долей: ${usedPercent}% — ${diff > 0 ? 'не хватает' : 'лишнее'} ${Math.abs(diff).toFixed(1)}%`;
  } else {
    warn.textContent = '';
  }

  if (total <= 0 || !people.length) {
    document.getElementById('result-card').style.display = 'none';
    return;
  }

  const regimes = getTaxRegimes(country);
  const regime  = regimes.find(r => r.id === regId);

  let rows;
  let totalNet = 0;
  let totalTax = 0;
  let summaryHtml = '';

  if (isSingle) {
    // Одно ИП платит налоги со всей суммы
    const ipOwnerId = parseInt(document.getElementById('ip-owner-select')?.value);
    const ipOwner   = people.find(p => p.id === ipOwnerId) || people[0];
    const taxResult = calcTax(regId, total, country);
    const netTotal  = taxResult.net;

    totalTax = taxResult.total_tax;
    totalNet = netTotal;

    // Шапка с инфо об ИП и налогах
    const taxBreakdownStr = taxResult.taxes.map(t =>
      `<span class="tax-chip">${t.name}: ${fmt(t.amount)}</span>`
    ).join('');

    summaryHtml = `
      <div class="single-ip-summary">
        <div class="sip-row">
          <span class="sip-label">ИП налогоплательщик:</span>
          <span class="sip-value"><strong>${ipOwner?.name || 'Участник 1'}</strong></span>
        </div>
        <div class="sip-row">
          <span class="sip-label">Входящая сумма:</span>
          <span class="sip-value">${fmt(total, currency)}</span>
        </div>
        <div class="sip-row">
          <span class="sip-label">Налоги (${regime?.label || ''}):</span>
          <span class="sip-value tax-amount"><strong>− ${fmt(totalTax, currency)}</strong></span>
        </div>
        <div class="sip-row sip-row--net">
          <span class="sip-label">К распределению:</span>
          <span class="sip-value net-amount"><strong>${fmt(netTotal, currency)}</strong></span>
        </div>
        <div class="sip-taxes">${taxBreakdownStr}</div>
      </div>
    `;

    // Каждый получает свой % от чистой суммы — без налогов
    rows = people.map((p, i) => {
      const sharePercent = parseFloat(p.percent) || 0;
      const personNet    = netTotal * (sharePercent / 100);
      const isIpOwner    = p.id === (ipOwner?.id);

      const displayName = p.name || `Участник ${i + 1}`;
      const ipBadge = isIpOwner
        ? `<span class="ip-badge" title="Это ИП принимает оплату и платит налоги">ИП</span>`
        : '';

      return `
        <tr>
          <td><strong>${displayName}</strong> ${ipBadge}</td>
          <td><span class="badge-percent">${sharePercent}%</span></td>
          <td>${fmt(netTotal, currency)}</td>
          <td class="tax-cell" style="color:var(--text-muted);font-size:11px">
            ${isIpOwner
              ? taxResult.taxes.map(t => `${t.name}: ${fmt(t.amount)}`).join(', ')
              : '— (через ИП ' + (ipOwner?.name || 'участника') + ')'
            }
          </td>
          <td class="net-amount">${fmt(personNet, currency)}</td>
        </tr>
      `;
    });

  } else {
    // Каждый платит налоги сам со своей доли
    rows = people.map((p, i) => {
      const share  = total * ((parseFloat(p.percent) || 0) / 100);
      const result = calcTax(regId, share, country);

      totalNet += result.net;
      totalTax += result.total_tax;

      const taxBreakdown = result.taxes.length
        ? result.taxes.map(t => `<span class="tax-chip">${t.name}: ${fmt(t.amount)}</span>`).join('')
        : '—';

      const displayName = p.name || `<span style="color:var(--text-muted)">Участник ${i + 1}</span>`;
      return `
        <tr>
          <td><strong>${displayName}</strong></td>
          <td><span class="badge-percent">${parseFloat(p.percent) || 0}%</span></td>
          <td>${fmt(share, currency)}</td>
          <td class="tax-cell">${taxBreakdown}</td>
          <td class="net-amount">${fmt(result.net, currency)}</td>
        </tr>
      `;
    });
  }

  document.getElementById('result-body').innerHTML = rows.join('');
  document.getElementById('single-ip-summary-wrap').innerHTML = summaryHtml;

  document.getElementById('result-total').innerHTML = `
    <div class="total-row">
      <span>Налоговый режим:</span>
      <span><strong>${regime?.label || '—'}</strong></span>
    </div>
    <div class="total-row">
      <span>Итого налогов:</span>
      <span class="tax-amount"><strong>${fmt(totalTax, currency)}</strong></span>
    </div>
    <div class="total-row">
      <span>Итого на руки (все):</span>
      <span class="net-amount"><strong style="font-size:20px">${fmt(totalNet, currency)}</strong></span>
    </div>
  `;

  document.getElementById('result-card').style.display = 'block';
}

// Экспорт PDF через печать
function exportCalcPDF() {
  const total    = parseFloat(document.getElementById('total-amount').value) || 0;
  const currency = document.getElementById('calc-currency').value;
  const country  = document.getElementById('calc-country').value;
  const regId    = document.getElementById('global-tax').value;
  const isSingle = document.getElementById('single-ip-mode')?.value === 'single';
  const regimes  = getTaxRegimes(country);
  const regime   = regimes.find(r => r.id === regId);

  let totalNet = 0;
  let totalTax = 0;
  let tableRows = '';
  let summaryBlock = '';

  if (isSingle) {
    const ipOwnerId = parseInt(document.getElementById('ip-owner-select')?.value);
    const ipOwner   = people.find(p => p.id === ipOwnerId) || people[0];
    const taxResult = calcTax(regId, total, country);
    const netTotal  = taxResult.net;

    totalTax = taxResult.total_tax;
    totalNet = netTotal;

    const taxStr = taxResult.taxes.map(t => `${t.name}: ${fmt(t.amount)} ${currency}`).join(' | ');

    summaryBlock = `
      <div class="sip-box">
        <div class="sip-title">Расчёт налогов через одно ИП</div>
        <table class="sip-table">
          <tr><td>ИП налогоплательщик</td><td><strong>${ipOwner?.name || 'Участник 1'}</strong></td></tr>
          <tr><td>Входящая сумма</td><td>${fmt(total)} ${currency}</td></tr>
          <tr><td>Налоговый режим</td><td>${regime?.label || ''}</td></tr>
          <tr><td>Состав налогов</td><td class="tax-detail">${taxStr}</td></tr>
          <tr class="total-row"><td>Итого налогов</td><td class="tax-val">− ${fmt(totalTax)} ${currency}</td></tr>
          <tr class="net-row"><td>К распределению</td><td class="net-val">${fmt(netTotal)} ${currency}</td></tr>
        </table>
      </div>
    `;

    tableRows = people.map((p, i) => {
      const sharePercent = parseFloat(p.percent) || 0;
      const personNet    = netTotal * (sharePercent / 100);
      const isIpOwner    = p.id === (ipOwner?.id);
      return `
        <tr>
          <td>${p.name || `Участник ${i + 1}`}${isIpOwner ? ' <em>(ИП)</em>' : ''}</td>
          <td class="center">${sharePercent}%</td>
          <td class="right">${fmt(netTotal)} ${currency}</td>
          <td class="tax-cell">через ИП ${ipOwner?.name || ''}</td>
          <td class="right net">${fmt(personNet)} ${currency}</td>
        </tr>
      `;
    }).join('');

  } else {
    tableRows = people.map((p, i) => {
      const share  = total * ((parseFloat(p.percent) || 0) / 100);
      const result = calcTax(regId, share, country);
      totalNet += result.net;
      totalTax += result.total_tax;
      const taxStr = result.taxes.map(t => `${t.name}: ${fmt(t.amount)} ${currency}`).join(' | ');
      return `
        <tr>
          <td>${p.name || `Участник ${i + 1}`}</td>
          <td class="center">${parseFloat(p.percent) || 0}%</td>
          <td class="right">${fmt(share)} ${currency}</td>
          <td class="tax-cell">${taxStr}</td>
          <td class="right net">${fmt(result.net)} ${currency}</td>
        </tr>
      `;
    }).join('');
  }

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Расчёт выплат — DocGen</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #1a1a1a; padding: 20mm; }
    h1 { font-size: 20px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; }
    .subtitle { font-size: 11px; color: #888; margin-bottom: 16px; }
    .meta-block { background: #f4f6ff; border-radius: 8px; padding: 10px 14px; margin-bottom: 14px; display: flex; gap: 24px; flex-wrap: wrap; }
    .meta-item { font-size: 11px; color: #444; }
    .meta-item strong { color: #1a1a2e; }
    .sip-box { border: 2px solid #4f6ef7; border-radius: 8px; padding: 14px; margin-bottom: 16px; }
    .sip-title { font-size: 13px; font-weight: 700; color: #4f6ef7; margin-bottom: 10px; }
    .sip-table { width: 100%; border-collapse: collapse; }
    .sip-table td { padding: 5px 8px; font-size: 11px; border-bottom: 1px solid #eee; }
    .sip-table td:first-child { color: #666; width: 40%; }
    .total-row td { font-weight: 600; background: #fff5f5; }
    .tax-val { color: #dc2626; font-weight: 700; }
    .net-row td { font-weight: 700; background: #f0fff4; }
    .net-val { color: #16a34a; font-size: 14px; }
    .tax-detail { font-size: 10px; color: #555; }
    table.main { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    th { background: #4f6ef7; color: white; padding: 9px 10px; text-align: left; font-size: 11px; font-weight: 600; }
    th.center { text-align: center; }
    th.right { text-align: right; }
    td { padding: 9px 10px; border-bottom: 1px solid #e8e8e8; font-size: 11px; vertical-align: top; }
    tr:nth-child(even) td { background: #f9faff; }
    td.center { text-align: center; }
    td.right { text-align: right; }
    td.tax-cell { font-size: 10px; color: #666; }
    td.net { font-weight: 700; color: #16a34a; }
    .totals { border-top: 2px solid #4f6ef7; padding-top: 14px; display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }
    .total-row-sum { display: flex; gap: 24px; font-size: 13px; }
    .total-row-sum .lbl { color: #555; min-width: 180px; text-align: right; }
    .total-row-sum .val { font-weight: 700; min-width: 120px; text-align: right; }
    .total-row-sum .val.tax { color: #dc2626; }
    .total-row-sum .val.net { color: #16a34a; font-size: 16px; }
    footer { margin-top: 20px; font-size: 9px; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 8px; }
    @page { margin: 0; size: A4; }
    @media print { body { padding: 15mm; } }
  </style>
</head>
<body>
  <h1>Расчёт выплат</h1>
  <div class="subtitle">Сгенерировано ${new Date().toLocaleString('ru-RU')} · DocGen</div>
  <div class="meta-block">
    <div class="meta-item">Общая сумма: <strong>${fmt(total)} ${currency}</strong></div>
    <div class="meta-item">Дата: <strong>${new Date().toLocaleDateString('ru-RU')}</strong></div>
    <div class="meta-item">Участников: <strong>${people.length}</strong></div>
  </div>
  ${summaryBlock}
  <table class="main">
    <thead>
      <tr>
        <th>Участник</th>
        <th class="center">Доля</th>
        <th class="right">База</th>
        <th>Налоги</th>
        <th class="right">На руки</th>
      </tr>
    </thead>
    <tbody>${tableRows}</tbody>
  </table>
  <div class="totals">
    <div class="total-row-sum">
      <span class="lbl">Итого налогов:</span>
      <span class="val tax">${fmt(totalTax)} ${currency}</span>
    </div>
    <div class="total-row-sum">
      <span class="lbl">Итого на руки:</span>
      <span class="val net">${fmt(totalNet)} ${currency}</span>
    </div>
  </div>
  <footer>DocGen — Расчёт выплат</footer>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}

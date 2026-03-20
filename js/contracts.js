// Шаблоны договоров

const CONTRACT_TEMPLATES = {
  kz: {
    services: {
      title: 'ДОГОВОР ОКАЗАНИЯ УСЛУГ',
      law: 'Гражданский кодекс Республики Казахстан (ст. 683–696)',
      partyA: 'Исполнитель',
      partyB: 'Заказчик',
      sections: (d) => [
        {
          title: '1. ПРЕДМЕТ ДОГОВОРА',
          text: `1.1. Исполнитель обязуется оказать Заказчику следующие услуги: ${d.subject}.\n1.2. Услуги считаются выполненными после подписания Акта выполненных работ обеими сторонами.`
        },
        {
          title: '2. СТОИМОСТЬ И ПОРЯДОК РАСЧЁТОВ',
          text: `2.1. Стоимость услуг составляет ${d.amount} ${d.currency}.\n2.2. Порядок оплаты: ${d.payment}.\n2.3. Оплата производится путём перечисления денежных средств на расчётный счёт Исполнителя.`
        },
        {
          title: '3. СРОКИ',
          text: `3.1. Исполнитель обязуется оказать услуги в срок: ${d.deadline}.\n3.2. Срок может быть продлён по письменному соглашению сторон.`
        },
        {
          title: '4. ПРАВА И ОБЯЗАННОСТИ СТОРОН',
          text: `4.1. Исполнитель обязан оказать услуги надлежащего качества в установленный срок.\n4.2. Заказчик обязан принять и оплатить оказанные услуги в соответствии с условиями настоящего договора.\n4.3. Стороны обязаны уведомлять друг друга об изменении реквизитов.`
        },
        {
          title: '5. ОТВЕТСТВЕННОСТЬ СТОРОН',
          text: `5.1. За нарушение сроков оказания услуг Исполнитель уплачивает неустойку в размере 0,1% от суммы договора за каждый день просрочки.\n5.2. За нарушение сроков оплаты Заказчик уплачивает неустойку в размере 0,1% от неоплаченной суммы за каждый день просрочки.`
        },
        {
          title: '6. КОНФИДЕНЦИАЛЬНОСТЬ',
          text: `6.1. Стороны обязуются не разглашать конфиденциальную информацию, ставшую известной в ходе исполнения договора.\n6.2. Данное обязательство действует в течение 3 лет после прекращения договора.`
        },
        {
          title: '7. ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ',
          text: `7.1. Споры решаются путём переговоров. При недостижении согласия — в суде по месту нахождения ответчика в соответствии с законодательством Республики Казахстан.`
        },
        {
          title: '8. ПРОЧИЕ УСЛОВИЯ',
          text: `8.1. Настоящий договор составлен в двух экземплярах, имеющих одинаковую юридическую силу.\n8.2. Любые изменения к договору оформляются дополнительным соглашением в письменной форме.`
        },
      ]
    },
    sale: {
      title: 'ДОГОВОР КУПЛИ-ПРОДАЖИ',
      law: 'Гражданский кодекс Республики Казахстан (ст. 406–429)',
      partyA: 'Продавец',
      partyB: 'Покупатель',
      sections: (d) => [
        {
          title: '1. ПРЕДМЕТ ДОГОВОРА',
          text: `1.1. Продавец обязуется передать в собственность Покупателю, а Покупатель обязуется принять и оплатить следующий товар: ${d.subject}.\n1.2. Право собственности переходит к Покупателю с момента полной оплаты и передачи товара.`
        },
        {
          title: '2. ЦЕНА И ПОРЯДОК РАСЧЁТОВ',
          text: `2.1. Цена товара составляет ${d.amount} ${d.currency}.\n2.2. Порядок оплаты: ${d.payment}.`
        },
        {
          title: '3. СРОКИ И УСЛОВИЯ ПЕРЕДАЧИ',
          text: `3.1. Продавец обязуется передать товар в срок: ${d.deadline}.\n3.2. Передача осуществляется по Акту приёма-передачи, подписываемому обеими сторонами.\n3.3. Риск случайной гибели переходит к Покупателю с момента передачи товара.`
        },
        {
          title: '4. КАЧЕСТВО ТОВАРА',
          text: `4.1. Товар должен соответствовать требованиям, установленным законодательством РК.\n4.2. Гарантийный срок: в соответствии с документацией производителя.`
        },
        {
          title: '5. ОТВЕТСТВЕННОСТЬ',
          text: `5.1. За просрочку передачи товара Продавец уплачивает неустойку 0,1% в день.\n5.2. За просрочку оплаты Покупатель уплачивает неустойку 0,1% в день.`
        },
        {
          title: '6. ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ',
          text: `6.1. Споры разрешаются в соответствии с законодательством Республики Казахстан.`
        },
      ]
    },
    work: {
      title: 'ДОГОВОР ПОДРЯДА',
      law: 'Гражданский кодекс Республики Казахстан (ст. 616–653)',
      partyA: 'Подрядчик',
      partyB: 'Заказчик',
      sections: (d) => [
        {
          title: '1. ПРЕДМЕТ ДОГОВОРА',
          text: `1.1. Подрядчик обязуется выполнить по заданию Заказчика следующую работу: ${d.subject}.\n1.2. Результат работы передаётся Заказчику по Акту приёмки.`
        },
        {
          title: '2. СТОИМОСТЬ РАБОТ',
          text: `2.1. Стоимость работ составляет ${d.amount} ${d.currency}.\n2.2. Порядок оплаты: ${d.payment}.`
        },
        {
          title: '3. СРОКИ ВЫПОЛНЕНИЯ',
          text: `3.1. Начало работ: с момента подписания настоящего договора.\n3.2. Окончание работ: ${d.deadline}.`
        },
        {
          title: '4. КАЧЕСТВО И ГАРАНТИИ',
          text: `4.1. Работа должна соответствовать требованиям, установленным в техническом задании.\n4.2. Гарантийный срок на результат работ — 12 месяцев.`
        },
        {
          title: '5. ОТВЕТСТВЕННОСТЬ',
          text: `5.1. При нарушении сроков Подрядчик уплачивает неустойку 0,1% в день.\n5.2. При нарушении сроков оплаты Заказчик уплачивает неустойку 0,1% в день.`
        },
        {
          title: '6. РАЗРЕШЕНИЕ СПОРОВ',
          text: `6.1. Споры разрешаются в соответствии с законодательством Республики Казахстан.`
        },
      ]
    },
    rent: {
      title: 'ДОГОВОР АРЕНДЫ',
      law: 'Гражданский кодекс Республики Казахстан (ст. 540–575)',
      partyA: 'Арендодатель',
      partyB: 'Арендатор',
      sections: (d) => [
        {
          title: '1. ПРЕДМЕТ ДОГОВОРА',
          text: `1.1. Арендодатель передаёт Арендатору во временное пользование: ${d.subject}.\n1.2. Имущество передаётся по Акту приёма-передачи.`
        },
        {
          title: '2. АРЕНДНАЯ ПЛАТА',
          text: `2.1. Арендная плата составляет ${d.amount} ${d.currency}.\n2.2. Порядок оплаты: ${d.payment}.`
        },
        {
          title: '3. СРОК АРЕНДЫ',
          text: `3.1. Договор действует до: ${d.deadline}.\n3.2. По истечении срока может быть продлён по соглашению сторон.`
        },
        {
          title: '4. ОБЯЗАННОСТИ СТОРОН',
          text: `4.1. Арендодатель обязан передать имущество в надлежащем состоянии.\n4.2. Арендатор обязан содержать имущество в исправном состоянии и своевременно вносить арендную плату.\n4.3. Текущий ремонт — за счёт Арендатора, капитальный — за счёт Арендодателя.`
        },
        {
          title: '5. ОТВЕТСТВЕННОСТЬ',
          text: `5.1. За нарушение сроков оплаты Арендатор уплачивает неустойку 0,1% в день от задолженности.`
        },
        {
          title: '6. РАЗРЕШЕНИЕ СПОРОВ',
          text: `6.1. Споры разрешаются в соответствии с законодательством Республики Казахстан.`
        },
      ]
    },
    nda: {
      title: 'СОГЛАШЕНИЕ О КОНФИДЕНЦИАЛЬНОСТИ (NDA)',
      law: 'Гражданский кодекс Республики Казахстан (ст. 126)',
      partyA: 'Сторона 1',
      partyB: 'Сторона 2',
      sections: (d) => [
        {
          title: '1. ПРЕДМЕТ СОГЛАШЕНИЯ',
          text: `1.1. Стороны обязуются сохранять в тайне конфиденциальную информацию, полученную в ходе сотрудничества: ${d.subject}.\n1.2. Конфиденциальной считается любая информация, переданная одной стороной другой, кроме общедоступной.`
        },
        {
          title: '2. ОБЯЗАТЕЛЬСТВА СТОРОН',
          text: `2.1. Стороны обязуются не разглашать конфиденциальную информацию третьим лицам без письменного согласия.\n2.2. Использовать информацию исключительно в целях, предусмотренных настоящим соглашением.\n2.3. Обеспечить защиту информации техническими и организационными мерами.`
        },
        {
          title: '3. СРОК ДЕЙСТВИЯ',
          text: `3.1. Соглашение действует с момента подписания до: ${d.deadline}.\n3.2. Обязательства по конфиденциальности сохраняются 3 года после истечения срока.`
        },
        {
          title: '4. ОТВЕТСТВЕННОСТЬ',
          text: `4.1. За разглашение конфиденциальной информации виновная сторона возмещает убытки в полном объёме.\n4.2. Сумма штрафа: ${d.amount} ${d.currency}.`
        },
        {
          title: '5. РАЗРЕШЕНИЕ СПОРОВ',
          text: `5.1. Споры разрешаются в соответствии с законодательством Республики Казахстан.`
        },
      ]
    }
  },
  ru: {
    services: {
      title: 'ДОГОВОР ОКАЗАНИЯ УСЛУГ',
      law: 'Гражданский кодекс Российской Федерации (ст. 779–783)',
      partyA: 'Исполнитель',
      partyB: 'Заказчик',
      sections: (d) => [
        {
          title: '1. ПРЕДМЕТ ДОГОВОРА',
          text: `1.1. Исполнитель обязуется оказать Заказчику следующие услуги: ${d.subject}.\n1.2. Услуги считаются оказанными после подписания Акта сдачи-приёмки.`
        },
        {
          title: '2. СТОИМОСТЬ И ПОРЯДОК РАСЧЁТОВ',
          text: `2.1. Стоимость услуг составляет ${d.amount} ${d.currency}.\n2.2. Порядок оплаты: ${d.payment}.`
        },
        {
          title: '3. СРОКИ',
          text: `3.1. Услуги оказываются в срок до: ${d.deadline}.`
        },
        {
          title: '4. ОТВЕТСТВЕННОСТЬ',
          text: `4.1. За нарушение сроков — неустойка 0,1% в день.\n4.2. За нарушение сроков оплаты — неустойка 0,1% в день.`
        },
        {
          title: '5. РАЗРЕШЕНИЕ СПОРОВ',
          text: `5.1. Споры разрешаются в соответствии с законодательством Российской Федерации.`
        },
      ]
    },
    sale: {
      title: 'ДОГОВОР КУПЛИ-ПРОДАЖИ',
      law: 'Гражданский кодекс Российской Федерации (ст. 454–491)',
      partyA: 'Продавец',
      partyB: 'Покупатель',
      sections: (d) => [
        {
          title: '1. ПРЕДМЕТ ДОГОВОРА',
          text: `1.1. Продавец обязуется передать в собственность Покупателю: ${d.subject}.\n1.2. Право собственности переходит с момента передачи товара и полной оплаты.`
        },
        {
          title: '2. ЦЕНА',
          text: `2.1. Цена товара: ${d.amount} ${d.currency}.\n2.2. Порядок оплаты: ${d.payment}.`
        },
        {
          title: '3. СРОКИ ПЕРЕДАЧИ',
          text: `3.1. Товар передаётся в срок до: ${d.deadline}.`
        },
        {
          title: '4. ОТВЕТСТВЕННОСТЬ',
          text: `4.1. За нарушение сроков — неустойка 0,1% в день.`
        },
        {
          title: '5. РАЗРЕШЕНИЕ СПОРОВ',
          text: `5.1. Споры разрешаются в соответствии с законодательством Российской Федерации.`
        },
      ]
    },
    work: {
      title: 'ДОГОВОР ПОДРЯДА',
      law: 'Гражданский кодекс Российской Федерации (ст. 702–729)',
      partyA: 'Подрядчик',
      partyB: 'Заказчик',
      sections: (d) => [
        {
          title: '1. ПРЕДМЕТ ДОГОВОРА',
          text: `1.1. Подрядчик выполняет: ${d.subject}.\n1.2. Результат передаётся по Акту.`
        },
        {
          title: '2. СТОИМОСТЬ',
          text: `2.1. Стоимость: ${d.amount} ${d.currency}.\n2.2. Порядок оплаты: ${d.payment}.`
        },
        {
          title: '3. СРОКИ',
          text: `3.1. Срок завершения: ${d.deadline}.`
        },
        {
          title: '4. ОТВЕТСТВЕННОСТЬ',
          text: `4.1. За нарушение сроков — неустойка 0,1% в день.`
        },
        {
          title: '5. РАЗРЕШЕНИЕ СПОРОВ',
          text: `5.1. Споры разрешаются по законодательству Российской Федерации.`
        },
      ]
    },
    rent: {
      title: 'ДОГОВОР АРЕНДЫ',
      law: 'Гражданский кодекс Российской Федерации (ст. 606–625)',
      partyA: 'Арендодатель',
      partyB: 'Арендатор',
      sections: (d) => [
        {
          title: '1. ПРЕДМЕТ ДОГОВОРА',
          text: `1.1. Передаётся в аренду: ${d.subject}.`
        },
        {
          title: '2. АРЕНДНАЯ ПЛАТА',
          text: `2.1. Арендная плата: ${d.amount} ${d.currency}.\n2.2. Порядок оплаты: ${d.payment}.`
        },
        {
          title: '3. СРОК',
          text: `3.1. Срок аренды до: ${d.deadline}.`
        },
        {
          title: '4. ОТВЕТСТВЕННОСТЬ',
          text: `4.1. За просрочку оплаты — неустойка 0,1% в день.`
        },
        {
          title: '5. РАЗРЕШЕНИЕ СПОРОВ',
          text: `5.1. Споры разрешаются по законодательству Российской Федерации.`
        },
      ]
    },
    nda: {
      title: 'СОГЛАШЕНИЕ О КОНФИДЕНЦИАЛЬНОСТИ (NDA)',
      law: 'Гражданский кодекс Российской Федерации (ст. 1465–1467)',
      partyA: 'Сторона 1',
      partyB: 'Сторона 2',
      sections: (d) => [
        {
          title: '1. ПРЕДМЕТ',
          text: `1.1. Стороны обязуются хранить в тайне информацию: ${d.subject}.`
        },
        {
          title: '2. ОБЯЗАТЕЛЬСТВА',
          text: `2.1. Не разглашать информацию третьим лицам.\n2.2. Использовать только в рамках сотрудничества.`
        },
        {
          title: '3. СРОК',
          text: `3.1. Срок действия до: ${d.deadline}.\n3.2. Обязательства сохраняются 3 года после истечения.`
        },
        {
          title: '4. ОТВЕТСТВЕННОСТЬ',
          text: `4.1. Штраф за разглашение: ${d.amount} ${d.currency}.`
        },
        {
          title: '5. РАЗРЕШЕНИЕ СПОРОВ',
          text: `5.1. Споры разрешаются по законодательству Российской Федерации.`
        },
      ]
    }
  }
};

function generateContract() {
  const country = document.getElementById('contract-country').value;
  const type    = document.querySelector('.type-btn.active')?.dataset.type || 'services';

  if (type === 'gph') { generateGph(); return; }

  const template = CONTRACT_TEMPLATES[country]?.[type];
  if (!template) { alert('Шаблон не найден'); return; }

  const paymentRaw     = document.getElementById('contract-payment').value;
  const commissionRate = parseFloat(document.getElementById('commission-rate')?.value) || 10;
  const isCommission   = paymentRaw === 'commission';
  const paymentText    = isCommission
    ? `вознаграждение в размере ${commissionRate}% от суммы каждой закрытой сделки, выплачивается не позднее 5 рабочих дней после получения оплаты от клиента`
    : paymentRaw;

  const rawAmount = document.getElementById('contract-amount').value;
  const d = {
    subject:         document.getElementById('contract-subject').value   || '[предмет договора]',
    amount:          isCommission
                       ? (rawAmount ? rawAmount + ' (лимит)' : 'определяется по факту сделок')
                       : (rawAmount || '[сумма]'),
    currency:        document.getElementById('contract-currency').value  || 'тенге',
    deadline:        document.getElementById('contract-deadline').value  || '[срок]',
    city:            document.getElementById('contract-city').value      || 'Дистанционно',
    payment:         paymentText,
    isCommission,
    commissionRate,
    partyAName:    document.getElementById('party-a-name').value    || '[Исполнитель]',
    partyAId:      document.getElementById('party-a-id').value      || '',
    partyAAddress: document.getElementById('party-a-address').value || '',
    partyAPhone:   document.getElementById('party-a-phone').value   || '',
    partyBName:    document.getElementById('party-b-name').value    || '[Заказчик]',
    partyBId:      document.getElementById('party-b-id').value      || '',
    partyBAddress: document.getElementById('party-b-address').value || '',
    partyBPhone:   document.getElementById('party-b-phone').value   || '',
  };

  const sections = template.sections(d);

  // Добавляем секцию комиссии если выбран % от сделки
  if (d.isCommission) {
    sections.push({
      title: `${sections.length + 1}. ПОРЯДОК ВОЗНАГРАЖДЕНИЯ`,
      text: `${sections.length + 1}.1. Вознаграждение Исполнителя составляет ${d.commissionRate}% от суммы каждой закрытой сделки, заключённой при его участии.\n${sections.length + 1}.2. Факт закрытия сделки подтверждается поступлением оплаты от клиента на счёт Заказчика.\n${sections.length + 1}.3. Выплата производится не позднее 5 (пяти) рабочих дней после подтверждения оплаты.\n${sections.length + 1}.4. Заказчик обязан уведомить Исполнителя о поступлении оплаты в течение 2 (двух) рабочих дней.`
    });
  }

  const sectionsHtml = sections.map(s => `
    <div class="section">
      <div class="section-title">${s.title}</div>
      <div class="section-text">${s.text.replace(/\n/g, '<br>')}</div>
    </div>
  `).join('');

  const partyAExtra = [
    d.partyAId      ? `ИИН/БИН/ИНН: ${d.partyAId}` : '',
    d.partyAAddress ? `Адрес: ${d.partyAAddress}` : '',
    d.partyAPhone   ? `Тел.: ${d.partyAPhone}` : '',
  ].filter(Boolean).join('<br>');

  const partyBExtra = [
    d.partyBId      ? `ИИН/БИН/ИНН: ${d.partyBId}` : '',
    d.partyBAddress ? `Адрес: ${d.partyBAddress}` : '',
    d.partyBPhone   ? `Тел.: ${d.partyBPhone}` : '',
  ].filter(Boolean).join('<br>');

  const introText = `${d.partyAName}${d.partyAId ? ' (ИИН/БИН/ИНН: ' + d.partyAId + ')' : ''}, именуемый(-ая) в дальнейшем «${template.partyA}», с одной стороны, и ${d.partyBName}${d.partyBId ? ' (ИИН/БИН/ИНН: ' + d.partyBId + ')' : ''}, именуемый(-ая) в дальнейшем «${template.partyB}», с другой стороны, заключили настоящий договор о нижеследующем:`;

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>${template.title} — DocGen</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #1a1a1a; padding: 20mm; line-height: 1.6; }
    .doc-header { text-align: center; margin-bottom: 20px; }
    .doc-title { font-size: 16px; font-weight: 700; color: #1a1a2e; letter-spacing: 1px; margin-bottom: 6px; }
    .doc-meta { font-size: 11px; color: #666; }
    .doc-law { font-size: 10px; color: #999; margin-top: 4px; }
    .intro { background: #f4f6ff; border-radius: 6px; padding: 12px 16px; margin: 16px 0; font-size: 11px; line-height: 1.7; color: #333; }
    .section { margin-bottom: 16px; }
    .section-title { font-size: 12px; font-weight: 700; color: #1a1a2e; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px solid #dde3ff; }
    .section-text { font-size: 11px; color: #333; line-height: 1.8; }
    .signatures { margin-top: 28px; page-break-inside: avoid; }
    .sig-title { font-size: 12px; font-weight: 700; color: #1a1a2e; margin-bottom: 16px; padding-bottom: 6px; border-bottom: 2px solid #4f6ef7; }
    .sig-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .sig-block { }
    .sig-party { font-size: 12px; font-weight: 700; color: #4f6ef7; margin-bottom: 6px; }
    .sig-name { font-size: 12px; font-weight: 600; margin-bottom: 4px; }
    .sig-details { font-size: 10px; color: #666; margin-bottom: 12px; line-height: 1.7; }
    .sig-line { border-top: 1px solid #333; margin-top: 24px; padding-top: 4px; font-size: 10px; color: #666; }
    footer { margin-top: 20px; font-size: 9px; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 8px; }
    @page { margin: 0; size: A4; }
    @media print { body { padding: 15mm; } }
  </style>
</head>
<body>
  <div class="doc-header">
    <div class="doc-title">${template.title}</div>
    <div class="doc-meta">г. ${d.city} &nbsp;·&nbsp; ${new Date().toLocaleDateString('ru-RU')}</div>
    <div class="doc-law">Правовое основание: ${template.law}</div>
  </div>

  <div class="intro">${introText}</div>

  ${sectionsHtml}

  <div class="signatures">
    <div class="sig-title">РЕКВИЗИТЫ И ПОДПИСИ СТОРОН</div>
    <div class="sig-grid">
      <div class="sig-block">
        <div class="sig-party">${template.partyA}:</div>
        <div class="sig-name">${d.partyAName}</div>
        <div class="sig-details">${partyAExtra || '&nbsp;'}</div>
        <div class="sig-line">Подпись: ___________________________</div>
      </div>
      <div class="sig-block">
        <div class="sig-party">${template.partyB}:</div>
        <div class="sig-name">${d.partyBName}</div>
        <div class="sig-details">${partyBExtra || '&nbsp;'}</div>
        <div class="sig-line">Подпись: ___________________________</div>
      </div>
    </div>
  </div>

  <footer>DocGen — ${template.title} &nbsp;·&nbsp; Сгенерировано ${new Date().toLocaleString('ru-RU')}</footer>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}

function g(id) { return (document.getElementById(id)?.value || '').trim(); }

function generateGph() {
  const num       = g('gph-num') || '1';
  const date      = g('gph-date') || new Date().toLocaleDateString('ru-RU', {day:'numeric',month:'long',year:'numeric'}) + ' года';
  const city      = g('gph-city') || 'Астана';
  const aName     = g('gph-a-name') || '[ФИО Заказчика]';
  const aIin      = g('gph-a-iin');
  const aBrand    = g('gph-a-brand');
  const aAddress  = g('gph-a-address');
  const aEmail    = g('gph-a-email');
  const aPhone    = g('gph-a-phone');
  const aTg       = g('gph-a-tg');
  const aBank1    = g('gph-a-bank1');
  const aBank2    = g('gph-a-bank2');
  const bName     = g('gph-b-name') || '[ФИО Исполнителя]';
  const bPassport = g('gph-b-passport');
  const bIssuedBy = g('gph-b-issued-by');
  const bIssuedDate = g('gph-b-issued-date');
  const bDept     = g('gph-b-dept');
  const bDob      = g('gph-b-dob');
  const bPob      = g('gph-b-pob');
  const bAddress  = g('gph-b-address');
  const bEmail    = g('gph-b-email');
  const bPhone    = g('gph-b-phone');
  const bTg       = g('gph-b-tg');
  const bBank     = g('gph-b-bank');
  const rate1     = g('gph-rate1') || '10';
  const rate2     = g('gph-rate2') || '20';
  const rate3     = g('gph-rate3') || '30';
  const ipn       = g('gph-ipn') || '20';
  const leadlock  = g('gph-leadlock') || '90';
  const until     = g('gph-until') || '31.12.2026';
  const fine      = parseInt(g('gph-fine') || '500000').toLocaleString('ru-RU');

  const aReq = [
    `Индивидуальный предприниматель ${aName}`,
    aIin ? `ИИН: ${aIin}` : '',
    aBrand ? `Коммерческое наименование: «${aBrand}»` : '',
    aAddress ? `Адрес: ${aAddress}` : '',
    aBank1 ? aBank1 : '',
    aBank2 ? aBank2 : '',
    aEmail ? `Email: ${aEmail}` : '',
    aPhone ? `Телефон / WhatsApp: ${aPhone}` : '',
    aTg ? `Telegram: ${aTg}` : '',
  ].filter(Boolean).map(l => `<div>${l}</div>`).join('');

  const bReq = [
    bName,
    bPassport ? `Паспорт: ${bPassport}` : '',
    bIssuedBy ? `Выдан: ${bIssuedDate ? bIssuedDate + ' ' : ''}${bIssuedBy}` : '',
    bDept ? `Код подразделения: ${bDept}` : '',
    bDob ? `Дата рождения: ${bDob}` : '',
    bPob ? `Место рождения: ${bPob}` : '',
    bAddress ? `Адрес проживания: ${bAddress}` : '',
    bBank ? bBank : '',
    bEmail ? `Email: ${bEmail}` : '',
    bPhone ? `Телефон / WhatsApp: ${bPhone}` : '',
    bTg ? `Telegram: ${bTg}` : '',
  ].filter(Boolean).map(l => `<div>${l}</div>`).join('');

  const aContacts = [aEmail, aPhone, aTg].filter(Boolean).join(', ');
  const bContacts = [bEmail, bPhone, bTg].filter(Boolean).join(', ');

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8"/>
  <title>ГПХ №${num} — DocGen</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #111; padding: 20mm; line-height: 1.65; }
    h1 { font-size: 15px; font-weight: 700; text-align: center; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .subtitle { text-align: center; font-size: 11px; color: #555; margin-bottom: 20px; }
    .intro { margin-bottom: 18px; text-align: justify; }
    .section { margin-bottom: 16px; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #1a1a2e; margin-bottom: 8px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
    .section p, .section li { font-size: 12px; margin-bottom: 5px; }
    .section ul { padding-left: 20px; }
    .tier-table { width: 100%; border-collapse: collapse; margin: 8px 0; }
    .tier-table th { background: #1a1a2e; color: white; padding: 6px 10px; font-size: 11px; text-align: left; }
    .tier-table td { padding: 6px 10px; border-bottom: 1px solid #eee; font-size: 12px; }
    .tier-table tr:nth-child(even) td { background: #f8f9ff; }
    .signatures { margin-top: 28px; page-break-inside: avoid; }
    .sig-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #1a1a2e; margin-bottom: 16px; border-bottom: 2px solid #1a1a2e; padding-bottom: 6px; }
    .sig-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .sig-block .sig-party { font-weight: 700; font-size: 12px; margin-bottom: 8px; color: #1a1a2e; }
    .sig-block .sig-details { font-size: 11px; color: #333; line-height: 1.8; margin-bottom: 16px; }
    .sig-line { border-top: 1px solid #333; margin-top: 28px; padding-top: 4px; font-size: 10px; color: #666; }
    .highlight { background: #f0f4ff; border-left: 3px solid #4f6ef7; padding: 6px 10px; margin: 8px 0; font-size: 12px; }
    footer { margin-top: 20px; font-size: 9px; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 8px; }
    @page { margin: 0; size: A4; }
    @media print { body { padding: 15mm; } }
  </style>
</head>
<body>

<h1>Договор об оказании услуг (ГПХ) № ${num}</h1>
<div class="subtitle">г. ${city} — ${date}</div>

<div class="intro">
  Индивидуальный предприниматель <strong>${aName}</strong>${aIin ? ', ИИН ' + aIin : ''}${aBrand ? ', действующий под коммерческим наименованием «' + aBrand + '»' : ''}, именуемый в дальнейшем <strong>«Заказчик»</strong>, с одной стороны, и Гражданин <strong>${bName}</strong>${bPassport ? ', паспорт ' + bPassport : ''}${bIssuedDate ? ', выдан ' + bIssuedDate : ''}${bIssuedBy ? ' ' + bIssuedBy : ''}${bDept ? ', код подразделения ' + bDept : ''}${bDob ? ', дата рождения: ' + bDob : ''}${bPob ? ', место рождения: ' + bPob : ''}${bAddress ? ', проживающий по адресу: ' + bAddress : ''}, именуемый в дальнейшем <strong>«Исполнитель»</strong>, совместно именуемые <strong>«Стороны»</strong>, заключили настоящий договор о нижеследующем:
</div>

<div class="section">
  <div class="section-title">1. Предмет договора</div>
  <p>1.1. Заказчик поручает, а Исполнитель принимает на себя обязательства по дистанционному поиску клиентов (лидогенерации) и обеспечению заключения договоров на IT-услуги Заказчика.</p>
  <p>1.2. Стороны подтверждают, что отношения по настоящему договору являются гражданско-правовыми и не являются трудовыми. Исполнитель не включается в штат Заказчика, самостоятельно определяет время, способы и место выполнения услуг, не подчиняется внутреннему трудовому распорядку Заказчика и не имеет права на социальные гарантии, предусмотренные трудовым законодательством.</p>
  <p>1.3. Клиент — физическое или юридическое лицо, заключившее договор на оказание IT-услуг с Заказчиком в результате действий Исполнителя.</p>
</div>

<div class="section">
  <div class="section-title">2. Регистрация лидов и «Lead Lock»</div>
  <p>2.1. Клиент считается привлечённым Исполнителем только после передачи контактных данных по каналам связи (п. 6.1) и получения подтверждения от Заказчика «Принято в работу».</p>
  <p>2.2. Закрепление клиента за Исполнителем («Lead Lock») действует <strong>${leadlock} (${numWords(leadlock)}) календарных дней</strong> с момента подтверждения. Если в указанный срок договор с клиентом не подписан — клиент признаётся свободным, вознаграждение не начисляется. В случае если по инициативе Заказчика с данным клиентом продолжаются переговоры, срок закрепления может быть продлён Заказчиком до завершения переговоров.</p>
</div>

<div class="section">
  <div class="section-title">3. Вознаграждение и порядок расчётов</div>
  <p>3.1. Вознаграждение Исполнителя рассчитывается как процент от суммы денежных средств, фактически поступивших на расчётный счёт Заказчика от привлечённого клиента.</p>
  <p>3.2. Ступенчатая система вознаграждения (в рамках одного календарного месяца):</p>
  <table class="tier-table">
    <thead><tr><th>Порядковый номер договора</th><th>Процент вознаграждения</th></tr></thead>
    <tbody>
      <tr><td>1-й и 2-й договор</td><td><strong>${rate1}%</strong> от поступившей суммы</td></tr>
      <tr><td>3-й и 4-й договор</td><td><strong>${rate2}%</strong> от поступившей суммы</td></tr>
      <tr><td>5-й и последующие</td><td><strong>${rate3}%</strong> от поступившей суммы</td></tr>
    </tbody>
  </table>
  <div class="highlight">3.3. Налоги на стороне Заказчика: Указанные проценты являются суммами «чистыми» к получению Исполнителем (Net). Заказчик обязуется самостоятельно и за свой счёт исчислить и уплатить индивидуальный подоходный налог (ИПН ${ipn}%) в бюджет Республики Казахстан. Исполнитель получает вознаграждение без удержания налога из его доли.</div>
  <p>3.4. Основанием для выплаты является Акт оказанных услуг, подписанный Сторонами (допускается обмен скан-копиями).</p>
  <p>3.5. Срок выплаты: в течение 10 рабочих дней с момента фактического поступления денег от Клиента на счёт Заказчика.</p>
  <p>3.6. Вознаграждение начисляется только на первоначальную стоимость проекта. Дополнительные работы, техподдержка и расширение функционала базой для вознаграждения не являются.</p>
  <p>3.7. Заказчик уведомляет Исполнителя о поступлении оплаты в течение 3 (трёх) рабочих дней.</p>
  <p>3.8. <strong>Программа «Доверенный партнёр»:</strong> после привлечения 5 (пяти) полностью оплаченных Клиентов Исполнитель переходит в категорию «Доверенный партнёр». Для него вознаграждение выплачивается в течение 5 рабочих дней с момента подписания договора с Клиентом. При неоплате Клиентом в течение 30 дней — выплата считается авансом и вычитается из последующих выплат.</p>
  <p>3.9. Все расчёты производятся в тенге (KZT). При выплате в иной валюте — конвертация по курсу Национального Банка РК на день платежа.</p>
  <p>3.10. Заказчик оплачивает только комиссию своего банка. Исполнитель несёт все прочие расходы, включая комиссии банков-корреспондентов и банка-получателя.</p>
  <p>3.11. Обязательства Заказчика по выплате считаются исполненными в момент списания средств с его расчётного счёта.</p>
  <p>3.12. Выплата осуществляется на банковский счёт, указанный Исполнителем в реквизитах договора. По взаимному согласованию Исполнитель вправе предоставить альтернативные реквизиты.</p>
</div>

<div class="section">
  <div class="section-title">4. Конфиденциальность и штрафы</div>
  <p>4.1. Исполнитель обязуется не разглашать клиентскую базу, финансовые условия и методики работы Заказчика третьим лицам.</p>
  <p>4.2. В случае установленного факта передачи данных клиентов конкурентам или иным третьим лицам Исполнитель выплачивает Заказчику штраф в размере <strong>${fine} (${numWords(g('gph-fine') || '500000')}) тенге</strong>.</p>
</div>

<div class="section">
  <div class="section-title">5. Прекращение договора</div>
  <p>5.1. Договор действует до <strong>${until}</strong> с возможностью автоматического продления на каждый последующий год.</p>
  <p>5.2. Любая из Сторон вправе расторгнуть договор в одностороннем порядке, уведомив другую Сторону за 7 (семь) календарных дней через WhatsApp или Email.</p>
  <p>5.3. При расторжении Заказчик обязан выплатить вознаграждение за клиентов, переданных до даты расторжения, если сделки закроются в течение срока их закрепления (п. 2.2).</p>
</div>

<div class="section">
  <div class="section-title">6. Официальные каналы связи</div>
  <p>6.1. Все уведомления и передача лидов осуществляются через:</p>
  <p>— <strong>Заказчик:</strong> ${aContacts || '[контакты заказчика]'}</p>
  <p>— <strong>Исполнитель:</strong> ${bContacts || '[контакты исполнителя]'}</p>
  <p>6.2. Стороны признают юридическую силу скриншотов переписки в WhatsApp и Telegram в качестве доказательств.</p>
</div>

<div class="section">
  <div class="section-title">7. Применимое право и разрешение споров</div>
  <p>7.1. Настоящий договор регулируется законодательством Республики Казахстан.</p>
  <p>7.2. Все споры решаются путём переговоров. При невозможности прийти к согласию — в суде по месту регистрации Заказчика (г. ${city}).</p>
</div>

<div class="section">
  <div class="section-title">9. Форс-мажор</div>
  <p>9.1. Стороны освобождаются от ответственности за неисполнение обязательств вследствие обстоятельств непреодолимой силы, возникших после заключения договора и находящихся вне разумного контроля Сторон.</p>
  <p>9.2. К форс-мажору относятся: стихийные бедствия, военные действия, террористические акты, решения органов государственной власти, перебои банковской системы, ограничения международных переводов и иные непредвидимые обстоятельства.</p>
  <p>9.3. Сторона, для которой возникли обстоятельства форс-мажора, обязана уведомить другую Сторону в течение 5 (пяти) календарных дней.</p>
  <p>9.4. При наступлении форс-мажора срок исполнения обязательств продлевается на период действия таких обстоятельств.</p>
  <p>9.5. Если форс-мажор продолжается более 60 (шестидесяти) дней подряд, каждая из Сторон вправе расторгнуть договор без возмещения убытков.</p>
</div>

<div class="signatures">
  <div class="sig-title">8. Реквизиты и подписи сторон</div>
  <div class="sig-grid">
    <div class="sig-block">
      <div class="sig-party">ЗАКАЗЧИК:</div>
      <div class="sig-details">${aReq}</div>
      <div class="sig-line">Подпись: _______________________&nbsp;/ ${aName.split(' ').slice(0,1)[0]} /</div>
    </div>
    <div class="sig-block">
      <div class="sig-party">ИСПОЛНИТЕЛЬ:</div>
      <div class="sig-details">${bReq}</div>
      <div class="sig-line">Подпись: _______________________&nbsp;/ ${bName.split(' ').slice(0,1)[0]} /</div>
    </div>
  </div>
</div>

<footer>DocGen — Договор ГПХ №${num} · Сгенерировано ${new Date().toLocaleString('ru-RU')}</footer>
<script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}

function numWords(n) {
  const words = {1:'один',2:'два',3:'три',4:'четыре',5:'пять',7:'семь',10:'десять',
    14:'четырнадцать',20:'двадцать',30:'тридцать',60:'шестьдесят',90:'девяносто',500000:'пятисот тысяч'};
  return words[parseInt(n)] || n;
}

function toggleGphBlock(type) {
  const block = document.getElementById('step-gph');
  if (block) block.style.display = type === 'gph' ? 'block' : 'none';
}

function toggleCommission(val) {
  const isComm = val === 'commission';

  // Блок ввода процента
  const row = document.getElementById('commission-row');
  if (row) row.style.display = isComm ? 'block' : 'none';

  // Поле суммы
  const label = document.getElementById('amount-label');
  const hint  = document.getElementById('amount-hint');
  const input = document.getElementById('contract-amount');
  if (isComm) {
    if (label) label.textContent = 'Лимит договора (необязательно)';
    if (hint)  hint.style.display = 'block';
    if (input) input.placeholder = 'например 5 000 000';
  } else {
    if (label) label.textContent = 'Сумма договора';
    if (hint)  hint.style.display = 'none';
    if (input) input.placeholder = '0';
  }
}

// Init contract type selection
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      toggleGphBlock(btn.dataset.type);
    });
  });

  document.getElementById('generate-btn').addEventListener('click', generateContract);
});

// Налоговые режимы и расчёты

const TAX_REGIMES = {
  kz: [
    {
      id: 'kz_phys',
      label: 'Физлицо (KZ)',
      desc: 'ИПН 10% от дохода',
      calc: (amount) => {
        const ipn = amount * 0.10;
        return {
          net: amount - ipn,
          taxes: [{ name: 'ИПН 10%', amount: ipn }],
          total_tax: ipn
        };
      }
    },
    {
      id: 'kz_ip_patent',
      label: 'ИП Патент (KZ)',
      desc: '1% от дохода',
      calc: (amount) => {
        const patent = amount * 0.01;
        return {
          net: amount - patent,
          taxes: [{ name: 'Патент 1%', amount: patent }],
          total_tax: patent
        };
      }
    },
    {
      id: 'kz_ip_our',
      label: 'ИП ОУР (KZ)',
      desc: 'ИПН 10% от дохода',
      calc: (amount) => {
        const ipn = amount * 0.10;
        return {
          net: amount - ipn,
          taxes: [{ name: 'ИПН 10%', amount: ipn }],
          total_tax: ipn
        };
      }
    },
    {
      id: 'kz_too',
      label: 'ТОО (KZ)',
      desc: 'КПН 20% + НДС 12% (если плательщик)',
      calc: (amount) => {
        const kpn    = amount * 0.20;  // Корп. подоходный
        const nds    = amount * 0.12;  // НДС (если зарегистрирован)
        const total_tax = kpn + nds;
        return {
          net: amount - total_tax,
          taxes: [
            { name: 'КПН 20%', amount: kpn },
            { name: 'НДС 12%', amount: nds },
          ],
          total_tax
        };
      }
    },
    {
      id: 'kz_too_no_nds',
      label: 'ТОО без НДС (KZ)',
      desc: 'КПН 20%',
      calc: (amount) => {
        const kpn = amount * 0.20;
        return {
          net: amount - kpn,
          taxes: [{ name: 'КПН 20%', amount: kpn }],
          total_tax: kpn
        };
      }
    },
  ],
  ru: [
    {
      id: 'ru_phys',
      label: 'Физлицо (RU)',
      desc: 'НДФЛ 13%',
      calc: (amount) => {
        const ndfl = amount * 0.13;
        return {
          net: amount - ndfl,
          taxes: [{ name: 'НДФЛ 13%', amount: ndfl }],
          total_tax: ndfl
        };
      }
    },
    {
      id: 'ru_self',
      label: 'Самозанятый (RU)',
      desc: '4% от физлиц / 6% от юрлиц',
      calc: (amount, fromLegal = false) => {
        const rate = fromLegal ? 0.06 : 0.04;
        const tax  = amount * rate;
        return {
          net: amount - tax,
          taxes: [{ name: `НПД ${fromLegal ? '6' : '4'}%`, amount: tax }],
          total_tax: tax
        };
      }
    },
    {
      id: 'ru_ip_usn6',
      label: 'ИП УСН 6% (RU)',
      desc: 'УСН 6% от дохода',
      calc: (amount) => {
        const usn = amount * 0.06;
        return {
          net: amount - usn,
          taxes: [{ name: 'УСН 6%', amount: usn }],
          total_tax: usn
        };
      }
    },
    {
      id: 'ru_ip_usn15',
      label: 'ИП УСН 15% (RU)',
      desc: 'УСН 15% (доходы − расходы)',
      calc: (amount) => {
        const usn = amount * 0.15;
        return {
          net: amount - usn,
          taxes: [{ name: 'УСН 15%', amount: usn }],
          total_tax: usn
        };
      }
    },
    {
      id: 'ru_ip_osno',
      label: 'ИП ОСНО (RU)',
      desc: 'НДФЛ 13% + НДС 20%',
      calc: (amount) => {
        const ndfl = amount * 0.13;
        const nds  = amount * 0.20;
        const total_tax = ndfl + nds;
        return {
          net: amount - total_tax,
          taxes: [
            { name: 'НДФЛ 13%', amount: ndfl },
            { name: 'НДС 20%', amount: nds },
          ],
          total_tax
        };
      }
    },
  ]
};

function getTaxRegimes(country) {
  return TAX_REGIMES[country] || [];
}

function calcTax(regimeId, amount, country) {
  const regimes = getTaxRegimes(country);
  const regime  = regimes.find(r => r.id === regimeId);
  if (!regime) return { net: amount, taxes: [], total_tax: 0 };
  return regime.calc(amount);
}

function fmt(num, currency = '') {
  return (currency ? currency + ' ' : '') + Math.round(num).toLocaleString('ru-RU');
}

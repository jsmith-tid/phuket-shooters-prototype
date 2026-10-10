const tourOperators = {
  route: 'groups-tour-operators',
  links: [
    { lang: 'en', label: 'Tour operators welcome' },
    { lang: 'zh', label: '欢迎旅行社' },
    { lang: 'th', label: 'ยินดีต้อนรับบริษัททัวร์' }
  ],
  // TODO: Replace these clearly marked demo pages with approved group-visit details.
  pages: {
    en: {
      title: 'Groups / Tour Operators',
      intro: 'Information for group visits and tour operators is being prepared.',
      notice: 'Prototype page — details to be confirmed',
      body: 'For a group visit enquiry, please contact Phuket Shooters with your proposed date and group size.',
      contact: 'Ask about a group visit'
    },
    th: {
      title: 'กรุ๊ปทัวร์และบริษัททัวร์',
      intro: 'กำลังเตรียมข้อมูลสำหรับการเยี่ยมชมเป็นกลุ่มและบริษัททัวร์',
      notice: 'หน้าตัวอย่าง — รายละเอียดอยู่ระหว่างการยืนยัน',
      body: 'หากต้องการสอบถามเกี่ยวกับการเยี่ยมชมเป็นกลุ่ม โปรดติดต่อ Phuket Shooters พร้อมแจ้งวันที่และจำนวนผู้เข้าร่วมที่ต้องการ',
      contact: 'สอบถามเกี่ยวกับการเยี่ยมชมเป็นกลุ่ม'
    },
    zh: {
      title: '团体及旅行社',
      intro: '团体参观和旅行社相关信息正在准备中。',
      notice: '演示页面——详情尚待确认',
      body: '如需咨询团体参观，请联系 Phuket Shooters，并告知计划日期及人数。',
      contact: '咨询团体参观',
      englishHome: '返回英文首页'
    },
    ar: {
      title: 'المجموعات وشركات السياحة',
      intro: 'يجري إعداد معلومات زيارات المجموعات وشركات السياحة.',
      notice: 'صفحة تجريبية — التفاصيل قيد التأكيد',
      body: 'للاستفسار عن زيارة جماعية، تواصل مع Phuket Shooters واذكر التاريخ المقترح وعدد الأشخاص.',
      contact: 'استفسر عن زيارة جماعية'
    },
    ru: {
      title: 'Группы и туроператоры',
      intro: 'Информация о посещении группами и для туроператоров готовится.',
      notice: 'Демонстрационная страница — детали уточняются',
      body: 'Чтобы узнать о групповом посещении, свяжитесь с Phuket Shooters и укажите предполагаемую дату и количество человек.',
      contact: 'Узнать о групповом посещении'
    }
  }
};

module.exports = { tourOperators };

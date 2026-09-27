const { t } = require('./site');

// News and Events content is kept separate from page templates so a new item
// only requires a data entry and approved local imagery.
const newsItems = [
  {
    slug: 'action-air',
    title: t('Example: Action Air', 'Example: Action Air'),
    date: null,
    category: t('Example item', 'รายการตัวอย่าง'),
    summary: t(
      'Placeholder example only — approved article copy and event details have not yet been supplied.',
      'เนื้อหาตัวอย่างเท่านั้น — ยังไม่ได้รับเนื้อหาบทความและรายละเอียดกิจกรรมที่อนุมัติ'
    ),
    body: t(
      [
        'This page demonstrates the structure for future News and Events articles.',
        'Approved copy, dates and supporting images for an Action Air article have not yet been supplied. Replace this placeholder before production launch.'
      ],
      [
        'หน้านี้แสดงโครงสร้างสำหรับบทความข่าวและกิจกรรมในอนาคต',
        'ยังไม่ได้รับเนื้อหา วันที่ และภาพประกอบที่ได้รับอนุมัติสำหรับบทความ Action Air โปรดแทนที่เนื้อหาตัวอย่างนี้ก่อนเปิดเว็บไซต์จริง'
      ]
    ),
    heroImage: 'photo15.jpeg',
    heroAlt: t('Café and visitor area at Phuket Shooters', 'คาเฟ่และพื้นที่สำหรับผู้มาเยือนที่ Phuket Shooters'),
    gallery: [],
    eventDate: null,
    cta: null,
    metaDescription: t(
      'Placeholder News and Events article awaiting approved Action Air content.',
      'บทความข่าวและกิจกรรมตัวอย่างที่รอเนื้อหา Action Air ที่ได้รับอนุมัติ'
    ),
    isPlaceholder: true,
    translationStatus: { en: 'placeholder', th: 'placeholder' }
  }
];

module.exports = { newsItems };

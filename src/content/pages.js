const { t } = require('./site');

const copy = {
  en: {
    skip: 'Skip to content', menu: 'Menu', close: 'Close', prototype: 'Unofficial prototype · No bookings are submitted',
    pricesCta: 'See prices', bookCta: 'Book / enquire', whatsapp: 'WhatsApp us', call: 'Call us', directions: 'Open directions',
    homeTitle: 'Professional Range. Expert Supervision.',
    homeIntro: 'Everyone from beginners to experienced shooters are welcome at our purpose-built range, with trained safety staff on hand throughout. Choose from firearms, archery, crossbows and B.B. guns.',
    experiences: 'Choose your experience', firearms: 'Pistols, rifles & shotguns', firearmsText: 'The main 25m range has 12 shooting bays and more than 30 firearms available under staff supervision.',
    alternatives: 'Archery, crossbows & B.B. guns', alternativesText: 'Available on the other ranges, including options for visitors under 20 who cannot use firearms under Thai law.',
    course: 'IDPA course', courseText: 'A structured three-day introduction to safe pistol handling and competition shooting.',
    practical: 'Plan your visit', safety: 'Supervised at every step', safetyText: 'Experienced safety staff supervise firearm use. Qualified instructors are accredited with THPSA and licensed to teach IPSC, IDPA and HDP courses.',
    facility: 'Built for visitors', facilityText: 'Three ranges within a 2,400m² facility, 1,500m² of free parking, a safe viewing area beside the café and a small souvenir shop.',
    noBooking: 'Walk-ins welcome', noBookingText: 'Bookings are not necessary. If your schedule is tight, request a time slot in advance.',
    identification: 'Bring suitable identification', identificationText: 'Please bring a passport, national ID card or driver’s licence. Identification is required before using the range.',
    selectedPhotos: 'Inside Phuket Shooters', viewGallery: 'View the gallery', location: 'In Chalong, near the Phuket Dolphin show',
    pricesTitle: 'Range prices', pricesIntro: 'Prices are shown in Thai baht.', pricesHelp: 'Not sure what to choose? Contact our team and they can help you decide what suits your experience.', individual: 'Individual activities', packages: 'Packages', rounds: 'Rounds', baht: 'THB',
    bookTitle: 'Booking & enquiries', bookIntro: 'A booking is not essential. Use this form to enquire, or contact Phuket Shooters on WhatsApp.', idNotice: 'Please bring suitable identification such as your passport, ID card or driver\'s licence.', prototypeForm: 'Prototype form', people: 'Number of people', date: 'Date of booking', start: 'Start time', end: 'End time', name: 'Your name', phone: 'Your phone number', email: 'Your email address', extra: 'Anything else you want to tell us?', agree: 'I have read and agree to the Range Rules.', submit: 'Preview enquiry', formResult: 'Prototype only — no booking has been submitted.', required: 'Required',
    coursesTitle: 'IDPA course', coursesIntro: 'International Defensive Pistol Association (IDPA) training develops safe handling skills and introduces pistol competition shooting.', courseSummary: 'No shooting experience is required. Learn firearm and pistol safety, holster use and the fundamentals of shooting before applying those skills on competition-style stages.', duration: '3 days', bullets: '1,000 bullets', coursePrice: '75,000 baht', includes: 'The fee includes', includesText: 'Firearms, 1,000 rounds of 9mm ammunition, teaching, IDPA certificate registration, lunch for three days and drinks during the course.', courseVideoTitle: 'See the training in action', courseVideoText: 'Watch a competition-style shooting exercise at Phuket Shooters.', timetable: 'Course timetable', day: 'Day', otherCourses: 'Other courses are available. Contact the range for details.',
    teamTitle: 'Meet the team', teamIntro: 'The people behind the range, its instruction and customer service.', languages: 'Languages',
    rulesTitle: 'Range rules', rulesIntro: 'Phuket Shooters Association and Phuket Shooters Shooting Range must keep a record of all users for the Thailand Police, government officials and associated organisations. You are required to carefully read and acknowledge the following.', controlled: 'Controlled safety content — reproduced from the English live site.',
    findTitle: 'How to find us', findIntro: 'Practical details for your visit to the range in Chalong.', address: 'Address', hours: 'Opening hours', contact: 'Contact', nearby: 'Nearby landmark', landmark: "We're near the Phuket Dolphin Show, the Crocodile Show Phuket and Mini Zoo, Lion Land, the Cobra Show and Jurafish.", mapNote: 'Use the interactive map above or open directions in Google Maps.',
    galleryTitle: 'Gallery', galleryIntro: '',
    newsTitle: 'News and Events', newsIntro: 'News, events and range updates will appear here.', latestUpdate: 'Latest update', viewAllNews: 'View all news and events', readMore: 'Read more', backToNews: 'Back to News and Events', exampleContent: 'Example content — awaiting approved copy',
    footerExplore: 'Explore', footerVisit: 'Visit',
    reviewsLabel: 'Google Reviews', reviewsCount: 'reviews', reviewsLink: 'Read reviews on Google',
    comingSoon: 'Coming soon', language: 'Language', english: 'English', thai: 'ไทย', chinese: 'Chinese', arabic: 'Arabic', russian: 'Russian'
  },
  th: {
    skip: 'ข้ามไปยังเนื้อหา', menu: 'เมนู', close: 'ปิด', prototype: 'ต้นแบบไม่เป็นทางการ · ไม่มีการส่งการจองจริง',
    pricesCta: 'ดูราคา', bookCta: 'จอง / สอบถาม', whatsapp: 'ติดต่อทาง WhatsApp', call: 'โทรหาเรา', directions: 'เปิดเส้นทาง',
    homeTitle: 'สนามยิงปืนมาตรฐาน ดูแลโดยผู้เชี่ยวชาญ',
    homeIntro: 'ยินดีต้อนรับทั้งผู้มาเยือนครั้งแรกและนักยิงที่มีประสบการณ์สู่สนามที่สร้างขึ้นโดยเฉพาะของเรา พร้อมเจ้าหน้าที่ความปลอดภัยที่ผ่านการฝึกอบรมคอยดูแลตลอดเวลา เลือกอาวุธปืน ยิงธนู หน้าไม้ และปืนบีบี',
    experiences: 'เลือกประสบการณ์ของคุณ', firearms: 'ปืนพก ปืนยาว และปืนลูกซอง', firearmsText: 'สนามหลักระยะ 25 เมตรมี 12 ช่องยิง และมีอาวุธปืนมากกว่า 30 กระบอกให้ใช้ภายใต้การดูแลของเจ้าหน้าที่',
    alternatives: 'ยิงธนู หน้าไม้ และปืนบีบี', alternativesText: 'มีให้บริการในสนามอื่น ๆ รวมถึงตัวเลือกสำหรับผู้ที่อายุต่ำกว่า 20 ปีซึ่งกฎหมายไทยห้ามใช้อาวุธปืน',
    course: 'หลักสูตร IDPA', courseText: 'หลักสูตรสามวันที่เป็นระบบ แนะนำการใช้ปืนพกอย่างปลอดภัยและการยิงแข่งขัน',
    practical: 'วางแผนการเยี่ยมชม', safety: 'มีผู้ดูแลทุกขั้นตอน', safetyText: 'เจ้าหน้าที่ความปลอดภัยที่มีประสบการณ์ดูแลการใช้อาวุธปืน ผู้สอนที่มีคุณสมบัติได้รับการรับรองจาก THPSA และมีใบอนุญาตสอน IPSC, IDPA และ HDP',
    facility: 'สร้างขึ้นเพื่อผู้เยี่ยมชม', facilityText: 'สามสนามภายในสิ่งอำนวยความสะดวกขนาด 2,400 ตร.ม. ที่จอดรถฟรี 1,500 ตร.ม. พื้นที่ชมที่ปลอดภัยข้างคาเฟ่ และร้านของที่ระลึกขนาดเล็ก',
    noBooking: 'ยินดีรับลูกค้าที่ไม่ได้จอง', noBookingText: 'ไม่จำเป็นต้องจอง หากมีเวลาจำกัด สามารถขอช่วงเวลาล่วงหน้า', selectedPhotos: 'ภายใน Phuket Shooters', viewGallery: 'ดูแกลเลอรี', location: 'ในฉลอง ใกล้โชว์โลมาภูเก็ต',
    identification: 'นำเอกสารยืนยันตนมาด้วย', identificationText: 'โปรดนำหนังสือเดินทาง บัตรประจำตัวประชาชน หรือใบขับขี่มาแสดง ต้องยืนยันตัวตนก่อนใช้สนาม',
    pricesTitle: 'ราคาของสนาม', pricesIntro: 'แสดงราคาเป็นเงินบาท', pricesHelp: 'ไม่แน่ใจว่าควรเลือกอะไร? ติดต่อทีมงานของเราเพื่อขอคำแนะนำให้เหมาะกับประสบการณ์ของคุณ', individual: 'กิจกรรมรายการ', packages: 'แพ็กเกจ', rounds: 'จำนวนนัด', baht: 'บาท',
    bookTitle: 'จองและสอบถาม', bookIntro: 'ไม่จำเป็นต้องจอง ใช้แบบฟอร์มนี้เพื่อสอบถาม หรือติดต่อ Phuket Shooters ทาง WhatsApp', idNotice: 'โปรดนำเอกสารยืนยันตนที่เหมาะสมมาด้วย เช่น หนังสือเดินทาง บัตรประจำตัว หรือใบขับขี่', prototypeForm: 'แบบฟอร์มต้นแบบ', people: 'จำนวนคน', date: 'วันที่จอง', start: 'เวลาเริ่ม', end: 'เวลาสิ้นสุด', name: 'ชื่อของคุณ', phone: 'หมายเลขโทรศัพท์', email: 'อีเมล', extra: 'มีข้อมูลอื่นที่ต้องการแจ้งหรือไม่?', agree: 'ฉันได้อ่านและยอมรับกฎของสนาม', submit: 'ดูตัวอย่างคำสอบถาม', formResult: 'เป็นเพียงต้นแบบ — ไม่มีการส่งการจอง', required: 'จำเป็น',
    coursesTitle: 'หลักสูตร IDPA', coursesIntro: 'การฝึก International Defensive Pistol Association (IDPA) พัฒนาทักษะการใช้ปืนอย่างปลอดภัยและแนะนำการยิงปืนพกในการแข่งขัน', courseSummary: 'ไม่จำเป็นต้องมีประสบการณ์ยิงปืน เรียนรู้ความปลอดภัยของอาวุธปืน การใช้ซองปืน และพื้นฐานการยิง ก่อนนำทักษะไปใช้ในสถานีแบบการแข่งขัน', duration: '3 วัน', bullets: '1,000 นัด', coursePrice: '75,000 บาท', includes: 'ค่าธรรมเนียมรวม', includesText: 'อาวุธปืน กระสุน 9 มม. 1,000 นัด ค่าสอน ค่าลงทะเบียนใบประกาศ IDPA อาหารกลางวัน 3 วัน และเครื่องดื่มระหว่างหลักสูตร', courseVideoTitle: 'ชมการฝึกซ้อมจริง', courseVideoText: 'ชมการฝึกยิงแบบการแข่งขันที่ Phuket Shooters', timetable: 'ตารางหลักสูตร', day: 'วันที่', otherCourses: 'มีหลักสูตรอื่นให้บริการ กรุณาติดต่อสนามเพื่อสอบถามรายละเอียด',
    teamTitle: 'พบกับทีมงาน', teamIntro: 'ผู้คนที่อยู่เบื้องหลังสนาม การสอน และการบริการลูกค้า', languages: 'ภาษา',
    rulesTitle: 'กฎของสนาม', rulesIntro: 'Phuket Shooters Association และ Phuket Shooters Shooting Range มีหน้าที่เก็บบันทึกผู้ใช้สนามทุกคนสำหรับตำรวจไทย เจ้าหน้าที่รัฐ และองค์กรที่เกี่ยวข้อง ท่านต้องอ่านและรับทราบข้อต่อไปนี้อย่างรอบคอบ', controlled: 'เนื้อหาความปลอดภัยที่ควบคุม — แปลจากเว็บไซต์ภาษาอังกฤษ',
    findTitle: 'วิธีเดินทาง', findIntro: 'รายละเอียดสำหรับการเดินทางมายังสนามในฉลอง', address: 'ที่อยู่', hours: 'เวลาเปิดทำการ', contact: 'ติดต่อ', nearby: 'สถานที่ใกล้เคียง', landmark: 'เราอยู่ใกล้ Phuket Dolphin Show, Crocodile Show Phuket and Mini Zoo, Lion Land, Cobra Show และ Jurafish', mapNote: 'ใช้แผนที่แบบโต้ตอบด้านบน หรือเปิดเส้นทางใน Google Maps',
    galleryTitle: 'แกลเลอรี', galleryIntro: '',
    newsTitle: 'ข่าวและกิจกรรม', newsIntro: 'ข่าว กิจกรรม และประกาศจากสนามจะแสดงที่นี่', latestUpdate: 'อัปเดตล่าสุด', viewAllNews: 'ดูข่าวและกิจกรรมทั้งหมด', readMore: 'อ่านเพิ่มเติม', backToNews: 'กลับไปที่ข่าวและกิจกรรม', exampleContent: 'เนื้อหาตัวอย่าง — รอเนื้อหาที่ได้รับอนุมัติ',
    footerExplore: 'สำรวจ', footerVisit: 'เยี่ยมชม',
    reviewsLabel: 'รีวิวบน Google', reviewsCount: 'รีวิว', reviewsLink: 'อ่านรีวิวบน Google',
    comingSoon: 'เร็ว ๆ นี้', language: 'ภาษา', english: 'English', thai: 'ไทย', chinese: 'จีน', arabic: 'อารบิก', russian: 'รัสเซีย'
  }
};

const schedule = [
  [1, '09:00–09:30', t('Check-in and registration','ลงทะเบียน')],
  [1, '09:30–11:00', t('Range and pistol safety; pistol use; equipment matching; shooting basics; IDPA rules','กฎความปลอดภัยของสนามและปืนพก พื้นฐานการใช้ปืน การเลือกอุปกรณ์ พื้นฐานการยิง และกฎ IDPA')],
  [1, '11:00–11:30', t('Questions session','ช่วงถาม–ตอบ')], [1, '11:30–12:00', t('Basic rules assessment','ประเมินกฎพื้นฐาน')], [1, '12:00–13:00', t('Lunch','อาหารกลางวัน')],
  [1, '13:00–16:00', t('Basic shooting: holster draw, aiming, strong and weak hand, three-position shooting, tactical and emergency reloading, troubleshooting','การยิงพื้นฐาน: ชักปืนจากซอง เล็ง ยิงด้วยมือข้างถนัดและไม่ถนัด ท่ายิงสามท่า การเปลี่ยนซอง และการแก้ไขข้อขัดข้อง')],
  [2, '09:00–09:30', t('Check-in','เช็กอิน')], [2, '09:30–12:00', t('Shooting on the move and switching positions','ยิงขณะเคลื่อนที่และเปลี่ยนตำแหน่ง')], [2, '12:00–13:00', t('Lunch','อาหารกลางวัน')], [2, '13:00–14:00', t('Stage shooting, planning and skills development','การยิงสเตจ การวางแผน และพัฒนาทักษะ')], [2, '14:00–16:00', t('Stage shooting application and comprehensive assessment','ประยุกต์การยิงสเตจและการประเมินรอบด้าน')],
  [3, '09:00–12:00', t('Stage shooting practical applications and problem solving','การประยุกต์ใช้การยิงสเตจและการแก้ปัญหา')], [3, '12:00–13:00', t('Lunch','อาหารกลางวัน')], [3, '13:00–16:00', t('Practical application and certification assessment as an IDPA shooter','การประยุกต์ใชและการประเมินเพื่อรับรองเป็นนักยิง IDPA')]
];

module.exports = { copy, schedule };

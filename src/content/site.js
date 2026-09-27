const t = (en, th) => ({ en, th });

const business = {
  name: 'Phuket Shooters',
  descriptor: t('Shooting Range', 'สนามยิงปืน'),
  address: t('33, 54 Soi Palai, Chalong, Mueang Phuket District, Phuket 83130, Thailand', '33, 54 ซอยป่าหล่าย ฉลอง อำเภอเมืองภูเก็ต ภูเก็ต 83130 ประเทศไทย'),
  phoneDisplay: '+66 81 103 2598',
  phoneHref: '+66811032598',
  email: 'info@phuketshooters.com',
  whatsapp: 'https://wa.me/66811032598',
  map: 'https://maps.app.goo.gl/hzkgkYexjWsZcYmh7',
  mapEmbed: 'https://www.google.com/maps?q=Phuket%20Shooters%20Shooting%20Range%2C%20Chalong%2C%20Phuket&z=17&output=embed',
  coordinates: { latitude: 7.841593, longitude: 98.3562825 },
  reviews: {
    provider: 'Google',
    rating: 4.8,
    count: 146,
    checkedAt: '2026-09-26',
    url: 'https://maps.app.goo.gl/hzkgkYexjWsZcYmh7'
  },
  hours: t('Open daily, 09:00–18:00', 'เปิดทุกวัน 09:00–18:00 น.'),
  opened: t('Opened October 2024', 'เปิดให้บริการเมื่อเดือนตุลาคม 2024')
};

const nav = [
  ['home', '', t('Home', 'หน้าแรก')], ['prices', 'prices', t('Prices', 'ราคา')],
  ['courses', 'courses', t('Courses', 'หลักสูตร')], ['book', 'book', t('Book / Enquire', 'จอง / สอบถาม')],
  ['find-us', 'find-us', t('Find Us', 'การเดินทาง')], ['team', 'meet-the-team', t('Team', 'ทีมงาน')],
  ['rules', 'range-rules', t('Range Rules', 'กฎของสนาม')], ['gallery', 'gallery', t('Gallery', 'แกลเลอรี')]
];

const prices = [
  ['9mm', '10 bullets', '10 นัด', 1250], ['.45', '10 bullets', '10 นัด', 1250],
  ['.38', '10 bullets', '10 นัด', 1250], ['.22', '10 bullets', '10 นัด', 1050],
  ['Shotgun', '10 bullets', '10 นัด', 1450], ['Archery', '', '', 950], ['B.B. Gun', '', '', 950], ['Crossbow', '', '', 950]
];

const packages = [
  [3100, '9mm · .45 · .22'], [3300, '9mm · .45 · Shotgun'], [4350, '9mm · .45 · .22 · Shotgun'],
  [4950, '9mm · .45 · .38 · .22 · Shotgun'], [4500, '9mm, 50 bullets, 5 targets'],
  [4500, '.45, 50 bullets, 5 targets'], [3500, '.22, 50 bullets, 5 targets'], [3500, '12 gauge shotgun, 25 bullets'],
  [2450, 'B.B. Gun · Archery · Crossbow'], [1700, 'B.B. Gun · Archery'], [1700, 'B.B. Gun · Crossbow']
];

const visitImages = [
  { file: 'gallery-05.jpg', alt: t('A visitor with a range officer after a supervised shooting session', 'ผู้เยี่ยมชมกับเจ้าหน้าที่สนามหลังการยิงภายใต้การดูแล') },
  { file: 'gallery-06.jpg', alt: t('A visitor displaying her target inside the indoor range', 'ผู้เยี่ยมชมแสดงเป้ายิงภายในสนามในร่ม') },
  { file: 'gallery-07.jpg', alt: t('An instructor helping a visitor prepare at an indoor shooting bay', 'ผู้สอนช่วยผู้เยี่ยมชมเตรียมตัวที่ช่องยิงในร่ม') },
  { file: 'gallery-10.jpg', alt: t('A visitor shooting under staff supervision on the indoor range', 'ผู้เยี่ยมชมยิงปืนภายใต้การดูแลของเจ้าหน้าที่ในสนามในร่ม') },
  { file: 'gallery-12.jpg', alt: t('A range officer guiding a visitor at an indoor shooting bay', 'เจ้าหน้าที่สนามแนะนำผู้เยี่ยมชมที่ช่องยิงในร่ม') }
];

const affiliations = [
  { file: 'idpa.jpg', name: 'International Defensive Pistol Association (IDPA)' },
  { file: 'sports-authority-of-thailand.jpg', name: 'Sports Authority of Thailand' },
  { file: 'sap.jpg', name: 'The Sport Association of Phuket' },
  { file: 'national-sports-development-fund.png', name: 'National Sports Development Fund' },
  { file: 'thpsa.jpg', name: 'Thailand Practical Shooting Association (THPSA)' },
  { file: 'ipsc.png', name: 'International Practical Shooting Confederation (IPSC)' }
];

const staff = [
  ['gola','Gola',t('Managing director & instructor','กรรมการผู้จัดการและผู้สอน'),t('Gola is the managing director and an IPSC and IDPA shooting instructor with more than 20 years experience. He leads the Phuket Shooters competition team and is an operations team leader of the Department of Provincial Administration (D.O.P.A) Team.','Gola เป็นกรรมการผู้จัดการและผู้สอนยิงปืน IPSC และ IDPA ที่มีประสบการณ์มากกว่า 20 ปี เป็นผู้นำทีมแข่งขัน Phuket Shooters และหัวหน้าทีมปฏิบัติการของกรมการปกครอง (D.O.P.A)'),'Thai, English'],
  ['nan','Nan',t('Shooting range manager','ผู้จัดการสนามยิงปืน'),t('Nan is a qualified IPSC range officer and IDPA safety officer, a member of the Phuket Shooters competition team and a member of the D.O.P.A team.','Nan เป็นเจ้าหน้าที่สนาม IPSC และเจ้าหน้าที่ความปลอดภัย IDPA ที่มีคุณสมบัติ เป็นสมาชิกทีมแข่งขัน Phuket Shooters และทีม D.O.P.A'),'Thai, English'],
  ['jack','Jack',t('Range safety officer','เจ้าหน้าที่ความปลอดภัย'),t('Jack has over 16 years experience as a range safety officer.','Jack มีประสบการณ์เป็นเจ้าหน้าที่ความปลอดภัยประจำสนามมากกว่า 16 ปี'),'Thai, English, Mandarin'],
  ['matoom','Matoom',t('Range safety officer','เจ้าหน้าที่ความปลอดภัย'),t('Matoom has over 5 years experience, is an assistant IDPA instructor and competes for the Phuket Shooters team.','Matoom มีประสบการณ์มากกว่า 5 ปี เป็นผู้ช่วยผู้สอน IDPA และลงแข่งขันให้ทีม Phuket Shooters'),'Thai, some English, Mandarin'],
  ['tata','Tata',t('Range safety officer','เจ้าหน้าที่ความปลอดภัย'),t('Tata has been a member of the team since 2020. One of the few female safety officers in Thailand, she can provide one-to-one assistance to female shooters.','Tata เป็นสมาชิกทีมตั้งแต่ปี 2020 และเป็นหนึ่งในเจ้าหน้าที่ความปลอดภัยหญิงจำนวนน้อยในไทย สามารถช่วยเหลือนักยิงหญิงแบบตัวต่อตัว'),'Thai, English; learning Mandarin and Arabic'],
  ['sak','Sak',t('Range safety officer','เจ้าหน้าที่ความปลอดภัย'),t('Sak is a former Thai Army Ranger who served 9 years with the special forces battalion and has 5 years experience as a range safety officer.','Sak เคยรับราชการในกองทัพบกไทยกับกองพันรบพิเศษ 9 ปี และมีประสบการณ์ด้านความปลอดภัยของสนาม 5 ปี'),'Thai, English'],
  ['peun','Peun',t('Range safety officer','เจ้าหน้าที่ความปลอดภัย'),t('Peun has over 5 years experience, is an assistant IDPA instructor and a member of the competition team.','Peun มีประสบการณ์มากกว่า 5 ปี เป็นผู้ช่วยผู้สอน IDPA และสมาชิกทีมแข่งขัน'),'Thai, English, Mandarin'],
  ['ole','Ole',t('Range safety officer','เจ้าหน้าที่ความปลอดภัย'),t('A former Thai Army infantry soldier and trainer, Ole received certificates of honour for his service and has worked as a range safety officer since 2021.','Ole เคยเป็นทหารราบและครูฝึกของกองทัพบกไทย ได้รับประกาศนียบัตรเกียรติคุณ และทำงานด้านความปลอดภัยของสนามตั้งแต่ปี 2021'),'Thai, English, Mandarin'],
  ['aod','Aod',t('Range safety officer','เจ้าหน้าที่ความปลอดภัย'),t('A former soldier with hospitality experience, Aod is skilled, disciplined and detail oriented.','Aod เคยเป็นทหารและมีประสบการณ์ในธุรกิจบริการ มีทักษะ วินัย และใส่ใจรายละเอียด'),'Thai; learning English'],
  ['chat','Chat',t('Range officer','เจ้าหน้าที่สนาม'),t('Chat is a range officer and trains in Muay Thai outside of work.','Chat เป็นเจ้าหน้าที่สนาม และฝึกมวยไทยนอกเวลางาน'),'Thai; learning English and Mandarin'],
  ['dul','Dul',t('Range safety officer','เจ้าหน้าที่ความปลอดภัย'),t('Dul formerly served in the Thai Army as a battlefield medic.','Dul เคยรับราชการในกองทัพบกไทยในฐานะเสนารักษ์ในสนามรบ'),'Thai, Malay, Mandarin, English'],
  ['fahn','Fahn',t('Range officer','เจ้าหน้าที่สนาม'),t('Fahn is a range officer and trains for Muay Thai.','Fahn เป็นเจ้าหน้าที่สนามและฝึกมวยไทย'),'Thai; learning English and Mandarin'],
  ['cat','Cat',t('Front of house manager','ผู้จัดการฝ่ายต้อนรับ'),t('Cat manages front of house and is the go-to person for enquiries. She has extensive tourism experience.','Cat ดูแลฝ่ายต้อนรับและเป็นผู้ติดต่อหลักสำหรับข้อสอบถาม มีประสบการณ์ด้านการท่องเที่ยวมากมาย'),'Thai, English, Mandarin'],
  ['pim','Pim',t('Customer service','ฝ่ายบริการลูกค้า'),t('Pim is part of the customer service team with a background in sales.','Pim เป็นส่วนหนึ่งของทีมบริการลูกค้าและมีประสบการณ์ด้านการขาย'),'Thai, some English'],
  ['rainy','Rainy',t('Administrator','ธุรการ'),t('Rainy is an experienced front-of-house administrator focused on seamless service and supporting clients.','Rainy เป็นเจ้าหน้าที่ธุรการฝ่ายต้อนรับที่มีประสบการณ์ มุ่งมั่นในการให้บริการที่ราบรื่นและดูแลลูกค้า'),'Thai, Mandarin, English'],
  ['june','June',t('Accounts','ฝ่ายบัญชี'),t('June has more than 13 years experience in accounting.','June มีประสบการณ์ด้านบัญชีมากกว่า 13 ปี'),'Thai, English'],
  ['na','Na',t('Accounts cashier','แคชเชียร์ฝ่ายบัญชี'),t('Na is the accounts department cashier and has 11 years of experience.','Na เป็นแคชเชียร์ฝ่ายบัญชีและมีประสบการณ์ 11 ปี'),'Thai, a little English'],
  ['fay','Fay',t('Accounts','ฝ่ายบัญชี'),t('Fay works in the accounts department and has two years experience.','Fay ทำงานในฝ่ายบัญชีและมีประสบการณ์ 2 ปี'),'Thai; learning English'],
  ['kwang','Kwang',t('Administrator & cashier','ธุรการและแคชเชียร์'),t('Kwang is an experienced administrator and cashier: organized, dependable and service driven.','Kwang เป็นเจ้าหน้าที่ธุรการและแคชเชียร์ที่มีประสบการณ์ เป็นระเบียบ ไว้วางใจได้ และใส่ใจการบริการ'),'Thai, English']
];

const rules = [
 t('Your health and safety are of the utmost importance to us. Whilst at the shooting range you must listen to and follow the instructions of staff at all times. A failure to do so or any action that staff may consider unsafe may result in the termination of your shooting session and your being asked to leave the premises.','สุขภาพและความปลอดภัยของท่านสำคัญที่สุด ขณะอยู่ในสนามยิงปืนท่านต้องฟังและปฏิบัติตามคำสั่งของเจ้าหน้าที่ตลอดเวลา การไม่ปฏิบัติตามหรือการกระทำที่เจ้าหน้าที่เห็นว่าไม่ปลอดภัยอาจทำให้ยุติการยิงและขอให้ท่านออกจากสถานที่'),
 t('All users must provide staff with an acceptable form of photographic identification, for example a passport or driver’s licence.','ผู้ใช้บริการทุกคนต้องแสดงเอกสารยืนยันตนที่มีรูปถ่ายที่ยอมรับได้ เช่น หนังสือเดินทางหรือใบขับขี่'),
 t('Thai law prohibits the use or handling of firearms by persons under 20 years of age on these premises.','กฎหมายไทยห้ามบุคคลอายุต่ำกว่า 20 ปีใช้หรือจับต้องอาวุธปืนในสถานที่แห่งนี้'),
 t('The use of alcohol or drugs is strictly forbidden. Prescribed medication that may cause drowsiness or otherwise affect decision making or the ability to safely handle firearms is not permitted. Anyone deemed under the influence will be asked to leave.','ห้ามใช้แอลกอฮอล์หรือยาเสพติดโดยเด็ดขาด รวมถึงยาตามใบสั่งแพทย์ที่อาจทำให้ง่วงซึมหรือส่งผลต่อการตัดสินใจหรือความสามารถในการใช้อาวุธปืนอย่างปลอดภัย ผู้ที่ถูกเห็นว่าอยู่ภายใต้อิทธิพลของสิ่งเหล่านี้จะถูกขอให้ออกจากสถานที่'),
 t('Every reasonable precaution is taken to ensure the range is safe. However, the Phuket Shooters Association and Phuket Shooters Shooting Range will not be responsible or accept liability for property damage, personal injury or loss of life caused by any third party or arising from a failure to follow staff instructions.','มีการใช้มาตรการป้องกันที่สมเหตุสมผลทุกประการเพื่อให้สนามยิงปืนเป็นสภาพแวดล้อมที่ปลอดภัย อย่างไรก็ตาม Phuket Shooters Association และ Phuket Shooters Shooting Range จะไม่รับผิดชอบต่อความเสียหายต่อทรัพย์สิน การบาดเจ็บ หรือการเสียชีวิตที่เกิดจากบุคคลที่สามหรือการไม่ปฏิบัติตามคำสั่งของเจ้าหน้าที่'),
 t('If any claim arises against the Phuket Shooters Association or Phuket Shooters Shooting Range for property damage, injury or loss of life, you acknowledge that it will be dealt with under Thai law and within the jurisdiction of the Kingdom of Thailand.','หากมีการเรียกร้องใดๆ ต่อ Phuket Shooters Association หรือ Phuket Shooters Shooting Range สำหรับความเสียหายต่อทรัพย์สิน การบาดเจ็บ หรือการเสียชีวิต ท่านรับทราบว่าจะดำเนินการตามกฎหมายไทยและภายใต้เขตอำนาจของราชอาณาจักรไทย')
];

module.exports = { t, business, nav, prices, packages, visitImages, affiliations, staff, rules };

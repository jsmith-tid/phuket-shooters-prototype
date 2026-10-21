// Draft stakeholder copy. The group form is a local-only demonstration.
const tourOperators = {
  route: 'groups-tour-operators',
  requestRoute: 'groups-tour-operators/group-booking',
  languages: ['en', 'th', 'zh'],
  // Retained for the disabled homepage strip, should it be restored later.
  links: [
    { lang: 'en', label: 'Tour operators welcome' },
    { lang: 'zh', label: '欢迎旅行社' },
    { lang: 'th', label: 'ยินดีต้อนรับบริษัททัวร์' }
  ],
  pages: {
    en: {
      title: 'Tour operators & coach groups', description: 'Plan a group visit to Phuket Shooters. Find information about coach parking, visit timings, enquiries and payment.',
      intro: 'Planning a stop at Phuket Shooters? Contact our team to discuss your group, preferred arrival time and itinerary.',
      requestCta: 'Make a group request', call: 'Call the team', directions: 'Get directions',
      parkingLabel: 'Free coach parking', parkingFigure: 'Space for up to 4 coaches', durationLabel: 'Plan your visit', durationFigure: 'Allow approximately 1–4 hours',
      durationText: 'Visit length depends on your group and chosen activities. Contact us to discuss the time available in your itinerary.',
      draftNotice: 'Draft preview: parking capacity and visit timings need confirmation before launch.',
      planningTitle: 'Fit a visit into your itinerary', planningText: 'Tell us your preferred date, arrival time, approximate number of visitors and number of coaches. Our team can discuss the arrangements with you.',
      arrivalTitle: 'Arrival & coach parking', arrivalText: 'Free parking is available for coaches. Contact us before your visit to discuss arrival and parking arrangements.',
      processTitle: 'How group bookings work', steps: ['Send a booking request', 'Discuss arrangements with our team', 'Receive explicit booking confirmation', 'Pay using the agreed arrangement'],
      paymentTitle: 'Booking & payment', paymentText: 'Send a group booking request. Our team will check availability and contact you to agree the arrangements and confirm your booking. You can pay cash on the day, or call us to arrange payment by card.', paymentCta: 'Call to arrange card payment',
      photoAlt: 'Café and visitor seating area at Phuket Shooters',
      requestTitle: 'Group booking request', requestDescription: 'Preview a group booking request to Phuket Shooters. This prototype does not send information or make a booking.',
      requestIntro: 'Explore the group request form. This is a prototype: nothing you enter is sent or saved, and no time is reserved or booking confirmed.',
      back: 'Back to tour operator information', demoNotice: 'Prototype only — this form does not send a request or make a booking.',
      fields: { company: 'Company or organisation', name: 'Contact name', email: 'Email address', phone: 'Phone number', date: 'Preferred visit date', time: 'Approximate arrival time', visitors: 'Number of visitors', coaches: 'Number of coaches', activities: 'Activities or packages of interest', questions: 'Questions or requirements' },
      optional: 'Optional', timeHelp: 'All visit dates and times are local to Phuket.', phoneHelp: 'Add a phone number if you would like us to call about the arrangements.', notSure: 'Not sure yet',
      previewAction: 'Preview request', previewTitle: 'Request preview — nothing sent', previewText: 'This is only a demonstration. Your details have not been sent, no time has been reserved and no booking has been made.', editAction: 'Edit details',
      dateSummary: 'Preferred date', timeSummary: 'Approximate arrival (Phuket time)', visitorSummary: 'Visitors', coachSummary: 'Coaches',
      errors: { summary: 'Please check the highlighted fields.', required: 'Please complete this field.', email: 'Enter a valid email address.', date: 'Choose today or a future visit date in Phuket local time.', visitors: 'Enter a whole number of visitors greater than zero.', coaches: 'Enter zero or a positive whole number of coaches.' }
    },
    th: {
      title: 'ผู้ประกอบการทัวร์และกรุ๊ปรถโค้ช', description: 'วางแผนพากรุ๊ปมาเยือน Phuket Shooters พร้อมข้อมูลที่จอดรถโค้ช ระยะเวลาเข้าชม การสอบถาม และการชำระเงิน',
      intro: 'กำลังวางแผนแวะ Phuket Shooters อยู่ใช่ไหม? ติดต่อทีมงานเพื่อพูดคุยเกี่ยวกับกรุ๊ปของคุณ เวลาที่ต้องการเดินทางมาถึง และแผนการเดินทาง',
      requestCta: 'กรอกคำขอจองแบบกรุ๊ป', call: 'โทรหาทีมงาน', directions: 'ดูเส้นทาง',
      parkingLabel: 'ที่จอดรถโค้ชฟรี', parkingFigure: 'รองรับรถโค้ชได้สูงสุด 4 คัน', durationLabel: 'วางแผนการเข้าชม', durationFigure: 'เผื่อเวลาประมาณ 1–4 ชั่วโมง',
      durationText: 'ระยะเวลาขึ้นอยู่กับกรุ๊ปและกิจกรรมที่เลือก ติดต่อเราเพื่อพูดคุยเกี่ยวกับเวลาที่มีในแผนการเดินทางของคุณ',
      draftNotice: 'ฉบับร่างสำหรับตรวจสอบ: ต้องยืนยันจำนวนรถโค้ชที่รองรับและระยะเวลาเข้าชมก่อนเปิดใช้งานจริง',
      planningTitle: 'จัดเวลาเข้าชมให้เข้ากับแผนการเดินทาง', planningText: 'แจ้งวันที่ต้องการเข้าชม เวลาที่จะมาถึง จำนวนผู้เข้าร่วมโดยประมาณ และจำนวนรถโค้ช เพื่อให้ทีมงานพูดคุยเรื่องการจัดกรุ๊ปกับคุณ',
      arrivalTitle: 'การเดินทางมาถึงและที่จอดรถโค้ช', arrivalText: 'มีที่จอดรถโค้ชฟรี กรุณาติดต่อเราก่อนเข้าชมเพื่อพูดคุยเรื่องการเดินทางมาถึงและการจอดรถ',
      processTitle: 'ขั้นตอนการจองแบบกรุ๊ป', steps: ['ส่งคำขอจอง', 'พูดคุยรายละเอียดกับทีมงาน', 'รับการยืนยันการจองจากทีมงาน', 'ชำระเงินตามที่ตกลงไว้'],
      paymentTitle: 'การจองและการชำระเงิน', paymentText: 'ส่งคำขอจองแบบกรุ๊ป ทีมงานจะตรวจสอบความพร้อมและติดต่อคุณเพื่อตกลงรายละเอียดและยืนยันการจอง คุณสามารถชำระเป็นเงินสดในวันเข้าชม หรือโทรหาเราเพื่อจัดการชำระเงินด้วยบัตร', paymentCta: 'โทรเพื่อชำระเงินด้วยบัตร',
      photoAlt: 'คาเฟ่และพื้นที่นั่งพักสำหรับผู้มาเยือนที่ Phuket Shooters',
      requestTitle: 'คำขอจองแบบกรุ๊ป', requestDescription: 'ดูตัวอย่างคำขอจองแบบกรุ๊ปถึง Phuket Shooters ต้นแบบนี้ไม่ส่งข้อมูลหรือทำการจอง',
      requestIntro: 'ทดลองกรอกแบบฟอร์มคำขอจองแบบกรุ๊ป นี่เป็นเพียงต้นแบบ: ข้อมูลจะไม่ถูกส่งหรือบันทึก และยังไม่มีการสำรองเวลาหรือยืนยันการจอง',
      back: 'กลับไปยังข้อมูลสำหรับผู้ประกอบการทัวร์', demoNotice: 'ต้นแบบเท่านั้น — แบบฟอร์มนี้ไม่ส่งคำขอหรือทำการจอง',
      fields: { company: 'บริษัทหรือองค์กร', name: 'ชื่อผู้ติดต่อ', email: 'อีเมล', phone: 'หมายเลขโทรศัพท์', date: 'วันที่ต้องการเข้าชม', time: 'เวลาที่คาดว่าจะมาถึง', visitors: 'จำนวนผู้เข้าร่วม', coaches: 'จำนวนรถโค้ช', activities: 'กิจกรรมหรือแพ็กเกจที่สนใจ', questions: 'คำถามหรือความต้องการเพิ่มเติม' },
      optional: 'ไม่บังคับ', timeHelp: 'วันที่และเวลาเข้าชมทั้งหมดเป็นเวลาท้องถิ่นภูเก็ต', phoneHelp: 'หากต้องการให้เราโทรพูดคุยรายละเอียด กรุณาระบุหมายเลขโทรศัพท์', notSure: 'ยังไม่แน่ใจ',
      previewAction: 'ดูตัวอย่างคำขอ', previewTitle: 'ตัวอย่างคำขอ — ไม่มีการส่งข้อมูล', previewText: 'นี่เป็นเพียงตัวอย่าง ข้อมูลของคุณไม่ได้ถูกส่ง ไม่มีการสำรองเวลา และยังไม่มีการจอง', editAction: 'แก้ไขรายละเอียด',
      dateSummary: 'วันที่ต้องการเข้าชม', timeSummary: 'เวลาที่คาดว่าจะมาถึง (เวลาภูเก็ต)', visitorSummary: 'จำนวนผู้เข้าร่วม', coachSummary: 'จำนวนรถโค้ช',
      errors: { summary: 'กรุณาตรวจสอบช่องข้อมูลที่ระบุ', required: 'กรุณากรอกข้อมูลในช่องนี้', email: 'กรุณากรอกอีเมลให้ถูกต้อง', date: 'กรุณาเลือกวันเข้าชมเป็นวันนี้หรือวันถัดไปตามเวลาท้องถิ่นภูเก็ต', visitors: 'กรุณาระบุจำนวนผู้เข้าร่วมเป็นจำนวนเต็มมากกว่าศูนย์', coaches: 'กรุณาระบุจำนวนรถโค้ชเป็นศูนย์หรือจำนวนเต็มบวก' }
    },
    zh: {
      title: '旅行社与旅游大巴团体', description: '计划组团前往 Phuket Shooters，了解旅游大巴停车、游玩时长、咨询及付款信息。',
      intro: '计划将 Phuket Shooters 加入行程？请联系我们的团队，沟通团体人数、预计抵达时间及行程安排。',
      requestCta: '填写团体预约申请', call: '致电团队', directions: '查看路线',
      parkingLabel: '旅游大巴免费停车', parkingFigure: '最多可停放 4 辆旅游大巴', durationLabel: '规划到访行程', durationFigure: '建议预留约 1–4 小时',
      durationText: '到访时长取决于团体情况及所选活动。请联系我们，沟通您的行程可预留的时间。',
      draftNotice: '预览草稿：停车容量及到访时长需在正式上线前确认。',
      planningTitle: '将到访安排融入您的行程', planningText: '请告知希望到访的日期、抵达时间、预计人数及旅游大巴数量。我们的团队会与您沟通具体安排。',
      arrivalTitle: '抵达与旅游大巴停车', arrivalText: '提供旅游大巴免费停车。请在到访前联系我们，沟通抵达及停车安排。',
      processTitle: '团体预约流程', steps: ['提交预约申请', '与我们的团队沟通安排', '获得团队的明确预约确认', '按商定方式付款'],
      paymentTitle: '预约与付款', paymentText: '请提交团体预约申请。我们的团队将核实接待安排，并与您联系，商定详情后确认预约。您可以在到访当天支付现金，或致电我们安排银行卡付款。', paymentCta: '致电安排银行卡付款',
      photoAlt: 'Phuket Shooters 的咖啡厅和访客休息区',
      requestTitle: '团体预约申请', requestDescription: '预览向 Phuket Shooters 提交团体预约申请的流程。此原型不会发送信息或完成预约。',
      requestIntro: '体验团体预约申请表。这只是原型：所填信息不会发送或保存，也不会预留时段或确认预约。',
      back: '返回旅行社与团体信息页', demoNotice: '仅供原型演示——此表格不会发送申请或完成预约。',
      fields: { company: '公司或机构', name: '联系人姓名', email: '电子邮箱', phone: '电话号码', date: '希望到访的日期', time: '预计抵达时间', visitors: '到访人数', coaches: '旅游大巴数量', activities: '感兴趣的活动或套餐', questions: '问题或其他需求' },
      optional: '选填', timeHelp: '所有到访日期和时间均为普吉岛当地时间。', phoneHelp: '如需我们致电沟通安排，请填写电话号码。', notSure: '尚未确定',
      previewAction: '预览申请', previewTitle: '申请预览——未发送', previewText: '这只是演示。您的信息未被发送，未预留任何时段，也未完成预约。', editAction: '修改信息',
      dateSummary: '希望到访日期', timeSummary: '预计抵达时间（普吉岛时间）', visitorSummary: '到访人数', coachSummary: '旅游大巴数量',
      errors: { summary: '请检查标出的项目。', required: '请填写此项。', email: '请输入有效的电子邮箱地址。', date: '请按普吉岛当地时间选择今天或之后的到访日期。', visitors: '到访人数须为大于零的整数。', coaches: '旅游大巴数量须为零或正整数。' }
    }
  }
};

module.exports = { tourOperators };

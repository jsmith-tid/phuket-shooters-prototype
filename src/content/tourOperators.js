// Stakeholder copy for the group request flow.
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
      intro: 'Bring your group to Phuket Shooters. Planning a larger visit? Talk to our team about your numbers, arrival time and activities.',
      benefits: ['Free coach parking', 'Waiting area and refreshments', 'Group visits planned with our team'],
      requestCta: 'Make a group request', call: 'Call the team', directions: 'Get directions',
      parkingLabel: 'Coach parking', parkingFigure: 'Space for up to 4 coaches', durationLabel: 'Plan your visit', durationFigure: 'Allow approximately 1–4 hours',
      durationText: 'Visit length depends on your group and chosen activities. Contact us to discuss the time available in your itinerary.',
      planningTitle: 'Fit a visit into your itinerary', planningText: 'Tell us your preferred date, arrival time, approximate number of visitors and number of coaches. Our team can discuss the arrangements with you.',
      arrivalTitle: 'Arrival & coach parking', arrivalText: 'Contact us before your visit to discuss coach arrival and parking arrangements.',
      processTitle: 'How group bookings work', steps: ['Send a booking request', 'Discuss arrangements with our team', 'Receive explicit booking confirmation', 'Pay using the agreed arrangement'],
      paymentTitle: 'Booking & payment', paymentText: 'Send a group booking request. Our team will check availability and contact you to agree the arrangements and confirm your booking. You can pay cash on the day, or call us to arrange payment by card.', paymentCta: 'Call to arrange card payment',
      photoAlt: 'Front exterior and parking area of Phuket Shooters Shooting Range',
      requestTitle: 'Group booking request', requestDescription: 'Plan a group visit to Phuket Shooters and review your preferred date, arrival time and group size.',
      requestIntro: 'Tell us your preferred date, arrival time and group size. You can review the details before contacting our team.',
      back: 'Back to tour operator information',
      fields: { company: 'Company or organisation', name: 'Contact name', email: 'Email address', phone: 'Phone number', date: 'Preferred visit date', time: 'Approximate arrival time', visitors: 'Number of visitors', coaches: 'Number of coaches', activities: 'Activities or packages of interest', questions: 'Questions or requirements' },
      optional: 'Optional', timeHelp: 'All visit dates and times are local to Phuket.', phoneHelp: 'Add a phone number if you would like us to call about the arrangements.', notSure: 'Not sure yet',
      previewAction: 'Preview request', previewTitle: 'Request preview', previewText: 'No request has been sent, and no time has been reserved. Contact our team to discuss arrangements.', editAction: 'Edit details',
      sendIntro: 'Tell us your preferred date, arrival time and group size. Send your request and our team will discuss the arrangements with you.', sendAction: 'Send group request', sending: 'Sending request…', receivedTitle: 'Group request received', receivedText: 'We received your request and emailed a copy to the address below. No visit or coach parking has been reserved; our team will contact you to discuss arrangements.', partial: 'Only one email was accepted. Please retry; no booking has been confirmed.', failed: 'The request could not be sent. Please try again or contact the team directly.', changed: 'The details changed. Please send the request again.', outdated: 'The server is out of date. Emails may already have been sent; check your inbox before retrying.',
      dateSummary: 'Preferred date', timeSummary: 'Approximate arrival (Phuket time)', visitorSummary: 'Visitors', coachSummary: 'Coaches',
      errors: { summary: 'Please check the highlighted fields.', required: 'Please complete this field.', email: 'Enter a valid email address.', date: 'Choose today or a future visit date in Phuket local time.', visitors: 'Enter a whole number of visitors greater than zero.', coaches: 'Enter zero or a positive whole number of coaches.' }
    },
    th: {
      title: 'ผู้ประกอบการทัวร์และกรุ๊ปรถโค้ช', description: 'วางแผนพากรุ๊ปมาเยือน Phuket Shooters พร้อมข้อมูลที่จอดรถโค้ช ระยะเวลาเข้าชม การสอบถาม และการชำระเงิน',
      intro: 'พากรุ๊ปของคุณมาเยือน Phuket Shooters หากวางแผนพากรุ๊ปขนาดใหญ่ โปรดติดต่อทีมงานเพื่อพูดคุยเรื่องจำนวนผู้เข้าร่วม เวลาที่จะมาถึง และกิจกรรมที่สนใจ',
      benefits: ['ที่จอดรถโค้ชฟรี', 'พื้นที่พักคอยและเครื่องดื่ม', 'วางแผนการเข้าชมแบบกรุ๊ปร่วมกับทีมงาน'],
      requestCta: 'กรอกคำขอจองแบบกรุ๊ป', call: 'โทรหาทีมงาน', directions: 'ดูเส้นทาง',
      parkingLabel: 'ที่จอดรถโค้ช', parkingFigure: 'รองรับรถโค้ชได้สูงสุด 4 คัน', durationLabel: 'วางแผนการเข้าชม', durationFigure: 'เผื่อเวลาประมาณ 1–4 ชั่วโมง',
      durationText: 'ระยะเวลาขึ้นอยู่กับกรุ๊ปและกิจกรรมที่เลือก ติดต่อเราเพื่อพูดคุยเกี่ยวกับเวลาที่มีในแผนการเดินทางของคุณ',
      planningTitle: 'จัดเวลาเข้าชมให้เข้ากับแผนการเดินทาง', planningText: 'แจ้งวันที่ต้องการเข้าชม เวลาที่จะมาถึง จำนวนผู้เข้าร่วมโดยประมาณ และจำนวนรถโค้ช เพื่อให้ทีมงานพูดคุยเรื่องการจัดกรุ๊ปกับคุณ',
      arrivalTitle: 'การเดินทางมาถึงและที่จอดรถโค้ช', arrivalText: 'กรุณาติดต่อเราก่อนเข้าชมเพื่อพูดคุยเรื่องการเดินทางมาถึงและการจอดรถโค้ช',
      processTitle: 'ขั้นตอนการจองแบบกรุ๊ป', steps: ['ส่งคำขอจอง', 'พูดคุยรายละเอียดกับทีมงาน', 'รับการยืนยันการจองจากทีมงาน', 'ชำระเงินตามที่ตกลงไว้'],
      paymentTitle: 'การจองและการชำระเงิน', paymentText: 'ส่งคำขอจองแบบกรุ๊ป ทีมงานจะตรวจสอบความพร้อมและติดต่อคุณเพื่อตกลงรายละเอียดและยืนยันการจอง คุณสามารถชำระเป็นเงินสดในวันเข้าชม หรือโทรหาเราเพื่อจัดการชำระเงินด้วยบัตร', paymentCta: 'โทรเพื่อชำระเงินด้วยบัตร',
      photoAlt: 'ด้านหน้าอาคารและพื้นที่จอดรถของ Phuket Shooters Shooting Range',
      requestTitle: 'คำขอจองแบบกรุ๊ป', requestDescription: 'วางแผนการเยี่ยมชมแบบกรุ๊ปที่ Phuket Shooters พร้อมตรวจสอบวันที่ เวลาเดินทางมาถึง และจำนวนผู้เข้าร่วม',
      requestIntro: 'แจ้งวันที่ เวลาเดินทางมาถึง และจำนวนผู้เข้าร่วมที่ต้องการ คุณสามารถตรวจสอบรายละเอียดก่อนติดต่อทีมงาน',
      back: 'กลับไปยังข้อมูลสำหรับผู้ประกอบการทัวร์',
      fields: { company: 'บริษัทหรือองค์กร', name: 'ชื่อผู้ติดต่อ', email: 'อีเมล', phone: 'หมายเลขโทรศัพท์', date: 'วันที่ต้องการเข้าชม', time: 'เวลาที่คาดว่าจะมาถึง', visitors: 'จำนวนผู้เข้าร่วม', coaches: 'จำนวนรถโค้ช', activities: 'กิจกรรมหรือแพ็กเกจที่สนใจ', questions: 'คำถามหรือความต้องการเพิ่มเติม' },
      optional: 'ไม่บังคับ', timeHelp: 'วันที่และเวลาเข้าชมทั้งหมดเป็นเวลาท้องถิ่นภูเก็ต', phoneHelp: 'หากต้องการให้เราโทรพูดคุยรายละเอียด กรุณาระบุหมายเลขโทรศัพท์', notSure: 'ยังไม่แน่ใจ',
      previewAction: 'ดูตัวอย่างคำขอ', previewTitle: 'ตรวจสอบคำขอ', previewText: 'ยังไม่ได้ส่งคำขอหรือสำรองเวลา โปรดติดต่อทีมงานเพื่อพูดคุยรายละเอียด', editAction: 'แก้ไขรายละเอียด',
      sendIntro: 'แจ้งวันที่ เวลาเดินทางมาถึง และจำนวนผู้เข้าร่วมที่ต้องการ ส่งคำขอแล้วทีมงานจะติดต่อเพื่อพูดคุยรายละเอียด', sendAction: 'ส่งคำขอสำหรับกรุ๊ป', sending: 'กำลังส่งคำขอ…', receivedTitle: 'ได้รับคำขอสำหรับกรุ๊ปแล้ว', receivedText: 'เราได้รับคำขอและส่งสำเนาไปยังอีเมลด้านล่างแล้ว ยังไม่มีการสำรองเวลาเข้าชมหรือที่จอดรถโค้ช ทีมงานจะติดต่อเพื่อพูดคุยรายละเอียด', partial: 'ระบบรับอีเมลเพียงฉบับเดียว โปรดลองอีกครั้ง ยังไม่มีการยืนยันการจอง', failed: 'ไม่สามารถส่งคำขอได้ โปรดลองอีกครั้งหรือติดต่อทีมงานโดยตรง', changed: 'รายละเอียดมีการเปลี่ยนแปลง โปรดส่งคำขออีกครั้ง', outdated: 'เซิร์ฟเวอร์ยังเป็นเวอร์ชันเก่า อีเมลอาจถูกส่งแล้ว โปรดตรวจสอบอีเมลก่อนลองอีกครั้ง',
      dateSummary: 'วันที่ต้องการเข้าชม', timeSummary: 'เวลาที่คาดว่าจะมาถึง (เวลาภูเก็ต)', visitorSummary: 'จำนวนผู้เข้าร่วม', coachSummary: 'จำนวนรถโค้ช',
      errors: { summary: 'กรุณาตรวจสอบช่องข้อมูลที่ระบุ', required: 'กรุณากรอกข้อมูลในช่องนี้', email: 'กรุณากรอกอีเมลให้ถูกต้อง', date: 'กรุณาเลือกวันเข้าชมเป็นวันนี้หรือวันถัดไปตามเวลาท้องถิ่นภูเก็ต', visitors: 'กรุณาระบุจำนวนผู้เข้าร่วมเป็นจำนวนเต็มมากกว่าศูนย์', coaches: 'กรุณาระบุจำนวนรถโค้ชเป็นศูนย์หรือจำนวนเต็มบวก' }
    },
    zh: {
      title: '旅行社与旅游大巴团体', description: '计划组团前往 Phuket Shooters，了解旅游大巴停车、游玩时长、咨询及付款信息。',
      intro: '带团前往 Phuket Shooters。计划带较大的团体来访？请与我们的团队沟通人数、抵达时间和活动安排。',
      benefits: ['旅游大巴免费停车', '等候区与饮品', '与团队共同规划团体到访'],
      requestCta: '填写团体预约申请', call: '致电团队', directions: '查看路线',
      parkingLabel: '旅游大巴停车', parkingFigure: '最多可停放 4 辆旅游大巴', durationLabel: '规划到访行程', durationFigure: '建议预留约 1–4 小时',
      durationText: '到访时长取决于团体情况及所选活动。请联系我们，沟通您的行程可预留的时间。',
      planningTitle: '将到访安排融入您的行程', planningText: '请告知希望到访的日期、抵达时间、预计人数及旅游大巴数量。我们的团队会与您沟通具体安排。',
      arrivalTitle: '抵达与旅游大巴停车', arrivalText: '请在到访前联系我们，沟通旅游大巴抵达及停车安排。',
      processTitle: '团体预约流程', steps: ['提交预约申请', '与我们的团队沟通安排', '获得团队的明确预约确认', '按商定方式付款'],
      paymentTitle: '预约与付款', paymentText: '请提交团体预约申请。我们的团队将核实接待安排，并与您联系，商定详情后确认预约。您可以在到访当天支付现金，或致电我们安排银行卡付款。', paymentCta: '致电安排银行卡付款',
      photoAlt: 'Phuket Shooters Shooting Range 的建筑正面与停车区域',
      requestTitle: '团体预约申请', requestDescription: '规划 Phuket Shooters 团体到访，核对希望到访的日期、抵达时间和人数。',
      requestIntro: '填写希望到访的日期、抵达时间和人数。您可以在联系团队前核对详情。',
      back: '返回旅行社与团体信息页',
      fields: { company: '公司或机构', name: '联系人姓名', email: '电子邮箱', phone: '电话号码', date: '希望到访的日期', time: '预计抵达时间', visitors: '到访人数', coaches: '旅游大巴数量', activities: '感兴趣的活动或套餐', questions: '问题或其他需求' },
      optional: '选填', timeHelp: '所有到访日期和时间均为普吉岛当地时间。', phoneHelp: '如需我们致电沟通安排，请填写电话号码。', notSure: '尚未确定',
      previewAction: '预览申请', previewTitle: '核对申请', previewText: '申请尚未发送，也未预留时段。请联系团队商讨具体安排。', editAction: '修改信息',
      sendIntro: '请填写希望到访的日期、抵达时间和人数。提交申请后，我们的团队会与您沟通具体安排。', sendAction: '发送团体申请', sending: '正在发送申请…', receivedTitle: '已收到团体申请', receivedText: '我们已收到申请，并将副本发送至下方邮箱。目前尚未预留到访时段或旅游大巴停车位；团队会与您联系商讨安排。', partial: '邮件服务只接受了一封邮件。请重试；预约尚未确认。', failed: '申请未能发送。请重试或直接联系团队。', changed: '申请内容已更改，请重新发送。', outdated: '服务器仍在运行旧版本。邮件可能已发出。请先检查邮箱，再重试。',
      dateSummary: '希望到访日期', timeSummary: '预计抵达时间（普吉岛时间）', visitorSummary: '到访人数', coachSummary: '旅游大巴数量',
      errors: { summary: '请检查标出的项目。', required: '请填写此项。', email: '请输入有效的电子邮箱地址。', date: '请按普吉岛当地时间选择今天或之后的到访日期。', visitors: '到访人数须为大于零的整数。', coaches: '旅游大巴数量须为零或正整数。' }
    }
  }
};

module.exports = { tourOperators };

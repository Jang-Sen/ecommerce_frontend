const socialMenus = [
  {
    id: 1,
    name: 'google',
    image: '/images/web_light_sq_SU@2x.png',
  },
  {
    id: 2,
    name: 'naver',
    image: '/images/btnG_축약형.png',
  },
  {
    id: 3,
    name: 'kakao',
    image: '/images/kakao_login_large.png',
  },
];

// 체크박스 항목 데이터
const agreementItems = [
  { key: 'overFourteen', label: '만 14세 이상 (필수)' },
  { key: 'agreeOfTerm', label: '이용약관 (필수)' },
  { key: 'agreeOfPersonalInfo', label: '개인정보 수집 및 이용 동의 (필수)' },
  { key: 'agreeOfMarketing', label: '개인정보 마케팅 활용 동의 (선택)' },
  {
    key: 'agreeOfEvent',
    label: '이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신 (선택)',
  },
];

export { socialMenus, agreementItems };

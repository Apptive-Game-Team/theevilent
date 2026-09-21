// Privacy policy text. Every claim here is checked against what the services
// actually do:
//   - account server `member` table: email, name (nickname), BCrypt password hash
//   - game database `users` / `statistic_games` / `user_*`: rating and progress
//   - one auth cookie, `accessToken`, set by account PageController
//   - guest sign-up generates its own email, password and nickname, so a guest
//     hands over nothing
//   - no third party analytics, ads or crash reporting: every service in
//     UnityConnectSettings.asset is disabled
// Change this file when those change, not the other way round.

import {
  legalContact,
  type LegalDocumentContent,
  type LegalLanguage,
} from './legalDocument';

const korean: LegalDocumentContent = {
  title: '개인정보처리방침',
  effectiveLabel: '시행일',
  effectiveDate: '2026년 9월 21일',
  intro: [
    'The Evil Ent(이하 "팀")는 Arcane Casters(이하 "게임")와 이 웹사이트를 운영합니다. 이 방침은 팀이 어떤 정보를 수집하고, 무엇에 쓰고, 어디에 두고, 언제 지우는지를 설명합니다.',
    '팀은 실명, 생년월일, 전화번호, 주소, 결제 정보, 위치 정보를 수집하지 않습니다. 게임에 텍스트 채팅이 없어서, 이용자가 직접 입력해 다른 사람에게 보이는 정보는 닉네임 하나뿐입니다.',
  ],
  sections: [
    {
      heading: '1. 수집하는 개인정보',
      table: {
        head: ['구분', '항목', '수집 시점'],
        rows: [
          ['계정 가입', '이메일 주소, 닉네임, 비밀번호', '이용자가 가입할 때 직접 입력'],
          ['게스트 플레이', '없음', '팀이 임의의 식별자와 닉네임을 자동으로 만들어 씁니다'],
          ['게임 진행', '레이팅, 총 승수, 대전 기록(승패·경기 시간·일시), 보유 마법과 덱 구성, 퀘스트 진행도', '게임을 플레이하는 동안 자동 기록'],
          ['접속 기록', 'IP 주소, 접속 일시, 요청 경로', '서버에 접속할 때 자동 생성'],
        ],
      },
      notes: [
        '게스트로 시작하면 이용자가 넘기는 정보가 하나도 없습니다. 팀이 무작위 식별자와 임의의 닉네임을 만들어 계정을 대신 열어 줍니다. 나중에 이메일과 비밀번호를 등록해 정식 계정으로 바꿀 때 비로소 그 두 가지를 수집합니다.',
      ],
    },
    {
      heading: '2. 이용 목적',
      bullets: [
        '계정을 만들고 로그인 상태를 확인하기 위해',
        '대전 상대를 찾고 레이팅을 계산하기 위해',
        '게임 진행 상황을 저장하고 다시 불러오기 위해',
        '장애에 대응하고, 부정한 이용을 확인하고, 게임을 고치기 위해',
      ],
      notes: [
        '유럽 경제 지역과 영국 이용자에 대한 처리의 법적 근거는 계약의 이행(GDPR 제6조 제1항 (b))입니다. 보안과 장애 대응은 정당한 이익(같은 항 (f))에 해당합니다.',
      ],
    },
    {
      heading: '3. 보유 기간',
      bullets: [
        '계정 정보와 게임 진행 정보: 계정이 남아 있는 동안 보관하고, 계정을 삭제하면 함께 지웁니다.',
        '접속 기록: 생성일로부터 3개월이 지나면 지웁니다.',
        '전체 대전 통계에 쓰는 집계값은 개인을 알아볼 수 없는 형태로 남습니다.',
      ],
    },
    {
      heading: '4. 제3자 제공',
      paragraphs: [
        '팀은 이용자의 개인정보를 팔지 않고, 다른 곳에 넘기지 않습니다. 법령에 따라 수사기관이 적법한 절차를 거쳐 요구하는 경우만 예외입니다.',
      ],
    },
    {
      heading: '5. 처리 위탁과 보관 위치',
      table: {
        head: ['수탁자', '맡긴 일', '위치'],
        rows: [
          ['Oracle Cloud Infrastructure', '서버와 데이터베이스 호스팅', '대한민국 춘천'],
        ],
      },
      notes: [
        '모든 개인정보는 대한민국에 있는 서버에 저장됩니다. 팀은 개인정보를 국외로 옮기지 않습니다. 대한민국 밖에서 게임을 하면 이용자의 정보가 대한민국으로 전송되어 처리됩니다.',
        '게임을 내려받는 Google Play와 itch.io는 팀의 수탁자가 아닙니다. 두 플랫폼은 각자의 개인정보처리방침에 따라 독립적으로 정보를 처리합니다. 무엇을 수집하는지는 각 플랫폼의 방침을 확인해 주세요.',
      ],
    },
    {
      heading: '6. 쿠키',
      paragraphs: [
        '웹 브라우저로 게임을 실행할 때 accessToken 쿠키 하나를 사용합니다. 로그인 상태를 유지하는 용도이고, 광고나 이용 행태 분석에는 쓰지 않습니다. 브라우저 설정에서 이 쿠키를 막으면 로그인이 유지되지 않습니다.',
        '팀은 광고 식별자를 쓰지 않으며, 제3자 분석 도구나 광고 SDK를 게임에 넣지 않았습니다.',
      ],
    },
    {
      heading: '7. 이용자의 권리',
      bullets: [
        '열람: 게임의 설정 화면에서 내 계정 정보를 볼 수 있습니다.',
        '정정: 닉네임과 계정 정보를 게임 안에서 바꿀 수 있습니다.',
        '삭제: 게임의 설정 화면에서 계정을 삭제하면 계정 정보와 게임 진행 정보가 함께 지워집니다.',
        '이 방법으로 처리하기 어려운 요청은 아래 연락처로 보내 주세요. 받은 날로부터 30일 안에 답변합니다.',
      ],
      notes: [
        '유럽 경제 지역과 영국 이용자는 처리 제한, 처리 반대, 데이터 이동을 추가로 요구할 수 있고, 각국 감독 기관에 민원을 낼 수 있습니다.',
      ],
    },
    {
      heading: '8. 안전성 확보 조치',
      bullets: [
        '비밀번호는 BCrypt로 해시해 저장하고 원문을 남기지 않습니다. 팀도 이용자의 비밀번호를 알 수 없습니다.',
        '게임과 서버 사이의 통신은 암호화된 연결을 씁니다.',
        '데이터베이스 접근 권한은 운영에 필요한 최소 인원에게만 줍니다.',
      ],
    },
    {
      heading: '9. 만 14세 미만 아동',
      paragraphs: [
        '이 게임은 만 14세 미만 아동을 대상으로 하지 않고, 팀은 만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다. 그런 정보가 수집된 것을 알게 되면 지체 없이 지웁니다. 보호자께서 이런 사실을 발견하시면 아래 연락처로 알려 주세요.',
      ],
    },
    {
      heading: '10. 문의처',
      paragraphs: [
        `개인정보 보호 책임자: yunseong (${legalContact})`,
        '개인정보 처리에 관한 질문, 열람이나 삭제 요청, 침해 신고를 이 주소로 보내 주세요.',
      ],
    },
    {
      heading: '11. 방침 변경',
      paragraphs: [
        '이 방침을 고칠 때는 바뀐 내용과 시행일을 이 페이지에 먼저 올립니다. 이용자에게 불리한 변경은 시행일로부터 최소 30일 전에 알립니다.',
      ],
    },
  ],
};

const english: LegalDocumentContent = {
  title: 'Privacy Policy',
  effectiveLabel: 'Effective',
  effectiveDate: '21 September 2026',
  intro: [
    'The Evil Ent ("we") operates Arcane Casters ("the game") and this website. This policy explains what we collect, what we use it for, where we keep it, and when we delete it.',
    'We do not collect legal names, dates of birth, phone numbers, addresses, payment details, or location data. The game has no text chat, so the only thing you type that other players see is your nickname.',
  ],
  sections: [
    {
      heading: '1. What we collect',
      table: {
        head: ['Category', 'Data', 'When'],
        rows: [
          ['Account sign-up', 'Email address, nickname, password', 'Entered by you when you register'],
          ['Guest play', 'Nothing', 'We generate a random identifier and nickname for you'],
          ['Game progress', 'Rating, total wins, match records (result, duration, timestamp), owned magics and deck contents, quest progress', 'Recorded automatically as you play'],
          ['Access logs', 'IP address, timestamp, requested path', 'Generated automatically when you reach our servers'],
        ],
      },
      notes: [
        'Starting as a guest hands us nothing. We generate a random identifier and a random nickname and open the account for you. We only collect an email address and password later, if you convert the guest account into a full one.',
      ],
    },
    {
      heading: '2. Why we use it',
      bullets: [
        'To create your account and keep you signed in',
        'To find you an opponent and calculate your rating',
        'To save and restore your game progress',
        'To respond to outages, investigate abuse, and fix the game',
      ],
      notes: [
        'For users in the European Economic Area and the United Kingdom, our lawful basis is performance of a contract (GDPR Article 6(1)(b)). Security and outage response rest on legitimate interests (Article 6(1)(f)).',
      ],
    },
    {
      heading: '3. How long we keep it',
      bullets: [
        'Account and game progress data: kept while the account exists, deleted when you delete the account.',
        'Access logs: deleted three months after they are written.',
        'Aggregate figures used for game-wide statistics remain in a form that cannot identify you.',
      ],
    },
    {
      heading: '4. Sharing with others',
      paragraphs: [
        'We do not sell your personal data and we do not pass it to anyone else. The only exception is a lawful request from a law enforcement authority following due process.',
      ],
    },
    {
      heading: '5. Processors and where data lives',
      table: {
        head: ['Processor', 'What they do', 'Location'],
        rows: [
          ['Oracle Cloud Infrastructure', 'Hosts our servers and database', 'Chuncheon, South Korea'],
        ],
      },
      notes: [
        'All personal data is stored on servers in South Korea. We do not transfer it out of the country. If you play from outside South Korea, your data travels to South Korea to be processed there.',
        'Google Play and itch.io, where you download the game, are not our processors. They handle data independently under their own privacy policies. Check those policies for what each platform collects.',
      ],
    },
    {
      heading: '6. Cookies',
      paragraphs: [
        'When you play in a web browser we set one cookie, accessToken. It keeps you signed in. We do not use it for advertising or behavioural analytics. If you block it in your browser settings, you will not stay signed in.',
        'We do not use advertising identifiers, and the game contains no third-party analytics or advertising SDKs.',
      ],
    },
    {
      heading: '7. Your rights',
      bullets: [
        'Access: view your account details on the settings screen in the game.',
        'Correction: change your nickname and account details inside the game.',
        'Deletion: delete your account on the settings screen, which removes your account details and game progress together.',
        'For anything those options do not cover, write to the address below. We reply within 30 days of receiving your request.',
      ],
      notes: [
        'Users in the European Economic Area and the United Kingdom may additionally request restriction of processing, object to processing, and ask for data portability, and may lodge a complaint with their national supervisory authority.',
      ],
    },
    {
      heading: '8. How we protect it',
      bullets: [
        'Passwords are stored as BCrypt hashes. We keep no plaintext copy, so we cannot read your password either.',
        'Traffic between the game and our servers uses an encrypted connection.',
        'Database access is limited to the smallest number of people needed to run the service.',
      ],
    },
    {
      heading: '9. Children under 14',
      paragraphs: [
        'The game is not directed at children under 14, and we do not knowingly collect personal data from them. If we learn that we hold such data, we delete it without delay. If you are a parent or guardian and believe this has happened, please write to the address below.',
      ],
    },
    {
      heading: '10. Contact',
      paragraphs: [
        `Privacy contact: yunseong (${legalContact})`,
        'Send questions about how we handle data, access or deletion requests, and reports of misuse to this address.',
      ],
    },
    {
      heading: '11. Changes to this policy',
      paragraphs: [
        'When we change this policy we publish the new text and its effective date on this page first. We give at least 30 days notice before any change that disadvantages users takes effect.',
      ],
    },
  ],
};

export const privacyDocuments: Record<LegalLanguage, LegalDocumentContent> = {
  ko: korean,
  en: english,
};

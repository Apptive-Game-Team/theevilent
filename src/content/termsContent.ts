// Terms of service. The clauses that are specific to this game come from code,
// not from a template:
//   - guest accounts vanish when the app closes: GuestContext.GuestPassword is
//     a static field with no persistence, and joinGuest returns the generated
//     password exactly once
//   - opponents can be bots: 45 rows in bot_personas, and UserService falls
//     back to a bot when a queued player cannot be paired
//   - nothing costs money: there is no billing, purchase or IAP code anywhere
//     in the client or the lobby, so there are no refund clauses
//   - the only free text a player types is a nickname: the game has no chat
//   - one server region and a two-person team, so no uptime is promised
// Check those before loosening or tightening a clause.

import {
  legalContact,
  type LegalDocumentContent,
  type LegalLanguage,
} from './legalDocument';

const korean: LegalDocumentContent = {
  title: '이용약관',
  effectiveLabel: '시행일',
  effectiveDate: '2026년 9월 21일',
  intro: [
    '이 약관은 The Evil Ent(이하 "팀")가 제공하는 Arcane Casters(이하 "게임")와 이 웹사이트를 이용할 때 적용됩니다. 게임을 실행하거나 계정을 만들면 이 약관에 동의한 것으로 봅니다.',
    '팀은 개발자 2명으로 이루어진 인디 게임 팀입니다. 약관을 짧게 쓸 수 있는 이유는 게임에 유료 상품이 없고 텍스트 채팅이 없기 때문입니다. 읽기 쉽게 쓰려고 했으니, 이해되지 않는 조항이 있으면 아래 문의처로 물어봐 주세요.',
  ],
  sections: [
    {
      heading: '1. 계정',
      bullets: [
        '정식 계정은 이메일 주소, 비밀번호, 닉네임으로 만듭니다.',
        '계정은 한 사람의 것입니다. 다른 사람에게 넘기거나 팔 수 없고, 다른 사람의 계정으로 접속할 수 없습니다.',
        '만 14세 미만은 계정을 만들 수 없습니다.',
        '비밀번호 관리는 이용자의 몫입니다. 팀은 비밀번호를 해시로만 보관하므로 원문을 알려드릴 수 없습니다.',
      ],
    },
    {
      heading: '2. 게스트 계정은 앱을 닫으면 사라집니다',
      paragraphs: [
        '게스트로 시작하면 서버가 임시 계정을 만들어 줍니다. 이 계정의 비밀번호는 만들어질 때 한 번만 전달되고 기기에 저장되지 않습니다. 그래서 게임을 종료하면 그 계정으로 다시 들어올 수 없습니다.',
        '진행도를 남기려면 게임의 설정 화면에서 이메일과 비밀번호를 등록해 정식 계정으로 바꿔 주세요. 바꾸기 전에 잃은 게스트 계정은 팀도 되찾아 드릴 수 없습니다.',
      ],
    },
    {
      heading: '3. 닉네임',
      paragraphs: [
        '게임에 텍스트 채팅이 없어서, 이용자가 입력해 다른 사람에게 보이는 문구는 닉네임 하나뿐입니다.',
      ],
      bullets: [
        '다른 사람이나 팀을 사칭하는 이름은 쓸 수 없습니다.',
        '욕설, 차별 표현, 성적인 표현, 광고를 담은 이름은 쓸 수 없습니다.',
        '이런 닉네임을 발견하면 팀이 바꾸거나 계정의 이용을 멈출 수 있습니다.',
      ],
    },
    {
      heading: '4. 대전과 상대',
      bullets: [
        '대전 상대가 사람이 아니라 게임이 조종하는 상대일 수 있습니다. 대기열에서 사람을 찾지 못하면 게임이 준비된 상대를 붙여 줍니다.',
        '레이팅은 대전 결과로 계산합니다. 밸런스를 고치거나 잘못된 기록을 바로잡기 위해 팀이 레이팅을 조정할 수 있습니다.',
        '접속이 끊긴 대전은 패배로 처리될 수 있습니다.',
      ],
    },
    {
      heading: '5. 하면 안 되는 일',
      bullets: [
        '게임 클라이언트를 고치거나, 메모리를 바꾸거나, 자동으로 플레이하는 도구를 쓰는 일',
        '서버에 정상적인 플레이로 볼 수 없는 요청을 보내거나, 다른 이용자의 플레이를 방해하는 일',
        '계정을 사고팔거나 빌려주는 일',
        '게임이나 서버를 역공학하거나, 취약점을 찾아 악용하는 일',
      ],
      notes: [
        '이런 행위를 확인하면 팀은 사전 통보 없이 계정의 이용을 멈추거나 삭제할 수 있습니다. 보안 취약점을 발견하셨다면 악용하지 마시고 아래 문의처로 알려 주세요.',
      ],
    },
    {
      heading: '6. 요금',
      paragraphs: [
        '게임은 무료입니다. 유료 상품, 유료 재화, 인앱 결제가 하나도 없습니다. 그래서 이 약관에는 환불이나 청약철회 조항이 없습니다.',
        '앞으로 유료 요소를 넣게 되면 시행 전에 이 약관을 고치고 아래 14항에 적은 방법으로 알립니다.',
      ],
    },
    {
      heading: '7. 게임 안의 자산',
      paragraphs: [
        '게임 안의 마법, 덱, 장식, 퀘스트 진행도, 레이팅은 팀이 운영하는 서버의 데이터이지 이용자의 재산이 아닙니다. 현금 가치가 없고, 서비스 밖에서 사고팔 수 없습니다.',
        '팀은 밸런스를 고치기 위해 이 데이터의 수치나 구성을 바꿀 수 있습니다.',
      ],
    },
    {
      heading: '8. 서비스의 가용성과 변경',
      bullets: [
        '팀은 가동률을 약속하지 않습니다. 개발자 2명이 서버 한 곳으로 운영하기 때문입니다.',
        '점검, 장애, 개편으로 접속이 끊기거나 게임을 할 수 없는 시간이 생길 수 있습니다.',
        '팀은 게임의 내용, 규칙, 밸런스를 바꿀 수 있습니다.',
        '서비스를 끝낼 때는 최소 30일 전에 이 웹사이트와 게임 안에 알립니다.',
      ],
    },
    {
      heading: '9. 계정 삭제와 이용 종료',
      bullets: [
        '게임의 설정 화면에서 계정을 삭제할 수 있습니다. 삭제는 바로 처리되고 되돌릴 수 없습니다.',
        '계정을 삭제하면 계정 정보와 게임 진행 정보가 함께 지워집니다.',
        '이 약관을 어긴 경우 팀이 계정의 이용을 멈추거나 종료할 수 있습니다.',
      ],
    },
    {
      heading: '10. 지식재산권',
      paragraphs: [
        '게임과 이 웹사이트의 코드, 그림, 소리, 글은 팀 또는 정당한 권리자의 것입니다. 팀은 이용자에게 게임을 개인적으로 즐길 권리를 드리는 것이지, 이 저작물의 권리를 넘기지 않습니다.',
        '게임 화면을 녹화해 방송하거나 영상으로 만드는 것은 허용합니다. 광고 수익을 받아도 괜찮습니다. 다만 팀이 만든 것처럼 보이게 하거나, 게임 파일 자체를 재배포하는 것은 안 됩니다.',
      ],
    },
    {
      heading: '11. 개인정보',
      paragraphs: [
        '팀이 어떤 정보를 수집하고 어떻게 다루는지는 이 웹사이트의 개인정보처리방침(/privacy)에 적혀 있습니다. 게임을 이용하면 그 방침에 따른 처리에 동의하는 것이 됩니다.',
      ],
    },
    {
      heading: '12. 플랫폼 약관',
      paragraphs: [
        '게임을 Google Play에서 내려받거나 itch.io에서 실행하면 해당 플랫폼의 약관도 함께 적용됩니다. 플랫폼과 이용자 사이의 일은 팀이 정할 수 없습니다.',
      ],
    },
    {
      heading: '13. 보증의 부인과 책임의 한계',
      paragraphs: [
        '팀은 게임을 있는 그대로 제공합니다. 게임이 오류 없이 돌아가거나 특정 목적에 맞는다는 것을 보증하지 않습니다.',
        '법이 허용하는 범위에서, 팀은 게임 이용으로 생긴 간접 손해나 기대 이익의 상실에 책임지지 않습니다. 다만 팀의 고의나 중대한 과실로 생긴 손해, 그리고 소비자로서 법으로 보장된 권리는 이 조항으로 제한되지 않습니다.',
      ],
    },
    {
      heading: '14. 약관 변경',
      paragraphs: [
        '이 약관을 고칠 때는 바뀐 내용과 시행일을 이 페이지에 먼저 올립니다. 이용자에게 불리한 변경은 시행일로부터 최소 30일 전에 알립니다. 바뀐 약관에 동의하지 않으시면 계정을 삭제하고 이용을 멈추실 수 있습니다.',
      ],
    },
    {
      heading: '15. 준거법과 분쟁',
      paragraphs: [
        '이 약관은 대한민국 법을 따릅니다. 분쟁이 생기면 먼저 아래 문의처로 연락해 해결을 시도합니다. 소송으로 가는 경우의 관할은 대한민국 민사소송법이 정하는 법원으로 합니다.',
      ],
    },
    {
      heading: '16. 문의처',
      paragraphs: [
        `The Evil Ent · ${legalContact}`,
        '약관에 관한 질문, 계정 문제, 보안 취약점 신고를 이 주소로 보내 주세요.',
      ],
    },
  ],
};

const english: LegalDocumentContent = {
  title: 'Terms of Service',
  effectiveLabel: 'Effective',
  effectiveDate: '21 September 2026',
  intro: [
    'These terms apply when you use Arcane Casters ("the game") and this website, both operated by The Evil Ent ("we"). Launching the game or creating an account means you accept them.',
    'We are a two-person indie team. These terms are short because the game has nothing to buy and no chat. We have tried to write them plainly; if a clause is unclear, ask us at the address below.',
  ],
  sections: [
    {
      heading: '1. Accounts',
      bullets: [
        'A full account is created with an email address, a password and a nickname.',
        'An account belongs to one person. You may not transfer or sell it, and you may not sign in to someone else’s account.',
        'You must be at least 14 years old to create an account.',
        'Keeping your password safe is your responsibility. We store only a hash of it, so we cannot tell you what it was.',
      ],
    },
    {
      heading: '2. Guest accounts disappear when you close the app',
      paragraphs: [
        'Starting as a guest creates a temporary account on our server. Its password is handed to the app once, at creation, and is not saved on your device. Once you close the game, you cannot get back into that account.',
        'To keep your progress, open the settings screen in the game and register an email address and password to turn it into a full account. A guest account lost before that cannot be recovered, not even by us.',
      ],
    },
    {
      heading: '3. Nicknames',
      paragraphs: [
        'The game has no text chat, so your nickname is the only text you write that other players see.',
      ],
      bullets: [
        'Do not impersonate another person or our team.',
        'No abuse, discriminatory or sexual language, and no advertising.',
        'If we find such a nickname we may change it or suspend the account.',
      ],
    },
    {
      heading: '4. Matches and opponents',
      bullets: [
        'Your opponent may be computer-controlled rather than another player. When the queue cannot pair you with a person, the game supplies an opponent.',
        'Ratings are calculated from match results. We may adjust a rating to correct a balance change or a faulty record.',
        'A match you disconnect from may be recorded as a loss.',
      ],
    },
    {
      heading: '5. What you may not do',
      bullets: [
        'Modify the game client, alter its memory, or use tools that play for you',
        'Send our servers requests that no normal play would produce, or interfere with other players’ games',
        'Buy, sell or lend accounts',
        'Reverse engineer the game or our servers, or exploit a vulnerability you find',
      ],
      notes: [
        'If we find any of this, we may suspend or delete the account without prior notice. If you discover a security vulnerability, please do not exploit it — write to the address below instead.',
      ],
    },
    {
      heading: '6. Money',
      paragraphs: [
        'The game is free. There are no paid items, no paid currency, and no in-app purchases of any kind. That is why these terms carry no refund or cancellation clauses.',
        'If we ever add anything paid, we will change these terms and give notice under section 14 before it takes effect.',
      ],
    },
    {
      heading: '7. In-game items',
      paragraphs: [
        'Magics, decks, decorations, quest progress and ratings are data on servers we run. They are not your property, they have no cash value, and they cannot be traded outside the service.',
        'We may change their numbers or composition when we rebalance the game.',
      ],
    },
    {
      heading: '8. Availability and changes',
      bullets: [
        'We promise no uptime. Two developers run this on servers in one location.',
        'Maintenance, outages and reworks may interrupt play.',
        'We may change the game’s content, rules and balance.',
        'If we shut the service down, we will give at least 30 days notice on this website and in the game.',
      ],
    },
    {
      heading: '9. Deleting your account, and termination',
      bullets: [
        'You can delete your account on the settings screen in the game. Deletion happens immediately and cannot be undone.',
        'Deleting the account removes your account details and your game progress together.',
        'We may suspend or terminate an account that breaks these terms.',
      ],
    },
    {
      heading: '10. Intellectual property',
      paragraphs: [
        'The code, art, sound and text of the game and this website belong to us or to their rightful owners. We grant you the right to play the game personally; we do not transfer any rights in those works.',
        'You may record and stream the game, and you may earn advertising revenue from those videos. Do not present your work as ours, and do not redistribute the game files themselves.',
      ],
    },
    {
      heading: '11. Privacy',
      paragraphs: [
        'What we collect and how we handle it is set out in the privacy policy on this website (/privacy). Using the game means agreeing to the processing described there.',
      ],
    },
    {
      heading: '12. Platform terms',
      paragraphs: [
        'If you download the game from Google Play or play it on itch.io, that platform’s terms apply alongside ours. We have no say in matters between you and the platform.',
      ],
    },
    {
      heading: '13. No warranty, and limits on liability',
      paragraphs: [
        'We provide the game as it is. We do not warrant that it will run without faults or that it suits any particular purpose.',
        'To the extent the law allows, we are not liable for indirect losses or lost expected profits arising from your use of the game. This does not limit our liability for our own intent or gross negligence, nor any rights the law gives you as a consumer.',
      ],
    },
    {
      heading: '14. Changes to these terms',
      paragraphs: [
        'When we change these terms we publish the new text and its effective date on this page first. We give at least 30 days notice before any change that disadvantages users takes effect. If you do not accept the new terms, you may delete your account and stop using the service.',
      ],
    },
    {
      heading: '15. Governing law and disputes',
      paragraphs: [
        'These terms are governed by the law of the Republic of Korea. If a dispute arises, write to us first at the address below so we can try to settle it. Where a case goes to court, jurisdiction lies with the court determined under the Korean Civil Procedure Act.',
      ],
    },
    {
      heading: '16. Contact',
      paragraphs: [
        `The Evil Ent · ${legalContact}`,
        'Send questions about these terms, account problems, and security vulnerability reports to this address.',
      ],
    },
  ],
};

export const termsDocuments: Record<LegalLanguage, LegalDocumentContent> = {
  ko: korean,
  en: english,
};

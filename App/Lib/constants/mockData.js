const user = {
  id: '1111',
  name: 'Storm Spirit',
  address: 'Kansas City, USA',
  tapes: 50,
  invitedFriends: 1,
  profileImage: 'https://i.imgur.com/yAtIZqC.jpg'
};

const players = [
  {
    id: '1111',
    name: 'Storm Spirit',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/yAtIZqC.jpg'
  },

  {
    id: '1112',
    name: 'Goblin Techies',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/D1I4fqC.jpg'
  },

  {
    id: '1113',
    name: 'Invoker',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/yKDUXbl.jpg'
  },

  {
    id: '1114',
    name: 'Abaddon',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/6qJGzxO.jpg'
  },

  {
    id: '1115',
    name: 'Tinker',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/Q9MbYGu.jpg'
  }
];

const playersInGame = [
  {
    id: '1111',
    name: 'Storm Spirit',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/yAtIZqC.jpg',
    joined: true
  },

  {
    id: '1112',
    name: 'Goblin Techies',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/D1I4fqC.jpg',
    joined: true
  },

  {
    id: '1113',
    name: 'Invoker',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/yKDUXbl.jpg',
    joined: true
  },

  {
    id: '1114',
    name: 'Abaddon',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/6qJGzxO.jpg',
    joined: false
  },

  {
    id: '1115',
    name: 'Tinker',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/Q9MbYGu.jpg',
    joined: false
  }
];

const scenario =
  'If Aliens came to earth and vowed to destroy the planet, unless someone played them the most epic love song of all time, what would you play ?';

const songs = [
  {
    title: 'When a Man Loves a Woman',
    singer: 'Michael Bolton'
  }
];

export default { user, players, playersInGame, scenario, songs };

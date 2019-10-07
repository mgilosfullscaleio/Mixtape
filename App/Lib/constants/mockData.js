const user = {
  id: '1111',
  name: 'Storm Spirit',
  email: 'stormspirit@dota2.com',
  address: 'Kansas City, USA',
  tapes: 50,
  invitedFriends: 1,
  profileImage: 'https://i.imgur.com/yAtIZqC.jpg'
};

const players = [
  {
    id: '1111',
    name: 'Storm Spirit',
    email: 'stormspirit@dota2.com',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/yAtIZqC.jpg'
  },

  {
    id: '1112',
    name: 'Goblin Techies',
    email: 'techies@dota2.com',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/D1I4fqC.jpg'
  },

  {
    id: '1113',
    name: 'Invoker',
    email: 'injoker@dota2.com',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/yKDUXbl.jpg'
  },

  {
    id: '1114',
    name: 'Abaddon',
    email: 'abaddon@dota2.com',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/6qJGzxO.jpg'
  },

  {
    id: '1115',
    name: 'Tinker',
    email: 'tinker@dota2.com',
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
    joined: true,
    score: 5
  },

  {
    id: '1112',
    name: 'Goblin Techies',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/D1I4fqC.jpg',
    joined: true,
    score: 3
  },

  {
    id: '1113',
    name: 'Invoker',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/yKDUXbl.jpg',
    joined: true,
    score: 0
  },

  {
    id: '1114',
    name: 'Abaddon',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/6qJGzxO.jpg',
    joined: false,
    score: 0
  },

  {
    id: '1115',
    name: 'Tinker',
    address: 'Kansas City, USA',
    tapes: 50,
    profileImage: 'https://i.imgur.com/Q9MbYGu.jpg',
    joined: false,
    score: 0
  }
];

const contacts = [
  {
    title: 'A',
    data: [
      {
        id: '2111',
        name: 'Abaddon',
        number: '+639123456789'
      },
      {
        id: '2112',
        name: 'Anti Mage',
        number: '+639123456789'
      }
    ]
  },

  {
    title: 'B',
    data: [
      {
        id: '2113',
        name: 'Batrider',
        number: '+639123456789'
      },
      {
        id: '2114',
        name: 'Beastmaster',
        number: '+639123456789'
      },
      {
        id: '2115',
        name: 'Bloodseeker',
        number: '+639123456789'
      },
      {
        id: '2116',
        name: 'Bounty Hunter',
        number: '+639123456789'
      }
    ]
  },

  {
    title: 'C',
    data: [
      {
        id: '2117',
        name: 'Centaur Warrunner',
        number: '+639123456789'
      },
      {
        id: '2118',
        name: 'Chaos Knight',
        number: '+639123456789'
      },
      {
        id: '2119',
        name: 'Chen',
        number: '+639123456789'
      }
    ]
  }
];

const friends = [
  ...players,
  ...contacts.reduce((array, current) => array.concat(current.data), [])
];

const scenario =
  'If Aliens came to earth and vowed to destroy the planet, unless someone played them the most epic love song of all time, what would you play ?';

const songs = [
  {
    id: '1',
    title: 'When a Man Loves a Woman',
    singer: 'Michael Bolton',
    albumCover:
      'https://cps-static.rovicorp.com/3/JPG_500/MI0000/322/MI0000322129.jpg',
    user
  },
  {
    id: '2',
    title: 'When a Man Loves a Woman',
    singer: 'Michael Bolton',
    albumCover:
      'https://cps-static.rovicorp.com/3/JPG_500/MI0000/322/MI0000322129.jpg',
    user
  },
  {
    id: '3',
    title: 'When a Man Loves a Woman',
    singer: 'Michael Bolton',
    albumCover:
      'https://cps-static.rovicorp.com/3/JPG_500/MI0000/322/MI0000322129.jpg',
    user
  },
  {
    id: '4',
    title: 'When a Man Loves a Woman',
    singer: 'Michael Bolton',
    albumCover:
      'https://cps-static.rovicorp.com/3/JPG_500/MI0000/322/MI0000322129.jpg',
    user
  },
  {
    id: '5',
    title: 'When a Man Loves a Woman',
    singer: 'Michael Bolton',
    albumCover:
      'https://cps-static.rovicorp.com/3/JPG_500/MI0000/322/MI0000322129.jpg',
    user
  }
];

export default {
  user,
  players,
  playersInGame,
  contacts,
  friends,
  scenario,
  songs
};

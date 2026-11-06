const LETTERS = [
  { letter: "A" },
  { letter: "B" },
  { letter: "C" },
  { letter: "D" },
  { letter: "E" },
  { letter: "F" },
  { letter: "G" },
  { letter: "H" },
  { letter: "I" },
  { letter: "J" },
  { letter: "K" },
  { letter: "L" },
  { letter: "M" },
  { letter: "N" },
  { letter: "O" },
  { letter: "P" },
  { letter: "Q" },
  { letter: "R" },
  { letter: "S" },
  { letter: "T" },
  { letter: "U" },
  { letter: "V" },
  { letter: "W" },
  { letter: "X" },
  { letter: "Y" },
  { letter: "Z" },
];

const NUMBER_WORDS = {
  vi: [
    "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười",
    "mười một", "mười hai", "mười ba", "mười bốn", "mười lăm", "mười sáu", "mười bảy",
    "mười tám", "mười chín", "hai mươi",
  ],
  en: [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
    "eighteen", "nineteen", "twenty",
  ],
};

const VI_LETTER_NAMES = {
  A: "A", B: "Bờ", C: "Cờ", D: "Dờ", E: "E", F: "Ép", G: "Gờ", H: "Hờ",
  I: "I", J: "Gi", K: "Ca", L: "Lờ", M: "Mờ", N: "Nờ", O: "O",
  P: "Pờ", Q: "Quờ", R: "Rờ", S: "Sờ", T: "Tờ", U: "U", V: "Vờ",
  W: "Vê kép", X: "Xờ", Y: "Y", Z: "Zét",
};

const EN_LETTER_NAMES = {
  A: "ay", B: "bee", C: "see", D: "dee", E: "ee", F: "eff", G: "gee", H: "aitch",
  I: "eye", J: "jay", K: "kay", L: "el", M: "em", N: "en", O: "oh", P: "pee",
  Q: "cue", R: "ar", S: "ess", T: "tee", U: "you", V: "vee", W: "double-u",
  X: "ex", Y: "why", Z: "zee",
};

const ANIMALS = [
  // Vật nuôi
  { id: "dog", emoji: "🐶", vi: "con chó", en: "dog", category: "pets" },
  { id: "cat", emoji: "🐱", vi: "con mèo", en: "cat", category: "pets" },
  { id: "rabbit", emoji: "🐰", vi: "con thỏ", en: "rabbit", category: "pets" },
  { id: "hamster", emoji: "🐹", vi: "chuột hamster", en: "hamster", category: "pets" },
  { id: "mouse", emoji: "🐭", vi: "chuột nhắt", en: "mouse", category: "pets" },
  { id: "turtle", emoji: "🐢", vi: "con rùa", en: "turtle", category: "pets" },
  { id: "parrot", emoji: "🦜", vi: "con vẹt", en: "parrot", category: "pets" },
  { id: "goldfish", emoji: "🐠", vi: "cá vàng", en: "goldfish", category: "pets" },

  // Nông trại
  { id: "cow", emoji: "🐄", vi: "con bò", en: "cow", category: "farm" },
  { id: "pig", emoji: "🐖", vi: "con lợn", en: "pig", category: "farm" },
  { id: "sheep", emoji: "🐑", vi: "con cừu", en: "sheep", category: "farm" },
  { id: "goat", emoji: "🐐", vi: "con dê", en: "goat", category: "farm" },
  { id: "horse", emoji: "🐎", vi: "con ngựa", en: "horse", category: "farm" },
  { id: "donkey", emoji: "🫏", vi: "con lừa", en: "donkey", category: "farm" },
  { id: "llama", emoji: "🦙", vi: "lạc đà không bướu", en: "llama", category: "farm" },
  { id: "chicken", emoji: "🐔", vi: "con gà", en: "chicken", category: "farm" },
  { id: "rooster", emoji: "🐓", vi: "gà trống", en: "rooster", category: "farm" },
  { id: "duck", emoji: "🦆", vi: "con vịt", en: "duck", category: "farm" },
  { id: "goose", emoji: "🪿", vi: "con ngỗng", en: "goose", category: "farm" },

  // Động vật hoang dã
  { id: "lion", emoji: "🦁", vi: "con sư tử", en: "lion", category: "wild" },
  { id: "tiger", emoji: "🐯", vi: "con hổ", en: "tiger", category: "wild" },
  { id: "elephant", emoji: "🐘", vi: "con voi", en: "elephant", category: "wild" },
  { id: "giraffe", emoji: "🦒", vi: "hươu cao cổ", en: "giraffe", category: "wild" },
  { id: "zebra", emoji: "🦓", vi: "ngựa vằn", en: "zebra", category: "wild" },
  { id: "monkey", emoji: "🐒", vi: "con khỉ", en: "monkey", category: "wild" },
  { id: "gorilla", emoji: "🦍", vi: "khỉ đột", en: "gorilla", category: "wild" },
  { id: "fox", emoji: "🦊", vi: "con cáo", en: "fox", category: "wild" },
  { id: "wolf", emoji: "🐺", vi: "con sói", en: "wolf", category: "wild" },
  { id: "bear", emoji: "🐻", vi: "con gấu", en: "bear", category: "wild" },
  { id: "polar-bear", emoji: "🐻‍❄️", vi: "gấu Bắc Cực", en: "polar bear", category: "wild" },
  { id: "panda", emoji: "🐼", vi: "gấu trúc", en: "panda", category: "wild" },
  { id: "koala", emoji: "🐨", vi: "gấu túi", en: "koala", category: "wild" },
  { id: "kangaroo", emoji: "🦘", vi: "chuột túi", en: "kangaroo", category: "wild" },
  { id: "deer", emoji: "🦌", vi: "con hươu", en: "deer", category: "wild" },
  { id: "moose", emoji: "🫎", vi: "con nai sừng tấm", en: "moose", category: "wild" },
  { id: "hippo", emoji: "🦛", vi: "con hà mã", en: "hippo", category: "wild" },
  { id: "rhino", emoji: "🦏", vi: "tê giác", en: "rhino", category: "wild" },
  { id: "leopard", emoji: "🐆", vi: "con báo", en: "leopard", category: "wild" },
  { id: "camel", emoji: "🐪", vi: "lạc đà", en: "camel", category: "wild" },
  { id: "sloth", emoji: "🦥", vi: "con lười", en: "sloth", category: "wild" },
  { id: "badger", emoji: "🦡", vi: "con lửng", en: "badger", category: "wild" },
  { id: "otter", emoji: "🦦", vi: "con rái cá", en: "otter", category: "wild" },
  { id: "beaver", emoji: "🦫", vi: "con hải ly", en: "beaver", category: "wild" },
  { id: "hedgehog", emoji: "🦔", vi: "con nhím", en: "hedgehog", category: "wild" },
  { id: "bat", emoji: "🦇", vi: "con dơi", en: "bat", category: "wild" },
  { id: "squirrel", emoji: "🐿️", vi: "con sóc", en: "squirrel", category: "wild" },
  { id: "skunk", emoji: "🦨", vi: "chồn hôi", en: "skunk", category: "wild" },
  { id: "raccoon", emoji: "🦝", vi: "gấu mèo", en: "raccoon", category: "wild" },
  { id: "bison", emoji: "🦬", vi: "con bò rừng", en: "bison", category: "wild" },
  { id: "mammoth", emoji: "🦣", vi: "voi ma mút", en: "mammoth", category: "wild" },
  { id: "snake", emoji: "🐍", vi: "con rắn", en: "snake", category: "wild" },
  { id: "lizard", emoji: "🦎", vi: "con thằn lằn", en: "lizard", category: "wild" },
  { id: "frog", emoji: "🐸", vi: "con ếch", en: "frog", category: "wild" },

  // Loài chim
  { id: "eagle", emoji: "🦅", vi: "đại bàng", en: "eagle", category: "birds" },
  { id: "owl", emoji: "🦉", vi: "cú mèo", en: "owl", category: "birds" },
  { id: "peacock", emoji: "🦚", vi: "con công", en: "peacock", category: "birds" },
  { id: "flamingo", emoji: "🦩", vi: "hồng hạc", en: "flamingo", category: "birds" },
  { id: "penguin", emoji: "🐧", vi: "chim cánh cụt", en: "penguin", category: "birds" },
  { id: "swan", emoji: "🦢", vi: "thiên nga", en: "swan", category: "birds" },
  { id: "dove", emoji: "🕊️", vi: "bồ câu", en: "dove", category: "birds" },
  { id: "turkey", emoji: "🦃", vi: "gà tây", en: "turkey", category: "birds" },
  { id: "dodo", emoji: "🦤", vi: "chim dodo", en: "dodo", category: "birds" },
  { id: "bird", emoji: "🐦", vi: "con chim", en: "bird", category: "birds" },

  // Dưới biển
  { id: "whale", emoji: "🐋", vi: "cá voi", en: "whale", category: "sea" },
  { id: "dolphin", emoji: "🐬", vi: "cá heo", en: "dolphin", category: "sea" },
  { id: "shark", emoji: "🦈", vi: "cá mập", en: "shark", category: "sea" },
  { id: "octopus", emoji: "🐙", vi: "con bạch tuộc", en: "octopus", category: "sea" },
  { id: "squid", emoji: "🦑", vi: "con mực", en: "squid", category: "sea" },
  { id: "shrimp", emoji: "🦐", vi: "con tôm", en: "shrimp", category: "sea" },
  { id: "crab", emoji: "🦀", vi: "con cua", en: "crab", category: "sea" },
  { id: "lobster", emoji: "🦞", vi: "tôm hùm", en: "lobster", category: "sea" },
  { id: "fish", emoji: "🐟", vi: "con cá", en: "fish", category: "sea" },
  { id: "tropical-fish", emoji: "🐠", vi: "cá nhiệt đới", en: "tropical fish", category: "sea" },
  { id: "pufferfish", emoji: "🐡", vi: "cá nóc", en: "pufferfish", category: "sea" },
  { id: "seal", emoji: "🦭", vi: "hải cẩu", en: "seal", category: "sea" },
  { id: "jellyfish", emoji: "🪼", vi: "con sứa", en: "jellyfish", category: "sea" },
  { id: "oyster", emoji: "🦪", vi: "con hàu", en: "oyster", category: "sea" },
  { id: "coral", emoji: "🪸", vi: "san hô", en: "coral", category: "sea" },
  { id: "crocodile", emoji: "🐊", vi: "cá sấu", en: "crocodile", category: "sea" },

  // Bọ và côn trùng
  { id: "caterpillar", emoji: "🐛", vi: "con sâu bướm", en: "caterpillar", category: "bugs" },
  { id: "butterfly", emoji: "🦋", vi: "con bướm", en: "butterfly", category: "bugs" },
  { id: "bee", emoji: "🐝", vi: "con ong", en: "bee", category: "bugs" },
  { id: "ladybug", emoji: "🐞", vi: "bọ rùa", en: "ladybug", category: "bugs" },
  { id: "ant", emoji: "🐜", vi: "con kiến", en: "ant", category: "bugs" },
  { id: "spider", emoji: "🕷️", vi: "con nhện", en: "spider", category: "bugs" },
  { id: "scorpion", emoji: "🦂", vi: "bọ cạp", en: "scorpion", category: "bugs" },
  { id: "snail", emoji: "🐌", vi: "ốc sên", en: "snail", category: "bugs" },
  { id: "cricket", emoji: "🦗", vi: "con dế", en: "cricket", category: "bugs" },
  { id: "beetle", emoji: "🪲", vi: "bọ cánh cứng", en: "beetle", category: "bugs" },
  { id: "fly", emoji: "🪰", vi: "con ruồi", en: "fly", category: "bugs" },
  { id: "mosquito", emoji: "🦟", vi: "con muỗi", en: "mosquito", category: "bugs" },

  // Khủng long
  { id: "t-rex", emoji: "🦖", vi: "khủng long bạo chúa", en: "T-Rex", category: "dinosaurs" },
  { id: "brachiosaurus", emoji: "🦕", vi: "khủng long cổ dài", en: "brachiosaurus", category: "dinosaurs" },
];

const VEHICLES = [
  { id: "car", emoji: "🚗", vi: "xe ô tô", en: "car" },
  { id: "bicycle", emoji: "🚲", vi: "xe đạp", en: "bicycle" },
  { id: "motorcycle", emoji: "🏍️", vi: "xe máy", en: "motorcycle" },
  { id: "bus", emoji: "🚌", vi: "xe buýt", en: "bus" },
  { id: "truck", emoji: "🚚", vi: "xe tải", en: "truck" },
  { id: "train", emoji: "🚆", vi: "tàu hỏa", en: "train" },
  { id: "airplane", emoji: "✈️", vi: "máy bay", en: "airplane" },
  { id: "helicopter", emoji: "🚁", vi: "trực thăng", en: "helicopter" },
  { id: "boat", emoji: "⛵", vi: "thuyền", en: "boat" },
  { id: "ship", emoji: "🚢", vi: "tàu thủy", en: "ship" },
  { id: "sailboat", emoji: "⛵", vi: "thuyền buồm", en: "sailboat" },
  { id: "ambulance", emoji: "🚑", vi: "xe cứu thương", en: "ambulance" },
  { id: "fire-engine", emoji: "🚒", vi: "xe cứu hỏa", en: "fire engine" },
  { id: "police-car", emoji: "🚓", vi: "xe cảnh sát", en: "police car" },
  { id: "taxi", emoji: "🚕", vi: "xe taxi", en: "taxi" },
  { id: "school-bus", emoji: "🚌", vi: "xe buýt trường học", en: "school bus" },
  { id: "tractor", emoji: "🚜", vi: "máy kéo", en: "tractor" },
  { id: "excavator", emoji: "🚜", vi: "máy xúc", en: "excavator" },
  { id: "rocket", emoji: "🚀", vi: "tên lửa", en: "rocket" },
  { id: "submarine", emoji: "🚢", vi: "tàu ngầm", en: "submarine" },
  { id: "tram", emoji: "🚊", vi: "tàu điện", en: "tram" },
  { id: "crane", emoji: "🏗️", vi: "xe cần cẩu", en: "crane" },
  { id: "hot-air-balloon", emoji: "🎈", vi: "khinh khí cầu", en: "hot air balloon" },
  { id: "road-roller", emoji: "🚜", vi: "xe lu", en: "road roller" },
  { id: "container-truck", emoji: "🚛", vi: "xe container", en: "container truck" },
  { id: "dump-truck", emoji: "🚛", vi: "xe ben đất", en: "dump truck" },
];

const COPY = {
  vi: {
    navLetters: "Chữ cái",
    navNumbers: "Học số",
    navAnimals: "Con vật",
    navVehicles: "Xe cộ",
    navGames: "Trò chơi",
    heroEyebrow: "Vừa học vừa chơi",
    tapTip: "Chạm vào thẻ bất kỳ để nghe",
    mascotHello: "Mình học cùng nhau nhé!",
    nowPlaying: "Đang đọc",
    letterCount: `${LETTERS.length} chữ cái`,
    numberCount: `${NUMBER_WORDS.vi.length} con số`,
    animalCount: `${ANIMALS.length} con vật`,
    vehicleCount: `${VEHICLES.length} loại xe`,
    searchPlaceholder: "Tìm con vật...",
    randomAnimal: "Chọn ngẫu nhiên",
    categoryAll: "Tất cả",
    categoryPets: "Vật nuôi",
    categoryFarm: "Nông trại",
    categoryWild: "Hoang dã",
    categoryBirds: "Loài chim",
    categorySea: "Dưới biển",
    categoryBugs: "Bọ và côn trùng",
    categoryDinosaurs: "Khủng long",
    emptyTitle: "Chưa tìm thấy con vật này",
    emptyText: "Bé thử tên khác hoặc chọn “Tất cả” nhé!",
    clearSearch: "Xóa tìm kiếm",
    parentTipTitle: "Mẹo nhỏ cho ba mẹ",
    parentTipText:
      "Hãy để bé vừa nghe vừa nhắc lại. Mỗi ngày chỉ cần 5–10 phút là bé đã học được rất nhiều!",
    footerTitle: "Mỗi ngày một chút, bé lớn thêm một chút!",
    footerText: "Bé Học Vui · Ứng dụng học tập cho trẻ nhỏ",
    installApp: "Cài Bé Học Vui",
    installHelp:
      "Trên iPhone/iPad: mở web bằng Safari, nhấn nút Chia sẻ rồi chọn “Thêm vào Màn hình chính”. Trên Chrome: mở menu ⋮ và chọn “Cài đặt ứng dụng”.",
    lettersTitle: "Chữ cái vui nhộn",
    lettersDescription: "Bấm vào từng chữ để nghe cách đọc thật rõ nhé!",
    numbersTitle: "Cùng học đếm nào!",
    numbersDescription: "Bấm vào từng con số để nghe cách đọc và tập đếm thật to.",
    animalsTitle: "Thế giới con vật",
    animalsDescription:
      `Khám phá ${ANIMALS.length} con vật qua hình ảnh thực tế. Chạm vào ảnh để nghe tên, xem hoạt ảnh; nhiều con còn có tiếng kêu!`,
    alphabetHeading: "Bảng chữ cái",
    alphabetSubtitle: "26 chữ cái để bé khám phá",
    numbersHeading: "Bảng số đếm",
    numbersSubtitle: "Từ 0 đến 20, cùng bé tập đếm",
    animalsHeading: "Khám phá con vật",
    animalSubtitle: (count) => `${count} con vật để bé khám phá`,
    animalsSubtitle: `${ANIMALS.length} con vật để bé khám phá`,
    vehiclesTitle: "Bé học xe cộ",
    vehiclesDescription:
      "Cùng bé nhận biết xe ô tô, xe buýt, tàu hỏa, máy bay và nhiều phương tiện quen thuộc khác.",
    vehiclesHeading: "Các loại xe",
    vehiclesSubtitle: `${VEHICLES.length} phương tiện để bé khám phá`,
    gamesTitle: "Nghe tiếng, chọn con vật",
    gamesDescription:
      "Nghe tiếng kêu rồi bấm vào hình đúng. Bắt đầu với 2 hình thật dễ, sau đó tăng dần lên 3 và 4 hình.",
    gamesHeading: "Nghe tiếng, chọn hình",
    gamesSubtitle: "6 câu chơi cùng bé",
    gameStartEyebrow: "Bé đã sẵn sàng?",
    gameStartTitle: "Nghe tiếng và chọn hình",
    gameStartText:
      "Bé chỉ cần nghe tiếng kêu rồi bấm vào con vật. Bấm sai vẫn được nghe lại và chọn tiếp!",
    gameTip: "Nghe tiếng rồi bấm vào con vật",
    startGame: "Bắt đầu chơi",
    playAgain: "Chơi lại",
    replaySound: "Nghe lại",
    gameRound: "Câu {current}/{total}",
    gameScore: "{score} ngôi sao",
    gameStreak: "Đã đúng: {count}",
    gameBest: "Kỷ lục: {score} ★",
    gameCorrect: "Đúng rồi!",
    gameWrong: "Thử lại nhé!",
    gameSoundPrompt: "Nghe tiếng kêu và chọn đúng con vật",
    gameListenPrompt: "Nghe tên và chọn đúng hình",
    gamePhotoPrompt: "Nhìn hình và chọn đúng tên",
    gameCountPrompt: "Có bao nhiêu con vật?",
    gameLetterPrompt: "Con vật này bắt đầu bằng chữ nào?",
    gameCompleteTitle: "Hoàn thành thử thách!",
    gameCompleteText: "Bé chọn đúng {correct}/{total} câu và nhận được {score} ngôi sao.",
    gameNewBest: "Kỷ lục mới!",
    gameResultEyebrow: "Kết quả của bé",
    gameTypeSound: "Nghe tiếng kêu",
    gameTypeListen: "Nghe tên",
    gameTypePhoto: "Nhìn hình",
    gameTypeCount: "Đếm nhanh",
    gameTypeLetter: "Chữ cái đầu",
    gameFeatureListen: "Nghe tiếng kêu",
    gameFeatureTap: "Bấm vào hình",
    gameFeatureStar: "Nhận ngôi sao",
    gameStarsUnit: "sao",
    gameResultCorrect: "Trả lời đúng",
    gameResultScore: "Ngôi sao",
    gameResultBest: "Kỷ lục",
    noSound: "Thiết bị hoặc trình duyệt này chưa hỗ trợ đọc thành tiếng.",
    letterSpeech: (letter, spokenName) => `Chữ ${spokenName}.`,
    numberSpeech: (number, word) => `Số ${word}.`,
    animalSpeech: (name) => `${name.charAt(0).toUpperCase()}${name.slice(1)}.`,
  },
  en: {
    navLetters: "Letters",
    navNumbers: "Numbers",
    navAnimals: "Animals",
    navVehicles: "Vehicles",
    navGames: "Games",
    heroEyebrow: "Learn & play",
    tapTip: "Tap any card to hear it",
    mascotHello: "Let's learn together!",
    nowPlaying: "Now saying",
    letterCount: `${LETTERS.length} letters`,
    numberCount: `${NUMBER_WORDS.en.length} numbers`,
    animalCount: `${ANIMALS.length} animals`,
    vehicleCount: `${VEHICLES.length} vehicles`,
    searchPlaceholder: "Find an animal...",
    randomAnimal: "Surprise me",
    categoryAll: "All",
    categoryPets: "Pets",
    categoryFarm: "Farm",
    categoryWild: "Wild",
    categoryBirds: "Birds",
    categorySea: "Under the sea",
    categoryBugs: "Bugs",
    categoryDinosaurs: "Dinosaurs",
    emptyTitle: "No animal found",
    emptyText: "Try another name or choose “All”!",
    clearSearch: "Clear search",
    parentTipTitle: "A little tip for grown-ups",
    parentTipText:
      "Let your child listen and repeat. Just 5–10 minutes a day can teach them so much!",
    footerTitle: "A little each day helps you grow!",
    footerText: "Bé Học Vui · Learning app for little ones",
    installApp: "Install Bé Học Vui",
    installHelp:
      "On iPhone/iPad: open this site in Safari, tap Share, then choose “Add to Home Screen”. In Chrome, open the ⋮ menu and choose “Install app”.",
    lettersTitle: "ABC fun",
    lettersDescription: "Tap each letter to hear its name clearly!",
    numbersTitle: "Let's count together!",
    numbersDescription: "Tap a number to hear it and practise counting out loud.",
    animalsTitle: "Animal world",
    animalsDescription:
      `Meet ${ANIMALS.length} animals through realistic pictures. Tap a photo to hear its name and watch it move; many also have real animal sounds!`,
    alphabetHeading: "The alphabet",
    alphabetSubtitle: "26 letters to discover",
    numbersHeading: "Counting board",
    numbersSubtitle: "From zero to twenty",
    animalsHeading: "Meet the animals",
    animalSubtitle: (count) => `${count} animals to discover`,
    animalsSubtitle: `${ANIMALS.length} animals to discover`,
    vehiclesTitle: "Things that go",
    vehiclesDescription:
      "Learn about cars, buses, trains, planes and many other familiar vehicles together.",
    vehiclesHeading: "Vehicles",
    vehiclesSubtitle: `${VEHICLES.length} vehicles to discover`,
    gamesTitle: "Listen and find",
    gamesDescription:
      "Listen to a real animal sound and tap the right picture. Start with 2 big choices, then try 3 and 4 pictures.",
    gamesHeading: "Sound match",
    gamesSubtitle: "A 6-question game",
    gameStartEyebrow: "Are you ready?",
    gameStartTitle: "Listen and tap",
    gameStartText:
      "Just listen to the animal sound and tap its picture. If you tap the wrong one, you can listen and try again!",
    gameTip: "Listen, then tap the animal",
    startGame: "Start playing",
    playAgain: "Play again",
    replaySound: "Play again",
    gameRound: "Question {current}/{total}",
    gameScore: "{score} stars",
    gameStreak: "Found: {count}",
    gameBest: "Best: {score} ★",
    gameCorrect: "That's right!",
    gameWrong: "Try again!",
    gameSoundPrompt: "Listen to the sound and choose the right animal",
    gameListenPrompt: "Listen to the name and choose the right picture",
    gamePhotoPrompt: "Look at the picture and choose the right name",
    gameCountPrompt: "How many animals are there?",
    gameLetterPrompt: "Which letter does this animal begin with?",
    gameCompleteTitle: "Challenge complete!",
    gameCompleteText: "You found {correct}/{total} animals and earned {score} stars.",
    gameNewBest: "New high score!",
    gameResultEyebrow: "Your result",
    gameTypeSound: "Animal sound",
    gameTypeListen: "Listen",
    gameTypePhoto: "Picture",
    gameTypeCount: "Quick count",
    gameTypeLetter: "First letter",
    gameFeatureListen: "Hear the sound",
    gameFeatureTap: "Tap a picture",
    gameFeatureStar: "Earn stars",
    gameStarsUnit: "stars",
    gameResultCorrect: "Correct",
    gameResultScore: "Stars",
    gameResultBest: "Best",
    noSound: "This device or browser does not support spoken words.",
    letterSpeech: (letter, spokenName) =>
      `${spokenName.charAt(0).toUpperCase()}${spokenName.slice(1)}.`,
    numberSpeech: (number, word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}.`,
    animalSpeech: (name) => `${name.charAt(0).toUpperCase()}${name.slice(1)}.`,
  },
};

const MODE_CONTENT = {
  letters: {
    title: "lettersTitle",
    description: "lettersDescription",
    heading: "alphabetHeading",
    subtitle: "alphabetSubtitle",
  },
  numbers: {
    title: "numbersTitle",
    description: "numbersDescription",
    heading: "numbersHeading",
    subtitle: "numbersSubtitle",
  },
  animals: {
    title: "animalsTitle",
    description: "animalsDescription",
    heading: "animalsHeading",
    subtitle: "animalsSubtitle",
  },
  vehicles: {
    title: "vehiclesTitle",
    description: "vehiclesDescription",
    heading: "vehiclesHeading",
    subtitle: "vehiclesSubtitle",
  },
  games: {
    title: "gamesTitle",
    description: "gamesDescription",
    heading: "gamesHeading",
    subtitle: "gamesSubtitle",
  },
};

const ANIMAL_MEDIA = window.ANIMAL_MEDIA || { photos: {}, sounds: {} };
const VEHICLE_MEDIA = window.VEHICLE_MEDIA || { photos: {} };

function activity(vi, en, motion, effect, callVi = "", callEn = "") {
  return { vi, en, motion, effect, callVi, callEn };
}

const CATEGORY_ACTIVITIES = {
  pets: activity("đi loanh quanh", "walking around", "wag", "🐾"),
  farm: activity("đi tìm thức ăn", "looking for food", "march", "🌾"),
  wild: activity("bước đi", "walking", "prowl", "🍃"),
  birds: activity("bay lượn", "flying", "fly", "✨"),
  sea: activity("bơi lượn", "swimming", "swim", "🫧"),
  bugs: activity("bò loanh quanh", "crawling around", "crawl", "✨"),
  dinosaurs: activity("giậm chân", "stomping", "stomp", "💥"),
};

const ANIMAL_ACTIVITIES = {
  dog: activity("vẫy đuôi", "wagging its tail", "wag", "💛", "Gâu gâu!", "Woof woof!"),
  cat: activity("rón rén", "sneaking", "prowl", "🐾", "Meo meo!", "Meow!"),
  rabbit: activity("nhảy tưng tưng", "hopping", "hop", "✨", "Thịch! Thịch!", "Thump thump!"),
  hamster: activity("chạy lon ton", "scurrying", "skitter", "✨", "Chít chít!", "Squeak squeak!"),
  mouse: activity("chạy nhanh", "scurrying", "skitter", "💨", "Chít chít!", "Squeak!"),
  turtle: activity("bò chậm rãi", "crawling slowly", "crawl", "🍃"),
  parrot: activity("nghiêng đầu", "tilting its head", "prowl", "🎵", "Vẹt vẹt!", "Squawk!"),
  goldfish: activity("bơi trong bể", "swimming in a bowl", "swim", "🫧"),
  cow: activity("gặm cỏ", "grazing", "eat", "🌿", "Ụm bò!", "Moo!"),
  pig: activity("ủi đất", "rooting in the mud", "sniff", "💦", "Ụt ịt!", "Oink oink!"),
  sheep: activity("gặm cỏ", "grazing", "eat", "🌿", "Be be!", "Baa!"),
  goat: activity("leo dốc", "climbing", "hop", "🍃", "Be be!", "Maa!"),
  horse: activity("phi nước đại", "galloping", "gallop", "💨", "Hí hí!", "Neigh!"),
  donkey: activity("đi trên đồng", "walking", "march", "🌾", "Hee-haw!", "Hee-haw!"),
  llama: activity("ngắm nhìn", "looking around", "prowl", "☀️", "Hừm!", "Hum!"),
  chicken: activity("mổ thức ăn", "pecking", "peck", "🌾", "Cục ta cục tác!", "Cluck cluck!"),
  rooster: activity("gáy sáng", "crowing", "flare", "☀️", "Ò ó o!", "Cock-a-doodle-doo!"),
  duck: activity("lạch bạch", "waddling", "waddle", "💧", "Cạp cạp!", "Quack quack!"),
  goose: activity("vỗ cánh", "flapping its wings", "flap", "✨", "Quạc quạc!", "Honk honk!"),
  lion: activity("gầm thật to", "roaring", "roar", "💥", "Gừừừ!", "Roar!"),
  tiger: activity("rình mồi", "prowling", "prowl", "🍃", "Gừừ!", "Grrr!"),
  elephant: activity("vẫy đôi tai", "flapping its ears", "trunk", "🌿", "Pawoo!", "Trumpet!"),
  giraffe: activity("vươn cổ ăn lá", "stretching for leaves", "eat", "🌿"),
  zebra: activity("chạy trên đồng cỏ", "running", "gallop", "💨", "Hí hí!", "Bray!"),
  monkey: activity("đu cây", "swinging", "swing", "🌿", "Ooh ooh!", "Ooh ooh!"),
  gorilla: activity("vỗ ngực", "beating its chest", "roar", "💥", "Hừ hừ!", "Hoo hoo!"),
  fox: activity("nhảy vồ", "pouncing", "pounce", "🍂", "Húuu!", "Yip!"),
  wolf: activity("hú gọi đàn", "howling", "roar", "🌙", "Auuuu!", "Awooo!"),
  bear: activity("ngửi mùi mật ong", "sniffing for honey", "sniff", "🍯", "Gừừ!", "Growl!"),
  "polar-bear": activity("bơi trên băng", "swimming", "swim", "❄️", "Gừừ!", "Growl!"),
  panda: activity("ăn trúc", "eating bamboo", "eat", "🎋", "Be be!", "Bleat!"),
  koala: activity("ôm cành ngủ", "sleeping in a tree", "sleep", "💤", "Hừừ!", "Bellow!"),
  kangaroo: activity("nhảy trên đồng", "hopping", "hop", "💨"),
  deer: activity("nhảy qua bụi cây", "leaping", "hop", "🍂", "Hú!", "Call!"),
  moose: activity("bước qua tuyết", "walking in snow", "march", "❄️", "Ưuuu!", "Call!"),
  hippo: activity("ngáp thật to", "yawning", "roar", "💦", "Hừừ!", "Grunt!"),
  rhino: activity("chạy bon bon", "charging", "gallop", "💨", "Khịt khịt!", "Snort!"),
  leopard: activity("leo cây", "climbing", "pounce", "🌿", "Gừừ!", "Growl!"),
  camel: activity("bước trên cát", "walking on sand", "waddle", "☀️", "Hừm!", "Grunt!"),
  sloth: activity("treo mình", "hanging", "sleep", "💤"),
  badger: activity("đào hang", "digging", "dig", "🌱", "Hừ!", "Growl!"),
  otter: activity("nằm bơi", "floating", "swim", "🫧", "Chít chít!", "Squeak!"),
  beaver: activity("gặm gỗ", "chewing wood", "chew", "🪵", "Hừm!", "Chomp!"),
  hedgehog: activity("cuộn tròn", "curling up", "pulse", "🍂", "Sụt sịt!", "Snuffle!"),
  bat: activity("bay trong đêm", "flying at night", "fly", "🌙", "Chít chít!", "Eeeek!"),
  squirrel: activity("nhảy qua cành", "jumping between branches", "hop", "🌰", "Chít chít!", "Chatter!"),
  skunk: activity("giơ đuôi", "raising its tail", "prowl", "💨", "Híttt!", "Hiss!"),
  raccoon: activity("rửa thức ăn", "washing its food", "skitter", "💧", "Rít rít!", "Chatter!"),
  bison: activity("đi thành đàn", "walking with the herd", "march", "🌾", "Ụuuu!", "Bellow!"),
  mammoth: activity("vẫy ngà", "swinging its tusks", "stomp", "❄️"),
  snake: activity("bò uốn lượn", "slithering", "slither", "🍃", "Xììì!", "Hiss!"),
  lizard: activity("phơi nắng", "basking in the sun", "crawl", "☀️", "Xìì!", "Hiss!"),
  frog: activity("nhảy xuống ao", "jumping", "hop", "💧", "Ộp ộp!", "Ribbit!"),
  eagle: activity("sải cánh", "spreading its wings", "fly", "☁️", "Kiiii!", "Screech!"),
  owl: activity("quay đầu", "turning its head", "prowl", "🌙", "Cú ú!", "Hoo hoo!"),
  peacock: activity("xòe đuôi", "showing its feathers", "flare", "✨", "Eng éc!", "Call!"),
  flamingo: activity("đứng một chân", "standing on one leg", "pulse", "🌸", "Honk!", "Honk!"),
  penguin: activity("lạch bạch", "waddling", "waddle", "❄️", "Éc éc!", "Honk!"),
  swan: activity("lướt trên nước", "gliding", "swim", "🫧", "Quạc!", "Honk!"),
  dove: activity("gù gù", "cooing", "pulse", "☁️", "Gù gù!", "Coo coo!"),
  turkey: activity("khoe lông", "strutting", "flare", "🍂", "Gốc gốc!", "Gobble gobble!"),
  dodo: activity("bước trên cỏ", "walking", "march", "🌿"),
  bird: activity("hót líu lo", "chirping", "fly", "🎵", "Chích chích!", "Tweet tweet!"),
  whale: activity("phun nước", "spouting water", "spout", "💦", "Uuuu!", "Whoosh!"),
  dolphin: activity("nhảy khỏi mặt nước", "jumping", "hop", "💦", "Ít ít!", "Eee eee!"),
  shark: activity("bơi săn mồi", "swimming", "swim", "🌊"),
  octopus: activity("vươn xúc tu", "stretching its arms", "pulse", "🫧"),
  squid: activity("bơi giật lùi", "swimming backward", "swim", "🫧"),
  shrimp: activity("bơi giật", "swimming in little bursts", "skitter", "🫧"),
  crab: activity("bò ngang", "scuttling sideways", "skitter", "🦀", "Tách tách!", "Click click!"),
  lobster: activity("vẫy râu", "waving its antennae", "pulse", "🌊"),
  fish: activity("bơi lượn", "swimming", "swim", "🫧"),
  "tropical-fish": activity("bơi quanh san hô", "darting around coral", "swim", "🫧"),
  pufferfish: activity("phồng người", "puffing up", "puff", "💨"),
  seal: activity("trượt trên băng", "sliding", "waddle", "❄️", "Gâu gâu!", "Arf arf!"),
  jellyfish: activity("co giãn", "pulsing", "pulse", "🫧"),
  oyster: activity("mở vỏ", "opening its shell", "pulse", "🌊"),
  coral: activity("đung đưa", "swaying", "pulse", "🫧"),
  crocodile: activity("há miệng", "snapping its jaws", "snap", "💦", "Grừừ!", "Snap!"),
  caterpillar: activity("bò theo hàng", "crawling", "crawl", "🍃"),
  butterfly: activity("vỗ cánh", "fluttering", "flutter", "🌸"),
  bee: activity("hút mật", "collecting nectar", "buzz", "🌼", "Vù vù!", "Buzz!"),
  ladybug: activity("bò trên lá", "crawling on a leaf", "crawl", "🍃"),
  ant: activity("đi thành hàng", "marching in a line", "march", "🌿"),
  spider: activity("bò trên tơ", "crawling on its web", "crawl", "🕸️"),
  scorpion: activity("giơ đuôi", "raising its tail", "prowl", "🌙"),
  snail: activity("bò chậm", "sliding slowly", "crawl", "🍃"),
  cricket: activity("nhảy và kêu", "jumping and chirping", "hop", "🌙", "Rỉ rả!", "Chirp chirp!"),
  beetle: activity("bò trên cành", "crawling", "crawl", "🌿"),
  fly: activity("vo ve", "buzzing around", "fly", "💨", "Ve ve!", "Bzzz!"),
  mosquito: activity("bay vo ve", "flying and buzzing", "fly", "🌙", "Vo ve!", "Bzzz!"),
  "t-rex": activity("gầm thật to", "roaring", "roar", "💥", "Grừừ!", "Roar!"),
  brachiosaurus: activity("vươn cổ ăn lá", "reaching for leaves", "eat", "🌿"),
};

function getAnimalActivity(animal) {
  return (
    ANIMAL_ACTIVITIES[animal.id] ||
    CATEGORY_ACTIVITIES[animal.category] ||
    CATEGORY_ACTIVITIES.wild
  );
}

const FAMILIAR_ANIMAL_IDS = new Set([
  "dog",
  "cat",
  "rabbit",
  "chicken",
  "cow",
  "pig",
  "duck",
  "goose",
  "goat",
  "sheep",
  "horse",
  "donkey",
  "fish",
  "goldfish",
  "bird",
  "parrot",
  "turtle",
  "hamster",
  "mouse",
  "lion",
  "tiger",
  "elephant",
  "giraffe",
  "zebra",
  "monkey",
  "bear",
  "wolf",
  "fox",
  "owl",
  "eagle",
  "frog",
  "snake",
  "panda",
]);

function fillCopy(template, values) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function shuffle(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function animalInitial(animal) {
  const name = animal[state.language].replace(/^con\s+/i, "");
  return normalizeText(name).charAt(0).toUpperCase();
}

const CARD_PALETTES = [
  { bg: "#fff7dc", border: "#f0dfa8", accent: "#e3b64f", color: "#9b6b15" },
  { bg: "#eef8f0", border: "#d2e9d9", accent: "#80b998", color: "#39745a" },
  { bg: "#eef6fb", border: "#d3e6f1", accent: "#81b6d5", color: "#35749a" },
  { bg: "#fff0ef", border: "#f4d9d7", accent: "#e5a2a0", color: "#9f5553" },
  { bg: "#f5f1fb", border: "#e4daf1", accent: "#b39ad7", color: "#6f579b" },
  { bg: "#fdf5e9", border: "#f0dfca", accent: "#dfac72", color: "#8d6337" },
  { bg: "#eef8f8", border: "#d3eaea", accent: "#79b9b6", color: "#377776" },
  { bg: "#fff5f6", border: "#f3dce2", accent: "#dea8b8", color: "#95596b" },
];

const state = {
  mode: "letters",
  language: "vi",
  category: "all",
  search: "",
};

const GAME_TOTAL = 6;
const GAME_TYPES = Array(GAME_TOTAL).fill("sound");
const gameState = {
  active: false,
  finished: false,
  index: 0,
  score: 0,
  streak: 0,
  correct: 0,
  best: 0,
  locked: false,
  questions: [],
  current: null,
  nextTimer: null,
};

const grid = document.querySelector("#lesson-grid");
const learningShell = document.querySelector("#learning-shell");
const gameShell = document.querySelector("#game-shell");
const gameBoard = document.querySelector("#game-board");
const gameStatus = document.querySelector("#game-status");
const gameRoundLabel = document.querySelector("#game-round-label");
const gameScoreLabel = document.querySelector("#game-score-label");
const gameStreak = document.querySelector("#game-streak");
const gameProgressBar = document.querySelector("#game-progress-bar");
const installButton = document.querySelector("#install-app");
const installHelp = document.querySelector("#install-help");
const sectionTitle = document.querySelector("#section-title");
const sectionSubtitle = document.querySelector("#section-subtitle");
const animalActions = document.querySelector("#animal-actions");
const categoryFilters = document.querySelector("#category-filters");
const animalSearch = document.querySelector("#animal-search");
const randomAnimalButton = document.querySelector("#random-animal");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#speech-toast");
const toastText = document.querySelector("#toast-text");
const lessonCount = document.querySelector(".lesson-count");
const lessonCountText = lessonCount.querySelector("span:last-child");

let voices = [];
let activeUtterance = null;
let activeAudio = null;
let activeCard = null;
let toastTimer = null;
let speechTimer = null;
let playbackToken = 0;
let installPromptEvent = null;

function getSavedPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The learning app still works when storage is unavailable.
  }
}

function restorePreferences() {
  const savedLanguage = getSavedPreference("be-hoc-vui-language");
  const savedMode = getSavedPreference("be-hoc-vui-mode");
  if (savedLanguage === "vi" || savedLanguage === "en") state.language = savedLanguage;
  if (
    savedMode === "letters" ||
    savedMode === "numbers" ||
    savedMode === "animals" ||
    savedMode === "vehicles" ||
    savedMode === "games"
  ) {
    state.mode = savedMode;
  }
  const savedBest = Number(getSavedPreference("be-hoc-vui-sound-game-best"));
  if (Number.isFinite(savedBest) && savedBest > 0) gameState.best = savedBest;
}

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function speakerIcon() {
  return `
    <span class="sound-dot" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M4 9v6h4l5 4V5L8 9H4Zm12.2-.9a5.3 5.3 0 0 1 0 7.8l1.4 1.4a7.2 7.2 0 0 0 0-10.6l-1.4 1.4Z"/>
      </svg>
    </span>`;
}

function cardStyle(palette) {
  return `--card-bg:${palette.bg};--card-border:${palette.border};--accent:${palette.accent};--letter-color:${palette.color}`;
}

function renderLetters() {
  grid.className = "card-grid letter-grid";
  grid.innerHTML = LETTERS.map((item, index) => {
    const spokenName =
      state.language === "vi"
        ? VI_LETTER_NAMES[item.letter]
        : EN_LETTER_NAMES[item.letter];
    const label =
      state.language === "vi"
        ? `Chữ ${spokenName}`
        : `${item.letter}. ${spokenName}`;
    return `
      <button
        class="learning-card letter-card"
        type="button"
        data-item-type="letter"
        data-id="${item.letter}"
        style="${cardStyle(CARD_PALETTES[index % CARD_PALETTES.length])}"
        aria-label="${label}"
      >
        ${speakerIcon()}
        <span class="letter-content" aria-hidden="true">
          <span class="letter-mark">
            <span class="letter-upper">${item.letter}</span>
          </span>
          <span class="letter-phonetic">${spokenName}</span>
        </span>
      </button>`;
  }).join("");
}

function renderNumbers() {
  grid.className = "card-grid number-grid";
  const words = NUMBER_WORDS[state.language];
  grid.innerHTML = words.map((word, number) => {
    const dots =
      number === 0
        ? '<span class="number-zero">0</span>'
        : Array.from({ length: number }, () => '<span class="count-dot"></span>').join("");
    const label =
      state.language === "vi" ? `Số ${word}` : `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    return `
      <button
        class="learning-card number-card"
        type="button"
        data-item-type="number"
        data-id="${number}"
        style="${cardStyle(CARD_PALETTES[(number + 1) % CARD_PALETTES.length])}"
        aria-label="${label}"
      >
        ${speakerIcon()}
        <span class="number-top" aria-hidden="true">
          <span class="number-mark">${number}</span>
          <span class="number-word">${word}</span>
        </span>
        <span class="counting-dots" aria-hidden="true">${dots}</span>
      </button>`;
  }).join("");
}

function getFilteredAnimals() {
  const search = normalizeText(state.search);
  return ANIMALS.filter((animal) => {
    const inCategory = state.category === "all" || animal.category === state.category;
    if (!inCategory) return false;
    if (!search) return true;
    return normalizeText(`${animal.vi} ${animal.en}`).includes(search);
  });
}

function renderAnimals() {
  grid.className = "card-grid animal-grid";
  const allAnimals = getFilteredAnimals();
  emptyState.hidden = allAnimals.length > 0;

  grid.innerHTML = allAnimals.map((animal, index) => {
    const name = animal[state.language];
    const alternate = animal[state.language === "vi" ? "en" : "vi"];
    const action = getAnimalActivity(animal);
    const actionText = action[state.language];
    const photo = ANIMAL_MEDIA.photos[animal.id];
    const hasSound = Boolean(ANIMAL_MEDIA.sounds[animal.id]?.file);
    const animalCall = hasSound
      ? state.language === "vi"
        ? action.callVi
        : action.callEn
      : "";
    return `
      <button
        class="learning-card animal-card"
        type="button"
        data-item-type="animal"
        data-id="${animal.id}"
        data-motion="${action.motion}"
        style="${cardStyle(CARD_PALETTES[index % CARD_PALETTES.length])}"
        aria-label="${name}: ${actionText}"
      >
        ${speakerIcon()}
        <span class="animal-stage" aria-hidden="true">
          <span class="photo-fallback">${animal.emoji}</span>
          <img
            class="animal-photo"
            src="${photo || ""}"
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <span class="motion-trail trail-one">${action.effect}</span>
          <span class="motion-trail trail-two">${action.effect}</span>
          <span class="action-bubble">
            ${animalCall ? `<strong>${animalCall}</strong>` : ""}
            <span>${actionText}</span>
          </span>
        </span>
        <span class="animal-copy">
          <span class="animal-name">${name}</span>
          <span class="animal-alt" lang="${state.language === "vi" ? "en" : "vi"}">${alternate}</span>
        </span>
      </button>`;
  }).join("");

  const count = allAnimals.length;
  sectionSubtitle.textContent = COPY[state.language].animalSubtitle(count);
}

function renderVehicles() {
  grid.className = "card-grid vehicle-grid";
  emptyState.hidden = true;
  grid.innerHTML = VEHICLES.map((vehicle, index) => {
    const name = vehicle[state.language];
    const alternate = vehicle[state.language === "vi" ? "en" : "vi"];
    return `
      <button
        class="learning-card vehicle-card"
        type="button"
        data-item-type="vehicle"
        data-id="${vehicle.id}"
        style="${cardStyle(CARD_PALETTES[index % CARD_PALETTES.length])}"
        aria-label="${name}"
      >
        ${speakerIcon()}
        <span class="vehicle-stage" aria-hidden="true">
          <span class="vehicle-fallback">${vehicle.emoji}</span>
          <img
            class="vehicle-photo"
            src="${VEHICLE_MEDIA.photos[vehicle.id] || ""}"
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </span>
        <span class="vehicle-copy">
          <span class="vehicle-name">${name}</span>
          <span class="vehicle-alt" lang="${state.language === "vi" ? "en" : "vi"}">${alternate}</span>
        </span>
      </button>`;
  }).join("");
}

function updateCountBadges() {
  const counts = { all: ANIMALS.length };
  ANIMALS.forEach((animal) => {
    counts[animal.category] = (counts[animal.category] || 0) + 1;
  });
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    const count = counts[chip.dataset.category] || 0;
    chip.querySelector(".chip-count").textContent = count;
  });
}

function updateStaticCopy() {
  const copy = COPY[state.language];
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key] !== undefined && typeof copy[key] === "string") {
      element.textContent = copy[key];
    }
  });
  animalSearch.placeholder = copy.searchPlaceholder;
  animalSearch.setAttribute("aria-label", copy.searchPlaceholder);
  randomAnimalButton.setAttribute("aria-label", copy.randomAnimal);
  installHelp.textContent = copy.installHelp;
  document.title =
    state.language === "vi" ? "Bé Học Vui · Học và chơi" : "Bé Học Vui · Learn & play";

  document.querySelectorAll(".language-button").forEach((button) => {
    const isActive = button.dataset.lang === state.language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateModeCopy() {
  const copy = COPY[state.language];
  const content = MODE_CONTENT[state.mode];
  document.querySelector("#page-title").textContent = copy[content.title];
  document.querySelector(".hero-description").textContent = copy[content.description];
  sectionTitle.textContent = copy[content.heading];
  sectionSubtitle.textContent = copy[content.subtitle];

  if (state.mode === "letters") lessonCountText.textContent = copy.letterCount;
  if (state.mode === "numbers") lessonCountText.textContent = copy.numberCount;
  if (state.mode === "animals") sectionSubtitle.textContent = copy.animalsSubtitle;
  if (state.mode === "vehicles") {
    lessonCountText.textContent = copy.vehicleCount;
    sectionSubtitle.textContent = copy.vehiclesSubtitle;
  }

  animalActions.hidden = state.mode !== "animals";
  categoryFilters.hidden = state.mode !== "animals";
  lessonCount.closest(".toolbar-actions").hidden =
    state.mode === "animals" || state.mode === "games";
  emptyState.hidden = true;
  learningShell.hidden = state.mode === "games";
  gameShell.hidden = state.mode !== "games";
  document.querySelector(".hero-tip span:last-child").textContent =
    state.mode === "games" ? copy.gameTip : copy.tapTip;

  document.querySelectorAll(".nav-tab").forEach((button) => {
    const isActive = button.dataset.mode === state.mode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function render() {
  updateStaticCopy();
  updateModeCopy();
  if (state.mode === "letters") renderLetters();
  if (state.mode === "numbers") renderNumbers();
  if (state.mode === "animals") renderAnimals();
  if (state.mode === "vehicles") renderVehicles();
  if (state.mode === "games") renderGame();
}

function setMode(mode) {
  if (!MODE_CONTENT[mode] || mode === state.mode) return;
  if (state.mode === "games" || mode === "games") resetGameState();
  stopSpeaking();
  state.mode = mode;
  state.search = "";
  animalSearch.value = "";
  savePreference("be-hoc-vui-mode", mode);
  render();
}

function setLanguage(language) {
  if (!COPY[language] || language === state.language) return;
  if (state.mode === "games") resetGameState();
  stopSpeaking();
  state.language = language;
  savePreference("be-hoc-vui-language", language);
  render();
}

function refreshVoices() {
  if (!("speechSynthesis" in window)) return;
  voices = window.speechSynthesis.getVoices();
}

function chooseVoice(language) {
  if (!voices.length) refreshVoices();
  const prefix = language === "vi" ? "vi" : "en";
  const matches = voices.filter((voice) => voice.lang.toLowerCase().startsWith(prefix));
  if (!matches.length) return null;

  const score = (voice) => {
    let total = 0;
    if (/natural|neural|premium|enhanced/i.test(voice.name)) total += 5;
    if (/google|microsoft|samantha|hoai|linh/i.test(voice.name)) total += 2;
    if (voice.localService) total += 1;
    return total;
  };
  return [...matches].sort((a, b) => score(b) - score(a))[0];
}

function clearSpeakingState() {
  clearTimeout(speechTimer);
  speechTimer = null;
  if (activeCard) {
    activeCard.classList.remove("is-speaking", "is-acting");
  }
  activeCard = null;
  activeUtterance = null;
  activeAudio = null;
}

function showToast(text) {
  clearTimeout(toastTimer);
  toastText.textContent = text;
  toast.classList.add("show");
}

function hideToast() {
  clearTimeout(toastTimer);
  toast.classList.remove("show");
}

function stopSpeaking() {
  playbackToken += 1;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  clearSpeakingState();
  hideToast();
}

function voiceClipPath(type, id) {
  if (type === "letter") {
    return `assets/audio/letters/${id.toLowerCase()}-${state.language}.mp3?v=9`;
  }
  if (type === "number") {
    return `assets/audio/numbers/${id}-${state.language}.mp3?v=9`;
  }
  if (type === "animal") {
    return `assets/audio/animals/${id}-${state.language}.mp3?v=9`;
  }
  if (type === "vehicle") {
    return `assets/audio/vehicles/${id}-${state.language}.mp3?v=1`;
  }
  return "";
}

function speakWithBrowser(text, token, onDone) {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    onDone(false);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = state.language === "vi" ? "vi-VN" : "en-GB";
  utterance.rate = state.language === "vi" ? 0.82 : 0.84;
  utterance.pitch = 1.08;
  utterance.volume = 1;
  const voice = chooseVoice(state.language);
  if (voice) utterance.voice = voice;

  activeUtterance = utterance;

  utterance.onend = () => {
    if (activeUtterance !== utterance || token !== playbackToken) return;
    activeUtterance = null;
    onDone(true);
  };

  utterance.onerror = (event) => {
    if (activeUtterance !== utterance || event.error === "canceled" || event.error === "interrupted") {
      return;
    }
    activeUtterance = null;
    onDone(false);
  };

  window.speechSynthesis.speak(utterance);
}

function playAudioFile(source, token) {
  return new Promise((resolve, reject) => {
    if (!source) {
      reject(new Error("No audio source"));
      return;
    }
    const audio = new Audio(source);
    let settled = false;
    activeAudio = audio;
    audio.preload = "auto";
    audio.volume = 0.96;

    const finish = (success) => {
      if (settled) return;
      settled = true;
      if (activeAudio === audio) activeAudio = null;
      if (token !== playbackToken) return reject(new Error("Playback cancelled"));
      if (success) resolve();
      else reject(new Error("Audio failed"));
    };

    audio.addEventListener("ended", () => finish(true), { once: true });
    audio.addEventListener("error", () => finish(false), { once: true });
    audio.play().catch(() => finish(false));
  });
}

function playAudioOnly(source) {
  stopSpeaking();
  const token = ++playbackToken;
  playAudioFile(source, token).catch(() => {
    // The replay button remains available when a clip cannot be played.
  });
}

async function playSources(sources, text, card) {
  stopSpeaking();
  const token = ++playbackToken;
  const copy = COPY[state.language];
  const versionedSources = sources.map((source) =>
    source?.includes("/animal-cards/") ? `${source}?v=3` : source,
  );
  const [voiceSource, ...effectSources] = versionedSources;

  activeCard = card || null;
  if (card) card.classList.add("is-speaking", "is-acting");
  if (text) showToast(text);

  let voicePlayed = false;
  try {
    await playAudioFile(voiceSource, token);
    voicePlayed = true;
  } catch {
    if (token !== playbackToken) return;
    voicePlayed = await new Promise((resolve) => {
      speakWithBrowser(text, token, resolve);
    });
  }

  for (const source of effectSources) {
    if (token !== playbackToken || !source) continue;
    try {
      await playAudioFile(source, token);
    } catch {
      // A missing sound effect should not prevent the next interaction.
    }
  }

  if (token !== playbackToken) return;
  if (text && !voicePlayed && !effectSources.some(Boolean)) {
    showToast(copy.noSound);
  }
  toastTimer = setTimeout(hideToast, 650);
  speechTimer = setTimeout(() => {
    if (token !== playbackToken) return;
    if (activeCard) activeCard.classList.remove("is-speaking", "is-acting");
    activeCard = null;
  }, 900);
}

function teachCard(card) {
  const type = card.dataset.itemType;
  const copy = COPY[state.language];
  if (type === "letter") {
    const item = LETTERS.find((entry) => entry.letter === card.dataset.id);
    if (!item) return;
    const letterNames = state.language === "vi" ? VI_LETTER_NAMES : EN_LETTER_NAMES;
    playSources(
      [voiceClipPath("letter", item.letter)],
      copy.letterSpeech(item.letter, letterNames[item.letter]),
      card,
    );
  }
  if (type === "number") {
    const number = Number(card.dataset.id);
    const word = NUMBER_WORDS[state.language][number];
    playSources(
      [voiceClipPath("number", number)],
      copy.numberSpeech(number, word),
      card,
    );
  }
  if (type === "animal") {
    const animal = ANIMALS.find((entry) => entry.id === card.dataset.id);
    if (!animal) return;
    const action = getAnimalActivity(animal);
    const sound = ANIMAL_MEDIA.sounds[animal.id];
    const playback = ANIMAL_MEDIA.playback?.[animal.id]?.[state.language];
    const animalCall = sound
      ? state.language === "vi"
        ? action.callVi
        : action.callEn
      : "";
    const spokenText = copy.animalSpeech(animal[state.language]);
    playSources(
      playback
        ? [playback]
        : [voiceClipPath("animal", animal.id), sound?.file || ""],
      animalCall ? `${spokenText} ${animalCall}` : spokenText,
      card,
    );
  }
  if (type === "vehicle") {
    const vehicle = VEHICLES.find((entry) => entry.id === card.dataset.id);
    if (!vehicle) return;
    const spokenText = COPY[state.language].animalSpeech(vehicle[state.language]);
    playSources([voiceClipPath("vehicle", vehicle.id)], spokenText, card);
  }
}

function resetGameState() {
  clearTimeout(gameState.nextTimer);
  gameState.nextTimer = null;
  gameState.active = false;
  gameState.finished = false;
  gameState.index = 0;
  gameState.score = 0;
  gameState.streak = 0;
  gameState.correct = 0;
  gameState.locked = false;
  gameState.questions = [];
  gameState.current = null;
}

function chooseQuestionAnimal(type, unusedAnimals) {
  const candidates =
    type === "sound"
      ? unusedAnimals.filter((animal) => ANIMAL_MEDIA.sounds[animal.id]?.file)
      : unusedAnimals;
  const pool = candidates.length ? candidates : ANIMALS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildGameQuestions() {
  const types = shuffle(GAME_TYPES);
  const familiarAnimals = ANIMALS.filter((animal) => FAMILIAR_ANIMAL_IDS.has(animal.id));
  const unusedAnimals = shuffle(familiarAnimals);
  return types.map((type, index) => {
    const animal = chooseQuestionAnimal(type, unusedAnimals);
    const animalIndex = unusedAnimals.findIndex((entry) => entry.id === animal.id);
    if (animalIndex >= 0) unusedAnimals.splice(animalIndex, 1);
    const optionCount = index < 2 ? 2 : index < 4 ? 3 : 4;
    const distractors = shuffle(
      familiarAnimals.filter((entry) => entry.id !== animal.id),
    ).slice(0, optionCount - 1);
    const question = {
      type,
      animal,
      optionAnimals: shuffle([animal, ...distractors]),
    };
    if (type === "count") {
      question.count = 2 + Math.floor(Math.random() * 8);
      const numberChoices = shuffle(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((number) => number !== question.count),
      ).slice(0, 3);
      question.numberOptions = shuffle([question.count, ...numberChoices]);
    }
    if (type === "letter") {
      const correctLetter = animalInitial(animal);
      const extraLetters = shuffle(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter((letter) => letter !== correctLetter),
      ).slice(0, 3);
      question.letterOptions = shuffle([correctLetter, ...extraLetters]);
    }
    return question;
  });
}

function renderGameStart() {
  const copy = COPY[state.language];
  gameStatus.hidden = true;
  gameBoard.innerHTML = `
    <div class="game-start">
      <div class="game-start-art" aria-hidden="true">
        <span class="game-trophy">🏆</span>
        <span class="game-orbit-star orbit-one">★</span>
        <span class="game-orbit-star orbit-two">★</span>
        <span class="game-orbit-star orbit-three">✦</span>
      </div>
      <div class="game-start-copy">
        <span class="game-eyebrow">${copy.gameStartEyebrow}</span>
        <h2>${copy.gameStartTitle}</h2>
        <p>${copy.gameStartText}</p>
        <div class="game-type-list" aria-hidden="true">
          <span>🔊 ${copy.gameFeatureListen}</span>
          <span>👆 ${copy.gameFeatureTap}</span>
          <span>★ ${copy.gameFeatureStar}</span>
        </div>
        <button class="game-primary-button" type="button" data-game-action="start">
          <span aria-hidden="true">▶</span>
          ${copy.startGame}
        </button>
        <span class="game-best">${fillCopy(copy.gameBest, { score: gameState.best })}</span>
      </div>
    </div>`;
}

function questionPrompt(type) {
  const copy = COPY[state.language];
  return {
    sound: copy.gameSoundPrompt,
    listen: copy.gameListenPrompt,
    photo: copy.gamePhotoPrompt,
    count: copy.gameCountPrompt,
    letter: copy.gameLetterPrompt,
  }[type];
}

function typeLabel(type) {
  const copy = COPY[state.language];
  return {
    sound: copy.gameTypeSound,
    listen: copy.gameTypeListen,
    photo: copy.gameTypePhoto,
    count: copy.gameTypeCount,
    letter: copy.gameTypeLetter,
  }[type];
}

function gameQuestionAudio(question) {
  if (question.type === "sound") {
    return ANIMAL_MEDIA.sounds[question.animal.id]?.file || "";
  }
  if (question.type === "listen") {
    return voiceClipPath("animal", question.animal.id);
  }
  return "";
}

function playQuestionAudio() {
  const source = gameState.current ? gameQuestionAudio(gameState.current) : "";
  if (source) playAudioOnly(source);
}

function gameVisualMarkup(question) {
  const copy = COPY[state.language];
  if (question.type === "sound" || question.type === "listen") {
    return `
      <div class="game-audio-visual">
        <button class="sound-orb" type="button" data-game-action="replay-audio" aria-label="${copy.replaySound}">
          <span class="sound-halo halo-one" aria-hidden="true"></span>
          <span class="sound-halo halo-two" aria-hidden="true"></span>
          <span class="sound-orb-icon" aria-hidden="true">🔊</span>
          <span class="sound-orb-label">${copy.replaySound}</span>
        </button>
      </div>`;
  }

  if (question.type === "count") {
    const columns = Math.min(3, Math.ceil(Math.sqrt(question.count)));
    const photo = ANIMAL_MEDIA.photos[question.animal.id];
    return `
      <div class="count-game-scene" style="--count-columns:${columns}">
        ${Array.from(
          { length: question.count },
          () => `<img class="count-game-photo" src="${photo}" alt="" draggable="false" />`,
        ).join("")}
      </div>`;
  }

  return `
    <div class="game-photo-frame">
      <img class="game-main-photo" src="${ANIMAL_MEDIA.photos[question.animal.id]}" alt="" draggable="false" />
    </div>`;
}

function gameOptionsMarkup(question) {
  if (question.type === "sound" || question.type === "listen") {
    return question.optionAnimals
      .map(
        (animal) => `
          <button
            class="game-option game-photo-option"
            type="button"
            data-answer="${animal.id}"
            aria-label="${animal[state.language]}"
          >
            <img src="${ANIMAL_MEDIA.photos[animal.id]}" alt="" draggable="false" />
            <span class="game-photo-answer">${animal[state.language]}</span>
          </button>`,
      )
      .join("");
  }

  if (question.type === "photo") {
    return question.optionAnimals
      .map(
        (animal) => `
          <button class="game-option game-text-option" type="button" data-answer="${animal.id}">
            ${animal[state.language]}
          </button>`,
      )
      .join("");
  }

  if (question.type === "count") {
    return question.numberOptions
      .map(
        (number) => `
          <button class="game-option game-number-option" type="button" data-answer="${number}">
            ${number}
          </button>`,
      )
      .join("");
  }

  return question.letterOptions
    .map(
      (letter) => `
        <button class="game-option game-letter-option" type="button" data-answer="${letter}">
          ${letter}
        </button>`,
    )
    .join("");
}

function updateGameStatus() {
  const copy = COPY[state.language];
  const current = Math.min(gameState.index + 1, GAME_TOTAL);
  gameRoundLabel.textContent = fillCopy(copy.gameRound, {
    current,
    total: GAME_TOTAL,
  });
  gameScoreLabel.textContent = fillCopy(copy.gameScore, { score: gameState.score });
  gameStreak.textContent = fillCopy(copy.gameStreak, { count: gameState.streak });
  gameProgressBar.style.width = `${(current / GAME_TOTAL) * 100}%`;
}

function renderGameQuestion() {
  const copy = COPY[state.language];
  const question = gameState.current;
  if (!question) {
    renderGameStart();
    return;
  }
  gameStatus.hidden = false;
  updateGameStatus();
  const choiceCount =
    question.type === "count"
      ? question.numberOptions.length
      : question.type === "letter"
        ? question.letterOptions.length
        : question.optionAnimals.length;
  gameBoard.innerHTML = `
    <div class="game-round">
      <div class="game-question-head">
        <span class="game-type-pill">${typeLabel(question.type)}</span>
        <span class="game-live-score">${gameState.score} ★</span>
      </div>
      <h2 class="game-prompt">${questionPrompt(question.type)}</h2>
      <div class="game-visual">${gameVisualMarkup(question)}</div>
      <div class="game-options options-${choiceCount}">${gameOptionsMarkup(question)}</div>
      <div class="game-feedback" id="game-feedback" aria-live="polite"></div>
    </div>`;
  gameState.locked = false;
  gameBoard.scrollIntoView({ behavior: "smooth", block: "start" });
  playQuestionAudio();
}

function startGame() {
  resetGameState();
  gameState.active = true;
  gameState.questions = buildGameQuestions();
  gameState.index = 0;
  gameState.current = gameState.questions[0];
  renderGameQuestion();
}

function answerValue(question) {
  if (question.type === "count") return String(question.count);
  if (question.type === "letter") return animalInitial(question.animal);
  return question.animal.id;
}

function answerName(question) {
  if (question.type === "count") return String(question.count);
  if (question.type === "letter") return animalInitial(question.animal);
  return question.animal[state.language];
}

function gameFeedbackAudio(question) {
  if (question.type === "count") {
    return {
      source: voiceClipPath("number", question.count),
      text: NUMBER_WORDS[state.language][question.count],
    };
  }
  if (question.type === "letter") {
    return {
      source: voiceClipPath("letter", animalInitial(question.animal)),
      text: animalInitial(question.animal),
    };
  }
  return {
    source: voiceClipPath("animal", question.animal.id),
    text: question.animal[state.language],
  };
}

function answerGame(selectedButton) {
  if (gameState.locked || !gameState.current) return;
  const question = gameState.current;
  const expected = answerValue(question);
  const isCorrect = selectedButton.dataset.answer === expected;
  const correctButton = gameBoard.querySelector(`[data-answer="${expected}"]`);
  const feedback = document.querySelector("#game-feedback");
  const copy = COPY[state.language];

  if (isCorrect) {
    gameState.locked = true;
    gameBoard.querySelectorAll(".game-option").forEach((button) => {
      button.disabled = true;
    });
    selectedButton.classList.add("correct");
    if (correctButton) correctButton.classList.add("correct");
    gameState.score += 1;
    gameState.streak += 1;
    gameState.correct += 1;
    feedback.className = "game-feedback correct";
    feedback.textContent = copy.gameCorrect;
    updateGameStatus();

    const answerAudio = gameFeedbackAudio(question);
    const sound = ANIMAL_MEDIA.sounds[question.animal.id]?.file;
    const playback = ANIMAL_MEDIA.playback?.[question.animal.id]?.[state.language];
    playSources(
      playback ? [playback] : [answerAudio.source, sound || ""],
      answerAudio.text,
      null,
    );

    clearTimeout(gameState.nextTimer);
    gameState.nextTimer = setTimeout(() => {
      gameState.index += 1;
      if (gameState.index >= GAME_TOTAL) {
        finishGame();
        return;
      }
      gameState.current = gameState.questions[gameState.index];
      renderGameQuestion();
    }, 2200);
  } else {
    selectedButton.disabled = true;
    selectedButton.classList.add("wrong");
    gameState.streak = 0;
    feedback.className = "game-feedback wrong";
    feedback.textContent = copy.gameWrong;
    updateGameStatus();
    clearTimeout(gameState.nextTimer);
    gameState.nextTimer = setTimeout(playQuestionAudio, 700);
  }
}

function finishGame() {
  const copy = COPY[state.language];
  stopSpeaking();
  gameState.active = false;
  gameState.finished = true;
  gameStatus.hidden = true;

  const previousBest = gameState.best;
  if (gameState.score > gameState.best) {
    gameState.best = gameState.score;
    savePreference("be-hoc-vui-sound-game-best", gameState.best);
  }
  const stars = gameState.correct >= 5 ? 3 : gameState.correct >= 3 ? 2 : 1;
  gameBoard.innerHTML = `
    <div class="game-finished">
      <div class="game-confetti" aria-hidden="true">
        ${Array.from(
          { length: 14 },
          (_, index) =>
            `<span style="--i:${index};--x:${(index * 37) % 100}%;--d:${(index % 5) * 0.13}s">${index % 2 ? "●" : "★"}</span>`,
        ).join("")}
      </div>
      <div class="game-result-stars" aria-label="${stars} ${copy.gameStarsUnit}">
        ${[0, 1, 2]
          .map((index) => `<span class="${index < stars ? "earned" : ""}">★</span>`)
          .join("")}
      </div>
      <span class="game-eyebrow">${gameState.score > previousBest ? copy.gameNewBest : copy.gameResultEyebrow}</span>
      <h2>${copy.gameCompleteTitle}</h2>
      <p>${fillCopy(copy.gameCompleteText, {
        correct: gameState.correct,
        total: GAME_TOTAL,
        score: gameState.score,
      })}</p>
      <div class="game-result-stats">
        <div><strong>${gameState.correct}/${GAME_TOTAL}</strong><span>${copy.gameResultCorrect}</span></div>
        <div><strong>${gameState.score}</strong><span>${copy.gameResultScore}</span></div>
        <div><strong>${gameState.best}</strong><span>${copy.gameResultBest}</span></div>
      </div>
      <button class="game-primary-button" type="button" data-game-action="start">
        <span aria-hidden="true">↻</span>
        ${copy.playAgain}
      </button>
    </div>`;
  gameBoard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderGame() {
  if (gameState.finished) return;
  if (gameState.active) {
    renderGameQuestion();
    return;
  }
  renderGameStart();
}

gameBoard.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-game-action]");
  if (actionButton) {
    if (actionButton.dataset.gameAction === "start") startGame();
    if (actionButton.dataset.gameAction === "replay-audio") {
      actionButton.classList.remove("is-ringing");
      void actionButton.offsetWidth;
      actionButton.classList.add("is-ringing");
      playQuestionAudio();
    }
    return;
  }
  const answerButton = event.target.closest(".game-option");
  if (answerButton && !answerButton.disabled) answerGame(answerButton);
});

document.querySelectorAll(".nav-tab").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".learning-card");
  if (card) teachCard(card);
});

grid.addEventListener(
  "error",
  (event) => {
    if (event.target.matches(".emoji-image, .animal-photo, .vehicle-photo")) {
      event.target.remove();
    }
  },
  true,
);

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    stopSpeaking();
    state.category = button.dataset.category;
    document.querySelectorAll(".filter-chip").forEach((chip) => {
      const isActive = chip === button;
      chip.classList.toggle("active", isActive);
      chip.setAttribute("aria-pressed", String(isActive));
    });
    renderAnimals();
  });
});

animalSearch.addEventListener("input", () => {
  stopSpeaking();
  state.search = animalSearch.value;
  renderAnimals();
});

randomAnimalButton.addEventListener("click", () => {
  const visible = getFilteredAnimals();
  if (!visible.length) return;
  const animal = visible[Math.floor(Math.random() * visible.length)];
  const card = grid.querySelector(`[data-id="${animal.id}"]`);
  if (!card) return;
  stopSpeaking();
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  card.focus({ preventScroll: true });
  teachCard(card);
});

document.querySelector("#clear-search").addEventListener("click", () => {
  state.search = "";
  animalSearch.value = "";
  renderAnimals();
  animalSearch.focus();
});

document.querySelector("#toast-close").addEventListener("click", stopSpeaking);

document.querySelector(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  if (state.mode !== "letters") setMode("letters");
  document.querySelector(".hero").scrollIntoView({ behavior: "smooth", block: "start" });
});

function isStandaloneApp() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.navigator.standalone === true
  );
}

function updateInstallVisibility() {
  const standalone = isStandaloneApp();
  installButton.hidden = standalone;
  if (standalone) installHelp.hidden = true;
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPromptEvent = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (installPromptEvent) {
    installPromptEvent.prompt();
    await installPromptEvent.userChoice.catch(() => undefined);
    installPromptEvent = null;
    return;
  }
  installHelp.hidden = !installHelp.hidden;
  installButton.setAttribute("aria-expanded", String(!installHelp.hidden));
});

window.addEventListener("appinstalled", () => {
  installPromptEvent = null;
  installButton.hidden = true;
  installHelp.hidden = true;
});

if ("speechSynthesis" in window) {
  refreshVoices();
  window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

restorePreferences();
updateCountBadges();
render();
updateInstallVisibility();

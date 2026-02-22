export enum Suit {
  WANDS = 'Wands',
  CUPS = 'Cups',
  SWORDS = 'Swords',
  PENTACLES = 'Pentacles',
  MAJOR = 'Major Arcana'
}

export interface TarotCard {
  id: string;
  name: string;
  suit: Suit;
  value: number | string;
  meaning: string;
  description: string;
  imageSeed: string;
}

export const TAROT_DECK: TarotCard[] = [
  // Major Arcana
  { id: '0', name: 'The Fool', suit: Suit.MAJOR, value: 0, meaning: 'New beginnings, optimism, trust in life.', description: 'A young man stands on the edge of a cliff, looking up at the sky with a small dog at his heels.', imageSeed: 'fool' },
  { id: '1', name: 'The Magician', suit: Suit.MAJOR, value: 1, meaning: 'Action, power, manifestation.', description: 'A figure with one hand pointing to the sky and the other to the earth, surrounded by the four symbols of the minor arcana.', imageSeed: 'magician' },
  { id: '2', name: 'The High Priestess', suit: Suit.MAJOR, value: 2, meaning: 'Intuition, mystery, subconscious mind.', description: 'A woman sitting between two pillars, one black and one white, holding a scroll.', imageSeed: 'priestess' },
  { id: '3', name: 'The Empress', suit: Suit.MAJOR, value: 3, meaning: 'Fertility, nature, abundance.', description: 'A regal woman sitting in a lush garden, wearing a crown of stars.', imageSeed: 'empress' },
  { id: '4', name: 'The Emperor', suit: Suit.MAJOR, value: 4, meaning: 'Authority, structure, solid foundation.', description: 'A stern man sitting on a stone throne decorated with ram heads.', imageSeed: 'emperor' },
  { id: '5', name: 'The Hierophant', suit: Suit.MAJOR, value: 5, meaning: 'Tradition, spiritual wisdom, conformity.', description: 'A religious figure sitting between two pillars, gesturing a blessing.', imageSeed: 'hierophant' },
  { id: '6', name: 'The Lovers', suit: Suit.MAJOR, value: 6, meaning: 'Love, harmony, relationships, choices.', description: 'A man and a woman standing beneath an angel in a garden.', imageSeed: 'lovers' },
  { id: '7', name: 'The Chariot', suit: Suit.MAJOR, value: 7, meaning: 'Control, willpower, victory, determination.', description: 'A warrior standing in a chariot pulled by two sphinxes.', imageSeed: 'chariot' },
  { id: '8', name: 'Strength', suit: Suit.MAJOR, value: 8, meaning: 'Courage, persuasion, influence, compassion.', description: 'A woman calmly closing the jaws of a lion.', imageSeed: 'strength' },
  { id: '9', name: 'The Hermit', suit: Suit.MAJOR, value: 9, meaning: 'Soul-searching, introspection, being alone, inner guidance.', description: 'An old man standing on a mountain peak, holding a lantern.', imageSeed: 'hermit' },
  { id: '10', name: 'Wheel of Fortune', suit: Suit.MAJOR, value: 10, meaning: 'Good luck, karma, life cycles, destiny, a turning point.', description: 'A large wheel inscribed with mysterious symbols, surrounded by four winged creatures.', imageSeed: 'wheel' },
  { id: '11', name: 'Justice', suit: Suit.MAJOR, value: 11, meaning: 'Justice, fairness, truth, cause and effect, law.', description: 'A figure sitting on a throne, holding scales in one hand and a sword in the other.', imageSeed: 'justice' },
  { id: '12', name: 'The Hanged Man', suit: Suit.MAJOR, value: 12, meaning: 'Pause, surrender, letting go, new perspectives.', description: 'A man hanging upside down from a tree by one foot, his face peaceful.', imageSeed: 'hangedman' },
  { id: '13', name: 'Death', suit: Suit.MAJOR, value: 13, meaning: 'Endings, change, transformation, transition.', description: 'A skeleton in black armor riding a white horse.', imageSeed: 'death' },
  { id: '14', name: 'Temperance', suit: Suit.MAJOR, value: 14, meaning: 'Balance, moderation, patience, purpose.', description: 'An angel pouring liquid between two cups.', imageSeed: 'temperance' },
  { id: '15', name: 'The Devil', suit: Suit.MAJOR, value: 15, meaning: 'Shadow self, attachment, addiction, restriction, sexuality.', description: 'A horned creature sitting on a pedestal, with two people chained to it.', imageSeed: 'devil' },
  { id: '16', name: 'The Tower', suit: Suit.MAJOR, value: 16, meaning: 'Sudden change, upheaval, chaos, revelation, awakening.', description: 'A tall tower struck by lightning, with people falling from it.', imageSeed: 'tower' },
  { id: '17', name: 'The Star', suit: Suit.MAJOR, value: 17, meaning: 'Hope, faith, purpose, renewal, spirituality.', description: 'A naked woman kneeling by a pool, pouring water from two jugs under a large star.', imageSeed: 'star' },
  { id: '18', name: 'The Moon', suit: Suit.MAJOR, value: 18, meaning: 'Illusion, fear, anxiety, subconscious, intuition.', description: 'A path winding between two towers under a full moon, with a dog, a wolf, and a crayfish.', imageSeed: 'moon' },
  { id: '19', name: 'The Sun', suit: Suit.MAJOR, value: 19, meaning: 'Positivity, fun, warmth, success, vitality.', description: 'A young child riding a white horse under a bright sun.', imageSeed: 'sun' },
  { id: '20', name: 'Judgement', suit: Suit.MAJOR, value: 20, meaning: 'Judgement, rebirth, inner calling, absolution.', description: 'An angel blowing a trumpet, as people rise from their graves.', imageSeed: 'judgement' },
  { id: '21', name: 'The World', suit: Suit.MAJOR, value: 21, meaning: 'Completion, integration, accomplishment, travel.', description: 'A figure dancing inside a wreath, surrounded by four creatures.', imageSeed: 'world' },

  // Minor Arcana - Wands (Action, Fire)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `w${i + 1}`,
    name: `${i + 1 === 1 ? 'Ace' : i + 1} of Wands`,
    suit: Suit.WANDS,
    value: i + 1,
    meaning: `Wands represent action and inspiration. The ${i + 1} signifies ${['new growth', 'planning', 'waiting', 'celebration', 'competition', 'victory', 'defense', 'speed', 'resilience', 'burden'][i]}.`,
    description: `A scene depicting ${i + 1} wooden wands in a ${['burst of energy', 'strategic position', 'waiting stance', 'festive setting', 'chaotic struggle', 'triumphant parade', 'defensive wall', 'swift flight', 'weary but firm stand', 'heavy load'][i]}.`,
    imageSeed: `wands-${i + 1}`
  })),
  { id: 'w11', name: 'Page of Wands', suit: Suit.WANDS, value: 'Page', meaning: 'Inspiration, ideas, discovery, limitless potential.', description: 'A young person standing in a desert, looking at a sprouting wand.', imageSeed: 'wands-page' },
  { id: 'w12', name: 'Knight of Wands', suit: Suit.WANDS, value: 'Knight', meaning: 'Energy, passion, lust, action, adventure, impulsiveness.', description: 'A knight on a charging horse, wearing armor decorated with salamanders.', imageSeed: 'wands-knight' },
  { id: 'w13', name: 'Queen of Wands', suit: Suit.WANDS, value: 'Queen', meaning: 'Courage, confidence, independence, social butterfly, determination.', description: 'A queen sitting on a throne with lions, holding a sunflower and a wand.', imageSeed: 'wands-queen' },
  { id: 'w14', name: 'King of Wands', suit: Suit.WANDS, value: 'King', meaning: 'Natural-born leader, vision, entrepreneur, honor.', description: 'A king sitting on a throne, holding a flowering wand, with a small lizard at his feet.', imageSeed: 'wands-king' },

  // Cups (Emotion, Water)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `c${i + 1}`,
    name: `${i + 1 === 1 ? 'Ace' : i + 1} of Cups`,
    suit: Suit.CUPS,
    value: i + 1,
    meaning: `Cups represent emotions and relationships. The ${i + 1} signifies ${['overflowing love', 'partnership', 'celebration', 'apathy', 'loss', 'nostalgia', 'choices', 'abandonment', 'satisfaction', 'happiness'][i]}.`,
    description: `A scene depicting ${i + 1} golden cups in a ${['divine hand', 'shared toast', 'dance of joy', 'moment of boredom', 'grieving state', 'childhood garden', 'cloud of dreams', 'journey away', 'feast of plenty', 'family rainbow'][i]}.`,
    imageSeed: `cups-${i + 1}`
  })),
  { id: 'c11', name: 'Page of Cups', suit: Suit.CUPS, value: 'Page', meaning: 'Creative opportunities, intuitive messages, curiosity, possibility.', description: 'A young person holding a cup with a fish popping out of it.', imageSeed: 'cups-page' },
  { id: 'c12', name: 'Knight of Cups', suit: Suit.CUPS, value: 'Knight', meaning: 'Creativity, romance, charm, imagination, beauty.', description: 'A knight riding slowly on a white horse, holding out a cup as if in an offering.', imageSeed: 'cups-knight' },
  { id: 'c13', name: 'Queen of Cups', suit: Suit.CUPS, value: 'Queen', meaning: 'Compassionate, caring, emotionally stable, intuitive, in flow.', description: 'A queen sitting on a throne by the sea, looking at an ornate cup.', imageSeed: 'cups-queen' },
  { id: 'c14', name: 'King of Cups', suit: Suit.CUPS, value: 'King', meaning: 'Emotionally balanced, focused, compassionate.', description: 'A king sitting on a throne that floats on the ocean, holding a cup and a scepter.', imageSeed: 'cups-king' },

  // Swords (Intellect, Air)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `s${i + 1}`,
    name: `${i + 1 === 1 ? 'Ace' : i + 1} of Swords`,
    suit: Suit.SWORDS,
    value: i + 1,
    meaning: `Swords represent the mind and conflict. The ${i + 1} signifies ${['mental clarity', 'indecision', 'heartbreak', 'rest', 'betrayal', 'transition', 'deception', 'imprisonment', 'nightmares', 'defeat'][i]}.`,
    description: `A scene depicting ${i + 1} sharp swords in a ${['crowned hand', 'cross of balance', 'pierced heart', 'quiet tomb', 'stolen victory', 'boat journey', 'sneaky escape', 'bound figure', 'sleepless bed', 'fallen warrior'][i]}.`,
    imageSeed: `swords-${i + 1}`
  })),
  { id: 's11', name: 'Page of Swords', suit: Suit.SWORDS, value: 'Page', meaning: 'New ideas, curiosity, thirst for knowledge, new ways of communicating.', description: 'A young person standing on a windy hill, holding a sword with both hands.', imageSeed: 'swords-page' },
  { id: 's12', name: 'Knight of Swords', suit: Suit.SWORDS, value: 'Knight', meaning: 'Ambitious, action-oriented, driven to succeed, fast-thinking.', description: 'A knight on a charging horse, sword held high, riding into the wind.', imageSeed: 'swords-knight' },
  { id: 's13', name: 'Queen of Swords', suit: Suit.SWORDS, value: 'Queen', meaning: 'Independent, unbiased judgement, clear communication, direct.', description: 'A queen sitting on a throne decorated with butterflies, holding a sword upright.', imageSeed: 'swords-queen' },
  { id: 's14', name: 'King of Swords', suit: Suit.SWORDS, value: 'King', meaning: 'Mental clarity, intellectual power, authority, truth.', description: 'A king sitting on a throne, holding a sword, looking straight ahead with a stern expression.', imageSeed: 'swords-king' },

  // Pentacles (Material, Earth)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `p${i + 1}`,
    name: `${i + 1 === 1 ? 'Ace' : i + 1} of Pentacles`,
    suit: Suit.PENTACLES,
    value: i + 1,
    meaning: `Pentacles represent the material world and finances. The ${i + 1} signifies ${['new opportunity', 'balance', 'teamwork', 'frugality', 'poverty', 'generosity', 'patience', 'apprenticeship', 'luxury', 'legacy'][i]}.`,
    description: `A scene depicting ${i + 1} golden pentacles in a ${['garden hand', 'juggling act', 'cathedral build', 'hoarding stance', 'snowy street', 'charitable gift', 'growing vine', 'busy workshop', 'private estate', 'family archway'][i]}.`,
    imageSeed: `pentacles-${i + 1}`
  })),
  { id: 'p11', name: 'Page of Pentacles', suit: Suit.PENTACLES, value: 'Page', meaning: 'Manifestation, financial opportunity, skill development.', description: 'A young person standing in a field, carefully holding a single pentacle.', imageSeed: 'pentacles-page' },
  { id: 'p12', name: 'Knight of Pentacles', suit: Suit.PENTACLES, value: 'Knight', meaning: 'Hard work, productivity, routine, conservatism.', description: 'A knight on a sturdy horse, looking at a pentacle, moving slowly and deliberately.', imageSeed: 'pentacles-knight' },
  { id: 'p13', name: 'Queen of Pentacles', suit: Suit.PENTACLES, value: 'Queen', meaning: 'Nurturing, practical, providing financially, a working parent.', description: 'A queen sitting on a throne in a lush garden, holding a pentacle in her lap.', imageSeed: 'pentacles-queen' },
  { id: 'p14', name: 'King of Pentacles', suit: Suit.PENTACLES, value: 'King', meaning: 'Wealth, business, leadership, security, discipline, abundance.', description: 'A king sitting on a throne decorated with bulls, surrounded by vines and flowers.', imageSeed: 'pentacles-king' },
];

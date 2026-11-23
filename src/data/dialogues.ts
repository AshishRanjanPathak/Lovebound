import { DialogueSequence } from '../types/dialogue';

export const SAMPLE_INTRO_DIALOGUE: DialogueSequence = {
  id: 'prologue-gremlin-encounter',
  title: 'Encounter in the Whispering Grove',
  nodes: [
    {
      id: 'd1',
      speaker: 'heroine',
      speakerName: 'Astraea',
      speakerTitle: 'Maiden of the Staff of Love',
      portraitAssetId: 'heroine-portrait-normal',
      text: 'Stay close to me, Elinore. The mist here tastes of foul manipulation... Someone has disturbed the ancient seal.',
      expression: 'determined',
      voiceSfx: 'feminine',
    },
    {
      id: 'd2',
      speaker: 'princess',
      speakerName: 'Princess Elinore',
      speakerTitle: 'Beloved Star',
      portraitAssetId: 'princess-portrait',
      text: 'I feel it too, Astraea. My heart stings when I gaze into the grove. But as long as my hand is in yours, I am not afraid.',
      expression: 'loving',
      voiceSfx: 'cute',
    },
    {
      id: 'd3',
      speaker: 'hata',
      speakerName: 'HATA',
      speakerTitle: 'The Deceiver of Gremlin Woods',
      portraitAssetId: 'boss-hata-portrait',
      text: 'Hehehe... Sweet words, pretty maiden! But love is so fragile, so easily twisted! Leave the princess behind, or Gremlin Woods will be your grave!',
      expression: 'smug',
      voiceSfx: 'gremlin',
    },
    {
      id: 'd4',
      speaker: 'heroine',
      speakerName: 'Astraea',
      speakerTitle: 'Maiden of the Staff of Love',
      portraitAssetId: 'heroine-portrait-normal',
      text: 'Never! Our bond cannot be severed by your petty shadows. Ready your staff, Elinore — we light our own path!',
      expression: 'determined',
      voiceSfx: 'feminine',
      isEnd: true,
    },
  ],
};

export const SAMPLE_BUNNY_DIALOGUE: DialogueSequence = {
  id: 'enchanted-district-bunny',
  title: 'The Enchantress’s Web',
  nodes: [
    {
      id: 'b1',
      speaker: 'bunny',
      speakerName: 'BUNNY',
      speakerTitle: 'Deceptive Enchantress',
      portraitAssetId: 'boss-bunny-portrait',
      text: 'Why fight so hard for affection, little flower? Drink from my cup and forget your burdens...',
      expression: 'smug',
      voiceSfx: 'alluring',
    },
    {
      id: 'b2',
      speaker: 'heroine',
      speakerName: 'Astraea',
      speakerTitle: 'Maiden of the Staff of Love',
      portraitAssetId: 'heroine-portrait-normal',
      text: 'Your illusions are hollow, Bunny. True love doesn’t ask you to surrender who you are!',
      expression: 'angry',
      voiceSfx: 'feminine',
      isEnd: true,
    },
  ],
};

export const SAMPLE_RISHI_DIALOGUE: DialogueSequence = {
  id: 'greedlands-rishi',
  title: 'The Tablet of Avarice',
  nodes: [
    {
      id: 'r1',
      speaker: 'rishi',
      speakerName: 'RISHI',
      speakerTitle: 'Boar of the Colossal Tablet',
      portraitAssetId: 'boss-rishi-portrait',
      text: 'KRRAAGH! Love pays no debts! Gold and stone outlive romance! Fall before my decree!',
      expression: 'angry',
      voiceSfx: 'deep',
    },
    {
      id: 'r2',
      speaker: 'heroine',
      speakerName: 'Astraea',
      speakerTitle: 'Maiden of the Staff of Love',
      portraitAssetId: 'heroine-portrait-normal',
      text: 'Then let my dominance magic shatter your stone into dust!',
      expression: 'angry',
      voiceSfx: 'feminine',
      isEnd: true,
    },
  ],
};

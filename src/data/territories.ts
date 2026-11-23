import { TerritoryInfo } from '../types/game';

export const TERRITORIES_DATA: TerritoryInfo[] = [
  {
    id: 'gremlin-woods',
    name: 'Gremlin Woods',
    subtitle: 'Canopy of Whispers',
    description: 'A shadowy enchanted forest veiled in bioluminescent mist. Deceptive tricksters lurk in the hollow boughs, weaving rumors to turn loved ones against each other.',
    bossName: 'HATA',
    bossTitle: 'Manipulative Gremlin Kingpin',
    status: 'current',
    recommendedLevel: 1,
  },
  {
    id: 'enchanted-district',
    name: 'Enchanted District',
    subtitle: 'The Gilded Labyrinth',
    description: 'A luxurious court of illusions and intoxicating perfumes where vanity reigns. Enchantresses ensnare wanderers into unending masquerades.',
    bossName: 'BUNNY',
    bossTitle: 'Deceptive Enchantress',
    status: 'locked',
    recommendedLevel: 5,
  },
  {
    id: 'greedlands',
    name: 'Greedlands',
    subtitle: 'Crag of the Golden Spires',
    description: 'A volcanic mountain quarry filled with colossal ancient decrees carved in stone. Ruthless tyrants hoard treasures and demand tributes in blood.',
    bossName: 'RISHI',
    bossTitle: 'Boar of the Colossal Tablet',
    status: 'locked',
    recommendedLevel: 10,
  },
];

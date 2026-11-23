export type ItemCategory = 'weapon' | 'potion' | 'collectible' | 'upgrade';
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  rarity: ItemRarity;
  description: string;
  lore: string;
  iconAssetId?: string;
  quantity: number;
  maxStack: number;
  stats?: {
    attackBonus?: number;
    magicBonus?: number;
    hpRestore?: number;
    dominanceChargeBonus?: number;
  };
  isEquipped?: boolean;
}

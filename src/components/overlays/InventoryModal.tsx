import React, { useState } from 'react';
import { ModalWrapper } from '../common/ModalWrapper';
import { FantasyButton } from '../common/FantasyButton';
import { INITIAL_INVENTORY_ITEMS } from '../../data/inventory';
import { InventoryItem, ItemCategory } from '../../types/inventory';
import { Sword, Sparkles, Heart, Shield } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY_ITEMS);
  const [activeCategory, setActiveCategory] = useState<ItemCategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem>(items[0]);

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(i => i.category === activeCategory);

  const handleEquip = (item: InventoryItem) => {
    if (item.category !== 'weapon') return;
    audioService.playSound('button-click');
    setItems(prev => prev.map(i => {
      if (i.category === 'weapon') {
        return { ...i, isEquipped: i.id === item.id };
      }
      return i;
    }));
    setSelectedItem(prev => ({ ...prev, isEquipped: !prev.isEquipped }));
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'text-amber-300 border-amber-400 bg-amber-950/40';
      case 'epic':
        return 'text-love-violet border-love-violet bg-purple-950/40';
      case 'rare':
        return 'text-love-pink border-love-pink bg-pink-950/40';
      default:
        return 'text-love-cream/70 border-white/20 bg-white/5';
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Magical Inventory &amp; Regalia"
      subtitle="Staffs, Relics &amp; Keepsakes of Astraea"
      maxWidth="max-w-4xl"
    >
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-4 mb-5 border-b border-love-secondaryPurple/30">
        {[
          { id: 'all', label: 'All Relics' },
          { id: 'weapon', label: 'Staffs & Weapons' },
          { id: 'potion', label: 'Potions & Elixirs' },
          { id: 'collectible', label: 'Keepsakes' },
          { id: 'upgrade', label: 'Dominance Shards' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold tracking-wider transition-all ${
              activeCategory === tab.id
                ? 'bg-love-pink text-love-midnight shadow-love-glow'
                : 'bg-love-darkPurple/50 text-love-softPink hover:bg-love-secondaryPurple/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Item Grid (3 Cols) */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
          {filteredItems.map((item) => {
            const isSelected = selectedItem.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  audioService.playSound('button-hover');
                  setSelectedItem(item);
                }}
                className={`relative p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-love-darkPurple border-love-pink shadow-card-active scale-[1.02]'
                    : 'bg-love-midnight/50 border-love-secondaryPurple/30 hover:border-love-softPink/50'
                }`}
              >
                {item.isEquipped && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-cinzel font-bold bg-love-pink text-love-midnight">
                    Equipped
                  </span>
                )}

                <div className="w-10 h-10 rounded-lg bg-love-darkPurple/80 border border-love-secondaryPurple/50 flex items-center justify-center mb-2">
                  {item.category === 'weapon' && <Sword className="w-5 h-5 text-love-pink" />}
                  {item.category === 'potion' && <Heart className="w-5 h-5 text-red-400" />}
                  {item.category === 'collectible' && <Sparkles className="w-5 h-5 text-love-gold" />}
                  {item.category === 'upgrade' && <Shield className="w-5 h-5 text-love-violet" />}
                </div>

                <div>
                  <p className="font-cinzel text-xs font-bold text-love-cream truncate">{item.name}</p>
                  <span className={`inline-block text-[9px] uppercase font-mono px-1 py-0.5 rounded mt-1 border ${getRarityBadge(item.rarity)}`}>
                    {item.rarity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Item Details (2 Cols) */}
        <div className="md:col-span-2 p-5 rounded-xl bg-love-midnight/70 border border-love-secondaryPurple/40 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-cinzel text-base font-bold text-love-cream">{selectedItem.name}</h3>
                <span className={`inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded mt-1 border ${getRarityBadge(selectedItem.rarity)}`}>
                  {selectedItem.rarity} {selectedItem.category}
                </span>
              </div>
            </div>

            <p className="text-xs text-love-cream/90">{selectedItem.description}</p>

            {/* Stats Breakdown */}
            {selectedItem.stats && (
              <div className="p-3 rounded-lg bg-love-darkPurple/60 border border-love-secondaryPurple/30 space-y-1 text-xs">
                {selectedItem.stats.attackBonus && (
                  <div className="flex justify-between text-love-softPink">
                    <span>Staff Attack Power</span>
                    <span className="font-bold">+{selectedItem.stats.attackBonus}</span>
                  </div>
                )}
                {selectedItem.stats.magicBonus && (
                  <div className="flex justify-between text-love-pink">
                    <span>Love Magic Potency</span>
                    <span className="font-bold">+{selectedItem.stats.magicBonus}</span>
                  </div>
                )}
                {selectedItem.stats.dominanceChargeBonus && (
                  <div className="flex justify-between text-love-violet">
                    <span>Dominance Surge Rate</span>
                    <span className="font-bold">+{selectedItem.stats.dominanceChargeBonus}%</span>
                  </div>
                )}
                {selectedItem.stats.hpRestore && (
                  <div className="flex justify-between text-green-300">
                    <span>Vitality Restored</span>
                    <span className="font-bold">+{selectedItem.stats.hpRestore} HP</span>
                  </div>
                )}
              </div>
            )}

            <div className="p-3 rounded-lg bg-love-midnight/80 border-l-2 border-love-gold text-[11px] italic text-love-softPink/70">
              "{selectedItem.lore}"
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-love-secondaryPurple/30">
            {selectedItem.category === 'weapon' && (
              <FantasyButton
                size="sm"
                variant={selectedItem.isEquipped ? 'secondary' : 'primary'}
                fullWidth
                onClick={() => handleEquip(selectedItem)}
              >
                {selectedItem.isEquipped ? 'Unequip Staff' : 'Equip Staff'}
              </FantasyButton>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

import React, { useState, useEffect } from 'react';
import { ModalWrapper } from '../common/ModalWrapper';
import { FantasyButton } from '../common/FantasyButton';
import { SaveSlotMetadata } from '../../types/save';
import { saveService } from '../../services/saveService';
import { useGameStore } from '../../stores/useGameStore';
import { useUIStore } from '../../stores/useUIStore';
import { Clock, Trophy, MapPin, Trash2, Play, PlusCircle, AlertTriangle } from 'lucide-react';

interface SaveSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'select' | 'new-game';
}

export const SaveSlotModal: React.FC<SaveSlotModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [slots, setSlots] = useState<SaveSlotMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDeleteSlot, setConfirmDeleteSlot] = useState<number | null>(null);
  const [confirmOverwriteSlot, setConfirmOverwriteSlot] = useState<number | null>(null);

  const { initializeSession } = useGameStore();
  const { setView } = useUIStore();

  const loadSlots = async () => {
    setIsLoading(true);
    try {
      const data = await saveService.getSlotMetadataList();
      setSlots(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadSlots();
    }
  }, [isOpen]);

  const formatPlaytime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectSlot = async (slot: SaveSlotMetadata) => {
    if (!slot.exists) {
      // Create new game directly
      await startNewGame(slot.slotId);
    } else {
      // Load existing save
      const fullSave = await saveService.getSave(slot.slotId);
      if (fullSave) {
        initializeSession(slot.slotId, fullSave);
        onClose();
        setView('gameplay');
      }
    }
  };

  const startNewGame = async (slotId: number) => {
    const newSave = await saveService.createNewGame(slotId);
    initializeSession(slotId, newSave);
    onClose();
    setView('gameplay');
  };

  const handleDelete = async (slotId: number) => {
    await saveService.deleteSave(slotId);
    setConfirmDeleteSlot(null);
    await loadSlots();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Save Data Archives"
      subtitle="Select a Chronicle of Astraea &amp; Elinore"
      maxWidth="max-w-4xl"
    >
      {/* Overwrite Confirmation Dialog */}
      {confirmOverwriteSlot !== null && (
        <div className="p-4 mb-4 rounded-lg bg-red-950/70 border border-red-500/70 text-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
            <div>
              <p className="font-cinzel font-bold text-sm">Overwrite Slot {confirmOverwriteSlot}?</p>
              <p className="text-xs text-red-300">Existing game progress in this slot will be permanently replaced.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FantasyButton size="sm" variant="secondary" onClick={() => setConfirmOverwriteSlot(null)}>
              Cancel
            </FantasyButton>
            <FantasyButton size="sm" variant="danger" onClick={() => {
              const id = confirmOverwriteSlot;
              setConfirmOverwriteSlot(null);
              startNewGame(id);
            }}>
              Overwrite
            </FantasyButton>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {confirmDeleteSlot !== null && (
        <div className="p-4 mb-4 rounded-lg bg-red-950/70 border border-red-500/70 text-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trash2 className="w-6 h-6 text-red-400 shrink-0" />
            <div>
              <p className="font-cinzel font-bold text-sm">Erase Chronicle in Slot {confirmDeleteSlot}?</p>
              <p className="text-xs text-red-300">This action cannot be undone. All saved memories will be lost.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FantasyButton size="sm" variant="secondary" onClick={() => setConfirmDeleteSlot(null)}>
              Cancel
            </FantasyButton>
            <FantasyButton size="sm" variant="danger" onClick={() => handleDelete(confirmDeleteSlot)}>
              Erase Save
            </FantasyButton>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="py-16 text-center">
          <p className="font-cinzel text-love-softPink animate-pulse">Consulting the Kingdom Chronicles...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {slots.map((slot) => {
            return (
              <div
                key={slot.slotId}
                className={`relative flex flex-col justify-between p-5 rounded-xl border transition-all duration-200 ${
                  slot.exists
                    ? 'bg-love-darkPurple/60 border-love-pink/40 hover:border-love-pink hover:shadow-card-active'
                    : 'bg-love-midnight/50 border-love-secondaryPurple/40 hover:border-love-softPink/60'
                }`}
              >
                {/* Slot Tag */}
                <div className="flex items-center justify-between pb-3 border-b border-love-secondaryPurple/30">
                  <span className="font-cinzel text-xs font-bold tracking-widest text-love-gold uppercase">
                    Slot {slot.slotId}
                  </span>
                  <span
                    className={`text-[10px] font-cinzel px-2 py-0.5 rounded-full ${
                      slot.exists
                        ? 'bg-love-pink/20 text-love-softPink border border-love-pink/30'
                        : 'bg-white/5 text-love-cream/50'
                    }`}
                  >
                    {slot.exists ? 'Active Save' : 'Empty Scroll'}
                  </span>
                </div>

                {/* Slot Content */}
                {slot.exists ? (
                  <div className="py-4 space-y-3">
                    <div>
                      <h3 className="font-cinzel text-base font-bold text-love-cream truncate">
                        {slot.heroineName} &bull; Lv. {slot.heroineLevel}
                      </h3>
                      <p className="font-cinzel text-[11px] text-love-gold/80 truncate">
                        {slot.chapter}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-love-cream/80">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-love-pink shrink-0" />
                        <span className="truncate">{slot.checkpointName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-love-softPink shrink-0" />
                        <span>{formatPlaytime(slot.playtimeSeconds)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5 text-love-gold shrink-0" />
                        <span>{slot.completionPercentage}% Complete</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-love-softPink/60 pt-1">
                      Last Saved: {new Date(slot.lastPlayed).toLocaleDateString()}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <PlusCircle className="w-10 h-10 text-love-softPink/30 mb-2" />
                    <p className="font-cinzel text-xs text-love-cream/60">No Chronicle Inscribed</p>
                    <p className="text-[11px] text-love-softPink/40 mt-1">Begin a new love adventure</p>
                  </div>
                )}

                {/* Slot Actions */}
                <div className="pt-3 border-t border-love-secondaryPurple/30 flex items-center gap-2">
                  {slot.exists ? (
                    <>
                      <FantasyButton
                        size="sm"
                        variant="primary"
                        fullWidth
                        icon={<Play className="w-3.5 h-3.5 fill-current" />}
                        onClick={() => handleSelectSlot(slot)}
                      >
                        Resume
                      </FantasyButton>
                      <button
                        onClick={() => setConfirmDeleteSlot(slot.slotId)}
                        className="p-2 rounded text-love-softPink/60 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Erase Slot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <FantasyButton
                      size="sm"
                      variant="gold"
                      fullWidth
                      icon={<PlusCircle className="w-3.5 h-3.5" />}
                      onClick={() => handleSelectSlot(slot)}
                    >
                      New Game
                    </FantasyButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ModalWrapper>
  );
};

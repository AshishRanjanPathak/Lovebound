import React, { useState, useEffect } from 'react';
import { ModalWrapper } from '../common/ModalWrapper';
import { assetValidator } from '../../assets/assetValidator';
import { AssetReport } from '../../types/assets';
import { AlertCircle, FileText, Copy, Check } from 'lucide-react';

interface AssetReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetReportModal: React.FC<AssetReportModalProps> = ({ isOpen, onClose }) => {
  const [report, setReport] = useState<AssetReport>(() => assetValidator.getReport());
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      assetValidator.validateAll().then(setReport);
    }
  }, [isOpen]);

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Asset Pipeline &amp; Integrity Report"
      subtitle="Audit of Local Assets, Fallbacks, and Manifest Status"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Status Metrics Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-love-midnight/60 border border-love-secondaryPurple/40 text-center">
            <span className="font-cinzel text-xs text-love-cream/70">Total Manifest Assets</span>
            <p className="font-cinzel text-2xl font-black text-love-cream mt-1">{report.totalAssets}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-green-950/40 border border-green-500/40 text-center">
            <span className="font-cinzel text-xs text-green-300">Physically Loaded</span>
            <p className="font-cinzel text-2xl font-black text-green-400 mt-1">{report.loadedAssets}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/40 border border-love-pink/40 text-center">
            <span className="font-cinzel text-xs text-love-softPink">Themed Anime Fallbacks</span>
            <p className="font-cinzel text-2xl font-black text-love-pink mt-1">{report.missingAssets}</p>
          </div>
        </div>

        {/* Notice */}
        <div className="p-4 rounded-xl bg-love-darkPurple/60 border border-love-pink/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-love-gold shrink-0 mt-0.5" />
          <div className="text-xs space-y-1 text-love-cream/90">
            <p className="font-bold font-cinzel text-love-gold">Graceful Fallback Policy Active</p>
            <p>
              Per architecture guidelines, all missing image assets are replaced with stylized vector anime silhouettes and Web Audio procedural synthesizer tones. No external internet URLs or broken icons are used.
            </p>
          </div>
        </div>

        {/* Missing Assets Table */}
        <div className="space-y-3">
          <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-love-cream flex items-center gap-2">
            <FileText className="w-4 h-4 text-love-pink" />
            <span>Missing Manifest Entries ({report.missingList.length})</span>
          </h4>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {report.missingList.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-love-midnight/50 border border-love-secondaryPurple/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel font-bold text-love-cream">{item.id}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-love-darkPurple border border-love-secondaryPurple/50 text-love-softPink">
                      {item.category}
                    </span>
                    {item.requiredForMenu && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-love-pink/20 text-love-pink border border-love-pink/30">
                        Menu Priority
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-love-gold/90 break-all">{item.path}</p>
                  <p className="text-[11px] text-love-softPink/60">
                    Fallback: {item.fallbackDescription}
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(item.path)}
                  className="px-2.5 py-1.5 rounded bg-love-darkPurple/80 border border-love-pink/40 text-love-softPink hover:text-white flex items-center gap-1.5 shrink-0 transition-colors"
                  title="Copy relative file path"
                >
                  {copiedPath === item.path ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-[10px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy Path</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

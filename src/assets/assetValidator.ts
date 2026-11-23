import { ASSET_MANIFEST, getAssetById } from './assetManifest';
import { AssetManifestItem, AssetReport } from '../types/assets';

class AssetValidator {
  private cache: Map<string, boolean> = new Map();
  private validationDone: boolean = false;
  private missingReport: AssetManifestItem[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    // Start initial background validation
    if (typeof window !== 'undefined') {
      this.validateAll();
    }
  }

  /**
   * Probe an image or audio asset to verify physical file presence on the server.
   */
  public async probeAsset(path: string): Promise<boolean> {
    if (this.cache.has(path)) {
      return this.cache.get(path)!;
    }

    try {
      // Use fetch HEAD request to verify file existence without downloading full file payload
      const response = await fetch(path, { method: 'HEAD' });
      const exists = response.ok && response.status !== 404;
      this.cache.set(path, exists);
      return exists;
    } catch {
      this.cache.set(path, false);
      return false;
    }
  }

  /**
   * Validates all assets defined in the manifest.
   */
  public async validateAll(): Promise<AssetReport> {
    const results: AssetManifestItem[] = [];

    for (const item of ASSET_MANIFEST) {
      const exists = await this.probeAsset(item.path);
      item.status = exists ? 'loaded' : 'missing';

      if (!exists) {
        if (import.meta.env.DEV) {
          console.warn(`[LOVEBOUND AssetValidator] Missing asset: "${item.path}" (ID: ${item.id}). Using themed fantasy fallback: ${item.fallbackDescription}`);
        }
        results.push(item);
      }
    }

    this.missingReport = results;
    this.validationDone = true;
    this.notify();

    return this.getReport();
  }

  /**
   * Returns current asset report
   */
  public isValidationComplete(): boolean {
    return this.validationDone;
  }

  public getReport(): AssetReport {
    const total = ASSET_MANIFEST.length;
    const missing = this.missingReport.length;
    const loaded = total - missing;

    return {
      totalAssets: total,
      loadedAssets: loaded,
      missingAssets: missing,
      missingList: [...this.missingReport]
    };
  }

  public isAvailable(assetIdOrPath: string): boolean {
    const item = getAssetById(assetIdOrPath) || ASSET_MANIFEST.find(a => a.path === assetIdOrPath);
    if (!item) return false;
    return item.status === 'loaded';
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }
}

export const assetValidator = new AssetValidator();

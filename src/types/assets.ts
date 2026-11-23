export type AssetCategory =
  | 'branding'
  | 'character-heroine'
  | 'character-princess'
  | 'boss'
  | 'enemy'
  | 'environment'
  | 'effect'
  | 'item'
  | 'ui'
  | 'cutscene'
  | 'audio'
  | 'font';

export type AssetLoadingStatus = 'pending' | 'loaded' | 'missing' | 'fallback';

export interface AssetManifestItem {
  id: string;
  category: AssetCategory;
  path: string;
  purpose: string;
  expectedDimensions?: { width: number; height: number };
  frameMetadata?: {
    frameWidth: number;
    frameHeight: number;
    startFrame?: number;
    endFrame?: number;
  };
  requiredForMenu?: boolean;
  status: AssetLoadingStatus;
  fallbackDescription: string;
}

export interface AssetReport {
  totalAssets: number;
  loadedAssets: number;
  missingAssets: number;
  missingList: AssetManifestItem[];
}

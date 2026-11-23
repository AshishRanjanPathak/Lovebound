export type DialogueSpeaker = 'heroine' | 'princess' | 'hata' | 'bunny' | 'rishi' | 'narrator';

export interface DialogueNode {
  id: string;
  speaker: DialogueSpeaker;
  speakerName: string;
  speakerTitle?: string;
  portraitAssetId: string;
  text: string;
  expression?: 'normal' | 'determined' | 'worried' | 'angry' | 'loving' | 'smug';
  voiceSfx?: 'feminine' | 'cute' | 'gremlin' | 'alluring' | 'deep' | 'chime';
  nextDialogueId?: string;
  isEnd?: boolean;
}

export interface DialogueSequence {
  id: string;
  title: string;
  nodes: DialogueNode[];
}

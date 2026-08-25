export interface PhotoMemory {
  id: string;
  slotNumber: number;
  title: string;
  description: string;
  imageUrl: string;
  customUploaded: boolean;
  dateLabel?: string;
  updatedAt?: number;
}

export interface StoryChapter {
  id: string;
  title: string;
  subtitle?: string;
}

export interface AudioTrackConfig {
  name: string;
  url?: string;
  isPlaying: boolean;
  isMuted: boolean;
}

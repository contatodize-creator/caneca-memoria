export type MediaType = "image" | "video" | "audio";
export type Theme = "amor" | "familia" | "pet" | "aniversario" | "homenagem";

export type Memory = {
  id: string;
  slug: string;
  title: string;
  recipient: string | null;
  sender: string | null;
  message: string;
  mediaType: MediaType;
  mediaPath: string | null;
  mediaUrl?: string | null;
  coverPath?: string | null;
  coverUrl?: string | null;
  theme: Theme;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  scans: number;
};

export type PublicMemory = Omit<Memory, "id" | "mediaPath" | "active" | "createdAt" | "scans">;

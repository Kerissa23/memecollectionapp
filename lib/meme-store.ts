"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Meme {
  id: string
  title: string
  description: string
  imageUrl: string
  createdAt: string
}

interface MemeStore {
  memes: Meme[]
  addMeme: (meme: Meme) => void
  removeMeme: (id: string) => void
}

export const useMemeStore = create<MemeStore>()(
  persist(
    (set) => ({
      memes: [],
      addMeme: (meme) => set((state) => ({ memes: [meme, ...state.memes] })),
      removeMeme: (id) =>
        set((state) => ({
          memes: state.memes.filter((meme) => meme.id !== id),
        })),
    }),
    {
      name: "meme-collection",
    },
  ),
)


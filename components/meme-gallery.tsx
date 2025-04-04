"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMemeStore } from "@/lib/meme-store"
import { MemeDetails } from "@/components/meme-details"
import { EmptyState } from "@/components/empty-state"

export function MemeGallery() {
  const { memes, removeMeme } = useMemeStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null)

  const filteredMemes = memes.filter(
    (meme) =>
      meme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meme.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeMeme(id)
    if (selectedMeme === id) {
      setSelectedMeme(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search memes..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {memes.length === 0 ? (
        <EmptyState />
      ) : filteredMemes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No memes match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMemes.map((meme) => (
            <Card
              key={meme.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedMeme(meme.id)}
            >
              <CardContent className="p-0 relative group">
                <img src={meme.imageUrl || "/placeholder.svg"} alt={meme.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="destructive" size="icon" onClick={(e) => handleDelete(meme.id, e)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{meme.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{meme.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedMeme && (
        <MemeDetails meme={memes.find((m) => m.id === selectedMeme)!} onClose={() => setSelectedMeme(null)} />
      )}
    </div>
  )
}


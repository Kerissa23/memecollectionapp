"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { Meme } from "@/lib/meme-store"
import { formatDate } from "@/lib/utils"

interface MemeDetailsProps {
  meme: Meme
  onClose: () => void
}

export function MemeDetails({ meme, onClose }: MemeDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{meme.title}</DialogTitle>
          <DialogDescription>Added on {formatDate(meme.createdAt)}</DialogDescription>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <img
            src={meme.imageUrl || "/placeholder.svg"}
            alt={meme.title}
            className="w-full max-h-[70vh] object-contain rounded-md"
          />

          {meme.description && (
            <div className="bg-muted p-4 rounded-md">
              <p className="whitespace-pre-wrap">{meme.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


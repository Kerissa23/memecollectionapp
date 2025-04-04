"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon } from "lucide-react"
import { useMemeStore } from "@/lib/meme-store"
import { useToast } from "@/hooks/use-toast"

export function UploadMeme() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addMeme } = useMemeStore()
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title for your meme",
        variant: "destructive",
      })
      return
    }

    if (!imagePreview) {
      toast({
        title: "Image required",
        description: "Please upload an image for your meme",
        variant: "destructive",
      })
      return
    }

    addMeme({
      id: Date.now().toString(),
      title,
      description,
      imageUrl: imagePreview,
      createdAt: new Date().toISOString(),
    })

    toast({
      title: "Meme added!",
      description: "Your meme has been added to the collection",
    })

    // Reset form
    setTitle("")
    setDescription("")
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter a title for your meme"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Add a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Meme Image</Label>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-primary bg-primary/10" : "border-gray-300"
          } transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {imagePreview ? (
            <div className="space-y-4">
              <img src={imagePreview || "/placeholder.svg"} alt="Meme preview" className="max-h-64 mx-auto" />
              <Button type="button" variant="outline" onClick={() => setImagePreview(null)}>
                Remove Image
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center text-gray-500">
                <ImageIcon className="h-12 w-12 mb-2" />
                <p className="text-lg font-medium">Drag and drop your meme here</p>
                <p className="text-sm">or</p>
              </div>
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add to Collection
      </Button>
    </form>
  )
}


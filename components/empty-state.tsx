import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EmptyState() {
  return (
    <div className="text-center py-16 space-y-4">
      <div className="bg-muted inline-flex p-6 rounded-full">
        <Upload className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-semibold">No memes yet</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Your meme collection is empty. Start by uploading your first meme!
      </p>
      <Button asChild>
        <Link href="/?tab=upload">Upload Your First Meme</Link>
      </Button>
    </div>
  )
}


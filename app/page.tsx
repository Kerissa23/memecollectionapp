import { MemeGallery } from "@/components/meme-gallery"
import { UploadMeme } from "@/components/upload-meme"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Meme Collection</h1>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="gallery">My Collection</TabsTrigger>
          <TabsTrigger value="upload">Upload Meme</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery">
          <MemeGallery />
        </TabsContent>

        <TabsContent value="upload">
          <UploadMeme />
        </TabsContent>
      </Tabs>
    </main>
  )
}


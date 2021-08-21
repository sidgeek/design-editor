import { useEffect, useState } from 'react'
import { Input, Grid, Box, Flex } from 'theme-ui'
import { getPixabayImages, PixabayImage } from '@services/pixabay'
import { useDebounce } from 'use-debounce'
import { useHandlers } from '@/uibox'

function ImagesPanel() {
  const [search, setSearch] = useState('')
  const [images, setImages] = useState<PixabayImage[]>([])
  const [value] = useDebounce(search, 1000)

  const handlers = useHandlers()
  useEffect(() => {
    getPixabayImages('people')
      .then(data => setImages(data))
      .catch(console.log)
  }, [])

  useEffect(() => {
    if (value) {
      getPixabayImages(value)
        .then((data: any) => setImages(data))
        .catch(console.log)
    }
  }, [value])

  const addImageToCanvas = url => {
    const options = {
      type: 'StaticImage',
      metadata: { src: url },
    }
    handlers.objectsHandler.create(options)
  }

  return (
    <>
      <Box sx={{ padding: '2rem 2rem 1rem' }}>
        <Input
          onChange={e => setSearch(e.target.value)}
          style={{ background: '#fff' }}
          type="tel"
          placeholder="Search images"
        />
      </Box>

      <Grid
        sx={{
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          padding: '1rem 2rem',
        }}
        className="objects-list"
      >
        {images.map(img => (
          <Flex
            key={img.id}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => addImageToCanvas(img.webformatURL)}
          >
            <img width="100%" src={img.previewURL} alt="preview" />
          </Flex>
        ))}
      </Grid>
    </>
  )
}
export default ImagesPanel

import { useEffect, useState } from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { getPixabayImages, PixabayImage } from '@services/pixabay'
import { useDebounce } from 'use-debounce'
import { useCoreHandler } from '@/components/Canvas/handlers'

function ImagesPanel() {
  const [search, setSearch] = useState('')
  const [images, setImages] = useState<PixabayImage[]>([])
  const [value] = useDebounce(search, 1000)

  const { addObject } = useCoreHandler()
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
      type: 'image',
      url: url,
    }
    addObject(options)
  }

  return (
    <>
      <div style={{ padding: '1rem 2rem' }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input
            onChange={e => setSearch(e.target.value)}
            style={{ background: '#fff' }}
            type="tel"
            placeholder="Search images"
          />
        </InputGroup>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          padding: '1rem 2rem',
        }}
        className="objects-list"
      >
        {images.map(img => (
          <div
            key={img.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => addImageToCanvas(img.webformatURL)}
          >
            <img width="100%" src={img.previewURL} alt="preview" />
          </div>
        ))}
      </div>
    </>
  )
}
export default ImagesPanel

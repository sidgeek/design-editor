import { useEffect, useState } from 'react'
import { getImage, getImages } from '@services/iconscout'
import { useDebounce } from 'use-debounce'
import { Input, Grid, Flex } from 'theme-ui'
import { useHandlers } from '@/uibox'

function ObjectsPanel() {
  const [search, setSearch] = useState('')
  const [objects, setObjects] = useState<any[]>([])
  const [value] = useDebounce(search, 1000)

  const handlers = useHandlers()
  useEffect(() => {
    getImages('people')
      .then((data: any) => setObjects(data))
      .catch(console.log)
  }, [])

  useEffect(() => {
    if (value) {
      getImages(value)
        .then((data: any) => setObjects(data))
        .catch(console.log)
    }
  }, [value])
  const downloadImage = uuid => {
    getImage(uuid)
      .then(url => {
        const options = {
          type: 'StaticVector',
          metadata: { src: url },
        }
        handlers.objectsHandler.create(options)
      })
      .catch(console.log)
  }

  return (
    <>
      <div style={{ padding: '2rem 2rem 1rem' }}>
        <Input
          onChange={e => setSearch(e.target.value)}
          style={{ background: '#fff' }}
          type="tel"
          placeholder="Search objects"
        />
      </div>

      <Grid
        sx={{
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          padding: '1rem 2rem',
        }}
      >
        {objects.map(obj => (
          <Flex
            key={obj.id}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              justifyContent: 'center',
            }}
            onClick={() => downloadImage(obj.uuid)}
          >
            <img width="80%" src={obj.urls.thumb} alt="svg object" />
          </Flex>
        ))}
      </Grid>
    </>
  )
}
export default ObjectsPanel

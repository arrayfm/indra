import { useCallback, useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { GeopointValue, ObjectInputProps, set } from 'sanity'

import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { Grid, Stack, TextInput } from '@sanity/ui'

const accessToken = process.env.NEXT_PUBLIC_SANITY_MAPBOX_ACCESS_TOKEN

type GeoPointInputProps = ObjectInputProps<GeopointValue | undefined, any>

export const GeoPointInput = (props: GeoPointInputProps) => {
  const { value: initialValue, onChange } = props

  const mapContainer = useRef<HTMLDivElement | null>(null)

  const mapRef = useRef<mapboxgl.Map | null>(null)

  const [value, setValue] = useState<GeopointValue>(
    initialValue as GeopointValue
  )
  const [lat, setLat] = useState<number>(value ? value.lat : 0.1276)
  const [lng, setLng] = useState<number>(value ? value.lng : 51.5074)

  useEffect(() => {
    if (!accessToken) return
    if (!mapContainer.current) return

    mapboxgl.accessToken = accessToken

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 7,
    })

    const mapMarker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(mapRef.current)

    mapMarker!.on('dragend', () => {
      const lngLat = mapMarker!.getLngLat()
      const newValue = { ...value, ...{ lng: lngLat.lng, lat: lngLat.lat } }
      setValue(newValue)
      onChange(set(newValue))
      setLat(lngLat.lat)
      setLng(lngLat.lng)
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl as any, // Sadness
      marker: false,
    })

    geocoder.on('result', (event) => {
      const { result } = event
      const newLng = result.center[0]
      const newLat = result.center[1]
      const newValue = { ...value, ...{ lng: newLng, lat: newLat } }
      setValue(newValue)
      onChange(set(newValue))
      setLat(newLat)
      setLng(newLng)
      mapMarker!.setLngLat([newLng, newLat])
      mapRef.current?.flyTo({ center: [newLng, newLat] })
    })

    mapRef.current.addControl(geocoder as unknown as mapboxgl.IControl)

    return () => {
      mapRef.current?.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value: eventValue } = event.target
      const parsedValue = parseFloat(eventValue)

      if (name === 'lat' && (parsedValue < -90 || parsedValue > 90)) return
      if (name === 'lng' && (parsedValue < -180 || parsedValue > 180)) return

      if (!isNaN(parsedValue)) {
        const newValue = {
          ...value,
          [name]: parsedValue,
        }
        setValue(newValue)
        onChange(set(newValue))
        setLat(newValue.lat)
        setLng(newValue.lng)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  )

  return (
    <Stack space={4}>
      <div ref={mapContainer} style={{ width: '100%', height: 400 }} />
      <Grid columns={2} gap={4}>
        <Stack space={3}>
          <label className="text-[0.8125rem] font-medium" htmlFor="lat">
            Latitude
          </label>
          <TextInput
            type="number"
            min={-90}
            max={90}
            value={lat}
            step="any"
            name="lat"
            onChange={handleInputChange}
          />
        </Stack>
        <Stack space={3}>
          <label className="text-[0.8125rem] font-medium" htmlFor="lng">
            Longitude
          </label>
          <TextInput
            type="number"
            min={-180}
            max={180}
            value={lng}
            step="any"
            name="lng"
            onChange={handleInputChange}
          />
        </Stack>
      </Grid>
    </Stack>
  )
}

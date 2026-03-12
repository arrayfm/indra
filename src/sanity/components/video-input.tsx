'use client'

import { useClient, PatchEvent, set, FileInputProps } from 'sanity'
import { useToast, Dialog, TextInput, Button, Select } from '@sanity/ui'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { basename } from 'path'
import { SanityFileAsset } from '@sanity/asset-utils'

import {
  UploadIcon,
  SearchIcon,
  DocumentVideoIcon,
  ResetIcon,
  EllipsisHorizontalIcon,
  CloseIcon,
} from '@sanity/icons'
import { parseSanityVideoAssetToUrl } from '../lib/video'

const MAX_FILE_SIZE_MB = 96
const PAGE_SIZE = 24

interface MediaTag {
  _id: string
  title: string
}

interface VideoAsset extends SanityFileAsset {
  opt?: {
    media?: {
      tags?: MediaTag[]
    }
  }
}

const getVideoDimensions = (url: string) =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.src = url

    video.onloadedmetadata = () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
      })
    }

    video.onerror = () => reject(new Error('Failed to load video metadata'))
  })

const VideoInput: React.FC<FileInputProps> = ({ onChange, value }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const client = useClient({ apiVersion: '2024-06-07' })
  const toast = useToast()

  const [video, setVideo] = useState<VideoAsset | null>(null)
  const [allVideos, setAllVideos] = useState<VideoAsset[]>([])
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [videoMenuOpen, setVideoMenuOpen] = useState(false)
  const [captionDraft, setCaptionDraft] = useState(
    (value?.caption as string) || ''
  )
  const [caption, setCaption] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<MediaTag | null>(null)
  const [availableTags, setAvailableTags] = useState<MediaTag[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchAvailableTags = useCallback(async () => {
    const tags = await client.fetch<MediaTag[]>(
      `*[_type == "media.tag"]{ _id, "title": name.current } | order(title asc)`
    )
    setAvailableTags(tags)
  }, [client])

  const lastFetchRef = useRef<symbol | null>(null)

  useEffect(() => {
    fetchAvailableTags()
  }, [fetchAvailableTags])

  const fetchVideos = useCallback(
    async (reset = false, pageOverride?: number) => {
      const currentPage = pageOverride ?? page
      const start = reset ? 0 : (currentPage - 1) * PAGE_SIZE
      const end = start + PAGE_SIZE

      const fetchId = Symbol()
      lastFetchRef.current = fetchId

      const query = `
      *[_type == "sanity.fileAsset" && mimeType match "video/*"] | order(_createdAt desc) {
        _id,
        url,
        originalFilename,
        assetId,
        extension,
        opt {
          media {
            tags[]->{
              _id,
              "title": name.current
            }
          }
        }
      }[${start}...${end}]
    `
      const assets = await client.fetch<VideoAsset[]>(query)

      if (lastFetchRef.current !== fetchId) return

      setAllVideos((prev) => {
        const combined = reset ? assets : [...prev, ...assets]
        const unique = Array.from(
          new Map(combined.map((v) => [v._id, v])).values()
        )
        return unique
      })
      setHasMore(assets.length === PAGE_SIZE)
    },
    [client]
  )

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchVideos(false, nextPage)
  }

  useEffect(() => {
    if (libraryOpen) {
      setPage(1)
      fetchVideos(true)
    }
  }, [libraryOpen, searchTerm, fetchVideos])

  const filteredVideos = useMemo(() => {
    return allVideos.filter((video) => {
      const videoTagIds = video.opt?.media?.tags?.map((t) => t._id) ?? []

      const matchesTags = selectedTag
        ? videoTagIds.includes(selectedTag._id)
        : true

      const matchesSearch = searchTerm
        ? video.originalFilename
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        : true

      return matchesTags && matchesSearch
    })
  }, [allVideos, selectedTag, searchTerm])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const sizeInMB = file.size / (1024 * 1024)
    if (sizeInMB > MAX_FILE_SIZE_MB) {
      toast.push({
        status: 'error',
        title: `File is too large. Max ${MAX_FILE_SIZE_MB}MB.`,
        duration: 3000,
      })
      return
    }

    try {
      const videoElement = document.createElement('video')
      const videoUrl = URL.createObjectURL(file)

      await new Promise<void>((resolve, reject) => {
        videoElement.onloadedmetadata = () => resolve()
        videoElement.onerror = reject
        videoElement.src = videoUrl
      })

      const width = videoElement.videoWidth
      const height = videoElement.videoHeight
      const aspectRatio = `${width}/${height}`

      URL.revokeObjectURL(videoUrl)

      const asset = await client.assets.upload('file', file, {
        filename: basename(file.name),
      })

      onChange(
        PatchEvent.from(
          set({
            ...value,
            asset: { _type: 'reference', _ref: asset._id },
            caption: caption || '',
            aspectRatio: aspectRatio,
            width: width,
            height: height,
          })
        )
      )
      setVideo(asset as unknown as VideoAsset)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFileRemove = useCallback(() => {
    if (inputRef.current) inputRef.current.value = ''
    setVideo(null)
    setVideoMenuOpen(false)
    setCaption('')
    onChange(PatchEvent.from(set({ ...value, asset: {}, caption: '' })))
  }, [onChange, value])

  const onCloseLibrary = useCallback(
    async (selectedAsset: VideoAsset) => {
      try {
        const url = parseSanityVideoAssetToUrl({
          video: selectedAsset,
          outputSize: { width: 640 },
        })

        if (!url) throw new Error('Failed to parse video URL')

        const { width, height } = await getVideoDimensions(url)
        const aspectRatio = `${width}/${height}`

        onChange(
          PatchEvent.from(
            set({
              ...value,
              asset: { _type: 'reference', _ref: selectedAsset._id },
              caption: caption || '',
              width,
              height,
              aspectRatio,
            })
          )
        )

        setVideo(selectedAsset)
        setLibraryOpen(false)
      } catch (err) {
        console.error(err)

        onChange(
          PatchEvent.from(
            set({
              ...value,
              asset: { _type: 'reference', _ref: selectedAsset._id },
              caption: caption || '',
            })
          )
        )

        setVideo(selectedAsset)
        setLibraryOpen(false)
      }
    },
    [onChange, value, caption]
  )

  useEffect(() => {
    if (!value?.asset?._ref) return
    client
      .fetch<VideoAsset>(`*[_id == $id][0]`, { id: value.asset._ref })
      .then((asset) => asset && setVideo(asset))
    if (typeof value.caption === 'string') setCaption(value.caption)
  }, [value, client])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (captionDraft !== value?.caption)
        onChange(PatchEvent.from(set({ ...value, caption: captionDraft })))
    }, 2000)
    return () => clearTimeout(timeout)
  }, [captionDraft, onChange, value])

  return (
    <div>
      {!video && (
        <div className="relative flex justify-between rounded-sm border border-[#ededed] p-2">
          <div className="text-mono-400 flex items-center gap-1 text-sm font-medium">
            <DocumentVideoIcon className="h-5 w-5" /> Select an option
          </div>

          <div className="flex items-center gap-1">
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => inputRef.current?.click()}
              className="text-mono-400 flex items-center gap-1 py-0.5 pr-2 pl-1 text-sm font-medium"
              disabled={!!video}
            >
              <UploadIcon className="h-5 w-5" /> Upload
            </button>

            <button
              onClick={() => setLibraryOpen(true)}
              className="text-mono-400 flex items-center gap-1 py-0.5 pr-2 pl-0.5 text-sm font-medium"
            >
              <SearchIcon className="h-5 w-5" /> Select
            </button>
          </div>
        </div>
      )}

      {video?.url && (
        <div className="bg-checkerboard relative flex aspect-3/1 items-center justify-center overflow-hidden rounded-sm border border-[#ededed]">
          <video
            src={parseSanityVideoAssetToUrl({
              video,
              outputSize: { width: 240 },
            })}
            controls={false}
            muted
            autoPlay
            loop
            className="max-h-full max-w-full"
          />
          <div className="absolute top-1 right-1 flex flex-col items-end gap-1">
            <button
              className="svg text-mono-400 hover:bg-mono-100 flex h-8 w-8 items-center justify-center border bg-white"
              onClick={() => setVideoMenuOpen((v) => !v)}
            >
              <EllipsisHorizontalIcon />
            </button>
            {videoMenuOpen && (
              <div className="flex min-w-[150px] flex-col gap-2 rounded-sm bg-white p-1">
                <button
                  onClick={() => {
                    setLibraryOpen(true)
                    setVideoMenuOpen(false)
                  }}
                  className="text-mono-400 flex items-center gap-1 py-1 pr-2 pl-0 text-sm font-medium"
                >
                  <SearchIcon /> Select
                </button>
                <button
                  onClick={handleFileRemove}
                  className="text-mono-400 hover:bg-sanity-ui-error flex cursor-pointer items-center gap-1 py-1 pr-2 pl-1 text-sm font-medium hover:text-white"
                >
                  <ResetIcon /> Clear field
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {video && (
        <div className="mt-3 flex flex-col gap-2">
          <label className="text-mono-400 text-[0.8125rem] font-medium">
            Caption
          </label>
          <TextInput
            value={captionDraft}
            onChange={(e) => setCaptionDraft(e.currentTarget.value)}
          />
        </div>
      )}

      {libraryOpen && (
        <Dialog
          header="Select video"
          id="video-library"
          onClose={() => setLibraryOpen(false)}
          zOffset={10000}
          width={10}
          animate
        >
          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-wrap gap-2">
              <div className="relative flex">
                <TextInput
                  placeholder="Search filename..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setSearchTerm(searchInput)
                  }}
                  className="w-full flex-1"
                  disabled={!!searchTerm}
                />
                <button
                  onClick={() => {
                    if (searchTerm) {
                      setSearchInput('')
                      setSearchTerm('')
                    } else {
                      setSearchTerm(searchInput)
                    }

                    setPage(1)
                    fetchVideos(true, 1)
                  }}
                  className="z-10 flex min-h-[35px] min-w-[35px] items-center justify-center border border-current/50 hover:border-current/75"
                >
                  {searchTerm ? (
                    <CloseIcon className="h-5 w-5" />
                  ) : (
                    <SearchIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="max-w-[220px]">
                <Select
                  value={selectedTag?._id ?? ''}
                  onChange={(e) => {
                    const tagId = e.currentTarget.value

                    if (!tagId) {
                      setSelectedTag(null)
                      return
                    }

                    const tag = availableTags.find((t) => t._id === tagId)
                    setSelectedTag(tag ?? null)
                  }}
                  className="ml-2 min-w-[150px]"
                >
                  <option value="">All</option>
                  {availableTags.map((tag) => (
                    <option key={tag._id} value={tag._id}>
                      {tag.title}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-6 gap-4">
              {filteredVideos.map((v) => {
                const url = parseSanityVideoAssetToUrl({
                  video: v,
                  outputSize: { width: 360 },
                })
                return (
                  <div
                    key={v._id}
                    className="bg-checkerboard hover:border-sanity-ui-info flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-[#ededed]"
                    onClick={() => onCloseLibrary(v)}
                  >
                    <video
                      src={url}
                      muted
                      loop
                      autoPlay
                      controls={false}
                      className="pointer-events-none max-h-full max-w-full"
                    />
                  </div>
                )
              })}
            </div>

            {hasMore && (
              <button
                onClick={loadMore}
                className="mt-4 rounded border border-current/50 px-3 py-1 text-sm font-medium hover:border-current/75"
              >
                Check for more
              </button>
            )}
          </div>
        </Dialog>
      )}
    </div>
  )
}

export default VideoInput

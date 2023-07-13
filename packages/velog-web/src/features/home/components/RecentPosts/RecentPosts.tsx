'use client'

import PostCardGrid from '@/features/post/components/PostCardGrid'
import useRecentPosts from '@/features/home/hooks/useRecentPosts'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Posts } from '@/types/post'
import { useCallback, useRef } from 'react'

type Props = {
  data: Posts[]
}

function RecentPosts({ data }: Props) {
  const { posts, isLoading, fetchNextPage, isFetching } = useRecentPosts(data)
  const ref = useRef<HTMLDivElement>(null)

  const getRecentPostsMore = useCallback(() => {
    if (isLoading) return
    fetchNextPage()
  }, [isLoading, fetchNextPage])

  useInfiniteScroll(ref, getRecentPostsMore)

  return (
    <>
      <PostCardGrid
        posts={posts}
        forHome={true}
        forPost={false}
        loading={isLoading || isFetching}
      />
      <div ref={ref} />
    </>
  )
}

export default RecentPosts
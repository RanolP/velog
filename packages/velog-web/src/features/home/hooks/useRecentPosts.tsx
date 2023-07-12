import { fetcher } from '@/graphql/fetcher'
import {
  RecentPostsDocument,
  RecentPostsInput,
  RecentPostsQuery,
  RecentPostsQueryVariables,
} from '@/graphql/generated'
import { Posts } from '@/types/post'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function useRecentPosts(initialPosts: Posts[] = []) {
  const [posts, setPosts] = useState<Posts[]>(initialPosts)
  const [fetchPostsInput, fetchNextPosts] = useState<RecentPostsInput>({
    limit: 2,
    cursor:
      posts[posts.length - 1].id || initialPosts[initialPosts.length - 1].id,
  })

  const { data, isSuccess, isLoading, isError } =
    useInfiniteQuery<RecentPostsQuery>(
      ['recentPosts', { input: fetchPostsInput }],
      fetcher<RecentPostsQuery, RecentPostsQueryVariables>(
        RecentPostsDocument,
        {
          input: fetchPostsInput,
        }
      ),
      {
        retryDelay: 400,
      }
    )

  useEffect(() => {
    if (!isSuccess) return
    const list = data.pages.map((page) => page.recentPosts).flat() as Posts[]
    setPosts((prev) => [...prev, ...list])

    return () => {
      setPosts([])
    }
  }, [isSuccess, data, isError])

  return { posts, isLoading, fetchNextPosts }
}

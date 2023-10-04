'use client'

import { Posts } from '@/types/post'
import styles from './PostCard.module.css'
import { bindClassNames } from '@/lib/styles/bindClassNames'
import RatioImage from '@/components/RatioImage/RatioImage'
import Image from 'next/image'
import { LikeIcon } from '@/assets/icons/components'
import { timeFormat } from '@/lib/timeformat'
import Link from 'next/link'

const cx = bindClassNames(styles)

type Props = {
  post: Posts
  forHome: boolean
  forPost: boolean
  onClick: () => void
}

function PostCard({ post, forHome = false, forPost = false, onClick }: Props) {
  const url = encodeURI(`/@${post.user.username}/${post.url_slug}`)
  return (
    <div className={cx('block', { isNotHomeAndPost: !forHome && !forPost })} onClick={onClick}>
      {post.thumbnail && (
        <Link href={url} className={cx('styleLink')}>
          <RatioImage
            widthRatio={1.916}
            heightRatio={1}
            src={post.thumbnail}
            alt={`${post.title} post`}
            width={320}
            height={167}
          />
        </Link>
      )}
      <div className={cx('content')}>
        <Link href={url} className={cx('styleLink')}>
          <h4 className={cx('h4', 'ellipsis')}>{post.title}</h4>
          <div className={cx('descriptionWrapper')}>
            <p className={cx({ clamp: !!post.thumbnail })}>
              {post.short_description.replace(/&#x3A;/g, ':')}
              {post.short_description.length === 150 && '...'}
            </p>
          </div>
        </Link>
        <div className={cx('subInfo')}>
          <span suppressHydrationWarning={true}>{timeFormat(post.released_at)}</span>
          <span className={cx('separator')}>·</span>
          <span>{post.comments_count}개의 댓글</span>
        </div>
      </div>
      <div className={cx('footer')}>
        <Link className={cx('userInfo')} href={`/@${post.user.username}`}>
          <Image
            src={post.user.profile?.thumbnail || '/images/user-thumbnail.png'}
            alt={`user thumbnail of ${post.user.username}`}
            width={24}
            height={24}
          />
          <span>
            by <b>{post.user.username}</b>
          </span>
        </Link>
        <div className={cx('likes')}>
          <LikeIcon />
          {post.likes}
        </div>
      </div>
    </div>
  )
}

export default PostCard

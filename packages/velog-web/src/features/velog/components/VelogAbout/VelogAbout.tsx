'use client'

import { useCurrentUserQuery, useGetUserAboutQuery } from '@/graphql/generated'
import styles from './VelogAbout.module.css'
import { bindClassNames } from '@/lib/styles/bindClassNames'
import VelogAboutContentSkeleton from '../VelogAboutContent/VelogAboutContentSkeleton'

const cx = bindClassNames(styles)

type Props = {
  username: string
}

function VelogAbout({ username }: Props) {
  const { data: userAboutData, isLoading } = useGetUserAboutQuery({ input: { username } })
  const { data: currentUserData } = useCurrentUserQuery()

  const isOwn = currentUserData?.currentUser?.username === username || false

  if (isLoading) return <VelogAboutContentSkeleton />
  return <div className={cx('block')}>gehe</div>
}

export default VelogAbout
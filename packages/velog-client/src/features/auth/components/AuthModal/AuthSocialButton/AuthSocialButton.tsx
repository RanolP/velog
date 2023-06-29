import styles from './AuthSocialButton.module.css'
import { FacebookIcon, GithubIcon, GoogleIcon } from '@/public/svg'
import { useMemo } from 'react'
import { bindClassNames } from '@/lib/styles/bindClassNames'
import { AuthProvider } from '@/types/auth'

const cx = bindClassNames(styles)

type Props = {
  provider: AuthProvider
  tabIndex: number
  currentPath: string
}

const providerMap = {
  github: {
    color: '#272e33',
    icon: GithubIcon,
    border: false,
  },
  google: {
    color: 'white',
    icon: GoogleIcon,
    border: true,
  },
  facebook: {
    color: '#3b5998',
    icon: FacebookIcon,
    border: false,
  },
}

function AuthSocialButton({ provider, tabIndex, currentPath }: Props) {
  const info = useMemo(() => providerMap[provider], [provider])
  const { icon: Icon, color, border } = info

  const host =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_V2_HOST
      : 'http://localhost:5002/'

  const redirectTo = `${host}api/v2/auth/social/redirect/${provider}?next=${currentPath}&isIntegrate=0`

  return (
    <a
      className={cx('block', { border })}
      href={redirectTo}
      tabIndex={tabIndex}
      style={{
        background: color,
      }}
    >
      <Icon />
    </a>
  )
}

export default AuthSocialButton
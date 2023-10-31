import HeaderLogo from '../HeaderLogo'
import styles from './HeaderSkeleton.module.css'
import { bindClassNames } from '@/lib/styles/bindClassNames'

const cx = bindClassNames(styles)

function HeaderSkeleton() {
  return (
    <div className={cx('block')}>
      <div className={cx('innerBlock')}>
        <HeaderLogo />
        <div className={cx('right')}>
          <div className={cx('button')} />
          <div className={cx('button')} />
          <div className={cx('button', 'writeButton')} />
          <div className={cx('button')} />
        </div>
      </div>
    </div>
  )
}

export default HeaderSkeleton

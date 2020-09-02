import Link from 'next/link'
import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import config from '../../config'

interface Props {
  href: string | UrlObject
  as?: string | UrlObject
}

// PoolLink allows navigation within the same pool (it pre-fixes the passed href by the root address)
export const PoolLink: React.FunctionComponent<Props> = ({ href, as, children }) => {
  const { root } = useRouter().query

  if (!root) {
    throw new Error('expected `root` to be in route query, but was not')
  }

  // if set, require as to be string if href is string, and require it to be UrlObject if as is UrlObject
  if (as !== undefined && typeof href !== typeof as) {
    throw new Error('as and href need to be the same type')
  }

  let poolHref: string | UrlObject = ''
  let poolAs: string | UrlObject = ''
  if (typeof href === 'string') {
    poolHref = getHref(root, href)
    poolAs = getAs(root, as || href)
  } else {
    poolHref = {
      ...href,
      pathname: getHref(root, href.pathname),
    }
    poolAs = {
      ...((as as UrlObject) || href),
      pathname: getAs(root, href.pathname),
    }
  }
  return (
    <Link href={poolHref} as={poolAs} shallow>
      {children}
    </Link>
  )
}

function getHref(root: string | string[], href: string | null | undefined | UrlObject): string {
  const pool = config.pools.find((p) => root === p.addresses.ROOT_CONTRACT)
  if (pool) {
    return `/pool/[root]/[slug]${href}`
  }
  const upPool = config.upcomingPools.find((p) => root === p.slug)
  if (upPool) {
    return `/pool/[root]${href}`
  }

  throw new Error(`could not find root ${root} for href in pools or upcoming pools`)
}

function getAs(root: string | string[], as: string | null | undefined | UrlObject): string {
  const pool = config.pools.find((p) => root === p.addresses.ROOT_CONTRACT)
  if (pool) {
    return `/pool/${root}/${pool.slug}${as}`
  }
  const upPool = config.upcomingPools.find((p) => root === p.slug)
  if (upPool) {
    return `/pool/${root}${as}`
  }

  throw new Error(`could not find root ${root} for as in pools or upcoming pools`)
}

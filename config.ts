import { networkUrlToName } from './utils/networkNameResolver'
import poolConfigs from 'tinlake-pool-config'
import * as yup from 'yup'
import BN from 'bn.js'

interface PoolI {
  name: string
  slug: string
  shortName?: string
  assetOriginatorName?: string
  text?: string
  logo?: string
  website?: string
  email?: string
  details?: any
  asset: string
  additionalContactInfo?: {
    label: string
    link?: string
  }[]
}

export interface UpcomingPool extends PoolI {
  isUpcoming: true
  seniorInterestRate?: string
  minimumJuniorRatio?: string
}

export interface Pool extends PoolI {
  isUpcoming: false
  addresses: {
    ROOT_CONTRACT: string
    ACTIONS: string
    PROXY_REGISTRY: string
    COLLATERAL_NFT: string
  }
  graph?: string
  contractConfig: {
    JUNIOR_OPERATOR: 'ALLOWANCE_OPERATOR'
    SENIOR_OPERATOR: 'ALLOWANCE_OPERATOR' | 'PROPORTIONAL_OPERATOR'
  }
  description?: string
  investHtml?: string
}

export interface DisplayedField {
  key: string
  label: string
  type: string
  decimals?: number
  precision?: number
}

interface Config {
  rpcUrl: string
  etherscanUrl: string
  transactionTimeout: number
  tinlakeDataBackendUrl: string
  isDemo: boolean
  network: 'Mainnet' | 'Kovan'
  pools: Pool[]
  upcomingPools: UpcomingPool[]
  portisApiKey: string
}

const contractAddressesSchema = yup.object().shape({
  ROOT_CONTRACT: yup
    .string()
    .length(42)
    .matches(/0x[0-9a-fA-F]{40}/)
    .required('contractAddressesSchema.ROOT_CONTRACT is required'),
  ACTIONS: yup
    .string()
    .length(42)
    .matches(/0x[0-9a-fA-F]{40}/)
    .required('contractAddressesSchema.ACTIONS is required'),
  PROXY_REGISTRY: yup
    .string()
    .length(42)
    .matches(/0x[0-9a-fA-F]{40}/)
    .required('contractAddressesSchema.PROXY_REGISTRY is required'),
  COLLATERAL_NFT: yup
    .string()
    .length(42)
    .matches(/0x[0-9a-fA-F]{40}/),
})

const contractConfigSchema = yup.object().shape({
  JUNIOR_OPERATOR: yup
    .mixed<'ALLOWANCE_OPERATOR'>()
    .required('contractConfigSchema.JUNIOR_OPERATOR is required')
    .oneOf(['ALLOWANCE_OPERATOR']),
  SENIOR_OPERATOR: yup
    .mixed<'PROPORTIONAL_OPERATOR' | 'ALLOWANCE_OPERATOR'>()
    .required('contractConfigSchema.SENIOR_OPERATOR is required')
    .oneOf(['PROPORTIONAL_OPERATOR', 'ALLOWANCE_OPERATOR']),
})

// TODO: text/logo/etc should be required and description/investHtml removed,
// once we migrate all pool configs to the new format
const poolSchema = yup.object().shape({
  addresses: contractAddressesSchema.required('poolSchema.addresses is required'),
  graph: yup.string(),
  contractConfig: contractConfigSchema.required('poolSchema.contractConfig is required'),
  name: yup.string().required('poolSchema.name is required'),
  slug: yup.string().required('poolSchema.slug is required'),
  shortName: yup.string(),
  assetOriginatorName: yup.string(),
  text: yup.string(),
  logo: yup.string(),
  website: yup.string(),
  email: yup.string(),
  details: yup.object(),
  description: yup.string(),
  investHtml: yup.string(),
  asset: yup.string().required('poolSchema.asset is required'),
  additionalContactInfo: yup.array(
    yup.object().shape({
      label: yup.string().required('poolSchema.additionalContactInfo[?].label is required'),
      link: yup.string(),
    })
  ),
})

const upcomingPoolSchema = yup.object().shape({
  name: yup.string().required('poolSchema.name is required'),
  slug: yup.string().required('poolSchema.slug is required'),
  shortName: yup.string(),
  assetOriginatorName: yup.string(),
  text: yup.string(),
  logo: yup.string(),
  website: yup.string(),
  email: yup.string(),
  details: yup.object(),
  asset: yup.string().required('poolSchema.asset is required'),
  additionalContactInfo: yup.array(
    yup.object().shape({
      label: yup.string().required('poolSchema.additionalContactInfo[?].label is required'),
      link: yup.string(),
    })
  ),
  seniorInterestRate: yup.string().test('fee', "value must be a fee such as 1000000003170979198376458650", fee),
  minimumJuniorRatio: yup.string().test('between-1e23-1e27', "value must between 0 and 1e25", between1e23and1e27),
})

const poolsSchema = yup.array(poolSchema)
const upcomingPoolsSchema = yup.array(upcomingPoolSchema)

const selectedPoolConfig = yup
  .mixed<'kovanStaging' | 'mainnetStaging' | 'mainnetProduction'>()
  .required('POOLS config is required')
  .oneOf(['kovanStaging', 'mainnetStaging', 'mainnetProduction'])
  .validateSync(process.env.NEXT_PUBLIC_POOLS_CONFIG)

const pools = poolsSchema
  .validateSync(poolConfigs[`${selectedPoolConfig}`].filter((p: Pool) => p.addresses && p.addresses.ROOT_CONTRACT))
  .map((p) => ({ ...p, isUpcoming: false } as Pool))
const upcomingPools = upcomingPoolsSchema
  .validateSync(poolConfigs[`${selectedPoolConfig}`].filter((p: Pool) => !p.addresses || !p.addresses.ROOT_CONTRACT))
  .map((p) => ({ ...p, isUpcoming: true } as UpcomingPool))

const config: Config = {
  pools,
  upcomingPools,
  rpcUrl: yup
    .string()
    .required('NEXT_PUBLIC_RPC_URL is required')
    .url()
    .validateSync(process.env.NEXT_PUBLIC_RPC_URL),
  etherscanUrl: yup
    .string()
    .required('NEXT_PUBLIC_ETHERSCAN_URL is required')
    .url()
    .validateSync(process.env.NEXT_PUBLIC_ETHERSCAN_URL),
  transactionTimeout: yup
    .number()
    .required('NEXT_PUBLIC_TRANSACTION_TIMEOUT is required')
    .moreThan(0)
    .validateSync(process.env.NEXT_PUBLIC_TRANSACTION_TIMEOUT),
  tinlakeDataBackendUrl: yup
    .string()
    .required('NEXT_PUBLIC_TINLAKE_DATA_BACKEND_URL is required')
    .url()
    .validateSync(process.env.NEXT_PUBLIC_TINLAKE_DATA_BACKEND_URL),
  isDemo:
    yup
      .string()
      .required('NEXT_PUBLIC_ENV is required')
      .validateSync(process.env.NEXT_PUBLIC_ENV) === 'demo',
  network: yup
    .mixed<'Mainnet' | 'Kovan'>()
    .required('NEXT_PUBLIC_RPC_URL is required')
    .oneOf(['Mainnet', 'Kovan'])
    .validateSync(networkUrlToName(process.env.NEXT_PUBLIC_RPC_URL || '')),
  portisApiKey: yup
    .string()
    .required()
    .validateSync(process.env.NEXT_PUBLIC_PORTIS_KEY),
}

export default config

function between1e23and1e27(s: string): boolean {
  const n = new BN(s)
  if (n.gte(new BN('100000000000000000000000')) && n.lte(new BN('1000000000000000000000000000'))) {
    return true
  }
  return false
}

function fee(s: string): boolean {
  const n = new BN(s)
  if (n.gte(new BN('1000000000000000000000000000')) && n.lte(new BN('1000000009000000000000000000'))) {
    return true
  }
  return false
}

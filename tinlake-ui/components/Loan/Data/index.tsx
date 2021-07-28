import { DisplayField } from '@centrifuge/axis-display-field'
import { baseToDisplay, feeToInterestRate, ITinlake, Loan } from '@centrifuge/tinlake-js'
import BN from 'bn.js'
import { Box, Button, Table, TableBody, TableCell, TableRow } from 'grommet'
import { useRouter } from 'next/router'
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Pool } from '../../../config'
import { AuthState } from '../../../ducks/auth'
import { createTransaction, TransactionProps } from '../../../ducks/transactions'
import { addThousandsSeparators } from '../../../utils/addThousandsSeparators'
import { dateToYMD } from '../../../utils/date'
import { getAddressLink } from '../../../utils/etherscanLinkGenerator'
import { toPrecision } from '../../../utils/toPrecision'
import { LoadingValue } from '../../LoadingValue'
import LoanLabel from '../Label'

interface Props extends TransactionProps {
  loan: Loan
  tinlake: ITinlake
  auth?: AuthState
  poolConfig: Pool
}

const DisplayFieldWrapper = styled.div`
  width: 100%;
  max-width: 200px;
  > div {
    padding: 0;
  }
`

const LoanData: React.FC<Props> = (props: Props) => {
  const router = useRouter()
  const availableForFinancing = props.loan?.debt.isZero() ? props.loan?.principal || new BN(0) : new BN(0)

  const proxyTransfer = async () => {
    if (!props.loan.borrower) throw new Error('Borrower field missing')

    await props.createTransaction(`Transfer currency from proxy`, 'proxyTransferCurrency', [
      props.tinlake,
      props.loan.ownerOf,
      props.loan.borrower,
    ])
  }

  return (
    <Box gap="medium" pad="medium" elevation="small" round="xsmall" background="white" width="80%">
      <Box direction="row">
        <span
          style={{
            marginRight: '24px',
            color: '#999',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            position: 'relative',
            top: '4px',
            letterSpacing: '0.5px',
          }}
        >
          Status:
        </span>
        <LoadingValue done={!!props.loan} height={28} alignRight={false}>
          {props.loan && <LoanLabel loan={props.loan} />}
        </LoadingValue>
      </Box>
      <Box direction="row" justify="between">
        <Box width="360px">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell scope="row">Available for Financing</TableCell>
                <TableCell style={{ textAlign: 'end' }}>
                  <LoadingValue done={props.loan?.principal !== undefined}>
                    {addThousandsSeparators(toPrecision(baseToDisplay(availableForFinancing, 18), 2))}{' '}
                    {props.poolConfig.metadata.currencySymbol || 'DAI'}
                  </LoadingValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Outstanding</TableCell>
                <TableCell style={{ textAlign: 'end' }}>
                  <LoadingValue done={props.loan?.debt !== undefined}>
                    {addThousandsSeparators(toPrecision(baseToDisplay(props.loan?.debt || 0, 18), 2))}{' '}
                    {props.poolConfig.metadata.currencySymbol || 'DAI'}
                  </LoadingValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row" border={{ color: 'transparent' }}>
                  Maturity date
                </TableCell>
                <TableCell style={{ textAlign: 'end' }} border={{ color: 'transparent' }}>
                  <LoadingValue done={props.loan?.nft?.maturityDate !== undefined}>
                    {dateToYMD(props.loan?.nft?.maturityDate || 0)}
                  </LoadingValue>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        <Box width="360px">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell scope="row">Risk group</TableCell>
                <TableCell style={{ textAlign: 'end' }}>
                  <LoadingValue done={props.loan?.riskGroup !== undefined}>{props.loan?.riskGroup}</LoadingValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Financing fee</TableCell>
                <TableCell style={{ textAlign: 'end' }}>
                  <LoadingValue done={props.loan?.interestRate !== undefined}>
                    {toPrecision(feeToInterestRate(props.loan?.interestRate || 0), 2)} %
                  </LoadingValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row" border={{ color: 'transparent' }}>
                  Financed by
                </TableCell>
                <TableCell style={{ textAlign: 'end', float: 'right' }} border={{ color: 'transparent' }}>
                  <LoadingValue done={props.loan?.borrower !== undefined} height={24}>
                    {props.loan?.borrower && (
                      <DisplayFieldWrapper>
                        <DisplayField
                          copy={true}
                          as={'span'}
                          value={props.loan?.borrower}
                          link={{
                            href: getAddressLink(props.loan?.borrower),
                            target: '_blank',
                          }}
                        />
                      </DisplayFieldWrapper>
                    )}
                  </LoadingValue>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {props.loan?.ownerOf && props.loan?.borrower && 'transferCurrency' in router.query && (
            <Box margin={{ left: 'auto' }}>
              <Button label="Transfer currency from proxy" size="small" onClick={() => proxyTransfer()}></Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default connect((state) => state, { createTransaction })(LoanData)

/// <reference types="bn.js" />
import Tinlake from './Tinlake';
export declare const TinlakeWithActions: {
    new (...args: any[]): {
        getProxyAccessTokenOwner: (tokenId: string) => Promise<import("bn.js")>;
        buildProxy: (owner: string) => Promise<any>;
        getProxy: (accessTokenId: string) => Promise<any>;
        getProxyAccessToken: (proxyAddr: string) => Promise<any>;
        getProxyOwnerByLoan: (loanId: string) => Promise<import("bn.js")>;
        getProxyOwnerByAddress: (proxyAddress: string) => Promise<import("bn.js")>;
        proxyCount: () => Promise<import("bn.js")>;
        checkProxyExists: (address: string) => Promise<string | null>;
        proxyCreateNew: (address: string) => Promise<any>;
        proxyIssue: (proxyAddr: string, nftRegistryAddr: string, tokenId: string) => Promise<unknown>;
        proxyTransferIssue: (proxyAddr: string, nftRegistryAddr: string, tokenId: string) => Promise<unknown>;
        proxyLockBorrowWithdraw: (proxyAddr: string, loanId: string, amount: string, usr: string) => Promise<unknown>;
        proxyRepayUnlockClose: (proxyAddr: string, tokenId: string, loanId: string, registry: string) => Promise<unknown>;
        provider: any;
        eth: import("./services/ethereum").ethI;
        ethOptions: any;
        ethConfig: import("./Tinlake").EthConfig;
        contractAddresses: import("./Tinlake").ContractAddresses;
        transactionTimeout: number;
        contracts: import("./Tinlake").Contracts;
        contractAbis: import("./Tinlake").ContractAbis;
        contractConfig: any;
        setProvider: (provider: any, ethOptions?: any) => void;
        setContracts: () => void;
        setEthConfig: (ethConfig: import("./Tinlake").EthConfig) => void;
        createContract(address: string, abiName: string): void;
        getOperatorType: (tranche: string) => any;
    };
} & {
    new (...args: any[]): {
        issue: (registry: string, tokenId: string) => Promise<unknown>;
        nftLookup: (registry: string, tokenId: string) => Promise<any>;
        lock: (loan: string) => Promise<unknown>;
        unlock: (loan: string) => Promise<unknown>;
        close: (loan: string) => Promise<unknown>;
        borrow: (loan: string, currencyAmount: string) => Promise<unknown>;
        withdraw: (loan: string, currencyAmount: string, usr: string) => Promise<unknown>;
        repay: (loan: string, currencyAmount: string) => Promise<unknown>;
        provider: any;
        eth: import("./services/ethereum").ethI;
        ethOptions: any;
        ethConfig: import("./Tinlake").EthConfig;
        contractAddresses: import("./Tinlake").ContractAddresses;
        transactionTimeout: number;
        contracts: import("./Tinlake").Contracts;
        contractAbis: import("./Tinlake").ContractAbis;
        contractConfig: any;
        setProvider: (provider: any, ethOptions?: any) => void;
        setContracts: () => void;
        setEthConfig: (ethConfig: import("./Tinlake").EthConfig) => void;
        createContract(address: string, abiName: string): void;
        getOperatorType: (tranche: string) => any;
    };
} & {
    new (...args: any[]): {
        canQueryPermissions: () => boolean;
        isWard: (user: string, contractName: string) => Promise<import("bn.js")>;
        canSetInterestRate: (user: string) => Promise<boolean>;
        canSetSeniorTrancheInterest: (user: string) => Promise<boolean>;
        canSetRiskScore: (user: string) => Promise<boolean>;
        canSetMinimumJuniorRatio: (user: string) => Promise<boolean>;
        canSetInvestorAllowanceJunior: (user: string) => Promise<boolean>;
        canSetInvestorAllowanceSenior: (user: string) => Promise<boolean>;
        canSetLoanPrice: (user: string) => Promise<boolean>;
        existsRateGroup: (ratePerSecond: string) => Promise<boolean>;
        initRate: (ratePerSecond: string) => Promise<unknown>;
        changeRate: (loan: string, ratePerSecond: string) => Promise<unknown>;
        setRate: (loan: string, ratePerSecond: string) => Promise<unknown>;
        setMinimumJuniorRatio: (ratio: string) => Promise<unknown>;
        approveAllowanceJunior: (user: string, maxCurrency: string, maxToken: string) => Promise<unknown>;
        approveAllowanceSenior: (user: string, maxCurrency: string, maxToken: string) => Promise<unknown>;
        provider: any;
        eth: import("./services/ethereum").ethI;
        ethOptions: any;
        ethConfig: import("./Tinlake").EthConfig;
        contractAddresses: import("./Tinlake").ContractAddresses;
        transactionTimeout: number;
        contracts: import("./Tinlake").Contracts;
        contractAbis: import("./Tinlake").ContractAbis;
        contractConfig: any;
        setProvider: (provider: any, ethOptions?: any) => void;
        setContracts: () => void;
        setEthConfig: (ethConfig: import("./Tinlake").EthConfig) => void;
        createContract(address: string, abiName: string): void;
        getOperatorType: (tranche: string) => any;
    };
} & {
    new (...args: any[]): {
        supplySenior: (currencyAmount: string) => Promise<unknown>;
        redeemSenior: (tokenAmount: string) => Promise<unknown>;
        getSeniorTokenAllowance: (owner: string) => Promise<import("bn.js")>;
        approveSeniorToken: (tokenAmount: string) => Promise<unknown>;
        supplyJunior: (currencyAmount: string) => Promise<unknown>;
        redeemJunior: (tokenAmount: string) => Promise<unknown>;
        getJuniorTokenAllowance: (owner: string) => Promise<import("bn.js")>;
        approveJuniorToken: (tokenAmount: string) => Promise<unknown>;
        balance: () => Promise<unknown>;
        provider: any;
        eth: import("./services/ethereum").ethI;
        ethOptions: any;
        ethConfig: import("./Tinlake").EthConfig;
        contractAddresses: import("./Tinlake").ContractAddresses;
        transactionTimeout: number;
        contracts: import("./Tinlake").Contracts;
        contractAbis: import("./Tinlake").ContractAbis;
        contractConfig: any;
        setProvider: (provider: any, ethOptions?: any) => void;
        setContracts: () => void;
        setEthConfig: (ethConfig: import("./Tinlake").EthConfig) => void;
        createContract(address: string, abiName: string): void;
        getOperatorType: (tranche: string) => any;
    };
} & {
    new (...args: any[]): {
        getTotalDebt: () => Promise<import("bn.js")>;
        getTotalBalance: () => Promise<import("bn.js")>;
        getPrincipal: (loanId: string) => Promise<import("bn.js")>;
        getDebt: (loanID: string) => Promise<import("bn.js")>;
        loanCount: () => Promise<import("bn.js")>;
        getCollateral: (loanId: string) => Promise<any>;
        getOwnerOfCollateral: (nftRegistryAddr: string, tokenId: string) => Promise<import("bn.js")>;
        getInterestRate: (loanId: string) => Promise<import("bn.js")>;
        getOwnerOfLoan: (loanId: string) => Promise<any>;
        getStatus: (nftRegistryAddr: string, tokenId: string, loanId: string) => Promise<any>;
        getLoan: (loanId: string) => Promise<import("./types/tinlake").Loan | null>;
        getLoanList: () => Promise<import("./types/tinlake").Loan[]>;
        getInvestor: (user: string) => Promise<import("./types/tinlake").Investor>;
        getJuniorTokenBalance: (user: string) => Promise<import("bn.js")>;
        getJuniorTotalSupply: (user: string) => Promise<import("bn.js")>;
        getMaxSupplyAmountJunior: (user: string) => Promise<import("bn.js")>;
        getMaxRedeemAmountJunior: (user: string) => Promise<any>;
        getTokenPriceJunior: () => Promise<any>;
        existsSenior: () => boolean;
        getSeniorTokenBalance: (user: string) => Promise<import("bn.js")>;
        getSeniorTotalSupply: (user: string) => Promise<import("bn.js")>;
        getMaxSupplyAmountSenior: (user: string) => Promise<import("bn.js")>;
        getMaxRedeemAmountSenior: (user: string) => Promise<import("bn.js")>;
        getTokenPriceSenior: (user?: string | undefined) => Promise<import("bn.js")>;
        getSeniorReserve: () => Promise<import("bn.js")>;
        getJuniorReserve: () => Promise<import("bn.js")>;
        getMinJuniorRatio: () => Promise<import("bn.js")>;
        getCurrentJuniorRatio: () => Promise<import("bn.js")>;
        getAssetValueJunior: () => Promise<import("bn.js")>;
        getSeniorDebt: () => Promise<import("bn.js")>;
        getSeniorInterestRate: () => Promise<import("bn.js")>;
        provider: any;
        eth: import("./services/ethereum").ethI;
        ethOptions: any;
        ethConfig: import("./Tinlake").EthConfig;
        contractAddresses: import("./Tinlake").ContractAddresses;
        transactionTimeout: number;
        contracts: import("./Tinlake").Contracts;
        contractAbis: import("./Tinlake").ContractAbis;
        contractConfig: any;
        setProvider: (provider: any, ethOptions?: any) => void;
        setContracts: () => void;
        setEthConfig: (ethConfig: import("./Tinlake").EthConfig) => void;
        createContract(address: string, abiName: string): void;
        getOperatorType: (tranche: string) => any;
    };
} & {
    new (...args: any[]): {
        mintCurrency: (usr: string, amount: string) => Promise<unknown>;
        getCurrencyAllowance: (owner: string, spender: string) => Promise<import("bn.js")>;
        getJuniorForCurrencyAllowance: (owner: string) => Promise<import("bn.js") | undefined>;
        getSeniorForCurrencyAllowance: (owner: string) => Promise<import("bn.js") | undefined>;
        getCurrencyBalance: (user: string) => Promise<import("bn.js")>;
        approveCurrency: (usr: string, currencyAmount: string) => Promise<unknown>;
        approveSeniorForCurrency: (currencyAmount: string) => Promise<unknown>;
        approveJuniorForCurrency: (currencyAmount: string) => Promise<unknown>;
        provider: any;
        eth: import("./services/ethereum").ethI;
        ethOptions: any;
        ethConfig: import("./Tinlake").EthConfig;
        contractAddresses: import("./Tinlake").ContractAddresses;
        transactionTimeout: number;
        contracts: import("./Tinlake").Contracts;
        contractAbis: import("./Tinlake").ContractAbis;
        contractConfig: any;
        setProvider: (provider: any, ethOptions?: any) => void;
        setContracts: () => void;
        setEthConfig: (ethConfig: import("./Tinlake").EthConfig) => void;
        createContract(address: string, abiName: string): void;
        getOperatorType: (tranche: string) => any;
    };
} & {
    new (...args: any[]): {
        mintTitleNFT: (nftAddr: string, user: string) => Promise<any>;
        mintNFT: (nftAddr: string, owner: string, tokenId: string, ref: string, amount: string, asset: string) => Promise<unknown>;
        approveNFT: (nftAddr: string, tokenId: string, to: string) => Promise<unknown>;
        setNFTApprovalForAll: (nftAddr: string, to: string, approved: boolean) => Promise<unknown>;
        isNFTApprovedForAll: (nftAddr: string, owner: string, operator: string) => Promise<boolean>;
        getNFTCount: (nftAddr: string) => Promise<import("bn.js")>;
        getNFTData: (nftAddr: string, tokenId: string) => Promise<any>;
        getNFTOwner: (nftAddr: string, tokenId: string) => Promise<import("bn.js")>;
        transferNFT: (nftAddr: string, from: string, to: string, tokenId: string) => Promise<unknown>;
        provider: any;
        eth: import("./services/ethereum").ethI;
        ethOptions: any;
        ethConfig: import("./Tinlake").EthConfig;
        contractAddresses: import("./Tinlake").ContractAddresses;
        transactionTimeout: number;
        contracts: import("./Tinlake").Contracts;
        contractAbis: import("./Tinlake").ContractAbis;
        contractConfig: any;
        setProvider: (provider: any, ethOptions?: any) => void;
        setContracts: () => void;
        setEthConfig: (ethConfig: import("./Tinlake").EthConfig) => void;
        createContract(address: string, abiName: string): void;
        getOperatorType: (tranche: string) => any;
    };
} & {
    new (...args: any[]): {
        relyAddress: (usr: string, contractAddress: string) => Promise<unknown>;
        provider: any;
        eth: import("./services/ethereum").ethI;
        ethOptions: any;
        ethConfig: import("./Tinlake").EthConfig;
        contractAddresses: import("./Tinlake").ContractAddresses;
        transactionTimeout: number;
        contracts: import("./Tinlake").Contracts;
        contractAbis: import("./Tinlake").ContractAbis;
        contractConfig: any;
        setProvider: (provider: any, ethOptions?: any) => void;
        setContracts: () => void;
        setEthConfig: (ethConfig: import("./Tinlake").EthConfig) => void;
        createContract(address: string, abiName: string): void;
        getOperatorType: (tranche: string) => any;
    };
} & typeof Tinlake;
export default TinlakeWithActions;
export * from './types/tinlake';
export * from './utils/baseToDisplay';
export * from './utils/bnToHex';
export * from './utils/displayToBase';
export * from './utils/feeToInterestRate';
export * from './utils/getLoanStatus';
export * from './utils/interestRateToFee';

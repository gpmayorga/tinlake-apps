import { Constructor, TinlakeParams } from '../Tinlake';
import { Loan, Investor } from '../types/tinlake';
import BN from 'bn.js';
export declare function AnalyticsActions<ActionsBase extends Constructor<TinlakeParams>>(Base: ActionsBase): {
    new (...args: any[]): {
        getTotalDebt: () => Promise<BN>;
        getTotalBalance: () => Promise<BN>;
        getPrincipal: (loanId: string) => Promise<BN>;
        getDebt: (loanID: string) => Promise<BN>;
        loanCount: () => Promise<BN>;
        getCollateral: (loanId: string) => Promise<any>;
        getOwnerOfCollateral: (nftRegistryAddr: string, tokenId: string) => Promise<BN>;
        getInterestRate: (loanId: string) => Promise<BN>;
        getOwnerOfLoan: (loanId: string) => Promise<any>;
        getStatus: (nftRegistryAddr: string, tokenId: string, loanId: string) => Promise<any>;
        getLoan: (loanId: string) => Promise<Loan | null>;
        getLoanList: () => Promise<Loan[]>;
        getInvestor: (user: string) => Promise<Investor>;
        getJuniorTokenBalance: (user: string) => Promise<BN>;
        getMaxSupplyAmountJunior: (user: string) => Promise<BN>;
        getMaxRedeemAmountJunior: (user: string) => Promise<any>;
        getTokenPriceJunior: () => Promise<any>;
        existsSenior: () => boolean;
        getSeniorTokenBalance: (user: string) => Promise<BN>;
        getMaxSupplyAmountSenior: (user: string) => Promise<BN>;
        getMaxRedeemAmountSenior: (user: string) => Promise<BN>;
        getTokenPriceSenior: (user: string) => Promise<BN>;
        getSeniorReserve: () => Promise<BN>;
        getJuniorReserve: () => Promise<BN>;
        getMinJuniorRatio: () => Promise<BN>;
        getCurrentJuniorRatio: () => Promise<BN>;
        getAssetValueJunior: () => Promise<BN>;
        getSeniorDebt: () => Promise<BN>;
        getSeniorInterestRate: () => Promise<BN>;
        provider: any;
        eth: import("../services/ethereum").ethI;
        ethOptions: any;
        ethConfig: {} | import("../Tinlake").EthConfig;
        contractAddresses: import("../Tinlake").ContractAddresses;
        transactionTimeout: number;
        contracts: import("../Tinlake").Contracts;
        contractAbis: import("../Tinlake").ContractAbis;
        contractConfig: any;
        setProvider: (provider: any, ethOptions?: any) => void;
        setEthConfig: (ethConfig: {} | import("../Tinlake").EthConfig) => void;
        setContractAddresses: () => Promise<void>;
        createContract(address: string, abiName: string): void;
        nftLookup: (registry: string, tokenId: string) => Promise<any>;
        getOperatorType: (tranche: string) => any;
    };
} & ActionsBase;
export declare type IAnalyticsActions = {
    getTotalDebt(): Promise<BN>;
    getTotalBalance(): Promise<BN>;
    getDebt(loanId: string): Promise<BN>;
    loanCount(): Promise<BN>;
    getLoanList(): Promise<Loan[]>;
    getLoan(loanId: string): Promise<Loan | null>;
    getCollateral(loanId: string): Promise<any>;
    getPrincipal(loanId: string): Promise<BN>;
    getInterestRate(loanId: string): Promise<BN>;
    getOwnerOfLoan(loanId: string): Promise<BN>;
    getOwnerOfCollateral(nftRegistryAddr: string, tokenId: string, loanId: string): Promise<BN>;
    existsSenior(): boolean;
    getJuniorReserve(): Promise<BN>;
    getSeniorReserve(): Promise<BN>;
    getJuniorTokenBalance(user: string): Promise<BN>;
    getSeniorTokenBalance(user: string): Promise<BN>;
    getMaxSupplyAmountJunior(user: string): Promise<BN>;
    getMaxRedeemAmountJunior(user: string): Promise<BN>;
    getMaxSupplyAmountSenior(user: string): Promise<BN>;
    getMaxRedeemAmountSenior(user: string): Promise<BN>;
    getTokenPriceJunior(): Promise<BN>;
    getTokenPriceSenior(user: string): Promise<BN>;
    getSeniorDebt(): Promise<BN>;
    getSeniorInterestRate(): Promise<BN>;
    getMinJuniorRatio(): Promise<BN>;
    getCurrentJuniorRatio(): Promise<BN>;
    getAssetValueJunior(): Promise<BN>;
    getInvestor(user: string): Promise<Investor>;
};
export default AnalyticsActions;

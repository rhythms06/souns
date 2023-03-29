import { BigNumberish } from "ethers";

export type EditionConfig = {
  name: string;
  symbol: string;
  metadataModule: string;
  baseURI: string;
  contractURI: string;
  fundingRecipient: string;
  royaltyBPS: number;
  editionMaxMintableLower: number;
  editionMaxMintableUpper: number;
  editionCutoffTime: number;
  shouldFreezeMetadata: boolean;
  shouldEnableMintRandomness: boolean;
  enableOperatorFiltering: boolean; // Opensea OperatorFilter for royalties https://github.com/ProjectOpenSea/operator-filter-registry
};

export enum MinterType {
  EDITION_MAX_MINTER,
  RANGE_MINTER,
  MERKLE_DROP_MINTER,
  FIXED_PRICE_SIGNATURE_MINTER,
  NULL,
}

export type MintConfigBase = {
  minterAddress: string;
  price: BigNumberish;
  startTime: number;
  endTime: number;
  affiliateFeeBPS: number;
};

export type MerkleDropConfig = MintConfigBase & {
  mintType: "MerkleDrop";
  merkleRoot: string;
  maxMintable: number;
  maxMintablePerAccount: number;
};

export type RangeEditionConfig = MintConfigBase & {
  mintType: "RangeEdition";
  cutoffTime: number;
  maxMintableLower: number;
  maxMintableUpper: number;
  maxMintablePerAccount: number;
};

export type MintConfig = MerkleDropConfig | RangeEditionConfig;

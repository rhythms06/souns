import { MinterType } from "./types";

export type LoadingState = {
  generatingProposalBytecode: boolean;
  submittingProposal: boolean;
};

export interface State extends LoadingState {
  songName: string;
  songSymbol: string;
  metadataModule: string;
  baseUri: string;
  contractUri: string;
  fundingRecipient: string;
  royaltyBps: number;
  editionMaxMintable: number;
  editionCutoffTime: number;
  flags: number;
  step: number;
  minter: MinterType;
  proposalBytecode: string;
}

export type Action =
  | { type: "SET_SONG_NAME"; payload: string }
  | { type: "SET_SONG_SYMBOL"; payload: string }
  | { type: "SET_METADATA_MODULE"; payload: string }
  | { type: "SET_BASE_URI"; payload: string }
  | { type: "SET_CONTRACT_URI"; payload: string }
  | { type: "SET_FUNDING_RECIPIENT"; payload: string }
  | { type: "SET_ROYALTY_BPS"; payload: number }
  | { type: "SET_EDITION_MAX_MINTABLE"; payload: number }
  | { type: "SET_EDITION_CUTOFF_TIME"; payload: number }
  | { type: "SET_FLAGS"; payload: number }
  | { type: "STEP_FORWARD" }
  | { type: "STEP_BACKWARD" }
  | { type: "GENERATE_BYTECODE" }
  | { type: "SET_PROPOSAL_BYTECODE"; payload: string }
  | { type: "SELECT_MINTER"; payload: MinterType };

// TODO: Remove these hardcoded values
const SONG_NAME = "Never Gonna Give You Up";
const SONG_SYMBOL = "NEVER";
const METADATA_MODULE = "0x3ca50e8da8c3d359fc934aea0161f5346ccb62a1";
const BASE_URI = "https://example.com/metadata/";
const CONTRACT_URI = "https://example.com/storefront/";
const FUNDING_RECIPIENT = "0xbbfb154C1ff9df449707819CC3d251C7B1DCCaDE";
const ROYALTY_BPS = 100;
const ARTIST_ADMIN = "0xbbfb154C1ff9df449707819CC3d251C7B1DCCaDE";
const EDITION_MAX_MINTABLE = 1000;
const EDITION_CUTOFF_TIME = 200;
const FLAGS = 2;
// const SOUND_FEE_ADDRESS = address(2222222222);
// const PLATFORM_FEE_BPS = 200;
// const MAX_BPS = 10_000;

export const initialState = {
  step: 0,
  songName: SONG_NAME,
  songSymbol: SONG_SYMBOL,
  metadataModule: METADATA_MODULE,
  baseUri: BASE_URI,
  contractUri: CONTRACT_URI,
  fundingRecipient: FUNDING_RECIPIENT,
  royaltyBps: ROYALTY_BPS,
  editionMaxMintable: EDITION_MAX_MINTABLE,
  editionCutoffTime: EDITION_CUTOFF_TIME,
  flags: FLAGS,
  minter: MinterType.NULL,
  proposalBytecode: "",
  generatingProposalBytecode: false,
  submittingProposal: false,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_SONG_NAME":
      return { ...state, songName: action.payload };
    case "SET_SONG_SYMBOL":
      return { ...state, songSymbol: action.payload };
    case "SET_METADATA_MODULE":
      return { ...state, metadataModule: action.payload };
    case "SET_BASE_URI":
      return { ...state, baseUri: action.payload };
    case "SET_CONTRACT_URI":
      return { ...state, contractUri: action.payload };
    case "SET_FUNDING_RECIPIENT":
      return { ...state, fundingRecipient: action.payload };
    case "SET_ROYALTY_BPS":
      return { ...state, royaltyBps: action.payload };
    case "SET_EDITION_MAX_MINTABLE":
      return { ...state, editionMaxMintable: action.payload };
    case "SET_EDITION_CUTOFF_TIME":
      return { ...state, editionCutoffTime: action.payload };
    case "SET_FLAGS":
      return { ...state, flags: action.payload };
    case "STEP_FORWARD":
      return { ...state, step: state.step + 1 };
    case "STEP_BACKWARD":
      return { ...state, step: state.step - 1 };
    case "GENERATE_BYTECODE":
      return { ...state, generatingProposalBytecode: true };
    case "SET_PROPOSAL_BYTECODE":
      return {
        ...state,
        generatingProposalBytecode: false,
        proposalBytecode: action.payload,
      };
    case "SELECT_MINTER":
      return { ...state, minter: action.payload };
    default:
      return state;
  }
};

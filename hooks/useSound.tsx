import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  ContractCall,
  EditionConfig,
  MintConfig,
  SoundClient,
} from "@soundxyz/sdk";
import { contractAddresses } from "@soundxyz/sound-protocol";
import {
  MerkleDropMinter__factory,
  RangeEditionMinter__factory,
  SoundCreatorV1__factory,
  ISoundEditionV1_1__factory,
} from "@soundxyz/sound-protocol/typechain/index";
import { editionInitFlags, MINTER_ROLE } from "@soundxyz/sdk/utils/constants";
import { Overrides } from "ethers";

import { AppContext } from "../contexts/AppContext";
import { MinterType } from "../types";
import { getSaltAsBytes32 } from "../utils/helpers";

interface OptionalOverrides {
  gasLimit?: number;
  maxFeePerGas?: number;
  maxPriorityFeePerGas?: number;
}

export const useSound = ({
  gasLimit = undefined,
  maxFeePerGas = undefined,
  maxPriorityFeePerGas = undefined,
}: OptionalOverrides) => {
  const { address, connector } = useAccount();

  const { dispatch, state } = useContext(AppContext);
  const [client, setClient] = useState<SoundClient>();
  const [signer, setSigner] = useState<any>();
  const [soundCreatorAddress, setSoundCreatorAddress] = useState<string>();

  useEffect(() => {
    async function initSoundClient() {
      if (!connector) return;

      const mySigner = await connector?.getSigner();

      setSigner(mySigner);

      // check chainid and set soundCreatorAddress dpeending if it's mainnet or goerli
      const chainId = await connector.getChainId();
      if (chainId === 1) {
        setSoundCreatorAddress(contractAddresses.mainnet.soundCreatorV1);
      } else if (chainId === 5) {
        setSoundCreatorAddress(contractAddresses.goerli.soundCreatorV1);
      } else {
        throw new Error("Unsupported chainId");
      }

      const _client = SoundClient({
        signer: mySigner,
        soundCreatorAddress: contractAddresses.mainnet.soundCreatorV1,
      });

      setClient(_client);
    }

    initSoundClient();
  }, [connector, signer]);

  const generateProposalPayload = async () => {
    if (!client) return;
    if (!address) return;
    if (!signer) return;
    if (!soundCreatorAddress) return;

    dispatch({ type: "GENERATE_BYTECODE" });

    const customSalt = "0x" + Math.random().toString(16).slice(2);

    const editionConfig: EditionConfig = {
      name: state.songName,
      symbol: state.songSymbol,
      metadataModule: state.metadataModule,
      contractURI: state.contractUri,
      baseURI: state.baseUri,
      fundingRecipient: state.fundingRecipient,
      royaltyBPS: state.royaltyBps,
      editionMaxMintableUpper: state.editionMaxMintable,
      editionMaxMintableLower: 0,
      editionCutoffTime: state.editionCutoffTime,
      shouldFreezeMetadata: false,
      shouldEnableMintRandomness: true,
      enableOperatorFiltering: true,
    };

    const mintConfigs: MintConfig[] = [];

    switch (MinterType[state.minter]) {
      case "RANGE_MINTER":
        mintConfigs.push({
          mintType: "RangeEdition",
          cutoffTime: state.editionCutoffTime,
          minterAddress: contractAddresses.mainnet.rangeEditionMinter,
          price: 0,
          startTime: 0,
          endTime: 0,
          affiliateFeeBPS: 0,
          maxMintableUpper: state.editionMaxMintable,
          maxMintableLower: 0,
          maxMintablePerAccount: 1,
        });
        break;
      default:
        break;
    }

    // Transaction
    const txnOverrides: Overrides = {
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
    };

    const formattedSalt = getSaltAsBytes32(
      customSalt || Math.random() * 1_000_000_000_000_000,
    );

    // Precompute the edition address.
    const [editionAddress, _] = await SoundCreatorV1__factory.connect(
      soundCreatorAddress,
      signer,
    ).soundEditionAddress(address, formattedSalt);

    console.log("Precompute Edition Address ", editionAddress);

    const editionInterface = ISoundEditionV1_1__factory.createInterface();

    /**
     * Encode all the bundled contract calls.
     */
    const contractCalls: ContractCall[] = [];

    console.log("Grant Roles");
    // Grant MINTER_ROLE for each minter.
    const mintersToGrantRole = Array.from(
      new Set(mintConfigs.map((m) => m.minterAddress)),
    );
    for (const minterAddress of mintersToGrantRole) {
      contractCalls.push({
        contractAddress: editionAddress,
        // TODO: The new contract interface removed grantRoles, but there should be an equivalent function.
        calldata: editionInterface.encodeFunctionData("grantRoles", [
          minterAddress,
          MINTER_ROLE,
        ]),
      });
    }

    // Add the createEditionMint calls.
    for (const mintConfig of mintConfigs) {
      /**
       * Set up the createEditionMint call for each mint config.
       */
      switch (mintConfig.mintType) {
        case "RangeEdition": {
          const minterInterface = RangeEditionMinter__factory.createInterface();
          contractCalls.push({
            contractAddress: mintConfig.minterAddress,

            calldata: minterInterface.encodeFunctionData("createEditionMint", [
              editionAddress,
              mintConfig.price,
              Math.floor(mintConfig.startTime),
              Math.floor(mintConfig.cutoffTime),
              Math.floor(mintConfig.endTime),
              mintConfig.affiliateFeeBPS,
              Math.floor(mintConfig.maxMintableLower),
              Math.floor(mintConfig.maxMintableUpper),
              Math.floor(mintConfig.maxMintablePerAccount),
            ]),
          });
          break;
        }
        case "MerkleDrop": {
          const minterInterface = MerkleDropMinter__factory.createInterface();
          contractCalls.push({
            contractAddress: mintConfig.minterAddress,
            calldata: minterInterface.encodeFunctionData("createEditionMint", [
              editionAddress,
              mintConfig.merkleRoot,
              mintConfig.price,
              Math.floor(mintConfig.startTime),
              Math.floor(mintConfig.endTime),
              mintConfig.affiliateFeeBPS,
              Math.floor(mintConfig.maxMintable),
              Math.floor(mintConfig.maxMintablePerAccount),
            ]),
          });
          break;
        }
      }
    }

    let flags = 0;
    if (editionConfig.shouldFreezeMetadata)
      flags |= editionInitFlags.METADATA_IS_FROZEN;
    if (editionConfig.shouldEnableMintRandomness)
      flags |= editionInitFlags.MINT_RANDOMNESS_ENABLED;
    if (editionConfig.enableOperatorFiltering)
      flags |= editionInitFlags.OPERATOR_FILTERING_ENABLED;

    console.log("encode Initialize for edition ");
    /**
     * Encode the SoundEdition.initialize call.
     */
    const editionInitData = editionInterface.encodeFunctionData("initialize", [
      editionConfig.name,
      editionConfig.symbol,
      editionConfig.metadataModule,
      editionConfig.baseURI,
      editionConfig.contractURI,
      editionConfig.fundingRecipient,
      editionConfig.royaltyBPS,
      Math.floor(editionConfig.editionMaxMintableLower),
      Math.floor(editionConfig.editionMaxMintableUpper),
      Math.floor(editionConfig.editionCutoffTime),
      flags,
    ]);

    console.log("connect sound creator contract");
    const soundCreatorContract = SoundCreatorV1__factory.connect(
      soundCreatorAddress,
      signer,
    );

    const bytecode = soundCreatorContract.interface.encodeFunctionData(
      "createSoundAndMints",
      [
        formattedSalt,
        editionInitData,
        contractCalls.map((d) => d.contractAddress),
        contractCalls.map((d) => d.calldata),
      ],
    );

    console.log("createSoundAndMints bytecode ", bytecode);

    dispatch({ type: "SET_PROPOSAL_BYTECODE", payload: bytecode });

    return bytecode;
  };

  return { client, generateProposalPayload };
};

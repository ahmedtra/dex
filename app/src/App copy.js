import './App.css';
import React, { Component } from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK, { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import nft from './assets/clippy.gif';
import os from './assets/os.png';
import link from './assets/paperclip.png';
import wallet from './assets/wallet.png';
import Countdown from 'react-countdown';
import './counter.css';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
	/*	if (completed) {
			// Render a completed state
			return <Completionist />;
		} else {*/
	// Render a countdowns

	if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {

		window.location.reload(true);
		console.log("Mint Begins");
	}


	return <div class="counterBlock"><div class="days">{days}</div><div class="dots">:</div><div class="days">{hours}</div><div class="dots">:</div><div class="days">{minutes}</div><div class="dots">:</div><div class="sec">{seconds}</div></div>;
	/*	}*/
};

var Scroll = require('react-scroll');

var Link = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;

const ops = () => {
	window.open("#");
}

const tweet = () => {
	window.open("https://clippy.vip/");
}

let account;
let mintAmount = 1;
let valueOfNFTs = 0;
let totalSupplyNFT;
let totalSupplyNFT2;
let maxMintNFTs;
let onlyLeft;
let owner;
let publicSale;
let user_input;
let wMintAmount;
let myTokens = [];
let myTokens2 = [];
let adminWhitelistAddresses = [];
let adminPanel = 0;
let adminWhitelistAddresses2 = [];
let maxTokensToBuy = "";
let testingvalue;
let wlMint;
let FinalResult;
let wlMsg = "Whitelist Mint";
let mintStatus = ''
let cost = '';
let wlCost = '';
let max_per_wallet = '';
let publicMintMsg = "Public Mint";
let freeMinted;
let usdtAmount = 25000000;
let token_contract;

// 1. Import libraries. Use `npm` package manager to install
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// 2. Collect list of wallet addresses from competition, raffle, etc.
// Store list of addresses in some data sheeet (Google Sheets or Excel)
let whitelistAddresses = [

];

let whitelistAddresses2 = [];

// 3. Create a new array of `leafNodes` by hashing all indexes of the `whitelistAddresses`
// using `keccak256`. Then creates a Merkle Tree object using keccak256 as the algorithm.
//
// The leaves, merkleTree, and rootHas are all PRE-DETERMINED prior to whitelist claim
const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

const leafNodes2 = whitelistAddresses2.map(addr2 => keccak256(addr2));
const merkleTree2 = new MerkleTree(leafNodes2, keccak256, { sortPairs: true });

// 4. Get root hash of the `merkleeTree` in hexadecimal format (0x)
// Print out the Entire Merkle Tree.
const rootHash = merkleTree.getRoot();
const rootHashHash = merkleTree.getHexRoot();

const rootHash2 = merkleTree2.getRoot();
const rootHashHash2 = merkleTree2.getHexRoot();

let ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_initBaseURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_initNotRevealedUri",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contractURI",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ApprovalCallerNotOwnerNorApproved",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApprovalQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApprovalToCurrentOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApproveToCaller",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BalanceQueryForZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MintToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MintZeroQuantity",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "OperatorNotAllowed",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OwnerIndexOutOfBounds",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OwnerQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TokenIndexOutOfBounds",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferCallerNotOwnerNorApproved",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferFromIncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferToNonERC721ReceiverImplementer",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "URIQueryForNonexistentToken",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "MAX_SUPPLY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "OPERATOR_FILTER_REGISTRY",
		"outputs": [
			{
				"internalType": "contract IOperatorFilterRegistry",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "receiver",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "quantity",
				"type": "uint256[]"
			}
		],
		"name": "airdrop",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "daysToMint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "daysToReveal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBaseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "max_per_wallet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "notRevealedUri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "publicMinted",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "publicSaleCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "public_mint_status",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "revealDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_salePrice",
				"type": "uint256"
			}
		],
		"name": "royaltyInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_contractURI",
				"type": "string"
			}
		],
		"name": "setContractURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_daysToMint",
				"type": "uint256"
			}
		],
		"name": "setDaysToMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_decimals",
				"type": "uint256"
			}
		],
		"name": "setDecimals",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_MAX_SUPPLY",
				"type": "uint256"
			}
		],
		"name": "setMAX_SUPPLY",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_max_per_wallet",
				"type": "uint256"
			}
		],
		"name": "setMax_per_wallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newDateMint",
				"type": "uint256"
			}
		],
		"name": "setMintDate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_notRevealedURI",
				"type": "string"
			}
		],
		"name": "setNotRevealedURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_publicSaleCost",
				"type": "uint256"
			}
		],
		"name": "setPublicSaleCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newDate",
				"type": "uint256"
			}
		],
		"name": "setRevealDate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "uint96",
				"name": "_royaltyFeesInBips",
				"type": "uint96"
			}
		],
		"name": "setRoyaltyInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenContract",
				"type": "address"
			}
		],
		"name": "setTokenContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggle_public_mint_status",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token_Contract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];

let address = "0xF1793829acfe8f87a96F023938257653698a94a0";

const token_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const token_address = "0x10318C239412f4C29170Ac1a6718F40c268e88EF";

let contract;

class Home extends Component {

	state = {
		walletAddress: "",
		totalSupply: "",
		currentPrice: "",
		nextPrice: "",
		nextSessionAmount: "",
		onlyLeftAmount: "",
		statusError: false,
		statusLoading: false,
		success: false,
		statusErrorWL: false,
		statusLoadingWL: false,
		successWL: false,
		nftMintingAmount: '1',
		totalValue: "",
		presaleValue: "0",
		maxmint: '',
		_adminPanel: 0,
		_adminWhitelistAddresses: [],
		_adminWhitelistAddresses2: [],
		_maxTokensToBuy: "",
		_testingValue: '',
		_wlMint: '',
		_FinalResult: '',
		_wlMsg: 'WL Mint',
		_publicMintMsg: 'Mint Here',
		_mintStatus: false,
		_cost: 0,
		_wlCost: '',
		_wlMintAmount: '',
		_max_per_wallet: '',
		_owner: '',
		_freeMinted: '',
		_approved: '',
		stateNow: Date.now()
	}

	async componentDidMount() {

		if (localStorage?.getItem('isWalletConnected') === 'true') {

			const providerOptions = {
				walletconnect: {
					package: WalletConnectProvider, // required
					options: {
						infuraId: "811915bee3744bd38afcf17ecac0f9a6" // required
					}
				},
				coinbasewallet: {
					package: CoinbaseWalletSDK, // Required
					options: {
						appName: "Aterium Universe", // Required
						infuraId: "811915bee3744bd38afcf17ecac0f9a6", // Required
						rpc: "", // Optional if `infuraId` is provided; otherwise it's required
						chainId: 1, // Optional. It defaults to 1 if not provided
						darkMode: true // Optional. Use dark theme, defaults to false
					}
				}
			};

			const web3Modal = new Web3Modal({
				network: "mainnet", // optional
				cacheProvider: true, // optional
				providerOptions // required
			});



			const provider = await web3Modal.connect();

			//  Enable session (triggers QR Code modal)
			await provider.enable();

			const web3 = new Web3(provider);
			console.log("provider : " + provider);
			// Subscribe to accounts change
			provider.on("accountsChanged", (accounts) => {
				console.log(accounts);
			});

			// Subscribe to chainId change
			provider.on("chainChanged", (chainId) => {
				console.log(chainId);
			});

			// Subscribe to provider connection
			provider.on("connect", (info) => {
				console.log(info);
				console.log("I'm LOGGED IN");
			});

			// Subscribe to provider disconnection
			provider.on("disconnect", (error) => {
				console.log(error);
			});

			// test if wallet is connected
			if (web3Modal.cachedProvider) {
				// connected now you can get accounts
				console.log("web3Modal.cachedProvider :" + web3Modal.cachedProvider);
				console.log("provider :" + provider);

				const accounts = await web3.eth.getAccounts();

				account = accounts[0];
				this.setState({ walletAddress: account });

				contract = new web3.eth.Contract(ABI, address);
				token_contract = new web3.eth.Contract(token_ABI, token_address);

				console.log("contract :" + contract);

				if (provider) {


					//	(async () => {

					if (web3Modal.cachedProvider != "walletconnect" && web3Modal.cachedProvider != "coinbasewallet") {

						const chainId = 5;

						if (window.ethereum.networkVersion !== chainId) {
							try {
								await window.ethereum.request({
									method: 'wallet_switchEthereumChain',
									params: [{ chainId: web3.utils.toHex(chainId) }],
								});
							} catch (err) {
								// This error code indicates that the chain has not been added to MetaMask.
								if (err.code === 4902) {
									await window.ethereum.request({
										method: 'wallet_addEthereumChain',
										params: [
											{
												/*chainName: 'Ethereum Mainnet',
												chainId: web3.utils.toHex(chainId),
												nativeCurrency: { name: 'Ethereum Mainnet', decimals: 18, symbol: 'ETH' },
												rpcUrls: ['https://mainnet.infura.io/v3/'],*/

												/*chainName: 'Rinkeby Test Network',
												chainId: web3.utils.toHex(chainId),
												nativeCurrency: { name: 'RinkebyETH', decimals: 18, symbol: 'ETH' },
												rpcUrls: ['https://rinkeby.infura.io/v3/'],*/

												chainName: 'Goerli Test Network',
												chainId: web3.utils.toHex(chainId),
												nativeCurrency: { name: 'Goerli Test Network', decimals: 18, symbol: 'GoerliETH' },
												rpcUrls: ['https://goerli.infura.io/v3/'],
											},
										],
									});
								}
							}
						}

						try {

							try {
								localStorage.setItem('isWalletConnected', true);
							} catch (ex) {
								console.log(ex)
							}

							let allowance = await token_contract.methods.allowance(account, address).call();

							if (allowance >= usdtAmount) {
								this.setState({ _approved: true });
								console.log("true Allowance:" + allowance);


							} else {
								this.setState({ _approved: false });
								console.log("false Allowance:" + allowance);

							}


							totalSupplyNFT = await contract.methods.totalSupply().call();
							this.setState({ totalSupply: totalSupplyNFT });
							console.log("Total Supply:" + totalSupplyNFT);

							max_per_wallet = await contract.methods.max_per_wallet().call();
							this.setState({ _max_per_wallet: max_per_wallet });
							console.log("max_per_wallet:" + max_per_wallet);

							publicSale = await contract.methods.balanceOf(account).call();
							this.setState({ myNFTWallet: publicSale });

							cost = await contract.methods.publicSaleCost().call();
							this.setState({ _cost: cost });
							console.log("cost :" + cost);

							owner = await contract.methods.owner().call();
							this.setState({ _owner: owner });
							console.log("Owner" + owner);

							if (owner == account) {
								console.log("owner : " + owner)
								onlyLeft = 10000 - totalSupplyNFT;

								if (mintAmount > onlyLeft) {
									mintAmount = onlyLeft;
								}

								valueOfNFTs = mintAmount * 0;
								wMintAmount = mintAmount;


								this.setState({ nftMintingAmount: mintAmount });

								this.setState({ totalValue: valueOfNFTs });
							} else {
								mintAmount = 1;

								if (totalSupplyNFT == 10000) {

									onlyLeft = 10000 - publicSale;
									mintAmount = onlyLeft;
									this.setState({ msg: "SOLD OUT" });

								} else {
									mintAmount = 1;
									onlyLeft = max_per_wallet - publicSale;

									if (mintAmount > onlyLeft) {
										mintAmount = onlyLeft;
									}
									//mintAmount = onlyLeft;

									valueOfNFTs = mintAmount * this.state._cost;
									wMintAmount = mintAmount;


									this.setState({ nftMintingAmount: mintAmount });

									this.setState({ totalValue: valueOfNFTs });
								}
							}


						} catch (err) {
							console.log("err: " + err);

						}

					} else if (web3Modal.cachedProvider == "walletconnect") {

						const chainId = 5;

						if (WalletConnectProvider.networkVersion !== chainId) {
							try {
								await WalletConnectProvider.request({
									method: 'wallet_switchEthereumChain',
									params: [{ chainId: web3.utils.toHex(chainId) }],
								});
							} catch (err) {
								// This error code indicates that the chain has not been added to MetaMask.
								if (err.code === 4902) {
									await window.ethereum.request({
										method: 'wallet_addEthereumChain',
										params: [
											{
												/*chainName: 'Ethereum Mainnet',
												chainId: web3.utils.toHex(chainId),
												nativeCurrency: { name: 'Ethereum Mainnet', decimals: 18, symbol: 'ETH' },
												rpcUrls: ['https://mainnet.infura.io/v3/'],*/

												/*chainName: 'Rinkeby Test Network',
												chainId: web3.utils.toHex(chainId),
												nativeCurrency: { name: 'RinkebyETH', decimals: 18, symbol: 'ETH' },
												rpcUrls: ['https://rinkeby.infura.io/v3/'],*/

												chainName: 'Goerli Test Network',
												chainId: web3.utils.toHex(chainId),
												nativeCurrency: { name: 'Goerli Test Network', decimals: 18, symbol: 'GoerliETH' },
												rpcUrls: ['https://goerli.infura.io/v3/'],
											},
										],
									});
								}
							}
						}


						try {

							try {
								localStorage.setItem('isWalletConnected', true);
							} catch (ex) {
								console.log(ex)
							}

							let allowance = await token_contract.methods.allowance(account, address).call();

							if (allowance >= usdtAmount) {
								this.setState({ _approved: true });
								console.log("true Allowance:" + allowance);


							} else {
								this.setState({ _approved: false });
								console.log("false Allowance:" + allowance);

							}


							totalSupplyNFT = await contract.methods.totalSupply().call();
							this.setState({ totalSupply: totalSupplyNFT });
							console.log("Total Supply:" + totalSupplyNFT);

							max_per_wallet = await contract.methods.max_per_wallet().call();
							this.setState({ _max_per_wallet: max_per_wallet });
							console.log("max_per_wallet:" + max_per_wallet);

							publicSale = await contract.methods.balanceOf(account).call();
							this.setState({ myNFTWallet: publicSale });

							cost = await contract.methods.publicSaleCost().call();
							this.setState({ _cost: cost });
							console.log("cost :" + cost);

							owner = await contract.methods.owner().call();
							this.setState({ _owner: owner });
							console.log("Owner" + owner);

							if (owner == account) {
								console.log("owner : " + owner)
								onlyLeft = 10000 - totalSupplyNFT;

								if (mintAmount > onlyLeft) {
									mintAmount = onlyLeft;
								}

								valueOfNFTs = mintAmount * 0;
								wMintAmount = mintAmount;


								this.setState({ nftMintingAmount: mintAmount });

								this.setState({ totalValue: valueOfNFTs });
							} else {
								mintAmount = 1;

								if (totalSupplyNFT == 10000) {

									onlyLeft = 10000 - publicSale;
									mintAmount = onlyLeft;
									this.setState({ msg: "SOLD OUT" });

								} else {
									mintAmount = 1;
									onlyLeft = max_per_wallet - publicSale;

									if (mintAmount > onlyLeft) {
										mintAmount = onlyLeft;
									}
									//mintAmount = onlyLeft;

									valueOfNFTs = mintAmount * this.state._cost;
									wMintAmount = mintAmount;


									this.setState({ nftMintingAmount: mintAmount });

									this.setState({ totalValue: valueOfNFTs });
								}
							}


						} catch (err) {
							console.log("err: " + err);

						}


					} else if (web3Modal.cachedProvider == "coinbasewallet") {

						const chainId = 5;

						if (CoinbaseWalletProvider.networkVersion !== chainId) {
							try {
								await CoinbaseWalletProvider.request({
									method: 'wallet_switchEthereumChain',
									params: [{ chainId: web3.utils.toHex(chainId) }],
								});
							} catch (err) {
								// This error code indicates that the chain has not been added to MetaMask.
								if (err.code === 4902) {
									await CoinbaseWalletProvider.request({
										method: 'wallet_addEthereumChain',
										params: [
											{
												/*chainName: 'Ethereum Mainnet',
												chainId: web3.utils.toHex(chainId),
												nativeCurrency: { name: 'Ethereum Mainnet', decimals: 18, symbol: 'ETH' },
												rpcUrls: ['https://mainnet.infura.io/v3/'],*/

												chainName: 'Goerli Test Network',
												chainId: web3.utils.toHex(chainId),
												nativeCurrency: { name: 'Goerli Test Network', decimals: 18, symbol: 'GoerliETH' },
												rpcUrls: ['https://goerli.infura.io/v3/'],
											},
										],
									});
								}
							}
						}


						try {

							try {
								localStorage.setItem('isWalletConnected', true);
							} catch (ex) {
								console.log(ex)
							}

							let allowance = await token_contract.methods.allowance(account, address).call();

							if (allowance >= usdtAmount) {
								this.setState({ _approved: true });
								console.log("true Allowance:" + allowance);


							} else {
								this.setState({ _approved: false });
								console.log("false Allowance:" + allowance);

							}


							totalSupplyNFT = await contract.methods.totalSupply().call();
							this.setState({ totalSupply: totalSupplyNFT });
							console.log("Total Supply:" + totalSupplyNFT);

							max_per_wallet = await contract.methods.max_per_wallet().call();
							this.setState({ _max_per_wallet: max_per_wallet });
							console.log("max_per_wallet:" + max_per_wallet);

							publicSale = await contract.methods.balanceOf(account).call();
							this.setState({ myNFTWallet: publicSale });

							cost = await contract.methods.publicSaleCost().call();
							this.setState({ _cost: cost });
							console.log("cost :" + cost);

							owner = await contract.methods.owner().call();
							this.setState({ _owner: owner });
							console.log("Owner" + owner);

							if (owner == account) {
								console.log("owner : " + owner)
								onlyLeft = 10000 - totalSupplyNFT;

								if (mintAmount > onlyLeft) {
									mintAmount = onlyLeft;
								}

								valueOfNFTs = mintAmount * 0;
								wMintAmount = mintAmount;


								this.setState({ nftMintingAmount: mintAmount });

								this.setState({ totalValue: valueOfNFTs });
							} else {
								mintAmount = 1;

								if (totalSupplyNFT == 10000) {

									onlyLeft = 10000 - publicSale;
									mintAmount = onlyLeft;
									this.setState({ msg: "SOLD OUT" });

								} else {
									mintAmount = 1;
									onlyLeft = max_per_wallet - publicSale;

									if (mintAmount > onlyLeft) {
										mintAmount = onlyLeft;
									}
									//mintAmount = onlyLeft;

									valueOfNFTs = mintAmount * this.state._cost;
									wMintAmount = mintAmount;


									this.setState({ nftMintingAmount: mintAmount });

									this.setState({ totalValue: valueOfNFTs });
								}
							}


						} catch (err) {
							console.log("err: " + err);

						}


					}


					//})();

					//.....................................................................//

					// Legacy providers may only have ethereum.sendAsync
					const chainId = await provider.request({
						method: 'eth_chainId'
					})

				} else {

					// if the provider is not detected, detectEthereumProvider resolves to null
					console.error('Please install a Valid Wallet');
					alert('A valid provider could not be found!');

				}

			}

		} else {

			console.log("NOT CONNECTED");

		}

	}

	onSubmitMinus = async event => {
		event.preventDefault();

		mintAmount = mintAmount - 1;

		if (mintAmount < 1) {
			mintAmount = 1
		}


		if (owner == account) {
			console.log("owner : " + owner)
			onlyLeft = 10000 - totalSupplyNFT;

			if (mintAmount > onlyLeft) {
				mintAmount = onlyLeft;
			}

			valueOfNFTs = mintAmount * 0;
			wMintAmount = mintAmount;

			this.setState({ nftMintingAmount: mintAmount });

			this.setState({ totalValue: valueOfNFTs });
		} else {


			if (totalSupplyNFT < 10000) {

				onlyLeft = max_per_wallet - publicSale;

				if (mintAmount > onlyLeft) {
					mintAmount = onlyLeft;
				}
				valueOfNFTs = mintAmount * this.state._cost;
				wMintAmount = mintAmount;


				this.setState({ nftMintingAmount: mintAmount });

				this.setState({ totalValue: valueOfNFTs });

			}
		}
	}

	onSubmitPlus = async event => {
		event.preventDefault();

		//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
		mintAmount = mintAmount + 1;

		if (owner == account) {
			console.log("owner : " + owner)
			onlyLeft = 10000 - totalSupplyNFT;

			if (mintAmount > onlyLeft) {
				mintAmount = onlyLeft;
			}

			valueOfNFTs = mintAmount * 0;
			wMintAmount = mintAmount;


			this.setState({ nftMintingAmount: mintAmount });

			this.setState({ totalValue: valueOfNFTs });
		} else {

			if (totalSupplyNFT < 10000) {

				onlyLeft = max_per_wallet - publicSale;
				console.log(onlyLeft);

				if (mintAmount > onlyLeft) {
					mintAmount = onlyLeft;
				}
				valueOfNFTs = mintAmount * this.state._cost;
				wMintAmount = mintAmount;

				this.setState({ nftMintingAmount: mintAmount });

				this.setState({ totalValue: valueOfNFTs });

			}
		}
	}


	onSubmit2 = async event => {
		event.preventDefault();

		console.log(this.state.walletAddress);

		try {
			let owner = await contract.methods.owner().call();

			if (account != owner) {


				try {

					console.log("minAmount:" + mintAmount);
					console.log("valueOfNFTs:" + valueOfNFTs);
					console.log("cost : " + this.state.totalValue);

					this.setState({ statusError: false, statusLoading: true });
					await contract.methods.mint(mintAmount * 1).send({ gasLimit: 385000, from: account, value: this.state.totalValue * 1 });
					this.setState({ statusLoading: false, success: true });
					await new Promise(resolve => setTimeout(resolve, 5000));


				} catch (err) {
					this.setState({ errorMassage: "ERROR : " + err.message, statusLoading: false, success: false, statusError: true });
					console.log(err);


				}

			} else {

				try {


					console.log("minAmount:" + mintAmount);
					console.log("valueOfNFTs:" + valueOfNFTs);

					this.setState({ statusError: false, statusLoading: true });
					await contract.methods.mint(mintAmount * 1).send({ gasLimit: 385000, from: account, value: this.state.totalValue * 0 });
					this.setState({ statusLoading: false, success: true });
					await new Promise(resolve => setTimeout(resolve, 5000));


				} catch (err) {

					this.setState({ errorMassage: "ERROR : " + err.message, statusLoading: false, success: false, statusError: true });
					console.log(err);

				}
			}
		} catch (err) {

			console.log(err);

		}
	}

	walletConnect = async event => {
		event.preventDefault();

		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: "811915bee3744bd38afcf17ecac0f9a6" // required
				}
			},
			coinbasewallet: {
				package: CoinbaseWalletSDK, // Required
				options: {
					appName: "Aterium Universe", // Required
					infuraId: "811915bee3744bd38afcf17ecac0f9a6", // Required
					rpc: "", // Optional if `infuraId` is provided; otherwise it's required
					chainId: 1, // Optional. It defaults to 1 if not provided
					darkMode: true // Optional. Use dark theme, defaults to false
				}
			}
		};

		const web3Modal = new Web3Modal({
			network: "mainnet", // optional
			cacheProvider: true, // optional
			providerOptions // required
		});

		const provider = await web3Modal.connect();

		//  Enable session (triggers QR Code modal)
		await provider.enable();

		const web3 = new Web3(provider);
		console.log("provider : " + provider);
		// Subscribe to accounts change
		provider.on("accountsChanged", (accounts) => {
			console.log(accounts);
		});

		// Subscribe to chainId change
		provider.on("chainChanged", (chainId) => {
			console.log(chainId);
		});

		// Subscribe to provider connection
		provider.on("connect", (info) => {
			console.log(info);
			console.log("I'm LOGGED IN");
		});

		// Subscribe to provider disconnection
		provider.on("disconnect", (error) => {
			console.log(error);
		});

		// test if wallet is connected
		if (web3Modal.cachedProvider) {
			// connected now you can get accounts
			console.log("web3Modal.cachedProvider :" + web3Modal.cachedProvider);
			console.log("provider :" + provider);

			const accounts = await web3.eth.getAccounts();

			account = accounts[0];
			this.setState({ walletAddress: account });

			contract = new web3.eth.Contract(ABI, address);
			token_contract = new web3.eth.Contract(token_ABI, token_address);

			console.log("contract :" + contract);

			if (provider) {


				//	(async () => {

				if (web3Modal.cachedProvider != "walletconnect" && web3Modal.cachedProvider != "coinbasewallet") {

					const chainId = 5;

					if (window.ethereum.networkVersion !== chainId) {
						try {
							await window.ethereum.request({
								method: 'wallet_switchEthereumChain',
								params: [{ chainId: web3.utils.toHex(chainId) }],
							});
						} catch (err) {
							// This error code indicates that the chain has not been added to MetaMask.
							if (err.code === 4902) {
								await window.ethereum.request({
									method: 'wallet_addEthereumChain',
									params: [
										{
											chainName: 'Goerli Test Network',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Goerli Test Network', decimals: 18, symbol: 'GoerliETH' },
											rpcUrls: ['https://goerli.infura.io/v3/'],

											/*chainName: 'Mumbai Testnet',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Mumbai Testnet', decimals: 18, symbol: 'MATIC' },
											rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],*/

											/*chainName: 'Rinkeby Test Network',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'RinkebyETH', decimals: 18, symbol: 'ETH' },
											rpcUrls: ['https://rinkeby.infura.io/v3/'],*/

											/*chainName: 'Ethereum Mainnet',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Ethereum Mainnet', decimals: 18, symbol: 'ETH' },
											rpcUrls: ['https://mainnet.infura.io/v3/'],*/
										},
									],
								});
							}
						}
					}


					try {

						try {
							localStorage.setItem('isWalletConnected', true);
						} catch (ex) {
							console.log(ex)
						}

						let allowance = await token_contract.methods.allowance(account, address).call();

						if (allowance >= usdtAmount) {
							this.setState({ _approved: true });
							console.log("true Allowance:" + allowance);


						} else {
							this.setState({ _approved: false });
							console.log("false Allowance:" + allowance);

						}


						totalSupplyNFT = await contract.methods.totalSupply().call();
						this.setState({ totalSupply: totalSupplyNFT });
						console.log("Total Supply:" + totalSupplyNFT);

						max_per_wallet = await contract.methods.max_per_wallet().call();
						this.setState({ _max_per_wallet: max_per_wallet });
						console.log("max_per_wallet:" + max_per_wallet);

						publicSale = await contract.methods.balanceOf(account).call();
						this.setState({ myNFTWallet: publicSale });

						cost = await contract.methods.publicSaleCost().call();
						this.setState({ _cost: cost });
						console.log("cost :" + cost);

						owner = await contract.methods.owner().call();
						this.setState({ _owner: owner });
						console.log("Owner" + owner);

						if (owner == account) {
							console.log("owner : " + owner)
							onlyLeft = 10000 - totalSupplyNFT;

							if (mintAmount > onlyLeft) {
								mintAmount = onlyLeft;
							}

							valueOfNFTs = mintAmount * 0;
							wMintAmount = mintAmount;


							this.setState({ nftMintingAmount: mintAmount });

							this.setState({ totalValue: valueOfNFTs });
						} else {
							mintAmount = 1;

							if (totalSupplyNFT == 10000) {

								onlyLeft = 10000 - publicSale;
								mintAmount = onlyLeft;
								this.setState({ msg: "SOLD OUT" });

							} else {
								mintAmount = 1;
								onlyLeft = max_per_wallet - publicSale;

								if (mintAmount > onlyLeft) {
									mintAmount = onlyLeft;
								}
								//mintAmount = onlyLeft;

								valueOfNFTs = mintAmount * this.state._cost;
								wMintAmount = mintAmount;


								this.setState({ nftMintingAmount: mintAmount });

								this.setState({ totalValue: valueOfNFTs });
							}
						}


					} catch (err) {
						console.log("err: " + err);

					}
				} else if (web3Modal.cachedProvider == "walletconnect") {

					const chainId = 5;

					if (WalletConnectProvider.networkVersion !== chainId) {
						try {
							await WalletConnectProvider.request({
								method: 'wallet_switchEthereumChain',
								params: [{ chainId: web3.utils.toHex(chainId) }],
							});
						} catch (err) {
							// This error code indicates that the chain has not been added to MetaMask.
							if (err.code === 4902) {
								await window.ethereum.request({
									method: 'wallet_addEthereumChain',
									params: [
										{
											/*chainName: 'Ethereum Mainnet',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Ethereum Mainnet', decimals: 18, symbol: 'ETH' },
											rpcUrls: ['https://mainnet.infura.io/v3/'],*/

											/*chainName: 'Mumbai Testnet',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Mumbai Testnet', decimals: 18, symbol: 'MATIC' },
											rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],*/

											/*chainName: 'Mumbai Testnet',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Mumbai Testnet', decimals: 18, symbol: 'MATIC' },
											rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],*/

											chainName: 'Goerli Test Network',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Goerli Test Network', decimals: 18, symbol: 'GoerliETH' },
											rpcUrls: ['https://goerli.infura.io/v3/'],
										},
									],
								});
							}
						}
					}


					try {

						try {
							localStorage.setItem('isWalletConnected', true);
						} catch (ex) {
							console.log(ex)
						}

						let allowance = await token_contract.methods.allowance(account, address).call();

						if (allowance >= usdtAmount) {
							this.setState({ _approved: true });
							console.log("true Allowance:" + allowance);


						} else {
							this.setState({ _approved: false });
							console.log("false Allowance:" + allowance);

						}


						totalSupplyNFT = await contract.methods.totalSupply().call();
						this.setState({ totalSupply: totalSupplyNFT });
						console.log("Total Supply:" + totalSupplyNFT);

						max_per_wallet = await contract.methods.max_per_wallet().call();
						this.setState({ _max_per_wallet: max_per_wallet });
						console.log("max_per_wallet:" + max_per_wallet);

						publicSale = await contract.methods.balanceOf(account).call();
						this.setState({ myNFTWallet: publicSale });

						cost = await contract.methods.publicSaleCost().call();
						this.setState({ _cost: cost });
						console.log("cost :" + cost);

						owner = await contract.methods.owner().call();
						this.setState({ _owner: owner });
						console.log("Owner" + owner);

						if (owner == account) {
							console.log("owner : " + owner)
							onlyLeft = 10000 - totalSupplyNFT;

							if (mintAmount > onlyLeft) {
								mintAmount = onlyLeft;
							}

							valueOfNFTs = mintAmount * 0;
							wMintAmount = mintAmount;


							this.setState({ nftMintingAmount: mintAmount });

							this.setState({ totalValue: valueOfNFTs });
						} else {
							mintAmount = 1;

							if (totalSupplyNFT == 10000) {

								onlyLeft = 10000 - publicSale;
								mintAmount = onlyLeft;
								this.setState({ msg: "SOLD OUT" });

							} else {
								mintAmount = 1;
								onlyLeft = max_per_wallet - publicSale;

								if (mintAmount > onlyLeft) {
									mintAmount = onlyLeft;
								}
								//mintAmount = onlyLeft;

								valueOfNFTs = mintAmount * this.state._cost;
								wMintAmount = mintAmount;


								this.setState({ nftMintingAmount: mintAmount });

								this.setState({ totalValue: valueOfNFTs });
							}
						}


					} catch (err) {
						console.log("err: " + err);

					}
				} else if (web3Modal.cachedProvider == "coinbasewallet") {

					const chainId = 5;

					if (CoinbaseWalletProvider.networkVersion !== chainId) {
						try {
							await CoinbaseWalletProvider.request({
								method: 'wallet_switchEthereumChain',
								params: [{ chainId: web3.utils.toHex(chainId) }],
							});
						} catch (err) {
							// This error code indicates that the chain has not been added to MetaMask.
							if (err.code === 4902) {
								await CoinbaseWalletProvider.request({
									method: 'wallet_addEthereumChain',
									params: [
										{
											chainName: 'Goerli Test Network',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Goerli Test Network', decimals: 18, symbol: 'GoerliETH' },
											rpcUrls: ['https://goerli.infura.io/v3/'],

											/*chainName: 'Mumbai Testnet',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Mumbai Testnet', decimals: 18, symbol: 'MATIC' },
											rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],*/

											/*chainName: 'Mumbai Testnet',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Mumbai Testnet', decimals: 18, symbol: 'MATIC' },
											rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],*/

											/*chainName: 'Ethereum Mainnet',
											chainId: web3.utils.toHex(chainId),
											nativeCurrency: { name: 'Ethereum Mainnet', decimals: 18, symbol: 'ETH' },
											rpcUrls: ['https://mainnet.infura.io/v3/'],*/
										},
									],
								});
							}
						}
					}



					try {

						try {
							localStorage.setItem('isWalletConnected', true);
						} catch (ex) {
							console.log(ex)
						}

						let allowance = await token_contract.methods.allowance(account, address).call();

						if (allowance >= usdtAmount) {
							this.setState({ _approved: true });
							console.log("true Allowance:" + allowance);


						} else {
							this.setState({ _approved: false });
							console.log("false Allowance:" + allowance);

						}


						totalSupplyNFT = await contract.methods.totalSupply().call();
						this.setState({ totalSupply: totalSupplyNFT });
						console.log("Total Supply:" + totalSupplyNFT);

						max_per_wallet = await contract.methods.max_per_wallet().call();
						this.setState({ _max_per_wallet: max_per_wallet });
						console.log("max_per_wallet:" + max_per_wallet);

						publicSale = await contract.methods.balanceOf(account).call();
						this.setState({ myNFTWallet: publicSale });

						cost = await contract.methods.publicSaleCost().call();
						this.setState({ _cost: cost });
						console.log("cost :" + cost);

						owner = await contract.methods.owner().call();
						this.setState({ _owner: owner });
						console.log("Owner" + owner);

						if (owner == account) {
							console.log("owner : " + owner)
							onlyLeft = 10000 - totalSupplyNFT;

							if (mintAmount > onlyLeft) {
								mintAmount = onlyLeft;
							}

							valueOfNFTs = mintAmount * 0;
							wMintAmount = mintAmount;


							this.setState({ nftMintingAmount: mintAmount });

							this.setState({ totalValue: valueOfNFTs });
						} else {
							mintAmount = 1;

							if (totalSupplyNFT == 10000) {

								onlyLeft = 10000 - publicSale;
								mintAmount = onlyLeft;
								this.setState({ msg: "SOLD OUT" });

							} else {
								mintAmount = 1;
								onlyLeft = max_per_wallet - publicSale;

								if (mintAmount > onlyLeft) {
									mintAmount = onlyLeft;
								}
								//mintAmount = onlyLeft;

								valueOfNFTs = mintAmount * this.state._cost;
								wMintAmount = mintAmount;


								this.setState({ nftMintingAmount: mintAmount });

								this.setState({ totalValue: valueOfNFTs });
							}
						}


					} catch (err) {
						console.log("err: " + err);

					}


				}


				//})();

				//.....................................................................//

				// Legacy providers may only have ethereum.sendAsync
				const chainId = await provider.request({
					method: 'eth_chainId'
				})

			} else {

				// if the provider is not detected, detectEthereumProvider resolves to null
				console.error('Please install a Valid Wallet');
				alert('A valid provider could not be found!');

			}

		}

	}

	approve = async event => {
		event.preventDefault();

		try {
			let owner = await contract.methods.owner().call();


			if (account != owner) {


				try {


					console.log("minAmount:" + mintAmount);
					console.log("valueOfNFTs:" + valueOfNFTs);
					console.log("usdtAmount:" + usdtAmount);

					let allowance = await token_contract.methods.allowance(account, address).call();

					if (allowance > 0) {

						await token_contract.methods.increaseAllowance(address, usdtAmount).send({ /*maxPriorityFeePerGas: 400000000000,*/ gasPrice: 200000000000, gasLimit: 685000, from: account });
						this.setState({ _approved: true });
						window.location.reload(true);
					} else {

						await token_contract.methods.approve(address, usdtAmount).send({ /*maxPriorityFeePerGas: 400000000000,*/ gasPrice: 200000000000, gasLimit: 685000, from: account });
						this.setState({ _approved: true });
						window.location.reload(true);
					}



				} catch (err) {
					this.setState({ errorMassage: "ERROR : " + err.message, statusLoading: false, success: false, statusError: true });
					console.log(err);

				}

			} else {

				try {


					console.log("minAmount:" + mintAmount);
					console.log("valueOfNFTs:" + usdtAmount);

					let allowance = await token_contract.methods.allowance(account, address).call();

					if (allowance > 0) {

						await token_contract.methods.increaseAllowance(address, usdtAmount).send({ maxPriorityFeePerGas: 400000000000, gasLimit: 685000, from: account });
						this.setState({ _approved: true });
						window.location.reload(true);
					} else {

						await token_contract.methods.approve(address, usdtAmount).send({ maxPriorityFeePerGas: 400000000000, gasLimit: 685000, from: account });
						this.setState({ _approved: true });
						window.location.reload(true);
					}



				} catch (err) {
					this.setState({ errorMassage: "ERROR : " + err.message, statusLoading: false, success: false, statusError: true });
					console.log(err);


				}






			}
		} catch (err) {

			console.log(err);

		}


	}

	walletDisconnect = async event => {
		event.preventDefault();


		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: "bf933c3446b3464c988114813a1360ac" // required
				}
			}
		};

		const web3Modal = new Web3Modal({
			network: "mainnet", // optional
			cacheProvider: true, // optional
			providerOptions // required
		});

		// disconnect wallet
		web3Modal.clearCachedProvider();
		window.location.reload();

		try {
			localStorage.setItem('isWalletConnected', false);
		} catch (ex) {
			console.log(ex);
		}

	}

	whitelistMint = async event => {
		event.preventDefault();


		//	console.log('Whitelist Merkle Tree\n', merkleTree.toString());
		console.log("Root Hash: ", rootHash);
		console.log("Root HashHash: ", rootHashHash);

		// ***** ***** ***** ***** ***** ***** ***** ***** // 

		// CLIENT-SIDE: Use `msg.sender` address to query and API that returns the merkle proof
		// required to derive the root hash of the Merkle Tree

		// ✅ Positive verification of address
		//const claimingAddress = leafNodes[0];
		//console.log("Claiming Address:"+ claimingAddress);
		// ❌ Change this address to get a `false` verification
		const claimingAddress = keccak256(account);

		// `getHexProof` returns the neighbour leaf and all parent nodes hashes that will
		// be required to derive the Merkle Trees root hash.
		const hexProof = merkleTree.getHexProof(claimingAddress);
		console.log("HexProof:" + hexProof);

		// ✅ - ❌: Verify is claiming address is in the merkle tree or not.
		// This would be implemented in your Solidity Smart Contract
		console.log("Final result: " + merkleTree.verify(hexProof, claimingAddress, rootHash));
		FinalResult = merkleTree.verify(hexProof, claimingAddress, rootHash);
		this.setState({ _FinalResult: FinalResult });

		let wl_value = this.state._wlMintAmount * 1 * wlCost;
		let total_wl_mintings = publicSale * 1 + this.state._wlMintAmount * 1;
		console.log("total_wl_mintings:" + total_wl_mintings);
		console.log("publicSale:" + publicSale);
		console.log("wlMintAmount:" + this.state._wlMintAmount);

		if (FinalResult) {
			try {
				this.setState({ statusErrorWL: false, statusLoadingWL: true });
				await contract.methods.whitelistMint(hexProof, 1).send({ gasLimit: 385000, from: account, value: 0 });
				this.setState({ statusLoadingWL: false, successWL: true });
				await new Promise(resolve => setTimeout(resolve, 5000));
				window.location.reload(true);

			} catch (err) {
				this.setState({ errorMassage: "ERROR : " + err.message, statusLoadingWL: false, successWL: false, statusErrorWL: true });
				console.log(err);
			}
		} else {
			wlMsg = "Not Eligible"
			this.setState({ _wlMsg: wlMsg });
		}


	}

	render() {

		return (

			<div class="allWrap">
				<div class="light">
					<div class="cont">

						<div class="headers">

							<div class="headers2">

								<div class="navBar">

								</div>
								<div class="right">
									<div class="icons">

										<div class="discord"><img class="osPic" onClick={ops} src={os} /></div>
										<div class="discord"><img class="osPic" onClick={tweet} src={link} /></div>

									</div>
									<div class="connect2">
										{this.state.walletAddress === '' ?
											(<form onSubmit={this.walletConnect}>
												<button class="wallet2"><img class="walletImg" src={wallet} />Wallet Connect</button>
											</form>) : (<form onSubmit={this.walletDisconnect}><button class="wallet2" >
												{this.state.walletAddress.slice(0, 3) + "..." + this.state.walletAddress.slice(39, 42)}</button></form>)}

									</div>



								</div>

							</div>

						</div>

						{this.state.stateNow >= 1687896660000 /*1687896660000 */ ?

							(
								<div class="introduction">

									<div class="in2">
										<div class="intro">
											Clippy
										</div>


										<Element name="mint">
											<div class="nftblockWalletConnectedALL">

												{this.state.walletAddress === '' ? (

													<div class="walletConnect">
														<form onSubmit={this.walletConnect}>
															<button class="wallet3" type='submit'>MINT NOW</button>
														</form>
													</div>
												) :
													(< div >

													</div>)
												}
											</div>
										</Element>
									</div>
									{this.state.walletAddress === '' ?
										(<div class="nftPicDiv">
											<img class="nftPic" src={nft} />
										</div>) : (

											(<div class="mintDiv">
												<div class="totalSupply">{this.state.totalSupply}/10,000</div>
												<div class="price"><div>Mint Price 0.1 ETH</div></div>
												<div class="minting_count_button">
													<div class="center">
														<form onSubmit={this.onSubmitMinus}>
															<button class="btnfos-0-2" type="submit">-</button>
														</form>
													</div>

													<div>
														<div class="nftminter2">{this.state.nftMintingAmount}</div>
													</div>

													<div class="center">
														<form onSubmit={this.onSubmitPlus}>
															<button class="btnfos-0-2-2" type="submit">+</button>
														</form>
													</div>
												</div>
												<div class="mintbuttondiv">
													{this.state._approved !== true ?
														(<form onSubmit={this.approve}>
															<button class="btnfos-0-3" type="submit">
																Approve</button>
														</form>) :

														(<form onSubmit={this.onSubmit2}>
															<button class="btnfos-0-3" type="submit">Mint Here</button>
														</form>)}
												</div>
												<div>

													{this.state.statusError ? (
														<div class="errorMessage">
															<div >Sorry, something went wrong <br /> please try again later</div>
														</div>)
														: null}

													{this.state.statusLoading ? (
														<div class="loadingContainer">
															<div>
																<div class="loadingText">Minting your NFT</div>
															</div>
														</div>)
														: null}

													{this.state.success ? (

														<div><div class="successfully">MINTING SUCCESSFUL!</div>
														</div>)
														: null}

												</div></div>

											)
										)}
								</div>)
							:
							(
								<div class="countdown">
									<div class="nftPicDiv">
										<img class="nftPic2" src={nft} />
									</div>
									<Countdown
										date={1687896660000 /*1687896660000*/}
										renderer={renderer}
									/>

									<p class="cs">Minting Unveiling Shortly!</p>
								</div>

							)}

					</div>
				</div >
			</div >)
	}
}

export default Home;

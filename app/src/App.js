import './App.css';
import React, { Component } from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK, { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import wallet from './assets/wallet.png';
import Countdown from 'react-countdown';
import './counter.css';

import {ABI, token_ABI} from "./abi.js";

let address = "0x5259b530470250099e8B848706ebe8E591eC3cd8";
const token_address = "0xa3f8af04B6e970C4d85ba9D41b1E088Ef617B783";


const renderer = ({ days, hours, minutes, seconds, completed }) => {
	/*	if (completed) {
			// Render a completed state
			return <Completionist />;
		} else {*/
	// Render a countdowns

	if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {

		window.location.reload(true);
		console.log("Mint Begins");
	}


	return <div class="counterBlock"><div class="days">{days}</div><div class="dots">:</div><div class="days">{hours}</div><div class="dots">:</div><div class="days">{minutes}</div><div class="dots">:</div><div class="sec">{seconds}</div></div>;
	/*	}*/
};

let allPositionsFront = [];


let account;
let mintAmount = 1;
let valueOfNFTs = 0;
let owner;
let publicSale;
let FinalResult;
let wlMsg = "Whitelist Mint";

let usdtAmount = 25000000;
let token_contract;


// 1. Import libraries. Use `npm` package manager to install
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// 2. Collect list of wallet addresses from competition, raffle, etc.
// Store list of addresses in some data sheeet (Google Sheets or Excel)
let whitelistAddresses = [

];

// 3. Create a new array of `leafNodes` by hashing all indexes of the `whitelistAddresses`
// using `keccak256`. Then creates a Merkle Tree object using keccak256 as the algorithm.
//
// The leaves, merkleTree, and rootHas are all PRE-DETERMINED prior to whitelist claim
const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

// 4. Get root hash of the `merkleeTree` in hexadecimal format (0x)
// Print out the Entire Merkle Tree.
const rootHash = merkleTree.getRoot();
const rootHashHash = merkleTree.getHexRoot();


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
		stateNow: Date.now(),
		_amount: '',
		_allPositionsFront: [],
		isInitialized: false
	}

	async componentDidMount() {

		if (localStorage?.getItem('isWalletConnected') === 'true') {

			if (!this.state.isInitialized) {
				// Call the closePosition method
				await this.closePosition();

				// Set the flag to true to indicate that it's been initialized
				this.setState({ isInitialized: true });
			}

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

					if (web3Modal.cachedProvider !== "walletconnect" && web3Modal.cachedProvider !== "coinbasewallet") {

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

							owner = await contract.methods.owner().call();
							this.setState({ _owner: owner });
							console.log("Owner" + owner);


						} catch (err) {
							console.log("err: " + err);

						}

					} else if (web3Modal.cachedProvider === "walletconnect") {

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

						} catch (err) {
							console.log("err: " + err);
						}


					} else if (web3Modal.cachedProvider === "coinbasewallet") {

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

						} catch (err) {
							console.log("err: " + err);

						}


					}


					//})();

					//.....................................................................//

					

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

	walletConnect = async event => {
		event.preventDefault();
		console.log(window.ethereum);
		if (typeof window.ethereum !== 'undefined') {
			console.log('MetaMask is installed!');

			try {

				const web3mm = new Web3(window.ethereum);

				// Request access to user accounts
				await window.ethereum.request({ method: 'eth_requestAccounts' });
				console.log("metamask on PC")
				// Continue with your DApp logic
				const accounts = await web3mm.eth.getAccounts();
				const account = accounts[0];

				// Fetch data from contracts, etc.
				// ...
				// Fetch data from contracts
				contract = new web3mm.eth.Contract(ABI, address);

				// Update your state with the wallet address
				this.setState({ walletAddress: account });

				// Rest of your MetaMask-specific logic can go here
				// ...
				const chainId = 5;

				if (window.ethereum.networkVersion !== chainId) {
					try {
						await window.ethereum.request({
							method: 'wallet_switchEthereumChain',
							params: [{ chainId: web3mm.utils.toHex(chainId) }],
						});
					} catch (err) {
						// This error code indicates that the chain has not been added to MetaMask.
						if (err.code === 4902) {
							await window.ethereum.request({
								method: 'wallet_addEthereumChain',
								params: [
									{
										/*chainName: 'zkSync alpha testnet',
										chainId: web3mm.utils.toHex(chainId),
										nativeCurrency: { name: 'zkSync alpha testnet', decimals: 18, symbol: 'ETH' },
										rpcUrls: ['https://zksync2-testnet.zkscan.io/'],*/

										chainName: 'Goerli Test Network',
										chainId: web3mm.utils.toHex(chainId),
										nativeCurrency: { name: 'Goerli Test Network', decimals: 18, symbol: 'GoerliETH' },
										rpcUrls: ['https://goerli.infura.io/v3/'],

										/*chainName: 'Rinkeby Test Network',
										chainId: web3mm.utils.toHex(chainId),
										nativeCurrency: { name: 'RinkebyETH', decimals: 18, symbol: 'ETH' },
										rpcUrls: ['https://rinkeby.infura.io/v3/'],*/
										/*chainName: 'Mumbai Testnet',
										chainId: web3mm.utils.toHex(chainId),
										nativeCurrency: { name: 'Mumbai Testnet', decimals: 18, symbol: 'MATIC' },
										rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],*/
									},
								],
							});
						}
					}
				}


				try {
					localStorage.setItem('isWalletConnected', true);
				} catch (ex) {
					console.log(ex)
				}

			} catch (err) {
				console.log("err: " + err);
			}

			//})();

			//.....................................................................//

			// Legacy providers may only have ethereum.sendAsync



		}

	}

	approve = async event => {
		event.preventDefault();

		try {
			let owner = await contract.methods.owner().call();


			if (account !== owner) {


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

	trade = async event => {
		event.preventDefault();

		console.log(this.state.walletAddress);

		try {
			
			try {

				console.log("minAmount:" + mintAmount);
				console.log("valueOfNFTs:" + valueOfNFTs);

				await contract.methods.trade(this.state._amount).send({ gasLimit: 385000, from: account });

			} catch (err) {
				console.log(err);
			}

		} catch (err) {

			console.log(err);

		}
	}

	async closePosition(index) {


		try {

			console.log("index:" + index);

			await contract.methods.closePosition(index).send({ gasLimit: 385000, from: account });

		} catch (err) {
			console.log(err);

		}


	}

	allPositions = async event => {
		event.preventDefault();

		try {


			allPositionsFront = await contract.methods.allPositions(account).call();
			this.setState({ _allPositionsFront: allPositionsFront });
			console.log(this.state._allPositionsFront);


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

									<div class="connect2">
										{this.state.walletAddress === '' ?
											(<form onSubmit={this.walletConnect}>
												<button class="wallet2"><img class="walletImg" src={wallet} alt="connect"/>Wallet Connect</button>
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
											Perp DEX
										</div>
									</div>
									{this.state._approved === true ?
										(<div class="btn3">
											<div class="inputDiv">
												<input type="numbers" name="trade" placeholder="amount" value={this.state._amount}
													onChange={event => this.setState({ _amount: event.target.value })}></input>

												<button onClick={this.trade} class="btnfos-0-3" type="submit">Trade</button>
											</div>
											<button onClick={this.allPositions} class="btnfos-0-3" type="submit">All Positions</button>


										</div>) : (<button onClick={this.approve} class="btnfos-0-3" type="submit">Approve</button>)}

								</div>)
							:
							(
								<div class="countdown">
									<div class="nftPicDiv">
									</div>
									<Countdown
										date={1687896660000 /*1687896660000*/}
										renderer={renderer}
									/>

									<p class="cs">Minting Unveiling Shortly!</p>
								</div>

							)}

					</div>
					<div class="tokenIds" >
						{this.state._allPositionsFront.map((element1) => {

							console.log("ID :" + element1[0]);
							console.log("Time :" + element1[1]);


							return (
								<div class="tokenIds2">
								</div>);

						})}

						<table>
							<thead>
								<tr>
									<th>Size</th>
									<th>Price</th>
									<th>Margin</th>
									<th>Open</th>
									<th>Close Price</th>
								</tr>
							</thead>
							<tbody>
								{this.state._allPositionsFront.map((element1, index) => (


									<tr key={element1[0][0]}>
										{/* Assuming element1 is an array with data you want to display */}
										<td>{element1[0]}</td>
										<td>{element1[1]}</td>
										<td>{element1[2]}</td>
										<td>{element1[3] ? "true" : "false"}</td>
										<td>{element1[4]}</td>
										<td><button onClick={() => this.closePosition(index)} class="close">Close</button></td>
									</tr>
								))}
							</tbody>
						</table>

					</div>



				</div >
			</div >)
	}
}

export default Home;

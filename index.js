// Instal web3.js menggunakan npm
// npm install web3

const Web3 = require('web3');

// Ganti URL dengan URL node Ethereum yang sesuai
const ethereumNodeUrl = 'https://mainnet.infura.io/v3/your-infura-api-key';
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeUrl));

// Ganti dengan alamat smart contract dan ABI yang sesuai
const contractAddress = '0xYourSmartContractAddress';
const contractABI = [{"constant":true,"inputs":[],"name":"yourFunction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

// Ganti dengan alamat dompet Ethereum Anda
const walletAddress = '0xYourWalletAddress';

// Ganti dengan kunci pribadi dompet Ethereum Anda (harap hati-hati dengan kunci pribadi, jangan pernah berbagi)
const privateKey = '0xYourPrivateKey';

// Buat objek kontrak berdasarkan alamat dan ABI
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Contoh eksekusi fungsi pada smart contract
async function executeSmartContract() {
  // Mendapatkan nonce
  const nonce = await web3.eth.getTransactionCount(walletAddress, 'pending');

  // Mendapatkan gas price
  const gasPrice = await web3.eth.getGasPrice();

  // Menyiapkan transaksi
  const txObject = {
    from: walletAddress,
    to: contractAddress,
    gas: 200000,
    gasPrice: gasPrice,
    data: contract.methods.yourFunction().encodeABI(),
    nonce: nonce
  };

  // Membuat objek transaksi
  const transaction = await web3.eth.accounts.signTransaction(txObject, privateKey);

  // Mengirim transaksi
  const receipt = await web3.eth.sendSignedTransaction(transaction.rawTransaction);

  console.log('Transaction receipt:', receipt);
}

// Memanggil fungsi eksekusi
executeSmartContract();

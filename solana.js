const fs = require("fs")

// =================
// LOAD ENV
// =================

const env = fs.readFileSync(".env","utf-8")

const USERNAME = env.match(/USERNAME="(.*)"/)[1]
const API_TOKEN = env.match(/API_TOKEN="(.*)"/)[1]

// =================
// LOAD WALLET
// =================

const wallets = fs.readFileSync("walletsendsol.txt","utf-8")
.split("\n")
.map(x=>x.trim())
.filter(x=>x)

// =================
// HEADERS
// =================

const headers = {
 Authorization:`Bearer ${API_TOKEN}`,
 "Content-Type":"application/json"
}

// =================
// UTILS
// =================

function sleep(ms){
 return new Promise(r=>setTimeout(r,ms))
}

function randomDelay(){
 return Math.floor(Math.random()*(60000-30000)+30000)
}

// =================
// BALANCE CHECK
// =================

async function getBalances(){

 const res = await fetch(`https://frames.ag/api/wallets/${USERNAME}/balances`,{
  headers
 })

 const data = await res.json()

 let sol = "0"

 try{

  const solAsset = data.find(x=>x.asset === "sol")

  if(solAsset) sol = solAsset.balance

 }catch{}

 return sol
}

// =================
// FAUCET
// =================

async function faucet(){

 console.log("Claim faucet SOL devnet...\n")

 const res = await fetch(`https://frames.ag/api/wallets/${USERNAME}/actions/faucet-sol`,{
  method:"POST",
  headers,
  body:JSON.stringify({})
 })

 console.log(await res.json(),"\n")

}

// =================
// MAIN
// =================

async function run(){

 const balance = await getBalances()

 console.log("====================================")
 console.log("Username :",USERNAME)
 console.log("Balance SOL DEVNET :",balance)
 console.log("Wallet tujuan :",wallets.length)
 console.log("Transfer : 1 SOL")
 console.log("Delay TX : 30 - 60 detik")
 console.log("====================================\n")

 // faucet
 await faucet()

 console.log("Mulai transfer SOL...\n")

 for(let i=0;i<wallets.length;i++){

  const w = wallets[i]

  console.log(`TX ${i+1}/${wallets.length}`)
  console.log(`Tujuan : ${w}`)

  const tx = await fetch(`https://frames.ag/api/wallets/${USERNAME}/actions/transfer-solana`,{
   method:"POST",
   headers,
   body:JSON.stringify({
    to:w,
    amount:"1000000000",
    asset:"sol",
    network:"devnet"
   })
  })

  const result = await tx.json()

  console.log("Response:",result,"\n")

  if(i < wallets.length-1){

   const delay = randomDelay()

   console.log(`Delay ${Math.floor(delay/1000)} detik\n`)

   await sleep(delay)

  }

 }

 console.log("SELESAI")

}

run()

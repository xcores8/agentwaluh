const fs = require("fs")

// =============================
// LOAD ENV
// =============================

const env = fs.readFileSync(".env","utf-8")

const USERNAME = env.match(/USERNAME="(.*)"/)[1]
const API_TOKEN = env.match(/API_TOKEN="(.*)"/)[1]

// =============================
// LOAD FILE
// =============================

const wallets = fs.readFileSync("walletsend.txt","utf-8")
.split("\n")
.map(x=>x.trim())
.filter(x=>x)

let feedback = ""

if(fs.existsSync("feedback.txt")){
 feedback = fs.readFileSync("feedback.txt","utf-8").trim()
}

// =============================
// HEADERS
// =============================

const headers = {
 Authorization:`Bearer ${API_TOKEN}`,
 "Content-Type":"application/json"
}

// =============================
// UTILS
// =============================

function sleep(ms){
 return new Promise(resolve=>setTimeout(resolve,ms))
}

function randomDelay(){
 return Math.floor(Math.random()*(60000-30000)+30000)
}

function randomEth(){

 const values = [
 0.001,
 0.002,
 0.003,
 0.004,
 0.005,
 0.006,
 0.007,
 0.008,
 0.009
 ]

 const pick = values[Math.floor(Math.random()*values.length)]

 return {
  eth: pick,
  wei: (pick * 1e18).toString()
 }

}

// =============================
// GET BALANCE
// =============================

async function getBalances(){

 const res = await fetch(`https://frames.ag/api/wallets/${USERNAME}/balances`,{
  headers
 })

 const data = await res.json()

 let ethBalance = "0"
 let solBalance = "0"

 try{

  const eth = data.find(x=>x.asset === "eth")
  if(eth) ethBalance = eth.balance

 }catch{}

 try{

  const sol = data.find(x=>x.asset === "sol")
  if(sol) solBalance = sol.balance

 }catch{}

 return {ethBalance,solBalance}

}

// =============================
// MAIN
// =============================

async function run(){

 const balances = await getBalances()

 console.log("====================================")
 console.log("Username :",USERNAME)
 console.log("Balance ETH BASE SEPOLIA :",balances.ethBalance)
 console.log("Balance SOL DEVNET :",balances.solBalance)
 console.log("Wallet tujuan :",wallets.length)
 console.log("Random ETH : 0.001 - 0.009")
 console.log("Delay TX : 30 - 60 detik")
 console.log("====================================\n")

 // =========================
 // SIGN MESSAGE
 // =========================

 await fetch(`https://frames.ag/api/wallets/${USERNAME}/actions/sign-message`,{
  method:"POST",
  headers,
  body:JSON.stringify({
   chain:"ethereum",
   message:"hello from base sepolia test"
  })
 })

 // =========================
 // SEND ETH
 // =========================

 for(let i=0;i<wallets.length;i++){

  const w = wallets[i]

  const ethAmount = randomEth()

  console.log(`TX ${i+1}/${wallets.length}`)
  console.log(`Tujuan : ${w}`)
  console.log(`Jumlah : ${ethAmount.eth} ETH`)

  const tx = await fetch(`https://frames.ag/api/wallets/${USERNAME}/actions/transfer`,{
   method:"POST",
   headers,
   body:JSON.stringify({
    to:w,
    amount:ethAmount.wei,
    asset:"eth",
    chainId:84532
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

 // =========================
 // FEEDBACK
 // =========================

 if(feedback.length > 0){

  console.log("Mengirim feedback...\n")

  await fetch(`https://frames.ag/api/wallets/${USERNAME}/feedback`,{
   method:"POST",
   headers,
   body:JSON.stringify({
    category:"feature",
    message:feedback,
    context:{
     environment:"github codespaces",
     tested_features:[
      "evm transfer",
      "base sepolia transaction",
      "wallet api"
     ]
    }
   })
  })

  console.log("Feedback terkirim\n")

 }

 console.log("SELESAI")

}

run()

require("dotenv").config()
const fs = require("fs")

const USERNAME = process.env.USERNAME
const API_TOKEN = process.env.API_TOKEN

const tools = fs.readFileSync("tools.txt","utf-8")
.split("\n")
.map(x=>x.trim())
.filter(x=>x)

const headers = {
 Authorization:`Bearer ${API_TOKEN}`,
 "Content-Type":"application/json"
}

function sleep(ms){
 return new Promise(r=>setTimeout(r,ms))
}

function randomDelay(){
 return Math.floor(Math.random()*(40000-20000)+20000)
}

async function run(){

 console.log("====================================")
 console.log("AGENTWALLET WALUH x402 TOOL TEST")
 console.log("====================================")
 console.log("Username :",USERNAME)
 console.log("Tools to test :",tools.length)
 console.log("Delay : 20 - 40 detik")
 console.log("====================================\n")

 for(let i=0;i<tools.length;i++){

  const url = tools[i]

  console.log(`Request ${i+1}/${tools.length}`)
  console.log("Tool URL :",url)

  try{

   const res = await fetch(`https://frames.ag/api/wallets/${USERNAME}/actions/x402/fetch`,{
    method:"POST",
    headers,
    body:JSON.stringify({
     url:url,
     method:"GET"
    })
   })

   const data = await res.json()

   console.log("Response:",data,"\n")

  }catch(e){

   console.log("Error:",e.message,"\n")

  }

  if(i < tools.length-1){

   const delay = randomDelay()

   console.log(`Delay ${Math.floor(delay/1000)} detik\n`)

   await sleep(delay)

  }

 }

 console.log("SELESAI")

}

run()
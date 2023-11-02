'use client'
import ConnectButton from '@/components/ConnectButton'
import { useMetaMask } from '@/hooks/useMetamask'
import { dutchAuction } from './ClientContracts'
import { useEffect, useState } from 'react'
import { formatAddress } from '@/utils'
export default function Home() {
  const { wallet } = useMetaMask()
  const [txs, setTxs] = useState([])
  const [owner, setOwner] = useState('')
  const [price, setPrice] = useState('')
  const [stage, setStage] = useState('')
  const [endAt, setEndAt] = useState('')
  const [totalBids, setTotalBids] = useState('')
  const [bidAmount, setBidAmount] = useState(0)
  const [isClaimSuccess, setIsClaimSuccess] = useState(false)


  const test1Func = async () => {
    dutchAuction.getCurrentPrice().then((res) => {
      console.log(res)
    })
  }
  const test2Func = async () => {
    const result = await dutchAuction.getStage()
    console.log(result)

  }
  const ownerfunc = async () => {
    await dutchAuction.startAuction()
  }

  const buyHandler = async () => {
    if (wallet.accounts.length > 0) {
      await dutchAuction.bid(bidAmount, wallet.accounts[0])
    }
  }

  const claimHandler = async () => {
    if (wallet.accounts.length > 0) {
      await dutchAuction.claim(bidAmount, wallet.accounts[0])
    }
  }

  const isOwner = wallet.accounts.length > 0 && wallet.accounts[0] == owner

  useEffect(() => {
    dutchAuction.getOwner().then((res) => {
      setOwner(res.toLowerCase())
    }).catch((err) => {
      console.log(err)
    })
    dutchAuction.getCurrentPrice().then((res) => {
      setPrice(res)
    }).catch((err) => {
      console.log(err)
    })
    dutchAuction.getStage().then((res) => {
      setStage(res)
    }).catch((err) => {
      console.log(err)
    })
    dutchAuction.getEndAt().then((res) => {
      setEndAt(res)
    }).catch((err) => {
      console.log(err)
    })
    dutchAuction.getBids(wallet.accounts[0]).then((res) => {
      setTotalBids(res)
    }).catch((err) => {
      // console.log(err)
    })
    dutchAuction.contract.on('BidSubmission', (sender, amount) => {
      dutchAuction.getBids(wallet.accounts[0]).then((res) => setTotalBids(res))
    })
    dutchAuction.contract.on('TokenClaimed', (claimer, tokens) => {
      dutchAuction.getBids(wallet.accounts[0]).then((res) => setTotalBids(res))
    })

  })


  return (
    <main className="flex min-h-screen flex-col items-center px-24 pt-12 bg-blue-100">
      <div className='flex justify-between w-full'>
        {/* <button className='bg-red-200 rounded-lg px-3' onClick={test1Func}>
          TEST 1
        </button>
        <button className='bg-red-200 rounded-lg px-3' onClick={test2Func}>
          TEST 2
        </button> */}
        {isOwner &&
          <button className='bg-red-200 rounded-lg px-3 disabled:bg-slate-500' disabled={stage == 'AuctionStarted'} onClick={ownerfunc}>
            Start Auction
          </button>

        }
        <ConnectButton></ConnectButton>
      </div>
      {/* address and timer section */}
      <div className='flex w-full justify-around my-5 bg-white rounded-lg shadow-sm'>
        <div className='p-5 w-1/2 text-center'>
          Auction Address: {
            formatAddress
              (dutchAuction.address)}
          <div>Auction Stage: {stage} </div>
        </div>
        <div className='p-5 w-1/2 text-center'>
          Ends at: {endAt}
        </div>
      </div>
      {/* Current price and purchase history section */}
      <div className='flex w-full gap-1'>
        <div className='bg-white shadow-sm rounded-lg w-1/2 flex justify-around p-5'>
          <div>Estimated Price:</div>
          <div>{price.slice(0, 8)} Eth</div>
        </div>
        <div className='bg-white shadow-sm rounded-lg w-1/2 flex justify-around p-5'>
          <div>Total Bids:</div>
          <div>{totalBids} Eth</div>
        </div>
      </div>
      {/* Purchase button and input button */}
      <div className='flex w-full justify-center my-5'>
        <button className='bg-blue-200 p-2 rounded-lg mr-10' onClick={buyHandler}>
          Buy Token
        </button>
        <div className='bg-white rounded-lg shadow-sm'>
          <input className=' rounded-l-lg h-full pl-2' type="number" onChange={(e) => setBidAmount(e.target.value)}></input>
          <span className='rounded-r-lg bg-white h-full pr-2'>Eth</span>

        </div>
      </div>
      {/* claim button */}
      <div className='bg-blue-200 p-5 rounded-lg'>
        claim button
      </div>
    </main>
  )
}

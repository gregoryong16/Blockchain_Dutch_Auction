'use client'
import ConnectButton from '@/components/ConnectButton'
import { useMetaMask } from '@/hooks/useMetamask'
import { dutchAuction } from './ClientContracts'
import { useEffect, useState } from 'react'
import { formatAddress } from '@/utils'
export default function Home() {
  const { wallet } = useMetaMask()
  // const [txs, setTxs] = useState([])
  const [owner, setOwner] = useState('')
  const [price, setPrice] = useState('')
  const [finalPrice, setFinalPrice] = useState('')
  const [tokenSupply, setTokenSupply] = useState(0)
  const [totalReceived, setTotalReceived] = useState('')
  const [stage, setStage] = useState('')
  const [endAt, setEndAt] = useState('')
  const [totalBids, setTotalBids] = useState('')
  const [bidAmount, setBidAmount] = useState(0)
  const [isClaimable, setIsClaimable] = useState(false)


  const test1Func = async () => {
    dutchAuction.getIsClaimable().then((res) => {
      console.log(res)
    })
  }
  const startAuction = async () => {
    await dutchAuction.startAuction()
  }
  const finalizeAuction = async () => {
    await dutchAuction.finalizeAuction()
  }

  const buyHandler = async () => {
    if (wallet.accounts.length > 0) {
      await dutchAuction.bid(bidAmount, wallet.accounts[0])
    }
  }

  const claimHandler = async () => {
    if (wallet.accounts.length > 0) {
      await dutchAuction.claim(wallet.accounts[0])
    }
  }

  const isOwner = wallet.accounts.length > 0 && wallet.accounts[0] == owner
  const isClaimButtonDisabled = isClaimable && bidAmount != 0

  useEffect(() => {
    const getData = () => {
      console.log('fetching data')
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
      dutchAuction.getTotalReceived().then((res) => {
        setTotalReceived(res)
      }).catch((err) => {
        console.log(err)
      })
      dutchAuction.getBids(wallet.accounts[0]).then((res) => {
        setTotalBids(res)
      }).catch((err) => {
        // console.log(err)
      })
      dutchAuction.getFinalPrice().then((res) => {
        setFinalPrice(res)
      }).catch((err) => {
        console.log(err)
      })
      dutchAuction.getTokenSupply().then((res) => {
        setTokenSupply(res)
      }).catch((err) => {
        // console.log(err)
      })
      dutchAuction.getIsClaimable().then((res) => {
        setIsClaimable(res)
      }).catch((err) => {
        // console.log(err)
      })
    }
    getData()
    const id = setInterval(getData, 3000);
    return () => clearInterval(id);
  })


  return (
    <main className="flex min-h-screen flex-col items-center px-24 pt-12 bg-blue-100">
      <div className='flex justify-between w-full'>
        <button className='bg-red-200 rounded-lg px-3' onClick={test1Func}>
          TEST 1
        </button>

        {isOwner &&
          <button className='bg-red-200 rounded-lg px-3 disabled:bg-slate-500' disabled={stage == 'AuctionStarted'} onClick={startAuction}>
            Start Auction
          </button>
        }
        {isOwner &&
          <button className='bg-red-200 rounded-lg px-3 disabled:bg-slate-500' onClick={finalizeAuction}>
            Finalize Auction
          </button>
        }
        <ConnectButton></ConnectButton>
      </div>
      {/* address and timer section */}
      <div className='flex w-full justify-around my-5 bg-white rounded-lg shadow-sm'>
        <div className='w-1/2'>
          <div className='p-5 text-center'>
            Auction Address: {
              formatAddress
                (dutchAuction.address)}
            <div className='pt-2'>Auction Stage: {stage} </div>
          </div>
        </div>
        <div className='p-5 w-1/2 text-center'>
          <div>
            {stage != 'AuctionDeployed' && <>Ends at: {endAt}</>}
            {stage == 'AuctionDeployed' && <>Auction have not started</>}
          </div>
          <div className='pt-2'>
            AToken Supply: {tokenSupply}
          </div>
        </div>
      </div>
      {/* Current price and purchase history section */}
      <div className='flex w-full gap-1'>
        <div className='bg-white shadow-sm rounded-lg w-1/2 flex justify-around p-5'>
          {stage != 'AuctionEnded' && <>
            <div>Estimated Price:</div>
            <div>{price} Eth</div>
          </>}
          {stage == 'AuctionEnded' && <>
            <div>Confirmed Price:</div>
            <div>{finalPrice} Eth / AToken</div>
          </>}
        </div>
        <div className='bg-white shadow-sm rounded-lg w-1/2  p-5'>
          <div className='flex justify-around'>
            <div>Total bids:</div>
            <div>{totalReceived} Eth</div>
          </div>
          <div className='flex justify-around'>
            <div>Your Bids:</div>
            <div>{totalBids} Eth</div>
          </div>
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
      <button className='bg-blue-200 px-5 py-2 rounded-lg' onClick={claimHandler}>
        claim button
      </button>
    </main>
  )
}

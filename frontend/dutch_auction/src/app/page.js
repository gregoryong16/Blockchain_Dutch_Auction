'use client'
import ConnectButton from '@/components/ConnectButton'
import { useMetaMask } from '@/hooks/useMetamask'
import { dutchAuction } from './ClientContracts'
import { useEffect, useState } from 'react'
import ConnectToMetaMask from '@/components/ConnectToMetamask'
import { Box, HStack, Heading, Spacer } from '@chakra-ui/react'
import AdminPanel from '@/components/AdminPanel'
import AuctionDetails from '@/components/AuctionDetails'
import BiddingComponent from '@/components/BiddingComponent'

export default function Home() {
  const { wallet } = useMetaMask()
  // const [txs, setTxs] = useState([])
  const [owner, setOwner] = useState('')
  const [claimableTokens, setClaimableTokens] = useState('')
  const [price, setPrice] = useState('')
  const [finalPrice, setFinalPrice] = useState('')
  const [tokenSupply, setTokenSupply] = useState(0)
  const [tokenAddress, setTokenAddress] = useState(0)
  const [totalReceived, setTotalReceived] = useState('')
  const [stage, setStage] = useState('')
  const [endAt, setEndAt] = useState('')
  const [totalBids, setTotalBids] = useState('')
  const [startingPrice, setStartingPrice] = useState(0)


  const test1Func = async () => {
    dutchAuction.getTime().then((res) => {
      console.log(res)
    })
  }
  const isOwner = wallet.accounts.length > 0 && wallet.accounts[0] == owner

  useEffect(() => {
    const getData = () => {
      console.log('fetching data')
      
      Promise.all([
          dutchAuction.getOwner(), 
          dutchAuction.getCurrentPrice(), 
          dutchAuction.getStage(), 
          dutchAuction.getEndAt(),
          dutchAuction.getTotalReceived(),
          dutchAuction.getBids(wallet.accounts[0]),
          dutchAuction.getFinalPrice(),
          dutchAuction.getTokenSupply(),
          dutchAuction.getClaimableTokenBalance(wallet.accounts[0]),
          dutchAuction.getTokenAddress(),
          dutchAuction.getStartingPrice()
        ]).then(([owner, currentPrice, currentStage, endAt, totalReceived, bids, finalPrice, tokenSupply, claimableTokenBalance, tokenAddress, startingPrice]) => {
          setOwner(owner.toLowerCase())
          setPrice(currentPrice)
          setStage(currentStage)
          setEndAt(endAt)
          setTotalReceived(totalReceived)
          setTotalBids(bids)
          setFinalPrice(finalPrice)
          setTokenSupply(tokenSupply)
          setClaimableTokens(claimableTokenBalance)
          setTokenAddress(tokenAddress)
          setStartingPrice(startingPrice)
        },
        (error) => {
          console.log(error)
        })
    }
    getData()
    const id = setInterval(getData, 3000);

    return () =>
      clearInterval(id);

  })

  return (
    <Box style={{
      textAlign: "center",
      backgroundColor: "#202023",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: "10px"
    }}>
      {
      wallet.accounts.length <= 0 ? 
      <ConnectToMetaMask /> : (
        <>
        <HStack width="90%" mb={5} mt={3}>
          <Heading size="xl" color="#EEEEEE">AToken Dutch Auction</Heading>
          <Spacer />
          <ConnectButton />
        </HStack>
        <AuctionDetails 
          endAt={endAt}
          auctionStage={stage}
          tokenSupply={tokenSupply}
          startingPrice={startingPrice}
          auctionAddress={dutchAuction.address}
          isOwner={isOwner}
        />
        <BiddingComponent 
          estimatedPrice={price} 
          totalBids={totalReceived} 
          finalPrice={finalPrice} 
          bids={totalBids}
          stage={stage}
          claimableTokens={claimableTokens}
          wallet={wallet}
          tokenAddress={tokenAddress}
        />
    {isOwner && <AdminPanel />}
    </>
    )
  }
    </Box>
  )
}

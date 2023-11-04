import { HStack, Stack, Card, CardBody, Input, InputRightAddon, InputGroup, Text, Button } from "@chakra-ui/react";
import { dutchAuction } from "@/app/ClientContracts";
import { useState } from "react";

const BiddingComponent = (props) => {
    const [isBidding, setIsBidding] = useState(false)
    const [isClaiming, setIsClaiming] = useState(false)
    const [bidAmount, setBidAmount] = useState(0)

    const buyHandler = async () => {
        if (props.wallet.accounts.length > 0) {
            try {
                setIsBidding(true);
                await dutchAuction.bid(bidAmount, props.wallet.accounts[0])
            } catch (e) {
                console.log(e)
            } finally {
                setIsBidding(false);
            }
            
        }
    }

    const claimHandler = async () => {
        if (props.wallet.accounts.length > 0) {
            try {
                setIsClaiming(true)
                await dutchAuction.claim(props.wallet.accounts[0])
            } catch (e) {
                console.log(e)
            } finally {
                setIsClaiming(false)
            }
        }
    }

    return (
        <Card width="75%" mb={7} bg="#313134">
            <CardBody color="#EEEEEE">
                <HStack>
                    <Stack width="50%" textAlign="start">
                        <Text><b>{props.stage !== "AuctionEnded" ? "Current Estimated" : "Final"} Price:</b> {props.stage !== "AuctionEnded" ? props.estimatedPrice : props.finalPrice} ETH / AToken</Text>
                        <Text><b>Current Total Bidded Amount:</b> {props.totalBids} ETH</Text>
                    </Stack>
                    <Stack width="50%" textAlign="start">
                        <Text><b>Your Total Bids:</b> {props.bids} ETH</Text>
                        {
                            props.stage !== "AuctionEnded" ? 
                        <>
                        <InputGroup>
                            <Input placeholder="0" type="numeric" onChange={(e) => setBidAmount(e.target.value)}/>
                            <InputRightAddon children="ETH" color="#313134"/>
                        </InputGroup>
                        <Button 
                            width="30%" 
                            onClick={buyHandler} 
                            isLoading={isBidding} 
                            isDisabled={props.stage != 'AuctionStarted'}
                        >
                            Submit Bid
                        </Button>
                        </> :
                        <>
                            <Text><b>Claimable Tokens:</b> {props.claimableTokens}</Text>
                            <Button width="30%" onClick={claimHandler} isLoading={isClaiming} isDisabled={Number(props.claimableTokens) === 0} colorScheme="blue">Claim Tokens</Button>
                            <Text><b>AToken Contract Address:</b> {props.tokenAddress}</Text>
                        </>
                        }
                    </Stack>
                </HStack>
            </CardBody>
        </Card>
    )
}

export default BiddingComponent;
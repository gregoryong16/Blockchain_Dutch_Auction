import { Badge, Card, CardBody, CardHeader, Center, Divider, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { dutchAuction } from "@/app/ClientContracts";

const AuctionDetails = (props) => {
    const hourSeconds = 3600;
    const timerProps = {
        isPlaying: true,
        size: 120,
        strokeWidth: 6
    };

    const renderTime = (dimension, time) => {
        return (
          <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
          </div>
        );
      };

    const getTimeMinutes = (time) => ((time % hourSeconds) / 60) | 0;

    const duration = 20 * 60;
    const startTime = Date.now() / 1000;
    const endTime = Date.parse(props.endAt) != 0 ? Date.parse(props.endAt) / 1000: startTime + duration;

    const statusMap = {
        "AuctionDeployed": "Auction Deployed",
        "AuctionStarted": "Auction Ongoing",
        "AuctionEnded": "Auction Ended"
    }

    const statusColorMap = {
        "AuctionDeployed": "purple",
        "AuctionStarted": "green",
        "AuctionEnded": "red"
    }

    return (
        <Card width="75%" mb={7} bg="#313134" color="#EEEEEE">
            <CardHeader textAlign="start" height={2}><Heading size="md">Auction Details</Heading></CardHeader>
            <CardBody>
                <HStack fontSize="large">
                    <Card width="50%" textAlign="start" bg="#323235" color="#EEEEEE">
                        <CardBody>
                            <Stack>
                                <Text><b>Auction Address:</b> {props.auctionAddress}</Text>
                                <Text><b> Auction Stage:</b>  <Badge colorScheme={statusColorMap[props.auctionStage]}>{statusMap[props.auctionStage]}</Badge></Text>
                                <Text><b>Total AToken Supply:</b>  {props.tokenSupply}</Text>
                                <Text><b>Starting Price:</b>  {props.startingPrice} ETH / AToken</Text>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Divider orientation="vertical"/>
                    <Center width="50%">
                    {props.auctionStage === "AuctionStarted" ? 
                    <CountdownCircleTimer
                        {...timerProps}
                        colors="#319795"
                        duration={duration}
                        initialRemainingTime={(endTime - startTime) % hourSeconds}
                        onComplete={ async () => {
                            if (props.auctionStage === "AuctionStarted" && props.isOwner) {
                                try {
                                    await dutchAuction.finalizeAuction()
                                } catch (e) {
                                    console.log(e)
                                }
                            }
                        }}
                    >
                        {({ elapsedTime, color }) => (
                            <span style={{ color }}>
                                {renderTime("minutes", getTimeMinutes(duration - elapsedTime))}
                            </span>
                        )}
                    </CountdownCircleTimer> :
                    props.auctionStage === "AuctionDeployed" ? 
                    <Text>Auction has not started!</Text> :
                    <Text>Auction has ended!</Text>
                    }
                    {props.auctionStage == null && "Auction is not deployed yet"}
                    </Center>
                </HStack>
            </CardBody>
        </Card>
    )
}

export default AuctionDetails;
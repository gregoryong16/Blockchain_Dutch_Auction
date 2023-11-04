import { Button, Card, CardBody, CardHeader, HStack, Heading, Spacer } from "@chakra-ui/react";
import { dutchAuction } from "@/app/ClientContracts";
import { useState } from "react";


const AdminPanel = (props) => {

    const [auctionStartLoading, setAuctionStartLoading] = useState(false);
    const [auctionEndLoading, setAuctionEndLoading] = useState(false);
    
    const startAuction = async () => {
        try {
            setAuctionStartLoading(true)
            await dutchAuction.startAuction()
        } catch (e) {

        } finally {
            setAuctionStartLoading(false)
        }
      }

      const finalizeAuction = async () => {
        try {
            setAuctionEndLoading(true)
            await dutchAuction.finalizeAuction()
        } catch (e) {

        } finally {
            setAuctionEndLoading(false)
        }
      }

    return(
        <Card width="60%" bg="#313134">
            <CardHeader>
                <Heading color="#EEEEEE">Admin Panel</Heading>
            </CardHeader>
            <CardBody>
                <HStack>
                    <Button 
                        width="40%" 
                        isLoading={auctionStartLoading}
                        onClick={startAuction} 
                        colorScheme="green">
                        Start Auction
                    </Button>
                    <Spacer />
                    <Button 
                        width="40%" 
                        isLoading={auctionEndLoading}
                        onClick={finalizeAuction}
                        colorScheme="red"
                        >
                        End Auction
                    </Button>
                </HStack>
                
            </CardBody>
        </Card>
    )
}

export default AdminPanel;
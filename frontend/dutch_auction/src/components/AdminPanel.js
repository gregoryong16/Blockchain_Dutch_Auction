import { Button, Card, CardBody, CardHeader, Center, Heading } from "@chakra-ui/react";
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
                <Center>
                    <Button 
                        width="40%" 
                        isLoading={auctionStartLoading}
                        onClick={startAuction} 
                        colorScheme="green">
                        Start Auction
                    </Button>
                </Center>
            </CardBody>
        </Card>
    )
}

export default AdminPanel;
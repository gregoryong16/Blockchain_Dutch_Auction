import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import ConnectButton from "./ConnectButton";


const ConnectToMetaMask = () => {
    return (
        <Card align="center" size="lg" width="60%" height="300px" mt={12} bg="#313134" color="#EEEEEE">
            <CardHeader>
                <Heading size='md' fontSize="30px">
                    Connect Your Wallet
                </Heading>
            </CardHeader>
            <CardBody width="80%">
                <ConnectButton/>
            </CardBody>
        </Card>
    )
}

export default ConnectToMetaMask;
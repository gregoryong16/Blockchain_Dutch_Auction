'use client';

import NextLink from 'next/link'
import { useMetaMask } from '@/hooks/useMetamask';
import { formatAddress } from '@/utils';
import { Button } from '@chakra-ui/react';
import metamaskLogo from '../../public/MetaMask_Fox.png'
import Image from 'next/image';
import { BiWallet } from 'react-icons/bi'

export default function ConnectButton() {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();

  const defaultClassName =
    'text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-4 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

  return (
    <>
      {!hasProvider && (
        <a
          className={defaultClassName}
          href="https://metamask.io"
          target="_blank"
        >
          Install MetaMask
        </a>
      )}
      {wallet.accounts.length < 1 && (
        <Button
          isLoading={isConnecting}
          onClick={connectMetaMask}
          size='lg'
          height={20}
          width="100%"
          colorScheme='orange'
          color="#202023"
        >
          <Image src={metamaskLogo} alt='MetaMask Logo'  
          style={{
          width: 'auto',
          height: '80%',
        }}/>
          Connect with MetaMask
        </Button>
      )}
      {hasProvider && wallet.accounts.length > 0 && (
        <NextLink href={`https://etherscan.io/address/${wallet.accounts[0]}`} passHref>
          <Button
            size="md"
            leftIcon={<BiWallet />}
            fontWeight="normal"
            data-tooltip="Open in Block Explorer"
            colorScheme='teal'
            color="black"
          >
            {formatAddress(wallet.accounts[0])}
          </Button>
        </NextLink>
      )}
    </>
  );
}

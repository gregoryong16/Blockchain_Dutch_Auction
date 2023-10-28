import ConnectButton from '@/components/ConnectButton'
import { MetaMaskContextProvider } from '@/hooks/useMetamask'
export default function Home() {
  return (
    <MetaMaskContextProvider>
      <main className="flex min-h-screen flex-col items-center px-24 pt-12">
        <div className='flex justify-end w-full bg-blue-100'>
          <ConnectButton></ConnectButton>
        </div>
        {/* address and timer section */}
        <div className='flex w-full justify-around my-5'>
          <div>
            Auction Address: 0xTEST ADDRESS
          </div>
          <div>
            Time remaining: 23 mins 29 secs
          </div>
        </div>
        {/* Current price and purchase history section */}
        <div className='flex h-80 w-full'>
          <div className='border-2 border-blue-500 rounded-lg w-1/2 flex text-center mr-1'>
            <p>curr price: 123</p>
          </div>
          <div className='border-2 border-blue-500 rounded-lg w-1/2 '>
            <div>time: time1        </div>
          </div>
        </div>
        {/* Purchase button and input button */}
        <div className='flex w-full justify-center my-5'>
          <button className='bg-blue-200 p-5 rounded-lg mr-10'>
            Buy Token
          </button>
          <input className='border-2 border-blue-500 rounded-lg px-2' type="number"></input>
        </div>
        {/* claim button */}
        <div className='bg-blue-200 p-5 rounded-lg'>
          claim button
        </div>
      </main>
    </MetaMaskContextProvider>
  )
}

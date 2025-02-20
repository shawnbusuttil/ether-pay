import { Footer, Navbar, Services, Transactions, Welcome } from './components';
import { WalletProvider } from './providers/WalletProvider';

const App = () => {
  return (
    <WalletProvider>
      <div className='min-h-screen'>
        <div className='gradient-bg-welcome'>
          <Navbar />
          <Welcome />
        </div>
        {/* <Services /> */}
        <Transactions />
        <Footer />
      </div>
    </WalletProvider>
  )
}

export default App

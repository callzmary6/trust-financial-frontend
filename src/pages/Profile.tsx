import { useAuth } from '../context/AuthContext';
import styles from '../styles/pages/Profile.module.scss';
import { useState, useEffect } from 'react';
import { formatToWeekDay } from '../utils/timeUtils';
import { useGetCrypto } from '../hooks/useGetCrypto';
import Loader from '../components/Loader';
import { useCryptoAddress } from '../hooks/useCryptoAddresses.ts';
import { SyncLoader } from 'react-spinners';


const override = {
  display: 'block',
  margin: '0 auto',
};


const Profile = () => {
  const { user } = useAuth();
  const { data, isPending } = useGetCrypto();
  const { isChangingAddress, cryptoAddress } = useCryptoAddress();
  const [bitcoinAddress, setBitcoinAddress] = useState<string>('');
  const [ethereumAddress, setEthereumAddress] = useState<string>('');
  const [bitcoinCashAddress, setBitcoinCashAddress] = useState<string>('');
  const [usdtERCAddress, setUsdtERCAddress] = useState<string>('');
  const [usdtTRCAddress, setUsdtTRCAddress] = useState<string>('');
  
  const walletAddresses = data?.data.userProfile;

  useEffect(() => {
    if (walletAddresses) {
      setBitcoinAddress(walletAddresses.bitcoinAddress);
      setEthereumAddress(walletAddresses.ethereumAddress);
      setBitcoinCashAddress(walletAddresses.bitcoinCashAddress);
      setUsdtERCAddress(walletAddresses.usdtERCAddress);
      setUsdtTRCAddress(walletAddresses.usdtTRCAddress);
    }
  }, [walletAddresses]);

  const [profileData] = useState({
    accountName: 'Your name',
    registrationDate: formatToWeekDay(user?.user.createdAt as string),
  });

  const handleSubmit = () => {
    const cryptoAddresses = {
      bitcoinAddress,
      ethereumAddress,
      bitcoinCashAddress,
      usdtERCAddress,
      usdtTRCAddress
    };
    console.log(cryptoAddresses);
    cryptoAddress(cryptoAddresses)
  };

  if (isPending) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Profile Details</h1>
          <span className={styles.date}>
            {user?.user.firstName} {user?.user.lastName}
          </span>
          <span className={styles.date}>
            {user?.user.email}
          </span>
          <span className={styles.date}>
            Registered at: {profileData.registrationDate}
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.walletSection}>
            <h2>Wallet Addresses</h2>
            <div className={styles.walletFields}>
              <div className={styles.field}>
                <label>Bitcoin Address</label>
                <input
                  type="text"
                  value={bitcoinAddress}
                  placeholder="Enter your Bitcoin Address"
                  className={styles.input}
                  onChange={(e) => setBitcoinAddress(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label>Ethereum Address</label>
                <input
                  type="text"
                  value={ethereumAddress}
                  placeholder="Enter your Ethereum Address"
                  className={styles.input}
                  onChange={(e) => setEthereumAddress(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label>Bitcoin Cash Address</label>
                <input
                  type="text"
                  value={bitcoinCashAddress}
                  placeholder="Enter your Bitcoin Cash Address"
                  className={styles.input}
                  onChange={(e) => setBitcoinCashAddress(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label>USDT ERC20 Address</label>
                <input
                  type="text"
                  value={usdtERCAddress}
                  placeholder="Enter your USDT ERC20 Address"
                  className={styles.input}
                  onChange={(e) => setUsdtERCAddress(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label>USDT TRC20 Address</label>
                <input
                  type="text"
                  value={usdtTRCAddress}
                  placeholder="Enter your USDT TRC20 Address"
                  className={styles.input}
                  onChange={(e) => setUsdtTRCAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button className={styles.submitButton} onClick={handleSubmit} disabled={isChangingAddress}>
          {isChangingAddress? (
                <SyncLoader
                  role="loader"
                  color="#ffffff"
                  cssOverride={override}
                  size="0.7rem"
                  aria-label="Loading Spinner"
                />
              ) : (
                'Submit'
              )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
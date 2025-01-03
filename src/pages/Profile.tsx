import styles from '../styles/pages/Profile.module.scss';
import { useState } from 'react';

const Profile = () => {
  const [profileData] = useState({
    accountName: 'Your name',
    registrationDate: 'Dec-17-2024 05:22:48 PM',
    walletAddresses: {
      bitcoin: '',
      ethereum: '',
      bitcoinCash: '',
      usdtERC20: '',
      usdtTRC20: ''
    }
  });

  interface WalletFieldProps {
    label: string;
    value: string;
  }

  const WalletField = ({ label, value }: WalletFieldProps) => (
    <div className={styles.field}>
      <label>{label}</label>
      <input 
        type="text"
        value={value}
        placeholder={`Enter your ${label}`}
        className={styles.input}
        readOnly
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Profile Details</h1>
          <span className={styles.date}>
            Registered: {profileData.registrationDate}
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.field}>
            <label>Account Name</label>
            <input
              type="text"
              value={profileData.accountName}
              className={styles.input}
              readOnly
            />
          </div>

          <div className={styles.walletSection}>
            <h2>Wallet Addresses</h2>
            <div className={styles.walletFields}>
              <WalletField label="Bitcoin Address" value={profileData.walletAddresses.bitcoin} />
              <WalletField label="Ethereum Address" value={profileData.walletAddresses.ethereum} />
              <WalletField label="Bitcoin Cash Address" value={profileData.walletAddresses.bitcoinCash} />
              <WalletField label="USDT ERC20 Address" value={profileData.walletAddresses.usdtERC20} />
              <WalletField label="USDT TRC20 Address" value={profileData.walletAddresses.usdtTRC20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
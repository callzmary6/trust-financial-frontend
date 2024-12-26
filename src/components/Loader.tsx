// import Header from './Header';
import '../styles/components/Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      {/* <Header /> */}
      <div className="loader__rest">
        <div className="loader__rest__shape"></div>
      </div>
    </div>
  );
};

export default Loader;

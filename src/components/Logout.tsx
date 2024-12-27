import ConfirmModal from '../components/ConfirmModal';
import Modal from '../components/Modal';

interface LogoutProps {
  handleLogout: ()=>void;
}

function Logout({handleLogout}: LogoutProps) {
  return (
        <Modal>
          <Modal.Open
            opensWindowName="logout"
          >
            <div>Log out</div>
          </Modal.Open>
          <Modal.Window name="logout">
            <ConfirmModal 
              text='Are you sure you want to log out?'
              onConfirm={handleLogout}
            />
          </Modal.Window>
        </Modal>
  );
}

export default Logout;

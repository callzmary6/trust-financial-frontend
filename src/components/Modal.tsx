/* eslint-disable react-hooks/rules-of-hooks */

import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import '../styles/components/Modal.scss';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');

  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  children: ReactNode;
  opensWindowName: string;
  setActiveAuthPage?: (value: string) => void;
}

function Open({ children, opensWindowName, setActiveAuthPage }: OpenProps) {
  const context = useContext(ModalContext);

  if (!context) return null;

  const { open } = context;

  return cloneElement(children as React.ReactElement, {
    onClick: () => {
      open(opensWindowName);
      if (setActiveAuthPage) {
        setActiveAuthPage('signup');
      }
    },
  });
}

interface WindowProps {
  children: ReactNode;
  name: string;
  type?: string;
}

function Window({ children, name, type }: WindowProps) {
  const context = useContext(ModalContext);

  if (!context) return null;

  const { openName, close } = context;

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="overlay">
      <div
        className="overlay__modal"
        ref={ref as React.LegacyRef<HTMLDivElement>}
      >
        {type !== 'noClose' && (
          <button className="overlay__modal__button" onClick={close}>
            <HiXMark className="overlay__modal__svg" />
          </button>
        )}

        <div>
          {cloneElement(children as React.ReactElement, {
            onCloseModal: close,
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

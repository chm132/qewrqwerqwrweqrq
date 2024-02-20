import React from 'react';

interface Props {
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-10 bg-black/50">
      <div className=" top-[20%] left-[30%]  absolute z-40  bg-[#FFFFFF] h-[198px] w-[640px] rounded-3xl">
        <div className="flex ">
          <button className="m-6 mb-6 ml-auto" onClick={onClose}>
            <img alt="closeModal" src="/assets/Modal/modalClose.svg"></img>
          </button>
        </div>
        <div className="font-semibold text-[32px] text-center">
          이용약관에 동의해주세요.
        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceModal;

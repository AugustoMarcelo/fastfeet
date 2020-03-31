import React, { forwardRef, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import { Background, Box } from './styles';

const Modal = forwardRef(({ modalTitle }, ref) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(null);

  useImperativeHandle(ref, () => ({
    setModalContent(component) {
      setContent(component);
    },
    show() {
      setVisible(true);
    },
  }));

  return (
    <Background style={{ display: !visible && 'none' }}>
      <Box>
        <header>
          {modalTitle}
          <button type="button" onClick={() => setVisible(false)}>
            <MdClose size={22} color="#bbb" />
          </button>
        </header>
        {content}
      </Box>
    </Background>
  );
});

Modal.propTypes = {
  modalTitle: PropTypes.string,
};

export default Modal;

// export default function Modal({ modalTitle, visible, content: Content }) {
//   return (
//     <Background style={{ display: !visible && 'none' }}>
//       <Box>
//         <header>
//           {modalTitle}
//           <button type="button">
//             <MdClose size={22} color="#bbb" />
//           </button>
//         </header>
//         <Content />
//       </Box>
//     </Background>
//   );
// }

// Modal.propTypes = {
//   modalTitle: PropTypes.string,
//   visible: PropTypes.bool,
//   content: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
// };

// Modal.defaultProps = {
//   visible: false,
// };

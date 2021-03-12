import React, {useState} from 'react';
import './Payment.css';
import {Modal} from 'react-bootstrap';
function Payment() {
    const [show, setShow] = useState(false);
    const handlePopup = () =>{
        setShow(true);
        document.getElementById('popover-basic').style.display='none'
    }

  return (
    <div >
      <div className="renew" onClick={handlePopup}>
        Renew
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        centered
         className="popover_modal"
        >
        <Modal.Header closeButton></Modal.Header>
          <Modal.Title id="title">
            Payment
          </Modal.Title>

<Modal.Body className="show-grid">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              .col-xs-12 .col-md-8
            </div>
            <div className="col-lg-4 col-md-4">
              .col-xs-6 .col-md-4
            </div>
            <div className="col-lg-4 col-md-4">
              .col-xs-6 .col-md-4
            </div>
          </div>

        </div>
      </Modal.Body>
      </Modal>
    </div>
  );
}
export default Payment;
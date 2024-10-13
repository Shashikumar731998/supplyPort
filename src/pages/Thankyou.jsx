import { NavLink } from 'react-router-dom';
import login_img from './images/Frame 1707478581.jpg';
import thank_img from './images/Frame-1707478411.jpg';

const Thankyou = () => {
  return (
    <div className="login_area">
      <div className="container-fluid">
        <div className="row justify-content-center align-item">
          <div className="col-md-6 p-0">
            <div className='login_left'>
              <img src={login_img} />
            </div>
          </div>
          <div className="col-md-6 text-right p-0">
            <div className='login_right'>
              <a href='#' className='back'><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 9.33333L9.33333 14M9.33333 14L14 18.6667M9.33333 14H18.6667M9.1 24.5H18.9C20.8602 24.5 21.8403 24.5 22.589 24.1185C23.2475 23.783 23.783 23.2475 24.1185 22.589C24.5 21.8403 24.5 20.8602 24.5 18.9V9.1C24.5 7.13982 24.5 6.15972 24.1185 5.41103C23.783 4.75247 23.2475 4.21703 22.589 3.88148C21.8403 3.5 20.8602 3.5 18.9 3.5H9.1C7.13982 3.5 6.15972 3.5 5.41103 3.88148C4.75247 4.21703 4.21703 4.75247 3.88148 5.41103C3.5 6.15972 3.5 7.13982 3.5 9.1V18.9C3.5 20.8602 3.5 21.8403 3.88148 22.589C4.21703 23.2475 4.75247 23.783 5.41103 24.1185C6.15972 24.5 7.13982 24.5 9.1 24.5Z" stroke="#1D3754" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg> <NavLink to={-1}>Back to Home</NavLink></a>
              <div className='thank_you text-center'>
                <h1>Form Submitted</h1>
                <img src={thank_img} />
                <p>We will be in touch shortly via the provided email address.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Thankyou;
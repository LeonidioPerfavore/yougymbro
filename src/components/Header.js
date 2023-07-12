import {useNavigate} from 'react-router-dom';
import { BsFillBarChartFill } from 'react-icons/bs';
import { CgGym } from 'react-icons/cg';
import { AiTwotoneCalendar } from 'react-icons/ai';

export const Header = () => {

    const navigate = useNavigate();


    const logout = () => { localStorage.removeItem('token'); navigate('/login') }


    const openSideNavbar = () => {
        let sideBar = document.getElementById('sidebar-menu');

        if(sideBar){
            sideBar.style.left = '0';
        }
        let offcanvasBackdropFade = document.getElementById('offcanvas-backdrop-fade');

        if(offcanvasBackdropFade){
            offcanvasBackdropFade.classList.remove('hide');
            offcanvasBackdropFade.classList.add('show');
        }
    };

    const closeSideNavbar = () => {
        let offcanvasBackdropFade = document.getElementById('offcanvas-backdrop-fade');

        if(offcanvasBackdropFade){
            offcanvasBackdropFade.classList.add('hide');
            offcanvasBackdropFade.classList.remove('show');
        }
        let sideBar = document.getElementById('sidebar-menu');

        if(sideBar){
            // offcanvas.style.visibility = "visible";
            sideBar.style.left = '-250px';
        }
    }

    const navigateToExercisesList = () => {
        closeSideNavbar();
        navigate('/exercises')
    }

    const navigateToHome = () => {
        closeSideNavbar();
        navigate('/')
    }

    const navigateToStatistics = () => {
        closeSideNavbar();
        // navigate('/')
    }

    return (
        <div className="header">

            <div className={"burger-btn"} data-bs-toggle="offcanvas" onClick={openSideNavbar}>
                <span className="line"/>
                <span className="line"/>
                <span className="line"/>
            </div>

            <div className={'logo'}><span>YOU</span>GYMBRO</div>

            <button onClick={logout} className={'logout-btn cursor-pointer'}>LOGOUT</button>

            <div id="sidebar-menu">
                <div className={'sidebar-nav-wrapper'}>
                    <div className={'sidebar-item'} onClick={navigateToHome}>
                        <div className={'nav-icon'}><AiTwotoneCalendar /></div>
                        <div className={'nav-text'}>Calendar</div>
                    </div>
                    <div className={'sidebar-item'} onClick={navigateToExercisesList}>
                        <div className={'nav-icon'}><CgGym /></div>
                        <div className={'nav-text'}>Exercises</div>
                    </div>
                    <div className={'sidebar-item'} onClick={navigateToStatistics}>
                        <div className={'nav-icon'}><BsFillBarChartFill /></div>
                        <div className={'nav-text'}>Statistic</div>
                    </div>
                </div>
            </div>

            <div id={'offcanvas-backdrop-fade'} className="fade-in hide" onClick={closeSideNavbar}/>

        </div>
    );
};

export default Header;

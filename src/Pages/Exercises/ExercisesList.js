import Header from "../../components/Header";
import {useEffect, useState} from "react";
import {CgGym} from "react-icons/cg";
import {BsSearch} from "react-icons/bs";
import {getInstanceAxios} from "../../utils/helper";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {exerciseValidation} from "../../utils/validations";
import {errorMessageBlock} from "../../utils/errorMessageBlock";
import {MdOutlineClear} from "react-icons/md";
import Preloader from "../../components/Preloader";

export const ExercisesList = () => {

    const [exercises, setExercises] = (useState([]));
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const filteredExercises = exercises.filter((ex) =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openModal = () => {setIsOpenModal(true)};
    const closeModal = () => {setIsOpenModal(false); setSpinner(false)};

    const changeNameInput = (e) => { let name = e.target.value; setErrorMessage(null); setName(name); }

    const getExercisesList = async () => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            await getInstanceAxios("Content-Type: application/json")
                .get(backendUrl + '/api/exercise/list').then(response => {
                    setExercises(response.data);
                    setLoading(false);
                }).catch(error => {
                    // localStorage.removeItem('token');
                    // navigate('/login');
                    console.log(error)
                });

        } catch (error) {
            // localStorage.removeItem('token');
            // navigate('/login');
        }
    }

    useEffect(() => {
        (async () => {
            await getExercisesList();
        })();
    }, []);

    const createExercise = async () => {
        let findValidationError = exerciseValidation(name);
        if (!findValidationError) {

            try {
                const backendUrl = process.env.REACT_APP_BACKEND_URL;
                const data = {name: name};

                await getInstanceAxios("Content-Type: application/json")
                    .post(backendUrl + '/api/exercise/create', data).then(response => {
                        const newExercise = {"name": name};

                        setExercises(prevExercises => [...prevExercises, newExercise]);
                        closeModal();
                    }).catch(error => {
                        if (error.response) {
                            if (error.response.status === 422) {
                                setErrorMessage(Object.values(error.response.data.data)[0])
                            } else {
                                console.log(error.response.data.message);
                                setErrorMessage('Something went wrong!');
                            }
                        } else {
                            setErrorMessage('Something went wrong!');
                        }
                    });

            } catch (error) {
                localStorage.removeItem('token');
                // navigate('/login');
            }

            // setLoader(false);
        }else{
            setErrorMessage(findValidationError)
        }
    }

    return (
        <div>
            <Header />
            <div id={'exercise-wrapper'}>

                <div className={'spacer'} />
                <div className={'spacer'} />

                <h1 className={'section-header underline-red'}>Exercises list</h1>

                {loading ? <Preloader /> :
                <div>
                <div className="searchbar">
                    <input type="text" className="search-input" value={searchTerm} onChange={handleSearchChange} />
                    {searchTerm && (<MdOutlineClear className="clear-search-icon" onClick={clearSearch} />)}
                    <button className="search-button">
                        <BsSearch />
                    </button>
                </div>

                <div className={'center-btn'}>
                    <div id={'add-exercise-icon'} onClick={openModal}>
                        <CgGym />
                    </div>
                </div>

                <ul>
                    {filteredExercises.length ? (
                        filteredExercises.map((ex, key) => (
                            <li key={key}>
                                <strong>{ex.name}</strong>
                            </li>
                        ))
                    ) : (
                        <li>There is no exercise!</li>
                    )}
                </ul>
                </div>}

                <Dialog onClose={closeModal} aria-labelledby="simple-dialog-title" open={isOpenModal}>
                    <div className="dialog">
                        <div className="modal-content">
                            <h4>CREATE EXERCISE:</h4>
                                <div className="center-btn">
                                    <input type="name" placeholder="Name" className={'input'}
                                           value={name} onChange={changeNameInput} maxLength="100"
                                    />
                                </div>

                                {errorMessageBlock(errorMessage)}
                        </div>

                            {/*{spinner ?*/}
                            {/*    <div className="spinner-border" role="status">*/}
                            {/*        <span className="visually-hidden">Loading...</span>*/}
                            {/*    </div> : null}*/}
                            <button type="button" className="btn-danger" data-dismiss="modal" onClick={closeModal}>
                                CANCEL
                            </button>
                            <button type="button" className="btn-success" id={'cross-mb-buy-submit'} data-dismiss="modal" onClick={createExercise}>
                                CREATE
                            </button>
                    </div>
                </Dialog>

            </div>
        </div>
    );
};

export default ExercisesList;

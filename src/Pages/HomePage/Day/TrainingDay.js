import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getInstanceAxios} from "../../../utils/helper";
import Header from "../../../components/Header";
import ExerciseForm from "./ExerciseForm";
import WorkoutData from "./WorkoutData";
import Dialog from "@material-ui/core/Dialog/Dialog";
// import {errorMessageBlock} from "../../../utils/errorMessageBlock";
import Preloader from "../../../components/Preloader";
import EditWorkoutForm from "./EditWorkoutForm";

export const TrainingDay = () => {

    const navigate = useNavigate();
    const { date } = useParams();

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editForm, setEditForm] = useState(false);

    const openDeleteDialog = () => {setOpenDelete(true);}
    const closeDeleteDialog = () => {setOpenDelete(false);}

    const openEditTrainingForm = async () => {
        const openEditTrainingBtn = document.getElementById('open-edit-training-btn');
        openEditTrainingBtn.classList.add('d-none');

        if(exercises && exercises.length){
            setEditForm(true);
        }else{
            await getExerciseList();
            setEditForm(true);
        }
    }

    const getTraining = async (date) => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            await getInstanceAxios("Content-Type: application/json")
                .get(backendUrl + '/api/training-show/?date='+date).then(response => {
                    // setMonthTrainingData(response.data);
                    setData(response.data);
                    console.log(response.data);
                    setLoading(false)
                }).catch(error => {
                    // localStorage.removeItem('token');
                    // navigate('/login');
                    console.log(error)
                });

        } catch (error) {
            // localStorage.removeItem('token');
            // navigate('/login');
        }

        // setLoader(false);
    }

    const deleteTraining = async () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

            await getInstanceAxios("Content-Type: application/json")
            .delete(backendUrl + '/api/training-delete?id='+data[0].training_id).then(response => {
                // setMonthTrainingData(response.data);
                navigate('/');
            }).catch(error => {
                // localStorage.removeItem('token');
                // navigate('/login');
                console.log(error)
            });
    }

    useEffect(() => { (async () => { await getTraining(date); })(); }, []);

    const getExerciseList = () => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

         getInstanceAxios("Content-Type: application/json")
            .get(backendUrl + '/api/exercise/create-list').then(response => {
                setExercises(response.data);

            }).catch(error => {
                console.log(error)
            });
    }

    const openCreateForm = async () => {
        const createTrainingBtn = document.getElementById('create-training-btn-wrapper');
        createTrainingBtn.classList.add('d-none');

        if(exercises && exercises.length){
            setOpen(true);
        }else{
           await getExerciseList()
            setOpen(true);
        }
    }

    const cancelEdit = () => {
        const openEditTrainingBtn = document.getElementById('open-edit-training-btn');
        openEditTrainingBtn.classList.remove('d-none');
        setEditForm(false);
    }

    const closeCreateForm = () => {
        const createTrainingBtn = document.getElementById('create-training-btn-wrapper');
        createTrainingBtn.classList.remove('d-none');
        setOpen(false);
    }

    function formatDateWithOffset(offset = 0) {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + offset);

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return  currentDate.toLocaleString('en', options);
    }

    return (<div>
            <Header />
            <div className={'presentation-board'}>

                <div className={'spacer'} />
                <div className={'spacer'} />

                <div className="board">
                    <h1 className={'section-header underline-red'}>{formatDateWithOffset()}</h1>
                    {loading ? <Preloader/> :
                    <div>

                        {data && data.length && !editForm ? <WorkoutData data={data}/> : null}

                        {!(data && data.length) &&
                            <div className="center-btn" id="create-training-btn-wrapper">
                                <button className="primary-btn" onClick={openCreateForm}>Create training</button>
                            </div>
                        }

                        {open && !editForm ? <ExerciseForm exercises={exercises}/> : null}

                        {open ?
                            <div className={'grid-wrapper'}>
                                <button onClick={closeCreateForm} className={'close-form-btn'}>CLOSE</button>
                            </div>
                            : null}

                        {editForm ? <EditWorkoutForm exercises={exercises} data={data} /> : null}


                        {editForm ?
                            <div className={'grid-wrapper'}>
                                <button onClick={cancelEdit} className={'close-form-btn'}>CANCEL</button>
                            </div>
                            : null}

                        {data && data.length ?
                            <div className={'grid-wrapper'}>
                                <button id={'open-edit-training-btn'} onClick={openEditTrainingForm}>Edit training</button>
                                <button className={'delete-training-btn'} onClick={openDeleteDialog}>Delete training</button>
                            </div>
                            : null}

                    </div>
                }
                </div>

                <Dialog onClose={closeDeleteDialog} aria-labelledby="simple-dialog-title" open={openDelete}>
                    <div className="dialog">
                        <div className="modal-content">
                            <h4>Are you sure?</h4>
                        </div>
                        {/*{spinner ?*/}
                        {/*    <div className="spinner-border" role="status">*/}
                        {/*        <span className="visually-hidden">Loading...</span>*/}
                        {/*    </div> : null}*/}
                        <button type="button" className="btn-success" data-dismiss="modal" onClick={closeDeleteDialog}>
                            CANCEL
                        </button>
                        <button type="button" className="btn-danger" id={'cross-mb-buy-submit'} data-dismiss="modal" onClick={deleteTraining}>
                            DELETE
                        </button>
                    </div>
                </Dialog>


            </div>

        </div>
    );
};

export default TrainingDay;

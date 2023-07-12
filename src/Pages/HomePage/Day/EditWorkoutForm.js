import React, { useEffect, useState } from 'react';
import { getInstanceAxios } from "../../../utils/helper";
import { useNavigate, useParams } from "react-router-dom";
import { trainingDayValidation } from "../../../utils/validations";
import { errorMessageBlock } from "../../../utils/errorMessageBlock";

const EditWorkoutForm = (props) => {
    const navigate = useNavigate();
    const exercisesList = props.exercises;
    const workOutData = props.data;
    const origin = workOutData;

    const { date } = useParams();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isDataChanged, setIsDataChanged] = useState(false);

    const [exercises, setExercises] = useState(workOutData);

    useEffect(() => {
        // Проверить, были ли данные изменены
        const checkDataChanges = () => {
            const initialData = JSON.stringify(origin);
            const currentData = JSON.stringify(exercises);
            setIsDataChanged(initialData !== currentData);
        };

        checkDataChanges();
    }, [exercises, workOutData]);

    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...exercises];
        updatedExercises[index] = {
            ...updatedExercises[index],
            [field]: value
        };
        setExercises(updatedExercises);
    };

    const handleSetChange = (exerciseIndex, setIndex, field, value) => {
        const updatedExercises = [...exercises];
        updatedExercises[exerciseIndex].sets[setIndex][field] = value;
        setExercises(updatedExercises);
    };

    const addExercise = () => {
        if (exercises.length < 10) {
            setExercises([...exercises, { id: '', sets: [{ reps: '', weight: '' }] }]);
        }
    };

    const addSet = (exerciseIndex) => {
        const updatedExercises = [...exercises];
        if (updatedExercises[exerciseIndex].sets.length < 20) {
            updatedExercises[exerciseIndex].sets.push({ reps: '', weight: '' });
            setExercises(updatedExercises);
        }
    };

    const removeSet = (exerciseIndex, setIndex) => {
        const updatedExercises = [...exercises];
        updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
        setExercises(updatedExercises);
    };

    const removeExercise = (exerciseIndex) => {
        const updatedExercises = [...exercises];
        updatedExercises.splice(exerciseIndex, 1);
        setExercises(updatedExercises);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let findValidationError = trainingDayValidation(exercises);

        if (!findValidationError) {
            setErrorMessage(null);
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            const data = { data: exercises, date: date };

            console.log(data);

            // try {
            //     const response = await getInstanceAxios("Content-Type: application/json").post(backendUrl + '/api/training-create', data);
            //     console.log('response', response);
            //     navigate('/');
            // } catch (error) {
            //     console.log(error);
            // }
        } else {
            setErrorMessage(findValidationError);
        }
    };

    return (
        <form onSubmit={handleSubmit} id={'edit-training-form'} className={'training-form'}>
            {exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex}>
                    <label>
                        Exercise {exerciseIndex + 1}:<br />
                        <select
                            value={exercise.id}
                            onChange={(event) => handleExerciseChange(exerciseIndex, 'id', event.target.value)}
                        >
                            <option value="">Choose an exercise</option>
                            {exercisesList &&
                                exercisesList.map((optionExercise) => (
                                    <option key={optionExercise.id} value={optionExercise.id}>
                                        {optionExercise.name}
                                    </option>
                                ))}
                            {/* Здесь добавьте нужные варианты выбора упражнений */}
                        </select>
                    </label>
                    <br />
                    {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex}>
                            <label>
                                Set {setIndex + 1}:<br />
                                <input
                                    type="number"
                                    value={set.reps}
                                    onChange={(event) =>
                                        handleSetChange(exerciseIndex, setIndex, 'reps', event.target.value)
                                    }
                                    placeholder="Reps"
                                    min="0"
                                    step="0.1"
                                    pattern="\d+(\.\d{1})?"
                                />
                                <input
                                    type="number"
                                    value={set.weight}
                                    onChange={(event) =>
                                        handleSetChange(exerciseIndex, setIndex, 'weight', event.target.value)
                                    }
                                    placeholder="Weight"
                                    min="0"
                                    step="0.1"
                                    pattern="\d+(\.\d{1})?"
                                />
                                <button
                                    type="button"
                                    className={'delete-form-btn'}
                                    onClick={() => removeSet(exerciseIndex, setIndex)}
                                >
                                    Delete set
                                </button>
                            </label>
                        </div>
                    ))}
                    {exercises.length > 1 && (
                        <button
                            type="button"
                            className={'delete-form-btn'}
                            onClick={() => removeExercise(exerciseIndex)}
                        >
                            Delete exercise
                        </button>
                    )}
                    <button
                        type="button"
                        className={'add-set-btn'}
                        onClick={() => addSet(exerciseIndex)}
                    >
                        ADD SET
                    </button>
                    <div className={'purple-bottom'} />
                </div>
            ))}

            {exercises.length < 10 && (
                <button type="button" className={'add-exercise-btn'} onClick={addExercise}>
                    ADD EXERCISE
                </button>
            )}

            {errorMessageBlock(errorMessage)}

            <button
                type="submit"
                className={'form-submit-btn'}
                disabled={!isDataChanged}
            >
                {isDataChanged ? 'BLOCK' : 'UPDATE'}
            </button>
        </form>
    );
};

export default EditWorkoutForm;

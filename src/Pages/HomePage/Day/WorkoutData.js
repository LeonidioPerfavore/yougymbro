import React from 'react';

const WorkoutData = ({ data }) => {
    return (
        <div className={'exercise-block-in-day-wrapper'}>
            {data.map((exercise, index) => (
                <div className={'exercise-block-in-day'} key={index}>
                    <p>
                        {`${index + 1}. `}
                        <span className={'exercise-name'}>{exercise.name}</span>{':'}<br/>
                        {exercise.sets.map((set, setIndex) => (
                            <span key={setIndex}>
                                {set.weight ? <span className={'marker-font'}>{`${set.weight}`}<span className={'marker-font'}> X</span></span> : null}
                                <span className={'marker-font reps-span'}>{` ${set.reps} `}</span>
                            </span>
                        ))}
                    </p>
                </div>
            ))}

        </div>
    );
};

export default WorkoutData;

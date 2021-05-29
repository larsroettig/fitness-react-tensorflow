import React from 'react'

export const RunTrainingButton = () => {

 const handleRunTraining = () =>
 {
  console.log('Run training');
 }


  return (
    <button className="mt-2 sm:mt-0 sm:ml-6 inline-block bg-teal-500 text-white text-sm font-semibold rounded-md px-3 py-2 hover:bg-teal-600" onClick={handleRunTraining}>
      Run training
    </button>
  )
}

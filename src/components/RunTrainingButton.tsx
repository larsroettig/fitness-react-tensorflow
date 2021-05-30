import React from "react";
import * as tf from '@tensorflow/tfjs';

export const RunTrainingButton = () => {
  const handleRunTraining = () => {
    tf.tensor([[1, 2], [3, 4]]).print();
  };

  return (
    <button
      className="mt-2 sm:mt-0 sm:ml-6  bg-green-700 text-white text-sm  rounded-md px-3 py-2 hover:bg-green-600"
      onClick={handleRunTraining}
    >
      Run training
    </button>
  );
};

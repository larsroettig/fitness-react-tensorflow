import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { useLoading } from "../hooks/useLoading";
import { Loader } from "./Loader";
import { useLoadPosenet } from "../hooks/useLoadPosenet";

export const RunTrainingButton = () => {
  const [inputNumber, setInputNumber] = useState(0);
  const [tfTrainingModel, setTfTrainingModel] =
    useState<tf.Sequential | null>(null);
  const [result, setResult] = useState(0);
  const [state, dispatch] = useLoading();

  const PosenetModel = useLoadPosenet({
    architecture: "MobileNetV1",
    outputStride: 16,
    inputResolution: { width: 800, height: 600 },
    multiplier: 0.75,
  });

  useEffect(() => {
    console.log(PosenetModel);
  }, [PosenetModel]);

  const doTraining = async () => {
    dispatch({ type: "start" });
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 1,
        inputShape: [1],
      })
    );

    model.compile({
      loss: "meanSquaredError",
      optimizer: "sgd",
    });

    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [11, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7, 9, 11, 13, 15, 17], [11, 1]);

    const callbacks = {
      onEpochEnd: async (epoch: any, logs: any) => {
        console.log(`epoch: ${epoch} ${JSON.stringify(logs)}`);
      },
    };

    await model.fit(xs, ys, { epochs: 200, callbacks: callbacks });

    setTfTrainingModel(model);
    console.log("success");
    dispatch({ type: "success" });
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputNumber = Number(e.currentTarget.value);

    if (isNaN(inputNumber)) {
      return;
    }

    setInputNumber(inputNumber);

    if (tfTrainingModel === null) {
      return;
    }

    const prediction = tfTrainingModel.predict(
      tf.tensor2d([inputNumber], [1, 1])
    ) as tf.Tensor;

    setResult(prediction.dataSync()[0]);
  };

  if (state.status === "empty") {
    return (
      <button
        className="  bg-green-700 text-white text-sm rounded-md px-3 py-2 hover:bg-green-600"
        onClick={doTraining}
      >
        Run training
      </button>
    );
  }

  if (state.status === "loading") {
    return (
      <button
        className=" bg-gray-700 text-white text-sm rounded-md px-3 py-2 "
        disabled
      >
        <Loader />
      </button>
    );
  }

  return (
    <div>
      <h1>Calucated y = x * 2 - 1</h1>
      <label>
        Number:
        <input
          type="text"
          className="pt-3 pb-2 block  px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
          onChange={handleChange}
        />
      </label>
      <div className="mt-5">
        <p className="text-xl">Orginal</p>
        <p>Result: {inputNumber ? inputNumber * 2 - 1 : ""}</p>
      </div>
      <div className="mt-5">
        <span className="text-xl">AI</span>
        <p>Result: {result ? result : ""}</p>
        <p>Rounded Result: {result ? Math.round(result) : ""}</p>
      </div>
    </div>
  );
};

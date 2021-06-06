import * as posenet from "@tensorflow-models/posenet";
import { useEffect, useState } from "react";
import { useMemoCompare } from "./useMemoCompare";

export const useLoadPosenet = (
  config: posenet.ModelConfig
): posenet.PoseNet | null => {
  const [model, setModel] = useState<posenet.PoseNet | null>(null);

  const configCached = useMemoCompare(config, (prevConfig) => {
    return Boolean(
      prevConfig &&
        config &&
        JSON.stringify(config) === JSON.stringify(prevConfig)
    );
  });

  useEffect(() => {
    // need to make copy becuase load change the config object in'context.
    const copiedConfigCached = JSON.parse(JSON.stringify(configCached))
    loadPosenet(copiedConfigCached);
  }, [configCached]);

  const loadPosenet = async (config?: posenet.ModelConfig) => {
    setModel(await posenet.load(config));
  };

  return model;
};

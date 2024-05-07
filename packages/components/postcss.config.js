import pluginAssignLayer from "postcss-assign-layer";

export default {
  plugins: [
    pluginAssignLayer([
      {
        include: "**/*.module.css",
        layerName: "system42",
      },
    ]),
  ],
};

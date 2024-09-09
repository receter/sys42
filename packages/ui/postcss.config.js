import pluginAssignLayer from "postcss-assign-layer";

export default {
  plugins: [
    pluginAssignLayer([
      {
        include: "lib/**/*.css",
        layerName: "sys42",
      },
    ]),
  ],
};

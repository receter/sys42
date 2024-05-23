import pluginAssignLayer from "postcss-assign-layer";

export default {
  plugins: [
    pluginAssignLayer([
      {
        include: "**/*.css",
        layerName: "sys42",
      },
    ]),
  ],
};

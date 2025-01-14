import pluginAssignLayer from "postcss-assign-layer";

export default {
  plugins: [
    pluginAssignLayer([
      {
        include: ["!(lib/**/base.css)lib/**/*.css"],
        layerName: "sys42",
      },
      {
        include: "lib/base.css",
        layerName: "sys42-base",
      },
    ]),
  ],
};

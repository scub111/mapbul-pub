function TimingCompilationPlugin(options) { }

let t0 = new Date;

TimingCompilationPlugin.prototype.apply = function (compiler) {
   compiler.plugin("compile", function (compilation) {
      t0 = new Date();
   });

   compiler.plugin("done", function (compilation) {
      const diff = new Date().valueOf() - t0.valueOf();
      // t0 = new Date();
      console.log(`[Time compilation: ${diff}ms]`);
   });
};

module.exports = TimingCompilationPlugin;
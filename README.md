# Experiments

Small experiments on [onedimension](https://onedimension.net).

## Building

Ensure there's an `experiments.config` file:

```
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET=

S3_EXPERIMENT_INDEX=  # overall experiments index (e.g. /experiments/)
S3_EXPERIMENT_DIR=    # each experiment path (e.g. /experiment/)

EXPERIMENT_INDEX_DIR=   # where the index page source code is (e.g. index/)
EXPERIMENT_SOURCE_DIR=  # where experiment source code is (no subdir for now)
EXPERIMENT_BUILD_DIR=   # the build dir for each experiment (e.g. build/)
```

Then, build an experiment:

```
./thoughts.sh -b [experiment-name]
```

### Experiment setup

The directory name for each experiment is the name used to build it, so sveltekit config should look something like:

```js
const dev = process.env.NODE_ENV === "development";

const config = {
  kit: {
    adapter: adapter({
      precompress: true,
    }),
    files: {
      assets: "static",
    },
    paths: {
      base: dev ? "" : "/experiment/[experiment-name]",
    },
    browser: {
      router: false,
    },
  },
};
```

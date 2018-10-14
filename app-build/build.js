const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const builder = require("electron-builder");
const { Platform } = builder;
const packageJsonPath = path.join(__dirname, "../package.json");

const projectDir = path.join(__dirname, "..");

// options
const platform = argv.platform || process.platform;
const channel = argv.channel || "latest";
const arch = argv.arch || "x64"; // Pass in --arch=ia32 for a 32bit build

const packageJsonObject = require(packageJsonPath);
const appVersion = packageJsonObject.version;

const productName = "Photo Everyday";

/**
 * @return {string|null}
 */
const getBuildType = () => {
    switch (platform) {
        case "win32":
            return "nsis";
        case "darwin":
            return "dmg";
        case "linux":
            return null;
        default:
            return null;
    }
};

console.log(
    `App build started for ` +
        `version = "${appVersion}", ` +
        `platform = "${platform}", ` +
        `arch = "${arch}", ` +
        `buildType = ${getBuildType() ? `"${getBuildType()}"` : "null"}, ` +
        `channel = "${channel}"`
);

builder
    .build({
        projectDir,
        targets: Platform.fromString(platform).createTarget(
            getBuildType(),
            builder.Arch[arch]
        ),
        config: {
            appId: "PhotoEveryday",
            asar: false,
            extends: null,
            productName,
            files: ["app/**/*", "build/**/*"]
        }
    })
    .then(() => {
        console.log("App built successfully");
        process.exit(0);
    })
    .catch(error => {
        console.log("Error while building app", error);
        process.exit(1);
    });

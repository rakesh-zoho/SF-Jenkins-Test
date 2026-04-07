# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\account-creation.spec.js >> Create Account end to end
- Location: tests\account-creation.spec.js:36:1

# Error details

```
Error: browser.newContext: Target page, context or browser has been closed
Browser logs:

<launching> C:\Users\Admin\AppData\Local\ms-playwright\chromium_headless_shell-1217\chrome-headless-shell-win64\chrome-headless-shell.exe --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --enable-automation --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=C:\Users\Admin\AppData\Local\Temp\playwright_chromiumdev_profile-Kn5QKr --remote-debugging-pipe --no-startup-window
<launched> pid=72048
[pid=72048][err] [0407/172524.440:INFO:CONSOLE:2151] "ComponentProfiler: Component-level profiling has not been enabled.", source: https://b.static.lightning.force.com/ind138.sfdc-y37hzm/aurafile/%7B%22mode%22%3A%22PROD%22%2C%22dfs%22%3A%22c%22%2C%22app%22%3A%22one%3Aone%22%2C%22ls%22%3A1%2C%22lrmc%22%3A%22551347034%22%2C%22ln%22%3A1%7D/rb3KoeI9DRPpFNMYayx7XA/apppart1-4.js (2151)
[pid=72048][err] [0407/172524.475:INFO:CONSOLE:2522] "%cO11Y%c Error color:white;background-color:#FF6600;font-weight:bold color:white;background-color:Crimson [object Object] [object Object]", source: https://b.static.lightning.force.com/ind138.sfdc-y37hzm/aurafile/%7B%22mode%22%3A%22PROD%22%2C%22dfs%22%3A%22c%22%2C%22app%22%3A%22one%3Aone%22%2C%22ls%22%3A1%2C%22lrmc%22%3A%22551347034%22%2C%22ln%22%3A1%7D/BywCs9h_uS9O1AOB12NYDg/apppart4-4.js (2522)
[pid=72048][err] [0407/172524.820:INFO:CONSOLE:493] "empApi setting initialized true for : undefined", source: https://b.static.lightning.force.com/ind138.sfdc-y37hzm/aurafile/%7B%22mode%22%3A%22PROD%22%2C%22dfs%22%3A%22c%22%2C%22app%22%3A%22one%3Aone%22%2C%22ls%22%3A1%2C%22lrmc%22%3A%22551347034%22%2C%22ln%22%3A1%7D/jFeRJed9X0T45iLI9n2IuA/apppart3-4.js (493)
[pid=72048][err] [0407/172525.984:INFO:CONSOLE:6] "SUCCESS", source: https://b.static.lightning.force.com/ind138.sfdc-y37hzm/auraCmpDef?_au=4037_D7pfJARQtPJqnjJvT-1sbQ&_c=false&_density=VIEW_ONE&_dfs=c&_ff=DESKTOP&_l=true&_l10n=en_US&_lrmc=551347034&_style=1630691110&aura.app=markup://one:one&aura.mode=PROD&_def=markup://runtime_sales_seller_home:myPerformanceContainerWrapper&_uid=772_u2fv_-Vl22CTg-Lxkhqf-g (6)
[pid=72048][err] [0407/172526.471:INFO:CONSOLE:34] "Unknown Field: [object Object]. This field or nested fields cannot participate in normalization", source: https://b.static.lightning.force.com/ind138.sfdc-y37hzm/auraCmpDef?_au=4037_D7pfJARQtPJqnjJvT-1sbQ&_c=false&_density=VIEW_ONE&_dfs=c&_ff=DESKTOP&_l=true&_l10n=en_US&_lrmc=551347034&_style=1630691110&aura.app=markup://one:one&aura.mode=PROD&_def=markup://runtime_sales_seller_home:myProspectsCard&_cl=57165362&_uid=LATEST (34)
[pid=72048][err] [0407/172526.473:INFO:CONSOLE:34] "Unknown Field: Account. This field or nested fields cannot participate in normalization", source: https://b.static.lightning.force.com/ind138.sfdc-y37hzm/auraCmpDef?_au=4037_D7pfJARQtPJqnjJvT-1sbQ&_c=false&_density=VIEW_ONE&_dfs=c&_ff=DESKTOP&_l=true&_l10n=en_US&_lrmc=551347034&_style=1630691110&aura.app=markup://one:one&aura.mode=PROD&_def=markup://runtime_sales_seller_home:myProspectsCard&_cl=57165362&_uid=LATEST (34)
```
# `playkit-js-providers`

Because the upstream player utilises API v3.3.0 and StreamAMG do not support it yet (they're on v3.1.6) a provider replacement is needed. The main differences between the two API versions are as follows:

- v3.3.0 has a baseEntry.getPlaybackContext API that returns access control information and playback sources. This does not exist in v3.1.6. Instead, the access control information is loaded via baseEntry.getContextData and is exactly the same response format as v3.3.0's getPlaybackContext except it has no sources or bumper data. We can ignore bumper data, and simply hard-code in a playManifest URL in any custom provider we build.
- v3.3.0 thumbnail requests seem to be slightly different slicing to what v3.1.6 provides - however, it is possible that StreamAMG have changed their thumbnail responses for their own implementation in their current IFRAME player. So some adjustments are needed if the thumbnail on the scrubber is needed.
- v3.3.0 allows POST requests with a JSON body. v3.1.6 only supports GET requests with the request information specified as query parameters, or a POST request with form data. Therefore a custom provider will need to use that request format. The response format however, is fortunately, the same.

## StreamAMG Provider

This fork mainly adds a new [StreamAMG Provider](src/k-provider/streamamg). It extends the OVP provider which is for Kaltura API v3.3.0 and implements the necessary overrides and extensions to support API v3.1.6, with all of the above differences resolved.

## Additional Changes

- Added `.vscode` to suppress TypeScript and ESLint checks since this is using Flow. You'll likely want to install Flow extension for VSCode.
- Adjusted `src/index.html` that now has StreamAMG endpoints in there for testing.

## Building and Testing

See the main [README](README.md) file for information.

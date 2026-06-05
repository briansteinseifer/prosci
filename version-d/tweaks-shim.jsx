// tweaks-shim.jsx: review build.
// The original Claude Design authoring panel (tweaks-panel.jsx) is intentionally
// omitted for the review. This shim keeps the app's API surface intact:
// useTweaks returns the fixed defaults, and every Tweak* control renders nothing.
function useTweaks(defaults) {
  return [defaults, function noop() {}];
}
const __none = () => null;
const TweaksPanel = __none;
const TweakSection = __none;
const TweakRow = __none;
const TweakSlider = __none;
const TweakToggle = __none;
const TweakRadio = __none;
const TweakSelect = __none;
const TweakText = __none;
const TweakNumber = __none;
const TweakColor = __none;
const TweakButton = __none;

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});

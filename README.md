# Zustand Flipper

![screenshot of the plugin](https://i.imgur.com/blqn8oT.png)

Zustand debugger for [Flipper](https://fbflipper.com/). It can log actions and show inside Flipper using [flipper-plugin-zustand-debugger](https://www.npmjs.com/package/flipper-plugin-zustand-debugger).

### Support

- React Native
    - For `react-native` >= 0.62, flipper support is enabled by default
    - For `react-native` < 0.62, follow [these steps](https://fbflipper.com/docs/getting-started/react-native.html#manual-setup) to setup your app

## Get Started

1. Install [zustand-flipper](https://github.com/levancam610/zustand-flipper) middleware and `react-native-flipper` in your React Native app:

```bash
yarn add zustand-flipper react-native-flipper
# for iOS
cd ios && pod install
```

2. Add the middleware into your zustand store:

```javascript
import {create} from 'zustand';
import zustandflipper from "zustand-flipper";

const useBearStore = create(
    zustandflipper(
        set => ({
          bears: 0,
          increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
          removeAllBears: () => set({ bears: 0 }),
        }),
        'BearStore',
    ),
);
```


3. Install [flipper-plugin-zustand-debugger](https://www.npmjs.com/package/flipper-plugin-zustand-debugger) in Flipper desktop client:

```
Manage Plugins > Install Plugins > search "zustand-debugger" > Install
```

4. Start your app, then you should be able to see Zustand Debugger on your Flipper app

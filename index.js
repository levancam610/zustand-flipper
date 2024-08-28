import {addPlugin} from 'react-native-flipper';
let connectionFlipper = null;

const padToGivenDigits = (number, pad) => {
    return String(number).padStart(pad, '0');
};

const formatTimestampByMilliseconds = (milliseconds) => {
    try {
        const date = new Date(milliseconds);

        return `${[
            padToGivenDigits(date.getHours(), 2),
            padToGivenDigits(date.getMinutes(), 2),
            padToGivenDigits(date.getSeconds(), 2),
        ].join(':')}.${padToGivenDigits(date.getMilliseconds(), 3)}`;
    } catch (_) {
        return '';
    }
};

export default function zustandFlipper(fn, storeName) {
    addPlugin({
        getId: () => 'zustand.debugger',
        runInBackground: () => true,
        onConnect(connection) {
            connectionFlipper = connection;
        },
        onDisconnect() {},
    });

    return function (set, get, api) {
        const wrappedSet = (state, replace = false) => {
            if (!__DEV__) {
                set(state, replace);
                return;
            }
            const before = get();
            const functionName = new Error().stack
                .split('\n')[2]
                .trim()
                .split(' ')[1];
            let startTime = Date.now();
            set(state, replace);
            let now = Date.now();
            if (connectionFlipper) {
                const actionData = typeof state === "function" ? state(before) : state;
                const payload = {
                    id: startTime,
                    time: formatTimestampByMilliseconds(startTime),
                    took: `${now - startTime} ms`,
                    action: {
                        name: functionName || 'Anonymous',
                        payload: actionData,
                    },
                    storeName,
                    before,
                    after: get(),
                };
                connectionFlipper.send('actionDispatched', payload);
            }
        };

        return fn(wrappedSet, get, api);
    };
}

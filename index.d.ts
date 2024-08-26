declare module "zustandFlipper" {
    import { StateCreator } from "zustand";
    export default function zustandFlipper<T extends object>(
        fn: StateCreator<T>,
        storeName: string
    ): StateCreator<T>;
}

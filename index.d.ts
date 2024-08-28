declare module "zustand-flipper" {
    import { StateCreator } from "zustand";
    export default function zustandFlipper<T extends object>(fn: StateCreator<T>, storeName: string): StateCreator<T>;
}

import "../global.css";
import { Slot } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";

export default function Layout() {
  return (
    <>
      <Slot />
      <PortalHost />
    </>
  );
}

import { initializeDataBase } from "@/dataBase/initializeDataBase";
import { Slot, usePathname, useRouter } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export default function Layout() {
  const pathname = usePathname();
  const router = useRouter();

  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const hasRedirectedRef = useRef(false); // para garantir que redirecione só uma vez

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!initialLoadDone && appState === "active") {
      setInitialLoadDone(true);

      if (pathname === "/" && !hasRedirectedRef.current) {
        hasRedirectedRef.current = true;

        // Usa timeout para evitar erro de navegação durante renderização
        setTimeout(() => {
          router.replace("/start");
        }, 0);
      }
    }
  }, [appState, initialLoadDone, pathname, router]);

  // Se o app está rodando normalmente, renderiza normalmente
  return (
    <SQLiteProvider databaseName="mydataBase.db" onInit={initializeDataBase}>
      <Slot />
    </SQLiteProvider>
  );
}

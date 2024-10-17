import { AppProps } from "next/app";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import RootLayout from "@/components/layouts/layout";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default MyApp;

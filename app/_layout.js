import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import GlobalProvider from '../context/GlobalProvider'

import { useColorScheme } from '@/hooks/useColorScheme';

    return null;
  } 

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <GlobalProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        {/*<Stack.Screen name="/search/[query]" options={{ headerShown: false }} />*/}
        <Stack.Screen name="+not-found" />
      </Stack>
    </GlobalProvider>
      
    </ThemeProvider>
  );
}

---
description: Clerk Authentication Workflow
---

# VibLink — Clerk Authentication Workflow

> **Stack**: Expo React Native · NativeWind · @clerk/expo · MMKV · Convex · MVVM

---

## Overview

Every auth feature follows this pipeline:
```
Install → Token Cache → Provider → Route Guards → ViewModels → Views → Convex Sync
```
Auth logic always lives in ViewModels — never directly in Views.

---

## Phase 1: Install & Configure

```bash
npx expo install @clerk/expo @clerk/expo/google @clerk/expo/apple expo-web-browser expo-linking
```
**`.env.local`**: `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...` · `EXPO_PUBLIC_CONVEX_URL=https://...`
**`app.json`**: `{ "expo": { "scheme": "viblink" } }`

**Clerk Dashboard:** Redirect URLs → `viblink://` · Enable Google + Apple · Add "Convex" JWT Template

---

## Phase 2: Token Cache (MMKV)

VibLink uses MMKV — 10x faster than SecureStore.

```typescript
// lib/tokenCache.ts
import { MMKV } from 'react-native-mmkv'
import { TokenCache } from '@clerk/clerk-expo/token-cache'
const storage = new MMKV({ id: 'clerk-token-cache' })
export const tokenCache: TokenCache = {
  async getToken(key) { return storage.getString(key) ?? null },
  async saveToken(key, value) { storage.set(key, value) },
  async clearToken(key) { storage.delete(key) },
}
```

---

## Phase 3: Provider Setup

`ClerkProvider` → `ClerkLoaded` → `ConvexProviderWithClerk` → `Slot`

```typescript
// app/_layout.tsx
import { ClerkProvider, ClerkLoaded } from '@clerk/expo'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'
import { useAuth } from '@clerk/expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@/lib/tokenCache'
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!)
export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <Slot />
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
```

---

## Phase 4: Route Groups & Guards

```
app/
├── (auth)/          ← public  — signed-in users redirected OUT
│   ├── _layout.tsx
│   ├── sign-in.tsx
│   └── sign-up.tsx
└── (app)/           ← protected — signed-out users redirected OUT
    ├── _layout.tsx
    └── (tabs)/
```

**Guard logic:**
```
isLoaded === false             → return null (wait for Clerk)
(auth)  + isSignedIn === true  → <Redirect to feed>
(app)   + isSignedIn === false → <Redirect to sign-in>
```

```typescript
// app/(auth)/_layout.tsx
import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) return null
  if (isSignedIn) return <Redirect href="/(app)/(tabs)/feed" />
  return <Stack screenOptions={{ headerShown: false }} />
}
```
```typescript
// app/(app)/_layout.tsx
import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
export default function AppLayout() {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) return null
  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />
  return <Stack screenOptions={{ headerShown: false }} />
}
```

---

## Phase 5: Choose Auth Method

```
Which auth method?
├── Email + Password ─── Phase 6A
├── Google (iOS + Android) ── Phase 6B
└── Apple  (iOS only) ────── Phase 6C
```

---

## Phase 6A: Email + Password ViewModels

```typescript
// viewmodels/useSignUpViewModel.ts
import { useSignUp } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { useState, useCallback } from 'react'

export function useSignUpViewModel() {
  const { signUp, isLoaded } = useSignUp()
  const router = useRouter()
  const [pendingVerification, setPendingVerification] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = useCallback(async (email: string, password: string) => {
    if (!isLoaded) return
    try {
      await signUp!.create({ emailAddress: email, password })
      await signUp!.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) { setError(err.errors?.[0]?.message ?? 'Sign-up failed') }
  }, [isLoaded, signUp])

  const handleVerify = useCallback(async (code: string) => {
    if (!isLoaded) return
    try {
      const result = await signUp!.attemptEmailAddressVerification({ code })
      if (result.status === 'complete') router.replace('/(app)/onboarding')
    } catch (err: any) { setError(err.errors?.[0]?.message ?? 'Verification failed') }
  }, [isLoaded, signUp, router])

  const resendCode = useCallback(async () => {
    await signUp!.prepareEmailAddressVerification({ strategy: 'email_code' })
  }, [signUp])

  return { handleSignUp, handleVerify, resendCode, pendingVerification, error }
}
```
```typescript
// viewmodels/useSignInViewModel.ts
import { useSignIn } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { useState, useCallback } from 'react'

export function useSignInViewModel() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = useCallback(async (email: string, password: string) => {
    if (!isLoaded) return
    try {
      const result = await signIn!.create({ identifier: email, password })
      if (result.status === 'complete') {
        await setActive!({ session: result.createdSessionId })
        router.replace('/(app)/(tabs)/feed')
      }
    } catch (err: any) { setError(err.errors?.[0]?.message ?? 'Sign-in failed') }
  }, [isLoaded, signIn, setActive, router])

  return { handleSignIn, error }
}
```

---

## Phase 6B: Google Sign-In (Native)

```typescript
// viewmodels/useGoogleSignInViewModel.ts
import { useSignInWithGoogle } from '@clerk/expo/google'
import { useRouter } from 'expo-router'
import { Platform } from 'react-native'
import { useCallback } from 'react'

export function useGoogleSignInViewModel() {
  const { startGoogleAuthenticationFlow } = useSignInWithGoogle()
  const router = useRouter()

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleAuthenticationFlow()
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId })
        router.replace('/(app)/(tabs)/feed')
      }
    } catch (err: any) {
      if (err.code === 'SIGN_IN_CANCELLED' || err.code === '-5') return
      throw err
    }
  }, [startGoogleAuthenticationFlow, router])

  return { handleGoogleSignIn, isSupported: Platform.OS !== 'web' }
}
```

---

## Phase 6C: Apple Sign-In (iOS Only)

```typescript
// viewmodels/useAppleSignInViewModel.ts
import { useSignInWithApple } from '@clerk/expo/apple'
import { useRouter } from 'expo-router'
import { Platform } from 'react-native'
import { useCallback } from 'react'

export function useAppleSignInViewModel() {
  const { startAppleAuthenticationFlow } = useSignInWithApple()
  const router = useRouter()

  const handleAppleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startAppleAuthenticationFlow()
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId })
        router.replace('/(app)/(tabs)/feed')
      }
    } catch (err: any) {
      if (err.code === 'ERR_REQUEST_CANCELED') return
      throw err
    }
  }, [startAppleAuthenticationFlow, router])

  return { handleAppleSignIn, isSupported: Platform.OS === 'ios' }
}
```

---

## Phase 7: View — Sign-In Screen (NativeWind)

Zero Clerk imports in Views — only ViewModel calls.

```typescript
// app/(auth)/sign-in.tsx
import { View, Text, TextInput, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react'
import { useSignInViewModel } from '@/viewmodels/useSignInViewModel'
import { useGoogleSignInViewModel } from '@/viewmodels/useGoogleSignInViewModel'
import { useAppleSignInViewModel } from '@/viewmodels/useAppleSignInViewModel'
export default function SignInScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleSignIn, error } = useSignInViewModel()
  const { handleGoogleSignIn, isSupported: googleOk } = useGoogleSignInViewModel()
  const { handleAppleSignIn, isSupported: appleOk } = useAppleSignInViewModel()
  return (
    <View className="flex-1 bg-black px-6 pt-20">
      <Text className="text-white text-3xl font-bold mb-8">Welcome back</Text>
      <TextInput className="bg-zinc-900 text-white rounded-xl px-4 py-4 mb-4"
        placeholder="Email" placeholderTextColor="#666"
        value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput className="bg-zinc-900 text-white rounded-xl px-4 py-4 mb-4"
        placeholder="Password" placeholderTextColor="#666"
        value={password} onChangeText={setPassword} secureTextEntry />
      {error && <Text className="text-red-500 mb-4">{error}</Text>}
      <Pressable className="bg-white rounded-xl py-4 items-center mb-4" onPress={() => handleSignIn(email, password)}>
        <Text className="text-black font-semibold">Sign In</Text>
      </Pressable>
      {googleOk && (
        <Pressable className="bg-blue-600 rounded-xl py-4 items-center mb-3" onPress={handleGoogleSignIn}>
          <Text className="text-white font-semibold">Continue with Google</Text>
        </Pressable>
      )}
      {appleOk && (
        <Pressable className="bg-zinc-800 rounded-xl py-4 items-center mb-6" onPress={handleAppleSignIn}>
          <Text className="text-white font-semibold">Continue with Apple</Text>
        </Pressable>
      )}
      <Link href="/(auth)/sign-up"><Text className="text-zinc-400 text-center">No account? Sign up</Text></Link>
    </View>
  )
}
```

---

## Phase 8: Convex Sync (Onboarding)

After every sign-up sync Clerk user → Convex before entering the main app:
`sign-up complete → /(app)/onboarding → createOrUpdate → /(app)/(tabs)/feed`

```typescript
// app/(app)/onboarding.tsx
import { useUser } from '@clerk/expo'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { View, ActivityIndicator } from 'react-native'
export default function OnboardingScreen() {
  const { user, isLoaded } = useUser()
  const createUser = useMutation(api.users.createOrUpdate)
  const router = useRouter()
  useEffect(() => {
    if (!isLoaded || !user) return
    createUser({
      clerkId: user.id,
      username: user.username ?? `user_${user.id.slice(-6)}`,
      displayName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      avatarStorageId: user.imageUrl ?? undefined,
    }).then(() => router.replace('/(app)/(tabs)/feed'))
  }, [isLoaded, user])
  return <View className="flex-1 bg-black items-center justify-center"><ActivityIndicator color="#fff" /></View>
}
```

---

## Phase 9: Sign Out

```typescript
import { useClerk } from '@clerk/expo'
import { useRouter } from 'expo-router'

export function useSignOutViewModel() {
  const { signOut } = useClerk()
  const router = useRouter()
  const handleSignOut = async () => {
    await signOut()
    router.replace('/(auth)/sign-in')
  }
  return { handleSignOut }
}
```



## Phase 10: Checklist Before Shipping

- [ ] `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` set in `.env.local`
- [ ] `tokenCache` using MMKV (not SecureStore)
- [ ] `ClerkProvider` wraps entire app in root `_layout.tsx`
- [ ] `ClerkLoaded` used — prevents auth flicker
- [ ] `ConvexProviderWithClerk` gets `useAuth` from `@clerk/expo`
- [ ] `(auth)` group redirects signed-in users to feed
- [ ] `(app)` group redirects signed-out users to sign-in
- [ ] All Clerk hooks inside View
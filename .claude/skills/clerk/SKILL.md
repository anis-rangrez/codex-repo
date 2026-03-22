---
name: viblink-clerk-auth
description: >
  Use this skill whenever working on ANY authentication or user management task
  in VibLink — including setting up ClerkProvider, writing sign-in/sign-up screens,
  email verification flows, Google sign-in, Apple sign-in, route protection,
  accessing user data with useUser/useAuth, getting session tokens for Convex,
  token caching with MMKV, or syncing Clerk users to the Convex database.
  Trigger for ANY Clerk-related task: new auth screens, fixing auth bugs,
  onboarding flows, session handling, or protected navigation in Expo Router.
---

# VibLink — Clerk Authentication Skill

## Project Context

**VibLink** is a social media platform using:
- `@clerk/expo` — auth provider, hooks, native OAuth
- `@clerk/expo/google` — native Google sign-in
- `@clerk/expo/apple` — native Apple sign-in
- `expo-router` — file-based routing with protected groups
- `MMKV` — token cache (fast, native, replaces SecureStore)
- `Zustand` — auth state that survives hot reloads
- `Convex` — backend that validates Clerk JWT on every request

---

## 1. File Structure

```
app/
├── _layout.tsx                  # ClerkProvider lives here (root)
├── (auth)/
│   ├── _layout.tsx              # Redirect signed-in users away
│   ├── sign-in.tsx
│   ├── sign-up.tsx
│   └── verify-email.tsx
├── (app)/
│   ├── _layout.tsx              # Redirect signed-out users away
│   ├── (tabs)/
│   │   ├── feed.tsx
│   │   └── profile.tsx
│   └── onboarding.tsx           # Sync Clerk user to Convex after sign-up
lib/
└── tokenCache.ts                # MMKV-backed token cache
viewmodels/
└── useAuthViewModel.ts          # All Clerk hooks live here (MVVM)
```

---

## 2. Token Cache — MMKV (NOT SecureStore)

VibLink uses MMKV for token caching — it is 10x faster than SecureStore.

```typescript
// lib/tokenCache.ts
import { MMKV } from 'react-native-mmkv'
import { TokenCache } from '@clerk/clerk-expo/token-cache'

const storage = new MMKV({ id: 'clerk-token-cache' })

export const tokenCache: TokenCache = {
  async getToken(key: string) {
    return storage.getString(key) ?? null
  },
  async saveToken(key: string, value: string) {
    storage.set(key, value)
  },
  async clearToken(key: string) {
    storage.delete(key)
  },
}
```

---

## 3. Root Layout — ClerkProvider + Convex Setup

```typescript
// app/_layout.tsx
import { ClerkProvider, ClerkLoaded } from '@clerk/expo'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'
import { useAuth } from '@clerk/expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@/lib/tokenCache'

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!)
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env')
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <Slot />
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
```

ClerkLoaded ensures no child renders until Clerk is ready — prevents auth flicker on cold start.

---

## 4. Route Protection (Expo Router Groups)

### Auth Group — redirect away if already signed in
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

### App Group — redirect away if signed out
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

## 5. Hook Reference

| Need | Hook | Import |
|------|------|--------|
| Check signed in / user ID | `useAuth()` | `@clerk/expo` |
| Full user object | `useUser()` | `@clerk/expo` |
| Sign up email+password | `useSignUp()` | `@clerk/expo` |
| Sign in email+password | `useSignIn()` | `@clerk/expo` |
| Google sign-in native | `useSignInWithGoogle()` | `@clerk/expo/google` |
| Apple sign-in native | `useSignInWithApple()` | `@clerk/expo/apple` |
| Sign out / session | `useClerk()` | `@clerk/expo` |
| JWT for Convex/API | `useAuth().getToken()` | `@clerk/expo` |

---

## 6. Sign-Up with Email Verification ViewModel

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
    setError(null)
    try {
      await signUp!.create({ emailAddress: email, password })
      await signUp!.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? 'Sign-up failed')
    }
  }, [isLoaded, signUp])

  const handleVerify = useCallback(async (code: string) => {
    if (!isLoaded) return
    setError(null)
    try {
      const result = await signUp!.attemptEmailAddressVerification({ code })
      if (result.status === 'complete') {
        router.replace('/(app)/onboarding')
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? 'Verification failed')
    }
  }, [isLoaded, signUp, router])

  const resendCode = useCallback(async () => {
    await signUp!.prepareEmailAddressVerification({ strategy: 'email_code' })
  }, [signUp])

  return { handleSignUp, handleVerify, resendCode, pendingVerification, error }
}
```

---

## 7. Sign-In ViewModel

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
    setError(null)
    try {
      const result = await signIn!.create({ identifier: email, password })
      if (result.status === 'complete') {
        await setActive!({ session: result.createdSessionId })
        router.replace('/(app)/(tabs)/feed')
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? 'Sign-in failed')
    }
  }, [isLoaded, signIn, setActive, router])

  return { handleSignIn, error }
}
```

---

## 8. Google Sign-In ViewModel (iOS + Android)

```typescript
// viewmodels/useGoogleSignInViewModel.ts
import { useSignInWithGoogle } from '@clerk/expo/google'
import { useRouter } from 'expo-router'
import { Platform } from 'react-native'
import { useCallback } from 'react'

export function useGoogleSignInViewModel() {
  const { startGoogleAuthenticationFlow } = useSignInWithGoogle()
  const router = useRouter()
  const isSupported = Platform.OS === 'ios' || Platform.OS === 'android'

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

  return { handleGoogleSignIn, isSupported }
}
```

---

## 9. Apple Sign-In ViewModel (iOS Only)

```typescript
// viewmodels/useAppleSignInViewModel.ts
import { useSignInWithApple } from '@clerk/expo/apple'
import { useRouter } from 'expo-router'
import { Platform } from 'react-native'
import { useCallback } from 'react'

export function useAppleSignInViewModel() {
  const { startAppleAuthenticationFlow } = useSignInWithApple()
  const router = useRouter()
  const isSupported = Platform.OS === 'ios'

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

  return { handleAppleSignIn, isSupported }
}
```

---

## 10. Accessing User Data

```typescript
import { useUser, useAuth } from '@clerk/expo'

const { user, isLoaded, isSignedIn } = useUser()
// user?.id | user?.firstName | user?.lastName
// user?.emailAddresses[0]?.emailAddress
// user?.imageUrl | user?.username

const { isSignedIn, userId, getToken } = useAuth()
const token = await getToken()   // Clerk JWT for Convex or external APIs
```

---

## 11. Sign Out

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

---

## 12. Sync Clerk User to Convex (Onboarding)

```typescript
// app/(app)/onboarding.tsx
import { useUser } from '@clerk/expo'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

export default function OnboardingScreen() {
  const { user, isLoaded } = useUser()
  const createUser = useMutation(api.users.createOrUpdate)
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded || !user) return
    const sync = async () => {
      await createUser({
        clerkId: user.id,
        username: user.username ?? `user_${user.id.slice(-6)}`,
        displayName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
        avatarStorageId: user.imageUrl ?? undefined,
      })
      router.replace('/(app)/(tabs)/feed')
    }
    sync()
  }, [isLoaded, user])

  return null // render a loading spinner here in the View
}
```

---

## 13. Environment Variables

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
EXPO_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

Clerk Dashboard settings:
- Redirect URLs: add `viblink://` (your app scheme)
- Social Connections: enable Google + Apple
- JWT Templates: Convex template (auto-configured)

---

## 14. Golden Rules

| Rule | Why |
|------|-----|
| Always check `isLoaded` first | Prevents crashes on cold start |
| Wrap root in `ClerkLoaded` | Eliminates auth flicker |
| MMKV token cache not SecureStore | 10x faster, Nitro-native |
| Clerk hooks in ViewModels only | Views stay dumb — MVVM pattern |
| Check `Platform.OS` for social auth | Apple = iOS only, Google = iOS + Android |
| Sync to Convex after every sign-up | Keep Convex DB in sync with Clerk |
| Use layout Redirect guards | Cleaner than imperative redirects inside hooks |
---
description: Convex Development Workflow
---

# VibLink — Convex Development Workflow

> **Stack**: Expo React Native · NativeWind · Clerk · MMKV · Zustand · Convex · Cloudflare R2 · MVVM

---

## Overview

This workflow defines the exact step-by-step process for building any Convex-backed feature in VibLink — from schema design all the way to the React Native View. Always follow this order to keep the codebase consistent, type-safe, and performant.

```
Schema → Functions → ViewModel → View → Test
```

---

## Phase 1: Schema First

Before writing a single function, define or update `convex/schema.ts`.

### Checklist
- [ ] Identify the new table(s) needed
- [ ] Define all fields with correct `v.*` validators
- [ ] Add indexes for every query pattern you anticipate
- [ ] Add `isDeleted: v.optional(v.boolean())` for any soft-deletable entity
- [ ] Use `v.id("tableName")` for every foreign key — never raw strings
- [ ] Run `bunx convex dev` to push schema and verify no type errors

### Decision Table — Which Validator to Use?

| Data | Validator |
|------|-----------|
| Text | `v.string()` |
| Number | `v.number()` |
| True/False | `v.boolean()` |
| Foreign key | `v.id("tableName")` |
| R2 media key | `v.string()` |
| Enum field | `v.union(v.literal("a"), v.literal("b"))` |
| Optional field | `v.optional(v.string())` |
| Array | `v.array(v.string())` |
| Nested object | `v.object({ ... })` |

### Index Design Rules
- **1 query pattern = 1 index** (don't share indexes across different query shapes)
- Compound indexes: put equality fields first, range/sort fields last
- Name convention: `by_<field>` or `by_<field1>_<field2>`

```typescript
// ✅ Good — targeted index
.index("by_recipient_unread", ["recipientId", "isRead"])

// ❌ Bad — no index, full scan
ctx.db.query("notifications").filter(q => q.eq(q.field("recipientId"), id))
```

---

## Phase 2: Write Backend Functions

### 2A — Determine Function Type

```
Does it touch only the DB?
  ├── Read only  →  query()
  └── Write      →  mutation()

Does it call external APIs / R2 / fetch()?
  └── action()   →  calls internalMutation() for DB writes
```

### 2B — Query Template

```typescript
// convex/<feature>/queries.ts
import { query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthenticatedUser } from "../_lib/auth";

export const myQuery = query({
  args: {
    // define all args with v.*
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx); // always auth first

    const results = await ctx.db
      .query("tableName")
      .withIndex("index_name", (q) => q.eq("field", args.value))
      .order("desc")
      .take(20); // or .paginate() for infinite scroll

    return results;
  },
});
```

### 2C — Mutation Template

```typescript
// convex/<feature>/mutations.ts
import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { getAuthenticatedUser } from "../_lib/auth";

export const myMutation = mutation({
  args: {
    // define args
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    // 1. Validate ownership if modifying existing data
    // 2. Perform the DB operation
    // 3. Update any denormalized counts
    // 4. Return the new ID or updated data

    const id = await ctx.db.insert("tableName", {
      authorId: currentUser._id,
      ...args,
    });

    return id;
  },
});
```

### 2D — Action + R2 Upload Template

```typescript
// convex/media/upload.ts
import { action } from "../_generated/server";
import { v } from "convex/values";
import { getR2PresignedUrl } from "../_lib/r2";

export const requestUpload = action({
  args: {
    fileName: v.string(),
    fileType: v.string(),
    folder: v.union(v.literal("posts"), v.literal("avatars")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const key = `${args.folder}/${identity.subject}/${Date.now()}-${args.fileName}`;
    const url = await getR2PresignedUrl(key, args.fileType);

    return { uploadUrl: url, storageKey: key };
  },
});
```

### 2E — Auth Guard Pattern

**Every single function** (query, mutation, action) must start with auth:

```typescript
// For queries and mutations:
const currentUser = await getAuthenticatedUser(ctx);

// For actions (no db access in actions):
const identity = await ctx.auth.getUserIdentity();
if (!identity) throw new Error("Not authenticated");
```

---

## Phase 3: Push & Verify

```bash
# Start local dev server (keeps functions in sync)
bunx convex dev

# Check the Convex dashboard for:
# ✅ Schema deployed without errors
# ✅ Functions visible in Functions tab
# ✅ No TypeScript errors in logs
```

If there are type errors — fix them before moving to the frontend. The generated `_generated/api.ts` is your type contract.

---

## Phase 4: ViewModel (MVVM Layer)

ViewModels live in `viewmodels/` and are the ONLY place Convex hooks live. Views never import from `convex/react` directly.

### When to Use Which Hook

| Need | Hook |
|------|------|
| Read data, auto-updates | `useQuery(api.feature.myQuery, args)` |
| Infinite scroll / feed | `usePaginatedQuery(api.feature.myQuery, args, { initialNumItems: N })` |
| Write data | `useMutation(api.feature.myMutation)` |
| Call action (e.g. upload) | `useAction(api.feature.myAction)` |

### ViewModel Template

```typescript
// viewmodels/use<Feature>ViewModel.ts
import { useQuery, useMutation, usePaginatedQuery } from "convex/react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useFeatureStore } from "@/stores/featureStore";
import { useCallback } from "react";

export function use<Feature>ViewModel() {
  // ── Data ──────────────────────────────────────
  const data = useQuery(api.feature.getData, {});

  // ── Mutations ─────────────────────────────────
  const doSomething = useMutation(api.feature.doSomething);

  // ── Zustand (local/offline state via MMKV) ────
  const { localState, setLocalState } = useFeatureStore();

  // ── Handlers ─────────────────────────────────
  const handleAction = useCallback(async (payload: any) => {
    setLocalState(payload);        // optimistic update
    try {
      await doSomething(payload);
    } catch (err) {
      setLocalState(null);         // rollback on error
      throw err;
    }
  }, [doSomething, setLocalState]);

  // ── Return ────────────────────────────────────
  return {
    data,
    isLoading: data === undefined,
    handleAction,
    localState,
  };
}
```

### Pagination ViewModel (for feeds)

```typescript
export function useFeedViewModel() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.getFeedPosts,
    {},
    { initialNumItems: 10 }
  );

  return {
    posts: results ?? [],
    isLoadingInitial: status === "LoadingFirstPage",
    isLoadingMore: status === "LoadingMore",
    canLoadMore: status === "CanLoadMore",
    loadMore: () => loadMore(10),
  };
}
```

---

## Phase 5: Zustand Store (MMKV-backed)

For any state that needs to persist locally or support optimistic updates:

```typescript
// stores/featureStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({ id: "feature-store" });

const mmkvStorage = {
  getItem: (key: string) => storage.getString(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
};

interface FeatureState {
  // define state shape
  someData: string | null;
  setSomeData: (data: string | null) => void;
}

export const useFeatureStore = create<FeatureState>()(
  persist(
    (set) => ({
      someData: null,
      setSomeData: (data) => set({ someData: data }),
    }),
    {
      name: "feature-storage",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
```

---

## Phase 6: View (React Native Screen)

Views ONLY call the ViewModel. No Convex imports. No business logic.

```typescript
// app/(tabs)/feed.tsx  — View stays 100% dumb
import { View, FlatList } from "react-native";
import { useFeedViewModel } from "@/viewmodels/useFeedViewModel";
import { PostCard } from "@/components/PostCard";

export default function FeedScreen() {
  const { posts, isLoadingInitial, isLoadingMore, loadMore, handleLike } =
    useFeedViewModel();

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PostCard post={item} onLike={() => handleLike(item._id)} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
```

---

## Phase 7: Media Upload Flow (R2 + Convex)

This is the full flow for uploading any media in VibLink:

```
User picks file
    ↓
useAction(api.media.requestUpload) → get presigned URL + storageKey
    ↓
fetch(presignedUrl, { method: 'PUT', body: file })  →  file lands in R2
    ↓
useMutation(api.posts.createPost, { mediaKeys: [storageKey], ... })
    ↓
Post created in Convex with R2 key reference
```

```typescript
// In ViewModel:
const requestUpload = useAction(api.media.requestUpload);
const createPost = useMutation(api.posts.createPost);

const handleCreatePost = async (file: File, caption: string) => {
  // Step 1: Get R2 upload URL
  const { uploadUrl, storageKey } = await requestUpload({
    fileName: file.name,
    fileType: file.type,
    folder: "posts",
  });

  // Step 2: Upload directly to R2
  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  // Step 3: Save post to Convex
  await createPost({
    caption,
    mediaKeys: [storageKey],
    mediaType: "image",
  });
};
```

---

## Phase 8: Testing Checklist

Before marking any Convex feature as done:

- [ ] Schema pushed and reflected in `_generated/`
- [ ] All functions have auth guard at the top
- [ ] All queries use `withIndex` — no filter-only queries
- [ ] Mutations update denormalized counts where needed
- [ ] R2 actions use `internalMutation` for DB writes
- [ ] ViewModel isolates all Convex hooks from the View
- [ ] Loading states handled (`data === undefined` → skeleton)
- [ ] Error states handled in the ViewModel
- [ ] Zustand store updated optimistically then rolled back on error
- [ ] No Convex imports in View files

---

## Quick Reference — Common Patterns

### Check if user liked a post
```typescript
const like = await ctx.db
  .query("likes")
  .withIndex("by_user_post", (q) =>
    q.eq("userId", currentUser._id).eq("postId", args.postId)
  )
  .unique();
const isLiked = like !== null;
```

### Soft delete
```typescript
await ctx.db.patch(args.id, { isDeleted: true });
```

### Get user by Clerk ID (in mutation/query)
```typescript
const user = await ctx.db
  .query("users")
  .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
  .unique();
```

### Paginated infinite scroll hook
```typescript
const { results, status, loadMore } = usePaginatedQuery(
  api.posts.getFeedPosts,
  {},
  { initialNumItems: 10 }
);
```

### Get public R2 URL in a query
```typescript
// In query return value — just return the key, compute URL on frontend
return { ...post, mediaUrl: `${process.env.R2_PUBLIC_URL}/${post.mediaKeys[0]}` };
```
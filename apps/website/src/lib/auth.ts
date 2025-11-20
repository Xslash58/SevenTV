import { graphql } from "$/gql";
import { Platform, SubscriptionProductKind, SubscriptionProvider, SubscriptionState, UserEditorState, type User } from "$/gql/graphql";
import { PUBLIC_REST_API_V4, PUBLIC_SUBSCRIPTION_PRODUCT_ID } from "$env/static/public";
import { derived, get, writable } from "svelte/store";
import { gqlClient } from "./gql";
import { browser } from "$app/environment";
import { defaultEmoteSet } from "./defaultEmoteSet";

const LOCALSTORAGE_KEY = "7tv-token";

// Stores should be considered loading when their value is `undefined`
// Null means the value is known to be empty

export const sessionToken = writable<string | null | undefined>(
	browser ? window.localStorage.getItem(LOCALSTORAGE_KEY) : undefined,
);
export const user = writable<User | null | undefined>(undefined);
export const isSubscribed = derived(user, ($user) => $user?.billing.subscriptionInfo.activePeriod);

export function refreshUser() {
	fetchMe().then((data) => user.set(data));
}

sessionToken.subscribe(async (value) => {
	if (!value) {
		if (value === null) {
			//user.set(null);
		}
		return;
	}

	refreshUser();
});

// Save session token to localstorage when changed
sessionToken.subscribe(async (token) => {
	if (token) {
		localStorage.setItem(LOCALSTORAGE_KEY, token);
	} else if (token === null) {
		// Only reset session token when set to null (not undefined)
		localStorage.setItem(LOCALSTORAGE_KEY, "sandbox");
	}
});

export const pendingEditorFor = writable(0);

user.subscribe((value) => {
	if (!value) {
		return 0;
	}

	pendingEditorFor.set(value.editorFor.filter((e) => e.state === UserEditorState.Pending).length);
});

export async function fetchMe(): Promise<User | null> {
	return createSandboxUser() as User;
}

export function createSandboxUser(): User {

  const baseUser: User = {
    billing: {
		badgeProgress: {
			currentBadge: {
				id: "01F74DWQMR0005C7FW3P0F45Y5",
				name: "Sandbox User",
				createdById: "01F74DWQMR0005C7FW3P0F45Y5",
				images: [],
				tags: [],
				updatedAt: new Date(),
				description: "User of the 7TV Sandbox environment",
				searchUpdatedAt: null,
			},
			currentBadgeId: "01F74DWQMR0005C7FW3P0F45Y5",
			nextBadge: null,
		},
		subscriptionInfo: {
			periods: [],
			totalDays: 100,
			activePeriod: {
				autoRenew: true,
				providerId: {
					provider: SubscriptionProvider.Stripe,
					id: "01F74DWQMR0005C7FW3P0F45Y5",
				},
				start: new Date(),
				end: new Date(),
				createdBy: {invoiceId: "01F74DWQMR0005C7FW3P0F45Y5"},
				id: "01F74DWQMR0005C7FW3P0F45Y5",
				isTrial: false,
				productId: PUBLIC_SUBSCRIPTION_PRODUCT_ID,
				subscription: {
					id: {productId: PUBLIC_SUBSCRIPTION_PRODUCT_ID, userId: "01F74DWQMR0005C7FW3P0F45Y5"},
					createdAt: new Date(),
					updatedAt: new Date(),
					endedAt: null,
					state: SubscriptionState.Active,
				},
				subscriptionId: {productId: PUBLIC_SUBSCRIPTION_PRODUCT_ID, userId: "01F74DWQMR0005C7FW3P0F45Y5"},
				subscriptionProduct: { 
					benefits: [], 
					id: PUBLIC_SUBSCRIPTION_PRODUCT_ID, 
					name: "Sandbox Subscription", 
					description: "Access to the 7TV Sandbox environment", 
					updatedAt: new Date(), 
					defaultVariant: {  
						id: "01F74DWQMR0005C7FW3P0F45Y5",
						kind: SubscriptionProductKind.Yearly,
						price: { amount: 0, currency: "USD" },
					},
					variants: [],
					providerId: "01F74DWQMR0005C7FW3P0F45Y5",
				},
				subscriptionProductVariant: {
					id: "01F74DWQMR0005C7FW3P0F45Y5",
					kind: SubscriptionProductKind.Yearly,
					price: { amount: 0, currency: "USD" },
				},
				updatedAt: new Date(),
			}
		}
	},
    connections: [],
    editableEmoteSetIds: [],
    editorFor: [],
    editors: [],
    emoteSets: [],
    events: [],
    highestRoleColor: { hex: "#FF7F50", a: 255, r: 255, g: 127, b: 80 },
    highestRoleRank: 0,
    id: window.localStorage.getItem("7tvunlocked-actorId") || "01F74DWQMR0005C7FW3P0F45Y5",
    inventory: {
		badges: [],
		paints: [],
		products: [],
	},
    mainConnection: { 
		platformDisplayName: "7TV Sandbox",
		platformAvatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_QQwQa3iQKZeMqB1K3TdVh6dzQgKc76c7Ow&s",
		platformId: "000",
		allowLogin: true,
		linkedAt: new Date(),
		platform: Platform.Discord,
		platformUsername: "7TV Sandbox",
		updatedAt: new Date(),
	 },
    ownedEmoteSets: [],
    ownedEmotes: [],
    permissions: {
      ticket: { create: true, admin: true, manageAbuse: true, manageBilling: true, manageGeneric: true, message: true },
      admin: {
        manageEntitlements: true,
        manageRedeemCodes: true,
		admin: true,
		bypassRateLimit: true,
		superAdmin: true,
      },
	  badge: {
	manage: true,
	admin: true,
	assign: true,
	  },
	  user: {
		admin: true,
		manageAny: true,
		useCustomProfilePicture: true,
		manageBilling: true,
		billing: true,
		inviteEditors: true,
		login: true,
		manageSessions: true,
		moderate: true,
		useBadge: true,
		usePaint: true,
		usePersonalEmoteSet: true,
		viewHidden: true,
	  },
	  emote: {
		admin: true,
		delete: true,
		edit: true,
		manageAny: true,
		merge: true,
		upload: true,
		viewUnlisted: true,
	  },
	  emoteSet: {
		manage: true,
		manageAny: true,
		admin: true,
		assign: true,
		manageGlobal: true,
		manageSpecial: true,
		resize: true,
	  },
	  emoteModerationRequest: {
		admin: true,
		manage: true,
	  },
	  flags: {
		hidden: false,
	  },
	  paint: {
		manage: true,
		admin: true,
		assign: true,
	  },
	  ratelimits: {},
	  role: {
		admin: true,
		manage: true,
		assign: true,
	  }
    },
    personalEmoteSet: null,
    rawEntitlements: {
		edges: [],
		nodes: [],
	},
    relatedEvents: [],
    roleIds: [],
    roles: [{ name: "SANDBOX", color: { hex: "#FF7F50", a: 255, b: 255, g: 255, r: 255 }, createdById: "01F74DWQMR0005C7FW3P0F45Y5", id: "01F74DWQMR0005C7FW3P0F45Y5", updatedAt: new Date(), searchUpdatedAt: null, tags: [] }],
    searchUpdatedAt: null,
    specialEmoteSets: [],
    stripeCustomerId: null,
    style: {},
    updatedAt: new Date(),
  };
  console.log("Created sandbox user:", baseUser);
  return baseUser as User;
}


export async function logout() {
	const token = get(sessionToken);

	if (!token) {
		return;
	}

	const res = await fetch(`${PUBLIC_REST_API_V4}/auth/logout`, {
		method: "POST",
		credentials: "include",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		console.error(await res.json());
		return;
	}

	sessionToken.set(null);
	defaultEmoteSet.set(undefined);
}

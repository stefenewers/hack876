import { SponsorDeck, deckMetadata } from "@/components/proposal/SponsorDeck";
import deck from "@/data/sponsorDecks/americanfriendsofjamaica";

/* Private proposal. Not linked from the public site; noindex here and via next.config.ts. */
export const metadata = deckMetadata(deck);

export default function AmericanFriendsOfJamaicaOpportunityPage() {
  return <SponsorDeck deck={deck} />;
}

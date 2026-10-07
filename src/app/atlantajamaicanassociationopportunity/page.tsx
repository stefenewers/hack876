import { SponsorDeck, deckMetadata } from "@/components/proposal/SponsorDeck";
import deck from "@/data/sponsorDecks/atlantajamaicanassociation";

/* Private proposal. Not linked from the public site; noindex here and via next.config.ts. */
export const metadata = deckMetadata(deck);

export default function AtlantaJamaicanAssociationOpportunityPage() {
  return <SponsorDeck deck={deck} />;
}

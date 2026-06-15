import { NearbyPlace, PlaceCategory } from "@/types";
import { Phone, Clock, MapPin, ExternalLink } from "lucide-react";

const CATEGORY_ICONS: Record<PlaceCategory, string> = {
  restaurant: "🍽️",
  cafe: "☕",
  pharmacy: "💊",
  attraction: "🏖️",
  transport: "🚌",
  supermarket: "🛒",
};

const CATEGORY_COLORS: Record<PlaceCategory, string> = {
  restaurant: "bg-orange-50 text-orange-500",
  cafe: "bg-amber-50 text-amber-600",
  pharmacy: "bg-green-50 text-green-600",
  attraction: "bg-sky-50 text-sky-600",
  transport: "bg-violet-50 text-violet-600",
  supermarket: "bg-emerald-50 text-emerald-600",
};

interface Props {
  place: NearbyPlace;
}

export function PlaceCard({ place }: Props) {
  return (
    <div className="beach-card p-4">
      <div className="flex items-start gap-3">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${CATEGORY_COLORS[place.category]}`}
        >
          {CATEGORY_ICONS[place.category]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-[#0C4A6E] text-sm leading-tight">{place.name}</h3>
            {place.distance && (
              <span className="shrink-0 inline-flex items-center gap-0.5 text-[11px] bg-[#E0F2FE] text-[#0891B2] font-semibold px-2 py-0.5 rounded-full">
                <MapPin size={9} />
                {place.distance}
              </span>
            )}
          </div>
          {place.description && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{place.description}</p>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5">
            {place.openingHours && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={11} className="text-[#0891B2]" />
                {place.openingHours}
              </span>
            )}
            {place.phone && (
              <a
                href={`tel:${place.phone}`}
                className="flex items-center gap-1 text-xs text-[#0891B2] font-semibold hover:underline"
              >
                <Phone size={11} />
                {place.phone}
              </a>
            )}
            {place.mapsUrl && (
              <a
                href={place.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-[#0891B2] font-semibold hover:underline"
              >
                <ExternalLink size={11} />
                Directions
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
